# Reader record — hidden-ways/read-v13-lenses (2026-10-18)

> Seat: reader `hidden-ways/read-v13-lenses` (Opus 5.5, high) of the workflow hidden-ways-design (J407). Reads V13's
> sway, patrols, layers, lens mechanism, lenses, milestones, host track, decisions, BCRs and owner questions against the
> host's request `docs/host-requests/2026-10-18-hidden-ways.md` (cited `HR:n`). APPLIES NOTHING; ran no git.
> Targets as read: `docs/volumes/V13-world.md` md5 `e68af748638dd3c8474d21b37005c7ac` (4 611 lines);
> `docs/volumes/V14-sites.md` md5 `f5dd37a7e9b739da7f29095d47a17a87` (3 340 lines); `docs/ARCHITECTURE.md` md5
> `eac3a6a5ee2c58534185318949ebd8ba`. Line citations are `V13:n` unless named. Tags: [STATED] the text says it;
> [OBSERVED] checked in the repository by this seat; [INFERRED] this seat's reading or proposal.
>
> **Word used in this record.** The host's word "way" collides (§1); this record writes **byway** for the host's
> "hidden way" (a free word in V13, V14 and the base: §1 (4)) so that its own proposals do not mint the colliding word.
> The choice of word is the designers'; every "byway" below reads as "whatever word the reply settles".

---

## 1 The words this design must not break

1. **"way" is the settlement frame's.** The base's `WayClass` is `'through'|'primary'|'secondary'|'lane'|'alley'|
   'cul_de_sac'|'track'|'path'|'quay'|'pier'|'bridge'|'ford'` (`docs/ARCHITECTURE.md:1093`) [OBSERVED]; V13's charter road
   row maps a world class onto it ("highway → through, road → primary, track → track, trail → path", V13:764) [STATED]; the
   world glyph's mark kinds include `'way'` (V13:803) and the `settlements` layer draws "water, wall and way in the base's
   colours at world weight" (V13:3151) [STATED]. A host "way" on the world would be a second meaning of a token both
   volumes already carry — the collision HR:10 asks the map to declare [INFERRED].
2. **"hidden" already has three meanings in V13.** (a) the host's road grade: a host route "graded hidden" is "no
   public road, drawn DM-only" (V13:764, 788, 1815–1820), has no patrol (V13:2065, 1163, T-V13-42 at V13:3737) and joins
   no seat for continuity (V13:1979) [STATED]; (b) the honesty rule's "never hidden": a still lens is "collapsed in the
   lens picker (greyed, openable) — never hidden and never extrapolated" (V13:3287; `world.lens` row "J384 (13): still,
   never hidden", V13:1171) [STATED]; (c) V14's "hidden cult site", whose state is `dmOnly` until revealed (V13:3522;
   V14:764–766) [STATED]. The host's proposal (`hidden` the class, its own ladder's last word, HR:10) matches (a); it
   must never be used for (b) or (c) as a token [INFERRED]. `world.lens`'s collision rows (V13:1174; V13:3316–3320) do not
   list *hidden* [OBSERVED]: the design should add it ("*hidden* the host's grade and byway class only; a lens is
   *still*, never *hidden*; a site's secret is *DM-only*") [INFERRED].
3. **"body" is water's.** V13 uses *body* for a water body ("the world surface's body", V13:755; `WaterCandidate.body`,
   V13:851; "the sailing body", V13:852) [OBSERVED: 46 whole-word hits in V13]. The host's "THE BODIES" (HR:4) must not
   become a lens id or a port token on the map's side; a lens named after them would collide [INFERRED].
4. **Free words.** `byway` and `trod`: 0 whole-word hits each in V13, V14, the base and the host research notes and
   requirements [OBSERVED by `grep -ciw`]; `trace` is taken (`TerrainTrace`, `SurfaceTrace`, the `traces` layer,
   `SwayTrace`: V13:832–833, 3143, 883) [OBSERVED]; `track`/`trail`/`path` are route or way classes (V13:788, 3144;
   ARCHITECTURE:1093) [STATED]. *junction* already means, on the world, "the joined route's polyline point" an approach
   road ends at (V13:1850; `join`, V13:786) — the same meaning the host asks for (HR:24, 28) — while the base uses it for
   a street-graph vertex (ARCHITECTURE:636) [OBSERVED]; usable on the world with that one meaning [INFERRED].

## 2 What V13 already gives the hidden ways (the reading)

### 2.1 The hidden host road is already a DM-only ghost — the precedent

- `WorldRoute.grade` carries "the host's grade word, hidden among them"; the class union `'highway'|'road'|'track'|
  'trail'|'sea'|'river'` has no `hidden` member (V13:788) [OBSERVED]. The host's genesis edges carry grade
  `highway|road|track|hidden` (`research/sf/fp-physical-integration.md:98`) [STATED].
- Drawn: "a hidden host road a DM-only ghost, a hidden water lane a quiet-quay mark" (`routes` layer, V13:3144; entity
  table V13:601; W7 (9) V13:1815–1817) [STATED]; read: "a hidden road counts as no public road" for the route layer, the
  frame's road rows and siting (V13:1819–1820), never an approach road's `along` route (V13:1839) [STATED]; the charter's
  road row flags it `hidden` (V13:764) [STATED].
- So V13 already has a *host edge between two settlements* graded hidden; the request's byways are different things —
  the map's geography, with ends off a settlement (HR:24), no host key (HR:23–28) [INFERRED]. Whether a host edge graded
  hidden IS a byway or stays a hidden host road beside the byways is a designer decision (open point O1).

### 2.2 Patrols (W8b (14))

- Cadence per (route segment, power) of 1, 4 or 13 weeks or none; the host's road watch first — "a road the host closes:
  its closer every week …; a warden's term: at least every four weeks; a road the host grades hidden: none" (V13:2063–2065)
  [STATED]; `gradeShift` "highway +1, road 0, track −1 (hidden: none)" (V13:1163) [STATED]; T-V13-42 "a hidden road has
  none" (V13:3737) [STATED].
- Presence is `patrolAt`'s fixed phase, "a map-tier presentation, never a body the host conserves"; never sent as a time;
  "read by V14's encounters, offered to the host per host edge (`patrolOffer`) and consumed only by the host's choice; a
  covert power's patrols are DM-only" (V13:2076–2082) [STATED]. V14's crop places "patrol 1 per road edge" in a week a
  patrol passes (V14:1131) [STATED].
- `patrolOffer` is per **host edge** (V13:2487–2490) [STATED]: a keyless map road has no row — the approach road
  precedent "carries no host key and is in no `canon` slot, `routeFacts` row, `patrolOffer` row" (V13:1871–1873) and
  "nothing patrols the road to a site" (V13:1868; J-V13.111 at V13:4026) [STATED].
- J396 (the owner's patrols decision, file u item 949): patrols stay map-only; H25 no longer asks the host to give
  coverage a meaning; "H16's optional door open" (V13:136–140; V13:3900) [STATED]; the host requirements say "the
  legend says patrols change nothing in the simulation" (`docs/HOST-REQUIREMENTS-2026-10-18.md:489`) [STATED].

### 2.3 Crossings, border posts, continuity — three readers a byway must not feed

- W8a's crossings are the canon's `TravelEdge`s from the seat-territory flood, not from routes (V13:1898–1901) [STATED].
- Border posts: "every route crossing of an allegiance border or a debatable band yields a transient `SitingProposal`"
  (V13:2089–2094) [STATED] — unguarded, a byway crossing a border would raise a border-post ghost pin [INFERRED].
- Continuity: "a road the host does not grade hidden joins its seat to that sway" (V13:1979) [STATED] — a byway must
  join nothing [INFERRED].

### 2.4 Knowledge and audience — the rules already in force

- `knownTo` on every world entity (`'public'|'local'|'secret'`), default `public` for physical facts; an approach road's
  is its site card's (V13:957–960) [STATED]. **Host facts carry the host's resolved audience** (J-V13.77): public →
  `public`; reserved for the DM → `dmOnly`, "its geometry is withheld with it"; "a fact the host hides is never sent";
  unresolved → DM-only (V13:960–964; J-V13.77 at V13:3992) [STATED].
- V14's three secret states: `dmOnly` (absent from every party key's places), `revealed` (the DM or the host added it to
  the party's places, `knownTo` still `secret`), `discovered` (the party reached it, `knownTo` `local`) (V14:764–766)
  [STATED] — the host's own precedent for the reveal (HR:17: "the map's own reveal list for sites, M-SITE-A").
- The player picture omits "covert links, their exclaves and covert patrols … as entities, never greyed" (V13:3158)
  [STATED]; the lens audience filter: "every lens opens DM-only; a row the host sends with no resolved audience is folded
  DM-only; covert links, columns and patrols fail closed — omitted, never greyed" (V13:3323–3325) [STATED]; T-V13-50
  (V13:3745) [STATED].
- The approach road's knowledge rule: "the road to a DM-only site is DM-only, absent from every player picture and from
  the player audience of the DM's `mapFeed`" (V13:1869–1870) [STATED] — the closest existing rule for a map road whose
  audience follows a secret.

### 2.5 The lens mechanism (§5.8) as it bears on a byway lens

- A lens is "a derived layer over the facts the host sends of one of its simulated systems"; "nothing of a lens is read
  by a stage, a sway revision, an encounter or the clerk" (V13:3251, 3259–3260) [STATED]. So the byway **records**
  (geography) cannot live in a lens; only the host's knowledge, watching and presence marks over them can [INFERRED].
- One record: identity, sources with gate expressions, regime words, elements (fact class, grammar, gate, audience,
  scrub, label, style), events (one shared dated store, tagged at fold by the adapter folder's event table), legend,
  refusals, why; "a lens is added by a row and its element functions, never by a second mechanism" (V13:3262–3276;
  `LensLayer` V13:895–901; `LensElement` V13:902–904) [STATED]. `LensId` is a closed union of eight (V13:891) [OBSERVED]:
  a new lens widens it; D-V13.8 already records three later lenses "each a later row set" (V13:4034–4043) [STATED].
- Regime from the host's resolved regime, never a preset's name; `W_LENS_REGIME_ABSENT` (V13:3277–3283) [STATED].
- Honesty: a false gate draws still, never hidden or extrapolated; built-bias and authorship notes, each gated
  (V13:3284–3297) [STATED].
- Four classes and only four (host-stored S, host-derived D, placement P, owner-ruled map derivation M) beside the DM's
  own world sites (`dmPlaced`); everything else refused — including "motion without a host clock" and "an effect the host
  does not apply (a patrol lowering danger, a border stopping a plague, migrants carrying a faith)" (V13:3298–3310;
  `FactClass` V13:892; J-V13.89 at V13:4004) [STATED].
- Two movement grammars: dated links vs moving markers "placed by that clock along a placed path" (V13:3311–3313)
  [STATED]; a named traveller "a moving marker at its leg's fraction … along that leg's laid path" (V13:3455) [STATED].
- Legend words: the host's words through the adapter folder's vocabulary tables; *gate* "written a border crossing, a
  route's intermediary settlement or a town gate, never bare" (V13:3314–3318) [STATED].
- Scrub: host-dated facts first, the sway's revisions, then plates (V13:3332–3349) [STATED].
- `GateExpr` has `lane`, `canon`, `slot`, `beliefs`, `deity`, `plague`, `born`, `intensity`, `sent` and the
  combinators (V13:893–894) [OBSERVED]: a byway lens's gates are expressible as `lane` (the host's lane for its bodies, by
  the adapter folder's lane table) and `sent` (the knowledge events, the presence rows) with no new gate kind [INFERRED].

### 2.6 The quarantine

- The plague lens refuses "a quarantine line" and "a border, march, patrol, army or migrant drawn carrying or stopping
  it" (V13:3384–3386); its note: "a border, a march, a patrol or an army neither stops nor slows it: the host's plague
  reads none of them" (V13:3366–3367) [STATED]. The patrols lens refuses "a patrol drawn … holding a quarantine line"
  (V13:3428) [STATED].
- plague-R7 is an **open owner ruling** on the host side: the quarantine or gate-closure verb is "DESIGNED ONLY", "never
  as a patrol fact the map draws" (`docs/HOST-REQUIREMENTS-2026-10-18.md:481`); "Quarantine lines | none: no verb, no
  stance input | **never**" (`research/sf/lens-implications.md:196`) [STATED].
- The host's road closure reaches the map today only as `PolityFacts.roadWatch { edge; power; kind: 'closed'|'warden';
  since }` (V13:866), drawn by the patrols lens as "cut by the DM" (V13:3424) [STATED] — no cause field, keyed by a host
  edge [OBSERVED].

### 2.7 Typed places and the hearing

- `WorldWhere.kind` is `'settlement'|'wall'|'road'|'border'|'supplyLine'|'region'|'point'|'offStage'` with `seat`,
  `edge`, `mode`, `fraction`, `pair`, `at` (V13:887) [OBSERVED]: no byway or junction kind.
- `placeOf(world, where)` → "the hearing card's words for a `WorldWhere`" (V13:2518–2519); it takes no audience
  [OBSERVED].
- The hearing card's "where" is H16's clause ("the border segment and the typed place as a hearing card's 'where'",
  V13:3891) [STATED]; the hearing week itself is the host's DM-facing docket, "dark-identical behind" a flag in no code
  (`docs/HOST-REQUIREMENTS-2026-10-18.md:656`) [STATED].
- `WorldEvent` carries `where`, `seats`, `cause` ("the host's cause word — a patron fall's"), `lenses` and the resolved
  `audience` (V13:834–839) [STATED].

### 2.8 The port's laws that bound the design

- Law (1): "the canon's slots are pure functions of the physical layers, the host's cost law and the member seats, and
  no lived host fact enters them" (V13:2575–2577) [STATED]; routes are **not** in the canon — "the host keeps its own
  all-pairs costs, neighbour tiers, candidate routes and water-lane law over it" (V13:2453) [STATED]. A byway slot whose
  ends are junctions on host routes would make a slot depend on the genesis or lived network, which law (1) does not
  admit as written (open point O2) [INFERRED].
- Law (3): "truth only — no believed fact enters or leaves the canon, believed views riding the presentation inputs"
  (V13:2578–2579) [STATED]: a town's knowledge of a byway is a true fact about the host's state, carried as a dated host
  event, never in the canon [INFERRED].
- `events(world, window, events)` is a **recorded** input, a windowed replace that adds, supersedes and retracts
  (V13:2530–2535, 2549–2551) [STATED]; the lens window is a presentation input kept as plates (V13:2563–2567) [STATED].

## 3 How the hidden-ways layer draws under §5.8 (the proposal)

**The shape [INFERRED, this seat's proposal].** Two parts, because §5.8 forbids a lens to hold geography (§2.5):

- **(i) The byways themselves** — the map's geography, a world entity laid by W7 — draw in V13 §5.1's **`routes`
  layer**, the same structural layer that already draws the hidden host road as a DM-only ghost and the approach road
  under its site card's knowledge (V13:3144). Their audience is their own secret state, V14's three states reused:
  `dmOnly` (default for every byway), `revealed` (the DM's reveal, a dated map edit; or the host adding it to the party's
  places), `discovered` (the host's event that the party travelled or learned it, when sent). No lens element draws the
  line, so J-V13.89's four classes stay four.
- **(ii) The host's marks over them** — which town knows a byway, who watches it, which body is on it, what happened
  there — are a **lens**, one `LensLayer` row set (proposed id `byways`), a ninth lens beside D-V13.8's later three,
  built after the patrols step.

### 3.1 (i) The `routes` layer's byway row

| audience | what draws | style |
|---|---|---|
| the DM, default | nothing for a byway no town knows and the DM has not revealed — the host's rule (HR:17, 33); a byway some town knows, in its own style (the lens adds the town's mark); a revealed or discovered one | a byway style row of its own in `style.world` (e.g. 0.4 px dash-dot), never a route class's |
| the DM, view key on (proposed `showByways`, default off, like `showTraces`, V13:3143) | every byway laid, unknown ones as a ghost (as the hidden host road, V13:3144), with their junction ticks | a ghost variant of the byway row |
| a player | only `revealed` or `discovered` byways, and byways a host row resolved public (J-V13.77); never an unknown one, never greyed (V13:3158, 3324) | the byway row; the junction tick only on a drawn byway |

The view key is the DM's way to see the geography it may reveal; default off so that a DM's picture export ("the view
as drawn", V13:3212) never carries the whole network by accident [INFERRED].

### 3.2 (ii) The `byways` lens — a `LensLayer` row set

**Identity.** id `byways` (word per §1); asked: J407's host request answered under J404's delegation (the owner's rule
for the bodies, HR:4); subject: the host's moving bands, by the adapter folder's system table; order: after the patrols
step (§5).

**Sources and gates** (V13:3264–3265; `GateExpr`, V13:893–894):

| source (port field) | gate |
|---|---|
| the `WorldEvent`s of the byway-knowledge kind (the host's word through the adapter folder's event table; its `where` a byway, its `seats` the knowing seat, its how-word through the vocabulary table) | `sent` that kind |
| the `WorldEvent`s whose `where` is a byway or a junction (engagements, sorties, the hearing's verdicts) | `sent` |
| the host's watch on a byway (a road-watch row naming a byway instead of a host edge, or a dated event) | `sent` |
| the lens window's presence rows placing a band on a byway at a fraction (H23's journeys' grammar) | `sent` |
| the host's lane for its bands | `lane` |

**Regime words** (first whose gate holds; last the still word): **known** — the host's lane lit and its knowledge
events sent: "towns know byways by the host's ledger"; **revealed** — no knowledge sent (lane dark, standalone world):
"no town's knowledge is sent: byways show only as the DM reveals them"; **still** — no route laid ("no road is laid,
so no byway meets one"). **The regime never reads how many byways exist**: a regime word computed from a byway count
would tell a player whether any exist (the "still" word keys on routes, which are public, as the patrols lens's does,
V13:3419) [INFERRED].

**Elements** (V13 §5.9's columns):

| element | reads | drawn | class | regime | audience | scrub |
|---|---|---|---|---|---|---|
| known to | the byway-knowledge events (knowing seat, byway, how-word, week) | the knowing seat's pip in its allegiance colour along the byway, captioned "known to ⟨seat⟩ since week n" with the host's how-word | S, placed | known | DM; a row the host resolves public draws its byway for the party with the mark | host-dated |
| watched | the host's watch on a byway | the watcher's colour on the byway, legend "watched: the host's word" | S | known, when sent | DM | host-dated |
| on the byway | the presence rows (band, byway, fraction, week) | a moving marker at the host's fraction along the byway's laid line (the named traveller's grammar, V13:3455) | S, placed | when sent | DM-only by default; covert omitted, never greyed | host-dated |
| at the junction / on the byway | events whose `where` is a byway or junction | the `events` layer's pin, tagged with this lens (V13:3149) | S | every | the host's resolution | host-dated |
| junction | the byway record's junctions (the map's geometry) | a tick on the overt route **only where its byway draws** | P | every | follows its byway | lay versions |
| width word | the byway record's width/kind hint (the map's own word, HR:27) | a caption on the byway card | P | every | follows its byway | — |

**Events.** The byway-knowledge kind and every event kind whose `where` is a byway or junction, tagged `byways` at fold
by the adapter folder's event table (V13:3268–3271) [INFERRED].

**Legend** (V13:3314–3322): first row the regime banner; then one fixed sentence in **every** regime and audience —
"Byways show only where a town is known to use one or the DM has revealed one; others may exist." — which is true
whatever the count (HR:33's "hidden ways exist and are known per town … never how many") [INFERRED]. Gated notes:
"patrols ride no byway; a byway is watched only where the host says so" (every regime; §6); "a closure stops the road,
not the byway: the host's law" (gate: the host's quarantine verb lit, §7); "the host chooses who takes a byway by its
stance; the map draws a band only where the host places it" (gate: the lane). Vocabulary: the host's how-words and band
words through the adapter folder's tables; this volume's strings only the labels, still reasons and notes.

**Refusals** (`refuse.lens.invented`): an unknown byway drawn for any audience (the DM's opt-in ghost is the `routes`
layer's view key, not a lens mark); a count of byways — laid, known, revealed — on any party-facing surface; a band's
course guessed (motion without a host clock) or a band drawn on a byway the host did not name; an ambush, sortie, choke
point or danger at a junction the host did not send (the host's ambush rule is topological, HR:18 — the map draws the
junction, never the verdict); a line of sight presented as the host's (HR:18; ENC-HL-11); a patrol cadence on a byway
(§6); a byway drawn carrying, slowing or bypassing a plague, or a quarantine line (§7); the host's capacity band drawn
from the map's width word (the host derives it, HR:26); a byway drawn as a road promoted, or a decayed road drawn as a
byway (HR:35).

**Audience** (V13:3323–3331): DM by default; a player sees only revealed or discovered byways and the host's public or
believed rows; a town's knowledge, a watch and a band's presence DM-only unless the host resolves them public;
fail-closed: an unresolved row DM-only, a covert band omitted.

**Why.** `lensWhy` per mark: the host row (its kind, how-word, week, audience) and the rule; for a party, a revealed
byway answers "revealed by the DM, week n" and nothing about its unknown neighbours [INFERRED].

### 3.3 Every surface where the count or an unknown byway could leak (each needs its rule)

| surface | V13 today | rule proposed [INFERRED] |
|---|---|---|
| the `routes` layer and its km labels | lengths labelled in km (V13:3144) | a byway's length only where it draws |
| the lens picker's row, the still reason, the banner | regime from host facts (V13:3277–3283) | never from a byway count (§3.2) |
| the legend | per lens (V13:3314) | the fixed sentence; never a number |
| labels | a route takes its ends' names (V13:601) | a byway takes no label for a party unless revealed |
| the screen-reader summary | "the extent, the seas, the named rivers and the settlements by tier" (V13:3230) | lists no byway count |
| exports | `ecosystemGeoJson`/`worldCsv` routes (V13:3209, 3211); picture exports as drawn (V13:3212) | byways only in the DM's export; a player-audience export holds exactly the party's picture (T-V13-50's rule, V13:3745) |
| `mapFeed(world, week, audience)` | the approach roads "keyless, each in the audience its site card's knowledge admits" (V13:2503) | byways keyless, each in the audience its secret state admits |
| `placeOf` and the hearing card | no audience parameter (V13:2518) | the hearing is the DM's docket, so the byway may be named there; any party-facing reading names only "the country it crosses" (HR:19) for a byway the party does not know |
| the `events` layer | pins at the event's place (V13:3149) | a public event on an unknown byway draws its point and the country words, never the byway's line or name (open point O7) |
| border posts (W8b (16)) | every route crossing of a border (V13:2089) | no proposal on a byway |
| continuity (W8b (9)) | a road not graded hidden joins (V13:1979) | a byway joins nothing |
| patrols, `patrolOffer`, V14's crop | per route segment / host edge (V13:2063–2082; V14:1131) | none on a byway (§6) |
| the 2.5D drape | routes draped (V13:3239) | follows the audience |
| the scrub | host-dated first (V13:3332) | a knowledge mark from its event's week; a reveal from its edit's week |

**A non-interference test** belongs with this (proposed T-V13-59): two worlds that differ only in their unknown byways
give a byte-identical player picture, legend, picker, `lensWhy` answers, screen-reader summary, `mapFeed` for the player
audience and every player-audience export; the DM's default picture (view key off) likewise [INFERRED].

## 4 Which H rows the host's knowledge event, presence rows and hearing places join

- **H9** is "the events window after every advance, undo and resume, committed facts only … with the resolved audience"
  (V13:3884) [STATED]: the carrier of the host's byway-knowledge event (HR:33's event) — no change to H9's text is needed
  for the carrier, only a new event kind and its place [INFERRED].
- **H23** is "the lens window … beside the events window", carrying "named travellers' journeys, netted transfers,
  columns" and, "in the events window (H9), the dated events each lens reads" (V13:3898) [STATED]: the carrier of the
  presence rows (HR:11 "the week's presence rows (H23)") [INFERRED].
- **H16** carries "the border segment and the typed place as a hearing card's 'where'" (V13:3891) [STATED]; the host
  says it "does not consume" H16 (HR:11) — so the byway's place should not depend on the host reading `placeOf` or H16:
  the host names a byway or junction by the id its own copy of the layer carries, and sends it back in the event's
  `where` [INFERRED].
- **H25** asks the sway and patrol facts; patrol coverage's host meaning "NOT asked" (J396) (V13:3900) [STATED].
- **H13** carries "its road closures and wardens' terms" (V13:3888) [STATED]: a quarantine closure, once the host's verb
  exists, joins that row's road-watch fact with a cause word, or rides H9 as a dated event (§7) [INFERRED].
- **Recommendation: one new row, H32** (H31 is the last, V13:3906 [OBSERVED]), "the byway asks", as each lens step has
  its own asks row (H24–H30, V13:3899–3905) [STATED]: (a) the byway-knowledge event in the events window — the knowing
  seat, the byway's id, the host's how-word, the week, the resolved audience (DM-only where unresolved), its retraction
  by the windowed replace; (b) every engagement on a byway or at a junction with its `where` naming the byway or
  junction (or the country it crosses); (c) the bands' presence on a byway in the lens window as journeys are (band key,
  byway, fraction, week, audience); (d) a watch on a byway where the host keeps one; (e) its builder reading the byway
  slot of the canon (an H5 sibling) — waits on M-W2, H5, H9, H23. Q2's text "H1–H31" (V13:4432) and its recommendation's
  schedule then name H32 [OBSERVED: the count appears there] [INFERRED]. A new row over amending H9/H23 because H9 and
  H23 are generic carriers whose texts list no lens's kinds one by one except H23's events list, and §8.5's convention
  gives every lens step its own asks row with its waits-on [INFERRED].

## 5 Which milestone carries the layer and the reveal

- M-W2 holds "W7 Routes … the genesis lay and the lived network; W7 (12)'s approaches …; W8a and W8b with the patrol
  step and the border-post proposals; … the routes, seat territory, sway, occupation, debatable, fighting, patrol and
  event layers" (V13:3814) [STATED]; M-W5 holds "the lens mechanism … the lenses in the ruled order, each a step — …;
  the sway (territory) and patrols (M-W2's layers reconciled to the record); …" (V13:3816) [STATED].
- **The layer (generation, the record, the canon slot, the `routes` layer's byway row, the DM's reveal) fits M-W2**:
  byways are laid by W7 after the network (their junctions are on routes), are read by W8b's patrol, continuity and
  border-post steps (each must exclude them, §2.3), and the approach road's knowledge rule — the nearest precedent for a
  map road whose audience follows a secret — is already M-W2's (J393; V13:3814) [INFERRED].
- **The knowledge, watch and presence marks fit M-W5**, as a step after "the sway (territory) and patrols", the same
  pattern by which M-W2's patrol layer is "reconciled to the record" there (V13:3816): they need the `LensLayer` record,
  the audience filter, the events' lens tags, the scrub and `lensWhy` (V13:3262–3276) [INFERRED].
- **For the host's bodies chain**, the prerequisite to name is **M-W2** (the record and the reveal — what the host's
  stand-in is replaced by, HR:12) with the knowledge lens as M-W5's later step; drawing the town's mark is not a
  prerequisite of the host simulating knowledge (the host keeps its own ledger, HR:42) [INFERRED]. Alternative: a
  half-milestone pair like M-SITE-A/F (V14:2993–2996) — rejected here because M-W2 already holds every reader the layer
  touches [INFERRED].
- Estimate: M-W2 is 8 pw at a whole-week resolution (V13:3814) and M-W5 7 pw (V13:3816) [STATED]; the additions are the
  designers' to price.

## 6 The patrols interplay

- **Coverage zero on an unknown byway** holds already if a byway inherits the hidden grade's row: "a road the host grades
  hidden: none" (V13:2065), `gradeShift` "(hidden: none)" (V13:1163) [STATED].
- **"A known way can be watched"** (HR:17) is the host's simulation ("the host decides that") [STATED HR:17]. Two
  options for the map's picture:
  - **(A)** a map cadence on a known byway for the knowing seat's power, by the round-trip rule one rung sparser —
    class M "projection" — would be the map's guess at a watching the host decides, would put patrol pieces in V14's
    crop on a byway (V14:1131) the host may not watch, and extends J378's owner rule (garrisons, hostility, grade) to a
    thing the owner did not name [INFERRED];
  - **(B, recommended)** no cadence on **any** byway, known or not; a watch drawn only as the host sends it (class S,
    §3.2's "watched"); `patrolOffer` never names a byway (it has no host edge, V13:2487; the approach road precedent,
    V13:1871–1873) [INFERRED]. B keeps J396 whole — patrols map-only, the host's coverage the host's — and makes "coverage
    zero on an unknown way" true by construction.
- J-V13.111's "nothing patrols the road to a site" (V13:4026) is the same shape and the precedent to cite [INFERRED].

## 7 The quarantine gate

- Today the map draws **no** quarantine line: refused in the plague and patrols lenses (V13:3385, 3428) [STATED]; the
  host has no verb (plague-R7 open, `docs/HOST-REQUIREMENTS-2026-10-18.md:481`) [STATED].
- **What "a way crosses the quarantine line" needs from the map** [INFERRED]: (1) nothing until the host's verb exists —
  the refusal stands; (2) once the host sends a closure, it arrives as a host-stored, dated fact naming *which* gate —
  under the collision rule a town gate, a border crossing or a route's intermediary settlement, never bare (V13:3317–
  3318) — on H13's road-watch row with a cause word or as an H9 event (§4); (3) the plague lens gains one element,
  "closure" (S, host-dated, the host's audience), and its refusal narrows from "a quarantine line" to "a quarantine
  line the host did not send"; (4) the byway draws **unchanged** across it — the map adds no "bypass" mark, never
  computes which byways cross the closure for a player, and never draws a byway carrying a plague (the plague note:
  "the host's plague reads none of them", V13:3366–3367; refusal "migrants drawn carrying a faith or a plague", V13:3489–3490);
  (5) a gated legend note states the host's law: "a closure stops the road, not the byway" (§3.2). The DM may read which
  junctions lie beyond a closure from the geometry (class P) on the byway card — never as a host verdict.
- The host's word "a gate closed for quarantine" (HR:20) must be carried as which gate it is (V13:3317) [INFERRED].

## 8 Decision rows the design would add or amend (each "chose X over Y because Z") [INFERRED]

Numbered from J-V13.114 (J-V13.113 is the last, V13:4028 [OBSERVED]); the designers renumber as they merge.

| id | the row |
|---|---|
| J-V13.114 | chose **`byway`** (or the reply's free word) for the host's hidden way over **`way`**, because *way* is the settlement frame's `WayClass` and the glyph's way mark (base §2.4; V13 §2.2), and over *trace*, *track*, *trail* and *path*, each already a record, layer or class; *hidden* kept as the host's grade and byway class only, a lens *still*, never *hidden* |
| J-V13.115 | chose **the byway's line in the `routes` layer under its own secret state** (V14's three states: DM-only, revealed, discovered) and **the host's knowledge, watch and presence as a lens over it**, over a lens holding the geography (a lens is read by no stage, so W7, W8b and the crop could not read it) or a fifth fact class for map geography (J-V13.89's four and only four) |
| J-V13.116 | chose **an unknown byway undrawn in every picture, the DM's whole network behind a view key default off**, over an always-on DM ghost (a DM's picture export would carry every byway) or no ghost at all (the DM could not reveal what it cannot see) |
| J-V13.117 | chose **one fixed legend sentence in every regime and audience, and no regime word, picker state, label, summary or export that reads the byway count**, over a count (the leak the host names) or a legend row shown only when some byway is known (its presence would itself tell a player one exists) |
| J-V13.118 | chose **knowledge per town as the host's**, a dated host event in the events window with its resolved audience, drawn and never decided by the map, over a knowledge flag on the byway record written by the host (the map would store the host's state as its own fact) or a map rule for who knows (an invented fact) |
| J-V13.119 | chose **no patrol cadence on any byway**, a watch drawn only as the host sends it, and no `patrolOffer` row for one, over a map cadence on a known byway (the map guessing the host's watching, patrol pieces in the crop where the host may set none), because J396 keeps patrols map-only |
| J-V13.120 | chose **`WorldWhere` kinds for a byway and a junction** (the byway's id and a fraction; the junction's id), the party reading only the country it crosses where it does not know the byway, over `point` (the hearing card could not name the place) or `road` (a byway would count as a road for every reader of roads) |
| J-V13.121 | chose **the quarantine refusal kept until the host sends its closure, then a host-stored closure element and a gated note of the host's law**, the byway drawn unchanged across it, over drawing a quarantine line (no host verb) or marking which byways bypass it (a meaning the host computes) |
| J-V13.122 | chose **the layer and the reveal in M-W2 and the knowledge lens as M-W5's step after the patrols**, M-W2 named as the bodies chain's prerequisite, over M-W5 alone (the host's stand-in would wait on the whole lens mechanism) or a new milestone (M-W2 already holds every reader a byway must be kept from) |
| J-V13.123 | chose **no border-post proposal, no continuity and no siting read through a byway**, over treating it as a route of the lowest class, because a border post or a site on a byway would publish a secret way and a byway joining a vassal's sway would let the DM's secret move the sway |

**Amended** (one clause each): J-V13.66 (patrols derived, V13:3981) — "a byway carries none"; J-V13.77 (V13:3992) and
J-V13.92 (V13:4007) — byways and the bands on them among the covert things omitted, never greyed; J-V13.78 (V13:3993) —
the word list gains the byway word and *hidden*'s one meaning; J-V13.87 (V13:4002) — the ninth lens a row set of the
same record; J-V13.89 (V13:4004) — unchanged if J-V13.115 holds (the line is no lens mark); J-V13.93 (V13:4008) — the
build order gains the byways step after the patrols; J-V13.113 (V13:4028) — the approach road's "no road to pricing and
siting" shape cited by J-V13.123. `LensId` (V13:891), `world.lens` order (V13:1170) and collisions (V13:1174) widen.

## 9 Tests (proposed) [INFERRED]

T-V13-59 the non-interference test of §3.3; T-V13-60 the byways lens (an unknown byway draws in no picture; a known one
draws for the DM with the knowing seat's mark from its event's week; a revealed one draws for the party; a public row
draws its byway for the party; a retracted event removes the mark; the regime reads known, revealed or still, never from
a count); T-V13-42 gains "a byway has none and no `patrolOffer` row"; T-V13-50 gains byways and the bands on them among
the omitted; T-V13-48's lint covers the new elements. (T-V13-58 is the last in V13 [OBSERVED]; file t's note cites a
T-V13-60 that V13 does not carry, `docs/AMENDMENTS-2026-10-18t.md:1080` [OBSERVED] — the designers should check the
number is free.)

## 10 BCRs and requests [INFERRED]

- No base change: the base's `WayClass` is untouched (the word moves, not the class) [INFERRED].
- BCR-V13-39's lens picker rows are generic (V13:4379–4389) [STATED]: a ninth lens needs no new V09 row; the view key
  `showByways` joins BCR-V13-5's world view keys (V13:4098) [INFERRED].
- A request to V14: the encounter crop on a byway (its edge class in the crop, no patrol piece, its secret state carried
  to the crop's audience) — V14's E-steps read patrols per road edge (V14:1131) [STATED] [INFERRED for the request].

## 11 Open points for the designers

- **O1** A host edge graded `hidden` (V13:788; research R2 at `fp-physical-integration.md:98`) — is it a byway, or a
  hidden host road beside the byways? One word, two records otherwise.
- **O2** Port law (1) (V13:2575–2577) admits only the physical layers, the cost law and the member seats into a canon
  slot; byway junctions on host routes need the genesis network as an input (amend law (1)) or junctions as world points
  with the route only as a reading.
- **O3** The DM's view: the host's rule ("draw only when a town knows it or the DM reveals it", HR:17) read strictly for
  the DM too, with the whole network behind a default-off view key (this record's J-V13.116), or an always-on DM ghost.
- **O4** A new lens `byways` vs rows of the patrols lens (the patrols lens is J378's road watching; knowledge per town is
  another host system) — this record recommends a new lens.
- **O5** Patrols option A vs B (§6); this record recommends B.
- **O6** H32 vs amending H9/H23 (§4); and whether the band presence rows are H23's journeys (a frozen path and a leg
  clock) or a byway-and-fraction row of their own.
- **O7** A public event on an unknown byway: drawn at its point with the country's words (the host resolved it public),
  or moved to the country's label point (the map would be moving a host fact).
- **O8** Whether `placeOf` takes an audience (it has none today, V13:2518) or every party-facing reading of a byway place
  goes through the audience filter at draw.
- **O9** The how-word (`WorldEvent.cause` is "a patron fall's" cause word, V13:837): reuse `cause` with the event
  table's kind, or a field of its own — one word, one meaning.
- **O10** The quarantine closure's carrier: H13's road-watch row with a cause word (keyed by host edge — a town gate is
  not an edge) or an H9 event at a typed place; waits on the owner's plague-R7.
- **O11** Whether a revealed byway meeting a placed frame enters the charter's `roads` (door 1 is outbound only; the
  frame would draw a secret way into town) — the approach road enters a site frame's charter only (V13:1865).
