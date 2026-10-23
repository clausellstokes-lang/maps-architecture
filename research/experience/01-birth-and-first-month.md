# Experience read 01 — the birth of a world and its first month of play

> Provenance: written by Opus 5.5 under the Fable manager (J392); read and weighed by the manager's synthesis.

**What this read is.** It looks at the paired product as a DM and their players would meet it, from the moment the DM
opens SettlementForge to the end of the first one-month advance on a world the map module grew. It judges what they
get and how it feels. It does **not** judge implementation time, cost, debt or build order, and it mentions a milestone
only where the texts make the experience depend on it. Map-side sources are this repository at branch
`claude/focused-cray-qhz855`: `docs/volumes/V13-world.md` (cited `V13 §n`), `docs/volumes/V09-application.md`
(`V09 §n`), `docs/design/spine-world-growth-2026-10-23.md` (`spine §n`) and `docs/PROGRESS.md` (`Jnnn`). The research
note `research/sf/lens-implications.md` is cited as evidence only. Host-side sources are SettlementForge at `81f1cd96`,
read-only: `src/lib/instantWorld/composeInstantWorld.js` (`composer`), `composerPipeline.js`,
`src/domain/instantWorld/worldPlan.js` (`worldPlan`), `docs/DESIGN_FP_COHERENCE_FOLD.md` (`fold`),
`docs/DESIGN_FP_SPINE.md` (`FP spine`) and `docs/DESIGN_FP_ARCH_GR.md` (`ARCH_GR`).

**Evidence words.** **READ** means the cited text says it. **READING** means it is my inference from several texts that
together imply it and do not state it. **OPEN** means the texts do not decide it (these go to §4).

**The DM in this read.** A premium DM. That is the only kind who can play this slice end to end: "campaigns are
created and advanced only under the premium tier (staff aside)" (J389), and "the SIMULATOR is premium" (fold §1
req 17). The DM runs a nine-settlement realm, the instant world's default "Medium" size (worldPlan `REALM_SIZES`), under
the "Realistic" tone, whose preset is `realistic_regional`. The read stops wherever a free or anonymous user's path
differs.

---

## §1 The walkthrough, moment by moment

### Moment 1 — the DM makes a realm (the host, today)

**What happens.** There are two doors. The DM either assembles saved settlements into a campaign by hand, or presses
the instant world. The instant world asks one question as a modal before anything exists: magic. Its two answers are
"A world of magic" and "A mundane world — No working magic anywhere in the realm. Gods and temples remain."
(worldPlan `MAGIC_CHOICES`). It then reads three chips: size (Small 5, Medium 9 or Large 14 settlements), tone
(Quiet, Realistic or Dramatic, each mapped to a simulation preset) and map kind (an island template such as
"Mountainous Island", "Volcanic Island", "Atoll" or "Supercontinent", or a random one) (worldPlan `REALM_SIZES`,
`TONES`, `MAP_KINDS`). The composer's ten declared steps run in a fixed order: `derivePlan` → `openCampaignIdentity`
→ `mintMembers` → `dedupeFactionNames` → `materializeGenesisTies` → `placeMembers` → `discoverChannels` →
`applyTonePreset` → `buildMapState` → `assembleCampaign` (composerPipeline `COMPOSER_STEP_CONTRACT`). Every member is
minted from the default configuration with its trade access, culture and threat left on their random sentinels
(composer `memberConfigFor`). Each settlement's terrain, culture and route word is therefore rolled independently of
its neighbours. The members are placed by "a seeded jitter in the central box" (worldPlan, the placement scatter).
Genesis ties (partners, rivals, overlords) are assigned to the sites by the diplomacy fork. The bundle "places
everything, canonizes nothing": the settlements are canon saves, but the realm's spatial canon is left unfrozen
(composer header). The geography is "iframe-bound": it materializes from the seed when the realm map opens.

**What the DM sees.** One modal, three chips, and a populated campaign a moment later. The settlements are scattered
over an island they were not made for. The plan's own comment tells them they can fix it by hand: "every site is freely
draggable at t=0, so exact coordinates are COSMETIC IN PLAY" (worldPlan, the placement-scatter comment).

**What they feel.** Speed and abundance: nine dossiers, each with people, trades and history, in one click. This is
the host's strongest existing moment, and the rest of this read is about what the map module adds to it or takes away.
The terrain-blind scatter is its known weak spot. V13 names it as such: "its instant world's terrain-blind scatter
replaced by a run with `include` set, so a generated campaign's seats land where their words say" (V13 §8.5 H31).

### Moment 2 — the DM opens the world (the map module, generated first)

**What happens.** In the paired product the host's realm map is replaced by the module's world. H19 re-points the
host's map surfaces and H31 replaces the scatter. A world document "opens already generated … the dialog open beside
the map with every option reading **random** and its rolled value shown greyed beneath it ('random — rolled: temperate,
42° N'). There is no wizard and no empty state: the user edits a world, never a form" (V09 §4.22 (1); spine §6; V13
§3.1 (1)). The panel follows the owner's layered words: **Random all** with the seed beside it, **Basic** always open,
**Advanced** in collapsible groups, and **Deep constraints**. Every option cycles random · set · locked (V09 §4.22
(2)–(3)). The Basic layer's **Include my settlements** toggle turns each dossier into read-only derived chips, for
example "Kessar: desert, river, caravan route", each with its status after the run: met · corrected · unmet with its
offer (V09 §4.22 (5)).

**What the DM sees.** A real map at once, a panel that shows both what was rolled and what was chosen, and their own
settlements turned into small requirement chips.

**What they feel.** This is the best first screen in either product. The DM does not configure a world; they
correct one. The rolled values sitting under every "random" chip teach the panel without a tutorial. The derived chips
say, in effect, "the world knows what your towns need", which is the owner's "based off of my settlements" (J392 F7)
made visible before anything has run.

**Where it frays (READING).** The instant world's own knobs have no home in this dialog. The map-kind chips ("Volcanic
Island", "Atoll") are FMG templates. V13's templates are `continent`, `archipelago`, `peninsula`, `highland`,
`riverlands` and `coast`, plus the formation scenarios (V13 §3.1 (3)). No text maps one set onto the other. The tone
chip decides which host lanes run, and so which lenses will ever move (§5.8 (2)), yet tone appears nowhere on the world
dialog. A DM who chose "Volcanic Island" in the host's modal and then opens a world with no volcano has been ignored.
Nothing in either text tells them so (OPEN, §4 Q1).

### Moment 3 — the preview, and what the world must solve

**What happens.** Every option change previews "as the coarse run … a thumbnail within 300 ms at the realm rung", and
"the preview is the run — the same stages on the coarse grid, never a cheaper proxy". The thumbnail carries "the
verification report's summary ('3 of 3 inclusions met')" (V09 §4.22 (4); V13 §3.1 (7)). With the include toggle on,
W0 turns each settlement into rank-1 requirement rows: its terrain word as a relief class, coast and river flags, its
coast side, its route word, a climate row from DR42, a latitude band from its culture, its resources and its tier.
Each relation becomes a `relation` row (V13 §3.1 (5)). W0 then lays the **planned sites**: "capitals and overlords
first by tier … partners within `relation.travelDaysMax` of each other under the default travel law's foot pace over
the straight line …, rivals across a planned boundary …, vassals within their overlord's tier reach …, isolated seats at
the far side of the extent" (V13 §3.1 (5); spine §4.2).

**What the DM sees.** A thumbnail that moves as they move chips, and a running count of what fits.

**What they feel.** Control without risk. The 300 ms promise is the one number a DM will notice, and it holds only
"when no scenario knob changed". A formation scenario costs the bake's time, shown with a progress strip and the last
thumbnail meanwhile (V09 §4.22 (4)). That cost is honest and it is labelled.

**The substance underneath (READING, and important).** The instant world rolls each member's culture and terrain with
no knowledge of its neighbours (Moment 1). The world must then justify the dice. Two settlements "needing arid and
tundra land widen a random latitude box; a port and an inland capital raise a random land share's sea" (V13 §3.1 (5)).
In a nine-member realm with random cultures, the latitude box is set by the most distant pair of culture bands, not by
any idea of the realm. The world that results is coherent (every town "lands where its own dossier says it belongs",
V13 §0). Its *shape*, though, is the residue of nine independent rolls. That is the price of "grows around its towns"
when the towns were never meant to share a land (OPEN, §4 Q2).

### Moment 4 — conflicts before the run commits

**What happens.** On **Random all** with settlements included, the process "never asks about ranks 4 and 5, so
'Random all' keeps its one-click promise: conflicts there resolve to the safe defaults (`fitWorld`; `keepMismatch`
flagged) and the run's summary says what was done" (V13 §3.11.5 (1); spine §5.2). When the DM has **set** something
that crosses a dossier (say a cold climate band over a desert town), the conflict list opens before the run commits.
It has "one row per affected settlement with the fact, what the change would make of it, and the choices — **Cancel**,
**Fit the world**, **Paint around**, **Keep the mismatch**, **Update the dossier** …, and where the ladder allows them
**Move the settlement** and **Change my request**" (V09 §4.22 (6); spine §5.3). The pop-up previews consequences:
the dossier fields that would change, whether the host's economy or food would feel it, and what the host will do. "On
a draft settlement a regeneration under its same-seed law — its people, trades and history drawn again …; on a
canonized settlement a decree applied at the next advance, not this week" (V13 §3.11.5 (1), `hostEffect`). The dossier
"changes only on the user's approval here … and shows the change done only on the host's `dossierUpdated`"
(`W_DOSSIER_PENDING` until then) (V13 §3.11.6).

**What the DM sees.** In the one-click case, a summary line. In the set case, a list with up to seven buttons per row
and a consequence preview per row.

**What they feel.** Trusted. The map never quietly rewrites a town. The preview warns that "Update the dossier" on a
draft settlement re-rolls its people, which is the most dangerous button in the paired product, and the warning is
exactly where it is needed. The instant world's members are minted as canon saves (composer), so for them the
safer "the land changed" decree is the default kind. The weight is real, though: nine settlements with two crossed
facts each make an eighteen-row list with seven choices per row. Nothing in V09 says how the list behaves at that size
beyond "one stroke … lists them all" (OPEN, §4 Q7).

### Moment 5 — Generate: the world grows, and explains itself

**What happens.** Generate runs the same stages on the fine rung with the same seed, requirements and decisions
(V13 §3.1 (7)). The formation op, if a scenario was set, "raises its ranges where mountain seats and needed rain shadows
are and forms coasts where ports need them". W1 adds local ops (`origin: 'solver'`). W2 forms the lake seat's lake and
the strait between rival ports. W3 checks each site's climate and sends at most three bounded back-steps for "the
smallest cause: a range upwind, a basin without outlet, a cold current's coast, a narrowed sea". W4 routes a real river
from a real source to the riverside seat. W5–W8 verify. P1–P5 "drop the settlements onto the sites the world was
grown around (the blend minimal by construction)" (V13 §3.0 the duties; §3.1 (5); spine §4.2). The run ends with the
**verification report**: "every row met, partly met or unmet with its reason (`whyCell`'s form: 'arid at 180 mm/yr in
the Greyspine's shadow'), the back-steps taken with their ops, and the offers for the unmet (a larger world, a wider
latitude box, more relief) … never faked" (V13 §3.1 (7)). Every stage writes a `ReasonRecord`, and the clerk answers
`why`, `whatCaused`, `whatChanged` and `whatIf` (V13 §4.7). The host's genesis road network is laid at world birth
"with the founding members placed first" (V13 §8.5 H12), and W7 lays those edges over the world's ground.

**What the DM sees.** Their nine towns sitting where their words say: the port on a coast facing the right way, the
river town on a river that comes from somewhere, the desert city behind a named range. Roads follow the ground between
them, and a report in plain sentences.

**What they feel.** This is the moment the pairing exists for. A dice-rolled word in a dossier ("desert") gains a
physical cause the DM never wrote, and can tell the table: *Kessar is dry because the Greyspine takes the rain*. The
host's Law One says the engine "never contradicts a DM's canon" (FP spine §1 req 1). The map goes further and
*explains* the canon. Over-claiming is barred: an unmet row says so and offers a fix (V13 §3.0, "never faked").
Organic correction is ruled "never a random arid dot in the middle" (V13 §3.11.1; J392 F7, T-V13-64).

### Moment 6 — the picture at birth

**What happens.** The default picture is `relief`: a hypsometric tint with hillshade, water, routes "by the host's grade
on a host-bound world … lengths labelled in km (never a travel time on the world view)", settlement glyphs and
labels. Two layers draw over it. One is the land-cover overlay of "fields, pasture, coppice, fallow, scrub, regrowth and
scars at the plate's week" (V13 §5.1; J394). The other is the sway, drawn in its **provisional** regime: "a host-bound
world before its first polity window: each seat projects at its tier with the middle rung …, labelled 'before the
host's first polity window'" (V13 §5.9 (2); §3.9 edges). The lens picker lists eight lenses. Each lens's banner is
computed from "the regime the host resolves and sends with each lens window". A window with no regime raises
`W_LENS_REGIME_ABSENT`: "every banner reads 'the host's regime not sent'" (V13 §5.8 (2)).

**What the DM sees (READING).** The lens window is sent "after every advance, undo and resume" (V13 §8.5 H23).
Plates "start at the first advance the map observes" (V13 §5.8 (8)). The cover plate folds "at every lens window's fold
… and at every `disturb`" (V13 §3.6 (5)). So at birth, before any advance, the lens picker is a column of "the host's
regime not sent" banners. The land-cover overlay has no plate to draw, so the towns stand in wild potential vegetation
with no fields. The sway is labelled provisional. None of these texts names a birth-time window or plate.

**What they feel.** A beautiful, physically convincing land that looks *unsettled*: towns of thousands with no fields,
and an instrument panel whose every dial says it has not been told anything yet. The honesty is correct. As a first
impression of a campaign that "lands the user IN a campaign" (composer header), it undersells the realm (OPEN, §4 Q3).

### Moment 7 — the canon at birth

**What happens.** "**Every** new campaign on a world from this module is so born, whatever its tier — the product
ruling the host implements, never an offer it may decline" (V13 §8.5 H22; J386, J387). Door 1 no longer gates it
(J396 (1)). The first canon is adopted as the campaign is created. Its genesis network is laid at birth, "so the
canon-gated lanes its rules light run from its first week". On the birth defaults that means "the crisis columns, the
plague front and the routed supply links". Rite adoption, pilgrim catchments and booms run "only where its rules carry
them (an applied preset, never the birth defaults alone)" (H22). A seat added later joins by the host's **additive
re-canonize**, unasked, with any travel-band crossing reported (`W_TRAVEL_BAND_CROSSED`, `keep` its one action)
(V13 §3.11.6; J388). "A seat's removal, a re-canonize that shifts other geometry and a retcon stay premium" (H22).

**What the DM sees.** Nothing directly. Canonizing at birth is a background act with no screen in V09.

**What they feel.** At best, that "it just works": caravans, plague fronts and columns use real ground from week one,
with no premium "canonize" button to discover. The fold records that today "nothing writes `ensureGenesisRouteNetwork`,
so the migration menu is EMPTY in every shipped world" (fold §2, the POPULATIONS row). A genesis network laid at birth
is the pairing's quiet fix for that (READING). At worst there is a contradiction they will hit within minutes: see §2.3
on the t=0 drag.

### Moment 8 — the first one-week advance

**What happens on the host.** The **hearing week** governs one-week advances. "The engine never resolves a climax in
the tick it arrives: the resolver writes the engagement to the HELD DOCKET … with its default verdict … the DM may
leave the hearing to the engine, TILT it … or give a VERDICT" (fold §1 req 24 (b)). The pending card is the kind's
first-visible sign: "who, upon whom, where, the default verdict, and nothing about what the DM might do" (req 24 (g)).
The registry's first lit rows are `pact_acceptance`, `envoy_hearing`, `siege` and `armies_meet` (fold §3.4, ruling (2)).
All of it sits behind the dark `hearingWeekEnabled` flag, and it is chain C0 (fold §6). In a born realm's first week,
the default preset's one lit chain is pacts (fold §2, "The one lit chain"). The GR-2 bracket says: "FIRST-VISIBLE: none
for an engine proposal inside a one-month advance (the answer is due in 4–18 weeks and no proposal or refusal line
exists); the signing beat is event-timed, about one signing per 1.3–3 years per world" (ARCH_GR GR-2). The
lifecycle voice GR-0 is dark in `realistic_regional` (ARCH_GR GR-0 bracket). The patron's fall is "VACUOUS on every
born world because the birth preset seats no deity" (fold §2).

**What happens on the map.** The first lens window arrives with its regime, and every banner resolves. The sway leaves
"provisional" for **civil**: "held by force only by a host fight verdict's hold band …, and the legend says the host's
military reading is not yet sent" (V13 §5.9 (2)). A trigger waiting on its dwell, most of them thirteen weeks
(`prosperityDwellWeeks`, `strengthDwellWeeks`, `culture.dwellWeeks`; V13 §2.3), shows "at once in the `events` layer
as a **planting line** — its fact, its week and the week it takes effect if it stands" (V13 §3.9 (13)). The first
cover plate folds, and fields appear around every seat by population × land per person, met by travel time from the
seat (V13 §3.6 (5)). The trade lens's regime is **arrivals** or **loads** on the canon (V13 §5.9 (4)). The evidence
note records that the instant world's applied "Realistic" (RRa) runs the M6a load model on the canon, while a campaign
born plain (RRb) runs M2 (`lens-implications.md` §1.2 item 6). The plague lens is **still**, because "at the host's
default tuning organic plague is silent" (V13 §5.8 (3)). Religion reads **none**: "a creed exists only once the DM
seats one — a born world holds none" (V13 §5.9 (6)). Alignment reads **born**, with its note: "on a born world the
host's tables lean malicious and belligerent … the host's vocabulary, not the realm's history" (V13 §5.9 (8)).

**What the DM sees (READING).** After one advance in which nothing happened, the map changes more than it will in
any later quiet week. Fields appear. Borders re-draw from the middle rung to the real rungs, unless those wait on
dwell (OPEN, §4 Q4). Eight banners turn from "not sent" into their regimes, and most of those regimes are still. The
Herald, meanwhile, says little. The state-prose lanes P/PR are "WIRED and live", while the causal headline lanes are
dark (fold §2, the SPINE row).

**What they feel.** That the *map* moved and the *world* did not. The honest captions ("before the host's first polity
window", the planting lines) make this explicable, but only to a DM who reads legends. Most will see borders shift after
an uneventful week and ask "what happened?". The answer is "the host told us its numbers", which is a fact about the
software and not about the realm.

### Moment 9 — weeks two to four, or one one-month advance

**What happens.** At a month advance, "every HEARING [runs] on the engine's default without stopping … each hearing
still mints its docket record for one tick and leaves its receipt ('resolved by the engine's default verdict')" (fold
§1 req 24 (c)). Requirement 16, the owner's law: "a one-month advance must surface at least the mechanism's fast-layer
sign (a band word, a beat, a dossier line) … A wave whose FIRST-VISIBLE line fails its experience read does not LIGHT".
Requirement 19: "A mechanism is DONE when its DM-felt sentence fires in a lit preset on a seeded world". On the map:
supply arrivals show as dated links at the consumer, "arrived week n" (V13 §5.9 (4)). Debatable land can appear,
because in the default preset relationship drift "mints hostile pairs, raids and subjugation proposals without any war
layer" (`lens-implications.md` §2, the debatable row). A drifted raid, however, "names aggressor and victim … with
**no outcome and no place**" (ibid.), so it is not a verdict and moves no hold band until H25 (V13 §5.9 (2); §8.5 H25).
Prosperity reads **frozen** on a plainly born campaign ("this band has not moved: the campaign runs no prosperity
writer") and may move on the instant world's applied preset (V13 §5.9 (7); `lens-implications.md` §1.2 item 6).

**What the DM sees.** A handful of supply arrivals, perhaps a cross-hatched strip between two drifting rivals, many
planting lines counting down to weeks that are a season away, and auto-resolved receipts if any hearing existed.

**What they feel.** That the world is waiting. The fold's own diagnosis stands for this slice: the October
experience reads found the lit layers "nearly silent at the table" (fold §1 req 16). The map does not make the quiet
louder. It makes the quiet *visible and explained*, which is better than silence but is not drama.

### Moment 10 — what the DM is told and asked in month one

| channel | what it says in month one | source |
|---|---|---|
| the verification report | what the world did for each town, met / partly / unmet, with the cause | V13 §3.1 (7) |
| the conflict list | nothing, unless the DM edits; then the seven choices | V13 §3.11.5 (1) |
| regime banners | "not sent" at birth, then mostly still words with their reasons | V13 §5.8 (2)–(3) |
| planting lines | the sway changes coming in about thirteen weeks | V13 §3.9 (13) |
| land-cover legend | "the host's dossier holds the biome" | V13 §5.8 (9) |
| hearing cards | at a one-week advance, a pending card per climax, if C0 is lit; else nothing | fold req 24 |
| the Herald | state prose; no pact line inside a month; no causal headline | ARCH_GR GR-2; fold §2 |
| band crossings | only if a seat is founded (the additive re-canonize) | V13 §3.11.6 |

The DM is **asked** almost nothing in the first month. The questions all came at birth (the conflict list) or come
after a DM edit. One map → host path carries world words into the host's prose: `placeOf(world, where)` → "the
hearing card's words for a `WorldWhere`" (V13 §3.11.6), adopted by the host under H16. Without it, the Greyspine and
the river the world grew never appear in a Herald line (READING).

### Moment 11 — the DM touches the world in month one

**What happens.** The DM paints. Under "always so" a biome is an **Override** that the physics derives around. Under
"this happened" a fire, flood, clearing or eruption is a dated **Disturbance** that the land recovers from (V13
§3.14.1; spine §7). A painted biome over a town raises the conflict list. "Clearing and regrowth never raise the
conflict list … only a change of `biome` can" (V13 §3.6 (5)). "Update the dossier — the land changed" sends a request.
The host applies it as a decree "at the next advance, not this week", and the map shows it pending until then (V13
§3.11.5 (1), §3.11.6). Every physical change offered to the simulation waits on the host's tick head or its receipted
re-canonize (`physicalChange`, H15).

**What they feel.** Power with a clear chain of custody. The map's change is seen at once on a side copy, committed
on the map, and offered to the host. The host acts a week later. A DM who burns a forest sees the scar at once and
the town's dossier unchanged until the advance, labelled pending. That is coherent, and it may surprise: a fire is
instant on the map and a week late in the town.

---

## §2 Substance verdicts

### 2.1 Genuinely strong

1. **"Based off my settlements" is real, and it explains rather than paints.** The planned sites from relationships,
   the stage duties, the bounded back-step and the verification report (V13 §3.0, §3.1 (5)–(7); spine §4) give the
   DM something neither product had: a physical *reason* for every dossier word. "The rain shadow of the Greyspine"
   (V13 §3.11.1) is a line a DM will read aloud at the table.
2. **Generated first, with the rolled values shown.** "random — rolled: temperate, 42° N" (V09 §4.22 (1)) is the
   clearest piece of interface design in the slice. Storing the choices apart from the rolled facts, so that a reroll
   never pins what was merely rolled (V09 §4.22 (3)), is the host's config/_config law carried over. It will save DMs
   from a whole class of "why did my reroll keep that?" surprises.
3. **The preview is the run.** "Never a cheaper proxy" (V09 §4.22 (4)) means the thumbnail cannot promise a world the
   Generate button will not give.
4. **The dossier is sovereign, and the conflict list says what each button costs.** Rank 1 is the dossier (V13
   §3.11.5 (1)). The only button that changes a town routes through the host's own command. The preview names the
   worst consequence, a draft re-rolled, before the click. This is the paired product keeping the host's Law One at
   the seam.
5. **The lenses refuse to lie.** The four mark classes, the refusal list and the still mode with its reason (V13
   §5.8 (3)–(4)) mean that a quiet world *looks* quiet and says why. "A border, a march, a patrol or an army neither
   stops nor slows it: the host's plague reads none of them" (V13 §5.9 (1)) is the kind of sentence that stops a DM
   drawing wrong conclusions from a pretty map.
6. **Roads and lanes from week one.** A genesis network laid over real ground at birth, with the lanes the canon
   gates running at once (H12, H22), fills a hole the host's own record admits: the empty migration menu (fold §2).
7. **The two verbs.** "This happened" and "it was always so", on every physical layer, give the DM a single mental
   model for retcon and history (V13 §3.14.1). That model also matches the host's decree and retcon kinds at the
   dossier seam (V13 §3.11.5 (1)).

### 2.2 Thin

1. **The first month's simulation is close to silent, and the map's honesty makes that visible.** In the default
   preset, pacts have no first-visible sign inside a month (ARCH_GR GR-2). No deity is seated (fold §2). Organic plague
   is silent (V13 §5.8 (3)). Prosperity is frozen on a plainly born campaign (V13 §5.9 (7)). Sway dwells are a season
   (V13 §2.3). The fold's summary covers the host: "Everything else in thirty volumes is a flag away or a build away"
   (fold §2). The lens build order puts **plague first, "the proving lens"** (V13 §5.9 (1)), so the first lens a DM
   meets reads *still* on every freshly born world. The map is a superb picture of a world that, for its first month,
   mostly sits still.
2. **No felt sentence for the pairing itself.** The host's requirements 16 and 19 demand a first-visible line and a
   DM-felt sentence per mechanism. V13 asks each H row to carry "its first-visible line … and its felt sentence"
   (V13 §8.5 preamble), but no H row, H22 included, states one. No lens declares a first-visible latency either. The
   module has a strong honesty rule and no felt-proof rule.
3. **Geography mostly decorates the simulation.** "Links decide who; geometry modulates": geometry decides *who* in
   only four places (V13 §5.8; `lens-implications.md` §1.2 item 8). The grown world, with its rain shadows, currents
   and rivers, reaches the host as travel costs, water access and site points (V13 §3.11.6, the canon). It rarely
   *causes* a host event. The DM may expect the desert to starve Kessar. It starves Kessar only through the host's own
   dossier economy, which existed before the world did.
4. **The world's names never reach the Herald,** except through `placeOf` on hearing cards (V13 §3.11.6; H16). A
   world the DM loves will go unspoken in the news feed the players read.

### 2.3 Contradictions between the two sides

1. **"Draggable at t=0" against "canonized at birth".** The host promises: "every site is freely draggable at t=0, so
   exact coordinates are COSMETIC IN PLAY" (worldPlan). The bundle "canonizes nothing" (composer). The map rules:
   every new campaign on a module world is canonized at birth (H22). After that, moving a seat is "a re-canonize that
   shifts other geometry", which stays premium (H22), and the additive canon covers additions only, "a seat's removal
   is no addition" (H22; J389 (2)). A host-locked seat refuses an origin edit outright (V13 §2.2,
   `Placement.hostLocked`). Which promise holds in the first ten minutes, the drag or the frozen canon, is not decided
   (§4 Q5).
2. **Temples without a creed.** The magic modal tells the DM "Gods and temples remain" and that "a mundane realm still
   prays" (worldPlan). The dossiers carry temples. Then the religion lens opens on "a creed exists only once the DM
   seats one — a born world holds none" (V13 §5.9 (6)), because "Generation seats no deity" (fold §2;
   `research/sf/faith-system.md`, observed at `81f1cd96`). Each statement is true on its own side. Together they read as a contradiction to
   a DM.
3. **One word, "Realistic", for two regimes.** The instant world applies `realistic_regional` (RRa). A campaign born
   plain carries the same preset name with none of its virtual keys (RRb) (`lens-implications.md` §1.2 item 6). The
   map's banner, computed "never from a preset's name, which over-states what a born campaign runs" (V13 §5.8 (2)),
   will therefore show two "Realistic" campaigns with different lenses alive. The map is right. The host's label is
   the problem, and the map is the surface where the DM finds it out.
4. **Realistic scale against relative time.** The map grows partners "within `relation.travelDaysMax` of each other
   under the default travel law's foot pace over the straight line" (V13 §3.1 (5)) and labels routes in km, "never a
   travel time on the world view" (V13 §5.1). The host, until its band census (H2), runs the **normalized** arm: "its
   anchor weeks over its median tier-1 hop cost" (V13 §2.2, `calibration`; §8.5 H7). A tight realm and a sprawling one
   then give the same caravan weeks. The DM measures 40 km on the map and is told six weeks by the host, or the
   reverse. The map's refusal to print a time is honest, but it leaves the DM with two clocks and no bridge between
   them (§4 Q6).
5. **The instant world's knobs against the world dialog.** The host offers island templates and a tone. The world
   dialog offers V13 templates, scenarios and no tone (Moment 2). H31 replaces the scatter but says nothing of the
   knobs (V13 §8.5 H31).
6. **Two "why" systems.** The host's cause walk ("any 'why is this village suddenly X?' walks backward link by named
   link", FP spine §1 req 7) and the map's reason records (V13 §4.7) are each complete on their own side. Neither
   follows the other across the seam. "Why is Kessar hungry?" is the host's question and "why is Kessar dry?" is the
   map's. The DM cannot ask one question that walks from the drought to the hunger (READING).

### 2.4 What a DM would find confusing

- **Vocabulary pile-up at first contact.** "New world", "New world map" (the atlas), the host's own realm map, "realm"
  as a host campaign and "realm" as a V13 size rung (V09 §5.13; J396 (3)). Add "territory" against "sway", "biome"
  against "land cover", "plate" against "crust block" (V13 §3.11.6 law (9)) and a placement card showing a
  "precedence stamp" of `world` or `settlement` (V13 §3.11.5 (1)). The one-word-one-meaning law (fold req 21; V13
  §3.11.6 (9)) is kept rigorously in records. The DM still meets a lot of distinct words in the first hour.
- **Week-one artifacts** (Moment 8): fields appearing and borders re-drawing because the host first *reported*, not
  because anything *happened*.
- **"Regime not sent" at birth** (Moment 6), on every lens.
- **The alignment lens's first sentence is a disclaimer** that the host's tables lean malicious (V13 §5.9 (8)). That is
  honest, and as a DM's first look at the moral character of their new realm it is deflating.
- **A fire on the map at once, the town's dossier a week later** (Moment 11). This follows from the custody chain, and
  the DM has to learn it.

### 2.5 What a DM would find delightful

- Reading why their desert town is dry, and finding the range that makes it so.
- A port that faces the sea it trades across, and a river town on a river with a source.
- Rerolling only "climate" and watching the rest hold (V09 §4.22 (4)).
- A conflict list that will not let them re-roll a town's people by accident.
- Roads that follow valleys between towns the DM placed nowhere, on day one.
- A planting line that tells them, in week one, the border change coming at week fourteen. That is the slice's best
  answer to requirement 16, and it comes from the map side.

---

## §3 The five best and five worst moments

### The five best

1. **The verification report after Generate** (Moment 5; V13 §3.1 (7)). Every town met, each with a sentence of
   physical cause. This is the pairing's whole case in one screen.
2. **The generated-first dialog with rolled values beneath random chips** (Moment 2; V09 §4.22 (1)–(3)). There is no
   empty state and no wizard, and the panel teaches itself.
3. **The derived chips: "Kessar: desert, river, caravan route"** (Moment 2; V09 §4.22 (5)). The DM sees the world
   reading their dossiers before it runs.
4. **The conflict list's consequence preview, above all the draft re-roll warning** (Moment 4; V13 §3.11.5 (1)). The
   most dangerous act in the product is the best-labelled one.
5. **The planting line in week one** (Moments 8–9; V13 §3.9 (13)). The map turns a thirteen-week dwell into something
   visible in the first advance, which the host's own first-visible law asks for and its lit chains rarely give.

### The five worst

1. **The first month is still on almost every lens** (Moments 8–9). Pacts are invisible inside a month (ARCH_GR GR-2).
   There is no deity, plague is silent, prosperity is frozen on plain birth, and the proving lens reads still. The
   map's honesty turns the host's quietness into a visible list of still banners.
2. **Week one's artifact burst** (Moment 8). Fields spring up and borders re-draw from the first report, not from
   events, and "the host's regime not sent" fills the picker at birth (Moment 6).
3. **The t=0 drag against the birth canon** (§2.3 (1)). The host invites a drag the map's canon turns into a premium
   act or a refusal, with no text deciding which.
4. **Two clocks, no bridge** (§2.3 (4)). Real kilometres on the map, normalized weeks in the host, and a world view
   that is forbidden to show a time.
5. **"Gods and temples remain" against "a born world holds none"** (§2.3 (2)), together with "Realistic" meaning two
   regimes (§2.3 (3)). Each is true on its own side, and the pairing contradicts itself to the DM.

---

## §4 Open questions of substance (not implementation)

1. **What does the instant world become?** When H31 replaces the scatter, do the host's map-kind chips map onto V13's
   templates and scenarios, give way to them, or vanish? Does the instant-world DM ever see the world dialog, or only
   its result? Should tone be visible on the world dialog, given it decides which lenses will ever move (V13 §5.8 (2))?
2. **World-first or settlement-first for the instant world?** The composer rolls nine members independently, then the
   world grows to justify them, which can stretch a "Medium, a settled region" across desert and tundra (V13 §3.1
   (5)). V13 supports the other order: a charter per site, then each town generated from its ground (V13 §3.11,
   world-first). Which order gives a DM the better *realm*: towns that agree with each other first, or a world that
   agrees with any towns?
3. **What does the DM see at birth, before the first lens window?** Should the cover fold run once at birth from the
   populations `campaignFacts` already carries (V13 §3.11.6)? Should the host send a birth-time regime so the banners
   are not "not sent" (V13 §5.8 (2))? Should the sway's provisional projection be shown at all?
4. **Does the first polity window re-draw the provisional sway at once, or after the dwell?** Either answer surprises
   the DM: at once looks like an event that did not happen, and after the dwell leaves a season of middle-rung borders
   (V13 §3.9 (13), edges).
5. **What is the DM told at birth about the canon, and what may they still move for free?** Is there a grace window
   in which a seat may be moved before the first advance without a premium re-canonize? If so, is that a host rule or
   a map rule (H22; worldPlan's t=0 promise)?
6. **How should the map speak about travel time while the host is on its normalized arm?** Should the world view show
   the host's weeks with their basis named ("normalized: relative to your realm's nearest-neighbour hop")? Or should
   the DM keep two clocks (V13 §5.1; §2.2 `calibration`)?
7. **How does the conflict list behave at realm scale?** A nine- or fourteen-town realm with set options can raise
   dozens of rows. Should there be one decision for "all rows of this kind", and is a preset's map-side pre-decision
   enough (V13 §3.11.5 (1), presets and memory)?
8. **What is the paired product's felt sentence for month one?** Requirement 19 binds host waves. Should V13's lenses,
   the birth canon and "based off my settlements" each name the DM-felt sentence and the first-visible latency the
   host's law asks of every mechanism, and should the pairing be scored by an experience read before it lights?
9. **Should the world's geography reach the Herald's prose?** Today only the hearing card's "where" (`placeOf`, H16)
   carries a world word. Should the Herald name the range, the river or the pass, or is the map's silence in the news
   feed a deliberate boundary?
10. **What should the religion lens say on a born world whose dossiers hold temples?** Should "none" acknowledge the
    dossier's temples and prayer, so the magic modal's "Gods and temples remain" is not contradicted (V13 §5.9 (6))?
11. **May a free user with saved settlements but no campaign include them?** "Include my settlements" and Best
    placement "follow the host's campaign entitlement wherever it applies" (V09 §4.22 (8); J396 (2)). For a free
    user's standalone saved towns, does "based off my settlements" exist at all?
12. **Should "why" cross the seam?** Should the clerk be able to walk from a map cause (the rain shadow) to a host
    consequence (the dossier's food deficit) in one answer, or are the two cause chains meant to stay separate
    (FP spine §1 req 7; V13 §4.7)?
