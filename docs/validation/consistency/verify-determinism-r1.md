# Verify — determinism part (§5, §6, §7) of the consolidated ARCHITECTURE.md, round 1 (after repair round 1)

> Fable-reviewed 2026-09-26: CORRECTED — docs/validation/consistency/validate.md

Lane `consistency/verify-determinism-r1`, 2026-09-26. Status: COMPLETE. Inputs: §5–§7 of the current
`docs/ARCHITECTURE.md` (l. 3917–5457); the pre-repair document, rebuilt with `assemble-r0.py` (sha256 `ee314f23…`,
assemble-r1's "before"); the current document, reproduced byte for byte by re-running `assemble-r1.py` on it (sha256
`ddd48f07…`); the diff between the two for all 49 repair blocks (§5–§7: 23 hunks, 145 diff lines; the other parts' 36
blocks: 632 diff lines; every hunk read); the archive; all 601 records of `inventory-determinism.json`; `canon.json`
(`by_inventory_id`, and the rulings the changed text touches: GAP-1, CF-PIPE-04, C-5, MODEL-C09, CANON-C08, R4); the
mapping table of `rewrite-determinism.md`; `verify-determinism-r0.md`; and the r0 issue tables of all six verifiers.
The determinism repair file carries no preamble, so the issues it claims are the 23 issues owned by determinism in the
r0 reports, the set the workflow hands it (`workflows/08-consistency.js`, repair prompt: `issues.filter(owner ===
part)`).

## 1. Outcome

**3 issues, all minor (0 blocker, 0 major): 2 owned by determinism, 1 by pipeline.** Of the 23 issues the repair was
given, 22 are fixed. VDC-7 is only partly fixed: the repair used V-MODEL-13's shorter wording, which omits the row
neighbour's wing rings (VDR1-1). The two rendering-owned r0 issues about this part (VDC-3, VDC-4) and kernel's VK-R0-3
(the engine id) are fixed by those lanes. VD5-1 … VD5-5 and the routed NP5-2, NP5-3 and VD5-6 stay fixed. Each of the 23
hunks in §5–§7 maps to a listed issue, and nothing else in the part changed. The repair introduced one new problem, in
pipeline's text: §4.4 S5d still cites §5.2 for "≥ 95 % of seeds", a figure §5.2 no longer states (VDR1-2). One conflict
surfaced where repaired text meets this part: §3.8's `spine` reader list, and §4.2 S1 (2) since P0-7, have S1's coast
clamp read the skeleton, while F-SKELETON's row names only S11 and S13a (VDR1-3). The part has no deferral wording, no
review marker and no fix-round tag. Every `§` reference resolves, and all 34 J pointers resolve.

CONFIRMED by executed diff, grep and scripts: every "fixed" verdict in §3, VDR1-2, and the mechanical checks of §7.
PLAUSIBLE (reading only): that VDR1-1's missing wing rings would lead an oracle author astray, and that VDR1-3's where
column matters beyond the table's completeness.

## 2. Issues

| id | severity | kind | owner | claim | required change |
|---|---|---|---|---|---|
| VDR1-1 | minor | conflict | determinism | VDC-7 is partly fixed. §7.3 item 7 (ii) now checks "each face §2.6's composition rule (1) adds to its scope". Rule (1), however, adds to the storing edit's scope the faces "together with a row neighbour's wing rings, which its carry changes the same way", and it says "each ring equals its prior ring with those vertices removed (…; the check of §7.3 item 7 (ii))". Wing rings are records, not faces. VDC-7's required change named them, but V-MODEL-13's wording, which the repair used, does not. | §7.3 item 7 (ii): "… each face and wing ring §2.6's composition rule (1) adds to its scope equal to its prior ring after removing the vertices that rule inserted, with the `composition` role rows it adds present". |
| VDR1-2 | minor | broken-reference | pipeline | This is a new problem from VDC-17's fix. §4.4 S5d's test reads "asserts population ± 5 % (on ≥ 95 % of seeds, §5.2)" (l. 3125). F-BUDGET-STAGE's test cell is now "§13.2's B-CITY `wealthLevel` sweep", so §5.2 no longer states "≥ 95 %". The figure lives at §13.2 (l. 7690; canon: DETERMINISM-049 → SCOPE-184). The chain §4.4 → §5.2 → §13.2 still resolves, and nothing is lost. | §4.4 S5d: "(on ≥ 95 % of seeds, §13.2)", or P1-2's fuller reduction to "**Test:** §13.2's B-CITY `wealthLevel` sweep". This is the same finding as `verify-pipeline-r1.md` P1-2, found independently. |
| VDR1-3 | minor | conflict | determinism | F-SKELETON's where column is "S11, S13a", and its ladder names only "labels: a sampled medial axis (§3.8, used by §9.3); roofs: a plain roof". §3.8's reader list (kernel, canonical) makes `spine` also "the local feature size S1's coast simplicity clamp reads (§4.2 S1)", with the sampled-medial-axis downgrade. §4.2 S1 (2), since the pipeline repair (P0-7 = VK-R0-11), says the clamp "reads it through `skeleton(rings, 'spine')` … with its sampled-medial-axis downgrade". A skeleton failure at S1 is therefore an F-SKELETON event that §5.2 does not list. The gap was already implicit in the archive (S1 took the medial axis "from its straight skeleton"); the rewrite's explicit reader list and P0-7 now state it. | §5.2 F-SKELETON: where "S1, S11, S13a"; ladder "`spine` readers — label spines (§9.3) and S1's coast clamp (§4.2 S1 (2)): a sampled medial axis (§3.8); roofs: a **plain roof** …". |

## 3. The issues the repair claimed, and the r0 issues about this part fixed by other lanes

| issue (r0 report) | owner | verdict | where the fix stands (evidence) |
|---|---|---|---|
| VDC-1 (determinism) = VK-R0-3 (kernel) | kernel + assembler | FIXED | §3.7 l. 2323 "the arrangement engine, `plat-arrangement@<version>` (§5.4)"; §5.4 l. 4091 keeps `engine: string /* the engine id, §3.7 */` (assemble-r1's post edit, which DETERMINISM-127's pointer rule supports); the id occurs once. |
| VDC-2 = V-SCOPE-08 | determinism | FIXED | §6.5 (9) truncation identity (l. 4587–4592): "a `setAttr(name)` + `undo` pair, a `lock` + `unlock` pair and a naming `rerollLayer` + `undo` pair, each around a corpus selection — the freeing event re-drawing the name by §6.3's case (4), listed, confirmed and stored in the event, …". §13.2's B-EDIT list points to "§6.5 (9)'s truncation, naming and version-pinned cases" (l. 7722). The archive's wording is SCOPE-208 / §6.3 (see §6 O7). |
| VDC-3 = VR-R0-4 | rendering | FIXED | §12.8 (l. 7449–7450): "≈ 30 000 entity leaves, ≈ 15 000 face-ring hashes and their interior nodes at 16 B each". |
| VDC-4 = VR-R0-5 | rendering | FIXED | §11.3 Logging (l. 7022–7023): "logged one to one — a host's own commands with `author: 'host'` (§7.1's `EditBase`)"; `EditBase.author` includes `'host'` (l. 4624). |
| VDC-5 | determinism | FIXED | F-SITING: "reduce the manifest, lowest-priority classes first, and report `unplaced`", which agrees with §4.7 S10b (l. 3475). |
| VDC-6 | determinism | FIXED | §6.2: "recomputed by every in-window load (§2.9 step 3)" (l. 4280) and "every in-window load" in Bars (l. 4292). Both agree with §2.8 (l. 1158) and §2.9 (l. 1293–1294). |
| VDC-7 = V-MODEL-13 | determinism | V-MODEL-13 FIXED; VDC-7 PARTLY | §7.3 item 7 (ii) (l. 5136–5138) adds the faces and the `composition` role rows. The row neighbour's wing rings are missing (VDR1-1). |
| VDC-8 | determinism | FIXED | §7.2 (l. 4818–4819): "against the samples their `DerivationRecord` holds (§2.8)"; `DerivationRecord.fields` holds them (l. 1179). |
| VDC-9 = V-MODEL-06 = P0-5 | determinism | FIXED | §7.7 One path (l. 5394–5395): "A blueprint's assignments and edits become `assign` and edit events at log positions 0…k". |
| VDC-10 | determinism | FIXED | F-CASTLE test: "§4.8's castle acceptance; O8 (d)". §4.8 (l. 3589–3591) states ≥ 99 %, 0 ways through reservations and the 178 / 11 baseline. |
| VDC-11 (a) (b) (c) | determinism | FIXED | (a) §6.1 (l. 4180) "`STAGE_VIEW` and reroll, attempt, epoch and salt 0", as §8.10 l. 6263–6264 states it; (b) §7.3 item 2 (l. 4867) adds "the undo of an upgrade after a reload", so its list now equals §12.6's (l. 7331–7332); (c) §7.8 (l. 5446) "in §8.5's distinct preview style" (§8.5 l. 6002). |
| VDC-12 | determinism | FIXED | §7.1 (l. 4728–4729) and §7.4's draw-bridges row (l. 5230) place the `Bridge` "by §4.2 S1 (5)'s rule for a drawn bridge". The centreline phrase remains only in §4.2 S1 (5) (l. 2734), the rule itself. |
| VDC-13 | determinism | FIXED | F-SITING test: "O18 (f) (§15.2): 100 % of institutions on a plot meeting their requirement; §4.5 S7b (3)'s acceptance for claims larger than one block; the derived-complete digest across district orders (§6.5 (9))". |
| VDC-14 | determinism | FIXED | §5.3 (l. 4078–4079): "TOWN → METROPOLIS at M2b, which measures METROPOLIS — generated from M1 on, §16". |
| VDC-15 | determinism | FIXED | F-SKELETON's test is now "§13.1's ladder-coverage fixtures". §13.1 lists the 1 000 holed polygons (l. 7619) and the ladder-coverage bar (l. 7644–7646). |
| VDC-16 = V-SCOPE-07 | determinism (+ scope) | FIXED | §7.1 (l. 4760–4761) "its completeness test is §13.2's (§2.8)"; §0.2 row 5 re-cited by scope (l. 108). V-SCOPE-07 found the two consistent; §13.2 states the test (l. 7675). |
| VDC-17 | determinism | FIXED (one side effect → VDR1-2) | F-NUM "B-FUZZ at §13.8's sizes against §13.1's bar (O3 a); 0 mandatory chains rejected on B-CITY" (§13.1 l. 7536–7537; §13.8 l. 8176–8177); F-OUTLINE "§13.2's outline stage property test" (l. 7686); F-BUDGET-STAGE "§13.2's B-CITY `wealthLevel` sweep" (l. 7690); F-SKELETON as VDC-15. |
| VK-R0-12 | determinism | FIXED | §5.4 `warnings` lists W_ATTRACTED, W_STRETCH_SHARED, W_WEDGE_ROUTED, W_SNAP_PASSES, W_ACUTE_CORNER, W_SLIVER_RETYPED and W_HEIGHT_CLAMPED "(§3.1)", as the archive did (l. 5216); `W_DOWNGRADE` stays with `downgrades`. |
| V-MODEL-05 | determinism | FIXED | §6.2 (iii) (l. 4312–4313): "shown disabled ("checking the saved copy…")" (archive l. 1974). |
| P0-3 | determinism | FIXED | §7.6 (l. 5334–5335): "an `insert` whose key already exists is an orphan too" (archive §10.4 l. 8389); §10.4 points here (l. 6786). See §6 O8. |
| V-SCOPE-09 | determinism | FIXED | §6.5 (9) cross-host (l. 4574–4575): "…, workers on and off, pool sizes 0–3". §13.2 (l. 7678–7679) and §13.3 (l. 7874–7875) now agree (§6 O1). |

## 4. Open items VD5-1 … VD5-5 and routed items

No repair hunk touches the text that fixes them. Each verdict stands as in r0 §3 (`verify-determinism-r0.md`), re-checked on the
current text.

| item | verdict | note |
|---|---|---|
| VD5-1 | FIXED | §7.3 item 4, §7.4's regenerate and upgrade rows, §7.5 and §6.3: unchanged. |
| VD5-2 | FIXED | §7.5's packs bullet and the F-EDIT row: unchanged (F-EDIT is not among the six rewritten rows). |
| VD5-3 | FIXED | §6.3's case-(4) trigger list and §7.4's rebase row: unchanged. |
| VD5-4 | FIXED | §6.2's node rule: unchanged (the same bullet's hunk touches only "in-window"). §5.3's CI row: unchanged. |
| VD5-5 | FIXED | §6.5 (9) replay = session and truncation identity still compare "model digest **and records digest**"; §7.3 items 6 and 7 (i): unchanged. |
| NP5-2 / NP5-3 / VD5-6 (routed) | FIXED | F-ROUTE's `where` (l. 4012), §7.6's canonical sentence (l. 5317), §7.4's warp paragraph and the §2.9 pointers: unchanged. |

GAP-1 (no value for k in "no branch re-joins its parent within k segments") stays as the canon rules: the validator
lists it for the owner or Fable.

## 5. What the other parts' repairs changed under this part's pointers

Each pointer of this part that lands in another part's replaced subsection was re-checked against that part's hunks
(48 referenced ids, and every `§`-pointer of §5–§7 into §0.2, §2.1, §2.5, §2.9, §3.3, §3.7, §3.9, §3.10, §4.2, §4.5, §4.8,
§4.9, §4.11, §8.2, §8.10, §9.5, §11.2, §11.3, §12.2, §12.4, §12.6, §12.8, §13.1, §13.2 and §16).

* **Fact moved, pointer still lands.** §2.9 step 4 now points to §11.3 for the bridged keep policy, but it keeps the
  install mechanics. This part's pointers to §2.9 step 4 (l. 4311, 4669, 5107, 5122) need only the mechanics: the
  re-application, `at = h₀` and the install.
* **Changed wording, no conflict:**
  * §2.1's lint now covers length fields only, which agrees with §5.3's unit row ("every length field carries a unit").
  * §3.10's resolution row now reads by §2.2 rule 7's registry, so §5.3's row, which enumerates no roles, still holds.
  * §4.5 restores containment by parent and cites "§5.3's containment row", which exists (l. 4067).
  * §4.8's bridge list points to §4.2 S3 (2) and (10), consistent with §5.3's deck row.
  * §4.9's trees row cites `render.instances/<entity>` (§6.1).
  * §4.11's `build.footprint` is now `PolygonCm`, as §7.1's build event (l. 4644).
  * §8.2 states the contour clip with "(F-CONTOUR, §5.2)". This agrees with F-CONTOUR's rung under canon R4.
  * §11.3's bridged-verification sentence agrees with §6.2 (iii).
  * §12.2's rung figures move to §1.1, which is where §5.1 (5) already points.
  * §13.2's expanded load-verification and warp fixtures agree with §6.2 (iii) and §7.4. Its naming-input fixtures are
    unchanged in content (whitespace-normalised script).
* **This part's facts, now restated elsewhere with agreeing values:** see §6.
* **Found:** VDR1-2 (§4.4 S5d) and VDR1-3 (§3.8 and §4.2 S1 (2) against F-SKELETON).

## 6. Observations, not raised (values agree; each belongs to another verifier or was ruled)

* **O1.** §13.2's "Stage contract tests" (l. 7678–7679) and §13.3's reproducibility parenthetical (l. 7874–7875)
  still restate §6.5 (9)'s cross-host test (SCOPE-176 → DETERMINISM-291). The values agree now that §6.5 (9) says
  "pool sizes 0–3". V-SCOPE-09 left the scope-side reduction optional ("may"), and it was not taken. This is for the
  scope verifier.
* **O2.** §4.7 S10b (l. 3475) restates F-SITING's last rung ("lowest-priority classes first") beside its pointer. It now
  agrees with the home (CF-PIPE-04). This is for the pipeline verifier.
* **O3.** §2.5 (l. 798–799) keeps "τ = 0.01 …, the same τ on replay" beside its pointer to §7.2. This is V-MODEL-10's
  required wording, and the values agree.
* **O4.** §6.1 and §8.10 both state the stamp-tile key's "reroll, attempt, epoch and salt 0". §6.1 added it as
  rendering's R13 note allowed (VDC-11 (a)), and CANON-C08 makes §6.1 canonical for stream keys.
* **O5.** §4.8's castle acceptance ends "(…; MFCG's census baseline of 178 equalise passes and 11 bloats, §5.2)", and
  F-CASTLE's test now points to §4.8. The "§5.2" reads correctly as the F-CASTLE ladder whose equalise and bloat rungs
  the baseline counts. No value is circular. `verify-pipeline-r1.md` raises this citation as P1-3 and acknowledges the same generous reading; I do not raise it separately.
* **O6.** Cosmetic: the repair's re-wrap leaves two short lines in §6.2 ("(§7.5) checks the old", "copy…"), and a save
  (which"). They render as continuous text.
* **O7.** §6.5 (9) now says "each around a corpus selection", the wording of the archive's §6.3 fixture (l. 5644) and
  §13.2 (l. 9500). The archive's §6.5 (9) (l. 5782–5783) and §7.4 (l. 6454) said "each followed by". The same VD4-3
  fixture was stated inconsistently in the archive. The repair took VDC-2's and V-SCOPE-08's required wording, which is
  the fuller statement. This is a reconciliation, not a change.
* **O8.** P0-3's clause now sits in §7.6's override bullet, so it names the existing-key `insert` for user overrides
  as well. §10.4 makes pack operations orphan "exactly as a user override is", so the two stay identical. PLAUSIBLE that
  this is the archive's intent; the verifier who raised P0-3 offered this placement first.

## 7. Mechanical checks (receipts)

* **Reproduction.** `assemble-r0.py` rebuilds the pre-repair document at sha256 `ee314f23…`, assemble-r1's "before".
  `assemble-r1.py` applied to it gives a file byte-identical (`cmp`) to the current `docs/ARCHITECTURE.md`
  (`ddd48f07…`).
* **Diff of §5–§7, pre-repair against current.** 23 hunks, all listed in §3 (the six F-row lines; §5.3's cost rule;
  §5.4's `kernel` line; §6.1's `render.stampTiles`; §6.2 ×3; §6.5 (9) ×2; §7.1 ×2; §7.2; §7.3 ×2; §7.4's bridge row;
  §7.6; §7.7; §7.8). No other line of the part changed. Numbered anchors (items, rules, steps) are identical before
  and after across the whole document (194 = 194, script), so every sub-anchored pointer of r0 still lands.
* **References.** The resolver (`assemble-r0-refs.py`) finds 0 broken references in §5–§7; the document's only 2 are
  external, at l. 2036 and 6828. There are 34 distinct J pointers in §5–§7, each with exactly one index row and one
  rationale Part A row (script, re-run after the scope lane's edit to the rationale file).
* **Wording.** 0 "PENDING FABLE REVIEW" lines in §5–§7 (the document's one is the banner, l. 3). 0 hits for TBD,
  TODO, deferred, open question or "to be decided". The only tag-like tokens are the invariant names NF-P5 (×4) and
  NF-P6 (×2). The one "later" in the repaired lines is temporal ("checked later in the same stage").
* **Identifiers.** Of the archive's backticked identifiers in §5–§7, `author: 'host'` was missing before the repair
  and is now present. The only two still missing are receipt paths that §13.2 cites without the
  `docs/validation/bench/` prefix, as in r0 (script).
* **Numbers.** Of the archive's approximate figures in §5–§7, ≈ 30 000 and ≈ 15 000 were missing before the repair
  and are now present. "≥ 99.5 %" stays absent, as SCOPE-C03 ruled (script).
* **Concern registry.** The concern names of §6.1 are identical and in the same order in the archive, the pre-repair
  document and now (script).
* **Size.** The part is 189 562 bytes: 84.5 % of the archive's 224 320, and +510 bytes on r0's 189 052.

## 8. Checked list — every inventory id

Columns: the r0 verdict (`verify-determinism-r0.md` §6), what this round re-checked, the r1 verdict, and a note.

* **home in a replaced subsection:** the id's statement lies in one of the 13 subsections the determinism repair
  replaced, but outside its 23 hunks. It is byte-identical to r0's text, so r0's verdict is re-confirmed by the diff.
* **changed text:** a hunk changed the statement. Each was read and checked against the archive and its canonical home.
* **target in a replaced subsection:** the fact lives in another part's replaced subsection, re-checked against that
  part's hunks.
* **J pointer:** re-checked by script.
* **not touched:** the id keeps its r0 verdict. It sits in §5.1, §6.3, §6.4, §7.5 or the section intros, and its
  pointers land on passages the repairs did not change.

| id | r0 verdict | r1 re-check | r1 verdict | note |
|---|---|---|---|---|
| DETERMINISM-001 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-002 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-003 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-004 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-005 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-006 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-007 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-008 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-009 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-010 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-011 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-012 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-013 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-014 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-015 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-016 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-017 | OK | J pointer | OK | pointer unchanged; the J row has one index row and one rationale Part A row (script) |
| DETERMINISM-018 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-019 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-020 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-021 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-022 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-023 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-024 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-025 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-026 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-027 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-028 | OK | changed text | OK | row line rewritten; only its test cell changed (VDC-17); detection and ladder byte-identical |
| DETERMINISM-029 | OK | target in a replaced subsection | OK | §3.6 "Chain classes" unchanged (§3.6 hunks are tag removals); pointer text unchanged |
| DETERMINISM-030 | VDC-17 | changed text | OK | VDC-17 fixed: "B-FUZZ at §13.8's sizes against §13.1's bar (O3 a)"; §13.1 states the bar, §13.8 the sizes (PR 10⁴ + constructive set, nightly 10⁶ per primitive) |
| DETERMINISM-031 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-032 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-033 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-034 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-035 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-036 | OK | changed text | OK | row line rewritten; only its test cell changed |
| DETERMINISM-037 | VDC-17 | changed text | OK | VDC-17 fixed: "§13.2's outline stage property test"; §13.2 states it (10 000 outlines per intent, 0 self-intersections, 0 untyped loops) |
| DETERMINISM-038 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-039 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-040 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-041 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-042 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-043 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-044 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-045 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff); the pointed-to sections' hunks leave the fact intact |
| DETERMINISM-046 | OK | target in a replaced subsection | OK | §4.2 S1 (5) deck rule unchanged (the §4.2 hunk is S1 (2)); pointer text unchanged |
| DETERMINISM-047 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-048 | OK | changed text | OK | row line rewritten; only its test cell changed |
| DETERMINISM-049 | VDC-17 | changed text | OK (here); VDR1-2 | VDC-17 fixed: "§13.2's B-CITY `wealthLevel` sweep" (§13.2 states ± 5 % on ≥ 95 %, walled share in band); §4.4 S5d still cites §5.2 for "≥ 95 %" → VDR1-2 (pipeline) |
| DETERMINISM-050 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-051 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-052 | OK | changed text | OK | row line rewritten; only its test cell changed |
| DETERMINISM-053 | VDC-10 | changed text | OK | VDC-10 fixed: "§4.8's castle acceptance; O8 (d)"; §4.8 states ≥ 99 %, 0 ways through reservations, the 178 / 11 baseline |
| DETERMINISM-054 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-055 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-056 | VDC-5 | changed text | OK | VDC-5 fixed: "reduce the manifest, lowest-priority classes first, and report `unplaced`"; agrees with §4.7 S10b |
| DETERMINISM-057 | VDC-13 | changed text | OK | VDC-13 fixed: O18 (f) (§15.2) 100 % of institutions + §4.5 S7b (3) for claims larger than one block + §6.5 (9) |
| DETERMINISM-058 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-059 | OK | pointer in a replaced subsection | OK | pointer text unchanged (diff); target section not replaced |
| DETERMINISM-060 | OK | changed text | VDR1-3 | test cell changed only (VDC-15/-17); the where column (S11, S13a) and label rung omit S1's `spine` reader that §3.8 and §4.2 S1 (2) now state |
| DETERMINISM-061 | VDC-15, VDC-17 | changed text | OK | VDC-15, VDC-17 fixed: "§13.1's ladder-coverage fixtures"; §13.1 states every downgrade exercised, no roof line outside, 0 crashes on the 1 000 holed polygons |
| DETERMINISM-062 | OK | pointer in a replaced subsection | OK | pointer text unchanged (diff); target section not replaced |
| DETERMINISM-063 | OK | pointer in a replaced subsection | OK | pointer text unchanged (diff); target section not replaced |
| DETERMINISM-064 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-065 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-066 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-067 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-068 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-069 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-070 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-071 | OK | target in a replaced subsection | OK | §2.9 pack set bullet unchanged (the §2.9 hunk is step 4); pointer text unchanged |
| DETERMINISM-072 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-073 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-074 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-075 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-076 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-077 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-078 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-079 | OK | pointer in a replaced subsection | OK | pointer text unchanged (diff); target section not replaced |
| DETERMINISM-080 | OK | pointer in a replaced subsection | OK | pointer text unchanged (diff); target section not replaced |
| DETERMINISM-081 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-082 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-083 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-084 | OK | target in a replaced subsection | OK | §3.10 kernel invariants present; its rows re-worded to §2.2 rule 7's registry; pointer text unchanged |
| DETERMINISM-085 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-086 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-087 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-088 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-089 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-090 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-091 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-092 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-093 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-094 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-095 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-096 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-097 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-098 | OK | pointer in a replaced subsection | OK | pointer text unchanged (diff); target section not replaced |
| DETERMINISM-099 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-100 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-101 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-102 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-103 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-104 | OK | target in a replaced subsection | OK | §2.1 still refuses any length field without a unit (the hunk re-words angles); agrees with the §5.3 row; pointer text unchanged |
| DETERMINISM-105 | OK | target in a replaced subsection | OK | §3.10 reference-resolution row present, re-worded to the registry; pointer text unchanged |
| DETERMINISM-106 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-107 | OK | target in a replaced subsection | OK | §4.2 S3 (9) unchanged; pointer text unchanged |
| DETERMINISM-108 | OK | pointer in a replaced subsection | OK | pointer text unchanged (diff); target section not replaced |
| DETERMINISM-109 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-110 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-111 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-112 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-113 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-114 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-115 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-116 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-117 | OK | target in a replaced subsection | OK | §2.9 step 3 unchanged; pointer text unchanged |
| DETERMINISM-118 | OK | target in a replaced subsection | OK | §2.9 step 3 unchanged; pointer text unchanged |
| DETERMINISM-119 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-120 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-121 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-122 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-123 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-124 | VDC-14 | changed text | OK | VDC-14 fixed: "TOWN → METROPOLIS at M2b, which measures METROPOLIS — generated from M1 on, §16" |
| DETERMINISM-125 | OK | changed text | OK | line re-wrapped by the repair; wording unchanged |
| DETERMINISM-126 | OK | J pointer in a replaced subsection | OK | pointer unchanged; the J row has one index row and one rationale Part A row (script) |
| DETERMINISM-127 | VDC-1 | changed text (§5.4; §3.7 by the kernel repair) | OK | VDC-1 fixed: §3.7 states `plat-arrangement@<version>` (kernel repair, VK-R0-3), §5.4 keeps "the engine id, §3.7" (assemble-r1 post edit); VK-R0-12 fixed in the same line |
| DETERMINISM-128 | VDC-1 | changed text | OK | VK-R0-12 fixed: §5.4 lists the seven counted codes as the archive did (l. 5216), "(§3.1)"; all seven and W_DOWNGRADE defined at §3.1 |
| DETERMINISM-129 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-130 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-131 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-132 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-133 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-134 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-135 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-136 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-137 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-138 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff); the pointed-to sections' hunks leave the fact intact |
| DETERMINISM-139 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-140 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-141 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-142 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-143 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-144 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-145 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-146 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-147 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-148 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-149 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-150 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-151 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-152 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-153 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-154 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-155 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-156 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-157 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-158 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-159 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-160 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-161 | VDC-11 | changed text | OK | VDC-11 (a) fixed: "with `STAGE_VIEW` and reroll, attempt, epoch and salt 0"; agrees with §8.10 |
| DETERMINISM-162 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-163 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-164 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-165 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-166 | OK | target in a replaced subsection | OK | §8.10 unchanged (tag removal only); pointer text unchanged |
| DETERMINISM-167 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-168 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-169 | OK | J pointer in a replaced subsection | OK | pointer unchanged; the J row has one index row and one rationale Part A row (script) |
| DETERMINISM-170 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-171 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-172 | OK | target in a replaced subsection | OK | §2.9 Recipe unchanged; pointer text unchanged |
| DETERMINISM-173 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-174 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff); the pointed-to sections' hunks leave the fact intact |
| DETERMINISM-175 | OK | pointer in a replaced subsection | OK | pointer text unchanged (diff); target section not replaced |
| DETERMINISM-176 | OK | target in a replaced subsection | OK | §2.9 pack set unchanged; pointer text unchanged |
| DETERMINISM-177 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-178 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-179 | OK | pointer in a replaced subsection | OK | pointer text unchanged (diff); target section not replaced |
| DETERMINISM-180 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-181 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-182 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-183 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-184 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-185 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-186 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-187 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-188 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-189 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-190 | VDC-3 | target changed by another part's repair | OK | VDC-3 fixed (rendering repair): §12.8 states ≈ 30 000 entity leaves, ≈ 15 000 face-ring hashes, 16 B nodes |
| DETERMINISM-191 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-192 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-193 | OK | target in a replaced subsection | OK | §12.8 states ≈ 0.25 MB (hunk adds the breakdown); pointer text unchanged |
| DETERMINISM-194 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-195 | VDC-6 | changed text | OK | VDC-6 fixed: "recomputed by every in-window load (§2.9 step 3)"; agrees with §2.8 and §2.9 |
| DETERMINISM-196 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-197 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-198 | OK | J pointer in a replaced subsection | OK | pointer unchanged; the J row has one index row and one rationale Part A row (script) |
| DETERMINISM-199 | VDC-6 | changed text | OK | VDC-6 fixed: "every in-window load (§2.9 step 3)" |
| DETERMINISM-200 | OK | changed text | OK | line re-wrapped; values unchanged |
| DETERMINISM-201 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-202 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-203 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-204 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-205 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-206 | OK | changed text | OK | V-MODEL-05 fixed: shown disabled ("checking the saved copy…") |
| DETERMINISM-207 | OK | J pointer in a replaced subsection | OK | pointer unchanged; the J row has one index row and one rationale Part A row (script) |
| DETERMINISM-208 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-209 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-210 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-211 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-212 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-213 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-214 | OK | J pointer | OK | pointer unchanged; the J row has one index row and one rationale Part A row (script) |
| DETERMINISM-215 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-216 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-217 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-218 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-219 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-220 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-221 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-222 | OK | J pointer | OK | pointer unchanged; the J row has one index row and one rationale Part A row (script) |
| DETERMINISM-223 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-224 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-225 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-226 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-227 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-228 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-229 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-230 | OK | pointer into a replaced subsection | OK | §6.3 unchanged; §7.3 item 4's comparison rule unchanged |
| DETERMINISM-231 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-232 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-233 | OK | J pointer | OK | pointer unchanged; the J row has one index row and one rationale Part A row (script) |
| DETERMINISM-234 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-235 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-236 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-237 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-238 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-239 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-240 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-241 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-242 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-243 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-244 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-245 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-246 | OK | target in a replaced subsection | OK | §3.6 (5) unchanged |
| DETERMINISM-247 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-248 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-249 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-250 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-251 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-252 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-253 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-254 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-255 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-256 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-257 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-258 | OK | pointer into a replaced subsection | OK | §6.3 unchanged; §13.2's naming-input fixtures identical in content (re-wrapped by the scope repair; script) |
| DETERMINISM-259 | VDC-2 | target in a replaced subsection (§6.5 (9) changed) | OK | VDC-2 fixed: the setAttr / lock case is at §6.5 (9) (canon: SCOPE-208 → DETERMINISM-298); §13.2's B-EDIT list points to "§6.5 (9)'s truncation, naming and version-pinned cases" |
| DETERMINISM-260 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-261 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-262 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-263 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-264 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-265 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-266 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-267 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-268 | OK | pointer into a replaced subsection | OK | §6.4 unchanged; §2.9's pack set unchanged |
| DETERMINISM-269 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-270 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-271 | OK | J pointer | OK | pointer unchanged; the J row has one index row and one rationale Part A row (script) |
| DETERMINISM-272 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-273 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-274 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-275 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-276 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-277 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-278 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-279 | OK | target in a replaced subsection | OK | §3.2 (3) unchanged (the §3.2 hunk is a tag in item 6); pointer text unchanged |
| DETERMINISM-280 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-281 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-282 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-283 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-284 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff); the pointed-to sections' hunks leave the fact intact |
| DETERMINISM-285 | OK | target in a replaced subsection | OK | §3.2 (8) unchanged; pointer text unchanged |
| DETERMINISM-286 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-287 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-288 | OK | target in a replaced subsection | OK | §3.3 pool step 2 unchanged (step 1 receipts re-worded); pointer text unchanged |
| DETERMINISM-289 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff); the pointed-to sections' hunks leave the fact intact |
| DETERMINISM-290 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-291 | OK | changed text | OK | V-SCOPE-09 fixed: "pool sizes 0–3"; §13.2 and §13.3 agree (residual restatement, §6 O1) |
| DETERMINISM-292 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-293 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-294 | OK | target in a replaced subsection | OK | §13.2 op-order determinism unchanged |
| DETERMINISM-295 | OK | pointer in a replaced subsection | OK | pointer text unchanged (diff); target section not replaced |
| DETERMINISM-296 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-297 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-298 | VDC-2 | changed text | OK | VDC-2 / V-SCOPE-08 fixed: lock + unlock pair; freeing event re-draws by case (4), listed, confirmed, stored ("around": §6 O7) |
| DETERMINISM-299 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-300 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-301 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-302 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff); the pointed-to sections' hunks leave the fact intact |
| DETERMINISM-303 | OK | target in a replaced subsection | OK | §3.7 fallback and its shift-record stage list kept (paragraph re-wrapped, tag dropped); pointer text unchanged |
| DETERMINISM-304 | OK | J pointer in a replaced subsection | OK | pointer unchanged; the J row has one index row and one rationale Part A row (script) |
| DETERMINISM-305 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-306 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-307 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-308 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-309 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-310 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-311 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-312 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-313 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-314 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-315 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-316 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-317 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-318 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-319 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-320 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-321 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-322 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-323 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-324 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-325 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-326 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-327 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-328 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-329 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-330 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-331 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-332 | OK | target in a replaced subsection | OK | §4.11 `ConversionOp` kinds kept; `build.footprint` now `PolygonCm`, as §7.1's build event; pointer text unchanged |
| DETERMINISM-333 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-334 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-335 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-336 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-337 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-338 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-339 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-340 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-341 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-342 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-343 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-344 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-345 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-346 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-347 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-348 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-349 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-350 | OK | target in a replaced subsection | OK | §3.6 whole-step validation (≤ 8 halvings) kept (tag dropped); pointer text unchanged |
| DETERMINISM-351 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-352 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-353 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-354 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-355 | OK | target in a replaced subsection | OK | §9.5 measure tool unchanged (tag removal only); pointer text unchanged |
| DETERMINISM-356 | OK | J pointer in a replaced subsection | OK | pointer unchanged; the J row has one index row and one rationale Part A row (script) |
| DETERMINISM-357 | OK | pointer in a replaced subsection | OK | §7.1 Rotate row unchanged; §11.1 not replaced |
| DETERMINISM-358 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-359 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-360 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-361 | OK | J pointer in a replaced subsection | OK | pointer unchanged; the J row has one index row and one rationale Part A row (script) |
| DETERMINISM-362 | VDC-12 | changed text | OK | VDC-12 fixed: "places its `Bridge` by §4.2 S1 (5)'s rule for a drawn bridge" |
| DETERMINISM-363 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-364 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-365 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-366 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-367 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-368 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-369 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-370 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-371 | OK | home in a replaced subsection; cited by the changed §0.2 | OK | text unchanged; §0.2 row 5 now cites "§7.1 (the edit targets, clause by clause, …)", which matches |
| DETERMINISM-372 | VDC-16 | changed text | OK | VDC-16 fixed: "its completeness test is §13.2's (§2.8)"; §0.2 row 5 re-cited by scope (V-SCOPE-07); consistent |
| DETERMINISM-373 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-374 | OK | target in a replaced subsection | OK | §2.9 View state unchanged; pointer text unchanged |
| DETERMINISM-375 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-376 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-377 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-378 | VDC-4 | target changed by another part's repair | OK | VDC-4 fixed (rendering repair): §11.3 Logging "a host's own commands with `author: 'host'` (§7.1's `EditBase`)"; EditBase.author includes 'host' |
| DETERMINISM-379 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-380 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-381 | OK | target in a replaced subsection | OK | §3.6 held set unchanged (tag dropped); pointer text unchanged |
| DETERMINISM-382 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-383 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-384 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-385 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-386 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-387 | OK | J pointer in a replaced subsection | OK | pointer unchanged; the J row has one index row and one rationale Part A row (script) |
| DETERMINISM-388 | VDC-8 | changed text | OK | VDC-8 fixed: "against the samples their `DerivationRecord` holds (§2.8)" (DerivationRecord.fields) |
| DETERMINISM-389 | OK | changed text | OK | τ stated at §7.2; §2.5 now points here with the value beside it (V-MODEL-10's wording), values agree |
| DETERMINISM-390 | OK | target in a replaced subsection | OK | §4.5 Bands unchanged (the §4.5 hunk is the districts' faces); pointer text unchanged |
| DETERMINISM-391 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-392 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff); the pointed-to sections' hunks leave the fact intact |
| DETERMINISM-393 | OK | target in a replaced subsection | OK | §4.2 S1 (2) floor "sea level + 10 cm" unchanged (l. 2676); pointer text unchanged |
| DETERMINISM-394 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-395 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-396 | OK | J pointer in a replaced subsection | OK | pointer unchanged; the J row has one index row and one rationale Part A row (script) |
| DETERMINISM-397 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-398 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-399 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff); the pointed-to sections' hunks leave the fact intact |
| DETERMINISM-400 | OK | target in a replaced subsection | OK | §3.10 row and §3.3 kept-content rules present; pointer text unchanged |
| DETERMINISM-401 | OK | pointer in a replaced subsection | OK | pointer text unchanged (diff); target section not replaced |
| DETERMINISM-402 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-403 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-404 | OK | J pointer in a replaced subsection | OK | pointer unchanged; the J row has one index row and one rationale Part A row (script) |
| DETERMINISM-405 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-406 | OK | target in a replaced subsection | OK | §8.1 item 4 unchanged (the §8.1 hunk is a tag in item 5); pointer text unchanged |
| DETERMINISM-407 | VDC-11 | changed text | OK | VDC-11 (b) fixed: "the undo of an upgrade after a reload"; §12.6's list identical |
| DETERMINISM-408 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-409 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-410 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-411 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-412 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-413 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-414 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-415 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-416 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff); the pointed-to sections' hunks leave the fact intact |
| DETERMINISM-417 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-418 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-419 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-420 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-421 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-422 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-423 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-424 | OK | J pointer in a replaced subsection | OK | pointer unchanged; the J row has one index row and one rationale Part A row (script) |
| DETERMINISM-425 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-426 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-427 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff); the pointed-to sections' hunks leave the fact intact |
| DETERMINISM-428 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-429 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-430 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-431 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-432 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-433 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-434 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-435 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-436 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-437 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff); the pointed-to sections' hunks leave the fact intact |
| DETERMINISM-438 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-439 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-440 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff); the pointed-to sections' hunks leave the fact intact |
| DETERMINISM-441 | OK | target in a replaced subsection | OK | §2.2 rule 5 unchanged (the §2.2 hunk is rule 3); pointer text unchanged |
| DETERMINISM-442 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-443 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-444 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-445 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-446 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-447 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-448 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-449 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-450 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-451 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-452 | OK | J pointer in a replaced subsection | OK | pointer unchanged; the J row has one index row and one rationale Part A row (script) |
| DETERMINISM-453 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-454 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-455 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-456 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-457 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-458 | OK | pointer in a replaced subsection | OK | pointer text unchanged (diff); target section not replaced |
| DETERMINISM-459 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-460 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-461 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-462 | VDC-7 | changed text | VDR1-1 | V-MODEL-13 fixed (faces and `composition` role rows); VDC-7's row neighbour's wing rings not named |
| DETERMINISM-463 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-464 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-465 | OK | target in a replaced subsection | OK | §13.2 campaign unchanged; pointer text unchanged |
| DETERMINISM-466 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-467 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-468 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-469 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-470 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-471 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-472 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-473 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff); the pointed-to sections' hunks leave the fact intact |
| DETERMINISM-474 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-475 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-476 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-477 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-478 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-479 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-480 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-481 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-482 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-483 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-484 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-485 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-486 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-487 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-488 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-489 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-490 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-491 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-492 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-493 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-494 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-495 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-496 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-497 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-498 | OK | J pointer in a replaced subsection | OK | pointer unchanged; the J row has one index row and one rationale Part A row (script) |
| DETERMINISM-499 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-500 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-501 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-502 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-503 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-504 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-505 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-506 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-507 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff); the pointed-to sections' hunks leave the fact intact |
| DETERMINISM-508 | OK | target in a replaced subsection | OK | §2.9 retention unchanged; pointer text unchanged |
| DETERMINISM-509 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-510 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-511 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-512 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-513 | OK | J pointer in a replaced subsection | OK | pointer unchanged; the J row has one index row and one rationale Part A row (script) |
| DETERMINISM-514 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-515 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-516 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-517 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-518 | OK | pointer in a replaced subsection | OK | pointer text unchanged (diff); target section not replaced |
| DETERMINISM-519 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-520 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-521 | OK | target in a replaced subsection | OK | §8.10 unchanged (tag removal only); pointer text unchanged |
| DETERMINISM-522 | OK | target in a replaced subsection | OK | §13.2 warp fixtures kept (fountain, user-moved tree, pinned pin) and extended by the scope repair; consistent with §7.4; pointer text unchanged |
| DETERMINISM-523 | OK | J pointer in a replaced subsection | OK | pointer unchanged; the J row has one index row and one rationale Part A row (script) |
| DETERMINISM-524 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-525 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-526 | VDC-12 | changed text | OK | VDC-12 fixed: "a `Bridge` placed by §4.2 S1 (5)'s rule for a drawn bridge" |
| DETERMINISM-527 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-528 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-529 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-530 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-531 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-532 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-533 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-534 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-535 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-536 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-537 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-538 | OK | target in a replaced subsection | OK | §2.9 Size budget unchanged |
| DETERMINISM-539 | OK | J pointer | OK | pointer unchanged; the J row has one index row and one rationale Part A row (script) |
| DETERMINISM-540 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-541 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-542 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-543 | OK | J pointer | OK | pointer unchanged; the J row has one index row and one rationale Part A row (script) |
| DETERMINISM-544 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-545 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-546 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-547 | OK | target in a replaced subsection | OK | §2.9 pack set unchanged; pointer text unchanged |
| DETERMINISM-548 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-549 | OK | target in a replaced subsection | OK | §2.9 pack set unchanged; pointer text unchanged |
| DETERMINISM-550 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-551 | OK | target in a replaced subsection | OK | §2.9 pack set unchanged; pointer text unchanged |
| DETERMINISM-552 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-553 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-554 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-555 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-556 | OK | J pointer in a replaced subsection | OK | pointer unchanged; the J row has one index row and one rationale Part A row (script) |
| DETERMINISM-557 | OK | changed text | OK | P0-3 fixed: "an `insert` whose key already exists is an orphan too" (archive §10.4 l. 8389); §10.4 points here (§6 O8) |
| DETERMINISM-558 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-559 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-560 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-561 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-562 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-563 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-564 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-565 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-566 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-567 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-568 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-569 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-570 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-571 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-572 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-573 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-574 | OK | J pointer in a replaced subsection | OK | pointer unchanged; the J row has one index row and one rationale Part A row (script) |
| DETERMINISM-575 | VDC-9 | changed text | OK | VDC-9 / V-MODEL-06 / P0-5 fixed: "assignments and edits become `assign` and edit events at log positions 0…k" |
| DETERMINISM-576 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-577 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-578 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-579 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-580 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-581 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-582 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-583 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-584 | OK | J pointer in a replaced subsection | OK | pointer unchanged; the J row has one index row and one rationale Part A row (script) |
| DETERMINISM-585 | VDC-11 | changed text | OK | VDC-11 (c) fixed: "in §8.5's distinct preview style" (§8.5 l. 6002) |
| DETERMINISM-586 | OK | changed text | OK | line re-wrapped; values unchanged |
| DETERMINISM-587 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff); the pointed-to sections' hunks leave the fact intact |
| DETERMINISM-588 | OK | target in a replaced subsection | OK | §4.2 S0 unchanged; pointer text unchanged |
| DETERMINISM-589 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-590 | OK | pointer | OK | pointer unchanged; Delegated decisions not replaced |
| DETERMINISM-591 | OK | pointer in a replaced subsection | OK | pointer unchanged; Delegated decisions not replaced |
| DETERMINISM-592 | OK | pointer in a replaced subsection | OK | pointer unchanged; Delegated decisions not replaced |
| DETERMINISM-593 | OK | J pointer in a replaced subsection | OK | pointer unchanged; the J row has one index row and one rationale Part A row (script) |
| DETERMINISM-594 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-595 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-596 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-597 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-598 | OK | not touched | OK (r0) | keeps its r0 verdict (verify-determinism-r0.md §6) |
| DETERMINISM-599 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
| DETERMINISM-600 | OK | target in a replaced subsection | OK | §2.9 pack set unchanged |
| DETERMINISM-601 | OK | home in a replaced subsection | OK | text unchanged since r0 (diff) |
