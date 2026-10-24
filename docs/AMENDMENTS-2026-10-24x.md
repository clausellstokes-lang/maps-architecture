# Amendments x — the experience pass (J397) on the atlas and the sites: the court viewpoint, atlas relations, date cartouches, the public shared file, the honesty note, "an old map", the party's reach across a seam, the relational style for every account, the numbered room key

Written by the session's Fable seat amendments/experience-x on 2026-10-24 under the owner's delegation of that day
(`docs/PROGRESS.md` J397: the owner's "So do the prompts and integrate them that can be done on maps and give me the
prompts for settlement engine" and "Try again", read as: carry the session's substance-and-experience synthesis —
`research/experience/01–05`, the five reads of the paired product — into the architecture wherever the map side can carry
it, and write the host's side as prompts; the session ruled the map-side rulings M1–M50, each vetoable, under J392's model
ruling — Fable designs, reviews and closes, Opus applies). This file is seat x's: it carries **M9's volume-15 part and
M41–M48** into volume 15 (the atlas) and volume 14 (sites) by change items, and nothing else — volume 13, volume 9 and the
base are files v's and w's, the host-side asks S1–S15 are the prompts file's
(`research/sf/host-prompts-2026-10-24.md`), INDEX, SUMMARY, the owner brief and HANDOFF are the manager's closing file y.
Neither v nor w touches V15 or V14, so every quote below is the text as it stands on disk on 2026-10-24 (V15 as file u's
in-place edits E-1 – E-14 left it; V14 as file s left it). Where this file must say "where the host sends it" it names
V13 §8.5's rows H39 – H41 (file v's rows for the host asks S5 and S6: the party observer, the believed rows, a court's
believed facts on request; the headline join and the integrity register), by number, as the seat brief directs.

Numbered from **1201** (file w's block ends at 1200).

**APPLIED** — left for the apply seat (amendments/experience-apply, Opus, after files v and w; record
`docs/validation/coherence/experience-x.md`): items, fragments, each quote matched exactly once at its turn and each new
text exactly once after.

**Dry run and lint (this seat's).** Dry run (`scratchpad/experience-pass/x/dryrun_x.py apply`, over copies of V15 and V14 in that folder, never the targets): 40 change items, 91 fragments, every quote matched exactly once at its turn and every new text exactly once after, in order. Clean-room lint over all 91 new texts (the preamble's token list): no hit.

## Closure table (every ruling this file carries → its items)

| ruling | subject | carried by |
|---|---|---|
| J397 (M9), the V15 part | the court viewpoint: `Viewpoint.audience` gains `court:<seat>` (with `court: { member; seat }` and the `court` knowledge source); its known region the court's own reach; its facts the court's believed political facts and knowledge where the host sends them (H39 – H41), through the port's presentation inputs only (M50), never a truth it does not hold; the DM sees the integrity register word per mark, players never; the looted map; the no-belief arm `W_ATLAS_COURT_UNSENT` | items 1202 (a), 1203 (c)–(f), 1204, 1210 (d), 1212, 1214, 1215, 1217 (b), 1218 (c), (e), 1219 (b), 1221, 1222 (c), 1224, 1226 (T-V15-27), 1229, 1230, 1231 (J-V15.41), 1233 (RQ-V15-13), 1234 |
| J397 (M41) | the numbered room key (V14): `SiteKey` — every unit in walk order from the entrance with role, name, reason, water class and condition — on the site's page (numerals, a Key tab) and in every export (`plat.sites.key`, a GeoJSON field, a printable key sheet); the boundary note: stocking stays the DM's and the host's | items 1235, 1237, 1238, 1239 (T-V14-34, J-V14.57), 1240 (BCR-V14-26, the V09 row) |
| J397 (M42) | atlas relations: `AtlasRelation` (DM-authored, between two members or a member and a gap; `enemy`, `ally`, `faithReached`, `sailed`, `traded`; dated optional; a record of the atlas, never read by a member) feeding the figures and the known regions only; the figure rules read them; §3.11's example authors the relations it needs; §4.7 (1) restated | items 1203 (b), 1205, 1208, 1209, 1210 (a), (b), 1212, 1213, 1217 (b), (c), 1218 (a), (c), (d), 1219 (a), (c), 1220 (a), 1221, 1222 (a), 1223 (c), 1226 (T-V15-28), 1229, 1230, 1231 (J-V15.42), 1232 (BCR-V15-18), 1233 (RQ-V15-14), 1234 |
| J397 (M43) | date cartouches withheld from a player viewpoint unless the member carries a DM-set in-world calendar label (`Member.calendarLabel`) | items 1202 (b), 1203 (a), 1206, 1210 (c), 1217 (a), (b), 1218 (c), 1219 (b), 1220 (b), 1222 (b), 1223 (a), 1224, 1228 (T-V15-32), 1231 (J-V15.43), 1232 (BCR-V15-18), 1233 (RQ-V15-14) |
| J397 (M44) | the shared file and the gallery copy carry the public audience only: the share writer embeds `public` tiles alone, the DM's, every party's and every court's tiles stripped, every secret record removed, not withheld; the share sheet says so | items 1202 (c), 1211, 1217 (c), 1221 (b), 1225 (b)–(d), 1227 (T-V15-30), 1230, 1231 (J-V15.44), 1232 (BCR-V15-16), 1234 |
| J397 (M45) | the honesty note on every screen and in the clerk's answer; the export dialog's "as an in-world artefact" switch leaves it off the image; the file's record keeps the projection | items 1215, 1217 (b), 1221, 1223 (b), 1225 (a), 1228 (T-V15-33), 1230, 1231 (J-V15.45), 1232 (BCR-V15-17), 1233 (RQ-V15-14) |
| J397 (M46) | "an old map": the as-of viewpoint renamed; it reads the plates each member has and says from which week (`W_ATLAS_BEHIND_WEEK` kept); the as-was copy — a scratch copy of the member with a sway lock, read by the prop alone (`Viewpoint.asWas`; `refuse.atlas.asWas`) | items 1202 (a), 1203 (c), 1207, 1210 (d), 1212, 1214, 1218 (d), 1219 (b), 1222 (c), 1226 (T-V15-29), 1229, 1230, 1231 (J-V15.46), 1232 (BCR-V15-18) |
| J397 (M47) | the party's reach across a seam: when a host-bound party enters a continued standalone member the DM is offered "Mark the party's places here" from the crossing point — the member's party key seeded with the crossing's cell and the route the party took (`markPartyReach`; V14 §2.3's seeded form) | items 1216, 1218 (b), (d), 1219 (b), (c), 1220 (a), 1221 (b), 1227 (T-V15-31), 1229, 1230, 1231 (J-V15.47), 1232 (BCR-V15-18), 1233 (RQ-V15-14, RQ-V15-15); V14: 1236, 1239 (T-V14-35, J-V14.58), 1240 (the V09 and V15 rows) |
| J397 (M48) | the relational style is presentation and open to every account kind; continuation and fit stay premium (J396 (2) otherwise unchanged); the RQ row that asks V13's gate row and V09's dialog to say so | items 1224, 1228 (T-V15-34), 1230, 1231 (J-V15.48), 1233 (RQ-V15-12) |
| J397 (M50) | the court viewpoint's facts travel through the port's presentation inputs only (V13 §3.11.6's law (3) kept) | items 1203 (e), 1214, 1226 (T-V15-27), 1233 (RQ-V15-13) |

Items 1201–1240 are forty items over two targets: V15 (1201–1234, in section order: the revision notes, §0, §1b, §2.2 –
§2.4, §2.9 – §2.11, §3.6, §3.7, §3.11, §4.1 – §4.3, §4.7, §4.8, §5.1, §5.2, §5.4, §5.5, §7.2 – §7.5, §8, §9, §10.1, §10.3,
§12) and V14 (1235–1240: §1.4, §2.3, §2.4, §5.2 – §5.3, §7 and §9, §10.1 – §10.2). **Ids minted:** J-V15.41 – J-V15.48;
T-V15-27 – T-V15-34; BCR-V15-16 – BCR-V15-18; RQ-V15-12 – RQ-V15-15; J-V14.57, J-V14.58; T-V14-34, T-V14-35; BCR-V14-26;
the records `AtlasRelation` (with `AtlasRelationKind`), `SiteKey`, `SiteKeyRow`; the fields `Viewpoint.court`,
`Viewpoint.asWas`, `Member.calendarLabel`, `EmbellishRule.atlasRelations`, the `court` knowledge source, the audience
`court:<seat>`, the figure kind and trait `missionRoad`, `ExportOpts.atlas.inWorld`, `ExportOpts.siteKey`,
`ExportOpts.vtt.key`, `StyleSheet.groups.siteKey`; the edit kinds `setAtlasRelation`, `markPartyReach`; the keys
`refuse.atlas.relation.self`, `refuse.atlas.relation.gap`, `refuse.atlas.asWas`, `refuse.atlas.reach.notContinued`,
`refuse.atlas.reach.noParty`, `W_ATLAS_COURT_UNSENT`; the catalogue keys `info.atlas.courtUnsent`,
`share.atlas.publicOnly`, `info.atlas.inWorld`, `info.atlas.reach`. **Ids left free in my blocks:** J-V15.49 onward;
T-V15-35 onward; BCR-V15-19 onward; RQ-V15-16 onward; ATLAS-17 onward (no new milestone-level feature is registered:
every addition lands inside M-ATLAS-A and M-ATLAS-C, item 1230); J-V14.59 onward; T-V14-36 onward; BCR-V14-27 onward.
No H row is minted (the host asks these rulings need are file v's H39 – H41, named by number). **New words coined
(defined once where each first appears):** *court viewpoint* (§2.2, item 1204), *atlas relation* (§2.2, item 1205), *an
old map* and *as-was copy* (§2.2, item 1207), *calendar label* (§2.2, item 1206), *mission road* (§3.6 (5), item 1213),
*the numbered key* and *walk order* (V14 §2.4, item 1237). None is a seam word of V13 §3.11.6's law (9): each names a
record or a view of the atlas or of a site document, and the port's words are untouched (the court viewpoint reads the
believed rows file v names, by file v's names, through the presentation inputs that already exist).

**How to read an item.** As file u's: each item names its target file's section (the heading above it), its title in
bold, the ruling it serves (*Requests*: J397's M number; several allowed), the current text quoted **once** (every quote
verified by exact search against the target file as it stands on 2026-10-24, and verified again by applying every item
of this file in order to a copy of each target: each quote occurs exactly once at its turn and each new text exactly
once after — the residue check of file m; a quote that wraps across lines is written on one line with each line break
marked ⏎, the continuation's indentation kept), and the new text **in full** as a blockquote whose lines are the new
lines (the `> ` prefix removed; a bare `>` an empty line; a new line that is itself a blockquote in the target is
written `> > …`). An item with several fragments gives each fragment's current and new text in turn, (a), (b) …, applied
in that order. Two items touching one line are ordered so the second quotes the text as the first leaves it, and say so.
A reference written "file x item n" inside a new text is to this file; "file u item n" to amendments u; "amendments v"
to file v of this pass. *Evidence* names the PROGRESS ruling, the volumes' sections the ruling rests on, the research
notes' sections and the host citations they carry (host paths relative to the host repository's root, with line numbers;
map paths to this repository's). Order: volume 15 in section order, then volume 14.

**The clean-room rule for the new texts.** The volumes are implementer inputs: the new texts entering them name no host
source file, function, product, ruling id, preset name, flag name or internal identifier and no other product's
identifiers — the host is "the host"; its facts are named by the port's field names (`PolityFacts`, `LensFacts`,
`CampaignFacts`, `SettlementFacts`, `TravelLaw`) and by J397's own words for the believed rows (`asOfWeek`, a
`confidence` band, the integrity register's three words); its surfaces in plain words ("the host's news paper", "the
host's belief record", "the host's gallery"); its account kinds and entitlements in plain words (an anonymous visitor, a
free account, a premium account; the campaign entitlement, the gallery entitlement). The host's document names, ruling
ids, product names and code citations stay in each item's *Evidence* line. Checked by a lint over every new text of this
file (the preamble's token list; `scratchpad/experience-pass/x/dryrun_x.py lint`): the result is in the head.

---

## The change items

### Volume 15 — the revision notes under the title (the line for file x, in the style of E-1's)

**1201.** **The revision notes record the experience pass's amendments to this volume.**
*Requests:* J397 (M9), (M42), (M43), (M44), (M45), (M46), (M47), (M48).
*Current text:*
> > §1.4, §2.4, §5.1, §5.5, §8, §10.3 and §12.
*New text:*
> > §1.4, §2.4, §5.1, §5.5, §8, §10.3 and §12.
> > **Amended 2026-10-24** by the session's Fable seat amendments/experience-x (`docs/AMENDMENTS-2026-10-24x.md`, items
> > 1201–1234; record `docs/validation/coherence/experience-x.md`) under the owner's delegation of that day (J397: the
> > experience pass, the map-side rulings M1–M50, each vetoable; the research `research/experience/05` behind this
> > volume's part): the court viewpoint (M9; `court:<seat>`, §2.2, §3.6 (4), (6), (8), §5.4; T-V15-27), the atlas
> > relations that feed the figures and nothing else (M42; `AtlasRelation`, §2.2 – §2.4, §3.6 (4), (5), §3.11, §4.7 (1);
> > T-V15-28), the date cartouches withheld from a player unless a calendar label is set (M43; §2.2, §4.7 (2), §5.2, §5.4;
> > T-V15-32), the shared file and the gallery copy as the public audience only (M44; §2.11, §5.5; T-V15-30), the honesty
> > note on every screen and the in-world artefact export (M45; §3.6 (8), §5.5; T-V15-33), "an old map" and the as-was
> > copy (M46; §2.2, §3.6 (6); T-V15-29), the party's reach across a seam (M47; §3.7; T-V15-31), the relational style for
> > every account kind (M48; §5.4; T-V15-34); J-V15.41 – J-V15.48, BCR-V15-16 – BCR-V15-18, RQ-V15-12 – RQ-V15-15.
*Evidence:* docs/PROGRESS.md J397 (the rulings M9, M41–M48, M50 and the seat's id blocks); file u's E-1 (the form of a revision line); research/experience/05 §1–§4 (the read this volume's part of the pass answers).


### Volume 15 — §0 In plain words (somebody's map; the player's atlas; what the atlas never does)

**1202.** **The plain words name the court's map and the old map, keep the DM's dates off a player's table, and share only what anyone may see.**
*Requests:* J397 (M9), (M43), (M44), (M46).
*Current text* (a):
> figure, and may make a map as another culture saw it, or as the party knows it today, or as it was found, centuries old,⏎in a dungeon. Three presets come shipped
*New text* (a):
> figure, and may make a map as another culture saw it, or as the party knows it today, or as another court believes the
> world to be — a looted map: that court's reach and its beliefs, a planted lie included, and never a truth it does not
> hold —, or as an old map, drawn from what each map remembers of an earlier week and saying from which week it
> remembers. Three presets come shipped
*Current text* (b):
> knows, drawn, if the relational style is on, the way their culture would draw it; the game master's arrangement is the⏎true layout underneath.
*New text* (b):
> knows, drawn, if the relational style is on, the way their culture would draw it, and with no date on any map unless the
> game master has given that map an in-world calendar name; the game master's arrangement is the true layout underneath.
*Current text* (c):
> read, because a stitched world is not a world; and it shares a picture of a map only where that map may be shared.
*New text* (c):
> read, because a stitched world is not a world; and it shares a picture of a map only where that map may be shared, and
> only the picture anyone may see — never the game master's or the party's picture, never a secret record.
*Evidence:* docs/PROGRESS.md J397 (M9), (M43), (M44), (M46); V15 §0 as it stands (the claims research/experience/05 §2.5 C3 and C5 quote against it: "A player's atlas shows only what their party knows"; "as it was found, centuries old, in a dungeon"); research/experience/05 §1.3 (the looted map), §1.6 (1) (the cartouches), §1.7 (the shared file's audience), §2.2 (4) (the dungeon map that cannot remember).


### Volume 15 — §1b.1 Records, fields and tables and §1b.5 Host facts (the new pieces wired)

**1203.** **The wiring tables gain the atlas relation, the calendar label, the court audience with its warning, and the court's believed facts as a host-fact row.**
*Requests:* J397 (M9), (M42), (M43), (M46), (M50).
*Current text* (a):
> `parent`, `shareable`, `state`, `name` |
*New text* (a):
> `parent`, `shareable`, `state`, `name`, `calendarLabel` (M43: the DM's in-world calendar name, the one date word a player's cartouche may print) |
*Current text* (b):
> | A1 (a requirement each), the relations box (V09), the DM-only relation lines, the clerk | the entities block; the model digest |
*New text* (b):
> | A1 (a requirement each), the relations box (V09), the DM-only relation lines, the clerk | the entities block; the model digest |
> | `AtlasRelation` (V15 §2.2; M42): `kind` (`enemy`, `ally`, `faithReached`, `sailed`, `traded`), `a`, `b` (a member, or a gap), `weeks?`, `text`, `knownTo` | `setAtlasRelation`; the clerk's parse of a typed sentence | A6 (5)'s figure rules and A6 (4)'s known region ONLY — never A1 (it moves nothing), never a member (V15 §4.7 (1)); the relations box's second tab (V09); the DM-only relation lines; the clerk | the entities block; the model digest |
*Current text* (c):
> | `Viewpoint` (V15 §2.2): `audience`, `culture`, `centre`, `orientation`, `stylePreset`, `knowledge`, `asOfWeek?` |
*New text* (c):
> | `Viewpoint` (V15 §2.2): `audience` (`dm`, `party`, `public`, or `court:<seat>` with `court: { member; seat }` — the court viewpoint, M9), `culture`, `centre`, `orientation`, `stylePreset`, `knowledge` (its `source` gaining `court`), `asOfWeek?` (an old map, M46), `asWas?` (its as-was copies) |
*Current text* (d):
> `W_ATLAS_NOT_SHARED`, `W_ATLAS_BEHIND_WEEK` | the stages and the view |
*New text* (d):
> `W_ATLAS_NOT_SHARED`, `W_ATLAS_BEHIND_WEEK`, `W_ATLAS_COURT_UNSENT` | the stages and the view |
*Current text* (e):
> | V13 §3.11.6, §5.1, §5.4, §5.8 (7) | A6 (4)'s known region per audience; the player view (V15 §5.4) |
*New text* (e):
> | V13 §3.11.6, §5.1, §5.4, §5.8 (7) | A6 (4)'s known region per audience; the player view (V15 §5.4) |
> | a court's believed political facts and its knowledge (M9) | the believed rows the port carries for a court where the host records belief — the believed allegiance labels and strength bands of `PolityFacts` and the believed rows of `LensFacts` with their `asOfWeek` and `confidence` band, as amendments v define them (V13 §3.9's believed sway; V13 §8.5's H39 – H41) — through the port's presentation inputs only (V13 §3.11.6's law (3); M50); with them the host's integrity register per fact (clean · worn in the telling · planted) where sent, read for the DM's key alone | V13 §3.9, §5.8 (as amendments v amend them) | A6 (4)'s `court` reach, A6 (6)'s court viewpoint, the player view (V15 §5.4) |
*Current text* (f):
> centre is the capital"; "no culture distance sent: far lands by distance alone") — V13 §5.8 (3)'s honesty rule, never a⏎guess.
*New text* (f):
> centre is the capital"; "no culture distance sent: far lands by distance alone"; "the host sends no belief for this
> court: the public record as far as its reach", `W_ATLAS_COURT_UNSENT`) — V13 §5.8 (3)'s honesty rule, never a guess.
*Evidence:* docs/PROGRESS.md J397 (M9), (M42), (M43), (M46), (M50); V15 §1b.1 and §1b.5 as they stand; V13 §3.11.6 (the presentation inputs and the port's law (3): "truth only — no believed fact enters or leaves the canon, believed views riding the presentation inputs"); research/experience/05 §1.3 (the host's belief record per observer court — `src/domain/worldPulse/beliefMap.js:10–12`: readiness, strength band, allegiance label, faith label, confidence, last update tick — and the planted-lie machinery), §2.1 (the integrity registers, `docs/DESIGN_FP_SPINE.md:499–520`), §4 Q2.


### Volume 15 — §2.2 New records (the court viewpoint: `Viewpoint.audience`, `court`, the `court` knowledge source; `MemberImagery.audience`)

**1204.** **`Viewpoint.audience` gains `court:<seat>` — the court viewpoint — with `court: { member; seat }` and the `court` knowledge source; a court's picture is cached per audience like any.**
*Requests:* J397 (M9), (M50).
*Current text* (a):
>   audience: 'dm'|'party'|'public' /* the knowledge key the view admits by (§9.2): the DM everything, the party its places and pictures, the public tier `public` */;
*New text* (a):
>   audience: 'dm'|'party'|'public'|`court:${string}` /* the knowledge key the view admits by (§9.2): the DM everything, the party its places and pictures, the public tier `public`; `court:<seat>` — a COURT VIEWPOINT (M9): the court of the seat named by its host key on `court.member`, admitting that court's own reach (V15 §3.6 (4)'s `court` source) and the political facts that court believes where the host sends them (V15 §1b.5's believed rows; V13 §8.5's H39 – H41), NEVER a truth it does not hold — no row of the member outside the court's beliefs and reach enters its picture at any key; `secret` by default (the DM's) until the DM marks it shared: the looted map handed to the party (V15 §3.6 (6), §5.4) */;
>   court?: { member: Id; seat: string /* the seat's host key on that member */ } /* present exactly when `audience` is `court:<seat>`; the member must be host-bound and its host must send that court's belief for the beliefs to draw, else the court's reach is drawn over the public record with `W_ATLAS_COURT_UNSENT` (V15 §3.6 (6)) */;
*Current text* (b):
>   knowledge: { source: 'audience'|'culture'|'everything'; heardOfBands: number /* the bands of "heard of" beyond the known edge (`atlas.style.heardOfBands` default) */ } /* how the known region is derived (V15 §3.6 (4)) */;
*New text* (b):
>   knowledge: { source: 'audience'|'culture'|'court'|'everything'; heardOfBands: number /* the bands of "heard of" beyond the known edge (`atlas.style.heardOfBands` default) */ } /* how the known region is derived (V15 §3.6 (4)); `court` — the court's own reach, the default for a `court:<seat>` audience (M9) */;
*Current text* (c):
>   member: Id; audience: 'dm'|'party'|'public'; version: MemberVersion;
*New text* (c):
>   member: Id; audience: 'dm'|'party'|'public'|`court:${string}` /* a court viewpoint's picture: V13's picture over that court's believed facts where the host sends them (RQ-V15-13), cached like any; stripped, with the DM's and every party's, from every shared file (M44; V15 §2.11) */; version: MemberVersion;
*Evidence:* docs/PROGRESS.md J397 (M9) ("V15's `Viewpoint.audience` gains `court:<seat>` (the looted map: that court's known region and believed facts, never a truth it does not hold; the DM sees the host's integrity register — clean, worn in the telling, planted — where sent; players never)"), (M50); V15 §2.2 `Viewpoint` and `MemberImagery` as they stand; V13 §3.11.6 (the presentation inputs; law (3)); research/experience/05 §1.3 (the looted enemy map: audience `party` reveals nothing new, audience `dm` reveals the party's own secrets — "the audience model has no slot for the enemy's own knowledge"), §2.1 (2), §3 worst 1, §4 Q2 (an audience `court:<seat>` that admits that court's beliefs, "a read of existing host state, and it must never be the truth"); the host's belief record per court (`src/domain/worldPulse/beliefMap.js:10–20`) and its planted lures (`docs/DESIGN_FP_INFORMATION.md`, the settled cruxes, as the research cites them).


### Volume 15 — §2.2 New records (the atlas relation: `AtlasRelation`; `EmbellishmentKind`; the knowledge paragraph)

**1205.** **`AtlasRelation` is a record of the atlas — DM-authored, between two members or a member and a gap, five kinds, dated optionally — that feeds the figures and the known regions only; `EmbellishmentKind` gains the mission road; atlas relations are `public` by default and a court viewpoint `secret`.**
*Requests:* J397 (M42), (M9).
*Current text* (a):
>   text: string /* the relation as the user wrote or chose it, kept for the clerk and the relations box */; lifecycle: Lifecycle; reason: Id }
*New text* (a):
>   text: string /* the relation as the user wrote or chose it, kept for the clerk and the relations box */; lifecycle: Lifecycle; reason: Id }
> type AtlasRelationKind = 'enemy'|'ally'|'faithReached'|'sailed'|'traded';   // M42
> interface AtlasRelation {                      // an ATLAS RELATION (M42): what the atlas's fiction holds between two members, or a member and a gap — "Varn is Ashmark's enemy", "the sea between is sailed", "Ashmark's faith reached Varn"; DM-authored; a record of the atlas that feeds the relational style's figures and known regions (V15 §3.6 (4), (5)) and NOTHING else — never a member (no member reads it, F14), never an arrangement (a described `Relation` arranges; an atlas relation tells), never a requirement of A1
>   id: Id; kind: AtlasRelationKind;
>   a: Id /* a member: for `faithReached` the member whose faith reached `b`; for `sailed` a member whose shore the sailed water touches */;
>   b: Id | { gap: Id } /* a member, or a gap: `sailed` names the sea gap (a `GapStyle` of kind `sea` or `strait`) or the member across it, the sea gap between the two then read as sailed; `enemy`, `ally` and `traded` are symmetric between two members; a gap under any other kind is refused (`refuse.atlas.relation.gap`), as is `a` naming `b` (`refuse.atlas.relation.self`) */;
>   weeks?: { from?: Week; to?: Week } /* dated, optionally, on the one count a viewpoint applies to every member — its week (V15 §3.6 (6)): the relation holds for a viewpoint whose week lies in the range; absent, always */;
>   text: string /* the sentence as the DM wrote or chose it ("Varn is Ashmark's enemy") */;
>   knownTo: 'public'|'secret' /* `public` by default: the figures it feeds draw for every viewpoint whose mapmaker is `a` or `b`; `secret`: the DM's viewpoints alone (V15 §5.4) */;
>   lifecycle: Lifecycle; reason: Id }
*Current text* (b):
> type EmbellishmentKind = 'seaSerpent'|'whale'|'dragon'|'monstrousPeople'|'devils'|'ruinVignette'|'skull'|'banners'|'siege'|'idolFallen'|'cityVignette'|'cathedral'|'cartouche'|'compassRose'|'ship';
*New text* (b):
> type EmbellishmentKind = 'seaSerpent'|'whale'|'dragon'|'monstrousPeople'|'devils'|'ruinVignette'|'skull'|'banners'|'siege'|'idolFallen'|'cityVignette'|'cathedral'|'cartouche'|'compassRose'|'ship'|'missionRoad' /* the last from a `faithReached` atlas relation (M42; V15 §3.6 (5)) */;
*Current text* (c):
> §9.2 reads it, default `public` for an arrangement, a gap, a viewpoint's existence and a DM-placed embellishment the DM⏎marks shown, `secret` for a relation (a DM diagnostic), a drift reading, a hidden embellishment and the DM's viewpoints⏎not marked shared; a member's imagery is admitted per audience by its own picture (V15 §5.4).
*New text* (c):
> §9.2 reads it, default `public` for an arrangement, a gap, a viewpoint's existence, an atlas relation (M42; the DM may
> mark one `secret`) and a DM-placed embellishment the DM marks shown, `secret` for a relation (a DM diagnostic), a drift
> reading, a hidden embellishment, a court viewpoint (M9) until the DM marks it shared, and the DM's viewpoints not marked
> shared; a member's imagery is admitted per audience by its own picture (V15 §5.4).
*Evidence:* docs/PROGRESS.md J397 (M42) ("a DM-authored relation between members … is a record of the atlas that feeds the relational style's figures only, never a member"), (M9); V15 §2.2 `Relation`, `EmbellishmentKind` and the knowledge paragraph as they stand; V15 §4.7 (1) (the reads across members); research/experience/05 §2.2 (1) (the worked example's devils and whales "are the ones the rules cannot derive"), §2.5 C1, §4 Q7 ("a DM-authored relation between members … a projection that feeds only figures and never a member").


### Volume 15 — §2.2 New records (`Member.calendarLabel`; `AtlasStyleState.dateCartouches`)

**1206.** **A member carries an optional DM-set calendar label — the one date word a player's cartouche may print; the cartouche switch never shows a player a date.**
*Requests:* J397 (M43).
*Current text* (a):
>   name?: NameRef /* the member's title: the world's own name by default */; lifecycle: Lifecycle; reason: Id }
*New text* (a):
>   calendarLabel?: NameRef /* the CALENDAR LABEL (M43): the DM's in-world calendar name for this member's present ("the Year of the Strait"), set by `setAttr`; the ONE date word a player viewpoint's cartouche may print — absent, a player's cartouche is blank and no date of this member reaches a player (V15 §4.7 (2), §5.4); the DM's cartouche prints V13's date label whatever this holds */;
>   name?: NameRef /* the member's title: the world's own name by default */; lifecycle: Lifecycle; reason: Id }
*Current text* (b):
> dateCartouches: boolean /* default true */ }
*New text* (b):
> dateCartouches: boolean /* default true: the DM's cartouches drawn; a player viewpoint's cartouche prints `Member.calendarLabel` or nothing whatever this holds (M43; V15 §4.7 (2), §5.4) — this switch never shows a player a date */ }
*Evidence:* docs/PROGRESS.md J397 (M43) ("DATE CARTOUCHES are withheld from a player viewpoint unless the DM sets an in-world calendar label per member"); V15 §2.2 `Member` and `AtlasStyleState` as they stand; V15 §4.7 (2) (the cartouche prints V13's date label; "the atlas says nothing of it"); V15 §5.4 (what a player's admission withholds: "a member's version and state words" — not the date); research/experience/05 §1.6 (1) ("Year 412" beside "Year 1" beside "Year 1 071": "a game master's bookkeeping printed on the players' map"), §2.5 C3, §4 Q8.


### Volume 15 — §2.2 New records (`Viewpoint.asOfWeek` as "an old map"; `Viewpoint.asWas`)

**1207.** **The as-of viewpoint is "an old map": it reads the plates each member has and says from which week; the DM's authored past rides an as-was copy the prop alone reads.**
*Requests:* J397 (M46).
*Current text:*
>   asOfWeek?: Week /* a map as it was at a past week (a map found in a dungeon): the plates at that week on every member (never later than a member's present) */;
*New text:*
>   asOfWeek?: Week /* AN OLD MAP (M46): a map as it was at a past week — every member read at the plates and events it HAS up to that week, never later than its present and never earlier than its record reaches: a member whose first plate lies after the week is drawn from its first plate with `W_ATLAS_BEHIND_WEEK` on its cartouche naming that week (V15 §3.6 (6)); the physical ground is the member's present (no physical past is kept) — the feature promises no more */;
>   asWas?: { member: Id; copy: { doc: Uuid; namespace: string } }[] /* M46: an AS-WAS COPY per member — a scratch copy of the member (V13 §2.5's clone, a new `docId`; held in the local store's draft mirror as V15 §4.9's unsaved form) on which the DM authored the past's political picture with V13's `setSwayLock` (and any other DM edit), read by THIS viewpoint in the member's place and arrangement: never a member, never shared, never read by another viewpoint or by A1–A5, never written by the atlas; refused `refuse.atlas.asWas` when the copy's lineage is not the member's */;
*Evidence:* docs/PROGRESS.md J397 (M46) ("the found-in-a-dungeon prop reads the plates it has and says from which week; a DM may author an as-was sway on a scratch copy for it; the feature is named 'an old map' and promises no more"); V15 §2.2 `Viewpoint.asOfWeek` and §3.6 (6) as they stand; V13 §5.8 (8) (the plates start at the first advance the map observes); V13 §4.1's `setSwayLock` (the DM's word on a sway, canon on a standalone world); V13 §2.5 (a clone takes a new `docId` and keeps its namespace); research/experience/05 §2.2 (4) ("mostly cannot remember"), §2.5 C5, §4 Q12 (an authored "as-was" sway on a scratch copy, or rename the feature).


### Volume 15 — §2.3 The described relations (an atlas relation is not a described relation)

**1208.** **§2.3 tells the two kinds of sentence apart: a described relation arranges, an atlas relation tells.**
*Requests:* J397 (M42).
*Current text:*
> the chips the user confirms; the sentence is kept in `text`.
*New text:*
> the chips the user confirms; the sentence is kept in `text`.
>
> **An atlas relation is not a described relation** (M42; V15 §2.2's `AtlasRelation`). "Varn is Ashmark's enemy", "the sea
> between Ashmark and Varn is sailed", "Ashmark's faith reached Varn", "Varn and Ashmark trade", "Kesh is Ashmark's ally"
> move no member, become no requirement and are never handed to V13's `solve`: they are the atlas's own record of what its
> fiction holds between members, read by the relational view's figure rules and known regions alone (V15 §3.6 (4), (5))
> and never by a member (F14; V15 §4.7 (1)). The relations box holds them on a second tab (**Between the peoples**; V15
> §4.2), typed or chosen as chips (member · kind · member or sea), the clerk's parse (RQ-V15-8) telling the two kinds apart
> by the sentence's verb (lies, sits, borders — a described relation; is, sailed, reached, trade — an atlas relation); a
> sentence that mixes them ("Varn lies east of its enemy Ashmark") yields two chips, one of each kind, confirmed apart.
*Evidence:* docs/PROGRESS.md J397 (M42); V15 §2.3 as it stands (the relation vocabulary and the clerk's parse); V15 §4.8 (`propose`); research/experience/05 §2.2 (1), §4 Q7.


### Volume 15 — §2.4 New rule tables (`EmbellishRule.atlasRelations`; `FigureRow.trait`) and §2.5 (the mappa mundi's figures)

**1209.** **The embellishment table says how each atlas relation kind feeds the figures and the known region; the figure trait and the sacred preset admit the mission road.**
*Requests:* J397 (M42).
*Current text* (a):
>   devils: { enemyFaith: 'patronDiffersAndContested' /* the holder's patron differs from the mapmaker's and the religion lens marks the seat contested or on a historic front */; atWar: boolean /* true: a land at war with the mapmaker's allegiance */; perRegion: number /* 1 */ };
*New text* (a):
>   devils: { enemyFaith: 'patronDiffersAndContested' /* the holder's patron differs from the mapmaker's and the religion lens marks the seat contested or on a historic front */; atWar: boolean /* true: a land at war with the mapmaker's allegiance */; perRegion: number /* 1 */ };
>   atlasRelations: { enemy: { perSway: number /* 1: devils beside each sway's root seat of the enemy member */ }; sailed: { density: 'sailedSea' /* the gap's warp density class; whales and the portolan's ships in it, never serpents */ }; faithReached: { roadWidthPx: number /* 3: the mission road's strip at level 6 */; endGlyph: 'shrine' /* the figure at the road's far end */; knownAlongWeeks: number /* 4: the other member's own routes walked from the road's end, as the culture rule's `travelWeeks` */ }; ally: { knownSeats: 'all' /* the other member's seats, territories and sways known */ }; traded: { knownSeats: 'cityMinTier' /* the other member's seats of `city.minTier` or above known: the far ends of trade */ } } /* M42: how each atlas relation kind (V15 §2.2's `AtlasRelation`) feeds the figures and the known region (V15 §3.6 (4), (5)); a figure that crosses a seam comes from these rows and an authored relation alone — never from one member's facts read against another's */;
*Current text* (b):
> 'enemyFaith'|'event'|'city'|'holyCity'|'furniture' /* the ONLY key a figure is chosen by
*New text* (b):
> 'enemyFaith'|'event'|'city'|'holyCity'|'furniture'|'missionRoad' /* the ONLY key a figure is chosen by
*Current text* (c):
> deepWater, storm, unsailed, knowledgeEdge, hostile, far, enemyFaith, event, city, holyCity |
*New text* (c):
> deepWater, storm, unsailed, knowledgeEdge, hostile, far, enemyFaith, event, city, holyCity, missionRoad |
*Evidence:* docs/PROGRESS.md J397 (M42); V15 §2.4 `EmbellishRule` and `FigureRow` and §2.5's `mappaMundi` row as they stand; V15 §3.6 (5)'s rows (deep, unsailed and storm-feared water; the `far` clause; the devils rule); research/experience/05 §2.2 (1), §2.5 C1 ("that sea is a `GapStyle` of the atlas with no bathymetry and no `WorldRoute`"), §4 Q7.


### Volume 15 — §2.9 Identity (the atlas relation's creation key) and §2.10 The lifecycle (the atlas relation; `calendarLabel`; the court and as-was fields)

**1210.** **The atlas relation keys on its kind and pair; the lifecycle table gains its row, the calendar label's producer and the viewpoint's court and as-was fields.**
*Requests:* J397 (M42), (M43), (M9), (M46).
*Current text* (a):
> | a `Relation` | the atlas root | (`relation`, the kind, a's lineage, b's lineage) — a second relation of one kind between one pair replaces the first (a tombstone with `supersedes`) |
*New text* (a):
> | a `Relation` | the atlas root | (`relation`, the kind, a's lineage, b's lineage) — a second relation of one kind between one pair replaces the first (a tombstone with `supersedes`) |
> | an `AtlasRelation` (M42) | the atlas root | (`atlasRelation`, the kind, a's lineage, b's lineage or the gap's, `weeks.from` or 0) — a second of one kind and start between one pair replaces the first (a tombstone with `supersedes`) |
*Current text* (b):
> | `Relation` | `relate`; the clerk's parse confirmed | A1; the relations box; the DM diagnostic lines | the entities block | an input: kept; re-solved on request | `unrelate`'s tombstone and its restore | — |
*New text* (b):
> | `Relation` | `relate`; the clerk's parse confirmed | A1; the relations box; the DM diagnostic lines | the entities block | an input: kept; re-solved on request | `unrelate`'s tombstone and its restore | — |
> | `AtlasRelation` (M42) | `setAtlasRelation`; the clerk's parse confirmed | A6 (4), (5); the relations box's second tab; the DM-only relation lines; the clerk | the entities block | an input: kept; every viewpoint's figures and known region re-derived at the next bake | the inverse (a tombstone and its restore) | — |
*Current text* (c):
> `shareable`, `name`) | `addMember` (the reference and the readings at add);
*New text* (c):
> `shareable`, `name`, `calendarLabel`) | `addMember` (the reference and the readings at add); `setAttr` on `calendarLabel` (M43: the DM's in-world calendar name, the one date word a player viewpoint's cartouche prints);
*Current text* (d):
> | `Viewpoint` | `setViewpoint`; the two shipped defaults at creation | A2's audience, A6, the player view, the exports' request | the entities block | kept | the inverse | an older atlas without viewpoints gains the two defaults at load, reported |
*New text* (d):
> | `Viewpoint` (with `court`, M9, and `asWas`, M46) | `setViewpoint`; the two shipped defaults at creation; `setAttr` on `knownTo` (the shared mark: a court viewpoint so marked is the looted map) | A2's audience (a court's picture through RQ-V15-13), A6, the player view, the exports' request | the entities block (an as-was copy is a document of its own, outside the atlas) | kept | the inverse | an older atlas without viewpoints gains the two defaults at load, reported; a viewpoint whose as-was copy cannot be opened reads the member itself with `W_ATLAS_MEMBER_UNOPENABLE` on the copy |
*Evidence:* docs/PROGRESS.md J397 (M42), (M43), (M9), (M46); V15 §2.9's and §2.10's tables as they stand; V15 §2.2's records as items 1204–1207 leave them.


### Volume 15 — §2.11 The version table, the digests and the storage of the atlas (the shared atlas: the public audience only)

**1211.** **A shared atlas, and a gallery copy, carry the `public` audience's imagery alone and have every secret record removed by the writer, not withheld by the reader.**
*Requests:* J397 (M44).
*Current text:*
> it. **A shared atlas** (V15 §5.5) is the same container written by the share writer with every unshareable member's⏎`world.ref` and imagery removed (its `state` reads `unopenable`, its gap marked "not shared") and every shareable⏎member's imagery embedded at the stops cached, flagged read-only (`shared: true` in the header): the recipient sees⏎pictures, arrangement and viewpoints and can drill into no member it cannot resolve.
*New text:*
> it. **A shared atlas** (V15 §5.5) is the same container written by the share writer with every unshareable member's
> `world.ref` and imagery removed (its `state` reads `unopenable`, its gap marked "not shared") and every shareable
> member's imagery embedded at the stops cached — **the `public` audience's imagery only** (M44; J-V15.44): the DM's,
> every party's and every court's tiles are stripped, and every record below the `public` key is REMOVED from the file,
> never left to a viewer-side admission — the described relations, the atlas relations marked `secret`, the drift
> readings, the hidden embellishments, the DM's viewpoints not marked shared (a court viewpoint among them), every
> member's `version` words and every as-was copy reference (V15 §5.4's list); what remains is what anyone may see: the
> public pictures, the arrangement, the gaps, the shared viewpoints with their DM-placed figures marked shown, the public
> atlas relations — flagged read-only (`shared: true` in the header): the recipient sees pictures, arrangement and the
> shared viewpoints and can drill into no member it cannot resolve. **A gallery copy** (publishing through the host's
> resolver, V15 §5.5 (4)) is this same file: the public audience by rule, never a choice on the sheet (T-V15-30).
*Evidence:* docs/PROGRESS.md J397 (M44) ("A SHARED FILE OR GALLERY COPY embeds the public audience's imagery only (DM and party tiles stripped; secret records removed, not withheld); the share sheet says so"); V15 §2.11 and §2.2 `MemberImagery` (a cache per member and audience) as they stand; V15 §5.4 (the records a player's admission withholds); research/experience/05 §1.7 ("Neither §2.11 nor §5.5 says the DM audience's tiles are stripped from a shared file … Whether they are removed from a file bound for the gallery is not stated"), §4 Q9 ("A gallery copy should be the `public` audience by rule"); the host's gallery (`src/components/gallery/galleryMapsUtils.js`; the free tier's "Share settlements to the community Gallery", `organic/samples/fixtures.js:69`, as the research cites them).


### Volume 15 — §3.6 A6 — The relational view ((4) the known region: the `court` source; the atlas relations' widenings; an old map)

**1212.** **A court's known region is its own reach, widened by the places the host's believed rows name; an atlas relation widens a culture's or a court's region across a seam; the DM may widen by authoring a relation, never by painting.**
*Requests:* J397 (M9), (M42), (M46).
*Current text:*
> band beyond; the plates at `asOfWeek` where set, so a map "found in a dungeon" knows what its culture knew then). A⏎projection (class 4), labelled; the DM may widen or narrow it only by choosing another source or audience, never by
*New text:*
> band beyond; the plates at `asOfWeek` where set, so an old map (M46) knows what its culture knew then); `court` (M9; the
> default for a `court:<seat>` audience: that court's OWN reach — the territories and sways of its allegiance's seats, the
> cells within `travelWeeks` along routes from them, the far ends of its trade channels (`tradeKnows`), the seats of its
> allies and vassals, one heard-of band beyond — widened by the places the host's believed rows name for that court where
> sent (a seat the court holds a belief about is at least heard of; V15 §1b.5), never by a place the court has no word
> of). **Atlas relations widen a culture's or a court's region across a seam** (M42; `atlas.embellish.atlasRelations`):
> `ally` — the other member's seats, their territories and sways, as the allies' seats are known within a member;
> `traded` — the other member's seats of `city.minTier` or above (the far ends of trade); `faithReached` — the other
> member's seat the mission road ends at (V15 §3.6 (5)) and the cells within `knownAlongWeeks` along that member's own
> routes from it; each one heard-of band beyond; `enemy` and `sailed` widen nothing (an enemy is feared, not known; a sea
> sailed is a sea, not a land). A
> projection (class 4), labelled; the DM may widen or narrow it only by choosing another source or audience, or by
> authoring an atlas relation (M42), never by
*Evidence:* docs/PROGRESS.md J397 (M9) ("its known region = that court's own reach (its seats' territories and sways, the cells within its travel weeks along routes, the far ends of its channels, its allies' and vassals' seats, one heard-of band)"), (M42), (M46); V15 §3.6 (4) as it stands (the `culture` rule, whose reach the court rule mirrors); V15 §2.4's `known` cells; research/experience/05 §1.3, §2.2 (1) (the Marches "known as far as the Church's missions reach" — a reach no route can give across a seam), §4 Q2, Q7.


### Volume 15 — §3.6 A6 — The relational view ((5) the figure rules read the atlas relations; the rule that binds every figure)

**1213.** **Whales for a sailed gap, serpents for an unsailed one, devils for an enemy member, a mission road for a faith reached, no monster for a people reached — every figure that crosses a seam from an atlas relation alone.**
*Requests:* J397 (M42).
*Current text* (a):
> — deep, little-sailed or storm-feared water | one per `per1000Km2` of such water, at most `maxPerBody`, at the admitted cells' centroid jittered | every |
*New text* (a):
> — deep, little-sailed or storm-feared water; a sea gap between members with no `sailed` atlas relation (M42: no route crosses a seam, so a gap is unsailed by construction; depth is not asked of a gap, which has no bathymetry) | one per `per1000Km2` of such water, at most `maxPerBody`, at the admitted cells' centroid jittered | every |
*Current text* (b):
> | **whale** | deep water sailed (a route within reach): the Carta Marina's real animals, the science note §9.1 | as above | every |
*New text* (b):
> | **whale** | deep water sailed (a route within reach), or a sea gap an atlas relation `sailed` names (M42: the relation alone makes a gap sailed — its density `sailedSea`, the portolan's ships on it, no serpent in it): the Carta Marina's real animals, the science note §9.1 | as above; in a sailed gap one per `per1000Km2` of the gap's area, at most `maxPerBody` | every |
*Current text* (c):
> or farther than `farKm` from the culture's nearest seat and of another culture — the lands the mapmaker's culture is hostile to or far from |
*New text* (c):
> or farther than `farKm` from the culture's nearest seat and of another culture — the lands the mapmaker's culture is hostile to or far from; across a seam another member's land is of another culture by construction (no culture id crosses a seam), so its far sways take the figure by the `far` clause alone — unless an `ally`, `traded` or `faithReached` atlas relation names that member (M42: a people reached is not monstrous) |
*Current text* (d):
> or whose allegiance is `atWar` with the mapmaker's — an enemy faith or an enemy at war (never the alignment lens, DM-only, J384 (7)) | one per such region, beside the seat (`ViewFacts.polity.seats[].at`) | every, from public rows |
*New text* (d):
> or whose allegiance is `atWar` with the mapmaker's — an enemy faith or an enemy at war (never the alignment lens, DM-only, J384 (7)); across a seam, the lands of a member an `enemy` atlas relation sets against the mapmaker's member (M42: no `atWar` and no patron crosses a seam — the relation is the only enemy a mapmaker can have in another map) | one per such region, beside the seat (`ViewFacts.polity.seats[].at`); for an enemy member one per sway of it (`atlasRelations.enemy.perSway`), beside the sway's root seat | every, from public rows; an `enemy` relation marked `secret` feeds the DM's viewpoints alone |
*Current text* (e):
> | **cartouche**, **compass rose**, **ship** | furniture by the preset's rows: the title and the viewpoint's cartouche; roses on the rhumb circle; a ship on a sailed route | by the preset | every |
*New text* (e):
> | **cartouche**, **compass rose**, **ship** | furniture by the preset's rows: the title and the viewpoint's cartouche; roses on the rhumb circle; a ship on a sailed route, and on a gap a `sailed` atlas relation names | by the preset | every |
> | **mission road** | a `faithReached` atlas relation from the mapmaker's member (M42): a road strip from the mapmaker's holy city (else its centre) to the nearest seat of the other member across the shared edge or gap — the mapmaker's member's own route to its edge where one ends there, a straight strip across the gap, the other member's own route from the edge where one begins there — with a shrine glyph (`atlasRelations.faithReached.endGlyph`) at its far end | the strip in the preset's road style at `atlasRelations.faithReached.roadWidthPx`, the glyph at the far seat | every; the far seat enters the known region (V15 §3.6 (4)) |
*Current text* (f):
> no figure reads an alignment, suppressed-creed,⏎covert or DM-only row for a player viewpoint.
*New text* (f):
> no figure reads an alignment, suppressed-creed,
> covert or DM-only row for a player viewpoint. **A figure never reads one member's facts against another's** (M42; V15
> §4.7 (1)): each member's rows are read at that member's own version for the land they describe, and a figure that
> crosses a seam — devils in another map, whales on the sea between, a mission road — comes from an atlas relation alone;
> T-V15-28 asserts that adding or removing an atlas relation changes exactly the figures its rows name and no member's
> digest, and that T-V15-6's renaming clause holds with the relations present.
*Evidence:* docs/PROGRESS.md J397 (M42) ("the figure rules read relations (devils for an `enemy` relation's lands; whales for a `sailed` gap; a mission road for `faithReached`…)"); V15 §3.6 (5)'s table and the binding rule as they stand; V15 §2.4's thresholds (item 1209); V15 §3.6 (3) ("no road crosses a map's edge"); research/experience/05 §2.2 (1) ("Varn is another campaign at Year 1 071. Nothing relates Varn's seats to Ashmark's … that sea is a `GapStyle` … culture distance bands are a host's, per campaign"), §2.5 C1, §4 Q7.


### Volume 15 — §3.6 A6 — The relational view ((6) Viewpoints: the court's map; an old map and the as-was copy)

**1214.** **A court's map draws the member as that court believes it where the host sends its beliefs and never a truth it does not hold — the looted map; an old map reads the plates each member has and says from which week, the DM's authored past on an as-was copy.**
*Requests:* J397 (M9), (M46), (M50).
*Current text:*
> A DM adds a culture's map (a culture of one member, its centre by the preset's rule, its knowledge by⏎culture), a party's relational map (audience `party`, a culture of the party's choosing, preset `mappaMundi`: "the⏎world as the Ember priests draw it, as far as the party has seen"), or **a map found in a dungeon** (a culture's⏎viewpoint with `asOfWeek` centuries before the present, every member read at its plates and events up to that week,⏎`W_ATLAS_BEHIND_WEEK` where a member's history does not reach so far back): each a `Viewpoint` record, switchable in⏎the picker, each with its own warp bake, known region and figures.
*New text:*
> A DM adds a culture's map (a culture of one member, its centre by the preset's rule, its knowledge by
> culture), a party's relational map (audience `party`, a culture of the party's choosing, preset `mappaMundi`: "the
> world as the Ember priests draw it, as far as the party has seen"), **a court's map** (M9; J-V15.41; audience
> `court:<seat>`, `court: { member; seat }`, knowledge by `court`, a culture and a preset of the DM's choosing — the
> court's own culture by default): the member's picture and facts AS THAT COURT BELIEVES THEM where the host sends them
> — its believed allegiance labels and strength bands drawn as the sway "as {court} believes it, as of week n", its
> believed rows faded by their `confidence` band and captioned "as of week n" (V13 §3.9 and §5.8 as amendments v amend
> them; H39 – H41), read through the port's presentation inputs only (V13 §3.11.6's law (3); M50) — and never a truth the
> court does not hold: no row of the member outside the court's beliefs and reach enters its picture, whatever the
> viewer's key, so the DM's own secrets a court could never know are absent from it; where the host sends no belief for
> that court (a standalone member; a campaign that records none) the court's reach is drawn over the public record with
> `W_ATLAS_COURT_UNSENT` and the legend says so; on the DM's screen each believed mark carries the host's integrity
> register word where sent — clean, worn in the telling, planted — and on no other key (V15 §5.4); the record is `secret`
> until the DM marks it shared: **the looted map** — the DM hands the party the enemy's own map, and what the party reads
> is what that court believed, a planted lie included, with no word that it was planted —, or **an old map** (M46;
> J-V15.46; a culture's or a court's viewpoint with `asOfWeek` in the past: every member read at the plates and events it
> has up to that week and no earlier than its record reaches, `W_ATLAS_BEHIND_WEEK` on the cartouche of a member whose
> record begins later — "this map's record begins at week n; drawn from there" —, the physical ground the member's
> present; a DM who wants the borders of a vanished kingdom authors them on an **as-was copy** (`Viewpoint.asWas`: a
> scratch copy of the member with the past's sway set by `setSwayLock`, read by this viewpoint alone in the member's
> place and arrangement, V15 §2.2) — the feature promises no more): each a `Viewpoint` record, switchable in
> the picker, each with its own warp bake, known region and figures.
*Evidence:* docs/PROGRESS.md J397 (M9), (M46), (M50); V15 §3.6 (6) as it stands; V15 §2.2's `Viewpoint` as items 1204 and 1207 leave it; V13 §3.11.6 (law (3)); V13 §5.8 (3) (the honesty rule), (8) (the plates' start); research/experience/05 §1.3 ("A looted map that teaches the party something true but secret … can only be faked by hand"), §1.4 (the integrity registers: "CLEAN · WORN IN THE TELLING · PLANTED", `docs/DESIGN_FP_SPINE.md:499–520`), §2.2 (4), §2.5 C5, §3 worst 1, §4 Q2, Q12; the host's belief record (`src/domain/worldPulse/beliefMap.js:10–31`) and its planted lures (`docs/DESIGN_FP_INFORMATION.md`, settled cruxes), as the research cites them.


### Volume 15 — §3.6 A6 — The relational view ((8) the legend's honesty: the court's line; where the note lives)

**1215.** **The legend's line under a court viewpoint; the honesty note lives on every screen and in the clerk's answer, and an in-world artefact export may leave it off the image while the record keeps the projection.**
*Requests:* J397 (M9), (M45).
*Current text:*
> **(8) The legend's honesty.** The relational view's legend begins with "drawn as {culture} saw the world at {week}:⏎{centre} at the centre, {orientation} up, its enemies as monsters, the unknown as legend — a projection; every⏎distance and time shown is true" and lists the absent facts that fell to defaults (V15 §1b.5), as V13 §5.8 (2)–(3)'s⏎banner does for a lens; {culture} is the DM's christening of the culture id (`ViewFacts.polity.cultures[].label`), else⏎"culture {id}".
*New text:*
> **(8) The legend's honesty.** The relational view's legend begins with "drawn as {culture} saw the world at {week}:
> {centre} at the centre, {orientation} up, its enemies as monsters, the unknown as legend — a projection; every
> distance and time shown is true" — under a court viewpoint "drawn as the court of {seat} believed the world at {week}:
> … — a projection of that court's beliefs; every distance and time shown is true" (M9), with "the host sends no belief
> for this court: the public record as far as its reach" under `W_ATLAS_COURT_UNSENT` — and lists the absent facts that
> fell to defaults (V15 §1b.5), as V13 §5.8 (2)–(3)'s banner does for a lens; {culture} is the DM's christening of the
> culture id (`ViewFacts.polity.cultures[].label`), else "culture {id}". **Where the note lives** (M45; J-V15.45): the
> note is the tool's honesty, not the artefact's — it prints on every screen under a relational viewpoint (the DM's and a
> player's alike: the screen is the instrument, and the true readout stands beside it) and in the clerk's answer for the
> view ("a projection; the shape lies, the number never does"); a picture export may leave it off the image under the
> export dialog's **as an in-world artefact** switch (off by default; V15 §5.5) — the handout the party holds in play
> carries no line that breaks its fiction —, while the export's record (its provenance block, §11.1) keeps the projection's
> facts: the viewpoint, the preset, the slider's position, "a projection; distances true"; so the file never lies, only
> its face is silent. `atlasTiles` and `atlasGeoJson` are the true plane and carry no note.
*Evidence:* docs/PROGRESS.md J397 (M9), (M45) ("THE HONESTY NOTE stays on the DM's screen and in the clerk's answer; an in-fiction export may omit it (the export dialog's 'as an in-world artefact' switch; the file's record keeps the projection)"); V15 §3.6 (8) and §5.5 as they stand; V13 §5.8 (2)–(3); research/experience/05 §2.2 (5) ("For a DM handing over a looted sheet, that line breaks the fiction. No rule says the note can be left off a player handout"), §4 Q10.


### Volume 15 — §3.7 A7 — Drill-down (the party's reach across a seam)

**1216.** **When a host-bound party enters a continued standalone member, the DM is offered "Mark the party's places here" from the crossing point: the member's party key seeded with the crossing's cell and the route the party took, written on the member's own page.**
*Requests:* J397 (M47).
*Current text:*
> on the **true** point (T-V15-12): a warped click opens the place that is really there.
*New text:*
> on the **true** point (T-V15-12): a warped click opens the place that is really there.
>
> **The party's reach across a seam** (M47; J-V15.47; T-V15-31). Party knowledge is per document (V14 §2.3's `party` key:
> the host's mirror on a host-bound member, the document's own on a standalone one), so a party that crosses from a
> host-bound member into a continued standalone member would arrive on a blank map. When the party of a host-bound
> member stands within `snapEdgeKm` of a continued seam (the party's seat the host sends each advance — V13 §8.5's
> H39 – H41 —, or the DM's drill from a point within that distance of the seam) and the DM drills across it into the
> continued standalone member, or chooses **Mark the party's places here** on the seam (its context action; V09), the
> atlas drafts a `markPartyReach` request (V15 §4.1): the **crossing point** — the drill point, or the crossing of the
> party's route nearest its seat, projected onto the shared stretch —, its coarse cell on the continued member, and
> **the route the party took**: the host-bound member's route to the crossing (already in that member's own key)
> continued by the continued member's own route that begins within `snapEdgeKm` of the crossing, as far as its first
> seat. The request opens the continued member's own page with the seeding previewed, and the member's shared `party`
> key is written there by the DM's one confirmation (V14 §2.3's seeded form, RQ-V15-15: a view key — never an event,
> never a digest, never the host's; the atlas records the request and writes nothing); the DM reveals further by the
> member's own tools. A party viewpoint's known region then grows across the seam as it grows within a member (V15 §3.6
> (6)). A member that is no continuation of the member the party stands on, or a drill from no party place, gets no
> offer (`refuse.atlas.reach.notContinued`, `refuse.atlas.reach.noParty` on a request made by hand): the blank map stays
> the felt edge of the known world where the DM wants one.
*Evidence:* docs/PROGRESS.md J397 (M47) ("when a host-bound party enters a continued standalone member the DM is offered 'mark the party's places here' from the crossing point (the member's party key seeded with the crossing's cell and the route taken)"); V15 §3.7 and §3.4 (8) as they stand; V14 §2.3 (the party key per document; C14-17: the document's own key when no host is bound); V15 §1.1 and §4.7 (no atlas action writes a member's log; T-V15-19's lint over edit entry points, which a view key is not); research/experience/05 §1.6 (2) ("a party that crosses into the Marches arrives at a blank map that the DM must fill by hand. Nothing carries the party's reach over the seam"), §2.3, §3 worst 3, §4 Q11.


### Volume 15 — §3.11 A worked example (step 4's cartouche; step 7 authors the relations it needs; step 8's public file)

**1217.** **The example authors the atlas relations its figures need, so every figure it shows is derivable; its cartouche and its shared file read the player and sharing rules; a court's map joins it.**
*Requests:* J397 (M42), (M43), (M44), (M45), (M9).
*Current text* (a):
> and Varn's digests unchanged (T-V15-11). Its cartouche reads "Year 1, spring".
*New text* (a):
> and Varn's digests unchanged (T-V15-11). Its cartouche reads "Year 1, spring" on the DM's map; on the party's map the
>    Marches carry no date until the DM sets the member's calendar label — "the Year of the Strait" —, which is then the
>    one date word a player sees of it (M43; V15 §5.4).
*Current text* (b):
> 7. **The Ember Church's map** — a viewpoint (audience `party`, culture Ashmark's culture 2, preset `mappaMundi`): the⏎   centre resolves to Sarn (the religion lens's pilgrimage centre of the Church's patron), east up; Varn's lands (its⏎   allegiance at war with Ashmark's) take devils, the far southern sways of another culture at band 5 monstrous⏎   peoples; the sea between Ashmark and Varn is sailed → whales; the deep southern sea with no route → serpents; the⏎   Marches are known as far as the Church's missions reach in four weeks, then one heard-of band, then dragons; "The⏎   Wasting" (a plague realm arc 60 weeks ago at two seats) → two skulls; the legend reads "drawn as the Ember Church⏎   saw the world at Year 413: Sarn at the centre, east up, its enemies as monsters …". The slider at 0.6 swells Sarn's⏎   province to a third of the sheet; hovering the Sarn–Ashby road reads "312 km · 2 weeks 3 days on foot (the default⏎   law, absolute)"; a click on Varn's warped coast opens Varn's page at the true point (T-V15-12). **The party's map**⏎   (audience `party`, culture `none`, `true`): Varn, which the party has never heard of, is parchment.
*New text* (b):
> 7. **The relations between the peoples** (M42): before the Church's map is drawn, the DM authors on the relations box's
>    second tab what the atlas's fiction holds and no member can know — "Varn is Ashmark's enemy" (`enemy`, Ashmark–Varn),
>    "the sea between Ashmark and Varn is sailed" (`sailed`, Ashmark – the sea gap the solve wrote in step 2) and "the
>    Church's faith reached the Marches" (`faithReached`, Ashmark → the Marches); nothing moves and no member's digest
>    changes (T-V15-28). **The Ember Church's map** — a viewpoint (audience `party`, culture Ashmark's culture 2, preset
>    `mappaMundi`): the centre resolves to Sarn (the religion lens's pilgrimage centre of the Church's patron), east up;
>    Varn's lands take devils by the `enemy` relation — one beside each of Varn's sways' root seats, since no war of
>    Varn's can be read against Ashmark's (two campaigns, two clocks: F14) —; Kesh's sways, 900 km beyond unknown lands
>    and of no culture of Ashmark's, monstrous peoples by the `far` clause (no culture band crosses a seam, and no
>    relation names Kesh); the sea between Ashmark and Varn → whales and the portolan's ships by the `sailed` relation
>    (without it: serpents, the gap being unsailed by construction); Ashmark's own deep southern sea with no route →
>    serpents (its bathymetry Ashmark's); the Marches known along the mission road from Sarn to the Marches' first town
>    and four weeks along the Marches' own roads beyond it (the `faithReached` relation; a shrine glyph at the road's
>    end), then one heard-of band, then dragons; "The Wasting" (a plague realm arc 60 weeks ago at two seats of
>    Ashmark) → two skulls; the legend reads "drawn as the Ember Church saw the world at Year 413: Sarn at the centre,
>    east up, its enemies as monsters …" — on the screen; the DM's handout export under **as an in-world artefact**
>    leaves the line off the image and keeps the projection in the file's record (M45). The slider at 0.6 swells Sarn's
>    province to a third of the sheet; hovering the Sarn–Ashby road reads "312 km · 2 weeks 3 days on foot (the default
>    law, absolute)"; a click on Varn's warped coast opens Varn's page at the true point (T-V15-12). Every figure above
>    is derivable by a DM who repeats the three relations (T-V15-6, T-V15-28). **The party's map** (audience `party`,
>    culture `none`, `true`): Varn, which the party has never heard of, is parchment, and no member of the party's map
>    carries a date but the Marches, whose calendar label the DM set in step 4 (M43). **Varn's court's map** (M9): a
>    viewpoint `court:<Varn's capital>` on Varn — a host-bound member of a campaign that records belief —: the DM sees
>    Varn's court's picture of its own realm "as it believes it, as of week n", a believed strength band beside each
>    seat with its register word (one "planted": the lie the party's spies fed it), and of Ashmark nothing — Ashmark lies
>    in another map, of which Varn's court can hold no belief, and no `ally` or `traded` relation widens its reach; marked
>    shared, it is the looted map the party reads, the register words gone.
*Current text* (c):
> 8. **Sharing:** Varn is another user's shared world the user may not re-share → the share sheet excludes it (its⏎   extent "not shared"); the file carries Ashmark, Thornwood, the Marches and Kesh as pictures (T-V15-8).
*New text* (c):
> 8. **Sharing:** Varn is another user's shared world the user may not re-share → the share sheet excludes it (its
>    extent "not shared"); the file carries Ashmark, Thornwood, the Marches and Kesh as their PUBLIC pictures (T-V15-8;
>    M44, T-V15-30): the sheet says so — "this file carries what anyone knows" —, the DM's and the party's tiles are left
>    out, the Ember Church's viewpoint travels only if the DM marked it shared, Varn's court's viewpoint and the drift
>    readings never, and the `enemy` relation travels as a public atlas relation while a relation marked `secret` is
>    removed, not withheld.
*Evidence:* docs/PROGRESS.md J397 (M42) ("V15 §3.11's example reads from such relations, authored in the example"), (M43), (M44), (M45), (M9); V15 §3.11 steps 4, 7 and 8 as they stand; V15 §3.6 (5) as item 1213 leaves it; research/experience/05 §2.2 (1) ("A DM who tries to reproduce §3.11 will get dragons where the example promised devils"), §2.5 C1, C3, §4 Q7, Q8, Q9.


### Volume 15 — §4.1 The edit events (`setAtlasRelation`; `markPartyReach`; `setAttr`'s targets; the outcome rows)

**1218.** **Two edit kinds — the atlas relation and the party-reach request —, the attributes the rulings add to `setAttr`, and the new refusal keys and warning.**
*Requests:* J397 (M42), (M47), (M43), (M9), (M46).
*Current text* (a):
>   | { t: 'unrelate'; relation: Id }
*New text* (a):
>   | { t: 'unrelate'; relation: Id }
>   | { t: 'setAtlasRelation'; action: 'add'; relation: Omit<AtlasRelation, 'id' | 'lifecycle' | 'reason'> } | { t: 'setAtlasRelation'; action: 'remove'; relation: Id }   // M42: the atlas's own record of what its fiction holds between members (V15 §2.2); the fold writes the record and invalidates every viewpoint's derived figures and known region (re-derived at the next bake); no solve runs, no member is read or written; refuses `refuse.atlas.relation.self` (`a` and `b` one member) and `refuse.atlas.relation.gap` (a gap named under a kind other than `sailed`)
*Current text* (b):
> previewed there; nothing happens in the atlas but the record and, on the member's commit, a refresh
*New text* (b):
> previewed there; nothing happens in the atlas but the record and, on the member's commit, a refresh
>   | { t: 'markPartyReach'; seam: [Id, Id]; from: Id /* the host-bound member the party stands on */; to: Id /* the continued standalone member */; crossing: { at: AtlasPointCm; cell: number /* the crossing's coarse cell on `to` */ }; route?: { onFrom?: Id; onTo?: Id } /* the party's route to the crossing and the continued member's route from it */ }   // M47 (V15 §3.7): a request record: the fold opens `to`'s own page with the seeding of its shared `party` key previewed — the crossing's cell and `onTo`'s stations to its first seat — written there by the DM's confirmation as a view key (V14 §2.3's seeded form; RQ-V15-15): nothing happens in the atlas but the record; refuses `refuse.atlas.reach.notContinued` (`to` is no continuation of `from`) and `refuse.atlas.reach.noParty` (`from` sends no party seat and the DM drilled from no party place)
*Current text* (c):
> `setAttr` admits a member's `name` and `shareable` (narrowing only: a value wider than the world's own sharing is⏎refused `refuse.atlas.share`), a gap's `label`, a viewpoint's `name`, a seam's `treatment` (`ease` | `inset`, keyed by⏎the pair).
*New text* (c):
> `setAttr` admits a member's `name`, `shareable` (narrowing only: a value wider than the world's own sharing is
> refused `refuse.atlas.share`) and `calendarLabel` (M43), a gap's `label`, a viewpoint's `name` and `knownTo` (`public`
> marks it shared — a court viewpoint so marked is the looted map handed to the party, M9), an atlas relation's `knownTo`
> (M42), a seam's `treatment` (`ease` | `inset`, keyed by
> the pair).
*Current text* (d):
> `refuse.atlas.fit.covers`, `refuse.atlas.drill.unopenable`, `refuse.atlas.drill.audience`, `refuse.atlas.export` (a⏎world-shaped export asked of an atlas, V15 §5.5);
*New text* (d):
> `refuse.atlas.fit.covers`, `refuse.atlas.drill.unopenable`, `refuse.atlas.drill.audience`, `refuse.atlas.export` (a
> world-shaped export asked of an atlas, V15 §5.5), `refuse.atlas.relation.self`, `refuse.atlas.relation.gap` (M42),
> `refuse.atlas.asWas` (an as-was copy whose lineage is not the member's, M46), `refuse.atlas.reach.notContinued`,
> `refuse.atlas.reach.noParty` (M47);
*Current text* (e):
> `W_ATLAS_NOT_SHARED` (`keep`, `include` where the⏎world's own sharing allows) —
*New text* (e):
> `W_ATLAS_NOT_SHARED` (`keep`, `include` where the
> world's own sharing allows), `W_ATLAS_COURT_UNSENT` (`keep`, `remove`; a court viewpoint whose member sends no belief,
> M9) —
*Evidence:* docs/PROGRESS.md J397 (M42), (M47), (M43), (M9), (M46); V15 §4.1 as it stands (the union, `setAttr`'s targets, the outcome rows and BCR-V15-4's conflict actions); V15 §2.2 as items 1204–1207 leave it; V14 §2.3's `party` key (a shared view key; BCR-V14-19).


### Volume 15 — §4.2 The authoring tools (T7's second tab; T9's court, calendar label and reach) and §4.3 Locality (the two new edits)

**1219.** **The relations box's second tab, the viewpoint sheet's court and as-was fields, the member card's calendar label, the seam's reach action; the locality rows of the two new edits.**
*Requests:* J397 (M42), (M9), (M43), (M46), (M47).
*Current text* (a):
> | T7 `roster` | the **relations box**: chips (member · relation · member · width or side), or a typed sentence sent to the clerk's parse (V10), each relation's met/unmet mark, **Arrange** | the solve's dry run as ghost outlines with the verification list |
*New text* (a):
> | T7 `roster` | the **relations box**: chips (member · relation · member · width or side), or a typed sentence sent to the clerk's parse (V10), each relation's met/unmet mark, **Arrange**; its second tab **Between the peoples** (M42): the atlas relations as chips (member · enemy / ally / faith reached / sailed / traded · member or sea), a typed sentence parsed by the clerk, each with its dates and its shared mark | the solve's dry run as ghost outlines with the verification list; an atlas relation's figures previewed on the current viewpoint |
*Current text* (b):
> the **viewpoint picker** and its New viewpoint sheet; the **style cards** | the fit's preview on the parent's page (V13's own); the viewpoint's resolved centre and known region outlined |
*New text* (b):
> the **viewpoint picker** and its New viewpoint sheet (an audience of `dm`, `party`, `public` or **a court** — a host-bound member and its seat, M9; the as-of week of **an old map** and its as-was copies, M46; the shared mark); a member card's **calendar label** (M43); **Mark the party's places here** on a continued seam (M47); the **style cards** | the fit's preview on the parent's page (V13's own); the viewpoint's resolved centre and known region outlined; a court viewpoint's picture with its register words (the DM) |
*Current text* (c):
> | `relate`, `unrelate` (with `solve: false`) | the record alone; the box's marks | every arrangement | — |
*New text* (c):
> | `relate`, `unrelate` (with `solve: false`) | the record alone; the box's marks | every arrangement | — |
> | `setAtlasRelation` (M42) | the record; every viewpoint's derived figures and known region invalidated (re-baked on request) | every arrangement; every member's imagery; every member (never read, never written) | — |
*Current text* (d):
> | `rematchStrip` | the request record; on the member's commit, A2 for that member and A3 over the seam | the neighbour (never touched) | the member's regenerate over the strip is V13's edit on that member, previewed there |
*New text* (d):
> | `rematchStrip` | the request record; on the member's commit, A2 for that member and A3 over the seam | the neighbour (never touched) | the member's regenerate over the strip is V13's edit on that member, previewed there |
> | `markPartyReach` (M47) | the request record | every member's log and digests (the seeding is a view key written on the member's own page by the DM) | the continued member's `party` key, written there under V14 §2.3 |
*Evidence:* docs/PROGRESS.md J397 (M42), (M9), (M43), (M46), (M47); V15 §4.2's and §4.3's tables as they stand; V15 §4.1 as item 1218 leaves it.


### Volume 15 — §4.7 Microcosms ((1) the reads across members restated; (2) a player's cartouche)

**1220.** **The only reads across members are the seams' drift readings, the continuation's charters, the fit's mismatch and the atlas's own relation records, which feed figures only; a player's cartouche carries no bookkeeping.**
*Requests:* J397 (M42), (M43), (M47).
*Current text* (a):
> 1. **Nothing crosses a seam after generation.** No event of an atlas and no refresh of a member reads one member to⏎   change another; the only reads across members are the seams' drift readings (information), the continuation's⏎   charters (at the new member's generation, before it exists) and the fit's mismatch and placement (at the fit, the⏎   user's explicit act on the parent). T-V15-1 asserts: an edit of any kind on one member leaves every other member's⏎   model and records digests byte-equal and the atlas's model digest byte-equal.
*New text* (a):
> 1. **Nothing crosses a seam after generation.** No event of an atlas and no refresh of a member reads one member to
>    change another; the only reads across members are the seams' drift readings (information), the continuation's
>    charters (at the new member's generation, before it exists), the fit's mismatch and placement (at the fit, the
>    user's explicit act on the parent) and **the atlas's own relation records** (M42; V15 §2.2's `AtlasRelation`), which
>    feed the relational view's figures and known regions only (V15 §3.6 (4), (5)) and are never read by a member; the
>    relational view reads each member's own facts at that member's own version for the land they describe and never
>    one member's facts against another's — a figure that crosses a seam comes from an atlas relation alone. The party's
>    reach across a continued seam (M47; V15 §3.7) is the DM's own write of the continued member's `party` view key on
>    that member's page, not a read of one member by another. T-V15-1 asserts: an edit of any kind on one member leaves
>    every other member's model and records digests byte-equal and the atlas's model digest byte-equal; T-V15-28 that an
>    atlas relation moves no member's digest.
*Current text* (b):
>    on each member (under `AtlasStyleState.dateCartouches`) prints V13's date label for that member — "Year 412, early⏎   spring" — in the viewpoint's lettering; two members' cartouches may differ by centuries, and the atlas says nothing⏎   of it (there is no atlas clock to disagree with).
*New text* (b):
>    on each member (under `AtlasStyleState.dateCartouches`) prints V13's date label for that member — "Year 412, early
>    spring" — in the viewpoint's lettering for the DM; two members' cartouches may differ by centuries, and the atlas says
>    nothing of it (there is no atlas clock to disagree with). **A player's cartouche carries no bookkeeping** (M43;
>    J-V15.43): under a `party`, `public` or shared court viewpoint the cartouche prints the member's `calendarLabel` — the
>    DM's in-world calendar name for it ("the Year of the Strait") — or nothing; V13's date label, the week, the version
>    and the behind-week mark reach no player (V15 §5.4; T-V15-32).
*Evidence:* docs/PROGRESS.md J397 (M42) ("§4.7 (1) restated: the only reads across members are the seams' drift readings, the continuation's charters, the fit's mismatch AND the atlas's own relation records, which feed figures only"), (M43), (M47); V15 §4.7 (1), (2) as they stand; research/experience/05 §2.5 C1, C3, §2.3.


### Volume 15 — §4.8 The clerk's view and the catalogue (the atlas relation, the court viewpoint and the view answered; the new keys)

**1221.** **The clerk answers an atlas relation, a court viewpoint and the view itself with the honesty note's words; the catalogue gains the rulings' keys.**
*Requests:* J397 (M42), (M9), (M45), (M44), (M47).
*Current text* (a):
> a continuation ("edge N from Varn, locked, 212 km shared; contradiction⏎at the NE corner: Varn's sea meets Kesh's plateau — a strait proposed"); `whatChanged` over the atlas's log and
*New text* (a):
> a continuation ("edge N from Varn, locked, 212 km shared; contradiction
> at the NE corner: Varn's sea meets Kesh's plateau — a strait proposed"), an atlas relation ("Varn is Ashmark's enemy:
> the DM's word, undated; feeds the devils beside Varn's three seats and nothing else" — M42), a court viewpoint ("drawn
> as the court of Varn believes it, as of week 40: the strength band of Ashby a believed row, worn in the telling" — the
> DM's answer; a player's answer carries the belief and no register word, M9) and the view itself (the honesty note's
> words — "a projection; the shape lies, the number never does" — whatever the export switch did to the image, M45);
> `whatChanged` over the atlas's log and
*Current text* (b):
> the⏎legend's notes (V15 §3.6 (8)) — English, our own words, lint-checked (V15 §3.6 (5)).
*New text* (b):
> the
> legend's notes (V15 §3.6 (8)), `info.atlas.courtUnsent` (the no-belief arm's line, M9), `share.atlas.publicOnly` (the
> share sheet's line "this file carries what anyone knows", M44), `info.atlas.inWorld` (the export switch's words, M45)
> and `info.atlas.reach` (the offer "Mark the party's places here", M47) — English, our own words, lint-checked (V15 §3.6
> (5)).
*Evidence:* docs/PROGRESS.md J397 (M42), (M9), (M45) ("in the clerk's answer"), (M44), (M47); V15 §4.8 as it stands; V10 §3.9, §3.9a (the why providers); V09 §4.9 (the catalogue's families).


### Volume 15 — §5.1 The atlas page (the relations box's second tab; the member card's calendar label; the Viewpoints tab)

**1222.** **The page shows the atlas relations' tab, a member's calendar label and the court and as-was fields of a viewpoint.**
*Requests:* J397 (M42), (M43), (M9), (M46).
*Current text* (a):
> the relations box (T7's) with its chips⏎and Arrange; the view bar's slider, viewpoint picker, common-week toggle, Show drift and Show relations.
*New text* (a):
> the relations box (T7's) with its chips
> and Arrange and its second tab for the atlas relations (M42); the view bar's slider, viewpoint picker, common-week
> toggle, Show drift and Show relations.
*Current text* (b):
> a card per member: its thumbnail, name, rung, date, version, the stale⏎or missing mark, the lock, the shareable flag, Refresh, Keep detail, Remove
*New text* (b):
> a card per member: its thumbnail, name, rung, date, version, the stale
> or missing mark, the lock, the shareable flag, its calendar label (M43: the one date word a player will see of it,
> blank until set), Refresh, Keep detail, Remove
*Current text* (c):
> the **Viewpoints** tab (the picker's long form: audience, culture, centre rule, orientation, preset, as-of⏎week, knowledge source)
*New text* (c):
> the **Viewpoints** tab (the picker's long form: audience — the DM's, the party's, anyone's, or a court's seat on a
> host-bound member (M9) —, culture, centre rule, orientation, preset, as-of week with its as-was copies (an old map,
> M46), knowledge source, the shared mark)
*Evidence:* docs/PROGRESS.md J397 (M42), (M43), (M9), (M46); V15 §5.1 as it stands; V15 §4.2 as item 1219 leaves it; RQ-V15-14 (item 1233: V09 draws them).


### Volume 15 — §5.2 The atlas view: layers and styles (the cartouches, the legend's note, the relations layer)

**1223.** **A player's cartouche prints the calendar label or nothing; the legend's note is on every screen; the DM-only relations layer draws the atlas relations too.**
*Requests:* J397 (M43), (M45), (M42).
*Current text* (a):
> | `cartouches` | vector | each member's date cartouche ("Year 412, early spring"; stale and behind-week marks), the viewpoint's cartouche and the title | the preset's lettering |
*New text* (a):
> | `cartouches` | vector | each member's date cartouche — for the DM V13's date label ("Year 412, early spring") with the stale and behind-week marks; for a player viewpoint the member's `calendarLabel` or nothing (M43; V15 §5.4) —, the viewpoint's cartouche and the title | the preset's lettering |
*Current text* (b):
> the legend with its honesty note and, where a member's picture carries the cover overlay, the one line "derived land cover" (V13 §5.8 (9); J394) |
*New text* (b):
> the legend with its honesty note (on every screen; left off an in-world artefact export's image alone, M45) and, where a member's picture carries the cover overlay, the one line "derived land cover" (V13 §5.8 (9); J394) |
*Current text* (c):
> | `relations` (DM-only, `showRelations`) | vector | dashed lines a → b with the kind's glyph, red where unmet | the notice style |
*New text* (c):
> | `relations` (DM-only, `showRelations`) | vector | dashed lines a → b with the kind's glyph, red where unmet; the atlas relations (M42) as dotted lines with their kind's glyph (a sword, a clasped hand, a shrine, a ship, a bale), a dated one with its weeks | the notice style |
*Evidence:* docs/PROGRESS.md J397 (M43), (M45), (M42); V15 §5.2's table as it stands; V15 §3.6 (8) as item 1215 leaves it.


### Volume 15 — §5.4 Player views (what admission withholds; no date reaches a player; a court viewpoint opened to the party; the style for every account)

**1224.** **A player's admission withholds the secret atlas relations, the unshared court viewpoints and every date word but the calendar label; a shared court viewpoint is the looted map; the relational style is open to every account kind.**
*Requests:* J397 (M43), (M9), (M48), (M42).
*Current text* (a):
> relations and drift readings (`secret`), the DM's viewpoints not marked shared, a hidden embellishment, a member's⏎version and state words;
*New text* (a):
> relations and drift readings (`secret`), the atlas relations marked `secret` (M42), the DM's viewpoints not marked shared
> (a court viewpoint among them until the DM shares it, M9), a hidden embellishment, a member's version and state words
> and — unless its `calendarLabel` stands in — its date label, week number and behind-week mark (M43);
*Current text* (b):
> **The player's style:** a party⏎viewpoint's preset is the DM's choice for the party (the default `true`); "as their culture would draw it" is a party⏎viewpoint with a culture and a relational preset. A picture export under a player viewpoint carries the same⏎admission (§11.1's knowledge rule); a `.dd2vtt` export does not exist for an atlas (V15 §5.5).
*New text* (b):
> **The player's style:** a party
> viewpoint's preset is the DM's choice for the party (the default `true`); "as their culture would draw it" is a party
> viewpoint with a culture and a relational preset. **No date reaches a player** (M43; J-V15.43; T-V15-32): under a
> `party`, `public` or shared court viewpoint a member's cartouche prints its `calendarLabel` or nothing — V13's date
> label, the week number, the version and state words and the behind-week mark are withheld by admission in the view,
> the member list, every answer and every export at the player's key; the `dateCartouches` switch shows a player no date.
> **A court viewpoint opened to the party** (M9; J-V15.41; T-V15-27): a `court:<seat>` viewpoint the DM marked shared is
> admitted at the party's key as the looted map — the court's reach and the facts that court believes as the host sent
> them, the DM's act of sharing being the reveal of that court's picture and nothing more: no row of the member outside
> the court's beliefs and reach enters it at any key, and the host's integrity register (clean · worn in the telling ·
> planted) is withheld from every key but the DM's, so a planted lie reads as the court's belief and nothing else; a
> court viewpoint not marked shared is absent from a player's picker, list, answers and exports. **The style is for every
> account** (M48; J-V15.48; T-V15-34): the relational style is presentation over the image-only atlas and carries no gate
> of its own — every account kind that may open an atlas (a free account's image-only atlas included; J396 (2)) bakes,
> slides, views and exports it, and a shared file's recipient reads the sharer's shared viewpoints read-only; continuation
> and fit stay premium (V13 §2.3's `PresetRule.gate`; J396 (2) otherwise unchanged; RQ-V15-12). A picture export under a
> player viewpoint carries the same
> admission (§11.1's knowledge rule); a `.dd2vtt` export does not exist for an atlas (V15 §5.5).
*Evidence:* docs/PROGRESS.md J397 (M43), (M9) ("DM-only unless the DM opens it"; "players never"), (M48) ("THE RELATIONAL STYLE is open to every account kind (presentation); continuation and fit stay premium (J396 (2) otherwise unchanged)"), (M42); J396 (2) (the gate's rows: a free account's "atlas as an image-only save with arrangement and drill-down"; a premium account's "continuation and fit" — the style named nowhere); V13 §2.3's `PresetRule.gate` (file u item 1057); V15 §5.4 as it stands; research/experience/05 §1.3, §1.6 (1), (3), §2.4 ("whether the relational style is open to free accounts … J396 (2) … is silent on the style"), §4 Q2, Q8, Q13.


### Volume 15 — §5.5 Exports and sharing (the in-world artefact switch; the shared file as the public audience; the sheet's line; the gallery copy)

**1225.** **A picture export's "as an in-world artefact" switch leaves the honesty note off the image and keeps the projection in the record; the shared file and the published copy carry the public audience only, and the sheet says so.**
*Requests:* J397 (M45), (M44).
*Current text* (a):
> the legend with its honesty note; the provenance block names the atlas's digests, every member's version and the renderer version | §11.1 unchanged; the atlas is one more document kind; the knowledge key admits as V15 §5.4 |
*New text* (a):
> the legend with its honesty note — left off the image under the export dialog's **as an in-world artefact** switch (M45; `ExportOpts.atlas.inWorld`, default false; BCR-V15-17), the record then carrying the projection in its place; the provenance block names the atlas's digests, every member's version, the renderer version and the projection (the viewpoint, the preset, the slider's position, "a projection; distances true"), whether or not the note is drawn | §11.1 unchanged; the atlas is one more document kind; the knowledge key admits as V15 §5.4; an in-world artefact is silent on its face and honest in its record (T-V15-33) |
*Current text* (b):
> | the `.plat` atlas and the shared atlas | §2.9's container; the share writer's form (V15 §2.11) | the records; the imagery cache embedded for shareable members only | the share sheet (below) |
*New text* (b):
> | the `.plat` atlas and the shared atlas | §2.9's container; the share writer's form (V15 §2.11) | the records; the imagery cache embedded for shareable members only — in the shared atlas the `public` audience's imagery alone, every secret record removed (M44) | the share sheet (below) |
*Current text* (c):
> **sharing shares imagery only for members the user may share**, never a member's data (the atlas holds none) and never⏎an unshareable member's picture (T-V15-8).
*New text* (c):
> **sharing shares imagery only for members the user may share**, never a member's data (the atlas holds none) and never
> an unshareable member's picture (T-V15-8) — **and only the public audience's picture** (M44; J-V15.44; T-V15-30): the
> sheet says so in one line, "this file carries what anyone knows: the public pictures of the maps you may share; your own
> and the party's pictures and every secret record are left out"; the writer strips the DM's, every party's and every
> court's tiles and removes the records below the `public` key (V15 §2.11's list) rather than leaving them to a viewer's
> admission (a DM who wants to hand over a DM picture exports a picture, (2), under its own admission).
*Current text* (d):
> gallery entitlement, never a map-side one. A recipient's atlas is read-only⏎(`shared: true`): pictures, arrangement, viewpoints; drill-down only into members the recipient can resolve.
*New text* (d):
> gallery entitlement, never a map-side one, and the published copy is the share writer's file — the public audience by
> rule, never a choice on the sheet (M44). A recipient's atlas is read-only
> (`shared: true`): the public pictures, the arrangement, the shared viewpoints; drill-down only into members the
> recipient can resolve.
*Evidence:* docs/PROGRESS.md J397 (M45), (M44); V15 §5.5's table and sharing paragraph as file u's E-6 left them; V15 §2.11 as item 1211 leaves it; V09 §5.11 (the share sheet) and J-V9.13 (the Picture option's "what anyone knows"); research/experience/05 §1.7 (the shared container "embeds every shareable member's imagery … at the stops cached"; "The file option names no audience"), §2.2 (5), §4 Q9, Q10.


### Volume 15 — §7.2 The relational view (T-V15-27 – T-V15-29, after T-V15-25)

**1226.** **Three tests: the court viewpoint, the atlas relations, an old map and its as-was copy.**
*Requests:* J397 (M9), (M42), (M46), (M50).
*Current text:*
> whose true viewpoint draws R pixel-identical to V13's view drawing the `atlas` layer set | the plate fixture; the party key edits |
*New text:*
> whose true viewpoint draws R pixel-identical to V13's view drawing the `atlas` layer set | the plate fixture; the party key edits |
> | T-V15-27 (the court viewpoint, M9) | on B-ATLAS-VIEW with R's scripted lens set extended by a court's believed rows for the capital's court — a believed strength band of one seat two bands below the truth, a believed allegiance label differing from the truth, one seat the court never heard of, one believed row the mock host marks planted, and one DM-only row of R outside the court's belief —: the court viewpoint draws the believed band and label and not the true ones, the unheard seat absent, the DM-only row absent at EVERY key (the DM's included), the planted row's mark carrying "planted" at the DM's key and no register word at the party's; marked shared, the viewpoint appears in the party's picker and draws the same picture less the register words; not marked shared, it is absent from the party's picker, list, answers and exports; on a standalone member, and under a mock host sending no belief for the court, the court's reach is drawn over the public record with `W_ATLAS_COURT_UNSENT` and the legend's line; the known region equals the `court` rule's set widened by the believed rows' subjects; the viewpoint's facts arrive through the port's presentation inputs only — the mock port's recorded-input channel receives nothing (M50; the port's law (3), T-V13-7) | the extended lens set; the two keys' pictures compared; the mock port's channels |
> | T-V15-28 (atlas relations feed figures only, M42) | on B-ATLAS-3 (R and R2) under a culture viewpoint of R: adding `enemy` R–R2 adds exactly one devils figure per sway of R2 beside its root seat and nothing else; `sailed` on the sea-gap fixture's gap replaces its serpents with whales and ships and moves its density class to `sailedSea`; `faithReached` R → R2 adds one mission road ending at R2's nearest seat with a shrine glyph and widens the known region by that seat and the cells four weeks along R2's own routes from it; `ally` widens it by R2's seats; `traded` by R2's seats of `city.minTier` or above; a relation dated outside the viewpoint's week changes nothing; a relation marked `secret` draws its figures for the DM's viewpoint and none for the party's; every figure so added carries `derivedFrom` naming the relation; renaming every culture, deity, seat and member of the fixture changes no figure (T-V15-6 (a) re-run with the relations present); R's and R2's model and records digests are byte-equal before and after every relation added or removed, and the atlas's model digest moves exactly once per edit; removing a relation restores the figure set byte-identically; `refuse.atlas.relation.self` and `refuse.atlas.relation.gap` on their inputs | the relation edits over B-ATLAS-3; the digests; the figure sets compared |
> | T-V15-29 (an old map and the as-was copy, M46) | a culture viewpoint of R with `asOfWeek` 200 weeks before R's first plate draws R at its first plate with `W_ATLAS_BEHIND_WEEK` on its cartouche naming the first plate's week, its physical ground R's present, no sway or event later than the first plate; an as-was copy of R (a clone with a `setSwayLock` painting a vanished allegiance over R's north) named in `asWas` is drawn in R's place for that viewpoint alone — R's own picture under every other viewpoint byte-identical, R's digests unchanged, the copy absent from the member list, the share writer's file and every export's provenance but this viewpoint's picture export; an `asWas` naming a document whose lineage is not R's is refused `refuse.atlas.asWas` | the plate fixture; the cloned copy; the viewpoints' pictures |
*Evidence:* docs/PROGRESS.md J397 (M9), (M42), (M46), (M50); V15 §7.2 as it stands (B-ATLAS-VIEW's four viewpoints; T-V15-6, T-V15-25); V13 §3.11.6 (law (3); T-V13-7); research/experience/05 §4 Q2, Q7, Q12.


### Volume 15 — §7.3 Saves, arrangement, seams, continuation, drill-down (T-V15-30, T-V15-31, after T-V15-22)

**1227.** **Two tests: the shared file and the gallery copy carry the public audience only; the party's reach across a seam.**
*Requests:* J397 (M44), (M47).
*Current text:*
> every other member's imagery version unchanged; no solve ran (every arrangement's `since` unchanged) | the fixture's edits; the records compared |
*New text:*
> every other member's imagery version unchanged; no solve ran (every arrangement's `since` unchanged) | the fixture's edits; the records compared |
> | T-V15-30 (the shared file and the gallery copy carry the public audience only, M44) | the shared atlas written from B-ATLAS-SHARE with a party key on R, a court viewpoint on R marked shared, an `enemy` atlas relation marked `secret`, a drift reading above threshold and a hidden embellishment: the file re-read holds R's `public` tiles alone (no tile keyed `dm`, `party:*` or `court:*` — a byte scan of the container's cache), no `Relation`, no secret `AtlasRelation`, no `DriftReading`, no hidden embellishment, no member `version` word and no `asWas` reference (a byte scan of the entities block for each record kind), the shared court viewpoint present with its facts as the public key admits them (no register word); the sheet's line names the rule; the mock host's gallery copy is byte-identical to the share writer's file; the recipient's view, list, answers and exports equal the sharer's public viewpoint pixel for pixel | the share writer's file re-read; the byte scans; the mock gallery; the recipient harness |
> | T-V15-31 (the party's reach across a seam, M47) | on B-ATLAS-3 with R host-bound under a mock host sending the party's seat within `snapEdgeKm` of the R–R2 seam and R2 a continued standalone member: the DM's drill across the seam offers **Mark the party's places here**; accepted, R2's page opens with the seeding previewed — the crossing's cell and R2's route from the crossing to its first seat — and the DM's confirmation writes R2's shared `party` key with exactly those places (a view key: R2's log, model digest and records digest byte-equal; the mock host receives nothing); the party viewpoint's known region on the atlas then covers those cells; with the party's seat elsewhere, no offer; a request by hand on a member that is no continuation of R is refused `refuse.atlas.reach.notContinued`; the atlas's log holds the request record alone | the mock host's party seat; R2's key and digests; the known region compared |
*Evidence:* docs/PROGRESS.md J397 (M44), (M47); V15 §7.3 as it stands (B-ATLAS-SHARE, B-ATLAS-3; T-V15-8, T-V15-26); V14 §2.3's `party` key; research/experience/05 §1.7, §4 Q9, Q11.


### Volume 15 — §7.4 Editing, view, exports, budgets, platform (T-V15-32 – T-V15-34, after T-V15-24)

**1228.** **Three tests: no date reaches a player; the honesty note and the in-world artefact; the relational style for every account.**
*Requests:* J397 (M43), (M45), (M48).
*Current text:*
> every `refuse.atlas.*` row renders its catalogue line with at least one button (T-V9-13's rule); `W_ATLAS_*` never a refusal | the provoking fixtures; the catalogue test |
*New text:*
> every `refuse.atlas.*` row renders its catalogue line with at least one button (T-V9-13's rule); `W_ATLAS_*` never a refusal | the provoking fixtures; the catalogue test |
> | T-V15-32 (no date reaches a player, M43) | on B-ATLAS-VIEW under the party viewpoint and the public viewpoint with R's `calendarLabel` unset: no cartouche, member-list entry, `why` answer, hover card or export at the player's key contains R's date label, its week number, its version words or the behind-week mark (T30-5's enumeration over the strings), whatever `dateCartouches` holds; with the label set to "the Year of the Strait" exactly that string prints on R's cartouche for the player and nothing else of the date; the DM's viewpoint prints V13's date label throughout; a shared court viewpoint follows the player rule | the admission harness; the string enumeration |
> | T-V15-33 (the honesty note and the in-world artefact, M45) | the picture export of B-ATLAS-VIEW's mappa mundi viewpoint with `inWorld` false carries the legend's note on the image; with `inWorld` true the image carries no note (the legend layer's draw list holds no note entity; the legend's region pixel-equal to the viewpoint drawn without it) while its provenance block names the viewpoint, the preset, the slider's position and the words "a projection; distances true"; the screen under the same viewpoint draws the note at the DM's and the party's keys alike; the clerk's answer for the view carries the note's words under either export; `atlasTiles` and `atlasGeoJson` carry no note and no `inWorld` field | the export harness; the draw list; the provenance block |
> | T-V15-34 (the relational style for every account, M48) | under the dialog harness's three account fixtures (V13's T-V13-73's), a free account on an image-only atlas bakes a warp, moves the slider, switches viewpoints and presets, places a figure and exports the picture — every control present and enabled, no `refuse.surface.gate` raised by any act of A6 —, while its continuation and fit are refused `refuse.surface.gate` with the row named; a premium account's acts are all accepted; a shared file's recipient toggles the sharer's shared viewpoints and bakes nothing new; the anonymous fixture has no atlas to open (its gate row) and the style is asked of it nowhere | the three account fixtures over the atlas page; the mock host |
*Evidence:* docs/PROGRESS.md J397 (M43), (M45), (M48); J396 (2) and V13 §2.3's `PresetRule.gate` and T-V13-73 (file u items 1057, 1058); V15 §7.4 as it stands (T-V15-18's admission harness); research/experience/05 §4 Q8, Q10, Q13.


### Volume 15 — §7.5 The report codes (`W_ATLAS_COURT_UNSENT`; the new refusal keys)

**1229.** **The report codes gain the court warning and the five refusal keys.**
*Requests:* J397 (M9), (M42), (M46), (M47).
*Current text* (a):
> | `W_ATLAS_NOT_SHARED` | warning | the share writer | the member |
*New text* (a):
> | `W_ATLAS_NOT_SHARED` | warning | the share writer | the member |
> | `W_ATLAS_COURT_UNSENT` | warning | A2, A6 (a court viewpoint whose member sends no belief for that court; M9) | the viewpoint, the court's seat, the member |
*Current text* (b):
> `refuse.atlas.drill.audience`, `refuse.atlas.export` | refusal: a §7.1 outcome key rendered by V09's catalogue, never a `ReportCode` | the dry run; the view; the export dialog | the member, the distance, the count, the reference, the world's sharing, the version, the mode, the audience, the format |
*New text* (b):
> `refuse.atlas.drill.audience`, `refuse.atlas.export`, `refuse.atlas.relation.self`, `refuse.atlas.relation.gap` (M42), `refuse.atlas.asWas` (M46), `refuse.atlas.reach.notContinued`, `refuse.atlas.reach.noParty` (M47) | refusal: a §7.1 outcome key rendered by V09's catalogue, never a `ReportCode` | the dry run; the view; the export dialog | the member, the distance, the count, the reference, the world's sharing, the version, the mode, the audience, the format; the relation's members or gap; the copy's lineage; the seam and the party's place |
*Evidence:* docs/PROGRESS.md J397 (M9), (M42), (M46), (M47); V15 §7.5 as it stands; V15 §4.1 as item 1218 leaves it (BCR-V15-13's and BCR-V15-18's homes).


### Volume 15 — §8 Build plan (SA1's and SA4's content and exits; the dependencies on the host's believed rows)

**1230.** **Where each ruling lands: the records, the sharing rule, the calendar label and the reach request in SA1; the court viewpoint, the atlas relations' figures, the old map, the export switch and the ungated style in SA4; a court's believed picture waits on the host's rows and falls to the public record until then.**
*Requests:* J397 (M9), (M42), (M43), (M44), (M45), (M46), (M47), (M48).
*Current text* (a):
> the exports (BCR-V15-6) and the share writer; the clerk's section; the `atlas.none` pin |
*New text* (a):
> the exports (BCR-V15-6) and the share writer (the public audience only, M44); the atlas relations' records and the relations box's second tab (M42), the calendar label (M43), `markPartyReach` and its offer (M47; the party's seat read where H39 – H41 send it); the clerk's section; the `atlas.none` pin |
*Current text* (b):
> T-V15-19, T-V15-20, T-V15-21, T-V15-24; the register check | 2–3.25 |
*New text* (b):
> T-V15-19, T-V15-20, T-V15-21, T-V15-24, T-V15-28 (its record and digest clauses), T-V15-30, T-V15-31 (under a mock host sending the party's seat; standalone, the refusal with its reason), T-V15-32; the register check | 2–3.25 |
*Current text* (c):
> the viewpoints (the defaults, a culture's, as-of, the party's), **View relationally…** on the world page; the tables `atlas.style` and `atlas.embellish` |
*New text* (c):
> the viewpoints (the defaults, a culture's, an old map with its as-was copies — M46 —, the party's, a court's — M9: its picture and facts through RQ-V15-13 where the host sends belief, else `W_ATLAS_COURT_UNSENT`), the atlas relations' figure rules and known-region widenings (M42), the in-world artefact export switch (M45), the style for every account kind (M48), **View relationally…** on the world page; the tables `atlas.style` and `atlas.embellish` |
*Current text* (d):
> | T-V15-5, T-V15-6, T-V15-25, T-V15-18 (the relational viewpoints); the owner's sitting on the three presets (V12 §3.6b, legibility and immersion rated, the sitting's rows offered); the register check | 1.75–2.5 |
*New text* (d):
> | T-V15-5, T-V15-6, T-V15-25, T-V15-18 (the relational viewpoints), T-V15-27, T-V15-28 (its figure clauses), T-V15-29, T-V15-33, T-V15-34; the owner's sitting on the three presets (V12 §3.6b, legibility and immersion rated, the sitting's rows offered; a court's looted map and the worked example's figures shown in it); the register check | 1.75–2.5 |
*Current text* (e):
> SA4 waits on M-W5 (the lenses' facts through⏎`viewFacts`, RQ-V15-4) and on nothing of amendments r beyond M-W5;
*New text* (e):
> SA4 waits on M-W5 (the lenses' facts through
> `viewFacts`, RQ-V15-4) and on nothing of amendments r beyond M-W5 — a court viewpoint's believed picture waits on the
> host's believed rows (V13 §8.5's H39 – H41, amendments v; dark, it draws the public record within the court's reach,
> `W_ATLAS_COURT_UNSENT`) and the party's reach across a seam on the party's seat the same rows send (dark, no offer);
> the experience pass's additions (M9, M42–M48; amendments x) are about 0.5 pw across SA1 and SA4, carried inside the
> rows' ranges (PLAUSIBLE; V15 §12), the total unchanged;
*Evidence:* docs/PROGRESS.md J397 (M9), (M42)–(M48); V15 §8's SA1 and SA4 rows and its dependencies as they stand; J396 (3) (the 7–10 pw accepted); V13 §8.5 (H39 – H41 as amendments v mint them: the party observer, the believed rows, a court's believed facts on request).


### Volume 15 — §9 Decisions (J-V15.41 – J-V15.48, after J-V15.40)

**1231.** **Eight decisions, one per ruling carried, each "chose X over Y because Z".**
*Requests:* J397 (M9), (M42), (M43), (M44), (M45), (M46), (M47), (M48).
*Current text:*
> | J-V15.40 | chose to accept the cost, 7–10 person-weeks across M-ATLAS-A, M-ATLAS-B and M-ATLAS-C (V15 §11 Q4, ruled J396 (3)), over trimming a milestone, because M-ATLAS-A's 2.5–3.75 pw buys F11, F12 and F15 in hand, M-ATLAS-B's 2–3 pw F13 narrowed by F14 and M-ATLAS-C's 2–3 pw F10, each an owner's rule with no cheaper form on the table |
*New text:*
> | J-V15.40 | chose to accept the cost, 7–10 person-weeks across M-ATLAS-A, M-ATLAS-B and M-ATLAS-C (V15 §11 Q4, ruled J396 (3)), over trimming a milestone, because M-ATLAS-A's 2.5–3.75 pw buys F11, F12 and F15 in hand, M-ATLAS-B's 2–3 pw F13 narrowed by F14 and M-ATLAS-C's 2–3 pw F10, each an owner's rule with no cheaper form on the table |
> | J-V15.41 | **(J397 (M9), (M50); 2026-10-24.)** chose the **court viewpoint** as a fourth audience `court:<seat>` of the existing `Viewpoint` record — its known region the court's own reach, its facts the court's believed political facts and knowledge where the host sends them (H39 – H41) through the port's presentation inputs (law (3), M50), never a truth it does not hold at any key, `secret` until the DM marks it shared (the looted map), the integrity register for the DM's key alone, and the public record within its reach where the host sends no belief (`W_ATLAS_COURT_UNSENT`) — over a culture viewpoint under the DM's key (which draws every DM-only row inside the culture's region, the party's own secrets included, and none of the court's beliefs) and over a belief layer of the atlas's own, because the host already holds what each court believes and whether it was planted, and the one honest reading of it on a map is the court's own picture: what it believes, as far as it reaches, and nothing it could not know; chose the public record as the no-belief arm over refusing the viewpoint, because a court whose host records no belief still has a reach and the legend says which arm is drawn (V13 §5.8 (3)); research/experience/05 §1.3, §4 Q2 (vetoable) |
> | J-V15.42 | **(J397 (M42).)** chose **atlas relations** — DM-authored records of the atlas between two members or a member and a gap, five kinds, optionally dated on the viewpoint's week, `public` by default — that feed the figure rules and the known regions only, under the rule that a figure never reads one member's facts against another's, over cutting the worked example's cross-member figures and over reading one member's `atWar` or culture bands against another's, because F14 forbids any fact crossing a seam and no campaign's war or culture band can name a member of another campaign (research/experience/05 §2.5 C1), while the owner's devils "because if barabarous areas" (F10) need an enemy a mapmaker can have in another map — which only the DM's own word can give; chose a second tab of the relations box over a new box because both are sentences between members, told apart by their verbs; research/experience/05 §2.2 (1), §4 Q7 (vetoable) |
> | J-V15.43 | **(J397 (M43).)** chose a player's cartouche to print the member's **calendar label** or nothing — V13's date label, the week, the version and the behind-week mark withheld by admission at every player key — over printing the DM's date labels to players or a per-viewpoint switch, because "Year 412" beside "Year 1" is the DM's bookkeeping and the atlas has no clock to reconcile them (V15 §4.7 (2)), while an in-world calendar name is a fact of the fiction the DM chose to give; research/experience/05 §1.6 (1), §2.5 C3, §4 Q8 (vetoable) |
> | J-V15.44 | **(J397 (M44).)** chose the shared file and the gallery copy to carry the **`public` audience's imagery only**, every record below the public key REMOVED by the writer rather than withheld by the reader, the gallery copy the same file by rule, over embedding every audience's tiles under a viewer-side admission or a per-sheet audience choice, because a file travels beyond any admission function and a stripped file cannot leak what it does not hold, and because a DM who means to hand over a DM picture has the Picture option under its own admission; research/experience/05 §1.7, §4 Q9 (vetoable) |
> | J-V15.45 | **(J397 (M45).)** chose the **honesty note on every screen and in the clerk's answer**, with a picture export's **as an in-world artefact** switch that leaves the note off the image while the export's record keeps the projection, over printing the note on every handout or dropping it from the screen, because the screen is the tool and its honesty is V13 §5.8 (3)'s rule, while a handout the party holds in play is an artefact of the fiction, and a file whose record names the projection never lies even when its face is silent; research/experience/05 §2.2 (5), §4 Q10 (vetoable) |
> | J-V15.46 | **(J397 (M46).)** chose to name the as-of viewpoint **"an old map"** — drawn from the plates each member has up to the week and no earlier than its record reaches, saying from which week, the physical ground the present — with an **as-was copy** (a scratch clone of the member carrying a DM-set sway lock, read by that viewpoint alone in the member's place) as the DM's route to a vanished kingdom's borders, over promising a map "centuries old" the plates cannot reach (the plates start at the first advance the map observes, V13 §5.8 (8); research/experience/05 §2.5 C5) and over a painted past on the member itself (which would move a member's record for a picture), because the honest feature says what it has, and the DM's authored past belongs on a copy no member, viewpoint or share reads but the prop; research/experience/05 §2.2 (4), §4 Q12 (vetoable) |
> | J-V15.47 | **(J397 (M47).)** chose the offer **Mark the party's places here** at a continued seam — a request record whose seeding (the crossing's cell and the continued member's route to its first seat) is written as that member's own `party` view key on its own page by the DM's confirmation — over carrying party knowledge across seams automatically or leaving the blank map, because the party key is per document by design (V14 §2.3) and a view key written on the member's page by the DM crosses no seam in F14's sense (no event, no digest, nothing read from one member into another), while the DM's refusal of the offer keeps the blank map as the felt edge of the known world where that is wanted; research/experience/05 §1.6 (2), §2.3, §4 Q11 (vetoable) |
> | J-V15.48 | **(J397 (M48).)** chose the **relational style ungated** — presentation over the image-only atlas, open to every account kind that may open an atlas and to a shared file's recipient — with continuation and fit premium as J396 (2) rules, over gating the style at premium, because the style reads nothing a free account's atlas does not already hold, and the one delight a free account can show costs the host nothing; the owner-facing gating list is unchanged (the style was never a gate's value) and RQ-V15-12 asks V13's gate row and V09's dialog to say so in one line; research/experience/05 §2.4, §4 Q13 (vetoable) |
*Evidence:* docs/PROGRESS.md J397 (M9), (M42)–(M48), (M50); J396 (2); J392's F10 and F14 (verbatim in V15 §1.3); V15 §9 as file u's E-11 left it (J-V15.37 – J-V15.40 the last rows); research/experience/05 §1.3, §1.6, §1.7, §2.2, §2.3, §2.4, §2.5, §3, §4.


### Volume 15 — §10.1 Requests to the base (BCR-V15-16 – BCR-V15-18, after BCR-V15-15)

**1232.** **Three base requests: the shared atlas's audience in §11.5, the in-world artefact switch and the projection in the provenance block in §11.1 and §11.2, the new edit kinds, keys and attributes in §7.1.**
*Requests:* J397 (M44), (M45), (M42), (M47), (M43), (M46), (M9).
*Current text:*
> the host's access levels across campaigns are the host's (V13 §8.5's H35; V15 §11 Q2)" |
*New text:*
> the host's access levels across campaigns are the host's (V13 §8.5's H35; V15 §11 Q2)" |
> | **BCR-V15-16** the shared atlas's audience (M44; J-V15.44) | §11.5 (BCR-V15-15's sentence) | BCR-V15-15's "a shared atlas embeds imagery for shareable members only and removes every unshareable member's reference (V15 §5.5)" | after it: "— and embeds the `public` audience's imagery only, the DM's, every party's and every court's tiles stripped, with every record below the `public` key removed by the writer and never left to a viewer's admission (V15 §2.11, §5.5); a gallery copy is this file by rule" |
> | **BCR-V15-17** the in-world artefact export (M45; J-V15.45) | §11.1 *the picture exports* and the provenance block; §11.2 `ExportOpts` | the picture exports draw the legend as the view does; the provenance block names digests and versions; `ExportOpts` carries no artefact switch | `ExportOpts.atlas.inWorld?: boolean` (default false): a picture export of an atlas under a relational viewpoint leaves the legend's honesty note off the image; the provenance block gains, for every atlas picture, the projection's facts — the viewpoint, the preset, the slider's position and the words "a projection; distances true" — present whether or not the note is drawn (V15 §3.6 (8), §5.5) |
> | **BCR-V15-18** the atlas's new edit kinds, keys and attributes (M42, M47, M43, M46, M9) | §7.1 `EditEvent`; §7.1's outcome table (BCR-V15-4's rows) | BCR-V15-4's variants, keys and `setAttr` targets | `setAtlasRelation` and `markPartyReach` (V15 §4.1) with their lifecycle rows (V15 §2.10) and undo (V15 §4.4); the keys `refuse.atlas.relation.self`, `refuse.atlas.relation.gap`, `refuse.atlas.asWas`, `refuse.atlas.reach.notContinued`, `refuse.atlas.reach.noParty` and the warning `W_ATLAS_COURT_UNSENT` (`keep`, `remove`); `setAttr` admitting a member's `calendarLabel`, a viewpoint's `knownTo` and an atlas relation's `knownTo` (V15 §4.1) |
*Evidence:* docs/PROGRESS.md J397 (M44), (M45), (M42), (M47), (M43), (M46), (M9); V15 §10.1 as it stands (BCR-V15-4, BCR-V15-6, BCR-V15-13, BCR-V15-15 the rows these extend); the base's §7.1, §11.1, §11.2, §11.5 as V15 cites them.


### Volume 15 — §10.3 Requests to the other volumes (RQ-V15-12 – RQ-V15-15, after RQ-V15-11)

**1233.** **Four requests: the ungated style stated in V13's gate row and V09's dialog; V13's court audience for `renderAt` and `viewFacts`; V09's new controls; V14's seeded party key.**
*Requests:* J397 (M48), (M9), (M42), (M43), (M45), (M47), (M50).
*Current text:*
> | **V14** (**RQ-V15-11**) | the drill-down's last rungs (a site opened from the member's page, V14 §3.9; the encounter crop on a member's point after the drill, V14 §3.10); the `ZDecl` reason `'imagery'` admitted by the gap lint (T-V14-16) for the atlas's drawables | V15 §3.7, §5.6 |
*New text:*
> | **V14** (**RQ-V15-11**) | the drill-down's last rungs (a site opened from the member's page, V14 §3.9; the encounter crop on a member's point after the drill, V14 §3.10); the `ZDecl` reason `'imagery'` admitted by the gap lint (T-V14-16) for the atlas's drawables | V15 §3.7, §5.6 |
> | **V13 §2.3's `PresetRule.gate` row and V09 §4.22 (8)** (**RQ-V15-12**; M48, J-V15.48) | one sentence in each: the relational style (V15 §3.6) is presentation over the image-only atlas and is gated by no row — open to every account kind whose row admits an atlas (`atlas` [`imageOnly`] and above) and to a shared file's recipient; `continuation` and `fit` stay the premium row's as J396 (2) rules; the owner-facing gating list (V13 §11's ruling, INDEX) is unchanged, the style having never been a gate's value | V15 §5.4, §8 |
> | **V13** (**RQ-V15-13**; M9, M50, J-V15.41; outside spine §14's five seams — a reading of the believed sway amendments v define) | `renderAt(world, week, audience)` and `viewFacts(world, week, audience)` admitting the audience `court:<seat>` on a host-bound world whose host sends that court's believed political facts (the believed allegiance labels and strength bands of `PolityFacts`, the believed rows of `LensFacts` with their `asOfWeek` and `confidence` band; V13 §8.5's H39 – H41): the picture and the facts as that court believes them — the believed sway "as {court} believes it, as of week n" (V13 §3.9 as amendments v amend it) —, the known cells `RenderedWorld.known[]` for that audience as V15 §3.6 (4)'s `court` rule and the believed rows' subjects give them, every row the court does not hold absent at every key, the host's integrity register per fact returned for the `dm` key alone; where the host sends no belief for that court the reading says so and the atlas draws the public record within the court's reach (`W_ATLAS_COURT_UNSENT`); through the port's presentation inputs only (V13 §3.11.6's law (3)) | V15 §3.2 (3), §3.6 (4), (6), §5.4 |
> | **V09** (**RQ-V15-14**; M9, M42, M43, M45, M47) | the relations box's second tab **Between the peoples** (the atlas relations' chips, the typed sentence, the dates, the shared mark); the New viewpoint sheet's **court** audience (a host-bound member and its seat) and the **as-was copies** field of an old map; the member card's **calendar label** field; the export dialog's **as an in-world artefact** switch under the Atlas tab's picture export; **Mark the party's places here** on a continued seam's context menu and the member page's seeding preview; the catalogue keys of V15 §4.8 (`info.atlas.courtUnsent`, `share.atlas.publicOnly`, `info.atlas.inWorld`, `info.atlas.reach`) and the share sheet's one line | V15 §4.2, §5.1, §5.5 |
> | **V14** (**RQ-V15-15**; M47, J-V15.47) | the seeded form of the shared `party` view key (V14 §2.3; amendments x's V14 items): an atlas's `markPartyReach` request opens the continued member's own page with the seeding previewed — the crossing's cell and the member's route from it to its first seat — and the DM's confirmation writes the key there, a view key, never an event or a digest, never the host's | V15 §3.7, §4.1 |
*Evidence:* docs/PROGRESS.md J397 (M48), (M9), (M50), (M42), (M43), (M45), (M47); V15 §10.3 as file u's E-12 left it; V13 §2.3's `PresetRule.gate` and V09 §4.22 (8) (file u items 1057, 1068); V13 §3.11.6 (law (3)); V14 §2.3 (the party key).


### Volume 15 — §12 CONFIRMED versus PLAUSIBLE (the experience pass's additions)

**1234.** **One PLAUSIBLE bullet for what this pass added and has not measured.**
*Requests:* J397 (M9), (M42), (M43), (M44), (M48).
*Current text:*
> solver's atlas-scale evaluators inside `ATLAS-1`; the drift reading's cost inside A3's row.
*New text:*
> solver's atlas-scale evaluators inside `ATLAS-1`; the drift reading's cost inside A3's row.
> * The experience pass's additions (amendments x, 2026-10-24; J397), reasoned and not yet measured: that the `court`
>   reach rule and the believed rows give the looted map its drama at the table (the sitting at SA4 judges a court's map
>   beside the DM's); that the five atlas-relation kinds cover what a DM wants to say between maps (a sixth is a row of
>   `atlas.embellish.atlasRelations` and a value of `AtlasRelationKind`, no mechanism); that an in-world calendar name is
>   date enough for a player; that the public-only shared file loses nothing a sharer meant to share (a DM picture is
>   the Picture option's); that the ungated style costs the host nothing; that about 0.5 pw across SA1 and SA4 carries
>   M9 and M42–M48 inside the rows' ranges.
*Evidence:* docs/PROGRESS.md J397 (M9), (M42)–(M48); V15 §12's PLAUSIBLE list as file u's E-14 left it; V15 §8 as item 1230 leaves it.


### Volume 14 — §1.4 Out of scope, with the reason (the boundary: stocking is the DM's and the host's; the numbered key is the map's)

**1235.** **The out-of-scope list names the boundary the numbered key keeps: the map gives the rooms and why they are; who and what is in them is the DM's and the host's.**
*Requests:* J397 (M41).
*Current text:*
> * **Tokens, initiative and combat rules** are the virtual tabletop's; the crop exports walls, portals, lights and⏎  objects only (V14 §5.3).
*New text:*
> * **Tokens, initiative and combat rules** are the virtual tabletop's; the crop exports walls, portals, lights and
>   objects only (V14 §5.3). **Stocking** — the monsters, the traps beyond the hazards G5 lays, the treasure, the names
>   of who is there — is the DM's and, where the host sends a site's people or holder, the host's (the host owns people:
>   J-V14.4's "never individuals"; `WorldSiteHost`); the map owns the shape, the roles and the reasons, and hands them to
>   the DM as **the numbered key** (M41; V14 §2.4's `SiteKey`, §5.2, §5.3): every unit in walk order from the entrance
>   with its role, name, reason, water class and condition, on the site's page and in every export, its sheet saying
>   where the map's half ends ("the rooms and why they are; who and what is in them is yours").
*Evidence:* docs/PROGRESS.md J397 (M41) ("V14 exports a numbered room key … with every site export and on the site's page; stocking stays the DM's and the host's, a note naming the boundary"); V14 §1.4 as it stands; V14 §3.11 (b) and J-V14.4 (the occupancy abstraction: never individuals); V14 §2.2's `WorldSiteHost` (the host's owner, faction, status, holder, garrison); research/experience/04 §2.4 ("No stocking … No room numbers or key sheet … A DM opening a beautiful, reasoned, empty crypt will still reach for another tool to fill it"), §3 worst 5 ("A perfect, empty crypt"), §4 Q6 ("Should a site card at least export a numbered key of units with roles and reasons, so a DM can print it?").


### Volume 14 — §2.3 The anchor, the access record and the knowledge layers (the party key seeded across a seam)

**1236.** **A continued standalone world's party key may be seeded from an atlas's crossing: the crossing's cell and the route to the first seat, written by the DM's confirmation on this document's page as a view key.**
*Requests:* J397 (M47).
*Current text:*
> read it through `ViewOpts.viewAs`'s key form; the admission function is unchanged.
*New text:*
> read it through `ViewOpts.viewAs`'s key form; the admission function is unchanged. **Seeded across a seam** (M47;
> J-V14.58; V15 §3.7; RQ-V15-15): on a standalone world that is a continuation of a host-bound member of the same atlas
> (V15 §3.4), the atlas's offer **Mark the party's places here** opens this document's page with one write of its own
> `party` key previewed — the crossing's coarse cell on the shared edge and the stations of this document's route that
> begins within the atlas's snap distance of the crossing, as far as its first seat (`tier` kept; `places` extended by
> those addresses) —, written by the DM's one confirmation as the key is written by any DM mark: a view key, never an
> event, never a digest, never the host's (this document has no host); the DM reveals further by the reveal path above.
> T-V14-35.
*Evidence:* docs/PROGRESS.md J397 (M47); V14 §2.3 as it stands (C14-17: the shared `party` key, the document's own when no host is bound; BCR-V14-19); V15 §3.4 (a continuation), §3.7 as file x item 1216 leaves it; research/experience/05 §1.6 (2), §4 Q11.


### Volume 14 — §2.4 Derived transients (`SiteKey`, `SiteKeyRow`; the totality sentence)

**1237.** **The numbered key is a derived transient: every unit in a depth-first walk order from the approach-side entrance, with its role, name, reason, water class, condition, hazards and exits; total over a candidate card.**
*Requests:* J397 (M41).
*Current text* (a):
> interface ConditionResult { closed: Id[] /* units made impassable */; opened: UnitEdge[] /* breaches that joined units */; robbed: Id[] /* elements robbed for stone (V06's ledger) */; level: number /* the decay level applied */ }
*New text* (a):
> interface ConditionResult { closed: Id[] /* units made impassable */; opened: UnitEdge[] /* breaches that joined units */; robbed: Id[] /* elements robbed for stone (V06's ledger) */; level: number /* the decay level applied */ }
> interface SiteKey {                                             // M41: THE NUMBERED KEY — the units in WALK ORDER from the entrance; a reading of the graph, the reasons, the water and the condition at the drawn week; never persisted, rebuilt on open
>   site: Id; week: number; from: Id /* the entrance unit the walk starts at: `UnitGraph.entrances[0]` — the approach-side entrance (G4's `side: 'approach'`), else the entrances by their access records' ordinals */;
>   rows: SiteKeyRow[];                                           // in walk order: a depth-first walk of `UnitGraph` from `from` over EVERY edge (passable or not: a collapsed or flooded unit is numbered and marked), the neighbours of a unit taken in the order of their edges in `UnitGraph.edges`, a `vertical` edge last on its level (a level is numbered whole before the walk descends), a `secretDoor` edge last of all on its level; so the numbering is a pure function of the graph — stable across weeks, sessions, engines and the viewer's key (a room revealed later keeps its number; a party's key shows gaps)
>   note: MsgRef }                                                // the boundary note printed on the sheet and at the panel's foot: the rooms and their reasons are the map's; who and what is in them is the DM's and the host's (V14 §1.4)
> interface SiteKeyRow {
>   n: number /* 1 the entrance; a unit's number */; unit: Id; level: number; storey?: number;
>   role: UnitRole; name: string /* the unit's own name where one is given (the core, the entrances, a level's name; V14 §5.2's labels), else the role word with the unit's kind ("a carved chokepoint", "a natural hall") — the naming slice `site`'s words, never a creature's */;
>   reason: string /* the reason record's sentence (V13's `ReasonRecord` through V10's `why`): the history layer with its event and age, the grammar rule that laid it — "laid by the temple's second expansion, 140 years ago, as the crypt's antechamber" */;
>   water: UnitWaterClass['class'] | 'dry' /* V13's per-unit class at the week (G6) */;
>   condition: 'sound'|'damaged'|'collapsed'|'flooded' /* the unit's elements against their damage thresholds at the week (V03 §5.6's comparison; V14 §3.8) and its edges' passability */;
>   hazards: NonNullable<Unit['hazard']>; exits: { to: number; kind: UnitEdge['kind'] }[] /* the numbered neighbours — "to 4 (door), to 7 (secret door)" at an admitting key */;
>   knownTo: Unit['knownTo'] }                                     // admitted by the viewer's key as the unit is: a `secret` unit's row absent from a party's key, its number kept
*Current text* (b):
> `AdoptResult` over a site with no part lists none. Tested by T-V14-26 (a).
*New text* (b):
> `AdoptResult` over a site with no part lists none; a `SiteKey` over a candidate card (no graph yet) holds no row and the note alone, and over a graph with no entrance unit starts at the lowest-numbered unit and says so in its note. Tested by T-V14-26 (a); the key by T-V14-34.
*Evidence:* docs/PROGRESS.md J397 (M41) ("the units in walk order from the entrance, with role, name, reason, water class and condition"); V14 §2.4 as it stands; V14 §2.2's `Unit`, `UnitEdge`, `UnitGraph` (the roles, the edge kinds, the entrances) and `SiteHistoryLayer`; V14 §3.5 G4 (the entrance's `approach` side), §3.7 G6 (the per-unit water class), §3.8 G7 (condition); V14 §2.7 (the reason records); research/experience/04 §2.4, §4 Q6.


### Volume 14 — §5.2 The site document's view (the numbers and the Key tab) and §5.3 (a site's exports carry the key)

**1238.** **The key numbers draw beside the role glyphs, the site panel gains a Key tab, and every export of a site carries the key: a `plat.sites.key` block, a GeoJSON field, the legend's list and a printable key sheet with the boundary note.**
*Requests:* J397 (M41).
*Current text* (a):
> switched by `StyleSheet.groups.siteRoles`⏎  (default on in the site view, off in a crop's picture).
*New text* (a):
> switched by `StyleSheet.groups.siteRoles`
>   (default on in the site view, off in a crop's picture).
> * **The numbers** (M41; V14 §2.4's `SiteKey`): each unit's key number draws as a small numeral in the `label` role at
>   its pole of inaccessibility beside the role glyph, at the building band, switched by `StyleSheet.groups.siteKey`
>   (default on in the site view, off in a crop's picture; a crop over a site level draws them under the same switch);
>   the site panel (V09; V14 §10.2) gains a **Key** tab listing the rows — number, role, name, reason, water, condition,
>   hazards, exits — level by level in walk order, a row's click centring its unit, the boundary note at its foot;
>   admitted at the viewer's key as the units are (a party's key shows the revealed rooms with their numbers, the gaps
>   between them the DM's).
*Current text* (b):
> **A site's exports.** A site document exports as any document: GeoJSON (its units as features, V14 §1b.4), SVG and⏎PNG, glTF and CityJSON (its levels as V04 §5.5's inward-facing void solids), VTT one scene per ground, storey and⏎level through the per-storey and per-band paths, each at the export's key.
*New text* (b):
> **A site's exports.** A site document exports as any document: GeoJSON (its units as features, V14 §1b.4, each
> feature carrying its key number `key: n`), SVG and
> PNG, glTF and CityJSON (its levels as V04 §5.5's inward-facing void solids), VTT one scene per ground, storey and
> level through the per-storey and per-band paths, each at the export's key — **and every export carries the numbered
> key** (M41; J-V14.57; T-V14-34; BCR-V14-26): the VTT `plat` object's `plat.sites.key` block (the rows of V14 §2.4's
> `SiteKey` at the export's key, on by default — a DM's reading sheet, not an importer's input; the common fields and
> J-V14.47's off-by-default vendor block unchanged), the picture exports' legend listing the numbers against their
> names, and the **key sheet** — a printable page (§11.1's print presets, PDF or PNG; `ExportOpts.siteKey`) under the
> site's name listing the rows level by level in walk order with the boundary note at its foot, offered beside every
> picture export of a site and of a crop over a site level. No row of the key names a creature, a trap beyond the
> hazards or a treasure: stocking is the DM's and the host's (V14 §1.4).
*Evidence:* docs/PROGRESS.md J397 (M41) ("on the site's page and in every export (a `key` block in the export's vendor data and a printable sheet)"); V14 §5.2's role cue and §5.3's exports paragraph as they stand; V14 §5.3's vendor block (J-V14.47: `plat.sites`, off by default) and the Universal VTT contract's common fields (the survey's §2.9 as V14 cites it); the base's §11.1 (the print presets); research/experience/04 §2.4 ("A printed dungeon wants '1. Porch, 2. Nave …' and a page of notes. Nothing in §5.2's labels produces one"), §3 worst 5, §4 Q6.


### Volume 14 — §7 Tests and acceptance bars (T-V14-34, T-V14-35, after T-V14-33) and §9 Decisions (J-V14.57, J-V14.58, after J-V14.56)

**1239.** **Two tests and two decisions: the numbered key; the party key seeded across a seam.**
*Requests:* J397 (M41), (M47).
*Current text* (a):
> V13's religion lens draws it labelled "DM-placed" (T-V13-54) | PR |
*New text* (a):
> V13's religion lens draws it labelled "DM-placed" (T-V13-54) | PR |
> | T-V14-34 | the numbered key (M41) | on every `B-SITE` card at every preset: the key's numbers are a bijection over the units, 1 the approach-side entrance, the order a pure function of the graph — byte-identical across two sessions, the five engines, a reload, every week of the fixture and the party's and the DM's keys (a `damageSite`, a `floodSite` and a `collapseUnit` change the `condition` and `water` cells of their units alone; a unit revealed later keeps its number) —; every row's reason names its history layer, its event and its grammar rule, its water class equals V13's per-unit class at the week and its exits the graph's edges; at the party's key every `secret` unit's row is absent and the numbering has gaps; the panel's rows, the sheet's rows, the GeoJSON features' `key` and `plat.sites.key` are one list; the VTT's common fields are byte-identical with and without the block; a lint over `SiteKeyRow` finds no field for a creature, a trap or a treasure; a candidate card's key holds the note alone | PR |
> | T-V14-35 | the party key seeded across a seam (M47) | on a continued standalone world of the atlas fixture B-ATLAS-3 (V15 §7) bearing a site: the atlas's `markPartyReach` request opens this document's page with the seeding previewed — the crossing's cell and the route's stations to the first seat —, the DM's confirmation writes exactly those places into the shared `party` key (`tier` unchanged), the document's log, model digest and records digest byte-equal before and after, no event on any log, nothing sent to any host; a cancelled preview writes nothing; the party picture then admits the seeded places as V08's reveal would, the site's anchor among them only where the seeded route reaches it | PR |
*Current text* (b):
> generated holy sites (the host holds no positioned faith place) or a deity read from a site's name (a guess) (vetoable) |
*New text* (b):
> generated holy sites (the host holds no positioned faith place) or a deity read from a site's name (a guess) (vetoable) |
> | J-V14.57 | **(J397 (M41); 2026-10-24.)** chose **the numbered key** as a derived reading of the site — every unit in a depth-first walk order from the approach-side entrance, with its role, name, reason, water class, condition, hazards and exits, numbered as a pure function of the graph so a room revealed later keeps its number, drawn as numerals in the site view, listed in a Key tab and carried by every export as a `plat.sites.key` block (on by default), a GeoJSON field and a printable key sheet with the boundary note — over a stored key (a number is a reading, never a fact to migrate), over numbering rooms alone (a corridor the DM must name is a row too) and over stocking the rooms (the host owns people, J-V14.4; the DM owns the fiction), because the first thing a DM wants from a generated dungeon is a page that says "1. the porch, 2. the nave …" with why each room is there, and the one thing this map must not pretend to give is who waits in them (research/experience/04 §2.4, §3 worst 5, §4 Q6) (vetoable) |
> | J-V14.58 | **(J397 (M47).)** chose the party key's **seeded form** — an atlas's `markPartyReach` request opening this document's page with the crossing's cell and the route to the first seat previewed, written as the shared `party` view key by the DM's one confirmation — over a party key carried across a seam automatically or a host write, because the key is per document by C14-17's design and a view key written on the document's own page by the DM is neither an event nor a read of one member by another (F14; V15 §4.7 (1)), while a continued member has no host to write it (research/experience/05 §1.6 (2), §4 Q11) (vetoable) |
*Evidence:* docs/PROGRESS.md J397 (M41), (M47); V14 §7's table (T-V14-33 the last row) and §9's table (J-V14.56 the last row) as they stand; V14 §2.4 and §5.3 as items 1237 and 1238 leave them; V14 §2.3 as item 1236 leaves it; V15 §7's B-ATLAS-3; research/experience/04 §2.4, §3, §4 Q6; research/experience/05 §1.6 (2), §4 Q11.


### Volume 14 — §10.1 Requests to the base (BCR-V14-26, after BCR-V14-25) and §10.2 Cross-volume requests (the V09 row; a V15 row)

**1240.** **One base request for the key in every export; V09 draws the Key tab, the sheet's print action and the seeding preview; V15 is the one caller of the seeded party key.**
*Requests:* J397 (M41), (M47).
*Current text* (a):
> `EncounterService` in `@plat/app` their client; the bridge's vocabulary gains them (§11.3) |
*New text* (a):
> `EncounterService` in `@plat/app` their client; the bridge's vocabulary gains them (§11.3) |
> | **BCR-V14-26** the numbered key in every site export (M41; J-V14.57) | §11.1 *The `.dd2vtt` profile* (the `plat` object; BCR-V14-8's rows), *GeoJSON*, *the picture exports* and the print presets; §11.2 `ExportOpts` | the `plat` object carries `level`/`storey`, `waterStamp`, `difficultTerrain` and the optional `sites` vendor block; a site's GeoJSON features carry no key number; no key sheet exists | `plat.sites.key` — the rows of V14 §2.4's `SiteKey` at the export's key, written in every scene of a site's or a site-level crop's VTT export, on by default (`ExportOpts.vtt.key`, default true; the common fields unchanged; J-V14.47's `vendorBlock` stays off by default and separate); a site's GeoJSON features gain `key: n`; the picture exports of a site list the numbers in the legend; the **key sheet** as a print preset (`ExportOpts.siteKey: { levels?: number[] }`: the site's name, the rows level by level in walk order, the boundary note) beside the picture export; every row admitted by the export's key as its unit is |
*Current text* (b):
> the catalogue keys of V14 §4.9 | V14 §4.1, §4.3, §5.1, §5.3, §5.5 |
*New text* (b):
> the catalogue keys of V14 §4.9, the site panel's **Key** tab and the key sheet's print action (M41; V14 §5.2, §5.3), the seeding preview of the `party` key on a continued world's page from an atlas's `markPartyReach` request (M47; V14 §2.3; RQ-V15-15) | V14 §2.3, §4.1, §4.3, §5.1, §5.3, §5.5 |
*Current text* (c):
> the measures `site.vector.*`, `crop.firstFrameMs`; the register's default-line entries at each exit | V14 §7, §8 |
*New text* (c):
> the measures `site.vector.*`, `crop.firstFrameMs`; the register's default-line entries at each exit | V14 §7, §8 |
> | V15 | the `markPartyReach` request (V15 §4.1, §3.7) as the one caller of the `party` key's seeded form (M47), naming the continued member, the crossing's cell and the route; nothing of V15 writes this document — the key is written on its own page by the DM | V14 §2.3 |
*Evidence:* docs/PROGRESS.md J397 (M41), (M47); V14 §10.1 (BCR-V14-8's `plat` object rows; BCR-V14-25 the last row) and §10.2 (the V09 and V12 rows) as they stand; V14 §5.3 as item 1238 leaves it; the base's §11.1 and §11.2 as V14 cites them.

COMPLETE: items 1201–1240; fragments 91; dry-run: all quotes matched once in order; clean-room lint: no hit
