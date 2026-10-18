# Retrovalidation 2026-10-18 — alignment (Fable validator)

Lane: `retrovalidation/alignment` (fable; J392). Target: `research/sf/alignment-system.md` (1,246 lines, read whole),
carrying the J375 notice. Input: the Opus verifier's record `alignment-verify.md` (17 findings over ~650 claims).
Host: `/home/user/clausellstokes-lang/settlement-engine` at `81f1cd96`, read-only; no git command was run; nothing was
written to the host. Rules obeyed: the whole file read before any verdict; the owner's quoted words (J380's "now can you
also do the same for alignments", J382's "yes", J384's "i leave all judgemtn to you", (T1)–(T3)) are never re-judged;
every finding below ends FIXED (a correction fragment) or INVALID (shown so with evidence); nothing is deferred.

Status: COMPLETE (started 00:54Z; host checks 00:56–01:02Z; record written 01:03Z; see the LANDED line in
`docs/lane-events.log`).

## What I read

- `research/sf/alignment-system.md`, all 1,246 lines, §0–§12, in order.
- `docs/validation/retrovalidation-2026-10-18/alignment-verify.md` whole (94 lines) and `rulings.md` whole (106 lines:
  the Fable rulings seat's verdicts on J377–J389, which rest on this note's §4.2, §6 Information, §9.1 items 2–4 and
  §9.3 item 12).
- The owner's rules: `docs/AMENDMENTS-2026-10-16j.md` items 131–141 whole (lines 16–263), `docs/AMENDMENTS-2026-10-14i.md`
  item 130 (lines 15–40), `docs/PROGRESS.md` rows J375–J391 whole.
- Host, read-only at `81f1cd96`, for the five WRONG findings and the inferences the verifier could not judge:
  `wp/disposition.js:60-215, 253-287, 385-440, 455-485, 530-600` (the clamp, the uniform governing-power weight, the
  blend weights, the squash); `src/domain/rulingPower.js:150-220, 425-465, 505-525, 650-672`;
  `wp/applyWorldPulseOccupationAuthority.js:150-190, 285-310` (`liftOccupationAuthority` is a no-op for a conquest
  transfer: it acts only on an `occupationLift`); `wp/warDeployment.js:850-862`; `wp/applyWorldPulse.js:160-190`;
  `sp/embattlement.js:95-110, 296-372, 400-425`; `wp/religiousContest.js:228-250, 500-536, 540-560, 725-810`;
  `wp/religionState.js` grep + `:164-201` (DM-imposed cults seeded beside the patron); `wp/deityAxes.js:79-102` (the
  strict dead-band); `sp/cultureDistance.js:41-60, 160-200`; `sp/cohesionWeave.js:41-96`; `wp/generosityKernel.js:320-340,
  408-418`; `wp/sacredClaim.js:36-50, 112-125`; `wp/moralMartialLean.js:55-70, 95-130`; `sp/smuggle.js:110-130`;
  `wp/supplyWebWarfare.js:848-866`; `wp/irregularForce.js:45-60`; `wp/simulationRules.js:625-640`; `wp/pulseShapes.js:55`
  (a comment, not an import); `wp/warSeatBooks.js:265-280`; `wp/settlementPolitics.js:1035-1070`;
  `src/domain/npc/characterConsumers.js:512-526`; `wp/roadsKernel.js:1005-1020`; `src/domain/roads/state.js:330-345`;
  `wp/npcAgency.js:161-170`; `src/domain/rulingPowerCoup.js:36-49`; `data/npcData.js:1668-1678`;
  `src/generators/npcGenerator.js:320-348`; `docs/DESIGN_FP_COHERENCE_FOLD.md:330-352`;
  `docs/DESIGN_WAR_CONVENIENCE_AND_TRIBUTE.md:430-440, 644-662`; `docs/PHASE55_SPATIAL_ENGINE_DESIGN.md:1290-1300`.
- Map side: `research/sf/fp-physical-integration.md:90-108, 268-280`; `docs/volumes/V13-world.md:660-664, 809-813,
  1099-1103, 1777-1782, 1809-1822, 3404-3416, 3421-3422, 3593-3601, 3748-3755` (the W8 culture term as applied, the
  alignment lens row, H23/H30); `research/sf/lens-implications.md` every line citing ALIGN (40 lines).
- Re-ran the verifier's read-only scratch scripts from the scratchpad (`retro/align/tables.mjs`, `agg2.mjs`,
  `drift.mjs`, `lean.mjs`, `conquest.mjs`) — all reproduce; my own runs are recorded under
  `/tmp/claude-0/-home-user-maps-architecture/4291a60d-8240-5d49-a54e-2b2a213d093f/scratchpad/retro/align-fable/`.
- Swept `docs/volumes`, the 2026-10-17 amendment files, `research/sf/lens-implications.md` and
  `research/sf/fp-realm-review.md` for every wrong figure or wording below (`0.162`, `61%`, `+0.269`, "occupation
  authority" as a `governingName`, "(1 − tolerance)", "entirely unbuilt", "thirty modules", "receptivity resistance"):
  none was carried into a design text, so every correction owed is to the research note (kind `research`); no design
  fragment is owed. `docs/HOST-REQUIREMENTS-2026-10-18.md` does not exist yet (J391 (6) names it "at the landing").

## Rulings on the verifier's findings

| id | verdict | my evidence (beyond the verifier's) | consequence |
|---|---|---|---|
| AV-1 | ACCEPT | `wp/disposition.js:132-139` `npcTraitScore` sums with no clamp; `:397` `npcConscienceScore` clamps ±1. Re-ran the exact enumeration (45/30/30 × 40/30/20/10, `data/npcData.js:1671-1676`, `npcGenerator.js:328-343`): unclamped E = +0.1645, P(scored) 0.6046, mean among scored +0.2721; the clamped variants are 0.1624 and 0.2686 — exactly the note's +0.162 / +0.269, so the note applied the conscience clamp to aggression. Conscience: E −0.1440, P 0.6334, mean −0.2273; the hamlet probabilities 0.0950/0.6334 = 0.150 and 0.0316/0.6334 = 0.050 hold (conditional on a scored NPC, as the note says). The per-seat list holds (gov 1.061, merchant 1.054, outsider 1.046, noble/criminal 1.076, military 1.098, craft/labour 1.039). | corrections CR-1, CR-2, CR-3 |
| AV-2 | ACCEPT, amended | `rulingPower.js:517` `toGovernment = resolveGovernmentLabel(archetype, tier, factions, governing, demoted)`; `:433-459` falls to `ALT_GOVERNMENT_LABELS` when a roster name contains the preferred label; `:186` OCCUPATION → "Martial Administration"; `:665` `governingName: toGovernment`. The occupier "‹X› occupation authority" (`applyWorldPulseOccupationAuthority.js:162-174`) contains "Occupation Authority". `liftOccupationAuthority` (`:285-310`), called between the install and the transfer (`applyWorldPulse.js:182`), returns the settlement unchanged for a conquest (no `occupationLift`), so the run's "Martial Administration" is the pulse's own outcome; re-ran `conquest.mjs`: "Martial Administration". Amendment: the verifier's §5.1 fix text is kept but the AV-2 note "every occupied town shares the label" must be added to §5.1 and the §12.1 P3 row re-worded ("Holds, and goes further" stays; its mechanism sentence was wrong). The note's conclusion (conquest never closes the identity term toward the victor) stands. | CR-4 … CR-7 |
| AV-3 | ACCEPT | `sp/embattlement.js:353` `dangerCost = rt * T.DANGER_PENALTY * m * danger`; `:99-106` "× the mover's risk tolerance"; `:318-320` tolerance = 0.2 + 0.8 × law. §2.7 and §10 item 28 already state it right; §8.1 alone inverted it. | CR-8 |
| AV-8 | ACCEPT, amended | `religiousContest.js:514` `counter = moodDeity ? incumbentCounterForce(deity, moodDeity) …`; `:521` `fit = 1 − counter + crisisLift`; `:530` strength × (0.7 + 0.3 × fit); step 3b `:796-805` calls `deityLocalStrength` for every present non-suppressed deity, `moodDeity` = the patron (`:734`), no spread gate (only `neighbourIds` `:733` and `reaching` are); `incumbentCounterForce` `:244-246` adds `LAW_METHOD_COUNTER` 0.35 × clash (`deityStance.js:70`). A second creed can be present without spread: `religionState.js:164-201` seeds DM-imposed cults (`cultDeitySnapshots`) beside the patron at `CULT_SEED_SHARE` 4. Amendment to the verifier's §7 fix: the row's gate column must change too ("deity present / + a second creed present"), and the class reads "LIT 7 / LIT 7". | CR-9, CR-10, CR-11 |
| AV-9 | ACCEPT | FOLD `:346` WC row: BUILT, DARK "WC-0A..0E (… no writer)"; UNBUILT "WC-1..WC-16". The note's own §7 row 51 cites `wp/lawBandModulation.js` (a WC-0 shape). | CR-12 |
| AV-4 | ACCEPT | Import grep of `militaryStrength.js`: ten files name it; `militaryStrength.js` itself and `pulseShapes.js:55` (a JSDoc comment) are not callers; the eight callers are the seven listed plus `wp/irregularForce.js:55` (`deriveMilitaryCapacity`), whose key `irregularForceEnabled` (`simulationRules.js:633`) is lit in no preset. | CR-13 |
| AV-5 | ACCEPT | `moralMartialLean.js:100-105` `nameKindTags` joins name, category, priorityCategory, tags; `:126-127` tests the patterns on it; `:63` `red\s*light|brothel\s*district|pleasure\s*district`. Re-ran `lean.mjs`: Orphanage, House of healing, Debtors' yard null / stamped — the §2.5 defect holds. | CR-14, CR-15 |
| AV-6 | ACCEPT | `sp/smuggle.js:116` `SLAVE_GOOD_RE`; `:114-115` its comment; `:126` the closing brace of `finiteNumber`. | CR-16, CR-17 |
| AV-7 | ACCEPT | `supplyWebWarfare.js:857-864`: fragile, then `share01` descending, then `cost` ascending, then keys; comment `:851-853`. | CR-18, CR-19 |
| AV-10 | ACCEPT | FOLD `:339` ESPIONAGE, `:342` POPULATIONS ("the migration menu is EMPTY in every shipped world"). | CR-20 |
| AV-11 | ACCEPT | WARCONV `:436` the inventory row ("ALREADY LIVE … warTermination.js:762-766; momentum.js:1054"); `:655-662` "BUILT-PATH CORRECTED (R-I): this weight is ALREADY LIVE"; `:646-651` the malice01 threshold passage. | CR-21 |
| AV-12 | ACCEPT | PHASE55 `:1294-1295` DM REVEAL, `:1296-1297` CARDINALITY BOUND, `:1298` the record shape with `alignment`. | CR-22 |
| AV-13 | ACCEPT | `warSeatBooks.js:270-276` parses a string word into `lawfulness01`; `settlementPolitics.js:1058-1064` parses law/good, read by `leaderAlignmentKinship` `:1038-1046`; both behind keys lit nowhere (§7 rows 44-45). | CR-23 |
| AV-14 | ACCEPT | Static-import grep over `src/` (single-line and multi-line `import {…} from`): 24 files; any mention: 36. | CR-24 |
| AV-15 | ACCEPT | FP-PHYS `:93` "### 2.5 Routes and their lifecycle" (rows R1–R9); `:271` "## 5. The propagation layer"; `:273` restates PHASE55:834-848 and "Danger is relative to the mover". | CR-25 |
| AV-16 | ACCEPT | `grep foreignCulture docs/volumes/V13-world.md` finds nothing; `:1779` "### 3.9 W8 Polity"; `:1811-1820` the culture term reads "the host's own culture distance between the two seats, banded in fifths"; `:811` "in its plain form over its whole vector — no trade tie (J384 (2))"; `:662`, `:1101`. PROGRESS J382 records the term existed when the note was written, so the original reading was true then; the address is stale and the proposal adopted (in a banded, dwelled form). | CR-26 |
| AV-17 | ACCEPT | `characterConsumers.js:518-524`: "the field's two live consumers (bloc formation and the war-seat ruler bias) … would zero two live systems". | CR-27 |

All seventeen are accepted; none is rejected. The verifier's "could not check" list is right: the reading seats'
`alignment-reads.json` is not in the container; "detached HEAD, clean tree" is a statement about the clone at writing
time (today `.git/HEAD` is a branch ref at the same revision); the §11.2 grep-hit counts depend on unrecorded patterns.
None of these is a design-bearing claim.

## Beyond the verifier — what a first read of a large host could get wrong, checked

The verifier accepted the note's load-bearing inferences; I re-derived each from the code rather than from the note:

- **The governing-seat up-weight is a no-op (§3.1, §10 item 3)** — HOLDS. `disposition.js:168-170` and `:418-420`
  compute `governingPower` once per settlement and apply `importanceWeight(npc) × governingPower × 1.5` to every NPC, so
  the two factors cancel in the weighted mean. The comment's "the chooser doesn't bind NPCs to factions here" (`:174-176`)
  confirms the read. (An Opus seat could have read a per-NPC faction power; it did not.)
- **The deity-free pair reads `respectable_rival` in generosity (§3.8, §10 item 5)** — HOLDS. `generosityKernel.js:326-335`:
  `samePatron` needs a non-empty shared ref; `alignmentKinship01 = 1 − |evil01 − evil01| = 1` for two absent patrons;
  `cohesionWeave.js:88-93` → kindred, not same → `respectable_rival`, conscience × 0.95. `sacredClaim.js:39-49` guards
  with "both towns must actually name a patron"; generosity does not.
- **Schism is unreachable (§4.2, §9.2 item 7)** — HOLDS: same patron ⇒ identical axes ⇒ kinship 1 ⇒ kindred. V13:3422
  adopted the three-class legend with the no-schism note.
- **Temper is the good/evil axis restated (§2.4)** — HOLDS, including the dead-band edge: `deityAxes.js:98-100` uses
  strict `score > 0.15` / `score < −0.15`; a neutral-chaotic deity scores 0.3 × 0.5, which is the same double as the
  literal 0.15, so it reads neutral, as the note says.
- **The arithmetic (§3.4 ranges, §3.5 expectations, §3.7 founding ticks, §6 will facet ±0.64/−0.48, §6 peace press
  0.6/1.0/1.4, §4.2's 0.108, §9.1's 15%, §10 item 9's tick 8 / tick 32 / half-life 3.6, §10 item 21's 0.64 and 0.95)** —
  recomputed, all hold; the aggression figures excepted (AV-1).
- **Culture distance's weights and closers (§4.2)** — HOLD: `cultureDistance.js:45-59` 0.30/0.25/0.18/0.27, 0.6/0.4,
  TRADE_CLOSE 0.25, TRAD_CLOSE 0.2; `:182-185` the identity term compares `governingName` strings; `:196-198` the trade
  tie is a `ctx` argument while tradition kinship is read from the vectors, so the PLAIN form (J384 (2)) drops the tie
  and keeps kinship — §9.1 item 6b holds under J384 (2).
- **The inverted road-traveller danger weight (§10 item 28)** — HOLDS: `roadsKernel.js:1010` passes `riskToleranceOf(c.npc)`
  (bold 0.9, timid 0.35, `roads/state.js:334-343`) straight into `chooseRoute`, where `scoreRoute` multiplies danger by
  it; `:1018` uses the same number as the refusal ceiling.
- **The aggression blend (§3.3)** — HOLDS: `disposition.js:253-287` W_GOV 0.3, W_PERS 0.45, W_HIST 0.25, W_DEITY 0.35 ×
  `pietyLocalMultOf`; `COUP_COERCION` (`rulingPowerCoup.js:36-49`) gives the §2.3 baselines exactly (military +0.25,
  noble +0.1, arcane +0.05, merchant −0.05, outsider/other −0.1, craft/labor −0.15; criminal 0.1 and occupation 0.25
  overridden).

Three things the verifier could not see, found in this pass (each FIXED below):

- **F-1 (§9.1 item 6; a map-side reading that would mislead the design today).** The note says a direct vassal or
  patron edge closes the distance "by up to 15% through the trade-tie multiplier" and reasons "under J382" from it. J384 (2),
  ruled after the note, reads the territory term in the PLAIN form with no trade tie (V13:811, :1811-1820), so that
  closing does not enter the sway at all; only the same-label 0.108 effect and tradition kinship do. The design is
  right; the note is stale and must say so. → CR-28.
- **F-2 (§10 item 25, §9.3 item 13; open questions since answered).** Items 25 (a), (b), (c) and the host ask of §9.3
  item 13 were answered under the owner's "i leave all judgemtn to you": (a) J384 (7) DM-only; (b) J384 (9) map-side plates
  and H30's per-advance reading; (c) J384 (2) the whole vector; (e) is carried as H30 ("fixed if the host so chooses").
  A reader of the note today would think them open. → CR-29, CR-30.
- **F-3 (§7 row 59's gate column and class).** AV-8's verifier fix changed the cells and the class but left the gate
  column reading "+ faith spread"; the gate is "a second creed present" (a DM-imposed cult, `religionState.js:183-201`,
  or an entrant). Folded into CR-10.

Checked for contradiction with the owner's rules and found none: items 131–141 (the world, sites, hydrology and
encounter-map rules) touch this note only where §9.1 item 5 lets a patrol legend cite the host's gate character — a
display of a host fact, consistent with item 132 (e) (a world-map encounter reads the world regime's facts) and with
J378.5 (patrols derived from enforcement, hostility and route class; the gate character is a legend citation, not an
input, as lens-implications §2.3 rows 194–195 record it). Item 130 (the M0 kernel rulings) is not touched. The note's
readings of J377, J378, J379, J380 and J382 are listed in the rulings table; each agrees with the Fable rulings seat's
verdicts in `rulings.md` (J377(b).7, J378.1, J382(a), J384(2), (4), (7), (9), (13)).

## Rulings table — the note's own readings and rulings under the delegation

| id | the ruling or reading in one line | verdict | reason | consequence |
|---|---|---|---|---|
| R-1 | §1: J380's "now can you also do the same for alignments" means see the system whole — what it is, how it is local and global, how it moves between settlements, how that changes the map view | UPHELD | the owner's word is J380's own; the reading mirrors the faith request it points back to ("see the faith and diety system … in full … how religion conversions move between settlements. tell me how that changes your view") | none |
| R-2 | §1, §9.1 item 1: J382 (a) brings alignment (0.25 of culture distance) and the patron axes (0.30) into territory | UPHELD | `cultureDistance.js:45-48, 190`; J384 (2) later ruled the whole vector, alignment half included, which the Fable rulings seat upheld | none |
| R-3 | §9.1 item 1's proposal: a continuous step cost `costVector.foreignCulture × cultureDistance(seed seat, owning seat)` | AMENDED → adopted as V13 §3.9 (6): a step into c takes × (1 + φ × cd(s, home(c))), cd the host's distance between the seed seat and the W8a owner, banded in fifths, plain form, held for `culture.dwellWeeks` 13 | chose the banded, dwelled, plain form over the continuous raw value because borders move only on dated facts (J377(b).7) and the sway's relation classes already count the pair's tie (J384 (2)); the pair-of-seats keying the note proposed is what was kept | none beyond CR-26's dated bracket (the design already states it) |
| R-4 | §9.1 item 2: culture distance must be sampled at the dated border event and kept, never recomputed on read | UPHELD | the host's own frozen-versus-live law (PHASE55:1197-1201 via FP-PHYS §5) and J377(b).7; V13:811 `sampled?: Week`, :1101 the 13-week dwell | none |
| R-5 | §9.1 item 3: occupation moves borders and alignment together; conquest never closes the identity term; the occupation event and the term's expiry are shared dated causes | UPHELD (mechanism corrected by AV-2) | `disposition.js:449-456, 491-515, 549, 586`; `cultureDistance.js:182-185`; the label written is "Martial Administration", never the victor's, so the conclusion stands; V13:1820-1822 holds the band during an occupation and T-V13-47 tags one occupation event for sway, prosperity and alignment | none beyond CR-5 (the two-occupied-towns 0.108 effect is a host fact inside a fifths band; the design reads the host's own term and invents nothing, V13 §3.9 (6)) |
| R-6 | §9.1 item 4: the settlement axes never enter strength; the patron's temper does through the will facet; the tie-breaker should not add the settlement axes | UPHELD | `militaryStrength.js:75-82, 253-285`; J384 (4) keeps the will facet and excludes the economy facet, as the rulings seat upheld | none |
| R-7 | §9.1 item 5: a patrol layer may cite the host's gate character and escort quality as the enforcing power's character, judged at the worst gate, RR/FS on canon, the slave ban on custom goods only | UPHELD (a legend fact, not an input) | lens-implications §2.3 rows 194-195 carry it as a legend citation; J378.5's patrol derivation (enforcement, hostility, route class) is untouched | none |
| R-8 | §9.1 item 6: no vassal-chain closing through the identity term; a direct vassal or patron edge closes ≤ 15% by the trade tie; same-label towns read ≈ 0.108 closer | AMENDED → the first and third hold; the 15% is the host's migration call only — the territory term reads the plain form with no trade tie (J384 (2)), so no edge closing enters the sway | chose to date the sentence rather than delete it because the host fact is true and the lens note's §2.9 cites it; the design already reads the plain form (V13:811) | CR-28; no design fragment |
| R-9 | §9.1 item 6b: tradition kinship adds a small faith-shaped closing under J382 for two deity-seating towns | UPHELD | kinship is computed from the vectors (`cultureDistance.js:196-198`) and survives the plain form; `genesis.js:194-199, 224-236` reads deity presence | none |
| R-10 | §9.2 item 7: three quadrant classes, schism unreachable | UPHELD | `cohesionWeave.js:88-93`, `sacredClaim.js:120`, `generosityKernel.js:334`; V13:3422 draws it so | none |
| R-11 | §9.2 items 8–11: FAITH-NOTE §9.6 item 1 should add prescription and tolerance drift; a conversion is an alignment event; the patron's weight in culture distance exceeds 0.30; temper needs no legend row | UPHELD | `religiousContest.js:355-384`, `institutionTolerance.js:138-231`, `pulseKernel.js:1475-1481, 1803-1813`; the patron axes enter the faith term and the alignment term (0.35, 0.3 of the drives); `deriveTemper` is the good/evil sign | none |
| R-12 | §9.3 item 12 and §1: derived alignment is DM truth only; no believed alignment exists | UPHELD | `beliefMap.js:991-1036` (no alignment field); J384 (7) ruled it, V13 §5.8 (7) refuses every other audience | none |
| R-13 | §9.3 item 13: no history is kept, so a scrub needs map-side snapshots or a host export; a replay must use the host's own decay; host ask: a per-pulse alignment digest | UPHELD | J384 (9) chose plates in the world document; H30 asks the per-advance reading and names the decay defect; V13 §5.8 (8) "the lenses replay nothing, they scrub plates" | CR-30 (a dated bracket only) |
| R-14 | §9.3 items 14–17: recompute via the host's selector; normalise the five polarities; read the resolved rules, not the preset; say the born-world bias | UPHELD | V13 §5.8 (4) and (6), T-V13-47 (regime from `HostRegime`, the lean note), V13:3412-3414 | none |
| R-15 | §10 item 9: the compounding decay and the RR freeze are a host defect, not a design | UPHELD | re-ran `advanceMoralDrift`: 0.2772 → … → 0.0268, pruned at tick 8; the comment at `sp/moralDrift.js:218-224` states the intent (true elapsed silence) the code defeats; H30 carries it "fixed if the host so chooses" | none |
| R-16 | §10 item 28: the inverted danger weight is unintended | UPHELD | one call site passes one number to two opposite reads (`roadsKernel.js:1010, 1018`) | none |
| R-17 | §10 items 4 and 29: sparse-roster dominance and the born-roster lean are design questions, not bugs | UPHELD | the skip of unscored NPCs (`disposition.js:171, 428`) and the tables are deliberate; the design answers the lean with the lens's note (T-V13-47) | none |
| R-18 | §10 item 25: seven open questions for the owner | AMENDED → (a), (b), (c) answered by J384 (7), (9) + H30, (2); (e) carried as H30; (d), (f), (g) open, the design drawing (d) "by the host's law" and (g) as the lean note | the owner delegated them whole ("i leave all judgemtn to you"); the answers are in J384 and V13, and a reader of the note must not think them open | CR-29 |
| R-19 | §4.2: the identity term compares government labels; nothing in the host models an overlord there | UPHELD | `cultureDistance.js:182-185`; the overlord the sway reads comes from relation labels (J384 (3), `relationshipRuleHelpers.js:453-464`), never from `governingName` | none |
| R-20 | §12.1 P3: "Holds, and goes further. The conquest writes '‹occupier› occupation authority'" | AMENDED → holds; the transfer writes the occupation archetype's alternate label "Martial Administration" (AV-2) | the fixer's mechanism sentence was wrong; its ruling that the verifier's P3 held, and its "goes further" (the label fact), were right | CR-7 |
| R-21 | §12.2 M3: "−0.144 and +0.162 (rounding)" | AMENDED → +0.165; the verifier's figure was exact (AV-1) | the fixer applied the conscience clamp to the aggression sum | CR-3 |
| R-22 | §12.2 M11: "Partly holds … the receptivity resistance is read only by neighbour-spread and occupation-pull conversion, which the faith-spread gate skips" | OVERTURNED → holds whole: the receptivity resistance is read in every present creed's share advance, with no spread gate (AV-8) | the fixer read the spread gate's comment block (`religiousContest.js:548-553`) as the receptivity read's gate; the read is in `deityLocalStrength` (`:514`), which step 3b (`:796-805`) calls for every present deity | CR-9, CR-10, CR-11 |
| R-23 | §12's other rows (P1, P2, P4, P5, P6; M1, M2, M4–M10, M12–M18) | UPHELD | each re-checked by the verifier at the source; P1, M2, M7 and P3's run reproduced here | none |
| R-24 | PROGRESS J383's claim that the note was "verified against code and fixed" | AMENDED → verified and fixed, with five wrong and twelve imprecise claims surviving the fix pass, corrected by this record | the fix pass closed the verifier's six problems and eighteen omissions but introduced three errors of its own (AV-1, AV-2, AV-8) and left citation drift | journal rows are append-only: J392 names J383; no edit |

## Corrections (kind `research`, all in `research/sf/alignment-system.md`; applied in place by the Apply stage)

| id | where | old → new | reason |
|---|---|---|---|
| CR-1 | §3.5 line 379 | "a conscience of −0.144 and an aggression of +0.162; only 63%" → "a conscience of −0.144 and an aggression of +0.165 (the aggression sum is not clamped, `wp/disposition.js:132-139`; only the conscience sum is, `:397` [Fable-reviewed 2026-10-18: an earlier text applied the clamp to both and read +0.162]); only 63%" | AV-1 |
| CR-2 | §3.5 line 380 | "(conscience) and 61% (aggression) of NPCs score at all, and among those the means are −0.227 and +0.269 [INFERRED," → "(conscience) and 60% (aggression) of NPCs score at all, and among those the means are −0.227 and +0.272 [INFERRED," | AV-1 |
| CR-3 | §12.2 M3 line 1222 | "Holds. My exact expectation over the slot roll: −0.144 and +0.162 (rounding); among scored NPCs −0.227 and +0.269;" → "Holds. My exact expectation over the slot roll: −0.144 and +0.165 (the verifier's figure was exact, not rounding: the aggression sum is not clamped, `wp/disposition.js:132-139` [Fable-reviewed 2026-10-18: AV-1]); among scored NPCs −0.227 and +0.272;" | AV-1 |
| CR-4 | §4.2 line 463 | "writes the new faction's name [OBSERVED `src/domain/rulingPower.js:665`]." → "writes a government-type label for the winning faction's archetype and the settlement's tier, or its alternate label when a roster name contains the preferred one [OBSERVED `src/domain/rulingPower.js:214-217`, `:433-459`, `:517`, `:665`; Fable-reviewed 2026-10-18: AV-2 — an earlier text said \"the new faction's name\"]." | AV-2 |
| CR-5 | §5.1 lines 548-550 | "A conquest installs a new governing power named \"‹occupier⏎name› occupation authority\" and the transfer writes that string as the town's `governingName` [OBSERVED⏎`wp/warDeployment.js:856-858`; `wp/applyWorldPulse.js:165-187`; `src/domain/rulingPower.js:659-666`], and a victor's own" → "A conquest installs a non-governing \"‹occupier⏎name› occupation authority\" faction and crowns it; the transfer writes the occupation archetype's government label as the town's `governingName`, which — because the occupier's own name contains \"Occupation Authority\" — is the alternate \"Martial Administration\" [OBSERVED⏎`wp/warDeployment.js:856-858`; `wp/applyWorldPulse.js:165-187`; `wp/applyWorldPulseOccupationAuthority.js:162-174`; `src/domain/rulingPower.js:178-187`, `:433-459`, `:517`, `:665`; confirmed by running `installOccupationAuthority` + `transferRulingPower` read-only; Fable-reviewed 2026-10-18: AV-2 — an earlier text said the occupier string itself was written], and a victor's own" (⏎ = the file's line break) | AV-2 |
| CR-6 | §5.1 line 552 | "1 [OBSERVED `sp/cultureDistance.js:183-186`]. If the two towns happened to share a label before the conquest, the" → "1 [OBSERVED `sp/cultureDistance.js:183-186`]; but every occupied town carries the same \"Martial Administration\", so two towns under any occupation read identity 0 with each other, about 0.108 closer [Fable-reviewed 2026-10-18: AV-2]. If the two towns happened to share a label before the conquest, the" | AV-2 |
| CR-7a | §10 item 27 line 1062 | "an \"‹occupier› occupation authority\" string after" → "the alternate occupation label \"Martial Administration\" after" | AV-2 |
| CR-7b | §10 item 27 line 1064 | "    `wp/warDeployment.js:857`; `src/domain/rulingPower.js:665`]." → "    `wp/warDeployment.js:857`; `src/domain/rulingPower.js:178-187`, `:433-459`, `:665`; Fable-reviewed 2026-10-18: AV-2]." | AV-2 |
| CR-7c | §12.1 P3 line 1211 | "Holds, and goes further. The conquest writes \"‹occupier› occupation authority\" (`wp/warDeployment.js:857`; `wp/applyWorldPulse.js:165-187`; `src/domain/rulingPower.js:665`)." → "Holds, and goes further. The conquest crowns the \"‹occupier› occupation authority\" faction and the transfer writes the occupation archetype's alternate label \"Martial Administration\" as `governingName` (`wp/warDeployment.js:857`; `wp/applyWorldPulse.js:165-187`; `src/domain/rulingPower.js:178-187`, `:433-459`, `:665`) [Fable-reviewed 2026-10-18: AV-2 — this row first said the occupier string itself was written]." | AV-2 |
| CR-8 | §8.1 line 807 | "route choice over the frozen digest's cached candidates, danger × (1 − tolerance), with the season; tolerance = 0.2 + 0.8 × lawfulness for refugees | `sp/embattlement.js:304-330`; `wp/migrationKernel.js:463-474`" → "route choice over the frozen digest's cached candidates, effective cost = seasonal base cost + tolerance × 1.5 × median hop cost × Σ embattlement (+ tolls), with the season; tolerance = 0.2 + 0.8 × lawfulness for refugees (a lawful mover weighs danger most, §2.7 [Fable-reviewed 2026-10-18: AV-3 — an earlier text wrote (1 − tolerance)]) | `sp/embattlement.js:304-330`, `:347-357`, `:407-423`; `wp/migrationKernel.js:463-474`" | AV-3 |
| CR-9 | §4.2 lines 493-496 | "The third, receptivity⏎  resistance against an incoming faith (0.35 × clash inside the incumbent's counter-force), is read only by the⏎  neighbour-spread and occupation-pull conversion, which the faith-spread gate skips when off (DC, FS; D+) [OBSERVED⏎  `wp/religiousContest.js:237-246`, `:514`, `:548-553`, `:780`]." → "The third, receptivity⏎  resistance against a second creed (0.35 × clash inside the incumbent's counter-force), is read in every present creed's⏎  share advance — step 3b runs for every present, non-suppressed deity in every religion-active settlement with no spread⏎  gate, the patron as the mood — so it fires wherever a patron and a second creed (a DM-imposed cult or an entrant) are⏎  present, in any preset; spread adds only the entrant lane and the occupation pull [OBSERVED⏎  `wp/religiousContest.js:237-246`, `:514`, `:520-530`, `:733-734`, `:768-794`, `:780`, `:796-805`; `wp/religionState.js:164-201`⏎  (imposed cults seeded beside the patron); Fable-reviewed 2026-10-18: AV-8 — an earlier text read it as spread-gated]." | AV-8 |
| CR-10 | §7 row 59 line 784 | the whole row → "| 59 | Deity stance local law lane: contest floor and mandate fit / receptivity resistance | deity present / + a second creed present (a DM-imposed cult or an entrant) | ✓ / ✓ | ✓ / ✓ | ✓ / ✓ | ✓ / ✓ | ✓ / ✓ | ✓ / ✓ | ✓ / ✓ | LIT 7 / LIT 7 (law-authored deities; a second creed present) [OBSERVED `wp/religionState.js:544-553`, `:739-749`; `wp/religiousContest.js:237-246`, `:514`, `:796-805`; Fable-reviewed 2026-10-18: AV-8 — the receptivity half read D+ before] |" | AV-8, F-3 |
| CR-11 | §12.2 M11 line 1230 | "Partly holds. Contest floor and mandate fit are local (`wp/religionState.js:544-553`, `:739-749`); the receptivity resistance is read only by neighbour-spread and occupation-pull conversion, which the faith-spread gate skips (`wp/religiousContest.js:237-246`, `:548-553`)" → "Holds whole [Fable-reviewed 2026-10-18: AV-8 — this row first said \"partly\"]. Contest floor and mandate fit are local (`wp/religionState.js:544-553`, `:739-749`); the receptivity resistance is read in every present creed's share advance (`wp/religiousContest.js:796-805` → `:514`), with no spread gate; spread adds only the entrant lane and the occupation pull (`:768-794`, `:780`)" | AV-8 |
| CR-12 | §7 closing lines 798-799 | "WC entirely⏎unbuilt (its alignment join slider and character drift are designed only) [STATED FOLD:333-351]." → "WC built only as⏎its WC-0 substrate (vocabularies, column union, law-band shape, flags, ledger shape; no writer) and otherwise unbuilt (WC-1..WC-16), its alignment join slider and character drift designed only [STATED FOLD:346; Fable-reviewed 2026-10-18: AV-9 — an earlier text said \"entirely unbuilt\"]." | AV-9 |
| CR-13 | §6 Strength line 597 | "`wp/roadsKernel.js:1031`, `src/domain/display/warResolve.js:256`, `src/domain/display/armyStrength.js:64`]. The patron's" → "`wp/roadsKernel.js:1031`, `src/domain/display/warResolve.js:256`, `src/domain/display/armyStrength.js:64`, and the irregular-force share `wp/irregularForce.js:55` (dark: `irregularForceEnabled` is lit in no preset, `wp/simulationRules.js:633`) — eight modules, as §10 item 31 counts]. The patron's" | AV-4 |
| CR-14 | §2.5 line 235 | "matched by name, first match wins [OBSERVED `wp/moralMartialLean.js:57-69`]:" → "matched against the institution's name, category and tags (first match wins) [OBSERVED `wp/moralMartialLean.js:57-69`, `:100-105`, `:121-128`]:" | AV-5 |
| CR-15 | §2.5 line 243 | "| red-light / brothel / pleasure district | 0.2 | 0.6 |" → "| red-light / brothel district / pleasure district | 0.2 | 0.6 |" | AV-5 |
| CR-16 | §3.4 line 356 | "[OBSERVED `sp/smuggle.js:87-98`, `:126`, `:143-148`, `:164-180`]" → "[OBSERVED `sp/smuggle.js:87-98`, `:114-116`, `:143-148`, `:164-180`]" | AV-6 |
| CR-17 | §6 Trade line 632 | "[OBSERVED `sp/smuggle.js:126`, `:133-148`]" → "[OBSERVED `sp/smuggle.js:114-116`, `:133-148`]" | AV-6 |
| CR-18 | §5.2 line 566 | "target's supplier villages, fragile first then cheapest route" → "target's supplier villages, fragile first, then highest supply share, then cheapest route (`wp/supplyWebWarfare.js:857-864`)" | AV-7 |
| CR-19 | §8.1 line 811 | "supply-web stages ordered fragile-first then cheapest route | `wp/supplyWebWarfare.js:855-862`" → "supply-web stages ordered fragile first, then highest supply share, then cheapest route | `wp/supplyWebWarfare.js:857-864`" | AV-7 |
| CR-20 | §10 item 23 line 1046 | "[STATED FOLD:339]" → "[STATED FOLD:342]" | AV-10 |
| CR-21 | §10 item 15 line 1021 | "[STATED WARCONV:646-651]" → "[STATED WARCONV:436, :655-662]" | AV-11 |
| CR-22 | §6 Information line 666 | "STATED PHASE55:1294-1297]" → "STATED PHASE55:1296-1298]" | AV-12 |
| CR-23 | §2.2 row (e) line 170 | "the c column is the **only NPC-grain law axis** in the host" → "the c column is the **only personality-derived NPC law axis, and the only lit one** (the seeded and declared D&D words are parsed into a law reading too, but only by the dark war seat books `wp/warSeatBooks.js:270-276` and settlement politics `wp/settlementPolitics.js:1058-1064`, §7 rows 44-45)" | AV-13 |
| CR-24 | §10 item 1 line 961 | "About thirty modules import the selectors today, several lit in RR" → "About two dozen modules import the selectors today (24 by static import; 36 files name them, comments and types included), several lit in RR" | AV-14 |
| CR-25 | §8.1 closing line 824 | "[STATED PHASE55:1197-1201 via FP-PHYS §2.5]" → "[STATED PHASE55:1197-1201 via FP-PHYS §5]" | AV-15 |
| CR-26 | §9.1 item 1 lines 868-869 | "V13 §3.9's `foreignCulture` term is categorical (1 when a cell's culture id⏎   differs from the seed's) [OBSERVED `docs/volumes/V13-world.md:1360-1372`]." → "At the time of this reading (before J382 was applied) V13 §3.9's `foreignCulture` term was categorical (1 when a cell's culture id⏎   differed from the seed's) [OBSERVED then at `docs/volumes/V13-world.md:1360-1372`; Fable-reviewed 2026-10-18: AV-16 — the term is gone; V13 §3.9 W8 (now `:1779`) reads the host's culture distance between the seed seat and the owning seat, banded in fifths, in its plain form (V13:662, :811, :1101, :1811-1820; J382 (a), J384 (2)), so the proposal below has been adopted in that form]." | AV-16 |
| CR-27 | §10 item 16 line 1025 | "`characterConsumers` calls it a projection cache for two systems that are dark [OBSERVED" → "`characterConsumers` calls it a projection cache for its \"two live consumers\" (bloc formation and the war-seat ruler bias), both dark in every preset (§7 rows 44-45), so the comment's \"live\" is stale [OBSERVED" | AV-17 |
| CR-28 | §9.1 item 6 lines 897-899 | "A *direct* vassal or patron edge closes the distance by up to 15% through the trade-tie multiplier (tie 0.6⏎   × 0.25), and only for that linked pair, not along a chain [OBSERVED `wp/migrationKernel.js:197`, `:228-230`;⏎   `sp/cultureDistance.js:193-198`]. Under J382 a chain's inner towns therefore resist each other's territory as much as" → "In the host's migration call a *direct* vassal or patron edge closes the distance by up to 15% through the trade-tie multiplier (tie 0.6⏎   × 0.25), and only for that linked pair, not along a chain [OBSERVED `wp/migrationKernel.js:197`, `:228-230`;⏎   `sp/cultureDistance.js:193-198`]; the territory term reads the PLAIN form, with no trade tie, so not even that closing enters it [Fable-reviewed 2026-10-18: J384 (2), V13:811, :1811-1820 — this item was written before J384]. Under J382 a chain's inner towns therefore resist each other's territory as much as" | F-1 |
| CR-29 | §10 item 25 line 1056 | "(g) is the born roster's malicious and belligerent lean intended (item 29)." → "(g) is the born roster's malicious and belligerent lean intended (item 29). [Fable-reviewed 2026-10-18: under the owner's \"i leave all judgemtn to you\" (J384) the session answered (a) — no player view, the lens is DM-only (J384 (7)); (b) — map-side plates, one frame per host advance, and a host ask for a per-advance alignment reading (J384 (9); V13 §8.5 H30); (c) — the whole vector, alignment half included, in the plain form (J384 (2)); (e) is carried to the host as H30 (\"fixed if the host so chooses\"); (d), (f) and (g) stay open, the design drawing (d) \"by the host's law\" in three classes and (g) as the lens's lean note (V13 §5.9 (8)).]" | F-2 |
| CR-30 | §9.3 item 13 lines 936-937 | "Proposed host ask: a per-pulse⏎    alignment digest (both axes, bands, the top constituent causes), published like the faith projection." → "Proposed host ask: a per-pulse⏎    alignment digest (both axes, bands, the top constituent causes), published like the faith projection [Fable-reviewed 2026-10-18: adopted as V13 §8.5 H30 beside J384 (9)'s map-side plates]." | F-2 |

No `design` fragment is owed: the sweep found none of the corrected figures or wordings in V13, V14, the base, the
proposals, the brief, INDEX, SUMMARY, the 2026-10-17 amendment files or the lens and realm notes; the two design-bearing
readings that changed (R-8, R-18) are already stated correctly in V13 (:811, :1811-1820, §5.9 (8), H30). No `record`
fragment is owed: J383 is a journal row and is named in J392 (R-24).

## Verdict

**PASS-WITH-CORRECTIONS.** The note's conclusions hold: the derived, never-stored two-axis read; no diffusion between
settlements; the compounding moral-drift decay and the RR freeze; the three never-abolished founded institutions; the
slave ban with no catalog good; the inverted traveller danger weight; the no-op seat up-weight; the unreachable schism
quadrant; the government-label identity term; the born-roster lean; the patron-only strength term; the DM-only lens.
Seventeen claims do not hold as written (five wrong, twelve imprecise — all accepted from the verifier, two with
amendments) and three passages are stale against J384 (F-1, F-2, F-3); the thirty corrections above make the note sound
in place. No section needs a rewrite.

## Notice replacement

> Fable-reviewed 2026-10-18: PASS-WITH-CORRECTIONS — 17 verifier findings accepted (5 wrong, 12 imprecise) and 3 stale passages dated, 30 fragments applied in place; conclusions hold (lane retrovalidation/alignment; J392)
