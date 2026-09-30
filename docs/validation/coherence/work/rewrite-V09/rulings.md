# V09 rulings (extracted from canon.json)

## shrink {"words_before": 111610, "goal_band_words_after": [66966, 83708], "narration_ranges_words": 14114, "restatement_items": 62, "bcr_blocks_to_pointers": 36}

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

### SCOPE-C07 CONFIRMED FIX units ['scope', 'V10', 'V09', 'V08']
where: §14, Staged list, J-A101.02 vs J121/J122
- statement_a: §14 (l.14513-14529): a clerk is the host's own or 'the built-in one, which is staged'; the built-in clerk opt-in and labelled as AI; Staged list: 'the built-in clerk comes after the API'; J-A101.02.
- statement_b: J121: the assistant and its model tier follow SettlementForge; J122 decisions V10 Q2 ('SettlementForge's [assistant], driving our tool API') and V10 Q4 ('the built-in clerk as M3c beside M3b').
proposed: The base must say which clerk exists when (SF assistant via the tool API; the built-in clerk at M3c) and that its model tier follows SF.
RULING: Per J121/J122: in the SettlementForge module SettlementForge's assistant drives the map's tool API through the host seam (configuration C, V10 Q2); the built-in clerk ships at M3c beside M3b and runs only where the deployment's configuration enables it; the provider, model tier and key path are configuration inputs read from SettlementForge's AI setup (J121), never decided by the design. §14's clerk paragraph, the Staged list and J-A101.02's index row say so.
basis: J121, J122

### SCOPE-C15 CONFIRMED (placeholder vs decided rule) FIX units ['scope', 'V09']
where: title, D-19, J-17 vs J121/J122
- statement_a: Title block and D-19: the codename PLAT is a placeholder (D-19), a default that costs nothing to change.
- statement_b: J122 V09 Q3: the product's public name follows SettlementForge (J121).
proposed: PLAT stays the codename and package prefix; the public name reads SettlementForge's decision.
RULING: PLAT stays the codename and the package prefix @plat/*; the product's public name follows SettlementForge (J121). Title block and D-19 say so.
basis: J121

### V01-XCONF-2 major FIX units ['rendering', 'V01', 'V09']
where: V1-5.3 VTT row and BCR-40 (f 448) vs V09 BCR-V9-31 (c) (f 447 lane)
- claim: V01 admits a retaining wall to the .dd2vtt line_of_sight only when its derived step is >= vtt.retainingMinCm (150 cm), broken over stair/ramp intervals; V09 BCR-V9-31 (c) says 'in the ground scene retaining walls and the raised supports' footprints join line_of_sight as cliffs do' with no threshold. V01's reconciliation round 1 logged it ('keeps BCR-40's threshold until that lane rules'); no ruling is recorded. One export behaviour, two rules.
proposed: Canon rules one rule at §11.1 (V01's threshold is the more specific; V09 cites it) and closes the hand-off.
RULING: One VTT rule at §11.1 (files f items 447 and 448 applied together): a retaining wall joins .dd2vtt line_of_sight where its derived step is ≥ vtt.retainingMinCm (150 cm), broken over stair and ramp intervals (V01 BCR-40, the more specific rule); raised supports' footprints join as cliffs do (BCR-V9-31 (c)). V01 V1-5.3 and V09 cite §11.1.
basis: f items 447, 448; the specific rule qualifies the general

### V06-AGREE-1 minor FIX units ['V06', 'V09']
where: V6 §3.19.3 (6), §4.2 (remove rows) vs V09 §4.20.3 info.remove.holds
- claim: V06 states the delete dry-run lines as 'The city will not rebuild this aqueduct; undo brings it back', 'The town will not rebuild this terrace wall', 'No house will be built on this spot of the bridge'; V09's one message key info.remove.holds reads 'The town won't {rebuild / raise} this {kind}; undo brings it back.' (and V05 quotes V09's form); the same event's user-facing line differs between the volumes (principle (10): same message).
proposed: V06 cites V09's info.remove.holds key (with its {kind} slot) instead of stating its own lines; if a deck-plot wording is needed, V09 adds it as a variant.
RULING: V06 cites V09's info.remove.holds key with its {kind} slot for every delete dry-run line; a deck-plot wording is a V09 variant row ('No house will be built on this spot of the bridge').
basis: V09 owns the catalogue (application labels, J-VI.12)

### V08-XCONF-6 minor FIX units ['V08', 'V09']
where: V08 §5.5 ('the module's own strings are its locale table (§14's app), with English the default')
- claim: J121 (docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md: 'other interface languages — follows SettlementForge (J121)') requires the module's interface language to follow SettlementForge's decision as an input; V08 fixes English as the default of the module's own locale table instead of reading SF's language setting.
proposed: The frame's locale is the host's (an input on doc.load or MapHostConfig from SF's language decision); English only as the catalogue's source language.
RULING: The frame's interface language is the host's (an input on doc.load / MapHostConfig from SettlementForge's language decision, J121); English is the catalogue's source language, not a product default.
basis: J121

### V09-ICONF-1 minor FIX units ['V09']
where: V09 §2.1 heading and table (lines 416-424)
- claim: The heading reads 'The four classes of state' while the table lists five classes (canonical, document view state, machine preferences, local store, session-transient).
proposed: Retitle 'The five classes of state' (or merge machine preferences and local store if the canon rules them one class; they differ in stores and writers, so keep five).
RULING: V09 §2.1's heading reads 'The five classes of state' (the five differ in store and writer; kept apart).
basis: wording

### V09-ICONF-2 minor FIX units ['V09', 'determinism']
where: V09 §1.1 (4) and §4.3 opening sentence vs the §4.3 table
- claim: The rule says every EditEvent kind is 'reached from exactly one home tool', but the table homes the same kind at several tools: split and merge at T5 (districts, line 1470) and T9 (ways line 1466, plots line 1484); delete at T10 (line 1500) and T9 (access points line 1476, catacomb galleries line 1477); instance at T6 (hood pin, 1478), T8 (trees, 1482) and T9 (furniture, 1486); setAttr and convert at most tools. T-V9-12's completeness check cannot test 'exactly one' as worded.
proposed: State the unit precisely — one home tool per (event kind, target class or path) — and key the table and T-V9-12 on that pair.
RULING: The unit of the binding is one home tool per (event kind, target class or path); §7.1's binding table (DXC-04) and T-V9-12 are keyed on that pair.
basis: precision; agrees with DXC-04

### V09-ICONF-3 major FIX units ['V09']
where: V09 §4.20.5 (4) (lines 2768-2775) vs §4.9's opening paragraph
- claim: §4.20.5 (4) opens 'Withdrawn by J-VI.4 … these are bends, not refusals' and then says the stack keys 'with bend.raised.island, bend.aqueduct.island, bend.raised.onIsland, bend.aqueduct.uphill and bend.retaining.rim … form V9 §4.9's added refusal class — a rule of a building's structure or of nature … T-V9-13's list gains them', while §4.9 states that class 'is withdrawn by J-VI.4, its cases now bends'. The same keys are called bends and members of a refusal class; T-V9-13's list is left ambiguous. It also keeps 'the former text, kept for the record' (narration).
proposed: Delete the withdrawn paragraph's leftover sentence and 'kept for the record' text; state once (at §4.9) that these ten keys are bends, and have T-V9-13 list them as bends.
RULING: §4.20.5 (4)'s leftover sentence and 'kept for the record' text are deleted; §4.9 states once that the ten keys are bends; T-V9-13 lists them as bends.
basis: J-VI.4

### V09-ICONF-4 minor FIX units ['V09']
where: V09 §4.15 'Never colour alone' vs §5.4 'Supply links'
- claim: §4.15 says the link view 'draws each goods family with its own dash pattern (five patterns) besides its colour', while §5.4 draws links 'coloured by the good's family … dashed where the satisfaction is below 1' and impaired chains 'with a gap every 20 px'. Dashing carries three different meanings (goods family, low satisfaction, impaired chain), so a dashed link is ambiguous and the second cue for colour is undefined.
proposed: Give each cue one channel: e.g. goods family = colour + dash pattern (five), satisfaction < 1 = reduced opacity or a hollow arrowhead, impaired chain = half width with gaps; state it once in §5.4 and cite from §4.15 (this also serves item 112 (a)'s second cue).
RULING: One channel per cue, stated once in V09 §5.4 and cited from §4.15: goods family = colour and dash pattern (five patterns); satisfaction below 1 = a hollow arrowhead; an impaired chain = half line width. Dashing never carries a second meaning (this is also g item 112 (a)'s second cue).
basis: one meaning per cue; g item 112

### V09-ICONF-5 minor FIX units ['V09']
where: V09 §9 J-V9.40 vs §4.17.4 (4) and J-V9.102
- claim: J-V9.40 still reads 'chose to expand a dwelling declaration on a sealed void into a closure that digs a way down …, else opens the nearest public opening, and to refuse only when neither exists', while §4.17.4 step (4) and J-V9.102 replace that refusal by the bend onto ground part 0 (bend.under.noAccess; item 101 R2) and add the collapsed_shaft step. J-V9.40 is not marked amended, so the decision table states a refusal the design no longer has.
proposed: Amend J-V9.40's text to the four-step ladder (or mark it 'amended by J-V9.102') so the decision and §4.17.4 agree.
RULING: J-V9.40 carries 'amended by J-V9.102' and states the four-step ladder (no refusal).
basis: canon E-SUPERSEDE; item 101 R2

### V09-XAGREE-1 major FIX units ['V11', 'V09', 'V10']
where: V09 §2.6 (screen → row table), §4.7, §10.2 XV-V9-1/XV-V9-2 vs V11 §4.2 (V11 lines 4012-4030)
- claim: V09 and V11 disagree on the shape of the two document-only tables: (1) V09 writes a kind key 'cls:<class>' (a roster class no dossier record binds); V11 lists three key forms only (uid:, cat:, use:); (2) V09 writes split:false and V11's quarter, place and pin cells under the KIND key ('Keep works and shop together for every {kind}', 'Put them in {quarter}', 'Put them here', 'Keep them where they are'), while V11 gives uid: {profile, familyWeights, quarter} and cat: {profile, familyWeights} and puts place, pin and split on use: rows only; (3) V09 says a use: key 'admits the split cell only', V11's use: row carries place, pin, split and specialisation; (4) V09's link view writes siting.linkEdits {avoid: [provider]} ('Cut this link'), V11 §4.2's cells are {bindTo?, cut?} (only V11's wiring row W42 mentions avoid). XV-V9-1 and XV-V9-2 are not marked Met and are not closed at their destination. V10 §4.1's encoders write the same disputed forms (link avoid list; merge allOfKind with cls:<class>).
proposed: Rule the tables' shape once at V11 §4.2 (the owner of the tables): add cls: and avoid, and state which cells each key form admits; V09 §2.6 cites it and maps each screen to a cell V11 declares; mark XV-V9-1/2 closed.
RULING: V11 §4.2 (the tables' owner) states the union of both volumes' needs: siting.declared key forms uid:, cat:, cls: (a roster class no dossier record binds) and use:; the kind keys (uid:, cat:, cls:) admit profile, familyWeights, quarter, place and split; use: admits place, pin, split and specialisation; siting.linkEdits cells {bindTo?, avoid?, cut?} with the three meanings (bindTo keeps a supplier; avoid cuts one, the next nearest serving; cut stops the good at that use). V09 §2.6 maps each screen to a declared cell and cites V11 §4.2; V10 §4.1's encoders write only declared cells; XV-V9-1 and XV-V9-2 are closed.
basis: the tables' owner rules; union of existing statements, nothing lost

### V09-XAGREE-2 major FIX units ['V03', 'V09']
where: V09 §4.17.5 (e) and XV-V9-5 vs V03 §3.7.4 rank rule (V03 lines 1837-1845)
- claim: V09's crypt bend clamps another church's crypt enlarged past the cathedral's 'just short of it' ('this one stops just short of it', bend.crypt.largest) and says 'V03 computes (e) (XV-V9-5)'; V03 caps every non-principal crypt at crypt.rankShare (V11's row, default 0.8) × the principal's area and recomputes the rank each run, and V03 holds no crypt-edit bends (no bend.crypt.* dry run, no mention of XV-V9-5). The value (just short vs 80 %) and the owner of the dry run disagree; the hand-off is open.
proposed: Rule at V03 §3.7.4 (the crypt's owner): an enlarging edit bends to the rankShare cap (words 'stops at {share} of the cathedral's'), the cathedral's crypt removal keeps its smallest lawful size; V09 §4.17.5 (e) and bend.crypt.largest cite and word it; close XV-V9-5.
RULING: V03 §3.7.4 (the crypt's owner) states the crypt-edit dry runs: an enlarging edit bends to the rank cap crypt.rankShare × the principal's area ('stops at {share} of the cathedral's'); a plan event that would remove the cathedral's crypt keeps it at its smallest lawful size; the crypt join's closing is listed as a fate. V09 §4.17.5 (e) and bend.crypt.largest word and cite it; XV-V9-5 closed.
basis: V03 owns the crypt (J111); rankShare is V11's cell

### V09-XCONF-1 major FIX units ['V09']
where: V09 §10.1 BCR-V9-3 (applied as written by file f item 277) vs V09 §2.4 WorkingLayer
- claim: BCR-V9-3's new §2.9 text defines workingLayer as 'the layer the tools act on — ground, a sky island's PlatKey, or an underground depth band', while V9 §2.4 types WorkingLayer as {layer 'ground'} / {layer 'sky'; key} / {layer 'underground'} and says 'the band is the view key depthBand alone (§2.9), never copied here'. Applying item 277 as written would put a band into workingLayer, contradicting the volume's type and V04's depthBand key.
proposed: Correct BCR-V9-3's text (and file f item 277's application) to 'ground, a sky island's PlatKey, or the underground (its band the view key depthBand)'.
RULING: BCR-V9-3's text reads 'ground, a sky island's PlatKey, or the underground (its band the view key depthBand)'; file f item 277 applies the corrected text.
basis: V09 §2.4's type; J-VI.19's view-key rule

### V09-XAGREE-3 major FIX units ['V02', 'V09', 'V10']
where: V09 §4.9 catalogue (tier/stack/deck bend rows) and §4.20.5 vs V02 §1b bend ids (V02 line 303, 2695)
- claim: V02 names its stacked-massing and deck bends bend.tiers.stepped, .none, .axial, .internal, .count, .step, bend.stack.groundWing, .roof, .base, bend.deck.single, bend.deck.basement, bend.building.remove, bend.wing.grow, bend.family.nearest, bend.room.passage, bend.row.plotLine, and states 'volume 9's (X21) … under the ids of V2 §1b'. V09's catalogue holds bend.tiers.count and bend.tiers.step (shared) but otherwise bend.tiers.flights, bend.tier.height, bend.stack.internalSolid, .removeStair, .addWing, .deck, .notStepped and bend.deck.floors — none of which V02 emits — and has no row for fourteen of V02's ids. IN-V09-4 ('every bend of V2 §1b … has a catalogue row') was never applied to §4.9. The engine would emit keys with no row (T-V9-15 fails CI) and V09's rows would have no producer. V10's IN-V10-3 has the clerk "word each bend of V2 §1b", which it can only do through V09's rows.
proposed: Take V2 §1b's bend ids as the one set (V02 owns the dry run): write one §4.9 row per V02 id with its words and buttons, retire V09's unmatched keys (or V02 adopts them by a ruling), and re-point T-V9-59 and §4.20.5.
RULING: V02 §1b's bend ids are the one set (V02 owns the massing dry run): V09 §4.9 holds one row per V02 id with its words and buttons; V09's keys with no producer are retired, unless V02 finds the case among V2 §4.6's bends, names it in §1b and V09 keeps the row; T-V9-59 and §4.20.5 re-point. V10 words each bend through V09's rows.
basis: producer owns the id; T-V9-15 (no key without a row)

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

### V09-J121-1 major FIX units ['V09']
where: V09 §0 'The assistant' paragraph (line 160-165)
- claim: The plain-words text says the assistant 'asks for your own key to the AI service before anything leaves your computer' and 'stops at the monthly limit you set'; OWNER RULING J121 and the delegated decisions (V10 Q1: the user's own API key or a relay — follows SettlementForge's AI setup; V10 Q2: SettlementForge's assistant, driving our tool API; V10 Q3: model tier follows SettlementForge) make the key/relay and the assistant a SettlementForge input, not a V09 decision.
proposed: Reword to read SettlementForge's AI setup as an input (J121); the standalone key entry survives only as the standalone case if the canon so rules; cite J121/J122.
RULING: V09 §0's assistant paragraph reads SettlementForge's AI setup as an input (J121): in the SettlementForge module SettlementForge's assistant drives the map; the own-key path is the one a deployment's configuration enables, never the default product path.
basis: J121, J122; SCOPE-C07

### V09-J121-2 minor FIX units ['V09']
where: V09 §1.3 'A hosted service, accounts and live multi-user editing — none (§11.5)'
- claim: J121 makes hosting, web origin and accounts follow SettlementForge's product decisions, and J122 decided 'two people editing one map at once: not now; revisit with the live party map after M-SF'; the out-of-scope line states 'none' as the volume's own decision without citing either ruling.
proposed: Mark as 'follows SettlementForge (J121)' for hosting/accounts and cite J122 for simultaneous editing.
RULING: V09 §1.3 reads: hosting and accounts follow SettlementForge (J121); simultaneous editing of one map by two people is not offered (J122).
basis: J121, J122

### V09-J121-3 minor FIX units ['V09']
where: V09 §2.9 'Locales' / 'English ships' and §4.9 'A shipped locale carries every key', §5.12 General (language)
- claim: Interface languages were ruled 'follows SettlementForge (J121)' in docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md ('other interface languages'); the volume states the locale policy (English ships; locale files) as its own without reading SettlementForge's decision as an input.
proposed: Mark: which locales ship follows SettlementForge (J121); keep the locale-file mechanism as the carrier.
RULING: Which locales ship follows SettlementForge (J121); the locale-file mechanism stays; English is the catalogue's source language.
basis: J121

### V09-J121-4 major FIX units ['V09']
where: V09 §4.11 first-opening cards (key card, configuration A/B), §2.10 ClerkHandle.setKey, §4.9 clerk.key.missing
- claim: J121/J122 decided V10 Q1 ('the user's own API key or a relay: follows SettlementForge's AI setup') and V10 Q2 ('SettlementForge's assistant, driving our tool API'); the volume's shell does not say which clerkMode and configuration the SettlementForge host uses, and the key card and 'The assistant needs your own key for the AI service' read as the default product path.
proposed: State that in the SettlementForge module the AI setup and assistant follow SettlementForge (J121/J122: clerkMode from SettlementForge's configuration; SettlementForge's assistant proposes through the host proposal path); the own-key card is the standalone case only.
RULING: V09 §4.11, §2.10 and §4.9 state: in the SettlementForge module the clerkMode and configuration come from SettlementForge's configuration (SettlementForge's assistant proposes through the host proposal path); the own-key card appears only where the configuration enables the built-in clerk with a user key.
basis: J121, J122

### V09-J122-1 minor FIX units ['V09', 'scope']
where: V09 §7.3 (2) Participants ('Recruitment and any thank-you are the owner's (V9 §11 Q2)')
- claim: J122 decided V09 Q2 in docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md: 'five SettlementForge users per round, recruited from its existing community; thanks by credit and early access, no payments'. The protocol still routes recruitment to the owner and keeps 'five to eight' participants without the decided source and thanks.
proposed: Write the decision into §7.3 (2) (source: SettlementForge's community; five per round within §13.4's five-to-eight; thanks by credit and early access, no payments; J122) and mark §11 Q2 answered.
RULING: V09 §7.3 (2) reads: five SettlementForge users per round, recruited from its existing community (within §13.4's five to eight), thanked by credit and early access, no payments (J122); §11 Q2 marked answered.
basis: J122

### V09-J121-5 major FIX units ['V09']
where: V09 §11 Owner questions (lines 4254-4268)
- claim: J121/J122 answered all three: Q1 (preview host) — 'follows SettlementForge's staging (J121)'; Q2 (participants and thanks) — 'five SettlementForge users per round, recruited from its existing community; thanks by credit and early access, no payments' (J122); Q3 (public name) — 'follows SettlementForge (J121)'. V09 §11 still lists them as open with the old defaults (a free static host from AP2; unpaid invitations with a US$20-25 fallback; keep 'PLAT'), and the opening sentence 'until the owner answers, the design runs on the recommendation'; the brief requires each marked answered and the design to read SettlementForge's decision as an input.
proposed: Mark Q1 and Q3 'follows SettlementForge (J121)' and Q2 'decided (J122): …'; drop the stale defaults; have §7.3 and the AP2 build step read SettlementForge's staging host and community as inputs.
RULING: V09 §11: Q1 and Q3 'follows SettlementForge (J121)' (the preview host is SettlementForge's staging; the public name SettlementForge's); Q2 'decided (J122): …'; the stale defaults and 'until the owner answers' are removed; §7.3 and AP2 read SettlementForge's staging host and community as inputs.
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

### E-16 UNIFY `tint` and `vignette` each name a paint program and a post operation (REL-01); the role `lights` vs `light` (REL-05).
unified_form: One name per mechanism: paint programs keep `tint` and `vignette`; the post operations are renamed `wash` (a whole-tile tint after the light, including the condition overlay's settlement-wide tint) and `edgeFade` (the view's vignette); the role `lights` is renamed `glow` (the program it feeds).
home: §8.2 (rendering) units ['rendering', 'V04', 'V05', 'V09']
- EQ: a program runs per mark in its slot; a post operation once per tile base after the light
- EQ: the painterly family's spotlight vignette is the `vignette` program
- EQ: the two roles' distinct uses kept (glyph tone vs glow sprite)
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

### W-IF-04 hook-one-ended minor ['V09', 'V12']
piece: the calibration register → the tables editor's cell inspector
link: V09 §4.14's tables editor shows per cell its calibration register entry (V12 §2.6 CalibrationEntry: status, reference, due milestone, history) from `register.json` / `dist/evidence.json` — folding IN-V09-7 into the body (V01 §1b and V12 §1b name the inspector as a consumer)
RULING: WIRE: write the named link at its home (the link column), both ends

### W-EDIT-01 edit-no-tool major ['determinism', 'V09', 'V10']
piece: §7.1's twelve-tools table vs the 70 EditEvent kinds
link: one canonical home for the event → tool binding covering every EditEvent kind (the base's §7.1, since the tools and events are the base's, with V09 §4.3 citing it, or V09 §4.3 with §7.1 pointing to it — the canon rules); §7.4's create cells cite tools by id (DXC-04)
RULING: CLOSED by DXC-04 / E-04 (one binding table at §7.1).

### W-FLD-11 orphan minor ['V09']
piece: LocalDocRecord.appVersion
link: V09 §2.11 names its reader (as DraftMirror.appVersion is read at open: a record from a newer app opened read-only) or drops it
RULING: WIRE: write the named link at its home (the link column), both ends

### V05-WGAP-1 hook-one-ended major ['V09']
piece: the offset-occlusion un-displacement of sky hit tests has no V09 end
link: V09's hit-testing section states the un-displacement (world point less elevation × offsetPerMetre) for sky hits and tool points, citing V05 §4.2; or the base §8.4/§9 owns it.
RULING: WIRE: write the named link at its home (the link column), both ends

### V05-WGAP-2a hook-one-ended major ['V09', 'V05']
piece: the island bend lines (keeps room; the rim stops here) have no bend.* message rows
link: Add both lines to V09's bend.* message rows and V10's bend category (J-VI.4), citing V05 §4.2. — the V09 part
RULING: WIRE: write the named link at its home (the link column), both ends

### V06-WGAP-1a hook-one-ended major ['V09', 'V06']
piece: the lone-neighbourhood bend line has no V09 message row
link: Add the line to V09's bend.* rows and V10's bend category, citing V6 §4.1; mark X30 met. — the V09 part
RULING: WIRE: write the named link at its home (the link column), both ends

### V09-WGAP-1 hook-one-ended minor ['V09']
piece: item 113 (e)'s LOST void has no V09 consumer
link: Name V09's consumer of the LOST state (legend line, panel line 'Once known; its way in closed in {year}', tier rule) when V04 writes item 113 (e); canon routes the part.
RULING: WIRE: write the named link at its home (the link column), both ends

### V09-WGAP-2 hook-one-ended major ['V09']
piece: integration notes IN-V09-4/5/6/7/11 absent from the body
link: Fold each note into its body home at build depth (toolkit rows, HandleSet kinds, binding rows, panel lines, BCR-V9-31 (a)) and resolve the two contradictions by the note (J-VI.17 is the integrator's ruling); then drop the notes.
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
- {"unit": "V09", "question": "Q1", "subject": "a private preview host", "answer": "follows SettlementForge's staging (J121)"}
- {"unit": "V09", "question": "Q2", "subject": "first-five-minutes participants and any thank-you", "answer": "J122: five SettlementForge users per round from its community; thanks by credit and early access, no payments"}
- {"unit": "V09", "question": "Q3", "subject": "the product's public name", "answer": "follows SettlementForge (J121)"}
[{"q": "Q1", "subject": "a private preview host", "answer": "follows SettlementForge's staging (J121)"}, {"q": "Q2", "subject": "first-five-minutes participants and any thank-you", "answer": "J122: five SettlementForge users per round from its community; thanks by credit and early access, no payments"}, {"q": "Q3", "subject": "the product's public name", "answer": "follows SettlementForge (J121)"}]

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
- BCR-V9-33 -> item 244 | 2.7 Walls, gates, towers, castle, bridges; greenery, land use, decorations, pins
- BCR-V9-30 -> item 246 | 2.7 Walls, gates, towers, castle, bridges; greenery, land use, decorations, pins
- BCR-V9-19 -> item 269 | 2.8 Identity, lifecycle, provenance, the entity registry
- BCR-V9-3 -> item 277 | 2.9 The document and serialisation
- BCR-V9-20 -> item 278 | 2.9 The document and serialisation
- BCR-V9-16 -> item 348 | 7.1 Edits are ordered events on addresses; the named actions; the edit targets; 
- BCR-V9-13 -> item 360 | 7.1 Edits are ordered events on addresses; the named actions; the edit targets; 
- BCR-V9-21 -> item 361 | 7.1 Edits are ordered events on addresses; the named actions; the edit targets; 
- BCR-V9-26 -> item 362 | 7.1 Edits are ordered events on addresses; the named actions; the edit targets; 
- BCR-V9-29 -> item 363 | 7.1 Edits are ordered events on addresses; the named actions; the edit targets; 
- BCR-V9-33 -> item 364 | 7.1 Edits are ordered events on addresses; the named actions; the edit targets; 
- BCR-V9-22 -> item 372 | 7.3 Locality — effective scope, local operators, edit fates, recorded inputs, th
- BCR-V9-7 -> item 411 | 8.2 Style sheets as data: roles, contrast, symbolisation, paint programs, layer 
- BCR-V9-25 -> item 413 | 8.4 Layers, shadows, heights
- BCR-V9-31 -> item 447 | 11.1 Formats
- BCR-V9-14 -> item 453 | 11.1 Formats
- BCR-V9-15 -> item 454 | 11.1 Formats
- BCR-V9-32 -> item 455 | 11.1 Formats
- BCR-V9-2 -> item 458 | 11.2 The embedding API and the worker boundary (SCL-6)
- BCR-V9-5 -> item 460 | 11.2 The embedding API and the worker boundary (SCL-6)
- BCR-V9-10 -> item 461 | 11.2 The embedding API and the worker boundary (SCL-6)
- BCR-V9-11 -> item 462 | 11.2 The embedding API and the worker boundary (SCL-6)
- BCR-V9-12 -> item 463 | 11.2 The embedding API and the worker boundary (SCL-6)
- BCR-V9-23 -> item 464 | 11.2 The embedding API and the worker boundary (SCL-6)
- BCR-V9-27 -> item 465 | 11.2 The embedding API and the worker boundary (SCL-6)
- BCR-V9-28 -> item 466 | 11.2 The embedding API and the worker boundary (SCL-6)
- BCR-V9-34 -> item 467 | 11.2 The embedding API and the worker boundary (SCL-6)
- BCR-V9-24 -> item 490 | 13.3 Seed goldens with the declared-shift protocol (G-P11, G-R9), from M1
- BCR-V9-17 -> item 494 | 13.4 Visual regression, B-ZOOM and the app harness
- BCR-V9-1 -> item 514 | §14 Package and module layout, key interfaces, dependency rules, extension point
- BCR-V9-2 -> item 515 | §14 Package and module layout, key interfaces, dependency rules, extension point
- BCR-V9-8 -> item 516 | §14 Package and module layout, key interfaces, dependency rules, extension point
- BCR-V9-9 -> item 517 | §14 Package and module layout, key interfaces, dependency rules, extension point
- BCR-V9-18 -> item 530 | §16 Build plan — calibration and spikes first, then a viewable town, then editin
- BCR-V9-35 -> item 570 | 7.1 Edits are ordered events on addresses; the named actions; the edit targets; 
- BCR-V9-36 -> item 583 | 11.2 The embedding API and the worker boundary (SCL-6)

## bcr_pointer
- V09-1000 BCR-V8-3 -> item 507
- V09-1001 BCR-V6-11 -> item 458
- V09-1002 BCR-V8-15 -> item 410
- V09-1003 BCR-V11-10 -> item 380
- V09-1004 BCR-V10-1 -> item 468
- V09-1005 BCR-V10-1 -> item 468
- V09-1006 BCR-V9-7 -> item 411
- V09-1007 BCR-V9-8 -> item 516
- V09-1008 BCR-V9-9 -> item 517
- V09-1009 BCR-V10-6 -> item 470
- V09-1010 BCR-V9-11 -> item 462
- V09-1011 BCR-V10-1 -> item 468
- V09-1012 BCR-V9-13 -> item 360
- V09-1013 BCR-V8-1 -> item 472
- V09-1014 BCR-V9-15 -> item 454
- V09-1015 BCR-V10-12 -> item 348
- V09-1016 BCR-V9-17 -> item 494
- V09-1017 BCR-V9-18 -> item 530
- V09-1018 BCR-V9-19 -> item 269
- V09-1019 BCR-V9-20 -> item 278
- V09-1020 BCR-V9-21 -> item 361
- V09-1021 BCR-V9-22 -> item 372
- V09-1022 BCR-V10-22 -> item 572
- V09-1023 BCR-V9-24 -> item 490
- V09-1024 BCR-V9-25 -> item 413
- V09-1025 BCR-V10-17 -> item 366
- V09-1026 BCR-V10-6 -> item 470
- V09-1027 BCR-V9-28 -> item 466
- V09-1028 BCR-V9-29 -> item 363
- V09-1029 BCR-V9-30 -> item 246
- V09-1030 BCR-V9-31 -> item 447
- V09-1031 BCR-V6-24 -> item 260
- V09-1032 BCR-V9-33 -> item 364
- V09-1033 BCR-V9-34 -> item 467
- V09-1034 BCR-V3-16 -> item 353
- V09-1035 BCR-V10-22 -> item 572

## history_out ['V09-1071', 'V09-1072']

## terms
- {"id": "G-firstmap", "retired": "first paint", "term": "first map", "count": 2, "lines": [240, 3295]}
- {"id": "G-cite", "retired": "V1-3.8.7, V4 §3.5, V6 §2.8, V9 §4.9 …", "term": "Vnn §x.y (e.g. V04 §3.2); the base is bare §x.y", "count": 1197, "lines": [29, 64, 65, 66, 67, 68]}
- {"id": "G-DR", "retired": "DR-V1.1, DR-SKY, DR-V6.1, DR-V8.1 … DR-V8.8", "term": "DR26–DR35 (ID-DR)", "count": 8, "lines": [267, 404, 405, 2687, 2805, 2806]}
- {"id": "G-M6U", "retired": "M6 (for the underground)", "term": "M6-U (\"M6\" is volume 2's stage 3)", "count": 1, "lines": [3387]}
- {"id": "G-newrandom", "retired": "scoped re-roll, Try again (in prose), Rebuild … as generated", "term": "New random (§7.1); 'Try again' is only its catalogue label; 'reroll' only for rerollLayer", "count": 3, "lines": [193, 948, 3501]}
- {"id": "G-suppress", "retired": "kept removed, the removal holds, Removals that hold (in design prose)", "term": "suppression (file f item 260)", "count": 6, "lines": [380, 1319, 1320, 1861, 3416, 4614]}
- {"id": "G-rederive", "retired": "Rebuild from {stage}", "term": "Re-derive (§7.1)", "count": 3, "lines": [1734, 1870, 4896]}
- {"id": "G-bend", "retired": "refuse.raised.*, refuse.aqueduct.*, refuse.retaining.*, refuse.stack.*", "term": "bend (bend.* keys); refuse.* only for a dossier fact or a lock", "count": 6, "lines": [4587, 4588, 4589]}
- {"id": "G-unexcavated", "retired": "LayerSpec.showUnexcavated", "term": "the view key `showUnexcavated`", "count": 1, "lines": [3986]}
- {"id": "G-clerkhandle", "retired": "ClerkHarness", "term": "ClerkHandle", "count": 2, "lines": [4238]}
- {"id": "G-offline", "retired": "error.clerkOffline", "term": "refuse.clerk.offline", "count": 1, "lines": [1763]}
- {"id": "G-floorvault", "retired": "floor vaults (wet ground)", "term": "no crypt; ledger slabs in the chancel floor (V03 §3.7.4)", "count": 1, "lines": [2435]}

## agreement_disagreements
- {"subject": "BCR-V9-31", "with": "V01", "rulings": ["V01-XCONF-2"]}
- {"subject": "SettlementForge", "with": "V08", "rulings": ["SCOPE-C07", "V08-XCONF-6"]}
- {"subject": "EditEvent", "with": "V10", "rulings": ["DXC-04"]}
- {"subject": "SettlementForge", "with": "V10", "rulings": ["SCOPE-C07"]}
- {"subject": "T-V9-15", "with": "V10", "rulings": ["V09-XAGREE-3"]}
- {"subject": "BCR-V10-20", "with": "V10", "rulings": ["DXC-04"]}
- {"subject": "EditEvent", "with": "determinism", "rulings": ["DXC-04", "V09-ICONF-2"]}
- {"subject": "SettlementForge", "with": "scope", "rulings": ["SCOPE-C07", "SCOPE-C15", "V09-J122-1"]}