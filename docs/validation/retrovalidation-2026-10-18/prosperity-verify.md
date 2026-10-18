# Retrovalidation — prosperity, verifier record

Lane `retrovalidation/prosperity-verify` (opus; J390, Fable-checked). Family "prosperity": `research/sf/prosperity-system.md`
(1,116 lines; carries the J375 notice). Host `/home/user/clausellstokes-lang/settlement-engine`, `refs/heads/master` =
`81f1cd963553f226b222714914ff34584e9911b8` (read from `.git/refs/heads/master`, no git command run). Facts only; design
soundness is the Fable validator's.

## Method

The note was read whole (lines 1-1116). Each checkable claim (citation, tag, count, line number, quoted phrase, "the code
does X", "the document says Y") is opened at its source and recorded below as it is checked. Abbreviations as the note's
own header.

## Progress (written as I go)

- 00:41 — §1/§2/§3.1/§3.2/§3.6 core checked against `econ/prosperity.js` (whole), `src/data/constants.js:85-100`,
  `src/domain/prosperityRank.js` (whole), `src/domain/causalState.js:300-360, 760-831`, `src/domain/activeConditions.js`
  (catalog), `wp/upswingKernel.js` (whole, 978), `src/generators/foodGenerator.js:335-380`. Boom cadence re-probed
  (scratchpad `retro/prosp/boom.mjs`: 7,7,7,7,7,7,7,8,…). Candidate findings so far: F1 (§1 "isolated 1"), F2 (§8.1
  `:182-190`).
- 00:42 — §3.3 (traditions, whole file 948 read), §3.4 (generosity), §3.5 (ransoms), §3.7 (lifecycle), §4 donors checked.
  Ratchet arithmetic recomputed by hand (Struggling −0.21 … Wealthy +0.43; fair +0.16/+0.43/+0.67): holds.
  New candidates: F3 (genesis scaleBand), F4 (ransom steps only on term-end/party ransom), F5 (C9 `:410`).
- 00:43 — embattlement (`sp/embattlement.js` 1-335), entrepôts (55-265), trade flow, commodity gate, pilgrimage (whole),
  lifecycle health + conquest feeds, belief pull band, faith disorder, corruption, condition promotion, district wealth,
  v2 layout reads, gallery, autonomy, undercity checked. New candidates: F6 (conquest half-life), F7 (severity modifier
  only when the stressor has no severity), F8 (embattlement decay wording).
- 00:50 — preset table re-probed read-only (scratchpad `retro/prosp/probe/table.mjs`, `t2.mjs`: all seven presets + the
  BORN rule set; every lit/dark cell of §7.2 that a flag decides matched); documents UPSWING (whole, 144), EC rows
  M7/M8/M11/M47 and S16-S39, PHASE55 §4b/§4c/§4i and :1061/:1130/:1675, PG pg-2, MF §11.4, TRIBUTE, FOLD §2, GCA,
  simulation-intelligence-layer; map-side notes (trade-system, fp-physical-integration, faith, plague, population,
  fp-realm-review, AMENDMENTS-m, PROGRESS J375-J384) checked. Findings F9-F19 added below.

## Findings (written as found; final table)

| # | Where (note) | Claim | Verdict | Evidence (path:line, what it says) | Fix |
|---|---|---|---|---|---|
| F1 | §1 "How it is set" | route class "crossroads or port 3, road or river 2, isolated 1" | IMPRECISE | `econ/prosperity.js:183-192`: a disconnected thorp/hamlet takes 0; a disconnected village or larger takes 2 with working teleportation and magic, else 1 (the note's own §3.1 has it right) | "isolated 1 (0 for a thorp or hamlet; 2 with working teleportation and magic)" |
| F2 | §8.1 Generation row | source `econ/prosperity.js:182-190` | IMPRECISE | the route-base expression runs `:182-192` (the "1" arm at :191, road/river "2" at :192) | cite `:182-192` |
| F3 | §3.3 | "each with a grandeur `scaleBand` aligned to the tier index [OBSERVED `tr/genesis.js:111-126`; STATED `:98`]" | IMPRECISE | `tr/genesis.js:394-398`: only the founding core takes `tierIndex`; every addition draws `randInt(birthTierIndex, tierIndex)` with a random birth tier (≥1 when the tier is ≥1). :98's "aligned to tier index" is the typedef | "the founding core at the tier index, each addition between a random birth tier and the tier index (`tr/genesis.js:394-398`)"; the −0.10/−0.20 scale-mismatch examples are for the founding core |
| F4 | §3.5 (and §5.3 by reference) | "At resolution: captor +1 … home −1 for a pillar … spared when adventurers paid"; term "13 + 26 × importance" | IMPRECISE | `wp/roadsKernel.js:827-836` (the branch at :831-836): only a term-end release pays both steps; a party ransom pays the captor step only; every other early release (rescue, captor gone, occupied, peace) pays no step. `rd/state.js:403`: term = 13 + round(26 × importance) | "At a term-end release …; a party ransom pays only the captor's step; rescue, the captor's fall, occupation or peace release with no step"; "13 + round(26 × importance)" |
| F5 | §10.2 C9 | "`settlementLifecycleFirstClass.js:291`, `:319`, `:410`" | IMPRECISE | :410 is a blank line; the "nearby prosperity" comment and variable are at :411-412 | cite `:411-412` |
| F6 | §3.9 | conquest-feed pulse "(≤ 0.35, about an 11-week half-life)" | IMPRECISE | `wp/conquestFeeds.js:57-77` (CAPTIVE_DECAY :61, LOOT_DECAY :71, PROSPERITY_W :77): two channels — captive decay 0.06 (≈11-week half-life) and loot decay 0.09 (≈7.3-week half-life); the combined lift ≤ PROSPERITY_W 0.35 | "(≤ 0.35; its loot channel halves in about 7 weeks, its captive channel in about 11)" |
| F7 | §3.10 condition severity (and §6, §7.2 row, D5) | a promoted condition "takes +0.06 severity … −0.06 …" | IMPRECISE | `src/domain/conditionPromotion.js:168`, `:201`: the settlement modifier applies only when the stressor carries no numeric severity (`severity == null ? deriveGenerationSeverity(archetype, sevMod) : severity`); the summed modifier is clamped −0.25…+0.18 (`:124`) | add "when the stressor carries no severity of its own (`:201`); the combined modifier is clamped −0.25…+0.18" |
| F8 | §3.2 "What embattled means" | "then decays by 0.12 a tick once calm" | IMPRECISE | `sp/embattlement.js:245-247` (`priorLevel * (1 - T.RELAX_RATE)`, RELAX_RATE 0.12 at :82): the decay is 12% of the level a tick, not 0.12 absolute (the note's 29-tick figure is the multiplicative one) | "decays by 12% of its level a tick once calm" |
| F9 | §8.2 Town map | "The v1 layout does not read prosperity." | IMPRECISE | `tm/townMapModel.js:368` derives every district through `deriveAllDistricts`, and :400, :485 carry each district's band-nudged wealth word on the v1 model; no v1 geometry read of it was found (grep of `src/domain/townMap`) | "The v1 layout reads the band only through each district's wealth word, which it carries on the model (`tm/townMapModel.js:368`, `:485`) and does not draw with" |
| F10 | §6 pulse order | "the growth chain that ends with traditions and roads (`:2735`)" | IMPRECISE | the chain at `wp/pulseKernel.js:2735` runs ladder → traditions → roads → commons → assize → density (`wp/roadsKernel.js:1227`; `wp/assizeKernel.js:428`; `wp/factionDensityKernel.js:789-792`); none of the last three writes the band | "the growth chain (… traditions, roads, then commons, assize and density, which do not write the band)" |
| F11 | §6 readers | compendium quote "not a dial you set; an output you read" | IMPRECISE | `src/domain/compendium/bandLadders.js:220` reads "Not a dial you set. An output you read." (the prosperity ladder's blurb) | quote verbatim and cite `:220` |
| F12 | §7.2 last row | condition grammar "no producer or consumer (`tm/arch/conditionGrammar.js:9`)" | IMPRECISE | `tm/arch/settlementDress.js:37` and `tm/arch/conditionParams.js:46` import it; no module outside that folder imports either (src grep); :9 itself says "imported by nothing shipped" | "no shipped consumer (two dormant siblings import it)" |
| F13 | §10.1 D8 | "(UPSWING §4 promises 'receipted' steps)" | IMPRECISE | UPSWING §4 (`docs/DESIGN_UPSWING_RELATIONSHIP_FLOWS.md:119-125`) does not use the word; "receipted" is §0 (:12) and B2 says "receipt-visible" (:103); the code's tuning comment says "(receipted)" (`wp/upswingKernel.js:121`) | "(UPSWING §0 and B2 promise receipted, receipt-visible steps, :12, :103; the tuning comment says 'receipted', `wp/upswingKernel.js:121`)" |
| F14 | §10.2 C7 | "EC rows M7, M8 and M11 say famine, harvest and plague move prosperity 'one way (S16)' today" | IMPRECISE | EC:2240 (M7) "prosperity falls one way (S16)" and EC:2241 (M8) "Food security lifts prosperity one way (S16)" hold; EC:2244 (M11) says "prosperity and legitimacy fall through their existing writers" — no S16 | "M7 and M8 say … 'one way (S16)'; M11 says plague's population loss makes prosperity 'fall through their existing writers'" |
| F15 | §7.3 item 1 | FOLD's TR→EC row reads "EC-0…EC-18 entire" | IMPRECISE | `docs/DESIGN_FP_COHERENCE_FOLD.md:340` reads "EC-0..EC-18 entire" | quote with two dots and cite `:340` |
| F16 | §5.6 | origin tolerance "(the population seat's reading, `research/sf/population-system.md:375`)" | IMPRECISE (stale pointer; the file has grown from the note's 852 lines to 1,091, so the 7d7f562 line cannot be re-read without git) | population-system.md:375 is an item about M4 origin and road deaths; the formula τ = 0.15 + 0.4 prosperity + 0.25 connectivity + 0.2 granary is at :417 (table row C); host `sp/migration.js:78-81`, `:190-196` | cite `population-system.md:417` (host `sp/migration.js:78-81`) |
| F17 | §6 War and plague | "agrees with `research/sf/plague-system.md:296-300`" | IMPRECISE (stale pointer, and the agreement no longer holds of the plague note as it stands; the file has grown from 817 to 1,085 lines since 7d7f562) | plague-system.md:294-301 is the severity fixed-point bullet and the §3.8 header; its prosperity section is §3.12 (:364-371), which agrees only for the pulse lanes (:366) and claims a DM Apply-stressor plague drops prosperity a rank (:368-371). At 81f1cd96 applyEvent runs no economy pass and prosperity keeps its generation value (`src/domain/display/economyFreshness.js:6-12`); `registryRerunKeys.js` is a freshness classifier, not a rerun engine (:19-30) | "agrees with `research/sf/plague-system.md:364-366` for the pulse lanes; that note's :368-371 (a DM plague drops a rank) is contradicted by `src/domain/display/economyFreshness.js:6-12`" |
| F18 | §10.2 C4 | "`wp/supplyKernel.js:580-586` says economic state is never written" | IMPRECISE | the sentence is at `wp/supplyKernel.js:590-591` ("economicState is NEVER written") | cite `:590-591` |
| F19 | §1 point (3); §9.1 items 2, 4; §10.3 (g), (h); §12 P10; §11.5 | J378's military term "the map's 'garrison and standing bands' (`docs/AMENDMENTS-2026-10-17m.md:111`, `:1695`, 'a new banding of its strength facets'; J-RR.52 in `research/sf/fp-realm-review.md:600`) … that banding is still the map's to define"; (g) and (h) open | IMPRECISE (stale) | at the current tree neither quoted phrase occurs in AMENDMENTS-m, fp-realm-review or V13 (grep); J-RR.52 is at `research/sf/fp-realm-review.md:611` and reads "the host's capacity facets bar the economy facet … J384 (4)"; `docs/PROGRESS.md:443` J384 (4): military bands EXCLUDE the economy facet, "so prosperity is counted once"; J384 (1): prosperity in territory is RELATIVE (realm median, ±3, 13-week dwell) — answering (g) and (h). The note's map revision (7d7f562) cannot be re-read without git | add after §9.1 items 2 and 4 and §10.3 (g), (h): "Ruled since by J384 (1) and (4) (`docs/PROGRESS.md:443`): relative band; military bands bar the economy facet (J-RR.52, `fp-realm-review.md:611`)"; re-point the AMENDMENTS-m / fp-realm-review citations |
| F20 | §1 "What is lit" | "Only an Instant World or a DM clicking a preset chip applies RR's lit keys (§7.1) [OBSERVED, probe]" | IMPRECISE (tag and scope) | the two named paths come from RR's own comment (`wp/simulationRules.js:889-892`, STATED — the note's §7.1 tags it so); the probe shows only that BORN lacks the keys. A third path exists: the DM screen's temperament picker (`src/components/screen/DmScreen.jsx` mounts `TemperamentPicker`; `wp/temperamentPresets.js:38-43` "A steady realm" and "The long winter" take `realistic_regional` as base, `:68-73` spread its rules), as do the realm inspector chips (`src/hooks/useRealmInspector.js:247-250`) | "An Instant World, a preset chip (realm inspector or rules dialog) or an RR-based temperament on the DM screen applies RR's lit keys [STATED `wp/simulationRules.js:889-892`; OBSERVED `wp/temperamentPresets.js:38-43`, `:68-73`; probe: BORN lacks them]" |

## Not a finding, recorded for the sibling lane (plague)

`research/sf/plague-system.md` §3.12 (:368-371) and its row P9 (:1069) say a DM Apply-stressor plague reruns
`economicState` and drops prosperity a rank (citing `registryRerunKeys.js:68`). At 81f1cd96 that table is a freshness
classifier only ("NOT descriptive metadata … a FUNCTIONAL CLASSIFIER", `src/domain/events/registryRerunKeys.js:19-30`),
the step-level rerun engine is retired, and `applyEvent`'s `reconcileSettlementChange` runs no economy pass, so
prosperity keeps its generation value (`src/domain/display/economyFreshness.js:6-12`; `src/domain/settlementReconciliation.js`
has no `economicState` token). The prosperity note's own reading (no plague writer) holds; the plague note's claim is the
one in question. Not edited here (not this lane's file).

## What could not be checked, and why

- The note's header facts about its writing session: "HEAD detached, tree clean" (today `.git/HEAD` reads
  `ref: refs/heads/master` at 81f1cd96 — the clone's state at writing cannot be recovered without git), the map module at
  `7d7f562`, and the two reading seats' outputs (16 and 19 mechanisms, their five disagreements) — the seats' readings are
  not in the repository. The §11.3 settlement of the five disagreements was re-checked against the code instead (gazetteer
  sort, boom cadence 7/8, toll-lift peak 0.195, capacity seed 28..86 / 22..88, purchase rounding): all hold.
- Map-side citations pinned to 7d7f562: the map files have grown since (PROGRESS 1,056 → 1,065 lines; trade-system 1,069
  → 1,307; population-system 852 → 1,091; plague-system 817 → 1,085; alignment-system 965 → 1,246; fp-physical-integration
  481 → 493). Their line counts in §11.3 and any line that has since moved cannot be re-read at 7d7f562 without git; they
  were checked against the current files (F16, F17, F19 record the ones that no longer resolve). faith-system.md (1,516)
  and fp-simulator.md (1,098; zero "prosperity" hits) still match.
- The probe internals of the original seat (`prosp-synth/probe.mjs`, its local mirror of the traditions outcome
  thresholds): not in any repository; the ratchet arithmetic was recomputed by hand from `wp/traditionsKernel.js:156-185`,
  `:336-343` and holds.
- Mounts the note itself leaves untraced (autonomy runs, corruption pass, store write of an Edit-Mode re-derivation, the
  v2 plan's visible sensitivity): open questions (a), (b), (i) in the note; not facts to verify.
- Design-intent readings of PHASE4 ("upkeep drag" as a development-value tilt): the DOCS seat's reading; PHASE4 :1132
  and :1178 were opened and carry the quoted words.

## Count

About 1,000 checkable claims checked (every citation in §1-§12 opened at its line; every count, constant, threshold and
quoted phrase re-found or recomputed; the §7.2 lit/dark cells that a flag decides re-probed for all seven presets and BORN;
§11.1-§11.2 line counts recounted: all 70-odd host counts and all eleven document hit counts hold). 20 do not hold: 0
WRONG, 0 UNSUPPORTED, 20 IMPRECISE (addresses, a scope or tag, stale map-side pointers). No conclusion of the note changes:
the four writers, the birth door, the BORN/RR flag table, the boom/festival/purchase/ransom arithmetic, the broken
gazetteer sort and every §10 defect hold at 81f1cd96.
