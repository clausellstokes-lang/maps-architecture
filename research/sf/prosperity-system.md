# SettlementForge's prosperity — the band, how it is set and moved, how it compares and presses across the realm, what it drives, and what a map lens can show

> Fable-reviewed 2026-10-18: PASS-WITH-CORRECTIONS — the substance holds at 81f1cd96; 20 verifier findings accepted (5 amended), 4 own findings fixed, 0 readings overturned (lane retrovalidation/prosperity; J392)

Synthesis seat `research/sf-prosperity`. Host: `/home/user/clausellstokes-lang/settlement-engine` at `origin/master`
`81f1cd96`, read-only (HEAD detached, tree clean; nothing written there). Map module: `/home/user/maps-architecture` at
`7d7f562`. Two reading seats returned structured readings: a CODE seat (16 mechanisms; it ran the preset table and the
ladders from its scratchpad) and a DOCS seat (19 mechanisms; every document claim checked against code; it ran the preset
table and the campaign-birth path). This note merges them, settles their five disagreements by re-reading the code (§11.3
lists my re-reads and probes), and adds what the re-reads found that neither seat had. A later verification pass
corrected ten points and added eighteen omissions; §12 records each, and §11.5 its reading. Everything is in my own words;
no code is copied; constants are quoted as values.

Tags: [STATED] = a document or a code comment says it; [OBSERVED] = a seat or I read it in code, or a probe ran the host
module read-only from the scratchpad; [INFERRED] = reasoning, with the reason given. "Re-checked" marks a point where the
seats disagreed and I re-read the code.

Path abbreviations: `wp/` = `src/domain/worldPulse/`, `sp/` = `src/domain/spatial/`, `econ/` = `src/generators/economy/`,
`map/` = `src/components/map/`, `tm/` = `src/domain/townMap/`, `rd/` = `src/domain/roads/`, `tr/` =
`src/domain/traditions/`. Document abbreviations: UPSWING = `docs/DESIGN_UPSWING_RELATIONSHIP_FLOWS.md`, FOLD =
`docs/DESIGN_FP_COHERENCE_FOLD.md`, EC = `docs/DESIGN_FP_ARCH_EC.md`, PHASE55 = `docs/PHASE55_SPATIAL_ENGINE_DESIGN.md`,
PG = `docs/DESIGN_FP_ARCH_PG.md`, MF = `docs/DESIGN_FP_ARCH_MF.md`, TRIBUTE = `docs/DESIGN_WAR_CONVENIENCE_AND_TRIBUTE.md`,
PHASE4 = `docs/PHASE4_FAITH_DELTA.md`, ATLAS = `docs/SETTLEMENT_CAPABILITY_ATLAS.md`, GCA =
`docs/GENERATION_COHERENCE_AUDIT.md`.

Preset abbreviations (the seven shipped presets in `wp/simulationRules.js`): QL `quiet_local`, **RR `realistic_regional`
(the default id, :6)**, DC `dramatic_campaign`, SC `static_campaign`, NC `narrative_campaign`, LR `living_realm`, FS
`full_simulation`. "BORN" = what `createCampaign` actually gives a new campaign (§7.1). One pulse tick is one week (the
upswing kernel derives the year as tick ÷ 52 when no calendar is present, `wp/upswingKernel.js:378`).

---

## 1. Summary — the owner's question ("and prosperity", J380): what prosperity is in the host, and what it means for the map

**What it is.** A settlement's prosperity is one categorical word in `economicState.prosperity` — a band, not a number
and not a stock [OBSERVED `econ/economicState.js:866`]. Generation emits six words (Struggling, Poor, Moderate,
Comfortable, Prosperous, Wealthy); the simulation steps the word in whole rungs on a seven-rung ladder that adds
Subsistence at the bottom (`PROSPERITY_TIERS`, index 0..6, `src/data/constants.js:92-100`). There is no hysteresis on the
word, no history of it, no provenance trail and no realm-wide normalisation. Most simulation systems that look
"prosperity-driven" actually read a different number, the causal score `economic_capacity` (0..100), which is seeded from
the word (28 for Subsistence up to 86 for Wealthy) and then drained live by war-cost, occupation and worked-out-vein
conditions and lifted by war spoils [OBSERVED `src/domain/causalState.js:782-835`; the drainers are listed in §2,
corrected in §12 row P1]. The word "prosperity" also names a third quantity — the institution
lifecycle's economy *health* ("prosperous"/"declining"), which reads neither the band nor the score (§3.9).

**How it is set.** Once, at generation, from the configured route class (crossroads or port 3, road or river 2, isolated
1 — 0 for a disconnected thorp or hamlet, 2 for a disconnected village or larger with working teleportation and magic, `econ/prosperity.js:183-192`), tier, the economy/magic/military sliders, monster threat, defences, institution depth and income diversity, then capped
by food security and stresses, then mapped to a word [OBSERVED `econ/prosperity.js:121-290`]. Generation reads no map
geometry: the route class is a configuration string.

**What moves it.** Exactly four tick writers, each with its own copy of the same band-step applicator (round, clamp 0..6,
write back in kind) [OBSERVED grep: the only writes of a `PROSPERITY_TIERS[...]` label are in these four files]:
1. **Trade boom/bust** (upswing B2): a settlement that is at once a heavy caravan endpoint (arrivals plus departures
   at the town itself ≥ 3) and a sustained waypoint for other towns' caravans (entrepôt centrality ≥ 0.3) mints a boom
   and then climbs one rung about every seven weeks until Wealthy; a severance (the town's *own* embattlement, collapsed
   throughput, a worked-out vein) busts it one rung down.
2. **Festivals** (traditions): each tradition's yearly observance succeeds or fails — triumph +1, failure −1, and a
   successful market fair on a trade lane +1 more. Prosperity raises the success odds, so the loop reinforces itself.
3. **Grain purchase** (generosity A2): a needy buyer refused a gift by a bonded neighbour pays up to one rung; the seller
   gets 0.4 of the debit. Rounding makes small debits vanish.
4. **Ransoms** (roads): at a term-end release a captor gains a rung for a key or pillar captive and a pillar's home loses one; a party ransom pays the captor's step only; every other early release pays none (§3.5).

Nothing else writes the band: not food, famine, harvest, plague, war, corruption, the treasury, momentum, tier change or
population. War reaches it only by busting a boom (the boom town's own embattlement), cancelling festivals and ending
flourishing — and festival cancellation also reaches it from vassalage (the vassal-extraction condition), from a
hostile neighbour's raid (war pressure on the victim), from a cut trade route, and, for a conqueror, from its own
occupation burden (§5.12).

**How it compares across the realm.** It does not, in the simulation, except once: the resettlement donor pool ranks every
live settlement of ≥ 500 people by prosperity and takes the top three, with no distance term. The only other realm-wide
comparisons are display (the gazetteer column and the "Where prosperity sits" histogram) — and **both of those sorts are
broken**: the rows carry the lower-cased word and the ranker is case-sensitive, so every row ranks −1 (re-checked, §10).

**How it moves between settlements.** It never diffuses. Every cross-settlement effect is a pair transaction (purchase,
ransom), a host read of its neighbourhood (pilgrims lifting a festival; caravans to, from and through it making a boom; neighbours'
wars reaching a boom town only by collapsing its throughput), a pair pressure that stops festivals (an overlord's
extraction, a raider's war pressure; an overlord's imposed rite), a realm-ranked pick (resettlement donors) or a belief
(other settlements' believed "pull band", belief presets only). Nothing pulls a poor town up toward a rich neighbour.

**What it drives.** Festival success, reconstruction speed, flourishing eligibility (Comfortable and up), satellite
seeding, resettlement donors, corruption resistance, purchasing power, chaotic-creed receptivity and secular drift (deity
worlds), the believed pull band, generation-time legitimacy and merchant dominance, the resilience dial, the town map's
v2 economic field and the district wealth band (which decides whether the v2 town wall embraces an outer quarter); the severity of
conditions promoted from stressors; and through `economic_capacity`: migration richness and survival, culture distance,
the economy facet (10%) of military capacity, mobilisation, army funding, merchant/craft/labour NPC goals. The band
itself does **not** drive tier change, population growth, granary capacity or territory in the host; the boom and
Trade Bust conditions do nudge population growth through trade pressure (§5.6).

**What is lit.** The status of record for prosperity is the preset code, not the FOLD: FOLD §2 has no prosperity entry
(zero hits). All four writers are pre-FP engine waves lit in RR, DC, LR and FS, and dark in QL, SC and NC. Two gates cut
deeper: boom/bust needs a spatially canonized campaign **and** `commodityFlowEnabled`, which only RR and FS carry — so it
is inert in DC and LR; ransoms and the pilgrim lift need canon. And **the birth door**: a campaign created by
`createCampaign` gets the plain defaults, which still infer the id `realistic_regional` but carry none of the writers'
flags — its band is frozen at generation forever. An Instant World, a realm-toolbar preset chip (`src/hooks/useRealmInspector.js:247-250`; the rules dialog's §11 grid offers SC, NC, LR and FS, not RR, `src/components/map/SimulationRulesDialog.jsx:70-81`) or an RR-based temperament picked on the DM screen ("A steady realm", "The long winter": `wp/temperamentPresets.js:38-43`, `:68-73`, applied by `src/components/temperament/TemperamentPicker.jsx:33-34`) applies RR's lit
keys (§7.1) [STATED `wp/simulationRules.js:889-892` for the first two paths; OBSERVED for the third; probe: BORN lacks them] [Fable-reviewed 2026-10-18].

**What this means for the map module.** (1) The territory projection's "prosperity band" (J377 T2, J378's civil part)
should read the seven-rung band, case-insensitively, and must bring its own hysteresis and its own band history, because
the host keeps neither and its boom steps do not even reach the news. (2) The band is absolute and, in lit presets,
drifts *upward* realm-wide over years (festivals ratchet above Poor; booms climb; little pulls down), so an exponential
strength term will inflate every border unless it is relativised or bounded (§9.1) [Fable-reviewed 2026-10-18: ruled relative by J384 (1) — the seat's rung minus the realm's held median, clamped ±3, read at dated revisions with a 13-week dwell (`docs/PROGRESS.md:443`; V13 §3.9 (7)); on the direction of the drift see §4]. (3) Prosperity already enters J382's
culture term (the economy gap is 0.18 of the host culture distance), and would have entered J378's military tie-breaker too had
the map's military bands been banded from the host's composite military capacity, whose economy facet is
10% (§9.1 item 4) — two or three entries unless one is chosen [Fable-reviewed 2026-10-18: ruled since — J384 (4) bands the host's capacity facets EXCLUDING the economy facet, "so prosperity is counted once" (`docs/PROGRESS.md:443`; J-RR.52, `research/sf/fp-realm-review.md:611`; V13 §2.2 `PolitySeat.military`)]. (4) A prosperity lens is honest as glyphs, dated pair
links, boom arteries, catchments and donor lines, and a town lens may show the host's district wealth band; a continuous
wealth field or "hinterland wealth" would be invention.

---

## 2. The data model

| Field / quantity | Shape | Written by | Read by (main) | Where |
|---|---|---|---|---|
| `economicState.prosperity` | a bare string (generation always writes a string); the applicators also accept a `{tier}` object and write back in kind | generation once; four tick applicators | everything in §6 | `econ/economicState.js:856-866`; `wp/upswingKernel.js:901-927`; `wp/generosityUpdates.js:121-150`; `wp/traditionsKernel.js:388-410`; `rd/state.js:478-500` |
| `PROSPERITY_TIERS` + `prosperityRank` | seven words, index 0..6; exact, case-sensitive match; a string or `{tier}`; −1 for anything else (`{label}`, lower case, legacy words) | — | the four writers; rank/6 readers | `src/data/constants.js:85-100` [OBSERVED; probe: "comfortable" → −1, `{tier:'Poor'}` → 2] |
| `prosperityRank01` | 0..1 by a hand table (Subsistence .05, Struggling .10, Poor .25, Moderate .50, Comfortable .65, Prosperous .80, Wealthy .95, plus legacy aliases such as Modest .4, Thriving .9); case-folded with a substring fallback; unknown 0.5 | — | corruption climate, neighbour generator, density law, interior, town v2 layout | `src/domain/prosperityRank.js:62-147` |
| "prosperity01" as rank ÷ 6 | Struggling .167, Poor .333, Moderate .5, Comfortable .667, Prosperous .833, Wealthy 1 | — | upswing, generosity, lifecycle, corruption web, counter-intel, information statecraft, naval affordability | [OBSERVED probe] |
| `economic_capacity` | causal score 0..100: base by the current word (impoverished 22, subsistence 28, struggling 30, poor 38, modest 46, moderate 50, comfortable 62, prosperous 74, wealthy 86, thriving 88; unknown 50), ±6 for diversified/concentrated complexity; every active condition whose affected systems include `economic_capacity` drains severity × 18 — today `war_drain`, `war_exhaustion`, `war_mobilization`, `reinforcement_cost`, `occupation_resistance` (the occupied town), `occupation_burden` (the occupier) and `vein_exhausted` (`src/domain/activeConditions.js:331-446`; `wp/resourceDynamicsKernel.js:886-908`); war spoils + severity × 12; a faith "craft" channel that is 0 today. Vassal extraction and market shock do **not** touch it (the header comment at `:776-780` says they do; it is stale) | derived per read, not stored | migration, culture distance, military capacity, mobilisation, army funding, NPC ladder goals, coup (dark), convergence, demographics (dark) | `src/domain/causalState.js:776-835`, `:342-351` |
| `spatialLedgers.upswing.boom[id]` | phase (building / boom / bust), dwell, entered tick, arteries (sorted ids), fragile, throughput, accrued fraction, last tick | upswing B2 | upswing; lifecycle (boom bonus); traditions (boom bonus) | `wp/upswingKernel.js:594-706` |
| `spatialLedgers.upswing.reconstruction` / `.flourishing` | progress, dwell, cooldown records | upswing B1/B3 | upswing; traditions (bonus) | `wp/upswingKernel.js:426-592`, `:708-773` |
| active conditions `boom` / `Trade Bust` | condition ids carry the tick (`condition.boom.<tick>`, `condition.bust.<tick>`); boom severity 0.4 on legitimacy and trade connectivity; bust severity 0.55 on trade connectivity, legitimacy and labour | upswing B2 | causal derivers; traditions; lifecycle | `wp/upswingKernel.js:626-634`, `:688-694` |
| `settlementTickStates[id].economyDrift` | direction (prosperous/declining), health 0..1, streak | institution lifecycle | institution builds/closures | `wp/institutionLifecycle.js:82-153`, `:680-770` |
| believed `pullBand` | shunned / overlooked / sought / coveted, from the rank (cuts 2, 4, 5), one rung lower when the food ratio is below 0.95 | belief maps (believed-conditions family) | pacts, observers | `wp/beliefAxisSubjects.js:150-160`, `:296-335` |
| `economicState.treasury` | coin stock; prosperity scales the tax base | treasury (dark) | treasury news (dark) | `wp/treasury.js:151-155`, `:889-895` |

What is **absent** from the model [OBSERVED grep by both seats]: any per-settlement band history; any band-change receipt
that persists (the movers return receipts, and `applyPulseMover` forwards only news — `src/domain/region/wizardNews.js:1174-1189`);
any realm aggregate (total, mean, rank, percentile); any cause or provenance attached to the word (the EC volume records
that the rung has none, EC:2397 [STATED]); any DM verb or event that sets the word.

**Unknown-word defaults differ by reader** [OBSERVED, CODE seat]: upswing and lifecycle read 0.4; corruption web,
information statecraft and counter-intel 0.5; generosity 0 (cannot pay); faith disorder 0; `prosperityRank01` 0.5;
`economic_capacity` 50. A `{tier}` object, which the applicators preserve, reads as neutral 50 to `economic_capacity`
because that deriver stringifies the field (`causalState.js:794-795`).

---

## 3. The per-settlement picture

### 3.1 Generation (once) [OBSERVED `econ/prosperity.js:121-290`; re-read 115-295]

**Step 1, the base index** (a six-word base ladder Subsistence..Wealthy, index 0..5), the sum of:
- route base: crossroads or port 3; any connected class (road, river, …) 2; a disconnected thorp or hamlet 0; a
  disconnected village or larger 2 with working teleportation infrastructure and magic, else 1 (`:183-192`);
- tier: town and city +1, metropolis +2;
- economy slider (default 50): (p − 50) ÷ 40, so about ±1.25;
- magic: only when magic exists and its slider is above 25: (p − 25) ÷ 75 × a tier scale (village 0.3, town 0.6, city 1.0,
  metropolis 1.4);
- monster threat (default "frontier"): plagued −1, frontier −0.5;
- military slider above 75: −0.3;
- walls and a garrison at a crossroads or port: +0.3;
- economy-and-crafts institution count against a per-tier expectation (thorp 3, hamlet 8, village 13, town 22, city 13,
  metropolis 14): +1 at ≥ 1.3× expectation, −1 below 0.75×;
- income diversity: 7+ sources +0.5, 5+ +0.25.

The sum is rounded and clamped to 0..4 (Prosperous is the cap at this stage). The food-security modifier then applies
(`src/generators/foodGenerator.js:343-378`): a cap (famine caps at 0; deficits cap at Poor or Moderate), a penalty, or a
"bonus" — and the surplus bonus of 0.4 is passed through rounding, which makes it 0, so it never fires (`prosperity.js:263`)
[OBSERVED, both seats]. A settlement with a required economic institution and no stresses is floored at Poor. A
disconnected thorp or hamlet is forced to the base word Subsistence.

**Step 2, the emitted word** (`:121-172`): Subsistence becomes Struggling with probability 0.4 and Poor otherwise (the
comment's "30% luckier" branch is capped back to Poor); institution economy output ≥ 70 adds a rung (the only road to
Wealthy), < 15 removes one; an isolated thorp/hamlet is capped at Poor and a connected one floored at Poor; criminal
effectiveness ≥ 65 removes a rung; siege and famine force Struggling; occupation caps at Poor; ten other stress types
(indebted, politically fractured, plague onset, recently betrayed, monster pressure, insurgency, wartime, mass migration,
religious conversion, slave revolt) remove a rung each.

Generation is unflagged: LIT everywhere. It writes a bare string once (`econ/economicState.js:866`), the only generation
writer. An Edit-Mode re-derivation re-runs the whole generator from configuration and the record's seed
(`src/domain/edit/dmLayer.js:911-934`), and no edit-layer declaration names prosperity (grep of `src/domain/edit`: zero
hits), so a re-derived record carries a generation-fresh band [INFERRED; whether the store then writes it over a
pulse-moved band was not traced].

### 3.2 Boom and bust — upswing B2, the one continuous writer [OBSERVED `wp/upswingKernel.js:100-142`, `:594-706`, `:901-927`; re-read]

Inputs per settlement per tick: throughput = in + out from the M6d trade-flow tally — caravans arriving at or departing
from *this* settlement, decayed (`wp/upswingKernel.js:312-315`; `sp/tradeFlow.js:185-205`); centrality from the M6b
entrepôt ledger (0..1), earned only by *other* towns' caravans crossing it (`sp/entrepots.js:236-262`); the town's
**own** embattlement level > 0 (`wp/upswingKernel.js:609`; `sp/embattlement.js:302-305`); arteries = the settlement's
regional-graph neighbours whose relationship type contains trade, allied, vassal or patron (fewer than 2 ⇒ fragile); a
`vein_exhausted` condition. A boom therefore needs both halves at once: a pure waypoint has no throughput, a pure
terminus no centrality.

**What "embattled" means here** [OBSERVED `sp/embattlement.js:1-110`, `:175-294`; `wp/pulseKernel.js:2357-2397`]: a
per-settlement 0..1 scalar, materialised only on a canonized campaign, ramped from the town's own threat — a live war
front into it (weight 0.85), its occupation (0.75 × a rung term: contested 1, unstable 0.85, extractive 0.5, stabilized
0.3, vassalized 0.15; `:117-119`), its war-exhaustion scar (0.45), crime above 0.5 (up to 0.3)
and, for an entrepôt, a wartime targeting premium (0.3 × centrality, at most 0.2; `sp/entrepots.js:94-99`, `:204-210`),
minus a security relief of at most 0.25. The level only rises after the threat crosses 0.55 (hysteresis; exit below 0.3
after 6 ticks), then decays by 12% of its level a tick once calm (`sp/embattlement.js:82`, `:245-247`). So: a war front into the town alone embattles it; a fresh
(contested or unstable) occupation does unless security relief is high; a matured occupation, war exhaustion, crime, the
hub premium, or crime plus premium (≤ 0.5) cannot alone; crime and the premium can *keep* a town embattled after a war
(they hold the threat at or above the 0.3 exit); and a level of 0.8 takes about 29 weekly ticks to decay below 0.02
after the threat passes [INFERRED from the tuning]. A neighbour's war reaches a boom town only by collapsing its
throughput, never through this scalar.

- **Building**: throughput ≥ 3.0 with centrality ≥ 0.3 opens a building record; it continues while throughput ≥ 1.5 and
  centrality ≥ 0.3 (the hysteresis band); dwell keeps counting under embattlement, but the boom cannot mint while severed.
- **Mint** on the third sustained tick: a `boom` condition (severity 0.4), a regional "notable" news item, and an accrual
  primed at 0.14. The mint itself writes no rung.
- **Sustain**: +0.14 accrued per tick; whenever the accrual reaches 1 a whole rung is emitted. A probe of that arithmetic
  gives a rung every 7 ticks (an 8 every eighth step), so the first rung lands about ten weeks after throughput first
  qualifies [OBSERVED code + probe; re-checked: the DOCS seat said 8, the CODE seat 7]. Only the Wealthy cap stops it.
  There is no graceful cool-down: the code records "should booms cool gracefully?" as an owner question (`:644-653`).
- **Bust** on the town's own embattlement, throughput < 1.0, or a worked-out vein: −0.9 (rounds to one rung down),
  legitimacy −3, a "Trade Bust" crisis condition (severity 0.55, on trade connectivity, legitimacy and labour), a regional
  "major" news item naming the first artery; the bust record holds 3 ticks, then drops and building may begin again (but
  cannot mint while the town's embattlement level is still above 0). The bust writes no population directly; its
  condition slows growth through trade pressure (§5.6).

**Silent rungs.** Boom sustain steps produce a receipt only; the only news items are the mint and the bust
(the sustain branch at `:654-661` pushes a receipt; news is pushed only at the bust, `:641`, and the mint, `:699`)
[OBSERVED, my re-read]. Receipts are dropped at `applyPulseMover`. So the climb of a
booming town is recorded nowhere except in its current word.

**Geometry inside the condition** [OBSERVED `sp/entrepots.js:236-262`]: centrality is earned only at the *intermediate*
settlements of chosen caravan routes; a shipment's endpoints earn nothing from it. A terminus with heavy throughput but no
through-traffic cannot reach centrality 0.3 and never booms. Centrality is an average of crossings (decay 0.08, about a
12-tick memory, saturating at 6 crossings per tick, `:60-80`), so the 0.3 floor means roughly two through-caravans a tick
sustained [INFERRED from the steady state of that average].

### 3.3 Festivals — traditions [OBSERVED `wp/traditionsKernel.js:150-190`, `:245-410`, `:740-800`; re-read]

Each tradition has a yearly calendar window; a settlement holds 1–2 (thorp, hamlet), 2 (village), 3 (town), 4–5 (city),
5–7 (metropolis), 6–8 (the schema tier "capital", grandeur band 6) traditions, each with a grandeur `scaleBand` [Fable-reviewed 2026-10-18: the founding core's is the tier index; each addition's is drawn between a random birth tier and the tier index (`tr/genesis.js:394-398`); `:98` is the typedef's "aligned to tier index"; the −0.10/−0.20 scale-mismatch examples below are for the founding core] [OBSERVED `tr/genesis.js:111-126`, `:394-398`; STATED `:98`]. When a window opens:
- **Cancelled** (`wp/traditionsKernel.js:197`, `:245-256`) when the settlement carries any of six condition archetypes —
  `plague`, `famine`, `war_pressure` (minted on a raid's victim by relationship drift, by war deployment, a trade war and
  razing, and promoted from siege, war, monster or raider stressors), `vassal_extraction` (minted on a vassal by
  relationship drift, and promoted from occupation, vassal, tribute or annexation stressors), `trade_route_cut` (a DM
  cut-route event, `src/domain/events/mutateWorld.js:441-445`) and `occupation_burden` (the **occupier's** own garrison
  cost, `wp/occupation.js:1519-1522`, so a conqueror's festivals stop too) — or when a realm war stressor of type siege
  or occupation names it, or at rank 0 (Subsistence): legitimacy −1 (routed to the owner), no band step, and the record's
  last outcome becomes "cancelled", so the ratchet below neither climbs nor sinks that year. A rite suppressed under
  vassalage does not occur at all (§5.12).
- **Success score** = 0.55 + a prosperity term by rank (−0.25, −0.17, −0.08, 0, +0.05, +0.10, +0.15 for ranks 0..6) +
  seasonal severity (bountiful +0.08; drought in the warm half or hard winter in the cold half −0.12) + legitimacy (−0.10 at 0
  to +0.08 at 100) + owner-faction churn (−0.06, null until ownership lands) + wartime −0.08 + fresh calamity or trade bust
  −0.12, else boom/flourishing/reconstruction +0.08 + **scale mismatch −0.10 per step the grandeur exceeds the rank** +
  last year's streak (failure −0.04, triumph +0.03) + the pilgrim lift (§5.5, ≤ 0.10); clamped 0.05..0.95.
- **Outcome** from one draw on the world-seed year stream per (tradition, year): triumph below score − 0.25, good below
  score, modest below score + 0.15, troubled below score + 0.30, failure above.
- **Effects**: triumph +1 rung, failure −1; a "fair" that lands good or better at a settlement whose configured route class
  is a major, standard or seasonal trade tier earns +1 more (the "fair trade-lane pulse", `:358-364`); legitimacy +3 / +1 /
  −1 / −3; the dedicated deity's share ±1.

**The festival ratchet** [INFERRED: a uniform draw, legitimacy 50, no seasonal, war, calamity or streak terms, grandeur ≤
rank; probe in §11.3]. Expected rungs per tradition-year without a fair: Struggling −0.21, Poor −0.03, Moderate +0.13,
Comfortable +0.23, Prosperous +0.33, Wealthy +0.43 (capped). With a successful-fair pulse on a trade lane: Struggling +0.16,
Poor +0.43, Moderate +0.67. So festivals alone split the realm: settlements at Moderate or better climb toward Wealthy over
a few years (a town has three traditions), settlements at Struggling sink to Subsistence, where festivals stop and nothing
in this writer lifts them again. The scale-mismatch term damps large settlements at middling bands (a city's grandeur 4 at
Moderate costs −0.10; a metropolis's 5 costs −0.20), and streak and legitimacy (+3 per triumph) reinforce the direction.
Neither seat quantified this; it is the strongest single dynamic on the band in lit presets.

**A director's lever** [OBSERVED]: the festival draw is a registered fork (`HBF-85`, `wp/traditionsKernel.js:147-153`) that
a `pin-fork` decree can fix (`src/domain/edit/directives.js:208-214`; consulted at `wp/pulseKernel.js:362`). The pin bag is
assembled from every save's due decrees and keyed by the fork id alone, so a pin appears to fix every festival that opens
that tick, realm-wide [INFERRED from the flattening at `pulseKernel.js:362`; open question §10]. No shipped UI was found
that writes such a decree (grep of components, store and hooks for the directions module: none).

### 3.4 Grain purchase — generosity A2 [OBSERVED `sp/generosityEV.js:112-129`, `:650-694`; `wp/generosityKernel.js:280-291`, `:820-875`; `wp/generosityUpdates.js:109-150` whole]

Only as the fall-through after a **refused** gift on a bonded pair. Buyer conditions: rank ÷ 6 ≥ 0.25 (Poor or better;
an unknown word reads 0 and cannot pay), need ≥ 0.4, and the seller has grain above its reserve floor. The purchased
share is the smaller of need and rank ÷ 6; the buyer's debit equals that share in rungs (≤ 1), the seller's credit is 0.4 of
it; the sale completes only if grain actually moved. Deltas are summed per settlement per tick and then rounded.
Consequences [OBSERVED probe; re-checked]: a single purchase moves the buyer only if its debit exceeds 0.5 rung, which needs
rank ÷ 6 above 0.5 — Comfortable or better with need above 0.5. A Poor or Moderate buyer loses a rung only if two or more
purchases in one tick sum past 0.5. A seller gains a rung only if several sales in one tick sum past 0.5 (the code's own
note, `generosityUpdates.js:114-117`). No fraction carries between ticks.

### 3.5 Ransoms — roads [OBSERVED `rd/state.js:276-290`, `:465-505`; `wp/roadsKernel.js:340-353`, `:765-845`, `:1124-1131`]

Ransom term 13 + round(26 × importance) weeks (`rd/state.js:403`). At a term-end release: captor +1 rung for a captive of importance ≥ 0.7 (key or pillar) and
the captive's home −1 for a pillar (importance 1.0) only; a party ransom pays the captor's step only (the home is spared the step and the legitimacy hit, the coin being the adventurers'); a rescue, the captor's fall, occupation or peace release with no step (`wp/roadsKernel.js:827-836`) [Fable-reviewed 2026-10-18]; a third-party payer −1 (that arm is
BUILT DARK behind `thirdPartyRansomEnabled`, lit in no preset, `rd/thirdPartyRansom.js:7-38`).

### 3.6 Reconstruction and flourishing — upswing B1, B3 (readers) [OBSERVED `wp/upswingKernel.js:100-142`, `:426-592`, `:708-773`]

Reconstruction progress per tick = 0.06 + 0.06 × (rank ÷ 6) + 0.05 × builders + 0.10 × ally credit + 0.04 × peace, −0.18
on a new shock, at most 0.18; completion gives legitimacy +4, an institution upgrade, a history beat, and a corruption
"skim" when ally funds flowed and malice ≥ 0.55. Flourishing needs rank ÷ 6 ≥ 0.66, legitimacy ≥ 66 and peace for 6 ticks;
it lasts 16 ticks, cools down 12, may found an Academy, and never writes the band. Because 4 ÷ 6 = 0.667, **Comfortable
already qualifies**, against the comment's "≈ Prosperous+" (`:129`) [OBSERVED probe].

### 3.7 Settlement lifecycle (readers) [OBSERVED `wp/settlementLifecycleKernel.js:160-200`, `:310-330`; `wp/settlementLifecycleFirstClass.js:378-420`]

Satellite seeding drive = 0.05 + 0.30 if booming + 0.35 on a resource strike + 0.15 × (rank ÷ 6) + 0.25 × population
pressure + 0.20 on recent inflow; the integrator keeps 0.86 and adds 0.14 of the drive; it arms at 0.7; cooldown 52 ticks;
caps town 2, city 4, metropolis 6. Without a boom or strike the drive peaks at 0.65, so **prosperity alone never founds a
satellite** [INFERRED arithmetic, both seats]. Steading backing = 0.6 × (rank ÷ 6) + 0.4 × (1 − trade pressure). Satellites
lift the parent's food security and trade connectivity, never the band (`settlementLifecycleKernel.js:1105-1130`).
Resettlement: §4.

### 3.8 `economic_capacity` (the live proxy)

Seeded from the current word, so it follows every band step; then live conditions move it (§2): the war layer's costs
(`war_drain`, `war_exhaustion`, `war_mobilization`, `reinforcement_cost`; the occupied town's `occupation_resistance`;
the occupier's `occupation_burden`, offset by `war_spoils`) — lit only where the war layer is (DC, FS, or the
Living-World gate) — and a worked-out vein (`vein_exhausted`, behind `resourceDynamicsEnabled`, a WAVES key lit in RR, DC,
LR and FS, aspatial) [OBSERVED `src/domain/activeConditions.js:331-446`; `wp/resourceDynamicsKernel.js:334`, `:886-908`].
Vassal extraction and market shock do not move it (vassal extraction strains trade connectivity, legitimacy, faction power
and defence; a market-shock stressor is promoted to an export-market-loss trade condition, `src/domain/conditionPromotion.js`).
It is what migration, the culture distance, military capacity, mobilisation (cool floor 30), army funding, the merchant,
craft and labour NPC goals (`wp/npcLadderGoals.js:56-69`, behind `npcLadderEnabled`, ONE_REGEN: RR, DC, LR, FS), coup
(dark) and convergence read [OBSERVED both seats; this pass]. Its header calls prosperity "generation-frozen" and names
vassal extraction and market shock among its drainers (`causalState.js:776-780`); the four writers contradict the first,
the condition registry the second.

### 3.9 Things called "prosperity" that are not the band

- **Institution-lifecycle economy health** [OBSERVED `wp/institutionLifecycle.js:82-153`, `:680-770`]: the mean of trade
  connectivity, labour capacity, infrastructure condition and food security (÷ 100), plus a conquest-feed pulse (≤ 0.35;
  its loot channel halves in about 7 weeks and its captive channel in about 11, `wp/conquestFeeds.js:61`, `:71`, `:77`), minus mercenary upkeep, plus the entrepôt toll lift = 0.3 × clamp(c × min(1, c) − 0.35 c),
  which is positive only above centrality 0.35 and peaks near 0.195 at c = 1 (`sp/entrepots.js:85-93`, `:170-194`) [re-checked:
  0.3 is the weight, not the maximum]. "Prosperous" at ≥ 0.62, "declining" at ≤ 0.40, a dead band between that decays a
  streak (cap 10); builds need a streak of 3, closures 4. This is the only real hysteresis on any "prosperity" in the host.
  It reads neither the band nor `economic_capacity`, but the boom and Trade Bust *conditions* move two of its four inputs
  (the boom lifts trade connectivity by about 7 points; the bust cuts it by about 10 and drains labour), so a boom or a
  bust shifts health by a few hundredths through the causal scores [OBSERVED `src/domain/causalState.js:310-314`,
  `:766-768`; `wp/institutionLifecycle.js:131-140`; INFERRED magnitude from severity × 18 ÷ 4].
- PHASE4's "upkeep drag on prosperity" is a civilian development-value tilt; "mercenaries cost prosperity" is the health
  drain; EC S34's "prosperity lift above c 0.35" is the toll lift [STATED vs OBSERVED, DOCS seat].

### 3.10 Generation-only and display readers

Generation legitimacy gets −20 (Struggling), −10 (Poor), 0 (Moderate), +8 (Comfortable), up to +20 and is never recomputed
at runtime (`src/generators/factionDynamics.js:18-30`, `:127-161`). "Merchant Guilds (dominant)" fires only for Wealthy or the
dead word Thriving (`src/generators/power/rulingStructure.js:497-500`). The resilience dial gives +15 (Prosperous/Wealthy),
+8, 0, −8, −15 (`src/domain/state/deriveSystemState.js:104-132`). The treasury's tax scalar by rank is 0.45, 0.6, 0.75, 1,
1.2, 1.45, 1.7 (`wp/treasury.js:151-155`, dark).

Further readers found by the verification pass [OBSERVED this pass, §12]:
- **Condition severity**: a condition promoted from a stressor (at generation, `src/generators/steps/assembleSettlement.js:355`;
  in the crisis lifecycle, `src/domain/crisisLifecycle.js:316`) takes +0.06 severity when the band reads Subsistence, Struggling or Poor and −0.06 at Prosperous or Wealthy, by an
  exact-case string match (`src/domain/conditionPromotion.js:106-125`, used at `:157`) — only when the stressor carries no numeric severity of its own (`:201`), and the summed settlement modifier is clamped −0.25…+0.18 (`:124`) [Fable-reviewed 2026-10-18]. Unflagged.
- **The district wealth band**: each district carries one of six words (destitute, poor, modest, comfortable, wealthy,
  opulent), derived live from its category (noble 5 … residential and criminal 1) and nudged one step up at Prosperous or
  Wealthy and one down at Subsistence or Struggling, exact-case, string or `{tier}` (`src/domain/districtProfile.js:40`,
  `:303-334`). The v2 town layout derives every district (`tm/townLayoutV2.js:255`), carries the word on each quarter
  polygon (`:314`, `:645`) and extends the town wall to embrace an outer quarter that is wealthy or opulent (`:725-728`);
  the scene building fabric reads it (`src/domain/townScene/sceneBuildingFabric.js:77-80`); explanations, causal views
  and qualitative bands import the same deriver. Because only the arcane category (base 4) is unvalued and reaches
  "wealthy", a band step across Struggling/Poor can change whether an arcane quarter is walled [INFERRED from the base
  table and `:724-728`]. Unflagged; the v2 read applies to settlements carrying layout law 2.
- **The surveyor's autonomy signal** `settlement.prosperity.band` (`src/domain/autonomy/signalRegistry.js:116-122`): a
  typed stop condition of an autonomous run may name a band; the sixteen causal scores, `economic_capacity` among them,
  are registered too. Which shipped surface mounts autonomous runs was not traced.
- **The public gallery facet**: a published settlement's prosperity is snapshotted at publish or re-share time and offered
  as a filter chip (`src/lib/gallery.js:742`, `:986-995`; `src/components/gallery/GallerySidebar.jsx:91-92`) — a
  catalogue comparison across users' settlements, not a realm one, and stale after any band step.
- **The undercity**: the sewer ladder raises its extent with the band (cause `PROSPERITY_BAND`, weight 0.25, read through
  the corruption climate, `src/domain/undercity/sewerDerivation.js:31`, `:229`, `:401`) and colonisation reads the same
  climate (`src/domain/undercity/colonization.js:442`). BUILT, UNMOUNTED: no consumer of these derivations outside
  `src/domain/undercity` (grep; `wp/factionCompetition.js` imports only the high-water helpers).

### 3.11 What the band does not react to

No tick writer reacts to food, famine, harvest, plague, war (except via §3.2–3.3), corruption, the treasury, momentum,
tier change or population [OBSERVED both seats; my grep confirms only four label writers]. `wp/momentum.js` (1,297 lines)
has no prosperity token. Tier drift reads food, conflict, trade, legitimacy and disease pressures, never the band
(`wp/tierResourceDynamics.js:74-81`, `:119-175`). Granary capacity reads tier and institutions only
(`wp/foodStockpile.js:185-195`).

---

## 4. The realm picture

- **No aggregate.** No realm total, mean, normalisation, percentile or ranking of prosperity exists in the simulation
  [OBSERVED grep, both seats]. `prosperityRank` and `prosperityRank01` are ladder lookups, not ranks among settlements. A
  whole realm can sit at Wealthy; the only ceiling is the ladder. Unlike faith (local and global deity rankings), prosperity
  is purely per-settlement and absolute.
- **The one simulation ranking — resettlement donors** [OBSERVED `wp/settlementLifecycleFirstClass.js:382-418`]: live
  (non-remnant) settlements with ≥ 500 people are sorted by rank ÷ 6, then population, then id; the top three each give at
  most 1% of their people to a fallow remnant's rebirth; the rebirth load = 0.5 × the donors' mean prosperity + 0.25 ×
  route utility (crossroads, river, coastal or port 1, else 0.4) + 0.25 × the remnant's resources. The variable is named
  "nearby prosperity" and the receipt says "neighbouring", but there is no distance or neighbour test. The same pool serves
  the DM's forced resettlement. Resettlement itself is proposal-gated.
- **Realm-relative by construction** (prosperity-adjacent): entrepôt centrality is earned from the realm's own caravan
  traffic, so a boom needs a position in the realm's flows; migration richness competes among reachable destinations with a
  congestion brake (0.85), but is absolute `economic_capacity` ÷ 100, not "relative to the richest hub" as its doc line says
  (`sp/migration.js:237` against `wp/migrationKernel.js:236`). `entrepots.centralityGini` measures trade concentration and has
  no consumer [OBSERVED, CODE seat].
- **Display only**: the gazetteer's prosperity column and the "Where prosperity sits" histogram — both mis-sorted (§10, D1).
  An audit script counts rank transitions (`scripts/audit/behavioral-observation.mjs:545-555`, `:1008-1030`). Analytics of
  prosperity distributions are proposed only [STATED `docs/simulation-intelligence-layer.md:526`].
- **No realm history**: pulse history keeps 80 records (`wp/worldState.js:16`); wizard news keeps 240 entries world-wide
  (`wizardNews.js:21`); boom rungs and mover receipts are never in either.
- **Realm-scale dynamics** [INFERRED from §3.2–3.4]: in an RR-applied or FS realm the band drifts upward in aggregate —
  festivals ratchet above Poor, booms climb at hubs, and the downward forces (busts, festival failures, purchases by
  Comfortable+ buyers, pillar ransoms) are episodic. Struggling settlements fall to Subsistence and stick. The result over
  years is a polarised, top-heavy distribution, not a stationary one. [Fable-reviewed 2026-10-18: what the ratchet table (§3.3) establishes is the polarisation — Moderate and above climb, Poor is nearly flat (−0.03) and Struggling sinks; the aggregate direction depends on how many settlements generation seeds at Moderate or better (most connected ones, §3.1), so "upward in aggregate" is the usual case, not a law; J384 (1)'s relative rung does not rest on the direction.] Designed brakes on realm wealth are unbuilt (§7.3).

---

## 5. MOVEMENT BETWEEN SETTLEMENTS — every channel

Prosperity never diffuses, spreads, averages or presses as a field. Each channel below is a pair, a host read of its
neighbourhood, a realm-ranked pick or a belief. "Geometry" says what the channel reads of distance, adjacency, routes,
travel time, season and gates.

### 5.1 Purchase (generosity A2) — a band transfer, non-zero-sum
- Pair: a regional-graph edge of kind allied, trade_partner, vassal, patron or client (`wp/generosityKernel.js:273-275`,
  `:511-512`), with the receiver's need at or above the floor and a bond (0.7 trust + 0.3 pact strength) at or above the
  floor — a live obligation between the two waives those two floors but never the edge-kind test (`:513-518`). Direction:
  grain seller → buyer; payment buyer → seller.
- Rate: buyer −(min(need, rank ÷ 6)) rung, seller +0.4 of that, summed per tick, rounded (§3.4). Same tick; no shipment.
- Geometry: none — adjacency only. Need is scaled by believed need when distance-priced news is lit (`:505-509`). The
  design's "cheapest reachable surplus neighbour … riding shipments at hopWeeks" is unbuilt (`:72-73`, `:108-111`).
- Trace: a typed `trade_warmth` incident on the pair's relationship and a news item whose headline names both towns but
  whose settlement-id list is **empty** (`wp/generosityNews.js:143-163`) [OBSERVED, my re-read].
- Flag: `constructiveFlowsEnabled` — RR, DC, LR, FS; no spatial requirement.

### 5.2 Credit and overture (A3, A4) — no prosperity moves
Credit is a grain gift that mints an obligation maturing to repaid (trust) or defaulted (a grievance); inbound credit
accelerates reconstruction (`wp/upswingKernel.js:466-473`). The overture opens on give-stream warmth (0.6 after 6 ticks) with
a 0.04 trust nudge. Neither touches the band. Same flag.

### 5.3 Ransoms — a pair of opposite steps
- Pair: captor seat ↔ captive's home (↔ third-party payer, dark). Rates: §3.5.
- Geometry: named-NPC journeys over the digest with seasonal leg weeks (`wp/roadsKernel.js:812`); capture risk on embattled
  roads (`rd/state.js:270-272`).
- Flags: `roadsEnabled` (RR, DC, LR, FS) and an active spatial digest.

### 5.4 Boom arteries and busts — a neighbourhood presses a band down
- A boom names its artery neighbours (trade, allied, vassal, patron edges). It busts on the town's **own** embattlement —
  a war front into it, its occupation, its war-exhaustion scar, high crime on top of a war, or its own entrepôt premium
  in wartime (§3.2) — on a worked-out vein, or when its throughput collapses below 1.0. Neighbours count only through the
  last: a partner's war, a blockade of a partner, or a broken through-route that stops caravans arriving at or leaving the
  boom town knocks it down a rung [OBSERVED `wp/upswingKernel.js:607-617`, `sp/embattlement.js:302-305`; INFERRED for
  which neighbour events stop the caravans]. Embattlement lingers while it decays, so a boom town cannot re-mint for weeks
  after its war ends.
- Geometry: throughput is caravan arrivals and departures at the town over frozen routes; centrality is
  intermediate-node crossings of chosen routes (season enters route choice, `sp/entrepots.js:245-260`); embattlement is
  the town's own threat scalar, which routing reads as a danger cost on the hop through it. Arteries are graph adjacency,
  not drawn routes.
- Entrepôt brake 3 [OBSERVED `sp/entrepots.js:94-99`, `:204-210`; `wp/pulseKernel.js:2386-2388`]: a hub's centrality adds
  up to 0.2 to its own threat ramp, kept below the 0.55 entry threshold so wealth alone never embattles it; in a war it is
  the first target, and any level above 0 busts its boom. Needs the entrepôt ledger (commodity flow + canon: RR, FS) and a
  war input (the war layer: FS, or RR with the Living-World gate) [INFERRED from the ramp weights].
- Flags: `upswingArcsEnabled` + `commodityFlowEnabled` + canon ⇒ RR and FS only.

### 5.5 Pilgrim draw — neighbours' size lifts a host's festival [OBSERVED `tr/pilgrimage.js` whole, 104 lines]
- A "grand" rite (grandeur ≥ 3 with a procession, offering or fair; or any rite at grandeur ≥ 5) draws from the host's 8
  nearest reachable, mapped settlements by path cost. Draw = Σ population ÷ 6,000 × distance weight; lift = 0.10 × draw ÷
  (draw + 2), at most +0.10 on the host's success score. Visitors are never written; who came is discarded.
- Geometry: path cost, distance weight and the mapped test on the frozen digest; zero on aspatial campaigns.
- Flags: `traditionsEnabled` + canon.

### 5.6 Migration (M4) — people move toward `economic_capacity`, prosperity does not move
- Destination score = 0.32 closeness + 0.26 culture affinity + 0.24 safety + 0.18 richness × (1 − 0.85 × congestion) + 0.18
  refuge (`sp/migration.js:100-120`, `:245-266`); richness = destination `economic_capacity` ÷ 100. Culture affinity itself
  contains the economy gap (§5.8), so prosperity enters destination choice twice.
- Origin tolerance = 0.15 + 0.4 × origin `economic_capacity` ÷ 100 + 0.25 connectivity + 0.2 granary (the population seat's
  reading, `research/sf/population-system.md:416`, row C; host `sp/migration.js:78-81`) — richer origins lose fewer emigrants.
- Departures are caused by pressures, not by the band (`wp/populationDynamics.js:286-311`). The bust writes no
  population, but its Trade Bust condition raises the town's trade pressure twice — it lowers the trade-connectivity score
  and, as a crisis condition on trade connectivity, adds 0.16 (`wp/pressureModel.js:47-56`, `:266-273`) — and trade
  pressure is 0.14 of the stability term in the population rate, so growth slows and losses grow; the boom condition, a
  causal lift on trade connectivity (`src/domain/causalState.js:310-314`), does the reverse. The size is small: the whole
  trade term moves the monthly rate by at most about 0.0017, far below the 0.025 "severe" bar, and the bust is not a
  crisis-flight archetype, so a bust alone does not trigger mass emigration [INFERRED arithmetic from `:301-302`,
  `:120`, `:327`, `:445`]. The bust comment "M4 reads the fallen prosperity" (`wp/upswingKernel.js:622-624`) is right
  only in part: M4 reads `economic_capacity`, which follows the band down a rung (about 12 points), so a busted town is a
  weaker destination and a less tolerant origin *when* an emigration event occurs; M4 does not start one.
- Geometry: path cost, hopWeeks (median primary hop = 1 week, 1..52), route choice by embattlement and season, distance
  weight; arrival = tick + hopWeeks. Canon only.
- Flags: `migrationFlowsEnabled` (default true; RR, DC, LR, FS and BORN; off in QL, SC, NC) + canon + emigration events.

### 5.7 Resettlement and satellites — people move from the richest
Realm-wide donor pool (§4), no distance; proposal-gated. Satellites move founders parent → steading and lift the parent's
food security and trade connectivity, never the band. Satellite sites may carry a frozen-raster cell
(`wp/satellitesLedger.js:62-66`). Flag: `settlementLifecycleEnabled` (RR, DC, LR, FS).

### 5.8 Culture distance — a prosperity gap is cultural distance [OBSERVED `sp/cultureDistance.js:1-60`, `:170-182`; `wp/migrationKernel.js:160-175`]
The host's culture distance between two settlements weighs faith 0.30, alignment 0.25, **economy 0.18** (the absolute
difference of their `economic_capacity` ÷ 100) and governance 0.27, then shrinks by trade ties (up to 0.25) and shared
festival motifs (up to 0.20). It is read live (never from the digest) by migration, contraband at arrival gates and the
foreign-seat weight — and by the map module's territory culture term under J382(a).

### 5.9 Belief — the believed pull band
In belief presets (DC, LR, FS; non-omniscient information; canon) each observer holds a believed `pullBand` per settlement,
derived from the rank and softened by hunger, carried by the news and rumour channels and possibly stale
(`wp/beliefAxisSubjects.js:296-335`). It is the host's only audience-relative prosperity fact. RR is omniscient: no believed
prosperity exists there. Beside it in the same believed-conditions family sits `routePositionBand` — where a settlement
sits on the roads, from its configured route class (`economicState.tradeAccess`) shifted one rung up when generation
flagged it an entrepôt (`:319-320`) — the geometry-flavoured belief a player-side lens would show next to the pull band.
Both are configuration-and-band facts, not route geometry.

### 5.10 Tolls and conquest — they move health, not the band
The entrepôt toll lift and the conquest-feed pulse move lifecycle economy health only (§3.9). Treasury transfers, the
corruption web and information-statecraft prices are BUILT DARK.

### 5.11 Routes, travel time, seasons, gates, capacity — summary
No band writer reads travel time, except that ransoms take weeks of travel and the boom's inputs ride routed caravans.
Seasons enter only through traditions (seasonal severity; a seasonal route class counts as a trade lane, `wp/traditionsKernel.js:358-364`),
route choice for caravans and migrants, and road legs. The host's frozen territory and gates do not read prosperity:
territory is the nearest settlement per cell by cost [STATED PHASE55:1061, 1130]. Capacity: entrepôt crossings saturate at
6 per tick; no route capacity is enforced [STATED fp-physical-integration row C2].

### 5.12 Vassalage, raids and occupation — pair pressures that stop a band's festivals [OBSERVED this pass, §12]
- **Vassal extraction.** On every regional-graph vassal edge, relationship drift proposes a `vassal_extraction` condition
  on the vassal each tick with probability 0.14 + 0.18 × leverage, severity 0.28 + 0.32 × leverage + 0.18 × dependency,
  expiring after 6 ticks (`wp/relationshipRulesCore.js:586-640`; catalog `src/domain/activeConditions.js:91-97`). While it
  holds, the vassal's festivals are cancelled (§3.3): legitimacy −1, no band step, no ratchet that year. It also raises the
  vassal's trade pressure (a trade archetype, `wp/pressureModel.js:39`). Flag: `relationshipDynamicsEnabled` (default
  true; every preset but SC, and BORN; the Living-World gate's "Relationship drift" lane). The band effect is lit where
  traditions is: RR, DC, LR, FS.
- **Hostile raids.** On a hostile edge, drift proposes a raid that stamps `war_pressure` on the victim (probability
  0.1 + 0.18 × conflict stress, `wp/relationshipRulesAdversarial.js:291-313`); the victim's festivals are cancelled while
  it holds. Same flags.
- **Occupation.** The occupier's own `occupation_burden` (`wp/occupation.js:1519-1522`, war layer) cancels the
  **conqueror's** festivals; the occupied town's are cancelled by a realm occupation stressor or a promoted
  `vassal_extraction`.
- **Rite imposition (traditions T-4)** [OBSERVED `tr/relations.js:1-60`, `:97-187`, 397 lines, read in part;
  `wp/traditionsKernel.js:722-748`; `src/domain/rulingPowerSeat.js:290-294`]: a settlement whose *occupation-ledger* record
  has reached the "vassalized" rung — a matured conquest, not a regional-graph vassal edge — has a 0.3 per-year chance to
  take its overlord's grandest active rite (as a local copy, grandeur capped at its own tier band) and to have its own
  grandest non-founding, non-imported rite suppressed until the vassalisation ends; a suppressed rite does not occur.
  Vassalage therefore changes which observances step a vassal's band. Lit with traditions and the war layer (DC, FS; RR or
  LR only through the gate). **Adoption**: migrant influx from one origin reaching 12% of the destination's population
  over three years can transplant the origin's rite (`tr/relations.js:50-52`, `:315-333`); it reads the M4 in-transit
  columns, so it needs canon (`sp/migration.js:175-179`).
- **Guest right** [OBSERVED `rd/state.js:276`]: a host whose tradition window is open cuts the chance of detaining a
  visiting named NPC to 0.35×, which lowers ransom captures — and so the ransom band steps (§3.5) — during festivals
  [INFERRED chain: a detention opens a ransom]. Roads + traditions + canon.
- Geometry: none of these read distance or routes; they read graph edges, the occupation ledger and calendar windows.

---

## 6. Couplings with the rest of the simulator

**Writers of the band** (§3): generation (`econ/economicState.js:866`) and four tick applicators. Pulse order within a tick
[OBSERVED `wp/pulseKernel.js`]: entrepôts (`:866`) … generosity (`:2561`) → upswing (`:2614`) → lifecycle (`:2630`) → the
growth chain (ladder, traditions, roads, then commons, assize and density, which write no band; `:2735`); each reads the freshest settlement update, so steps compose
within a tick.

**Readers of the band**: `economic_capacity`'s baseline; upswing B1/B2/B3; purchase affordability; traditions (score,
cancellation, scale mismatch); satellite seeding and backing; resettlement ranking; corruption climate (spawn −0.15,
onset −0.06, exposure +0.12, capture advance −0.05, capture recovery +0.08, all × `prosperityRank01`;
`src/domain/corruption.js:159-167`, `:486-487`) and corruption reform (0.05, `wp/corruptionImpair.js:132`); corruption web,
counter-intel and information statecraft affordability floors (dark); naval fleet affordability; chaotic receptivity and the
secular sink (deity worlds); the believed pull band; the treasury (dark); generation legitimacy, merchant dominance and
neighbour strength (`src/generators/neighbourGenerator.js:133-145`); the resilience dial; the herald, gazetteer and
comparisons; the compendium's seven-rung reading ("Not a dial you set. An output you read.", `src/domain/compendium/bandLadders.js:220`);
the town v2 layout, interior, building dress and scene; the district wealth band (v2 ward walls, scene fabric,
explanations); the severity of stressor-promoted conditions; the surveyor's autonomy stop signal; the gallery facet; the
unmounted undercity sewer ladder (§3.10); the dormant condition grammar.

**Readers of `economic_capacity`**: M4 migration (richness 0.18, origin tolerance 0.4), culture distance (0.18 of the core),
military capacity (economy facet weight 0.10, `wp/militaryStrength.js:75-80`, `:245-251`) — read by the war layer, by roads
(`wp/roadsKernel.js:75`, `:1031`) and by trade salience — mobilisation (cool floor 30), reinforcement (0.26), army funding,
strategy, coup (behind `economicCoupReadEnabled`, lit nowhere), convergence, the cause word "underfunded", the dark
demographics wave (prosperity weight 0.16 push and pull, `wp/demographicsPushPull.js:149`, `:347-350`), and the
merchant, craft and labour factions' NPC ladder goals, whose domain signal it is (`wp/npcLadderGoals.js:56-69`; a band step
can carry a merchant's goal across its threshold and credit its standing [INFERRED]).

**Faith** [OBSERVED `wp/religiousContest.js:144-162`, `:199-201`; `wp/beliefAxisSubjects.js:150-160`]: crisis disorder
includes 0.20 × (1 − rank ÷ 6) and lifts only chaotic creeds (up to 0.6 × disorder); the unaffiliated sink's secular pull
rises as disorder falls, so comfort feeds secular drift [OBSERVED by the DOCS seat at `:920-933`; INFERRED chain];
festivals nudge the dedicated deity's share ±1. Faith never writes prosperity. Agrees with `research/sf/faith-system.md:641`.

**War and plague**: war reaches the band only through boom busts on the town's own embattlement, festival cancellation
(war pressure, occupation, the occupier's burden, vassal extraction) and penalties, rite suppression under a matured
vassalisation, and the end of flourishing; it moves `economic_capacity` directly (`war_drain`, `war_exhaustion`,
`war_mobilization`, `reinforcement_cost`, `occupation_resistance`, `occupation_burden`; `war_spoils` lifts it). Plague
neither reads nor writes the band in live code (no prosperity token in the pestilence, calamity or stressor kernels except
one comment line, `wp/stressorGates.js:539`); it cancels festivals as a hard stressor and lifts chaotic receptivity through
disorder [OBSERVED both seats; agrees with `research/sf/plague-system.md` §3.12, first paragraph, for the pulse lanes. Fable-reviewed 2026-10-18: that note's §3.12, second paragraph, said a DM Apply-stressor plague reruns `economicState` and drops a rank at once; at 81f1cd96 no economy pass runs on the event (`src/domain/events/mutateWorld.js:681-690` → `crisisOnset`, `src/domain/crisisLifecycle.js:300-330`; `src/domain/events/eventPipeline.js:37-44`; `registryRerunKeys.js` is a freshness classifier, `:19-30`, read by `src/domain/display/economyFreshness.js` alone, whose `:6-12` say the band keeps its generation value) — the authored stress persists in `config.stressorEdits` and lowers the *generated* band only at the next Regenerate Draft or Edit-Mode re-derivation (`src/generators/steps/resolveStress.js:126-177`; `prosperity.js:160`), the path open question (a) names; the plague note is corrected by this lane].

**Feedback loops** [INFERRED from the cited code]: prosperity → festival success → prosperity (the ratchet, §3.3);
boom → rung → satellites → tributary lift to trade connectivity → indirectly more flow; boom fragility → bust → −rung and
−legitimacy; boom centrality → wartime targeting premium → embattlement → bust (entrepôt brake 3); vassalage → extraction →
cancelled festivals → no ratchet for the vassal; prosperity → corruption resistance, while reconstruction aid → skim → corruption; prosperity → secular drift →
(via crisis) revival; prosperity → flourishing → Academy, deliberately with no return to the band (`wp/upswingKernel.js:708-714`).

**Couplings promised by documents but absent**: food → prosperity at tick (EC rows M7, M8); plague → prosperity (EC M11);
granary capacity ← prosperity (PHASE55 §4i); low prosperity → emigration push (PHASE55 §4c; only in the dark demographics
wave); prosperity → plague resistance (PG pg-2); prosperity → grade demand (EC-7, EC-8); prosperity → tribute size
(TRIBUTE); prosperity → town fabric drift (MF §11.4); pilgrims carrying prosperity (UPSWING B4).

---

## 7. STATUS — by mechanism and preset (checked in code at `81f1cd96`)

### 7.1 Lighting, the birth door and the Living-World gate [OBSERVED; probe `table.mjs`]

The writers' flags are VIRTUAL keys grouped as WAVES (`upswingArcsEnabled`, `constructiveFlowsEnabled`,
`settlementLifecycleEnabled`, …) and ONE_REGEN (`traditionsEnabled`, `roadsEnabled`, …); they are absent from the defaults
and spread only into RR, DC, LR and FS (`wp/simulationRules.js:868-910` and the other presets). `commodityFlowEnabled` is in
RR and FS only. A new campaign from `createCampaign` gets `newCampaignSimulationRules()` with
`NEW_CAMPAIGN_SIMULATION_PRESET_ID` = null, i.e. the plain normalised defaults (`:7-31`, `:1552-1558`). The probe shows that
this BORN rule set normalises to the preset id `realistic_regional` (preset identity compares only the legacy boolean
surface) while every prosperity writer's flag is undefined. RR's own comment says a world "born into this preset" runs the
anti-stasis stack from its first tick and names the paths that do apply it: the Instant World composer's fallback tone and
the realm dialog's default chip (`:886-892`) [STATED]. Installed legacy saves likewise re-infer RR without the keys.

The premium Living-World gate lights three lanes per campaign — relationship dynamics, the war layer, faith spread
(`src/components/settlements/LivingWorldGates.jsx:55-73`) — none of them a prosperity writer; it also offers the one-shot
"Map geography" canonisation, which is what makes boom/bust, ransoms, the pilgrim lift and M4 reachable.

### 7.2 Table

Legend: LIT = runs; lit\* = runs only on a spatially canonized campaign; inert = flag on but an input never exists; — =
dark. BORN = a `createCampaign` campaign.

| Mechanism | QL | RR | DC | SC | NC | LR | FS | BORN | Gate (where) |
|---|---|---|---|---|---|---|---|---|---|
| Generation band | LIT | LIT | LIT | LIT | LIT | LIT | LIT | LIT | unflagged |
| `economic_capacity` baseline | LIT | LIT | LIT | LIT | LIT | LIT | LIT | LIT | unflagged |
| `economic_capacity` war-cost drains (`war_drain`, `war_exhaustion`, `war_mobilization`, `reinforcement_cost`, occupation conditions) and `war_spoils` | war | war | LIT | war | war | war | LIT | war | war layer (DC, FS; elsewhere the Living-World gate) |
| `economic_capacity` vein drain (`vein_exhausted`) | — | LIT | LIT | — | — | LIT | LIT | — | `resourceDynamicsEnabled` (WAVES), aspatial (`wp/resourceDynamicsKernel.js:31-35`, `:334`); the vein *bust* needs a boom (RR, FS, canon) |
| Boom/bust writer (B2) | — | lit\* | inert | — | — | inert | lit\* | — | `upswingArcsEnabled` + `commodityFlowEnabled` + canon (`sp/commodityFlow.js:172-177`; `sp/entrepots.js:144-146`) |
| Reconstruction, flourishing (B1, B3) | — | LIT | LIT | — | — | LIT | LIT | — | `upswingArcsEnabled`; aspatial |
| Purchase writer (A2); credit, overture | — | LIT | LIT | — | — | LIT | LIT | — | `constructiveFlowsEnabled` (`sp/generosityEV.js:925-938`); aspatial |
| Festival steps + fair pulse | — | LIT | LIT | — | — | LIT | LIT | — | `traditionsEnabled` |
| Festival cancellation by vassal extraction, raids, a cut route, the occupier's burden (§5.12) | — | LIT | LIT | — | — | LIT | LIT | — | `traditionsEnabled` ∧ the condition's source: `relationshipDynamicsEnabled` (default true, off in SC; `wp/simulationRules.js:68`, `:970`) for extraction and raids; war layer for occupation burden; a DM event for a cut route |
| Rite imposition and suppression (T-4); adoption | — | war; adoption lit\* | LIT; adoption lit\* | — | — | war; adoption lit\* | LIT; adoption lit\* | — | `traditionsEnabled` + occupation-ledger "vassalized" (war layer: DC, FS, or the gate); adoption + canon (`sp/migration.js:175-179`) |
| Pilgrim lift | — | lit\* | lit\* | — | — | lit\* | lit\* | — | + digest (`tr/pilgrimage.js:81-84`) |
| Ransom captor/home steps | — | lit\* | lit\* | — | — | lit\* | lit\* | — | `roadsEnabled` + digest (`wp/roadsKernel.js:340-353`) |
| Ransom payer step | — | — | — | — | — | — | — | — | BUILT DARK `thirdPartyRansomEnabled` (no preset) |
| Entrepôt wartime premium into the boom town's embattlement (brake 3) | — | lit\*, war | inert | — | — | inert | lit\* | — | commodity flow + canon (entrepôt ledger) and a war input (`sp/entrepots.js:94-99`, `:204-210`) |
| Satellites; resettlement ranking | — | LIT | LIT | — | — | LIT | LIT | — | `settlementLifecycleEnabled`; resettlement proposal-gated |
| M4 richness / tolerance | — | lit\* | lit\* | — | — | lit\* | lit\* | lit\* | `migrationFlowsEnabled` (default true) + canon + emigration |
| Corruption climate | part | LIT | LIT | — | LIT | LIT | LIT | LIT | `npcAgencyEnabled` / `factionCompetitionEnabled` (QL: agency only; SC: both off); mount not traced |
| Corruption web, counter-intel, information statecraft floors | — | — | — | — | — | — | — | — | BUILT DARK (`corruptionWebEnabled` not in the register; `infoStatecraftEnabled` dormant) |
| Naval fleet affordability | — | lit\* | lit\* | — | — | lit\* | lit\* | — | `navalEnabled` + spatial |
| Treasury tax scalar | — | — | — | — | — | — | — | — | BUILT DARK `treasuryEnabled` (engine-gated dormant; promised to DC/LR/FS "after the band chip", `wp/simulationRules.js:470-473` [STATED]) |
| Demographics push/pull prosperity term; coup economic read | — | — | — | — | — | — | — | — | BUILT DARK (`demographicsEnabled` false in FS, absent elsewhere; `economicCoupReadEnabled` nowhere) |
| Chaotic receptivity, secular sink | deity | deity | deity | deity | deity | deity | deity | none | deity-gated, no flag; born worlds seat no deity |
| Believed pull band; believed route-position band | — | — | lit\* | — | — | lit\* | lit\* | — | `believedConditionsEnabled` + non-omniscient + canon (RR is omniscient) |
| NPC ladder goals on `economic_capacity` (merchant, craft, labour) | — | LIT | LIT | — | — | LIT | LIT | — | `npcLadderEnabled` (ONE_REGEN) |
| Lifecycle economy health | LIT | LIT | LIT | — | LIT | LIT | LIT | LIT | `institutionLifecycleEnabled` (off in SC); toll lift needs commodity + canon (RR, FS); conquest feed needs the war layer (DC, FS, or the gate) |
| Military capacity economy facet | war | roads\*, war | LIT | war | war | roads\*, war | LIT | war | war layer (DC, FS, or the gate); roads (RR, DC, LR, FS, canon); trade salience |
| Herald word, gazetteer, comparisons, resilience | LIT | LIT | LIT | LIT | LIT | LIT | LIT | LIT | UI (sorts broken, §10) |
| Town v2 attractor strength | v2 | v2 | v2 | v2 | v2 | v2 | v2 | v2 | settlements carrying layout law 2 (`tm/townMapModel.js:348-354`) |
| District wealth band (v2 ward walls; scene fabric; explanations) | LIT | LIT | LIT | LIT | LIT | LIT | LIT | LIT | unflagged derivation (`src/domain/districtProfile.js:303-334`); the wall read only in v2 (layout law 2) |
| Condition-severity modifier by band | LIT | LIT | LIT | LIT | LIT | LIT | LIT | LIT | unflagged (generation, crisis lifecycle; `src/domain/conditionPromotion.js:121-123`) |
| Autonomy stop signal `settlement.prosperity.band` | reg | reg | reg | reg | reg | reg | reg | reg | registered (`src/domain/autonomy/signalRegistry.js:116-122`); mount not traced |
| Gallery prosperity facet | LIT | LIT | LIT | LIT | LIT | LIT | LIT | LIT | UI; a publish-time snapshot (`src/lib/gallery.js:742`, `:994`) |
| Undercity sewer extent, colonisation economy | — | — | — | — | — | — | — | — | BUILT, UNMOUNTED (no consumer outside `src/domain/undercity`) |
| Condition grammar (ornament, tracery, material) | — | — | — | — | — | — | — | — | BUILT DARK, no shipped consumer (two dormant siblings in its folder import it, `tm/arch/settlementDress.js:37`, `tm/arch/conditionParams.js:46`; `tm/arch/conditionGrammar.js:9`) |

"war" in any row means: only where the war layer is lit for that campaign (DC and FS carry it; elsewhere the DM lights it
through the Living-World gate, whose war lane needs relationship drift); "roads\*" means the roads mover's capacity read
on canonized campaigns; "reg" means registered as a vocabulary entry, with no lit/dark gate of its own. The rows from
"Festival cancellation" down to "Undercity" were added by the verification pass (§12).

### 7.3 Designed only (no code, or no lit path)

1. EC-7 grade profile ("fine" goods need a profile institution and Comfortable+; "rough" at Struggling/Poor; household
   demand by band) and EC-8 grade envelope (≥ Prosperous for 26 ticks promotes, ≤ Poor for 26 demotes) — UNBUILT; FOLD's
   TR→EC row reads "EC-0..EC-18 entire" [STATED EC:1440-1530, 1583-1590, M47 at 2306; FOLD:340].
2. PG pg-2: prosperity (as `economic_capacity` ÷ 100) lowers plague onset and duration — UNBUILT (`contagionEnabled` has no
   src hits) [STATED PG:198-248].
3. MF fabric: a material palette by band, ward wealth *stratification* and §11.4 **prosperity drift** (high street
   widens, parcels consolidate or subdivide) — UNBUILT and ruled out of FP into the map family (OD-FC-38) [STATED MF:334,
   374-375, 417]. What is unbuilt is the stratification and the drift; a per-district wealth *word* exists and is read by
   the v2 plan's wall (§3.10).
4. Tribute indexed to the loser's band each period ("prosperity is an index, never a medium") — DESIGNED ONLY, zero src hits
   [STATED TRIBUTE:105, 850, 938-939, 1260-1265, 2407].
5. Granary capacity from prosperity (PHASE55 §4i, :664) — the code reads tier and institutions only.
6. UPSWING B4 pilgrims carrying prosperity and faith along routes — UNBUILT [STATED UPSWING:114-117].
7. Prosperity distribution analytics — PROPOSED [STATED simulation-intelligence-layer.md:3, 245, 526].

---

## 8. MAP TOUCHPOINTS — today, and what a prosperity lens needs and could add

### 8.1 Where prosperity reads geometry today [OBSERVED]

| Reader | Geometry | Source |
|---|---|---|
| Generation | none — the configured route class `config.tradeRouteAccess` (and monster threat) | `econ/prosperity.js:182-192` |
| Boom/bust | caravan arrivals and departures at the town over frozen routes; centrality at intermediate route nodes (seasonal route choice); the town's own embattlement scalar (canon only; routing reads it as hop danger); graph adjacency for arteries | `wp/upswingKernel.js:312-345`, `:609`; `sp/entrepots.js:236-262`; `sp/embattlement.js:302-305` |
| Festival fair pulse | the configured route class (a "seasonal" class counts) | `wp/traditionsKernel.js:358-364` |
| Pilgrim lift | path cost, distance weight, mapped test to the 8 nearest reachable | `tr/pilgrimage.js:79-104` |
| Ransoms | seasonal road legs in hop weeks; embattled roads | `wp/roadsKernel.js:812`; `rd/state.js:270-272` |
| M4 richness / tolerance | path cost, hop weeks, route choice by danger and season, distance weight | `wp/migrationKernel.js:217-264` |
| Satellites | territory partition, cost field and gates sampled read-only; optional site cell | `wp/settlementLifecycleKernel.js:52-60`; `wp/satellitesLedger.js:62-66` |
| Upswing peace | graph war fronts, naval blockades (adjacency) | `wp/upswingKernel.js` (peace read) |
| Generosity, resettlement | adjacency only / none (realm-wide) | §5.1, §4 |
| Festival cancellation by vassalage, raids, occupation; rite imposition | graph edges (vassal, hostile); the occupation ledger; calendar windows — no distance | §5.12 |
| Believed route-position band | the configured route class + generation's entrepôt flag — no geometry | `wp/beliefAxisSubjects.js:319-320` |
| District wealth band (town map) | the v2 plan's quarter polygons and wall radius | `tm/townLayoutV2.js:255`, `:314`, `:645`, `:725-728` |
| (dormant) world-map burg → configuration | would set the route class from the world map's burg port flag (port ⇒ base 3, else road ⇒ base 2); no caller in `src` (tests only) | `src/store/mapSlice.js:871-888` |
| Culture distance (economy term) | none — live state, never the digest | `sp/cultureDistance.js:23-27` |

No prosperity path writes the frozen digest. All seven presets carry spatial mode "ignore" [OBSERVED probe]; canonisation
is a per-campaign act (the Living-World gate's "Map geography").

### 8.2 What the maps show today

- **World map**: nothing colours or marks prosperity. The herald register (a map-panel table and sentence) prints the
  lower-cased word for every settlement to every audience; numbers (population, threat) are DM-only
  (`map/heraldRegister.js:30-35`, `:100-180`). The gazetteer column and the comparisons histogram are mis-sorted (§10, D1).
- **Town map**: the v2 layout reads `prosperityRank01` on every model build to set resource-site attractor strength (0.5 +
  0.4 × p), which bends the economic field the plan is grown on (`tm/townLayoutV2.js:338-343`, `:431-439`;
  `tm/asymmetrySources.js:120`). The model is a pure function of the live settlement (`tm/townMapModel.js:330-354`), so a
  band step changes the inputs of the next build [OBSERVED]; whether the visible plan then shifts was not traced
  [INFERRED risk to "the settlement map never changes"]. The v1 layout reads the band only through each district's wealth word, which it carries on the model (`tm/townMapModel.js:368`, `:400`, `:485`) and does not draw with [Fable-reviewed 2026-10-18]. The interior, building
  profiles and cartography read private ladders for furnishing, scale and masonry. The condition grammar (cuts 0.30 / 0.50 /
  0.75 → ornament density, tracery family, timber/stone/marble) is dormant. The v2 plan reads the band a **second** way:
  through each district's wealth word (§3.10), which decides whether the town wall bends out to embrace an outer quarter
  (`tm/townLayoutV2.js:725-728`), so a band step can also change the wall line of a re-built plan [INFERRED; the visible
  effect was not traced, open question (b)].

### 8.3 What a prosperity lens needs from the host (read-only facts that exist)

1. The band per settlement (the word; rank on the seven-rung ladder, case-insensitive, string or `{tier}`).
2. The campaign's **resolved** rules — the writer flags and canon — not the preset id (the birth door, §7.1).
3. Boom records (`spatialLedgers.upswing.boom`: phase, arteries, fragile, entered tick) and the boom / Trade Bust
   conditions (tick in the id); reconstruction and flourishing records.
4. Dated news: boom mint, bust, purchase (names only), festival beats, ransoms, resettlements.
5. The digest's path cost and distance weight (pilgrim catchments; M4 columns as the population lens draws them).
6. The believed pull band per observer (belief presets only).
7. The configured route class (to explain generation and the fair pulse), and its believed form, the route-position band.
8. The district wealth band per district (six words, derived live from category and band; `src/domain/districtProfile.js:40`,
   `:303-334`) — a host fact a town lens may show.
9. The festival-stopping pair pressures: active `vassal_extraction` / `war_pressure` conditions with their source edge,
   suppressed rites (`suppressedBy`) with the overlord (§5.12).

### 8.4 What it could add without inventing host facts [INFERRED]

- Band glyphs with a seven-step legend that includes Subsistence.
- Condition markers: boom (arteries drawn as graph links; "fragile" when fewer than two), bust, flourishing,
  reconstruction.
- Dated pair links: purchase buyer→seller (from the `trade_warmth` incident or the news headline), ransom captor↔home.
- Resettlement donor lines legended "the realm's richest", never "neighbours".
- Pilgrim catchments: the host plus its 8 nearest reachable by digest cost, for grand rites only.
- A "through-route" mark for settlements that sit at intermediate route nodes (one of a boom's two preconditions; the other is heavy own-endpoint traffic) — derived from
  the host's own route choice, declared as a presentation.
- A band-change timeline from the map's own per-advance snapshots (§9.3).
- A town lens of district wealth words (the host's own derivation), with the legend saying the word is category plus a
  one-step band nudge, not a measured ward economy.
- Vassal and raid marks on a settlement whose festivals are stopped, linked to the overlord or raider; a suppressed-rite
  mark on a vassal.

### 8.5 What would be invention today

Any continuous prosperity field, gradient or "hinterland wealth" fill presented as a host fact (prosperity does not
diffuse); ward wealth *stratification*, slums or the MF §11.4 drift (the per-district wealth word is a host fact, §8.3
item 8); grade demand; travelling relief or purchase caravans (the purchase has no
route); a cause for any band (the host keeps none); pilgrim flows with sources.

### 8.6 Host changes that would make more of it real (the owner's to schedule)

1. A persisted band-change receipt {settlement, from, to, writer, tick} — the one change every other use needs.
2. Settlement ids on the purchase news item (today an empty list).
3. A distance term in the resettlement donor pool (or the honest word "richest").
4. Generation's route class derived from the canonized routes (would make PHASE55 §4b's "crossroads towns become wealthy …
   derived from position" true) — a genesis-time change.
5. The purchase or relief riding shipments with hop weeks (UPSWING A2 as designed).
6. MF §11.4 sourcing the band (in the map family by OD-FC-38).
7. A caller for the dormant `mapSlice.burgToConfig` (or a canon-time equivalent) would let the world map's port flag set
   the route class, and so generation's route base — a narrower form of item 4.

---

## 9. How this changes the map module's current readings — concrete and numbered

### 9.1 Territory (J377 T2, J378's civil part "tier, size, prosperity band")

1. **Read the seven-rung band, not a 0..1 table and not `economic_capacity`.** The owner's word is the band; the host has
   three numeric readings of it that disagree on every rung (rank ÷ 6, `prosperityRank01`, the capacity seed). Use the rank
   0..6 on `PROSPERITY_TIERS`, case-insensitive, accepting a string or `{tier}`, with Subsistence included (the simulation can
   write it), and state the mapping in the legend. `economic_capacity` is live but noisy (war drains it) and is not stored.
2. **Relativise or bound the term.** The band is absolute and, in lit presets, drifts upward realm-wide (§3.3, §4). An
   exponential strength term in an absolute band would grow every border together over years. Options for the owner: take
   the band relative to the realm median (or to the neighbours') at each dated advance; or make it a bounded multiplier
   whose top is reached at Comfortable; in either case keep the per-tier ceiling as the hard bound. [Fable-reviewed 2026-10-18: ruled since by J384 (1) (`docs/PROGRESS.md:443`): relative to the realm's held median rung, clamped ±3, read only at dated revisions with the 13-week dwell, and made log-linear by J385 gap 4 (1.1 per relative rung; V13 §2.3, §3.9 (7)).]
3. **Bring hysteresis and a ledger.** The host has no hysteresis on the band and no history. Festivals can jitter a town
   ±1 year on year; booms climb a rung every seven weeks silently. Re-derive borders only when a new rung has held for N
   advances (or on a two-rung change), and keep a per-advance band snapshot (one word per settlement) as the map's own
   dated record. Where the boom drives the change, key on the boom's own records (enter at throughput 3.0 with centrality 0.3 after a 3-tick dwell that survives dips to 1.5; a bust below 1.0 or on embattlement; the mint and
   bust are dated news) [Fable-reviewed 2026-10-18: "exit 1.5" contradicted this note's own §3.2 — 1.5 is the building-phase floor, not a boom exit (`wp/upswingKernel.js:644-653`); and the design keys on the seat's relative rung held 13 weeks, not on the records (J384 (1); V13 §3.9 (7)), as the trade lane's RL-6 records for `research/sf/trade-system.md` §9 item 6], as `research/sf/trade-system.md` §9 item 6 proposed.
4. **Count prosperity once.** It already enters J382(a)'s culture resistance (0.18 of the core culture distance is the
   `economic_capacity` gap, `sp/cultureDistance.js`). It would enter J378's military tie-breaker only if the map's military bands (this reading's "garrison and
   standing bands" at the map revision 7d7f562; at the current tree neither quoted phrase survives in `docs/AMENDMENTS-2026-10-17m.md`, whose :630 says the host has "never a garrison and standing split", and J-RR.52 is at
   `research/sf/fp-realm-review.md:611`) were banded from the host's composite military capacity, whose facets are manpower
   0.26, institutions 0.24, materiel 0.20, logistics 0.12, economy 0.10 and will 0.08 (`wp/militaryStrength.js:75-82`); the
   host has no facet named garrison or standing [Fable-reviewed 2026-10-18: ruled since by J384 (4) (`docs/PROGRESS.md:443`): the military bands read the host's capacity facets manpower, institutions, materiel, logistics and will, renormalised, EXCLUDING the economy facet, "so prosperity is counted once" — the second option below, taken; carried by J-RR.52 (`fp-realm-review.md:611`) and V13 §2.2 `PolitySeat.military`]. If the civil term also takes
   the band, prosperity counts twice or three times. Either accept and document the small shares, or band the military
   strength without the economy facet (and the military term is a tie-breaker inside debatable land only, so its share
   matters only there).
5. **Default-preset honesty.** On a BORN campaign the band never moves; on an RR-applied but uncanonized campaign it moves
   by festivals and purchases only; boom/bust needs RR or FS with canon. The territory lens must read the resolved rules (the
   preset id alone says "Realistic Regional" for a campaign with no writers) and say when its prosperity term is static.
6. **Marches and patrols.** The host couples nothing about marches or patrols to prosperity. The one real link: a boom
   town's *own* embattlement busts it — a war front into it, its occupation, or its hub premium in wartime — a dated host
   event a contested march can cite when the boom town itself is the one fought over; a war elsewhere on the march reaches
   it only by collapsing its caravans. The embattlement scalar lingers for weeks after the fighting (§3.2), so the bust
   and the blocked re-mint can outlast the march's fighting overlay. Patrol density should
   not read prosperity unless the owner rules it as a map-side rule.
7. **Vassal chains do not pool wealth.** No band is pooled or tributed along vassal or patron edges (indexed tribute is
   designed only). But those edges are not inert for prosperity: they count as boom arteries; they admit grain purchases
   (a pair transfer of rungs, §5.1); a vassal edge mints `vassal_extraction` on the vassal, which cancels every festival
   whose window opens while it holds — a large share of the year if each proposal lands [INFERRED: a 6-tick condition
   re-proposed at 0.14–0.32 a tick] — freezing the festival ratchet both ways: a Moderate-or-better vassal loses its climb,
   a Struggling one is spared its fall (§3.3, §5.12); and a matured occupation at the
   "vassalized" rung imposes the overlord's rite and suppresses one of the vassal's. Chain reinforcement should not add the
   vassals' bands to the overlord's; a territory or prosperity lens may cite vassalage as a dated *cause* of a vassal's
   stalled band.
8. **Generation wealth is a configuration fact.** A settlement placed at a crossroads on the native map keeps the band its
   configured route class gave it. The map should show the configured class as a host fact and lint mismatches with its own
   routes, not override; a host change (§8.6 item 4) would close the gap.

### 9.2 Religion (J379; `research/sf/faith-system.md` §9.6)

9. **Add prosperity as a named cause, not a carrier.** Inverse prosperity is 0.20 of crisis disorder (chaotic creeds only),
   comfort feeds the secular sink, and festival outcomes move the dedicated deity's share ±1 — all local and deity-gated. A
   religion lens may cite the band among the causes of a share change; it never spreads prosperity or faith along routes
   (UPSWING B4 is unbuilt). This extends §9.6 item 8 ("culture as a resistance term already exists inside faith").
   One cross-settlement case exists: a rite imposed under a matured vassalisation carries the overlord's patron deity, so
   its festival outcomes move *that* deity's share in the vassal [INFERRED from `tr/relations.js` (the imposed copy keeps
   the overlord's `deityRef`) and the per-rite faith step in `wp/traditionsKernel.js`]; a religion lens may draw it as a
   dated overlord→vassal link, war layer only (§5.12).
10. **The pilgrim catchment is shared and honest — as a catchment.** §9.6 item 7 is right that the host's pilgrim math is
   deity-agnostic and discards who came; add that its effect lands on the host's prosperity (+1 rung on a triumph or a
   successful fair) and the deity share. Both lenses may draw the same catchment (8 nearest reachable by digest cost) for
   grand rites, not flows.
11. **Culture reuse carries the band.** If the religion lens reuses territory hinterlands and J382's culture term, it
   inherits the economy gap inside culture distance; say so in its legend.

### 9.3 The lens mechanism (legend, audience filter, time scrub)

12. **The time scrub has no host history to read.** Boom rungs reach no news; mover receipts are dropped; news is capped
   at 240 world-wide; purchase news carries no ids. A scrub is possible only from the map's own snapshots, from the first
   advance the map observes; a partial reconstruction from news is not reliable. The mechanism should define one shared
   "per-advance snapshot" service for every lens whose host fact has no history (prosperity, and per the sibling notes
   others), and the host change §8.6 item 1 should be offered.
13. **Audience.** DM: the true band. Players: the band word is already public in the herald, so in RR (omniscient) the
   player lens shows the same word; in DC, LR and FS on canonized campaigns the player lens should show the observer's
   believed pull band (four words) instead, which may be stale, and may set beside it the believed route-position band
   (§5.9). The legend changes with the audience.
14. **Vocabulary.** Never legend lifecycle economy health, the toll lift or `economic_capacity` as "prosperity"; the host
   itself uses the word for three quantities (§3.9). One word, one meaning on the map.
15. **Town map.** Flag for the town-map seam: the v2 layout re-reads the live band at each build, so a pulse band step feeds
   a changed economic field into a settlement map that is meant never to change. Either the map module freezes the
   genesis band for town drawing, or the host does. The v2 plan reads the band a second way, through the district wealth
   word that decides which outer quarters the wall embraces (§8.2), so a freeze must cover that read too. The district
   wealth word is itself a host fact a town lens may show (§8.3 item 8). The condition grammar's cuts are the host's ready
   band→dress table for a future fabric lens (MF §11.4 is the map family's by OD-FC-38).
16. **Corrections to the map module's own notes.** `research/sf/fp-physical-integration.md` row C6 (granary capacity
   derived from prosperity) and line 280 ("highest prosperity" as a migration axis) describe the design; the code reads tier
   and institutions for granaries and `economic_capacity` for migration. `research/sf/trade-system.md` §3.7 (`:341-345`)
   lists the entrepôt toll lift among the trade "writers" and corruption, faction capture and demographics as "other
   writers"; none of them writes the band (the toll lifts lifecycle health; corruption and capture only read; demographics
   is dark and reads). Its §2 field row (`:141`) is already right: it says the toll lift is not a writer. [Fable-reviewed 2026-10-18: the §3.7 list is corrected by this retrovalidation (the trade lane's C6; this lane).]

---

## 10. Document-versus-code contradictions, defects and open questions

### 10.1 Defects (code against itself)

- **D1. The gazetteer's prosperity sort and the comparisons histogram order are no-ops** [OBSERVED, re-checked]: rows carry
  the lower-cased word (`map/heraldRegister.js:103-106`, `:171`), both sorts rank it with the case-sensitive
  `prosperityRank` (`map/HeraldGazetteer.jsx:122`; `map/RealmComparisons.jsx:91`), and a lower-case word ranks −1 (probe), so
  every comparison is 0 and the order falls back to insertion. The DOCS seat had read the column as working.
- **D2. The food-surplus prosperity bonus never fires** (0.4 rounded to 0, `econ/prosperity.js:263`;
  `src/generators/foodGenerator.js:377`).
- **D3. Purchase rounding**: Poor and Moderate buyers never pay for a single purchase; fractions are lost each tick with no
  carry (`wp/generosityUpdates.js:121-150`); the code's note covers only the seller side.
- **D4. Flourishing's threshold comment** says "≈ Prosperous+"; Comfortable qualifies (`wp/upswingKernel.js:129`).
- **D5. Unknown-word and shape handling differ by reader** (0 / 0.4 / 0.5 / 50; `{tier}` reads neutral to
  `economic_capacity`; `{label}` reads −1 to the ladder). Two more exact-case readers: the district wealth nudge accepts a
  string or `{tier}` but no lower-case word (`src/domain/districtProfile.js:326-334`), and the condition-severity modifier
  accepts only an exact-case string, so a `{tier}` object, which the applicators preserve, gets no modifier
  (`src/domain/conditionPromotion.js:121-123`).
- **D6. Two ladders and a seed disagree on every rung** while `src/domain/prosperityRank.js` calls itself "THE ONE ladder"
  (Comfortable 0.65 vs 0.667 vs 62; Struggling 0.10 vs 0.167 vs 30), plus private ladders in the town scene and cartography.
- **D7. One name, two meanings**: `prosperity01Of` is rank ÷ 6 in upswing, generosity, lifecycle and the dark statecraft
  modules, but `economic_capacity` ÷ 100 in demographics (`wp/demographicsPushPull.js:347-350`); PG pg-2 calls the latter "the
  EXISTING prosperity01Of" [STATED PG:210-211].
- **D8. Boom rungs are unrecorded**: the sustain branch emits only a receipt, and receipts are dropped at `applyPulseMover`
  (UPSWING §0 and B2 promise receipted, receipt-visible steps, `:12`, `:103`; the tuning comment says "receipted", `wp/upswingKernel.js:121`).
- **D9. Purchase news has an empty settlement-id list** (`wp/generosityNews.js:157`), while relief news in the same module
  carries both ids (`:40`).
- **D10. The festival pin may be realm-wide** [INFERRED]: the pin bag is flattened across all saves and keyed by the single
  fork id `HBF-85`, so one settlement's decree would fix every festival that opens that tick (`wp/pulseKernel.js:362`).
- **D11. Subsistence is not only legacy**: `src/data/constants.js:85-87` says it is internal and kept for old saves; every
  applicator can write it.
- **D12. Open audit findings**: "Thriving" still gates merchant dominance and two narrative lines
  (`rulingStructure.js:497-500`; `narrativeGenerator.js:598`; GCA:678-680, 1126-1128); the AI layer's prosperity slot is the
  viability summary (`src/generators/aiLayer.js:140`; GCA:1136-1137). Fixed since: the neighbour ladder, the resilience
  vocabulary, the Subsistence odds.

### 10.2 Documents and comments the code contradicts

- **C1.** UPSWING §1 says both flags are absent and preset lighting is owner-gated (recommending LR and FS); WAVES lights them
  in RR, DC, LR and FS [STATED UPSWING:17-22 vs OBSERVED].
- **C2.** UPSWING A2 says the buyer buys from the cheapest reachable surplus neighbour, rides shipments, credits the seller
  as trade income into lifecycle health, and that prosperity transfers are zero-sum ± sinks; the code buys only after a
  refusal, instantly, with no route, credits a 0.4 band nudge, and is non-zero-sum by design [STATED UPSWING:48-57, 120-125].
- **C3.** UPSWING A3 describes credit as a bounded prosperity transfer; it is a grain obligation (`generosityReactions.js:425-449`).
  A4 says the overture reads the M6d tally; it reads give-stream warmth.
- **C4.** "Generation is sacred" vs four writers: PHASE55 says seeded prosperity stays the baseline [STATED :1675-1677];
  `sp/tradeFlow.js:12-18` calls it the byte-identical baseline; `wp/supplyKernel.js:590-591` says economic state is never
  written; `causalState.js:776-779` calls it generation-frozen. ATLAS and EC S18/S39 already record the writers [STATED].
- **C5.** The bust comment "M4 reads the fallen prosperity" and UPSWING B2's "bust → emigration pulse": emigration comes
  from pressures; a bust writes no population directly. Its Trade Bust condition raises trade pressure, 0.14 of the
  population stability term, so growth slows slightly (the boom does the reverse), but no emigration pulse is minted and
  the bust is not a crisis-flight archetype (§5.6). PHASE55 §4c's "low prosperity pushes population out" exists only in
  the dark demographics wave.
- **C6.** PHASE55 §4i and `fp-physical-integration.md` C6: granary capacity does not read prosperity.
- **C7.** EC rows M7 and M8 say famine and harvest move prosperity "one way (S16)" today, and M11 says plague makes prosperity "fall through their existing writers" (EC:2240-2244); S16 is generation-only and no tick writer reads plague.
  Row M47 says the band is "written each tick"; festivals write yearly, purchases on refusals, ransoms on events, booms
  about every seven ticks.
- **C8.** `wp/traditionsKernel.js:31-35` says the flag is dark; it is lit in four presets.
- **C9.** Resettlement says "nearby" and "neighbouring" (`settlementLifecycleFirstClass.js:291`, `:319`, `:411-412`; DESIGN
  SETTLEMENT_LIFECYCLE:83); the donor pool is realm-wide.
- **C10.** `sp/migration.js:237` defines richness as relative to the richest reachable hub; it is absolute.
- **C11.** `tm/arch/conditionGrammar.js:74` says no exported 0..1 prosperity scalar exists; `prosperityRank01` is one.
- **C12.** `wp/simulationRules.js:470-473` promises the treasury lit in three presets after the band chip; it is lit in none.
- **C13.** `prosperity.js:128-131`: "35%"/"30% luckier" in the comments; the code gives 40% Struggling, 60% Poor.
- **C14.** RR's comment says a world born into the preset runs the stack from its first tick (`wp/simulationRules.js:886-892`);
  a `createCampaign` birth infers the same id with no writer lit. Any surface showing "Realistic Regional" for such a
  campaign overstates what runs [INFERRED].
- **C15.** FOLD §2 is named as the status of record and has no prosperity entry; FOLD requirement 21 (one word, one
  meaning) has not been applied to prosperity (§3.9).
- **C16.** Sibling map-module note: `research/sf/trade-system.md:341-345` (§3.7) lists the toll lift, corruption, faction
  capture and demographics as prosperity writers; they are not (grep: four label writers only). Its §2 row (`:141`) is
  correct. [Fable-reviewed 2026-10-18: corrected in the trade note by this retrovalidation — the toll lift by the trade lane (its C6), corruption, faction capture and demographics by this lane.]
- **C17.** `src/domain/causalState.js:776-780` names vassal extraction and market shock among the conditions that move
  `economic_capacity`; neither touches it (vassal extraction's affected systems are trade connectivity, legitimacy,
  faction power and defence, `src/domain/activeConditions.js:91-97`; market shock is a stressor promoted to an
  export-market-loss trade condition), while the war-cost, occupation and worked-out-vein conditions it does not name do.
- **C18.** `wp/traditionsKernel.js:188` explains the cancel set as "plague/famine/war/occupation"; the set also holds vassal
  extraction and a cut trade route, and its "occupation" member is the *occupier's* burden (`:197`).
- **C19.** `src/domain/traditions/relations.js` describes T-4 as vassals forced to trade a tradition; the trigger is the
  occupation ledger's "vassalized" rung only ("treaties and hegemony" are never read, `:25-26`; graph vassal edges are not consulted, `src/domain/rulingPowerSeat.js:290-294`) — a DM-authored
  vassal edge never imposes a rite.

### 10.3 Open questions

- (a) Does an Edit-Mode re-derivation overwrite a pulse-moved band in the stored settlement? The re-derivation regenerates
  it (§3.1); the store write was not traced. [Fable-reviewed 2026-10-18: that regeneration also overlays every authored stressor kept in `config.stressorEdits` (`src/generators/steps/resolveStress.js:126-177`), so a DM Apply-stressor plague lowers the *generated* band there (`prosperity.js:160`) and nowhere else (§6); the store write stays untraced.]
- (b) Does a band step visibly move a v2 town plan (the economic field changes; the plan's sensitivity was not traced)?
- (c) The owner question recorded in code: should booms cool gracefully instead of only busting (`wp/upswingKernel.js:644-653`)?
- (d) Should the purchase debit carry its fraction across ticks, as the boom accrual does?
- (e) Is the festival ratchet (§3.3) intended? It polarises the realm and has no realm-level brake.
- (f) Is the festival pin meant to be per settlement (D10)?
- (g) For the map: relative or absolute band in territory strength (§9.1 item 2)? [Fable-reviewed 2026-10-18: answered — relative, J384 (1), `docs/PROGRESS.md:443`.]
- (h) For the map: are J378's "garrison and standing bands" banded with or without the host's economy facet (§9.1 item 4)? [Fable-reviewed 2026-10-18: answered — without, J384 (4), `docs/PROGRESS.md:443`; the bands are the host's five other capacity facets, renormalised.]
- (i) Does any shipped surface mount the surveyor's autonomous runs, so that a DM can stop a run on a band (§3.10)?

---

## 11. Sources

### 11.1 Read whole by the reading seats (line counts at `81f1cd96`)

CODE seat: `econ/prosperity.js` (314), `src/domain/prosperityRank.js` (147), `wp/upswingKernel.js` (978), `wp/momentum.js`
(1,297), `wp/treasury.js` (1,302), `wp/treasuryNews.js` (195), `wp/generosityUpdates.js` (150),
`tm/arch/conditionGrammar.js` (256), `map/RealmComparisons.jsx` (154), `wp/simulationRules.js` (1,593; presets read and the
flag table executed). DOCS seat: `docs/DESIGN_UPSWING_RELATIONSHIP_FLOWS.md` (144), `econ/prosperity.js` (314),
`src/domain/prosperityRank.js` (147), `wp/upswingKernel.js` (978), `wp/generosityUpdates.js` (150), `tr/pilgrimage.js`
(104), FOLD §2 (329-352, whole section).

### 11.2 Read in part or by grep by the seats

CODE seat: `src/data/constants.js` (107; 70-107); `wp/traditionsKernel.js` (948; 1-80, 140-420, 660-870); `tr/pilgrimage.js`
(81-104); `wp/settlementLifecycleKernel.js` (1,248; 1-60, 175-370); `wp/settlementLifecycleFirstClass.js` (809; 93-97,
250-330, 370-440); `wp/roadsKernel.js` (1,245; 340-360, 760-850, 1124-1131); `rd/state.js` (609; 1-40, 128-145, 270-300,
465-505); `wp/corruptionWeb.js` (1,155; parts); `wp/generosityKernel.js` (1,391; parts); `sp/generosityEV.js` (938; parts);
`wp/demographicsPushPull.js` (643; parts); `wp/informationStatecraft.js` (1,547; parts); `src/domain/corruption.js` (710;
parts); `sp/entrepots.js` (381; 1-200, 296-381); `src/domain/compendium/bandLadders.js` (294; parts);
`src/domain/state/deriveSystemState.js` (408; parts); `map/heraldRegister.js` (306; 1-180); `map/HeraldGazetteer.jsx`
(255; 100-160); `econ/economicState.js` (896; 820-896); `src/generators/foodGenerator.js` (343-378);
`src/generators/factionDynamics.js` (parts); `src/domain/causalState.js` (760-880); `wp/migrationKernel.js` (150-290);
`sp/migration.js` (1-130, 175-260); `sp/cultureDistance.js` (210; 1-60, 178-179); `sp/tradeFlow.js` (1-60);
`wp/supplyKernel.js` (570-600); `wp/institutionLifecycle.js` (75-160, 676-760); `wp/conquestFeeds.js` (parts);
`wp/tierResourceDynamics.js` (parts); `wp/relationshipRuleHelpers.js` (280-330); `wp/militaryStrength.js` (parts);
`wp/coup.js` (108-135); `wp/religiousContest.js` (138-201); `wp/beliefAxisSubjects.js` (150-170, 315-340);
`wp/foodStockpile.js` (185-195); `tm/townLayoutV2.js`, `tm/townMapModel.js`, `tm/asymmetrySources.js` (parts);
`wp/beliefMap.js` (204-209); `sp/distanceRead.js` (125-132); `LivingWorldGates.jsx` (381; grep).
DOCS seat: EC (2,996; 45 hits, passages listed in its reading), GCA (1,152; 33 hits), SIMULATION_LOGIC_AUDIT (539; 26 hits),
MF (486; 14 hits), TRIBUTE (2,697; 13 hits), PG (431; 13 hits), PHASE55 (1,710; 15 hits + territory grep), PHASE4 (1,203;
9 hits), A_PLUS_ROADMAP (1,074; 9 hits), simulation-intelligence-layer (593; 6 hits), ATLAS (12,486; grep, 41 hits), the
generosity, lifecycle, momentum, politics and corruption-web designs (grep); code as listed in its reading (campaign slice
584-592, imported creation 1-62, world state 10-20 and 636-680, Instant World composer 410-425, realm inspector 240-262,
generosity reactions, traditions, roads, entrepôts, supply, institution lifecycle, mercenary market, pulse kernel lines,
causal state, migration, population dynamics, tier dynamics, pressure model, lifecycle, religion, martial readiness, military
strength, corruption family, treasury head, system state, town-map family greps, map panels, faction dynamics, ruling
structure, neighbour generator, AI layer, narrative generator, wizard news, certification rows, the audit script).

### 11.3 My own re-reads and probes at `81f1cd96` (this seat)

Re-read: `wp/upswingKernel.js` (94-142, 290-345, 370-382, 594-706, 800-830, 895-960); `wp/generosityUpdates.js` (150,
whole); `sp/generosityEV.js` (112-132, 650-700, 918-942); `wp/generosityKernel.js` (280-292, 820-880, grep);
`wp/generosityNews.js` (143-165); `wp/traditionsKernel.js` (25-40, 147-190, 245-415, 740-800, grep); `tr/pilgrimage.js`
(104, whole); `tr/genesis.js` (111-126); `src/data/constants.js` (85-107); `econ/prosperity.js` (115-295);
`src/domain/causalState.js` (770-840); `sp/cultureDistance.js` (1-60, 170-182); `wp/migrationKernel.js` and `sp/migration.js`
(grep of the weights); `map/heraldRegister.js` (95-110, grep), `map/HeraldGazetteer.jsx` (112-130),
`map/RealmComparisons.jsx` (80-100); `wp/simulationRules.js` (1-31, 868-910, 1548-1562); `LivingWorldGates.jsx` (40-100);
`sp/entrepots.js` (60-95, 138-150, 236-262); `sp/commodityFlow.js` (168-186); `wp/settlementLifecycleFirstClass.js`
(378-420); `wp/settlementLifecycleKernel.js` (160-200, 310-330); `rd/state.js` (276-292); `wp/roadsKernel.js` and
`rd/thirdPartyRansom.js` (grep); `wp/beliefAxisSubjects.js` (296-335, grep); `wp/religiousContest.js` (144-162);
`wp/militaryStrength.js` (grep) and its callers (grep); `src/domain/corruption.js`, `wp/corruptionImpair.js` (grep);
`tm/arch/conditionGrammar.js` (1-14, grep); `src/domain/state/deriveSystemState.js` (104-132); `tm/townMapModel.js`
(330-362), `tm/townLayoutV2.js` (330-345, 428-442), `tm/asymmetrySources.js` (grep); `src/domain/edit/dmLayer.js` (880-945,
grep) and a grep of `src/domain/edit` for prosperity (none); `src/domain/edit/directives.js` (1-60, 195-230);
`wp/pulseKernel.js` (grep of the mover call sites; 3,007 lines); `src/domain/region/wizardNews.js` (21, 1168-1192);
`wp/worldState.js` (16); a src-wide grep for writes of a prosperity label (four files) and of prosperity fields;
`src/generators/steps/economyReconcilePass.js` (grep: no prosperity token); `docs/DESIGN_UPSWING_RELATIONSHIP_FLOWS.md`
(14-24, 46-60, 112-125); FOLD (329-352; grep: 0 prosperity hits).
Probes (scratchpad `prosp-synth/`, importing host modules read-only): `table.mjs` — the preset flag table, the BORN rule
set and the inferred preset ids; `probe.mjs` — the two ladders and the lower-case/`{label}`/`{tier}` reads, the festival
outcome odds per band (with a local mirror of the outcome thresholds, because the traditions module needs a package not
installed in the host checkout), the boom rung cadence, and the rounding of half steps.
Map module: `docs/PROGRESS.md` (1,056; rows J375-J382 at 434-441); `research/sf/faith-system.md` (1,516; 1-27, 636-646,
1232-1280, outline); `research/sf/fp-simulator.md` (1,098; 1-40, grep: no prosperity); `research/sf/fp-physical-integration.md`
(481; 1-40, rows at 75, 149, 280); `research/sf/trade-system.md` (1,069; grep, 90-136, 303-320, 812-820, 940-948);
`research/sf/population-system.md` (852), `plague-system.md` (817), `alignment-system.md` (965) (grep for prosperity).

**Where the seats disagreed and how it was settled**: (1) the gazetteer sort — broken (CODE seat right); (2) the boom
cadence — 7 ticks with an occasional 8 (CODE seat right); (3) the toll lift's maximum — about 0.195, 0.3 is the weight (CODE
seat right); (4) the capacity seed range — 28..86 on the seven-rung ladder, 22..88 with legacy words (both partly right);
(5) the purchase rounding — both right; added the per-tick summation case.

### 11.4 Not read by any seat (or only partly)

`dossierViewModel` `deriveProsperityPosture`; `SimulationRulesDialog`; the store path that writes an Edit-Mode
re-derivation back (open question a); the visible sensitivity of the v2 town plan to attractor strength (b); the corruption
pass and mercenary-market mounts beyond their gates; `navalStrength.js` beyond 15-70; `houseLedger.js`; `counterIntelSweep.js`
beyond 118-177; `LivingWorldGates.jsx` past line 200; DESIGN_TRADITIONS, DESIGN_THE_ROADS, DESIGN_W_COIN and
GEOPOLITICAL_WAR_LAYER (outside the slice); EC, MF, PG, PHASE55, PHASE4 and TRIBUTE beyond their prosperity passages; the
ATLAS beyond grep; the pulse kernel beyond its mover call sites and the embattlement ramp; whether any UI authors a
festival pin (only a grep). (`wp/traditionsKernel.js` 420-660 and 870-948 were read by the verifier, §11.5.)
Partly read only, by the verification pass (§11.5): `src/domain/districtProfile.js` (623; 36-44, 298-336),
`src/domain/conditionPromotion.js` (255; 25-125, 140-205 by grep), `src/domain/autonomy/signalRegistry.js` (361; 1-30,
112-124), the undercity leaves (`sewerDerivation.js` 524 and `colonization.js` 544; grep and 436-446), `tr/relations.js`
(397; 1-60, 90-190, grep — the adoption pass at 280-397 by grep only), `wp/relationshipRulesCore.js` (862; 583-642),
`wp/relationshipRulesAdversarial.js` (685; 288-315), `wp/pressureModel.js` (366; 39-56, 262-286), `wp/populationDynamics.js`
(610; 94-136, 286-315, 418-486), `src/domain/townScene/sceneBuildingFabric.js` (558; grep, 70-84). Not read: how the
scene fabric's district input is produced (its `wealthBand` field may come from another deriver); the qualitative-bands
and causal-views uses of the district deriver beyond the import; the autonomy run mount (open question i); the crisis
lifecycle and DM event paths beyond the promotion call sites; DESIGN_TRADITIONS §8-§9.

### 11.5 Read by the verification pass (verifier and fixer, at `81f1cd96`)

The verifier's reading, as it reported it: whole — `wp/upswingKernel.js` (978), `wp/traditionsKernel.js` (948),
`econ/prosperity.js` (314), `src/domain/prosperityRank.js` (147), `tr/pilgrimage.js` (104); in part — `wp/simulationRules.js`
(1,593; 1-120, 455-480, 660-1250, 1311-1315, 1400-1593, plus a probe of all presets), `src/domain/causalState.js` (1,653;
270-380, 770-840), `LivingWorldGates.jsx` (381; 1-140 plus grep), `sp/entrepots.js` (381; 55-300), `wp/generosityKernel.js`
(1,391; 60-115, 270-295, 470-530, 815-880), `sp/generosityEV.js` (938; 100-135, 640-700, 915-938), `rd/state.js` (609;
262-295, 455-509), `wp/roadsKernel.js` (1,245; grep, 335-360, 815-850), `wp/settlementLifecycleKernel.js` (1,248; 180-200,
248-262, 284-356), `wp/settlementLifecycleFirstClass.js` (809; 370-425), `wp/institutionLifecycle.js` (1,160; 78-160,
676-705), `sp/embattlement.js` (449; 1-60, 302-332), `sp/migration.js` and `wp/migrationKernel.js` (weights),
`sp/cultureDistance.js` (210; 40-56), `wp/pulseKernel.js` (3,007; grep, 2555-2640), `wp/worldState.js` (1-30, 636-690),
`src/domain/region/wizardNews.js` (18-23, 1165-1192), `src/domain/edit/directives.js` (238; 181-238),
`src/domain/districtProfile.js` (290-335), `tm/townLayoutV2.js` (250-275, 334-346, 428-442). It did not read the full
SimulationRulesDialog, `corruptionWeb.js`, `informationStatecraft.js`, `counterIntelSweep.js` or `navalStrength.js` beyond
grep, nor the EC, MF, PG, PHASE55 and TRIBUTE documents beyond the cited lines (UPSWING:14-24 and EC:2304-2308, :2395-2399
checked).

The fixer's re-checks (this pass): `src/domain/causalState.js` (1,653; 300-360, 770-840, grep); `src/domain/activeConditions.js`
(1,011; 80-100, 318-460, grep); `wp/resourceDynamicsKernel.js` (915; grep, 880-912); `wp/simulationRules.js` (715-760, preset
lines by grep); `econ/prosperity.js` (178-195); `wp/upswingKernel.js` (312-345, 600-636, 684-696); `sp/embattlement.js`
(449; 1-110, 139-142, 175-305); `sp/entrepots.js` (90-100, 200-212, 236-262); `sp/tradeFlow.js` (253; 185-210);
`wp/pulseKernel.js` (2350-2410); `wp/warFrontReads.js` (84; 76-84); `wp/traditionsKernel.js` (170-256, 320-330, 660-812);
`tr/relations.js` (397; 1-60, 90-190, grep); `src/domain/rulingPowerSeat.js` (690; 290-294, grep); `tr/genesis.js` (460;
96-128); `wp/relationshipRulesCore.js` (583-642); `wp/relationshipRulesAdversarial.js` (288-315); `wp/occupation.js`
(1,646; 1512-1530, grep); `src/domain/events/mutateWorld.js` (1,233; 425-445); `wp/generosityKernel.js` (266-292, 474-530);
`src/domain/districtProfile.js` (36-44, 298-336, grep); `tm/townLayoutV2.js` (842; grep, 716-745);
`src/domain/townScene/sceneBuildingFabric.js` (70-84, grep); `wp/pressureModel.js` (39-56, 262-286);
`wp/populationDynamics.js` (94-136, 286-315, 418-486); `src/domain/conditionPromotion.js` (25-125, grep);
`wp/npcLadderGoals.js` (250; 1-70); `src/domain/autonomy/signalRegistry.js` (1-30, 112-124); the undercity leaves (grep,
`colonization.js` 436-446) and a src-wide grep for their consumers; `rd/state.js` (262-292); `wp/beliefAxisSubjects.js`
(296-336); `wp/institutionLifecycle.js` (128-142); `wp/militaryStrength.js` (329; 70-84, 240-252); `src/lib/gallery.js`
(1,281; 736-748, 966-998, grep); `src/components/gallery/GallerySidebar.jsx` (grep); `src/store/mapSlice.js` (889; 868-890)
and a src/tests grep for `burgToConfig`; `LivingWorldGates.jsx` (52-76). Map module: `research/sf/trade-system.md`
(131-142, 308-314, 336-347, headings); `docs/PROGRESS.md` rows J377, J378, J382; `docs/AMENDMENTS-2026-10-17m.md` (108-118,
grep); `research/sf/fp-realm-review.md` (grep, :600).

---

## 12. Verification record

A verifier re-read the note against the host at `81f1cd96` and returned ten problems and eighteen omissions; this pass
re-checked each at the source (reads in §11.5). P = a check that did not hold; O = an omission. "Held" means the verifier
was right; "partly" means right in substance with a correction recorded here.

| # | What the verifier said | What I found at the source | What changed in the note |
|---|---|---|---|
| P1 | The `economic_capacity` drainers "war drain, vassal extraction, market shock, occupation extraction" copy a stale header; the real drainers are the war, occupation and vein conditions | Held. The drain scan counts only conditions listing `economic_capacity` (`causalState.js:342-351`, `:816-828`): `war_drain`, `war_exhaustion`, `war_mobilization`, `reinforcement_cost`, `occupation_resistance`, `occupation_burden` (`activeConditions.js:331-446`) and `vein_exhausted` (`resourceDynamicsKernel.js:908`); `vassal_extraction` lists trade, legitimacy, faction power and defence (`:91-97`); a market-shock stressor is promoted to an export-market-loss trade condition (`conditionPromotion.js`) | §1, §2 row, §3.8, §6 (war and plague), two §7.2 rows; new C17 |
| P2 | Generation's disconnected 2-or-1 branch covers villages, not "town or larger" | Held (`prosperity.js:183-192`: only thorp and hamlet take 0) | §3.1 |
| P3 | The bust reads the boom town's own embattlement, not "route danger"; neighbours count only through throughput; the level lingers; canon only | Held, refined: the level rises only after the threat exceeds 0.55 (`embattlement.js:74`, `:234-251`); the "siege" input is a live war front into the town (`pulseKernel.js:2376-2388`; `warFrontReads.js:76-84`); decay 12% of the level a tick, about 29 ticks from 0.8 [INFERRED] | §1, §3.2 (new "what embattled means"), §3.2 bust bullet, §5.4, §8.1, §9.1 item 6 |
| P4 | A boom needs own-endpoint throughput (in + out ≥ 3) and through-traffic (centrality ≥ 0.3), not traffic "through" it | Held (`upswingKernel.js:312-315`; `tradeFlow.js:193-205`; `entrepots.js:236-262`) | §1 writer 1, §3.2 inputs, §8.1 |
| P5 | The festival cancel list misses vassal extraction and a cut route, and its "occupation" is the occupier's burden | Held. The set is at `traditionsKernel.js:197` (the verifier cited :192); `war_pressure` and `vassal_extraction` are also promoted from war, siege, monster, raider and occupation stressors (`conditionPromotion.js:28-46`, `:63`); a cancellation stamps "cancelled" as last outcome (`:801`), so no streak term follows | §1, §3.3, new §5.12; new C18 |
| P6 | The purchase pair also admits `client`; a live obligation waives the need and bond floors, not the edge-kind test | Held (`generosityKernel.js:273-275`, `:511-518`) | §5.1 |
| P7 | A per-district wealth band exists, moved by the band, read by the v2 plan, its wall and the scene fabric; only MF's stratification and drift are unbuilt | Held (`districtProfile.js:40`, `:303-335`; `townLayoutV2.js:255`, `:314`, `:645`, `:725-728`; `sceneBuildingFabric.js:77-80`). Added: the wall *extends* to embrace an outer wealthy/opulent quarter, and among unvalued categories only arcane reaches "wealthy" [INFERRED] | §1, §3.10, §7.2 row, §7.3 item 3, §8.2, §8.3 item 8, §8.4, §8.5, §9.3 item 15, D5 |
| P8 | The bust writes no population but pushes growth down through trade pressure; the boom the reverse | Held, sized: the Trade Bust raises trade pressure (score cut plus +0.16 as a crisis on trade, `pressureModel.js:47-56`, `:266-273`), weight 0.14 in stability (`populationDynamics.js:301`); at most about 0.0017 a month of rate, far below the 0.025 "severe" bar, and the bust is not a crisis-flight archetype (`:120`, `:445`), so it starts no mass emigration [INFERRED]. M4 does read the fallen band through `economic_capacity` once an emigration occurs | §1, §3.2, §5.6, C5 |
| P9 | The cited `trade-system.md:133`, `:310-313` are wrong; the erroneous writer list is §3.7 at `:341-345`; §2 (`:141`) is right | Held | §9.3 item 16, C16 |
| P10 | (Unverifiable) whether J378's military term reads the host's military capacity, which carries the 0.10 economy facet | Checked the map design: the tie-breaker is "the host's garrison and standing bands … a new banding of its strength facets" (`docs/AMENDMENTS-2026-10-17m.md:111`, `:1695`; J-RR.52, `fp-realm-review.md:600`); the host's facets are manpower, institutions, materiel, logistics, economy, will (`militaryStrength.js:75-82`) — none named garrison or standing — so whether economy enters was not yet defined [Fable-reviewed 2026-10-18: defined since by J384 (4): excluded; the AMENDMENTS-m and fp-realm-review pointers re-pointed in §9.1 item 4] | §1 point (3) and §9.1 item 4 made conditional; open question (h) |
| O1 | Festival cancellation by vassalage and hostile raids is a cross-settlement band pressure missing from §5 | Held (`relationshipRulesCore.js:586-640`; `relationshipRulesAdversarial.js:291-313`; `relationshipDynamicsEnabled` default true, off only in SC, `simulationRules.js:68`, `:970`) | New §5.12; §1; §6 loops; §7.2 row; §8.1, §8.3 item 9, §8.4; §9.1 item 7 |
| O2 | T-4 imposes an overlord's rite "along vassal edges" and contradicts §9.1 item 7 | Partly. The trigger is the occupation ledger's "vassalized" rung (`relations.js:11-17`, `:25-26`; `rulingPowerSeat.js:290-294`), not a graph vassal edge; 0.3 per-year chance (`relations.js:49`); so it is lit with traditions **and** the war layer (DC, FS; RR, LR by the gate), not with traditions alone; adoption needs canon | §5.12, §7.2 row, §9.1 item 7 rewritten, §9.2 item 9, new C19 |
| O3 | Entrepôt brake 3 adds up to 0.2 to the hub's embattlement ramp; any level > 0 busts the boom | Held, with a gate correction: the premium is capped below the 0.55 entry (`entrepots.js:94-99`), so it needs a war input; in RR that means the war layer by the gate | §3.2, §5.4, §6 loops, §7.2 row |
| O4 | Crime and security feed the ramp, so a crime-ridden boom town can bust without any war | **Not held.** Crime's term is at most 0.3 (`embattlement.js:90`, crime above 0.5 only) and with the hub premium at most 0.5, below the 0.55 entry (`:74`); the tuning comment says crime only sustains. What holds: crime (and the premium) can keep a war-embattled town embattled, since exit needs the threat below 0.3 | §3.2 states the bounds; no no-war bust added |
| O5 | `vein_exhausted` also drains `economic_capacity`; `resource_strike` adds +0.35 satellite drive | Held (`resourceDynamicsKernel.js:886-908`; WAVES, aspatial, `:31-35`, `:334`); the +0.35 was already in §3.7 | §2 row, §3.8, §7.2 row |
| O6 | District wealth bands are a real town-map lens fact and a second v2 read of the band | Held (as P7) | As P7 |
| O7 | The undercity reads the band through the corruption climate; built dark / unmounted | Held (`sewerDerivation.js:31`, `:229`, `:401`; `colonization.js:442`); a src-wide grep finds no consumer outside `src/domain/undercity` (`factionCompetition.js` imports only high-water helpers). Recorded as BUILT, UNMOUNTED | §3.10, §6, §7.2 row |
| O8 | The autonomy stop signal `settlement.prosperity.band` is a DM-facing reader missing from §6 | Held (`signalRegistry.js:116-122`); the run mount was not traced | §3.10, §6, §7.2 row, open question (i) |
| O9 | Promoted conditions take ±0.06 severity by band, exact-case | Held (`conditionPromotion.js:121-123`, used at `:157`; callers `assembleSettlement.js:355`, `crisisLifecycle.js:316`); a `{tier}` object gets no modifier | §3.10, §6, §7.2 row, D5 |
| O10 | Merchant, craft and labour NPC ladder goals target `economic_capacity` | Held (`npcLadderGoals.js:56-69`; `npcLadderEnabled` in ONE_REGEN) | §1, §2 row, §3.8, §6, §7.2 row |
| O11 | Boom and bust conditions move lifecycle economy health through trade and labour | Held (`institutionLifecycle.js:131-140`; the boom is a causal lift, `causalState.js:310-314`); a few hundredths of health [INFERRED] | §3.9 |
| O12 | The believed `routePositionBand` sits beside `pullBand` | Held (`beliefAxisSubjects.js:319-320`): the configured route class shifted up one rung for generation's entrepôt flag — configuration, not geometry | §5.9, §7.2 row label, §8.1, §8.3 item 7, §9.3 item 13 |
| O13 | Guest right: an open tradition window cuts detention risk to 0.35× | Held, at `rd/state.js:276` (the verifier cited :274) | §5.12 |
| O14 | The capital tier holds 6–8 traditions at grandeur 6 | Held (`tr/genesis.js:113-121`; "capital" is a schema tier beyond metropolis) | §3.3 |
| O15 | The gallery prosperity facet is a further display comparison | Held (`gallery.js:742`, `:986-995`; `GallerySidebar.jsx:91-92`): a publish-time snapshot across users' settlements | §3.10, §6, §7.2 row |
| O16 | `mapSlice.burgToConfig` is a dormant geometry door to the route class | Held (`mapSlice.js:871-888`: port ⇒ "port", else "road"); only tests call it | §8.1 row, §8.6 item 7 |
| O17 | §11.4 should add the files the note never read | Held; several are now partly read by this pass, and the list says what remains unread | §11.4 |
| O18 | The verifier's own reading list | Recorded as given | §11.5 |
