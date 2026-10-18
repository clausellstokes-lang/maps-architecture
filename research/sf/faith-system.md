# SettlementForge's faith and deity system — local and global rankings, piety, conversion between settlements, and what a map lens can show

> Fable-reviewed 2026-10-18: PASS-WITH-CORRECTIONS — conclusions hold; citations, quotes and the "strongest carrier" overstatement corrected in place (lane retrovalidation/faith; J392)

Synthesis seat `research/sf-faith`. Host: `/home/user/clausellstokes-lang/settlement-engine` at `origin/master`
`81f1cd96`, read-only (nothing written there). Six reading seats returned structured readings (documents; architecture
and history volumes; state and ranking code; spread and conversion code; UI, map and data code; faith across the rest
of the simulator); this note merges them, settles their disagreements, and adds a set of my own re-reads of the code
at `81f1cd96` (listed in §11.3). A verifier's problems and omissions were then re-checked at the source and folded in
by a fixer seat (§12). Everything is in my own words; no code is copied; constants are quoted as values.

Tags: [STATED] = a document or a code comment says it; [OBSERVED] = a seat or I read it in code; [INFERRED] = reasoning,
with the reason given. Where seats disagreed I re-read the code and say so ("re-checked").

Path abbreviations: `wp/` = `src/domain/worldPulse/`, `rg/` = `src/domain/region/`, `sp/` = `src/domain/spatial/`,
`map/` = `src/components/map/`, `disp/` = `src/domain/display/`, `set/` = `src/components/settlement/`, `mig/` =
`supabase/migrations/`. Document abbreviations: REWORK = `docs/RELIGION_REWORK.md`, FAITH = `docs/DESIGN_FP_FAITH.md`,
FOLD = `docs/DESIGN_FP_COHERENCE_FOLD.md`, ARCH_WF = `docs/DESIGN_FP_ARCH_WF.md`, PHASE4 = `docs/PHASE4_FAITH_DELTA.md`,
COUPLINGS = `docs/DESIGN_FP_COUPLINGS.md`, PHASE55 = `docs/PHASE55_SPATIAL_ENGINE_DESIGN.md`, GRAMMAR =
`docs/DESIGN_FP_GRAMMAR.md`, ARCHITECTURE = `docs/DESIGN_FP_ARCHITECTURE.md`, WY = `docs/DESIGN_FP_ARCH_WY.md`.

Preset abbreviations (the seven shipped presets, `wp/simulationRules.js:864-1221`): QL `quiet_local`, **RR
`realistic_regional` (the default, :6)**, DC `dramatic_campaign`, SC `static_campaign`, NC `narrative_campaign`, LR
`living_realm`, FS `full_simulation`. One pulse tick is one week [STATED `wp/moralInstitutionPressure.js:55`].

---

## 1. Summary

**What the faith system is.** Faith in SettlementForge simulates *believers*, never gods: shares of adherents,
rightful-claim legitimacy, devotion, readings of events — and no receipt may say a god acted [STATED FAITH:47-51,
:124-129; `wp/faithNews.js:12-18`]. A deity is a premium, DM-authored custom-content record (alignment, law, rank,
domain, optional authored character and boon/bane) that does nothing until the DM seats it in a settlement as patron
or imposes it as a cult [OBSERVED `src/store/settlementDeityHelpers.js:62-271`]. Generation seats no deity; the old
generated "latent pantheon" was deleted [OBSERVED `wp/latentPantheon.js:6-12`; STATED FOLD:351 "the birth preset seats
no deity", FPQ-62]. Once a deity is seated, the weekly world pulse runs four layers:

1. **LOCAL ranking** — every deity-bearing settlement keeps its own pantheon: integer adherent shares summing to 100
   (less an "unaffiliated" bucket of up to 45), a standing ladder (cult → established at 15 → ascendant at 30), one
   deity per temperament-by-alignment niche, a tier-sized slot cap (thorp 1 … metropolis 7), and one **patron** (the
   older documents' "chief") defended by an incumbency hold and displaced only by a sustained lead or a seeded,
   legitimacy-weighted contest [OBSERVED `wp/religionState.js:45-85`, `:342-584`; `wp/cultImpositionApply.js:42`]. §3.
2. **GLOBAL ranking** — one realm ledger per deity: wins, losses, **seats** (the number of settlements where it is
   patron — never adherents), and an earned tier cult/minor/major derived lazily from seats with a two-tick dwell and a
   realm **containment cap** of two tier changes per tick. The earned tier feeds back into every settlement's local
   contest as "rank = the higher of authored and earned" [OBSERVED `wp/pantheon.js:54-70`, `:278-392`;
   `wp/religiousContest.js:565-581`]. §4.
3. **PIETY** — not a stock and not a ranking: a slow **multiplier field** on faith effects, local `f` (0.65–1.65) times
   realm `g` (0.825–1.325), composite clamped to 0.5–2.0. The "global piety" is `g`, an unweighted realm mean of local
   piety [OBSERVED `wp/piety.js:1-99`, `:299-321`]. §5.
4. **CONVERSION BETWEEN SETTLEMENTS** — the SPREAD lane: a bearer's *patron* (never its cults) travels along relationship
   edges and garrison/authority channels, is pulled harder by big settlements than small ones, clusters through
   neighbour prevalence, is attenuated by mapped distance on canonized worlds, enters the target's pantheon through the
   same local entry rules, and becomes a "conversion" only when it takes the target's patron seat; the occupier's creed
   follows its garrison [OBSERVED `wp/religiousContest.js:79-160`, `:306-653`]. §6.

**The three things the owner named, as built at `81f1cd96`:**

- *Local and global deity rankings* — both exist and run **in every preset with no flag**, gated only on a deity
  being seated [OBSERVED `wp/religiousContest.js:17-33`, `:544-547`; `wp/pulseKernel.js:1698-1716`].
- *A global piety system* — exists as the realm multiplier `g`, but `g` is **exactly 1.0 unless faith spread is on**,
  so it is live only in DC and FS and inert in the default RR [OBSERVED `wp/pulseKernel.js:1331`; `wp/piety.js:311-321`].
- *Religion conversions moving between settlements* — exist in the SPREAD lane (`faithSpreadEnabled`), **lit only in DC
  and FS by preset default** (`wp/simulationRules.js:940`, `:1018`). In the default RR and in QL, SC, NC and LR, "each settlement's
  pantheon evolves as if it were the only faith-bearing settlement" [STATED `wp/religiousContest.js:29-33`]. As a
  description of RR that sentence is too strong: at least five faith reads still cross settlement lines there — foreign
  patrons pressing a neighbour's moral institutions (§6.11), the conversion-fracture *crisis* stressor (§6.10),
  trade-normalized institution tolerance (§7.4), faith-weighted relief between partners (§7.10.1), and, on canonized
  worlds, faith-weighted contraband at commodity arrival gates (§7.10.2); on canonized worlds migration destination
  choice and the foreign-seat weight also read faith closeness (§7.6, §7.10.2). None of them moves a believer. And
  "dark in RR" is a preset default, not a ceiling: the premium Living-World gate lets a DM light spread on any
  campaign, RR included (§6.1).

**Two facts dominate everything downstream, including any map lens.** (a) A born world has no deity, so on a fresh
world every faith mechanism, ranking and surface is empty until a premium DM authors and seats one (FPQ-62, the owner's
open word). (b) Faith is **relational, not geographic**: who can reach whom is the diplomacy/war graph; the frozen
spatial digest only *attenuates* pull (between 0.35 and 1.0) on spatially canonized worlds; the conversion contest reads
no season, no travel time, no route, no territory and no site (the conversion's parked regional ripple and moral
founding do read a season, §6.14; the host's faith-place facts are settlement-grain labels without coordinates,
§7.10.3); and there are no pilgrims, missionaries or legates moving anywhere in
code — the pilgrim and legate movers (WF-2) are unbuilt and the "missionize" lever is a trust nudge [OBSERVED; §6,
§9].

**How this changes the map-side view (J379), in short** — details in §9.6: the lens idea survives, but (1) in the
default preset no creed moves unless the DM lights the Living-World gate for that campaign, so the lens must read the
resolved rule and show still pantheons honestly when spread is off (faith-weighted relief and contraband still cross
settlement lines); (2) "flows along carrier
routes from dated host receipts" cannot be read from the host today — conversion receipts name only the convert, the reach
map is not persisted, the drawn faith channels carry no deity id and are never retired; (3) holy places, sacred sites,
hidden cult sites and pilgrim/missionary encounters have **no faith geometry** behind them — no coordinates and no faith
movers; the host holds only settlement-grain faith-place labels (the typed neighbour graph's `pilgrimage_center` /
`religious_superior` links, which `mapProfile` already outputs as a religious hierarchy "the map should render", with no
consumer; and the generation resource `holySite`), so a lens may label those settlements, but drawing positioned sites or
encounters would be inventing facts; (4) the "containment cap" bounds tier
changes in the global ledger, not spread; (5) the host already has a culture-like resistance term (the incumbent
counterforce) and a ruler-versus-populace tension (ruler endorsement, growth favour, divine mandate, patron security),
which the lens can show rather than invent; (6) a believed-faith player view exists only under the belief layer
(canonized worlds in DC, LR, FS), and the faith fronts default to DM-only visibility.

---

## 2. The deity and its data

### 2.1 The authored record

- A deity is a `custom_content` row of category `deities`, owner-scoped and premium to write
  [OBSERVED `mig/049_custom_content_deities.sql:1-68`]. Required axes: `alignmentAxis` good/evil/neutral, `rankAxis`
  major/minor/cult, and a stored `temperamentAxis` warlike/peacelike/neutral. Migration 056 adds the optional `lawAxis`
  lawful/chaotic/neutral (absent ⇒ neutral) [OBSERVED `mig/056_deity_law_axis.sql:1-41`].
- The **temper the engine uses is derived** from alignment and law (evil and chaos weighted 0.7/0.3 with a 0.15
  dead-band), unless an `authoredTemper` overrides it; the stored `temperamentAxis` is a compatibility mirror the
  engine does not read [OBSERVED `wp/deityAxes.js:95-153`; STATED ARCH_WF V10]. Two code comments still claim the stored
  value is used verbatim and are stale (§10, item 4).
- Optional authored character (migration 200 and the JS admission wall): up to 16 `characterAxes` tokens
  (axis:pole:level, virtue/vice, a_touch/marked/defining, one per axis), a `boonChannel`/`baneChannel` pair with
  strengths faint/firm/heavy over nine channels (harvest, trade, craft, healing, sea, order, war_readiness, learning,
  hearth), and `authoredTemper`. Drift keys are refused by name ("divine immutability") [OBSERVED
  `src/domain/customContentSchema.js:183-330`, `:354-400`]. The database CHECK for
  these fields is **not deployed** by its own header [OBSERVED `mig/200_deity_authored_character.sql:5-12`; one seat
  cited lines 83-236, which do not exist in this 155-line file].
- `domain` is one word; war/conquest/hunt/harvest carry a war-bar pressure that is mechanical only under WR-2's `dispositionChannelsEnabled` (lit in no preset, §7.2; `src/copy/deityAuthoring.js:45` tells the author so), the rest display only.
  `portfolio` is free text with zero mechanics [OBSERVED `src/domain/display/deityEffects.js:84-176`; STATED
  PHASE4:899-915].

### 2.2 The embed: how a deity enters the world

- The DM verbs are `SET_PRIMARY_DEITY` (patron) and `IMPOSE_CULT` (a cult beneath the patron), dispatched from the
  dossier's `DeityAssignmentPanel` or from the Herald Faith door's `AssignDeityFromMap` (a settlement picker beside the
  map — not a click on the map), and from the event composer [OBSERVED `set/DeityAssignmentPanel.jsx:107-369`;
  `map/AssignDeityFromMap.jsx:41-107`; `src/domain/events/mutateEntities.js:948-996`].
- The store resolves the authored row, mints a stable identity `deity:<scope>:<slug>` (the code's word is account-scoped: scope = the deity's own `localUid`, the authoring account's local token, falling back to `id`; `src/lib/customRegistry.js:111-141` [Fable-reviewed 2026-10-18: the two files cited below embed the snapshot, they do not mint the ref]), and embeds a **frozen
  snapshot** (name, the axes, domain, the authored-character keys) on the settlement as `config.primaryDeitySnapshot`
  (+ `primaryDeityRef`) or into `config.cultDeitySnapshots` [OBSERVED `src/domain/deitySnapshot.js:56-118`;
  `src/domain/deityCommitEmbed.js:54-144`]. The pulse reads only these embeds, never the authored row. `portfolio` is
  not copied into the snapshot [OBSERVED `src/domain/deitySnapshot.js:56-68`].
- The write gate fails closed: an entitled (premium) account may assign; a lapsed account may only remove; a free
  account is refused with an upsell that names no deity [OBSERVED `src/store/settlementDeityHelpers.js:62-111`]. The
  composer lane bypasses this store gate and relies on its own UI gates [STATED same file :48-56].
- "Restore from world" re-seats a faith recorded in the campaign's own `religionStates` without re-minting its id
  [OBSERVED `src/store/settlementDeityHelpers.js:128-184`].

### 2.3 Niche and rank

- **Niche** = derived temper × alignment, nine cells; at most one active deity per niche [OBSERVED
  `wp/cultImpositionApply.js:35-37`].
- **Authored rank** maps to two tables: `DEITY_RANK_STRENGTH` major 0.95 / minor 0.6 / cult 0.35 (conversion strength)
  and `DEITY_RANK_AUTHORITY` 18 / 10 / 5 (the settlement's causal `religious_authority` lift) [OBSERVED
  `DEITY_RANK_STRENGTH` single-sourced at `wp/cultImpositionApply.js:52`, re-exported through `wp/pantheon.js`
  `PANTHEON_TUNING` (`:92`, `:476-479`) and `wp/religiousContest.js:102`; `DEITY_RANK_AUTHORITY` at
  `src/domain/deityConstants.js:29`, applied with the local piety multiplier at `src/domain/causalState.js:1152-1163`]. The snapshot default rank is minor.
- **Earned rank** is the global pantheon tier (§4). The contest uses the higher of the two; several readers use only
  the authored one (§4.5).

### 2.4 Latent deities

- Generation **no longer** bakes a latent pantheon; the `seedStartingPantheon` step and its premade pool were deleted
  ("no premade deities — custom content only") [OBSERVED `wp/latentPantheon.js:1-31`]. `config.latentPantheon` now
  exists only on legacy saves, where `activateLatentPantheon` copies it into the live embeds on a premium open path,
  idempotently and never over a DM assignment [OBSERVED same file :89-107].
- `latentPantheon` is a DM-only secret: stripped client-side by the public-copy key filter and server-side from the
  public dossier, from published world snapshots (rejected if present) and from the DM-full gallery share [OBSERVED
  `src/domain/display/publicSafe.js:73-110`; `mig/128_latent_pantheon_public_denylist.sql:4-23`, `:181-193`;
  `mig/129_strip_latent_pantheon_gallery_dm_full.sql:11-20`]. Activated embeds are deliberately *not* stripped.
- A separate, live kind of latency: a **suppressed** deity inside a settlement's pantheon (share 0, kept as memory, up
  to three per settlement) that can come back (§3.7).

### 2.5 Faith at generation (no deity, but faith-shaped output)

- The religion priority slider (`priorityReligion`, 0–100, default 50) scales the chance of religious institutions
  (church, cathedral, monastery, temple, shrine, abbey, friary, hospital) and of theocratic seats by slider/50
  [OBSERVED `src/generators/institutionProbability.js:88-91`, `:139-146`; default 50 at `src/generators/steps/resolveConfig.js:192` and `src/store/configSlice.js:29` (`:74` is the Random-mode roll)].
- Above a derived religion influence of 55 (the slider × crime, economy, church and stress modifiers, `src/generators/priorityHelpers.js:421-427`; tested at `economicState.js:227`, `:241`) with a religious institution, the economy gets a static "Church Tithes" income line; above 68 on a road or
  crossroads, a "Pilgrim Trade" line; the `holySite` resource boosts religious institutions and sets a pilgrimage
  marker (`pilgrimage: !0`, `src/data/resourceData.js:409`, carried at `src/generators/resourceGenerator.js:386`); a cathedral, monastery or pilgrim institution also opens a "Pilgrimage & religious tourism" export chain [OBSERVED `src/generators/economy/economicState.js:226-248`; `src/data/resourceData.js:399-411`;
  `src/generators/computeActiveChains.js:935-938`].
- The layout text names a "Religious Quarter" (a text location, not geometry) or a "Roadside Shrine" [OBSERVED
  `src/generators/spatialGenerator.js:30-95`]. History text still fills a `{deity}` slot with generic names ("the Sun
  God", "the Earth Mother") [OBSERVED `src/generators/historyGenerator.js:212`].
- Generating against an imported neighbour can seed mirror or opposition *factions* with faith labels ("Pilgrims bound
  for X", "X Proselytizers", "Theological Opposition to X") by relationship type, never by distance [OBSERVED
  `src/generators/neighbourGenerator.js:276-363`, `:461-503`].
- None of this creates religion state; the simulator's faith begins only at the DM's first embed.

---

## 3. LOCAL ranking — the per-settlement pantheon

### 3.1 The state and the read-model

- Engine state: `worldState.religionStates[saveId]` = a `deities` map (per deity: ref, frozen snapshot, niche, integer
  share, standing, standing dwell, suppressed flag, legitimacy, tenure, heresy stain, and — when unseating is lit — the
  tick it was suppressed) plus `patronRef`, the patron's hold and challenge counters, `contestedTicks`, siege fields for
  the contest, `capacity`, an optional float `noneShare`, and an optional `patronFalls` ring [OBSERVED
  `wp/religionState.js:164-233`]. The key is materialized only when non-empty [OBSERVED `wp/pulseKernel.js:1718-1722`].
- Writers: the religion fold (`advanceReligionStates` in `wp/religiousContest.js:544`, using `wp/religionState.js`)
  and a second, declared path, the traditions observance nudge (§3.9). The fold rules them one "writer family"; the code
  routing is still owed [STATED FOLD:267; OBSERVED `wp/traditionsKernel.js:443-490`, `:857-863`].
- Read-model: `config.faithProfile`, re-derived every tick by the projection — patron (name, ref, share, legitimacy),
  `deities[]` sorted by share descending then ref (each with niche, share, standing, legitimacy, isPatron), `contested`,
  `patronSecurity`, and optional `unaffiliated`, `piety`, `martial`, `patronFall`, `field` [OBSERVED
  `wp/religionState.js:614-672`; called from `wp/pulseKernel.js:1877`]. `config.primaryDeitySnapshot` is the patron's
  compatibility mirror that older readers and the global seat count use [OBSERVED `wp/applyWorldPulse.js:188-242`].

### 3.2 Shares

- Integer adherent points over the *active* (unsuppressed) deities, summing to 100, or to 100 minus the rounded
  unaffiliated bucket; renormalized by largest remainder [OBSERVED `wp/religionState.js:136-147`].
- Each tick a deity's target share is its strength over the sum of active strengths, ×100, and its share moves toward
  that target by **at most 6 points** [OBSERVED `wp/religionState.js:48`, `:342-367`]. Strength is the local growth
  strength (§6.6) × the tick-start piety composite [OBSERVED `wp/religiousContest.js:776`, `:799-805`].
- A present faith that no carrier reaches keeps an innate carrier: 0.5 if it is the patron, 0.25 otherwise — a home
  advantage for the incumbent [OBSERVED `wp/religiousContest.js:801`].

### 3.3 Standing (the local rank ladder)

- cult below 15, established at 15, ascendant at 30, with a hysteresis of 4 (an ascendant holds down to 26, an
  established to 11) [OBSERVED `wp/religionState.js:51-53`, `:150-155`].
- Standing weights devotion and field voice (ascendant 1, established 0.6, cult 0.25), gates tenure accrual and
  heresy-stain burn-off, weights institution backing (1, 0.6, 0.1), and only established-or-better rivals can open the
  organic contest [OBSERVED `wp/piety.js:46`; `wp/religionLegitimacy.js:184`; `wp/religionState.js:555`].

### 3.4 Niche and slots

- Slots by tier: thorp 1, hamlet 2, village 2, town 3, city 5, metropolis 7; unknown tier 2. Capacity counts every
  active deity including the patron; DM imposition reserves one slot for the patron [OBSERVED
  `wp/cultImpositionApply.js:42-47`, `:91`].
- One active deity per niche, with two exceptions: at first seed the patron's niche admits one imposed contestant, and
  a same-niche rival is exactly what a **schism** is [OBSERVED `wp/religionState.js:195-198`, `:486-493`].

### 3.5 Entry paths (how a newcomer gets in)

A reaching faith attempts entry with claim = its strength × 100 [OBSERVED `wp/religionState.js:292-331`;
`wp/religiousContest.js:767-794`]:

| Path | Condition | Result |
|---|---|---|
| Same-niche push-out | claim > 1.1 × the incumbent's share (`PUSH_MARGIN`) | incumbent suppressed; newcomer enters |
| Open niche, free slot | a slot is free | enters as a cult at share max(4, …) (`CULT_SEED_SHARE` 4) |
| Cross-niche eviction | capacity full and claim > 1.5 × the weakest active share (`EVICTION_MARGIN`) | weakest suppressed; newcomer seeds at max(4, half the evicted share) |
| Forced (occupation) | the occupier's creed | ignores capacity ("forced overflow"), carries a 0.45 heresy stain; nothing trims the overflow later |

In practice every outside entry needs the SPREAD lane, because only `reaching` faiths attempt entry and `reaching` is
empty when spread is off [OBSERVED `wp/religiousContest.js:592-653`, `:768`]. In the default preset a new creed can
arrive only by DM act.

### 3.6 The patron seat ("chief") and incumbency

- With no incumbent, the top-share active deity becomes patron. An incumbent is displaced organically only when a
  challenger leads it by **6 or more share points for 3 consecutive ticks**; legitimacy is deliberately left out of
  this organic rule [OBSERVED `wp/religionState.js:56-57`, `:451-474`].
- **Five incumbency buffers** [OBSERVED]: (a) the patron hold resists 35% of every downward share step, eroding by 0.02
  per tick while the patron's lead is under 6 (`wp/religionState.js:54-55`, `:348-361`); (b) the 6-point/3-tick rule;
  (c) the legitimacy-squared shield in the contest (below); (d) legitimacy itself lags (0.12 per tick) and is fed by
  tenure, institution backing and ruler endorsement (`wp/religionLegitimacy.js:74-134`, `:473-536`); (e) the patron's
  innate 0.5 carrier (§3.2).
- **Contest / schism.** A seeded roll for the seat opens when a rival shares the patron's niche (schism) or when patron
  legitimacy falls below 0.30 + 0.12 × method clash and an established-or-better rival outweighs it (organic). Weight =
  0.78 × legitimacy + 0.22 × share/100; the patron's weight is multiplied by (1 + 1.7 × legitimacy²); the top three are
  rolled through a PRNG forked per settlement and tick, and the same winner must take **3 consecutive rolls** (the
  siege). While contested, the seat holds and organic flips freeze [OBSERVED `wp/religionState.js:62-71`, `:476-584`;
  `wp/religiousContest.js:879-894`]. `patronContestOdds` is a deterministic preview of these odds for the DM
  [OBSERVED `wp/religionState.js:495-511`].
- **Patron security** = (0.7 × legitimacy + 0.3 × share/100), × 0.65 when contested; it is the one scalar that props or
  erodes the throne (§7.1) and scales holy-war claims (§7.2) [OBSERVED `wp/religionState.js:629`].
- **DM re-assign.** When `config.primaryDeitySnapshot` differs from the state's patron, the DM is authoritative: the
  assigned deity is installed as the dominant patron at share max(60, others + 10), the flip-challenge counter (`patronChallengeTicks`) resets (`contestedTicks` and the siege fields do not), shares
  renormalized [OBSERVED `wp/religionState.js:211-231`]. This produces **no** conversion outcome and no pantheon
  win/loss, because the conversion block compares against the patron read *after* this branch; the patron-fall
  classifier, which reads the prior tick's patron, records it as `imposed` [OBSERVED, re-checked
  `wp/religiousContest.js:711-723`; `wp/patronFall.js:102-116`].

### 3.7 Suppression, resurgence and prune

- A displaced deity becomes suppressed: share 0, standing cult, kept as latent memory; the single writer is
  `suppressDeity` [OBSERVED `wp/religionState.js:271-279`].
- At most **3** suppressed entries are kept. Dark, the excess is deleted in codepoint order; with
  `faithUnseatingEnabled` the suppression tick is stamped and the **longest-dormant** goes first [OBSERVED
  `wp/religionState.js:431-443`].
- A suppressed creed that a carrier reaches again re-enters through the normal entry rules as a fresh cult
  (resurgence) — which, again, needs the SPREAD lane [OBSERVED `wp/religiousContest.js:767-794`].
- When a pruned creed has no road back (no carrier, not the town's own embed or cult), the town's "last altar goes
  dark" obituary fires under the unseating flag (WF-8a) [OBSERVED `wp/religiousContest.js:806-865`;
  `wp/faithNews.js:118-140`, `:209-232`].

### 3.8 Legitimacy (the rightful-claim axis)

- Each deity entry carries legitimacy 0–1, distinct from share; seeds 0.55 for a seeded patron, 0.08 for a cult, and an
  imposed or forced faith carries a 0.45 heresy stain [OBSERVED `wp/religionState.js:58-61`].
- Target = ruler endorsement × (0.42 + 0.40 × compromise) + 0.20 × fade × neighbour recognition + 0.30 × fade × tenure
  saturation (tenure/(tenure+8)) + 0.08 × chronicle term + 0.12 × institution backing × standing backing + piety-gated
  synergy (0.06) and conduct fit (0.14) − heresy stain − clergy scandal drag (0.16 × (taint + 0.6 × revealed taint) × a court modifier 0.5–1.5; `wp/religionLegitimacy.js:131-133`, `:515-517`); fade = 1 − 0.5 ×
  compromise. It lags toward the target at 0.12 per tick; tenure moves ±1; the stain decays 0.06 per tick only while
  established or better [OBSERVED `wp/religionLegitimacy.js:74-134`, `:191-202`, `:218-315`, `:344-380`, `:473-536`].
- Neighbour recognition (capped 0.5, mass-weighted, **not** distance-weighted) is a SPREAD-lane term — zero when spread
  is off [OBSERVED `wp/religionLegitimacy.js:360-380`; `wp/religiousContest.js:728-733`].

### 3.9 Other local movers

- **Unaffiliated sink** ("none"): grows by 0.02 × secular pull × (45 − none) and drains by 0.06 × crisis × none, capped
  at 45, where secular pull = (1 − crisis) × (1 − authority); it never ranks and never reaches atheism; it starts from
  the second religion tick because it needs a measured piety record [OBSERVED `wp/religionState.js:72-85`, `:386-404`;
  `wp/religiousContest.js:924-934`].
- **Observance nudge**: a deity-dedicated tradition's triumph or failure moves one share point between the rite's dedicated deity (`rec.deityRef`, stamped from the patron when the rite was founded, `src/domain/traditions/genesis.js:181`; a non-patron after a conversion) and
  the largest other active deity, conserving the total; skipped for a single-deity pantheon [OBSERVED
  `wp/traditionsKernel.js:443-490`]. Lit with `traditionsEnabled` (RR, DC, LR, FS).
- **Crisis receptivity** and **growth favour** shape strength locally (§6.6).

### 3.10 Constants, in one place [OBSERVED, files as cited]

| Constant | Value | Home |
|---|---|---|
| Share step per tick | 6 | `wp/religionState.js:48` |
| Cult seed share | 4 | `wp/religionState.js:47-50` |
| Push-out / eviction margin | 1.1 / 1.5 | `wp/religionState.js:47-50` |
| Standing thresholds, hysteresis | 15 / 30, 4 | `wp/religionState.js:51-53` |
| Patron hold, decay per contested tick | 0.35, 0.02 | `wp/religionState.js:54-55` |
| Flip margin, flip ticks | 6, 3 | `wp/religionState.js:56-57` |
| Legitimacy seeds; imposed stain | 0.55 / 0.08; 0.45 | `wp/religionState.js:58-61` |
| Contest weights; patron shield; organic threshold | 0.78 / 0.22; 1 + 1.7·L²; 0.30 + 0.12·clash | `wp/religionState.js:62-71`; the 0.12 is `STANCE_TUNING.CONTEST_METHOD`, `wp/deityStance.js:71`, applied `wp/religionState.js:553` |
| Sink cap, secular rate, revival rate | 45, 0.02, 0.06 | `wp/religionState.js:72-85` |
| Suppressed entries kept | 3 | `wp/religionState.js:431-443` |
| Slots by tier | 1/2/2/3/5/7 (unknown 2) | `wp/cultImpositionApply.js:42-47` |
| Faith mass by tier; influence ratio clamp | 1/2/4/8/16/32; 0.12–4 | `wp/religionState.js:99-119` |
| Legitimacy weights | ruler 0.42 (+0.40·compromise), neighbour 0.20, tenure 0.30, chronicle 0.08, institutions 0.12 | `wp/religionLegitimacy.js:74-134` |
| Legitimacy lag; stain decay; recognition cap | 0.12; 0.06; 0.5 | `wp/religionLegitimacy.js:75` (LAG), `:79` (STAIN_DECAY), `:81` (PREVALENCE_CAP); applied `:473-536` |
| Innate home carrier | patron 0.5, other 0.25 | `wp/religiousContest.js:801` |

### 3.11 Status and a defect

- **Status:** LIT in every preset with **no flag**, gated only on deity presence (any member with a patron embed or a
  DM-imposed cult) [OBSERVED `wp/subsystemActivation.js:33-47`; `wp/religiousContest.js:17-23`, `:545-547`]. Vacuous on a
  born world. The narrative prune and suppression stamp ride `faithUnseatingEnabled` (RR, DC, LR, FS).
- **[OBSERVED, re-checked] A cult imposed after the pantheon exists never enters it.** `ensureReligionState` reads
  `config.cultDeitySnapshots` only when the deities map is empty (first seed); once a pantheon exists, a later
  `IMPOSE_CULT` writes config only (`src/domain/events/mutateEntities.js:965-996`), and the only other pulse readers of
  that list are the activation gate (`wp/subsystemActivation.js:46`, plus the fold's own per-settlement presence check,
  `wp/religiousContest.js:707-708`), the WF-8a "road back" fence (`:851`), and the cause vocabulary's `rivalCult` flag
  (`wp/causeVocabulary.js:127`, `:139`), which marks the faith cause class `conversion-pressure` present whenever any
  cult is imposed (`:211`) [`wp/religionState.js:173-210`]. So the DM's cult lever works only before the first religion
  tick; the WF-8a fence treats a post-seed cult as a road back that does not exist; and cause attribution can blame a
  "rival cult" the pantheon never admitted (read by the cause lifecycle, `wp/causeLifecycle.js:358`, mounted when a
  compromise exists or a cause-lifecycle ledger is already held, `wp/pulseKernel.js:1828-1829`).
- **[OBSERVED in the code paths, not executed] Clearing a patron does not clear the pantheon.** `SET_PRIMARY_DEITY`
  with no deity deletes only the two config embeds (`src/domain/events/mutateEntities.js:935-941`); `ensureReligionState`
  has a re-assign branch but no clear branch (`wp/religionState.js:211-231`); and the fold keeps evolving any settlement
  that already holds state (`wp/religiousContest.js:701`, `:709`). So `religionStates` keeps the old patron,
  `faithProfile` keeps naming it, the global seat count (which reads only the config embed, `wp/pantheon.js:278-296`) no
  longer counts it, and a later organic flip re-embeds a patron on a settlement whose patron the DM cleared (`wp/religiousContest.js:1012-1023` → `wp/applyWorldPulse.js:195-197`; the cleared deity itself only if it wins). If the
  last embed realm-wide goes, the fold returns null at the gate (`wp/religiousContest.js:547`); the kernel then writes
  `religionStates` only when non-empty (`wp/pulseKernel.js:1720-1722`), skips the pantheon (`:1704`) and skips the
  projection (`:1876-1878`), so the stale `religionStates`, `pantheon` and config `faithProfile` are never cleared.
- **[OBSERVED] Tier drift resizes the pantheon silently.** Capacity is recomputed from the settlement's current tier
  every tick (`wp/religionState.js:165`, `:172`) and faith mass rides the current tier (`:92-107`), but capacity is
  consulted only at first seed and at entry (`:199`, `:319-330`). Nothing trims a pantheon that a demotion left over
  capacity; it only refuses later newcomers (or makes them clear the 1.5 eviction margin). Tier drift is lit in every
  preset but SC (`wp/simulationRules.js:75`, `:977`). This is the same "nothing trims the overflow" gap as forced entry
  (§3.5), reached by a different road.

---

## 4. GLOBAL ranking — the realm pantheon

### 4.1 The ledger

`worldState.pantheon[deityId]` = wins, losses, seats, tier, tierHeld; one writer, `advancePantheon`, run after apply
whenever religion is locally active; the key is materialized only when non-empty [OBSERVED `wp/pantheon.js:1-80`,
`:426-474`; `wp/pulseKernel.js:1698-1716`]. The deity id is the snapshot's minted ref, falling back to `deity:<name>`
[OBSERVED `wp/pantheon.js:141-147`].

### 4.2 Seats — the only driver of tier

- Seats = the number of settlements whose **pre-tick** `config.primaryDeitySnapshot` is this deity, counted in codepoint
  order. **Only patron seats count**: adherent shares, cult presence and the unaffiliated bucket never enter the global
  rank [OBSERVED `wp/pantheon.js:278-296`].
- Because the count reads the pre-tick snapshot and the conversion re-embed lands in the apply pass, a seat change
  appears **one tick after** the patron flip [OBSERVED `wp/pulseKernel.js:1323-1346`; INFERRED from the order].
- A creed with large minority shares in many cities and no patron seat ranks "cult". REWORK §2.7 says rank comes from
  "chief-seats + total adherents worldwide"; no adherent total exists anywhere [STATED REWORK:117-121; OBSERVED
  `wp/pantheon.js:14-19`].

### 4.3 Tiers, dwell, and the containment cap

- cult → minor at ≥ 2 seats; → major at ≥ 4; minor → cult at ≤ 1; major → minor at ≤ 2, or straight to cult at ≤ 1
  [OBSERVED `wp/pantheon.js:54-57`, `:158-181`].
- A new qualification must hold **2 ticks** (`TIER_HOLD_TICKS`) [OBSERVED `wp/pantheon.js:63`, `:350-366`].
- **Containment cap:** at most **2 tier changes realm-wide per tick** (`MAX_TIER_CHANGES_PER_TICK`); the largest jump
  first, ties by codepoint id; the deferred keep their dwell (clamped at 5) — "the pantheon converges instead of
  cascading" [OBSERVED `wp/pantheon.js:65-70`, `:368-392`]. The cap bounds how fast *tiers* change. It does not bound
  spread, conversions or seat counts.
- [OBSERVED order, re-checked] A tier changes no sooner than **two ticks** after the seat-changing flip. A flip at tick
  T is re-embedded in T's apply pass, but T's `advancePantheon` counts the pre-tick snapshot (the old seat); at T+1 the
  new seat is counted and the dwell becomes 1 (not matured); at T+2 the dwell reaches `TIER_HOLD_TICKS` (2) and the
  change applies (`wp/pantheon.js:278-296`, `:350-366`, `:384-387`, `:466-474`; `wp/pulseKernel.js:1704-1716`). The first
  dwell tick is the seat-lag tick. Longer when the realm cap defers it.

### 4.4 Wins, losses, remnants, last seats

- A conversion outcome banks a win for the newly embedded patron and a loss for the convert's pre-tick patron (no loss
  for a self-replacement), saturating at 9999 [OBSERVED `wp/pantheon.js:237-256`]. Wins and losses do **not** drive tier;
  they feed the UI and the (dormant) wrathful-flaw check [OBSERVED `wp/deityFlaws.js:221-223`].
- A DM re-assign produces no win or loss (§3.6).
- Zero-seat entries persist forever as remnants; there is no realm deity death — the tier ladder and the Twilight are
  the only realm fall [OBSERVED `wp/pantheon.js` (no deletion path); STATED FAITH J-WF-1, ARCH_WF V16].
- With `faithUnseatingEnabled`, a 1 → 0 seat loss that the tier ladder cannot narrate emits a "last seat" row
  [OBSERVED `wp/pantheon.js:426-474`].

### 4.5 How local success raises global rank, and how global rank feeds back

- **Up:** a settlement's patron flips (§3.6) → conversion outcome → re-embed of `config.primaryDeitySnapshot` → the next
  tick's seat count → two-tick dwell → realm cap → tier change → realm arc [OBSERVED chain across
  `wp/religiousContest.js:995-1025`, `wp/applyWorldPulse.js:188-242`, `wp/pantheon.js`].
- **Down:** a deity's effective rank = the higher of its authored `rankAxis` strength and its earned tier strength
  (0.95/0.6/0.35). Earned rank can only raise strength, never lower an authored major [OBSERVED
  `wp/religiousContest.js:565-581`]. It enters local growth strength (weight 0.45), the prevalence pull, the
  `religious_authority` mint strength (weight 0.25) and neighbour recognition [OBSERVED `:511`, `:494`, `:604-610`,
  `:872`]. So a cult that wins four seats converts like a major.
- Readers that **ignore** earned tier and use the authored rank only: the causal `religious_authority` lift (18/10/5),
  the faith-field member weight, and the weakest-cult pick in DM imposition [OBSERVED `src/domain/causalState.js:1152-1163`;
  `wp/cultImpositionApply.js:52-57`, `:100-101`]; and **magic legality** — `dominantDeityOf` admits only an embedded
  patron whose *authored* `rankAxis` is major; such a patron tightens magic legality one band (two for a warlike or evil
  major), and a warlike or evil major forces open religious hostility to magic [OBSERVED `src/domain/magicProfile.js:163-175`,
  `:259-265`, `:499-503`, `:510-522`]. So a cult that earns major tier never regulates magic, and an authored major
  holding one seat always does (§7.10.4).
- [INFERRED] In the default preset seats move only by DM act or by a local flip among deities already in a pantheon
  (an imposed cult overtaking the patron), because no creed can enter another settlement without spread.

### 4.6 Arcs and surfaces

- Tier crossings become realm arcs: "The Ascendancy of X" (reaching major), "The Twilight of X" (falling to cult), and
  extinction (last seat, under the unseating flag); salience scales with realm piety `g` [OBSERVED
  `wp/pulseKernel.js:1981-1992`; `wp/realmEvents.js:270-353`].
- The Map workspace's `PantheonPanel` (Herald Faith door; also in the dossier Faith tab for the owning premium DM)
  groups deities as Major Powers / Minor Faiths / Cults & Remnants with seats, W/L, "N from Major", a status word and a
  strength bar, plus a "Conversion Contests" preview [OBSERVED `map/PantheonPanel.jsx:27-270`; `disp/pantheonDepth.js:29-201`].
- `pantheon` is the **only** world ledger on the public snapshot allowlist (name, tier, seats, wins, losses);
  `religionStates` is hard-denied [OBSERVED `disp/worldSnapshotPublic.js:52-66`, `:224-246`].
- Status: LIT with no flag wherever a deity is seated, in every preset; the pantheon advances on local activity, not on
  spread, although PHASE4 §1.9 placed "global inter-deity politics" in the spread lane [OBSERVED `wp/pulseKernel.js:1704`;
  STATED PHASE4:198-242].

---

## 5. PIETY — local, global, and what it couples to

### 5.1 What piety measures

- Piety is a **multiplier field** over faith effects, under the owner's contract "deity effect = base × f(local piety)
  × g(realm piety)". It rewrites no state, it is not a share, not a stock of believers and not a ranking input — except
  that local piety multiplies every faith's local strength in a settlement symmetrically [STATED `wp/piety.js:2-31`].
- It is the **slowest** faith quantity, the slow verdict of faith's two-timescale echo (shares and seats move fast,
  devotion moves slowly: "a burned church holds its flock for years") [STATED `wp/piety.js:54-61`; FAITH:98-102]. In
  the design it is the "confidence in the god" instance of the spine's belief pattern [STATED FAITH:209].
- Vocabulary of record: "piety" names this substrate scalar; "devotion" names the *believed* axis (what another court
  believes about a town's devotion); "standing" is the local rank word [OBSERVED `wp/religionState.js:51-53`]; the same five band words are shared [STATED
  FOLD:427 (which, as written, gives the belief axis the noun "standing (believed devotion)", colliding with the code's local-rank "standing"); `docs/DESIGN_FP_INFORMATION.md:342` ("devotion" names the belief axis — the register this note keeps)].

### 5.2 Local piety (per settlement)

- Structural target `local01` (0–1) = **0.40** × religious authority (the settlement's causal `religious_authority`
  score / 100, falling back to 0.3 + 0.4 × rank) + **0.35** × institution backing (church 1, monastery 0.6, other
  religious sites such as shrines 0.35, saturating at 2.2; creed-agnostic) + **0.25** × devotion (patron share × standing
  weight 1 / 0.6 / 0.25, plus 0.15 × (active − 1)/capacity for a living multi-faith pantheon) [OBSERVED
  `wp/piety.js:41-47`, `:158-182`; `wp/religionLegitimacy.js:181-202`; `wp/religiousContest.js:919-922`].
- A conduct term of 0.15 × fit is added, with negative fit doubled (loss aversion, `DRIFT_ASYMMETRY` 2) [OBSERVED
  `wp/piety.js:62-70`, `:268-271`].
- `local01` lags toward the target at **0.06 per tick** (about an 11-tick half-life; half legitimacy's rate) and seeds at
  the target on first measurement [OBSERVED `wp/piety.js:54-61`, `:273-275`].
- `f` = 1 + (local01 − 0.35), range **0.65–1.65**. Clergy integrity (0.4–1, from the religious faction's NPCs' taint,
  evil lean and variance) pulls `f` back toward 1; an opposed-runner-up dampener (the next two rivals' opposition ×
  closeness, capped 0.6 per axis) splits the patron's "megaphone" per axis [OBSERVED `wp/piety.js:71-79`, `:139-148`,
  `:190-246`; `wp/clergyTraitPlane.js:47-95`].
- Composite = clamp(f × g × megaphone, **0.5–2.0**); a "moral" variant uses the moral megaphone [OBSERVED
  `wp/piety.js:53`, `:281-282`].
- The record carries `causes[]` (religious_authority, institutions, devotion, clergy_distortion, opposed_rivals,
  conduct drift or alignment; secularization or revival is pushed by the fold) for the panel [OBSERVED `wp/piety.js:284-294`; `wp/religiousContest.js:956-958`].

### 5.3 Global ("realm") piety

- `g` = 1 + 0.5 × (mean `local01` over **every** campaign member − 0.35), range **0.825–1.325**. Members without a record
  count at the 0.35 pivot, so a mostly secular realm dilutes `g` toward 1. It is measured at **tick start** off the
  previous tick's projected records, over codepoint-sorted ids [OBSERVED `wp/piety.js:299-321`; re-checked
  `wp/pulseKernel.js:1326-1331`].
- `g` is **exactly 1.0 when faith spread is off** or there is no campaign [OBSERVED same lines]. LIT only in DC and FS.
- It has no ledger of its own: it rides each settlement's projected record as `realmMult` [OBSERVED
  `wp/religionState.js:634`, `:645`].
- [INFERRED] It is aspatial: an unweighted mean, no size, distance or region term. A map can show it only as a single
  realm gauge, which PHASE4 designed ("a realm gauge when spread is on", PHASE4:565-567).

### 5.4 Writers, timing, readers

- Writer: `advanceReligionStates` returns `pietyByCid`; the kernel projects it onto `config.faithProfile.piety` at tick
  **end**; every reader consumes it at the **next** tick's start through identity short-circuit readers (absent ⇒ 1.0)
  — the anti-runaway seam [OBSERVED `wp/religiousContest.js:586-590`, `:946-959`; `wp/piety.js:323-401`]. It is not
  stored inside `religionStates`.
- Amplified sites [OBSERVED, sites as cited]: local entry and share strength (`wp/religiousContest.js:776`, `:804`);
  divine-mandate target (`wp/religionState.js:772-777`); conversion-fracture severity 0.5 × piety (`wp/religiousContest.js:1016`);
  `religious_authority` mint × `g` (`wp/religiousContest.js:610`); causal authority rank lift × local `f` (`src/domain/causalState.js:1154-1160`);
  disposition temper drive (`wp/disposition.js:281`); stance-lane betrayal and pact odds (`wp/deityStanceLane.js:362`,
  `:386`); corruption plane (§7.9); moral-institution pressure (`wp/moralInstitutionPressure.js:145`, `:297`, `:470`);
  realm-arc salience (`g`); faith field and witness terms. Deliberately **not** amplified: magic legality, contest
  weights, flip margins, cooldowns and caps [STATED PHASE4:337-350, :382-383].
- [INFERRED] A slow loop exists between piety and causal authority (authority is 40% of piety's target; the causal
  score includes the rank lift × local `f`); the one-tick lag and the 0.06 lag bound it.

### 5.5 How piety couples to legitimacy, devotion, the unseating and omens

- **Legitimacy:** two legitimacy terms switch on only once piety has been measured (from the second tick): synergy
  (0.06 × government-law fit × piety) and conduct fit (0.14) [OBSERVED `wp/religionLegitimacy.js:218-315`;
  `wp/religiousContest.js:866-874`].
- **Divine mandate:** the mandate's pull on public legitimacy is multiplied by the piety composite (§7.1).
- **Believed devotion:** a separate belief-axis band, keyed on the top-share deity's *standing* (lifted a rung when it
  is the patron), not on piety; behind `believedDevotionEnabled`, lit in **no** preset; the fold's OD-FC-7 rules to light
  it in three presets, not yet applied [OBSERVED `wp/beliefAxisSubjects.js:345-375`; `wp/simulationRules.js:251`,
  `:772-773`; STATED FOLD:291, :500].
- **The unseating (WF-1):** piety does not gate a fall; it sharpens the fracture a fall causes (severity 0.5 ×
  composite) [OBSERVED `wp/religiousContest.js:1013-1016`].
- **Omens (WF-4):** designed so a calamity would be read through the local faith and move piety; rebased by the fold so
  that only a DM's *attributed* edit starts a reading, believers contest it, and the engine never originates one
  ("THE ATTRIBUTED EDIT"); unbuilt, its spec owed [STATED FAITH:812-922, :1479; FOLD:292, :501].
- **Tithe (WF-7):** designed with piety × temple presence × patron rank as the source of a temple wealth band, and the
  crown's `tithe_share` as a cut of that one flow; unbuilt (§7.4).

### 5.6 Display

- The settlement Faith panel shows "Devotion: band · rising/fading/steady" (bands devout ≥ 0.75, faithful ≥ 0.55,
  observant ≥ 0.38, lukewarm ≥ 0.2, secular), the three structural meters, an "amplified ×N / dampened ×N" sentence
  when the composite leaves 0.95–1.05, a town-versus-realm split when `g` is live, cause sentences, and the
  secularization/revival line [OBSERVED `set/faithPanelModel.js:70-176`; `set/FaithSection.jsx:152-175`].
- **Status:** local piety LIT wherever a deity is seated (every preset); realm piety LIT only in DC and FS.

---

## 6. CONVERSION BETWEEN SETTLEMENTS

### 6.1 The two-lane gate

- The pre-split flag `religionDynamicsEnabled` once gated all faith dynamics. It was split (PHASE4 §1.9): the **LOCAL**
  lane is gated by deity presence alone; the **SPREAD** lane by `faithSpreadEnabled` [STATED PHASE4:198-242; OBSERVED
  re-checked `wp/simulationRules.js:89-108`].
- The normalizer keeps the two keys in lockstep and the **legacy key wins** whenever it is an explicit boolean; the
  reader `isFaithSpreadEnabled` checks the legacy key first [OBSERVED re-checked `wp/simulationRules.js:1482-1494`,
  `:1563-1576`]. A wave lighting only `faithSpreadEnabled` while a legacy `false` is present stays dark [STATED
  WY:525-528]. The **Living-World gate** (mounted on the world-map overlays and the Realm dashboard; premium write gate
  `canManageCampaigns`) keys its "Faith spread" toggle on `faithSpreadEnabled` and pair-writes **both** keys in one
  patch (the CL-0 cleanup), so the toggle works [OBSERVED `src/components/settlements/LivingWorldGates.jsx:68-72`,
  `:249-261`, `:332`; `map/WorldMapOverlays.jsx:33`; `map/RealmDashboard.jsx:42`]. PHASE55:1588-1589's "still writes the
  legacy key" is stale. Consequence: a DM can turn spread on per campaign in any preset, RR included, so a lens must read
  the campaign's **resolved** rule, never infer it from the preset id.
- **Lit in DC and FS only by preset default** (each sets both keys: `wp/simulationRules.js:940`, `:946`, `:1018-1019`).
  Dark by default in RR (the default), QL, SC, NC and LR — unless the DM lights the Living-World gate for that campaign.

### 6.2 Carriers — who can reach whom

Out of a deity-bearing settlement S, a carrier is either [OBSERVED re-checked `wp/religiousContest.js:84-98`,
`:314-350`]:

- a **relationship edge** labelled allied, ally, trade_partner, patron or vassal, read in **both** directions at a fixed
  0.45 (from the regional graph's edges, falling back to the snapshot's relationships); or
- a **confirmed channel directed out of S** of type war_front, military_protection or political_authority, at the
  channel's own strength (default 0.5).

The maximum per target is kept. What relationships actually mint into the graph (re-checked
`rg/graph.js:665-725`; bundle channels are born `confirmed`, `rg/graph.js:615-630`) gives these practical strengths:

| Relationship label | Edge carrier | Carrier channels it mints | Effective faith carrier |
|---|---|---|---|
| allied / ally | 0.45 both ways | military_protection 0.62 both ways | 0.62 both ways |
| trade_partner | 0.45 both ways | none (trade_route and information_flow are not carriers) | 0.45 both ways |
| patron (a `client` label is flipped to patron) | 0.45 both ways | political_authority 0.62, military_protection 0.55, patron → client | 0.62 patron → client; 0.45 back |
| vassal | 0.45 both ways | political_authority 0.82, military_protection 0.70, overlord → vassal | 0.82 overlord → vassal; 0.45 back |
| **hostile** | — (label not a carrier) | **war_front 0.72 both ways** | **0.72 both ways** |
| rival / cold_war / criminal | — | resource_competition, information_flow, criminal_corridor | none |
| war-layer coalition front | — | war_front, attacker → besieged | the front's strength |
| occupation | — | — | 0.5 floor, forced entry (§6.8) |

- A carrier must clear **MIN_CARRIER 0.15 on its raw strength**, before any distance attenuation — so distance never
  stops a carrier, it only weakens the pull [OBSERVED `wp/religiousContest.js:97-98`, `:606`, `:638`].
- **Only the bearer's patron travels**; cults and minority shares never propagate [OBSERVED `:598-653`].
- [OBSERVED, and not documented] **Enemies carry faith hardest of the two-way carriers**: any `hostile` relationship mints war_front channels
  both ways at 0.72, more than an alliance's 0.62 or a trade edge's 0.45. The code comment frames war_front as the
  occupation/garrison carrier [STATED `wp/religiousContest.js:85-88`], so this may be unintended (§10).
- [INFERRED] A legacy plural `trade_partners` *edge* would not carry when read raw (the `snapshot.relationships` fallback, `wp/religiousContest.js:327`, or an edge normalized without the sync, `rg/graph.js:204`), because the carrier check matches the raw label [Fable-reviewed 2026-10-18: a graph rebuilt from the saves' links canonicalizes every edge's label, `rg/graph.js:462`, `:481`, `:498`, so such an edge carries there]
  while the channel bundle canonicalizes it (`rg/graph.js:670-672`); the trade bundle mints no carrier channel either way.

### 6.3 Step 1 — the mint (`religious_authority` channels)

- Each bearer mints a **directed** `religious_authority` channel to each carrier target, strength clamp((0.35 + 0.4 ×
  carrier + 0.25 × effective rank) × `g`), confidence 0.75, an explanation sentence naming the deity, status confirmed,
  id from type + from + to [OBSERVED re-checked `wp/religiousContest.js:598-618`; `rg/graph.js:1008-1029`].
- The kernel merges them into the regional graph and rebuilds the snapshot before candidates run [OBSERVED
  `wp/pulseKernel.js:1347-1351`]. Merging keeps the prior status and visibility sticky [OBSERVED `rg/graph.js:562-600`].
- Default visibility is **gm** (DM-only): `religious_authority` is one of three default-gm channel types, and the mint
  passes no visibility [OBSERVED re-checked `rg/graph.js:93-97`].
- The channel carries **no deity id field** (the deity appears only in the explanation text) [OBSERVED
  `rg/graph.js:1008-1029`].
- [INFERRED, re-checked] **No faith code retires a mint.** The pulse sets channels dormant only for the war layer
  (`wp/pulseKernel.js:1102`, `:1270`); a faith front therefore means "has projected", not necessarily "projects now",
  once its carrier ends or spread is switched off.
- The mint is **not itself a carrier** (`religious_authority` is not in the carrier channel list). It carries the
  fracture crisis (§6.10), `religious_pressure` impacts (§6.10) and the PantheonPanel contest preview — not the creed.
- [OBSERVED, my own find] A second, unrelated producer exists: relationship discovery turns a relationship labelled
  `religious_authority` into a two-way pair of such channels at 0.62 (`rg/discoverDependencyCandidates.js:196-197`).
  Re-checked in verification (§12): discovery candidates are born `suggested` and become campaign truth only after the
  DM confirms them (`rg/discoverDependencyCandidates.js:1-7`, `:242-244`), so `RelationshipEdges`, which draws only
  confirmed channels, never draws an unconfirmed one. No writer of a `religious_authority` relationship label exists
  under `src/components`, `src/generators`, `src/data`, `src/store` or `src/domain/relationships` (grep), and the
  canonical resolver passes an unknown label through unchanged (`src/domain/relationships/canonicalRelationship.js:73-76`),
  so [INFERRED] the branch is reachable only from imported or hand-edited neighbour data. Both producers mint the same
  id (`channel.religious_authority.<from>.<to>.general`, `rg/graph.js:159-173`) and a merge keeps the prior status
  (`rg/graph.js:562-600`), so [INFERRED, not executed] a suggested candidate merged first would hold a later pulse mint
  at `suggested` and hide it from the map.

### 6.4 Step 2 — reach

- reach[target][deity] = max over sources of carrier × distance weight × mass influence(source → target), clamped to
  0–1 [OBSERVED `wp/religiousContest.js:620-645`].
- **Mass** is tier-based: thorp 1, hamlet 2, village 4, town 8, city 16, metropolis 32; influence = source mass ÷ target
  mass, clamped to **0.12–4** — "a metropolis sways a village; a city scarcely notices a hamlet" [OBSERVED
  `wp/religionState.js:92-119`].
- The reach map is held in memory for the tick only — **not persisted, not exported** [OBSERVED
  `wp/religiousContest.js:596-653`].

### 6.5 Step 3 — prevalence (regional clustering)

- For each **graph neighbour** whose *patron* is the deity: + 0.06 × (0.5 + 0.5 × rank) × mass influence × distance
  weight, summed and capped at **0.3** — "this whole valley worships the war god" [OBSERVED `wp/religiousContest.js:79-82`,
  `:484-497`].
- A graph neighbour is any settlement joined by **any** edge or channel of any type and any status — including rival,
  criminal, dormant links and the faith mints themselves — not map adjacency [OBSERVED re-checked `:459-472`].
- Zero when spread is off (neighbour ids are empty) [OBSERVED re-checked `:728-733`].

### 6.6 Step 4 — local strength and receptivity

- Base = clamp(0.45 × rank + 0.3 × carrier + prevalence). Then × (0.7 + 0.3 × fit) × (0.7 + 0.6 × growth favour) ×
  (1 + 0.6 × chronicle momentum); then the kernel multiplies by the target's tick-start piety composite [OBSERVED
  `wp/religiousContest.js:508-530`, `:776`].
- **Fit (receptivity)** = 1 − incumbent counterforce × (1 − 0.55 × compromise) + chaos-side crisis lift. The counterforce
  rises with opposed temperament, alignment gap and law-method clash between the newcomer and the incumbent [OBSERVED
  `:138-160`, `:228-248`].
- **Crisis lift:** disorder = 0.35 stressor load + 0.25 war/occupation + 0.20 small tier (thorp 1, hamlet 0.6, village
  0.3, halved under a lawful government) + 0.25 compromise + 0.20 inverse prosperity, capped at 1; a **chaotic** deity
  gains up to + 0.6 × disorder, a lawful or neutral one exactly 0 — "chaos converts in the cracks" [OBSERVED
  `:138-160`, `:181`, `:512-521`]. Disease outbreaks feed this disorder [OBSERVED `sp/pestilence.js:56-59`].
- **Growth favour** is the ruling power's fit with the faith (the ruler lens); **chronicle momentum** reads recent
  history [OBSERVED `wp/religionLegitimacy.js:344-357`, `:383-412`].
- The carrier, prevalence and occupation terms exist only under spread; the crisis lift and growth favour are local.

### 6.7 Step 5 — entry and share drift; Step 6 — the conversion

- A reaching faith not present, or present but suppressed (resurgence), attempts entry by the rules in §3.5, then
  climbs at most 6 points per tick against the patron's eroding hold [OBSERVED].
- **A "conversion" happens only when the patron seat changes** [OBSERVED re-checked `wp/religiousContest.js:995-1025`]:
  - the new patron's snapshot is re-embedded on the convert's `config.primaryDeitySnapshot` in the apply pass
    [OBSERVED `wp/applyWorldPulse.js:188-242`];
  - a probability-1, auto-applied outcome stamps a conversion condition and seeds the `religious_conversion_fracture`
    stressor at severity clamp(0.5 × piety composite), cause `occupation` if the convert is occupied, else `contest`;
    headline "<town> turns to the faith of <deity>", routed to the Herald faith desk [OBSERVED same lines;
    re-checked `src/domain/realm/heraldRouting.js:148-156`];
  - an occupation-driven flip stains the new patron with 0.45 heresy [OBSERVED `wp/religiousContest.js:997-1004`];
  - the global ledger banks the win and the loss; the seat moves a tick later (§4.2).
- This fires for **local** patron flips too (an imposed cult overtaking the patron), so conversions exist in every
  preset once a pantheon holds two faiths; what needs spread is a conversion *to a creed from elsewhere*.
- **[OBSERVED, re-checked] Provenance gap:** the outcome names only the convert. Its `fromSettlementId` and its
  `sourceEventTargetId` are both the convert itself, and the condition's cause reads "<convert> converted <convert>"
  (`wp/religiousContest.js:441`, `:1021-1022`). Which neighbour's faith did it — and over which carrier — is recorded
  nowhere persistent; it can only be re-derived from the mints and the carrier graph.

### 6.8 Occupation-forced conversion ("the creed follows the garrison")

- The occupier's patron reaches the occupied town as a 0.5 carrier flagged occupied, with **forced** entry (capacity
  ignored, 0.45 stain) [OBSERVED `wp/religiousContest.js:646-653`, `:777-783`].
- Its strength is lifted toward 1 by 0.5 × control × (1.35 if the occupier's deity is warbound) × (1 − incumbent
  counterforce), where control = military capacity × (0.4 + 0.6 × (1 − resistance)) [OBSERVED `:117-136`, `:208-248`].
- Separately, occupation multiplies the fracture stressor's birth odds by 1.6 and slows its decay [OBSERVED
  `wp/stressorGates.js:719-733`; `wp/stressorDynamics.js:502-504`].
- Needs spread and an occupation (the war layer): DC and FS.

### 6.9 Prevalence, receptivity and pantheon feedback together — cadence

- Clock: one weekly tick; reach is same-tick (no travel latency) [OBSERVED].
- [INFERRED from the constants] A newcomer enters at share 4 against a 96-point patron; with steps capped at 6, the
  patron's hold absorbing 35% of its losses, and renormalization to 100, the challenger needs roughly ten ticks to lead
  by 6 and three more to hold it — on the order of a season per conversion hop at the fastest, longer in practice. The
  convert then bears the new patron from the next tick, so a wave advances one conversion hop at a time; a tier can
  follow two ticks after each flip (one tick after the seat count moves; §4.3).
- Nothing caps how many settlements convert per tick realm-wide; the containment cap applies to tier changes only.

### 6.10 The fracture crisis and religious pressure (what moves even in the default preset)

- `religious_conversion_fracture` is a stressor of the general stressor system [OBSERVED re-checked
  `wp/stressorsCore.js:158-166`]: pressure kind legitimacy, birth threshold 0.62, residuals sectarian_memory,
  temple_debt and ritual_disputes, and **three** spread channels — `religious_authority`, `service_dependency` and
  `information_network`. It is born either by the deity contest (above) or **from legitimacy pressure alone, deity or
  not**, through a gate that weights occupation 1.6×, weak orthodoxy (authority < 40) 1.3×, religious institutions
  present 1.25×, none present 0.7×, strong orthodoxy (≥ 75) 0.6× [OBSERVED `wp/stressors.js:469-476`;
  `wp/stressorGates.js:719-733`].
- It spreads when severity > 0.42 and the propagation mode is first_order or full: to at most 3 targets per tick,
  weakest orthodoxy first, with probability min(0.34, 0.05 + 0.22 × severity), arriving at max(0.2, 0.72 × source)
  [OBSERVED `wp/stressors.js:650-683`, `:769-814`]. Propagation: RR and LR first_order, DC and FS full, QL and NC local
  (no spread), SC off (and SC disables stressors).
- It moves **unrest** (legitimacy, social trust, faction stability), never a creed. Without faith spread there are no
  `religious_authority` channels, so it rides the service and information channels.
- A health or legitimacy shock at a source travels along a `religious_authority` channel as a `religious_pressure`
  regional impact — hence only where mints exist. Re-checked in verification: severity = (0.25 + 0.45 × channel
  strength + 0.2 × goods weight) × magnitude, and because the rule passes no goods and an empty goods list weighs 0.4,
  that is **(0.33 + 0.45 × strength) × magnitude**; waves decay 0.45 per hop; depth is 1 under first_order and **2 under
  full** propagation — so 2 in DC and FS, the only presets with mints; floor 0.08 [OBSERVED `rg/propagation.js:198-201`,
  `:269-275`, `:287`, `:451`, `:572-577`, `:711-712`; `wp/simulationRules.js:1578-1586`].
- Under spatial canon every applied outcome's cross-settlement impacts are parked in `worldState.spatialArrivals` and
  land `hopWeeks` later; so the *ripple* of a conversion carries travel latency while the re-embed itself is instant
  [OBSERVED `wp/applyWorldPulse.js:756-766`; `sp/spatialArrival.js:1-25`]. The park passes the current road season, and
  `hopWeeks` lengthen in winter wherever the digest carries a seasonal overlay; the road season is computed every tick
  independent of `seasonsEnabled`, so this is a data gate, not a preset gate [OBSERVED `wp/applyWorldPulse.js:762`;
  `sp/spatialArrival.js:56-58`, `:83`; `wp/pulseKernel.js:570-575`, `:1587`]. Whether stressor-spread candidates (as
  opposed to propagated impacts) ride that queue was not verified.

### 6.11 Faith prescribes (foreign patrons pressing institutions) — not spread-gated

- `buildFaithReach` lists, per convert, the foreign patrons reaching it over the same carriers at carrier × distance
  weight × mass influence — **with no MIN_CARRIER gate and no occupation floor** (it differs from the spread lane's
  internal reach) [OBSERVED `wp/religiousContest.js:350-388`].
- The moral-institution lane adds each reaching patron's pressure (× 0.6) toward abolishing or entrenching the
  convert's morally loaded institutions [OBSERVED `wp/moralInstitutionPressure.js:78`, `:283-320`].
- It is gated only by `institutionLifecycleEnabled` (default true; false only in SC) [OBSERVED re-checked
  `wp/pulseKernel.js:1476`; `wp/simulationRules.js:76`, `:978`]. So in the default RR, a seated patron's moral norms do
  cross settlement lines, distance-attenuated on canonized worlds — contradicting the flag comment that spread is the
  only cross-boundary faith gate (§10).

### 6.12 Pilgrims, legates, missionaries — and the co-religionist topology

- **Pilgrims (built part):** the traditions pilgrimage draw. A grand observance (scale band ≥ 3 with a procession,
  offering or fair, or ≥ 5 with any act) draws from the **nearest 8 reachable mapped** settlements by path cost; raw =
  Σ population/6000 × distance weight; lift = 0.1 × raw/(raw + 2) added to the **host** rite's success score. It is
  deity-agnostic, writes nothing to the visitors, discards who came from where, and is 0 on aspatial worlds, an
  unmapped host or no reachable neighbour [OBSERVED `src/domain/traditions/pilgrimage.js:28-104`;
  `wp/traditionsKernel.js:755-759`]. LIT where `traditionsEnabled` (RR, DC, LR, FS) on canonized worlds. COUPLINGS calls
  the news line "the faithful walk the roads" with no mechanic behind it the "IMPOSSIBLE row" [STATED COUPLINGS:815-819;
  `wp/realmEvents.js:336`].
- **Pilgrims and legates as movers (WF-2):** a banded pilgrim season (trickle/steady/feast/flood) at hosts holding both
  a patron and a grand observance, suppressed by road danger, on the 52-week year; named legates (purpose class
  religious) and pilgrims of note (purpose class personal) as errands on `worldState.envoyErrands`, interceptable, with
  a mandatory return leg (never a migration); hearing-week kinds `legate_received` / `pilgrims_received` [STATED
  FAITH:624-732; ARCH_WF:446-500; FOLD:369; the return leg at COUPLINGS:856, :1816]. **UNBUILT**: the `ERRAND_CONSUMERS` rows are `built: false` and neither
  module exists [OBSERVED `wp/envoyErrandVocabulary.js:322-335`]; no `pilgrimageEnabled` flag; the errand spine is held
  dark on purpose in every preset [OBSERVED `wp/simulationRules.js:779-783`].
- **Missionaries:** no mover. The church "missionize" strategy lever is headlined "sends out missionaries" but applies
  only a +0.05 trust nudge to the strongest non-hostile partner [OBSERVED re-checked `wp/settlementStrategy.js:185`,
  `:205`, `:762-765`]; it needs `settlementStrategyEnabled` (DC, FS) **and** the belief layer (spatial canon plus a
  non-omniscient infoMode), since archetype levers are selected only when beliefs are live [OBSERVED re-checked
  `wp/settlementStrategy.js:70-80`, `:1070-1082`; `wp/beliefMap.js:204-209`]. The treaty term `missionary_access` would
  open the channel gate, never move a share; its reader has no consumer (§7.3).
- **Targeted footholds** (spread-only): a rival creed recruits a notable-or-better minister whose traits fit it better
  than the patron (threshold 0.55; one per rival, two per settlement, six-tick cooldown) — the nearest thing to
  missionary work in code; no one travels [OBSERVED `wp/clergyTraitPlane.js:232-298`; `wp/religiousContest.js:961-993`].
- **Co-religionist topology:** designed as a separate faith network keyed on a *shared dominant deity*, capped to the
  k-nearest co-religionists by the frozen distance matrix, carrying pilgrims, missionaries, clergy and faith news to
  trade-less towns, as a live overlay on top of the frozen digest [STATED PHASE55:234-259, :313-315, :389-394,
  :1190-1201, :1246-1248]. **DESIGNED ONLY**: the rumor network has trade, army, criminal, ship, teleport and refugee
  carriers and no faith carrier; the belief map's religious-faction slot is an explicit seam [OBSERVED
  `sp/rumorNetwork.js:68-101`; `wp/beliefMap.js:89-107`].
- **Faith cargo on migration columns (WY-4):** designed as a banded composition carried by columns and blended into the
  destination by arrivals/(destination + arrivals), "the origin loses no faith by sending people away"; **UNBUILT**
  [STATED WY:504-531, :1618-1634; FOLD §3.1.6].

### 6.13 The faith influence field

- Every unsuppressed pantheon member's authored boon or bane pulls typed effect channels (harvest → food security, trade
  → trade connectivity, craft → economic capacity, healing, order → law and order, war readiness → defense), weighted by
  share × rank × standing × patron amplification × piety × a magic gate, each channel capped ±0.6 [OBSERVED
  `wp/faithField.js:100-125`, `:191-361`; `wp/faithChannelBindings.js:81-171`].
- **Wired, dormant by data** — re-checked: `wp/religionState.js:40-43` imports the projection builder and the projection
  calls it; the file's own header still says "THE FIELD IS DARK. Nothing in production calls it" (stale)
  [`wp/faithField.js:12-21`]. It answers null for every settlement because no deity authors a boon or bane [STATED
  `wp/faithTuningSurface.js:54-58`], and the authoring surface is not exposed in the UI [OBSERVED: the content manifest
  marks `boonChannel`, `boonStrength`, `baneChannel`, `baneStrength`, `characterAxes` and `authoredTemper` `ui: false`
  (`src/domain/content/customContentManifest.generated.js:1480`, `:1597`, `:1623-1624`, `:1647`, `:1676`, `:1700`); the
  editor's field list drops `ui === false` fields (`src/components/compendium/customCategories.js:15`); and no file
  under `src/components` or `src/copy` names `boonChannel` (grep)]. Not spatial.

### 6.14 The frozen-versus-live law, where it touches faith

- The simulator treats the spatial layer as a **frozen, canonized digest** (distance matrix, territory partition)
  stamped by an entitled canonize; live simulation reads it and never rewrites it (see `research/sf/fp-simulator.md` §0).
- Faith reads the digest only through `mappedDistanceWeight`: weight = 0.35 + 0.65 × m / max(m, path cost), where m is
  the median primary-hop cost; 1.0 for an unmapped endpoint or a pair at or below m; 0.35 for an unreachable pair. The
  gate `activeSpatialDigest` needs a positive-integer `worldState.spatialCanonVersion` and a digest with a distance
  matrix — a data/entitlement gate, not a preset flag [OBSERVED `sp/distanceRead.js:115-133`, `:851-881`].
- Three faith sites read it: carrier reach (spread only), prevalence (spread only), and `buildFaithReach` (whenever
  canon exists) [OBSERVED `wp/religiousContest.js:365-377`, `:491`, `:554-559`, `:640-643`]. Path cost is called **without
  a season** at those three sites, so seasons never bite the contest or its reach; sea lanes and teleport edges shorten
  paths only when those slots are lit [OBSERVED `sp/distanceRead.js:653-691`]. Two faith-adjacent reads do take a
  season: the conversion outcome's parked regional ripple, whose `hopWeeks` lengthen in winter where the digest carries
  a seasonal overlay (a data gate, any preset on canon; §6.10), and moral founding, season-weighted where
  `seasonsEnabled` is lit — DC, LR, FS (`wp/moralInstitutionPressure.js:509-517`; §7.4).
- **Not** distance-aware: the carrier existence gate, the mint strength, neighbour recognition, the occupation pull, the
  stance lane, sacred claim and the fracture spread [OBSERVED].
- PHASE55 §3 promised that faith conversion "inherits the same distance + latency" as other movers; only the distance
  half is built for the contest; latency exists only on the parked regional ripple [STATED PHASE55:58-64; OBSERVED].
- The designed co-religionist network would be a **live** overlay, never part of the frozen digest [STATED
  PHASE55:1190-1201]. [INFERRED] A map lens is in the same position: it may read the frozen digest and live host facts,
  must not write either, and must recompute what the host discards rather than store it as host truth.

### 6.15 Flags for this section

`faithSpreadEnabled` / `religionDynamicsEnabled` (DC, FS); `institutionLifecycleEnabled` (all but SC) for faith
prescribes; `propagationMode` and `stressorsEnabled` for the fracture spread; `traditionsEnabled` (RR, DC, LR, FS) for the
pilgrimage lift; `warLayerEnabled` (DC, FS) for occupations; `settlementStrategyEnabled` (DC, FS) plus the belief layer
for missionize; spatial canon (data) for every distance read [OBSERVED `wp/simulationRules.js:692-1221`]. Added in
verification: `constructiveFlowsEnabled` (WAVES: RR, DC, LR, FS) for faith-weighted relief; `commodityFlowEnabled` (RR,
FS) plus canon for faith-weighted contraband; `npcLadderEnabled` (ONE_REGEN: RR, DC, LR, FS) for the clergy
`faith_rupture` window; and the Living-World gate, which can set the spread pair on any campaign (§6.1, §7.10).

---

## 7. The rest of the simulator's faith couplings

### 7.1 Legitimacy and the throne

- **Divine mandate:** for theocracies (weight 1) and royal/autocratic governments (0.45; others 0), public legitimacy is
  pulled toward 50 + weight × (patron security − 0.45) × 30 × alignment fit (when propping; erosion ignores fit, `wp/religionState.js:772`) × piety composite, at 0.15 of the gap per
  tick, at most 2 points per tick [OBSERVED `wp/religionState.js:680-794`; mounted `wp/pulseKernel.js:1878`]. The chain
  to coups was soak-proven with a non-theocracy control [STATED PHASE4:165-172; COUPLINGS:962-1001]. LIT (local lane).
- **Ruler versus populace:** the ruler's endorsement is the largest legitimacy weight (0.42, more under compromise),
  the ruling power's fit is the growth favour on every faith's strength, and an imposed patron over misaligned conduct
  withers ("the imposed god that withers", PHASE4:850-857) [OBSERVED §3.8, §6.6].

### 7.2 War and holy war

- **sacred_claim / common_rite:** a pair's faith-by-alignment quadrant (brothers, respectable rival, schism axis,
  natural enemy) yields a war reason (schism 0.75, natural enemy 0.60 — "the heretic before the stranger") or a peace
  reason (brothers 0.80, respectable rival 0.45), scaled by the observer's patron security; both towns must name a
  patron; candidate pairs come only from regional graph edges [OBSERVED `wp/sacredClaim.js:39-84`, `:115-225`;
  `wp/warReasons.js:769-834`, `:914`]. Gated by spread (re-checked `wp/sacredClaim.js:199`) and the reasons layer's war
  and peace engines: DC, FS. The quadrant read (`sp/cohesionWeave.js:10-55`) also modulates generosity, politics and
  mediation; despite its folder it reads no geometry.
- **Dissolution on a fall (WF-1d):** a holy war dissolving when either patron is unseated, naming the fall — BUILT
  DARK, unreachable because `warTerminationEnabled` is false in FS and absent elsewhere [OBSERVED
  `wp/simulationRules.js:1036`; STATED FOLD:341].
- **Deity temper in war appetite:** a warlike patron raises aggressiveness, a peacelike one lowers it, on the war-layer
  path (DC, FS) [OBSERVED `wp/disposition.js:20-35`, `:187-210`]; the WR-2 deity-domain threshold term is BUILT DARK
  (`dispositionChannelsEnabled` false) [OBSERVED `wp/simulationRules.js:1041`].
- **Occupation** is a faith carrier (§6.8), and the hostile label's war_front channels carry faith (§6.2).
- **Inter-deity stance lane** (spread-only, DC and FS): a derived stance per deity pair (aggression, cooperation,
  betrayal hazard, treaty durability from malice and disorder); seeded betrayal (on an existing cooperative edge; hazard
  ≥ 0.05; 8-tick pair cooldown; realm cap 2 per tick) and pact events (cooperation ≥ 0.45; 6-tick cooldown; cap 3), all
  news-only; aggression and treaty durability are computed and unconsumed [OBSERVED `wp/deityStance.js:53-173`;
  `wp/deityStanceLane.js:51-402`; `wp/religiousContest.js:272-303`, `:655-674`]. The consequences wave (WF-3) is UNBUILT.

### 7.3 Peace, pacts and the grammar's faith terms

- Five faith terms sit in the treaty catalog: `shared_rite`, `pilgrimage_right` ("a route-scoped right"),
  `tolerance_guarantee`, `missionary_access` (the row a war's end can extract), `temple_restitution` [OBSERVED
  `wp/peaceTermsCatalog.js:249-266`]. Every grant read has no consumer [STATED FOLD:337]; `missionaryAccessFor` exists
  with no production caller [OBSERVED re-checked `wp/treatyEnforcement.js:270`; its only other mentions are a comment and a path string
in `src/domain/certification/couplingRegistryGrammar.js:148`, `:186`]. Nothing reads routes for `pilgrimage_right`.
- The `faith_communion` occasion that drafts them is BUILT but unreachable: its one definition (ruled) is two courts
  believed devout within one rung plus the both-patrons guard, and believed devotion is lit nowhere [STATED FOLD §3.2.4,
  OD-FC-7; OBSERVED `wp/simulationRules.js:251`]. The draft lens nonetheless drafts `pilgrimage_right` with no fence
  [OBSERVED `wp/pactFormation.js:191-196`].
- Law One in the grammar: no term mandates conversion; `missionary_access` moves the channel gate, never a share
  [STATED GRAMMAR:858-1005, :868].

### 7.4 Trade, tithe and institutions

- **Conscience embargo:** the patron's conviction is the baseline of a settlement's tolerance for morally loaded
  institutions; the embargo multiplier floors at 0.15 [STATED COUPLINGS:556-568]. **Tolerance drift:** a per-axis offset
  drifts toward trade partners' mass-weighted tolerance (rate 0.002, about 2.5 years to the cap for equal masses) —
  faith-derived norms normalizing across trade links in any preset with the institution lifecycle [OBSERVED
  `wp/institutionTolerance.js:1-40`].
- **Moral founding:** who holds the patron seat drives which benevolent or exploitative institutions get raised,
  season-weighted where seasons are lit (DC, LR, FS); zero in every deity-free case [OBSERVED
  `wp/moralInstitutionPressure.js:450-530`].
- **Urban fabric:** a "religious" quarter deposit at 0.015 × patron share [OBSERVED `wp/urbanFabricKernel.js:282`,
  `:378-383`].
- **Tithe:** four sources across the corpus — generation's static "Church Tithes" line (§2.5); the designed WF-7 temple
  wealth band (piety × temple presence × rank, quarterly, unbuilt); the struck TRADE house-fortune source; and
  W-COIN's `tithe_share`, BUILT DARK behind `treasuryEnabled` (registered, lit nowhere). The fold rules "one flow, two
  ends": the church's band is the source and the crown's cut reads it [STATED FOLD §3.1.5, :266, :420; OBSERVED
  `wp/simulationRules.js:478`]. A fifth, tithe-adjacent surface: a religious faction's law stakes include
  `tithe_rights` (§7.10.9).

### 7.5 Information and news

- News: conversions ("<town> turns to the faith of <deity>"), the obituary (public, faith section), footholds naming the
  minister, pantheon arcs, missionize headlines, and the compound realm event "God's Abandonment" (famine + disease
  outbreak + conversion fracture), still shipped under that name although OD-FC-8 rules the rename "The Forsaken
  Altars" [OBSERVED `wp/realmEvents.js:24-33`; STATED FOLD:501].
- **Believed faith:** each observer holds a possibly stale `faithLabel` (which god) and `observanceLabel` about others;
  ground truth is the public patron name, never the latent pantheon; there is no faith rumor carrier. Live only under
  the belief layer: spatial canon plus a non-omniscient infoMode — DC and LR (perfect_delayed) and FS (full), and only
  once canonized; RR is omniscient [OBSERVED `wp/beliefMap.js:85-110`, `:204-209`, `:450-470`, `:650-656`]. Rumors carry a
  deity name only when it resolves to an activated public snapshot [OBSERVED `sp/rumorNetwork.js:149-159`, `:387-401`].
- The IN-2 devotion bait (planting "their god has abandoned them") is dark [STATED COUPLINGS:880-882 for the bait; FOLD §2's INFORMATION row (:338) for the status: IN-2 lure, `lureCommission` no caller].

### 7.6 Populations, plague, war circulation

- **Migration destination choice** (spatial canon) weighs a culture affinity whose largest term is faith (0.30; the
  mean gap on the patron's evil and chaos axes), alongside path cost, hop weeks, distance weight and route choice
  [OBSERVED `wp/migrationKernel.js:150-230`; `sp/cultureDistance.js:42-47`, `:165-190`]. Migrants prefer faith-close
  destinations but carry no faith (WY-4 unbuilt).
- **Plague** raises crisis disorder (chaos receptivity and revival of the unaffiliated); the plague temple pulse is a
  seam with no consumer [OBSERVED `sp/pestilence.js:50-60`, `:300-320`].
- **War circulation** faith exposure (veterans and shed columns carrying faiths; "walls stronger, temple unsettled") is
  UNBUILT [STATED `docs/DESIGN_FP_ARCH_WC.md:6138-6139` (`wc_homecoming`, WC-14) for the words; FOLD:267 (§3.1.6) for the status].

### 7.7 Traditions

- Observance nudges (§3.9), the pilgrimage lift (§6.12), and deity-agnostic rite movement: a rite **adopts** along
  migration influx (≥ 12% of the destination's population from one origin over a 3-year window, stamped `adoptedFrom`)
  and is **imposed** by an overlord on a vassal (0.3 per year) [OBSERVED `src/domain/traditions/relations.js:49-51`,
  `:107-172`]. LIT under `traditionsEnabled`. [INFERRED] `adoptedFrom` is a dated origin → destination fact a lens can
  draw — the only persisted cross-settlement *rite* movement.

### 7.8 Grammar terms the map must not confuse (vocabulary)

- "patron" = the deity holding a settlement's seat; also a relationship label (patron/client), a brokerage patron
  (INFORMATION) and an intervening power (convergence). "chief" (REWORK) = patron.
- "ascendant" = local standing (share ≥ 30) **and** the PantheonPanel status word (wins > losses); "major/minor/cult" =
  the authored rank **and** the earned tier [OBSERVED `disp/pantheonDepth.js:85-92`; `wp/religionState.js:52`].
- `religious_authority` = a settlement's causal score (0–100) **and** a regional channel type.
- "piety" (substrate scalar) vs "devotion" (believed axis) [STATED `docs/DESIGN_FP_INFORMATION.md:342`; FOLD:427 words it "standing (believed devotion)"] vs "standing" (local rank) [OBSERVED `wp/religionState.js:51-53`].

### 7.9 The hearing week, engagement kinds, and other seams

- Hearing week: `legate_received` / `pilgrims_received` are registered engagement kinds (a climax with outcomes
  received, turned away, held, where the DM may leave, tilt or give a verdict) for WF-2 — unbuilt [STATED FOLD:369;
  ARCH_WF:15].
- Corruption plane: the patron's evil × chaos position tilts corruption pressure (0.05 at lawful-good to 1.65 at
  chaotic-evil), scaled by piety bleed; inert without an authored law axis [OBSERVED `wp/piety.js:405-446`].
- Faith witness source (lessons taught by living among a deity's priests, on 13-tick seasons): a seam with no caller
  [OBSERVED `wp/faithWitnessSource.js:16-30`, `:220-280`].
- Momentum doctrine deposit: any heresy-stained creed (DM-imposed or occupation-forced) deposits a doctrine commitment
  at its seat, gated momentum ∧ beliefs ∧ faith spread (`wp/momentum.js:390-395`; momentum rides WAVES in RR, DC, LR and FS, beliefs need canon and a non-omniscient infoMode, spread is lit by default in DC and FS — so DC and FS on canon, LR only if the DM lights spread); its read side is deliberately unwired [OBSERVED `wp/momentum.js:296-312`, `:387-406`].
- Designed only: the PIOUS / SECULAR / DYNAMIC faith-climate age toggle (tuning the sink's 0.06/0.02 pair, carrier reach,
  conversion gains, founding rates) [STATED `docs/DESIGN_REALM_DIRECTIVES.md:1541-1567`]; the religious-center feedback
  loop (pilgrims → legitimacy → institutions → pilgrims) [STATED PHASE55:1432-1456]; the town fabric's worship ladder,
  outlying monasteries and crypts [STATED `docs/DESIGN_FP_ARCH_MF.md:259-457`].

### 7.10 Further faith couplings (added in verification, §12)

**7.10.1 Faith-weighted relief between settlements** [OBSERVED]. The generosity mover decides whether a giver sends
aid to a relationship partner in food need (grain relief, warning, credit, refuge, purchase or trade overture; `wp/generosityKernel.js:10-14`, `:89-90`, `:487-492`; there is no war relief) (allied, trade, vassal, patron edges; `wp/generosityKernel.js:12`,
`:616`). Its give score is 0.30 bond + 0.22 history + 0.20 conscience + 0.18 strategy + **0.10 faith**
(`sp/generosityEV.js:47-53`); the faith term is 0.4 when the giver holds a charity-faceted institution ("temple
mediated", creed-agnostic) plus 0.6 × shared-faith closeness (`sp/generosityEV.js:242-254`); closeness is 1 for the same
patron, else 1 − the mean gap between the two patrons' evil and chaos axes (`wp/generosityKernel.js:319-334`, read at
`:409-412` and `:656-660`), and the same pair feeds the cohesion-weave quadrant. A belief-gated route-risk term sits on
the **withhold** side (W_ROUTE 0.14; `sp/generosityEV.js:64`, `:325`), not in the faith term. Gate:
`constructiveFlowsEnabled` (WAVES), lit in RR, DC, LR and FS (`sp/generosityEV.js:935-938`;
`wp/generosityKernel.js:451-455`; `wp/simulationRules.js:720-730`, `:900`, `:961`, `:1007`, `:1220`); mounted at
`wp/pulseKernel.js:2561`. A cross-settlement, partner-graph faith coupling a lens could show as relief receipts.

**7.10.2 Culture distance: faith-weighted contraband and the other readers** [OBSERVED]. `cultureDistance`'s largest
term is patron faith (W_FAITH 0.30 over the two patrons' evil/chaos gap; `sp/cultureDistance.js:45`, `:170-172`); the
culture vector takes those axes from the patron snapshot (`wp/migrationKernel.js:165-166`). Its readers are:
(a) migration destination choice (`wp/migrationKernel.js:230`; §7.6); (b) **contraband at commodity arrival gates** —
a gate bans a goods category when its culture distance to the origin reaches the category's floor
(`sp/smuggle.js:8-20`, `:176`; context built in `wp/supplyKernel.js:687-756`; typed in `sp/commodityFlow.js:367-378`),
gated by `commodityFlowActive` = spatial canon + `commodityFlowEnabled` (`sp/commodityFlow.js:171-177`), which only RR
and FS set (`wp/simulationRules.js:896`, `:1081`; DC and LR do not); (c) the **foreign-seat weight** — how hard an
occupier or overlord looms over a ruler scales with culture closeness (`src/domain/rulingPowerSeat.js:361-371`,
`:672-676`; consumers `wp/warSeatBooks.js`, `wp/seatIntervention.js`, `wp/foreignPrimacy.js`,
`wp/anticipatedReactions.js`; their gates not checked). Generosity (7.10.1) and the cohesion-weave quadrant reuse the
same two faith axes through their own reads, not through `cultureDistance` or its 0.30 weight
(`wp/generosityKernel.js:319-334`; `sp/cohesionWeave.js:10-55`).

**7.10.3 The typed neighbour graph and the map-profile interface** [OBSERVED]. `src/domain/regionalGraph.js` (354 lines)
derives, per settlement and from its authored neighbour list (`neighbours` / `neighbourNetwork`, `:307-309`), typed
links whose catalog includes `pilgrimage_center` and `religious_superior` (`:28-42`). They come from legacy labels
(`pilgrim`, `pilgrimage` → pilgrimage_center; `religious_partner`, `religious_superior` → religious_superior) or, when the
label is missing, from a neighbour name matching temple / cathedral / monastery / see / seat (`:139-152`); severity 0.4
each (`:199-200`); direction religious_superior incoming, pilgrimage_center outgoing (`:227-229`); and descriptive
propagation hints such as "plague there → PILGRIM flow stalls" and "heresy there → DOCTRINE shifts here" (`:245-250`).
The file's header reserves active propagation over these links for a future tier [STATED `:19-22`]; no engine reads the
hints. `src/domain/mapProfile.js` (354 lines), the declared "Map ↔ simulator interface" (`:1-31`), outputs
`regionalAuthority[]` — a settlement's `tax_authority`, `religious_superior` and `protector` links — with the
contributor sentence "map should render hierarchy" (`:205-231`, the sentence at `:228`; typed in `src/domain/settlement.schema.js:1567-1577`).
The town map consumes `mapProfile` only for road importance, defensive terrain and hazard markers
(`src/domain/townMap/townLayoutV2.js:332`, `:723`, `:775`; `src/domain/townMap/townMapModel.js:425`);
`regionalAuthority` has no production consumer (tests only). `src/domain/aiGrounding.js:63` also reads the typed graph.
Generation adds the special resource `holySite` (boosts religious institutions; relic and pilgrim-donation resources;
a `pilgrimage` marker carried into the resource analysis — `src/data/resourceData.js:399-411`;
`src/generators/resourceGenerator.js:384-387`), with no simulator reader found. None carries a coordinate: all are
settlement-grain labels. For a lens, the host already names a religious hierarchy that the map is meant to render.

**7.10.4 Magic legality** [OBSERVED]. See §4.5: an authored-major patron tightens legality and a warlike or evil one
forces open hostility (`src/domain/magicProfile.js:163-175`, `:259-265`, `:499-522`). `deriveMagicProfile` is a derived
read-model with no flag, read by the dossier, force composition, AI grounding and the PDF
(`disp/dossierViewModel.js:28`, `disp/forceComposition.js:79`, `src/domain/aiGrounding.js:51`,
`src/pdf/lib/viewModel.js:29`); local, wherever such a patron is seated.

**7.10.5 Military will** [OBSERVED]. The patron's derived temper adds +8 (warlike) or −6 (peacelike) to the will facet
of military capacity (`wp/militaryStrength.js:261-273`). That capacity feeds the occupation faith pull
(`wp/religiousContest.js:220`) and the war and occupation readers (`wp/occupation.js:68`, `wp/warCapacityReads.js:31`,
`wp/irregularForce.js:55`, `wp/tradeSalience.js:39`, `wp/roadsKernel.js:75`) and the displays (`disp/warResolve.js:20`,
`disp/armyStrength.js:30`). A derived read with no flag; consequential where war runs (DC, FS).

**7.10.6 Chaotic-devout misjudgment** [OBSERVED]. A besieger whose patron is chaotic — scaled by local piety and the law
megaphone, and exactly zero without a projected piety record or with a lawful or neutral patron
(`wp/fidelityNoise.js:57-72`) — classifies war feasibility on noisy estimates of both sides' capacities; the roll then
uses the true values (`wp/warSiegeVerdict.js:20-25`, `:238-260`; pull computed at `wp/warDeployment.js:549`). War layer
(DC, FS); needs an authored chaotic law axis.

**7.10.7 Clergy against their god (the NPC ladder)** [OBSERVED]. A religious-institution head whose trait plane sits far
from the patron's evil/chaos position (coherence below 0.45) opens a permanent `faith_rupture` challenge window
(`wp/npcLadderCoherence.js:1-63`; `wp/npcLadderChallenge.js:180-212`, `:273-276`). It reads the patron from
`worldState.religionStates`, not from the config embed. Gate `npcLadderEnabled` (ONE_REGEN: RR, DC, LR, FS;
`wp/simulationRules.js:742-752`). Local.

**7.10.8 Conquest** [OBSERVED]. The WR-8 conquest-doctrine stage reads the victor's patron nature and the rival's
believed `faithLabel`, resolved to a nature (`wp/conquestDoctrineStage.js:434-470`) — BUILT DARK:
`conquestDoctrineEnabled` is set by no preset and the stage also needs `demographicsEnabled`, which FS declares false
(`wp/conquestDoctrineStage.js:22-28`; `wp/simulationRules.js:282`, `:1170`). Conquest feeds apply a good patron's
conscience objection to the captive (slave-trade) windfall (`wp/conquestFeeds.js:118-142`), on fresh occupations
(`wp/pulseKernel.js:1761-1762`): war layer, DC and FS.

**7.10.9 Religious factions** [OBSERVED]. Faction competition gives a religious faction the power bases
religious_authority, healing_capacity and moral_legitimacy, the government form `temple_authority`, and the law stakes
`temple_privilege`, `moral_codes` and `tithe_rights` (`wp/factionCompetition.js:56`, `:78`, `:90`) — the fifth
tithe-adjacent surface beside the four in §7.4. Gate `factionCompetitionEnabled` (default true; off in QL and SC;
`wp/simulationRules.js:70`, `:870`, `:965-980`). The faction-density kernel seats an unrepresented religious power as
"Devout Assembly" and treats legitimacy as category-scoped for religious powers (`wp/factionDensityKernel.js:366-381`);
its gate is the world's born density-law version, with the product dial held at v1 [STATED `:20-40`] — status not
verified. None of these reads a deity.

**7.10.10 Faith in cause attribution** [OBSERVED]. The `rivalCult` flag (§3.11) feeds the `conversion-pressure` cause
class (`wp/causeVocabulary.js:127`, `:139`, `:211`).

**7.10.11 More display surfaces** [OBSERVED]. `src/components/settlements/RealmStrip.jsx:46`, `:123`, `:166-170` (a
"Dominant faith" segment from the pantheon ledger); `map/RealmDashboard.jsx:65-77`, `:265`, `:368-371` (the Dominant
faith tile, re-checked; it names the deity by the capitalized tail of its id, not the snapshot's name);
`disp/settlementRumors.js:1022-1047` (`activatedDeityNamesFrom`, the public deity-name allowlist for the rumor
value-scrub, built from patron **and** cult embeds, so an unadmitted cult's name is allowlisted too);
`src/domain/ai/personaSlicer.js:175-179` (an AI persona facet carrying the patron and up to four cults);
`disp/treatyDocument.js:105-113` (mission-right prose for honored, strained and defaulted terms);
`src/domain/realm/heraldRouting.js:148-156` (faith-desk routing: footholds, pacts, pantheon arcs, the conversion
fracture, pact betrayal, `religious_authority`, `religious_pressure`, deity war and peace pressure,
`strategy_missionize`, `compound_gods_abandonment`). Not read whole: `disp/stateProse/warFaithStateProse.js` (933 lines;
119 faith/deity/patron hits), `disp/warResolve.js` (34 hits), `disp/regionWakeReplay.js` (15 hits).

---

## 8. STATUS — by mechanism and preset (checked in `wp/simulationRules.js` at `81f1cd96`)

Every row below **also** needs at least one seated deity (data), except the fracture stressor, generation and the map
renderers. ✓ = runs; – = does not; "canon" = additionally needs the spatial-canon digest (data). Preset membership was
re-checked against the preset bodies (`wp/simulationRules.js:692-800`, `:864-1221`).

| Mechanism | Gate | QL | RR | DC | SC | NC | LR | FS | Class |
|---|---|---|---|---|---|---|---|---|---|
| Deity authoring and DM seating | premium entitlement | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | LIT |
| Local pantheon: shares, standing, slots, entry by DM, patron, contest, legitimacy, sink, projection | deity presence | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | LIT (no flag) |
| Local piety `f`; divine mandate | deity presence | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | LIT |
| Global pantheon ledger, tiers, cap, arcs; earned-tier feedback | deity presence | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | LIT (no flag) |
| Suppression stamp, narrative prune, patron-fall ring, last-seat rows, obituary (WF-1, WF-8a) | `faithUnseatingEnabled` (FP_LIT_ALIVE) | – | ✓ | ✓ | – | – | ✓ | ✓ | LIT in 4 |
| Observance ±1 share nudge | `traditionsEnabled` (ONE_REGEN) | – | ✓ | ✓ | – | – | ✓ | ✓ | LIT in 4 |
| Pilgrimage host lift (deity-agnostic) | `traditionsEnabled` + canon | – | canon | canon | – | – | canon | canon | LIT in 4 |
| Faith prescribes (`buildFaithReach` → moral institutions) | `institutionLifecycleEnabled` | ✓ | ✓ | ✓ | – | ✓ | ✓ | ✓ | LIT in 6 |
| Moral founding; its season weight | institution lifecycle; `seasonsEnabled` | ✓;– | ✓;– | ✓;✓ | – | ✓;– | ✓;✓ | ✓;✓ | LIT |
| Fracture stressor birth / spread | `stressorsEnabled` / `propagationMode` | ✓/– | ✓/✓ | ✓/✓ | –/– | ✓/– | ✓/✓ | ✓/✓ | LIT (deity-independent) |
| SPREAD: carriers, mints, reach, prevalence, recognition, outside entry, cross-settlement conversion, resurgence | `faithSpreadEnabled` (preset default; a DM may set it per campaign, §6.1) | – | – | ✓ | – | – | – | ✓ | LIT in 2 by default |
| Realm piety `g` | `faithSpreadEnabled` | – | – | ✓ | – | – | – | ✓ | LIT in 2 |
| Stance lane (betrayal/pact news); footholds | spread | – | – | ✓ | – | – | – | ✓ | LIT in 2 |
| Occupation-forced conversion | spread + war layer | – | – | ✓ | – | – | – | ✓ | LIT in 2 |
| sacred_claim / common_rite | spread + war + peace | – | – | ✓ | – | – | – | ✓ | LIT in 2 |
| Deity temper in war appetite | `warLayerEnabled` | – | – | ✓ | – | – | – | ✓ | LIT in 2 |
| `religious_pressure` impacts | mints exist + propagation | – | – | ✓ | – | – | – | ✓ | LIT in 2 |
| Believed `faithLabel` | canon + non-omniscient infoMode | – | – | canon | – | – | canon | canon | LIT in 3 |
| Missionize lever (trust nudge) | strategy + belief layer + church seat | – | – | canon | – | – | – | canon | LIT in 2 |
| Migration faith affinity | canon + migration | (preset interaction not checked) | | | | | | | LIT on canon |
| Faith-weighted relief between partners (§7.10.1) | `constructiveFlowsEnabled` (WAVES) | – | ✓ | ✓ | – | – | ✓ | ✓ | LIT in 4 |
| Faith-weighted contraband at commodity arrival gates (§7.10.2) | `commodityFlowEnabled` + canon | – | canon | – | – | – | – | canon | LIT in 2 on canon |
| Foreign-seat weight by culture closeness (§7.10.2) | not checked | | | | | | | | not checked |
| Clergy `faith_rupture` challenge window (§7.10.7) | `npcLadderEnabled` (ONE_REGEN) | – | ✓ | ✓ | – | – | ✓ | ✓ | LIT in 4 |
| Magic legality by authored-major patron; patron temper in military will (§7.10.4-5) | none (derived reads) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | LIT (derived) |
| Chaotic-devout misjudgment; captive conscience on conquest (§7.10.6, §7.10.8) | `warLayerEnabled` | – | – | ✓ | – | – | – | ✓ | LIT in 2 |
| Religious faction stakes: temple privilege, moral codes, tithe rights (§7.10.9) | `factionCompetitionEnabled` | – | ✓ | ✓ | – | ✓ | ✓ | ✓ | LIT in 5 (deity-independent) |
| `rivalCult` → `conversion-pressure` cause (§3.11) | cause lifecycle runs when a compromise exists or a cause-lifecycle ledger is already held (`wp/pulseKernel.js:1828-1829`; no further flag traced) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | LIT where a compromise exists |
| Conquest doctrine's faith reads (§7.10.8) | `conquestDoctrineEnabled` + `demographicsEnabled` | – | – | – | – | – | – | – | BUILT DARK |
| Typed-graph `pilgrimage_center` / `religious_superior`; `mapProfile.regionalAuthority` (§7.10.3) | none (derived) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | BUILT; `regionalAuthority` unconsumed, the typed links reach only the AI grounding payload (`src/domain/aiGrounding.js:441`) |
| Faith influence field | none (data: authored boon/bane) | dormant | dormant | dormant | dormant | dormant | dormant | dormant | WIRED, dormant by data |
| Believed devotion; `faith_communion` drafting | `believedDevotionEnabled` | – | – | – | – | – | – | – | BUILT DARK |
| WF-1d dissolution names the fall | `warTerminationEnabled` | – | – | – | – | – | – | – | BUILT DARK |
| WR-2 deity-domain pressure | `dispositionChannelsEnabled` | – | – | – | – | – | – | – | BUILT DARK |
| `tithe_share` | `treasuryEnabled` | – | – | – | – | – | – | – | BUILT DARK |
| Faith witness source; plague temple pulse | — | | | | | | | | SEAM |
| WF-2 pilgrims/legates; WF-3; WF-4 omens; WF-5 schism split + covert; WF-6 executors; WF-7 tithe; WF-8 remainder; WF-9 | — | | | | | | | | UNBUILT |
| WY-4 faith cargo; WC faith exposure | — | | | | | | | | UNBUILT |
| Co-religionist network; faith rumor carrier; PIOUS/SECULAR age; religious-center loop; MF worship fabric | — | | | | | | | | DESIGNED ONLY |
| Map: `religious_authority` fronts drawn | renderer lit; data needs spread | – | – | ✓ (gm) | – | – | – | ✓ (gm) | LIT UI |
| Living-World "Faith spread" toggle (per-campaign override) | premium write (`canManageCampaigns`) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | LIT UI |

Notes on the table:

- **The fold's status of record** (FOLD §2, measured at `00b648c9d`) lists for FAITH: LIT = WF-0 floor, WF-1a..1F and
  WF-8a (`faithUnseatingEnabled` in four presets including the default); BUILT DARK = WF-1d and the WF-6 rows; UNBUILT =
  WF-2..WF-9 remainder; and "the birth preset seats no deity (FPQ-62)" [STATED FOLD:341]. The code at `81f1cd96` agrees.
- **The birth caveat** [OBSERVED re-checked]: `NEW_CAMPAIGN_SIMULATION_PRESET_ID` is `null`, so a campaign born through
  `newCampaignSimulationRules` gets the plain normalized defaults — which do not carry the virtual FP keys such as
  `faithUnseatingEnabled` — until a preset's rules are applied (the rules dialog, or an instant world's tone preset that
  defaults to RR) [`wp/simulationRules.js:31`, `:1552-1557`; per a seat `src/lib/instantWorld/composeInstantWorld.js:417-419`].
  The fold's "lit in the default preset" is true of the preset table, not of every born world.
- **The one lit chain in the default preset** is "a pact proposed … and a patron's fall — which is VACUOUS on every born world"
  [STATED FOLD:351]. In RR, a DM who seats deities gets living local pantheons, a global ledger, local piety, the
  mandate, falls and obituaries, observance nudges, faith-prescribed institution pressure, the fracture crisis
  spreading as unrest, faith-weighted relief between partners, clergy `faith_rupture` windows and, on canon,
  faith-weighted contraband — but, unless the DM lights the Living-World gate, no creed ever moves between settlements
  and realm piety is 1.0.
- A stale normalizer comment says infoMode `full` fails closed to omniscient; the reader `infoModeOf` accepts `full`,
  so FS's belief layer is live on canonized worlds [OBSERVED re-checked `wp/simulationRules.js:1404-1409` vs `:1509-1511`].

---

## 9. MAP TOUCHPOINTS — what the maps show and read today, and what a religion lens needs and could add

### 9.1 What the world map shows about faith today [OBSERVED]

- **Faith fronts:** `RelationshipEdges` draws each *confirmed* `religious_authority` channel as a straight, dashed
  (5 3), purple (#6a2a9a), 2.2-wide line between the two settlements' placement points, with a midpoint dot and no arrowhead (the channel is directed; the drawing does not show it),
  no tooltip and no pointer events; hidden channels never, gm channels only when the "GM regional channels" toggle is on
  (default on); mounted under the **Relationships** layer [`map/RelationshipEdges.jsx:43-82`, `:182-203`;
  `map/relationshipEdgeStyle.js:57-73`; `src/components/MapOverlay.jsx:338`; `src/store/mapSlice.js:90-99`]. No route
  geometry: the segment ignores roads.
- **Religious-pressure rings** at target settlements (the regional-impacts layer); this layer subtracts the faith channel
  lines so they are drawn once [`map/RegionalCausalityLayer.jsx:6-11`, `:84-121`; `src/lib/regionalMapOverlay.js:48-113`].
- **Legend row** "Religious authority" (purple, dash 5 3) [`map/MapLegend.jsx:49-57`].
- **"War & faith" layer** (`layers.warFaith`, default on) toggles `WarFaithMapOverlay`, which draws deployment arrows,
  siege rings, occupation shading, trade-war prizes and mobilization arcs — **no faith glyph**; its header says the faith
  front is the edge layer's job [`map/WarFaithMapOverlay.jsx:1-26`, `:93-143`; `map/LayersPanel.jsx:238-242`]. Toggling
  "War & faith" off leaves the faith fronts on. The Wayfare ruling to delete the deployment arrows is not yet applied
  [STATED WY:56-58, :1653-1660; OBSERVED `map/WarFaithMapOverlay.jsx:98-105`].
- **Beside the map:** the Herald Faith door renders `PantheonPanel` and `AssignDeityFromMap`, and offers no map-lens chip
  (the door-lens table maps only war, events and wanderers) [`map/HeraldBody.jsx:69-79`, `:282-291`]; the Realm
  dashboard has a "Dominant faith" tile (top deity by seats) [OBSERVED re-checked `map/RealmDashboard.jsx:65-77`,
  `:368-371`]; the
  "Conversion Contests" list pairs deities whose mints point into the same convert, attributing each mint to the
  carrier's **current** patron (the channel has no deity id) and ignoring channel visibility
  [`disp/pantheonDepth.js:124-201`].
- **Absent:** no per-settlement faith colour, marker, pie, piety heat, reach field, prevalence field, conversion arrow,
  pilgrim, missionary or sacred site; no map **renderer** (`RelationshipEdges`, `WarFaithMapOverlay`, `TerritoryLayer`,
  `RegionalCausalityLayer`) reads `primaryDeitySnapshot`, `faithProfile` or `religionStates`. In the map folder, the
  `PantheonPanel` side panel does read `primaryDeitySnapshot`, to resolve deity names and the carrier → deity map for
  the contest preview (`map/PantheonPanel.jsx:50-70`), and the Realm dashboard reads the `pantheon` ledger (above).
  `TerritoryLayer` shades the digest's territory dots by tier only [`map/TerritoryLayer.jsx:1-31`].
- **Published maps** carry public channels only, so the gm-default faith fronts are dropped; an optional public
  pantheon section (name, tier, seats, W/L) and the arcs; `religionStates` hard-denied; a snapshot carrying
  `latentPantheon` is rejected server-side [`disp/worldSnapshotPublic.js:66-124`, `:570-590`;
  `mig/128_latent_pantheon_public_denylist.sql:181-193`].

### 9.2 The town map

- Religious institutions get the spire or small-spire glyph, placement ring 30, and centrality 1; their hover is
  "deity-safe by authorship" with dossier/map parity [OBSERVED per a seat `glyphAssign.js:40`, `:91-92`;
  `townMapModel.js:81`; `townLayoutV2.js:87`; STATED `docs/DESIGN_SETTLEMENT_MAP.md:118`, `:172-179`].
- The building grammar reserves patron alignment and a patron emblem, but hard-codes both alignments to 0.5 and hashes
  the emblem from the scene, not from any deity [OBSERVED `src/domain/townScene/buildingProfiles.js:331-336`;
  `src/domain/townMap/arch/params.js:18-31`]. The town fabric's worship ladder is designed only (MF, ruled out of FP).

### 9.3 The geometry the faith system reads

| Reader | Geometry read | Gate |
|---|---|---|
| Spread carrier reach | distance weight from the frozen digest | spread + canon |
| Spread prevalence | distance weight | spread + canon |
| `buildFaithReach` (faith prescribes) | distance weight | institution lifecycle + canon |
| Pilgrimage host lift | isMapped, path cost (no season), distance weight; nearest 8 | traditions + canon |
| Migration faith affinity | path cost, hop weeks, distance weight, route choice | canon + migration |
| Conversion ripple (parked impacts) | hop weeks via `spatialArrivals`, lengthened in winter by the digest's seasonal overlay | canon (+ overlay for the season) |
| Faith-weighted relief (§7.10.1) | partner graph; belief-gated route risk on the withhold side | WAVES |
| Faith-weighted contraband (§7.10.2) | commodity routes' arrival gates (culture distance gate ↔ origin) | commodity flow + canon (RR, FS) |
| Moral founding (§7.4) | season weight only | `seasonsEnabled` (DC, LR, FS) |
| Typed neighbour graph; `mapProfile.regionalAuthority` (§7.10.3) | settlement-grain labelled links, no coordinates | none (derived; `regionalAuthority` unconsumed, the typed links read by AI grounding only) |
| Plague into crisis disorder | plague travels routes; faith reads only the local level | canon |
| Believed `faithLabel` | rumors priced by road distance and hop latency | canon + non-omniscient |
| Everything else (carriers, neighbours, mint, recognition, occupation, stance, sacred claim, fracture spread, seats, realm piety) | **none** — graph topology or realm-wide counts | — |

The contest and its reach read **no** season, territory partition, route or road, sea lane as a carrier, travel time,
or site [OBSERVED]; a season reaches faith only through the parked ripple and moral founding (§6.14). Temples are
creed-agnostic institution rows at settlement grain with no coordinates; deities have no home or sacred site;
`sacred_claim` is a claim between two patrons, not a territory; "the tree has no faith-site linkage" [STATED ARCH_WF
V24-V25; OBSERVED `wp/religionLegitimacy.js:181-202`]. What the host does hold is **settlement-grain faith-place
labels**: `pilgrimage_center` / `religious_superior` links in the typed neighbour graph, surfaced by `mapProfile` as a
`regionalAuthority` hierarchy "the map should render" that nothing consumes, and the `holySite` generation resource
(§7.10.3). No faith geometry and no coordinates.

### 9.4 What a map-side religion and conversion lens needs from the host (all read-only host facts)

| Fact | Where | Audience note |
|---|---|---|
| Patron per settlement (name, ref, axes) | `config.primaryDeitySnapshot` | public once embedded; never `latentPantheon` |
| Pantheon mix: share, standing, niche, legitimacy, isPatron; contested; patron security; unaffiliated | `config.faithProfile` | shown read-only to every viewer of a deity-bearing settlement |
| Suppressed creeds; contest counters | `worldState.religionStates` | engine state, **not** public |
| Local piety (`local01`, band, trend, causes); realm `g` | `config.faithProfile.piety` | `g` meaningful only in DC/FS |
| Patron falls (cause, tick; ring of 3) | `religionStates[cid].patronFalls`; `faithProfile.patronFall` | unseating presets |
| Global rank: tier, seats, W/L | `worldState.pantheon` | public allowlisted |
| Faith fronts (from, to, strength, visibility, explanation) | `regionalGraph.channels` of type `religious_authority` | gm by default; dropped from published maps |
| Carrier substrate | regional edges (allied/trade/patron/vassal) and war_front/military_protection/political_authority channels; `worldState.occupations` | follow channel visibility |
| Conversion events, arcs, obituaries, footholds | pulse history / news receipts | convert only, no source |
| Fracture crisis | `worldState.stressors` (affected ids, severity per settlement); `spatialArrivals` | — |
| Rite movement | traditions `adoptedFrom` | — |
| Distance attenuation | frozen digest via `mappedDistanceWeight` | canonized worlds only |
| Believed faith of others | belief map `faithLabel` | belief presets on canon |
| Faith-place labels | `deriveRegionalGraph` links of type `pilgrimage_center` / `religious_superior`; `deriveMapProfile(...).outputs.regionalAuthority` | derived from the authored neighbour list; settlement grain; `regionalAuthority` has no consumer, the typed links only the AI grounding payload (`src/domain/aiGrounding.js:441`) |
| Faith-weighted relief | generosity receipts (faith term per decision) | WAVES presets |
| Whether anything can move | `faithSpreadEnabled` (legacy precedence; per campaign, settable from the Living-World gate), `faithUnseatingEnabled`, canon marker | the lens must read the campaign's resolved flags, not the preset id |

### 9.5 What a lens could add without inventing host facts [INFERRED]

1. **A mixture view, not borders:** per-settlement patron colour with a share pie or bar, standing, unaffiliated share,
   piety band, contested marker and patron-security ring; legend ordered by global tier and seats.
2. **Fronts restyled and filtered:** the existing mints, with the deity resolved from the explanation or the carrier's
   patron (a heuristic the host itself uses), and an honest "historic front" style because mints are never retired.
3. **Recomputed pressure (as a derivation, labelled as such):** reach and prevalence per deity per settlement, using the
   exported pure carrier and reach functions and the digest's distance weights — choosing explicitly between the spread
   lane's gated reach and `buildFaithReach`'s ungated one [Fable-reviewed 2026-10-18: only `faithCarriersOut` (`wp/religiousContest.js:314`) and `buildFaithReach` (`:361`) are exported; the spread lane's gated reach (`:596-653`) is internal to `advanceReligionStates`, so a lens may recompute the carriers and the ungated reach by the host's own functions, and the gated reach only once the host exports it (a host ask) — V13 §5.9 (6) draws pressure only from the host's sent weight].
4. **Crisis ripple:** the fracture stressor's affected set and the in-transit `spatialArrivals` with arrival ticks.
5. **Tension marks:** ruler-versus-populace (low patron legitimacy with high share, an imposed patron's heresy stain, a
   theocracy's mandate drift), and sacred-claim / common-rite pair edges from the war-reason ledgers where lit.
6. **A seat footprint:** the territory dots coloured by each owning settlement's patron — clearly a projection, since
   the host has no faith territory.
7. **A time scrub over what the host dated:** patron changes, falls, tier changes and arcs. The host does **not** keep a
   share history, so scrubbing mixtures requires the map side to snapshot per pulse (a derived cache) or replay.
8. **Host hierarchy and partner flows** (added in verification): the `regionalAuthority` religious-superior hierarchy,
   which the host's map interface already says the map should render, and pilgrimage-centre labels — both settlement
   grain; and relief receipts weighted by shared faith (§7.10.1, §7.10.3).

What a lens must **not** do: draw pilgrims, missionaries, positioned holy places, hidden cult sites or a "valley of the
war god" region as if the host held them (labelling a settlement the typed graph calls a pilgrimage centre or religious
superior is a host fact; placing a site is not); recover a conversion's source as fact; show gm fronts, suppressed creeds or
`religionStates` to players; show realm piety or movement in presets where they are inert; or name any latent deity.

### 9.6 How this reading changes the J379 reading (the owner's question)

The session's J379 reading (`docs/PROGRESS.md:438`) described a religion lens over "per-settlement shares summing to
100, tier slots, chief with incumbency, carrier spread over allied/trade/patron/vassal/garrison channels, bounded
regional prevalence, receptivity, occupation-forced conversion, suppressed cults that resurge, spread-only from the
DM-seeded pantheon under a containment cap". Having read the whole system, I would keep the lens and change ten things:

1. **The default preset has nothing moving — by default.** Spread, realm piety, occupation conversion and the stance
   lane are dark in RR (and QL, SC, NC, LR) unless the DM lights the Living-World gate for the campaign (§6.1), so the
   lens must read the campaign's resolved rule. A conversion lens must open in a "still pantheons" mode when spread is
   off and say so, not imply flows; faith-weighted relief and contraband still cross settlement lines (§7.10).
2. **Born worlds are empty.** No deity until a premium DM authors one (FPQ-62); the lens is inert on free and fresh
   worlds by construction.
3. **The containment cap is not a spread cap.** It bounds global tier changes (two per tick realm-wide). Spread itself
   has no realm-wide cap; each settlement's share step is the brake.
4. **Carriers are not routes.** Faith travels along diplomacy and garrison links — including *hostile* war fronts at
   0.72, the strongest two-way carrier (an overlord's authority channel reaches its vassal harder, at 0.82, one way; §6.2) [Fable-reviewed 2026-10-18: was "the strongest carrier", contradicted by §6.2's own table] — and only patrons travel. Geography only attenuates (floor 0.35) on canonized worlds,
   with no season and no latency on the contest itself (the parked regional ripple does carry hop-week latency,
   lengthened in winter where the digest has a seasonal overlay). "Flows along carrier routes" should be "pressure along carrier links".
5. **Dated receipts cannot yet name a source.** The conversion receipt names only the convert; the reach map is not
   kept; fronts carry no deity id and are never retired. A host ask is implied: put the deity id and the strongest
   carrier source on the mint and the conversion receipt, and retire mints when the carrier ends.
6. **Holy places and hidden cult sites have no faith geometry.** Temples have no coordinates; suppressed cults are
   latent memory (≤ 3) with no location. The host does carry settlement-grain faith-place labels — `pilgrimage_center` /
   `religious_superior` links and a `regionalAuthority` hierarchy output that `mapProfile` says the map should render,
   unconsumed today — plus the `holySite` resource (§7.10.3). A lens may draw that hierarchy and label those
   settlements as host facts; positioned sites would be map-side facts needing the owner's ruling and, to matter, a host [Fable-reviewed 2026-10-18: ruled by J384 (10) under the owner's delegation — holy places and hidden cult sites enter only as DM-placed world sites tagged with a deity, DM-only by default, offered to the host; never generated]
   adoption.
7. **Pilgrims, missionaries and inquisitors have no host fact as movers.** The only pilgrim math is a deity-agnostic host
   lift that discards who came; missionize is a trust nudge; WF-2's season and named movers are unbuilt and their spine
   is dark. Faith encounters derived on the map would be invention until WF-2 lands; WF-2's design (season from draw ×
   believed devotion × route viability, road danger, 52-week feasts, interceptable errands with a return leg) is the
   spec a lens should mirror when it does.
8. **Culture as a resistance term already exists inside faith.** Receptivity's incumbent counterforce (temper,
   alignment, law method) plus the chaos crisis lift is the host's resistance; culture distance (faith 0.30, its largest
   term) is not used by the contest, but it is read by migration destination choice, commodity-route contraband at
   arrival gates and the foreign-seat weight, and relief between partners reuses the same faith axes (§7.10.1-2). A lens should show the host's term, not add one.
9. **The sea as a cheap carrier is new simulation.** Faith has no geographic carrier; sea lanes only shorten path cost
   when lit. Coastal footholds across water would be a host change, outside a lens. [Fable-reviewed 2026-10-18: the owner answered "yes" to the session's reading — faith gets no sea carrier (J382 (c)).]
10. **The player view is narrow.** Faith fronts are DM-only by default; believed faith exists only in DC, LR and FS on
    canonized worlds; but a settlement's own pantheon is shown to every viewer once embedded. "Audience-believed faith on
    player maps" is available only in those belief presets.

What stays as J379 had it: gradients and mixtures instead of borders (the host is a mixture model); ruler-versus-populace
tension (host-backed, §7.1); occupation-forced conversion (host-backed, DC/FS); suppressed creeds DM-only (host-private);
no new simulation, nothing flowing back unless the host chooses (the frozen-versus-live law, §6.14).

---

## 10. Document-versus-code contradictions and open questions

### 10.1 Documents that the code has outrun or contradicts

1. **REWORK's data model and constants are stale**: chief names and `CHIEF_HOLD_MULT` 1.15 became the patron fields and
   a 0.35 *fraction* of each downward step resisted; a load-time migration exists; code adds legitimacy, the sink,
   falls, suppression ticks, `PUSH_MARGIN` and standing hysteresis [STATED REWORK:93-101, :204-207; OBSERVED
   `wp/religionState.js:45-85`; re-checked `wp/worldState.js:272-280`].
2. **Global rank by adherents** (REWORK §2.7) — code counts patron seats only (§4.2).
3. **"The chief is the top share among the top three"** (REWORK:32-34) — code takes the top share overall; the top three
   appear only in the contest.
4. **Niche from `temperamentAxis`** (REWORK:30, :38) — temper is derived; stale comments in
   `wp/cultImpositionApply.js:22-26` and `wp/religiousContest.js:224` still say "stored verbatim".
5. **"Generation mints a starting pantheon"** (REWORK:180-185; PHASE4 §4 / W-F5 ratified it) — retired; and the
   "latent in every seed" claim survives in `src/components/compendium/PantheonActivationStrip.jsx:6-9`,
   `src/copy/deityAuthoring.js:74`, `:105-106`, `src/domain/display/publicSafe.js:73-75`
   and the header of migration 128 [OBSERVED].
6. **REWORK §2.4-§2.6** present carrier, prevalence and occupation entry as the model without saying they are
   spread-only since the two-lane split. **PHASE4 §1.3** says piety is absent (it is built); **PHASE4 §1.9** puts global
   inter-deity politics in the spread lane, but the pantheon advances on local activity [OBSERVED `wp/pulseKernel.js:1704`].
7. **"This is the ONLY faith dynamic still gated by a rule flag … it just never crosses a settlement boundary"**
   [STATED `wp/simulationRules.js:90-100` (the quoted words at `:92-93` and `:97`); `wp/religiousContest.js:24-33`] — faith prescribes, the fracture spread, tolerance
   drift, faith-weighted relief and (on canon) faith-weighted contraband cross boundaries in RR (§6.10, §6.11, §7.4,
   §7.10); and the Living-World gate can light spread itself on any campaign (§6.1).
8. **"The fracture spreads along `religious_authority`"** [STATED `wp/religiousContest.js:10-12`] — it declares three
   channels (§6.10). And "conversion spreads along `religious_authority`" conflates the mint (not a carrier) with the
   creed's path (§6.3).
9. **PHASE55 §3: conversion inherits distance + latency** — distance only (§6.14). COUPLINGS' "Spread moves at carrier
   reach" (COUPLINGS:344) omits the built distance attenuation entirely (`wp/religiousContest.js:365-376`).
10. **`faithField.js` header "THE FIELD IS DARK, nothing calls it"** — called since F4c; `customContentSchema.js:241-242`,
    `:297-298` ("no mechanical consumer") likewise stale; `faithWitnessSource.js:16-30` says its funnel is absent, but
    the catalog admits it (still no caller).
11. **WF-1 "five causes"** (ARCH_WF:270, :418; FAITH J-WF-5 :1498; ARCHITECTURE:1991) — four ship (`wp/patronFall.js:76`).
    **"The Schism realm arc exists"** (FAITH:1327) — it does not. (ARCH_WF:270, :418 and FAITH:1327 already carry the fold's 2026-10-16 CORRECTED brackets; FAITH:1498 and ARCHITECTURE:1991 do not.) **"God's Abandonment"** still ships despite OD-FC-8.
    The Ascendancy headline "the faithful walk the roads" has no mechanic behind it.
12. **OD-FC-7** (light believed devotion in three presets) — ruled, not applied at `81f1cd96`.
13. **WF-2's lane and movers**: FAITH §3 says SPREAD + SP-1; ARCH_WF:190 says SPREAD + errand spine; pilgrims' purpose
    class corrected from religious to personal (J-EM-6). The slice brief placed pilgrims and legates in WY; WY has no
    mention of them (they live in FAITH and `wp/envoyErrandVocabulary.js:322-335`).
14. **`pilgrimage_right` cannot form without WF-2** (ARCH_WF:499) — the draft lens drafts it ungated. **`missionary_access`
    "moves believer-share bands"** (GRAMMAR) vs "a gate, never a share" (FAITH) — clarified at GRAMMAR:868. The GR-6
    temple arm is unreachable under the one-finder law (GRAMMAR:1290).
15. **One-writer law vs the traditions nudge** — ruled one writer family; the code cure is owed (FOLD:267).
16. **Tithe**: four sources, ruled one flow with two ends; the generation-time static tithe is not mentioned by any
    ruling (§7.4).
17. **Stale normalizer comment** on infoMode `full` (§8 notes).
18. Line rot: ARCH_WF R4 and COUPLINGS cite superseded line numbers for the kernel mounts, the carriers and mediation
    [STATED per a seat]. PHASE55:1588-1589's "LivingWorldGates still writes the legacy key" is stale: CL-0 pair-writes
    both keys (§6.1). `regionalGraph.js:19-22` still reserves active propagation for "a future tier" (§7.10.3).

### 10.2 UI and code contradictions

19. The "War & faith" toggle cannot hide faith; the Faith door has no lens chip (§9.1).
20. `PantheonPanel`'s strength bar and contest strengths use the ledger tier, while the engine converts at the higher of
    authored and earned — an authored-major deity with one seat displays as a 35% cult but converts at 0.95
    [OBSERVED `map/PantheonPanel.jsx:185-186`, `:216`].
21. `relationshipEdgeStyle.js:60-61` calls the faith front "along an allied/trade edge"; it can lie along a war front.
22. `PantheonActivationStrip`'s "dynamics" milestone accepts the legacy spread flag, though the local lane and the
    ledger need no flag [OBSERVED `PantheonActivationStrip.jsx:45-49`].
23. The DS-FTH-2 "patron-less town" prose is effectively unreachable (mounted only for a premium viewer with no embed,
    who gets no Faith tab) [OBSERVED `src/components/new/tabs/WarFaithDesk.jsx:272-292`; `FaithTab.jsx:227`, `:284-309`;
    `src/components/OutputContainer.jsx:511-514`]; the desk's own header admits an untested direction (:32-43).
24. `AssignDeityFromMap.jsx:14-16` still calls the war verbs "coming soon"; `PantheonPanel.jsx:9-11` says the tab
    self-hides while `RealmInspector.jsx:83-87` says no door does; `faithPanelModel` falls back to `portfolio`, which
    snapshots no longer carry.
25. **Defects** [OBSERVED re-checked]: the post-seed `IMPOSE_CULT` is never admitted (§3.11); the conversion receipt's
    source is self-referential (§6.7); a DM re-assign banks no win/loss (§3.6); mints are never retired (§6.3);
    hostile war fronts carry faith hardest (§6.2); `neighbourIdsOf` counts any link of any status, including rival,
    criminal and dormant ones, as a prevalence neighbour (§6.5); the spread lane's reach and `buildFaithReach` differ
    (§6.11); history text still uses generic deity names (§2.5; `src/generators/historyGenerator.js:212`) and named Christian orders (`:215`). Added in verification: a
    patron clear leaves a stale pantheon and ledgers (§3.11); a demotion leaves an over-capacity pantheon (§3.11);
    `rivalCult` blames cults the pantheon never admitted (§3.11); a suggested discovery candidate could pin a pulse mint
    at `suggested` [INFERRED] (§6.3); the Realm dashboard names the dominant deity by its id's tail (§7.10.11).
26. Seat disagreement resolved: one seat's readings left the faith-field import "unresolved"; three observed it wired.
    Re-checked: wired, dormant by data (§6.13). One seat listed hostile edges as non-carriers; re-checked: the label is
    not a carrier, but its war_front channels are (§6.2).

### 10.3 Open questions for the owner and the map design

- **FPQ-62:** should the birth preset seat any deity? Until it does, every faith lens is empty on fresh worlds.
- Should the **default preset** light `faithSpreadEnabled`? Without it, "conversion moves between settlements" does not
  exist in the preset worlds are born into.
- Should faith fronts carry the **deity id and source**, and should mints **retire** when their carrier ends? (Decides
  whether a lens draws present or historic fronts.)
- Should hostile relationships carry faith at 0.72, the strongest two-way carrier (only an overlord's authority over its vassal, 0.82 one way, is stronger)?
- Should the contest read **seasons, travel time or sea lanes** [Fable-reviewed 2026-10-18: no sea carrier for faith — the owner's J382 (c)] (only the parked ripple and moral founding read a
  season today), and should realm piety be **size- or distance-weighted**?
- Should `mapProfile.regionalAuthority`'s religious hierarchy (the host's own map interface says the map should render
  it) be rendered by the map module's lens?
- Should `SET_PRIMARY_DEITY` with no deity clear the settlement's pantheon, and should a demotion trim an over-capacity
  pantheon?
- Should the "War & faith" toggle govern the faith front, and should players ever see the gm-default fronts?
- Is a map-derived **pilgrim catchment** (recomputed from the discarded draw) an allowed derived layer, or the lens
  minting a fact the host does not hold? Same question for map-side holy sites. [Fable-reviewed 2026-10-18: holy sites answered by J384 (10) — DM-placed, deity-tagged, never generated; the catchment drawn only as the set the host sends (V13 §5.9 (6), T-V13-54; J379.1 as amended in the rulings record).]
- The post-seed cult admission: intended or a defect?
- OD-FC-7 (believed devotion) and OD-FC-8 (the rename; the attributed edit) await application.

---

## 11. Sources

### 11.1 Read whole by the six reading seats (line counts at `81f1cd96`)

- Documents: `docs/RELIGION_REWORK.md` (215), `docs/DESIGN_FP_FAITH.md` (1,706), `docs/DESIGN_FP_ARCH_WF.md` (858),
  `docs/PHASE4_FAITH_DELTA.md` (1,203).
- Faith state and ranking: `wp/religionState.js` (794), `wp/pantheon.js` (479), `wp/piety.js` (477),
  `wp/latentPantheon.js` (108), `wp/religionLegitimacy.js` (536), `wp/deityAxes.js` (153), `wp/deityStance.js` (174),
  `wp/deityStanceLane.js` (402), `wp/deityFlaws.js` (253), `wp/faithTuningSurface.js` (323), `wp/clergyTraitPlane.js`
  (298), `src/domain/deitySnapshot.js` (118), `src/domain/deityConstants.js` (29), `src/domain/deityCommitEmbed.js` (144),
  `src/store/settlementDeityHelpers.js` (271), `src/store/deitySnapshot.js` (7), `wp/cultImpositionApply.js` (105).
- Spread and conversion: `wp/religiousContest.js` (1,029), `wp/faithField.js` (472), `wp/faithChannelBindings.js`
  (171), `wp/sacredClaim.js` (225), `wp/faithNews.js` (232), `wp/faithWitnessSource.js` (280),
  `wp/faithReceiptPools.js` (66), `wp/convergenceReactive.js` (108), `src/domain/traditions/pilgrimage.js` (104).
- UI, map, data: `map/PantheonPanel.jsx` (270), `map/WarFaithMapOverlay.jsx` (229), `map/AssignDeityFromMap.jsx` (140),
  `map/RelationshipEdges.jsx` (206), `map/relationshipEdgeStyle.js` (74), `map/RegionalCausalityLayer.jsx` (124),
  `src/lib/regionalMapOverlay.js` (113), `src/components/new/tabs/FaithTab.jsx` (312), `.../WarFaithDesk.jsx` (318),
  `set/FaithSection.jsx` (300), `set/faithPanelModel.js` (252), `set/DeityAssignmentPanel.jsx` (369),
  `src/components/compendium/PantheonActivationStrip.jsx` (166), `disp/pantheonDepth.js` (220),
  `disp/faithDeepening.js` (275), `disp/deityEffects.js` (266), `disp/deityNames.js` (77), `disp/faithEventFilter.js` (45),
  `disp/realmArcSummary.js` (155), `src/copy/deityAuthoring.js` (142); migrations 049 (68), 056 (41), 128 (221), 129
  (81), 200 (155).

### 11.2 Read in part or by grep by the seats (named so the gaps are visible)

`docs/DESIGN_FP_COHERENCE_FOLD.md` (708; §0, §1 req 16/17, §2 whole, §3 faith rows, §5, §7 OD-FC-7/8/25/29, §9);
`docs/DESIGN_FP_COUPLINGS.md` (1,960; faith passages and CPL-2/7/12-15, Stories 1, 2, 5); `docs/DESIGN_FP_ARCHITECTURE.md`
(3,324; flag manifest, ledgers, Phase 5 faith, WY-4); `docs/DESIGN_FP_ARCH_HB.md` (4,517; 36 faith hits);
`docs/DESIGN_FP_INFORMATION.md` (1,536); `docs/DESIGN_FP_GRAMMAR.md` (1,612; GR-3 faith family);
`docs/PHASE55_SPATIAL_ENGINE_DESIGN.md` (1,710; all faith hits); `docs/DESIGN_REALM_DIRECTIVES.md` (1,911);
`docs/DESIGN_WAR_RULINGS_ARCHITECTURE.md` (1,768); `docs/DESIGN_FP_ARCH_WC.md` (7,054); `..._POP.md` (617); `..._TR.md`
(627); `..._ES.md` (2,127); `..._WY.md` (1,737); `..._MF.md` (486); `docs/DESIGN_SETTLEMENT_MAP.md` (386); and in code
`wp/simulationRules.js` (1,593), `wp/pulseKernel.js` (3,007), `wp/applyWorldPulse.js` (1,340), `sp/distanceRead.js`
(1,192), `rg/graph.js` (1,029), `rg/propagation.js` (1,179), `wp/beliefMap.js` (1,602), `wp/stressors*.js`,
`wp/traditionsKernel.js`, `wp/moralInstitutionPressure.js`, `wp/settlementStrategy.js`, `wp/patronFall.js` (167; 60-167),
`wp/momentum.js`, `wp/migrationKernel.js`, `sp/pestilence.js`, `sp/rumorNetwork.js`, `sp/cohesionWeave.js` (419),
`src/domain/causalState.js`, `disp/worldSnapshotPublic.js` (683), the generators named in §2.5, and other map files by grep.

### 11.3 My own re-reads at `81f1cd96` (this seat)

`rg/graph.js:50-66`, `:85-97`, `:562-600`, `:615-630`, `:665-725`, `:745-770`, `:985-1029`; `wp/stressorsCore.js:155-168`;
`wp/religionState.js:36-44`, `:164-232`; `wp/faithField.js:10-27`; `wp/religiousContest.js:84-98`, `:314-350`,
`:436-472`, `:596-620`, `:680-735`, `:995-1029`; `wp/simulationRules.js:28-33`, `:86-110`, `:692-800`, `:864-1080`,
`:1205-1225`, `:1395-1420`, `:1455-1560`; `wp/settlementStrategy.js:70-80`, `:180-210`, `:385-400`, `:1070-1082`;
`wp/beliefMap.js:204-209`; `wp/pulseKernel.js:1316-1352`, `:1468-1484`, `:1698-1724`;
`rg/discoverDependencyCandidates.js:150-200`; greps of `wp/sacredClaim.js`, `src/domain/traditions/pilgrimage.js` and
every `religious_authority` / `cultDeitySnapshots` site; `mig/200_deity_authored_character.sql` (155, header);
FOLD §2 (`:329-352`); and in this repository `docs/PROGRESS.md:434-438` (J375-J379) and the format of
`research/sf/fp-simulator.md`.

Verification re-reads (fixer seat, §12), all at `81f1cd96`: `wp/causeVocabulary.js` (292; `:1-30`, `:115-215`);
`wp/causeLifecycle.js:358`; `wp/subsystemActivation.js:46`; `wp/religiousContest.js:99-104`, `:540-560`, `:696-740`;
`wp/religionState.js:88-120`, `:160-235`, `:319-330`; `wp/religionLegitimacy.js:70-90`; `src/domain/deityConstants.js:20-29`;
`wp/cultImpositionApply.js:45-60`; `wp/pantheon.js:270-300`, `:330-395`, `:466-479`; `wp/pulseKernel.js:552-575`,
`:1696-1722`, `:1826-1842`, `:1870-1880`; `wp/applyWorldPulse.js:185-245`, `:750-770`; `sp/spatialArrival.js:40-95`;
`wp/moralInstitutionPressure.js:500-520`; `src/domain/magicProfile.js` (522; `:155-180`, `:250-270`, `:490-522`);
`src/components/settlements/LivingWorldGates.jsx` (381; `:1-30`, `:60-80`, `:227-290`, `:320-381`);
`wp/generosityKernel.js` (1,391; `:298-340`, `:396-420`, `:440-465`, `:616`, `:636-668`); `sp/generosityEV.js` (938;
`:15-64`, `:235-260`, `:325`, `:935-938`); `sp/smuggle.js` (343; `:1-30`, `:165-185`); `sp/cultureDistance.js` (210;
`:35-60`, `:160-180`); `sp/commodityFlow.js:160-180`, `:365-385`; `wp/supplyKernel.js:670-760`;
`src/domain/rulingPowerSeat.js:1-40`, `:340-375`, `:655-690`; `wp/simulationRules.js:690-760`, `:864-1090`, `:1578-1586`;
`wp/faithTuningSurface.js:45-65`; `src/domain/content/customContentManifest.generated.js:1560-1705`;
`src/components/compendium/customCategories.js:15`; `map/PantheonPanel.jsx:45-70`; `map/RealmDashboard.jsx:60-80`;
`src/components/settlements/RealmStrip.jsx:46`, `:123`, `:155-175`; `src/domain/regionalGraph.js` (354; `:1-45`,
`:120-155`, `:195-252`, `:300-315`); `src/domain/mapProfile.js` (354; `:1-35`, `:200-230`); `src/data/resourceData.js:397-412`;
`src/generators/resourceGenerator.js:370-395`; `rg/discoverDependencyCandidates.js` (502; `:1-60`, `:74-105`, `:185-200`,
`:225-245`); `rg/graph.js:159-175`, `:560-600`, `:1008-1029`; `rg/propagation.js:195-275`, `:287`, `:451`, `:565-580`,
`:705-715`; `wp/militaryStrength.js:255-278`; `wp/warSiegeVerdict.js:15-30`, `:238-260`; `wp/fidelityNoise.js:50-90`;
`wp/npcLadderCoherence.js` (65, whole); `wp/npcLadderChallenge.js:178-214`, `:268-278`; `wp/conquestDoctrineStage.js:1-30`,
`:430-472`; `wp/conquestFeeds.js:118-142`; `wp/factionCompetition.js:50-95`; `wp/factionDensityKernel.js:18-40`,
`:305-320`, `:366-382`; `src/domain/events/mutateEntities.js:925-996`; `disp/settlementRumors.js:1018-1049`;
`src/domain/ai/personaSlicer.js:170-182`; `disp/treatyDocument.js:105-114`; `src/domain/realm/heraldRouting.js:145-158`;
`disp/publicSafe.js:73-80`; `wp/worldState.js:272-280`; `src/components/new/tabs/WarFaithDesk.jsx:270-294`;
`src/components/new/tabs/FaithTab.jsx:225-229`, `:280-312`; `src/components/OutputContainer.jsx:509-515`; the document
lines PHASE55:1586-1590, WY:523-529, FAITH:47-51, FAITH:1327, ARCH_WF:157-158, :270, COUPLINGS:815-819, GRAMMAR:868; and
greps for `cultDeitySnapshots`, `rivalCult`, `DEITY_RANK_STRENGTH`, `boonChannel`, `cultureDistance` / `cultureAffinity`,
`regionalAuthority`, `holySite`, `religious_authority` (labels), `primaryDeitySnapshot|faithProfile|religionStates` under
`src/components/map`.

### 11.4 Not read by any seat

`docs/DESIGN_FP_SPINE.md`; the deity DOCTRINE record cited as "DOCTRINE:81-93" (not located under `docs/`);
`docs/GEOPOLITICAL_WAR_LAYER.md` Feature D; `docs/DESIGN_TRADITIONS.md` (not located under `docs/` at `81f1cd96`; cited by code headers such as `wp/traditionsKernel.js:3`); `memory/spatial-engine-direction.md` (not
located); the findings kit `settlement-engine-kits/fp-coherence-2fc13d59-2026-10-16/`; and in code
`wp/warTermination.js`, `wp/pactFormation.js` beyond 180-200, `wp/pactTriggers.js`, `wp/treatyEnforcement.js` beyond a
grep, `wp/peaceReasons.js`, `wp/martialReadiness.js`, `wp/moralMartialLean.js`, `wp/disposition.js` and
`dispositionProfile.js` beyond fragments, `wp/npcAgency.js`, `wp/factionCapture.js`, `wp/fidelityNoise.js` beyond `:50-90`,
`wp/corruption.js`, `wp/magicLedger.js`, `wp/pestilenceKernel.js`, `wp/neutralNeighbourEdges.js`, `RealmInspector.jsx`
beyond grep, `publicSafe.js` beyond `:73-80`, the affordance-manifest predicates for the deity verbs, `customRegistry`
ref minting (read in the retrovalidation: `src/lib/customRegistry.js:111-141`, §2.2), and the internals of the distance calibration. (The verification seat read `wp/causeVocabulary.js`,
`src/components/settlements/LivingWorldGates.jsx` — the earlier path `src/components/LivingWorldGates.jsx` was wrong —
`RealmDashboard.jsx`, and the `mutateEntities.js` deity handlers `:925-996` in part; see §11.3.) Also not read whole in
verification: `disp/stateProse/warFaithStateProse.js`, `disp/warResolve.js`, `disp/regionWakeReplay.js`,
`wp/warDeployment.js` beyond `:549`, the `rulingPowerSeat.js` consumers and their gates, and the document citations to
FAITH, ARCH_WF, PHASE55, WY, COUPLINGS and GRAMMAR other than the lines listed in §11.3. Claims that rest only on these are tagged
[STATED] by citation or attributed "per a seat".

---

## 12. Verification record

A verifier checked this note against the host at `81f1cd96` and returned 12 problems (P) and 17 omissions (M). The
fixer seat re-checked each at the source (reads listed at the end of §11.3). One row per problem the verifier did not
mark "holds" and one per omission: what the verifier said, what the re-check found, and what changed in this note.
Where the verifier was itself partly wrong, the "Found" column says so and the note follows the code.

| # | Verifier said | Found at the source | What changed |
|---|---|---|---|
| P1 | The post-seed cult defect holds, but the reader census misses `causeVocabulary.js:127` (`rivalCult`). | Confirmed. `rivalCult` (`wp/causeVocabulary.js:139`) makes the `conversion-pressure` cause present whenever any cult is imposed (`:211`), read by the cause lifecycle (`wp/causeLifecycle.js:358`). The fold's own presence check (`wp/religiousContest.js:707-708`) also reads the list; the WF-8a fence is at `:851`. | §3.11 census rewritten (four reader sites and the "rival cult never admitted" consequence); §7.10.10; §8 row. |
| P2 | Legitimacy lag cited at `religionLegitimacy.js:81`, which is PREVALENCE_CAP. | Confirmed: LAG `:75`, STAIN_DECAY `:79`, PREVALENCE_CAP `:81`; the values were right. | §3.10 row re-cited. |
| P3 | `DEITY_RANK_STRENGTH` is not at `deityConstants.js:29`. | Confirmed: single-sourced at `wp/cultImpositionApply.js:52`, re-exported through `wp/pantheon.js` (`:92`, `:476-479`) and `wp/religiousContest.js:102`; `deityConstants.js:29` holds only `DEITY_RANK_AUTHORITY`. | §2.3 citation fixed. |
| P4 | A tier changes two ticks after the flip, not about three. | Confirmed: `advancePantheon` counts seats and ratchets in one call (`wp/pantheon.js:466-474`); the seat appears at T+1 with dwell 1, matures at T+2 (`:350-366`, `:384-387`). | §4.3 bullet now [OBSERVED] "two ticks"; §6.9 cadence sentence fixed. |
| P5 | The authored-rank-only readers omit `magicProfile.js` `dominantDeityOf`. | Confirmed (`src/domain/magicProfile.js:499-503`, `:163-175`, `:259-265`, `:510-522`). It is a derived read-model with no flag (dossier, force composition, AI grounding, PDF), not a pulse writer. | §4.5 extended; §7.10.4; §8 row. |
| P6 | The Living-World gate now pair-writes both keys; the PHASE55 line is stale; a DM can light spread in RR. | Confirmed (`src/components/settlements/LivingWorldGates.jsx:68-72`, `:249-261`); premium write gate (`:332`); mounted on the world-map overlays and the Realm dashboard. | §6.1 rewritten; §1, §6.15, §8 (SPREAD row, new toggle row, notes), §9.4, §9.6 item 1, §10.1 items 7 and 18. |
| P7 | RR has at least five cross-settlement faith reads, including generosity and contraband (`commodityFlowEnabled` "lit in RR, DC and FS"). | Generosity confirmed (WAVES: RR, DC, LR, FS; W_FAITH 0.10), but its route term is on the **withhold** side, not in the give score. Contraband confirmed, but `commodityFlowEnabled` is set only by RR and FS (`wp/simulationRules.js:896`, `:1081`), **not DC**, and it also needs spatial canon (`sp/commodityFlow.js:171-177`). | §1 lists the five reads plus the canon-only ones; §7.10.1-2; §8 rows; §10.1 item 7. |
| P8 | `faithTuningSurface.js:54-59` does not say the UI hides the boon/bane surface. | Confirmed: it says only that no deity authors one (`:54-58`). A stronger source exists: the manifest marks the six authored-character fields `ui: false` (`customContentManifest.generated.js:1480`, `:1597`, `:1623-1624`, `:1647`, `:1676`, `:1700`) and the editor drops such fields (`src/components/compendium/customCategories.js:15`); grep finds no `boonChannel` under `src/components` or `src/copy`. | §6.13 re-tagged [OBSERVED] with those citations. |
| P9 | "Faith reads no season" holds only for the contest; the ripple and moral founding read the season "where seasons are lit (DC, LR, FS)". | Ripple confirmed (`wp/applyWorldPulse.js:762`; `sp/spatialArrival.js:56-58`, `:83`), but its season is **not** gated by `seasonsEnabled`: the road season is computed every tick (`wp/pulseKernel.js:570-575`) and bites wherever the digest carries a seasonal overlay — a data gate. Moral founding is the `seasonsEnabled` read (DC, LR, FS; `wp/moralInstitutionPressure.js:509-517`). | §1, §6.10, §6.14, §9.3 (table and paragraph), §9.6 item 4, §10.3. |
| P10 | `map/PantheonPanel.jsx` reads `primaryDeitySnapshot`; the claim holds only for map renderers. | Confirmed (`map/PantheonPanel.jsx:52`, `:64`, inside `:50-70`); the Realm dashboard reads the `pantheon` ledger (`map/RealmDashboard.jsx:65-77`). | §9.1 says "no map renderer"; the PantheonPanel exception is named; the dashboard citation is now [OBSERVED]. |
| P11 | "No faith-site concept" overstates it: the typed graph has `pilgrimage_center` / `religious_superior`, `mapProfile` outputs `regionalAuthority`, and there is `holySite`. | Confirmed (`src/domain/regionalGraph.js:28-42`, `:139-152`, `:199-200`, `:227-229`, `:245-250`; `src/domain/mapProfile.js:205-224`; `settlement.schema.js:1567-1577`; `src/data/resourceData.js:399-411`). `regionalAuthority` has no production consumer (tests only). One refinement: the "propagation hints" are descriptive strings; the header reserves active propagation for a future tier (`regionalGraph.js:19-22`). | §1 (3), §7.10.3, §8 row, §9.3, §9.4 row, §9.5 item 8 and the must-not line, §9.6 item 6. |
| P12 | `cultureDistance` (faith 0.30) is also read by generosity, smuggle/commodity/supply and the cohesion weave. | Partly. Migration (`wp/migrationKernel.js:230`) and contraband (`sp/smuggle.js:176`, context `wp/supplyKernel.js:687-756`) do read it. Generosity and the cohesion weave do **not** import it: they reuse the same two faith axes through their own reads, with no 0.30 weight (`wp/generosityKernel.js:319-334`). `commodityFlow.js:377` is a typedef comment, not a read. One reader the verifier missed: the foreign-seat weight (`src/domain/rulingPowerSeat.js:361-371`, `:673`). | §9.6 item 8 rewritten; §7.10.2; §8 row. |
| M1 | Faith-weighted generosity, lit in RR, DC, LR, FS via `constructiveFlowsEnabled`. | Confirmed: give weight 0.10 faith (`sp/generosityEV.js:53`), faith term 0.4 temple-mediated + 0.6 shared faith (`:250`); gate `wp/generosityKernel.js:453`. The route term is withhold-side (W_ROUTE 0.14, `sp/generosityEV.js:64`). | New §7.10.1; §8 and §9.3 rows. |
| M2 | Faith-weighted contraband on commodity routes; `commodityFlowEnabled` lit in RR, DC and FS. | Mechanism confirmed; preset set corrected to **RR and FS** only, and canon is required. | New §7.10.2; §8 row "LIT in 2 on canon". |
| M3 | The typed neighbour graph and `mapProfile` name a faith hierarchy the map should render. | Confirmed (see P11). | New §7.10.3; §9 updates. |
| M4 | Magic legality coupling ignores earned tier. | Confirmed (see P5). | §4.5; §7.10.4. |
| M5 | Deity temper in military will (+8 / −6) feeds the occupation pull and war verdicts. | Confirmed (`wp/militaryStrength.js:261-273`); the occupation pull reads it at `wp/religiousContest.js:220` (the verifier cited `:225`). | New §7.10.5; §8 row. |
| M6 | Chaotic-devout fidelity noise at war initiation; `fidelityNoise.js` listed as unread. | Confirmed (`wp/warSiegeVerdict.js:20-25`, `:238-260`; `wp/fidelityNoise.js:57-72`; pull at `wp/warDeployment.js:549`). Zero without a piety record or with a lawful or neutral patron. | New §7.10.6; §8 row; §11.4 now says `fidelityNoise.js` beyond `:50-90`. |
| M7 | NPC-ladder `faith_rupture` window, gated by `npcLadderEnabled` (RR, DC, LR, FS). | Confirmed (`wp/npcLadderCoherence.js:1-63`; `wp/npcLadderChallenge.js:180-212`, `:273-276`); it reads the patron from `religionStates`, not the embed. | New §7.10.7; §8 row. |
| M8 | Conquest doctrine reads patron nature and believed `faithLabel`; conquest feeds apply a patron conscience objection. | Both reads confirmed. Status added: conquest doctrine is **BUILT DARK** (no preset sets `conquestDoctrineEnabled`; it also needs `demographicsEnabled`, false in FS); conquest feeds run on fresh occupations (war layer, DC and FS). | New §7.10.8; two §8 rows. |
| M9 | The Living-World gate makes "RR has nothing moving" a default, not a ceiling. | Confirmed (see P6). | As P6. |
| M10 | Seasonal latency on the conversion ripple. | Confirmed, with the data-gate correction in P9. | As P9. |
| M11 | [INFERRED] Clearing a patron leaves stale `religionStates` / `pantheon` / `faithProfile`. | Confirmed in the code paths, not executed (`src/domain/events/mutateEntities.js:935-941`; no clear branch in `wp/religionState.js:211-231`; `wp/religiousContest.js:701`, `:709`, `:547`; `wp/pulseKernel.js:1720-1722`, `:1876-1878`). Further consequence found: a later organic flip re-embeds a patron on a settlement whose patron the DM cleared (`wp/applyWorldPulse.js:195-197`). | New §3.11 defect; §10.2 item 25; §10.3 question. |
| M12 | A third pulse reader of `cultDeitySnapshots`. | Confirmed (see P1). | As P1. |
| M13 | Religious faction stakes (temple privilege, moral codes, tithe rights) and the "Devout Assembly". | Confirmed (`wp/factionCompetition.js:56`, `:78`, `:90`; gate `factionCompetitionEnabled`, off in QL and SC). The density kernel's gate is the world's born density-law version, held at v1 [STATED `wp/factionDensityKernel.js:20-40`] — its status is not verified. | §7.4 tithe census now five; new §7.10.9; §8 row. |
| M14 | More display surfaces; `heraldRouting` at `src/domain/realm/heraldRouting.js:148-156`. | Confirmed. One refinement: `settlementRumors.js:1022-1047` is the public deity-name **allowlist** for the rumor scrub, built from patron and cult embeds (so it allowlists unadmitted cults). Also found: the Realm dashboard names the dominant deity by its id's tail. | New §7.10.11; §6.7 herald citation re-checked. |
| M15 | The discovery producer's status (suggested vs confirmed) is unresolved. | Candidates are born `suggested` and need DM confirmation (`rg/discoverDependencyCandidates.js:1-7`, `:242-244`), so the map draws none unconfirmed. No writer of the label found by grep. [INFERRED, not executed] Both producers share one channel id and a merge keeps the prior status (`rg/graph.js:159-173`, `:562-600`), so a suggested candidate merged first would hide a later pulse mint. | §6.3 bullet resolved; §10.2 item 25. |
| M16 | Tier drift silently resizes the pantheon; nothing trims an over-capacity pantheon. | Confirmed (`wp/religionState.js:92-107`, `:165`, `:172`; capacity consulted only at `:199` and `:319-330`); tier drift lit in every preset but SC. | New §3.11 defect; §10.3 question. |
| M17 | Many document and "per a seat" citations, and the `religious_pressure` constants, were not verified. | Spot-checked. These hold: `publicSafe.js:73-80`, `wp/worldState.js:272-280`, the FaithTab / WarFaithDesk / OutputContainer lines, `treatyEnforcement.js:270` (no production caller), PHASE55:1588-1589, WY:523-528, FAITH:47-51, FAITH:1327, ARCH_WF:157-158 (V24-V25) and :270, COUPLINGS:815-819, GRAMMAR:868. One did **not** hold: the `religious_pressure` severity is (0.33 + 0.45 × strength) × magnitude, because an empty goods list weighs 0.4 (`rg/propagation.js:198-201`, `:269-275`), and depth is 2 under full propagation (DC, FS), not 1 (`wp/simulationRules.js:1578-1586`). The other FAITH, ARCH_WF, PHASE55, WY, COUPLINGS and GRAMMAR line citations were not re-checked. | §6.10 formula and depth fixed; re-checked "per a seat" tags upgraded (§6.7, §7.3, §9.1, §10.1 item 1); §11.3 and §11.4 updated. |
