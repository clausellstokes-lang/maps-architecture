# Agreement check — the dossier and the host (determinism, V08, V09, V10, V11) after assemble-r0

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-agree-host-r0s; covered by the whole-design retrovalidation (J84).

> **PROGRESS** — [x] resume check (no output, no LANDED line: fresh start) · [x] brief read whole · [x] inputs read (agreement.md/json for the ten pairs, canon conflicts and dated rulings, peers' landed results, every hand-off list the members carry) · [x] shared subjects checked by group · [x] hand-offs checked at destination · [x] matrix gaps hunted · [x] issues written · [x] result saved · [x] LANDED

## Scope and method

Members: determinism (§5, §6, §7 of `docs/ARCHITECTURE.md`), V08 (SettlementForge), V09 (the application), V10 (the clerk), V11 (content), as the live text stands after assemble-r0. The canon's matrix (`agreement.json`) gives ten pairs among them, with 770 distinct shared subjects, 8 pair-subject rows ruled `disagree` (SettlementForge × SCOPE-C07/V08-XCONF-6, EditEvent × DXC-04/V09-ICONF-2, T-V9-15 × V09-XAGREE-3, BCR-V10-20 × DXC-04) and 136 hand-offs that start or end at a member.

Method:
1. **A census of every shared subject.** For each, I recorded its occurrences and declaration sites in each member (script in `scratchpad/coherence/agh/census.py`). Subjects declared in two places, or declared in one member and restated in another, were read at their whole subsections. Most of the 770 subjects are common words the matrix's token scan picked up (`the`, `when`, `kind`). The substantive ones are records, fields, tables, keys, codes, tests, decision ids and derivation rows, and I read those in groups:
   - the dossier seam: §7.7 items 1, 8, 12, 13 and 15 and DR1–DR40 against V08 §2.3–§3.16;
   - the event-to-tool binding: §7.1's E-04 table against V09 §4.3 and V10 §4.1;
   - the dry-run outcomes and the catalogue: §7.1's E-07 against V09 §4.9 and V10 §3.16;
   - the host seam: V09 §2.2 and §2.10 against V08 §3.1 step 7 and V10 §2.6 and §3.17;
   - withheld information and the players' view: V08 §3.14 and §5.4 (3), V09 §2.7, §2.10 and §4.8, V10 §3.12 and §3.17, V11 §3.14.3;
   - the ladders: §1.1, §7.7 item 15, V08 §3.10, item 108's steps;
   - the tables: §7.6 against V11 §3.1, §3.2.1 and §4;
   - the build plans: V08, V09, V10 and V11 §8.
2. **Every matrix disagreement row and every canon ruling touching two members** was checked against its ruling in the current text (DXC-04, DXC-05, DIC-06, DIC-07, SCOPE-C07, SCOPE-C15, V08-XCONF-1–9, V09-ICONF-2, V09-XAGREE-1–3, V09-XCONF-1, V09-J121-1–5, V09-J122-1, V10-XAGREE-1–4, V10-J121-1–3, V11-XCONF-1–4, V12-XCONF-2, CANON-C02–C04).
3. **Every hand-off a member carries** was checked at its destination: V09 §10.2, V10 §10.2, V11 §10b and §10c, and the matrix's 136 rows.
4. **A matrix-gap hunt.** Every type name declared more than once in the set; every message key the members cite against V09's catalogue rows and families; every V11 registry row number the members cite; every test, decision and BCR id a member cites against its home.

Findings that landed peers already raised are not repeated: VDC0-04/-05/-06, VV78-10, VV78-11 (the g items' §7.7 rows and the never-read list's `defenseProfile`/`traditions`), VV78-09 (`PortNote.kind`), VV78-13/VDC0-15 for V07, VDC0-36 (`refuse.stale`), VV78-15/VCS-16 (`previousGovernments`), VV34-07/-08 (`info.plan.*`), VV56-24/-25 (V05's bend lines), VV56-10 (V06's T4 way forms, which also leaves XV-V9-34 open) and VV56-27. Where my finding is the other end of one of these, it says so.

## Result

**34 issues**: 2 blocker, 25 major, 7 minor. By owner: determinism 9, V09 8, V10 8, V08 4, V11 3, V07 1, model 1. By kind: DISAGREE 23, DUPLICATE-HOME 4, BROKEN-REFERENCE 3, MATRIX-GAP 2, ELEGANCE 2.

## Issues

### VAH-01 — blocker · DISAGREE · owner determinism

**Claim.** The port emits dossier changes the base's change envelope cannot type. V08 §2.3 (l.511-513) carries the fact kinds `site`, `history` and `tradition`; V08 §3.5's diff table (l.1609-1611) turns their changes into `attr`, `add` and `remove` changes that the absorb's `dossierFacts` ledger event carries (V08 §3.6 (4), l.1779-1781), and V08 §3.6 (1) (l.1753) dates them by 'row F-V8-8'. Base §7.7's `DossierChange.element.kind` (l.10861) has no 'site', 'history' or 'tradition', and the receipt table stops at F-V8-7 (`ReceiptRow` comment l.10864; item 13's data rows l.11176-11180; V08 §1.2 l.168 likewise cites F1-F22, F-V8-1-F-V8-7). A schema generated from §7.7 refuses the ledger event of any absorb whose dossier changed a tradition (item 118's schedule), a frozen site field or the history, so `carried` never takes the new schedule.

**Required change.** §7.7: `DossierChange.element.kind` gains `'site'|'history'|'tradition'`. Item 13 gains the data row F-V8-8: the `site`, `history` and `tradition` kinds, dated by arrival, response `none` (the ledger event only: `carried` updated; a site or history change noted `frozen_fact_changed`; a tradition's new schedule read by the festival display), citing V08 §3.5 and V08 §3.6 (1). The `ReceiptRow` comment reads 'F1 … F22, F-V8-1 … F-V8-8'. V08 §1.2 (l.168) and V08 §3.6 (1) (l.1750) cite 'F-V8-1 – F-V8-8'.

### VAH-02 — major · DUPLICATE-HOME · owner determinism

**Claim.** The port's never-read list has two homes that differ. §7.7 item 1 (l.10918-10927) enumerates the paths the port never reads and names V08 §2.4's field table as 'the list'; V08 §2.4's `ignored` row (l.641) is read by `AdapterManifest.keyList`, T-V8-20's ignore clause and the key-list lint. The base names `mapEdits`, `fogSessions`, every `worldState.spatialLedgers.*` sub-ledger and the host's derived reads (district profile, map profile, causal state, system state, capacities, daily life, threat profiles, the spine), none of which V08's row lists. V08's row names `arrivalScene`, `culturalIdentity`, `culturalNotes`, `pressureSentence`, `settlementReason`, `stress`, `spatialLayout.layout`, `spatialLayout.tradeAccess` and the top-level `factions`, none of which the base lists. The `defenseProfile`/`traditions` part is VV78-10's.

**Required change.** §7.7 item 1 keeps the reason categories (a host's map-side layers and derived reads, its generation log and internals, the NPC social layer, raw inputs, copies and generation scores, the host's verdicts, the lived keys, prose beyond a description seed) and the closed-digest rule, and cites V08 §2.4's field table for the paths, enumerating none of them (principle (1)). With VAH-03 the field table becomes the one complete list.

### VAH-03 — major · DISAGREE · owner V08

**Claim.** V08 §2.4's field table calls itself 'the one list' of the paths the port reads or ignores (read by `keyList`, T-V8-20 and §14's lint), but its `ignored` row (l.641) omits paths base §7.7 item 1 (l.10918-10922) puts on the never-read list: `mapEdits`, `fogSessions`, every `worldState.spatialLedgers.*` sub-ledger (the spatial substrate included), and the derived reads (the district profile, the map profile, the causal state, the system state, capacities, daily life, threat profiles, the spine).

**Required change.** V08 §2.4's `ignored` row adds `mapEdits`, `fogSessions`, `worldState.spatialLedgers.*` and the host's derived reads (district profile, map profile, causal state, system state, capacities, daily life, threat profiles, the spine), each with §7.7 item 1's reason. Where SettlementForge keeps one of them outside the dossier, the row says so (no dossier path).

### VAH-04 — major · DISAGREE · owner determinism

**Claim.** §7.7 item 8 (l.11031-11033) lists `HistoryHint` among the staged records 'each written only by `dossierRecord`', but §7.1's `dossierRecord` event (l.9450) has no history kind ('condition'|'deposit'|'powerRelation'|'person'|'customChain'|'customService'), and V08 writes `HistoryHint` once, at creation, into `Recipe.history` (V08 §2.5's staged-record list without it, W39 l.250, V08 §3.15 (2)). Base §2.7's own list (l.2425) places it 'on the recipe, §2.9'.

**Required change.** §7.7 item 8: '… `ConditionOverlay`, `DepositSite`, `PowerRelation`, the dossier-backed `Person`, `CustomChainRecord` and `CustomServiceRecord` (§2.7; items 88, 256), each written only by `dossierRecord`, and `HistoryHint` on the recipe (§2.9), written once by the port's creation (V08 §3.15) …'.

### VAH-05 — minor · DISAGREE · owner V08

**Claim.** V08's wiring row W34 (l.245) lists `HistoryHint` among the staged records filled 'by `dossierRecord` puts and retires', while V08 §2.5's staged-record event names six records without it, W39 (l.250) fills it at `creation` into `Recipe.history`, and §7.1's `dossierRecord.kind` has no history kind.

**Required change.** W34's piece column drops `HistoryHint` (W39 is its row).

### VAH-06 — major · DISAGREE · owner determinism

**Claim.** Base §7.7's `CircumstanceSlice.port` comment (l.10841) restates `PortValues`' fields as 'crime, food import, food chains, legitimacy, latitude'. V08 §2.5's `PortValues`, the type's home, has two more: `threats` (DR2's waterfront) and `readiness` (item 114's need). A reader of the base takes the slice to carry five values.

**Required change.** l.10841's comment: 'port: PortValues | null /* V08 §2.5's per-settlement values; null standalone (item 389) */', with no field list.

### VAH-07 — major · DISAGREE · owner determinism

**Claim.** §7.7 item 12 calls its table 'the KEY LAW, stated here' (l.11142-11151), but V08 §2.3 (l.516-525) adds key forms the table neither lists nor cites: the port's singletons `trade`, `port-values`, `deity`, `evidence`, `site`, `history`; `relation:<a>|<b>`; `cond:stress:<type>`; `chain:cat:<chainId>`; `dep:<institution key>|<slug(resource)>`; `calamity:<week>:<slug(name)>`; `trad:<id>`; and (V08 §2.5) `res:derived:<landuse>`. Base §7.7's own `DossierChange.element.kind` and receipt rows F-V8-1-F-V8-7 use these kinds, so the base key law is incomplete at its home.

**Required change.** §7.7 item 12's table gains one row: 'the port's own keys — the singletons and pair keys of V08 §2.3 and the derived deposit key of V08 §2.5 | V08 §2.3 (cited, not restated) | none'. The sentence reads 'the KEY LAW for SettlementForge's records, stated here, with the port's own keys V08 §2.3's'.

### VAH-08 — blocker · DISAGREE · owner determinism

**Claim.** The lock refusals give no closest alternative, against an owner rule. Item 101 R2 (docs/AMENDMENTS-2026-09-27e.md l.102-104): the tool 'refuses only what item 20 forbids (dossier facts) and what a lock protects, always with the closest alternatives (item 20 (g))'; T101-5 (l.16035): 'no declaration contradicts a dossier fact or a lock without a refusal carrying its reason and at least one closest alternative'; E-07's own row 6 (l.9676: 'the lock or the dossier fact it meets, with the closest acceptable declarations'). E-07's first row (l.9671), which `refuse.locked`, `refuse.water` and `refuse.warp` word, gives only 'unlock, choose another target, or keep the lock'. V09's rows and V10's lock row follow it (VAH-09, VAH-10), so a lock refusal on canvas or from the clerk carries no closest alternative and T101-5 fails.

**Required change.** E-07 row 1's action column: 'the blocking lock — unlock, or one of the closest acceptable declarations that leave the locked entity untouched (item 20 (g); `PreviewResult.alternatives`), or keep the lock; a host that must override a lock sends an unlock first'.

### VAH-09 — major · DISAGREE · owner V09

**Claim.** V09 §4.9's `refuse.locked` (l.1884), `refuse.warp` (l.1894) and `refuse.water` (l.1895) rows offer only `button.unlock` and `button.showWhy`. That contradicts item 101 R2's 'always with the closest alternatives', E-07 row 6 and T101-5's 'at least one closest alternative'.

**Required change.** Each of the three rows' button lists gains `button.chooseMarked` commit(`alternatives`, each `button.putAt`), the form `bend.place.noSite` uses, before `button.showWhy`, so the closest acceptable declarations of the dry run (VAH-08) are offered.

### VAH-10 — major · DISAGREE · owner V10

**Claim.** V10 §3.16's `lock` row (l.2212) states '(the canvas's card offers no closest alternative, so neither does the clerk's); no own alternative', against item 101 R2, T101-5 and E-07 row 6.

**Required change.** The `lock` row's alternatives cell: 'the row's buttons by V10 §3.5 step 3 — **Unlock** (a `propose` of the unlock), the closest acceptable declarations (each a `propose`, item 101 R2) and **Show me why**; no own alternative'.

### VAH-11 — major · DISAGREE · owner determinism

**Claim.** E-07 ('the one home of every refusal, conflict and bend cause', l.9663) disagrees with the members on what is refused. (a) It has no row for refusals other members state and word: the viewer role (§11.2's `role`; V09 `refuse.viewer`; V10 §3.16's `role` row); the island rung gate (V09 `refuse.islandsRung`, which V10 §3.16's `rule` row lists among the dry run's engine refusals); and V11 §4.1's table-edit refusals (item 110 (b)'s rung gate on a `raisedWays` row below CITY with the alternative 'declare the raised way', also V11 §4.4's lifecycle row; a stamped owner-rule cell; a dangling `ref` or a type error, refused F-EDIT naming the rule). (b) Six rows carry no key ('—'), four of them conflicts a user reads: the household capacity conflict, the Works conflict, the upgrade's pack-cap conflict and the host provider cap; the other two are the bug abort and the halved warp step. This is against V09 §4.9's 'every line a user reads … is a row' and T-V9-15's 'every outcome row has its key'. (c) Its lead says a declaration is refused 'only where it contradicts a dossier fact or a lock', while its own rows refuse an assignment-drift edit, a staged layer, an undo of a creation or dossier event and the host cap, and V09 §4.9 (l.1847-1849) lists 'a dossier fact, a lock or an assignment, a dependent later change, the viewer role, a staged layer, the rung and the screen — availability gates (J-VI.4)'. The stale base is VDC0-36's.

**Required change.** E-07 gains rows, each with its key: a declaration from a viewer role (refused `role`; `refuse.viewer`); an islands `adjust` below CITY from any client (refused, the rung; `refuse.islandsRung`); a `raisedWays` row set below CITY, a stamped owner-rule cell, and a dangling reference or type error in an `editTable` (refused F-EDIT naming the rule; the keys of VAH-12). Each '—' row names its key, or states that it carries no catalogue line and why. The lead reads: 'refused only where it contradicts a dossier fact or a lock (item 101 R2), or where an availability gate stops it — an assignment's bounds, a dependent later change, the role, a staged layer, the rung (J-VI.4); every other infeasible declaration is bent'.

### VAH-12 — major · DISAGREE · owner V09

**Claim.** V09 §4.9's sentence 'One row per outcome (E-07): each `bend.*` and `refuse.*` row is the message key of one row of §7.1's dry-run outcome table … T-V9-15 checks the two sets one to one' (l.1850) and T-V9-15's E-07 clause (l.3814) are contradicted by both texts, so the bar cannot pass. (a) V09 rows word no outcome row: `refuse.exportTier` (§11.1's E_KNOWLEDGE_TIER), `refuse.phone` and `refuse.layer` (the shell), `refuse.restore.dossier` (V09 §3.9) and `refuse.clerk.*` (V10 §3.16). (b) E-07 keys several rows by one key: `refuse.locked` rows 1 and 6; `refuse.water` rows 1 and 2; `refuse.dossierOwned` rows 4, 6 and 8. (c) V11 §4.1's table-edit refusals have no row here.

**Required change.** V09 §4.9's sentence and T-V9-15's clause: 'every key in §7.1's outcome table has its row here, one key wording each outcome row that names it; every `bend.*` and `refuse.*` row here names its producer — an outcome row of §7.1, §11.1's export rule (`refuse.exportTier`), the shell (`refuse.phone`, `refuse.layer`), V09 §3.9 (`refuse.restore.dossier`) or V10 §3.16 (`refuse.clerk.*`)'. Add one `refuse.*` row, with its buttons by V09 §4.9's rules (at least **Show me why**), for each of V11 §4.1's refusals: a `raisedWays` row below CITY (with the alternative 'declare the raised way' as a T4 Raised `tool` button), a stamped owner-rule cell, and a dangling reference or type error. E-07's new rows (VAH-11) name these keys.

### VAH-13 — major · DISAGREE · owner V10

**Claim.** V10 states the dry run's refusals as two, against its own table and E-07. §1.2 (l.155) reads '(bends and the two refusals)' and §3.16 (l.2195) '§7.1's dry-run outcome table, which refuses only for a dossier fact or a lock and bends every other case'. V10's own `rule` row (l.2213) then lists engine refusals that are neither (a kept record, a staged layer, the rung, an undo's dependence, an assignment), its `role` row renders `refuse.viewer`, and E-07's rows refuse the same causes.

**Required change.** §1.2's cell: '… the dry-run outcome table (its bends, refusals and conflicts)'. §3.16: '… §7.1's dry-run outcome table, which refuses a dossier fact or a lock (item 101 R2) and the availability gates its rows name (J-VI.4), and bends every other case …'.

### VAH-14 — major · DISAGREE · owner determinism

**Claim.** `setAttr` on `Enceinte.pathway` (a ring's fate: road, absorb, keep, and its week; §2.8 l.2690 lists it as an edit path) has its home tool T3 `wall` in V06 §4.2 (l.3253: 'T3 `wall`'s inspector on a ring') and V09 §4.3 (l.1620). §7.1's binding (E-04, the one home) names it in no row: its T3 row (l.9752) homes `setAttr` only 'on a retaining wall and on the castle'. Its T9 row (l.9758) takes 'every `setAttr` path no other row homes', so the base homes it at T9. T-V9-12 checks the two tables pair by pair and fails.

**Required change.** §7.1's binding T3 row adds '`setAttr` on `Enceinte.pathway` (a ring's fate and week; V06 §4.2)'.

### VAH-15 — major · DISAGREE · owner determinism

**Claim.** `setAttr` on `WaterBody.spring.flow` (item 111; V06 §3.12.1's failing spring, V06 §4.2 l.3258 'T2 `ground`'s spring form … a flow slider') is homed at T2 `ground` by V06 §4.2 (also V06 l.3289 '`WaterBody.spring.flow` (`setAttr`, T2)') and V09 §4.3 (l.1615). §7.1 names it nowhere. The edit-target water row (l.9627) lists `setAttr` (bank class) only, and the binding's T2 row (l.9751) homes `setAttr` 'on `geology`, a bank class, a site feature'. A spring's flow is a `WaterBody` field, not a site feature, so the base homes it at T9 by the catch-all.

**Required change.** §7.1: the edit-target water row adds '`setAttr` on `WaterBody.spring.flow` (item 111; V06 §4.2)', and the binding's T2 row adds '`setAttr` on `WaterBody.spring.flow`'.

### VAH-16 — major · DISAGREE · owner V09

**Claim.** V09 §4.3's T10 row (l.1651) binds `rerollLayer('forest')` to T10 `hold`, as V07 does. Base §6.1 registers no `forest` concern (the rerollable set is naming, render.instances, style.jitter, style.crowns, style.compass, naming.emblem, village.track), so `rerollLayer`'s schema refuses it. §7.1 binds `render.instances` to T12 `dress`. VDC0-15 and VV78-13 rule V07's half; V09's row is its own text.

**Required change.** V09 §4.3's T10 row drops `rerollLayer('forest')`. The village **Try again** chip for the woods' trees issues `rerollLayer('render.instances')` scoped to the wood, homed at T12 `dress` (§6.1, §7.1's T12 row), the binding VDC0-15 gives V07.

### VAH-17 — major · DISAGREE · owner V09

**Claim.** V09 §4.3's `delete` row (l.1659) homes `delete` at T10 `hold` 'on any thing', while §7.1's binding (keyed by event kind and target class, V09-ICONF-2) homes T10's `delete` only 'of anything else' and gives the delete of an access point and of catacomb galleries to T9 `shape` and the delete of a light to T12 `dress`. V09's own rows (access point, catacomb galleries, light) say the same, so the table homes one (kind, target) pair at two tools and T-V9-12 cannot pass.

**Required change.** V09 §4.3's `delete` row: 'T10 `hold` … on any thing but an access point and catacomb galleries (T9 `shape`) and a light (T12 `dress`), as §7.1's binding keys it; a dossier-backed thing takes `rejectSite`, an island V05's `convert removeIsland`'.

### VAH-18 — major · DISAGREE · owner V10

**Claim.** V10 §4.1's escape-hatch paragraph (l.2620) places 'the leader-line switch under T11'. The leader-line switch is a `setStyle` row (§9.4); §7.1's binding homes `setStyle` at T12 `dress`, and V09 §4.3 lists 'the leader-line switch (a style row, §9.4)' in the T12 row.

**Required change.** V10 §4.1: '… the plan and massing events of V02 and V03 under T9; and the leader-line switch, the quarter tint and the furniture rows under T12'.

### VAH-19 — major · MATRIX-GAP · owner V09

**Claim.** Missed shared subject: the `info.village.*` explanation rows (verdict: open hand-off; no catalogue home). V07 §4.5 (l.3049-3076) defines `info.village.heart`, `.form`, `.roads`, `.end`, `.field`, `.platformWall`, `.raisedCarried`, `.belowCity`, `.palisadeRun`, `.unwalled`, `.ceiling`, `.remnant`, `.superseded`, `.season`, `.festival` 'as rows keyed in V10's catalogue'. V10 §3.9 (l.1690) points back to V07 §4.5. V09 §4.9, the catalogue's one home (`messages/en.json`), has no `info.village.*` row and no `info.village.*` line in its family table of keys whose words another volume writes (l.2165-2177). A shipped locale therefore lacks those keys, and T-V9-15's 'every key of every family' has none to check.

**Required change.** V09 §4.9's family table gains '| `info.village.*` | each row of V07 §4.5's list | V07 §4.5 |'.

### VAH-20 — minor · DISAGREE · owner V07

**Claim.** V07 §4.5 (l.3049) says its `info.village.*` rows are 'keyed in V10's catalogue'; the catalogue is V09's (`messages/en.json`, V09 §2.9, §4.9), and V10 renders families V09 carries.

**Required change.** V07 §4.5: '… as rows of V09 §4.9's catalogue (their words written here)'.

### VAH-21 — minor · BROKEN-REFERENCE · owner V09

**Claim.** V09 §4.9 (l.2156) says the `host.*` rows' text is 'volume 8's (V08 §13 X12: …)'. V08's rewrite removed its X table: V08 §13 (l.3335-3351) holds no X12, so the pointer resolves nowhere. The texts stand at V08 §3.9, §4.2, §4.6 and §5.1.

**Required change.** V09 §4.9: '… its text volume 8's (V08 §3.9's held reasons, V08 §4.2's controls and undo words, V08 §4.6's notes and history lines, V08 §5.1's strips and banner rows; `host.locked`) …'.

### VAH-22 — major · DUPLICATE-HOME · owner V09

**Claim.** V09 §2.6 (l.578) declares itself 'their one home' for the family multipliers: `familyWeights` holds, per family, one of 0, 0.5, 1, 2, 3, multiplying that family's soft terms, hard needs never scaled. V11 §4.2, the tables' owner (S2), declares the same cell with the same values and meaning: `familyWeights?: Record<string, 0|0.5|1|2|3> /* per family, × that family's soft terms …; hard needs unscaled */`. One cell, two homes.

**Required change.** V09 §2.6: 'The family multipliers. `familyWeights` is V11 §4.2's cell (its values and meaning there); V09 §4.7's chips word its five values Ignore 0 · Less 0.5 · Normal 1 · More 2 · Much more 3 …'. The words stay V09's, the values and meaning V11's.

### VAH-23 — major · DISAGREE · owner V10

**Claim.** One name, two records: V09 §2.4 (l.494) declares `interface Draft` (the canvas's live gesture: tool, mode, params, layer, points, strokes …; `DraftMirror` its copy), and V10 §2.4 (l.491) declares `interface Draft` (the clerk's multi-item draft: mode, scratch, forkHead, blueprint, items, checks). The matrix rows both as one shared subject `Draft` with verdict agree. The canon's glossary carries two 'draft' entries (V09-1083, V10-0787). V09 §2.10 names its types 'so that none collides with volume 10's'.

**Required change.** V10 renames its record `ClerkDraft` (with `ClerkSession`, `ClerkTurn`) at its declaration and every V10 use. `DraftItem`, `DraftCheck` and `CreatedRef` keep their names. The glossary's V10 term reads 'clerk draft (`ClerkDraft`)'.

### VAH-24 — major · DUPLICATE-HOME · owner V09

**Claim.** `MsgRef` is declared twice: base §11.2 (l.14299, 'declared in @plat/model', `key: string`), which base records use (§5.2's F-EDIT, §11.2's `PreviewResult`), and V09 §2.9 (l.704, `key: MsgKey`, `MsgKey = string`). The matrix homes it at V09 (pairs V08-V09, V08-V10, V09-V10), but MC-11 puts a type a base record uses in the base.

**Required change.** V09 §2.9 replaces its `type MsgRef` declaration by 'MsgRef is §11.2's (`@plat/model`); its `key` is a `MsgKey`', keeping `MsgKey` and its comment on rendering a withheld `{ id }` argument.

### VAH-25 — major · MATRIX-GAP · owner V10

**Claim.** Missed shared subject (model-V10): `PlacementOrder`, declared in base §2.8 (l.2486) and again in V10 §2.13 (l.1079). Verdict: duplicate home, and the copy's comment dropped 'claims first, then item 105 (f)'s anchors first' from `k`.

**Required change.** V10 §2.13 replaces its `type PlacementOrder` line by a citation: '`PlacementOrder` is §2.8's (item 271)'.

### VAH-26 — major · DUPLICATE-HOME · owner model

**Claim.** `RaisedKind = 'viaduct'|'elevated'|'aqueduct'` is declared in V06 §2.13 (l.847) and again in V11 §2.8c (l.626). The base's own record types the same union inline (§2.7 `RaisedWayRecord.kind`, l.2132). The matrix homes it at V11 (V06-V11, V09-V11) with verdict agree; MC-11 puts a type a base record uses in the base.

**Required change.** §2.7 declares `type RaisedKind = 'viaduct'|'elevated'|'aqueduct'` beside `RaisedWayRecord` and types `kind` with it. V06 §2.13 and V11 §2.8c replace their declarations by 'RaisedKind is §2.7's'.

### VAH-27 — major · DISAGREE · owner V11

**Claim.** One name, two records (pair model-V11, matrix verdict agree): base §2.2 (l.577) declares `type RoleRow = { role: RoleName; entity: Id; ordinal?: number }`, the kernel's role rows; V11 §2.8 (l.549) declares `interface RoleRow`, a structure role's defaults that the compiler writes into `DesignationTemplateRow.structures`.

**Required change.** V11 renames its record `StructureRoleRow` at its declaration and every V11 use (V11 §3.6.5 among them).

### VAH-28 — major · DISAGREE · owner V10

**Claim.** One name, two records (pair V01-V10, matrix verdict agree, a pair no agreement seat's members cover): V01 §2.2 (l.361) declares `type Anchor = 'portal:best'|'portal:gate'|'portal:bridge'|'pair:1'|'pair:2'|'axis'`, a template primitive's portal anchor; V10 §2.12 (l.820) declares `type Anchor` as the clerk's words-to-points input (`{ at }`, `{ from, bearing, dist }`, `{ between }`, `{ along }`, `{ edge }`, `{ frame }`).

**Required change.** V10 renames its type `PlaceAnchor` at its declaration (l.820), in `AnchorGeom` and at every V10 use.

### VAH-29 — minor · BROKEN-REFERENCE · owner V10

**Claim.** V10 §1.2's volume table (l.194) lists `LadderRouter.route` under 'V07 §2.1, V07 §2.7, V07 §4.5'. `LadderRouter` is the base's: §1.1 (l.342-349), §14 (l.14720 'requests outside the ladder are routed or clamped by §1.1's `LadderRouter`'), cited as §1.1's by V07 (l.103, l.356) and V08 §3.10. The matrix's home 'V07' is wrong too.

**Required change.** V10 §1.2 moves `LadderRouter.route` to a base row ('§1.1 | `LadderRouter.route` and the rung table'); the V07 row keeps `ProductDecl('village')`, `VillageRequest` and the village `WhyProvider`.

### VAH-30 — minor · BROKEN-REFERENCE · owner V11

**Claim.** V11 §10c (l.4982-4993) cites requests by ids their volumes no longer carry: 'V08 X1', X2, X4, X5, X6, X9, X14, X19, X22, X25 (V08's rewrite removed its X table, and V08 §13 holds no rows) and 'V07 FL-2', 'V07 FL-3' (V07 holds no FL rows). These are prefixed citations that resolve nowhere. VV56-27 covers V11's citations of V06's removed X ids.

**Required change.** V11 §10c's request column names each by its subject and the requesting section instead of a removed id, for example 'V08's ladder re-check (V08 §3.5.1)', 'V08's `chainStatus` `sustained` (V08 §2.6)', 'V07's counted village church (V07 §3.16)'. The validation records keep the former ids.

### VAH-31 — minor · ELEGANCE · owner V10

**Claim.** V10 §2.13's `WhyAnswer.closure[].barrier` (l.1032) restates the union 'shore'|'cliff'|'gorge'|'marsh'|'sheer'|'enceinte' inline. It is base §2.7's `BarrierKind` (l.2096, J-VI.3), which §11.2's preview arcs also restate inline (l.14313). The values agree today; the restatement keeps two copies to keep in step.

**Required change.** V10 types the field `barrier: BarrierKind /* §2.7 */`.

### VAH-32 — minor · ELEGANCE · owner V11

**Claim.** The ladder step enumeration 'COUNT'|'QUARTER'|'GUILD'|'SIZE'|'REPLACEMENT' (item 108) is written inline five times in four units: V11 §2.6's `LadderStepRow.step` (l.477), V08 §2.3's `CarriedFact` (l.489), V08 §2.5's `DossierInstitution.step` (l.669), V10 §2.13's `WhyAnswer.members.step` (l.1035) and V01 §2.3's district view (l.450). No named type exists. The values agree.

**Required change.** V11 §2.6 declares `type LadderStep = 'COUNT'|'QUARTER'|'GUILD'|'SIZE'|'REPLACEMENT'` beside `LadderStepRow`, typing `step` with it. V08 §2.3, V08 §2.5, V10 §2.13 and V01 §2.3 type their fields `LadderStep` (V11 §2.6).

### VAH-33 — major · DISAGREE · owner V08

**Claim.** Build-plan dependency. V08 §8.1 (l.3021-3027) lists what M-SF needs as M3a, M3b, M4, M6-E, M-CAL and V11's C4, but SF6 (l.3046) wires `ClerkMount.host` and `HostSlots` and the host clerk's proposals, whose other ends are built at M3c: V10's C5 (the host proposal intake, `clerk.config`, `clerk.needsToken`, `clerk.proposal`; V10 §8) and V09's AP8 (the card-only drawer and the host channel, 'M3c (staged; with V10's C2-C5 — C5 for the host channel …)'). V09's AP5b (l.4087) runs 'M-SF (with V08's SF4 and SF6; V08 §8.1)', but V08 §8.1 names no V09 step.

**Required change.** V08 §8.1's list adds 'M3c (V10's C5 host seam and V09's AP8 card-only drawer, which SF6's host clerk and `ClerkMount.host` drive)' and 'V09's AP5b, the host shell verified on `embed.html` with SF4 and SF6'.

### VAH-34 — major · DISAGREE · owner V08

**Claim.** V08 §8.1 (l.3027-3028) says V11's C4 holds 'the rows items 111 and 113–118 read'. V11 §8's C4 (l.4680) holds only the SettlementForge vocabulary (`dossier.kinds`, archetypes, category synonyms, keywords, good words, ladders, the wall barrier and waterfront rows); the rows of items 111 and 113–119 are C9 (l.4685), priced at the milestones that build each item's base mechanism. So M-SF's dependency names the wrong V11 step.

**Required change.** V08 §8.1: '… and V11's **C4** — the SettlementForge rows: `dossier.kinds`, archetypes, category synonyms, keywords, good words, ladders, the wall barrier and waterfront rows — and **C9**'s rows that items 111 and 113–118's port readings use (V11 §8, priced there, not here)'.

## Checked and agreeing

**Matrix disagreement rows.**

* `EditEvent` × DXC-04 / V09-ICONF-2: §7.1 now holds the one binding table, keyed by (event kind, target class or path) (l.9743-9762). V09 §4.3 cites it and keeps only screen, gesture and source columns. V10 §4.1's encoders and its escape hatch read §7.1's toolkit table. The residual row disagreements are VAH-14–VAH-18.
* `BCR-V10-20` × DXC-04: `delete` is T10's in §7.1, V09 §4.3 and V10 §4.1 (`hold` op `remove`). The keyed exceptions are VAH-17.
* `T-V9-15` × V09-XAGREE-3: every bend id of V02 §1b (21 ids) has its V09 §4.9 row. V09's extra `bend.deck.class`, `bend.deck.full`, `bend.room.minArea` and `bend.room.noDoor` have producers (the deck dry run; E-07's V03 rows).
* `SettlementForge` × SCOPE-C07 / V08-XCONF-6: the clerk is SettlementForge's own assistant through the host seam, configuration C, in V08 §4.4 (6), V09 §2.2 `clerkMode` and §2.10 *The AI setup*, and V10 §3.17 and §11 Q1–Q3. The interface language is the host's (`MapHostConfig.locale`, V08 §5.5; V09 §2.9 *Locales*), with English the source language.

**The dossier seam (determinism ↔ V08, V11).**

* Every DR citation in the members resolves to base DR1–DR40. V08 cites DR rows and restates none. No `DR-V8.n` working name survives (J-VI.13).
* `dossierFacts` and `dossierRecord`: §7.1's event shapes (l.9449-9450) equal V08 §3.6 (4) and §2.5. §7.4's lifecycle row (author `host`, session `host:port`, never an undo target) equals V08 §2.5 and §2.7.
* `DossierBinding` and `CarriedFacts` are §7.7 item 12's; base `CarriedFacts` cites V08 §2.3's union (l.10857). The `absorbed` retention matches (newest 64 keep `changeIds`).
* §7.7 item 15, §1.1 and V08 §3.10 carry SCOPE-C01's one wording: refused below 1 500 only while no village product is registered; 0 at an absorb → THORP; a creation below 1 refused.
* The era derivation (V08-XCONF-9): V11 §3.19.2 cites V08 §2.6's `era` row, culture only.
* V08's owner questions (V08-XCONF-2, -4, -5, -7, -8): V08 §11 is a table of decisions carried into §2.1, §2.2, §3.7, §5.4 (2), §8.1 and §3.14 (6). B7's 'coming later' copy is gone (V08-XCONF-3).
* Registry row 63 (`dossier.*`) is 'written (V08)', and row 65's archetype, synonym and keyword shapes are V08's with rows V11's (J-V8.18). V08's `archetypes` shape carries `village?: ArchetypeVillageCell` (X-V11-1 closed).
* Item 108's ladder steps: the same five values in V08, V10 and V11 (restated, VAH-32). The `kinds` row's `implies`, `@absent:` pseudo-classes, `categorySynonyms` family and keyword `class`/`specialisation` cells are present in V08 §2.6 (X-V11-1, X-V11-6).
* `PortRows.customKinds`: the base's read-time overlay (l.13831) = V08 §3.11 = V11 §3.13 (no fallback class, J-VI.20).

**Withheld information and what players may see.**

* One effective key: V09 §2.10's rule = V08 §3.14 (5) (the party key form set as `ViewOpts.viewAs`, frame key `secret`) = V09 §4.8 ('What the players know', the host banner standing for View as, J-V8.89) = V10 §2.3 and §3.12 (the session key; unexcavated elements absent below `secret`; concealed uses never refused).
* Door 1's projections: V08 §5.4 (3) holds the rows for the base's kinds and the preview reply, V10 §3.17 those for the reader kinds. `measure`, `hit` and `inView` are refused `E_HOST_KIND` in base l.14523, V08 §4.4 (2) and §5.4 (3), and V10 §3.17. T-V8-27 carries the list (CVR-V10-3 met).
* The sensitive catalogue kinds (Q-V11-1/J122): concealed by default in a player view, a record's `knownTo: 'public'` winning (V11 §3.11, §3.14.3), through §9.2's admission at the viewer's key as V08 §3.14 (5) states it.
* `clerk.proposal` statuses `accepted`, `dropped`, `stale`, `failed`: base l.14520 = V09 §2.10 `answer` = V10 §3.17 = V08 §3.1 step 7 (a).

**The host seam.**

* `HostSlots` (V09 §2.2, its one declaration) is filled field by field by V08 §3.1 step 7 (b): header, banner, lockedControls (`host.locked`), exportFormats, `fileMenu: false`, `historyFilter` unset (no viewer frame), `clerkMode`, `hostName`, `historyLines` with `list(key)` and the per-key cache, `newDocuments: 'download'`.
* `ClerkMount.host` (V09 §2.10) = V08 §3.1 step 7 (a) = V10 §2.6 *The bridge, through the mount only*. V10 implements `ClerkHandle` and declares no member of its own (J-V10.88).
* `clerkMode` semantics (off/builtin/host, the card-only drawer for a host proposal): V09 §2.2 = V10 §3.17 = V08 §4.4 (6).
* V10's dispatch table and the drawer's keys (`clerk.alt.*`, `clerk.view.cleared`, `clerk.applied`, `refuse.clerk.*`): V10 §2.6 and §5.4 = V09 §4.9's family table.

**The binding, the catalogue and the tables (determinism ↔ V09, V10, V11).**

* Size words (V10-XAGREE-3): V10 §3.3's lexicon names V09 §4.5's quantiles; no population number of its own.
* `siting.declared` and `siting.linkEdits` (V09-XAGREE-1, V10-XAGREE-1): V11 §4.2's union (key forms `uid:`, `cat:`, `cls:`, `use:`; cells `{ bindTo?, avoid?, cut? }`) = V09 §2.6's screen map = V10 §2.12 `link` and §4.1's T9 encoders. XV-V9-1 and XV-V9-2 are closed. The family-multiplier home is VAH-22.
* `WhyCardModel` (V09 §2.7) reads only fields V10 §2.13's `WhyAnswer` declares (`profile.sources[].rung`, `links[].branchOf`, `declared`, `chain`, `sections`). `LinkRow.chain` cites `WhyLink['chain']` (CVR-V10-15).
* `GenerationReport.dossier` states (`placed`, `rejectedSite`, `blocked`) and `ReportEntry.kind` values (§5.4) = V09's `report.dossier.<state>` and `report.moved.<kind>` rows.
* The table registry's home is V11 §3.1, and §7.6 cites it (DXC-05). The base settings row (row 92) carries `reroll.maxAdvance` and `crossing.searchBandM`. The pinning hash (V12-XCONF-2) is §7.6's, and V11 §3.2.1 step 7 and l.342 compute it so. Registry row numbers cited by V08, V09 and the base (63, 65, 76, 77, 79, 80, 86, 87, 90, 92, 95, 96) name the rows V11's registry gives them.
* V11-XCONF-2: registry row 87 types `en.json` as `MsgRow` and other locales `{ key; text }` (V09 §2.9; XV-V9-31 closed).
* Every test id (T-V8/9/10/11-n), decision id (J-V8/9/10/11.n) and BCR id a member cites resolves to its home volume's row; base T101-1 and T101-2 mean what §7.1 and V10 §4.1 cite them for.

**Build plans.**

* V09 AP8 and V10 C2–C5 at M3c: V10 §8 prices AP8 in V09's total (XV-V9-8 met). V11 C4 at the SettlementForge stage and C9 by each item's mechanism. M-SF after M-CAL (J122) in V08 §8.1 and §11. The open dependencies are VAH-33 and VAH-34. The prices against §16 and INDEX are VCS-08, VCS-18 and VV78-12.

## Hand-offs at their destinations

* **V09 §10.2 (35 rows).** Closed at their destinations except: XV-V9-5 (V03's crypt bend words, VV34-05); XV-V9-16 (b) and V05's bend lines (VV56-24); XV-V9-34 (V06 §4.2 still binds `downgradeWay`/`upgradeWay` to T4, VV56-10). XV-V9-16 (a) is closed: V05 no longer reads 'T9's delete'. XV-V9-35 is closed (`PatchMaterialRow.label`). XV-V9-33 is closed (V10 §3.3's lexicon names V09 §4.5's quantiles).
* **V10 §10.2 (CVR-V10-1 – CVR-V10-20) and its received table.** Destinations hold the content: `catacombOutcome` in V04; `info.crypt.*` in V03 §4.6; the clerk `connect-src` in V08 §3.1 and V09 §6.2; V01's pushes as `sun` and `nuisance` (V10-XAGREE-2); `deck/landmarks/<head|mid>` and `massing/stack` in V02; `deckNoCellar` in V03; the specialisation ids in V11; V05's island rows; V07's village words; V08's `info.raised.suppressed` line; V09's families. CVR-V10-9's `info.plan.*` family is VV34-07/-08.
* **V11 §10b (X-V11-1 – X-V11-17) and §10c.** Requests to V08, V09 and V10 are met (`archetypes.village`, keyword cells, `fam.<family>` glyphs in V09 §5.1, `clerk/ops.json` and `clerk/content.json`, `toolkit.json`). §10c's cited ids of V08's and V07's removed tables are VAH-30.
* **The matrix's 136 rows.** The V08 X1–X25 rows (V08's table is gone; V08 §13 records each as met) were checked at their destinations in V11, V09, V06, V07 and V04: ladder fixes, `chainStatus`, burial pairs, the terminal's criteria row, the culture rows, `toll_bridge` `implies`, `HostSlots`, `ClerkMount.host`, `historyLines`, `fileMenu`, `EpochReport.raised.suppressedFired`, `CalamityRef.deaths`, and DR30–DR32 by number (no `DR-V8.n` left). V06's X5, X6, X7, X17, X21, X23 and X30 are met (the forward path is 'Open a copy from here', J-VI.12; `bend.hood.noClock` in V09 and V10, CANON-C02). V12's X-V12-5 – X-V12-8 and X-V12-10 are met in V08, V09 and V10. V08 X12's pointer in V09 no longer resolves (VAH-21). INDEX §6 and §7's routing (CANON-C03, -C04) is scope's and the proof seat's.

## Matrix gaps and wrong verdicts

* **Missed shared subjects:** `info.village.*` (V07, V09, V10; VAH-19) and `PlacementOrder` (model, V10; VAH-25).
* **Verdict `agree` on two different things under one name:** `Draft` (V09, V10; VAH-23), `RoleRow` (model, V11; VAH-27), `Anchor` (V01, V10; VAH-28).
* **Verdict `agree` on one thing declared twice:** `MsgRef` (base §11.2, V09; VAH-24), `RaisedKind` (V06, V11; VAH-26).
* **Wrong home:** `LadderRouter` is homed at V07 by the matrix; its home is base §1.1 (VAH-29).

## Coverage

The ten pairs among the five members were checked. Pairs between a member and a unit outside this seat are partly covered by other agreement seats: tools (determinism, rendering, V09, V10), proof (scope and every volume's §7 and §8), fabric (model, pipeline, V01–V03, V11), time (determinism, V06, V01–V05, V07). No seat's members include V01–V10, model–V10, kernel–V11, V06–V11 or V08 against model, pipeline and rendering. The collisions I found at those edges are VAH-25 to VAH-28. Issues that overlap the tools seat's domain (VAH-08 to VAH-18) and the proof seat's (VAH-33, VAH-34) are reported here because their pairs are in this seat's matrix.

