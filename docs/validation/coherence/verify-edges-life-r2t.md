# Verify — edge cases and combinations across time, the host, the tools and the tables, round 2 (coherence/verify-edges-life-r2t)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-edges-life-r2t; covered by the whole-design retrovalidation (J84).

> **PROGRESS** — [x] brief read whole · [x] resume check (no output, no LANDED line: fresh start) · [x] inputs (round-1 report and result, adjudication-r2 rulings R2-01 – R2-42 and Part H, assemble-r2; live = assemble-r2's after-hashes) · [x] round-1 findings re-checked (41 of 41) · [x] round-2 blocks in scope read whole · [x] items 120–126 parts as new design, at their edges · [x] phone clauses (R2-41) · [x] scope's price lines (R2-06 (b)) · [x] peers' r2t results read (192 issues; none re-raised) · [x] issues written · [x] result saved · [x] LANDED

## Scope and method

Members: determinism (base §5–§7), scope (the title, the one-page summary, §0, §1, §13–§17, the decisions, the judgment
index, the staged list, Appendix A, INDEX.md), V06, V08, V09, V10, V11 and V12. The text checked is the live text after
assemble-r2. Each file's sha256 equals assemble-r2.md §1's "after" column:

| file | sha256 (16) |
|---|---|
| ARCHITECTURE.md | `4ed292e94f2442e5` |
| ARCHITECTURE-RATIONALE.md | `dd2bfafa96aba31b` |
| V06 | `d12c382be27e7835` |
| V08 | `f92c2a85e2d09862` |
| V09 | `23398a30e3926569` |
| V10 | `6efb987b252f4536` |
| V11 | `7842179aaa80abfc` |
| V12 | `74a4bfb3b0a3841d` |
| INDEX.md | `1774db18eb14cd31` |

This seat wrote no design text.

- **Round-1 findings.** Each of the 41 round-1 ids was re-checked against the live text, at the home its ruling named.
  - The seven edge findings (VEL0-01, -06, -11; VEL1-01 – VEL1-04) were checked against R2-18, R2-20 and R2-21's texts.
  - The 34 F-MISSING ids were checked against item 120–125's text, the canon's routings and R2-30 – R2-41.
- **Round-2 blocks.** `git diff 682e8e99 HEAD` (assemble-r2's before-commit) was mapped hunk by hunk to the members'
  subsections:
  - the base: 326 hunks;
  - V06: 81; V08: 160; V09: 195; V10: 72; V11: 99; V12: 72;
  - INDEX: 4.

  Every changed subsection in scope was read whole, in particular:
  - the base: §6.1's registry rows and *The weather stream*; §6.3 *Plan damage*; §6.5 (9)'s new fixtures; E-07's head
    and rows (§7.1); §7.7's precedence and fixtures, item 1, item 10 and DR1/DR3/DR19/DR29/DR42/DR44; §2.6's clamp and
    §4.11's step (c) (R2-18's other ends); §2.9's new view keys; §10.2 *Crisis looks*; §13.2's T20-14 – T20-16 and
    T120-1 – T126-3; §13.8's rows; §14's `HostContext`; §16's lines; §1.1's devices;
  - V06: §3.1, §3.5.1, §3.7.7, §3.21's new rows, §3.22, §3.23, §4.1, §4.3 and §6.8;
  - V08: §2.4's *Selection*, §3.3, §3.6 (3), §3.11, §3.16 (4)–(10) and §3.17's new rows;
  - V09: §2.11 – §2.12, §3.8, §3.16 (e), §4.12, §4.21.6 – §4.21.14 and §8.1;
  - V10: §3.9a/§3.9b's crisis and damage parts and §3.23 rows 31–35;
  - V11: §2.1, §2.8d, §3.25.9 – §3.25.11, §3.26 and §4;
  - V12: the item-120 – item-126 measurements.

  Each was walked at its limits for a defined outcome, a rung on §5's ladder and a test.
- **Peers.** The 17 landed r2t results (192 issues) were read before writing. A candidate a peer already raised is listed
  below and not raised again.
- `doc_checks.py` was not run: this seat writes no design text, and assemble-r2's provisional run covers the live files.

## Round-1 findings re-checked

**The seven edge findings — all fixed.**

| id | round-1 owner | verdict | evidence in the live text |
|---|---|---|---|
| VEL0-01 | scope | FIXED (R2-18 (d), (e)) | §13.2's dossier group carries T20-14 – T20-16 in R2-18 (d)'s words (l.17528-17536); §13.8 schedules T20-14 from M3a and T20-15/-16 from M4 (l.18824-18825); §7.7's fixture line cites them (l.11642-11648); rationale J-DET-11 (l.111), R25 (l.1895) and J-A20.71 (l.327) read VEL0-01's wording |
| VEL0-06 | scope | FIXED (R2-20) | J-A113.61's index row (l.22367) and Part A row (rationale l.805) read `0x8000_0000 + r`, the u32 range's upper half |
| VEL0-11 | V09 | FIXED (R2-21 (f)) | V09 §4.9's `refuse.table.required` row (l.2004) in VEL0-11's text; T-V9-15 deletes `era`'s `c14` (l.4251); `refuse.table.ownerRule` is gone |
| VEL1-01 | model | FIXED (R2-18 (a)) | §2.6's clamp names the one exception (l.2162-2166), and §5.3's capacity row agrees (l.9037). An emptied protected dwelling is read as a vacant shell's plan. |
| VEL1-02 | pipeline | FIXED (R2-18 (a)) | §4.11 step (c) (l.7988-7990), `LadderOp.relet` (l.8044) and the strike pool (l.8453) carry the exception; T20-15 asserts no `vacate` |
| VEL1-03 | determinism | FIXED (R2-21 (c)) | E-07 has the required-row delete row keyed `refuse.table.required` (l.10403); its head lists the required row among the no-lawful-form grounds (l.10357-10358) |
| VEL1-04 | V06 | FIXED (R2-18 (a)) | V06 §3.5.1 (5) never vacates a locked or pinned building (l.1236-1238) |

**The 34 F-MISSING ids — all written.** Every one of them is now written at build depth, at the homes and with the shapes
R2-30 – R2-41 fixed. Each named part has its wiring, lifecycle row, edge rows and bar:

| item | member parts found (each with its edge rows and its test) | verdict |
|---|---|---|
| 120 (G120-scope, G120-V09) | §13.2's T120-1 – T120-6 (l.18119-18137), §13.8 from M5 (l.18828-18830), J-A120.01; V09 §4.21.10 (1)–(15) with §2.12's `find` and index rows, §3.16 rows 86–88, T-V9-83 and AP11's Find at M5 (no phone sheet) | FIXED |
| 121 (G121-scope, -V09, -V12) | T121-1 – T121-8 and their §13.8 rows; V09 §4.21.11 with row 89 (the nearest level that fits, never a refusal) and T-V9-84; V12 T-V12-53 and §3.15.11 | FIXED |
| 122 (G122-determinism, -scope, -V06, -V08, -V09, -V10, -V11, -V12) | DR44 (l.11896); T122-1 – T122-7; V06 §3.22 with `frontierFor` and `crisisLookYields`, its §3.21 rows and T-V6-75; V08 §3.16 (7) with its §3.17 row and T-V8-59; V09 §4.21.12 with rows 90–91 and T-V9-85; V10 §3.9b (8) with row 34 and T-V10-52; V11 §3.25.9 with EI-V11-EDGE-4 and T-V11-46; V12 T-V12-54 | FIXED |
| 123 (G123-determinism, -scope, -V06, -V09, -V10, -V11, -V12) | §6.3 *Plan damage* (l.9786-9803), `plan.damage` in §6.1's registry and §6.5 (9)'s fixture; T123-1 – T123-7; V06 §3.23 with its row and T-V6-76; V09 §4.21.13 with row 92 and T-V9-86; V10 §3.9a with row 35 and T-V10-53; V11 §3.25.10 with EI-V11-EDGE-5 and T-V11-47; V12 T-V12-56 | FIXED |
| 124 (G124-determinism, -scope, -V09, -V11, -V12) | §6.1's `view.weather` and *The weather stream* (l.9380-9396); §6.5 (9)'s fixture; T124-1 – T124-9 (T124-5 without phones); V09 §4.21.14 with row 93, T-V9-87 and J-V9.144; V11 §3.25.11 with EI-V11-EDGE-6 and T-V11-48; V12 T-V12-57 | FIXED |
| 122 (h)–(i) (G122h-V08, -V09, -V11, -V12) | V08 §3.16 (8) with its §3.17 row and T-V8-60; V09 §4.21.6 (1) (`info.zoom.coarsest`, R2-30) and §4.21.12 (5), (8) with row 91; V11 §3.25.9's rates; V12 T-V12-55 | FIXED |
| 125 (G125-determinism, -scope, -V08, -V09, -V12) | DR1, DR3, DR19, DR29 and DR42 re-sourced, §7.7 item 1's one source (l.11685-11693) and item 10's input order; T125-1 – T125-3 and §14's `HostContext`; V08 §3.16 (9) with the fallback column, its §3.17 row and T-V8-61; V09 §4.21.7 with row 94 and T-V9-77; V12 T-V12-58 | FIXED |

Three remainders in the item-125 parts are peers' new findings this round. They are not re-raised here:
- `HostContext.line` deciding between two accepting lines (G125-V08 at verify-agree-host-r2t and verify-vol-V07-V08-r2t;
  VCS-r2-02);
- the target of `view.set { week }` (VV910-r2-02);
- T125-1's village rungs (VV1112-r2-05).

**Item 126 (new this round; no round-1 id).** Its parts are present:
- scope: §1.1 *Where the map is seen* (l.312-319), T126-1 – T126-3, §13.8 at M2a, J-A126.01 and §16's narrowed app line;
- V08: §3.16 (10), its §3.17 row and T-V8-62;
- V09: §2.2's `LayoutClass`, §4.12, row 48 and T-V9-22;
- V12: §3.15.16 and T-V12-59.

**Phone clauses (R2-41).** None is left in the members. Each remaining mention of a phone states that no map is offered
on one (summary l.94, §1.1 l.312-314, V08 l.88 and §3.16 (10), V09 l.100, l.186 and l.2532-2535, V12 §3.15.16). No
`refuse.phone`, phone layout, sheet, default, viewport or fixture remains.

**Scope's price lines (R2-06 (b)).** They agree with every volume's §8 as it now stands.
- **§16's staged lines:**
  - V02 21–30.75, its 23–33.5 less the 2–2.75 inside M3a;
  - V03 18.25–25, its 19–26 less 0.75–1;
  - V04 28.5–39.5; V05 18–24.75; V06 31–44; V07 30.5–43;
  - V08 18.5–25.25; V10 11.25–15; V12 4.75–8;
  - V09 4.25–6.25: AP5–AP8 and AP10 3.25–5.0, plus AP11's staged 1–1.25;
  - V11 1.85–2.6: C4b 1.1–1.6 and C8 0.75–1.0.
- **The base app line** 19.5–28.5 is V09's base line 16.0–23.5 plus AP11's base parts 3.5–5. The content line's C9 is
  1.25–2.0.
- **The totals:**
  - 203.25 + 27.5 = 230.75 and 278.5 + 36.75 = 315.25;
  - the staged lines sum to 187.85–264.1;
  - 418.6–579.35 is the first total plus the staged lines.
- **The same figures elsewhere:** D-20, J-A568.01 and INDEX §1's price column (V09 23.75–34.75, V10 14.75–20.25, V11
  13.6–19.1, V12 7.25–11 / 4.75–8) agree.

## Round-2 blocks — what the repairs made, at their limits

**Checked and holding at their limits.**
- **Base §6.1 *The weather stream*:** the session seed is never saved; the spell's kind and length are fixed at its
  start; Start a shower now is the next spell index. The zero-rate week is a peer's (VDC2-01).
- **Base §6.1's ordering of epochs by week:** a tie in V06 §3.7.7 (3) falls to chain order.
- **Base §6.3 *Plan damage*:** level 0 damages nothing; t ≥ lo. A kept element keeps its threshold; a re-cut element
  draws by its new id.
- **E-07's head and rows:** the layer gate replaces the screen gate; `refuse.epoch.cap` and `refuse.water.reservation`
  have rows in V09 §4.9.
- **§7.7's precedence:** both fall cases, now with T20-14 – T20-16.
- **DR44's window and admission:** [`sinceWeek`, `untilWeek`) with the empty and open cases. §10.2 (h)'s limits cover
  no land, an island town, an oversize force, a wall-less siege and an unmapped source.
- **V06 §3.22 (2)'s frontier answers and (3)'s per-building yield.**
- **V06 §3.23's level:**
  - its thirds, the rate and the floor with no rows shipped;
  - restoration with and without Works, and a run during a repair;
  - negative weeks and a scrubbed frame.
- **V06 §4.1's Accept on a moved head (R2-31 (b)).** §6.8's estimate is a pure function of the epochs and the document,
  never a measured time. So V09 §3.8's re-issue of an advance from `logHeadBefore` reproduces its cadence, and the port's
  coarsened catch-up is identical on every editor (T-V8-3).
- **V08:**
  - §3.6 (3)'s degenerate `W₁ < W₀`, a host's clock turned back;
  - §3.11's overlay weeks: a condition with no duration, and `untilWeek` not after `sinceWeek`;
  - §3.16 (6)'s Find entries at the adapter's 2 000-record cap, re-keyed or lost;
  - (7)'s census totality, (8)'s headcount fallbacks and (10)'s 600 × 480 frame.
- **V09:**
  - §4.21.6's limit at stop 0 (R2-30);
  - §4.21.7's no-tick week and an out-of-range stored week;
  - §4.21.10 (5)/(11)'s dark chip, withheld chip and more than eight chips;
  - §4.21.11 (4)'s nearest level that fits;
  - §4.21.12 (2)'s carried preview with no row;
  - §4.21.14's dry-row shower;
  - §2.12's absent-value columns for every new key, and the `AppPrefs.resolution` default.
- **V10 rows 31–35:** the memory block, Find targets past `limits.findTargets`, `refuse.dossierClock`, the crisis looks
  with a withheld condition, and the damage at level 0 and level 1.
- **V11 §4.1:** item 123's range order and item 124's two hard rules are clamped. §3.25.9's settings ranges and every
  m² cell's [0.25, 4] × its value hold.
- **Owner rules:** no file-g owner rule was undone. The look items never write the model, the document or its hash.

**New problems the repairs or new designs made (raised).**
- **A fall's suffix meeting locked or pinned households outside the dossier** (VEL2-r2-01, V06). V06 §3.5.1 takes the
  roster's strict suffix as the households that leave. §7.2, V06's own Protection and §7.7's precedence say locked and
  pinned households hold (§7.7: taken last, and only under a dossier fall). Every fall, standalone ones included, lets a
  protected dwelling's last household out by a `relet` to 0, which V06 §3.21's rows and T-V6-70 (f) assert. R2-18 (a)'s
  clamp admits that state only after a dossier fall.
- **A row of item 122's or item 123's tables deleted by a table edit** (VEL2-r2-02, V11). `crisis.looks` and
  `damage.elements` declare neither a `defaultRow` nor a `TotalityRule`, so V11 §4.1 lets the delete through, and DR44
  and §6.3 then have no row to read.
- **Stop during a SettlementForge creation's history replay** (VEL2-r2-03, V09). V09 offers Stop on every history-first
  generation. A host creation runs `generate` inside `dossier.offer { create }`, which has no cancelled status, and every
  editor's creation must be identical.

**New problems in the members that peers raised first (concurred, not re-raised):**
- the `line` field and the two accepting adapters (G125-V08 ×2, VCS-r2-02);
- `view.set { week }` writing the year position (VV910-r2-02);
- Find and the crisis looks at a scrubbed week (VRC2T-07, VV910-r2-09);
- the weather gap at a zero rate (VDC2-01); the weather kinds' `hours` (VV1112-r2-01);
- `decayPeak` across a re-cut or an extension (VV56-r2-06, blocker);
- the catch-up's dossier events outside the estimate (VV56-r2-04);
- the standalone protected dwelling's clamp (VPC-R2-07) and a deserted village's locked dwelling (VAT2-r2-07) — VEL2-r2-01
  names the household half these two leave open, with V06's rows and test;
- the dossier cadence's calamity epochs (VAT2-r2-01, VAT2-r2-02);
- the creation week's two meanings (VAT2-r2-03, VAT2-r2-04);
- a preview's `crisisLookYields` (VAT2-r2-09);
- a condition's knowledge tier (VAH-r2-01, VAH-r2-07);
- the damage lines under a player key (VAH-r2-08);
- T122-5/-6's statistics (VV1112-r2-06).

## Outcome

**3 issues: 0 blocker, 3 major, 0 minor** — all EDGE-UNDEFINED.

By owner: V06 1, V09 1, V11 1.

**The round-1 state.** All 41 round-1 ids are closed on the live text:
- the seven edge findings are fixed as R2-18, R2-20 and R2-21 ruled;
- the 34 F-MISSING parts of items 120–125 are written at build depth, each with its edge rows and its bar.

**The lane's state.** Most of the new design holds at its limits. Of the open edges in these members, the three raised
here are new; the rest are peers' and are listed above.

## Issues

### VEL2-r2-01 — MAJOR EDGE-UNDEFINED (owner: V06)

* **Claim.** A population fall whose leaving households include a locked or pinned household has no single outcome. The
  same holds for a fall that reaches a protected dwelling's last household outside a dossier fall.

  **What V06 states:**
  - V06 §3.5.1 (1) (l.1220-1222) fixes who leaves as "the roster's suffix … in reverse ordinal order", with no
    exception for a locked or pinned household.
  - (4) (l.1232-1235) lets a household in a protected building leave in every fall. With no emptying dwelling of its band
    to refill from, the building keeps one household fewer.
  - (5) (l.1236-1238) lets a protected dwelling's last household out by a `relet` down to 0, and so do §3.21's decline
    row (l.3233), its *history × locks* row (l.3279) and T-V6-70 (f) (l.4075). None of them limits this to a dossier
    fall, and T-V6-70 (f) names no dossier fixture.

  **What the other texts state:**
  - §7.2 (l.10529-10531): a locked entity is a fixed input, and a pinned one keeps its existence.
  - V06 §3.1's *Protection* (l.974-976) excludes every locked or pinned entity from every candidate list. §4.3's
    *Protection first* (l.3507-3512) agrees and names "a dossier event the one exception".
  - §7.7's precedence (l.11634-11641) takes unlocked households first. It takes locked and pinned ones only where a
    dossier fall cannot otherwise be met (T20-16).
  - R2-18 (a)'s clamp admits a non-vacant dwelling with 0 households only after a dossier fall: §2.6 (l.2162-2166),
    §5.3's capacity row, §4.11 (c) and `LadderOp.relet`.

  **The two cases left open:**
  - On a standalone `advance`, a what-if copy or a re-run whose suffix holds a locked or pinned household, that household
    both leaves (V06 (1)) and stays (§7.2, V06 §3.1).
  - Under a dossier fall that the unlocked households can meet, V06 still removes the locked household in the suffix,
    while §7.7 takes the unlocked ones first.

  **Peers' overlap.** VPC-R2-07 (verify-pipeline-r2t) raises the dwelling's clamp under a standalone fall, and VAT2-r2-07
  (verify-agree-time-r2t) raises a deserted village. Neither names the household half, V06 §3.21's two rows or T-V6-70
  (f).

* **Required change.**
  1. **V06 §3.5.1 (1)** reads: "`L_b` = the leaving households of band `b` — the roster's suffix in reverse ordinal order
     (§4.11), each locked or pinned household passed over for the next household below it in that order that is
     neither (§7.2: a locked household is a fixed input, a pinned one keeps its existence). Under a dossier population
     fall that the unlocked and unpinned households cannot meet, the locked and pinned ones leave too, in the suffix
     order, each lock or pin reported orphaned (§7.7's precedence; T20-16). Under any other fall a locked or pinned
     household never leaves, and a fall the others cannot meet is met short by it, counted `households.heldByLock` —
     `n_b = |L_b|`."
  2. **(4)'s last sentence** reads: "When its band has no emptying dwelling to refill from, under a dossier population fall
     the household still leaves and the protected building keeps one household fewer (a `relet` down, to 0 at its last
     household; §7.7's precedence); under any other fall it stays, the fall met short by it (`households.heldByLock`) and
     the building keeping at least one household (§2.6's clamp) — counted `uses.heldByProtection` in either case."
  3. **(5)** reads: "… never at a locked or pinned building: a dossier population fall lets its last household out by a
     `relet` down to 0, the building keeping its state (§7.7's precedence); any other fall never takes it ((4))."
  4. **`EpochReport.households`** (V06 §2.10) gains `heldByLock: number /* leaving households a lock or pin kept, or
     a protected dwelling's last household kept, under a fall with no dossier population (V06 §3.5.1 (1), (4)) */`.
  5. **V06 §3.21's decline row and its *history × locks* row** each read, for the locked or pinned case: "passed over
     for the next unlocked household; under a dossier fall taken last and reported orphaned, a protected dwelling's last
     household let out by a `relet` to 0 (T20-15, T20-16); under any other fall held, counted `households.heldByLock`,
     the dwelling kept at one household or more".
  6. **T-V6-70 (f)** names both fixtures:
     - On H-DOSSIER, a fall whose leaving household is a locked or pinned dwelling's last: a `relet` down to 0, no
       `vacate`, and the building's state kept.
     - On H-100, a standalone fall whose suffix holds a locked and a pinned household and a protected dwelling's last
       household: each is held and the next unlocked households leave in their place. With none left, the shortfall is
       counted `households.heldByLock`, and no `relet` takes the protected dwelling below one household.

### VEL2-r2-02 — MAJOR EDGE-UNDEFINED (owner: V11)

* **Claim.** A table edit or a pack's patch can delete a row that items 122 and 123 read, and no fallback is defined.
  - **Why the delete goes through.** V11 §4.1 (l.4808-4814) refuses a delete in only four cases: a `defaultRow`, an
    `allowFallback` target, a `TotalityRule`'s only cover, or a non-`mayEmpty` table's last row. `crisis.looks`
    (registry row 107) and `damage.elements` (row 109) declare no `defaultRow`; V11 §2.1's list (l.287-289) names none
    for them. They declare no `TotalityRule` either: `coversEnum` appears only in the interface (l.277). Their "one row
    per `CrisisLookKind`" and "one row per `DamageElementKind`" are compile checks of the shipped rows (T-V11-46 (b),
    T-V11-47 (a)), not rules a document's `editTable` meets.
  - **What follows.** A delete of `crisis.looks`' `siege` row, of `damage.elements`' `roofBay` row, or of either table's
    named `settings` row is accepted. Then:
    - DR44 maps a standing siege condition through its `crisis.map` row to a look kind that has no row;
    - §6.3's threshold t = lo + u · (hi − lo) has no [lo, hi] for any roof bay;
    - `densityCap`, `previewSeverity`, `areaPerHeadM2`, `enginesPerBesiegers` or `defaultAgeYears` has no value.
  - **Why no fallback covers it.** V11 §3.26's general rule (l.4711-4714) sends a reader that meets an absent row to the
    table's `defaultRow` or to "the row's neutral value (V11 §3.2.3 (c)–(d))". §3.2.3 (d) defines a neutral value only
    for a derived family row.
  - **What the text already covers.** §2.9's `crises` key covers only a `preview` whose look is "gone after a table
    edit". Neither DR44's `follow` path nor a damage element is covered, and EI-V11-EDGE-4 and -5 do not list the
    delete.

* **Required change.**
  1. **The totality rules.** V11 §2.1's registry gives row 107 (`crisis.looks`)
     `totality: [{ kind: 'coversEnum', column: 'kind', of: 'CrisisLookKind' }]` and row 109 (`damage.elements`)
     `totality: [{ kind: 'coversEnum', column: 'kind', of: 'DamageElementKind' }]`. T-V11-46 (b)'s and T-V11-47 (a)'s
     one-row-per-kind clauses are then these rules' compile form.
  2. **V11 §4.1's required-row sentence** adds "or of a table's named row (`settings`, `structure`; V11 §2.1's settings
     form)". A delete of a look kind's row, an element kind's row or either table's `settings` row — by `editTable` or a
     pack's patch — is then refused with `refuse.table.required`. The refusal names the readers and offers "edit its
     cells":
     - for `crisis.looks`: DR44, §10.2 and §8.2's look rows;
     - for `damage.elements`: §6.3's thresholds, V06 §3.23, V03, V02 and V04.
  3. **The edge rows.** EI-V11-EDGE-4 and EI-V11-EDGE-5 each add "a delete of a kind's row or of the `settings` row" with
     that outcome.
  4. **The test.** T-V11-45 (s) adds three tables-editor deletes: `crisis.looks`' `siege` row, `damage.elements`'
     `roofBay` row and `crisis.looks`' `settings` row. Each is refused and the tables are unchanged.

### VEL2-r2-03 — MAJOR EDGE-UNDEFINED (owner: V09)

* **Claim.** Pressing Stop during a SettlementForge creation's history replay has no defined outcome in host mode.
  - **How a host creation runs.** The module runs `generate(blueprint, { docId: mapId, prefix })` inside a
    `dossier.offer { create }` (V08 §3.3, l.1536-1543), and every editing client's creation must be byte-identical
    (T-V8-3; V08 W10). A dossier carrying a history makes it a history-first generation (V08 §3.15).
  - **What V09 offers.** V09 §4.21.9 (1)–(2) (l.3398-3420) shows the progress view, with **Stop** for "item 113's
    history replay at generation, through `generate`'s `signal`". It says nothing of host mode. A stopped history-first
    generation "leaves no document and shows `info.history.cancelled` with **Generate without its history**" (V06
    §3.20.4, l.3148-3149; T-V9-79).
  - **What happens in host mode.** `OfferStatus` (V08 l.383) has no cancelled status. So, read as written:
    - the host gets no `dossier.result` until its 60 s `replyTimeoutMs`;
    - V08 §3.9's B2 then re-creates the frame and re-runs the whole creation;
    - "Generate without its history" would make a document with `history.replay` false, which no other editor's
      creation equals (T-V8-3), against the history the dossier supplies (item 113).
  - **The alternative reading** — the host's `generate` call passes no `signal`, so it shows no Stop — is stated nowhere.

* **Required change.**
  1. **V09 §4.21.9 (2)'s Stop clause** reads "… item 113's history replay at generation, through `generate`'s `signal`
     (§11.2; R2-42) — standalone only: in host mode a creation from a dossier (V08 §3.3) shows the strip with no Stop,
     its replay coarsened to fit the comfort level (V06 §3.20.4, V06 §6.8), so every editor's creation stays identical
     (T-V8-3) — where a stopped history-first generation leaves no document …".
  2. **V06 §3.20.4's *Cancel*** reads "cancelling a standalone history-first generation leaves no document; … A host
     creation offers no cancel (V09 §4.21.9)."
  3. **V09 §4.21.9 (5)** adds the edge "a history-first creation from SettlementForge: the strip with no Stop".
  4. **T-V9-79** adds that clause on V08's host harness (the embed).
