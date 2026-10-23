# Experience read 05: what players hold, the believed map, the relational style and the world map

> Provenance: written by Opus 5.5 under the Fable manager (J392); read and weighed by the manager's synthesis.

**Seat:** research / experience-audiences. **The question asked:** what a DM and players actually get from the
paired product (the SettlementForge host plus the PLAT map), judged on substance and experience. Implementation time
and debt are out of scope. **My slice:** what the players hold, the belief and knowledge they see on the map, the
relational historical style, and the world beyond one realm (the atlas, its microcosms, sharing).
**Read:** host @ `81f1cd96`, read-only: `docs/DESIGN_FP_INFORMATION.md` head–§2, `docs/DESIGN_FP_ARCH_IN.md` head–§1b,
`docs/DESIGN_FP_COHERENCE_FOLD.md` §1 (req. 16, 17), §2, §3.2, §5, `docs/DESIGN_FP_ARCH_GR.md` §1 L3/L6 and the
V-30 row, `docs/DESIGN_FP_SPINE.md` :405–520 (the Herald's registers and truth law),
`docs/DESIGN_WAR_RULINGS_ARCHITECTURE.md` :48 (K3), `src/domain/realm/heraldRouting.js` header,
`src/domain/display/chroniclersLetter.js` header, `src/domain/worldPulse/beliefMap.js` header and `beliefsActive`,
`simulationRules.js` `infoModeOf`, `src/domain/region/wizardNews.js` `projectWizardNewsForAudience`. Ours:
`docs/volumes/V13-world.md` §2.2 (knowledge paragraph, `LensFacts`, `WorldEvent`), §3.9, §3.11.6 (the port),
§5.1, §5.8, §5.9 (plague rows), §8.5 H23, §9 J-V13.77/.92; `docs/volumes/V14-sites.md` §2.3, §5.1, §5.8;
`docs/volumes/V15-atlas.md` §0–§5 (§3.6 whole), §11; `docs/PROGRESS.md` J396.
**Code copied:** none. **Where I infer** rather than read, I mark it *(inferred)*.

**The tiers, stated first, because every moment below changes with them.** The host records belief only where
`beliefsActive` holds: "the spatial canon marker AND `infoMode !== 'omniscient'`" (beliefMap.js:203–209). The
default infoMode is `'omniscient'` (simulationRules.js:56). Only three presets record belief: `dramatic_campaign`
and `living_realm` (`perfect_delayed`, :953, :996) and `full_simulation` (`full`, :1073). The spatial canon is the
premium simulator (fold §1 req. 17). The whole information program (IN) also waits on two host flags lit in no
preset (fold §2 IN row). So every walkthrough moment below runs in three worlds:

| world | belief | what the party's map can be |
|---|---|---|
| **A** the default preset (`realistic_regional`), host-bound | none | "the public truth or nothing" (V13 §5.8 (7)) |
| **B** a belief preset, host-bound, premium | courts believe; IN dark | the public truth plus "the party's believed rows" where the host sends them |
| **C** a standalone world (no host): a continued or free map | none | the DM's own party key over the map's own facts |

---

## §1 The walkthrough

### 1.1 A party's map at session one

**Host side.** At session one nothing has been rumoured yet. In world B the cold start is explicit: "at the first
active advance, beliefs INITIALIZE TO GROUND TRUTH AS-OF-CANONIZE (confidence 1.0) for the observer's declared
relationship neighbourhood" (beliefMap.js:29–31). Fog builds up from that point. Belief belongs to an **observer
settlement**: the schema is `worldState.beliefMaps = { [observerId]: { [factionId]: { [subjectId]: { readiness,
strengthBand, allianceLabel, faithLabel, confidence01, lastUpdateTick } } } }` (beliefMap.js:10–12), and v1 holds one
`'seat'` slot, "the GOVERNING COALITION'S operational belief". There is no adventuring-party observer anywhere in the
host (I grepped for party knowledge and party belief: the host's `party` word is a cause tag, `eventCatalogue.js:88`,
`chronicleFeed.js:73`). The host's audience words are `dm`, `player` and `public` (the AI slicer's
`'dm'|'player'`, `stateSlicers.js:88`; the feed's `covert` and `audience: 'dm-only'` filter, wizardNews.js:923–935).

**Map side.** V13 §5.1's **player picture**: "a player audience sees the sway re-derived at the head revision over the
host's whitelisted political facts — covert links, their exclaves and covert patrols omitted as entities, never
greyed — or, when the host sends `audienceKnowledge`, over the facts that audience knows (an unknown later fact
absent, never guessed)". The party's known geography is "the coarse cells the audience's places have reached"
(V15 §3.6 (4), amendments r's `RenderedWorld.known`). Land cover shows only around seats the party knows; "the cells
of an unknown seat's catchment drawn as their potential vegetation" (V13 §5.8 (9)). DM-only sites are simply absent:
"a party view neither draws, lists, counts, names nor exports it" (V14 §2.3, :757–761).

**What the table gets.** A clean, honest handout. The party sees true public borders, their own roads and towns, the
derived fields around towns they know, and blank country beyond. Nothing on it is false. In worlds A and B it is the
same picture, because at session one belief equals truth. In world C it is whatever the DM wrote into the document's
own party key (V14 §2.3, "the document's own party key when no host is bound").

### 1.2 The same map after a season of rumours

**Host side.** The host's information physics are rich, and §2 of the volume is right to call them war-grade. Rumour
travels on six carriers with hop latency, weathers each hop to a 0.05 fidelity floor, and swaps names 12 % of the time
to real ids. Belief decays with silence (SILENCE_DECAY 0.92/tick ≈ 8-tick half-life) and is pruned below 0.03
confidence (DESIGN_FP_INFORMATION §2, census rows 1–3). In `perfect_delayed` the news is "true news, arrives by
travel time — no distortion". In `unreliable`/`full` "the fidelity vector + organic degradation" apply
(simulationRules.js:1391–1399). The host already has a **player rumour display**: "five consumers incl. the player
rumor display" (DESIGN_FP_INFORMATION §2, `settlementRumors.js`). It also has the DM's irony surface, "What they say
(vs. what is)" (briefs/composers.js:162).

**Map side.** World A: the party's map changed exactly as the public truth changed, at the advance it changed. A
siege resolved public appears on the party's map in the week it begins, however far away it is. The only other
changes are the places the DM revealed and the places the party reached. There is no rumour layer at all. World B: the
lenses gain the **party's believed rows**: "heard of plague" at a seat (V13 §5.9 plague lens, :4377), the believed
faith label (:4518), the believed prosperity band (:4537), the believed trend (:4478) and the believed danger (:5148).
These rows reach a player only through a lens, and "every lens opens DM-only" (V13 §5.8 (7)). **The sway, the border
itself, is never believed.** It is still "re-derived over the whitelisted or known political facts", which is a subset
of the truth.

**What the table gets.** World A: a map that is better informed than any court in the world. It is omniscient about
public facts, with no lag and no wear. World B: the same true borders, with a few "heard of" marks a DM may choose to
open to players. The marks carry no age and no confidence. The host stores `confidence01` and `lastUpdateTick` on every
belief record (beliefMap.js:11), but no row of `LensFacts` carries them (V13 §2.2 :1048–1069). So the season's
forgetting, which is the host's most human mechanic, never shows on the map. A rumour gone stale looks the same as one
heard this week. The rumours themselves, the "wrong, worn, human" word the spine calls the rumour mill
(DESIGN_FP_SPINE.md:486–489), stay in the dossier and do not reach the map.

### 1.3 A looted enemy map

**Host side.** This is where the FP is richest. The host knows exactly what the enemy court believes about the party's
realm: `beliefMaps[enemy].seat[ourCapital].strengthBand`, `readiness` and `allianceLabel`. It knows whether that belief
is a misjudgment (`detectMisjudgment`, ARCH_IN S2). It also knows whether the belief was planted: the lure is "planted
weakness, planted wealth, planted devotion" (DESIGN_FP_INFORMATION, settled cruxes), the garrison bluff is "+2 bands at
0.7×credW", and IN-2's axis law is built (fold §2: "`lureCommission` no caller"). "They think the east gate is weakly
held, because we told them so" is a sentence the host is built to hold.

**Map side.** The closest affordance is a viewpoint: `culture` set to the enemy's culture, `knowledge.source:
'culture'`, a relational preset, audience `party` (V15 §2.2 `Viewpoint`; §3.6 (6)). It draws the enemy culture's
**known region**: its seats' territories and sways, "the cells within `travelWeeks` along routes, the far ends of its
trade channels, the seats of its allies and vassals, one heard-of band beyond" (V15 §3.6 (4)). It centres on the enemy's
holy city or capital. It draws the party's own realm as "monstrous peoples" or "devils" if the two stand at war
(the §3.6 (5) table). Its legend reads "drawn as {culture} saw the world at {week} … its enemies as monsters" (§3.6 (8)).
It is exported as a PNG at any DPI (§5.5).

**What the table gets.** A beautiful prop that shows the enemy's **geography and prejudice**, and none of its
**intelligence**. The politics on the looted sheet are the party-audience truth at that week, not what the enemy
court believes. If the enemy thinks our garrison is weak, the looted map cannot say so. Worse, the audience model has
no slot for the enemy's own knowledge. Audience `party` hides every enemy secret the party does not already know, so
the map reveals nothing new. Audience `dm` reveals every DM-only row inside the culture's region, including the party's
own secrets that the enemy could never know. A looted map that teaches the party something true but secret, which is
the whole dramatic purpose of a looted map, can only be faked by hand (DM embellishments, §3.6 (5)).

### 1.4 The DM's true map beside it

**Host side.** "THE HERALD IS THE DM'S PAPER AND IT ALWAYS TELLS THE TRUTH … covert truth is the Herald's native
register … every player/free-facing view is a FAIL-CLOSED PROJECTION DOWN from the one truthful paper — never a second
paper that could drift" (DESIGN_FP_SPINE.md:467–480). The paper's causality popup marks every chain link with an
integrity register: "CLEAN · WORN IN THE TELLING · PLANTED (… BY WHOM and FOR WHAT PURPOSE)", and a mutated plant shows
"BOTH halves" (:499–520). The **pairing law**: "the rumor mill is the world's BELIEVED word … and its upward link to the
truthful headline is the DM's fog-of-war instrument: what the town believes, one click from what happened"
(:486–489). The Chronicler's Letter is "session prep in five minutes", grouped by desk, deterministic and exportable as
plain text (chroniclersLetter.js:1–20). Since IN-5/1 the Herald has a seventh desk, `knowledge`: "what courts believe,
buy, plant, hunt and misjudge" (heraldRouting.js:11–18, :74).

**Map side.** The DM sees "the head revision" (V13 §5.1), with covert links and exclaves, covert patrols, DM-only
ghost roads, lineage claims as dashed outlines, docket pins and planting lines for pending sway triggers (V13 §5.1
`routes`, `sway`, `events` rows). World sites carry a second cue beside colour. A DM-only site has a dashed ring and an
eye-slash, a revealed one an open ring, a discovered one a filled ring (V14 §5.1). **View as** puts the DM in the
party's seat: "at a lower key the icon is simply absent — the DM sees what the party sees" (V14 §5.1). Every lens opens
with a regime banner, so the DM is told what the host is really running (V13 §5.8 (2)). Each mark answers `lensWhy`
with the host facts it read.

**What the table gets.** A truthful, legible DM map that agrees with the host's truth law, and an easy toggle to the
party's view. **The irony between the two halves is missing.** There is no layer that shows where the party's or a
court's picture differs from the truth. Nothing on the map carries the CLEAN / WORN / PLANTED register. No map event
links up to its Herald headline: V13, V14 and V15 mention the Herald and the chronicle **zero times** (grep). A
`WorldEvent` keeps the host's receipts in `causedBy` (V13 §2.2 :974), so the join is available, but no experience is
designed on it. The one DM belief overlay, `beliefView` ("the believed standing and danger of places and roads in
banded words, 'assumed safe' for what the observer never heard", V13 §3.11.6 :3389–3392), never says **whose** belief
it is. The host has one belief map per settlement court.

### 1.5 A second realm beside the first, and the world map that holds both

**Host side.** One map per campaign (V15 §2.11's citation of the state note: "one map per campaign, no atlas"). All of
foreign policy happens among the settlements of one campaign. Pacts, wars, envoys, lies and the Herald are all
campaign-internal.

**Map side.** Two ways to get a second realm. (a) **Continue here** on the void beside the first (V15 §3.4). The new
world is born meeting its neighbour's **present physical ground**, under locked edge charters and with the basics
pre-filled. A contradiction gets a reconciling strait or mountain belt. After birth nothing crosses: "the new member's
drift readings start at zero and grow only as either side is edited; no later edit on either side is ever carried
over" (§3.4 (8)). In host mode this is **refused** (`refuse.atlas.hostWorld`) until H35 lands, so "the user makes the
world standalone" (§3.4 (7), :1079). Continuation is a premium action (J396 (2)). (b) **Add** another campaign's realm,
such as Varn at Year 1 071 beside Ashmark at Year 412 (V15 §3.11). Each member "runs its own clock", its own date in a
cartouche, "and the atlas says nothing of it (there is no atlas clock to disagree with)" (§4.7 (2)).

**What the table gets.** For the DM: a gorgeous, safe patchwork. The seams are softened, finer maps sit inside coarser
ones as eased detail or printed-atlas insets, drift markers are DM-only, and every member keeps its integrity. For the
world: **the realm beyond is scenery.** A continued neighbour is a standalone world. Its politics are "the recipe's
seats at their tiers, the middle prosperity rung, every pair neutral" (V13 §3.9 (5)). It has no host, no news, no
courts that believe anything, no Herald, and its cartouche reads "Year 1, spring" beside "Year 412" (§3.11 step 4).
A second campaign's realm is alive, but it is alive alone: its wars can never touch the first realm's, its courts
never send an envoy across, and "no road crosses a map's edge" (§3.6 (3)). The FP program, a whole constitution of
foreign policy, stops at the seam.

### 1.6 A player opening the world map

**Map side.** The player lands on the party's viewpoint: audience `party`, culture `none`, preset `true` (V15 §3.6 (6)).
"A member the audience knows nothing of … is drawn only as the preset's unknown treatment — not at all under `true`"
(§5.4). The member list shows "the members they know by name only". Relations, drift readings and DM viewpoints are
withheld by admission. Drill-down opens "the member's player view only when the member is `shareable` and the audience
knows a place inside it" (§3.7). The map "improves as they learn: its known region is re-derived from the member's
known sets at every refresh" (§3.6 (6)). If the DM chose a relational preset for the party, the party sees "the world as
the Ember priests draw it, as far as the party has seen", with the true distance under the cursor: "the shape lies, the
number never does" (§3.6 (3)).

**What the table gets.** Two good feelings: a map that grows as the campaign travels, and a relational sheet that
feels like an in-world artefact while still answering "how far is it really?". Three snags. (1) **The date cartouches
are not withheld.** §5.4 withholds "a member's version and state words" but not the date, and `dateCartouches`
defaults to true (§2.2). So players read "Year 412" beside "Year 1" beside "Year 1 071". That is a game master's
bookkeeping printed on the players' map *(inferred: no rule hides the date for a player)*. (2) **Party knowledge is per
document.** On a standalone member it lives in "the document's own party key" (V14 §2.3), so a party that crosses into
the Marches arrives at a blank map that the DM must fill by hand. Nothing carries the party's reach over the seam.
(3) **How a player opens it is unstated.** In host mode the page is "read-only for a viewer role" (§5.1), but neither
V15 nor J396 says how a player account binds to the party audience *(inferred)*.

### 1.7 A shared "World map" in the gallery

**Host side.** The host has a community Gallery that shares settlements and maps (`src/components/gallery/
galleryMapsUtils.js`, `list_gallery_maps`). Its free tier advertises "Share settlements to the community Gallery"
(`organic/samples/fixtures.js:69`).

**Map side.** "An atlas is shared as imagery only; a member's imagery travels only where that member itself may travel
under the host's gallery rules (H35) — a member the user may not share appears as a marked gap in the shared copy …
another user's shared world may be a member by reference, shown at the version the sharer published; publishing an
atlas to the gallery follows the host's gallery entitlement" (J396 (3); V15 §5.5). The share sheet offers a Link, a
Picture ("What it shows" defaulting to "what anyone knows", J-V9.13) and a World map file.

**What the table gets.** The single best showpiece in the slice: a mappa mundi of a whole campaign universe as a
gallery poster, legible to strangers, with "not shared" gaps instead of silent holes. **One real hole:** the shared
container embeds "every shareable member's imagery … at the stops cached" (V15 §2.11 :789–792). The imagery cache is
kept **per audience**, `'dm'|'party'|'public'` (§2.2 `MemberImagery`). Neither §2.11 nor §5.5 says the DM audience's
tiles are stripped from a shared file. The Picture option defaults to "what anyone knows". The file option names no
audience. Secret records (relations, drift, unshared DM viewpoints) are "withheld by the admission function", which is
a viewer-side rule. Whether they are **removed** from a file bound for the gallery is not stated.

---

## §2 Substance verdicts

### 2.1 Belief and knowledge on the map: a match, or a gesture?

**Verdict: the map matches the host's audience law faithfully and gestures at its information design.** It gets the
DM/player projection right. It does not reach the medium the FP actually built: courts' beliefs, their staleness,
their wrongness, and the lies that caused it.

**Where it genuinely matches (credit is due):**
- **The projection-down law.** The host's "every player/free-facing view is a FAIL-CLOSED PROJECTION DOWN from the
  one truthful paper" (SPINE:477–480) is mirrored almost word for word: "every lens opens DM-only; a row the host sends
  with no resolved audience is folded DM-only; covert links, columns and patrols fail closed — omitted, never greyed"
  (V13 §5.8 (7)). J-V13.77 explicitly rejects "a public default (leaks the DM's sieges)". This is the right instinct,
  and players will never see a ghost of a secret.
- **The tier declaration, honoured at the glass.** Fold req. 17 asks every wave to declare its tier and degraded arm.
  V13's **regime banner** goes further and tells the *user*: computed "from the regime the host resolves … never from a
  preset's name, which over-states what a born campaign runs"; with no regime, "regime unknown — never a regime guessed"
  (§5.8 (2)). The "under an omniscient regime the player picture is the public truth or nothing" rule (§5.8 (7)) is the
  degraded arm, stated. This is better than most host volumes, which the fold found had no TIER line at the top.
- **The host's own fiction respected.** The plague lens shows "the host's banded fiction public where it so resolves;
  the truth DM" (V13 §5.9 :4369). The map takes the host's public fiction instead of inventing its own.
- **Truth stays out of the canon:** "(3) truth only — no believed fact enters or leaves the canon, believed views
  riding the presentation inputs" (V13 §3.11.6 :3422). This matches LAW ONE ("never a truth the DM has not authored").

**Where it only gestures:**
1. **The subject is wrong.** The FP models "what courts BELIEVE and what the record SUGGESTS" (DESIGN_FP_INFORMATION
   §1b LAW ONE). Its observers are settlements' governing seats. The map models what **the party** believes. H23 asks
   the host for "a party set of believed rows where it records belief" (V13 §8.5 :4978), but the host has no party
   observer, and no volume says which court's belief the party inherits. The natural bridge exists (the party
   believes what the rumour mill of the town they stand in believes, which is the host's own player rumour display)
   but it is not designed. As written, the party layer has no source.
2. **The border is never believed.** The section title promises "the believed border", but in the design the player's
   sway is truth with facts removed. It is never truth bent by belief. A court that believes its neighbour "holds the
   ford" while the ford fell last month has no expression on any map. The FP's signature drama is "misjudgment (and the
   wars it starts)" (beliefMap.js:7–8) and "bluff-vs-bluff as the program's signature tragedy" (INFORMATION, settled
   cruxes). Neither can be drawn.
3. **K3 has no map counterpart.** K3 says "NOBODY IS EVER CURRENT … no negotiation path … may read true world state"
   (WAR_RULINGS:48). The map does the opposite for players: in world A the party is **perfectly current** on every
   public fact, more current than any court. In world B the believed rows exist, but the border is still current. On
   the host side the map feed's crossing holders, which are truth by construction, are offered to the host "as an
   advance-head overlay … sampled … at each hop" (V13 §3.11.6 :3320–3327). V13 never names K3. If any negotiation-side
   reader (the war volume lists "interceptor judgment") consumes the overlay, truth enters by the map's door
   *(inferred risk; no reader named either way)*.
4. **infoMode collapses to one bit.** The host has four rungs: `omniscient`, `perfect_delayed` ("true news, arrives
   by travel time — no distortion"), `unreliable` and `full` (simulationRules.js:1391–1409). The map reads one gate,
   "belief recorded" (§5.8 (1)). `perfect_delayed` is the most player-legible rung (true but *late*), and the map has
   no way to show lateness: no "as of week n" on a mark, no age, no confidence (§1.2 above).
5. **The Herald's integrity registers do not reach the map.** CLEAN, WORN IN THE TELLING and PLANTED are the most
   distinctive thing the host can say about any fact (SPINE:502–520), and they are already derivable "from persisted
   provenance only". `WorldEvent.audience` is `'public'|'dmOnly'|'local'` (V13 §2.2 :974) with no integrity word. A DM
   staring at a believed "heard of plague" ring cannot tell an honest rumour from one a house planted.
6. **The premium and preset gate makes the belief layer rare.** It needs the premium simulator plus one of three
   presets. The fold itself says believed scarcity and conditions colour pacts "only in the three belief presets, never
   the default" (fold §2 :351). Most players of the paired product will only ever hold the "public truth or nothing" map.
   That is honest, but the belief half of this slice is a premium-of-premium feature.

### 2.2 The relational style: delight or confusion?

**Verdict: it will delight DMs as a handout engine, and its honesty apparatus is the best in the slice. It will
confuse in exactly the places where it claims to read facts across maps, and on default worlds it loses its centre.**

**What will delight:**
- **The slider plus the true readout** is a genuinely new idea for VTT-adjacent tools. "Hover anywhere … the true
  distance … the travel time along it under that member's law" while the sheet swells Sarn to a third of the page
  (V15 §3.6 (3), §3.11 step 7). "The shape lies, the number never does" is a product line. J-V15.15 keeps the scale bar
  on the true plane, never warped. The flow-at-time-s slider (J-V15.17) means every intermediate frame is a real map
  you can click, not a crossfade.
- **Every figure has a reason.** Serpents in deep, unsailed or storm-feared water; dragons on the band "where
  knowledge ends"; skulls where the Wasting struck; each carries `derivedFrom` and the clerk answers why (§3.6 (5)).
  This makes the monsters a *reading of the campaign*, not clip-art.
- **The prejudice rule is principled.** "Chosen by its trait alone … never a culture's, a people's, a deity's or a
  region's name", with a blocklist lint and the legend note "the mapmaker's fear, not the realm's fact: its enemies
  drawn as monsters" (§3.6 (5); J-V15.18). That answers the owner's "pagan savages and devils" without a real-world
  reading. T-V15-6 ("renaming every culture … changes no figure") is the right test.
- **Three presets map to three table uses:** the sacred sheet for a temple scene, the portolan for a sea campaign,
  the itinerary strip for a pilgrimage or a march (§2.5).

**What will confuse, or simply not happen:**
1. **The worked example breaks the microcosm rule.** "Varn's lands (its allegiance at war with Ashmark's) take devils"
   (V15 §3.11 step 7). Varn is another campaign at Year 1 071. Nothing relates Varn's seats to Ashmark's. The devils
   rule reads "`atWar` with the mapmaker's" through `ViewFacts.polity` of a member, and §4.7 (1) says "the only reads
   across members are the seams' drift readings … the continuation's charters … and the fit". Likewise "the sea
   between Ashmark and Varn is sailed → whales": that sea is a `GapStyle` of the atlas with no bathymetry and no
   `WorldRoute`. And "the far southern sways of another culture at band 5": culture distance bands are a host's,
   per campaign; Kesh and the Marches are standalone. **The figures that make the example sing are the ones the rules
   cannot derive.** A DM who tries to reproduce §3.11 will get dragons where the example promised devils.
2. **The holy city is usually absent.** The `mappaMundi` centre is "`holyCity` … else the top-ranked deity's
   highest-tier patron seat" (§3.6 (2)). But "the host's generation seats no deity under any preset" (V13 §5.8 (3)
   :4258–4260; fold §2: a patron's fall "VACUOUS on every born world because the birth preset seats no deity"). On an
   unauthored world the sacred map falls back to the capital, and the cathedral vignette never draws. The legend says
   so (honest), but the flagship preset's flagship move needs DM faith authoring first.
3. **"A culture of the party's choosing" is a fiction the design does not ground.** The party has no culture in host
   or map. A party relational map borrows some member's culture for prejudice and keeps the party's audience for
   knowledge (§3.6 (6)). That works, but players will read the monsters as *their* party's fear. The legend says "drawn
   as {culture} saw the world".
4. **"A map found in a dungeon, centuries old" mostly cannot remember.** `asOfWeek` reads "every member … at its
   plates and events up to that week". Plates "start at the first advance the map observes" (V13 §5.8 (8)), and the host
   sends at most 80 pulse records at first bind. Centuries back, a member reads `W_ATLAS_BEHIND_WEEK` (V15 §3.6 (6)
   admits it). The prop gets today's coasts with a culture's prejudice, not the borders of a vanished kingdom. It is a
   flavour map, not a historical one, unless the DM paints it.
5. **The honesty note fights the prop.** The legend "begins with 'drawn as {culture} saw the world … a projection;
   every distance and time shown is true'" (§3.6 (8)). For a DM handing over a looted sheet, that line breaks the
   fiction. No rule says the note can be left off a player handout *(inferred)*.

### 2.3 The microcosm rule: a feature or a limitation, to a user?

**Verdict: a feature for the DM who is building, and a limitation the moment the players travel.** F14 is the owner's
own ruling ("every map is effectively its own microcosm on different literal times"), and the design obeys it
cleanly. T-V15-1 makes it provable that no edit on one member moves another. As **authoring** this is a relief: a
river moved in Ashmark cannot wreck Varn, and a member deleted leaves "a marked gap, never a silent hole" (§4.5).

As **play** it reads as a wall:
- "No road crosses a map's edge" (§3.6 (3)). A party that rides south from Ashmark into the Marches gets a distance
  and no travel time.
- The far side has no simulation: a continued neighbour is standalone with "every pair neutral" (V13 §3.9 (5)).
- The calendars disagree visibly (Year 412 beside Year 1), and the atlas "says nothing of it".
- The party's knowledge resets at the seam (per-document party key, V14 §2.3).
- In host mode the continuation is refused until H35, so the most natural ask ("continue my campaign's map south")
  is the one the host-bound user cannot make yet.

The design calls the common-week display "an option, not the default" (§4.7 (4)). It is the right honesty, but it
confirms that the world beyond one realm is a gallery of separate snow-globes. Users will feel this most with
continuations, which *look* like one land.

### 2.4 What is thin

- **Whose belief.** `beliefView` (DM) and the party's believed set name no observer (V13 §3.11.6, §8.5 H23).
- **No age or confidence on any believed mark**, though the host stores both (beliefMap.js:11).
- **No divergence view**: the DM's truth and the party's (or a court's) picture are never drawn as a difference. The
  host built this surface ("What they say (vs. what is)") and the map does not echo it.
- **No Herald join**: zero mentions of the Herald or the chronicle in V13–V15. The events layer's "this advance"
  filter (V13 §5.1) is a spatial Chronicler's Letter waiting to be named; the causality popup convention ("summoned
  from ANY surface carrying a headline id-link", SPINE:491–497) could be summoned from a map pin, but no pin carries
  the id.
- **The `knowledge` desk is invisible on the map.** Lies, lures, intercepts and burned spies are what the host's
  seventh desk reports. No lens draws them, even DM-only.
- **The shared file's audience**, the gallery copy's audience, and whether secret records are stripped (§1.7).
- **The player's door** into the world map (§1.6 (3)), and whether the relational style is open to free accounts
  (J396 (2) lists the free atlas as "an image-only save with arrangement and drill-down" and is silent on the style).

### 2.5 What contradicts (quoted)

| # | claim | against | which wins |
|---|---|---|---|
| C1 | "Varn's lands (its allegiance at war with Ashmark's) take devils"; "the sea between Ashmark and Varn is sailed → whales" (V15 §3.11 step 7) | "the only reads across members are the seams' drift readings …, the continuation's charters … and the fit's mismatch" (V15 §4.7 (1)); the devils and whale rules read one member's `ViewFacts` (§3.6 (5)) | §4.7: the example is wrong, or a cross-member relation must be designed |
| C2 | the brief's "the believed border" (V13 §3.9, §5.1) | the player sway is "re-derived … over the facts that audience knows (an unknown later fact absent, never guessed)" (V13 §5.1): a subset of truth, never a belief | there is no believed border; the name over-promises |
| C3 | "A player's atlas shows only what their party knows" (V15 §0) | the date cartouches ride every member (§2.2 `dateCartouches` default true), and §5.4 withholds version and state words but not dates | the cartouche leaks the DM's bookkeeping |
| C4 | "the party's believed set where the host records belief" (V13 §2.2 :1048, §8.5 H23) | the host records belief per observer settlement and has no party observer (beliefMap.js:10–20) | unresolved; needs an observer ruling |
| C5 | "a map found in a dungeon … centuries before the present" (V15 §3.6 (6)) | plates "start at the first advance the map observes" (V13 §5.8 (8)); at most 80 pulses at first bind | the prop is mostly `W_ATLAS_BEHIND_WEEK` |
| C6 | the sacred preset's "holy city … the cathedral of the holy city drawn as large as a province" (V15 §0) | "the host's generation seats no deity under any preset" (V13 §5.8 (3)) | the capital stands in on every unauthored world |
| C7 | the Herald truth law: every player view is a projection *down* from one truthful paper (SPINE:477–480) | a party "believed rows" layer is, strictly, a second (believed) paper on the player's side | reconcilable by the pairing law (belief is the rumour mill's register, lawful in "in-world voices"), but V13 never says so |

---

## §3 The five best and the five worst moments

**Best**
1. **The hover that tells the truth on a lying map** (V15 §3.6 (3)). Sarn swollen to a third of the sheet, east at the
   top, serpents in the southern deep, and under the cursor "312 km · 2 weeks 3 days on foot". Immersion and practical
   play in one gesture. This is the owner's F10 answered better than he asked.
2. **The party's map that grows as they travel** (V15 §3.6 (6); V13 §5.1). Blank parchment that fills with true
   country, re-derived at every refresh from the places they reached. No secret ever ghosts through it ("omitted, never
   greyed").
3. **View as, from the DM's chair** (V14 §5.1). One toggle, and the dashed eye-slash rings vanish: the DM sees exactly
   the handout the party holds. With the regime banner, the DM always knows what the host is really running.
4. **The gallery poster of a whole campaign universe** (V15 §5.5; J396 (3)). Several campaigns and a friend's shared
   realm on one parchment, each at its own date, with "not shared" gaps instead of holes. The most shareable artefact
   the paired product will make.
5. **"Make a map here" at the edge of the known world** (V15 §3.4). The new land is born meeting the old coast, its
   river flowing on, a strait proposed where two neighbours contradict. For the DM it is the moment the world gets
   bigger without breaking.

**Worst**
1. **The looted enemy map that knows nothing the enemy knows** (§1.3). The host holds what the enemy court believes
   (and whether we planted it). The map hands the party the enemy's coastline and prejudices, and either none of its
   secrets or all of the DM's.
2. **Default-preset omniscience** (§1.2, world A). A siege three weeks' ride away appears on the party's map in the
   week it starts. In a product whose host constitution is "NOBODY IS EVER CURRENT", the players' map is the one
   current thing in the world.
3. **Crossing the seam** (§2.3). The party rides south into the Marches: no road, no travel time, "Year 1, spring",
   neutral courts, a blank party map, no news. The world beyond one realm turns out to be a painting.
4. **The sacred map with no holy city** (C6). The flagship preset, on any world the DM has not given a god, centres on
   the capital with no cathedral, and says so in its legend.
5. **"Heard of plague", from nobody, as of no week** (§1.2, world B). The one place belief reaches the players' map,
   it has no source court, no age and no integrity word. A planted plague rumour and an honest one look the same.

---

## §4 Open questions of substance

1. **Whose belief is the party's?** Rule an observer: the rumour mill of the settlement the party is at (the host's
   player rumour display), or their home seat, or a DM-chosen court. Without it C4 stands and the believed layer has no
   source. The same ruling should name the observer of the DM's `beliefView`.
2. **Should a viewpoint be able to be a *court*, not only a culture?** An audience `court:<seat>` that admits that
   court's beliefs (`strengthBand`, `allianceLabel`, `faithLabel`, `readiness`), drawn on its own map, would turn the
   looted enemy map into the FP's best prop: a planted lie the party can *see took*. It is a read of existing host
   state, and it must never be the truth.
3. **Do believed marks carry age and confidence?** The host stores `lastUpdateTick` and `confidence01`. Drawing "as of
   week n" and a fading mark would make the season of rumours visible and give `perfect_delayed` a face.
4. **Does the map carry the Herald's integrity register?** CLEAN / WORN IN THE TELLING / PLANTED on DM-side marks, and
   a map pin as a summoner of the causality popup (the id join is already in `WorldEvent.causedBy`). Should the
   `knowledge` desk get a DM-only lens (plants, intercepts, burned spies, standing sight)?
5. **Is the default-preset player map meant to be omniscient about public facts?** If not, a cheap degraded arm
   exists without belief: delay public rows by the host's own distance pricing (`distancePricedNews`,
   "hopDelay = floor(hopWeeks×0.5)"), so news reaches the party's map at the pace a rider could carry it. This is
   a K3-shaped answer for players in world A.
6. **Is the K3 fence needed at the map feed?** Crossing holders are truth sampled by the host at every hop. Name the
   host readers of the overlay, and fence negotiation-side ones (interceptor judgment) out, or say none exist.
7. **Are cross-member relations real?** Either the worked example's devils and whales are cut (C1), or the atlas gains
   a DM-authored relation between members ("Varn is Ashmark's enemy") as a record of the atlas, a projection that
   feeds only figures and never a member. That would keep F14 and let the style mean what the example shows.
8. **What do players see of dates?** Withhold cartouches for a player viewpoint, or show them only in a DM-chosen
   in-world calendar? (C3.)
9. **What exactly leaves in a shared file and in a gallery copy?** Which audience's tiles (public only?), and are
   secret records stripped or merely withheld (§1.7)? A gallery copy should be the `public` audience by rule.
10. **Can the honesty note be left off a handout?** Keep it on the DM's screen and the clerk's answer, and allow an
    in-fiction export without it (§2.2 (5)), or rule that the note always prints.
11. **Does the party's reach cross a seam?** When a host-bound party enters a standalone continued member, should the
    DM be offered "mark the party's places here" from the crossing point, or is the blank map the intended felt
    border of the known world?
12. **Can a found-in-a-dungeon map carry a DM-authored past?** If plates cannot reach centuries back, an authored
    "as-was" sway (a DM `setSwayLock` on a scratch copy) might be the honest route. Otherwise rename the feature
    so it promises less (C5).
13. **Who gets the relational style?** J396 (2) gates continuation and fit at premium and is silent on the style. The
    style is the most immediately delightful thing in the slice for a free account.
