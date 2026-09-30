# V10 rulings (extracted from canon.json)

## shrink {"words_before": 84658, "goal_band_words_after": [50795, 63494], "narration_ranges_words": 13054, "restatement_items": 31, "bcr_blocks_to_pointers": 23}

## conflicts

### DIC-06 minor FIX units ['determinism', 'scope', 'V07', 'V09', 'V10']
where: ['§7.1 twelve tools', '§7.8 T1 intend', '§13.2 test ids']
- claim: The tool ids T1-T12 share the T-prefix namespace with test ids (T8-1 ... T8-3, T12-1, T19-4, T65 fixtures, T73-8): "T8" and "T12" read as either a tool or an item's test group (§16 also cites "item 101's T2-T8" for tools). Principle (4) requires ids unique across the set.
proposed: Always cite tools with their names (T8 `fill`) or give tools a distinct prefix.
RULING: Resolved by canon ID-TOOL: bare T1–T12 are item 101's tools, always written with the tool word at first use in a paragraph (T8 `fill`); an item's bars are always written with their number (T8-1, 'the T8-n bars'), never a bare T8.
basis: owner item 101 names the tools (owner rule > base); canon ID-TOOL

### DIC-07 minor FIX units ['determinism', 'V09', 'V10']
where: ['§7.1 twelve tools (layers L0-L4)', '§7.3 (b) L0/L1 batches; §2.2 levels']
- claim: The toolkit's commitment layers are labelled L0-L4 (intent ... finish), the same labels as the arena refinement levels L0-L4 used in the same sections (a warp's fromLevel 0|1, "one L1 batch", "one L0 batch").
proposed: Rename the toolkit layers (e.g. A0-A4, or by word only).
RULING: Keep both label sets: the toolkit's commitment layers keep item 101's names and are always written with their word (L0 INTENT, L1 FORM … or 'the INTENT layer'); a bare L0–L4 means a plat refinement level (§2.2).
basis: owner item 101 names the layers (owner rule); D-13 names the levels; ID convention, no renaming of either

### DXC-04 major FIX units ['determinism', 'V09', 'V10']
where: None
- claim: Principle (7) requires every edit kind to have its tool. §7.1's twelve-tools table maps 40 of the 70 EditEvent kinds (31 by name, the eight plan events and adjust by description); 30 have no row: unlock, unpin, moveVertex (named only as a handle drag), drawBoundary (named only in the points-form prose), swapUse, setAttrMany, instance, delete, merge, rejectSite, unassign, drawPassage, drawTunnel, drawChamber, addLink, addUndergroundAccess, placeAccess, convert (every ConversionOp), startWorks, cancelWorks, placeLight, rerollLayer, editTable, editPreset, closeup, epoch, rebase, upgrade, undo and redo (script count over the union and the table). V09 §4.3 maps every kind to a home tool, with homes the base does not state (delete -> T10, startWorks/cancelWorks -> T9, placeLight and rerollLayer of style concerns -> T12, rerollLayer(naming) -> T11, drawTunnel/addLink -> T4, drawChamber/placeAccess/addUndergroundAccess/relet/use conversions -> T6, sealing/ladder/decline conversions -> T9). §7.4's create column cites tools §7.1 does not define: "the Works tools (§7.1)", "the light tool (§7.1)", "building tools (§7.1)", "the underground tools", "a building's context action (§7.1)", "context actions".
- other: V09 §4.3 "The tool binding table — every edit kind and where a user reaches it" (T-V9-12); V10 §3.5 tool encoders; f items 368 (BCR-V10-20: delete joins T10), 570, 353, 272 and the other §7.1 f items (582, 348-368, 571)
proposed: One canonical home for the event -> tool binding (the base, since "the tool API and these events are the base's", or V09 §4.3 with §7.1 pointing to it); the table covers every EditEvent kind (history kinds marked with their producer); §7.4's create cells cite that home by tool id.
RULING: The event → tool binding has ONE home: §7.1 gains the complete table — every EditEvent kind (the base's 70 and the volumes' added kinds) with its home tool among T1–T12, using V09 §4.3's assignments as the content (delete → T10; startWorks/cancelWorks → T9; placeLight and style rerollLayer → T12; naming rerollLayer → T11; drawTunnel/addLink → T4; drawChamber/placeAccess/addUndergroundAccess/relet/use conversions → T6; sealing/ladder/decline conversions → T9; …) and the history-only kinds (undo, redo, rebase, upgrade, epoch, closeup) marked with their producer. §7.4's create cells cite tools by id. V09 §4.3 keeps its screen, gesture and panel columns and cites §7.1 for the binding; V10 §3.5's encoders cite §7.1.
basis: principle (7) every edit kind has its tool; R6 (§7 owns edit events); the binding is shared by V09 and V10 so the base owns it (1); closes W-EDIT-01

### MC-11 None FIX units ['model', 'V07', 'V11', 'V04', 'V10', 'V01', 'V02']
where: ['§2.2 PlatKey/Recipe.rung (Rung)', '§2.8 SliceRef.table / Recipe.tablePins (TableId)', '§2.3 Terrain.outfalls, §2.7 Tunnel.outfall (Outfall)', '§2.6 BuildingInput.access (Segment)', '§2.5 District.boundary (TypedBoundary), District.fabric (FabricStrategyId)', '§2.6 BuildingInput.drift, Building.drift (DriftBounds)']
- statement: §2 uses seven types that are declared only in a volume, never in the base: Rung (V07), TableId (V11), Outfall (V04), Segment (V10), TypedBoundary and FabricStrategyId (V01), DriftBounds (V02). A base record depending on a volume-declared type inverts principle (1) (the base owns what the base builds; Rung alone is used 24 times in the base).
proposed: None
RULING: Every type a base record uses is declared in the base: Rung (§1.1 with RungProfile), TableId (§7.6), Outfall (§2.3), Segment (§2.1), TypedBoundary and FabricStrategyId (§2.5, with f item 505's @plat/model additions), DriftBounds (§2.6, f item 385 BCR-V2-08 types it). The volumes that declared them cite the base declaration; their fields and meanings unchanged.
basis: principle (1): the base owns what the base builds; f items 385, 505

### SCOPE-C07 CONFIRMED FIX units ['scope', 'V10', 'V09', 'V08']
where: §14, Staged list, J-A101.02 vs J121/J122
- statement_a: §14 (l.14513-14529): a clerk is the host's own or 'the built-in one, which is staged'; the built-in clerk opt-in and labelled as AI; Staged list: 'the built-in clerk comes after the API'; J-A101.02.
- statement_b: J121: the assistant and its model tier follow SettlementForge; J122 decisions V10 Q2 ('SettlementForge's [assistant], driving our tool API') and V10 Q4 ('the built-in clerk as M3c beside M3b').
proposed: The base must say which clerk exists when (SF assistant via the tool API; the built-in clerk at M3c) and that its model tier follows SF.
RULING: Per J121/J122: in the SettlementForge module SettlementForge's assistant drives the map's tool API through the host seam (configuration C, V10 Q2); the built-in clerk ships at M3c beside M3b and runs only where the deployment's configuration enables it; the provider, model tier and key path are configuration inputs read from SettlementForge's AI setup (J121), never decided by the design. §14's clerk paragraph, the Staged list and J-A101.02's index row say so.
basis: J121, J122

### SCOPE-C16 CONFIRMED (cohesion, principle 4) FIX-BY-F units ['scope', 'V10']
where: §14 vs V01–V12
- statement_a: §14 lists 17 packages (@plat/kernel … @plat/testkit) and the dependency chain over them.
- statement_b: The volumes declare further packages: @plat/buildings (V01–V03), @plat/under (V04, V06), @plat/sky (V05, V06), @plat/evolve (V06), @plat/village (V06, V07, V11), @plat/bridge-client (V08), @plat/clerk (V09–V11), @plat/cli (V10) — none placed in §14 or its dependency rules.
proposed: §14 must place every volume package with its dependencies declared (principle 7).
RULING: §14 places every volume package with its dependency rules by file f items 505 (@plat/hood, @plat/buildings with the plan rung, @plat/under, @plat/village), 317 (BCR-V6-1 (b) @plat/evolve), 476 (BCR-V5-14 @plat/sky), 507 (BCR-V8-3 @plat/bridge-client), 518 (BCR-V10-8 @plat/clerk), 521 (BCR-V12-10 the calibration package) and canon W-PKG-01 (@plat/cli, V10's command-line clerk); the dependency chain lists them.
basis: f items; principle (7) packages declared

### V09-XAGREE-1 major FIX units ['V11', 'V09', 'V10']
where: V09 §2.6 (screen → row table), §4.7, §10.2 XV-V9-1/XV-V9-2 vs V11 §4.2 (V11 lines 4012-4030)
- claim: V09 and V11 disagree on the shape of the two document-only tables: (1) V09 writes a kind key 'cls:<class>' (a roster class no dossier record binds); V11 lists three key forms only (uid:, cat:, use:); (2) V09 writes split:false and V11's quarter, place and pin cells under the KIND key ('Keep works and shop together for every {kind}', 'Put them in {quarter}', 'Put them here', 'Keep them where they are'), while V11 gives uid: {profile, familyWeights, quarter} and cat: {profile, familyWeights} and puts place, pin and split on use: rows only; (3) V09 says a use: key 'admits the split cell only', V11's use: row carries place, pin, split and specialisation; (4) V09's link view writes siting.linkEdits {avoid: [provider]} ('Cut this link'), V11 §4.2's cells are {bindTo?, cut?} (only V11's wiring row W42 mentions avoid). XV-V9-1 and XV-V9-2 are not marked Met and are not closed at their destination. V10 §4.1's encoders write the same disputed forms (link avoid list; merge allOfKind with cls:<class>).
proposed: Rule the tables' shape once at V11 §4.2 (the owner of the tables): add cls: and avoid, and state which cells each key form admits; V09 §2.6 cites it and maps each screen to a cell V11 declares; mark XV-V9-1/2 closed.
RULING: V11 §4.2 (the tables' owner) states the union of both volumes' needs: siting.declared key forms uid:, cat:, cls: (a roster class no dossier record binds) and use:; the kind keys (uid:, cat:, cls:) admit profile, familyWeights, quarter, place and split; use: admits place, pin, split and specialisation; siting.linkEdits cells {bindTo?, avoid?, cut?} with the three meanings (bindTo keeps a supplier; avoid cuts one, the next nearest serving; cut stops the good at that use). V09 §2.6 maps each screen to a declared cell and cites V11 §4.2; V10 §4.1's encoders write only declared cells; XV-V9-1 and XV-V9-2 are closed.
basis: the tables' owner rules; union of existing statements, nothing lost

### V09-XAGREE-3 major FIX units ['V02', 'V09', 'V10']
where: V09 §4.9 catalogue (tier/stack/deck bend rows) and §4.20.5 vs V02 §1b bend ids (V02 line 303, 2695)
- claim: V02 names its stacked-massing and deck bends bend.tiers.stepped, .none, .axial, .internal, .count, .step, bend.stack.groundWing, .roof, .base, bend.deck.single, bend.deck.basement, bend.building.remove, bend.wing.grow, bend.family.nearest, bend.room.passage, bend.row.plotLine, and states 'volume 9's (X21) … under the ids of V2 §1b'. V09's catalogue holds bend.tiers.count and bend.tiers.step (shared) but otherwise bend.tiers.flights, bend.tier.height, bend.stack.internalSolid, .removeStair, .addWing, .deck, .notStepped and bend.deck.floors — none of which V02 emits — and has no row for fourteen of V02's ids. IN-V09-4 ('every bend of V2 §1b … has a catalogue row') was never applied to §4.9. The engine would emit keys with no row (T-V9-15 fails CI) and V09's rows would have no producer. V10's IN-V10-3 has the clerk "word each bend of V2 §1b", which it can only do through V09's rows.
proposed: Take V2 §1b's bend ids as the one set (V02 owns the dry run): write one §4.9 row per V02 id with its words and buttons, retire V09's unmatched keys (or V02 adopts them by a ruling), and re-point T-V9-59 and §4.20.5.
RULING: V02 §1b's bend ids are the one set (V02 owns the massing dry run): V09 §4.9 holds one row per V02 id with its words and buttons; V09's keys with no producer are retired, unless V02 finds the case among V2 §4.6's bends, names it in §1b and V09 keeps the row; T-V9-59 and §4.20.5 re-point. V10 words each bend through V09's rows.
basis: producer owns the id; T-V9-15 (no key without a row)

### V10-XAGREE-1 major FIX units ['V10']
where: V10 §2.12 ShapeInput.link ('avoid' only where V11's siting.linkEdits carries the cell (V09 XV-V9-2)) and V10 §4.1's link encoder
- claim: V10's link op 'avoid' is written as conditional on V11 carrying the cell, and V11 §4.2 does not carry it (cells {bindTo?, cut?}; see the V09/V11 table-shape finding). The clerk's encoder and the canvas's 'Cut this link' (V09 §4.7) therefore write a cell whose home does not declare it; the condition is left open in normative text.
proposed: Once V11 §4.2 rules the linkEdits cells (avoid added), drop the condition in V10 §2.12 and cite V11 §4.2.
RULING: With V11 §4.2's linkEdits carrying `avoid` (V09-XAGREE-1), V10 §2.12 drops the condition and cites V11 §4.2.
basis: V09-XAGREE-1

### V10-XAGREE-2 major FIX units ['V01', 'V10']
where: V10 §2.13 WhyFamily and the family-mapping note vs V01 line 2693 ('the siting pushes as WhyPulls of families SUNLIGHT, EMITS, SENSITIVE')
- claim: WhyPull.family is typed WhyFamily (V11's eight plus nine score terms), but V01's providers emit WhyPulls of families SUNLIGHT, EMITS, SENSITIVE; V10 keeps a translation note ('they read as sun, nuisance and nuisance') and asks V01 to change (CVR-V10-6), which V01 has not done. A value outside the declared enum crosses the seam, and the mapping lives at the consumer instead of the producer.
proposed: V01 names its pushes by V11's family ids (sun, nuisance) as CVR-V10-6 asks; V10 drops the shim note; mark CVR-V10-6 met.
RULING: V01's why providers name their pushes by V11's family ids (SUNLIGHT → sun; EMITS and SENSITIVE → nuisance); V10 §2.13 drops the translation note; CVR-V10-6 is met.
basis: the producer speaks the declared enum (10)

### V10-XAGREE-3 minor FIX units ['V10', 'V09']
where: V10 §3.3 default lexicon (population rows) vs V09 §4.5 T1 size chips (J-V9.56)
- claim: The same size words map to different populations on the two surfaces: the clerk's lexicon fixes 'small town' 2 500, 'town' 5 000, 'large town' 8 000, 'small city' 12 000, 'city' 20 000, 'large city' 28 000, 'metropolis' 50 000, while V09's seven size chips with the same words read population quantiles of the rungs' bands from the rung table (TOWN band's 25th, 50th, 85th percentiles; CITY's; METROPOLIS's median). 'A town' asked in words and picked as a chip can give different recipes; one concept has two mappings (principle (2) and (10)).
proposed: One rule for the size words (the chips' quantile rule read from the rung table) serving the chips and the lexicon; the lexicon rows name the quantile, not a number.
RULING: One rule for the size words: V09 §4.5's T1 quantile rule (J-V9.56, read from the rung table) is the home; V10 §3.3's lexicon rows name the quantile, not a population number.
basis: single source with the rung table (1)

### V10-XAGREE-4 major FIX units ['V03', 'V10', 'V09']
where: V10 §3.9a crypt row 'no crypt' vs V09 §4.17.5 crypt line vs V03 (lines 140, J-V3.44)
- claim: Three texts disagree on a church on wet ground: V10's crypt section words it 'no crypt: ledger slabs in the chancel floor'; V09 §4.17.5 says 'V03's wet-ground fold reads "floor vaults (wet ground)"' as a crypt form on the church's Below line; V03 has no floor-vault crypt (J-V3.44: 'flush ledger slabs … in a church without a crypt over a floor-vault "crypt"') and lifts an always-crypt on wet ground to a raised-choir crypt (line 140). The panel and the clerk would say different things for one row, and V09's wording names a form V03 rejected.
proposed: Rule at V03 §3.7.4 (the crypt's owner): wet ground gives a raised-choir crypt for an always class and no crypt with ledger slabs otherwise; V10 §3.9a words both; V09 §4.17.5 cites the rows (dropping 'floor vaults').
RULING: V03 §3.7.4 states the wet-ground rule: an always-crypt class takes the raised-choir crypt; any other church takes no crypt, with ledger slabs in the chancel floor (J-V3.44). V10 §3.9a words both; V09 §4.17.5 cites V03 and drops 'floor vaults'.
basis: V03 owns the crypt

### V10-J121-1 major FIX units ['V10']
where: V10 §0 'Turning it on, and what it costs' (lines 177-183) and §1.3 ("Other providers or a local model — declined by the brief: the built-in clerk runs on Claude"); §2.10 default row ops.model.id (claude-opus-5; "Claude Opus 5.5 is the owner's option (section 11 Q3)"); §3.16 key row ("Your Anthropic account has no credit left.")
- claim: The plain words fix the provider and key path ('runs on Claude, Anthropic's model … you paste your own Anthropic API key … or the program that embeds the map … provides the connection, or uses its own assistant instead'); J121/J122 decided V10 Q1 (key or relay: follows SettlementForge's AI setup), Q2 (SettlementForge's assistant, driving our tool API) and Q3 (model tier follows SettlementForge; evaluate a cheaper tier before any switch). The SettlementForge module's case is SettlementForge's assistant through the host seam, not the built-in clerk with the user's key.
proposed: Reword: in the SettlementForge module the assistant, its AI setup and model tier are SettlementForge's (J121/J122) and drive the map's tool API through the host seam; the built-in clerk with a user's key is the standalone case; cite J121/J122.
RULING: V10 §0, §1.3, §2.10's ops.model.id row and §3.16's key row read the provider, model tier and key path from the deployment's AI configuration (SettlementForge's setup, J121); in the SettlementForge module SettlementForge's assistant drives the tool API through the host seam (J122).
basis: J121, J122

### V10-J121-2 major FIX units ['V10']
where: V10 §3.17 configurations table and 'The relay question stays the owner's (section 11 Q1)'; §3.20 data notice ('to Anthropic (or to the service your host chose)'); §8 risk (1) and J-V10.24 ("a relay stays the owner's (section 11 Q1)"); J-V10.4 ("Claude Opus 5.5 … is the owner's option in Q3")
- claim: J121 answered the relay question (V10 Q1: follows SettlementForge's AI setup) and J122 chose SettlementForge's assistant driving our tool API (V10 Q2) for the SettlementForge module, i.e. configuration C there; the volume still leaves the relay 'the owner's (section 11 Q1)', lists A/B/C as a per-deployment choice without naming SettlementForge's decided configuration, and the data notice names the provider as a design constant.
proposed: State SettlementForge's configuration as the one its AI setup decides (J121; J122: C, SettlementForge's assistant through the host seam), keep A and B for the standalone product and generic hosts, and word the notice with the provider read from the deployment's setup; mark Q1 answered.
RULING: V10 §3.17 names SettlementForge's configuration as C (J121/J122) and keeps A and B as the configurations a deployment's setup may enable elsewhere; the data notice names the provider read from the deployment's setup; §8 risk (1), J-V10.24 and J-V10.4 cite J121; Q1 marked answered.
basis: J121, J122

### V10-J121-3 major FIX units ['V10']
where: V10 §11 Owner questions Q1-Q5 (lines 3367-3409)
- claim: J121/J122 answered all five (docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md): Q1 key or relay — follows SettlementForge's AI setup (J121); Q2 — SettlementForge's assistant, driving our tool API (J121); Q3 model tier — follows SettlementForge (J121), evaluate a cheaper tier before any switch; Q4 — the built-in clerk as M3c beside M3b (yes); Q5 — the live-evaluation spend approved as a budget cap (about US$790-1 190 through M3c) spent in stages, the smallest tier first, the full suite only at M3c's exit, each spend shown to the owner before it runs. V10 §11 still states them as open with recommendations, and its Q5 figures (US$800-1 200, a weekly schedule) differ from the decided cap and staging.
proposed: Mark each answered with its ruling (J121 / J122) and write the decided staging of the evaluation spend into §7.3's schedule; drop the recommendation text.
RULING: V10 §11: each question marked answered with its ruling (Q1–Q3 J121; Q4 J122 M3c beside M3b; Q5 J122: a budget cap of about US$790–1 190 through M3c, spent in stages — the smallest evaluation tier first, the full suite only at M3c's exit, each spend shown to the owner before it runs); §7.3's schedule carries the staging.
basis: J121, J122

### CANON-C02 major FIX units ['V06', 'V09', 'V10']
where: None
- V06 §13: epochs on a lone neighbourhood document 'deliberately deferred … the gate lifting when a later amendment gives a hood document an S4–S5 route'.
- Principle (6) and the owner's no-defer rule.
proposed: None
RULING: Stated as a decided rule: a standalone neighbourhood document has no clock; advancing time on it bends to 'a neighbourhood alone has no history yet — open it in its town to advance time' (V09 message row and V10 bend row, V06-WGAP-1a/1b); T-V6-23 tests the bend. No deferral wording.
basis: principle (6); item 101 R2

### CANON-C03 major FIX units ['scope', 'V01', 'V02', 'V03', 'V04', 'V05', 'V06', 'V07', 'V08', 'V09', 'V10', 'V11', 'V12']
where: None
- INDEX §6: 'Until the owner answers, each volume runs on its recommendation' and twenty-five open questions.
- J121/J122 answered every one.
proposed: None
RULING: INDEX §6 becomes the table of decisions (OWNER_Q); every volume's §11 likewise.
basis: J121, J122

### CANON-C04 major FIX units ['scope', 'V01', 'V04', 'V07', 'V08', 'V09', 'V10', 'V11', 'V12']
where: None
- INDEX §7: 'The fix list — deliberately left for the next amendment'.
- The owner's no-defer rule; THE BAR IS ZERO.
proposed: None
RULING: Every INDEX §7 item is routed to its unit (SEAM_OPEN) and fixed in this pass; INDEX §7 keeps the reconciliation history as a pointer to the validation records and holds no open item.
basis: owner no-defer rule

## elegance

### E-04 UNIFY The event → tool binding: §7.1's partial twelve-tools table, §7.4's create-column tool names and V09 §4.3's table (DEL-06, DXC-04).
unified_form: One binding table at §7.1 keyed by (event kind, target class or path) → home tool; §7.4 cites tools by id; V09 §4.3 keeps screen and gesture columns only.
home: §7.1 (determinism) units ['determinism', 'V09', 'V10']
- EQ: every EditEvent kind (70 base + the volumes' added kinds) has a row
- EQ: history kinds (undo, redo, rebase, upgrade, epoch, closeup) marked with their producer
- EQ: V09's per-target homes kept (split/merge at T5 for districts, T9 for ways and plots; delete at T10 and T9 for access points and galleries; instance at T6, T8, T9)
- EQ: T-V9-12 checks completeness over the pairs
nuance: None

### E-07 UNIFY Refusal and bend causes of the dry run: F-EDIT's detection and action columns restate about 25 causes from §7.1, §7.3, §7.4, §7.5, §7.7 (DEL-02), while item 101 R2 / J-VI.4 / J-VI.30 made most of them bends.
unified_form: One dry-run outcome table at §7.1: cause, detection, outcome (refused — only a dossier fact or a lock; else bent), the bend's target or the refusal's offered action, the message key (V09 §4.9), home. §5.2's F-EDIT row cites it.
home: §7.1 (determinism) units ['determinism', 'V09', 'V10']
- EQ: each case's offered alternative stays its own row
- EQ: the dossier-owned refusal (§7.7 item 11) and lock refusals are the only refusals
- EQ: file f item 582's three bends (no site, over budget, occupied join or split) as rows
- EQ: V09's bend.* and refuse.* keys map one to one
nuance: None

### E-17 UNIFY The knowledge admission re-stated at each reader: labels §9.2, legend §9.5, thematic rows §8.2, exports §11.1, the API §11.2 (REL-02).
unified_form: One admission function at §9.2 with its readers listed; each reader cites it.
home: §9.2 (rendering) units ['rendering', 'V08', 'V09', 'V10']
- EQ: the band each reader admits at kept: its view's band, the export's band, or the city band when band-less
- EQ: V09's admitAs (J-V9.86) and V10's filtered dry runs cite it
nuance: None

### E-24 UNIFY Superseded or amended decisions marked inline in many forms across the set (EL-07, SCOPE-C02, V01-ICONF-3, V04-ICONF-2, V09-ICONF-5).
unified_form: One mark on the decision row: 'superseded by X' or 'amended by X', in the Judgment-calls index and in every volume's §9.
home: the index (scope) and each volume's §9 units ['scope', 'V01', 'V02', 'V03', 'V04', 'V05', 'V06', 'V07', 'V08', 'V09', 'V10', 'V11', 'V12']
- EQ: no row dropped
- EQ: the governing row keeps the reason
nuance: None

### E-28 UNIFY PlanReport.warnings.code mixes W_ codes with lowerCamel names shrineOneRoom, solidMonument, stackCarried (V03-ELEG-1).
unified_form: Split notes from warnings: PlanReport.notes carries the three camelCase ids (the same ids V10's why causes read, CVR-V10-9); warnings.code holds W_ codes only.
home: V03 §2.3 units ['V03', 'V10']
- EQ: same producer and readers
- EQ: the three conditions reported as notes, not lost
nuance: None

### E-32 UNIFY Two catalogue sentences for the clerk being unreachable (V10-ELEG-1).
unified_form: One row, refuse.clerk.offline; error.clerkOffline is retired (V9 §3.14 routes an unreachable clerk to refuse.clerk.offline; no producer emits the other).
home: V10 §3.16 / V09 §4.9 units ['V09', 'V10']
- EQ: same condition, same user outcome
nuance: None

### E-33 UNIFY ClerkHarness, a type alias of ClerkHandle with no member of its own (V10-ELEG-2).
unified_form: ClerkHandle everywhere; the alias is dropped.
home: V10 §2.6 units ['V10', 'V09']
- EQ: createClerk(mount) returns ClerkHandle
nuance: None

## wiring

### W-IF-01 interface-no-implementer major ['V04', 'V10']
piece: V04's WhyProvider and the `underground` WhySectionProvider (BCR-V10-3)
link: V04 §1b.2 adds the provider rows (implementer `@plat/under`; callers V10's why query and V09's why card) and V04 §4.5 states their rows with `info.under.*` keys — the `ruin.node` line, `AccessPoint.cause`, `reusedBy`, an arch vault's span reason, `Chamber.monument` tiers, `FoundationsResult` footings, `CatacombComplex.blockedBy`, the terminal cistern — and `catacombOutcome`; a T-V4 bar covers them; IN-V04-7/8 fold into the body. V10 §3.9's owed table and BCR-V10-3's completeness test already expect it (V04 names no WhyProvider)
RULING: WIRE: write the named link at its home (the link column), both ends

### W-IF-02 interface-no-implementer major ['V07', 'V10']
piece: V07's WhyProvider for VillagePlan, VillageField, VillageEnd
link: V07 §4.5 registers its WhyProvider through BCR-V10-3's interface for the kinds V10 §3.9's owed table assigns it, its answers (listed in prose today) as rows with `info.village.*` keys, a V07 §1b row and a T-V7 bar — BCR-V10-3's completeness test checks exactly this provider
RULING: WIRE: write the named link at its home (the link column), both ends

### W-IF-03 hook-one-ended minor ['V10', 'V01']
piece: V01's three why providers (terrace, ward-edge wall, under-deck strip)
link: V10 §3.9's owed table lists V01 §4.5's three providers for their kinds, and V10's own RetainingWall and deck-plot rows cite them as V01's — one provider per kind
RULING: WIRE: write the named link at its home (the link column), both ends

### W-IF-05 hook-one-ended minor ['V10', 'V12']
piece: the calibration register → the clerk's provenance answer
link: V10 §2.13's RuleAnswer gains the cell's register entry (status, reference, due milestone; V12 §2.6) and V10 §1b.1 lists `register.json` as an input; or V01 §1b and V12 §1b drop the claim
RULING: WIRE: write the named link at its home (the link column), both ends

### W-PKG-01 package-undeclared minor ['V10', 'scope']
piece: @plat/cli
link: V10 §1b.2 and §2 name the base's headless CLI in `@plat/api` (§14) as the host of `plat clerk`, or §14's package list gains `@plat/cli` with its dependency rule; no f item places `@plat/cli` today
RULING: WIRE: write the named link at its home (the link column), both ends

### W-EDIT-01 edit-no-tool major ['determinism', 'V09', 'V10']
piece: §7.1's twelve-tools table vs the 70 EditEvent kinds
link: one canonical home for the event → tool binding covering every EditEvent kind (the base's §7.1, since the tools and events are the base's, with V09 §4.3 citing it, or V09 §4.3 with §7.1 pointing to it — the canon rules); §7.4's create cells cite tools by id (DXC-04)
RULING: CLOSED by DXC-04 / E-04 (one binding table at §7.1).

### W-FLD-12 orphan minor ['V10']
piece: Segment.promptTokens
link: V10 names its reader (the context-budget rule that opens a new segment or compacts as the last prompt nears the window) or drops it
RULING: WIRE: write the named link at its home (the link column), both ends

### V05-WGAP-2b hook-one-ended major ['V10', 'V05']
piece: the island bend lines have no clerk bend rows
link: Add both lines to V09's bend.* message rows and V10's bend category (J-VI.4), citing V05 §4.2. — the V10 part
RULING: WIRE: write the named link at its home (the link column), both ends

### V06-WGAP-1b hook-one-ended major ['V10', 'V06']
piece: the lone-neighbourhood bend line has no clerk bend row
link: Add the line to V09's bend.* rows and V10's bend category, citing V6 §4.1; mark X30 met. — the V10 part
RULING: WIRE: write the named link at its home (the link column), both ends

### V10-WGAP-1 dangling minor ['V10']
piece: islet size, the fill ring and the green's 24-gon outside clerk.content
link: Add islet sizeM2 and the scope ring's sides to clerk.content.encoders (with provenance), and have the green read encoders.ringSides.
RULING: WIRE: write the named link at its home (the link column), both ends

## id rulings

### ID-BCR V01 and V04 number their base change requests bare 'BCR-n' (both 1–46): the same id names two requests (V03 cites 'BCR-29, BCR-30' for V04 and 'its BCR-43' for V01).
RULING: Rename into the set's one request family: V01's BCR-n → BCR-V1-n, V04's BCR-n → BCR-V4-n (the number kept). File f's citations 'V01 BCR-n' / 'V04 BCR-n' resolve by this rule and need no edit; every other citation in the set is rewritten.
renumber: [{"from": "V01 BCR-n (bare BCR-n in V01)", "to": "BCR-V1-n"}, {"from": "V04 BCR-n (bare BCR-n in V04)", "to": "BCR-V4-n"}]

### ID-TOOL Tool ids T1–T12 (item 101) and the base's bar family T⟨item⟩-⟨n⟩ share the T prefix; bare 'T8', 'T10', 'T11' in §13.8 mean items' bar groups.
RULING: Keep both families (the tools are the owner's item 101 names; the 203 bar ids are cited everywhere). A bar group is always written with its number form ('the T8-n bars', 'T8-1 – T8-3'), never bare; a bare T1–T12 means the tool, written with its word at first use in a paragraph (T8 `fill`). §13.8's list is rewritten so. Volume bars keep T-Vn-m. research/sf/mapping.md's tables T1–T16 are cited by their row-set names (V08 §2.6), never bare (V07-TERM-4).
renumber: []

### ID-LAYER The toolkit's layers L0 INTENT … and the plat refinement levels L0–L4.
RULING: A toolkit layer is always written with its word (L0 INTENT, 'the INTENT layer'); bare L0–L4 means a refinement level (DIC-07).
renumber: []

### ID-WX Volume-local row ids W1…, X1…, H1…, FL-n, IN-Vnn-n, S-Vn-x are reused across volumes (V01 W15 and V04 W15; X1 in V02, V06, V08).
RULING: They stay volume-local and are never cited bare outside their volume: another unit writes 'V06 W75', 'V02 X20', '_integrate H12'. Inside its own volume a bare id means that volume's row. V08 numbers its §1b wiring rows W1… (V08-TERM-1) and drops the history dividers. The IN-Vnn-n integration notes are folded into the body by the rewrite (their content at its home), their ids kept only in the validation records.
renumber: []

### ID-DUPDEF The id census (work/canon/ids.py over the base, rationale, INDEX, f, g, _integrate and the twelve volumes) found no test or decision id defined twice with two meanings: every apparent duplicate is an index row and its Part A entry (J-A…, D-n), a bench-registration row and its bar's body (T-V2-22 …), an amendment note to the same request (BCR-V11-1 …), or a continuation line of a range. The rewrite keeps one definition per id: a volume's amendment notes to its own request fold into the request's one entry.
RULING: No renumbering beyond the rulings above.
renumber: []

## g parts

### g item 111 new design at build depth in every named unit; F-MISSING if absent
- "pipeline"
- "model"
- "determinism"
- "rendering"
- "scope"
- "V07"
- "V08"
- "V11"
- "V06"
- "V05"
- "V09"
- "V10"
- "V12"

### g item 112 new design at build depth in every named unit; F-MISSING if absent
- "rendering"
- "scope"
- "V09"
- "V12"

### g item 113 new design at build depth in every named unit; F-MISSING if absent
- "pipeline"
- "determinism"
- "scope"
- "model"
- "V06"
- "V08"
- "V04"
- "V07"
- "V11"
- "V09"
- "V10"
- "V12"

## owner questions
- {"unit": "V10", "question": "Q1", "subject": "the user's own API key or a relay", "answer": "follows SettlementForge's AI setup (J121)"}
- {"unit": "V10", "question": "Q2", "subject": "SettlementForge's assistant or ours", "answer": "J122/J121: SettlementForge's, driving our tool API"}
- {"unit": "V10", "question": "Q3", "subject": "the model tier", "answer": "follows SettlementForge (J121); a cheaper tier is evaluated before any switch"}
- {"unit": "V10", "question": "Q4", "subject": "the built-in clerk as M3c beside M3b", "answer": "J122: yes"}
- {"unit": "V10", "question": "Q5", "subject": "the clerk's live-evaluation spend", "answer": "J122: a budget cap of about US$790–1 190 through M3c, spent in stages (smallest tier first, the full suite at M3c's exit), each spend shown to the owner first"}
[{"q": "Q1", "subject": "the user's own API key or a relay", "answer": "follows SettlementForge's AI setup (J121)"}, {"q": "Q2", "subject": "SettlementForge's assistant or ours", "answer": "J122/J121: SettlementForge's, driving our tool API"}, {"q": "Q3", "subject": "the model tier", "answer": "follows SettlementForge (J121); a cheaper tier is evaluated before any switch"}, {"q": "Q4", "subject": "the built-in clerk as M3c beside M3b", "answer": "J122: yes"}, {"q": "Q5", "subject": "the clerk's live-evaluation spend", "answer": "J122: a budget cap of about US$790–1 190 through M3c, spent in stages (smallest tier first, the full suite at M3c's exit), each spend shown to the owner first"}]

## cohesion
- The volume's §8 build plan agrees with INDEX §3/§4 and §16: milestone id (M6 = V02's stage 3; M6-U, M6-sky, M6-E, M6-P, V-M, M-CAL, M-SF, M3c), start-after, runs-beside, price (its own estimate), and J122's slot.
- The volume's §11 marks every owner question answered (OWNER_Q) and its body reads each decision (J121 inputs; J122 decisions).
- The volume's §1b wiring table names each piece's producer and consumer in the set (principle (7)); every hand-off it lists is closed at its destination or routed here.
- One marker line; no stacked banners, PROGRESS ledgers, reconciliation or finalization records (S9).

## canon decisions
- {"id": "J-C1", "decision": "The default ink map keeps its gentle cast shadows in its own ink; only the MFCG parity preset draws none (J-A68.81 as designed).", "basis": "J122 delegation; no behaviour change"}
- {"id": "J-C2", "decision": "The `ink` plate chroma stays 20–30 (J-A69.82 as designed); `parchment`, a shipping ink-family variant at M3b, aims at the corpus median 43 (RIC-01).", "basis": "J122 delegation; keeps both statements"}
- {"id": "J-C3", "decision": "The item-72 surplus-pressure reading stands as designed.", "basis": "J122 delegation; no behaviour change"}
- {"id": "J-C4", "decision": "A raised-way span whose under-deck strip lies wholly on hinterland land-use faces stays open (reason `country`) at every rung (V07-XCONF-2).", "basis": "realism tiebreaker; one rule at the span rule's base home"}

## requests_in_f
- BCR-V10-3 -> item 270 | 2.8 Identity, lifecycle, provenance, the entity registry
- BCR-V10-15 -> item 271 | 2.8 Identity, lifecycle, provenance, the entity registry
- BCR-V10-21 -> item 290 | 4.3 S4 Backbone — arterials routed between named destinations, built as one grap
- BCR-V10-4 -> item 297 | 4.5 S6 Districts, quarters and fields · S7b Allocation and district claims
- BCR-V10-2 -> item 311 | 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b Placement · S11 Site
- BCR-V10-12 -> item 348 | 7.1 Edits are ordered events on addresses; the named actions; the edit targets; 
- BCR-V10-16 -> item 365 | 7.1 Edits are ordered events on addresses; the named actions; the edit targets; 
- BCR-V10-17 -> item 366 | 7.1 Edits are ordered events on addresses; the named actions; the edit targets; 
- BCR-V10-18 -> item 367 | 7.1 Edits are ordered events on addresses; the named actions; the edit targets; 
- BCR-V10-20 -> item 368 | 7.1 Edits are ordered events on addresses; the named actions; the edit targets; 
- BCR-V10-1 -> item 468 | 11.2 The embedding API and the worker boundary (SCL-6)
- BCR-V10-5 -> item 469 | 11.2 The embedding API and the worker boundary (SCL-6)
- BCR-V10-6 -> item 470 | 11.2 The embedding API and the worker boundary (SCL-6)
- BCR-V10-13 -> item 471 | 11.2 The embedding API and the worker boundary (SCL-6)
- BCR-V10-7 -> item 473 | 11.3 The host bridge — the host is the store (FTG-12)
- BCR-V10-19 -> item 481 | 12.8 Memory (what is counted, per rung)
- BCR-V10-11 -> item 487 | 13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT
- BCR-V10-8 -> item 518 | §14 Package and module layout, key interfaces, dependency rules, extension point
- BCR-V10-14 -> item 519 | §14 Package and module layout, key interfaces, dependency rules, extension point
- BCR-V10-10 -> item 531 | §16 Build plan — calibration and spikes first, then a viewable town, then editin
- BCR-V10-9 -> item 538 | 17.4 Dependencies (IMP-14)
- BCR-V10-23 -> item 571 | 7.1 Edits are ordered events on addresses; the named actions; the edit targets; 
- BCR-V10-22 -> item 572 | 11.2 The embedding API and the worker boundary (SCL-6)

## bcr_pointer
- V10-0724 BCR-V10-1 -> item 468
- V10-0725 BCR-V10-2 -> item 311
- V10-0726 BCR-V10-3 -> item 270
- V10-0727 BCR-V10-4 -> item 297
- V10-0728 BCR-V10-5 -> item 469
- V10-0729 BCR-V10-6 -> item 470
- V10-0730 BCR-V10-7 -> item 473
- V10-0731 BCR-V10-8 -> item 518
- V10-0732 BCR-V10-9 -> item 538
- V10-0733 BCR-V10-1 -> item 468
- V10-0734 BCR-V10-11 -> item 487
- V10-0735 BCR-V10-12 -> item 348
- V10-0736 BCR-V10-1 -> item 468
- V10-0737 BCR-V10-14 -> item 519
- V10-0738 BCR-V10-15 -> item 271
- V10-0739 BCR-V10-16 -> item 365
- V10-0740 BCR-V10-17 -> item 366
- V10-0741 BCR-V10-18 -> item 367
- V10-0742 BCR-V10-19 -> item 481
- V10-0743 BCR-V10-20 -> item 368
- V10-0744 BCR-V10-21 -> item 290
- V10-0745 BCR-V10-22 -> item 572
- V10-0746 BCR-V10-23 -> item 571

## history_out ['V10-0779', 'V10-0780']

## terms
- {"id": "G-cite", "retired": "V1-3.8.7, V4 §3.5, V6 §2.8, V9 §4.9 …", "term": "Vnn §x.y (e.g. V04 §3.2); the base is bare §x.y", "count": 288, "lines": [239, 277, 302, 327, 347, 358]}
- {"id": "G-DR", "retired": "DR-V1.1, DR-SKY, DR-V6.1, DR-V8.1 … DR-V8.8", "term": "DR26–DR35 (ID-DR)", "count": 2, "lines": [442, 443]}
- {"id": "G-newrandom", "retired": "scoped re-roll, Try again (in prose), Rebuild … as generated", "term": "New random (§7.1); 'Try again' is only its catalogue label; 'reroll' only for rerollLayer", "count": 4, "lines": [253, 2486, 2566, 3915]}
- {"id": "G-suppress", "retired": "kept removed, the removal holds, Removals that hold (in design prose)", "term": "suppression (file f item 260)", "count": 1, "lines": [3348]}
- {"id": "G-clerkhandle", "retired": "ClerkHarness", "term": "ClerkHandle", "count": 14, "lines": [237, 238, 328, 380, 389, 392]}

## agreement_disagreements
- {"subject": "WhyPull", "with": "V01", "rulings": ["V10-XAGREE-2"]}
- {"subject": "SettlementForge", "with": "V08", "rulings": ["SCOPE-C07"]}
- {"subject": "EditEvent", "with": "V09", "rulings": ["DXC-04"]}
- {"subject": "SettlementForge", "with": "V09", "rulings": ["SCOPE-C07"]}
- {"subject": "T-V9-15", "with": "V09", "rulings": ["V09-XAGREE-3"]}
- {"subject": "BCR-V10-20", "with": "V09", "rulings": ["DXC-04"]}
- {"subject": "EditEvent", "with": "determinism", "rulings": ["DXC-04"]}
- {"subject": "SettlementForge", "with": "scope", "rulings": ["SCOPE-C07"]}