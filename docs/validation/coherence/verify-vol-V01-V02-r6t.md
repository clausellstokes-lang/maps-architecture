# Verify round 6 — volumes V01 and V02 — lane coherence/verify-vol-V01-V02-r6t

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/verify-vol-V01-V02-r6t; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-vol-V01-V02-r6t`, 2026-10-01 – 02)
- P0 brief read whole; resume check (no output, no LANDED): fresh start; r5t result (2 issues), adjudication-r6 (head,
  summary, TOC, Part A, R6-01, R6-02's lead, behaviour list, (M1)–(M11) and V01 Ends, R6-03, R6-04 – R6-11, Part H · V01,
  V02, rendering), repair-r6-V01 / -V02 whole headers and blocks, assemble-r6's sha table read; live V01 bd9b4ceb…, V02
  c7fbb705… equal assemble-r6's after; pre-r6 texts from 52a16b0 equal its before (V01 4585e1a5…, V02 fb46c676…): done
- P1 round-5 findings re-checked on the live text: done
- P2 V01 round-6 blocks read whole as diffs (13 hunks in §3.4.2, §3.6, §3.16, §3.17.3, §3.17.4, §3.18, §4.2, §5.1.3, ## 7,
  §8.2, ## 9), §3.17 read whole: done
- P3 V02 round-6 block (§8.6) read whole, with T-V2-59, T-V2-60, §7.8's fixtures, X36 and V06 §8's E-rows: done
- P4 other units' round-6 text meeting V01/V02 (R6-02's crossing and way-and-channel tables, R6-03, R6-10; every added
  line of the set citing V01/V02): done
- P5 references, ids, scans, doc_checks, words: done
- P6 report, result JSON, LANDED: done

**Scope.** `docs/volumes/V01-neighbourhoods.md` (sha256 bd9b4cebbb04f88e…, 3 756 lines) and `docs/volumes/V02-buildings.md`
(c7fbb7055d776409…, 4 227 lines) after repair round 6 / assemble-r6, both equal to assemble-r6's *after* column; the
pre-round texts taken from `52a16b0` (assemble-r5 landed; equal to assemble-r6's *before*: V01 4585e1a5…, V02
fb46c676…). Inputs: `verify-vol-V01-V02-r5t.md` and its result, `adjudication-r6.md` (binding; R6-01 – R6-11, Part H,
Part P's amended texts), `repair-r6-V01.md`, `repair-r6-V02.md`, `assemble-r6.md`, the live base and volumes. Ids outside
the round-5 findings and the round-6 blocks keep their earlier verdict. The design files are untouched.

## 1. Round-5 findings re-checked

| id | grade (Part H) | disposition | verdict on the live text |
|---|---|---|---|
| VV12-r5-01 | minor | FIX (R6-11) | **FIXED.** T-V1-59 (f) (l. 3360): the fixture now reads "… and closed the only one in a third, and merged a fourth into its neighbour (the fourth's id no longer held at the head, §6.3)", and its clause "a chip held on the fourth district (merged away by the epoch: its id no longer held at the head, §6.3's succession, V01 §5.4 (4))" — the required text verbatim. Under §6.3's succession (an old entity with no fresh entity within its anchor's radius becomes a tombstone) the fourth's id is gone at the head, so the clause's "at the head it stays at count 0, dark" now has its subject; an epoch can merge a district (§4.5's degenerate-face merge, §7.3's S6 regroup of the districts a region change touches). |
| VV12-r5-02 | minor | FIX (R6-09) | **FIXED.** V02 §8.6 (l. 3895–3904) carries the required clause, its one pointer written "V02 §7.8's damage sub-fixture" (a bare §7.8 is the base's *Controls*; the repair's change is right). The named exit is real: V06 §8's E2 row builds the siting tiers, "the crisis hand-over (… `crisisLookYields`) and the decay level (… `decayLevel`, `decayPeak`, restoration …)", as base §16's M6-E row says ("item 122's hand-over and item 123's decay level at E2"). The repair's class sweep adds T-V2-59 (a)'s patched rings, (c)'s restoration and the manor's `extend`, and T-V2-60 (a)'s weeks 10–17, (d)'s Works' stage from week 18 and (g)'s week step 17 → 18; each reads E2's restoration or `crisisLookYields`, and X36's stand-in ("nothing repaired; the look standing until its condition no longer stands") cannot pass them. One member of the class is still missing: **VV12-r6-02** below. |

Both round-5 findings are closed. Neither had an END line.

## 2. Round-6 blocks read whole

**V01** (repair-r6-V01: 11 REPLACE blocks, 21 edits; the diff shows 13 hunks; every other line verbatim):
* **VAF-R5T-01** (FIX per R6-03, amended): §3.16 (2), §3.18 (e)'s disaster row, T-V1-60 (d) and J-V1.104 carry Part H's
  four texts verbatim ("one a declared remap fills into an older document (V08 §2.7)"). V08 §2.7's carried-fact row and
  V08 §3.6 (2) state that case ("a calamity a declared remap fills into an older document is carried with no event"), so
  the gloss agrees with its home. T-V1-60's timing adds "(d)'s remap clause at the later of M5 and V08's SF3 (V08 §3.8's
  declared remaps)"; V08 §8's SF3 row holds "remaps and line migration", so the exit is real, and §8.2's W11 cell names
  it ("its village, scrubbed-week and remap clauses"). The R6-03 sweep holds in V01 and V02: no `lateCalamities`, held
  calamity, `W₀` or "last absorbed week" survives (searched).
* **VAF-R5T-02** (FIX per R6-02, amended PRB6-01): §3.17.3 (2) is Part H's text verbatim, the quotation of item 110 (b)
  kept. It agrees with the base's *beneath* ("*A `vault` span under the wall* … read `open` by every reader of its `use`
  … an `open` span to §4.3's crossing rule, the way-and-channel table and V01 §3.17.3 (2)–(3)").
* **VAF-R5T-03** (FIX): §3.17.4 names "a viaduct inside S4's route solve or a later stage's S5b … (item 290; §2.7's support
  step (6))"; base §2.7 (6) names the same commits ("at generation inside S4's or a stage's S5b route solve or at S6's
  end").
* **END of VM-R5T-03** (V1-1, V1-2, V1-3): §3.4.2 (a), §3.6 (5) and §3.17.3 (6) verbatim. "No gate on the deck" is the
  crossing table's own words (*beneath*: "No gate on the deck, which passes over the run …; gates counted on ground part
  0"), so the citation resolves to an outcome that exists.
* **The sweep's (3)**: §3.17.3 (3) is reduced to a citation of §4.3's crossing rule and the way-and-channel table's row
  (a), with V01's own ladder kept (F-TEMPLATE rungs 1–2, §4.6's lane ladder, the end at the strip's edge). **Nuance
  check** of what left (3): the clear width (≥ the way's width + `clearWidthM`), *The clearance*, ± `squareDeg` of square,
  "never along the strip" and "never through a pier" all stand at base §4.3 *Lattice and costs* (l. 5745–5747) and the
  table's lead (l. 2572–2575), with the standing-ring nuance (`ruined` standing, `cleared` open) added there; "only
  through an `open` span" stands as §4.3's "only under a span — an `open` one once the span rule has run", which is the
  timing-correct form for stage 2's S8 seeds (the span rule runs after §4.6's cut). No case, bar or rung lost.
* **T-V1-51 (c)** now reads a `vault` span under a wall `open` and names its fixture (a `wallside` district's wall street
  crossing under a `vault` span a wall's strip meets, square to the deck); a generated CITY builds it (an aqueduct at S6's
  end over a standing S5a trace: *over the band*, its spans over the band read by *beneath*). This is the test the
  *beneath* reading needs in V01 (brief (6) (b) (i)).
* **END of VAT-r5-04** (R6-10): §5.1.3's lead, slots 10 and 16, §4.2's T12 `dress` bullet, §3.18 (c)'s row and T-V1-56
  (c)'s clause carry the END's text. The row is §3.18 (c)'s (the only row holding the words, the END's "(e)" a slip the
  repair handled correctly). Base §8.2's `StyleSheet.groups` comment names "V01 §5.1.3's slot 16" and "slot 10" and the
  same members, so the two agree. **One new problem** left by the END's partial rewrite of §5.1.3's sentence:
  **VV12-r6-01** below.
* **R6-02 in V01, brief (6) (b)**: (i) V01 reads one outcome, *beneath*'s reading of a `vault` span under a wall, now run
  by T-V1-51 (c); (ii) no V01 site restates either table or keeps a crossing station, raised gate, wall opening, held
  stretch, stopped strip or `bend.wall.*` key (searched: 0 hits); (iii) every citation names an outcome or row that exists
  (*beneath* ×4, "row a", the crossing table whole; assemble-r6's `tablerefs.py`: 0 unresolved).

**V02** (repair-r6-V02: 1 REPLACE block, §8.6; one hunk): the M6b row unchanged; the paragraph adds VV12-r5-02's clause and
the class sweep (above). Every pointer resolves (V02 §7.8, V06 §3.8.2 (2), V06 §8, V06 §3.23 (3), V06 §3.22 (3), X36,
T-V2-59 (a) and (c), T-V2-60 (a), (d) and (g)). **One new problem**: the enumerated list omits T-V2-59 (e)'s epoch-vacate
clause, **VV12-r6-02** below. R6-02 and R6-03 need nothing in V02 (searched: no crossing station, raised gate, wall
opening, support step, `lateCalamities` or held calamity; V02 §3.17 (b)'s arch vault is V04's chamber, read only where one
exists). R6-07's two conditions stand in V02 already ("level 0 (never abandoned, under no look)", l. 2519, 3052).

**Other units' round-6 text meeting V01/V02** (every added line of the set citing V01 or V02, read): base way-and-channel
row (a) ("V01 §3.17.3 (3)'s F-TEMPLATE rungs and §4.6's lane ladder") and *beneath* ("V01 §3.17.3 (2)–(3)") agree with
V01's (2)–(3); base §8.2's `groups` comment agrees with V01 §5.1.3; V09's T12 row ("the **Trees** and **Pins** switches
(V01 §5.1.3's group switches …)") and §5.7 agree but for V01's "view bar" (VV12-r6-01); V10's "(V01 §3.16's scatter at
`previewSeverity`)" agrees with V01 §3.18 (c); V11's W50 row and V12's `item123.damage` pin row (the damage
sub-fixture's exteriors, T-V2-59 (d), no look over them) agree; base §13.2's "volume 2's T-V2-50" is a reflow, unchanged.

**Observed, not re-raised (other seats' findings, outside the round-6 blocks or outside V01/V02):**
* V01 §1.2's hook row "V04 §3.5.4 (item 244's span rule)" names a reader (V04 §3.5.4 (d): "The base fixes each span's
  `use` eagerly by §2.7's span rule") as the span rule's provider; the home is base §2.7 (V04 l. 220 lists the span rule as
  the base's). The row predates this round (assemble-r0) and the repair's sweep left it standing; I concur with
  verify-agree-fabric-r6t's **VAF-R6T-04** and its required change.
* T-V3-40's timing cell names no exit after V06's E2 for (b)'s hand-over clause (repair-r6-V02's HAND-OFF, not routed by
  an adjudication): V03's text, raised by verify-agree-time-r6t as **VAT6-r6-04**; I concur.
* The second half of verify-agree-tools-r6t's VAT-r6-03 (§3.18 (c)'s "view only" for the group switches): not a defect
  in my reading — "view only" is the row's pre-round wording for the style's `details` and `shadows` as well, the Find
  row's longer outcome is that row's own, and T-V1-56 (c) states the logged `setStyle`; a builder builds the same.

## 3. Mechanical checks

* **References** (assemble-r6's `refs.py` over the live set): 56 555 checked, **0 broken**, 0 FIX; V01 3 409 resolved, 15
  ambiguous-form, 17 external; V02 2 723 resolved, 13 ambiguous-form, 11 external. The one new ambiguous-form site in V01
  (l. 978, "§2.7's crossing table" after "V01 §2.3's parts table") is the base's §2.7, as canon S7 reads it — confirmed.
* **Ids:** no T-V1, T-V2, J-V1, J-V2 or X id added or removed this round (the sets equal before and after); T-V1-1 – T-V1-60,
  J-V1.1 – J-V1.105, T-V2-1 – T-V2-60, J-V2.1 – J-V2.113 each defined once (V02 §3.10's registrations table rows are
  references).
* **Scans of the added text:** no deferral wording ("later" only in "at the later of", a schedule, "a later calamity", "a
  later stage's S5b"); no review id (R-nn, PRB6-nn, verifier ids); no phone clause anywhere in V01 or V02 (item 126 (a2)).
* **doc_checks** (`docs/validation/bench/doc_checks.py --doc <vol> --heads docs/ARCHITECTURE.md`): WARNING — reference
  corpus INCOMPLETE (captures, research/patreon, research/devlogs, research/ftg-docs, research/external missing), so the
  clean-room result is NOT authoritative (provisional). V01: C1 0, C2 0, C3 407 hits / 352 unreviewed, C4 2 / 0, S1 0,
  S2 286 / 3. V02: C1 0, C2 0, C3 601 / 537, C4 1 / 0, S1 0, S2 214 / 10. Equal to repair-r6-V01's and -V02's after counts.
* **Words** (`wc -w`): V01 84 968 → 85 091 (+123), V02 92 409 → 92 523 (+114); against the archive (91 139; 101 328)
  V01 −6.6 %, V02 −8.7 %. Neither shrank by more than half, so no whole-unit nuance audit is due; the one cut (V01
  §3.17.3 (3)'s restatement of §4.3's crossing rule, 31 words) was audited above: nothing lost.

## 4. Issues

Two new issues, both **minor** (J141: nothing built changes); 0 blocker, 0 major. Owners: V01 1, V02 1.

### VV12-r6-01 — minor — CONFLICT — owner V01

**Claim.** R6-10's END rewrote V01 §5.1.3's lead to "**Group switches** (T12's `setStyle` of `StyleSheet.groups`, §8.2; NG
F1): the hood pins, model pins and access symbols belong to the `pins` group and block trees to the `trees` group", but
left the sentence's end, "so the view bar hides them as Neighbourhood's keys do" (l. 3037–3039). The switches are the Dress
panel's: V09 §4.5's T12 `dress` row (l. 1825: "the **Trees** and **Pins** switches (V01 §5.1.3's group switches …)") and
§5.7 (l. 4003), base §8.2's `groups` comment ("T12 `dress`'s switches hide …") and base l. 13676–13678 (a layer's own
visibility by "§7.8's layer controls … a logged `setLayer`; the trees and pins drawing groups … switched by
`StyleSheet.groups` … and no drawing group by `setLayer`"). V09's view bar (l. 3799) holds the layer toggles (§7.8) and no
group switch. V01 now says one panel and V09 another; the switch's builder follows V09, the interface's home, so nothing
built changes. The same defect as verify-agree-tools-r6t's VAT-r6-03 (1) and verify-vol-V09-V10-r6t's VV910-r6-03 (one
fix).

**Required change.** V01 §5.1.3: "so the view bar hides them as Neighbourhood's keys do" → "so the Dress panel's **Trees**
and **Pins** switches hide them (V09 §4.5's T12 row), as Neighbourhood's keys do".

### VV12-r6-02 — minor — COHESION — owner V02

**Claim.** Round 6's §8.6 paragraph (VV12-r5-02's fix and its class sweep under R6-01 (2) and R6-09) now lists the T-V2-59
and T-V2-60 clauses that run after M6b because their provider lands with V06's E2, and its repair report says every other
clause "runs as before". One more clause of the class is missing. T-V2-59 (e) (l. 3773–3774) runs "a plan derived while
the building stood, the building then abandoned by an epoch's `vacate`, stays in force with its `wings` and `rooms` rungs
`current`" (V02 §3.18 (e)'s row at l. 2555 names T-V2-59 for it). An epoch's `vacate` is issued only by V06's
`departures` step (V06 §3.2's step table, row 7: "the departure matching, `relet` down, `vacate` | V06 §3.5.1"). That step
is not among the nine base phases E1 runs (V06 W36: prelude, demand, field, dossier, siting, growth, lapse, character,
works; T-V6-1: the grow-by-stage strategy "reproduces M4's grow path" with them). It lands with E2 ("E2 — decline and
regrowth | departures, …"). M6b's exit can come before E2 (M6 may start after M5 while M6-E runs beside it, INDEX §3, the
premise §8.6 itself states). With the list now enumerated, a builder reads (e) as an M6b clause. INDEX §5 risk 2 moves it
"to the first exit after the provider (each named in its volume)", so a build agent applies that rule; nothing built
changes (the class of VV12-r5-02, graded minor).

**Required change.** V02 §8.6's paragraph, after "since until E2 lands V02 reads X36's stand-in — nothing repaired, the look
standing until its condition no longer stands;", add " T-V2-59 (e)'s plan in force after an epoch's `vacate` runs at the
later of M6b and V06's E2 (V06 §3.5.1's departure matching, which issues `vacate`);".

## 5. Summary

Round 5's two findings are FIXED on the live text (T-V1-59 (f)'s merged fourth district; V02 §8.6's E2 exit, with the
class sweep). Round 6's V01 blocks carry Part H's and the END lines' texts verbatim: the remap-filled calamity (R6-03) at
four sites and its SF3 exit; §3.17.3 (2)–(3) and (6) and the gate readings citing §2.7's crossing table, *beneath*, and
the way-and-channel table's row a; T-V1-51 (c)'s fixture for a `vault` span under a wall; the group switches (R6-10) in
§5.1.3, §4.2, §3.18 (c) and T-V1-56 (c). No crossing station, raised gate, wall opening, held stretch or held calamity
survives in V01 or V02; the one cut (§3.17.3 (3)'s copy of §4.3's crossing rule) lost nothing. Two new minor issues: V01
§5.1.3's "view bar" against V09's Dress panel; V02 §8.6's list missing T-V2-59 (e)'s epoch-vacate clause. 0 blockers,
0 majors. References 0 broken; ids unique; doc_checks provisional (corpus absent); no nuance lost.
