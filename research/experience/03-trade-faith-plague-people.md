# Experience read 03 — trade, faith, plague and people on the paired map, lived over a few years

> Provenance: written by Opus 5.5 under the Fable manager (J392); read and weighed by the manager's synthesis.

**Question.** What do a DM and their players actually get from the paired product (the SettlementForge host plus
the PLAT map module) when the realm's four FP substances (trade and caravans, faith and conversion, plague, and
populations and migration), with wayfare as their body, play out on the map over a few campaign years? This is a
judgement of substance and experience only. Build time, debt and sequencing are out of scope.

**What was read.** On the host, at `81f1cd96`, read-only:
- `docs/DESIGN_FP_COHERENCE_FOLD.md`: §0, §2 (the status of record) and §6.
- `DESIGN_FP_ARCH_TR.md`: head and §1.
- `DESIGN_FP_ARCH_EC.md`: head, §0a and §2 (S1–S56).
- `DESIGN_FP_ARCH_WF.md`: head, WF-1 to WF-3.
- `RELIGION_REWORK.md` §2.
- `DESIGN_FP_ARCH_PG.md` entire.
- `DESIGN_FP_ARCH_POP.md`: head and POP-1 to POP-5b.
- `DESIGN_FP_ARCH_WY.md`: §0, §1a–§1c, and §3a–§3b for the ambiguity law.

On the map module, at branch `claude/focused-cray-qhz855`:
- `research/sf/{trade,faith,plague,population,prosperity,alignment}-system.md` §1 and §9, plus trade §7.
- V13 §5.8 and §5.9 entire.
- V13 §3.6 (1)–(5), §3.8 (12), §2.3's cover and sailing rows, §5.1's `landCover` and player rows, and §8.5's H22–H34.
- `docs/design/spine-world-growth-2026-10-23.md` §3, §7, §8 and §9.

**Citation keys.** Host documents: `FOLD`, `TR`, `EC`, `WF`, `RR` (the religion rework), `PG`, `POP`, `WY`. The
map's reads of the host: `sf/<system>`. Our design: `V13` and `spine`. Quotations are verbatim. Where I infer something, I say so.

**The product assumed.** The default preset is `realistic_regional` (RR) at its **birth defaults**: the plain door,
with no preset applied. Every new campaign on a world from this module is **canonized at birth**. The host
implements that as a product ruling (V13 §8.5 H22; J386; J387): "on the host's birth defaults the crisis columns, the
plague front and the routed supply links; rite adoption, pilgrim catchments and booms only where its rules carry them
(an applied preset, never the birth defaults alone)".
- Until H22 lands, every lens opens in its uncanonized regime: plague *footprint*, trade *relations*, populations
  *netted* (V13 §5.8 (2)).
- Where RR *applied* (the Instant World) or another preset changes the picture, I say so.

---

## 0 The ground in one table: what actually runs, per substance, in the default paired product

| substance | host machinery lit on a born, canonized RR world | the FP program's status (FOLD §2) | the lens regime that opens (V13 §5.9) |
|---|---|---|---|
| trade | the generation economy (labels, no quantities); the trade-scarcity cascade on channels; **M2** caravans on the canon (origins without limit, 8-week buffers, starvation only on a total cut); winter roads; sea lanes by data (sf/trade §7) | TR-1..3 built dark; TR-4..8 and EC-0..18 unbuilt — "the price is triple the standard" cannot fire | **arrivals** (supply links with an arrival week only); production, need and food coverage always drawn |
| faith | ranking and piety run only once a deity is seated; no deity is ever seated at birth; WF-1's unseating is lit, but "VACUOUS on every born world because the birth preset seats no deity" (FOLD §2) | WF-2 pilgrims and legates, WF-3..7 unbuilt; faith pacts unreachable | **none** — "a creed exists only once the DM seats one" |
| plague | the front walks hop by hop on the canon, but organic plague is silent: "the 0.5 floor fired zero times in 193 observed soak years" (sf/plague §1) | PG pg-0..4: zero code | **still** until the DM authors an outbreak, then **front** |
| populations | the legacy proportional rate (no carrying capacity); crisis sheds; **M4** refugee columns on the canon; steadings; ruin and resettlement (sf/population §1) | POP-1..7 unbuilt; Wave P dark in every preset; "the migration menu is EMPTY in every shipped world" | **columns** (with netted transfers beside them, since the host serves both) |
| prosperity (the consequence substance) | **frozen**: "a campaign created by `createCampaign` … its band is frozen at generation forever" (sf/prosperity §1) | not an FP family | **frozen** — "this band has not moved: the campaign runs no prosperity writer" |
| wayfare (the body) | WY-1's scale table is built dark: `kmScale` is never written | WY-0, WY-2..11 unbuilt; "the caravan is a week out" cannot fire | (no lens; the lenses' movers obey V13 §5.8 (5)) |

The plainest fact of this read: **of the FP's four substances, none of its own designed waves is lit on the default
world.** Every motion the lenses can draw comes from the pre-FP "Phase 5.5" machinery (M2, M4, the plague front M11a,
the religion contest). H22's birth canon is what wakes that machinery on a born world. The paired product therefore
lives a *different, busier* realm than the same RR campaign without the map. The research once warned that this would
be "a host behaviour change the map must not make by accident" (sf/population §9.3 item 1). The rulings now make it on
purpose.

---

## 1 The walkthrough — six moments, each on both sides

Each moment covers:
- **Host:** what the simulation does.
- **Map:** what the lens or cover layer draws.
- **DM:** what the DM sees.
- **Player:** what a player sees.
- **Stillness:** where the default preset honestly shows nothing.

### 1.1 A plague arriving by road and by sea

**Host.**
- The DM authors the outbreak with Apply-stressor `plague_onset`. Nothing else will start one at default tuning.
- The origin gets both representations at once: the `plague` *condition*, which drains food, healing, legitimacy and
  labour, and the roaming stressor.
- The power and economy generators rerun. A "Quarantine Council" faction appears, and prosperity drops one rank
  (sf/plague §1).
- On the canon the front walks hop by hop "along confirmed trade-type channels in both directions and along live
  supply-shipment links". Shipments run 1.5× hotter.
- Each hop lands after `hopWeeks` "over the frozen digest at the road season — so winter roads, sea lanes and teleport
  circles all shape the latency".
- An onset roll at landing (base 0.34 + density + trade + imports − care) decides whether it takes hold.
- "By sea" means only between digest ports in the sea-lane slot: "geography ∧ a maritime institution", at least two
  of them (sf/trade §9 item 7).
- The hard part: **a front arrival mints the stressor alone**. Such "an arrived plague changes no score, takes no
  population-rate hit and books no deaths until it resolves into a six-tick residual condition" (sf/plague §1).
- The FP's own plague story is wholly unbuilt (PG §1):
  - pg-1: a refugee column "stamped plague-touched at DISPATCH" seeding the town it lands in.
  - pg-2: the owner's "priests and healing and good prosperity and … more orderly" resistance.
  - pg-3: a believed `afflictionBand` refusing a column "at the wall".

**Map.** The plague lens opens in the **front** regime (V13 §5.9 (1)).
- *Phase*: a glyph per seat in the host's words (approaching, active, receding).
- *Approach*: "a ring at the seat with the weeks to onset ('word of plague has reached')".
- *Hop*: a link from source to seat, "captioned 'arrived week n'". Its carrier is named "only when the host sends one
  … never a carrier guessed; no road implied".
- *Next hop*: dotted projection links "by the host's law", DM-only, only when sent.
- *Footprint*: the same-week joins along migration and service links, "no arrow, no time".
- *Consequences*: arrival rings, the second wave of `regional_*` conditions a plague parks along migration and
  service channels.
- *Realm arc* captions: "The Plague", "The Wasting", "God's Abandonment" (sf/plague §1).
- A sea crossing "draws along the host's own lane and is placed by the host's own leg time" (V13 §5.8 (5)).
- The legend carries two notes:
  - the authorship note: organic plague is silent at the host's default tuning, so the lens shows the DM's
    authoring;
  - "a border, a march, a patrol or an army neither stops nor slows it: the host's plague reads none of them".

**DM.** The DM sees the outbreak they authored jump along trade partners at the host's week clock, with arrival
captions and approach rings counting down. On the plague lens the hop towns read **active**. Their dossiers read
nothing until the stressor resolves: the condition gap that H24 asks the host to close. The lens and the dossier
disagree for weeks, and the lens is the one telling the truth about the record.

**Player.** On an omniscient regime (RR), "the player picture is the public truth or nothing" (V13 §5.8 (7)). Where the
host resolves them public, a player sees:
- the phase glyphs' "banded fiction";
- the approach ring with its weeks;
- the arrival of a hop, never its source;
- the realm arc captions.

**Stillness.** Until the DM authors a plague, the lens sits **still**, greyed in the picker: "nothing moves between
settlements". Over a few years of default play a DM who never authors one will never see this lens light. That is
honest, and it is a long silence.

### 1.2 A caravan season

**Host.**
- On a born canonized RR world, the caravan layer is **M2**: "infinite origins, 8-week buffers, starvation only on a
  total cut" (sf/trade §1).
- "Who supplies whom is geometry, not diplomacy": each non-food import pulls from "the three cheapest reachable
  producers".
- "Food never moves as cargo." Six food goods are excluded; a settlement's food import is a standing coverage
  *rate*.
- Winter slows hops through the digest's seasonal overlay.
- Peace has no danger term: "in a realm whose graph has never held a live war front, route danger is zero"
  (sf/trade §9 item 4).
- No caravan can be placed on a road: "`ShipmentRecord` carries no `path` and no `departTick` … A render-time
  re-solve can put the marker on a road the caravan never took — a marker that lies" (WY §0 C4).
- The FP's caravan story does not exist yet:
  - EC's market condition ("nearly double its usual price", EC §0a);
  - the open road steering uncontracted caravans (EC-18);
  - TR-4's grain road;
  - WY-3's positioned caravans: "the caravan becomes a thing on the road" (FOLD §6 C7).

**Map.** The trade lens opens in **arrivals** (V13 §5.9 (4)).
- At every seat: production, needs, exports, imports and services as category glyphs, "food (marked 'never ships')
  and services (marked 'never moves') drawn apart".
- A food-coverage ring "filled to the host's covered share".
- Channels, styled as relations.
- A *supply arrival*: "a dated glyph at the consumer with a link from its source, 'arrived week n'", DM-only.
- On the DM's request, a "likely road" route flow.
- Nothing travels between the ends: the lens refuses "a caravan drawn between its ends without a host clock".
  WY's C4 and V13 agree exactly here.
- The note: "food never ships and a service never moves: the host's caravans carry neither".
- Under RR *applied*, the regime becomes **loads** (M6a), which adds:
  - stock bands and throughput per seat;
  - entrepôt heat with its toll;
  - booms and busts;
  - the one real mover, the "named traveller" on a Roads trade mission, "a moving marker at its leg's fraction".

**DM.** Scrubbing a year of trade on the default world shows:
- the same production and need glyphs at every plate (they are "the host's generation economy as its dossier judges
  it at its last survey … drawn under every regime and never moved");
- a sprinkle of DM-only arrival glyphs, each a link from producer to consumer;
- slower hops in the winter quarter;
- nothing else.

There is no season of trade: no harvest fair, no caravan rhythm, no price. That needs EC and the host's seasonal food
year, which is lit only in DC, LR and FS (sf/trade §7). And the M2 starvation latch is rare in peace.

**Player.** A player sees the seat's own production and needs and its food coverage "where the host's dossier shows
it". The seat's own stock bands become public only under **loads**. Arrivals, entrepôts and criminal channels never
reach them.

**Stillness.** The trade lens is never fully still on a canon. The regime word *arrivals* is technically true, but the
picture is mostly static glyphs that repeat the dossier.

### 1.3 A conversion spreading

**Host.**
- Nothing, on a born world: "Generation seats no deity" (sf/faith §1).
- The DM must author a premium custom deity and seat it.
- In RR, spread is dark: "each settlement's pantheon evolves as if it were the only faith-bearing settlement".
- At least five faith reads still cross settlement lines (prescription, the fracture stressor, tolerance, relief,
  contraband).
- To see a conversion spread, the DM must also light the premium Living-World faith gate, or play DC or FS.
- Then a seat's *patron* "travels along relationship edges and garrison/authority channels". War fronts carry hardest
  (0.72). It is pulled harder by big settlements, clusters through neighbour prevalence and is "attenuated by mapped
  distance on canonized worlds". It becomes a conversion only when it takes the patron seat (sf/faith §1).
- The contest itself "reads no season, no travel time, no route, no territory".
- The rework's niche-and-slot model (RR §2.2–§2.4) is the felt mechanism: a village holds one god, a metropolis
  seven, and "a strong new creed can always force into a saturated city, but only by crowding out its feeblest
  faith".
- The FP's additions are unbuilt:
  - pilgrims and legates on the road ("the pilgrims came", WF-2);
  - stance consequences;
  - schism;
  - the tithe;
  - faith pact terms.

**Map.** The religion lens moves through three regimes (V13 §5.9 (6)):
- **none**: "a creed exists only once the DM seats one".
- **seated**: "pantheons still: no creed crosses a border (a patron's moral prescription and a fracture's unrest
  still do)".
- **spread**: once lit.

It draws "the host's own religious hierarchy first", which the host itself computes and never shows (sf/faith §9.6
item 6). Its other elements:
- per seat, a share ring with each deity's local standing, "the patron's colour filling the seat's area uniformly";
- pressure links by carrier kind, "pressure by the host's law";
- a conversion glyph at the convert, with "a link from its source only when the host sends one";
- patron falls with their cause;
- a **historic front** "(the host never retires one)";
- rank arcs as captions;
- the fracture footprint.

Refused: "pilgrims, missionaries or inquisitors drawn as movers"; "a god's region or a border of faith"; "arrows from
plague to conversion".

**DM.** With spread lit, the DM watches seat-area patron fills flip colour one seat at a time over months. A conversion
glyph lands at each flip, and pressure links show why: often along a war front. That is the most *narrative* picture
in this slice. Without spread, the DM watches a patron fall (WF-1, lit) inside a month: "PATRON_FLIP_TICKS 3 weeks"
(WF WF-1 header). It falls at one seat, alone.

**Player.** "a settlement's own pantheon is shown to every viewer once embedded" (sf/faith §9.6 item 10). A conversion's
headline is public where the host resolves it. Believed faith exists only in the belief presets. Suppressed creeds
never reach a player.

**Stillness.** The lens is still on every born world forever, until the DM authors a god. This is the starkest
"honestly empty" lens in the product.

### 1.4 A famine's migration

**Host.**
- RR has no seasonal food year (dark), so famine comes from structural deficit, a siege or occupation stressor's
  import cut, or a calamity.
- A crisis shed is served **twice** on a canon:
  - the stressor refugee flow, P-5, "still teleports beside the columns", same tick, along a confirmed channel;
  - an **M4 column** "on the frozen digest". In it, "5–40% die at the origin, the survivors split over at most four
    of the eight cheapest reachable mapped settlements, a share of 0.03 + 0.35 × route danger × a season factor
    (spring 0.85, summer 1, autumn 1.1, winter 1.6) dies on the road" (sf/population §1).
- Because of the conflict arbitration, "a source's refugees go to the same destination every tick it rolls".
- Mass emigration in RR "takes two or three stacked crisis conditions".
- The FP's migration story is wholly unbuilt:
  - POP-1's believed road and "refused at the wall";
  - POP-3's departure memory;
  - POP-5a's road drama with its graves line.
- "the migration menu is EMPTY in every shipped world" (FOLD §2).

**Map.** The populations lens opens in **columns** (V13 §5.9 (5)).
- A moving marker "from its departure week toward its arrival along a likely road (labelled)", styled by carriage.
- Sea columns follow "the water lane's laid path".
- Teleport columns are "a dashed arc with no path".
- "port and teleport columns included, which the host's own overlay hides (J384 (12))".
- Netted transfers are dated links "along the host's links, styled by kind", drawn beside the columns.
- Refused:
  - "losses on the road or a column's toll estimated";
  - "migrants drawn carrying a faith or a plague".
- The built-bias note says small seats "hold their head count by the host's own arithmetic: below about n people
  only a transfer, a promotion, or an influx, recovery or crisis condition while it stands moves it".

**DM.** The DM scrubs and sees columns crawl visibly slower in winter, along roads the map lays and labels "likely".
A teleport arc from the same famine town lands on the same neighbour every tick. All of it is DM-only. The DM will
notice the double service (columns *and* teleports from one famine). The lens draws both faithfully, so the lens
shows a host defect plainly. H24 asks the host to serve "each crisis … as netted transfers or as columns, never
both".

**Player.** Nothing. Columns are "DM-only by default". A player sees the settlement's size *label* change if a tier
falls, and in RR no believed trend.

**Stillness.** On a world that never stacks crises, nothing moves. And the small towns that make up most of a born
realm do not grow or shrink at all by themselves. The note says so.

### 1.5 Fields spreading around a growing town

**Host.**
- A large, stable seat grows under the legacy rate. It has no ceiling: "the model that ran away to 29.1 trillion
  people in two settlements".
- Promotion "mints people up to that floor" (sf/population §1).
- The host knows nothing of fields.

**Map.** The **cover fold** (V13 §3.6 (5); spine §3) is the map's own derivation: "cover(cell, week) = stage(the cell's
potential vegetation, the cell's last dated event and its kind, week − that event's week, the use the dated host
facts assign now)".
- Area demand = population × `landPerPersonHaByTier` (1.2 ha for a thorp down to 0.5 for a metropolis) × the crop,
  fallow, pasture and woodland shares.
- Fields go to "eligible cells in ascending travel time until the demand is met, with no time cap". Roads and rivers
  are cheaper, so fields stretch along them.
- Pasture and coppice reach out to two hours.
- Overlapping catchments are split by the seat partition.
- It is drawn by default, "in the DEFAULT picture under `relief`, as an overlay of the used and disturbed classes
  alone" (V13 §5.1, J394).
- Its legend: "the fields, pastures and regrowth the map derives from the campaign's dated facts; the host's dossier
  holds the biome".

**DM.** Scrubbing a few years shows ochre rings that creep outward along valleys and roads around the towns that grow.
They step at a promotion, when the host mints people. This is the slice's most *physical* delight: the map shows a
consequence the host never imagined, built only from host facts, and it re-derives byte-identically.

**Player.** A player sees the cover only "where the host's public facts and the party's known places admit the seats it
derives from". Unknown seats show "their potential vegetation" (V13 §5.8 (9)).

**Stillness.** Below about a thousand people in RR, seats do not grow, so most hamlets' rings are fixed for decades.
The cover also has no season: a field is a field in week 2 and in week 30. There is no harvest stubble and no snow.

### 1.6 Forest reclaiming a razed town

**Host.**
- Razing is rare on a born RR world: War is dark, the razing gate is "built dark in every preset" (sf/alignment §1),
  and the sack happens only in FS.
- What happens: a ruined thorp dies to a remnant and may be resettled (sf/population §1), or the DM razes it.
- For the fields to be withdrawn, the host must send "a razing, a plague's depopulation or an abandonment … as a
  dated event with the seat's population after it" (H34). Otherwise the DM stamps a `razing` disturbance and
  attributes it.

**Map.**
- The cells beyond the new demand take the event's week and enter the biome's succession (V13 §2.3 `world.cover`):
  temperate forest is "weeds 0 · grass 2 · shrub 5 · young forest 20 · forest 50 · old growth 200 yr", and
  mediterranean is "scrub 0 · maquis 10 · oak woodland 50".
- The populations lens dims the glyph. Resettlement draws donor links, honestly legended "the realm's richest" (the
  host's donor pool has no distance term; H29).
- Ruins beneath a town come only from its age at generation, "never grown during the campaign" (spine §9).

**DM.** Over "a few years" the DM sees weeds, then grass at year two, then shrub at year five. No forest yet, and that
is correct ecology. A DM who scrubs the ten-year horizon (`plates.fullWeeks` 520) sees shrubland; forest is a
twenty-year story.

**The trap.** A town that *shrinks* without a dated event (by the legacy decline rate or by flight) loses fields to
"`fallow` (an undated use class) until a dated event or a later demand takes it". So a plague-emptied town's outer
ring reads "fallow" for as long as the host never sends a dated event. The host has no plague death term ("There is no
plague death toll term in any lit lane", sf/plague §1), so H34's "plague's depopulation" event has no natural
producer. The forest never comes back.

### 1.7 What the DM sees scrubbing a year

Plates come "**one per host advance**" (V13 §5.8 (8)).
- A DM who advances a month at a time gets twelve plates.
- One who advances a season gets four, with "the interior weeks of a multi-week advance the host did not send" as
  declared gaps.
- One who advances a year gets one plate and a scrub of host-dated events only.

What moves across a year on the default world: plague marks (if authored), column markers (if crises stack), trade
arrival glyphs, cover rings around growing seats and the sway's revisions. What does not move: production and need
glyphs ("never moved"), prosperity ("frozen"), religion ("none") and alignment (still until H30, DM-only always).

The `lensWhy` card on any mark answers "with the host facts it read and the rule that drew it". This is the scrub's
best companion: a DM who asks "why did this town turn ochre" or "why is this arrival here" gets the receipt.

### 1.8 What a player sees

RR is omniscient, so the player picture is "the public truth or nothing". Every lens "opens DM-only". A row with no
resolved audience is folded DM-only. Columns, arrivals, pressure links, conversions' sources, alignment entirely,
suppressed creeds and criminal trade are never shown. What is left: each known town's production and need glyphs and
food ring, its prosperity word, its size label, its pantheon once embedded, plague phase and approach where public,
conversion headlines, and land cover near known places.

**This is a gazetteer with a few weather marks, not a living map.** It is honest. In the belief presets on a canon
(DC, LR, FS) the party's believed rows ("heard of plague", believed trend, believed faith) add a real player
experience, but not in the default.

### 1.9 Where the lenses show stillness in the default preset (the inventory)

| lens | default state on a born canonized RR world | its words |
|---|---|---|
| plague | still until DM-authored | "nothing moves between settlements" plus the authorship note |
| trade | arrivals: moving, but sparse and DM-only | "food never ships and a service never moves" |
| populations | columns, but rarely triggered; small seats fixed | the small-seat bias note |
| religion | none | "a creed exists only once the DM seats one" |
| prosperity | frozen | "this band has not moved: the campaign runs no prosperity writer" |
| alignment | still until H30; the born lean when sent | "on a born world the host's tables lean malicious and belligerent" |

Three of the six lenses open greyed in the picker on day one, and two more are mostly static. "Collapsed, greyed and
openable … never hidden and never extrapolated" (V13 §5.8 (1), (3)) is the right rule. It is also the product telling
the DM, in six banners, how little of the realm moves by default.

---

## 2 Substance verdicts

### 2.1 What the lenses add to the FP's story

1. **They make invisible host truth visible.** That is the largest addition, and it is real:
   - the plague front's read model "nothing calls" (sf/plague §1);
   - the religious hierarchy "that `mapProfile` says the map should render, unconsumed today" (sf/faith §9.6
     item 6);
   - the port and teleport columns "which the host's own overlay hides";
   - the fracture footprint;
   - the entrepôt centrality.

   None of these is new simulation. All of it is substance the DM has paid for in the host and never seen.
2. **History the host does not keep.** "the host keeps no history of most of them", so the plates *are* the realm's
   memory: ten years at full resolution (V13 §5.8 (8)). A DM can ask "what did the faith map look like before the
   war". The host cannot answer that question at all.
3. **The land itself.** Cover is the one place where the map adds substance rather than showing it. Fields, pasture,
   coppice, succession after a burn or a razing, and silt after a flood — "a pure function of dated facts, never
   stepped, never random". The FP has no physical land; the spine's three lifetimes give it one.
4. **Honest regime banners.** No host surface tells a DM which regime its world runs. "A plainly born campaign reads
   `realistic_regional` and carries none of RR's virtual keys" (sf/trade §9 item 12). The banner is the first place a
   DM learns that their realm is "frozen" or that "no creed crosses a border". The banner reads the *resolved* regime,
   "never from a preset's name". That is a real gift to a DM who believes their campaign is "realistic".
5. **The sea as a season (on the routes layer).** The routes layer's month slider shows "a monsoon route out in summer
   and home in winter". The same pair of ports "differs by a factor of 3–7 with and against the prevailing system"
   (V13 §3.8 (12)). That is a felt geography of trade and travel that no FP volume has. But it stays *presentation*
   until the host adopts it (H33). See §2.4.

### 2.2 What the lenses merely repeat

- **Trade production, needs, exports, imports and services** are the dossier's lists, glyphed. They are drawn "under
  every regime and never moved". On the default world this is most of what the trade lens shows.
- **The prosperity rung** is "the host prints the word". On a born world it never changes. The seat-area fill adds
  colour, not fact.
- **Size labels and steadings.** The host map "already draws steadings as cosmetic orbit dots" (sf/population §1).
- **Channels and the trade-war prize.** The host map has both today (sf/trade §7, the "Host map" rows).
- **The patron fall.** WF-1's town FaithSection already carries the fall line. The lens adds a place and a date.

These are fair repetitions: a lens with nothing at the seat would read as broken. But they are not substance gained.

### 2.3 What is thin

1. **No FP substance is lit.** All of these are dark or unbuilt in every shipped world:
   - EC's market condition and price phrase;
   - TR's houses, corners and ventures;
   - WF's pilgrims, schisms and tithes;
   - PG's contagion, resistance and refusal;
   - POP's believed road, wall, graves and departure memory;
   - WY's bodies on the road.

   The lenses were designed (rightly) to draw only what the host sends. On the default product they draw the pre-FP
   realm. **The lenses cannot make the FP's story felt, because the FP's story is not there to draw.**
2. **Trade has no movers and no money.** The one caravan-like mover (the named trader) is lit only "on canon in 4",
   not RR born. "There is no realm market … no price" (sf/trade §1). A caravan season on the map is a scatter of
   DM-only arrival glyphs.
3. **Plague depends on the DM.** Organic plague is silent. A plague lens over a few years of untouched play shows
   nothing, and the authorship note says so. It will be the most dramatic lens *when used*, and unused by default.
4. **Faith depends on premium authoring twice:** first to author and seat a god, then to light spread. A free DM on a
   born world never sees the religion lens do anything.
5. **Seasons are thin on the substance side.** Every season the map knows lives in presentation: the climate's twelve
   months, lake ice, route snow weeks, sail efforts. The substances read the host's quarterly terrain factor
   (`season.terrainFactor`, per terrain class per quarter) and, for columns, the winter death factor 1.6. The cover
   has no season, and RR runs no seasonal food year. A DM scrubbing a year sees winter only as slower markers.
6. **The player view is thin** (§1.8).
7. **Alignment and prosperity, read beside this slice,** are mostly banners: alignment DM-only and still until H30,
   prosperity frozen on the birth door.

### 2.4 What contradicts

1. **The plague lens's ETA versus WY's ambiguity law.** WY §3b: "A marker is a presence, never an intention. No
   direction arrows, no destination lines, no path highlights, no heading flips, no destination/ETA/purpose in canvas
   tooltips." Against it, V13 §5.9 has:
   - the plague *approach* ring, "with the weeks to onset", public where resolved;
   - *hop* links from source to seat;
   - *next hop* projection links;
   - columns that move "toward its arrival";
   - "likely road" flows.

   The map's research recorded the law (sf/fp-simulator §4.4), and V13 does not answer it. My judgement: most of
   these are *dated facts* (an arrival, an onset week the host computed), not a mover's intention, and the law is
   about mover markers. Even so, the ETA on a public ring is precisely "ETA … in canvas", and the column's "toward its
   arrival" draws a destination. One of the two documents must yield, in writing.
2. **"Migrants carrying faith or plague."** V13 refuses "migrants drawn carrying a faith or a plague". But:
   - WY's ruled design is "physical migration carrying faith" (Q1 BLEND), noted as "an influence, not a conserved
     quantity" (WY §1c);
   - PG pg-1's whole point is the column "plague-touched at DISPATCH".

   Today the refusal is right, because the host applies neither. The day either lands, the populations lens's
   refusals contradict the host. No gate is written on that refusal row.
3. **Cover reads raw population. The research said never to.** The cover demand is "population × `landPerPersonHa`".
   The map's own reading said "the territory projection must read the **tier band**, never raw population, because
   the shipped population has no ceiling" (sf/population §1, §9.1 item 1). The fields have "no time cap". On a long
   campaign a runaway seat's fields will flood its landmass, and the island edge case already concedes it ("takes the
   island and reports the shortfall"). Over a few years this is invisible. Over a 300-year soak it is the picture.
4. **The sea month slider versus the movers' clock.** The routes layer can show a lane three to seven times costlier
   against the wind in winter. The plague crossing and the sea column on the same lane move by "the host's own leg"
   and "the map never shows a mover faster or slower than the host's clock says" (V13 §5.8 (5)). Each is honest and
   labelled. Together they tell the DM two different seas. A DM who reads "winter: hard beat to windward" and then
   watches a plague cross it in the host's symmetric week will distrust one of them.
5. **"Never a region" versus seat-area fills.** The religion lens refuses "a god's region or a border of faith". It
   then fills "the patron's colour … the seat's area uniformly". The seat territory is "the host's own partition:
   total, no wild land" (V13 §5.9 (2)), so every cell of land is coloured by some patron. To a DM's eye that *is* a
   map of religious regions with borders. The label ("this settlement's patron over its seat area") is correct; the
   picture contradicts the refusal. Prosperity and alignment fills do the same.
6. **"Fallow" as a permanent state.** §1.6: an agricultural word stands for decades of abandonment, because a
   shrinking town dates nothing. The cover's purity rule ("no stepping, no stored trajectory") is what produces this.
   It is an honest consequence that reads as a false picture.
7. **The plague lens versus the dossier.** "active" on the lens and nothing in the dossier, until H24's condition gap
   closes. The lens is right about the record and wrong about the town's lived state, because the host itself is
   inconsistent.

### 2.5 What a DM would find confusing

- **Six regime vocabularies in one picker:** front, footprint, still; loads, arrivals, relations; columns, netted;
  spread, seated, none; booming, moving, frozen; lived, born, still. Each is precise. Together they are a glossary
  exam.
- **Five provenance labels:** "by the host's law", "projection", "placed", "likely road", "DM-placed". Plus
  "projection by the host's law" on a next hop, which is both. A DM must learn the four fact classes (V13 §5.8 (4))
  to read a legend.
- **Two grammars for movement.** A teleport arc for netted transfers, a crawling marker for columns, sometimes both
  from one famine. The legend explains it; the double service is the host's defect, made visible.
- **Four trade link sets** that "disagree by construction" (sf/trade §9 item 14).
- **The DM's own cut road.** "cut by the DM: the host names no closer and its caravans do not heed it (until H25)". The
  DM cuts a road and the caravans keep coming. Honest, and baffling.
- **Hops with no road.** "no road implied" next to "likely road" on the same map.
- **Unmapped seats.** Settlements founded after the canon sit outside it until the additive re-canonize (H22). Until
  then the plague's hop floor and the absent supply links mark them.

### 2.6 What a DM would find delightful

- **The approach ring.** "word of plague has reached", counting down. This is the slice's one moment of dread.
- **"Historic front (the host never retires one)".** A faith map that remembers old wars as scars.
- **The hostile war front carrying a creed hardest** (0.72). A DM sees the conquered convert along the line of battle.
  The lens draws the host's real mechanism, and it reads like history.
- **The ochre rings and their why-card,** and the burn scar that greens through grass to shrub across a decade of
  scrub.
- **The honest banner** the first time it says "this band has not moved". A DM learns something true about their
  campaign that no host screen ever told them.
- **Sea columns and teleport arcs** the host's own overlay hides.

---

## 3 The five best and five worst moments

### 3.1 The five best

1. **The plague front with its approach ring** (V13 §5.9 (1)). An authored outbreak jumps partner to partner at the
   host's week, sea crossings on the host's lanes, "arrived week n" on each hop, a public ring counting down to onset,
   and realm arcs named "The Wasting". It is the one place where the paired product feels like a living, dangerous
   world, and every mark is a host fact.
2. **Fields creeping along valleys around a growing town** (V13 §3.6 (5)), scrubbed across years under the relief.
   It is shown by default, and it is the map's own derivation, honestly labelled. The realm finally has a countryside.
3. **The faith map with spread lit** (V13 §5.9 (6)). Seat-area colours flipping one by one, pressure links along war
   fronts, historic fronts as scars, and the host's own hierarchy drawn for the first time. (Premium twice over: a
   seated god and the spread gate.)
4. **Hidden columns made visible** (V13 §5.9 (5)). A famine's sea column on the water lane and a teleport arc to a
   circle holder: movements the host's own overlay drops (J384 (12)). The DM sees where their people went.
5. **The regime banner speaking plainly** (V13 §5.8 (2)–(3)). "pantheons still: no creed crosses a border". "this band
   has not moved". The first honest description of the realm's rules a DM ever gets, and it is right where the
   absence is.

### 3.2 The five worst

1. **The default realm's religion lens, forever "none"** (FOLD §2; V13 §5.9 (6)). A born world seats no god. The
   faith substance (the most mapped of the four, with niches, slots, ranks, piety and fronts) is invisible to every
   DM who does not author a premium deity.
2. **A plague that is "active" on the map and absent in the town** (sf/plague §1; H24). The lens shows the hop. The
   dossier, the town map and the population show nothing until the stressor resolves. The DM must choose which screen
   to believe.
3. **The caravan season that is not one** (V13 §5.9 (4); WY §0 C4). Static production glyphs, DM-only arrival
   sprinkles, no mover, no price, no season. Trade, "the lifeblood" (WY §0), is the deadest lens on the default map,
   by honest design.
4. **"Fallow" for decades around a plague-emptied or declining town** (V13 §3.6 (5) (a)). Without a dated event the
   forest never returns, and the host has no plague-death event to send. Ecology, the slice's best addition, freezes
   exactly where a DM most wants to see time pass.
5. **Two seas** (V13 §3.8 (12) against §5.8 (5)). The month slider shows a winter beat at a seventh of fair speed,
   and the plague crosses at the host's symmetric week. Both are labelled and both are true to their source. Together
   they make the DM's map disagree with itself until H33.

---

## 4 Open questions of substance

1. **Which default does the product want a DM to meet?** On RR's birth door (§0) the lenses are mostly still or
   frozen. RR *applied* (the Instant World) lights M6a, booms, generosity and named traders, and the lenses come
   alive. Should a world from the map module be born *applied*? That is a host and owner question this read can only
   raise. It decides more of the felt product than any lens row.
2. **Should the product seat a god at birth?** FPQ-62 is "the owner's open word". Until it is answered, faith (the
   richest substance on the map) is premium-only in practice.
3. **Who resolves WY's ambiguity law against the lenses' dated links, approach rings and columns "toward their
   arrival"?** The proposal is to split *mover markers*, which follow WY's law, from *dated facts*, which may carry
   their weeks. That needs WY §3b amended or V13 §5.8 (5) amended, in writing.
4. **Should the cover read a banded size (tier, log-banded size) rather than raw population?** That would follow the
   map's own research and keep fields bounded on long horizons. Or should it keep population and cap the demand at
   the tier's maximum?
5. **Should a shrinking town's surplus fields date themselves?** The cover could date them at the advance where the
   withdrawn extent first exceeded a threshold, as an undated-to-dated rule inside the pure function. Or the "fallow"
   class could carry a succession of its own after N years. Without one of these, the forest never returns without an
   event the host does not mint.
6. **Should the cover have seasons?** Stubble after harvest, snow over fields, flood meadows in the wet season. The
   climate already has twelve months. Is a seasonal cover worth its cost in plates, or is it presentation the DM will
   not miss?
7. **When pg-1 or WY-4 lands, what does the populations lens draw?** It needs a gated "plague-touched" or "faith cargo"
   element on the column, and the refusal row reworded to "where the host's lane is dark".
8. **Should the routes layer's seasonal sea show a "the host's movers do not yet read this" banner** whenever the
   plague, trade or populations lens draws a sea link? Or should the sea links show both clocks, the host's and ours
   as a caption, until H33?
9. **Is the seat-area fill the right grammar for patron, prosperity and alignment?** Seat glyphs with share rings and
   no area fill would honour "never a region" in the picture, not just in the label.
10. **What does a player get in RR?** If the omniscient regime gives "the public truth or nothing", should the product
    resolve more host facts public by default? For example, approach rings, conversion headlines and visible cover
    near known places. Or should it state on the player's legend that the realm's motion is the DM's to reveal?
11. **What about the host's double-served famine?** It shows on the lens as teleports beside columns. Does the lens
    draw both until H24, or flag the pair as one crisis with a "served twice by the host" caption?
12. **How does the scrub feel at a DM's real advance cadence?** One plate per advance means a DM who plays in seasons
    or years gets a coarse scrub with declared gaps. Is a month-advance cadence something the product should
    encourage, for example by suggesting it when a lens is open?
