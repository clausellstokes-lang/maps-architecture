# Verify round 6 — volumes V07 and V08 — lane coherence/verify-vol-V07-V08-r6t

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/verify-vol-V07-V08-r6t; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-vol-V07-V08-r6t`, 2026-10-01)
- P0 brief read whole; inputs located (r5t findings, adjudication-r6 R6-01 – R6-11 with Part H · V07 / V08 and Part P, round6-work V07 / V08, repair-r6-V07 / -V08, assemble-r6); live V07 46dfede9… and V08 83382cac… equal to assemble-r6's after-hashes; pre-round-6 texts from git 52a16b0 equal to its before-hashes (7747179d…, 8b5b5243…): done
- P1 the five round-5 findings re-checked in the live text, with their second ends (base §4.11 *The clock* (1) and (4), §2.9, §7.1, §7.4, §7.7, V06 §3.11.1 and §4.4, V01's four sites, scope's T76-1 and §13.8 row): done — all five FIXED (VV78-r5-01 closed in the form R6-03 rules: nothing is held)
- P2 the round-6 blocks (V07 7 blocks / 11 hunks, V08 11 blocks / 14 hunks) read by word diff, then subsection by subsection with the texts they cite, §2.7's two tables cell by cell where V07 reads them: done — 3 new findings
- P3 ids, references, terms, deferral and narration, sizes, doc_checks (provisional, corpus incomplete): done
- P4 report, result file (docs/validation/coherence/results/coherence_verify-vol-V07-V08-r6t.json), LANDED: done

**Summary.** All five round-5 findings are FIXED in the live text, each in the form adjudication-r6 rules: VV78-r5-01
(pipeline's held calamity in a detached copy) is closed by R6-03 as amended — nothing is held, so a copy forked meanwhile never
receives the deferred calamity (base §4.11 *The clock* (4), V06 §4.4), and `DossierBinding.lateCalamities` is gone from §7.1,
§7.4, §7.7 and V08; VV78-r5-02 per R6-03 amended (§4.6's `late`, `lateCalamity` and `lateDeferred` variants, the last a
`standing` note); VV78-r5-03 and VV78-r5-05 as written (R6-11); VV78-r5-04 as written (R6-03). V07's round-6 issues
(VAL-R5-03 per R6-02 as amended, VAP-r5-04, VV910-r5-03) and its END line (T-V7-23's arena margin), and V08's (VAP-r5-02,
VEL5-r5-02, VEL5-r5-03, VV78-r5-02 – -05) are applied as Part H rules them. V07 keeps no crossing station, raised gate, wall
opening or held stretch; every crossing-table citation names an outcome or row that exists; V07 and V08 hold no held-calamity
clause. The round's own text yields **3 open issues: 0 blocker, 0 major, 3 minor** — owners V07 2, V08 1: crossing-table
cells W9·C3–C6 and C8 name T-V7-48, which does not hold the hand-off down in those states (nor assert the palisade's
`W_RAISED_CROSSING` W1 names); T-V7-48's new clauses that run V06's E3 steps are not among V-M3's named V06 clauses; SF4's
exit cell omits T-V8-11's new SF4 clause. References 0 broken; ids unique; 0 retired terms; no deferral or narration; no phone
clause; words V07 101 119 → 101 591, V08 92 002 → 92 453; doc_checks provisional (corpus incomplete), no new unreviewed hit.

## Inputs and method

* Live units: `docs/volumes/V07-village.md` sha256 `46dfede9…` (613 621 bytes, 4 098 lines) and
  `docs/volumes/V08-settlementforge.md` `83382cac…` (582 193 bytes, 3 735 lines), equal to assemble-r6's after-hashes; the base
  `f39f1c30…` likewise. The pre-round-6 texts are git `52a16b0` (V07 `7747179d…`, V08 `8b5b5243…`), equal to assemble-r6's
  before-hashes.
* Round-6 blocks in scope: V07 7 (## 1b, §3.5a, §3.12a, §3.17, §4.5, ## 7, ## 12; 11 changed hunks), V08 11 (## 1b, §2.3, §2.7,
  §3.2, §3.6, §3.8, §3.17, §4.6, ## 6, §7.1, ## 9; 14 changed hunks). Each hunk was read by word diff and then in its whole
  live subsection, with the texts it cites: base §2.7's support step (6) — the crossing table (13 × 13 cells, the four outcomes,
  the C-column readings) and the way-and-channel table —, §3.2 (9), §4.11 *The clock* (1), (2), (4), §7.1's `dossierFacts`,
  §7.4's dossier row, §7.7's `DossierBinding`, §14's `PortNote`; V01 §3.16 (2), §3.18, T-V1-60 (d), J-V1.104; V04 §3.5.4 (d);
  V06 §3.11.1, §4.4, T-V6-27, §8's E-rows; V09 §4.21.12 (4) and its `info.crisis.<line>` string row; scope's T76-1 and §13.8.
* Binding: adjudication-r6 (R6-01, R6-02 and R6-03 as amended by Part P, R6-05, R6-06, R6-11; Part H · V07, · V08), with
  adjudication-r2 – r5 where not superseded by name. R6-02's list "What changes in behaviour" is the owner's to accept or veto;
  nothing below is raised because it differs from the earlier design.

## P1 — the round-5 findings, re-checked in the live text

| id | grade (r6) | disposition (Part H) | verdict | where |
|---|---|---|---|---|
| VV78-r5-01 | major | FIX per R6-03, amended | FIXED | base §4.11 *The clock* (4) in R6-03's words (a late calamity with `W₁` not after `W₀` left uncarried with its targets' records, each whole, and a condition naming it, noted `lateDeferred`; nothing held; "a copy forked meanwhile never receives them (V06 §4.4)"); (1) "the greatest week the folded events carry"; §2.9's `EpochRecord` comment; §7.7's `lateCalamities` line and §7.1's member deleted, §7.4's row as R6-03 words it; V06 §4.4's `forkAt` sentence; V08's ends (below); T76-1 and its §13.8 cell (M6-E's E8 for the burial-need clause) |
| VV78-r5-02 | minor | FIX per R6-03, amended | FIXED | V08 §4.6's `unreceipted_change` row: `late` for a non-calamity change, `lateCalamity` for one carried late, `lateDeferred` for one left uncarried (its string re-worded by the seat to 25 words, every element kept, for T-V8-14's bar), the args and Show cells, the class cell `standing` for `lateDeferred` (PRB6-15); §3.6 (3), §3.17's row, T-V8-49 (g) |
| VV78-r5-03 | minor | FIX (R6-11) | FIXED | T-V8-61 (a): the reopen after the lit `city-1` year (its three institutions `ruined` by `destroyed_by_disaster`) by a test-side mutation, and after the probe town's plain or lit year for a `remnant` record |
| VV78-r5-04 | minor | FIX per R6-03 | FIXED | V08 ## 6's catch-up row and §3.6 (6): a late calamity's F5 targets' events ride its epoch's `EpochInputs.dossier`, never the batch |
| VV78-r5-05 | minor | FIX (R6-11) | FIXED | V08 §3.17's digest-and-diff row cites §3.6 (3)'s target (a readable `populationHistory` entry, else linear toward the carried population) |

The other round-6 issues V07 and V08 own were checked in the live text as Part H rules them: **VAL-R5-03** (V07 §3.5a (4),
§3.17's palisade row, T-V7-48, §3.12a (4) (d) — Part H's text word for word, with the seat's two added citations, V04 §3.5.4 (d)
and *down before the wall* for a hand raised road, each citing an outcome by name; §3.5a (2)–(3) and ## 12 conformed by the
seat's sweep; the T-V7-48 clauses of note 2 run cells W2·C9 and W13·C9 and the table's lead); **VAP-r5-04** (T-V7-69's two
test-side mutations; T-V7-69 (c)'s two cases now held, the isolated end asserted by the harness); **VV910-r5-03** (V07 §4.5,
W74, T-V7-69 (e) — the five key names agree with V09's `info.crisis.<line>` row); the **END** (T-V7-23's arena clause; the
seat's "§3.2 (9)" for Part H's "§3.2 (1)" is right: base §3.2 (9) states "the arena spans the frame plus `marginShare`",
§3.2 (1) is *Integer world and range*); **VAP-r5-02** (V08 §7.1's famine at severity 0.5, read by T-V9-85 and T-V10-52);
**VEL5-r5-02** (V08 §2.3, W20, §2.7's row deleted, §3.2, §3.6 (3)–(4), §3.17's row, T-V8-49 (g) with PRB6-15 and PRB6-19's
clauses and VEL5-r5-01's V08 end, J-V8.55's amended mark); **VEL5-r5-03** (§3.8's `quarantined` re-key, §2.7's migrate cell,
T-V8-11 and its split tier — but see VV78-r6-03). All FIXED, with the new problems below.

## P2 — the round-6 blocks, read whole: new problems

**V07 — R6-02's family (round-6 note (6) (b)).** (i) *Each cell V07 reads gives one outcome and names a test that runs it.* V07
reads W1·C2, W1·C8 and W1·C9 (VS3's palisade laid after a declared or carried-down raised way), W2·C9 (a village T3 `wall`), W3·C9
(a village Regenerate), W4–W8·C9, W10·C9, W11·C9 and W13·C9 (the hand ops at a village), every cell of W9 (the hand-off down)
and the way-and-channel table's row (a) (a village tracker). Each gives one outcome. T-V7-48 runs W1·C2/C8 (the declared
viaduct and aqueduct), W1·C9 and W3·C9 (the Regenerate clause re-lays the palisade after the carried-down raised way), W2·C9,
W4–W8·C9, W10·C9, W11·C9 and W13·C9 (note 2's clauses), W9·C2/C9 and W9·C12, and row (a). It does **not** hold the hand-off down
with the carried raised way in the states W9·C3, C4, C5, C6 and C8 name ("as C2 · T-V7-48"; C10 and C13 are events before the
hand-off that leave the deck standing, so they reduce to C2), and it asserts no `W_RAISED_CROSSING` for the palisade, which
W1's last column reports for VS3's trace and whose village cell (W1·C2) names T-V7-48 → **VV78-r6-01** (minor). (ii) *No site
restates the tables in its own words or keeps a station, raised gate, wall opening or held stretch.* None of the four survives
in V07 or V08 (searched: crossing station, raised gate, wall opening, held stretch, built against, abut — the one "abuts" left
is §3.12a (4) (d)'s ruin, now defined in place —, support step (6), (6) (d), `bend.wall.held`). V07 §3.5a (4) and §3.17's row
restate parts of *beneath*; the words are Part H's own text for VAL-R5-03, so they are ruled, and they agree with the base's
*beneath* (the band laid through a road deck's support, the line bent locally round an aqueduct's supports and beyond a road
deck's foot, the cap at the soffit, the gate moved along the trace with the track following, no gate on the deck). (iii) *Every
citation names an outcome or row that exists:* V07 cites *beneath*, *over the band*, *down before the wall*, *unchanged meeting*
and the way-and-channel table's row (c), all defined (assemble-r6's `tablerefs.json`: 0 bad).

**V07 — the new clauses' schedule.** T-V7-48's tier is "C | V-M3". The round added clauses that run V06's E3 steps on the
carried-down fixture — the palisade's V07 §3.4 (8) decay beneath the deck (V06 §3.7's walls step at a village epoch, V06 §3.7.7,
E3) and a hand `absorbWall` (V06 §2.8's EvolveOp, built at E3) — and the fixture itself needs V06's epochs to hand down (as
T-V7-51 does). V07 ## 8's V-M3 exit names "the clauses that run V06's steps" — T-V7-16, T-V7-30, T-V7-50's desertion clause,
T-V7-35's promotion clause, T-V7-51, T-V7-59, T-V7-62's epoch clause — "at V-M3's exit where M6-E's E2–E4 have landed, else at
the first V07 exit after E4", and §1 (14) lists the V06 steps V-M3 runs; neither names T-V7-48's clauses or the walls step,
and risk (8) moves only T-V7-48's arch-vault and decline readings → **VV78-r6-02** (minor; R6-09's class).

**V07 — other hunks.** §3.5a (2)–(4) read whole against the crossing table: the palisade is VS3's bent group (PRB6-08), its gate
moves with the track following (*beneath*'s village clause), "A raised way crossing the circuit makes no gate" agrees with "no
gate on the deck"; §3.12a (4) (d) keeps the old abutment's meaning in its own words (no nuance lost); §4.5, W74 and T-V7-69 (e)
agree with V09 §4.21.12 (4); T-V7-69's fixture list holds (c)'s two cases on frozen small-dossier VILLAGE fixtures (V07 §7's
bench names them); T-V7-23's clause reads `rules.vg.frameM` and `rules.vg.marginM` (§2.2a) and base `Frame.marginShare`'s
`VG` reading; ## 12's "town walls passing under aqueduct arches" agrees with behaviour change 8. No NUANCE-LOST: what R6-02
removed from V07 (the station, the arch vault kept whole in the line, "built against aqueduct piers") is the ruling's own
equivalence list.

**V08 — R6-03's family (round-6 note (6) (c)).** No held-calamity clause stands in V08 or anywhere in the set (searched
`lateCalamities`, "held late", "held in the binding", "a later absorb folds", `unreceipted_change.late`, "fork"). V08 §3.6 (3)
agrees with base §4.11 *The clock* (4) clause by clause; §3.2's `unchanged` sentence and §3.6 (4)'s report-only note cover the
deferral-only absorb (PRB6-15); the `lateDeferred` note's identity is well defined (V08 §2.4: H128 over kind, `msg` — the
variant's key — and keys), so a standing note written while the calamity waits is cleared by `notesCleared` at the absorb that
carries it, or at any run that no longer finds it, or re-identified after a line migration; the host offers again only on a
changed raw hash (§3.2), and an absorb past `W₀` needs a later tick in the dossier, so the deferred calamity is offered again;
T-V8-49 (g) holds every step of R6-03's life (carried late, deferred with and without other changes, the turned-back clock, the
current week); T-V8-11 holds the migration step; V06 §3.11.1, §3.21 and T-V6-27 hold the strike and its order; V01's four
sites, scope's T76-1 and §13.8 agree. **One milestone cell lags:** T-V8-11's tier now splits "nightly, SF3; the
uncarried-calamity clause nightly, SF4", in the form of T-V8-18, -40, -46 and -53, whose later clauses the VH row's exit cell
names; SF4's exit cell does not name T-V8-11's → **VV78-r6-03** (minor).

**V08 — other hunks.** §2.3's lead and W20 name `quarantined` and `notes` only; §2.7's `quarantined` row gains its migrate
clause in the migrate column (cell counts checked: 0 bad rows in either volume); §3.8's re-key bullet parses; §7.1's famine
fixture names its two readers; J-V8.55's amended mark states R6-03's rule; §4.6's three strings are within T-V8-14's 25-word
bar (16, 20 and 25 words with `{name}` for `late`, `lateCalamity` and `lateDeferred`); the class cell's per-variant class is stated where V08 §2.4 says classes live.

## P3 — ids, references, terms, sizes, doc checks

* **References:** assemble-r6's full check over the live set (equal to these files) reports 56 555 checked, 0 broken; its
  ambiguous-form list holds no V07 or V08 site; its `tablerefs.json` resolves every name cited from §2.7's two tables (V07: 2
  outcome citations, 0 bad).
* **Ids:** no duplicate `T-V7-`, `T-V8-`, `J-V7.`, `J-V8.` or `W` row id; T-V7-1 – 69, J-V7.1 – 146, W1 – W84 (W40 retired),
  T-V8-1 – 63, J-V8.1 – 137, W1 – W101 (W42 retired); none new this round. No review id or amendment marker in either volume.
* **Terms:** the canon's 35 retired-term patterns find 0 hits in the round's added text (1 476 words).
* **Deferral and narration:** none in the added text. **Owner item 126 (a2):** V08's phone clauses all state "no map on a
  phone" (unchanged this round); V07 has none.
* **Sizes** (whitespace-split words, the method of rounds 0–5): V07 101 119 → 101 591 (+0.5 %; archive 104 422, −2.7 % overall);
  V08 92 002 → 92 453 (+0.5 %; archive 84 356, +9.6 % overall). A repair round adds ruled text at build depth; neither unit has
  shrunk by more than half against its archive, so the guard's nuance audit is not triggered.
* **doc_checks.py** (`--doc` each volume, `--heads docs/ARCHITECTURE.md`) — WARNING: reference corpus INCOMPLETE (captures,
  research/patreon, research/devlogs, research/ftg-docs, research/external missing): NOT authoritative, provisional. V07: C1 0,
  C2 0, C3 364 / 318 unreviewed, C4 1 / 0, S1 0, S2 415 / 0 (before the round, run here on git 52a16b0's text: C3 366 / 320,
  S2 414 / 0 — two C3 runs gone, "the palisade is a wall" and "a gate and a gate", none new). V08: C1 0, C2 0, C3 183 / 155,
  C4 2 / 0, S1 0, S2 284 / 2 (unchanged from before the round; the same two unreviewed pointers). No new unreviewed concern.

## Issues (round 6)

### VV78-r6-01 — minor — EDGE-UNTESTED — owner V07

**Claim.** §2.7's crossing table gives the hand-off down (row W9) for every raised-way state, and its cells W9·C3 (one span over
the band fallen), C4 (every span fallen), C5 (a support in or by the band cleared or toppled), C6 (a `vault` span breached) and
C8 (held) each read "as C2 · T-V7-48". T-V7-48 holds the hand-off down only with a standing deck — "the carried-down raised way
meeting the palisade as it met its CITY fixture's innermost ring" — and with a frame-grown one (C12); its clause "after a support
is `cleared` the band stands whole across its footprint" is tied to no hand-off. So no bar runs the hand-off of a ring whose
span over it has fallen, whose support is cleared or whose raised way is locked. Likewise W1's last column reports
`W_RAISED_CROSSING` once per crossing of a deck line for every W1 trace, VS3's palisade among them, and the village cell W1·C2
names T-V7-48, whose palisade clauses assert no report. Each outcome is defined (*unchanged meeting*, read as *beneath*), the
readings are run at a town (T110-2 (7)) and the hand-off's unchanged fabric by T-V7-51, so nothing built changes: a cell naming
a test for a case the test does not hold (R6-11's class), MINOR.

**Required change.** V07 ## 7, T-V7-48: after "its line bent to cross the declared aqueduct under a span and to pass beyond each
ramp's foot, no ramp, stair or foot in it," add "each crossing of the palisade's line with a deck line reported
`W_RAISED_CROSSING` once (§2.7's crossing table, W1),"; and after "its deck extended by a frame growth before the hand-off down,
carried down and meeting the palisade as a standing raised way does;" add "that CITY fixture also handed down after V06
§3.19.2's decline, scripted, has left one span over its innermost ring `ruined` (a `vault` span in one variant), every span
over that ring fallen, or a support in the ring's band `cleared`, and once with the raised way locked — in each the hand-off
writing nothing of the raised way or the ring's runs, and the palisade read by §2.7's crossing table, *beneath* (its run at its
own top beneath each fallen span, no chamber under the `vault` span, the band whole across the cleared support's footprint);".

### VV78-r6-02 — minor — NEW-PROBLEM — owner V07

**Claim.** VAL-R5-03's T-V7-48 text (as Part H words it) adds clauses that run V06's E3 steps on the carried-down fixture: "a
V07 §3.4 (8) decay … of the palisade's run beneath the carried-down deck" (V06 §3.7's walls step at a village epoch, V06 §3.7.7,
E3) and "`absorbWall` of the palisade beneath it" (V06 §2.8's EvolveOp, built at E3, V06 §8's E3 row); the fixture itself is
handed down by V06's epochs, as T-V7-51's is. T-V7-48's tier cell reads "C | V-M3". V07 ## 8's V-M3 exit names "the clauses that
run V06's steps (T-V7-16, T-V7-30, T-V7-50's desertion clause, T-V7-35's promotion clause over epochs, T-V7-51, T-V7-59, T-V7-62's
epoch clause) at V-M3's exit where M6-E's E2–E4 have landed, else at the first V07 exit after E4", and V07 §1 (14) lists the V06
steps V-M3's clauses run; neither names T-V7-48's clauses or the walls step, and risk (8) moves only T-V7-48's arch-vault and
decline readings. R5-05 (c) and R6-09: a clause whose provider lands later runs at the first exit after it, each named in its
volume. A milestone cell omitting a clause; MINOR.

**Required change.** V07 ## 8's V-M3 exit cell: "the clauses that run V06's steps (T-V7-16, T-V7-30, T-V7-50's desertion clause"
→ "the clauses that run V06's steps (T-V7-16, T-V7-30, T-V7-48's carried-down clauses — the CITY fixture handed down, its frame
growth, the palisade's decay beneath its deck and the hand `absorbWall` —, T-V7-50's desertion clause". T-V7-48's tier cell
"V-M3" → "V-M3 (its carried-down clauses as ## 8's V-M3 exit states)". V07 §1 (14): "and a carried raised way's decline (V06
§3.19.2, E3);" → ", a carried raised way's decline (V06 §3.19.2, E3) and the walls step's condition and `absorbWall` on
the palisade (V06 §3.7.7, V06 §2.8, E3);".

### VV78-r6-03 — minor — NEW-PROBLEM — owner V08

**Claim.** VEL5-r5-03's fix split T-V8-11's tier: "nightly, SF3; the uncarried-calamity clause nightly, SF4" (the strike needs
SF4's calamities into `EpochInputs`, T-V8-42). V08's other split tiers (T-V8-18, T-V8-40, T-V8-46, T-V8-53) have their later
clauses named in the later milestone's exit cell (the VH row: "T-V8-40's, T-V8-46's, T-V8-53's and T-V8-18's village clauses").
SF4's exit cell — "T-V8-16, T-V8-18, …, T-V8-59, T-V8-60" — does not name T-V8-11's clause, and SF3's names T-V8-11 whole, so the
milestone table schedules the clause at SF3, before its provider. A milestone cell omitting a clause its test's tier names; MINOR.

**Required change.** V08 ## 8's SF4 row, its exit cell: "T-V8-16, T-V8-18," → "T-V8-11's uncarried-calamity clause, T-V8-16,
T-V8-18,"; and SF3's exit cell "T-V8-11," → "T-V8-11 (its uncarried-calamity clause at SF4),".
