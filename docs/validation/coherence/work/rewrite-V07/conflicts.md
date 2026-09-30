### DIC-06 (determinism; minor) — FIX

* claim: The tool ids T1-T12 share the T-prefix namespace with test ids (T8-1 ... T8-3, T12-1, T19-4, T65 fixtures, T73-8): "T8" and "T12" read as either a tool or an item's test group (§16 also cites "item 101's T2-T8" for tools). Principle (4) requires ids unique across the set.
* *Where:* ['§7.1 twelve tools', '§7.8 T1 intend', '§13.2 test ids']
* **Ruling:** Resolved by canon ID-TOOL: bare T1–T12 are item 101's tools, always written with the tool word at first use in a paragraph (T8 `fill`); an item's bars are always written with their number (T8-1, 'the T8-n bars'), never a bare T8.
* *Basis:* owner item 101 names the tools (owner rule > base); canon ID-TOOL. *Units:* determinism, scope, V07, V09, V10.

### MC-11 (model; ) — FIX

* statement: §2 uses seven types that are declared only in a volume, never in the base: Rung (V07), TableId (V11), Outfall (V04), Segment (V10), TypedBoundary and FabricStrategyId (V01), DriftBounds (V02). A base record depending on a volume-declared type inverts principle (1) (the base owns what the base builds; Rung alone is used 24 times in the base).
* *Where:* ['§2.2 PlatKey/Recipe.rung (Rung)', '§2.8 SliceRef.table / Recipe.tablePins (TableId)', '§2.3 Terrain.outfalls, §2.7 Tunnel.outfall (Outfall)', '§2.6 BuildingInput.access (Segment)', '§2.5 District.boundary (TypedBoundary), District.fabric (FabricStrategyId)', '§2.6 BuildingInput.drift, Building.dr…
* **Ruling:** Every type a base record uses is declared in the base: Rung (§1.1 with RungProfile), TableId (§7.6), Outfall (§2.3), Segment (§2.1), TypedBoundary and FabricStrategyId (§2.5, with f item 505's @plat/model additions), DriftBounds (§2.6, f item 385 BCR-V2-08 types it). The volumes that declared them cite the base declaration; their fields and meanings unchanged.
* *Basis:* principle (1): the base owns what the base builds; f items 385, 505. *Units:* model, V07, V11, V04, V10, V01, V02.

### V02-ICONF-1 (vol-V01-V02; minor) — FIX

* claim: V02 hosts the composition.classFamily table in composition.json and states 'volume 7 keeps this table as the one source of the village classes' composition keys (J-V7.82)': the table's canonical home is stated as another volume's while its rows are written here (single source ambiguous).
* *Where:* §3.10.5 classFamily ownership
* **Ruling:** composition.classFamily's home is V02 §3.10.5 (composition.json); its v.-keyed rows are the one source of the village classes' composition keys; V07 cites the table and names no second source.
* *Basis:* single source (1). *Units:* V02, V07.

### V07-ICONF-1 (vol-V07-V08; major) — FIX

* claim: The law 1 + round(log2(P / 40)) clamped 1-4 gives 4 from P ≈ 227 (log2(P/40) >= 2.5), not 'from 320' as the table row says (320 is where log2 reaches exactly 3); the value at 228-319 people differs between the two statements (4 by the law, 3 by the row's gloss).
* *Where:* §2.2 neighbourTracks row (line 683) vs its law (lines 626, 661)
* **Ruling:** The neighbourTracks gloss reads '4 from about 227 people' (the law 1 + round(log2(P ÷ 40)), clamped 1–4, governs).
* *Basis:* the law is the rule; its gloss follows. *Units:* V07.

### V07-ICONF-2 (vol-V07-V08; minor) — FIX

* claim: §3.6 (5) glosses the centrepiece pond as 'a small decoration pond inside the green, the village pond', while §2.4 and §3.2 (8)(d) define 'the village pond' as the L0 pond VS1 carves at the lowest hollow within 150 m of the heart (pins.pond 0.4) and the centrepiece pond as a separate uncarved 'pond' part sited after the L0 batch; one name for two different ponds with different siting, carving and draws.
* *Where:* §3.6 (5) vs §2.4 Decorations and §3.2 (8)(d)
* **Ruling:** §3.6 (5)'s centrepiece pond drops 'the village pond' (the uncarved part of §2.4); 'the village pond' names only VS1's carved L0 pond.
* *Basis:* one term per concept (2). *Units:* V07.

### V07-ICONF-3 (vol-V07-V08; minor) — FIX

* claim: The cap 1 + floor(households / 25) reaches 6 at 125 households, i.e. about 563 people at the 4.5 mean household (§3.2 (3) H = round(P / 4.5)), not 'from 625' (139 households); the worked gloss disagrees with its own law for 563-624 people.
* *Where:* §3.10 VS8 ends ('1 at 40 people, 2 at 200, 6 from 625') vs the cap law
* **Ruling:** VS8's gloss reads '6 from about 563 people' (the cap 1 + floor(households ÷ 25) at H = round(P ÷ 4.5) governs).
* *Basis:* the law governs. *Units:* V07.

### V07-ICONF-4 (vol-V07-V08; minor) — FIX

* claim: (9v) sites an epoch's new nucleus 'at least 0.8·R_s from the existing ones', while the polyfocal rule whose cells §2.2a says (9v) reads ('polyfocal ... // §3.2 (4), §3.12 (9v)') spaces nuclei at max(polyfocal.spacingMinM = 250 m, spacingShareRs x R_s); the 250 m floor is dropped at epochs, so a small village's new nucleus may sit closer than at creation (a thorp's R_s about 100 m gives 80 m).
* *Where:* §3.12 (9v) vs §3.2 (4) and §2.2a polyfocal row
* **Ruling:** (9v) reads 'spaced by the polyfocal rule (§3.2 (4)): max(polyfocal.spacingMinM, spacingShareRs × R_s)' — the 250 m floor holds at epochs as at creation.
* *Basis:* one rule, no unstated exception. *Units:* V07.

### V07-ICONF-5 (vol-V07-V08; minor) — FIX

* claim: §13's note says V08's SR5-01 and V11's SR5-03 companions 'are §1's dependency (13), each pending with its fallback', and §12 says 'each with its fallback there', while §1 (13) (as fixed by the finalization, SR6-04 (a)) says both 'landed ... no fallback'; the volume states both that a companion is pending and that it has landed.
* *Where:* §13 closing note and §12 round-6 readings vs §1 dependency (13)
* **Ruling:** The stale 'pending' sentences leave with the §12/§13 narration; §1 (13) states the current facts (both companions landed).
* *Basis:* principle (5). *Units:* V07.

### V07-XCONF-1 (vol-V07-V08; major) — FIX

* claim: J122 decides V07 Q1 as '(a) yes, and its tracker spike (V-M0) right after M0'; V07 §11 still lists Q1 as an open owner question with only a recommendation, §8 still says 'the order is the owner's (Q1)', and §8 lets V-M0 and V-M1 start only 'once M2b has landed and M3a's tools exist' — for V-M0 this contradicts J122's 'right after M0' (owner delegation outranks the volume, principle (3)).
* *Where:* V07 §11 Q1; §8 'Where it slots into §16' vs docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md (J122)
* **Ruling:** J122 governs: V07 §11 Q1 is marked 'decided (a), J122'; V07 §8 reads: V-M0 (the tracker spike) right after M0, on M0's kernel, M0 (b)'s tables and the spike's own fixtures (no M2b input); V-M1 onward after M4, parallel with M5; V-M3's epoch clauses with M6-E. INDEX §4 and §16 carry the same slot.
* *Basis:* owner delegation J122 > volume. *Units:* V07, scope.

### V07-XCONF-2 (vol-V07-V08; major) — FIX

* claim: V07 requires 'a span over a hinterland face — field, meadow, common, pasture or wood — stays open at every rung' and registers V04's arch-vault source at every village rung; V04's span rule makes a span open only where its strip meets a part-0 way, water or flood cell, or fails the height or slope tests, and otherwise vaults it by chance (raised.vaultShare x era and culture multipliers, vaultCap 10 at each village rung) — no hinterland condition; IN-V07-2 closes FL-3 on the ground that 'V04's span rule leaves country spans open where no vault stage registers', but V07 registers the source at village rungs, and §3.16 (1) still carries the fallback 'until V04 states the hinterland cond…
* *Where:* V07 §1 dependency (5), §3.5a (7), §3.16 (1) vs V04's span rule (V04 BCR-45 'The span rule') and IN-V07-2
* **Ruling:** The span rule (file f item 244 / V04 BCR-45, the base home) gains in step (2): a span whose under-deck strip lies wholly on hinterland land-use faces (field, meadow, common, pasture, wood) is `open` (new reason `country`) at every rung — country arcades stand open (realism tiebreaker). T-V4-62 gains the clause; V07 §1 (5) and §3.16 (1) cite the rule and drop the fallback; IN-V07-2's reason is corrected.
* *Basis:* realism tiebreaker; one rule at its base home (f item 244). *Units:* V04, V07, model.

### CANON-C01 (canon; major) — FIX

* INDEX §3/§4 and V07 §8: the village V-M0–V-M1 start after M2b and M3a's tools.
* J122 (docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md): the village right after M4, parallel with M5; the tracker spike V-M0 right after M0.
* **Ruling:** J122 governs: V-M0 right after M0 (on M0's kernel, tables and its own fixtures); V-M1…V-M4 after M4, parallel with M5; INDEX §3/§4, §16 and V07 §8 carry it (V07-XCONF-1).
* *Basis:* owner delegation J122 > INDEX and volume. *Units:* scope, V07.

### CANON-C03 (canon; major) — FIX

* INDEX §6: 'Until the owner answers, each volume runs on its recommendation' and twenty-five open questions.
* J121/J122 answered every one.
* **Ruling:** INDEX §6 becomes the table of decisions (OWNER_Q); every volume's §11 likewise.
* *Basis:* J121, J122. *Units:* scope, V01, V02, V03, V04, V05, V06, V07, V08, V09, V10, V11, V12.

### CANON-C04 (canon; major) — FIX

* INDEX §7: 'The fix list — deliberately left for the next amendment'.
* The owner's no-defer rule; THE BAR IS ZERO.
* **Ruling:** Every INDEX §7 item is routed to its unit (SEAM_OPEN) and fixed in this pass; INDEX §7 keeps the reconciliation history as a pointer to the validation records and holds no open item.
* *Basis:* owner no-defer rule. *Units:* scope, V01, V04, V07, V08, V09, V10, V11, V12.

## File f — every item routed to the base part that applies it

Every f item was read whole (docs/AMENDMENTS-2026-09-28f.md, items 200–585 with the notes of reconciliation rounds 1–6 and the finalization). None contradicts an owner rule: rule R-a (item 101 R2 over every 'refused', J-VI.4) and J-VI.30 are already applied inside the items; the conflicts between f items and volume text are ruled above; J122's order changes no item's content and places the staged rows (item 568).

**f items ruled against a volume's text or another item:**

* items 413: J-VI.19 (applied in the item): showUnexcavated is a view key; V04 BCR-10's LayerSpec field dropped. (*J-VI.19*)
* items 425: J-VI.20 (applied): no fallbackClass. (*J-VI.20*)
* items 447, 448: V01-XCONF-2: applied together — BCR-V9-31 (c)'s retaining clause takes V01 BCR-40's threshold (150 cm, broken over stairs and ramps); supports join as cliffs. (*the specific rule qualifies the general*)
* items 452: V04-ICONF-3: applied with BCR-16's text corrected to V04 §5.5 (portals only in wall lines). (*the export home*)
* items 277: V09-XCONF-1: applied with BCR-V9-3's text corrected (the underground's band is the view key depthBand). (*V09 §2.4's type; J-VI.19*)
* items 343: V06-ICONF-3: BCR-V6-9's advance field gains stoppedAt?. (*V06 §2.3, §2.12*)
* items 244: V07-XCONF-2 / J-C4: the span rule's step (2) gains the hinterland-face condition (reason `country`); SCC-114: the support step's cell names are V11's (raisedWays.structure.slideMaxFactor; retaining.settings.stateSnapCm in item 245). (*realism tiebreaker; V11 owns values (R-c)*)
* items 202, 317, 322: SCOPE-C01: item 202 governs the small-dossier refusal (only while no village product is registered), consistent with the owner's J80; items 322 and 317 apply in the order the notes give. (*f item > base restatement; J80 intact*)
* items 474, 524, 532, 568: No request's total is applied; §16's two totals are computed once by item 568 (J-RF1.6), placing the staged rows in J122's order (SCOPE-C04). (*J122; item 568*)
* items 582: Owner item 101 R2 (via J-VI.30): the three base refusals become bends; F-EDIT keeps only a dossier fact's conflict. Consistent with the owner rule. (*owner item 101 R2*)

**The request census:** every request heading in the twelve ## 10 sections (407) is carried by an f item (400) or is one of the seven not-items below (script: work/canon/assemble.py census). The not-items: BCR-V9-4 (V09) — withdrawn by V09 (J-V9.36): the block is removed from V09 §10; BCR-V9-6 (V09) — withdrawn by V09 (J-V9.33): the block is removed from V09 §10; BCR-V5-23 (V05) — a request to V06 (EpochOps.demandTaken), carried by V06 (X10): V05 cites V06 §2.1 and drops the block; BCR-V5-28 (V05) — a request to V06 (the participant table), carried by V06's participants table: V05 cites it and drops the block; BCR-V11-9 (V11) — a request to V08 (kinds pseudo-classes, goodWords), carried by V08 (X-V11-1): V11 cites V08 §2.6 and drops the block; V04 BCR-34 (V04) — carried in BCR-V4-14's DR17 cell: the block becomes a pointer to file f item 386; V04 BCR-44 (V04) — carried in BCR-V4-3's Tunnel line: the block becomes a pointer to file f item 247.

Application order: file g first, then file f in its own order (base-section order; the notes' "applied before/after" orders govern). Each base editor applies the items of its sections as written; a part in another part's section ("also touches") is applied by that part's editor. A volume cites each applied item as base text; its `## 10` request becomes a one-line pointer "BCR-V… → file f item N, applied at §x.y".

| item | base section | applies | also applies a part | scope | requests | needed by |
|---|---|---|---|---|---|---|
| 200 | 1.1 What is built, in what order; the two size ladders | scope |  | STAGED (M5, stage 2). | V01 BCR-27 | V01 |
| 201 | 1.1 What is built, in what order; the two size ladders | scope |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-1 | V07 |
| 202 | 1.1 What is built, in what order; the two size ladders | scope | pipeline, model, determinism, kernel, rendering | STAGED (the village product, V-M0 to V-M4; the port's consultation with the Set… | BCR-V7-11, BCR-V7-17, BCR-V7-18, BCR-V8-9 | V06, V07, V08 |
| 203 | 2.2 The plat — one arena per layer, five refinement levels … | model | determinism | STAGED (M6-sky). | BCR-V5-2 | V05 |
| 204 | 2.2 The plat — one arena per layer, five refinement levels … | model |  | STAGED (M6-sky). | BCR-V5-24 | V05 |
| 205 | 2.3 Terrain and water | model | pipeline | STAGED (M6-U, the underground layer). | V04 BCR-1 | V04 |
| 206 | 2.3 Terrain and water | model |  | STAGED (M6-E, the evolution engine). | BCR-V6-6 | V06 |
| 207 | 2.4 Ways (the skeleton) and typed edges | model |  | BASE (M1) for (b), `HoodPlace` declared with its registry row; BASE (M2b) for (… | V01 BCR-6 | V01, V04 |
| 208 | 2.4 Ways (the skeleton) and typed edges | model |  | STAGED (M6-U, the underground layer). | V04 BCR-2 | V04 |
| 209 | 2.4 Ways (the skeleton) and typed edges | model |  | STAGED (M6-E, the evolution engine; the land retype also with the village produ… | BCR-V6-5, BCR-V7-22 | V06, V07 |
| 210 | 2.5 Districts, quarters, blocks, plots — the PLOT MODEL, re… | model |  | BASE (M1) for (a)'s `content` and `overrides?`, (b) and (d)'s first row; STAGED… | V01 BCR-5 | V01 |
| 211 | 2.5 Districts, quarters, blocks, plots — the PLOT MODEL, re… | model |  | BASE (M3a, item 110 (V01 §8.1)). | V01 BCR-41 | V01 |
| 212 | 2.5 Districts, quarters, blocks, plots — the PLOT MODEL, re… | model |  | STAGED (M6-U, the underground layer). | V04 BCR-4 | V04 |
| 213 | 2.5 Districts, quarters, blocks, plots — the PLOT MODEL, re… | model | pipeline | STAGED (M6-sky). | BCR-V5-6 | V01, V05, V11 |
| 214 | 2.5 Districts, quarters, blocks, plots — the PLOT MODEL, re… | model |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-4 | V07 |
| 215 | 2.5 Districts, quarters, blocks, plots — the PLOT MODEL, re… | model |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-5 | V07 |
| 216 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  | BASE (M1, fields carried so stage 3 needs no migration). | BCR-V2-01 | V01 |
| 217 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  | BASE (M1, fields carried so stage 3 needs no migration). | BCR-V2-02 | V02 |
| 218 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  | STAGED (M6, stage 3). | BCR-V2-03 | V02, V03 |
| 219 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  | STAGED (M6, stage 3). | BCR-V2-04 | V02, V03 |
| 220 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  | STAGED (M6, stage 3). | BCR-V2-05 | V02 |
| 221 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  | STAGED (M6, stage 3). | BCR-V2-06 | V02 |
| 222 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  | STAGED (M6, stage 3). | BCR-V2-07 | V02 |
| 223 | 2.6 Buildings, heights and ground datum, wings, materials, … | model | rendering | STAGED (M6, stage 3). | BCR-V2-22 | V02 |
| 224 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  | BASE (M3a, with items 228 and 230: the hint clause applies wherever `Building.m… | BCR-V2-23 | V02 |
| 225 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  | STAGED (M6, stage 3). | BCR-V2-27 | V02, V03 |
| 226 | 2.6 Buildings, heights and ground datum, wings, materials, … | model | determinism | BASE (M2b, with §2.6's basement gate) for the half cellar's raise — its round-1… | BCR-V2-28 | V02, V03, V06, V11 |
| 227 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  | BASE (M3a, item 110 (c)–(d) through the base outline builder (BCR-V2-39)). | BCR-V2-31 | V01 |
| 228 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  | BASE (M3a, item 110 (c)–(d) through the base outline builder (BCR-V2-39)). | BCR-V2-38 | V02, V03 |
| 229 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  | BASE (M3a, item 110 (c)–(d) through the base outline builder (BCR-V2-39)). | BCR-V2-39 | V02, V03, V04, V11, V12 |
| 230 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  | BASE (M3a, item 110 (c)–(d) through the base outline builder (BCR-V2-39)). | BCR-V2-41 | V02, V03 |
| 231 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  | BASE (M3a, item 110 (c)–(d) through the base outline builder (BCR-V2-39)). | BCR-V2-42 | V02, V03 |
| 232 | 2.6 Buildings, heights and ground datum, wings, materials, … | model | rendering | STAGED (M6-P, the plan rung). | BCR-V3-2 | V03 |
| 233 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  |  | BCR-V3-12 | V03 |
| 234 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  | BASE (M3a, the base outline builder's templates carry their part names; S23-20). | BCR-V3-13 | V02, V03 |
| 235 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  | STAGED (M6-P, the plan rung). | BCR-V3-15 | V03 |
| 236 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  | STAGED (M6-P, the plan rung). | BCR-V3-17 | V03 |
| 237 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  | STAGED (M6-P, the plan rung). | BCR-V3-19 | V03 |
| 238 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  | BASE design, built at M6-U (item 109 (k)'s crypt rule, with the underground lay… | BCR-V3-20 | V01, V02, V03, V04, V10, V11 |
| 239 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  | STAGED (M6-P, the plan rung). | BCR-V3-21 | V03, V04 |
| 240 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  | STAGED (M6-P, the plan rung). | BCR-V3-25 | V03 |
| 241 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  | BASE (M3a, with item 110 (a), (c) and item 230 (BCR-V2-41) — S11's entrance der… | BCR-V3-26 | V01 |
| 242 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  | BASE (M3a, with item 110 (a)'s retaining walls — S11's basement decision; S23R3… | BCR-V3-27 | V01, V02, V03 |
| 243 | 2.6 Buildings, heights and ground datum, wings, materials, … | model |  | STAGED (M6-U, the underground layer). | V04 BCR-43 | V04 |
| 244 | 2.7 Walls, gates, towers, castle, bridges; greenery, land u… | model |  | BASE (M3a (the record, the support step and the span rule); the arch-vault cham… | BCR-V8-28, BCR-V9-33, V04 BCR-45 | V01, V04, V05, V06, V07, V08, V09, V11 |
| 245 | 2.7 Walls, gates, towers, castle, bridges; greenery, land u… | model | kernel, determinism, rendering | BASE (M3a; the island form M6-sky; the state profile's writers with their ops —… | BCR-V5-27, V01 BCR-43 | V01, V04, V05, V06, V07, V09 |
| 246 | 2.7 Walls, gates, towers, castle, bridges; greenery, land u… | model |  | BASE (M3a). | BCR-V9-30 | V01, V02, V05, V06, V09, V10, V11 |
| 247 | 2.7 Walls, gates, towers, castle, bridges; greenery, land u… | model |  | STAGED (M6-U, the underground layer). | V04 BCR-3 | V04 |
| 248 | 2.7 Walls, gates, towers, castle, bridges; greenery, land u… | model |  | STAGED (M6-U, the underground layer). | V04 BCR-32 | V04 |
| 249 | 2.7 Walls, gates, towers, castle, bridges; greenery, land u… | model |  | STAGED (M6-U, the underground layer). | V04 BCR-33 | V04 |
| 250 | 2.7 Walls, gates, towers, castle, bridges; greenery, land u… | model |  | STAGED (M6-U, the underground layer). | V04 BCR-46 | V04 |
| 251 | 2.7 Walls, gates, towers, castle, bridges; greenery, land u… | model |  | STAGED (M6-sky). | BCR-V5-1 | V01, V05 |
| 252 | 2.7 Walls, gates, towers, castle, bridges; greenery, land u… | model |  | STAGED (M6-sky). | BCR-V5-9 | V04, V05, V06 |
| 253 | 2.7 Walls, gates, towers, castle, bridges; greenery, land u… | model |  | STAGED (M6-sky). | BCR-V5-26 | V05 |
| 254 | 2.7 Walls, gates, towers, castle, bridges; greenery, land u… | model |  | STAGED (M6-E, the evolution engine). | BCR-V6-3 | V06 |
| 255 | 2.7 Walls, gates, towers, castle, bridges; greenery, land u… | model |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-6 | V07 |
| 256 | 2.7 Walls, gates, towers, castle, bridges; greenery, land u… | model | determinism | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-14 | V08 |
| 257 | 2.7 Walls, gates, towers, castle, bridges; greenery, land u… | model |  | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-26 | V08 |
| 258 | 2.7 Walls, gates, towers, castle, bridges; greenery, land u… | model |  | BASE (M2b, V11 C4's wall rows with item 106's base). | BCR-V11-5 | V11 |
| 259 | 2.7 Walls, gates, towers, castle, bridges; greenery, land u… | model | pipeline | BASE (M3a, V11 C3b). | BCR-V11-27 | V11 |
| 260 | 2.8 Identity, lifecycle, provenance, the entity registry | model |  | BASE (M3a (raised way, harbour chain, quay wall, retaining wall, deck plot); is… | BCR-V6-24, BCR-V8-31 | V01, V02, V05, V06, V08, V09, V10 |
| 261 | 2.8 Identity, lifecycle, provenance, the entity registry | model |  | STAGED (M6, stage 3). | BCR-V2-13 | V02 |
| 262 | 2.8 Identity, lifecycle, provenance, the entity registry | model |  | STAGED (M6-P, the plan rung). | BCR-V3-22 | V03 |
| 263 | 2.8 Identity, lifecycle, provenance, the entity registry | model |  | STAGED (M6-P, the plan rung). | BCR-V3-28 | V03, V06 |
| 264 | 2.8 Identity, lifecycle, provenance, the entity registry | model | determinism | STAGED (M6-E, the evolution engine). | BCR-V6-7 | V06 |
| 265 | 2.8 Identity, lifecycle, provenance, the entity registry | model |  | BASE (M3a, item 110 (b)'s generation and removal holds). | BCR-V6-20 | V06 |
| 266 | 2.8 Identity, lifecycle, provenance, the entity registry | model |  | STAGED (M6-E, the evolution engine). | BCR-V6-21 | V06 |
| 267 | 2.8 Identity, lifecycle, provenance, the entity registry | model |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-3 | V07 |
| 268 | 2.8 Identity, lifecycle, provenance, the entity registry | model |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-32 | V06, V07 |
| 269 | 2.8 Identity, lifecycle, provenance, the entity registry | model |  | BASE (M1–M3b, the reference UI (AP1–AP4)). | BCR-V9-19 | V09 |
| 270 | 2.8 Identity, lifecycle, provenance, the entity registry | model |  | BASE (M3a, the oracle and the tool API (item 101)). | BCR-V10-3 | V01, V02, V03, V06, V09, V10 |
| 271 | 2.8 Identity, lifecycle, provenance, the entity registry | model | pipeline | BASE (M3a, the oracle and the tool API (item 101)). | BCR-V10-15 | V10 |
| 272 | 2.9 The document and serialisation | model | determinism | BASE (M1) for (a)'s `Recipe.product`; STAGED (M5, stage 2) for the rest. | V01 BCR-12 | V01 |
| 273 | 2.9 The document and serialisation | model |  | STAGED (M6-P, the plan rung). | BCR-V3-8 | V03 |
| 274 | 2.9 The document and serialisation | model |  | STAGED (M6-sky). | BCR-V5-21 | V05, V06 |
| 275 | 2.9 The document and serialisation | model |  | STAGED (M6-E, the evolution engine). | BCR-V6-13 | V06 |
| 276 | 2.9 The document and serialisation | model |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-12 | V07 |
| 277 | 2.9 The document and serialisation | model |  | BASE (M1–M3b, the reference UI (AP1–AP4)). | BCR-V9-3 | V09 |
| 278 | 2.9 The document and serialisation | model | rendering | STAGED (M6-U, with the underground layer (AP6)). | BCR-V9-20 | V04, V09 |
| 279 | 3.2 Numeric policy | kernel |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-30 | V07 |
| 280 | 4.1 Stage graph, evaluation model, laziness contract, trans… | pipeline |  | BASE (M2b) for (a)'s way-surface clause; STAGED (M5, stage 2) for the rest. | V01 BCR-3 | V01 |
| 281 | 4.1 Stage graph, evaluation model, laziness contract, trans… | pipeline |  | STAGED (M6-U, the underground layer). | V04 BCR-25 | V04 |
| 282 | 4.1 Stage graph, evaluation model, laziness contract, trans… | pipeline |  | STAGED (M6-sky). | BCR-V5-3 | V01, V05 |
| 283 | 4.1 Stage graph, evaluation model, laziness contract, trans… | pipeline |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-29 | V07 |
| 284 | 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, rese… | pipeline |  | STAGED (M5, stage 2). | V01 BCR-8 | V01 |
| 285 | 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, rese… | pipeline |  | STAGED (M5, stage 2). | V01 BCR-13 | V01 |
| 286 | 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, rese… | pipeline | model | STAGED (M6-sky). | BCR-V5-19 | V05 |
| 287 | 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, rese… | pipeline |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-2 | V07 |
| 288 | 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, rese… | pipeline |  | BASE (M2b, V11 C2). | BCR-V11-18 | V11 |
| 289 | 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, rese… | pipeline |  | BASE (M3a, V11 C3b). | BCR-V11-28 | V11 |
| 290 | 4.3 S4 Backbone — arterials routed between named destinatio… | pipeline |  | BASE (M3a; (5)'s sky clauses with M6-sky). | BCR-V10-21, BCR-V5-29, BCR-V6-25, BCR-V7-33, BCR-V7-35, V01 BCR-39 | V01, V05, V06, V07, V10 |
| 291 | 4.3 S4 Backbone — arterials routed between named destinatio… | pipeline |  | STAGED (M6-E, the evolution engine). | BCR-V6-26 | V04, V06, V11, V12, V11 |
| 292 | 4.3 S4 Backbone — arterials routed between named destinatio… | pipeline |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-25 | V07 |
| 293 | 4.4 S5 Growth stages — boundary and wall first, main roads,… | pipeline |  | STAGED (M6-E, the evolution engine). | BCR-V6-19 | V06 |
| 294 | 4.5 S6 Districts, quarters and fields · S7b Allocation and … | pipeline |  | STAGED (M5, stage 2). | V01 BCR-4 | V01 |
| 295 | 4.5 S6 Districts, quarters and fields · S7b Allocation and … | pipeline |  | STAGED (M6-sky). | BCR-V5-5 | V05 |
| 296 | 4.5 S6 Districts, quarters and fields · S7b Allocation and … | pipeline | rendering | STAGED (M6-sky). | BCR-V5-15 | V05 |
| 297 | 4.5 S6 Districts, quarters and fields · S7b Allocation and … | pipeline |  | BASE (M3a, the oracle and the tool API (item 101)). | BCR-V10-4 | V10, V11 |
| 298 | 4.6 S8 Infill — the measured bent cut as a kernel transacti… | pipeline |  | STAGED (M5, stage 2). | V01 BCR-7 | V01 |
| 299 | 4.6 S8 Infill — the measured bent cut as a kernel transacti… | pipeline |  | STAGED (M6-sky). | BCR-V5-20 | V05 |
| 300 | 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b… | pipeline |  | BASE (M2b) for the way-surface clause; STAGED (M5, stage 2) for the rest. | V01 BCR-9 | V01 |
| 301 | 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b… | pipeline |  | BASE (M2b) for (a)'s S7b half, (b) and (d) — `squares.quota` and S7b (3)'s clai… | V01 BCR-32 | V01, V11 |
| 302 | 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b… | pipeline |  | BASE (M3a, item 110 (V01 §8.1)). | V01 BCR-42 | V01 |
| 303 | 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b… | pipeline | model | BASE (M3a, with item 229's base outline builder) for its hole sentence — S11's … | BCR-V2-24 | V01 |
| 304 | 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b… | pipeline |  | STAGED (M6, stage 3). | BCR-V2-29 | V02 |
| 305 | 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b… | pipeline |  | BASE (M3a, item 110 (c)–(d) through the base outline builder (BCR-V2-39)). | BCR-V2-34 | V01 |
| 306 | 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b… | pipeline |  | STAGED (M6-U, the underground layer). | V04 BCR-39 | V04 |
| 307 | 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b… | pipeline |  | STAGED (M6-sky). | BCR-V5-8 | V05 |
| 308 | 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b… | pipeline |  | STAGED (M6-sky). | BCR-V5-16 | V01, V05 |
| 309 | 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b… | pipeline |  | BASE (M3a, with item 110 (a)'s levelling) for the platform-datum rule and `leve… | BCR-V5-30 | V01, V02, V03, V04, V05 |
| 310 | 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b… | pipeline |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-24 | V07 |
| 311 | 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b… | pipeline |  | BASE (M3a, the oracle and the tool API (item 101)). | BCR-V10-2 | V10, V11 |
| 312 | 4.8 S7 Fortification furniture (per enceinte) · the castle … | pipeline |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-20 | V07 |
| 313 | 4.9 S12a Hinterland siting and the hinterland unit · S12b G… | pipeline | model | STAGED (M5, stage 2; the rim-walk row and the optional `way` built by volume 1'… | V01 BCR-10 | V01, V05 |
| 314 | 4.9 S12a Hinterland siting and the hinterland unit · S12b G… | pipeline |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-7 | V07 |
| 315 | 4.9 S12a Hinterland siting and the hinterland unit · S12b G… | pipeline |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-8 | V07 |
| 316 | 4.9 S12a Hinterland siting and the hinterland unit · S12b G… | pipeline |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-28 | V07 |
| 317 | 4.11 Incremental mode, transformations and conversions (the… | pipeline |  | STAGED (M6-E). | BCR-V6-1, BCR-V7-18 | V06, V07 |
| 318 | 4.11 Incremental mode, transformations and conversions (the… | pipeline |  | STAGED (M6, stage 3). | BCR-V2-40 | V02, V06 |
| 319 | 4.11 Incremental mode, transformations and conversions (the… | pipeline |  | STAGED (M6-U, the underground layer). | V04 BCR-6 | V04, V06 |
| 320 | 4.11 Incremental mode, transformations and conversions (the… | pipeline |  | STAGED (M6-sky). | BCR-V5-7 | V05 |
| 321 | 4.11 Incremental mode, transformations and conversions (the… | pipeline |  | STAGED (M6-E, the evolution engine). | BCR-V6-2 | V06 |
| 322 | 4.11 Incremental mode, transformations and conversions (the… | pipeline |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-26 | V06, V07, V08 |
| 323 | 4.12 The strategy interface, stage registration by declared… | pipeline |  | BASE (M2b) — the hook points declared, empty until M5 (volume 1 §8.1). | V01 BCR-26 | V01 |
| 324 | 4.12 The strategy interface, stage registration by declared… | pipeline |  | STAGED (M6-P, the plan rung). | BCR-V3-23 | V03 |
| 325 | 4.12 The strategy interface, stage registration by declared… | pipeline |  | STAGED (M6-U, the underground layer). | V04 BCR-5 | V04 |
| 326 | 4.12 The strategy interface, stage registration by declared… | pipeline |  | STAGED (with item 202). | BCR-V7-11 | V07 |
| 327 | 5.2 Failure classes: detection, ladder, test | determinism |  | STAGED (M5, stage 2). | V01 BCR-18 | V01 |
| 328 | 5.2 Failure classes: detection, ladder, test | determinism |  | STAGED (M6, stage 3). | BCR-V2-16 | V02 |
| 329 | 5.2 Failure classes: detection, ladder, test | determinism |  | STAGED (M6-P, the plan rung). | BCR-V3-10 | V03 |
| 330 | 5.2 Failure classes: detection, ladder, test | determinism |  | STAGED (M6-U, the underground layer). | V04 BCR-7 | V04 |
| 331 | 5.2 Failure classes: detection, ladder, test | determinism |  | STAGED (M6-sky). | BCR-V5-11 | V05 |
| 332 | 5.3 The invariant suite, by scope (SCL-1) | determinism |  | STAGED (M6, stage 3). | BCR-V2-17 | V02 |
| 333 | 5.3 The invariant suite, by scope (SCL-1) | determinism | model | BASE (M3a, item 110 (c)–(d) through the base outline builder (BCR-V2-39)). | BCR-V2-35 | V02 |
| 334 | 5.3 The invariant suite, by scope (SCL-1) | determinism |  | STAGED (M6-P, the plan rung). | BCR-V3-11 | V03 |
| 335 | 5.3 The invariant suite, by scope (SCL-1) | determinism |  | STAGED (M6-E, the evolution engine). | BCR-V6-17 | V06 |
| 336 | 5.3 The invariant suite, by scope (SCL-1) | determinism |  | STAGED (M6-E, the evolution engine). | BCR-V6-18 | V06 |
| 337 | 5.4 The generation report | determinism |  | STAGED (SettlementForge stage). |  |  |
| 338 | 5.4 The generation report | determinism |  | STAGED (M6-U, the underground layer). | V04 BCR-41 | V04 |
| 339 | 5.4 The generation report | determinism |  | STAGED (M6-E, the evolution engine). | BCR-V6-14 | V06, V10 |
| 340 | 6.1 RNG and stream design | determinism |  | BASE (M1) for (a), the three ids reserved; STAGED (M5, stage 2) for (b) and (c). | V01 BCR-11 | V01 |
| 341 | 6.1 RNG and stream design | determinism |  | STAGED (M6, stage 3). | BCR-V2-10 | V02 |
| 342 | 6.1 RNG and stream design | determinism |  | STAGED (M6-E, the evolution engine). | BCR-V6-8 | V06 |
| 343 | 6.1 RNG and stream design | determinism |  | STAGED (M6-E, the evolution engine). | BCR-V6-9 | V06 |
| 344 | 6.1 RNG and stream design | determinism |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-15 | V07 |
| 345 | 6.3 Identity: address ids, lineage keys, carry-over (and th… | determinism |  | BASE (M1) — the `S8.seed` id reserved, with the lineage-key sentence (no user b… | V01 BCR-31 | V01 |
| 346 | 6.3 Identity: address ids, lineage keys, carry-over (and th… | determinism |  | STAGED (M6, stage 3). | BCR-V2-11, BCR-V3-29 | V02 |
| 347 | 6.3 Identity: address ids, lineage keys, carry-over (and th… | determinism |  | STAGED (M6-P, the plan rung). | BCR-V3-29 | V03, V06 |
| 348 | 7.1 Edits are ordered events on addresses; the named action… | determinism |  | BASE (M3a). | BCR-V10-12, BCR-V9-16 | V09, V10 |
| 349 | 7.1 Edits are ordered events on addresses; the named action… | determinism |  | STAGED (M5, stage 2). | V01 BCR-35 | V01 |
| 350 | 7.1 Edits are ordered events on addresses; the named action… | determinism |  | BASE (M3a, item 110 (V01 §8.1)). | V01 BCR-44 | V01 |
| 351 | 7.1 Edits are ordered events on addresses; the named action… | determinism |  | STAGED (M6, stage 3). | BCR-V2-12 | V02, V03 |
| 352 | 7.1 Edits are ordered events on addresses; the named action… | determinism | scope | STAGED (M6-P, the plan rung). | BCR-V3-3 | V03 |
| 353 | 7.1 Edits are ordered events on addresses; the named action… | determinism |  | STAGED (M6-P, the plan rung). | BCR-V3-16 | V03 |
| 354 | 7.1 Edits are ordered events on addresses; the named action… | determinism |  | STAGED (M6-P, the plan rung). | BCR-V3-24 | V03 |
| 355 | 7.1 Edits are ordered events on addresses; the named action… | determinism |  | STAGED (M6-U, the underground layer). | V04 BCR-8 | V04 |
| 356 | 7.1 Edits are ordered events on addresses; the named action… | determinism |  | STAGED (M6-sky). | BCR-V5-10 | V05 |
| 357 | 7.1 Edits are ordered events on addresses; the named action… | determinism |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-19 | V07 |
| 358 | 7.1 Edits are ordered events on addresses; the named action… | determinism |  | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-6 | V08 |
| 359 | 7.1 Edits are ordered events on addresses; the named action… | determinism |  | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-19 | V08 |
| 360 | 7.1 Edits are ordered events on addresses; the named action… | determinism |  | BASE (M1–M3b, the reference UI (AP1–AP4)). | BCR-V9-13 | V09 |
| 361 | 7.1 Edits are ordered events on addresses; the named action… | determinism |  | STAGED (M6-U, with the underground layer (AP6)). | BCR-V9-21 | V09 |
| 362 | 7.1 Edits are ordered events on addresses; the named action… | determinism | model | BASE (M1–M3b, the reference UI (AP1–AP4)). | BCR-V9-26 | V09, V10 |
| 363 | 7.1 Edits are ordered events on addresses; the named action… | determinism |  | BASE (M1–M3b, the reference UI (AP1–AP4)). | BCR-V9-29 | V09 |
| 364 | 7.1 Edits are ordered events on addresses; the named action… | determinism |  | BASE (M1–M3b, the reference UI (AP1–AP4)). | BCR-V9-33 | V09 |
| 365 | 7.1 Edits are ordered events on addresses; the named action… | determinism | rendering | STAGED (M3c, the built-in clerk). | BCR-V10-16 | V10 |
| 366 | 7.1 Edits are ordered events on addresses; the named action… | determinism |  | BASE (M3a, the oracle and the tool API (item 101)). | BCR-V10-17 | V09, V10 |
| 367 | 7.1 Edits are ordered events on addresses; the named action… | determinism |  | BASE (M3a, the oracle and the tool API (item 101)). | BCR-V10-18 | V10 |
| 368 | 7.1 Edits are ordered events on addresses; the named action… | determinism |  | BASE (M3a, the oracle and the tool API (item 101)). | BCR-V10-20 | V09, V10 |
| 369 | 7.3 Locality — effective scope, local operators, edit fates… | determinism | pipeline | BASE (M2a for the naming record; M2b for the `surface` attribute); STAGED (M5, … | V01 BCR-33 | V01 |
| 370 | 7.3 Locality — effective scope, local operators, edit fates… | determinism |  | BASE (M3a, item 110 (c)–(d) through the base outline builder (BCR-V2-39)). | BCR-V2-32 | V02, V03, V06 |
| 371 | 7.3 Locality — effective scope, local operators, edit fates… | determinism | model | BASE (M3a, item 110 (c)–(d) through the base outline builder (BCR-V2-39)). | BCR-V2-33 | V01 |
| 372 | 7.3 Locality — effective scope, local operators, edit fates… | determinism | rendering | STAGED (M6-U, with the underground layer (AP6)). | BCR-V9-22 | V04 |
| 373 | 7.4 Lifecycle of every edit kind (create · read · persist ·… | determinism |  | STAGED (M5, stage 2). | V01 BCR-25 | V01 |
| 374 | 7.4 Lifecycle of every edit kind (create · read · persist ·… | determinism |  | STAGED (M6-P, the plan rung). | BCR-V3-4 | V03 |
| 375 | 7.4 Lifecycle of every edit kind (create · read · persist ·… | determinism |  | STAGED (M6-sky). | BCR-V5-25 | V05 |
| 376 | 7.6 The override layer and editable tables (G-P12; owner am… | determinism |  | STAGED (M6, stage 3). | BCR-V2-14 | V02, V11, V12 |
| 377 | 7.6 The override layer and editable tables (G-P12; owner am… | determinism |  | STAGED (the village product, V-M0 to V-M4). | BCR-V2-14, BCR-V7-13 | V07, V11, V12, V11 |
| 378 | 7.6 The override layer and editable tables (G-P12; owner am… | determinism |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-14 | V07 |
| 379 | 7.6 The override layer and editable tables (G-P12; owner am… | determinism |  | BASE (M0 (b), V11 C0). | BCR-V11-6 | V11 |
| 380 | 7.6 The override layer and editable tables (G-P12; owner am… | determinism |  | BASE (M3a, V11 C3). | BCR-V11-10 | V09, V11 |
| 381 | 7.6 The override layer and editable tables (G-P12; owner am… | determinism |  | BASE (M-1–M4, the calibration rig). | BCR-V12-5 | V11, V12 |
| 382 | 7.6 The override layer and editable tables (G-P12; owner am… | determinism |  | STAGED (M-CAL, the corpus reconciliation). | BCR-V12-22 | V12 |
| 383 | 7.7 Intent, character, constraints, assignments, the forms … | determinism |  | BASE (numbers). |  |  |
| 384 | 7.7 Intent, character, constraints, assignments, the forms … | determinism |  | STAGED (M5, stage 2). | V01 BCR-29 | V01 |
| 385 | 7.7 Intent, character, constraints, assignments, the forms … | determinism |  | STAGED (M6, stage 3). | BCR-V2-08 | V02 |
| 386 | 7.7 Intent, character, constraints, assignments, the forms … | determinism |  | STAGED (M6-U, the underground layer). | V04 BCR-14 | V04 |
| 387 | 7.7 Intent, character, constraints, assignments, the forms … | determinism |  | STAGED (M6-sky). | BCR-V5-12 | V05 |
| 388 | 7.7 Intent, character, constraints, assignments, the forms … | determinism |  | STAGED (M6-E, the evolution engine). | BCR-V6-12 | V06, V08 |
| 389 | 7.7 Intent, character, constraints, assignments, the forms … | determinism | pipeline | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-7 | V08 |
| 390 | 7.7 Intent, character, constraints, assignments, the forms … | determinism |  | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-8 | V08, V09 |
| 391 | 7.7 Intent, character, constraints, assignments, the forms … | determinism | scope, rendering | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-11 | V08 |
| 392 | 7.7 Intent, character, constraints, assignments, the forms … | determinism |  | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-12 | V08 |
| 393 | 7.7 Intent, character, constraints, assignments, the forms … | determinism |  | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-20 | V08 |
| 394 | 7.7 Intent, character, constraints, assignments, the forms … | determinism |  | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-21 | V08 |
| 395 | 7.7 Intent, character, constraints, assignments, the forms … | determinism |  | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-22 | V08 |
| 396 | 7.7 Intent, character, constraints, assignments, the forms … | determinism | scope | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-24 | V08 |
| 397 | 7.7 Intent, character, constraints, assignments, the forms … | determinism |  | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-25 | V08 |
| 398 | 7.7 Intent, character, constraints, assignments, the forms … | determinism |  | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-30 | V08 |
| 399 | 7.7 Intent, character, constraints, assignments, the forms … | determinism |  | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-32 | V08, V09 |
| 400 | 7.7 Intent, character, constraints, assignments, the forms … | determinism |  | BASE (M1, V11 C1). | BCR-V11-7 | V11 |
| 401 | 7.7 Intent, character, constraints, assignments, the forms … | determinism |  | BASE (M3a, V11 C3b). | BCR-V11-29 | V11 |
| 402 | 7.8 Controls: monotone, continuous, documented; the control… | determinism |  | STAGED (M6, stage 3). | BCR-V2-30 | V02, V09 |
| 403 | 7.8 Controls: monotone, continuous, documented; the control… | determinism |  | STAGED (M6-U, the underground layer). | V04 BCR-9 | V04 |
| 404 | 7.8 Controls: monotone, continuous, documented; the control… | determinism |  | STAGED (M6-U, the underground layer). | V04 BCR-35 | V04 |
| 405 | 8.2 Style sheets as data: roles, contrast, symbolisation, p… | rendering |  | STAGED (M5, stage 2). | V01 BCR-14 | V01 |
| 406 | 8.2 Style sheets as data: roles, contrast, symbolisation, p… | rendering |  | STAGED (M6, stage 3). | BCR-V2-15 | V01 |
| 407 | 8.2 Style sheets as data: roles, contrast, symbolisation, p… | rendering |  | STAGED (M6-U, the underground layer). | V04 BCR-40 | V04 |
| 408 | 8.2 Style sheets as data: roles, contrast, symbolisation, p… | rendering |  | STAGED (M6-sky). | BCR-V5-18 | V05 |
| 409 | 8.2 Style sheets as data: roles, contrast, symbolisation, p… | rendering |  | STAGED (M6-E, the evolution engine). | BCR-V6-15 | V06 |
| 410 | 8.2 Style sheets as data: roles, contrast, symbolisation, p… | rendering |  | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-15 | V08, V09 |
| 411 | 8.2 Style sheets as data: roles, contrast, symbolisation, p… | rendering |  | BASE (M1–M3b, the reference UI (AP1–AP4)). | BCR-V9-7 | V09 |
| 412 | 8.2 Style sheets as data: roles, contrast, symbolisation, p… | rendering |  | BASE (M3a, V11 C3b). | BCR-V11-30 | V11 |
| 413 | 8.4 Layers, shadows, heights | rendering |  | BASE (showCircuit, M3a) / STAGED (underView, M6-U). | BCR-V9-25, V04 BCR-10 | V04, V07, V09 |
| 414 | 8.4 Layers, shadows, heights | rendering |  | STAGED (M6-U, the underground layer). | V04 BCR-38 | V04 |
| 415 | 8.4 Layers, shadows, heights | rendering |  | STAGED (M6-sky). | BCR-V5-13 | V05 |
| 416 | 8.4 Layers, shadows, heights | rendering |  | STAGED (M6-sky). | BCR-V5-22 | V05 |
| 417 | 8.5 Level of detail, the city-band figure-ground contract, … | rendering |  | STAGED (M5, stage 2). | V01 BCR-15 | V01 |
| 418 | 8.5 Level of detail, the city-band figure-ground contract, … | rendering |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-9 | V07 |
| 419 | 8.6 Stage-2 render tier and stage-3 LOD | rendering |  | BASE (M3a, item 110 (c)–(d) through the base outline builder (BCR-V2-39)). | BCR-V2-36 | V01, V02 |
| 420 | 8.8 Tiles, zoom stops, print and the canvas budget | rendering |  | STAGED (M6-P, the plan rung). | BCR-V3-6 | V03 |
| 421 | 8.10 Decoration instances (trees, scatter, crowns, roof det… | rendering |  | STAGED (M5, stage 2). | V01 BCR-34 | V01 |
| 422 | 9.1 What is model and what is view | rendering |  | STAGED (M5, stage 2). | V01 BCR-17 | V01 |
| 423 | 9.1 What is model and what is view | rendering |  | STAGED (M6-U, the underground layer). | V04 BCR-17 | V04 |
| 424 | 9.5 Furniture, framing and tools | rendering |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-31 | V07 |
| 425 | 10.2 Roster (data-driven, replaceable; sequential and prefi… | pipeline |  | BASE (M1, the row type without the cell, with the dossier port's creation half;… | BCR-V11-26, BCR-V8-29 | V08, V11 |
| 426 | 10.2 Roster (data-driven, replaceable; sequential and prefi… | pipeline |  | BASE (M3a, with items 229 and 259 — V11 C3b writes the template's `composition`… | BCR-V2-09 | V02, V11 |
| 427 | 10.2 Roster (data-driven, replaceable; sequential and prefi… | pipeline |  | BASE (with item 435: M0 (b), V11 C0). | BCR-V2-26 | V02, V11 |
| 428 | 10.2 Roster (data-driven, replaceable; sequential and prefi… | pipeline | scope | STAGED (M6-P, the plan rung). | BCR-V3-1 | V03 |
| 429 | 10.2 Roster (data-driven, replaceable; sequential and prefi… | pipeline |  | STAGED (M6-E, the evolution engine). | BCR-V6-4 | V06 |
| 430 | 10.2 Roster (data-driven, replaceable; sequential and prefi… | pipeline |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-21 | V07, V11 |
| 431 | 10.2 Roster (data-driven, replaceable; sequential and prefi… | pipeline |  | STAGED (with item 209). | BCR-V7-22 | V07 |
| 432 | 10.2 Roster (data-driven, replaceable; sequential and prefi… | pipeline |  | BASE (M0 (b)–M1 for the row's shape, V11 C0–C1; the profile columns M2b, C2; `d… | BCR-V11-1 | V02, V03, V11 |
| 433 | 10.2 Roster (data-driven, replaceable; sequential and prefi… | pipeline |  | BASE (M2b, V11 C2). | BCR-V11-2 | V11 |
| 434 | 10.2 Roster (data-driven, replaceable; sequential and prefi… | pipeline |  | BASE (M2b, V11 C2). | BCR-V11-3 | V11 |
| 435 | 10.2 Roster (data-driven, replaceable; sequential and prefi… | pipeline |  | BASE (M0 (b), V11 C0; item 110's row types M3a, C3b). | BCR-V11-8 | V02, V11 |
| 436 | 10.2 Roster (data-driven, replaceable; sequential and prefi… | pipeline |  | BASE design, built at M6-U (item 109 (k)'s crypt rule, with the underground lay… | BCR-V11-13 | V02, V03, V07, V11 |
| 437 | 10.2 Roster (data-driven, replaceable; sequential and prefi… | pipeline |  | BASE (M2b, V11 C2). | BCR-V11-16 | V11 |
| 438 | 10.2 Roster (data-driven, replaceable; sequential and prefi… | pipeline |  | BASE (M2b, V11 C2). | BCR-V11-17 | V11 |
| 439 | 10.2 Roster (data-driven, replaceable; sequential and prefi… | pipeline |  | BASE (M2b, V11 C2's identities; the ladder's identity with C4, STAGED at the Se… | BCR-V11-19 | V11 |
| 440 | 10.2 Roster (data-driven, replaceable; sequential and prefi… | pipeline |  | BASE (M2b, V11 C2). | BCR-V11-20 | V11 |
| 441 | 10.2 Roster (data-driven, replaceable; sequential and prefi… | pipeline |  | BASE (M1, V11 C1; the QUARTER clause with C4, STAGED at the SettlementForge sta… | BCR-V11-24 | V11 |
| 442 | 10.2 Roster (data-driven, replaceable; sequential and prefi… | pipeline |  | BASE (M2b, V11 C2). | BCR-V11-25 | V11 |
| 443 | 10.3 People, households, relations, sub-locations, schedules | pipeline |  | STAGED (M6-E, the evolution engine). | BCR-V6-10 | V06 |
| 444 | 10.4 Names, descriptions and setting packs | pipeline |  | BASE (M1) for the way-naming context; STAGED (M5, stage 2) for the names of loc… | V01 BCR-16 | V01 |
| 445 | 10.4 Names, descriptions and setting packs | pipeline |  | STAGED (M6-U, the underground layer). | V04 BCR-18 | V04 |
| 446 | 10.4 Names, descriptions and setting packs | pipeline |  | BASE (M2b–M3b, V11 C5). | BCR-V11-12 | V11 |
| 447 | 11.1 Formats | rendering |  | BASE (M3a (item 110) and M2b (item 106)). | BCR-V12-15, BCR-V12-17, BCR-V9-31 | V09, V12 |
| 448 | 11.1 Formats | rendering |  | BASE (M3a, item 110 (V01 §8.1)). | V01 BCR-40 | V01 |
| 449 | 11.1 Formats | rendering |  | STAGED (M6, stage 3). | BCR-V2-21 | V02 |
| 450 | 11.1 Formats | rendering |  | STAGED (M6-P, the plan rung). | BCR-V3-7 | V03 |
| 451 | 11.1 Formats | rendering |  | STAGED (M6-P, the plan rung). | BCR-V3-18 | V03 |
| 452 | 11.1 Formats | rendering |  | STAGED (M6-U, the underground layer). | V04 BCR-16 | V04 |
| 453 | 11.1 Formats | rendering |  | BASE (M1–M3b, the reference UI (AP1–AP4)). | BCR-V9-14 | V08, V09, V08 |
| 454 | 11.1 Formats | rendering |  | BASE (M1–M3b, the reference UI (AP1–AP4)). | BCR-V9-15 | V09 |
| 455 | 11.1 Formats | rendering |  | BASE (M1–M3b, the reference UI (AP1–AP4)). | BCR-V9-32 | V09 |
| 456 | 11.1 Formats | rendering |  | BASE (M3a, V11 C3). | BCR-V11-23 | V11, V12 |
| 457 | 11.2 The embedding API and the worker boundary (SCL-6) | rendering |  | STAGED (M6-P, the plan rung). | BCR-V3-5 | V03 |
| 458 | 11.2 The embedding API and the worker boundary (SCL-6) | rendering |  | STAGED (M6-E, the evolution engine). | BCR-V6-11, BCR-V9-2 | V06, V09 |
| 459 | 11.2 The embedding API and the worker boundary (SCL-6) | rendering | model | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-2 | V08 |
| 460 | 11.2 The embedding API and the worker boundary (SCL-6) | rendering |  | BASE (M1–M3b, the reference UI (AP1–AP4)). | BCR-V9-5 | V09, V10 |
| 461 | 11.2 The embedding API and the worker boundary (SCL-6) | rendering |  | BASE (M1–M3b, the reference UI (AP1–AP4)). | BCR-V9-10 | V09, V10 |
| 462 | 11.2 The embedding API and the worker boundary (SCL-6) | rendering |  | BASE (M1–M3b, the reference UI (AP1–AP4)). | BCR-V9-11 | V09 |
| 463 | 11.2 The embedding API and the worker boundary (SCL-6) | rendering |  | BASE (M1–M3b, the reference UI (AP1–AP4)). | BCR-V9-12 | V09, V10 |
| 464 | 11.2 The embedding API and the worker boundary (SCL-6) | rendering |  | BASE (M1–M3b, the reference UI (AP1–AP4)). | BCR-V9-23 | V08, V09, V10, V08 |
| 465 | 11.2 The embedding API and the worker boundary (SCL-6) | rendering |  | BASE (M1–M3b, the reference UI (AP1–AP4)). | BCR-V9-27 | V09, V10 |
| 466 | 11.2 The embedding API and the worker boundary (SCL-6) | rendering |  | BASE (M1–M3b, the reference UI (AP1–AP4)). | BCR-V9-28 | V09, V10 |
| 467 | 11.2 The embedding API and the worker boundary (SCL-6) | rendering |  | BASE (M1–M3b, the reference UI (AP1–AP4)). | BCR-V9-34 | V09 |
| 468 | 11.2 The embedding API and the worker boundary (SCL-6) | rendering |  | BASE (M3a, the oracle and the tool API (item 101)). | BCR-V10-1 | V09, V10 |
| 469 | 11.2 The embedding API and the worker boundary (SCL-6) | rendering |  | STAGED (M3c, the built-in clerk). | BCR-V10-5 | V09, V10 |
| 470 | 11.2 The embedding API and the worker boundary (SCL-6) | rendering | determinism | BASE (M3a, the oracle and the tool API (item 101)). | BCR-V10-6 | V09, V10 |
| 471 | 11.2 The embedding API and the worker boundary (SCL-6) | rendering |  | BASE (M3a, the oracle and the tool API (item 101)). | BCR-V10-13 | V10 |
| 472 | 11.3 The host bridge — the host is the store (FTG-12) | rendering |  | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-1 | V08, V09 |
| 473 | 11.3 The host bridge — the host is the store (FTG-12) | rendering |  | STAGED (M3c, the built-in clerk). | BCR-V10-7 | V08, V09, V10 |
| 474 | 12.4 CITY per-stage split (SCL-3) | rendering |  | STAGED (M5, stage 2). | V01 BCR-19 | V01 |
| 475 | 12.4 CITY per-stage split (SCL-3) | rendering |  | STAGED (M6-U, the underground layer). | V04 BCR-11 | V04 |
| 476 | 12.4 CITY per-stage split (SCL-3) | rendering | scope | STAGED (M6-sky). | BCR-V5-14 | V05 |
| 477 | 12.4 CITY per-stage split (SCL-3) | rendering |  | BASE (M2b, V11 C2). | BCR-V11-22 | V11 |
| 478 | 12.6 Edits, regeneration, replay and warp, as functions of … | rendering |  | STAGED (M6-E, the evolution engine). | BCR-V6-22 | V06 |
| 479 | 12.6 Edits, regeneration, replay and warp, as functions of … | rendering |  | STAGED (M6-E, the evolution engine). | BCR-V6-23 | V06 |
| 480 | 12.6 Edits, regeneration, replay and warp, as functions of … | rendering |  | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-16 | V08 |
| 481 | 12.8 Memory (what is counted, per rung) | rendering |  | STAGED (M3c, the built-in clerk). | BCR-V10-19 | V10 |
| 482 | 13.2 Per-stage invariants, statistics, cost-model tests, co… | scope | rendering | STAGED (M6-P, the plan rung). | BCR-V3-9 | V03 |
| 483 | 13.2 Per-stage invariants, statistics, cost-model tests, co… | scope |  | STAGED (M6-P, the plan rung). | BCR-V3-14 | V02, V03 |
| 484 | 13.2 Per-stage invariants, statistics, cost-model tests, co… | scope |  | STAGED (M6-U, the underground layer). | V04 BCR-15 | V04 |
| 485 | 13.2 Per-stage invariants, statistics, cost-model tests, co… | scope |  | STAGED (M6-U, the underground layer). | V04 BCR-22 | V04 |
| 486 | 13.2 Per-stage invariants, statistics, cost-model tests, co… | scope |  | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-17 | V08 |
| 487 | 13.2 Per-stage invariants, statistics, cost-model tests, co… | scope |  | STAGED (M3c, the built-in clerk). | BCR-V10-11 | V10 |
| 488 | 13.2 Per-stage invariants, statistics, cost-model tests, co… | scope |  | BASE (M-1–M4, the calibration rig). | BCR-V12-13 | V12 |
| 489 | 13.2 Per-stage invariants, statistics, cost-model tests, co… | scope |  | BASE (M-1–M4, the calibration rig). | BCR-V12-16 | V12 |
| 490 | 13.3 Seed goldens with the declared-shift protocol (G-P11, … | scope |  | BASE (M1–M3b, the reference UI (AP1–AP4)). | BCR-V9-24 | V09 |
| 491 | 13.3 Seed goldens with the declared-shift protocol (G-P11, … | scope |  | BASE (M-1–M4, the calibration rig). | BCR-V12-7 | V12 |
| 492 | 13.3 Seed goldens with the declared-shift protocol (G-P11, … | scope |  | BASE (M-1–M4, the calibration rig). | BCR-V12-19 | V12 |
| 493 | 13.3 Seed goldens with the declared-shift protocol (G-P11, … | scope |  | BASE (M-1–M4, the calibration rig). | BCR-V12-20 | V12 |
| 494 | 13.4 Visual regression, B-ZOOM and the app harness | scope |  | BASE (§16 bookkeeping). | BCR-V9-17 | V09 |
| 495 | 13.5 Reference-parity metrics (B-REF), read from one number… | scope |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-23 | V07, V12 |
| 496 | 13.5 Reference-parity metrics (B-REF), read from one number… | scope |  | BASE (M-1–M4, the calibration rig). | BCR-V12-1 | V12 |
| 497 | 13.5 Reference-parity metrics (B-REF), read from one number… | scope |  | BASE (M-1–M4, the calibration rig). | BCR-V12-2 | V12 |
| 498 | 13.6 The owner's side-by-side protocol (D-5) | scope |  | STAGED (M5, stage 2). | V01 BCR-21 | V01, V12 |
| 499 | 13.6 The owner's side-by-side protocol (D-5) | scope |  | STAGED (M6, stage 3). | BCR-V2-25 | V02, V12 |
| 500 | 13.6 The owner's side-by-side protocol (D-5) | scope |  | BASE (M-1–M4, the calibration rig). | BCR-V12-6 | V12 |
| 501 | 13.7 Thresholds without a reference source (IMP-6, DEF-1; D… | scope |  | BASE (M-1–M4, the calibration rig). | BCR-V12-12 | V11, V12 |
| 502 | 13.8 CI tiers and compute budgets (SCL-18; D-34) | scope |  | BASE (M-1–M4, the calibration rig). | BCR-V12-14 | V12 |
| 503 | 13.9 The corpus-calibration interface (staged by the owner;… | scope |  | STAGED (M-CAL, the corpus reconciliation). | BCR-V12-3 | V12 |
| 504 | 13.9 The corpus-calibration interface (staged by the owner;… | scope |  | STAGED (M-CAL, the corpus reconciliation). | BCR-V12-4 | V12 |
| 505 | §14 Package and module layout, key interfaces, dependency r… | scope |  | BASE (M1, M2b, M3a) for V01 BCR-1's early parts as the note lists them; STAGED … | BCR-V2-18, BCR-V3-31, BCR-V7-10, V01 BCR-1, V04 BCR-12 | V01, V02, V03, V04, V07 |
| 506 | §14 Package and module layout, key interfaces, dependency r… | scope |  | BASE (M3a, item 110 (b)'s rung gate and data key). | BCR-V7-34 | V01, V07 |
| 507 | §14 Package and module layout, key interfaces, dependency r… | scope |  | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-3 | V08, V09 |
| 508 | §14 Package and module layout, key interfaces, dependency r… | scope |  | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-4 | V08 |
| 509 | §14 Package and module layout, key interfaces, dependency r… | scope |  | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-5 | V08 |
| 510 | §14 Package and module layout, key interfaces, dependency r… | scope | model, determinism, kernel | STAGED (SettlementForge stage, SF0 to SF7; V11 C4). | BCR-V11-4, BCR-V8-10 | V08, V11 |
| 511 | §14 Package and module layout, key interfaces, dependency r… | scope | determinism | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-13 | V08 |
| 512 | §14 Package and module layout, key interfaces, dependency r… | scope |  | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-23 | V08 |
| 513 | §14 Package and module layout, key interfaces, dependency r… | scope |  | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-27 | V08 |
| 514 | §14 Package and module layout, key interfaces, dependency r… | scope |  | BASE (M1–M3b, the reference UI (AP1–AP4)). | BCR-V9-1 | V09 |
| 515 | §14 Package and module layout, key interfaces, dependency r… | scope | determinism | BASE (M1–M3b, the reference UI (AP1–AP4)). | BCR-V9-2 | V09 |
| 516 | §14 Package and module layout, key interfaces, dependency r… | scope |  | BASE (M1–M3b, the reference UI (AP1–AP4)). | BCR-V9-8 | V07, V08, V09, V10, V11 |
| 517 | §14 Package and module layout, key interfaces, dependency r… | scope |  | BASE (M1–M3b, the reference UI (AP1–AP4)). | BCR-V9-9 | V09 |
| 518 | §14 Package and module layout, key interfaces, dependency r… | scope | rendering | STAGED (M3c, the built-in clerk). | BCR-V10-8 | V10 |
| 519 | §14 Package and module layout, key interfaces, dependency r… | scope |  | STAGED (M3c, the built-in clerk). | BCR-V10-14 | V10 |
| 520 | §14 Package and module layout, key interfaces, dependency r… | scope |  | STAGED (with item 510; V11 C4). | BCR-V11-4 | V11 |
| 521 | §14 Package and module layout, key interfaces, dependency r… | scope |  | BASE (M-1–M4, the calibration rig). | BCR-V12-10 | V12 |
| 522 | 15.1 Parity matrix — every capability row of `docs/confiden… | scope |  | BASE (M2b) for BCR-V2-19's §13.2 bullet — its T-V2-52 clause from M2b, its T-V2… | BCR-V2-19 | V02, V12 |
| 523 | 15.2 Improvement matrix — every must-have / should-have / h… | scope |  | STAGED (M5, stage 2). | V01 BCR-24 | V01 |
| 524 | §16 Build plan — calibration and spikes first, then a viewa… | scope |  | STAGED (M6, stage 3). | BCR-V2-20 | V02, V03 |
| 525 | §16 Build plan — calibration and spikes first, then a viewa… | scope |  | BASE (M3a, item 110 (c)–(d) through the base outline builder (BCR-V2-39)). | BCR-V2-37 | V02 |
| 526 | §16 Build plan — calibration and spikes first, then a viewa… | scope |  | STAGED (M6-U, the underground layer). | V04 BCR-13 | V04 |
| 527 | §16 Build plan — calibration and spikes first, then a viewa… | scope |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-16 | V07 |
| 528 | §16 Build plan — calibration and spikes first, then a viewa… | scope |  | STAGED (with item 202). | BCR-V7-17 | V07 |
| 529 | §16 Build plan — calibration and spikes first, then a viewa… | scope |  | STAGED (SettlementForge stage, SF0 to SF7). | BCR-V8-18 | V08, V12 |
| 530 | §16 Build plan — calibration and spikes first, then a viewa… | scope |  | BASE (§16 bookkeeping). | BCR-V9-18 | V09 |
| 531 | §16 Build plan — calibration and spikes first, then a viewa… | scope |  | BASE (M3a, the oracle and the tool API (item 101)). | BCR-V10-10 | V10 |
| 532 | §16 Build plan — calibration and spikes first, then a viewa… | scope |  | BASE (§16 bookkeeping, V11 §8). | BCR-V11-11 | V11 |
| 533 | §16 Build plan — calibration and spikes first, then a viewa… | scope |  | BASE (M-1–M4, the calibration rig). | BCR-V12-9 | V12 |
| 534 | 17.1 The clean-room chain (IMP-1; D-29) | scope |  | BASE (M0 (b), V11 C0). | BCR-V11-21 | V11 |
| 535 | 17.1 The clean-room chain (IMP-1; D-29) | scope |  | BASE (M-1–M4, the calibration rig). | BCR-V12-8 | V12 |
| 536 | 17.1 The clean-room chain (IMP-1; D-29) | scope |  | BASE (M-1–M4, the calibration rig). | BCR-V12-18 | V12 |
| 537 | 17.1 The clean-room chain (IMP-1; D-29) | scope |  | BASE (M-1–M4, the calibration rig). | BCR-V12-21 | V12 |
| 538 | 17.4 Dependencies (IMP-14) | scope |  | STAGED (M3c, the built-in clerk). | BCR-V10-9 | V10 |
| 539 | II.1 The district → neighbourhood interface | pipeline |  | STAGED (M5, stage 2). | V01 BCR-2 | V01 |
| 540 | II.1 The district → neighbourhood interface | pipeline |  | BASE (M1). | V01 BCR-28 | V01 |
| 541 | II.1 The district → neighbourhood interface | pipeline |  | STAGED (M5, stage 2). | V01 BCR-30 | V01 |
| 542 | II.2 Templates as fabric strategies (NG B2, B7, B8) | pipeline |  | STAGED (M5, stage 2). | V01 BCR-20 | V01 |
| 543 | II.2 Templates as fabric strategies (NG B2, B7, B8) | pipeline |  | STAGED (M5, stage 2). | V01 BCR-38 | V01 |
| 544 | II.3 Block content dispatch, pins, local identities (stage-… | pipeline |  | STAGED (M5, stage 2). | V01 BCR-22 | V01 |
| 545 | II.4 The render tier, the workflow and the close-up's persi… | pipeline |  | STAGED (M5, stage 2). | V01 BCR-23 | V01 |
| 546 | II.6 The staged layers — floating islands and sewers: the h… | pipeline |  | STAGED (M6-sky). | BCR-V5-4 | V05 |
| 547 | II.6 The staged layers — floating islands and sewers: the h… | pipeline |  | STAGED (M6-sky). | BCR-V5-17 | V05 |
| 548 | II.7.1 Existence by tier (item 14): the rung row, the S0 dr… | pipeline |  | STAGED (M6-U, the underground layer). | V04 BCR-28 | V04 |
| 549 | II.7.1 Existence by tier (item 14): the rung row, the S0 dr… | pipeline | determinism | STAGED (M6-U, the underground layer). | V04 BCR-37 | V04 |
| 550 | II.7.1 Existence by tier (item 14): the rung row, the S0 dr… | pipeline |  | STAGED (M6-E, the evolution engine). | BCR-V6-16 | V06 |
| 551 | II.7.3 The underground neighbourhoods (item 12): the owner'… | pipeline |  | STAGED (M6-U, the underground layer). | V04 BCR-19 | V04 |
| 552 | II.7.3 The underground neighbourhoods (item 12): the owner'… | pipeline |  | STAGED (M6-U, the underground layer). | V04 BCR-27 | V04 |
| 553 | II.7.3 The underground neighbourhoods (item 12): the owner'… | pipeline |  | STAGED (M6-U, the underground layer). | BCR-V11-15 | V11 |
| 554 | II.7.4 The hook interfaces and the base's part | pipeline |  | STAGED (M6-U, the underground layer). | V01 BCR-37, V04 BCR-29 | V01, V04 |
| 555 | II.7.4 The hook interfaces and the base's part | pipeline |  | STAGED (M6-U, the underground layer). | V04 BCR-21 | V04 |
| 556 | II.7.4 The hook interfaces and the base's part | pipeline | determinism | STAGED (M6-U, the underground layer). | V04 BCR-23 | V04 |
| 557 | II.7.4 The hook interfaces and the base's part | pipeline |  | STAGED (M6-U, the underground layer). | V04 BCR-30 | V04 |
| 558 | II.7.5 The undercity (item 65): what it requires, existence… | pipeline |  | STAGED (M6-U, the underground layer). | V04 BCR-42 | V04 |
| 559 | II.7.6 Catacombs, caverns and quarries; depth bands and the… | pipeline |  | STAGED (M6-U). | V04 BCR-20, V04 BCR-45 | V04 |
| 560 | II.7.6 Catacombs, caverns and quarries; depth bands and the… | pipeline | kernel | STAGED (M6-U, the underground layer; volume 1's place for it with M5). | V01 BCR-36, V04 BCR-36 | V01, V04, V11 |
| 561 | II.7.6 Catacombs, caverns and quarries; depth bands and the… | pipeline | determinism | STAGED (M6-U, the underground layer). | V04 BCR-24 | V04 |
| 562 | II.7.6 Catacombs, caverns and quarries; depth bands and the… | pipeline |  | STAGED (M6-U, the underground layer). | V04 BCR-26 | V04 |
| 563 | II.7.6 Catacombs, caverns and quarries; depth bands and the… | pipeline |  | STAGED (M6-U, the underground layer). | V04 BCR-31 | V04 |
| 564 | II.7.6 Catacombs, caverns and quarries; depth bands and the… | pipeline |  | STAGED (with item 560, M6-U). | V04 BCR-36 | V04, V11 |
| 565 | II.7.6 Catacombs, caverns and quarries; depth bands and the… | pipeline |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-27 | V04, V07 |
| 566 | II.7.6 Catacombs, caverns and quarries; depth bands and the… | pipeline |  | STAGED (M6-U, the underground layer). | BCR-V11-14 | V11 |
| 567 | §16 Build plan — calibration and spikes first, then a viewa… | scope |  | STAGED (M6-P) — §16 bookkeeping. | BCR-V3-30 | V02, V03 |
| 568 | §16 Build plan — calibration and spikes first, then a viewa… | scope | rendering | BASE (§16 bookkeeping). | BCR-V11-11, BCR-V2-20, BCR-V2-37, V01 BCR-19 | V01, V02, V03, V04, V05, V06, V07, V08, V09, V10, V11, V12 |
| 569 | Staged by the owner's roadmap (this document defers nothing) | scope |  | STAGED (M-CAL, the corpus reconciliation). | BCR-V12-11 | V12 |
| 570 | 7.1 Edits are ordered events on addresses; the named action… | determinism |  | BASE (M1–M3b, the reference UI (AP1–AP4)). | BCR-V9-35 | V09, V10 |
| 571 | 7.1 Edits are ordered events on addresses; the named action… | determinism |  | BASE (M3a, the oracle and the tool API (item 101)). | BCR-V10-23 | V09, V10 |
| 572 | 11.2 The embedding API and the worker boundary (SCL-6) | rendering |  | BASE (M3a, the oracle and the tool API (item 101)). | BCR-V10-22 | V08, V09, V10, V08 |
| 573 | 4.11 Incremental mode, transformations and conversions (the… | pipeline |  | STAGED (M6-E, the evolution engine). | BCR-V6-27 | V04, V06, V08 |
| 574 | 4.11 Incremental mode, transformations and conversions (the… | pipeline |  | STAGED (M6-U, the underground layer; with item 319). | BCR-V6-28 | V04, V06 |
| 575 | 2.7 Walls, gates, towers, castle, bridges; greenery, land u… | model | pipeline, rendering, kernel | BASE (M4, with §4.11's decline table and `DeclineOp`). |  | V05, V06, V12, V12 |
| 576 | 10.2 Roster (data-driven, replaceable; sequential and prefi… | pipeline | model | STAGED (the village product, V-M0 to V-M4). | BCR-V7-36 | V07, V11 |
| 577 | PART III — What a later village product needs from the base… | pipeline |  | STAGED (with item 202). | BCR-V7-37 | V07 |
| 578 | 2.6 Buildings, heights and ground datum, wings, materials, … | model | scope | STAGED (M6-P, the plan rung) for the step-3 and T28-3 texts; `basementDoor(b)` … | BCR-V3-32 | V01, V02, V03 |
| 579 | 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b… | pipeline |  | STAGED (the village product, V-M0 to V-M4). | BCR-V7-38 | V07 |
| 580 | 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, rese… | pipeline |  | STAGED (M5, stage 2 — built by volume 1's W8 on a fixture island; in use on rea… | V01 BCR-45 | V01, V05 |
| 581 | 7.6 The override layer and editable tables (G-P12; owner am… | determinism |  | STAGED (the village product, V-M0 to V-M4, with item 377). | BCR-V11-31 | V06 |
| 582 | 7.1 Edits are ordered events on addresses; the named action… | determinism | pipeline | BASE (M3a, the authoring toolkit). |  | V09, V10 |
| 583 | 11.2 The embedding API and the worker boundary (SCL-6) | rendering |  | STAGED (SettlementForge stage, SF0 to SF7), with volume 9's AP5b (T-V9-69). | BCR-V9-36 | V08, V09, V10, V08 |
| 584 | 7.6 The override layer and editable tables (G-P12; owner am… | determinism |  | STAGED (M5, stage 2) — the milestone of the first `NG` entry, a stage-2 column … | V01 BCR-46 | V01, V11, V12 |
| 585 | 13.7 Thresholds without a reference source (IMP-6, DEF-1; D… | scope |  | STAGED (M6-P, the plan rung), whose intake runs the band. | BCR-V3-33 | V03 |

## File g — items 102–113

Items 102–110 are applied to the base like f items (the volumes carry their parts, integrated by the volumes pass); items 111–113 reached the program after that, so EVERY unit named writes its part at build depth as new design (a verifier raises F-MISSING where a part is absent). Parts marked WIRING CONSEQUENCE are not named by the item but are needed so the pieces it adds are wired both ways (principle (7)).

