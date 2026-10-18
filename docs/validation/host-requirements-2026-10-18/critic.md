# Completeness critic — "What the map module needs from SettlementForge"

Written 2026-10-18 by the completeness seat. Every claim below cites its file, section and line; host paths are in
the SettlementForge clone at revision `81f1cd96` (read-only), map paths in `/home/user/maps-architecture`. Plain
words first, the pointer after, in every row.

**Sources read whole for this pass:** the six drafts (`draft-s3.md` … `draft-s8.md`) and the seven extracts
(`extract-contracts.md`, `extract-defects-a.md`, `extract-defects-b.md`, `extract-encounters.md`,
`extract-host-list.md`, `extract-patrols.md`, `extract-rest.md`); `docs/volumes/V13-world.md` §10 (lines 3880–4261),
§8.5 (3702–3762), §11 (4262–4327), §12 (4327–4390), §3.11.6 (2286–2346), §5.9's sway and patrols rows (3241–3290);
`docs/volumes/V14-sites.md` §10–§11 (3007–3072); `research/sf/fp-physical-integration.md` §3 (181–229) and §6
(299–352); `research/sf/fp-simulator.md` §2 (454–642) and §3 (642–736); `research/sf/faith-system.md` §9
(1114–1281); every summary and "implications" section under `research/fmg/` (the README; `FMG-survey.md` §"Executive
summary", §"Limitations", §"Conclusion"; the eleven notes' §1 and their implications sections);
`docs/AMENDMENTS-2026-10-17m.md` items 659–662 (85–175) and 714 (968–1180); `docs/PROGRESS.md` rows J377–J389
(436–448); and, for spot checks, the host files named in §3 below.

**Verdict in one sentence.** The drafts are accurate on what they cover and the H-rows are reported faithfully; what
is missing is the host's own constitution — the obligations every H-row carries beside its code (flags, dormancy
fences, persisted-shape lifecycle, registries, vocabulary), the exact entitlement gate H22 must split, the version
axes the canon must map onto, the resume/undo contracts of the window stream, and a handful of sequencing traps (the
hearing week is unbuilt; flag lighting order; a mock map before M-W1). Fourteen corrections, none of which changes a
ruling.

---

## 1. Corrections (exact old text → new text)

| # | draft and section | old text (verbatim) | new text | reason, with source |
|---|---|---|---|---|
| C1 | draft-s3, "With M-W2", row H13 | `vassal links and treaty terms (tribute, compelled alliance, treaty-held occupation); pairwise relations; held sites; standing claims;` | `vassal links and treaty terms (tribute, compelled alliance, treaty-held occupation); its occupations, the ledger's and the stressor's records resolved to one; pairwise relations; held sites; standing claims; the per-link continuity verdict whenever its sovereignty market is lit (optional while that market is dark);` | Two items of the H13 row were dropped: "the occupation's two records resolved to their union" and "the per-link continuity verdict whenever its sovereignty market is lit (optional while it is dark)". The occupation hatch and the vassal continuity test both read them (`docs/volumes/V13-world.md` §8.5 row H13 (line 3738); §3.9 (9) (line 1866), (12) (line 1921)). |
| C2 | draft-s3, "With M-W2", row H16 | `patrol coverage re-priced through one distance reader, read only by outcome rolls;` | `patrol coverage re-priced through one distance reader, read only by outcome rolls, and by any route choice only through the host's belief (its known world), the crossing holder likewise;` | The row says any route choice reads coverage "through its belief (the known world), and the crossing holder likewise" — the clause that keeps a map projection from leaking truth into a mover's choice (`docs/volumes/V13-world.md` §8.5 row H16 (line 3741); `research/sf/fp-simulator.md` §2.4 item 3, "truth → belief, through one door" (lines 557–587)). |
| C3 | draft-s6, "The host supplies today", row ENC-HS-01 | `The host's `MapRecord.party` (base §11.3)` | `A record the map's own bridge client defines and the host persists per map — `MapRecord.party` (`@plat/bridge-client`, the host client of volume 8; base §11.3). No `MapRecord` exists in the host clone at 81f1cd96, so this is a record the host creates when it takes the bridge client, not one it keeps today; the party's known places are new host state.` | A host developer searching their code finds nothing: `MapRecord` is exported by the map's `@plat/bridge-client` (`docs/ARCHITECTURE.md` line 21007) and `MapRecord.party` is the party key the host raises "place by place as the host records what the party learns" (line 21251); a grep of the host clone for `MapRecord` returns nothing. The row's heading "supplies today" overstates; the pointer must say what exists. |
| C4 | draft-s6, "FP laws the map obeys", law 7 (ENC-FL-07) | `In the host's weekly "hearing", road contacts and besieged towns become the subjects of the DM's weekly hearings; these are natural places for an encounter crop (an inference).` | `In the host's designed weekly "hearing" (the fold's requirement 24, behind the flag `hearingWeekEnabled`, which exists only in the host's design documents — `docs/DESIGN_FP_GRAMMAR.md:13` — and in no host code at 81f1cd96), road contacts and besieged towns would become the subjects of the DM's weekly hearings; these are natural places for an encounter crop once the hearing is built (an inference).` | The hearing week is a design, not a surface: `research/sf/fp-simulator.md` §2.1 row 24 (line 474) states it as "dark-identical behind `hearingWeekEnabled`"; a grep of the host's `src/` finds no such flag, only the three design documents. The map must not plan a hook on it (see A10). |
| C5 | draft-s8, "Sequencing", step 3 | `which fixes a patrol's timing from the border segment's lineage and the ruling power's host key, never from the week.` | `which fixes a patrol's timing from the road segment's lineage (a stretch of route, not a border) and the ruling power's host key, never from the week.` | The cadence and its phase are per (route segment, power): "A patrol is present in week w exactly when (w + phase) mod everyWeeks = 0, phase the `world.patrol` hash of (segment, power)" (`docs/volumes/V13-world.md` §3.9 (14) (line 1963)); the realm review says "the segment's lineage as the entity key" (`research/sf/fp-realm-review.md` §7 (line 706)). A border segment is the `borderSegment` offer's object, a different thing. |
| C6 | draft-s8, "Sequencing", step 3 | `The host must send a stable key for each power.` | `The "power's host key" is the allegiance root seat's own `hostKey` — the settlement key `bindSeat` writes and `unbindSeat` clears (`docs/volumes/V13-world.md` §2.2 (line 733)); the map asks no separate power, faction or state key of the host (V13 §3.9 (5) (line 1808)), so the host's one obligation is that a seat's key stays the same across advances, undo and import.` | As written, the sentence reads against draft-s5's rule "No budget, cost vector or power key is asked of the host" (V13 §3.9 (5); `docs/AMENDMENTS-2026-10-17m.md` item 714 (5) (line 1006)). Both are right once "power key" is named: it is the root seat's key. |
| C7 | draft-s8, "What the FMG audit found in the host's fork" | `The scale is 3 km per pixel by default, set once at first canonize.` | `The default scale constant is 3 per pixel and the host's comment calls it kilometres, but the host's own coherence fold (OD-FC-22, 2026-10-16) records that the generator's default unit is miles, so the default is 3 miles (about 4.83 km) per pixel and the comment in `src/domain/spatial/modeSpeeds.js:70-77` is wrong; the datum is set once at first canonize.` | `research/sf/fp-physical-integration.md` §6 row I37 (line 341): "FMG's default UNIT is MILES, public/map/index.html:5231, so `DEFAULT_KM_SCALE 3` is 3 mi ≈ 4.83 km and the modeSpeeds.js:66-77 comment is wrong". Spot-checked: `modeSpeeds.js:72` reads "defaults to three km per map pixel", `:77` `DEFAULT_KM_SCALE: 3`. The host developer fixing H2/H7 needs the corrected unit. |
| C8 | draft-s8, "Rulings the host work rests on", J384 (5) row | `A drift raid is not a verdict: it marks the march embattled and moves no line.` | `A drift raid is not a verdict: it marks the march "fighting" (J384's own word was "embattled"; V13 reserves "embattled" for the host's danger ledger and writes "fighting" for the overlay) and moves no line.` | The naming rule in force: "the overlay word is 'fighting', never 'embattled'" (`docs/volumes/V13-world.md` §3.9 (8) (line 1846); the naming rule (line 2445)); draft-s5 states it as the rule "One word, one meaning". The host's `embattlement` is its route-danger ledger (`src/domain/spatial/embattlement.js`), so the word would collide on the host side. |
| C9 | draft-s5, "The binding rules", rule "Two partitions, never one" | `§5.9 sway refusals (line 3247)` | `§5.9 sway refusals (line 3270)` | The sway lens's *Refusals* sentence ("the sway handed to the host as its territory; wild land presented as a host fact …") sits at line 3270; line 3247 is the lens's heading. The same table's other cites slip by one line: the claims row is 3266 (cited 3265), the patrols heading 3274 (cited 3273), the closed-road legend row 3281 (cited 3280), the patrols refusals 3285 (cited 3284) (`docs/volumes/V13-world.md` lines 3247–3285, re-read for this pass). |
| C10 | draft-s5, "What the map reads from the simulation", occupations row | ``worldState.occupations` (read in `src/domain/spatial/embattlement.js`), two records resolved to their union. Dark without the war layer.` | ``worldState.occupations`, the ledger `src/domain/worldPulse/occupation.js` keeps; `src/domain/spatial/embattlement.js` only mirrors its rung ladder (lines 115–139) and takes the occupation state as a caller-supplied input (line 189); the two records (the ledger's and the stressor's) resolved to one. Dark without the war layer.` | Spot check of the host clone: `embattlement.js:26` says occupations live "in worldPulse land"; its `occupationTermOf` (line 139) is a pure ramp over a state the pulse passes in (line 189). The pointer should send the host developer to the ledger, not to a reader. |
| C11 | draft-s6, "Open points", last bullet | `The task's note that the owner answered V13 §11 Q4 "yes" on 2026-10-18 was not verified against V13; this section takes it as given and marks the H5-dependent rows.` | `The owner's answer to V13 §11 Q4 ("1. yes", 2026-10-18, file r item 926) is recorded in V13 itself (`docs/volumes/V13-world.md` §11 Q4, lines 4296–4302) and in the H5 and H22 rows (lines 3730, 3747); the H5-dependent rows are marked accordingly.` | Verified in this pass; an "unverified" note in the final document would mislead the owner. |
| C12 | draft-s8, "Open points for this section", point 5 | `The full patrol and encounter-map asks on the host live in V13 §8.5's host items and the body of the realm review, which this section's extract did not read. Here patrols appear only through sequencing steps 3, 4 and 7 and rulings J384 (3), (5) and (8).` | `The full patrol asks are in the section "Patrols within a territory" and the encounter-map asks in "Encounter maps and world sites"; this section carries only their sequencing (steps 3, 4 and 7) and the rulings J384 (3), (5) and (8).` | In the merged document the gap this open point names is filled by draft-s5 and draft-s6; left as written it tells the owner something is missing that is not. |
| C13 | draft-s8, "What the FMG audit found in the host's fork", events-and-exporters bullet | `and the map frame is mounted without a sandbox.` | `and the map frame is mounted without a sandbox — deliberately, by the host's own comment ("Deliberately not sandboxed", `src/components/map/WorldMapStage.jsx:239`), both postMessage directions pinning the opposite origin instead.` | The audit's finding reads as an oversight; the host's code says it is a choice with a compensating control (origin pinning, `WorldMapStage.jsx:237-239`). H20 retires the fork's origin and CSP, so the host's security reviewer needs the real posture. |
| C14 | draft-s7, "Receipts", events-window row | `The nonce key is lit in no preset until OD-FC-31/32 are built.` | `The advance epoch's flag `advanceEpochEnabled` is already in the host's gated-key manifest (`src/domain/worldPulse/simulationRules.js:241`) and read in five modules, but it is lit in no preset until OD-FC-31/32 are built (`research/sf/fp-simulator.md` §1.12 (line 419)); until then the key is the pulse-history sequence.` | The cited source (`research/sf/fp-realm-review.md` §5 row H9, line 656) does not carry the OD-FC-31/32 statement; `fp-simulator.md` lines 233–235 and 419 do. The host state (flag minted, dark) matters to the host developer and was spot-checked. |

---

## 2. Additions (where each belongs, the text to add, why, with sources)

### A1 — Host-change list, row H22: the carry-forward rule of the additive re-canonize

*Add to the H22 row's "What the host changes" cell, after "every travel-band crossing reported, never silent":*

> The host builds its record over the additive canon **carrying forward, from the record it replaces**, its own
> geometry, cost-law and overlay versions, the slots and sub-records that record holds, and its institution-derived
> port and teleport sets for the seats that record held — as it already carries its scale forward — so the additive
> re-canonize adopts no host law, overlay, slot or other seat's port or circle newer than that record (those stay the
> premium re-canonize's), while the derivations the added territories feed (all-pairs costs, tiers, gates, the
> calibration) re-run under the law carried forward and are reported in the time delta; the H5 conformance fixture
> holds a record so built to the prior record's version stamps and the prior seats' port and teleport sets
> (`docs/volumes/V13-world.md` §8.5 row H22 (line 3747); §3.11.6, the additive canon (lines 2318–2343)). A seat's
> removal is never additive (`unbindSeat` goes to the premium re-canonize, row H4); the map marks everything not yet
> adopted `W_HOST_CANON_BEHIND` (§3.11.6 lines 2325–2331).

*Why:* this is the one clause of H22 that tells the host developer what the new behaviour may and may not do; the
draft condensed it to "adding only the new seats and the territory and water they touch".

### A2 — Host-change list, new sub-section "What every row obliges the host to add beside its code"

*Add after the rules paragraph that opens the section:*

> The host's own constitution (its coherence fold's requirements 15–24 and the war program's laws) binds every row
> above as it binds every host wave. In plain words, each row also owes:
>
> | obligation | what it is, in plain words | the host rule and pointer |
> |---|---|---|
> | a switch, and proof the switch is off | Every optional read lands behind a virtual flag (absent from the defaults, read only as strictly true) or behind a datum that is absent until written (the `kmScale` pattern). The flag joins the host's gated-key manifest in the same commit as its first read, with an authored certification row, and the walker test asserts exactly that one-key change. Four proofs ship with it: a golden captured before wiring showing the output byte-identical with the flag absent; an absent-versus-false differential; a call-path spy proving the gated entry is never invoked dark; a source-scan census that every read is strictly true — plus the lit-mutant control that forces the flag on and proves the first and third trip. A display-only export (the lens window, H23) takes an exempt-keys rationale row instead of a flag. | `research/sf/fp-simulator.md` §3.1 (lines 644–665), §3.2 (666–687), §3.4 item 1 (line 709); host `src/domain/worldPulse/simulationRules.js:230` (`ENGINE_GATED_VIRTUAL_RULE_KEYS`), `tests/lint/` (the walker tests); `src/domain/spatial/spatialDigest.js:571-576` (the data-gated `kmScale` precedent) |
> | a lifecycle for every new stored field | Every field a row persists — H8's time-delta receipt; H13's strength band, force band and garrison presence if stored; H26's shipment path and departure week; H27's column route, carriage and toll; H28's share history; H29's band-change receipt; H10's world record — needs, before its writer is built: a canonical-model entry; exactly one writer; the ten lifecycle paths stated (create, read, persist, regenerate, undo, import, migrate, dark-after-lit, death, veil); a normalizer taught the field in the same commit; "absent, never null"; and a shrink-only source-scan census with an executed third-writer plant. Persisted shape is an owner-gated class (now delegated). | `research/sf/fp-simulator.md` §2.1 row 22 (line 472), §2.6 (613–641), §3.4 item 4 (line 721) |
> | the news joins | Every news kind a row adds — caravan arrivals, starvations and entrepôt foundings (H26); abolition and founding news with the presser named (H28) — registers its five Herald joins and carries an id, a full address chain, a typed action, the affected settlements by name and the recorded reason. | `research/sf/fp-simulator.md` §2.2 law 5 (line 495), §2.6 (line 633) |
> | the borrow census and the vocabulary register | Every band a row mints — strength in fifths and culture distance in fifths (H13), the force band 0–4, the patrol basis words — passes the host's borrow census (no new ladder where an existing one serves) and enters its vocabulary register with a homonym check: "gate", "toll", "sway", "patrol", "territory", "fighting", "prosperity" each have one meaning per surface. | `research/sf/fp-simulator.md` §2.2 J-WR-10/10-B (line 515), §2.1 row 21 (line 471); `docs/volumes/V13-world.md` §5.8 (6) (line 3170) |
> | a coupling row and a cause | Every cross-layer read lands its coupling-registry row in the same commit (the host's walker-enforced inclusion ratchet), and every map-originated event with downstream effects — a canonize receipt, a `physicalChange`, a route charter — is a named `causedBy` parent at mint so the cause walk reaches it. | `research/sf/fp-simulator.md` §2.6 (lines 627–636), §2.1 row 20 (line 470); host `src/domain/certification/couplingRegistry*.js`; `docs/volumes/V13-world.md` §8.5 row H16 "the canon's causes as receipt parents" (line 3741) |
> | a fork row | Every new seeded choice registers in the habit-fork registry (the H24 plague offers and H27 dispatch offer add draws). | `research/sf/fp-simulator.md` §2.6 (line 633); host `src/domain/worldPulse/habitForkRegistry.js:120` |
> | the felt sentence and its latency | A mechanism's first-visible sign must surface within a one-month advance or carry a planting line; DONE means the DM-felt sentence fires in a lit preset on a seeded world, not a green fixture. (The preamble already asks each row for both; this is where the host measures them.) | `research/sf/fp-simulator.md` §2.1 rows 16 and 19 (lines 466, 469); `docs/volumes/V13-world.md` §8.5 preamble (lines 3704–3708) |

*Why:* the preamble lists the tier line, degraded arm, coupling row, first-visible line, measured spreads and felt
sentence, but a host developer reads those as headings; the fold's mechanics behind each are what they will build
on day one, and none of the drafts names them.

### A3 — Host-change list and "Sequencing": the lighting-order trap

*Add as a paragraph after the "Now, on the fork" table, and as step 12 of Sequencing:*

> The host lights its own flags in dependency order as separate lighting units, only when a layer's instrument reads
> satisfied, and "a flag lit out of order is an invalid config each program's convergence walker reds"; flag-minting
> commits serialize across the host's volumes, so a row here that mints a flag cannot build concurrently with one of
> the host's own flag waves in the same worktree. Two rows sit inside that order: H12's genesis mount at world birth
> precedes the host's `routeLifecycleEnabled` and `demographicsEnabled` (its ruling OD-FC-18), and H22's birth canon
> lights every canon-gated lane at once on the host's birth defaults (the crisis columns, the plague front, the routed
> supply links), which the host's population and plague reads call a behaviour switch to be recorded with the owner
> (`research/sf/fp-simulator.md` §3.3 (lines 688–706), §3.1 CQ5 (line 660), §3.4 item 7 (line 730);
> `research/sf/fp-physical-integration.md` §6 row I41 (line 345); draft-s4 rows population-9.3-1, plague-10.2-3).

### A4 — Host-change list: the exact entitlement gate H22 must split (the premium questions)

*Add to the H22 row's "Kind" cell, or as a note under the table:*

> Where the gate lives today: the host's canonize body is tier-blind and lazily loaded
> (`src/store/campaignSpatialCanonize.js:2-16`); the three synchronous gates are read at the store call site —
> in-flight, entitlement (`if (state.auth?.tier !== 'premium') return { ok: false, reason: 'not_entitled' }`,
> `src/store/campaignWorldPulseSlice.js:359-391`) and generated-map (today only a generated reference-map pack is
> admitted; draft-s4 row trade-OQ1). H22's birth canon and additive re-canonize must pass around the entitlement
> gate and replace the generated-map gate with "a canon from the map module"; `unbindSeat` (H4), the
> geometry-shifting re-canonize, a retcon and H19's rebase keep the entitlement gate. Campaigns are themselves created
> only under the premium tier or by staff (`src/store/campaignSlice.js:586`; `docs/PROGRESS.md` row J389 (line 448)),
> so the split bites staff accounts and any future lower tier (`docs/volumes/V13-world.md` §8.5 row H22 (line 3747)).
> Two entitlement questions the host will ask on day one and no source answers: whether the lens window (H23) is
> itself a premium surface ("the SIMULATOR is premium", `research/sf/fp-simulator.md` §2.1 row 17 (line 467)); and
> whether H28's command adopting a DM-placed holy site is gated like a DM authoring act (today "no deity exists until a
> premium DM authors one", draft-s4 row faith-OQ1).

### A5 — Data contracts: the version axes the canon must map onto

*Add to "The canon, versions and digests":*

> **The host already has three version axes; the canon's slots must map onto them.** The host's digest carries a
> geometry version, a cost-law version and a seasonal-overlay version (`src/store/campaignSpatialCanonize.js:17-21`
> imports `SPATIAL_GEOMETRY_VERSION`, `COST_LAW_VERSION`, `SEASONAL_OVERLAY_VERSION`) and an `overlayVersion` for its
> live overlays (`src/domain/spatial/spatialDigest.js:37, 539-541`); the owner's round-16 ruling of 2026-07-11 named
> frozen geometry, live overlays and "three version axes" (`research/sf/fp-physical-integration.md` §6 row I9 (line
> 313)). The canon is versioned per slot — geometry, the cost law as handed in, the travel law, the vocabulary tables,
> the water and sites slots' input hashes (`docs/volumes/V13-world.md` §2.7 (lines 1267–1270)) — and the additive
> re-canonize "steps the version of each slot it moves" while the header's `geometryVersion` and the scale stamp stay
> (§3.11.6 (lines 2331–2333); H6 "carried only within one geometry version", line 3731). The sway overlay is stamped
> "on its overlay version axis" (H16, line 3741): that is the host's `overlayVersion`. The host's own counter
> `spatialCanonVersion` bumps on every re-canonize (`campaignSpatialCanonize.js:40, 184-186`) and must bump on the
> additive one too (J388's "version step"). A day-one question: does `spatialCanonVersion` become the canon's
> `geometryVersion`, or stay the host's counter with the slot hashes stored beside it?

### A6 — Data contracts: resume after a long unbound span, and the order of messages after undo

*Add to "History and the time scrub":*

> **Two contracts the window stream still needs.** (1) *Catching up.* The host's pulse-history ring keeps 80
> advances (`src/domain/worldPulse/advanceInterval.js:130`, `MAX_HISTORY=80`), its news 240 items and its population
> rows 12 (`research/sf/lens-implications.md` §4.6 (line 489)); the events window is keyed by that sequence while the
> epoch is dark (H9). A map unbound for more than 80 advances — a DM who never opens the world view — cannot be caught
> up from the host. The contract must say whether the host keeps a per-map cursor and replays from its ring, or
> whether the map declares the missed span a gap (`W_LENS_PLATE_GAP`, `docs/volumes/V13-world.md` §5.8 (8) (lines
> 3202–3204)); the retention law is the host's requirement 23 (`research/sf/fp-simulator.md` §2.1 row 23 (line 473)).
> (2) *Order after undo.* The host's undo discards a suffix of its pulse history and "a pulseHistory entry, once
> written and committed, is NEVER rewritten" (`fp-simulator.md` §2.4 item 9 (line 584)), so sequence numbers are
> reused after a rewind; the rewind-replace (V13 §5.8 (8), line 3201) must reach the map before the first
> post-rewind window, or a new plate lands on a key a dropped plate used.

### A7 — Data contracts: undo of a consumed offer

*Add to the `consumed` row of the receipts table, or as a note after it:*

> **Open:** when the host undoes an advance whose tick head applied a `physicalChange`, or whose outcome rolls read a
> `patrolOffer` or the sway overlay, nothing yet says whether the `consumed` acknowledgement is revoked or re-issued.
> H15 says `consumed` is sent and H9 re-sends the events window after undo (`docs/volumes/V13-world.md` §8.5 rows
> H9, H15 (lines 3734, 3740)); the map's offer ledger would otherwise show a change the simulation no longer holds. A
> day-one question for the host, answerable from its undo path (`src/domain/events/undoEvent.js`).

### A8 — Data contracts: the port envelope, and a mock map before M-W1

*Add to "Who writes what":*

> Every port message carries the canon envelope's version vector — the world header, the per-slot versions and
> input hashes, the cost law as handed in, the causes since the prior canon and the skipped list — and V08's host
> client carries each message so versioned (`docs/volumes/V13-world.md` §3.11.6 (lines 2305–2311); `docs/ARCHITECTURE.md`
> line 12898; BCR-V13-11, V13 §10). The map tests its side against a mock host (T-V13-37, §8.4 line 3699); the host
> has no mirror. Recommendation: publish V08 §2.2's message unions first and let the host build a **mock map** from
> them, so H4–H17 can be built and golden-tested (the dormancy fences of A2) before M-W1 lands rather than after.

### A9 — Data contracts, "The two closing rules": one audience projector, the host's own

*Add after the audience paragraph:*

> **The DM-secret layers: reuse the host's projector, never a second one.** The host already projects audience in one
> place — `src/domain/display/worldSnapshotPublic.js` (hard-denies `religionStates`, line 96; strips every covert, seed
> and prose key by `COVERT_KEY_RE`, line 147) with `publicSafe.js` beside it — under the war program's law 6, "premium
> isolation + audience projection (`includeCovert` / `includeGroundTruth`)" (`research/sf/fp-simulator.md` §2.2 (line
> 497)); its channels carry `visibility: 'gm'` and `'hidden'` (`src/domain/region/graph.js:90, 683-718`); belief
> reaches anything only through the `infoMode` gate ("truth → belief, through one door", `fp-simulator.md` §2.4
> item 3). The per-row audience of the events and lens windows (H9, H23) and the believed view (H17) must come from
> that one projector — `hidden` never sent, `gm` folded DM-only, the party's rows from the belief map — not from a
> new allowlist in the port client; the faith read records that published maps already drop the DM-default faith
> fronts and reject a snapshot carrying a latent pantheon server-side (`research/sf/faith-system.md` §9.1 (lines
> 1145–1148), §9.4 "engine state, not public" (line 1192)). A single writer for audience is the host's own L4 rule.

### A10 — Encounter maps and world sites: the hearing week is unbuilt (a sequencing trap)

*Add to "The host lacks", as a new row ENC-HL-13:*

> | The hearing week: the host's designed pause at a one-week advance where every engagement between settlements is docketed with "who, upon whom, where, the default verdict" and the DM may leave, tilt or give the verdict. (ENC-HL-13) | H16's "border segment as a hearing card's where" and this section's law 7 assume it; `borderSegment` has no host consumer until it lands. Every engagement kind needs a place the map can name, so the host's engagement registry is where the map's typed places and border segments will be read. | The fold's requirement 24 (`research/sf/fp-simulator.md` §2.1 row 24 (line 474)): "dark-identical behind `hearingWeekEnabled`"; the flag appears only in the host's design documents (`docs/DESIGN_FP_GRAMMAR.md:13`, `docs/DESIGN_FP_FAITH.md`, `docs/DESIGN_FP_ARCH_POP.md`), in no code at 81f1cd96. | Not scheduled; "nothing is scheduled to be built on the host side yet" (law 9). | `research/sf/fp-simulator.md` §2.1 (line 474); `docs/volumes/V13-world.md` §8.5 row H16 (line 3741) |

### A11 — Patrols within a territory: no patrol on water, and the owner's water-route directive

*Add to "The binding rules", a new bullet:*

> - **Patrols are per road segment; water has none.** The cadence is set per (route segment, power), its inputs are
>   garrisons, hostility and the road grade (`gradeShift`), and the sway crosses water only along the host's lit
>   lanes to a coastal lodgement (`docs/volumes/V13-world.md` §3.9 (14) (line 1963), (6) (line 1814)); no sea patrol
>   exists in the design, and the only water "watch" is the host's own naval blockade (W11, host-owned,
>   `research/sf/fp-physical-integration.md` §2.4 (line 90)). The owner's directive of 2026-08-01 that "naval/sea/river
>   routes MUST NOT BE NEGLECTED: water routes form and fade ORGANICALLY exactly as land routes do" and "one
>   calibration, all movers" (`fp-physical-integration.md` §6 row I20 (line 324)) means H12's "route changes and grades
>   per window" must include the lived state of water lanes as well as roads; a host developer should not expect the
>   patrol layer to cover them.

### A12 — Patrols within a territory: one host treaty term, three drawings

*Add to "What the map reads from the simulation", after the vassal-links row:*

> The host's one subordination set — tribute, compelled alliance, puppet seat, a treaty-held occupation — is drawn
> three ways on the sway: as a member link (a vassal, a puppet seat, an occupation at its vassalized rung), as a band
> and a relation (a tributary keeps its own sway in its overlord's band; a compelled ally is "respect"), and as an
> overlay (an occupation short of vassalage, a treaty-held one included). V13 records the divergence as J-V13.67; the
> host developer should expect one treaty term to appear in three places and not read it as three facts
> (`docs/volumes/V13-world.md` §3.9 (9) (line 1866); `docs/AMENDMENTS-2026-10-17m.md` item 714 (9) (line 1041)).

### A13 — Encounter maps and world sites: host-side gaps the fabric crosswalk records

*Add as a short sub-section "Where the map's design and the host's own fabric charter part" before "Map-side items":*

> The host's settlement-map fabric charter (its `DESIGN_FP_ARCH_MF.md`, ruled out of its simulation program as a
> map-family document, OD-FC-38) is evidence for this design, not its decision rule; V13 keeps a crosswalk row per law
> (`docs/volumes/V13-world.md` §10 BCR-V13-32 (lines 4166–4186)). Four rows are conflicts ruled against the charter —
> the forced-fact law (J-V13.75), the water mode (BCR-V13-33: a frame whose dossier is not riverside is never bisected),
> relief (BCR-V13-34) and reroll (BCR-V13-35: every generate and reroll mints entropy, recorded) — and two are owed
> (terraforming and visible work; the wall trace). Three facts in the charter's own text are the host's to settle:
> no typed founding record exists (`settlementReason` is prose; MF-P1), so the "planned geometry" morphology band is an
> authored override, never a derivation (`research/sf/fp-physical-integration.md` §3.3 (lines 207–213)); the fabric
> draws in a y-down frame while the world is +Y north, and the flip "is owed by the first wave that publishes a
> world-framed artifact" (ODQ §303.6; `fp-physical-integration.md` §6 row I35 (line 339)) — the same adapter as H6's;
> and the realm-coherence law of the host's older settlement-map design ("the town site is a zoom-in of its realm
> position") is the one host sentence the charter closes (`fp-physical-integration.md` §3.4, last bullet (lines
> 225–228)).

### A14 — Risks on the host side: storage and size

*Add as a row of the risks table:*

> | The world record per campaign is far larger than anything the host stores for a map today. | A continent world is at most 24 MB gzipped, a realm 11 MB, a province 3 MB, with up to 100,000 reason records (`docs/volumes/V13-world.md` §2.7 (lines 1296–1298)); the host's opaque snapshot is 100 KB to 1 MB and its frozen digest is capped at 400,000 bytes (`research/fmg/notes/sf-host-fmg-integration-audit.md` §3.4 (line 130), §4.2 (lines 149–151)). H5 keeps the digest's reader-facing shape and cap; the world document under H10 is a separate store with its own quota, backups and lifecycle (row H10, line 3735). | The host must size its per-campaign quota and backups before H10, and decide how the public gallery's shared map blobs (host `supabase/migrations/045_gallery_maps.sql`, `046_gallery_map_with_campaign.sql`, `088_share_gallery_maps_campaigns.sql`) carry or omit a world record — the audit's unknown "whether gallery import of map blobs across users is still enabled, and how those blobs would migrate" (audit §7.4 (line 269)). The map's own budget rows: `plates.storeMbGz` 4 at the realm rung after 300 years (`WORLD-14`, V13 §6 (line 1120)). | `docs/volumes/V13-world.md` §2.7, §6; audit §3.4, §4.2, §7.4 |

### A15 — Risks on the host side: performance and the first-paint ratchet

*Add as a row of the risks table:*

> | Every row must stay off the host's first screen. | The host's canonize body is already a lazy dynamic import kept out of the first-paint entry closure, verified by an entry-closure ratchet test (`src/store/campaignSpatialCanonize.js:5-12`; `tests/build/vendorPdfLazy.test.js`); the port client, the lens-window assembly and the events window must follow that pattern (every row "landing as a lazy leaf under the host's first-paint ratchet", `docs/volumes/V13-world.md` §8.5 preamble (line 3708); the war program's monotone ratchets, `research/sf/fp-simulator.md` §2.2 law 4 (line 494)). | The lens window per advance is bounded by the host's rings (80 pulses, 240 news, 12 population rows) and the map's `WORLD-14`/`WORLD-15` budgets; the SP-W8 fallback needs the host to name the settlement pairs it wants refined and its water K (`CanonRequest.waterK`, V13 §2.2 (line 791); §8.4 (line 3700)). | V13 §8.4, §8.5; fp-simulator §2.2; host files |

### A16 — Risks on the host side: determinism obligations

*Add as a row of the risks table:*

> | The port client must live where the host's purity lint reaches. | The host bans `Math.random`, `Date.now`, locale reads and unsorted key iteration in its engine paths by lint, with entropy only at the store layer (`research/sf/fp-simulator.md` §2.2 law 3 (line 492), §2.5 (line 601)); the map-slice ids it mints from the clock (audit §4.1 (line 141)) must never become `hostKey`s; the map never asks the host to recompute `patrolAt`'s phase, so the two hash families (the host's `hash01`, the map's mixer) never have to agree. Every row that moves output on an existing campaign is a declared same-seed shift recorded with its cause (`fp-simulator.md` §2.5 (line 607)); phases 0–3 move none, H22 is a declared shift for new campaigns only. | A port client written outside the linted folders, or a key minted from the clock, breaks "same seed and inputs ⇒ byte-identical output, forever". | fp-simulator §2.2, §2.5; audit §4.1; V13 §8.5 preamble |

### A17 — Everything else: the questions the host team will ask on day one

*Add as a new sub-section after "Open owner questions":*

> Answerable only by the host or the owner; none is settled by the sources read.
>
> 1. Which key is a seat's `hostKey` — the settlement's save id, the generator's burg id, or another — and does it
>    survive gallery import and copy? (`docs/volumes/V13-world.md` §2.2 (line 733); audit §4.1 (line 141).)
> 2. Where does the port client run — the page or a worker — and does the map package ship inside the host bundle
>    under the first-paint ratchet? (V13 §8.5 preamble (line 3708); host `campaignSpatialCanonize.js:5-12`.)
> 3. Does `spatialCanonVersion` become the canon's `geometryVersion`, or stay the host's counter beside the slot hashes?
>    (A5.)
> 4. What happens to `consumed` when the consuming advance is undone? (A7.)
> 5. How is a map caught up after more than 80 advances unbound? (A6.)
> 6. Is the lens window a premium surface, and is the holy-site adoption command gated like DM authoring? (A4.)
> 7. Which reader opens the host's own 1.114.2 snapshots after the fork retires? (Open point 2; RK-07.)
> 8. Has any instant world ever canonized, and what does `cells.g` mean on older packs? (audit §7.4 (lines 265–271).)
> 9. What replaces the generated-map gate for a canon from the map module? (A4; trade-OQ1.)
> 10. Who writes the shared `party` key when both the host's reveal and a DM edit touch it? V14 makes it "a mirror of
>     `MapRecord.party` when a host is bound, written by the owner and editor roles" — two writers unless the host's
>     reveal is the single writer while bound (`docs/volumes/V14-sites.md` §10.1 BCR-V14-19 (line 3036); §2.3 (lines
>     766–768)).
> 11. Does the host's week unit line up with the map's: `INTERVAL_WEEKS` and the 4-4-5 calendar on the host
>     (`src/domain/worldPulse/advanceInterval.js:102-106`) against the map's `Week` and the plates' "last of each host
>     quarter" thinning (V13 §5.8 (8) (lines 3197–3200))? With a year-long advance the 520-week full-resolution horizon
>     is ten plates.
> 12. Does the host's `foundry-module/` (present in the clone; unread by the audit, §8 (line 296)) read the
>     generator's Full JSON, and will it read the map's ecosystem-shaped export unchanged? The wider ecosystem's
>     Foundry importer needs the Full JSON plus a picture (`research/fmg/notes/fmg-roadmap-and-ecosystem.md` §7 (lines
>     229–258)).

### A18 — Host defects: which H-row answers which defect

*Add after the "Words used in the tables" list, before the Faith table:*

> The lens asks H24–H30 were written from these reads; the cross-index below says which rows close which defects, so
> the host can see what a row buys.
>
> | H-row | the defect or open question it answers |
> |---|---|
> | H24 plague | plague-9-9 and plague-10.2-5 (a front history the prune destroys); plague-10.1-17 (one-week hops for unmapped settlements); plague-10.1-1 and plague-10.2-4 (the condition gap when a plague arrives); plague-10.1-25 (the uncapped loop); plague-10.1-23 and plague-10.2-7 (the ledger's second plague); population-10.2-4 (a crisis served twice); plague-10.1-13 (weeks-away ignores the season) |
> | H25 sway and patrols | alignment-27 and alignment-25f ("same governing name"); trade-38 (the sea-lanes switch copy); trade-7 (a DM-cut road stops no caravan); trade-OQ4 and trade-OQ6 (patrol coverage's host meaning; the unowned wardenship slot); trade-OQ7 (a war front with the war layer dark); J384 (3) (the strength order) |
> | H26 trade | trade-5 and trade-OQ3 (no stored path or departure tick); trade-36 (arrivals and starvations are not news); prosperity-D9 (purchase news names no settlement) |
> | H27 populations | population-10.2-2 (a DM-approved exodus never travels); population-10.1-1 (road tolls dropped); population-10.2-5 (the chosen route versus the stamped time) |
> | H28 religion | faith-25b, faith-25d and faith-OQ3 (deity key and source on a mint; fronts never retired); faith-OQ9 and J384 (10) (holy sites); alignment-22 (prescription "converts"); alignment-21 and alignment-26 (institution founding and abolition) |
> | H29 prosperity | prosperity-D8 and prosperity-9-12 (no band history); population-10.1-6 and prosperity-C9 (the realm-wide donor pool); prosperity-9-15 and prosperity-Q-b (the town plan re-reads the live band) |
> | H30 alignment | alignment-25b (a per-pulse export); alignment-9a, alignment-9b and alignment-25e (drift decay) |
> | no row yet | population-10.2-13 (the host timelapse reads population deltas as a map, so the map's scrub cannot reuse its frames until it is fixed); trade-2 and trade-OQ5 (the null birth door, which the regime banner of every lens depends on); prosperity-D1 (the prosperity sort) |

### A19 — Host-change list, row H1: which export the read-only command should return

*Add to the H1 row's "What the host changes" cell:*

> The read-only command should return the generator's **Full JSON** export, not a `.map` file: the Full JSON carries
> `cells.g` (the only link from the packed mesh back to the grid), `p`, `v` and `c`, while a `.map` omits `g`, so a
> `.map` cannot be mapped back to its grid without re-running the generator's pack step
> (`research/fmg/notes/fmg-data-model-and-io.md` §7b (lines 341–347)); V13 §2.8 reads exactly that export (lines 1310–
> 1312). The audit's unknown "what `cells.g` means on older packs" (audit §7.4 (line 270)) is the same question.

### A20 — Data contracts: the advance epoch and THE PROMISE as amended

*Add to the events-window row's note:*

> When the host lights its advance epoch (OD-FC-31/32), THE PROMISE changes shape — "a seed is a starting world,
> forever; a lived history, once lived, forever": two DMs sharing a seed share the starting world, not the future
> (`research/sf/fp-simulator.md` §2.5 (lines 590–596)). The window key switches from the pulse-history sequence to the
> nonce mid-campaign as a declared shift; the map's plates must tolerate both keys on one campaign.

### A21 — Patrols within a territory: where the 300-year soak runs

*Add to the H16 row of "The host changes these lenses depend on":*

> The soak that unlocks the per-gate policy offer is the map's own test, T-V13-41 (d), 300 simulated years under the
> B-POLITY corpus with the polity cells measured (`docs/volumes/V13-world.md` §11, the ruled paragraph (line 4304);
> §12 (line 4342): every `world.polity` cell is UNMEASURED until B-POLITY measures it). It cannot run before M-W2 and
> its measurement, so the host should plan the gate offer as the last of H16's parts, not the first.

---

## 3. Missing sources (bearing on the document, cited by no draft)

- `research/sf/fp-simulator.md` §2.1 (lines 461–481), §2.2 (483–530), §2.4 (557–587), §2.5 (588–612), §2.6 (613–641),
  §3.1–§3.4 (644–735) — the host's constitution as it binds every row (A2, A3, A6, A9, A16, A20).
- `research/sf/fp-physical-integration.md` §3 (181–229) and §6 rows I9, I20, I35, I36, I37, I41 (lines 313–345) —
  the version axes, the water-route directive, the owed y-flip, the owner's post-launch order, the scale-unit
  correction (A5, A11, A13, C7).
- `docs/volumes/V13-world.md` §3.11.6 (2286–2346: the consumption law, the canon envelope, the additive canon,
  `W_HOST_CANON_BEHIND`, `W_TRAVEL_BAND_CROSSED`); §10 BCR-V13-11 and BCR-V13-32 (4166–4186); §2.2 line 791
  (`CanonRequest.waterK`) and 733 (`hostKey`); §6 lines 1115–1120 (`WORLD-14`/`15`).
- `docs/ARCHITECTURE.md` lines 12898 (the world port's envelope and the never-logged presentation inputs), 21007
  (`@plat/bridge-client` exports `MapRecord`), 21251 (`MapRecord.party`), 4200 (the shared `party` key's two writers).
- `docs/PROGRESS.md` row J389 (line 448) — the correction that the host does not re-canonize on a settlement
  founding and that campaigns are premium-only (cited by no draft, though draft-s8 carries its substance).
- Host files spot-checked for this pass: `src/store/campaignWorldPulseSlice.js:359-391` (the three canonize gates);
  `src/store/campaignSpatialCanonize.js:2-21, 40, 126-134, 184-186`; `src/domain/worldPulse/simulationRules.js:31,
  230, 241`; `src/domain/spatial/spatialDigest.js:37, 539-541, 571-576`; `src/domain/spatial/modeSpeeds.js:70-77`;
  `src/domain/display/worldSnapshotPublic.js:96, 147`; `src/domain/region/graph.js:90, 683-718`;
  `src/components/map/WorldMapStage.jsx:237-239`; `src/domain/worldPulse/advanceInterval.js:102-106, 130`;
  `src/domain/display/armyStrength.js:44-54` (the five floors are a word table for "LATENT (theoretical) strength",
  confirming H13's "existing five latent-strength floors"); `src/domain/spatial/embattlement.js:95-96, 115-139, 189`;
  `src/domain/worldPulse/occupation.js`; `src/domain/worldPulse/habitForkRegistry.js:120`;
  `src/domain/certification/couplingRegistry*.js`; `src/store/campaignSlice.js:586`;
  `supabase/migrations/045_gallery_maps.sql, 046, 088`; `docs/DESIGN_FP_GRAMMAR.md:13`; `foundry-module/`;
  `tests/lint/` (the walker tests). Confirmed as the drafts state them: `relationshipRuleHelpers.js:312`,
  `relationshipRulesCore.js:764`, `cultureDistance.js:165`, `migrationKernel.js:154`, `timelineTrack.js:81-86`,
  `mapRuntimeConfig.js:20` (`sfdrop16`), `spatialPackCapture.js:287-290`, `public/map/index-Bp79q281.js` (exports
  `Settlements`, two hits), `seaLanes.js:102, 458`, `spatialCost.js:241`, `_cutRoutes` (settlementSlice, undoEvent),
  `advanceEpochEnabled` (five modules), `includeCovert` (three components).
- `research/fmg/notes/fmg-data-model-and-io.md` §7b (lines 341–347) — the Full-JSON-over-`.map` guidance (A19);
  `research/fmg/notes/fmg-roadmap-and-ecosystem.md` §7 (229–258) — the ecosystem surfaces the host's Foundry module
  may need (A17 q12); `research/fmg/notes/fmg-human-layers.md` §5 (306–338) — "routes must exist before the host
  computes anything connectivity-dependent", the ordering H12 already honours.

## 4. Summary

The six drafts report the H-rows, the patrol and encounter asks, the data contracts and the 262 host-side findings
faithfully, with current line numbers; the corrections above are two dropped H13 clauses, one dropped H16 clause, a
wrong unit (miles, not km), a pointer to a record that exists only in the map's bridge client, a design presented as a
host surface (the hearing week), a "border segment" that should be a road segment, a word ("embattled") V13 reserves
for the host, and a few one-line slips. The additions are the host's own constitution applied to each row (flags and
dormancy fences, persisted-shape lifecycle, news joins, vocabulary register, coupling rows), the exact premium gate
H22 splits, the version axes the canon maps onto, resume-and-undo contracts for the window stream, the unbuilt
hearing week, a mock map before M-W1, storage and first-paint obligations, no patrols on water, the defect-to-H-row
cross-index, the Full-JSON export for H1, and twelve day-one questions only the host or the owner can answer.
