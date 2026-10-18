# SettlementForge's plague — what it is, how it starts, how it moves between settlements, what it does inside one, how it ends, and what a map lens can show

> Fable-reviewed 2026-10-18: PASS-WITH-CORRECTIONS — sixteen research corrections, no design change (lane retrovalidation/plague; J392)

Synthesis seat for research/sf-plague (workflows/39-plague-read.js). Read to understand; described in my own words; cited by
file and line; no code copied. Host: `/home/user/clausellstokes-lang/settlement-engine` at `origin/master` `81f1cd96`
(detached HEAD, working tree clean), read-only. Map module: `/home/user/maps-architecture`. Two reader seats supplied
readings; I re-read the core of each claim at `81f1cd96` and corrected the readings where the code disagreed (listed in
§10.3). Line numbers are at `81f1cd96`.

**Tags.** [STATED] a document says it. [OBSERVED] I (or a reader seat, where §11 says so) read it in code. [INFERRED] my
reasoning, which I give. **Status words.** LIT = on in at least one shipped preset. BUILT DARK = code exists and nothing
turns it on (the flag is named). DESIGNED ONLY = no code. SEAM = a function with no caller. **Presets** (checked by
evaluating `SIMULATION_RULE_PRESETS` through `normalizeSimulationRules` with node at `81f1cd96`): RR `realistic_regional`
(the default, `simulationRules.js:6`), QL `quiet_local`, DC `dramatic_campaign`, SC `static_campaign`, NC
`narrative_campaign`, LR `living_realm`, FS `full_simulation`. The FP status of record is
`docs/DESIGN_FP_COHERENCE_FOLD.md` §2 (fold:329-352).

---

## 1. Summary — the owner's question ("and plague", J381): what plague is in the host, and how that changes the map view

**Plague is one stressor type, `disease_outbreak`, plus a settlement condition `plague` that does the harm, plus — only on
a realm whose geography has been mapped — a travelling epidemic front.** The host's first law for it is "one plague
truth": there is one roaming world record, labelled "Disease outbreak", and the lanes (spread, aging, faith, refugees,
realm arcs, the travelling front, the DM's Apply-stressor `plague_onset`) drive that same record rather than a second
system [OBSERVED `src/domain/worldPulse/stressorsCore.js:118-126`; `src/domain/spatial/pestilence.js:4-15`;
`src/domain/crisisLifecycle.js:96-103`; `src/domain/stressorPicker.js:43`]. **One lane breaks the law**: the Table
Ledger's `plague` obligation sends Apply-stressor with the key `plague`, which maps to no catalog type, so its roaming
twin is a second record typed `plague` — no spread channels, invisible to the front, a generic realm label — while the
condition it promotes is the ordinary `plague` condition [OBSERVED `src/domain/tableLedger.js:131-133,155-160,265`;
`stressorPicker.js:58-62`; `crisisLifecycle.js:584-593`; `stressorsCore.js:301-309`; INFERRED the consequence; §3.15,
§10.1 item 23]. The old dedicated PLAGUE event is no longer authorable (folded into Apply-stressor); its handler survives
only for saved and replayed events [OBSERVED `src/domain/events/affordanceManifest.js:109-119,645-649,721-724`].
Calamity (mover M11b: floods, fires, quakes, storms) is a different mover and not plague [OBSERVED
`src/domain/spatial/calamity.js:45-104`].

**How it starts.** A per-settlement "disease pressure" (0..1) is read every pulse from the inverted healing score, plus
0.14 when the town already carries a plague or a refugee-influx condition, plus 0.08 when housing is crowded
[OBSERVED `pressureModel.js:18-21,31,209-218`]. At 0.5 it can mint a local `plague` condition; at 0.58 it can birth the
`disease_outbreak` stressor, with odds multiplied by a gate that likes collapsed healing, no healers, refugee camps,
famine and busy trade [OBSERVED `candidateEvents.js:243-300`; `stressorGates.js:592-608`]. War never starts plague
directly; it gets there through famine or mass migration. Season does not enter disease pressure. **At default tuning
this almost never happens**: the 0.5 floor fired zero times in 193 observed soak years [STATED fold OD-FC-28, fold:521;
`DESIGN_FP_POPULATIONS.md:756-761`]. The plague a table actually sees is DM-authored: Apply-stressor `plague_onset`
(or the Table Ledger's `plague` obligation), which mints both the condition (by condition promotion) and a roaming
stressor, and leaves an authored stress in `config.stressorEdits` that the power and economy generators read at the next regeneration from config (a "Quarantine Council" faction, prosperity one rank lower — at a Regenerate Draft or Edit-Mode re-derivation, never at apply: §3.12 [Fable-reviewed 2026-10-18])
[OBSERVED `src/domain/events/mutateWorld.js:631-680`; `crisisLifecycle.js:235-330,584-593`; `conditionPromotion.js:29`;
`src/domain/events/registryRerunKeys.js:68`]. Disease pressure can also birth two magic stressors (§3.3).

**How it moves between settlements.** Two lanes, and the map decides which carries trade-borne spread:
- *Unmapped realm* (every free or imported-map campaign, and every campaign before the DM canonizes geography): the same
  record jumps one confirmed regional channel (`trade_route`, `migration_pressure`, `service_dependency`) to at most three
  neighbours per tick, in the same tick, arriving at 0.72 of the source's severity (floor 0.2), with probability up to
  0.34 [OBSERVED `stressors.js:50-58,637-680,769-818`]. No distance, no travel time, no season. Lit in RR, LR, DC, FS;
  dark in QL and NC (propagation "local") and SC (off).
- *Mapped realm* (the premium, generated-map-only "map geography" canonize stamps `spatialCanonVersion`): the epidemic
  FRONT (M11a) walks hop by hop along confirmed trade-type channels in both directions and along live supply-shipment
  links (shipments run 1.5× hotter). Each hop lands an incubating record that resolves after `hopWeeks` over the frozen
  digest at the road season — so winter roads, sea lanes and teleport circles all shape the latency. At landing an onset
  roll (base 0.34 + density + trade volume + imports − care from temples, healing houses, druids, alchemists) decides
  whether it takes hold; if it does, an ordinary `disease_outbreak` record is minted there. At most six new seedings per
  tick realm-wide; refractory windows (8 ticks after a fizzle, 40 after a clearance) and a 26-tick recovery floor drain
  every cluster [OBSERVED `pestilence.js:72-125,406-571`; `pestilenceKernel.js:122-267`]. The front has **no rules flag**:
  the map-canon marker alone lights it, in any preset that has a live plague to seed it [OBSERVED
  `pestilence.js:151-155`].
- *A second, softer carrier of consequences (not of the record):* every pulse outcome that changes a settlement —
  a plague condition's causal shifts, the population it sheds — is diffed and pushed along confirmed regional channels
  to depth 1 (RR, LR) or 2 (DC, FS), parked to arrive `hopWeeks` later on mapped worlds; DM canon edits ripple at depth 2
  in any preset (`store/settlementSlice.js:1292`). A `migration_pressure` channel lands a refugee-influx condition next door (+0.14 disease pressure there)
  and a `service_dependency` channel lands a service disruption that drains healing — so a plague's consequences can
  raise the odds of plague a hop away, on a timetable [OBSERVED `region/propagation.js:540-603,899-965`;
  `applyWorldPulse.js:279,736-768`; `simulationRules.js:1578-1586`; `store/settlementLifecycleHelpers.js:94-111`; §5.1
  row 15].
- *Not carriers today:* refugees (they flee plague and raise the disease risk where they land, but carry no plague
  record), armies (hazard and contraction primitives are built but fenced, no caller), caravans (no plague term in the
  dispatch danger seam; no refusal), migration columns (PG pg-1, designed), quarantine or gate closure (no verb exists),
  territory and borders (never read) [OBSERVED `flows.js:42-110`; `pestilence.js:320-350`; `dispatchEV.js:155-172`;
  STATED `DESIGN_FP_ARCH_PG.md:134-325`; `DESIGN_FP_ARCH_EC.md:2352`]. But *believed* plague does bend roads: in the
  belief presets on mapped worlds (DC, LR, FS) a heard `plague_arrival` rumour counts as believed danger at that town,
  and named-NPC journeys route round it, refuse, or wait [OBSERVED `roads/knownWorld.js:38-41,59-96`;
  `roadsKernel.js:505-507,932,1011-1021`; §5.1 row 16].

**What it does inside a settlement depends on which representation is there.** The `plague` *condition* hurts: it drains
food security, healing, legitimacy and labour through the single causal scan, takes 0.02 a month off the legacy
population rate, marks the town as in crisis flight (an 18% movement cap instead of 5.5%, and mass emigration that rides
M4 refugee columns on mapped worlds), loads labour, healing and welfare demand, swings faction standing toward the
temple and against the government and merchants (a quarter of the monthly template per weekly tick), cancels the town's
festivals, marks it as a crisis for NPC goals, and shows as a condition badge and a "plague" marker on the town map
[OBSERVED `causalState.js:317-360`; `populationDynamics.js:95,120,306,327-328,445-470`;
`capacityModel.js:320-328,401-407,732-737`; `factionRelationshipUpdate.js:50-71`; `timeProgression.js:123-128,386-395`;
`traditionsKernel.js:197,249-252`; `npcAgency.js:362-371`; `townMap/townMapModel.js:567-584`]. The *stressor* alone — which is all an
organic birth or a front arrival mints — writes **no condition**, and causal scores read only conditions, so an arrived
plague changes no score, takes no population-rate hit and books no deaths until it resolves into a six-tick residual
condition [OBSERVED `applyWorldPulse.js:1039-1052`; `pestilenceKernel.js:228-261`; `causalState.js:336-351`;
`stressorsCore.js:418-466`]. Its live marks are its own lifecycle, its synergies with famine and refugees, refugee flight
at severity ≥ 0.6, the type-blind crisis disorder that feeds faith receptivity, and realm news. There is no plague death
toll term in any lit lane; the demographic "disease" death class is built dark [OBSERVED `demographicsRates.js:275-313`;
fold §2 POP row]. Tier loss is never authored; it follows population.

**How it ends and is remembered.** The episodic stressor resolves on a roll shortened by healing capacity and healer
redundancy and lengthened by famine, refugee camps and dead magic; it leaves a residual condition for six ticks, an echo
record (memory = max(final severity, half the peak)) that makes the next outbreak there 0.3 × memory stronger, wizard news and, when the echo fades, a
`population_friction` history line [OBSERVED `stressorDynamics.js:235-244,466-485`;
`stressorsCore.js:418-500`; `stressors.js:490-491`; `stressorAftermath.js:49`]. There is no permanent plague stamp; the
urban-fabric "plague quarter" scar exists in a table but nothing can mint it [OBSERVED `urbanFabricKernel.js:305-330,656-672`].

**The realm picture.** One type gripping three or more settlements is named "The Plague"; with famine at the same town it
is "The Wasting", and with a conversion fracture too, "God's Abandonment"; a front arrival is the regional headline
"Plague reaches X" [OBSERVED `realmEvents.js:14-47,87,403-453`; `pestilenceKernel.js:276-303`]. The host has a realm
read model of the front (`realmPestilence`), but nothing calls it and no world-map layer shows the front or the
stressor; the only live consumer of the per-settlement projection is the PDF dossier [OBSERVED
`settlementPestilence.js:201-250`; `src/pdf/lib/liveWorld.js:199-202`]. What maps do show today is the *condition*: a
badge, a `plague` hazard pin and a `plague` scene marker on the town map, and, on the world map, only generic
regional-impact markers for a plague's propagated consequences and the sidebar's first stress label (§8.1 item 6).

**Who owns it next.** The PG family (pestilence coherence) absorbed POP-4's plague arc; POP keeps only the cause-attributed
burial line ("the bells") and the disaster cause [STATED fold §3.1.9, fold:270]. PG has zero code: pg-1 column-carried
contagion, pg-2 prosperity and order as resistance, pg-3 belief-based refusal at the gates, pg-4 candidates (caravan
rerouting, trade avoidance, a quarantine verb flagged as an owner value) [STATED `DESIGN_FP_ARCH_PG.md:11-13,99-325`;
fold:349,531; OBSERVED zero hits for `contagionEnabled`, `plagueTouched`, `afflictionBand`].

**How this changes the map view.** Plague is the one host subject that is already a *travelling front with time*: a sparse
derived ledger with a phase, a graded level, a source settlement, an arrival tick and an expected onset tick. It is the
cleanest first customer for the lens mechanism (J379): colour by phase and band, arrows from source to destination along
the carrier link, an "approaching" halo with an ETA, care rings, refractory greying. But it is a **graph over trade links
timed by the digest**, not a field over territory: no border stops it, no patrol or march touches it, no gate closes on
it, and armies do not carry it. Only *believed* plague touches a route (named-NPC journeys avoid towns they have heard
are plagued, in the belief presets on mapped worlds), and a plague's *consequences* travel the regional graph on the
same hop-week clock (§5.1 rows 15–16). On an unmapped realm — the default preset's usual state on the host today [Fable-reviewed 2026-10-18: a world born from this module is canonized at the campaign's birth, J384 (6), V13 H22, so there the footprint regime is the exception] — the honest picture is a
same-tick footprint with attenuated severities and no arrows or ETA. And since organic plague is silent at default
tuning, a plague lens is a lens over DM-authored outbreaks until the end tuning review signs the floor. The host asks
this implies are small and optional (§8.6): name the source id on each materialization, keep a per-hop front history,
read the season in the display's "weeks up the road", and close the condition gap so an arrived plague hurts where it
lands.

---

## 2. The data model

### 2.1 The three things called "plague" inside one settlement [OBSERVED]

| Form | Where it lives | Who mints it | What reads it | Lifetime |
|---|---|---|---|---|
| **Condition `plague`** | `settlement.activeConditions[]`, archetype `plague`; template systems food_security, healing_capacity, public_legitimacy, labor_capacity; default severity 0.6; default expiry 12 ticks [`activeConditions.js:59-66`] | organic pressure ≥ 0.5 [`candidateEvents.js:243-300`]; DM Apply-stressor (`plague_onset`, or the Table Ledger's `plague`) through condition promotion [`crisisLifecycle.js:235-330`; `conditionPromotion.js:29`]; the legacy PLAGUE event, replay only [`mutateWorld.js:576-583`]; generation-time stress `plague_onset` (probability 0.027) promoted by the text rule [`stressTypes.js:84-93`; `conditionPromotion.js:29`] | the causal scan [`causalState.js:317-360`]; disease, crime pressure [`pressureModel.js:31,42`]; population rate and flight [`populationDynamics.js:95,120,306,327`]; capacity [`capacityModel.js:320-328,401-407,732-737`]; faction deltas, monthly template scaled to a quarter per weekly tick [`timeProgression.js:123-128,381-395`; `factionRelationshipUpdate.js:50-71`]; traditions cancel [`traditionsKernel.js:197`]; NPC crisis class [`npcAgency.js:362-371`]; threat type `plague` [`threatProfile.js:486`]; town-map badge and scene marker [`townMapModel.js:567-584`; `sceneLivingPresentation.js:151-160`] | 6 or 10 ticks (organic), 12 (template default) |
| **World stressor `disease_outbreak`** | `worldState.stressors[]`, canonical id `world_stressor.disease_outbreak.<origin>`; `affectedSettlementIds`, `severityBySettlement` (attenuated spread targets), `lifecycleStage`, `originContext`, `peakSeverity` [`stressorsCore.js:118-126`; `stressors.js:50-58`] | organic birth [`stressors.js:484-560`]; aspatial spread joins targets to the same record [`stressors.js:769-818`]; the M11a front mints a new record at each town it takes hold in [`pestilenceKernel.js:228-261`]; the DM twin of Apply-stressor `plague_onset` [`crisisLifecycle.js:584-593`] (the legacy PLAGUE twin at `:572-583` on replay; the Table Ledger's twin is typed `plague`, not this) | aging, counterforce, synergies [`stressorDynamics.js`]; flows [`flows.js:62`]; faith disorder [`religiousContest.js:181-209`]; realm arcs [`realmEvents.js`]; the front's seeds [`pestilenceKernel.js:136-148`]; mass-migration gate next door [`stressorGates.js:795`]; certification, dossier prose, decree tracker | episodic: base resolution 0.18, decay 0.1, maxAge 8 [`stressorsCore.js:27-32`] |
| **Epidemic record** (mapped realms only) | `worldState.spatialLedgers.epidemic[settlementId]`: phase (incubating, active, recovering), level 0..1, arrivedTick, incubateUntil, sinceTick, lastTick, activeSince, refractoryUntil, sourceId (empty for a seed origin) [`pestilence.js:256-270`] | `pestilenceKernel` only, through set/drop of the spatial ledger; zero eager bytes [`pestilenceKernel.js:219-221`] | the display projection [`settlementPestilence.js`]; the (unwired) army and temple scalars [`pestilence.js:303-350`]; telemetry [`src/lib/spatialUsage.js:140`] | pruned once level < 0.02 and the refractory has passed |

Around them: `regional_migration_pressure` (the refugee-influx condition, which counts as a disease archetype) [`pressureModel.js:31`;
`flows.js:100`]; `stressor_residual` (the six-tick aftermath) [`stressorsCore.js:418-466`]; the echo record (status
`residual`) [`stressorsCore.js:468-500`]; `config._activePlague` (the legacy PLAGUE event's annotation) and capacity
impairments on healing institutions [`mutateWorld.js:536-575`] — reached only by saved or replayed PLAGUE events, since the
verb is non-authorable [`affordanceManifest.js:109-119,645-649`]; a roaming record typed `plague` from the Table Ledger
(§3.15); the threat-profile type `plague` [`threatProfile.js:55-60,240,486`]; the town map's condition badge and the town
scene's `plague` marker kind (§8.1); wizard-news kinds `plague_arrival`, `realm_disease_outbreak`,
`compound_the_wasting`, `compound_gods_abandonment`. **Not plague**: the monster-threat tier `plagued` in
`config.monsterThreat` and its red "Plagued" map chip [`src/components/map/settlementThreat.js:1-12,36`;
`threatProfile.js:8,370`], and M11b calamity stamps in `settlement.calamityHistory` [`calamity.js:45-76`].

### 2.2 The stressor's catalog entry [OBSERVED `stressorsCore.js:118-126`]

Label "Disease outbreak"; duration policy episodic; fed by pressure kind `disease`; birth threshold 0.58; spread channels
`trade_route`, `migration_pressure`, `service_dependency` (all three are canonical channel types, so no alias is needed,
`stressors.js:26-34`; `src/domain/region/graph.js:47-64`); residual effects labour scars, healer exhaustion, quarantine
distrust (words only — "quarantine distrust" names no mechanism); affected systems healing_capacity, labor_capacity,
social_trust. Lifecycle stages emerging, active, peaking, easing, resolved, residual, dormant [`stressorsCore.js:34-42`].

### 2.3 Time

A pulse tick is a week [OBSERVED `advanceInterval.js:97-101,511`; `research/sf/fp-simulator.md` §1.9 says so too, though the host `ARCHITECTURE.md:149-155` it cites says only "tick-by-tick"]; the front's
`incubateUntil = tick + hopWeeks` relies on that [OBSERVED `pestilence.js:486-491`]. The road season is derived every
tick from the advanced calendar, independent of `seasonsEnabled`, and threaded into every spatial travel read
[OBSERVED `pulseKernel.js:569-575`]. Canons frozen since SEASONS-B (M3), and older canons once re-canonized (the
receipted re-canonize rebuilds the whole digest), carry a seasonal-road overlay, sea lanes and teleport edges; an older
saved canon keeps its v1 digest with no overlay and null sea-lane and teleport slots, and reads with no seasonal change
[OBSERVED `src/store/campaignSpatialCanonize.js:105-131`]. So plague latency is season-aware only on canons frozen or
re-canonized since SEASONS-B; on older canons it is seasonless.

**Time scale** [INFERRED from OBSERVED `stressors.js:145-164,364-379,400-409`; `stressorDynamics.js:235-244,452`;
`advanceInterval.js:100-103,511`]. Every pulse is one week. A `disease_outbreak` record loses 0.1 × a combined multiplier
a tick (the disease counterforce alone gives 0.7..1.8; synergies can pull it to 0.4; the global clamp is 0.4..2.5); its
resolution chance is 0.18 + 0.04 per tick of age past the first, plus the counterforce delta (−0.08..+0.18), plus 0.25
from age 8; and it ends outright once severity is ≤ 0.08. At neutral counterforce the survival chain gives a 0.6 record a mean life of
about three and a half weekly ticks, and it cannot outlast six ticks on decay alone; weak healing stretches the ceiling to
about eight, strong healing ends it within about three. Escalation can top a record back up. A front hop takes 1 to 52 weeks
(`MAX_HOP_WEEKS`, `distanceRead.js:87`). A node spreads only while its own stressor lives (§3.7), so the 26-tick recovery
floor binds only where the stressor outlives it (SC, where stressors never age; a pinned record); a hop longer than the
source's remaining life lands after the source has resolved (§10.1 item 18). A lens time scrub or ETA should be scaled
to weeks: an outbreak is a matter of a month or two, not seasons.

### 2.4 Pulse order [OBSERVED]

Stressor aging (gated on `stressorsEnabled`) runs first [`pulseKernel.js:509-511`]; candidates (conditions, births,
escalations, spreads, flows) are generated and applied; realm and compound arcs are synthesized from the post-apply
stressors [`pulseKernel.js:1960-1980`]; then, after the war and naval layers, the pestilence front advances
[`pulseKernel.js:2483-2510`]; then M11b calamity [`pulseKernel.js:2511-2549`]. [INFERRED] So a front materialization
counts toward "The Plague" only on the next tick, and the front reads this tick's live stressors as seeds.

---

## 3. The per-settlement picture

### 3.1 Disease pressure — the soil [OBSERVED `pressureModel.js:18-21,31,42,140-232`; `demographicsRisk.js:82-91,160-200`]

- Base: (70 − healing_capacity) / 70, clamped to 0..1 (a missing score reads 50). A town at healing 50 sits at 0.29; it
  needs healing ≤ about 29 to reach the 0.58 birth threshold on the base alone.
- +0.14 when the town carries a `plague` or `regional_migration_pressure` condition (or a DM `custom_crisis` naming
  healing_capacity) — refugees count.
- +0.08 when housing_pressure is below 45 ("housing pressure weakens containment", read to players as "Crowded homes make sickness harder to contain.", `stressors.js:68`). The refugee condition itself
  declares housing_pressure [`activeConditions.js:254-258`].
- + the demographic crowding lift, only when `demographicsEnabled` is on: crowding (population over min(food capacity,
  tier density ceiling) beyond an ease point of 0.60) times (0.10 + 0.09 sanitation + 0.06 transmission + 0.05 food
  deficit), capped at 0.22; transmission is trade_connectivity/100. **BUILT DARK** — lit in no preset (FS declares it
  false for certification) [OBSERVED node dump; STATED fold §2 POP row, OD-FC-18].
- Not in it: season (winter adds to food pressure only, `pressureModel.js:177-180`), war, distance, neighbours' plague.
- `plague` is also a crime archetype, so a plague condition raises crime pressure too [`pressureModel.js:42`].
- Disease pressure weighs 0.2 in the legacy population lane's stability term for every settlement, plague or not
  [`populationDynamics.js:301`].

### 3.2 The organic `plague` condition [OBSERVED `candidateEvents.js:243-300,511-519`]

At disease pressure ≥ 0.5 a candidate mints archetype `plague` with probability min(0.42, 0.06 + 0.3 × score), severity
= the score, status "worsening" at ≥ 0.7, lasting 10 ticks at ≥ 0.75 else 6. It routes to a DM proposal at score ≥ 0.72
in every autonomy mode, and every one is a proposal under `dm_only` or `recommendations` [OBSERVED
`candidateEvents.js:275,281`; `changeAuthorityPolicy.js:151,344`]. Gated on `emergentEventsEnabled` (all presets but SC).

### 3.3 Stressor birth [OBSERVED `stressors.js:469-560`; `stressorGates.js:592-608`]

- Eligible when disease pressure ≥ 0.58 and no live record of the type already covers the town.
- Gate multipliers (multiplied together): healing < 35 ×1.5; zero healer institutions ×1.4; a `mass_migration` stressor
  here ×1.4 ("crowded refugee camps"); a `famine` here ×1.3; three or more trade links ×1.15; healing ≥ 70 with two or more
  healers ×0.55.
- Probability: the score × 0.34, held to 0.07..0.5, times the gate, held to 0.02..0.6 [`stressors.js:514`].
- Severity: the score, plus 0.3 × the echo's memory strength if the same crisis is remembered there ("the old wound opens
  more readily") [`stressors.js:490-491`].
- A birth at pressure ≥ 0.78 is a DM proposal in every mode [`stressors.js:502,515`].
- The healer count here comes from `healingLedger`'s vocabulary (temple, chapel, infirmary, healer, hospice, herbalist,
  apothecary, shrine, hospital, monastery, almshouse) [`src/domain/healingLedger.js:31-32,90`] — not the front's care
  vocabulary (§3.6).
- **Disease pressure births two more types.** Every catalog type whose pressure kinds include `disease` is a candidate
  once the score passes its own threshold: `magic_deadzone` (kinds legitimacy, trade, disease; threshold 0.6; no spread;
  affects healing_capacity) and `magical_instability` (legitimacy, disease, conflict; 0.72; spreads on arcane,
  information and service channels; affects healing_capacity). Both have their own gates (the deadzone is hard-gated to
  towns where magic is load-bearing; the two exclude each other). A deadzone then slows plague resolution while it lives (×0.8 decay
  synergy, §3.5) [Fable-reviewed 2026-10-18: neither magic stressor drains healing while live — like an organic or front
  plague, their catalog systems (healing among them) land only through the six-tick residual condition after they resolve,
  which then feeds disease pressure back (§3.8 condition gap; `stressorsCore.js:234,261,455`; `causalState.js:336-351`);
  a DM-authored one is the exception, as a DM plague is: condition promotion mints the `magical_instability` condition,
  which drains healing at once (`conditionPromotion.js:72`; `activeConditions.js:158-165`)] [OBSERVED `stressorsCore.js:227-262`;
  `stressors.js:467-475`; `stressorGates.js:1042-1043`].

### 3.4 Escalation [OBSERVED `stressors.js:722-768`]

Read at the record's origin only: where origin disease pressure > 0.62 and severity < 0.92, the record can deepen to
(severity + pressure)/2 + 0.08 with probability min(0.42, 0.08 + 0.28 × pressure), a proposal at ≥ 0.78.

### 3.5 Duration — counterforce and synergies [OBSERVED `stressorsCore.js:27-32`; `stressorDynamics.js:151-156,235-244,440-490`]

- Episodic: base resolution 0.18 a tick plus an age bonus, with a further bonus at maxAge 8; decay 0.1 a tick.
- Counterforce profile: healing_capacity (weight 0.7) and healer redundancy (0.3; three distinct healer institutions =
  full credit); max resolution bonus 0.18; the default weakness penalty 0.08 and decay boost 0.8 apply. The score is
  centred at 0.5; the decay multiplier is held to 0.7..2.5.
- Synergies on this record: famine ×0.6 decay and −0.05 resolution ("the hungry sicken faster"); mass_migration ×0.75
  ("crowded camps"); magic_deadzone ×0.8 ("the healers' magic is gone"). In the other direction the plague slows famine
  (×0.6, −0.05, "the sick cannot work the fields") and mass migration (×0.8, "flight from the plague swells the columns").
- Prosperity and order do not enter; that is PG pg-2.

### 3.6 Onset and care — the front's arrival roll (mapped realms only) [OBSERVED `pestilence.js:72-125,163-253`; `pestilenceKernel.js:71-94,166-185`]

- Onset probability = 0.34 + 0.34 × density + 0.20 × trade volume + 0.16 × import volume − care, held to 0.04..0.92.
- Density = tier index over 5 (thorp 0, hamlet 0.2, village 0.4, town 0.6, city 0.8, metropolis 1) [`src/data/constants.js:3`].
- Trade volume = (tradeFlow in + out) / 60 from the M6d tally, else trade_connectivity / 100, else 0.4.
- Import volume = the larger of inbound live shipments / 4 and tradeFlow in / 30 ("ports run hotter").
- Care = 0.6 × (1 − the product over four categories of (1 − weight × (1 − 0.55^count))), weights church 0.5, healing
  house 0.7, druid 0.55, alchemist 0.6. Each institution counts once, in the first category its name matches (healing
  house, then alchemist, then druid, then church); calamity-ruined institutions do not count [`pestilence.js:185-198`].
  Care is strictly below 0.6: a temple city resists and is never immune.
- Worked figures [INFERRED arithmetic from the constants]: one shrine gives care 0.135; two churches, a hospital and an
  alchemist give about 0.40. A care-poor busy city with two inbound shipments rolls about 0.89; the same city with that
  temple roster about 0.49; a village with one shrine and average trade about 0.42.
- The care vocabulary is its own: church matches temple, chapel, shrine, cathedral, church, monastery, friary, abbey,
  almshouse; healing house matches hospital, infirmary, hospice, healer, healing house, sanatorium, leper; druid matches
  druid, grove, "circle of", "wardens of", nature shrine; alchemist matches alchem-, apothecary, herbalist
  [`pestilence.js:163-168`]. "Priest (resident)" matches none [STATED PG:237-241].

### 3.7 Level and lifecycle of the epidemic record [OBSERVED `pestilence.js:438-565`]

- A settlement with a live stressor and no record becomes an ACTIVE seed origin at level = its effective severity, and it
  spreads in the same tick.
- A hit lands an INCUBATING record (level 0) with `incubateUntil` = now + hop weeks (at least 1).
- At `incubateUntil`, the onset roll: a fizzle becomes a RECOVERING record at level 0 that holds an 8-tick refractory; a
  hold becomes ACTIVE at level 0.3 + 0.4 × density and mints the stressor at severity max(0.2, 0.72 × source severity +
  0.25 × density).
- While ACTIVE the level climbs by 0.34 × (1 − level) a tick. A node turns RECOVERING when its stressor is gone or after
  26 active ticks, stamping a 40-tick refractory. RECOVERING relaxes the level by a factor of (1 − (0.14 + 0.3 × care))
  a tick, and the record prunes once the level is below 0.02 and the refractory has ended.
- Care therefore cuts onset and speeds the *recovering* fade; it does not shorten the active phase (§10.1 item 2).
- [INFERRED] Severity does not die out along chains of dense towns: the arrival law has a fixed point at about 0.89 ×
  density (≈ 0.89 for a metropolis, 0.71 for a city, 0.54 for a town, 0.36 for a village, the 0.2 floor for hamlets and
  thorps). What drains a front is the onset roll, the refractories, the cascade cap and each record's own resolution.

### 3.8 What a plague does inside the town, by form

| Effect | Condition `plague` | Stressor only (organic birth, front arrival) | Epidemic record |
|---|---|---|---|
| Causal systems | drains food, healing, legitimacy, labour by severity × each system's scale [`causalState.js:317-360`] | none while live [`causalState.js:336-351` reads conditions only; `applyWorldPulse.js:1039-1052` writes no condition] | none |
| Disease, crime pressure | +0.14 disease; crime archetype [`pressureModel.js:31,42,209-214`] | none | none |
| Population rate | −0.02 a month, legacy lane, as a bare decline (not booked as deaths) [`populationDynamics.js:306,451`] | none | none |
| Flight | crisis-flight class: 18% cap; mass emigration [`populationDynamics.js:120,327-328,445`] | refugee flow at severity ≥ 0.6 (§5) | none |
| Capacity | labour demand +18 × sev, supply −15 × sev; healing demand +35 × sev; welfare demand +20 × sev [`capacityModel.js:320-328,401-407,732-737`] | none | none |
| Factions | monthly template: temple +8 legitimacy, +6 trust; government −5 legitimacy; merchants −5 trust, +3 wealth; criminals +4 power, −2 legitimacy; arcane +3 trust; military −4 manpower. Pulse ticks are weekly and `advanceTime` scales by 0.25 and rounds, so per tick about +2/+2, −1, −1/+1, +1/0, +1, −1 [`factionRelationshipUpdate.js:50-71`; `timeProgression.js:123-128,381-395`; `advanceInterval.js:511`; called every pulse at `pulseKernel.js:592`] | none | none |
| Faith | — | effective severity adds to crisis disorder (type-blind) [`religiousContest.js:181-209`] | temple pulse 0.25 × level: SEAM [`pestilence.js:316-318`] |
| Duration texture | — | counterforce and synergies (§3.5) | care speeds the fade |
| Institutions | — | — | — (only the legacy PLAGUE event, replay only, impairs healers, §3.13) |
| Traditions, NPCs, threat | cancels the town's observances (a hard archetype) [`traditionsKernel.js:197,249-252`]; a crisis condition for NPC goals [`npcAgency.js:362-371`]; threat type `plague` (needs healing) [`threatProfile.js:486`; `contradictions.js:302`]; district prose "drives crowds to temple steps" [`districtProfile.js:452,478`] | none (the roaming types are not in the traditions cancel set, `traditionsKernel.js:205`; threat and NPC reads take the settlement's own conditions and stresses) | none |
| Town map | condition badge on a seeded district; a `plague` hazard pin when the threat is ≥ 0.4; scene marker kind `plague` (§8.1) | none | none |
| After it ends | — | residual condition 6 ticks drains healing, labour, social trust at max(0.15, 0.45 × experienced) [`stressorsCore.js:418-466`]; also a +0.002 a month recovery signal [`populationDynamics.js:113,309`] | recovering, then pruned |

[INFERRED from OBSERVED] **The condition gap**: a plague that arrives along the front, or is born organically, is
mechanically lighter than a DM-authored one, and its causal footprint lands only *after* it ends (the residual
condition). DM Apply-stressor mints both forms (as did the legacy PLAGUE event); generation-time `plague_onset` mints only
the condition, with no roaming record and so no travel.

[INFERRED] **A self-feeding condition loop.** The `plague` condition adds +0.14 to disease pressure and drains
healing_capacity through the causal scan, which raises the base term; both push the town back toward the 0.5 floor at
which the condition can be minted again (`pressureModel.js:209-214`; `activeConditions.js:59-66`;
`candidateEvents.js:243-300`). The host found and capped exactly this shape for famine with a ledger ceiling, food only and
dark behind `demographicsEnabled` (`candidateEvents.js:316-361`); plague has no cap. Its gain depends on the causal scan's
healing scale, which no seat read, and whether a re-mint replaces or extends the live condition was not read. It matters
most for a DM plague in a weak-healing town.

### 3.9 Mortality, tier and flight

- No lit lane books plague deaths. The legacy population rate sheds people with the reason "population loss from
  cumulative settlement pressure" [`populationDynamics.js:451`]. The demographic engine's death class `disease` (weight 1;
  `plague` and healing-capacity conditions map to it) is BUILT DARK behind `demographicsEnabled` [OBSERVED
  `demographicsRates.js:268-313`]; when it is lit, the legacy lane writes only conserved emigration transfers
  [`populationDynamics.js:398-449`].
- Tier is never demoted by plague; it follows population through `popToTier` under `tierDriftEnabled` (all presets but
  SC) [INFERRED; the law stated for calamity at `PHASE55_SPATIAL_ENGINE_DESIGN.md:1638`].
- Mass emigration under a plague condition: on a mapped realm the shed rides M4 refugee columns with road mortality and
  lagged arrivals; unmapped, 45% of it is credited to destinations [OBSERVED `populationDynamics.js:445-470`]. Columns
  carry no plague (pg-1 is designed only).

### 3.10 Unrest and legitimacy

Through the condition's legitimacy drain and the per-tick faction deltas (§3.8). The generation-time stress also writes
safety prose ("Quarantined", "Restricted", "Dangerous — Plague Unrest"), quarantine-violation and profiteering crimes,
and a "QUARANTINE ACTIVE" defence posture [OBSERVED by reader seat 2: `src/generators/safetyProfile.js:134-145,534-539,630`;
`defenseStateProse.js:1548,1810`; OBSERVED the posture label keyed on the stress at `src/domain/display/defenseDisplay.js:33`].
These are not generation-only: a DM Apply-stressor reruns the `powerStructure` and `economicState` generators
[OBSERVED `registryRerunKeys.js:68`], and with `plague_onset` among the settlement's stresses the power generator adds a
"Quarantine Council" faction at power 15 and multiplies religious factions' power by 1.5 and merchant or trade factions'
by 0.7 [OBSERVED `src/generators/power/stressFactions.js:146-155`]. The NPC secrets keyed on `plague_onset`
(`src/data/stressInstitutionEffects.js:260-276`, read by `npcGenerator.js:32`) are generation-time only, since the
Apply-stressor rerun list does not include `npcs` [OBSERVED]. A Table Ledger `plague` key matches none of these
`plague_onset` hooks [INFERRED from the key spelling].

### 3.11 Faith [OBSERVED `religiousContest.js:181-209`; `pestilence.js:56-60,316-318`]

Every live stressor at the town adds its effective severity to crisis disorder, which lifts chaos receptivity and the
revival of the unaffiliated; plague is not special in it. The bounded "temple's hour" pulse is computed but unread.
God's Abandonment needs famine, plague and a conversion fracture at the same town (§4). Faith omens on plague are a
DM-attributed reading, never engine-originated (WF-4 rebased on OD-FC-8) [STATED `research/sf/faith-system.md` §5.5 (line 517);
fold OD-FC-8 (fold:501)]. The rumour design reframes a plague as "X's punishment of heretics" when it passes a deity-X town
[STATED `PHASE55_SPATIAL_ENGINE_DESIGN.md:314`; not verified in code].

### 3.12 Prosperity and the economy

The pulse lanes never touch prosperity: an organic, spread or front plague has no writer to it [OBSERVED: no reader of
`disease_outbreak` in the food or economy kernels; `foodStockpile.js:197-247` reads only famine and blockade stressors].
**A DM-authored plague does, but only at the next regeneration from config** [Fable-reviewed 2026-10-18 (lane retrovalidation/prosperity): Apply-stressor runs no economy pass — `mutateWorld.js:681-690` → `crisisOnset` writes the container, the `config.stressorEdits` record and the promoted condition (`crisisLifecycle.js:300-330`), the event pipeline derives system, causal and faction state only (`eventPipeline.js:37-44`), and `registryRerunKeys.js:68` is a freshness classifier read by `display/economyFreshness.js` alone (`:19-30`; the step-level rerun engine is retired), so the band keeps its generation value after the event (`economyFreshness.js:6-12`); the authored stress persists in `config.stressorEdits.added`, which the generator's stress step overlays on a Regenerate Draft or Edit-Mode re-derivation (`src/generators/steps/resolveStress.js:126-177`; `src/domain/edit/dmLayer.js:911-920`), and there the prosperity generator drops one rank while `plague_onset` is among the stresses (`src/generators/economy/prosperity.js:160`) — as does the Quarantine Council (`stressFactions.js`, a generator step imported by `rulingStructure.js:17` only)]. A lower prosperity can in turn cancel observances at the
subsistence rank (`traditionsKernel.js:254-256`). Crisis disorder reads *inverse* prosperity as an input. EC's M11 row designs healing moving fair → dear → desperate as the sick outnumber healers, with "no quarantine
stance exists" [STATED `DESIGN_FP_ARCH_EC.md:2244,2352`] — EC is dark entire (fold §2).

### 3.13 Institutions

Only the legacy PLAGUE event touches them: every healing-vocabulary institution takes a capacity impairment of 0.6 × the
event's severity, propagating one hop [OBSERVED `mutateWorld.js:553-575`]. That verb is non-authorable today (folded into
Apply-stressor, refused by the decree catalogue, left out of the composer's verb list) [OBSERVED
`affordanceManifest.js:109-119,645-649,721-724`; `src/domain/edit/eventCatalogue.js:284`], so healer impairment is
reachable only from saved or replayed PLAGUE events; Apply-stressor impairs nothing. A calamity that ruins a healing house
removes it from plague care [OBSERVED `pestilence.js:189`].

### 3.14 Ending and memory [OBSERVED `stressorsCore.js:418-500`; `stressorAftermath.js:1-53`; `pestilence.js:533-564`]

Resolution emits, per affected settlement, the residual condition (6 ticks), then an echo record collapsed to the origin
with memory strength max(final severity, 0.5 × peak), and a wizard-news resolution line [Fable-reviewed 2026-10-18: the
campaign history event of type `population_friction` is not written at resolution; when the echo later graduates (memory
< 0.1, at most about 20 ticks on), a second news line and that history event are written at the origin —
`stressorAftermath.js:8-14,49,148,218`; `pulseKernel.js:670,1996`; the echo's footprint is the origin, `stressorsCore.js:489`]. An organic re-birth at the same origin reads the echo's memory (+0.3 × memory) and then
overwrites it; a **front materialization** at a town holding a resolved echo of the same canonical id overwrites the echo
outright with no re-ignition boost, so that memory is lost [OBSERVED `pestilenceKernel.js:248-256`;
`stressorsCore.js:474-484`; `stressors.js:490-491`]. [INFERRED] It is rare on a mapped world: an echo fades by about 0.89 a
tick and graduates below 0.1, so it lasts at most about 20 ticks (`stressors.js:304-305,330-340`), while the town's own
cleared front record blocks re-seeding for 40; the overwrite needs an echo older than the town's front record (an
outbreak resolved before the canon) or a record that outlived the 26-tick floor by more than 20 ticks. The front record lingers as "recovering" through its 40-tick
refractory and is pruned. There is no
permanent stamp (contrast calamity's eight-stamp history). The urban-fabric `plague_quarter` scar (half-life 156 weeks,
"shunned houses linger about three years") is minted only from a calamity stamp whose type matches a plague word, and
calamity stamps carry flood, fire, quake or storm; famine has a stressor-side scar mint and plague has none, so the scar is
unreachable [OBSERVED `urbanFabricKernel.js:305-330,656-672`; `calamityKernel.js:492`; `calamity.js:87-104`].

### 3.15 DM authoring and generation [OBSERVED]

- **The DM's plague is Apply-stressor `plague_onset`.** The composer offers it with word bands minor 0.35, moderate 0.6
  (the default) and severe 0.85 [`affordanceManifest.js:89,292`]. Condition promotion mints the `plague` condition, the
  twin directive injects a `disease_outbreak` record at the payload severity [`crisisLifecycle.js:235-330,584-593`;
  `stressorPicker.js:43`], and the next regeneration from config (not the apply itself) adds the Quarantine Council and the prosperity drop (§3.10,
  §3.12 [Fable-reviewed 2026-10-18]). Undo withdraws the twin. RESOLVE_STRESSOR ends it, leaving an echo.
- **The legacy PLAGUE event** (writes `_activePlague`, impairs healers, mints the condition, injects the twin) is
  non-authorable: listed in `NON_AUTHORABLE_EVENTS`, folded into Apply-stressor with an unavailable predicate, filtered
  out of the composer's verb list and refused by the decree catalogue [`affordanceManifest.js:109-119,645-649,721-724`;
  `eventCatalogue.js:284`]. Its handler, twin, undo, faction responses, regional `health_shock` and pending-intention
  label survive for saved and replayed events [`mutateWorld.js:536-583`; `crisisLifecycle.js:572-583,621-650`;
  `factionResponses.js:282,403,535`; `region/deriveRegionalState.js:542-548`; `PendingIntentions.jsx:35`].
- **The Table Ledger's `plague` obligation** (bands minor 0.25, moderate 0.5, major 0.8) dispatches Apply-stressor with
  stressor type `plague` [`tableLedger.js:123-160,265`; `pendingEditIntents.js:105-118`]. Promotion still mints the
  `plague` condition (the text rule matches), but `pulseTypeForStressorKey('plague')` is null, so the twin is a roaming
  record typed `plague` [`stressorPicker.js:58-62`; `crisisLifecycle.js:584-593`]. That type falls back to the generic
  catalog entry: no spread channels, birth threshold 0.65, residual `local_scars` on public_legitimacy only
  [`stressorsCore.js:301-309`]; the front ignores it (`isLivePlague` wants `disease_outbreak`,
  `pestilenceKernel.js:84-87`); three such towns read as "Realm-wide plague", never "The Plague", and it never forms The
  Wasting (`realmEvents.js:26-47,428`); it does displace refugees (`flows.js:42-44`) and has no counterforce or
  synergy profile [INFERRED from the fallback]. A host defect candidate (§10.1 item 23).
- At generation, the stress `plague_onset` (0.027) becomes a `plague` condition [`stressTypes.js:84-93`;
  `conditionPromotion.js:29`] and colours safety and defence prose (§3.10).
- **What a DM severity reaches** [INFERRED from OBSERVED]: the twin is injected outside the pulse, and the next pulse ages
  stressors before any candidate reads them (`pulseKernel.js:509-511`; the escalation note at `stressors.js:733-738`). For
  `disease_outbreak` one aging step removes 0.1 × a multiplier of 0.4..1.8 (counterforce 0.7..1.8, synergies down to 0.4;
  `stressors.js:364-379`; `stressorDynamics.js:452`). So a moderate (0.6) plague reads 0.42..0.56 when flows and spreads
  look: it **never** reaches the refugee-flow bar (≥ 0.6 on the record and the source); it clears the aspatial spread bar
  (> 0.42) except in the best-healed towns; it is well under the 0.78 spread-proposal bar. To reach refugees a DM plague
  needs about 0.64 at the least (weak healing plus famine), about 0.67 under weak healing alone, about 0.7 at neutral
  counterforce and up to 0.78 in a strongly healed town — **strong** healing raises the bar, because it speeds decay. The
  severe band (0.85) reaches it everywhere; minor (0.35) never spreads aspatially; the Table Ledger's `plague` twin never
  spreads at all. The front seeds from any live `disease_outbreak`, whatever its severity (§3.7).

### 3.16 Constants in one place

| Constant | Value | Home |
|---|---|---|
| disease base | (70 − healing)/70 | `pressureModel.js:18-21` |
| condition lift; housing lift | +0.14; +0.08 at housing < 45 | `pressureModel.js:212,215-216` |
| crowding lift cap (dark) | 0.22 (gains 0.10, 0.09, 0.06, 0.05; ease 0.60) | `demographicsRisk.js:82-91` |
| condition floor; probability; proposal; duration | 0.5; min(0.42, 0.06 + 0.3s); ≥ 0.72; 10 at ≥ 0.75 else 6 | `candidateEvents.js:243,275,281,298` |
| birth threshold; probability | 0.58; clamp(0.07..0.5 of 0.34s) × gate, clamp 0.02..0.6 | `stressorsCore.js:122`; `stressors.js:514` |
| gate | ×1.5, ×1.4, ×1.4, ×1.3, ×1.15, ×0.55 | `stressorGates.js:592-608` |
| episodic | 0.18 / 0.1 / maxAge 8 | `stressorsCore.js:29` |
| counterforce | healing 0.7, redundancy 0.3, bonus 0.18 | `stressorDynamics.js:235-244` |
| aspatial spread | > 0.42; ≤ 3 targets; min(0.34, 0.05 + 0.22s); ×0.72, floor 0.2; proposal ≥ 0.78 | `stressors.js:57-58,769-794` |
| refugee flow | ≥ 0.6 (record and source); 4–12% of source; min(0.45, 0.1 + 0.3s); proposal ≥ 8% only when `majorChangesRequireProposal` (RR, LR; DC and FS auto) | `flows.js:30-46,62-91,173-177` |
| faction template (monthly; ×0.25 a weekly tick, rounded) | temple +8 leg, +6 trust; government −5 leg; merchant −5 trust, +3 wealth; criminal +4 power, −2 leg; arcane +3 trust; military −4 manpower | `factionRelationshipUpdate.js:50-71`; `timeProgression.js:123-128` |
| stressor life | decay 0.1 × 0.4..2.5; resolution 0.18 + 0.04(age−1) + cf, +0.25 at age 8; ends at ≤ 0.08 | `stressors.js:145-164,364-379,400-409` |
| DM bands | composer 0.35 / 0.6 / 0.85; Table Ledger 0.25 / 0.5 / 0.8 | `affordanceManifest.js:89`; `tableLedger.js:123` |
| mass-migration gate | ×1.6 crisis next door, else ×0.7; ×0.5 under occupation; sealed by siege | `stressorGates.js:787-802` |
| onset | 0.34 + 0.34d + 0.20v + 0.16i − care, 0.04..0.92 | `pestilence.js:76-81` |
| care | cap 0.6; within 0.55; church 0.5, healing 0.7, druid 0.55, alchemist 0.6 | `pestilence.js:88-95` |
| front spread | 0.55 × level × (1.5 hot), cap 0.95; ≤ 6 seedings a tick | `pestilence.js:98-100,482` |
| arrival severity; level | max(0.2, 0.72src + 0.25d); 0.3 + 0.4d | `pestilence.js:84-86,252,523` |
| level dynamics | ramp 0.34; relax 0.14 + 0.3 care; prune 0.02 | `pestilence.js:102-105` |
| lifecycle | floor 26; fizzle 8; cleared 40 | `pestilence.js:107-118` |
| anchors | trade 60; shipments 4; flow-in 30 | `pestilenceKernel.js:71-79` |
| temple; army | 0.25; 1.4 hazard, 0.35 contract, 0.25 impair | `pestilence.js:120-124` |
| residual; echo; re-ignition | max(0.15, 0.45e), 6 ticks; max(final, 0.5 peak); +0.3 × memory | `stressorsCore.js:426,453,494`; `stressors.js:490` |
| realm arc | ≥ 3 settlements; re-emit cooldown 6 ticks | `realmEvents.js:14`; `pulseKernel.js:1960` |
| arrival news | major at ≥ 0.55 or multi-town; score 40 + 30s | `pestilenceKernel.js:287-288` |
| display bands | 0.2 / 0.45 / 0.7; care band cuts 0.2 / 0.55 of the cap | `settlementPestilence.js:57-64,89` |

---

## 4. The realm picture

- **Footprint.** Unmapped: one record per outbreak, its `affectedSettlementIds` growing by aspatial spread, each member at
  its own attenuated severity. Mapped: the front *fragments* an outbreak into one record per town it takes hold in
  (origin = that town), tied together only by the epidemic ledger's `sourceId` while the record lives and by the
  materialization's reason line, which names the source settlement by display name, not id [OBSERVED
  `pestilenceKernel.js:233-247`].
- **Named arcs.** Any stressor type active in three or more settlements (unioned across records) is promoted: "The Plague
  grips the realm", severity 0.6 + 0.08 per settlement, re-emitted no more than once per six ticks for the same set
  [OBSERVED `realmEvents.js:403-453`; `pulseKernel.js:1960-1980`]. Compound signatures, judged per settlement, longest
  first: "God's Abandonment" (famine + plague + conversion fracture: flagellants, scapegoats, false prophets) and "The
  Wasting" (famine + plague: healers rationing care, grain wagons escorted "past the quarantine lines" — a hook line, not
  a mechanism); scope realm at three or more towns, severity +0.1 [OBSERVED `realmEvents.js:26-47,143-215`]. The call
  is ungated, so in SC the arcs fire when DM-fed (three injected towns, or front materializations on a mapped SC realm)
  [OBSERVED `pulseKernel.js:1971-1979`]. A Table Ledger `plague` record is a different type and reads "Realm-wide
  plague" [`realmEvents.js:428`].
- **Ranking.** Drama class `plague` is third in the decision tier's priority, after war and succession or coup
  [OBSERVED `decisionTier.js:177,195`; `src/domain/display/chronicleGraph.js:63`].
- **News and rumour.** "Plague reaches X" (regional; major when severe or several towns in one tick) goes to the events
  herald; disease pressure goes to the divination herald [OBSERVED `pestilenceKernel.js:276-303`;
  `src/domain/realm/heraldRouting.js:282,293,404`]. A major entry enters the rumour network, which carries it up to four
  hops along trade edges at hop-week latency with a 26-tick life, under the non-omniscient info modes on mapped worlds —
  DC and LR (`perfect_delayed`) and FS (`full`); RR, QL, NC and SC are omniscient [OBSERVED `rumorNetwork.js:117-140,406-410`;
  infoMode per preset by node]. [INFERRED] So in the belief presets the word of a plague and the plague travel the same
  links and race.
- **Read models.** `realmPestilence` orders the whole front by band; `hasPestilence` and `campaignHasEpidemic` are panel
  gates; none has a caller [OBSERVED `settlementPestilence.js:201-250`]. The world map's advance report labels a
  `plague` drama class [`src/components/map/AdvanceReport.jsx:49`]; no map layer draws plague. Telemetry counts epidemic
  sites [`src/lib/spatialUsage.js:140,199`].
- **Cadence.** Organic plague is measured silent (§1). The aspatial stressor family is measured busy in two 30-year,
  12-settlement soaks (30 of 30 years) but quiet in a 100-year, 4-settlement one (2 of 100 years) [STATED `src/domain/certification/subsystemRowsPeople.js:190`]. The
  refugee flow lane appeared zero times in 163 observed years [STATED `subsystemRowsPeople.js:326`]. M11a has no
  certification row of its own [OBSERVED grep], so its lit behaviour is unmeasured in receipts.
- **Calamity is separate.** M11b strikes once per settlement every 15 × N years on average (realm-wide about one per 15
  years), kills 2–14%, sends 4–26% of survivors on the road, ruins 1–4 institutions and stamps permanent history; lit in
  RR, DC and FS only [OBSERVED `calamity.js:45-76,148-151`; node dump: `disastersEnabled` absent from QL, NC, LR, SC]. It
  creates no plague; it can weaken plague care by ruining healers.

---

## 5. MOVEMENT BETWEEN SETTLEMENTS

### 5.1 Every channel

| # | Channel | What moves | Carrier and route | Rate, cap | Travel time and season | Flag / gate | Status |
|---|---|---|---|---|---|---|---|
| 1 | Aspatial one-hop spread [`stressors.js:637-680,769-818`] | the same record joins a neighbour | confirmed **directed** channels of `trade_route`, `migration_pressure`, `service_dependency` out of any affected town | record severity > 0.42; ≤ 3 targets a record a tick; p = min(0.34, 0.05 + 0.22s); arrives at 0.72 × the source's experienced severity, floor 0.2 | none: same tick, no distance, no season | `stressorsEnabled` and `propagationMode` ∉ {off, local}; proposal at record ≥ 0.78 | LIT RR, LR, DC, FS; dark QL, NC, SC |
| 2 | Reconcile filter [`candidateEvents.js:476-502,552-557`] | — | under the marker, drops a spread candidate only when an affected source reaches the target over a forward trade-type channel | — | — | the marker | LIT wherever 1 and the marker coexist; migration and service spread is **kept** |
| 3 | M11a front — trade carrier [`pestilenceKernel.js:188-194`; `rumorNetwork.js:106-108,298-317`] | an incubating record, then a new stressor | confirmed `export_market`, `trade_dependency`, `trade_route` channels read **both ways**, one edge per neighbour | from each node active before this tick (seeds spread at once): p = min(0.95, 0.55 × level); ≤ 6 new seedings a tick realm-wide; no re-seeding while a record (incl. refractory) exists | `hopWeeks(digest, from, to, roadSeason)`, at least 1, capped; winter overlay; sea lanes and teleport edges where lit | `spatialCanonVersion` > 0 only — **no rules flag** | LIT on any mapped campaign with a live plague |
| 4 | M11a front — shipment carrier [`pestilenceKernel.js:151-164,195-198`] | same | M2 `supplyShipments` producer → consumer links, excluding starving links ("hot") | p ×1.5 | same | same, plus a live supply ledger | LIT as 3 |
| 5 | Onset at the destination [`pestilence.js:502-529`] | takes hold or fizzles | — | §3.6 | at `incubateUntil` | same | LIT as 3 |
| 6 | Refugee flow [`flows.js:42-110`] | **people**, plus a `regional_migration_pressure` condition at the destination (+0.14 disease, +0.18 food pressure, housing strain, +0.012 a month population) | confirmed channels `migration_pressure`, `trade_route`, `political_authority` out of each affected town, to non-affected towns | record and town severity ≥ 0.6 (read after aging, so a moderate 0.6 DM plague never qualifies, §3.15); 4–12% of the source; p = min(0.45, 0.1 + 0.3s) | same tick (a live law violation WY-4 repairs [STATED `fp-physical-integration.md` People row]) | `migrationFlowsEnabled` and propagation ∉ {off, local} [`candidateEvents.js:600-605`]; a proposal at ≥ 8% only when `majorChangesRequireProposal` is on (RR, LR), otherwise automatic (DC, FS) [`flows.js:92,173-177`] | LIT RR, DC, LR, FS; measured 0 in 163 years |
| 7 | Mass-migration births next door [`stressorGates.js:787-802`] | raises the odds of a `mass_migration` stressor in towns adjacent to a plague | any regional edge or channel of any type, both directions [`stressorGates.js:248-265`] — wider than the front's trade-only adjacency | ×1.6 when any neighbour has famine, siege, wartime, occupation or `disease_outbreak`, ×0.7 when none does; ×0.5 under occupation here; sealed by a siege here | — | `stressorsEnabled` | LIT QL, RR, DC, NC, LR, FS; that stressor then multiplies the plague gate ×1.4 where it stands (a loop) |
| 8 | Mass emigration from a plague condition [`populationDynamics.js:445-470`] | people | M4 columns over routes with road mortality (mapped); 45% credited (unmapped) | 18% cap | M4 transport lag (mapped) | `populationDynamicsEnabled`, `migrationFlowsEnabled`, propagation live | LIT RR, DC, LR, FS; carries no plague |
| 9 | Plague news [`rumorNetwork.js:117-140`] | belief, not sickness | trade edges, up to 4 hops (5 at score ≥ 95, unreachable for plague) | major only | hop weeks; TTL 26 | mapped and info mode ≠ omniscient | LIT DC, LR, FS on mapped worlds |
| 10 | Armies [`pestilence.js:320-350`; `pestilenceKernel.js:25-29`] | hazard read, contraction roll, vector | — | hazard 1.4 × risk tolerance × level; contraction 0.35 × level; impairment ≤ 0.25 | — | fenced; no caller (HBF-56 DEFER) | BUILT DARK, SEAM |
| 11 | Caravan refusal / trade avoidance [`dispatchEV.js:30-44,155-172`; PHASE55:1656-1706] | — | the dispatch EV's believed destination danger | the plague term was to be "a new max() argument" | — | — | DESIGNED ONLY (round 22.1; PG pg-4) |
| 12 | Column-carried contagion (PG pg-1) [STATED PG:134-197] | an incubating record seeded at landing | M4 / P2 columns from a plague-active origin, stamped at dispatch | `COLUMN_SEED_CHANCE[band]`; a per-tick `COLUMN_SEED_CAP` (unset; PG recommends ≤ half the front's 6) | "the journey was the incubation" | `contagionEnabled` and the marker (P2 arm also `demographicsEnabled`) | DESIGNED ONLY |
| 13 | Belief refusal at the gates (PG pg-3) [STATED PG:251-313] | refusal of groups from believed-plagued towns | the C-POPF-2 reception term | `REFUSAL_BAND`, relaxed by scarcity or war | stale belief refuses a clean town | `believedMigrationEnabled` ∧ belief axes ∧ believed conditions ∧ `contagionEnabled` | DESIGNED ONLY, blocked on POP-1 |
| 14 | Quarantine / closure | — | — | — | — | no verb, no stance input [STATED EC:2352; PG:322] | DESIGNED ONLY as an owner value |
| 15 | Regional-impact propagation [`region/propagation.js:540-603,899-965`; `applyWorldPulse.js:279,736-768`] | not the record: each applied pulse outcome that changes a settlement (a plague condition's causal shifts of ≥ 8 points, a population change of ≥ max(10, 1%)) becomes regional changes pushed along confirmed channels; destinations get `regional_*` conditions | `migration_pressure` → `regional_migration_pressure` (+0.14 disease pressure there, `pressureModel.js:31`); `service_dependency` → `regional_service_disruption` (drains healing_capacity, trade, legitimacy); `religious_authority`, `information_flow` and others by change kind. The healing drain itself routes nowhere (no rule reads a healing_capacity shift) | depth 1 (RR, LR) or 2 (DC, FS) [`simulationRules.js:1578-1586`]; thresholds `deriveRegionalState.js:453-492` | mapped: parked and delivered `hopWeeks` later at the road season (`parkArrivals`, internals not read); unmapped: same tick | `propagationMode` ∉ {off, local}; DM canon edits ripple at depth 2 with no rules flag [`settlementLifecycleHelpers.js:94-111`] | LIT RR, DC, LR, FS (pulse); all presets (DM edits). The legacy PLAGUE event's `health_shock` (`deriveRegionalState.js:542-548`) is replay-only; Apply-stressor has no event-kind change of its own |
| 16 | Roads believed danger [`roads/knownWorld.js:38-41,59-96`; `roadsKernel.js:505-507,932,1011-1021`] | not sickness: named-NPC journeys | a heard rumour whose kind contains `plague` (the `plague_arrival` herald entry) puts believed danger (magnitude band / 3, fading with silence) on the implicated towns; the route scorer then avoids them, refuses the journey, or waits | — | rumour arrival is hop-weeks; the route is chosen at the season | `roadsEnabled` (RR, DC, LR, FS) and `beliefsActive` (marker and a non-omniscient info mode) [`beliefMap.js:204-209`] | LIT DC, LR, FS on mapped worlds; in RR known ≡ true and the true embattlement ledger holds no plague term (`pulseKernel.js:2394` is its only writer; a plague condition's crime lift enters its ramp generically, §9 item 3). The same view feeds the route-charter danger read (`routeNetworkCharterDanger.js:155-166`), dark behind `routeLifecycleEnabled` |

### 5.2 Travel time in detail [OBSERVED `distanceRead.js:653-756`; `pestilenceKernel.js:192-197`; `campaignSpatialCanonize.js:118-131`]

- Latency per hop is `hopWeeks` over the frozen digest at the road season. On a new canon the digest carries the
  seasonal-road overlay (a terrain-weighted per-season multiplier applied at read time, never re-baked), sea lanes
  (escalated to only when an endpoint is a port) and teleport edges (season-immune). Every leg is floored at one week and
  capped at the maximum hop.
- The front uses the cheapest route's cost for latency but never the route itself as a carrier: adjacency is the
  regional graph and the shipment ledger. Distance never lowers the spread probability; it only delays the onset.
- [INFERRED] A teleport circle between two trade partners makes plague cross at the one-week floor in any season; a sea
  lane lets it cross water as fast as cargo does. Neither is a new carrier.
- [INFERRED from OBSERVED] **Unmapped endpoints are fastest**: `hopWeeks` returns null for a settlement founded after the
  canon (the "foundings since mapped" case the Living-World card warns about, `LivingWorldGates.jsx:89-107,135-138`), and the
  kernel then uses one week. A digest-less marker world does the same.
- The display's "some N weeks up the road" calls `hopWeeks` without a season, so in winter it can disagree with the
  engine's latency [OBSERVED `settlementPestilence.js:136-141`].

### 5.3 Capacity and brakes [OBSERVED `pestilence.js:50-54,449-494,533-564`]

Six new front seedings a tick realm-wide (codepoint order, so low-id sources win ties); no same-tick cascade; one record
per town (an infected, incubating or recovering town cannot be re-seeded); 8- and 40-tick refractories; the 26-tick
recovery floor. The aspatial lane's brake is three targets per record per tick and the 0.42 severity bar. No route
capacity, no per-edge throughput limit and no quarantine exist.

### 5.4 Autonomy [OBSERVED `candidateEvents.js:522-551`; `changeAuthorityPolicy.js:344`]

The aspatial spread, births and escalations obey the political-autonomy routing (severity bars, and everything is a
proposal under `dm_only` in SC or `recommendations` in NC). The front materializes post-apply with no proposal: "nature
is exempt from the political-autonomy axis", so canonizing a map upgrades plague travel from DM-gated to autonomous. The
alternative (proposal-gated materialization) is queued as an owner note, not built.

### 5.5 What does not move plague

Territory, borders, gates and vassal chains (never read); contested marches and the true embattlement ledger (never read; no plague term, though a plague condition's crime lift
is one of embattlement's ramp inputs — §9 item 3); patrols (none exist); armies (fenced); seasons other than as road latency; distance as a
probability decay; the world map's routes as polylines; the town map (it *shows* a plague condition, §8.1, but moves
nothing).

What plague *does* move besides itself: its consequences, along confirmed channels (row 15), and believed danger on the
roads in the belief presets (row 16), which re-routes or stops named-NPC journeys but carries no sickness and does not
touch caravans (the caravan dispatch seam still has no plague term, row 11).

---

## 6. Couplings with the rest of the simulator

**Into plague (reads).** Causal scores healing_capacity, housing_pressure, trade_connectivity (aspatial and front); the
healing ledger (healer count, redundancy); institution names and their ruin status; conditions `plague`,
`regional_migration_pressure`, `custom_crisis`; co-located famine, mass migration and magic deadzone stressors; the
regional graph's confirmed channels; M2 `supplyShipments`; M6d `tradeFlow` (whose "display only" header is false because
the front reads it causally, STATED EC:281-283,408); the digest, the road season, sea lanes, teleport edges; tier and
population; the echo memory; the DM's events. Dark: the demographic risk read.

**Out of plague (writes and feeds).** `worldState.stressors` (births, spreads, escalations, materializations, echoes);
`spatialLedgers.epidemic`; settlement conditions (plague, residual, refugee influx at destinations); population (legacy
rate, flight, transfers); faction standing; capacity demand; faith crisis disorder and so conversion receptivity;
mass-migration births next door; realm and compound arcs; wizard news; rumours (belief presets); campaign history; herald
routing; the dossier's pestilence block; the decree tracker's "a disease outbreak struck X" cause line
[`decreeTracker.js:157`]; NPC lived-experience row `plague_season_survived`, unreceipted at person grain
[`livedExperienceCatalog.js:452-466`]. Also, from the condition: regional impacts on neighbours along confirmed channels
(§5.1 row 15); traditions cancelled (`traditionsKernel.js:197`, lit RR, DC, LR, FS); NPC goals under a crisis condition
(`npcAgency.js:362-371`, all presets but SC); the threat profile's `plague` type and its "needs healing" contradiction
check (`threatProfile.js:486`; `contradictions.js:302`); the town map's badge, hazard pin and scene marker (§8.1). From a
DM Apply-stressor: the power and economy rerun (§3.10, §3.12). From the `plague_arrival` herald entry, in the belief
presets: believed road danger (§5.1 row 16). From disease pressure: `magic_deadzone` and `magical_instability` births
(§3.3).

**Designed couplings.** PG §5 item 5: disease → migration (dispatch stamp), migration → disease (landing seed), belief →
reception (suspicion term); `CHARTERED_VOLUME_PREFIXES` excludes PG today and the prefix is chartered with its first
registry row [STATED PG:359-367; fold §3.3.2]. Round 21's army coupling (graded hazard in route scoring, contraction,
vector; "besieging a plagued city becomes priceable folly") and its "quarantine dilemma emerges free from composition"
— both depend on the fenced hazard term [STATED `PHASE55_SPATIAL_ENGINE_DESIGN.md:1629-1636`]. Round 22's caravan refusal
from the belief map and the dispatch EV's plague danger shape [STATED PHASE55:1656-1706] — the named-NPC half of
belief-routed plague avoidance is live through the roads' known view (§5.1 row 16); the caravan half is not. The generosity mover's route
risk names a "plague hazard" read through the same dispatch seam [STATED `generosityEV.js:310-316`], which has no plague
term. EC's healing bands (M11) and elite-affliction variant (M12) [STATED EC:2244-2245]. POP's bells line. CN's stressor
pin, now an Edit Mode seal: a pinned plague keeps seeding and being refused; only its resolution arm is held [STATED
PG:322; fold §3.1.20].

---

## 7. STATUS by mechanism and preset (checked in code at `81f1cd96`)

Flag values from the node evaluation of every preset: `stressorsEnabled` and `emergentEventsEnabled` true in RR, QL, DC,
NC, LR, FS and false in SC; `propagationMode` first_order (RR, LR), full (DC, FS), local (QL, NC), off (SC);
`migrationFlowsEnabled` true in RR, DC, LR, FS; `populationDynamicsEnabled` and `tierDriftEnabled` false only in SC;
`disastersEnabled` true in RR, DC, FS; `urbanFabricEnabled` true in RR, DC, LR, FS; belief axes and believed conditions
true in DC, LR, FS; info mode non-omniscient in DC, LR, FS; `demographicsEnabled`, `contagionEnabled`,
`calamityArcEnabled`, `believedMigrationEnabled`, `routeLifecycleEnabled` lit nowhere; `roadsEnabled` and
`traditionsEnabled` true in RR, DC, LR, FS (the ONE_REGEN set, `simulationRules.js:742-752`); `npcAgencyEnabled` false only
in SC; `majorChangesRequireProposal` false in DC and FS (OPEN, `simulationRules.js:698-703`), true elsewhere. **The Living-World gate** lights only relationship drift,
the war layer and faith spread [OBSERVED `LivingWorldGates.jsx:55-75`] — **no plague lane**; its sibling, the premium
"map geography" canonize, is the only control that changes plague behaviour (generated maps only; imported maps stay
aspatial) [OBSERVED `LivingWorldGates.jsx:107-175`].

| Mechanism | RR (default) | Other presets | Notes |
|---|---|---|---|
| Disease pressure, base terms | LIT | all that run the pulse | consumers gated below |
| Demographic crowding lift | BUILT DARK | — | `demographicsEnabled` |
| Organic `plague` condition | LIT | QL, DC, NC, LR, FS | off SC; 0 fires in 193 years (OD-FC-28) |
| Stressor birth, escalation | LIT | QL, DC, NC, LR, FS | off SC; ≥ 0.78 a proposal everywhere; all proposals in NC, SC |
| Counterforce, synergies, aging, residual, echo, aftermath | LIT | QL, DC, NC, LR, FS | SC: stressors never age [`pulseKernel.js:509-511`] |
| Aspatial one-hop spread | LIT (first_order) | LR, DC, FS | DARK QL, NC (local), SC (off) |
| Reconcile filter | LIT when mapped | LR, DC, FS when mapped | — |
| M11a front, onset, materialization, arrival news | LIT when mapped | any mapped campaign with a live plague: QL, DC, NC, LR, FS; SC [INFERRED] only from a DM twin | no rules flag; marker only; uncertified |
| Refugee flow | LIT | DC, LR, FS | off QL, NC, SC; measured silent; ≥ 8% a proposal in RR, LR only; a moderate DM plague never qualifies (§3.15) |
| Mass-migration gate next door | LIT | QL, DC, NC, LR, FS | — |
| Mass emigration from a plague condition | LIT | DC, LR, FS | M4 columns when mapped |
| Condition effects (causal, capacity) | LIT wherever a condition exists | all, including a DM plague in SC [INFERRED: pure derivations] | — |
| Condition population rate | LIT | QL, DC, NC, LR, FS | off SC |
| Faction deltas (monthly template, a quarter per weekly tick) | LIT wherever a condition exists | all presets that advance | `advanceTime` runs for every settlement every pulse [`pulseKernel.js:589-592`] |
| Traditions cancelled by a plague condition | LIT | DC, LR, FS | `traditionsEnabled`; off QL, NC, SC; the roaming stressor does not cancel |
| NPC agency: plague condition as crisis | LIT | QL, DC, NC, LR, FS | `npcAgencyEnabled`; off SC |
| Threat type `plague`, contradictions, district prose | LIT (derivations) | all | from a condition or a settlement-level stress name; not from a roaming stressor |
| Town-map badge, hazard pin, scene marker | LIT (display) | all | condition only; follows the audience projection |
| Regional-impact propagation of a plague's consequences | LIT (depth 1) | LR (1), DC, FS (2); DM edits in all at depth 2 | dark QL, NC, SC for pulse outcomes; mapped ⇒ hop-week delayed |
| Roads believed danger from plague news | dark (omniscient: known ≡ true) | DC, LR, FS when mapped | `roadsEnabled` ∧ `beliefsActive`; named-NPC journeys only |
| Route-charter danger from the same view | BUILT DARK | — | `routeLifecycleEnabled` |
| Disease-fed magic births (`magic_deadzone`, `magical_instability`) | LIT where gated in | QL, DC, NC, LR, FS | off SC; magic-load-bearing towns |
| Faith crisis disorder | LIT where a deity is seated | all; spread of the result needs `faithSpreadEnabled` (DC, FS, or the DM's gate) | born worlds seat no deity (FPQ-62) |
| Realm and compound arcs | LIT | QL, DC, NC, LR, FS; SC LIT when DM-fed | ungated call [`pulseKernel.js:1971-1979`]: in SC there are no organic births, but three DM-injected `disease_outbreak` towns, or front materializations on a mapped SC realm, fire the arc |
| Plague news into rumours | dark (omniscient) | DC, LR, FS when mapped | — |
| Display projection (dossier) | LIT when mapped | any mapped | PDF only |
| `realmPestilence`, `hasPestilence`, `campaignHasEpidemic` | SEAM | — | no caller |
| Temple pulse | SEAM | — | no consumer |
| Army hazard and contraction | BUILT DARK | — | fenced, HBF-56 DEFER |
| Plague term in dispatch danger | DESIGNED ONLY | — | round 22.1 |
| `plague_quarter` scar | BUILT, unreachable | (urban fabric lit RR, DC, LR, FS) | no plague minter |
| Demographic disease death class | BUILT DARK | — | `demographicsEnabled` |
| DM Apply-stressor `plague_onset`, RESOLVE_STRESSOR | LIT | all | the felt plague at default tuning; the Quarantine Council and the prosperity −1 land at the next regeneration from config, not at apply (§3.12 [Fable-reviewed 2026-10-18]) |
| Table Ledger `plague` obligation | LIT | all | a second roaming type `plague` (§3.15); defect candidate |
| Legacy PLAGUE event (healer impairment, `_activePlague`, `health_shock`, faction responses) | replay only | — | non-authorable [`affordanceManifest.js:109-119`] |
| Generation `plague_onset` | LIT at generation | — | condition only, no roaming record |
| M11b calamity (not plague) | LIT | DC, FS | not QL, NC, LR, SC |
| PG pg-0 `contagionEnabled` | DESIGNED ONLY | — | zero code |
| PG pg-1 column contagion | DESIGNED ONLY | — | also needs the marker; P2 arm needs `demographicsEnabled` |
| PG pg-2 prosperity and order resistance | DESIGNED ONLY | — | birth-gate arm aspatial-safe; onset arm needs the marker |
| PG pg-3 belief refusal | DESIGNED ONLY | — | blocked on POP-1 |
| PG pg-4 candidates, quarantine verb | DESIGNED ONLY | — | quarantine an owner value |
| POP-4 arc staging (now PG's), bells line (POP's) | DESIGNED ONLY | — | invisible at default tuning even if built (OD-FC-28) |

---

## 8. MAP TOUCHPOINTS today, and what a plague lens needs and could add

### 8.1 Where plague reads or could show geometry today

1. **Travel time**: `hopWeeks` per front hop at the road season [`pestilenceKernel.js:192,196`]; the display's seasonless
   "N weeks up the road" [`settlementPestilence.js:138,153-157`]; the parked arrival of a plague's regional impacts
   (§5.1 row 15) and of the `plague_arrival` rumour (§4); the season-aware route choice of a named-NPC journey that
   meets believed plague (§5.1 row 16). The seasonal term exists only on canons frozen or re-canonized since SEASONS-B
   (§2.3).
2. **Adjacency**: the regional graph's confirmed trade-type channels (front, both ways); directed trade_route,
   migration_pressure and service_dependency channels (aspatial spread); migration_pressure, trade_route and
   political_authority (refugee flow); every edge and channel of any type, both ways (the mass-migration gate); M2
   shipment links (the hot carrier); confirmed channels by type for consequences (row 15). **Routes**: the roads
   kernel's `chooseRoute` over the digest scores a believed plague town as danger and routes round it, refuses, or waits
   [`roadsKernel.js:505-507,1011-1021`] — the only place plague touches a route.
3. **The frozen spatial digest and the marker**: they gate the whole travelling layer; stamped by the premium canonize on
   generated maps only; a re-canonize bumps the marker [`campaignSpatialCanonize.js:180-186`].
4. **Ports and teleport circles**: the shipment carrier and import volume make ports hotter; sea lanes and teleport
   edges shorten latency. The fp-physical note maps the hot carrier to the port flag [`research/sf/fp-physical-integration.md:283`].
5. **Not read**: territory, gates, contested marches, patrols, route polylines, terrain beyond the cost law, elevation,
   climate. The town map is not *read* by plague. The town-scale `plague_quarter` scar is unreachable; if one existed,
   the fabric read and the layout would draw it as patched grain [`townMap/fabricRead.js:78-84`;
   `townMap/townLayoutV2.js:797-803`]. MF (the town-map fabric) is out of FP.
6. **Shown on maps today.** *Town map*: one condition badge per active condition, a `plague` condition included, on a
   seeded district [`townMap/townMapModel.js:567-584`]; a hazard pin of kind `plague` when the threat profile rates the
   plague threat ≥ 0.4 [`mapProfile.js:241-262`; `threatProfile.js:240,486`]; the 3D town scene gives both a `plague`
   marker kind and material [`townScene/sceneLivingPresentation.js:19-33,151-174`; `townScene/sceneLiving.js:221-276`;
   `sceneExportMesh.js:340`]. Both pass the audience projection (hazards by visibility; conditions unless marked
   otherwise) [`townMap/audienceProjection.js:92-100`]. A stressor-only plague (organic or front) shows nothing there —
   the condition gap again. *World map*: nothing plague-specific. The RegionalCausalityLayer draws confirmed channels
   and their queued, applied and resolved impacts in status colours, so a plague's propagated consequences appear as
   generic impact markers [`src/lib/regionalMapOverlay.js:1-100`; `MapOverlay.jsx:343`]; the sidebar palette shows a
   settlement's first authored or generated stress label, which for `plague_onset` reads "Disease Outbreak"
   [`SettlementPalette.jsx:318-330,424-427`; `stressTypes.js:84-85`]; the red "Plagued" chip is monster threat.

### 8.2 What a plague lens needs from the host (read-only host facts)

- The epidemic ledger as is: phase, level, `sourceId`, `arrivedTick`, `incubateUntil`, `activeSince`, `refractoryUntil`.
  Note the display's truth block omits `incubateUntil` and `refractoryUntil` [`settlementPestilence.js:175-186`]; a lens
  reads the ledger directly or asks for those two fields.
- The campaign's resolved rules and marker (which lane is live, §7), the road season, the digest.
- The carrier set per active node (the trade-type channels both ways and the live shipment links) to draw where it can go
  next.
- Each settlement's institution roster (care) and tier (density); trade volume and imports (onset risk).
- The stressor records (`affectedSettlementIds`, `severityBySettlement`, `lifecycleStage`, `originContext`, echo
  `memoryStrength`) for unmapped worlds and for the aftermath.
- Wizard news `plague_arrival` entries (tick, town, source name) and, in the belief presets, the rumour ledger for who has
  heard.
- The regional graph's impacts (kind, status, channel, source outcome) and, on mapped worlds, the parked arrivals, to
  show a plague's consequences landing next door (§5.1 row 15); the RegionalCausalityLayer already reads the impacts.
- Each settlement's active conditions (the `plague` condition is what the town map shows) and the roaming records, so
  the lens can say which representation a town carries (§2.1).

### 8.3 What a lens could show without inventing host facts [INFERRED]

- **Phase and band**: the host's trend words are incubating "approaching", active "active", recovering "receding"
  [`settlementPestilence.js:71-76`]; the presence sentences say "word of plague has reached", "plague burns in" and "is
  passing" [`:145-151`]. A lens word such as "burning" for the active phase is the map module's own choice, drawn from
  that sentence. Banded at 0.2 / 0.45 / 0.7 [`:57-64`].
- **Arrows**: `sourceId` → id, drawn along the carrier the map engine already owns (the trade route or the shipment
  path), labelled with hop weeks at the season; a shipment-carried hop marked as such.
- **Approach halo with an ETA**: `incubateUntil` − now for incubating records.
- **Next-hop forecast** (DM-only, labelled as a projection): from each active node, each carrier edge with the host's own
  per-edge chance (0.55 × level, ×1.5 hot), its latency, and the destination's onset probability from the exported pure
  `onsetProbability` and `careCapacity` — a derivation of host law, not new simulation.
- **Care ring** (band 0, 1, 2 from the roster) and **refractory greying** (a town that cannot be re-seeded until
  `refractoryUntil`).
- **Time scrub**: from the four ticks on each record, but records are pruned and the ledger holds only the current state;
  history needs pulse snapshots or a host-kept front log (§8.6).
- **Aftermath**: the echo's memory strength and the six-tick residual, at the origin only.

### 8.4 Unmapped realms (the default preset's usual state on the host today; the exception for a world born from this module, J384 (6))

The honest fallback is the record footprint: affected settlements with their attenuated severities, the record's stage,
and the echo afterwards. No arrows (the spread candidate stores the target, not the source that reached it), no ETA, no
time between hops, because the host has none. A lens should say "spread in the same week along links" rather than draw
roads.

### 8.5 Legend and audience traps

- "Plagued" and its red hue already mean monster pressure on the world map [`settlementThreat.js:1-12,36`]; a plague lens
  must use other words and another hue.
- The host says "a plague is not a secret": the projection's player view is banded fiction and the truth block is
  additive, never a scrub [`settlementPestilence.js:12-16`]. The incubating fiction already says "word of plague has
  reached X", so the player view of an approaching front is host-sanctioned.
- In DC, LR and FS on mapped worlds the word of a plague also travels as rumour; a player lens there could show "heard
  of plague" from the rumour ledger. pg-3's believed affliction (per observer, stale or wrong) would need the per-observer
  audience filter; it is designed only.
- Calamity is a separate lens (struck pins from `calamityHistory`, exposure by terrain); do not merge it with plague.
- The town map already has a `plague` marker kind and material and a threat type `plague` (§8.1 item 6); a world-map lens
  should keep its glyph and hue consistent with those so a town zoom does not change the sign.
- A town-map badge marks a *condition*; an epidemic record or a roaming stressor at the same town may show nothing there.
  A lens that links the world map to the town map must say which representation it shows (§2.1).
- Believed plague (row 16) is per observer: a DM view and a player view of "towns travellers avoid" differ, and stale
  news keeps a cleared town "dangerous" until silence fades it.

### 8.6 Host asks this implies (offers; the host chooses)

1. Put the source settlement id (not only its name) on each materialized record's origin context.
2. Keep a bounded front history (or a receipt per hop: source, carrier kind, weeks, onset outcome), so a lens can scrub
   time and draw arrows after records prune.
3. Read the road season in the display's weeks-away.
4. Close the condition gap: let a materialized or organically born plague write its condition where it lands (DM
   Apply-stressor already does), or have the causal scan read live stressors the way the food stockpile reads famine.
   That would also put the arrived plague on the town map, the traditions calendar and the NPC goals (§3.8).
5. Treat a settlement missing from the digest as "no spatial delay known" rather than one week, or prompt the
   re-canonize.
6. Mint the `plague_quarter` scar from a live plague stressor, as famine mints `lean_years`.
7. Map the Table Ledger's `plague` obligation to `plague_onset` (or `pulseTypeForStressorKey('plague')` to
   `disease_outbreak`), so the table's plague is the one plague truth (§3.15).
8. Cap the plague-condition loop as famine's is capped, or say why plague needs no cap (§3.8).

---

## 9. How this changes the map module's current readings

**Territory (J377–J378).**

1. **Borders are not plague barriers.** The host's plague never reads territory, sovereignty, vassal chains, contested
   marches or gates; the territory lens and the plague lens are independent layers over different host facts, and the
   territory lens must not imply that a border, a march or a patrol stops or slows sickness.
2. **Patrols have no plague job.** J378's patrols are derived from military enforcement; the host has no quarantine
   enforcement and no gate closure, so a patrol layer must not claim to hold a quarantine line. Route danger has a
   plague term in one place only: in the belief presets on mapped worlds (DC, LR, FS), heard plague news counts as
   believed danger and named-NPC journeys avoid, refuse or wait (§5.1 row 16). That is avoidance by travellers, not
   closure by an authority, and the caravan dispatch seam still lacks it. The quarantine words are generation prose, the
   "QUARANTINE ACTIVE" posture label, the Quarantine Council faction a DM plague adds (§3.10) and a compound-arc hook
   line — none is a mechanism that stops movement.
3. **Armies in the field carry nothing.** The army-plague coupling (hazard in route scoring, contraction, vector) is fenced
   with no caller; a contested march or an embattled overlay should show no plague interaction, and "besieging a plagued
   city becomes priceable folly" is design, not host behaviour (PHASE55:1631). Plague has no term of its own in the true embattlement ledger [Fable-reviewed 2026-10-18: but a `plague` condition's
   +0.12 crime pressure is one of embattlement's ramp inputs (crime above 0.5 at weight 0.3; `pressureModel.js:42,321-327`;
   `pulseKernel.js:2365-2391`; `embattlement.js:98,199-205`), so on mapped worlds a DM plague can nudge true danger
   generically — it can sustain or raise a region already embattled by siege or occupation, never start one (crime's whole
   weight 0.3 is under the 0.55 enter threshold, `embattlement.js:74,84-86`), and the scalar it nudges is what the movers'
   route re-score and banditry read as well as the roads (`embattlement.js:12-13,41-53`)]; the roads' *believed*
   embattlement view is the only plague-specific meeting (§5.1 row 16), and a territory lens built on true embattlement
   sees plague only through that generic crime term.
4. **Shared substrate, different graph.** Both readings use travel time over the frozen digest at the season, so the lens
   mechanism can share one hop-weeks read. But territory projects strength from seats over the land; plague moves over
   confirmed trade links and shipment links only. The religion lens's choice (J380: reuse the territory hinterlands) does
   not carry over: plague arrows follow carrier links, not hinterlands.
5. **J382's sea carriage already holds for plague latency, and needs nothing new.** On a new canon, sea lanes shorten
   path cost and so plague hop weeks between trade partners on two coasts; there are no "coastal footholds" for plague,
   and no carrier is added. Teleport circles do the same, season-immune.
6. **Canon staleness matters more for plague than for borders.** A settlement founded after the canon gets the one-week
   floor on every plague hop (§5.2); a lens should flag unmapped settlements, as the Living-World card already counts
   them. A canon frozen before SEASONS-B also has no seasonal overlay, sea lanes or teleport edges until re-canonized
   (§2.3), so J382's sea carriage and winter roads apply only to newer canons.

   **A plague's consequences travel the regional graph on a timetable.** On mapped worlds, the regional impacts a plague
   condition causes (refugee-influx and service-disruption conditions next door) are parked and land `hopWeeks` later
   (§5.1 row 15). A lens time scrub that shows plague should expect a second wave of `regional_*` conditions arriving
   along migration and service channels after the outbreak itself.

**Religion (J379 and `research/sf/faith-system.md` §9.6).**

7. **Plague is not a faith carrier and has no faith flow to draw.** Its faith coupling is the type-blind crisis disorder
   (raising receptivity and revival where it burns), the God's Abandonment compound, and an unconsumed temple pulse. A
   religion lens may shade crisis disorder but should not draw "plague drives conversion" arrows; with faith spread lit
   (DC, FS or the DM's gate), a plague-struck town is simply more receptive to creeds arriving on faith's own carriers
   [INFERRED from `religiousContest.js:181-209` and faith-system.md §6.6].
8. **Against §9.6 item 4 ("carriers are not routes"):** plague is the exception that proves it — its *latency* is a route
   read (hop weeks at the season), though its *adjacency* is still links. So plague is the one lens subject after armies
   and columns where an arrival time and a source are host facts.
9. **Against §9.6 item 5 ("dated receipts cannot yet name a source"):** plague's epidemic record does keep a source id
   while it lives, and the materialization names the source; arrows are recoverable now, but only until the prune. The
   host ask (§8.6 items 1–2) parallels faith's.
10. **Against §9.6 item 1 (read the campaign's resolved rule):** plague needs the same discipline, with a different key:
    the plague lens's mode is decided by the map-canon marker (front versus footprint) and by `propagationMode` (whether
    the aspatial lane moves at all), not by the Living-World gate, which has no plague lane.
11. **Omens stay out.** Plague as divine punishment is a DM-attributed reading (OD-FC-8) or a designed rumour bias; a
    religion lens should not colour plague towns by an engine-originated meaning.

**The lens mechanism (J379's "derived layer with legend, audience filter and time scrub").**

12. **Plague is the best-fitting first lens.** It has one sparse derived source, a ready read model with a player/DM split,
    phases and bands that are already words, a source per record and two forward-looking ticks (arrival and onset). It
    exercises all three parts of the mechanism with the least invention.
13. **Time scrub needs history the host does not keep.** The ledger is current state only and prunes; the lens mechanism
    should plan for per-pulse snapshots map-side or a host front log (§8.6).
14. **The audience filter has two plague modes.** Omniscient presets (RR, QL, NC, SC): everyone sees the same banded
    truth. Belief presets on mapped worlds (DC, LR, FS): the player view could be "what this settlement has heard" from
    the rumour ledger. A third mode (pg-3's believed affliction) is designed only.
15. **The legend must reserve vocabulary**: no "plagued" (monster threat), no hue collision with the threat chip, and
    calamity kept on its own layer.
16. **A lens must name the lane it is showing.** Front (mapped), footprint (unmapped, same-tick), or nothing moving (QL,
    NC, SC unmapped) — and, at default tuning, that what it shows is almost always a DM-authored outbreak.

---

## 10. Doc-versus-code contradictions, defects and open questions

### 10.1 Contradictions and defects (numbered)

1. **One plague truth, three consequences** [INFERRED from OBSERVED §3.8]: DM Apply-stressor mints condition + stressor
   (as did the legacy PLAGUE event); organic births and front materializations mint only the stressor; generation mints
   only the condition. Causal scores, capacity, factions, traditions, NPC agency, the threat profile, the town map and the
   population rate read only the condition (or settlement-level stresses), so an arrived plague is mechanically light
   and invisible where it lands and its causal mark appears only after it ends. No document names this.
2. `pestilence.js:44-47` says care shortens the record's active phase; in code care speeds only the recovering fade and
   the active phase ends on stressor resolution or the 26-tick floor [`pestilence.js:533-558`].
3. The pestilence headers say materialization automatically feeds the `gods_abandonment` seam [`pestilence.js:56-59`;
   `pestilenceKernel.js:16-18`]; that compound also needs famine and a conversion fracture at the same town
   [`realmEvents.js:26-37`], and the revival seam is type-blind.
4. The `plague_quarter` scar is unreachable (§3.14).
5. `research/sf/fp-physical-integration.md:283` credits plague with "armies contract it" (fenced, no caller) and a
   frequency of 1/(HAZARD_YEARS × N) per settlement-year, which is M11b calamity's law [`calamity.js:148-151`]; plague is
   pressure- or DM-born.
6. `research/sf/fp-simulator.md:255` has a flood striking riverside terrain; since the calamity bucket ruling the terrain
   type is a cosmetic hint and terrain only weights exposure [`calamity.js:78-104`]; and "calamityKernel is lit" holds
   for RR, DC and FS only.
7. The PG header says "DRAFT — NOT YET LANDED … no docs/ path was written" while the file sits at `docs/DESIGN_FP_ARCH_PG.md`
   on master; the fold's correction bracket says "NOT on master" [PG:4-11]. Read both as "no code on master"; the fold §2
   is the record.
8. The fold §2 says PG's "plague reaches X from refugees" waits on POP-4's fold [fold:349], but the same fold folds POP-4
   into PG [fold:270], and pg-1 depends only on the landed M4/P2 landing seams [PG:331-333].
9. EC's M11 row says the front reads the M6d tally "so trade spreads it" [EC:2244]; the tally weights only onset, while
   spread rides channels and shipment links [`pestilenceKernel.js:166-200`].
10. `subsystemRowsPeople.js:190` cites `candidateEvents.js:442` (the gate is at :520) and says the disease spread is
    suppressed whenever the marker is set; since FIX #2 only the trade-channel part is dropped [`candidateEvents.js:476-502`].
11. `dispatchEV.js:41-44` calls M11a unbuilt and promises a plague term; M11a is built and the term was never added.
    `generosityEV.js:310-316` claims a plague hazard read through that seam, which has none.
12. Arrival news says "carried along the trade roads" and `channelType: trade_route` even for shipment-carried hops
    [`pestilenceKernel.js:241-243,290,293`]; pg-1's column hops would inherit the same words.
13. The display's weeks-away ignores the season (§5.2).
14. **Three spellings of "healer"**: the front's four-category care regex, `healingLedger`'s pattern (gate, counterforce,
    DM impairment) and capacity's healing read. `mutateWorld.js:555-558` says its pattern matches "the roster M11a's care
    counterforce reads"; it does not (a cathedral or druid grove is care for onset but not a healer for the gate; a
    temple is both; "Priest (resident)" is neither) [PG:237-241; `pestilence.js:163-168`; `healingLedger.js:31-32`].
    That impairment pattern now runs only on replayed PLAGUE events (§3.13).
15. `habitForkRegistry.js:523-526` (HBF-57) calls the front's second draw a "clearance gate"; it is the onset draw;
    clearance is deterministic.
16. `advancePestilence`'s doc says a failed onset is "pruned with a refractory window"; the code keeps a recovering record
    at level 0 until the 8-tick refractory ends [`pestilence.js:395-397,510-517`] (cosmetic, but it is what blocks
    re-seeding).
17. **Defect candidate** [INFERRED]: unmapped endpoints and digest-less marker worlds get one-week hops, the fastest
    possible (§5.2).
18. **Defect candidate** [INFERRED]: arrival severity reads the source's current severity, falling back to 0.5 when the
    source's record has resolved during incubation [`pestilenceKernel.js:205`; `pestilence.js:520-522`].
19. **Design question** [INFERRED]: severity has a non-decaying fixed point along chains of dense towns (§3.7).
20. **Open defect** [INFERRED, untested]: in SC on a mapped realm, a DM plague's front still runs (the kernel reads no
    rules flag), while stressors never age; the 26-tick floor sends nodes to recovering, and once a record prunes, a
    still-live seed re-enters as patient zero — a cycle with no end until the DM resolves it.
21. Front materializations fragment one outbreak into many records; the realm arc unions by type and copes, but
    provenance survives only in prose (§4).
22. The realm and compound arcs are synthesized before the front advances, so a tick's materializations count on the next
    tick (§2.4); compound severities use record severity, not each town's attenuated severity [`realmEvents.js:155`].
23. **Defect candidate — a second plague type** [OBSERVED path, INFERRED consequence]: the Table Ledger's `plague`
    obligation injects a roaming record typed `plague` (no catalog entry), which breaks "one plague truth": no spread, no
    front, no counterforce, a legitimacy-only residual, "Realm-wide plague" instead of "The Plague", no Wasting, no
    power or economy rerun hooks (they key on `plague_onset`) — yet it displaces refugees (§3.15)
    [`tableLedger.js:131-133,265`; `stressorPicker.js:58-62`; `stressorsCore.js:301-309`; `flows.js:42-44`].
24. `crisisLifecycle.js:96-102` calls PLAGUE "the DM's dedicated outbreak button"; the verb is non-authorable and folded
    into Apply-stressor [`affordanceManifest.js:109-119,645-649`]. Healer impairment (`mutateWorld.js:553-575`) is
    therefore unreachable from today's authoring.
25. **Design question** [INFERRED]: the plague condition feeds its own re-mint (+0.14 disease pressure and a healing drain);
    famine's identical loop is capped by a ledger ceiling, plague's is not (§3.8).
26. A front materialization overwrites a same-id resolved echo without the +0.3 × memory re-ignition an organic birth gets
    [`pestilenceKernel.js:248-256`]; rare on mapped worlds (§3.14).
27. A moderate (0.6) DM plague never reaches the refugee-flow bar, because aging runs before flows read severity (§3.15);
    no document says the DM's default band displaces nobody.

### 10.2 Open questions

- Should the end tuning review's signature on the disease floor (OD-FC-28) precede any plague lens work, since organic
  plague is otherwise invisible?
- Does the owner accept "nature is exempt" (front materialization autonomous even under `dm_only`), or want the queued
  proposal-gated alternative?
- Is the front meant to have no rules flag, so that mapping a quiet or narrative campaign (propagation "local") turns on
  inter-settlement plague travel that its preset otherwise forbids? [INFERRED: today it does.]
- Should the time-progression faction deltas and the causal scan read live plague stressors (item 1)?
- Where should a front history live — host (a receipt per hop) or map side (pulse snapshots)?
- Does pg-1's P2 arm wait on `demographicsEnabled` for good (OD-FC-18), leaving only M4 columns?
- Is the Table Ledger's `plague` key meant to be the one plague (§10.1 item 23)?
- Should the DM's moderate plague band (0.6) be able to displace refugees, given that aging runs first (item 27)?

### 10.3 Corrections to the two readings this note was built from

- Drama class `plague` ranks **third** (after war and succession or coup), not second [`decisionTier.js:177`].
- Belief axes and believed conditions are lit in **three** presets (DC, LR, FS), not two.
- A birth at pressure ≥ 0.78 is a proposal in **every** autonomy mode, not only `dm_only` / `recommendations`
  [`stressors.js:502,515`].
- Calamity's `disastersEnabled` is absent from LR (confirmed), and LR does light urban fabric.
- The plague condition's legacy population hit is a bare decline, not deaths, and when demographics is lit the lane
  writes only conserved emigration [`populationDynamics.js:398-449`].
- A plague-adjacent town gets ×1.6 on mass-migration births (`stressorGates.js:795`) — absent from reading 1, partial in
  reading 2.
- New canons light seasonal roads, sea lanes and teleport edges, so the front's latency is season-, sea- and
  teleport-aware on every world mapped or re-canonized since SEASONS-B; older saved canons keep a seasonless v1 digest
  [`campaignSpatialCanonize.js:105-131`].

---

## 11. Sources

### 11.1 Read whole by this seat (line counts at `81f1cd96`)

- `src/domain/spatial/pestilence.js` (571)
- `src/domain/worldPulse/pestilenceKernel.js` (305)
- `src/domain/display/settlementPestilence.js` (250)
- `docs/DESIGN_FP_ARCH_PG.md` (431)

### 11.2 Read whole by a reader seat, in part by this seat

- `src/domain/spatial/calamity.js` (468; I re-read 45-104, 140-155)
- `src/domain/worldPulse/calamityKernel.js` (873; I re-read 390-410 and the type and gate lines)
- `src/domain/display/calamityLedger.js` (77; not re-read)

### 11.3 Read in part by this seat

`stressorsCore.js` (558): 20-60, 110-130, 405-500. `stressors.js` (821): 20-60, 460-560, 630-821. `stressorGates.js` (1054):
590-610, 775-812. `stressorDynamics.js` (998): 151-156, 225-262, 440-495. `pressureModel.js` (366): 10-60, 140-235.
`candidateEvents.js` (883): 236-305, 342-362, 470-612. `flows.js` (178): 1-110, 160-178. `realmEvents.js` (454): 1-215,
395-454. `populationDynamics.js`: 85-160, 285-325, 386-470. `religiousContest.js`: 178-210. `pulseKernel.js` (3007):
505-520, 560-595, 1960-1985, 2465-2560. `applyWorldPulse.js`: 1030-1060. `causalState.js`: 310-362. `foodStockpile.js`:
195-250. `capacityModel.js` (1147): 316-330, 398-410, 728-740. `activeConditions.js`: 50-75, 254-258. `mutateWorld.js`
(1233): 528-590. `crisisLifecycle.js` (662): 86-112, 560-662. `factionRelationshipUpdate.js`: 1-30, 45-62.
`timeProgression.js`: 375-395. `distanceRead.js` (1192): 640-760. `rumorNetwork.js` (790): 100-140, 286-330, 400-415.
`dispatchEV.js`: 30-50, 150-200. `generosityEV.js`: 305-330. `urbanFabricKernel.js`: 300-332, 640-685. `healingLedger.js`
(113): 25-40. `campaignSpatialCanonize.js`: 112-132, 170-190. `spatialDigest.js`: 585-600. `instantWorldBody.js`: 1-20.
`LivingWorldGates.jsx` (381): 1-180. `simulationRules.js` (1593): exports, 963-985, 1400-1420, plus a node evaluation of
every preset. `stressTypes.js`: 84-93. `conditionPromotion.js`: 25-35. `safetyProfile.js`: 134-146.
`settlementThreat.js`: 1-40. `heraldRouting.js`: 280-294, 400-406. `decisionTier.js`: 170-180. `chronicleGraph.js`:
55-70. `decreeTracker.js`: 150-165. `livedExperienceCatalog.js`: 440-475. `habitForkRegistry.js`: 514-526.
`subsystemRowsPeople.js`: 40-60, 180-192, 320-330. `src/data/constants.js`: 3. `pdf/lib/liveWorld.js`: 190-203.
`spatialUsage.js` (grep). `PlacementsLayer.jsx`: 170-215. Greps: every `disease_outbreak` reader in `src`; plague words
in `src/components`.

Documents: `docs/DESIGN_FP_COHERENCE_FOLD.md` (708): grep of the whole file; rows 3.1.9, 3.1.20, 3.1.21, 3.3.2; §2 table
318-352; OD-FC-28 (521), OD-FC-38 (531). `docs/DESIGN_FP_POPULATIONS.md` (1406): 739-800. `docs/PHASE55_SPATIAL_ENGINE_DESIGN.md`
(1710): 310-316, 1605-1712. `docs/DESIGN_FP_ARCH_EC.md` (2996): 280-286, 2240-2246, 2348-2356. Map module:
`docs/PROGRESS.md` (1056 when read; 1065 at the retrovalidation): 434-441 (J375-J382); `research/sf/fp-simulator.md` (1098): 1-40, 237-258, 430-436;
`research/sf/fp-physical-integration.md` (481 when read; 493 after the 2026-10-17 amendments): 1-30, 278-290; `research/sf/faith-system.md` (1516): headings, 895-905,
1232-1281; `docs/HANDOFF.md` (grep).

**Added by the fix pass (§12), read in part at `81f1cd96`:** `roads/knownWorld.js` (97, whole); `campaignSpatialCanonize.js`
105-135; `settlementPestilence.js` 57-80, 140-160 (re-read); `pulseKernel.js` 500-560, 585-596, 1955-1985, 2708-2720;
`flows.js` 38-110, 165-178 (re-read); `candidateEvents.js` 243-300, 312-362, 595-610; `simulationRules.js` 690-705,
738-754, 963-1005, 1570-1590, plus a node evaluation of the roads, traditions, NPC, proposal and route-lifecycle flags in
all seven presets; `stressors.js` 48-60, 140-170, 300-420, 464-478, 725-800; `stressorDynamics.js` 230-250, 436-454;
`stressorGates.js` 245-268, 785-805, 1036-1046; `stressorsCore.js` 225-264, 290-315, 474-490;
`factionRelationshipUpdate.js` 40-76; `timeProgression.js` 118-130, 340-400; `advanceInterval.js` 90-106 and grep;
`affordanceManifest.js` 86-122, 636-655, 715-765; `EventComposer.jsx` 255-268; `ComposerNavigator.jsx` (grep);
`eventCatalogue.js` 276-292 and grep; `crisisLifecycle.js` 92-122, 235-330 (grep), 560-600; `mutateWorld.js` 631-700;
`stressorPicker.js` 25-70; `conditionPromotion.js` 20-40; `tableLedger.js` (339) 118-165, 255-270; `pendingEditIntents.js`
100-120; `registryRerunKeys.js` 52-72; `generators/economy/prosperity.js` 150-166; `generators/power/stressFactions.js`
140-158; `data/stressInstitutionEffects.js` 258-278 and its importer; `display/defenseDisplay.js` 28-36;
`townMap/townMapModel.js` (632) 551-590; `mapProfile.js` 234-300; `townScene/sceneLivingPresentation.js` (175) 15-35,
148-175; `townScene/sceneLiving.js` (357) 215-295; `townMap/fabricRead.js` 78-84; `townMap/townLayoutV2.js` 797-803;
`townMap/audienceProjection.js` 92-100; `sceneExportMesh.js` (grep); `threatProfile.js` (695) 50-62, 234-244, 445-490;
`contradictions.js` 298-306; `lib/regionalMapOverlay.js` (113) 1-100; `SettlementPalette.jsx` (445) 315-332, 420-430;
`stressTypes.js` 84-94; `roadsKernel.js` (1245) 500-510, 926-936, 1008-1025; `beliefMap.js` 200-212;
`routeNetworkCharterDanger.js` (382, grep); `rumorNetwork.js` 395; `applyWorldPulse.js` 279, 730-770;
`store/settlementLifecycleHelpers.js` 90-112; `region/propagation.js` (1179) 540-603, 899-965 and grep;
`region/deriveRegionalState.js` (594) 445-552; `traditionsKernel.js` 190-260; `npcAgency.js` 360-373;
`districtProfile.js` 450-479; `realmEvents.js` 14-47 (grep), 428; `pestilenceKernel.js` 80-92, 226-262 (re-read);
`pestilence.js` 100-120, 530-565 (re-read); `distanceRead.js:87`; `store/settlementSlice.js` 1270-1294 (the ripple call
on every applied DM event).

### 11.4 From the reader seats only (not re-read by me)

`demographicsRisk.js` 1-232 (I re-read the constants); `demographicsRates.js` 275-300, 830-880; `demographicsHerald.js`
84-86, 330-337; `stressorAftermath.js` 1-60; `newsVoice.js` 210-300, 555-660; `defenseStateProse.js` 190-220, 1540-1556,
1805-1812; `safetyProfile.js` beyond 146; `threatProfile.js` 128-140; `beliefAxisSubjects.js:123`; `DESIGN_FP_ARCH_POP.md`
(617) grep and 125-135, 380-405, 598-612; `DESIGN_FP_ARCH_WC.md` 2200-2212; `DESIGN_FP_ARCH_WY.md` 490-500;
`DESIGN_FP_FAITH.md` 818-830; `DESIGN_REALM_DIRECTIVES.md` grep (zero hits).

### 11.5 Not read by any seat

`lanePGC-PG-CHARTER.md` and `lanePGC-census.md` (PG's ledger sources, outside `docs/`); the ODQ §136 and §131 texts;
`RECEIPT_POOLS_POPULATIONS.md`; `docs/design-notes/political-autonomy-boundary.md`; every test file
(`subsystemRowsVirtual`, the M11a pins, `couplingRegistry.test.js`); `src/domain/spatial/migration.js` and
`migrationKernel.js` (PG cites `migration.js:558`); `magicBufferApply.js`; the causal scan's per-system scale constants;
`settlementRumors.js` beyond its header; `DESIGN_FP_ARCHITECTURE.md`'s compiled rows on pestilence; the rest of
`pulseKernel.js`, `candidateEvents.js` and `capacityModel.js`. Not read in the fix pass: `parkArrivals` internals (the
hop-week delay of regional impacts is taken from its call site and comment); `factionResponses.js`'s PLAGUE cases beyond
their line numbers; `changeAuthorityPolicy.js` beyond :146 and :344; `demographicsRates.js` beyond the grep; the causal
scan's healing scale (so the plague-condition loop's gain is unmeasured); whether a re-minted organic `plague` condition
replaces or extends the live one; `DESIGN_FP_ARCH_PG.md`
was not re-read in this pass; `research/sf/faith-system.md` §7.6 and §9.6 were not re-read, so the faith-lens
cross-claims in §3.11 and §9 items 7–11 stand as first written.

---

## 12. Verification record

A verifier checked this note against the host at `81f1cd96` and raised eleven problems and fourteen omissions. I
re-checked each one at the source (files and lines in §11.3, "Added by the fix pass"). P = problem, M = omission.
"Holds" means the verifier was right.

| # | Verifier said | What I found at the source | What changed in this note |
|---|---|---|---|
| P1 | §2.3 "on every canonized world latency is season-aware" is wrong: only a new canon lights the seasonal overlay | Holds. `campaignSpatialCanonize.js:118-121`: older saved canons keep a v1 digest with no overlay and null sea-lane and teleport slots. A receipted re-canonize rebuilds the whole digest (`:105-110`) and so lights them | §2.3 rewritten (canons frozen or re-canonized since SEASONS-B; older ones seasonless); §8.1 item 1, §9 item 6 and §10.3 qualified to match |
| P2 | §8.3 phase word "burning" is wrong; the active trend is "active" | Holds. `settlementPestilence.js:72-76` returns "approaching", "active" and "receding"; "burns" is only in the presence sentence (`:150`) | §8.3 gives the host's words and marks "burning" as the map module's own wording |
| P3 | §7 realm arcs "SC excluded" is wrong: the call is ungated | Holds. `pulseKernel.js:1971-1979` calls `synthesizeRealmEvents` with no rules check. SC has no organic births, but DM twins or front materializations on a mapped SC realm can fill three towns | §7 row now reads "SC LIT when DM-fed"; §4 Named arcs says the same |
| P4 | The refugee-flow proposal at ≥ 8% applies only when `majorChangesRequireProposal` is on | Holds. `flows.js:92,173-177`; gate `candidateEvents.js:600-605`. Node evaluation: the flag is true in RR and LR and false in DC and FS (OPEN, `simulationRules.js:698-703`), so flows propose in RR and LR and are automatic in DC and FS | §5.1 row 6, §3.16 and §7 corrected, with the presets named |
| P5 | A default 0.6 DM plague does not exactly meet the ≥ 0.6 refugee bar, because aging comes first. Fix: "about 0.65 or more, higher still on weak counterforce" | The conclusion holds: aging runs before candidates (`pulseKernel.js:509-511`), and nothing in the aging step skips age 0. **The fix's direction is wrong**: for `disease_outbreak` the counterforce decay multiplier is 0.7..1.8 (decayBoost 0.8, `stressorDynamics.js:452`), so *strong* healing speeds decay. The bar is about 0.64 at best, 0.67 under weak healing, 0.7 at neutral and up to 0.78 under strong healing. Also, in the best-healed towns a 0.6 record drops to 0.42 and misses the > 0.42 spread bar | §3.15 rewritten with the composer bands (0.35/0.6/0.85) and the thresholds; §5.1 row 6, §7, §10.1 item 27 and an open question added |
| P6 | Faction values are per month, not per tick, and the criminal row is missing | Holds, and more. Weekly ticks (`advanceInterval.js:511`) scale by 0.25 and round (`timeProgression.js:123-128,386-395`), giving about +2/+2, −1, −1/+1. The template also has criminal +4 power / −2 legitimacy (which rounds to 0 a week), arcane +3 trust and military −4 manpower (`factionRelationshipUpdate.js:62-71`) | §3.8 Factions row rewritten with all seven rows and per-tick values; §1, §2.1, §3.16 and §7 relabelled |
| P7 | The DM's Plague button is not live; PLAGUE is non-authorable | Holds. `affordanceManifest.js:109-119,645-649`; the composer's verb list is `authorableVerbs()`, which drops folded verbs (`:721-724`). `EventComposer.jsx:262` only skips the predicate for folded verbs; the list filter is in the manifest. The decree catalogue refuses it (`eventCatalogue.js:284`). The handler survives for replays | §1, §2.1, §3.8, §3.13, §3.15 and §7 now name Apply-stressor `plague_onset`; healer impairment is marked replay-only; §10.1 items 14 and 24 |
| P8 | "One plague truth" is broken by the Table Ledger's `plague` obligation | Holds. `tableLedger.js:131-133,155-160,265`, and `pulseTypeForStressorKey('plague')` is null (`stressorPicker.js:58-62`; the catalog has no `plague` key, checked with node). The twin is typed `plague`, with a generic entry (`stressorsCore.js:301-309`): no spread, threshold 0.65, legitimacy-only residual, no counterforce profile. The front ignores it (`pestilenceKernel.js:84-87`), it is labelled "Realm-wide plague" (`realmEvents.js:428`) and never forms The Wasting, but it displaces refugees (`flows.js:43`). Condition promotion still mints the ordinary `plague` condition | §1 states the exception; §3.15 bullet; §7 row; §8.6 item 7; §10.1 item 23; §10.2 question |
| P9 | "No writer from plague to prosperity" is wrong for DM plague | Holds. `registryRerunKeys.js:68`; `prosperity.js:160`; `stressFactions.js:146-155`. That the authored stress is in the rerun's stress list is INFERRED [Fable-reviewed 2026-10-18: no rerun runs on Apply-stressor — `registryRerunKeys.js` is a freshness classifier (`:19-30`); the drop lands at the next Regenerate Draft or Edit-Mode re-derivation, where `resolveStress.js:126-177` overlays the authored stress; §3.12 as corrected] | §3.12 rewritten (pulse lanes never; DM Apply-stressor does, through the rerun); §3.10 adds the Quarantine Council; §1 |
| P10 | Maps do show plague: the town map's condition badge and scene marker; the world map's causality layer; the sidebar's stress label | Holds, and more: the town map also pins a `plague` hazard when the threat profile rates it ≥ 0.4 (`mapProfile.js:241-262`). The sidebar shows the first settlement-level stress label ("Disease Outbreak" for `plague_onset`, `stressTypes.js:85`). The world-map impacts are generic, not plague-specific | §8.1 items 5–6 rewritten; §1 realm paragraph; §5.5; §8.5 legend traps |
| P11 | Route danger does have a plague term: believed plague news deflects named-NPC travel | Holds. `roads/knownWorld.js:38-41,59-96` (the file is 97 lines); `roadsKernel.js:505-507,932,1011-1021`; `beliefMap.js:204-209`; roadsEnabled is in ONE_REGEN (`simulationRules.js:742-752`). The only embattlement writer is `pulseKernel.js:2394` (war), so true plague is absent there. The charter arm (`routeNetworkCharterDanger.js:155-166`) is dark | New §5.1 row 16; §1, §5.5, §6, §7, §8.1 and §9 items 2–3 corrected; the caravan seam stays DESIGNED ONLY |
| M1 | Regional-impact propagation is missing (a second travel-timed carrier of consequences) | Holds, with three corrections. Pulse outcomes are typed `WORLD_PULSE`, so they raise no `health_shock`; only causal shifts of ≥ 8 points and population changes of ≥ max(10, 1%) route (`deriveRegionalState.js:453-492`). No rule routes a healing_capacity shift (grep of `propagation.js`). Apply-stressor has no event-kind case. DM edits ripple at depth 2 from `settlementSlice.js:1292`. `parkArrivals` internals were not read | New §5.1 row 15; §1 bullet; §6; §7 row; §8.2; §9 item 6 paragraph |
| M2 | The roads believed-danger lane is missing | Holds (see P11) | §5.1 row 16 and its cross-references |
| M3 | The town map and town scene show the plague condition | Holds; the hazard pin is added (P10). The audience projection is at `audienceProjection.js:92-100`. The scar render paths are at `fabricRead.js:78-84` and `townLayoutV2.js:797-803` | §8.1 items 5–6; §3.8 Town map row; §8.5 |
| M4 | threatProfile derives a `plague` threat that "feeds the defence-profile threats" and the TownScene hazard rows | Partly holds. The type is real (`threatProfile.js:55-60,240,486`) and feeds `contradictions.js:302`, `mapProfile.js:242` and `capacityModel.js:942`. But threatProfile *reads* `defenseProfile.threats` (`:416`) rather than feeding it. The scene's hazard rows come from the town-map overlay (`sceneLiving.js:282-295`); `:231-234` reads `defenseProfile.threats` only for metadata. The stress-name lane reads settlement-level stresses (`canonStressors`, `:448`), so roaming stressors do not reach it | §3.8 Traditions, NPCs, threat row; §2.1; §6; §7 row |
| M5 | Disease pressure births `magic_deadzone` (0.6) and `magical_instability` (0.72) | Holds. `stressorsCore.js:227-262`; `stressors.js:467-475`; `stressorGates.js:1042-1043` | §3.3 bullet; §7 row; §6 |
| M6 | The Table Ledger `plague` path | Holds (same as P8); bands 0.25/0.5/0.8 (`tableLedger.js:123`; `pendingEditIntents.js:105-118`) | §3.15 bullet; §3.16 DM bands row |
| M7 | The Apply-stressor regeneration rerun: prosperity, Quarantine Council, institution-effect hooks, defence posture | Partly holds [Fable-reviewed 2026-10-18: and only at the next regeneration from config — no rerun runs at apply; §3.12 as corrected]. Prosperity, faction and posture hold (`defenseDisplay.js:33` is a display label keyed on the stress). But `stressInstitutionEffects.js:260-276` holds NPC secrets read by `npcGenerator.js:32`, and the Apply-stressor rerun list has no `npcs` (`registryRerunKeys.js:68`), so those are generation-only | §3.10 and §3.12 |
| M8 | Traditions cancel, NPC crisis class and district prose are missing | Holds. `traditionsKernel.js:197,249-252` (the roaming types are not in its cancel set, `:205`); `npcAgency.js:362-371`; `districtProfile.js:452,478`. traditionsEnabled is lit in RR, DC, LR and FS; npcAgency in all but SC (node) | §1; §3.8 row; §6; §7 rows |
| M9 | The note never states its time scale; "a front can outlive its seed only through the 26-tick floor" | The figures hold (`stressors.js:145-164,364-379,400-409`). I restated the front clause: a node stays active only while its own stressor lives (`pestilence.js:533-547`), so the floor binds only where the stressor outlives 26 ticks (SC, a pinned record). Hops run 1–52 weeks (`distanceRead.js:87`). Mean life of a 0.6 record at neutral counterforce is about 3.5 ticks (my arithmetic) | §2.3 "Time scale" paragraph; §3.16 stressor-life row |
| M10 | A self-sustaining plague-condition loop with no cap (famine's is capped) | Holds as INFERRED. `pressureModel.js:209-214`; `candidateEvents.js:243-300` has no existing-condition check; the famine ceiling is at `:316-361`. The loop's gain is unmeasured, because the causal scan's healing scale was not read | §3.8 paragraph; §8.6 item 8; §10.1 item 25 |
| M11 | A front materialization overwrites a same-id echo, losing the memory with no re-ignition boost | Holds (`pestilenceKernel.js:248-256`: `isLivePlague` is false for an echo). [INFERRED] Rare on mapped worlds: an echo lasts about 20 ticks at most (decay 0.89, floor 0.1; `stressors.js:304-305`), and a cleared town is refractory for 40 | §3.14; §10.1 item 26 |
| M12 | Mass-migration gate: ×0.7 with no crisis next door, ×0.5 under occupation; neighbours are any edge or channel | Holds. `stressorGates.js:248-265,787-802` | §5.1 row 7; §3.16 row |
| M13 | Legacy PLAGUE handlers still live for replayed events | Holds. `factionResponses.js:282,403,535` (line numbers only), `deriveRegionalState.js:542-548`, `crisisLifecycle.js:572-650`, `PendingIntentions.jsx:35` | §3.15 legacy bullet; §7 row |
| M14 | Read scope (not a mechanism) | Recorded. The fix pass's reads are listed in §11.3; what stayed unread is added to §11.5 (`parkArrivals` internals; `factionResponses` bodies; the causal healing scale; the condition re-mint semantics; PG and faith-system §7.6/§9.6 not re-read, so the faith cross-claims stand as first written) | §11.3 addendum; §11.5 |
