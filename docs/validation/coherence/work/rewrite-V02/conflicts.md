### MC-01 (model; ) — FIX

* statement: §2.5 rules "this document says plot except when quoting" (lot retired), yet §2 uses lot outside quotations: "the lot mix" (CharacterVector.mix), "the lot cut" / "bent lot cuts" (BaseWing.kind, row footprints), BuildingInput.lot, "lot-driven", "lot-derived", "the lot polygon" (stage-3 hook), "a lot-driven composer" (PathShapeRow).
* *Where:* ['§2.5 (plot vs lot rule)', '§2.5 CharacterVector.mix', '§2.6 BaseWing.kind quad', '§2.6 row footprints', '§2.6 BuildingInput.lot', '§2.6 stage-3 hook', '§2.6 PathShapeRow']
* **Ruling:** 'lot' is retired outside quotations (glossary G-lot): prose 'lot' → 'plot'; the field BuildingInput.lot is renamed BuildingInput.plot (type unchanged) and every reader (V02, V03) follows.
* *Basis:* §2.5's own rule (R1); principle (2). *Units:* model, V02, V03.

### MC-11 (model; ) — FIX

* statement: §2 uses seven types that are declared only in a volume, never in the base: Rung (V07), TableId (V11), Outfall (V04), Segment (V10), TypedBoundary and FabricStrategyId (V01), DriftBounds (V02). A base record depending on a volume-declared type inverts principle (1) (the base owns what the base builds; Rung alone is used 24 times in the base).
* *Where:* ['§2.2 PlatKey/Recipe.rung (Rung)', '§2.8 SliceRef.table / Recipe.tablePins (TableId)', '§2.3 Terrain.outfalls, §2.7 Tunnel.outfall (Outfall)', '§2.6 BuildingInput.access (Segment)', '§2.5 District.boundary (TypedBoundary), District.fabric (FabricStrategyId)', '§2.6 BuildingInput.drift, Building.dr…
* **Ruling:** Every type a base record uses is declared in the base: Rung (§1.1 with RungProfile), TableId (§7.6), Outfall (§2.3), Segment (§2.1), TypedBoundary and FabricStrategyId (§2.5, with f item 505's @plat/model additions), DriftBounds (§2.6, f item 385 BCR-V2-08 types it). The volumes that declared them cite the base declaration; their fields and meanings unchanged.
* *Basis:* principle (1): the base owns what the base builds; f items 385, 505. *Units:* model, V07, V11, V04, V10, V01, V02.

### V01-ICONF-4 (vol-V01-V02; minor) — FIX

* claim: V1-3.17.3 (3) states the soffit bound as the crossed class's clearanceCm from V11 raisedWays.structure, while IN-V01-9 rules it is f item 244's clearance rule (the held clearanceCm, else V11's per class): the held per-way value is missing from V1-3.17.3's text.
* *Where:* V1-3.17.3 (3) vs IN-V01-9
* **Ruling:** The soffit bound over a crossed way is file f item 244's clearance rule (the way's held clearanceCm first, else V11's raisedWays.structure.clearanceCm for the crossed class); V1-3.17.3 (3) and V02 §3.17 (b) cite it identically.
* *Basis:* f item 244 (the base home); J-VI.27. *Units:* V01, V02.

### V02-ICONF-1 (vol-V01-V02; minor) — FIX

* claim: V02 hosts the composition.classFamily table in composition.json and states 'volume 7 keeps this table as the one source of the village classes' composition keys (J-V7.82)': the table's canonical home is stated as another volume's while its rows are written here (single source ambiguous).
* *Where:* §3.10.5 classFamily ownership
* **Ruling:** composition.classFamily's home is V02 §3.10.5 (composition.json); its v.-keyed rows are the one source of the village classes' composition keys; V07 cites the table and names no second source.
* *Basis:* single source (1). *Units:* V02, V07.

### V02-ICONF-2 (vol-V01-V02; minor) — FIX

* claim: The volume's effort is stated as a running history of totals (17.25-24.75; +3.25-4.75 fold; +1.75-2.5 second revision -> 22.25-32; +0.25-0.5 round 1 -> 22.5-32.5; 'M6 18-27 pw (18.25-27.5 with it)'; 'M3a's part 2-2.75 pw'; 'BCR-V2-37 restated'), several superseded numbers side by side; the one current total a reader and §16 need is ambiguous without arithmetic (and the per-milestone rows of §8.3 and §8.5 must be summed to reach it).
* *Where:* §8.3 effort paragraphs and §8.5 effort
* **Ruling:** V02 §8 states the current effort once (the volume 22.5–32.5 pw; M6 18.25–27.5; the M3a part 2–2.75; spikes 2.25) with the per-milestone table as its breakdown; the history leaves (validation records); §16 counts it by item 568.
* *Basis:* f item 568; principle (5). *Units:* V02.

### V02-ICONF-3 (vol-V01-V02; minor) — FIX

* claim: R5's fallback ends with 'a failure halves the step at most once more before the step is refused (reported)': a warp step refused on a building's validation contradicts the no-refusal rule (item 101 R2; J-V2.79: refusals only for a lock or a dossier fact) and §5's ladder (no rung may be a plain refusal without a defined bend); the edge outcome (what the warp does to that building) is undefined.
* *Where:* §8.4 R5 fallback 'before the step is refused (reported)'
* **Ruling:** R5's last rung is a bend: the warp's step for that building is held at the last lawful fraction and named in the dry run (item 101 R2), never a refusal.
* *Basis:* owner item 101 R2 (J-VI.4). *Units:* V02.

### V02-ICONF-4 (vol-V01-V02; minor) — FIX

* claim: Round 1's 0.25–0.5 pw is said to fall 'inside M6a–M6c and M3a-V2', yet the milestone arithmetic puts all of it in M6 (18.25–27.5) and keeps M3a's part at 2–2.75 pw, and BCR-V2-37 says '+ 0.25–0.5 pw inside M6'; the hole sentence moved to M3a (J-V2.104) likewise stays 'inside M3a-V2's 2–2.75 pw'.
* *Where:* §8.3 line 3464 vs §8.3 line 3467 and BCR-V2-37
* **Ruling:** Round 1's 0.25–0.5 pw falls inside M6 (18.25–27.5), as BCR-V2-37 states; the hole sentence's cost inside M3a-V2's 2–2.75.
* *Basis:* one placement. *Units:* V02.

### V02-XCONF-1 (vol-V01-V02; minor) — FIX

* claim: V02 says 'the least soffit over a crossed way is volume 11's raisedWays.structure.clearanceCm, which volume 1 reads'; V01's IN-V01-9 (J-VI.27) rules the soffit bound is f item 244's clearance rule (the held clearanceCm, else V11's per class). The two volumes state the source of the one soffit bound differently (the held per-way value is absent in V02 and in V1-3.17.3).
* *Where:* V02 §3.17 (b) vs V01 IN-V01-9 and V1-3.17.3 (3)
* **Ruling:** The soffit bound over a crossed way is file f item 244's clearance rule (the way's held clearanceCm first, else V11's raisedWays.structure.clearanceCm for the crossed class); V1-3.17.3 (3) and V02 §3.17 (b) cite it identically.
* *Basis:* f item 244 (the base home); J-VI.27. *Units:* V01, V02.

### V09-XAGREE-3 (vol-V09-V10; major) — FIX

* claim: V02 names its stacked-massing and deck bends bend.tiers.stepped, .none, .axial, .internal, .count, .step, bend.stack.groundWing, .roof, .base, bend.deck.single, bend.deck.basement, bend.building.remove, bend.wing.grow, bend.family.nearest, bend.room.passage, bend.row.plotLine, and states 'volume 9's (X21) … under the ids of V2 §1b'. V09's catalogue holds bend.tiers.count and bend.tiers.step (shared) but otherwise bend.tiers.flights, bend.tier.height, bend.stack.internalSolid, .removeStair, .addWing, .deck, .notStepped and bend.deck.floors — none of which V02 emits — and has no row for fourteen of V02's ids. IN-V09-4 ('every bend of V2 §1b … has a catalogue row') was never applied to …
* *Where:* V09 §4.9 catalogue (tier/stack/deck bend rows) and §4.20.5 vs V02 §1b bend ids (V02 line 303, 2695)
* **Ruling:** V02 §1b's bend ids are the one set (V02 owns the massing dry run): V09 §4.9 holds one row per V02 id with its words and buttons; V09's keys with no producer are retired, unless V02 finds the case among V2 §4.6's bends, names it in §1b and V09 keeps the row; T-V9-59 and §4.20.5 re-point. V10 words each bend through V09's rows.
* *Basis:* producer owns the id; T-V9-15 (no key without a row). *Units:* V02, V09, V10.

### CANON-C03 (canon; major) — FIX

* INDEX §6: 'Until the owner answers, each volume runs on its recommendation' and twenty-five open questions.
* J121/J122 answered every one.
* **Ruling:** INDEX §6 becomes the table of decisions (OWNER_Q); every volume's §11 likewise.
* *Basis:* J121, J122. *Units:* scope, V01, V02, V03, V04, V05, V06, V07, V08, V09, V10, V11, V12.

