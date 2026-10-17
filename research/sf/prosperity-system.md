# SettlementForge's prosperity — the band, how it is set and moved, how it compares and presses across the realm, what it drives, and what a map lens can show

> PENDING FABLE REVIEW — written by Opus 5.5 standing in for the Fable seat research/sf-prosperity; to be retrovalidated overall at the next opportunity (owner, 2026-10-17, J375)

Synthesis seat `research/sf-prosperity`. Host: `/home/user/clausellstokes-lang/settlement-engine` at `origin/master`
`81f1cd96`, read-only (HEAD detached, tree clean; nothing written there). Map module: `/home/user/maps-architecture` at
`7d7f562`. Two reading seats returned structured readings: a CODE seat (16 mechanisms; it ran the preset table and the
ladders from its scratchpad) and a DOCS seat (19 mechanisms; every document claim checked against code; it ran the preset
table and the campaign-birth path). This note merges them, settles their five disagreements by re-reading the code (§11.3
lists my re-reads and probes), and adds what the re-reads found that neither seat had. Everything is in my own words; no
code is copied; constants are quoted as values.

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
the word (28 for Subsistence up to 86 for Wealthy) and then drained or lifted live by war and extraction conditions
[OBSERVED `src/domain/causalState.js:782-835`]. The word "prosperity" also names a third quantity — the institution
lifecycle's economy *health* ("prosperous"/"declining"), which reads neither the band nor the score (§3.9).

**How it is set.** Once, at generation, from the configured route class (crossroads or port 3, road or river 2, isolated
1), tier, the economy/magic/military sliders, monster threat, defences, institution depth and income diversity, then capped
by food security and stresses, then mapped to a word [OBSERVED `econ/prosperity.js:121-290`]. Generation reads no map
geometry: the route class is a configuration string.

**What moves it.** Exactly four tick writers, each with its own copy of the same band-step applicator (round, clamp 0..6,
write back in kind) [OBSERVED grep: the only writes of a `PROSPERITY_TIERS[...]` label are in these four files]:
1. **Trade boom/bust** (upswing B2): a settlement that carries surplus caravan throughput *through* it (entrepôt
   centrality) mints a boom and then climbs one rung about every seven weeks until Wealthy; a severance (embattled roads,
   collapsed throughput, a worked-out vein) busts it one rung down.
2. **Festivals** (traditions): each tradition's yearly observance succeeds or fails — triumph +1, failure −1, and a
   successful market fair on a trade lane +1 more. Prosperity raises the success odds, so the loop reinforces itself.
3. **Grain purchase** (generosity A2): a needy buyer refused a gift by a bonded neighbour pays up to one rung; the seller
   gets 0.4 of the debit. Rounding makes small debits vanish.
4. **Ransoms** (roads): a captor gains a rung for a key or pillar captive; a pillar's home loses one.

Nothing else writes the band: not food, famine, harvest, plague, war, corruption, the treasury, momentum, tier change or
population. War reaches it only by busting a boom (embattlement), cancelling festivals and ending flourishing.

**How it compares across the realm.** It does not, in the simulation, except once: the resettlement donor pool ranks every
live settlement of ≥ 500 people by prosperity and takes the top three, with no distance term. The only other realm-wide
comparisons are display (the gazetteer column and the "Where prosperity sits" histogram) — and **both of those sorts are
broken**: the rows carry the lower-cased word and the ranker is case-sensitive, so every row ranks −1 (re-checked, §10).

**How it moves between settlements.** It never diffuses. Every cross-settlement effect is a pair transaction (purchase,
ransom), a host read of its neighbourhood (pilgrims lifting a festival; caravans through it making a boom; an embattled
neighbourhood busting it), a realm-ranked pick (resettlement donors) or a belief (other settlements' believed "pull band",
belief presets only). Nothing pulls a poor town up toward a rich neighbour.

**What it drives.** Festival success, reconstruction speed, flourishing eligibility (Comfortable and up), satellite
seeding, resettlement donors, corruption resistance, purchasing power, chaotic-creed receptivity and secular drift (deity
worlds), the believed pull band, generation-time legitimacy and merchant dominance, the resilience dial, the town map's
v2 economic field; and through `economic_capacity`: migration richness and survival, culture distance, the economy facet
(10%) of military capacity, mobilisation, army funding. It does **not** drive tier change, population growth, granary
capacity or territory in the host.

**What is lit.** The status of record for prosperity is the preset code, not the FOLD: FOLD §2 has no prosperity entry
(zero hits). All four writers are pre-FP engine waves lit in RR, DC, LR and FS, and dark in QL, SC and NC. Two gates cut
deeper: boom/bust needs a spatially canonized campaign **and** `commodityFlowEnabled`, which only RR and FS carry — so it
is inert in DC and LR; ransoms and the pilgrim lift need canon. And **the birth door**: a campaign created by
`createCampaign` gets the plain defaults, which still infer the id `realistic_regional` but carry none of the writers'
flags — its band is frozen at generation forever. Only an Instant World or a DM clicking a preset chip applies RR's lit
keys (§7.1) [OBSERVED, probe].

**What this means for the map module.** (1) The territory projection's "prosperity band" (J377 T2, J378's civil part)
should read the seven-rung band, case-insensitively, and must bring its own hysteresis and its own band history, because
the host keeps neither and its boom steps do not even reach the news. (2) The band is absolute and, in lit presets,
drifts *upward* realm-wide over years (festivals ratchet above Poor; booms climb; little pulls down), so an exponential
strength term will inflate every border unless it is relativised or bounded (§9.1). (3) Prosperity already enters J378's
military term (10% of military capacity via `economic_capacity`) and J382's culture term (the economy gap is 0.18 of the
host culture distance) — three entries unless one is chosen. (4) A prosperity lens is honest as glyphs, dated pair links,
boom arteries, catchments and donor lines; a continuous wealth field or "hinterland wealth" would be invention.

---

## 2. The data model

| Field / quantity | Shape | Written by | Read by (main) | Where |
|---|---|---|---|---|
| `economicState.prosperity` | a bare string (generation always writes a string); the applicators also accept a `{tier}` object and write back in kind | generation once; four tick applicators | everything in §6 | `econ/economicState.js:856-866`; `wp/upswingKernel.js:901-927`; `wp/generosityUpdates.js:121-150`; `wp/traditionsKernel.js:388-410`; `rd/state.js:478-500` |
| `PROSPERITY_TIERS` + `prosperityRank` | seven words, index 0..6; exact, case-sensitive match; a string or `{tier}`; −1 for anything else (`{label}`, lower case, legacy words) | — | the four writers; rank/6 readers | `src/data/constants.js:85-100` [OBSERVED; probe: "comfortable" → −1, `{tier:'Poor'}` → 2] |
| `prosperityRank01` | 0..1 by a hand table (Subsistence .05, Struggling .10, Poor .25, Moderate .50, Comfortable .65, Prosperous .80, Wealthy .95, plus legacy aliases such as Modest .4, Thriving .9); case-folded with a substring fallback; unknown 0.5 | — | corruption climate, neighbour generator, density law, interior, town v2 layout | `src/domain/prosperityRank.js:62-147` |
| "prosperity01" as rank ÷ 6 | Struggling .167, Poor .333, Moderate .5, Comfortable .667, Prosperous .833, Wealthy 1 | — | upswing, generosity, lifecycle, corruption web, counter-intel, information statecraft, naval affordability | [OBSERVED probe] |
| `economic_capacity` | causal score 0..100: base by the current word (impoverished 22, subsistence 28, struggling 30, poor 38, modest 46, moderate 50, comfortable 62, prosperous 74, wealthy 86, thriving 88; unknown 50), ±6 for diversified/concentrated complexity, conditions drain at scale 18 (war drain, vassal extraction, market shock, occupation extraction), war spoils + severity × 12, a faith "craft" channel that is 0 today | derived per read, not stored | migration, culture distance, military capacity, mobilisation, army funding, coup (dark), convergence, demographics (dark) | `src/domain/causalState.js:776-835` |
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
  disconnected town or larger 2 with working teleportation infrastructure and magic, else 1;
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

Inputs per settlement per tick: throughput = in + out from the M6d trade-flow tally; centrality from the M6b entrepôt
ledger (0..1); embattlement (route danger > 0); arteries = the settlement's regional-graph neighbours whose relationship
type contains trade, allied, vassal or patron (fewer than 2 ⇒ fragile); a `vein_exhausted` condition.

- **Building**: throughput ≥ 3.0 with centrality ≥ 0.3 opens a building record; it continues while throughput ≥ 1.5 and
  centrality ≥ 0.3 (the hysteresis band); dwell keeps counting under embattlement, but the boom cannot mint while severed.
- **Mint** on the third sustained tick: a `boom` condition (severity 0.4), a regional "notable" news item, and an accrual
  primed at 0.14. The mint itself writes no rung.
- **Sustain**: +0.14 accrued per tick; whenever the accrual reaches 1 a whole rung is emitted. A probe of that arithmetic
  gives a rung every 7 ticks (an 8 every eighth step), so the first rung lands about ten weeks after throughput first
  qualifies [OBSERVED code + probe; re-checked: the DOCS seat said 8, the CODE seat 7]. Only the Wealthy cap stops it.
  There is no graceful cool-down: the code records "should booms cool gracefully?" as an owner question (`:644-653`).
- **Bust** on embattlement, throughput < 1.0, or a worked-out vein: −0.9 (rounds to one rung down), legitimacy −3, a
  "Trade Bust" crisis condition (severity 0.55), a regional "major" news item naming the first artery; the bust record holds
  3 ticks, then drops and building may begin again. The bust writes no population.

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
5–7 (metropolis) traditions, each with a grandeur `scaleBand` aligned to the tier index [OBSERVED
`tr/genesis.js:111-126`; STATED `:98`]. When a window opens:
- **Cancelled** under a hard stressor (plague, famine, war, occupation on the settlement; siege or occupation in the realm's
  war stressors) or at rank 0 (Subsistence): legitimacy −1, no band step.
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

Ransom term 13 + 26 × importance weeks. At resolution: captor +1 rung for a captive of importance ≥ 0.7 (key or pillar);
the captive's home −1 for a pillar (importance 1.0) only, spared when adventurers paid; a third-party payer −1 (that arm is
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

Seeded from the current word, so it follows every band step; then live conditions move it (§2). It is what migration, the
culture distance, military capacity, mobilisation (cool floor 30), army funding, coup (dark) and convergence read [OBSERVED
both seats]. Its header calls prosperity "generation-frozen" (`causalState.js:776-779`), which the four writers contradict.

### 3.9 Things called "prosperity" that are not the band

- **Institution-lifecycle economy health** [OBSERVED `wp/institutionLifecycle.js:82-153`, `:680-770`]: the mean of trade
  connectivity, labour capacity, infrastructure condition and food security (÷ 100), plus a conquest-feed pulse (≤ 0.35,
  about an 11-week half-life), minus mercenary upkeep, plus the entrepôt toll lift = 0.3 × clamp(c × min(1, c) − 0.35 c),
  which is positive only above centrality 0.35 and peaks near 0.195 at c = 1 (`sp/entrepots.js:85-93`, `:170-194`) [re-checked:
  0.3 is the weight, not the maximum]. "Prosperous" at ≥ 0.62, "declining" at ≤ 0.40, a dead band between that decays a
  streak (cap 10); builds need a streak of 3, closures 4. This is the only real hysteresis on any "prosperity" in the host.
- PHASE4's "upkeep drag on prosperity" is a civilian development-value tilt; "mercenaries cost prosperity" is the health
  drain; EC S34's "prosperity lift above c 0.35" is the toll lift [STATED vs OBSERVED, DOCS seat].

### 3.10 Generation-only and display readers

Generation legitimacy gets −20 (Struggling), −10 (Poor), 0 (Moderate), +8 (Comfortable), up to +20 and is never recomputed
at runtime (`src/generators/factionDynamics.js:18-30`, `:127-161`). "Merchant Guilds (dominant)" fires only for Wealthy or the
dead word Thriving (`src/generators/power/rulingStructure.js:497-500`). The resilience dial gives +15 (Prosperous/Wealthy),
+8, 0, −8, −15 (`src/domain/state/deriveSystemState.js:104-132`). The treasury's tax scalar by rank is 0.45, 0.6, 0.75, 1,
1.2, 1.45, 1.7 (`wp/treasury.js:151-155`, dark).

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
  years is a polarised, top-heavy distribution, not a stationary one. Designed brakes on realm wealth are unbuilt (§7.3).

---

## 5. MOVEMENT BETWEEN SETTLEMENTS — every channel

Prosperity never diffuses, spreads, averages or presses as a field. Each channel below is a pair, a host read of its
neighbourhood, a realm-ranked pick or a belief. "Geometry" says what the channel reads of distance, adjacency, routes,
travel time, season and gates.

### 5.1 Purchase (generosity A2) — a band transfer, non-zero-sum
- Pair: a regional-graph edge of kind allied, trade partner, vassal or patron, or a live obligation
  (`wp/generosityKernel.js:477-523`). Direction: grain seller → buyer; payment buyer → seller.
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
- A boom names its artery neighbours (trade, allied, vassal, patron edges). It busts when throughput collapses below 1.0 or
  its roads become embattled — so a neighbour's war, a blockade of a partner, or a broken through-route knocks the boom town
  down a rung [INFERRED from `wp/upswingKernel.js:607-617` plus the caravan routing].
- Geometry: throughput is caravan arrivals over frozen routes; centrality is intermediate-node crossings of chosen routes
  (season enters route choice, `sp/entrepots.js:245-260`); embattlement is route danger. Arteries are graph adjacency, not
  drawn routes.
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
  reading, `research/sf/population-system.md:375`) — richer origins lose fewer emigrants.
- Departures are caused by pressures, not by prosperity (`wp/populationDynamics.js:288-310`): a bust does not by itself
  cause emigration, despite the bust comment "M4 reads the fallen prosperity" (`wp/upswingKernel.js:622-624`).
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
prosperity exists there.

### 5.10 Tolls and conquest — they move health, not the band
The entrepôt toll lift and the conquest-feed pulse move lifecycle economy health only (§3.9). Treasury transfers, the
corruption web and information-statecraft prices are BUILT DARK.

### 5.11 Routes, travel time, seasons, gates, capacity — summary
No band writer reads travel time, except that ransoms take weeks of travel and the boom's inputs ride routed caravans.
Seasons enter only through traditions (seasonal severity; a seasonal route class counts as a trade lane, `wp/traditionsKernel.js:358-364`),
route choice for caravans and migrants, and road legs. The host's frozen territory and gates do not read prosperity:
territory is the nearest settlement per cell by cost [STATED PHASE55:1061, 1130]. Capacity: entrepôt crossings saturate at
6 per tick; no route capacity is enforced [STATED fp-physical-integration row C2].

---

## 6. Couplings with the rest of the simulator

**Writers of the band** (§3): generation (`econ/economicState.js:866`) and four tick applicators. Pulse order within a tick
[OBSERVED `wp/pulseKernel.js`]: entrepôts (`:866`) … generosity (`:2561`) → upswing (`:2614`) → lifecycle (`:2630`) → the
growth chain that ends with traditions and roads (`:2735`); each reads the freshest settlement update, so steps compose
within a tick.

**Readers of the band**: `economic_capacity`'s baseline; upswing B1/B2/B3; purchase affordability; traditions (score,
cancellation, scale mismatch); satellite seeding and backing; resettlement ranking; corruption climate (spawn −0.15,
onset −0.06, exposure +0.12, capture advance −0.05, capture recovery +0.08, all × `prosperityRank01`;
`src/domain/corruption.js:159-167`, `:486-487`) and corruption reform (0.05, `wp/corruptionImpair.js:132`); corruption web,
counter-intel and information statecraft affordability floors (dark); naval fleet affordability; chaotic receptivity and the
secular sink (deity worlds); the believed pull band; the treasury (dark); generation legitimacy, merchant dominance and
neighbour strength (`src/generators/neighbourGenerator.js:133-145`); the resilience dial; the herald, gazetteer and
comparisons; the compendium's seven-rung reading ("not a dial you set; an output you read", `src/domain/compendium/bandLadders.js`);
the town v2 layout, interior, building dress and scene; the dormant condition grammar.

**Readers of `economic_capacity`**: M4 migration (richness 0.18, origin tolerance 0.4), culture distance (0.18 of the core),
military capacity (economy facet weight 0.10, `wp/militaryStrength.js:75-80`, `:245-251`) — read by the war layer, by roads
(`wp/roadsKernel.js:75`, `:1031`) and by trade salience — mobilisation (cool floor 30), reinforcement (0.26), army funding,
strategy, coup (behind `economicCoupReadEnabled`, lit nowhere), convergence, the cause word "underfunded", the dark
demographics wave (prosperity weight 0.16 push and pull, `wp/demographicsPushPull.js:149`, `:347-350`).

**Faith** [OBSERVED `wp/religiousContest.js:144-162`, `:199-201`; `wp/beliefAxisSubjects.js:150-160`]: crisis disorder
includes 0.20 × (1 − rank ÷ 6) and lifts only chaotic creeds (up to 0.6 × disorder); the unaffiliated sink's secular pull
rises as disorder falls, so comfort feeds secular drift [OBSERVED by the DOCS seat at `:920-933`; INFERRED chain];
festivals nudge the dedicated deity's share ±1. Faith never writes prosperity. Agrees with `research/sf/faith-system.md:641`.

**War and plague**: war reaches the band only through boom busts on embattlement, festival cancellation and penalties,
and the end of flourishing; it moves `economic_capacity` directly (war drain, war spoils, occupation extraction). Plague
neither reads nor writes the band in live code (no prosperity token in the pestilence, calamity or stressor kernels except
one comment line, `wp/stressorGates.js:539`); it cancels festivals as a hard stressor and lifts chaotic receptivity through
disorder [OBSERVED both seats; agrees with `research/sf/plague-system.md:296-300`].

**Feedback loops** [INFERRED from the cited code]: prosperity → festival success → prosperity (the ratchet, §3.3);
boom → rung → satellites → tributary lift to trade connectivity → indirectly more flow; boom fragility → bust → −rung and
−legitimacy; prosperity → corruption resistance, while reconstruction aid → skim → corruption; prosperity → secular drift →
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
| Boom/bust writer (B2) | — | lit\* | inert | — | — | inert | lit\* | — | `upswingArcsEnabled` + `commodityFlowEnabled` + canon (`sp/commodityFlow.js:172-177`; `sp/entrepots.js:144-146`) |
| Reconstruction, flourishing (B1, B3) | — | LIT | LIT | — | — | LIT | LIT | — | `upswingArcsEnabled`; aspatial |
| Purchase writer (A2); credit, overture | — | LIT | LIT | — | — | LIT | LIT | — | `constructiveFlowsEnabled` (`sp/generosityEV.js:925-938`); aspatial |
| Festival steps + fair pulse | — | LIT | LIT | — | — | LIT | LIT | — | `traditionsEnabled` |
| Pilgrim lift | — | lit\* | lit\* | — | — | lit\* | lit\* | — | + digest (`tr/pilgrimage.js:81-84`) |
| Ransom captor/home steps | — | lit\* | lit\* | — | — | lit\* | lit\* | — | `roadsEnabled` + digest (`wp/roadsKernel.js:340-353`) |
| Ransom payer step | — | — | — | — | — | — | — | — | BUILT DARK `thirdPartyRansomEnabled` (no preset) |
| Satellites; resettlement ranking | — | LIT | LIT | — | — | LIT | LIT | — | `settlementLifecycleEnabled`; resettlement proposal-gated |
| M4 richness / tolerance | — | lit\* | lit\* | — | — | lit\* | lit\* | lit\* | `migrationFlowsEnabled` (default true) + canon + emigration |
| Corruption climate | part | LIT | LIT | — | LIT | LIT | LIT | LIT | `npcAgencyEnabled` / `factionCompetitionEnabled` (QL: agency only; SC: both off); mount not traced |
| Corruption web, counter-intel, information statecraft floors | — | — | — | — | — | — | — | — | BUILT DARK (`corruptionWebEnabled` not in the register; `infoStatecraftEnabled` dormant) |
| Naval fleet affordability | — | lit\* | lit\* | — | — | lit\* | lit\* | — | `navalEnabled` + spatial |
| Treasury tax scalar | — | — | — | — | — | — | — | — | BUILT DARK `treasuryEnabled` (engine-gated dormant; promised to DC/LR/FS "after the band chip", `wp/simulationRules.js:470-473` [STATED]) |
| Demographics push/pull prosperity term; coup economic read | — | — | — | — | — | — | — | — | BUILT DARK (`demographicsEnabled` false in FS, absent elsewhere; `economicCoupReadEnabled` nowhere) |
| Chaotic receptivity, secular sink | deity | deity | deity | deity | deity | deity | deity | none | deity-gated, no flag; born worlds seat no deity |
| Believed pull band | — | — | lit\* | — | — | lit\* | lit\* | — | `believedConditionsEnabled` + non-omniscient + canon (RR is omniscient) |
| Lifecycle economy health | LIT | LIT | LIT | — | LIT | LIT | LIT | LIT | `institutionLifecycleEnabled` (off in SC); toll lift needs commodity + canon (RR, FS); conquest feed needs the war layer (DC, FS, or the gate) |
| Military capacity economy facet | war | roads\*, war | LIT | war | war | roads\*, war | LIT | war | war layer (DC, FS, or the gate); roads (RR, DC, LR, FS, canon); trade salience |
| Herald word, gazetteer, comparisons, resilience | LIT | LIT | LIT | LIT | LIT | LIT | LIT | LIT | UI (sorts broken, §10) |
| Town v2 attractor strength | v2 | v2 | v2 | v2 | v2 | v2 | v2 | v2 | settlements carrying layout law 2 (`tm/townMapModel.js:348-354`) |
| Condition grammar (ornament, tracery, material) | — | — | — | — | — | — | — | — | BUILT DARK, no producer or consumer (`tm/arch/conditionGrammar.js:9`) |

"war" in the military row means: only where the war layer is lit for that campaign (DC and FS carry it; elsewhere the
DM lights it through the Living-World gate); "roads\*" means the roads mover's capacity read on canonized campaigns.

### 7.3 Designed only (no code, or no lit path)

1. EC-7 grade profile ("fine" goods need a profile institution and Comfortable+; "rough" at Struggling/Poor; household
   demand by band) and EC-8 grade envelope (≥ Prosperous for 26 ticks promotes, ≤ Poor for 26 demotes) — UNBUILT; FOLD's
   TR→EC row reads "EC-0…EC-18 entire" [STATED EC:1440-1530, 1583-1590, M47 at 2306; FOLD §2].
2. PG pg-2: prosperity (as `economic_capacity` ÷ 100) lowers plague onset and duration — UNBUILT (`contagionEnabled` has no
   src hits) [STATED PG:198-248].
3. MF fabric: a material palette by band, ward wealth stratification and §11.4 **prosperity drift** (high street widens,
   parcels consolidate or subdivide) — UNBUILT and ruled out of FP into the map family (OD-FC-38) [STATED MF:334, 374-375,
   417].
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
| Generation | none — the configured route class `config.tradeRouteAccess` (and monster threat) | `econ/prosperity.js:182-190` |
| Boom/bust | caravan arrivals over frozen routes; centrality at intermediate route nodes (seasonal route choice); route embattlement; graph adjacency for arteries | `wp/upswingKernel.js:312-345`, `:609`; `sp/entrepots.js:236-262` |
| Festival fair pulse | the configured route class (a "seasonal" class counts) | `wp/traditionsKernel.js:358-364` |
| Pilgrim lift | path cost, distance weight, mapped test to the 8 nearest reachable | `tr/pilgrimage.js:79-104` |
| Ransoms | seasonal road legs in hop weeks; embattled roads | `wp/roadsKernel.js:812`; `rd/state.js:270-272` |
| M4 richness / tolerance | path cost, hop weeks, route choice by danger and season, distance weight | `wp/migrationKernel.js:217-264` |
| Satellites | territory partition, cost field and gates sampled read-only; optional site cell | `wp/settlementLifecycleKernel.js:52-60`; `wp/satellitesLedger.js:62-66` |
| Upswing peace | graph war fronts, naval blockades (adjacency) | `wp/upswingKernel.js` (peace read) |
| Generosity, resettlement | adjacency only / none (realm-wide) | §5.1, §4 |
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
  [INFERRED risk to "the settlement map never changes"]. The v1 layout does not read prosperity. The interior, building
  profiles and cartography read private ladders for furnishing, scale and masonry. The condition grammar (cuts 0.30 / 0.50 /
  0.75 → ornament density, tracery family, timber/stone/marble) is dormant.

### 8.3 What a prosperity lens needs from the host (read-only facts that exist)

1. The band per settlement (the word; rank on the seven-rung ladder, case-insensitive, string or `{tier}`).
2. The campaign's **resolved** rules — the writer flags and canon — not the preset id (the birth door, §7.1).
3. Boom records (`spatialLedgers.upswing.boom`: phase, arteries, fragile, entered tick) and the boom / Trade Bust
   conditions (tick in the id); reconstruction and flourishing records.
4. Dated news: boom mint, bust, purchase (names only), festival beats, ransoms, resettlements.
5. The digest's path cost and distance weight (pilgrim catchments; M4 columns as the population lens draws them).
6. The believed pull band per observer (belief presets only).
7. The configured route class (to explain generation and the fair pulse).

### 8.4 What it could add without inventing host facts [INFERRED]

- Band glyphs with a seven-step legend that includes Subsistence.
- Condition markers: boom (arteries drawn as graph links; "fragile" when fewer than two), bust, flourishing,
  reconstruction.
- Dated pair links: purchase buyer→seller (from the `trade_warmth` incident or the news headline), ransom captor↔home.
- Resettlement donor lines legended "the realm's richest", never "neighbours".
- Pilgrim catchments: the host plus its 8 nearest reachable by digest cost, for grand rites only.
- A "through-route" mark for settlements that sit at intermediate route nodes (the precondition for a boom) — derived from
  the host's own route choice, declared as a presentation.
- A band-change timeline from the map's own per-advance snapshots (§9.3).

### 8.5 What would be invention today

Any continuous prosperity field, gradient or "hinterland wealth" fill presented as a host fact (prosperity does not
diffuse); ward wealth, slums or the MF §11.4 drift; grade demand; travelling relief or purchase caravans (the purchase has no
route); a cause for any band (the host keeps none); pilgrim flows with sources.

### 8.6 Host changes that would make more of it real (the owner's to schedule)

1. A persisted band-change receipt {settlement, from, to, writer, tick} — the one change every other use needs.
2. Settlement ids on the purchase news item (today an empty list).
3. A distance term in the resettlement donor pool (or the honest word "richest").
4. Generation's route class derived from the canonized routes (would make PHASE55 §4b's "crossroads towns become wealthy …
   derived from position" true) — a genesis-time change.
5. The purchase or relief riding shipments with hop weeks (UPSWING A2 as designed).
6. MF §11.4 sourcing the band (in the map family by OD-FC-38).

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
   whose top is reached at Comfortable; in either case keep the per-tier ceiling as the hard bound.
3. **Bring hysteresis and a ledger.** The host has no hysteresis on the band and no history. Festivals can jitter a town
   ±1 year on year; booms climb a rung every seven weeks silently. Re-derive borders only when a new rung has held for N
   advances (or on a two-rung change), and keep a per-advance band snapshot (one word per settlement) as the map's own
   dated record. Where the boom drives the change, key on the boom's own records (enter 3.0, exit 1.5, dwell 3; the mint and
   bust are dated news), as `research/sf/trade-system.md` §9 item 6 proposes.
4. **Count prosperity once.** It already enters J378's military term (economy facet 0.10 of military capacity, through
   `economic_capacity`) and J382(a)'s culture resistance (0.18 of the core culture distance is the capacity gap). If the civil
   term also takes the band, prosperity counts three times. Either accept and document the small shares, or source military
   strength without its economy facet.
5. **Default-preset honesty.** On a BORN campaign the band never moves; on an RR-applied but uncanonized campaign it moves
   by festivals and purchases only; boom/bust needs RR or FS with canon. The territory lens must read the resolved rules (the
   preset id alone says "Realistic Regional" for a campaign with no writers) and say when its prosperity term is static.
6. **Marches and patrols.** The host couples nothing about marches or patrols to prosperity. The one real link: embattled
   routes bust a booming town — a dated host event a contested march can cite when it is a host war. Patrol density should
   not read prosperity unless the owner rules it as a map-side rule.
7. **Vassal chains do not pool wealth.** No prosperity moves along vassal or patron edges (indexed tribute is designed only);
   those edges only count as boom arteries. Chain reinforcement should not add the vassals' bands to the overlord's.
8. **Generation wealth is a configuration fact.** A settlement placed at a crossroads on the native map keeps the band its
   configured route class gave it. The map should show the configured class as a host fact and lint mismatches with its own
   routes, not override; a host change (§8.6 item 4) would close the gap.

### 9.2 Religion (J379; `research/sf/faith-system.md` §9.6)

9. **Add prosperity as a named cause, not a carrier.** Inverse prosperity is 0.20 of crisis disorder (chaotic creeds only),
   comfort feeds the secular sink, and festival outcomes move the dedicated deity's share ±1 — all local and deity-gated. A
   religion lens may cite the band among the causes of a share change; it never spreads prosperity or faith along routes
   (UPSWING B4 is unbuilt). This extends §9.6 item 8 ("culture as a resistance term already exists inside faith").
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
   believed pull band (four words) instead, which may be stale. The legend changes with the audience.
14. **Vocabulary.** Never legend lifecycle economy health, the toll lift or `economic_capacity` as "prosperity"; the host
   itself uses the word for three quantities (§3.9). One word, one meaning on the map.
15. **Town map.** Flag for the town-map seam: the v2 layout re-reads the live band at each build, so a pulse band step feeds
   a changed economic field into a settlement map that is meant never to change. Either the map module freezes the
   genesis band for town drawing, or the host does. The condition grammar's cuts are the host's ready band→dress table for a
   future fabric lens (MF §11.4 is the map family's by OD-FC-38).
16. **Corrections to the map module's own notes.** `research/sf/fp-physical-integration.md` row C6 (granary capacity
   derived from prosperity) and line 280 ("highest prosperity" as a migration axis) describe the design; the code reads tier
   and institutions for granaries and `economic_capacity` for migration. `research/sf/trade-system.md` §2 and §3.7 list
   the entrepôt toll, corruption, faction capture and demographics among band writers; none of them writes the band (the
   toll lifts lifecycle health; corruption and capture only read; demographics is dark and reads).

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
  `economic_capacity`; `{label}` reads −1 to the ladder).
- **D6. Two ladders and a seed disagree on every rung** while `src/domain/prosperityRank.js` calls itself "THE ONE ladder"
  (Comfortable 0.65 vs 0.667 vs 62; Struggling 0.10 vs 0.167 vs 30), plus private ladders in the town scene and cartography.
- **D7. One name, two meanings**: `prosperity01Of` is rank ÷ 6 in upswing, generosity, lifecycle and the dark statecraft
  modules, but `economic_capacity` ÷ 100 in demographics (`wp/demographicsPushPull.js:347-350`); PG pg-2 calls the latter "the
  EXISTING prosperity01Of" [STATED PG:210-211].
- **D8. Boom rungs are unrecorded**: the sustain branch emits only a receipt, and receipts are dropped at `applyPulseMover`
  (UPSWING §4 promises "receipted" steps).
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
  `sp/tradeFlow.js:12-18` calls it the byte-identical baseline; `wp/supplyKernel.js:580-586` says economic state is never
  written; `causalState.js:776-779` calls it generation-frozen. ATLAS and EC S18/S39 already record the writers [STATED].
- **C5.** The bust comment "M4 reads the fallen prosperity" and UPSWING B2's "bust → emigration pulse": emigration comes
  from pressures; a bust writes no population. PHASE55 §4c's "low prosperity pushes population out" exists only in the dark
  demographics wave.
- **C6.** PHASE55 §4i and `fp-physical-integration.md` C6: granary capacity does not read prosperity.
- **C7.** EC rows M7, M8 and M11 say famine, harvest and plague move prosperity "one way (S16)" today; S16 is generation-only.
  Row M47 says the band is "written each tick"; festivals write yearly, purchases on refusals, ransoms on events, booms
  about every seven ticks.
- **C8.** `wp/traditionsKernel.js:31-35` says the flag is dark; it is lit in four presets.
- **C9.** Resettlement says "nearby" and "neighbouring" (`settlementLifecycleFirstClass.js:291`, `:319`, `:410`; DESIGN
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
- **C16.** Sibling map-module note: `research/sf/trade-system.md:133`, `:310-313` lists the toll, corruption, faction capture
  and demographics as prosperity writers; they are not (grep: four label writers only).

### 10.3 Open questions

- (a) Does an Edit-Mode re-derivation overwrite a pulse-moved band in the stored settlement? The re-derivation regenerates
  it (§3.1); the store write was not traced.
- (b) Does a band step visibly move a v2 town plan (the economic field changes; the plan's sensitivity was not traced)?
- (c) The owner question recorded in code: should booms cool gracefully instead of only busting (`wp/upswingKernel.js:644-653`)?
- (d) Should the purchase debit carry its fraction across ticks, as the boom accrual does?
- (e) Is the festival ratchet (§3.3) intended? It polarises the realm and has no realm-level brake.
- (f) Is the festival pin meant to be per settlement (D10)?
- (g) For the map: relative or absolute band in territory strength (§9.1 item 2)?

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
ATLAS beyond grep; the pulse kernel beyond its mover call sites; `wp/traditionsKernel.js` 420-660 and 870-948; whether any
UI authors a festival pin (only a grep).
