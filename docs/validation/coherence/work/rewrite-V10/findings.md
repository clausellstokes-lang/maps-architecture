### VOL-V09-V10-RESTATEMENTS-018 [restatements; None]
the same ladder glossed a third time in V10 §2.12 ShapeInput.siting.weights
REQUIRED: state it once at V09 §2.6; every other place cites it
CLOSURE: FIX at the unit

### VOL-V09-V10-RESTATEMENTS-019 [restatements; None]
New decoration group restated in the V10 §4.1 T12 encoder row
REQUIRED: state it once at V09 §4.5 T12; every other place cites it
CLOSURE: FIX at the unit

### VOL-V09-V10-RESTATEMENTS-020 [restatements; None]
thorp 40, hamlet 200, village 700 typical populations in the default lexicon
REQUIRED: state it once at V07 §2.1 rung table; every other place cites it
CLOSURE: FIX at the unit

### VOL-V09-V10-RESTATEMENTS-021 [restatements; None]
the catacomb rank cap 0.9 in the clerk catacomb row
REQUIRED: state it once at V04 CatacombRule rankCap / V11 table (R-c); every other place cites it
CLOSURE: FIX at the unit

### V10-RESTATE-1 [restatement_findings; minor]
The rows restate V07's typical populations with their numbers ('40 (V07 §2.1's THORP typical)', '200 (V07's HAMLET typical)', '700 (V07's VILLAGE typical)'); a change to V07's rung table would leave the lexicon stale.
REQUIRED: Cite V07 §2.1's typical value by rung (a row value 'the rung's typical population'), no number.
CLOSURE: FIX at the unit

### V10-RESTATE-2 [restatement_findings; minor]
The rank cap's value (0.9) is restated in the clerk's row; the value is V04's CatacombRule rankCap (V04 line 844/858), which rule R-c places in V11's table.
REQUIRED: Name the cap (rankCap) without the number.
CLOSURE: FIX at the unit

### V10-XAGREE-1 [cross_part_conflicts; major]
V10's link op 'avoid' is written as conditional on V11 carrying the cell, and V11 §4.2 does not carry it (cells {bindTo?, cut?}; see the V09/V11 table-shape finding). The clerk's encoder and the canvas's 'Cut this link' (V09 §4.7) therefore write a cell whose home does not declare it; the condition is left open in normative text.
REQUIRED: Once V11 §4.2 rules the linkEdits cells (avoid added), drop the condition in V10 §2.12 and cite V11 §4.2.
CLOSURE: conflict ruling V10-XAGREE-1

### V10-XAGREE-2 [cross_part_conflicts; major]
WhyPull.family is typed WhyFamily (V11's eight plus nine score terms), but V01's providers emit WhyPulls of families SUNLIGHT, EMITS, SENSITIVE; V10 keeps a translation note ('they read as sun, nuisance and nuisance') and asks V01 to change (CVR-V10-6), which V01 has not done. A value outside the declared enum crosses the seam, and the mapping lives at the consumer instead of the producer.
REQUIRED: V01 names its pushes by V11's family ids (sun, nuisance) as CVR-V10-6 asks; V10 drops the shim note; mark CVR-V10-6 met.
CLOSURE: conflict ruling V10-XAGREE-2

### V10-XAGREE-3 [cross_part_conflicts; minor]
The same size words map to different populations on the two surfaces: the clerk's lexicon fixes 'small town' 2 500, 'town' 5 000, 'large town' 8 000, 'small city' 12 000, 'city' 20 000, 'large city' 28 000, 'metropolis' 50 000, while V09's seven size chips with the same words read population quantiles of the rungs' bands from the rung table (TOWN band's 25th, 50th, 85th percentiles; CITY's; METROPOLIS's median). 'A town' asked in words and picked as a chip can give different recipes; one concept
REQUIRED: One rule for the size words (the chips' quantile rule read from the rung table) serving the chips and the lexicon; the lexicon rows name the quantile, not a number.
CLOSURE: conflict ruling V10-XAGREE-3

### V10-XAGREE-4 [cross_part_conflicts; major]
Three texts disagree on a church on wet ground: V10's crypt section words it 'no crypt: ledger slabs in the chancel floor'; V09 §4.17.5 says 'V03's wet-ground fold reads "floor vaults (wet ground)"' as a crypt form on the church's Below line; V03 has no floor-vault crypt (J-V3.44: 'flush ledger slabs … in a church without a crypt over a floor-vault "crypt"') and lifts an always-crypt on wet ground to a raised-choir crypt (line 140). The panel and the clerk would say different things for one row,
REQUIRED: Rule at V03 §3.7.4 (the crypt's owner): wet ground gives a raised-choir crypt for an always class and no crypt with ledger slabs otherwise; V10 §3.9a words both; V09 §4.17.5 cites the rows (dropping 'floor vaults').
CLOSURE: conflict ruling V10-XAGREE-4

### V10-J121-1 [standing_rule_conflicts; major]
The plain words fix the provider and key path ('runs on Claude, Anthropic's model … you paste your own Anthropic API key … or the program that embeds the map … provides the connection, or uses its own assistant instead'); J121/J122 decided V10 Q1 (key or relay: follows SettlementForge's AI setup), Q2 (SettlementForge's assistant, driving our tool API) and Q3 (model tier follows SettlementForge; evaluate a cheaper tier before any switch). The SettlementForge module's case is SettlementForge's ass
REQUIRED: Reword: in the SettlementForge module the assistant, its AI setup and model tier are SettlementForge's (J121/J122) and drive the map's tool API through the host seam; the built-in clerk with a user's key is the standalone case; cite J121/J122.
CLOSURE: conflict ruling V10-J121-1

### V10-J121-2 [standing_rule_conflicts; major]
J121 answered the relay question (V10 Q1: follows SettlementForge's AI setup) and J122 chose SettlementForge's assistant driving our tool API (V10 Q2) for the SettlementForge module, i.e. configuration C there; the volume still leaves the relay 'the owner's (section 11 Q1)', lists A/B/C as a per-deployment choice without naming SettlementForge's decided configuration, and the data notice names the provider as a design constant.
REQUIRED: State SettlementForge's configuration as the one its AI setup decides (J121; J122: C, SettlementForge's assistant through the host seam), keep A and B for the standalone product and generic hosts, and word the notice with the provider read from the deployment's setup; mark Q1 answered.
CLOSURE: conflict ruling V10-J121-2

### V10-J121-3 [standing_rule_conflicts; major]
J121/J122 answered all five (docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md): Q1 key or relay — follows SettlementForge's AI setup (J121); Q2 — SettlementForge's assistant, driving our tool API (J121); Q3 model tier — follows SettlementForge (J121), evaluate a cheaper tier before any switch; Q4 — the built-in clerk as M3c beside M3b (yes); Q5 — the live-evaluation spend approved as a budget cap (about US$790-1 190 through M3c) spent in stages, the smallest tier first, the full suite only at M3c's 
REQUIRED: Mark each answered with its ruling (J121 / J122) and write the decided staging of the evaluation spend into §7.3's schedule; drop the recommendation text.
CLOSURE: conflict ruling V10-J121-3

### V10-ELEG-1 [elegance_candidates; minor]
Two catalogue sentences exist for the clerk being unreachable: refuse.clerk.offline 'The assistant is offline; every tool still works.' (the turn's refusal, V10 §3.16, used by V9 §3.14's clerk row) and error.clerkOffline 'The assistant isn't available right now. Everything else works.' ('a clerk error turn'). V9 §3.14 routes an unreachable clerk to refuse.clerk.offline, leaving no named producer that emits error.clerkOffline's code; one condition, two words.
REQUIRED: Rule one row (refuse.clerk.offline) for both, or state the distinct code that error.clerkOffline renders and its producer; if none, retire it (equivalence: same condition, same user outcome).
CLOSURE: elegance ruling (E-list)

### V10-ELEG-2 [elegance_candidates; minor]
'type ClerkHarness = ClerkHandle' is an alias with no member of its own (J-V10.57 superseded, XV-V9-18): one interface carries two names across the pair (ClerkHandle 25 times in V09 and 22 in V10; ClerkHarness 13 times in V10, once in V09). Principle (2): one term per concept; the alias adds a name and a rule to remember and no behaviour.
REQUIRED: Use ClerkHandle everywhere and drop the alias (the implementation is 'createClerk(mount)', which already names the construction).
CLOSURE: elegance ruling (E-list)

### V10-EDGE-1 [undefined_edges; major]
V10 says that when a creation proposal replaces the untouched empty-state town 'the old handle closes — nothing is lost, the old town being its seed and still in the recent documents (R15)', and V09 §4.11 says 'the old one stays in Recent towns'; but V09 §3.2 (3) writes nothing to the local store while the log holds only its creation prefix (the LocalDocRecord is created on the first committed event), and the Recent grid (§5.13) lists stored towns. The edge 'accept an assistant's new town while 
REQUIRED: Rule the edge once: either the replaced empty-state town is written to Recent (a recipe-only record: seed and recipe, no snapshot) or it is dropped as V09 §3.2 drops it on Surprise me; make V09 §3.2, §4.11 and V10 §4.2 (3) say the same, with a bar.
CLOSURE: edge catalogue (EI-V10-EDGE-1)

### V10-WGAP-1 [wiring_gaps; minor]
Three encoder constants live outside clerk.content, the table that holds every other encoder constant: the islet's default sizeM2 2 000 m² ('our own, calibrate-later'), the fill scope ring's 32-gon, and the green's 24-gon written as a number although encoders.ringSides (default 24) is declared as 'the n-gon of a ring anchor, an islet and a green'. An unregistered constant has no provenance cell or calibration route; the green's hard-coded 24 would not follow a change of ringSides.
REQUIRED: Add islet sizeM2 and the scope ring's sides to clerk.content.encoders (with provenance), and have the green read encoders.ringSides.
CLOSURE: wiring routing (V10-WGAP-1)

### V10-MISSING-1 [missing_parts; major]
Item 111 names V10 for 'the explanations': the oasis (a spring-fed pond with its grove and irrigated gardens, from a dossier's oasis_water or the arid row's chance, or T2's spring flag), the arid WATER PULL on growth and the prosperity field's water term ('the wealthy hold the land nearest the water'), wells placed by yield, and (c)'s climate cell turning item 102's sunlight term to zero or toward shade in hot arid rows. V10 has no oasis explanation (default provider row or section), no words fo
REQUIRED: Write V10's part at build depth: the lexicon rows (oasis, desert, arid), the ground encoder's spring flag on op 'lake', the prosperity provider's water term words and the sun term's arid reading, an oasis fact with its DR row when dossier-bound, an eval case and a T-V10 bar; cite item 111 (a)-(c).
CLOSURE: FIX at the unit

### V10-MISSING-2 [missing_parts; major]
Item 113 names V10 for 'the story told': the history-first replay 'is recorded so the clerk can tell the story ("the walls were built when this was a city of twelve thousand")'; an effective peak is marked symbolic and the clerk says what it is ("the old walls show this was once a city; its exact size is not recorded"); buried former-settlement ruins and LOST voids (access lost when the last open link closes) need their explanations. V10 has no replay-story section or provider, no rule for stati
REQUIRED: Write V10's part: a history section (or V06's move section extended) reading the replay record, the symbolic-peak row and its words, the lost-void and former-settlement-ruin rows in the underground section, prompt rule 6's number rule applied to peak figures, eval cases and T-V10 bars; cite item 113 (a)-(f).
CLOSURE: FIX at the unit

### V10-TERM-1 [terminology; minor]
The volume's own convention (header: 'V0n §x another volume's') is not kept: V09 is cited as both 'V09 §' and 'V9 §', V06 as 'V06 §' and 'V6 §', V05 as 'V05 §' and 'V5 §', V04 as 'V04 §' and 'V4 §'; principle (1) wants one form across the set.
REQUIRED: Canon's one citation form (Vnn §x.y) everywhere.
CLOSURE: glossary (retired synonyms) / ID rulings

### V10-DEFER-1 [deferral_wording; minor]
Two design dependencies are carried as 'until it lands' conditionals; V11 already enumerates stepped_temple / terraced_palace / tiered_tower (9 hits), so CVR-V10-12's clause is stale, and CVR-V10-13 is open with a fallback. The zero bar admits no open conditional in normative text.
REQUIRED: Mark CVR-V10-12 met with V11's section; close or rule CVR-V10-13 (see the V01/V09/V10 ravine-quarter finding) and drop the conditional.
CLOSURE: FIX at the unit

### V10-DEFER-2 [deferral_wording; minor]
An open finding is carried on a fix list past the volumes pass: SR6-05 — 'the subject rule's wording against V9 §2.9, restated lists, two alternative keys, a status' (INDEX §7 calls it immaterial). The zero bar (FIX or INVALID) admits no carried item.
REQUIRED: Fix SR6-05 in the body (the subject rule cites V9 §2.9's Where a button is not drawn; the restated lists replaced by citations; the two alternative keys reconciled; the status line corrected) and drop the fix-list line.
CLOSURE: FIX at the unit

### V10-NARR-1 [narration; minor]
Eight stacked 'PENDING FABLE REVIEW' banners, two revision notes (critique counts, 'Decisions J-V10.38 on, tests T-V10-29 on …', 'Item-110 fold … step R5b') and nine PROGRESS / REVISION / RECONCILIATION ledgers (about 110 lines) narrate how the text evolved; principle (8) allows one marker line and principle (5) removes the narration (the validation records keep it).
REQUIRED: Replace by the close's single marker line; drop the ledgers and revision notes.
CLOSURE: FIX at the unit

### V10-NARR-2 [narration; minor]
Seam and critique ids are woven into normative sentences and table cells (SS-10, SR-07, SR2-08, SR2-14, SR4-03, SR5-06 (a), C10-65, C8-02, TR-25 …) as the provenance of a clause; principle (5) moves them to the validation records.
REQUIRED: Strip review-round ids from normative text; keep design ids (J-, D-, BCR-, CVR-, T-).
CLOSURE: FIX at the unit

### V10-NARR-3 [narration; minor]
Decision rows narrate their history: J-V10.34 and J-V10.57 are kept with their full superseded text; J-V10.28 records '(88 until reconciliation round 5 added the what-if case, SR4-03)'; J-V10.101's classes are 'superseded by J-V10.106' inside the row; J-V10.67 'revised by reconciliation round 3 (SR2-08)'; J-V10.110 opens '*Finalization (seam-surfaces-r6 SR6-01).*'; nearly every row ends with its critique or seam id (C10-nn, SS-nn, SRn-nn). Principle (5): the validation records keep the history; 
REQUIRED: Keep ids stable; reduce superseded rows to 'Superseded by J-V10.n'; fold amendments into the current text; move critique and seam ids to the validation records.
CLOSURE: FIX at the unit

### V10-NARR-4 [narration; minor]
Most of §12 narrates the review rounds ('Reconciliation round 1 … round 6', second briefs, 'V09's second round …') with md5s, landing times, reference counts and doc_checks deltas per round — how the text evolved (principle (5)); the validation records and lane log keep it.
REQUIRED: Keep one CONFIRMED paragraph of standing evidence and the PLAUSIBLE list; drop the per-round narration.
CLOSURE: FIX at the unit

### V10-NARR-5 [narration; minor]
The fix list narrates each round's disposition, and the appended sections are change logs of the review rounds (seam ids, 'what changed', 'Found in passing', md5s, landing times) — principle (5) narration. The integration notes' normative residue (IN-V10-2's reason words, IN-V10-3's tier facts, IN-V10-5's terrace stroke) is already in the body except IN-V10-3's 'words each bend of V2 §1b' (see the V02 bend-id agreement finding) and IN-V10-4's met statuses (see the CVR status finding).
REQUIRED: Fold any residue into the body; remove the round logs; §13 becomes one sentence.
CLOSURE: FIX at the unit

### V10-BREF-1 [broken_references; minor]
There is no clerk.json: V10 §2.10 declares two tables, clerk.ops and clerk.content, in files clerk/ops.json and clerk/content.json (J-V11.82).
REQUIRED: Read 'every constant a clerk.ops or clerk.content cell'.
CLOSURE: FIX at the unit

### V10-BREF-2 [broken_references; major]
Same class as V09: V10's convention says 'Section references without a prefix (§7.1, §11.2) are the base's', yet 71 list continuations after a volume citation name an existing base section, so they resolve to the wrong target under that convention (e.g. 'V09 §2.7, §2.9, §2.10, §3.9, §4.5' reads as base §2.9, §3.9, §4.5; 'V08 §3.1, §4.4, §5.4'; 'this volume's §1b, §2.6'), and 45 unprefixed references name no base section (40 in the body, e.g. the T-V10 table's '§2.6, §1b.2'; 5 in the ledgers).
REQUIRED: Prefix every section number with its volume, or apply one canon list rule; fix the 116 references.
CLOSURE: FIX at the unit

### V10-HANDOFF-1 [handoffs_to_canon; minor]
CVR-V10-13 is open (V01 names no terraced-ward kind; grep 0 hits), so V10's transcript rests on a fallback 'until V01 names it', while V09's canvas script for the same quarter uses V01's stepped fabric. The two authoring paths of one fixture (T101-6 requires them to agree in structure) describe the ravine quarter differently, and the conditional is left open.
REQUIRED: Rule the ravine quarter's declaration once (V01's stepped fabric on the residential kind, if that is V01's design) and have both V09 §7.2 and V10 §3.15 cite it; close CVR-V10-13.
CLOSURE: FIX at the unit

### V10-HANDOFF-2 [handoffs_to_canon; minor]
CVR-V10-6 (V01 names its pushes by V11's families) is open (V01 line 2693 still says SUNLIGHT, EMITS, SENSITIVE); CVR-V10-13 (V01's terraced-ward kind) is open; CVR-V10-14's V05 and V07 parts are 'open' by the table's own words although V05 carries 'raised clear of the aqueduct' (2 hits) and V07 carries belowCity/house-platform words (4 hits). Principle (10) requires every hand-off closed at its destination.
REQUIRED: Close CVR-V10-6 and -13 at V01 (or rule them), verify and mark CVR-V10-14's V05 and V07 parts.
CLOSURE: FIX at the unit

### V10-HANDOFF-3 [handoffs_to_canon; minor]
These requests appear met at their destinations (V04's catacombOutcome in IN-V04-8, V04's arch vault and terminal cistern rows, V03's section provider and room-cause keys, V06's locate and detail.why, V02's deck/landmarks path, V11's stepped_temple rows) but V10 §10.2 still lists them without a status, so the table does not say which hand-offs are closed.
REQUIRED: Verify each at its home and mark Met with its section (and move V04's catacombOutcome from an integration note into V04's body, a V04-lane point).
CLOSURE: FIX at the unit

### SR6-05 (surfaces) [seam-r6-open (INDEX §7 fix list); minor]
docs/volumes/critique/seam-surfaces-r6.md SR6-05 (surfaces)
REQUIRED: V10's subject-rule wording cites V09 §2.9; the restated lists become pointers; the two alternative keys reuse V09's button.openCopy and button.undo (J-SS6.7); the status line leaves.
CLOSURE: FIX at the unit

### V10:IN-V10-1 [integration-note; minor]
* **IN-V10-1 (J-VI.4).** Item 110's named refusals are bends (§3's paragraph edited in place): each the item's `bent` line, no refusal category (corrected by reconciliation round 1, SS-17: V10 §3.16), their alternatives as `propose` actions ("Draw a road to its foot" for `bend.raised.island`, V9 §4.
REQUIRED: fold the note into the body at its home, then drop the note (S9, ID-WX)
CLOSURE: FIX at the unit

### V10:IN-V10-2 [integration-note; minor]
* **IN-V10-2 (J-VI.2).** The report's `raised[].reason` reads `'drop'|'link'|'water'` (edited in place), the derived word of the record's `RaisedReasonKey`; absent for a declared way (`source: 'declared'`).
REQUIRED: fold the note into the body at its home, then drop the note (S9, ID-WX)
CLOSURE: FIX at the unit

### V10:IN-V10-3 [integration-note; minor]
* **IN-V10-3 (J-VI.5; volume 2's X22).** The `tiers` input admits `stairs: 'none'` (edited in place); the clerk reads the facts `massing/bend/<id>`, `stack.grade` and the derived aspect (V2 §4.6), and words each bend of V2 §1b.
REQUIRED: fold the note into the body at its home, then drop the note (S9, ID-WX)
CLOSURE: FIX at the unit

### V10:IN-V10-4 [integration-note; minor]
* **IN-V10-4 (J-VI.17).** CVR-V10-1, -2, -8 and -9 are met by volume 4's IN-V04-8, volume 3's IN-V03-1 and volume 2's
REQUIRED: fold the note into the body at its home, then drop the note (S9, ID-WX)
CLOSURE: FIX at the unit

### V10:IN-V02-3 [integration-note; minor]
IN-V02-3; CVR-V10-12's `query rule` reads volume 11's rows with their `says`.
REQUIRED: fold the note into the body at its home, then drop the note (S9, ID-WX)
CLOSURE: FIX at the unit

### V10:IN-V10-5 [integration-note; minor]
* **IN-V10-5 (J-VI.26).** The T2 `terrace` encoder's stroke now carries `falloff: 'cosine'` and `amount: 1`, as volume 9's T2 mapper sets them (V9 §4.20.1 (4)): §7.1's `FieldStroke` requires both, so the encoded event validates against its schema; `water: input.water ?? 'locked'`, as its `raise` row
REQUIRED: fold the note into the body at its home, then drop the note (S9, ID-WX)
CLOSURE: FIX at the unit
