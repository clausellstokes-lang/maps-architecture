# SettlementForge's alignment system — settlement, NPC, faction and deity alignment and temperament; how they are set, drift and press between settlements, what they drive, and what a map lens can show

> Fable-reviewed 2026-10-18: PASS-WITH-CORRECTIONS — 17 verifier findings accepted (5 wrong, 12 imprecise) and 3 stale passages dated, 30 fragments applied in place; conclusions hold (lane retrovalidation/alignment; J392)

Synthesis seat `research/sf-alignment` (workflows/38-systems-read, subject "alignments"; `docs/PROGRESS.md` J380). Host:
`/home/user/clausellstokes-lang/settlement-engine` at `origin/master` `81f1cd96` (verified: detached HEAD, clean tree),
read-only — nothing was written there. Two reading seats returned structured readings (the run's
`alignment-reads.json`, about 137 KB, read whole); this note merges them, settles where they disagreed by re-reading the
code, and adds my own re-reads at `81f1cd96` (listed in §11.3). Everything is in my own words; no code is copied;
constants are quoted as values and formulas are restated as arithmetic.

Tags: **[STATED]** a document or a code comment says it; **[OBSERVED]** I read it in code at `81f1cd96`;
**[OBSERVED·r]** / **[STATED·r]** a reading seat recorded it (in code / in a document) and I did not re-read that line;
**[INFERRED]** my reasoning, with the reason given. Where the readers disagreed I say "re-checked".

Path abbreviations: `wp/` = `src/domain/worldPulse/`, `sp/` = `src/domain/spatial/`, `tm/` = `src/domain/townMap/`,
`comp/` = `src/components/`, `data/` = `src/data/`. Documents: SPINE = `docs/DESIGN_FP_SPINE.md`, FOLD =
`docs/DESIGN_FP_COHERENCE_FOLD.md`, WEAVE = `docs/DESIGN_COHESION_WEAVE.md`, PHASE55 =
`docs/PHASE55_SPATIAL_ENGINE_DESIGN.md`, PHASE4 = `docs/PHASE4_FAITH_DELTA.md`, WARCONV =
`docs/DESIGN_WAR_CONVENIENCE_AND_TRIBUTE.md`, DIRECTIVES = `docs/DESIGN_REALM_DIRECTIVES.md`, ATLAS =
`docs/SETTLEMENT_CAPABILITY_ATLAS.md`. Map-module notes: FAITH-NOTE = `research/sf/faith-system.md`, FP-SIM =
`research/sf/fp-simulator.md`, FP-PHYS = `research/sf/fp-physical-integration.md`.

Presets (the seven shipped, `wp/simulationRules.js:863-1222`): QL `quiet_local`, **RR
`realistic_regional` (the default, `wp/simulationRules.js:6`)**, DC `dramatic_campaign`, SC `static_campaign`, NC
`narrative_campaign`, LR `living_realm`, FS `full_simulation`. "canon" means the realm also needs a spatially canonized
digest (`worldState.spatialCanonVersion > 0`), which is data the DM creates with the "Map geography" action, not a rule
flag. One pulse tick is one week [STATED `wp/moralInstitutionPressure.js:55-57`].

---

## §1 Summary — the owner's question answered

The owner asked (J380): "now can you also do the same for alignments" — that is, see the alignment system whole: what
it is, how it is local and global, how it moves between settlements, and how that changes the map view.

**1. What a settlement's alignment is.** It is not stored anywhere. Each settlement has a *live reading* of two axes —
**lawfulness01** (0 lawless … 1 lawful-bureaucratic) and **malice01** (0 saintly … 1 malicious), each exactly 0.5 when
nothing signals — plus a third coordinate the design calls temperament, **aggressiveness** (a multiplier centred on
1.0: above belligerent, below pacific). One pure selector returns all three, and every consumer recomputes them from
current state on every read [OBSERVED `wp/settlementAlignment.js:44-55`; `wp/disposition.js:253-287`, `:536-593`].
There is no field, no writer, no history, and no realm or regional aggregate; the constitution forbids a stored stock
[STATED SPINE:76-92, requirement 13].

**2. How it is set at generation.** Implicitly, by what generation already writes: *who rules* (the governing faction's
archetype maps to a rule-of-law band and, for criminal and occupation regimes only, a malice band), *who the notable
people are* (each authored NPC's dominant/flaw/modifier personality words carry signed conscience and aggression
weights, averaged by importance), and *how legitimate the order is*. The patron deity's axes would enter too, but a
born world seats no deity, so those terms are zero [STATED FOLD:341, :351; OBSERVED `wp/disposition.js:418-593`].
Without a deity or deeds, lawfulness can only range about 0.24–0.74 and malice about 0.29–0.78 [INFERRED from the
weights, §3.4]; a single cruel NPC in an otherwise unscored roster is enough to make a hamlet read "malicious" (§3.1).

**3. How it drifts.** Only by moving its inputs: a coup, faction competition or occupation changes the governing
archetype; legitimacy writers move the law axis; NPCs arrive, leave or weather new traits (betrayal → "cynical" is the
only growth trait with a conscience weight); the DM edits an NPC's temperament; the patron seat changes (DM, conversion,
unseating); and *deeds* — the war-exhaustion scar, occupations held (+0.6 per holding into the malice "acts" term),
being occupied (a law drag), and the one dedicated alignment ledger, **moral drift**: an unjust instigation banks up to
about 0.28 malice drift (sharpest for a lawful-good actor striking a weak, saintly former friend) and announces a
Chronicle "reckoning" when it crosses 0.3 [OBSERVED `sp/moralDrift.js:48-85`, `:145-269`]. The design is a decay of 0.92
per silent week (half-life ≈ 8.3 weeks; the tuning comment says ≈ 9). **As built the decay compounds**: each tick the
kernel multiplies the already-decayed stored value by 0.92 raised to the whole silence since the last act, so after n
silent ticks the factor is 0.92^(n(n+1)/2) — a half-life of about 3.6 weeks, and a 0.28 maximum is pruned at the eighth
silent tick [OBSERVED `sp/moralDrift.js:218-224`, `:251-254`; OBSERVED by running the host function read-only, §12 row
1]. That is a host defect (§10 item 9): drift and reckoning memory last between a quarter and a half as long as designed
(a maximal drift is pruned after 8 silent weeks instead of about 32).

**4. How it moves between settlements.** It never diffuses: no mechanism copies, averages or spreads lawfulness or
malice from one settlement to another [OBSERVED: the two axes read only the settlement's own constituents and its own
ledger rows, `wp/disposition.js:536-593`]. A settlement changes another's alignment only by acting on its inputs: (a)
**conversion** replaces the convert's patron and so its deity terms (spread is lit by default only in DC and FS); (b)
**occupation** raises the occupier's malice, drags the occupied town's law and may seat an occupation regime; (c)
**deception and raids** book moral drift onto the aggressor (DC/FS on canon; in FS an evil ally's false intel engineers
the unjust march); (d) **sieges and betrayals** weather the victims' leaders. Two inter-settlement pressures move
*adjacent* quantities, not alignment: **trade-normalised tolerance** (what a town will abide, pulled toward its
trade/alliance/patron/vassal partners, mass-weighted, capped ±0.5) and **faith prescription** (a patron-bearing
neighbour pressing a settlement's slave market, debtor's prison, almshouse and the like, at 0.6 × carrier strength,
attenuated by distance on canon). Every channel is a link (relationship edge, faith carrier, belief, occupation record)
or a route; none is proximity alone (§5).

**5. What it drives.** In the default RR preset: generosity (a giver's conscience, its predatory loans, a malicious
debtor's default at malice ≥ 0.6), the reinterpretation of past acts (reframe), the reconstruction skim (malice ≥ 0.55),
and the grain of new urban fabric on the town map; and on a canonized map, caravan caution and appetite, smuggling
boldness, a transit gate's looting conscience and its slave/arcana contraband bans (the slave ban fires only on a
non-catalog good, §6 Trade), refugees' destination culture and route boldness, and named NPC road travellers' route
choice by personality (whose danger weight is inverted, §10 item 28) with an escort whose quality carries the patron's
temper. DC and FS add war appetite, momentum, moral drift and its reckonings, supply-web instrument choice, the atrocity
brake, the captive gate and the patron-pressed peace terms; FS alone adds ally intel styled by malice (an evil sharer
lies) and war sentiment into coups.
**Built dark in every preset**: the one hard alignment gate (only a malicious court may initiate a razing), the
conquest moral discriminator, the war seat's ruler morality, faction-bloc kinship, information-statecraft lies,
espionage and envoy bands; army and fleet route risk by alignment is a seam (the parameter is built, every caller passes
nothing). Full table in §7.

**6. Deity alignment is a second system.** A deity's three-valued good/evil and law/chaos axes drive its temper (with
three-valued axes the derived temper always equals the good/evil axis: evil → warlike, good → peacelike), the
faith × alignment quadrant (keyed on the two *patrons'* good/evil only), institution abolition and founding, the
tolerance baseline, corruption onset and exposure, the peace-term press (which also lengthens an occupation-continuation
term), the will facet of military capacity and the readiness ratchet (so strength and road escorts), the captive gate on
conquest, fidelity noise and the deity stance lane (global and local). It is
FAITH-NOTE's subject; here it appears where it feeds the settlement's alignment (0.35 of the malice drive, 0.3 of the law
drive, 0.35 × piety of the aggression drive).

**7. Who sees it.** Nobody sees the numbers. The DM sees consequences: an aggression chip on Library/Realm cards and in
the premium PDF, abolition and founding headlines naming the patron, "reckons with an unjust war" Chronicle entries, the
ruling-power lens in the power tab. Players hear "a reckoning" in rumours and see the town's built grain [OBSERVED
`comp/settlements/livingWorldSignals.js:143-162`, `:236-262`; `sp/moralDrift.js:301-341`;
`src/domain/display/rumorPhrasePools.js:439-441`].

**How this changes the map view (numbered in §9).** A settlement-alignment lens is possible and would be a *new
disclosure* (DM-only by default): a choropleth of two live scalars over the territory hinterlands, banded at 0.33/0.67.
The real inter-settlement content is *edge-valued* — quadrant postures, culture distance, tolerance pull with its named
causes, moral drift's actor-to-victim reckonings, faith-prescription pressure — so the lens should draw styled links,
not fronts or borders. A time scrub cannot read alignment history because none is kept; only moral drift and tolerance
carry dated memory. And the owner's J382 ruling — territory's culture term reads the host's `cultureDistance` — brings
alignment (0.25 of that distance) and patron axes (0.30) into **territory**: borders become alignment-sensitive and
alignment drifts continuously, so the territory projection must sample culture distance at dated border events (and
the governance half of that distance compares government *labels*, not overlords — §4.2). In a born RR world the lens
would show mostly archetype- and personality-derived variation, but not symmetric variation: the personality tables
score more vices than virtues, so born rosters lean malicious and belligerent (expected malice ≈ 0.55 and an
"Aggressive" chip for most seats in a large roster; a one-scored-NPC hamlet is three times likelier to read malicious than
benevolent) [INFERRED, computed over the host tables, §3.5]. The lens's legend should say so.

---

## §2 The data model

### 2.1 The settlement: three derived coordinates and their bands

| Coordinate | Range, no-signal value | Built by | Display band words |
|---|---|---|---|
| `lawfulness01` | 0..1, exactly 0.5 | `computeLawfulness` [OBSERVED `wp/disposition.js:536-557`] | `lawWordFor`: lawless ≤ 0.33 < balanced < 0.67 ≤ lawful; garbage reads "balanced", never "unknown" [OBSERVED `wp/lawWord.js:50-77`] |
| `malice01` | 0..1, exactly 0.5 | `computeMalice` [OBSERVED `wp/disposition.js:568-593`] | `natureWordFor`: benevolent ≤ 0.33 < balanced < 0.67 ≤ malicious; non-finite reads "unknown" [OBSERVED `wp/conquestDoctrineStage.js:405-417`] |
| `aggressiveness` | multiplier, exactly 1.0 | `computeAggressiveness` [OBSERVED `wp/disposition.js:253-287`] | chip: Belligerent > 1.18, Aggressive > 1.04, Cautious < 0.96, Pacifist < 0.82, none in between [OBSERVED `comp/settlements/livingWorldSignals.js:152-162`] |

The bundle is `settlementAlignment(item, worldState)` [OBSERVED `wp/settlementAlignment.js:44-55`], named by the fold
as the read of record (the spine's older `alignmentOf` citation is retired) [STATED FOLD:319 §3.3.5; SPINE:76-92].
Nothing is persisted: grep of the schema finds no settlement alignment field [OBSERVED·r `src/domain/settlement.schema.js`
grep; only `config.primaryDeitySnapshot` and NPC personality].

**Inputs and their writers** [OBSERVED `wp/disposition.js:105-128`, `:391-435`, `:495-593`]:

| Input | Where | Writer(s) |
|---|---|---|
| NPC personality slots `{dominant, flaw, modifier}` | `settlement.npcs[].personality` | the NPC generator; the DM's edit-npc temperament op (syncs `personality.dominant`) [OBSERVED·r `src/domain/npc/npcOps.js:9-21`] |
| NPC acquired traits | `npc.acquiredTraits[]` (mirror of `spatialLedgers.npcGrowth`) | the growth kernel [OBSERVED `wp/npcGrowthKernel.js:30-39`, `:133-142`] |
| Governing faction (archetype, power share) | `powerStructure` via `governingFactionOf` | generation; faction competition and coups; conquest/occupation |
| Legitimacy | the governance ledger (`legitimacyScore`, read only when `present`) | the legitimacy writers (ruling power, generosity/upswing deltas) [OBSERVED·r] |
| Patron axes | `config.primaryDeitySnapshot.alignmentAxis` / `.lawAxis` | the DM's deity seating; a conversion re-embed; unseating [OBSERVED·r `wp/applyWorldPulse.js:233-243`] |
| War-exhaustion scar | `worldState.warExhaustion[id]` (0..1) | the war layer |
| Occupations | `worldState.occupations` keyed by the occupied id, carrying `occupierId` | conquest/occupation |
| Moral drift | `worldState.spatialLedgers.moralDrift[id]` | `advanceMoralDrift`, its one writer [OBSERVED `wp/pulseKernel.js:2341-2350`] |
| Aggression history | `worldState.dispositionStats[id]` | `advancePulseDisposition` [OBSERVED·r `wp/pulseKernel.js:1652-1657`] |

**Alignment-adjacent per-settlement records** (each owned by its own mover): the tolerance offset
`worldState.institutionTolerance[id] = {cruelty, disorder, causes (≤ 3 names)}` [OBSERVED
`wp/institutionTolerance.js:15-20`, `:172-231`]; the abolition and founding integrators
`worldState.settlementTickStates[id].moralViability` / `.moralFounding = {acc per institution, lastCandidateTick}`
[OBSERVED `wp/moralInstitutionPressure.js:397-408`, `:554-564`]; the urban fabric's chaos grain in
`spatialLedgers.urbanFabric`, mirrored onto `settlement.urbanFabric` [OBSERVED `wp/urbanFabricKernel.js:52-58`,
`:631-637`].

### 2.2 The NPC: five representations, three meanings of temperament

| Representation | What it is | Writer | Lit reader |
|---|---|---|---|
| (a) **Conscience** | the sum of `TRAIT_ALIGNMENT` weights over the authored slots plus acquired traits, clamped to ±1 (+ = good) | — (derived) | settlement malice; corruption disfavour; the faith ruler lens [OBSERVED `wp/disposition.js:391-398`; `data/npcTraitWeights.js:92-136`] |
| (b) **Seeded word** | `npcStates[id].alignment`: one of eight D&D words (lawful_good, neutral_good, lawful_neutral, true_neutral, chaotic_neutral, lawful_evil, neutral_evil, chaotic_evil — no chaotic_good), prefixed `corrupted_` when the NPC is corrupt at seeding | `ensureNpcStates` once, from a seeded fork, when the pulse first sees the NPC [OBSERVED `wp/npcAgency.js:161-170`, `:515-531`] | none lit: war seat books and settlement politics are dark; the AI persona slicer reads it [OBSERVED grep `src/domain/ai/personaSlicer.js:97`] |
| (c) **Declared facet** | `npc.facets.alignment` from the same eight-word bank, set by the DM's edit dropdown, labelled for readers ("Orderly and kindly" …) | the edit-npc op | display; the dark war seat books [OBSERVED·r `src/domain/npc/npcFacetContract.js:12-46`] |
| (d) **Derived chart reading** | a paradigm-axis reading (17 opposed virtue/vice axes, owner-unsigned) | — | none; returns "no claim" while its column is unlanded [OBSERVED·r `src/domain/npc/characterConsumers.js:496-555`; `src/domain/npc/paradigmAxisCatalog.js`] |
| (e) **Trait plane** | a second per-word table, `TRAIT_PLANE`, with *two* signed axes: e (+ evil) and c (+ chaotic); 44 words; its e column is said to mirror (a) sign-flipped but the magnitudes differ (generous is −0.6 here, +0.7 in (a); cruel +0.85 vs −0.9); the c column is the **only personality-derived NPC law axis, and the only lit one** (the seeded and declared D&D words are parsed into a law reading too, but only by the dark war seat books `wp/warSeatBooks.js:270-276` and settlement politics `wp/settlementPolitics.js:1058-1064`, §7 rows 44-45) | — (derived from the authored slots) | lit wherever a deity is seated: the clergy plane (piety bleed-through and legitimacy scandal drag, `wp/religiousContest.js:745`), the cause lifecycle (`wp/causeLifecycle.js:362`, runs once a compromised NPC exists, `wp/pulseKernel.js:1829`), and the NPC ladder's faith coherence (distance from the patron on the e/c plane, `wp/npcLadderCoherence.js:43-53`, read by `wp/npcLadderKernel.js:101`; `npcLadderEnabled` is ONE_REGEN: RR, DC, LR, FS); dark in the envoy chance meetings [OBSERVED `wp/clergyTraitPlane.js:36-96`; importers by grep] |

The disposition and corruption code say outright that they never read the seeded word (b) [OBSERVED
`wp/disposition.js:14-19`, `:112-116`; `src/domain/corruption.js:202`]. So a settlement's law axis has no NPC input at
all, while the faith engine reads an NPC law axis (e) the settlement read ignores [INFERRED from the two tables].

**Vocabulary sizes**: `TRAIT_ALIGNMENT` has 40 words (16 good-leaning, e.g. incorruptible +1, compassionate and merciful
+0.85, principled +0.8; 17 evil-leaning, e.g. cruel and cold-blooded −0.9, ruthless and corrupt −0.85; 7 mild nudges,
e.g. idealistic +0.3, opportunistic −0.3, cynical −0.2); `TRAIT_AGGRESSION` has 36 (15 belligerent, e.g. cruel +0.9,
wrathful +0.8; 13 pacific, e.g. merciful −0.85, diplomatic −0.8; 8 nudges, e.g. zealous +0.4, cautious −0.25) [OBSERVED
`data/npcTraitWeights.js:29-136`].

**"Temperament" at NPC grain means three things**: the dominant *positive* trait, which the NPC bank calls the
temperament and which halves corruption onset ("temperamentSteadiness" 0.5) [OBSERVED `src/domain/corruption.js:171-176`;
OBSERVED·r `src/domain/npc/npcBank.js:121-124`]; momentum's `TRAIT_MOMENTUM` (proud/humble/cautious …), which sets how
hard a court doubles down [OBSERVED `wp/momentum.js:506-564`, `:636-656`]; and generation's three-slot roll (§3.5).

### 2.3 The faction: no alignment of its own, four tables keyed on archetype

Factions carry no alignment field. Their moral and legal character comes from separate tables keyed on the governing
archetype, which disagree by construction [OBSERVED as cited per column]:

| Archetype | Law band (W0) | Malice band (W0) | Aggression baseline | Faith ruler lens align (0 evil … 1 good) / temper | Culture rule-of-law | Ruling power → conscience mod |
|---|---|---|---|---|---|---|
| government | 0.6 | 0 | 0 | 0.6 / 0.5 | 0.9 | council 1.05 |
| civic | 0.6 | 0 | 0 | (other) 0.5 / 0.5 | 0.85 | council 1.05 |
| military | 0.4 | 0 | +0.25 | 0.5 / 0.9 | 0.5 | autocrat 1.0 |
| religious | 0.35 | 0 | 0 | 0.7 / 0.4 | 0.6 | theocracy 1.3 |
| noble | 0.25 | 0 | +0.1 | (other) 0.5 / 0.5 | 0.65 | autocrat 1.0 |
| merchant | 0.15 | 0 | −0.05 | 0.5 / 0.4 | 0.7 | merchant league 0.85 (leverage 1.35) |
| craft | 0.15 | 0 | −0.15 | 0.6 / 0.4 | 0.7 | merchant league 0.85 |
| labor | 0.1 | 0 | −0.15 | (other) 0.5 / 0.5 | 0.6 | council 1.05 |
| arcane | 0.1 | 0 | +0.05 | 0.4 / 0.5 | 0.55 | theocracy 1.3 |
| criminal | −0.7 | 0.6 | +0.1 | 0.15 / 0.7 | 0.1 | criminal 0.7 (leverage 1.4) |
| occupation | −0.35 | 0.45 | +0.25 | 0.35 / 0.95 | 0.3 | autocrat 1.0 |
| outsider / other | 0 | 0 | −0.1 | 0.5 / 0.5 | 0.5 | mixed 1.0 |

Sources: W0 bands `wp/disposition.js:442-456`; aggression baseline = the coup-coercion table minus 1.0 with occupation
and criminal overridden [OBSERVED `wp/disposition.js:71-82`; the per-archetype coercion values OBSERVED·r
`src/domain/rulingPowerCoup.js:36-49`]; faith ruler lens `wp/religionLegitimacy.js:62-72`; culture rule-of-law
`sp/cultureDistance.js:73-87`; ruling power `sp/cohesionWeave.js:161-177`. A religious seat is thus law 0.35 in the
settlement alignment, good 0.7 in the faith lens, rule-of-law 0.6 in culture and conscience × 1.3 in generosity.

**Two different "rulers".** The alignment read and the faith lens use the governing seat (`governingFactionOf`); the
generosity kernel's structural lens and `structuralLensOf` take the *highest-power* faction's category [OBSERVED
`wp/disposition.js:400-410`; `wp/generosityKernel.js:303-313`; `sp/cohesionWeave.js:275-287`]. The faith code records
that the highest-power fallback picks the wrong faction on 66 of 180 freshly generated settlements (36.7%) [STATED
`wp/religionLegitimacy.js:226-238`], so a settlement's alignment and its generosity "ruling power" can describe
different factions (§10 item 7).

### 2.4 The deity: two authored axes, one derived temper

`alignmentAxis` good/neutral/evil → `evil01` 0 / 0.5 / 1; `lawAxis` lawful/neutral/chaotic → `chaos01` 0 / 0.5 / 1;
absent reads neutral [OBSERVED `wp/deityAxes.js:49-73`]. Temper is derived as 0.7 × (evil01 − 0.5) + 0.3 × (chaos01 −
0.5), warlike above +0.15, peacelike below −0.15 [OBSERVED `wp/deityAxes.js:79-102`]. With three-valued axes an evil
deity always scores 0.2–0.5 (warlike), a good one −0.5 to −0.2 (peacelike), a neutral one exactly ±0.15 or 0, which is
not past the dead-band (neutral) [INFERRED from the arithmetic]: **temper is the good/evil axis restated**. An
`authoredTemper` wins where present, but the embed copy does not carry it, so every engine read derives; the stored
`temperamentAxis` is retired and inert [OBSERVED `wp/deityAxes.js:26-42`, `:148-153`]. A deity enters a settlement as
`config.primaryDeitySnapshot` (with `_deityRef`, compared only for identity) [OBSERVED `wp/sacredClaim.js:13-17`,
`:115-123`]. Deities are DM-authored premium content; a born world seats none (FAITH-NOTE §1, §2).

### 2.5 Institutions: the moral and martial lean tables

Morally coded institutions carry a signed lean (cruelty +1 cruel … −1 merciful; disorder +1 chaotic … −1 ordered),
matched against the institution's name, category and tags (first match wins) [OBSERVED `wp/moralMartialLean.js:57-69`, `:100-105`, `:121-128`]:

| Institution (pattern) | cruelty | disorder |
|---|---|---|
| slave market / pen / auction / slaver | 0.9 | −0.4 |
| debtor's prison / debt bond / indenture | 0.6 | −0.6 |
| workhouse / poorhouse / labour camp | 0.5 | −0.5 |
| colosseum / arena / fighting or blood pit / gladiator | 0.55 | 0.85 |
| red-light / brothel district / pleasure district | 0.2 | 0.6 |
| gambling den / hall / house / casino / betting | 0.1 | 0.7 |
| almshouse / poor relief / charity house | −0.7 | −0.2 |
| hospice / infirmary for the poor / leper house | −0.8 | −0.1 |
| sanctuary / refuge house / asylum | −0.6 | −0.1 |

Martial leans (disorder only): armoury/arsenal −0.6, garrison/barracks/standing watch −0.5, town watch/militia −0.2,
war band/raider/mercenary company +0.6 [OBSERVED `wp/moralMartialLean.js:80-85`]. Custom (materialized custom-content)
institutions get no lean from their names [OBSERVED `wp/moralMartialLean.js:121-141`]. The founding catalog's six
lifecycle-only institutions (hospice, almshouse, orphanage, house of healing; debtors' yard, fighting pit) stamp their
lean on the founded instance [OBSERVED `wp/moralInstitutionPressure.js:536-546`; `wp/foundingCatalog.js:53-105`].

**Defect: three founded institutions can never be abolished.** "Orphanage", "House of healing" and "Debtors' yard" match
no name pattern above (the debtor pattern needs "prison"). The abolition loop admits them through the stamped lean
[OBSERVED `wp/moralInstitutionPressure.js:308-310`, via `wp/institutionTolerance.js:104-110`], but the pressure function
reads only the name-matched lean, which is null, so their pressure is exactly 0 from the own patron and from every
prescribing neighbour [OBSERVED `wp/moralInstitutionPressure.js:119-121`]. The conduct plane's lean
(`wp/moralMartialLean.js:150-163`) and the conquest captive gate also read only the name match, while the trade
embargo (`wp/institutionTolerance.js:119-136`) reads the stamped lean. I confirmed by calling the two host lean readers
on the six catalog entries (§12 row 8). Lit with `institutionLifecycleEnabled` (QL, RR, DC, NC, LR, FS) once a deity
is seated: an orphanage founded under a good patron survives conversion to an evil one, and a debtors' yard founded under
an evil patron survives conversion to a good one or a good neighbour's prescription; the embargo still counts them.

### 2.6 The world's "temperament" (a UI bundle, not physics)

Five DM-facing "World's Temper" choices compose existing presets with no new rule key: *A quiet march* → NC, *A steady
realm* → RR, *The long winter* → RR plus seasons, *An age of storms* → DC, *The great game* → FS [OBSERVED
`wp/temperamentPresets.js:32-74`, `:82-84`]. The picker sits on the DM screen behind `isDm` and applies the full preset
rules to the active campaign [OBSERVED `comp/screen/DmScreen.jsx:112`; `comp/temperament/TemperamentPicker.jsx:29-37`].
It matters here only because it decides which alignment consumers can fire, and because the word collides.

### 2.7 Vocabulary collisions (none in the fold's §5 register except one)

- **alignment** also names political bloc alignment (`patron_forces_alignment`, `forced_alignment`, the `realignment`
  peace reason) and the WC "ALIGNMENT LINE", which the fold renamed "the DOC ROW" [OBSERVED·r
  `wp/relationshipRulesCore.js:467-503`, `wp/peaceReasons.js:82`; STATED FOLD:440].
- **temperament** names five things: deity temper, an NPC's dominant positive trait, momentum's `TRAIT_MOMENTUM`, the
  R-6 world-temper presets, and PHASE55's war temperament (= aggressiveness) [STATED·r PHASE55:425-432].
- **the moral ladder** is spelled twice: `natureWordFor` says benevolent/balanced/malicious; the war seat books say
  merciful/balanced/malicious (moved deliberately to its consumers' vocabulary under CR-ES-3) [OBSERVED
  `wp/warSeatBooks.js:302-326`; `wp/conquestDoctrineStage.js:414-417`].
- **conscience** means an NPC's trait score, the generosity term `(0.7·good + 0.3·lawful) × need`, and a transit gate's
  looting restraint `0.6·(1 − malice) + 0.4·law` (§3.4, §6).
- **risk tolerance** means two opposite things. The roads module's per-NPC read (cowardly or paranoid 0.35, cautious
  0.5, default 0.65, bold, prideful or zealous 0.9) means *boldness* [OBSERVED `src/domain/roads/state.js:248-251`,
  `:334-343`]; the settlement read 0.2 + 0.8 × lawfulness means *how fully danger is weighed*, so a lawful mover is the
  careful one [OBSERVED `sp/embattlement.js:307-320`, `:347-357`]. Both are fed into the same route chooser (§10 item 28).
  The fold's erratum FOLD §3.3.3 already records that the design documents spell the court posture reads with the roads
  name [STATED FOLD:317]. The roads read is also a fourth NPC-grain reading of temperament, beside the three §2.2
  lists, and so a sixth use of the word's idea in the host, beside the five above [INFERRED: the code does not call it
  temperament].

---

## §3 The per-settlement picture — formulas, constants, where they live

### 3.1 Malice

Malice = 0.5 + 0.5 · tanh(drive), and exactly 0.5 when the drive is exactly zero [OBSERVED `wp/disposition.js:478-483`].
The drive [OBSERVED `wp/disposition.js:568-593`; weights `:462-476`]:

- **conscience, weight 0.45, entered negated** — the weighted mean, over NPCs whose conscience is non-zero, of each NPC's
  clamped trait sum. Weight per NPC = importance (pillar 1, key 0.82, notable 0.62, any other 0.38) × the governing
  faction's power share (0.5 if no seat) × 1.5 [OBSERVED `:105-110`, `:153`, `:418-435`]. Because the last two factors
  are the same for every NPC they cancel in the mean, so the conscience is in effect an importance-weighted mean
  [INFERRED from the arithmetic; §10 item 3]. NPCs with no scored word are skipped, so a roster with one scored NPC takes
  that NPC's score whole: a roster whose only scored NPC sums to −0.9 (a lone "cruel" flaw) gives conscience −0.9,
  drive +0.405, malice ≈ 0.69, "malicious" [INFERRED].
- **patron evil, weight 0.35** — 2 · evil01 − 1 (−1 good, 0 neutral or absent, +1 evil) [OBSERVED `:577`].
- **regime malice band, weight 0.3** — criminal 0.6, occupation 0.45, all else 0 [OBSERVED `:454-456`].
- **recent acts, weight 0.3** — the minimum of 1 and (war-exhaustion scar + 0.6 × occupations this settlement holds
  as occupier + moral-drift malice) [OBSERVED `:476`, `:583-588`].

### 3.2 Lawfulness

Same squash. The drive [OBSERVED `wp/disposition.js:536-557`; weights `:468-473`]:

- **regime law band, weight 0.45** (table §2.3);
- **patron chaos against law, weight 0.3** — 1 − 2 · chaos01 (+1 lawful, −1 chaotic);
- **legitimacy, weight 0.25** — (legitimacy score − 50) / 50, and 0 when the governance ledger has no record;
- **occupied, weight 0.25** — −1 while this settlement is under an active occupation record;
- **moral drift** — minus 0.6 × the accumulated lawlessness drift [OBSERVED `sp/moralDrift.js:84`].

### 3.3 Aggressiveness (temperament) and war sentiment

Aggressiveness = 1 + 0.5 · tanh(drive), exactly 1.0 at zero drive. Drive = 0.3 × regime coercion baseline (§2.3) + 0.45
× the importance-weighted mean of NPC `TRAIT_AGGRESSION` sums + 0.25 × history + 0.35 × patron temper sign (warlike +1,
peacelike −1) × local piety multiplier [OBSERVED `wp/disposition.js:189-215`, `:253-287`]. History is the ratcheted
win/loss record re-centred, (multiplier − 1)/0.5; when `dispositionChannelsEnabled` is lit (dark everywhere) it reads the
martial channel instead [OBSERVED `:260-274`; `wp/simulationRules.js` FS body declares the key false]. War sentiment =
clamp(personality drive − 1.5 × exhaustion scar, −1, 1) [OBSERVED `:226-243`]. The history ledger caps at a score of 12
and saturates at 8 [OBSERVED `wp/dispositionLedger.js:54-60`]. As lit it is a pure ratchet: with
`dispositionChannelsEnabled` dark (every preset) the writer takes the legacy arm, which adds and clamps with no decay;
the twenty-year (1040-tick) half-life toward neutral belongs only to the dark WR-2 channel stocks [OBSERVED
`wp/dispositionLedger.js:62-66`, `:94`, `:382-421`, `:604-607`; `wp/dispositionChannels.js:38-52`].

### 3.4 Ranges and thresholds

Reachable ranges [INFERRED from the weights; tanh values computed]:

| Situation | Lawfulness | Malice |
|---|---|---|
| no deity, no deeds | 0.244 (criminal seat, legitimacy 0) … 0.739 (government seat, legitimacy 100) | 0.289 (all-good roster) … 0.779 (all-evil roster, criminal seat) |
| no deity, full deeds | down to ≈ 0.06 (adds occupied −0.25 and drift −0.6) | up to 0.865 (acts term saturated) |
| with a seated deity | up to 0.838 (lawful patron); down to ≈ 0.03 (chaotic patron, criminal, illegitimate, occupied, full drift) | 0.168 (good patron, good roster) … 0.928 (evil patron, evil roster, criminal, saturated acts) |

A "malicious" band (≥ 0.67) needs a drive ≥ 0.354; "benevolent" (≤ 0.33) needs ≤ −0.354. Both are reachable without a
deity [INFERRED].

Thresholds the consumers apply to these axes:

| Consumer | Threshold | Source |
|---|---|---|
| transit gate bans slaves | gate malice < 0.4 **or** lawfulness > 0.6 — but only for a good the slave pattern recognises, and the goods catalog has none (§6 Trade) | [OBSERVED `sp/smuggle.js:87-98`, `:114-116`, `:143-148`, `:164-180`] |
| transit gate bans unsanctioned arcana | gate lawfulness > 0.6 | same |
| any listed good banned by culture | culture distance (gate, origin) ≥ 0.5 slaves, 0.55 military, 0.6 arcane | same |
| ally intel deceives / garbles | sharer malice > 0.6 / lawfulness < 0.4 | [OBSERVED `wp/beliefMap.js:948-966`, `:988-1036`] |
| debtor defaults on matured credit | malice ≥ 0.6 (or solvency < 0.45) | [OBSERVED `sp/generosityReactions.js:72-74`, `:438-450`] |
| reconstruction skim stamped | malice ≥ 0.55 and allied rebuild funds flowed | [OBSERVED `wp/upswingKernel.js:113`, `:536-552`] |
| giver lends instead of giving | leverage = 2 · (0.5 − good) × lend appetite × lens leverage ≥ 0.6 | [OBSERVED `wp/generosityKernel.js:392-407`; `sp/generosityEV.js:88`, `:443`, `:536`] |
| razing initiation (dark) | malice ≥ 0.67 | [OBSERVED `wp/razing.js:209-224`, `:395-408`] |
| new urban fabric planned vs greedy | fabric drift < 0.5 (i.e. lawfulness > 0.5 in the long run) | [OBSERVED `tm/siteGenesis.js:360-370`] |
| moral drift reckoning | accumulated malice drift crosses 0.3 on a rising tick | [OBSERVED `sp/moralDrift.js:80`, `:236-243`] |

### 3.5 Generation

Generation draws a positive, a negative and a neutral trait for each NPC and then one seeded roll keeps both dominant
and flaw 40% of the time, the flaw only 30%, the dominant only 20%, neither 10% [OBSERVED·r `data/npcData.js:1671-1676`;
`src/generators/npcGenerator.js:323-345`]. The governing archetype and the factions' power come from power-structure
generation; legitimacy from the governance ledger. No deity is seated (the generated latent pantheon was deleted)
[OBSERVED·r `wp/latentPantheon.js:6-12`; STATED FOLD:351]. So at birth a settlement's alignment is archetype plus
roster plus legitimacy.

**The roster is biased, not symmetric.** The generator's word lists hold 45 positive, 30 negative and 30 neutral words
[OBSERVED `data/npcData.js:77` and following]. The conscience table scores 16 of the 45 virtues, 17 of the 30 flaws and 7
of the 30 neutrals; the aggression table 13, 15 and 8 [computed by me with node over the host tables, §12 row 3]. Under
the 40/30/20/10 slot roll the exact expectation per NPC is a conscience of −0.144 and an aggression of +0.165 (the aggression sum is not clamped, `wp/disposition.js:132-139`; only the conscience sum is, `:397` [Fable-reviewed 2026-10-18: an earlier text applied the clamp to both and read +0.162]); only 63%
(conscience) and 60% (aggression) of NPCs score at all, and among those the means are −0.227 and +0.272 [INFERRED,
computed]. Consequences for a born world with no deity and no deeds [INFERRED from §3.1 and §3.3 arithmetic]:

- a large roster's expected malice is about 0.55 — inside "balanced", but skewed toward the malicious edge;
- a hamlet with one scored NPC reads "malicious" with probability 0.15 and "benevolent" with 0.05 (the lone NPC's score
  must pass ±0.787);
- the expected aggressiveness for a large roster is about 1.06 for a government, civic or religious seat, 1.05 merchant,
  1.045 outsider, 1.075 noble or criminal, 1.10 military, and 1.038 craft or labour — so every seat type but craft and
  labour sits past the "Aggressive" chip line (> 1.04) on expectation, wherever the chip row opens.

### 3.6 Drift — rates and writers

| Mover | Effect on the axes | Rate / constant | Gate (where it can happen) |
|---|---|---|---|
| **Moral drift** (one writer) | malice "acts" term; law drag × 0.6 | per instigation: malice = 0.12 × (0.35 + 1.15 · LG) × (0.5 + 0.6 · innocence) × (1.4 if the true relation was allied, trade partner, patron, client or vassal); LG = actor law × (1 − actor malice); innocence = (1 − victim malice) × (1 − victim strength); lawlessness = 0.7 × malice; summed per actor per tick; capped at 1; designed to decay × 0.92 per silent tick (half-life ≈ 8.3 weeks) but, as built, the stored already-decayed value is multiplied again by 0.92^(ticks since the last act) on every tick the kernel runs, so after n silent ticks the factor is 0.92^(n(n+1)/2): half-life ≈ 3.6 ticks, a 0.28 maximum gone by the 8th; pruned when both < 0.02 | §5 channel 3; status §7 rows 20-22; defect §10 item 9 [OBSERVED `sp/moralDrift.js:48-85`, `:111`, `:145-269`, esp. `:218-224`, `:251-254`; measured: 0.2772 → 0.255, 0.216, 0.168, 0.120, 0.079, 0.048, 0.027, pruned] |
| War exhaustion | acts term | the war layer's 0..1 scar | war layer |
| Occupation held | acts term +0.6 per holding (two saturate) | — | war layer |
| Being occupied | law −0.25 drive; an occupation regime adds law band −0.35, malice band +0.45 | — | war layer |
| Regime change | both bands (§2.3) | coups, faction competition, conquest | `factionCompetitionEnabled` (off in QL and SC), war layer |
| Legitimacy | law ±0.25 | the legitimacy writers | widely |
| NPC growth traits | cautious: aggression −0.25 only; tenacious: neither table; cynical (betrayal): conscience −0.2, aggression +0.15; proud (boom, flourishing): aggression +0.15 | deposits by calamity, bust, siege, survived siege, reconstruction, betrayal, boom [OBSERVED `wp/npcGrowthKernel.js:133-142`; `data/npcTraitWeights.js`] | `npcGrowthEnabled` (RR, DC, LR, FS) |
| Patron change | malice ±0.35; law ±0.3; aggression ±0.35 × piety | DM seat; conversion; unseating | spread DC/FS (or DM gate); unseating RR, DC, LR, FS |
| DM temperament edit | conscience/aggression via `personality.dominant` | immediate | any |

**Corruption is not an input.** The selector's header says alignment drifts "as corruption … move[s] its inputs", but
neither axis reads corruption; it can only act through legitimacy or a regime change [OBSERVED
`wp/settlementAlignment.js:17-19` vs `wp/disposition.js:536-593`; INFERRED route].

### 3.7 The faith side of the same settlement (alignment-adjacent, deity-driven)

- **Tolerance** — the leniency a settlement applies when judging institutions: baseline = patron conviction (2·evil01 −
  1 on cruelty, 2·chaos01 − 1 on disorder; 0,0 with no patron), plus a trade-drifted offset capped ±0.5 [OBSERVED
  `wp/institutionTolerance.js:77-99`]. The offset feeds **founding** and the **embargo**, not abolition (§5 channel 5).
- **Abolition** — per standing morally coded institution, pressure = −(lean.cruelty × patron cruelty conviction) ×
  moral bleed − 0.85 × (lean.disorder × patron disorder conviction) × law bleed, clamped ±1, plus each reaching foreign
  patron's pressure at 0.6 × reach strength on both bleeds; the integrator rises by at most 0.12 × pressure per tick and
  falls 0.05 when pressure is not positive; at 0.6 it emits one closure candidate per settlement, cooldown 4 ticks,
  severity 0.4 + 0.4 × integrator, probability 0.25 + 0.5 × integrator [OBSERVED `wp/moralInstitutionPressure.js:44-79`,
  `:119-134`, `:176-181`, `:275-411`]. Martial institutions lapse with 0.9 × peace × (1 − readiness) − 0.9 × readiness.
- **Founding** — fit = clamp01(lean.cruelty × effective tolerance on cruelty × moral bleed + 0.85 × lean.disorder ×
  tolerance on disorder × law bleed); integrator +0.015 × fit per tick (≈ 67 ticks ≈ 1.3 years for fit 0.6), at 0.6
  arms a candidate with cooldown 8, severity 0.34 + 0.3 × integrator, probability (0.2 + 0.3 × integrator) × a season
  weight when seasons are lit [OBSERVED `wp/moralInstitutionPressure.js:52-63`, `:207-226`, `:454-567`].
- **The faith conduct plane** — a *third* derivation of settlement character, private to the faith engine: conduct
  evil01 = (1 − ruler-lens align) × a government weight + rot × a compromise weight + institution and martial structure;
  conduct chaos01 likewise from the government's law affinity; the patron's fit with conduct moves legitimacy and piety
  [OBSERVED `wp/religionLegitimacy.js:212-240`, `:420-462`]. It does not read `computeMalice`.

### 3.8 What a born RR settlement looks like

No deity, omniscient information, no war layer: alignment = regime bands + roster conscience + legitimacy; aggression =
coercion baseline + roster aggression (history empty), both skewed by the roster tables toward malice and belligerence
(§3.5). Moral drift cannot start except by a DM-lit war layer's raids on
a canonized map (§5). Every pair of settlements reads `respectable_rival` in generosity (§4.2). The lit consumers are
generosity, reframe, the skim, the town fabric, and on canon caravans, smuggling and migration (§7).

---

## §4 The realm picture

### 4.1 No aggregate

There is no realm or regional alignment, no prevalence, no "moral climate" ledger and no display of one [OBSERVED: the
two axes' readers in `src/` are per-settlement or per-pair; grep of `comp/`, `src/pdf`, `src/display`, `src/store` finds
no reader of `malice01`, `lawfulness01`, `computeMalice`, `computeLawfulness` or `settlementAlignment`]. Realm effects are
pairwise reads or emergent.

### 4.2 Pairwise fields that exist as pure reads

- **Culture distance** (0 identical … 1 distant) = 0.30 × faith (half |Δ evil01| + half |Δ chaos01| of the two patrons)
  + 0.25 × alignment (half |Δ lawfulness| + half |Δ malice|) + 0.18 × economy (|Δ economic capacity/100|) + 0.27 ×
  governance (0.6 × regime-axes gap + 0.4 × "different `governingName` strings"), then multiplied by (1 − 0.25 × trade
  tie) and (1 − 0.2 × shared tradition motifs) [OBSERVED `sp/cultureDistance.js:41-60`, `:165-199`]. Trade-tie strengths:
  trade partner 1, allied 0.7, vassal 0.6, patron 0.6, read only for the *direct* edge between the two (migration's call;
  the contraband call passes no tie) [OBSERVED `wp/migrationKernel.js:197`, `:228-230`; `wp/supplyKernel.js:753-756`].
  The culture vector is rebuilt live from current state on every read, never from the frozen digest [OBSERVED
  `wp/migrationKernel.js:148-175`]. The patron axes enter twice — in the faith term and inside the alignment term (0.35 of
  malice, 0.3 of law) [INFERRED].
  - **The "same overlord" term compares government labels.** The design comment calls it "same sovereign/overlord"
    [STATED `sp/cultureDistance.js:20-22`], but `governingName` is the governing faction's name, which generation draws
    from a small closed list of government types ("Elder Council" for most low-priority thorps, hamlets and villages,
    "Town Council", "Town Mayor", "Merchant Council" …) and which "doubles as the government type" [OBSERVED
    `src/generators/power/rulingStructure.js:251-290`, `:783-792`]. The only other writer is a transfer of power, which
    writes a government-type label for the winning faction's archetype and the settlement's tier, or its alternate label when a roster name contains the preferred one [OBSERVED `src/domain/rulingPower.js:214-217`, `:433-459`, `:517`, `:665`; Fable-reviewed 2026-10-18: AV-2 — an earlier text said "the new faction's name"]. So two unrelated settlements with the same
    government label read identity 0 (about 0.108 closer), a vassal does not share its overlord's name, and nothing in
    the host models an overlord here [INFERRED from the writers; how often labels coincide was not measured].
  - **Tradition kinship is driven by deity presence, not deity alignment.** Kinship compares the motif *elements* of the
    two towns' active traditions [OBSERVED `sp/cultureDistance.js:120-130`; `wp/migrationKernel.js:133-145`]. Genesis
    reads the patron's evil and chaos, but only to weight the *act* (a contest under an evil or chaotic patron, an
    offering under a good and lawful one); element weights read only whether a deity is present [OBSERVED
    `src/domain/traditions/genesis.js:168-183`, `:194-199`, `:224-236`]. So deity seating is a second, weak
    deity-to-culture route; alignment is not. `traditionsEnabled` is ONE_REGEN (RR, DC, LR, FS).
- **The faith × alignment quadrant** — same patron (identical `_deityRef`) × kindred (kinship ≥ 0.5) gives brothers,
  schism axis, respectable rival or natural enemy, each with {bond, conscience, gate} modulators: 1.3/1.15/1.25,
  0.85/1.2/0.95, 1.0/0.95/1.0, 0.7/0.75/0.55 [OBSERVED `sp/cohesionWeave.js:41-96`]. Every shipped caller computes
  kinship as 1 − |evil01(patron A) − evil01(patron B)| — the patrons' good/evil only [OBSERVED `wp/sacredClaim.js:115-123`;
  `wp/generosityKernel.js:325-336`]. Consequences [INFERRED from the arithmetic]: kinship takes only 1, 0.5 or 0; only a
  good patron against an evil one is "opposite"; two settlements with the same patron carry the same immutable axes, so
  **schism_axis is unreachable**; and a pair with no deities reads kindred and not-same, i.e. respectable rival. The
  sacred-claim module guards against that last case; generosity does not (§10 item 5).
- **Cross-pressure mediation** — a third settlement is torn when its ties to the two belligerents are both "close"
  (brothers or respectable rival) and one is faith-led (same patron) while the other is not [OBSERVED
  `sp/cohesionWeave.js:110-125`]. The mediator must be a regional-graph neighbour of both [OBSERVED·r
  `wp/peaceTermsGraph.js:103-112`].
- **Deity stance** — evil strikes everyone (0.40 + 0.10 tilt against less-evil targets, +0.15 × chaos raid), good
  strikes only evil (0.55), good cooperates on good ground (0.55), evil's banding is transactional and capped at 0.52;
  betrayal hazard rises with chaos for evil sources; durability tracks the least lawful party [OBSERVED
  `wp/deityStance.js:53-173`]. Only betrayal and cooperation are consumed (the stance lane, DC and FS); aggression and
  durability are deferred, owner-gated [STATED `wp/deityStance.js:164-172`]. The same module also has a **local lane on
  the law axis**: the law sign of a deity (lawful +1, chaotic −1, neutral 0) and a method clash (1 only for a lawful
  against a chaotic deity). Two uses are local and lit wherever law-authored deities are present, in any preset: the
  clash raises the legitimacy floor at which a patron becomes contestable by a rival faith (+0.12 × clash), and the law
  sign shifts the patron's fit with the government's mandate (±0.12) [OBSERVED `wp/deityStance.js:35-39`, `:69-72`,
  `:94-113`; `wp/religionState.js:544-553`, `:739-749`; `wp/religionLegitimacy.js:160-166`]. The third, receptivity
  resistance against a second creed (0.35 × clash inside the incumbent's counter-force), is read in every present creed's
  share advance — step 3b runs for every present, non-suppressed deity in every religion-active settlement with no spread
  gate, the patron as the mood — so it fires wherever a patron and a second creed (a DM-imposed cult or an entrant) are
  present, in any preset; spread adds only the entrant lane and the occupation pull [OBSERVED
  `wp/religiousContest.js:237-246`, `:514`, `:520-530`, `:733-734`, `:768-794`, `:780`, `:796-805`; `wp/religionState.js:164-201`
  (imposed cults seeded beside the patron); Fable-reviewed 2026-10-18: AV-8 — an earlier text read it as spread-gated].
- **Leader kinship** (dark) — 1 − mean |Δ| over law and good parsed from the two leaders' seeded words [OBSERVED
  `wp/settlementPolitics.js:1038-1075`].

### 4.3 Emergent realm patterns the code supports

- **Trade normalises leniency toward the big partner**: weights are partner faith-mass ÷ own, clamped 0.12–4, so a
  hamlet beside a metropolis reaches the ±0.5 cap in about 0.6 years and the metropolis barely moves in decades
  [STATED `wp/institutionTolerance.js:31-38`].
- **Coalitions of light against a fractious darkness** fall out of the stance asymmetry [STATED `wp/deityStance.js:11-23`;
  PHASE4:734-746 per a reader]; consumed only as betrayal and cooperation news in DC/FS.
- **A torn neighbour brokers peace** (DC, FS; RR/LR if the DM lights war).
- **Spirals and reckonings**: repeated unjust wars outrun the decay; silence restores conscience (DC/FS on canon) —
  far faster than designed, because the decay compounds (half-life about 3.6 weeks instead of 8.3; a maximal drift is
  gone in 8 weeks instead of about 32; §10 item 9).

### 4.4 Where this sits in the FP status of record

The fold's status table has no alignment program; requirement 13 is a constitutional obligation every wave must name
(each mechanism names its alignment READ or declares alignment-empty with a reason; the WRITE side moves constituents
through existing writers only) [STATED SPINE:76-92; FOLD:319, :440]. The default preset's "one lit chain" — a pact
proposed and answered, and a patron's fall that is vacuous on born worlds — does not involve alignment [STATED FOLD:351].
In RR, alignment is felt only through the non-FP consumers of §7.

---

## §5 Movement between settlements — every channel

Alignment itself is never transferred. The table lists every channel by which one settlement changes another's
alignment *inputs* (channels 1–4, 7) or an alignment-adjacent quantity (5, 6), and §5.2 lists where alignment shapes a
flow without moving.

### 5.1 Channels

| # | Channel | What moves | Rate | Route / link | Travel time | Gate (code) | Season | Capacity | Status |
|---|---|---|---|---|---|---|---|---|---|
| 1 | **Conversion** (patron replaced by spread) | the convert's deity terms: malice ±0.35, law ±0.3, aggression ±0.35 × piety, plus tolerance baseline, quadrant, abolition/founding conviction | the spread lane's share steps and patron contest (FAITH-NOTE §6) | faith carriers: allied/trade/patron/vassal edges, war-front, military-protection, political-authority channels | none in the contest (a parked ripple carries hop-weeks) | `faithSpreadEnabled` | none in the contest | per-settlement share step | DC, FS; any preset via the Living-World "Faith spread" gate [OBSERVED·r `wp/applyWorldPulse.js:233-243`; FAITH-NOTE §6] |
| 2 | **Occupation** | occupier: malice acts +0.6 per holding; occupied: law −0.25 drive, possibly an occupation regime (law −0.35 band, malice +0.45 band, aggression +0.25) | immediate while the record stands | the war layer's sieges and conquests over regional edges | army march over the digest when canonized (not alignment's own read) | `warLayerEnabled` | — | two holdings saturate the acts term | DC, FS; any via the "War layer" gate [OBSERVED `wp/disposition.js:449-456`, `:491-515`, `:549`, `:586`] |
| 3 | **Unjust instigation → moral drift** (onto the aggressor) | aggressor's malice and lawlessness drift | §3.6 constants | (a) a strategy march whose misjudgment includes "relationship" (believed hostile, truly not); (b) a supply-web raid on a supplier village | beliefs are stale because news is priced by road distance (0.5 × hop-weeks per hop) [STATED FP-PHYS §2.1 row D9] | (a) beliefs (canon ∧ infoMode ≠ omniscient) ∧ `settlementStrategyEnabled`; (b) `warLayerEnabled` ∧ `supplyWebWarfareEnabled` ∧ a digest | none | sums per actor per tick, cap 1 | (a) DC, FS on canon; (b) DC, FS on canon, and RR/LR on canon with the DM "War layer" gate [OBSERVED `wp/pulseKernel.js:2286-2350`; `wp/beliefMap.js:204-209`; `wp/supplyWebWarfare.js:255-260`, `:307-315`] |
| 3b | **Deception** (FS) | a malicious ally (malice > 0.6) relays false high-confidence "hostile and mobilising" intel about a non-hostile subject; a receiver that marches on it commits channel 3(a) | — | believed-ally relations (vetted confidence ≥ 0.5) | belief cadence | `allyIntelSharingEnabled` ∧ beliefs | — | — | FS on canon (RR carries the flag but is omniscient) [OBSERVED `wp/beliefMap.js:948-1050`; `wp/pulseKernel.js:2154-2165`] |
| 4 | **Weathering by siege and betrayal** | the victim's leaders gain cautious/tenacious/cynical (only cynical moves conscience, −0.2) | growth deposits (loudness 0.5–0.6) | the event's parties | — | `npcGrowthEnabled` | — | — | RR, DC, LR, FS [OBSERVED `wp/npcGrowthKernel.js:133-142`] |
| 5 | **Trade-normalised tolerance** (not alignment) | the tolerance offset (cruelty, disorder) | 0.002 × Σ(mass weight × (partner effective tolerance − own)) per tick, step cap 0.03, offset cap ±0.5; relaxes at the same rate with no partners | regional edges typed trade_partner, allied/ally, patron, vassal — both directions, no distance term | none | `institutionLifecycleEnabled` (and non-zero only if some party has a patron) | — | the caps | QL, RR, DC, NC, LR, FS [OBSERVED `wp/institutionTolerance.js:30-61`, `:138-231`; `wp/pulseKernel.js:1803-1813`] |
| 6 | **Faith prescribes** (not alignment) | abolition pressure on the target's morally coded institutions | each reaching patron at 0.6 × σ, σ = carrier strength × distance weight × mass ratio | faith carriers out of every patron-bearing settlement, to every carrier-linked neighbour | none | `institutionLifecycleEnabled`; not spread-gated | — | — | QL, RR, DC, NC, LR, FS; distance-attenuated only on canon [OBSERVED `wp/religiousContest.js:355-384`; `wp/pulseKernel.js:1475-1481`; `wp/moralInstitutionPressure.js:283-321`] |
| 7 | **People** | NPC circulation and replacement would carry conscience traits; replacement biases by a settlement alignment field nobody writes | — | — | — | `npcConsequencesEnabled` (declared false in FS, absent elsewhere) | — | — | BUILT DARK [OBSERVED `wp/npcReplacement.js:155-190`; OBSERVED·r `wp/npcCirculation*.js`] |

Two notes on the table. Channel 6's reach map is keyed by *every* settlement a patron-bearing neighbour's carriers
reach, not only converts as the comments say; a neighbour with the same patron presses twice [OBSERVED
`wp/religiousContest.js:361-384` vs the "converts" wording at `wp/moralInstitutionPressure.js:74-78`]. Migration moves
population counts, not NPCs, so it does not move alignment [INFERRED from `wp/migrationKernel.js:418-517`].

**Conquest does not close culture distance through governance identity.** The culture module's header says a conquest
that flips the conquered town's `governingName` to the victor's draws it toward the victor's culture [STATED
`sp/cultureDistance.js:20-22`]; the code never does that. A conquest installs a non-governing "‹occupier
name› occupation authority" faction and crowns it; the transfer writes the occupation archetype's government label as the town's `governingName`, which — because the occupier's own name contains "Occupation Authority" — is the alternate "Martial Administration" [OBSERVED
`wp/warDeployment.js:856-858`; `wp/applyWorldPulse.js:165-187`; `wp/applyWorldPulseOccupationAuthority.js:162-174`; `src/domain/rulingPower.js:178-187`, `:433-459`, `:517`, `:665`; confirmed by running `installOccupationAuthority` + `transferRulingPower` read-only; Fable-reviewed 2026-10-18: AV-2 — an earlier text said the occupier string itself was written], and a victor's own
`governingName` is a government label such as "Town Council" (§4.2), so the two never match and the identity term stays
1 [OBSERVED `sp/cultureDistance.js:183-186`]; but every occupied town carries the same "Martial Administration", so two towns under any occupation read identity 0 with each other, about 0.108 closer [Fable-reviewed 2026-10-18: AV-2]. If the two towns happened to share a label before the conquest, the
conquest *raises* their distance by about 0.108 [INFERRED]. The header is stale; an earlier draft of this note repeated
it. Conquest does move culture distance through its other terms: the occupation regime changes the regime-axes gap and
both towns' alignment (channel 2).

### 5.2 Where alignment shapes a flow without moving

| Flow | Alignment's role | Geometry | Gate |
|---|---|---|---|
| Grain relief and loans | giver conscience (0.7·good + 0.3·law) × need, weight 0.20; quadrant and ruling-power modulators; leverage → loan; debtor malice ≥ 0.6 → default | partner graph; route risk on the withhold side | `constructiveFlowsEnabled` [OBSERVED `sp/generosityEV.js:47-53`, `:210-217`, `:426-545`] |
| Refuge postures | the same give-side blend decides whether a host opens refuge | graph | same [OBSERVED `wp/generosityKernel.js:383-423`] |
| Caravans | origin caution = 0.2 + 0.8 × law weighs believed destination danger; appetite baseline = 1.0 + 0.6 × merchant strength − 0.4 × (2·law − 1), within 0.3–2.0 | per origin→destination over the digest; route choice itself uses a constant tolerance 0.6 | `commodityFlowEnabled` ∧ canon [OBSERVED `sp/embattlement.js:95-110`, `:304-320`; `sp/dispatchEV.js:111-116`, `:238-244`; `wp/supplyKernel.js:81`, `:258`, `:451`, `:615-680`] |
| Smuggling and gates | boldness from (inverse) caution; the worst transit gate's conscience 0.6·(1 − malice) + 0.4·law; contraband by the gate's alignment and its culture distance to the origin | the route's worst gate at arrival | same [OBSERVED `wp/supplyKernel.js:687-760`; `sp/smuggle.js:87-180`] |
| Refugees | destination culture affinity (alignment 0.25 of distance); origin's risk tolerance 0.2 + 0.8 × law into route choice | the 8 nearest reachable mapped settlements by frozen path cost with the season; danger-weighted route | canon ∧ emigration (§7 row 19) [OBSERVED `wp/migrationKernel.js:148-230`, `:463-483`] |
| Supply-web war | instrument fit by malice/law lean; atrocity brake = gain × bloody share × (0.35 + 0.65 × LG) × (0.4 + 0.6 × mean victim innocence) | target's supplier villages, fragile first, then highest supply share, then cheapest route (`wp/supplyWebWarfare.js:857-864`) | `warLayerEnabled` ∧ `supplyWebWarfareEnabled` ∧ digest [OBSERVED `wp/supplyWebWarfare.js:442-480`, `:818-862`] |
| Armies and fleets | designed: lawful read danger true, chaotic take the cheap dangerous road | would be route choice over the digest | SEAM: every production caller passes no alignment, so tolerance is the neutral 0.6 [OBSERVED `sp/armyTransit.js:568-578`, `:690-697`; `wp/armyTransitKernel.js:714`, `:901`; OBSERVED·r `sp/navalLayer.js:363-379`, `wp/navalKernel.js:346-350`] |
| Named NPC road travellers | the traveller's personality words set a risk tolerance (§2.7) used twice: a dispatch refusal when believed danger exceeds 2 × tolerance (a coward stays home sooner), and the danger weight in route choice — where the same number makes the *bold* traveller weigh danger most (inverted, §10 item 28); the escort's quality includes home readiness and military capacity, both moved by the patron's temper (§6 War) | the believed view of the digest; the outbound and return routes over the frozen candidates, with the season | `roadsEnabled` (ONE_REGEN) ∧ canon: RR, DC, LR, FS [OBSERVED `src/domain/roads/state.js:248-253`, `:334-343`, `:347-366`; `wp/roadsKernel.js:344-351`, `:1008-1032`; `sp/embattlement.js:347-357`, `:407-423`] |
| Conquest captives | the victor's patron conscience decides whether captives may feed its slave market: a good patron's abolition read on a slave-market lean must stay under the abolition floor; a deity-free victor is permitted wherever it has a (name-matched) slave market | from the conquered to the victor's market, as a decaying prosperity pulse | war layer (DC, FS; D+) [OBSERVED `wp/conquestFeeds.js:100-150`; `wp/pulseKernel.js:1752`] |

---

## §6 Couplings with the rest of the simulator

**War.** Aggressiveness scales every settlement's candidate war and hostility events when the war layer is lit; with
it off a history-only factor map is used [OBSERVED `wp/pulseKernel.js:1500-1512`]. It also sets the mobilisation ramp
(≈ 0.3 reluctant … ≈ 2.5 fervent, with economy and legitimacy) and mobilisation reactions, under the war layer
[OBSERVED `wp/mobilization.js:192-204`; OBSERVED·r `wp/mobilizationReactions.js:279`], and the strategy chooser's
softmax [OBSERVED·r `wp/settlementStrategy.js:1136-1150`]. War sentiment shifts the coup hold chance in FS
[OBSERVED `wp/coup.js:89-105`]. Momentum: a lawful court's public acts bind harder (deposit scale 1 + 0.6 × (2·law − 1))
and its climb-down is cheaper (procedural relief 0.5 × max(0, 2·law − 1), price floor 0.15) [OBSERVED
`wp/momentum.js:582-595`, `:740-815`, `:1046-1066`]; the price is charged on a sue-for-peace recall of a past-the-cliff
war course [OBSERVED `wp/momentum.js:1240-1270`] and by a DM realm verb [OBSERVED `wp/realmVerbExecution.js:740-752`].
The "good court hears the dead" door is built with no consumer, owner-gated [STATED `wp/momentum.js:796-815`]. Dark:
razing initiation, the conquest moral discriminator (wanted = 0.4 martial + 0.25 history + 0.2 own malice + 0.15 patron
malice; a good realm conquers only a believed-malicious rival) [OBSERVED·r `wp/conquestIntent.js:82-238`], the war seat
books' ruler morality [OBSERVED·r `wp/warSeatBooks.js:269-361`].

**Strength.** The settlement's own two axes never enter military strength, but the *patron's* good/evil does, as
temper. In the structured capacity model the will facet (weight 0.08 of six) gains 8 points under a warlike patron and
loses 6 under a peacelike one — about +0.6 and −0.5 on the 0–100 capacity scale [OBSERVED
`wp/militaryStrength.js:75-82`, `:253-285`]. (The facet's government-label term, +14 for a martial label and −10 for a
merchant or monastic one, is regime, not alignment.) The model's header still says it is mounted nowhere, which is
stale: the occupation model, the war capacity reads, trade salience, the occupation-conversion force, road escort
quality, and the War Resolve and army-strength displays all call it [OBSERVED `wp/militaryStrength.js:21-22`; importers
`wp/occupation.js:561`, `:1188`, `wp/warCapacityReads.js:184`, `wp/tradeSalience.js:174`, `wp/religiousContest.js:220`,
`wp/roadsKernel.js:1031`, `src/domain/display/warResolve.js:256`, `src/domain/display/armyStrength.js:64`, and the irregular-force share `wp/irregularForce.js:55` (dark: `irregularForceEnabled` is lit in no preset, `wp/simulationRules.js:633`) — eight modules, as §10 item 31 counts]. The patron's
temper also drives the **readiness ratchet** through the piety megaphone (composite piety above 1): a warlike patron
speeds accrual and slows the peace decay (×0.6 of the megaphone), a peacelike one speeds the decay (×1.2) [OBSERVED
`wp/martialReadiness.js:89-93`, `:136-141`, `:198-212`, `:505-521`]. It runs wherever a deity is present (the religion
subsystem, any preset), but readiness only exists after a war footing [OBSERVED `wp/pulseKernel.js:1321`, `:1723-1745`;
`wp/subsystemActivation.js:42-48`]. Readiness feeds road escort quality and the martial-institution lapse (§3.7).

**Peace.** The victor's term budget is pressed by its *patron's* evil coordinate: 0.6 + 0.8 × evil01 [OBSERVED
`wp/peaceTermsAppraisal.js:86-104`; `wp/peaceTermsCatalog.js:30-31`]. The press scales each drafted term's magnitude
(capped at ×1.5) and its requested duration in years (base years × the margin curve × press, within the term's ceiling
and the budget) [OBSERVED `wp/peaceTermsDrafting.js:30-52`; `wp/treatyClock.js:48-59`]. The territorial
term is **occupation_continuation** (base 3 years, ceiling 6), drafted from the loser's territory asset; while it lives
it stands in for the garrison's presence and forbids the occupation's collapse exit [OBSERVED
`wp/peaceTermsCatalog.js:194`, `:410`; `wp/treatyEnforcement.js:140-153`; `wp/occupation.js:1248-1255`]. So an
evil-patron victor holds occupied ground longer (press 1.4 against 0.6 for a good patron, 1.0 with no deity). Peace
engine: war ∧ `peaceEngineEnabled` (WAVES) — DC, FS; D+ in RR and LR. The quadrant feeds the treaty mint's mediator,
the mediation peace reason and the generalised broker, and the sacred_claim war reason (schism 0.75, natural enemy
0.60) and common_rite peace reason (brothers 0.80, rival 0.45), each × the observer's patron security (0.5 if
unpublished), both towns needing a patron [OBSERVED `wp/sacredClaim.js:39-49`, `:67-84`, `:151-225`].

**Trade.** Caravans, smuggling and contraband (§5.2). The conscience embargo: a buyer's effective tolerance against a
supplier's worst standing institution; abhorrence below 0.15 does nothing, else the supplier's claim × clamp(1 − 0.4 ×
abhorrence, 0.15, 1), applied last [OBSERVED `wp/institutionTolerance.js:112-136`; `wp/tradeWar.js:337-346`,
`:405-418`]; it lives inside the trade-war contest, which runs only under the war layer [OBSERVED
`wp/tradeWar.js:324-346`]. Separately, in relationship-candidate generation, a warlike supplier deity lowers the bar for
a critical trade tie to collapse into an embargo (+0.12 to the tension drive; a warlike dependent +0.06; peacelike
deities subtract the same) [OBSERVED `wp/relationshipRulesAdversarial.js:552-598`, the trade-leverage candidate]. That
candidate needs the trade-salience map, which the pulse builds only under the war layer [OBSERVED
`wp/pulseKernel.js:1520-1532`]. Both are therefore war-gated, by different routes.

**The slave contraband ban is a seam in practice.** The canonical goods catalog has no slave good; arms and military
services are category military, arcane reagents, alchemical goods and arcane services category arcane [OBSERVED
`src/domain/region/goodsCatalog.js:130-245`]. An unknown label normalises to a custom good of category "other" [OBSERVED
`:466-475`]. The slave category is assigned only when the good's id or category matches the slave word pattern (slave,
captive, chattel, thrall, bondsman, serf trade), which the smuggling module itself calls the extensible seam for a
category the catalog lacks [OBSERVED `sp/smuggle.js:114-116`, `:133-148`]. I checked by calling the host's normaliser and
classifier: "Undeclared slaves" and "Enslaved captives" — the criminal demand profile's labels for steppe and norse
cultures [OBSERVED `src/generators/demandProfile.js:97`, `:94`] — classify as slaves; "Stolen mail and weapons" is not
military. Whether those demand-profile imports ever ride a commodity flow was not traced. So "this gate bans slave
cargo" describes a rule that can fire only on such custom labels; the military and arcane bans have real catalog goods.

**Generosity and prosperity.** §5.2. Prosperity is another seat's subject; the touchpoints are: generosity sales step
prosperity, the skim reads malice when rebuild funds flowed, corruption onset reads prosperity beside the deity ×
conscience multiplier, inverse prosperity is one of five chaos-receptivity terms in conversion (0.20), and migration's
and culture's "economy" read the causal economic-capacity score, not the prosperity label [OBSERVED·r
`wp/npcAgency.js:762`, `:818`; `wp/religiousContest.js:150-203`; OBSERVED `wp/migrationKernel.js:161`]. PHASE4 says a
devout town "pays for its conscience in prosperity" when it abolishes profitable institutions; no direct prosperity debit
exists in the abolition code [STATED·r PHASE4:1109-1110; OBSERVED `wp/moralInstitutionPressure.js:275-411`].

**Faith.** Deity axes → settlement alignment (§3); institutions, tolerance, founding (§3.7); conduct plane; corruption:
an evil patron multiplies an evil-leaning NPC's corruption *onset* by 1 + 0.4 × (−conscience), a good patron multiplies
*exposure* likewise, never both; a lawful/chaotic patron shifts law and order by ±8 and corruption tolerance by ±0.15
[OBSERVED `src/domain/corruption.js:184-196`, `:236-300`]. Fidelity noise: a chaotic devout patron (pull = max(0, 2 ·
chaos01 − 1) × local piety × law megaphone, needing a piety record) makes decisions on noisy estimates — error 0.35 ×
pull^1.6, capped 0.6, total with strategic rust 0.75 [OBSERVED `wp/fidelityNoise.js:38-106`] — at the war initiation
and sue-for-peace sites (war layer) and, re-checked, at the **development ranking** of resource chains, which runs
wherever resource drift runs (all presets but SC) [OBSERVED `wp/tierResourceDynamics.js:470-491`, `:618-644`;
`wp/pulseKernel.js:1425-1430`; `wp/warSiegeVerdict.js:252-255`]. It reads the patron only; settlement lawfulness never
enters, although PHASE55 designs alignment as the distortion style [STATED·r PHASE55:583-605, :1475-1478].
Magic: a *major* patron tightens the settlement's magic legality one band, and a warlike or evil major patron (the same
thing under three-valued axes) two bands and makes the magic attitude openly hostile, overriding the faction balance
[OBSERVED `src/domain/magicProfile.js:167-176`, `:259-272`, `:499-522`]. This is a derivation read only by display and
grounding code (the dossier, the PDF, force-composition display, deity-effects display, AI grounding), with no engine
consumer; lit wherever a major deity is seated [OBSERVED importers by grep]. The clergy and NPC trait plane (§2.2 (e))
and the deity stance's local law lane (§4.2) are the other faith-side readers of NPC and deity law.

**Information.** Ally-intel styling (§5 channel 3b). Information-statecraft lies read malice and law (dark)
[OBSERVED `wp/pulseKernel.js:2231-2256`]. The built belief record has readiness, strength band, alliance label, faith
label and confidence — **no alignment field**, although PHASE55 designs one [OBSERVED `wp/beliefMap.js:991-1036`;
STATED PHASE55:1296-1298]. So there is no believed alignment anywhere lit; the only believed moral read is the dark
conquest lane's "what faith the court believes the rival worships", resolved to a nature [OBSERVED·r
`wp/conquestDoctrineStage.js:449-484`].

**Politics.** The ruling-power lens sets generosity weights and decision hysteresis (council widens it × 1.4)
[OBSERVED `sp/cohesionWeave.js:161-168`]; its economic-base half has never varied (every settlement reads "mixed")
[STATED `sp/cohesionWeave.js:258-269`]. Faction-bloc formation by leader kinship is dark (`settlementPoliticsEnabled`
lit nowhere) [OBSERVED `wp/simulationRules.js:425`; FOLD:343 per a reader].

**Populations.** Migration destination culture and route boldness (§5.2). Population levies move constituents and so
the derived axes only through the existing roster writers (a design rule) [STATED WARCONV:2315-2345 §6].

**Town map.** The urban fabric's chaos grain integrates toward 1 − lawfulness with a 104-week half-life (a new record
starts on target), behind `urbanFabricEnabled` [OBSERVED half-life `wp/urbanFabricKernel.js:247`; drift target and
integration `:629-637`; dormancy gate `:155-162`]. The v2 town layout reads it:
below 0.5 a district's reconciliation move is small and ordered (14 × (0.4 + 0.6 × stock), capped 16, and a fortify-
doctrine town refuses a waterfront/trade attractor), at or above 0.5 a larger greedy grab (30 × (0.4 + 0.6 × stock))
toward the nearest latent site advantage [OBSERVED `tm/siteGenesis.js:343-407`; `tm/townLayoutV2.js:291`, `:614`]. The
v2 law applies to settlements carrying the `layoutLawVersion: 2` marker, which four save sites mint on every newly saved
settlement [OBSERVED `tm/townMapModel.js:341-354`; `tm/mapEdits.js:118-134`; STATED `src/store/operationRegistry.js:318-333`];
the model feeds the town scene manifest, interiors and the spatial substrate [OBSERVED importers of `townMapModel.js`].
The cartography morphology ("order" from the drift) is dark (`townCartographyEnabled` false); the 3D building grammar's
patron alignment is hard-coded 0.5 and its "moral" reads a settlement field nothing writes [OBSERVED
`src/domain/townScene/buildingProfiles.js:271`, `:335-338`].

**Display.** The aggression chip (Belligerent/Aggressive/Cautious/Pacifist) on settlement cards and the premium PDF,
shown only once the card's live-world row opens (war, weariness, standing or a deity) [OBSERVED
`comp/settlements/livingWorldSignals.js:236-262`; `src/pdf/lib/liveWorld.js:89-91`, `:204-206`, `:318`]. The realm War
Resolve panel shows patron alignment and temper [OBSERVED·r `src/domain/display/warResolve.js:150-185`, `:339`].
Abolition/founding headlines name the patron and the offence ("the seat will no longer abide its cruelty"), routed to
a DM proposal when the rules require it and severity ≥ 0.78 [OBSERVED `wp/moralInstitutionPressure.js:247-261`,
`:352-391`, `:518-550`]. Reckoning news is regional, notable, tagged betrayal for a former friend, routed to the Herald's
events channel; players hear "a reckoning" [OBSERVED `sp/moralDrift.js:301-341`; `src/domain/realm/heraldRouting.js:358`;
`src/domain/display/rumorPhrasePools.js:439-441`].

---

## §7 Status by mechanism and preset (checked in code at `81f1cd96`)

Legend: ✓ runs; – does not; **c** runs on a canonized realm only; **D+** dark by preset but lightable per campaign by a
premium DM through the Living-World gates ("War layer", "Faith spread", "Map geography" canonize) [OBSERVED
`comp/settlements/LivingWorldGates.jsx:1-74`, `:117-225`]. The row has a fourth gate, "Relationship drift"
(`relationshipDynamicsEnabled`, on by default and in every preset but SC), and the War layer checkbox is disabled while
drift is off [OBSERVED `comp/settlements/LivingWorldGates.jsx:56-61`, `:236`, `:246`, `:285`;
`wp/simulationRules.js:68`, `:970`]. So every **D+** cell for a war-gated row in the SC column means two DM steps: light
Relationship drift, then the War layer. The DM can also re-apply a whole preset (NC, RR, RR +
seasons, DC, FS) through the World's Temper picker (§2.6). "deity" = also needs a seated patron (data). Preset bodies
re-checked (`wp/simulationRules.js:863-1222`; spreads `:692-802`): RR adds disasters, `commodityFlowEnabled`, `allyIntelSharingEnabled`, FP_LIT_ALIVE, WAVES, ONE_REGEN; DC adds
war, strategy, faith spread, seasons, `infoMode: perfect_delayed`, all three FP_LIT sets, WAVES, ONE_REGEN, *not*
commodity flow or ally intel; LR adds seasons, `perfect_delayed`, FP_LIT_ALIVE/BELIEF, WAVES, ONE_REGEN, no war; FS adds
war, strategy, faith spread, the eight war sub-flags (incl. `warDispositionEnabled`), seasons, `infoMode: full`,
commodity flow, ally intel, all FP_LIT sets, WAVES, ONE_REGEN, and declares `warTerminationEnabled`,
`dispositionChannelsEnabled`, `coalitionLedgerEnabled`, `envoyDiplomacyEnabled`, `npcConsequencesEnabled`,
`demographicsEnabled`, `townCartographyEnabled` false; QL and NC carry the QUIET set (`propagationMode: local`,
`migrationFlowsEnabled: false`) and none of WAVES/ONE_REGEN; SC turns off NPC agency, institution lifecycle,
population and resource dynamics [OBSERVED `wp/simulationRules.js` preset body and spreads `WAVES`, `ONE_REGEN`,
`FP_LIT_*`, `QUIET`, `OPEN`].

| # | Mechanism | Gate in code | QL | RR | DC | SC | NC | LR | FS | Class |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Derived settlement alignment (the read) | none | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | LIT substrate |
| 2 | Aggression chip (cards, PDF) | none; row opens on live-world state | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | LIT UI |
| 3 | Aggression, history-only factor | none (empty ledger ⇒ 1.0) | ✓ | ✓ | – | ✓ | ✓ | ✓ | – | LIT (inert until contests) |
| 4 | Aggression live blend into war candidates (incl. deity temper) | `warLayerEnabled` | D+ | D+ | ✓ | D+ | D+ | D+ | ✓ | LIT 2 |
| 5 | Mobilisation ramp/reactions by aggression | war layer | D+ | D+ | ✓ | D+ | D+ | D+ | ✓ | LIT 2 |
| 6 | Strategy chooser softmax by aggression | `settlementStrategyEnabled` | – | – | ✓ | – | – | – | ✓ | LIT 2 |
| 7 | War sentiment → coup hold | `warDispositionEnabled` | – | – | – | – | – | – | ✓ | LIT 1 |
| 8 | Generosity conscience, leverage/loans, quadrant, ruling-power lens | `constructiveFlowsEnabled` (WAVES) | – | ✓ | ✓ | – | – | ✓ | ✓ | LIT 4 |
| 9 | Credit default by debtor malice ≥ 0.6 | same | – | ✓ | ✓ | – | – | ✓ | ✓ | LIT 4 |
| 10 | Good giver's charity to non-bonded neighbours | hard-coded off at the call | – | – | – | – | – | – | – | SEAM [OBSERVED `wp/generosityKernel.js:725`] |
| 11 | Triage by lawfulness | no caller | – | – | – | – | – | – | – | SEAM [OBSERVED grep] |
| 12 | Reframe by observer malice/benignity | `reframeEnabled` (ONE_REGEN) | – | ✓ | ✓ | – | – | ✓ | ✓ | LIT 4 [OBSERVED gate `wp/reframeKernel.js:78-81`; malice weights and lean `:150-188`; per-observer malice read `:378-382`; call site `wp/warReasons.js:738-764`] |
| 13 | Reconstruction skim | `upswingArcsEnabled` (WAVES) | – | ✓ | ✓ | – | – | ✓ | ✓ | LIT 4 |
| 14 | Urban fabric chaos grain → v2 town layout | `urbanFabricEnabled` (ONE_REGEN) + v2 marker | – | ✓ | ✓ | – | – | ✓ | ✓ | LIT 4 |
| 15 | Town cartography "order" | `townCartographyEnabled` | – | – | – | – | – | – | – | BUILT DARK |
| 16 | 3D building patron alignment / moral | none wired | – | – | – | – | – | – | – | SEAM |
| 17 | Caravan caution and appetite baseline | `commodityFlowEnabled` ∧ canon | – | c | – | – | – | – | c | LIT 2 on canon |
| 18 | Smuggling boldness; gate conscience; contraband by gate alignment and culture | same | – | c | – | – | – | – | c | LIT 2 on canon |
| 19 | Migration culture affinity and route risk | canon ∧ (emigration with `migrationFlowsEnabled` and propagation not off/local; or calamity; or terminal death) | – | c | c | – | – | c | c | LIT 4 on canon (re-checked: QL/NC off) [OBSERVED `wp/populationDynamics.js:449-470`; `sp/migration.js:165-179`] |
| 20 | Moral drift from a misjudged march | beliefs ∧ strategy | – | – | c | – | – | – | c | LIT 2 on canon |
| 21 | Moral drift from web-war raids | war ∧ `supplyWebWarfareEnabled` ∧ digest | – | D+c | c | – | – | D+c | c | LIT 2 on canon (+ DM) |
| 22 | Moral drift decay and reckoning news | kernel entry: beliefs ∨ atrocities this tick | – | D+c (raid ticks only) | c | – | – | c (decay; entries need DM-lit war raids) | c | decay compounds wherever it runs (host defect); RR freezes between raid ticks — §10 item 9 |
| 23 | Supply-web instrument fit and atrocity brake | as 21 | – | D+c | c | – | – | D+c | c | LIT 2 on canon (+ DM) |
| 24 | Momentum deposit scale and procedural relief | `momentumEnabled` (WAVES) ∧ beliefs | – | – | c | – | – | c | c | LIT 3 on canon (war climb-down needs war: DC, FS) |
| 25 | Momentum humanitarian evidence door | no consumer | – | – | – | – | – | – | – | SEAM |
| 26 | Ally-intel styling by sharer malice/law | `allyIntelSharingEnabled` ∧ beliefs | – | – | – | – | – | – | c | LIT 1 on canon |
| 27 | Information-statecraft lies | `infoStatecraftEnabled` | – | – | – | – | – | – | – | BUILT DARK |
| 28 | sacred_claim / common_rite (quadrant) | faith spread ∧ war ∧ peace engine ∧ both patrons | – | D+ (war+faith) | ✓ | – | – | D+ (war+faith) | ✓ | LIT 2 (deity) |
| 29 | Cross-pressure mediator (treaty mint, peace reason) / generalised broker | war ∧ peace engine / + `mediationGeneralizedEnabled` | – | D+ / – | ✓ / ✓ | – | – | D+ / – | ✓ / ✓ | LIT 2 (deity) |
| 30 | Peace-term press by victor's patron evil (magnitude and duration, incl. occupation_continuation's hold) | war ∧ peace engine | – | D+ | ✓ | – | – | D+ | ✓ | LIT 2 (deity) [OBSERVED `wp/peaceTermsDrafting.js:30-52`; `wp/treatyEnforcement.js:140-153`] |
| 31 | Conscience embargo (tolerance vs supplier institution) | war layer | D+ | D+ | ✓ | D+ | D+ | D+ | ✓ | LIT 2 (deity somewhere) |
| 32 | Warlike supplier deity lowers embargo bar (relationship candidate, not the trade-war contest) | war layer (the trade-salience map) | D+ | D+ | ✓ | D+ | D+ | D+ | ✓ | LIT 2 (deity) [OBSERVED `wp/relationshipRulesAdversarial.js:552-598`; `wp/pulseKernel.js:1520-1532`] |
| 33 | Institution tolerance drift | `institutionLifecycleEnabled` | ✓ | ✓ | ✓ | – | ✓ | ✓ | ✓ | LIT 6 (deity somewhere) |
| 34 | Moral abolition, own seat and prescription | same | ✓ | ✓ | ✓ | – | ✓ | ✓ | ✓ | LIT 6 (deity); attenuation on canon; never fires for founded orphanages, houses of healing and debtors' yards (§2.5 defect) |
| 35 | Moral founding; its season weight | same; `seasonsEnabled` | ✓;– | ✓;– | ✓;✓ | – | ✓;– | ✓;✓ | ✓;✓ | LIT 6 (deity) |
| 36 | Martial lapse | same | ✓ | ✓ | ✓ | – | ✓ | ✓ | ✓ | LIT 6 (deity) |
| 37 | Faith conduct plane (legitimacy, piety) | deity presence | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | LIT 7 (deity) |
| 38 | Corruption onset/exposure by patron × conscience; law swing | `npcAgencyEnabled` | ✓ | ✓ | ✓ | – | ✓ | ✓ | ✓ | LIT 6 (deity) |
| 39 | Corruption temperament steadiness | `npcAgencyEnabled` | ✓ | ✓ | ✓ | – | ✓ | ✓ | ✓ | LIT 6 |
| 40 | Fidelity noise: war decisions / development ranking | war layer, strategy / `resourceDriftEnabled` | – / ✓ | – / ✓ | ✓ / ✓ | – / – | – / ✓ | – / ✓ | ✓ / ✓ | LIT (chaotic devout patron); re-checked |
| 41 | Deity stance lane (betrayal, cooperation) | faith spread | D+ | D+ | ✓ | D+ | D+ | D+ | ✓ | LIT 2 (deity) |
| 42 | NPC growth traits into conscience/aggression | `npcGrowthEnabled` (ONE_REGEN) | – | ✓ | ✓ | – | – | ✓ | ✓ | LIT 4 |
| 43 | Seeded NPC alignment word (written) | `npcAgencyEnabled` | ✓ | ✓ | ✓ | – | ✓ | ✓ | ✓ | written; no lit engine reader |
| 44 | War seat books ruler morality | `warTerminationEnabled` / coalition / envoy | – | – | – | – | – | – | – | BUILT DARK |
| 45 | Settlement politics leader kinship | `settlementPoliticsEnabled` | – | – | – | – | – | – | – | BUILT DARK |
| 46 | Razing initiation (malicious only) and witness bands | eight flags incl. `conquestDoctrineEnabled` | – | – | – | – | – | – | – | BUILT DARK [OBSERVED `wp/conquestDoctrineStage.js:63-72`, `:133-140`] |
| 47 | Conquest moral discriminator | same | – | – | – | – | – | – | – | BUILT DARK |
| 48 | Sovereignty-sale judgment; espionage; envoy chance meetings | their flags | – | – | – | – | – | – | – | BUILT DARK |
| 49 | NPC replacement alignment lean; circulation faction refusal | `npcConsequencesEnabled` | – | – | – | – | – | – | – | BUILT DARK + SEAM |
| 50 | Army and fleet route risk by alignment | — (no caller passes it) | – | – | – | – | – | – | – | SEAM |
| 51 | Settlement-alignment fidelity style; belief-record alignment; drift toward the manipulator; WEAVE §A trade posture and §D ladder; WC character drift; TR-6 moral pricing; WARCONV CV/TB/XW alignment weights; law-band curve values | — | – | – | – | – | – | – | – | DESIGNED ONLY [STATED as cited in §10; OBSERVED `wp/lawBandModulation.js:1-60` no values] |
| 52 | World's Temper picker | `isDm` | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | LIT UI |
| 53 | Living-World gates (Relationship drift, War layer, Faith spread) and canonize | premium (`canManageCampaigns`) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | LIT UI |
| 54 | Patron temper → will facet of military capacity, in the war strength reads (occupation, war capacity, trade salience, occupier conversion force) | war layer | D+ | D+ | ✓ | D+ | D+ | D+ | ✓ | LIT 2 (deity) [OBSERVED `wp/militaryStrength.js:253-285`] |
| 55 | Patron temper → readiness ratchet (accrual and peace decay through the piety megaphone) | deity present (religion subsystem); moves only after a war footing | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | LIT 7 (deity), inert without war records [OBSERVED `wp/martialReadiness.js:198-212`, `:505-521`; `wp/pulseKernel.js:1723-1745`] |
| 56 | Road escort quality (capacity incl. temper, readiness) and NPC route choice and refusal by personality | `roadsEnabled` (ONE_REGEN) ∧ canon | – | c | c | – | – | c | c | LIT 4 on canon; route danger weight inverted (§10 item 28) [OBSERVED `wp/roadsKernel.js:344-351`, `:1008-1032`] |
| 57 | Captive gate (victor's patron conscience × slave market) | war layer | D+ | D+ | ✓ | D+ | D+ | D+ | ✓ | LIT 2 (deity-free victor permitted) [OBSERVED `wp/conquestFeeds.js:118-150`; `wp/pulseKernel.js:1752`] |
| 58 | NPC trait plane (e, c) → clergy piety bleed and legitimacy drag; cause lifecycle; / NPC ladder faith coherence | deity present / + `npcLadderEnabled` (ONE_REGEN) | ✓ / – | ✓ / ✓ | ✓ / ✓ | ✓ / – | ✓ / – | ✓ / ✓ | ✓ / ✓ | LIT 7 / LIT 4 (deity); cause lifecycle needs a compromised NPC (none in SC, where NPC agency is off) [OBSERVED `wp/clergyTraitPlane.js:47-96`; `wp/religiousContest.js:745`; `wp/causeLifecycle.js:362`; `wp/npcLadderCoherence.js:43-53`] |
| 59 | Deity stance local law lane: contest floor and mandate fit / receptivity resistance | deity present / + a second creed present (a DM-imposed cult or an entrant) | ✓ / ✓ | ✓ / ✓ | ✓ / ✓ | ✓ / ✓ | ✓ / ✓ | ✓ / ✓ | ✓ / ✓ | LIT 7 / LIT 7 (law-authored deities; a second creed present) [OBSERVED `wp/religionState.js:544-553`, `:739-749`; `wp/religiousContest.js:237-246`, `:514`, `:796-805`; Fable-reviewed 2026-10-18: AV-8 — the receptivity half read D+ before] |
| 60 | Magic legality and attitude by a warlike/evil major patron | none (display derivation) | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | LIT UI (major deity) [OBSERVED `src/domain/magicProfile.js:167-176`, `:259-272`] |

**The birth caveat** [OBSERVED `wp/simulationRules.js:20-31`, `:1552-1558`]: `NEW_CAMPAIGN_SIMULATION_PRESET_ID` is `null`,
so a campaign born through `newCampaignSimulationRules` gets plain normalized defaults with none of the virtual keys
(WAVES, ONE_REGEN, `commodityFlowEnabled` …) until a preset's rules are applied; preset identity is inferred from the
boolean defaults only, so such a campaign still reads as RR. "LIT in RR" (rows 8–14, 17–19, 42) is true of the preset
table, not of every born campaign (FAITH-NOTE §8 notes the same for faith). An instant world applies RR as its fallback
tone [STATED FAITH-NOTE §8, from a seat's read of `src/lib/instantWorld/composeInstantWorld.js:417-419`].

**Against the FP status of record** (FOLD §2): alignment is not a row; the rows this table touches agree — FAITH's
`faithUnseatingEnabled` in four presets (patron changes by unseating), INTERIOR's `settlementPoliticsEnabled` lit nowhere,
POP's `demographicsEnabled` lit nowhere (which is one of the conquest doctrine's eight prerequisites), WC built only as
its WC-0 substrate (vocabularies, column union, law-band shape, flags, ledger shape; no writer) and otherwise unbuilt (WC-1..WC-16), its alignment join slider and character drift designed only [STATED FOLD:346; Fable-reviewed 2026-10-18: AV-9 — an earlier text said "entirely unbuilt"].

---

## §8 Map touchpoints — today, and what a lens needs and could add

### 8.1 What alignment reads, or could show, in geometry today

| Touchpoint | What is read | Where | Gate |
|---|---|---|---|
| **Distance / travel time** | route choice over the frozen digest's cached candidates, effective cost = seasonal base cost + tolerance × 1.5 × median hop cost × Σ embattlement (+ tolls), with the season; tolerance = 0.2 + 0.8 × lawfulness for refugees (a lawful mover weighs danger most, §2.7 [Fable-reviewed 2026-10-18: AV-3 — an earlier text wrote (1 − tolerance)]) | `sp/embattlement.js:304-330`, `:347-357`, `:407-423`; `wp/migrationKernel.js:463-474` | canon |
| **Candidate pool** | the 8 nearest reachable mapped settlements by frozen path cost and season; closeness by distance weight | `wp/migrationKernel.js:469-474`, `:215-230` | canon |
| **Routes and gates** | the *worst transit gate* on a caravan's route decides contraband (gate alignment, gate culture vs origin) and seizure take (gate conscience); caravan caution weighs believed destination danger | `wp/supplyKernel.js:440-500`, `:687-760`; `sp/smuggle.js:87-180` | commodity flow ∧ canon (RR, FS) |
| **Distance attenuation** | faith prescription σ × distance weight (floor 0.35; 1.0 for unmapped endpoints) | `wp/religiousContest.js:361-384`; `sp/distanceRead.js:851-863` | canon |
| **Supplier villages** | supply-web stages ordered fragile first, then highest supply share, then cheapest route | `wp/supplyWebWarfare.js:857-864` | war ∧ web war ∧ digest |
| **Adjacency (graph, not geometry)** | tolerance partners; faith carriers; the mediator must neighbour both belligerents; moral drift's former-friend multiplier reads the true relation label; migration trade tie and hostility | `wp/institutionTolerance.js:138-161`; `wp/peaceTermsGraph.js` per a reader; `sp/moralDrift.js:111` | as rows |
| **The frozen digest** | never read by the two axes themselves; its canon marker switches on beliefs (and so moral drift, momentum, ally intel), commodity flow and migration | `wp/beliefMap.js:204-209`; `sp/commodityFlow.js:165-177`; `sp/migration.js:165-179` | — |
| **Seasons** | route choices and path cost take the season; founding's emission weight | `wp/migrationKernel.js:217-222`; `wp/moralInstitutionPressure.js:509-517` | seasons (DC, LR, FS) for founding |
| **Territory** | no border or sovereignty read uses the settlement axes. Two patron-alignment touchpoints exist: the peace press lengthens an occupation_continuation term, which holds the occupied ground (an evil-patron victor holds longer, §6 Peace); and patron temper enters military capacity (next row). The culture identity term compares government labels, not overlords, and conquest never closes it (§4.2, §5.1) | `wp/peaceTermsDrafting.js:30-52`; `wp/treatyEnforcement.js:140-153`; `sp/cultureDistance.js:183-186` | war ∧ peace engine (DC, FS; D+ RR, LR) |
| **Strength and enforcement** | patron temper: will facet +8 warlike / −6 peacelike (weight 0.08) in capacity, and the readiness ratchet; settlement malice and law never enter | `wp/militaryStrength.js:253-285`; `wp/martialReadiness.js:198-212` | war reads: war layer; escort: roads ∧ canon |
| **Occupation** | the records the territory reading treats as claim points move both axes (§5 channel 2) | `wp/disposition.js:491-515` | war |
| **Named travellers' routes** | personality risk tolerance into route choice (inverted danger weight) and dispatch refusal over the believed digest view, with the season; the frozen escort | `wp/roadsKernel.js:1008-1032`; `src/domain/roads/state.js:334-343` | roads ∧ canon (RR, DC, LR, FS) |
| **World map overlays** | none: the War & faith overlay draws deployments, sieges, occupation, trade-war prizes, mobilisation; patron alignment/temper is in the War Resolve panel only | FAITH-NOTE §9.1; OBSERVED·r `comp/map/WarFaithMapOverlay.jsx:1-40` | — |
| **Town map** | v2 layout's reconciliation style from the fabric drift (lit RR, DC, LR, FS); cartography order dark; 3D statuary inert | §6 Town map | — |

Two of the host's laws bind any lens here. The **frozen-versus-live law**: geometry is frozen at canonize while
governance, culture, faith and embattlement are live reads, sampled at the hop tick and baked into the moving packet,
never recomputed on read [STATED PHASE55:1197-1201 via FP-PHYS §5]. And **danger is relative to the mover** — trade,
armies, refugees, smugglers and couriers prefer different routes over the same geometry [STATED PHASE55:834-848,
:1380-1389 via FP-PHYS]. Alignment is exactly one of those live reads and one of those mover preferences.

### 8.2 What an alignment lens needs from the host (read-only host facts)

| Fact | Where | Audience note |
|---|---|---|
| The two axes and aggressiveness per settlement, recomputed from the snapshot at a pulse | `settlementAlignment(item, worldState)` — call the host's selector, never reimplement | DM truth; folds NPC personalities, regime, unjust-war drift — not public |
| Bands | `lawWordFor`, `natureWordFor`, the chip bands | the band words are the host's own vocabulary |
| The constituents (for a "why" panel) | archetype, the scored NPCs and their words, legitimacy, patron axes, exhaustion, occupations, drift | DM truth |
| Moral drift records | `spatialLedgers.moralDrift[id]` {malice, lawlessness, instigations, sinceTick, lastTick}; reckoning news names actor and victim and the tick | ledger DM; reckoning rumours public |
| Tolerance offsets and their causes | `worldState.institutionTolerance[id]` (≤ 3 partner names; no tick) | DM |
| Abolition/founding arcs | `settlementTickStates[id].moralViability/.moralFounding`; candidates and headlines with ticks | headlines public once applied |
| Pair reads | `cultureDistance`, `faithAlignmentQuadrant`, `crossPressureMediation`, `buildFaithReach` (pure functions) | DM |
| Gate character | per settlement, from the axes: bans slaves / arcana; conscience | DM (a player "sees" a seizure only as a receipt) |
| Fabric drift | `settlement.urbanFabric.drift` via `fabricDriftOf` | built form is visible; whether the mirror survives the player projection was not traced |
| Which consumers are live | the campaign's *resolved* rules (not the preset id) and the canon marker | — |

### 8.3 What a lens could add without inventing host facts [INFERRED]

1. **A choropleth of the two axes** over the territory hinterlands (the J380 reuse rule), as a two-dimensional colour
   (law × malice) with the 0.33/0.67 bands, and the aggression band as a glyph.
2. **Edge layers**: quadrant postures (meaningful only with seated deities), culture-distance shading, tolerance pull
   arrows (partner → settlement, labelled with the host's cause names), moral-drift actor → victim arcs from reckoning
   news, faith-prescription pressure recomputed with the host's pure reach function.
3. **Gate character along routes** (RR/FS on canon): which settlements' gates ban slave or arcana cargo and how much
   they take on seizure — settlement-grain facts drawn at the gate. A "bans slave cargo" glyph would show a rule that
   fires only on custom slave-labelled goods (the catalog has none, §6 Trade); label it as a standing law, not traffic.
4. **A "why" card** listing the scored NPCs, the seat, the patron and the deeds behind a settlement's reading.
5. **A dated cause track** for the time scrub: patron changes, occupation start/end, coups, reckonings, abolitions and
   foundings — the host-dated events that move or reflect alignment.

What a lens must not do: show derived alignment to players; present a believed alignment (none exists in built
beliefs); draw armies' or fleets' alignment-shaped routes (a seam); imply alignment flows between neighbours.

---

## §9 How this changes the map module's current readings

### 9.1 Territory (J377, J378, and J382)

1. **J382(a) brings alignment into territory.** The territory projection's culture term now reads the host's
   `cultureDistance`, which is 0.30 patron axes + 0.25 settlement alignment + 0.18 economy + 0.27 governance (whose
   identity half compares government labels, item 6), closed by direct trade ties and shared traditions (§4.2). At the time of this reading (before J382 was applied) V13 §3.9's `foreignCulture` term was categorical (1 when a cell's culture id
   differed from the seed's) [OBSERVED then at `docs/volumes/V13-world.md:1360-1372`; Fable-reviewed 2026-10-18: AV-16 — the term is gone; V13 §3.9 W8 (now `:1792`) reads the host's culture distance between the seed seat and the owning seat, banded in fifths, in its plain form (V13:675, :824, :1114, :1824-1833; J382 (a), J384 (2)), so the proposal below has been adopted in that form]. To read the host term it has to become a
   continuous cost keyed on the *pair of seats* — the seed and the cell's owner at the previous pass — because the host
   has no per-cell culture. Proposal: step cost `1 + … + costVector.foreignCulture × cultureDistance(seed seat, owning
   seat)`.
2. **Alignment drifts continuously; borders may not.** J377 rules that borders move only on dated events with
   hysteresis. Culture distance is a live read that moves whenever legitimacy, a roster or a moral-drift record moves,
   and it is never stored. The projection must therefore *sample* culture distance (and so alignment) at the dated
   border event and keep the sample — the host's own frozen-versus-live law (§8.1) — never recompute it on read.
3. **Occupation moves borders and alignment together.** The occupation records J377 treats as claim points also raise
   the occupier's malice (+0.6 per holding), drag the occupied town's law and may seat an occupation regime (§5 channel
   2). Conquest does *not* close culture distance through the identity term (the stale host comment says it does; §5.1);
   it moves culture distance only through the regime gap and the two towns' alignment. A peace that cedes the occupation
   (occupation_continuation) holds the ground for a term whose length the victor's patron presses: up to 6 years, longer
   for an evil patron (§6 Peace). The territory and alignment lenses should share the occupation event, and the term's
   expiry, as dated causes.
4. **Military enforcement (J378): the settlement axes do not enter strength; the patron's good/evil does.** Aggressiveness
   scales how often war and hostility candidates arise and how fast a town mobilises, not its strength [OBSERVED
   `wp/pulseKernel.js:1512`; `wp/mobilization.js:201-204`]. But a seated patron's temper — under three-valued axes, its
   good/evil — shifts the will facet of the host's capacity model (about +0.6 / −0.5 on 0–100) and the readiness
   ratchet, which feed occupation, the war capacity reads and road escort quality (§6 War). If the contested-march
   tie-breaker reads the host's capacity, it inherits that small deity term; it should not add the settlement axes.
5. **Patrols (J378) can borrow the host's gate character.** The host already decides, per transit gate, whether slaves
   or arcana are contraband and how much a seizure takes (§3.4); a patrol layer may display that as the enforcing
   power's character on its route segments — but the host judges at the route's *worst gate* (settlement grain), not per
   segment, only in RR and FS on canon, and the slave ban fires only on custom slave-labelled goods (§6 Trade). A road
   escort's quality is the other host fact a patrol legend could cite (§5.2).
6. **No vassal-chain closing in culture distance.** Nothing makes a vassal share its overlord's `governingName` (the only
   writers are generation's government label and a power transfer, §4.2), so the identity term gives no realm-wide
   closing. In the host's migration call a *direct* vassal or patron edge closes the distance by up to 15% through the trade-tie multiplier (tie 0.6
   × 0.25), and only for that linked pair, not along a chain [OBSERVED `wp/migrationKernel.js:197`, `:228-230`;
   `sp/cultureDistance.js:193-198`]; the territory term reads the PLAIN form, with no trade tie, so not even that closing enters it [Fable-reviewed 2026-10-18: J384 (2), V13:824, :1824-1833 — this item was written before J384]. Under J382 a chain's inner towns therefore resist each other's territory as much as
   strangers of the same character. What the identity term does do is make towns with the *same government label* read
   about 0.108 closer — a tier-clustered effect (most small villages share "Elder Council"), not a realm one. Worth a
   legend line [INFERRED from the writers].
6b. **A second deity-to-culture route.** Tradition kinship (×(1 − 0.2 × shared motifs)) is driven by deity *presence*
   through deity-fitting motif elements, not by deity alignment (§4.2); under J382 it adds a small, faith-shaped closing
   between towns that both seat a deity (RR, DC, LR, FS, where traditions are lit).

### 9.2 Religion (J379 and FAITH-NOTE §9.6)

7. **The quadrant is three classes, not four.** Kinship is the patrons' good/evil only and three-valued; same patron is
   always kindred, so the "schism axis" never occurs; good-against-evil patrons are "natural enemies"; every other pair
   of different patrons is a "respectable rival". A religion lens's faith × alignment edge style should draw three
   classes and note that the host has no schism today (FAITH-NOTE §9.6 does not raise this).
8. **FAITH-NOTE §9.6 item 1 ("faith-weighted relief and contraband still cross settlement lines") should add the two lit
   moral flows**: faith prescription presses the institutions of *every* carrier-linked neighbour of a patron-bearing
   settlement (in six presets, not spread-gated), and tolerance drifts along trade/alliance/patron/vassal edges. Both
   need a seated deity somewhere and both are the default preset's only inter-settlement moral pressures.
9. **A conversion is an alignment event.** Replacing a patron shifts the convert's malice (±0.35 of drive), law (±0.3)
   and aggression (±0.35 × piety), its tolerance baseline and its quadrant with everyone. A conversion mark on the
   religion lens doubles as a dated cause on the alignment lens.
10. **FAITH-NOTE §9.6 item 8's culture weights**: faith (0.30) is the largest term, but the deity axes also enter the
    second-largest (alignment, 0.25) through the settlement's malice and law, so the patron's weight in culture
    distance is larger than 0.30 suggests [INFERRED §4.2].
11. **Temper need not be a separate legend row.** With three-valued axes the engine's derived temper is the good/evil
    axis restated (§2.4); a religion legend that shows good/evil already shows temper.

### 9.3 The lens mechanism (J379's shared "derived layer with legend, audience filter and time scrub")

12. **Audience filter**: alignment is DM truth only. The host shows no number to anyone; the reading folds NPC
    personalities, criminal or occupation regimes and unjust-war drift. Players get only public receipts: reckoning
    rumours, abolished and founded institutions, the town's built grain. There is no believed alignment in built
    beliefs (§6 Information), so the "audience-believed" view J379 proposed for faith has no alignment counterpart.
13. **Time scrub**: nothing is stored, so scrubbing alignment needs either a map-side per-pulse snapshot of the two
    scalars (a derived cache) or a host export. Host-dated memory exists only for moral drift (sinceTick, lastTick) and
    the events listed in §8.3 item 5; tolerance offsets carry names but no ticks. A scrub that replays moral drift from
    its records must use the host's own advance, not the designed 0.92-per-week curve: as built the stored value decays
    quadratically and is gone after about 8 silent weeks, and in RR it is frozen between raid ticks (§10 item 9). Proposed host ask: a per-pulse
    alignment digest (both axes, bands, the top constituent causes), published like the faith projection [Fable-reviewed 2026-10-18: adopted as V13 §8.5 H30 beside J384 (9)'s map-side plates].
14. **Recompute, do not reimplement**: the lens calls the host's selector on the pulse snapshot; three parallel
    "settlement character" derivations and four archetype tables already disagree in the host (§10 item 13), and a
    fourth on the map side would make it worse.
15. **Legend polarity**: settlement `lawfulness01` has lawful = 1; deity `chaos01` has lawful = 0; malice has saintly = 0;
    tolerance + means lenient toward cruelty/disorder; institution lean + means cruel/disorderly; the 3D grammar uses
    lawful = 1 and good = 1. A shared legend must normalise these.
16. **Read the resolved rules, not the preset**: born campaigns carry none of the virtual keys until a preset is applied
    (§7 birth caveat), and a DM can light the war layer, faith spread and canon per campaign or switch presets through
    the World's Temper picker. The lens must show "still" where a consumer is dark (the same rule FAITH-NOTE §9.6 item 1
    gives for faith).
17. **Honesty on born worlds**: in RR with no deity, the lens shows archetype and roster differences; one scored NPC can
    colour a hamlet "malicious" (§3.1). The roster tables are not symmetric: born settlements lean malicious (expected
    ≈ 0.55 in a large roster; a lone-scored hamlet is three times likelier malicious than benevolent) and belligerent
    (most seat types sit past the "Aggressive" chip line on expectation) (§3.5). A two-colour choropleth centred on 0.5
    will look tilted on every born world; the legend should say this is the host's vocabulary bias, not the realm's
    history. The "why" card (§8.3 item 4) is what keeps that legible.

---

## §10 Doc-versus-code contradictions, defects and open questions

1. **Stale "no consumer" headers.** `wp/settlementAlignment.js:19-21`, `wp/disposition.js:365-366`, `:530`, `:562` and
   `sp/moralDrift.js:27-30` (and the comment at `wp/pulseKernel.js:2294-2295` per a reader) say the alignment reads have
   no live consumer "this wave". About two dozen modules import the selectors today (24 by static import; 36 files name them, comments and types included), several lit in RR [OBSERVED grep list in
   §11.3].
2. **The disposition header** says "three blended terms" and lists four, and says the deity term reads the snapshot's
   `temperamentAxis`, which is retired; the code reads the derived temper [OBSERVED `wp/disposition.js:9-27`, `:208-212`
   vs `wp/deityAxes.js:26-33`].
3. **The governing-seat up-weight is a no-op.** Each NPC's weight is importance × the governing faction's power × 1.5;
   the last two factors are identical for every NPC and cancel in the weighted mean, so "the seat of power colours the
   settlement more than a back-bench guild" does not happen [OBSERVED `wp/disposition.js:151-181`, `:418-435`; INFERRED].
4. **Sparse rosters dominate.** NPCs with no scored word are skipped, so one scored NPC sets the whole conscience or
   aggression term (§3.1) [OBSERVED `wp/disposition.js:171`, `:428`; INFERRED consequence]. A design question, not a bug.
5. **The quadrant's "alignment" is the patrons' good/evil only.** WEAVE §B says the quadrant is computed from alignment
   proximity via culture distance [STATED WEAVE:25-28]; the owner's ruling 3 says faith war is distance across both axes
   [STATED DIRECTIVES:166-172]; the code reads only |Δ evil01| of the patrons [OBSERVED `wp/sacredClaim.js:121`;
   `wp/generosityKernel.js:333`]. Schism is unreachable; and a deity-free pair reads `respectable_rival` in generosity,
   scaling every conscience term by 0.95 on a born world (sacred-claim guards against the same trap; generosity does not)
   [OBSERVED `sp/cohesionWeave.js:53`; `wp/generosityKernel.js:414`, `:700`; `wp/sacredClaim.js:39-49`].
6. **The generosity gate modulator is inverted.** The refuse threshold is 0.12 × hysteresis ÷ gate, so a natural-enemy
   pair (gate 0.55) needs a *larger* net withhold to start refusing (0.218) and brothers (1.25) a smaller one (0.096); the
   comment says natural enemies refuse "more readily" [OBSERVED `sp/generosityEV.js:479-494`; `sp/cohesionWeave.js:49-54`].
   Bites only with seated deities.
7. **Two rulers.** The alignment and faith reads use the governing seat; generosity's ruling-power lens takes the
   highest-power faction, which the faith code measured as the wrong faction on 36.7% of fresh settlements [OBSERVED
   `wp/generosityKernel.js:303-313`; STATED `wp/religionLegitimacy.js:226-238`].
8. **The economic-base lens never varies** (its three source keys have no writer; every settlement is "mixed")
   [STATED `sp/cohesionWeave.js:258-269`].
9. **Moral drift decay compounds (host defect), and freezes outside belief worlds.** (a) *Compounding.* On every tick
   the kernel runs, it multiplies the stored, already-decayed drift by 0.92 raised to the ticks since the last act,
   and on a silent tick it deliberately keeps the original last-act tick [OBSERVED `sp/moralDrift.js:218-224`,
   `:251-254`]. The comment there says the intent is to measure true elapsed silence, which would be right only if the
   original value were kept; decaying the stored value makes the factor after n silent ticks 0.92^(n(n+1)/2). Measured
   by running the host function from a scratch directory (read-only on the host): 0.2772 → 0.255, 0.216, 0.168, 0.120,
   0.079, 0.048, 0.027, pruned at tick 8; the designed curve gives 0.255, 0.235, 0.216, 0.199 … and prunes at about tick
   32. Half-life ≈ 3.6 ticks instead of ≈ 8.3 (the tuning comment's "≈ 9"). It applies wherever the kernel runs on
   silent ticks: DC, LR and FS on canon (beliefs active: `perfect_delayed` in DC and LR, `full` in FS), and in RR on
   ticks with any raid anywhere (a silent actor's entry is re-decayed on each such tick). (b) *Freeze.* The kernel
   advances the ledger only when beliefs are active or a web-war atrocity happened this tick, and beliefs are active on
   canon whenever the info mode is not omniscient [OBSERVED `wp/pulseKernel.js:2296`, `:2341-2350`;
   `wp/beliefMap.js:204-209`; `wp/simulationRules.js:953`, `:996`, `:1073`, `:1404-1408`]. Of the presets that can raid
   (WAVES carries `supplyWebWarfareEnabled`), only RR is omniscient; so only **RR** with a DM-lit war layer on canon
   freezes: a raid-born drift does not decay between raid ticks, and if the DM turns the war layer off it stays at its
   last value indefinitely. LR on canon decays every tick (with the compounding). QL, SC and NC are omniscient but
   carry no WAVES, so they never raid [OBSERVED `wp/simulationRules.js:720-730`, preset bodies; INFERRED consequence].
10. **Drift direction.** PHASE55 says a deceived good actor drifts "toward the manipulator's alignment"; the code drifts
    every unjust instigator toward malice and lawlessness regardless of who deceived it [STATED PHASE55:514-517; OBSERVED
    `sp/moralDrift.js:145-156`].
11. **Requirement 13's write side does not match the read.** The spine says a mechanism that moves a town's soul moves
    its constituents — "NPC alignment, roster, institutions" — through their existing writers [STATED SPINE:84-92].
    But the derived read never reads the NPC alignment word or institutions (institution leans feed only the faith
    conduct plane), so those writers do not move it; and moral drift is a settlement-keyed accumulator feeding the read
    directly, i.e. in effect the parallel stock the requirement calls a defect [OBSERVED `wp/disposition.js:112-128`,
    `:568-593`; `wp/moralMartialLean.js:143-163`; INFERRED].
12. **Corruption is named as an input and is not one** (§3.6).
13. **Three settlement-character derivations, four archetype tables**: W0 axes, the faith conduct plane, and the war
    seat books' fallback (law 0.5, malice 0.5 − 0.35 × conscience) [OBSERVED `wp/warSeatBooks.js:298-300`]; tables in
    §2.3. No chokepoint reconciles them; requirement 13 names W0 as *the* read.
14. **Deity where the design says settlement.** The peace press, the quadrant and fidelity noise read patron axes; the
    spine requires the derived two-axis settlement read for requirement-13 engagement, and the selector's header promises
    that "Wave A widens" fidelity noise to settlement alignment — not done [OBSERVED `wp/peaceTermsAppraisal.js:86-104`;
    `wp/fidelityNoise.js:65-72`; STATED `wp/settlementAlignment.js:20-21`; SPINE:79-88].
15. **"Already live" lawfulness face price, partly.** WARCONV calls the oath-price weight in war termination "ALREADY
    LIVE" at `warTermination.js:762-766` and `momentum.js:1054` [STATED WARCONV:436, :655-662]. The momentum call
    (`wp/momentum.js:1265`) is live in DC/FS on canon; the war-termination call (`wp/warTermination.js:745`) is dark
    (`warTerminationEnabled` false in FS, absent elsewhere) [OBSERVED `wp/warTermination.js:144`].
16. **The seeded NPC word has no lit engine reader**; its vocabulary lacks chaotic_good although settlements and deities
    can be chaotic-good; `characterConsumers` calls it a projection cache for its "two live consumers" (bloc formation and the war-seat ruler bias), both dark in every preset (§7 rows 44-45), so the comment's "live" is stale [OBSERVED
    `wp/npcAgency.js:161-170`; OBSERVED·r `src/domain/npc/characterConsumers.js:518-524`].
17. **Seams presented as mechanisms**: army/fleet route risk (null passed); the good giver's charity exception
    (hard-coded false); triage (no caller); the humanitarian evidence door (no consumer); the 3D statuary (hard-coded 0.5;
    reads an unwritten `settlement.moralDrift`; its params note sources patron alignment from the deleted latent
    pantheon); NPC replacement reads `settlement.alignment`/`config.alignment`, which nothing writes, so every lean is
    "neutral"; the faction alignment read for NPC circulation is never supplied [OBSERVED as cited in §5–§7;
    OBSERVED·r `tm/arch/params.js:16-30`].
18. **One moral ladder, two spellings**: `conquestIntent` says its bands are borrowed verbatim from the war seat books;
    the seat books emit "merciful", the intent and razing lanes "benevolent" [OBSERVED `wp/conquestIntent.js:64-71`;
    `wp/warSeatBooks.js:321-326`]. Both lanes dark.
19. **The paradigm catalog says it has no consumers**; four modules import it [OBSERVED·r
    `src/domain/npc/paradigmAxisCatalog.js:4-9`, `:78`].
20. **Retired but persisted**: the deity `temperamentAxis` is still authored and stored, inert to every engine read;
    stored and derived values can diverge silently [OBSERVED `wp/deityAxes.js:26-33`; STATED ATLAS:9502 per a reader].
21. **Founding never reaches a proposal**: founding severity is at most 0.64, below the 0.78 proposal threshold, so a
    founding always auto-applies even when major changes require proposals; abolition reaches it only at an integrator
    ≥ 0.95 [OBSERVED `wp/moralInstitutionPressure.js:347`, `:361`, `:508`, `:527`; INFERRED]. Open question whether
    intended.
22. **"Converts" means every carrier-linked neighbour** in faith prescription (§5.1 note).
23. **The fold's migration sentence vs M4.** FOLD §2's POP row says the migration menu is empty in every shipped world
    because nothing writes the genesis route network [STATED FOLD:342]; the M4 dispatch that reads culture distance and
    alignment-set route risk ranks destinations by the digest's path cost, not the route network [OBSERVED
    `wp/migrationKernel.js:469-474`]. Open question for the populations seat whether the fold's sentence covers M4.
24. **Vocabulary collisions** are not in the fold's §5 register (§2.7).
25. **Open questions for the owner** [INFERRED]: (a) should a map lens ever show derived alignment to players, and in
    what words; (b) should the host export a dated per-pulse alignment digest for the scrub; (c) under J382, should the
    culture term in territory include the alignment half of culture distance, or only faith, economy and governance;
    (d) is the quadrant meant to read settlement alignment (WEAVE) or patron axes (code), and both axes (DIRECTIVES) or
    one; (e) should moral drift decay every tick regardless of the belief gate, and should the decay keep the value at
    the last act so it does not compound (item 9); (f) should the governance identity term compare a real overlord
    rather than a government label (item 27); (g) is the born roster's malicious and belligerent lean intended (item 29). [Fable-reviewed 2026-10-18: under the owner's "i leave all judgemtn to you" (J384) the session answered (a) — no player view, the lens is DM-only (J384 (7)); (b) — map-side plates, one frame per host advance, and a host ask for a per-advance alignment reading (J384 (9); V13 §8.5 H30); (c) — the whole vector, alignment half included, in the plain form (J384 (2)); (e) is carried to the host as H30 ("fixed if the host so chooses"); (d), (f) and (g) stay open, the design drawing (d) "by the host's law" in three classes and (g) as the lens's lean note (V13 §5.9 (8)).]
26. **Founded institutions with unmatched names can never be abolished** (§2.5): the pressure function reads the
    name-matched lean only; the loop and the embargo read the stamped lean [OBSERVED
    `wp/moralInstitutionPressure.js:119-121`, `:308-315`; `wp/institutionTolerance.js:104-110`, `:119-136`].
27. **The culture identity term compares government labels, and its header is stale.** "Same sovereign/overlord" and
    "a conquest that flips B's governingName to A's" [STATED `sp/cultureDistance.js:20-22`] describe nothing in the
    code: `governingName` is a government-type label at generation and the alternate occupation label "Martial Administration" after
    conquest (§4.2, §5.1) [OBSERVED `src/generators/power/rulingStructure.js:251-290`, `:783-792`;
    `wp/warDeployment.js:857`; `src/domain/rulingPower.js:178-187`, `:433-459`, `:665`; Fable-reviewed 2026-10-18: AV-2].
28. **Named road travellers' route danger weight is inverted.** The roads module gives a bold traveller a risk tolerance
    of 0.9 and a coward 0.35 and uses it correctly as a refusal ceiling (a coward refuses sooner), but passes the same
    number to the route chooser, where it multiplies the danger surcharge — so the bold traveller weighs danger most and
    takes the safe road, the coward weighs it least and takes the cheap dangerous one [OBSERVED
    `src/domain/roads/state.js:248-253`, `:334-343`; `wp/roadsKernel.js:1010-1018`; `sp/embattlement.js:307-320`,
    `:347-357`, `:407-423`; INFERRED that this is unintended, from the two opposite readings in one call site]. The
    return leg uses the frozen value too (`wp/roadsKernel.js:506`). Lit with `roadsEnabled` on canon (RR, DC, LR, FS).
29. **Born rosters lean malicious and belligerent** (§3.5): the trait tables score more vices than virtues and the slot
    roll keeps the flaw 70% of the time. A design question, not a code bug [INFERRED, computed].
30. **The slave contraband ban has no catalog good** (§6 Trade) [STATED `sp/smuggle.js:136-138`; OBSERVED
    `src/domain/region/goodsCatalog.js:130-245`].
31. **Two stale headers met in verification**: `wp/simulationRules.js:1509-1511` says an info mode of "full" fails
    closed to omniscient, but `infoModeOf` accepts it (`:1404-1408`), so FS beliefs are live; and
    `wp/militaryStrength.js:21-22` says the model is mounted nowhere, but eight modules call it (§6 Strength).
32. **The disposition history is a pure ratchet as lit** (§3.3): the twenty-year decay belongs to the dark WR-2 channel
    arm only [OBSERVED `wp/dispositionLedger.js:604-607`].

---

## §11 Sources

### 11.1 Read whole (line counts at `81f1cd96`)

By me: `wp/settlementAlignment.js` (55), `wp/disposition.js` (600), `sp/moralDrift.js` (341), `wp/deityAxes.js` (153),
`sp/cohesionWeave.js` (419), `wp/sacredClaim.js` (225), `wp/moralInstitutionPressure.js` (569),
`wp/institutionTolerance.js` (231), `sp/cultureDistance.js` (210), `wp/moralMartialLean.js` (169), `wp/lawWord.js` (77),
`wp/fidelityNoise.js` (106), `wp/deityStance.js` (174), `data/npcTraitWeights.js` (167), `wp/temperamentPresets.js` (84),
`comp/temperament/TemperamentPicker.jsx` (75).

By a reading seat as well (and not re-read whole by me): `docs/DESIGN_COHESION_WEAVE.md` (338), `src/domain/npc/paradigmAxisCatalog.js`
(628), `src/domain/prosperityRank.js` (147), `src/generators/economy/prosperity.js` (314).

In the verification pass (§12), by me: `comp/settlements/LivingWorldGates.jsx` (381), `wp/militaryStrength.js` (329),
`wp/foundingCatalog.js` (118).

### 11.2 Read in part (ranges)

`wp/simulationRules.js` (1,593): 1-35, 40-180, 676-1240 (the shared spreads and all seven presets), 1388-1593 by grep,
1552-1558; `comp/settlements/LivingWorldGates.jsx` 1-120; FOLD (708) 312-360 + grep; SPINE (1,217) 74-96; WEAVE 17-50;
DIRECTIVES (1,911) 160-175; WARCONV (2,697) 430-440, 644-652, 2315-2345; PHASE55 (1,710) 510-537, 1294-1300;
`wp/generosityKernel.js` (≈1,391) 295-440, 700-730, 920-935 + grep; `sp/generosityEV.js` (938) 40-120, 190-230, 420-545,
690-745, 925-938; `sp/generosityReactions.js` 410-470 + grep; `sp/generosityGate.js` 60-90; `wp/pulseKernel.js` (3,007)
1425-1431, 1462-1495, 1500-1515, 1800-1813, 2150-2175, 2230-2360, 2400-2430, 2770-2782; `wp/migrationKernel.js` (517)
130-230, 398-517; `sp/migration.js` (659) 165-215; `wp/populationDynamics.js` 440-470; `wp/supplyKernel.js` (815)
440-500, 600-780; `sp/embattlement.js` (449) 95-110, 296-330; `sp/smuggle.js` (343) 80-200; `sp/dispatchEV.js` (396)
95-120, 225-262; `sp/commodityFlow.js` (998) 165-180; `wp/supplyWebWarfare.js` (1,080) 245-262, 300-315, 435-480,
700-720, 810-862 + grep; `wp/beliefMap.js` 198-212, 950-1050; `wp/momentum.js` 114-130, 582-595, 740-815, 1035-1066,
1240-1275 + grep; `wp/realmVerbExecution.js` 740-752; `wp/warTermination.js` 140-148; `wp/reframeKernel.js` 76-82,
150-205 + grep; `wp/warReasons.js` 378-383, 735-775; `wp/upswingKernel.js` 108-116, 528-556; `wp/urbanFabricKernel.js`
30-64, 155-165, 240-250, 615-642; `tm/siteGenesis.js` 340-407; `tm/fabricRead.js` 60-90; `tm/townMapModel.js` 335-360;
`tm/mapEdits.js` 118-145; `src/store/operationRegistry.js` 318-335; `src/config/entitlementLadder.js` 188-205;
`wp/conquestDoctrineStage.js` (642) 60-75, 125-142, 405-450; `wp/conquestIntent.js` 60-72; `wp/razing.js` (873)
205-226, 395-410; `wp/razingExecution.js` 485-502; `wp/npcAgency.js` (1,219) 158-172, 515-535; `wp/npcReplacement.js`
155-190; `src/domain/townScene/buildingProfiles.js` 262-275, 330-340; `sp/armyTransit.js` 568-578, 690-700;
`wp/armyTransitKernel.js` grep; `wp/religiousContest.js` 355-390; `sp/distanceRead.js` 851-863; `wp/npcGrowthKernel.js`
(720) 26-40, 128-146; `wp/settlementPolitics.js` (1,075) 1038-1075; `wp/warSeatBooks.js` (810) 298-330;
`src/domain/corruption.js` (710) 170-200, 236-300; `wp/religionLegitimacy.js` (536) 55-75, 210-240, 420-465;
`wp/peaceTermsAppraisal.js` 84-106; `wp/peaceTermsCatalog.js` grep; `wp/tradeWar.js` 321-346, 405-420;
`wp/relationshipRulesAdversarial.js` 548-598 grep; `wp/tierResourceDynamics.js` 455-495, 595-650; `wp/mobilization.js`
192-204 + grep; `wp/coup.js` 89-108; `wp/lawBandModulation.js` (118) 1-60; `comp/settlements/livingWorldSignals.js`
140-165, 236-262; `src/pdf/lib/liveWorld.js` grep; `comp/screen/DmScreen.jsx` 105-115; `src/store/campaignWorldPulseSlice.js`
416-440; `src/domain/realm/heraldRouting.js`, `src/domain/display/rumorPhrasePools.js` grep.

Read in part by the reading seats only (ranges as they recorded them): `wp/peaceTerms.js` 855-900; `wp/peaceTermsGraph.js`
60-130; `wp/peaceTermsCoalition.js` 180-215; `wp/sovereigntyIntent.js` 1-60, 360-415; `wp/informationStatecraft.js`
130-150 + grep; `wp/settlementStrategy.js` 300-345, 625-645, 946-947, 1125-1185; `src/domain/npc/npcBank.js` 100-155;
`src/domain/npc/npcFacetContract.js` 1-60; `src/domain/npc/npcOps.js` 1-40; `src/domain/npc/characterConsumers.js` 490-560;
`wp/npcVerdictTable.js` 530-575; `wp/npcCirculationTable.js` 195-265; `wp/npcCirculation.js` 255-305;
`wp/religiousContest.js` 140-205; `src/domain/display/warResolve.js` 150-185; `comp/map/WarFaithMapOverlay.jsx` 1-40;
`comp/settlement/faithPanelModel.js` 85-100; `data/constants.js` 92-100; `data/npcData.js` 77-140, 1655-1676;
`src/generators/npcGenerator.js` 120-145, 295-350; `wp/dispositionLedger.js` 1-60; `wp/navalKernel.js` 340-360;
`sp/navalLayer.js` 355-380, 568-577; `wp/latentPantheon.js` 1-108; `wp/applyWorldPulse.js` 209-243;
`src/domain/rulingPowerCoup.js` 36-49; `src/domain/settlement.schema.js` grep; `tm/arch/params.js` 1-62;
`tm/arch/conditionGrammar.js` 1-200; `src/domain/townCartography/cartographyMorphology.js` 155-220; docs by grep and
passage: PHASE55 (60 hits), WARCONV (59), DIRECTIVES (38), PHASE4 (55), DESIGN_FP_ARCH_EC (23), DESIGN_FP_ARCH_WC (20),
DESIGN_FP_ARCH_SP (16), DESIGN_FP_ARCH_TR (18), DESIGN_FP_ARCH_EDITOR (48), ATLAS (29).

In the verification pass (§12), by me at `81f1cd96`: `sp/moralDrift.js` 40-107, 140-290 (and ran `advanceMoralDrift`
from the scratchpad); `wp/pulseKernel.js` 1321, 1520-1532, 1715-1745, 2280-2360; `wp/beliefMap.js` 195-215;
`wp/simulationRules.js` 688-810, 860-1012 (preset bodies by grep), 1398-1412, 1504-1515; `wp/warDeployment.js` 850-862;
`wp/applyWorldPulse.js` 165-190; `src/domain/rulingPower.js` 655-672; `src/generators/power/rulingStructure.js` 240-292,
425-470, 775-792; `sp/cultureDistance.js` 15-30, 41-60, 120-130, 175-200; `wp/migrationKernel.js` 128-147, 185-232;
`wp/supplyKernel.js` 720-760; `wp/martialReadiness.js` 80-95, 125-145, 190-212, 255-270, 495-521;
`wp/roadsKernel.js` 1-12, 340-352, 1000-1040 + grep; `src/domain/roads/state.js` 141-144, 240-255, 318-366;
`sp/embattlement.js` 296-372, 407-423; `wp/tradeWar.js` 320-348; `wp/relationshipRulesAdversarial.js` 540-600;
`wp/moralInstitutionPressure.js` 100-140, 280-330; `wp/moralMartialLean.js` 40-70, 115-169;
`wp/institutionTolerance.js` 104-136; `data/npcData.js` 77-90, 1660-1680 (and the tables by node);
`src/generators/npcGenerator.js` 315-350; `wp/disposition.js` 100-150, 385-400; `wp/clergyTraitPlane.js` 1-140;
`wp/npcLadderCoherence.js` 36-53; `wp/causeLifecycle.js` 355-370; `wp/religiousContest.js` 228-247, 500-516, 546-560,
740-750, 770-782; `wp/religionState.js` 540-560 + grep; `wp/deityStance.js` 30-40, 66-118; `src/domain/region/goodsCatalog.js`
130-245 by grep, 460-478 (and `normalizeGood` by node); `sp/smuggle.js` 85-148; `src/generators/demandProfile.js` 60-102;
`wp/conquestFeeds.js` 100-150 + grep; `wp/peaceTermsAppraisal.js` 80-108; `wp/peaceTermsCatalog.js` 25-35, 185-200,
400-420; `wp/peaceTermsDrafting.js` 20-70; `wp/treatyClock.js` 48-59; `wp/treatyEnforcement.js` 140-160;
`wp/occupation.js` 1240-1262; `src/domain/traditions/genesis.js` 155-240; `src/domain/magicProfile.js` 160-180,
255-275, 495-525 + importers; `wp/dispositionLedger.js` 1-95, 360-440, 480-495, 600-625; `wp/dispositionChannels.js`
30-60; `wp/urbanFabricKernel.js` 150-165, 240-250, 626-640; `wp/reframeKernel.js` 74-82, 150-190, 376-386;
`wp/subsystemActivation.js` 42-55; FOLD 317.

Map module: `docs/PROGRESS.md` rows J375-J382 (lines 434-441); FAITH-NOTE (1,516) 1-101, 1043-1283 and its headings;
FP-SIM (1,098) 1-60 + grep (no alignment section); FP-PHYS (481) 1-45, §2.5 + grep (no alignment section);
`docs/volumes/V13-world.md` 1360-1400 + grep for W8 and `foreignCulture`.

### 11.3 My own re-reads and checks at `81f1cd96`

Every [OBSERVED] above. In particular I re-checked and settled: the full importer list of the alignment selectors
(`grep` for `settlementAlignment|computeMalice|computeLawfulness|computeAggressiveness|natureWordFor|lawWordFor|
riskToleranceFromAlignment` across `src/` — 36 files including the definitions); migration's preset reach (QL and NC
are off — the readers disagreed; one said "RR, QL, DC, NC, LR, FS", the other "RR, DC, LR, FS"; the QUIET set turns
off `migrationFlowsEnabled` and sets propagation to local, and calamity and lifecycle are absent there); fidelity noise's
development lane (lit in six presets, not only DC/FS as one reader had it); the momentum climb-down's live call site; the
v2 town layout's reach; `temperamentPresets.js` is 84 lines (one reader cited lines beyond its end). Found beyond the
readers: the credit-default threshold (malice ≥ 0.6), the inverted generosity gate modulator, the no-op seat up-weight,
the moral-drift freeze outside belief worlds, faith prescription's "every neighbour" reach, founding's unreachable
proposal threshold, the two-rulers split, the birth caveat's effect on every RR row, and the J382 coupling into V13 W8.

### 11.4 Not read by anyone in this run

The rest of `wp/pulseKernel.js`; the generosity grain loop body beyond the ranges above; `wp/warTermination.js` beyond
its gate; `wp/deityStanceLane.js`; `wp/piety.js` beyond grep; `wp/religionState.js` beyond the two ranges in §11.2;
`wp/clergyTraitPlane.js` beyond line 140; `wp/martialReadiness.js` beyond the ranges in §11.2; `wp/npcLadderKernel.js`
(how `faithRuptured` is consumed); whether the demand profile's illicit imports ever ride a commodity flow; how often two
born settlements share a government label; the espionage stages, `disinformationPlant.js` and envoy chance meetings beyond grep;
`src/domain/display/institutionVocabulary.js`; `wp/dispositionProfile.js` (the WR-2 channels); `src/domain/governanceLedger.js`;
`src/domain/rulingPower.js` `governingFactionOf`; `distancePricedNews.js`; `vengeanceLicense.js`
beyond its gate; `razingWitness.js`; `warReasons.js` sacred-claim wiring beyond the gate; the deferred
`runUpdateCampaignSimulationRules` body (so whether the World's Temper picker's writes are premium-gated is not traced);
whether `settlement.urbanFabric` survives the player projection; the design volumes DESIGN_PEACE_ENGINE,
DESIGN_GENEROSITY_ENGINE, DESIGN_SUPPLY_WEB_WARFARE, DESIGN_INFORMATION_STATECRAFT, DESIGN_MOMENTUM (named by WEAVE but
not read); any tests.

---

## §12 Verification record

A verifier checked this note against the host at `81f1cd96` and returned six claims that did not hold and eighteen
omissions. The fixer seat (Opus 5.5, workflow 38) re-checked each one at the source, read-only on the host. The host
code it ran (`advanceMoralDrift`; the two institution lean readers; the goods normaliser and contraband classifier; the
personality and trait-weight tables) was imported from a scratch directory, and nothing was written to the host. One
row per item; "§" references are to this note as now edited.

### 12.1 Claims that did not hold

| # | Verifier said | What I found at the source | What changed |
|---|---|---|---|
| P1 | The 0.92-per-week decay (half-life ≈ 8.3 weeks) is wrong: the stored, already-decayed value is re-decayed from the original last-act tick, so the decay compounds | Holds. `sp/moralDrift.js:218-224` decays the stored value by 0.92^(ticks since last act); `:251-254` keeps the old last-act tick on silent ticks. Running the function gave 0.2772 → 0.255, 0.216, 0.168, 0.120, 0.079, 0.048, 0.027, pruned at tick 8 (designed: pruned ≈ tick 32). Factor 0.92^(n(n+1)/2), half-life ≈ 3.6 ticks | §1 item 3, §3.6 row 1, §4.3, §9.3 item 13 and §7 row 22 now state the built decay; logged as a host defect in §10 item 9(a); open question §10 item 25(e) |
| P2 | §10 item 9's freeze "in RR or LR" is wrong: LR is `perfect_delayed`, so beliefs are live on canon and the kernel runs every tick | Holds. LR's info mode is at `wp/simulationRules.js:996`; `wp/beliefMap.js:204-209` makes beliefs live on canon unless omniscient. Of the presets carrying WAVES (and so web-war raids), only RR is omniscient; QL, SC and NC never raid | §10 item 9(b) says RR only and explains LR; §7 row 22 cells corrected |
| P3 | Conquest does not set the conquered town's `governingName` to the victor's; the comment the note followed is stale | Holds, and goes further. The conquest crowns the "‹occupier› occupation authority" faction and the transfer writes the occupation archetype's alternate label "Martial Administration" as `governingName` (`wp/warDeployment.js:857`; `wp/applyWorldPulse.js:165-187`; `src/domain/rulingPower.js:178-187`, `:433-459`, `:665`) [Fable-reviewed 2026-10-18: AV-2 — this row first said the occupier string itself was written]. And `governingName` is a government-type label at generation (`src/generators/power/rulingStructure.js:251-290`, `:783-792`), so the identity term means "same label"; a conquest can *raise* distance for a pair that shared a label | §5.1 closing paragraph rewritten; §4.2 new sub-bullet; §8.1 Territory row; §9.1 items 1 and 3; §10 item 27; §1 map-view paragraph |
| P4 | Vassal chains do not read closer through the identity term; only a direct vassal or patron edge closes distance (×0.85) | Holds. The only writers of `governingName` are generation and a power transfer; the trade tie is read for the direct pair edge only (`wp/migrationKernel.js:197`, `:228-230`), and the contraband call passes no tie (`wp/supplyKernel.js:753-756`) | §9.1 item 6 rewritten (up to 15% for a direct edge, nothing along a chain, plus the same-label effect); §4.2 trade-tie sentence |
| P5 | Military enforcement does have an alignment input: the patron's temper in the will facet, and the readiness ratchet | Holds. `wp/militaryStrength.js:253-285`: +8 warlike / −6 peacelike on a facet weighted 0.08 (about +0.6 / −0.5 on 0–100); consumers occupation, war capacity reads, trade salience, occupier conversion force, road escort, two displays. `wp/martialReadiness.js:198-212`, `:505-521`: warlike speeds accrual and slows peace decay through the piety megaphone; peacelike speeds decay. Settlement malice and law never enter. The model's "mounted nowhere" header is stale | New "Strength" paragraph in §6; §9.1 item 4 rewritten; §8.1 new row; §7 rows 54-56; §1 item 6; §10 item 31 |
| P6 | The warlike-supplier embargo bar is not in the trade-war contest but in relationship candidate generation | Holds. The conscience embargo is in `wp/tradeWar.js:324-346`; the deity bar is the trade-leverage candidate at `wp/relationshipRulesAdversarial.js:552-598`, fed by the trade-salience map the pulse builds only under the war layer (`wp/pulseKernel.js:1520-1532`). Peacelike deities subtract the same amounts | §6 Trade paragraph relocated the rule; §7 row 32 relabelled and re-cited |

### 12.2 Omissions

| # | Verifier said | What I found at the source | What changed |
|---|---|---|---|
| M1 | Host defect missed: moral drift decay compounds; lit wherever the kernel runs | Holds (same evidence as P1). It bites on silent ticks in DC, LR and FS on canon, and in RR on any tick with a raid anywhere | §10 item 9(a); §1 item 3; §3.6 |
| M2 | Host defect missed: founded Orphanage, House of healing and Debtors' yard can never be abolished | Holds. Calling the host readers on the six catalog entries: those three have a stamped lean but no name-matched lean; the abolition loop admits them (`wp/moralInstitutionPressure.js:308`) but the pressure function reads only the name match (`:119-121`), so pressure is 0. The conduct plane and the captive gate also read only the name match; the embargo reads the stamped lean | §2.5 defect paragraph; §7 row 34; §10 item 26 |
| M3 | Born worlds are biased: the tables score 16/45 virtues, 17/30 flaws, 7/30 neutrals; expected conscience ≈ −0.145, aggression ≈ +0.165 | Holds. My exact expectation over the slot roll: −0.144 and +0.165 (the verifier's figure was exact, not rounding: the aggression sum is not clamped, `wp/disposition.js:132-139` [Fable-reviewed 2026-10-18: AV-1]); among scored NPCs −0.227 and +0.272; a lone-scored hamlet reads malicious with p 0.15, benevolent 0.05; expected aggressiveness passes the "Aggressive" chip line for every seat type but craft and labour | §3.5 new paragraph; §3.8; §1 map-view paragraph; §9.3 item 17; §10 items 25(g) and 29 |
| M4 | Missed NPC representation: the clergy trait plane, with both an evil and a law axis, the only NPC-grain law axis | Holds. `wp/clergyTraitPlane.js:47-96`, 44 words; magnitudes differ from the conscience table (generous −0.6 vs +0.7). Consumers: clergy plane in the religious contest, cause lifecycle, NPC ladder coherence; the envoy-meeting consumer is dark | §2.2 now "five representations" with row (e); §7 row 58 |
| M5 | Missed strength coupling: patron temper in capacity and readiness, reaching occupation, war reads and road escorts | Holds (P5). Readiness also feeds the martial-institution lapse | As P5 |
| M6 | Missed route consumer: road travellers choose routes by personality risk tolerance | Holds, and the read is inverted: the same number is a boldness (refusal ceiling) in the roads module and a danger weight in the route chooser (`sp/embattlement.js:347-357`), so bold travellers take the safe road. Gate: `roadsEnabled` ∧ an active digest (`wp/roadsKernel.js:344-351`) | §5.2 new row; §2.7 new bullet; §7 row 56; §8.1 new row; §10 item 28; §1 item 5 |
| M7 | The catalog has no slave good; the flagship slave ban fires only on a matching custom good id | Holds. Calling the host normaliser: "Undeclared slaves" (steppe) and "Enslaved captives" (norse) from the criminal demand profile classify as slaves; arms and arcane goods have catalog categories. Whether those imports ride a flow was not traced | §6 Trade paragraph; §3.4 row; §8.3 item 3; §9.1 item 5; §10 item 30 |
| M8 | Missed the captive gate: the victor's patron conscience decides whether conquest captives feed its slave market | Holds. `wp/conquestFeeds.js:100-150`; a deity-free victor is permitted; the slave market is found by name match; war-gated at `wp/pulseKernel.js:1752` | §5.2 new row; §7 row 57; §1 items 5 and 6 |
| M9 | Missed territory touchpoint: occupation_continuation scaled by the victor's patron press (PLAUSIBLE: duration not traced) | Holds, now traced: the press multiplies requested duration (`wp/treatyClock.js:48-59`, via `wp/peaceTermsDrafting.js:30-52`), and a live term stands in for the garrison and forbids the collapse exit (`wp/treatyEnforcement.js:140-153`; `wp/occupation.js:1248-1255`). Upgraded to OBSERVED | §6 Peace; §7 row 30; §8.1 Territory row; §9.1 item 3; §1 item 6 |
| M10 | Missed: tradition genesis seeds elements from deity evil/chaos, a second deity → culture route | Partly holds. Genesis reads evil and chaos only to weight the *act*; element weights read deity presence; kinship compares elements only (`src/domain/traditions/genesis.js:194-199`, `:224-236`; `wp/migrationKernel.js:133-145`). So the route is deity presence, not alignment | §4.2 new sub-bullet; §9.1 item 6b |
| M11 | Missed the deity stance local lane (law method clash into contest, receptivity, mandate fit), not spread-gated | Holds whole [Fable-reviewed 2026-10-18: AV-8 — this row first said "partly"]. Contest floor and mandate fit are local (`wp/religionState.js:544-553`, `:739-749`); the receptivity resistance is read in every present creed's share advance (`wp/religiousContest.js:796-805` → `:514`), with no spread gate; spread adds only the entrant lane and the occupation pull (`:768-794`, `:780`) | §4.2 Deity stance sentence; §7 row 59 |
| M12 | Missed: a warlike or evil major patron regulates or opposes arcane practice (gate not traced) | Holds, traced: a major patron tightens legality one band, a warlike/evil one two bands and makes the attitude hostile; read only by display and grounding code, no engine consumer | §6 Faith; §7 row 60 |
| M13 | Missed gate: Relationship drift is a fourth Living-World gate and blocks the War layer while off; SC needs it first | Holds (`comp/settlements/LivingWorldGates.jsx:56-61`, `:236`, `:246`, `:285`; SC sets the key false at `wp/simulationRules.js:970`) | §7 legend; row 53 |
| M14 | Minor: the disposition history is not a pure ratchet; it decays over a twenty-year half-life | Does not hold as lit. With `dispositionChannelsEnabled` dark (every preset) the writer takes the legacy arm, which adds and clamps with no decay (`wp/dispositionLedger.js:382-421`, `:604-607`; `wp/dispositionChannels.js:38-52`); the 1040-tick half-life is the dark WR-2 channels' only. SCORE_SAT 8 and SCORE_MAX 12 confirmed | §3.3 adds the clarification (and upgrades its tag to OBSERVED); §10 item 32 |
| M15 | Minor citation errors: urban fabric half-life at :247 and target at :634-637; reframe kernel lines, not the call site | Partly holds. The note's `:240-250` already contained :247 and `:628-637` the target; `:155-162` is the dormancy gate, which was mislabelled. The reframe row cited only the call site | §6 Town map cites :247, :629-637 and labels :155-162 as the gate; §7 row 12 cites the kernel and keeps the call site |
| M16 | Context: the `simulationRules.js:1510` comment says "full" fails closed, but `infoModeOf` accepts it; FS beliefs are live | Holds; not a note error (§7 already treats FS as belief-live) | §10 item 31 records the stale comment |
| M17 | The verifier's read-whole and read-in-part list | Recorded as the verifier's own reading. In this pass I read `LivingWorldGates.jsx`, `militaryStrength.js` and `foundingCatalog.js` whole and the ranges in §11.2 | §11.1 and §11.2 updated |
| M18 | The verifier did not read: rest of `pulseKernel`, generosity grain loop, war termination, stance lane body, piety, religionState, martialReadiness beyond parts, militaryStrength beyond parts, roads kernel beyond grep, cause lifecycle, clergy plane beyond 1-60, espionage/envoy/sovereignty, NPC facet contract and character consumers, the design-doc passages behind STATED·r claims, PROGRESS J377-J382, V13 §3.9, FAITH-NOTE | Recorded. I closed militaryStrength (whole), martialReadiness, the roads kernel's route and escort lines, the clergy plane to line 140 and the cause lifecycle call. The design-doc STATED·r claims and the map-module rows remain as the synthesis read them, not re-verified here | §11.4 lists what is still unread |

### 12.3 Found while fixing (beyond the verifier)

- The culture identity term compares government labels (P3 row); the J382 territory cost inherits a tier-clustered
  "same label" closing of about 0.108 (§4.2, §9.1 item 6).
- The road travellers' danger weight is inverted (M6 row; §10 item 28).
- `wp/militaryStrength.js:21-22`'s "mounted nowhere" header is stale (§10 item 31).
- In LR, moral-drift entries exist only if a DM lights the war layer for raids, since LR has no strategy chooser (§7
  row 22).
