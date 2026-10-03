# Verify — coherence pass, round 0: volumes V11 (content) and V12 (calibration)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-vol-V11-V12-r0s; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-vol-V11-V12-r0s`, 2026-09-30 – 2026-10-01, cloud checkout; scratch `scratchpad/coherence/v1112/`)
- P0 resume check (no LANDED line, no output): fresh start — done
- P1 inputs read (brief whole; inventory-vol-V11-V12; rewrite-V11, rewrite-V12; canon units V11, V12; dated rulings g 111–119, J121, J122) — done
- P2 live text against the rewrite outputs (assembler's changes) — done (V12 byte-identical to `new/volumes/`; V11 differs by 8 G-cite range prefixes only)
- P3 every inventory id token-checked at its mapped home; flagged ids read by hand — done (1 050 ids: V11 647, V12 403)
- P4 every changed paragraph of the body (archive → live word diff, per section) read — done (both volumes, the removed ledgers and records, every new section)
- P5 canon rulings routed here (conflicts, elegance equivalence lists, wiring gaps, id rulings, glossary) — done
- P6 g items (111–119 and the dated rulings) and f items concerning each volume — done
- P7 edges (V11 §3.26; V12 §3.16 against rewrite-V12's EDGES MAP) — done
- P8 cross-part notes addressed to V11/V12 in the other rewrite reports — done
- P9 cohesion, ids, references, terms, deferral, doc_checks — done
- P10 this report, the result file, LANDED — done

## Outcome

**Not clean: 19 issues — 1 blocker, 4 major, 14 minor** (owners: V11 11, V12 8). The rewrite of both volumes is
otherwise faithful: every inventory id survives at its mapped home or at a ruled home, every conflict ruling routed here is
applied, the elegance equivalence lists hold item by item, and every owner part routed by the dated rulings (g 111–119) is
present at build depth.

| measure | V11 | V12 |
|---|---|---|
| words, archive → live | 106 185 → 101 965 (−4.0 %) | 76 414 → 69 784 (−8.7 %) |
| inventory ids checked | 647 | 403 |
| live text vs rewrite output | 8 assembler G-cite prefixes, nothing else | byte-identical |
| own ids (defined; unique; gaps) | T-V11-0–45, J-V11.1–111, W1–W86, X-V11-1–17, BCR-V11-1–31, registry rows 1–106 + 58a: unique, no gaps | T-V12-1–51, J-V12.1–96, X-V12-1–19, BCR-V12-1–22: unique, no gaps |
| issues | 11 (0 blocker, 2 major, 9 minor) | 8 (1 blocker, 2 major, 5 minor) |

The blocker: V12's `D5PairStaged` (the FM, VG, DW, AB and SOLO pair variants of the panel engine) is declared nowhere —
V12 now cites file f item 500 and the base, whose §13.6 points back to V12 §2.8 (VV1112-11). The majors: V11 §4.1 newly
refuses a user's edit of any owner-stamped cell (VV1112-04); item 119's slower-step record is V11's `perf.qualitySpend`
while V12's measured-gain bar reads only §12.10 (VV1112-06); V08's "specified" test reads a grand-class mark V11's
ceiling table does not have (VV1112-09); V12's deep-void definition was cut while V04 still cites it (VV1112-13).

## Issues

| id | severity | kind | owner | where (short) |
|---|---|---|---|---|
| VV1112-11 | blocker | NUANCE-LOST | V12 | D5PairStaged five variants declared nowhere (V12 §2.8 ↔ base §13.6) |
| VV1112-04 | major | CHANGED | V11 | V11 §4.1 now refuses a user edit of any stamped cell |
| VV1112-06 | major | CONFLICT | V12 | item 119 slower-step record: V11 row 106 vs V12 §3.15.9 (4) reading §12.10 only |
| VV1112-09 | major | WIRING | V11 | V08 reads "classes the ceiling table marks grand"; no such cell in V11 |
| VV1112-13 | major | LOST | V12 | deep-void definition cut from V12 §3.4.2 |
| VV1112-01 | minor | BROKEN-REFERENCE | V11 | V11 §1b W76 hook cites file f item 280 for `@plat/tables` (is 505) |
| VV1112-02 | minor | CONFLICT | V11 | V11 W78, §2.10, row 80, §2.8c name file f item 559 for the span rule (is 244; values V11 §3.24.2) |
| VV1112-03 | minor | NEW-PROBLEM | V11 | V11 body carries ~38 canon finding/conflict ids as provenance |
| VV1112-05 | minor | BROKEN-REFERENCE | V11 | V11 §10c CVR-V10-6 closed at V11 §2.3 (family union is §2.4) |
| VV1112-07 | minor | BROKEN-REFERENCE | V12 | V12 §3.11 span line and X-V12-19 place span values in §2.7 and use `raised.vaultShare` |
| VV1112-08 | minor | TERM | V11 | V11 §2.8c and X-V11-10 keep `raised.vaultShare` |
| VV1112-10 | minor | BROKEN-REFERENCE | V11 | V11 C0 row and J-V11.96 bare §3.2 / §2.1 read as base |
| VV1112-12 | minor | BROKEN-REFERENCE | V11 | raised-way calibration minima missing from V11 §3.24.2 (their canon home) |
| VV1112-14 | minor | CONFLICT | V12 | V12 §2.13 pins 111/113/114 read bar words, not V11 §3.24.0 off forms |
| VV1112-15 | minor | LOST | V12 | V12 §12 PLAUSIBLE list drops seven open assumptions |
| VV1112-16 | minor | CONFLICT | V11 | V12 says ceiling and festival tables are non-calibratable by V11; V11 does not mark them |
| VV1112-17 | minor | WIRING | V12 | V12 §3.15 does not name V09 screen bars T-V9-71 – T-V9-79 (V09 note 11) |
| VV1112-18 | minor | WIRING | V12 | V12 §2.13 item115 pin lacks V06 suite; X-V12-15 lacks bar.T-V6-72 (V06 note) |
| VV1112-19 | minor | TERM | V11 | V11 keeps "M4-110's panel" (G-panelgroup) |

### VV1112-11 — blocker — NUANCE-LOST — owner V12

**Claim.** The five staged `D5Pair` variants' fields are now declared nowhere. The archived V12 §2.8 declared them: { reference: 'FM'; i; refCapture; platSeed; cls } (V02 §7.5); { reference: 'VG'; rung: 'THORP'|'HAMLET'|'VILLAGE'; tags; i; refSeed; platSeed } (V07 §3, §8); { reference: 'DW'; i; refCapture; platSeed; cls; band } (V03 §8 P6); { reference: 'AB'; purpose: 'reconcile'|'history'; rung; water: WaterSetting; i; platSeed; a; b /* each a recipe: output version, preset, and the layer or epoch it differs by */ } (V12 §3.10.6; V06 §12); { reference: 'SOLO'; rung; i; platSeed; recipe /* output version, preset, mode */ } (V04 §7). The rewrite cut them as a restatement of item 500 (rewrite-V12 §1: "item 500's `D5Pair` variants"), leaving V12 l. 682 "§13.6's D5Pair carries five variants (item 500): FM, VG, DW, AB ('reconcile' | 'history') and SOLO"; but file f item 500 has no text of its own ("BCR-V12-6 — the panel engine") and base §13.6 l. 16596 writes `| D5PairStaged; // the five variants … : V12 §2.8`, pointing back. `D5PairStaged` is declared in no file and `refCapture`, `refSeed`'s VG form, `cls`, `band`, `purpose`, `a`, `b` and `recipe` appear nowhere in the set, so the panel engine's seed files for the FM, VG, Dwellings, before-and-after and SOLO panels cannot be built from the text (record fields dropped by a shrink cut).

**Required change.** In V12 §2.8 replace the comment at l. 682 by the declaration the base points to: `type D5PairStaged = { reference: 'FM'; i: number; refCapture: string; platSeed: string; cls: string } /* V02 §7.5 */ | { reference: 'VG'; rung: 'THORP'|'HAMLET'|'VILLAGE'; tags: string; i: number; refSeed: string; platSeed: string } /* V07 §8 */ | { reference: 'DW'; i: number; refCapture: string; platSeed: string; cls: string; band: string } /* V03 §8, V3-P6 */ | { reference: 'AB'; purpose: 'reconcile' | 'history'; rung: Rung; water: WaterSetting; i: number; platSeed: string; a: string; b: string /* each a recipe: output version, preset, and the layer or epoch it differs by */ } /* V12 §3.10.6; V06 §12 */ | { reference: 'SOLO'; rung: Rung; i: number; platSeed: string; recipe: string /* output version, preset, mode */ } /* V04 §7 */` — §13.6's `D5Pair` union naming it (item 500).

### VV1112-04 — major — CHANGED — owner V11

**Claim.** V11 §4.1's one statement of the edit rule now reads "only a dangling `ref`, a type error or an owner rule is refused, F-EDIT (§5.2), naming the rule — the owner rules a table edit can meet are item 110 (b)'s rung gate (a `raisedWays` row below CITY …) and a stamped cell (V11 §3.2.1 step 4: its owner-rule value)". The archive read "the one owner rule a table edit can meet is item 110 (b)'s rung gate", and the archived IN-V11-1, folded into V11 §3.2.1 step 4, still says "A stamped cell binds calibration runs, fallbacks and corpus packs (§7.6; V12 §3.7.2 (5)), never a pin, a parity preset's zero or a user's edit" (base §7.6 likewise: a stamp is what no calibration run, fallback or corpus layer may cross; V09's tables editor previews and applies any cell edit). The added clause makes every stamped cell — the catacomb TOWN gate and cemetery-only sources, the cathedral's `always` crypt, the underground's any-tier existence, the raised-way calibration minima 0.02 and 1, and item 115 (b)'s THORP/HAMLET/VILLAGE ceiling rows — refuse a user's table edit, a behaviour change no f item, canon ruling or decision row makes, and it contradicts step 4 in the same volume.

**Required change.** In V11 §4.1 restore "the one owner rule a table edit can meet is item 110 (b)'s rung gate (a `raisedWays` row below CITY), refused with the alternative \"declare the raised way\"" and delete "and a stamped cell (V11 §3.2.1 step 4: its owner-rule value)"; add "a stamped cell is edited like any cell — its stamp binds calibration runs, fallbacks and corpus packs, never a user's edit (V11 §3.2.1 step 4)".

### VV1112-06 — major — CONFLICT — owner V12

**Claim.** Item 119 (b)'s record of a step slower than its target (the step, its cost, its gain) has two homes that do not meet. V11 §3.25.8 and §2.8d make it `perf.qualitySpend` (registry row 106: stage, use, targetMs, extraMs, gainBar, gain, run; "the stage runs its quality path only while its row stands"), and row 106 lists "testkit.bench (§12's budget accounting, V12's bars)" among its readers, as the canon's pipeline routing for item 119 asks ("each use a table cell with its measured gain"). V12 §3.15.9 (4), its §3.12 failure row (l. 2210: "a slower-than-target step with no measured gain … the owning path takes its §12.10 row's change"), J-V12.92 and T-V12-50 read only "§12.10's rows that declare a step slower than its target" and never name `perf.qualitySpend`. So the measured-gain bar checks a different record from the one that gates the stage, V11's declared reader is a one-ended hook (principle (7)), and the one fact has two records (principles (1), (10)).

**Required change.** In V12 §3.15.9 (4) read the slower-step records from V11 §3.25.8's `perf.qualitySpend` rows (registry row 106) — each row's `gainBar`, `gain` and `run` checked against the release's runs, a stage that runs above its §12 target with no row failing — with §12.10's row for that step citing the V11 row; say the same in the §3.12 failure row, J-V12.92 and T-V12-50, so the bar reads the record that gates the stage.

### VV1112-09 — major — WIRING — owner V11

**Claim.** V08 §3.16 (3) decides when a dossier SPECIFIES a grand building under item 115's ceiling by "a dossier-bound record whose class … is one the ceiling table marks grand (a manor, a hall, a keep or a palace class)" (also V08 §1b W63: "the dossier-backed assignments whose class the ceiling table marks grand"), and rewrite-V08's cross-part note 6 asks V11 for "the ceiling table's grand classes (item 115)". V11's ceiling table (V11 §2.8d `GrandeurCeilingRow`, V11 §3.25.4, registry row 97) has no cell that marks any class grand — only dwelling families, the tower/turret/gatehouse/court flags and the manor's count and requirement — and row 97's readers do not list the port. V08's test reads a field no unit writes (a dangling input), and the port's read would fail T-V11-1 (b) as an unlisted reader.

**Required change.** Give the `grandeur.ceiling` table a named row `settings` with `grandClasses: string[]` — the classes whose dossier record specifies a grand building: `manor`, `tower_house`, `castle`, `palace` and V07's `v.manor_house` (`own`, `calibratable: false`) — declared in V11 §2.8d and listed in V11 §3.25.4 with V08 §3.16 (3) as its reader; add "port.digest (V08 §3.16 (3)'s 'specified' test)" to registry row 97's readers; extend T-V11-41 (a) to check every `grandClasses` entry is a live class key.

### VV1112-13 — major — LOST — owner V12

**Claim.** V12 owns the deep-void metric (`voidSealedDeep`, item 109 (j) (5)'s floor), but its definition of a deep void was cut. The archived V12 §3.4.2 `void.*` row read "per deep void (a connected component of a system's parts whose tops lie deeper than `DigRule.reachM` below every footprint over them): whether an access reaches it"; the live row (l. 1120) reads only "per deep void: whether an access reaches it", and V12 §3.6b's floor (l. 1366) keeps only "deep voids (connected components …)". V04's T-V4-54 now cites "V12's connected components, at most three per town, deeper than `dig.reachM` below every footprint over them" — a reference to a V12 definition V12 no longer states (the depth test lives only in V04's test row, restated), and V11 §3.23.7 says only "voids deeper than `reachM`". The harness that computes the metric is specified without the rule that decides which components count (measured from every footprint over the component, so a void shallow under one building is not deep).

**Required change.** In V12 §3.4.2's `void.*`, `link.*`, `ladder.members` row restore "per deep void (a connected component of a system's parts whose tops lie deeper than `DigRule.reachM` below every footprint over them): whether an access reaches it" (V04's T-V4-54 then cites it).

### VV1112-01 — minor — BROKEN-REFERENCE — owner V11

**Claim.** V11 §1b W76's base-hook cell reads "§14 `@plat/tables` (file f item 280)". The archive cited V01's BCR-1 there; file f item 280 is V01 BCR-3 (the stage graph's S7c and S9b), while V01 BCR-1's `@plat/tables` extension (with `squares.quota`) is applied by file f item 505 (the package list). The pointer names the wrong applied item.

**Required change.** In V11 §1b W76's base-hook cell replace "§14 `@plat/tables` (file f item 280)" by "§14 `@plat/tables` (file f item 505)".

### VV1112-02 — minor — CONFLICT — owner V11

**Claim.** The span rule's source is stated two ways inside V11. V11 §3.24.2 ("The span rule's constants (file f item 244; J-V4.93) … Their values, stated here once … written into this row's source by the seat landing item 244's span rule at M3a"), J-V11.96 and J-V11.97 home the constants in file f item 244 with their values in V11 §3.24.2. Four other places name file f item 559 instead: §1b W78 ("file f items 559, 244 and 245's values, written by the seat landing item 559 at M3a"), §2.10's pattern-exception row ("written with file f item 559 by the seat landing it at M3a with C3b"), §3.1 row 80's source cell ("the `span` values file f item 559") and §2.8c's `span` comment ("file f item 559's span rule"). File f item 559 is only V04 BCR-45's Vaults/cistern sentence and is STAGED (M6-U), so these four places point at the wrong item, give a staged item as an M3a landing, and row 80 places the values in f instead of V11 §3.24.2 (J-V11.97). The archive read "V04 BCR-45" at each; the rewrite mapped BCR-45 to 559 here and to 244 in §3.24.2 and §8.

**Required change.** In V11 §1b W78's produced-by cell write "the values of V11 §3.24.2 (the span rule of file f item 244; item 245's snap), written by the seat landing item 244 at M3a" (keep the hook cell's "II.7.6's vaults (file f item 559)", which is right); in §2.10's exception row write "written with file f item 244's span rule by the seat landing it at M3a with C3b"; in §3.1 row 80's source cell write "V11 §3.24.2 (the `span` values; the rule file f item 244)"; in §2.8c's `span` comment write "file f item 244's span rule (J-V11.96)".

### VV1112-03 — minor — NEW-PROBLEM — owner V11

**Claim.** The rewrite put canon finding and conflict ids into V11's normative text as provenance of how a sentence arrived — about 38 occurrences: W-SET-01 (V11 §1 (a), §1b W79, §3.1 row 92, J-V11.102, J-V11.106), V11-WGAP-1 (W19, row 50), V08-XCONF-9 (W19, V11 §3.19.2), V12-XCONF-4 (W37, V11 §2.3's unit comment), MC-11 (V11 §2.1), V11-RESTATE-2 (V11 §2.2), V12-XCONF-2 (V11 §2.2, §3.2.1 step 7), V11-EDGE-2 (V11 §2.3's comment), V11-DUP-2 (V11 §2.3), V11-RESTATE-3 (§2.10), V11-ICONF-1 (V11 §3.1 *Readers*, J-V11.109), V11-XCONF-2 (row 87), DXC-05 (row 92, J-V11.106), V11-ICONF-6 (V11 §3.1), RIC-01 (display cells), V11-MISSING-6 (step 7), V11-RESTATE-4 (V11 §3.2.6), V11-RESTATE-7 (V11 §3.5.1), V11-MISSING-5 (V11 §3.5.1), V11-ICONF-7 (V11 §3.12), V11-ICONF-3 (V11 §3.13.3), V11-XCONF-3 and V11-XCONF-1 (V11 §3.24.1), V11-DUP-3 (V11 §4.1), V09-XAGREE-1 (V11 §4.2), V11-ICONF-4 (V11 §6), V11-XCONF-4 (V11 §8), V11-ICONF-5 (J-V11.8), V11-DEFER-3 (J-V11.28), V11-EDGE-1 (J-V11.108). Principle (5) removes narration and the canon's own rulings on the same pattern (V05-NARR-6, V06-NARR-5, V12-NARR-5: seam, critique and finding ids in normative text are provenance of how a sentence arrived; the J rows keep the reasoned decision) apply; V12's rewrite carries none. (The `EI-V11-EDGE-n` keys of V11 §3.26's edge rows are row ids and are not in this list.)

**Required change.** Delete each canon finding or conflict id listed from V11's text (keep the sentence, its section pointers and any J-V11 id; where the id was the only citation, cite the J-V11 row that records the decision, e.g. row 92 and W79 cite J-V11.106, V11 §3.1 *Readers* cites J-V11.109).

### VV1112-05 — minor — BROKEN-REFERENCE — owner V11

**Claim.** V11 §10c's row for V10 CVR-V10-6 closes it at "V11 §2.3 (the family union: `nuisance`, `sun` …), V11 §3.3.5", but the family union is `RelationFamilyRow.family` in V11 §2.4 ('nuisance'|'need'|…|'sun'); V11 §2.3 declares the siting profile and the class columns, not the families. V10 itself cites "V11 §2.4's eight families" (V10 `WhyFamily`, the `weights` cell). The closure pointer names the wrong section.

**Required change.** In V11 §10c's CVR-V10-6 row write "V11 §2.4 (the family union: `nuisance`, `sun` …), V11 §3.3.5".

### VV1112-07 — minor — BROKEN-REFERENCE — owner V12

**Claim.** V12 §3.11's span-rule register line reads "the cells `raisedWays.structure.span` (row 80; V11 §3.24.2's name map; their values in §2.7, item 244, from V04's request BCR-V4-45): `vaultShare` by kind (V04's `raised.vaultShare`, …)". After the rewrite the values are stated once in V11 §3.24.2 (J-V11.97: "the base names the cells without values (§2.7)"; base §2.7 l. 2325 cites `span.vaultShare[kind]` with no value), and V04 now names the cell `span.vaultShare` (rewrite-V04's cross-part note 11; no unit but V11's name map writes `raised.vaultShare`). The line points at a home that holds no value and names the cell by a key its owner no longer uses. The same pointer recurs in V12 §10.2's X-V12-19 row: "V04's span row (J-V4.118) names the cells `raisedWays.structure.span.*` (values in §2.7, item 244)".

**Required change.** In V12 §3.11's span-rule line write "(row 80; their values V11 §3.24.2, J-V11.97; the rule §2.7, file f item 244, from V04's request BCR-V4-45): `vaultShare` by kind (`span.vaultShare`, scaled by the era and culture `raisedVaultM`)". In V12 §10.2's X-V12-19 row write "(values V11 §3.24.2; the rule §2.7, file f item 244)" in place of "(values in §2.7, item 244)".

### VV1112-08 — minor — TERM — owner V11

**Claim.** V04 and the base now name the span cells `span.vaultShare`, `span.vaultCap`, `span.supportFoundationCm` (rewrite-V04's cross-part note 11 asks V11's comments to read the `span.*` names), yet V11 §2.8c's `vaultShare` comment still glosses the cell as "(`raised.vaultShare`)" and V11 §10b's X-V11-10 row reads "`raised.vaultShare` scaled by …". Outside V11 §3.24.2's name map (kept for T-V11-1 (a)'s scan of file f item 244's original words) no unit writes the `raised.*` keys, so these two places keep a second name for one cell (principle (2)).

**Required change.** In V11 §2.8c's `RaisedWayStructure.span.vaultShare` comment replace "(`raised.vaultShare`)" by "(`span.vaultShare`)", and in V11 §10b's X-V11-10 row write "`span.vaultShare` scaled by `era.raisedVaultM × culture.raisedVaultM`".

### VV1112-10 — minor — BROKEN-REFERENCE — owner V11

**Claim.** Two bare section pointers in V11 continue a V11 list but, under the set's citation rule (a bare `§x` is the base's; the assembler's ambiguous-form list asks the verifier to confirm or prefix), resolve to base sections that do not state the fact: V11 §8's C0 row "V11 §2.1–§2.2, §3.2" means V11 §3.2 (the compiler) but reads as base §3.2 (the numeric policy); J-V11.96's "which V01's `hood.constants` and this finding cite and §2.1 had not stated" means V11 §2.1 (the settings form) but reads as base §2.1 (layers, units). The other seven V11 entries of the list (l. 755, 932, 937, 4466, 4880, 4885) read correctly as the base or the named volume.

**Required change.** In V11 §8's C0 row write "V11 §2.1–V11 §2.2, V11 §3.2"; in J-V11.96 write "… and V11 §2.1 had not stated".

### VV1112-12 — minor — BROKEN-REFERENCE — owner V11

**Claim.** The raised ways' owner-stamped calibration minima (chance 0.02, cap 1 on the CITY and METROPOLIS `raisedWays` rows; J-VI.10) are stated only in V11 §3.2.1 step 4's stamp list. The canon's V12-RESTATE-2 / RESTATEMENTS-012 ruling homes them in "V11 §3.24.2's raisedWays table (ColumnSpec stamp)", and V12 §2.10 ("V11 §3.24.2 states their values") and V11's own Integration-notes map (J-VI.10 → "V11 §3.2.1 step 4; V11 §3.24.2") point there, but §3.24.2's `raisedWays` table and its bullets carry no minimum.

**Required change.** In V11 §3.24.2, after the `raisedWays` table, add: "The CITY and METROPOLIS `chance` columns carry the owner-stamped calibration minimum 0.02 and the cap columns 1 (`ownerRule: '110 (b)'`, J-VI.10; stamped at V11 §3.2.1 step 4): no calibration run, fallback or corpus pack sets one lower (V12 §3.7.2 (5)); a user's edit may."

### VV1112-14 — minor — CONFLICT — owner V12

**Claim.** V12 §2.13's pin table says each `offForm` pin reads its off form "from V11 §3.24.0 where V11 states it, else from the cells the bar names — E-20", but its rows for items 111, 113 and 114 give "the cells T111-5 names", "the switch T113-7 names (§4.11)" and "the driver cells item 114 (g)'s no-op bar names", although V11 §3.24.0 now states all three off forms. For item 111 the two differ: base T111-5 names "the oasis chance, the water pull and item 102's climate cell", while V11 §3.24.0's off form neutralises six cells (`dry.oasis.chance` 0, `dry.waterPull` 0, `dry.waterProsperity` 0, `dry.sunCell` 1, `dry.wellYieldWeight` 0, `dry.wellCoverageFactor` 1) — the owner's item 111 (b) has the water pull act in three places (growth field, prosperity term, wells), so an overlay built from T111-5's words read as cell names leaves the water term and the wells' weighting live and the off state cannot match the pre-item goldens.

**Required change.** In V12 §2.13's pin table write the off-form cells of `item111.water` as "V11 §3.24.0's `climate` dry-cell off form (the six cells)", of `item113.history` as "V11 §3.24.0's `history.replay` false", and of `item114.condition` as "V11 §3.24.0's `walls.condition` off form", each read from V11 per E-20.

### VV1112-15 — minor — LOST — owner V12

**Claim.** V12-NARR-4 ruled "Replace §12 by the current CONFIRMED/PLAUSIBLE list". The live V12 §12 PLAUSIBLE list (items 1-10) drops seven assumptions the archive's §12 still held as open (none resolved by a later ruling or by the text): (a) that every bar the register lines name has a scalar or per-clause verdict statistic its owner can register; (b) that no other register line (V06 §8, V02 §3.10.10) names a column of registry rows 14-15, 17's `profile`, 19 or 33-37 (the lint's one-knob-one-entry check finds any at C2's and C4's exits); (c) that the "no run when the metric holds" clause of `tune` is wanted only where an owner states it (V07); (d) that the corpus stage can target the default line's columns (a column no frame's run targets closes `fixed` by the line's own fallback); (e) that the empty-table rule leaves no column holding cells without a default or named entry at any exit (the PR-tier per-cell check finds any); (f) that the staged-entry rules, the rows-added row and the extended check behave as written - no fixture has run (T-V12-20 runs from M1); (g) that every legitimate move of a named entry's cells already writes a cells row (a run by V12 §3.7.6 step 5, a restating line, the command), so the check's extension to named entries catches only moves outside a line's method. With them gone the text reads these as settled.

**Required change.** Append to V12 §12's PLAUSIBLE list: "11. That every bar a register line names has a scalar or per-clause verdict statistic its owner can register; that no register line but V12 §3.11's items 103-107 and item-106 lines names a column of registry rows 14-15, 17's `profile`, 19 or 33-37 (the one-knob-one-entry check finds any at C2's and C4's exits); that `tune`'s \"no run when the metric holds\" clause is wanted only where an owner states it (V07). 12. That the corpus stage can target the default line's columns (a column no frame's run targets closes `fixed` by the line's fallback); that the empty-table rule leaves no column holding cells without an entry at any exit (the PR-tier per-cell check finds any); that the staged-entry rules, the rows-added row and the extended `--check` behave as written - no fixture has run (T-V12-20 runs from M1); that every legitimate move of a named entry's cells already writes a cells row (a run by V12 §3.7.6 step 5, a restating line, the command), so the check's extension to named entries catches only moves outside a line's method."

### VV1112-16 — minor — CONFLICT — owner V11

**Claim.** V12 §3.11 (l. 2089) states "Items 115's ceiling table and 118's decoration and staging-keyword tables are enumerations (not calibratable; V11) and take no entry" (also §3.15.5 "The ceiling table is an enumeration and takes no register entry"), and V12 §3.11's default line binds no enumeration "(V11 marks those non-calibratable)". V11 does not mark them: V11 §3.25's head rule is "Every cell is our own ... and calibratable unless marked"; V11 §3.25.4 marks only the THORP, HAMLET and VILLAGE ceiling rows `calibratable: false` (the TOWN - METROPOLIS row unmarked), and V11 §3.25.7 marks none of `festival.decorations` (whose `DecorationRow` carries numeric `count` and `weight` cells, V11 §2.8d), `festival.staging`, `festival.motifs` or `festival.generic`. Under V11 as written `plat calibrate register --defaults` writes default entries for those columns and `--check` fails them without one, against V12's "take no entry".

**Required change.** In V11 §3.25.4 extend the stamp bullet: "every row `calibratable: false` (the THORP, HAMLET and VILLAGE rows the owner's rule; the TOWN - METROPOLIS row the base's behaviour, an enumeration)"; in V11 §3.25.7's head add "every column of rows 102-105 `calibratable: false` (a look's enumerations: items, places, counts, motifs and windows; no register entry, V12 §3.11)"; extend T-V11-41 (a) and T-V11-43 with "and every column `calibratable: false`".

### VV1112-17 — minor — WIRING — owner V12

**Claim.** rewrite-V09's cross-part note 11 to V12: "the register lines for items 114-119 name V09's screen bars T-V9-71 - T-V9-79 where they test screens". V12 names only T-V9-72 (§2.14); V12 §3.15, which "names the owner of every other clause", names V09's screen clauses by volume only or not at all: §3.15.4 "the repair tool's material (V09)", §3.15.6 names no V09 clause though item 116 homes the view controls in V09 (T-V9-76), §3.15.7 "a campaign dossier opens on its own week - V08's and V09's conformance", §3.15.8 names no festival list (T-V9-78), §3.15.9 (3) "V09's progress view"; item 111's spring-fed oasis tool (T-V9-71), item 113's History chip (T-V9-73) and item 115's hand design beyond the ceiling (T-V9-75) are not named. The hook is one-ended: V09's bars cite their items, V12's item map does not cite them.

**Required change.** In V12 §3.15 name V09's bars at each item's owner sentence: §3.15.1 add "T2's spring-fed oasis is V09's T-V9-71"; §3.15.3 add "the History chip is V09's T-V9-73"; §3.15.4 "the repair tool's material (V09's T-V9-74)"; §3.15.5 add "a hand design beyond the ceiling is V09's T-V9-75"; §3.15.6 add "the view controls stopping at the limit are V09's T-V9-76"; §3.15.7 "a campaign dossier opens on its own week - V08's conformance and V09's T-V9-77"; §3.15.8 add "the festival list is V09's T-V9-78"; §3.15.9 (3) "V09's progress view (T-V9-79)".

### VV1112-18 — minor — WIRING — owner V12

**Claim.** rewrite-V06's cross-part note to V12 asks it to register "T-V6-71 - T-V6-74's bars and the no-op pins (`history.replay` false; item 114's neutral values; item 115 at TOWN and above), `bar.T-V6-72` (V06 §8)". V12 §2.13's `item115.ceiling` rung pin lists suites "the golden suite; B-MASS (V02)" only, while V06 §3.8.5 (l. 1685) and T-V11-41 (b) name V06's T-V6-74 as the pin over epochs at TOWN and above; and X-V12-15's enumerated list of the volumes' `bar.<id>` registrations names V06's T-V6-6 - -10, -13, -16, -18, -28, -31, -32, -40, -43, -54, -34 and -37 but not `bar.T-V6-72`, which V06 §8 (l. 3811, l. 3829) registers and names in its `spring.*` line.

**Required change.** In V12 §2.13's table, `item115.ceiling` row, suites: "the golden suite; B-MASS (V02); H-100 over epochs at TOWN and above (V06, T-V6-74)". In V12 §10.2's X-V12-15 row add "-72" to V06's list ("V06's T-V6-6 - -10, -13, -16, -18, -28, -31, -32, -40, -43, -54, -72, and T-V6-34 and -37 in their epoch forms").

### VV1112-19 — minor — TERM — owner V11

**Claim.** The canon's glossary row G-panelgroup retires naming the item-110 sitting group a panel (canonical: "the M4 panel's M4-110 group"; V12-TERM-1: M4-110 is a `PanelGroup` inside the M4 `PanelSpec`, and no `PanelSpec` id is 'M4-110'), counting two V11 occurrences. Both survive: V11 §3.24.1 (l. 3742) "confirmed through its thresholds' register line and M4-110's panel" and J-V11.75 (l. 4863) "its thresholds' register line and M4-110's panel (V12 §3.11's next line)". V12 itself now writes "the M4-110 group" throughout.

**Required change.** In V11 §3.24.1 and in J-V11.75 replace "M4-110's panel" with "the M4 panel's M4-110 group".

## What was checked, and how

1. **Assembly.** The live V11 and V12 were compared with the rewrite outputs: V12 is byte-identical; V11 differs only by the
   assembler's eight G-cite range prefixes (assemble-r0), each read and correct.
2. **Every inventory id** (1 050) was token-checked at the home rewrite-V11 §11 and rewrite-V12 §12 map it to (908 OK; 77
   tokens absent from the whole set and 65 absent from the volume only — each read by hand and explained by a canon
   ruling: retired terms, BCR → file f substitutions per ID-BCR, DR-V8.n → DR26–35 per ID-DR, round/seam narration per the
   NARR rulings, values moved to their single home). Every section of both volumes was word-diffed against the archive
   and every hunk losing a number, identifier or code token was read in context (V11 all sections; V12 head–§13, the
   ledgers, the Integration notes and Finalization records, whose 31 code tokens all survive in the set).
3. **Conflicts.** V11's twenty routed conflicts (DXC-05, MC-11, CF-PIPE-10, RIC-01, V08-XCONF-9, V09-XAGREE-1,
   V11-ICONF-1 – 7, V11-XCONF-1 – 4, V12-XCONF-2, CANON-C03/C04) and V12's ten (SCOPE-C14, V12-ICONF-1/2, V12-XCONF-1 – 5,
   CANON-C03/C04) are applied as ruled (J122's four gating sittings in V12 §0, §3.9, §8.3 risk 6, §11; the pinning hash
   cited from §7.6 in V12 §2.10 and V11 §3.2.1 step 7; registered StageIds; one `district` unit with the ≥ 30-households
   filter a `minHouseholds` parameter, J-V12.86; J122 cited for Q-V12-3; the met-need reading of the water-system record).
4. **Elegance equivalence lists.** E-05 (every archived §7.6 table keeps a registry row), E-20 (V11 §3.24.0 the one
   off-form statement — but see VV1112-14), E-24 (amendment marks on J rows), E-30, E-34 (every archived W-row consumer
   and registry reader survives; §2.10's item-110 pattern and its exceptions equivalent), E-35 (V12 §1b and §2.11 keep
   every producer and consumer), E-37 (the base `Unit` holds both subsets), E-38 (`territory.haPerHead` leaves the
   register; T-V12-20's clause) — each item checked against the archive.
5. **Owner parts (dated rulings).** V11: item 111's oasis chance, grove and garden rows, water-pull weights and sun cell per
   climate; item 113's event-to-epoch rows and burial thresholds with the factored burial age; item 114's patch materials by
   wall kind and culture, rates and windows; item 115's ceiling by rung; item 117's season tables by climate, field, garden
   and water (freeze order, eight autumn colours, 52-week coverage); item 118's decoration, staging-keyword and motif tables
   (tier contents as the owner's (d)); V11 §3.25.1 – §3.25.8, rows 92–106, W79–W86, T-V11-38 – T-V11-45, J-V11.97 – 111 —
   all at build depth and agreeing with the owner text and V06 §3.7.7's neutral values. V12: register lines and the
   `NoOpPin` for 111, the trial record and the style line for 112 (V12 §2.14; T-V12-45), the bars and replay budget for
   113, the bars for 114–118 and the bars and measurement for 119 (V12 §3.15), each clause of 111 (d), 113 (g), 114 (g),
   115 (f), 116 (e), 117 (i), 118 (h) and 119 (f) matched to a spec, pin, conformance owner or base bar. No F-MISSING.
6. **Base change requests.** V11 §10's 31 and V12 §10.1's 22 pointer rows match the canon's BCR → file f map; V11 §10c's
   40 received requests and V12 §10.2's 19 / §10.3's 11 hand-offs are closed at existing anchors (VV1112-05, VV1112-07 and
   VV1112-18 name the three wrong or incomplete ones).
7. **Edges.** V11 §3.26: 64 edges and 21 combinations, each with an outcome, failure rung and test. V12 §3.16: all 51
   catalogue edges of rewrite-V12's EDGES MAP land on rows 1–30 of §3.16.1 (each with the anchor it names present: the
   *At its limits* paragraphs of V12 §2.3, §2.6, §2.7b, §2.9, *Degenerate towns*, *Degenerate inputs*, *Batching and
   re-offers*), and all 17 preset combinations on §3.16.2's rows, tested by T-V12-42 and T-V12-43. No EDGE-UNDEFINED or
   EDGE-UNTESTED.
8. **Cross-part notes** addressed to V11 or V12 in rewrite-V01 – V10 and the six part reports were each checked at the
   text: applied, except rewrite-V09's note 11 (VV1112-17), rewrite-V06's note (VV1112-18), rewrite-V04's note 11 (the
   `span.*` names, VV1112-07/08) and rewrite-V08's note 6 (VV1112-09).
9. **References, ids, terms, deferral.** 2 510 volume-qualified references resolve; the bare-§ forms the assembler listed
   as ambiguous read correctly but two (VV1112-10); no bare `BCR-n`, no short `V4 §` or `V1-3.x` form remains; no retired
   synonym of the glossary but G-panelgroup's (VV1112-19); the deferral-wording hits ("next round", "left for later") are
   gone from both volumes.

## Already raised by other verifiers (not repeated here)

The `garden_irrigated` land use against `LandUse` 'garden' (VPC-24, VM-R0S-12); INDEX and §16 price staleness for the new
work (VCS-08, VCS-18); the base's §13.2 bars for items 114–119 (VCS-01 – VCS-06); §16's milestone rows for items 111–119
(VCS-09); the pipeline's F-MISSING for 115, 117, 118 and 119; V10's `register.json` input note (rewrite-V12 cross-part note
2, left by the assembler for V10). Findings ruled INVALID in an adjudication are not reopened.

## doc_checks (provisional)

`python3 docs/validation/bench/doc_checks.py --doc <volume> --heads docs/ARCHITECTURE.md`, run on both volumes. The tool
warns: "reference corpus INCOMPLETE (missing: captures, research/patreon, research/devlogs, research/ftg-docs,
research/external) - clean-room results are NOT authoritative; re-run on the machine that holds the corpus before any
freeze" — so these counts are provisional.

| check | V11 hits (unreviewed) | V12 hits (unreviewed) |
|---|---|---|
| C1 | 0 (0) | 8 (0) |
| C2 | 0 (0) | 0 (0) |
| C3 | 276 (255) | 124 (115) |
| C4 | 3 (0) | 1 (0) |
| S1 | 0 (0) | 0 (0) |
| S2 | 270 (44) | 101 (14) |

Every unreviewed S2 hit (58) is a volume-qualified `Vnn §x` reference the tool reads against the base's heads; a script
confirmed each flagged section number is preceded by its volume prefix on its line, so none is a broken reference. The
unreviewed C3 hits are common three-grams (the banner line, numeric runs of section numbers, "this part of the program")
outside this lane's mandate; they stand provisional with the corpus.
