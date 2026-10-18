# The realm review critic — gap list (workflows/36b, critic seat)

> PENDING FABLE REVIEW — written by Opus 5.5 standing in for the Fable seat check/realm-m-critic; to be retrovalidated overall at the next opportunity (owner, 2026-10-17, J375)

The completeness critic of the realm review (research/sf/fp-realm-review.md, docs/AMENDMENTS-2026-10-17m.md as applied, docs/validation/coherence/realm-m.md), recorded verbatim. Its fifteen gaps are carried by amendments n (workflows/40-lens-design.js, group G); J385 rules gaps 5 and 15.

**Completeness critique of the realm review (`research/sf/fp-realm-review.md`), amendment file m (items 659–779) and its application record `docs/validation/coherence/realm-m.md`**

Five material gaps are missing (items 1–5). All seven questions were checked against the sources.

## What is covered

- **(1) Ledger rows.** Of the 24 rows in `fp-physical-integration.md` §8, 20 are handled:
  - D1, D10, R7, A2 and T2 by J-RR.3 (the canon's crossings; the host keeps its all-pairs costs, tiers and candidate routes).
  - D16 by J-RR.25 and BCR-V13-31; T9 by J-RR.15 (`vertexClass`); E3 by `RouteCostLaw.slopePerPct` (V13:801).
  - W4 by J-RR.20; R2 by J-RR.16; R3 by J-RR.18; R5 by J-RR.19 (`origin:'user'`, V13:643); R6 by J-RR.19 (`byClassM`).
  - A4 through `landmass`; S2 through `TravelEdge.classA/classB` plus `routeFacts`' seasonal sets; S9 through `iceWeeks` (V13:646).
  - M2 and L1 by J-RR.44; M3 through `waterRuns`; M4 through the `hidden` grade.
  - The four remaining rows (T3, R4, C2, and T1 through the satellite consumer) are items 1, 2 and 7.
- **(2) Fold requirements.** 15, 17, 20, 21, 22, 23 and 24 are carried (RR-7, RR-8, RR-36, J-RR.7, J-RR.38, J-RR.42; item 705). The rulings OD-FC-18 (H12), OD-FC-22 (J-RR.10, J-RR.14, H3), OD-FC-28 (the travel law as data, J-RR.11), OD-FC-38 (J-RR.28) and OD-FC-17 (through §764, Q-RR-2) are carried. Requirements 16, 18 and 19 are item 10.
- **(5) Applied texts.** The base, proposal and brief agree with V13 §3.11.6 on the port. The residue words `seats(world`, `TerritorySeed`, `costVector` and `port: true` are gone from the live texts [OBSERVED grep]. The bundle check reports up to date [OBSERVED]. The places where they still disagree are items 3 and 11.
- **(7) Territory rules.** These terms are honoured:
  - The per-settlement cap, the bound, and exponential growth in tier (V13:1657-1663).
  - Fading with relative distance, neighbour dynamics, and the continuous chain of vassals.
  - Military strength as the tie-breaker under the ceiling, fights over the march, and patrols.
  - T1's occupation as an overlay, garrisoned sites as claim points, encounters and border posts; J382.
  - The owner's words in items 659–661 are verbatim, typos and double space kept [OBSERVED].
- **M0.** None of the fixes below touches `plat/packages/kernel`. The only kernel-adjacent rows (the `world.patrol` concern and the stage ids W8a and W8b, appended through BCR-V13-8) are already flagged in realm-m.md:36-43.

## Gap list

**1. MEDIUM — Row T3 (the settlement's terrain word) lost its host-change item. (Q1, Q5)**
- The review's H14 says a world-chartered settlement takes "the terrain inputs from the world" (fp-realm-review.md:644) [OBSERVED].
- V13's H14 (V13:3106) and §3.11.6's charter text (V13:2129-2130) carry only the access word [OBSERVED].
- The proposal's mapping "6 → H14" drops both the terrain flip and "the advisory terrain-agreement toast becomes a hard contract".
- Consequence [INFERRED]: in a world-first campaign the host still rolls its seven-value terrain word at random (fp-physical-integration.md:395). The `dossier` term (weight ∞, V13:1873) then contradicts the charter at `bindPlacement`.
- **Fix:**
  - Append to V13 H14: "and its terrain word, derived from the charter's relief, biome and water facts by the inverse of DR1's relief-class row (the table the `dossier` term reads), before generation."
  - Make the proposal's §6 mapping read "6 → H14 (access and terrain word from the charter; the terrain-agreement notice retired, its role taken by `refuse.charter.dossier`)".

**2. MEDIUM — The host's satellite-ground reader loses its source. (Q1: T1/T5)**
- The host's satellite topography classifies each candidate cell's landform from the frozen per-cell cost and territory arrays (`src/domain/worldPulse/steadingTopography.js:10-29,288-361`). Its certification row reads the cost at the site's cell (`subsystemRowsWaves.js:78`) [OBSERVED].
- The canon's sites slot is `ground: WorldPointCm[]`, points only (V13:695). H5 (V13:3097) moves "cell-level readers to per-seat queries and points" but never names this reader [OBSERVED].
- **Fix:**
  - V13 §2.2: change the sites slot to `ground: { at: WorldPointCm; terrainClass: string /* adapter class table */; costBand: number /* integer, the host's cost law */ }[]`.
  - H5: add "the satellite-ground reader and its certification row read the ground's class and cost band".

**3. MEDIUM — Two host-change lists that disagree. (Q5, Q1: C2)**
- The proposal points at the review's §5 list (H1–H21); V13 §8.5 holds a shorter copy.
- V13's copy silently drops:
  - from H12: per-evaluation ports totality, the quiet-quay check, and "the move-lock's release named per seat";
  - from H13: "claims";
  - from H14: the terrain inputs (item 1);
  - from H16: "route limits" and "flood exposure for new worlds".
- "Limits as an on-demand reading" (RR-16, fp-realm-review.md:245) landed nowhere in V13 [OBSERVED grep]. It was the only trace of row C2.
- `PolityFacts.claims` (V13:710) is now sent by nothing and read by no rule: W8b's input list (V13:1636-1641) omits it.
- **Fix:**
  - Make V13 §8.5 the single source: a dated bracket in review §5 saying "superseded by V13 §8.5".
  - Restore the H12 clauses.
  - Strike "route limits" and "flood exposure" from the review, or define them.
  - Either add `claims` to H13 together with a W8b reader (draw as a DM-view claim outline), or strike the field.

**4. MEDIUM — T2's "exponential to the size, tier, prosperity" is only half honoured, and V13 §1.3 over-claims it. (Q7, Q5)**
- V13:276-277 says "reach bounded but exponential in tier, size and prosperity".
- But `kSize` is 0.85 / 1.00 / 1.15 and `kProsperity` is 0.70 → 1.30 in steps of 0.10, both arithmetic (V13:944-945). Only tier is geometric (V13:1659-1661; J-V13.64) [OBSERVED].
- **Fix:**
  - Make both tables log-linear: `kProsperity` = 1.1^(rung−3) = 0.75 / 0.83 / 0.91 / 1.00 / 1.10 / 1.21 / 1.33; `kSize` = 1.15^(third−1) = 0.87 / 1.00 / 1.15.
  - State in §3.9 (7) that "ln reach is linear in tier rung, size third and prosperity rung, capped by capTier". §1.3 then holds.
  - Alternatively, correct §1.3 and record the reading as deviation (l) in file m's list.

**5. MEDIUM — A deferred decision that should be an owner question. (Q6)**
- Who keeps a gate is left to "an owner-signed re-ruling" (J-RR.53, fp-realm-review.md:612; H16, V13:3108; V13:1750-1752). The choice is the intermediary settlement (Phase 5.5 §II.3-4-e) or the political holder of the crossing.
- No owner question asks it. It is the owner's own "hold the pass, hold the trade" (Phase 5.5 §2) colliding with T3's enforcement.
- **Fix:** add V13 §11 Q5, "Who keeps a gate under the sway?". Recommendation: keep the intermediary settlement until B-POLITY's soak, then offer the crossing holder as an owner-signed per-gate policy. Mirror the question in the brief's §6.

**6. MINOR/MEDIUM — The fabric crosswalk is named but empty. (Q3)**
- BCR-V13-32 (V13:3485-3488) lists the laws and the five statuses but assigns none [OBSERVED].
- MF-R2, the town-level side of MF-5, terraforming and visible work, morphology's MF-P1 founding-record gap, and the wall-trace law have no status anywhere.
- **Fix:** write the rows into BCR-V13-32:

| Law | Status |
|---|---|
| terrain-first | met (S1 inside the charter) |
| forced-fact | conflict ruled, J-V13.75 |
| morphology / MF-P1 | realm seam open (the host's founding record is prose) |
| §5.0b water mode | conflict ruled, BCR-V13-33 |
| terraforming / visible work | status owed by the base's epochs |
| MF-3 and §164a (a) | met, BCR-V13-30 |
| §164a (b) | met, BCR-V13-31 ("standalone, none") |
| MF-5 | met (integer-cm frames, base scale bar ARCHITECTURE.md:418; world bar BCR-V13-31) |
| §15.2 | met for the auto forms, BCR-V13-36 |
| §11.3 road drift | met for the host, `roadsAt` |
| MF-R2 | met (player views project the stored document, never re-derive behind the audience wall) |
| relief | conflict ruled, BCR-V13-34 |
| reroll | conflict ruled, BCR-V13-35 |
| razing bearing | met, BCR-V13-36 |
| wall-trace | status owed |

**7. MINOR — Row R4 (bypass geometry) has no disposition. (Q1)**
- The network change kinds stop at chartered / promoted / demoted / abandoned / revived / facet / retract (V13:723) [OBSERVED].
- **Fix:** add `bypass` to the network table (the avoided seat, the host's avoidance radius), re-laid as a dated lay version under the same host key, with the hysteresis the host's. Or state in §8.5: "stays the host's until route lifecycle §5c lands".

**8. MINOR — Patrol cadence ignores military strength, and two parts of the manager's reading are dropped without record. (Q7: T3)**
- §3.9 (14) (V13:1753-1764) derives cadence from garrison distance, hostility and grade only [OBSERVED]. The manager's reading had "intensity derived from military enforcement".
- "Embattlement events" as march movers are also dropped without being recorded among file m's deviations (k).
- **Fix:**
  - Add a cell `patrol.forceShift`: force band ≥ 3 makes the cadence one rung denser, force band ≤ 1 one rung sparser.
  - Add both items to deviation (k), with the embattlement phase drawn through `hostOverlay` only.

**9. MINOR — A dossier fact changed after placement has no stated world path.**
- The `dossier` term is scored at the placement edit only, and the world re-blends only on a placement edit or a world terrain re-derivation (V13:1078, 1955-1962, 2020-2034) [OBSERVED].
- The host's labelled re-terrain (J-D1 (c)) and its Edit Mode world-fact card [STATED fp-simulator.md §4.4] can change a placed settlement's relief, coast or river.
- **Fix:** add to §3.11.5: "a dossier event changing a DR1/DR29 site fact of a placed frame re-runs P2–P3 under the new fact (bearing first, blend second; origin never moved under `hostLocked`); where no blend meets it, `W_PLACE_ANOMALY` with the nearest lawful origin offered."

**10. MINOR — Requirements 16, 18 and 19 and war law 1a-4 are absent from the host waves' obligations. (Q2)**
- The review's §5 preamble lists only 17, 20 and CW-0 (fp-realm-review.md:624-626).
- H13 asks the host to mint new band rows (culture in fifths, a renormalised force band). These need requirement-18 measured spreads or UNMEASURED.
- The sway's 13-week prosperity dwell gives no sign within a one-month advance (requirement 16).
- **Fix:**
  - Extend the preamble: each host wave also carries its FIRST-VISIBLE line or planting line (16), measured spreads or UNMEASURED for every new band (18), its felt sentence (19), and is a lazy leaf under the first-paint ratchet (war §1a law 4).
  - Add to §3.9 (13): a pending trigger is shown at once in the events layer as a planting line.

**11. MINOR — Stale or inconsistent cross-references. (Q5)**
- V14 §10.2 request (5) still says "W8's `foreignCulture`" (V14:3038).
- Base §11.3's host clock "reaches the map only as dossier events and epochs" (ARCHITECTURE.md:17628-17630) omits world windows. Add "for a world document, door (5)'s windows".
- V13 §8.2 gates neither T-V13-44 (add it to M-W1) nor T-V13-45 (add it to M-W3) (V13:3047-3050, 2989-2990).
- V13:55's rule "items 200 and above file f's" is stale now that 659–662 are owner rules.
- An unindented continuation line at ARCHITECTURE.md:17588.
- The record realm-m.md checked "found once" only, with no cross-document consistency pass, so none of these were caught.

**12. MINOR — Requirement 21 collision.**
- "claimant" and `claims.claimant` (V13:710; the claimant named in §3.9 (8)) clash with the host's landed succession word: heir = 'claimant' (`src/domain/display/causeLifecycleVocabulary.js:113`; `npcAgency.js:30`) [OBSERVED].
- **Fix:** rename to `outranked` in prose and `claims: { by; target }`, and add the word to J-V13.78 and the port's law (9).

**13. MINOR — Reading gaps still open. (Q4)**
- Closed: V13 §2.8, §3.7–§3.9 and §4.1, read by the review. `DESIGN_THE_ROADS.md` does not exist at `81f1cd96`, so that gap closes by absence.
- Open:
  - The ODQ (§764, §64.2, §303.6).
  - `map-corpus/docs/GENERATION-SPEC.md` and the MF charter (the host's own map-program spine; I35).
  - `PHASE55_EXECUTION_PLAYBOOK.md` §0.2, which is present at `81f1cd96` and unread by all three seats.
  - `DESIGN_EDIT_MODE_AND_DECREES.md`, present; J-RR.37 rests on it second-hand.
  - `DESIGN_NAVY.md`, present; it bears on "no water cell held".
  - `src/domain/roads/userRoutes.js` (row R5).
- **Fix:** list these in the review's §9 "Not read" (fp-realm-review.md:781). Name GENERATION-SPEC, the MF charter and the ODQ in V13 H21 (V13:3113) alongside the FMG weave volume.

**14. MINOR — Nobody owns the correction of research row A1.**
- File m's "Not items" leaves `fp-physical-integration.md` §8 row A1 (SUPPLIED → PARTLY) to the note, unassigned. Row A1 and the note's port description (fp-physical-integration.md:371, 427) still describe the retired `seats(world, seeds)`, `TerritorySeed` and budget surface.
- **Fix:** add a dated bracket under §8 of the note stating the A1 status and the J-RR.3/J-RR.48 replacement. Optionally append to the review a row-by-row table of the 24 PARTLY/MISSING rows mapped to J-RR / H / "stays the host's".

**15. MINOR — J-RR.14 delays the owner's own directive. (Q6)**
- J-RR.14 keeps native worlds on the normalized arm until H2. That defers the owner's 2026-08-05 directive that "the 2-8 march-week normalization dies for scaled worlds" (DESIGN_FP_ARCH_WY.md:214-217) [STATED].
- It is recorded only as H3's host bracket.
- **Fix:** record it in V13 §12 (or as a deviation in file m's head) as an owner-visible, bounded deferral ("until H2 lands").