# hidden-ways / design-A — THE HIDDEN WAYS answered canon-first: the trods (2026-10-18)

**Seat:** designer hidden-ways/design-A (Fable/xhigh), workflow hidden-ways-design (J407), under the owner's delegation
J404 ("Decisions and judgment to you", `docs/PROGRESS.md:463` [STATED]); every ruling below is vetoable.
**Angle:** canon-first — the record, the junction model, the W7c step and its terrain rule, the cost and width hints, the
versioned slot and the additive canon, the budget; the host contract and the lens derived from them.
**Inputs read whole:** the host's request `docs/host-requests/2026-10-18-hidden-ways.md` (47 lines, md5 `251c96a9…`);
the five reader records of this lane (`read-request.md` 389 lines, `read-v13-routes.md` 403, `read-v13-lenses.md` 418,
`read-v14-base.md` 301, `read-host.md` 352); `docs/volumes/V13-world.md` (4 611 lines, md5 `e68af748…`) at §1.3, §1b,
§2.2, §2.3, §2.5–§2.7, §3.0, §3.8, §3.9 (13)–(17), §3.11.6, §3.14.3, §3.16–§3.18, §5.1, §5.4, §5.8, §5.9, §6, §7, §8.2,
§8.5, §9, §10.2, §11; `docs/volumes/V14-sites.md` (3 340, `f5dd37a7…`) §2.3, §3.11 E1, §10.2; `docs/ARCHITECTURE.md`
(24 467, `eac3a6a5…`) by the readers' citations; `docs/HOST-REQUIREMENTS-2026-10-18.md` (935, `7db37cc1…`) §6–§8;
`docs/AMENDMENTS-2026-10-18t.md` (the item form) and `docs/validation/sites-roads-2026-10-18/draft-t.fragments.json`
(the machine form); `docs/volumes/INDEX.md` (`10a72c97…`), `docs/volumes/SUMMARY.md` (`1c0ada29…`).
**Tags:** [STATED] the cited text says it; [OBSERVED] checked in the repository by this seat (grep, counts, the
builder's checks); [INFERRED] this seat's reasoning or ruling. Host facts are cited only from `research/sf/*.md` and the
host document (Fable-retrovalidated at J392); no host code is read or copied. Texts bound for V13, V14 and the host
document name host facts by the port's field names and the adapter folder's tables; host document names, ruling ids and
research citations stay in these evidence lines. `V13:n` is `docs/volumes/V13-world.md` line n, `V14:n`, `Base:n`
(`docs/ARCHITECTURE.md`), `HR:n` (the host document), `REQ:n` (the request), `FPI:n` (`research/sf/fp-physical-integration.md`).
**The word used below:** the host's "hidden way" is a **trod** (§0 Q-word); its end a **junction**; its width hint its
**form** (`narrow`, `drove`, `broad`). "hidden" is used only for the host's road grade.

---

## §0 The answers

**The word (REQ:10).** *way* is TAKEN: the base's settlement-frame skeleton is `Way` with `WayClass`
(`'through'|'primary'|'secondary'|'lane'|'alley'|'cul_de_sac'|'track'|'path'|'quay'|'pier'|'bridge'|'ford'` plus
`aqueduct`, Base:1093–1094 [STATED]; `Junction.arms` are ways, Base:1104 [STATED]); V13 maps every world road class
onto it at a frame's ring (`FrameCharter.roads[].class: WayClass`, V13:762 [STATED]) and draws a glyph mark `'way'`
(V13:803 [STATED]); V14 lays "one way of its `WayClass`" from a charter road to a site's gate (V14:1799–1801 [STATED])
— so a world record called *way* would meet a frame record called `Way` at every ring a hidden way reaches. *hidden*
is TAKEN too: it is the host's grade of a demoted overt road, "a hidden land road is a DM-only ghost … a hidden road
counts as no public road" (V13:1815–1820 [STATED]; `grade?: string /* … hidden among them */`, V13:788; the charter's
`hidden?: boolean`, V13:764; patrols "hidden: none", V13:1163; reached by demotion, V13:2421 [STATED]), and the host's own
ledger reads it the same way ("grade ladder down to `hidden`, never absence", FPI:99; "the overgrown road", FPI:159
[STATED]). *trace*, *path*, *track*, *trail*, *lane*, *pass*, *cut*, *run* and *covert* are taken (the census,
`read-request.md` §2.2 [OBSERVED]). **The map's word is `trod`**: zero whole-word hits in V13, V14, the base, the host
document and the research notes, and zero anywhere else in the repository outside this lane's records [OBSERVED: grep
-oiw]; in plain English a trod is a narrow path worn by feet — exactly a way a body walks in file, never a column. *byway*
is free in the landed texts but was the sites-roads design B's rejected name for the approach road
(`docs/validation/sites-roads-2026-10-18/design-B.md:25–144` [OBSERVED]) and means a minor public road; *holloway* and
*droveway* name physical forms and are kept as the senses of the form words. The end of a trod is a **junction** — the
word V13 already uses on the world for the approach road's end ("ending at the **junction** (the joined route's polyline
point …)", V13:1850 [STATED]); the base's `Junction` is a frame-arena vertex that never crosses the seam (door 1). The
host's proposed `kind: 'hidden'` is refused for the reason above: `hidden` stays the host's grade, and a trod is a record
of its own, not a class of `WorldRoute` [INFERRED; J-V13.114, J-V13.115].

**Q1 — Can a route endpoint be a non-settlement junction today? If not, what milestone adds it?** A *host* route
cannot and will not: "every host route ends at two host settlements; a site, a proposal or a junction is a position
along a route, never an end of a host route (the map's own approach road, (12), ends at it)" (V13:1827–1828
[STATED]). The map's own approach road already ends at a junction at one end, through `join?: { route; atCm }`
(V13:786 [STATED]), laid at "the joined route's polyline point nearest the path's last cell" (V13:1850 [STATED]) — but
it is keyless and in no canon slot, `routeFacts` row, `patrolOffer` row or `routes(world)` host list (V13:1871–1873
[STATED]), and no record has two junction ends (V13:786 [OBSERVED]). So the answer is: not today for the host; the
design adds it as a **record of its own**, the `Trod`, whose two ends are `TrodJunction`s on a route (the route, its
lay version and the fraction of its land effort from its `a` end, `WorldWhere`'s own form), on a seat's margin ring
(the seat's "gate" at world scale — the frame's gate station is frame geometry behind door 1, and an approach road
"never enters a settlement's frame", V13:1848 [STATED]) or on another trod's vertex (§1.1). W7 (11)'s law stands
untouched. **Milestone: M-W2**, which already holds W7 with the approaches, the lived network, `routeFacts`, `mapFeed`
and every reader a trod must be kept out of (V13:3814 [STATED]) [INFERRED; J-V13.115, J-V13.124].

**Q2 — Does the world port already carry per-stretch ground classes for routes (T2), or is that new work?** The
*record* already does: `WorldRoute` carries `stations: Int32Array /* per vertex: cumulative land effort-metres … */`
and `vertexClass: Uint8Array /* per segment: the host's terrain class through the adapter folder's table */` with
`byClassM` (V13:790–791 [STATED]), evaluated on the final polyline by W7 (7) (V13:1800–1802 [STATED]), since amendment
item 689 (`docs/AMENDMENTS-2026-10-17m.md:534, :543` [OBSERVED]). The *simulator feed* does not: `routeFacts` sends
"the per-class effort" — totals per class — "never `costTotal`" (V13:2484–2485 [STATED]), and the ordered classes ride
`routes(world)`, the map feed, which "is never read by a step of its simulation" (V13:2437–2439 [STATED]). So B is a
**port change, not a generator change**: `routeFacts` gains the ordered ground runs per host edge — consecutive
segments of one class collapsed to (to-station, class, effort-metres), a derived transient of the record, never a
second field — in M-W2 (§2, 956 (a)). The host's ledger row T2 ("no terrain-class breakdown per segment — MISSING",
FPI:394 [STATED]) and the host document's ENC-HS-06 and ENC-HP-09 (HR:606, HR:625 [STATED]) predate item 689 (the
research note read V13 at 2 988 lines, FPI:484 [STATED]) and are corrected (§2, 957 (a)–(c)) [INFERRED; J-V13.120].

**Q3 — Which route class already means "not for armies or caravans"? Is `trail` that, or is `hidden` a seventh
class?** Neither. `trail` is a rank rule — "every seat still unjoined after the passes gets a `trail` to its nearest
routed cell" (V13:1791–1793 [STATED]) — and a trail is a public route: an approach joins "a public land route of any
class … highway > road > track > trail" (V13:1839–1840 [STATED]), a watchpost sits at a trail's crossing (V13:2090
[STATED]) and it enters a frame as a `path` (V13:762 [STATED]); no V13 sentence restricts who uses it [OBSERVED:
absence]. On a host-bound world "no trails to host seats" are laid at all (V13:1805–1806 [STATED]). `hidden` is not a
class: the class union is `'highway'|'road'|'track'|'trail'|'sea'|'river'` and `hidden` is a *grade* "among" the host's
grade words on a bound route (V13:788 [STATED]) — a demoted overt road, drawn DM-only, patrolled by none, counting as no
public road (V13:1815–1820, 1163, 2065 [STATED]); the host's migrants even refuse the rung ("hidden hops refused",
`research/sf/population-system.md:420` [STATED]). The thing the host wants — a way born in geography that was never a
road, with junction ends, size-capped by its form — is **a separate record outside `WorldRoute`**: no host key, no
leg, no seat end, counted by no reader of routes (§1.1). The restriction on who travels it is the host's stance law,
never a map class [INFERRED; J-V13.115].

**Q4 — Can the record express a width/kind hint per way, or should the host derive capacity from ground class
alone?** No land route carries a width or kind today; the only width-like facts are a water edge's limits offered on
request (V13:2485–2487 [STATED]), and "the map's routes carry no capacity at all" (HR:609 [STATED]). The trod record
carries a **form word** — `narrow` (a goat path, a game trail: single file), `drove` (a drover's trod), `broad` (a trod
worn cart-wide, the host's "old road") — chosen deterministically by a rule row over the trod's mean slope and dominant
ground, each form with a nominal `widthM` (1 / 3 / 5 m, own, calibratable) in the `world.trods` table (§1.2). The host
registers the three words and derives its size band from the form and the ground runs; the map records no capacity and
simulates none (the host asked for a derivable hint, REQ:16 [STATED]) [INFERRED; J-V13.119].

**Q5 — Who owns "known per town"?** The host, exactly as it prefers (REQ:42 [STATED]), and the canon admits nothing
else: "truth only — no believed fact enters or leaves the canon" (V13:2578–2579 [STATED]); "no political, overlay,
lived-route or belief input enters it" (V13:2451–2453 [STATED]). A town's knowledge arrives as a **dated event in the
events window (H9)** with the host's resolved audience — `WorldEvent` with `kind` the host's knowledge word through the
adapter folder's event table, `where` the trod (by its canon key), `seats` the knowing seat, `cause` the host's how-word
through the vocabulary table, `week`, `audience` (V13:834–839 [STATED]; the knowledge rule V13:960–963 [STATED]) —
retracted by the windowed replace (V13:2530–2535 [STATED]); the map draws it and never decides. The *party's* axis is
V14's three states unchanged — `dmOnly` at birth, `revealed` by the DM's `setAttr` or the host's reveal, `discovered` by
the host's event — through the one admission function and the shared `party` key (V14:763–766, 791–793, J-V14.12 at
V14:3082 [STATED]); no fourth tier (V13:960 [STATED]). Watches ride the polity window's road-watch rows by the trod's key
(H13; V13:866 [STATED]) and movers the presentation overlay (H17; V13:2558 [STATED]) — not H23, which is the lens window
of ledger rows (HR:102 [STATED]) [INFERRED; J-V13.121].

**Q6 — Which milestone carries A and C?** **M-W2** carries A whole — W7 (13), the records, the `trods` layer, the canon's
fourth slot, the trod-knowledge event kind, the DM's reveal and the road-watch trod rows — and B (the ground runs), with
the host's **H32** row reading the slot; M-W2 is the milestone the host's bodies chain names, as it named M-SITE for the
sites. C splits: the reveal (the DM's and the host's, drawn by the structural `trods` layer under the admission) is
M-W2's; the host's marks over it — known-to, watched, on the trod — are the ninth lens, a step of **M-W5** after
alignment, where the `LensLayer` record, the audience filter, the scrub and `lensWhy` live (V13:3816 [STATED]). The
reasons: A needs W7's laid network (V13:3814 [STATED]) and is read by nothing before it; a lens holds no geography
("nothing of a lens is read by a stage", V13:3259–3260 [STATED]); and the host's stand-in is retired by the slot, not by
the marks. Price: M-W2 8 → 9 pw, M-W5 unchanged at its whole-week resolution (§3 Q5) [INFERRED; J-V13.124].

**Q7 — Does the size budget change if a province carries 200–2 000 ways?** The budget is "a `continent` world ≤ 24 MB
gzipped (… plus ≤ 2 MB of records), a `realm` ≤ 11 MB, a `province` ≤ 3 MB" (V13:1359–1360 [STATED]); at the province
rung 1 024 000 fine cells × ≈ 2.2 B leave ≈ 0.75 MB for every record [OBSERVED arithmetic]. A trod stored as a
delta-coded polyline (≈ 6 B per vertex, a vertex every 250–400 m at the 250 m cell), an 80 B header and no reason of its
own (one reason per rough country, the trod's why computed on demand as a cell's is, V13:829–830 [STATED]) costs ≈ 300 B
at 10 km: 200 trods ≈ 0.06 MB, 2 000 ≈ 0.6 MB — the upper figure four fifths of the province's record headroom, so the
answer is **yes at 2 000, no at 200**, and the design does three things: the default density gives a province two-fifths
rough ≈ 320 trods and a wholly rough one ≈ 800; a register row `WORLD-18` caps the trods at 0.5 MB of the 2 MB records
block at the continent rung (≈ 2 900 trods × ≈ 155 B at the 1 km cell ≈ 0.45 MB); and §2.7's pre-decided fallback is
extended — past the cap the trods are dropped from the file and rebuilt on load, as the recomputable rasters are
(V13:1361–1362 [STATED]), because W7c is deterministic over the persisted rasters and routes and a trod's secret state is
an edit the log replays. The same density stored at a continent (144 × a province's area) would break the budget if the
host's upper figure were kept per province area (28 800–288 000 trods), which is why `perKm2` is a per-rung cell. Two
things noticed in passing: §2.7's own figures conflict (10⁵ records × ≈ 120 B is 12 MB, not "inside the 2 MB",
V13:1352–1354 [OBSERVED arithmetic]; left for the fix list, §4), and HR:44's "province" is read as the size rung, not a
standalone subdivision (V13:797) [INFERRED].

---

## §1 The design

### 1.1 The records (V13 §2.2; fragments 955 (e), (f), (g), (h), (i), (j), (k), (l), (m), (n))

**`Trod`** — the map's own hidden way: `id`; `ends: [Id, Id]` its two `TrodJunction`s sorted by lineage key (a trod
starts and ends off a settlement); `form: 'narrow'|'drove'|'broad'`; `polyline`; `stations` and `vertexClass` exactly
as `WorldRoute`'s (V13:790 [STATED]) — cumulative land effort-metres under the cost law's time terms and the host's
terrain class per segment through the adapter folder's table — with **no trod factor of the map's** (the host prices a
trod under its own law, slower than a road, REQ:26 [STATED]); `lengthM`, `landEffortM`, `byClassM`, `coverShare`
(hundredths on rough cells), `country` (the rough country it serves), `seasonal` (snow weeks on its highest segment —
"a winter closure is never a cut", REQ:26; the host's slow-not-sever law, HR:676 [STATED]), `layVersion`, `landmass`,
`knownTo` `secret` at birth, `secret: SecretState` (V14 §2.3's record on the trod), `costTotal` (presentation only) and
`reason` (the country's). **`TrodJunction`** — `id`, `at`, `trods` (the trods ending here) and `on`: `{ kind: 'route';
route; hostKey?; layVersion; fraction }` (the fraction of the route's land effort from its `a` end — `WorldWhere`'s own
form, V13:887 [STATED]), `{ kind: 'seat'; placement; hostKey? }` (the end on the placed frame's margin ring, outside
extent + margin: door 1) or `{ kind: 'trod'; trod; vertex }`. Why a record of its own and not a `WorldRoute`: a trod has
no host key, no seat end and no leg; `WorldRoute.a/b` are seat ids and `join` is singular and "an approach road only"
(V13:786 [STATED]); every reader of routes — `existingRoute` (V13:1763), `connectivity`, the siting plug-ins, the
coherence tests, the charters' `roads`, `roadsAt`, continuity (V13:1979), patrols (V13:2063), border posts (V13:2089)
[STATED] — must not count it, which a separate record gives by construction, as the approach road's long exclusion
list (V13:1864–1868 [STATED]) had to give clause by clause. Beside them: the sparse `trods` layer beside the `routes`
map (V13:712 [STATED]; 955 (e)); `WorldEvent.cause` carries the knowledge event's how-word (955 (g)); `roadWatch` names
an edge *or* a trod (955 (k)); `WorldWhere` gains the kinds `trod` and `junction` (955 (l)); `LensId` gains `trods`
(955 (m)); the knowledge paragraph says a trod is `secret` at birth under the one admission function (955 (n)).

**The canon's fourth slot** — `trods: { trods: CanonTrod[]; junctions: CanonJunction[] }` with its own `versions.trods`
hash (955 (h), (i), (j)). `CanonTrod`: `key` (the map's lineage key, opaque, the id the host's events and watches name),
`form`, `ends` (junction keys), `course`, `runs: { to; terrainClass; effortM }[]` (the ordered ground runs, integers),
`lengthM`, `effortM`, `landmass`, `snowWeeks?`. `CanonJunction`: `key`, `at`, `on` = `{ edge; fraction }` (the host's edge
key and the fraction from the key's first seat), `{ seat }` or `{ trod }`. Everything the simulator feed admits and
nothing it refuses: "integers with a stated unit, the host's closed vocabularies through the adapter folder's tables,
host keys and `WorldPointCm`s — no float, no prose, no cache, no echo of a host fact, no raster index" (V13:2435–2437
[STATED]) — the request's "ordered CELLS" (REQ:25) become ordered runs over a course of world points, since no raster
index crosses the port (`research/sf/fp-realm-review.md:529` [STATED]). The versions are per slot (V13:1322–1326;
HR:777 [STATED]); a slot whose inputs did not change is byte-identical.

**Per-stretch ground on the overt routes (B)** — a derived transient at the port, not a field: `routeFacts` collapses
each route's `vertexClass` and `stations` to ordered runs (956 (a)). Why not a field: the record holds the per-segment
class already (V13:790); a second stored copy would be a cache of the record, and the simulator feed admits "no cache"
(V13:2436 [STATED]); why not the map feed: no step of the host's simulation reads it (V13:2437–2439 [STATED]), and the
host's army pace (T9) and its stand-in cover graph do.

### 1.2 The rule table (V13 §2.3 `world.trods`; fragments 955 (o), (p); the patrol, lens-order and collision cells (q), (r), (s))

`TrodRule` with cells `{value, unit, provenance own, calibratable}`: `cover` (forest 1, wetland 1, alpine 1; ice,
tundra, grass, scrub, desert 0 — the owner's forest, marsh and mountain; the host's eight classes crosswalk to V13's
`landUse` words as `read-host.md` §4 gives them [INFERRED]); `roughSlopePct` 8 (the owner's hills, which the host cannot
know — "hills" is a settlement word, not one of its eight stretch classes, FPI:58–59 [STATED]); `minRoughKm2` 25;
`edgeBandM` 1 000; `junctionSpacingM` 3 000; `seatReachM` 3 000; `perKm2` province 1 ÷ 80, realm 1 ÷ 320, continent 1 ÷
1 280; `minPerCountry` 2, `maxPerCountry` 12, `minSpanM` 4 000; `openFactor` 4, `maxCostFactor` 3, `coverShare` 0.7,
`openRunMaxM` 1 500, `spacingM` 500; `forms` narrow 1 m, drove 3 m, broad 5 m; `formRule` narrow where mean slope ≥ 6 %
or the dominant class is alpine, ice or wetland, broad where mean slope < 3 % and the dominant class is forest, grass or
scrub, else drove. These are the parameters the host can read (REQ:29 "use yours and tell us the parameters"). The
owner's rule is honoured as written: *several* = the clamped target per country, *per rough country* = one 8-connected
component of cover-or-steep cells, *none across open plain* = the open-run cap and the cover share, so no trod is laid
to make a count [INFERRED; J-V13.118].

### 1.3 The generation step W7c (V13 §3.8 (13); §3.0 row; §3.16; §3.17; fragments 955 (aa), (ab), (ac), (ao)–(at))

Runs after (12) on both worlds and as a local operator of a route's re-lay or removal under a junction; reads `landUse`,
`dem`, the public routes with their lay in force (never an approach road, never a water leg; on a bound world only a
keyed route), the placed frames' extents and margins, the cost law; draws nothing (`world.trods` reserved, as
`world.siting` is, V13:2928–2929 [STATED]). (a) the rough flood; (b) junction candidates thinned per route and per seat
margin; (c) the target; (d) the lay — four tiers of pairs (two routes; a route and a seat; one route far apart; a laid
trod's vertex), each tier by straight cost, ties by sorted lineage keys, each pair one A\* as W7 (4)'s over the trod cost
surface (the cost law's time terms × `openFactor` on open cells, route cells impassable save the junctions, frames
impassable, water impassable on land) within the trod's own ellipse; drops for the factor, the cover share, an open run
and spacing; (e) the record with its fields evaluated as W7 (7) says; (f) what reads it and what never does; (g) the
lifecycle. Its failure rung is F-WORLD's *sparse trods* (reported `W_TROD_SPARSE`, never a trod across open plain to make
the count); its work limit 2 × fine cells + Σ ellipse cells over the pairs tried; its budget row 25 / 50 / 100 ms,
inside the re-declared totals (755 / 2 950 / 6 800 ms against 900 / 3 000 / 7 000; V13:3594–3597 [STATED]) [OBSERVED
arithmetic on the W7 law of V13:3591: a 10 km trod's ellipse at factor 3 ≈ 960 cells at the 250 m cell, ≈ 7.7 µs].
Determinism: order-free by construction (every rank is a value or a sorted key; the comparator lint of V13:2935
[STATED]); T-V13-59 asserts two runs byte-identical and permuted inputs the same.

### 1.4 The canon and the additive canon (V13 §3.11.6; fragments 955 (af), (ag), (ak), (al); §2.7 (w))

The trods slot is stated beside the travel, water and sites slots (955 (af)). **Law (1) is widened by one clause** — the
slot reads the routes' laid courses in force as well, "their geometry alone, never a grade, a closure or a knowledge"
(955 (ak)) — because a slot of pure physical functions cannot put a junction on a road, and the owner's rule is "hidden
roads that connect between roads" (REQ:4 [STATED]); the alternative that keeps law (1) verbatim (junctions on the seat
territories' crossings, already canon products, V13:2443 [STATED]) puts no trod on a road and is rejected (J-V13.116).
Junctions sit **on the lay in force**: a `bypass` re-lay (V13:1813–1815 [STATED]) or a removal re-joins the trod within
`edgeBandM` or tombstones it, and takes effect in the canon only at the canonize that adopts that lay — the same rule by
which "every lay version … stays `W_HOST_CANON_BEHIND` until a later canon adopts it" (V13:2471 [STATED]) — so an
adopted canon is never rewritten (law (7)) and the host's knowledge of a trod's key survives (the key is kept by the
anchor, V13 §2.5; 955 (t), (u)). **The additive canon** re-derives only the trods a new seat's edges touch — a trod a new
edge crosses is split at the crossing, one it joins re-joined, every other trod byte-identical (955 (ag)) — on the model
of "every other row as that canon has it" (V13:2463 [STATED]). Law (9) gains the words (955 (al)).

### 1.5 The reveal and the lens (V13 §5.1, §5.8, §5.9 (9); fragments 955 (au), (av), (aw), (ax), (ay), (az), (ba); V14 (bq), (br), (bs))

Two parts, because a lens holds no geography (V13:3259–3260 [STATED]). **(i) The `trods` layer** is structural: it
draws every trod the view's audience admits under the one admission function over `knownTo` and the party's `places`
(V14:791–793; Base:15744 [STATED]) — the DM every trod with V14 §2.3's second cue (eye-slash at the junctions for
`dmOnly`, open ticks `revealed`, filled `discovered`, V14:2583–2588 [STATED]), a party only a revealed or discovered trod;
an unknown trod is undrawn, unlisted, uncounted, unnamed and unexported for a party (C1); no km label. The DM sees every
trod by default, as a DM-only site is drawn (V14:764 [STATED]) — not behind a default-off view key, because the DM cannot
reveal what it cannot see and a still lens is "never hidden" (V13:3287 [STATED]); the DM's picture export is the DM's own
act, as for DM-only sites today (J-V13.121). **(ii) The `trods` lens** (the ninth, after alignment, outside J384 (8)'s
eight) draws the host's facts over it: *known to* (S, placed: the knowing seat's pip at the trod's midpoint with the
how-word — C2; a public row draws the line for the party too), *watched* (S: the road-watch trod rows), *on the trod* (S,
placed: the overlay's movers at their fraction, the named traveller's grammar, V13:3455 [STATED]; covert omitted), *at
the junction* (the events layer's pins), *width hint* (P). Regimes *known / revealed / still*, the still word keyed on
routes laid as the patrols lens's is (V13:3419 [STATED]) — **never on a count**. **The legend** carries one fixed sentence
in every regime and for every audience — "Trods show where a town is known to use one or the DM has revealed one; others
may exist." — true whatever the count (C4), and three gated notes (patrols ride no trod; the host's stance; the closure's
law). **Refusals** list every leak and every invented fact (an unknown trod drawn, listed, counted, named or exported; a
count anywhere party-facing, the regime words, picker and screen-reader summary included; a guessed course; an ambush
verdict; a line of sight; a cadence; a plague carried or a quarantine line; a capacity; a promotion or a decayed road as
a trod). The audience filter folds a trod no reveal admits with the covert things, omitted never greyed (955 (ay)).
V14's `SecretState` serves the trod unchanged (955 (bq)); E1's world crop reads an admitted trod as a `path` band at its
form's width with no patrol passing (955 (br)); V14 §10.2 records the request (955 (bs)). The base needs no change: the
admission function is generic and already reads `SecretState` (Base:15744 [STATED]); the base's own "a hidden place is
always on the map — what the map withholds is its name" (Base:15729–15731 [STATED]) is a frame-scale label rule and is
not applied [INFERRED].

### 1.6 The events, watches and movers contract (fragments 955 (g), (k), (aj), (ai), (ah); H32 (bl))

The host's `way_known(settlementId, wayId, how, tick)` (REQ:33) is, on the port's side, **a `WorldEvent` of the
trod-knowledge kind** through the events window (H9): `kind` the host's word through the adapter folder's event table,
`where: { kind: 'trod'; trod }` by the canon key, `seats: [the knowing seat]`, `cause` the host's how-word through the
vocabulary table, `week`, `audience` the host's resolution (an unresolved row DM-only, V13:963 [STATED]); its retraction
the windowed replace. No new message, no new field but the two `WorldWhere` kinds and the one comment on `cause`. The
hearing's places: `placeOf` names a `trod` (with its fraction) or a `junction` for the DM and for an audience whose
places admit the trod, else "the country it crosses" — its rough country, the nearest route and seat (955 (ai)); the
host says it does not consume H16 (REQ:11), so the trod and junction keys reach it by the slot, and it sends them back
in `where`. Watches: `roadWatch` by the trod's key (H13). Movers: `hostOverlay` on a trod by key and fraction (H17; the
request's "presence rows (H23)" are the host's movers, which its own document files under H17, HR:83 [STATED]). Patrol
coverage on a trod is **none** — no `PatrolCadence`, no `patrolOffer` row (955 (q), (ad), (bf)): J396 keeps patrols
map-only (`docs/PROGRESS.md:455`; `docs/AMENDMENTS-2026-10-18u.md:50–56` [STATED]), and the host's "a patrol's coverage
on an unknown way is zero; a known way can be watched" (REQ:17) is then true by construction — zero everywhere from the
map, and a watch drawn only where the host asserts one.

### 1.7 The lifecycle law and D (W7 (13) (g); §3.14.3 row 13 (am), (an); J-V13.123)

A trod is never promoted to a route by the map (the host's `network` change words — chartered, promoted, demoted,
abandoned, revived, facet, bypass, retract, V13:886 [STATED] — have no word for it, and a grade edit on a host route is
refused, V13:1817 [STATED]); a road that decays in the host's ledger does not become a trod: a host route the host demotes
to `hidden` or abandons keeps its `WorldRoute`, its DM-only ghost (V13:1815 [STATED]) and its junctions. **Position on
D3: no trod is born where a road dies.** Reasons: minting one would make a lived host fact (the abandonment) enter the
canon's trods slot, against law (1); the host already prices its hidden rung on that road ("grade penalty on the
`hidden` rung; the dangerous goods take the overgrown road", FPI:159 [STATED]), so the overgrown road *is* the host's
hidden-grade `WorldRoute`, not a trod; and the host "would rather not mint" the law (REQ:35 [STATED]). A trod's course
moves only as W7 (10) says; the DM edits its secret state only. On the detours: HR:653's "the map offers no detour
either" is stale against W7 (9)'s `bypass` fold (V13:1813–1815; T-V13-41 (u) at V13:3736 [STATED]) and is corrected
(957 (d)).

### 1.8 The quarantine law's map side (the trods lens's note and refusals; J-V13.123)

The host has no quarantine or gate-closure verb (`research/sf/plague-system.md:556, 798–799`; plague-R7 an open owner
ruling, HR:481 [STATED]); V13 refuses "a quarantine line" on the plague lens and "a patrol drawn … holding a quarantine
line" on the patrols lens (V13:3385, 3428 [STATED]). Those refusals stand. The trods lens carries one gated note — "a
closure stops the road, not the trod: the host's law" — whose gate is the host's closure sent as a stored fact and so
never holds until the verb exists; a trod draws unchanged across any closure, is never drawn as a bypass of it and never
as a plague's carrier. Which message carries the closure once ruled (a road-watch row with a cause word, or an event at a
typed place) waits on the owner's plague-R7 and is left out (§4).

### 1.9 The size arithmetic (§0 Q7; §2.7 (x), (y), (z); `WORLD-18` (bd))

Summarised: ≈ 300 B per trod at the province rung, ≈ 155 B at the continent's; defaults ≈ 320–800 per province, ≈ 1 300
per realm, ≈ 2 900 per continent (≈ 0.45 MB); `WORLD-18` caps the trods at 0.5 MB of the records block; the fallback
rebuilds them on load. One reason record per rough country keeps the record count bounded by countries, not trods.

### 1.10 Milestones, tests, decisions, BCRs, host rows

**Milestones** (955 (bi), (bj), (bk)): M-W2 carries W7 (13), the records, the layer, the slot, the event kind, the reveal,
the road-watch trod rows and the ground runs, at 9 pw (≈ 1 pw more); M-W5 the trods lens as its last step (≈ 0.5 pw,
inside the row). **Tests** (955 (be), (bf), (bg)): T-V13-59 the generation, the exclusions and the slot (determinism,
order-freedom, the density invariants, no trod across open plain, the readers that never count it, the slot
byte-identical across every lived fact, the re-join at the adopting canonize, the ground runs collapsing exactly, the
rebuild on load); T-V13-60 the audience and the lens (the non-interference test: two worlds differing only in their
unrevealed trods give byte-identical party pictures, legends, picker rows, summaries and exports; the marks; the
regime never from a count). T-V13-42 gains the trod clause. **Decisions** J-V13.114–J-V13.124 (955 (bm)), each "chose X
over Y because Z". **BCRs: none** — the base's `WayClass` is untouched (the word moves, not the class), the admission
function is generic, no view key is minted (the layer is structural), and no base text lists the canon's slots
[OBSERVED: grep of the base for the slot list returns nothing]. **Host rows** (955 (bl); 957 (h)): one new row **H32**
("the trod asks": the slot reading with M-W2, the knowledge event through H9, the places, the watches through H13, the
movers through H17, the reveal, the ground runs; the marks with M-W5) — numbered after H31 (V13:3906 [OBSERVED]); its
number is also the kernel's `H32` hash's name (V13:1384, 3140, 3146, 3664 [OBSERVED]), which the row says in its own
words and which the judges may resolve by skipping to H33 if they prefer (§4). Q2's "H1–H31" becomes "H1–H32" (955
(bn), (bo)).

### 1.11 What the host document is told (957 (a)–(h))

ENC-HS-06 and ENC-HP-09: T2 is supplied since item 689 and item 956 (the ledger's MISSING was read against V13 at 2 988
lines). ENC-HL-10: the map mirrors the host's bypass. ENC-HL-11: the junctions are topological. ENC-HL-12: filled — the
trods, the slot, the word collision answered. ENC-HL-13: a trod and a junction are typed places. The H list gains H32.
Four of the request's premises contradict the recorded host facts and are not designed against (left to the host, §4):
"a small military unit may take one" (M4: "armies may not", FPI:159 [STATED]); "the existing smuggling gauntlet" (the
recorded rule is one roll at the route's worst gate, on shipments with no path, `research/sf/trade-system.md:565–568,
:179` [STATED]); "the host's snapshot hard-deny already hides `spatialLedgers`" (no source records it; the recorded
allowlist is `pantheon` only, `research/sf/faith-system.md:435–436` [STATED]); "a patrol catches a body on it" (the host
has no patrol rule, HR:711; `research/sf/lens-implications.md:371` [STATED]).

---

## §2 The fragments

Item **955** (the trods: A, C, D — V13, V14, INDEX, SUMMARY), item **956** (the ground runs: B — V13 §3.11.6), item
**957** (the host document's rows). Numbered from 955 (file v ended at 954); the synthesis renumbers.

Fragments: **82** — `docs/volumes/V13-world.md` 69, `docs/volumes/V14-sites.md` 3, `docs/HOST-REQUIREMENTS-2026-10-18.md` 8, `docs/volumes/INDEX.md` 1, `docs/volumes/SUMMARY.md` 1. Each current text is quoted once, verbatim, at the line it stands on in its target at the md5 named; an insertion quotes the line it follows and repeats it first in the new text. Applied in this order, each current text matches once at its turn and each new text occurs once after (checked by the builder `build.py` in this seat's scratchpad: uniqueness, line, order, overlap). The machine copy is `docs/validation/hidden-ways-2026-10-18/design-A.fragments.json` (the same fragments, in this order, texts unescaped).

**955 (a).** Volume 13 — §1.3 The owner rules obeyed (insertion after the file-t bullet's last line) (insertion). Target: `docs/volumes/V13-world.md`, line 374 (md5 `e68af748…`) as it stands now. *Reason:* the owner's rule quoted where the volume lists the owner rules obeyed, as file t did for J393.
*Current text (as it stands now):*
>   a host-placed site is read and reported, never re-sited (V14 §3.4 (a)).
*New text:*
>   a host-placed site is read and reported, never re-sited (V14 §3.4 (a)).
> * **The owner's rule on the brigands' ways (2026-10-18; the host's request of that date; file w item 955).** "these are all brigands, they don't travel the overt roads... roads are used for military, caravans, and groups of people because they ease travel and logistics. These are public enemies to most and as such should have a different means of traveling, maybe hidden roads that connect between roads, and multiple of them." Obeyed by W7 (13)'s **trods** (V13 §3.8: the map's own hidden ways laid between the roads of every rough country — several per country, none across open plain, each ending at a junction on a route, at a seat's margin or on another trod, never a seat of W7's pair selection), the canon's trods slot (V13 §3.11.6: the host's bodies read them as geography; who knows a trod, who rides it and what happens on it are the host's, sent through the events window and its presentation overlay), the trod's secret state (V13 §2.2: `dmOnly` until the DM or the host reveals it) and the trods lens (V13 §5.9 (9): drawn only as known or revealed, the legend never counting them); a trod is never promoted to a route and no trod is born where a road dies.

**955 (b).** Volume 13 — §1b.1 Records, fields and tables (insertion after the `WorldRoute` row) (insertion). Target: `docs/volumes/V13-world.md`, line 493 (md5 `e68af748…`) as it stands now. *Reason:* the wiring row: producer, consumers, home.
*Current text (as it stands now):*
> | `WorldRoute` (a graph edge: ends, mode, class or the host's grade, polyline, time stations, lay version, origin; bound: the host's edge key; an **approach road** — the map's own road to a world site, origin `approach`, its junction in `join`, V13 §3.8 (12)) | W7 — on a standalone world by its own selection; on a host-bound world laying exactly the host's genesis edges and lived changes (V13 §3.8); on either world W7 (12)'s approach roads, never a host edge | the charter's `roads`, the port's `routes`, `routeFacts` and `mapFeed` (an approach road only in the DM's `mapFeed`, keyless), W6's economic stage (never an approach road), W9's labels, the view, the exports; V14's E1 (the world-map case reads the route at the point) | V13 §2.2 |
*New text:*
> | `WorldRoute` (a graph edge: ends, mode, class or the host's grade, polyline, time stations, lay version, origin; bound: the host's edge key; an **approach road** — the map's own road to a world site, origin `approach`, its junction in `join`, V13 §3.8 (12)) | W7 — on a standalone world by its own selection; on a host-bound world laying exactly the host's genesis edges and lived changes (V13 §3.8); on either world W7 (12)'s approach roads, never a host edge | the charter's `roads`, the port's `routes`, `routeFacts` and `mapFeed` (an approach road only in the DM's `mapFeed`, keyless), W6's economic stage (never an approach road), W9's labels, the view, the exports; V14's E1 (the world-map case reads the route at the point) | V13 §2.2 |
> | `Trod` and `TrodJunction` (a hidden way of rough country, file w item 955: two junction ends — on a route at a fraction of its land effort, on a seat's margin, or on another trod —, its form word, polyline, time stations and per-segment ground class, its secret state) and the `trods` layer | W7 (13) on both worlds, after the approaches; re-laid by a route's re-lay or removal under its junction (V13 §3.8 (13)) | the canon's trods slot and `mapFeed` (in the audience its secret state admits), `placeOf` (the `trod` and `junction` places), the `trods` layer and the trods lens (V13 §5.9 (9)), V14's E1 (an admitted trod in the crop), the exports under the admission, `derivedTime`; never `existingRoute`, W6b's `connectivity`, V14's siting plug-ins, the site coherence tests, the charters' `roads`, `roadsAt`, W8b's continuity, patrols or border posts | V13 §2.2 |

**955 (c).** Volume 13 — §1b.2 Stage outputs and interfaces (the `WorldPort` row) (edit). Target: `docs/volumes/V13-world.md`, line 547 (md5 `e68af748…`) as it stands now. *Reason:* the port's wiring row names the fourth slot and the runs.
*Current text (as it stands now):*
> → `WorldCanon`, with the optional `routeFacts` and `patrolOffer`;
*New text:*
> → `WorldCanon` (its travel, water, sites and trods slots), with the optional `routeFacts` (its ordered ground runs among its fields, file w item 956) and `patrolOffer`;

**955 (d).** Volume 13 — §1b.4 Entity kinds (insertion after the `WorldRoute` row) (insertion). Target: `docs/volumes/V13-world.md`, line 601 (md5 `e68af748…`) as it stands now. *Reason:* the entity row: rendered, labelled, exported, persisted.
*Current text (as it stands now):*
> | `WorldRoute` | by class or the host's grade (a hidden host road a DM-only ghost) | none (a route takes its ends' names) | GeoJSON LineString, the ecosystem-shaped JSON's routes, CSV | entities block |
*New text:*
> | `WorldRoute` | by class or the host's grade (a hidden host road a DM-only ghost) | none (a route takes its ends' names) | GeoJSON LineString, the ecosystem-shaped JSON's routes, CSV | entities block |
> | `Trod` (file w item 955) | the `trods` layer in its form's style (narrow dotted, drove dash-dot, broad dashed, the secret colour role) with its junction ticks on the route; for the DM every trod with V14 §2.3's second cue (`dmOnly` an eye-slash at its junctions, `revealed` open ticks, `discovered` filled); for a party only a trod its places admit | none (a trod is unnamed; the lens captions it by the country it crosses and the routes it joins) | GeoJSON LineString (kind `trod`), CSV — under the export's admission | entities block |

**955 (e).** Volume 13 — §2.2 the world's layers (insertion after the `routes` map) (insertion). Target: `docs/volumes/V13-world.md`, line 712 (md5 `e68af748…`) as it stands now. *Reason:* the sparse trods layer beside the routes layer.
*Current text (as it stands now):*
>   routes: Map<number /* fine cell */, Id[]> /* the route ids crossing a cell (W7); sparse */;
*New text:*
>   routes: Map<number /* fine cell */, Id[]> /* the route ids crossing a cell (W7); sparse */;
>   trods: Map<number /* fine cell */, Id[]> /* the trod ids crossing a cell (W7 (13); file w item 955); sparse; never read by W7 (2)'s existingRoute */;

**955 (f).** Volume 13 — §2.2 New records (insertion after the `WorldRoute` block) (insertion). Target: `docs/volumes/V13-world.md`, line 793 (md5 `e68af748…`) as it stands now. *Reason:* the two records.
*Current text (as it stands now):*
>   costTotal: number /* the undiscounted cost along the laid course: the clerk's "why this road", presentation only, never a time and never sent to the host's simulation */; landmass: number; reason: Id }
*New text:*
>   costTotal: number /* the undiscounted cost along the laid course: the clerk's "why this road", presentation only, never a time and never sent to the host's simulation */; landmass: number; reason: Id }
> interface Trod {                             // file w item 955: a hidden way of rough country (W7 (13)) — the map's own geography, never a route, never a host edge
>   id: Id; ends: [Id, Id] /* its two TrodJunctions, sorted by lineage key: a trod starts and ends off a settlement */; form: 'narrow'|'drove'|'broad' /* world.trods' form rows: the width hint the host turns into its own size band (a goat path or game trail; a drover's trod; a trod worn cart-wide) */;
>   polyline: WorldPointCm[]; stations: Int32Array /* per vertex: cumulative land effort-metres under the cost law's time terms, as WorldRoute's; no trod factor of the map's — the host prices a trod under its own law, slower than a road */; vertexClass: Uint8Array /* per segment: the host's terrain class through the adapter folder's table */;
>   lengthM: number; landEffortM: number; byClassM: Record<string, number>; coverShare: number /* hundredths: the share of its length on rough cells (W7 (13)) */; country: number /* the rough country it serves: the component's lowest-then-leftmost fine cell */;
>   seasonal?: WorldRoute['seasonal'] /* snow weeks on its highest segment, high water at a ford: a slowing, never a cut */; layVersion: number /* bumped by every re-lay (a re-join after a route's re-lay or removal) */; landmass: number;
>   knownTo: 'public'|'local'|'secret' /* `secret` at birth */; secret: SecretState /* V14 §2.3's record on the trod: dmOnly at birth; revealed by the DM's `setAttr` (`trod/secret/state`) or the host's reveal; discovered by the host's event — the party's `places` the same key as a site's */;
>   costTotal: number /* presentation only, as a route's */; reason: Id /* the rough country's W7c reason; a trod's own why computed on demand (`whyTrod`), as a cell's is */ }
> interface TrodJunction { id: Id; at: WorldPointCm; trods: Id[] /* the trods ending here */;
>   on: { kind: 'route'; route: Id; hostKey?: string /* bound: the route's host edge key */; layVersion: number /* the lay the point lies on */; fraction: { num: number; den: number } /* the station's share of the route's land effort from its `a` end (WorldWhere's form) */ }
>     | { kind: 'seat'; placement: Id; hostKey?: string /* the trod's end on the placed frame's margin ring, outside its extent + margin: the seat's "gate" at world scale, the frame's own gate station never read (door 1) */ }
>     | { kind: 'trod'; trod: Id; vertex: number /* another trod's vertex */ };
>   reason: Id }   // on the world a junction is a position along a route, never an end of a host route (W7 (11)); the approach road (W7 (12)) and the trods (W7 (13)) end at one

**955 (g).** Volume 13 — §2.2 `WorldEvent` (edit). Target: `docs/volumes/V13-world.md`, line 837 (md5 `e68af748…`) as it stands now. *Reason:* the how-word rides the one cause field: one word, one meaning (the host's cause word for the event).
*Current text (as it stands now):*
> cause?: string /* the host's cause word — a patron fall's — by the adapter folder's vocabulary table, when sent */
*New text:*
> cause?: string /* the host's cause word — a patron fall's; a trod-knowledge event's how-word (W7 (13); file w item 955) — by the adapter folder's vocabulary table, when sent */

**955 (h).** Volume 13 — §2.2 `WorldCanon.envelope.versions` (edit). Target: `docs/volumes/V13-world.md`, line 846 (md5 `e68af748…`) as it stands now. *Reason:* the envelope versions the fourth slot.
*Current text (as it stands now):*
> sites: Hash128 };
*New text:*
> sites: Hash128; trods: Hash128 /* the trods slot's input hash: the physical layers, the cost law, the member seats and the routes' lays in force (W7 (13); file w item 955) */ };

**955 (i).** Volume 13 — §2.2 `WorldCanon` slots (edit). Target: `docs/volumes/V13-world.md`, line 848 (md5 `e68af748…`) as it stands now. *Reason:* the fourth slot.
*Current text (as it stands now):*
> /* frozen candidate ground inside the seat's orbit */ }[] }
*New text:*
> /* frozen candidate ground inside the seat's orbit */ }[];
>   trods: { trods: CanonTrod[]; junctions: CanonJunction[] } /* the trods slot (W7 (13); file w item 955): the hidden ways as geography — who knows one is never here (law (3)) */ }

**955 (j).** Volume 13 — §2.2 the port's records (insertion after `CanonSeat`) (insertion). Target: `docs/volumes/V13-world.md`, line 849 (md5 `e68af748…`) as it stands now. *Reason:* the slot's two records: integers, closed words, host keys and world points only.
*Current text (as it stands now):*
> interface CanonSeat { hostKey: string; at: WorldPointCm; landmass: number; terrainClass: string /* the adapter folder's class table */; climateBand: string; elevationM: number }
*New text:*
> interface CanonSeat { hostKey: string; at: WorldPointCm; landmass: number; terrainClass: string /* the adapter folder's class table */; climateBand: string; elevationM: number }
> interface CanonTrod { key: string /* the trod's lineage key, opaque to the host: the id its knowledge events and watches name */; form: string /* world.trods' form word (narrow, drove, broad): the width hint the host registers and turns into its own band */; ends: [string, string] /* junction keys */; course: WorldPointCm[];
>   runs: { to: number /* the vertex index the run ends at; the first run starts at vertex 0 */; terrainClass: string /* the adapter folder's class table */; effortM: number /* integer land effort-metres over the run under the host's cost law's time terms — no trod factor: the host prices it */ }[] /* the ordered ground runs: consecutive segments of one class collapsed */;
>   lengthM: number; effortM: number; landmass: number; snowWeeks?: number[] /* the 52-week set keyed to the host's week of year: a slowing under its law, never a cut */ }   // file w item 955
> interface CanonJunction { key: string; at: WorldPointCm; on: { edge: string; fraction: { num: number; den: number } /* the host's edge key and the share of its land effort from the key's first seat */ } | { seat: string /* a host key: the trod's end on the seat's margin */ } | { trod: string /* a junction on another trod */ } }   // the hearing card's `trod` and `junction` places name these keys (WorldWhere)

**955 (k).** Volume 13 — §2.2 `PolityFacts.roadWatch` (edit). Target: `docs/volumes/V13-world.md`, line 866 (md5 `e68af748…`) as it stands now. *Reason:* a host watch on a trod rides the road-watch row by the trod's key.
*Current text (as it stands now):*
> roadWatch: { edge: string; power: string; kind: 'closed'|'warden'; since: Week }[];
*New text:*
> roadWatch: { edge?: string /* a host edge key */; trod?: string /* or a trod's key from the canon's trods slot (file w item 955): exactly one of the two */; power: string; kind: 'closed'|'warden'; since: Week }[];

**955 (l).** Volume 13 — §2.2 `WorldWhere` (edit). Target: `docs/volumes/V13-world.md`, line 887 (md5 `e68af748…`) as it stands now. *Reason:* the hearing card's two new places.
*Current text (as it stands now):*
> kind: 'settlement'|'wall'|'road'|'border'|'supplyLine'|'region'|'point'|'offStage'; seat?: string; edge?: string;
*New text:*
> kind: 'settlement'|'wall'|'road'|'border'|'supplyLine'|'region'|'point'|'offStage'|'trod'|'junction' /* a trod (with its `fraction`) or a trod's junction, by the canon's keys (W7 (13); file w item 955) */; seat?: string; edge?: string; trod?: string; junction?: string;

**955 (m).** Volume 13 — §2.2 `LensId` (edit). Target: `docs/volumes/V13-world.md`, line 891 (md5 `e68af748…`) as it stands now. *Reason:* the ninth lens id.
*Current text (as it stands now):*
> type LensId = 'plague'|'sway'|'patrols'|'trade'|'populations'|'religion'|'prosperity'|'alignment';   // `world.lens`'s order (J384 (8)): plague first, then the sway (the owner's territory) and patrols, trade and populations, religion, prosperity and alignment
*New text:*
> type LensId = 'plague'|'sway'|'patrols'|'trade'|'populations'|'religion'|'prosperity'|'alignment'|'trods';   // `world.lens`'s order (J384 (8)): plague first, then the sway (the owner's territory) and patrols, trade and populations, religion, prosperity and alignment; the trods lens last, outside J384 (8)'s eight (file w item 955)

**955 (n).** Volume 13 — §2.2 Knowledge on world facts (edit). Target: `docs/volumes/V13-world.md`, line 958 (md5 `e68af748…`) as it stands now. *Reason:* the knowledge paragraph: a trod is secret at birth under the one admission function.
*Current text (as it stands now):*
> the road to a DM-only site DM-only (J393); V14's
*New text:*
> the road to a DM-only site DM-only (J393), a trod (W7 (13); file w item 955) `secret` at birth — its `SecretState` V14 §2.3's, `dmOnly` by default, the party's `places` the same key, so a party view neither draws, lists, counts, names nor exports a trod no reveal admits; V14's

**955 (o).** Volume 13 — §2.3 New rule tables (insertion after `RouteLayRule`) (insertion). Target: `docs/volumes/V13-world.md`, line 1010 (md5 `e68af748…`) as it stands now. *Reason:* the rule table's interface.
*Current text (as it stands now):*
>   sea: { trunk: boolean /* every well-ported landmass gets one sea trunk to the largest landmass */; gapFixRatio: number /* a port pair whose sea cost ≤ ratio × its land cost gets the sea leg too */ }; exitRunM: number /* a placed frame's road run through the margin to its gate station */ }   // world.routeLay — the map's own network formation (W7); never the host's, never a time
*New text:*
>   sea: { trunk: boolean /* every well-ported landmass gets one sea trunk to the largest landmass */; gapFixRatio: number /* a port pair whose sea cost ≤ ratio × its land cost gets the sea leg too */ }; exitRunM: number /* a placed frame's road run through the margin to its gate station */ }   // world.routeLay — the map's own network formation (W7); never the host's, never a time
> interface TrodRule {                                                                                         // world.trods — W7 (13) the hidden ways (file w item 955); the map's own, never the host's, never a time
>   cover: Record<BiomeRow['landUse'], 0|1> /* which land-use classes are rough country */; roughSlopePct: number /* a cell steeper than this is rough whatever grows on it: the owner's "hills" */; minRoughKm2: number /* a rough component smaller than this carries no trod */;
>   edgeBandM: number /* a route vertex within this of the country is a junction candidate; a junction re-joins within it */; junctionSpacingM: number /* candidates thinned to one per this of station along a route */; seatReachM: number /* a seat's margin within this of the country is a candidate end */;
>   perKm2: Record<WorldSizeRung, number> /* the target trods per km² of rough country, per rung */; minPerCountry: number; maxPerCountry: number; minSpanM: number /* two candidates on one route must be this far apart by station */;
>   openFactor: number /* the trod cost surface's multiplier on an open cell */; maxCostFactor: number /* the trod's own ellipse and drop rule */; coverShare: number /* a laid path below this share of rough cells is dropped */; openRunMaxM: number /* a laid path with an open run longer than this is dropped: none across open plain */; spacingM: number /* a path within this of a laid trod, save at a junction, is dropped */;
>   forms: { form: 'narrow'|'drove'|'broad'; widthM: number }[] /* the width hint per form: the host registers the word and derives its band */; formRule: { narrowSlopePct: number; broadSlopePct: number; narrowClasses: BiomeRow['landUse'][]; broadClasses: BiomeRow['landUse'][] } }

**955 (p).** Volume 13 — §2.3 the default tables (insertion after the `routeLay` table's last row) (insertion). Target: `docs/volumes/V13-world.md`, line 1137 (md5 `e68af748…`) as it stands now. *Reason:* the default rows: the density rule's parameters the host can read.
*Current text (as it stands now):*
> | `exitRunM` | 400 (a placed frame's road runs through the margin this far to its gate station) |
*New text:*
> | `exitRunM` | 400 (a placed frame's road runs through the margin this far to its gate station) |
> 
> | `TrodRule` (`world.trods`: the map's own hidden ways, W7 (13); every cell own, PLAUSIBLE until the B-WORLD sweep measures the counts against the owner's "several per rough country"; file w item 955) | default |
> |---|---|
> | `cover` | forest 1 · wetland 1 · alpine 1 · ice 0 · tundra 0 · grass 0 · scrub 0 · desert 0 (the owner's forest, marsh and mountain; hills by slope) |
> | `roughSlopePct` / `minRoughKm2` | 8 / 25 (a cell at 8 % or steeper is rough whatever grows on it; a rough component under 25 km² carries no trod) |
> | `edgeBandM` / `junctionSpacingM` / `seatReachM` | 1 000 / 3 000 / 3 000 |
> | `perKm2` province / realm / continent | 1 ÷ 80 / 1 ÷ 320 / 1 ÷ 1 280 (a province two-fifths rough carries about 320 trods, one wholly rough about 800; a continent two-fifths rough about 2 900; `WORLD-18`) |
> | `minPerCountry` / `maxPerCountry` / `minSpanM` | 2 / 12 / 4 000 |
> | `openFactor` / `maxCostFactor` | 4 / 3 (a trod hugs cover: an open cell costs four times; a path over 3 × the straight cost is dropped) |
> | `coverShare` / `openRunMaxM` / `spacingM` | 0.7 / 1 500 / 500 (seven tenths of a trod on rough cells; no open run over 1.5 km — none across open plain; no two trods within 500 m save at a junction) |
> | `forms` | narrow 1 m · drove 3 m · broad 5 m (the width hint; the host's band its own) |
> | `formRule` | `narrow` where the trod's mean slope ≥ `narrowSlopePct` 6 % or its dominant class is alpine, ice or wetland; `broad` where its mean slope < `broadSlopePct` 3 % and its dominant class is forest, grass or scrub; else `drove` |

**955 (q).** Volume 13 — §2.3 `PolityRule` default rows (the patrol row) (edit). Target: `docs/volumes/V13-world.md`, line 1163 (md5 `e68af748…`) as it stands now. *Reason:* no cadence on a trod.
*Current text (as it stands now):*
> track −1 (hidden: none)
*New text:*
> track −1 (hidden: none; a trod no segment, J396)

**955 (r).** Volume 13 — §2.3 `LensRule` default rows (the order) (edit). Target: `docs/volumes/V13-world.md`, line 1170 (md5 `e68af748…`) as it stands now. *Reason:* the lens order gains the ninth.
*Current text (as it stands now):*
> religion 4 · prosperity 5 · alignment 5 |
*New text:*
> religion 4 · prosperity 5 · alignment 5 · trods 6 (the ninth, outside J384 (8)'s eight; file w item 955) |

**955 (s).** Volume 13 — §2.3 `LensRule` default rows (the collisions) (edit). Target: `docs/volumes/V13-world.md`, line 1174 (md5 `e68af748…`) as it stands now. *Reason:* three collision rows.
*Current text (as it stands now):*
> monster threat · gate · toll · besieged · prosperity · temperament · alignment (V13 §5.8 (6))
*New text:*
> monster threat · gate · toll · besieged · prosperity · temperament · alignment · hidden · trod · junction (V13 §5.8 (6))

**955 (t).** Volume 13 — §2.5 Identity (insertion after the approach road's row) (insertion). Target: `docs/volumes/V13-world.md`, line 1260 (md5 `e68af748…`) as it stands now. *Reason:* the creation keys.
*Current text (as it stands now):*
> | an approach road (a `WorldRoute` of origin `approach`, V13 §3.8 (12)) | the world root | (`route`, the site placement's lineage, `approach`) — so a re-lay keeps its id and a moved site keeps its road's address |
*New text:*
> | an approach road (a `WorldRoute` of origin `approach`, V13 §3.8 (12)) | the world root | (`route`, the site placement's lineage, `approach`) — so a re-lay keeps its id and a moved site keeps its road's address |
> | a `Trod` (W7 (13); file w item 955) | the world root | (`trod`, its two junctions' keys sorted) — so a re-lay keeps its id and the host's knowledge of its key survives a re-join |
> | a `TrodJunction` | the world root | (`junction`, the joined route's lineage and its station rounded to `junctionSpacingM`; or the seat placement's lineage and `seat`; or the joined trod's lineage and its vertex's station so rounded) — a re-join on the same route within `edgeBandM` keeps the key by the anchor below |

**955 (u).** Volume 13 — §2.5 Identity (the anchors sentence) (edit). Target: `docs/volumes/V13-world.md`, line 1276 (md5 `e68af748…`) as it stands now. *Reason:* the anchors.
*Current text (as it stands now):*
> an approach road by its site; a sway by its seat.
*New text:*
> an approach road by its site; a trod by overlap ≥ 50 % of its course within one fine cell's width, a junction by its trod and which end it is; a sway by its seat.

**955 (v).** Volume 13 — §2.6 The lifecycle (insertion after the approach road's row) (insertion). Target: `docs/volumes/V13-world.md`, line 1306 (md5 `e68af748…`) as it stands now. *Reason:* the lifecycle row.
*Current text (as it stands now):*
> | an approach road (`WorldRoute` of origin `approach`; J393) | W7 (12) for a site placement whose road access is `required` or `preferred` (V13 §3.8 (12)) | the `route` layer, `roadsAt`, the charters' `roads`, the view, the exports, `derivedTime`; on a host-bound world the DM's `mapFeed` keyless — never `existingRoute`, W6b's `connectivity`, V14's siting plug-ins, the site coherence tests or the patrols, and never the canon, `routeFacts`, `patrolOffer` or `routes(world)`'s host list | entities block, each re-lay that changes its course bumping `layVersion` | re-derived by W7 (12) (a re-lay yielding the same course writes nothing); tombstoned when its site is unplaced or adopted, its road access becomes `none` or `avoided`, or a public route laid later meets the site's frame | with its site's placement edit (a derived product) | absent: W7 (12) at load; **veil:** its `knownTo` its site card's — a DM-only site's road DM-only |
*New text:*
> | an approach road (`WorldRoute` of origin `approach`; J393) | W7 (12) for a site placement whose road access is `required` or `preferred` (V13 §3.8 (12)) | the `route` layer, `roadsAt`, the charters' `roads`, the view, the exports, `derivedTime`; on a host-bound world the DM's `mapFeed` keyless — never `existingRoute`, W6b's `connectivity`, V14's siting plug-ins, the site coherence tests or the patrols, and never the canon, `routeFacts`, `patrolOffer` or `routes(world)`'s host list | entities block, each re-lay that changes its course bumping `layVersion` | re-derived by W7 (12) (a re-lay yielding the same course writes nothing); tombstoned when its site is unplaced or adopted, its road access becomes `none` or `avoided`, or a public route laid later meets the site's frame | with its site's placement edit (a derived product) | absent: W7 (12) at load; **veil:** its `knownTo` its site card's — a DM-only site's road DM-only |
> | a `Trod` with its `TrodJunction`s (W7 (13); file w item 955) | W7 (13) on both worlds after the approaches; re-joined by a route's re-lay or removal under a junction, split by a route laid across it | the `trods` layer, the canon's trods slot, `mapFeed` (in the audience its secret state admits), `placeOf`, the trods lens, V14's E1, the exports under the admission, `derivedTime`; never `existingRoute`, `connectivity`, the siting plug-ins, the coherence tests, the charters' `roads`, `roadsAt`, continuity, the patrols or the border posts | entities block, each re-lay that changes its course bumping `layVersion`; its `secret` state an edited attribute (§7.2) | re-derived by W7 (13) (a re-lay yielding the same course writes nothing); its `secret` state survives every re-derivation; tombstoned where no route lies within `edgeBandM` of a junction after a removal | the replaced scope; a `setAttr` on its secret state with its edit | absent: W7 (13) at load (the `WORLD-18` fallback); **import:** none (an imported world's trods are laid as its own); **dark-after-lit:** a host that stops reading canons keeps its last trods slot; **death:** a seat's death moves no trod (its junction on the seat's margin stays); **veil:** `secret` at birth — absent from every party picture, listing, count, name and export until revealed or discovered; a knowledge event the host resolves DM-only draws its mark for the DM alone |

**955 (w).** Volume 13 — §2.7 The version table (edit). Target: `docs/volumes/V13-world.md`, line 1325 (md5 `e68af748…`) as it stands now. *Reason:* the canon's versions.
*Current text (as it stands now):*
> and the water and sites slots' input hashes; a slot whose
*New text:*
> and the water, sites and trods slots' input hashes (the trods slot's over the routes' lays in force as well, W7 (13)); a slot whose

**955 (x).** Volume 13 — §2.7 The record budget (edit). Target: `docs/volumes/V13-world.md`, line 1353 (md5 `e68af748…`) as it stands now. *Reason:* the record budget's list.
*Current text (as it stands now):*
> routes, proposals, placements, resources, springs and the chunks:
*New text:*
> routes, trods (one per rough country's W7c run, a trod's own why computed on demand as a cell's is; file w item 955), proposals, placements, resources, springs and the chunks:

**955 (y).** Volume 13 — §2.7 Storage (the budget) (edit). Target: `docs/volumes/V13-world.md`, line 1360 (md5 `e68af748…`) as it stands now. *Reason:* the trods' share of the records.
*Current text (as it stands now):*
> plus ≤ 2 MB of records), a `realm` ≤ 11 MB
*New text:*
> plus ≤ 2 MB of records, the trods ≤ 0.5 MB of them, `WORLD-18`), a `realm` ≤ 11 MB

**955 (z).** Volume 13 — §2.7 Storage (the fallback) (edit). Target: `docs/volumes/V13-world.md`, line 1362 (md5 `e68af748…`) as it stands now. *Reason:* the pre-decided fallback extended to the trods.
*Current text (as it stands now):*
> the distance fields) are dropped from the file and rebuilt on load inside V13 §6's load budget.
*New text:*
> the distance fields) and, past `WORLD-18`, the trods (W7 (13) is deterministic over the persisted rasters and routes; their secret states are edits the log replays) are dropped from the file and rebuilt on load inside V13 §6's load budget.

**955 (aa).** Volume 13 — §3.0 the stage table (insertion after W7b) (insertion). Target: `docs/volumes/V13-world.md`, line 1445 (md5 `e68af748…`) as it stands now. *Reason:* the stage row.
*Current text (as it stands now):*
> | W7b Routes | `W7b` | the final seats (proposals, placements, host seats), the site placements with road access and their cards' kind rows (W7 (12); J393), the surfaces, `dem`, `biome`, the reaches, the cost law | `WorldRoute`s (the approach roads among them), the `routes` layer | none | the world root | F-WORLD (no path) | " |
*New text:*
> | W7b Routes | `W7b` | the final seats (proposals, placements, host seats), the site placements with road access and their cards' kind rows (W7 (12); J393), the surfaces, `dem`, `biome`, the reaches, the cost law | `WorldRoute`s (the approach roads among them), the `routes` layer | none | the world root | F-WORLD (no path) | " |
> | W7c Trods | `W7c` | the public routes with their lay in force (never an approach road or a water leg), `landUse`, `dem`, the placed frames' extents and margins, the cost law (W7 (13); file w item 955) | `Trod`s and `TrodJunction`s, the `trods` layer | none (`world.trods` reserved; the pairs ranked and the ties broken by sorted lineage keys and cell index) | the world root | F-WORLD (sparse trods) | " |

**955 (ab).** Volume 13 — §3.8 W7 (insertion of item (13) after (12)'s last line) (insertion). Target: `docs/volumes/V13-world.md`, line 1873 (md5 `e68af748…`) as it stands now. *Reason:* the generation step: inputs, the density rule, the lay, the record, the readers, the lifecycle.
*Current text (as it stands now):*
>    the DM's `mapFeed` keyless (V13 §3.11.6; J-V13.110).
*New text:*
>    the DM's `mapFeed` keyless (V13 §3.11.6; J-V13.110).
> 13. **Trods (the hidden ways; the owner's rule of 2026-10-18, file w item 955).** The brigands' roads: "hidden roads
>    that connect between roads, and multiple of them". Run after (12) on both worlds — after W7b's trails and approaches on a
>    standalone world; after the genesis and after each `network` window that lays, re-lays or removes a route on a host-bound
>    world — and as a local operator of a route's re-lay or removal under a junction (its dirty box). It reads the `landUse`
>    and `dem` rasters, the public routes with their lay in force (never an approach road, never a water leg; on a host-bound
>    world only a route with a host key), the placed frames' extents and margins and the cost law, and draws nothing
>    (`world.trods` reserved, V13 §3.17). (a) **Rough country.** A fine cell is *rough* where its `landUse` is a cover class
>    of `world.trods.cover` (forest, wetland, alpine) or its slope % ≥ `roughSlopePct` (the owner's hills); the rough cells'
>    8-connected components (one flood, cell-index order) of area ≥ `minRoughKm2` are the *rough countries*; every other land
>    cell is open plain. (b) **Junction candidates** per country: on every public route, the polyline vertices within
>    `edgeBandM` of the country's cells, thinned to one per `junctionSpacingM` of station along the route (the lowest station
>    kept); for every seat whose placed frame's margin ring, or seat cell, lies within `seatReachM` of the country, the ring's
>    point nearest the country — outside the extent + margin, so a trod never enters a placed frame and no charter changes
>    (the seat's "gate" at world scale; its gate station is frame geometry behind door 1). (c) **The target** is `perKm2`
>    (the rung's cell) × the country's area, clamped to [`minPerCountry`, `maxPerCountry`]. (d) **The lay.** Candidate pairs
>    in four tiers — two candidates on different routes; a route's and a seat's; two on one route ≥ `minSpanM` apart by
>    station; a candidate and a laid trod's vertex (a junction of kind `trod`) — each tier ranked by the pair's straight cost
>    ascending, ties by the sorted lineage keys; each pair in turn one A\* as (4)'s (the lifted bucket queue, the heuristic,
>    the tie rule) over the **trod cost surface**: (2)'s step cost under the cost law's time terms, × `openFactor` on an open
>    cell, a route cell impassable save the pair's own junction cells, every placed frame's extent + margin impassable, a
>    water cell impassable on land (a reach ≥ `riverMinM3s` crossed at `riverCrossing` as a route's), within the ellipse at
>    the trod's own `maxCostFactor`; a path is dropped where it exceeds that factor, where its rough share < `coverShare`,
>    where any open run exceeds `openRunMaxM` (none across open plain), or where it comes within `spacingM` of a laid trod's
>    cells save at a junction; a laid path takes the country's next pair until the target is met or the candidates are
>    spent, and a country left under `minPerCountry` is reported `W_TROD_SPARSE` (the country and its count; never a trod
>    across open plain to make the count). (e) **The record.** A `Trod` with its two `TrodJunction`s (on a route: the route,
>    its lay version and the fraction of its land effort from its `a` end; on a seat: the placement; on a trod: the trod and
>    the vertex), the polyline the cell centres simplified at `routeToleranceM` and never crossing a water cell, its integer
>    fields evaluated as (7) says (the stations and `vertexClass` under the host's class table and time terms; no trod factor
>    of the map's — the host prices a trod under its own law, slower than a road; its snow weeks the 52-week set, a slowing
>    and never a cut), its `form` by `world.trods`' form rule over its mean slope and dominant class, `secret` `dmOnly` and
>    `knownTo` `secret` at birth, its cells entering the `trods` layer and never the `route` layer, and one reason per
>    country in (6)'s form (the country's area and cover, the target, each pair's tier and the three largest cost
>    contributions of each path; `whyTrod` answers per trod on demand, as `whyCell` does per cell). A re-lay yielding the
>    same course writes nothing. (f) **A trod is no route and no road.** It is read by the `trods` layer, the canon's trods
>    slot (V13 §3.11.6), `mapFeed` in the audience its secret state admits, `placeOf` (the `trod` and `junction` places), the
>    view, the exports under the admission, V14's E1 crop and `derivedTime`; never by (2)'s `existingRoute`, W6b's
>    `connectivity`, V14's siting plug-ins, the site coherence tests, the charters' `roads`, `roadsAt`, W8b (9)'s continuity,
>    (14)'s patrols (no cadence, no `patrolOffer` row; J396) or (16)'s border posts. (g) **Lifecycle.** On a host-bound world
>    a trod is the map's own geography over the host network's laid courses: never a host edge, never promoted to a route by
>    the map, never born where a road dies — a host route the host demotes to `hidden` or abandons keeps its `WorldRoute`,
>    its DM-only ghost and its junctions, and nothing turns it into a trod (J-V13.123). A route re-laid under a junction (a
>    `bypass` or a `chartered` course, (9)) or removed re-joins the trod at the nearest point of the lay in force within
>    `edgeBandM` (its id kept by the anchor, V13 §2.5), else tombstones it; a route laid across a trod splits it at the
>    crossing into two trods ending at a new junction; on a host-bound world each takes effect in the canon at the canonize
>    that adopts the lay (V13 §3.11.6). The DM edits a trod's secret state only (`setAttr trod/secret/state`, V14 §4.2's
>    form); its course moves only as (10) says. Knowledge of a trod is the host's: a town knows a trod by the host's dated
>    event (the knowing seat, the trod's key, the host's how-word as `cause`, the week, its resolved audience) through the
>    events window, retracted by the windowed replace; the party by the trod's secret state; the map draws and never decides
>    (V13 §5.9 (9)).

**955 (ac).** Volume 13 — §3.8 W7 *Output* (edit). Target: `docs/volumes/V13-world.md`, line 1875 (md5 `e68af748…`) as it stands now. *Reason:* W7's output line.
*Current text (as it stands now):*
> *Output:* `WorldRoute`s (the approach roads among them) and the `route` layer;
*New text:*
> *Output:* `WorldRoute`s (the approach roads among them) and the `route` layer, (13)'s `Trod`s and `TrodJunction`s and the `trods` layer;

**955 (ad).** Volume 13 — §3.9 W8b (14) Patrols (edit). Target: `docs/volumes/V13-world.md`, line 2065 (md5 `e68af748…`) as it stands now. *Reason:* patrols: option B.
*Current text (as it stands now):*
> a road the host grades hidden: none). Elsewhere
*New text:*
> a road the host grades hidden: none; a trod, W7 (13), is no segment and carries none, J396 — a watch the host asserts on a trod is the trods lens's to draw, V13 §5.9 (9)). Elsewhere

**955 (ae).** Volume 13 — §3.9 W8b (16) Border posts (edit). Target: `docs/volumes/V13-world.md`, line 2089 (md5 `e68af748…`) as it stands now. *Reason:* no border post on a trod.
*Current text (as it stands now):*
> every route crossing of an allegiance border or a debatable band yields a
*New text:*
> every route crossing (never a trod's, W7 (13)) of an allegiance border or a debatable band yields a

**955 (af).** Volume 13 — §3.11.6 the simulator feed (`canon`) (edit). Target: `docs/volumes/V13-world.md`, line 2444 (md5 `e68af748…`) as it stands now. *Reason:* the fourth slot in the canon's statement.
*Current text (as it stands now):*
> (V13 §3.9 (1)–(4)); the **water slot** —
*New text:*
> (V13 §3.9 (1)–(4)); the **trods slot** — the hidden ways W7 (13) lays over the physical layers and the routes' lays in force (file w item 955): per trod its key, its form word, its two junction keys, its course, its ordered ground runs (the host's terrain class through the adapter folder's table and integer effort-metres per run under its cost law's time terms), its length, effort and snow weeks; per junction its point and what it lies on — a host edge with the fraction of its land effort from the key's first seat, a seat, or another trod — the map's geography alone, who knows a trod never here (law (3)); the **water slot** —

**955 (ag).** Volume 13 — §3.11.6 the additive canon (edit). Target: `docs/volumes/V13-world.md`, line 2461 (md5 `e68af748…`) as it stands now. *Reason:* what the additive canon does to the slot.
*Current text (as it stands now):*
> and costs of the seat territories W8a re-derives over the landmass they dirty, and the water slot's candidates on
*New text:*
> and costs of the seat territories W8a re-derives over the landmass they dirty, the trods slot's rows the added seats' new edges touch (a trod a new edge crosses split at the crossing, one it joins re-joined, every other trod byte-identical; W7 (13)), and the water slot's candidates on

**955 (ah).** Volume 13 — §3.11.6 the map feed (`mapFeed`) (edit). Target: `docs/volumes/V13-world.md`, line 2503 (md5 `e68af748…`) as it stands now. *Reason:* the map feed carries the trods by audience.
*Current text (as it stands now):*
> approach roads to world sites keyless, each in the audience its site card's knowledge admits (V13 §3.8 (12); drawn by the host's map surface only by its own choice, H31),
*New text:*
> approach roads to world sites keyless, each in the audience its site card's knowledge admits (V13 §3.8 (12); drawn by the host's map surface only by its own choice, H31), the trods with their junctions by their canon keys, each in the audience its secret state admits — never a trod the audience does not know (W7 (13)) —,

**955 (ai).** Volume 13 — §3.11.6 the map feed (`placeOf`) (edit). Target: `docs/volumes/V13-world.md`, line 2519 (md5 `e68af748…`) as it stands now. *Reason:* placeOf names a trod only where admitted.
*Current text (as it stands now):*
>   words for a `WorldWhere`.
*New text:*
>   words for a `WorldWhere` (a `trod` or `junction` place named as such for the DM and for an audience whose places admit the trod, else by the country it crosses — its rough country, the nearest route and seat —, so a hearing on a trod the party does not know names no trod; W7 (13)).

**955 (aj).** Volume 13 — §3.11.6 presentation inputs (`hostOverlay`) (edit). Target: `docs/volumes/V13-world.md`, line 2558 (md5 `e68af748…`) as it stands now. *Reason:* the host's movers on trods ride its presentation overlay.
*Current text (as it stands now):*
> (movers on host edges by fraction and embattlement phases, projected by the host
*New text:*
> (movers on host edges, or on trods by their canon keys (W7 (13)), by fraction and embattlement phases, projected by the host

**955 (ak).** Volume 13 — §3.11.6 the port's laws (1) (edit). Target: `docs/volumes/V13-world.md`, line 2577 (md5 `e68af748…`) as it stands now. *Reason:* law (1) widened by one clause.
*Current text (as it stands now):*
> of the physical layers, the host's cost law and the member seats, and no lived host fact enters them;
*New text:*
> of the physical layers, the host's cost law and the member seats — the trods slot reading the routes' laid courses in force as well, their geometry alone, never a grade, a closure or a knowledge (W7 (13); file w item 955) — and no lived host fact enters them;

**955 (al).** Volume 13 — §3.11.6 the port's laws (9) (edit). Target: `docs/volumes/V13-world.md`, line 2592 (md5 `e68af748…`) as it stands now. *Reason:* law (9): the words.
*Current text (as it stands now):*
> the water-passage class of a path (V13 §3.13's `routeClass`) is never sent
*New text:*
> a hidden way is a **trod** (never a *way*, the frame's street skeleton, nor a *path*, *track* or *trail*, way and route classes), its ends **junctions** (on the world: where a trod or the map's approach road meets a route, a seat's margin or a trod), its width hint its **form** word, and *hidden* stays the host's road grade only (file w item 955); the water-passage class of a path (V13 §3.13's `routeClass`) is never sent

**955 (am).** Volume 13 — §3.14.3 the drift rows (row 13, the consumers cell) (edit). Target: `docs/volumes/V13-world.md`, line 2822 (md5 `e68af748…`) as it stands now. *Reason:* cascade row 13: the consumers.
*Current text (as it stands now):*
> W7 (12)'s approach roads that joined the route (J393) |
*New text:*
> W7 (12)'s approach roads that joined the route (J393), W7 (13)'s trods whose junction lies on it |

**955 (an).** Volume 13 — §3.14.3 the drift rows (row 13, the test cell) (edit). Target: `docs/volumes/V13-world.md`, line 2822 (md5 `e68af748…`) as it stands now. *Reason:* cascade row 13: the test.
*Current text (as it stands now):*
> re-joins the nearest qualifying public route or its site's approach reads none (`noRoadAccess` where its road access is `required`) |
*New text:*
> re-joins the nearest qualifying public route or its site's approach reads none (`noRoadAccess` where its road access is `required`); every trod whose junction lay on a removed or re-laid route re-joins the lay in force within `edgeBandM` or is tombstoned, its secret state kept where it survives (W7 (13)) |

**955 (ao).** Volume 13 — §3.16 F-WORLD (the detection cell) (edit). Target: `docs/volumes/V13-world.md`, line 2914 (md5 `e68af748…`) as it stands now. *Reason:* the ladder: detection.
*Current text (as it stands now):*
> **seat:** a W8a seed on water or ice |
*New text:*
> **seat:** a W8a seed on water or ice; **sparse trods:** W7c meets fewer than `minPerCountry` pairs for a rough country, or every path fails `coverShare` or `openRunMaxM` (W7 (13)) |

**955 (ap).** Volume 13 — §3.16 F-WORLD (the ladder cell) (edit). Target: `docs/volumes/V13-world.md`, line 2914 (md5 `e68af748…`) as it stands now. *Reason:* the ladder: the rung.
*Current text (as it stands now):*
> seat: the seed moved to its nearest land cell (`W_POLITY_SEAT_MOVED`) |
*New text:*
> seat: the seed moved to its nearest land cell (`W_POLITY_SEAT_MOVED`); sparse trods: the country keeps what was laid, reported `W_TROD_SPARSE` — never a trod across open plain to make the count |

**955 (aq).** Volume 13 — §3.16 F-WORLD (the test cell) (edit). Target: `docs/volumes/V13-world.md`, line 2914 (md5 `e68af748…`) as it stands now. *Reason:* the ladder: its test.
*Current text (as it stands now):*
> T-V13-14 (siting none, no path, seat) over the corpus of V13 §7 |
*New text:*
> T-V13-14 (siting none, no path, seat), T-V13-59 (sparse trods) over the corpus of V13 §7 |

**955 (ar).** Volume 13 — §3.17 Determinism (the concerns) (edit). Target: `docs/volumes/V13-world.md`, line 2929 (md5 `e68af748…`) as it stands now. *Reason:* the reserved concern.
*Current text (as it stands now):*
> (reserved: siting draws nothing, its tie-break deterministic, V13 §3.7 (6); SW-03), the base's `water.delta` (W4's distributary shares, keyed by
*New text:*
> (reserved: siting draws nothing, its tie-break deterministic, V13 §3.7 (6); SW-03), `world.trods` (reserved: W7c draws nothing, its pairs ranked and its ties broken by sorted lineage keys and cell index, W7 (13)), the base's `water.delta` (W4's distributary shares, keyed by

**955 (as).** Volume 13 — §3.17 Determinism (the work limits) (edit). Target: `docs/volumes/V13-world.md`, line 2944 (md5 `e68af748…`) as it stands now. *Reason:* the work limit.
*Current text (as it stands now):*
> W7a, W7b ≤ Σ over edges of the search ellipse's cells; W8a ≤
*New text:*
> W7a, W7b ≤ Σ over edges of the search ellipse's cells; W7c ≤ 2 × fine cells (the rough flood) + Σ over the pairs tried of the search ellipse's cells at `world.trods.maxCostFactor`; W8a ≤

**955 (at).** Volume 13 — §3.17 Determinism (the cut) (edit). Target: `docs/volumes/V13-world.md`, line 2947 (md5 `e68af748…`) as it stands now. *Reason:* the work cut.
*Current text (as it stands now):*
> W7 drops the remaining lowest-rank edges, W8 stops
*New text:*
> W7 drops the remaining lowest-rank edges (W7c the remaining pairs of the smallest countries, each reported `W_TROD_SPARSE`), W8 stops

**955 (au).** Volume 13 — §5.1 the layer table (insertion after the `patrols` row) (insertion). Target: `docs/volumes/V13-world.md`, line 3148 (md5 `e68af748…`) as it stands now. *Reason:* the structural layer.
*Current text (as it stands now):*
> | `patrols` (a toggle) | vector | `PatrolCadence` per route segment at the revision in force at the view's `lensWeek`: tinted by cadence (weekly, monthly, seasonal), both colours striped on a debatable segment, no arrows or headings; a covert power's DM-only | the powers' colours |
*New text:*
> | `patrols` (a toggle) | vector | `PatrolCadence` per route segment at the revision in force at the view's `lensWeek`: tinted by cadence (weekly, monthly, seasonal), both colours striped on a debatable segment, no arrows or headings; a covert power's DM-only | the powers' colours |
> | `trods` | vector | every `Trod` the view's audience admits (V14 §2.3's admission over its `knownTo` and the party's `places`: the DM every trod, a party only a revealed or discovered one) in its form's style, its junction ticks on the route; for the DM the second cue beside colour — `dmOnly` an eye-slash at the junctions, `revealed` open ticks, `discovered` filled; no km label (a trod's length is its card's); the trods lens's marks over it (V13 §5.9 (9); file w item 955) | narrow 0.4 px dotted, drove 0.6 px dash-dot, broad 0.8 px dashed, in the secret colour role; the ticks 3 px |

**955 (av).** Volume 13 — §5.4 Exports (`ecosystemGeoJson`) (edit). Target: `docs/volumes/V13-world.md`, line 3209 (md5 `e68af748…`) as it stands now. *Reason:* the GeoJSON export.
*Current text (as it stands now):*
> routes (LineString with class or grade), springs (Point), traces (kind `trace`)
*New text:*
> routes (LineString with class or grade), trods (LineString, kind `trod`, with its form and its junctions' keys — under the export's admission: a party export carries none its places do not admit; file w item 955), springs (Point), traces (kind `trace`)

**955 (aw).** Volume 13 — §5.4 Exports (`worldCsv`) (edit). Target: `docs/volumes/V13-world.md`, line 3211 (md5 `e68af748…`) as it stands now. *Reason:* the CSV export.
*Current text (as it stands now):*
> sways (id, seat, allegiance, status, revision), routes, settlements
*New text:*
> sways (id, seat, allegiance, status, revision), routes, trods and junctions (under the export's admission), settlements

**955 (ax).** Volume 13 — §5.8 (6) The legend's words (edit). Target: `docs/volumes/V13-world.md`, line 3317 (md5 `e68af748…`) as it stands now. *Reason:* the collision rows in words.
*Current text (as it stands now):*
> the host's monster-threat word for a place and its colour are never the plague lens's; *gate* is
*New text:*
> the host's monster-threat word for a place and its colour are never the plague lens's; *hidden* is the host's road grade only (a lens is *still*, a site's or a trod's secret *DM-only*), a hidden way a *trod* (never a *way*, the frame's, nor a *path*), its end a *junction*; *gate* is

**955 (ay).** Volume 13 — §5.8 (7) The audience filter (edit). Target: `docs/volumes/V13-world.md`, line 3324 (md5 `e68af748…`) as it stands now. *Reason:* the audience filter.
*Current text (as it stands now):*
> the host sends with no resolved audience is folded DM-only; covert links, columns and patrols fail closed — omitted,
*New text:*
> the host sends with no resolved audience is folded DM-only; covert links, columns, patrols, the movers on trods and a trod no reveal admits (the admission function over its secret state, W7 (13)) fail closed — omitted,

**955 (az).** Volume 13 — §5.9 The lenses (the intro) (edit). Target: `docs/volumes/V13-world.md`, line 3358 (md5 `e68af748…`) as it stands now. *Reason:* the lenses' intro names the ninth.
*Current text (as it stands now):*
> Three further lenses — culture, danger and calamity — are recorded, not built:
*New text:*
> A ninth lens, the trods lens (9), is built on the owner's rule of 2026-10-18, outside J384 (8)'s eight and last in order (file w item 955). Three further lenses — culture, danger and calamity — are recorded, not built:

**955 (ba).** Volume 13 — §5.9 The lenses (insertion after the alignment lens's last two lines, quoted together because its last line alone also closes the prosperity lens) (insertion). Target: `docs/volumes/V13-world.md`, line 3571 (md5 `e68af748…`) as it stands now. *Reason:* the ninth lens as a row set of the one mechanism.
*Current text (as it stands now):*
> route's intermediary settlements (as the patrols lens's: no verdict per settlement is sent); the town grain (a
> town-map row: the settlement frame's).
*New text:*
> route's intermediary settlements (as the patrols lens's: no verdict per settlement is sent); the town grain (a
> town-map row: the settlement frame's).
> 
> **9. Trods** (the owner's rule of 2026-10-18 on the brigands' ways; file w item 955; the ninth, outside J384 (8)'s eight, last in order). Its layer is V13 §5.1's `trods`; it draws the host's facts over the map's own hidden ways (W7 (13)): which town knows a trod, who watches it, who is on it and what happened there. *Regimes:* **known** (the host's bodies lane lit and its trod-knowledge events sent: "towns know trods by the host's ledger"), **revealed** (no knowledge sent — the lane dark, or a standalone world: "no town's knowledge is sent: a trod shows to the party only as the DM reveals it"), **still** (no route laid, or no seed: "no road is laid, so no trod meets one"). The regime never reads how many trods are laid, known or revealed: a word computed from a count would tell a player whether any exist. *Notes (each a `world.lens` row under its gate):* "patrols ride no trod; a trod is watched only where the host says so" (every regime; J396); "the host chooses who takes a trod by its stance; the map draws a mover only where the host places it" (the bodies lane lit); "a closure stops the road, not the trod: the host's law" (the host's closure sent as a stored fact — a gate that never holds until the host's quarantine verb exists, V13 §5.9 (1)'s refusal standing).
> 
> | element | reads | drawn | class | regime | audience | scrub |
> |---|---|---|---|---|---|---|
> | trod | `Trod` (the layer's line), `TrodJunction` | the line in its form's style with its junction ticks; the DM every trod with V14 §2.3's second cue | P (the map's geometry; the canon's trods slot) | every | the DM; a party only a revealed or discovered trod (the admission over its secret state and the party's `places`) | lay versions |
> | known to | the trod-knowledge events (the knowing seat in `seats`, the trod in `where`, the host's how-word in `cause`, the week) | the knowing seat's pip in its allegiance colour at the trod's midpoint, captioned "known to ⟨seat⟩ since week n" with the how-word | S, placed | known | DM; a row the host resolves public draws the mark — and with it the trod's line — for the party | host-dated |
> | watched | `roadWatch` rows naming a trod (`closed`, `warden`) | the watcher's colour on the trod, legend "watched: the host's word" | S | when sent | DM | host-dated |
> | on the trod | `hostOverlay` movers on a trod by fraction | a moving marker at the host's fraction along the trod's laid line (the named traveller's grammar, V13 §5.9 (5)) | S, placed | when sent | DM-only by default; a covert mover omitted, never greyed | the view's week (a presentation input) |
> | at the junction, on the trod | `WorldEvent`s whose `where` is a `trod` or `junction` place | the `events` layer's pin, tagged with this lens | S | every | the host's resolution; a party that does not know the trod reads the pin at its point by the country it crosses, never the trod (`placeOf`) | host-dated |
> | width hint | `Trod.form` and its `widthM` | the form word on the trod's card ("a drover's trod, about 3 m") | P | every | follows its trod | — |
> 
> *Legend:* the banner; then one fixed sentence in every regime and for every audience — "Trods show where a town is known to use one or the DM has revealed one; others may exist." — true whatever the count; the notes above under their gates. *Refusals:* an unknown trod drawn, listed, counted, named or exported for a party; a count of trods — laid, known or revealed — on any party-facing surface, the regime words, the picker and the screen-reader summary included; a mover's course guessed (motion without a host clock) or a mover drawn on a trod the host did not name; an ambush, a sortie, a choke point or a danger at a junction the host did not send (the host's ambush rule is topological; the map draws the junction, never the verdict); a line of sight presented as the host's; a patrol cadence on a trod or a `patrolOffer` row for one; a trod drawn carrying, slowing or bypassing a plague, or a quarantine line (the plague lens's refusal stands until the host sends a closure as a stored fact); the host's capacity band drawn from the map's width hint (the host derives it); a trod drawn as a road promoted, or a decayed road drawn as a trod. Its why: `lensWhy` per mark gives the host row (its kind, how-word, week and audience) and the rule; for a party a revealed trod answers "revealed by the DM, week n" and nothing of its neighbours.

**955 (bb).** Volume 13 — §6 the one-click path (insertion after the W7a + W7b row) (insertion). Target: `docs/volumes/V13-world.md`, line 3591 (md5 `e68af748…`) as it stands now. *Reason:* the budget row.
*Current text (as it stands now):*
> | W7a + W7b | Σ over edges of the search ellipse's cells (A\*, V13 §3.8; C13-36) | 60 ms | 200 ms | 520 ms | ≤ 8 ns × Σ ellipse cells over edges (an edge's ellipse ≈ 2.4 × the pair's straight cost² ÷ the cell area at `maxCostFactor` 6; 300 edges at the continent rung ≈ 6 × 10⁷ cells) |
*New text:*
> | W7a + W7b | Σ over edges of the search ellipse's cells (A\*, V13 §3.8; C13-36) | 60 ms | 200 ms | 520 ms | ≤ 8 ns × Σ ellipse cells over edges (an edge's ellipse ≈ 2.4 × the pair's straight cost² ÷ the cell area at `maxCostFactor` 6; 300 edges at the continent rung ≈ 6 × 10⁷ cells) |
> | W7c | fine cells (the rough flood) + Σ over the pairs tried of the search ellipse's cells (W7 (13); file w item 955) | 25 ms | 50 ms | 100 ms | ≤ 10 ns × fine cells + 8 ns × Σ ellipse cells over pairs (a trod's ellipse ≈ 2.4 × its pair's straight cost² ÷ the cell area at `world.trods.maxCostFactor` 3 — a quarter of a route's; 2 000 trods of 10 km at the province rung ≈ 2 × 10⁶ cells) |

**955 (bc).** Volume 13 — §6 the one-click path (the total row) (edit). Target: `docs/volumes/V13-world.md`, line 3594 (md5 `e68af748…`) as it stands now. *Reason:* the totals re-added, inside the re-declared budgets.
*Current text (as it stands now):*
> | **total** | | **730 ms** (budget 600: **over** — the province row's budget is re-declared at 900 ms, V13 §2.3's cell is data) | **2 900 ms** (budget 1 800: **over** — re-declared at 3 000 ms) | **6 700 ms** (budget 4 500: **over** — re-declared at 7 000 ms) | |
*New text:*
> | **total** | | **755 ms** (budget 600: **over** — the province row's budget is re-declared at 900 ms, V13 §2.3's cell is data; 730 before W7c, file w item 955) | **2 950 ms** (budget 1 800: **over** — re-declared at 3 000 ms; 2 900 before W7c) | **6 800 ms** (budget 4 500: **over** — re-declared at 7 000 ms; 6 700 before W7c) | |

**955 (bd).** Volume 13 — §6 The budget register (edit). Target: `docs/volumes/V13-world.md`, line 3656 (md5 `e68af748…`) as it stands now. *Reason:* the register row.
*Current text (as it stands now):*
> a whole landmass's approaches ≤ 0.1 × the W7a + W7b row (V13 §3.8 (12)). Each
*New text:*
> a whole landmass's approaches ≤ 0.1 × the W7a + W7b row (V13 §3.8 (12)); `WORLD-18` W7c inside its row above per rung, and the trods' records ≤ 0.5 MB gzipped at the continent rung inside the 2 MB records block (V13 §2.7; the rebuild-on-load fallback pre-decided; file w item 955). Each

**955 (be).** Volume 13 — §7.3 (insertion after T-V13-58) (insertion). Target: `docs/volumes/V13-world.md`, line 3720 (md5 `e68af748…`) as it stands now. *Reason:* the generation and canon test.
*Current text (as it stands now):*
> | T-V13-58 | a site's coherence (V13 §3.11.1; J393): every shipped kind row's coherence rows evaluated at a fixture point per row, met and unmet (each of V14's ten tests at its tolerance ± 1 cell, or ± 1 m on a line; a route-borne test counts no approach road); a tollhouse dropped 600 m off a road is unlawful, the dry run preselects the road point with `bend.site.placement` naming the row and the distance, `keep` places it at the asked point unlawful with `siteIncoherent`, `takeOffer` on the road; a hideout dropped 150 m from a road is bent beyond 300 m; a tollhouse 4 km from every road (beyond its 1 000 m `bendM`) is kept unlawful with the nearest lawful within 20 km offered and none preselected; a camp off every road and water is lawful at cost 1 with no anomaly; a fort with no height, pass or crossing is lawful at cost 4; a host-locked tollhouse off every road is neither bent nor offered and reads `siteIncoherent` DM-only; a road the mock host demotes to hidden under a placed tollhouse raises `siteIncoherent` at the next window and moves nothing; no bend or offer candidate lies on water or inside a placed frame's extent + margin; a drop with no point never lands on a point failing a row of cost 5; a kept unlawful drop replays from its event (`requestCharter`'s `accept: ['unlawful']`); the derived site anomalies, one fixture per cause — a `rerouteReach` moving the reach off a bridge fort's crossing, a host window hiding a tollhouse's road, a route chartered past a hideout, a W5 re-thinning taking a mine's ore — each read at the next read with nothing moved, the stored `coherenceCost` and the world's model digest byte-equal (T-V13-11's form); every bend, offer, approach road and anomaly writes its reason record (T-V13-10's chain); every search is bit-identical across two runs | the placement fixtures |
*New text:*
> | T-V13-58 | a site's coherence (V13 §3.11.1; J393): every shipped kind row's coherence rows evaluated at a fixture point per row, met and unmet (each of V14's ten tests at its tolerance ± 1 cell, or ± 1 m on a line; a route-borne test counts no approach road); a tollhouse dropped 600 m off a road is unlawful, the dry run preselects the road point with `bend.site.placement` naming the row and the distance, `keep` places it at the asked point unlawful with `siteIncoherent`, `takeOffer` on the road; a hideout dropped 150 m from a road is bent beyond 300 m; a tollhouse 4 km from every road (beyond its 1 000 m `bendM`) is kept unlawful with the nearest lawful within 20 km offered and none preselected; a camp off every road and water is lawful at cost 1 with no anomaly; a fort with no height, pass or crossing is lawful at cost 4; a host-locked tollhouse off every road is neither bent nor offered and reads `siteIncoherent` DM-only; a road the mock host demotes to hidden under a placed tollhouse raises `siteIncoherent` at the next window and moves nothing; no bend or offer candidate lies on water or inside a placed frame's extent + margin; a drop with no point never lands on a point failing a row of cost 5; a kept unlawful drop replays from its event (`requestCharter`'s `accept: ['unlawful']`); the derived site anomalies, one fixture per cause — a `rerouteReach` moving the reach off a bridge fort's crossing, a host window hiding a tollhouse's road, a route chartered past a hideout, a W5 re-thinning taking a mine's ore — each read at the next read with nothing moved, the stored `coherenceCost` and the world's model digest byte-equal (T-V13-11's form); every bend, offer, approach road and anomaly writes its reason record (T-V13-10's chain); every search is bit-identical across two runs | the placement fixtures |
> | T-V13-59 | trods (W7 (13); file w item 955): on B-WORLD-lite two runs are byte-identical and permuted route and seat inputs give the same trods (ties by sorted lineage keys); every trod ends at two junctions — on a public route at a point of its lay in force, on a seat's margin ring outside its extent + margin, or on another trod's vertex — and none at a seat cell, inside a placed frame, on an approach road or on a water leg; no trod crosses a water cell on land, crosses a route except at its junctions, has an open run over `openRunMaxM` or a rough share under `coverShare`, or lies within `spacingM` of another save at a junction; a province template with no rough country lays none and reports nothing, one with a country under `minPerCountry` reports `W_TROD_SPARSE` once per country; the count per country lies in [`minPerCountry`, `maxPerCountry`] and the province total within the `perKm2` arithmetic; a trod's `form` follows the form rule; its stations and `vertexClass` carry no trod factor; its cells are absent from the `route` layer, it earns no `existingRoute` discount for a later route, enters no W6b `connectivity` term, no siting plug-in, coherence test, charter `roads` row, `roadsAt` row, continuity, `PatrolCadence` or `patrolOffer` row, and yields no border-post proposal where it crosses a border; on the host-bound fixture the canon's trods slot is byte-identical across every sway revision, polity window, death and knowledge event, every row names the trod's key and integer runs in the host's class words with no float, prose or raster index, a junction on a host route names its edge key and fraction, a mock-host demotion of the route to `hidden` moves no trod and mints none, a `bypass` under a junction leaves the slot byte-identical until the mock host's `canonized` for that lay and then re-joins the trod with its key kept (`W_HOST_CANON_BEHIND` meanwhile), a route chartered across a trod splits it at the adopting canonize, the additive canon changes only the trods a new seat's edges touch, and `routeFacts`' ground runs for every host edge collapse exactly to the route's `vertexClass` and `stations` (item 956) and sum to its per-class effort; a world with the trods dropped from the file rebuilds them byte-identically on load with every revealed trod's state kept | the world fixtures; a mock host |

**955 (bf).** Volume 13 — §7.4 T-V13-42 (edit). Target: `docs/volumes/V13-world.md`, line 3737 (md5 `e68af748…`) as it stands now. *Reason:* T-V13-42 gains the trod clause.
*Current text (as it stands now):*
> a hidden road has none;
*New text:*
> a hidden road has none, a trod has none and no `patrolOffer` row (W7 (13));

**955 (bg).** Volume 13 — §7.4 (insertion after T-V13-56) (insertion). Target: `docs/volumes/V13-world.md`, line 3751 (md5 `e68af748…`) as it stands now. *Reason:* the audience and lens test.
*Current text (as it stands now):*
> | T-V13-56 | the trade lens's production and need (J380): every economy row's goods are keyed by the host's catalog key as its supply links key them — two labels the host keys alike draw as one good, each label kept on its card, a loosely read key marked — with the category and shippable flag the host sends, no flag derived from a category (a custom good the host sends shippable draws shippable); production, needs, exports, imports, services and food coverage draw under every regime, loads, arrivals, relations and still alike; a food good and a catalog service never draw moving (on a route, a mover or a shipment-styled link), while a service export the host ships as a good draws as a shippable good; a food coverage ring is filled to the share the host sent, kept at its surveyed share while a cut is in force, the cut marked by the stressor's word and never by the war's siege mark; a supply arrival captions the good its link names where the host sent one and guesses none where it did not; no criminal channel and none of the host's criminal income reaches a player picture; stocks, throughput (its inbound and outbound words) and the entrepôt heat draw in the loads regime only; relief and credit draw no link where the host names no giver | the trade fixtures |
*New text:*
> | T-V13-56 | the trade lens's production and need (J380): every economy row's goods are keyed by the host's catalog key as its supply links key them — two labels the host keys alike draw as one good, each label kept on its card, a loosely read key marked — with the category and shippable flag the host sends, no flag derived from a category (a custom good the host sends shippable draws shippable); production, needs, exports, imports, services and food coverage draw under every regime, loads, arrivals, relations and still alike; a food good and a catalog service never draw moving (on a route, a mover or a shipment-styled link), while a service export the host ships as a good draws as a shippable good; a food coverage ring is filled to the share the host sent, kept at its surveyed share while a cut is in force, the cut marked by the stressor's word and never by the war's siege mark; a supply arrival captions the good its link names where the host sent one and guesses none where it did not; no criminal channel and none of the host's criminal income reaches a player picture; stocks, throughput (its inbound and outbound words) and the entrepôt heat draw in the loads regime only; relief and credit draw no link where the host names no giver | the trade fixtures |
> | T-V13-60 | the trods' audience and lens (file w item 955): a trod at birth is absent from every party picture, listing, count, name, label, screen-reader summary, `mapFeed` party audience and player-audience export, and from `placeOf`'s words for a party (its hearing place reads as the country it crosses); the DM's picture draws every trod with its cue; two worlds that differ only in their unrevealed trods give byte-identical party pictures, legends, picker rows, still reasons, `lensWhy` answers, summaries and exports; a knowledge event draws the knowing seat's mark for the DM from its week and the trod's line for the party only where the host resolved it public, a retraction removes it, and an unresolved row is DM-only; the DM's `setAttr` to `revealed` draws the line for the party and `discovered` raises its `knownTo` to `local`; a mover the host places on a trod sits at its fraction, a covert one is omitted; a `roadWatch` row naming a trod draws the watch and no cadence; the regime reads known, revealed or still and never from a count; the legend sentence is identical whatever the count; every refusal of V13 §5.9 (9) asked as a draw returns `refuse.lens.invented` | the audience fixtures; a mock host |

**955 (bh).** Volume 13 — §7.5 The report codes (insertion after `W_SITE_NO_ROAD_ACCESS`) (insertion). Target: `docs/volumes/V13-world.md`, line 3766 (md5 `e68af748…`) as it stands now. *Reason:* the report code.
*Current text (as it stands now):*
> | `W_SITE_NO_ROAD_ACCESS` | warning | W7 (12) (J393) | the site, the nearest route of its kind's class and its distance |
*New text:*
> | `W_SITE_NO_ROAD_ACCESS` | warning | W7 (12) (J393) | the site, the nearest route of its kind's class and its distance |
> | `W_TROD_SPARSE` | warning | W7 (13) (file w item 955) | the rough country (its lowest-then-leftmost cell and area) and the trods laid, under `minPerCountry` |

**955 (bi).** Volume 13 — §8.2 Milestones (M-W2, the contents) (edit). Target: `docs/volumes/V13-world.md`, line 3814 (md5 `e68af748…`) as it stands now. *Reason:* M-W2 carries the layer.
*Current text (as it stands now):*
> W7 (12)'s approaches to world sites and P1's site form with its bend (J393); W8a and W8b
*New text:*
> W7 (12)'s approaches to world sites and P1's site form with its bend (J393); W7 (13)'s trods with their junctions, the `trods` layer, the canon's trods slot, the trod-knowledge event kind, the DM's reveal and the `roadWatch` trod rows (file w item 955; the milestone the host's bodies chain names); `routeFacts`' ground runs (item 956); W8a and W8b

**955 (bj).** Volume 13 — §8.2 Milestones (M-W2, the gate and estimate) (edit). Target: `docs/volumes/V13-world.md`, line 3814 (md5 `e68af748…`) as it stands now. *Reason:* M-W2 gate and price.
*Current text (as it stands now):*
> T-V13-14, 16, 17, 38, 39, 41 – 43, 46, 57, 58; the B-WORLD statistics bars | 8 pw (J393's site form,
*New text:*
> T-V13-14, 16, 17, 38, 39, 41 – 43, 46, 57, 58, 59; the B-WORLD statistics bars | 9 pw (the trods, their slot and the ground runs ≈ 1 pw, file w items 955 and 956; J393's site form,

**955 (bk).** Volume 13 — §8.2 Milestones (M-W5) (edit). Target: `docs/volumes/V13-world.md`, line 3816 (md5 `e68af748…`) as it stands now. *Reason:* M-W5 carries the lens.
*Current text (as it stands now):*
> prosperity and alignment (V13 §5.9) | T-V13-47 – T-V13-56 | 7 pw |
*New text:*
> prosperity and alignment; the trods lens, the ninth, last (V13 §5.9 (9); file w item 955) | T-V13-47 – T-V13-56, 60 | 7 pw (the trods lens step ≈ 0.5 pw: below the row's whole-week resolution, so the row holds) |

**955 (bl).** Volume 13 — §8.5 The host's parallel track (insertion after H31) (insertion). Target: `docs/volumes/V13-world.md`, line 3906 (md5 `e68af748…`) as it stands now. *Reason:* the host track row.
*Current text (as it stands now):*
> | H31 | after M-W3, after H19 (optional; J393) | its map surfaces draw the map feed's approach roads — the map's own roads to world sites, keyless — as presentation labelled "map road", read by no step of its simulation | M-W2; H19 |
*New text:*
> | H31 | after M-W3, after H19 (optional; J393) | its map surfaces draw the map feed's approach roads — the map's own roads to world sites, keyless — as presentation labelled "map road", read by no step of its simulation | M-W2; H19 |
> | H32 | with M-W2 (its slot reading and the events); with M-W5's trods step (its marks) | the trod asks (file w item 955; the row's number, never the kernel's `H32` hash): its builder over the canon reading the **trods slot** beside the travel, water and sites slots (an H5 sibling: each trod's key, form word, two junctions, course, ordered ground runs with integer effort, length and snow weeks; each junction's point and the host edge and fraction, seat or trod it lies on) and pricing a trod under its own law, slower than a road, its size band from the form word it registers — the map's words, one meaning each: *trod*, *junction*, *narrow*, *drove*, *broad*; never *way*, the settlement frame's, and never *hidden*, its own road grade —; its **trod-knowledge event** in the events window (H9): the knowing seat, the trod's key, its how-word (through the adapter folder's vocabulary table), the week and the resolved audience, retracted by the windowed replace; every engagement on a trod or at a junction with its `where` naming the trod (with the fraction) or the junction by their keys, or the country it crosses; its watches on a trod in the polity window's road-watch rows (H13); its movers on a trod in the presentation overlay (H17) by the trod's key and fraction; its reveal to the party writing the shared `party` key as a site's does (V14 §2.3); the ordered ground runs of `routeFacts` read for its army pace and, until this row's slot lands, for its own stand-in cover graph (item 956); nothing of the map's: no patrol coverage on a trod (J396), no capacity, no ambush verdict, no line of sight | M-W2; H5; H9; H12; H13; H17; M-W5 for the marks |

**955 (bm).** Volume 13 — §9 Decisions (insertion after J-V13.113) (insertion). Target: `docs/volumes/V13-world.md`, line 4028 (md5 `e68af748…`) as it stands now. *Reason:* the decision rows.
*Current text (as it stands now):*
> | J-V13.113 | **(J393.)** chose the approach road as **a road to the map's readers of roads and no road to its pricing and siting** — read by `roadsAt`, the charters, the crop, the view, the exports and `derivedTime`; never by `existingRoute`, W6b's `connectivity`, V14's siting plug-ins, the site coherence tests or the patrols — and **its `knownTo` its site card's**, over a road every reader counts, because a site's coherence and siting would otherwise turn on the order other sites were dropped (another site's track could make a placed hideout incoherent or zero a hermitage's `solitude`), a road to a site draws no settlement and carries no patrol, and the road to a DM-only site would draw for the players (item 133 (e)) (vetoable) |
*New text:*
> | J-V13.113 | **(J393.)** chose the approach road as **a road to the map's readers of roads and no road to its pricing and siting** — read by `roadsAt`, the charters, the crop, the view, the exports and `derivedTime`; never by `existingRoute`, W6b's `connectivity`, V14's siting plug-ins, the site coherence tests or the patrols — and **its `knownTo` its site card's**, over a road every reader counts, because a site's coherence and siting would otherwise turn on the order other sites were dropped (another site's track could make a placed hideout incoherent or zero a hermitage's `solitude`), a road to a site draws no settlement and carries no patrol, and the road to a DM-only site would draw for the players (item 133 (e)) (vetoable) |
> | J-V13.114 | **(file w item 955.)** chose **`trod`** for the owner's hidden way, with **`junction`** for its end and **`form`** (narrow, drove, broad) for its width hint, over the host's proposed *way* (the base's `WayClass` and `Way`, V13's glyph mark `way`, V14's way bands and J393's way to the gate: one token, two meanings at every ring a trod would meet), *trace* (the edit traces), *path*, *track* and *trail* (way and route classes), *byway* (free in the volumes but the sites-roads design B's rejected name for the approach road, and a minor public road in plain English) and *holloway* or *droveway* (physical forms, kept as the form words' senses), because *trod* has no use in the volumes, the base or the host's notes and names in plain English exactly a foot-worn path a body walks in file; *hidden* stays the host's grade of a demoted road, never the new layer's class (vetoable) |
> | J-V13.115 | **(file w item 955.)** chose a **record of its own** (`Trod` with two `TrodJunction`s) beside `WorldRoute`, over a seventh route class, an origin `trod` or a `WorldRoute` with two `join`s, because a trod has no host key, no seat end and no leg, every reader of routes (the discount, connectivity, siting, coherence, charters, `roadsAt`, continuity, patrols, border posts) must not count it, and W7 (11)'s law that a host route ends at two settlements stands untouched (vetoable) |
> | J-V13.116 | **(file w item 955.)** chose the trods as a **fourth canon slot** with its own input hash and version, law (1) widened by one clause (the slot reads the routes' laid courses in force, their geometry alone), over an optional simulator product beside `routeFacts` (the host asked for canon truth its builder reads, and knowledge, watches and movers ride the windows, never the slot) or junctions on the seat-territory crossings alone (pure functions already, but not on a road: the owner's "hidden roads that connect between roads") (vetoable) |
> | J-V13.117 | **(file w item 955.)** chose **junctions on the lay in force**, re-joined at the canonize that adopts a re-lay and tombstoned where no route lies within `edgeBandM`, over junctions on the genesis lay alone (a bypassed road's trods would ambush a course nobody travels) or live re-joins at each window (a lived host fact moving an adopted canon, against law (7)) (vetoable) |
> | J-V13.118 | **(file w item 955.)** chose the **density rule from the map's own rasters** — rough countries from `landUse` and slope, a target per km² of rough country per rung, candidate pairs across two routes first, a cover share and an open-run cap — over the host's cover graph between route junctions (the host never invents geography; its stand-in is its own until the slot lands), a count per route (the owner's "several per rough country, none across open plain" is per country) or a draw (W7c draws nothing) (vetoable) |
> | J-V13.119 | **(file w item 955.)** chose the **form word as the width hint** (three forms with nominal widths, own and calibratable; the host registers the words and derives its band) over a capacity on the record (no route carries one; the host asked for a derivable hint and keeps its band its own) or ground class alone (a goat path and a cart-wide hollow cross the same forest) (vetoable) |
> | J-V13.120 | **(file w item 956.)** chose the overt routes' **per-stretch ground classes as `routeFacts`' ordered runs**, a derived transient collapsed from the record's `stations` and `vertexClass`, over a new persisted field (the record has held the per-segment class since item 689; a second copy would be a cache) or leaving them to the map feed (which no step of the host's simulation reads), because the host's army pace and its stand-in cover graph read the simulator feed (vetoable) |
> | J-V13.121 | **(file w item 955.)** chose **knowledge the host's** — a dated trod-knowledge event in the events window with its resolved audience, drawn and never decided by the map, retracted by the windowed replace — and **the party's reveal V14 §2.3's `SecretState` unchanged** (`dmOnly` at birth; the DM seeing every trod with its cue, as a DM-only site), over a known flag on the record the host writes (the map storing a host state as its own fact), a map rule for who knows (an invented fact), a fourth knowledge tier (J-V14.12's reason) or a default-off DM view key (the DM cannot reveal what it cannot see; a still lens is never hidden, J-V13.88) (vetoable) |
> | J-V13.122 | **(file w item 955.)** chose a **ninth lens, `trods`**, with one fixed count-free legend sentence and regime words never read from a count, **no patrol cadence on any trod and no `patrolOffer` row** (a watch drawn only as the host sends it; J396), and **no border post, continuity, siting or coherence through a trod**, over rows of the patrols lens (J378's road watching is another host system), a legend row shown only when some trod is known (its presence would itself tell a player one exists), a map cadence on a known trod (the map guessing the host's watching, patrol pieces in the crop where the host sets none) or a trod read as a route of the lowest class (a border post or a site on a trod would publish a secret way) (vetoable) |
> | J-V13.123 | **(file w item 955.)** chose **no trod born where a road dies** — a host route the host demotes to `hidden` or abandons stays a `WorldRoute`, a DM-only ghost, never a trod, and the map never promotes a trod — and **the quarantine refusal kept** until the host sends a closure as a stored fact (then a gated note of its law, the trod drawn unchanged across it), **junctions carrying nothing of sight**, over minting a trod from a decayed course (a lived host fact entering the canon; the host's own law prices its hidden rung on that road already) or drawing a quarantine line the host has no verb for (vetoable) |
> | J-V13.124 | **(file w item 955.)** chose **the layer in M-W2 and the lens in M-W5**, M-W2 the milestone the host's bodies chain names, with one new host row H32, over M-W5 alone (the host's stand-in would wait on the whole lens mechanism), a milestone of its own (M-W2 already holds every reader a trod must be kept from) or amending H9, H13 and H17 (generic carriers; each lens step has its own asks row) (vetoable) |

**955 (bn).** Volume 13 — §11 Q2 (edit). Target: `docs/volumes/V13-world.md`, line 4432 (md5 `e68af748…`) as it stands now. *Reason:* Q2 counts the new row.
*Current text (as it stands now):*
> (V13 §8.5's H1–H31)
*New text:*
> (V13 §8.5's H1–H32)

**955 (bo).** Volume 13 — §11 Q2 (the recommendation) (edit). Target: `docs/volumes/V13-world.md`, line 4437 (md5 `e68af748…`) as it stands now. *Reason:* Q2's schedule.
*Current text (as it stands now):*
> H12–H17 and H22 with M-W2, H23–H30 with M-W5, H18–H20 after M-W3
*New text:*
> H12–H17, H22 and H32's slot reading with M-W2, H23–H30 and H32's marks with M-W5, H18–H20 after M-W3

**955 (bp).** Volume 13 — §11 Owner questions (insertion after Q4's answer) (insertion). Target: `docs/volumes/V13-world.md`, line 4461 (md5 `e68af748…`) as it stands now. *Reason:* the one owner question: money and product order.
*Current text (as it stands now):*
> (Q2).
*New text:*
> (Q2).
> 
> **Q5 — The hidden ways' price and their place in the host's bodies chain (file w item 955).** The owner's rule of
> 2026-10-18 asked for the brigands' hidden roads; the host's request of that date asks the map for the layer, the reveal
> and the ordered ground classes, and will name the map's milestone as a prerequisite of its bodies chain. The design
> puts the layer, the canon slot, the reveal and the ground runs in M-W2 (≈ 1 pw more: 8 → 9 pw) and the trods lens in
> M-W5 (≈ 0.5 pw, inside its row), and gives the host one new row, H32. What is the owner's: the money, and whether the
> bodies chain may wait on M-W2 (after M-SF and M-W1) or the host builds its stand-in cover graph first from the ground
> runs (item 956), retiring it when the slot lands. *Recommendation:* accept the price and name M-W2; let the host build
> its stand-in from the ground runs meanwhile, since those land with the same milestone's `routeFacts` and change no
> simulated byte until the host reads them.

**955 (bq).** Volume 14 — V14 §2.3 `SecretState` (insertion after its comment) (insertion). Target: `docs/volumes/V14-sites.md`, line 766 (md5 `f5dd37a7…`) as it stands now. *Reason:* the three states serve the trod unchanged.
*Current text (as it stands now):*
>   // function (§9.2) reads knownTo and the key's `places` as for any place; the state adds the second cue (V14 §5.1) and the clerk's words only.
*New text:*
>   // function (§9.2) reads knownTo and the key's `places` as for any place; the state adds the second cue (V14 §5.1) and the clerk's words only.
>   // A trod (V13 §2.2, W7 (13); file w item 955) carries this same record and goes through the same admission and the same `party` key: `dmOnly` at birth, `revealed` by the DM's `setAttr` on `trod/secret/state` or the host's reveal, `discovered` by the host's event; a party view neither draws, lists, counts, names nor exports a trod it does not admit.

**955 (br).** Volume 14 — V14 §3.11 E1 (4) The world case (edit). Target: `docs/volumes/V14-sites.md`, line 2091 (md5 `f5dd37a7…`) as it stands now. *Reason:* the world crop reads an admitted trod.
*Current text (as it stands now):*
> class, biome, the route or river within the rectangle, the seat territory
*New text:*
> class, biome, the route or river within the rectangle (and a trod the crop's audience admits, V13 W7 (13): its line a `path` band at its form's width, no patrol passing on it), the seat territory

**955 (bs).** Volume 14 — V14 §10.2 Requests to V13 (edit). Target: `docs/volumes/V14-sites.md`, line 3177 (md5 `f5dd37a7…`) as it stands now. *Reason:* V14's request list to V13 gains item (19).
*Current text (as it stands now):*
> border posts' `at` on the route's polyline | V14 §2.2, §2.5,
*New text:*
> border posts' `at` on the route's polyline; (19) file w item 955: the `Trod` record carrying this volume's `SecretState` and the party's `places` as its reveal (`dmOnly` at birth, the DM's `setAttr` on `trod/secret/state`, the host's reveal and discovery events), the E1 world case reading an admitted trod as a `path` band at its form's width with no patrol passing on it, and `placeOf`'s audience for a `trod` or `junction` place | V14 §2.2, §2.5,

**956 (a).** Volume 13 — §3.11.6 the simulator feed (`routeFacts`) (edit). Target: `docs/volumes/V13-world.md`, line 2485 (md5 `e68af748…`) as it stands now. *Reason:* the port change: the ordered runs in the simulator feed.
*Current text (as it stands now):*
>   effort, the crossings and the 52-week seasonal sets — never `costTotal` —
*New text:*
>   effort, the ordered ground runs (file w item 956: from the route's `stations` and `vertexClass`, consecutive segments of one class collapsed to runs of (to-station, class, effort-metres) — a derived transient of the record, never a second field), the crossings and the 52-week seasonal sets — never `costTotal` —

**957 (a).** The host document — HOST-REQUIREMENTS ENC-HS-06 (the fact cell) (edit). Target: `docs/HOST-REQUIREMENTS-2026-10-18.md`, line 606 (md5 `7db37cc1…`) as it stands now. *Reason:* the stale verdict corrected.
*Current text (as it stands now):*
> gives each route a line, a total cost and a reason, but no per-stretch breakdown. If the host stops building its own frozen digest it loses these receipts unless the map adds them; army pace along a route (T9) depends on them. (ENC-HS-06)
*New text:*
> gives each route a line, a total cost and a reason, and — since amendments m (item 689) — the per-segment terrain class and the effort stations on each route's record (`WorldRoute.vertexClass`, `stations`, `byClassM`; V13 §2.2) with the per-class effort in the simulator feed; the ordered stretches reach the simulator feed as `routeFacts`' ground runs (file w item 956). Army pace along a route (T9) reads them. (ENC-HS-06)

**957 (b).** The host document — HOST-REQUIREMENTS ENC-HS-06 (the verdict cell) (edit). Target: `docs/HOST-REQUIREMENTS-2026-10-18.md`, line 606 (md5 `7db37cc1…`) as it stands now. *Reason:* the ledger row.
*Current text (as it stands now):*
> Ledger row T2, verdict MISSING (`WorldRoute` has no per-segment terrain class). Ledger I/O: ONE-SHOT at canonize. |
*New text:*
> Ledger row T2, verdict SUPPLIED since amendments m (item 689) and file w item 956 — was MISSING: the research note read V13 at 2,988 lines, before `vertexClass` landed. Ledger I/O: ONE-SHOT at canonize. |

**957 (c).** The host document — HOST-REQUIREMENTS ENC-HP-09 (edit). Target: `docs/HOST-REQUIREMENTS-2026-10-18.md`, line 625 (md5 `7db37cc1…`) as it stands now. *Reason:* ENC-HP-09 answered.
*Current text (as it stands now):*
> It needs the per-stretch terrain classes the map does not return ("needs T2").
*New text:*
> It needs the per-stretch terrain classes, which the map's record has held per segment since amendments m (item 689) and `routeFacts` returns as ordered ground runs (file w item 956; "needs T2" answered).

**957 (d).** The host document — HOST-REQUIREMENTS ENC-HL-10 (edit). Target: `docs/HOST-REQUIREMENTS-2026-10-18.md`, line 653 (md5 `7db37cc1…`) as it stands now. *Reason:* ENC-HL-10 touched as the request does: the stale detour sentence corrected.
*Current text (as it stands now):*
> but did not build it; the map offers no detour either. (ENC-HL-10) | An encounter on a worn bypass has no geometry to sit on until one side builds it. |
*New text:*
> but did not build it; the map mirrors a host `bypass` as a dated re-lay of the route round the avoided seat (V13 §3.8 (9); T-V13-41 (u)) and offers no detour of its own. (ENC-HL-10) | An encounter on a worn bypass sits on the re-laid route once the host sends the bypass; a hidden way (a trod, file w item 955) whose junction lay on the former course re-joins the lay in force at the canonize that adopts it. |

**957 (e).** The host document — HOST-REQUIREMENTS ENC-HL-11 (edit). Target: `docs/HOST-REQUIREMENTS-2026-10-18.md`, line 654 (md5 `7db37cc1…`) as it stands now. *Reason:* ENC-HL-11 touched as the request does.
*Current text (as it stands now):*
> that is map geometry, and the map must not present it as host truth. |
*New text:*
> that is map geometry, and the map must not present it as host truth. The hidden ways' junctions are topological — which trod meets which road where — never a line of sight (file w item 955). |

**957 (f).** The host document — HOST-REQUIREMENTS ENC-HL-12 (edit). Target: `docs/HOST-REQUIREMENTS-2026-10-18.md`, line 655 (md5 `7db37cc1…`) as it stands now. *Reason:* ENC-HL-12 filled.
*Current text (as it stands now):*
> | Smuggler and wanderer encounters would sit on these paths. | Ledger row M4: STUB; verdict MISSING. |
*New text:*
> | Smuggler and wanderer encounters would sit on these paths. Answered from the map's side (file w item 955): the hidden ways are **trods** — the map's own geography, laid by W7 (13) between the roads of every rough country (several per country, none across open plain), a fourth canon slot the host's builder reads (each trod's key, form word, two junctions, course, ordered ground runs with integer effort); never a seventh route class and never the host's `hidden` grade, which stays the demoted road's rung (a hidden host road is a `WorldRoute`, a DM-only ghost; no trod is born where a road dies). Who knows a trod is the host's, sent as a dated event with its audience (H32); the map draws a trod only as known, revealed or discovered, and its legend never counts them. The host's word *way* collides with the map's settlement-frame ways; the map's word is *trod*. | Ledger row M4: STUB; map side SUPPLIED by file w item 955 at M-W2 (was MISSING). |

**957 (g).** The host document — HOST-REQUIREMENTS ENC-HL-13 (edit). Target: `docs/HOST-REQUIREMENTS-2026-10-18.md`, line 656 (md5 `7db37cc1…`) as it stands now. *Reason:* ENC-HL-13 touched as the request does.
*Current text (as it stands now):*
> so the host's engagement registry is where the map's typed places and border segments will be read. |
*New text:*
> so the host's engagement registry is where the map's typed places and border segments will be read. A trod and a trod's junction are typed places (`WorldWhere` kinds `trod` and `junction`, by the canon's keys; file w item 955), named for the party only where its places admit the trod, else as the country it crosses. |

**957 (h).** The host document — HOST-REQUIREMENTS the H list (insertion after H30) (insertion). Target: `docs/HOST-REQUIREMENTS-2026-10-18.md`, line 109 (md5 `7db37cc1…`) as it stands now. *Reason:* the H list gains H32.
*Current text (as it stands now):*
> | H30 | Export: a per-advance alignment reading in the lens window (both axes and their bands by its own law, the aggression chip word, the top causes), published as its faith projection is; a week on each tolerance offset's causes. Offer: fix the moral drift's compounding decay and its freeze outside belief worlds, a defect the alignment read found. Host: its alignment, its moral drift. V13 §8.5 H30 (line 3768). | The alignment lens draws per-advance readings; lenses scrub stored plates and replay nothing (V13 §5.8 (8)). | H23. | Export plus one offer (lines 3724–3728, 3768) |
*New text:*
> | H30 | Export: a per-advance alignment reading in the lens window (both axes and their bands by its own law, the aggression chip word, the top causes), published as its faith projection is; a week on each tolerance offset's causes. Offer: fix the moral drift's compounding decay and its freeze outside belief worlds, a defect the alignment read found. Host: its alignment, its moral drift. V13 §8.5 H30 (line 3768). | The alignment lens draws per-advance readings; lenses scrub stored plates and replay nothing (V13 §5.8 (8)). | H23. | Export plus one offer (lines 3724–3728, 3768) |
> | H32 | The trod asks (file w item 955; V13 §8.5 H32 — the row's number, never the kernel's `H32` hash; H31, the optional map-road row of file t, lies between). With M-W2: its builder reads the canon's fourth slot, the trods (each hidden way's key, form word, two junctions, course, ordered ground runs with integer effort, length and snow weeks; each junction's point and the host edge and fraction, seat or trod it lies on), prices a trod under its own law, slower than a road, and derives its size band from the form word it registers; it sends a trod-knowledge event (the knowing seat, the trod's key, its how-word, the week, the resolved audience) through the events window (H9), names a trod or junction as an engagement's "where", watches a trod through the road-watch rows (H13) and places its movers on a trod through the presentation overlay (H17); its reveal to the party writes the shared party key as a site's does. With M-W5: the trods lens draws those facts. The map's own words: *trod*, *junction*, *narrow*, *drove*, *broad*; its *hidden* stays its road grade. | The hidden ways the host's bodies travel are the map's geography; who knows them, who rides them and what happens on them are the host's. Until the slot lands the host's stand-in cover graph reads `routeFacts`' ground runs (item 956). | M-W2; H5; H9; H12; H13; H17; M-W5 for the marks. | Required for the bodies chain (V13 §8.5 H32) |

**955 (bt).** INDEX.md — INDEX.md the V13 row (edit). Target: `docs/volumes/INDEX.md`, line 39 (md5 `10a72c97…`) as it stands now. *Reason:* the index row.
*Current text (as it stands now):*
> suitability, routes, polity, labels and the settlement glyph);
*New text:*
> suitability, routes with the trods — the hidden ways of rough country the campaign's bodies travel, a fourth canon slot, drawn only as known or revealed (W7 (13); file w item 955) —, polity, labels and the settlement glyph);

**955 (bu).** SUMMARY.md — SUMMARY.md item 13 (insertion after its last line) (insertion). Target: `docs/volumes/SUMMARY.md`, line 74 (md5 `1c0ada29…`) as it stands now. *Reason:* the plain-language account.
*Current text (as it stands now):*
>     in once as data and written back out in the shapes its tools expect; nothing the campaign already has is lost.
*New text:*
>     in once as data and written back out in the shapes its tools expect; nothing the campaign already has is lost.
>     Rough country — forest, hills, marsh and mountain — also carries **hidden ways** the campaign's brigands travel
>     instead of the roads: the map lays several through every such country, each running from road to road and never
>     across open plain; the campaign decides which towns know of one; and the players' map shows a hidden way only when a
>     town is known to use it or you reveal it, and never says how many there are.

---

## §3 Owner questions (true owner decisions only; each with a recommendation)

**Q5 — The hidden ways' price and their place in the host's bodies chain** (the one question put to the volume, 955
(bp)). The owner asked for the brigands' hidden roads (REQ:4 [STATED]); the host asks the map for the layer, the reveal
and the ordered ground classes and will name the map's milestone as a prerequisite of its bodies chain (REQ:43
[STATED]). The design costs M-W2 ≈ 1 pw more (8 → 9 pw) and the trods lens ≈ 0.5 pw inside M-W5's row, and adds one
host row (H32). What is the owner's: **the money**, and **the product order** — whether the bodies chain waits on M-W2
(after M-SF and M-W1) or the host builds its stand-in cover graph first from `routeFacts`' ground runs (item 956) and
retires it when the slot lands. *Recommendation:* accept the price and name M-W2; let the host build its stand-in from
the ground runs meanwhile, since they land with the same milestone's `routeFacts` and change no simulated byte until the
host reads them.

No other owner question. The word is settled under the delegation (vetoable, J-V13.114): the owner's rule says
"hidden roads" in prose and reserves no token, and the request itself asks the map to say so and pick another word if
*way* is in use (REQ:10 [STATED]). The capability across the boundary (a canon slot the host's builder reads, a
knowledge event the host sends) is the owner's own ask through the host's request, so it is not re-asked. Whether a
small military unit may take a trod, whether the smuggling roll moves onto trods and whether a patrol can catch a body on
one are the host's own rules against its own recorded facts (§1.11), not the map's to decide.

---

## §4 What this design deliberately leaves out, and why

1. **No seventh route class, no origin `trod` on `WorldRoute`, no second `join`.** A trod is a record of its own
   (J-V13.115): every reader of routes stays untouched and W7 (11) stands. The request's "junction nodes on the overt
   route network" are met by `TrodJunction.on`, not by widening `WorldRoute.a/b`.
2. **No map capacity, no size band on the record.** The form word and its nominal width are the hint; the host derives its
   band (REQ:16 [STATED]) — "the map's routes carry no capacity at all" (HR:609 [STATED]) and the map does not start now.
3. **No trod born where a road dies, and no trod from a demoted road** (J-V13.123; §1.7). The host's `hidden` rung stays
   on the `WorldRoute` that decayed to it.
4. **No patrol cadence on any trod, no `patrolOffer` row, no map rule for "a known way can be watched"** (J-V13.122;
   J396). A watch is drawn only as the host sends it.
5. **No quarantine line, no closure carrier.** The refusals of V13:3385 and V13:3428 stand; the trods lens's closure
   note is gated on a host fact that does not yet exist (plague-R7, HR:481 [STATED]). Which message carries the closure
   once ruled — a road-watch row with a cause word (keyed by edge or trod; a town gate is neither) or an event at a typed
   place — is left to that ruling.
6. **Nothing of sight on a junction** (REQ:18 [STATED]; HR:654 [STATED]): the junction record is topological.
7. **No DM view key for the trods, no `showTrods`** (J-V13.121): the `trods` layer is structural and the DM sees every
   trod with V14's cue, as DM-only sites are drawn; the DM's picture export is the DM's act. The judges may prefer the
   lenses reader's default-off key (read-v13-lenses.md §3.1); this design holds that a DM cannot reveal what the picture
   hides and that J-V13.88's "never hidden" applies.
8. **No `placeOf` audience parameter** beyond the one sentence in 955 (ai): the party-facing reading of a trod place
   goes through the admission at draw; the hearing is the DM's docket (HR:656 [STATED]).
9. **No base change (no BCR-V13-41).** `WayClass` and `Way` are untouched; the admission function and `SecretState`
   are already generic in the base (Base:15744 [STATED]); no base text lists the canon's slots [OBSERVED].
10. **No redesign of routes, approaches or the lived network**; the only touches on them are the six one-clause
    exclusions (patrols, border posts, the cascade row, the law texts) and the ground runs in `routeFacts` (item 956).
11. **The adapter folder's class-table rows are not written.** V13 names the table and never writes its rows
    (V13:790, 796, 848–849, 1006 [OBSERVED]); the crosswalk `read-host.md` §4 proposes (landUse → the host's eight, the
    mountain overlay at the host law's `elevationKneeM`, scrub a ruling) is the adapter's content, outside this item;
    the trod's `vertexClass` uses the same table as a route's, so nothing new is needed for the trods.
12. **The host's four contradicted premises** (§1.11) are stated in the reply and not designed against.
13. **§2.7's conflicting record figures** (10⁵ × ≈ 120 B ≠ 2 MB, V13:1352–1354 [OBSERVED arithmetic]) are not corrected
    here: the design sizes the trods against the 2 MB block and `WORLD-18`; the figure is for the fix list.
14. **H31 missing from the host document's H list** (HR's list ends at H30, HR:109 [OBSERVED]; V13 has H31 at
    V13:3906): file t's omission, outside this request; 957 (h) notes it in H32's row and does not add H31.
15. **The H32 homonym.** The host row's number is the kernel's 32-bit hash's name (`H32(`, V13:1384, 3140, 3146, 3664
    [OBSERVED]). The row says so in its own words; the rows are a numbered list and a hash is always written in code
    font with its argument, so no port token collides. If the judges hold that J-V13.78's rule reaches document labels,
    the row is H33 and 955 (bl), (bn), (bo), 957 (h) and the H32 mentions in 955 (bm), (bp) and 957 (f) renumber.
16. **The lenses reader's T-V13-59/60 numbering** stands: V13's highest test is T-V13-58 (V13:3720 [OBSERVED]); file t's
    note citing "T-V13-60" (`docs/AMENDMENTS-2026-10-18t.md:1043, :1080`) names a design-C test that never landed, so
    both numbers are free in V13 [OBSERVED].
17. **Standalone worlds** lay trods too (W7 (13) runs on both worlds), but with no host there is no knowledge event: the
    regime reads *revealed* and the party sees only what the DM reveals — the owner's "zero refusals" (J264,
    `docs/PROGRESS.md:323` [STATED]) met by drawing, not refusing.
18. **No trod to a world site, no site on a trod.** A site's road is its approach (W7 (12)); a hideout kind
    (`roadAccess` `avoided`, V14:977 [STATED]) is the natural place a trod could serve, but a trod is no road to siting
    or coherence (J-V13.122), so a site never counts one; a later item may let a hideout's card name a trod as its
    approach once the host's bodies exist.

**Status:** this record is the design; it applies nothing. The fragments are the synthesis's input (file w, from 955),
the critic's and the verifier's to check. Builder: `build.py` in this seat's scratchpad; machine copy
`docs/validation/hidden-ways-2026-10-18/design-A.fragments.json`.
