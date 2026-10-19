# To the host side: THE HIDDEN WAYS — the map program's reply (as of 2026-10-18; revised 2026-10-19 for the host's corrected request of the same evening)

**Answering** `docs/host-requests/2026-10-18-hidden-ways.md` as corrected on the evening of 2026-10-18 (47 lines, md5
`45612fdd…`; cited REQ:n; the first version kept as `…-hidden-ways-v1.md`, md5 `251c96a9…`, differing in lines 33 and 35
only [OBSERVED: `diff`]). **The design is draft amendments w** — `docs/validation/hidden-ways-2026-10-18/draft-w.md`
(items 955–975, 114 fragments; the machine copy `draft-w.fragments.json`) — **pending the owner's look**; nothing is
applied, and every line below that says "will" means "once file w is applied". Written by the synthesis seat of the
hidden-ways workflow (J407) and revised by its correction run (J415; the owner's word of 2026-10-19 on roads that join,
fork or diverge, J416) under the owner's delegation (J404); every ruling is vetoable by the owner. The first reply is
kept as `docs/validation/hidden-ways-2026-10-18/reply-v1.md`. **Cites:** V13:n is `docs/volumes/V13-world.md` as it
stands before file w (md5 `e68af748…`, 4 611 lines); V14:n `docs/volumes/V14-sites.md`; BASE:n `docs/ARCHITECTURE.md`;
HRQ:n `docs/HOST-REQUIREMENTS-2026-10-18.md`; the host's own facts only from `research/sf/*.md` (FPI =
`fp-physical-integration.md`, FPS = `fp-simulator.md`, TRD = `trade-system.md`, PLG = `plague-system.md`, LNS =
`lens-implications.md`, POP = `population-system.md`, FTH = `faith-system.md`; Fable-retrovalidated at J392) and from
HRQ. **Tags:** [STATED] the cited text says it; [OBSERVED] checked in the repository; [INFERRED] the map side's reading
or proposal. No host code was read or copied. **The words used below:** the host's "hidden way" is the map's **trod**
(§2); the host's "rung" is the map's **grade** (the field `WorldRoute.grade` already holds the host's ladder word,
V13:788, and the trod's grade holds the same word); "hidden" is the host's own word for the ladder's bottom usable rung,
on either record kind.

---

## §1 The eight answers

**1. Can a route endpoint be a non-settlement junction in your network today? If not, what milestone adds it?**
*Today no — only the map's own approach road ends at one; by the owner's word of 2026-10-19 the route record and the lay
admit junction ends in the same milestone as the trods, M-W2, and the host may derive and charter them.* The standing
law is "every host route ends at two host settlements; a site, a proposal or a junction is a position along a route,
never an end of a host route (the map's own approach road, (12), ends at it)" (V13:1827–1828) [STATED]; the approach
road ends at one junction through `join?: { route; atCm }` (V13:786), laid "ending at the junction (the joined route's
polyline point nearest the path's last cell)" (V13:1850) [STATED]; no record has two junction ends (V13:786)
[OBSERVED]. The owner opened that law on 2026-10-19: "but i also want roads that connect other roads as well that join,
fork, or diverge" — "apropriately and organically" (J416; quoted verbatim in file w's owner-rule block, item 970). So
file w generalizes the record: a route's two ends `a` / `b` are each **a settlement or a junction**, the junction one
typed record — **`WorldJunction`**, a point on a public route's polyline at an integer station, its arms the routes and
trods that end or cross there — shared by routes and trods (§3.2); the approach road's `join` is superseded by its `b`
junction. On a host-bound world your genesis edges and your charters may name a junction end (§7's H32 (j)): a point on
one of your own edges by its key and station, or a world point the map snaps to the nearest public route within
`routeToleranceM` (60 m, V13:1135) [STATED]; the map writes the junction and lays the road to it exactly as it lays an
approach road (V13:1846–1852: the joined route byte-identical, never split) [STATED]. On a standalone world the map's own
selection gains a fork rule (W7 (14)): a seat joins the nearest existing route at a junction when the detour it costs
is within a bound of its own best road, else it gets its own road (§6). The trods' two-junction record lands with the
same milestone, **M-W2** (V13:3814) [STATED]. "A settlement's gate" is still met without a seat end: a gate station is
frame geometry behind door 1 (V13:1829–1830, 1848) [STATED], so the junction on the road that enters the town, within
1 000 m of the placed frame's margin ring, carries `nearSeat` and reads "at its town gate" (§3.2); a seat end stays a
seat.

**2. Does the world port already carry per-stretch ground classes for routes (T2), or is that new work?** *The record
does; the simulator feed does not; B is a port change, not new generation, and lands with M-W2.* `WorldRoute` carries
`stations: Int32Array /* per vertex: cumulative land effort-metres … */` and `vertexClass: Uint8Array /* per segment: the
host's terrain class through the adapter folder's table */` with `byClassM` (V13:790–791), evaluated on the final polyline
(V13:1800–1802) [STATED], since amendments m item 689 (`docs/AMENDMENTS-2026-10-17m.md:543`) [OBSERVED]. But `routeFacts`
sends "the per-class effort" — totals per class — "never `costTotal`" (V13:2484–2485) [STATED], and the ordered classes
ride only `routes(world)`, the map feed, "never read by a step of its simulation" (V13:2437–2439) [STATED]. File w gives
`routeFacts` each host edge's **ordered stretches** — a maximal run of one terrain class each: integer metres, integer
effort-metres and the class word, read at the call from `stations` and `vertexClass`, never a field of its own (item 960
(b)) — with M-W2. Your rows are behind the volume on this: ledger T2 "no terrain-class breakdown per segment — MISSING"
(FPI:394) and HRQ:606, 625 say the same, and the note read V13 at 2 988 lines (FPI:484) [STATED]; "needs T2" is the
ledger's row T2 (FPI:58), not the map's terrain tool T2 (V13:573–576) [OBSERVED]. Item 968 corrects ENC-HS-06 and
ENC-HP-09.

**3. Which of your route classes, if any, already means "not for armies or caravans" — is `trail` that, or is `hidden`
a seventh class?** *Neither — and under your corrected §D the answer sharpens: `hidden` is the bottom usable rung of the
one ladder, carried as a `grade` on either record kind.* `trail` is a rank rule — "every seat still unjoined after the
passes gets a `trail` to its nearest routed cell" (V13:1792) — and a public route of the lowest class (an approach joins
"a public land route of any class … highway > road > track > trail", V13:1839–1840; a watchpost sits at a trail's
crossing, V13:2090; a trail enters a frame as a `path`, V13:762) [STATED]; no sentence in V13 restricts who uses one
[OBSERVED]. `hidden` is not a class: the class union is `'highway'|'road'|'track'|'trail'|'sea'|'river'` and `hidden` is
a host **grade** "among" your grade words on a bound route (V13:788) [STATED] — a demoted overt road, "a DM-only ghost"
that "counts as no public road" (V13:1813–1820), reached by demotion (V13:2421), patrolled by none (V13:1163) [STATED] —
your own ladder's rung ("grade ladder down to `hidden`, never absence", FPI:99; "the overgrown road", FPI:159)
[STATED]. The thing you want — a way born in geography that was never a road, with junction ends, size-capped — is a
**record of its own** outside `WorldRoute`: no host key, no leg, no seat end, no class, counted by no reader of routes.
It now carries **your rung as its `grade`** (§6): the same field, the same law and the same word as a road's — so a
road you grade `hidden` and a trod at your bottom usable rung are one rung on two record kinds, and a hidden road is
drawn under the trod rule (§6). Who may walk either is your stance rule (REQ:15), never a class word of the map's. Behaviour 1 (bodies by stance) needs
nothing from the map beyond the record: no class word, no band, no stance field — your rule over your own facts.

**4. Can your record express a width/kind hint per way, or should the host derive capacity from ground class alone?**
*It can and does.* Each trod carries `kind: 'goat'|'drove'|'broad'` — single file (your goat path and game trail), beasts
driven abreast (your drover's way), cart-wide (your old road) — chosen by the lay from the path's slope, dominant land
use and length (the first matching row of the rule table `world.trod`), each kind with an integer `widthM` (1 / 3 / 5 m,
own, calibratable) that the trod record carries once in its envelope (§3.1). You derive the size band from the kind, the
width and the stretches' classes; the map records no band and simulates none (REQ:16). No land route carries a width
today; the only width-like facts are a water edge's limits offered on request (V13:2485–2487) [STATED].

**5. Who owns "known per town"?** *You, exactly as you prefer (REQ:42), and the canon admits nothing else — and your three
additions of the evening (the office, the lapse, the partial prefix) fit the same channel.* "Truth only — no believed
fact enters or leaves the canon" (V13:2578–2579) [STATED]; "Host facts carry the host's resolved audience … a fact the
host hides is never sent; a host fact arriving with no resolved audience is stored DM-only" (V13:960–963) [STATED]. A
town's knowledge arrives as a **dated event of the events window (H9)** — a `WorldEvent` whose `kind` is your knowledge
word through the adapter folder's event table, `where` the trod (whole, or a part of it, §5), `seats` the knowing seat,
`cause` your how-word — any value, `office` among them —, `week`, `audience` your resolution (V13:834–839) [STATED]. Its
lapse is **your second event, `way_forgotten`**, in the same channel: a town's knowledge of a trod at a week is the
latest `way_known` / `way_forgotten` per (town, trod) at or before it, read off the recorded events store (V13:2530–2535)
[STATED, INFERRED] — the map keeps no permanent reveal of yours, and the windowed replace's retraction stays what it is,
your undo and resume path (V13:2534), never the lapse. The map draws and never decides. It holds exactly one thing of its
own on a trod: the party's secret state, V14's `SecretState` reused whole (`dmOnly` · `revealed` · `discovered`,
V14:763–766) [STATED], changed only by the DM's one `setAttr` or by your reveal through the party's places (V14:764,
795–796; HRQ:601) [STATED] — never by a knowledge event (§5). No knowledge flag sits on the record and none enters any
simulator product.

**6. Which milestone would carry A (the layer) and C (the reveal/legend)?** *M-W2, both, with B — and with the junction
ends and the fork rule the owner's word adds.* M-W2 already holds W7's network, the approaches, `routeFacts` and
`mapFeed`, and every reader a trod must be kept out of (V13:3814) [STATED]; file w re-declares it 8 → **10 pw** (the
trods ≈ 1 pw, with the rung fold, the lapse fold and the partial drawing inside it at the row's whole-week resolution;
the route record's junction ends, `WorldJunction`, your genesis's and charters' junction-end forms, W7 (14)'s fork rule
and its test ≈ 1 pw) and widens the staged row 37–45 → **39–47** pw (V13:3819–3820; INDEX:39; SUMMARY:124). The
prerequisite your bodies chain should name is **M-W2** alone, with your own H9, H12 and H17 and the new row **H32**
(§7). Your marks over the trods (who watches one, which band is on one) are no prerequisite: they wait as rows of the
deferred danger lens (V13:4038–4040) [STATED], once you send those facts.

**7. Does anything in your world-record size budget change if a province carries 200–2,000 ways?** *No — and "every
candidate" (your §D) is the same count.* The trods are never written to the file: W7 (13) is deterministic and
drawless, so they are rebuilt on load by the same rule — the pattern §2.7 already pre-decides for the recomputable
rasters (V13:1361–1362) [STATED] — and only each trod's secret state that is not `dmOnly` is a record (≈ 20 B): ≤ 40 KB
at rest for 2 000, ≈ 0.7 MB in memory; your rung events live in the events store, never on the rebuilt trod. "Every
candidate" is every trod the density rule admits — the asked count of §3.6 (≤ ≈ 800 at the province rung where two
fifths of the ground is rough; your 2 000 an upper case) — laid at birth and in the record whether or not you have lit
it (Q8). One correction to the first reply: its lay figure for 2 000 trods, ≈ 16 ms, omitted the rough pass over the
fine cells (≈ 10 ms at the province rung), so 2 000 trods cost ≈ 26 ms; file w re-declares W7c's row at 30 / 60 / 120 ms
(§8). Had the trods been stored, 2 000 at ≈ 350 B would take ≈ 93 % of a province's 0.75 MB record headroom (3 MB −
1.024 M cells × 2.2 B, V13:1359–1360) and the same density on a continent (144 × a province's area) would break the
24 MB [OBSERVED arithmetic]. The binding limit is yours: the trod record at 2 000 trods is ≈ 410 KB uncompressed, the
size of your frozen-digest cap of 400 000 bytes (HRQ:912; the first reply cited HRQ:840, the world-record row) [STATED],
so keep it beside the digest, not inside (§7).

**8. Can your canon carry candidate ways that are not yet usable (rung `wild`), so the host can light them later
without a new record?** *Yes.* Every trod W7 (13) lays is a **candidate**: it is in the trod record from the record's
first read, with its id, its junctions, its stretches and its kind, and it stays there through every re-read with the
same id (identity by its seed cell, §3.8 of the draft) whether or not you have lit it; your ledger holds its rung and
sends each change as `way_rung(wayId, rung, tick)` — a third event kind of the events window (H9) carrying your ladder
word, which the map folds onto the trod's `grade` as it folds your grade onto a road (V13:788, 1811) [STATED] — so a
new way "forming where bodies keep crossing the same cover" (REQ:35) is you lighting a candidate the map already laid;
nothing is minted and no record is new. A candidate you have not lit (no rung yet), or one at a word below your bottom usable one, is **drawn for
nobody** — not the players, not the DM — and is absent from every picture, hover, label, summary and export: it is the
map's offer to your simulation, in the record alone (§5, §6). Two things to say back: the map never writes `wild` as
a word of its own (map-side "wild" is unclaimed land, V13:1944, 3404 [OBSERVED]) — your ladder's words, `wild` included,
travel in the adapter folder's grade-ladder table in your order, bottom first (§2); and where no candidate lies, no way
can form: the density rule is a table you can read and the map can re-tune (§3.6), never a record you can add to.

---

## §2 The word

**"way" collides, in all three of the map's documents, and the map says so as you asked (REQ:10).** The base's
settlement-frame skeleton is `type WayClass = 'through'|'primary'|'secondary'|'lane'|'alley'|'cul_de_sac'|'track'|'path'|
'quay'|'pier'|'bridge'|'ford'` (plus `aqueduct`) and `interface Way { … from; to … }` (BASE:1093–1104) [STATED]; V13 maps every
world road class onto it at a frame's ring (`class: WayClass /* highway → through, road → primary, track → track, trail →
path */`, V13:762) and draws a glyph mark `'way'` (V13:803) [STATED]; V14 has its way bands, way corridor, quay way and
raised way (V14:424, 2052, 1043, 2309) and lays "one way of its `WayClass`" from a charter road to a site's gate
(V14:1799–1800) [STATED]. A world route that crosses a frame's ring becomes a `Way` inside the frame (V13:2277), so a
world record called "way" would meet a frame record called `Way` at every ring a hidden way reached [INFERRED].

**"hidden" is not free either, and your corrected §D settles what it means.** V13 already reads it as *your* grade of a
demoted overt road (V13:764, 788, 1815–1820, 2421; patrols "hidden: none", V13:1163) [STATED], and your own ledger ties
that rung to decay (FPI:99, 159) [STATED]. Under one ladder it is the bottom usable rung on either record kind: a road
that decayed to it and a trod you have lit to it are one rung. So `kind: 'hidden'` (REQ:24) is refused: `hidden` stays
your ladder word with its one meaning on both sides, carried as a `grade`, and the new layer's records are a kind of
their own, never a seventh route class (§1.3).

**"rung" collides too.** V13 uses *rung* for its size rung (province / realm / continent, V13:1774, 3728), the
prosperity rung (V13:1936; "*prosperity* is the host's rung only", V13:3319) and the failure ladders' rungs (V13:2914),
with a type `Rung` (V13:800) — 146 whole-word hits [OBSERVED]. The map's word for your ladder word is **grade**: the
field that already holds it on a road, `grade?: string /* bound: the host's grade word, hidden among them */`
(V13:788) [STATED], goes on the trod with the same meaning. In prose below "your rung" and "the map's grade" are one
thing. Your `wild` stays yours: map-side *wild* is unclaimed land (V13:1944, 3404), so the map never writes it as a term
of its own; it draws a trod with no rung yet, or at a word below your bottom usable one, as "not lit" (§5). And "fork" is taken on both sides — the map's counterfactual
fork (V13:3812, 3821) and your own copy of the old generator (HRQ:28) [OBSERVED] — so the owner's "join, fork, or
diverge" stay the owner's prose and no record field or kind value is `fork`; the record's word is **junction**.

**The map's word is `trod`** (plural *trods*): zero whole-word hits in V13, V14, the base, the host document and
`research/sf/*.md` [OBSERVED]; in plain English a narrow path worn by feet and beasts (the northern "smugglers' trods") —
the thing asked for, a body of thirty in file, never a column. Its end is a **junction** — the word V13 already uses on
the world for the approach road's end (V13:1850) [STATED], now the one record `WorldJunction` (zero hits [OBSERVED])
shared by routes and trods; the base's `Junction` is a frame-arena vertex that never crosses the seam. Its width hint is
its **kind**, one of `goat`, `drove`, `broad` (free everywhere; `broad` once in the base as prose) [OBSERVED]. Checked
and rejected: *byway* (free, but a minor public road in plain English and the sites-roads lane's rejected name for the
approach road), *trace* (the trace records, V13:832–833, 883), *path*, *track*, *trail*, *lane* (way and route classes),
*pass*, *cut*, *ride* (taken or ambiguous), *holloway* and *droveway* (physical forms of an overt road); for the hint's
field, *gauge* (your own "realm gauge", FTH:487) and *form* (V13's "site form"); for its values, *narrow* (V14's
`widthClass` value, V14:680), *game* (the game master), *foot* and *cart* (V13's travel modes, V13:854, 1141)
[OBSERVED].

**What the host should register:** `trod` (the edge; in prose "the smugglers' trod", "the old drover's trod"), `junction`
(its end, a point on one of your edges with an integer station — and now a lawful end of one of your own roads), and
the kind words `goat`, `drove`, `broad`; keep `hidden` and your other ladder words as your grades; send the ladder's
words in order through the adapter folder's grade-ladder table, bottom first, your bottom usable word named; mint `way` on neither side.
Your register's homonym check (FPS:471) is yours to run; the map's census is above.

---

## §3 The layer A, as the host will read it

### 3.1 The record, field by field (the simulator feed's trod record, item 960 (c); the map's own `Trod` and `WorldJunction`, items 956 (e), 971)

The trod record is `trods(world, request: { logHead })` → `TrodRecord`, the simulator feed's **third optional product**
beside `routeFacts` and `patrolOffer` (V13:2484–2491) [STATED], and **not a slot of the canon** (§3.8). It admits what the
simulator feed admits — "integers with a stated unit, the host's closed vocabularies through the adapter folder's tables,
host keys and `WorldPointCm`s — no float, no prose, no cache, no echo of a host fact, no raster index" (V13:2435–2437)
[STATED] — so it carries **every candidate and no rung**: your ledger holds the rungs, and the map never echoes them back.

| field | what it is |
|---|---|
| `envelope.schema`, `envelope.world { doc; namespace; logHead }` | the record's schema and the world it was read from, at the log head you asked for |
| `envelope.against` | the canon versions it was built on (the canon envelope's version vector, V13:846) — you check it against the canon you adopted |
| `envelope.trods { version; inputHash }` | its own version and input hash: the physical layers, your cost law, `world.trod`'s rows and the lay versions of the routes in force at the log head; a slot whose inputs did not change is byte-identical (V13:1322–1326's rule) |
| `envelope.kinds[] { kind; widthM }` | the kind table's three rows once: `goat` 1 m, `drove` 3 m, `broad` 5 m — the width you turn into your band |
| `envelope.units { effort: 'effort-metres'; length: 'm' }` | the units of every number below |
| `junctions[].id` | the junction's id: the map's lineage key, opaque to you (as your keys are to the map, V13:842) |
| `junctions[].at` | its point, a `WorldPointCm` on your edge's polyline |
| `junctions[].route { hostKey?; stationM }` | your edge key and the integer station (effort-metres from the edge's `a` end) — "which route, where along it" (REQ:28) |
| `junctions[].arms[] { trod? \| route?; stationM }` | the trods, and the routes (yours by key), meeting there with their stations (0 or the arm's effort at an end; between at a crossing) |
| `junctions[].nearSeat?` | the host key of the settlement whose frame's margin ring lies within 1 000 m (`gateBandM`): "at its town gate" |
| `trods[].id` | the trod's id (its lineage key, independent of its junctions, §3.8) — the id you name back in an event's `where`, lit or not |
| `trods[].a`, `trods[].b` | its two junction ids |
| `trods[].kind` | `goat` / `drove` / `broad` |
| `trods[].lengthM`, `trods[].effortM` | integer metres and integer effort-metres under your cost law's time terms, as `routeFacts` prices a route (V13:2484); you price weeks yourself, slower than a road (REQ:26) — the map applies no trod factor |
| `trods[].stretches[] { lengthM; effortM; terrainClass }` | the ordered stretches from `a` to `b`, each a maximal run of one terrain class in your words through the adapter folder's class table; their cumulative effort is the station scale your partial knowledge names (§5) |

No polyline (geometry rides the map feed, keyless, by audience, V13:2503), no knowledge, no rung, no raster index: the
request's "ordered CELLS" (REQ:25) cannot cross the port — "every position a world point" (`research/sf/fp-realm-review.md:529`;
V13:2437) [STATED] — so the stretches do.

### 3.2 The junction node model — one record for routes and trods (J416)

A junction is a point on a public land route's polyline (your edge, by key, with an integer station): the model the
approach road already uses (V13:786, 1850) [STATED], now a record of its own, **`WorldJunction`**, with `arms` (every
trod and every route meeting there, each with its station) and a `kind` — `end` (an arm ends on the route: a trod's end,
or, by the owner's word of 2026-10-19, a road's) or `crossing` (a public route you charter later across a trod's course,
the trod's course byte-identical: the ambush point stays nameable). Two arms that end within half a fine cell share one
junction. The three endpoint kinds you listed (REQ:24) reduce to one: a point on a route stretch (your "another way's
junction" is the same `WorldJunction` with two arms; your "settlement's gate" is the junction on the road that enters
the town, outside the frame's extent + margin, carrying `nearSeat` — the nearest host-nameable point, because a gate
station is frame geometry behind door 1, V13:1829–1830, 1848) [STATED/INFERRED]. A route's seat end stays a seat (its
placement id), never a junction. Nothing sight-related is on it (REQ:18): a junction is topological — which trod or road
meets which route where (item 968 (i)). Its identity is (`junction`, the joined route's lineage, its fine cell) (item
958 (a)): a re-lay of the joined route that keeps the cell keeps the junction, one that moves it re-joins the map's own
arms within `rejoinM` and leaves yours where you put them (§6).

### 3.3 The ground-class words and the eight stretch classes

The stretches' `terrainClass` is "the host's terrain class through the adapter folder's class table" (V13:790) — the same
table a route's `vertexClass` uses and the canon's crossings and site ground already stamp (V13:796, 846, 848) [STATED].
V13 names the table and never writes its rows [OBSERVED]; the map's own words are its biome rows' `landUse` — ice,
tundra, forest, grass, scrub, desert, wetland, alpine (V13:996) [STATED]. The crosswalk the adapter's rows will carry, for
your eight [INFERRED, to be confirmed with the adapter, not a host fact]: water ← a water surface or reach under the
step; desert ← `desert`; grassland ← `grass` (and `scrub`, a ruling); forest ← `forest`; wetland ← `wetland`; tundra ←
`tundra`; glacier ← `ice`; mountain ← `alpine`, or any step above your law's `elevationKneeM` whatever the biome (your
overlay rule, FPI:58). There is no "hills" among your eight (FPI:58–59) [STATED]: the map's rough-country rule reads
hills as relief (§3.6), and the stretch words it sends are the eight.

### 3.4 The step cost

`effortM` and each stretch's `effortM` are effort-metres under your cost law's time terms, the unit `routeFacts` already
uses (V13:2484) [STATED]; the trod's `stations` on the map side are cumulative effort-metres per vertex, as a route's
(V13:790). The map applies **no trod factor**: you price a trod on your own law, slower than a road (REQ:26). Seasonal
sets are not carried on a trod: your slow-not-sever law prices the season per terrain class (`TravelLaw.season.terrainFactor`
is "per host terrain class, per quarter", V13:857) [STATED], which the stretches already carry; nothing on a trod is ever
a cut.

### 3.5 The width/kind hint and the capacity band

The hint is the kind word and its `widthM` in the envelope (§3.1). Your four prose hints (REQ:27) map onto the map's three
words — goat path and game trail → `goat` (single file, 1 m), drover's way → `drove` (3 m), old road → `broad` (5 m,
cart-wide; a way of the map's own geography, never a decayed host road) — chosen by the lay from the path's slope p95,
dominant land use and length (item 957 (b)). The band you derive from (kind, width, the stretches' classes) is yours by
your own law; the map records no band and never draws one from its width (a refusal, item 961).

### 3.6 The density rule and its parameters — every candidate

Your rule — "several per rough country (forest, hills, mountain, marsh), none across open plain" (REQ:29) — is the rule
table `world.trod` (item 957), every cell own, PLAUSIBLE until the B-WORLD sweep measures the counts:

| parameter | default | what it says |
|---|---|---|
| `rough.landUse` / `reliefM` / `reliefWindowM` / `patchMinKm2` | forest, wetland, alpine, scrub / 120 m over 2 000 m / 2 000 / 4 km² | rough country is those land uses, or any ground that rises or falls 120 m within 2 km (your "hills", which your law cannot see, FPI:15); a rough patch under 4 km² lays none |
| `density.perRoughKm2` / `perPatchMax` / `junctionSpacingM` | 32 km² / 12 / 3 000 | one trod asked per 32 km² of rough country at the province rung's cell (scaled at coarser rungs), at most 12 per patch; touch points (possible junctions) along one road no closer than 3 km |
| `lay.coverFactor` / `openFactor` / `maxCostFactor` / `openShareMax` / `roadNearM` / `roadHugShareMax` / `minStraightM` / `maxStraightM` / `rejoinM` / `gateBandM` | 0.5 / 4 / 3 / 0.2 / 500 / 0.3 / 2 000 / 40 000 / 2 × the fine cell / 1 000 | a trod prefers cover four-to-one against the open; a path over 3 × the straight cost, over a fifth of open ground (none across open plain), or shadowing a road for more than three tenths of its length is dropped; 2–40 km between junctions |
| `kinds` | goat 1 m · drove 3 m · broad 5 m, by slope, land use and length | §3.5 |

A province whose rough country is two fifths of its 64 000 km² asks at most ≈ 800 trods (fewer under `perPatchMax` and
the drops); a continent at most ≈ 7 200 in all [INFERRED arithmetic]. **Every trod laid is a candidate** (Q8): it is in
the record from birth with no rung until your first `way_rung` lights it; "every way that could exist"
(REQ:35) is this set, and a denser offer is a change to these cells (`perRoughKm2`, `perPatchMax`), never a record you
add. A patch that lays fewer than it asked is reported once (`W_TROD_SPARSE`, the trods asked and laid) — never a trod
across open plain to make the count. The lay is deterministic and draws nothing (`world.trod` a reserved concern,
V13:2928–2929's pattern) [STATED]: two runs are byte-identical, a permuted route order identical, and the lay over one
patch is byte-identical whether the others are laid or not (T-V13-59). "Genesis is sacred" holds on the map's side too:
no host edge and no lay version of a route is moved by a trod (item 959 (b)).

### 3.7 The junction records as typed places

`WorldWhere.kind` gains `trod` (the trod's id and a fraction along it, or a part of it by `asFarAs`, §5) and `junction`
(the junction's id — a trod's or a road's) (items 956 (h), 971); `placeOf` renders a trod for the DM by its kind word,
the two routes its junctions sit on and the distance from one, a junction by its route, its arms and the distance from
the nearer seat or "at its town gate" where it carries `nearSeat`, and, for an audience that does not know the trod,
only the country it crosses — the land-use word and the seat territory's seat, never the trod's line or name (item 960
(f)). Your hearing card names the place by these kinds (REQ:19, 28); the trod and junction ids reach you in the trod
record, so you need H16 for nothing here (REQ:11) and send the id back in the event's `where` [INFERRED].

### 3.8 The version and the additive canon — and why a product, not a slot

You asked for a layer "in the world canon, versioned like the digest" (REQ:23). The record is versioned like the digest
(its own version and input hash in the envelope, beside the canon versions it was built against), requested between
advances or at an advance head and baked with its stamp, so one answer holds through an advance (your law 7, HRQ:668;
the port consumption law, V13:2429–2433) [STATED], read behind your own switch with your tier line and degraded arm
(absent ⇒ the prior bytes), as `routeFacts` and `patrolOffer` are (V13:2490–2491) [STATED]. It is **not a canon slot**,
for three reasons the volume states: (i) port law (1) makes the canon's slots "pure functions of the physical layers, the
host's cost law and the member seats, and no lived host fact enters them" (V13:2576–2577) [STATED], and a trod's
junctions sit on the network in force — your genesis and your lived changes, "mirrored, never computed" (V13:1811); (ii)
H22's birth canon is adopted "as the campaign is created" and the genesis is laid at birth over it (V13:3887, 3897;
HRQ:84) [STATED], and "a new canon is adopted only by the host's own receipted canonize — H22's birth canon … or a
re-canonize", otherwise "the DM's explicit premium act" (V13:2432–2433, 2478–2481) [STATED] — so a trods slot would be
empty in every born-canonized campaign until the DM paid for a re-canonize, where the product reaches your bodies between
advances on every tier; (iii) the additive canon must differ from the adopted one "only in the added seats' own rows"
(V13:2459–2462) [STATED]. **The additive canon does nothing to the trods**; a founding that places a frame over a patch
re-lays the cut trods at the next W7c run and steps the record's version, which you pick up at your next request — the
re-laid trod keeps its id, so your rung for it stands. The owner's answer to door 1 named the canon (file r item 926;
V13:4455–4459) [STATED]; the map reads the simulator feed as the one door the answer opened (its optional products ride
it) and puts that reading to the owner as part of Q5 (§9), vetoable. If the owner holds to the letter of a slot, a slot
needs your automatic receipted re-canonize after the genesis mount (J388's pattern, V13:2478–2481), which H32 would then
say.

---

## §4 The fallback B

**What exists:** per-segment terrain classes and per-vertex stations on every route's record (V13:790–791; item 689)
[STATED]; per-class effort totals in `routeFacts` (V13:2484) [STATED]; the class vocabulary stamped in the canon envelope
(V13:846) [STATED]. **What is new:** `routeFacts` gains, per host edge, the **ordered stretches** from `a` to `b` — each a
maximal run of one terrain class: integer metres, integer effort-metres, the class word — read at the call from the
record, never a stored field (item 960 (b)); tested by T-V13-43's new clause (the stretches sum to the edge's length and
effort and are byte-identical whatever the laying order, item 963 (c)). **When it lands:** M-W2, with `routeFacts` itself
(V13:3814) — the same milestone as the trods, so your stand-in cover graph "from ground classes between route junctions"
(REQ:31) is your own derivation over these runs while you wait on nothing of the map's; the map draws no stand-in and names
none (law 10 admits a host-derived mark only as you send it, V13:3298–3310) [INFERRED]. Note the direction of this
fallback is yours: the site precedent's fallback runs the other way (the map's card stands alone until your record
lands, V14:481–497) [STATED]; the ownership split mirrors the site record exactly, the fallback does not
(`read-v14-base.md` §1).

---

## §5 The reveal and the legend C — with the office, the lapse and the partial prefix

**The layer rule (item 961 (a)).** The trods draw in a structural layer `trods` of V13 §5.1 — a toggle, **default off** —
under V14's three states on the trod and the one admission function over `knownTo` and the party's `places` (V14:763–766,
791–796; BASE:15744) [STATED], **and by the trod's grade** (your rung): a trod you have not lit (no rung yet), or one at a word below your bottom
usable one, is drawn for nobody — absent from the picture, the labels, the hover, the screen-reader summary, `placeOf`,
`mapFeed` and every export, the DM's included, never greyed (a candidate is in the trod record alone); a lit trod draws
with the layer on for the DM with V14's cue at its midpoint (a dashed ring with the eye-slash glyph while `dmOnly`, an
open ring `revealed`, a filled ring `discovered`, V14:2583–2588) [STATED] and for a player only when `revealed` or
`discovered`; its line is the trod's own dash-dot in its kind's tint at a width by the step of its grade on your ladder
(0.6 px at your bottom usable word — your `hidden` —, 0.8 at the next word up, 1.0 at the third and above), the grade
word on the DM's hover (a player's carries the kind word only — never the grade word, the length or a junction's
id), **never** the routes layer's solid, dashed or dotted cues (V13:3144), because those say "public route" and a
trod is none. On a standalone world no host sends grades and every trod draws as the map's own at the first step's
width. An unknown trod is absent — never greyed — from the picture, the labels, the hover, the screen-reader summary,
`placeOf`'s words for the party, the player audience of `mapFeed` and every player-audience export (T-V13-60). Default
off, so a DM's picture export ("the view as drawn", V13:3212) carries the network only on purpose. A trod is `dmOnly` at
birth; the DM finds any trod's id — an unlit candidate's too, which no picture draws — in the trod record's listing
(every candidate is there with its junctions and kind) and its reason by `whyTrod` [INFERRED from items 956 (e), 960
(c)], and reveals it by one `setAttr` on its secret state, you reveal it through the party's places (V08's reveal,
the shared `party` key, V14:797–802; HRQ:601) [STATED] — as a site; a revealed trod with no rung yet, or at a word below your bottom usable one, stays
undrawn until you light it, its state kept. The knowing town's mark (your C2) is the **`events` layer's pin** at the trod (or
at the known part's midpoint), in the knowing seat's colour, captioned with the seat, your how-word, the week and, for a
part, how far, drawn only where the trod draws for that audience (item 961 (b)); no ninth lens is built for it (the
bodies' marks wait as rows of the deferred danger lens, V13:4038–4040, once you send them).

**The `way_known` event's shape through H9.** Your `way_known(settlementId, wayId, how, tick)` (REQ:33) is, on the
port's side, a `WorldEvent` of the events window (H9, V13:3884): `kind` your knowledge word through the adapter folder's
event table; `where: { kind: 'trod', trod }` by the trod's id from the record — or `{ kind: 'road', edge }` by your edge
key for a road you grade hidden (§6) —; `seats: [the knowing seat's key]`; `cause` your how-word through the vocabulary
table — a patrol's catch, an operative's map, your new **`office`** (the warden's jurisdiction), any value: the field V13
reserves for "the host's cause word" (V13:837) takes them all and the map asks nothing of a how-word but that it be in
the table; `week` your tick as a week; `audience` your resolution — DM-only where unresolved (V13:963); `radiusM` 0;
`factTier: 'dossier'`; `at` placed at fold at the trod's midpoint, or at the known part's midpoint (item 956 (f)).
**The partial prefix (your c3): yes, the record can draw a part.** `where` may carry **`asFarAs: { from: 'a' | 'b';
stationM }`** — the part of the trod from the named end as far as the station, in integer effort-metres from the trod's
`a` end, the record's own unit (the trod's stations; your "nodes" past its two junctions are its stretch boundaries, and
the record's stretches give you each boundary's cumulative effort, so "as far as the ford" is the station at that
stretch's end); a prefix from the `b` end is a suffix in the record's frame, hence `from`. Where the trod draws for the
audience, the pin sits at the part's midpoint, captioned "from a as far as station n" or "from b back to station n" (the
station from `a` in either case), and the part is
marked on the DM's hover; your reveal through the party's places may carry the same part on the place's address, and the
party then sees that part only — the rest absent, never greyed: its picture, `mapFeed` and exports carry the polyline
cut at the station and the near junction only, the state cue at the part's midpoint, no far junction and no length or
effort; the DM's `setAttr` reveals whole. A re-lay of the trod
moves its stations: the part is read against the lay in force at the event's week and carried over the new course by
the share of the trod's effort it covered until you send a fresh row (a drawing rule of the map's, vetoable). If you
would rather send whole-only, nothing above is required: `asFarAs` is optional.
**The lapse (your c2): the map keeps no permanent reveal of yours.** Your `way_forgotten(settlementId, wayId, tick)` is
a second event kind in the same channel (`where` the trod, `seats` the forgetting seat, `week` the tick); a town's
knowledge of a trod at a week is **the latest `way_known` / `way_forgotten` per (town, trod) at or before that week**,
read off the recorded events store (V13:2530–2535) [STATED] — the `events` row draws the pin from the learning event's
week until a later forgetting event's week, and a re-learning draws it again. The office's withdrawal "if the office
changes hands" (REQ:33) is read the same way whichever form you send — a `way_forgotten`, or the office-sourced row's
retraction in the windowed replace — the latest row per (town, trod) wins; the replace's retraction stays your undo and
resume path (V13:2534), never the lapse. Nothing is forgotten on the map's side (your law 5, FPI:159): every event is
kept as a dated fact; only the drawing lapses. **No knowledge event changes a secret state**: a town's knowledge and the
party's view are two things, as your request keeps them (REQ:33: "a known way draws … with the knowing town's mark; a
way the DM reveals draws for the party's view"), and V14's state has one writer per change (V14:795–796) [STATED] — so a
public knowledge row draws its pin, not the trod's line, for a party that does not know the trod (at the seat, with the
country's words), and the reveal rides the party key only. A `discovered` state (the party travelled it) is your reveal
or the DM's mark; the two-writer question of the shared `party` key stands as for sites (HRQ:873) [STATED].

**The audience filter.** "Every lens opens DM-only; a row the host sends with no resolved audience is folded DM-only;
covert links, columns, patrols and the trods no party place admits fail closed — omitted, never greyed" (V13:3323–3325 as
amended, item 961 (e)); a player picture holds only the rows you resolved public (T-V13-50, V13:3745) [STATED]. The
legend carries one fixed sentence in every audience, whatever the count — *"Trods show only where a settlement is known
to use one or part of one, or the game master has revealed one; others may exist."* — and no legend row, picker state,
label, summary or export reads the count (your C4; J-V13.119).

**What the party's view can never show:** an unknown trod's line, name, length, junction tick or count; a junction ring, a junctions-export row or a
`placeOf` arm where only an unknown or unlit trod meets a road; a candidate you
have not lit, whatever its state; a trod in a crop (V14's E1 lays a trod's band only for an audience its state admits,
item 967 (c), (d)); a trod in any export the party's places do not admit; a hearing place on an unknown trod as anything
but the country it crosses; an event on an unknown trod or at its junction anywhere but the seat territory's seat with
the country's words (item 961 (b)); a count of trods laid, lit, known or revealed on any surface; your capacity band; a
patrol cadence on a trod; a quarantine line you did not send (§6). Two worlds that differ only in their unknown or unlit
trods give a byte-identical player picture, legend, picker, summary, `mapFeed` and exports, the layer on or off
(T-V13-60, item 963 (e)).

---

## §6 The lifecycle D — one ladder, and roads that join, fork or diverge

**Your rung is the trod's grade, a host fact on the map's record.** The trod carries `grade?: string` — the same field
and the same law as a road's (`grade?: string /* bound: the host's grade word, hidden among them */`, V13:788;
"mirrored, never computed", V13:1811) [STATED] — folded from your `way_rung(wayId, rung, tick)`, a `WorldEvent` of the
events window (H9) whose `where` is the trod and whose new field `grade` carries your ladder word (item 956 (g)). Your words
are yours and unenumerated by your request (REQ:35 names road, track, trail, way, wild in prose; your recorded ladder is
highway|road|track|hidden, FPI:98 [STATED]; neither `trail` nor `wild` appears as a word of your recorded grade
ladder (FPI:98, 99; TRD:636) — `wild` in your notes is the map's unclaimed land, `trail` the map's class in your mapping
rows [OBSERVED]): send them in order
through the adapter folder's grade-ladder table, bottom first, and tell the map which word your bottom usable rung
carries (`hidden`, or "way", which is taken map-side, §2). The map draws by the word's step on that ladder (§5): no rung yet,
or a word your table places below your bottom usable one, drawn for nobody; your bottom usable word the trod's thinnest
cue (0.6 px), the next word up 0.8 px, the third and above 1.0 px — never a road's cue. Under your recorded ladder that
reads `hidden` 0.6, `track` 0.8, `road` and `highway` 1.0 [INFERRED from FPI:98]; for a way to be "lost to the wild"
your table needs a word below `hidden` (your `wild`), or the way stays at `hidden`. On a standalone world no
rung exists and every trod draws as the map's own.

**What the map never does.** It never promotes, demotes, lights or retires a trod on its own (REQ:35 d4): no `network`
change word names one (the closed list chartered, promoted, demoted, abandoned, revived, facet, bypass, retract,
V13:886) [STATED], the refusal `refuse.world.hostRoute` that keeps the map off a host road's grade (V13:1817) covers a
trod's grade too, and the map lays no road from a rung event. **A trod stays a trod at every rung**, drawn by its grade:
at your `trail`, `track` or `road` word it is a heavier trod, still no public route — because the map's `trail` is a
public route to every reader of roads (an approach joins "a public land route of any class … highway > road > track >
trail", V13:1839–1840; the cost surface discounts every public route's cells, V13:1763; a trail enters a frame as a
`path`, V13:762) [STATED], and a trod made a `WorldRoute` by a word would be an approach target, a road-forming
attractor and a charter road with no key, no leg and no time of yours.

**How a trod meets a road in time — the organic path, now lawful.** When a trod has risen in your ledger to where you
want the map's road machinery for it (legs, approaches, patrols, charter roads, `routeFacts`, the discount), **charter a
road between the trod's two junctions with the trod's course as the `via` hint** — `chartered` is the one change that
lays geometry, "its course hint honoured" (V13:1811–1812) [STATED], and by the owner's word of 2026-10-19 a charter may
end at a junction (§1 Q1; item 972). The map lays the road along the course, with your key and your grade, and the trod
is superseded: tombstoned, its junctions kept as the road's ends and its arms, and your rung
and knowledge rows for it stand as dated facts of a tombstoned trod, nothing to retract (W7 (13) (g), as the first
reply wrote it: "a road born along a trod supersedes it"). A road you charter
**across** a trod adds a `crossing` junction and leaves the course byte-identical. Nothing runs the other way: a road
that decays stays a road at your `hidden` word (next paragraph), and the map mints no trod where one dies — under one
ladder there is nothing to mint, the decayed road *is* the way.

**A decayed road under the trod rule (your "an abandoned road decays through track and trail into a way").** A road you
grade `hidden` keeps its record whole — "a demotion keeps the polyline; a revival restores the hidden one" (V13:1813)
[STATED]; its key, stations and lay versions untouched, no new field on `WorldRoute` — and is **drawn under the trod
rule**: its ghost for the DM stays the routes layer's (V13:3144); your knowledge events name it by `where: { kind:
'road', edge }` (V13:887 has both already) [STATED] and draw the knowing town's pin and its lapse exactly as on a trod;
your reveal through the party's places (the edge key a place's address, V14:791–796) admits it for a player, drawn by
the `trods` layer as a trod at the first step (the trod cue, never a road's, in the `broad` tint; the layer's
toggle and export rule — a party export carries it as a trod row of kind `road` with no class or grade word, never as
a routes row) — the
road reads `secret` while hidden, a knowledge event naming it with no fraction is placed at its midpoint vertex, and a
revival restores `public` (items 956 (f), (i), 961 (a), (b), 974 (a)); patrols none (V13:1163, 2065) and "a hidden road counts as no
public road" (V13:1819) [STATED], as today. Its junctions stay: a trod joined to a road you demote keeps its junction;
one joined to a road you remove or re-lay (a `bypass`, V13:1813–1815) re-joins the lay in force within `rejoinM`, keeping
its id (identity by its seed cell, §3.8 of the draft), else is tombstoned and reported `W_TROD_UNJOINED`. A road you
revive comes back as a road at the grade you send; the knowledge rows for it stand, read by the same rule.

**Candidates (your Q8).** Every trod W7 (13) lays is a candidate with no rung until you light it — in the record,
drawn for nobody (§1 Q8, §5). "A way nobody walks is lost to the wild" is your `way_rung` to a word below your bottom usable one (your `wild`): the
record keeps it, the picture drops it, and a later lighting draws it again with every knowledge row that still stands
read by the latest-per-town rule. The map never retires a candidate: a trod leaves the record only when the ground
changes under it (a frame or a reach cutting its patch, a joined route removed beyond `rejoinM`) or a road is chartered
along it.

**Roads that join, fork or diverge (the owner's word of 2026-10-19; items 970–975).** A route's two ends are each a
settlement or a `WorldJunction` (§3.2). On your world, **you make them**: a genesis edge or a charter may name a junction
end — `{ route: hostKey; stationM }` on one of your own edges, or `{ at }` a world point the map snaps to the nearest
public route within `routeToleranceM` (60 m, V13:1135) and refuses (`refuse.world.junctionEnd`) where none lies within
it; the charter's `via` hint stands (V13:886) [STATED] — and the map lays the road to the junction as it lays an
approach road (V13:1846–1852: the A\* to the joined route's nearest cell, the junction its polyline point, the joined
route byte-identical) [STATED]. The map asks you to **derive forks where appropriate**, in the owner's words
"apropriately and organically": a village joining the nearest trunk road at a junction rather than laying its own road
to the city; a road along a worn trod between its two junctions (the paragraph above). A junction-ended road is no leg
of your `timeDelta` (legs are seat pairs, V13:888) [STATED]: you compose your own times over your network, as you do
today (V13:1797–1802). On a standalone world the map's own selection gains the **fork rule**, W7 (14): before a pair's
road is laid, one search from the seat not yet on a road to the routes in force finds the nearest junction and
the cost round by the network; where that is within `fork.detourMax` (1.25) of the seat's own road and the join leg within `fork.joinMaxM`
(30 km), the seat gets the join only — its road ending at a junction (shared within `fork.junctionSpacingM`, 3 km) —
else its own road (a pair whose two seats are both already on roads gets its own road only when the way round by the
network exceeds the bound, else none: never a zero-length road; whichever seat the pair names first, the one not yet on
a road is the one that forks); the unjoined seat's trail (V13:1792–1793) is the same rule with no bound, its far
end typed at last. The standalone fork rule lays seat-to-junction roads only: a junction-to-junction link is your charter
(both ends junctions) or a worn trod's road — the map's own selection mints none.
Every cell own, in `world.routeLay`. **The consequences by origin:** a road of yours ending at a junction keeps its
geometry whatever becomes of the joined road — demoted, the junction stays and the hidden joined road is a ghost, the
fork's own grade its own; removed, the junction keeps its point on the last lay (kept as a version) and the map reports
`W_ROUTE_JUNCTION_ORPHAN` and waits for your charter — because nothing moves a bound route silently (V13:1821–1826) and
no host edge is the map's to re-lay (V13:1811, 1817) [STATED]; the map's own junction-ended roads (an approach road, a
standalone fork) re-join as the approach road does today (V13:1860–1861) [STATED]. Sites and proposals stay positions
along a route, never ends (V13:1827–1829) [STATED]. A junction is a typed place for your hearing card already (§3.7);
the routes layer draws a junction mark and the legend names it (item 974). The record change is additive and
versioned: `RouteGenesis.lawVersion` moves and an older genesis (seat strings only) folds as before.

**Detours (ENC-HL-10):** "the map offers no detour either" (HRQ:653) is behind the volume — W7 (9) re-lays
your `bypass` as a dated lay version under the same key (V13:1813–1815; T-V13-41 (u)) [STATED]; the map still offers no
detour *of its own*, and a trod is never a detour (item 968 (g)).

**Quarantine (behaviour 6).** The map draws no quarantine line today (the plague lens refuses "a quarantine line",
V13:3385; the patrols lens "a patrol drawn … holding a quarantine line", V13:3428) [STATED], and the refusals stand
verbatim: you have no quarantine or gate-closure verb (PLG:556, 798–799) and plague-R7 is an open owner ruling (HRQ:481)
[STATED]. When the verb exists and a closure arrives as a host-stored dated fact naming *which* gate (a town gate or a
border crossing, never bare, V13:3317–3318), the plague lens may gain a closure element then; a trod draws **unchanged**
across it, is never drawn as its bypass and never carries a plague (item 961 (f); J-V13.128). "Your lens can draw it when
lit" is admissible exactly then, and never as a patrol holding a line.

---

## §7 The milestone that carries A and C, and the H rows

**M-W2** (re-declared 8 → 10 pw; the staged row 39–47 pw) carries: W7 (13) "W7c Trods" after W7b; the `Trod` record with
its `grade` and the one junction record `WorldJunction` shared with routes; the `trods` raster layer; the trod record
`trods` (the simulator feed's third optional product, every candidate in it); `routeFacts`' ordered stretches (B); the
`trods` view layer with V14's three states, the DM's reveal and the drawing by grade; the `trod` and `junction` places
with `asFarAs`; the fold of your three event kinds (knowledge, forgetting, rung) as the latest per (town, trod) and per
trod; `hostOverlay`'s movers on trods; the route record's junction ends, your genesis's and charters' junction-end
forms, W7 (14)'s fork rule and the routes layer's junction mark; T-V13-59, T-V13-60 and T-V13-61 (items 964, 975). It
waits on M-W1 (the canon, the events window). The trods and their folds are ≈ 1 pw; the junction ends and the fork rule
≈ 1 pw (the record's ends and `WorldJunction` are the trod's junction model shared, so the cost is the two port forms,
the lay's end case, the fork step and its test) [INFERRED]. **No ninth lens** is in file w: the knowing town's mark is the
`events` layer's pin; the bodies' marks over the trods are rows of D-V13.8's danger lens, a later row set of M-W5 that
no prerequisite of yours names.

**The H rows you add (item 968):** one new row, **H32** — in the M-W2 table after H22 and in the summary table after
H17 — with M-W2, waiting on H9, H12 and H17: (a) a town's knowledge of a trod sent as the events-window row above, with
any how-word (`office` among them), and its lapse as `way_forgotten` in the same channel — the map reads the latest row
per (town, trod); (b) every engagement on a trod or at a junction with its `where` naming the trod or the junction; (c)
your movers on trods by the trod's id and a fraction — in the presentation messages (H17), or, where you keep the
week's presence as a ledger, as rows of the lens window (H23): your choice, said once (the request's "presence rows
(H23)" are, in your own document, H17's movers (HRQ:83, 577) while H23 carries the lens window's ledger rows (HRQ:102)
[STATED]; the map offers both channels rather than correct you on an inference); (d) a watch on a trod, where you keep
one, as a dated event (never a map cadence); (e) your reader of the trod record behind your own switch, requested between
advances and baked with its stamp, kept beside your frozen digest (at 2 000 trods it is the size of the digest cap,
HRQ:912); (f) your register rows for `trod`, `junction`, `goat`, `drove`, `broad`, your ladder words kept as grades,
`way` minted on neither side; (g) your stand-in cover graph over `routeFacts`' stretches retired when (e) lands; (h) your
reveal of a trod to the party through the party's places, as a site's, whole or as far as a station; (i) **your rung
changes as `way_rung` in the events window**, the ladder's words in order in the adapter folder's grade-ladder table,
your bottom usable word named, a candidate the map laid lit by its first rung and nothing minted; (j) **junction ends** in your
genesis edges and your charters by the two forms above, and forks derived where appropriate, a worn trod chartered
along its course when you want the map's road machinery. H32's number is the row's, never the kernel's `H32` hash
(V13:1384, 3664) [OBSERVED]; your own H list ends at H30 (HRQ:86–110) and the volume's at H31 (V13:3906), so the new
row is H32 [OBSERVED]. **H9 carries three event kinds** (`way_known`, `way_forgotten`, `way_rung`) with no change to its
own text; **H12** keeps its text ("route changes and grades per window", V13:3887) and its records gain the junction-end
forms (`RouteGenesis.edges[].a/b`, `NetworkChange.ends`); nothing of H13 or H17 changes shape: the mover an existing
grammar with a trod id, the hearing place two `WorldWhere` kinds.

---

## §8 The budget answer for 200–2 000 trods per province — every candidate

Stated for the `province` size rung (320 × 200 km at 250 m, V13:1037) [STATED]; "province" is read as that rung, the
binding case being a continent at the same density [INFERRED]. "Every candidate" is the asked count (§3.6): the figures
below are the same set as the first reply's, with the lay time corrected.

| | 200 trods | 2 000 trods | the law |
|---|---|---|---|
| in the file | ≈ 4 KB | ≤ 40 KB | only secret states that are not `dmOnly` (≈ 20 B each); the trods rebuilt on load by W7 (13) replayed over the routes' lay versions (V13:1361–1362's pattern); your rung, knowledge and forgetting rows are events in the recorded events store, never on the trod |
| in memory | ≈ 0.07 MB | ≈ 0.7 MB | ≈ 350 B per 10 km trod (a header, a delta-coded polyline at one vertex per 250–500 m, run-length classes, a shared junction, a grade word); the continent's ≈ 7 200 ≈ 2.5 MB inside `WORLD-5` |
| lay time at generation and on load | ≈ 12 ms | ≈ 26 ms (budget 30 ms) | ≤ 10 ns × fine cells (the rough pass: ≈ 10 ms over the province rung's 1.02 × 10⁶ fine cells) + 8 ns × Σ ellipse cells (a 10 km trod's ellipse ≈ 960 cells at the trod's `maxCostFactor` 3 — a quarter of a route's at 6: 7.7 µs a trod); the §6 row re-declared 30 / 60 / 120 ms at province / realm / continent (the first reply's 25 / 50 / 100 omitted the rough pass), the totals 760 / 2 960 / 6 820 ms inside the re-declared 900 / 3 000 / 7 000 (V13:3594–3597) |
| the trod record, on your side | ≈ 40 KB | ≈ 410 KB uncompressed | ≈ 2 000 × (60 B + 6 runs × 12 B) + 2 500 junctions × 60 B — the size of your frozen-digest cap of 400 000 bytes (HRQ:912): keep it beside the digest; every candidate is in it, lit or not |

So nothing in the map's document budget moves (the province stays ≤ 3 MB, the realm ≤ 11, the continent ≤ 24, V13:1359–1360);
the budget register gains `WORLD-18` (W7c inside its row per rung — 30 / 60 / 120 ms; one trod's re-lay ≤ 5 ms; the
record ≤ 300 ms at the continent; the trods' memory ≤ 4 MB at the continent; nothing of a trod in the file but its secret
states, item 962 (c)). The fork rule's search (one Dijkstra from a seat to the routes in force, the trail rule's cost,
V13:1793, plus a search over the laid routes' cells) is a term of the W7a + W7b row — 8 ns × the cells its searches touch per
seat — the row's figures PLAUSIBLE until the spike's rerun counts it (item 962 (a)) [INFERRED]. Two things noticed in
passing, outside this request: the volume's own records figures conflict (10⁵ records × ≈ 120 B is 12 MB, not "inside
the 2 MB", V13:1352–1354) [OBSERVED arithmetic] — for the map's fix list; and your document's V13 line numbers for H9,
H16 and H23 (HRQ:68, 82, 102) have drifted (now V13:3884, 3891, 3898) [OBSERVED].

---

## §9 Open points for the owner, and what the host side should record now

### 9.1 The one owner decision (V13 §11 Q5, item 966 (c); every other ruling is the session's, vetoable)

**Q5 — the price, the bodies chain's order and the trod record's door.** The design costs M-W2 ≈ 2 pw more (8 → 10 pw:
the trods ≈ 1, the junction ends and the fork rule the owner's word of 2026-10-19 asked for ≈ 1) and widens the staged
row to 39–47; the host's bodies chain may wait on M-W2 (after M-SF and M-W1) or build its stand-in cover graph first from
`routeFacts`' stretches and retire it when the record lands; and the trod record reaches the host as the simulator feed's
third optional product rather than a canon slot (§3.8), under the owner's door-1 answer that named the canon.
*Recommendation:* accept the price and name M-W2; build the stand-in from the stretches meanwhile (they land with the same
milestone's `routeFacts` and change no simulated byte until read); confirm the product reading — if the owner holds to a
slot, it needs the host's automatic receipted re-canonize after the genesis mount (J388's pattern), which H32 would then
say.

Not put to the owner, and why: the owner's word of 2026-10-19 is the owner's own law, already given, and the way the map
obeys it — the junction generalization, the fork rule's cells, a trod's grade, the lapse fold and the partial drawing —
is the session's, vetoable; the word (`trod`) is a map term settled under the delegation, vetoable (J-V13.114; you
asked the map to pick one if "way" was in use, REQ:10); your ladder's words, `wild` included, are yours to name; the
quarantine closure's carrier is already your open ruling plague-R7 (HRQ:481); whether a small military unit may take a
trod, whether the smuggling roll moves onto trods and whether a patrol can catch a body on one are your rules against
your own recorded facts (§9.3), not map capabilities.

### 9.2 What the host side should record now

- A fold inbox row: ENC-HL-12 answered from the map — the trods, the record, M-W2 (item 968 (j)); ENC-HP-09's T2 supplied
  from M-W2 as the fallback's dependency (item 968 (f)); ENC-HP-13's ladder now one ladder with the trods at its bottom,
  the map drawing by your grade and moving nothing.
- The prerequisite line on the bodies chain: **M-W2** (with your own H9, H12, H17 and H32).
- The tokens: `trod`, `junction`, `goat`, `drove`, `broad` registered as the map's words; `hidden` and your other ladder
  words kept as your grades, sent in order (bottom first) through the adapter folder's grade-ladder table, the bottom
  usable word named; `way` on neither side; `rung` your word, `grade` the map's for it.
- The three event kinds in your events window's table and the adapter folder's event table: `way_known` (a `WorldEvent`
  whose `where` is a trod, whole or `asFarAs`; its how-word in `cause`), `way_forgotten` (the same `where`, no how-word
  needed), `way_rung` (the same `where`, your ladder word in `grade`); the two `WorldWhere` kinds in your engagement
  registry when the hearing week is built (HRQ:656).
- The junction-end forms in your genesis and your charters — `{ route: key; stationM }` or `{ at }` — and your own rule
  for deriving forks where appropriate; a worn trod chartered between its junctions with its course as the hint.
- Which channel carries a body's presence on a trod: H17's mover or H23's ledger row (§7 (c)).
- The trod record kept beside the frozen digest, not inside it (§8); every candidate in it.

### 9.3 Things the request assumes that the recorded facts do not say (stated back, not designed against)

1. "A small military unit may take one" (REQ:15): the recorded rule is M4's "armies may not" (FPI:159) and ENC-HL-12's
   "never armies" (HRQ:655) [STATED] — a changed host rule; the map's record is neutral (no class word, a derivable band).
2. "The existing smuggling gauntlet moves onto them" (REQ:15): the recorded smuggling is one roll at the route's worst gate
   on shipments with no path (TRD:565–568, 179) [STATED]; moving it onto trods is your change, and a trod's territorial
   crossings would then need naming (today crossings are per seat pair in the travel slot, V13:796).
3. "A patrol catches a body on it" (REQ:17) needs a patrol rule you do not have (HRQ:711; LNS:371) [STATED]; the map's
   cadence is map-only (J396) and rides no trod, so "coverage zero on an unknown way" holds by construction.
4. "The host's snapshot hard-deny already hides its spatial ledgers" (REQ:17) is not a recorded fact: the recorded allowlist is
   `pantheon` alone (FTH:435–436) [STATED]; it follows by inference, a day-one confirmation on your side.
5. "H16 stays your inbound door" (REQ:11): H16 is your optional reading of the map's offers (HRQ:576) [STATED]; the trod
   ids reach you in the trod record, not by H16.
6. "The week's presence rows (H23)" (REQ:11): see §7 (c).
7. "`hidden` for the class" (REQ:10): two meanings of one word on both sides (§2); the class word is `trod`.
8. "An abandoned road decays through track and trail into a way … rises to a trail" (REQ:35): your recorded ladder is
   `highway|road|track|hidden` (FPI:98) with "never absence" (FPI:99) [STATED]; neither `trail` nor `wild` appears as a word of
   your recorded grade ladder (FPI:98, 99; TRD:636) — `wild` in your notes is the map's unclaimed land, `trail` the map's
   class in your mapping rows [OBSERVED] — the map takes the words from your grade-ladder table, whatever they are, and asks which is the
   bottom usable one.
9. "A way nobody walks is lost to the wild" (REQ:35) against "NOTHING IS FORGOTTEN" (FPI:159) [STATED]: read as a rung
   change to a word below your bottom usable one, not a deletion — the map keeps the candidate and every row for it.
10. "The map returns that way to undrawn for that town" (REQ:33): a town's knowledge never drew the trod's line for the
    party in the first place (§5, J-V13.118); what lapses is the knowing town's pin, and the DM's and your reveals are
    apart.

*Status:* written 2026-10-19 by hidden-ways/synthesis and revised the same day by hidden-ways/synthesis-2 for the host's
corrected request and the owner's word of 2026-10-19 (J415, J416), from the lane's readers, designs, judges and the
correction's delta record (`docs/validation/hidden-ways-2026-10-18/`); the design is draft w, pending the owner's look;
nothing applied; no git run.
