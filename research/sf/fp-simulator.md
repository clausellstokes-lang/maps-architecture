# SettlementForge's FP simulator — the model, the laws, and what binds a map engine

> Fable-reviewed 2026-10-18: PASS-WITH-CORRECTIONS — the laws and the 80-row ledger hold; counts, citations, tags and seven readings corrected in place (lane retrovalidation/fp; J392)

Research seat (read to understand; described in my own words; cited by file, section and line; no code copied). Host:
`/home/user/clausellstokes-lang/settlement-engine` at `origin/master` `81f1cd96` (2026-10-17 00:49, "Merge pull
request #60 … docs/fp-coherence-fold-2026-10-16"), read-only. Tags: [STATED] = the document says it; [OBSERVED] = I
read code, a test or the git history; [INFERRED] = my reasoning. Line numbers are at `81f1cd96`.

## PROGRESS
- [x] 0 skeleton
- [x] 1 fold read whole (708)
- [x] 2 SPINE (1,217) + ARCH_SP (959)
- [x] 3 COUPLINGS (1,960; §0–§3, §6–§10 whole, §4 pairs CPL-1..4, 8, 16 whole, the rest by heading + grep) + ARCH_CW
  (629; §1–§3, §5–§6 whole, §4 by heading)
- [x] 4 ARCH_EP (4,127; header, §0.1–0.2, §1, §2.1, §3a, §3c, §3e, §7a, §8.5 whole; the rest by heading)
- [x] 5 DESIGN_FP_ARCHITECTURE (3,324; header, §1 L1–L10, §2b–§2c, §3, §4, §12.0–§12.2, §12.8–§13 whole; §5–§11 by
  heading + grep)
- [x] 6 family heads + headings (all 13 ARCH_ + 6 design volumes; CN present; WY §1a/§2c–§3c and MF §0–§5.-1c and LG
  whole read beyond the head)
- [x] 7 ARCHITECTURE.md three sections, CURRENT_STATE (137), WAR_RULINGS §1 + §6 + §10, DESIGN_ROUTE_LIFECYCLE §0–§3
  (for "genesis is sacred")
- [x] 8 write §1 model
- [x] 9 write §2 laws, §3 flags/dark, §4 rulings, §5 registry, §6 glossary, §7 sources, §8 inferences
- [x] 10 lane-events LANDED


---

## 0. Orientation — what this note is for, in five points

- "FP" (Foreign Policy) is SettlementForge's campaign-simulation program: thirteen chartered programs (SP, GR, IN, TR,
  WF, POP, INT, CW, ES, WY, HB, WC, EP) layered on a pre-existing war/peace engine and a "Phase 5.5" spatial engine,
  plus later families (EC, LG, CN, PG, MF). [STATED] `docs/DESIGN_FP_ARCHITECTURE.md` header lines 3–9;
  `ARCHITECTURE.md` "The spatial engine + the engine-wave stack" (lines 147–166).
- The 2026-10-16 COHERENCE FOLD (`docs/DESIGN_FP_COHERENCE_FOLD.md`) is now the governing layer above all thirty
  volumes: its §1 adds constitutional requirements 15–24, its §2 is the status of record, its §3 rules cross-program
  conflicts, its §4 rules the clock, its §5 is the glossary of record, its §7 converts 44 owner questions into
  delegated rulings. [STATED] fold lines 22–28, 52–56, 329, 412, 487–489.
- The single most important fact for a map engine: the simulator treats the spatial layer as a FROZEN, canonized
  digest that it reads but never mutates; everything the simulation adds is "lived history" in sidecar ledgers, and
  generation-time truth is never rewritten by the campaign. [STATED] `docs/DESIGN_ROUTE_LIFECYCLE.md` §1 laws 1–2
  (lines 25–32); `DESIGN_FP_ARCHITECTURE.md` L10(e) (line 218). Section 2 below lists every law that follows from it.
- Most of FP is not running in a default world. In the default preset only pact formation and the patron's fall are
  lit; belief only exists under spatial canon with a non-omniscient information mode, which only three of seven
  presets set. [STATED] fold §2 lines 333–351; [OBSERVED] `src/domain/worldPulse/simulationRules.js:789–802` (the
  three `FP_LIT_*` spreads) and `beliefMap.js:204–209` (`beliefsActive` = canon marker ∧ `infoMode !== 'omniscient'`),
  `simulationRules.js:56` (default `infoMode: 'omniscient'`).
- Nothing in the fold schedules a build: the owner's standing order (UI and prose release first; the EC gate "pushed
  and deployed") still binds. [STATED] fold lines 24–28.

---

## 1. The model of a settlement and a campaign

### 1.1 Two engines in one product

- GENERATION is a 22-step seeded pipeline (`resolveConfig → … → assembleSettlement`) that turns a config (tier,
  terrain, culture, trade access, threat, priority sliders) into one internally coherent settlement dossier; the whole
  pipeline threads one seeded PRNG context, and same seed ⇒ same settlement is pinned by a 525-config golden hash
  manifest. [STATED] `ARCHITECTURE.md` "What it is" (lines 9–15) and "The generation pipeline" (lines 115–145).
- The CAMPAIGN is a realm simulation over many saved settlements: "economy, movement, politics, belief, religion, war,
  peace, and consequence propagation", with forecast, Chronicle and Herald surfaces and player-safe vs DM-truth
  projections. [STATED] `docs/CURRENT_STATE.md` "What exists" (lines 22–36).
- The bridge between them is SPATIAL CANONIZATION: Phase 5.5 "promotes the realm map to a first-class engine input:
  settlements carry positions, neighbours, and travel costs", and an M1–M11 "mover ladder" ages the realm tick by tick
  (migration, trade lanes, war fronts, discovery, calamity, upswing); every wave on top "ships dormant and gated". The
  constitution for that stack (same-seed byte identity, dormancy, the first-paint ratchet) lives in
  `docs/PHASE55_EXECUTION_PLAYBOOK.md` §0.2, which `ARCHITECTURE.md` deliberately does not restate. [STATED]
  `ARCHITECTURE.md` lines 149–166. (I did not read the playbook — see §7.)
- The settlement SCENE is a derived, versioned, audience-safe `TownSceneManifest`; the 2D plan and 3D portrait are
  presentations of it and "neither is a second mutable settlement model". [STATED] `ARCHITECTURE.md` "Settlement
  scene: one truth, two presentations" (lines 170–190).

### 1.2 Canonical state versus believed state

**Canonical (truth-side) state** is what the engine writes and the DM's Herald prints. It lives in three homes, and FP
fought to add no fourth:
- the settlement RECORD (the dossier; first-hand facts classed by path in `recordRegister.js` as HELD · WORLD ·
  CONSTANT · READING · MIRROR · RECEIPT · HISTORY · AUTHORED); [STATED] `DESIGN_FP_ARCHITECTURE.md` L10(e) line 218.
- the campaign `worldState` (pulse history, relationship states, religion states, treaties, `envoyErrands`, the
  paused-advance cursor …);
- `worldState.spatialLedgers.*` — conditionally materialized sub-keys, each with exactly one writer, drop-when-empty.
  FP's total growth across thirteen programs is ZERO new top-level `worldState` keys and FOURTEEN new `spatialLedgers`
  sub-keys (pactProposals, commercialReasons, houses, ventures, omenReadings, departureMemory, calamityArcs [now not
  minted, §3.1.9], burials, habits, warContributions, freeUnits, residentCohorts, serviceBonds, advanceEpoch; a fifteenth, ES-5d's `missionCreditEvents`, landed dark outside that list — fold §3.2.22, §4.1 below) plus
  conditional fields on existing records. [STATED] `DESIGN_FP_ARCHITECTURE.md` §4 lines 676–735.
- The frozen SPATIAL DIGEST (`worldState.spatialDigest`) is the map's projection into the engine: positions, territory
  adjacency/gates, an integer cost matrix, and (WY-1) a `kmScale` datum. Every mover clock derives from it through one
  reader (`distanceRead.js` → `hopWeeks`/`calibration`). [STATED] `DESIGN_FP_ARCH_WY.md` §1a (lines 212–317),
  `DESIGN_FP_ARCH_MF.md` §2 law 4 (line 193); [OBSERVED] `src/domain/spatial/spatialDigest.js:571–576` (kmScale
  appended last and only when admitted), `src/store/campaignSpatialCanonize.js:110` (re-canonize reads the prior
  digest's scale).
- L10(e) states the boundary that matters most to a map engine: worldState-side state — the spatialLedgers sub-keys
  and the conditional pulse-record fields — "is LIVED HISTORY outside the record register and outside `rederive`: FP
  never adds to the held set generation re-derives". [STATED] `DESIGN_FP_ARCHITECTURE.md` line 218. The Edit Mode
  volume classes `spatialDigest` with them (`DESIGN_FP_ARCH_EDITOR.md:137`).

**Believed state** is per-observer, per-faction-slot belief about other settlements:
- The substrate is `beliefMap.js`'s partition (`beliefRecord(worldState, observerId, subjectId, factionId)`), with
  authored decay (silence 0.92, hop 0.75, recency 0.85). Every belief row always carries a strength band and an
  alliance label; flag-conditional axes add population trend, observance, faith label. [STATED] `DESIGN_FP_ARCH_SP.md`
  §2a V1–V4 (lines 110–113); `DESIGN_FP_ARCHITECTURE.md` §2b item 2 (lines 403–408).
- SP-2 / SP-B "THE BELIEVED WORLD" adds three subject families as NEW AXES inside the existing fold, never a separate
  believed-world module (seam ruling 1, J-SP-1): believed SCARCITY (per closed good class), believed CONDITIONS (tier
  band, stores band, route-position band, pull band — also the three missing legs of the sovereignty market's
  appraisal), believed DEVOTION. Ground truth enters only through `axisGroundTruth`-shaped seams; an accuracy bar
  decides whether an observer adopts current truth or keeps a stale prior. [STATED] `DESIGN_FP_SPINE.md` SP-2 (lines
  249–260); `DESIGN_FP_ARCH_SP.md` §3 seam ruling 1 (lines 182–193), §4 canonical model (lines 228–322), SP-B
  (376–452).
- Belief only exists where `beliefsActive` holds: a canonized realm (`spatialCanonVersion` > 0) AND `infoMode` ≠
  `omniscient`. In an omniscient or aspatial world every belief read "falls back to ground truth verbatim". [OBSERVED]
  `src/domain/worldPulse/beliefMap.js:199–209`. Only `dramatic_campaign`, `living_realm` and `full_simulation` record
  beliefs. [STATED] `DESIGN_FP_INFORMATION.md` req-17 tier bracket (line 15); `DESIGN_FP_ARCH_ES.md` tier bracket.
- SECOND-ORDER belief ("what they likely believe of us") is a derived heuristic over the OUTBOUND record (what was
  shared, leaked, planted, shown), never a nested belief map — Law One forbids recursion. [STATED]
  `DESIGN_FP_SPINE.md` lines 256–260; `DESIGN_FP_ARCH_SP.md` SP-B bullet (lines ~397–405).
- K3, "NOBODY IS EVER CURRENT": no negotiation path may read true world state; enforced structurally (pinned import
  lists, token scans, a guard-the-guard positive control). [STATED] `docs/DESIGN_WAR_RULINGS_ARCHITECTURE.md` §1b
  (lines 48–54). The coupling volume generalizes it: any read crossing a court boundary routes through belief, except
  LOUD public facts (a razing, an altar, a signed treaty's existence, an army in the field), which may be read at
  truth once news latency is paid (C-LAW-5, J-CPL-3). [STATED] `DESIGN_FP_COUPLINGS.md` §1b lines 125–132, §7 J-CPL-3.
- The Herald is the DM's paper and "ALWAYS TELLS THE TRUTH"; its composers may never read a rumor ledger, a belief map
  or a disinfo record as content (the contamination fence, K3 inverted); the rumor mill is the believed word with an
  upward link to the true headline. [STATED] `DESIGN_FP_SPINE.md` lines 467–494.

### 1.3 Posture

SP-4 / SP-C composes a court's RISK APPETITE (an outcome-learned stock, decayed toward neutral, reversal pinned — "no
courage ratchets") with disposition channels and, later, the ruler's books into a SETTLEMENT STRATEGIC POSTURE that
colours every verb. Posture is threshold-shaped only: it colours, never selects targets (E3). Built names are
`courtPostureOf` / `courtRiskAppetiteOf` (chair ruling CR-C4-1), not the spine's `postureOf` / `riskToleranceOf`,
because `riskToleranceOf` is already the roads NPC courage read. The appetite lives as a conditional facet on
`worldState.dispositionStats[sid]`. Status: LANDED dark; the appetite facet is STARVED (its writer is not mounted —
SEAM-0 owed, slotted at the head of chain C2). [STATED] `DESIGN_FP_SPINE.md` SP-4 (lines 285–304), requirement 10
(lines 61–66); `DESIGN_FP_ARCH_SP.md` §3 seam ruling 4, SP-C (lines 542–628); fold §2 SP row (line 335), §3.3.3 (line
317), §6 C2 (line 474).

### 1.4 Banded stock, band families, finite semantics

- SP-5 / SP-5b: every non-confidence stock (house holdings/credit, temple wealth, appetites) uses ONE idiom — banded,
  event-moved, decaying toward neutral on ONE shared half-life ladder, with ONE crossing-receipt grammar; the
  anti-ratchet property is asserted once over the shape. The landed ladder is `a_season` 13 · `a_year` 52 ·
  `a_few_years` 156 · `a_decade` 520 · `a_generation` 1040 weeks, derived from `INTERVAL_WEEKS`. [STATED]
  `DESIGN_FP_SPINE.md` lines 305–327 and the SP-A record (lines 1103–1115).
- SP-6a SIGNIFICANCE (`routine / notable / major`) and SP-6b SEVERITY (`glancing / telling / grave / ruinous`) are
  minted once; volumes assign kinds to classes and never author a scale (chair ruling R5). [STATED]
  `DESIGN_FP_SPINE.md` lines 332–351 (the band families), 1112 (the four severity rungs).
- Finite semantics: every vocabulary is closed and banded, no raw float reaches prose ("game-grade translate"), one
  band per clause, comparisons in words. [STATED] war §1a law 7 (line 44); `DESIGN_FP_ARCHITECTURE.md` L5 (lines
  146–155).
- The ladder law (J-FP-2): `OVERFLOW_BANDS` is a pressure LEVEL, never a DIRECTION; "growing/shrinking" borrows
  `SOVEREIGNTY_TRAJECTORY_BANDS` or `populationTrendBand`. [STATED] `DESIGN_FP_ARCH_SP.md` lines 366–374.

### 1.5 The errand spine (named-person travel)

All purposeful named-person travel rides ONE substrate: typed purposes {diplomatic, commercial, religious, factional,
personal, covert}, declared vs true purpose (the covert seam), a decaying snapshot, interceptability, and law M's
one-week-per-leg speed floor. Migration is explicitly NOT an errand — it is a flow, kept in its own ledgers. The
ledger is `worldState.envoyErrands` (not the spine's `spatialLedgers.errands`, ruled keep — OD-FC-14). SP-D landed
dark and is "held dark on purpose". [STATED] `DESIGN_FP_SPINE.md` requirement 5 (lines 36–41), SP-1 (lines 242–248);
`DESIGN_FP_ARCH_SP.md` §3 seam ruling 2, SP-D (lines 629–722); fold §2 (line 335), §3.3.4, OD-FC-14.

### 1.6 The narration kit

SP-6/SP-E: every program's news kinds register the "five joins" (pool row, registry row with required slots,
`WHAT_PHRASES`, Herald section authority, full address chain); each phrased kind carries a seeded variant pool whose
floor scales with firing cadence; a phrase-repetition envelope measures repeats per settlement per season. The causal
voice (HEADLINE / SUBHEADER / TELLING registers plus a DOSSIER-NATIVE register) composes display-side over persisted
provenance only; a dossier field the DM has edited always wins its position. [STATED] `DESIGN_FP_SPINE.md` lines
328–588; `DESIGN_FP_ARCH_SP.md` SP-E (lines 724–762). The causal headline is built and DARK
(`heraldCausalVoiceEnabled`), ruled to light everywhere by OD-FC-16. [STATED] fold §2 line 335, OD-FC-16.

### 1.7 The temporal walker and the clock law (fold §4)

- THE ONE TIME TRUTH is `INTERVAL_WEEKS` = { one_week 1, one_month 4, one_season 13, one_year 52 }. [OBSERVED]
  `src/domain/worldPulse/intervalWeeks.js:7–12`. Requirement 9 binds every mechanism to declare its clock in it and to
  obey "the one travel physics (transit kernel, km/week mode table, the week floor)", and makes THE TWO-TIMESCALE ECHO
  universal: the world responds quickly and concludes slowly. [STATED] `DESIGN_FP_SPINE.md` lines 54–60.
- What a DM advance IS: the advance units are week / month / season / year; the engine composes a year as 52
  `one_week` ticks, so "a one-month advance" is four ticks. [STATED] fold §4 line 406.
- The FIRST-VISIBLE-LATENCY law (requirement 16, ruled YES by OD-FC-1): every mechanism declares, beside its clock,
  how many DM advances before its first visible sign, and a one-month advance must surface at least the fast-layer
  sign; a wave whose sign fails its experience read does not light. Slow verdicts (a generation later) declare a
  PLANTING LINE at the moment of cause instead. [STATED] fold §1 req 16 (lines 104–115), §4 lines 394, 408.
- The measured DEFECT CLASS: Class A — a 12-tick "year" (12 constants, two wrong by their own comment:
  `STARVE_FULL_TICKS` and `CREDIT_TERM`, ruled cured 12→13 by OD-FC-15 as signed designs — both still 12 at `81f1cd96`); Class B — about twenty shadow clocks (local
  `WEEKS_PER_YEAR`, `SEASON_WEEKS = 13`, `tick / 52`, two same-named `INTERVAL_WEEKS` shadows); Class C — about sixty
  bare 13/26/52 literals in about forty-five modules. [STATED] fold §4 table (lines 398–402), §3.3.10.
- THE WALKER (SP-7, re-chartered): `tests/lint/timeBase.walker.test.js`, a shrink-only exemption list seeded from the
  A/B/C census that reds any NEW bare 12/13/26/52 in `src/domain`; zero behaviour; no constant moves in its commit.
  The mode-speed TABLE belongs to WY-1, not SP-7 (§3.1.11). [STATED] fold §4 line 404; `DESIGN_FP_SPINE.md` SP-7
  bracket (lines 589–590). UNBUILT. [STATED] fold §2 SP row.
- THE RETENTION HORIZON (requirement 23): rings are counted in records (pulseHistory 80, wizardNews 240, turningPoints
  24); a `one_year` advance appends 52 records into the 80-ring before collapsing to one, so a year-cadence DM's
  horizon is about 29 advances. Ruled: collapse BEFORE eviction (OD-FC-33). [STATED] fold §1 req 23 (lines 166–174),
  OD-FC-33; [OBSERVED] `worldState.js:16` `MAX_HISTORY = 80`.
- DISTANCE TIME: law M — no named person moves faster than ONE WEEK per route leg on any path; one transit kernel is
  the single writer for named-person movement. [STATED] war §1b (lines 66–70). Leg weeks come from `hopWeeks`
  calibrated PER DIGEST — "a whole realm spans 2..8 march weeks", so any authored band ≥ 9 weeks refuses nothing (the
  dead-band trap). WY-1's absolute-distance law adds an optional per-world `kmScale` so weeks = km / mode speed;
  absent scale = legacy normalized behaviour, byte-identical, forever. [STATED] `DESIGN_FP_ARCHITECTURE.md` L1 (lines
  77–94); `DESIGN_FP_ARCH_WY.md` §1a items 1–3; `DESIGN_FP_ARCH_WC.md` §5.3 (lines 4992–5002).

### 1.8 How an epoch advances (the tick, the advance, the advance epoch)

- The PULSE. `pulseKernel.js` (frozen at 1581 effective lines; its PRNG call order IS the stream identity) runs one
  tick; `applyWorldPulse.js` applies outcomes. FP stages do not mount in the kernel: they mount in the LIFECYCLE HOST
  (`settlementLifecycleKernel.js`, own-flag-before-host-gate) or ride existing seams. The only sanctioned kernel edits
  are EP-1's six-token seam and Edit Mode's decree hook. [STATED] `DESIGN_FP_ARCHITECTURE.md` L1 (lines 77–94 and its
  2026-10-16 bracket); `DESIGN_FP_ARCH_GR.md` R-3; `DESIGN_FP_ARCH_EP.md` header lines 49–50.
- DECREES apply at the HEAD of every tick as first-class causes (`decreeHook.js :: applyDecreesAtTick`), before every
  FP stage; FP stages read the post-decree world and never cache a fact across the head. [STATED]
  `DESIGN_FP_ARCHITECTURE.md` L10(d) (line 216), §12.0.
- An ADVANCE (week/month/season/year) runs N ticks (`advanceMultiTick`, a real default-on flag) and
  `collapseIntervalHistory` folds the interval's pulse records to ONE. [STATED] `DESIGN_FP_ARCH_EP.md` §1.5 (lines
  757–783).
- The landed MAJORS DOCKET (`decisionTier.js`, eleven majors; J-D7's single adjudication screen) can PAUSE an advance
  on a persisted `pausedAdvance` cursor; the pause re-runs the parked tick and refuses advances and edits while
  parked. [STATED] fold §1 req 24(b) (lines 199–207).
- THE HEARING WEEK (requirement 24, the owner's own law): at a one-WEEK advance, an inter-settlement engagement's
  climax is never resolved in the tick it arrives — it is written to a held docket with its deterministic default
  verdict, the tick completes normally, the DM may leave it, TILT it (slight · heavy) or give a VERDICT, and the NEXT
  advance resolves every docketed hearing first. Month, season and year advances run hearings on the engine default
  without stopping. Dark-identical behind `hearingWeekEnabled`; premium-only. Built by SP-9 at the head of the chain
  order (C0). [STATED] fold §1 req 24 (lines 175–252), §3.4 rulings (line 388), §6 C0. [OBSERVED] none of
  `hearingWeekEnabled`, `registerEngagementKind`, `pendingEngagements` exists in `src` (grep).
- THE ADVANCE EPOCH (EP): every USER advance mints a fresh entropy nonce at the store layer (beside the existing
  `now`), records it on the one collapsed pulse record (`pulseHistory[].epoch`) and on the paused cursor, and appends
  it as one segment of the pulse stream identity; undo discards the suffix, the next advance mints anew ("living
  futures"); replay feeds recorded nonces ("immutable pasts"); absent nonce ⇒ the segment is not concatenated at all
  (legacy byte-identity). EP-0..EP-3 LANDED dark (2026-08-16); `advanceEpochEnabled` is lit in no preset; lighting it
  ends same-seed FUTURE replay and must wait for OD-FC-31 (persist the pending epoch in the EP ledger) and OD-FC-32
  (persist the newest two undo entries). [STATED] `DESIGN_FP_ARCH_EP.md` §0.1 (lines 264–310), §1.1–1.5 (657–783),
  §3a, §3c; fold §2 EP row (line 347), OD-FC-31/32/34.

### 1.9 How events, decrees, stressors, conditions, calamities and the world pulse enter

- WORLD PULSE: the weekly tick above; movers M1–M11 (migration, trade lanes, war fronts, discovery, calamity, upswing)
  age the realm. [STATED] `ARCHITECTURE.md` lines 149–155.
- DECREES: DM edits on a canonized town become decrees applied at the tick head; an applied decree's chronicle line
  carries `cause: 'table' | 'party'` (a sixth Herald join). Pins, directions and off-stage acts reopen read-only once
  applied; the rewind is `undoLastPulse`. [STATED] `DESIGN_FP_ARCHITECTURE.md` L10 and L10(d) (lines 208, 216). Two DM
  direction registries only: `REALM_MANIFEST` (court-to-court verbs) and `DIRECTION_OP_TYPES` (a home's own levers).
  [STATED] §12.1 (line ~3104).
- SEALS: a card showing a process wears a seal — a `pin-fork` over a registered fork's own outcome vocabulary, or a
  DIRECTION. Every stochastic choice registers in `HABIT_FORK_REGISTRY` with its vocabulary (L10(a)). [STATED] lines
  208–212. The DM's stressor PIN (ODQ §128) is an Edit Mode seal that persists through all advances and gates both the
  roll and the backstop arms (fold §3.1.20 re-ruled after S4 B1).
- STRESSORS and CONDITIONS: the M11a pestilence stressor is "THE ONE canonical `disease_outbreak` stressor" — PG's
  first law is ONE PLAGUE TRUTH (POP-4 folds into PG; `calamityArcs` is not minted because it collided with the lit
  `calamityKernel`). The `embattlement` region ledger (phase `embattled`) ramps on occupation + siege + exhaustion +
  crime − security; a brigand siege is one more ramp term, never a parallel stressor. [STATED] `DESIGN_FP_ARCH_PG.md`
  header (lines ~22–30); `DESIGN_FP_ARCH_POP.md` S31; fold §3.1.9, §3.1.16 (lines 270, 277).
- CALAMITIES: `calamityKernel` is lit; a flood strikes riverside terrain via `DISASTER_TYPE_BY_TERRAIN`
  (`spatial/calamity.js:87–96`). [STATED] `DESIGN_FP_ARCH_EC.md:2243`. Faith may not originate meaning for a calamity:
  WF-4 is rebased on THE ATTRIBUTED EDIT — "a DM's attribution starts a reading; the engine never originates one"
  (OD-FC-8). [STATED] fold §3.2.5, OD-FC-8.
- BELIEF CONDITIONS: SP-B's believed scarcity and conditions (lit in the three belief presets) colour pact deciders;
  EC's truth-side `MARKET_CONDITION_BANDS` (glut · soft · fair · dear · desperate) is the market ladder, unbuilt.
  [STATED] fold §2 SP row, §5 rows `CONDITION_BANDS` / `SCARCITY_BANDS`.
- SETTLEMENT BIRTH AND DEATH happen inside the campaign: the lifecycle ladder pronounces death after a 104-tick dwell,
  resettlement is a privileged birth site, and Wave P overflow FOUNDINGS have a single writer and a tier-pair-banded
  minimum separation (J-P6). [STATED] `DESIGN_FP_ARCH_POP.md` S27; `DESIGN_FP_POPULATIONS.md` §1b J-P1..J-P8 (lines
  74–86); `DESIGN_ROUTE_LIFECYCLE.md` §0 line 15 ("Settlements are born and die").

### 1.10 The status of record (fold §2), compressed

The fold's §2 table replaces every volume header as the state of record, measured at `00b648c9d`. Its legend: LIT =
the flag is in at least one shipped preset (default `realistic_regional`); DARK = built, lit nowhere; UNBUILT; SEAM =
a leaf with no caller. [STATED] fold lines 329–331.

- THE ONE LIT CHAIN in the default preset: a pact proposed, valued by the responder, signed or declined, kept or
  frayed; and a patron's fall — which is vacuous on every born world because the birth preset seats no deity. Renewal,
  conversion, succession and mediation light only in `dramatic_campaign` and `full_simulation`; believed scarcity and
  conditions colour pacts only in the three belief presets. "Everything else in thirty volumes is a flag away or a
  build away." [STATED] fold line 351.
- Nine FP keys lit: `pactFormationEnabled` + `faithUnseatingEnabled` (FP_LIT_ALIVE, four presets incl. default);
  `beliefAxesEnabled` + `believedConditionsEnabled` + `believedScarcityEnabled` (FP_LIT_BELIEF, three presets);
  `mediationGeneralizedEnabled` + `oathHolderEnabled` + `treatyLifecycleVoiceEnabled` + `treatyRenewalEnabled`
  (FP_LIT_WARPEACE, two presets). [OBSERVED] `simulationRules.js:789–802`; preset spreads at `:899`
  (realistic_regional: ALIVE), `:956–958` (dramatic_campaign: all three), `:999–1000` (living_realm: ALIVE + BELIEF),
  `:1213–1215` (full_simulation: all three).
- Seven presets exist: `quiet_local`, `realistic_regional` (default), `dramatic_campaign`, `static_campaign`,
  `narrative_campaign`, `living_realm`, `full_simulation`. [OBSERVED] `simulationRules.js:863–1010` (the seven preset heads; the last preset's body runs on past :1010 to its FP spreads at :1213–1215).
- The compiled inventory re-derived: 37 landed · 12 partial · 62 not started of 111 waves (65 of 114 with the §13 SEAM
  family). [STATED] fold §2 ARCH row (line 348).
- The corpus is three things: a LIT CORE (pact formation, the faith unseating, believed scarcity/conditions, the
  errand spine built dark, the cascade braid and causal headline built dark); a BUILT-BUT-DARK MIDDLE (information and
  espionage almost entire, TR-1..3, commons voice, habit substrate, WY-1); an UNBUILT RIM (populations, interior,
  wayfare beyond WY-1, faith beyond the unseating, TR-4..8, war circulation, the epoch, EC) — the fold's words; that WC-0 and EP-0..3 are built is [INFERRED] from fold §2's WC and EP rows.
  [STATED] fold §0 lines 53–60.

### 1.11 The thirteen programs, one paragraph each

**SP — THE SPINE (shared infrastructure).** Builds once what all programs consume: the errand system (SP-1/SP-D), the
believed-world axes (SP-2/SP-B, SP-B2's legs for the sovereignty market), the pact grammar's pointer (SP-3, delegated
to GRAMMAR), the posture read (SP-4/SP-C), the confidence and banded-stock families (SP-5/5b), the narration kit
(SP-6/SP-E), the temporal walker (SP-7, unbuilt and re-chartered by fold §4), the age layer (SP-8 / J-D12, now
pre-launch chain C8 by OD-FC-17), and — added by the fold — SP-9 THE HEARING WEEK at the head of the chain order. Fold
status: SP-B scarcity + conditions LIT in three presets; SP-A/B devotion/B2/C/D/E BUILT DARK; SP-7, SP-8, SP-F era
marking UNBUILT. Map relevance: SP-B's `routePositionBand` and `tierBand` are beliefs ABOUT positions on the canonized
network; SP-D's errands move on the one transit kernel. [STATED] `DESIGN_FP_SPINE.md` §2 (lines 231–612);
`DESIGN_FP_ARCH_SP.md` §5; fold §2 line 335, §3.4 rule (1).

**GR — THE PACT GRAMMAR (diplomacy's peacetime completion).** Thesis: "Every treaty, at last, can be negotiated rather
than dictated." ONE treaty instrument PER PAIR (law, chair ruling R1): peacetime formation AMENDS the pair's standing
instrument, reciprocity is directional terms inside it; `peaceTerms.js` heads ONE terms-writer family (now eleven
modules); triggers (trade demand, faith communion, migration pressure, shared threat) propose; the responder values
against its reserve; the catalog grew to 26 term types / 13 families (incl. commercial `exclusivity` / `market_access`
/ `toll_exemption`, faith, population, amnesty, jubilee). Waves: GR-0 lifecycle voice, GR-1 oath-holder identity, GR-2
formation + standalone NAP, GR-3 term families, GR-4 succession question, GR-5 renewal, GR-6 mediation, GR-7
measurement. Fold status: LIT (formation in four presets incl. default); the two-picture law (each side values under
its own picture) is NOT built — the proposer's draft reads the responder's TRUTH, a K3 breach; SP-3 stands and a
repair car heads chain C1 (OD-FC-5 reversed). `mutual_defense` has no consumer (§3.2.3). [STATED]
`DESIGN_FP_GRAMMAR.md` §0 (lines 29–62), §1c (91–157); `DESIGN_FP_ARCH_GR.md` §2a; fold §2 GR row (337),
§3.2.1–§3.2.4.

**IN — INFORMATION (the medium: mind + voice).** The medium's physics (belief decay, credibility rising 0.6 / falling
5 on a 52-tick half-life, the brokerage reliability ladder calibrated on 18,377 arrivals) are already strong; IN adds
a MIRROR (second-order belief), a LURE (bought lies that bait), a COUNTER-GAME (vet, send-two, sweep, `suspicionOf`),
a ROAD (couriers, double agents, the reputation race), a VOICE (the knowledge desk, the spy's arc) and a MEASURE. Laws
include the anonymity/no-fates boundary (exposure is reputational; the engine never kills, exiles or shutters), THE
ONE-SUBSTRATE DISTANCE LAW ("five independent consumers price the SAME physical distance through one shared reader …
No wave may mint a sixth distance price"), and the anti-hum law (no autonomous spam). Fold status: IN-0a..d and
IN-1..6 parts BUILT DARK; no host flag lit; runs only under `beliefsActive`; the commissioned lie cannot fire (no
caller for `lureCommission`). [STATED] `DESIGN_FP_INFORMATION.md` thesis (lines 17–30), §1b (61–130);
`DESIGN_FP_ARCH_IN.md` S3, R1–R8; fold §2 IN row (338).

**TR — TRADE (absorbed by EC).** Commerce as BUYERS who believe, never markets that clear: T1 no price engine (bands
only), T3 single writers extended never forked, T4 books/appetite colour thresholds but never select partners, T5 no
ratchets, T6 moral pricing never prohibition, T7 the DOUBLE-COUNT law (exactly one live food-import arm per settlement
per tick; "GENERATION IS SACRED" — the generation stash is never rewritten), T8 belief discipline. Waves: TR-1 casus
commercii, TR-2 the merchant house, TR-3 believed markets, TR-4 the grain road (food made physical), TR-5 the pact
lane, TR-6 the corner, TR-7 ventures, TR-8 the traveling factor, TR-9 convergence. The no-coin ruling (T2) was
REVERSED by the owner (W-COIN treasury, dark). Fold status: TR-1..3 + TR-9 contract BUILT DARK (writers unmounted);
TR-4..8 absorbed into EC as EC-12/6/13/14/15; EC entire behind the "pushed and deployed" dispatch gate. [STATED]
`DESIGN_FP_TRADE.md` §1b (lines ~50–110); `DESIGN_FP_ARCH_TR.md` §1a S8, S11; fold §2 TR row (340), §3.2.10.

**WF — FAITH.** Law One at its hardest: the engine models believers (shares, legitimacy, piety, readings,
congregations), never gods; it never confirms a divine act. Waves: WF-0 observation floor, WF-1 THE UNSEATING (a
believer-side patron fall with named causes), WF-2 pilgrims and legates as errand movers, WF-3 stance consequences,
WF-4 omen reads (rebased on THE ATTRIBUTED EDIT), WF-5 schism, WF-6 faith term executors, WF-7 the tithe (ONE flow,
two ends: WF-7's piety × temple presence is the source; W-COIN's `tithe_share` is the crown's cut), WF-8 the voice,
WF-9 measurement. Fold status: WF-0, WF-1a..1F, WF-8a LIT (`faithUnseatingEnabled` in four presets incl. default);
WF-1d and WF-6's rows built dark; WF-2..5, WF-6's executors, WF-7, WF-8's remainder and WF-9 unbuilt; faith pacts cannot cross (`believedDevotionEnabled` lit nowhere — ruled to light, OD-FC-7).
[STATED] `DESIGN_FP_FAITH.md` §1b (lines ~37–95); fold §2 WF row (341), §3.1.5, §3.2.4–§3.2.6.

**POP — POPULATIONS.** Gives the people BELIEF (a column may chase a rumoured boom), VOICE (the commons' petition →
gathering → refusal → riot ladder), MEMORY (departure memory at both ends) and a NEWSPAPER, over the best-instrumented
physics in the tree (Wave P: 300-tick conservation with a negative control). Laws: BELIEF MOVES FEET, NEVER GRAIN
(belief may enter attraction; capacity, viability and conservation stay truth — "the wall is discovered at the wall");
J-P3, pull evaluates ONLY over the lived route network, distance-priced — "no wave opens teleport migration";
migration is a flow, never an errand; no new mortality sinks; the named cast never dies in an engine death. Waves
POP-1 believed road + arrival clearing, POP-2 commons arc, POP-3 departure memory, POP-4 plague arc (folded into PG),
POP-5a road drama, POP-5b permits, POP-6 the hopeful half, POP-7 measurement. Fold status: `demographicsEnabled` LIT
IN NO PRESET; nothing writes the genesis route network, so the migration menu is EMPTY in every shipped world
(OD-FC-18 rules the mount at world birth). [STATED] `DESIGN_FP_POPULATIONS.md` thesis and §1b (lines ~20–110); fold §2
POP row (342), OD-FC-18. [OBSERVED] `ensureGenesisRouteNetwork` is defined at
`src/domain/worldPulse/routeNetworkGenesis.js:630` and has no caller in `src` (two comments and two descriptive strings name it; none calls it).

**INT — INTERIOR (books + memory; the driver).** Every war opened, pact signed, route chartered and column departed is
chosen by a seat reading its books under a crowd that remembers. Settled rulings: the two (now four) books land
(INT-1), faction foreign positions light (INT-2), the interior veto completes (INT-3), the king-who-paid arc's
narrated middle (INT-4), the memory decay seam closes and the founding wound (INT-5), deliberate forgiveness as priced
policy (INT-6), legitimacy's certification row (INT-7), the interior voice (INT-8). Fold status: almost entirely
UNBUILT or dark; the commons grievance composite is POP's single budget with a closed `GRIEVANCE_INPUTS` registry
other programs add ROWS to (§3.1.3). [STATED] `DESIGN_FP_INTERIOR.md` header and §0 (lines 1–75);
`DESIGN_FP_ARCH_INT.md` headline; fold §2 INT row (343), §3.1.3, §3.1.10.

**CW — COUPLINGS (the cross-wires).** Seven layers {war, trade, faith, populations, information, grammar, interior}
make 21 pairs / 42 directions (CPL-1..21); each designed coupling is a named READ + a RECEIPT + a COUNTERFORCE off the
same evidence, owned by exactly one wave in one volume. CW itself builds only four instruments: CW-0 the registry (68
rows, an inclusion ratchet — an unregistered cross-layer import reds), CW-1 the cascade braid (display-side; "the
governor edits the paper, never the world"), CW-2x the cause-walk extension, CW-3 the coupling measure. CW persists
zero bytes. Carrier clock (C-LAW-4): information at hop latency, people at law M's floor, goods at caravan speed,
grammar at errand speed; an effect crossing courts the same tick without a carrier is a "telepathy defect". Fold
status: CW-0 LANDED; CW-1 BUILT DARK; CW-2x, CW-3 UNBUILT; `causedBy` adoption zero volumes (requirement 20 now
mandates it). [STATED] `DESIGN_FP_COUPLINGS.md` §0–§1 (lines 50–182), §6; `DESIGN_FP_ARCH_CW.md` §2–§3; fold §2 CW row
(336).

**ES — ESPIONAGE (covert confirmation missions).** NPCs, envoys and merchants take covert missions on the errand spine
to confirm or gather information; covert travel is harder to catch but discredits any open purpose; capture risk
exists ONLY at route segments carrying enemy military and at hostile settlements; products are closed at three
(acquire / confirm / refute); spies are the distant SOURCE of the sovereignty market's appraisal legs about
non-neighbours (ES-4). Fold status: ES-0..ES-5d, ES-6a leak, ES-Da rider BUILT DARK; `espionageEnabled` needs
`errandSpineEnabled`, dark; "our spy was caught in Aldenmoor" cannot fire. W-OPS's rival mission design is a successor
draft, unsanctioned (OD-FC-4). [STATED] `DESIGN_FP_ARCH_ES.md` §0 (lines 63–156); fold §2 ES row (339), §3.1.8.

**WY — WAYFARE (the inhabited roads; the most map-facing program).** One owner directive set in one program: DISTANCE
IS ABSOLUTE (the map's declared scale, not the normalized 2–8 week span); truth is severity-durable in transit; the
roads are inhabited at freeze; the map tells POSITIONS ONLY ("a marker is a presence, never an intention" — no arrows,
destinations, ETA on the canvas); clicking is reading (popup grammar); everything on the map is real and conserved;
ONE projection per entity kind (popup, dossier tab and PDF read one builder); movers carry news; caravans are the
quantized commodity flow; armies eat (F9 `supplyCargo`). Four map sub-layers (armies, caravans, persons, populations)
inside the existing `travelers` registration; a closed encounter-pairs table — the map SHOWS encounters, never creates
them. Nine conditional fields F1..F9, zero new keys. Fold status: WY-1's engine half BUILT DARK in every world
(`kmScale` never written, `creationKmScale` no callers, `realmReach` no consumers); WY-0, WY-2..WY-11 UNBUILT.
[STATED] `DESIGN_FP_ARCH_WY.md` §0 (lines 106–208), §1a, §2c–§3c (685–807); fold §2 WY row (344).

**HB — HABIT CONDITIONING.** "Actors learn, and being known is the price": a habit ledger (`spatialLedgers.habits`) of
learned per (actor × circumstance class × action) stocks credited at the close of an episode; a tilt-never-lock
chooser term; a believed "habit sheet" others form of you (fourth SP-B subject family); a level-one anticipation term
and a deviation damper. Institution-grain, not person-grain (OD-FC-42). Fold status: HB-0..HB-2 BUILT DARK; HB-3..HB-9
UNBUILT; the owner's own example sentence is not expressible at the war chooser. [STATED] `DESIGN_FP_ARCH_HB.md`
header (lines 1–60), §1; fold §2 HB row (345), §3.1.12–§3.1.13, OD-FC-23/42/43.

**WC — WAR CIRCULATION.** "Auxiliary contribution, composite armies, the people ledger, and the domestic dividend: one
system wearing four descriptions": allies send contingents and supplies; a contribution ledger credits ARRIVALS; a war
stance is DERIVED from what arrived, never from a declared label; composite armies carry `blocks[]` of origin cohorts;
free companies, brigandage and the `embattled` state; hop-and-shed absorption; veteran cohorts and diaspora bonds.
Fold status: WC-0A..0E BUILT (vocabularies, column-class union, shapes; no writer); WC-1..WC-16 UNBUILT; the substrate
cannot route grain to a siege line (`supplyShipments` has no quantity, no army endpoint, no food). [STATED]
`DESIGN_FP_ARCH_WC.md` head (lines 1–110); fold §2 WC row (346), §3.1.14–§3.1.18, §3.2.17–§3.2.19.

**EP — ADVANCE EPOCH (living futures, immutable pasts).** See §1.8: a per-user-advance entropy nonce recorded on the
history row; the generator side gets the same law — every user-facing generate/reroll mints fresh entropy, while
typing a seed stays the exact "address door". Fold status: EP-0..EP-3 LANDED DARK; EP-4/EP-5 and the persisted undo
ring unbuilt; lighting waits on OD-FC-31/32. The fold notes "epoch" here never means the town-map construction epoch
of ODQ §240. [STATED] `DESIGN_FP_ARCH_EP.md` line 2 bracket, §0.1, §3e; fold §2 EP row (347).

### 1.12 The later families and the fold's ruling on each (§3.1.20, OD-FC-38)

The fold found that CN, LG, PG and MF "are not FP programs as the spine defines one" (no requirement-13/14 or L10
line, no coupling prefix, no annex, zero spine citations, headers saying "not yet landed" while landed on the ledger
at `1d77ceb67`). Its rulings, by delegation and vetoable: [STATED] fold §3.1.20 (line 281), OD-FC-38 (line 531), §2
later-volumes row (349).

| Family | What it is | Ruling | Map relevance |
|---|---|---|---|
| **LG** — the logistics network (circles, fleets, journeys) | One logistics graph over `distanceRead` (L-LG-1: new modes are EDGE TYPES, never parallel pathfinders); airships and ships as one derived vessel pool (counts derived, only commitments stored); circle edges exist per tick iff the relationship read allows (L-LG-3); units flow toward war, never back (L-LG-4, one rescue exception); checkpoints split observed cargo from believed destination | **FP-ADJACENT**: takes requirement 15's obligations (req-13 and L10 lines, a chartered coupling prefix, an annex) before any wave compiles. LG-0, the WILLINGNESS GATE, repairs a LIVE defect (hostile routing through a target's circle), lands behind `circleNetworkEnabled` as the first unit of LG's slot after the release, and is LIT at landing | High: it is a graph-over-the-digest program; circles and airship docks are existing generated settlement features (LG Q9) |
| **CN** — the DM console cluster | War console, stressor pin, external besieger host, conversion valve, two-hat law, written in the pre-Edit-Mode Change-Dock idiom | **FOLDED INTO EDIT MODE**: cn-1/cn-2 (read model, tab) kept; cn-3 verbs become `REALM_MANIFEST` / `DIRECTION_OP_TYPES` rows; cn-4's stressor pin KEPT as an Edit Mode seal (ODQ §128); cn-5's host reconciles with L10(c)'s phantom; command powers premium | Low (DM surfaces) |
| **PG** — pestilence coherence | Contagion on arrival, resistance and duration, belief-based refusal of groups from known plague towns at the gates; "ONE PLAGUE TRUTH" | **FP-ADJACENT** like LG; absorbs POP-4's arc (§3.1.9); its `afflictionBand` axis lands as a ROW in SP-B's `beliefAxisSubjects` (§3.1.21) | Medium: contagion rides migration columns along roads |
| **MF** — the settlement-map FABRIC (Watabou/FTG clone, truth-bound) | A presentation program: "Zero simulation-engine changes; zero persisted-state changes"; `fabric = f(settlement, style)` | **OUT OF FP** — "its own map family"; in prose "the FABRIC program"; the file keeps its name until moved; distinct from the landed MF-CH2B (the magic shelf gate) | Direct: it is the town-map program (§4 of this note) |
| **EC** — the economy (not one of the four, but later) | Absorbs TR-4..TR-8 and much more (market conditions, procurement, stances, the grain road) | Stays FP; behind the release dispatch gate ("pushed and deployed"); chain C6 | Medium: physical flows are spatial-tier |

[OBSERVED] all of CN (504 lines), MF (486), PG (431) and EC (2,996) first reached `master` in the fold's own merge
`cd347a57` / `81f1cd96` (`git show --stat HEAD`), so the fold's §0 sentence "CN, MF, PG and EC exist only on the
ledger branch" was true at `00b648c9d` and is no longer true at `81f1cd96`; CN is present.

### 1.13 The coupling doctrine in one table (what crosses which boundary at what speed)

| Carrier | Speed law | Source |
|---|---|---|
| Information (rumor, news) | hop latency: `arrivalTick += hopWeeks`, plus a distance-priced surcharge (`hopDelay = floor(hopWeeks × 0.5)`), route impedance near embattlement | `DESIGN_FP_COUPLINGS.md` C-LAW-4 (line 120); `DESIGN_FP_ARCH_IN.md` S3 |
| Named people (envoys, spies, factors, pilgrims) | law M: never faster than one week per route leg; one transit kernel writes all named-person movement | war §1b M (lines 66–70) |
| Goods | caravan legs; M6a integer conservation; food not shipped today | `DESIGN_FP_ARCH_TR.md` S1, S5 |
| Populations | columns at leg speed in `spatialLedgers.migration`; size-scaled speed binds (OD-FC-13) | `DESIGN_FP_POPULATIONS.md` §1b; fold OD-FC-13 |
| Faith spread | carrier reach (spread lane behind `faithSpreadEnabled`) | `DESIGN_FP_COUPLINGS.md` §2 ports table |
| Interior | same settlement, same tick (the fast layer) | C-LAW-4 |

---

## 2. The laws that bind every wave — and that a map-side world generator must respect

The binding scope is now total: requirement 15 extends requirements 1–24 to every FP volume, present and future,
including later programs "where they touch an FP seam". [STATED] fold §1 req 15 (lines 97–103). A map engine that
feeds the simulator is not an FP volume, but every FP wave that reads the map is bound, so the map's outputs must be
shaped so those waves can obey. Where I draw a consequence for the map engine it is tagged [INFERRED].

### 2.1 The fold's constitutional requirements 15–24 (fold §1, lines 90–252; applied to `DESIGN_FP_SPINE.md` §1 lines 110–229 by dated bracket — SPINE lines 111–228 for 15–24)

| # | Name | The law, briefly (quoted where short) | What it asks of a map-side generator [INFERRED] |
|---|---|---|---|
| 15 | BINDING-SCOPE | Every FP volume "present and future … is bound by requirements 1–24"; a volume outside says so in its header with the reason (lines 97–103). | If the map program ever charters waves that read or write FP seams, it must either take requirements 1–24 or declare itself outside with a reason — the fold did exactly this for MF ("OUT of FP") |
| 16 | FIRST-VISIBLE-LATENCY | Each mechanism declares its first-visible latency in DM advances; "a one-month advance must surface at least the mechanism's fast-layer sign"; a wave whose sign fails its experience read "does not LIGHT" (lines 104–115; ruled YES, OD-FC-1). | Map-derived consequences (a road decaying, a column moving) need a fast visible sign within four ticks, or a declared planting line |
| 17 | TIER DECLARATION | Every wave carries a TIER line — "aspatial-safe / spatial canon / belief-recording infoMode / host flags" — and its DEGRADED ARM in the lesser tier; "the SIMULATOR is premium"; the demo cap is temporary, never a design tier (lines 116–126). | The map's canonization is the line between tiers: everything spatial must have a declared aspatial degraded arm. [STATED] the SPINE's copy at lines 129–137 still carries the pre-skeptic wording (the paid-tier triad) — the fold §1 text is the text of record (SPINE line 185 says so) |
| 18 | TUNING-EVIDENCE | A band row carries its measured spread or the word UNMEASURED; the owner signs measured rows only; "absent means zero" needs a written dormancy reason (lines 127–131). | Map-derived bands (distance thresholds, mode speeds) must be measured on seeded families, per map — see the per-map spectrum law (§2.6) |
| 19 | FELT-PROOF | DONE means the DM-felt sentence fires in a lit preset on a seeded world and an experience read scores it, not a green fixture (lines 132–137). | — |
| 20 | PROVENANCE-ADOPTION | "every child receipt of a known outcome populates `causedBy` at its mint (the provenanceKernel road)" (lines 138–143). | Any map-originated event (a route charter, a canonize receipt) that causes downstream effects should be a named parent the cause walk can reach |
| 21 | COUPLING-IDENTITY AND VOCABULARY | Each program's modules belong to ONE of the seven coupling layers or declare themselves a carrier; pair ids closed at CPL-1..21 with a declared extension family; a new volume prefix chartered in the same commit as its first registry row; every closed ladder minted into the VOCABULARY REGISTER with a homonym check — "one word, one meaning per surface" (lines 144–153). | A map program's vocabulary (e.g. scale, route grade, terrain class) must not collide with the register (§6); `kmScale` vs `viewMetersPerUnit` is the precedent |
| 22 | ENGINE-STATE LIFECYCLE AND ERRATUM | (a) ARCH_SP's L4 lifecycle clause — create / read / persist / regenerate / undo / import / migrate / dark-after-lit / death / veil — binds every ENGINE-written state; (b) an erratum lands as a dated bracket in the same commit as its ruling; (c) the Evidence Law ("complete, not cryptic") and "actions, not potential" bind every phrased kind (lines 154–165). | Map-written state that the simulation reads (a digest datum, a route network) needs all ten lifecycle paths stated — e.g. `kmScale` must survive re-canonize (WY's carry-forward clause) |
| 23 | RETENTION-HORIZON | Every ring declares its horizon in `INTERVAL_WEEKS` at a measured event rate, and every advance unit declares what it evicts; a `one_year` advance nets the 80-ring to ~29 advances (lines 166–174; collapse-before-eviction ruled, OD-FC-33). | — |
| 24 | THE HEARING WEEK | The owner's verbatim law: "anything that involves one settlement with another, the height of that engagement … is paused at a week so that the user can always fix them"; "this only applies to week by week advancements. months seasons and years go by automatically"; "The simulator is gated for premium"; standing engagements (a siege) offer the choice every week. Mechanics (a)–(g): one closed ENGAGEMENT REGISTRY; at a one-week advance the climax is docketed with its deterministic default and resolved FIRST at the next advance; no pause cursor; the HEARING SEAL is its own Edit Mode seal kind keyed by engagement id; dark-identical behind `hearingWeekEnabled`; the pending card names "who, upon whom, where, the default verdict" (lines 175–252). | Engagements are located: "where" is a required field of every pending card, so every engagement kind needs a place the map can name (§5 of this note) |

The founding density contract the fold extends (requirements 1–14) is relevant in four places for a map engine: Law
One (the engine "never contradicts a DM's canon"); requirement 6, the DOSSIER COHERENCE LAW (every mechanism sources
from settlement state and lands back in it); requirement 9, THE TEMPORAL CONTRACT ("Everything that moves obeys the
one travel physics (transit kernel, km/week mode table, the week floor)"); requirement 14, the EDIT VERB (every
DM-visible state ships its edit story; a state with no verb is a RECORDED decision). [STATED] `DESIGN_FP_SPINE.md`
lines 21–25, 42–47, 54–60, 95–109.

### 2.2 The J-WR laws (the war program's constitution, inherited verbatim)

The SP volume binds "the nine law families L1–L9 from the war program … verbatim" and the war volume's §10 protocol;
the compiled volume restates them as L1–L9 and adds L10. [STATED] `DESIGN_FP_ARCH_SP.md` §1 (lines 27–31), §10
(917–932); `DESIGN_FP_ARCHITECTURE.md` §1 (lines 71–222).

**War §1a — constitutional** ([STATED] `docs/DESIGN_WAR_RULINGS_ARCHITECTURE.md` lines 27–45):
1. "Same seed and inputs ⇒ byte-identical output, forever."
2. Dormancy: every wave dark behind a virtual flag; dark ⇒ byte-identical; goldens captured before wiring.
3. Seeded purity: no `Date.now`, no `Math.random`, no locale reads, no un-sorted object-key iteration on user data, no
   `Math.pow/exp/log` in engine paths ("multiplication is correctly rounded, pow is not").
4. Monotone ratchets: size, any-cast and first-paint budgets only shrink; new engine code is a lazy leaf.
5. Receipts carry enforcement: every news entry carries an `id`, a full address chain, typed action, affected
   settlements BY NAME, the recorded reason.
6. Premium isolation + audience projection (`includeCovert` / `includeGroundTruth`).
7. Finite semantics: closed banded vocabularies; no float on a surface.

**War §1b — amendment laws** (lines 47–87): K3 NOBODY IS EVER CURRENT (structural truth-read fence); B ABSOLUTE
COHERENCE (every scorer carries a receipt field naming the state that produced its score; a casus contradicted by a
live read scores 0 — "suppress-the-score, never refuse-the-mint"); **M THE SPEED FLOOR** ("no named person moves
faster than ONE WEEK per route leg, ever, on any path … Mid-route positions are real places"; one transit kernel is
the single writer, walker-asserted); E3 DISPOSITION IS A THRESHOLD, NEVER A SELECTOR; I PAIRWISE ONLY (no N-party
treaty object); L NO TIMERS, NO CLAMPS; N/R the overwhelming and extremity gates; C2 the foreign-file law
(`momentum.js` read-only).

**War §1c — recorded hazards** (lines 89–107): the JSON-alias trap (faction members ARE the npc objects in memory);
writer/reader payload-spelling drift; stream theft (keys per entity); vacuous absence pins; unreachable predicate
conjunctions; authored NUL bytes; the id-less news drop.

**Selected judgment blocks J-WR-n** ([STATED] lines 1516–1592) that recur as corpus law: J-WR-3 (dispositions are
persisted banded stock — the ONE disclosed exception to never-store-a-derivable); J-WR-7 (a licence mints on the
PUBLIC fact; courts act on their belief of it at news speed — the root of the loud-fact exemption); J-WR-10 /
J-WR-10-B (J-WR-10, war:1554–1556, is R's extremity read — no new relationship vocabulary; J-WR-10-B, FABLE_VALIDATION_QUEUE.md:1775, generalises it: borrow before minting, no second spelling of an existing concept); J-WR-11
(extend, never duplicate a ledger); J-WR-13 (the census STOP rule: "any implementer finding another census
overstatement STOPS and reports before correcting or building on it").

**The compiled L1–L10** ([STATED] `DESIGN_FP_ARCHITECTURE.md` lines 77–220): L1 DETERMINISM (zero new PRNG streams;
every stochastic choice keyed `hash01` over codepoint-ordered keys; the dead-band law — "a whole realm spans 2..8
march weeks so a band >= 9 refuses nothing"; FP mounts nothing in `pulseKernel.js`); L2 FLAGS (§3 of this note); L3
EPISTEMICS (two pin geometries: the zero-import appraisal leaf and the pinned-import composer; missing belief legs are
honest `known:false` refusals, never truth backfill); L4 PERSISTENCE (§2.7); L5 RECEIPTS; L6 HERALD (five joins); L7
VERIFICATION (violation-row attribution, executed mutants, exactly-once doc pins); L8 SIZE (800 effective lines per
domain file; extraction first); L9 PROCESS (pathspec commits; STOP-and-report is success; requirements 13/14 per wave;
seam pre-contracts pinned from both sides); L10 THE EDITOR (forks registered; seals and world-state predicates; THE
COUNTERPARTY — a `real-only` or `home+record` phantom policy and every neighbour reader must accept a phantom record
"without throwing"; decrees at the tick head; the record register and lived history).

### 2.3 "Genesis is sacred"

- The phrase is the route-lifecycle constitution's law 2: "**GENESIS IS SACRED (same-seed law):** a settlement's
  generation-time tradeRouteAccess config is frozen truth — the LIVED network is worldState that evolves on top of it.
  The initial network derives FROM genesis (access vocabulary + k-NN + geography); divergence between genesis access
  and lived connectivity is expected, visible, and never back-propagates into generation." Its law 1 is the sibling:
  "**THE DIGEST STAYS FROZEN:** the network is a SIDECAR LEDGER over the frozen integer-quantized spatial digest …
  route lifecycle NEVER mutates territory, membership, or positions." [STATED] `docs/DESIGN_ROUTE_LIFECYCLE.md` §1
  laws 1–2 (lines 25–32); the fold read this volume as a reference (fold header line 9).
- The same law appears in TRADE as "GENERATION IS SACRED" (`tradeFlow.js:13-18`: the flow tally never writes economic
  state; TR-4 substitutes inside the import fence and "never rewrites the generation stash"). [STATED]
  `DESIGN_FP_TRADE.md` T7; `DESIGN_FP_ARCH_TR.md` S8.
- L10(e) states it at estate scale: lived worldState-side history sits outside `rederive`; "FP never adds to the held
  set generation re-derives". [STATED] `DESIGN_FP_ARCHITECTURE.md` line 218.
- OD-FC-18 applies it to the route network: the genesis network mount is placed "AT WORLD BIRTH —
  `ensureGenesisRouteNetwork` called from the generation path, never from the pulse, so installed campaigns are
  untouched and the shift is a NEW-WORLD generation shift". [STATED] fold line 511.
- WY-1 applies it to scale: `kmScale` is stamped at canonization and CARRIED FORWARD through every receipted
  re-canonize; "Absent scale = legacy normalized behavior, byte-identical, forever"; re-scaling a legacy world is
  owner-elective future work. [STATED] `DESIGN_FP_ARCH_WY.md` §1a item 1.
- [INFERRED] For a map-side world generator, this means: whatever the map generator produces at world birth
  (positions, territory, adjacency, coast/port facts, route access, scale) is the genesis truth the simulator will
  never rewrite; the simulator's own growth (chartered/abandoned routes, foundings, deaths, embattlement, occupation)
  lives in sidecar ledgers keyed to digest settlement ids. A map program that wants to change genesis (re-canonize,
  re-scale, regenerate) must do it through a receipted re-canonize that carries every lived datum forward, and must
  never silently regenerate under a living campaign.

### 2.4 One-way flows

The corpus never uses "one-way flow" as a single named law; it states several directional fences. I group them here
because each is a constraint on what a map engine may read back. The grouping is mine [INFERRED]; each member is
[STATED] at its citation.
1. **Genesis → lived, never back.** (§2.3.) Divergence "never back-propagates into generation".
   (`DESIGN_ROUTE_LIFECYCLE.md` law 2.)
2. **Map → digest → movers.** The digest is frozen per canon version; movers read it; the route-lifecycle ledger is a
   sidecar; mid-route positions are DERIVED from a mover's clock and never stored as place ids — "the ONLY lawful
   widening is the existing typed discriminator `{kind:'settlement'|'route_node'}`" (the route-position guard).
   (`DESIGN_FP_ARCH_WY.md` §2d lines 706–719.)
3. **Truth → belief, through one door.** Belief is fed only through `axisGroundTruth`-shaped seams under the
   `infoMode` gate; "BELIEF MOVES FEET, NEVER GRAIN" — belief may colour attraction, never capacity, viability or
   conservation; "no rumor ever moves grain or capacity". (`DESIGN_FP_ARCH_SP.md` L3; `DESIGN_FP_POPULATIONS.md` §1b;
   `DESIGN_FP_COUPLINGS.md` CPL-8/CPL-16 declared-empty.)
4. **Truth → Herald, never rumor → Herald.** The contamination fence: Herald composers never read a rumor ledger,
   belief map or disinfo record as a content source. (`DESIGN_FP_SPINE.md` lines 479–486.)
5. **Canonical state → presentation.** The scene manifest and the map fabric are pure projections; "neither is a
   second mutable settlement model"; the fabric is `f(settlement, style)` with "NO persisted state"; machine prose
   renders BESIDE a DM-edited field and has nowhere to write. (`ARCHITECTURE.md` line ~174; `DESIGN_FP_ARCH_MF.md` §0,
   §3; `DESIGN_FP_SPINE.md` lines 579–588.)
6. **The DM's canon → the engine, never the reverse.** Law One: "never contradicts a DM's canon"; user-forced facts
   are TRUTH (MF §5.-1c: the map solves for land that makes every forced fact believable, never drops one).
   (`DESIGN_FP_SPINE.md` line 25; `DESIGN_FP_ARCH_MF.md` lines 233–241.)
7. **Units flow toward war, never back** (LG's logistics law, one rescue exception). (`DESIGN_FP_ARCH_LG.md` L-LG-4.)
8. **Couplings ride existing reads; the governor edits the paper, never the world.** (`DESIGN_FP_COUPLINGS.md`
   C-LAW-2, J-CPL-4.)
9. **Lived past is immutable; only the un-lived future re-draws.** "A pulseHistory entry, once written and committed,
   is NEVER rewritten"; undo discards a suffix; a phantom's record-only outcomes stay record-only after it is forged.
   (`DESIGN_FP_ARCH_EP.md` §3c line 2502; `DESIGN_FP_ARCHITECTURE.md` L10(c).)

### 2.5 Determinism

- THE PROMISE as amended by EP (owner-signed constitutional shift): "a seed is a starting world, forever; a lived
  history, once lived, forever." Two DMs sharing a seed share the starting world, not the future (once
  `advanceEpochEnabled` lights). [STATED] `DESIGN_FP_ARCH_EP.md` §0.1 (lines 288–297), §8.5 (covenant 1's new text).
- THE GENERATOR SIDE (owner): every user-facing generate / reroll / regenerate affordance mints FRESH entropy per
  click; typing or pasting a seed is the ADDRESS DOOR that returns the exact starting world; internal replay stays
  deterministic via recorded seeds. [STATED] `DESIGN_FP_ARCH_EP.md` §0.1 (lines 299–308). The census of eighteen
  affordances includes two map ones: A11 the town-map "Reroll layout" (a COUNTER, not entropy — reset-then-reroll
  replays variant 1 forever; parked as an owner-gated persisted-shape row, recommendation "MINT A SEED, DO NOT WIDEN
  THE COUNTER") and A12 the world map's "Regenerate the world" → `bridge.resetMap()` (fresh but UNRECORDED — no seed
  captured from the FMG iframe; owes "the recorded clause", EP-4 slice 2 behind the flag). [STATED]
  `DESIGN_FP_ARCH_EP.md` §3e table rows A11–A12, §7a row 2.
- Seeded purity and `hash01` keying (§2.2); entropy only at the store layer (lint bans `Math.random` / `Date.now`
  across `src/domain`, `src/workers`, `src/generators`, `src/kernel` except `prng.js`). [STATED]
  `DESIGN_FP_ARCH_EP.md` §3a (lines 1191–1196).
- Determinism for presentation: the fabric seeds as "a PURE HASH FORK of the persisted seed … NEVER the live
  generation rngContext", trig-free integer geometry (the cross-machine ULP law), byte-identical exports. [STATED]
  `DESIGN_FP_ARCH_MF.md` §3.
- Same-seed SHIFTS are first-class events: every lighting or cure that moves output is a "declared same-seed shift"
  recorded with its cause (OD-FC rows 3, 5, 7, 12, 13, 15, 16, 18, 22, 26, 30, 33, 34, 39 and §3.2.3's reader).
  [STATED] fold §7 preamble (line 489).
- PER-MAP CALIBRATION: distance bands derive from each digest's measured spectrum (min/median/max leg weeks), never an
  authored absolute week literal. [STATED] `DESIGN_FP_ARCH_WY.md` §1a item 3; `DESIGN_FP_ARCH_WC.md` §5.3.

### 2.6 The ledger discipline

"Ledger" means two things in this estate; both bind.
- **The state ledgers (L4).** "Fight for ZERO new top-level worldState keys"; the sanctioned growth surface is a
  conditionally materialized `spatialLedgers` sub-key "with exactly ONE writer"; conditional fields drop-when-absent
  ("an empty array is a key and a key is a byte; absent, never null"); every state-writing wave lands its
  canonical-model entry and lifecycle-paths clause BEFORE its writer builds; records with a load-time normalizer teach
  it the new field in the same commit; single-writer families are enforced by shrink-only source-scan censuses with an
  executed third-writer plant. [STATED] `DESIGN_FP_ARCHITECTURE.md` L4 (lines 130–145). Requirement 22a extends the
  ten lifecycle paths to every engine-written state. [STATED] fold line 155.
- Persisted-record SHAPE is an owner-gated class: WY's nine fields and WC's four ledgers were batch sign-off requests
  (WY's nine fields signed by J-EM-9's reading of the 2026-08-05 blanket grant, WY:100; WC's four-ledger batch signed by delegation, OD-FC-20; F9's shape ruled by OD-FC-21). [STATED] `DESIGN_FP_ARCH_WY.md` header (lines
  96–102); fold OD-FC-20/21.
- One writer per field family: FAITH's `religionStates` is "one writer FAMILY per field family" (§3.1.6); the
  column-class vocabulary is ONE union with POP owning civilian and WC military classes (§3.1.7); one plague truth
  (§3.1.9); one law-band table (§3.1.13); one suspicion derivation (§3.1.12); one army-supply truth (OD-FC-21).
  [STATED] fold §3.1.
- **The registry ledgers.** Any wave landing a cross-layer read adds its CW-0 coupling-registry row in the SAME commit
  (walker-enforced inclusion ratchet); a new flag joins `ENGINE_GATED_VIRTUAL_RULE_KEYS` with an AUTHORED
  certification row in the same commit as its first gate read (the "declared-pending" door is struck); every fork
  registers in `HABIT_FORK_REGISTRY`; every news kind registers its five joins. [STATED] `DESIGN_FP_SPINE.md` §5
  (lines 690–695); fold §3.2.14; L10(a); L6.
- **The governance ledger.** One wave = one commit + a ledger row (`docs/COMPREHENSIVE_REVIEW_PROGRAM.md` on the
  ledger branch, or the program's PROGRESS blockquote); owner decisions live in `docs/OWNER_DECISION_QUEUE.md` on the
  ledger branch `review-fixes-2026-07-08`; requirement 22b makes an erratum a dated bracket in the same commit as its
  ruling. [STATED] war §10 item 3 (lines 1751–1755); `docs/CURRENT_STATE.md` lines 3–9; fold req 22b.

---

## 3. The flag family and the dark-wave discipline — as constraints on a new physical substrate

### 3.1 The flag law (CR-WR10-C, L2, compiled §3)

Every FP flag is VIRTUAL: [STATED] `DESIGN_FP_ARCHITECTURE.md` §3 law (lines 465–482), L2 (lines 95–113);
`DESIGN_FP_ARCH_SP.md` §1 L2 (lines 45–57).
- ABSENT from `DEFAULT_SIMULATION_RULES` and so from every preset's default spread; PRESENT and strictly `true` only
  in the presets a LIT-n lighting unit names (J-EM-16).
- Read only as strict `=== true`; "dark-never-permissive"; at least one BY-NAME read per flag (the conjunction-gate
  hole: a read only through a frozen-list `.every()` attributes to no key and is invisible to the walker).
- MANIFEST TIMING IS MECHANICAL: the key joins `ENGINE_GATED_VIRTUAL_RULE_KEYS` in the SAME commit as its first real
  gate read, with its AUTHORED certification row in that commit (the declared-pending door is struck — fold §3.2.14),
  and `tests/lint/engineGatedRuleKeys.walker.test.js` asserts exactly the one-key delta both directions.
- Display-side flags take an `EXEMPT_RULE_KEYS` rationale row instead (precedent: `heraldCausalVoiceEnabled`).
- Conjunctions are explicit and read by name: SP-B's axis flags AND `beliefAxesEnabled`; `espionageEnabled` requires
  `errandSpineEnabled`; every WC flag reads the root conjunct `warCirculationEnabled` FIRST; HB's ladder is strict;
  LG's journey waves ride `vesselFleetsEnabled` ∧ the ES mission flags. [STATED] compiled §3 (lines 565–590);
  `DESIGN_FP_ARCH_LG.md` §3.
- Flag-minting commits SERIALIZE across volumes (CQ5's collision law: a WC flag wave and an HB or EP flag wave may not
  build concurrently in the same worktree). [STATED] compiled §3 (line 581).
- Scale of the family: 63 new virtual flags in the compiled order (plus the SEAM family's three, `hearingWeekEnabled`,
  LG's two, PG's `contagionEnabled`, CN's two); the manifest held 43 entries at `00b648c9d`. [STATED] compiled §3
  table (lines 484–546) and its 2026-10-16 bracket at §2b item 5; fold §3.4 rule (1); LG §3; PG §1; CN §3.

### 3.2 The dormancy proof — "dark ⇒ byte-identical"

- THE FOUR-FENCE DORMANCY SET for every flag: (1) own-footprint golden (flag absent ⇒ output byte-identical to before
  the wave, captured BEFORE wiring); (2) absent-vs-false differential (`undefined` and `false` behave identically);
  (3) a call-path spy (the gated entry is never invoked dark); (4) a gate-polarity census (every read site is `===
  true`, by source scan over the module set). PLUS the LIT-MUTANT CONTROL: force the flag on over the fixture and
  prove fences (1) and (3) trip — "the differential alone is blind by design". [STATED] `DESIGN_FP_ARCH_CW.md` §2
  (lines 101–117); compiled L2 (lines 95–113).
- EP adds a FIFTH fence because a flag can be dark at resume but lit at pause: the dark contract must be FLAG-DRIVEN,
  not value-driven (every conditional spread keys on the flag-gated value, so a world flipped dark never serializes a
  new key). [STATED] `DESIGN_FP_ARCH_EP.md` §1.2 (lines 690–698), §2.3b, §2.5 headings.
- Conditional fields are the dormancy mechanism for state: "absent, never null"; a dark config never writes the field,
  so installed saves stay byte-identical; a mid-world flip reads absent-as-neutral and "never back-derives history".
  [STATED] `DESIGN_FP_ARCH_SP.md` §4 lifecycle clauses (lines 285–322).
- DATA-GATED dormancy is the alternative to a flag when the gate is a datum: WY-1 has NO flag; it is "DATA-GATED by
  `spatialDigest.kmScale`" — absent scale ⇒ legacy behaviour, byte-identical forever. [STATED] compiled §5 WY-1 (lines
  1099–1111). [OBSERVED] `spatialDigest.js:571–576` stamps the key "appended LAST and ONLY when
  modeSpeeds.admitKmScale admits it … ⇒ NO kmScale key ⇒ byte-identical".
- MODULE PRESENCE NEVER PROMOTES A WAVE: a module existing in `src` because it is a modify target, or a flag minted
  because a wave reads it, is not progress. [STATED] `DESIGN_FP_ARCH_EP.md` lines 14–20; `DESIGN_FP_ARCH_HB.md` lines
  16–20; `DESIGN_FP_ARCH_WC.md` lines 26–30.

### 3.3 The lighting contract (from "every wave dark" to "shipped lit")

- The August law ("every wave ships DARK; no flag lights outside the owner-signed schedule") is SUPERSEDED for FP by
  the owner's 2026-09-23 word "no just build it all shipped lit". A wave's commit is unchanged (the flag stays virtual
  with all its fences); LIGHTING is a SEPARATE unit (LIT-n) that adds the key to the presets the lighting map names,
  in DEPENDENCY ORDER, only when the layer's own lighting instrument reads SATISFIED, and re-records every moved
  golden "WITH THE CAUSE". [STATED] compiled §12.8 J-EM-15/16 (lines 3273–3279).
- Lighting order = build order; "a flag lit out of order is an invalid config each program's convergence walker reds".
  [STATED] compiled §3 lighting contract (line 628).
- The TIER line (requirement 17) decides where a lit flag can do anything: aspatial-safe mechanisms light in EVERY
  world-alive preset including the default (OD-FC-3/16/26 were re-scoped this way after skeptic S3 M12); belief
  mechanisms need spatial canon + non-omniscient infoMode; LG-8 (news carriage) is a no-op under omniscient (Q8); LG's other waves need spatial canon. [STATED] fold OD-FC-3,
  OD-FC-16, OD-FC-26; `DESIGN_FP_ARCH_LG.md` §2 Q8.
- A seal over a dark layer is not offered: "the layer's own gate … is part of every FP predicate by construction,
  because the predicate reads the layer's ledger and a dark layer has none". [STATED] compiled §12.1 "The dark-layer
  law" (line 3112).
- The four experience reads of 2026-10-02 found the lit layers "nearly silent at the table"; requirement 19 and FP-40
  CHAIN-FIRST now gate DONE on a felt sentence. [STATED] fold req 16 parenthesis, req 19.

### 3.4 What this means for a new physical substrate (a map-side world generator feeding the simulator) [INFERRED, from the laws cited]

1. **Every new datum the map hands the simulator must be dormant-by-absence.** If the map engine produces a new digest
   field (elevation, biome class, river graph, coast type, chokepoint ids …), the WY-1 precedent is the model: the
   field is appended only when admitted, absent means legacy behaviour forever, and existing canonized worlds never
   shift. A new field that changes any existing reading when present is a declared same-seed shift that needs its own
   owner-signed lighting unit (signed, since the 10-16 delegation, by the chair and vetoable — as item 4 says).
2. **Anything the simulator reads from the map must enter through one reader.** The one-substrate distance law (IN
   §1b) and L-LG-1 ONE GRAPH forbid a sixth distance price or a parallel pathfinder; a new terrain cost or travel mode
   is an EDGE TYPE or an input to `distanceRead`'s calibration, not a new clock. WY-1 chose the calibration constant
   over the grade-multiplier socket for exactly this reason (WY §1a bracket).
3. **Terrain-derived bands must be per-map measured, never absolute literals.** The per-map spectrum law and
   requirement 18 mean that any map-derived threshold (a "far" distance, a mountain-pass delay) derives from the
   digest's own spectrum or carries an in-file justification and a measured spread.
4. **Persisted shape is owner-gated.** A new `spatialLedgers` sub-key or record field needs its canonical-model entry,
   the ten lifecycle paths, a single writer, a normalizer teach, and an owner (now delegated) signature before its
   writer builds.
5. **Route positions stay derived.** No map change may introduce stored route-position ids without the ~130-read
   consumer census first (WY §2d).
6. **Re-canonize is the only lawful rebuild, and it is receipted.** `runSpatialCanonize` already documents a receipted
   re-canonize on founding events that bumps `spatialCanonVersion` and carries forward the prior digest's scale; a map
   regeneration under a living campaign must reuse that path or be a new world. [STATED] `DESIGN_FP_ARCH_WY.md` §1a
   item 1. [OBSERVED] `src/store/campaignSpatialCanonize.js:110`.
7. **Flags light in dependency order behind instruments.** A physical-substrate feature consumed by FP layers (e.g. a
   real route network) lights only when its instrument reads SATISFIED and every layer it reads is lit in that preset;
   the route network's mount precedes `routeLifecycleEnabled` and `demographicsEnabled` (OD-FC-18).

---

## 4. The fold's conflicts, rulings and owner rows that touch the map, the realm, the spatial digest, Phase 5.5, the fabric program, FMG or terrain

**What the fold does NOT mention.** [STATED] by grep over `docs/DESIGN_FP_COHERENCE_FOLD.md`: zero occurrences of
"terrain", "Phase 5" or "digest"; "FMG" twice (both in OD-FC-22 / skeptic S3 M1); "fabric/FABRIC" once (§5); "canoni-"
twice; "spatial canon" four times (all TIER statements). Every map-touching ruling is therefore indirect — through
distance/scale, movers on roads, the route network, the column classes, the embattlement ledger, the later families'
membership, and the tier law. Rulings are the chair's under delegation and vetoable by one owner clause. [STATED] fold
§7 preamble (line 489).

### 4.1 §3 cross-program conflicts that touch the map

| Row | The conflict (compressed) | The ruling (quoted or closely paraphrased) | Why it matters to the map engine [INFERRED] |
|---|---|---|---|
| **3.1.11** The mode-speed table (fold line 272) | SPINE said SP-7 owns it; ARCH_SP said "not SP work"; WY-1 built it. | "WY-1 owns the TABLE (landed, dark); SP-7 owns the TEMPORAL WALKER (unbuilt — §4 gives it a wave)." | The km/week mode table (foot, cart, river, coastal, sea) is the one place terrain-and-mode speed enters; it is WY's, data-gated by `kmScale` |
| **3.1.7** Column classes (line 268) | LG made POP sole owner of column vocabulary; WC-0B widened the union (`veteran_return`, `shed_column`); POP-1 wanted `'returning'`, colliding with three states. | "the union stays (it shipped); ownership is amended to 'POP owns the CIVILIAN classes, WC the MILITARY classes, ONE union, one `columnOf` whitelist'; the return class is ruled ONCE … as `column_return`" — clarified: `columnOf` is a module-private normalizer (`migration.js:543`), so the "one whitelist" is the union's one declared list. | Map layers that render populations/armies on roads bind to ONE column vocabulary in `spatial/migration.js` |
| **3.1.14** Stocks that flow to an army (line 275) | WC's `supplies_delivered` vs EC-4's procurement; food is `NON_SHIPPED`, `supplyShipments` never routes it. | Re-ruled after S2-13 / S4 M3: "no EC wave mints an ARMY-endpoint consignment … the army-endpoint consignment is WY-8a's F9 `supplyCargo` under OD-FC-21 — WC's supplies arm waits on WY-8a (chain C7) and WC-1 credits its ARRIVAL; EC-4 stays the OWN army's kit." Food still does not ship (T7). | Supply becomes a stock-in-transit ON THE ROAD (a positioned, conserved quantity) — a new kind of mover the map must be able to show |
| **3.1.15** The relay's substrate (line 276) | WC-3 assumed shipment buckets and entrepot skims; `supplyShipments` records are quantity-free links and "the entrepot toll is a route COST that takes no goods (`entrepots.js:13-16`)". | First CUT-TO-SENTENCE, then re-ruled after S4 B5: "WC-3 is RECORDED WITH THE SLOT 'THE HOST', charter kept whole; the laws L10/L11 bind now." | Entrepots and tolls are route-cost properties of the network, not goods ledgers |
| **3.1.16** EMBATTLED (line 277) | WC-12 would mint "a located stressor WITH A SOURCE BODY" while a persisted `embattlement` REGION ledger with phase `embattled` already exists (`spatial/embattlement.js:1-30`). | "a brigand siege is ONE MORE RAMP TERM on `embattlement.js`, never a parallel stressor." Also §5: `embattled` means ONE thing, "the ledger's phase". | A region-grain spatial ledger already carries contested state; new terrain-located danger must feed it, not fork it |
| **3.1.20** CN · LG · PG · MF are not FP programs (line 281) | No req 13/14 or L10 line, no coupling prefix, no annex, zero SPINE citations; "MF is a map-rendering program under the FP prefix by naming accident". | "MF OUT of FP (its own map family; distinct from the landed MF-CH2B); CN FOLDED into the Edit Mode program …; LG and PG stay FP-adjacent and take requirement 15's obligations before any wave compiles; LG-0's willingness gate (a LIVE defect: hostile routing through a target's circle) is the first unit of LG's own slot after the release — it lands behind `circleNetworkEnabled` … and is LIT at landing as the defect's cure". Re-ruled after S4 B1: cn-4's stressor pin is KEPT as an Edit Mode seal (ODQ §128). | The FABRIC program is the map program's own; LG's teleport/circle edges are a live routing defect over the map graph |
| **3.1.12** The suspicion derivation (line 273) | HB's damper reads `sightPostures` (truth). | "ONE derivation, IN-3's `suspicionOf` … HB's truth read is struck." | Line-of-sight/visibility postures are a truth ledger beliefs may not read directly |
| **3.2.16** Size-scaled speed for migrating populations (line 303) | The owner's ODQ §125.4 (columns travel slower with size) and `tribute_population` absent from POP's volumes and code. | "CHAIR records both as POP obligations with slots: §125.4 is a WY-4 band (column speed by size band, the army idiom)"; OD-FC-13 then rules both "BIND without re-asking; the column speed is POP's row … WY-4 READS the band, POP owns it". | Movement speed on the map gains a size term for columns as for armies |
| **3.2.18** "Arc A ships value early" (line 305) | The dispatch executor's aspatial arm vs its spatial arm. | Re-ruled after S4 B2: "Chain C2's order is therefore: WC-6's normalizer car → WC-4's chooser + executor with WC-1 ALONGSIDE; … the aspatial muster writes `blocks[]` only." | Every war-circulation effect has an aspatial arm that must not need the map |
| **3.2.22** ES-5d's new `spatialLedgers` sub-key (line 309) | `missionCreditEvents` minted against ES §1's "ZERO new spatialLedgers sub-keys". | Recorded as LANDED-DARK; ES §1 amended to "zero new sub-keys EXCEPT the one ES-5d minted"; the first byte it writes is named in OD-FC-39's lighting unit. | `spatialLedgers` growth is policed key by key — any map-side sub-key would be too |
| **§2 POP row** (line 342) | — | "a column was refused at the wall" cannot fire: "POP-1 unbuilt and the route network never written: nothing writes `ensureGenesisRouteNetwork`, so the migration menu is EMPTY in every shipped world". | The simulator's route network is supposed to derive from genesis geography (k-NN + access vocabulary) — the map's adjacency is its input |
| **§2 WY row** (line 344) | — | WY-1's scale table built but "`kmScale` never written: FPQ-37; `creationKmScale` zero callers; the mode table never lights"; "the caravan is a week out" cannot fire (WY-3 unbuilt). | Absolute distance is fully designed and dormant until the creation flow supplies a scale |
| **§6 C3 / C7** (lines 475, 479) | — | C3: the most felt POP mechanism is aspatial, but "the column needs roads first". C7 WAYFARE'S BODIES: "WY-3 then TR-4/EC-12; WY-10 markers on WY-3" — "the caravan becomes a thing on the road" (spatial tier). | The chain order puts physical movers on the map late (C7), after the aspatial chains |

### 4.2 §7 owner rows that touch the map (each RULED BY DELEGATION 2026-10-16, vetoable)

- **OD-FC-22 — the `kmScale` default, and FMG** (fold line 515). Question: FP-10's "each map's implied scale" vs the
  code's FMG default; `MODE_SPEEDS` and `DEFAULT_KM_SCALE 3` are unsigned draft rows. Ruling, "twice corrected — lane
  F found the implied scale equals the legacy read to the bit, `distanceRead.js:607-612`; skeptic S3 M1 found FMG's
  default UNIT is MILES, `public/map/index.html:5231`, so `DEFAULT_KM_SCALE 3` is 3 mi ≈ 4.83 km and the
  `modeSpeeds.js:66-77` comment is wrong": "the default is the map's EXPORTED `distanceScale` + `distanceUnit` (FMG
  `export-json.js:90`) converted to km at canonisation; `DEFAULT_KM_SCALE` is the FALLBACK for maps with no scale
  only, its unit fixed to km, and it goes on the FP-46 tuning roster (OD-FC-28) with `MODE_SPEEDS`; the creation flow
  shows the read value". Moves: "lights absolute distance for new worlds; a same-seed shift on scaled new worlds".
  [OBSERVED] `src/domain/spatial/modeSpeeds.js:77,81,180` (`DEFAULT_KM_SCALE: 3` and its fallback use).
  - [INFERRED] For the map engine this is the binding interface ruling: the world scale the simulator uses is whatever
    the map EXPORTS as its distance scale and unit, converted to km at canonization; a map engine that replaces FMG
    must export an explicit scale + unit, or the simulator falls back to a signed default.
- **OD-FC-28 — the end tuning roster** (line 521): adds `MODE_SPEEDS` and `DEFAULT_KM_SCALE` (with `EXPOSE_BASE`, the
  legitimacy recovery clock, the `disease_pressure` floor, `STARVE_FULL_TICKS`/`CREDIT_TERM`); "review together; THE
  PROMISE keeps tuning owner-signed at the end review".
- **OD-FC-18 — the route-network mount** (line 511): "the mount is AT WORLD BIRTH — `ensureGenesisRouteNetwork` called
  from the generation path, never from the pulse, so installed campaigns are untouched and the shift is a NEW-WORLD
  generation shift told to the owner (FPQ-44); it lands as chain C3's first unit AFTER the release;
  `demographicsEnabled` lights at the signed soak". The question also required "a no-flow-yet arm so imports are not
  quartered" (lighting routes beside demographics would cut every settlement’s food imports to a quarter — fold §0
  lines 68–70).
  - [INFERRED] The simulator's living route network will be seeded from genesis geography at world birth; the map
    engine's adjacency and access data are its seed.
- **OD-FC-13 — size-scaled column speed and `tribute_population`** (line 506): both "are the owner's own directives
  and BIND without re-asking; the column speed is POP's row … WY-4 READS the band".
- **OD-FC-21 — one army-supply truth** (line 514): "F9 as the stock, the scalar DERIVED (one truth, the band a read)"
  — the army carries an integer supply stock in transit; `supplyIntegrity` becomes a derived read.
- **OD-FC-35 — "reinforcements and supplies"** (line 528): "the supplies half rides WY-8a's F9 `supplyCargo` (chain
  C7), the ONLY army-endpoint consignment; WC-1 credits its arrival; EC-4 stays the own army's kit; WC-4's
  `send_supplies_to` executor is DARK until that road exists".
- **OD-FC-38 — CN · LG · PG · MF membership** (line 531): "as §3.1.20; CN OQ-1 RULED (lane H item H8): command powers
  are premium (the Edit Mode surface, U16), AUTHOR is not priced apart from ORDER".
- **OD-FC-17 — THE AGES** (line 510): corrected by skeptic S3 B2 because "ODQ §764.1/.4/.5 — the owner's own word —
  forbid a post-launch disposition for anything but the map module; THE AGES is therefore a PRE-LAUNCH coherence
  chain, C8". [INFERRED] The map module is the one named exception allowed to have post-launch dispositions in the
  owner's §764 word — a scheduling fact for the map program, quoted here second-hand from the fold.
- **OD-FC-3 / OD-FC-16 / OD-FC-26 — scoping by TIER** (lines 496, 509, 519): each lighting was "scoped by S3 M12" to
  "every world-alive preset including the default" because the mechanism is aspatial-safe. [INFERRED] The tier law
  lets aspatial mechanisms light in non-canonized worlds; only spatial-canon mechanisms wait on the map.
- **OD-FC-41 — THE HEARING WEEK** (line 534): "RULED BY THE OWNER'S OWN WORDS … the chair's design of the registry,
  the ledger, the three choices and SP-9 is the delegated part"; moves "a same-seed shift at lighting (every climax
  one tick later); a persisted PENDING LEDGER; the Edit Mode seal family gains one kind".
- **OD-FC-44 — POP's persisted shapes** (line 537): the migration column's `believedBand` lands with POP-1 — a belief
  carried ON a column on the road.

### 4.3 §5 register rows and §9 skeptic findings that touch the map

- `kmScale` (line 434): "WY's world scale · MF's town-map scale bar `viewMetersPerUnit`" → "distinct identifiers;
  prose: 'the world scale' / 'the map's scale bar'".
- `MF` (line 457): "the map-fabric program is renamed **'the FABRIC program'** in prose; its file keeps its name until
  OD-FC-38 moves it".
- `reachBandOf` (line 432): WY's `REACH_BANDS` (`modeSpeeds.js:198`) vs a module-local in `conquestFeasibility.js:219`
  → "WY keeps; the feasibility helper is renamed `feasibilityReachBandOf` at its next touch".
- `taint` / `watched` (line 450): `watched` "is a landed SAFETY_BANDS rung (`districtProfile.js:41`)" — a town-map
  district band — so WC's unlanded "WATCHED block" is renamed "the marked block".
- `crossing` (line 439): "stance crossing" vs "entrepot crossing" (the route network's crossing counter) — prose
  always qualifies.
- `embattled` (line 452): ONE meaning, the live ledger's phase.
- Phantom policy (line 458): only `real-only` and `home+record`; "`home-only` is NOT a policy".
- Skeptic S3 M1 (line 642): "FMG's default unit is miles … CURED — OD-FC-22 rebuilt".
- Skeptic S1-10 (line 602): "LG-0 'waits on nothing' breaches the release gate … CURED — first unit of LG's slot after
  the release, lit at landing".
- Skeptic slice 5 M on `armies_meet` (line 696): "STANDING-at-contact on the forecast-overlap read, both armies hold,
  built as a leaf".

### 4.4 Adjacent map-facing rulings outside the fold that the fold leaves standing [STATED at the cited volume]

- WY §3b THE AMBIGUITY LAW: "A marker is a presence, never an intention. No direction arrows, no destination lines, no
  path highlights, no heading flips, no destination/ETA/purpose in canvas tooltips"; the shipped travelers layer's
  chevrons and the deployment arrows of `WarFaithMapOverlay` are to be deleted (WY Q3, ruled). (`DESIGN_FP_ARCH_WY.md`
  lines 763–782.)
- WY §3c THE COVERT LAW: covert travelers render only in the DM's true view; player surfaces omit the ENTITY, not the
  field; the census-1 hole (`viewerSeesDmSecrets({ isOwner: !!auth?.user })` at SIX map call sites) is still live.
  (Lines 784–807.)
- WY §3e THE SINGLE-PROJECTION MIRROR LAW: the popup, the dossier tab and the PDF read the same projection builder per
  entity kind. (Heading line 855.)
- WY §4: the encounter-pairs table is CLOSED; "the map shows encounters, never creates them". (Heading line 998.)
- MF (out of FP, the map family's home): the terrain-first law (a seeded local heightfield and wetness/flow before any
  nucleus; "Randomness proposes; terrain disposes"), the forced-fact reconciliation law (the substrate solves for land
  that makes every user-forced fact believable), the wall law's correction ("we do NOT own true exit-road bearings" —
  MF-3 derives them from the frozen digest's territory adjacency/gates, threaded as a parameter so "worldState never
  enters the model or its PRNG"), and the TRUE scale bar that still needs its own derivation home.
  (`DESIGN_FP_ARCH_MF.md` §2 laws 4 and 6, §3, §5.-1, §5.-1c, lines 188–241.)
- LG L-LG-1 ONE GRAPH and L-LG-3 POLITICS IS THE PREDICATE (circle edges recomputed from the relationship plane each
  pulse). (`DESIGN_FP_ARCH_LG.md` §1.)
- The Edit Mode volume: `kmScale` "has no seal (engine-only, with the reason recorded)" because "the scale is carried
  forward through every re-canonize and no settlement holds it"; the `worldFact` card exposes terrain, culture,
  monster threat, stressors and resources as world facts. (`DESIGN_FP_ARCH_EDITOR.md` lines 168, 219, 651.)
- The compiled seal ledger: the naval `ORDER_CONVOY` "needs a canonized map". (`DESIGN_FP_ARCHITECTURE.md` §12.2 row
  5, line 3122.)
- The PROMISE copy sweep amends a map component's consent text: `AutoplacementConsent.jsx`'s "A seed is a world, and
  this one is written." becomes "A seed is a starting world, and this realm's places are written."
  (`DESIGN_FP_ARCH_EP.md` §8.5, tier 1.)

---

## 5. The engagement registry (fold §3.4) — where it names places, distances or terrain

The registry is ONE closed list of every inter-settlement act ("an act of one court, army, envoy, spy, caravan,
column, legate, house, or any NPC of one settlement upon another settlement or its NPCs"), each row: kind · owning
program · CLIMAX tick · verdict vocabulary · class (CLIMAX = one hearing; STANDING = a hearing every week it stands).
It is seeded from the census of live acts so its walker is green on day one, and once lit "a kind outside the registry
cannot resolve". [STATED] fold §1 req 24(a) (lines 192–198), §3.4 (lines 353–388).

**No row names terrain.** [STATED, the fold read] none of the 30 rows (35 kinds; five rows carry two kinds) mentions terrain, elevation, rivers, coasts or biome;
locations enter only as roads, walls, settlements, hosts and "the encounter". Every pending card must still name "who,
upon whom, **where**, the default verdict" (req 24(g), lines 249–251) — so "where" is mandatory even though the
registry itself carries no place field. [INFERRED] the place a card names will be whatever the engagement's own record
holds: a settlement id or a derived road position (route positions stay derived — WY §2d).

| Kind (owner) | Place it names | Distance / time it names | Class |
|---|---|---|---|
| `armies_meet` (WC Arc A; the live encounter in `armyTransitKernel`, built as a leaf) | **a road** — the owner's own example: "two antagonistic armies meet in a road" (line 179) | climax = "the tick the forecast paths of two hostile armies overlap (the live contact read); both armies HOLD at contact for the hearing week" | STANDING-at-contact |
| `siege` (war volume; seal 6 `letSiegeFall` generalized) | the besieged settlement | "every week the siege stands" | STANDING |
| `pact_acceptance` (GR-2; SP-D's errand arrival) | the responder's court, reached by an envoy | "after the envoy's one-week dwell where an envoy carries it"; the owner: "An envoy must stay a week in a settlement before the decision is made" | CLIMAX |
| `mediation_offer` (GR-6) | — | the offer's arrival | CLIMAX |
| `succession_reaffirmation` (GR-4a) | — | the heir's answer tick | CLIMAX |
| `spy_at_target` (ES-2/ES-3) | the target settlement | "every week of the stay (detection re-rolls weekly)"; the owner: "A spy must stay a week as well" | STANDING |
| `lure_sprung` / `plant_taken` (IN-2, IN-0a) | — | the take tick | CLIMAX |
| `call_in_answer` (WC-5) | — | the called court's answer tick | CLIMAX |
| `contribution_dispatch` (WC-4) | — | the elected send | CLIMAX |
| `caravan_seized` (WY-6 / EC-18's open road) | **the open road** (the encounter on a route) | the encounter tick | CLIMAX |
| `raid` (war volume, border incidents) | **the border** | the raid's landing | CLIMAX |
| `column_at_the_wall` (POP-1, the clearing) | **the wall** of the destination settlement ("the wall is discovered at the wall") | the column's arrival | CLIMAX |
| `legate_received` / `pilgrims_received` (WF-2) | the receiving settlement | "the arrival's dwell" | CLIMAX |
| `tribute_demand` / `trade_rights_demand` (GR term producers) | — | the demand's hearing | CLIMAX |
| `war_declaration` (war volume) | — | the decision tick | CLIMAX |
| `blockade` / `occupation_contest` (war volume / WC R6) | the blockaded or occupied settlement | "every week it stands" | STANDING |
| `negotiation` (GRAMMAR) | — | "every week the draft stands" | STANDING |
| `factor_parlay` (EC-15 / TR-8) | **the host** settlement | "the factor's one-week dwell at the host" | CLIMAX |
| `peace_offer` (war volume) | — | the offer's arrival | CLIMAX |
| `coalition_join` (`warCoalitionDecision`) | — | the joiner's decision tick | CLIMAX |
| `treaty_breach` (GRAMMAR) | — | the breach's detection tick | CLIMAX |
| `intervention` (`seatIntervention`, W-SEAT D9) | — | the intervention's landing | CLIMAX |
| `sovereignty_conveyance` (WR-10) | the conveyed holding | the conveyance's hearing | CLIMAX |
| `envoy_intercepted` / `envoy_held` (IN-0b / ES foreign-guest hold) | **the interception point on the road**; the holding settlement | the intercept tick; "every week of custody" | CLIMAX; STANDING |
| `ransom` (war volume / ES) | — | the demand's hearing | CLIMAX |
| `ratification` (GRAMMAR) | — | the ratifying court's tick | CLIMAX |
| `chance_meeting` (the encounter stage, ENC) | the encounter's place (a road meeting) | the meeting tick | CLIMAX |
| `pact_renewal` (GR-5) | — | the renewal window's answer tick | CLIMAX |
| `embargo` (EC-6, the trade stance) | — (a stance on a pair) | "every week the stance stands" | STANDING |
| `supply_raid` (war volume) | the supply line | the raid's landing | CLIMAX |

[STATED] all rows: fold lines 357–386. The registry rulings: SP-9 builds the registry and pending ledger
(`spatialLedgers.pendingEngagements`, drop-when-empty, per `DESIGN_FP_ARCH_SP.md` line 14) dark; the first rows LIT
are the live kinds (`pact_acceptance`, `envoy_hearing`, `siege`, `armies_meet`); the pulse kernel stays frozen — "the
split lives in each resolver's own module, the ledger write in `spatialLedgers`, no pause cursor at all"; the majors
pause stays the DM's option. [STATED] fold line 388.

[INFERRED] Map consequences: (1) the two STANDING kinds that are explicitly physical — `armies_meet` and `siege` —
make a map position (a road contact point, a besieged town) the subject of a week-long DM hearing; (2) "forecast paths
overlap" means the hearing is triggered by a FORECAST read over route geometry, so route geometry must be
deterministic and stable within an advance; (3) every "dwell" is one week, i.e. one tick, consistent with law M's
one-week-per-leg floor — so the map's leg granularity sets how many mid-route positions a journey has at which a located engagement (an interception, a chance meeting) can arise — not the number of hearings, which the registry's climax kinds fix. [Fable-reviewed 2026-10-18: the earlier sentence said legs set the hearing count; hearings are per engagement, not per leg.]

---

## 6. Glossary for the map architect

### 6.1 The fold's vocabulary register (§5, lines 412–460) — the glossary of record

The register's rule: "one word, one meaning per surface (requirement 21d; rulings are the chair's; LANDED tokens never
rename; UNLANDED tokens rename now unless three or more volumes key on the name, in which case the name stands with
the register's note; PROSE disambiguates always)". [STATED] fold line 412. Rows marked ◆ bear on map or movement
vocabulary.

| Word | What it means after the ruling |
|---|---|
| `telling` | The SEVERITY rung (`glancing · telling · grave · ruinous`, landed). "The telling register" and "worn in the telling" only with those nouns; a bare "telling" in design prose means the rung. |
| `grave` | Both landed: the severity rung and rumor magnitude (`faint/notable/serious/grave`). WY-2's multipliers key on severity only; prose never says "a grave rumor" for severity. |
| `CONDITION_BANDS` ◆ | Three meanings found: `armyStrength.js:133` (supply-worded, live), WY-8b's army-condition ladder, EC's market ladder. Ruled: EC's is `MARKET_CONDITION_BANDS` (`glut · soft · fair · dear · desperate`); WY-8b reuses `armyStrength`'s ladder. |
| `SCARCITY_BANDS` | SP-B's four-word BELIEF ladder keeps the name; the truth ladder is `MARKET_CONDITION_BANDS`. |
| `tithe` | ONE tithe (§3.1.5): WF-7's piety × temple presence → temple wealth band is the source; W-COIN's `tithe_share` is the crown's cut. EC's reserve rung is renamed `tenth`. |
| market memory words | Truth-side display over the town's own record; speaks "in the record's voice … never 'they say'". |
| `doctrine` | HB's is "the habit sheet" (`habitSheet`, `habit_sheet_shifted`); the flag `believedDoctrineEnabled` stands; WC's page is "the reliability page"; ES's `espionageDoctrine` is the court's spying policy. |
| `hold` (HB) | The unlanded sheet field is renamed `firmness`; the move `hold` and `HABIT_HOLD_BANDS` stand. |
| `measured` | A habit-hold rung and an IN-3 zeal rung and the estate's evidence word; prose never uses it bare for a rung. |
| `rooted` | ES's rooted dwell; W-OPS's rung renames if sanctioned. |
| `spent` | "a spent mirror" / "spent credibility". |
| devotion / piety | "piety" names the substrate scalar, "standing" the belief axis; the words are shared, the nouns never. |
| `lure` | IN's bought lie only; FAITH says "the sack's draw". |
| `exclusivity` | Not `trade_exclusivity`. |
| `returning` / `column_return` ◆ | The return class of a migration column is `column_return` (unlanded); WC's landed `veteran_return` stands. |
| `reaffirmed_by_heir` | STRUCK. |
| `reachBandOf` ◆ | WY's `REACH_BANDS` (`modeSpeeds.js:198`) keeps the name; the feasibility helper becomes `feasibilityReachBandOf`. |
| `INTERVAL_WEEKS` shadows ◆ | `populationDynamics.js:19`, `foodStockpile.js:66` are Class B cure rows (§4 clock). |
| `kmScale` ◆ | WY's WORLD scale (km per realm map unit) vs the FABRIC program's town-map scale bar `viewMetersPerUnit`: distinct identifiers; prose "the world scale" / "the map's scale bar". |
| `pin` | A test pin; an Edit Mode hold is a "seal", never "pinned". |
| `partial` (WC) | The call-in answer rung is renamed `half_answered`. |
| `brigand` (WC) ◆ | The unlanded free-unit state is renamed `raiding` (`TAG_EVENTS.brigand` stands). |
| `attrition` / `absorption` (WC) ◆ | The embattled-resolution rungs become `worn_down` / `absorbed`. |
| `crossing` (WC) ◆ | Prose always qualifies: "stance crossing" / "entrepot crossing". |
| `ALIGNMENT LINE` (WC) | WC's doc-row obligation is "the DOC ROW"; each WC wave still owes its requirement-13 line. |
| `materiel` / `reinforce` ◆ | The stance rung stands; WC-6 (not WC-4) binds the greyed realm verb `REINFORCE`, re-targeting its dial to the army, phantom policy `real-only`, authority "directed dispatch"; the own-army flow `reinforcement.js` stays outside the seam; no fourth name is minted (§3.2 addendum, line 462). |
| `signed` / `expired` / `renegotiated` (GR) | GRAMMAR-internal and consistent; recorded so no sibling borrows. |
| `restitution` | Distinct tokens; stand. |
| `ERA-PRESET-ELIGIBLE` | Stands or falls with the age layer (OD-FC-17). |
| `settled` (WC) ◆ | The cohort KIND is renamed `civilian`; the AGE BAND `newly_arrived · settled · rooted` stands. |
| `stance` | `WAR_STANCE_LADDER` vs EC's `TRADE_STANCES` `{open, taxed, restricted, closed}`; prose "war stance" / "trade stance". |
| `principal` | WC's top stance rung; W-OPS renames if sanctioned. |
| `dispatch` / `muster` | Landed WC people-ledger count events; EC says "the caravan's go/no-go" and "readiness". |
| `taint` / `watched` ◆ | `watched` is a landed `SAFETY_BANDS` rung (`districtProfile.js:41`, the town-map district profile); WC's block is "the marked block". |
| `route_wardenship` / `provision` ◆ | One fact, two surfaces: the TERM is the producer of the landed REASON of the same name. |
| `embattled` ◆ | ONE: the live `embattlement` ledger's phase. |
| `hearing` / `tilt` / `verdict` | The hearing week's three choices; the DM's forced outcome is a VERDICT, never a "decree" (the Decree Registry's word); "the hearing seal" is the Edit Mode seal kind; "the held docket" is the ledger. |
| `chain n` / `C0..C8` | FP-40's chains (chain 1 = the UI+prose release, chain 2 = the statecraft band) vs the fold's COHERENCE CHAINS `C0..C8`; bare "chain n" means FP-40's. |
| `SEAM-n` | "the SEAM family (§13)" / "seam row n" (§9's matrix) / "the T5 cars"; a new seam id is `SEAM-<family>-<n>`. |
| `MF` ◆ | The map-fabric program is "the FABRIC program" in prose; distinct from the landed MF-CH2B (the magic shelf gate). |
| phantom policy ◆ | L10's two only: `real-only` and `home+record`; `home-only` is not a policy. |
| `bond` | "court bond" / "service bond" / "diaspora bond", never bare. |
| `pin` (CN) | CN's persisted stressor pin is not minted as such; "seal" for Edit Mode, "pin" for tests. |

Two register entries stand outside the table: the EP volume's own clarification that "epoch" always means THE ADVANCE
EPOCH and "is NOT the town-map construction 'epoch' of ODQ §240 ('EPOCH GENERATION — CORE, WALL, RING', the
version/epoch axis of MF-ARCH-2)" ◆ (`DESIGN_FP_ARCH_EP.md` line 2); and "tellings" in COUPLINGS means the register's
composed chains (`DESIGN_FP_COUPLINGS.md` bracket at line 214).

### 6.2 Other terms this note uses (my definitions, each from the cited volume) [STATED at the citation]

- **Spatial canon / canonize / canonized realm** — the act (`runSpatialCanonize`) that freezes the realm map into
  `worldState.spatialDigest` and sets `spatialCanonVersion`; re-canonize is receipted and bumps the version.
  (`DESIGN_FP_ARCH_WY.md` §1a item 1.)
- **Spatial digest** — the frozen, integer-quantized projection of the map (positions, territory, adjacency/gates,
  cost matrix, optional `kmScale`); sidecar ledgers sit over it. (`DESIGN_ROUTE_LIFECYCLE.md` law 1.)
- **`hopWeeks` / `calibration(digest)` / `distanceRead`** — the one distance reader; per-digest calibration maps cost
  to weeks (a realm spans about 2–8 march weeks); `realmReach` publishes the spectrum. (`DESIGN_FP_ARCH_WY.md` §1a.)
- **Law M** — the one-week-per-leg speed floor for named people. (War §1b.)
- **`beliefsActive`** — canon marker ∧ `infoMode` ≠ omniscient; belief exists only then. (`beliefMap.js:204–209`.)
- **Loud fact** — a public fact readable at truth after news latency (razing, altar, treaty's existence, army in the
  field). (`DESIGN_FP_COUPLINGS.md` C-LAW-5.)
- **Lit / dark / LIT-n** — a flag present in a shipped preset / built but in none / the separate lighting unit. (Fold
  §2 legend; compiled §12.8.)
- **TIER line, DEGRADED ARM, FIRST-VISIBLE line** — the three per-wave declarations the fold added to every charter
  (268 FIRST-VISIBLE lines across the corpus). (Fold req 16–17, §8 table total.)
- **Planting line** — the fast-layer sign of a slow mechanism: a complete record-voice sentence at the moment of
  cause, saying nothing about the future. (Fold §4 line 408.)
- **Decree / seal / direction / phantom** — Edit Mode's DM change applied at the tick head / a process card's
  directive / a layer's own verb in one of two registries / an off-stage counterparty record (`kind: 'phantom'`) that
  can absorb an act and never return one. (Compiled L10.)
- **Held docket / hearing seal / tilt / verdict** — requirement 24's ledger and its three choices. (Fold §1 req 24.)
- **Address door / living door** — typing a seed returns the exact starting world; clicking generate/reroll always
  draws fresh. (`DESIGN_FP_ARCH_EP.md` §0.1.)
- **THE PROMISE** — same seed, same starting world forever; a lived history, once lived, forever. (EP §8.5.)
- **Coherence chains C0..C8** — the fold's felt-core inventory: C0 hearing week, C1 statecraft band, C2 the auxiliary,
  C3 commons and the wall, C4 generals carrying INT, C5 faith's felt core, C6 the economy, C7 wayfare's bodies, C8 the
  ages. (Fold §6 lines 470–481.)
- **OD-FC-n** — the fold's owner rows, now rulings by delegation. **CPL-n** — coupling pair ids (closed at 1..21).
  **J-xx-n / CR-xx-n** — judgment blocks / chair rulings, vetoable.
- **Lifecycle host** — `settlementLifecycleKernel.js`, where FP stages mount (own flag before host gate).
  (`DESIGN_FP_ARCH_GR.md` R-3.)
- **Two-timescale echo** — fast layer (beats, flows, words) vs slow verdict (stocks, memory, ground). (SPINE req 9.)

---

## 7. Sources read (line counts at `81f1cd96`), how they were read, and what was not read

**Read whole**

| File | Lines | Notes |
|---|---|---|
| `docs/DESIGN_FP_COHERENCE_FOLD.md` | 708 | Every section §0–§9 (status table §2 is placed after §3.3 in the file, line 329; §3.4 follows it) |
| `docs/DESIGN_FP_SPINE.md` | 1,217 | Whole (the §6 PROGRESS lanes H/HG/HR/P/PR/CF/SP-A read at reduced attention) |
| `docs/DESIGN_FP_ARCH_SP.md` | 959 | Whole |
| `docs/DESIGN_FP_ARCH_LG.md` | 208 | Whole |
| `ARCHITECTURE.md` | 455 | The three requested sections (lines 115–190) plus "What it is"; the rest by heading |
| `docs/CURRENT_STATE.md` | 137 | Whole |

**Read in large part**

| File | Lines | What was read | What was only skimmed |
|---|---|---|---|
| `docs/DESIGN_FP_ARCHITECTURE.md` (compiled) | 3,324 (the brief said 3,318; the file at `81f1cd96` has 3,324) | Header; §1 L1–L10 in full; §2b–§2c; §3 (flag law, table, conjunctions, lighting contract); §4 canonical models; §9 rationale opening; §12.0–§12.2; §12.8–§12.9; §13 | §2a refutation register, §5 wave charters (111), §6–§8, §9 seam matrix rows, §10–§11, §12.3–§12.7 — by heading and targeted grep only |
| `docs/DESIGN_FP_COUPLINGS.md` | 1,960 | §0–§3, §6–§10 whole; §4 pairs CPL-1..CPL-4, CPL-8, CPL-16 whole | §4 pairs CPL-5..7, 9..15, 17..21 and §5's six signature stories by heading + grep for spatial terms |
| `docs/DESIGN_FP_ARCH_CW.md` | 629 | §1, §2, §3, §5, §6 whole | §4 wave specs by heading |
| `docs/DESIGN_FP_ARCH_EP.md` | 4,127 | Header block; §0.1–§0.2; §1.1–§1.5; §2.1; §3a; §3c (opening); §3e (tally and affordance table); §7a; §8.5 | §0.3 refutations R1–R13, §2.2–§2.5, §3b kernel seam (≈1,260 lines), §3d, §4 waves, §5, §6 judgments, §7, §7b, §8.1–§8.4, §8.6 — headings only |
| `docs/DESIGN_WAR_RULINGS_ARCHITECTURE.md` | 1,768 | §1 (1a, 1b, 1c), §6 judgment blocks J-WR-1..14, §10 protocol | The rest by heading. The fold does not cite this volume's §10 directly; ARCH_SP §1/§10, COUPLINGS and every program volume bind its §1/§10 verbatim, which is why it was read |
| `docs/DESIGN_FP_ARCH_WY.md` | 1,737 | First 150 lines + headings, PLUS §0 to line 208, §1a (212–317), §2c–§3c (685–807) for their map content | §1b–§1c, §2a–§2b, §3d–§10 by heading |
| `docs/DESIGN_FP_ARCH_MF.md` | 486 | First 150 lines + headings, PLUS §0.0–§5.-1c (151–241) | §5.0 onward by heading |
| `docs/DESIGN_ROUTE_LIFECYCLE.md` | 300 | §0–§3 opening (lines 1–80) — the source of "genesis is sacred" | Rest not read |

**First 150 lines + every `##`/`###` heading** (as the brief required): `DESIGN_FP_ARCH_GR.md` (713),
`DESIGN_FP_ARCH_IN.md` (733; physics rows S1–S35 and R1–R8 also read), `DESIGN_FP_ARCH_TR.md` (627),
`DESIGN_FP_ARCH_WF.md` (858), `DESIGN_FP_ARCH_POP.md` (617), `DESIGN_FP_ARCH_INT.md` (749), `DESIGN_FP_ARCH_ES.md`
(2,127), `DESIGN_FP_ARCH_HB.md` (4,517), `DESIGN_FP_ARCH_WC.md` (7,054; plus §5.3, lines 4992–5013),
`DESIGN_FP_ARCH_CN.md` (504 — PRESENT at `81f1cd96`), `DESIGN_FP_ARCH_PG.md` (431), `DESIGN_FP_GRAMMAR.md` (1,612),
`DESIGN_FP_INFORMATION.md` (1,536), `DESIGN_FP_TRADE.md` (1,472), `DESIGN_FP_FAITH.md` (1,706),
`DESIGN_FP_POPULATIONS.md` (1,406), `DESIGN_FP_INTERIOR.md` (1,765). (WY, MF and LG appear above because more than
their heads was read.)

**Searched only (grep for map terms):** `DESIGN_FP_ARCH_EC.md` (2,996), `DESIGN_FP_ARCH_EDITOR.md` (1,045),
`DESIGN_FP_ARCH_CENSUS.md` (714 — zero hits).

**Code consulted read-only (all [OBSERVED] claims above)**: `src/domain/worldPulse/simulationRules.js` (the `FP_LIT_*`
spreads :789–802 and their preset sites :899, :956–958, :999–1000, :1213–1215; `infoMode: 'omniscient'` :56; presets
:863–1010); `src/domain/worldPulse/beliefMap.js:199–209` (`beliefsActive`);
`src/domain/worldPulse/intervalWeeks.js:7–12`; `src/domain/worldPulse/worldState.js:16` (`MAX_HISTORY = 80`);
`src/domain/spatial/modeSpeeds.js:77,81,180` (`DEFAULT_KM_SCALE`); `src/domain/spatial/spatialDigest.js:571–576` (the
`kmScale` stamp); `src/store/campaignSpatialCanonize.js:23,48–56,110,156` (scale carried through canonize);
`src/domain/worldPulse/routeNetworkGenesis.js:630` (`ensureGenesisRouteNetwork` defined; no caller found by grep);
grep confirming `hearingWeekEnabled` / `registerEngagementKind` / `pendingEngagements` absent from `src`; `git show
--stat HEAD` for the fold merge. No test was run; nothing was executed beyond `grep`, `sed`, `wc` and `git log/show`.

**Not read** (named so a reviewer can close the gap): `docs/PHASE55_EXECUTION_PLAYBOOK.md` (the constitution
`ARCHITECTURE.md` points to for the spatial engine — §0.0/§0.2 would be the next read for the map architect);
`docs/DESIGN_REALM_DIRECTIVES.md` (J-D11, J-D12, directive 7/9); `docs/DESIGN_EDIT_MODE_AND_DECREES.md`;
`docs/OWNER_DECISION_QUEUE.md` (ledger branch; §764, §125, §128, §240 are quoted only second-hand through the FP
volumes); the fold's findings kit (`settlement-engine-kits/fp-coherence-2fc13d59-2026-10-16/`, not in this checkout);
`docs/DESIGN_FMG_WEAVE.md` (named by a sibling note as the realm-map fusion program; the FP volumes do not cite it).

---

## 8. What this means for the map engine — the inferences in one place [INFERRED]

1. **The contract surface is the canonized digest plus its scale.** FP reads positions, adjacency/gates, an integer
   cost matrix and (when supplied) `kmScale`; it never writes them. OD-FC-22 makes the map's EXPORTED distance scale +
   unit the world scale. A replacement for FMG must export both, explicitly, at canonization.
2. **Genesis is frozen; the campaign grows sidecars.** Route network, foundings, deaths, embattlement, occupation,
   columns and caravans are lived ledgers keyed by digest settlement ids. A map regeneration under a living campaign
   is either a receipted re-canonize that carries every lived datum forward, or a new world.
3. **The route network is the next big seam.** OD-FC-18 mounts `ensureGenesisRouteNetwork` in the GENERATION path at
   world birth (k-NN + access vocabulary + geography), with a no-flow-yet arm so food imports are not quartered; POP's
   migration, WY's caravans, LG's graph and C3's chain all wait on it.
4. **Distance must stay one substrate.** New terrain costs or modes enter `distanceRead`'s calibration or LG's one
   graph as edge types — never a parallel pathfinder or a sixth distance price — and every distance band is measured
   per map.
5. **Terrain is nowhere in FP's law, but it is under every FP clock.** The fold and the registry never name terrain; terrain lives in the frozen digest's cost law (`BIOME_COST` × the elevation knee, a river term, the terrain classes and the seasonal terrain overlay — `spatialCost.js`), which every FP mover reads through `hopWeeks`, in generation
   (config), in calamities (`DISASTER_TYPE_BY_TERRAIN`), in Edit Mode's `worldFact` card, and in the FABRIC program's
   terrain-first law. If the map engine introduces a richer terrain model, the FP-facing route is a new
   dormant-by-absence digest datum with a declared consumer wave, not a change to existing readings.
6. **The map must show presence, not intention,** with covert movers fail-closed and one projection per entity kind
   (WY §3b–§3e); the town map is the FABRIC program, out of FP and the map family's own.
7. **Every engagement has a "where".** The hearing week makes road contacts and besieged towns the subjects of weekly
   DM hearings; route geometry used by forecasts must be deterministic within an advance.

