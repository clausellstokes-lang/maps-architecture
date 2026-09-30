### VOL-V09-V10-RESTATEMENTS-001 [restatements; None]
New decoration as one group of rerollLayer style.jitter then style.crowns at salt + 1, spelled out in the §1b hooks cell
REQUIRED: state it once at V09 §4.5 T12 (J-V9.115); also V10 §4.1 T12 row (V10-0490); every other place cites it
CLOSURE: FIX at the unit

### VOL-V09-V10-RESTATEMENTS-002 [restatements; None]
the three load outcomes (upgrade offer, frozen view, open its recipe) restated in the §1b hooks cell
REQUIRED: state it once at base §2.9 Load steps 2-3; base §6.4 retention; every other place cites it
CLOSURE: FIX at the unit

### VOL-V09-V10-RESTATEMENTS-003 [restatements; None]
ClerkSlot / ClerkMount / ClerkHandle members restated in the §1b hooks cell
REQUIRED: state it once at V10 §2.6 members; V08 §3.1 bridge messages; every other place cites it
CLOSURE: FIX at the unit

### VOL-V09-V10-RESTATEMENTS-004 [restatements; None]
AppPrefs.history defaults 256 desktop, 96 low-end tier, frames 8 (V06 in turn cites V09: circular)
REQUIRED: state it once at V06 §2.2 (history store); every other place cites it
CLOSURE: FIX at the unit

### VOL-V09-V10-RESTATEMENTS-005 [restatements; None]
the same history-store defaults a second time in Settings, History
REQUIRED: state it once at V06 §2.2; every other place cites it
CLOSURE: FIX at the unit

### VOL-V09-V10-RESTATEMENTS-006 [restatements; None]
first-map law about 124-145 ms at the default TOWN
REQUIRED: state it once at base §1.2; §12.5 TOWN row; every other place cites it
CLOSURE: FIX at the unit

### VOL-V09-V10-RESTATEMENTS-007 [restatements; None]
all six within 1 s at TOWN; the model law about 2.3 s at METROPOLIS top
REQUIRED: state it once at base §7.8; §12.5; every other place cites it
CLOSURE: FIX at the unit

### VOL-V09-V10-RESTATEMENTS-008 [restatements; None]
the first-map law 124-145 ms again in the §6.1 T1 budget row
REQUIRED: state it once at base §12.5; every other place cites it
CLOSURE: FIX at the unit

### VOL-V09-V10-RESTATEMENTS-009 [restatements; None]
quoted panel lines in V9 §4.17 and §4.20.6, with a precedence rule for when they drift
REQUIRED: state it once at V10 §3.9a (info.under.*, info.catacomb.*, info.crypt.* rows); every other place cites it
CLOSURE: FIX at the unit

### VOL-V09-V10-RESTATEMENTS-010 [restatements; None]
dashed kerbs at 40 % alpha, no fill, no light, only its system label
REQUIRED: state it once at V04 §5.2 unexcavated style; every other place cites it
CLOSURE: FIX at the unit

### VOL-V09-V10-RESTATEMENTS-011 [restatements; None]
DigRule.maxM 20 m
REQUIRED: state it once at V04 DigRule / V11 table (rule R-c); every other place cites it
CLOSURE: FIX at the unit

### VOL-V09-V10-RESTATEMENTS-012 [restatements; None]
terrace.stepMinCm 60 cm, terrace.slopeMin 0.15
REQUIRED: state it once at V11 terrace table (R-c); every other place cites it
CLOSURE: FIX at the unit

### VOL-V09-V10-RESTATEMENTS-013 [restatements; None]
terrace.retainingReachM 15 m (also V09-0623 flatDepthM 12 m, V09-0624 coverShare 0.8): two homes
REQUIRED: state it once at V11 terrace table (XV-V9-13 met there); every other place cites it
CLOSURE: FIX at the unit

### VOL-V09-V10-RESTATEMENTS-014 [restatements; None]
aqueduct.sourceReachKm 10 km, aqueduct.gradient [0.0003, 0.003]
REQUIRED: state it once at V11 aqueduct table (R-c); every other place cites it
CLOSURE: FIX at the unit

### VOL-V09-V10-RESTATEMENTS-015 [restatements; None]
the step sampling every 2 m, plus or minus 3 m, and the effects cap 50 (V09-0629) homed in the application volume
REQUIRED: state it once at base dry run (§7.1 item-110 text, BCR-V9-27 PreviewResult) or V11; every other place cites it
CLOSURE: FIX at the unit

### VOL-V09-V10-RESTATEMENTS-016 [restatements; None]
terrace brush radius 25 m: V09 cites V10 for the default while V10 calibrates it against V09 (circular)
REQUIRED: state it once at V10 §2.10 content.encoders (V10-0186); every other place cites it
CLOSURE: FIX at the unit

### VOL-V09-V10-RESTATEMENTS-017 [restatements; None]
the family-multiplier ladder Ignore 0, Less 0.5, Normal 1, More 2, Much more 3 stated twice in V09
REQUIRED: state it once at V09 §2.6 (V09-0130); every other place cites it
CLOSURE: FIX at the unit

### V09-RESTATE-1 [restatement_findings; minor]
Several §1b cells restate mechanisms owned elsewhere instead of citing them: row 'New decoration' spells out 'one group of rerollLayer { concern: 'style.jitter' } then rerollLayer { concern: 'style.crowns' }, each at the concern's current salt + 1' (restated again in V9 §3.7/§4.5 T12 and V10 §4.1 T12 row); row 'the three load outcomes' restates §2.9 Load steps 2-3 and §6.4's retention rule; row 'ClerkSlot' restates V10 §2.6 members and V08 §3.1's bridge messages.
REQUIRED: Cells name producer/consumer by section only; the mechanism's text lives once (V9 §3.7 for New decoration, §2.9 for load).
CLOSURE: FIX at the unit

### V09-RESTATE-2 [restatement_findings; minor]
AppPrefs.history restates V06's per-device history-store defaults ('default 256 desktop, 96 on the low-end tier'; frames default 8) that V06 states at its line 685; V06 line 3274 in turn cites 'V09's settings' — a circular two-home value. V09 states the same numbers a second time in §5.12 (Settings → History).
REQUIRED: One home: V06 §2.2 owns the defaults (it defines the store); V09's field comment cites it without the numbers (or the reverse, ruled once).
CLOSURE: FIX at the unit

### V09-RESTATE-3 [restatement_findings; minor]
Base budget values are restated with their numbers instead of cited: the first-map law '≈ 124-145 ms at the default TOWN' (§1.2 line 355 and §12.5's TOWN row own it), 'all six within 1 s at TOWN' (§7.8 owns it), 'the model law reaches ≈ 2.3 s at METROPOLIS's top' (§12.5 owns it). A later change to the base budget would leave V09 stale.
REQUIRED: Cite §12.5 / §7.8 without the numbers ('within §12.5's first-map law'), or state the numbers only at the base home.
CLOSURE: FIX at the unit

### V09-RESTATE-4 [restatement_findings; minor]
'The quoted panel lines of V9 §4.17 and §4.20.6 … where a quotation there and the owning volume's text differ, the owning volume's text is the one shipped' — the volume restates other volumes' sentences (V10 §3.9a's info.under.*/info.catacomb.*/info.crypt.* lines) and legislates for their drift instead of citing them (principle (1)); a restated line that differs is ambiguous normative text.
REQUIRED: Replace the quotations in §4.17/§4.20.6 by the row keys (cite V10 §3.9a), and drop the precedence sentence.
CLOSURE: FIX at the unit

### V09-RESTATE-5 [restatement_findings; minor]
V04's values and styles are restated with their numbers: the unexcavated style 'dashed kerbs at 40 % alpha, no fill, no light, only its system's label' (V4 §5.2 owns it, V04 line 2552) and 'DigRule.maxM (20 m)' (a table value held in V04 line 856 and in V11 line 3627 — itself a two-home value for the V04/V11 lanes; file f rule R-c makes V11 the owner of values).
REQUIRED: Cite V4 §5.2's unexcavated style and DigRule.maxM by name only; the value lives in V11's table.
CLOSURE: FIX at the unit

### V09-RESTATE-6 [restatement_findings; minor]
Rule R-c of file f (volume 11 owns values) is not followed: the table restates V11 cells with their numbers (terrace.stepMinCm 60 cm, terrace.slopeMin 0.15, aqueduct.sourceReachKm 10 km, aqueduct.gradient [0.0003, 0.003]) and gives terrace.retainingReachM 15 m, flatDepthM 12 m, coverShare 0.8 two homes ('our own … a cell of volume 11's terrace table'); §4.20.1 (4) restates V10's encoders.terrace.radiusM default (25 m). Constants read by the engine's dry run (the step sampling 2 m / ± 3 m, the ef
REQUIRED: Cite V11's cells by name without numbers; move dry-run constants (sampling, effects cap) to their engine home (the base's item-110 section / BCR-V9-27's PreviewResult text) or V11's table; keep in V09 only shell constants (closing radius, preview-on-release km if the shell reads it, tierStep snap).
CLOSURE: FIX at the unit

### V09-DUP-1 [internal_duplications; minor]
The five-step family-multiplier ladder 'Ignore 0 · Less 0.5 · Normal 1 · More 2 · Much more 3' is stated twice inside V09 (and glossed a third time in V10 §2.12 line 975); one home suffices.
REQUIRED: Keep the ladder at V9 §2.6; §4.7 and V10 cite it.
CLOSURE: FIX at the unit

### V09-ICONF-1 [internal_conflicts; minor]
The heading reads 'The four classes of state' while the table lists five classes (canonical, document view state, machine preferences, local store, session-transient).
REQUIRED: Retitle 'The five classes of state' (or merge machine preferences and local store if the canon rules them one class; they differ in stores and writers, so keep five).
CLOSURE: conflict ruling V09-ICONF-1

### V09-ICONF-2 [internal_conflicts; minor]
The rule says every EditEvent kind is 'reached from exactly one home tool', but the table homes the same kind at several tools: split and merge at T5 (districts, line 1470) and T9 (ways line 1466, plots line 1484); delete at T10 (line 1500) and T9 (access points line 1476, catacomb galleries line 1477); instance at T6 (hood pin, 1478), T8 (trees, 1482) and T9 (furniture, 1486); setAttr and convert at most tools. T-V9-12's completeness check cannot test 'exactly one' as worded.
REQUIRED: State the unit precisely — one home tool per (event kind, target class or path) — and key the table and T-V9-12 on that pair.
CLOSURE: conflict ruling V09-ICONF-2

### V09-ICONF-3 [internal_conflicts; major]
§4.20.5 (4) opens 'Withdrawn by J-VI.4 … these are bends, not refusals' and then says the stack keys 'with bend.raised.island, bend.aqueduct.island, bend.raised.onIsland, bend.aqueduct.uphill and bend.retaining.rim … form V9 §4.9's added refusal class — a rule of a building's structure or of nature … T-V9-13's list gains them', while §4.9 states that class 'is withdrawn by J-VI.4, its cases now bends'. The same keys are called bends and members of a refusal class; T-V9-13's list is left ambiguou
REQUIRED: Delete the withdrawn paragraph's leftover sentence and 'kept for the record' text; state once (at §4.9) that these ten keys are bends, and have T-V9-13 list them as bends.
CLOSURE: conflict ruling V09-ICONF-3

### V09-ICONF-4 [internal_conflicts; minor]
§4.15 says the link view 'draws each goods family with its own dash pattern (five patterns) besides its colour', while §5.4 draws links 'coloured by the good's family … dashed where the satisfaction is below 1' and impaired chains 'with a gap every 20 px'. Dashing carries three different meanings (goods family, low satisfaction, impaired chain), so a dashed link is ambiguous and the second cue for colour is undefined.
REQUIRED: Give each cue one channel: e.g. goods family = colour + dash pattern (five), satisfaction < 1 = reduced opacity or a hollow arrowhead, impaired chain = half width with gaps; state it once in §5.4 and cite from §4.15 (this also serves item 112 (a)'s second cue).
CLOSURE: conflict ruling V09-ICONF-4

### V09-ICONF-5 [internal_conflicts; minor]
J-V9.40 still reads 'chose to expand a dwelling declaration on a sealed void into a closure that digs a way down …, else opens the nearest public opening, and to refuse only when neither exists', while §4.17.4 step (4) and J-V9.102 replace that refusal by the bend onto ground part 0 (bend.under.noAccess; item 101 R2) and add the collapsed_shaft step. J-V9.40 is not marked amended, so the decision table states a refusal the design no longer has.
REQUIRED: Amend J-V9.40's text to the four-step ladder (or mark it 'amended by J-V9.102') so the decision and §4.17.4 agree.
CLOSURE: conflict ruling V09-ICONF-5

### V09-XAGREE-1 [cross_part_conflicts; major]
V09 and V11 disagree on the shape of the two document-only tables: (1) V09 writes a kind key 'cls:<class>' (a roster class no dossier record binds); V11 lists three key forms only (uid:, cat:, use:); (2) V09 writes split:false and V11's quarter, place and pin cells under the KIND key ('Keep works and shop together for every {kind}', 'Put them in {quarter}', 'Put them here', 'Keep them where they are'), while V11 gives uid: {profile, familyWeights, quarter} and cat: {profile, familyWeights} and p
REQUIRED: Rule the tables' shape once at V11 §4.2 (the owner of the tables): add cls: and avoid, and state which cells each key form admits; V09 §2.6 cites it and maps each screen to a cell V11 declares; mark XV-V9-1/2 closed.
CLOSURE: conflict ruling V09-XAGREE-1

### V09-XAGREE-2 [cross_part_conflicts; major]
V09's crypt bend clamps another church's crypt enlarged past the cathedral's 'just short of it' ('this one stops just short of it', bend.crypt.largest) and says 'V03 computes (e) (XV-V9-5)'; V03 caps every non-principal crypt at crypt.rankShare (V11's row, default 0.8) × the principal's area and recomputes the rank each run, and V03 holds no crypt-edit bends (no bend.crypt.* dry run, no mention of XV-V9-5). The value (just short vs 80 %) and the owner of the dry run disagree; the hand-off is ope
REQUIRED: Rule at V03 §3.7.4 (the crypt's owner): an enlarging edit bends to the rankShare cap (words 'stops at {share} of the cathedral's'), the cathedral's crypt removal keeps its smallest lawful size; V09 §4.17.5 (e) and bend.crypt.largest cite and word it; close XV-V9-5.
CLOSURE: conflict ruling V09-XAGREE-2

### V09-XCONF-1 [cross_part_conflicts; major]
BCR-V9-3's new §2.9 text defines workingLayer as 'the layer the tools act on — ground, a sky island's PlatKey, or an underground depth band', while V9 §2.4 types WorkingLayer as {layer 'ground'} / {layer 'sky'; key} / {layer 'underground'} and says 'the band is the view key depthBand alone (§2.9), never copied here'. Applying item 277 as written would put a band into workingLayer, contradicting the volume's type and V04's depthBand key.
REQUIRED: Correct BCR-V9-3's text (and file f item 277's application) to 'ground, a sky island's PlatKey, or the underground (its band the view key depthBand)'.
CLOSURE: conflict ruling V09-XCONF-1

### V09-XAGREE-3 [cross_part_conflicts; major]
V02 names its stacked-massing and deck bends bend.tiers.stepped, .none, .axial, .internal, .count, .step, bend.stack.groundWing, .roof, .base, bend.deck.single, bend.deck.basement, bend.building.remove, bend.wing.grow, bend.family.nearest, bend.room.passage, bend.row.plotLine, and states 'volume 9's (X21) … under the ids of V2 §1b'. V09's catalogue holds bend.tiers.count and bend.tiers.step (shared) but otherwise bend.tiers.flights, bend.tier.height, bend.stack.internalSolid, .removeStair, .addW
REQUIRED: Take V2 §1b's bend ids as the one set (V02 owns the dry run): write one §4.9 row per V02 id with its words and buttons, retire V09's unmatched keys (or V02 adopts them by a ruling), and re-point T-V9-59 and §4.20.5.
CLOSURE: conflict ruling V09-XAGREE-3

### V09-J121-1 [standing_rule_conflicts; major]
The plain-words text says the assistant 'asks for your own key to the AI service before anything leaves your computer' and 'stops at the monthly limit you set'; OWNER RULING J121 and the delegated decisions (V10 Q1: the user's own API key or a relay — follows SettlementForge's AI setup; V10 Q2: SettlementForge's assistant, driving our tool API; V10 Q3: model tier follows SettlementForge) make the key/relay and the assistant a SettlementForge input, not a V09 decision.
REQUIRED: Reword to read SettlementForge's AI setup as an input (J121); the standalone key entry survives only as the standalone case if the canon so rules; cite J121/J122.
CLOSURE: conflict ruling V09-J121-1

### V09-J121-2 [standing_rule_conflicts; minor]
J121 makes hosting, web origin and accounts follow SettlementForge's product decisions, and J122 decided 'two people editing one map at once: not now; revisit with the live party map after M-SF'; the out-of-scope line states 'none' as the volume's own decision without citing either ruling.
REQUIRED: Mark as 'follows SettlementForge (J121)' for hosting/accounts and cite J122 for simultaneous editing.
CLOSURE: conflict ruling V09-J121-2

### V09-J121-3 [standing_rule_conflicts; minor]
Interface languages were ruled 'follows SettlementForge (J121)' in docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md ('other interface languages'); the volume states the locale policy (English ships; locale files) as its own without reading SettlementForge's decision as an input.
REQUIRED: Mark: which locales ship follows SettlementForge (J121); keep the locale-file mechanism as the carrier.
CLOSURE: conflict ruling V09-J121-3

### V09-J121-4 [standing_rule_conflicts; major]
J121/J122 decided V10 Q1 ('the user's own API key or a relay: follows SettlementForge's AI setup') and V10 Q2 ('SettlementForge's assistant, driving our tool API'); the volume's shell does not say which clerkMode and configuration the SettlementForge host uses, and the key card and 'The assistant needs your own key for the AI service' read as the default product path.
REQUIRED: State that in the SettlementForge module the AI setup and assistant follow SettlementForge (J121/J122: clerkMode from SettlementForge's configuration; SettlementForge's assistant proposes through the host proposal path); the own-key card is the standalone case only.
CLOSURE: conflict ruling V09-J121-4

### V09-J122-1 [standing_rule_conflicts; minor]
J122 decided V09 Q2 in docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md: 'five SettlementForge users per round, recruited from its existing community; thanks by credit and early access, no payments'. The protocol still routes recruitment to the owner and keeps 'five to eight' participants without the decided source and thanks.
REQUIRED: Write the decision into §7.3 (2) (source: SettlementForge's community; five per round within §13.4's five-to-eight; thanks by credit and early access, no payments; J122) and mark §11 Q2 answered.
CLOSURE: conflict ruling V09-J122-1

### V09-J121-5 [standing_rule_conflicts; major]
J121/J122 answered all three: Q1 (preview host) — 'follows SettlementForge's staging (J121)'; Q2 (participants and thanks) — 'five SettlementForge users per round, recruited from its existing community; thanks by credit and early access, no payments' (J122); Q3 (public name) — 'follows SettlementForge (J121)'. V09 §11 still lists them as open with the old defaults (a free static host from AP2; unpaid invitations with a US$20-25 fallback; keep 'PLAT'), and the opening sentence 'until the owner an
REQUIRED: Mark Q1 and Q3 'follows SettlementForge (J121)' and Q2 'decided (J122): …'; drop the stale defaults; have §7.3 and the AP2 build step read SettlementForge's staging host and community as inputs.
CLOSURE: conflict ruling V09-J121-5

### V09-EDGE-1 [undefined_edges; major]
J-VI.4 (f) (docs/volumes/_integrate.md) bends a raised course that would cut a sky access's column or rope line, where skyAccessObstacles offers no re-route, to end at the last ground vertex before it ('this would cut {island}'s hoist; it ends here'). V09 — which carries every bend row (T-V9-15 fails CI on a code with no row) and words J-VI.4 (d), (e), (g), (h) — has no catalogue row, no rule text in §4.20.2 and no clause in T-V9-52 for case (f): a combination edge (a raised way under an island'
REQUIRED: Add bend.raised.skyAccess ('This would cut {island}'s hoist; it ends here.', Show me why) to §4.9, the case to §4.20.2 (6), and a T-V9-52 clause on a fixture with a hoist across the stroke.
CLOSURE: edge catalogue (EI-V09-EDGE-1)

### V09-WGAP-1 [wiring_gaps; minor]
Item 113 (e) adds a LOST state for a void whose every open link closed ('remembered as once known, drawn faded like an unexcavated void, until it is refound'), homed in V04; V09's panels, the Show hidden caves and ruins toggle, the legend and the 'How people get down here' section know only unexcavated / sealed voids, so the new state has no named consumer on screen (who sees a lost void at which tier, its panel line, its legend entry).
REQUIRED: Name V09's consumer of the LOST state (legend line, panel line 'Once known; its way in closed in {year}', tier rule) when V04 writes item 113 (e); canon routes the part.
CLOSURE: wiring routing (V09-WGAP-1)

### V09-WGAP-2 [wiring_gaps; major]
The notes 'supersede any sentence of this volume that reads otherwise' but their content is absent from the body (each appears once, in the note): T9's tier shape chip, skirt and solid chips, shrine-inset handle, tier-0 centre and radius handles (no toolkit row, HandleSet kind or binding row); the FM building look and the fantasyShapes control; a ruin monument's count control (setAttr monument/count); the tables editor's evidence.json inspector and the historical packs in the presets dialog; Geo
REQUIRED: Fold each note into its body home at build depth (toolkit rows, HandleSet kinds, binding rows, panel lines, BCR-V9-31 (a)) and resolve the two contradictions by the note (J-VI.17 is the integrator's ruling); then drop the notes.
CLOSURE: wiring routing (V09-WGAP-2)

### V09-MISSING-1 [missing_parts; major]
Item 111 names V09 for 'the tool' (and V10 for the explanations): T2 ground gains the oasis — 'the user adds or removes one with T2 ground (the lake's point-and-level form with a spring flag)' — and the arid water pull shows in the why answers. V09 has no oasis or spring-flag mode, parameter, mapper row, binding row, history template, bend/why wording or test (grep: 'oasis' 0 hits; 'spring' only as an aqueduct source).
REQUIRED: Write V09's part at build depth: T2 Lake mode's spring flag (ToolParamRow, mapper drawWater {kind 'lake', from {points, levelCm}, spring: true}), binding row, history template ('Made an oasis at {place}'), badge line, why-card driver row for the water term, first-use hint, T-V9 bar; cite item 111 (a)/(b).
CLOSURE: FIX at the unit

### V09-MISSING-2 [missing_parts; major]
Item 112 names V09 for 'the view settings, the trial's running': (a) every style and thematic view that encodes meaning in colour gets a second cue and a checked variant for the three common colour deficiencies, selectable in the view settings; (b) a game-master trial (ten to twenty SettlementForge game masters, at least two sessions of play, before public release; thanks by credit and early access, no payments). V09 has no deficiency-variant selector in Settings or the Show menu / Dress panel, 
REQUIRED: Add the view setting (a Dress/Settings chip: 'Colour vision: usual · red-weak · green-weak · blue-weak', a view key), the second cue per V09 thematic view, and a §7 protocol section for the pre-release GM trial (recruitment from SettlementForge's community, sessions, record to V12, release-gate bar); cite item 112 and J122.
CLOSURE: FIX at the unit

### V09-MISSING-3 [missing_parts; major]
Item 113 names V09 for 'the history option in the editor': a blueprint history option ('once a city, now a village') for standalone towns, the replay recorded for the clerk's story, and item 113 (e)'s LOST voids. V09's T1 Kind of place sheet, the advanced panel and the history/time card screens carry no history option (no chip, parameter, mapper row, badge line or bar); grep 'once a city', 'peakTier', 'history option': 0 hits.
REQUIRED: Write V09's part: T1 sheet chip 'History: none · once larger ({tier})' → adjust of the S0 history option, its whole-town ghost wording, the report panel's 'What its past left' lines, the effective-peak 'symbolic' chip on facts, and a T-V9 bar (history-first town edits and replays byte-identically); cite item 113 (a), (f).
CLOSURE: FIX at the unit

### V09-TERM-1 [terminology; minor]
Volume citation forms are mixed inside one volume: 'V9 §x' for itself, 'V1-4.2' / 'V1-3.8' for V01, 'V2 §4.1', 'V03 §4.5', 'V4 §3.5', 'V04 §1b', 'V05 §4.2', 'V6 §5.1', 'V06 §2.2', 'V07 §4.2', 'V08 §5.1', 'V10 §2.13', 'V11 §4.2'; principle (1) prescribes one form ('see V04 §3.2').
REQUIRED: Canon: one citation form for volume sections across the set (Vnn §x.y); rewrite every V9/V1-/V2/V4/V6 form.
CLOSURE: glossary (retired synonyms) / ID rulings

### V09-TERM-2 [terminology; minor]
The underground bars carry milestone 'M6' ('M6 (with V04's U3b)', 'M6'); file f rule R-d (J-VI.22) rules that 'M6' is volume 2's stage 3 (M6a-M6c) and the underground layer's milestone is M6-U (V04 BCR-13). T-V9-65 already writes 'M6-U'. The bars' milestones disagree with the combined build plan and with V9 §8 wherever it follows R-d.
REQUIRED: Replace 'M6' by 'M6-U' in T-V9-33 … T-V9-38 (and any §8 row that places them).
CLOSURE: glossary (retired synonyms) / ID rulings

### V09-TERM-3 [terminology; minor]
The combined build plan (docs/volumes/INDEX.md lines 96, 118, 151; J122's recorded order '… then M6-sky') names the sky layer's milestone M6-sky; V09 names it only by V05's phase id P4, so the AP7 row does not resolve against §16/INDEX's milestone ids.
REQUIRED: Name AP7's milestone 'M6-sky (with V05's P4)'.
CLOSURE: glossary (retired synonyms) / ID rulings

### V09-TERM-4 [terminology; minor]
Several concepts carry more than one name inside the volume (principle (2)): the scoped regenerate is 'Try again' (the button), 'New random' (the base's action, mode newRandom), 're-roll' / 'scoped re-roll' and 'Rebuild … as generated' (history); a removal of generated content that holds is the 'suppression' (detail.suppress), 'the removal holds' (info.remove.holds), 'kept removed' (skeleton import) and 'Removals that hold' (file f item 260); the whole-town re-derivation is 'Re-derive' and 'Rebu
REQUIRED: Canon glossary: one concept name each (e.g. 'scoped re-roll' = §7.1 New random; 'suppressing removal'; 'Re-derive'), UI words kept only as catalogue rows.
CLOSURE: glossary (retired synonyms) / ID rulings

### V09-DEFER-1 [deferral_wording; minor]
'The pre-decided fallback, if the coherence pass declines it: the fort stands on the bridgehead plot …' is a conditional left open for this pass; file f item 246 consolidates BCR-V9-30 (the deck plot's landmark slot, incl. the bridge mid-span), so the condition is decided and the fallback wording is dead text (principle (6) deferral wording).
REQUIRED: Drop the fallback sentence; cite file f item 246 / the base's deck-plot home for the mid-span slot.
CLOSURE: FIX at the unit

### V09-DEFER-2 [deferral_wording; minor]
Open items carried past the volumes pass for V09: seam-surfaces-r6 SR6-02 (effect lines on the clerk's card), SR6-03 (the indefinite-article argument form), SR6-06 (T-V9-15/T-V9-27's scope and SR6-01's drawer companion — the drawer drawing ProposalView.variations[].bends[].actions, lines[].actions and TurnView.refused, which §4.11 does not state) and content-calibration SCC-115 (three provenance notes not naming their confirming test), recorded as 'immaterial' in INDEX §7. The zero bar (FIX or I
REQUIRED: Fix each in the body: §4.11 draws the actions from bends[].actions and lines[].actions and TurnView.refused; the effect lines on the proposal card; the article form; T-V9-15/T-V9-27's scope; name the confirming test in each provenance note (§4.20's constants table).
CLOSURE: FIX at the unit

### V09-NARR-1 [narration; minor]
Thirteen stacked 'PENDING FABLE REVIEW' banner lines (one per lane: V9-application, revise-V9 twice, reconcile-V09-r1..r6 and their continuations); principle (8) allows one marker line per volume, the close's.
REQUIRED: Replace by the close's single marker line.
CLOSURE: FIX at the unit

### V09-NARR-2 [narration; minor]
Two revision notes ('Revised in place against critique V09.md ... Decisions J-V9.33 on, requests BCR-V9-20 on ...', 'second round ... J-V9.58 on, BCR-V9-26 on, XV-V9-10 on, T-V9-51 on') and three PROGRESS / revision ledgers (about 70 lines) narrate how the text evolved (principle (5)); the validation records (critique/V09.md, seam-surfaces-*.md, lane-events.log) keep it.
REQUIRED: Remove; keep only the conventions paragraph without the pass history.
CLOSURE: FIX at the unit

### V09-NARR-3 [narration; minor]
Seam and critique ids are woven into normative sentences throughout the volume (SS-06, SS-16, SR-08, SR2-23, SR3-02, SR4-05 (b), SR5-07 (c), XV-V9-29, V9C-53 …) as the provenance of a clause ('its historyLines from host.state … (SR2-23)'); principle (5) removes narration of how the text evolved — the validation records (seam-surfaces-r*.md, critique/V09.md) keep it.
REQUIRED: Strip review-round ids from normative text; keep J-, D-, BCR- and T- ids that are design ids.
CLOSURE: FIX at the unit

### V09-NARR-4 [narration; minor]
The key column carries the rename history ('formerly …'), narration of how the text evolved (principle (5)).
REQUIRED: Drop '(formerly …)'.
CLOSURE: FIX at the unit

### V09-NARR-5 [narration; minor]
Critique finding ids (V9C-53 … V9C-81, V1C-85, C4-110-1, C4-110-6, C6-40 (2), V3C-73 (3), V3C-76 (3), C10-50 (4), C10-53, CVR-V10-7) are used as design references and in headings ('#### 4.20.1 … (item 110 (a); V9C-53)'); 'J-V9.76 withdrawn' and 'Withdrawn by J-VI.4 (integration, 2026-09-29)' narrate history. Critique ids are validation records, not design homes (principle (5)); where a critique id stands for a design fact (C4-110-1's span rule, C4-110-6's buried stretches) the owning volume's se
REQUIRED: Replace each critique id used as a reference by the owning section (V04 §x for the span rule and arch vaults, V06 §2.13 for the cap, V03 §x for plan effects); drop critique ids from headings.
CLOSURE: FIX at the unit

### V09-NARR-6 [narration; minor]
The decision rows narrate their history: withdrawn rows keep their full 'Former text' (J-V9.67, J-V9.76), 'withdrawn by the revision (V9C-03)' (J-V9.2, J-V9.25), amendment chains ('amended by J-V9.34', 'amended by J-V9.67 (withdrawn by J-VI.4; SS-32): … — no longer'), every row ends with its critique or seam id, J-V9.117 is a decision about marking hand-off rows 'Met' (a document-status note, not a design choice) and J-V9.125 opens '*Finalization (seam-settlements-r6 SR6-03).*'. Principle (5): t
REQUIRED: Keep each id (unique, stable) with its current decision only: withdrawn rows reduced to 'Withdrawn (see J-VI.4).', amendment chains folded into the current text, critique/seam ids and J-V9.117's status note moved out.
CLOSURE: FIX at the unit

### V09-NARR-7 [narration; minor]
After its two core paragraphs, §12 narrates each review round ('The revision (revise-V9)', 'The second round', 'Reconciliation round 1' … 'round 6', each continuation) with what was read, md5s, landed times and which PLAUSIBLE clauses 'moved to CONFIRMED'; this is how the text evolved (principle (5)), and it restates hand-off statuses that §10.2 carries. The CONFIRMED/PLAUSIBLE facts that remain true fit in the two core paragraphs.
REQUIRED: Fold the still-PLAUSIBLE constants and budgets into the core PLAUSIBLE paragraph; drop the per-round narration (the validation records keep it).
CLOSURE: FIX at the unit

### V09-NARR-8 [narration; minor]
The fix list narrates each round's disposition ('none is ruled invalid and none is deferred, so the list still holds no item'), and the appended sections are change logs of the review rounds (tables of seam ids and 'what changed', 'Other sides', md5s and landing times) — principle (5) narration, the largest removable block in the volume (together with §12's round paragraphs and the header ledgers).
REQUIRED: Remove after folding the notes' normative residue into the body (see the wiring finding on the integration notes); §13 becomes empty or one sentence.
CLOSURE: FIX at the unit

### V09-BREF-1 [broken_references; minor]
Bare request ids 'BCR-34' and 'BCR-14' (and '(V04's BCR-34)' in one row) are unqualified; V04 numbers its requests BCR-n, and file f records 'V04 BCR-34 — carried in V04 BCR-14's DR17 cell; a pointer, no text of its own' (not an item). The DR19/DR24/DR9/DR10/DR17 derivation rows are the base's §7.7 table, which the rows should cite directly.
REQUIRED: Cite the derivation rows by their §7.7 ids and V04 BCR-14 (file f item) — drop the pointer 'BCR-34'.
CLOSURE: FIX at the unit

### V09-BREF-2 [broken_references; minor]
'V1C-09's opening place' cites a critique finding id (critique-V01's V1C-09) as the home of a design fact; the opening place is defined in V01 §3.5.12 / its Openings paragraph (V01 line 1573). A critique id is a validation record, not a design section (principle (5)).
REQUIRED: Cite V01 §3.5.12 (the catacomb's opening place) instead of V1C-09.
CLOSURE: FIX at the unit

### V09-BREF-3 [broken_references; major]
The volume's convention says 'a section sign (§) points into the base', but lists continue a volume citation with bare signs ('V08 §5.1, §4.4, §3.1', 'V03 §4.5, §4.1', 'V9 §4.11, §3.12, §5.10, §5.12'). A census of the body finds 131 such list continuations: 125 of them name an existing base section, so under the stated convention they resolve to the wrong target (e.g. 'V08 §5.1, §4.4' reads as base §4.4), and 6 name none; a further 23 unprefixed references name no base section at all (e.g. '§1b'
REQUIRED: Write the volume prefix on every section number (one form, e.g. 'V09 §x'), or state the list rule once in the canon and have the reference checker apply it; fix the 154 references.
CLOSURE: FIX at the unit

### V09-HANDOFF-1 [handoffs_to_canon; minor]
Four hand-offs remain unclosed at their destinations: XV-V9-3 — V04 line 475 still lists showUnexcavated under setLayer at T12 (rows 400 and 979 have it as the view key); XV-V9-16 (a) — V05 lines 409, 779, 2152 still read 'T9's delete'; XV-V9-25 — V05 states the rim bend (line 161 'moved just inside it') without the geometry V09 asks for (radial move to 1 m inside the setback line); XV-V9-31 — V11 registry row 87 (line 949) types every locale file as MsgRow, where V09 §2.9 types non-English file
REQUIRED: Close each at its destination (V04 row 475; V05 §1b/§2.1/§4.2 rows; V5 §3.22 (4) geometry; V11 row 87) or rule the disagreement; then mark them Met in V9 §10.2.
CLOSURE: FIX at the unit

### V09-HANDOFF-2 [handoffs_to_canon; minor]
These requests are met at their destinations (V04 line 3794 under/wayIn; V07 line 4206 showCircuit; V11 lines 688-689 retainingReachM, flatDepthM; V04 line 404 archVault; V03 line 403 basement/crypt/ring) but V9 §10.2 still states them as open requests, so the table no longer tells which hand-offs are closed (principle (10)).
REQUIRED: Mark them Met with their destination sections (and drop the 'Was:' narration that the Met rows carry).
CLOSURE: FIX at the unit

### VOL-V09-V10-EQUIVALENCES-001 [equivalences; None]
V10-ELEG-2
REQUIRED: 
CLOSURE: glossary (retired synonyms) / ID rulings

### VOL-V09-V10-EQUIVALENCES-002 [equivalences; None]
V10-ELEG-1
REQUIRED: 
CLOSURE: glossary (retired synonyms) / ID rulings

### VOL-V09-V10-EQUIVALENCES-003 [equivalences; None]
V09-TERM-4
REQUIRED: 
CLOSURE: glossary (retired synonyms) / ID rulings

### VOL-V09-V10-EQUIVALENCES-004 [equivalences; None]
V09-TERM-4
REQUIRED: 
CLOSURE: glossary (retired synonyms) / ID rulings

### VOL-V09-V10-EQUIVALENCES-005 [equivalences; None]
V09-TERM-4
REQUIRED: 
CLOSURE: glossary (retired synonyms) / ID rulings

### VOL-V09-V10-EQUIVALENCES-006 [equivalences; None]
V09-DUP-1
REQUIRED: 
CLOSURE: glossary (retired synonyms) / ID rulings

### VOL-V09-V10-EQUIVALENCES-007 [equivalences; None]
V10-XAGREE-3
REQUIRED: 
CLOSURE: glossary (retired synonyms) / ID rulings

### VOL-V09-V10-EQUIVALENCES-008 [equivalences; None]
V10-XAGREE-2
REQUIRED: 
CLOSURE: glossary (retired synonyms) / ID rulings

### VOL-V09-V10-EQUIVALENCES-009 [equivalences; None]
V09-XAGREE-3
REQUIRED: 
CLOSURE: glossary (retired synonyms) / ID rulings

### VOL-V09-V10-EQUIVALENCES-010 [equivalences; None]
V09-TERM-2, V09-TERM-3
REQUIRED: 
CLOSURE: glossary (retired synonyms) / ID rulings

### VOL-V09-V10-EQUIVALENCES-011 [equivalences; None]
ruled, not a defect
REQUIRED: 
CLOSURE: glossary (retired synonyms) / ID rulings

### SR6-02 [seam-r6-open (INDEX §7 fix list); minor]
docs/volumes/critique/seam-surfaces-r6.md SR6-02
REQUIRED: The clerk card's effect lines draw Show only (J-SS6.4); V09 §4.11 states it.
CLOSURE: FIX at the unit

### SR6-03 [seam-r6-open (INDEX §7 fix list); minor]
docs/volumes/critique/seam-surfaces-r6.md SR6-03
REQUIRED: V09 §2.9's argument forms gain the one English indefinite form {a <slot>} (J-SS6.3); V08's templates carry no article (SR6-07 closed).
CLOSURE: FIX at the unit

### SR6-06 [seam-r6-open (INDEX §7 fix list); minor]
docs/volumes/critique/seam-surfaces-r6.md SR6-06
REQUIRED: T-V9-15's and T-V9-27's scope and SR6-01's drawer companion as the seam states them.
CLOSURE: FIX at the unit

### SCC-115 [seam-r6-open (INDEX §7 fix list); minor]
docs/volumes/critique/seam-content-calibration-r6.md SCC-115
REQUIRED: The three provenance notes name their confirming test (V12 §3.11's rule for calibrate-later application constants).
CLOSURE: FIX at the unit

### V09:IN-V09-1 [integration-note; minor]
* **IN-V09-1 (J-VI.1, clean-room).** The handle kind is renamed `'towerResize'` (one line); its former name coincided with a reference export field and is not repeated here (reworded by the continuation, J-VI.23).
REQUIRED: fold the note into the body at its home, then drop the note (S9, ID-WX)
CLOSURE: FIX at the unit

### V09:IN-V09-2 [integration-note; minor]
* **IN-V09-2 (J-VI.4; item 101 R2).** The "added refusal class" is withdrawn: J-V9.67 is marked withdrawn, §4.9's sentence and §4.20.5 (4) were edited in place, T-V9-13's list reads the `bend.*` keys. The rows `refuse.raised.island`, `refuse.aqueduct.island`, `refuse.raised.onIsland`, `refuse.aquedu
REQUIRED: fold the note into the body at its home, then drop the note (S9, ID-WX)
CLOSURE: FIX at the unit

### V09:IN-V09-3 [integration-note; minor]
* **IN-V09-3 (J-VI.2, J-VI.3).** The raised-way reason words are `drop`, `link`, `water` (and `declared`); the preview's closure-arc barrier kinds are `shore`, `cliff`, `gorge`, `marsh`, `sheer`, `enceinte` (edited in place).
REQUIRED: fold the note into the body at its home, then drop the note (S9, ID-WX)
CLOSURE: FIX at the unit

### V09:IN-V09-4 [integration-note; minor]
* **IN-V09-4 (J-VI.5; volume 2's X21).** T9's tier controls also carry, from volume 2's second revision: the **shape** chip (V02's tier-0 shapes), the **skirt** and **solid** chips (a tier's skirt and its solid form), a **shrine-inset handle** on the top tier, the **centre and radius handles** on a 
REQUIRED: fold the note into the body at its home, then drop the note (S9, ID-WX)
CLOSURE: FIX at the unit

### V09:IN-V09-5 [integration-note; minor]
* **IN-V09-5 (J-VI.17 H5; volume 2's X10).** The style panel offers the `FM` building look; the tool rows for `setComposition room`, the secondary porch and `moveTower { shape }` exist on T9 `shape`; the advanced panel carries the `fantasyShapes` control (V2 §4.4–§4.5, BCR-V2-30).
REQUIRED: fold the note into the body at its home, then drop the note (S9, ID-WX)
CLOSURE: FIX at the unit

### V09:IN-V09-6 [integration-note; minor]
* **IN-V09-6 (J-VI.17 H23; volume 4).** T9 `shape` shows a raised way's span `use` (open or vault, a held `setAttr`) and a ruin monument's count (`setAttr` on `monument/count`).
REQUIRED: fold the note into the body at its home, then drop the note (S9, ID-WX)
CLOSURE: FIX at the unit

### V09:IN-V09-7 [integration-note; minor]
* **IN-V09-7 (J-VI.17 H24; X-V12-6, X-V12-8).** The tables editor's cell inspector reads `dist/evidence.json` — the status in plain words ("the owner's rule" for a stamped cell) and the evidence lines; the preset dialog lists the adopted historical packs as "historical (<era>, <region>)", offered on
REQUIRED: fold the note into the body at its home, then drop the note (S9, ID-WX)
CLOSURE: FIX at the unit

### V09:IN-V09-8 [integration-note; minor]
* **IN-V09-8 (J-VI.8; applied in place by reconciliation round 2, SR-15).** `deck.landmarkMinSpanM` names volume 11's cell `deck.landmarks/bridgeMid/minSpanM` (40 m); it is not a constant of this volume.
REQUIRED: fold the note into the body at its home, then drop the note (S9, ID-WX)
CLOSURE: FIX at the unit

### V09:IN-V09-9 [integration-note; minor]
* **IN-V09-9 (J-VI.17).** `ClerkHandle.send`'s entries are volume 10's five (`help` added in place).
REQUIRED: fold the note into the body at its home, then drop the note (S9, ID-WX)
CLOSURE: FIX at the unit

### V09:IN-V09-10 [integration-note; minor]
* **IN-V09-10 (J-VI.14).** The delete row's "kept removed" line for a raised way, an island, an access, a harbour chain or a quay wall reads the one suppression mechanism (file f).
REQUIRED: fold the note into the body at its home, then drop the note (S9, ID-WX)
CLOSURE: FIX at the unit

### V09:IN-V09-11 [integration-note; minor]
* **IN-V09-11 (J-VI.18).** BCR-V9-31 (a)'s GeoJSON names follow file f item 447's one text for both variants: each support a Polygon of kind `raisedSupport` (with `key` and `state`), a retaining wall of kind `retaining` (edited in place), plus volume 12's `raisedKind`, `source`, `stair`/`ramp` flags
REQUIRED: fold the note into the body at its home, then drop the note (S9, ID-WX)
CLOSURE: FIX at the unit

### V09:IN-V09-12 [integration-note; minor]
* **IN-V09-12 (J-VI.22).** AP6 and XV-V9-8 name volume 4's milestone **M6-U** (edited in place); "M6c" stays volume 2's.
REQUIRED: fold the note into the body at its home, then drop the note (S9, ID-WX)
CLOSURE: FIX at the unit

### V09:IN-V09-13 [integration-note; minor]
* **IN-V09-13 (J-VI.23, clean-room).** IN-V09-1 no longer names the retired handle kind (its former name coincided with a reference export field). No meaning changed.
REQUIRED: fold the note into the body at its home, then drop the note (S9, ID-WX)
CLOSURE: FIX at the unit

### V09:IN-V09-14 [integration-note; minor]
* **IN-V09-14 (J-VI.27).** The **Deck height** and **Arch spacing** steppers (§4.20) edit file f item 244's held fields `clearanceCm` and `spanSpacingCm`; item 244's support step and the course solver read them, so an edit re-lays the piers and re-derives the spans in the same commit (BCR-V9-33's be
REQUIRED: fold the note into the body at its home, then drop the note (S9, ID-WX)
CLOSURE: FIX at the unit

### V09:IN-V09-15 [integration-note; minor]
* **IN-V09-15 (J-VI.4 applied in the text).** BCR-V9-26 (b)'s last sentence read that a raised stroke ending on an island's rim or lying on its key "is refused with volume 5's refusal and its offer"; it now reads that it is bent as J-VI.4 (d) and (e) state, as file f item 362's note already applies 
REQUIRED: fold the note into the body at its home, then drop the note (S9, ID-WX)
CLOSURE: FIX at the unit

### V09:IN-V09-16 [integration-note; minor]
* **IN-V09-16 (J-VI.30, item 101 R2).** The message rows `refuse.noSite`, `refuse.overBudget` and `refuse.vacateFirst` are now `bend.place.noSite`, `bend.place.overBudget` and `bend.vacate`: a user's placement that no plot here fits, one over its disruption budget, and a join or split that removes a
REQUIRED: fold the note into the body at its home, then drop the note (S9, ID-WX)
CLOSURE: FIX at the unit
