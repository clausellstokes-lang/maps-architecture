# Amendments z — the campaigns pass (J399): the next campaign on one world, several campaigns carved at generation, the world page and the world map as VTT scenes, the party pin, weeks not days, players view-only

> **Revised 2026-10-24 by Opus 5.5 under the J375 addendum (docs/PROGRESS.md J400 (9), (10)): the party's place under the
> host's party program; the items revised are PENDING FABLE REVIEW.** The host's answer (research/sf/host-reply-2026-10-24.md
> S5; research/sf/host-rulings-mirror.md §1, §2) re-homes the party's place to the host's party program: on a host-bound
> world the host is the ONE WRITER of where the party is. **Items revised:** 1257 (b) (the R4 sentence of the new §1.3
> bullet); 1258 (a), (b) (the `PartyPlacement` and `setPartyPin` rows); 1259 (b) (`PartyPlacement` gains `present`, the
> two kinds of placement, the standalone and host-bound rules), (c) (`LensFacts.partySeat` REPLACED by `partySeats`,
> `partySource`, `partyStamp`, `partyHome`; the observer's pair rule), (f) (`CampaignFacts.homeSeat` REMOVED), (g) (the
> known set from the host's whereabouts and the map-only placements), (h) ADDED (`LensRule.partyNewsDelay` to the nearest
> seat of `partySeats`); 1260 (b); 1262 (a) (J400 (7): the next campaign's spatial canon alone, the realm canonize before
> its first advance, an undo revoking `canonized`), (d) (the seam word **the party's whereabouts**), (e) (law (11)
> translates `partyStamp` and `requestPartyPresent`'s week); 1263 (a), (b) (`W_PARTY_PENDING`), (d); 1264 (d) (the
> `partyPin` row draws the host's place, pending, or the DM's picture); 1266 (a); 1267 (a)–(c) REWRITTEN (the observer
> and the default-preset news delay read `partySeats` alone; a pair reads the home seat's court, failing closed; FILE z's
> FALLBACK THROUGH THE COURT-FACTS REQUEST (H40) REMOVED — the host holds the court viewpoint, J400 (10) — and its "seat
> whose territory holds the pin" removed); 1270 (T-V13-120's undo clause; T-V13-122, T-V13-123 revised; T-V13-126,
> T-V13-127 added); 1271 (a) (H22's clause to J400 (7)), (b) (H35's clause: checked against J400 (12) and the mirror — no
> contradiction; it now names the host unit that builds it, accepted not scheduled, reading no map feed), (c) (H39
> REWRITTEN in place to the host's answer, its felt sentence and first-visible line kept), (d) (H47's canon to J400
> (7)); 1272 (J-V13.193's clause; J-V13.196 revised; J-V13.198, J-V13.199 added); 1273 (a) (BCR-V13-57 gains
> `requestPartyPresent` and `W_PARTY_PENDING`); 1274 (the R4 ruling and the host's share); 1278 (a)–(c); 1279 (a); 1284
> (a) (T-V15-37), (c) ADDED (T-V15-31's mock host); 1285 (d), (e) ADDED (SA1's party reach; the dark arm); 1286
> (J-V15.51); 1287 (b) (RQ-V15-16); 1290 (c) (the pin's strings on a host-bound world); 1292 (T-V9-98, J-V9.168 added);
> the owner-rule item 1256 gains one line under R4. **Items added:** 1294 (V13 §3.11.6: the party's place on the
> presentation rows; `requestPartyPresent` beside `requestDossierUpdate`), 1295 (V13 §7.5: `W_PARTY_PENDING`). **Checked
> and unchanged:** no text of z names `PolityFacts.names` (J400 (2)) or seats a deity (J400 (4)); no text of z's own
> expects a host reader of the map feed (J400 (12)) — item 1264 (a) re-quotes the standing "tolls to {seat} until the
> sway soaks" verbatim from the target and leaves its change to file ab; the revised texts call the host's realm act
> "the host's realm canonize", never "world clock", which this file's law (9) reserves for the map's one week axis.

Written by the session's Fable seat amendments/campaigns-z on 2026-10-24 under the owner's five clarifications of
that day (`docs/PROGRESS.md` J399, verbatim there and in item 1256: a campaign is a region of the map, several at once
or one after another; the world runs in weeks and anything finer is the DM's; the world map is also a VTT scene;
players are view-only; the party teleports and flies, so the map never computes its journey — read and ruled R1–R6 by
the session, each vetoable). The pass before this one (J397/J398: amendments v, w, x and y) is applied; every target is
quoted AS IT STANDS ON DISK NOW, and no other file of this pass touches the targets. This file carries the six rulings
into volume 13 (R1, R4, R5, R6 and R3's world-page scene), volume 15 (R2's carve, R3's atlas scene, R4's reach, R6),
volume 14 (R3's shared scene writer, R6), volume 9 (the strings) and the base (R3's profile at the world rungs) by
change items. It designs what the rulings ask and no more; where a ruling was under-specified the choice is recorded in
its J row ("chose … over … because …"). Nothing here is applied: an Opus apply seat applies this file after the review
seat has checked it.

Numbered from **1256** (file y ended at 1255).

**APPLIED** — (left for the apply seat: the record docs/validation/coherence/campaigns-z.md; the count of items and fragments applied; any item not applied.)

**Ids minted:** items 1256–1295 (1256 the owner-rule item; 1257–1295 thirty-nine change items over five targets, 97 fragments; 1294 and 1295 added by the J400 revision); H47; J-V13.191 – J-V13.199 (J-V13.198, J-V13.199 by the revision); T-V13-120 – T-V13-127 (T-V13-126, T-V13-127 by the revision); BCR-V13-56, BCR-V13-57; WORLD-24; J-V15.49 – J-V15.51; T-V15-35 – T-V15-37; BCR-V15-19; RQ-V15-16, RQ-V15-17; ATLAS-17; J-V14.59; T-V14-36; BCR-V14-27; J-V9.165 – J-V9.168; T-V9-97, T-V9-98 (J-V9.168, T-V9-98 by the revision); the records `CampaignRecord` and `PartyPlacement` (with `present`, by the revision), the fields `LensFacts.partySeats`, `.partySource`, `.partyStamp` and `.partyHome` (by the revision, REPLACING `LensFacts.partySeat` and `CampaignFacts.homeSeat`), the port request `requestPartyPresent` and the warning `W_PARTY_PENDING` (by the revision), the fields `WorldRecipe.carve`, `SettlementFacts.stoodAs`, `CampaignTimeline.entries[].campaign`, `Requirement.kind` `carve`, `MemberOrigin` `carved`, `Arrangement.by` `carve`, `Member.carvedFrom`, the record `CarveRecord`, `ExportOpts.vtt.world` and `ExportOpts.vtt.atlas`; the edit kinds `setPartyPin`, `bindCampaign`, `closeCampaign` (V13) and `carve` (V15); the port's law (11); the outcome keys `refuse.world.campaignLive`, `refuse.world.campaignClosed`, `refuse.world.pinDate`, `refuse.atlas.carve.one`, `refuse.atlas.carve.bound` and the warning `W_CARVE_REACH`; the layer `partyPin` and the per-viewer view key `showPinHistory`; the shared scene writer `sceneSet`. **Ids left free in my blocks:** items 1296–1300; J-V13.200; T-V13-128; J-V9.169; SP-W12 onward; BCR-V15-20 onward; RQ-V15-18 onward; ATLAS-18 onward; T-V14-37 onward; BCR-V14-28 onward. J400 assigned the rest of this file's former free ids to file ab (H48; D-V13.17+; BCR-V13-58+; WORLD-25+; J-V13.201+; T-V13-129+; J-V15.52+; T-V15-38+; J-V9.170+; T-V9-99+; J-V14.60+). The party's place needed no new H row: its host send is H39's, rewritten in place (item 1271 (c)).

**Dry run (after the J400 revision):** 39 change items, 97 fragments; every current text matched exactly once at its turn and every new text exactly once after, on FRESH copies of the five targets as they stand on disk after files v, w, x and y (the script `experience-pass/z-revise/dryrun_zr.py` in the session's scratchpad, z's `experience-pass/z/dryrun_z.py` unchanged in a new folder: the review seat's `dryrun_vwx.py` parser, the seats' `world-growth/revise/dryrun_revise.py` lineage, one file and five targets; it reports the out-of-sequence numbers of items 1294 and 1295, placed by target order, as notes; V13 6342 → 6599 lines, V15 2438 → 2512, V14 3253 → 3264, V09 5252 → 5302, the base 24515 → 24517; no `partySeat` or `homeSeat` left in any applied copy). **Clean-room lint: no hit** (the preamble's token list over every new text bound for the volumes and the base, run by the same script over all 97 new texts).

## Closure table (every ruling → the items that carry it)

| ruling | subject | carried by |
|---|---|---|
| J399 (R1) | the next campaign on the same world: one live campaign at a time, every earlier campaign kept as the world's history under its name and clock; "Next campaign here" through the port; the gap (campaign time only); the earlier campaign's disturbances as ground and its last cover plate as the baseline until the first fold; the history labels; the canon fresh at the first advance; never two live campaigns; H47 | items 1257 (b), 1258 (a), (b), 1259 (a), (b), (e), (f), 1260 (a), (b), 1262 (a)–(e), 1263 (a)–(c), 1264 (b), (c), 1265, 1268 (a), (b), 1270 (T-V13-120, T-V13-121), 1271 (a), (d) (H47), 1272 (J-V13.191 – J-V13.193), 1273 (a) (BCR-V13-57), 1274, 1275 (a) (V15's note), 1280, 1290 (c), 1292 |
| J399 (R2) | several campaigns carved at one generation: the include toggle admits several, each its region; the carve along cuts through wild land, water or a range, never a seat's sway reach; one member per campaign holding the shared ground as its own, bound to its campaign, with locked edge charters; the atlas holds them; nothing crosses after; at generation only | items 1259 (a), (d), (f), 1261 (a)–(c), 1262 (b), (d), 1263 (b), 1271 (b) (H35's clause), 1272 (J-V13.194), 1273 (a) (BCR-V13-57), (b) (R-V15-5), 1275 (b), 1276, 1277, 1279, 1280, 1284 (T-V15-35; (b)), 1285 (b), (c), 1286 (J-V15.49), 1287 (a)–(c), 1290 (b), 1292 |
| J399 (R3) | the world page and the world map as VTT scenes: the base's profile extended to the world rungs and the atlas; one scene per page or view at the chosen stop and audience; the picture as the background; the DM's grid as presentation, carrying no time; glyphs and sites as notes; no walls, no lights; the audience's picture; the date label and season in the `plat` object; the machinery reused through one shared writer | items 1257 (a), 1262 (d), 1266, 1269 (`WORLD-24`), 1270 (T-V13-123), 1272 (J-V13.195), 1273 (a) (BCR-V13-56), 1274, 1281 (b), 1282, 1283 (`ATLAS-17`), 1284 (T-V15-36), 1285 (a), (c), 1286 (J-V15.50), 1287 (a), (c), 1288 (b), 1289, 1291, 1292, 1293 |
| J399 (R4) | the party's position is the DM's pin: `PartyPlacement` on the world document, a dated list and never a path; the known set reads it; travel times stay labels; no ETA, no day count (as J400 (9) revises it: the row below) | items 1258 (a)–(c), 1259 (b), (c), (g), 1260 (b), (c), 1262 (d), 1263 (a)–(d), 1264 (a), (d), 1267, 1270 (T-V13-122), 1271 (c), 1272 (J-V13.196), 1273 (a) (BCR-V13-57), (b), 1274, 1278, 1284 (T-V15-37), 1285 (a), (c), 1286 (J-V15.51), 1287 (b), 1290 (a), (c), 1292 |
| J400 (9), (10) (the revision) | the party's place under the host's party program, ONE WRITER: on a host-bound world the host's whereabouts (`LensFacts.partySeats`, `partySource`, `partyStamp`; the home seat `partyHome`) replacing `partySeat` and `CampaignFacts.homeSeat`; the observer and the default-preset news delay on `partySeats` alone (a pair the home seat's court, failing closed); the pin at a settlement the DM's present-at act (`requestPartyPresent`), pending (`W_PARTY_PENDING`) until the host's next window carries it, a pin off every settlement a map-only picture; the pin the only writer on a standalone world; z's court-facts fallback (H40) removed; H39 rewritten in place | items 1257 (b), 1258 (a), (b), 1259 (b), (c), (f), (g), (h), 1260 (b), 1262 (d), (e), 1263 (a), (b), (d), 1264 (d), 1266 (a), 1267 (a)–(c), 1270 (T-V13-122, T-V13-123, T-V13-126, T-V13-127), 1271 (c), 1272 (J-V13.196, J-V13.198, J-V13.199), 1273 (a), 1274, 1278 (a)–(c), 1279 (a), 1284 (a), (c), 1285 (d), (e), 1286, 1287 (b), 1290 (c), 1292 (T-V9-98, J-V9.168), 1294, 1295 |
| J400 (7), (12) (the revision's checks) | the next campaign's canon: the spatial birth canon alone, the host's realm canonize before the first advance, an undo revoking `canonized`; H35's clause and no host reader of the map feed | items 1262 (a), 1270 (T-V13-120), 1271 (a), (b), (d), 1272 (J-V13.193) |
| J399 (R5) | weeks, not days: a law of V13 §1; the port's law (11); a lint-style test | items 1257 (a), (b), 1262 (e), 1264 (a), 1266, 1270 (T-V13-124), 1272 (J-V13.197), 1274, 1282, 1291, 1292 |
| J399 (R6) | players are view-only: a law of V13 §1; V14 and V15 cite it; a test | items 1257 (b), 1263 (a), 1266, 1270 (T-V13-125), 1272 (J-V13.197), 1274, 1281 (a), (b), 1282, 1288 (a), 1289, 1291, 1292 |

Items 1257–1295 are thirty-nine items over five targets, in target order: volume 13 (1257–1274, with 1294 after 1262 and 1295 after 1270, added by the J400 revision and placed by section), volume 15 (1275–1287), volume 14 (1288, 1289), volume 9 (1290–1292), the base (1293); items 1296–1300 stay free in the block. A ruling's seam sentences that belong to a section another file owns were none: this file is the pass's one design file.

**How to read an item.** As files u, v, w, x and y's: each item names its target file's section (the heading above it),
its title in bold, the ruling it serves (*Requests*), the current text quoted **once** (every quote verified by exact
search against the target as it stands on 2026-10-24 after files v, w, x and y, and verified again by applying every
item of this file in order to a copy of each target: each quote occurs exactly once at its turn and each new text
exactly once after — the residue check of file m; a quote that wraps across lines is written on one line with each line
break marked ⏎, the continuation's indentation kept; a quote may be a unique part of a line where the whole line is a
long table row), and the new text **in full** as a blockquote whose lines are the new lines (the `> ` prefix removed; a
bare `>` an empty line; a new line that is itself a blockquote in the target is written `> > …`). An item with several
fragments gives each fragment's current and new text in turn, (a), (b) …, applied in that order; where two items touch
one line the later quotes the text as the earlier leaves it and says so. A reference written "file z item n" inside a
new text is to this file; "file y item n", "file x item n", "file w item n", "file v item n", "file u item n" and "file
r item n" to those amendments. *Evidence* names the PROGRESS ruling, the volumes' sections the ruling rests on, the
research notes' sections (`research/experience/01–05`, cited "experience read 0n §x") and, where a host fact is
named, the host citation (paths relative to the host repository's root at commit `81f1cd96`). Order: the owner-rule
item, then volume 13 in section order, volume 15 in section order, volume 14, volume 9, the base.

**The clean-room rule for the new texts.** The base and the volumes are implementer inputs: the new texts entering
them name no host source file, function, product, ruling id, preset name, flag name or internal identifier and no other
product's identifiers — the host is "the host"; its facts are named by the port's field names (`PolityFacts`,
`LensFacts`, `CampaignFacts`, `SettlementFacts`, `TravelLaw`); its surfaces in plain words (the host's news paper, its
session-prep letter, its hearing card, its cause walk, its belief record, its default rules, its own edit law, its
ambiguity law for movers, its campaign maker); its account kinds and entitlements in plain words (an anonymous visitor,
a free account, a premium account; the campaign entitlement, the gallery entitlement). The two tabletop formats the base
already names by their published names in §11.1 (the Universal VTT file and the Foundry-class scene) keep the base's
own words. The host's document names, ruling ids, product names and code citations stay in each item's *Evidence*
line. The owner's own words, quoted verbatim in item 1256 and wherever a new text cites them, keep the words the owner
wrote. Checked by a lint over every new text bound for the volumes and the base (the preamble's token list, run by the
dry-run script: the result stated in the head when complete).

---

## The owner's rule (2026-10-24; quoted verbatim, typos kept; the six rulings are the session's, each vetoable)

**1256. OWNER RULE — The five clarifications (owner, 2026-10-24, via the session; `docs/PROGRESS.md` J399).** "Campaign
is just a term we use for the region of the map. So it means multiple or sequentially. It should already account for
all of this." · "Next, the world operates in weeks not days, so anything regarding a specific time not in the realm of
weeks is under the preview of the DM." · "World map should also be VTT." · "Players are view only." · "The party in the
road is different because players can teleport fly etc outside if the road or circumvent it" — in answer to the
session's "Am I missing anything?" list (a sequel campaign in one world; the party on the road; tonight's weather and
the hour; a travel grid; players' own marks).

  **The session's reading and findings** (J399, READ AS AND FOUND): (1) a campaign is a region of the map; a world
  holds several, at once or one after another, and the architecture must account for both — it accounted for several
  only as separate members of an atlas (one world document per campaign: V13 §3.11.6, V15's head note) and for none
  after another on the same world; ruled and integrated here (R1, R2). (2) The world's clock is the week and anything
  finer is the DM's — already so (the crop's lights carry no hour; times are the host's weeks; the climate's months and
  the sail efforts by month are presentation) and now recorded as a law (R5); the session's "tonight's weather and the
  hour" withdrawn. (3) The world map and the world page export as VTT scenes — new (R3); the session's "travel grid"
  becomes the scene's presentation grid, carrying no time. (4) Players are view-only — already so (the viewer role; the
  party key written by the DM); recorded as a law (R6); the session's "players' own marks" withdrawn. (5) The party is
  not on a road: it teleports, flies and leaves the road, so the map never computes a journey — the party's position is
  the DM's pin (R4); the session's "journey tool" withdrawn.

  **The rulings, by number, and where this file lands each:**

  **(R1) THE NEXT CAMPAIGN ON THE SAME WORLD.** A world document binds one live campaign at a time and keeps every
  earlier campaign's record — its lens and cover plates, sway revisions, dated events, disturbances and canon versions
  — as the world's history under that campaign's name and clock; "Next campaign here" (host mode) binds a new campaign
  to the same world — the host's instant world or a campaign assembled from saved settlements, its settlements placed
  by the include run as additions or re-bound to the seats they stood at — its birth window starting its own clock
  after a gap the DM declares at binding (years between, default none), the gap running the cover's campaign-time
  recovery and succession and nothing geological; an earlier campaign's this-happened disturbances stand as ground
  (they shaped it) and its last cover plate is the new campaign's baseline until its first fold; the history surfaces
  (the scrub, the campaign history view, the events layer) show the earlier campaigns' plates read-only, labelled
  "before this campaign: {name}, its year n", their sways drawn only in history; the new campaign's canon is taken
  fresh at its first advance (H22, the grace rule) over the seats as they then stand; a world is never bound to two
  live campaigns. — V13 §2.2 (`CampaignRecord`, the world clock), §3.11.6 (`bindCampaign`, `closeCampaign`, the one
  translation of a host week, law (11)), §4.1, §5.1, §5.2, §5.8 (8), (9), §7, §8.5 (H47; H22's clause), §9, §11; V09
  §4.22 (11).

  **(R2) SEVERAL CAMPAIGNS ON ONE GROUND, AT ONCE.** Concurrent campaigns stay separate world documents (F14's clocks),
  but one generation may grow one world for several campaigns' settlements — "include my settlements" admits more than
  one campaign's set, each its region — and the result is CARVED at generation into one member per campaign along the
  regions' boundaries: each member a world document holding the shared ground as its own, bound to its campaign, with
  locked edge charters to its neighbours (a continuation born whole, V15 §3.4), the atlas holding them in their
  arrangement; after the carve nothing crosses (F14); the carve is at generation only and a world already bound is
  never carved (R1 covers the sequel). — V13 §2.2 (`WorldRecipe.carve`), §3.1 (5), (8), §7, §9, §10.3; V15 §1.4, §2.2
  (`CarveRecord`), §3.4, §4.1, §4.7, §7, §8, §9, §10; V09 §4.22 (5).

  **(R3) THE WORLD MAP AND THE WORLD PAGE AS VTT.** The base's VTT profile (§11.1: Foundry-class scene JSON and
  Universal VTT) extends to every world rung and to the atlas — an export writes one scene per world page or atlas view
  at the chosen zoom stop and audience: the picture as the scene's background image; the grid the DM's choice (square or
  hex at a size in km per cell, or none) as presentation only — a cell carries no travel time (R5) and the VTT's grid is
  the VTT's; settlement glyphs and sites as the scene's notes with their names and, for the DM audience, their reason
  sentences; no walls, no lights; the audience's picture (the party audience's for the players' scene: DM-only marks
  absent, never greyed); the date label and season in the plat object; the atlas exports its composed view the same way
  (notes per member; gaps as nothing); V14's export machinery reused (one image and one JSON per scene; the plat
  object); no player-writable layer of ours in any scene (R6). — V13 §1.3 (item 136's bullet), §5.4, §6 (`WORLD-24`),
  §7, §9, §10 (BCR-V13-56); V15 §5.4, §5.5, §6 (`ATLAS-17`), §7, §9, §10 (BCR-V15-19); V14 §5.3 (the shared writer
  `sceneSet`), §7, §9, §10 (BCR-V14-27); V09 §5.10; the base §11.1.

  **(R4) THE PARTY'S POSITION IS THE DM'S PIN.** The party may teleport, fly or leave the road, so the map never
  computes the party's journey; the DM places the party pin anywhere (a `WorldWhere`) and moves it at will; the pin,
  with the host's `partySeat` when the party is at a seat, feeds the known set's growth (the cells the party has been
  at — the pin's placements, never a path between them: the ambiguity law), the default-preset news delay (from the
  event's seat to the seat nearest the pin, by the canon's hop weeks) and the party observer (the pin at a seat → that
  court; off a seat → the home seat); travel times stay the routes' labels — information, never a journey the map
  runs; no day counts. — V13 §2.2 (`PartyPlacement`; `RenderedWorld.known`), §4.1 (`setPartyPin`), §4.2 (T9), §5.1
  (the `partyPin` layer), §5.8 (7), §7, §8.5 (H39's clause), §9; V15 §3.6 (4), §3.7, §4.1; V09 §4.3, §4.22 (11).
  *As revised under J400 (9), (10)* (the host's answer of 2026-10-24): on a host-bound world the party's place is the
  host's whereabouts of the party (`LensFacts.partySeats`, with its source and stamp; the home seat `partyHome`, a field
  of the host's party record), the one writer; the pin dropped at a settlement is the DM's own present-at act sent to the
  host (`requestPartyPresent`) and drawn pending until the host's next row carries it, a pin off every settlement is the
  map's own picture feeding only its known set; the observer and the news delay read `partySeats` alone; on a
  standalone world the pin is the only writer — items 1259, 1267, 1271 (c) (H39 rewritten), 1294, 1295.

  **(R5) WEEKS, NOT DAYS.** A law of V13 §1 — the world's clock is the host's week; the map states no time finer than
  a week as a fact of the record (a lens, a lane, an arrival); the hour, tonight's weather and a day's march are the
  DM's narration; what the map holds finer (the climate's months, the sail efforts by month, the lights' "no hour", a
  scene grid) is presentation or the DM's choice, never a fact. — V13 §1.3 (the law), §3.11.6 (law (11)), §7
  (T-V13-124), §9.

  **(R6) PLAYERS ARE VIEW-ONLY.** A law — a player audience never writes a world, a site, an atlas or an export (the
  viewer role; the party key and the party pin written by the DM; no player annotation layer exists or will). — V13
  §1.3 (the law), §4.1, §7 (T-V13-125), §9; V14 §2.3; V15 §5.1.

  The model ruling is J392's (Fable designs, reviews and closes; Opus applies). The seats: amendments/campaigns-z
  (this file), a review seat (Fable, high), an apply seat (Opus, medium), the manager's close.

---

## The change items

### Volume 13 — §1.3 The owner rules obeyed (item 136's bullet; the owner's five clarifications of 2026-10-24 as a new bullet with the two laws)

**1257.** **Item 136's bullet reads the owner's later word on the world map as a VTT scene; a new bullet quotes the five clarifications and states the two laws — weeks not days, players view-only — and where the other four land.**
*Requests:* J399 (R3), (R5), (R6); the owner-rule item 1256; J400 (9) (the R4 sentence of (b), revised).
*Current text* (a):
> seasonal and dated surfaces are keyed by week and date (V13 §2.2), never by an hour. VTT's crop scope and stable grid⏎  origin are V14's; this volume adds the world map to no VTT scene (V13 §5.4).
*New text* (a):
> seasonal and dated surfaces are keyed by week and date (V13 §2.2), never by an hour. VTT's crop scope and stable grid
>   origin are V14's; the world page and the world map export as VTT scenes by the owner's later word (2026-10-24, J399
>   (R3): "World map should also be VTT"; V13 §5.4; V15 §5.5; BCR-V13-56) — the picture as the scene's background, the DM's
>   grid as presentation that carries no time, no hour in any of it (the law below, R5).
*Current text* (b):
> only on the user's approval and only through the host's own command, shown done on its confirmation (F8; §3.11.5,⏎  §3.11.6, §4.1).
*New text* (b):
> only on the user's approval and only through the host's own command, shown done on its confirmation (F8; §3.11.5,
>   §3.11.6, §4.1).
> * **The owner's five clarifications (2026-10-24; file z item 1256; J399, each ruling the session's and vetoable).**
>   "Campaign is just a term we use for the region of the map. So it means multiple or sequentially. It should already
>   account for all of this." · "Next, the world operates in weeks not days, so anything regarding a specific time not
>   in the realm of weeks is under the preview of the DM." · "World map should also be VTT." · "Players are view only." ·
>   "The party in the road is different because players can teleport fly etc outside if the road or circumvent it".
>   Two are LAWS of this volume. **(R5) Weeks, not days.** The world's clock is the host's week: no record of this
>   volume states a time finer than a week as a fact — a lens row, a lane, an arrival, an onset, a hop, a plate, an
>   event, a placement's week, a canon's leg and the gap between two campaigns are weeks (`Week`; `TravelLaw.daysPerWeek`
>   is a divisor of a week, never a clock of its own) — and the hour, tonight's weather and a day's march are the DM's
>   narration, never a fact the map holds, draws as one or sends; what the map holds finer is presentation or the DM's
>   choice and never a fact: the climate's months (W3's march, §3.4), the sail efforts by month (§3.8 (12)), the
>   lights' "no hour" (V14 §5.3), a scene's grid (§5.4: a cell carries no travel time), the view's sun hour (§8.4's
>   path sun); `derivedTime` labelled "on foot" stays a label (§5.1), and the port's law (11) (§3.11.6) and the lint
>   T-V13-124 hold the seam to it. **(R6) Players are view-only.** A player audience writes nothing: no record of a
>   world, a site or an atlas, no layer, note or object of any export, no view key a picture reads as a fact — the
>   viewer role (§11.2's `role`; the refusal `refuse.viewer`) is a player's role on every document kind; the party key
>   (V14 §2.3) and the party pin (§2.2's `PartyPlacement`) are written by the DM (the owner and editor roles); no player
>   annotation layer exists or will (T-V13-125; V14 §2.3; V15 §5.1, §5.4). The other four land as mechanisms: **(R1)**
>   the next campaign on the same world — §2.2's `CampaignRecord` and the world clock, §3.11.6's `bindCampaign` and
>   `closeCampaign`, §5.1, §5.2, §5.8 (8), (9), H47; **(R2)** several campaigns carved at one generation — §3.1 (5), (8),
>   V15 §3.4; **(R3)** the world page and the world map as VTT scenes — §5.4, V15 §5.5, V14 §5.3's shared writer,
>   BCR-V13-56; **(R4)** the party's position is the DM's pin — §2.2's `PartyPlacement`, §4.1's `setPartyPin`, §5.1's
>   `partyPin` layer, §5.8 (7) —, under ONE WRITER on a host-bound world (J400 (9)): the party's place there is the
>   host's whereabouts of the party (`LensFacts.partySeats`, §2.2, §3.11.6), the DM's pin dropped at a settlement is sent
>   to the host as the DM's own present-at act (`requestPartyPresent`) and a pin off every settlement is the map's own
>   picture. Each is recorded as a ruling in §11.
*Evidence:* docs/PROGRESS.md J399 (the owner's words verbatim; READ AS AND FOUND (2)–(4); R3, R5, R6); V13 §1.3's item 136 bullet as it stands ("this volume adds the world map to no VTT scene"); V13 §2.2 (`TravelLaw.daysPerWeek`: "a day is a week ÷ 7, never a clock of its own"; `Week`), §3.4 (the monthly march), §3.8 (12) (the sail efforts by month), §5.1 (the `routes` row's `derivedTime` label), §5.4; V14 §5.3 (the lights carry no hour; BCR-V14-23); the base §11.2 (`audience.role`: owner, editor, viewer) and §7.1's `refuse.viewer`; V14 §2.3 (the party key written by the owner and editor roles only); V15 §5.1 (the page read-only for a viewer role); experience read 05 §1.1, §1.6, §4 Q9 (the players' pictures and marks); experience read 01 §4 Q6 (the two clocks).


### Volume 13 — §1b.1 Records, fields and tables and §1b.3 Edit kinds (the `CampaignRecord`, `PartyPlacement`, `setPartyPin`, `bindCampaign` and `closeCampaign` rows)

**1258.** **The wiring table gains the campaign record, the party pin, their edit kinds and the pin's view key.**
*Requests:* J399 (R1), (R4); J400 (9) (the party-pin rows, revised); items 1259, 1263, 1294.
*Current text* (a):
> the share code (the payload hash, re-fetched) | the world's `fields` chunks referenced by content hash from the op (V13 §2.7) |
*New text* (a):
> the share code (the payload hash, re-fetched) | the world's `fields` chunks referenced by content hash from the op (V13 §2.7) |
> | `CampaignRecord` (the world's host binding, J399 (R1): one record per campaign ever bound to this world — its key, its name, its weeks on the world clock (`fromWeek`, `toWeek`), the gap declared before it, the seats it bound, the canon versions adopted under it; exactly one open record while a host is bound) | `bindCampaign` and `closeCampaign` (the port, author `host`; V13 §4.1); the host's new-world request writes the first | the port's fold (every host week translated once, V13 §3.11.6's law (11)); the history labels of the scrub, the campaign history view and the events layer (V13 §5.1, §5.2, §5.8 (8)); the cover fold at a binding (V13 §5.8 (9)); the include run's re-binding (V13 §3.11.6's `campaignFacts`) | the world's entities block (V13 §2.2) |
> | `PartyPlacement` (the party pin, J399 (R4): the DM's dated placements of the party, a list and never a path; on a host-bound world under one writer, J400 (9): a placement at a host-bound settlement or pair the DM's present-at request to the host, any other the map's own picture) | `setPartyPin` (V13 §4.1; T9 `shape`, V13 §4.2) | the party's known set (`RenderedWorld.known`: the map-only placements; on a standalone world every placement); the present-at request (`requestPartyPresent`, V13 §3.11.6) and its pending mark (`W_PARTY_PENDING`); the `partyPin` layer (V13 §5.1); the VTT scene's party note (V13 §5.4); V15 §3.6 (4) and §3.7 through `renderAt` — never the party observer or the news delay, which read the host's `LensFacts.partySeats` alone (V13 §5.8 (7)) | the world's entities block (V13 §2.2) |
*Current text* (b):
> | `fit` (`placeFrame`'s rung-general form: a world document as the frame; V15's call, V13 §3.11) | V15's atlas page | V13 §2.6's placement row | the former placement |
*New text* (b):
> | `fit` (`placeFrame`'s rung-general form: a world document as the frame; V15's call, V13 §3.11) | V15's atlas page | V13 §2.6's placement row | the former placement |
> | `setPartyPin` (the DM's party pin placed, back-dated no later than the document's week, or a placement removed; J399 (R4); on a host-bound world whose host sends the party's whereabouts a placement at a host-bound settlement or pair also sends the DM's present-at request, `requestPartyPresent`, J400 (9)) | T9 `shape`'s **The party is here** (V09 §4.22 (11)) | V13 §2.6's party-pin row | the placement removed, or restored; a pending request's mark cleared with it (`W_PARTY_PENDING`) — what the host already carried out is the host's, changed only by a new present-at act |
> | `bindCampaign` (the host binds a campaign to this world: the first by its new-world request, the next by "Next campaign here" with the DM's declared gap; J399 (R1); H47) and `closeCampaign` (the host closes the live campaign at its last window) | the port (author `host`) | V13 §2.6's campaign-record row | a host input is never a user's undo target (V13 §4.4); the world's undo never reaches below the live campaign's `fromWeek` |
*Current text* (c):
> `worldZoom`, `worldLayer`, `showTraces`, `surfaceDate`, `worldLens` (the lenses open and the picker's collapsed rows)⏎and `lensWeek` (the week the lenses draw; default the document's week) are view keys (§2.9)
*New text* (c):
> `worldZoom`, `worldLayer`, `showTraces`, `surfaceDate`, `worldLens` (the lenses open and the picker's collapsed rows),
> `lensWeek` (the week the lenses draw; default the document's week) and `showPinHistory` (the DM-only switch that draws
> the party pin's earlier placements as dated dots, V13 §5.1; default false; J399 (R4)) are view keys (§2.9)
*Evidence:* docs/PROGRESS.md J399 (R1), (R4); J400 (9) (the party's place is the host's; one writer; the pin at a settlement the DM's present-at act); research/sf/host-reply-2026-10-24.md S5 ("The engine never writes `presentAt`; only the DM does"; "sent on H17 presentation rows … never as a second `campaign.party` record"); research/sf/host-rulings-mirror.md §1 (one unit, one writer: "a fact with a host writer has no map writer on a host-bound world") and §2 (the party's place); V13 §1b.1 and §1b.3 as they stand (the `fit` row the last of §1b.3; the formation payload row the last of §1b.1; the dossier request's row, whose undo the pin's mirrors); V13 §2.2, §4.1 as items 1259 and 1263 leave them; V13 §3.11.6 as item 1294 leaves it; V13 §4.4 (a host input is never a user's undo target).


### Volume 13 — §2.2 New records (`WorldRecipe.include` and `.carve`; `PartyPlacement` and `CampaignRecord` beside `WorldWhere`; `LensFacts.partySeats`, `.partySource`, `.partyStamp`, `.partyHome` in place of `LensFacts.partySeat`; `SettlementFacts.stoodAs`; `CampaignFacts` without `homeSeat`; `RenderedWorld.known`; `WorldCharter.rung`; `LensRule.partyNewsDelay`)

**1259.** **The world document records its campaigns and the party pin; the party's place is the host's whereabouts on `LensFacts`; the recipe records a carve; the port's facts carry what a sequel and a carve need.**
*Requests:* J399 (R1), (R2), (R4); J400 (9), (10) (fragments (b), (c), (f), (g), (h), revised and added); items 1261, 1262, 1263, 1267, 1268, 1294.
*Current text* (a):
>   include?: { campaign: string; settlements: string[] /* host keys */; version: number /* the `CampaignFacts` window the facts were read at */ } /* "based off of my settlements" (V13 §3.1 (5)): the campaign whose settlements' facts entered as rank-1 requirements; absent on a standalone world */;
*New text* (a):
>   include?: { campaign: string; settlements: string[] /* host keys */; version: number /* the `CampaignFacts` window the facts were read at */ } /* "based off of my settlements" (V13 §3.1 (5)): the campaign whose settlements' facts entered as rank-1 requirements; absent on a standalone world; on a carved member (below) its own campaign alone; on a sequel world (J399 (R1)) the live campaign's include run, the earlier campaigns' kept in their `CampaignRecord`s */;
>   carve?: { seed: Seed; recipeHash: Hash128 /* the grown world's recipe (its ops, choices, requirements and the `carve` rows) hashed: the whole re-grows byte-identically from the seed and the hashed recipe (V13 §3.17), never from this member */; campaigns: string[] /* every campaign the one run grew for, in the request's order */; region: { x0: WorldCm; y0: WorldCm } /* this member's south-west corner in the grown world's frame (its extent this recipe's) */; cuts: { side: 'N'|'E'|'S'|'W'; neighbour: string /* the campaign across the cut */ }[] } /* THE CARVE (J399 (R2); V13 §3.1 (5), (8)): this world is one member of a world grown for several campaigns and cut at generation — its ground the grown world's over its region, copied through `parentCharter` at the grown world's own rung and cell, its cut sides locked edge charters (`edgeCharters`) byte-equal to its neighbour's; provenance, never re-read; absent on every other world */;
*Current text* (b):
> interface WorldWhere { kind: 'settlement'|'wall'|'road'|'border'|'supplyLine'|'region'|'point'|'offStage'; seat?: string; edge?: string; mode?: 'land'|'water'; fraction?: { num: number; den: number }; pair?: [string, string]; at?: WorldPointCm }   // resolved at fold, kept as a dated fact
*New text* (b):
> interface WorldWhere { kind: 'settlement'|'wall'|'road'|'border'|'supplyLine'|'region'|'point'|'offStage'; seat?: string; edge?: string; mode?: 'land'|'water'; fraction?: { num: number; den: number }; pair?: [string, string]; at?: WorldPointCm }   // resolved at fold, kept as a dated fact
> interface PartyPlacement { id: Id; where: WorldWhere /* where the party IS, by the DM's hand: a `settlement` (its seat key), a `point` (`at`), a `road` with its `fraction`, a `region` — anywhere; never `offStage`; AT A PAIR where `pair` names two seats (the pin card's **Between this and…**: an act between two settlements) */; week: Week /* the world week of the placing: the document's week, or a week the DM back-dates to, never later (`refuse.world.pinDate`) */; audience: 'public'|'dmOnly' /* `public` by default — the players see where they are; `dmOnly` where the DM withholds it */; note?: string /* the DM's words ("teleported from the Rift") */; present?: { seats: string[] /* the host keys sent: one, or two for an act at a pair */; afterSeq: number /* the last lens window's `seq` folded when it was sent */ } /* set exactly when the placement is AT a host-bound settlement or pair on a world whose host sends the party's whereabouts (J400 (9)): the DM's present-at act sent to the host (`requestPartyPresent`, V13 §3.11.6); its state DERIVED at read from the lens plates and never written by them (the presentation inputs write nothing): PENDING (`W_PARTY_PENDING`) while no window later than `afterSeq` has folded, CARRIED where the first such window's `LensFacts.partySeats` name the same seats, SUPERSEDED where it names other seats or none — the host is the writer, and the party is drawn at the host's place */; reason: Id }   // THE PARTY PIN (J399 (R4); ONE WRITER, J400 (9)): the party's position is the DM's pin — the party may teleport, fly or leave the road, so the map never computes its journey: the placements are a dated LIST and never a path (no line, arrow or ETA between two placements, no day count), written by `setPartyPin` (V13 §4.1). On a STANDALONE world the pin is the party's only writer, its latest placement the party's current place, with no observer and no news delay (there is no host). On a HOST-BOUND world the party's place is the HOST'S — its whereabouts of the party on its presentation rows (`LensFacts.partySeats`, with `partySource` and `partyStamp`) — and a placement is one of two kinds: AT a host-bound settlement or pair, the DM's own present-at act, sent to the host and drawn pending until the host's next window carries it (`present`); OFF every host-bound settlement, a map-only picture of the DM's narration, which feeds the map's own known set and nothing the host reads. The party's CURRENT place on a host-bound world is the host's whereabouts, unless the DM's latest placement is later than the host's `partyStamp`: a map-only placement then drawn as the DM's picture, a pending one as pending; where the host does not send the whereabouts (V13 §8.5's H39 unlit) nothing is sent and every placement is a map-only picture. Read by the party's known set (`RenderedWorld.known`), the `partyPin` layer (V13 §5.1), the VTT scene's party note (V13 §5.4) and V15's reach through `renderAt`; NEVER by the party observer or the default-preset news delay, which read the host's `partySeats` alone (V13 §5.8 (7)); in the entities block (the records digest), never a model input, never in the canon or the map feed, never a view key — the party key's `places` (V14 §2.3) say what the party knows, the pin where the DM puts it
> interface CampaignRecord { campaign: string /* the host's campaign key */; name: string /* the host's campaign name as sent: the history labels' word */; fromWeek: Week /* the campaign's week 0 on the WORLD CLOCK: 0 for the first campaign; for a sequel its predecessor's `toWeek` + `gapWeeks` */; gapWeeks: number /* the gap the DM declared at the binding, `gapYears` × 52 (the travel law's four quarters of 13 weeks), default 0: campaign time the cover's recovery and succession run over and nothing geological — the formation op and the living physics never read it */; toWeek?: Week; closed?: { seq: number } /* set when the campaign closes (`closeCampaign`, or its successor's `bindCampaign`): `toWeek` its last window's end on the world clock; a closed campaign's weeks are read-only (`refuse.world.campaignClosed`) */; seats: { hostKey: string; placement: Id }[] /* the seats it bound, kept at its close so a later campaign's settlement may re-bind to the seat it stood at (`SettlementFacts.stoodAs`; V13 §3.11.6) */; canons: number[] /* the canon versions the host adopted under it (`canonized`), kept read-only */; reason: Id }   // THE WORLD'S HOST BINDING (J399 (R1)): one record per campaign ever bound to this world, exactly one OPEN (no `closed`) while a host is bound — a world is never bound to two live campaigns (`refuse.world.campaignLive`) —, every earlier campaign kept as the world's history under its name and clock: its lens and cover plates, sway revisions, dated events, disturbances and canon versions stand where they are, dated on the one WORLD CLOCK every record of a world is dated on (`Week` everywhere in this volume is a world week; the host's week w of the live campaign is world week `fromWeek + w`, translated once at the port's fold and once at its offers, V13 §3.11.6's law (11); a single-campaign world has `fromWeek` 0 and nothing changes); in the entities block (the records digest), outside the model digest and the canon; the history labels read "before this campaign: {name}, its year n" for a week of an earlier campaign (n = ⌊(week − its `fromWeek`) ÷ 52⌋ + 1) and "between {A} and {B}: n years after {A}" for a week of a gap (V13 §5.1, §5.8 (8))
*Current text* (c):
>   partySeat?: string /* the seat the party stands at in this window, sent each advance where the host tracks it (H39): read by the party observer rule and by the default-preset arm (V13 §5.8 (7)) */; observer?: string /* on the party's set: the court whose believed record the set is — the party seat's court, else the home seat's (`CampaignFacts.homeSeat`), as the host resolved it (H39; J397 (M8)); absent on a set the host resolved to none */;
*New text* (c):
>   partySeats?: string[] /* THE HOST'S WHEREABOUTS OF THE PARTY in this window (J400 (9); H39): one seat, or two for an act at a pair — the place the host's party record holds (the DM's present-at in the host, else the last heard), sent on every set of the window, the DM's and the party's alike; on a host-bound world the one writer of the party's place: read by the party observer rule, the default-preset arm, the party's known set (V13 §5.8 (7)) and the `partyPin` layer (V13 §5.1); absent where the host does not track the party — then no observer seat, no news delay, and the DM's pin a map-only picture (`PartyPlacement`) */; partySource?: 'presentAt'|'lastHeard' /* how the host holds the whereabouts: the DM's present-at, or the last heard — the legend's "the party is at {seat}" or "last heard at {seat}, week n" */; partyStamp?: Week /* the week the host's whereabouts were set, on the world clock (V13 §3.11.6's law (11)) */; partyHome?: string /* the party's home seat: a field of the host's party record the DM sets, asked of the host at its party unit (H39) — the observer's fallback (V13 §5.8 (7)) */; observer?: string /* on the party's set: the court whose believed record the set is — the court of the one seat `partySeats` names, else (a pair, or none) the home seat's (`partyHome`), as the host resolved it (H39; J397 (M8); a pair's own observer the host's party unit's to rule: until it does a pair reads the home seat's court, failing closed); absent on a set the host resolved to none */;
*Current text* (d):
> rung: WorldSizeRung /* the child's, finer than the parent's */;
*New text* (d):
> rung: WorldSizeRung /* the child's, finer than the parent's — or the parent's own for a carved member, whose ground is copied one to one (J399 (R2); V13 §3.1 (8)) */;
*Current text* (e):
> ow reads `random` */ }   // the included settlements' facts (`CampaignFacts`, V13 §3.11.6; H31), each fact a rank-1 requirement of kind `terrain`, `coast`, `river`, `lake`, `climateRow`, `latitude`, `resource` or `route`
*New text* (e):
> ow reads `random` */; stoodAs?: string /* the host key the same saved settlement bore in an EARLIER campaign on this world, where the host knows it (H47): the include run re-binds it to the seat that campaign's `CampaignRecord.seats` names (`bindSeat` on that placement) instead of placing it anew (J399 (R1); V13 §3.11.6); absent, a new settlement, placed as an addition */ }   // the included settlements' facts (`CampaignFacts`, V13 §3.11.6; H31), each fact a rank-1 requirement of kind `terrain`, `coast`, `river`, `lake`, `climateRow`, `latitude`, `resource` or `route`
*Current text* (f):
> interface CampaignFacts { campaign: string; version: number; settlements: SettlementFacts[]; relations: { a: string; b: string; word: string /* the host's relation word through the adapter folder's relation table: partner, rival, overlord, vassal, ally, hostile, isolated */ }[]; homeSeat?: string /* the party's home seat, a campaign fact the DM names in the host: the party observer's fallback where no party seat is sent in the lens window (V13 §5.8 (7); H39; J397 (M8)) */ }   // the port's recorded input for "based off of my settlements" (V13 §3.11.6): a windowed replace keyed by host keys; its settlements' `population`s are what the cover fold reads at the campaign's creation — the birth fold (V13 §5.8 (9); J397 (M1)), the birth window's `sizes` winning where the host sends both
*New text* (f):
> interface CampaignFacts { campaign: string; version: number; settlements: SettlementFacts[]; relations: { a: string; b: string; word: string /* the host's relation word through the adapter folder's relation table: partner, rival, overlord, vassal, ally, hostile, isolated */ }[] }   // the port's recorded input for "based off of my settlements" (V13 §3.11.6): a windowed replace keyed by host keys, sent and KEPT per campaign (J399 (R1), (R2): the live campaign's set is the include run's and the best form's; a closed campaign's last set stays with its `CampaignRecord`, read-only; a run with several campaigns included reads one set per campaign, each its region, V13 §3.1 (5)); its settlements' `population`s are what the cover fold reads at the campaign's creation — the birth fold (V13 §5.8 (9); J397 (M1)), the birth window's `sizes` winning where the host sends both; the party's home seat is no campaign fact — it is a field of the host's party record, sent as `LensFacts.partyHome` (J400 (9); H39)
*Current text* (g):
> cells: Uint32Array /* coarse: the cells the audience's places have reached (V14's layers through the world's `knownTo`); for a court audience
*New text* (g):
> cells: Uint32Array /* coarse: the cells the audience's places have reached (V14's layers through the world's `knownTo`) and, for a party audience, the seats of the host's whereabouts of the party (`LensFacts.partySeats`) from each window's `partyStamp` and the cells of the DM's map-only party placements from their weeks (on a standalone world every placement's; a present-at placement counts once the host's row carries it, as the host's seats) — never a cell between two places (J399 (R4); J400 (9); V13 §5.8 (7)); for a court audience
*Current text* (h):
> where the host records no belief and sends the party's seat, a public row of a seat at week w reaches the party's picture at w + floor(hopWeeks × factor), the hop weeks the canon's from the row's seat to the party's seat under the travel law in force;
*New text* (h):
> where the host records no belief and sends the party's whereabouts (`LensFacts.partySeats`), a public row of a seat at week w reaches the party's picture at w + floor(hopWeeks × factor), the hop weeks the canon's from the row's seat to the NEAREST seat of `partySeats` (one seat, or the nearer of a pair) under the travel law in force; not applied where the host sends no whereabouts, and never measured from the DM's party pin (J400 (9));
*Evidence:* docs/PROGRESS.md J399 (R1), (R2), (R4); J400 (9) ("`partySeats?: string[]` (one seat, or two for an act at a pair) with `partySource?: 'presentAt'|'lastHeard'` and `partyStamp?: Week`; the home seat a DM-set field of the host's party record (`partyHome?`) … replacing `CampaignFacts.homeSeat`"; "a pin off any settlement is a map-only picture feeding only the map's known set, and the observer and the news delay read the host's `partySeats`; on a standalone world the pin is the only writer"), (10) (the court viewpoint held); research/sf/host-reply-2026-10-24.md S5 ("please type it as PT reads it: `partySeats?: string[]`, with its source and stamp"; "A home seat is an ask to PT at its unit: a DM-set field on PT's party record"; "Which court observes for a pair is an ask to PT at its unit") and "What the host asks back" (3); research/sf/host-rulings-mirror.md §2 (the party's place: `whereaboutsOf(party)`, PT3; the court viewpoint); V13 §2.2 as it stands (`WorldRecipe.include`, `WorldWhere` (its `pair`), `LensFacts.partySeat` (file v item 1087), `LensRule.partyNewsDelay` (file v item 1089), `WorldCharter.rung` (file r item 1007), `SettlementFacts`, `CampaignFacts` (file v item 1088), `RenderedWorld.known` (file y item 1241)); V13 T-V13-7 (the presentation inputs write nothing — why the present-at state is derived at read); V13 §2.2's `TravelLaw.season.quarterWeeks` (13: a year of 52 weeks); V13 §2.7 (the entities block, the records digest, the plate caches outside every digest); V13 §3.11.4 (the world subject: a derived child's `parentCharter`); V13 §3.11.6 (`bindSeat` writes `Placement.hostKey` once — the re-binding of item 1262); V14 §2.3 (the party key's `places`: what the party knows); experience read 05 §2.3 (the party at a seam; the known set), §4 Q11; experience read 01 §4 Q2.


### Volume 13 — §2.4 Derived transients (`CampaignTimeline`'s campaign) and §2.6 The lifecycle of every state field (the `CampaignRecord` and `PartyPlacement` rows)

**1260.** **The campaign history view names each entry's campaign; the lifecycle table gains the two records and the pin's view key.**
*Requests:* J399 (R1), (R4); J400 (9) (the `PartyPlacement` row of (b), revised); item 1259.
*Current text* (a):
> interface CampaignTimeline { world: Uuid; entries: { week: Week; doc: Uuid /* the world, or a placed frame */; kind: 'ed
*New text* (a):
> interface CampaignTimeline { world: Uuid; entries: { week: Week; campaign?: string /* the `CampaignRecord` whose weeks hold the entry; an entry of a closed campaign is read-only — it opens its document at that week with the scrub set there and no edit offered, under the label "before this campaign: {name}, its year n" (J399 (R1); V13 §5.2) */; doc: Uuid /* the world, or a placed frame */; kind: 'ed
*Current text* (b):
> | `SailingLeg` (per route, vessel, month, direction) | W7's sail routing on demand per lane (V13 §3.8 (12)) | `WorldRoute.sailing`, the `routes` layer's month slider, `routeFacts`' offer, `worldFactsAt.sailing` | `derived`, keyed by (lane, geometry version, climate version); never a digest | re-deri
*New text* (b):
> | `CampaignRecord` (J399 (R1)) | the host's new-world request (the first record, `fromWeek` 0); `bindCampaign` (the next, `fromWeek` its predecessor's `toWeek` + its `gapWeeks`); `closeCampaign` or the successor's binding (`toWeek`, `closed`) | the port's fold (law (11)'s translation), the history labels, the cover fold at a binding, the include run's re-binding, the campaign history view | the entities block (the records digest; outside the model digest and the canon) | an input: kept through every re-derivation; never re-derived | a host input is never a user's undo target; the world's undo never reaches below the live campaign's `fromWeek` | absent on an older host-bound world: one open record made at load from the port's inputs' `campaign` and the world's name, `fromWeek` 0, reported |
> | `PartyPlacement` (J399 (R4); J400 (9)) | `setPartyPin` (the DM; the owner and editor roles) — its `present` written once with the placement; its pending, carried or superseded state derived at read from the lens plates, never written by a window | `RenderedWorld.known` (the party's known set: the map-only placements; every placement on a standalone world), the present-at request and `W_PARTY_PENDING`, the `partyPin` layer, the VTT scene's party note, the pin's card — never the party observer or the news delay (V13 §5.8 (7)) | the entities block (the records digest) | kept through every re-derivation (a dated fact, never derived) | the placement removed, or restored; a pending mark cleared with it — what the host carried out is the host's | absent: no pin |
> | `SailingLeg` (per route, vessel, month, direction) | W7's sail routing on demand per lane (V13 §3.8 (12)) | `WorldRoute.sailing`, the `routes` layer's month slider, `routeFacts`' offer, `worldFactsAt.sailing` | `derived`, keyed by (lane, geometry version, climate version); never a digest | re-deri
*Current text* (c):
> | the view keys `worldZoom`, `worldLayer`, `showTraces`, `surfaceDate`, `worldLens`, `lensWeek` | V09's controls | the world view; the lenses; the land-cover layer | the viewer's view state, never a digest | view only | not an event | absent: stop 1, `relief`, `false`, the document's week, no lens open, the document's week |
*New text* (c):
> | the view keys `worldZoom`, `worldLayer`, `showTraces`, `surfaceDate`, `worldLens`, `lensWeek`, `showPinHistory` (J399 (R4): the party pin's earlier placements drawn as dated dots; DM-only) | V09's controls | the world view; the lenses; the land-cover layer; the `partyPin` layer | the viewer's view state, never a digest | view only | not an event | absent: stop 1, `relief`, `false`, the document's week, no lens open, the document's week, `false` |
*Evidence:* docs/PROGRESS.md J399 (R1), (R4); V13 §2.4's `CampaignTimeline` (file w item 1153 (b)) and §2.6 as they stand (the `SailingLeg` row the last); V13 §4.4 ("a host input … is never a user's undo target"); item 1259's records.



### Volume 13 — §3.1 W0 Blueprint ((1) the request's `include`; (5) several campaigns, each its region; (8) the carve)

**1261.** **The request admits several campaigns; W0 lays each in a region of its own behind cuts the solver makes wild; the run ends by carving one world document per campaign.**
*Requests:* J399 (R2); item 1259 (a), (d); V15 §3.4 (item 1277); V09 §4.22 (5) (item 1290).
*Current text* (a):
> include?: { campaign: string } /* "based off⏎   of my settlements": the campaign whose settlements' facts and relationships enter through `CampaignFacts` (V13⏎   §3.11.6; H31) */;
*New text* (a):
> include?: { campaign: string } | { campaigns: string[] } /* "based off
>   of my settlements": the campaign whose settlements' facts and relationships enter through `CampaignFacts` (V13
>   §3.11.6; H31) — or SEVERAL campaigns (J399 (R2); step 5), each with its own `CampaignFacts`, each its region of the one
>   world grown, the run ending in the carve (step 8) */;
*Current text* (b):
>    is the same run with every option random: it always fits the campaign in one click (J-V13.118). **The instant world
*New text* (b):
>    is the same run with every option random: it always fits the campaign in one click (J-V13.118). **Several campaigns,
>    each its region** (J399 (R2); V15 §3.4): with `include` naming several campaigns (their `CampaignFacts` sent and kept
>    per campaign, V13 §3.11.6) W0 lays each campaign's planned sites inside a REGION of its own — the extent cut into one
>    axis-aligned rectangle per campaign by straight cuts on coarse grid lines (a guillotine partition: the first cut
>    across the extent's longer side, each part cut again until every campaign has its rectangle; the rectangles' areas in
>    proportion to the campaigns' summed seat reaches at their tiers, `reach.reachTierDays` × `reach.capFactor`, V13 §3.9
>    (7); the campaigns laid along the first cut in the request's order), each cut a rank-3 `Requirement` of kind `carve`
>    (`source: 'inclusion'`; `target: { line: { axis: 'x'|'y'; atCm: WorldCm; fromCm: WorldCm; toCm: WorldCm }; between:
>    [string, string] /* the two campaigns */ }`) — and every later stage grows the cut's own land WILD: water (W2's sea or
>    a strait, the formation op's rift), a range (the formation op's regional feature or W1's `range` op with `origin:
>    'solver'`) or land no seat reaches, chosen in that order by what the cut already crosses; W0 lays every planned site at
>    least its seat's reach cap (`reach.capFactor` × its tier's `reachTierDays`, V13 §3.9 (7)) plus `solver.edgeBlendCells`
>    from every cut, no `relation` row joins two campaigns (the planned sites keep campaigns apart: a relation between two
>    campaigns' settlements is refused at W0, `refuse.world.requirements`, the pair named), and W8 verifies each cut: no
>    sway cell of any seat lies on or across it (the reach bound, V13 §3.9 (7)); a cut a sway would cross is reported
>    `W_CARVE_REACH` with the offer `largerWorld` and the row `unmet`, never a boundary through a seat's reach. The run's
>    end carves the world (step 8). **The instant world
*Current text* (c):
>    me why" — first visible at Generate's end (the verification report), within one run (J397 (M3)).
*New text* (c):
>    me why" — first visible at Generate's end (the verification report), within one run (J397 (M3)).
> 8. **The carve** (J399 (R2); V15 §3.4, §4.1; J-V13.194). A run with several campaigns included (step 5) ends, after the
>    fine run and its verification report, by writing ONE WORLD DOCUMENT PER CAMPAIGN and keeping none of the whole: each
>    member is generated as a derived child of the grown world over its own rectangle (V13 §3.11.4's world subject, the
>    request's `parentCharter`) at the grown world's OWN rung and cell — the `WorldCharter`'s `ground` the grown rasters
>    over the rectangle at their own fine cell, which the member's W1 reads one to one and refines by nothing (no
>    formation op: the formation ran once, in the whole; the member's living physics re-derived over its own extent with
>    its cut sides' charters as boundary conditions, step 6) —, its planned sites those of its own campaign alone (rank-1
>    `site` rows), its `include` that campaign alone, and, for every side that lies on a cut, a locked `WorldEdgeCharter`
>    (`edgeCharter(grown, side, span, line)` at the cut line: the present ground BOTH members hold, so the two charters of
>    one cut are byte-equal and the pair is a continuation born whole; a side on the grown world's own boundary carries
>    none) — the ground COPIED into each member, never referenced (F14: after the carve nothing crosses, and each member is
>    its own document on its own clock bound to its own campaign, V15 §4.7). The grown world is the run's transient: never
>    saved, never bound, never a member; each member's `WorldRecipe.carve` keeps the seed, the hashed recipe, the
>    campaigns, its region and its cuts (V13 §2.2), so the whole re-grows byte-identically from the seed and the
>    requirements (V13 §3.17) and the clerk can say "carved from one world grown for three campaigns". The members are
>    handed to the atlas that asked for the run (V09's dialog on the atlas page, V15 §3.4's carve: each added with
>    `origin: 'carved'` and arranged at its region, the two charters of each cut recorded); each is chartered world-first
>    or placed as "based off of my settlements" places (step 5), and in host mode bound to its campaign as the include
>    run's world is (V13 §8.5's H35). A carve is a form of generation and only that: a world already bound to a campaign
>    is never carved (the sequel is R1's — one world, the next campaign on it, V13 §3.11.6), a member is never carved,
>    and the include toggle's gate — the host's campaign entitlement (J396 (2)) — is the carve's, the map adding none. A
>    request with one campaign carves nothing (the run as before). *Felt:* "one land, two tables: my two groups' realms
>    were grown as one country and handed to each as its own map, and neither can touch the other's" — first visible at
>    Generate's end (the members laid in the world map), within one run (J397 (M3)).
*Evidence:* docs/PROGRESS.md J399 (R2) (READ AS AND FOUND (1): several campaigns only as separate atlas members; "carved at generation into one member per campaign along the regions' boundaries"; "each member a world document holding the shared ground as its own"; "locked edge charters"; "after the carve nothing crosses (F14)"; "at generation only"); V13 §3.1 (1), (5), (6) as they stand (the request's `include`; the planned sites by relation; the edge charters as locked rows; `solver.edgeBlendCells`); V13 §3.9 (7) (the reach bound: `reach.reachTierDays`, `capFactor`); V13 §3.11.4 (the world subject: a derived child's `WorldCharter`, its ground upsampled) and §2.2's `WorldCharter` (item 1259 (d)); V13 §3.17 (determinism); V13 §3.18 (7) (a frame belongs to one world); V15 §3.4 (3) and §4.7 (the present ground, never a record; nothing crosses); V15 §1.1 (A-CONTINUE: the generated continuation is V13's `generate` run by V09's dialog); J396 (2) (the include toggle on the host's campaign entitlement); experience read 05 §2.3 (the microcosm rule as play: "a gallery of separate snow-globes" — the carve gives one country whose tables are kept apart by design, F14).


### Volume 13 — §3.11.6 The port (the grace rule for a sequel; `campaignFacts` per campaign; the inbound `bindCampaign` and `closeCampaign`; law (9)'s words; law (11) the campaign clock)

**1262.** **The port binds campaigns one after another on one world, keeps each campaign's facts, translates the host's week once, and names the pass's seam words.**
*Requests:* J399 (R1), (R2), (R4), (R5); J400 (7) (fragment (a)'s next-campaign canon), (9) (fragments (d)'s seam words and (e)'s weeks); items 1259, 1263, 1271 (H47), 1294.
*Current text* (a):
> host's own receipted canonize — H22's birth canon, taken at the campaign's first advance over the seats as they then⏎stand (the grace rule, J397 (M2); H38:
*New text* (a):
> host's own receipted canonize — H22's birth canon, taken at the campaign's first advance over the seats as they then
> stand (the grace rule, J397 (M2); on a sequel world the NEXT campaign's canon too, taken fresh at its own first advance
> over the seats as they then stand — the re-bound seats among them —, the earlier campaign's canon versions kept
> read-only in its `CampaignRecord`, J399 (R1), H47: the spatial birth canon alone, the host's own realm canonize of the
> next campaign staying before that advance as the first campaign's does, and an undo of that advance un-adopting the
> canon and revoking `canonized` — the re-bound seats dragging free again —, as for any campaign (J400 (7)); H38:
*Current text* (b):
>   `SettlementFacts`, never the host's) — and its regional graph's relations, for "based off of my settlements" (V13 §3.1 (5)) and⏎  the best form; a windowed replace keyed by host keys, re-sent when a settlement's dossier changes (the decisions that⏎  rested on the changed facts are re-asked, V13 §3.11.5 (1)); nothing of it is a map fact.
*New text* (b):
>   `SettlementFacts`, never the host's) — and its regional graph's relations, for "based off of my settlements" (V13 §3.1 (5)) and
>   the best form; a windowed replace keyed by host keys, re-sent when a settlement's dossier changes (the decisions that
>   rested on the changed facts are re-asked, V13 §3.11.5 (1)); nothing of it is a map fact. **Sent and kept per
>   campaign** (J399 (R1), (R2)): the message names its campaign, and the fold keeps one set per `CampaignRecord` — the
>   live campaign's the include run's and the best form's, a closed campaign's last set read-only with its record —; a run
>   with several campaigns included (V13 §3.1 (5)) reads one set per campaign. **The next campaign's include run** (J399
>   (R1); H47): a settlement whose `stoodAs` names a seat an earlier campaign bound on this world (`CampaignRecord.seats`)
>   is RE-BOUND to that seat — `bindSeat` on that placement, admitted because the earlier binding is closed and kept in
>   its record, the placement's `hostKey` now the new campaign's, its `hostLocked` cleared until the new campaign's first
>   advance (the grace rule holds per campaign) — and every other settlement is placed as an ADDITION by the best form
>   (V13 §3.11.1), the sites the earlier campaign's seats stand on claimed first; nothing of the earlier campaign's record
>   moves: its events, revisions and plates are keyed by week and point, never by a placement.
*Current text* (c):
>   head; each is sealed against undo).
*New text* (c):
>   head; each is sealed against undo).
> - `bindCampaign(world, { campaign: string; name: string; gapYears: number /* default 0 */; closes?: string /* the live
>   campaign this one succeeds */ })` (J399 (R1); H47): the host binds a campaign to this world — the first binding is
>   the host's new-world request itself (its `CampaignRecord` with `fromWeek` 0); the next is "Next campaign here" (V09
>   §4.22 (11)): the live campaign named in `closes` is closed at its last window's end (`toWeek`), and the new record
>   opens with `fromWeek` = that `toWeek` + `gapYears` × 52 — the gap campaign time and nothing geological: the cover's
>   recovery and succession run over it (V13 §5.8 (9)) and no raster, landform or surface moves at a binding —; the
>   fold writes the record, folds the cover plate at `fromWeek` (the sequel's baseline, V13 §5.8 (9)) and clears
>   `Placement.hostLocked` on the seats the next include run re-binds (above); the birth window (H37) and the
>   `campaignFacts` of the new campaign follow it. A `bindCampaign` while a campaign is open and not named in `closes`
>   is refused `refuse.world.campaignLive` — a world is never bound to two live campaigns; one naming a `closes` that is
>   not the live campaign likewise. `closeCampaign(world, { campaign })` closes the live campaign at its last window
>   without a successor (the world then host-bound to none and read-only but for the DM's own edits, as V13 §2.6's
>   dark-after-lit row reads). Both recorded inputs, author `host`, never a user's undo target.
*Current text* (d):
> and **the carry** is a dated frame surface written by the DM's one confirmation from a world surface change, never a re-derive (§3.14.2 step 6; J397 (M32); file y item 1243).
*New text* (d):
> and **the carry** is a dated frame surface written by the DM's one confirmation from a world surface change, never a re-derive (§3.14.2 step 6; J397 (M32); file y item 1243); a **campaign record** is a world's record of one campaign bound to it — its name, its weeks on the world clock, its seats (§2.2's `CampaignRecord`) —, the **live campaign** the one open record, **the gap** the campaign time a sequel's DM declares between two campaigns (years, held as weeks on the world clock; never geological time, which is the weather depth's), **the world clock** the one week axis every record of a world is dated on (a campaign's weeks mapped onto it by its `fromWeek`; never a second axis), **the carve** the cutting of one grown world into one member per campaign at generation (§3.1 (8); never a member cut later, and never a continuation, which is one world generated beside another), **the party pin** the DM's dated placement of the party (§2.2's `PartyPlacement`; never a journey, and never the party key, which is what the party knows; on a host-bound world a present-at request the host carries out, or the map's own picture — never the party's place), **the party's whereabouts** the host's place of the party on its presentation rows (`LensFacts.partySeats`, with its source and stamp; on a host-bound world the one writer of the party's place, J400 (9)), and a **world scene** the VTT scene of a world page or an atlas view (§5.4; never a settlement's crop or a site's scene) (J399 (R1)–(R4); file z item 1262).
*Current text* (e):
> instead (T-V13-83). **Scale:** the host stamps its own map unit's kilometres from the world header (V13 §2.1), never a default; the
*New text* (e):
> instead (T-V13-83). (11) **the campaign clock, in weeks** (J399 (R1), (R5)): every week the host sends is its live campaign's own and is translated ONCE, at the fold, onto the world clock (the live `CampaignRecord.fromWeek` + the host's week; the whereabouts' `partyStamp` among them) and once back at every offer and answer that names a week (a `physicalChange`'s tick head; a `requestPartyPresent`'s week; a `TimeDeltaReceipt`'s legs are durations and need none); no record of the map holds a host week and no message of the port, in either direction, a time finer than a week (the lint T-V13-124: the world's clock is the host's week, and the hour is the DM's); a recorded input naming a closed campaign is refused `refuse.world.campaignClosed`, one naming a campaign this world has not bound is refused until its `bindCampaign` (`refuse.world.campaignLive`, the live campaign named), and on a world of one campaign the translation is the identity (`fromWeek` 0). **Scale:** the host stamps its own map unit's kilometres from the world header (V13 §2.1), never a default; the
*Evidence:* docs/PROGRESS.md J399 (R1) ("a world document binds one live campaign at a time"; "its birth window starting its own clock after a gap the DM declares at binding (years between, default none), the gap running the cover's campaign-time recovery and succession and nothing geological"; "its settlements placed by the include run as additions or re-bound to the seats they stood at"; "the new campaign's canon is taken fresh at its first advance (H22, the grace rule)"; "a world is never bound to two live campaigns"), (R2), (R4), (R5); J400 (7) ("the realm's own canonize (its world clock) stays before the first advance and only the SPATIAL birth canon moves"; "an undo of the first advance un-adopts the canon, re-opens the lock and REVOKES `canonized`"), (9); research/sf/host-reply-2026-10-24.md S3 (a), (c) and S5; research/sf/host-rulings-mirror.md §2 (the grace rule; the party's place); V13 §3.11.6 as it stands (the consumption law's grace sentence, file v item 1090; the `campaignFacts` row; the recorded inputs' form — logged, replayable, keyed by host keys; law (9) as file y item 1243 leaves it; law (10), file v item 1093); V13 §2.6's dark-after-lit row and §2.2's `TravelLaw.season.quarterWeeks`; V13 §3.11.1 (the best form); V13 §8.5's H22 and H38 (the grace rule); spine §12 (one word, one meaning; the vocabulary extended by the seam words this file coins); experience read 01 §4 Q5 (the grace window).


### Volume 13 — §3.11.6 The port (the party's place on the presentation rows; the outbound `requestPartyPresent` beside `requestDossierUpdate`)

**1294.** **The party's place is the host's whereabouts on its presentation rows, with its home seat from the host's party record; the DM's pin at a settlement reaches the host only as the DM's own present-at request.**
*Requests:* J400 (9), (10); J399 (R4); items 1259 (b), (c), 1263 (a), 1267, 1271 (c).
*Current text* (a):
> host records belief, that set the believed record of the **party observer**: the court of the settlement the party⏎stands at (`LensFacts.partySeat`, sent each advance), else the party's home seat (`CampaignFacts.homeSeat`), else none,⏎the host naming the court it resolved (`LensFacts.observer`; H39; J397 (M8)) —
*New text* (a):
> host records belief, that set the believed record of the **party observer**: the court of the party's seat where the
> host's whereabouts of the party name one (`LensFacts.partySeats`: the place the host's party record holds — the DM's
> present-at in the host, else the last heard — sent on its presentation rows with its source and stamp, `partySource`
> and `partyStamp`; one seat, or two for an act at a pair), else the party's home seat (`LensFacts.partyHome`, a field
> of the host's party record the DM sets) — a pair reading the home seat's court until the host rules a pair's
> observer, failing closed —, else none, the host naming the court it resolved (`LensFacts.observer`; H39; J397 (M8);
> J400 (9)); the whereabouts are the one writer of the party's place on a host-bound world (the DM's party pin is a
> request to it or the map's own picture: `requestPartyPresent` below, §2.2's `PartyPlacement`), and no court's believed
> facts are asked for the party's picture —
*Current text* (b):
> re-opened (H32). **`routeFacts`** carries
*New text* (b):
> re-opened (H32). **`requestPartyPresent(world, seats: string[], week)`** (J400 (9); H39) — the DM's party pin dropped
> AT a host-bound settlement (`seats` its host key) or between two (an act at a pair: `seats` the two), on a world
> whose host sends the party's whereabouts: the DM's OWN present-at act carried to the host through the port, as
> `requestDossierUpdate` carries the user's approval, and never the map's — only a `setPartyPin` `place` under the owner
> or editor role sends it (V13 §4.1), never a fold, a re-derivation, a replay, an undo or a host row —, logged with
> provenance `user`, its `week` the placement's on the host's clock (law (11)); the host carries it out by its own
> writer as the DM's present-at, and the map shows the party there only once the host's next lens window carries those
> seats in `LensFacts.partySeats`, the placement drawn PENDING until then (`W_PARTY_PENDING` with `wait` and
> `withdraw`; §2.2's `PartyPlacement.present`); a next window naming other seats, or none, supersedes it and the party
> is drawn at the host's place — the host is the one writer of the party's place; the map's own undo of the placement
> clears its pending mark and recalls nothing: what the host carried out is the host's, changed only by a new present-at
> act. A pin dropped off every host-bound settlement sends nothing and is the map's picture alone (it feeds the map's
> own known set, V13 §5.8 (7)); on a world whose host does not send the whereabouts nothing is sent and every placement
> is the map's picture; a standalone world has no port, and its pin is the party's only writer. **`routeFacts`** carries
*Evidence:* docs/PROGRESS.md J400 (9) ("`whereaboutsOf(party)` — the DM's present-at toggle, else the last heard — sent on the host's presentation rows as `partySeats?: string[]` … with `partySource?` … and `partyStamp?`"; "on a host-bound world a pin dropped at a settlement is sent to the host as the DM's own present-at act (`requestPartyPresent`) and drawn pending until the host's next row carries it"), (10) ("`LensFacts.courts` stays absent until the host's information program rules a fold row"); research/sf/host-reply-2026-10-24.md S5 ("The party's place IS PT's `whereaboutsOf(party)`"; PT3: "The engine never writes `presentAt`; only the DM does"; "It is sent on H17 presentation rows (§3.1.27), never as a second `campaign.party` record"; "THE COURT VIEWPOINT IS HELD") and "Five rules" (1) (one unit, one writer); research/sf/host-rulings-mirror.md §1 (one unit, one writer) and §2 (the party's place; the court viewpoint); V13 §3.11.6 as it stands (the lens window's party-observer sentence, file v item 1092; `requestDossierUpdate`'s paragraph, file r item 970, the precedent for a request the host carries out and a pending warning); V13 §2.2 as item 1259 leaves it; T-V13-7 (the presentation inputs write nothing; the port one-way per message).


### Volume 13 — §4.1 The edit events (`setPartyPin`, `bindCampaign`, `closeCampaign`; the outcome keys; the authors) and §4.2 The authoring tools (T9's party pin)

**1263.** **The DM's party pin and the host's campaign bindings are edit events with their refusals and the carve's warning; T9 places the pin.**
*Requests:* J399 (R1), (R2), (R4), (R6); J400 (9) (fragments (a), (b), (d), revised); items 1259, 1262, 1294.
*Current text* (a):
>   | { t: 'dossierUpdated'; request: Id; applied: boolean; hostSeq: number; kind: 'landChanged'|'alwaysSo'; hostEffect?: Conflict['preview']['hostEffect'] /* what the host did, in its own effect word (J397 (M33)): `rederive` on a draft, `decreeAtNextAdvance` or `retcon` on a canonized settlement, `reroll` only from an older path of its; shown on the conflict's closing line */ }   // author 'host' (WorldPort.dossierUpdated): the confirmation or the retraction; a recorded input
*New text* (a):
>   | { t: 'dossierUpdated'; request: Id; applied: boolean; hostSeq: number; kind: 'landChanged'|'alwaysSo'; hostEffect?: Conflict['preview']['hostEffect'] /* what the host did, in its own effect word (J397 (M33)): `rederive` on a draft, `decreeAtNextAdvance` or `retcon` on a canonized settlement, `reroll` only from an older path of its; shown on the conflict's closing line */ }   // author 'host' (WorldPort.dossierUpdated): the confirmation or the retraction; a recorded input
>   | { t: 'setPartyPin'; action: 'place'; where: WorldWhere; week?: Week /* the document's week unless back-dated; later than it refused (`refuse.world.pinDate`) */; audience?: 'public'|'dmOnly' /* `public` */; note?: string } | { t: 'setPartyPin'; action: 'remove'; placement: Id }   // THE PARTY PIN (J399 (R4); V13 §2.2's `PartyPlacement`): `place` appends a dated placement — where the party IS, by the DM's hand, anywhere —, `remove` deletes one; the DM only (the owner and editor roles; a viewer refused `refuse.viewer`, the law of §1.3, J399 (R6)); two placements are two facts and never a path: the fold draws no line, computes no ETA and counts no day between them; never on a frame document (the pin is the world's); ONE WRITER on a host-bound world (J400 (9)): where the host sends the party's whereabouts, a `place` AT a host-bound settlement or pair (`where.pair`) also emits `requestPartyPresent` through the port (V13 §3.11.6) — the DM's own present-at act, never the map's — and writes the placement's `present`, drawn pending (`W_PARTY_PENDING`) until the host's next window carries it; a `place` off every host-bound settlement emits nothing (the map's own picture); a `remove` of a pending placement clears its mark and recalls nothing from the host
>   | { t: 'bindCampaign'; campaign: string; name: string; gapYears: number; closes?: string } | { t: 'closeCampaign'; campaign: string }   // author 'host' (WorldPort.bindCampaign, .closeCampaign; J399 (R1); H47): the world's `CampaignRecord`s (V13 §2.2) — the next campaign bound after the live one closes, its clock from its predecessor's end plus the gap; refused `refuse.world.campaignLive` while another campaign is open and not named in `closes`; recorded inputs, never a user's undo target, and the world's undo never reaches below the live campaign's `fromWeek`; a DM edit dated inside a closed campaign's weeks is refused `refuse.world.campaignClosed`
*Current text* (b):
> J397 (M32)); the⏎warnings with their `ConflictAction`s — `W_TRAVEL_BAND_CROSSED` (`keep`, `cancel`: every dry run, route-class edit
*New text* (b):
> J397 (M32)), `refuse.world.campaignLive` (a `bindCampaign` while another campaign is open and not named in `closes`,
> or a port message naming a campaign this world has not bound; J399 (R1)), `refuse.world.campaignClosed` (a recorded
> input or a DM edit dated inside a closed campaign's weeks; J399 (R1)), `refuse.world.pinDate` (a party placement dated
> later than the document's week; J399 (R4)); the
> warnings with their `ConflictAction`s — `W_CARVE_REACH` (`acceptOffer` with `largerWorld`, `keep`: a `carve` cut a
> seat's sway reach would cross, V13 §3.1 (5); J399 (R2)), `W_PARTY_PENDING` (`wait`, `withdraw` — the placement
> removed: a party placement sent to the host as the DM's present-at act, until the host's next lens window carries or
> supersedes it, V13 §3.11.6; J400 (9)), `W_TRAVEL_BAND_CROSSED` (`keep`, `cancel`: every dry run, route-class edit
*Current text* (c):
> `withdraw` and `rebake` (BCR-V13-42). The author of a port-driven `requestCharter` is `host`; of `dossierUpdated` and⏎`campaignFacts` `host`; of `bindPlacement` and the frame's `charter`
*New text* (c):
> `withdraw` and `rebake` (BCR-V13-42). The author of a port-driven `requestCharter` is `host`; of `dossierUpdated`,
> `bindCampaign`, `closeCampaign` and `campaignFacts` `host`; of `setPartyPin` the DM (`user`); of `bindPlacement` and the frame's `charter`
*Current text* (d):
> | T9 `shape` | `setAttr` on a surface, reach, territory, route or placement; `deleteTrace` on a trace | the inverse |
*New text* (d):
> | T9 `shape` | `setAttr` on a surface, reach, territory, route or placement; `deleteTrace` on a trace; **the party pin** (`setPartyPin`; J399 (R4)): **The party is here** — a click places the party at the pointer (a seat, a point in the wild, a road at its fraction), a drag moves it, each a dated placement listed on the pin's card with its week and the DM's note, the card's **Between this and…** (a placement at a seat made an act at a pair by a click on a second seat), its **Show the players** switch (on) and the DM-only **Show earlier placements** switch; on a host-bound world whose host sends the party's whereabouts a placement at a host-bound settlement or pair is sent to the host as the DM's present-at act and shown pending until the host's next advance carries it, any other placement the DM's picture alone (J400 (9)); never a line between two placements, never a road the map plots for the party (V09 §4.22 (11)) | the inverse; a placement removed or restored; a pending mark cleared, nothing recalled from the host |
*Evidence:* docs/PROGRESS.md J399 (R1), (R2), (R4), (R6); J400 (9); research/sf/host-reply-2026-10-24.md S5 (PT3: "The engine never writes `presentAt`; only the DM does"; an act at a pair "which PT places near both endpoints"); V13 §4.1's `W_DOSSIER_PENDING` (`wait`, `withdraw`), the pending warning's precedent; V13 §4.1 as it stands (the `dossierUpdated` variant, file w item 1172; the refusal list's end and the warnings, file w items 1172, 1175; the authors' sentence) and §4.2's T9 row; the base §7.1's `refuse.viewer` and §11.2's `audience.role`; item 1259's records; item 1262's port messages; experience read 05 §1.1 (the party's map), §2.3.


### Volume 13 — §5.1 The world map: layers and styles (the `routes`, `sway` and `events` rows; the `partyPin` row)

**1264.** **The routes' times are labels and never a journey; the sway and the events read an earlier campaign only in history; the party's place is a layer of its own.**
*Requests:* J399 (R1), (R4); J400 (9) (fragment (d)'s row, revised); items 1259, 1262, 1267, 1268, 1294.
*Current text* (a):
>  `derivedTime` labelled with the law and "on foot"; at a crossing whose toll holder differs from the sway's holder the hover "tolls to {seat} until the sway soaks" (V13 §3.9 (16); J397 (M18)) | highway 2 px solid, road 1.2 px, track 0.8 px dashed, trail 0.5 px dotted, sea 1 px dashed blue, river (navigable) a darker water line |
*New text* (a):
>  `derivedTime` labelled with the law and "on foot"; at a crossing whose toll holder differs from the sway's holder the hover "tolls to {seat} until the sway soaks" (V13 §3.9 (16); J397 (M18)); every time on this layer is a route's LABEL in weeks — information, never a journey the map runs for the party: no path is drawn from the party pin, no arrival is computed and no day is counted (J399 (R4), (R5); the `partyPin` row) | highway 2 px solid, road 1.2 px, track 0.8 px dashed, trail 0.5 px dotted, sea 1 px dashed blue, river (navigable) a darker water line |
*Current text* (b):
> standalone provinces at stop ≥ 2 as 0.6 px dashed | the allegiance palette |
*New text* (b):
> standalone provinces at stop ≥ 2 as 0.6 px dashed; at a `lensWeek` before the live campaign's `fromWeek` (V13 §2.2's `CampaignRecord`) the revision in force THEN — the earlier campaign's sway, drawn only there, in history, under the label "before this campaign: {name}, its year n" (J399 (R1); V13 §5.8 (8)) — and, between a binding and the new campaign's birth window, no live sway (the legend: "awaiting this campaign's first window") | the allegiance palette |
*Current text* (c):
> , worn in the telling, planted); on a player's picture a public pin draws at its week, or, under the default-preset arm, when the news reaches the party (V13 §5.8 (7); J397 (M10)) | the notice style |
*New text* (c):
> , worn in the telling, planted); on a player's picture a public pin draws at its week, or, under the default-preset arm, when the news reaches the party (V13 §5.8 (7); J397 (M10)); a pin of an earlier campaign (its week before the live campaign's `fromWeek`) draws under "before this campaign: {name}, its year n" and opens read-only (J399 (R1); V13 §5.2) | the notice style |
*Current text* (d):
> | `anomalies` | pins | `PlacementAnomaly` | the notice style |
*New text* (d):
> | `anomalies` | pins | `PlacementAnomaly` | the notice style |
> | `partyPin` | pins | the party's place (J399 (R4); J400 (9); V13 §2.2's `PartyPlacement` and `LensFacts.partySeats`): its CURRENT place as the party glyph — on a standalone world the pin's latest placement, "the party is here" and its week; on a host-bound world the host's whereabouts of the party (one seat: the glyph at the seat; a pair: the glyph at each of its two seats captioned "between {A} and {B}", never a line between them; "the party is at {seat}" where the host holds the DM's present-at, "last heard at {seat}, week n" where it holds the last heard), unless the DM's latest placement is later than the host's `partyStamp` — a map-only placement off every host-bound settlement then drawn as "where the game master narrates them, week n", a present-at placement drawn PENDING (a hollow glyph, on the DM's picture alone; the legend "sent to the host; shown once its next advance carries it", `W_PARTY_PENDING`) until the host's next window carries it (then the host's glyph) or names other seats (the glyph at the host's place: the host is the writer); where the host sends no whereabouts every placement is drawn as the DM's picture —, for every audience its `audience` admits (a party's picture draws its current public place and nothing older); under the DM-only `showPinHistory` key the earlier placements as dated dots, each with its week and note — never a line, arrow or path between any two (the host's ambiguity law for movers, V13 §5.8 (5), kept for the party itself), never an ETA, never a day count; a placement at a seat sits on the glyph; in the VTT scene the current place is a note, a pending placement on the DM's scene alone (V13 §5.4); never in `renderAt`'s `atlas` set (a mark of the page, not of the member's picture, V13 §5.4) | the notice style; the party glyph (own) |
*Evidence:* docs/PROGRESS.md J399 (R1) ("the history surfaces (the scrub, the campaign history view, the events layer) show the earlier campaigns' plates read-only, labelled 'before this campaign: {name}, its year n', their sways drawn only in history"), (R4) ("travel times stay the routes' labels — information, never a journey the map runs; no day counts"), (R5); V13 §5.1 as it stands (the `routes` row as file w item 1176 and file y leave it; the `sway` row's end as file w leaves it; the `events` row as file v item 1095 leaves it; the `anomalies` and `labels` rows); V13 §5.8 (5) (the ambiguity law: no destination, no ETA, no path highlight); J400 (9) and research/sf/host-reply-2026-10-24.md S5 (the whereabouts "may name MORE THAN ONE settlement (an act at a pair, which PT places near both endpoints)"; its source and stamp); experience read 05 §1.1, §2.3.


### Volume 13 — §5.2 Zoom stops, the glyph levels and opening a settlement (the campaign history view on a sequel world)

**1265.** **The campaign history view runs back through every earlier campaign, read-only.**
*Requests:* J399 (R1); items 1260 (a), 1262.
*Current text:*
> **campaign history** view (V13 §4.4; V09 §4.22 (11); J397 (M39)): one timeline of the world's and its towns' dated⏎events, each entry opening its document.
*New text:*
> **campaign history** view (V13 §4.4; V09 §4.22 (11); J397 (M39)): one timeline of the world's and its towns' dated
> events, each entry opening its document; on a sequel world (J399 (R1); V13 §2.2's `CampaignRecord`) the timeline runs
> back through every earlier campaign's weeks on the world clock, each earlier entry under "before this campaign: {name},
> its year n" (`CampaignTimeline.entries[].campaign`, V13 §2.4) and READ-ONLY — it opens its document with the scrub at
> that week and no edit offered: a closed campaign's weeks admit no edit (`refuse.world.campaignClosed`) and the world's
> undo never reaches below the live campaign's `fromWeek` (V13 §4.1) —, and the gap between two campaigns is one entry,
> "{n} years pass — between {A} and {B}", with nothing in it but the cover's recovery (V13 §5.8 (9)).
*Evidence:* docs/PROGRESS.md J399 (R1); V13 §5.2's last sentence as file w item 1177 leaves it; V13 §4.4 (one history, two logs: a reading, never a third undo stack); V13 §2.4's `CampaignTimeline` as item 1260 (a) leaves it; item 1262 (c) (`bindCampaign`'s gap); experience read 04 §4 Q10 (one history).


### Volume 13 — §5.4 Exports (the world scene row; the rendered reading's picture as the scene)

**1266.** **The world page exports as a VTT scene: `renderAt`'s picture at a stop as the background, the DM's grid as presentation, the glyphs and sites as notes, no walls, no lights, through V14's shared writer.**
*Requests:* J399 (R3), (R5), (R6); J400 (9) (the party's note in (a), revised); items 1269 (`WORLD-24`), 1273 (BCR-V13-56), 1288 (the shared writer), 1293 (the base).
*Current text* (a):
> | the picture exports | the base's (§11.1: PNG/SVG/PDF of the view at a stop, the A2 300-dpi still) | the world view with its layers and labels | §11.1 unchanged; the world is one more document kind |
*New text* (a):
> | the picture exports | the base's (§11.1: PNG/SVG/PDF of the view at a stop, the A2 300-dpi still) | the world view with its layers and labels | §11.1 unchanged; the world is one more document kind |
> | **the world scene** (J399 (R3); BCR-V13-56; T-V13-123; `WORLD-24`) | one Foundry-class scene JSON and one Universal VTT file per world page, by §11.1's profile extended to the world rungs, written through V14 §5.3's shared writer `sceneSet` (one image and one JSON per scene; the `plat` object; the Foundry scene's `Level` per scene) | the world page at the chosen zoom stop (V13 §5.2's four) for the chosen audience: **the picture** — `renderAt(world, week, audience)`'s tiles at the stop (the rendered reading below: the member's default picture, every DM-only mark absent for a party or public audience, never greyed) with the `partyPin` layer's current place of the party where the audience admits it (a pending placement on the DM's scene alone), composed into the scene's background image at the stop's pixels (≤ 8 192 px a side; a larger picture a grid of scenes aligned to cells, §11.1's rule, the dialog showing it first); **the grid**, the DM's choice and presentation only — `grid: { kind: 'square'\|'hex'; kmPerCell: number } \| 'none'`: the cell an integer number of pixels (the dialog offers the km-per-cell values the stop's metres per pixel divide evenly, the one nearest 100 px first), a hex grid written as the Foundry scene's hex grid type and, in the Universal VTT file, as a square of the hex's width with `plat.grid.kind` `hex`, `none` as the Foundry scene's gridless type and the finest offered cell in the Universal VTT file with `plat.grid.kind` `none` — a cell carries no travel time and names no day (J399 (R5)): the tabletop's grid is the tabletop's, the map's times stay the routes' labels; **the notes** — every settlement glyph and site drawn at the stop as the scene's notes (the Foundry scene's `notes[]`, a journal page each; the Universal VTT file has none, so `plat.notes[]` carries them in the same form: the point in cells, the name, the kind) with their names and, for the DM audience alone, their reason sentences (`reasonOf`'s chain rendered, V13 §3.11.6), a party's or public note its name alone, and the party's current place a note in the `partyPin` layer's words ("the party is here", "last heard at {seat}, week n") where its audience admits it; **no walls, no lights** — `line_of_sight`, `objects_line_of_sight`, `portals` and `lights` empty, `environment.baked_lighting` true; **the `plat` object** — `plat.world { doc; rung; stop; audience; kmPerCell; gridKind }`, the date label and the season at the drawn week (§11.1's `season { week, name, winter }`), the world's digests and the output version (the provenance block's facts); **no player-writable layer** of ours (J399 (R6)) and nothing a player audience may not see (the audience's admission is §11.1's knowledge rule, through the picture and the notes alike) | `ExportOpts.vtt.world { stop; audience; grid; notes? }` (BCR-V13-56); the audience's admission as §11.1's knowledge rule; the file name `{world}-{stop}-{cols}x{rows}` (V09 §5.10) |
*Current text* (b):
> its path. It is never a model input and never persisted.
*New text* (b):
> its path. It is never a model input and never persisted. **The world scene reads it** (J399 (R3); the table's row
> above): the scene's background image is this reading's tiles at the chosen stop for the chosen audience, composed — so
> a players' scene is the party's picture as the atlas would show it, with nothing of the DM's in it —, and the scene's
> notes are the glyphs and sites that reading draws at the stop; the scene adds a grid the DM chooses (presentation, no
> time in it, J399 (R5)) and takes nothing else from the document: no lens, no diagnostic, no wall, no light.
*Evidence:* docs/PROGRESS.md J399 (R3) ("the base's VTT profile … extends to every world rung and to the atlas"; "one scene per world page or atlas view at the chosen zoom stop and audience: the picture as the scene's background image; the grid the DM's choice (square or hex at a size in km per cell, or none) as presentation only — a cell carries no travel time (R5) and the VTT's grid is the VTT's; settlement glyphs and sites as the scene's notes with their names and, for the DM audience, their reason sentences; no walls, no lights; the audience's picture; the date label and season in the plat object; V14's export machinery reused"), (R5), (R6); V13 §5.4 as it stands (the exports table's last row; the rendered reading's paragraph, file r item 1011 and J394) and §5.2 (the four stops); V13 §3.11.6 (`reasonOf`, file v item 1091); the base §11.1 (the formats table's VTT row; the profile: the 8 192 px cap and the grid of scenes, the `plat` object, `season`, the Foundry scene's grid and `Level`, `environment.baked_lighting`) and §11.2's `ExportOpts.vtt`; V14 §5.3 (one image and one JSON per scene; the `plat` object; the lights carry no hour) as item 1288 leaves it; V09 §5.10 (the Tabletop tab) as item 1291 leaves it; experience read 05 §1.6 (a player opening the world map).


### Volume 13 — §5.8 (7) The audience filter (the party's place is the host's: the observer and the news delay read `partySeats`; the known set grows from the party's places)

**1267.** **The party observer and the default-preset news delay read the host's whereabouts of the party and nothing of the pin; the known set grows from the party's places — never a path.**
*Requests:* J399 (R4); J400 (9), (10) (every fragment revised: the pin's fallbacks for the observer and the news delay and the court-facts request removed; (c) added); items 1259 (b), (c), (g), (h), 1264, 1271 (H39), 1294.
*Current text* (a):
> **the party's observer** (J397 (M8); H39): the party's⏎   believed set is the believed record of the court of the settlement the party stands at (the party seat the host⏎   sends each advance, `LensFacts.partySeat`), else of the party's home seat (`CampaignFacts.homeSeat`, a campaign fact⏎   the DM names), else none — the public truth or nothing —, the host resolving the court and naming it⏎   (`LensFacts.observer`), so a rumour
*New text* (a):
> **the party's observer** (J397 (M8); H39; J400 (9)): the party's
>    believed set is the believed record of the court of the party's seat where the host's whereabouts of the party
>    name ONE seat (`LensFacts.partySeats`: the place the host's party record holds — the DM's present-at in the host,
>    else the last heard — sent on its presentation rows), else of the party's home seat (`LensFacts.partyHome`, a field
>    of the host's party record the DM sets) — a PAIR (an act between two settlements) reading the home seat's court
>    until the host rules a pair's observer, failing closed —, else none — the public truth or nothing —, the host
>    resolving the court and naming it (`LensFacts.observer`); the DM's party pin is never read for the observer (it is a
>    request the host carries out or the map's own picture, V13 §2.2's `PartyPlacement`) and the map asks no court's
>    believed facts for the party's picture, so a rumour
*Current text* (b):
> **where the host sends the party's⏎   seat, the public truth at a rider's pace** (the default-preset arm, J397 (M10)): a public row of a seat at week w⏎   reaches the party's picture at w + floor(hopWeeks × `partyNewsDelay.factor`), the hop weeks the canon's from the⏎   row's seat to the party's seat under the travel law in force (a pair's row from the nearer seat; a realm-wide row⏎   from the nearest seat it names; a row of the party's own seat at once; a row with no seat at its week)
*New text* (b):
> **where the host sends the party's
>    whereabouts, the public truth at a rider's pace** (the default-preset arm, J397 (M10); J400 (9)): a public row of a seat at week w
>    reaches the party's picture at w + floor(hopWeeks × `partyNewsDelay.factor`), the hop weeks the canon's from the
>    row's seat to the NEAREST seat of `LensFacts.partySeats` (its one seat, or the nearer of a pair) under the travel law
>    in force (a pair's row from the nearer seat; a realm-wide row from the nearest seat it names; a row of a seat
>    `partySeats` names at once; a row with no seat at its week)
*Current text* (c):
> with no party seat sent the picture is as⏎   current as the public truth, and the legend says so.
*New text* (c):
> with no whereabouts sent the delay is not applied
>    and the picture is as current as the public truth, and the legend says so; the DM's party pin never measures the
>    delay (J400 (9): on a host-bound world the host's whereabouts are the one writer of the party's place), and a
>    standalone world has no delay and no observer (there is no host). **The known set grows from the party's places**
>    (J399 (R4); J400 (9)): a party's known cells (`RenderedWorld.known`, V13 §2.2; the party key's `places`, V14 §2.3)
>    gain the seats of the host's whereabouts from each window's `partyStamp` and the coarse cell of each of the DM's
>    map-only party placements from its week — on a standalone world every placement's, the seat's place where a
>    placement is at a seat; a present-at placement counts once the host's row carries it, as the host's seats —, never
>    a cell between two places: the places are where the party has been, not how it went (the ambiguity law, (5), kept
>    for the party itself: the party may teleport, fly or leave the road, so the map never computes its journey); travel
>    times stay the routes' labels (V13 §5.1), information and never a journey the map runs — no path, no ETA, no day
>    count (T-V13-122; the one writer, T-V13-126; the observer and the delay, T-V13-127).
*Evidence:* docs/PROGRESS.md J399 (R4) ("the cells the party has been at — the pin's placements, never a path between them: the ambiguity law"); J400 (9) ("the observer for a pair asked of PT, the map failing closed meanwhile (a pair reads the home seat's court, else none)"; "a pin off any settlement is a map-only picture feeding only the map's known set, and the observer and the news delay read the host's `partySeats`; on a standalone world the pin is the only writer"), (10) ("`LensFacts.courts` stays absent until the host's information program rules a fold row" — the reason file z's fallback through the court-facts request, H40, is removed: it would read nothing); research/sf/host-reply-2026-10-24.md S5 ("As written: the observer rule (the court of the party's settlement, else the home seat, else none), and the believed rows with `asOfWeek` and the quarter confidence band"; "Which court observes for a pair is an ask to PT at its unit. The host does not invent that rule here"; "THE COURT VIEWPOINT IS HELD"); research/sf/host-rulings-mirror.md §2 (the party's place; the court viewpoint); V13 §5.8 (7) as file v items 1100 and 1104 leave it; V13 §5.8 (5) (the ambiguity law); V13 §2.2's `LensRule.partyNewsDelay` as item 1259 (h) leaves it; V13 §8.5's H39 as item 1271 (c) leaves it; V14 §2.3 (the party key); experience read 05 §1.1–§1.2, §2.1 (the party's map), §4 Q1, Q5.


### Volume 13 — §5.8 (8) The time scrub and the plates (a sequel's plates) and (9) land cover (the sequel's baseline)

**1268.** **The plates of earlier campaigns stand read-only below the live campaign's, labelled; the binding folds the sequel's baseline as a dated fact.**
*Requests:* J399 (R1); items 1259 (b), 1262 (c), 1264 (b); T-V13-121.
*Current text* (a):
>    start at the birth window where the host sends one (J397 (M1); H37: plate 0 at the campaign's creation, so the scrub⏎   reaches week 0 and the first advance's plate differs from it only where something changed — no week-one artifact),⏎   else at the first advance the map observes, and the scrub declares every gap
*New text* (a):
>    start at the birth window where the host sends one (J397 (M1); H37: plate 0 at the campaign's creation, so the scrub
>    reaches week 0 and the first advance's plate differs from it only where something changed — no week-one artifact; on
>    a sequel world (J399 (R1); V13 §2.2's `CampaignRecord`) the next campaign's plate 0 at its `fromWeek`, the earlier
>    campaigns' plates standing below it READ-ONLY: a window replace of the live campaign drops no plate below its
>    `fromWeek`, a closed campaign's last plate is pinned by its close so compaction never takes it, the plate cache is
>    keyed by the world week (a window's `seq` read within its campaign), and the scrub, running back through them, labels
>    every week before `fromWeek` "before this campaign: {name}, its year n" and a gap's weeks "between {A} and {B}: n
>    years after {A}", drawing nothing live there — the earlier campaign's sways and marks in history alone),
>    else at the first advance the map observes, and the scrub declares every gap
*Current text* (b):
>    from it only where a dated fact moved the use — never a burst of fields at week one; a campaign with neither reads⏎   the tier medians below.
*New text* (b):
>    from it only where a dated fact moved the use — never a burst of fields at week one; a campaign with neither reads
>    the tier medians below. **A sequel's baseline** (J399 (R1); T-V13-121): the binding of the next campaign
>    (`bindCampaign`, V13 §3.11.6) is a dated fact and folds a plate at the new campaign's `fromWeek` — the earlier
>    campaign's last plate carried forward by the fold's own law over the dated series: the seats the new campaign does
>    not re-bind withdrawn from the earlier campaign's `toWeek` (the close is their withdrawal week, so their fields enter
>    the biome's succession over the gap), its re-bound seats held at its last demand, every disturbance recovering over
>    the gap's weeks (`gapWeeks` of campaign time and nothing geological: no raster, landform or surface moves at a
>    binding) —, and that plate is the new campaign's BASELINE until its first fold, the birth fold above at its birth
>    window, which re-reads the use from its own populations; no fold reads a plate's classes (T-V13-62): the baseline is a
>    fold over the dated series — the earlier campaign's windows and demand counts, its events and disturbances, the
>    close and the binding — as every plate is, and the earlier campaign's this-happened disturbances stand as ground:
>    they shaped it, and the ground they shaped is what the new campaign is born on.
*Evidence:* docs/PROGRESS.md J399 (R1) ("an earlier campaign's this-happened disturbances stand as ground (they shaped it) and its last cover plate is the new campaign's baseline until its first fold"; "the history surfaces … show the earlier campaigns' plates read-only, labelled"); V13 §5.8 (8) as file v item 1101 leaves it (plate 0 at the birth window; a host rewind drops every plate after the rewound window; a pinned plate is never compacted) and (9) as file v item 1102 leaves it (the birth fold); V13 §3.6 (5) (the fold a pure function over dated facts; the withdrawal dated by the plates' demand counts, J397 (M26)); V13 §2.6's `LensPlate` and `CoverPlate` rows; T-V13-62 (no fold reads a plate's classes); item 1262 (c); experience read 03 §2.2 ("fallow for decades with no dated event" — the gap dates the withdrawal).


### Volume 13 — §6 Performance budgets (`WORLD-24`: the world scene)

**1269.** **`WORLD-24` budgets the world scene's export.**
*Requests:* J399 (R3); item 1266; T-V13-123.
*Current text:*
> dirty box at the rung (`WORLD-13`'s cell), cached per (plate, court) and evicted with the plate. Each has its T-V13 row⏎in §7.
*New text:*
> dirty box at the rung (`WORLD-13`'s cell), cached per (plate, court) and evicted with the plate; and `WORLD-24` the world
> scene (J399 (R3); V13 §5.4): one scene of ≤ 8 192 px a side at the realm rung for one audience ≤ 6 s on the export
> worker from cached tiles at the stop (the composition and the image's encoding; + `WORLD-8`'s tile law × the tiles
> where they must render first), a continent at stop 3 its grid of scenes at ≤ 6 s each, the notes ≤ 50 ms per hundred
> glyphs and the DM's reason sentences ≤ 1 ms each (`reasonOf`'s rendered chain, cached per (digest, subject)), the two
> files of one scene ≤ 64 MB together (the image ≤ 48 MB; T-V13-123); PLAUSIBLE until measured at M-W6 (the scene
> export lands with the exports' rows). Each has its T-V13 row
> in §7.
*Evidence:* docs/PROGRESS.md J399 (R3); V13 §6 as file w item 1178 and file y leave it (`WORLD-21` – `WORLD-23`; `WORLD-8`'s tile law); the base §11.1 (the 8 192 px cap; the grid of scenes); V13 §5.4 as item 1266 leaves it.


### Volume 13 — §7.4 Editing, view, exports, budgets (T-V13-120 – T-V13-127, after T-V13-119)

**1270.** **The tests: the next campaign on one world, the sequel's baseline, the party pin, the world scene, weeks not days, players view-only; one writer of the party's place; the observer and the news delay on the host's whereabouts.**
*Requests:* J399 (R1), (R3), (R4), (R5), (R6); J400 (7) (T-V13-120's undo clause), (9), (10) (T-V13-122 and T-V13-123 revised; T-V13-126, T-V13-127 added); items 1259, 1262, 1263, 1266, 1267, 1268, 1294.
*Current text:*
> a DM-only row (a covert link, an exclave of a covert power, a suppressed creed, an alignment row) or a truth outside the court's reach appear; a court audience on a world with no host is refused as a court viewpoint is (`W_ATLAS_COURT_UNSENT`'s family, the public record drawn) | the believed fixture; the court-audience harness |
*New text:*
> a DM-only row (a covert link, an exclave of a covert power, a suppressed creed, an alignment row) or a truth outside the court's reach appear; a court audience on a world with no host is refused as a court viewpoint is (`W_ATLAS_COURT_UNSENT`'s family, the public record drawn) | the believed fixture; the court-audience harness |
> | T-V13-120 | **the next campaign on the same world** (J399 (R1); H47; V13 §2.2's `CampaignRecord`, §3.11.6's `bindCampaign`): on B-POLITY run to week 300 as campaign A, closed by a `bindCampaign` of campaign B naming A in `closes` with `gapYears` 2: B's record reads `fromWeek` 404 and A's `toWeek` 300; every A-era record (its windows, events, revisions, disturbances, plates, canon versions) is byte-unchanged (the records digest's A-era leaves equal before and after); a `lensWindow` of B at its week 5 folds at world week 409 and B's `polity` window at seq 0 folds at 404; `renderAt(world, 409, 'dm')` draws B's sway from its genesis facts and `renderAt(world, 250, 'dm')` A's revision in force then, its date label "before this campaign: A, its year 5"; a week of the gap reads "between A and B: 1 year after A"; a window replace of B drops no plate below 404 and A's last plate is pinned; a `bindCampaign` of C while B is open and not named in `closes` is refused `refuse.world.campaignLive`; a DM `disturb` dated 250 is refused `refuse.world.campaignClosed`; B's settlement whose `stoodAs` is A's seat key re-binds to that placement (its `hostKey` B's, `hostLocked` false until B's first advance, then true) and B's other settlement is placed by the best form; the canon B requests at its first advance names B and its causes are B's, and an undo of B's first advance revokes `canonized` and the re-bound seat's `hostLocked` reads false again (J400 (7)); and a world of one campaign (`fromWeek` 0) folds, draws and exports byte-identically to the same fixture before this item | B-POLITY extended with a second campaign and a 2-year gap; the mock host |
> | T-V13-121 | **the sequel's baseline is a fold of dated facts** (J399 (R1); V13 §5.8 (9); T-V13-62): on the same fixture with A's fields at week 300 and a burn scar stamped at 280, the binding's plate at 404 shows the scar at its recovery row's stage for 124 weeks, the fields of A's seat that B did not re-bind in the biome's succession from 300 (their withdrawal week the close, read from the series: the plate's `eventWeek` 300), the re-bound seat's fields at A's last demand count, and nothing of the rasters, landforms or surfaces moved (the model digest unmoved by the binding); B's birth fold at 404 re-reads the use from B's populations and differs from the baseline only where a count differs; the cover cache dropped and rebuilt at 404 is byte-equal to the plate; T-V13-62's lint finds no read of a plate's classes in the fold | the same fixture; the cover harness |
> | T-V13-122 | **the party pin** (J399 (R4); J400 (9); V13 §2.2's `PartyPlacement`, §4.1's `setPartyPin`, §5.8 (7)): on B-POLITY as a STANDALONE world, three placements at weeks 10, 11 and 12 — a seat, a point in the wild 40 km from it, a road at its fraction —: the latest is the party's current place; the party's known set (`RenderedWorld.known` for `party:<key>`) gains exactly the three placements' coarse cells and the seat's place and no cell between them; no layer, card, scene or export draws a line, arrow, path, ETA or day count between any two (a lint over the `partyPin` layer's display list, the pin's card strings and the scene's notes: no `path`, no `eta`, no "day"); the party's picture has no observer and no news delay (no host: the public truth at its week); a `dmOnly` placement appears on no party picture or scene; a placement dated 13 at document week 12 is refused `refuse.world.pinDate`; a viewer-role `setPartyPin` is refused `refuse.viewer`; the placements sit in the records digest and move no model digest, canon or map feed | B-POLITY standalone; the party-key harness |
> | T-V13-123 | **the world page as a VTT scene** (J399 (R3); V13 §5.4; BCR-V13-56; `WORLD-24`): the golden realm exported at stop 1 for the DM and for the party writes, through `sceneSet`, one image and one JSON per scene in both formats; each image is pixel-equal to `renderAt`'s tiles at the stop composed for that audience (the party's with no DM-only mark, covert row, secret site or `dmOnly` placement — a byte search over the image's source list and the notes finds none); `line_of_sight`, `objects_line_of_sight`, `portals` and `lights` are empty and `environment.baked_lighting` true; the grid's cell is an integer pixel count, `plat.grid.kmPerCell` the chosen value and the Foundry scene's grid type 1, a hex type or 0 as chosen, and no field of either file names a time finer than a week (T-V13-124's lint over the scene); the DM's notes carry names and reason sentences, the party's names alone, and the party's current public place (the `partyPin` layer's) is a note on both, a pending placement on the DM's alone; a continent at stop 3 writes a grid of scenes aligned to cells with the overview; the files' sizes and times inside `WORLD-24` | the golden realm and continent; the export harness |
> | T-V13-124 | **weeks, not days — the lint** (J399 (R5); V13 §1.3's law; §3.11.6's law (11)): every time-typed field of V13 §2.2's records, of the port's messages in both directions and of the exports' schemas is a `Week` or a count of weeks — the lint over the declarations admits no day, hour or finer date, `TravelLaw.daysPerWeek` (a divisor) alone excepted —; no lens row, lane, arrival, onset, hop, plate or route label states a day or an hour; `derivedTime`'s label reads its law and "on foot" and never a day; a host week folds to the world clock by the live campaign's `fromWeek` and back once; the world scene's `plat` carries the week's label and the season alone; the climate's months and the sail efforts by month reach no record as a time | the schema lint over `@plat/world` and `@plat/port`; the golden exports |
> | T-V13-125 | **players are view-only** (J399 (R6); V13 §1.3's law): under a viewer-role session every edit kind of §4.1 on a world, of V14 §4.2 on a site and of V15 §4.1 on an atlas is refused `refuse.viewer` with nothing computed (no list, no count, no shape); the party key (V14 §2.3) and the party pin are written only under the owner or editor role; no export of any audience carries a layer, note or object a viewer wrote (the writers of every export are the DM's edits and the host's inputs: a lint over the exporters' inputs); no player annotation layer is registered on any document kind (a lint over the layer registries of the world, the site and the atlas) | the role harness over the three document kinds; the registry lint |
> | T-V13-126 | **one writer of the party's place on a host-bound world** (J400 (9); V13 §2.2's `PartyPlacement.present`, §3.11.6's `requestPartyPresent`, §5.1's `partyPin` row): on B-POLITY bound to the mock host sending the party's whereabouts (`partySeats` [Kessar], `partySource` `lastHeard`, `partyStamp` 8) at document week 12: (i) the DM's pin dropped at the host-bound seat Thornhold sends exactly one `requestPartyPresent(world, [Thornhold], 12)` with provenance `user`, writes the placement's `present`, raises `W_PARTY_PENDING` and draws a hollow pending glyph on the DM's picture alone — the party's picture still reads "last heard at Kessar, week 8" —; the mock host's next window carrying [Thornhold] as `presentAt` clears the warning and draws "the party is at Thornhold" on both pictures, the records digest byte-equal across that fold (the state derived, never written); (ii) a pin dropped at Aldmere whose next window names [Kessar] is superseded: the glyph at Kessar, the warning cleared, the placement kept in the list; (iii) a pin at Thornhold made an act at a pair with Aldmere (**Between this and…**) sends [Thornhold, Aldmere] and, carried, draws the glyph at both seats captioned "between Thornhold and Aldmere" with no stroke between them (a pixel search over the layer); (iv) a pin dropped in the wild at week 13 sends nothing (the mock host's inbox unchanged), draws "where the game master narrates them, week 13" while the host's `partyStamp` is earlier and adds its cell to the party's known set, and a later window stamped 14 at Kessar draws the party at Kessar; (v) the map's undo of a pending placement clears its mark and sends nothing; (vi) under a mock host whose manifest lists no whereabouts no placement sends a request and every placement draws as the DM's picture; (vii) no code path but the fold of a user's `setPartyPin` `place` calls `requestPartyPresent` (a lint over `@plat/world` and `@plat/port/world`) and no lens window writes a `PartyPlacement` | B-POLITY with the mock host's party whereabouts; the party-key harness; the port lint |
> | T-V13-127 | **the observer and the news delay read the host's whereabouts alone** (J400 (9), (10); V13 §5.8 (7); H39): on the belief fixture under the mock host — `partySeats` [Emberford] gives the party's set as Emberford's court's believed record, its legend "as Emberford's court believes it"; a pair [Emberford, Kessar] with `partyHome` Aldmere gives Aldmere's court's (a pair failing closed to the home seat); a pair with no `partyHome` gives none, the public truth or nothing; no `partySeats` and `partyHome` Aldmere gives Aldmere's; neither gives none —, and in every case the DM's party pin dropped anywhere changes no observer and the mock host receives no request for a court's believed facts; on the omniscient fixture a public row of a seat S at week w draws on the party's picture at w + floor(hops × factor), the hops the canon's to the NEARER seat of a pair `partySeats` names, at once for a row of either seat, and with no `partySeats` sent at w (the delay not applied, the legend saying so), wherever the pin stands | the belief and omniscient fixtures; the mock host |
*Evidence:* docs/PROGRESS.md J399 (R1), (R3), (R4), (R5), (R6); J400 (7), (9), (10); research/sf/host-reply-2026-10-24.md S3 (c) (the undo of the first advance revokes `canonized`) and S5; V13 §7.4 as file y item 1247 leaves it (T-V13-119 the last row); T-V13-62 (the cover fold's lint), T-V13-73 (the account fixtures), T-V13-74 (the birth window); items 1259, 1262, 1263, 1266, 1267, 1268; the base §7.1's `refuse.viewer`; V14 §2.3; V15 §4.1.


### Volume 13 — §7.5 The report codes (`W_PARTY_PENDING` after `W_DOSSIER_PENDING`)

**1295.** **The party placement sent to the host as the DM's present-at act is a pending warning until the host's next window.**
*Requests:* J400 (9); items 1259 (b), 1263 (a), (b), 1294 (b).
*Current text:*
> | `W_DOSSIER_PENDING` | warning | `decide` with `updateDossier`, until the host's `dossierUpdated` | the settlement, the field, the kind, the request |
*New text:*
> | `W_DOSSIER_PENDING` | warning | `decide` with `updateDossier`, until the host's `dossierUpdated` | the settlement, the field, the kind, the request |
> | `W_PARTY_PENDING` | warning | `setPartyPin` with a `place` at a host-bound settlement or pair on a world whose host sends the party's whereabouts (`requestPartyPresent`, V13 §3.11.6; J400 (9)), until the host's next lens window carries or supersedes it | the placement, the seats sent, its week; `wait`, `withdraw` (the placement removed) |
*Evidence:* docs/PROGRESS.md J400 (9) ("drawn pending until the host's next row carries it"); V13 §7.5 as it stands (`W_DOSSIER_PENDING`'s row, the precedent: a request the host carries out, pending until its answer); V13 §4.1 as item 1263 (b) leaves it; V13 §3.11.6 as item 1294 (b) leaves it.


### Volume 13 — §8.5 The host's parallel track (H22's clause; H35's clause; H39 rewritten; H47 after H46)

**1271.** **H22 and H35 gain one clause each; H39 is rewritten in place to the host's answer — the party's place re-homed to the host's party unit; H47 is the host's binding of a next campaign to a world of this module.**
*Requests:* J399 (R1), (R2), (R4); J400 (7) (fragments (a), (d)), (9), (10) (fragment (c), rewritten), (12) (fragment (b)); items 1262, 1267, 1294; V15 §3.4 (item 1277).
*Current text* (a):
> the canon is outside door 1, so new campaigns are born canonized as J386 and J388 rule once H5, H7, H8 and H12 land, no question gating it; **first visible:**
*New text* (a):
> the canon is outside door 1, so new campaigns are born canonized as J386 and J388 rule once H5, H7, H8 and H12 land, no question gating it; a NEXT campaign bound to a world of this module by H47 is so born too — its canon taken fresh at ITS first advance over the seats as they then stand, the re-bound seats among them (`Placement.hostLocked` cleared at the binding and set again at that advance: the grace rule holds per campaign), the earlier campaign's canon versions kept read-only in its `CampaignRecord` (J399 (R1); V13 §3.11.6) — the spatial birth canon alone, the host's own realm canonize of that campaign staying before its first advance as the first campaign's does, and an undo of that first advance un-adopting the canon, re-opening the re-keyed lock and revoking `canonized` (the re-bound seats drag free again; J400 (7)); **first visible:**
*Current text* (b):
> a continuation in host mode refused, `refuse.atlas.hostWorld`) | M-ATLAS-A; H4; H10 |
*New text* (b):
> a continuation in host mode refused, `refuse.atlas.hostWorld`); and, with the carve (J399 (R2); V13 §3.1 (8); V15 §3.4), each carved member owned by the campaign whose settlements it holds — one world record per campaign from one generation, each bound as the include run's world is, the host sending one `campaignFacts` per campaign for the run (until this lands a carve in host mode is refused as a continuation is, `refuse.atlas.hostWorld`) — built, as the row is, inside the host's unit that owns a campaign's world records (one unit, one writer), accepted and not scheduled, and reading nothing of any member's map feed (J400 (12): the host has no reader of the map feed) | M-ATLAS-A; H4; H10 |
*Current text* (c):
> | H39 | with M-W5, where it records belief | **the party observer** (J397 (M8)): the host resolves the party's observer — the court of the settlement the party stands at, else the party's home seat (a campaign fact the DM names, `CampaignFacts.homeSeat`), else none — and names it (`LensFacts.observer`); sends the party's seat each advance (`LensFacts.partySeat`); sends every believed row with its update week and confidence band (`Believed`); **first visible:** within one advance where belief is recorded — a believed mark with its age; **felt:** "the players' map believes what their town believes, and says how old the news is"; **spreads:** UNMEASURED | H23 |
*New text* (c):
> | H39 | with M-W5, where it records belief; inside the host's party unit (its party record and its whereabouts of the party) and its one projection of the presentation rows | **the party's place and the party observer** (J397 (M8); J400 (9); the host's answer: accepted, not scheduled): the party's place is the host's — its party record's whereabouts of the party (the DM's present-at in the host, else the last heard), sent on its presentation rows as `LensFacts.partySeats` (one seat, or two for an act at a pair) with its source (`partySource`: present-at or last heard) and its stamp (`partyStamp`), never as a second party record; the party's home seat a field of the host's party record the DM sets (`LensFacts.partyHome`), asked of the host at its party unit; the map's `requestPartyPresent(world, seats, week)` — sent only when the DM drops the party pin at a settlement or between two (V13 §3.11.6): the DM's own present-at act through the port, never the map's — carried out by the host's own writer as the DM's present-at, its next presentation row carrying those seats: the host is the one writer of the party's place on a host-bound world (a row naming other seats moves the map's pin to them; a pin off every settlement is the map's own picture and reaches the host by nothing); the host resolves the party's observer by the observer rule as written — the court of the party's settlement where its whereabouts name one, else the home seat's, else none — and names it (`LensFacts.observer`), the observer of a pair asked of its party unit (until it rules, the map reads the home seat's court for a pair, failing closed); sends every believed row with its update week and confidence band (`Believed`: `asOfWeek` and the quarter band), as written; all of it read through the host's one projection of its ledgers and never by an engine stage of the host; **first visible:** within one advance where belief is recorded — a believed mark with its age; **felt:** "the players' map believes what their town believes, and says how old the news is"; **spreads:** UNMEASURED | H23 |
*Current text* (d):
> returns the blocks to the band when they arrive home, never at the recall; **first visible:** the polity window after a dispatch (one advance) — the vassal's border softens; **felt:** "when Aldmere sent its levy to Thornhold's war, its own border went soft on the map"; **spreads:** UNMEASURED | H13; its war-contribution design |
*New text* (d):
> returns the blocks to the band when they arrive home, never at the recall; **first visible:** the polity window after a dispatch (one advance) — the vassal's border softens; **felt:** "when Aldmere sent its levy to Thornhold's war, its own border went soft on the map"; **spreads:** UNMEASURED | H13; its war-contribution design |
> | H47 | with M-W6 (the include run) and H22's birth canon | **the next campaign on this world** (J399 (R1); V13 §2.2's `CampaignRecord`, §3.11.6's `bindCampaign`): its realm maker and its campaign assembler both admit **"on this world"** — a world document of this module an earlier campaign of the account used, chosen by the map page's **Next campaign here** (V09 §4.22 (11)) or in the host's own flow — and bind the new campaign by `bindCampaign(world, { campaign; name; gapYears; closes })` with the DM's declared gap (years between, default none) and the live campaign it succeeds (closed at its last window; the host's own record of the earlier campaign read-only beside, never deleted with the new one), then send the new campaign's birth window (H37) and its `campaignFacts` with each saved settlement's `stoodAs` key where the same saved settlement stood on this world under an earlier campaign (the include run re-binds it to that seat; a settlement with none is placed as an addition by the best form, H31) and the instant world's plan members as additions; its spatial birth canon taken fresh at the new campaign's first advance over the seats as they then stand (H22's clause, the grace rule per campaign: the host's realm canonize of the new campaign before that advance, an undo of that advance revoking `canonized`, J400 (7)); a world is never bound to two live campaigns (`refuse.world.campaignLive`: the host names the campaign it closes, or closes it first by `closeCampaign`); every week it sends is its own campaign's and the map translates it once (law (11)); **first visible:** at the binding — the world page opens on the earlier campaign's last picture labelled "before this campaign: {name}, its year n", and at the birth window the new campaign's banners, sway and fields; **felt:** "my new campaign starts on the land my last one shaped: the burned forest is still regrowing, and the border I lost is the border they inherit"; **spreads:** UNMEASURED | H22; H31; H37 |
*Evidence:* docs/PROGRESS.md J399 (R1), (R2), (R4); J400 (7) (the grace rule as the host takes it), (9) (the party's place is the host's; one writer), (10) (the court viewpoint held), (12) (no host reader of the map feed); research/sf/host-reply-2026-10-24.md S3 (a)–(c), S5 ("RE-HOMED to THE PARTY (PT, chain C13)"; "As written: the observer rule … and the believed rows with `asOfWeek` and the quarter confidence band. They are read through LAW ONE and WY's one projection, and never by an engine stage"), S7 (`MAP_FEED_READERS` starts EMPTY) and "Five rules" (1), (2) (one unit, one writer; accepted is not scheduled); research/sf/host-rulings-mirror.md §1 and §2 (the grace rule; the party's place; readers of the map feed); V13 §8.5 as files u, v, w and y leave it (H22 with file u item 1061 and file v item 1113; H35 with file u item 1062; H39 file v item 1115; H46 file w item 1183; the preamble's row form with its first-visible line, felt sentence and spreads, J397 (M3)); V13 §3.11.6 as item 1262 leaves it; V13 §5.8 (7) as item 1267 leaves it; V15 §3.4 (7) (which campaign owns a world made from an atlas — H35); experience read 01 §4 Q5 (the grace window), §2.3 (the two clocks); experience read 05 §2.3 (a party crossing worlds).


### Volume 13 — §9 Decisions (J-V13.191 – J-V13.199, after J-V13.190)

**1272.** **The decisions of the campaigns pass.**
*Requests:* J399 (R1)–(R6); J400 (7) (J-V13.193's clause), (9), (10) (J-V13.196 revised; J-V13.198, J-V13.199 added).
*Current text:*
> e the atlas takes one reading of a member (the spine's §14 (2), (4)) and a court's picture is that reading under another admission, not another product — and because a court viewpoint drawn from the public record would show the enemy's geography and none of its mind, which was the read's whole finding (experience read 05 §1.3) |
*New text:*
> e the atlas takes one reading of a member (the spine's §14 (2), (4)) and a court's picture is that reading under another admission, not another product — and because a court viewpoint drawn from the public record would show the enemy's geography and none of its mind, which was the read's whole finding (experience read 05 §1.3) |
> | J-V13.191 | chose **one world clock with a `CampaignRecord` per campaign** — every record of a world dated on one week axis, the host's week of the live campaign translated once at the port's fold by the record's `fromWeek`, every earlier campaign's records standing where they are under its name and clock, the history labels computed from the records (J399 (R1); file z items 1259, 1262) — over a week axis per campaign with every reader translating, and over a new world document per sequel, because one translation at one door keeps every reader of this volume (the scrub, the fold, `worldFactsAt`, the events index, the sway's revisions) exactly as it is, a world of one campaign changes by nothing (`fromWeek` 0), and the owner's "sequentially" asks for the same land carrying its history — a new document would carry the ground and lose the history that the history surfaces must show read-only |
> | J-V13.192 | chose **the gap as campaign time only — the cover's recovery and succession over it, the unbound seats withdrawn at the close, the re-bound seats held, nothing geological — and the binding itself a dated fact that folds the sequel's baseline plate** (J399 (R1); file z items 1262 (c), 1268) over a gap that runs the weather depth, over no gap, and over a baseline read from the earlier campaign's last plate's classes, because the DM's "years between" is lived time and the formation op and the living physics are law re-derived from data (geological time is the physics pass's `weather` depth, the DM's own act), because a pure function over dated facts (T-V13-62) needs the close and the binding as dated facts and nothing else, and because J399's "last cover plate as the baseline" is then exactly what the fold gives at `fromWeek` — the same plate, carried by the law and never copied |
> | J-V13.193 | chose **the grace rule per campaign** — a re-bound seat drags free from the binding to the new campaign's first advance, its `hostLocked` cleared at the binding — (J399 (R1); file z items 1262 (b), 1271 (a)) over keeping an earlier campaign's seats locked, because the host's t=0 promise is per campaign (H38) and the earlier campaign's records are keyed by week and point, moved by no placement, so a nudge before the first week runs rewrites no history (vetoable: the manager may keep re-bound seats locked, which costs the DM the promise and the map nothing); per the host's own taking of the grace rule (J400 (7)) it is the spatial birth canon alone that waits for the first advance — the host's realm canonize stays before it — and an undo of that advance revokes `canonized` and frees the re-bound seats again |
> | J-V13.194 | chose **the carve as a guillotine partition on coarse grid lines with `carve` requirements the solver makes wild and W8 verifies by the reach cap, each member a derived child of the grown world at its own rung with byte-equal cut charters, and the grown world a transient** (J399 (R2); file z items 1259 (a), (d), 1261; V15 §3.4) over free-form region boundaries, over one shared document holding several campaigns, and over keeping the grown world as a member, because atlas members are axis-aligned rectangles whose seams are straight edges (V15 §3.1, §3.4) and a continuation born whole needs a charter per straight side; because F14 and the microcosm rule hold only if each campaign's world is its own document on its own clock (one document for two tables would make every edit of one DM's the other's); because the derived-child form, the edge charter and the solver's requirement records already exist and the carve adds one requirement kind and one copy; and because a kept whole would be a third document whose edits reach no table and whose storage is every member's again |
> | J-V13.195 | chose **the world scene as `renderAt`'s picture at a stop with a presentation grid, the glyphs and sites as notes, no walls and no lights, written through V14's shared `sceneSet`** (J399 (R3); file z items 1266, 1288) over a bespoke world exporter, over a token-scale grid (a world cell is kilometres, never 1.5 m), and over walls from coasts or ranges, because the owner's "World map should also be VTT" asks for the map on the table and the atlas already proved one reading per member is the picture (J394), because a cell on a world scene can carry no travel time (R5: the hop weeks are the routes' labels, and a grid that priced a move would be a journey tool by another name), and because one writer of the multi-scene convention (one image and one JSON per scene, the `plat` object, the Foundry scene's `Level` per scene) keeps three callers byte-compatible |
> | J-V13.196 | chose **the party pin as a dated list of placements — never a path — read by the known set and the `partyPin` layer** (J399 (R4); J400 (9); file z items 1259 (b), (g), 1263, 1264, 1267) over a journey tool and over a view key, because the owner's party "can teleport fly etc outside if the road or circumvent it" — a journey the map computed would be wrong whenever it mattered —, and because the pin is a dated DM fact the history view and the known set read (a view key would be neither logged nor dated); on a host-bound world the party's place is the host's and the pin's two kinds are J-V13.198's, and the observer and the news delay read the host's whereabouts alone (J-V13.199) |
> | J-V13.197 | chose **the two laws recorded once in §1.3 with a lint-style test each** — weeks not days (T-V13-124), players view-only (T-V13-125) — and the port's law (11) for the seam (J399 (R5), (R6); file z items 1257, 1262 (e), 1270) over restating them at every mechanism, because both were already true of every record and surface of this volume (READ AS AND FOUND (2), (4)) and a law a lint holds is kept where a sentence repeated is forgotten; the hour, the weather and the day's march are the DM's narration and the climate's months, the sail efforts, the lights' no-hour and a scene's grid stay presentation |
> | J-V13.198 | chose **one writer of the party's place on a host-bound world — the host's whereabouts of the party (`LensFacts.partySeats` with its source and stamp; the home seat `partyHome`, a field of the host's party record), the DM's pin dropped at a host-bound settlement or pair sent as the DM's own present-at act (`requestPartyPresent`) and drawn pending (`W_PARTY_PENDING`) until the host's next window carries or supersedes it, a pin off every host-bound settlement a map-only picture feeding only the map's known set, and the pin the party's only writer on a standalone world** (J400 (9); file z items 1259 (b), (c), (g), 1263, 1264, 1294, 1295) over the pin and the host's seat as two writers composed by precedence (J399 (R4)'s first reading: "the host's seat wins when sent"), over the map writing the host's party record, and over a pin that cannot reach the host at all, because the host builds every fact inside the one unit that owns it and its party unit's law is that the engine never writes the present-at — only the DM does —, so the DM's drop at a town is that act, carried by the port as the dossier request carries the user's approval (J-V13.121), never a second record of the party; because a pending mark until the host's answer is that request's proven form; because a pin in the wild names no settlement the host could hold, so it stays the DM's picture; and because the pending state is derived at read from the plates, a presentation input writing nothing (T-V13-7) (vetoable) |
> | J-V13.199 | chose **the observer and the default-preset news delay on the host's whereabouts alone — one seat its court; a pair the home seat's court until the host's party unit rules a pair's observer, failing closed; none the home seat's court, else none; the delay to the nearest seat of `partySeats` and not applied where none is sent — with file z's fallbacks from the pin removed (the pin's court asked through the court-facts request; the delay from the seat whose territory holds the pin)** (J400 (9), (10); file z items 1259 (h), 1267, 1271 (c)) over keeping the pin as the fallback, because the host holds the court viewpoint — its projection carries the DM's truth and the party's believed rows and no court's view — so the court-facts rows stay absent and that fallback would read nothing; because a delay measured toward a picture the host never reads would price news toward a place the host does not hold; and because a pair's observer is the host's to rule and the map's to wait for (vetoable) |
*Evidence:* docs/PROGRESS.md J399 (R1)–(R6); J400 (7), (9), (10); research/sf/host-reply-2026-10-24.md S3, S5 and "Five rules" (1); research/sf/host-rulings-mirror.md §1, §2; V13 §9 as file y item 1247 leaves it (J-V13.190 the last row); J-V13.121 (the dossier request); items 1257–1271; V13 §3.6 (5), §3.9 (1)–(4), (7), §3.11.4, §3.17, §4.1, §5.4, §5.8 (5), (7)–(9), §8.5 (H38, H39); V15 §3.1, §3.4, §4.7; J394 (the atlas picture is the member's default picture); experience read 05 §1.1, §2.3, §4 Q11; experience read 01 §4 Q5, Q6.


### Volume 13 — §10 Base change requests (BCR-V13-56, BCR-V13-57 after BCR-V13-55) and §10.3 Requests to V15 (R-V15-5)

**1273.** **The base's VTT profile and `ExportOpts` at the world rungs; the edit union's three kinds, the outcome keys, the `carve` requirement kind and the party's present-at request; V15 supplies the carve's record and reads the pin through `renderAt`.**
*Requests:* J399 (R1)–(R4); J400 (9) (BCR-V13-57 of (a), revised); items 1261, 1263, 1266, 1293 (the base); V15 §3.4, §4.1 (items 1277, 1279).
*Current text* (a):
> closed union, the shipped and example rows of V13 §2.3 and §3.6 the first rows of each family.
*New text* (a):
> closed union, the shipped and example rows of V13 §2.3 and §3.6 the first rows of each family.
>
> **BCR-V13-56 — §11.1 Formats (the VTT row), *The `.dd2vtt` profile* (*Scope*) and §11.2 `ExportOpts.vtt`: the profile
> at the world rungs and the atlas.** (J399 (R3); J-V13.195; file z items 1266, 1293; V15's BCR-V15-19 and V14's
> BCR-V14-27 beside it.) The formats table's VTT row admits, beside the settlement's scene sets, one scene per world page
> at a zoom stop and per atlas view at a level (V13 §5.4; V15 §5.5) — the picture as the scene's background image, the
> DM's grid in kilometres per cell as presentation only, the glyphs and sites as notes, no walls and no lights —; the
> profile's *Scope* bullet admits that scope; `ExportOpts.vtt` gains `world?: { stop: 0|1|2|3; audience: 'dm'|'party'|'public';
> grid: { kind: 'square'|'hex'; kmPerCell: number } | 'none'; notes?: boolean }` and `atlas?: { level: number; audience:
> 'dm'|'party'|'public'; grid: { kind: 'square'|'hex'; kmPerCell: number } | 'none'; notes?: boolean }`, each written
> through the one shared writer of the multi-scene convention (`sceneSet`, V14 §5.3; BCR-V14-27); so that the world map
> the owner asked for on the table is one more scene of the profile and never a second format (file z item 1293 states
> the base's exact text).
>
> **BCR-V13-57 — §7.1 `EditEvent` and its outcome table; the solver's requirement kinds; §7.7's world port paragraph and
> §11.4 Host inputs: the party pin, the campaign bindings, the carve, the party's present-at request.** (J399 (R1), (R2),
> (R4); J400 (9); J-V13.194, J-V13.196, J-V13.198; file z items 1259, 1261, 1263, 1294, 1295.) The edit union
> gains `setPartyPin` (the DM; `place` and `remove`), `bindCampaign` and `closeCampaign` (author `host`, recorded inputs)
> with their lifecycle rows (V13 §2.6) and undo (V13 §4.4: the pin's placement removed or restored; a host input never a
> user's undo target, the world's undo cut at the live campaign's `fromWeek`); the outcome keys `refuse.world.campaignLive`,
> `refuse.world.campaignClosed` and `refuse.world.pinDate`, the warnings `W_CARVE_REACH` (`acceptOffer` with `largerWorld`,
> `keep`) and `W_PARTY_PENDING` (`wait`, `withdraw`) and the viewer-role refusal `refuse.viewer` applied to `setPartyPin`; the per-viewer view key `showPinHistory`
> (DM-only, default false) beside the world's keys in §2.9's view-state list (BCR-V13-5's sentence); `Requirement.kind` gains `carve` and
> `WorldRequest.include` the several-campaigns form (V13 §3.1 (1), (5)); §7.7's world port paragraph and §11.4 gain the
> outbound `requestPartyPresent(world, seats, week)` — the DM's present-at act, logged with provenance `user`, which the
> host carries out by its own writer and answers on its next presentation row; never a write of the module, as
> `requestDossierUpdate` (BCR-V13-45) is not (V13 §3.11.6; J400 (9)); so that a world keeps its campaigns one after
> another, the party's position is the DM's dated mark and never a journey — on a host-bound world the host's, the one
> writer —, and one generation may be cut into one member per campaign.
*Current text* (b):
> sion digests alone (V15's `Member.header`, `MemberVersion`), at the member's version, through a read-only handle (V15 §1b.6) — never a raster, a record or a plate | V13 §1b.2, §5.4, §5.8 (10); §11.2 |
*New text* (b):
> sion digests alone (V15's `Member.header`, `MemberVersion`), at the member's version, through a read-only handle (V15 §1b.6) — never a raster, a record or a plate | V13 §1b.2, §5.4, §5.8 (10); §11.2 |
> | R-V15-5 | the carve's atlas side (J399 (R2); V15 §3.4, §4.1's `carve`, `CarveRecord`): the atlas drafts the request naming the campaigns and opens V09's world dialog with the include toggle naming them; V13's one run and its carve (V13 §3.1 (5), (8)) hand the members to the atlas's `addMember` with `origin: 'carved'`, each arranged at its region and locked, the two byte-equal charters of each cut recorded on the atlas; the atlas writes nothing into any member (T-V15-19) and reads the party pin only through `renderAt`'s known set (V15 §3.6 (4), §3.7; J399 (R4)) | V13 §3.1 (5), (8), §2.2 (`WorldRecipe.carve`, `RenderedWorld.known`) |
*Evidence:* docs/PROGRESS.md J399 (R1)–(R4); J400 (9); V13 §10's BCR-V13-45 (the dossier request in the base's §7.7 and §11.4, the precedent); V13 §10 as file w item 1188 leaves it (BCR-V13-55 the last request; the request paragraphs' form of BCR-V13-47, file u item 1064) and §10.3 as file r leaves it (R-V15-4 the last row); the base §11.1 (the formats table's VTT row; the profile's *Scope* bullet) and §11.2 (`ExportOpts.vtt`'s fields, BCR-V14-8); items 1259, 1261, 1263, 1266; V15 §3.4, §4.1 as items 1277 and 1279 leave them; V15's T-V15-19 (no reverse seam).


### Volume 13 — §11 Owner questions (the campaigns pass recorded as rulings)

**1274.** **The owner's five clarifications stand as rulings R1–R6.**
*Requests:* J399 (R1)–(R6); J400 (9) (the R4 sentence and the host's share, revised); item 1256.
*Current text:*
> the example rows' place in a shipped preset (off in the parity presets). Vetoable.
*New text:*
> the example rows' place in a shipped preset (off in the parity presets). Vetoable.
>
> **Ruled — the owner's five clarifications: campaigns, weeks, the world as a scene, view-only players, the party pin**
> (J399 (R1)–(R6); the owner, 2026-10-24: "Campaign is just a term we use for the region of the map. So it means multiple
> or sequentially. It should already account for all of this." · "the world operates in weeks not days, so anything
> regarding a specific time not in the realm of weeks is under the preview of the DM." · "World map should also be VTT."
> · "Players are view only." · "The party in the road is different because players can teleport fly etc outside if the
> road or circumvent it"; recorded here as rulings, not open questions; J-V13.191 – J-V13.197; file z item 1256; carried
> by amendments z). **(R1) The next campaign on the same world:** one live campaign at a time, every earlier campaign
> kept as the world's history under its name and clock (§2.2's `CampaignRecord`; the one world clock, §3.11.6's law
> (11)); "Next campaign here" binds the next through the port with the DM's declared gap (years between, default none),
> campaign time and nothing geological; the earlier campaign's disturbances stand as ground and its last cover plate is
> the baseline until the first fold (§5.8 (9)); the history surfaces show the earlier campaigns read-only, labelled
> "before this campaign: {name}, its year n" (§5.1, §5.2, §5.8 (8)); the canon fresh at the first advance (H22; H47);
> never two live campaigns (`refuse.world.campaignLive`). **(R2) Several campaigns carved at one generation:** the
> include toggle admits several, each its region; the carve along cuts through wild land, water or a range and never a
> seat's sway reach, one member per campaign holding the shared ground as its own, locked edge charters to its neighbours,
> the atlas holding them (§3.1 (5), (8); V15 §3.4); at generation only. **(R3) The world page and the world map as VTT
> scenes:** the base's profile extended to the world rungs and the atlas; the picture as the background, the DM's grid as
> presentation carrying no time, glyphs and sites as notes, no walls, no lights, the audience's picture, the date label
> and season in the `plat` object, one shared writer (§5.4; V15 §5.5; V14 §5.3; BCR-V13-56). **(R4) The party's
> position is the DM's pin:** a dated list of placements and never a path, read by the known set; travel times stay
> labels; no ETA, no day count (§2.2's `PartyPlacement`; §4.1; §5.1; §5.8 (7)); on a host-bound world under one writer
> (J400 (9); J-V13.198, J-V13.199): the party's place is the host's whereabouts (`LensFacts.partySeats`), the DM's pin
> at a settlement the DM's present-at request to the host (`requestPartyPresent`, pending until carried), a pin off
> every settlement the map's own picture, and the observer and the news delay read the host's whereabouts alone; on a
> standalone world the pin is the only writer. **(R5) Weeks, not days** and **(R6) players are view-only:** the two
> laws of §1.3, held by T-V13-124 and T-V13-125 and by the port's law (11). What stays the host's: the binding and the
> gap it sends (H47), the party's place — its whereabouts, the home seat, a pair's observer — and the present-at act
> the pin sends to it (H39), one `campaignFacts` per campaign for a carve (H35). Vetoable.
*Evidence:* docs/PROGRESS.md J399 (the owner's words verbatim; R1–R6); J400 (9); V13 §11 as file w item 1198 leaves it (the last "Ruled —" paragraph; the form of file u items 1065, 1066); items 1257–1273, 1294, 1295.


### Volume 15 — The head's state-note finding ("one world document per campaign") and §1.4 Out of scope (the one place a world's physics meets the atlas)

**1275.** **A world is one document per campaign AT A TIME, its earlier campaigns its history; the carve is the second place a generation meets the atlas.**
*Requests:* J399 (R1), (R2); V13 §2.2's `CampaignRecord` (item 1259); V13 §3.1 (8) (item 1261).
*Current text* (a):
> > settlement frame belongs to one world and the design stores one world document per campaign — membership of a world
*New text* (a):
> > settlement frame belongs to one world and the design stores one world document per campaign AT A TIME (a world binds
> > one live campaign and keeps every earlier campaign bound to it as its own history under that campaign's name and
> > clock, V13 §2.2's `CampaignRecord`; J399 (R1); the microcosm rule between members unchanged, V15 §4.7) — membership of a world
*Current text* (b):
>   a picture. The one place a world's physics meets the atlas is a continuation at that world's generation (V15 §3.4),⏎  and there the atlas only carries V13's edge charters to V13's generator.
*New text* (b):
>   a picture. The one place a world's physics meets the atlas is a generation — a continuation into a void beside
>   members at that world's generation (V15 §3.4), or the carve of one world grown for several campaigns into one member
>   per campaign at theirs (V15 §3.4; J399 (R2)) —, and there the atlas only carries V13's edge charters to V13's
>   generator, or asks V13 for the one run and records the members V13 hands back; after either, nothing crosses (F14).
*Evidence:* docs/PROGRESS.md J399 (R1) (READ AS AND FOUND (1): "one world document per campaign: V13 §3.11.6, V15's note"), (R2); V15's head note (the state note's finding as the volume quotes it) and §1.4's first bullet as they stand; V13 §2.2's `CampaignRecord` (item 1259 (b)); V13 §3.1 (8) (item 1261 (c)); V15 §4.7 (1).


### Volume 15 — §2.2 New records (`MemberOrigin` and `Arrangement.by` gain the carve; `Member.carvedFrom`; `CarveRecord` after `FitRecord`)

**1276.** **The atlas records a carve: the members' origin, their provenance and the request record.**
*Requests:* J399 (R2); items 1261, 1277, 1279.
*Current text* (a):
> type MemberOrigin = 'placed'|'continued'|'derived'|'fitted';
*New text* (a):
> type MemberOrigin = 'placed'|'continued'|'derived'|'fitted'|'carved' /* `carved`: one member of a world grown for several campaigns and cut at generation (J399 (R2); V15 §3.4) */;
*Current text* (b):
>   origin: MemberOrigin; continuedFrom?: { request: Id; charters: { neighbour: Id; side: 'N'|'E'|'S'|'W'; charter: Id /* the carried WorldEdgeCharter's id in this atlas's records */; neighbourVersion: MemberVersion }[] } /* the atlas's side of a continuation's provenance; the world stores its own copy (spine §10.4) */;
*New text* (b):
>   origin: MemberOrigin; continuedFrom?: { request: Id; charters: { neighbour: Id; side: 'N'|'E'|'S'|'W'; charter: Id /* the carried WorldEdgeCharter's id in this atlas's records */; neighbourVersion: MemberVersion }[] } /* the atlas's side of a continuation's provenance; the world stores its own copy (spine §10.4) */;
>   carvedFrom?: { request: Id /* the `CarveRecord` */; campaign: string /* the campaign this member was grown for and is bound to */; cuts: { side: 'N'|'E'|'S'|'W'; neighbour: Id /* the member across the cut */; charter: Id; neighbourCharter: Id /* the two carried WorldEdgeCharters of the cut — byte-equal at birth (T-V15-35) */ }[] } /* the atlas's side of a carve's provenance (J399 (R2); V15 §3.4); the world stores its own in `WorldRecipe.carve` (V13 §2.2) */;
*Current text* (c):
>   by: 'direct'|'solved'|'preset'|'continuation' /* the last writer */; since: { seq: number } }
*New text* (c):
>   by: 'direct'|'solved'|'preset'|'continuation'|'carve' /* the last writer; `carve`: the member's region in the grown world, locked at the carve (J399 (R2)) */; since: { seq: number } }
*Current text* (d):
>   mismatch?: DriftReading /* mode 'imageOnly': where the two disagree, computed once at the fit (W_ATLAS_MISMATCH) */; since: { seq: number } }
*New text* (d):
>   mismatch?: DriftReading /* mode 'imageOnly': where the two disagree, computed once at the fit (W_ATLAS_MISMATCH) */; since: { seq: number } }
> interface CarveRecord {                        // THE CARVE (J399 (R2); V15 §3.4, §4.1): one generation grown for several campaigns and cut into one member per campaign
>   id: Id; rung: WorldSizeRung /* the grown world's rung — every member's */;
>   campaigns: { campaign: string; member?: Id /* the member its region became; absent until `carved` */; region: { originCm: AtlasPointCm; extentCm: { w: AtlasCm; h: AtlasCm } } /* its rectangle on the atlas plane: the grown world's frame laid at the request's drop point, bearing 0 */ }[] /* two or more, in the request's order */;
>   cuts: { axis: 'x'|'y'; atCm: AtlasCm; fromCm: AtlasCm; toCm: AtlasCm; between: [string, string] /* the two campaigns */; charters?: [Id, Id] /* the two carried WorldEdgeCharters of the cut, one per side, byte-equal at birth (V13 §3.1 (8)) */ }[] /* V13's `carve` requirements as the run resolved them (V13 §3.1 (5)) */;
>   grown: { seed: Seed; recipeHash: Hash128; extentCm: { w: AtlasCm; h: AtlasCm } } /* the transient grown world's identity: never a member, never saved, re-grown byte-identically by V13 from the seed and the hashed recipe (V13 §3.17) */;
>   status: 'drafted'|'sent'|'carved'|'cancelled'; lifecycle: Lifecycle; reason: Id }
*Evidence:* docs/PROGRESS.md J399 (R2); V15 §2.2 as it stands (`MemberOrigin`, `Member.continuedFrom`, `Arrangement.by`, `FitRecord`, `ContinuationRequest`'s form); V13 §2.2's `WorldRecipe.carve` (item 1259 (a)) and §3.1 (5), (8) (item 1261); V13 §3.17.


### Volume 15 — §3.4 A4 — Continuation requests (the carve, after the *Edges* paragraph)

**1277.** **The carve: several campaigns at one generation, one member per campaign, a continuation born whole.**
*Requests:* J399 (R2); V13 §3.1 (5), (8) (item 1261); items 1276, 1279, 1280.
*Current text:*
> the draft marked stale (`W_ATLAS_MEMBER_STALE`) and re-drafted on send; a continuation of a continuation — the same⏎rules, the chain recorded in each member's own charters.
*New text:*
> the draft marked stale (`W_ATLAS_MEMBER_STALE`) and re-drafted on send; a continuation of a continuation — the same
> rules, the chain recorded in each member's own charters.
>
> **The carve — several campaigns at one generation** (J399 (R2); V13 §3.1 (5), (8); J-V15.49; T-V15-35). The owner's
> "campaign is just a term we use for the region of the map … multiple": **Make a world map** (V15 §5.1) with the include
> toggle naming SEVERAL campaigns (V09 §4.22 (5); each campaign's `CampaignFacts` sent per campaign, V13 §3.11.6) drafts
> a `carve` request (V15 §4.1; `CarveRecord`, V15 §2.2) and, on **Generate**, V13 grows ONE world for every campaign's
> settlements — each campaign its region, the regions cut by straight lines on coarse grid lines that the run makes
> wild (water, a range, or land no seat reaches) and never lays through a seat's sway reach (V13's `carve` requirements,
> verified at W8; a cut a sway would cross is `W_CARVE_REACH` with the offer of a larger world) — and ends by writing ONE
> WORLD DOCUMENT PER CAMPAIGN: each a derived child of the grown world over its own rectangle at the grown world's own
> rung and cell, holding the shared ground as its own (COPIED, never referenced: V13's derived-child form, its `ground`
> the grown rasters one to one), bound to its campaign, its planned sites its own campaign's, and carrying for every
> side that lies on a cut a locked edge charter byte-equal to its neighbour's across the cut — the present ground both
> hold, read once at the carve: a continuation born whole, (3) above, with the drift readings at zero on every cut. The
> atlas adds each as a member with `origin: 'carved'`, arranged at its region (locked, `by: 'carve'`; the grown
> world's frame laid at the request's drop point, bearing 0, so the members abut exactly along their cuts), its
> `carvedFrom` naming the record, its campaign and its cuts' two charters; the grown world is never a member (it is
> V13's transient; the record keeps its seed and recipe hash so V13 can re-grow it byte-identically, V13 §3.17, and the
> clerk can say "carved from one world grown for three campaigns"). After the carve nothing crosses (F14; V15 §4.7 (1)):
> no event, plate, sway or edit of one member reaches another, each runs its own clock bound to its own campaign, and
> the members share nothing but the charters they were born with (T-V15-35; the reverse-seam lint T-V15-19 untouched —
> the carve is V13's `generate`, run by V09's dialog, as a continuation is). A carve is a form of generation and only
> that: a world already bound to a campaign is never carved (the sequel is V13's R1 — one world, the next campaign on
> it, V13 §3.11.6; `refuse.atlas.carve.bound`), a member is never carved, a request naming one campaign is the ordinary
> run (`refuse.atlas.carve.one`), and the include toggle's gate — the host's campaign entitlement (J396 (2)) — is the
> carve's, the atlas adding none. In host mode each member is owned by the campaign whose settlements it holds (V13
> §8.5's H35, its clause for the carve); until H35 lands a carve in host mode is refused as a continuation is
> (`refuse.atlas.hostWorld`). *Edges:* a campaign whose settlements all lack facts — its region laid by its count of
> seats at their tiers, reported; two campaigns whose relations the host sends across them — refused at W0 naming the
> pair (V13 §3.1 (5): no relation row crosses campaigns); a region smaller than its rung's smallest extent — the request
> asks for the next rung up (`W_WORLD_RECIPE_CLAMPED` by W0); a member of a carve later continued into a void — the
> ordinary continuation (its cut sides already charters; its free sides as any member's).
*Evidence:* docs/PROGRESS.md J399 (R2) (the ruling's words: "one generation may grow one world for several campaigns' settlements — 'include my settlements' admits more than one campaign's set, each its region — and the result is CARVED at generation into one member per campaign along the regions' boundaries: each member a world document holding the shared ground as its own, bound to its campaign, with locked edge charters to its neighbours (a continuation born whole, V15 §3.4), the atlas holding them in their arrangement; after the carve nothing crosses (F14); the carve is at generation only"); V15 §3.4 as it stands ((3) the present ground, never a record; (7) the send; (8) nothing crosses; the *Edges* paragraph); V13 §3.1 (5), (8) as item 1261 leaves them; V15 §4.7 (1); V15 §1.1 (A-CONTINUE's row: the generated continuation is V13's `generate` run by V09's dialog); T-V15-19; V13 §8.5's H35 as item 1271 (b) leaves it; J396 (2); experience read 05 §2.3 (the microcosm rule as play), §1.5 (a second realm beside the first).


### Volume 15 — §3.6 (4) The known region (the party's places) and §3.7 The party's reach across a seam (the party's current place)

**1278.** **The party's known region and its reach across a seam read the party's places as V13 draws them: the host's whereabouts on a host-bound member, the DM's pin where it is the map's picture.**
*Requests:* J399 (R4); J400 (9) (every fragment revised); V13 §2.2's `PartyPlacement`, `LensFacts.partySeats` and `RenderedWorld.known` (item 1259 (b), (c), (g)); V13 §5.8 (7) (item 1267).
*Current text* (a):
> `audience` (the party or the public: the member's known cells as `renderAt` returned them for that audience — the coarse cells the audience's places have reached, amendments r's `RenderedWorld.known` — mapped onto the warp grid;
*New text* (a):
> `audience` (the party or the public: the member's known cells as `renderAt` returned them for that audience — the coarse cells the audience's places have reached and, for a party, the seats of the host's whereabouts of the party and the cells of the DM's map-only party placements — every placement on a standalone member — from their weeks (V13 §2.2's `LensFacts.partySeats` and `PartyPlacement`; J399 (R4); J400 (9): where the party has been, never a path between two places), amendments r's `RenderedWorld.known` as file z item 1259 (g) widens it — mapped onto the warp grid;
*Current text* (b):
> member stands within `snapEdgeKm` of a continued seam (the party's current seat the host sends, `LensFacts.partySeat` — V13 §8.5's⏎H39 —, or the DM's drill from a point within that distance of the seam) and the DM drills across it into the
*New text* (b):
> member stands within `snapEdgeKm` of a continued seam (the party's current place as V13's `partyPin` layer draws it on
> that member — the host's whereabouts of the party, any seat of `LensFacts.partySeats` (V13 §8.5's H39), or the DM's
> party pin's latest placement where it is the map's picture, later than the host's stamp or on a world whose host sends
> no whereabouts (V13 §2.2's `PartyPlacement`; J399 (R4); J400 (9): on a host-bound member the host is the one writer of
> the party's place) —, or the DM's drill from a point within that distance of the seam) and the DM drills across it
> into the
*Current text* (c):
> offer (`refuse.atlas.reach.notContinued`, `refuse.atlas.reach.noParty` on a request made by hand): the blank map stays
*New text* (c):
> offer (`refuse.atlas.reach.notContinued`, `refuse.atlas.reach.noParty` on a request made by hand — no party place drawn
> on the member the party stands on, neither the host's whereabouts nor the DM's picture, and no drill from a party
> place): the blank map stays
*Evidence:* docs/PROGRESS.md J399 (R4); J400 (9); research/sf/host-reply-2026-10-24.md S5; V15 §3.6 (4) as file x item 1208 leaves it (the `audience` source) and §3.7's party-reach paragraph as file x item 1217 leaves it; V13 §2.2 as item 1259 leaves it; V13 §5.8 (7) as item 1267 leaves it; V13 §8.5's H39 as item 1271 (c) leaves it; experience read 05 §2.3, §4 Q11.


### Volume 15 — §4.1 The edit events (the `carve` request record; `markPartyReach`'s refusal; the outcome keys)

**1279.** **The `carve` request is an edit of the atlas; its two refusals join the catalogue; the reach offer reads the party's place.**
*Requests:* J399 (R2), (R4); J400 (9) (fragment (a)'s refusal, revised); items 1276, 1277, 1278.
*Current text* (a):
> `refuse.atlas.reach.noParty` (`from` sends no `LensFacts.partySeat` and the DM drilled from no party place)
*New text* (a):
> `refuse.atlas.reach.noParty` (no party place is drawn on `from` — no `LensFacts.partySeats` sent and no party pin standing there as the map's picture — and the DM drilled from no party place; J399 (R4); J400 (9))
>   | { t: 'carve'; action: 'draft'; campaigns: string[]; rung: WorldSizeRung; at: AtlasPointCm } | { t: 'carve'; action: 'send'; request: Id } | { t: 'carve'; action: 'cancel'; request: Id }   // THE CARVE (J399 (R2); V15 §3.4; `CarveRecord`, V15 §2.2): a request record — `draft` writes the record with its campaigns, the rung and the drop point; `send` opens V09's world dialog with the include toggle naming the campaigns (V09 §4.22 (5)) and Generate runs V13's one run and its carve (V13 §3.1 (5), (8)), the members added by the dialog's generate through `addMember` with `origin: 'carved'`, each arranged at its region (locked, `by: 'carve'`) and its `carvedFrom` written with the cuts' two charters; `cancel` tombstones a draft; refuses `refuse.atlas.carve.one` (fewer than two campaigns named) and `refuse.atlas.carve.bound` (a campaign already bound to a live world of the account — the sequel is V13 §3.11.6's `bindCampaign`, J399 (R1)), and in host mode `refuse.atlas.hostWorld` until H35 lands; the dry run shows the regions' outlines and the campaigns' chips
*Current text* (b):
> `refuse.atlas.reach.noParty` (M47); the warnings with their `ConflictAction`s — `W_ATLAS_OVERLAP`
*New text* (b):
> `refuse.atlas.reach.noParty` (M47), `refuse.atlas.carve.one`, `refuse.atlas.carve.bound` (J399 (R2)); the warnings with their `ConflictAction`s — `W_ATLAS_OVERLAP`
*Evidence:* docs/PROGRESS.md J399 (R2), (R4); J400 (9); V15 §4.1 as file x items 1211 and 1218 leave it (the `markPartyReach` variant and the outcome keys); V15 §2.2 as item 1276 leaves it; V15 §3.4 as item 1277 leaves it; V13 §3.1 (5), (8) (item 1261); V13 §8.5's H35 (item 1271 (b)).


### Volume 15 — §4.7 Microcosms ((1): the carve and the sequel leave the rule unchanged)

**1280.** **The microcosm rule is unchanged between carved members and by a world's next campaign.**
*Requests:* J399 (R1), (R2); items 1275, 1277.
*Current text:*
>    one member's facts against another's — a figure that crosses a seam comes from an atlas relation alone. The party's⏎   reach across a continued seam (M47; V15 §3.7) is the DM's own write of the continued member's `party` view key on⏎   that member's page, not a read of one member by another.
*New text:*
>    one member's facts against another's — a figure that crosses a seam comes from an atlas relation alone. The party's
>    reach across a continued seam (M47; V15 §3.7) is the DM's own write of the continued member's `party` view key on
>    that member's page, not a read of one member by another. **The carve** (J399 (R2); V15 §3.4) is a generation that
>    ends before any member exists — its cuts' charters are the grown ground read once at the carve, that ground copied
>    into each member —, so the rule is UNCHANGED between carved members: after the carve nothing crosses, no member
>    reads another, each runs its own clock bound to its own campaign (T-V15-35). **A world's next campaign** (J399
>    (R1); V13 §2.2's `CampaignRecord`) is that one member's own history growing — one world document per campaign at a
>    time, its earlier campaigns kept inside it — and reaches no other member: the atlas reads the member at its present
>    as before, and a member's binding of a next campaign moves no other member's digest and no atlas digest but by the
>    member's own version step (V15 §4.6).
*Evidence:* docs/PROGRESS.md J399 (R1), (R2) ("concurrent campaigns stay separate world documents (F14's clocks)"; "after the carve nothing crosses (F14)"); V15 §4.7 (1) as file x item 1219 leaves it; V15 §4.6 (a member's version change: re-render, never re-fit); V13 §2.2's `CampaignRecord` (item 1259 (b)); V15 §3.4 as item 1277 leaves it.


### Volume 15 — §5.1 The atlas page (the viewer role) and §5.4 Player views (the atlas's scene carries the player's admission)

**1281.** **A player is a viewer on the atlas page; the atlas's scene carries the player's admission.**
*Requests:* J399 (R3), (R6); V13 §1.3's laws (item 1257); item 1282.
*Current text* (a):
> in host mode its members resolve through the host's resolver (§11.5) and the page is read-only for a viewer⏎role.
*New text* (a):
> in host mode its members resolve through the host's resolver (§11.5) and the page is read-only for a viewer
> role — a player audience is a viewer and writes nothing: no atlas record, no viewpoint, no mark, no layer of any export
> (V13 §1.3's law of J399 (R6); T-V13-125).
*Current text* (b):
> admission (§11.1's knowledge rule); a `.dd2vtt` export does not exist for an atlas (V15 §5.5).
*New text* (b):
> admission (§11.1's knowledge rule); the atlas's VTT scene (V15 §5.5; J399 (R3)) carries the same admission — the
> viewpoint's audience's imagery as its background, no DM-only mark, no date a player may not see (M43: a member's
> `calendarLabel` or nothing in its note) and no layer a player may write (J399 (R6)).
*Evidence:* docs/PROGRESS.md J399 (R3) ("the atlas exports its composed view the same way"; "no player-writable layer of ours in any scene"), (R6); V15 §5.1 and §5.4 as file x items 1222 and 1225 leave them ("a `.dd2vtt` export does not exist for an atlas"); V13 §1.3's two laws (item 1257 (b)); V15 §5.5 as item 1282 leaves it.


### Volume 15 — §5.5 Exports and sharing (the atlas scene row, after `atlasTiles`)

**1282.** **The atlas exports its composed view as a VTT scene on the true plane: notes per member, gaps nothing.**
*Requests:* J399 (R3), (R5), (R6); V13 §5.4 (item 1266); V14 §5.3 (item 1288); BCR-V15-19 (item 1287).
*Current text:*
> rue plane only (no warp: a tile set is a map, not a picture of one); the audience's imagery; unshareable members' tiles omitted and their extents listed as "not shared" | own; for a VTT's world map or a web page; `ExportOpts.atlas.tiles { levels; audience }` |
*New text:*
> rue plane only (no warp: a tile set is a map, not a picture of one); the audience's imagery; unshareable members' tiles omitted and their extents listed as "not shared" | own; for a VTT's world map or a web page; `ExportOpts.atlas.tiles { levels; audience }` |
> | **the atlas scene** (J399 (R3); BCR-V15-19; T-V15-36; `ATLAS-17`) | one Foundry-class scene JSON and one Universal VTT file per atlas view, by §11.1's profile extended to the atlas, written through V14 §5.3's shared writer `sceneSet` (one image and one JSON per scene; the `plat` object) | the composed view at the chosen level on the true plane (no warp: a scene is a map, not a picture of one — `atlasTiles`' rule), the viewpoint's audience's imagery (the party's or the public's for a players' scene: DM-only marks absent, never greyed; unshareable members as their gaps) as the scene's background image at the level's pixels (≤ 8 192 px a side; a larger view a grid of scenes aligned to cells, §11.1's rule); the DM's grid as presentation only — `grid: { kind: 'square'\|'hex'; kmPerCell: number } \| 'none'`, the cell an integer number of pixels at the level, written as V13 §5.4's world scene writes it — a cell carrying no travel time (J399 (R5)); the notes: one per member (its name at its extent's centre; for the DM audience its date label, for a player its `calendarLabel` or nothing, M43) and one per settlement glyph the member's picture draws at the level (its name; for the DM audience its reason sentence through that member's `reasonOf`), the gaps NOTHING (no image, no note; the atlas's background kind drawn as the parchment is); no walls, no lights (`line_of_sight`, `objects_line_of_sight`, `portals` and `lights` empty; `environment.baked_lighting` true); the `plat` object with `plat.atlas { doc; level; audience; kmPerCell; gridKind }`, every member's version and the viewpoint named, the season absent (an atlas has no clock of its own, V15 §4.7 (2)); no player-writable layer (J399 (R6)); the provenance block naming the atlas's digests and every member's version | `ExportOpts.vtt.atlas { level; audience; grid; notes? }` (BCR-V15-19); a scene under a player viewpoint's admission (§11.1's knowledge rule; V15 §5.4); the file name `{atlas}-{level}-{cols}x{rows}` (V09 §5.10) |
*Evidence:* docs/PROGRESS.md J399 (R3) ("the atlas exports its composed view the same way (notes per member; gaps as nothing)"; "the picture as the scene's background image; the grid the DM's choice … as presentation only"; "settlement glyphs and sites as the scene's notes with their names and, for the DM audience, their reason sentences; no walls, no lights"), (R5), (R6); V15 §5.5 as file x item 1226 and file u E-6 leave it (the `atlasTiles` row: the true plane only); V15 §4.7 (2) (no atlas clock); V15 §2.2's `Member.calendarLabel` (M43); V13 §5.4 as item 1266 leaves it (the world scene's grid and notes rule); V14 §5.3 as item 1288 leaves it (`sceneSet`); the base §11.1's profile (the 8 192 px cap, the grid of scenes, the `plat` object).


### Volume 15 — §6 Performance budgets (`ATLAS-17`: the atlas scene)

**1283.** **`ATLAS-17` budgets the atlas scene's export.**
*Requests:* J399 (R3); item 1282; T-V15-36.
*Current text* (a):
> side one open member's line (§12.8's world line unchanged: a member rendered counts under it, in turn; BCR-V15-8) | — | the LRU halved on the low tier; one member handle at a time (already the rule) |
*New text* (a):
> side one open member's line (§12.8's world line unchanged: a member rendered counts under it, in turn; BCR-V15-8) | — | the LRU halved on the low tier; one member handle at a time (already the rule) |
> | `ATLAS-17` | the atlas scene's export (J399 (R3); V15 §5.5) at a level from cached imagery: the composition on the true plane, the image's encoding, the notes | ≤ 8 s for one scene of ≤ 8 192 px a side at 16 realm members for one audience on the export worker (the composition ≤ `ATLAS-3`'s law over the scene's tiles + the encoding ≈ 3 s at 8 192²; the notes ≤ 50 ms per hundred glyphs, the DM's reason sentences through each member's `reasonOf` ≤ 1 ms each, cached); a view past the cap its grid of scenes at ≤ 8 s each; PLAUSIBLE until measured at SA1 | ≤ 25 ns × the scene's pixels + the encoder's | the scene at the next coarser level on the low tier; the DM's reason sentences left out of the notes under a time cap, the names kept |
*Current text* (b):
> stale picture shown meanwhile). Each row has its T-V15 clause (T-V15-15); the register holds `ATLAS-1` – `ATLAS-10`
*New text* (b):
> stale picture shown meanwhile). Each row has its T-V15 clause (T-V15-15); the register holds `ATLAS-1` – `ATLAS-10` and `ATLAS-17` (the ids between stay free for the pass that mints them, J398's ledger)
*Evidence:* docs/PROGRESS.md J399 (R3); J398 (the next free ids: `ATLAS-17`); V15 §6 as it stands (`ATLAS-3`'s law; `ATLAS-10` the last row; the register sentence); V15 §5.5 as item 1282 leaves it; the base §11.1 (the 8 192 px cap).


### Volume 15 — §7.4 Editing, view, exports, budgets, platform (T-V15-35 – T-V15-37, after T-V15-34; T-V15-31's mock host) and §7.5 The report codes (the carve's refusals)

**1284.** **The tests: the carve shares nothing, the atlas scene, the reach from the party's place; the carve's refusals in the code table; T-V15-31 reads the host's whereabouts.**
*Requests:* J399 (R2), (R3), (R4); J400 (9) (T-V15-37 of (a), revised; (c) added); items 1276–1282.
*Current text* (a):
> w named; a premium account's acts are all accepted; a shared file's recipient toggles the sharer's shared viewpoints and bakes nothing new; the anonymous fixture has no atlas to open (its gate row) and the style is asked of it nowhere | the three account fixtures over the atlas page; the mock host |
*New text* (a):
> w named; a premium account's acts are all accepted; a shared file's recipient toggles the sharer's shared viewpoints and bakes nothing new; the anonymous fixture has no atlas to open (its gate row) and the style is asked of it nowhere | the three account fixtures over the atlas page; the mock host |
> | T-V15-35 (the carve, J399 (R2)) | on B-ATLAS-CARVE (a `carve` request naming three mock campaigns of eight, five and four settlements at the realm rung): the run ends with three members of `origin: 'carved'` at their regions abutting exactly along two cuts, each member's `WorldRecipe.carve` naming the same seed and recipe hash and its own region; for every cut the two carried charters are byte-equal and the drift reading is zero; each member's rasters over its region equal the re-grown whole's over that region cell for cell (V13 re-grows the whole from the record's seed and hashed recipe and the test compares); no sway cell of any seat lies on or across a cut and no `relation` row joins two campaigns; after the carve an edit of any kind on one member leaves every other member's model and records digests byte-equal and the atlas's model digest byte-equal (T-V15-1's clause), a lens window of one campaign folds no plate on another, and no member names another or the grown world (a lint over every member's records: `carve` holds a hash and a region, never a document id); T-V15-19's reverse-seam lint stays green (the carve added no writer); a request naming one campaign is refused `refuse.atlas.carve.one`, one naming a campaign bound to a live world `refuse.atlas.carve.bound`, and in host mode without H35 `refuse.atlas.hostWorld`; the include toggle refused by the mock host's campaign entitlement refuses the carve with the host's reason and the atlas adds no second check | B-ATLAS-CARVE over V13's run; the mock host |
> | T-V15-36 (the atlas scene, J399 (R3)) | on B-ATLAS-VIEW exported as a scene at level 5 for the DM and for the party: one image and one JSON per scene in both formats through `sceneSet`; the image pixel-equal to the composed true-plane tiles at the level for that audience (the warp never applied, whatever the slider holds; unshareable members as their gaps; no DM-only mark, secret record or DM-only viewpoint on the party's); `line_of_sight`, `objects_line_of_sight`, `portals` and `lights` empty; the grid's cell an integer pixel count at the level and `plat.grid.kmPerCell` the chosen value; the notes one per member and one per glyph drawn — the DM's with date labels and reason sentences, the party's with names and each member's `calendarLabel` or nothing (T-V15-32's enumeration over the notes finds no date word) —, the gaps without note or image; no field of either file names a time finer than a week, and the `plat` object carries no season; a view past 8 192 px writes a grid of scenes; inside `ATLAS-17` | the export harness over B-ATLAS-VIEW and B-ATLAS-16 |
> | T-V15-37 (the party's reach from the party's place, J399 (R4); J400 (9)) | on B-ATLAS-3 with R host-bound under a mock host that sends no whereabouts and the DM's party pin placed on R within `snapEdgeKm` of the seam to R2 (the map's picture): the offer **Mark the party's places here** is drawn, its crossing point the pin's placement projected onto the shared stretch, and the seeding previewed on R2's page as T-V15-31 states; with the pin beyond the distance and no drill the offer is absent and a request made by hand is refused `refuse.atlas.reach.noParty`; under a mock host sending `LensFacts.partySeats` [a seat far from the seam] stamped after the pin's week, the host's place is the party's and no offer is drawn from the pin, and with the stamp earlier than a map-only placement near the seam the offer is drawn from that placement; the party viewpoint's known region on R contains every place's cell and no cell between two places (the warp grid's known mask compared against `renderAt`'s known set) | B-ATLAS-3; the mock host; the party-key harness |
*Current text* (b):
> | `W_ATLAS_COURT_UNSENT` | warning | A2, A6 (a court viewpoint whose member sends no belief for that court; M9) | the viewpoint, the court's seat, the member |
*New text* (b):
> | `W_ATLAS_COURT_UNSENT` | warning | A2, A6 (a court viewpoint whose member sends no belief for that court; M9) | the viewpoint, the court's seat, the member |
> | `refuse.atlas.carve.one`, `refuse.atlas.carve.bound` | refusal (a §7.1 outcome key rendered by V09's catalogue, never a `ReportCode`) | the `carve` request's dry run (J399 (R2); V15 §3.4, §4.1) | the campaigns named; the live world the campaign is bound to |
*Current text* (c):
> on B-ATLAS-3 with R host-bound under a mock host sending `LensFacts.partySeat` within
*New text* (c):
> on B-ATLAS-3 with R host-bound under a mock host sending `LensFacts.partySeats` naming a seat within
*Evidence:* docs/PROGRESS.md J399 (R2), (R3), (R4); J400 (9) (the whereabouts typed `partySeats`); V15 §7.4 as file x item 1229 leaves it (T-V15-34 the last row; T-V15-31 as file x item 1227 wrote it) and §7.5 as file x leaves it (`W_ATLAS_COURT_UNSENT` the last warning row); T-V15-1, T-V15-19, T-V15-31, T-V15-32; items 1276–1282; V13 §3.17.


### Volume 15 — §8 Build plan (SA1's and SA2's exits; SA1's party reach; the dependencies sentences)

**1285.** **The atlas scene and the pin's reach land in SA1, the carve in SA2, inside the rows' ranges; SA1 reads the host's whereabouts as `partySeats`.**
*Requests:* J399 (R2), (R3), (R4); J400 (9) ((d), (e) added); items 1277, 1278, 1282, 1284.
*Current text* (a):
> T-V15-18 (the `true` viewpoint), T-V15-19, T-V15-20, T-V15-21, T-V15-24, T-V15-28 (its record and digest clauses), T-V15-30, T-V15-31 (under a mock host sending the party's seat; standalone, the refusal with its reason), T-V15-32; the register check | 2–3.25 |
*New text* (a):
> T-V15-18 (the `true` viewpoint), T-V15-19, T-V15-20, T-V15-21, T-V15-24, T-V15-28 (its record and digest clauses), T-V15-30, T-V15-31 (under a mock host sending the party's seat; standalone, the refusal with its reason), T-V15-32, T-V15-36 (the atlas scene, J399 (R3); `ATLAS-17` measured), T-V15-37 (the party pin's reach, J399 (R4)); the register check | 2–3.25 |
*Current text* (b):
> `rematchStrip` | T-V15-2, T-V15-4, T-V15-11, T-V15-22, T-V15-23; `ATLAS-1`, `ATLAS-4`, `ATLAS-5` measured; the register check | 2–3 |
*New text* (b):
> `rematchStrip`; the carve (J399 (R2); V15 §3.4, §4.1: the `carve` request, the members added with their regions and the cuts' two charters recorded, over V13 §3.1 (8)'s run) | T-V15-2, T-V15-4, T-V15-11, T-V15-22, T-V15-23, T-V15-35 (the carve); `ATLAS-1`, `ATLAS-4`, `ATLAS-5` measured; the register check | 2–3 |
*Current text* (c):
> rows' ranges (PLAUSIBLE; V15 §12), the total unchanged; the art library lands after the owner's first
*New text* (c):
> rows' ranges (PLAUSIBLE; V15 §12), the total unchanged; the campaigns pass's additions (J399 (R2), (R3), (R4);
> amendments z: the carve in SA2, the atlas scene and the pin's reach in SA1) about 0.5 pw more across SA1 and SA2,
> inside the rows' ranges (PLAUSIBLE), the total unchanged; the art library lands after the owner's first
*Current text* (d):
> `LensFacts.partySeat` read where H39 sends it
*New text* (d):
> `LensFacts.partySeats` read where H39 sends it, the party's place otherwise the DM's party pin as V13 draws it; J400 (9)
*Current text* (e):
> and the party's reach across a seam on `LensFacts.partySeat` (H39; dark, no offer);
*New text* (e):
> and the party's reach across a seam on `LensFacts.partySeats` (H39; dark: the offer from the DM's party pin, the map's
> picture, or the DM's drill alone; J400 (9));
*Evidence:* docs/PROGRESS.md J399 (R2), (R3), (R4); J400 (9); V15 §8 as file x item 1230 leaves it (its SA1 row's `markPartyReach` clause and its dependencies paragraph's dark arm for the party's reach) (the SA1 and SA2 rows' exits; the dependencies paragraph's experience-pass sentence); items 1277, 1278, 1282, 1283, 1284.


### Volume 15 — §9 Decisions (J-V15.49 – J-V15.51, after J-V15.48)

**1286.** **The decisions of the campaigns pass on the atlas side.**
*Requests:* J399 (R2), (R3), (R4); J400 (9) (J-V15.51 revised).
*Current text:*
> s atlas does not already hold, and the one delight a free account can show costs the host nothing; the owner-facing gating list is unchanged (the style was never a gate's value) and RQ-V15-12 asks V13's gate row and V09's dialog to say so in one line; research/experience/05 §2.4, §4 Q13 (vetoable) |
*New text:*
> s atlas does not already hold, and the one delight a free account can show costs the host nothing; the owner-facing gating list is unchanged (the style was never a gate's value) and RQ-V15-12 asks V13's gate row and V09's dialog to say so in one line; research/experience/05 §2.4, §4 Q13 (vetoable) |
> | J-V15.49 | **(J399 (R2).)** chose **the carve as one generation cut into one member per campaign — each a derived child of the grown world at its own rung with the shared ground copied, the cuts straight lines on grid lines through wild land with byte-equal charters on both sides, the grown world a transient the record can re-grow, the atlas holding the members at their regions** (V15 §3.4, §2.2's `CarveRecord`; V13 §3.1 (5), (8); file z items 1261, 1276, 1277) over one member holding several campaigns, over a shared ground the members reference, and over keeping the grown world as a member, because F14 and the microcosm rule (§4.7) hold only if each campaign's world is its own document on its own clock (one document for two tables makes every edit of one DM's the other's), because members are axis-aligned rectangles whose seams are straight edges (§3.1, §3.4) so a continuation born whole needs a charter per straight side, because a referenced ground would be a reverse seam the lint T-V15-19 forbids while a copied one costs each member exactly what a continuation costs, and because the owner's "multiple" asks for one country whose tables are kept apart by design — "a gallery of separate snow-globes" was the read's complaint about play (research/experience/05 §2.3), and a carve answers it with one land grown together (vetoable) |
> | J-V15.50 | **(J399 (R3).)** chose **the atlas scene as the composed view on the true plane — never the warp —, one scene per view at a level, notes per member and per glyph, the gaps nothing, through V14's shared writer, replacing "a `.dd2vtt` export does not exist for an atlas"** (V15 §5.5, §5.4; file z items 1281, 1282) over a warped scene, over no atlas scene, and over an exporter of the atlas's own, because the owner's "World map should also be VTT" names the world map by its product word and a scene is a map a token stands on — a warped picture would mis-scale every move, as `atlasTiles` already rules for tiles —, because the gaps are the atlas's honesty (nothing is known there, so nothing is drawn, V15 §4.5), and because one writer of the multi-scene convention keeps the crop's, the site's, the world's and the atlas's scenes byte-compatible (J-V13.195; V14's J-V14.59) (vetoable) |
> | J-V15.51 | **(J399 (R4); J400 (9).)** chose **the party's place read through `renderAt`'s known set and the `partyPin` layer's current place — on a host-bound member the host's whereabouts of the party, the one writer; the DM's party pin where it is the map's picture (later than the host's stamp, on a member whose host sends no whereabouts, or on a standalone member) — for the known region and the reach offer** (V15 §3.6 (4), §3.7; file z item 1278) over the atlas reading the pin itself and over the pin and the host's seat as two writers, because the atlas takes one reading of a member (the spine's §14 (2)) and the known set and the layer are that reading, and because the party's place on a host-bound member is the host's (V13 §8.5's H39, rewritten; J-V13.198) — the DM who pins the party at the seam on a world the host does not track gets the offer the host's whereabouts would have given, and no path is drawn to get them there (vetoable) |
*Evidence:* docs/PROGRESS.md J399 (R2), (R3), (R4); J400 (9); V15 §9 as file x item 1232 leaves it (J-V15.48 the last row); items 1276–1282; V15 §3.1, §3.4, §4.5, §4.7, §5.5; T-V15-19; V13 §8.5's H39; V13 §9's J-V13.194 – J-V13.196 (item 1272); V14 §9's J-V14.59 (item 1289); experience read 05 §2.3.


### Volume 15 — §10.1 Requests to the base (BCR-V15-19 after BCR-V15-18), §10.2 Requests to volume 13 (RQ-V15-16 after H35) and §10.3 Requests to the other volumes (RQ-V15-17 after RQ-V15-15)

**1287.** **The base's profile and `ExportOpts` for the atlas scene and the `carve` edit kind; V13 supplies the carve's run and the party's places; V09 the atlas page's carve chips and Tabletop row.**
*Requests:* J399 (R2), (R3), (R4); J400 (9) (RQ-V15-16 of (b), revised); items 1266, 1273 (BCR-V13-56, R-V15-5), 1276, 1277, 1279, 1282, 1291.
*Current text* (a):
> .self`, `refuse.atlas.relation.gap`, `refuse.atlas.asWas`, `refuse.atlas.reach.notContinued`, `refuse.atlas.reach.noParty` and the warning `W_ATLAS_COURT_UNSENT` (`keep`, `remove`); `setAttr` admitting a member's `calendarLabel`, a viewpoint's `knownTo` and an atlas relation's `knownTo` (V15 §4.1) |
*New text* (a):
> .self`, `refuse.atlas.relation.gap`, `refuse.atlas.asWas`, `refuse.atlas.reach.notContinued`, `refuse.atlas.reach.noParty` and the warning `W_ATLAS_COURT_UNSENT` (`keep`, `remove`); `setAttr` admitting a member's `calendarLabel`, a viewpoint's `knownTo` and an atlas relation's `knownTo` (V15 §4.1) |
> | **BCR-V15-19** the atlas scene and the carve (J399 (R2), (R3); J-V15.49, J-V15.50) | §11.1 *Formats* (the VTT row) and *The `.dd2vtt` profile* (*Scope*); §11.2 `ExportOpts.vtt`; §7.1 `EditEvent` and its outcome table | the VTT row's scene sets and the profile's scope are a settlement's (BCR-V13-56 extends them to a world page); `ExportOpts.vtt` has `squareM`, `pxPerSquare`, `plainPng`, `scene` and BCR-V14-8's `crop`; BCR-V15-18's variants and keys | the VTT row and the *Scope* bullet admit one scene per atlas view at a level (V15 §5.5: the composed view on the true plane as the background, the DM's grid in km per cell as presentation, one note per member and per glyph, the gaps nothing, no walls, no lights), as BCR-V13-56's merged text admits the world page's — one text for both, V13's; `ExportOpts.vtt.atlas?: { level: number; audience: 'dm'\|'party'\|'public'; grid: { kind: 'square'\|'hex'; kmPerCell: number } \| 'none'; notes?: boolean }` beside BCR-V13-56's `world?`; the `carve` variants (V15 §4.1) with their lifecycle row (a request record, as `requestContinuation`'s) and undo (a draft's or a cancellation's tombstone; a carved one kept) and the keys `refuse.atlas.carve.one`, `refuse.atlas.carve.bound` |
*Current text* (b):
> e); *the gallery:* the host's share and access rules for an atlas and for a member's imagery across campaigns (the owner's, V15 §11 Q2) — each optional, dark by default, with its tier line and degraded arm (absent ⇒ the atlas a file; a continuation refused in host mode) | V15 §2.11, §3.4 (7), §5.5 |
*New text* (b):
> e); *the gallery:* the host's share and access rules for an atlas and for a member's imagery across campaigns (the owner's, V15 §11 Q2) — each optional, dark by default, with its tier line and degraded arm (absent ⇒ the atlas a file; a continuation refused in host mode) | V15 §2.11, §3.4 (7), §5.5 |
> | **RQ-V15-16** the carve's run and the party's places (J399 (R2), (R4); J400 (9); J-V15.49, J-V15.51; V13's R-V15-5) | **as amendments z defines it in V13** (file z items 1259, 1261, 1267): `WorldRequest.include` admitting `{ campaigns: string[] }`; W0's regions and `carve` requirements and W8's verification (V13 §3.1 (5)); the run's end carving one world document per campaign — a derived child at the grown world's own rung with the ground copied, `edgeCharter` read at each cut line for both members, `WorldRecipe.carve` as provenance — and handing the members to the atlas's `addMember` (V13 §3.1 (8)); `renderAt`'s known set for a party audience carrying the seats of the host's whereabouts of the party and the cells of the party pin's map-only placements, and the `partyPin` layer's current place of the party (V13 §2.2's `RenderedWorld.known`, `LensFacts.partySeats`, `PartyPlacement`; §5.1; §5.8 (7); J400 (9)) — this volume consumes them as designed (V15 §3.4's carve; §3.6 (4); §3.7) and reads the pin in no other way | V15 §2.2, §3.4, §3.6 (4), §3.7, §4.1 |
*Current text* (c):
> 's route from it to its first seat — and the DM's confirmation writes the key there — a view key of the continued member's own document, never an event or a digest, never the host's, and not a log writer: T-V15-19's "no reverse seam" lint is over log writers and is untouched by it | V15 §3.7, §4.1 |
*New text* (c):
> 's route from it to its first seat — and the DM's confirmation writes the key there — a view key of the continued member's own document, never an event or a digest, never the host's, and not a log writer: T-V15-19's "no reverse seam" lint is over log writers and is untouched by it | V15 §3.7, §4.1 |
> | **V09** (**RQ-V15-17**; J399 (R2), (R3)) | **Make a world map** with the include toggle naming several campaigns (one chip per campaign, each its region, V09 §4.22 (5)) opening the `carve` request's dry run (the regions' outlines over the parchment, the campaigns' chips) before Generate; the atlas page's Export dialog's **Tabletop** tab (V09 §5.10): the level, **What it shows** (the viewpoint's audience), the **Grid** in kilometres per cell labelled as carrying no travel time, **Notes** (per member; per town); the catalogue keys `refuse.atlas.carve.one` ("name at least two campaigns"), `refuse.atlas.carve.bound` ("{campaign} already lives on {world}: start its next campaign there instead") | V15 §3.4, §5.5 |
*Evidence:* docs/PROGRESS.md J399 (R2), (R3), (R4); J400 (9); V15 §10.1 as file x item 1233 leaves it (BCR-V15-18 the last row), §10.2 as file r item 1015 leaves it (the H35 row the last) and §10.3 as file x item 1233 leaves it (RQ-V15-15 the last row); V13 §10's BCR-V13-56 and §10.3's R-V15-5 (item 1273); the base §11.1 and §11.2 (`ExportOpts.vtt`'s fields as BCR-V14-8 leaves them); items 1259, 1261, 1267, 1276, 1277, 1279, 1282; V09 §4.22 (5) and §5.10 as items 1290 and 1291 leave them.


### Volume 14 — §2.3 The anchor, the access record and the knowledge layers (the party key's writers cite the law) and §5.3 The encounter crop (the shared scene writer named)

**1288.** **A player writes nothing, the law cited where the party key is declared; the multi-scene convention has one writer, `sceneSet`, that the world's and the atlas's scenes call.**
*Requests:* J399 (R3), (R6); V13 §1.3's laws (item 1257); V13 §5.4 (item 1266); V15 §5.5 (item 1282).
*Current text* (a):
> written by the owner⏎and editor roles only)
*New text* (a):
> written by the owner
> and editor roles only — a player audience is a viewer and writes nothing: not this key, not the party pin of the
> world (V13 §2.2's `PartyPlacement`, the DM's), not an annotation layer, which exists on no document kind and never will
> (V13 §1.3's law of J399 (R6); T-V13-125))
*Current text* (b):
> **The multi-floor convention (C14-06; the survey's §2.1 and §6.1 (1)):** a multi-scene export of a crop or a site⏎writes **one image and one JSON per scene**,
*New text* (b):
> **The multi-floor convention (C14-06; the survey's §2.1 and §6.1 (1)):** a multi-scene export of a crop or a site
> writes **one image and one JSON per scene** — through the ONE shared writer of the convention, **`sceneSet`** in
> `@plat/export` (J399 (R3); J-V14.59; T-V14-36; BCR-V14-27): it takes a list of scenes (each an image rendered by §8.8,
> its grid, its `plat` object, its lists of sight lines, portals, lights and notes) and writes the Universal VTT file per
> scene and the Foundry scene with a `Level` per scene, and it is the writer V13 §5.4's world scene and V15 §5.5's atlas
> scene call with their own scene lists (one scene each, or a grid of scenes past the size cap; their sight lines,
> portals and lights empty; their notes the glyphs' and the members'), so a world's scene and a crop's are
> byte-compatible by construction and no second writer of either format exists —,
*Evidence:* docs/PROGRESS.md J399 (R3) ("V14's export machinery reused (one image and one JSON per scene; the plat object)"), (R6) ("a player audience never writes a world, a site, an atlas or an export (the viewer role; the party key and the party pin written by the DM; no player annotation layer exists or will)"); V14 §2.3 (the party key written by the owner and editor roles only; "a party view neither draws, lists, counts, names nor exports it") and §5.3 (the multi-floor convention; the `plat` object; the lights carry no hour) as file x item 1238 and file l leave them; the base §11.1 (the generation worker wraps the VTT scene around the image; the Foundry scene's `Level` per scene); V13 §1.3's laws (item 1257 (b)); V13 §5.4 (item 1266); V15 §5.5 (item 1282).


### Volume 14 — §7 Tests and acceptance bars (T-V14-36 after T-V14-35), §9 Decisions (J-V14.59 after J-V14.58) and §10.1 Requests to the base (BCR-V14-27 after BCR-V14-26)

**1289.** **The shared scene writer's test, decision and base request.**
*Requests:* J399 (R3), (R6); item 1288.
*Current text* (a):
> ent's log, model digest and records digest byte-equal before and after, no event on any log, nothing sent to any host; a cancelled preview writes nothing; the party picture then admits the seeded places as V08's reveal would, the site's anchor among them only where the seeded route reaches it | PR |
*New text* (a):
> ent's log, model digest and records digest byte-equal before and after, no event on any log, nothing sent to any host; a cancelled preview writes nothing; the party picture then admits the seeded places as V08's reveal would, the site's anchor among them only where the seeded route reaches it | PR |
> | T-V14-36 | the shared scene writer (J399 (R3), (R6)) | a crop's, a site's, a world page's and an atlas view's exports all write through `sceneSet` and nothing else writes a Universal VTT file or a Foundry scene (a lint over `@plat/export`: one writer of each format); every scene of the four is one image and one JSON with the `plat` object, the Foundry scene one `Level` per scene; the world's and the atlas's scenes carry empty sight lines, portals and lights and the crop's its own; a party-audience scene of any of the four carries no DM-only, secret or `dmOnly` thing in its image, its lists or its notes (V14 §2.3's "neither draws, lists, counts, names nor exports"; T-V13-123's and T-V15-36's byte search run over B-CROP and B-SITE too) and no layer, note or object a viewer wrote (T-V13-125) | PR |
*Current text* (b):
> t write, because the key is per document by C14-17's design and a view key written on the document's own page by the DM is neither an event nor a read of one member by another (F14; V15 §4.7 (1)), while a continued member has no host to write it (research/experience/05 §1.6 (2), §4 Q11) (vetoable) |
*New text* (b):
> t write, because the key is per document by C14-17's design and a view key written on the document's own page by the DM is neither an event nor a read of one member by another (F14; V15 §4.7 (1)), while a continued member has no host to write it (research/experience/05 §1.6 (2), §4 Q11) (vetoable) |
> | J-V14.59 | **(J399 (R3); 2026-10-24.)** chose **one shared scene writer, `sceneSet`, named in this volume's convention and called by the world's and the atlas's scenes with their own scene lists** (V14 §5.3; V13 §5.4; V15 §5.5; file z items 1266, 1282, 1288) over a world exporter and an atlas exporter of their own, because the convention — one image and one JSON per scene, the `plat` object, the Foundry scene's `Level` per scene, the size cap and the grid of scenes — is one, was pinned once (item 136 (c)'s re-verification) and must stay byte-compatible across the four callers, and because a world scene differs from a crop's only in what its lists hold (nothing) and what its notes are (the glyphs), which is data the writer takes, not a second writer (vetoable) |
*Current text* (c):
> he picture exports of a site list the numbers in the legend; the **key sheet** as a print preset (`ExportOpts.siteKey: { levels?: number[] }`: the site's name, the rows level by level in walk order, the boundary note) beside the picture export; every row admitted by the export's key as its unit is |
*New text* (c):
> he picture exports of a site list the numbers in the legend; the **key sheet** as a print preset (`ExportOpts.siteKey: { levels?: number[] }`: the site's name, the rows level by level in walk order, the boundary note) beside the picture export; every row admitted by the export's key as its unit is |
> | **BCR-V14-27** the shared scene writer (J399 (R3); J-V14.59) | §11.1 *The `.dd2vtt` profile* (*Per layer*, *Foundry scene JSON*; the sentence "the generation worker wraps the VTT scene around the image") | the profile describes the files per scene and the Foundry scene's levels; no writer is named | the profile names `sceneSet` (`@plat/export`) as the one writer of a scene set in both formats — the Universal VTT file per scene, the Foundry scene with a `Level` per scene — called by the settlement's exports, the crop's and a site's (V14 §5.3), the world page's (V13 §5.4; BCR-V13-56) and the atlas view's (V15 §5.5; BCR-V15-19) with their scene lists; a scene's lists may be empty (a world's and an atlas's are) and its notes are the caller's; one text with BCR-V13-56's and BCR-V15-19's, V13's |
*Evidence:* docs/PROGRESS.md J399 (R3), (R6); V14 §7 as file x item 1239 leaves it (T-V14-35 the last row; the rows' CI column), §9 as file x item 1240 leaves it (J-V14.58 the last row) and §10.1 as file x item 1240 leaves it (BCR-V14-26 the last row); V14 §2.3; item 1288; T-V13-123, T-V13-125, T-V15-36 (items 1270, 1284); the base §11.1 (the profile's *Per layer* and *Foundry scene JSON* bullets; file l items 648–656).


### Volume 9 — §4.3 The tool binding table (T9's world row) and §4.22 The world dialog ((5) the include toggle with several campaigns; (11) the words: Next campaign here, the gap, the party pin)

**1290.** **The party pin binds to T9; the include toggle lists the account's campaigns and admits several; the world page's words for the next campaign and the party pin, on a host-bound world the host's words for where the party is.**
*Requests:* J399 (R1), (R2), (R4); J400 (9) ((c)'s pin strings, revised); V13 §4.2 (item 1263 (d)); V13 §3.1 (5) (item 1261); V13 §3.11.6 (item 1262); V13 §8.5's H47 (item 1271).
*Current text* (a):
> | `deleteTrace`, the world `setAttr`s, `addEvent` (M-W1) | T9 `shape` | the inspector | — | V13 §4.1 |
*New text* (a):
> | `deleteTrace`, the world `setAttr`s, `addEvent` (M-W1), `setPartyPin` (**The party is here**; M-W5; J399 (R4)) | T9 `shape` | the inspector; for the pin a click on the map and the pin's card | — | V13 §4.1 |
*Current text* (b):
>    `landform` or `water` row of the request (`setRequirements`, V13 §4.1). The Basic layer's **Include my⏎   settlements** toggle (on a host-bound world, or one with placed frames)
*New text* (b):
>    `landform` or `water` row of the request (`setRequirements`, V13 §4.1). The Basic layer's **Include my
>    settlements** toggle (on a host-bound world, or one with placed frames; in host mode the toggle lists the account's
>    campaigns, one chip each, and admits SEVERAL — each its region of the one world to be grown, the result cut at
>    generation into one world map member per campaign, each bound to its own (J399 (R2); V13 §3.1 (5), (8); V15 §3.4,
>    §4.1's `carve`), the preview showing the regions' outlines, the host's campaign entitlement gating each chip as it
>    gates one, (8); a world already bound shows one chip, its own campaign, and the words "a next campaign on this world
>    is **Next campaign here**, (11)")
*Current text* (c):
>    **show to players** switch, and the events pin card's action **open the headline** where the host registers a⏎   reader.
*New text* (c):
>    **show to players** switch, and the events pin card's action **open the headline** where the host registers a
>    reader. **Next campaign here** (J399 (R1); V13 §3.11.6's `bindCampaign`; V13 §8.5's H47): on a host-bound world
>    page the action (host mode only; drawn disabled with "the host does not yet offer a next campaign on this world"
>    until H47 lands) opens the host's own campaign maker with this world chosen, with one control of ours on the
>    sheet — **Years between** (a number of years, default none: "the land will have had this long to recover; nothing
>    geological happens") — passed to the host as the gap; the page then reads **before this campaign: {name}, its year
>    n** on the scrub, on the campaign history view and on every pin of the events layer whose week lies before the live
>    campaign's first, a gap's weeks **between {A} and {B}: {n} years after {A}**, an earlier campaign's entry or pin
>    opening read-only ("this belongs to {name}; nothing of it can be changed"), and, between the binding and the new
>    campaign's first window, the legend "awaiting this campaign's first window". **The party is here** (J399 (R4); V13
>    §4.2's T9; V13 §2.2's `PartyPlacement`): a click with the pin tool places the party at the pointer, a drag moves it
>    — each a dated placement on the pin's card ("week 12 — at Kessar", "week 13 — in the wild, 40 km east of Kessar:
>    teleported from the Rift"), the card's **Between this and…** (after a click on a town, a click on a second town makes
>    it "between Kessar and Aldmere"), its **Show the players** switch (on; off makes that placement the DM's alone) and
>    its DM-only **Show earlier placements** switch, which draws the earlier ones as dated dots and never a line, arrow or
>    road between any two; the card says, where a DM looks for a journey, "the map never plots the party's road: the
>    travel times on the routes are information"; a placement dated after the world's week is refused with "the party
>    cannot be placed in a week that has not come" (`refuse.world.pinDate`), and a viewer's click places nothing
>    (`refuse.viewer`: "players see the map; the game master moves the party"). **On a host-bound world the host keeps
>    where the party is** (J400 (9); V13 §3.11.6's `requestPartyPresent`): the pin draws the host's word — "the party is
>    at Kessar" where the game master set it in the host, "last heard at Kessar, week 8" where the host last heard —; a
>    click on a town, or between two, is sent to the host as the game master's own word that the party is there, the
>    card reading "week 12 — at Thornhold: sent to the host; the players see it after the next advance" with a hollow
>    pin until the next advance carries it, then "week 12 — at Thornhold (the host has them here)", or, where the next
>    advance places them elsewhere, "the host has the party at {town}" with the pin moved there; a click away from every
>    town reads "week 13 — in the wild: your picture; the host is not told"; where the host does not yet follow the
>    party, every placement reads "your picture" and nothing is sent. No identifier of V13's appears in a card string
>    (T-V9-91).
*Evidence:* docs/PROGRESS.md J399 (R1), (R2), (R4); J400 (9); V13 §3.11.6 (item 1294); V09 §4.3 as file w leaves it (the T9 row), §4.22 (5) as file r item 1004 and file w leave it (the include toggle) and §4.22 (11) as file y item 1248 and file w item 1194 leave it (the words); V13 §4.2's T9 (item 1263 (d)); V13 §3.1 (5), (8) (item 1261); V13 §3.11.6 (item 1262 (c)); V13 §5.1, §5.2 (items 1264, 1265); V13 §8.5's H47 (item 1271 (d)); T-V9-91 (no V13 identifier in a card string); experience read 01 §4 Q5; experience read 05 §1.1, §2.3.


### Volume 9 — §5.10 The export dialogs (the world and the world map as scenes)

**1291.** **The Tabletop tab on a world page and on a world map page writes the page as one scene, with a grid that carries no travel time.**
*Requests:* J399 (R3), (R5), (R6); V13 §5.4 (item 1266); V15 §5.5 (item 1282); V14 §5.3 (item 1288).
*Current text:*
> **The tabletop details (R18; `research/ux/tool-survey.md` E4).** The scene exporter writes windows as open portals
*New text:*
> **The world and the world map as scenes** (J399 (R3); V13 §5.4; V15 §5.5; written by V14 §5.3's shared writer). On a
> world page the **Tabletop** tab writes the page as ONE scene (a grid of scenes past the size cap, shown in the preview
> as the town's is): the zoom stop (the current stop by default), **What it shows** as every tab has it (the DM's
> picture, or what the party knows — the players' scene, with nothing of the game master's in it), the **Grid** —
> squares or hexes at a size in **kilometres per cell** (the values the stop's scale divides evenly, the one nearest
> 100 px first) or **none** —, labelled "a grid for your tabletop; it carries no travel time: the routes' labels do"
> (J399 (R5)), and **Notes** (on): the towns and the sites as the scene's notes, by name, the game master's scene with
> each one's why-sentence beside it. On a world map page the tab writes the composed view at its level the same way —
> on the true plane, never warped, "a scene is a map" —, one note per world map member and the gaps left empty.
> Neither scene carries walls, lights or a layer a player may write (J399 (R6)); the party's pin, where the game master
> shows it, is a note. File names `{world}-{stop}-{cols}x{rows}.dd2vtt` and `{worldmap}-{level}-{cols}x{rows}.dd2vtt`,
> the Foundry scene beside each as for a town.
>
> **The tabletop details (R18; `research/ux/tool-survey.md` E4).** The scene exporter writes windows as open portals
*Evidence:* docs/PROGRESS.md J399 (R3), (R5), (R6); V09 §5.10 as it stands (the Tabletop tab's row; the tabletop details paragraph; "What it shows" on every tab); V13 §5.4 (item 1266); V15 §5.5 (item 1282); V14 §5.3 (item 1288); the base §11.1's profile (the size cap; the grid of scenes; the overview).


### Volume 9 — §7.1 The bars (T-V9-97, T-V9-98 after T-V9-96) and §9 Decisions (J-V9.165 – J-V9.168 after J-V9.164)

**1292.** **The strings' tests and the four decisions.**
*Requests:* J399 (R1)–(R6); J400 (9) (T-V9-98 and J-V9.168 added); items 1290, 1291.
*Current text* (a):
> ns picker's keys (V09 §4.22 (11); file v's ask) | per lens the area-fill switch reads off by default and draws the fill labelled as V13 §5.9 says; the court viewpoint's court picker and its show-to-players switch; "open the headline" on a pin card only where the mock host registers a reader | M-W5 |
*New text* (a):
> ns picker's keys (V09 §4.22 (11); file v's ask) | per lens the area-fill switch reads off by default and draws the fill labelled as V13 §5.9 says; the court viewpoint's court picker and its show-to-players switch; "open the headline" on a pin card only where the mock host registers a reader | M-W5 |
> | T-V9-97 | the campaigns pass's words (V09 §4.3, §4.22 (5), (11), §5.10; J399 (R1)–(R6)) | on a host-bound world of the mock host: **Next campaign here** reads disabled with its reason until the mock host offers the binding, then opens the host's maker with **Years between** at none; after a binding with two years the scrub, the history view and an earlier pin read "before this campaign: {name}, its year n", a gap week "between {A} and {B}: 2 years after {A}", and an earlier entry opens read-only with its sentence; the include toggle lists the mock host's campaigns, admits two with their regions previewed and refuses a third chip exactly as the mock host's entitlement answers; **The party is here** places and drags a dated placement, its card lists each with its words, **Show the players** off hides it from the party picture, **Show earlier placements** draws dots and no line (a pixel search over the layer finds no stroke between two dots), a placement in a future week and a viewer's click answer with their sentences; the Tabletop tab on a world page offers the stop, the audience, the grid in kilometres with its "carries no travel time" label and Notes, and on a world map page the level and the gaps empty; no identifier of V13's or V15's in any of these strings (T-V9-91's lint) | M-W5; M-W6; M-ATLAS-A |
> | T-V9-98 | the party's place on a host-bound world (V09 §4.22 (11); J400 (9)) | on a world bound to the mock host following the party: the pin reads "last heard at Kessar, week 8"; a click on Thornhold draws the hollow pin and "sent to the host; the players see it after the next advance", and the mock host's next advance carrying it reads "(the host has them here)", while a next advance naming Kessar reads "the host has the party at Kessar" with the pin moved there; **Between this and…** then a click on Aldmere reads "between Thornhold and Aldmere"; a click in the wild reads "your picture; the host is not told" and the mock host receives nothing; under a mock host not following the party every placement reads "your picture"; no identifier of V13's in any of these strings (T-V9-91's lint) | M-W5 |
*Current text* (b):
> 9.164 | chose the lake verb's three meanings named by consequence — hold it, change the basin, cut the outlet — the first the default (J397 (M35); experience read 04 Act 5; file w item 1194), over three tools the DM must already know, because the consequence is the only thing that tells them apart |
*New text* (b):
> 9.164 | chose the lake verb's three meanings named by consequence — hold it, change the basin, cut the outlet — the first the default (J397 (M35); experience read 04 Act 5; file w item 1194), over three tools the DM must already know, because the consequence is the only thing that tells them apart |
> | J-V9.165 | chose **The party is here** as T9's one-click pin with a dated card, two switches and no road (J399 (R4); V13 §2.2's `PartyPlacement`; file z item 1290), over a journey tool that plots a route and an arrival, because the owner's party "can teleport fly etc outside if the road or circumvent it" and a plotted road would be wrong whenever the table needed it, while a dated list of where they were is what the history view and the party's known map need |
> | J-V9.166 | chose the Tabletop tab's world rows with the grid in **kilometres per cell** labelled "a grid for your tabletop; it carries no travel time: the routes' labels do", and the world map's scene on the true plane (J399 (R3), (R5); file z item 1291), over a travel grid priced in weeks per cell, because the world's clock is the host's week and the routes already carry the only travel times the map states (V13 §5.1); a priced cell would be a journey tool by another name |
> | J-V9.167 | chose **Next campaign here** as a world-page action that opens the host's own campaign maker with this world chosen and one control of ours, **Years between** (J399 (R1); V13 §8.5's H47; file z item 1290), over a binding sheet of the map's own, because the campaign is the host's record and its maker already asks everything but the world and the gap; the map's words are the history labels, which are its |
> | J-V9.168 | chose the pin card's two kinds of words on a host-bound world — "sent to the host; the players see it after the next advance" for a town or a pair, "your picture; the host is not told" away from every town — with the host's own words for where the party is ("the party is at", "last heard at", "the host has the party at") (J400 (9); V13 §3.11.6; file z item 1290 (c)), over one pin that reads the same wherever it is dropped, because on a host-bound world the host keeps where the party is, and a game master who drops the pin must see whether the host was told and when the players will see it |
*Evidence:* docs/PROGRESS.md J399 (R1)–(R6); J400 (9); V09 §7.1 as file y leaves it (T-V9-96 the last row) and §9 as file w item 1197 leaves it (J-V9.164 the last row); items 1290, 1291; T-V9-91; V13 §5.1 (the routes' labels); V13 §8.5's H47 (item 1271 (d)); experience read 05 §1.1, §1.6.


### The base — §11.1 Formats (the VTT row), *The `.dd2vtt` profile* (*Scope*) and §11.2 `ExportOpts.vtt` (the world page and the atlas view as scenes)

**1293.** **The base's VTT profile admits one scene per world page at a zoom stop and per atlas view at a level; `ExportOpts.vtt` gains `world` and `atlas`.**
*Requests:* J399 (R3); BCR-V13-56 (item 1273), BCR-V15-19 (item 1287), BCR-V14-27 (item 1289); V13 §5.4 (item 1266); V15 §5.5 (item 1282); V14 §5.3 (item 1288).
*Current text* (a):
> (the profile below); model widths only | grid alignment error 0 px per cell (O11 g); no manual steps on import |
*New text* (a):
> (the profile below); and, for a world document and an atlas, one scene per world page at a zoom stop and per atlas view at a level — the page's or the view's picture for the chosen audience as the scene's background image, a grid in kilometres per cell the user chooses as presentation only (a cell carries no travel time), the settlement glyphs, sites and members as the scene's notes, no sight lines, no portals, no lights (V13 §5.4; V15 §5.5; BCR-V13-56, BCR-V15-19; the one writer of every scene set `sceneSet`, V14 §5.3, BCR-V14-27) —; model widths only | grid alignment error 0 px per cell (O11 g); no manual steps on import |
*Current text* (b):
> * **Scope:** a rectangle or a district chosen by the user — by default the current view snapped to whole grid squares —
*New text* (b):
> * **Scope:** for a settlement document, a rectangle or a district chosen by the user — by default the current view snapped to whole grid squares — (for a world document the world page at a zoom stop and for an atlas its composed view at a level, each one scene for one audience by V13 §5.4's and V15 §5.5's rule: the picture as the background, the grid in kilometres per cell as presentation, notes, no sight lines, portals or lights; split past the size cap below as any scope is; `ExportOpts.vtt.world`, `.atlas`, §11.2)
*Current text* (c):
>   vtt?: { squareM?: number /* 1.5 (5 ft), or 1 */; pxPerSquare?: number /* 100; at least 50 */; plainPng?: boolean /* the `{cols}x{rows}` PNG beside it; false */;
*New text* (c):
>   vtt?: { squareM?: number /* 1.5 (5 ft), or 1 */; pxPerSquare?: number /* 100; at least 50 */; plainPng?: boolean /* the `{cols}x{rows}` PNG beside it; false */;
>     world?: { stop: 0|1|2|3; audience: 'dm'|'party'|'public'; grid: { kind: 'square'|'hex'; kmPerCell: number } | 'none'; notes?: boolean /* true */ } /* a world document only: the world page at the stop as one scene for the audience (V13 §5.4; BCR-V13-56); `squareM` and `pxPerSquare` are not read — the cell is kilometres and its pixels the stop's */;
>     atlas?: { level: number; audience: 'dm'|'party'|'public'; grid: { kind: 'square'|'hex'; kmPerCell: number } | 'none'; notes?: boolean /* true */ } /* an atlas document only: its composed view at the level on the true plane as one scene for the audience (V15 §5.5; BCR-V15-19) */;
*Evidence:* docs/PROGRESS.md J399 (R3); the base §11.1 as file l items 648–656 and file x item 1240 (BCR-V14-26) leave it (the formats table's VTT row; the profile's *Scope* bullet; the size cap and the grid of scenes) and §11.2's `ExportOpts.vtt` as BCR-V14-8 leaves it (`squareM`, `pxPerSquare`, `plainPng`, `scene`, `crop`); V13 §10's BCR-V13-56 (item 1273 (a)); V15 §10.1's BCR-V15-19 (item 1287 (a)); V14 §10.1's BCR-V14-27 (item 1289 (c)); V13 §5.4, V15 §5.5 and V14 §5.3 as items 1266, 1282 and 1288 leave them.

COMPLETE (revised under J400 (9), (10), PENDING FABLE REVIEW): items 1256–1295; fragments 97; dry-run: all quotes matched once in order (39 change items, 97 fragments, on fresh copies of docs/volumes/V13-world.md, V15-atlas.md, V14-sites.md, V09-application.md and docs/ARCHITECTURE.md as they stand on disk after files v, w, x and y); clean-room lint: no hit
