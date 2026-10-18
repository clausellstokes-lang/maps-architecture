# Retrovalidation 2026-10-18 — lenses-verify (the verifier)

Lane: `retrovalidation/lenses-verify` (opus; J390, Fable-checked). Family "lenses": `research/sf/lens-implications.md`
(613 lines, carries the J375 notice). Host: `/home/user/clausellstokes-lang/settlement-engine`, `master` =
`origin/master` = `81f1cd963553f226b222714914ff34584e9911b8` (read from `.git/refs`; no git command run).

## Method

1. Read `research/sf/lens-implications.md` whole (1-613).
2. Verify every checkable claim at its primary source: every host `path:line` opened at 81f1cd96; every note citation
   (ALIGN, TRADE, POP, PROSP, PLAGUE, FAITH section/item) opened and read; every FILE-M item, J-row and FOLD line opened;
   every host and note line count recomputed; every quoted phrase searched for; every tag judged.
3. Findings recorded as found (WRONG / UNSUPPORTED / IMPRECISE), each with evidence and the exact fix. Design soundness is
   not judged (the Fable validator's).

## Progress (written as I go)

- 00:41 started; host revision confirmed; target read whole.
- 00:47 preamble, status table, preset facts, LWG, FOLD, J375–J384, host OBSERVED claims (rules, LWG, relationship drift,
  strength comparator, embattlement, distanceRead, cultureDistance, migrationKernel, rulingPowerSeat, smuggle,
  militaryStrength), FILE-M items 659–662, 683, 693, 694, 714, 737, 749 and ALIGN whole checked.
- 00:54 TRADE, POP, PROSP, PLAGUE (§1–§10) and FAITH (§1, §6, §8 birth caveat, §9) checked against every citation; V13 §8.5
  H13–H30 and FPPHYS/FPSIM lines checked; record complete (25 findings). LANDED.

## Findings (one row per claim that does not hold; written as found)

| # | Where | Claim | Verdict | Evidence (what the source actually says) | Fix |
|---|---|---|---|---|---|
| L1 | §2.4 row "Aggression band" (Audience); §4.5 "Public facts the host already shows" | the aggression chip "is public on cards once the live-world row opens [ALIGN §6 Display]"; listed among facts the host shows players | UNSUPPORTED | The note's own definition (§2): public = "the host shows it to players already". ALIGN §1 item 7: "Nobody sees the numbers. The DM sees consequences: an aggression chip on Library/Realm cards and in the premium PDF". ALIGN §6 Display names the cards and the PDF and no player surface; host `comp/settlements/livingWorldSignals.js:236-262` builds it for `SettlementCard` (the Library). No player surface is cited or traced | Audience cell: "DM (Library/Realm cards and the premium PDF, ALIGN §1 item 7, §6 Display; no player surface traced)"; drop "the aggression chip" from §4.5's public list |
| L2 | §1.2 item 5 | "a dozen alignment consumers run in lit presets [STATED … ALIGN §4.4 …]" | IMPRECISE | ALIGN §4.4 gives no count (it says the fold has no alignment row and "In RR, alignment is felt only through the non-FP consumers of §7"). ALIGN §7's table marks 28 of its 60 rows as running in RR (✓ or c: rows 1-3, 8-9, 12-14, 17-19, 33-40, 42-43, 52-53, 55-56, 58-60), several only with a seated deity or on canon; ALIGN §10 item 1: "About thirty modules import the selectors" | "the alignment consumers ALIGN §7 marks lit (28 of its 60 rows run in RR, some only with a deity or on canon)", citing ALIGN §4.4 and §7 |
| L3 | §1.2 item 5 | FOLD §2 "calls trade 'LIT —' and populations '—'" [OBSERVED FOLD:333-351] | IMPRECISE | FOLD §2's table (host `docs/DESIGN_FP_COHERENCE_FOLD.md:333-348`): the TRADE (TR) → EC row and the POPULATIONS (POP) row both carry "—" in the "LIT (preset count)" column (POP's with the gloss "(`demographicsEnabled` lit in NO preset: OD-FC-18)"); the string "LIT —" does not occur, and the two rows do not differ in kind | "shows '—' in its LIT column for both trade (TR → EC) and populations" |
| L4 | §2.1 row "Allegiances…" | "drift's vassal rebellion, which breaks a link [OBSERVED `wp/relationshipRulesCore.js:762-770`]" | IMPRECISE | `:762-807` raise a rebellion *stressor* (`candidateType: "vassal_rebellion"`, `applyMode` proposal at severity ≥ 0.72) and break nothing; the link breaks only when a live rebellion succeeds: `labelProposal(ctx, "rival", "vassal_rebellion_succeeds", …)` (`:810-831`); a quashed one keeps it (`:833-847`) | "drift's vassal rebellion (a rebellion stressor, `:762-807`), whose success proposes relabelling the vassal link to rival (`:810-831`)" |
| L5 | §2.1 row "Allegiances…" | the drift overlord is "the side of no lower tier whose strength clears 0.82 × the target's plus its protectors' backing" [OBSERVED `wp/relationshipRuleHelpers.js:453-466`] | IMPRECISE | `:457-464`: tier rank ≥ the target's; at equal tier, population ≥ 0.72 × the target's; strength ≥ (target strength + 0.8 × protector backing) × 0.82 | "the side of no lower tier (at equal tier, at least 0.72 × the target's population) whose strength is at least 0.82 × (the target's strength + 0.8 × its protectors' backing)" |
| L6 | §3.2 row "cd" | "Three call forms exist in the host: with a direct-edge trade tie (migration, the foreign seat) and without (contraband)" | IMPRECISE | Three callers in two forms: with a tie `wp/migrationKernel.js:228-230`, `src/domain/rulingPowerSeat.js:365-370`; without, the contraband gate (`wp/supplyKernel.js:754-756`) | "Three callers use two forms: …" |
| L7 | §2.9 row "Its consumers" | contraband "(no tie passed) [OBSERVED `sp/smuggle.js:176`]" | IMPRECISE | `sp/smuggle.js:176` forwards a `tradeTie01` argument (`isContraband` defaults it to 0 at `:164`); that none is passed is shown only at the caller, `wp/supplyKernel.js:754-756` (`isContraband({ category, gateVector, originVector })`), which this seat did not read (§7.3 says ":176 by grep") | cite `wp/supplyKernel.js:754-756` with `sp/smuggle.js:164`, `:176` |
| L8 | §7.3 against the OBSERVED cites | the host re-reads listed | IMPRECISE | Cited lines lie outside the listed ranges: `wp/relationshipRuleHelpers.js` listed "295-331 … and 472-491" but §2.1/§3.2 cite `:453-466`; `wp/relationshipRulesCore.js:762-770` is cited OBSERVED twice (§2.1, §3.4) and the file is absent from §7.3; `sp/embattlement.js` listed "84-125" but §2.2/§3.2 cite `:204` and §2.10's "entry 0.55" is `ENTER_THRESHOLD` at `:74`; `sp/distanceRead.js` listed "280-316" but §3.2 cites `:277-311` | §7.3: `wp/relationshipRuleHelpers.js` 295-331, 440-491; add `wp/relationshipRulesCore.js` 745-851; `sp/embattlement.js` 69-125, 195-206; `sp/distanceRead.js` 270-316; §2.10's citation `sp/embattlement.js:74-118` |
| L9 | §3.2 row "M" | "computable, but its live facets move only with war; readiness exists only after a war footing [STATED ALIGN §6 Strength]" | IMPRECISE | ALIGN §6 Strength states the readiness half only; the "live facets" half is the host's own `wp/militaryStrength.js:65-68` (hooks for "the LIVE facets B1/B2 compute from deployment state": war exhaustion, war drain, army deployed), which the note does not cite | add [OBSERVED `wp/militaryStrength.js:65-68`] for the live-facet clause |
| L10 | preamble "Notes" (FILE-M); §3 opening "(pending application)" | FILE-M is "**PENDING APPLICATION** — the sway they design is not yet in V13" | IMPRECISE (time-bound; true when written, false now) | `docs/AMENDMENTS-2026-10-17m.md:7`: "**APPLIED** by amendments/realm-m-apply on 2026-10-17 … all 117 change items 663–779 applied" | "(the realm review's amendments; pending application when this note was written, applied 2026-10-17, FILE-M:7)" in both places |
| L11 | §2.1 row "Held by force" | quote: FILE-M item 693 "absent until the host bands its strength" | IMPRECISE (quote not re-found) | FILE-M item 693 as it stands (revised after J384, its preamble says so): `military?: { forceBand … garrisonPresent … } /* absent until the host sends it (V13 §8.5) */`; the quoted phrase occurs nowhere in the repository but this note | quote the present text: "absent until the host sends it (V13 §8.5)" |
| L12 | §3.2 row "Relation class" | "A `criminal_network` label has no class in FILE-M's table yet [INFERRED; §5 ask 1]" | IMPRECISE (stale) | FILE-M item 714 (8), as revised: "**neutral** (neutral, trade partnership and criminal network, and no relation)" | "FILE-M item 714 (8) (revised after J384) classes criminal network as neutral" |
| L13 | §3.2 row "MarchHold" | "FILE-M's verdict table (raid won +1 to the raider …) cannot read it as it stands" | IMPRECISE (quote not re-found) | FILE-M item 714 (11) as it stands: "a raid on a settlement is a `WorldEvent` at its victim …, moving no band and marking the victim's facing segments **fighting** for `fightingWeeks` (J384 (5))"; "raid won" / "won +1" occur nowhere in FILE-M, the realm review or V13 | "FILE-M item 714 (11) (revised after J384 (5)): a drift raid moves no band and marks the victim's facing segments fighting; a verdict needs the host's outcome word (ask 4)" |
| L14 | §2.2 row "A patrol lowering danger"; §5 ask 8 | "→ ask 8 (H16's security term)"; "patrol coverage as embattlement's security input (H16)" | IMPRECISE | FILE-M item 749's H16 (and V13 §8.5 H16 now): "patrol coverage re-priced through its one distance reader, read by outcome rolls only, any route choice reading it through its belief"; H16 names no embattlement or security term. The security input is this note's proposal; its host fact is `sp/embattlement.js:95-96`, `:201-204` (security relief, weight 0.4, capped 0.25) | "→ ask 8 (a refinement of H16's patrol coverage; the security input is this note's proposal, resting on `sp/embattlement.js:95-96`, `:204`)"; ask 8 likewise |
| L15 | §1.4 "What can be positioned" | "A caravan keeps an arrival tick and nothing else [STATED TRADE §2.3]" | IMPRECISE | TRADE §2.3: a `supplyShipments` record keeps "institution, destination, input good, source, arrival tick, starving; under M6a also the carried load … — **no path, no departure tick**". It keeps its two endpoints, so "nothing else" overstates the absence; what it lacks is a path and a departure tick | "A caravan keeps its source, destination and arrival tick, but no path and no departure tick [STATED TRADE §2.3]" |
| L16 | §2.5 row "Stocks, throughput, boom" (Audience) | "own bands and market phrases public" | IMPRECISE | The note defines public as "the host shows it to players already". TRADE §9 #16: "The audience filter is the lens's job. The host projects no audience on the supply ledgers. Public: own settlement bands and market phrases …" (a prescription); TRADE §8.4's audience cell: "own-settlement bands public [STATED EC:671 for the designed veil]" — EC is unbuilt (TRADE §1 layer 3). No host player surface for the bands is cited | "DM by default; public by the lens's own rule (TRADE §9 #16, after EC:671's designed veil, unbuilt)" |
| L17 | §2.10 row "Embattlement" | "entry 0.55 needs a live war front (0.85), a contested or unstable occupation, or exhaustion with crime or the hub premium" | IMPRECISE | TRADE §10.2 #40 (which the row cites) and host `sp/embattlement.js:87-96`, `:195-205`: an occupation clears entry alone "only while contested (0.75, with security below 0.5) or unstable (about 0.64, with security below about 0.22)"; exhaustion with crime or the premium only "against weak security"; security relief is min(0.25, 0.4 × security) | "… a contested or unstable occupation under weak security (contested below security 0.5, unstable below about 0.22), or war exhaustion with high crime or the hub premium against weak security" |
| L18 | §2.1 row "Steadings as claim points" (RR) | "RRa, DC, LR, FS (+S); never on RRb" | IMPRECISE (self-contradictory) | POP §7 P-10 and V5 (§12): steadings ride `settlementLifecycleEnabled` (WAVES: RR applied, DC, LR, FS) and a DM can light it "in any campaign" through SRD's Engine-waves "New & lost steadings" toggle (+S), so a born RR campaign gets them once +S is used; the note's own +S row says the same | "RRa, DC, LR, FS; on RRb (or any campaign) only once +S lights 'New & lost steadings'" |
| L19 | §1.5 | "prosperity riding shipments (UPSWING A2) and prosperity drift in the town fabric (MF §11.4, out of FP) [PROSP §7.3]" | IMPRECISE | PROSP §7.3 lists MF §11.4 (item 3) and UPSWING **B4** pilgrims (item 6), not A2; the unbuilt A2 shipment ride is at PROSP §5.1 ("The design's 'cheapest reachable surplus neighbour … riding shipments at hopWeeks' is unbuilt"), §8.6 item 5 and §10.2 C2 | cite "[PROSP §5.1, §8.6 item 5 (A2); §7.3 item 3 (MF §11.4)]" |
| L20 | §2.8 row "Borders, patrols, quarantine, armies, migrants, deaths, divine meaning" | "DESIGNED (PG pg-1…4) or ruled out (OD-FC-8)" | IMPRECISE | PLAGUE §9 #11: "Plague as divine punishment is a DM-attributed reading (OD-FC-8) or a designed rumour bias; a religion lens should not colour plague towns by an engine-originated meaning" — OD-FC-8 makes divine meaning the DM's to attribute, it does not rule the meaning out | "… or kept a DM-attributed reading, never engine-originated (OD-FC-8; PLAGUE §9 #11)" |
| L21 | §2.1 row "Wild land" | "not a host fact, and correctly so: the owner ruled it (J377)" | WRONG (attribution) | `docs/PROGRESS.md` J377 (line 436): the owner's verbatim (T1) and (T2) say nothing of wild or unclaimed land; "unclaimed land stays wild" is in the part headed "The session's reading (vetoable)". FILE-M item 659 (e) and 660 carry it under the heading "the readings are the session's, vetoable" (FILE-M:83) | "not a host fact, and correctly so: the session's reading of J377 (vetoable), carried by FILE-M items 659 (e) and 714 (7)" |
| L22 | §3.2 row "Relation class" | the class mapping's labels "[OBSERVED rule ids `wp/relationshipEvolution.js:86-103`]" | IMPRECISE | `:86-103` hold only the rival, cold_war and hostile rule lists; neutral, trade_partner, allied, patron, client and vassal are at `:49-85` and criminal_network at `:104-109` (the matrix is `:48-110`) | cite `wp/relationshipEvolution.js:48-110` |
| L23 | §2.1 row "Debatable land" | relationship drift "in RR mints hostile pairs, raids and subjugation proposals without any war layer [OBSERVED `wp/relationshipEvolution.js:98-103`; `wp/relationshipRulesAdversarial.js:266-365`]" | IMPRECISE | The cited lines are the rules of pairs already hostile (raid `:291-313`, subjugation `:317-370`); the minting of hostile pairs is the cold-war escalation, a label proposal at `wp/relationshipRulesAdversarial.js:226-227` (`labelProposal(ctx, "hostile", "cold_war_escalation", …)`), after rival → cold war at `:66-67` | add `wp/relationshipRulesAdversarial.js:66-67`, `:226-227` ("proposes a hostile relabel") to the citation |
| L24 | §1.4 last bullet | "faith and trade reach it only as buildings; populations do not [STATED as in the table]" | IMPRECISE | The table's own cell reads "none traced [POP §8.1]"; POP §8.1: "Town map: no population-flow input was traced … the timelapse's scrub tick reaches the town map's aged overlay (above), whose inputs were not traced" — an untraced absence, not a shown one | "populations: none traced (POP §8.1)" |
| L25 | preamble status table, row **RRa** | "`realistic_regional` actually applied: the Instant World composer's fallback tone, or the DM's preset chip [OBSERVED rules:890-894 comment; STATED TRADE preamble]" | IMPRECISE (incomplete) | A third door applies RR's rules: the DM screen's World's Temper picker — host `src/domain/worldPulse/temperamentPresets.js` "A steady realm" and "The long winter" take `basePreset: 'realistic_regional'` and `applyTemperament` normalizes that preset's full rules (`:66-75`); ALIGN §2.6 records it (`wp/temperamentPresets.js:32-74`; `comp/temperament/TemperamentPicker.jsx:29-37`) | "… the Instant World composer's fallback tone, the DM's preset chip, or the World's Temper picker's 'A steady realm' / 'The long winter' [ALIGN §2.6]" |

## The count

About **540 checkable claims** checked: the preamble and its status table (26), §1 (≈ 90: six line counts, the
eight shared traits with their 40-odd note citations, the 7 × 8 geography table's cell citations, §1.4–§1.6), §2's twelve
lens tables (≈ 210 cells carrying a host fact, a note citation, a preset set or an audience word), §3 (≈ 75), §4 (≈ 45),
§5's 35 asks (each ask's host fact and its cited note section, 70), §6's 13 questions (their 13 citations and their match
to J384's 13 answers, 26), §7's source lists (≈ 30 ranges and counts). Every host `path:line` the note tags OBSERVED was
opened at 81f1cd96 (`wp/simulationRules.js`, `LivingWorldGates.jsx` whole, `cultureDistance.js` whole,
`migrationKernel.js:128-232`, `rulingPowerSeat.js:280-372`, `smuggle.js:160-180` and its caller `wp/supplyKernel.js:750-756`,
`militaryStrength.js:60-95`, `:145-160`, `:318-329`, `relationshipRuleHelpers.js:295-335`, `:440-491`,
`relationshipRulesAdversarial.js:12-40`, `:260-420`, `relationshipEvolution.js:40-130`, `relationshipRulesCore.js:745-862`,
`distanceRead.js:270-316`, `embattlement.js:55-125`, `:195-210`, `beliefMap.js:196-210`, `temperamentPresets.js` whole,
`livingWorldSignals.js:225-265`, `PublicDossierView.jsx` (tier), host FOLD:326-352). Every note section cited was read:
ALIGN, TRADE, POP, PROSP and PLAGUE §1–§10 whole (and the §12 rows cited), FAITH §1, §6, §8's birth caveat and §9 whole;
FILE-M items 659–662, 683, 693, 694, 714 whole, 737, 749 (H1–H21); PROGRESS J375–J384; fp-simulator §8 and :255;
fp-physical-integration rows A1, C6 and lines 280, 283; V13 §8.5 H13–H30 and the `prosperityDwellWeeks` cell.

**25 findings: 1 WRONG (L21), 1 UNSUPPORTED (L1), 23 IMPRECISE.** No finding overturns a lens rule or a host ask: every
one of the 35 asks rests on a host fact its cited note states and the code bears out (ask 8's security input on
`sp/embattlement.js:95-96`, `:204`; ask 1's comparator on `wp/relationshipRuleHelpers.js:312-331`; ask 4's missing outcome
on `wp/relationshipRulesAdversarial.js:291-313`), and §4's four mark classes and the honesty rule rest on the notes' host
facts and on the owner's T1–T3 (J377, J378) and J382. The one place a rule is credited to an owner word it does not
rest on is L21 (wild land is the session's vetoable reading). Four findings (L10–L14 family) are staleness: FILE-M was
applied and then revised after J384, after this note read it.

Held (selected, so the reader can see what was tested): all six note line counts; all eight host line counts; every
preset fact of the preamble (`rules:6`, `:31`, `:56`, `:896`, `:900-901`, `:953`, `:961-963`, `:996`, `:1007-1008`,
`:1073`, `:1081`, `:1220-1221`); the canon gate (`LWG:101-134`) and the three Living-World lanes (`LWG:55-73`, `:235-236`,
`:259-261`); beliefs = canon ∧ non-omniscient (`beliefMap.js:204-209`); the culture-distance weights and the 0.108
identity step; the trade-tie table and its three callers; the six capacity facets; the five occupation rungs; the
security relief 0.4 / 0.25; the sea-lane slot gate; `settlementStrength`'s six weights; the raid's `war_pressure` with
no outcome; the vassal ids on the drift patch; FOLD having no alignment or prosperity row; the plague §12 counts
(eleven problems, fourteen omissions); J380's quoted "then research/sf/lens-implications.md"; J379's quoted "derived
layer with legend, audience filter and time scrub"; FILE-M item 737's quoted "the first rows of one lens mechanism";
PLAGUE §1's quoted "graph over trade links timed by the digest, not a field over territory"; the tier label being
public (host `PublicDossierView.jsx:60-86` prints it); the herald printing the prosperity word to every audience
(PROSP §8.2); §6's thirteen questions matching J384's thirteen answers one for one.

## What could not be checked, and why

1. **The map-module documents' line counts and read ranges as the note read them** (§7.2: PROGRESS 1,056; FPPHYS 481
   with §1 11-25 and §8 369-460; V13 2,988 with §3.9 1360-1396; FILE-M 2,220 with its ranges; fp-realm-review 746). Each
   file has grown since (now 1,065; 493; 4,452; 2,441; 870), and recovering the earlier text needs git, which this lane
   may not run. fp-simulator (1,098) still matches; PROGRESS rows J375–J382 still sit at 434–441 as cited.
2. **"Uncommitted edits by its seat present"** in ALIGN and PROSP, and the map-module commit `7d04e75` — a working-tree
   state at a past moment; needs git.
3. **The pre-revision FILE-M text** behind L11, L13 and L14: judged against the file as it stands; whether the earlier
   text said what the note quotes is not recoverable without git. The fixes cite the present text.
4. **Claims tagged [STATED <note> §n]** were checked against the note, as the tag says the note is the source; the
   underlying host lines were re-opened only where the claim is also tagged OBSERVED or where a sibling verifier's finding
   bears on it (L17's security qualifier, L25's third RR door).
