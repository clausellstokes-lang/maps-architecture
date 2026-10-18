# SettlementForge's population flows — growth, tier, migration, columns and settlers, and what a map lens can show

> Fable-reviewed 2026-10-18: PASS-WITH-CORRECTIONS — the conclusions hold; 18 verifier and 6 validator findings fixed by 45 fragments (lane retrovalidation/population; J392)

Synthesis seat `research/sf-population`. Host: `/home/user/clausellstokes-lang/settlement-engine` at `origin/master`
`81f1cd96` (HEAD verified `81f1cd963553`, clean), read-only — nothing was written there. Two reading seats returned
structured readings (one led with the design volumes and the legacy movers, one with the whole Wave P code); this note
merges them, settles their disagreements by re-reading the code myself (listed in §11.3), and adds findings of my own
re-reads (marked "re-checked" or "new"). Everything is in my own words; no code is copied; constants are quoted as
values. The owner's question this answers is J380's "and flow of populations?" with its rider "tell me how that changes
your view if at all" (`docs/PROGRESS.md:439`).

Tags: [STATED] = a document or a code comment says it; [OBSERVED] = a reading seat or I read it in code;
[INFERRED] = reasoning, with the reason given. Arithmetic I derived from an observed formula is [INFERRED] and shows its
inputs; none of it was executed.

Path abbreviations: `wp/` = `src/domain/worldPulse/`, `sp/` = `src/domain/spatial/`, `map/` = `src/components/map/`,
`LWG` = `src/components/settlements/LivingWorldGates.jsx`, `SRD` = `src/components/map/SimulationRulesDialog.jsx`,
`rules` = `wp/simulationRules.js`. Documents: DEMO = `docs/DESIGN_DEMOGRAPHIC_ENGINE.md`, POPV =
`docs/DESIGN_FP_POPULATIONS.md`, ARCH_POP = `docs/DESIGN_FP_ARCH_POP.md`, FOLD = `docs/DESIGN_FP_COHERENCE_FOLD.md`,
PHASE55 = `docs/PHASE55_SPATIAL_ENGINE_DESIGN.md`, WY = `docs/DESIGN_FP_ARCH_WY.md`, WC = `docs/DESIGN_FP_ARCH_WC.md`,
RD = `docs/DESIGN_REALM_DIRECTIVES.md`. Map-module notes: FPS = `research/sf/fp-simulator.md`, FPI =
`research/sf/fp-physical-integration.md`, FAITH = `research/sf/faith-system.md`.

Preset abbreviations (the seven shipped presets, `rules:864-1221`): QL `quiet_local`, **RR `realistic_regional` (the
default, `rules:6`)**, DC `dramatic_campaign`, SC `static_campaign`, NC `narrative_campaign`, LR `living_realm`, FS
`full_simulation`. The orchestrator only ever ticks one week at a time [STATED `wp/populationDynamics.js:15-18`].
"Canonized" means the DM has run the premium "Map geography" action, which freezes the spatial digest and sets
`worldState.spatialCanonVersion` above zero [OBSERVED `LWG:117-183`].

Mechanism ids P-1 … P-31 are used throughout and listed with their status in §7 (P-27 … P-31 were added by the
verification pass recorded in §12; passages it changed say "verification pass" or cite its re-reads).

---

## 1. Summary

**How a settlement's head count moves in the default world.** In every preset but SC, each settlement's population
drifts every week by a *legacy proportional rate* read from six pressure scores and a handful of crisis conditions; the
rate has **no carrying capacity** and an integer deadband [OBSERVED `wp/populationDynamics.js:292-385`, `:533`]. This is
the model that ran two settlements away to 29.1 and 16.4 trillion people and froze six others at 200–500 in the 300-year soak
[STATED DEMO preamble :6-14; §0 :48, :68-71]. On top of it: tier drift promotes a place near the next floor and **mints** people up to that floor
(P-3); crises shed people to neighbours (P-4, P-5); town-or-larger parents seed small **steadings** that draw settlers
from them (P-10); a ruined thorp dies to a remnant and may later be **resettled** (P-8, P-9); a rare **calamity** kills
2–14% and drives out 4–26% (P-7). **Natural births and deaths — a vital-rates term — do not exist as quantities in shipped play** (the deaths that do exist are event tolls: calamity's 2–14% in RR, DC and FS, M4's origin and road deaths on canonized realms, the sack's dead half in FS) [Fable-reviewed 2026-10-18: was "Births and deaths do not exist as quantities in shipped play"]. The cure — Wave P,
births minus deaths against a food bound and a density bound, push-and-pull columns, plans and a founding land law
(P-18…P-21) — is built and **dark in every preset**: `demographicsEnabled` is declared false in FS and absent elsewhere,
and no Living-World control lights it [OBSERVED `rules:1156-1170`; `LWG:55-73`; STATED FOLD:342].

**How people move between settlements — two worlds, split by one premium switch.**

1. *Uncanonized realms (every world until a premium DM maps geography; every imported map forever).* People move as
   **netted same-tick transfers** along the DM-confirmed regional graph: a crisis shed credits 45% to up to four
   relationship-weighted neighbours and loses the other 55% (or credits nobody, one roll in three) (P-4); a severe
   displacement stressor moves 4–12% of the source down one confirmed channel per tick (P-5); steadings, resettlement
   and the war sack move people the same way. **No distance, no travel time, no road, no deaths in transit.**
2. *Canonized realms.* A crisis shed, a calamity exodus or a dying town's last residents become **refugee columns on the
   frozen digest** (M4, P-6): 5–40% die at the origin, the survivors split over at most four of the eight cheapest
   reachable mapped settlements, a share of 0.03 + 0.35 × route danger × a season factor (spring 0.85, summer 1, autumn
   1.1, winter 1.6) dies on the road, capped at 50%, and the rest land after the pair's normalised travel weeks; the
   pricing already crosses sea lanes and teleport edges wherever the canon carries them [OBSERVED
   `sp/migration.js:72-139`, `:151-153`, `:219-226`, `:362-430`; `wp/migrationKernel.js:217-264`, `:434-515`;
   `sp/distanceRead.js:653-680`]. But the stressor refugee flow (P-5) still teleports beside the columns,
   so one famine can be served both ways, and steadings, resettlement and the sack stay same-tick [OBSERVED
   `wp/candidateEvents.js:599-605`; STATED WY:159-166].
3. *Built but inert.* Wave P's push-and-pull columns would walk the lived route network, which nothing ever writes, so
   even lit they would move nobody [OBSERVED grep: `ensureGenesisRouteNetwork` and `accrueRouteFlows` have no caller;
   STATED FOLD:342].

**How much moves, in RR [INFERRED from the observed formulas, §3.2 and §5].** RR runs at the "conservative" intensity
(×0.65). At that intensity the legacy lane cannot grow any settlement below about a thousand people without an influx or
recovery condition, so organic growth and promotion concentrate in large, stable places. Mass emigration (and therefore
the M4 columns it feeds) needs a weekly loss of at least max(25, 0.72% of the population), which in RR takes two or
three stacked crisis conditions. The commonest mover is the stressor refugee flow (P-5), and because conflict
arbitration admits one flow per source per tick and breaks the severity tie by candidate id, a source's refugees go to
the same destination every tick it rolls (new, §10.2 #3).

**Founding.** The only new places are **steadings** — satellite thorps that orbit a town-or-larger parent, are not
first-class settlements, never join the digest, and at 401 souls wait "charter pending" forever because graduation needs
the dark `lineageClaimEnabled` — and **resettled remnants** [OBSERVED `wp/settlementLifecycleKernel.js:1-62`, `:885-993`;
`wp/lineageMemberBirth.js:343-349`]. No new first-class settlement is ever founded by population pressure in any preset.

**War and plague.** War reaches population through crisis conditions (DC, FS, or any campaign where a premium DM ticks
the "War layer" gate) and, in FS only, through conserved sack, conscription and levy debits [OBSERVED
`wp/populationDynamics.js:99-120`; `rules:1024-1029`; `LWG:55-73`]. Plague never kills through a mortality term of its
own: it lowers the growth rate, triggers flight, and on canonized realms its front travels the trade carriers; the
fold records `disease_pressure` firing zero times in 193 soak years [OBSERVED `wp/populationDynamics.js:300-307`;
`sp/pestilence.js:1-35`; STATED FOLD OD-FC-28]. Plague has its own reading seat (J381).

**The realm picture.** There is no persisted realm population. People sit in four places (settlement counts, steadings,
columns in transit, and the named cast inside the counts); the realm total is **not conserved** in shipped play (the
55% dispersal loss, the promotion mint, unreported road and origin deaths, unmapped origins, dropped steading orbits,
approved spatial sheds that never travel — §4); and it has **no ceiling** on long horizons [OBSERVED; STATED DEMO §0].

**For a map.** Population geometry in the host is thin: no coordinates (the digest carries none), no stored column path,
no kilometres (all times are weeks normalised so the median primary hop is one week), arrival rows that do not name the
origin, dispatch receipts that are thrown away, a 12-row history per settlement, and an 80-record pulse history holding
one record per advance (a multi-week advance keeps only its final week). The host's own migrant overlay is DM-only, sits
behind the map's default-off Travelers toggle, moves one marker per column (it draws no path) and skips any column
touching a port or a teleport node [OBSERVED `map/TravelersLayer.jsx:14-17`, `:93-108`, `:139-151`;
`src/components/MapOverlay.jsx:351`; `src/store/mapSlice.js:112`; STATED FPI §2.1 D2-D3]. The host map already draws
steadings as cosmetic orbit dots around their parent, and already has a DM time scrub (the V-3 timelapse) over the pulse
history — whose grew/declined tint probably never fires, because it reads population deltas as a map while the records
store arrays (§8.1, §10.2 #13) [OBSERVED `map/PlacementsLayer.jsx:320-338`; `src/domain/display/timelineTrack.js:81-86`].

**How this changes the map-side view, in short** (numbered in §9): (1) the territory projection must read the
**tier band**, never raw population, because the shipped population has no ceiling and jumps at promotion; (2) the
canonize door is also the switch that makes people walk — a native map that sets the canon at world birth would light
M4 columns, the pestilence front, traditions influx and the belief axes by default, which is a host behaviour change
the map must not make by accident [Fable-reviewed 2026-10-18: made on purpose since — J386, J387, V13 §8.5 H22: every new campaign on a native world is canonized at birth]; (3) a population or movement lens must draw two different kinds of thing — dated
**arcs** for netted transfers and **moving markers** for columns — and say which is which; (4) steadings are the host's
only "claim points" below a seat, already sit inside the parent's own territory, and are already drawn on the host map
as orbit dots; (5) the religion lens gets one real "faith moves with people" fact (rites adopted from column influx) and
must not draw migrants as carrying faith; (6) the lens mechanism's time scrub can start from the host's own timelapse
track (one frame per advance), but must read the population deltas as the arrays they are, and still needs its own
receipts for the interior weeks of an advance, for anything older than 12 history rows or 80 records, and for the
dropped column tolls; (7) players see none of this movement today; what the host does show every viewer of a settlement's dossier is its head count and a retrospective trend sentence over the same 12-row ring (§8.1, §8.5), while the believed trends of three presets are held by the courts' belief records and read by no surface (§4) [Fable-reviewed 2026-10-18: was "players see none of this today except believed trends in three presets on canonized maps"].

---

## 2. The data model

### 2.1 Per-settlement state [OBSERVED]

| Field | What it holds | Writers | Source |
|---|---|---|---|
| `settlement.population` | one integer head count; includes the named cast | the apply pass (`applyPopulationOutcomeToSettlement`), the M4 release, the lifecycle lane's `shiftPopulation`, calamity, the tier applier (promotion mint); dark: the Wave P kernel and homeostat | `wp/populationDynamics.js:566-610`; `wp/migrationKernel.js:336-366`; `wp/tierOutcomeApply.js:320-335` |
| `settlement.tier`, `config.tier` | label thorp … metropolis | tier drift outcomes (proposal-gated), the DM `SHIFT_TIER` verb, calamity's demotion through `popToTier` | `wp/tierResourceDynamics.js:102-178`; `src/data/constants.js:7-14` |
| `settlement.populationHistory` | a ring of 12 rows `{tick, delta, population, reason, outcomeId}` | every population writer appends one row | `wp/populationDynamics.js:599-607` |
| `config.peakTier` | monotone highest tier reached (relic ruins need ≥ city) | lifecycle lane | `wp/settlementLifecycleKernel.js:20-24` |
| `lifecycleStatus` (+ remnant grade), `lifecycleHistory` | a remnant is a status, never a deletion | lifecycle lane | `wp/settlementLifecycleFirstClass.js:173-245` |
| `calamityHistory` | strike stamps (8-year cooldown read from them) | calamity | `sp/calamity.js:45-74` |
| `activeConditions` | crisis archetypes (famine, plague, war, occupation, burden, influx, recovery), `regional_migration_pressure`, `steading_tributary` | many lanes | `wp/populationDynamics.js:93-120` |
| `economicState.foodSecurity` | `dailyProduction`, `dailyNeed`, `importDependency` frozen at generation; `storageMonths` moves weekly | generation; food stockpile | reader 1 (foodLedger one read-point) |
| npc roster | the named cast; floors every Wave P death draw | generation (`generatePopulation`, step 13) | `src/generators/steps/generatePopulation.js:132-162` |

**A history-row detail that matters for any lens (new, re-checked).** The shared writer stamps each row's `reason`
with the *outcome's headline*, not the per-delta reason string the producer attached
[OBSERVED `wp/populationDynamics.js:599-607`, called from `wp/applyWorldPulse.js:131-132`]. So a destination credited by
an aspatial dispersal records the producer's headline, not the per-delta reason: for a mass emigration "X's population is falling" with an `outcomeId` of the form `candidate.population.emigration.<origin>.<tick>` [`:487`, `:501`]; for a terminal death "X is dying" with `candidate.lifecycle.death.<origin>.<tick>` [`wp/settlementLifecycleFirstClass.js:213`, `:224`]; for a calamity exodus, whose outcome carries no headline, the bare type `population_emigration` with `calamity.exodus.<origin>.<tick>` [`wp/calamityKernel.js:782-806`, applied at `:829`] — every one of the three ids encodes the origin [Fable-reviewed 2026-10-18: the mass-emigration case alone was stated]; a flow_migration credit records "Refugees from X reach Y"; an M4
landing records the fixed "Refugee column arrives from a shed settlement." with `outcomeId`
`migration.arrival.<destination>.<tick>` — the origin is not named, although the release step has it: the ledger read
returns the origin ids per destination and the kernel keeps only the destination and the count [OBSERVED
`wp/migrationKernel.js:350-358`, `:369`; `sp/migration.js:640-655`]; a destination that no longer exists loses its
arrivals silently [OBSERVED `wp/migrationKernel.js:345`]. The
per-delta sentences ("Displaced population disperses through regional links.") never reach the ring (consequence in
§10.2 #1).

**Not stored per settlement:** births, deaths, a carrying capacity, inflow or outflow totals, or where people went.
The dark Wave P layer derives the bound (`min(K_food, D_tier)`), which wall binds (granary or walls) and a pressure
reading per read, and drops its receipts at the pulse mount [OBSERVED reader 1: `wp/demographicsKernel.js:233-368`;
STATED `wp/demographicsObservation.js` header 17-22].

Starting head count: `resolveConfig` rolls it uniformly inside the tier band, or takes a custom population and derives
the tier; a map burg becomes a config at its own population (default 500); `generatePopulation` makes only the named
cast and never the count [OBSERVED reader 1: `src/generators/steps/resolveConfig.js:92-100`; `src/store/mapSlice.js:872-890`;
`generatePopulation.js:9-16`]. Tier bands: thorp 8–60, hamlet 61–400, village 401–900, town 901–5,000, city
5,001–25,000, metropolis 25,001–100,000 [OBSERVED `src/data/constants.js:7-14`].

### 2.2 World-level state [OBSERVED]

| Key | Shape | Writer(s) | Notes |
|---|---|---|---|
| `spatialLedgers.migration` | columns keyed `origin:dest:departTick` (plus `:class` when classed), each `{originId, destId, arrivals, departTick, arrivalTick, travelClass?}` | M4 (`wp/migrationKernel.js`, classless); dark P2 (`wp/demographicsMigration.js`, `refugee`/`voluntary`); WC military classes reserved, no producer | survivors only; **no path, no departures, no deaths**; drop-when-empty [`sp/migration.js:474-560`, `:572-606`] |
| `spatialLedgers.satellites` | per parent: steadings `{id, name, parentId, tier, population, foundedTick, provenance, site?{cell, landform, cost, source}, resources?, orbit, inflow, backing01, starvingSince?, charterPending?, history≤8}` plus the seeding accumulator | the lifecycle kernel (ledger leaf `satellitesLedger.js`) | steadings' people are **outside** `settlement.population` [`wp/settlementLifecycleKernel.js:412-465`] |
| `spatialLedgers.refugePostures` | `host:origin → {weight01}` | the generosity mover | read by M4 only [`wp/generosityKernel.js:959-975` (reader 0)] |
| `spatialLedgers.traditions` | rite adoption tallies incl. in-transit column counts | the traditions kernel | [`wp/traditionsKernel.js:660-681`] |
| `spatialLedgers.epidemic` | the pestilence front | the pestilence kernel | canonized realms only [`sp/pestilence.js:151-155`] |
| `spatialLedgers.demographicPlans` | one plan per settlement, works, cooldowns | dark Wave P3 | [`wp/demographicsPlans.js:30-47` (reader 1)] |
| `settlementTickStates` | tier-drift streaks; terminal-decline and zero-population dwell stamps | tier drift; lifecycle | tick stamps, catch-up-safe [`wp/settlementLifecycleKernel.js:61-64`] |
| `stressors`, `regionalGraph` | displacement stressors; channels (`migration_pressure`, `trade_route`, `political_authority`, `military_protection`) and relationship-labelled edges | stressor and region lanes | the netted movers' only "geography" |
| `spatialCanonVersion`, `spatialDigest` | the canon marker and the frozen digest | the canonize store action | turns netted shedding into columns [`sp/migration.js:175-179`] |
| `proposals` (≤ 80), `pulseHistory` (≤ 80) | pending major population changes; recent pulse records — **one per advance** (a multi-week advance keeps only its final week's record; interior weeks live in the chronicle), each keeping ≤ 24 public selected outcomes and, when any state-only outcome is present, ≤ 8 mechanical outcomes and ≤ 24 `consequenceOutcomes` (the selected set, compacted; `wp/pulseOutcomePartition.js:121-123`), every kept outcome with its `populationDeltas` array of `{saveId, delta, reason}` rows | the apply pass; the interval collapse | `wp/worldState.js:16-17`; `wp/advanceInterval.js:117-145`; `wp/pulseKernel.js:1908`; `wp/pulseOutcomePartition.js:109-123`; `wp/pulseHelpers.js:30`, `:112-144` (verification pass) |

**Designed, not built:** `spatialLedgers.departureMemory` (POP-3) and `spatialLedgers.emigres` (INT-3b, OD-FC-25); a
`believedBand` carried on each column (OD-FC-44) [STATED POPV §3-§9; FOLD:518, :537].

### 2.3 Receipts (transient) [OBSERVED]

- M4 dispatch receipts `{originId, originDeaths, roadDeaths, arrivals, departures}` are returned to the pulse and
  **unused** — nobody reads them, and M4 deaths produce no news [OBSERVED `wp/pulseKernel.js:2410-2429`; STATED ARCH_POP
  S11]. Calamity exodus receipts are kind `exodus` [OBSERVED `wp/calamityKernel.js:720-745`].
- Dark Wave P: `demographic_step` (bound, binding wall, pressure, bands, named floor), `demographic_migration`
  (placements, unplaced, refusal word `none | partial | unreachable | no_capacity | unattractive`),
  `demographic_arrival` [OBSERVED reader 1: `wp/demographicsKernel.js:233-368`; `wp/demographicsMigration.js:378-658`].
- Steading receipts (founded, promoted, charter pending, starved, converged, orbit dispersed) and news
  [OBSERVED `wp/settlementLifecycleKernel.js:786-1095`].

---

## 3. The per-settlement picture

### 3.1 The legacy pressure lane (P-2) — the shipped growth and decline [OBSERVED `wp/populationDynamics.js:292-385`]

- **Stability** = 1 − (0.26 food + 0.20 disease + 0.22 conflict + 0.14 trade + 0.12 legitimacy + 0.06 crime), over the
  pressure scores.
- **Monthly rate** = 0.0018 + (stability − 0.5) × 0.012, then condition terms: influx (`regional_migration_pressure`)
  +0.012; food crisis (famine, food anchor lost, import shortage) −0.013; plague −0.020; war or occupation
  (`war_pressure`, `vassal_extraction`, `war_drain`, `occupation_resistance`, `occupation_burden`) −0.016; burden
  (alliance burden, protection gap, relief burden) −0.006; recovery (siege lifted, occupation lifted, residual) +0.002
  [`:93-120`, `:292-311`]. The whole is multiplied by intensity: conservative 0.65, normal 1, dramatic 1.45
  [`rules:1588-1593`]. RR, QL, NC and LR are conservative; DC dramatic; FS normal [`rules:65`, `:694`, `:905`, `:1012`].
- **Magnitude**: a week counts as 3/13 of a month, raised to the power 0.85 with a floor of 0.25, so a weekly tick
  weighs ≈ 0.288 months [`:19-30`, `:138-141`]. [INFERRED] Fifty-two weekly ticks therefore weigh ≈ 15 months a year, not
  12.
- **Delta** = population × rate × magnitude, rounded, capped at ±population × (0.055, or 0.18 when severe) × intensity;
  severe means |rate| ≥ 0.025 or a crisis-flight archetype (famine, plague, `war_pressure`, `vassal_extraction`,
  `occupation_resistance`, `regional_migration_pressure`) [`:120`, `:322-331`].
- **Deadband**: any |delta| below max(2, 0.1% of the population, rounded) is dropped [`:383-384`].
- **Output**: a `population_growth`, `population_decline` or `population_emigration` candidate; a change of at least
  max(80, 4% of the population) is **major** and becomes a DM proposal when `majorChangesRequireProposal` is set (RR,
  QL, NC, LR; off in DC and FS through the OPEN spread); minor drift is state-only, not a chronicle beat [`:484-499`;
  `rules:77`, `:698-703`].

**What the deadband does in RR [INFERRED from the formula above; not executed].** Below 2,500 people the bar is 2
(the rounded 0.1% is smaller), and a rounded delta reaches 2 only when the expectation is at least 1.5, i.e. population
≥ 1.5 ÷ (rate × 0.288). With no condition, RR's best rate (stability 1) is 0.65 × 0.0078 ≈ 0.0051 a month, so **no
settlement under about 1,030 people grows through this lane in RR**; from about 2,500 people up the 0.1% bar needs a
rate between about 0.0025 and 0.0035 (the bar is a rounded integer, so the needed rate oscillates and settles toward 0.0035 as places grow), i.e. RR stability of roughly 0.67–0.80 [Fable-reviewed 2026-10-18: was "0.0033–0.0035, i.e. stability of about 0.8 or more"; `wp/populationDynamics.js:381-383`]. An influx condition (+0.012) lowers the growth floor to
about 405 people while it lasts; a recovery condition (+0.002) to about 820. The same arithmetic in DC (×1.45) gives
about 460 people and stability 0.55; in FS (×1) about 670 and 0.64. Declining places freeze the same way, at population ≈ 1.5 ÷ (|rate| × 0.288), which the code comment itself
names as half of the soak's bifurcation [STATED `wp/populationDynamics.js:331-338`]. Consequence for a map: in the
default preset most thorps, hamlets and villages hold a fixed head count unless people are transferred in or out or a
promotion mints them, while large stable towns compound.

### 3.2 Mass emigration threshold [OBSERVED `wp/populationDynamics.js:444-449`]

A decline counts as mass emigration when the loss is at least max(25, 2.5% of the population × min(1, magnitude)) —
at the weekly cadence max(25, ≈0.72%) — and the place is severe or carries a crisis-flight archetype. [INFERRED from
§3.1's terms] In RR one famine at stability 0.5 gives a weekly loss of about 0.21% — not enough; famine plus plague plus
war at stability 0.3 gives about 0.93% — enough, for places of roughly 2,700 people and up (the 25-person floor). In
DC, famine plus war suffices. So the physical columns of P-6 are fed by stacked crises, by calamity and by dying towns,
not by ordinary hardship.

What happens next depends on two switches [OBSERVED `:449-481`]:
- migration must be **live**: `migrationFlowsEnabled` set and propagation not `off` or `local`. QL and NC fail this
  (their QUIET spread sets migration off and propagation local), so a crisis there is labelled "emigration" but only
  debits the origin — the people vanish [OBSERVED `rules:692-697`; `:485` kind selection];
- if live and **canonized**, the full loss is handed to M4 (P-6); if live and **not canonized**, 45% is dispersed
  (P-4) and 55% is lost.

### 3.3 Tier drift and the promotion mint (P-3) [OBSERVED `wp/tierResourceDynamics.js:102-178`; `wp/tierOutcomeApply.js:320-335`]

- Promotion: population ≥ 92% of the next tier's floor and support ≥ 0.62, held for a streak of max(2, rank + 1) ticks.
- Demotion: population under 82% of the current floor, or support ≤ 0.25, or below the floor with support < 0.45; streak
  max(2, ⌈(rank + 1) / 2⌉).
- Candidate probability 0.18 + 0.13 × (streak − minimum streak + 1) + 0.24 × severity, clamped to 1 — so at the minimum
  streak it is already 0.31 + 0.24 × severity; proposal-gated under `majorChangesRequireProposal`, and forced to a proposal
  under `dm_only` or `recommendations` autonomy through `authorityFor` [re-checked in the verification pass:
  `wp/tierResourceDynamics.js:194-195`, `:221`, `:237`].
- **The mint:** on promotion the applier raises the population to the new tier's floor — at most 8% of that floor (up to
  about 2,000 people for city → metropolis) — leaving a history breadcrumb; it is skipped only when the outcome carries
  `populationConserved`, which only lit Wave P sets [OBSERVED `wp/tierOutcomeApply.js:324-335`]. Demotion changes no head
  count. Calamity demotes straight through `popToTier`; the DM verb `SHIFT_TIER` rebands sovereignly.
- [INFERRED from §3.1] In RR a hamlet of 300 cannot reach the village window (369) by legacy growth; it gets there only
  by transfers in (P-4, P-5, P-6 landings) or never.

### 3.4 Satellite steadings (P-10) [OBSERVED `wp/settlementLifecycleKernel.js:159-262`, `:297-465`, `:786-1161`]

- **Seeding drive** per tick = 0.05 + 0.30 if a boom is active + 0.35 for a resource strike + 0.15 × prosperity + 0.25 ×
  population ÷ tier maximum + 0.20 if a migration arrival landed in the last 4 ticks. An accumulator relaxes toward the
  drive (×0.86 + 0.14 × drive); founding arms at 0.70, with a 52-tick cooldown, and caps of 2 (town), 4 (city), 6
  (metropolis); villages and smaller never seed. [INFERRED] Without a boom, a strike or an arrival the drive cannot exceed
  0.45 (the population share is clamped to 1 [`:341`]), so founding needs an upswing boom or a discovery strike plus one
  more push — rare by design.
- **Founders**: 16 + a seeded 0–15 drawn from the parent, never below the parent's tier floor.
- **Growth**: while backing (0.6 prosperity + 0.4 × (1 − trade pressure)) ≥ 0.45 and no charter is pending, each tick
  moves population × (0.02 + 0.05 × backing), rounded and at least 1 person, from the parent, capped by the parent's
  headroom above its own floor [re-checked `:205-210`, `:955-967`]. [INFERRED] With backing from 0.45 to 1 that is about
  4.25–7% a week, so a steading reaches 401 in roughly 40–80 weeks if backing holds (39 weeks for 31 founders at full backing, 78 for 16 founders at the 0.45 floor) [Fable-reviewed 2026-10-18: was "40–70 weeks"].
- **Stall band** (verification pass): with backing from 0.30 up to 0.45 a steading neither grows nor starves, and its
  starvation clock is cleared; a charter-pending steading likewise never starves [OBSERVED `:955`, `:994`, `:1029-1032`].
- **Promotion and charter**: thorp → hamlet at 61; at 401 it becomes `charterPending` and stops growing; graduation into a
  first-class member runs only under `lineageClaimEnabled`, dark everywhere, so it waits forever
  [`:885-993`; `wp/lineageMemberBirth.js:343-349`].
- **Starvation**: backing below 0.30 for 13 ticks arms a 0.35-per-tick death draw; the residents return to the parent; no
  ruin is ever left by a steading.
- **Convergence**: orbit-adjacent steadings of one parent, both ≥ 26 ticks old, combined ≥ 61, merge with a 0.25 draw.
- **Tributary**: the parent carries one `steading_tributary` condition, severity ≤ 0.30, on food security and trade.
- **Site**: on a canonized realm the site is a frozen-pack cell sampled inside the parent's own territory partition (gate
  cells first, then the cost field); aspatial realms record no site. `orbit` is a small ring index for cosmetic placement
  [`:54-60`; `wp/steadingTopography.js:1-40` (reader 0)].
- **Parent death** drops its orbit as uncredited origin loss [`:735-770`].
- **No apply mode** (verification pass): the steading lane writes its ledger and shifts population directly through its
  own helper, carrying no apply mode, so neither `majorChangesRequireProposal` nor political autonomy gates founding,
  growth or starvation [OBSERVED grep: no `applyMode` in `wp/settlementLifecycleKernel.js`; helper at `:682`].
- **Conveyance (BUILT DARK)** (verification pass): the sovereignty-transfer writer — reached by the DM verb
  `TRANSFER_SOVEREIGNTY` and by treaty conveyances from peace terms — can move a steading's row to another parent, with
  its orbit re-derived there, without moving a single person, its founding tick or its history. It is gated by
  `sovereigntyTradeActive`, whose own flag `sovereigntyTradeEnabled` is in no preset [OBSERVED
  `wp/satellitesLedger.js:136-161`; `wp/sovereigntyTransfer.js:204-271`, `:361`; `wp/sovereigntyAssets.js:79-86`;
  `wp/realmVerbExecution.js:483`; `rules:429`; STATED FOLD:335].
- **On the host map**: drawn as orbit dots around the parent, with a charter ring (§8.1, P-28).

### 3.5 Terminal death and resettlement (P-8, P-9) [OBSERVED `wp/settlementLifecycleKernel.js:221-259`; `wp/settlementLifecycleFirstClass.js:173-330`, `:356-520`]

- Death: a first-class place demoted to thorp with support ≤ 0.35 (or under the thorp floor) dwells 104 ticks; the
  emit probability is 0.05 + 0.08 × depth; an effectively empty place (≤ 4 souls) dies with certainty after 13 ticks
  unless it recovers to 32. Proposal-routed under `majorChangesRequireProposal`. On a canonized realm the residual is
  shed through M4; otherwise 45% is dispersed in roll mode and the rest lost [`:199-210`]. Relic ruins only where
  `peakTier` ≥ city.
- Resettlement: after 52 fallow ticks, probability 0.015 + 0.05 × load; a seed of 24 (minimum 16) from up to three donors
  of ≥ 500 people, each giving ≤ 1%. Donors are ranked **realm-wide** by prosperity, then population, then id — no
  distance term, though the tuning comment says "neighbours" [re-checked `:380-389`]. A relic ruin is reborn as "New X".

### 3.6 Calamity (P-7) [OBSERVED `sp/calamity.js:45-74`; `wp/calamityKernel.js:720-807`]

Realm-expected once every 15 years whatever the realm's size (per settlement-year hazard 1 ÷ (15 × N)), with an 8-year
per-settlement cooldown. Deaths 0.05 + 0.05 × tier density ± 0.03, clamped 2–14%; exodus 0.10 + 0.06 × density ± 0.04,
clamped 4–26% of survivors. The exodus goes to M4 on canonized realms, to 45% roll-mode dispersal otherwise. The disaster
type is a cosmetic hint keyed by terrain. The DM's `FORCE_CALAMITY` is **refused when the disasters gate is dark**
[re-checked `wp/realmVerbExecution.js:773-774`; reader 1 had it working in any world].

**Exposure is geometry** (verification pass). The draw happens once a year, at each year-boundary crossing, one seeded
roll per settlement (remnants skipped, cooldown honoured), and the realm's fixed strike budget is redistributed by an
exposure weight: a raw multiplier from 0.75 to 1.5 driven by terrain risk at weight 0.6 (riverside 1.0, coastal 0.9,
desert 0.7, mountain 0.6, forest 0.55, hills 0.5, plains 0.35, unknown 0.5) plus 0.15 per prior strike (at most 0.6),
then normalised so the realm's mean factor is 1. A forced strike's severity band scales deaths and exodus by 0.7, 1.0 or
1.3 inside the same 14% and 26% caps [OBSERVED `sp/calamity.js:153-207`, `:385-399`; `wp/calamityKernel.js:615-686`].
[INFERRED] A riverside town with no strike history carries about 1.20 ÷ 0.91 ≈ 1.3 times a plains town's hazard. A lens
could shade relative calamity exposure from terrain and strike stamps without inventing a host fact.

### 3.7 War on a settlement (P-11, P-12) [OBSERVED]

- Conditions: the five war archetypes subtract 0.016 a month; three of them also trigger crisis flight
  [`wp/populationDynamics.js:96-120`]. The war layer mints them only when `warLayerEnabled` is lit; a town occupied at
  generation can carry `vassal_extraction` from birth in any preset [STATED `wp/populationDynamics.js:96-104`].
- FS only: the war sack carries off 8% of a conquered town, never taking it below 150, half as captives to the victor's
  home the same tick and half as war dead (a razed town is not also sacked); a deployed army conscripts 0.6% of its home
  a tick, never below 250; a vassal levy takes 0.4% a tick, never below 300; when the army comes home its survivors are
  credited back to the home and the levying vassals in proportion to what each sent, and the fallen are not [re-checked
  in the verification pass: `wp/warArmyRecord.js:36-55`; `wp/warDeployment.js:480`, `:813-822`;
  `wp/warHomeCosts.js:80-83`, `:281-282`, `:356-360`, `:387`, `:406-408`; `wp/deploymentReturn.js:400-440`]. Flags:
  `warEconomyDrainEnabled` (conscription), `warForageEnabled` (sack), `warLevyEnabled` (levy) — default false
  [`rules:121`, `:149`, `:157`], true only in FS [`rules:1024`, `:1028`, `:1029`]; no LWG or SRD control sets them.
- Razing (P-13): losses 24–72% by severity above a skeleton floor of 40, 12% counted as escapees, one negative delta
  credited to no one; BUILT DARK behind the conquest-doctrine flags [OBSERVED reader 0: `wp/razing.js:254-263`, `:566-606`].

### 3.8 Under Wave P (P-18, dark everywhere) [OBSERVED reader 1: `wp/demographicsRates.js:125-216`, `:548-748`; re-checked tables]

- `K_food` = daily production × mouths per food unit (thorp 0.55, hamlet 0.54, village 0.52, town 0.50, city 0.47,
  metropolis 0.44) + imports (daily need × import dependency × an artery factor 0.25/0.70/1.00/1.15 by live goods
  arteries when routes are lit, else 1) − relief obligations (≤ 10%).
- `D_tier` = density ceiling (thorp 90, hamlet 600, village 1,400, town 7,500, city 38,000, metropolis 140,000) × terrain
  (plains 1.15, riverside 1.20, coastal 1.10, hills 0.90, forest 0.85, mountain 0.60, desert 0.55) × works, floored at 24.
- Births a week = population × birth band (thorp 0.00092 … metropolis 0.00080) × (1 − 0.9 × crowding above 0.75);
  deaths = the anonymous pool × natural floor (thorp 0.00052 … metropolis 0.00070) × max(1, 1 + 2 × strain above 0.70 +
  3 × deficit + 3 × crisis × occupancy). One seeded fork per settlement per tick, two draws, named souls exempt; the
  fixed point sits at 76–83% of the bound [STATED `wp/demographicsRates.js:37-42`].
- Lit, it replaces legacy growth and turns legacy decline into conserved transfers only, conserves promotions, adds the
  viability ladder (viable → failing → evacuating → remnant), and lets the census rather than the label decide the
  bottom rung [OBSERVED `wp/populationDynamics.js:450`; `wp/tierResourceDynamics.js:127-136`].

---

## 4. The realm picture

**No realm aggregate exists in shipped play** [OBSERVED reader 1]. The people of a realm are: Σ `settlement.population`
over the campaign's saves; the steadings in `spatialLedgers.satellites` (outside every save, so a total over saves
undercounts — the satellite lane's own conservation law is Σ(parent + satellites)) [STATED
`wp/settlementLifecycleKernel.js:34-40`]; survivors in transit in `spatialLedgers.migration`; and the named cast, already
inside the counts.

**The realm total is not conserved** [OBSERVED unless marked]:
1. aspatial dispersal (mass emigration, terminal death, calamity exodus) credits 45% and loses 55%; roll mode credits
   nobody one time in three; QL and NC "emigration" credits nobody [`wp/populationDynamics.js:148-153`, `:239-285`,
   `:470`];
2. tier promotion mints up to the new floor [`wp/tierOutcomeApply.js:324-335`];
3. M4 kills at the origin and on the road — conserved inside the dispatch, but the counts are dropped
   [`wp/pulseKernel.js:2410-2429`];
4. an unmapped origin's shed is debited and silently lost, and an isolated mapped origin's whole pool becomes origin
   death [`wp/migrationKernel.js:460`; `sp/migration.js:376-382`];
5. a dead parent's steadings are dropped as origin loss [`wp/settlementLifecycleKernel.js:753-770`];
6. the war sack splits its toll between captives and dead (FS);
7. **new:** an approved (proposal-mode) spatial emigration or terminal death is debited by the approval path, which never
   dispatches columns, so its whole shed is lost (§10.2 #2) — and a DM `FORCE_ABANDON` on a canonized realm, which is
   always minted as a proposal, loses its whole residual the same way (verification pass, §10.2 #2).

**Measured behaviour** [STATED DEMO preamble :6-14; §0 :48, :68-71]: in the 300-year soak (FS, weekly ticks) two settlements compounded at about
×1.07 a year to 29.1 trillion and 16.4 trillion people while six froze at 200–500. Because the cure is lit nowhere, every
preset still ships that model [OBSERVED `rules:1170`]; RR's conservative intensity slows the compounding but does not
bound it [INFERRED from §3.1].

**The dark realm reading** [OBSERVED reader 1: `wp/demographicsObservation.js:103-207`]: `realmPressure01` = Σ population
÷ Σ `K_food`, load ratios, binding counts and a ladder census — computed only when lit, never stored, consumed by the
audit observer, the soak tripwires and the dark war motive.

**Realm visibility today** [OBSERVED]: candidate headlines (population falling or growing, refugees reaching a place,
steadings founded, abandoned, converged or charter pending, a town dying, settlers eyeing a site, calamity news); the
history rows; the 80-record pulse history; for courts (not players) in DC, LR and FS on canonized realms, a believed
population trend per settlement (P-17).

**Fold status** [STATED FOLD:342]: POPULATIONS has nothing lit; Wave P is built and dark entire; POP-1…POP-7 are unbuilt;
"a column was refused at the wall" cannot fire. The lit movers of this note other than P-17 (P-2…P-10, P-14…P-16) predate FP and are not
in the fold's table; P-17's belief axes are pre-FP code (D-1, `wp/beliefAxes.js:1-10`) lit by FP's own LIT-1b fragment `FP_LIT_BELIEF` (`rules:766-773`, `:793-797`), which the fold's §2 SPINE row lists (FOLD:335) [Fable-reviewed 2026-10-18: P-17 was counted among the pre-FP movers].

---

## 5. Movement between settlements

### 5.1 The switch

One premium action decides whether people teleport or walk: the "Map geography" canonize in the Living-World row
[OBSERVED `LWG:117-225`]. It is offered only for a loaded **generated** map (imported or custom-backdrop maps stay
aspatial forever), needs the world map open (the live pack is captured once), refuses when no placement is anchored to a
real cell, and writes `spatialCanonVersion`. The button tells the DM when settlements founded since the canon are
unmapped and offers a re-map [OBSERVED `LWG:131-163`, `:202-215`]. Everything physical below (P-6, the pestilence
front, traditions influx, steading sites, belief axes) keys on that marker. Steadings never join the canon.

### 5.2 Every channel

| # | Channel (id) | Who moves, how many | Where to | Route and travel time | Deaths | Season | Capacity | Gate (flag) and presets |
|---|---|---|---|---|---|---|---|---|
| A | Aspatial dispersal (P-4) | 45% of a mass-emigration shed, a dying town's residual or a calamity exodus; 55% lost | ≤ 4 neighbours over confirmed `migration_pressure`, `trade_route`, `political_authority`, `military_protection` channels and any regional edge; score 0.30 safety + 0.30 food + 0.22 trade + 0.18 legitimacy (one minus each pressure) × relationship weight (allied 1.5, vassal or patron 1.35, trade partner 1.25, rival 0.7, cold war 0.45, hostile 0.15; the worst label wins when below 1); admitted ≥ 0.35; split by score, or all to the top one in "concentrated" | none; same tick | none (the lost 55% is unreceipted) | none | none | migration live; mode roll (RR, LR: void / distributed / concentrated by a hash of id and tick), distributed (DC, FS); not canonized [`wp/populationDynamics.js:148-285`, `:449-481`; `rules:170`, `:702`] |
| B | Stressor refugee flow (P-5) | round(population × min(0.12, 0.04 + (severity − 0.6) × 0.2)) from each source of a displacement stressor (famine, siege, plague, disease outbreak, occupation, wartime, mass migration, monster or raider pressure, insurgency) at effective severity ≥ 0.6 | one unaffected destination per source per tick over confirmed `migration_pressure`, `trade_route` or `political_authority` channels; destination gains `regional_migration_pressure` (+0.012/month growth while it lasts) | none; same tick | none | none | none | migration live; probability min(0.45, 0.1 + 0.3 × severity); proposal at ≥ 8%; RR, DC, LR, FS; **also on canonized realms** [`wp/flows.js:24-117`; `wp/candidateEvents.js:599-605`, `:385-415`] |
| C | M4 crisis columns (P-6) | the full shed of a mass emigration, a dying town or a calamity exodus | the 8 mapped settlements cheapest by seasonal path cost, scored 0.32 closeness + 0.26 culture affinity + 0.24 safety + 0.18 richness × (1 − 0.85 × congestion) + 0.18 refuge posture; top 4; 82% by score, 18% seeded scatter, scatter floor 10% (never "concentrated") | **route**: chosen among the digest's candidate settlement-id paths by embattlement danger and seasonal cost, used only for its danger, not stored; **time**: arrival = tick + the pair's `hopWeeks` (integer weeks, floor 1, cap 52, normalised so the median primary hop is one week); **sea and magic**: cost and weeks escalate to sea-lane or teleport-augmented routes when an endpoint is a port or a circle holder and the canon carries those slots [`sp/distanceRead.js:653-680`] | origin 5–40% by tolerance τ = 0.15 + 0.4 prosperity + 0.25 connectivity + 0.2 granary; road 0.03 + 0.35 × danger × season factor, capped at 0.5 (with the winter factor 1.6 the uncapped share reaches 0.59) [`sp/migration.js:151-153`, `:219-226`]; if the **whole** traveller pool left after origin deaths is under 2, the entire shed becomes origin death, while a per-destination split of 1 still travels and a split whose road deaths take everyone raises no column [`sp/migration.js:388`, `:313-319`, `:586`] | road season from the calendar **whatever `seasonsEnabled` says**: spring 0.85, summer 1, autumn 1.1, winter 1.6; the digest's seasonal cost overlay also prices the pool | congestion = max(population ÷ 9,000, 0.8 × food deficit, 0.7 × size × crime + 0.5 × crime) | canonized; producers need migration live (mass emigration), disasters (calamity) or the lifecycle flag (dying towns); auto-applied outcomes only [`sp/migration.js:72-139`, `:186-226`, `:362-445`; `wp/migrationKernel.js:67-124`, `:217-264`, `:398-515`; `wp/pulseKernel.js:575`, `:877-886`, `:2403-2429`] |
| D | Steading transfers (P-10) | founders 16–31; growth about 4.25–7% of the steading a tick (at least 1 person), only at backing ≥ 0.45; none at backing 0.30–0.45 (stall band); starvation residual back | parent ↔ its own steadings | none; same tick; routing "via parent" | none | none | parent's headroom above its tier floor | lifecycle flag; RR, DC, LR, FS, or per campaign through SRD's Engine waves; no apply mode, so never proposal-gated [`wp/settlementLifecycleKernel.js:786-1036`; `:955`, `:994`] |
| E | Resettlement (P-9) | a seed of 24 (≥ 16), ≤ 1% of each of ≤ 3 donors | donors anywhere in the realm, ranked by prosperity | none; same tick | none | none | — | lifecycle flag (presets or SRD Engine waves); proposal-gated; autonomy-routed [`wp/settlementLifecycleFirstClass.js:269-330`, `:380-422`] |
| F | War sack, conscription, levy, homecoming (P-12) | 8% of a conquered town, never below 150 (half captives, half dead); 0.6% a tick to the army, never below 250; 0.4% a tick from vassals, never below 300; survivors credited back pro rata on homecoming | victor's home; the army; the overlord's army; home and vassals | none for people; armies move on their own transit ledger | the sack's dead half; army attrition | — | — | FS only [`rules:1024`, `:1028`, `:1029`; constants §3.7] |
| G | Wave P2 push-pull columns (P-19) | departure rate 0.02 × push × (1 − 0.6 × reserve coverage), none below push 0.06; minimum column 3 | ≤ 4 settlements reachable over the **lived route network**; pull = 1 ÷ (1 + ticks ÷ 6) × (0.40 food need × food slack + 0.34 room need × room slack + 0.18 min of slacks + 0.22 safety + 0.16 prosperity); voluntary migrants need 0.06 more pull than home | each leg priced at the digest's `hopWeeks` × grade (highway 0.75, road 1, track 1.5), hidden hops refused; arrival = tick + max(1, ⌈Σ legs⌉); path not stored | **zero** by design | the calendar season | spare room = ⌊0.85 × bound⌋ − population − people inbound; landing unconditional: destination, else back home, else lost | BUILT DARK (`demographicsEnabled`) and inert: `routeLifecycleEnabled` dark and no network ever written [reader 1: `wp/demographicsMigration.js:107-147`, `:276-315`, `:378-658`; `wp/demographicsPushPull.js:142-232`, `:441-643`] |
| H | Named persons | — | — | the émigré errand seam prices one exile's leg and has **no caller**; migration is never an errand, by law; named NPCs never die in an engine death | — | — | — | SEAM [reader 1: `wp/emigreErrand.js:13-53`; STATED POPV:95-99] |

### 5.3 What the channels share and do not share [OBSERVED unless marked]

- **Distance**: only C (and the dark G and land law) read the digest's distances or weeks; D reads the digest only to pick a steading's site cell inside the parent's partition on a canonized realm (`wp/settlementLifecycleKernel.js:54-60`, `:434-439`, `:808-822`; `wp/steadingTopography.js:11-38`). A, B, D, E and F read no distance and no travel
  time. Nothing population-related reads kilometres: `kmScale` is live in code and written by no world, so every column
  time is normalised weeks [STATED FPI §2.1 D2-D4].
- **Adjacency**: A and B use the regional graph's channels and relationship labels — topology the DM confirms; the
  `migration_pressure` channel is proposed along trade links between unequal poles and "born suggested, never
  auto-confirmed" [OBSERVED reader 0: `src/domain/region/discoverDependencyCandidates.js:434-467`]. C uses the 8 nearest
  by cost; G the lived network.
- **Routes**: C chooses one and keeps only its danger; the arrival time is the *pair's* `hopWeeks`, not the chosen
  route's [re-checked `wp/migrationKernel.js:220-223`, `:262`].
- **Seasons**: C's road deaths and pool pricing use the calendar season even when the seasonal food year is off
  [re-checked `wp/pulseKernel.js:568-575`].
- **Gates and territory**: no mover reads territory or gates except steading sites (inside the parent's partition) and
  the dark land law.
- **Capacity**: only C (congestion brake on the richness pull) and G (spare room) consider a destination's room.
- **Sea and magic** (verification pass): M4's `pathCost` — and so `hopWeeks` — escalates to the sea-augmented or
  teleport-augmented cheapest route whenever an endpoint is a port or a circle holder and the canon carries those slots.
  Every new canon asks for both slots, which stay empty only when fewer than two ports or circle holders qualify, and
  `navalEnabled` gates the fleets, not this pricing [OBSERVED `sp/distanceRead.js:286-293`, `:409-416`, `:653-680`,
  `:728-733`; `src/store/campaignSpatialCanonize.js:124-137`; grep: no `navalEnabled` read in `sp/distanceRead.js` or
  `wp/migrationKernel.js`]. So refugee columns can already be priced by sea or by circle, in weeks, with no ship, fare or
  fleet — and the host overlay hides exactly those columns [OBSERVED `map/TravelersLayer.jsx:101`]. Refugees by ship as a
  designed passage ("the desperate walk, the funded sail") remain designed only [STATED PHASE55 §4j; FPI §4.4]. Whether
  the route-danger read covers sea hops was not traced.
- **Proposal timing (new):** M4 dispatches only for outcomes debited in the same tick; the approval path applies a
  queued emigration later without dispatching (§10.2 #2).
- **Cascades**: the influx condition a flow leaves at its destination (`regional_migration_pressure`) is itself in the
  crisis-flight set, so a receiving town that is declining anyway counts as severe and can shed onward [OBSERVED
  `wp/populationDynamics.js:120`, `:327`].

### 5.4 Founding of new settlements [OBSERVED]

- LIT: steadings (P-10) in RR, DC, LR and FS, or in any campaign whose DM ticks SRD's Engine-waves "New & lost
  steadings" (verification pass, §7); `FORCE_FOUND_STEADING` through the same mint, needing the lifecycle flag
  [reader 0: `wp/realmVerbExecution.js:840-860`]. Remnant resettlement (P-9).
- BUILT DARK: Wave P3's deliberated satellite plan (a pressed settlement commits to emigration, imports, infrastructure,
  promotion, satellite or send, with bands filling 0.70 / pressed 0.88 / overflowing 1.05, startup costs, durations and
  cooldowns 182 / 52 / 78) handing a founding intent to the same mint, and the **§5b land law**: a new steading must lie
  within 1.25 median primary hops of the nearest settlement and beyond a tier-pair minimum separation (the sum of each
  tier's elbow: thorp 0.10, hamlet 0.14, village 0.18, town 0.24, city 0.32, metropolis 0.42, in median primary hops),
  measured on the frozen cost field with gate-recorded "frontier" or enveloped "hinterland" evidence; user-placed
  settlements are exempt [reader 1: `wp/demographicsPlans.js:126-636`; `wp/demographicsLand.js:8-541`].
- DESIGNED ONLY: a first-class settlement founded by migration pressure; a refugee frontier.
- None of these creates a digest member; a first-class founding needs a re-canonize to be mapped (§5.1).

### 5.5 Designed, not built [STATED]

WY-4's fence (each settlement served netted XOR physical per tick, flow_migration minted as M4 columns) with faith cargo
and cause receipts on columns [WY:159-166, 1215-1250]; the owner's **size-scaled column speed** (ODQ §125.4; OD-FC-13: POP
owns the row, WY-4 reads it; zero code hits) [FOLD §3.2.16, :506]; POP-1's believed road and the "column at the wall"
clearing (verdicts admitted, refused, dispersed, interned) with the return class `column_return`; POP-2 commons arc;
POP-3 departure memory; POP-4 plague arc (folded into PG); POP-5a road drama (harried, tolled, turned back, sheltered,
delayed, split — costing time and provision, never lives) and POP-5b mover permits; POP-6 the hopeful half; POP-7
instruments; `tribute_population`; émigré records (INT-3b, chain C4); refugees taking ship [POPV §3-§9; ARCH_POP §2-§6;
FOLD §3.1.7, OD-FC-13/25/40/44; PHASE55 §4j]. "No new mortality sinks" and "belief moves feet, never grain" bind all of
them [STATED POPV §1b; FPI C5].

---

## 6. Couplings with the rest of the simulator

### 6.1 What drives population [OBSERVED]

- The pressure index (food, disease, conflict, trade, legitimacy, crime; hostility) and condition archetypes → P-2, P-4,
  P-5; the causal scores (economic capacity, trade connectivity, defense, crime, healing, infrastructure) → M4's τ and
  richness, the dark P2 drivers.
- World stressors (the displacement set, with attenuated severity at spread targets) → P-5.
- Food: the food ledger and stockpile (SEASONS-A granary rhythm in LR, DC and FS) → the food pressure, M4's granary
  term, the dark `K_food`.
- Faith and culture: M4's culture affinity is the live `cultureDistance` composite with a trade-tie bonus, whose largest
  term is faith (0.30) — migrants prefer faith-close destinations but carry no faith [OBSERVED FAITH §7.6;
  `wp/migrationKernel.js:225-229`].
- Generosity: refuge postures (written by the constructive-flows mover, with hysteresis and dwell) → M4's fifth axis
  (P-15).
- Upswing booms and discovery strikes → steading seeding.
- War: occupation and war conditions; sack, conscription, levy (FS); M1 embattlement danger → M4 road deaths.
- Calamity and pestilence; DM verbs (`FORCE_CALAMITY`, `FORCE_FOUND_STEADING`, `FORCE_ABANDON`, `FORCE_RESETTLE`,
  `SHIFT_TIER`) and proposal approvals.

### 6.2 What reads population state [OBSERVED]

- Tier drift (population against the bands) and calamity's demotions.
- The steading seeding drive (population ÷ tier maximum; the recent-arrival markers).
- Terminal death (thorp, under 8, empty) and calamity scale (tier density).
- The traditions kernel (column endpoints, ≥ 12% influx over three years plants an `adoptedFrom` rite) (P-16).
- Belief axes: the believed −2…+2 trend from the history ring (P-17).
- The pact lane's `migration_pressure` occasion reads a believed pull band and can sign `migration_right`,
  `labor_compact` or `settlement_provision`, which no population code consumes — a lit grant with no effect [STATED POPV
  POP-5b bracket; FOLD §2 GR row].
- Faith spread pulls harder toward big settlements (DC, FS) [STATED FAITH §1], so an unbounded population is also an
  unbounded faith gravity on long horizons [INFERRED].
- Render and briefs: the host's migrant overlay (P-25), the road-scene brief (columns whose origin or destination lies on
  the party's route, each with its survivor count and a cause sentence; DM-secret), the steading orbit dots (P-28), the
  timelapse (P-27), and map tier icons — which read the save row's tier label and use population only as a fallback when
  no label exists [OBSERVED reader 1: `src/domain/briefs/roadScene.js:1-27`; re-checked in the verification pass:
  `src/domain/briefs/roadScene.js:158-163`; `map/TierIcon.jsx:25-39`].
- Pilgrimage attendance (P-30, verification pass): a grand observance (a procession, offering or fair at town scale or
  above, or any metropolis-grade spectacle) lifts its host's success score by up to 0.10 from the populations of the 8
  nearest reachable mapped settlements, each weighted by `distanceWeight` (a neighbour of 6,000 people adds about one unit
  of raw draw; half the cap at two units). It is a read only — no one moves and visitors are not debited — and needs a
  canon and `traditionsEnabled` [OBSERVED `src/domain/traditions/pilgrimage.js:1-60`, `:84-99`; caller
  `wp/traditionsKernel.js:757`, imported at `:79`]. [INFERRED] Unbounded populations push neighbours' draw toward the cap, softly.
- Dark: route desire paths and migration rumours (P-22); the Wave P war motive, capability and risk lifts; the realm
  reading.

### 6.3 Writers and mutexes [OBSERVED]

`spatialLedgers.migration` has two writers partitioned by travel class (M4 classless; P2 refugee/voluntary), with the
military classes (`reinforcement_column`, `shed_column`, `veteran_return`) declared and unproduced; one module-private
normaliser whitelists the fields [`sp/migration.js:459-560`; FOLD §3.1.7]. `settlement.population` has many writers per
tick (apply pass, M4 release, lifecycle, calamity, tier mint; dark: P1, P2), ordered by the pulse. Conflict arbitration
admits at most one `flow_migration` per source per tick (the exclusive tag `population_transfer:<source>`) under budgets
of 90 candidates a tick and 14 per settlement [re-checked `wp/candidateEvents.js:385-415`].

**A named-cast floor seam** (P-31, verification pass): a helper that raises a population to at least its resident named
count (plus a slack of 0) and a helper that drains losses from the anonymous pool first and reports the shortfall exist
and are tested, but nothing in `src/` outside their own module calls them, so no shipped writer keeps a head count above
its named cast [OBSERVED `wp/npcReplacement.js:380-420`; `wp/npcConsequencesTuning.js:188`; grep of `src/` and `tests/`].

### 6.4 Designed couplings [STATED]

WF × POP (columns as the physical vector of faith; WY-4 credit); PG (contagion on arrival; POP-4 folded in); LG's
journey fates and reception contract; INT-3b émigrés; WC's military columns competing in the same absorption market;
IN-4's reputation race needing refugee columns; COUPLINGS' diaspora funding reconquest from departure memory [ARCH_POP;
FOLD §3; FPS §1.11].

---

## 7. STATUS by mechanism and preset (checked in `rules` at `81f1cd96`)

Legend: **L** lit by the preset; **–** not lit; **c** lit only on a canonized realm; **D** BUILT DARK; **S** SEAM (no
caller); **U** DESIGNED ONLY. "Per campaign" names what a DM can change for one campaign: the premium Living-World row
(`LWG`: Relationship drift, War layer, Faith spread, and the Map geography canonize) or the realm rules dialog (`SRD`:
preset grid; the domain rows Diplomacy, Trade, Migration, Faith spread, War, Ambition and Seasons; the nine **Engine
waves** toggles, among them "New & lost steadings" (`settlementLifecycleEnabled`), "Aid and generosity"
(`constructiveFlowsEnabled`), "Recovery and boom" (`upswingArcsEnabled`) and "Resource discovery"
(`resourceDynamicsEnabled`); and, behind Detail, the Population and Promotion/demotion toggles, migration mode,
propagation and intensity) [OBSERVED `LWG:55-73`; `SRD:59-68`, `:258-271`, `:484-497`, `:505-525`;
`map/SimulationRulesAxes.jsx:110-117`, `:368-378`; the Engine-waves rows were added by the verification pass]. Those wave
keys are virtual and ride the normaliser's input spread, so a DM's write persists [OBSERVED `rules:706-730`,
`:1459-1466`]. `SRD` opens from the map toolbar's overflow "Rules" item whenever a campaign is active; neither the opener,
the mount nor the store write carries a premium check — only campaign management gates it, and campaign management is itself the premium entitlement (below) [OBSERVED
`map/WorldMapToolbar.jsx:570-579`; `map/WorldMapOverlays.jsx:68-70`, `:203-209`;
`src/store/campaignWorldPulseDeferred.js:380-440`]. Campaign management is the premium entitlement: `canManageCampaigns = authTier === 'premium' || isElevated`, and `activeCampaigns` is empty without it (`map/useWorldMapCampaignModel.js:58-61`; the toolbar's `campaignActive` is `canManageCampaigns && activeCampaignId`, `map/WorldMapToolbar.jsx:373`; the same gate `LWG:32` names), so `SRD` is premium-gated like `LWG` even though its opener, mount and store write (`src/store/campaignWorldPulseSlice.js:416-434`; `campaignWorldPulseDeferred.js:380-440`) carry no check of their own [Fable-reviewed 2026-10-18: was "Whether campaign management is itself a paid feature was not traced."].

| Id | Mechanism | RR | QL | DC | SC | NC | LR | FS | Flag(s) | Per campaign |
|---|---|---|---|---|---|---|---|---|---|---|
| P-1 | Generation head count | L | L | L | L | L | L | L | always | — |
| P-2 | Legacy pressure drift (×0.65 RR/QL/NC/LR, ×1.45 DC, ×1 FS) | L | L | L | – | L | L | L | `populationDynamicsEnabled` (default true; SC false) `rules:71`, `:973` | SRD toggle |
| P-3 | Tier drift + promotion mint | L | L | L | – | L | L | L | `tierDriftEnabled` `rules:75`, `:977`; conserved promotion D (`demographicsEnabled`) | SRD toggle |
| P-4 | Aspatial dispersal (45%) | L roll, uncanonized | – | L distributed, uncanonized | – | – | L roll, uncanonized | L distributed, uncanonized | `migrationFlowsEnabled` ∧ propagation ∉ {off, local}; `migrationMode` `rules:72`, `:170`, `:692-703` | SRD migration row, mode, propagation |
| P-5 | Stressor refugee flow (netted, also on canonized realms) | L | – | L | – | – | L | L | same as P-4 + stressors `wp/candidateEvents.js:599-605` | SRD |
| P-6 | M4 crisis columns | c | – | c | – | – | c | c | `spatialCanonVersion` > 0 + a producer (P-4's gate, P-7, P-8) `sp/migration.js:175-179` | **LWG Map geography** (premium; generated maps only) |
| P-7 | Calamity deaths + exodus (terrain-weighted exposure, §3.6) | L | – | L | – | – | – | L | `disastersEnabled` (virtual) `rules:895`, `:948`, `:1070`; `FORCE_CALAMITY` needs it | — (no LWG or SRD control; a preset switch only) |
| P-8 | Terminal death + dispersal | L | – | L | – | – | L | L | `settlementLifecycleEnabled` (WAVES `rules:720-730`) | SRD Engine waves: "New & lost steadings" |
| P-9 | Remnant resettlement | L | – | L | – | – | L | L | same | SRD Engine waves: "New & lost steadings" |
| P-10 | Steadings (founding, growth, starvation, convergence, tributary) | L | – | L | – | – | L | L | same; sites only when canonized; seeding drive reads booms (`upswingArcsEnabled`) and strikes (`resourceDynamicsEnabled`) | SRD Engine waves: "New & lost steadings" (+ "Recovery and boom", "Resource discovery" for the drive) |
| P-10b | Steading charter graduation | D | D | D | D | D | D | D | `lineageClaimEnabled` (false in FS `rules:1048`) | — |
| P-11 | War conditions on population | – | – | L | – | – | – | L | `warLayerEnabled` `rules:83`, DC/FS | **LWG War layer** (needs Relationship drift); SRD War row |
| P-12 | Sack, conscription, levy, homecoming | – | – | – | – | – | – | L | `warForageEnabled`, `warEconomyDrainEnabled`, `warLevyEnabled` `rules:1024`, `:1028`, `:1029` | none (not in LWG or SRD; a preset switch to FS) |
| P-13 | Razing population law | D | D | D | D | D | D | D | the eight-flag conjunction `CONQUEST_REQUIRED_RULES` (`wp/conquestDoctrineStage.js:63-72`; gate `wp/razingExecution.js:487`, `:1250`), never all true in any preset: `conquestDoctrineEnabled` is in none, five are declared false in FS, two (`warLayerEnabled`, `peaceEngineEnabled`) are lit in DC/FS | — |
| P-14a | Plague via pressure, condition and flight | L | L | L | – | L | L | L | rides P-2 (+ P-5 where migration live); stressors off in SC | — |
| P-14b | Pestilence front (travels trade carriers at `hopWeeks`) | c | c | c | – | c | c | c | marker only `sp/pestilence.js:151-155`; seeds need stressors | LWG Map geography |
| P-15 | Refuge postures steering M4 | c | – | c | – | – | c | c | `constructiveFlowsEnabled` (WAVES) | SRD Engine waves: "Aid and generosity"; LWG Map geography |
| P-16 | Rites adopted from column influx | c | – | c | – | – | c | c | `traditionsEnabled` (ONE_REGEN `rules:742-752`) | LWG Map geography |
| P-17 | Believed population trend (courts) | – | – | c | – | – | c | c | `beliefAxesEnabled` (FP_LIT_BELIEF `rules:793-797`) ∧ canon ∧ infoMode ≠ omniscient (RR omniscient `rules:56`) | LWG Map geography |
| P-18 | Wave P1 births − deaths vs min(K_food, D_tier) | D | D | D | D | D | D | D | `demographicsEnabled` (false in FS `rules:1170`) | none (OD-FC-18: lights at the signed soak) |
| P-19 | Wave P2 push-pull columns | D | D | D | D | D | D | D | same + `routeLifecycleEnabled` (false in FS `rules:1119`) + an unwritten network | none |
| P-20 | Wave P3 plans + §5b land law | D | D | D | D | D | D | D | `demographicsEnabled` (+ lifecycle, + canon for ground) | none |
| P-21 | Wave P4 world's hand (ladder, risk lifts, war motive, Herald, realm reading) | D | D | D | D | D | D | D | `demographicsEnabled` | none |
| P-22 | Migration rumours; route desire paths | D / S | D / S | D / S | D / S | D / S | D / S | D / S | `migrationRumorsEnabled` in no preset `rules:375`; `accrueRouteFlows` no caller | none |
| P-23 | Émigré errand | S | S | S | S | S | S | S | no caller | none |
| P-24 | Corruption push on M4 τ | D | D | D | D | D | D | D | `migrationCorruptionPushEnabled` in no preset | none |
| P-25 | Host migrant overlay (DM-only; a moving marker, no path) | c | – | c | – | – | c | c | not flag-gated; renders existing columns; mounted only while the map's Travelers toggle is on (default off) `src/components/MapOverlay.jsx:351`, `src/store/mapSlice.js:112` | follows P-6 |
| P-26 | POP-1…7, WY-4 fence + faith cargo, size-scaled speed, `column_return`, `tribute_population`, sea passage, émigré records | U | U | U | U | U | U | U | — | — |
| P-27 | Host timelapse (V-3): per-advance severity rings and grew/declined halos, per-settlement drill, clip export (halos probably inert, §10.2 #13) | L | L | L | L | L | L | L | not flag-gated; any campaign with pulse history; mounted while the Timelapse panel is open; owner session only `map/TimelapseLayer.jsx:45-49`, `src/components/MapOverlay.jsx:342` | — |
| P-28 | Steading orbit dots, charter ring and dimmed remnants on the world map | L | – | L | – | – | L | L | follows P-8/P-10 (draws whatever the satellites ledger and lifecycle status hold); no secrecy check in the layer `map/PlacementsLayer.jsx:53-61`, `:320-338`, `:380` | SRD Engine waves: "New & lost steadings" |
| P-29 | Steading conveyance by sovereignty transfer or treaty | D | D | D | D | D | D | D | `sovereigntyTradeEnabled` in no preset `rules:429`; `wp/sovereigntyAssets.js:79-86` | none |
| P-30 | Pilgrimage attendance read (neighbour population × distance weight → host rite score) | c | – | c | – | – | c | c | `traditionsEnabled` (ONE_REGEN) + canon `src/domain/traditions/pilgrimage.js:12-17` | LWG Map geography |
| P-31 | Named-cast population floor | S | S | S | S | S | S | S | no caller in `src/` `wp/npcReplacement.js:380-420` | none |

Notes. (a) QL and NC reach none of M4's producers: migration is off and propagation local, and neither carries
disasters or the lifecycle flag; a DM can change that only through `SRD` — the migration row plus propagation (mass
emigration), or the Engine-waves "New & lost steadings" toggle (dying towns, added by the verification pass) — or by
switching preset, not through `LWG` [OBSERVED `rules:692-697`, `:864-872`, `:982-986`;
`map/SimulationRulesAxes.jsx:372`]. (b) "c" rows are lit in the
preset but act only once the DM canonizes; on an imported map they never act. (c) `majorChangesRequireProposal` is true
in RR, QL, NC, LR (and SC) and false in DC and FS, so in RR and LR major population changes, flows of ≥ 8%, tier
changes, terminal deaths and resettlements wait for the DM [OBSERVED `rules:77`, `:698-703`; reader 0 had LR right,
reader 1 omitted it]. (d) **Political autonomy** (verification pass). Structural population candidates — legacy drift
(P-2) and mass emigration with its dispersal (P-4) or spatial hand-off (P-6) — take their apply mode from
`majorChangesRequireProposal` alone and are admitted straight against the proposal docket, bypassing both the
stochastic roll and the autonomy choke. Tier drift (P-3), terminal death (P-8) and resettlement (P-9) call
`authorityFor` themselves, and stressor refugee flows (P-5) pass the candidate choke, so `dm_only` (SC) and
`recommendations` (NC) force those to proposals; steadings (P-10) carry no apply mode at all. In practice minor drift
still applies on its own in NC, and every NC tier change waits for the DM [OBSERVED `wp/populationDynamics.js:495`;
`wp/pulseKernel.js:1492`, `:1541`, `:1552`; `wp/candidateEvents.js:600-605`, `:620-643`;
`wp/changeAuthorityPolicy.js:381-395`; `wp/tierResourceDynamics.js:237`; `wp/settlementLifecycleFirstClass.js:422`,
`:501`; `rules:980`, `:985`].

---

## 8. MAP TOUCHPOINTS

### 8.1 What the maps show about population today [OBSERVED]

- **World map, migrant columns** (`map/TravelersLayer.jsx`, 154 lines; re-read whole in the verification pass). Mounted
  only while the map's Travelers layer toggle is on, which defaults off [OBSERVED `src/components/MapOverlay.jsx:351`;
  `src/store/mapSlice.js:112`]. For each record in the migration ledger (every class): skip it if either end is a port or
  a teleport node, or if the digest has no candidate route between them; take the digest's cheapest candidate route (a
  list of settlement ids) and move **one marker** — an outlined dot with a heading chevron — along straight segments
  between those settlements' `mapState.placements` x/y, at progress (tick − (arrival − `hopWeeks` in the *current*
  season)) ÷ `hopWeeks`, spread by segment length. **No route line is drawn**: the route only places the marker. The label
  reads "Migrant column: A → B" with no count [OBSERVED `:93-108`, `:139-151`; `map/travelersGeometry.js:40-78`]. It
  renders only for an authenticated owner session; the shared or gallery payload never carries world state [`:14-17`,
  `:49-51`]. Consequences [INFERRED]: a column to or from any port town or circle holder is invisible; the marker's track
  may not be the route M4 scored; the marker jumps when the season changes mid-journey; it slides across intermediate
  settlements' icons rather than along a road polyline; and because the whole layer ignores pointer events, the label
  probably serves only as an accessible name, not as a hover tooltip (not executed).
- **Steadings and remnants** (`map/PlacementsLayer.jsx`, 387 lines; read whole in the verification pass). Each placed
  parent draws its steadings from the campaign's satellites ledger as small orbit dots, one-sixth of a turn apart by the
  record's `orbit` index, about 11 screen units out at any zoom, larger for a hamlet, with a ring while a charter is
  pending; each dot is labelled with its name, tier and head count ("N folk", plus "a charter awaits") — again inside a
  group that ignores pointer events, so probably not a hover tooltip [INFERRED]. The orbit index is used, never the frozen
  site cell. A settlement carrying a lifecycle status (a remnant) keeps its cell and draws dimmed, labelled ruins or
  abandoned; a seeded ancient relic draws a small ruin glyph beside its settlement; the map legend documents the steading
  dot and the charter ring [OBSERVED `:53-61`, `:101-112`, `:131-135`, `:320-338`, `:343-349`, `:380`;
  `map/lifecycleGlyphStyle.js:11-19`; `map/MapLegend.jsx:191-198`]. The layer checks no flag and no secrecy: it draws
  whatever the active campaign's ledger holds (so wherever the lifecycle lane runs — RR, DC, LR, FS, or SRD Engine waves),
  and only a campaign manager holds an active campaign on this surface [STATED `map/WorldMapOverlays.jsx:68-70`].
- **Tier icons** read the save row's tier label (or its `settType`) and fall back to `popToTier(population)` only when no
  label exists, e.g. a placement with no save [re-checked `map/TierIcon.jsx:25-39`; `map/PlacementsLayer.jsx:101`]. So the
  map shows the proposal-gated, lagging tier label, not the head count. Whether the pulse writes a promotion back to the
  save row's label was not traced.
- **The timelapse (V-3)** — a host time scrub over the pulse history, DM-only and not flag-gated [OBSERVED
  `map/TimelapseLayer.jsx` (108, whole); `map/TimelapsePanel.jsx` (178, whole); `src/domain/display/timelineTrack.js`
  (244, whole)]. Opening the Timelapse panel in the realm inspector sets a shared scrub tick; the layer then paints, at
  each settlement's placement, a ring sized and shaded by the strongest outcome severity that struck it in that advance,
  and a green or red halo for its net population change from the records' `populationDeltas`; the panel adds frame
  stepping, a per-settlement drill (times struck, grew, declined) and a JSON clip export. One frame per advance; same-tick
  records merge; only `selectedOutcomes` and `impactDigest` are read, not the mechanical outcomes where minor (state-only)
  drift lands [OBSERVED `timelineTrack.js:66-146`; `TimelapsePanel.jsx:58-108`; `map/RealmInspector.jsx:703`;
  `src/components/MapOverlay.jsx:53`, `:342`; `TimelapseLayer.jsx:45-49`]. The shared tick also drives the town map's
  aged overlay ("Show the years") [STATED `TimelapsePanel.jsx:4-11`]. **Probable defect**: the halo reads
  `populationDeltas` as an id-to-number map, but every producer writes an array of `{saveId, delta, reason}` rows, so the
  halos and the grew/declined counts likely never fire on a real world; its tests feed maps (§10.2 #13).
- **Other DM population surfaces**: the realm forecast lists each settlement's population before → after and any tier
  change; the realm comparisons panel shows per-tier population totals in an owner session; the road-scene brief lists
  migrant columns touching the party's route with survivor counts and a cause sentence [OBSERVED
  `map/RealmForecast.jsx:167-176`; `map/RealmComparisons.jsx:105-115`; `src/domain/briefs/roadScene.js:158-163`].
- **Settlement dossier (every audience)**: the Overview tab's identity strip prints the head count and, once the ring holds two readings, the DS-POP-3 direction sentence — a retrospective band over `populationHistory` with the belief axes' thresholds, drawn for the player audience too and silent only on a public gallery dossier [OBSERVED `src/components/new/tabs/OverviewTab.jsx:183`, `:287`, `:294`; `src/domain/display/trendLens.js:1-60`; `src/components/new/generalDeskRead.js:173-176`, `:259`; `src/domain/display/stateProse/stateProseKernel.js:174-178`; Fable-reviewed 2026-10-18].
- **The Living-World row** shows "Geography mapped ✓", "Re-map geography" and a sentence naming how many seats were
  founded since the canon [`LWG:185-215`].
- **No** population heat map, flow-arrow layer or pressure layer exists in the host (grep, reader 1); a steading layer
  and a grew/declined tint do (above — corrected by the verification pass).
- **Town map**: no population-flow input was traced; the town-cartography lane wants "satellite orbit context" and is dark
  [STATED FPI T8]; the timelapse's scrub tick reaches the town map's aged overlay (above), whose inputs were not traced.

### 8.2 The geometry the subject reads [OBSERVED unless marked]

| Geometry | Read by | Source today | Weak spot |
|---|---|---|---|
| Path cost (integer, seasonal overlay) | M4 candidate pool; pilgrimage attendance (P-30) | frozen digest `distanceMatrix`, escalating to sea-lane or teleport-augmented routes when an endpoint is a port or circle holder and the canon carries those slots [`sp/distanceRead.js:653-680`] | unmapped settlements absent; sea and circle passages priced with no ship or fare, and hidden by the overlay (verification pass) |
| `hopWeeks` (integer weeks, floor 1, cap 52, median primary hop = 1 week) | M4 arrival; P2 legs (dark); the overlay's start time | `distanceRead` calibration | `kmScale` never written: weeks are relative to the realm, not absolute [FPI D2-D3] |
| `distanceWeight` (0..1, floor 0.35) | M4 closeness; pilgrimage attendance weighting | digest | — |
| Candidate routes (settlement-id paths) and embattlement danger | M4 road deaths; the overlay's marker track (no line drawn) | digest + embattlement ledger | path not stored on the column |
| Membership (`isMapped`) | M4 (origin and destination), the canon note | digest | post-canon foundings invisible until a premium re-map |
| Territory partition, cost field, gate terrain | steading sites | digest | no coordinates: the "annulus" is the parent's partition |
| Gates, neighbour tiers, median primary hop | the dark land law | digest | written in cost units "because the frozen digest carries no coordinates"; "restore a true radius the day the digest persists seed cells" [STATED DEMO §11b; OBSERVED `wp/demographicsLand.js:8-28`] |
| Season (calendar) | M4 road deaths and pool pricing | calendar, independent of `seasonsEnabled` | — |
| Regional graph (channels, labels) | P-4, P-5, P-15 weighting | region lane | topology, not geometry |
| Lived route network (graded edges) | P2 (dark), route desire paths (dark) | **never written** | OD-FC-18 mounts it at world birth [STATED FOLD:511] |
| Placements x/y | the migrant overlay; the steading orbit dots; the timelapse rings and halos | `mapState.placements` | the map's own coordinates, not the digest's |
| Steading `orbit` index | the host's steading dots (P-28) | satellites ledger | cosmetic ring slot, not the frozen site cell (verification pass) |
| Settlement terrain key and prior strikes | calamity exposure (P-7) | settlement data, `calamityHistory` | a weight on a fixed realm budget, normalised to mean 1 [`sp/calamity.js:153-207`] (verification pass) |
| Pulse history (one record per advance) | the host timelapse (P-27) | `worldState.pulseHistory` | interior weeks of an advance dropped; delta shape mismatch (§10.2 #13) (verification pass) |

### 8.3 What a population and movement lens needs from the host (read-only host facts)

1. Per settlement: population, tier, `peakTier`, lifecycle status and remnant grade, calamity stamps, crisis-flight
   conditions, `regional_migration_pressure`, `steading_tributary` — all in the save.
2. Trend: the sign of the summed recent deltas in the 12-row ring (the same derivation the belief axis uses); for
   players, the host's own dossier direction sentence over that ring (§8.5), never the believed trend, which the host records for its courts (P-17) and shows to no one [Fable-reviewed 2026-10-18: was "for players, the believed trend where it exists (P-17)"; V-1, D-1].
3. Columns in flight: origin, destination, survivors, depart and arrival ticks, class (M4 classless; P2 refugee or
   voluntary when lit) — position derived, path re-derived and labelled as such (§8.4).
4. Netted transfers: the outcome records — `flow_migration` carries `from`, `to`, channel type and count in its metadata;
   an aspatial dispersal's destination row carries an `outcomeId` that encodes the origin; an M4 landing row does not
   [OBSERVED `wp/flows.js:107-111`; §2.1].
5. Steadings: parent, population, tier, site cell (canonized) or orbit index (aspatial), charter pending, provenance.
6. Refuge postures (host → origin weight), resettlement sites ("New X"), ruins (relic only from peak ≥ city).
7. When lit (dark today): the bound, which wall binds (granary or walls), pressure, viability grade, the land law's legal
   ground.

### 8.4 What a lens could add without inventing host facts [INFERRED]

- **Two drawing grammars.** Columns are things on roads with a departure and an arrival; netted transfers are same-tick
  arcs along regional links. A lens that animates a netted transfer as a moving column invents travel the host never
  simulated; a lens that draws M4 columns as arcs hides the toll.
- **"Likely road" rendering**: the map's own routed polylines between the two settlements, labelled as the probable road,
  until the host stores the chosen path. Position from `departTick` (WY's cure), not from arrival minus a re-computed
  `hopWeeks` [STATED WY §0 C1/C4, §3a].
- **Room and pressure**: when Wave P is lit, a choropleth of the bound and its binding wall; today only a qualitative
  pressure band from the existing pressure index, labelled as such.
- **Founding ground**: the land law's legal set as a "room to settle" overlay once lit — the one population rule written
  against map geometry.
- **Steadings** as small marks inside the parent's territory, at the site cell's centroid on canonized realms (the map
  owns the centroid; the digest does not), or on the cosmetic orbit ring otherwise. The host already draws the orbit-ring
  form on every realm, canonized or not (§8.1), so a native lens adds only the site-cell placement and should keep the
  host's charter ring and tooltip facts (name, tier, head count).
- **Calamity exposure**: a relative-hazard shading from the host's own exposure weights (terrain risk plus prior strikes,
  normalised to mean 1, §3.6), labelled as relative hazard, never as a forecast; lit where disasters are (RR, DC, FS).
- **Losses**: the M4 toll and the 55% aspatial loss cannot be shown from host facts today (receipts dropped); a lens
  must not estimate them.

### 8.5 Audience and time scrub

- Audience: every column position is DM-secret today; players get no population movement. What a player does get is the settlement dossier's own head count and its DS-POP-3 direction sentence ("has been emptying" … "has been swelling"), a retrospective band over the 12-row ring with the belief axes' thresholds, drawn for the player audience and silent only on a public gallery dossier [OBSERVED `src/domain/display/trendLens.js:1-60`; `src/components/new/tabs/OverviewTab.jsx:183`, `:287`, `:294`; `src/components/new/generalDeskRead.js:173-176`, `:259`; `src/domain/display/stateProse/stateProseKernel.js:174-178`; Fable-reviewed 2026-10-18]. Player-safe forms built for
  this are dark: the banded Herald lines (no digits) and the migration rumour net [OBSERVED reader 1:
  `wp/demographicsHerald.js:16-21`; `sp/migrationRumors.js:41-56`]. Courts' believed trends exist in DC, LR and FS on
  canonized realms, unconsumed by any map or dossier (grep: no component reads the belief record's `populationTrendBand`; the two component readers of that name import `src/domain/display/trendLens.js`, the dossier's own ground-truth band) [Fable-reviewed 2026-10-18].
- Time scrub: columns carry departure and arrival ticks; everything else has a short memory (12 history rows, mixed
  writers; 80 pulse records, one per advance, a multi-week advance keeping only its final week; dispatch receipts
  discarded). Pulse records **do** carry population deltas — arrays of `{saveId, delta, reason}` on ≤ 24 public and ≤ 8
  mechanical outcomes per record, plus ≤ 24 `consequenceOutcomes` when state-only outcomes exist (`wp/pulseOutcomePartition.js:121-123`) [Fable-reviewed 2026-10-18; OBSERVED in the verification pass: `wp/pulseHelpers.js:30`, `:112-144`;
  `wp/pulseKernel.js:1908`; `wp/pulseOutcomePartition.js:109-123`; `wp/advanceInterval.js:117-145`]. The host already
  scrubs them (the V-3 timelapse, §8.1, P-27), so a lens can reuse that track's frame derivation once it reads the arrays
  (and the mechanical outcomes, where minor drift lands); for interior weeks, older advances and the tolls it still needs
  map-side snapshots per advance (a derived cache, not a host fact) or the chronicle.

### 8.6 Host changes a lens would want (the owner's to schedule; none is required for a first lens)

1. Store the dispatched route path and the dispatch toll (departures, origin deaths, road deaths) on the column or in a
   dated receipt ledger.
2. Name the origin on arrival rows — the release step already returns the origin ids per destination and the kernel
   drops them (§2.1), so this is a small change; keep each delta's own reason in the history ring (this also repairs
   §10.2 #1).
3. Dispatch columns when a queued spatial emigration or terminal death is approved (§10.2 #2).
4. Build WY-4's fence so a crisis is served netted or physical, not both.
5. Write `kmScale` at canonisation from the map's exported scale (OD-FC-22) so column times are absolute.
6. Persist settlement coordinates or seed cells (the world-native proposal's port does this:
   V13 §8.5 H5, H18, H19; formerly proposal §6 item 4, superseded 2026-10-17) so steading sites and the land law use true radii.
7. Mount the lived route network at world birth from the map's routes (OD-FC-18), which is what Wave P2 walks.
8. Read `populationDeltas` as the arrays they are in the timelapse track, and read the mechanical outcomes too
   (§10.2 #13; verification pass).

---

## 9. How this changes the map module's current readings

### 9.1 Territory (J377–J378)

1. **Size must enter as a band, not a count.** J377 grows strength exponentially "with tier, size and prosperity band".
   In every shipped preset but SC (where the drift lane is off) population has no ceiling and compounds in big stable towns (§3.1, §4), so an exponential in
   raw population would explode on long campaigns. Use the tier band (bounded at metropolis) and at most a log-banded
   size inside it; never the raw count.
2. **Promotion jumps are minted.** A promotion adds up to 8% of the new floor in one step (§3.3); a projection keyed on
   size will see a step at every promotion. The hysteresis-guarded re-derivation already planned should treat a tier
   change as the dated event, not the population change.
3. **Small places are static in RR.** Below about a thousand people the legacy lane does not grow anything in the default
   preset (§3.1) — the projection's small seats will hold their reach for decades unless transfers move them.
4. **Steadings are the only sub-seat claim points the host has.** They sit inside the parent's own territory partition on
   canonized realms, never join the digest, and stop at 401 "charter pending". J377's "unclaimed land stays wild"
   holds: steadings reinforce the parent's hinterland; they should not extend the border or seed a new territory until
   the host graduates them (`lineageClaimEnabled`, dark). The host map already draws them as orbit dots (§8.1), and a
   dark conveyance (`sovereigntyTradeEnabled`) can move a steading to another parent without moving anyone (§3.4), so a
   sub-seat claim point can change sovereign if that flag is ever lit (verification pass).
5. **Σ(parent + satellites) is the host's conserved size**, not `settlement.population` alone; a projection reading
   saves alone undercounts parents that have seeded. [Fable-reviewed 2026-10-18: the design counts the parent's own people only in its size third and gives each steading its own claim point, so the sum is not double-counted (J384 (11) as amended by the rulings lane; V13 §3.9 (7) and (12)).]
6. **Refugee columns are evidence, not ownership.** M4 columns cross marches and die by embattlement × season; they do
   not claim. J378's patrols could lower road danger only if the host chooses to consume a patrol fact; today road
   deaths read the M1 embattlement ledger alone (§5.2 C).
7. **The war sack and conscription move people only in FS**, same-tick; a territory lens must not draw captive columns.
8. **The §5b land law is the host's own spacing rule** (minimum separation by tier pair, maximum reach 1.25 median hops),
   expressed in median primary hops — a ready calibration for the per-settlement, per-tier reach limit J377 reads ("the per-settlement limit is where it falls below a floor, capped per tier") once lit, and a reason to
   keep territory reach in the same week-and-hop vocabulary until `kmScale` exists.

### 9.2 Religion (J379 and FAITH §9.6)

1. **Migrants carry no faith in code.** M4's destination choice prefers faith-close places (the culture-distance faith
   term, 0.30), but WY-4's faith cargo is unbuilt; FAITH §9.6 item 7's finding ("no host fact as movers") stands for population too. A religion
   lens may say "refugees fled toward co-religionists" only as the M4 destination choice on canonized realms.
2. **One real "culture moves with people" fact exists**: rites adopted from column influx (≥ 12% over three years,
   `adoptedFrom`), lit in RR, DC, LR and FS on canonized realms (P-16). It is the only persisted cross-settlement rite
   movement driven by people, and its arrows can be drawn from host facts (FAITH §7.7 agrees).
3. **Size pulls faith.** Spread (DC, FS, or LWG Faith spread) pulls harder toward big settlements; with population
   unbounded, the religion lens's "gravity" will drift toward the runaway centres on long horizons — show it, do not
   correct it.
4. **The double service matters for the religion lens too**: on canonized realms a famine sends netted refugees (P-5) and
   columns (P-6) at once; a lens counting "faithful displaced" must not add the two.

### 9.3 The lens mechanism (J379's "derived layer with legend, audience filter and time scrub")

1. **The canonize door is a behaviour switch, not just geography.** If a native map world sets the canon marker at
   birth, it lights M4 columns, the pestilence front, traditions influx, refuge steering, steading sites and (in DC, LR,
   FS) the belief axes for every new campaign. The port proposal keeps "the digest's immutable canon-version semantics"
   [proposal §6 item 1 as it stood before its 2026-10-17 supersession, quoted at `docs/AMENDMENTS-2026-10-17m.md:2264`; now V13 §8.5 H4/H5]; whether a port-backed world counts as canonized at birth must be
   the host's explicit choice, recorded with the owner, not a side effect of shipping the native map. [Fable-reviewed 2026-10-18: ruled since — J386 and J387 (V13 §8.5 H22, under the owner's J384 delegation "i leave all judgemtn to you"): every new campaign on a native world is canonized at birth, deliberately, as the product ruling the host implements; re-canonize and retcons stay the premium DM's act.]
2. **Every lens must read the campaign's resolved rules and the canon marker**, as FAITH §9.6 item 1 found for faith:
   in QL and NC nothing moves between settlements; in RR people teleport until the DM canonizes.
3. **A lens needs two layer kinds** — dated arcs (netted, same tick) and moving markers (columns with depart/arrive) —
   with a legend that says which is which (§8.4).
4. **Time scrub has a host precedent, and still needs map-side receipts** (revised by the verification pass): the V-3
   timelapse already scrubs the pulse history, one frame per advance, with a severity ring and a net-delta halo per
   settlement (§8.1). The lens mechanism should share that frame grammar rather than invent another, read the deltas as
   arrays (the host track does not, §10.2 #13), and snapshot what the host does not keep — interior weeks of an advance,
   more than 12 rows or 80 records, the column tolls — as a derived cache outside any model digest, or declare a short
   horizon.
5. **Audience filter defaults to DM-only** for population movement; the player view is the host's own dossier trend sentence and head count (§8.5), which a lens may draw for players as a public host fact, or nothing — the believed trends of three presets reach no player surface [Fable-reviewed 2026-10-18: was "either nothing or believed trends (three presets, canonized)"] — the same narrowness FAITH §9.6 item 10 found.
6. **Do not inherit the host overlay's shortcuts**: it hides port and circle columns (exactly the ones M4 may have priced
   by sea or teleport), re-derives the path, draws no line and repositions by the current season. A native lens should draw every class, mark the path as likely, and position from the departure.
7. **Netted transfers have no geography of their own**: draw them along regional links (the regional graph), not along
   roads, and keep them out of any travel-time legend.

---

## 10. Document-versus-code contradictions, defects and open questions

### 10.1 Documents the code contradicts or has outrun

1. **DEMO's law 4 ("the people account") is broken in every lit preset**: aspatial shedding loses 55%; promotion mints;
   unmapped origins vanish; M4 tolls are dropped; dead parents' steadings are lost [OBSERVED §4]. The cure is dark.
2. **POPV J-P3 ("no wave opens teleport migration") and M4's header ("the displaced pool no longer teleports")** versus
   flow_migration, resettlement, steading transfers and the sack, all same-tick on canonized realms [OBSERVED
   `wp/flows.js:58-109`; `sp/migration.js:4-8`; STATED POPV:76-79]. ARCH_WY calls the flow case a live violation that
   WY-4 repairs.
3. **DEMO §4 says the homeostat "runs on machinery that exists today"**; the route network it walks is never written, so
   lit it would move nobody, and lighting routes beside it would quarter every settlement's imports (artery factor 0.25
   with no arteries) [OBSERVED reader 1 `wp/demographicsRates.js:255`, `:563-577`; STATED FOLD §0:66-70].
4. **PHASE55 §4c says population beyond a ~20% food-deficit tolerance migrates**; M4's τ governs only origin survival,
   while the shed amount still comes from the legacy rate and the mass-emigration gate [OBSERVED `sp/migration.js:11-16`].
5. **RD amendment R says a small banded escape share of a razing flees as Wave-P refugees**; the code counts 12%
   "escapees" and credits no one (dark lane) [OBSERVED reader 0 `wp/razing.js:597`].
6. **Resettlement "neighbours"** in the tuning comment versus realm-wide donors with no distance term [re-checked §3.5].
7. **ARCH_WY's populations sub-layer "positioned from departTick"** is the planned cure, not the state: the overlay
   positions from arrival minus a re-computed `hopWeeks`, along the cheapest route, with chevrons WY forbids [OBSERVED
   `map/TravelersLayer.jsx:93-108`; STATED WY §0 C1, §3a].
8. **Column speed**: the owner's size-scaled speed has no code; ARCH_WY's bracket says it lands with WY-4 while OD-FC-13
   rules it POP's row read by WY-4 — one bracket, ARCH_WY:1252, carries both: it quotes OD-FC-13's reconciliation ("the band is POP's row per ODQ §130.3, WY-4 READS it") and records the band as "landing in this wave", so the owning row and the landing wave are named apart, not in disagreement [STATED; Fable-reviewed 2026-10-18].
9. **Village seeding**: DEMO §11b records that an earlier §5 example ("a farm village with open land spins off steadings", no longer in §5 at `81f1cd96`) contradicted the town-or-larger cap table; ruled for the cap table by the host's manager
   (vetoable) [STATED DEMO §11b; OBSERVED `wp/settlementLifecycleKernel.js:196`].
10. **Charters never graduate**: the steading header says charters are "executed by the parked V2 machinery"; the executor
    is dark [OBSERVED §3.4].
11. **Stale road-mortality promises**: Wave P's headers say P4 brings road mortality as a named cause class; P4 landed and
    P2 still hard-codes zero; POPV now says zero "until the owner prices one" [OBSERVED reader 1
    `wp/demographicsMigration.js:36-43`, `:588-598`; STATED POPV:100-104].
12. **"Lit ⇒ conserved transfers only"** (populationDynamics' own comment) is not fully true on an aspatial lit world:
    mass emigration still disperses 45% (void: 0%) with no death receipt [INFERRED from `wp/populationDynamics.js:420-481`].
13. **`migrationReason.js` calls a shed settlement "the engine's one migration cause"**; columns now come from calamity,
    terminal death and (dark) P2 classes too [OBSERVED reader 1 `src/domain/roads/migrationReason.js:30-33`].
14. **Status headers**: both POP volumes call themselves architecture with every wave dark; the fold's §2 agrees nothing
    POP is lit; the pre-FP movers that *are* lit (P-2…P-10) are absent from the fold's table [STATED FOLD §2].
15. **Address rot**: several file:line addresses in POPV §2 and ARCH_POP §1a no longer hold (the volumes say navigate by
    symbol); this note's addresses are measured at `81f1cd96` [STATED ARCH_POP].

### 10.2 Code defects found or confirmed (not executed; each with its evidence)

1. **New — the steading lane's aspatial inflow marker can never fire.** `recentInflow` looks for a history row whose
   reason starts "Displaced population" [OBSERVED `wp/settlementLifecycleKernel.js:307-314`], but the shared writer
   stamps the outcome headline, not the per-delta reason [OBSERVED `wp/populationDynamics.js:599-607`], and no test
   mentions the phrase (grep of `tests/`). So aspatial dispersal never adds the 0.20 inflow term to a parent's seeding
   drive; only M4 landings (matched by `outcomeId`) do. Side effect: a dispersal destination's history reads the
   *origin's* outcome headline ("population is falling" for a mass emigration, "is dying" for a terminal death, the bare type `population_emigration` for a calamity exodus) [Fable-reviewed 2026-10-18].
2. **New — an approved spatial shed never travels.** A major mass emigration (≥ max(80, 4%)) or a terminal death in a
   proposal-requiring preset (RR, LR) is queued; M4 dispatches only for outcomes debited in the same tick
   [OBSERVED `wp/migrationKernel.js:398-415`]. On approval, `applyWorldPulseProposal` applies the outcome through the
   ordinary apply pass [OBSERVED `wp/applyWorldPulse.js:1176-1230`] and contains no migration or dispatch step (grep);
   `dispatchMigrations` has three callers — the pulse post-apply, calamity and the DM calamity verb (grep). On the
   spatial path the outcome's only delta is the origin's debit, so the whole shed is lost. The kernel's comment says the
   migration "releases once the DM approves" [STATED `wp/migrationKernel.js:383-392`]; I found no code doing it.
   PLAUSIBLE until executed. **Extended by the verification pass:** the DM's `FORCE_ABANDON` on a canonized realm meets
   the same fate. Realm verbs are always minted as proposals; approval runs the realm-verb arm, which substitutes the
   organic terminal-death outcome (carrying the spatial-emigration marker and only the origin's debit) and lets it fall
   through the ordinary apply lane, with no dispatch, so the whole residual is lost [OBSERVED
   `wp/applyWorldPulse.js:1305-1340`, `:524-538`; `wp/realmVerbExecution.js:899-910`;
   `wp/settlementLifecycleFirstClass.js:199-210`; grep: the three `dispatchMigrations` callers are
   `wp/pulseKernel.js:2418`, `wp/calamityKernel.js:735` and `wp/realmVerbExecution.js:824` (the calamity verb)].
   PLAUSIBLE until executed.
3. **New — stressor refugees always go to the same destination.** All of a source's flow candidates share one severity,
   the exclusive tag admits one per source per tick, and ties break by the candidate id, which embeds the destination
   id [OBSERVED `wp/flows.js:85-111`; `wp/candidateEvents.js:385-438`]; the admitted candidate is then rolled. So a
   source's refugees fan out to one codepoint-first neighbour, tick after tick, not across its channels. (Reader 1's
   inference that a source "can lose several fractions in one tick" is therefore wrong.)
4. **Double service** on canonized realms (flow_migration beside M4) — confirmed [OBSERVED `wp/candidateEvents.js:599-605`].
5. **Arrival time ignores the chosen route**: M4 picks a route by danger and seasonal cost, stamps the pair's `hopWeeks`;
   the overlay moves its marker along a third path [OBSERVED `wp/migrationKernel.js:220-223`, `:262`;
   `map/TravelersLayer.jsx:93-108`].
6. **Unmapped origin, silent loss**: the dispatch skips an unmapped origin with no receipt after the origin was debited
   [OBSERVED `wp/migrationKernel.js:460`].
7. **QL/NC "emigration" with nowhere to go**: a crisis shed is labelled emigration and credits nobody [OBSERVED
   `wp/populationDynamics.js:445-485`].
8. **The overlay hides port and teleport columns** — exactly those M4 may have priced by sea or by circle (§5.3) — and
   repositions by the current season [OBSERVED `map/TravelersLayer.jsx:93-108`; `sp/distanceRead.js:653-680`].
9. **Road-scene matching by endpoint**: a column is "on the road" if its origin or destination lies on the party's route,
   so a crossing column is missed and an endpoint match may not travel that road [OBSERVED reader 1
   `src/domain/briefs/roadScene.js:158-163`].
10. **The pact lane signs population grants nobody reads** (`migration_right`, `labor_compact`, `settlement_provision`)
    [STATED POPV POP-5b; FOLD §2 GR row].
11. **Wave P's tuning record is unsigned** (`signed: false, lit: null`) [OBSERVED reader 1 `wp/demographicsRates.js:375-404`].
12. **The demographic Herald's turn-back line** says "were turned back toward" for people who never left (R-28 class, open)
    [STATED FOLD; reader 1 read `wp/demographicsHerald.js` whole and did not dispute it].
13. **New (verification pass) — the timelapse's grew/declined halo probably never fires.** The track sums
    `populationDeltas` as an id-to-number map, but every producer writes an array of `{saveId, delta, reason}` rows and
    the history compaction clones that array unchanged, so each entry it reads is an index paired with an object, which
    is not a finite number and is skipped; grep finds no map-shaped producer in `src/`, and the track's tests feed maps
    [OBSERVED `src/domain/display/timelineTrack.js:81-86`; `wp/populationDynamics.js:451`; `wp/flows.js:106`;
    `wp/deploymentReturn.js:415-423`; `wp/pulseHelpers.js:144`; `tests/domain/timelineTrack.test.js:18`, `:60`]. The
    panel's "N grew · M declined" and the drill's counts read the same frames. The track also never reads
    `mechanicalOutcomes` or `consequenceOutcomes`, where minor drift is recorded (`timelineTrack.js:131-132` reads `selectedOutcomes` and `impactDigest` only) [Fable-reviewed 2026-10-18]. PLAUSIBLE until executed.
14. **New (verification pass) — map labels under ignored pointer events.** The migrant markers and the steading dots
    carry their text as SVG titles inside groups that ignore pointer events, so the browser probably never shows them
    on hover; they remain accessible names [OBSERVED `map/TravelersLayer.jsx:140-145`; `map/PlacementsLayer.jsx:320-331`;
    INFERRED from SVG hit-testing, not executed].

### 10.3 Open questions for the owner and the map design

1. Should a port-backed native world count as canonized at birth (lighting M4 and the rest by default), or keep the
   premium canonize as the act that makes people walk? (§9.3 #1) [Fable-reviewed 2026-10-18: RULED — J386, J387: canonized at birth for every new campaign on a native world; re-canonize stays premium (V13 §8.5 H22).]
2. Does the territory projection read tier only, or tier plus a log-banded size inside the tier? (§9.1 #1) [Fable-reviewed 2026-10-18: RULED — J385 gap 4: tier plus a size third inside it, kSize = 1.15^(third − 1) (V13 §2.3, §3.9 (7)).]
3. Steadings already appear on the host map as cosmetic orbit dots (§8.1). Should the native map draw them at their
   frozen site cells instead, and should they count as claim points, labels or both before they graduate? (§9.1 #4) [Fable-reviewed 2026-10-18: RULED — J384 (11): drawn at their frozen site points as claim points inside the parent's allegiance, never seats or chain members (V13 §3.9 (12)).]
4. Is a population or movement lens worth building while Wave P is dark and most RR worlds teleport, or should it wait
   for the host's WY-4 fence and the stored route path (§8.6)? [Fable-reviewed 2026-10-18: RULED — J384 (8), (12): the populations lens is built in the lens order (plague, the sway and patrols, trade and populations, …) and draws every column class, the host overlay's hidden ones included (V13 §5.9 (5)).]
5. Resolved by the verification pass: pulse records do carry population deltas (as arrays; §8.5), and M4's path cost
   does cross sea lanes and teleport edges where the canon carries them (§5.3). Open instead: should the lens mechanism
   reuse the host timelapse's frames (after the §10.2 #13 fix), and should a lens show sea- and circle-priced columns that
   the host overlay hides? [Fable-reviewed 2026-10-18: RULED in part — J384 (12): the hidden columns are shown, styled by carriage, DM-only by default; J384 (9): the scrub reads plates kept in the world document's own cache, one per host advance, not the host timelapse's frames.]

---

## 11. Sources

### 11.1 Read whole by the two reading seats (line counts at `81f1cd96`)

Documents: `docs/DESIGN_DEMOGRAPHIC_ENGINE.md` (728; no §13 or §14 although §0b and §1 cite them),
`docs/DESIGN_FP_ARCH_POP.md` (617), `docs/DESIGN_FP_POPULATIONS.md` (1,406; reader 0 whole, reader 1 in part).
Code: `wp/populationDynamics.js` (610), `wp/flows.js` (178), `wp/migrationKernel.js` (517), `sp/migration.js` (659),
`wp/demographicsKernel.js` (432), `wp/demographicsMigration.js` (658), `wp/demographicsRates.js` (939),
`wp/demographicsPlans.js` (664), `wp/demographicsPushPull.js` (643), `wp/demographicsLand.js` (541),
`wp/demographicsResponses.js` (470), `wp/demographicsWar.js` (334), `wp/demographicsRisk.js` (244),
`wp/demographicsLadder.js` (241), `wp/demographicsObservation.js` (207), `wp/demographicsWorks.js` (142),
`wp/demographicsHerald.js` (465), `wp/emigreErrand.js` (121), `sp/migrationRumors.js` (172),
`src/domain/roads/migrationReason.js` (67), `src/generators/steps/generatePopulation.js` (251),
`wp/settlementLifecycleKernel.js` (1,248), `LWG` (381), `map/TravelersLayer.jsx` (154).

### 11.2 Read in part or by grep by the seats

`rules` (1,593: 1-230, 340-420, 660-1320, 1583-1593); `wp/settlementLifecycleFirstClass.js` (809: 160-525);
`wp/tierResourceDynamics.js` (742: 100-280, 614-622); `wp/tierOutcomeApply.js` (398: 280-370); `sp/calamity.js`
(40-110, 415-470); `wp/calamityKernel.js` (873: 470-500, 700-830); `wp/pestilenceKernel.js` (305: 1-80);
`sp/pestilence.js` (1-35, 151-155); `wp/razing.js`, `wp/razingExecution.js` (1,279: 1-60, 1083-1215);
`wp/warArmyRecord.js`, `wp/warDeployment.js`, `wp/warHomeCosts.js` (by grep); `wp/pulseKernel.js` (3,007: 560-580,
870-900, 1440-1510, 2400-2560, 2620-2680); `wp/routeNetworkConsumers.js`, `wp/routeNetworkConsumersTransit.js`,
`wp/routeNetworkFlows.js`; `sp/distanceRead.js` (1,192: 125-132, 540-562, 641-733, 837-879, 1078-1093);
`sp/embattlement.js` (395-423); `wp/steadingTopography.js` (523: 1-90, 231-238, 267-285); `wp/beliefAxes.js`;
`wp/generosityKernel.js` (955-980); `wp/traditionsKernel.js` (615-690); `src/domain/region/graph.js` (825-837);
`src/domain/region/discoverDependencyCandidates.js` (425-470); `wp/worldState.js`; `src/data/constants.js` (7-35);
`SRD` (255-285); `wp/simulationProfile.js` (200-225); `wp/realmVerbExecution.js` (130-153, 773-925);
`src/domain/briefs/roadScene.js`; `wp/warReasons.js` (825-870); `wp/pressureModel.js` (155-185);
`wp/candidateEvents.js` (590-605); `wp/lineageMemberBirth.js` (335-352); `src/generators/steps/resolveConfig.js`
(85-120); `src/store/mapSlice.js` (860-892); `src/store/instantWorldBody.js` (1-20). Documents in passages: PHASE55
(1,710: §2-§4c, §4f, §4h-§4j, II.3, II.5-II.6, Round 21), WY (1,737: §0, §1c, §2c/§3a, WY-4), WC (7,054: §1.12.2,
WC-13, §7.A.8), RD (1,911: 140-160, 1060-1155, 1470-1490, 1705-1745), FOLD (708: §0, §1-§2, §3.4, OD-FC rows).
Map module: FPS (1,098: summary and every population row), FPI (481 when read; 493 after its 2026-10-17 amendments-n bracket at `:458`: §1, §2.1, §2.7, §2.9), `docs/PROGRESS.md` rows
J377-J380.

### 11.3 My own re-reads at `81f1cd96` (this seat)

`rules` 40-230 and 660-1260 whole (defaults, QUIET/OPEN/WAVES/ONE_REGEN/FP_LIT spreads, all seven presets), 1575-1593;
`LWG` whole (381); `map/TravelersLayer.jsx` whole (154); `wp/flows.js` whole (178); `wp/populationDynamics.js` 15-32,
90-300, 286-610; `sp/migration.js` 1-30, 70-230, 355-445; `wp/migrationKernel.js` 60-125, 215-266, 330-517;
`wp/pulseKernel.js` 560-580, 870-892, 2403-2432; `wp/candidateEvents.js` 370-500, 590-612;
`wp/applyWorldPulse.js` 85-135, 1150-1300; `wp/settlementLifecycleKernel.js` 1-75, 159-262, 300-318, 930-995;
`wp/settlementLifecycleFirstClass.js` 173-215, 375-395 (and grep for apply modes); `wp/tierResourceDynamics.js` 100-180;
`wp/tierOutcomeApply.js` 320-336; `src/data/constants.js` 5-16; `wp/demographicsRates.js` 125-215 and grep;
`sp/calamity.js` 40-76; `sp/pestilence.js` 1-40, 145-160; `wp/realmVerbExecution.js` 765-800; `SRD` 49-75, 250-290,
505-530; `docs/DESIGN_FP_COHERENCE_FOLD.md` 329-352 (§2 whole); greps for `ensureGenesisRouteNetwork`,
`accrueRouteFlows`, `dispatchMigrations`, `collectRealizedEmigrationEvents`, `spatialEmigration`, `conflictTags`,
"Displaced population" (src and tests). Map module: FPS 1-60 and grep; FPI 1-45, §2.1 rows, :248-258, :280, :360-368;
FAITH 1-101, §7.6-§7.7, §9.6; `docs/PROGRESS.md:434-441`; `docs/HANDOFF.md:3-30`;
`docs/design/proposal-world-native.md` §6 and §12; `docs/volumes/V13-world.md` (grep for W8 and territory).

Disagreements between the seats, settled here: `FORCE_CALAMITY` needs the disasters gate (reader 0 right); one
flow_migration per source per tick (reader 1's inference wrong); `majorChangesRequireProposal` is also on in LR (reader 0
right); M4 is unreachable in QL and NC by preset (reader 0 right; reader 1's "any preset once canonized" needs a
producer); history rows carry the outcome headline, not the per-delta reason (both readers implied otherwise); an approved
spatial emigration does not dispatch (reader 0 repeated the kernel comment).

### 11.4 Not read by any seat (named so no claim leans on them)

`docs/DESIGN_SETTLEMENT_LIFECYCLE.md`; `docs/DESIGN_FP_ARCH_LG.md`, `DESIGN_FP_ARCH_PG.md`, `DESIGN_FP_COUPLINGS.md`;
the rest of WC, WY, RD and PHASE55; `wp/commonsVoiceKernel.js`; `wp/routeNetworkGenesis.js`; `sp/cultureDistance.js`;
`wp/occupation.js`; `wp/foodLedger.js`, `wp/foodStockpile.js`; `sp/spatialDigest.js`; the rest of `wp/pulseKernel.js`,
`wp/calamityKernel.js` and `wp/applyWorldPulse.js`; `wp/decisionTier.js` (`resolveProposalToOutcome`); every test file
except the greps named here and in §11.5. (`wp/npcReplacement.js`, `satellitesLedger.js` and `wp/deploymentReturn.js`
were read in part by the verification pass, §11.5.)
Still not traced: whether the pulse writes a promotion
back to the save row's tier label; whether M4's route danger covers sea hops; the inputs of the town map's aged overlay;
whether any layer outside the three `dispatchMigrations` callers dispatches an approved shed. Resolved by the
verification pass: pulse records carry population deltas (§8.5); M4's path cost crosses sea and teleport edges (§5.3);
`SRD`'s opener, mount and store write carry no premium check of their own, the surface being premium-gated through campaign management, premium or elevated (§7 legend; Fable-reviewed 2026-10-18).

### 11.5 Re-reads by the verification pass (fixer seat, host `81f1cd96`, read-only)

Read whole: `map/TravelersLayer.jsx` (154), `map/travelersGeometry.js` (92), `map/PlacementsLayer.jsx` (387),
`map/lifecycleGlyphStyle.js` (19), `map/TimelapseLayer.jsx` (108), `map/TimelapsePanel.jsx` (178),
`src/domain/display/timelineTrack.js` (244). Read in part: `rules` (1,593: 700-735, 960-1000, 1018-1034, 1459-1560,
grep); `map/SimulationRulesDialog.jsx` (637: 1-140, 180-330, 400-560); `map/SimulationRulesAxes.jsx` (450: 250-450);
`map/WorldMapOverlays.jsx` (236: 60-80, 185-220); `map/WorldMapToolbar.jsx` (555-585); `src/hooks/useRealmInspector.js`
(220-240); `src/store/campaignWorldPulseSlice.js` (416-450); `src/store/campaignWorldPulseDeferred.js` (380-440);
`src/components/MapOverlay.jsx` (387: 300-365, grep); `src/store/mapSlice.js` (:112); `map/TierIcon.jsx` (172: 15-45);
`map/MapLegend.jsx` (grep); `map/RealmForecast.jsx` (247: 160-185); `map/RealmComparisons.jsx` (154: 95-120);
`wp/tierResourceDynamics.js` (742: 180-260, 610-660); `wp/settlementLifecycleKernel.js` (1,248: 930-1040, grep);
`sp/migration.js` (659: 130-160, 205-230, 300-445, 570-659); `wp/migrationKernel.js` (517: 210-266, 325-375);
`sp/distanceRead.js` (1,192: 286-293, 409-416, 630-690, 728-733, 1078-1090); `src/store/campaignSpatialCanonize.js`
(115-145); `wp/pulseHelpers.js` (25-65, 105-150); `wp/pulseKernel.js` (3,007: 1440-1570, 1895-1925, 2510-2530, grep);
`wp/pulseOutcomePartition.js` (125: 95-125); `wp/advanceInterval.js` (684: 115-145); `wp/candidateEvents.js` (883:
615-650, grep); `wp/changeAuthorityPolicy.js` (381-395); `wp/populationDynamics.js` (grep); `sp/calamity.js` (468:
148-210, 385-415); `wp/calamityKernel.js` (873: 605-690); `wp/warArmyRecord.js` (183: 30-66); `wp/warDeployment.js`
(1,348: 805-832, grep); `wp/warHomeCosts.js` (613: grep with context at 80-83, 279-282, 357-360, 406-408); `wp/razing.js`
(873: 250-266, grep); `wp/deploymentReturn.js` (629: 400-442); `wp/satellitesLedger.js` (184: 130-165);
`wp/sovereigntyTransfer.js` (399: grep); `wp/sovereigntyAssets.js` (79-86); `src/domain/traditions/pilgrimage.js` (104:
1-60, grep of the rest); `wp/realmVerbExecution.js` (885-915, grep); `wp/applyWorldPulse.js` (1,340: 515-545, 1295-1340,
grep); `wp/npcReplacement.js` (434: 370-420, grep); `src/domain/briefs/roadScene.js` (265: 150-170);
`wp/settlementLifecycleFirstClass.js` (grep); FOLD (328-336). Tests by grep only: `tests/domain/timelineTrack.test.js`,
`tests/property/timelineTrackGolden.test.js`, `tests/domain/npcReplacement.test.js`. Not opened by this pass:
`wp/razingExecution.js`, `sp/cultureDistance.js`, the Wave P files, `generatePopulation.js`, `wp/steadingTopography.js`,
`sp/embattlement.js`, `wp/pestilenceKernel.js`, `wp/commonsVoiceKernel.js`; and, on the map side, FPS, FPI and FAITH
(no fix leans on them).

---

## 12. Verification record

One row per verifier check that did not hold and per omission it raised. "Holds" means the verifier's finding was right
at the source; every row's evidence was re-read by this seat at `81f1cd96` (§11.5).

| # | Check or omission | What the verifier said | What I found at the source | What changed in this note |
|---|---|---|---|---|
| V1 | Tier candidate probability (§3.3) | "0.13 per extra streak tick" is wrong; the term is 0.13 × (streak − minimum + 1) | Holds: the term is added once already at the minimum streak (0.31 base) [`wp/tierResourceDynamics.js:221`]; the candidate is also autonomy-routed [`:237`] | §3.3 formula rewritten, `authorityFor` noted |
| V2 | Steading growth in row D | "2–7%" is wrong; growth needs backing ≥ 0.45, so ≈ 4.25–7%, and 0.30–0.45 stalls | Holds (lines are `:955` and `:994`, not `:957`/`:986`): floor 0.45 at `:205`, at least 1 person, stall branch clears the starvation clock at `:1029-1032`; charter-pending never starves | Row D, §3.4 growth bullet, new stall-band bullet |
| V3 | Road deaths in §1 | "up to 35% more" is wrong; the season factor multiplies the danger term (winter 1.6), capped at 0.5 | Holds [`sp/migration.js:96-98`, `:151-153`, `:219-226`]; uncapped share reaches 0.59 in winter | §1 item 2 and row C state the full formula |
| V4 | "A column under 2 folds into origin death" | Wrong: the test is on the whole traveller pool | Holds: `:388` returns the empty plan for the whole pool; 1-person splits still enqueue; only zero-arrival splits are skipped [`:586`] | Row C reworded |
| V5 | "Per campaign: —" for P-8, P-9, P-10, P-15 | Wrong: SRD's Engine waves toggle the lifecycle and constructive-flows flags | Holds [`map/SimulationRulesAxes.jsx:368-378`; `SRD:492-497`]; the virtual keys persist through the normaliser [`rules:1459-1466`]; SRD has no premium check of its own in opener, mount or store write, but opens only under an active campaign, which only a campaign manager (premium or elevated) holds [Fable-reviewed 2026-10-18] | §7 legend, rows P-8/P-9/P-10/P-15, note (a); P-7 and P-12 now say "preset switch only" |
| V6 | Host overlay draws route chords | Wrong: one marker moves along the chords; no line; behind `layers.travelers` | Holds [`map/TravelersLayer.jsx:139-151`; `map/travelersGeometry.js:54-78`; `MapOverlay.jsx:351`]; the toggle defaults off [`mapSlice.js:112`]; its label sits under ignored pointer events | §1, §8.1, §8.2, §10.2 #5 and #8, P-25; new §10.2 #14 [INFERRED] |
| V7 | Map tier icons from population | Wrong: icons read the tier label; population only as fallback | Holds [`map/TierIcon.jsx:25-39`; `map/PlacementsLayer.jsx:101`]; whether promotions reach the save row's label not traced | §6.2, §8.1 |
| V8 | "No steading layer exists" | Wrong: orbit dots with charter ring and tooltip | Holds [`map/PlacementsLayer.jsx:53-61`, `:131-135`, `:320-338`]; also remnants draw dimmed [`:380`] and the legend documents the glyphs [`map/MapLegend.jsx:191-198`] | §1, §8.1, §8.4, §9.1 #4, §10.3 #3; new P-28 |
| V9 | No heat/flow layer; pulse deltas untraced | Wrong: the V-3 timelapse scrubs pulse history; records carry delta arrays; tint probably inert | Holds; producers write arrays [`wp/populationDynamics.js:451`; `wp/flows.js:106`], no map-shaped producer in `src/` (grep), tests feed maps; the track also skips `mechanicalOutcomes` | §1, §8.1, §8.5, §8.6 #8, §9.3 #4, §10.3 #5; new §10.2 #13, P-27 |
| V10 | Whether M4 crosses sea edges | Wrong: `pathCost` escalates over sea lanes and teleport edges | Holds [`sp/distanceRead.js:653-680`]; correction to the verifier: the slots come with every new canon (≥ 2 ports or circle holders), not from `navalEnabled`, which gates fleets only [`campaignSpatialCanonize.js:124-137`] | §1, §5.3, row C, §8.2, §10.2 #8, §10.3 #5, §11.4 |
| V11 | Political autonomy and population (note silent) | Population drift bypasses autonomy; tier and lifecycle obey it | Holds [`wp/populationDynamics.js:495`; `wp/pulseKernel.js:1552`; `wp/tierResourceDynamics.js:237`; `wp/settlementLifecycleFirstClass.js:422`, `:501`]; also P-5 passes the choke [`wp/candidateEvents.js:600-643`] and steadings carry no apply mode | §7 note (d); §3.3; §3.4 "No apply mode" |
| V12 | FS war constants; cite `rules:1025-1030` | Constants unverifiable; the cite misses `warLevyEnabled` at `:1030` | Verifier half right: `warLevyEnabled` is at `:1029`, inside the original range (`:1030` is `warDispositionEnabled`), but `1025-1030` missed `warEconomyDrainEnabled` at `:1024`; the exact cite is `rules:1024`, `:1028`, `:1029` [Fable-reviewed 2026-10-18]. Constants now read: sack 8% floor 150; conscription 0.6% floor 250 (under `warEconomyDrainEnabled`); levy 0.4% floor 300; homecoming pro rata; razing 24–72%, 12%, floor 40 | §3.7 rewritten with floors, flag lines and homecoming; row F; P-12 cite made exact |
| M1 | Steadings already on the world map | Orbit dots; owner session only | Holds, with one correction: the layer checks no flag and no secrecy; it draws the active campaign's ledger, which only a campaign manager holds | As V8 |
| M2 | Host time scrub | V-3 timelapse; panel not read; probable shape defect | Holds; panel read whole: frame stepping, drill, clip export, mounted in the realm inspector; its tick also drives the town map's aged overlay | As V9; town-map line in §8.1 |
| M3 | Pulse-record collapse | Multi-week advance keeps only its final record | Holds [`wp/advanceInterval.js:117-145`]; caps 24 public + 8 mechanical [`wp/pulseKernel.js:1908`; `wp/pulseHelpers.js:30`] | §1, §2.2 row, §8.5 |
| M4 | Calamity exposure is geometry | Terrain and prior strikes weight hazard 0.75–1.5, mean 1 | Holds [`sp/calamity.js:153-207`, `:385-399`; `wp/calamityKernel.js:615-686`] | §3.6 paragraph, §8.2 row, §8.4 bullet, P-7 label |
| M5 | Per-campaign lighting outside LWG | SRD Engine waves and domain rows; premium gating untraced | Holds; premium gating traced: none of its own in opener, mount or store write, the surface gated by campaign management (premium or elevated, `map/useWorldMapCampaignModel.js:58-61`) [Fable-reviewed 2026-10-18] | As V5 |
| M6 | Sea lanes and teleport in M4 pricing | M4 can price by sea or magic; overlay hides them | Holds, with the `navalEnabled` correction in V10 | As V10 |
| M7 | Steading conveyance | Transfers move a steading row without people; BUILT DARK | Holds [`wp/satellitesLedger.js:136-161`; `wp/sovereigntyTransfer.js:204-271`, `:361`; `wp/sovereigntyAssets.js:79-86`]; the verb case starts at `wp/realmVerbExecution.js:483` | §3.4 bullet, §9.1 #4; new P-29 |
| M8 | Pilgrimage read | Grand observances read neighbours' size over the digest | Holds [`src/domain/traditions/pilgrimage.js:1-60`, `:84-99`] | §6.2 bullet, §8.2 rows; new P-30 |
| M9 | `FORCE_ABANDON` on a canonized realm | Substitute terminal death rides the approval path with no dispatch | Holds by reading [`wp/realmVerbExecution.js:900-910`; `wp/applyWorldPulse.js:527-538`, `:1305-1340`]; PLAUSIBLE until executed | §10.2 #2 extended; §4 item 7 |
| M10 | Population drift ignores autonomy | As V11 | Holds | As V11 |
| M11 | Named-cast floor seam | Floor helpers have no caller | Holds [`wp/npcReplacement.js:380-420`]; only tests call them | §6.3 paragraph; new P-31 |
| M12 | Road-scene brief carries counts | DM brief lists columns with arrivals and a reason | Holds [`src/domain/briefs/roadScene.js:158-163`] | §6.2, §8.1 |
| M13 | Other DM population surfaces | Forecast before → after; per-tier totals | Holds [`map/RealmForecast.jsx:167-176`; `map/RealmComparisons.jsx:105-115`] | §8.1 bullet |
| M14 | Arrival origins known and discarded | Release returns origin ids; the kernel keeps destination and count | Holds [`sp/migration.js:640-655`; `wp/migrationKernel.js:369`]; also a vanished destination loses its arrivals [`:345`] | §2.1, §8.6 #2 |
| M15 | Steading stall band | Backing 0.30–0.45 neither grows nor starves; charter pending suspends starvation | Holds | As V2 |
| M16 | Verifier's read list | Files read whole and in part | Recorded; no claim of this note rests on the verifier's reads alone | §11.5 lists this seat's own re-reads |
| M17 | Verifier's not-read list | War constants left unverifiable; others unread | War constants and homecoming now read (V12); the rest stays unread and no fix leans on it | §11.4 and §11.5 updated |
