# A year of politics and war on the map — the paired product's substance, walked as a DM

> Provenance: written by Opus 5.5 under the Fable manager (J392); read and weighed by the manager's synthesis.

**Scope.** What a DM and players actually get when SettlementForge's politics and war (the host, read-only at
`81f1cd96`) meet the map module's sway, patrols and encounters (this repository). Not build time, not debt. Every
claim cites its text. Host documents are cited by short name: **GR** `docs/DESIGN_FP_ARCH_GR.md`, **RD**
`docs/DESIGN_REALM_DIRECTIVES.md`, **WC** `docs/DESIGN_FP_ARCH_WC.md`, **FOLD** `docs/DESIGN_FP_COHERENCE_FOLD.md`,
**HB** `docs/DESIGN_FP_ARCH_HB.md`, **ES** `docs/DESIGN_FP_ARCH_ES.md`, with host code by file. Ours: **V13**
`docs/volumes/V13-world.md`, **V14** `docs/volumes/V14-sites.md`, **PROG** `docs/PROGRESS.md`. Line numbers are at the
heads named and will rot; the section names will not.

**Two facts that shape the whole year, stated first:**

1. **The default preset has no war.** `warLayerEnabled: false` is the default (host `simulationRules.js:83`); only
   `dramatic_campaign` (`:938`) and `full_simulation` (`:1016`) light it. A DM on `realistic_regional` gets
   relationship drift, drift raids, subjugation by drift, a `shared_threat` pact now and then, and the sovereignty
   market's stage (it rides `settlementLifecycleEnabled`, in the WAVES set every named preset spreads, `:720-730`) —
   but no army ever marches and no siege is ever laid. FOLD states the one lit chain plainly: in the default a DM
   "feels a pact proposed, valued by the responder, signed or declined, kept or frayed" and little else (FOLD:351).
   **The walkthrough below therefore runs on `dramatic_campaign`**, and names the default's arm at each moment.
2. **The map's politics need the host to send them.** The sway reads a `PolityFacts` window per advance (V13 §2.2,
   `:999`); that window is host change **H13** (V13 §8.5), and the strength order, a raid's outcome word and patrol
   meaning are **H25**. Until H13 the sway lens runs **provisional** — "each seat projects at its tier with the middle
   rung … labelled 'before the host's first polity window'" (V13 §5.9 (2), `:4391`); with H13 but no force bands it
   runs **civil**, and with no strength order the adversarial push reads **level** (V13 §3.9 (8), `:2725`). The walk
   assumes H13 landed with strength bands but not force bands (civil regime) and without H25, and flags what the
   enforced regime and H25 would change.

**A note on the brief's pointer.** The slice cites HB's head for "a holding and a vassal". HB is *habit
conditioning* — "actors learn, and being known is the price" (HB:1) — not holdings. I read HB as what the vassal's and
the overlord's courts *learn* across the year, and took holdings and vassals from RD amendments N and S, WC §1.17 and
V13 §3.9 (9)/(12).

**The cast** (names borrowed from the host's own example sentences): **Emberford**, a city, the party's home;
**Aldmere**, a village, Emberford's vassal; **Thornhold**, a town, the rival; **Ashford**, Thornhold's steading
(satellite); **Merewick**, a distant city-crown; **Aldenmoor**, a town where a spy is sent. The world is a native world
canonized at birth (H22; PROG J384 (6), J386 gap 6), so every lens has geography from week one.

---

## §1 The walkthrough

### Week 0 — the opening picture

**Map.** The `sway` layer fills each allegiance at 18 % alpha in its root's colour; Emberford's fill swallows
Aldmere's, the two separated by a 0.8 px member border; Thornhold's fill sits to the east with a dot at Ashford's
frozen site point (V13 §5.1, `:4085`). Between Emberford and Thornhold there is either a gap of **unfilled wild land**
("A cell no seat reaches is **unclaimed** and stays wild: the map never fills it", V13 §3.9 (7), `:2710`) or, where both
reach, a thin line where the stronger holds — they are not yet adversaries, so "neutral: the stronger holds" (V13 §3.9
(8)). The reaches are small and honest: a town's reach is 0.8 foot-days, a city's 2.5, capped at 1.5× (V13 §2.3
`PolityRule`, `:1395-1396`). The legend carries two banner notes — "the push between adversaries is the host's
strength order" and "water carries the sway along the host's lanes" or their dark twins (V13 §5.9 (2), `:4394`). A
diagnostic `seatTerritory` layer, the host's own total partition, can be toggled on with the legend "the host's own
partition: total, no wild land" (V13 §5.9 (2) table, `:4399`).

**Host.** Nothing about the map. The dossier knows Emberford's tier and its vassal link; its relationship-state plane
labels Emberford–Thornhold `neutral` or `rival`.

**DM feels.** Oriented. "Thornwall and its vassals" — the allegiance's descriptive label from its root's name (V13
§3.9 (17), `:2870`) — reads like a real atlas. The one friction on day one is *two* partitions: a DM who toggles the
diagnostic layer sees every acre owned, then toggles back and sees most of it wild. The legend's wording carries the
distinction, but it is a distinction a DM must be taught. **Players** see the same sway over public facts only (V13
§5.1 player picture, `:4096`); in the default preset (omniscient infoMode) that is "the public truth or nothing" (V13
§5.8 (7), `:4289`).

### Weeks 1–12 — the rivals drift to hostility

**Host.** The world pulse's relationship drift moves the pair's label `neutral → rival` (`neutral_to_rival`,
`relationshipRulesCore.js:77`), then `rival → cold_war` (`rival_to_cold_war_or_hostile`,
`relationshipRulesAdversarial.js:66`), then `cold_war → hostile` (`cold_war_escalation`, `:226`), each a proposal
carrying trust, resentment and fear deltas and an authored reason sentence. This is lit in every preset; it is the
oldest, most trusted machinery in the host.

**Map.** The relation's class changing is a revision trigger with **no dwell** (V13 §3.9 (13), `:2817`): the moment the
window carries `rival`, the pair reads **adversarial** (rivalry, cold war, hostility, the legacy *tense*, any pair at
war — V13 §3.9 (8)). Where both reach, the line now moves by the *host's* comparator: P(x, c) = Λ − t ÷ τmin +
`pushPerBand` × the host's strength band, and a lead under `margins.civ` leaves the cell **debatable** — "the contested
march, held by neither", drawn as a cross-hatch in both colours (V13 §5.1, `:4086`). The patrols lens moves a rung
denser on every segment within `hostileDays` (3) of the adversary (V13 §3.9 (14); `PolityRule` `:1408`). If
Thornhold's strength band rises (it reads tier, population, conflict, trade, legitimacy and economy pressure —
`settlementStrength`, `relationshipRuleHelpers.js:312-330`), the change is shown at once as a **planting line** in the
`events` layer — "its fact, its week and the week it takes effect if it stands" — and moves the line only after
`strengthDwellWeeks` (13) (V13 §3.9 (13); `:1402`).

**DM feels.** This is one of the product's best quiet moments. The hostile label, which on the host is a word in a
dossier, becomes a cross-hatched ribbon and a thickening of patrol tints on the roads between two towns. The
`whyCell` answer ("the candidates, the class, the margins, the host's strength order, the deciding rule", V13 §5.9
(2), `:4407`) lets the DM explain to players why the ford is no-man's land. The planting line is the same idea the
FOLD ruled for slow mechanisms — "a dossier or Herald sentence that names the cause … and nothing about the future"
(FOLD §4, `:408`) — arriving independently on the map side. **Caveat of scale:** the debatable width between equal
seats is "about a sixth of a foot-day between two towns, half a day between cities" (`:1402`), so the march between
two rival towns is a ribbon a few kilometres wide, and two rivals whose reaches never meet have **no march at all** —
wild land between them, nothing hatched.

### Week 14 — a raid

**Host.** A `hostile` pair spawns a `hostile_raid` candidate: "Either side of a war can raid. The aggressor is the
stronger side by STATE"; resentment +0.035, fear +0.04, a `war_pressure` condition on the victim, metadata
`incidentType: "raid"` with aggressor and victim (`relationshipRulesAdversarial.js:262-312`). There is **no outcome**:
nobody repels, nobody succeeds.

**Map.** "A raid on a settlement is a `WorldEvent` at its victim … moving no band and marking the victim's facing
segments **fighting** for `fightingWeeks`" (4) — a crossed-blades mark and a 2 px edge, "no arrows, no animation" (V13
§3.9 (11), `:2783`; §5.1 `:4086`). The owner's ruling behind it is explicit: "A DRIFT RAID is NOT a verdict … only a
host verdict moves a march line … chose this over ruling the aggressor the winner because that would invent an outcome
the host does not compute" (PROG J384 (5), `:443`). H25 asks the host for "a raid's outcome word" (V13 §8.5, H25).

**Encounter.** The DM clicks the road at Thornhold's ford in week 15. The crop reads "the polity at the point and the
encounter's week … the holder, the allegiance, held, held by force, debatable or unclaimed, the two sides … the patrols
with their colours and whether one passes that week, a fight there" (V14 E1 (4), `:1976-1978`) and derives `debris`
because the segment is fighting, a `patrol` in Emberford's colours if `patrolAt` says one passes this week, and a
`barricade` at a border post — "keyed by (the address, the week), never a roll" (V14 E4 (b), `:2093-2096`).

**DM feels.** Two halves. The encounter is a gift: the scene *knows* there was a raid here and lays debris and a
patrol on the VTT map without the DM authoring it. The map pin is a question: crossed blades, and no one can say who
won — neither the map (by design) nor the host (it never computed it). The FOLD's engagement registry lists `raid` with
the verdict vocabulary `repelled · succeeds · bought_off` (FOLD §3.4, `:367`), which is exactly H25's missing word —
but its owner is "the war volume (border incidents)", it lands only with SP-9 (unbuilt), and it is not clear it
covers the *drift* raid at all. **Default preset:** this moment is identical; it is the default's most frequent
political beat, and its pin is its least satisfying.

### Weeks 15–30 — a pact proposed and signed

**Host.** Merewick, which also fears Thornhold, crosses a `shared_threat` trigger and proposes a pact to Emberford.
The proposal row sits in `spatialLedgers.pactProposals` with `answerDueTick` (GR §4, `:295-305`). The responder values
it — alone: "the two-sided negotiation the spine calls settled law was never built (the responder values alone)"
(FOLD §0, `:71`). In `dramatic_campaign` the signing is stamped with the seat-holder's name (GR-1, the oath stamp,
partial), the treaty card gets an age line, and a lapse years later gets a eulogy (GR-0, `:373`). The standalone
non-aggression pact exists (GR-2). What does *not* exist: "the allies came" (`mutualDefenseFor` has no caller — FOLD
§2, `:337`), the proposer's own picture, and any first-visible sign of the proposal: "none for an engine proposal
inside a one-month advance (the answer is due in 4–18 weeks and no proposal or refusal line exists); the signing beat
is event-timed, about one signing per 1.3–3 years per world" (GR-2 bracket, `:435`). A refusal costs "a banded trust
delta and a memory. No grievance, no casus" (`pactFormation.js:140-142`). Once SP-9 lands, the proposal's answer is a
`pact_acceptance` hearing the DM may "leave … tilt … or give a verdict" (FOLD §3.4, `:359`; GR header bracket `:15`).

**Map.** **Nothing.** The sway reads relations by their relationship-state label and links by the vassal labels and
"one of the host's four subordinating treaty terms" (tribute, compelled alliance, puppet seat, a treaty-held
occupation) (V13 §3.9 (9), `:2745`; `PolityLink.word`, `:1011`). A peacetime pact of the GR families — security,
faith, population, trade rights — changes no class and draws nothing. Merewick and Emberford stay whatever their
label says; if a NAP were signed between Emberford and *Thornhold*, their `hostile` label would keep the pair
adversarial: the cross-hatched march, the strength push and the denser patrols would all stand on the day they swore
not to fight.

**DM feels.** The pact is a *document* moment, not a *map* moment. In the default preset it is the one FP chain
that is felt (FOLD:351), and it is felt only in the dossier, years apart. A DM who watched the map redraw for a label
change will expect a signed alliance to do at least as much and will find it does less.

### Weeks 30–38 — war, and an army marching (`dramatic_campaign` only)

**Host.** Thornhold's chooser declares (`war_declaration`, FOLD §3.4), deploys, and its army walks the road under
`armyTransitKernel.js`. The rich circulation the owner directed — an allied, vassal or occupied settlement electing
to "send reinforcements and supplies … to an ally's, overlord's, or occupier's army" (WC §0.1, `:180-190`), the stance
ladder `neutral · materiel · auxiliary · belligerent · principal` (WC §1.2.1, `:1228`), call-ins that ride an envoy
(WC §1.9), "MASSING IS A TELL: a concentration is a map body at news speed" (WC §1.15, `:2847`) — is **unbuilt**
beyond vocabulary: "LIT: none · BUILT DARK: WC-0A..WC-0E … no writer, no src importer · UNBUILT: WC-1..WC-16" (WC
header bracket, `:95`). FOLD's honest sentence-that-cannot-fire: "Aldmere reinforced Thornhold" (three reinforcement
roads already exist, WC names none) (FOLD §2, `:346`).

**Map.** The pair is `atWar`, so adversarial regardless of label. The army appears only through `hostOverlay`:
"movers on host edges by fraction and embattlement phases, projected by the host for the audience before sending,
with no destination and no arrival time" (V13 §3.11.6, `:3389`). The sway is explicit that "a field army is presence
only and moves no border until a dated outcome" (V13 §3.9 (10), `:2770`). When the two armies' paths overlap, the
FOLD's `armies_meet` is a STANDING-at-contact hearing — "both armies HOLD at contact for the hearing week" (FOLD §3.4,
`:357`) — one of the four kinds SP-9 lights first. Its verdict, once fought, is a **field battle**: "its winner +2 on
the segment nearest the place its record names (the approaches of a settlement) or, when it names none, on the
segment `borderSegment` places … labelled a map reading" (V13 §3.9 (11)). The band (`none · slight · firm ·
dominant`) decays one step per season (`march.halfLifeWeeks` 13, `:1407`) and, in the civil regime, breaks a debatable
tie alone when it leads by `margins.mil` (J386 gap 7, PROG `:445`).

**DM feels.** The march itself is thin on both sides: a dot moving along a road with no stated destination, and no
picture of who is coming to whose aid. The *battle* is good — the band appears on the segment near where it was
fought, the march hatch resolves into the winner's fill with a single hatch of the loser's colour ("held by force",
V13 §5.1), and it fades over a season unless fought again. That is the owner's T3 ("military strenght to enforce.
where two hostile neighbors fight regarding the march", PROG J378) delivered literally.

### Weeks 38–46 — the siege of Thornhold

**Host.** `warSiegeVerdict.js` decides: a feasibility gate, a duration ceiling, the defender's will, a capacity roll
calibrated so "a MUTUAL / near-even siege HOLDS most ticks (pFall ≈ 0.3 …) while a clear-favourite … resolves quickly"
(`:28-34`). The Edit Mode seal "Let the siege fall" exists today (`src/copy/en.js:1959`). Under SP-9 the siege becomes
the registry's STANDING hearing — "every week the siege stands" with verdicts `holds · falls · relieved · lifted`
(FOLD §3.4, `:358`). WC's showcase, "THE SIEGE IS DUELING ENDURANCE ENVELOPES … surfaced in the siege document as two
envelope words racing" (WC §1.15, `:2856-2859`), is unbuilt, and so is the sentence "Emberford's grain fed Thornhold's
siege lines" (FOLD §2, `:346`: `supplyShipments` has no quantity, no army endpoint, no food).

**Map.** The glyph takes its lifecycle mark ("razed, besieged, occupied", V13 §5.1 `events`, `:4088`); the facing
segments read **fighting** "while an engagement there stands open, or within `fightingWeeks` of its climax" (V13 §3.9
(11)). The encounter crop in the town gets a `siege` look: "barricades at gates and debris on streets" (V14 E4 (b),
`:2090`). If it **falls**, the town becomes an occupation: "Occupation is an overlay, never ownership, hatched by
the host's rung" (V13 §3.9 (12), `:2800`) — and "a conquest moves no band (it is an occupation)" (`:2789`). If it is
**relieved**, "+1 to the relieving side at that town's facing segments" (`:2787`).

**DM feels.** Strong. The siege is the place both sides are richest: a weekly hearing card on the host, a barricaded
crop for the table, a hatched town on the map. The one vocabulary snag is below (§2.3): the map speaks of a "lifted
siege" with a "relieving side", while the registry distinguishes `relieved` from `lifted`.

### Week 47 — the aftermath: terms, a razing, or a held town

Three host roads, three map pictures — and here the two sides read as if written by one hand.

- **Terms.** The peace engine drafts terms; a tribute term makes Thornhold a **tributary**, which "keeps its own sway
  outside the allegiance, drawn with its overlord's band" — its border doubled by an inner 1.5 px band in Emberford's
  colour (V13 §3.9 (9); §5.1 `:4085`). A ceded-garrison term keeps the town an occupation overlay "flagged
  `heldByTreaty`" (V13 §3.9 (12)).
- **Occupation.** RD amendment N: "OCCUPATION IS NOT ANNEXATION. Held settlements are HELD … The conqueror may spend a
  generation holding what it took, and losing it is a real outcome. Do not collapse 'occupied' into 'owned'" (RD
  `:918-921`). The map draws exactly that: a diagonal hatch, "dense to light by the host's rung" on the occupation
  ladder (`contested · unstable · extractive · stabilized · vassalized`, WC §1.17.1, `:2891`), becoming a member link
  — Emberford's fill — "only when the host's occupation reaches its vassalized rung" (V13 §3.9 (12)). WC's loyalty
  inverse — "ELECTIVE OVERSHOOT by vassals/occupied = loyalty signaling -> standing toward better terms/RELEASE"
  accelerating the climb toward `vassalized` (WC §1.17.2, `:2910-2938`) — would make the hatch lighten faster for a
  town that over-delivers; unbuilt.
- **A razing** (only if Thornhold's victor is evil — R2: "evil settlements are the only ones that can initiate a
  sacking/razing", RD `:1161`). RD R: "AND THEY LEAVE. No occupation record, no garrison, no vassal ledger, no terms —
  the departure is the signature and the Herald sentence ('They burned Thornwall and rode home')" (RD `:1125-1127`);
  "THE TIER FOLLOWS THE TRUTH: the one-or-two-tier demotion is NEVER a direct write" (RD `:1104`). The map: "a razing
  is an event at the town: the sway re-projects at the tier the host sends next (its own demotion) and the victor
  takes nothing by it — lost cells fall to neighbours by (8) or become unclaimed" (V13 §3.9 (12)). The town glyph
  takes its razed mark; RD's "a town with a city's quiet towers, the saddest and best map this engine can draw" (RD
  `:1124`) is what the frame keeps.

**DM feels.** Delight, with one trap (§2.3 item 2: the razer's own colour may flood the vacated cells). The
vengeance license R2 mints — "a license held by every settlement whose relationship to the VICTIM stands at or above
the adequacy band … ONE war of retribution" (RD `:1172-1178`) — has no picture; the map's only claim outline is the
host's lineage claim (V13 §3.9 (12)).

### Weeks 20–50, in parallel — a holding and a vassal

**Host.** Aldmere became Emberford's vassal by drift (`hostile_occupation_pressure → vassal`,
`relationshipRulesAdversarial.js:344`) or by the occupation ladder's top rung (`vassalizationOutcomes`, WC §1.17.2).
Thornhold, bled, sells its steading Ashford to Merewick through the sovereignty market: "A SETTLEMENT TRADE IS A
TREATY … a peacetime sale for grain and a wartime cession to buy peace are the SAME artifact" (RD S, `:1237-1247`); the
sale clears only two-sidedly on believed value (`:1289-1293`) and is bounded: "a buyer must be able to HOLD what it
buys — lived-route reachability, reinforcement reach within an army-transit leg band … No absentee sovereignty"
(`:1304-1309`). "THE SOLD SETTLEMENT HAS AN OPINION … THE LINEAGE EDGE SURVIVES THE SALE AS HISTORY — the original
parent may later mint a lineage_claim to reclaim what it sold (the seller's-remorse war)" (`:1310-1317`). The Herald
line is headline-class: "Ashford is sold to the Crown of Merewick for seven years of grain; the steading learns its new
master's name" (`:1331-1333`).

**Map.** Aldmere's sway is a member of Emberford's allegiance: its fill flips to Emberford's colour, its border thins
to a member border, and its reach grows by `(1 + B(root) × δ^depth)`; the root's reach grows by the chain bonus B,
bounded by `bMax` 0.5 and `depthMax` 2 — "diminishing returns on chain length: no snowball" (V13 §3.9 (9); `:1405`). If
the vassal is out of the host's reinforcement band and its sway touches nothing of the realm's, it is an **exclave**:
"a member, drawn detached, with no reinforcement and no bonus" with a dotted halo (V13 §3.9 (9); §5.1). The sale
"re-roots the link at its mint, the seller's link kept as a lineage claim (DM view)" — a dashed outline of Ashford's
sway in Thornhold's colour (V13 §3.9 (12); §5.1). A fort Emberford's garrison holds in the wild is a **claim point**:
"A garrisoned site's footprint is held by its holder even in wild or foreign sway" (V13 §3.9 (10); V14 (f),
`:1926-1928`).

**HB (the court that learns).** Dark: "`habitConditioningEnabled` is manifested and lit in no preset" (HB header,
`:14`). Its promise for this moment is a dossier product, not a map one: "The doctrine sheet — twelve lines at most,
one per circumstance class — is a legible artifact a DM can read, a spy can steal, and a liar can forge" (HB §0.2 (c),
`:258-260`), with `siege_pressed` ("own or vassal settlement under siege", HB `:817`) as a circumstance. The owner's
own sentence — "If settlement [A] knows that settlement B genuinely does action Z" — "is NOT expressible at the war
chooser" (HB `:2619`; FOLD OD-FC-23).

**DM feels.** The vassal chain is the map's most *owner-shaped* picture (T2: "contnious chain of vassals", PROG J377),
and the sale is the host's most *headline-shaped* event; together they make a satisfying pair — the Herald says Ashford
was sold, the map re-colours the dot and leaves a dashed ghost of the old owner's claim, which is exactly the seed of
RD S's seller's-remorse war.

### Weeks 24–40, in parallel — a spy and a rumour

**Host.** Emberford sends an operative to Aldenmoor. ES describes the whole craft — cover stories, chained legs,
REFUTE, capture "ONLY at route segments carrying enemy military and at hostile settlements" (ES §0, `:73`) — and
almost all of it is built, but none of it runs: "`espionageEnabled` needs `errandSpineEnabled`, dark in every preset
… no `espionage_*` kind is registered or routed; missions resolve silently" (ES header bracket, `:43`; FOLD §2,
`:339`: "'our spy was caught in Aldenmoor' (no `espionage_*` kind; no autonomous dispatch mount)"). A rumour is live:
the host's rumour stream and the Edit Mode seals "Confirm it · Cast doubt · Twist it" (`src/copy/en.js:1963-1965`).

**Map.** Covert links, their exclaves and covert patrols are "omitted as entities, never greyed" from the player
picture (V13 §5.1, `:4097`); a covert power's patrols are DM-only (V13 §3.9 (14)). The player's believed map is
"re-derived … over the facts that audience knows (an unknown later fact absent, never guessed)" (`:4098`), and the DM
gets `beliefView`: "the believed standing and danger of places and roads in banded words, 'assumed safe' for what the
observer never heard" (V13 §3.11.6, `:3390-3391`). The player picture can be **stale**; it can never be **wrong**.

**DM feels.** This is the thinnest moment of the year on both sides. The host's richest thesis — "BELIEVED, NEVER
TRUE … A realm that WRONGLY believes it can conquer refuses reasonable terms and then fails" (RD N2, `:944-949`) — is
about *courts'* beliefs, and the map draws the *party's* knowledge as a subset of the truth. A rumour that Thornhold's
ford fort has fallen cannot appear on the players' map, and the spy who walked a road the patrols lens tints weekly
faces a capture law that does not read patrols (§2.2 item 4).

### Week 52 — the year's end, scrubbed

**Map.** The sway lens's scrub is "the sway's revision history" (V13 §5.9 (2), `:4387`), keyframed every 52 revisions
(`:1411`). The DM drags the slider and watches: the neutral line becoming a hatched march in spring, crossed blades at
the ford in week 14, the planting line in week 14 taking effect in week 27, the field battle's firm band in week 35
fading a step by 48, Thornhold's hatch thinning toward vassalage, Ashford's dot changing colour with a dashed ghost
behind it. Every revision's reason "names its causes, its dirty box, the law version and the cells each rule moved"
(V13 §3.9 (17)). **Host.** A treaty card with an age line (lit presets), a Herald stream, a dossier. No scrub.

**DM feels.** The scrub is the map's single greatest gift to the host's politics: the host keeps no history a DM can
replay as a picture (PROG J383: "none keeps history (every time scrub needs map-side snapshots)"), and the map turns
a year of dated facts into a film.

---

## §2 Substance verdicts

### 2.1 Where the sway and the FP's politics genuinely reinforce each other

1. **Occupation is not ownership, on both sides, in nearly the same words.** RD N: "OCCUPATION IS NOT ANNEXATION …
   Do not collapse 'occupied' into 'owned'" (RD `:918`); V13: "Occupation is an overlay, never ownership, hatched by
   the host's rung" (V13 §3.9 (12)). The hatch density reading the occupation ladder's rung and the flip to a member
   fill only at `vassalized` is the host's ladder drawn without a single invented fact. This is the best fit in the
   pair.
2. **The razing takes nothing, and the tier follows the truth.** RD R's "AND THEY LEAVE" and "never a direct write"
   (`:1125`, `:1104`) meet V13's "the victor takes nothing by it" and "re-projects at the tier the host sends next
   (its own demotion)". Neither side owns a second writer on the tier.
3. **One comparator decides one contest.** The adversarial push "defers to the host's own settlement-strength
   comparator (the one drift uses for raids and subjugation)" (PROG J384 (3)) — the same `settlementStrength` that
   picks the raid's aggressor (`relationshipRulesAdversarial.js:276-283`) and the subjugation direction. The push is
   compared "on travel time alone at the steeper fade" τmin, so tier, already in reach, does not decide the line a
   second time (V13 §3.9 (8)). A DM who asks "why did the line move toward us?" gets the same answer the host would
   give for "why did they raid us?".
4. **No absentee sovereignty — the same band on both sides.** RD S bounds a sale by "reinforcement reach within an
   army-transit leg band" (RD `:1304-1306`); the sway's continuity and exclave test reads "Treinf — the host's
   reinforcement band from the travel law … never authored here" (V13 §3.9 (9); `:1406`). A sale the host allows will
   rarely draw as an exclave, and an exclave on the map is a holding the host's own market would have refused to
   sell into. (PLAUSIBLE that both read the identical band; neither text names the other.)
5. **The seller's ghost.** RD S's "THE LINEAGE EDGE SURVIVES THE SALE AS HISTORY" (RD `:1314`) and V13's "the
   seller's link kept as a lineage claim (DM view)" are the same fact; the dashed outline is the seller's-remorse war
   visibly waiting.
6. **The planting line, invented twice.** FOLD §4 rules that a slow mechanism declares "a PLANTING LINE at the moment
   of cause" (FOLD `:408`); V13 §3.9 (13) shows "a trigger waiting on its dwell … at once in the `events` layer as a
   planting line". Same word, same ethic (name the cause now, promise nothing), arrived at separately.
7. **The registry supplies the raid's missing word.** The `raid` row's verdicts `repelled · succeeds · bought_off`
   (FOLD §3.4) are precisely what V13 asks the host for in H25 ("a raid's outcome word … the word that makes a raid a
   verdict"). When SP-9 registers it, the map's least satisfying pin becomes a +1 band.
8. **Only a host verdict moves a line; the hearing is where verdicts are born.** V13's "only a host verdict ever
   moves a band" (§3.9 (11)) and the FOLD's hearing week ("the DM may leave it, tilt it or give a verdict", GR header
   bracket `:15`) compose cleanly: the DM's ruling at a siege hearing *is* the dated verdict the map then draws. The
   map never decides a war, and the DM always can.
9. **Encounters inherit politics by address and week.** The crop's patrol, barricade and debris items are "keyed by
   (the address, the week), never a roll, and never a host encounter" (V14 E4 (b)); a party re-opening the same ford
   in the same week gets the same scene on every machine (V14 E1 (1)). Siting also reads politics:
   `territoryBorder` weights a watchpost or a bandit hideout toward "the adversarial allegiance borders and the
   debatable cells of the sway in force" (V14 §2.5, `:983`).
10. **Fail-closed audience, matching K3.** RD K3's "NOBODY IS EVER" reading truth and V13's fail-closed player picture
    ("covert … omitted as entities, never greyed"; "No player view of alignment", PROG J384 (7)) share one discipline:
    neither side leaks the truth to an observer who should not have it.

### 2.2 Where they are thin

1. **Pacts are invisible on the map.** The FP's one lit chain (FOLD:351) is the pact — and the sway reads only
   relationship labels and four subordinating terms (V13 §3.9 (9)). A NAP, a trade-rights pact, a faith or population
   pact, even a mutual-defense clause, draws nothing. The host itself cannot yet make an alliance bite: "'the allies
   came' (`mutualDefenseFor` no caller)" (FOLD `:337`). On a map that redraws for a label change, a signed pact
   changing nothing is the most visible absence of the year.
2. **The army is a dot without a story.** WC — auxiliaries, the war-stance ladder, call-ins, "MASSING IS A TELL" — is
   vocabulary only (WC `:95`); the map's army is "presence only" with "no destination and no arrival time" (V13
   §3.9 (10); §3.11.6). Neither side yet answers "who is marching to whose aid?", which is the question a DM looking
   at a war map most wants answered.
3. **The spy has no surface anywhere.** ES is built-but-dark with no news kind (ES `:43`); the map, correctly, omits
   covert facts from players and draws only DM-only covert patrols. In any shipped preset a spy is a sentence that
   cannot fire.
4. **Patrols and capture do not meet.** ES places capture risk "ONLY at route segments carrying enemy military and at
   hostile settlements" (ES §0); the patrols lens tints exactly that kind of segment by cadence — but the cadence "is
   the map's presentation, and the host never receives them as a time", consumed "only by the host's choice" (V13
   §3.9 (14); H16 "read by outcome rolls only"). A DM will assume a weekly patrol on the spy's road matters to the
   spy. It does not, unless the host adopts `patrolOffer`.
5. **The believed map is a lagged truth, not a belief.** The host's best stories are false beliefs (RD N2, N3's
   "righteous atrocity", Q's traitor-envoy). The map's player picture can only omit (V13 §5.1, `:4098`); a rumour
   cannot be drawn, nor what a *court* believes its border to be. The DM's `beliefView` gives banded danger words, not
   believed borders. In the default preset (omniscient) there is no belief at all.
6. **The hearing week is the hinge and it is unbuilt.** Pending cards are the "FIRST-VISIBLE sign" of every kind (GR
   `:15`; WC `:96`; ES `:44`), SP-9 is "THE HEAD OF THE CHAIN ORDER" (FOLD `:388`) — and until it lands a pact
   proposal is invisible for 4–18 weeks (GR `:435`), a siege resolves inside a month advance on the engine default,
   and the raid has no word.
7. **Vengeance and grievance have no geography.** R2's vengeance license (RD `:1172`), S's "our parent sold us to
   strangers" grievance (`:1311`), N3's "they could have taken everything and did not" (`:975`) are the host's most
   characterful political facts and none reaches the sway; the claim outline exists only for lineage claims, which run
   only "while that lane is lit" (V13 §2.2 `claims`, `:1000`: "dark in every shipped preset").
8. **HB has no map face.** The habit sheet is a dossier artifact (HB §0.2 (c)); nothing in V13 reads it, and nothing
   should yet — but "Thornhold always sallies when its granaries run thin" is exactly the kind of fact a DM would want
   pinned beside the march.

### 2.3 Where they contradict or double-count

1. **A non-aggression pact under a hostile label.** The sway's class is "read through the adapter folder's class table
   over the host's relationship-state labels" (V13 §3.9 (8)); a pact signed by a `hostile` or `cold_war` pair leaves
   the pair **adversarial**: debatable march, strength push and patrols "moved one rung by an adversarial neighbour"
   (§3.9 (14)) all continue. The host meanwhile prices the pair as treaty-bound. A DM reads "they swore peace and the
   map still shows a contested march with doubled patrols" as a contradiction, and from the map's own text it is one.
   Candidate: a live non-aggression term reads **neutral** for the class, as "a compelled ally — a live
   compelled-alliance term" already reads respect (§3.9 (8)).
2. **The razer's colour floods the ash.** "Lost cells fall to neighbours by (8)" (V13 §3.9 (12)). If the razer is the
   adjacent adversary — the usual case after a won siege — its reach already covered part of the victim's land, and
   after the victim's demotion the razer's fill will advance over cells it never occupied. RD R's signature is
   "AND THEY LEAVE … all of the punishment, none of the responsibility" (RD `:1125-1129`); the map will *look* like
   taking. Candidate: the razer's push into the razed seat's former cells is held (unclaimed) for a dwell, or drawn
   with a scorched hatch, so the departure reads.
3. **`relieved` versus `lifted`.** The registry's siege verdicts are `holds · falls · relieved · lifted` (FOLD §3.4);
   V13 credits "a lifted siege or a liberated occupation, +1 to the relieving side" (§3.9 (11)). A siege the besieger
   simply abandons has no relieving side; a relief battle is `relieved`. The map's rule should key on the host's two
   words separately (relieved: +1 to the relief; lifted: the defender's hold, or none).
4. **Raids move lines after all — indirectly.** J384 (5) says a drift raid "moves no line". But the strength comparator
   the push defers to reads `(1 − pressure.conflict)` and a `warCostPenalty` (`relationshipRuleHelpers.js:321-328`),
   and the raid adds a `war_pressure` condition to the victim. A season of raids can lower the victim's strength band,
   which after its 13-week dwell pushes the line toward it. This is honest (the host's own comparator) and arguably the
   right drama — but the DM's mental model "raids never move borders" will be wrong, and the `whyCell` answer must
   name the band change, not the raids.
5. **A vassal's force, three times over once WC lands.** The sway's tie-break counts each member seat's own force band
   and "each continuous member's force (`memberForce`, × δ^depth)" into the overlord's M (V13 §3.9 (10)). WC's
   directive is that a vassal sends blocks "at the cost of reinforcing their own" (WC §0.1). If the host's force band
   for the vassal is not net of its contribution, the same soldiers count at the vassal's seat, in the overlord's
   `memberForce`, and inside the overlord's own field army. Today WC is unbuilt and the risk is nil; it becomes a real
   double count the day WC-4 lands.
6. **The gate keeper.** The sway may show Thornhold's colour over a pass while the host's toll and interception at that
   gate stay with "the intermediary settlement whose territory the path crosses … until the sway has passed its soak"
   (H16; PROG J385 gap 5). A DM who reads the map as ownership will be surprised where the toll goes. The legend must
   say so on the crossing.
7. **Two "contested"s.** The host's occupation ladder's first rung is `contested` (WC §1.17.1); the map's march is
   "the debatable land … never a bare *march*" (V13 §3.11.6 vocabulary, `:3429-3431`) — so a contested occupation can
   sit hatched inside a debatable land. Not a logic fault; a vocabulary snag the legend should own.

### 2.4 What a DM would find confusing, and what delightful

**Confusing.** (a) The two partitions — total seat territory versus a sway with wild land — on day one. (b) Five
regimes and two banners (enforced, civil, provisional, recipe, still; "level", "water bars") before any war happens
(V13 §5.9 (2)). (c) Crossed blades with no winner (§1, week 14). (d) A pact that draws nothing; a NAP that draws
hostility (§2.3 item 1). (e) An army with no destination. (f) A sale's exclave: a DM who never heard of Treinf sees a
halo and needs `whyCell` to learn the town is out of reinforcement reach. (g) Small reaches: a town claims under a
day's walk, so a campaign of a handful of seats spread across a region is mostly wild, and two rivals far apart have
no march for their war to be fought over — the battle's band then lands on whatever segment `borderSegment` finds
"nearest the two seats' line" (V13 §3.11.6, `:3335`), which may be none.

**Delightful.** (a) The hostile label becoming a hatched ribbon and thicker patrol tints. (b) `whyCell` — a per-acre
answer in the host's own terms. (c) The planting line: a border change announced a season before it happens. (d) The
encounter at the ford: debris from last week's fight, a patrol in the right colours passing on its fixed weekly phase,
a barricade at the border post, exported to the VTT with a stable grid origin (V14 E3). (e) The occupation hatch
thinning rung by rung toward vassalage. (f) The razed glyph and the shrunken reach. (g) Ashford's dot changing
colour with a dashed ghost of the seller behind it. (h) The scrub: a year of politics as a film.

---

## §3 The five best and five worst moments

**Best**

1. **The occupation hatch, rung by rung, until the fill turns.** RD N's "Held settlements are HELD" (RD `:918`) drawn
   as V13's hatch "dense to light by the host's rung", flipping to a member fill only at `vassalized` (V13 §3.9 (12)).
   Nothing invented, everything legible, a generation of politics visible in one town.
2. **"They burned Thornwall and rode home."** A razed glyph, a reach shrunk to the host's new tier, no occupation, no
   gain written (RD R `:1125`; V13 §3.9 (12)) — the host's darkest sentence and the map's most honest picture
   (subject to §2.3 item 2).
3. **The encounter at the ford in a patrol week.** Debris because the segment is fighting, a patrol in Emberford's
   colours because `patrolAt` says one passes, a barricade at the border post, a legend naming the holder — all keyed
   by address and week, never a roll (V14 E1 (4), E4 (b)). Politics arriving at the table without the DM authoring it.
4. **The hostile label becoming a march, with a planting line.** Drift's `cold_war_escalation`
   (`relationshipRulesAdversarial.js:226`) turns a line into a cross-hatched debatable land at once, and a strength
   change waits a season in the `events` layer before it moves anything (V13 §3.9 (8), (13)).
5. **Ashford sold.** The Herald's headline-class line (RD S `:1331`), the dot re-rooted at the sale's mint, the
   seller's dashed claim left behind as the seed of the seller's-remorse war (V13 §3.9 (12); RD `:1314`).

**Worst**

1. **The raid nobody won.** Crossed blades at the victim, no band, no word on either side (J384 (5); the host computes
   no outcome). The default preset's most frequent beat is its least satisfying pin until H25 or SP-9's `raid` row.
2. **The pact that changes no map — and the NAP that shows a war.** The FP's one felt chain draws nothing; a NAP
   between hostile-labelled rivals keeps the march, the push and the doubled patrols (§2.2 item 1, §2.3 item 1); "the
   allies came" cannot fire on the host (FOLD `:337`).
3. **The spy.** Built, dark in every preset, no news kind, no map face, and a patrols lens that looks as if it should
   matter to capture and does not (ES `:43`; V13 §3.9 (14)).
4. **The army marching.** A mover at a fraction of a road with "no destination and no arrival time" (V13 §3.11.6); no
   auxiliaries, no call-ins, no massing tell (WC unbuilt); in the default preset, no army at all.
5. **The razer's colour over the ash** (§2.3 item 2) — the one place the map would quietly tell the opposite of the
   host's sentence, at the host's most consequential moment.

---

## §4 Open questions of substance

1. **Should a live non-aggression or alliance term set the sway's class?** The map already lets "a live
   compelled-alliance term" read respect (V13 §3.9 (8)). Extending that to the GR families (NAP → neutral; mutual
   defense → respect) is a reading of host facts, not an invention — but it reads treaties the host itself does not
   yet enforce (`mutualDefenseFor` no caller). Draw the promise, or wait for the host to keep it?
2. **What does the razed seat's former land do for the first season?** Fall to the neighbour by (8) at once, or stand
   unclaimed (or scorched-hatched) for a dwell so RD R's "AND THEY LEAVE" is what the map says?
3. **Is SP-9's `raid` the drift raid?** The registry names "the war volume (border incidents)". If the drift raid
   (`hostile_raid`, lit in every preset) is not registered, H25 remains the only route to its outcome word; and what
   does `bought_off` move — nothing, or +1 to the payer's opponent?
4. **`relieved` and `lifted`, and `withdraw_a`.** Which registry verdicts move a `MarchHold` band, by how much and for
   whom? A siege `lifted` with no relief, an `armies_meet` ending `withdraw_b` or `stand_off` — is a withdrawal a won
   field?
5. **Where is the war fought when sways do not touch?** With town reaches under a day's walk (V13 `:1396`), rivals
   weeks apart have no debatable land. Should `borderSegment` fall back to the midpoint of the seats' line in wild
   land (a "fought-over wild" mark), or should a war between non-touching sways simply draw no march?
6. **Should patrols feed capture?** ES's capture law and the patrols lens describe the same roads. Offering patrol
   coverage to ES's capture roll (through `patrolOffer`, the host's choice) would make the lens matter to the most
   covert play the host has — or would make a map presentation a hidden input to a dice roll. Which does the owner
   want?
7. **Whose belief is the player picture?** V13 draws "the party's believed rows" where the host records belief (V13
   §5.8 (7)); the host records belief per *court* (beliefMap), and a party is not a court. Does the party take its
   home seat's beliefs (so a rumour Emberford believes *can* draw falsely on the players' map), or only what the
   party itself witnessed? The answer decides whether the map can ever tell the host's best stories.
8. **Does the host's force band net out what a vassal has sent?** Once WC lands, the sway's `memberForce` must read a
   force band that excludes blocks already marching in the overlord's army, or the tie-break counts the same soldiers
   twice (§2.3 item 5).
9. **Should vengeance and grievance draw?** R2's license and S's sold-town grievance are durable, dated, pairwise host
   facts — exactly the class the claim outline already draws for lineage claims. DM-only outlines for both would cost
   no new host fact; is that wanted, or is the claims row deliberately kept to the lineage lane?
10. **What does a year look like at the default preset?** No war layer, omniscient belief, a pact every 1.3–3 years,
    raids without outcomes: the map's richest machinery (held by force, MarchHold, occupation hatch, the siege crop)
    may never fire for most campaigns. Is the sway's war half a premium-preset feature, and should the lens picker say
    so the way born-campaign lenses say "still" (PROG J384 (13))?
11. **Is the accepted border post a dead pin on a host-bound world?** "An accepted border post projects nothing until
    the host names its holder and garrison" (V13 §3.9 (16)); V14 refuses the DM's holder entry on a host-bound world
    (V14 §2.2, `:560`). Which host act names it, or does the DM's accepted fort stay holderless forever?
