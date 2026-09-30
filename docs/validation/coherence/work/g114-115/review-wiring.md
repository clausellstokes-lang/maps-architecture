# Review: wiring and unit coverage (draft items 114 and 115)

**Lens.** Is every new value wired both ways — named producer, named consumers, persistence, lifecycle rows (create ·
read · persist · regenerate · undo · migrate), a render or clerk explanation, export where one applies, tests? Does every
name exist in the design, or is it declared new with one home? Does the unit list miss a unit, or give a unit a part it
should only cite? Are the new test ids unique? Would twelve editors working in parallel reach the same names, thresholds,
tables and record shapes?

**Subject.** `items-114-115.md` (cited `items l.N`), with `draft-notes.md` and `read-{base,sf,vols}.md`. The sibling
review `review-rules.md` (owner words and conflicts) was read. Where a point there also touches wiring, this review says
"concur" and adds only the wiring part.

**Checked against the design files themselves** (the readers' notes were used only as a map):
- `new/base/model/01-domain-model-and-schemas.md`: §2.5 `FieldBands`, §2.8 fact tiers and dossier paths, §2.9 `Recipe`;
- `new/base/determinism/01-s5-failure-handling.md`: §5.3's rows and §5.4's `GenerationReport`;
- `new/base/determinism/02-s6-determinism.md`: §6.1's `intent.surprise` and §6.2's recorded inputs;
- `new/base/determinism/03-s7-editing.md`: `EditFate`, `adjust`, the edit targets, the tool binding, §7.4, §7.6, §7.7
  (layer 1, `Intent`, layer 2, items 1, 6, 9–13, the DR table, `ReceiptRow`, `DossierChange`), §7.8;
- `new/base/pipeline/01-s4-generation-pipeline.md`: §4.2 S0, §4.5 (fields, band set, bands, S7b, item 72), §4.7 S10b
  (2), §4.11's re-banding;
- `02-s10-simulation-content.md` (EP-18), `09-ii6-staged-layers.md` (whole), `10-ii7-sewer-layer.md` (II.7.1);
- `new/base/rendering/01-s08…` (§8.2 thematic rows), `02-s09…` (§9.5 legend), `03-s11…` (exports, host doors);
- `new/base/scope/03-s0.md` (§0.2), `05-s1.md` (§1.2), `06-s13.md` (T10-1, T13-1, T15-1), `07-s14.md` (`PortNote`,
  `DossierDigest`, the port's duties, the T1 tool row);
- the landed `new/volumes/V04-underground.md` (F2, C5, `wealthLevel` readers);
- live V05 §1b, §2.4, §3.2, §3.15; V06 §3.2, §3.3.5; V08 §2.3, §2.7, §3.6, §4.6; V09 §4.9, §4.14, §5.4; V10 §2.12, §3.3,
  §4.1; V11 §2.2 (preset entries), §3.1 rows 6, 56, 63, 73, 89; V12 §2.7b;
- `docs/validation/coherence/wiring.md` (W-DOS-02, W-DOS-08); `work/g116/item-116.md` (shared names, receipt rows).

Receipts are in `tmp/rw-*.txt` (`rw-names.txt`, `rw-fv8.txt`, `rw-bandset.txt`, `rw-wealthlevel.txt`, `rw-g116-cross.txt`,
`rw-receipts.txt`).

**Verdict.** The items are unusually complete in their unit lists, and the arithmetic holds. But the parallel editors
would still diverge, and several values have a producer without a wired path:
- two mechanisms are misnamed: `factTier`, and a port path for a changed magic word that does not exist;
- the island gate's report has no home, and its record lacks the fields the control and the buttons need;
- the optional wealth level has readers nobody is told to rewire;
- the ceiling's value is read before the record that holds it is written;
- the fates and eleven message lines have no encoding or key;
- five facts have two or three stating homes.

There are **26 required changes**: W1–W14 are **major** (a path is missing, or parallel editors would write different
names or shapes); W15–W26 are **minor or moderate**. Section G lists the points checked with no defect.

---

## A. Mechanisms that do not exist as named

### W1 (major). `factTier` cannot hold a recipe value or a creation-slice word

**Evidence.**
- `factTier(entity: Id, path: string)` is per entity (model §2.8, l.1990). The dossier-paths paragraph (l.2243–2244) says:
  "The settlement's own facts — its name, tier word and population — and the typed circumstance slices are carried in
  `Document.dossier` and `Recipe.circumstances` and read there (§7.7), **on no entity**."
- The item nevertheless says:
  - "§2.8's `factTier` reads `dossier` for `Recipe.intent.economyPriority` exactly when …" (items l.22–23);
  - "§2.8's `factTier` reads `dossier` for the creation slice's `magic` exactly when `site.magic` is carried" (items
    l.266–267).
- The model late seats state "the `factTier` rule" for both (items l.207–208, l.381–382).
- The host lock that the item wants ("Set by SettlementForge") is read today from the settlement-facts list. V08 §5.1
  says: "the basic panel shows the dossier-owned intent values — the population, the tier word — locked". It does not
  come from `factTier`.

**Defect.** The model editor would have to widen `factTier` to non-entities, against its own signature and paragraph.
The V09 editor would read the lock from somewhere else. The two would disagree.

**Required change.**
1. In 114 (a) 1, replace the `factTier` sentence with: "The economy priority the creation's absorb carried is one of the
   settlement's own facts (§2.8's dossier paths; §7.7 item 9): read in `Document.dossier.carried` and
   `Recipe.intent`, on no entity."
2. In 115 (a) 1, replace the `factTier` sentence with: "The creation slice's `magic`, where the dossier supplied it, is
   one of the typed slices' dossier-sourced values (§2.8's dossier paths; §7.7 item 9)."
3. Model late seat (both items): STATES the dossier-paths paragraph's list, which becomes "its name, tier word,
   population and economy priority at creation", with "the creation slice's magic word" added beside the typed slices.
   It states no `factTier` rule.
4. Determinism seat: concur with review-rules R7 (item 9's list and layer 1's exception). Item 11's refusal list
   (l.1799) gains "or of the economy priority the dossier supplied at creation". The magic is already covered there as "a
   slice value the dossier supplied".

### W2 (major). The port has no carried home and no absorb path for `site.magic`

**Evidence.**
- V08 §2.3's `CarriedFact` union has `{ k: 'settlement'; name; tierWord; population }` and no site fact (V08 l.556–557).
  So "exactly when `site.magic` is carried" (items l.266–267) has no referent.
- V08 §3.6 (3) builds an epoch's slices as "the new digest's slices (trade, economy, powers, government, `port`)"
  (V08 l.1754). Magic is not among them.
- §7.7 item 6 carries "a typed-slice change" into an epoch (l.1682). The typed slices are items 77–79: trade, economy and
  powers (l.1427).
- `wiring.md` W-DOS-08 (l.68, l.398): V08 rules the site facts, magic included, creation-only ("the site is creation's",
  V08 l.1158), and §3.5 has no diff row for them.
- Against this, item 115 routes a dossier's magic through epochs:
  - (d) 2: "magic `none` in force — a dossier change at an absorb …" (items l.309–310);
  - (d) 3: "a dossier's changed `magicLevel` rides the next epoch's slice (§7.7 item 6)" (items l.313–314);
  - T115-3 bars it.

**Defect.** The path the item names is built by no unit, and V08's standing rule forbids it. The V05, V06 and V08
editors would each improvise one.

**Required change.** Pin ONE path in 115 (d) 2–3, consistent with review-rules R5's single lifecycle, and name its
parts in V08's seat.
- **(A) Recommended: creation-only, like the economy.**
  - `CarriedFact` `settlement` gains `magic?: string` (the lock's and the report's source).
  - A later change is W-DOS-08's `site` diff row. It emits receipt row **F-V8-9** (`element: 'settlement'`,
    `op: 'attr'`; dating arrival; response `none`) and is reported `creation_only`.
  - (d) 2 loses "a dossier change at an absorb"; (d) 3 loses its dossier clause. Magic `none` in force then arises only
    from a standalone timeline slice.
  - V05 §4.4's absorb sentence is restated to match. T115-3's dossier clause is deleted.
- **(B) Live.**
  - V08 §3.5 gains a `site.magic` diff row, receipt row F-V8-9 (arrival; response `epoch`), and §3.6 (3)'s slice list
    gains `magic`.
  - §7.7 item 6's sentence gains "or a change of the magic word".
  - V08 §2.7's creation rule is excepted for magic, with the reason stated.

Either way, the V08 seat names: the `CarriedFact` field, the §3.5 diff row, the receipt row number, and the §2.7
lifecycle row.

---

## B. Wiring both ways: missing producers, consumers or lifecycle rows

### W3 (major). 114's port side is incomplete in V08's seat

**Evidence and defects.**
1. **The diff.** V08 §3.5's settlement diff row compares "population, tierWord, name" only (`wiring.md` l.67, l.379).
   Without a new row, a changed `config.priorityEconomy` is never seen, and F-V8-8 never fires. The item names the
   receipt row (items l.123–125, l.235) but not the diff row.
2. **F-V8-8's type.** `ReceiptRow` needs `element: DossierChange['element']['kind']` and `op: DossierChange['op']`
   (l.1529). The op enum is `add|remove|state|attr|tier|population|prosperity|power|rename|reopen` (l.1527). The item
   pins neither element nor op, so the base's item-13 list and V08's row could disagree.
3. **Lifecycle.** V08 §2.7 ("Lifecycle of every new state field", V08 l.1178–1217) has rows for every digest addition
   ("digest additions (2.5)"). The item gives none for `settlement.economyPriority` (or the optional `site.magic`). The
   migrate cell for an older document's carried facts that lack the value is unpinned. V08's precedent is "filled at its
   next absorb as a declared remap with no event". That would make a recipe value turn dossier-owned at the wrong number
   (review-rules R6).
4. **Notes.** `PortNote.kind` is a closed union (§14 l.223–225), and each note's words are `host.note.<kind>` rows of
   V08 §4.6's table, with its class — event, standing or report — (§14 l.226–227; V08 l.2375 for `unmapped_word`). The
   four new kinds (`economy_absent`, `economy_clamped`, `creation_only`, `magic_absent`) have no V08 §4.6 row and no
   class.
5. **The lived-wealth path.** 114 (e)'s lived wealth arrives by F9 → `EpochInputs.wealthLevel` (items l.115–120). That
   path is W-DOS-02's missing `wealth` diff row (`wiring.md` l.67), routed to V08. The item does not name it, so V08's
   editor may not know that (e) depends on it.

**Required change.** V08's 114 seat adds:
- "§3.5's settlement diff row compares `economyPriority` → `DossierChange { element: 'settlement', op: 'attr' }` → F-V8-8
  (arrival; response `none`; reported `creation_only`)";
- "§2.7's row for `settlement.economyPriority` (create: the adapter; read: the creation half, the diff; persist: the
  carried settlement fact; regenerate: n/a; undo: n/a; migrate: an older carried fact lacks it — filled at the next absorb
  with no event; the recipe keeps its creation value and its tier)" — and the same row for `site.magic?`;
- "§4.6's rows for `economy_absent` (standing), `economy_clamped` (standing), `creation_only` (report) and `magic_absent`
  (standing), with their words and args";
- "W-DOS-02's `wealth` diff row, which (e) reads".

Pin F-V8-8's element and op in (e) itself.

### W4 (major). The island gate's report has no home

**Evidence.**
- §5.4's `GenerationReport` (01-s5 l.245–260) has no island field.
- `Diff.reason` is `FailureClass | ReportCode`, and `ReportCode` is a closed list (l.262) with no island code.
- V05 §3.2 (1) "reports `islands: off`, `gated: rung` or `gated: dossier magic`" (V05 l.842–843) with no field.
- V05 §1b's `skyGate` row feeds "the report" (V05 l.353).
- No V09 or V10 row renders any of it (receipt `rw-receipts.txt`: no "gated:" in V09 or V10).
- Item 115 makes the report a consumer of every clause: "`islands: off` for (1)–(2), else `gated:` followed by every
  failing clause …, the detail naming each value and its source" (items l.291–293). A failed rising at an epoch "reports
  `gated`" (items l.305–306). Yet both items say "§5: no part" (items l.221, l.392).

**Defect.** Three editors (determinism §5.4, V05, V09) would each invent the field. The epoch case has no home at all.

**Required change.** In 115 (c), pin:
- "The gate's outcome is one `GenerationReport.requestedVsBuilt` entry `{ subject: 'layers.islands', requested: 'on',
  built: 'none', reason: 'islands_gated' }` — `ReportCode` gains `islands_gated`, args the failing clauses with value and
  source — and, with the setting off, none";
- "an epoch's failed rising is counted in V06's `EpochReport` as `islandsGated: number`, with one chronicle line";
- "V09's rows `report.islands.gated` ('Floating islands are on, but {clauses}.') and the clause-detail row".

Units:
- determinism late seat **STATES** §5.4's `ReportCode` row (replace "§5: no part");
- V05 states the outcome's args;
- V06 states the `EpochReport` field;
- V09 states the rows.

### W5 (major). `SkyGate` lacks the value and source per clause, and has no callable form for the panel

**Evidence.**
- (c) declares `SkyGate { open: boolean; failed: SkyGateClause[] }` "derived at S7b (5) and at each epoch's rising,
  never stored" (items l.288–290).
- Its listed readers include "the Islands control's state". The panel sets that state with no generation run.
- (d) 5 needs to know, per failing clause, whether it is "the map's to change" or "the dossier's" (items l.321–325).
- The report detail names "each value and its source" (items l.292–293).
- `refuse.islandsDossier` interpolates `{magic}` and `{economy}`.

**Defect.** A list of clause names cannot drive any of these. Each editor would re-derive the source separately.

**Required change.** Replace the record with:

> `SkyGate { open: boolean; failed: { clause: SkyGateClause; value?: string | number; source: 'map' | 'dossier' | 'rung' | 'preset' }[] /* every failing clause, in (c)'s order */ }`, computed by one pure function `skyGate(recipe, rung, magicInForce, carried?)` (V05 §3.2 (1); exported by `@plat/sky`), which S7b (5), `IslandEpochStep`, §7.8's control state, the report and the clerk all call.

Pin the mixed-source outcome in (d) 5 (concur review-rules R11).

### W6 (major). The now-optional `Intent.wealthLevel` has readers nobody is told to rewire

**Evidence.**
- `Intent.wealthLevel: number /* 0–1 */` is required today (l.1474). The item makes it optional, derived as
  `economyPriority ÷ 100` (items l.26–27).
- Its readers read the raw field:
  - §4.2 S0 (pipeline l.249: "the intent's `wealthLevel`");
  - II.7.1 (II.7 l.32–36: "`wealthLevel` the intent's town-wide wealth control in [0, 1] (§7.7's expansion; default
    0.5)");
  - item 71's class mix (pipeline l.2543–2545: "`wealthLevel` the intent's (§7.7; …)");
  - DR8 (l.1748);
  - V05 §3.3's fallback (V05 l.911: "`w` the intent's `wealthLevel`");
  - the landed V04 (§1b.5 l.389; T-V4-19 l.2662);
  - V07 §3.2 (3);
  - V12 `Level.intent.wealthLevel`.
- Surprise me "draws every intent field from its declared range" (l.1409–1411). It would draw the optional
  `wealthLevel` too, which then sets the wealth level explicitly (and, under (b) 2, the floor).
- The pipeline seat only **REFERENCES** II.7 ("its banding already clamps", items l.213).

**Required change.**
1. In 114 (a) 2, define it once: "**the wealth level in force** — the recipe's `wealthLevel` when set, else
   `economyPriority ÷ 100`; at an epoch, the `EpochInputs.wealthLevel` installed past `dial.hysteresis`. Every reader of
   the wealth level reads the wealth level in force."
2. Pipeline late seat **STATES** it at:
   - §4.2 S0 l.249;
   - II.7.1 l.35, whose "default 0.5" becomes "derived from the Economy, 0.5 at its default 50" — so II.7 moves from
     REFERENCES to STATES;
   - §4.7 S10b (2) l.2544.
3. Determinism seat: DR8's input reads "the wealth level in force". Surprise me "draws `economyPriority` in the wealth
   level's place in its draw order, on `intent.surprise`, and leaves `wealthLevel` absent" — so no draw moves.
4. The V04, V05, V07 and V12 lines read "the wealth level in force" (each a one-word change in its seat).

### W7 (major). The ceiling's value is read at S2 before S6 writes its record

**Evidence.**
- (c) 1 folds S2's shares at `at` (items l.63–66).
- (d) makes `FieldBands.ceiling` "produced by S6 at generation" and lists S2 among no readers (items l.104–108).
- In an epoch the position is "installed in the epoch's prelude before S6" (items l.117). V06's prelude is step 1,
  before `demand` (S2) at step 3 (V06 l.1030–1032).

**Defect.** Nothing produces `at` for S2. A pipeline editor could make S2 read a record that S6 has not yet written —
circular at generation, and stale at an epoch.

**Required change.** In (b), pin:

> the position is the pure function `ceilingAt(economyPriority, BandSet.ceiling, wealthLevelInForce, bandSet)` (§4.5), evaluated by S2 — and, at an epoch, by the prelude, before S2's delta demand — and recorded by S6 in `FieldBands.ceiling` (absent when the position is the top rank, concur review-rules R17); S2's fold and the prelude call the function, every reader after S6 reads the record, and load recomputes both.

### W8 (major). A ceiling that moves at an epoch must rewrite the cuts

**Evidence.**
- The cuts move "only by an explicit `setAttr` … or by an epoch" (§4.5, pipeline l.1235–1236).
- §4.11 re-bands each block "against the town's `FieldBands`" as they stand (pipeline l.2947–2950).
- (c) 2 sets every cut at or above the highest allowed band's upper boundary to 1 (items l.68–71).
- (e) promises that a lived word that rises "grows richer than its founding allowed" (items l.119–121). That needs the
  cuts at 1 to reopen. Yet the record is written only "by every epoch that writes the cuts" (items l.106), and nothing
  makes a ceiling change write them.

**Defect.** A lifted ceiling would leave its cuts at 1, so no plot could reach the reopened band, and the record would go
stale.

**Required change.**
- (e) adds: "an epoch whose position differs from `FieldBands.ceiling` rewrites the cuts from its folded demand and the
  record, at §4.11 step (a)".
- The pipeline late seat states it in §4.11; V06 row 4 (`field`) cites it.
- T114-8 adds: "at the lifting epoch the reopened band's lower cut is below 1".

### W9 (major). Five facts have two or three stating homes

**Evidence and required change.** In each case one unit keeps STATES; the others change to REFERENCES.

| fact | stated today by | one home | the others |
|---|---|---|---|
| the ceiling's default rows and the parity row | pipeline §4.5 (items l.210–211) and V11 row 6 (items l.240–241) | §4.5, the band set's home: V11 row 6's "rows home" column reads §4.5 (V11 l.867) | V11 registers the cell and its stamp |
| the gate cells' values (`['high']`, 75) | II.6 (items l.384), V05 §2.4 (l.399) and V11 row 56 (l.416–417) | V05 §2.4, `IslandRule`'s declaring home: II.6 says "`IslandRule` … is V05 §2.4's" (II.6 l.101–102) | II.6 names the clauses and cites the cells; V11 registers the stamp |
| DR27's inputs | determinism (l.387), V05 §4.4 (l.402) and V08 (l.411) | the derivation table (determinism) | V05 and V08 cite DR27 |
| the report reasons and lines | II.6 ("the report reasons", l.385) and V05 ("the report lines", l.398) | V05 §3.2 (1) (with W4's code) | II.6 cites |
| the port bars | §13.2's T114-11 and T115-2, and V08's "its T-V8 bars" (l.237, l.411) | §13.2 | V08 extends only T-V8-20's ignore clause, citing T114-5, T114-7, T114-11 and T115-2 |

### W10 (major). The parity presets: which ones, and how clause (2) is read

**Evidence.**
- §7.6 names **five** parity presets — `MFCG`, `FTG`, `VG`, `NG` and `FM` — which "set every `extension` cell's chance
  or weight to 0 and its option off … except `FM`, which zeroes none" (l.1318–1322).
- Cells carry `presets?` entries (l.1285). V11 says "the other tables' entries are their owners'" (V11 l.424).
- A list of `{economy, band}` rows is not a chance, weight or option, so zeroing cannot produce "the single row
  `{0, top}`".
- (b) 4 names only `MFCG` and `FTG` (items l.61–62). T114-1 says "the parity presets" (l.179).
- For 115, clause (2) "the recipe is not a parity preset's" (items l.284–285) has no named input. The only candidate,
  `Recipe.presetId`, is "provenance only: the delta already holds the preset's values" (model l.2300). The zeroing presets
  already hold the setting off by their option entry (J-V5.25), so clause (2) either duplicates clause (1) or reads a
  provenance field.

**Required change.**
1. In (b) 4, write: "the `ceiling` cell of `prosperity.bands` carries explicit `presets` entries
   `[{ economy: 0, band: <the set's top band> }]` for `MFCG`, `FTG`, `VG` and `NG` (`NG` by `MFCG`'s resolution), written
   in §4.5 and compiled by V11; `FM`, building-scope, carries none". T114-1 names the four.
2. In 115 (c), either:
   - delete clause (2) and `'parity'` from `SkyGateClause` (the preset's option entry makes clause (1) fail, reported
     `islands: off`); or
   - name its input and amend §2.9's `presetId` comment ("read by II.6's parity clause"), stating what happens when an
     author turns the setting on under a parity preset.

### W11 (major). The islands setting's path in the recipe is now load-bearing and unpinned

**Evidence.**
- `Recipe` (model l.2294–2305) has no `layers` field. `islands.count` is `recipe.params['islands.count']` (II.6 l.74).
- §7.8's registry id is `recipe.layers.islands` (l.1954). V05 §4.1 and the item write `adjust('layers.islands')` (items
  l.414).
- V10's creation mode encodes into the `Blueprint` (V10 l.2441), which has no islands field (§4.2 S0 l.207–225).
- T115-9 exercises exactly that path ("… with floating islands sets … the setting on", items l.376–377).
- Draft-notes gap 3 says the items "do not change that path". But 115's clause (1), the Islands control and the clerk
  now all depend on it.

**Required change.**
- Model late seat **STATES** (115): "`recipe.layers.islands` is `Recipe.params['layers.islands']` ('off' | 'on'), as
  `islands.count` is `recipe.params['islands.count']`".
- Pin one `adjust` param spelling for §7.8, V05 §4.1 and V10's encoder (`layers.islands`).
- V10's seat adds its §4.1 encoder row: `islands` → the blueprint's params delta (creation mode), `adjust('layers.islands')`
  (edit mode).

### W12 (major). §7.1's binding and edit-target rows are not in the determinism seat, and the §7.4 rows are misdirected

**Evidence.**
- §7.1's binding table, "the one home", checked by T101-1, T-V9-12 and T-V10-1: "T1 `intend` | `adjust` (intent,
  recipe, layers, islands, the sewer family, ruins, a standalone neighbourhood's outline)" (l.415). The Magic control's
  `adjust('circumstances.magic', v)` (items l.271) targets none of these.
- The edit-target row "fields | … `setAttr` on the town's `FieldBands`" (l.310) — and "Derived below names attributes
  written only by the paths given" (l.286–288) — must list `FieldBands.ceiling` as derived, or a `setAttr` on the record
  edits it.
- The early-parameter list (l.150–154: "seed, rung, …, wealth level, the recipe's pack list") lacks the Economy and the
  Magic.
- §7.4 is "Lifecycle of every **edit kind**" (l.902): its rows are event kinds. The seat's "§7.4's lifecycle rows for the
  economy priority and `FieldBands.ceiling`" (items l.218–219) names rows that cannot exist for a derived record.

**Required change.** The determinism late seat adds:
- l.415's T1 row gains "the creation slice's `magic` (the Magic control)";
- l.310's row gains "`FieldBands.ceiling` derived (no edit kind; a `setAttr` naming it bends, W14 (2))";
- l.152's list gains "the Economy, the Magic".

Replace the §7.4 clause with:
- "the `regenerate / adjust / re-derive from Sk` row's create cell names the Economy (from S0) and the Magic (from S2)";
- "the `placeGate / quarter / …` row's regenerate cell names the held fates (W13)".

`FieldBands.ceiling`'s field lifecycle is (d)'s text, homed in §4.5 and §2.5.

Also pin the registry ids in (a) 4 and 115 (a) 2: `intent.economyPriority` and `circumstances.magic` (the timeline's
first entry). V10's edit mode takes its `param` from the registry (V10 l.2442).

### W13 (major). The new fates have no encoding

**Evidence.**
- `EditFate.fate` ∈ `kept|carried|orphaned|discarded`, with a free `reason: string` (l.39).
- V09 renders fates by kind (`fate.kept` …, l.1752–1755) or by specific `fate.*` rows (l.1791–1792).
- The items introduce `held above the prosperity ceiling`, `held against its magic` and `held against its economy`
  (items l.91, l.317–318) as if they were fate kinds.
- The model they copy, V05's `held against its supply`, has no V09 row either (receipt: no "held against" in V09).

**Defect.** The determinism editor (§7.4), V05 (§4.2) and V09 (rows) would pick three different encodings.

**Required change.** Pin in both items: "each is `EditFate { fate: 'kept', reason: 'held_above_ceiling' |
'held_against_magic' | 'held_against_economy' }` at the dry run, and a standing listing in the report or epoch report;
V09 rows `fate.held.ceiling`, `fate.held.magic`, `fate.held.economy` (and `fate.held.supply` for V05's existing one)".
Add the fate to 114's determinism seat too; today only 115's seat has §7.4 fates.

### W14 (major). Eleven message lines have text or placement but no key

**Evidence.** Keys are dotted `MsgKey`s (V09 l.712). Every button that commits names an event form (V09 §4.9's
`commit(event:<form>)`, l.1695–1697). The items key only `info.ceiling`, `bend.fill.ceiling`, `button.economyUp`,
`info.islandsGated`, `refuse.islandsDossier`, `refuse.islandsNoMagic`, `info.islandsNone`, `button.magicHigh` and
`button.economyHigh`.

**Required change.** Pin these in the items, homed in V09 and cited by V05, V06 and V10:
1. `info.ceiling`'s second sentence ("Its wealth ({word}) lifts the cap to {band}.") → its own key, `info.ceiling.wealth`
   (one row, one sentence, V09 §4.9's rule).
2. The bend of a `setAttr` on `FieldBands.ceiling` ("The ceiling follows the Economy", items l.108–109) →
   `bend.ceiling.follows`, with `button.openEconomy`.
3. T1's readout "Richest: {band}" (l.237) → `info.economy.richest`.
4. The legend's closing line "richest: {band}" (l.148–149) → `legend.prosperity.richest`.
5. The report panel's "Prosperity ceiling: {band} ({f}) — economy {economy}" (l.149–150) → `report.ceiling`.
6. The advanced Wealth level's "from the Economy" (l.28–29). V09 §4.14's layer column knows only default, preset, your
   preferences, this town and SettlementForge (V09 l.2230). → `layer.fromEconomy`.
7. The island report lines (W4) → `report.islands.gated` and `report.islands.clause`.
8. The host-frame line of review-rules R6 → `host.economyAtCreation`.
9. The event forms behind the three buttons:
   - `event:economyTo` = `adjust('intent.economyPriority', n)`;
   - `event:magicHigh` = `adjust('circumstances.magic', 'high')`;
   - `event:economyHigh` = `adjust('intent.economyPriority', 75)`.

---

## C. Unit coverage: parts missing from the unit lists

### W15 (moderate). DR rows' inputs must be digest fields

**Evidence.**
- `DerivationRow.inputs: string[] /* digest fields, in the order read */` (l.1515).
- The determinism seat gives DR7 "input: the ceiling" (items l.217). The ceiling is not a digest field.
- DR9 derives "each instance's class and band" (l.1749). Under (c) 1, an institution's band is read at the highest
  allowed band, so it now depends on the economy priority, which DR9 does not list.
- DR36 and DR37 (the replay, items 114 (f)) also read the recorded priority.

**Required change.** DR7's, DR9's, DR36's and DR37's inputs gain `settlement.economyPriority`. DR7's "the ceiling"
becomes that field.

### W16 (moderate). The owner rules' run-time checks are §5.3's, which both items exclude

**Evidence.**
- §7.7 item 11: the coherence bars are "checked at run time by §5.3's coherence rows" (l.1786–1788).
- §5.3's sky row checks the supply ("every island in state `floating` has a supported area > 0 unless held", 01-s5
  l.196).
- The character row checks the band range (l.225).
- Neither checks the two new laws. Both items say "§5: no part".

**Required change.** Determinism late seat **STATES** two §5.3 rows:
- "no household, block band, plot band, `bandRange` end or occupants' band above the highest allowed band except a held
  entity (stage-end S6, S10a, S11; each `epoch`)";
- the sky row gains "no island raised or refloated by rule under a failed gate; under magic `none` in force every
  unheld island's target 0".

### W17 (moderate). Table-limit edges for the two new cell sets are missing

**Evidence.**
- §10.2's "Rows at their limits (EP-18)": V11's compiler clamps a row to the nearest lawful value or refuses it
  (pipeline 02-s10 l.410–415).
- T27-1 bars that "every band-keyed table resolves a row".
- `BandSet.ceiling` names band ids and economy knots. `IslandRule.gate` names words and a number.
- V08's `wealth` row, which the floor now reads standalone, names band ids too.
- (i) and 115 (f) list no edge for an edited or pinned table at its limits.

**Required change.** Add an edge with fallback and test to each item:
- `ceiling` empty → no ceiling;
- unsorted or duplicate knots → sorted, the later row winning, named;
- a knot outside [0, 100] → clamped;
- a band the set lacks → refused at compile, an edit bent, and the floor skipping a `wealth` row whose band the set lacks;
- `gate.magic` empty → no island can rise, reported;
- a word outside none, low, high → refused;
- `economyMin` outside [0, 100] → clamped.

Homes: the pipeline late seat (EP-18's list) and V11's compiler bars (T-V11-2).

Also: `BandSet` is named but declared nowhere (pipeline l.1203; V11 row 6; receipt: no `interface BandSet`). The pipeline
seat declares at least `BandSet.ceiling`'s cell type where it states (b).

### W18 (moderate). The advanced panel groups by consuming stage, so "beside Islands" cannot hold

**Evidence.**
- V09 §4.14: every parameter is "grouped by consuming stage ('Site', 'Programme', 'Streets', 'Districts', …)" (V09
  l.2228–2230).
- The Magic consumes at S2 ("Programme"). Islands consume at S7b.
- "The advanced panel's fantasy group" exists nowhere (concur review-rules R20).

**Required change.** Pin one of two:
- the Magic row sits in its stage's group, and `info.islandsGated`'s `button.magicHigh` is the link between them; or
- a declared group exception, with a `group` field added to §7.8's registry row and V09 §4.14's rule.

### W19 (moderate). `Level`'s magic is unpinned

**Evidence.**
- V12 §2.7b: `Level.intent?: { wealthLevel?: number }` and no circumstance (V12 l.753).
- The items write "`Level.intent.economyPriority`" (pinned) and "`Level`'s magic" (not pinned, items l.418).
- V05's P0 run and V12's M6-sky seeds both need it.

**Required change.** Pin `Level.intent?: { wealthLevel?: number; economyPriority?: number }` and
`Level.magic?: 'none'|'low'|'high'`.

### W20 (moderate). The scope seat misses four rows

**Evidence.**
1. §0 has no term index. §0.2 is the item index: one row per owner item with its homes and tests, up to 113 (03-s0.md
   l.106–117). "The §0 index terms (economy priority, prosperity ceiling, highest allowed band)" (items l.224–225) points
   at nothing. The item rows for 114 and 115 are not named.
2. §14's T1 tool row still reads "drag the wealth slider" (07-s14.md l.421). BCR-V9-2 asks for this change, but a base
   seat must make it.
3. §1.2 is "The one-click default, stated once" (05-s1.md l.102). It must carry "the Economy at 50 (the wealth level
   derived 0.5) and the Magic None" (concur review-rules R21 on substance; the home is §1.2, not §13.2).
4. The judgment rows have no ids, although volumes will cite them. draft-notes gives D114-1 to D114-13 and D115-1 to
   D115-10.

**Required change.** The scope seat **STATES**:
- §0.2's rows 114 and 115 (homes; T114-1 – T114-13, T115-1 – T115-9; principal homes §4.5 and II.6);
- §14's T1 row ("drag the Economy slider");
- §1.2's two defaults;
- the ids J-A114.41 – J-A114.53 and J-A115.41 – J-A115.50, pinned in the item.

Name the §16 milestones where each lands (the Economy with T1 at M1; the fold at M2b with the band set; the gate with
M6-sky), or state that the prices do not move.

### W21 (moderate). The landed V04 needs a late seat (concur review-rules R15)

**Evidence.** The pointer targets exist in the landed text: F2 (`undergroundOffset`, new/volumes/V04 l.1162–1163) and C5
(l.1863). The landed V04 also reads the wealth level at §1b.5 (l.389) and T-V4-19 (l.2662).

**Required change.** V04's late seat carries 114's one pointer, and reads "the wealth level in force" at those two lines
(W6). V03 has no part in either item.

---

## D. Clerk and oracle wiring

### W22 (minor). The lexicon cannot be conditional per row

**Evidence.**
- `lexicon: { words; field; value }[]` has one field per row (V10 l.828).
- The item wants the wealth words to set `economy` standalone and `wealth` where the Economy is dossier-owned (items
  l.154–155).
- V10's T1 encoder (l.2441) maps `wealth` → `intent` and has no `economy`.

**Required change.** Pin:
- the six wealth rows' field becomes `economy`, value × 100;
- V10 §4.1's T1 row: `economy` → `intent.economyPriority` (creation) or `adjust('intent.economyPriority')` (edit), and,
  where the Economy is dossier-owned, written as `wealth` = economy ÷ 100.

V10's seat adds §4.1's row.

### W23 (minor). `FieldDrivers.ceiling` has no named producer

**Evidence.**
- `ProsperityField.drivers(points): FieldDrivers` is §4.5's oracle (pipeline l.1152–1156).
- V10 declares `FieldDrivers` (V10 l.1138), and the item gives V10 the field (items l.147).
- No seat makes the oracle fill it.

**Required change.** Pipeline late seat: "`drivers()` fills `ceiling` from `FieldBands.ceiling` when the points' band is
the highest allowed band and it lies below the top".

---

## E. Tests: ids and bars

### W24 (minor). T114-4 would fail as written

**Evidence.**
- T114-4 bars that economy 20 and 50, with the wealth level held equal, "have the same field cell for cell" (items
  l.184–185).
- Pass 2 adds kernels at the institutions S7b (1) placed "by capacity" per band (pipeline l.1147–1149, l.1258–1264).
  Under (c) 1 an institution's band is clamped, so its district, and its pass-2 kernel and dial term, may move.
- Pass 1 moves where the shanty trigger (the roster's average band, l.1121–1124) flips.

**Required change.** "Pass 1 equal cell for cell (except where the shanty trigger's verdict differs, reported), and every
driver term of pass 2 but the placed institutions' and noxious kernels".

### W25 (minor). "Byte-identical" needs its object

**Evidence.** New recipes carry `economyPriority` (or none) and no `wealthLevel`, while today's carry `wealthLevel` 0.5.
The documents differ even where the model does not. T114-1 says "byte-identical to today's" (items l.177–178).

**Required change.** Write "the model digest and every stage digest (§6.2, §13.3) identical". Pin "the one-click recipe
writes no `economyPriority` (it reads 50)".

### W26 (minor). The island fixtures follow two rules

**Evidence.**
- T10-1 moves to "magic high, economy 100" (items l.377). That derives the wealth level 1.0, so its clause "a town supply
  below the threshold gives 0 islands" is hard to reach.
- T15-1 and T-V5-2 move their levels from `wealthLevel` 0.5 and 1 to economy 75 and 100, that is 0.75 and 1.
- V05's P0 run and V12 instead keep `wealthLevel` explicit (items l.404, l.242–243).
- T114-12 and T115-5 name "item 113 (g)'s city-to-village fixture" at a set economy and magic high, but no fixture of
  that form exists.

**Required change.**
- One rule for every island bar: "magic high, economy ≥ 75, `wealthLevel` set explicitly at the bar's old level" (T10-1
  at 0.5; T15-1 and T-V5-2 at 0.5 and 1).
- Name the history fixture: the standalone blueprint history option of item 113 (a) 1, or V12's derived-dossier form
  (`'<dossier>@economy<e>+magic<m>'`).

**Test-id uniqueness: no defect.** T114-1 – T114-13, T115-1 – T115-9, J-A114.* and J-A115.* occur nowhere in `docs/` or
`research/` outside this work folder. Item 116 uses T116-n. The ids follow §13.2's per-item form (T71-1, T73-7).
F-V8-8 is free: the base names F-V8-1 – F-V8-7 (l.1529), and item 116 mints no F-V8 row (receipt `rw-g116-cross.txt`). If
W2 takes (A) or (B), pin F-V8-9 for the magic word in the item.

---

## F. The required changes, in one list

| # | change | unit(s) |
|---|---|---|
| W1 | drop `factTier`; the economy priority joins §2.8's settlement facts, and the magic the typed-slice values; item 11's list gains the economy | model, determinism |
| W2 | pin the magic word's lifecycle (recommended: creation-only, carried `settlement.magic?`, F-V8-9, `creation_only`); delete the absorb route or build it whole | 115 (d); V08, V05, V06 |
| W3 | V08: settlement diff row for `economyPriority`; F-V8-8 = settlement/`attr`; §2.7 rows with migrate; §4.6 note rows and classes; cite W-DOS-02 | V08, 114 (e) |
| W4 | the gate's report home: `ReportCode` `islands_gated` in `requestedVsBuilt`; `EpochReport.islandsGated`; V09 rows | determinism §5.4, V05, V06, V09 |
| W5 | `SkyGate.failed` carries clause, value and source; one pure `skyGate(…)` function for every reader | V05, determinism §7.8, V09 |
| W6 | define "the wealth level in force"; rewire §4.2 S0, II.7.1 (STATES), §4.7 S10b (2), DR8, Surprise me, V04, V05, V07, V12 | pipeline, determinism, volumes |
| W7 | `ceilingAt(…)` is the pure function S2 and the prelude call; S6 records it | pipeline, V06 |
| W8 | an epoch that moves the ceiling rewrites the cuts and the record; T114-8 bar | pipeline §4.11, V06 |
| W9 | one STATES per fact: ceiling rows §4.5; gate cells V05 §2.4; DR27 determinism; report V05; bars §13.2 | pipeline, V05, V08, V11, scope |
| W10 | parity presets MFCG, FTG, VG, NG carry the ceiling entry, FM none; clause (2)'s input named or the clause dropped | pipeline §4.5, V11, II.6, V05 |
| W11 | `recipe.layers.islands` = `Recipe.params['layers.islands']`; one `adjust` spelling; V10's creation encoder | model, V05, V10 |
| W12 | §7.1 binding row (T1 + circumstances), edit-target row (`FieldBands.ceiling` derived), early-parameter list; §7.4 rows redirected; registry ids pinned | determinism |
| W13 | fates are `kept` with reason codes; V09 `fate.held.*` rows | both items; determinism, V05, V09 |
| W14 | keys for the eleven unnamed lines and three event forms | V09 (cited by V05, V06, V10) |
| W15 | DR7, DR9, DR36 and DR37 inputs gain `settlement.economyPriority` | determinism |
| W16 | §5.3 rows for the ceiling and the gate | determinism |
| W17 | table-limit edges for `BandSet.ceiling`, `IslandRule.gate` and the `wealth` row's bands; declare `BandSet.ceiling`'s type | pipeline §10.2, V11 |
| W18 | the Magic control's group in the stage-grouped advanced panel | V09, determinism §7.8 |
| W19 | `Level.intent.economyPriority`, `Level.magic` | V12 |
| W20 | scope: §0.2 rows, §14's T1 row, §1.2's defaults, J ids, §16 placement | scope |
| W21 | V04 late seat (concur R15) with the wealth-level wording | V04 |
| W22 | lexicon field `economy`; V10 §4.1's encoder row | V10 |
| W23 | `drivers()` fills `FieldDrivers.ceiling` | pipeline |
| W24 | T114-4 restated (pass 1; pass 2 but the placed kernels) | scope |
| W25 | "byte-identical" = model and stage digests; the one-click recipe writes no economy | scope |
| W26 | one fixture rule for island bars; name the history fixture | scope, V05, V12 |

---

## G. Points checked with no defect

- **Names that exist.** The following are all present as the items use them:
  - `Intent.wealthLevel`, `Recipe.intent`, `DistrictIntent.wealth` / `HoodRecipe.intent`, `CircumstanceSlice.magic`,
    `DossierDigest.settlement` and `.site`, `PortNote`;
  - `FieldBands`, `FieldBands.middle`, `bandRange`, J-A72.50, `RungProfile.granularity.joinMaxDelta`,
    `IslandInstitution.requirementBand`, `PlacementCriteria`'s `prosperityBands`, `undergroundOffset`,
    `undercityOffset`, the shanty trigger, `dial.hysteresis`, `builtBand`, receipt F9;
  - `host.locked`, `bend.fill.band`, `refuse.islandsRung`, `button.cityUp`;
  - `recipe.params['islands.count']`, `island.place`, `raiseIsland`, `refloatIsland`, `IslandEpochStep`, V05 §3.2 (1),
    (3), (4), (5) and §3.15 (4), (5);
  - J-V5.10, J-V5.19, J-V5.25, J-V8.45, J-V8.47, BCR-V8-25, T-V8-20, T-V10-10, T13-1, T10-1, T15-1, T73-7, T71-1,
    F-DISPATCH, `H_top`, `manorBlockShare`;
  - the 35 births and 12 after-tick fixtures, `trajectory.slice`, V11 rows 6, 56, 63, 89, V12 §1.
- **Genuinely new names.** Every new name the items pin has a stated unit, apart from the gaps above (W4, W5, W13, W14,
  W19). The drafters' receipt (`tmp/names-check.txt`) and this review's re-grep (`rw-names.txt`) find none of them in
  use. "Highest allowed band" appears only in item 116's draft, which reads it the same way.
- **`Intent.economyPriority`'s own lifecycle** ((d), items l.109–112) is complete, and so is `FieldBands.ceiling`'s
  (produce, read, persist in the model digest, recompute on load, restore by undo, absent read as none). Subject to W7,
  W8 and review-rules R17.
- **Export.** The Economy rides the recipe's intent into `.plat`, the JSON schema, the skeleton ("the recipe's intent",
  §11 l.25), permalinks (§6.4's CBOR intent) and host door 1 (§11.4). `FieldBands.ceiling` rides the model. No export
  row needs to change. The metric GeoJSON's `prosperity` attribute is the value, which the item leaves untouched.
- **Kernel.** No part. **Rendering for 115.** No part (the view toggle, §8.4, is unchanged).
- **Rendering for 114.** §8.2 is the right home. The rule "a theme's legend key lists only the values drawn" is there
  (01-s08 l.522), and V09 §5.4 cites it (V09 l.2974). Only the closing line's key is missing (W14 (4)).
- **V02, V03, V07, V01, V06.** V02's single pointer is enough: its significance shift reads rows along the value, which
  (c) 4 clamps. V03's rooms follow the occupants' band, so it has no part. V07's fold on `bandShares` and V01's parts
  are correctly assigned (subject to W6). V06's prelude runs before `demand` (V06 l.1030–1032), so the installation
  order is right (subject to W7).
- **The arithmetic.** The fold's shares sum to 1. `at = 2 + 3·min(e, 50) ÷ 50`. `button.economyUp` gives 17, 34 and 50.
  Economy 0 leaves 97.8 % of households in `modest`. The standalone floor never binds with the wealth level derived.
- **Item 116 interplay.** Item 116 reads 114's highest allowed band and claims DR41. The two items claim no DR row, so
  there is no numbering collision.
