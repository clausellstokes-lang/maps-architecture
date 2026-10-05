# M1 open findings — research-side draft

*Lane filler/m1-open-findings, 2026-10-05. RESEARCH-SIDE DRAFT under the filler rules of scope wf_2dccb46b-5d7. It lists the open findings and gate items M1 has to carry, each worded freshly by this seat, with its source path and line. It adds no design: the design is a reference, not a contract (J156), and every assignment below is a reading of the sources, open to the session's veto.*

**Two things to know before using it.**

1. **The doc checks have not been run with full authority.** `docs/validation/bench/doc_checks.py` needs the local reference corpus, which is not on this machine, so its authoritative run is still owed. This seat ran only the research-side hashed deny-list scan (`research/baselines/make_denylist.py scan`); its result is in the last section.
2. **This file is not in `plat/` yet.** Carrying it there is for the session to do after the M0 flow (run wf_8f7c7489-304) closes, and a `plat/CLEAN-ROOM.md` row has to be written at that time. Nothing under `plat/` was written by this lane.

## What was read, and how each item is classed

Read whole:

* `docs/validation/coherence/fix-list.md`. This is the fix list: the 62 open findings, the builders' valid choices, the held notes, the round-8 hand-offs and the item-113 table.
* `docs/IMPROVEMENTS.md` §5 (l. 1495–1594).
* `docs/build-prep/M1/scope.md`. Its 132 clauses are the M1 scope used here.
* Owner item 127 in `docs/AMENDMENTS-2026-09-28g.md` (l. 1416–1460).
* The M1 row of `docs/ARCHITECTURE.md` §16 (l. 21512).
* `docs/validation/m1-corrections-3.json`, for its open notes.

Two `plat/` files came from the **working copy**, because no git command was allowed: `plat/docs/build/M0.md` §6 (l. 1060–1079), where the M0 spec decides the twelve findings it touches, and `plat/docs/build/open-design-findings.md`. The earlier fix-all list (`docs/validation/fix-all/`, 299 items, 2026-09-25) and the red-team and coverage audits are **not** listed item by item. The reason is that HANDOFF l. 65 records the coherence pass closing them into `fix-list.md` ("Everything still open is in `docs/validation/coherence/fix-list.md`").

Each item gets one of three classes:

* **A — M1 carries it.** The part the finding concerns is built at M1, and its case can occur in an M1 town. The milestone is either assigned outright (the M0 spec's §6 names M1) or follows from scope.md.
* **B — M1 builds the site, but the case arrives later.** M1 builds the text, table or ladder the finding sits in, but the failing case needs something a later milestone lands (raised ways and carried ways at M3a, locks at M2a, and so on). M1 should take the corrected wording when it builds the site, so the later milestone does not have to reopen it. Any finding the M1 spec has to decide is marked "**decide**".
* **C — not M1.** Both the part and the case belong to a later milestone. These are counted here and not carried.

Milestones not named by a source are this seat's reading and are labelled PLAUSIBLE. Line numbers are from the working copies on 2026-10-05.

## 1 The milestone-1 gate list (`docs/IMPROVEMENTS.md` §5.1)

§16's M1 row cites this list ("the milestone-1 gate list of `docs/IMPROVEMENTS.md` §5.1", ARCHITECTURE.md l. 21512). The gate sentence is IMPROVEMENTS.md l. 1526–1528. All twelve items are open: no product code exists yet. The parenthesis on each row is the M1 cut, taken from §16.

| id | what M1 must show (own words) | M1 cut | source |
|---|---|---|---|
| O2 | One versioned recipe that regenerates the same town from the same inputs. Ids are stable and hierarchical, and sub-seeds are derived by hashing (with epoch sub-streams reserved). | whole item | docs/IMPROVEMENTS.md l. 1508 |
| O6 | Metres throughout, per-class distributions held in tables that carry provenance, the TOWN to METROPOLIS size ladder, a statistics record per run, plus grid, north pointer and bar scale. | unit lint and the core statistics record at M1 (scope.md cl. 25) | docs/IMPROVEMENTS.md l. 1509 |
| O3 | One robust geometry and topology kernel with typed results, bounded fallback ladders, checks after each stage, a generation report, and no whole-map restart. | whole item | docs/IMPROVEMENTS.md l. 1510 |
| O11 | One versioned schema and entity registry with complete containment and references by id, a native export that round-trips, and picture views. | schema, plus PNG and SVG only | docs/IMPROVEMENTS.md l. 1511 |
| O1 | Terrain and water come first: a heightfield in metres, queryable drainage, rivers that follow descent, typed water, one outline routine for coast, lake and island, and land that may have several components. | whole item (S1's coast, island, harbour and bank classes; scope.md cl. 28) | docs/IMPROVEMENTS.md l. 1512 |
| O4 | A two-tier street network: a staged backbone driven by destinations and cost, filled in by organic bent-cut streets. Ways are entities with a class and a metric width, and junction rules apply. | whole item | docs/IMPROVEMENTS.md l. 1513 |
| O5 | Plots typed in metres and laid frontage first, each with an access edge, corner and wedge rules, typed leftovers, and nothing discarded silently. | whole item (access 100 % on B-CITY-lite) | docs/IMPROVEMENTS.md l. 1514 |
| O18 | A prosperity field and one plot-granularity law covering joins, splits, institution claims, alleys and back lanes, with seams treated as fields. | a flat field only; the full law is at M2b (scope.md Discrepancies) | docs/IMPROVEMENTS.md l. 1515 |
| O17 | The plot model: a parcel with 0..n footprints and a typed yard, a site plan per plot, only footprints and yards drawn, and heights on every building. | basic: row, detached and hovel plans; compounds at M2b | docs/IMPROVEMENTS.md l. 1516 |
| O8 | Fortification as a network: a trace on defensible ground, gates where arterials cross, towers placed by rule, castle siting, several enceintes. | basic | docs/IMPROVEMENTS.md l. 1519 |
| O12 | One semantic display list with level of detail, retained rendering, style as data, and one renderer for both the screen and the exports. | the `ink` preset at the city and district bands | docs/IMPROVEMENTS.md l. 1520 |
| O16-core | The generation report reaches the UI and the API, the regenerate and new-seed actions are named plainly, the controls are honest, and there is no hidden state. | report and honest controls (named actions at M2a) | docs/IMPROVEMENTS.md l. 1522 |

The other five must-haves gate the base release, not M1 (IMPROVEMENTS.md l. 1527–1528): O7 (l. 1517), O19 (l. 1518), O9 (l. 1521), O13-core (l. 1523) and O14-core (l. 1524). §16 puts O9 at M2a and later. M1 does build parts of O7 and O13 (the roster rows and S13a names, scope.md cl. 11 and 36), but neither gates M1.

## 2 Fix-list findings M1 carries (class A)

| id | sev. | statement (own words) | why M1 | source |
|---|---|---|---|---|
| VAP-r6-03 | minor | The frozen dossier manifest's rule ("one row per derived fixture a volume names") can be read two ways. One harness registers every test-side mutation; another registers only the fixtures a spec looks up by id. | The M0 spec gives it to M1, where the dossier fixtures and their manifest live (M0.md l. 1076; scope.md cl. 46). | docs/validation/coherence/fix-list.md l. 70 |
| VCS-r6-05 | minor | `DossierFixtureRow` requires source-file fields on a derived row that has no file, and it has no id field. Harnesses would key `@pop×k` rows differently, so a V12 lookup fails under one keying. | The M0 spec gives it to M1 as the test-kit type (M0.md l. 1077). | fix-list.md l. 71 |
| VF7y-TST-03 | minor | F-SITE's merge rung and its twin-town test cell always expect a cross wall, but the laws can leave that wall out. F-BUDGET-STAGE's test cell names a sweep that holds none of the case it covers. | The M0 spec: F-SITE's nuclei rungs are M1's, and "the M1 build takes the corrected cells" (M0.md l. 1074; scope.md cl. 7). The leave-out case itself needs a raised way (M3a). | fix-list.md l. 52 |
| G127-pipeline-01 | major | Owner rule 127 is not applied in the stages. Any stage that builds a kind on the "Built by the town" list reads no switch, and it treats suppressed keys as filled. | **In part (decide).** Three listed kinds are built at M1: oases (S0–S1, scope.md cl. 47), the quay walls with their sea gates (cl. 114), and the harbour-mouth chain (S7 furniture; ARCHITECTURE.md l. 2280; PLAUSIBLE that M1 lands it). If M1 builds these kinds, the switch read (default on) and the no-suppression rule fall on M1's stages. | fix-list.md l. 39; AMENDMENTS-2026-09-28g.md l. 1428–1431 |
| G127-model-01 | major | Owner rule 127 is not applied in the model. §2.8 still has a removal that holds through regeneration, and §2.7's raised-way support step still states that removal. | **In part.** M1 builds §2.8's archive and tombstone store (scope.md cl. 132). The store should not take the reason-keyed suppression record that item 127 (c) replaces. The §2.7 half is M3a's. | fix-list.md l. 31; AMENDMENTS-2026-09-28g.md l. 1441–1446 |
| G127-V11-01 | major | Owner rule 127 is not applied in V11. There are no switch rows or defaults for the kinds the town builds by itself. | **In part (decide).** M1 authors V11's content and registers every calibratable column (scope.md cl. 36, 56). Rows for M1's listed kinds would land with them, each at its kind's current default. | fix-list.md l. 162 |

## 3 Fix-list findings where M1 builds the site and the case arrives later (class B)

| id | sev. | statement (own words) | what M1 should take | source |
|---|---|---|---|---|
| G127-determinism-01 | major | Item 127 is missing from §7.1's delete dry run, from §7.4's lifecycle rows, and from §7.6's and §7.8's switch rows. | **Decide.** M1 builds §7.6's presets and runs §7.8's control-continuity sweep (scope.md cl. 41, 78). The M0 spec placed the item at M2a / M3a (M0.md l. 1078). If M1 ships no switch, record that as a staging choice. | fix-list.md l. 47 |
| G127-scope-01 | major | §13.2 lacks item 127 (e)'s bars. | **Decide.** The bar that every default row is byte-identical to the base can run as soon as any switch exists. The rest come with the edits (M0.md l. 1079). | fix-list.md l. 69 |
| G127-V12-01 | major | V12 has no bars for item 127 (e). | **Decide.** V12 W2's register lands at M1 (scope.md cl. 52). The bars' specs follow wherever the switch lands. | fix-list.md l. 171 |
| VF7y-GEN-01 | major | When S3 (6)'s cross wall or S3 (8)'s castle meets the ground course of a carried way standing before the stage, no gate, re-route or exclusion is given, so two builds diverge. | M1 builds S3 (6)/(8) and polycentric forms (scope.md cl. 7). Writing the carried-way clause and the castle filter in at that time is cheap. A carried way exists only from M3a. | fix-list.md l. 40 |
| VF7y-GEN-03 | minor | The three lists of law 2 (c)'s generation outcomes (the F-WALL ladder, §4.13's wall cell, `W_RAISED_MEETING`) each miss one of the two wall cases. | M1 builds the later F-WALL rungs (scope.md cl. 113). The raised-way rung and the warning are M3a's (M0.md l. 1068). | fix-list.md l. 49 |
| VRC6T-03 | major | `StyleSheet.groups` specifies shadow, surface, hit, picture and preset outcomes that no bar runs. | M1 builds the style sheet for `ink` (scope.md cl. 12). Its bar (T-ER-30) is due "from the milestone that lands V01 §5.1.3's group switches" (PLAUSIBLE: M5). | fix-list.md l. 62 |
| VF7y-RDR-01 | major | V11 rows 13 and 14 (the wall tables) do not list S4, S5b and S6 among their readers. Those stages read the wall section before S7 builds it, so T-V11-1 (b) fails a correct build. | M1 authors V11's rows and runs T-V11-1-class registry bars (scope.md cl. 56; PLAUSIBLE that rows 13–14 are M1's). The failing read needs a generated aqueduct on a walled golden (M3a). | fix-list.md l. 163 |

## 4 Held notes inside M1's scope (ungraded; recorded for "the next full round")

The family checks raised these outside their own family, so none of them is graded. Each touches a part M1 builds. The class is this seat's reading.

| note | class | statement (own words) | source |
|---|---|---|---|
| r7y gen: castle filter | A | S3 (8)'s hard filter keeps only the (5) routes off a castle claim. At a stage citadel, S4's and S5b's arterials can be crossed, and so can declared roads, though declared roads arrive at M3a. | fix-list.md l. 216 |
| r7v 1: F-WALL re-offset | A | F-WALL's non-raised rung re-offsets the trace at a larger radius. That can move stage 1's trace more than 40 m from its boundary, and neither S3 (9)'s Test nor §5.3's distance row excepts that move. | fix-list.md l. 240–242 (re-held l. 218, 319, 359–361) |
| r7v 2: gate route re-crossing | A | Each gate is a route's first point on `T = t_1`, but nothing says a (5) route crosses that line only once. A second crossing would meet the trace with no gate. | fix-list.md l. 243–245 (re-held l. 218) |
| r7y readers: report panel | A | V09's report panel has no catalogue rows for a stage's non-kernel warning codes, so warnings such as walled-by-barriers or a dry moat are shown nowhere. The panel and T-V9-15 are M1's (scope.md cl. 19, 37). | fix-list.md l. 227 |
| r7y readers: lettered slots | A | §8.2's `OrderSlot.slot` is a number, but the order table has lettered rows (8b, 9b, 13b, 15b, 19a, 19b), and no numeric form is given for them. | fix-list.md l. 226 (also l. 335–336, 380–381) |
| r7y readers: derived-pass slot | B | Slot resolution refuses a sheet that puts one derived kind in two slots of a band, yet slot 19a draws deck shadows in a derived pass with no kind named. The rule is M1's; decks are M3a's. | fix-list.md l. 225 |
| r7y gen/tests: cross wall vs earlier ground way | B | The cross wall gets a gate only where the inter-nucleus route crosses it. A ground road laid before it that crosses the partition line has no gate rule. Such roads are declared (M3a) or kept (M2a). | fix-list.md l. 215, 234 |
| r7v 3: raised stretch over a canal | C | S3 (5) prices a raised stretch over a canal, and S4 may drop it, which leaves a gate route without its crossing. Raised ways are M3a's. | fix-list.md l. 246–248 |

## 5 Builders' valid choices touching M1

| id | class | statement (own words) | source |
|---|---|---|---|
| VF7v-GEN-05 | B (PLAUSIBLE) | When no route crosses `T = t_1` lawfully, the design allows two builds: F-ROUTE's last rung over lawful first points, or the pick redrawn as a closed arc and then dropped. M1 builds the rest of F-ROUTE (scope.md cl. 113). "Lawfully" reads §2.7's raised-way laws, so the case is M3a's. The M1 builder records whichever build it picks. | fix-list.md l. 189 |

The other listed choices (VF7-GEN-05, VF7-GEN-06, VF7-RDR-07, VF7v-TBL-04, VF7v-TBL-05, VF7v-EPO-06, VF7v-RDR-05, VF7x-TBL-05, VF7x-GEN-06; l. 178–202) are raised-way × wall choices for M3a or later: class C.

## 6 Not M1 (class C), counted

There are 49 fix-list findings in class C. Their milestones come from the M0 spec's §6 where it names one, and are otherwise PLAUSIBLE:

* **Raised-way × wall family, hand edits and their bars (M3a and later):** VF7y-TBL-01 (l. 32), VF7y-TBL-02 (l. 33), VF7y-GEN-02 (l. 41), VF7y-HND-01 (l. 50), VF7y-HND-02 (l. 51), VF7y-GEN-04 (l. 72), VF7y-HND-03 (l. 73), VF7y-TST-01 (l. 74), VF7y-TST-02 (l. 75; its own text places items at M3a, V-M3 and E3).
* **The port's absorb half (M3a):** VAH-r6-03 (l. 48).
* **Export annotations, entity anchors, looks, viewer presets (M3a / M3b and the volumes):** VAT-r5-02 (l. 58), VAT-r6-01 (l. 59), VRC6T-01 (l. 60), VRC6T-02 (l. 61), VRC6T-04 (l. 63).
* **Volumes past M1:** these are 34 findings. V01 (l. 81–83), V02 (l. 89), V03 (l. 95–96), V04 (l. 102–104), V05 (l. 110–111), V06 (l. 117–119), V07 (l. 125–127), V08 (l. 133–137), V09 (l. 143–147: the advanced panel, the context card, the Dress panel and hand bends, none of them in AP1's list in scope.md cl. 37), V10 (l. 153–156), V11's VF7y-RDR-04 and VV1112-r6-03 (l. 164–165), and V12's VV1112-r6-01 (l. 172).

The two round-8 hand-offs (locks: l. 206–207) are M2a's or later. The item-113 table (OQ113-01 … -07, l. 401–407) is resolved at E9, U3 and M-SF (l. 397).

**Tally.** 62 findings: 6 in class A (3 of them in part), 7 in class B (4 of them "decide"), and 49 in class C. On top of those, five held notes are A and two are B, and one valid choice is B.

## 7 Open notes next to the fix list (`docs/validation/`)

These come from M-1's design corrections and are not findings in the fix list. They touch M1:

| ref | statement (own words) | M1 relevance | source |
|---|---|---|---|
| m1c3 owner note 1 | DC-41 (the scope sentence of the deny-list scanner) is in the design but depends on the owner's D13. A veto would bring the earlier wording back, and the session would then replace N-26. | Decides what M1's PR-tier deny-list scan covers (scope.md cl. 121). | docs/validation/m1-corrections-3.json l. 90 |
| m1c3 owner note 2 | The re-measured tower-spacing medians of one reference (34.9 / 33.4 / 32.7 m) fall just below our own 35–60 m rule. Re-anchoring the rule was left alone as tuning (J156). | M1 builds S7's towers (scope.md cl. 9). Whoever owns that band should know about it. | m1-corrections-3.json l. 91 |
| m1c3 carry row 2 | C-0092 (2) restricts M0's note check to numbers, units, our ids and provenance forms. Notes already carry words and markers, so a literal reading would refuse them. | The full `CrossingRecord` and the band-rule checks are M1's (scope.md cl. 54); the session should confirm this before the first crossing. | m1-corrections-3.json l. 87 |

## 8 Calls made here (vetoable)

1. The fix list is the only enumerated validation source. The older fix-all and audit lists are treated as closed into it, as HANDOFF l. 65 records.
2. The §5.1 must-haves are counted as open M1 items even though they are gates, not defects. The task names §5.1.
3. A finding counts as M1 (class A) only if its case can occur in an M1 town. Where M1 only builds the site, it goes to class B, so that the correction is applied at that time without the finding being charged to M1.
4. On item 127, this draft differs from the M0 spec. The M0 spec placed it at M2a / M3a (M0.md l. 1078). This draft reads the rule's kind list (oases, quay walls, harbour-mouth chain) as M1 stage work, and marks it **decide** instead of assigning it outright.

## 9 Checks run

The checks run by this seat are recorded below the line that follows. Their results are added after the file is written.

---

* The hashed deny-list scan was run as `python3 research/baselines/make_denylist.py scan --list research` and again with `--list m0`, using the default allow rows, on 2026-10-05. Both runs finished with 0 TOK, 0 ID, 0 COL, 0 SET, 0 PHR and 0 FILE hits. Each found 3 TRI hits, and all 3 are reviewed rows, so the count of unreviewed hits is 0. The first run found seven 3-gram runs that coincided with the corpus. Each was reworded in this file, and none was added to an allow file.
* `doc_checks.py` was **not run**, because the local corpus it reads (`research/findings/`, `captures/`) is not here. Its authoritative run is still owed before this draft is carried into `plat/`.
* The tallies were counted by hand against the fix list's own total of 62 (fix-list.md l. 3). The finding ids and line numbers were taken from a `grep -n` of the fix list, so each line number is the row's actual line.
