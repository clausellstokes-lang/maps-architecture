# Amendments y — the experience pass's closing file (J397): the seams between files v, w and x, the review's two typings, and the owner-facing records

Written and applied by the session's Fable manager on 2026-10-24 as the closing file of the experience pass
(`docs/PROGRESS.md` J397: the owner's "So do the prompts and integrate them that can be done on maps and give me the
prompts for settlement engine"). Files v, w and x (applied before this one; records `docs/validation/coherence/experience-{v,w,x}.md`)
carry the fifty map-side rulings; this file carries what the three seats' reports and the review
(`docs/volumes/critique/experience-vwx.md`, EX-09, EX-13) left for the manager: the sentences one file's ruling needs in a
section another file owns (RQ-V15-12 and RQ-V15-13 from file x; the three seam words, the History chip's switch and the
style's fact row from file w's report), the two typings the review assigned here, and the owner-facing records (INDEX,
SUMMARY, the owner brief). It designs one small thing — the court audience of `renderAt` and `viewFacts` (item 1241) —
and otherwise joins what the three files already say.

Numbered from **1241** (file x ended at 1240).

**APPLIED** by the session's Fable manager on 2026-10-24 (record: docs/validation/coherence/experience-y.md) — all 15 items (1241–1255) applied, all 18 fragments matched exactly once at their turn and each new text exactly once after; no item not applied; bundle 85,704 lines, up to date; clean-room lint over the volume-bound new texts: no hit.

## Closure table (every request → the items that carry it)

| request | subject | carried by |
|---|---|---|
| RQ-V15-13 (file x item 1233); J397 (M9) | `renderAt` and `viewFacts` admit a `court:<seat>` audience drawn from the `CourtViewpoint` transient | items 1241, 1247 (T-V13-119, J-V13.190) |
| RQ-V15-12 (file x item 1233); J397 (M48) | the relational styles open to every account kind; continuation and fit premium | items 1242 (V13 §2.3's `gate` row), 1249 (V09 §4.22 (8)) |
| file w's report (a); J397 (M14), (M19), (M32) | law (9) gains **fought-over wild**, **scorched** and **the carry** | item 1243 |
| the review's EX-13; J397 (M27); H33 | `routeFacts`' sailing offer typed, in `WorldRoute.sailing`'s byMonth form | item 1244 |
| the review's EX-09 | "(`CourtViewpoint`, V13 §2.4)" at §5.9 (2)'s first mention | item 1245 |
| file w's report (d); J397 (M13), (M20) | H13 names the treaty terms and the claim kinds H45 asks | item 1246 |
| file w's report (b); J397 (M38); BCR-V13-53 | V09 §4.21.3's History chip gains "An old town under this one" | item 1248 |
| file w's report (c); J397 (M14), (M19), (M20) | V15's fact table reads the sway's scorched cells, the claim kinds and the fought-over wild | item 1250 |
| the pass's record | INDEX §1 counts and §6 preamble and Q2 row; SUMMARY's decisions; the brief's host track | items 1251–1255 |

Items 1241–1255 are fifteen items over six targets: V13 (1241–1247), V09 (1248, 1249), V15 (1250), INDEX (1251–1253),
SUMMARY (1254), the brief (1255). Ids minted: T-V13-119, J-V13.190. Left free: J-V13.191–.195, T-V13-120, BCR-V13-56–60,
D-V13.17–.20, WORLD-24+, SP-W12+ (w's blocks), items 1256+.

**How to read an item.** As files u, v, w and x's: each item names its target file's section, its title in bold, the
request it serves (*Requests*), the current text quoted **once** (verified by exact search against the target as files
v, w and x leave it; every quote occurs exactly once at its turn and each new text exactly once after; a quote that
wraps across lines is written on one line with each line break marked ⏎, the continuation's indentation kept), and the
new text **in full** as a blockquote whose lines are the new lines. An item with several fragments gives each fragment's
current and new text in turn, (a), (b) …, applied in that order. *Evidence* names the PROGRESS ruling, the volumes'
sections, the files' items and the research notes' sections. Order: volume 13 in section order, volume 9, volume 15,
INDEX, SUMMARY, the brief.

**The clean-room rule for the new texts.** As file u's: the texts entering the base and the volumes name no host source
file, function, product, ruling id or internal identifier; the host is "the host"; its facts are named by the port's
field names. INDEX, SUMMARY and the brief are owner-facing and may name the products. Linted over every new text bound
for the volumes: no hit.

---

## The change items

### Volume 13 — §2.2 New records (`RenderedWorld.known`: the court audience) and §3.11.6's port function rows

**1241.** **`renderAt` and `viewFacts` admit a court audience: the member's picture as a court believes it.**
*Requests:* J397 (M9); V15's RQ-V15-13 (file x item 1233); V13 §5.9 (2)'s court viewpoint (file v item 1104) and §2.4's `CourtViewpoint` transient (file w item 1153 (b)).
*Current text* (a):
> known: { audience: 'dm'|'public'|`party:${string}`; cells: Uint32Array /* coarse: the cells the audience's places have reached (V14's layers through the world's `knownTo`) */ }[] }   // `renderAt(world, week, audience)`'s reading — tiles over the `atlas` layer set with their label boxes, extent, datum, latitude box, rung, present week, date label and the known sets per audience — and nothing else (the spine's §14.2); a view read, never persisted
*New text* (a):
> known: { audience: 'dm'|'public'|`party:${string}`|`court:${string}`; cells: Uint32Array /* coarse: the cells the audience's places have reached (V14's layers through the world's `knownTo`); for a court audience the court's own reach — its seats' territories and sways, the cells within its travel weeks along routes, the far ends of its channels, its allies' and vassals' seats and one heard-of band (V15 §3.6 (4); J397 (M9); file y item 1241) */ }[] }   // `renderAt(world, week, audience)`'s reading — tiles over the `atlas` layer set with their label boxes, extent, datum, latitude box, rung, present week, date label and the known sets per audience — and nothing else (the spine's §14.2); a view read, never persisted
*Current text* (b):
> with the placed label boxes per stop, its extent, datum, latitude box, rung, present week, date label and the audience's known sets; V13 §5.4) | `@plat/world` over §8.1's tiles | V15's atlas (the only reading of a member); the picture exports |
*New text* (b):
> with the placed label boxes per stop, its extent, datum, latitude box, rung, present week, date label and the audience's known sets; V13 §5.4; a `court:<seat>` audience — V15's court viewpoint (RQ-V15-13; J397 (M9)) — draws the member's picture over the sway lens's `CourtViewpoint` transient (§2.4, §5.9 (2)) where the host sent that court's believed political facts (`LensFacts.courts`, H40), else the public record within the court's reach, labelled so (V15's `W_ATLAS_COURT_UNSENT`); never a DM-only mark, never a truth the court does not hold; T-V13-119) | `@plat/world` over §8.1's tiles | V15's atlas (the only reading of a member); the picture exports |
*Current text* (c):
> | `viewFacts(world, week, audience)` → `ViewFacts` (V13 §2.2, §5.8 (10): the relational style's facts at a week from the plates and the event index, each with its fact class and resolved audience) | `@plat/world/lens` | V15's A6 (the spine's §14 (4)); the clerk's "why this centre" |
*New text* (c):
> | `viewFacts(world, week, audience)` → `ViewFacts` (V13 §2.2, §5.8 (10): the relational style's facts at a week from the plates and the event index, each with its fact class and resolved audience; for a `court:<seat>` audience the polity facts are the court's believed ones from the `CourtViewpoint` transient where sent, else the public record within the court's reach, and every other row is admitted as for a party that knows the court's reach — never a DM-only row (J397 (M9); RQ-V15-13; T-V13-119)) | `@plat/world/lens` | V15's A6 (the spine's §14 (4)); the clerk's "why this centre" |
*Evidence:* docs/PROGRESS.md J397 (M9) (the court viewpoint: "that court's known region and believed facts, never a truth it does not hold"); V13 §2.2's `RenderedWorld` and the port function rows as file r left them (items 1007, 1011, 1012), §2.4's `CourtViewpoint` as file w declares it (item 1153 (b)) and §5.9 (2) as file v leaves it (item 1104 (b): the projection, DM-only until opened, within `WORLD-23`); V15 §2.2 `Viewpoint.audience` `court:<seat>`, §3.6 (4) and (6) as file x leaves them, RQ-V15-13 (file x item 1233); experience read 05 §1.3, §2.1 (2), §4 Q2.


### Volume 13 — §2.3 New rule tables (`PresetRule.gate`: the relational styles open to every account)

**1242.** **The world map's relational styles are presentation and ungated; continuation and fit stay premium.**
*Requests:* J397 (M48); V15's RQ-V15-12 (file x item 1233).
*Current text:*
> "Include my campaign's settlements" and Best placement follow the host's campaign entitlement wherever it applies — the map adds no gate of its own above the host's (J388's entitlement never gates a birth canon and never a placement) |
*New text:*
> "Include my campaign's settlements" and Best placement follow the host's campaign entitlement wherever it applies — the map adds no gate of its own above the host's (J388's entitlement never gates a birth canon and never a placement). The world map's relational styles (V15 §2.5's presets) are presentation and open to every account kind — the `imageOnly` row draws them; `continuation` and `fit` alone stay premium (J397 (M48); RQ-V15-12; file y item 1242) |
*Evidence:* docs/PROGRESS.md J397 (M48) ("the relational style is open to every account kind (presentation); continuation and fit stay premium (J396 (2) otherwise unchanged)"), J396 (2); V13 §2.3's `gate` row as file u left it (item 1057); V15 §2.5 and the rows file x adds (J-V15.48, T-V15-34, RQ-V15-12); experience read 05 §2.4, §4 Q13.


### Volume 13 — §3.11.6 The port (law (9): three seam words of file w)

**1243.** **Law (9) gains the fought-over wild, scorched and the carry.**
*Requests:* J397 (M14), (M19), (M32); file w's report ((a): the words it coined in §3.9 (11), (12) and §3.14.2 step 6).
*Current text:*
> (5)); a **headline** is the host's news paper's entry a `WorldEvent.causedBy` receipt opens, never a map string;
*New text:*
> (5)); a **headline** is the host's news paper's entry a `WorldEvent.causedBy` receipt opens, never a map string; a **fought-over wild** is the mark a war between adversaries whose sways never touch leaves at `borderSegment`'s fallback — the midpoint of the seats' line in wild land — never a debatable land (it reaches the host's hearing card through `placeOf`; §3.9 (11); J397 (M19)); **scorched** is razed land under its dwell — unclaimed, never held (§3.9 (12); J397 (M14)); and **the carry** is a dated frame surface written by the DM's one confirmation from a world surface change, never a re-derive (§3.14.2 step 6; J397 (M32); file y item 1243).
*Evidence:* docs/PROGRESS.md J397 (M14), (M19), (M32); V13 §3.11.6 law (9) as file v leaves it (item 1093 (b): the seam words it added, ending at "headline"); file w items 1162, 1163, 1169–1171 (the words as w uses them: `MarchHold.segment.wild`, `swayStatus` scorched, the edit event `carrySurface`); file w's final report ((a)).


### Volume 13 — §3.11.6 The port (`routeFacts`: the sailing offer typed)

**1244.** **`routeFacts` types its sailing offer in `WorldRoute.sailing`'s form.**
*Requests:* the review's EX-13 (docs/volumes/critique/experience-vwx.md); J397 (M27); H33; the host prompts' S15.
*Current text:*
>   effort, the crossings and the 52-week seasonal sets — never `costTotal` — and, on request, a water edge's limits (the shallowest navigable depth
*New text:*
>   effort, the crossings and the 52-week seasonal sets — never `costTotal` —, per water edge the sailing offer `sailing?: { vessel: 'sail'|'oared'|'coastal'; byMonth: { out: number; back: number; mean: number }[] /* twelve */ }[]` behind its switch (H33: the directional efforts and their symmetric mean, wind and current only, in `WorldRoute.sailing`'s form; §3.8 (12); J397 (M27); file y item 1244) and, on request, a water edge's limits (the shallowest navigable depth
*Evidence:* docs/volumes/critique/experience-vwx.md EX-13 ("the `routeFacts` sentence types no sailing offer at all"); V13 §2.2 `WorldRoute.sailing` (file r: `vessel`, `byMonth: { out; back; … }[]`), §3.8 (12) as file r and J393 (2) leave it (the offer in `routeFacts` behind its switch, the canon's water metres unchanged), §3.11.6's `routeFacts` sentence as it stood, §8.5's H33; the host prompts' S15 as revised (the same shape); experience read 03 §2.4 (4), §4 Q8.


### Volume 13 — §5.9 (2) The sway lens (the court viewpoint: its type named)

**1245.** **§5.9 (2) names the `CourtViewpoint` transient where it first describes the projection.**
*Requests:* the review's EX-09.
*Current text:*
> host sent, a viewpoint — W8b's rule function run over that court's believed facts in place of the window's: the
*New text:*
> host sent, a viewpoint (`CourtViewpoint`, §2.4) — W8b's rule function run over that court's believed facts in place of the window's: the
*Evidence:* docs/volumes/critique/experience-vwx.md EX-09 (the identifier is declared in §2.4 by file w item 1153 (b); §5.9 (2) as file v leaves it describes the projection and never names the type); file x's revision (its citations now read "V13 §2.4, §5.9 (2)").


### Volume 13 — §8.5 The host's parallel track (H13: the terms and the claim kinds H45 asks)

**1246.** **H13 names the live peacetime treaty terms and the claim kinds that H45 asks for.**
*Requests:* J397 (M13), (M20); file w's H45 (item 1185) and its report ((d)).
*Current text:*
> optionally, at its choice, a per-tick capture of its political deltas during an advance — the dated rung changes of tier, prosperity, force band and strength band — into the window | M-W2; H4; H9 |
*New text:*
> optionally, at its choice, a per-tick capture of its political deltas during an advance — the dated rung changes of tier, prosperity, force band and strength band — into the window; its live peacetime treaty terms (`PolityRelation.terms`: a non-aggression term, a mutual-defence term, each with its since-week and whether its simulation enforces it) and its standing claims of every kind (lineage, vengeance, grievance; `PolityFacts.claims[].kind`) as H45 asks them, so one window carries them (J397 (M13), (M20); file y item 1246) | M-W2; H4; H9 |
*Evidence:* docs/PROGRESS.md J397 (M13), (M20), (S10); V13 §8.5's H13 as it stood (the four subordinating treaty terms; the lineage claims while that lane is lit) and H45 as file w writes it (item 1185); file w items 1141 (a), 1145 (a), (c), 1160, 1163 (c); the host prompts' S10 as revised (the terms step).


### Volume 13 — §7 Tests and §9 Decisions (T-V13-119 and J-V13.190: the court audience)

**1247.** **T-V13-119 and J-V13.190 record the court audience of `renderAt` and `viewFacts`.**
*Requests:* J397 (M9); item 1241.
*Current text* (a):
> the legs are listed on request from the summary line | the mock host; the route fixtures |
*New text* (a):
> the legs are listed on request from the summary line | the mock host; the route fixtures |
> | T-V13-119 | **the court audience** (J397 (M9); RQ-V15-13; file y item 1241): on the believed fixture (a court whose believed allegiance label for one subject differs from the truth and whose strength band for another differs by two), `renderAt(world, w, 'court:<seat>')` draws the subject's sway in the believed allegiance's colour and the border where the believed push puts it, labelled "as {court} believes it, as of week n", and `viewFacts` returns the believed labels and bands with their `Believed` ages — the DM's `renderAt` at the same week draws the truth; on the same fixture with `LensFacts.courts` absent, both return the public record within the court's reach and the legend carries `W_ATLAS_COURT_UNSENT`; in neither case does a DM-only row (a covert link, an exclave of a covert power, a suppressed creed, an alignment row) or a truth outside the court's reach appear; a court audience on a world with no host is refused as a court viewpoint is (`W_ATLAS_COURT_UNSENT`'s family, the public record drawn) | the believed fixture; the court-audience harness |
*Current text* (b):
> because the receipt is the same and one customs office at the gate is honest enough |
*New text* (b):
> because the receipt is the same and one customs office at the gate is honest enough |
> | J-V13.190 | chose **the court audience as a value of the one audience argument of `renderAt` and `viewFacts`, drawn from the sway lens's `CourtViewpoint` transient** (J397 (M9); RQ-V15-13; file y item 1241) over a second reading function for believed pictures and over leaving the atlas's court viewpoint on the public record alone, because the atlas takes one reading of a member (the spine's §14 (2), (4)) and a court's picture is that reading under another admission, not another product — and because a court viewpoint drawn from the public record would show the enemy's geography and none of its mind, which was the read's whole finding (experience read 05 §1.3) |
*Evidence:* docs/PROGRESS.md J397 (M9); V13 §5.9 (2) and T-V13-80 as file v leaves them; V15 §3.6 (6) and RQ-V15-13 as file x leaves them; experience read 05 §1.3, §3 (worst 1), §4 Q2.


### Volume 9 — §4.21.3 A town with a past (the History chip: "An old town under this one")

**1248.** **The History chip gains the switch "An old town under this one".**
*Requests:* J397 (M38); BCR-V13-53 (file w item 1188); the base's `HistoryHint.strata` (file w item 1197); file w's report ((b)).
*Current text:*
>    form of `HistoryHint` — the blueprint's `history` (§4.2 S0), and "None" to `adjust('history', undefined)`. In the
*New text:*
>    form of `HistoryHint` — the blueprint's `history` (§4.2 S0), and "None" to `adjust('history', undefined)`; behind More
>    beside **Age**, the switch **An old town under this one** — "By age" · "Always" · "Never" — maps to
>    `HistoryHint.strata.request` (`byAge` · `always` · `never`; J397 (M38); BCR-V13-53; the base's §4.2 S2 and II.7.6),
>    its share by age unless the DM sets one behind More (`strata.share`); the switch stays open with a dossier history,
>    because the strata are the frame's own request and never the dossier's (file w item 1197; file y item 1248). In the
*Evidence:* docs/PROGRESS.md J397 (M38) ("an old town under this one" as a generation request beside the probability by age); the base's `HistoryHint.strata` as file w writes it (item 1197: `request: 'byAge'|'always'|'never'`, `share?`), §4.2 S2 and II.7.6 (file w items 1198, 1199); V13 §3.11.4 (file w item 1167: never a charter field) and BCR-V13-53 (item 1188); V09 §4.21.3 (1) as it stood; experience read 04 §2.2 (5), §4 Q7.


### Volume 9 — §4.22 The world dialog ((8): the relational styles ungated)

**1249.** **The dialog's gating text says the relational styles are open to every account kind.**
*Requests:* J397 (M48); RQ-V15-12; item 1242.
*Current text:*
>    settlements: nothing hidden, everything drawn, one check at the act. **The DM's physics toolbar** stands
*New text:*
>    settlements: nothing hidden, everything drawn, one check at the act. The world map's relational styles are
>    presentation and open to every account kind (J397 (M48); V13 §2.3's `gate`, the `imageOnly` row); its continuation
>    and fit alone stay premium (V15 §3.4, §3.5). **The DM's physics toolbar** stands
*Evidence:* docs/PROGRESS.md J397 (M48), J396 (2); V09 §4.22 (8) as file w leaves it; V13 §2.3's `gate` row (item 1242); V15 §2.5, J-V15.48, T-V15-34, RQ-V15-12 (file x).


### Volume 15 — the facts the style reads (the sway's scorched cells, the claim kinds, the fought-over wild)

**1250.** **The polity row of the style's fact table reads the sway's scorched cells, the three claim kinds and the fought-over wild mark.**
*Requests:* J397 (M14), (M19), (M20); file w's report ((c)).
*Current text:*
> | hostility and distance between cultures | `PolityRelation.word` mapped to respect / neutral / adversarial, `.atWar`; `PolityFacts.culture[].band` (the host's culture distance in fifths); `Sway.neighbours[].class` | V13 §3.9, §5.9 (2) | A6 (5)'s monstrous peoples and devils rules; the "far lands" term |
*New text:*
> | hostility and distance between cultures | `PolityRelation.word` mapped to respect / neutral / adversarial, `.atWar`; `PolityFacts.culture[].band` (the host's culture distance in fifths); `Sway.neighbours[].class`; the sway's `scorched` cells (razed land under its dwell, V13 §3.9 (12): drawn as the member's picture draws them — unclaimed — and read by no figure rule), the claim kinds lineage · vengeance · grievance (DM-only outlines, V13 §3.9 (12): never on a sheet for any audience) and the fought-over wild mark (V13 §3.9 (11): a dated battle place the event vignettes may stand at, as a siege vignette stands at its town; file y item 1250) | V13 §3.9, §5.9 (2) | A6 (5)'s monstrous peoples and devils rules; the "far lands" term; the event vignettes' places |
*Evidence:* docs/PROGRESS.md J397 (M14), (M19), (M20); V13 §3.9 (11), (12) as file w leaves them (items 1162, 1163: `MarchHold.segment.wild`, `swayStatus` scorched, the claim kinds); V15's fact table row as file x leaves it; file w's final report ((c)).


### INDEX — §1 (the counts: the experience pass's requests)

**1251.** **INDEX §1 records the experience pass's requests and the H-row count.**
*Requests:* the pass's record (J397).
*Current text:*
> row, H35, appended to V13 §8.5 by file r item 1015), each base request for the world-growth coherence pass to admit by an item from 1033; none is applied yet.
*New text:*
> row, H35, appended to V13 §8.5 by file r item 1015), each base request for the world-growth coherence pass to admit by an item from 1033; none is applied yet. The experience pass (2026-10-24; J397; amendments v, w, x and y, items 1083–1255) adds three requests to V13 §10 (BCR-V13-53 – BCR-V13-55: the first applied to the base by file w's items 1197–1199, the other two standing for the next coherence pass), three from volume 15 (BCR-V15-16 – BCR-V15-18) and one from volume 14 (BCR-V14-26) to the base, and four sibling requests (RQ-V15-12 – RQ-V15-15), two of them carried into V13 and V09 by file y (items 1241, 1242, 1249); V13 §8.5 now runs H1–H46, each row from H36 on carrying its felt sentence and first-visible latency (J397 (M3)).
*Evidence:* docs/PROGRESS.md J397; files v, w, x (their heads' "Ids minted"); file y's items 1241, 1242, 1249.


### INDEX — §6 Owner questions with recommendations (the preamble: the experience pass)

**1252.** **The preamble records the experience pass and the two decisions that are the owner's in the host.**
*Requests:* the pass's record (J397).
*Current text:*
> every new campaign's birth canon (H22) wait on no question.
*New text:*
> every new campaign's birth canon (H22) wait on no question. The experience pass of 2026-10-24 (J397: "So do the prompts and integrate them that can be done on maps and give me the prompts for settlement engine") ruled fifty map-side points under the same delegation, each vetoable, carried by amendments v–y, and wrote the host's fifteen asks as prompts for a host session (`research/sf/host-prompts-2026-10-24.md`); two of those asks hold decisions that are the owner's in the host — a deity seated at a campaign's birth (the host's own open word on it) and whether its capture roll reads the map's patrol coverage — and add no question here.
*Evidence:* docs/PROGRESS.md J397 (S1, S14); research/sf/host-prompts-2026-10-24.md (its head's owner-decision boxes).


### INDEX — §6 (the V13 Q2 row: the H-row range)

**1253.** **The Q2 row's H-row range reads H1–H46.**
*Requests:* the pass's record (J397; H36–H46).
*Current text:*
> | V13 | Q2 — the host's schedule (V13 §8.5's H1–H34
*New text:*
> | V13 | Q2 — the host's schedule (V13 §8.5's H1–H46
*Evidence:* V13 §8.5 as files v and w leave it (H36–H44 by v, H45–H46 by w; H35 by file r).


### SUMMARY — "Decisions that are yours" (the experience pass)

**1254.** **SUMMARY gains the experience pass's bullet.**
*Requests:* the pass's record (J397).
*Current text:*
>   new campaign gets its world's canon at its birth, and nothing waits on this question any more (vetoable: say the word
>   and the canon goes back behind the door).
*New text:*
>   new campaign gets its world's canon at its birth, and nothing waits on this question any more (vetoable: say the word
>   and the canon goes back behind the door).
> - **The experience pass** (24 October; your "So do the prompts and integrate them that can be done on maps and give me
>   the prompts for settlement engine"): fifty rulings on the map's side, each vetoable — among them a world born with your
>   realistic rules applied and its realms named, a first screen with fields and banners instead of "not sent", towns free
>   to drag until the first advance, a party's map that believes what the town it stands in believes and gets far news at
>   a rider's pace, a looted map that shows what the enemy court believes, borders that read a sworn peace as peace, fields
>   that can never flood a continent, a world sea-rise you can carry into a town with one confirmation, a dossier edit that
>   never re-rolls a town's people, and a numbered room key for every dungeon. The fifteen things SettlementForge must do
>   for them are written as prompts you can paste into a SettlementForge session (`research/sf/host-prompts-2026-10-24.md`);
>   two of those hold decisions that are yours there, not here: a god seated at a campaign's birth, and whether patrols on
>   the map feed the spy's capture roll.
*Evidence:* docs/PROGRESS.md J397; research/sf/host-prompts-2026-10-24.md; research/experience/01–05.


### The brief — §9 Order and timing (the host's track row: the experience pass's asks)

**1255.** **The host's track row names H36–H46 and the prompts file.**
*Requests:* the pass's record (J397; S1–S15).
*Current text:*
> after W3: the capture freeze to a deadline, the elective rebase, then the fork's retirement (H18–H20) | Bar T (18) |
*New text:*
> after W3: the capture freeze to a deadline, the elective rebase, then the fork's retirement (H18–H20); the experience pass's asks H36–H46 (J397: a campaign born with the realistic rules applied and its realms named, the birth window, the grace rule, the party observer and the believed rows' ages, a court's beliefs and the integrity register, the headline reader, the readers of the map feed named, `reasonOf` for the host's cause walk, the ambiguity law amended, claims and treaty terms, net force bands), each written as a prompt for a host session in research/sf/host-prompts-2026-10-24.md, with H24, H31 and H32 restated there | Bar T (18) |
*Evidence:* docs/PROGRESS.md J397 (S1–S15); V13 §8.5 as files v and w leave it; research/sf/host-prompts-2026-10-24.md.
