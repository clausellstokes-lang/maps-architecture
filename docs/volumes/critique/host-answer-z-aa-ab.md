# Critique of amendments z, aa and ab (docs/AMENDMENTS-2026-10-24z.md, -aa.md, -ab.md) — the campaigns pass revised for the party's place, its owner-facing records, and the host's answer adopted (J399, J400)

> PENDING FABLE REVIEW — written by Opus 5.5 under the J375 addendum; to be retrovalidated by a Fable seat.

Written by the session's review seat critique/host-answer (Opus 5.5, high) on 2026-10-24 under the owner's delegation
(J399; J400's "Do it"). None of the three files was edited by this seat; nothing is applied; nothing is committed.

PROGRESS
- 0 Method and inputs read; the dry run; the clean-room lint | done
- 1 Findings HA-01 – HA-25 (no blocker; 8 majors; 17 minors) | done
- 2 Coverage J399 R1–R6 and J400 (1)–(22) (each ruling → the items that carry it, each read, against the host's own words) | done
- 3 The seams between the three files and the volumes (every name used twice) | done
- 4 Substance: the six questions of the brief, the ab seat's two choices | done
- 5 The checks that hold; the verdict | done

## 0 Method and inputs read

Read whole, in order: the seat brief `K-review-host-answer.md`; `docs/PROGRESS.md` J398, J399 and J400 in full;
`research/sf/host-reply-2026-10-24.md` (the host's answer — the authority for every J400 disposition below);
`research/sf/host-rulings-mirror.md`; the briefs that bound the three files (`00-preamble.md`, `G-file-z.md`,
`I-revise-z.md`, `J-file-ab.md`); `docs/volumes/critique/experience-vwx.md` (the form of this file); then
`docs/AMENDMENTS-2026-10-24z.md` (1 281 lines: the revision note, the head, the closure table, the owner-rule item 1256
and the 39 change items 1257–1295), `-aa.md` (91 lines; items 1301–1305) and `-ab.md` (1 228 lines; the owner-rule item
1306 and the 52 change items 1307–1358), every current and new text. Read in the APPLIED copies this seat's dry run wrote
(`…/scratchpad/experience-pass/review-host/out/after_ab/`; "applied l." below is a line of that copy): V13 §1.2, §1b.1–§1b.3
(the `LensFacts`, `PolityFacts`, `PastFacts` and `WorldPort` rows), §2.1 (the week's source; a consumed edit inside a
discarded window unsealed), §2.2 (`WorldWhere`, `PartyPlacement`, `CampaignRecord`, `HostRegime`, `PolityFacts`,
`PolityLink`, `PolityRelation`, `PastRef`, `PastFact`, `PastFacts`, `LensFacts`, `CampaignFacts`, `RenderedWorld`,
`AdvanceWindow`), §2.4's `CampaignTimeline`, §2.6, §2.7, §3.8 (8), §3.9 (9)–(17), §3.11.6 (the consumption law, the canon
paragraph, `pastWindow`, `canonized`, `requestPartyPresent`, laws (3), (9)–(12)), §4.1, §5.1 (`routes`, `sway`, `events`,
`patrols`, `partyPin`), §5.2, §5.8 (2), (4), (7), (8), §5.9 (2), (3), (5), (6), §7.4 (T-V13-7, -41, -42, -46, -79, -81,
-100, -103, -119 – -139), §7.5, §8.2, §8.5 (H9, H12, H13, H16, H22–H25, H31–H48), §9, §10, §11; V15 §0, §3.6 (4), (6),
§3.7, §3.11's worked example, §4.1, §5.5, §7.3–§7.5, §8, §9, §10; V14 §2.3, §3.13, §5.3, §7, §9, §10; V09 §4.3, §4.22
(5), (11), §5.10, §7.1, §9; the base §6.4 *Retention of old output versions*, §7.1's outcome table, §7.7, §11.1, §11.2,
§11.4; INDEX §1, §6; SUMMARY "Decisions that are yours"; the owner brief's settled-rulings paragraph and §9.

Executed: (1) the dry run `review-host/dryrun_host.py` — seat ab's `dryrun_ab.py` parser (the `dryrun_vwx.py` lineage),
extended to write the copies after each file and to lint all three files — over FRESH copies of the eight targets taken
from disk: z, then aa on z's result, then ab; every current text matched exactly once at its turn, every new text exactly
once after; the stray-line check (a new text followed by an unprefixed line) raised nothing; a census of every
`*Current text` / `*New text` marker line agrees with the parsed fragments (z 97/97, aa 5/5, ab 130/130); a second run
applying the items in NUMERIC order (z's 1294 and 1295 stand by section, after 1262 and 1270) also passes and yields
byte-identical targets, so the apply seat may follow either order. (2) The clean-room lint over every new text bound for
the base and the volumes (218: z 97, ab 121; aa's five and ab's nine are owner-facing) with the preamble's token list and
the K brief's additions, then an advisory scan for the host's other design and unit names (`pastRef`, `rootId`,
`liegeId`, `polityClass`, `canonizedAt`, `spatialLedgers`, `bodyDefenceOf`, `polity_name_offer`, `OD-`, `law 3`, `World
Clock`, `PL`, `PA`, `BD`, `MN`, `CN`, `C9`, `C14`, …). (3) The stale-sentence greps of the brief's §3 over the applied
copies. (4) The seam census of §3 (every record, field, function, key, H row and law (9) word used in two places,
compared by exact text in the applied copies). (5) The comparison of every J400 disposition with the host's own words
(§2).

Finding ids are `HA-nn`; each names its file(s) and item(s). Severity as the brief's: BLOCKER (a dry-run failure; a
ruling carried nowhere or contrary to J399/J400), MAJOR (a disposition carried differently from the host's answer; a
live survivor contradicting J400; a name or shape two places state differently; a clean-room hit), MINOR (a wording, a
count, a citation, a silent cost). Quotes are exact (⏎ a line break).

**Count: 25 findings — 0 blockers, 8 majors (HA-01 – HA-08), 17 minors (HA-09 – HA-25).** By file: z 11 (HA-01, -02,
-04, -09, -10, -11, -14, -15, -17, -21, -22), aa 1 (HA-20), ab 18 (HA-03, -04, -05, -06, -07, -08, -10, -11, -12,
-13, -14, -16, -18, -19, -20, -23, -24, -25); several are shared. **Dry run: OK end to end. Coverage: J399 R1–R6 and J400
(1)–(22) all carried, none contrary to the host's answer.**

## 1 Findings

### 1.1 Blockers

None. Every current text of z, aa and ab matches once at its turn and every new text once after (§5.1); every ruling of
J399 and J400 is carried by an item that says what the ruling says (§2).

### 1.2 Majors

**HA-01 — major — z (item 1259 (c); item 1270, T-V13-126) — the clean room: two of the host's design names are written
into V13 as port values.** Item 1259 (c): "`partySource?: 'presentAt'|'lastHeard' /* how the host holds the whereabouts:
the DM's present-at, or the last heard — the legend's "the party is at {seat}" or "last heard at {seat}, week n" */`";
T-V13-126: "the mock host sending the party's whereabouts (`partySeats` [Kessar], `partySource` `lastHeard`, `partyStamp`
8)" and "the mock host's next window carrying [Thornhold] as `presentAt` clears the warning". `presentAt` and `lastHeard`
are on the K brief's lint list: the host's answer names them among "the FP design's own names … unbuilt" ("`whereaboutsOf`,
`presentAt`, `lastHeard` (PT)"), and the mirror repeats it. J400 (9) and the I brief typed the field so, which is why the
reviser wrote it; the preamble's rule ("no host … internal identifier") still binds the volume's text. *Fix (z):* item
1259 (c) types `partySource?: 'present'|'heard' /* how the host holds the whereabouts: the DM's present-at act in the host
(`present`), or the last heard (`heard`) — the adapter folder mapping the host's own source words onto these two — the
legend's … */`; T-V13-126 reads "`partySource` `heard`" and "carrying [Thornhold] with `partySource` `present`"; J-V13.198
adds "the source words the port's own, the host's mapped by the adapter folder". (Or the manager records a waiver in
J-V13.198 that these two words are the wire values the host asked for — the same then holds for `pastRef`, HA-25.)

**HA-02 — major — z (items 1259 (b), 1264 (d), 1266 (a), 1278 (b), 1284 (a) T-V15-37, 1286 J-V15.51) against z item 1262
(d) (law (9)) and J400 (9) — a map-only placement becomes the party's drawn CURRENT place on a host-bound world, which law
(9) and J400 (9) both forbid.** J400 (9): "a pin off any settlement is a map-only picture feeding only the map's known
set". Law (9) (item 1262 (d)): "**the party pin** the DM's dated placement of the party (… on a host-bound world a
present-at request the host carries out, or the map's own picture — never the party's place)". But §2.2 (item 1259 (b)):
"The party's CURRENT place on a host-bound world is the host's whereabouts, unless the DM's latest placement is later than
the host's `partyStamp`: a map-only placement then drawn as the DM's picture"; the `partyPin` row (item 1264 (d)): "its
CURRENT place as the party glyph — … on a host-bound world the host's whereabouts of the party … unless the DM's latest
placement is later than the host's `partyStamp` — a map-only placement off every host-bound settlement then drawn as
"where the game master narrates them, week n""; the world scene's party note is "the party's current place" (item 1266
(a)); and V15's reach offer starts from "the DM's party pin's latest placement where it is the map's picture, later than
the host's stamp" (item 1278 (b); T-V15-37: "with the stamp earlier than a map-only placement near the seam the offer is
drawn from that placement"). So on a host-bound world the party glyph, the players' scene note and the atlas's reach
offer can all follow a placement the host never holds — two writers of where the party is drawn, the one thing J-V13.198
chose against. *Fix (z; recommended):* (i) item 1259 (b): "The party's CURRENT place on a host-bound world is the host's
whereabouts, always; a map-only placement later than the host's `partyStamp` is drawn BESIDE it as the DM's narration
("where the game master narrates them, week n"), never in its place, and a pending one as pending;" (ii) item 1264 (d)
likewise — the party glyph at the host's whereabouts, a later map-only placement a narration mark of its own (the notice
style), never the party glyph; (iii) item 1266 (a): the scene's party note at the host's whereabouts, a later map-only
placement a second note in the narration's words, each where the audience admits it; (iv) item 1278 (b), T-V15-37 and
J-V15.51: the reach offer is drawn where "a place of the party's known set" stands within `snapEdgeKm` of the seam — the
host's whereabouts or a map-only placement, each a known cell as J400 (9) allows — and never "the party's current place".
*(Or the manager rules the picture precedence, and law (9), J-V13.198 and J400 (9)'s reading in item 1256 say that a later
map-only placement is drawn as the party's place on the DM's and the players' pictures; as filed, the three disagree.)*

**HA-03 — major — ab (items 1309 (a), 1314 (a), 1329 T-V13-132, 1333 (c) H13) — the host's membership walk carries no
covert or audience marker, so adopting it as the allegiance graph draws a covert membership on a player's picture.** Item
1309 (a): "`walk?: { seat: string; root: string; liege?: string; tier: Rung; class: string; basis: string }[]`"; item 1314
(a): "where the polity window carries the host's walk …, the allegiance graph IS the walk". The raw link the walk replaces
carries `covert?: boolean` (applied l. 1048), and the sway's own test holds "(j) belief — a covert link never appears on a
player surface" (T-V13-41); T-V13-119, T-V13-123 and T-V14-36 assert no covert row on a party picture or scene. With the
walk adopted, a seat whose vassalage the host holds covert (a puppet seat, a secret oath) is drawn inside its root's
allegiance on every audience's picture: the drawing rules were kept over the walk (J400 (6)), its audience rule was not.
*Fix (ab):* item 1309 (a)'s walk entry gains `covert?: boolean /* the host's own: a membership it holds hidden — drawn as a
covert link is, on the DM's picture alone; a player's or the public's picture treats the seat as rooting its own
allegiance (V13 §3.9 (12); T-V13-41 (j)) */` with the sentence "a walk row whose membership rests on a raw link sent
`covert` is covert too"; item 1314 (a) adds "a covert membership of the walk drawn only on the DM's picture, as a covert
link is"; T-V13-132 gains "a vassal the walk sends covert stands in its root's allegiance on the DM's picture and roots its
own on the party's and the public's"; H13 (item 1333 (c)) lists "whether the host holds it covert" among the walk's fields.

**HA-04 — major — z (items 1262 (c), 1263 (a), 1294 (b)) and ab (items 1307 (e), 1318 (b), 1341 BCR-V13-59) against V13
§7.4's T-V13-7 and §1b.1's `WorldPort` row (applied l. 657) — a closed list the new inputs do not join.** T-V13-7 (bar 9)
holds "no `WorldPort` method takes a host fact as a write into the map except the recorded inputs of V13 §3.11.6 —
`bindSeat`, `unbindSeat`, `importSeats`, `costLaw`, `travelLaw`, `hostRequires`, `genesis`, `network`, `polity`, `events`,
`canonized`, `consumed`, `campaignFacts`, `dossierUpdated` — each under its manifest's key list"; z adds two inbound
recorded inputs (`bindCampaign`, `closeCampaign`) and ab a third (`pastWindow`), and neither file amends the list, so the
dependency lint fails on the first build of R1 or of the realm's past. The `WorldPort` row (as ab item 1307 (e) leaves it)
lists `pastWindow` but neither `bindCampaign` nor `closeCampaign`, and its outbound list ("the outbound offers
`physicalChange` and the DM-placed site offers") names no `requestPartyPresent`; BCR-V13-57 gives the base the two
bindings as edit kinds only, never as inbound recorded inputs of §7.7 and §11.4. *Fix (ab, quoting as z leaves it):* a
fragment on T-V13-7: "`campaignFacts`, `dossierUpdated` — each under its manifest's key list" → "`campaignFacts`,
`dossierUpdated`, `bindCampaign`, `closeCampaign` (J399 (R1)), `pastWindow` (J400 (21)) — each under its manifest's key
list; the outbound `requestDossierUpdate` and `requestPartyPresent` the user's own acts, never a write of the module";
item 1307 (e) reads "`canonized` (and its revocation, J400 (7)), `consumed`, `bindCampaign`, `closeCampaign` (J399 (R1)),
`pastWindow` …" and the row's outbound list gains "the DM's requests `requestDossierUpdate` and `requestPartyPresent`
(J400 (9))"; BCR-V13-57 (z item 1273 (a)) adds "§7.7's world port paragraph and §11.4 gain the inbound recorded
`bindCampaign` and `closeCampaign` (author `host`)".

**HA-05 — major — ab (item 1352, the base §6.4; item 1312; item 1341 BCR-V13-58; item 1340 J-V13.207; T-V13-134) — the
version promise rests on a package store the base does not have.** Item 1352: "it fetches exactly that version's model
packages beyond the browser window by their content hashes (from the library's package store, which keeps every version's
chunks as the CLI keeps every version)"; J-V13.207: "because the package store already holds every version's chunks by
content hash and the CLI already installs any version". The base's §6.4 holds a browser window of three lazily loaded
chunk sets and "The Node CLI replays any published output version by installing that exact package version"; no "package
store" is defined anywhere in the base (no hit for the phrase), so the base would name, with a definite article and as
existing, a for-life service that serves any old version's chunks to a browser by hash. The promise is right and the host
asked it (S4: "SERVE EVERY VERSION YOU HAVE ISSUED, FOR LIFE"); the mechanism is new and unbudgeted. *Fix (ab):* item
1352 defines it as new: "… from **the version archive** — every published output version's model packages, immutable and
addressed by content hash, kept at the library's distribution origin for the library's life (new with this paragraph;
BCR-V13-58; it grows by one version's packages per release, measured at M3a beside the window's ≤ 150 KB) — …";
BCR-V13-58 says "the base gains the version archive"; J-V13.207 reads "because the CLI already installs any published
version and the archive keeps the same packages fetchable by hash" (no "already holds"); T-V13-134 names "the version
archive fixture".

**HA-06 — major — ab (items 1356, 1358) — two owner-facing survivors contradict J400.** (a) The owner brief's settled
rulings (its l. 104–106, untouched by aa and ab): "who keeps a gate under the sway — the host's intermediary⏎settlement
until the sway has passed its soak, the crossing holder then offered as a per-gate policy the host may adopt⏎(J385; V13
§11);" — J400 (12): "the gate keeper's legend reads "tolls to {seat}" with no "until the sway soaks", and every sentence
that expected a host read of the sway after a soak says the host reads none" (V13 §11's own paragraph is corrected by item
1342 (c); the brief's is not). (b) SUMMARY's experience bullet (its l. 256–257): "The fifteen things SettlementForge must
do⏎  for them are written as prompts you can paste into a SettlementForge session
(`research/sf/host-prompts-2026-10-24.md`);" — the host: "No prompt is pasted as written … The host takes dispatch from
the owner, in chat, at each unit"; J400: "the prompts file marked superseded". *Fix (ab):* a fragment on the brief: "who
keeps a gate under the sway — the host's intermediary settlement, the crossing holder offered to SettlementForge only and
read by nothing there until its own ruling admits a reader (J385; J400 (12); V13 §11);"; item 1356 gains a fragment (d)
on SUMMARY: "The fifteen things SettlementForge must do⏎  for them went to it as prompts
(`research/sf/host-prompts-2026-10-24.md`, now superseded): it answered each with its own ruling, nothing is pasted as
written, and you dispatch each SettlementForge unit there in chat;".

**HA-07 — major — ab (items 1326 (b), 1343 (a)) — three live sentences still treat the court viewpoint as fed.** J400
(10): "`LensFacts.courts` stays absent until the host's information program rules a fold row; the court viewpoint and the
court audience ship their degraded arm". Untouched: (a) V15 §3.11's worked example, step 7: "**Varn's court's map** (M9):
a⏎   viewpoint `court:<Varn's capital>` on Varn — a host-bound member of a campaign that records belief —: the DM sees⏎
Varn's court's picture of its own realm "as it believes it, as of week n", a believed strength band beside each⏎   seat
with its `believed.integrity` word (one `planted`: …) … marked⏎   shared, it is the looted map the party reads"; (b) V15
§0 *In plain words*: "or as another court believes the⏎world to be — a looted map: that court's reach and its beliefs, a
planted lie included"; (c) V09 §4.22 (11): "the court viewpoint's court picker with its⏎   **show to players** switch"
(and T-V9-96), while V13 §5.9 (2) as item 1326 (b) leaves it says "meanwhile no host-bound world offers this viewpoint".
*Fix (ab):* (a) after "a host-bound member of a campaign that records belief —" insert "once the host's information
program sends a court's beliefs (V13 §5.9 (2); J400 (10)); until then Varn's court's map is its own reach over the public
record under `W_ATLAS_COURT_UNSENT`, with no believed band or register word —"; (b) after "a planted lie included" insert
"(once SettlementForge's information program sends a court's beliefs; until then the court's reach over the public
record)"; (c) "the court viewpoint's court picker (drawn only where the host sends a court's beliefs: none until the
host's information program rules, J400 (10)) with its **show to players** switch", T-V9-96 likewise.

**HA-08 — major — ab (items 1325 (b), 1343 (b), 1329 T-V13-139, 1344 T-V15-38) — on a sequel world the realm's past is
not kept apart from an earlier campaign on every surface.** J400 (21): "draws "the realm's past" before week 0 in years …
kept distinct from an earlier campaign played on the same world (J399 R1)". (a) V15's old map (item 1343 (b)): "an old map
dated at or before a member's week 0 draws that member's realm past as its figures" — on a sequel member "a member's week
0" is either the world clock's week 0 (the first campaign's) or the live campaign's `fromWeek`, and "that member's realm
past" is one of several (`PastFacts` is per `CampaignRecord`); read the second way, an old map dated in week 250 of
campaign A draws campaign B's past as figures over A's plates — the conflation J400 (21) forbids. (b) The scrub (item 1325
(b)): "the scrub runs back beyond the world clock's week 0 into a strip of its own … one strip per campaign" places B's
past BEFORE A's play on the world's own axis, though B's past is counted back from B's first week and may tell of years A
was played (the host writes B's past; nothing reconciles it with A's record). The ab seat's choice of a strip of its own,
never interleaved, is right (§4); its wording claims a position on the world clock that law (11)'s new clause denies.
*Fix (ab):* (a) item 1343 (b): "an old map dated at or before the world clock's week 0 draws the realm's past of the
member's FIRST campaign (its `CampaignRecord` with `fromWeek` 0) as its figures …; a later campaign's realm past is never
an old map's figures, and an old map dated inside an earlier campaign's weeks draws that campaign's plates (above)";
T-V15-38 gains the sequel clause. (b) item 1325 (b): "the scrub gains, AHEAD of the world clock and claiming none of its
weeks, a strip of its own per campaign whose host sent a past, in YEARS …; on a sequel world each strip is headed "the
realm's past, as {name} began", counted back from that campaign's first week, its legend adding "the host's history as
{name} began — it may tell of years when {earlier} was played here"; the strips stand in the campaigns' order"; item
1310's `PastFacts` comment and item 1324 likewise; T-V13-139's sequel clause reads the legend.

### 1.3 Minors

**HA-09 — minor — z (items 1263 (a), 1294 (b); T-V13-126) — a back-dated present-at placement asks the host to write its
past.** `setPartyPin`'s `week?: Week /* the document's week unless back-dated; later than it refused … */` and
`requestPartyPresent`'s "its `week` the placement's on the host's clock (law (11))": a pin dropped at a town and dated
week 8 at document week 12 sends a present-at act dated in the host's committed history, which the host's party record
writes only at its present (the promise: an installed campaign is never re-decided). *Fix (z):* item 1263 (a) and item
1294 (b): "a placement at a host-bound settlement or pair is sent only when dated at the document's week (the host's
present); a back-dated one is a map-only placement and sends nothing"; T-V13-126 gains the clause.

**HA-10 — minor — z (item 1270 T-V13-124) against z (item 1262 (c) `bindCampaign`'s `gapYears`) and ab (item 1310
`PastRef.years`, `PastFact.years`) — the weeks lint forbids the years both files send.** T-V13-124: "every time-typed field
of … the port's messages in both directions … is a `Week` or a count of weeks — the lint over the declarations admits no
day, hour or finer date, `TravelLaw.daysPerWeek` (a divisor) alone excepted"; `gapYears: number` and `years: number` are
neither. Also `years … ≥ 1` refuses a past fact the host dates within the year before week 0. *Fix:* T-V13-124 reads "is a
`Week`, a count of weeks or a count of whole years (`gapYears`; the realm's past, never translated to weeks)"; item 1310
reads "whole years before the campaign's week 0, ≥ 0 (0: within the year before it)".

**HA-11 — minor — ab (items 1324, 1325 (b)) against z (item 1260 (a)) — the history view's realm's-past head has no
type.** `CampaignTimeline.entries` is "`{ week: Week; campaign?: string …; doc: Uuid …; kind: …`", every field but
`campaign` required; item 1324 heads the timeline with entries that have "no document and no week". *Fix (ab, quoting as z
leaves it):* `CampaignTimeline` gains `past?: { campaign: string; facts: { ref: string; years: number; pencilled: boolean
}[] }[] /* the realm's past heading the timeline, one group per campaign whose host sent one (J400 (21)); opens nothing */`.

**HA-12 — minor — ab (items 1318 (c), 1341 BCR-V13-59, 1340 J-V13.206; T-V13-133) — two channels for one revocation, no
precedence.** "sent with `revoked: true`, or read so from the window replace that discards that advance". If the message
precedes the replace, the canon is un-adopted while the plates still hold the first advance's weeks. *Fix:* "the window
replace that discards the first advance is the revocation (V13 §2.1's rule for a consumed edit); a `canonized` with
`revoked: true` confirms it and is folded with that replace, never before it"; T-V13-133 tests the order.

**HA-13 — minor — ab (item 1320 (d), law (12)) against ab (item 1317 (b)) — "inside an advance" said two ways.** Law (12):
"that no port answer is asked inside an advance (the consumption law above)"; the canon paragraph: "adopted at the head of
the first advance inside that advance's one commit, so a refusal of the canon request by this module refuses that advance
whole". *Fix:* law (12) reads "no port answer asked inside a tick — the canon request at the first advance's head, inside
its one commit (J400 (7)), being the consumption law's advance-head case".

**HA-14 — minor — z (item 1271 (a)) and ab (items 1334 (a), 1354, 1358) — "born canonized" survives beside the grace rule
as the host takes it.** H22 keeps its heading "a world from this module **canonized at the campaign's birth** (J384 (6);
J386)" and "so new campaigns are born canonized as J386 and J388 rule" (the host: "Cite that [requirement 17], not
J386/J388"; S3 (e): its texts that said the canon is "born with the campaign" "now say it is adopted at the first
advance"); the brief keeps "a world from this module⏎canonized at the birth of every new campaign" (l. 110–111) and "a
native world canonized at birth for every new campaign" (§9); INDEX §6's preamble keeps "two of those asks hold decisions
that are the owner's in the host" in the present tense before ab's correcting sentence. *Fix:* H22's heading "**its canon
taken at the campaign's first advance**" and "so new campaigns take the birth canon at their first advance"; the brief's
two phrases "canonized at the first advance of every new campaign"; INDEX "two of those asks held decisions".

**HA-15 — minor — z (revision of the party's place) — singular "party seat" survivors.** V13 §1b.1's `LensFacts` row:
"the party's seat and observer"; H23: "the party's seat sent each advance (H39; J397 (M8))"; §7's fixtures paragraph:
"with a party seat, a home seat"; T-V13-79 "with a party seat sent" and T-V13-81 "with the party seat sent"; V15 T-V15-31
"with the party's seat elsewhere" and §8's SA1 row "under a mock host sending the party's seat". None names the retired
identifier, so the brief's grep passed them; each now reads a field that is a list, sent on the presentation rows. *Fix:*
"the party's whereabouts (`partySeats`) and observer"; H23 "the party's whereabouts on its presentation rows (H39)"; the
fixtures "with the party's whereabouts and its home seat (`partyHome`)"; the T rows "with `partySeats` sent"; V15 "the
party's whereabouts elsewhere", "sending the party's whereabouts".

**HA-16 — minor — ab (item 1309 (a)) — the walk's tier typed without evidence; an omitted seat rooted.** "`tier: Rung`"
types the host's walk tier as the base's settlement rung (`'TOWN'|'CITY'|…`); the host's answer gives only "`{ rootId,
liegeId, tier, polityClass, basis }`". And "a seat the walk names as its own root, or omits, roots its own allegiance"
lets a partial walk overrule the raw links for the omitted seat. *Fix:* `tier: string /* the host's own word through the
adapter folder's link table */`; "a seat the walk omits reads its raw links (the arm), never roots itself by omission".

**HA-17 — minor — z (item 1271 (d), H47) — no host unit named.** "| H47 | with M-W6 (the include run) and H22's birth
canon |" — the mirror §1: "every H row names the host unit that owns its field"; H39 and H48 do. *Fix:* "with M-W6 (the
include run) and H22's birth canon; inside the host's unit that owns a campaign's world record and its campaign maker (one
unit, one writer)".

**HA-18 — minor — ab (item 1336 (a), H36) — the felt sentence over-promises.** Kept word for word: "**felt:** "my realm
has names and rules from the day it is born"" — after J400 (2) a realm has a name only once the DM christens it (the
host's pencilled offer lands at its own later wave). *Fix:* "**felt:** "my realm has its rules from the day it is born,
and its names the moment I give them"".

**HA-19 — minor — ab (items 1327 (d), (e), 1328 (b); T-V13-130) — two user strings.** The religion banner "…, until the DM
confirms a patron the host offers at birth" shows on an account offered nothing (no custom content) and after a decline;
the populations legend "the host serves this crisis twice; its population unit's first train cures it" puts the host's
planning words before a DM. *Fix:* "no creed seated: the dossiers' temples pray to no named god — a patron the host
offers is seated only by the DM's confirm"; "the host serves this crisis twice today; a fix in the host is coming".

**HA-20 — minor — aa (head; item 1301) and ab (items 1356, 1357) — owner-facing records.** aa's head: "Written and applied
by the session's Fable manager" (it is unapplied; its APPLIED line is pending); item 1301: "BCR-V13-57, the per-viewer
DM-only view key" (BCR-V13-57 carries the three edit kinds, the outcome keys, the `carve` requirement and, after z's
revision, `requestPartyPresent`); SUMMARY's campaigns bullet kept by ab: "the party is a pin you place anywhere and move at
will" (on a world SettlementForge runs, SettlementForge keeps where the party is); item 1357: "so a SettlementForge share
code always gets back the world it named" (or is refused, fail-closed). *Fix:* aa's head "Written by …; applied by the
apply seat"; "BCR-V13-57, the edit kinds, keys and requests of the campaigns pass"; the bullet adds "— on a world
SettlementForge runs, a pin at a town tells SettlementForge the party is there, and the map shows SettlementForge's
answer"; "gets back the world it named, or a refusal, never another world".

**HA-21 — minor — z (items 1262 (e), 1263 (b)) — one key, two meanings.** `refuse.world.campaignLive` is "a `bindCampaign`
while another campaign is open and not named in `closes`, or a port message naming a campaign this world has not bound".
*Fix:* the second is `refuse.world.campaignUnbound` (§4.1, §7.5, BCR-V13-57).

**HA-22 — minor — z (item 1262 (d), law (9)) against V13 §1.2 (applied l. 292) — "the world clock" keeps an older
meaning.** Law (9): "**the world clock** the one week axis every record of a world is dated on (… never a second axis)";
§1.2's V06 row, untouched: "the world clock is the host's (item 138 (c))". *Fix (z):* that row reads "the world's weeks
are the host's, translated onto the world clock (law (11); item 138 (c))".

**HA-23 — minor — ab (item 1352) — the base names a key its outcome table does not hold.** §6.4 gains
"(`refuse.world.outputVersion`)" while §7.1's outcome table gains it only through BCR-V13-59, "standing for the next
coherence pass". *Fix:* BCR-V13-59 notes "named by §6.4 since file ab item 1352", or item 1352 adds the key to §7.1.

**HA-24 — minor — ab (items 1315 (b), 1320 (b)) against V13 §3.9 (14) — a host road watch is neither word of law (9).**
§3.9 (14): "A road watch the host asserts comes first (a road the host closes: its closer every week while it stands; a
warden's term: at least every four weeks; …)" — a host-asserted fact that moves the cadence; law (9): a host patrol is "a
rider the host sends", read "never as a cadence and never moving one". *Fix:* law (9) adds "a **host road watch** (a
closure or a warden's term the host asserts) is an input of the patrol cadence, never a host patrol"; §5.9 (3)'s host
patrol row says so.

**HA-25 — minor — ab (items 1309 (c), 1322 (c), 1329, 1333 (c), 1337 (g), 1338) — advisory, the clean room.** The field
`pastRef` is the host's design name verbatim (the host's answer lists "`pastCauseOf`, `pastRef`, `spatialLedgers.realmPast`,
`factRef`, `yearsBefore`" as PA's design names; so does the mirror), though ab's own clean-room paragraph lists it among
"the map's fields … named in the port's style". Not on the K list. *Fix:* rename with HA-01 (e.g. `pastFact?: PastRef`),
or the manager's HA-01 waiver names both.

## 2 Coverage — every ruling, the items that carry it, compared with the host's words

| ruling | carried by | verdict |
|---|---|---|
| J399 R1 the next campaign on one world | z 1257 (b), 1258 (a), (b), 1259 (a), (b), (e), (f), 1260, 1262 (a)–(e), 1263 (a)–(c), 1264 (b), (c), 1265, 1268, 1270 (T-V13-120, -121), 1271 (a), (d) H47, 1272, 1273, 1274, 1275 (a), 1280, 1290 (c), 1292; aa 1301–1305 | carried as ruled (HA-17, HA-21, HA-22) |
| J399 R2 several campaigns carved | z 1259 (a), (d), (f), 1261, 1262 (b), (d), 1263 (b), 1271 (b), 1272, 1273, 1275 (b), 1276, 1277, 1279, 1280, 1284, 1285, 1286, 1287, 1290 (b), 1292 | carried as ruled |
| J399 R3 the world as a VTT scene | z 1257 (a), 1262 (d), 1266, 1269, 1270 (T-V13-123), 1272, 1273, 1281–1283, 1284 (T-V15-36), 1285, 1286, 1287, 1288, 1289, 1291–1293 | carried as ruled |
| J399 R4 the party pin | z 1258, 1259 (b), (c), (g), 1260, 1263, 1264, 1267, 1270, 1271 (c), 1272, 1273, 1274, 1278, 1284, 1285, 1286, 1287 (b), 1290, 1292 | carried as J400 (9) revises it (HA-02, HA-09) |
| J399 R5 weeks, not days | z 1257, 1262 (e), 1264 (a), 1266, 1270 (T-V13-124), 1272, 1274, 1282, 1291, 1292 | carried (HA-10) |
| J399 R6 players view-only | z 1257 (b), 1263 (a), 1266, 1270 (T-V13-125), 1272, 1274, 1281, 1282, 1288, 1289, 1291, 1292 | carried |
| J400 (1) the birth door | ab 1336 (a), 1340 (J-V13.201), 1342 (d), 1357 | as the host: "A module world needs no door of its own" |
| (2) no name minted | ab 1307 (b), 1309 (a), 1316, 1322 (b), 1326 (a), 1328 (f), 1329 (T-V13-129), 1336 (a), 1339 (d), 1340, 1342, 1356 (a) | as the host: "`PolityFacts.names` stays ABSENT … `christened` first, else your descriptive label" (HA-18) |
| (3) the honest label | ab 1336 (a) | as written |
| (4) the deity an offer | ab 1308 (b), 1327 (e), 1328 (b), 1329 (T-V13-130), 1336 (a), 1340, 1342 (b), 1354, 1356 (c) | as the host: "ONLY the DM's confirm seats it … `deitySeated` reads true only after a DM's confirm" (HA-19) |
| (5) each window on its unit | ab 1308 (a), 1318 (a), 1329 (T-V13-131), 1333 (a), (c), 1334 (b), 1336 (b), 1340 | as the host: "`hostSeq` … always; and, where the advance epoch is lit, the advance nonce as well" |
| (6) the membership walk | ab 1307 (b), 1309 (a), 1314 (a), 1329 (T-V13-132), 1333 (c), 1340 | adopted as J400 rules ("an OFFER your sway MAY adopt"); the audience rule lost (HA-03, HA-16) |
| (7) the grace rule as the host takes it | ab 1307 (e), 1313, 1317 (b), 1318 (c), 1329 (T-V13-133), 1333 (b), 1334 (a), 1336 (c), (d), 1340, 1341; z 1262 (a), 1270, 1271 (a), (d) | as the host S3 (a)–(d) (HA-12, HA-13, HA-14) |
| (8) the version promise | ab 1312, 1329 (T-V13-134), 1330, 1335 (a), 1340, 1341, 1352 | as the host S4; the mechanism undefined (HA-05, HA-23) |
| (9) the party's place | z (revision) 1257 (b), 1258, 1259 (b), (c), (f)–(h), 1260 (b), 1262 (d), (e), 1263, 1264 (d), 1266 (a), 1267, 1270, 1271 (c), 1272, 1273, 1274, 1278, 1279 (a), 1284, 1285 (d), (e), 1286, 1287 (b), 1290 (c), 1292, 1294, 1295 | as the host S5 ("type it as PT reads it … with its source and stamp"; the home seat and a pair's observer asks); the picture's precedence differs from J400 (9)'s "feeding only the map's known set" (HA-02); wire words (HA-01) |
| (10) the court viewpoint held | ab 1308 (c), 1319, 1326 (b), 1328 (d), 1337 (a), 1340, 1343 (a), 1344, 1345, 1356 (b); z 1267 (the fallback removed) | as the host S5; V13's lens viewpoint not offered (its existing arm: it was offered only "where the host sends a court's believed political facts"), V15's and the court audience's arm drawn; three survivors (HA-07) |
| (11) the docket units | ab 1333 (a), 1337 (b), (c), (e) | as the host S6, S9 |
| (12) no reader of the map feed | ab 1315 (a), (c), 1317 (e), 1320 (c), 1322 (a), 1325 (a), 1328 (e), (h), 1329 (T-V13-135), 1333 (d), 1337 (d), 1339, 1340, 1342 (b), (c); z 1271 (b) | as the host S7 ("`MAP_FEED_READERS` starts EMPTY"); the brief's soak sentence survives (HA-06) |
| (13) net force; four quantities | ab 1314 (b), 1337 (h) | as the host S8, S13 ("one of the four strength quantities, never the force band") |
| (14) the past references | ab 1307 (b), 1309 (b), (c), 1310, 1322 (c), 1329 (T-V13-136), 1333 (c), 1337 (g), 1338, 1340, 1349 | as the host S10, S2 (HA-25) |
| (15) the ambiguity law | ab 1337 (f), 1342 (b) | as the host S11 |
| (16) H32; the plague; the crisis twice | ab 1327 (d), 1334 (d), (e), 1335 (b) | as the host S12 (the figures 972 / 10,000 / 116 / 856 checked) (HA-19) |
| (17) the raid | ab 1314 (c), (d), 1328 (g), 1334 (f), 1340 | as the host S13 |
| (18) patrols closed | ab 1307 (a), (d), (f), 1311 (a), 1315 (b), 1317 (a), (c), (d), (f), 1320, 1321, 1323 (a), 1325 (a), 1326 (c), 1327 (a)–(c), 1328 (a), (c), (e), 1329 (T-V13-137), 1331 (a), 1333, 1334 (c), (g), 1339 (a), 1340, 1341, 1346–1349, 1354, 1356 (c) | as the host S14 ("never H16"); `patrolOffer` survives only in its two retirement sentences (HA-24) |
| (19) the sea; the readings; the stamps | ab 1333 (a), 1335 (c)–(e) | as the host S15 |
| (20) a port value frozen | ab 1320 (d) law (12), 1329 (T-V13-138), 1340 | as the host's fifth rule (HA-13) |
| (21) the realm's past | ab 1307 (c), (e), 1310, 1311 (b), 1318 (b), 1320 (b), (d), 1323 (b), 1324, 1325 (b), 1329 (T-V13-139), 1330, 1331 (b), 1338 (H48), 1340, 1341, 1343 (b), 1344, 1345, 1349–1351, 1358 (b) | as the host S2, S3 (c) ("pencilled", "inked", "never a tick"); a sequel's surfaces (HA-08, HA-10, HA-11) |
| (22) accepted, not scheduled | ab 1332, 1342 (d), 1353–1358 | as the host ("Accepted is not scheduled"); SUMMARY's paste sentence (HA-06) |

No J400 disposition is carried contrary to the host's own words; the two places where a file says more than J400 (HA-02,
HA-08) are the map's own surfaces. Every new J row has its T row (J-V13.191 – .199 ↔ T-V13-120 – -127; J-V13.201 – .214 ↔
T-V13-129 – -139; J-V15.49 – .52 ↔ T-V15-35 – -38; J-V14.59 – .60 ↔ T-V14-36 – -37; J-V9.165 – .170 ↔ T-V9-97 – -99),
each naming its fixture.

## 3 The seams — every name used in two places

| name | defined | used | agree? |
|---|---|---|---|
| `LensFacts.partySeats`, `.partySource`, `.partyStamp`, `.partyHome` | z 1259 (c) | z 1257 (b), 1259 (g), (h), 1262 (d), (e), 1264 (d), 1267, 1270, 1271 (c), 1272, 1274, 1278, 1279 (a), 1284 (c), 1285 (d), (e), 1287 (b), 1294 (a); ab 1319 | yes, by identifier; prose survivors (HA-15); wire words (HA-01) |
| `partySeat`, `CampaignFacts.homeSeat` (retired) | — | nowhere in any applied copy | yes |
| `requestPartyPresent(world, seats, week)` | z 1294 (b) | z 1258, 1259 (b), 1262 (e), 1263 (a), 1271 (c), 1273 (BCR-V13-57), 1295; T-V13-126 | yes, one signature; absent from T-V13-7 and §1b's row (HA-04); its week (HA-09) |
| `W_PARTY_PENDING` (`wait`, `withdraw`) | z 1295, 1263 (b) | z 1258, 1259 (b), 1264 (d), 1273, 1294 (b); T-V13-126 | yes |
| `PartyPlacement.present`; the pending state derived | z 1259 (b) | z 1260 (b), 1263 (a), 1294 (b); T-V13-126 (vii) | yes (derived at read; the records digest byte-equal across the fold) |
| the party's current place | z 1259 (b) | z 1262 (d) law (9), 1264 (d), 1266 (a), 1278 (b), T-V15-37 | **no** (HA-02) |
| `CampaignRecord`, the world clock, law (11) | z 1259 (b), 1262 (d), (e) | z 1260, 1264, 1265, 1268, 1270; ab 1310, 1311, 1318 (b), (c), 1320 (b), (d) | yes; V13 §1.2's older "world clock" (HA-22) |
| `bindCampaign`, `closeCampaign` | z 1262 (c), 1263 (a) | z 1258, 1268, 1271 (d), 1273 | edit kinds yes; as recorded inputs **no** (HA-04) |
| `refuse.world.campaignLive` / `.campaignClosed` / `.pinDate` | z 1263 (b) | z 1259, 1262, 1265, 1270, 1273, 1290 | yes (HA-21 one key overloaded) |
| `PolityFacts.walk` | ab 1309 (a) | ab 1307 (b), 1314 (a), 1329, 1333 (c), 1336 (a) | yes; no covert marker (HA-03) |
| `PolityFacts.names` (withdrawn) | — | its withdrawal notes only (ab 1309 (a), 1326 (a), 1328 (f), 1339 (d), 1342 (a)) | yes |
| `PastRef`, `PastFact`, `PastFacts`; `pastWindow` | ab 1310, 1318 (b) | ab 1307 (c), (e), 1309 (b), (c), 1311 (b), 1320 (b), (d), 1322 (c), 1323 (b), 1324, 1325 (b), 1329, 1338, 1341, 1343 (b), 1349 | yes; absent from T-V13-7 (HA-04); the timeline's type (HA-11) |
| `pastRef`, `sincePast` | ab 1309 (b), (c) | ab 1322 (c), 1329, 1333 (c), 1337 (g), 1338 | yes (HA-25 the name) |
| `canonized` … `revoked?: true` | ab 1318 (c) | ab 1307 (e), 1317 (b), 1329, 1334 (a), 1336 (c), 1340, 1341; z 1262 (a), 1270 (T-V13-120), 1271 (a), (d) | yes, one handling (HA-12 its order) |
| `refuse.world.outputVersion`, `.pastDate` | ab 1330 | ab 1312, 1318 (b), 1329, 1341, 1352 | yes (HA-23 the base's table) |
| the version promise | ab 1312 (V13 §2.7) | ab 1335 (a) H31, 1341 BCR-V13-58, 1352 (base §6.4), T-V13-134 | yes in rule; the store undefined (HA-05) |
| H47 | z 1271 (d) | z 1262, 1265, 1270, 1290, 1292; aa 1301, 1303, 1305; ab 1332, 1358 | yes (HA-17 its unit) |
| H48 | ab 1338 | ab 1310, 1318 (b), 1332, 1342 (d), 1353, 1355, 1358 (b) | yes; INDEX Q2 H1–H48 |
| H39 (rewritten) | z 1271 (c) | z 1259 (c), 1267, 1274, 1278, 1294; ab 1342 (b) | yes |
| law (9): the party pin / the party's whereabouts | z 1262 (d) | §2.2, §5.1, V15 §3.7 | **no** (HA-02) |
| law (9): the realm's past / an earlier campaign | ab 1320 (b) | ab 1310, 1323 (b), 1324, 1325 (b), 1338, 1343 (b) | yes in words; a sequel's surfaces (HA-08) |
| law (9): a host patrol / the patrol cadence | ab 1320 (b) | ab 1315 (b), 1323 (a), 1327 (a), (b), 1346; T-V13-137, T-V14-37 | yes (HA-24 the road watch) |
| BCR-V13-56 / -57 / -58 / -59 | z 1273; ab 1341 | z 1293 (base); ab 1352 (base); aa 1301, ab 1353 (INDEX) | yes (HA-20 the INDEX's description of -57) |

## 4 Substance

1. **One writer of the party's place.** Yes for every fact the host reads: the observer and the default-preset delay
   read `partySeats` alone (T-V13-127: the pin anywhere changes no observer and no court's facts are asked); a pin at a
   town is a request, its state derived at read from the plates and never written by a window (T-V13-126 (i), (vii)); a
   superseding row moves the drawn place to the host's; the map's undo recalls nothing. Two defects: the drawn current
   place follows a later map-only placement (HA-02), and a back-dated request (HA-09).
2. **The realm's past apart from an earlier campaign.** In the record (law (9); `PastFacts` per `CampaignRecord`; never
   translated, law (11)), the events layer (pins "n years before the campaign"), the history view (its own head) and V09:
   yes. On a sequel world the scrub's wording and V15's old map: not yet (HA-08). The ab seat's choice — a strip of its
   own per campaign at the scrub's start, never interleaved — is the right one: the host's years are not the world
   clock's weeks, and a later campaign's past, written by the host for that campaign, can tell of years an earlier
   campaign was played here, so no placement on the axis could be true; only its wording must stop claiming one.
3. **The version promise against §6.4's window.** It agrees: the window still bounds what the browser carries, the
   map's own links outside it still open under the current version with their notice, and a host composition alone is
   fetched exactly or refused fail-closed, "never opened with the notice above". The archive it fetches from is
   undefined (HA-05).
4. **`patrolOffer` retired.** V14's encounters read `patrolAt` and the cadence (V13 §1b.2; V14 §3.13), never the port
   offer: whole, and gaining the host patrol beside the cadence's item (T-V14-37). The patrols lens keeps its cadence
   tints and gains the legend row and the host-patrol pin (T-V13-137). `patrolOffer` survives only in its two retirement
   sentences (§3.11.6, J-V13.212). One undefined boundary (HA-24).
5. **The membership walk.** The drawing rules (depth, continuity, exclaves, the chain bonus, the reinforcement) apply
   over the walk, and the links' derivation is the arm where no walk is sent, byte-identical to T-V13-41 (T-V13-132):
   kept. The audience rule is not (HA-03).
6. **The H rows touched.** H9, H12, H13, H16, H22–H25, H31–H46 changed; every row that carried a first-visible line and
   a felt sentence before still does (a census of the rows before and after); H47 and H48 carry both. H36's felt
   sentence now over-promises (HA-18).
7. **The `canonized` revocation on V13 §2.1.** Sound: V13 §2.1 already derives the unsealing of a consumed edit from the
   window replace that discards its window, the host itself names the parallel ("revokes `canonized`, as OD-FC-32
   revokes `consumed`"), and every effect is stated and tested — the canon leaves `CampaignRecord.canons`, the
   `timeDelta` baseline returns, `hostLocked` clears, the banners return to the uncanonized regime (T-V13-133; for a
   sequel T-V13-120). Only the order of the two channels is open (HA-12).

## 5 The dry run, the lint, the verdict

**5.1 The dry run** (`review-host/dryrun_host.py`; fresh copies from disk; z, then aa, then ab):

| file | items | fragments | result |
|---|---|---|---|
| z | 39 change items (1257–1295; 1294 after 1262 and 1295 after 1270, by section) | 97 (V13 53, V15 30, V14 5, V09 6, the base 3) | every current text once at its turn, every new text once after; no stray line |
| aa | 5 (1301–1305) | 5 (INDEX 3, SUMMARY 1, the brief 1) | the same |
| ab | 52 change items (1307–1358) | 130 (V13 109, V15 4, V14 4, V09 3, the base 1, INDEX 3, SUMMARY 4, the brief 2) | the same |

| target | before (lines, md5) | after z | after aa | after ab |
|---|---|---|---|---|
| V13 | 6 342, 058ca91f | 6 599 | 6 599 | 6 712, 841201a1 |
| V15 | 2 438, 5100b61c | 2 512 | 2 512 | 2 514, a5cfe52f |
| V14 | 3 253, a68ea45f | 3 264 | 3 264 | 3 268, 3e86ff41 |
| V09 | 5 252, c778ed8b | 5 302 | 5 302 | 5 312, c732e4e7 |
| the base | 24 515, 68349aaa | 24 517 | 24 517 | 24 517, 0760e896 |
| INDEX | 274, 368c4ce0 | 274 | 274 | 274, 965eb88e |
| SUMMARY | 271, 8e4ca24d | 271 | 280 | 294, b81bd5a5 |
| the brief | 211, 017f3819 | 211 | 211 | 211, 82a793a7 |

Every count agrees with the files' heads. Applied in numeric order the result is byte-identical.

**5.2 The clean-room lint** over the 218 new texts bound for the base and the volumes, with the preamble's list and the K
brief's additions: four hits, all HA-01 (`presentAt` and `lastHeard` in z 1259 (c) and z 1270); "M8" five times, each
"J397 (M8)" (the map's own ruling, not the host's sea unit). The advisory scan: `pastRef` six times in ab (HA-25); "C14-17"
(V14's own id) and "KEPT" (a substring) false. No host file, function, product, preset, flag or ruling id; the host's
programs in plain words throughout ("the host's party record", "its docket", "its information program", "its war
volume", "its route-network mount").

**5.3 The stale-sentence greps** (the applied copies): `partySeat`, `homeSeat`, `PolityFacts.names`, `names?: { root`,
"seats a deity", "ruled B" — none; "until the sway soaks" — only T-V13-103's "never "until the sway soaks"" (the test of
its absence); "passed its soak" — J-V13.96 (a decision row, noted by ab 1339 (b): a record) and the brief's settled-rulings
paragraph (live: HA-06); `patrolOffer` — the two retirement sentences; "seated at birth" — J-V13.203's "over a deity
seated at birth by default" (a record); "born peopled" — J-V13.148 (a record, noted WITHDRAWN); "world clock" — law (9)'s
sense everywhere but V13 §1.2 (HA-22), never for the host's realm canonize; the court viewpoint as fed — HA-07; a host
reader of the map feed — none but law (10)'s admission rule.

**Verdict: ready to apply after the listed fixes.** No blocker. The eight majors are each one to four fragments: HA-01
(two words in z, or a waiver), HA-02 (four sentences of z, or the manager's ruling of the picture's precedence), HA-03
(one field and three clauses in ab), HA-04 (one T-V13-7 fragment, one row fragment, one BCR clause), HA-05 (the base
sentence and J-V13.207), HA-06 (two owner-facing fragments), HA-07 (three clauses), HA-08 (two sentences and two T
clauses). The minors are at the manager's discretion; HA-09, HA-10 and HA-12 are worth taking with the majors, since each
is a test or a host message that would otherwise fail or mislead.
