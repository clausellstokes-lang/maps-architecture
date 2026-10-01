# Verify round 5 — volumes V01 and V02 — lane coherence/verify-vol-V01-V02-r5t

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/verify-vol-V01-V02-r5t; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-vol-V01-V02-r5t`, 2026-10-01)
- P0 brief read whole; resume check (no output, no LANDED): fresh start; r4t result (4 issues), adjudication-r5 (R5-01,
  R5-02 P1 and its sweep, R5-03, R5-04, R5-05, R5-06, Part H · V01, V02, V09, rendering, pipeline), repair-r5-V01 / -V02
  headers, assemble-r5's sha table read; live V01 4585e1a5…, V02 fb46c676… equal assemble-r5's after; pre-r5 texts from
  3310b538 equal its before: done
- P1 round-4 findings re-checked on the live text (with their END lines' second ends): done
- P2 V01 round-5 blocks (§3.18, §5.4, ## 6, ## 7, §8.2) read whole as diffs: done
- P3 V02 round-5 blocks (§3.18, §5.7, §7.8) read whole as diffs: done
- P4 other units' round-5 changes that meet V01/V02 (R5-02 – R5-06 readers; 14 incoming V01/V02 citations): done
- P5 references, ids, deferral/phone/review-id scans, doc_checks, words: done
- P6 report, result JSON, LANDED: done

**Scope.** `docs/volumes/V01-neighbourhoods.md` (sha256 4585e1a59d0e499a…, 3 758 lines) and
`docs/volumes/V02-buildings.md` (fb46c67694cfe88d…, 4 221 lines) after repair round 5 / assemble-r5, both equal to
assemble-r5's *after* column; the pre-round texts taken from `3310b538fd96` (assemble-r5's *before*, equal to its shas:
V01 a0c15b71…, V02 2579cb16…). Inputs: `verify-vol-V01-V02-r4t.md` and its result, `adjudication-r5.md` (binding; R5-01 –
R5-10, Part H), `repair-r5-V01.md`, `repair-r5-V02.md`, `assemble-r5.md`, the live base and volumes. Round-5 changes read
as word diffs of the whole files (V01: 6 hunks; V02: 5 hunks), and the touched subsections read whole (V01 §5.4 lead and
(1)–(6), §3.18 (c) and (e)'s Find rows, §6's Find rows, T-V1-59, T-V1-60, §8.2's W11; V02 §3.18 (e)'s three exterior rows,
§5.7 whole, §7.8 whole, §8.6). Ids outside both keep their earlier verdict. The design files are untouched.

## 1. Round-4 findings re-checked

| id | grade (Part H) | disposition | verdict on the live text |
|---|---|---|---|
| VV12-r4-01 | major | FIX per R5-05 (V09; END at rendering) | **FIXED.** V09 §1b l. 311 "V01 §5.4's `findAreas(key, week)` at the view's drawn week (§2.9's `week`)"; l. 312 "V01 §5.4's `findAreas(key, week)` for an area's shapes, at the view's drawn week"; §4.21.10 (3) (iii) (l. 3502–3504) the required text verbatim with "at the same week" for V07's ends; (7) (l. 3537) "an area's shapes by V01's `findAreas(key, week)` at the view's drawn week". Second end: base §11.2 *At a drawn week* (l. 16521–16523) reads "(`live.find`, V09's panel, V10's `read_map find`, V01's `findAreas` and `gapUnits`, V04's and V05's Find places, V07 §5.5's village reading)", R5-05 (a)'s list. |
| VV12-r4-02 | major | FIX per R5-05 (V01) | **FIXED.** T-V1-59 (f) (l. 3362) carries the required clause with its home list "(1), (3), (4), (6)"; §3.18 (e)'s Find row (l. 2680) pairs "a chip's area no longer held" with "the chip kept at count 0, dark, until removed or Clear — at a drawn week whose frame holds its id, the frame's area and matches (V01 §5.4 (4))" (13 cases, 13 outcomes). The repair's gloss ("§6.3's succession: its id no longer held at the head, V01 §5.4 (4)") is right about the rule but exposes a gap in (f)'s fixture: **VV12-r5-01** below. |
| VV12-r4-03 | minor | FIX per R5-02 (pipeline; P1) | **FIXED.** Base §4.3 (l. 5643–5655) is R5-02's P1 verbatim: "S5c's proposals (§4.4), stage 2's ways (V01 §3.17.3 (3)), V07's village trackers (V07 §3.5a (3)) and S7's quays, intervallum and castle paths keep the same crossing rule, each with its own ladder (… V01's F-TEMPLATE rungs and §4.6's lane ladder; …)". "the one rule … keep" is gone (0 hits). |
| VV12-r4-04 | minor | FIX per R5-05 (V01) | **FIXED** in R5-05 (c)'s form. T-V1-59's timing: "clause (c)'s epoch cases at the later of M5 and the M6-E exits that provide their epochs (V06 §8), and clause (f) at the later of those and V06's E6 (V06 §3.15.2's history frames)". The END line (R5-05, V01): T-V1-60's timing adds "; (c)'s scrubbed-week clause at the later of M5 and V06's E6 (V06 §3.15.2's frames)" verbatim. §8.2's W11 conformed ("its epoch and drawn-week clauses at the exits its timing cell names"; "its village and scrubbed-week clauses at the exits its timing cell names"). Base §13.8's T120-2 – T120-5 row ("M5 (each volume's clause at the later of its step and M5)") and §13.2's routing agree. |

All four round-4 findings are closed; every END line's second end is written.

## 2. Round-5 blocks read whole

**V01** (repair-r5-V01: 5 REPLACE blocks — §3.18, §5.4, ## 6, ## 7, §8.2; 9 edits; the diff shows 6 hunks):
* §3.18 (c)'s Find toggle row: "recomputed per commit, effective key and drawn week (V01 §5.4 (4))" — agrees with §5.4 (4)
  and §12.5's Find paragraph (l. 17173–17179).
* §3.18 (e)'s Find row — above (VV12-r4-02).
* §5.4 (4): "every change of the view's effective key or drawn week (§2.9's `week`), re-evaluates both services with the
  overlay's index, within §12.5's overlay budget (item 120 (j); a change of the drawn week off the scrub's path)" —
  agrees with R5-05 (b) and §12.5 ("each change of the drawn week re-evaluates the chips' listing … off the scrub's path,
  within ≈ 100 ms of the frame being drawn …, the frame never waiting"). The removed "rebuilt once per commit" is a
  restatement of §12.5 now cited (no nuance lost: §12.5 keeps the commit and key triggers).
* §6's `findAreas` row: the rebuild "at each commit and change of the effective key, and at each change of a drawn week
  whose frame is not the head, off the scrub's path" — the former "once per drawn week a scrub settles on" now matches
  §12.5's every-change rule (R5-05 (b)); the per-call budgets (≤ 3 ms / ≤ 8 ms; ≤ 2 ms / ≤ 25 ms) stand and fit the
  ≈ 100 ms re-evaluation.
* T-V1-59 (f) and both timing cells — above; §8.2's W11 — above. **One new problem:** VV12-r5-01.

**V02** (repair-r5-V02: 3 REPLACE blocks — §3.18, §5.7, §7.8; 6 edits; 5 hunks):
* §5.7 (2): R5-04's END text verbatim — "… V11's ranges) from the element's entry week into the plan (V03 §5.6 (2) (a))"
  and "…, or one a restoring event's re-cut mints (V06 §3.23 (3)), is drawn as built". Agrees with V03 §5.6 (2) (a)–(b)
  (l. 2692–2706: the entry week, for a restoring re-cut's element the restoration's end) and R5-04's one comparison.
* §3.18 (e)'s level row (level 1: "every element the plan holds damaged, each from its entry week into the plan") and
  restoration row (the minted case and its outcome): cases and outcomes pair 4/4 and 3/3; each agrees with V03 §5.6 (2).
* §7.8: the damage sub-fixture's house "once reoccupied from derelict by another household (V06 §3.8.2 (2)), its re-cut
  (V03 §3.11) minting rooms for them while its `repair` Works runs past its epoch's week (T-V3-39 (c)'s case)" and
  T-V2-59 (c)'s bar on the minted roof bays and outer runs — the same case T-V3-39 (c) and T-V6-76 (b) run; every pointer
  resolves (V06 §3.8.2 (2) is regrowth tier (2), `reoccupy` derelict). **One new problem:** its schedule, VV12-r5-02.
* V02 X34 and X36, §1b, §1c, §1d, §2.4 kept as written (repair's reasons checked: none restates the comparison's case
  list). The V03 §3.13 damage-layer row repair-r5-V02 hands to this round ("every element damaged at 1") carries "an
  element a restoring re-cut or a later `extend` adds … drawn as built, never repaired, its peak read from its entry week"
  as its own case in the same row, so no built outcome is ambiguous; no finding.

**Other units' round-5 text meeting V01/V02** (14 added passages citing V01/V02 or their services, all read):
* R5-02 (raised ways held from creation; a later wall runs on beneath the deck; supersedes R4-09): V01 §3.17.3 (3) is the
  ladder §2.7's support step (6) (a) and §4.3's P1 cite; V01's raised-gate and wall-arch readings (§3.4.2 (a) l. 978,
  §3.6 (5) l. 1424, §3.17.3 (6)) stand, since a raised gate still exists where a raised way is created across a standing
  wall; V01 §3.17.3 (2)'s under-deck strip, `campLand`'s strip exclusion and T-V1-51 read nothing R5-02 removed. V02
  §3.17 (b) (no building under a deck; J-V2.89) reads nothing R5-02 changed (a wall run beneath a span is no building).
* R5-03 (a late calamity held in `DossierBinding.lateCalamities`): V01 §3.16 (2) reads the carried `calamity` fact,
  "never from the committed `epoch` events", so a held calamity still gives its targets and pattern; T-V1-60 (d) runs
  that case. No conflict.
* R5-05: V07 §5.5's new drawn-week sentence (l. 3382–3383) cites V01 §5.4 (3) and agrees; base §12.5 lists V01's areas
  and gaps among the index's parts.
* R5-06: V07's new count restatements (l. 2966, 3436–3438, 3701–3702) state V01 §3.16 (5)'s max(k, |`matched`|) and the
  fire's shortfall exactly. V08 §7.1's new fixture (`town-1`'s river parting its districts, l. 3249–3256) rests on
  II.1's one-sided water run, which `DisasterUnit.neighbours` ("the units it shares a boundary run with (a district: a
  seam, II.1)") reads — agrees with V01 §3.16 (4) "a fire never jumps a gap".
* V09 l. 4436–4438 (V01's W10), V12 l. 2176 (J-V1.97), l. 2695–2697 and 3423 (V01 §3.16 (5)): resolve and agree.

## 3. Mechanical checks

* **References** (assemble-r5's `refs.py` over the live set): 56 169 checked, **0 broken**, 0 FIX; V01 3 396 resolved,
  15 ambiguous-form, 17 external; V02 2 715 resolved, 13 ambiguous-form, 11 external — the ambiguous ones all outside the
  round-5 hunks (none new); every reference in the hunks resolves (V01 §5.4, §6, §3.16, §3.18, §7, §8.1; base §2.9, §6.3,
  §11.2, §12.5, §13.6, §16; V06 §8, §3.15.2; V07 §5.6, §8; V08 §3.16; V12 §3.6; V02 §5.7, §8.6; V03 §5.6, §3.11; V06
  §3.23, §3.8.2; V12 §3.7.8, §2.13; T-V1-59, T-V1-60, T120-2, T120-4, T-V9-66, T123-7, T-V2-59, T-V3-39, T-V7-69).
* **Ids:** no T-V1, T-V2, J-V1, J-V2 or X id added or removed this round; T-V1-1 – T-V1-60, J-V1.1 – J-V1.105,
  T-V2-1 – T-V2-60, J-V2.1 – J-V2.113 each defined once (V02 §3.10's *The bars' registrations* table and T-V2-4's "beyond"
  item are references, not definitions).
* **Scans of the added text:** no deferral wording ("later" occurs only in "at the later of", a schedule comparison); no
  review id (R-nn, verifier ids); no phone clause anywhere in V01 or V02 (item 126 (a2)).
* **doc_checks** (`docs/validation/bench/doc_checks.py --doc <vol> --heads docs/ARCHITECTURE.md`): WARNING — reference
  corpus INCOMPLETE (captures, research/patreon, research/devlogs, research/ftg-docs, research/external missing), so the
  clean-room result is NOT authoritative (provisional). V01: C1 0, C2 0, C3 407 hits / 352 unreviewed, C4 2 / 0, S1 0,
  S2 286 / 3. V02: C1 0, C2 0, C3 600 / 536, C4 1 / 0, S1 0, S2 212 / 10. Equal to repair-r5-V01's and -V02's after
  counts (the C3 additions are section-number runs and function words of our own text).
* **Words** (`wc -w`): V01 84 778 → 84 968 (+190), V02 92 257 → 92 409 (+152); against the archive (91 139; 101 328)
  V01 −6.8 %, V02 −8.8 %. Neither shrank by more than half, so no nuance audit is due; this round removed no content
  (V01's 23 removed words are restatements of §12.5 now cited; V02 removed none).

## 4. Issues

Two new issues, both **minor** (J141: nothing built changes); 0 blocker, 0 major. Owners: V01 1, V02 1.

### VV12-r5-01 — minor — NEW-PROBLEM — owner V01

**Claim.** T-V1-59 (f)'s new clause (round 5, VV12-r4-02's fix) runs "a chip held on the district the epoch merged or split
away (§6.3's succession: its id no longer held at the head, V01 §5.4 (4))", but (f)'s fixture is "a B-EDIT CITY document
whose epoch after the drawn week split a district, built the only member of a chip's class in a second district and
closed the only one in a third" — a split, no merge. Under §6.3's anchor table a district's anchor is "its seed feature's
address", radius "same feature", so the split's child on the old seed succeeds it and takes its id (V01 §2.5's comment:
"a district succeeded by the anchor rule (a merge or split) carries … to its anchor successor"). On the fixture as
written the split district's id is still held at the head, so the clause has no subject: its "at the head it stays at
count 0, dark" cannot be run there (the chip lifts the successor). The rule (V01 §5.4 (4)) is defined; the fixture omits
the case its own clause names, so a build agent adds one — nothing built changes (R5-01's grading: a fixture omitting a
case its own test names is MINOR).

**Required change.** T-V1-59 (f): "on a B-EDIT CITY document whose epoch after the drawn week split a district, built the
only member of a chip's class in a second district and closed the only one in a third" → "… and closed the only one in a
third, and merged a fourth into its neighbour (the fourth's id no longer held at the head, §6.3)"; and "a chip held on the
district the epoch merged or split away (§6.3's succession: its id no longer held at the head, V01 §5.4 (4))" → "a chip
held on the fourth district (merged away by the epoch: its id no longer held at the head, §6.3's succession, V01 §5.4
(4))".

### VV12-r5-02 — minor — COHESION — owner V02

**Claim.** repair-r5-V02's sweep added to §7.8's damage sub-fixture the house "once reoccupied from derelict by another
household (V06 §3.8.2 (2)), its re-cut (V03 §3.11) minting rooms for them while its `repair` Works runs past its epoch's
week" and to T-V2-59 (c) the bar on its minted roof bays and outer runs. That case needs an epoch's regrowth tier (2) and
V06 §3.23 (3)'s restoration-end week, which land with V06's E2 (V06 §8: "E2 — decline and regrowth …"; "V03's damage
layer reading every building at V11's default age until E2 lands"). T-V2-59 runs at V02 §8.6's M6b ("the exterior's damage
at the later of M6b and V03's item-123 plan step"), and M6 (V02) may start after M5 while M6-E runs beside M5 (INDEX §3),
so M6b's exit can come before E2. §8.6's note covers the level ("until V06's decay level lands (M6-E) the level is read
from the existence state alone at V11's default age") but names no later exit for the epoch case; INDEX §5 risk 2 moves
such a clause "to the first exit after the provider (each named in its volume)", and T-V3-39 runs the same case "from
M6-E, week by week over V06's decay runs". A build agent applies risk 2's rule — nothing built changes (the class of
VV12-r4-04 and R5-05 (c)).

**Required change.** V02 §8.6's paragraph, after "until V06's decay level lands (M6-E) the level is read from the existence
state alone at V11's default age (V06);", add "T-V2-59 (c)'s house reoccupied from derelict at an epoch (§7.8's damage
sub-fixture; V06 §3.8.2 (2)) and its restoring re-cut's minted elements run at the later of M6b and V06's E2 (V06 §8: its
regrowth tiers and the decay level with its restorations, V06 §3.23 (3));".

## 5. Summary

Round-4's four findings are all FIXED on the live text, each END line's second end written (base §11.2 for VV12-r4-01;
R5-02's P1 at base §4.3 for VV12-r4-03; T-V1-60's timing for R5-05's END). Round 5's V01 and V02 blocks read whole: the
Find re-evaluation now cites §12.5's one budget, the held area chip has its bar, the timing cells name their later
exits, and V02 §5.7, §3.18 (e) and §7.8 state R5-04's entry-week comparison and its restoring re-cut case. Two new
minor issues (a fixture lacking the case its new clause names; a new epoch fixture case with no named exit). 0 blockers,
0 majors. References 0 broken; ids unique; doc_checks provisional (corpus absent); no nuance lost.
