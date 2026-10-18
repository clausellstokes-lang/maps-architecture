# critic — the Fable critique of draft t (sites, road access and the catalogue-driven autocorrect; J393)

Lane `sites-roads/critic` (fable; J393) — the one Fable judgement seat of this run, by the owner's staffing word of
2026-10-18 (J394). Started 2026-10-18 10:13 UTC; written as it went (CHECKPOINT lines 10:14, 10:15, 10:18 in
`docs/lane-events.log`). Nothing applied; no git command run; the host repository untouched; nothing written outside
this folder and the lane scratchpad (`sites-roads/critic/`: `check.py`, the after-copies `after/`).

**Verdict: PASS-WITH-CORRECTIONS.** The draft answers the owner's three clauses for every kind row on both worlds, keeps
V13 §3.8's host-bound rules where it names them, extends §3.11 as one more term of the one law, keeps the DM's verbs and
undo whole, and every one of its 127 fragments applies cleanly. Twelve corrections (one high, five medium, six low) are
written out below as fragments an Opus seat can apply without judgement; none changes a mechanism, the high one closes a
contradiction between the new kind rows and V13 §3.9 (16)'s border posts.

## 0. Inputs read whole, at the md5s read (`md5sum`, 10:13–10:20 UTC)

| file | lines | md5 |
|---|---|---|
| `docs/validation/sites-roads-2026-10-18/draft-t.md` | 1 474 | `09b4bf0517622133deaaee3b88a935e8` |
| `draft-t.fragments.json` (127 fragments) | — | `b4604f942464da0b4686d98a645d8e5d` |
| `design-A.md` / `design-B.md` / `design-C.md` | 1 776 / 1 036 / 1 479 | `9d495fba…` / `a47697d1…` / `cc051133…` |
| `judge-1.md` / `judge-2.md` / `judge-3.md` | 240 / 277 / 272 | `45055332…` / `e2ebee64…` / `9933de07…` |
| `read-v14.md` / `read-v13.md` / `read-base.md` / `read-research.md` / `read-checks.md` | 980 / 1 013 / 880 / 562 / 1 268 | `6d127498…` / `64637654…` / `33635e21…` / `d97b4fcc…` / `28609ac2…` |
| the README (`README.md` of this folder) | 29 | `eabd68cd…` |
| the targets, as they stand now | V13 4 465, V14 3 213, base 24 462, INDEX 259, SUMMARY 214, brief 212, README 31, gate 45 | V13 `d0de9ad8dadfeccc89ac86f2ea4d62f4`, V14 `70d8aa1b3c14e7cab6a135adbd3caa00`, base `1f871a01961de8a4994125d7bb1993be`, INDEX `4288179616d26f75b3d717deb23ed0ce`, SUMMARY `9d1422839ab63a3ec3bf6d13e3ea8265`, brief `fc2520709752ef77f397ba7d6a89c169`, README `2a4b54c89e47cc40bf0a7b3ffd619f07`, gate `b6c5be2a5d89fbd19035a3c606194fb9` |

The target passages were read **live and in context** (not from the readers' stale cites): V13 §1.1's W-ROUTES row
(:199), §1b.1 (:456–457), §2.2 (:722–803), §2.5–§2.6 (:1215–1266), §3.8 whole (:1711–1791), §3.9 (9), (10), (14), (16)
(:1885–2003), §3.11 whole (:2061–2135), §3.11.5 (4) (:2288–2300), §3.11.6 (:2370–2392), the P1–P5 output (:2468–2476),
§3.14.2–§3.14.3 (:2658–2710), §3.16 (:2783–2790), §3.18 (:2820–2832), §4.1 (:2840–2892), §4.3 (:2912–2932), §5.1
(:3013–3024), §6 (:3518–3526), §7 (:3560–3634), §8.2 (:3672–3680), §8.5 (:3765–3772), §9 (:3814, :3883), §10.2
(:4256–4275), §11 (:4283–4290); V14 §1b (:355–365, :460–491), §2.2 (:540–562), §2.5 (:862–875, :898–925, :978–1010),
§2.9 (:1170–1182), §3.1 (:1205–1219), §3.4 whole (:1402–1462), §3.6 (e)–(f) (:1668–1700), §3.9 (g)–(h) (:1935–1950),
E1 (4) (:1988–1992), §3.14 (:2130–2184), §3.15 (:2208–2212), §4.2 (:2262–2270), §4.7 (:2370–2395), §4.8 (:2405–2412),
§4.9 (:2420–2432), §6 (:2760–2766), §7 (:2804–2866), §8 (:2890–2898), §9 (:2995–3012), §10 (:3030–3060), §11
(:3070–3078), §12 (:3113, :3127–3134); the base §4.9 (:8655–8682), §4.12 (:9716–9720), §7.3 (:11700–11720), its head
(:1–12); INDEX (:10–16, :38–49, :69–73, :184–188, :220–229); SUMMARY (:13–21, :82–88, :195–199, :207–214); the brief
(:76–83, :150–156); README (:13–18); the gate spec (:28–45); `docs/PROGRESS.md` J390–J394 (:449–453).

## 1. What was checked by script (the lane scratchpad `sites-roads/critic/check.py`)

- **Every fragment (127), not a sample:** each current text occurs **exactly once** in its live target, at the line the
  draft names; the eight md5s equal the draft's; no two fragments of one target overlap; applied in the draft's order to
  copies of the eight targets, each current text is found once at its turn and each new text once after (0 problems).
  The after-copies are in `sites-roads/critic/after/`.
- **Every inserted or replaced table row is well-formed:** a cell count per row against its table's header, over the
  after-copies. Eleven fragments replace part of a row that wraps across lines (942 (i), 942 (y), 943 (m), 944 (c),
  945 (d), 945 (e), 945 (k), 946 (b), 946 (h), 946 (r), 947 (e)); each wrapped row re-checked whole has the same cell
  count before and after and equal to its header. Every new row of 941 (j)'s table has six cells; the §2.6, §2.5,
  §7, §9, §10.2, §3.16, §1b and INDEX rows match their headers.
- **The new words against the texts:** `refuse.table.invalid` is an existing §7.1 outcome key (base:11440); "resource
  site" is V13's own phrase (V13:197, :732, :1217, :1633), so `onOre`'s "a W5 ore resource site" is no collision with
  the base's *site*; `bend.site.*` is V14's family (V14:2429); "ring station" is the charter road's station (V13:726,
  BCR-V13-30's "its station"), one meaning; *approach road* is the base's phrase; `takeOffer`, `keep`, `accept` are
  `ConflictAction` kinds; `W_SITE_NO_ROAD_ACCESS` joins §7.5's table; `driveway` and `path` are the base's L3 faces
  (base:8662, :8678).

## 2. The ten asks, answered

| ask | finding |
|---|---|
| (1) every clause for every kind row, both worlds | **Yes, with C-3 and C-4.** 941 (j) carries all twenty-one kinds on four axes with a reason each; W7 (12) runs on both worlds (942 (n): "Run as W7b's last step on a standalone world …, after the genesis and each `network` window on a host-bound world"); by attachment the paragraph after the table says which columns act where. Two holes: the bridge fort's row contradicts V13 §3.9 (16)'s border post (C-3); W7 (12) (a)'s `along` reading requires class ≥ `minClass`, so a fort whose frame a trail crosses gets a redundant track or reads `noRoadAccess` while a road the world has reaches it (C-4). |
| (2) §3.8's host-bound rules reconciled | **Mostly.** (9) "mirrored, never computed", (10) "nothing moves a bound route silently" (942 (l) qualifies it), (11) kept with 942 (m), the re-canonize untouched (an approach road enters no canon slot, 942 (h), 944 (b)). **Left contradicted:** (8)'s "W7 then lays **exactly those edges** … no trails to host seats", §1.1's W-ROUTES row ("on a host-bound world exactly the host's genesis edges and lived changes") and §2.6's `WorldRoute`, `Territory`, `SitingProposal` row ("on a host-bound world W7 lays only the edges `genesis` and `network` name") still say *exactly / only* (C-1); and (11)'s "a site … is … never an end" now reads against an approach road whose `a` is the site (C-2). |
| (3) §3.11 extended, not duplicated; the DM's choices and undo whole; the host-placed rule | **Yes.** One more term of the one cost under the one `lawfulMax` (943 (c), (j)); `nearestLawful` reused with a point list beside the spiral; the offers V13's; `keep` / `takeOffer` / `cancel` on `W_PLACE_NO_LAWFUL`, `keep` / `takeOffer` on the two site anomalies, `worldWins` kept as V14's re-materialization (943 (k), (p), (q)); the bend's acceptance is the event's origin and a kept unlawful drop replays from `requestCharter.accept` (943 (n)); undo: V13's placement undo re-reads `SiteApproach` (943 (f)), the approach road goes with its site's edit (942 (h)), `setAttr site/roadAccess`'s inverse (946 (m)). "A host-placed site (its record's position) is never re-sited" kept word for word; its reading only, `takeOffer` withheld under `hostLocked` (943 (j), (k); 944 (f)). |
| (4) the frame charter's roads, the crop, patrols, the travel law, the lenses, the clerk | **Yes, with C-5.** P4 (6) already lists every route crossing the ring; 945 (a) gives an approach road's `toward` its rule; 945 (e)–(f) name the roads on V14's side; E1 (4) (iii) reads the charter's roads unchanged; 945 (b) reads W8b (14)'s "along the segment" through the approach with B's arithmetic and no cadence on an approach road; `derivedTime` reads an approach road's stations as any route's (a label, never sent); the `routes` layer draws it (945 (d)), the lenses are unchanged; the clerk's `why placement` and the `site` why section answer (943 (j), 945 (i)). **Hole:** G5 (f)'s way ends "at the nearest entrance `GateSite` of (e)", which exists only under `policy.enclosure` `wall` or `palisade` — a mine, a temple, a shrine, a tower, a hermitage, a graveyard, a cave have none, so the way to a mine's head-frame (the synthesis's own example) is undefined (C-5). |
| (5) determinism, identity, lifecycle, units, performance, the failure ladder | **Yes, with C-6.** Every tie named (the lower cell index then (y, x), the lower route lineage key, the lower vertex index, ascending cost then distance); no draw (946 (l)); the approach road's creation key and anchor (942 (f), (g)); lifecycle rows for `WorldSite.roadAccess` (941 (l)), the approach road (942 (h)) and `SiteApproach` (943 (f)); every number a cell with its unit (m, cost, the plug-ins' constants own and calibratable as the seventeen terms' are); `WORLD-16`, `WORLD-17` and V14's G3 row (946 (a), (n)); F-PLACE's site row and V14's two G3 rows (943 (m), (u)). **Hole:** W7 (12) (b)'s A\* names its target cell "outside every placed settlement frame's extent + margin" but not its path, while T-V13-57 asserts "no approach road … enters a placed settlement frame's extent + margin" (C-6). |
| (6) tests, decisions, BCRs, the M0 rows, INDEX, SUMMARY, the brief, README | **Yes, with C-7 and C-10–C-12.** T-V13-57/-58, T-V14-34/-35, the extended clauses, T-V13-12's count; J-V13.107–113 and J-V14.57–63 each "chose X over Y because Z", vetoable; BCR-V14-26 with its base application; M12–M13 in the gate and the brief; INDEX, SUMMARY, README rows. T-V14-35 names "an `inFrame` hideout" — a hideout is level-only and never `inFrame` (V14:850–851, :855–858), an impossible fixture (C-7); V14 §12's CONFIRMED line "W7 reads `routed`" (V14:3113) is now false with no dated bracket (C-10); INDEX:48's request census does not name BCR-V14-26, the base's head carries no revision note for file t's edits of §4.9 / §4.12 / §7.3 though file l's got one at base:5 (C-11); SUMMARY:213's "fourteen 'do not foreclose' checks" moves further from the gate file t changes (C-12). |
| (7) one word one meaning; door 1; no simulator design; no hour; no random | **Yes, with C-8.** The draft's words (*road access*, *along*, *approach road*, *coherence rows*, *bend*, *report*) collide with nothing read; door 1 closed and the canon untouched (944); no simulator design (H31 optional, presentation only); no hour; no random. One count left split: 943 (i) says "seven for a frame" while V13:2111's `nearestLawful` still takes "the full six terms" (C-8). |
| (8) every current text once; every insertion well-formed | **Yes** (§1). |
| (9) owner questions | **Yes.** Q5 (the catalogue) is the one true owner decision, with a recommendation and both consequences; the six "considered and not put" are the session's, each with its J- row. No reading of the owner's words is re-judged. |
| (10) anything else a Fable architect would want | Four observations outside file t's reach (§4), none a correction here. |

## 3. The corrections (each a fragment, written out; the apply lane re-verifies every current text at apply)

Severity: **high** = a contradiction between file t's own texts or with a landed rule; **medium** = a mechanism under-stated
so a test of file t cannot be read from its text, or a landed sentence left contradicted; **low** = bookkeeping or a count.
"Fragment n" below is draft t's; a line is the live target's at the md5s of §0. New fragments are numbered 948 (a)–(l)
so they can be appended to file t as its last item ("948. The Fable critique's corrections") — or folded into the items
they correct, the apply lane's choice; the texts are the same either way.

### C-1 — **medium** — V13 still says W7 lays *exactly* / *only* the host's edges on a host-bound world, in three places 942 (a) and 942 (l) did not reach

*Where:* V13 §1.1's W-ROUTES row (:199); §3.8 (8) (:1762–1763); §2.6's `WorldRoute`, `Territory`, `SitingProposal` row
(:1258). *What:* each states the host-bound rule as "exactly the host's genesis edges and lived changes" / "lays
**exactly those edges** …, no trails to host seats" / "W7 lays only the edges `genesis` and `network` name"; W7 (12)
lays approach roads on a host-bound world (942 (n), 942 (l)); 942 (a) fixed the §1b.1 row only. *Fix:* three fragments.

**948 (a).** Volume 13 — §1.1 What this volume builds (replacement). Target: `docs/volumes/V13-world.md`, line 199.
*Current text:*
> on a host-bound world exactly the host's genesis edges and lived changes laid as geometry, with time stations | 3.8 |
*New text:*
> on a host-bound world exactly the host's genesis edges and lived changes laid as geometry, with time stations — and, on either world, the map's own approach roads to world sites (§3.8 (12); J393) | 3.8 |
*Reason:* the engine table's row says what W7 lays on a host-bound world; (12) lays one more thing there.

**948 (b).** Volume 13 — §3.8 W7 (8) (replacement). Target: `docs/volumes/V13-world.md`, line 1763.
*Current text:*
>    selection, no rank classes, no trails to host seats, a water edge as one water route between its two port seats;
*New text:*
>    selection, no rank classes, no trails to host seats, a water edge as one water route between its two port seats (the
>    map's own approach roads to world sites, (12), are laid beside the host's edges on either world and are never one
>    of them; J393);
*Reason:* (8)'s "exactly those edges" is the host network's rule; (12)'s roads are outside that network, as (10) now says.

**948 (c).** Volume 13 — §2.6 The lifecycle of every state field (replacement). Target: `docs/volumes/V13-world.md`, line 1258.
*Current text:*
> | `WorldRoute`, `Territory`, `SitingProposal` (W6's own) | W7, W8a, W6; on a host-bound world W7 lays only the edges `genesis` and `network` name |
*New text:*
> | `WorldRoute`, `Territory`, `SitingProposal` (W6's own) | W7, W8a, W6; on a host-bound world W7 lays only the edges `genesis` and `network` name and, on either world, W7 (12)'s approach roads to world sites (their own row below; J393) |
*Reason:* the general route row's producer clause agrees with the approach road's row 942 (h) inserts below it.

### C-2 — **medium** — W7 (11)'s "a site … is a position along a route, never an end" now reads against the approach road, whose `a` is the site

*Where:* V13 §3.8 (11) (:1782–1784); fragment 942 (m). *What:* 942 (b) makes a site the end `a` of its approach road
(a `WorldRoute`); (11)'s first sentence keeps "never an end" unqualified — one sentence, two meanings. *Fix:* widen
942 (m)'s current text by five words and qualify "an end". (942 (m)'s current text is a suffix of this one on the same
two lines, so the replacement supersedes it; the apply lane drops 942 (m).)

**942 (m), restated.** Volume 13 — §3.8 W7 (11) (replacement). Target: `docs/volumes/V13-world.md`, lines 1783–1784.
*Current text:*
> never an end, so dropping or removing a site changes a route's⏎   geometry and effort, never the number of legs.
*New text:*
> never an end of a host route (the map's own approach road, (12), ends at it), so dropping or removing a site changes no route's
>    geometry, effort or number of legs: the site lies along a route, or the map's own approach road joins it ((12)).
*Reason:* one word, one meaning: "an end" of a host leg, which a site never is; the approach road's end, which it is.

### C-3 — **high** — V13 §3.9 (16) proposes a bridge fort at *any* route's river crossing; 941 (j)'s bridge fort requires a road-class crossing, so an accepted border post can be unlawful at its own drop and bent away from the crossing it was proposed for — against 945 (c)'s "meets its kind's coherence rows"

*Where:* 941 (j)'s row `| bridgeFort | required | along · road · — · — | atCrossing 5 m · 5 [road] | …`; V13 §3.9 (16)
(:2000: "a bridge fort at a river crossing"); 945 (c) (:2001). *What:* a track's or a trail's crossing of a border
proposes a bridge fort; accepted, its `requestCharter` runs P1's site form, `atCrossing … [road]` fails at cost 5, the
dry run bends it within 1 500 m to the nearest road-class crossing (elsewhere) or keeps it unlawful with
`siteIncoherent`, and W7 (12) reads its approach `none` (`noRoadAccess`, `required`). The toll house has no such hole
((16) proposes it "on a highway or road"); the fort's and the watchpost's rows are preferences. *Fix:* the kind row's
class floor becomes `track` (a bridge on a track is a bridge), and (16) proposes a bridge fort only where the crossing
route is track or better — two edits.

**941 (j), one row of its new text changed.** In fragment 941 (j)'s new text replace the row
> | bridgeFort | required | along · road · — · — | atCrossing 5 m · 5 [road] | bend · 1 500 m | a gatehouse astride a road's river crossing |
with
> | bridgeFort | required | along · track · — · — | atCrossing 5 m · 5 [track] | bend · 1 500 m | a gatehouse astride a route's river crossing (a bridge on a track is a bridge; V13 §3.9 (16) proposes it at a track-or-better crossing) |

**948 (d).** Volume 13 — §3.9 W8b (16) (replacement). Target: `docs/volumes/V13-world.md`, line 2000.
*Current text:*
>    transient `SitingProposal` of demand `borderPost` — a bridge fort at a river crossing, a fort at a pass, a watchpost on open ground, a
*New text:*
>    transient `SitingProposal` of demand `borderPost` — a bridge fort at a river crossing of a route of class track or better (at a trail's crossing a watchpost; J393), a fort at a pass, a watchpost on open ground, a
*Reason:* the proposal's kind and the kind row's coherence rows must agree, or an accepted post is bent off its crossing
(945 (c)'s claim then holds for every post kind; T-V13-57's "a tollhouse and a bridge fort on a road lie along it" is
unchanged).

### C-4 — **medium** — W7 (12) (a) reads a site *along* a route only when the route's class ≥ the row's `minClass`, so a fort whose frame a trail crosses gets a redundant track to another route, and one 6 km from any track reads `noRoadAccess` while a road the world has reaches it

*Where:* 942 (n) (a); 941 (i)'s `approach.role` comment; 941 (j)'s paragraph. *What:* "road access where appropriate"
is met by any public land route that reaches the site; `minClass` is the class an *approach road* should join (and, for
the tollhouse and bridge fort, their coherence rows' `[road]`/`[track]` already enforce the class). *Fix:* the `along`
reading takes any public land route crossing the ring; `minClass` governs the approach road's target only.

**942 (n), its (a) changed.** In fragment 942 (n)'s new text replace
> (a) **along** — where a public route of
>    class ≥ the row's `minClass` (highway > road > track > trail; the network at the week, a hidden road no public road;
>    never a water leg or an approach road) crosses the site frame's ring
with
> (a) **along** — where a public land route of any class (the network at the week, a hidden road no public road; never
>    a water leg or an approach road; a route's class is highway > road > track > trail where a row names one) crosses
>    the site frame's ring
(the rest of (a) and all of (b) unchanged: (b) still joins "the nearest fine cell carrying a public route of class ≥
`minClass`").

**941 (i), one comment changed.** In fragment 941 (i)'s new text replace
> approach: { role: 'along'|'any'|'none' /* along — on a route of class ≥ minClass or no road; any — along where a route meets its frame, else an approach road; none; `calibratable: false` */; minClass?: 'highway'|'road'|'track'|'trail'; roadClass?: 'track'|'trail' /* the approach road's class */;
with
> approach: { role: 'along'|'any'|'none' /* along — the site lies on a public route that meets its frame (its coherence rows name the class) or has no road; any — along where a public route meets its frame, else an approach road to the nearest route of class ≥ minClass; none; `calibratable: false` */; minClass?: 'highway'|'road'|'track'|'trail' /* the least class an approach road joins */; roadClass?: 'track'|'trail' /* the approach road's class */;

**946 (d), one clause added to T-V13-57.** In fragment 946 (d)'s T-V13-57 row, after "a fort 3 km from a road gets an
approach road of class `track` ending at its `join` on the nearest public track-or-better route, its cells in the `route`
layer and its site frame's charter naming it as a road;" insert "a fort whose frame a trail crosses lies along the trail
and gets no approach road;".

### C-5 — **medium** — the way to the gate ends "at the nearest entrance `GateSite` of (e)", which exists only for kinds with an enclosure; a mine, a temple, a shrine, a tower, a hermitage, a graveyard, a cave, a ruin without walls have none

*Where:* 945 (g) (V14 §3.6 (f)); 946 (p)'s T-V14-35; 946 (x)'s M13 and 947 (p)'s mirror; 945 (h), 945 (j), 946 (u)'s
"entrance gate" for an `inFrame` site. *What:* V14 §3.6 (e) (1) makes `GateSite`s only under `policy.enclosure` `wall`
or `palisade` (V14:1674–1677); the shipped rows give fort, manor, ruin, camp, watchpost, bridgeFort and tollhouse an
enclosure and the other fourteen `none` (V14:881–901). The synthesis's own example — "a mine's track runs from its
head-frame to the road" — has no gate to reach. The way also needs a ground part: every free-standing site has ground
part 0 (V14 §3.1, :1219) whether or not its policy runs the hinterland unit. *Fix:* the way ends at the nearest
entrance unit's point, which is the enclosure's gate where one exists; the same words for the `inFrame` face; a
mine in the fixture.

**945 (g), its new text changed.** Replace
> one way of its `WayClass` from its ring station to the nearest entrance `GateSite` of
> (e), routed by S4's router as `drawWay` routes a pair (§7.1; V13 §8's M0 row M13), its reason the charter road, the gate and
> the class (bar 10) — a route the site lies along crosses the ring twice and
> reaches two gates, so the road runs through a tollhouse's or a bridge fort's two entrances; a gate no road reaches
> reports the way `unserved` (F-ROUTE's rung, never silent); an attached site has no ground.
with
> one way of its `WayClass` from its ring station to the nearest entrance unit's point — the enclosure's `GateSite`
> where the policy has one ((e) (1)), else the entrance unit's point on the envelope ring; by plan distance, ties by the
> lower unit id — routed by S4's router on the frame's ground part 0 (every free-standing site has one, V14 §3.1,
> whether or not its policy runs the hinterland unit) as `drawWay` routes a pair (§7.1; V13 §8's M0 row M13), its reason
> the charter road, the entrance and the class (bar 10) — a route the site lies along crosses the ring twice and
> reaches two entrances, so the road runs through a tollhouse's or a bridge fort's two gates; an entrance no road
> reaches reports the way `unserved` (F-ROUTE's rung, never silent); an attached site has no ground.

**946 (p), T-V14-35 changed.** In its row replace "a free fort's site frame's charter carries its approach road as a
road of its class and its ground lays one way from that road's ring station to the nearest entrance gate; a tollhouse
along a road carries the road through its two gates; a gate no road reaches reports the way `unserved`;" with "a free
fort's site frame's charter carries its approach road as a road of its class and its ground lays one way from that
road's ring station to the nearest entrance gate; a free mine's way runs from its approach road's ring station to its
head-frame (no enclosure, no gate); a tollhouse along a road carries the road through its two gates; an entrance no
road reaches reports the way `unserved`;" and, at its end, "the way to the gate writes its reason (the charter road, the
gate, S4's class)" with "the way to the entrance writes its reason (the charter road, the entrance, S4's class)".

**946 (x) and 947 (p), M13's words.** In both new texts replace "a charter road's point on a frame's ring and an
entrance gate" (the gate) / "a frame-ring point and a gate" (the brief) with "a charter road's point on a frame's ring
and an entrance point (a gate where the enclosure has one)" / "a frame-ring point and an entrance point (a gate where
the enclosure has one)".

**945 (h), 945 (j), 946 (u), the `inFrame` face's end.** In each new text replace "the reservation's entrance gate" /
"its entrance gate" / "links its entrance gate" with "the reservation's entrance (its gate where the enclosure has one,
else the entrance unit's point)" / "its entrance (its gate where the enclosure has one, else the entrance unit's
point)" / "links its entrance (its gate where the enclosure has one, else the entrance unit's point)".

### C-6 — **medium** — W7 (12) (b)'s A\* excludes settlement frames from its *target* cell but not from its *path*; T-V13-57 asserts the path never enters one

*Where:* 942 (n) (b). *Fix:* in fragment 942 (n)'s new text replace "over (2)'s cost surface with the `existingRoute`
discount on the cells a public route carries, a path" with "over (2)'s cost surface with the `existingRoute` discount
on the cells a public route carries and every cell inside a placed settlement frame's extent + margin impassable (an
approach road never enters a settlement's frame, so no settlement's charter changes for a site), a path".

### C-7 — **low** — T-V14-35's "an `inFrame` hideout none" is a fixture that cannot exist

*Where:* 946 (p). *What:* a hideout is level-only (`ground` `none`, no buildings) and takes `attached` inside a frame
(V14:850–851, :855–858); never `inFrame`. The `inFrame` kinds whose `roadAccess` is `none` are the battlefield's.
*Fix:* in fragment 946 (p)'s T-V14-35 replace "an `inFrame` hideout none" with "an `inFrame` battlefield none".

### C-8 — **low** — 943 (i) counts "seven for a frame"; V13:2111's `nearestLawful` still takes "the full six terms"

*Where:* V13 §3.11.1 (:2111). *Fix:*

**948 (e).** Volume 13 — §3.11.1 P1 (replacement). Target: `docs/volumes/V13-world.md`, line 2111.
*Current text:*
> best (origin, bearing) pairs take the full six terms at
*New text:*
> best (origin, bearing) pairs take the full seven terms at
*Reason:* one count across the section (943 (i)); J-V13.37's "the full six" (V13:3814) is a dated decision and stays.

### C-9 — **low** — `SuitabilityContext.routes` carries every `WorldRoute`, approach roads among them; the exclusion lives in V14's plug-in comment and W7 (12) only

*Where:* V13 §2.2 (:771). *Fix (optional, one word one meaning at the record):*

**948 (f).** Volume 13 — §2.2 New records (replacement). Target: `docs/volumes/V13-world.md`, line 771.
*Current text:*
> routes: WorldRoute[]; placements: Placement[];
*New text:*
> routes: WorldRoute[] /* every WorldRoute, the approach roads to world sites among them (origin 'approach'): V14's route-borne plug-ins and the site coherence tests count public routes only (V13 §3.8 (12); J393) */; placements: Placement[];
*Reason:* the context's declaration says what its readers must skip; it overlaps no fragment (941 (b) is line 772).

### C-10 — **low** — V14 §12's CONFIRMED line "W7 reads `routed`" is false after J-V14.58, with no dated bracket; V14 §12's PLAUSIBLE list omits the five columns and the ten tests' constants

**948 (g).** Volume 14 — §12 CONFIRMED versus PLAUSIBLE (replacement). Target: `docs/volumes/V14-sites.md`, line 3113.
*Current text:*
>   tie-breaks only; W7 reads `routed`; its `charterFor(world, placement)`, `placeFrame`, `setPlacement`,
*New text:*
>   tie-breaks only; W7 reads `routed` (as confirmed at Revision 1; since 2026-10-18 `routed` is retired for `roadAccess`, read by W7 (12) — file t item 941, J-V14.58); its `charterFor(world, placement)`, `placeFrame`, `setPlacement`,
*Reason:* a CONFIRMED line stays as confirmed, with the date its fact moved (the dated-note form of 941 (n)).

**948 (h).** Volume 14 — §12 CONFIRMED versus PLAUSIBLE (insertion). Target: `docs/volumes/V14-sites.md`, lines 3131–3132.
*Current text:*
> * That V13's score exposes the terms V14 §2.5 names or their fallbacks (J-V14.36); that V13's charter admits a⏎  non-settlement frame; that the classifier's per-unit call is cheap enough for G6's row (V14 §6).
*New text:*
> * That V13's score exposes the terms V14 §2.5 names or their fallbacks (J-V14.36); that V13's charter admits a
>   non-settlement frame; that the classifier's per-unit call is cheap enough for G6's row (V14 §6).
> * The kind rows' five road columns (`roadAccess`, `approach`, `coherence`, `correction`, `bendM`) and the ten site
>   coherence tests' constants (V14 §2.5; J393): own values until the V14-P panel and M-CAL/world measure them.
*Reason:* 941 (j) says PLAUSIBLE; §12's list is where the volume keeps the claim.

### C-11 — **low** — the request census and the base's head do not record BCR-V14-26 and its direct application

*What:* INDEX §1's census (:48) counts the volumes' requests and names the BCRs "with no admission item"; file t adds
BCR-V14-26 and applies it to the base itself (945 (j)–(k)), a departure from "each for the coherence pass to admit by an
item of its own" that the draft states (946 (u)) but the census does not; the base carries a revision note for file l's
edits (base:5) and none for file t's three (§4.9, §4.12, §7.3). *Fix:*

**948 (i).** The index — §1 The product map (replacement). Target: `docs/volumes/INDEX.md`, line 48.
*Current text:*
> stand with no admission item, each for the coherence pass to admit by an item of its own (J387's and J388's pending ledger).
*New text:*
> stand with no admission item, each for the coherence pass to admit by an item of its own (J387's and J388's pending ledger); file t adds BCR-V14-26 (an `inFrame` world site's road-access face) and applies it to the base's §4.9 and §7.3 itself (item 945; J393).
*Reason:* the census names every request and how each reached the base.

**948 (j).** The base — the revision notes under the title (insertion). Target: `docs/ARCHITECTURE.md`, line 5 (its tail).
*Current text:*
> the held-set clause and six wording and evidence points corrected (lane retrovalidation/small; J392)
*New text:*
> the held-set clause and six wording and evidence points corrected (lane retrovalidation/small; J392)
>
> > **Revision — 2026-10-18 (the apply lane of file t, `docs/AMENDMENTS-2026-10-18t.md`, items 941 (q) and 945 (j)–(k) applied: §4.9's hinterland decorations gain the `worldSite` reservation's road-access face (`driveway` for `required`, `path` for `preferred`; BCR-V14-26), §7.3's S12 row lays it, §4.12's `Destination` comment reads `roadAccess` for `routed`; the owner's word on sites and their roads, J393).**
*Reason:* the base records every amendment file applied to it under its title (file l's note, base:5).

### C-12 — **low** — SUMMARY:213's "fourteen 'do not foreclose' checks" is stale and file t moves the count again

**948 (k).** The summary — What the two new volumes ask of you (replacement). Target: `docs/volumes/SUMMARY.md`, line 213.
*Current text:*
> the M0 gate (item 140: fourteen "do not foreclose" checks on the kernel and
*New text:*
> the M0 gate (item 140: twenty-six "do not foreclose" checks on the kernel and
*Reason:* the gate holds K1–K13 and M1–M13 once file t lands (item 140's twenty, item 141's four, file t's two); the
owner's count is the gate's.

## 4. Observed and left (no correction here; each older than J393 or outside file t's reach)

1. **A free site whose policy's `ground` is `none`** (tollhouse, bridgeFort, watchpost, shrine, cave …): V14 §3.4 (c)
   runs the hinterland unit on every free site's frame while V14 §2.2's `SitePolicy.ground` comment reads "S12a's
   hinterland unit over the frame, or none (attached)". Pre-existing; C-5's fix relies only on ground part 0 (V14 §3.1),
   which every free site has. The coherence pass should make §3.4 (c) and §2.2 say one thing.
2. **W7 (5)'s "an edge both of whose seats are rank 0 is `track`"** had sites as its rank-0 seats; with 942 (j) a
   placement's frame tier is the only rank 0 left. Not J393's; W7 (5) still reads correctly.
3. **The base's §7.3 placement row** ("P1–P5 then W9, W7–W8 over the landmass") and §6.3's "world route | its ends" —
   read-base's gap 4; the draft's own observation stands.
4. **J-V13.37's "the full six"** (V13:3814) — a dated decision; left (C-8 changes the live sentence only).
5. **The approach road's `knownTo` and the player audience of `mapFeed`** — 942 (d), 942 (n) and 944 (a) agree; nothing
   owed.

## 5. Readings of the owner's words — where this critic differs

Nowhere that must be the owner's. The draft's clause table (item 940) is the reading this critic holds, with one
sharpening the corrections make: "road access where appropriate" is met by *any* public land route that reaches a site
(C-4), not only one of the row's class — the class belongs to the approach road the world lays and to the coherence
rows that say where a toll house or a bridge fort must stand. Q5 (the catalogue = the kind rows, recommended yes) is the
one owner question; the six "considered and not put" are rightly the session's.

## 6. Verification of this record

- Every quoted current text of §3 was counted in its live target (`grep -c -F`): V13:199, :1258, :1763, :1783–1784
  (two lines, exact), :2000, :2111, :771; V14:3113, :3131–3132; INDEX:48; SUMMARY:213; base:5's tail — each **1**. The
  new fragments overlap no fragment of draft t (942 (m) is restated, not duplicated; 941 (b) is V13:772, not :771).
- The 127 fragments' script run and the wrapped-row check are reproducible from `sites-roads/critic/check.py` against
  the targets at §0's md5s (re-hashed 10:25 UTC: unchanged).
- Landed 2026-10-18 (fable; J393).
