# Agreement check — proof and plan, round 2: tests, bars, calibration and the build plan (verify-agree-proof-r2t)

> PENDING FABLE REVIEW — opus seat coherence/verify-agree-proof-r2t (round-2 agreement check after assemble-r2), standing in for the Fable seat.

PROGRESS
- P1 inputs: brief whole (ROUND-2 NOTES, NEW OWNER RULES, ORCHESTRATION NOTES); round-1 report and result (21 issues); adjudication-r2 whole (R2-01 – R2-42, Part H for every unit, Part I); assemble-r2 whole (live = its after-hashes: base `4ed292e9…`, INDEX `1774db18…`, V01 `fb2d1496…` … V12 `74a4bfb3…`, each re-hashed); the 17 landed r2t peers' 192 issues indexed — done
- P2 round-1 VAP-11, VAP-r1-01 – VAP-r1-15, G126-scope/-V09/-V08/-V04/-V12 re-checked on the live text — done (all 21 closed)
- P3 repair-touched subsections in scope read whole or by word diff with every changed hunk read in its subsection: §13.2 (whole: the convention, every owner-item group 111–126, the take-over table), §13.3–§13.9, §14's touched rows, §16 (whole), INDEX.md (whole), every volume's §7 and §8, every volume's §10 and §13 hand-off rows, V12 §2.13, §3.7.8, §3.15 (head, §3.15.10 – §3.15.16), the metric registry's rows for items 120–126, §7.1 (T-V12-44 – T-V12-59), §8, §10.2 and §10.3 — done
- P4 owner items 120–126 in proof and plan: R2-35's bar ids at both ends, R2-09's pin registrations, R2-36's milestones in §13.8, §16, INDEX and every volume's §7/§8; item 126 (a2)'s phone census — done
- P5 scope's price lines (R2-06 (b)) against the volumes' §8 totals as they now stand — done (all exact)
- P6 report and result — done

**Result: 14 issues — 0 blocker, 14 major** (9 HANDOFF-OPEN, 5 DISAGREE). Owners: scope 2, V09 2, V11 2, V12 2, V02 1,
V03 1, V04 1, V06 1, V08 1, V10 1. Every round-1 finding is closed (19 fixed, 2 fixed as the ruling words them). Return:
`docs/validation/coherence/results/coherence_verify-agree-proof-r2t.json`. Design files untouched. No issue is a blocker:
none changes what the generator builds; each changes which test names which bar, which suite a pin lists, which milestone
runs a clause, what a statistic counts, or a recorded price.

## Scope and method

**Members.** scope (§0–§1, §13–§17, INDEX.md) and V01–V12, on the proof-and-plan subjects: every test id and bar
(T⟨item⟩-⟨n⟩, T-Vn-m, the take-over of base bars), calibration (§13.2's convention, §13.8, V12's pins, metrics, specs and
register), the combined build plan (§16) and INDEX.md against every volume's tests (§7) and build plan (§8). The fabric,
layers, time, host, tools, edges and unit seats hold the other subjects; their r2t findings were read first and are not
raised again (list below).

**Checks run** (scripts in the seat's scratch folder `agp2/`: `sec.py`, `census.py`, `takeover.py`, `takeover2.py`,
`pertest.py`, `pins.py`, `wd.py`):
- *Round-1 re-check.* Each round-1 finding against the live subsection its required change named, and against the R2
  ruling that governs it (R2-08, R2-09, R2-17, R2-32, R2-41).
- *Test-id census on the live set.* 733 volume tests, every family gap-free (V01 1–60, V02 1–60, V03 1–40, V04 1–82,
  V05 1–36, V06 1–76, V07 1–69, V08 1–62, V09 1–87, V10 1–53, V11 0–48, V12 1–59); 341 base bars defined in §13 (up from
  293: T20-14 – T20-16, T114-9, T114-10 and items 120–126's 46); **0 unresolved references** to a volume test or a base
  bar anywhere in the base, INDEX, the rationale or the volumes. No whole-volume range survives in §13, §16 or INDEX
  (R2-06 (a)): the eight ranges left are subsets.
- *The take-over table's both ends* (R2-08), range-aware and test by test: every bar of every row of §13.2's table (base
  l. 18220–18231) against the bars the named volume's tests name, and every owner-item bar (T111–T126) a volume test names
  against the bars the table gives that test (`pertest.py`); §13.2's owner-item groups' runs lists against both.
- *Pins* (R2-09): every volume test that names an `item1nn.*` pin, `NoOpPin`, a "no-op pin" or a registration (61 tests)
  against V12 §2.13's suites column, §3.7.8's list and X-V12-11.
- *Schedules*: §13.8's rows for items 114–126 and T20-14 – T20-16 against every taking test's tier and milestone cell,
  V12 W7's cells, R2-32's Find at M5 and R2-36's placements; §16's rows and INDEX §1/§3 against each volume's §8.
- *Prices* (ROUND-2 NOTES (6), R2-06 (b)): every volume's §8 re-summed from its rows, and §16's per-volume rows, the
  milestone rows, the effort lines, the base subtotal, both totals, the cuts, the calendar, D-20, J-A568.01, J-A568.05 and
  INDEX §1's price column recomputed against them.
- *Hand-offs*: every hand-off row a member added or changed this round on tests, fixtures or milestones (volume §10 and §13
  diffs; V12 X-V12-5, X-V12-11, X-V12-20 and §10.3) read at its destination.

## Round-1 findings — status on the live text

| id | owner (r1) | status | where |
|---|---|---|---|
| VAP-11 | V09 | FIXED | V09 §7.3 (1) l. 4407–4410 holds M3c's clerk session (five participants, the clerk task, `plat/goldens/ux/M3c/f5.json`); (3), the `F5Record` and T-V9-29 follow |
| VAP-r1-01 | V07 | FIXED per R2-08, R2-09 | T-V7-62 – T-V7-69 each "takes …" its bars in its head; T-V7-63 carries T115-4 with its `item115.off` registration (V-M2 seat) |
| VAP-r1-02 | V08 | FIXED per R2-08, R2-09 | T-V8-50 – T-V8-55 name their bars; §8.3's R1 lists them; T-V8-53's `item115.ceiling` registration by the SF4 seat |
| VAP-r1-03 | V09 | FIXED per R2-08 | T-V9-74 – T-V9-79 take T114-6, T115-3, T116-1, T117-6, T118-2, T119-3; V09 §7's lead (l. 4225–4232) maps them (T-V9-72's item-112 bars are VAP-r2-06) |
| VAP-r1-04 | V10 | FIXED per R2-08 | T-V10-48 "takes T115-3's clerk form" |
| VAP-r1-05 | V11 | FIXED per R2-08 | T-V11-42 "takes T117-3" |
| VAP-r1-06 | V05 | FIXED per R2-08 | T-V5-34 and T-V5-35 take their island clauses, each lettered clause naming its bar; V05 §7's lead names the take-over |
| VAP-r1-07 | V01 | FIXED per R2-08 | T-V1-29 "takes T119-2 and T119-3's stage-2 clauses" |
| VAP-r1-08 | V12 | FIXED at V12 | T-V12-48 and T-V12-50 name their bars; the table's V12 row still names no id of items 111–119 — R2-08's base end, new as VAP-r2-01 (a) |
| VAP-r1-09 | scope | FIXED per R2-08 | stage-3 row "T119-2's stage-3 clauses (T-V2-22, T-V2-24)", sky row "T119-2 – T119-5's island clauses (T-V5-18)", the item-119 group's runs list (T-V2-24's own end is the peer's VCS-r2-05) |
| VAP-r1-10 | V06 | FIXED per R2-09 | T-V6-74's last clause registers H-100 on `item115.ceiling` (E2 seat); V06 §8's *The no-op pins* lists E2 |
| VAP-r1-11 | V12 | FIXED per R2-09 | §3.7.8 lists T-V5-34 – T-V5-36, T-V7-63, T-V7-68; §2.13 names T-V7-63 and T-V7-68 (the lists' remaining mismatches are VAP-r2-08) |
| VAP-r1-12 | V12 | FIXED | V12 §10.3 l. 3411 cites T-V6-61 and T-V6-62 |
| VAP-r1-13 | V10 | FIXED per R2-32 | T-V10-51 "PR, from M5 (Find's milestone)"; V10 §8's C4 lands the find form and read at M5's exit (§16's and INDEX's "C3" is the peer's VV910-r2-07) |
| VAP-r1-14 | V09 | FIXED | AP11: the legend at M2b, Material and Wear at M3a, Back in use and the epoch lines at M6-E; T-V9-74's milestone cell the same |
| VAP-r1-15 | scope | FIXED per R2-17 | §16's staged row "V11: C4b at M-SF, C8 at M6-U"; INDEX §1's V11 cell is the required text |
| G126-scope | scope | FIXED per R2-41, R2-35, R2-36 | §1.1 *Where the map is seen*; §13.2's item-126 group (T126-1 – T126-3); §13.4's sessions; §13.8; §16's M2a row and reference-app line; §0.2's row; J-A126.01 (§13.8's T126-1 milestone is VAP-r2-14) |
| G126-V09 | V09 | FIXED per R2-41 | `LayoutClass = 'wide' \| 'medium'`; no `refuse.phone`; T-V9-22 takes T126-1's tablet half, T126-2, T126-3; J-V9.9 rewritten |
| G126-V08 | V08 | FIXED per R2-41 | V08 §3.16 (10), W100, the edge row, T-V8-62 at 599 × 479, J-V8.132 |
| G126-V04 | V04 | FIXED | V04 holds no "phone" |
| G126-V12 | V12 | FIXED per R2-41, R2-35 | §3.15.16, T-V12-59 (no phone viewport), `item126.resize` |

Phone census (R2-41): the only phone mentions left in the set state the absence (base l. 94, 265, 312–314, 18210, 22404;
V08 §3.16 (10), W100, the edge row, T-V8-62, §8.2's SettlementForge side, J-V8.132; V09 l. 100, 186, 2533, 3644, 4258,
J-V9.144; V12 §3.15.16, T-V12-59, J-V12.105). No narrow class, phone layout, `refuse.phone` or phone fixture remains.

## Agreement confirmed (no issue)

- **Prices (R2-06 (b)).** Every volume §8 sums exactly from its rows: V01 27.5–36.75 (W10 +0.25–0.5), V02 23–33.5 (M6
  18.75–28.5 with §8.6's +0.5–1; M3a 2–2.75; spikes 2.25), V03 19–26 (P4 +0.25–0.5, P5 +0.25), V04 28.5–39.5 (U5 +0.25),
  V05 18–24.75, V06 31–44 (E2 +1–1.5, E6 +0.25), V07 30.5–43 (26.5–36.5 + the itemised 4–6.5), V08 18.5–25.25 (SF3
  +0.25, SF4 +0.25–0.5), V09 23.75–34.75 (base line 16.0–23.5 after item 126's −0.25–0.5; staged 3.25–5; AP11 4.5–6.25 =
  3.5–5 base + 1–1.25 staged), V10 14.75–20.25 (C4 +0.25; M3c 11.25–15), V11 13.6–19.1 (first total 11.75–16.5, staged
  1.85–2.6), V12 W1–W7 7.25–11, M-CAL 4.75–8. §16's per-volume rows, the staged lines (187.85–264.1), the effort lines
  and base subtotal (203.25–278.5), the first total (230.75–315.25 = the milestone rows' sum; each row's delta traced: M2b
  −0.25, M3b +1.5–2.5, M4 +0.75–1.25, M5 +0.25–0.5, the carried row +3–4.25), the second total (418.6–579.35), the cuts
  (213.75–287.25), the calendar (115–158 weeks), D-20, J-A568.01, J-A568.05 and INDEX §1's price column all equal them.
  No stale copy of a round-1 price survives at its homes (J-V4.114's is VAP-r2-13).
- **Find at M5 (R2-32)** in §16's M5 row and exit (T120-1 – T120-6), the carried row, §13.8, V09 AP11 and T-V9-83, V01
  W10–W11 and T-V1-59, V03 §8 and T-V3-38 (the later of P5 and M5), V04 U5 and T-V4-81, V05 §8 and T-V5-36 (with P3 at
  M6-sky), V07 §8 risk (13) and T-V7-68, V08 SF6 and T-V8-58, V10 C4 and T-V10-51, V12 §8.1, W7 and T-V12-52.
- **Items 121–126's placement (R2-36)** in §13.8, §16's M2a (126), M3b (122, 124), M4 (121), M6-E (122's hand-over, 123's
  decay level), M6-P (123's damaged plan at P4, exports at P5), M6 (123's exterior, 122's ruined look), M6-U (123 below
  ground) and M-SF (122's map rows and reading, 125) rows, INDEX §1, V12 §3.15's head and W7, and every taking test's
  milestone cell (T-V9-22, -83 – -87; T-V12-52 – -59; T-V3-39, -40; T-V4-81, -82; T-V6-75, -76; T-V7-68, -69; T-V8-58 –
  -62; T-V10-51 – -53; T-V2-59, -60).
- **R2-35's bar ids at both ends** for every bar the table names (V01 T-V1-59; V03 T-V3-38 – -40; V04 T-V4-81, -82; V05
  T-V5-36; V06 T-V6-75, -76; V07 T-V7-68, -69; V08 T-V8-58, -59, -61, -62; V09 T-V9-22, -83 – -85, -87; V10 T-V10-51; V11
  T-V11-46, -48; V12 T-V12-52 – -59) — the omissions are VAP-r2-01 – VAP-r2-06.
- **§13.2's convention** (5) (the `view`, `input` and `entityScope` kinds), (6) (items 120–126's statistics on the
  `conformance` list) and (7) (bench bars of items 114–126) against V12 §2.13's `NoOpPin` kinds and §3.7.8 (5); V12 §2.13's
  rows for items 121–126 against §13.2's pin names and kinds.
- **V12 §3.15.11, §3.15.13 – §3.15.16** (items 121, 123, 124, 125, 126) state the same owners and clauses as §13.2's groups
  (T125-1's rungs are the peer's VV1112-r2-05).
- **§13.4 / V09 §7.3**: M2a's pipeline session, M3a's two sessions and M3c's clerk session; tablets in each session.
- **New bars** T20-14 – T20-16 (§13.8: M3a; M4) and T114-9 (M4; the village clause by T-V7-59, named at both ends).
- **Hand-offs** read at their destinations: V02 X34 – X36 (V03 §13, V01/V07, V06), V03's damage rows to V02, V04, V09, V10
  and rendering, V04 §13's base end (the take-over row now names T120-4, T120-5, T123-1, T123-2, T123-6), V10 CVR-V10-21 and
  -22, V12 §10.3's four new rows, X-V12-11's list (VV1112-r2-08 and VV34-r2-12/-15 are the peers'), X-V12-5 (the peer's
  VV1112-r2-11) — and X-V12-20 (VAP-r2-07).

## Matrix gaps found (shared subjects the matrix holds no row for)

New shared subjects of this round, each judged: the T⟨item⟩-n bars of items 120–126 and their taking tests (scope, V01–V12)
— agree but for VAP-r2-01 – VAP-r2-06; the `NoOpPin` kinds `view` (device and window values), `input` and `entityScope`
(base convention (5), V12 §2.13, §3.7.8) — agree; V12's item-120 and item-122 statistics as the measures §13.2 binds to
T120-3, T120-4 and T122-2 — **disagree** (VAP-r2-12); the restating pins' registrations as one union (R2-09: V01–V11 tests,
V12 §2.13, §3.7.8, X-V12-11) — **disagree** (VAP-r2-08 – VAP-r2-10, beside the peers' VV1112-r2-08/-09/-10 and VV34-r2-05/-12);
V12's fixtures run on V09's harness (X-V12-20) — **open** (VAP-r2-07); T122-4's milestone at V11 (C9 vs C4b) — **disagree**
(VAP-r2-11).

## Overlaps with the landed r2t verifiers (not raised again)

T-V2-24's missing T119-2 clause (VCS-r2-05); §16's and INDEX's "C3" for V10's Find content (VV910-r2-07); §16's M5 row
without item 122's disaster units and the M3b clause's districts (VV12-r2-07, VCS-r2-04); J-A120.01's price (VCS-r2-01);
the V12 tiers beside §13.8's (VV1112-r2-07); T125-1 at the village rungs (VV1112-r2-05); T122-5/-6's untested clauses
(VV1112-r2-06); V08's crisis, force and required-keys fixtures (VV1112-r2-11); the registration clauses of T-V2-59 (d),
T-V2-60 (c), T-V8-59, T-V8-61 (b) and their V12 ends (VV1112-r2-08/-09/-10); T-V3-39 (g), T-V3-40 (f) and V03's damage
fixtures in V12 (VV34-r2-12, VV34-r2-15); T-V4-82 (g)'s clause and (b)'s comparison and V04's U5 landing (VV34-r2-04/-05/-06);
V12 §3.15.12's owners (VV1112-r2-12); T-V12-54's `crisis.blocked` against the barricades (VRC2T-04); the ruling ids cited in
design text (VM-R2T-09, VV78-r2-11, VAT-r2-06 — V09 §7's "(R2-35)" among them).

## Issues

| id | sev | kind | owner | subject |
|---|---|---|---|---|
| VAP-r2-01 | major | HANDOFF-OPEN | scope | the take-over table and the owner-item groups lack ids the volume tests take (R2-08): V12's items 111–119, T115-4 and T123-7 at V02, T119-3 – T119-5 and T122-7 at V03, T114-10 at V06, T126-3 at V08, T112-1/-2 at V09; groups 111, 112, 113 |
| VAP-r2-02 | major | HANDOFF-OPEN | V02 | T-V2-58's head omits T115-4 and its (f) lacks R2-09's clause; T-V2-59's head omits T123-7 |
| VAP-r2-03 | major | HANDOFF-OPEN | V03 | T-V3-37's head takes no bar though its clauses run T119-2 – T119-5; T-V3-40's head omits T122-7 |
| VAP-r2-04 | major | HANDOFF-OPEN | V06 | T-V6-73's welded-stretch clause runs T114-10's epoch clause unnamed; V06 §7's table lacks it |
| VAP-r2-05 | major | HANDOFF-OPEN | V08 | T-V8-62 runs T126-3's scan over `embed.html` but takes only T126-2's clause |
| VAP-r2-06 | major | HANDOFF-OPEN | V09 | T-V9-72 runs T112-1's style check and T112-2's trial but takes neither |
| VAP-r2-07 | major | HANDOFF-OPEN | V09 | X-V12-20 not closed at T-V9-22, T-V9-85 and T-V9-87 |
| VAP-r2-08 | major | DISAGREE | V12 | §2.13's suites and §3.7.8's list are not one union: T-V11-39 (b) – T-V11-41 (b), T-V2-58 (f), T-V10-45 |
| VAP-r2-09 | major | HANDOFF-OPEN | V11 | T-V11-13, T-V11-31, T-V11-38 (b) – T-V11-41 (b) restate pins with no registration clause |
| VAP-r2-10 | major | HANDOFF-OPEN | V10 | T-V10-45 restates `item111.water` on the reader goldens, the brief excepted, with no registration |
| VAP-r2-11 | major | DISAGREE | V11 | C9's exit runs T-V11-46 whole at M3b; C4b and §13.8 put its (a) — T122-4 — at M-SF |
| VAP-r2-12 | major | DISAGREE | V12 | `find.leaks`, `find.held` and `crisis.weeks` count less than T120-3, T120-4 and T122-2, which §13.2 binds to them |
| VAP-r2-13 | major | DISAGREE | V04 | J-V4.114 records 28.25–39.25 pw and U5 at 3–4.25; V04 §8 now 28.5–39.5 and 3.25–4.5 |
| VAP-r2-14 | major | DISAGREE | scope | §13.8 runs T126-1 (every tool) from M2a; V09 and V12 run every tool's script from M3a |

### VAP-r2-01 — HANDOFF-OPEN, major, owner scope

**Claim.** R2-08: "The volume test is the home of which base-bar clauses it runs: its head names each bar it takes …, and
a lettered clause re-running one names it. Scope's take-over table carries the same ids in its base-bar column." The
table (base l. 18220–18231) and §13.2's groups' runs lists miss ids the live tests name: (a) the calibration row (l. 18230)
lists ids for items 120–126 only, while T-V12-44 names T111-1 – T111-5, T-V12-45 T112-1, T-V12-46 T113-2 (and T113-5's
milestone), T-V12-47 T114-4 – T114-7, T-V12-48 takes T115-1, T115-4 and T116-1, T-V12-49 names T117-2 and T118-2 –
T118-6, and T-V12-50 takes T119-1, T119-2, T119-4 and T119-5; (b) the stage-3 row (l. 18224) gives T-V2-58 "T115-1's
composed shapes" only, while its (f) registers B-MASS on the rung pin "(V12 §2.13; T115-4)", and T-V2-59 "T123-5" only,
while its (d) runs "T123-7's no-op"; (c) the plan-rung row (l. 18223) gives T-V3-37 "T119-2's plan clauses", while its
clauses run T119-2, T119-3, T119-4 and T119-5, and T-V3-40 the plan clauses of T122-1 – T122-3, while its (f) runs
"V12's `item122.crises` pin (V12 §2.13; T122-7)"; (d) the evolution row (l. 18220) has no T114-10, though §13.8 runs
T114-10's 10 epochs "with M6-E's E3" and T-V6-73's welded-stretch clause runs them (VAP-r2-04); (e) the SettlementForge
row (l. 18227) gives T-V8-62 "T126-2's host-frame clause" only, while it runs "V09's T126-3 scan … over `embed.html`";
(f) the application row (l. 18229) names no item-112 bar, while T-V9-72 runs T112-1's style check on the thematic views
and T112-2's trial. §13.2's groups (the third statement of the same assignment) also diverge: item 111's runs list
(l. 18010–18011) names no test and omits volume 8 (T-V8-50, the port's clauses); item 112's (l. 18012–18018) has none;
item 113's (l. 18028–18029) names no test and omits volume 7 (T-V7-59, the village halves of T113-1 and T113-3); items 114,
115, 119, 122, 123 and 126's lists omit (b)–(e)'s clauses.

**Required change.** In §13.2's take-over table: the calibration row's base-bar column reads "every bar's register line and
its spec, the specs, pins and bench bars of items 111–126: T111-1 – T111-5 (T-V12-44); T112-1's style line (T-V12-45);
T113-2 and T113-5's registration (T-V12-46); T114-4 – T114-7 (T-V12-47); T115-1, T115-4 and T116-1 (T-V12-48); T117-2 and
T118-2 – T118-6 (T-V12-49); T119-1, T119-2, T119-4 and T119-5 (T-V12-50); T120-1 and T120-6 (T-V12-52); …" (the rest as
it stands); the stage-3 row reads "T115-1's composed shapes and T115-4's rung clause on B-MASS (T-V2-58), …, T123-5 and
T123-7's exterior clause (T-V2-59)"; the plan-rung row "T119-2 – T119-5's plan clauses (T-V3-37), …, T122-1's, T122-2's,
T122-3's and T122-7's plan clauses (T-V3-40)"; the evolution row adds "T114-10's epoch clause (T-V6-73)"; the
SettlementForge row "T126-2's host-frame clause and T126-3's embed clause (T-V8-62)"; the application row adds "T112-1's
thematic-view clause and T112-2 (T-V9-72)". In §13.2's groups: item 111's runs list reads "Volume 7 runs them at the village
rungs (T-V7-58), volume 6 over epochs, a failing spring weakening its pull (T-V6-72), volume 8 the port's clauses
(T-V8-50) and volume 12 the specs, the pin and the register lines (T-V12-44)"; item 112's gains "Volume 9 runs T112-1 on
its thematic views and T112-2's trial (T-V9-72) and volume 12 the style line (T-V12-45)"; item 113's reads "Volume 6 runs
them on its replay engine (T-V6-71), volume 4 T113-4 and T113-5 on the underground's output (T-V4-77, T-V4-76), volume 7
the village halves of T113-1 and T113-3 (T-V7-59), volume 8 the dossier's history (T-V8-51), volume 12 their register lines
and the replay's budget (T-V12-46)"; item 114's "Volume 6 runs T114-1 – T114-5, T114-8's and T114-10's epoch clauses on
its engine (T-V6-73)"; item 115's "volume 2 on composed shapes and the rung pin on B-MASS (T-V2-58)"; item 119's "volume 3
the plan's (T-V3-37: T119-2 – T119-5)"; item 122's "volume 3 the plan clauses of T122-1 – T122-3 and T122-7 (T-V3-40)";
item 123's "volume 2 T123-5 and T123-7's exterior clause (T-V2-59)"; item 126's "volume 8 T126-2's host-frame clause and
T126-3's embed clause (T-V8-62)". (The volume ends are VAP-r2-02 – VAP-r2-06.)

### VAP-r2-02 — HANDOFF-OPEN, major, owner V02

**Claim.** T-V2-58 (V02 l. 3451) opens "(item 115 (f); takes T115-1's composed-shape clause, §13.2's stage-3 row)" while
its (f) re-runs T115-4's rung pin: "TOWN, CITY and METROPOLIS byte-identical across the ceiling table's bump: B-MASS
registered on the rung pin `item115.ceiling` (V12 §2.13; T115-4)" — no seat, and not in R2-09's form, so V12 lists the
suite as "B-MASS (V02)" with no test id and §3.7.8 omits it (VAP-r2-08). T-V2-59 (l. 3682) "takes T123-5" while its (d)
runs "T123-7's no-op" on the exteriors.

**Required change.** T-V2-58's head reads "(item 115 (f); takes T115-1's composed-shape clause and T115-4's rung clause on
B-MASS, §13.2's stage-3 row)"; its (f) ends "— the `item115.ceiling` registration of B-MASS on V12 §3.7.8's engine
(V12 §2.13), written by the M6a seat (T115-4)". T-V2-59's head reads "(item 123 (d), (f); takes T123-5 and T123-7's
exterior clause)".

### VAP-r2-03 — HANDOFF-OPEN, major, owner V03

**Claim.** T-V3-37 (V03 l. 2885) opens "the plan's one-time waits (item 119 (f)'s plan clauses; V03 §6)" and takes no bar,
while its clauses name T119-2 (each wait within the comfort level), T119-3 (progress past one second), T119-4 (the
`perf.qualitySpend` rows) and T119-5 (the interaction rows); the base names "T119-2's plan clauses (T-V3-37)" only.
T-V3-40 (l. 2888) "takes T122-1's, T122-2's and T122-3's plan clauses" while its (f) re-runs "V12's `item122.crises` pin
(V12 §2.13; T122-7)" over the plan tiles.

**Required change.** T-V3-37's head reads "the plan's one-time waits (item 119 (f)'s plan clauses; V03 §6; takes T119-2 –
T119-5's plan clauses)"; T-V3-40's head reads "… takes T122-1's, T122-2's, T122-3's and T122-7's plan clauses)". (The
registration form of (f) is the peer's VV34-r2-12.)

### VAP-r2-04 — HANDOFF-OPEN, major, owner V06

**Claim.** The new bar T114-10 (base l. 18044–18050: a CITY fixture with an `on_enceinte` castle at generation and over
10 epochs, the town's and the bailey's profiles equal at every commit) is scheduled "its 10 epochs in the milestone tier |
M2b (its epochs with M6-E's E3)" (§13.8). T-V6-73 (V06 l. 4078) runs exactly that epoch half — "**the welded stretch**: on
a CITY fixture with an `on_enceinte` castle over 10 epochs …, the welded stretch's town and bailey profiles are equal at
every commit" — but "takes T114-1 – T114-5 and T114-8" only, and V06 §7's own table (l. 3999) and its lead (l. 3938) do
not list T114-10. No volume test names T114-10 (0 occurrences in the volumes).

**Required change.** T-V6-73's head reads "(item 114; V06 §3.7.7; takes T114-1 – T114-5, T114-8 and T114-10's epoch
clause)", its welded-stretch clause ending "(V06 §3.7.7; T114-10's epoch clause)"; V06 §7's table row reads "| T114-1 –
T114-5, T114-8, T114-10's epoch clause (item 114 (g)) | T-V6-73 | the transitions over epochs on H-WALLS; the welded
stretch over 10 epochs; the `item114.condition` pin |"; V06 §7's lead adds "T114-10's epoch clause" after "T114-8's
epoch clause".

### VAP-r2-05 — HANDOFF-OPEN, major, owner V08

**Claim.** T-V8-62 (V08 l. 3229) "takes T126-2's host-frame clause" and ends "the embed's bundle holds no phone layout,
screen, notice or catalogue row (V09's T126-3 scan run over `embed.html`)" — a clause re-running T126-3 on the host's
build, named in the clause but not in the head; §8.3's R1 (l. 3307) lists only T126-2's host-frame clause.

**Required change.** T-V8-62's head reads "item 126 at the host (takes T126-2's host-frame clause and T126-3's embed clause;
V08 §3.16 (10))"; R1 reads "… T125-1 – T125-3, T126-2's host-frame clause and T126-3's embed clause, green at the release
commit".

### VAP-r2-06 — HANDOFF-OPEN, major, owner V09

**Claim.** T-V9-72 (V09 l. 4308) — "every thematic view of V09 §5.4 at each variant passes T112-1's style check …"; "the
trial's `TrialRecord` validates …"; milestone "the release gate (the trial, T112-2)" — re-runs T112-1's thematic-view
clause and T112-2, naming both, but its head "(V09 §4.21.2, V09 §7.6; item 112)" takes neither and V09 §7's take-over
paragraph (l. 4225–4232) lists "the screens of items 114–126" only.

**Required change.** T-V9-72's head reads "(V09 §4.21.2, V09 §7.6; item 112; takes T112-1's thematic-view clause and
T112-2)"; V09 §7's lead adds, before "the screens of items 114–126", "T112-1's thematic-view clause and T112-2 by T-V9-72,".

### VAP-r2-07 — HANDOFF-OPEN, major, owner V09

**Claim.** V12's new hand-off X-V12-20 (V12 l. 3402): "the app harness runs V12 §3.15.11 – V12 §3.15.16's fixtures: the
device fixtures with T121-5's captures, the crisis previews' and the weather fixtures' sessions, the touch scripts and the
resize script at the medium class's minimum | V09 §7 (T-V9-22, T-V9-84, T-V9-85, T-V9-87)". At the destination only T-V9-84
takes its part ("T121-5's captures taken on this harness for V12"; T-V9-83 likewise for §3.15.10). T-V9-22, T-V9-85 and
T-V9-87 run V09's own scripts and name none of V12's sessions, so nothing in V09 commits its harness to running V12
§3.15.12's crisis-preview sessions, §3.15.14's weather sessions (the view time stepped by the harness's clock) or §3.15.16's
touch scripts and resize script, on which T-V12-54, T-V12-57 and T-V12-59 depend.

**Required change.** V09 §7's lead (l. 4222) adds: "The app harness also runs volume 12's fixtures on its bars (X-V12-20):
V12 §3.15.11's device fixtures with T121-5's captures (T-V9-84), V12 §3.15.12's crisis-preview sessions (T-V9-85), V12
§3.15.14's weather fixtures' sessions, the view time stepped by the harness's clock (T-V9-87), and V12 §3.15.16's touch
scripts and resize script at 600 × 480 (T-V9-22)"; each of T-V9-22, T-V9-85 and T-V9-87 adds "(with V12 §3.15.n's
fixtures on this harness)" as T-V9-83 does.

### VAP-r2-08 — DISAGREE, major, owner V12

**Claim.** R2-09: "V12 §2.13's pin rows and §3.7.8's list of registering volume pins are exactly the union of those clauses,
each named by its test id." They are not equal to each other: (a) §3.7.8 (l. 1716) and X-V12-11 (l. 3393) list "T-V11-38 –
T-V11-41 (b)", but §2.13's suites column names only T-V11-38 (b) (on `item111.water`); T-V11-39 (b) (`item113.history`),
T-V11-40 (b) (`item114.condition`) and T-V11-41 (b) (`item115.off` with every row's `enabled` false, and `item115.ceiling`
at TOWN and above) are in no suite cell — T-V11-41 (b) appears only in `item115.off`'s bar column; (b) `item115.ceiling`'s
suites (l. 927) read "B-MASS (V02)" with no test id, and §3.7.8 and X-V12-11 name V02's T-V2-50 only, not T-V2-58 (f), which
registers B-MASS on that pin (VAP-r2-02); (c) `item111.water`'s suites list "the reader and why goldens (V10, T-V10-45)"
whole, while T-V10-45 holds them byte-identical "but the brief's arid mark" (VAP-r2-10) — a suite the pin's byte-identity
would fail. (The ids the peers found — T-V2-59 (d), T-V2-60 (c), T-V3-39 (g), T-V3-40 (f), T-V8-59, T-V8-61 (b) — are
VV1112-r2-08 and VV34-r2-15.)

**Required change.** §2.13: `item111.water`'s V10 cell reads "the reader and why goldens but the brief's (V10, T-V10-45)";
`item113.history` adds "T-V11-39 (a)'s four fixtures (V11, T-V11-39 (b))"; `item114.condition` adds "B-CITY's 200
seeds per rung (V11, T-V11-40 (b))"; `item115.off` adds "B-CITY's 200 seeds per rung (V11, T-V11-41 (b))" to its suites;
`item115.ceiling`'s cells read "B-MASS (V02, T-V2-58 (f)); … ; B-CITY's TOWN, CITY and METROPOLIS seeds (V11,
T-V11-41 (b))". §3.7.8's list and X-V12-11 read "… V02's T-V2-50 and T-V2-58 (f); … V11's T-V11-13, T-V11-31 and
T-V11-38 (b) – T-V11-41 (b)", each id on the pin its suite cell names. (V11's ends are VAP-r2-09.)

### VAP-r2-09 — HANDOFF-OPEN, major, owner V11

**Claim.** X-V12-11 hands every volume pin that restates an owner item's pin — "T-V11-13, T-V11-31, T-V11-38 – T-V11-41
(b)" among them — to register its suites on V12 §3.7.8's engine, closed at "V11 §7", and R2-09 makes the restating test
the home of that registration: "states, in one clause, '— the `<pin>` registration of <suite> on V12 §3.7.8's engine
(V12 §2.13), written by <seat>'". V11's six state none: T-V11-13 (l. 4974: "with `coverage.rosterWeight` 0 the roster,
and with the coverage family's weight 0 the placement, byte-identical"), T-V11-31 (l. 4988: item 110's six switches off,
"byte-identical to the pre-110 goldens"), T-V11-38 (b) – T-V11-41 (b) (l. 5007–5010: "the no-op pin — …"). §7.4's lead
("each no-op pin is a NoOpPin registration on V12 §3.7.8's engine") names no pin, suite or seat, and T-V11-39 (b) –
T-V11-41 (b) name no fixtures, so V12 cannot list them (VAP-r2-08).

**Required change.** Each clause ends in R2-09's form: T-V11-13 "— the `item103.coverage` registration of B-CITY's 200
seeds per rung on V12 §3.7.8's engine (V12 §2.13), written by the C2 seat"; T-V11-31 "— the `item110.raised`, `.terrace`,
`.deck` and `.stepped` registration of B-CITY's 200 seeds per rung …, written by the C3b seat"; T-V11-38 (b) "— the
`item111.water` registration of the arid and temperate sites' 200 seeds per rung …, written by the C9 seat"; T-V11-39 (b)
"on clause (a)'s four fixtures — the `item113.history` registration of them …, written by the C9 seat"; T-V11-40 (b) "on
B-CITY's 200 seeds per rung — the `item114.condition` registration of them …, written by the C9 seat"; T-V11-41 (b) "on
B-CITY's 200 seeds per rung — the `item115.off` registration of them and, at TOWN, CITY and METROPOLIS, the
`item115.ceiling` registration …, written by the C9 seat".

### VAP-r2-10 — HANDOFF-OPEN, major, owner V10

**Claim.** T-V10-45 (V10 l. 3087) ends "with item 111's cells at their no-op values the drivers carry a water term of 0 and
`climateSun` 1, and every read and why golden but the brief's arid mark is byte-identical to the pin's (V12's NoOpPin)" —
a restatement of `item111.water` that states no registration and excepts one golden, while V12 §2.13 registers "the reader
and why goldens (V10, T-V10-45)" on that pin whole (VAP-r2-08). R2-09's both ends are unwritten here.

**Required change.** T-V10-45's last clause reads "… every read and why golden but the brief's is byte-identical to the
build before item 111 (the brief's arid mark is item 111's own line) — the `item111.water` registration of the reader and
why goldens, the brief's excepted, on V12 §3.7.8's engine (V12 §2.13), written by the C1 seat".

### VAP-r2-11 — DISAGREE, major, owner V11

**Claim.** V11 §8's C9 row (l. 5034) exits "T-V11-38 – T-V11-44 and T-V11-46 – T-V11-48 at the exits of the milestones that
build each item's base mechanism (… items 122 and 124's with §8.2's crisis looks and weather effects at M3b …)", so
T-V11-46 runs whole at M3b. Its clause (a) — "the closed mapping: every word of the catalogue manifest's
`sf.stressors@<line>` list has its `stressor` row …", which takes T122-4 — needs V08's census lists and the `crisis.map`
rows, which are C4b's: the C4b row (l. 5029) exits "T-V11-46 (a) … on … V08's census lists" at M-SF, and §13.8 schedules
"T122-4 | PR (volume 11's compile check over volume 8's census lists) | M-SF (with the map rows)". One clause, two
milestones; at M3b it has no input.

**Required change.** C9's exit cell reads "T-V11-38 – T-V11-44, T-V11-46 (b) – (d), T-V11-47 and T-V11-48 at the exits of
the milestones that build each item's base mechanism (…); T-V11-46 (a), the closed mapping over V08's census lists, is
C4b's at M-SF; the register green (below)".

### VAP-r2-12 — DISAGREE, major, owner V12

**Claim.** §13.2 binds three base bars to V12's statistics, each "0": (T120-3) "no withheld thing appears in a suggestion, a
count, a glow, a pin, a ghost pin, a gap outline or a legend chip (`find.leaks` 0)"; (T120-4) "the chips survive every band
and layer change and every commit, advance, undo, redo, regenerate, load and migration, re-evaluated at once, and a chip
whose last match goes stays in the set at count 0, dark (`find.held` 0)"; (T122-2) each look "exactly in its condition's
weeks … and never for a condition the viewer's key withholds (DR44's admission) (`crisis.weeks` 0)". V12 defines them
narrower — the metric registry (l. 1205) counts for `find.leaks` "the suggestions, counts, glows, pins and ghost pins naming
a withheld entity" (no gap outline, no legend chip) and for `find.held` a step script of "band and layer changes, commits,
an advance and an undo" (no redo, regenerate, load or migration, and no count-0 chip); §3.15.10's T120-4 bullet (l. 2621)
is headed "every commit, advance and undo"; `crisis.weeks` (l. 1208; §3.15.12's T122-2 bullet, l. 2684) counts only weeks
against [`sinceWeek`, `untilWeek`), never a withheld condition's look. T-V12-52's statistics measure T120-3 and T120-4
and T-V12-54 takes T122-2 on these measures, so a leak through a gap outline, a chip lost at a migration or a withheld
look drawn passes the bar.

**Required change.** The metric registry's row (l. 1205) reads "… under a player view on the knowledge canary fixture, the
suggestions, counts, glows, pins, ghost pins, gap outlines and legend chips naming a withheld entity; over a step script of
band and layer changes, commits — one removing a chip's last match among them —, an advance, an undo, a redo, a regenerate,
a save and load and a migration, the steps whose chip set changed or whose matches differ from a fresh evaluation there,
and a chip whose last match went counted unless it stays at count 0, dark; …"; §3.15.10's T120-3 and T120-4 bullets read
the same (T120-4's head "every band and layer change and every commit, advance, undo, redo, regenerate, load and
migration"); the `crisis.weeks` row (l. 1208) and §3.15.12's T122-2 bullet add "and, under a player view whose key withholds
a condition, every look of it drawn counted as a mismatched week (DR44's admission)"; T-V12-52 adds "a planted gap outline
on the canary's district fails `find.leaks`, a chip dropped by a migration fails `find.held`" and T-V12-54 "a planted look of
a condition the `public` key withholds fails `crisis.weeks`".

### VAP-r2-13 — DISAGREE, major, owner V04

**Claim.** J-V4.114 (V04 l. 3367) records "the underground's price at 28.25–39.25 pw (V04 §8's table) … the epoch contracts
(0.25–0.5 pw in U5, U5 at 3–4.25 pw) …". Round 2 added item 123's damage below ground to U5 (+0.25 pw; J-V4.130): V04 §8's
U5 reads 3.25–4.5 and its total "**28.5–39.5** (accepted, owner question 2, J122 …)", V04 §11's Q2 "its cost, 28.5–39.5
pw — answered (J122): accepted — it carries owner rules 109 and 110 (J-V4.114) and item 123's part below ground
(J-V4.130)", and §16 and INDEX §1 carry 28.5–39.5. The decision the owner's acceptance rests on states the old price.

**Required change.** J-V4.114 reads "chose the underground's price at 28.5–39.5 pw (V04 §8's table) … the epoch contracts
(0.25–0.5 pw in U5, U5 at 3.25–4.5 pw); … and g item 113's parts absorbed in U3, U3b and U5 (J-V4.122), and g item 123's
damage below ground (0.25 pw in U5; J-V4.130) — accepted by the owner's delegation (owner question 2, J122)".

### VAP-r2-14 — DISAGREE, major, owner scope

**Claim.** §13.8 (l. 18840) schedules "T126-1 – T126-3 | PR on volume 9's app harness | M2a (with the medium layout)", and
T126-1 requires that "at the medium class every tool of V09 §4.12's list completes its canvas script under touch". At M2a
only T9 `shape` and T10 `hold` exist (V09 AP2; T2 `ground` – T8 `fill` land at M3a, AP3). The takers place it otherwise:
T-V9-22's milestone "M2a (T126-2, T126-3); M3a (every tool's touch script)", T-V12-59 "M2a (§16); each tool's script from
the milestone that lands it, every tool from M3a", V12 §3.15.16 "each tool from the milestone that lands it, every tool
from M3a". By §13.2's convention (2) a bar runs "from the milestone §13.8's schedule gives it", so the base gates every
tool's touch script at M2a, which the volumes do not.

**Required change.** §13.8's row reads "| T126-1 – T126-3 | PR on volume 9's app harness | M2a (with the medium layout);
T126-1 each tool from the milestone that lands it, every tool from M3a |".
