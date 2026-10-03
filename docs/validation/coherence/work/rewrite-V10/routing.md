# V10 routing (extracted from canon.md)

## Conflicts

### DIC-06 (determinism; minor) — FIX

* claim: The tool ids T1-T12 share the T-prefix namespace with test ids (T8-1 ... T8-3, T12-1, T19-4, T65 fixtures, T73-8): "T8" and "T12" read as either a tool or an item's test group (§16 also cites "item 101's T2-T8" for tools). Principle (4) requires ids unique across the set.
* *Where:* ['§7.1 twelve tools', '§7.8 T1 intend', '§13.2 test ids']
* **Ruling:** Resolved by canon ID-TOOL: bare T1–T12 are item 101's tools, always written with the tool word at first use in a paragraph (T8 `fill`); an item's bars are always written with their number (T8-1, 'the T8-n bars'), never a bare T8.
* *Basis:* owner item 101 names the tools (owner rule > base); canon ID-TOOL. *Units:* determinism, scope, V07, V09, V10.

### DIC-07 (determinism; minor) — FIX

* claim: The toolkit's commitment layers are labelled L0-L4 (intent ... finish), the same labels as the arena refinement levels L0-L4 used in the same sections (a warp's fromLevel 0¦1, "one L1 batch", "one L0 batch").
* *Where:* ['§7.1 twelve tools (layers L0-L4)', '§7.3 (b) L0/L1 batches; §2.2 levels']
* **Ruling:** Keep both label sets: the toolkit's commitment layers keep item 101's names and are always written with their word (L0 INTENT, L1 FORM … or 'the INTENT layer'); a bare L0–L4 means a plat refinement level (§2.2).
* *Basis:* owner item 101 names the layers (owner rule); D-13 names the levels; ID convention, no renaming of either. *Units:* determinism, V09, V10.

### DXC-04 (determinism; major) — FIX

* claim: Principle (7) requires every edit kind to have its tool. §7.1's twelve-tools table maps 40 of the 70 EditEvent kinds (31 by name, the eight plan events and adjust by description); 30 have no row: unlock, unpin, moveVertex (named only as a handle drag), drawBoundary (named only in the points-form prose), swapUse, setAttrMany, instance, delete, merge, rejectSite, unassign, drawPassage, drawTunnel, drawChamber, addLink, addUndergroundAccess, placeAccess, convert (every ConversionOp), startWorks, cancelWorks, placeLight, rerollLayer, editTable, editPreset, closeup, epoch, rebase, upgrade, undo and redo (script count over the union and the table). V09 §4.3 maps every kind to a home tool, …
* other: V09 §4.3 "The tool binding table — every edit kind and where a user reaches it" (T-V9-12); V10 §3.5 tool encoders; f items 368 (BCR-V10-20: delete joins T10), 570, 353, 272 and the other §7.1 f items (582, 348-368, 571)
* **Ruling:** The event → tool binding has ONE home: §7.1 gains the complete table — every EditEvent kind (the base's 70 and the volumes' added kinds) with its home tool among T1–T12, using V09 §4.3's assignments as the content (delete → T10; startWorks/cancelWorks → T9; placeLight and style rerollLayer → T12; naming rerollLayer → T11; drawTunnel/addLink → T4; drawChamber/placeAccess/addUndergroundAccess/relet/use conversions → T6; sealing/ladder/decline conversions → T9; …) and the history-only kinds (undo, redo, rebase, upgrade, epoch, closeup) marked with their producer. §7.4's create cells cite tools by id. V09 §4.3 keeps its screen, gesture and panel columns and cites §7.1 for the binding; V10 §3.5's encoders cite §7.1.
* *Basis:* principle (7) every edit kind has its tool; R6 (§7 owns edit events); the binding is shared by V09 and V10 so the base owns it (1); closes W-EDIT-01. *Units:* determinism, V09, V10.

### MC-11 (model; ) — FIX

* statement: §2 uses seven types that are declared only in a volume, never in the base: Rung (V07), TableId (V11), Outfall (V04), Segment (V10), TypedBoundary and FabricStrategyId (V01), DriftBounds (V02). A base record depending on a volume-declared type inverts principle (1) (the base owns what the base builds; Rung alone is used 24 times in the base).
* *Where:* ['§2.2 PlatKey/Recipe.rung (Rung)', '§2.8 SliceRef.table / Recipe.tablePins (TableId)', '§2.3 Terrain.outfalls, §2.7 Tunnel.outfall (Outfall)', '§2.6 BuildingInput.access (Segment)', '§2.5 District.boundary (TypedBoundary), District.fabric (FabricStrategyId)', '§2.6 BuildingInput.drift, Building.dr…
* **Ruling:** Every type a base record uses is declared in the base: Rung (§1.1 with RungProfile), TableId (§7.6), Outfall (§2.3), Segment (§2.1), TypedBoundary and FabricStrategyId (§2.5, with f item 505's @plat/model additions), DriftBounds (§2.6, f item 385 BCR-V2-08 types it). The volumes that declared them cite the base declaration; their fields and meanings unchanged.
* *Basis:* principle (1): the base owns what the base builds; f items 385, 505. *Units:* model, V07, V11, V04, V10, V01, V02.

### SCOPE-C07 (scope; CONFIRMED) — FIX

* statement_a: §14 (l.14513-14529): a clerk is the host's own or 'the built-in one, which is staged'; the built-in clerk opt-in and labelled as AI; Staged list: 'the built-in clerk comes after the API'; J-A101.02.
* statement_b: J121: the assistant and its model tier follow SettlementForge; J122 decisions V10 Q2 ('SettlementForge's [assistant], driving our tool API') and V10 Q4 ('the built-in clerk as M3c beside M3b').
* *Where:* §14, Staged list, J-A101.02 vs J121/J122
* **Ruling:** Per J121/J122: in the SettlementForge module SettlementForge's assistant drives the map's tool API through the host seam (configuration C, V10 Q2); the built-in clerk ships at M3c beside M3b and runs only where the deployment's configuration enables it; the provider, model tier and key path are configuration inputs read from SettlementForge's AI setup (J121), never decided by the design. §14's clerk paragraph, the Staged list and J-A101.02's index row say so.
* *Basis:* J121, J122. *Units:* scope, V10, V09, V08.

### SCOPE-C16 (scope; CONFIRMED (cohesion, principle 4)) — FIX-BY-F

* statement_a: §14 lists 17 packages (@plat/kernel … @plat/testkit) and the dependency chain over them.
* statement_b: The volumes declare further packages: @plat/buildings (V01–V03), @plat/under (V04, V06), @plat/sky (V05, V06), @plat/evolve (V06), @plat/village (V06, V07, V11), @plat/bridge-client (V08), @plat/clerk (V09–V11), @plat/cli (V10) — none placed in §14 or its dependency rules.
* *Where:* §14 vs V01–V12
* **Ruling:** §14 places every volume package with its dependency rules by file f items 505 (@plat/hood, @plat/buildings with the plan rung, @plat/under, @plat/village), 317 (BCR-V6-1 (b) @plat/evolve), 476 (BCR-V5-14 @plat/sky), 507 (BCR-V8-3 @plat/bridge-client), 518 (BCR-V10-8 @plat/clerk), 521 (BCR-V12-10 the calibration package) and canon W-PKG-01 (@plat/cli, V10's command-line clerk); the dependency chain lists them.
* *Basis:* f items; principle (7) packages declared. *Units:* scope, V10.

### V09-XAGREE-1 (vol-V09-V10; major) — FIX

* claim: V09 and V11 disagree on the shape of the two document-only tables: (1) V09 writes a kind key 'cls:<class>' (a roster class no dossier record binds); V11 lists three key forms only (uid:, cat:, use:); (2) V09 writes split:false and V11's quarter, place and pin cells under the KIND key ('Keep works and shop together for every {kind}', 'Put them in {quarter}', 'Put them here', 'Keep them where they are'), while V11 gives uid: {profile, familyWeights, quarter} and cat: {profile, familyWeights} and puts place, pin and split on use: rows only; (3) V09 says a use: key 'admits the split cell only', V11's use: row carries place, pin, split and specialisation; (4) V09's link view writes siting…
* *Where:* V09 §2.6 (screen → row table), §4.7, §10.2 XV-V9-1/XV-V9-2 vs V11 §4.2 (V11 lines 4012-4030)
* **Ruling:** V11 §4.2 (the tables' owner) states the union of both volumes' needs: siting.declared key forms uid:, cat:, cls: (a roster class no dossier record binds) and use:; the kind keys (uid:, cat:, cls:) admit profile, familyWeights, quarter, place and split; use: admits place, pin, split and specialisation; siting.linkEdits cells {bindTo?, avoid?, cut?} with the three meanings (bindTo keeps a supplier; avoid cuts one, the next nearest serving; cut stops the good at that use). V09 §2.6 maps each screen to a declared cell and cites V11 §4.2; V10 §4.1's encoders write only declared cells; XV-V9-1 and XV-V9-2 are closed.
* *Basis:* the tables' owner rules; union of existing statements, nothing lost. *Units:* V11, V09, V10.

### V09-XAGREE-3 (vol-V09-V10; major) — FIX

* claim: V02 names its stacked-massing and deck bends bend.tiers.stepped, .none, .axial, .internal, .count, .step, bend.stack.groundWing, .roof, .base, bend.deck.single, bend.deck.basement, bend.building.remove, bend.wing.grow, bend.family.nearest, bend.room.passage, bend.row.plotLine, and states 'volume 9's (X21) … under the ids of V2 §1b'. V09's catalogue holds bend.tiers.count and bend.tiers.step (shared) but otherwise bend.tiers.flights, bend.tier.height, bend.stack.internalSolid, .removeStair, .addWing, .deck, .notStepped and bend.deck.floors — none of which V02 emits — and has no row for fourteen of V02's ids. IN-V09-4 ('every bend of V2 §1b … has a catalogue row') was never applied to …
* *Where:* V09 §4.9 catalogue (tier/stack/deck bend rows) and §4.20.5 vs V02 §1b bend ids (V02 line 303, 2695)
* **Ruling:** V02 §1b's bend ids are the one set (V02 owns the massing dry run): V09 §4.9 holds one row per V02 id with its words and buttons; V09's keys with no producer are retired, unless V02 finds the case among V2 §4.6's bends, names it in §1b and V09 keeps the row; T-V9-59 and §4.20.5 re-point. V10 words each bend through V09's rows.
* *Basis:* producer owns the id; T-V9-15 (no key without a row). *Units:* V02, V09, V10.

### V10-XAGREE-1 (vol-V09-V10; major) — FIX

* claim: V10's link op 'avoid' is written as conditional on V11 carrying the cell, and V11 §4.2 does not carry it (cells {bindTo?, cut?}; see the V09/V11 table-shape finding). The clerk's encoder and the canvas's 'Cut this link' (V09 §4.7) therefore write a cell whose home does not declare it; the condition is left open in normative text.
* *Where:* V10 §2.12 ShapeInput.link ('avoid' only where V11's siting.linkEdits carries the cell (V09 XV-V9-2)) and V10 §4.1's link encoder
* **Ruling:** With V11 §4.2's linkEdits carrying `avoid` (V09-XAGREE-1), V10 §2.12 drops the condition and cites V11 §4.2.
* *Basis:* V09-XAGREE-1. *Units:* V10.

### V10-XAGREE-2 (vol-V09-V10; major) — FIX

* claim: WhyPull.family is typed WhyFamily (V11's eight plus nine score terms), but V01's providers emit WhyPulls of families SUNLIGHT, EMITS, SENSITIVE; V10 keeps a translation note ('they read as sun, nuisance and nuisance') and asks V01 to change (CVR-V10-6), which V01 has not done. A value outside the declared enum crosses the seam, and the mapping lives at the consumer instead of the producer.
* *Where:* V10 §2.13 WhyFamily and the family-mapping note vs V01 line 2693 ('the siting pushes as WhyPulls of families SUNLIGHT, EMITS, SENSITIVE')
* **Ruling:** V01's why providers name their pushes by V11's family ids (SUNLIGHT → sun; EMITS and SENSITIVE → nuisance); V10 §2.13 drops the translation note; CVR-V10-6 is met.
* *Basis:* the producer speaks the declared enum (10). *Units:* V01, V10.

### V10-XAGREE-3 (vol-V09-V10; minor) — FIX

* claim: The same size words map to different populations on the two surfaces: the clerk's lexicon fixes 'small town' 2 500, 'town' 5 000, 'large town' 8 000, 'small city' 12 000, 'city' 20 000, 'large city' 28 000, 'metropolis' 50 000, while V09's seven size chips with the same words read population quantiles of the rungs' bands from the rung table (TOWN band's 25th, 50th, 85th percentiles; CITY's; METROPOLIS's median). 'A town' asked in words and picked as a chip can give different recipes; one concept has two mappings (principle (2) and (10)).
* *Where:* V10 §3.3 default lexicon (population rows) vs V09 §4.5 T1 size chips (J-V9.56)
* **Ruling:** One rule for the size words: V09 §4.5's T1 quantile rule (J-V9.56, read from the rung table) is the home; V10 §3.3's lexicon rows name the quantile, not a population number.
* *Basis:* single source with the rung table (1). *Units:* V10, V09.

### V10-XAGREE-4 (vol-V09-V10; major) — FIX

* claim: Three texts disagree on a church on wet ground: V10's crypt section words it 'no crypt: ledger slabs in the chancel floor'; V09 §4.17.5 says 'V03's wet-ground fold reads "floor vaults (wet ground)"' as a crypt form on the church's Below line; V03 has no floor-vault crypt (J-V3.44: 'flush ledger slabs … in a church without a crypt over a floor-vault "crypt"') and lifts an always-crypt on wet ground to a raised-choir crypt (line 140). The panel and the clerk would say different things for one row, and V09's wording names a form V03 rejected.
* *Where:* V10 §3.9a crypt row 'no crypt' vs V09 §4.17.5 crypt line vs V03 (lines 140, J-V3.44)
* **Ruling:** V03 §3.7.4 states the wet-ground rule: an always-crypt class takes the raised-choir crypt; any other church takes no crypt, with ledger slabs in the chancel floor (J-V3.44). V10 §3.9a words both; V09 §4.17.5 cites V03 and drops 'floor vaults'.
* *Basis:* V03 owns the crypt. *Units:* V03, V10, V09.

### V10-J121-1 (vol-V09-V10; major) — FIX

* claim: The plain words fix the provider and key path ('runs on Claude, Anthropic's model … you paste your own Anthropic API key … or the program that embeds the map … provides the connection, or uses its own assistant instead'); J121/J122 decided V10 Q1 (key or relay: follows SettlementForge's AI setup), Q2 (SettlementForge's assistant, driving our tool API) and Q3 (model tier follows SettlementForge; evaluate a cheaper tier before any switch). The SettlementForge module's case is SettlementForge's assistant through the host seam, not the built-in clerk with the user's key.
* *Where:* V10 §0 'Turning it on, and what it costs' (lines 177-183) and §1.3 ("Other providers or a local model — declined by the brief: the built-in clerk runs on Claude"); §2.10 default row ops.model.id (claude-opus-5; "Claude Opus 5.5 is the owner's option (section 11 Q3)"); §3.16 key row ("Your Anthropic…
* **Ruling:** V10 §0, §1.3, §2.10's ops.model.id row and §3.16's key row read the provider, model tier and key path from the deployment's AI configuration (SettlementForge's setup, J121); in the SettlementForge module SettlementForge's assistant drives the tool API through the host seam (J122).
* *Basis:* J121, J122. *Units:* V10.

### V10-J121-2 (vol-V09-V10; major) — FIX

* claim: J121 answered the relay question (V10 Q1: follows SettlementForge's AI setup) and J122 chose SettlementForge's assistant driving our tool API (V10 Q2) for the SettlementForge module, i.e. configuration C there; the volume still leaves the relay 'the owner's (section 11 Q1)', lists A/B/C as a per-deployment choice without naming SettlementForge's decided configuration, and the data notice names the provider as a design constant.
* *Where:* V10 §3.17 configurations table and 'The relay question stays the owner's (section 11 Q1)'; §3.20 data notice ('to Anthropic (or to the service your host chose)'); §8 risk (1) and J-V10.24 ("a relay stays the owner's (section 11 Q1)"); J-V10.4 ("Claude Opus 5.5 … is the owner's option in Q3")
* **Ruling:** V10 §3.17 names SettlementForge's configuration as C (J121/J122) and keeps A and B as the configurations a deployment's setup may enable elsewhere; the data notice names the provider read from the deployment's setup; §8 risk (1), J-V10.24 and J-V10.4 cite J121; Q1 marked answered.
* *Basis:* J121, J122. *Units:* V10.

### V10-J121-3 (vol-V09-V10; major) — FIX

* claim: J121/J122 answered all five (docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md): Q1 key or relay — follows SettlementForge's AI setup (J121); Q2 — SettlementForge's assistant, driving our tool API (J121); Q3 model tier — follows SettlementForge (J121), evaluate a cheaper tier before any switch; Q4 — the built-in clerk as M3c beside M3b (yes); Q5 — the live-evaluation spend approved as a budget cap (about US$790-1 190 through M3c) spent in stages, the smallest tier first, the full suite only at M3c's exit, each spend shown to the owner before it runs. V10 §11 still states them as open with recommendations, and its Q5 figures (US$800-1 200, a weekly schedule) differ from the decided cap and…
* *Where:* V10 §11 Owner questions Q1-Q5 (lines 3367-3409)
* **Ruling:** V10 §11: each question marked answered with its ruling (Q1–Q3 J121; Q4 J122 M3c beside M3b; Q5 J122: a budget cap of about US$790–1 190 through M3c, spent in stages — the smallest evaluation tier first, the full suite only at M3c's exit, each spend shown to the owner before it runs); §7.3's schedule carries the staging.
* *Basis:* J121, J122. *Units:* V10.

### CANON-C02 (canon; major) — FIX

* V06 §13: epochs on a lone neighbourhood document 'deliberately deferred … the gate lifting when a later amendment gives a hood document an S4–S5 route'.
* Principle (6) and the owner's no-defer rule.
* **Ruling:** Stated as a decided rule: a standalone neighbourhood document has no clock; advancing time on it bends to 'a neighbourhood alone has no history yet — open it in its town to advance time' (V09 message row and V10 bend row, V06-WGAP-1a/1b); T-V6-23 tests the bend. No deferral wording.
* *Basis:* principle (6); item 101 R2. *Units:* V06, V09, V10.

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


## Elegance

### E-04 — UNIFY: The event → tool binding: §7.1's partial twelve-tools table, §7.4's create-column tool names and V09 §4.3's table (DEL-06, DXC-04).

* **Unified form:** One binding table at §7.1 keyed by (event kind, target class or path) → home tool; §7.4 cites tools by id; V09 §4.3 keeps screen and gesture columns only.
* **Home:** §7.1 (determinism). **Units that change:** determinism, V09, V10.
* **Equivalence list:**
  * every EditEvent kind (70 base + the volumes' added kinds) has a row
  * history kinds (undo, redo, rebase, upgrade, epoch, closeup) marked with their producer
  * V09's per-target homes kept (split/merge at T5 for districts, T9 for ways and plots; delete at T10 and T9 for access points and galleries; instance at T6, T8, T9)
  * T-V9-12 checks completeness over the pairs

### E-07 — UNIFY: Refusal and bend causes of the dry run: F-EDIT's detection and action columns restate about 25 causes from §7.1, §7.3, §7.4, §7.5, §7.7 (DEL-02), while item 101 R2 / J-VI.4 / J-VI.30 made most of them bends.

* **Unified form:** One dry-run outcome table at §7.1: cause, detection, outcome (refused — only a dossier fact or a lock; else bent), the bend's target or the refusal's offered action, the message key (V09 §4.9), home. §5.2's F-EDIT row cites it.
* **Home:** §7.1 (determinism). **Units that change:** determinism, V09, V10.
* **Equivalence list:**
  * each case's offered alternative stays its own row
  * the dossier-owned refusal (§7.7 item 11) and lock refusals are the only refusals
  * file f item 582's three bends (no site, over budget, occupied join or split) as rows
  * V09's bend.* and refuse.* keys map one to one

### E-17 — UNIFY: The knowledge admission re-stated at each reader: labels §9.2, legend §9.5, thematic rows §8.2, exports §11.1, the API §11.2 (REL-02).

* **Unified form:** One admission function at §9.2 with its readers listed; each reader cites it.
* **Home:** §9.2 (rendering). **Units that change:** rendering, V08, V09, V10.
* **Equivalence list:**
  * the band each reader admits at kept: its view's band, the export's band, or the city band when band-less
  * V09's admitAs (J-V9.86) and V10's filtered dry runs cite it

### E-24 — UNIFY: Superseded or amended decisions marked inline in many forms across the set (EL-07, SCOPE-C02, V01-ICONF-3, V04-ICONF-2, V09-ICONF-5).

* **Unified form:** One mark on the decision row: 'superseded by X' or 'amended by X', in the Judgment-calls index and in every volume's §9.
* **Home:** the index (scope) and each volume's §9. **Units that change:** scope, V01, V02, V03, V04, V05, V06, V07, V08, V09, V10, V11, V12.
* **Equivalence list:**
  * no row dropped
  * the governing row keeps the reason

### E-28 — UNIFY: PlanReport.warnings.code mixes W_ codes with lowerCamel names shrineOneRoom, solidMonument, stackCarried (V03-ELEG-1).

* **Unified form:** Split notes from warnings: PlanReport.notes carries the three camelCase ids (the same ids V10's why causes read, CVR-V10-9); warnings.code holds W_ codes only.
* **Home:** V03 §2.3. **Units that change:** V03, V10.
* **Equivalence list:**
  * same producer and readers
  * the three conditions reported as notes, not lost

### E-32 — UNIFY: Two catalogue sentences for the clerk being unreachable (V10-ELEG-1).

* **Unified form:** One row, refuse.clerk.offline; error.clerkOffline is retired (V9 §3.14 routes an unreachable clerk to refuse.clerk.offline; no producer emits the other).
* **Home:** V10 §3.16 / V09 §4.9. **Units that change:** V09, V10.
* **Equivalence list:**
  * same condition, same user outcome

### E-33 — UNIFY: ClerkHarness, a type alias of ClerkHandle with no member of its own (V10-ELEG-2).

* **Unified form:** ClerkHandle everywhere; the alias is dropped.
* **Home:** V10 §2.6. **Units that change:** V10, V09.
* **Equivalence list:**
  * createClerk(mount) returns ClerkHandle


## g items 111, 113 and dated rulings

### g item 110 — as an f item (the volumes carry their parts, integrated)

* **model:** §2.7 (RetainingWall, the raised ways' parts, deck plots — file f items 244–246)
* **kernel:** §3.4 (ground parts from 1)
* **pipeline:** §4.3 and §4.6 (raised ways, stairs and ramps), §4.7 S10 and S11 (terrace levelling, deck plots)
* **determinism:** §5.3 (the revised deck invariant), §7.1 (T3's retaining kind, T4's raised flag)
* **rendering:** §8 (drawing and shadows)
* **scope:** §13 and §16 (the second known-city fixture at M3a)

### g item 111 — new design at build depth in every named unit; F-MISSING if absent

* **pipeline:** §4.2 S0 and S1: the oasis and spring features and the arid chances (an arid site keeps river, lake and coast at the arid row's chances and gains the oasis; likelier with no other water); §4.2 S3 and §4.4: the water pull on the growth field (travel-cost boundary and nucleus); §4.5: the prosperity water term and item 102's sunlight cell per climate row (zero or toward shade in hot arid rows); §4.7 S10b: wells and fountains weighted to high-yield ground, walking coverage tightened in arid rows; an oasis is water for every rule that reads water
* **model:** WIRING CONSEQUENCE (not named by the item): §2.3 declares the spring and the oasis's records or fields S1 writes (a spring flag on a WaterBody or a Spring feature, the grove and irrigated gardens as LandUse and Greenery rows) with their lifecycle rows
* **determinism:** §7.1: T2 `ground`'s lake point-and-level form with a spring flag (the oasis added or removed by hand), its §7.4 lifecycle row and undo; §7.7: a dossier's `oasis_water` makes an oasis exist (item 20) — its DR row cites DR1
* **rendering:** WIRING CONSEQUENCE: the oasis's spring, grove and gardens draw with existing style rows or named new ones (§8.2), its label kind (§9.1) and its export (§11.1)
* **scope:** §13.2: the bars of item 111 (d) — arid seeds' share of households within walking distance of water above the non-arid baseline; oases only on arid sites unless drawn or supplied; arid sites still draw rivers, lakes and coasts at the arid row's chances; the richest band's mean distance to water below the middle band's; with the oasis chance, the water pull and the climate cell neutral, byte-identical (a NoOpPin, E-20); §0.2's landing row
* **V07:** the village crowding map's water pull and oasis villages
* **V08:** the dossier's desert with or without `oasis_water`, and deserts with rivers, lakes or coasts (the port's mapping; E-31's failure condition reads it)
* **V11:** the oasis chance, grove and garden rows, the water-pull weights and the sunlight cell per climate row
* **V06:** failing springs and oases over epochs (the pull weakens, the quarters around may decline)
* **V05:** an island's own water, unchanged: one sentence stating that item 111's oasis, water pull and climate cell do not apply on a sky island (its water stays V05's)
* **V09:** the tool: T2 `ground`'s spring flag and the oasis in the ground tools, its message rows and binding row
* **V10:** the explanations: why rows for the water pull and the oasis ('why is this quarter here / rich')
* **V12:** the bars: register lines and the NoOpPin registration for item 111's cells

### g item 112 — new design at build depth in every named unit; F-MISSING if absent

* **rendering:** §8: every style family and thematic view that encodes meaning in colour (district tints, prosperity, ownership, knowledge, the underground's systems, water and ground classes) carries a second cue (pattern, line style, label or shape); each such style has checked variants for the three common colour deficiencies, selectable in the view settings; default styles keep their look, the second cues drawn at legend-bearing zoom stops and thematic views; §9: legends show the second cue
* **scope:** §13: the style check (simulated-deficiency contrast between every pair of categories a legend distinguishes, against a table threshold) with its test id; the game-master trial (ten to twenty SettlementForge game masters, at least two sessions of play on their own settlements) as a release gate before the public release; its report must exist before release; participants thanked by credit and early access, no payments; §16's release gate row
* **V09:** the view settings (the checked-variant selector) and the trial's running (recruitment through SettlementForge's community, the sessions, the report)
* **V12:** the trial's record (its findings enter the calibration record and the fix list) and the style check's register line

### g item 113 — new design at build depth in every named unit; F-MISSING if absent

* **pipeline:** §4.2 S0: the history option (a standalone blueprint history such as 'once a city, now a village'); §4.11: history-first generation — the peak, the replay as coarse epochs (decades by default, a table value) from the founding or peak to the present meeting the dossier's present facts exactly, destruction and refounding (the old geometry as ruins, the new settlement reusing roads, gate gaps, bridges and foundations, the salvage ledger), burial past a threshold (a century by default, shortened by floods, silt and rebuilding, lengthened on bare rock), the effective peak (a symbolic peak from evidence, sized at the tier range's lower quartile, marked symbolic); II.7.6: the buried former settlement generalised to the replay (its streets, walls and major buildings at their old ground level), distinct from item 109's ancient ruins
* **determinism:** §7.7: the derivation rows for history (DR36 onward, ID-DR): the peak (peakTier, high-water population, the symbolic peak's evidence order), the replay's events (event → epoch mapping), destruction and refounding, the burial threshold; the replay's record for the clerk (W-DOS-09); §6.1: the replay's streams (deterministic per seed and history)
* **scope:** §13.2: item 113 (g)'s bars (the city-to-village fixture, byte-stable replay, refounded fixture reusing roads, buried ruins past the threshold matching the former geometry, a void LOST on its last link's closing and restored on reopening, a symbolic peak only with evidence, with replay off byte-identical — a NoOpPin); §16: the replay's milestone; §0.2's landing row
* **model:** WIRING CONSEQUENCE: §2.7/§2.8 carry the replay's records the base reads (the history record, the LOST state on an underground link's access path — V04's records — and the `symbolic` provenance flag on a derived fact)
* **V06:** the replay engine at generation: coarse epochs, the event-to-epoch mapping, the generation budget, lazy detail, the replay record; J-V6.4 and §1.3's bullet retired (V06-XCONF-1)
* **V08:** reading SettlementForge's history: AGE_BY_TIER, the founding, the 29 event types with years ago and severity, tierHistory, populationHistory, calamityHistory, the lifecycle (terminal death, resettlement), opt-in ancient ruins, peakTier and its documented gap; the effective peak's evidence order
* **V04:** buried former-town ruins (derived from the former geometry, at their old ground level) and lost access: access counts only through OPEN links; a void whose every open path closes becomes LOST (remembered as once known, drawn faded like an unexcavated void) until refound; dwellings in a lost void empty by the vacancy rules and may return
* **V07:** a village over a former city (the remnants at village rungs) and refounding at village rungs
* **V11:** event-to-epoch rows and burial thresholds (the table values of item 113)
* **V09:** the history option in the editor (the blueprint history) and the LOST void's panel line (V09-WGAP-1)
* **V10:** the story told ('the walls were built when this was a city of twelve thousand'; 'its exact size is not recorded' for a symbolic peak)
* **V12:** the bars and the replay's budget (register lines, the NoOpPin)

### g item 114 — every unit named writes its part
* **model:** §2.7 `Enceinte.condition` — the values `standing` · `worn` · `patched` · `breached` · `dismantled` on item 575's knot profile; each run's material (robust or a patch row) and the epoch of its last change
* **determinism:** §7.1 and §7.4 (`repairWall` takes a material; lifecycle rows for `worn` and `patched`); §7.7 (a derivation row: defence readiness and wealth → the generation-time condition at table shares)
* **rendering:** §8.2 (state rows: `breached` as a break with rubble at every band, `patched` in its material's line style at every band, `worn` at district and finer; the legend; item 112's greyscale rule); §11 (exports carry condition and material; a battle-map export treats a patch as a wall, a breach as an opening)
* **scope:** §13.2 (the bars of item 114 (g)); the judgment index row
* **V06:** §3.7 (need and means as sustained drivers; the transitions of item 114 (c); patch then rebuild; the fabric cap)
* **V07:** the palisade's patch rows and its decay under the same rules
* **V08:** the dossier's `readiness` label and wealth as the drivers' inputs
* **V11:** patch materials by wall kind and culture; the rates and windows
* **V09:** the repair tool's material; the legend panel; **V10:** the story told per run; **V12:** register lines and bars

### g item 115 — every unit named writes its part
* **pipeline:** §4.2 S10b (the rung ceiling on the class mix; the "all manors" rule scoped to TOWN and above); §10.2 (the ceiling table's shape)
* **scope:** §13.2 (the bars of item 115 (f)); the judgment index row
* **V02:** the composition rows' ceiling by rung in the resolution chain (no `H`, `U`, court, tower or turret on a dwelling at THORP and HAMLET; at VILLAGE only the manor)
* **V07:** the village class mix, the manor's singleton rule (a lord or a dossier record), the wealth shift along capped rows
* **V08:** what "specified" reads from the dossier; **V11:** the ceiling table by rung; **V06:** epochs across a rung change
* **V09, V10:** a hand edit beyond the ceiling honoured (item 101 R2) and explained; **V12:** bars

### g item 116 — every unit named writes its part
* **rendering:** §8.8 (the per-map zoom-out limit on the pyramid: the stop where `bounds` fits the viewport's short side plus one stop); §9.5 (framing); §12.5 (budget); T-ER-08 restated (every rung draws every stop from its limit inward)
* **scope:** §13.2 (the bars of item 116 (e)); the judgment index row
* **V07:** §5.2's township view is the limit's view less its margin; **V09:** the view controls stop at the limit; **V12:** bars

### g item 117 — every unit named writes its part
* **model:** §2.9 view state (the year position, week 0–51; the "follow SettlementForge" flag)
* **determinism:** §7.7 (a derivation row: the dossier's calendar week and season → the default view season; the climate's source order: SettlementForge's climate digest, else terrain type with height, else the user's)
* **pipeline:** §4.2 S0 and §10.2 (the biome climate row's season columns: winter severity; leaf, growing, harvest, ice and snow weeks)
* **rendering:** §8.2 (season rows: `ice` role and open leads, fields, gardens, orchards, hedges and trees through the year, snow by climate, boats hauled up; AUTUMN'S PLETHORA OF FALL COVERS, item 117 (f2): a keyed per-tree crown colour from a species palette, fallen-leaf cover on ground, streets, greens, roofs and still water deepening through the leaf-fall weeks, red creepers, rust bracken; the view sun's default height by week, item 102's model daylight untouched); §11 (exports draw and name the season; battle-map ice rule); §12.5 (the re-skin budget)
* **scope:** §13.2 (the bars of item 117 (i)); the judgment index row
* **V07:** the village's fields, strips, commons, green and pond through the year
* **V08:** reading SettlementForge's calendar and the climate digest
* **V11:** season tables by climate and by field, garden and water kind
* **V05:** the sky islands' seasonal look; **V09:** the season control and follow switch; **V10:** the explanations; **V12:** bars

### g item 118 — every unit named writes its part
* **model:** §2.9 view state (festival display: follow / off / preview a festival id)
* **determinism:** §7.7 (`traditions` off the ignore-list: its window and staging consumed through a derivation row; the ignore-list entry amended; the week from item 117's year position)
* **pipeline:** §10.2 (the decoration table by tier and kind; the staging keyword table and the fallbacks by festival kind)
* **rendering:** §8.2 (the decoration rows by tier and band; keyed placement; culture and season motifs; never over a keep-out or a gate's passage); §11 (exports draw and name the festival; battle-map image only); §12.5 (lazy per-tile budget)
* **scope:** §13.2 (the bars of item 118 (h)); the judgment index row
* **V07:** the village and smaller rungs' decorations (garland, bonfire, maypole, the green, the church lane)
* **V08:** reading `traditions` and the custom-content traditions bucket at the baseline; window and staging mapping
* **V11:** the decoration, staging-keyword and culture-motif tables
* **V05:** the sky islands' pennants; **V09:** the festival list and switch; **V10:** the explanations; **V12:** bars

### g item 119 — every unit named writes its part
* **rendering:** §12 (§12.3 and §12.5's laws kept as the TARGETS — as fast as possible; the ten-second total-time COMFORT LEVEL for one-time waits, past which a wait fails; a step slower than its target only for a recorded measured gain; the progress rule past one second; D-18 re-declared as target misses inside the comfort level; §12.10's register rows)
* **scope:** §1 (the performance statement), §13.2 (bars), D-18's entry and the judgment index row
* **pipeline:** §4.1 (where stages may spend the quality budget, each use a table cell with its measured gain)
* **V06:** advance time and the history replay within the ceiling; **V07:** §6's village budgets; **V09:** the progress view
* **V01, V02, V03, V04, V05:** their budget sections read the ceiling for one-time waits and keep their interactive budgets
* **V12:** the bars and how each is measured

## Dated ruling 2026-09-30 — File g items 114–116 routed (orchestrator under J122; J127)

The owner's rules 114 (walls decay into gaps and patchwork and recover), 115 (a ceiling on building grandeur by settlement tier)
and 116 (a zoom-out limit) reached the program on 2026-09-30, after the canon and during the Rewrite phase. They are routed like
items 111–113: EVERY unit named writes its part at build depth as new design; a verifier raises F-MISSING where a part is absent;
the repair round writes a landed unit's part. Precedence: owner rules first (principle (3)).

## Dated ruling 2026-09-30 (later) — File g item 117 routed (orchestrator under J122; J128)

The owner's rule 117 (seasons) is routed like items 111–116: EVERY unit named writes its part at build depth as new design; a
verifier raises F-MISSING where a part is absent; a landed unit writes its part in the repair round. It is a LOOK only: no unit may
make a season change the model or its hash.

## Dated ruling 2026-09-30 (later) — File g item 118 routed (orchestrator under J122; J129)

The owner's rule 118 (festival decorations) is routed like items 111–117: EVERY unit named writes its part at build depth as new
design; a verifier raises F-MISSING where a part is absent; a landed unit writes its part in the repair round. It is a LOOK only:
no unit may make a festival change the model or its hash. It supersedes the port's ignore-list entry for `traditions` (owner rule
first, principle (3)).

## Dated ruling 2026-09-30 (later) — File g item 119 routed (orchestrator under J122; J130)

The owner's rule 119 (as fast as possible; ten seconds of total time is the comfort level — REVISED the same evening) is routed like
items 111–118. §12's present laws stay the TARGETS; D-18's misses stay declared as target misses inside the comfort level. Interaction budgets are untouched: no unit may relax a frame, pan, zoom, drag, preview, hover, inspect or undo budget under it.

## Id hygiene (full)

## Id hygiene

The census (`work/canon/ids.py`) found 3302 defined ids and 693 apparent duplicates, read: the true collisions are ID-BCR (V01/V04 bare BCR-n), volume-local W/X/H rows (ID-WX); every other duplicate is an index row and its Part A entry, a registration row and its bar, an amendment note to the same request or a continued range.

* **ID-BCR** — V01 and V04 number their base change requests bare 'BCR-n' (both 1–46): the same id names two requests (V03 cites 'BCR-29, BCR-30' for V04 and 'its BCR-43' for V01). **Ruling:** Rename into the set's one request family: V01's BCR-n → BCR-V1-n, V04's BCR-n → BCR-V4-n (the number kept). File f's citations 'V01 BCR-n' / 'V04 BCR-n' resolve by this rule and need no edit; every other citation in the set is rewritten. *Units:* V01, V04, V03, V05, V06, V07, V08, V09, V10, V11, V12. *Renumbering:* V01 BCR-n (bare BCR-n in V01) → BCR-V1-n; V04 BCR-n (bare BCR-n in V04) → BCR-V4-n.
* **ID-TOOL** — Tool ids T1–T12 (item 101) and the base's bar family T⟨item⟩-⟨n⟩ share the T prefix; bare 'T8', 'T10', 'T11' in §13.8 mean items' bar groups. **Ruling:** Keep both families (the tools are the owner's item 101 names; the 203 bar ids are cited everywhere). A bar group is always written with its number form ('the T8-n bars', 'T8-1 – T8-3'), never bare; a bare T1–T12 means the tool, written with its word at first use in a paragraph (T8 `fill`). §13.8's list is rewritten so. Volume bars keep T-Vn-m. research/sf/mapping.md's tables T1–T16 are cited by their row-set names (V08 §2.6), never bare (V07-TERM-4). *Units:* scope, determinism, V07, V09, V10.
* **ID-R** — R1–R19 (§14's interaction contract) vs IMPROVEMENTS requirement ids R3, R6, R8, R9, R13 and 'R11' (a repair round). **Ruling:** Bare R1–R19 mean §14's interaction rules; an IMPROVEMENTS requirement is cited 'IMPROVEMENTS R3'; 'R11' (a repair round, J-A28.02) is narration and is removed. The f file's rule labels (R-a … R-d) and the canon's home rules (R1–R13 of the earlier canon) live only in validation records. *Units:* scope.
* **ID-TRACE** — §17.1 (6)'s provenance trace keys P⟨n⟩ and D⟨n⟩ share letters with the parity class P and the decisions D-n; §15.1's capability ids repeat per reference table. **Ruling:** Trace keys keep P1…/D1… inside §17.1 (6)'s table only (no hyphen); decisions are always D-n (hyphen); §15.1's capability ids are always cited with their reference ('FTG C9', 'MFCG D1'). *Units:* scope.
* **ID-JT** — 'J-T' (§13.7, BCR-V12-12) names the Jonckheere–Terpstra trend test inside the J- decision namespace. **Ruling:** Renamed 'JT (the Jonckheere–Terpstra trend test)'; the J- namespace holds decisions only. *Units:* scope, V12. *Renumbering:* J-T → JT.
* **ID-APPX** — Appendix A holds only 'A.3' (A.1 and A.2 moved to the rationale file). **Ruling:** Appendix A's one section is unnumbered; citations of 'A.3' read 'Appendix A'. *Units:* scope. *Renumbering:* A.3 → Appendix A.
* **ID-ITEM** — 'item N' means an owner or amendment item and also a numbered paragraph of a section ('§7.7 item 15'). **Ruling:** Bare 'item N' means an owner or amendment item only (owner items 1–101, file g 102–113, file f 200–585 — disjoint by design). A section's own numbered paragraph is always cited with its section ('§7.7 item 15', '§7.7 clause…' not used). Inside §7.7 the contract's items are written '§7.7 item n' (DIC-05). *Units:* determinism, scope, pipeline.
* **ID-LAYER** — The toolkit's layers L0 INTENT … and the plat refinement levels L0–L4. **Ruling:** A toolkit layer is always written with its word (L0 INTENT, 'the INTENT layer'); bare L0–L4 means a refinement level (DIC-07). *Units:* determinism, V09, V10.
* **ID-WX** — Volume-local row ids W1…, X1…, H1…, FL-n, IN-Vnn-n, S-Vn-x are reused across volumes (V01 W15 and V04 W15; X1 in V02, V06, V08). **Ruling:** They stay volume-local and are never cited bare outside their volume: another unit writes 'V06 W75', 'V02 X20', '_integrate H12'. Inside its own volume a bare id means that volume's row. V08 numbers its §1b wiring rows W1… (V08-TERM-1) and drops the history dividers. The IN-Vnn-n integration notes are folded into the body by the rewrite (their content at its home), their ids kept only in the validation records. *Units:* V01, V02, V04, V06, V07, V08, V09, V10, V11, V12.
* **ID-DR** — Derivation rows proposed under working names (DR-V1.1, DR-SKY, DR-V6.1, DR-V8.1–DR-V8.8) and numbered by J-VI.13 / file f item 383. **Ruling:** The numbers DR26–DR35 are the only ids everywhere in the set (DR26 = DR-V1.1; DR27 = DR-SKY; DR28 = DR-V6.1 = DR-V8.6, one row; DR29–DR33 = DR-V8.1–DR-V8.5; DR34 = DR-V8.7; DR35 = DR-V8.8); the aliases are retired (glossary G-DR). g item 113's history rows take DR36 onward, numbered by the determinism editor in §7.7's order and cited by V04, V06, V08. *Units:* determinism, V01, V04, V05, V06, V07, V08, V11. *Renumbering:* DR-V1.1 → DR26; DR-SKY → DR27; DR-V6.1 / DR-V8.6 → DR28; DR-V8.1 → DR29; DR-V8.2 → DR30; DR-V8.3 → DR31; DR-V8.4 → DR32; DR-V8.5 → DR33; DR-V8.7 → DR34; DR-V8.8 → DR35.
* **ID-JC** — The canon's own decisions under J122 need ids that collide with nothing. **Ruling:** The canon's decisions are J-C1 … J-C4 (J-C1–J-C3: SCOPE-C06's three base questions; J-C4: the span rule's `country` reason, V07-XCONF-2); the determinism editor or scope editor enters each as a Judgment-calls index row with a Part A entry. *Units:* scope.
* **ID-DUPDEF** — The id census (work/canon/ids.py over the base, rationale, INDEX, f, g, _integrate and the twelve volumes) found no test or decision id defined twice with two meanings: every apparent duplicate is an index row and its Part A entry (J-A…, D-n), a bench-registration row and its bar's body (T-V2-22 …), an amendment note to the same request (BCR-V11-1 …), or a continuation line of a range. The rewrite keeps one definition per id: a volume's amendment notes to its own request fold into the request's one entry. **Ruling:** No renumbering beyond the rulings above. *Units:* V11, V02, V03, V09, V10, V04, V07, V08.


## Wiring gaps routed to V10

| id | class | sev | units | the piece | the link to write (or the ruling) |
| W-IF-01 | interface-no-implementer | major | V04, V10 | V04's WhyProvider and the `underground` WhySectionProvider (BCR-V10-3) | V04 §1b.2 adds the provider rows (implementer `@plat/under`; callers V10's why query and V09's why card) and V04 §4.5 states their rows with `info.under.*` keys — the `ruin.node` line, `AccessPoint.cause`, `reusedBy`, an arch vault's span reason, `Chamber.monument` tiers, `FoundationsResult` footings, `CatacombComplex.blockedBy`, the terminal cistern — and `catacombOutcome`; a T-V4 bar covers them; IN-V04-7/8 fold i… |
| W-IF-02 | interface-no-implementer | major | V07, V10 | V07's WhyProvider for VillagePlan, VillageField, VillageEnd | V07 §4.5 registers its WhyProvider through BCR-V10-3's interface for the kinds V10 §3.9's owed table assigns it, its answers (listed in prose today) as rows with `info.village.*` keys, a V07 §1b row and a T-V7 bar — BCR-V10-3's completeness test checks exactly this provider |
| W-IF-03 | hook-one-ended | minor | V10, V01 | V01's three why providers (terrace, ward-edge wall, under-deck strip) | V10 §3.9's owed table lists V01 §4.5's three providers for their kinds, and V10's own RetainingWall and deck-plot rows cite them as V01's — one provider per kind |
| W-IF-05 | hook-one-ended | minor | V10, V12 | the calibration register → the clerk's provenance answer | V10 §2.13's RuleAnswer gains the cell's register entry (status, reference, due milestone; V12 §2.6) and V10 §1b.1 lists `register.json` as an input; or V01 §1b and V12 §1b drop the claim |
| W-PKG-01 | package-undeclared | minor | V10, scope | @plat/cli | V10 §1b.2 and §2 name the base's headless CLI in `@plat/api` (§14) as the host of `plat clerk`, or §14's package list gains `@plat/cli` with its dependency rule; no f item places `@plat/cli` today |
| W-EDIT-01 | edit-no-tool | major | determinism, V09, V10 | §7.1's twelve-tools table vs the 70 EditEvent kinds | CLOSED by DXC-04 / E-04 (one binding table at §7.1). |
| W-FLD-12 | orphan | minor | V10 | Segment.promptTokens | V10 names its reader (the context-budget rule that opens a new segment or compacts as the last prompt nears the window) or drops it |
| V05-WGAP-2b | hook-one-ended | major | V10, V05 | the island bend lines have no clerk bend rows | Add both lines to V09's bend.* message rows and V10's bend category (J-VI.4), citing V05 §4.2. — the V10 part |
| V06-WGAP-1b | hook-one-ended | major | V10, V06 | the lone-neighbourhood bend line has no clerk bend row | Add the line to V09's bend.* rows and V10's bend category, citing V6 §4.1; mark X30 met. — the V10 part |
| V10-WGAP-1 | dangling | minor | V10 | islet size, the fill ring and the green's 24-gon outside clerk.content | Add islet sizeM2 and the scope ring's sides to clerk.content.encoders (with provenance), and have the green read encoders.ringSides. |

## Retired synonyms (full)

### Retired synonyms (one term per concept) — replaced everywhere

Occurrence counts are the script's candidate hits per unit (a verifier greps each to zero; a hit inside a quotation of a reference, or a legitimate different sense, is kept and noted by the editor).

| id | concept | the one term | retired | occurrences (unit: hits) | basis |
|---|---|---|---|---|---|
| G-lot | the parcel a building stands on | plot (field BuildingInput.plot) | lot, lot-driven, lot-derived, BuildingInput.lot | scope 51, pipeline 24, model 14, V12 9, determinism 5, V01 5, V02 3, rendering 2, V08 2, V11 2, kernel 1, V06 1 | §2.5's own rule; MC-01 |
| G-refview | the 1 440 × 900 CSS px, DPR 2, P = 35 view the budgets are stated for | reference viewport | reference view | rendering 7, V01 2, V05 1 | RTD-01 |
| G-firstmap | the time and view of the first drawn map | first map | first paint | V04 13, V07 9, rendering 4, scope 3, pipeline 3, V01 2, V08 2, V09 2, V02 1, V03 1 | RTD-02 |
| G-shadows | the light ladder's rung-3 shadow mechanism | projected shadows (`shadowPass`) | projected-shadow pass, projected pass, projected-shadow union, the shadow pass | rendering 7, scope 1, model 1, pipeline 1 | RTD-03 |
| G-vectorrung | the light ladder's rung 3 | the vector rung | the vector pass | determinism 1, scope 1, V05 1 | RTD-03 |
| G-slab | the occluder record set of the light pass | the slab list (a record: a slab) | occluder slabs, slab casters | 0 | RTD-04 |
| G-cite | a pointer to a volume's section | Vnn §x.y (e.g. V04 §3.2); the base is bare §x.y | V1-3.8.7, V4 §3.5, V6 §2.8, V9 §4.9 … | V01 1501, V09 1197, V06 1027, V05 931, V02 798, V04 722, V10 288, V11 256, V08 233, V03 147, V07 144, V12 101, INDEX 4 | principle (1); V01/V02/V04/V05/V06/V07/V09/V10/V11-TERM |
| G-stairway | a way whose slopeP95 exceeds V11's ways.crossing rampMaxGrade | stair-stepped way (the template row keeps `stepped`) | stepped (for the way state) | V01 1 | V01-TERM-2 |
| G-standalone | a document whose Recipe.product is 'hood' | standalone neighbourhood document | standalone hood(s), lone neighbourhood document, standalone neighbourhood | V01 26, V06 6, V04 1 | V01-TERM-3 |
| G-unitinput | the derived view V01's unit runner reads for an island | SkyUnitInput (the island's unit inputs); `handover` keeps only the reservation passing (IslandInstitution.handover) | SkyHandover, hand-over (the unit-run view) | V05 46, V01 19, INDEX 2, V06 1, V11 1 | V05-TERM-2 |
| G-hollow | a way retireWay or effaceWay left abandoned or decayed | hollow way (the ops keep their names) | retired way | V06 19 | V06-TERM-2 |
| G-strike | the per-district decline draw | strike pool (defined once in V06 §3.5.2) | decline pool, decline lottery, the lottery | V06 16, pipeline 6, V11 4, determinism 2, scope 2 | V06-TERM-2 |
| G-dwell | V07's dwelling count | N (N_b, N_v = N − N_o); D(x) is item 102's daylight share everywhere | D, D_b, D_v, D_o for dwellings | V07 30, V06 1 | V07-TERM-2; g item 102's symbol |
| G-DR | the derivation rows the volumes added | DR26–DR35 (ID-DR) | DR-V1.1, DR-SKY, DR-V6.1, DR-V8.1 … DR-V8.8 | V08 119, V11 19, V06 16, V05 15, V12 14, V04 8, V09 8, V01 5, V07 2, V10 2 | J-VI.13; file f item 383 |
| G-M6U | the underground layer's milestone | M6-U ("M6" is volume 2's stage 3) | M6 (for the underground) | INDEX 3, V12 3, V09 1 | J-VI.22 (R-d) |
| G-panelgroup | the six item-110 items inside the M4 sitting | the M4 panel's M4-110 group | panel M4-110 | V11 2 | V12-TERM-1 |
| G-newrandom | the scoped regenerate with new randomness (§7.1) | New random (§7.1); 'Try again' is only its catalogue label; 'reroll' only for rerollLayer | scoped re-roll, Try again (in prose), Rebuild … as generated | V10 4, V09 3, determinism 2, scope 2, pipeline 1, V05 1, V06 1 | V09-TERM-4 |
| G-suppress | a removal of generated content that holds through regeneration | suppression (file f item 260) | kept removed, the removal holds, Removals that hold (in design prose) | V09 6, V10 1 | V09-TERM-4; J-VI.14 |
| G-rederive | the whole-town re-derivation from a stage | Re-derive (§7.1) | Rebuild from {stage} | V09 3 | V09-TERM-4 |
| G-reason | the raised way's reason word | drop · link · water (J-VI.2) | waterNeed | 0 | J-VI.2 |
| G-bend | an infeasible declaration turned to the nearest lawful one | bend (bend.* keys); refuse.* only for a dossier fact or a lock | refuse.raised.*, refuse.aqueduct.*, refuse.retaining.*, refuse.stack.* | V09 6 | J-VI.4 |
| G-unexcavated | the per-viewer switch for unexcavated voids | the view key `showUnexcavated` | LayerSpec.showUnexcavated | V04 1, V09 1 | J-VI.19 |
| G-fallbackclass | a custom kind's class | item 104 (a)'s resolution (V11 §3.13) | fallbackClass | V08 8, V11 3, pipeline 1 | J-VI.20 |
| G-digest | the dossier's deposits and terrain fields | site.deposits; site.terrain | nearbyResources[], site.terrainType | V07 1, V11 1 | J-VI.25 |
| G-clerkhandle | the handle createClerk(mount) returns | ClerkHandle | ClerkHarness | V10 14, V09 2 | E-33 |
| G-offline | the clerk being unreachable | refuse.clerk.offline | error.clerkOffline | V09 1 | E-32 |
| G-postop | a whole-tile post operation after the light | wash (tint), edgeFade (vignette); the role `lights` → `glow` | tint(colour, strength) as a post op, the role lights | rendering 2 | E-16 |
| G-portpath | the village product's registration | ProductDecl in StrategyRegistry.products (file f item 202) | PortRungPath, registerRungPath, its own port path | V08 5, scope 1, V07 1 | file f item 202 |
| G-JT | the Jonckheere–Terpstra trend test | JT | J-T | V12 6, pipeline 4, scope 4 | ID-JT |
| G-forkat | the history's forward path | Open a copy from here (a forkAt) | Change from here | V06 3 | J-VI.12 |
| G-floorvault | a church on wet ground without an always crypt | no crypt; ledger slabs in the chancel floor (V03 §3.7.4) | floor vaults (wet ground) | V03 3, V07 2, V09 1 | V10-XAGREE-4 |
| G-geojson | item 110's GeoJSON kinds | raisedSupport (per support), retaining (per run) | raisedSupports MultiPolygon, retainingWall kind | V01 1 | J-VI.18 |
| G-reservedparch | `parchment` | a shipping ink-family variant (RIC-01) | the reserved parchment | rendering 1 | RIC-01 |
| G-binaryangle | the 16-bit binary angle | (removed; centidegrees are the one angle unit) | 16-bit binary angle | 0 | E-15 |
| G-rosterassign | the roster line's claim on a plot | rosterAssignment (defined; MC-08) | — | 0 | MC-08 |


## Cohesion + open findings intro

## Cohesion checks

**scope (the summary, §1, §14, §15, §16 against INDEX.md and the volumes' build plans):**

* The one-page summary and §1 describe the whole set: the base plus the twelve volumes at build depth (INDEX.md the map), no 'hooks only' framing (SCOPE-C04, CO-01).
* §1.1's stage table names each staged subject's volume and milestone (INDEX §1's columns).
* §14 places every package of the set with its dependency rules: @plat/hood, @plat/buildings (with the plan rung), @plat/under, @plat/village (item 505), @plat/evolve (317), @plat/sky (476), @plat/bridge-client (507), @plat/clerk (518), the calibration package (521), @plat/cli (W-PKG-01) (SCOPE-C16, CO-02).
* §15.1/§15.2: the VG rows and NG rows are delivered at build depth by V07 and V01 (not VILLAGE-LATER / STAGE-2 through an interface) (CO-04); every row maps to its home in the set.
* §16 carries J122's combined build order: V-M0 right after M0; M3c beside M3b; after M4 four streams side by side — M5 (V01), the village V-M1…V-M4 (V07), M6-E (V06), the plan rung's P0, P1, P3 on base buildings (V03); then M6 (V02) and M6-U (V04) after M5 (M6-U beside M5 with a second pair); then M6-P's rest and M6-sky; then M-CAL (V12); then M-SF (V08; VH with the village); each staged milestone's row with its volume's price; the two totals computed once by file f item 568 (the base with stage 2; the whole program) (SCOPE-C04, CO-03).
* INDEX.md §3 and §4 carry the same order (the V-M0 slot per J122; V-M1 after M4) and cite §16's totals; INDEX §6's questions table marks each question answered (J121/J122); INDEX §7's fix list is emptied (every item routed here).
* D-20, D-25, D-35 and the summary cite §16's computed totals and order; the Staged list becomes a pointer list to the volumes and milestones.
* §13 names the volume test families and which volume tests take over each base hook bar (CO-06; W-05).
* §17.1 binds implementers to the set (SCOPE-C09); §17.1 (8)'s algorithm list and §17.4's dependency table cover the volumes' methods and libraries (CO-07); Appendix A states the volumes' evidence grades (CO-08).
* §0.2 lands g items 102–113 and file f (E-22, CO-05).
* The one context vector (ContextVector, §2.5) is the object V01's DistrictContext/BlockContext, SitePlanStrategy.plan, GranularityLaw.bands and RungProfile's granularity and greenery scales read; the volumes' readers name it (CO-11).

**INDEX.md** is rewritten with the scope part: the scope editor writes INDEX §3, §4 (J122's order, §16's totals), §6 (the decisions table) and §7 (no open item) as a cross-part note, and the assembler writes the file.

**every volume:**

* The volume's §8 build plan agrees with INDEX §3/§4 and §16: milestone id (M6 = V02's stage 3; M6-U, M6-sky, M6-E, M6-P, V-M, M-CAL, M-SF, M3c), start-after, runs-beside, price (its own estimate), and J122's slot.
* The volume's §11 marks every owner question answered (OWNER_Q) and its body reads each decision (J121 inputs; J122 decisions).
* The volume's §1b wiring table names each piece's producer and consumer in the set (principle (7)); every hand-off it lists is closed at its destination or routed here.
* One marker line; no stacked banners, PROGRESS ledgers, reconciliation or finalization records (S9).

## Open findings — where they come from

Every finding of the twelve inventories (940), the round-6 seam findings the finalization left open with INDEX §7's fix list (18 rows, SEAM_OPEN, each with its ruling where one was needed), every volume's integration note (folded into its body) and every volume's own Fix list and hand-off rows are routed to the unit that closes them (listed per unit below; the full text is in canon.json → open_findings). No `fix-list.md` exists under docs/validation/ (find: 0 files), so none is routed. THE BAR IS ZERO: each is FIXED in the text or ruled INVALID by the adjudicator; none is parked.
