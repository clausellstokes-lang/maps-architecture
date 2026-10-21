# hidden-ways / design-B — HOST-FIRST: the smallest map record and events contract that serves the host's six behaviours (2026-10-18)

**Seat:** designer `hidden-ways/design-B` (Fable/xhigh), workflow hidden-ways-design (J407), under J404's delegation
("Decisions and judgment to you"); every ruling below is vetoable. **Angle:** host-first — start from what the host will
do with the ways (bodies by stance, the capacity band, knowledge per town, ambush junctions, hearings, the quarantine
line) and from its fallback B, design the smallest record and events contract that serves those six exactly, then the
lens and the reveal, then the generator. **Applies nothing; ran no git.**

**Inputs read whole:** the owner's upload (byte-identical to `docs/host-requests/2026-10-18-hidden-ways.md`, 47 lines,
md5 `251c96a9…`; cited `HR:n`); the five reader records `read-request.md`, `read-host.md`, `read-v13-routes.md`,
`read-v13-lenses.md`, `read-v14-base.md` (each whole); the volumes at the passages cited — `docs/volumes/V13-world.md`
(`V13:n`; 4 611 lines, md5 `e68af748638dd3c8474d21b37005c7ac`), `docs/volumes/V14-sites.md` (`V14:n`; md5
`f5dd37a7e9b739da7f29095d47a17a87`), `docs/ARCHITECTURE.md` (`BASE:n`; md5 `eac3a6a5ee2c58534185318949ebd8ba`),
`docs/HOST-REQUIREMENTS-2026-10-18.md` (`HRQ:n`; md5 `7db37cc1a4e03fc8db665c1be9d55211`), `docs/volumes/INDEX.md`
(`10a72c97…`), `docs/volumes/SUMMARY.md` (`1c0ada29…`). Host facts are cited only from `research/sf/*.md` (`FPI:n` =
`fp-physical-integration.md`, `FPS:n` = `fp-simulator.md`, `TRD:n` = `trade-system.md`, `PLG:n` = `plague-system.md`,
`LNS:n` = `lens-implications.md`, `POP:n` = `population-system.md`, `FTH:n` = `faith-system.md`, `FRR:n` =
`fp-realm-review.md`) and from HRQ; no host code was read or copied. **Tags:** [STATED] the cited text says it;
[OBSERVED] checked in the repository by this seat; [INFERRED] this seat's reading or proposal.

**The word used in this record.** The host's "way" collides (§0 Q0); this record writes **trod** for the host's "hidden
way" throughout, and every new text in §2 mints that word. **Clean room:** the texts of §2 that enter V13, V14, the base
and the index name host facts only by the port's field names and the adapter folder's tables; host document names,
ruling ids and research citations stay in the Evidence lines.

---

## §0 The answers

**Q0 — the word (HR:10: "If you already use 'way' for something, say so and we pick another word").** The map uses
*way* already, in all three documents: the base's settlement-frame skeleton `type WayClass = 'through'|'primary'|…|
'ford'|'aqueduct'` and `interface Way { … from: NodeRef; to: NodeRef … }` (BASE:1093–1103) [STATED]; V13's charter road
row `class: WayClass /* a world class mapped to §2.4's: highway → through, road → primary, track → track, trail → path */`
(V13:762) and the glyph mark kind `'way'` (V13:803) [STATED]; V14's "way bands" (V14:424, 2100), "way corridor"
(V14:2052), "raised way" (V14:2309) and J393's "one way of its `WayClass`" to a site's gate (V14:1799–1800) [STATED].
A world route that crosses a frame's ring becomes a base `Way` (V13:2277), so a world record called "way" would meet a
frame record called `Way` at every ring crossing [INFERRED]. **"hidden" is not free either:** V13 already reads it as
the host's grade of an overt host road — `grade?: string /* … the host's grade word, hidden among them */` (V13:788), "a
hidden land road is a DM-only ghost … a hidden road counts as no public road" (V13:1815–1820), patrols "(hidden: none)"
(V13:1163) [STATED] — and the host's own ledger ties that rung to decay: "grade ladder down to `hidden`, never absence"
(FPI:99), M4's "the dangerous goods take the overgrown road" (FPI:159) [STATED]; the request itself keeps the two apart
("a road that decays to 'overgrown' … does not become a way", HR:35). **The free word: `trod`** — 0 whole-word hits in
V13, V14, the base, V08, `research/` and `plat/` [OBSERVED: `grep -rIliw` finds it only in this lane's own records and
log]; plain English for a narrow path worn by feet and beasts (the northern "smugglers' trods"), which is the thing
asked for. Checked and rejected: *byway* (free in the landed texts, but the sites-roads design B's rejected name for the
overt approach road, `docs/validation/sites-roads-2026-10-18/design-B.md:25–144`, and in plain English a minor public
road) [OBSERVED]; *trace* (`TerrainTrace`, `SurfaceTrace`, `SwayTrace`, V13:832–833, 883) [OBSERVED]; *path*, *track*,
*trail*, *lane* (`WayClass` values, BASE:1093; `trail` and `track` route classes, V13:788; `lane` three senses, V13:790,
3144) [OBSERVED]; *pass*, *cut*, *run*, *ride*, *covert* (V13:2090, 2946, 1786, 2082) [OBSERVED]; *drove*, *holloway*
(free, but better as width/kind values — §1.4) [INFERRED]. **The class word:** the record kind *is* `Trod`; it carries
no `kind: 'hidden'` and no route class; `hidden` keeps its one meaning (the host's grade of a decayed overt road, drawn
DM-only); the host's four prose kinds become the map's own kind words `goat`, `drove`, `holloway`, `game` (§1.4). The
port-side name of the host's `way_known(settlementId, wayId, how, tick)` is not a map token at all: it is a `WorldEvent`
whose `kind` is the host's own knowledge word through the adapter folder's event table (§1.8).

**Q1 — Can a route endpoint be a non-settlement junction today? If not, what milestone adds it?** Not for a host
route: "On a host-bound world every host route ends at two host settlements; a site, a proposal or a junction is a
position along a route, never an end of a host route (the map's own approach road, (12), ends at it)" (V13:1827–1828)
[STATED]. One record ends at a junction today, at one end only: the approach road's `join?: { route: Id; atCm:
WorldPointCm } /* an approach road only: its junction — the joined route's polyline point it ends at */` (V13:786),
laid "ending at the **junction** (the joined route's polyline point nearest the path's last cell)" (V13:1850), keyless
and "in no `canon` slot, `routeFacts` row, `patrolOffer` row or `routes(world)`'s host list" (V13:1871–1873) [STATED].
So the junction *model* exists (a point on a route's polyline, the route byte-identical) and the two-junction *record*
does not [INFERRED]. This design adds it as a record of its own — `Trod` with `TrodJunction` ends (§1.2), never a
`WorldRoute` — laid by a new W7 step (13), with **M-W2**, which already carries W7, the approaches, `routeFacts` and
`mapFeed` (V13:3814) [STATED]. No host route gains a junction end; the host's legs still end at settlements.

**Q2 — Does the port already carry per-stretch ground classes (T2)?** The *record* does: `WorldRoute.vertexClass:
Uint8Array /* per segment: the host's terrain class through the adapter folder's table */` and `byClassM` (V13:790–791),
evaluated on the final polyline with the per-vertex `stations` (V13:1800–1802) [STATED], since amendments m item 689
(`docs/AMENDMENTS-2026-10-17m.md:543`) [OBSERVED]. The *simulator feed* does not: `routeFacts` sends "the per-class
effort" — totals per class — "never `costTotal`" (V13:2484–2485) [STATED], and the ordered classes ride only
`routes(world)`, the map feed, "never read by a step of its simulation" (V13:2438–2439) [STATED]. So B is a **port
change, not new generation**: `routeFacts` gains each host edge's ordered stretches (a run of one class: integer
metres, integer effort-metres, the class word), a reading over `stations` and `vertexClass`, never a field of its own
(§1.3), with M-W2. The host's own rows are behind V13 on this: ledger T2 "no terrain-class breakdown per segment —
MISSING" (FPI:394) and HRQ:606, HRQ:625 say the same; the note read V13 at 2 988 lines (FPI:484) [OBSERVED]. "Needs T2"
is the ledger's row T2 (FPI:58), not V13's terrain tool T2 (V13:573–576) [OBSERVED].

**Q3 — Which route class means "not for armies or caravans"; is `trail` that, or is `hidden` a seventh class?**
Neither. `trail` is a rank rule — "every seat still unjoined after the passes gets a `trail` to its nearest routed cell"
(V13:1792) — and a public route of the lowest class ("highway > road > track > trail", V13:1840; a watchpost at a trail's
crossing, V13:2090; `trail → path` into a frame, V13:762) [STATED]; no V13 sentence restricts who uses a trail
[OBSERVED]. `hidden` is a host *grade* on a bound route, not a class ("`class: 'highway'|'road'|'track'|'trail'|'sea'|
'river'`; `grade?: string /* … hidden among them */`", V13:788) [STATED]. A trod is a **record of its own kind**
(§1.2), outside `WorldRoute.class`: no host key, no leg, no seat end, no patrol cadence, no `existingRoute` discount, no
charter road, no border post, no continuity (§1.9). Who may walk it is the host's stance rule (HR:15), never a class
word of the map.

**Q4 — Can the record express a width/kind hint, or should the host derive capacity from ground class alone?** It
can and does: `Trod.kind: 'goat'|'drove'|'holloway'|'game'`, one of four rows of a new rule table `world.trod` whose
`kinds` rows carry an integer `widthM` each (§1.4), chosen by W7c from the laid path's ground (slope p95, dominant land
use, length) deterministically. The trod record the host reads (`trods`, §1.6) carries the kind word per trod *and* the
kind table's width cells once in its envelope, so the host derives its size band from (kind, width, the stretches'
classes) by its own law — the map records no band and simulates none (HR:16's "we are not asking you to simulate it").
No land route carries a width today; the only width-like facts are water-edge limits offered on request (V13:2485–2487)
[STATED].

**Q5 — Who owns "known per town"?** The host, as it prefers (HR:42): a dated host fact through the events window (H9),
drawn and never decided by the map. V13's rules decide it: "Host facts carry the host's resolved audience … a fact the
host hides is never sent; a host fact arriving with no resolved audience is stored DM-only" (V13:960–963) [STATED], and
port law (3) "truth only — no believed fact enters or leaves the canon" (V13:2578–2579) [STATED], so no knowledge flag
sits on the record and none enters any canon product. The map holds exactly one thing of its own on a trod: the party's
secret state, V14's `SecretState` reused verbatim (`dmOnly` | `revealed` | `discovered`, V14:763–766) [STATED], set by
the DM's `setAttr` or the host's reveal through the party's places (V08 §3.14; the shared `party` key, V14:797–802)
— the site precedent the request names (HR:17). The legend's "never how many" is written as a lens refusal (§1.7).

**Q6 — Which milestone carries A and C?** **A — M-W2** (V13:3814): W7 (13) after W7b, the `Trod` and `TrodJunction`
records, the `trods` simulator product, `routeFacts`' stretches (B), the `trods` layer with its secret states and the
DM's reveal, the `trod` and `junction` places, the knowledge events' fold. **C** splits: the reveal (the three states,
the party's places, the audience filter, the count-free leak test) is **M-W2**'s with the layer; the host's marks over
the trods (the knowing seats' pips, the watches, the fixed legend sentence, `lensWhy`) are **M-W5**'s ninth lens step,
after the patrols (V13:3816's pattern: "M-W2's layers reconciled to the record") [INFERRED]. The prerequisite the host
should list for its bodies chain is **M-W2** alone, plus its own H9, H12 and H17 and the new row **H32** (§1.16); the
lens step adds no fact the host's simulation reads. Prices: M-W2 8 → 9 pw, M-W5 unchanged (the step ≈ 0.25 pw, below
the row's resolution), the staged row 37–45 → 38–46 pw (§1.12).

**Q7 — Does the size budget change for 200–2 000 ways per province?** No, because **generated trods are never written
to the file**: W7c is deterministic and drawless, so the trods are rebuilt on load (the §2.7 pattern already used for
the recomputable rasters, V13:1361–1362) and their reasons are computed on demand as a cell's is (`whyCell`,
V13:829–830) [STATED]; only each trod's secret state (when not `dmOnly`) is a record. At rest a province adds ≤ 40 KB
for 2 000 trods; in memory ≈ 350 B per trod (≈ 0.7 MB at 2 000), and the W7c time is ≈ 61 ms at the province rung
(§1.11). Had they been stored, 2 000 trods at ≈ 350 B would take ≈ 93 % of the province's 0.75 MB record headroom and
the same density on a continent would break the 24 MB budget (§1.11) — which is why they are not. The host's own cap
matters more: the trod record at 2 000 trods is ≈ 400 KB uncompressed, the size of its whole frozen digest cap
(HRQ:840) [STATED], so the host stores it beside its digest, not inside (H32).

---

## §1 The design

### 1.0 Host-first: the six behaviours and the smallest map piece each needs

| the host will… (HR:15–20) | the map piece, and nothing more | where |
|---|---|---|
| 1. route bodies by stance: tolerated on the road, hunted on the trods; a small unit slowly; caravans never; a smuggler's run | a trod **graph** the host can put in its one graph as edge types (its law 2, HRQ:663): junction ids on its own route keys with an integer station, trod ids between them, integer effort and ordered stretches with its terrain classes — the trod record `trods` (§1.6). Who takes a trod is the host's; the map carries no stance, no class word, no "never armies" | §1.2, §1.6 |
| 2. a capacity band per way, derivable | the kind word per trod and the kind table's `widthM` once in the record's envelope; the stretches' classes beside them. No band recorded, none simulated | §1.4, §1.6 |
| 3. knowledge per town, the host's; the map draws only when a town knows or the DM reveals; no party leak | a dated host event per (trod, seat) through H9 with its resolved audience; the party's `SecretState` on the trod; the audience filter fail-closed; one count-free legend sentence | §1.7, §1.8 |
| 4. ambush points are junctions, topological | `TrodJunction { route key, stationM, arms }` in the record; nothing sight-related on it; a junction added where a road is chartered across a trod | §1.2, §1.5 (7) |
| 5. every engagement a hearing with a place the map can name | `WorldWhere.kind` gains `trod` (id + fraction) and `junction` (id); `placeOf` names them for the DM, and only the country it crosses for an audience that does not know the trod | §1.2, §1.8 |
| 6. a quarantine closure stops the road, not the way; "your lens can draw it when lit" | the refusal stands until the host's verb exists; then a host-stored closure naming its gate, drawn as stored; the trod drawn unchanged across it; a gated legend note | §1.10 |
| B. the fallback cover graph from ground classes between route junctions | `routeFacts`' ordered stretches per host edge, with M-W2; the stand-in graph is the host's own, never drawn by the map | §1.3 |

### 1.1 The words

- **trod** — a hidden edge of the map's own geography; plural *trods*; its ends *junctions*; its kinds `goat`, `drove`,
  `holloway`, `game`. Added to V13 §3.11.6's law (9) and to `world.lens`'s collision rows (§2: B-10, B-27).
- **hidden** — the host's grade of an overt host road, only (V13:788, 1815–1820); a trod is never graded, a hidden road
  never a trod (§1.9). Added to the collision rows beside *way*.
- **junction** — on the world, a point on a route's polyline where a trod ends or crosses (V13:1850's sense; the base's
  `Junction` is a frame-arena vertex, BASE:1105–1106 — two scales, one meaning each, as *junction* already is today).
- **mover** — the host's word in V13 for a thing it clocks on an edge (`hostOverlay`: "movers on host edges by
  fraction", V13:2558); a gang, conclave or beast group on a trod is a mover on a trod. The host's "bodies" is not a map
  token: *body* is a water body in V13 (V13:755, 851, 852) [OBSERVED]; "band" is a rung word (force band, size band).

### 1.2 The records (V13 §2.2)

Inserted after `SiteApproach` (V13:841), before the port's records (§2: B-3):

```ts
interface Trod {                             // W7 (13); file w: a hidden edge of the map's own geography — never a WorldRoute, never a host edge
  id: Id; a: Id; b: Id /* its two ends: TrodJunction ids — a point on a public land route's polyline, shared with another trod where two meet; never a seat id, never a host key */;
  kind: 'goat'|'drove'|'holloway'|'game' /* the width/kind word, world.trod's kind rows (V13 §2.3), chosen by W7 (13) from the laid path's ground; the host derives its size band from it, the row's widthM and the stretches' classes */;
  polyline: WorldPointCm[]; stations: Int32Array /* per vertex: cumulative effort-metres from `a` under the cost law's time terms */; vertexClass: Uint8Array /* per segment: the host's terrain class through the adapter folder's class table */;
  lengthM: number; effortM: number /* integers */; roughShare: number /* the share of its length in rough country (world.trod's rough rows), 0–1: the clerk's and the reason's */; layVersion: number /* bumped by every re-lay; the former course kept as a version */;
  secret: SecretState /* V14 §2.3's three states, the record's only map-owned knowledge: dmOnly at birth; revealed by the DM's setAttr on trod/secret/state or the host's reveal through the party's places; discovered by the host's event or the DM's mark — the party's places hold the trod's id as a place's */;
  reason: Id /* computed on demand (whyTrod, V13 §4.7), never stored: a generated trod is rebuilt on load (V13 §2.7) */ }
interface TrodJunction { id: Id; at: WorldPointCm /* a point on the route's polyline */; route: { id: Id; hostKey?: string /* bound: the host's edge key */; stationM: number /* integer effort-metres from the route's `a` */ };
  arms: { trod: Id; stationM: number /* integer effort-metres from the trod's `a`: 0 or its effortM at an end, between at a crossing */ }[] /* sorted by trod id */;
  kind: 'end'|'crossing' /* end: a trod's end on the route; crossing: a public route chartered later across a trod's course (W7 (13) (7)) */ }
```

- **Ends off a settlement** (HR:24): both ends are junctions on the overt network — a point on a route stretch (its
  route and integer station, which the host can name), or a junction another trod already ends at (the same
  `TrodJunction`, its `arms` listing both). "A settlement's gate" is frame geometry behind door 1 (gates are frame
  terminals, V13:1829–1830; an approach road never enters a frame, V13:1848) [STATED]; a trod toward a town ends at a
  junction on the road that enters it, outside the frame's extent + margin, which is the nearest host-nameable point. A
  seat end is admitted by no field in this pass (§4).
- **Ordered stretches** (HR:25): as `WorldRoute`'s own form — `stations` and `vertexClass` per vertex and segment
  (V13:790) — so one reading (§1.3) serves routes and trods alike; "cells" are refused across the port (no raster index,
  V13:2437; FRR:529) [STATED].
- **Step cost** (HR:26): `effortM` and the stations are effort-metres under the host's cost law as handed in, the same
  unit `routeFacts` uses (V13:2484); the host prices weeks itself (law 2). Seasonal sets are not carried on a trod: the
  host's slow-not-sever law prices the season from the stretches' classes (`TravelLaw.season.terrainFactor` is per class,
  V13:858) [STATED]; nothing on a trod is ever a cut.
- **Knowledge**: none on the record but the party's `SecretState` (§1.7); per-town knowledge is the host's dated event
  (§1.8).
- **Two further record changes** (§2: B-5, B-7): `WorldWhere.kind` gains `'trod'|'junction'` with `trod?: Id;
  junction?: Id` (the hearing card's place, HR:19, 28); `WorldEvent.cause`'s comment admits "a trod's learning's"
  (the host's how-word rides the field V13 already reserves for "the host's cause word", V13:837 — one field, one
  meaning: the host's cause word through the vocabulary table).
- **Identity** (§2: B-13): a trod's creation key is (`trod`, its two junctions' keys sorted); a junction's (`junction`,
  the route's lineage, its fine cell) — so a re-lay of the route that keeps the cell keeps the junction and the trod's
  id, and one that moves it re-joins within `rejoinM` (§1.5 (7)) keeping both ids.

### 1.3 Ask B — per-stretch ground classes on the overt routes: a derived transient of the port, not a field

**Decision:** `routeFacts` gains, per host edge, `stretches: { lengthM; effortM; terrainClass }[]` ordered from `a` to
`b`, each a maximal run of one terrain class, **read at the call from the record's `stations` and `vertexClass`** (§2:
B-20). Not a new field of `WorldRoute`, because (i) the record already holds the per-segment classes and the per-vertex
stations (V13:790–791) and a run list is a pure function of them — a stored copy would be a second state to keep in
step and would enter the model digest for nothing; (ii) the simulator feed's rule admits "integers with a stated unit,
the host's closed vocabularies through the adapter folder's tables" (V13:2435–2437) and a run list is exactly that; (iii)
it lands where `routeFacts` lands, M-W2, with no generator change. The same reading serves a trod's stretches in the
trod record (§1.6). The host's stand-in cover graph "from ground classes between route junctions" (HR:31) is then the
host's own derivation over these runs — the map draws no stand-in and names none (law 10's four classes admit a
host-derived mark only as the host sends it, V13:3298–3310) [INFERRED]. The host's ledger rows T2 (FPI:394), T9
(FPI:401) and HRQ:606, 625 are corrected by this design's HRQ fragments (§2: B-H1, B-H2).

### 1.4 The rule table (V13 §2.3): `world.trod`

Inserted after `RouteLayRule` (V13:1010) and after the `routeLay` default rows (V13:1137) (§2: B-11, B-12). Every cell
`{value, unit, provenance own, calibratable}`, PLAUSIBLE until measured (V13:968–972's rule); the owner's density rule
("several per rough country (forest, hills, mountain, marsh), none across open plain", HR:29) is these parameters, which
the host can read:

```ts
interface TrodRule {                                                                                           // world.trod — W7 (13); the map's own lay rules, never the host's, never a time
  rough: { landUse: string[] /* the land uses that are rough country */; reliefM: number /* local relief over reliefWindowM that makes any ground rough (hills) */; reliefWindowM: number; patchMinKm2: number /* a rough patch below it lays no trod */ };
  density: { perRoughKm2: number /* one trod per this much rough country at the province rung's cell; scaled by (fineCellM ÷ 250)² at coarser rungs */; perPatchMax: number; junctionSpacingM: number /* candidate junctions along one route no closer than this */ };
  lay: { coverFactor: number; openFactor: number /* choice terms on the step cost: rough × coverFactor, open × openFactor — never in a time */; openShareMax: number /* a trod over more open ground than this share is dropped */; roadNearM: number; roadHugShareMax: number /* a trod within roadNearM of a public route over more than this share shadows the road and is dropped */; minStraightM: number; maxStraightM: number; rejoinM: number /* a moved junction re-joins within this */ };
  kinds: { kind: 'goat'|'drove'|'holloway'|'game'; widthM: number /* integer metres: the host derives its band from it */; slopeP95Min?: number; slopeP95Max?: number; landUse?: string[]; minLengthM?: number }[] /* first matching row names the kind; the last row has no test */ }
```

| `TrodRule` (`world.trod`: the map's own; the owner's density rule as parameters, file w) | default |
|---|---|
| `rough.landUse` / `reliefM` / `reliefWindowM` / `patchMinKm2` | forest, wetland, alpine, scrub / 120 m over 2 000 m (hills: open ground is rough where the land rises or falls 120 m within 2 km) / 2 000 / 4 km² |
| `density.perRoughKm2` / `perPatchMax` / `junctionSpacingM` | 32 km² (a province whose rough country is two fifths of 64 000 km² lays ≈ 800 trods, inside the host's 200–2 000 guess) / 12 / 3 000 |
| `lay.coverFactor` / `openFactor` / `openShareMax` / `roadNearM` / `roadHugShareMax` / `minStraightM` / `maxStraightM` / `rejoinM` | 0.5 / 4 / 0.2 (none across open plain: a trod over more than a fifth of open ground is dropped) / 500 / 0.3 / 2 000 / 40 000 / 2 × the fine cell |
| `kinds` (first match) | `goat`: slope p95 ≥ 18 % or land use alpine, width 1 m · `holloway`: slope p95 < 8 %, land use forest or scrub, length ≥ 8 000 m, width 2.5 m (an old sunken road of the map's own geography, never a decayed host road) · `drove`: slope p95 < 8 %, land use grass, scrub or tundra, width 3 m · `game`: no test, width 1 m |

### 1.5 The generation step: W7 (13), "W7c Trods" (V13 §3.8; the stage table V13:1445; §2: B-17, B-18)

Runs after W7b whole (after (12)'s approaches) on both worlds; on a host-bound world after the genesis and after each
`network` window, incrementally ((7)); **draws nothing** (`world.trod` a reserved id, as `world.siting` is, V13:2928–2929;
its tie-breaks by cell index and lineage key).

1. **Rough country.** Over the coarse grid, a cell is rough when its majority `landUse` is in `rough.landUse` or its
   local relief (max − min `dem` within `reliefWindowM`) ≥ `reliefM`; the 8-connected rough components of area ≥
   `patchMinKm2` are the **patches**, each keyed by its lowest cell index. (Transient; one `ReasonRecord` per patch.)
2. **Touch points.** For every public land route in force at the week — class any; a road the host grades hidden is no
   public road; never a water leg, never an approach road, never a trod — every polyline vertex inside a patch or within
   `roadNearM` of it is a candidate junction site, thinned along each route to one per `junctionSpacingM` (the lowest
   station in each window), keyed (route lineage, station).
3. **Candidates.** Per patch, the Urquhart graph of its touch points (the kernel's deterministic triangulation over
   integer metres, as W7 (3)); an edge is a candidate when its straight length lies in [`minStraightM`, `maxStraightM`]
   and its two points are on different routes, or on one route at least 3 × `junctionSpacingM` apart by station; ranked
   by straight length ascending, ties by the sorted junction keys; the first min(`perPatchMax`, ⌈patch km² ÷
   `perRoughKm2` × (fineCellM ÷ 250)⁻²⌉) kept, in rank order.
4. **The lay.** One A\* as W7 (4)'s (the lifted bucket queue, integer costs, the straight heuristic, the ellipse at
   `maxCostFactor`, ties by (f, cell index)) over the fine cost surface under the cost law's **time terms**, with the lay
   factors as **choice** terms: a rough cell × `coverFactor`, an open cell × `openFactor`; impassable: water, every
   cell carrying a public route or a trod save the two end cells and junction cells, every placed frame's extent +
   margin. The polyline is the cell-centre path simplified at `routeToleranceM`, never leaving land. Dropped (not
   reported; counted in the patch's reason): a cost > `maxCostFactor` × the straight cost; an open-ground share >
   `openShareMax`; a share of cells within `roadNearM` of a public route > `roadHugShareMax`.
5. **Fields and kind.** `lengthM`, `effortM`, `stations`, `vertexClass`, `roughShare` evaluated on the final polyline,
   order-free, under the host's law as W7 (7); the kind is the first `kinds` row the path satisfies (slope p95 along
   the polyline, the dominant land use by length, the length). Each end's junction is the route's polyline point nearest
   the path's end cell; a junction already within half a fine cell is shared (its `arms` gain the trod), else one is
   written (`kind: 'end'`). The trod's cells enter the **`trod` layer** (`Map<fine cell, Id[]>`, beside the `route` layer
   and never in it).
6. **Reasons.** One `ReasonRecord` per patch (its rough rule, its touch points, its candidates, the drops); a trod's
   reason (its pair rule, its kind row, the three largest cost contributions) is computed on demand by `whyTrod` from the
   patch record's inputs, as `whyCell` does for a cell (J-V13.49) — never stored.
7. **After birth, incremental.** A later run re-lays only: a trod whose junction's route is re-laid or removed (a host
   `bypass`, a `retract`, a standalone edit) — its junction re-joins the new lay's nearest polyline point within
   `rejoinM`, keeping its id, else the trod is tombstoned and reported `W_TROD_UNJOINED`; a trod whose cells a public
   route chartered later crosses — the course byte-identical, a `TrodJunction` of kind `crossing` added where they meet
   (an ambush point the host asked for, HR:18), unless the route runs along the trod's course (≥ `roadHugShareMax` of
   its cells within `roadNearM`), when the trod is tombstoned: a road born supersedes a trod, never the reverse (§1.9);
   a trod whose patch a placed frame's extent + margin or a moved reach now cuts — re-laid by the dry run's closure, the
   former course kept as a lay version. A demotion keeps the road's polyline (V13:1813), so a junction on a road graded
   hidden stays. Every other trod stays byte-identical; the dry run names the closure (as W7 (10)).
8. **Work limit and cut.** W7c ≤ Σ over candidates of their ellipses' cells + 2 × coarse cells; a limit reached drops the
   remaining candidates in rank order (`W_TROD_CUT`, F-WORK's `work_cut`). **Edges:** a landmass with no public land
   route lays none; a patch touched by one route with fewer than two spaced touch points lays none; a standalone world
   with no seats lays none.
9. **Failure ladder.** F-WORLD's "no path" rung covers a candidate (dropped, uncounted); the step never refuses; a
   malformed `world.trod` row takes the table's default (`W_WORLD_RECIPE_TABLE_DEFAULTED`).

*Determinism:* two runs byte-identical; a permuted route order identical (every rank is a value or an index; the
comparator lint, V13:2935–2937). *Output:* `Trod`s, `TrodJunction`s, the `trod` layer.

### 1.6 The port (V13 §3.11.6): the trod record as an optional simulator product, not a canon slot

**Decision (J-V13.116):** `trods(world, request: { logHead })` → `TrodRecord`, the third optional product of the
simulator feed beside `routeFacts` and `patrolOffer` (§2: B-19, B-21), **not** a slot of `WorldCanon`. Reasons: (i)
port law (1) makes the canon's slots "pure functions of the physical layers, the host's cost law and the member seats,
and no lived host fact enters them" (V13:2576–2577) [STATED], and a trod's junctions sit on the network in force — the
host's own genesis and lived changes, "mirrored, never computed" (V13:1811) — which a slot may not read; (ii) the birth
canon is adopted "as the campaign is created" and the genesis is laid at birth over it (H12, H22, V13:3887, 3897)
[STATED], so a trods slot could not exist in the canon the genesis needs; (iii) the additive canon must differ from the
adopted one "only in the added seats' own rows" (V13:2459–2462) [STATED], and a founding that cuts a patch would move a
trods slot. As a product the trod record is still "versioned like the digest" (HR:23): its envelope carries the canon
versions it was built against and its own `trods: { version; inputHash }` over the physical layers, the cost law,
`world.trod`'s rows and the lay versions of the routes in force at `logHead`; requested between advances or at an
advance head and baked with its stamp (the port consumption law, V13:2429–2433), so the trod graph gives one answer
through an advance (the host's law 7, HRQ:668); read behind the host's switch with its tier line and degraded arm
(absent ⇒ the prior bytes), as the other two (V13:2490–2491). **The additive canon does nothing to trods**; a founding
that places a frame over a patch re-lays the cut trods at the next W7c run and steps the record's version, which the
host picks up at its next request.

```ts
interface TrodRecord {                       // file w: the simulator feed's trod record — integers, host keys, closed words, WorldPointCm; no polyline (geometry rides the map feed)
  envelope: { schema: string; world: { doc: Uuid; namespace: string; logHead: number }; against: WorldCanon['envelope']['versions'] /* the canon versions it was built on */; trods: { version: number; inputHash: Hash128 };
    kinds: { kind: string; widthM: number }[] /* world.trod's kind rows: the host derives its band */; units: { effort: 'effort-metres'; length: 'm' } };
  junctions: { id: Id; at: WorldPointCm; route: { hostKey?: string; stationM: number }; arms: { trod: Id; stationM: number }[] }[];
  trods: { id: Id; a: Id; b: Id; kind: string; lengthM: number; effortM: number; stretches: { lengthM: number; effortM: number; terrainClass: string }[] /* ordered a → b, each a run of one class */ }[] }
```

The trod and junction ids are the map's lineage keys, opaque to the host (as host keys are to the map, V13:842); the
host names a trod back by its id in an event's `where`. **The map feed:** `mapFeed` carries each trod's polyline and
junction ticks keyed by trod id, "each in the audience its secret state admits" (as the approach roads ride it,
V13:2503) — an unknown trod in no audience's feed (§1.7); `routes(world)` never carries a trod (§2: B-22, B-23).
`hostOverlay` admits a mover "on a trod by the trod's id, by fraction" (§2: B-25). `placeOf` renders a `trod` or
`junction` place (§2: B-24).

### 1.7 The reveal and the legend (V13 §5.1, §5.8 (7), §5.9 (9))

**The layer** `trods` (a toggle; §2: B-31), M-W2's, the geography — because "nothing of a lens is read by a stage, a
sway revision, an encounter or the clerk" (V13:3259–3260) [STATED] and W7c, V14's crop and `placeOf` must read trods:

| audience | draws | style |
|---|---|---|
| the DM, default | a trod some seat knows (an unretracted knowledge event, §1.8), a revealed or a discovered one; its junctions as ticks; the knowing seats' pips at its midpoint in their allegiance colours | 0.6 px dash-dot in the kind's tint (`style.world` rows `trod.goat`, `.drove`, `.holloway`, `.game`); km lengths on hover |
| the DM, view key `showTrods` on (default off, like `showTraces`) | every trod, the unknown ones as a ghost | 0.4 px dotted grey |
| a player | only a trod the party's `places` admit (`revealed`, `discovered`) and a trod whose knowledge row the host resolved public (J-V13.77); never an unknown one, never greyed; no label, no length | the kind's tint |

The view key is default off so that a DM's picture export ("the view as drawn", V13:3212) never carries the network by
accident, and because the host's rule (HR:17, 33) reads "draw only when a town knows it or the DM reveals it" — kept
for the DM's default picture too, the whole network one key away (J-V13.117).

**The audience filter** (§2: B-32): "covert links, columns, patrols and the trods no party place admits fail closed —
omitted, never greyed". The base's own hidden-place rule ("always on the map … what the map withholds is its name",
BASE:15729–15731) does not apply: a trod's secret withholds the geometry, as V14's `dmOnly` does ("neither draws, lists,
counts, names nor exports", V14:791–793) [STATED]; BCR-V13-41 reads a trod's `SecretState` through the same admission
function (§1.15).

**The ninth lens, `trods`** (M-W5's step after the patrols; a `LensLayer` row set, §2: B-6, B-9, B-35, B-45):
*Regimes:* **known** (the host's lane for its movers lit and knowledge rows sent: "settlements know trods by the host's
ledger"), **revealed** (no knowledge sent, a lane dark or a standalone world: "no settlement's knowledge is sent: trods
show only as the game master reveals them"), **still** (no route laid: "no road is laid, so no trod meets one") — the
still word keys on routes, which are public, never on a trod count.

| element | reads | drawn | class | regime | audience | scrub |
|---|---|---|---|---|---|---|
| known to | the knowledge events (the knowing seat, the trod, the host's how-word, the week) | the seat's pip at the trod's midpoint, captioned "known to ⟨seat⟩ since week n" with the how-word | S, placed | known | DM; a row the host resolves public draws its trod for the party with the mark | host-dated |
| watched | the host's watch on a trod (a dated event whose `where` is the trod) | the watcher's colour along the trod | S, placed | known | DM | host-dated |
| at the junction / on the trod | events whose `where` is a trod or a junction (sorties, seizures, the hearing's verdicts) | the `events` layer's pin, tagged with this lens | S | every | the host's resolution | host-dated |
| junction | the record's junctions | a tick on the route only where its trod draws | P | every | follows its trod | lay versions |
| kind | the record's kind word | a caption on the trod's card | P | every | follows its trod | — |

*Legend:* the banner; then one fixed sentence in every regime and audience — "Trods show only where a settlement is
known to use one or the game master has revealed one; others may exist." — true whatever the count; gated notes:
"patrols ride no trod; a trod is watched only where the host says so" (every regime); "a closure stops the road, not
the trod: the host's law" (the host's closure sent); "who takes a trod is the host's stance rule; a mover draws only
where the host places it" (the lane lit). *Refusals* (`refuse.lens.invented`): an unknown trod drawn for any audience
(the DM's opt-in ghost is the layer's view key, not a lens mark); **a count of trods — laid, known or revealed — on any
surface**; a mover's course guessed; a mover on a trod the host did not name; an ambush, sortie or danger at a junction
the host did not send; a line of sight presented as the host's; a patrol cadence on a trod; a trod drawn carrying,
slowing or bypassing a plague, or a quarantine line the host did not send; the host's capacity band drawn from the
map's width; a decayed road drawn as a trod or a trod as a road. *Audience:* the DM by default; a player sees revealed
and discovered trods and the host's public rows; a seat's knowledge, a watch and a mover DM-only unless the host
resolves them public; fail-closed. *Why:* `lensWhy` per mark — the host row, its how-word, its week, its audience, and
the rule.

**The leak surfaces** (each with its rule, tested by T-V13-60): the layer's km labels (a drawn trod only); the picker's
row, still reason and banner (never from a count); the legend (the fixed sentence); labels (a trod takes none for a
party); the screen-reader summary (V13:3230: lists no trod count); exports (a party-audience export holds exactly the
party's picture, T-V13-50's rule; the DM's GeoJSON/CSV carry `kind: 'trod'` rows; `ecosystemJson` none — the schema has
no row); `mapFeed` (by secret state); `placeOf` (the country it crosses for an audience that does not know the trod);
the `events` layer (a public event on an unknown trod draws its point with the country's words, never the trod's line
or name); border posts (W8b (16) proposes none on a trod); continuity (a trod joins nothing); patrols and V14's crop
(none on a trod; a revealed trod's band in the crop only for an audience its state admits); the 2.5D drape (follows the
audience); the scrub (a knowledge mark from its event's week, a reveal from its edit's week).

### 1.8 The events and presence contract

- **The knowledge event** — the host's `way_known(settlementId, wayId, how, tick)` (HR:33) arrives as a `WorldEvent` of
  the events window (H9, V13:3884): `kind` the host's knowledge word (the adapter folder's event table tags it `trods`);
  `where: { kind: 'trod', trod }`; `seats: [the knowing seat's host key]`; `cause` the host's how-word (the vocabulary
  table: a patrol's catch, an operative's map, …); `week` the host's tick as a week; `audience` the host's resolution
  (DM-only where unresolved); `radiusM` 0; `factTier: 'dossier'`. The windowed replace retracts it when the host's
  ledger forgets (V13:2534). The map never writes one. A `discovered` state (the party travelled it) is the host's own
  reveal through the party's places or a DM mark — the two-writer question of the shared `party` key stands as for
  sites (HRQ:873) [STATED].
- **Movers on trods** — H17's presentation messages (HRQ:83, 577) [STATED], through `hostOverlay`: a mover on a trod by
  the trod's id and a fraction along its laid line, projected by the host for the audience, with no destination and no
  arrival time (V13:2558–2559's form); drawn as a moving marker (V13 §5.8 (5)); covert movers omitted. The request's
  "presence rows (H23)" (HR:11) are, in the host document's own words, H17's movers; H23 is the lens window of ledger
  rows (HRQ:102) [STATED] — said so in the reply.
- **The hearing's places** — `WorldWhere.kind` `trod` (the trod's id and a fraction) and `junction` (the junction's id),
  "resolved at fold, kept as a dated fact" (V13:887); `placeOf` renders for the DM "on the ⟨kind⟩ trod between the
  ⟨route a⟩ and the ⟨route b⟩, n km from ⟨junction a's route ends⟩" and "at the junction on the ⟨route⟩ road ⟨n⟩ km
  from ⟨seat⟩", and for an audience that does not know the trod "in the ⟨land-use word⟩ of ⟨the seat territory's
  seat⟩" — the country it crosses (HR:19). H16 is the host's optional reading of the map's offers (HRQ:576); the host
  says it does not consume it (HR:11), so the trod ids reach the host by the trod record, never by H16, and the host
  sends them back in the event's `where` [INFERRED].
- **Patrols' coverage** — **option B:** no cadence on any trod, known or not (`gradeShift` "(hidden: none; a trod:
  none)", §2: B-8), no `patrolOffer` row for one (it has no host edge, V13:2487–2490), a watch drawn only as the host
  sends it (the lens's `watched`). J396 keeps patrols map-only and the host's coverage the host's ("a patrol catches a
  body on it", HR:17, is the host's rule, which has no patrol rule today, HRQ:711; LNS:371) [STATED]; "coverage zero on
  an unknown way" is then true by construction, and no patrol piece enters V14's crop on a trod (V14:1131) [STATED].

### 1.9 The lifecycle law (ask D)

- **Never promoted by the map:** no `network` change word names a trod (the closed list chartered, promoted, demoted,
  abandoned, revived, facet, bypass, retract, V13:886) [STATED]; a trod has no class, so there is no `setAttr(class)`
  to refuse; the map lays no road along a trod. The one way a trod and a road meet in time runs the other way: **a road
  chartered along a trod's course tombstones the trod** (§1.5 (7)) — a road born supersedes a trod.
- **A decayed road never becomes a trod:** a host road graded `hidden` stays the same `WorldRoute` ("a demotion keeps
  the polyline; a revival restores the hidden one", V13:1813) [STATED], drawn as a DM-only ghost with no patrol; it is
  the host's own edge, which its bodies may walk under its own law (M4's "the dangerous goods take the overgrown road",
  FPI:159) with no map record at all. Two records, two words: `hidden` the grade, `trod` the record.
- **Position on D3 ("if you want a way to be born where a road dies, say so"): no.** The map mints no trod where a
  road dies, because (i) the host has no such law and "would rather not mint one" (HR:35), and the map never invents a
  host fact's consequence (V13 §5.8 (4)); (ii) the hidden-graded road already *is* the overgrown way the host's ledger
  describes, with its own polyline and key — a trod beside it would be a second record of one thing; (iii) a trod's law
  is cover, not history: a road that died across open plain would make a trod across open plain, against the owner's
  rule (HR:29). A trod joined to a road the host abandons re-joins or is tombstoned (§1.5 (7)); its junction on a road
  the host demotes stays.

### 1.10 The quarantine law's map side (behaviour 6)

Today the map draws no quarantine line: the plague lens refuses "a quarantine line" (V13:3385) and the patrols lens "a
patrol drawn … holding a quarantine line" (V13:3428) [STATED]; the host has no quarantine or gate-closure verb
(PLG:556, 798–799), and plague-R7 is an open owner ruling (HRQ:481) [STATED]. The map's law, in one sentence each: (1)
the refusal narrows to "a quarantine line the host did not send" (§2: B-33) — true today and after the verb; (2) when
the host sends a closure it is a host-stored dated fact naming *which* gate under the collision rule (a town gate, a
border crossing or a route's intermediary settlement, never bare, V13:3317–3318) [STATED], carried as an H9 event (a
town gate is not a host edge, so H13's `roadWatch` row cannot name it) and drawn as stored by the plague lens's closure
element (a later row, with the verb); (3) the trod draws **unchanged** across it, with the gated legend note "a closure
stops the road, not the trod: the host's law" — the map never computes which trods bypass a closure, never draws a trod
carrying or slowing a plague ("the host's plague reads none of them", V13:3366–3367) [STATED], and a patrol never holds
the line. The DM may read which junctions lie beyond a closure from the geometry (class P) on a trod's card, never as a
host verdict.

### 1.11 The size arithmetic (V13 §2.7's budget)

The budget: "a `continent` world ≤ 24 MB gzipped (9.2 M cells × ≈ 2.2 B gross across the rasters, plus ≤ 2 MB of
records), a `realm` ≤ 11 MB, a `province` ≤ 3 MB" (V13:1359–1360); the rungs 320 × 200 km at 250 m, 1 280 × 800 at 500
m, 3 840 × 2 400 at 1 000 m (V13:1037–1039) [STATED]. Headroom for every record after the rasters [OBSERVED arithmetic]:
province 3 − 1.024 M × 2.2 B = **0.75 MB**; realm 1.99 MB; continent 3.72 MB (the stated records block 2 MB).

**A trod in memory** [INFERRED assumptions]: a header ≈ 60 B (id, two junction ids, kind, length, effort, lay version);
a polyline at one vertex per 250–500 m after the 60 m simplification, delta-coded ≈ 6 B per vertex (10 km ≈ 21–41
vertices ≈ 200 B); `vertexClass` run-length ≈ 10 B; a junction ≈ 40 B shared — **≈ 350 B** per 10 km trod. So 200 trods
≈ 0.07 MB, 2 000 ≈ 0.7 MB: **had they been stored**, 2 000 would take ≈ 93 % of the province's 0.75 MB, and the same
density over a continent (144 × a province's area → 28 800–288 000 trods, ≈ 4–100 MB) would break the 24 MB budget and
pass the record cap. **Therefore not stored:** W7c is deterministic and drawless, so the trods are rebuilt on load — the
pattern §2.7 already pre-decides for the recomputable rasters (V13:1361–1362) — and reasons are computed on demand
(V13:829–830) [STATED]; **at rest** the file holds only the secret states that are not `dmOnly` (≈ 20 B each) and the
patch reasons (≤ 10³ × 120 B): ≤ 40 KB at 2 000 trods, ≤ 0.2 MB at the continent. **Memory** at the continent rung by
the density rule's cell scaling (§1.4: 1 per 32 km² at 250 m, per 512 km² at 1 000 m): ≈ 7 200 trods ≈ 2.5 MB, inside
`WORLD-5`'s 285 MB. **Time** under the W7 law (8 ns × ellipse cells, V13:3591): a 10 km trod at 250 m ≈ 3 840 cells ≈ 31
µs; 2 000 trods ≈ 61 ms at the province rung (the row's total 730 → ≈ 740 ms, inside the re-declared 900); at 1 000 m ≈
240 cells per trod, 7 200 trods ≈ 14 ms plus the rough pass over 55 000 coarse cells ≈ 2 ms. **The host's side:** the
trod record at 2 000 trods ≈ 2 000 × (60 + 6 runs × 12) + 2 500 junctions × 60 ≈ **410 KB uncompressed** — the size of
the host's whole frozen-digest cap of 400 000 bytes (HRQ:840) [STATED] — so the host keeps it beside its digest as its
own side record, not inside it (H32 (e)). *Noticed:* V13's own figures conflict — "≤ 10⁵ records … ≈ 120 B each gzipped,
inside the 2 MB" (V13:1352–1354) is 12 MB, not 2 [OBSERVED arithmetic]; not this design's to correct (§4).

### 1.12 The milestones (V13 §8.2)

| piece | milestone | why | waits on |
|---|---|---|---|
| A: W7 (13), `Trod`/`TrodJunction`, the `trod` layer, the `trods` product, the `trods` view layer and `showTrods`, the secret states and the DM's reveal, the `trod`/`junction` places, the knowledge events' fold, `hostOverlay` on trods | **M-W2** (8 → 9 pw) | W7c needs W7b's network; M-W2 already holds every reader a trod must be kept out of (W8b's patrols, border posts, continuity; `routeFacts`, `patrolOffer`, `mapFeed`) and the approach road, the nearest precedent (V13:3814) [STATED] | M-W1 (the canon, the events window) |
| B: `routeFacts`' stretches | **M-W2** | `routeFacts` is M-W2's (V13:3814); a port reading only | — |
| C (the reveal): the three states, the party's places, the audience filter, T-V13-60 | **M-W2** with the layer | the reveal is the layer's own admission, not a lens; V14's `SecretState` is a record V13 reuses (V13:961 already cites it), so no wait on M-SITE-A's shipping of the cues (the shared `party` key, BCR-V14-19, is reused as a key form) | — |
| C (the marks): the `trods` lens row set | **M-W5**, the step after the patrols (≈ 0.25 pw, below the row's resolution) | needs the `LensLayer` record, the audience filter, the lens tags, the scrub and `lensWhy` (V13:3262–3276) | M-W2 |
| the host's bodies chain | names **M-W2** as its prerequisite | the record its stand-in is replaced by (HR:12) is M-W2's; the lens adds nothing its simulation reads | its own H9, H12, H17, H32 |

The staged row 37–45 → 38–46 pw (V13:3819; INDEX:39; SUMMARY:124).

### 1.13 The tests (V13 §7)

- **T-V13-59 — trods (W7c)**, §7.3 after T-V13-58: on B-WORLD-lite every trod's both ends are junctions on public land
  routes' polylines (within a fine cell), no trod crosses water, rides a public route or trod cell save at junctions, or
  enters a placed frame's extent + margin; every trod's open-ground share ≤ `openShareMax` and a fixture of open plain
  between two roads lays none; a forest patch of 40 km² touched by two roads lays at least one and at most
  `perPatchMax`; every kind is the first matching row; two runs are byte-identical and a permuted route order identical;
  a bypass of a joined route re-joins the trod within `rejoinM` keeping both ids, a removal beyond it tombstones with
  `W_TROD_UNJOINED`; a route chartered across a trod adds a `crossing` junction and leaves the course byte-identical,
  one chartered along it tombstones it; a demotion to hidden moves nothing; a placed frame over a patch re-lays only the
  trods it cuts and every other trod stays byte-identical; the trod record is whole or refused, integer, keyless of
  prose and raster indices, its stretches summing to each trod's `lengthM` and `effortM`, byte-identical when requested
  twice at one log head, its version stepping only when a trod changed; a trod carries no `PatrolCadence` and appears in
  no `patrolOffer`, `routeFacts` or `routes(world)` row, no border-post proposal and no continuity join; a reload rebuilds
  every trod byte-identical with its secret states kept; the work limit cuts in rank order with `W_TROD_CUT`.
- **T-V13-60 — the reveal and the leak**, §7.4 after T-V13-56: two worlds differing only in their unknown trods give a
  byte-identical player picture, legend, picker, screen-reader summary, `placeOf` words for the party, `mapFeed` for the
  player audience and every player-audience export; the DM's default picture likewise, and `showTrods` on differs; a
  trod `revealed` by `setAttr` or by the party's places draws for the party, `discovered` reads `local`; a knowledge
  event resolved public draws its trod for the party with the seat's mark, one DM-only does not; a retracted event
  removes the mark; a public event on an unknown trod draws its point with the country's words and no line; a party
  export never carries a trod the party's places do not admit; the hearing's `trod` and `junction` places render for
  the DM and read the country for the party.
- **T-V13-61 — the trods lens** (M-W5): regimes known, revealed and still from the window's regime and the routes laid,
  never from a count; the known-to pip from its event's week with the host's how-word; a watch only where sent; a mover
  on a trod at the host's fraction, covert ones omitted; the fixed legend sentence in every regime and audience; every
  refusal returns `refuse.lens.invented`; `lensWhy` names the row.
- Amended: T-V13-42 (a trod carries no cadence and no `patrolOffer` row), T-V13-43 (`routeFacts`' stretches sum and
  are order-free), T-V13-50 (a trod the party's places do not admit is absent from the player picture).

### 1.14 The decisions (V13 §9; "chose X over Y because Z"; each vetoable)

| id | the row |
|---|---|
| J-V13.114 | chose **`trod`** for the host's hidden way, and **`hidden` kept as the host's grade of an overt road only**, over `way` (the settlement frame's `WayClass` and the glyph's way mark) and over `byway`, `trace`, `track`, `trail` and `path` (each a record, layer or class already), because one word carries one meaning across the seam (law (9)) and a world record named `way` would meet a frame record named `Way` at every ring crossing |
| J-V13.115 | chose **a record of its own kind, `Trod` with `TrodJunction` ends**, over a seventh `WorldRoute.class` or a `WorldRoute` of a new origin with two `join`s, because a trod has no seat, no host key, no leg, no class, no patrol and no charter road — every reader of `WorldRoute` would need an exclusion — and the approach road already shows what a junction-ended line costs each reader |
| J-V13.116 | chose **the trod record as an optional simulator product (`trods`), versioned on its own against the canon's versions**, over a canon slot, because law (1) admits no lived network into a slot, the birth canon precedes the genesis the trods need, and the additive canon must move only the added seats' rows |
| J-V13.117 | chose **an unknown trod undrawn in every picture, the DM's default included, the whole network behind a default-off view key**, over an always-on DM ghost (a DM's picture export would carry every trod) or no ghost (the DM could not reveal what it cannot see) |
| J-V13.118 | chose **knowledge per settlement as the host's dated event in the events window, drawn and never decided by the map, and the party's `SecretState` as the record's only map-owned knowledge**, over a knowledge flag on the record written by the host (the map would store the host's state as its own fact) or a fourth knowledge tier (J-V14.12's reason) |
| J-V13.119 | chose **one fixed, count-free legend sentence and no regime word, picker state, label, summary, place word or export that reads a trod count**, over a count (the leak the host names) or a legend row shown only when a trod is known (its presence would itself tell a player one exists) |
| J-V13.120 | chose **no patrol cadence on any trod, no `patrolOffer` row, a watch drawn only as the host sends it**, over a map cadence on a known trod, because J396 keeps patrols map-only, the host has no patrol rule, and a cadence would put patrol pieces in the crop where the host watches nothing |
| J-V13.121 | chose **`WorldWhere` kinds `trod` and `junction`, the party reading only the country it crosses where it does not know the trod**, over `point` (the hearing card could not name the place) or `road` (a trod would count as a road for every reader of roads) |
| J-V13.122 | chose **W7c's density as terrain parameters — rough land uses and a relief threshold, one trod per `perRoughKm2` of rough country, an open-ground share cap — in a rule table the host can read**, over counting trods per province or per road, because the owner's rule is "several per rough country, none across open plain" and a cap by area is what that says |
| J-V13.123 | chose **generated trods rebuilt on load and reasoned on demand, only their secret states persisted**, over storing them, because 2 000 stored trods would take nine tenths of a province's record headroom and the same density would break the continent's 24 MB |
| J-V13.124 | chose **a road born along a trod superseding it, a decayed road never becoming a trod, and no trod born where a road dies**, over a trod minted from a dead road, because the host has no such law and asks for none, the hidden-graded road already is the overgrown way with its own key, and a trod's law is cover, not history |
| J-V13.125 | chose **`routeFacts`' ordered stretches as a reading over `stations` and `vertexClass`**, over a new `WorldRoute` field, because the record already holds the data and a stored run list would be a second state in the digest for nothing |
| J-V13.126 | chose **the trod line a structural layer of M-W2 and the host's marks over it a ninth lens of M-W5**, over a lens holding the geography (read by no stage, so W7c, the crop and `placeOf` could not read it) or no lens (the knowing seat's mark, the watch and the fixed sentence belong to the one lens record and its audience filter) |

Amended rows: J-V13.66 (a trod carries no cadence), J-V13.77 and J-V13.92 (the trods no party place admits among the
things omitted, never greyed), J-V13.78 (the word list gains *trod* and *hidden*'s one meaning), J-V13.93 (the build
order gains the trods step after the patrols). Carried as fragments B-47 (the new rows) and B-27 (law (9)); the four
amended rows are one-clause edits the synthesis may fold into B-47's evidence or carry as four more fragments (§4).

### 1.15 Base change requests (V13 §10)

**BCR-V13-41 — §9.2 (the admission function), §7.7 (the world port's paragraph) and §11.3 (the world's view keys): a
trod's secret state, the `trods` product, the `showTrods` key.** (§2: B-B1, B-B2, B-B3.) The base's admission sentence
for a place's `SecretState` (BASE:15744) reads also a world trod's; §7.7's world port paragraph (BASE:12903) names the
simulator feed's optional products `routeFacts`, `patrolOffer` and `trods`; the world's per-viewer keys (BASE:4202) gain
`showTrods` (default false). The base's `WayClass` is untouched: the word moves, not the class.

### 1.16 The host-change row (V13 §8.5): H32

| # | when | the host changes | waits on |
|---|---|---|---|
| H32 | with M-W2 (the trod record), after H9, H12 and H17 | the trod asks (file w): (a) its knowledge of a trod per settlement sent as a dated event of the events window — the knowing seat, the trod's id, its how-word through the adapter folder's vocabulary table, the week, the resolved audience (DM-only where unresolved) — and retracted by the windowed replace when its ledger forgets; (b) every engagement on a trod or at a junction with its `where` naming the trod (its id and a fraction) or the junction; (c) its movers on trods in the presentation messages by the trod's id and a fraction, projected for the audience; (d) a watch on a trod, where it keeps one, as a dated event; (e) its reader of the trod record behind its own switch, with its tier line and its degraded arm, requested between advances and baked with its stamp, kept beside its frozen digest (the record at 2 000 trods is the size of its digest cap); (f) its register rows for `trod`, `junction` and the four kind words, `hidden` kept for its grade; (g) its stand-in cover graph over `routeFacts`' stretches retired when (e) lands | M-W2; H9; H12; H17 |

### 1.17 What the reply tells the host about its own recorded rows (corrections, with the map's evidence)

1. **B is largely in hand:** the per-segment class exists on the record since amendments m (V13:790; `docs/AMENDMENTS-2026-10-17m.md:543`);
   ledger T2's MISSING (FPI:394) and HRQ:606, 625 predate it; the ordered runs enter `routeFacts` with M-W2 (§1.3).
2. **Detours (ENC-HL-10):** "the map offers no detour either" (HRQ:653) is behind V13 W7 (9), which re-lays the host's
   `bypass` as a dated lay version (V13:1813–1815; T-V13-41 (u)); the map still offers no detour *of its own*, and a trod
   is never a detour (§2: B-H3).
3. **"hidden" is two things in the request:** the host's own decay rung (FPI:99, 159; V13 mirrors it) and the class of
   born geography (HR:10, 24); this design keeps the first and names the second `trod`.
4. **"presence rows (H23)"** are H17's movers in the host's own document (HRQ:83, 102, 577); H23 is the lens window.
5. **H16's direction:** H16 is the host's optional reading of the map's offers (HRQ:576); the trod ids reach the host by
   the trod record, not by H16.
6. **Armies:** M4 records "armies may not" (FPI:159) and ENC-HL-12 "never armies" (HRQ:655); the request's small unit
   (HR:15) is a changed host rule; the map's record is neutral on it (no class word, a derivable band).
7. **Patrols catching bodies** (HR:17) needs a host patrol rule the host does not have (HRQ:711; LNS:371); the map's
   cadence is map-only (J396) and rides no trod.
8. **"spatialLedgers hard-deny"** (HR:17) is not a recorded fact (the recorded allowlist is FTH:435–436; HRQ:799); a
   host day-one confirmation, not a map premise.
9. **"the existing smuggling gauntlet"** (HR:15): the recorded rule is one roll at the route's worst gate on shipments
   with no path (TRD:565–568, 179); moving it onto trods is the host's own change.
10. **The hearing week** is unbuilt and its registry closed (HRQ:656; FPS:221–227, 474); a sortie engagement kind is the
    host's new registry row; the map's half is the typed place (§1.8).
11. **Stale citations** in HRQ: H9/H16/H23 now stand at V13:3884, 3891, 3898, not 3747/3754/3761; V13 runs to H31, so
    the new row is H32 (HRQ:68, 82, 102) [OBSERVED]; the request's "H1–H30" likewise.
12. **"cells"** (HR:25) cannot cross the port (no raster index, V13:2437; FRR:529); stretches do.
13. **"province"** (HR:44) is read as the size rung (V13:1037), the binding case being the continent at the same density
    — which the rebuild-on-load rule answers (§1.11).

## §2 The fragments (74; the machine copy `docs/validation/hidden-ways-2026-10-18/design-B.fragments.json`, records `{id, file, line, md5, old, new}` in this order)

Each current text below is quoted ONCE verbatim as the target stands now (the md5 named per target), occurs exactly once in it, at the line named; an insertion quotes the text it follows; the new text is given in full. Applied in this order to copies of the targets, every current text is found once at its turn and every new text once after (checked by the lane script `build.py`). The targets: `docs/volumes/V13-world.md` (md5 `e68af748638dd3c8474d21b37005c7ac`); `docs/volumes/V14-sites.md` (md5 `f5dd37a7e9b739da7f29095d47a17a87`); `docs/ARCHITECTURE.md` (md5 `eac3a6a5ee2c58534185318949ebd8ba`); `docs/HOST-REQUIREMENTS-2026-10-18.md` (md5 `7db37cc1a4e03fc8db665c1be9d55211`); `docs/volumes/INDEX.md` (md5 `10a72c97f86a88533292971629c56539`); `docs/volumes/SUMMARY.md` (md5 `1c0ada295f24b9e22909ce86eaec2cd8`).


### §2.1 `docs/volumes/V13-world.md` — 54 fragments

**B-1** — line 140 (insertion).

*Current text (as it stands now):*
```
> lowering danger" (§5.8) stands as written.
```

*New text:*
```
> lowering danger" (§5.8) stands as written.
>
> **The host's request w — 2026-10-18** (`docs/host-requests/2026-10-18-hidden-ways.md`; the reply
> `docs/HOST-REPLY-HIDDEN-WAYS-2026-10-18.md`; file w, items from 955; J407): the host's hidden ways — the map's **trods**
> (never *way*, the settlement frame's `WayClass`; never *hidden*, the host's grade of an overt road) — laid by W7 (13) after
> W7b in rough country, never across open plain, each joining two junctions on the overt network; the trod record as the
> simulator feed's third optional product; `routeFacts`' ordered stretches (the host's fallback); an unknown trod undrawn in
> every picture, known per settlement by the host's dated event, revealed to the party by V14 §2.3's three states; no
> patrol cadence on a trod; a decayed road never a trod and no trod born where a road dies. Changed: §1b, §2.2 (`Trod`,
> `TrodJunction`, `WorldWhere`, `WorldEvent.cause`), §2.3 (`world.trod`), §2.5, §2.6, §2.7, §3.0, §3.8 (13), §3.11.6, §3.17,
> §5.1, §5.8 (7), §5.9 (9), §6, §7 (T-V13-59 – 61), §8.2, §8.5 H32, §9 J-V13.114 – 126, §10 BCR-V13-41, §11 Q2 and Q5.
```

*Evidence:* §1.3's owner's-word blocks carry each file's word; file w is the host's request answered under J404 (PROGRESS.md:463, 466).

**B-2** — line 493 (insertion).

*Current text (as it stands now):*
```
V14's E1 (the world-map case reads the route at the point) | V13 §2.2 |
```

*New text:*
```
V14's E1 (the world-map case reads the route at the point) | V13 §2.2 |
| `Trod` (a hidden edge of the map's own: two junction ends on the overt network, ordered stretches with the host's terrain class and integer effort, a kind word, the party's secret state; `TrodJunction` its typed end — file w, W7 (13)) | W7c after W7b, and after each `network` window on a host-bound world (V13 §3.8 (13)); never a host edge, never a `WorldRoute` | the port's `trods` (the simulator feed's trod record), `mapFeed` (by secret state), `placeOf` (the `trod` and `junction` places), the `trods` view layer and the trods lens, V14's E1 (a revealed trod's band in a world crop); never `existingRoute`, W6b, siting, the coherence tests, W8b's patrols, border posts or continuity | V13 §2.2 |
```

*Evidence:* the wiring table lists every new record (V13:479); the readers are §1.5's exclusions.

**B-3** — line 601 (insertion).

*Current text (as it stands now):*
```
| `WorldRoute` | by class or the host's grade (a hidden host road a DM-only ghost) | none (a route takes its ends' names) | GeoJSON LineString, the ecosystem-shaped JSON's routes, CSV | entities block |
```

*New text:*
```
| `WorldRoute` | by class or the host's grade (a hidden host road a DM-only ghost) | none (a route takes its ends' names) | GeoJSON LineString, the ecosystem-shaped JSON's routes, CSV | entities block |
| `Trod` (file w; W7 (13)) | the `trods` layer by its secret state and the host's knowledge rows: an unknown trod undrawn (the DM's `showTrods` ghost apart), a known one with the knowing seat's mark, a revealed or discovered one for the party (V13 §5.1) | none for a party; the DM's hover caption | GeoJSON LineString (`kind: 'trod'`) and CSV in a DM-audience export only; never `ecosystemJson` (the schema has no row) | rebuilt on load by W7c, never persisted; its secret state in the entities block when not `dmOnly` (V13 §2.7) |
```

*Evidence:* every entity kind is rendered, labelled, exported and persisted by a row of §1b.4 (V13:592).

**B-4** — line 841 (insertion).

*Current text (as it stands now):*
```
— read by the charter's `roads`, W8b (14)'s patrol source, the clerk and the view
```

*New text:*
```
— read by the charter's `roads`, W8b (14)'s patrol source, the clerk and the view
interface Trod {                             // W7 (13); file w: a hidden edge of the map's own geography — never a WorldRoute, never a host edge (J-V13.115)
  id: Id; a: Id; b: Id /* its two ends: TrodJunction ids — each a point on a public land route's polyline, shared with another trod where two meet; never a seat id, never a host key */;
  kind: 'goat'|'drove'|'holloway'|'game' /* the width/kind word: world.trod's kind rows (V13 §2.3), the first the laid path's ground matches; the host derives its size band from the word, the row's widthM and the stretches' classes — the map records no band */;
  polyline: WorldPointCm[]; stations: Int32Array /* per vertex: cumulative effort-metres from `a` under the cost law's time terms */; vertexClass: Uint8Array /* per segment: the host's terrain class through the adapter folder's class table */;
  lengthM: number; effortM: number /* integers */; roughShare: number /* the share of its length in rough country (world.trod's rough rows), 0–1: the clerk's */; layVersion: number /* bumped by every re-lay; the former course kept as a version */;
  secret: SecretState /* V14 §2.3's three states, the record's only map-owned knowledge: dmOnly at birth; revealed by the DM's setAttr on trod/secret/state or the host's reveal through the party's places (the trod's id a place's address there); discovered by the host's event or the DM's mark. A settlement's knowledge of a trod is never on the record: it is the host's dated event (V13 §3.8 (13)) */;
  reason: Id /* computed on demand (whyTrod, V13 §4.7) from its patch's record, never stored: a generated trod is rebuilt on load (V13 §2.7) */ }
interface TrodJunction { id: Id; at: WorldPointCm /* a point on the route's polyline */; route: { id: Id; hostKey?: string /* bound: the host's edge key */; stationM: number /* integer effort-metres from the route's `a` */ };
  arms: { trod: Id; stationM: number /* integer effort-metres from the trod's `a`: 0 or its effortM at an end, between at a crossing */ }[] /* sorted by trod id */;
  kind: 'end'|'crossing' /* end: a trod's end on the route; crossing: a public route chartered later across a trod's course (W7 (13) (7)) */ }   // the hearing card's `junction` place (WorldWhere); nothing sight-related is on it
```

*Evidence:* the records of §2.2 (V13:667); the approach road's `join` is the junction model (V13:786, 1850); V14 §2.3's `SecretState` (V14:763–766) is reused verbatim; the simulator feed admits integers, closed words, host keys and WorldPointCm only (V13:2435–2437).

**B-5** — line 887 (replacement).

*Current text (as it stands now):*
```
interface WorldWhere { kind: 'settlement'|'wall'|'road'|'border'|'supplyLine'|'region'|'point'|'offStage'; seat?: string; edge?: string;
```

*New text:*
```
interface WorldWhere { kind: 'settlement'|'wall'|'road'|'border'|'supplyLine'|'region'|'point'|'offStage'|'trod'|'junction' /* trod: a point along a trod (`trod` with `fraction`); junction: a trod's junction (`junction`) — W7 (13); `placeOf` names either for the DM and, for an audience that does not know the trod, only the country it crosses (file w) */; seat?: string; edge?: string; trod?: Id; junction?: Id;
```

*Evidence:* the hearing card's where (HR:19, 28); `WorldWhere` has no way or junction kind today (V13:887).

**B-6** — line 891 (replacement).

*Current text (as it stands now):*
```
type LensId = 'plague'|'sway'|'patrols'|'trade'|'populations'|'religion'|'prosperity'|'alignment';   // `world.lens`'s order (J384 (8)): plague first, then the sway (the owner's territory) and patrols, trade and populations, religion, prosperity and alignment
```

*New text:*
```
type LensId = 'plague'|'sway'|'patrols'|'trods'|'trade'|'populations'|'religion'|'prosperity'|'alignment';   // `world.lens`'s order (J384 (8)): plague first, then the sway (the owner's territory) and patrols, then the trods (the host's hidden ways, V13 §5.9 (9); file w), trade and populations, religion, prosperity and alignment
```

*Evidence:* a lens is added by a row and its element functions (V13:3275); `LensId` is the closed union (V13:891).

**B-7** — line 837 (replacement).

*Current text (as it stands now):*
```
cause?: string /* the host's cause word — a patron fall's — by the adapter folder's vocabulary table, when sent */
```

*New text:*
```
cause?: string /* the host's cause word — a patron fall's, a trod's learning's (how a settlement came to know a trod, V13 §3.8 (13)) — by the adapter folder's vocabulary table, when sent */
```

*Evidence:* the host's `how` on its knowledge event (HR:33) rides the field V13 already reserves for the host's cause word (V13:837): one field, one meaning.

**B-8** — line 1163 (replacement).

*Current text (as it stands now):*
```
track −1 (hidden: none)
```

*New text:*
```
track −1 (hidden: none; a trod: none, V13 §3.8 (13))
```

*Evidence:* patrols option B (§1.8; J-V13.120); J396 keeps patrols map-only (PROGRESS.md:455).

**B-9** — line 1170 (replacement).

*Current text (as it stands now):*
```
| `lenses` order | plague 1 · sway 2 · patrols 2 · trade 3 · populations 3 · religion 4 · prosperity 5 · alignment 5 | J384 (8): plague the proving lens |
```

*New text:*
```
| `lenses` order | plague 1 · sway 2 · patrols 2 · trods 2 · trade 3 · populations 3 · religion 4 · prosperity 5 · alignment 5 | J384 (8): plague the proving lens; the trods after the patrols (file w) |
```

*Evidence:* the ninth lens's place in the order (§1.7).

**B-10** — line 1174 (replacement).

*Current text (as it stands now):*
```
| `collisions` | monster threat · gate · toll · besieged · prosperity · temperament · alignment (V13 §5.8 (6)) | one word, one meaning |
```

*New text:*
```
| `collisions` | monster threat · gate · toll · besieged · prosperity · temperament · alignment · way · hidden (V13 §5.8 (6); file w: *way* is the settlement frame's `WayClass`, a hidden edge of the map's own a *trod*; *hidden* the host's grade of an overt road only) | one word, one meaning |
```

*Evidence:* the term census (§0 Q0): way TAKEN in the base (BASE:1093), V13 (762, 803) and V14 (1799); hidden the host's grade (V13:788, 1815).

**B-11** — line 1010 (insertion).

*Current text (as it stands now):*
```
exitRunM: number /* a placed frame's road run through the margin to its gate station */ }   // world.routeLay — the map's own network formation (W7); never the host's, never a time
```

*New text:*
```
exitRunM: number /* a placed frame's road run through the margin to its gate station */ }   // world.routeLay — the map's own network formation (W7); never the host's, never a time
interface TrodRule {                                                                                           // world.trod — W7 (13); the map's own lay rules (file w), never the host's, never a time
  rough: { landUse: string[] /* the land uses that are rough country */; reliefM: number /* local relief over reliefWindowM that makes any ground rough (hills) */; reliefWindowM: number; patchMinKm2: number /* a rough patch below it lays no trod */ };
  density: { perRoughKm2: number /* one trod per this much rough country at the province rung's cell, scaled by (fineCellM ÷ 250)² at a coarser rung */; perPatchMax: number; junctionSpacingM: number /* candidate junctions along one route no closer than this */ };
  lay: { coverFactor: number; openFactor: number /* choice terms on the step cost: a rough cell × coverFactor, an open cell × openFactor — never in a time */; openShareMax: number /* a trod over more open ground than this share is dropped: none across open plain */; roadNearM: number; roadHugShareMax: number /* a trod within roadNearM of a public route over more than this share shadows the road and is dropped */; minStraightM: number; maxStraightM: number; rejoinM: number /* a moved junction re-joins within this */ };
  kinds: { kind: 'goat'|'drove'|'holloway'|'game'; widthM: number /* integer metres: the host derives its band from it */; slopeP95Min?: number; slopeP95Max?: number; landUse?: string[]; minLengthM?: number }[] /* the first matching row names the kind; the last row has no test */ }
```

*Evidence:* the rule tables of §2.3 (V13:966); the owner's density rule (HR:29) as parameters (§1.4).

**B-12** — line 1137 (insertion).

*Current text (as it stands now):*
```
| `exitRunM` | 400 (a placed frame's road runs through the margin this far to its gate station) |
```

*New text:*
```
| `exitRunM` | 400 (a placed frame's road runs through the margin this far to its gate station) |

| `TrodRule` (`world.trod`: the map's own; the owner's density rule — several per rough country, none across open plain — as parameters the host can read; file w) | default |
|---|---|
| `rough.landUse` / `reliefM` / `reliefWindowM` / `patchMinKm2` | forest, wetland, alpine, scrub / 120 m over 2 000 m (hills: open ground is rough where the land rises or falls 120 m within 2 km) / 2 000 / 4 km² |
| `density.perRoughKm2` / `perPatchMax` / `junctionSpacingM` | 32 km² (a province whose rough country is two fifths of its 64 000 km² lays ≈ 800 trods; the continent's coarser cell ≈ 7 200 in all) / 12 / 3 000 |
| `lay.coverFactor` / `openFactor` / `openShareMax` / `roadNearM` / `roadHugShareMax` / `minStraightM` / `maxStraightM` / `rejoinM` | 0.5 / 4 / 0.2 (a trod over more than a fifth of open ground is dropped) / 500 / 0.3 / 2 000 / 40 000 / 2 × the fine cell |
| `kinds` (first match) | `goat`: slope p95 ≥ 18 % or land use alpine, width 1 m · `holloway`: slope p95 < 8 %, land use forest or scrub, length ≥ 8 000 m, width 2.5 m (an old sunken road of the map's own geography, never a decayed host road) · `drove`: slope p95 < 8 %, land use grass, scrub or tundra, width 3 m · `game`: no test, width 1 m |
```

*Evidence:* every cell own, PLAUSIBLE until measured (V13:968–972); the landUse words are V13's biome rows (V13:996).

**B-13** — line 1260 (insertion).

*Current text (as it stands now):*
```
| an approach road (a `WorldRoute` of origin `approach`, V13 §3.8 (12)) | the world root | (`route`, the site placement's lineage, `approach`) — so a re-lay keeps its id and a moved site keeps its road's address |
```

*New text:*
```
| an approach road (a `WorldRoute` of origin `approach`, V13 §3.8 (12)) | the world root | (`route`, the site placement's lineage, `approach`) — so a re-lay keeps its id and a moved site keeps its road's address |
| a trod (`Trod`, V13 §3.8 (13); file w) | the world root | (`trod`, its two junctions' keys sorted) — so a re-lay keeps its id and the host's own record keeps its key |
| a trod junction (`TrodJunction`) | the world root | (`junction`, the joined route's lineage, its fine cell) — a re-lay of the route that keeps the cell keeps the junction; one that moves it re-joins within `rejoinM` keeping the id (V13 §3.8 (13) (g)) |
```

*Evidence:* identity by creation key (V13:1255–1260); the junction must survive a re-lay of the road it sits on (read-v14-base §5.4 (2)).

**B-14** — line 1306 (insertion).

*Current text (as it stands now):*
```
**veil:** its `knownTo` its site card's — a DM-only site's road DM-only |
```

*New text:*
```
**veil:** its `knownTo` its site card's — a DM-only site's road DM-only |
| a trod (`Trod`; W7 (13); file w) | W7c after W7b, and after each `network` window | the `trod` layer, the port's `trods` and `mapFeed`, `placeOf`, the `trods` view layer and lens, V14's E1; never `existingRoute`, W6b, siting, the coherence tests, W8b's patrols, border posts or continuity | never persisted: rebuilt on load by W7c; its `secret` state in the entities block when not `dmOnly` | re-laid only by the closure W7 (13) (g) names (its route re-laid or removed, a route chartered across or along it, a frame or a reach cutting its patch), the former course a lay version; tombstoned `W_TROD_UNJOINED`, or by a road along its course | a host input is never a user's undo target; the DM's `setAttr` on its secret state goes with its edit | absent: W7c at load; **import:** none on an imported legacy world until its genesis; **dark-after-lit:** the host's reader absent reads its prior bytes; **death:** a dead seat moves no trod; **veil:** unknown to every audience but the DM's view key; the party's `SecretState`; a settlement's knowledge the host's dated event |
```

*Evidence:* the lifecycle table of §2.6 (V13:1279); the approach road's row is the precedent (V13:1306).

**B-15** — line 1334 (replacement).

*Current text (as it stands now):*
```
equal rasters hash alike), the surfaces, reaches, watersheds, routes, territories, W6's proposals, placements and
```

*New text:*
```
equal rasters hash alike), the surfaces, reaches, watersheds, routes, territories, W6's proposals, placements, the trods' secret states (the generated trods themselves rebuilt on load, outside every digest, V13 §3.8 (13); file w) and
```

*Evidence:* the model digest's leaves (V13:1332–1335); the secret states are the only persisted trod facts (§1.11).

**B-16** — line 1362 (insertion).

*Current text (as it stands now):*
```
`watershed`, the distance fields) are dropped from the file and rebuilt on load inside V13 §6's load budget.
```

*New text:*
```
`watershed`, the distance fields) are dropped from the file and rebuilt on load inside V13 §6's load budget. **The trods are never written to the file** (file w; J-V13.123): W7 (13) is deterministic and drawless, so every generated trod is rebuilt on load by the same rule inside the same budget and its reason computed on demand as a cell's; only a trod's secret state that is not `dmOnly` is a record (≈ 20 B), so 200–2 000 trods at the province rung add ≤ 40 KB at rest and ≈ 0.07–0.7 MB in memory, and the continent's ≈ 7 200 (the density rule's cell scaling, V13 §2.3) ≈ 2.5 MB in memory inside `WORLD-5`.
```

*Evidence:* the size arithmetic (§1.11) against V13:1359–1362; the host's Q7 (HR:44).

**B-17** — line 1445 (insertion).

*Current text (as it stands now):*
```
| W7b Routes | `W7b` | the final seats (proposals, placements, host seats), the site placements with road access and their cards' kind rows (W7 (12); J393), the surfaces, `dem`, `biome`, the reaches, the cost law | `WorldRoute`s (the approach roads among them), the `routes` layer | none | the world root | F-WORLD (no path) | " |
```

*New text:*
```
| W7b Routes | `W7b` | the final seats (proposals, placements, host seats), the site placements with road access and their cards' kind rows (W7 (12); J393), the surfaces, `dem`, `biome`, the reaches, the cost law | `WorldRoute`s (the approach roads among them), the `routes` layer | none | the world root | F-WORLD (no path) | " |
| W7c Trods | `W7c` | the public land routes in force (W7b's; the network at the week), the placed frames' extents and margins, `landUse`, `dem`, the surfaces, the cost law, `world.trod` | `Trod`s, `TrodJunction`s, the `trod` layer | none (`world.trod` reserved; the tie-breaks deterministic, V13 §3.8 (13)) | the world root | F-WORLD (no path) | " |
```

*Evidence:* the stage table (V13:1410–1446): a stage row per step; W7c after W7b, before W8a.

**B-18** — line 1875 (replacement).

*Current text (as it stands now):*
```
*Output:* `WorldRoute`s (the approach roads among them) and the `route` layer; each site placement's approach is the derived `SiteApproach` read over them (V13 §2.2).
```

*New text:*
```
13. **Trods (file w: the host's hidden-ways request of 2026-10-18; the owner's rule that its brigands "don't travel the
   overt roads … hidden roads that connect between roads, and multiple of them").** Run after (12) on both worlds, and on
   a host-bound world after the genesis and after each `network` window; `world.trod` is a reserved id (V13 §3.17): the
   step draws nothing. (a) **Rough country:** over the coarse grid a cell is rough when its majority `landUse` is in
   `rough.landUse` or its local relief (max − min `dem` within `reliefWindowM`) ≥ `reliefM`; the 8-connected rough
   components of area ≥ `patchMinKm2` are the **patches**, each keyed by its lowest cell index, each with one
   `ReasonRecord`. (b) **Touch points:** for every public land route in force at the week (any class; a road the host
   grades hidden is no public road; never a water leg, an approach road or a trod) every polyline vertex inside a patch
   or within `roadNearM` of it is a candidate junction site, thinned along each route to one per `junctionSpacingM`
   (the lowest station in each window), keyed (route lineage, station). (c) **Candidates:** per patch the Urquhart
   graph of its touch points (the kernel's deterministic triangulation over integer metres, as (3)); an edge is a
   candidate when its straight length lies in [`minStraightM`, `maxStraightM`] and its two points are on different
   routes, or on one route at least 3 × `junctionSpacingM` apart by station; ranked by straight length ascending, ties
   by the sorted junction keys; the first min(`perPatchMax`, ⌈patch km² ÷ `perRoughKm2` × (250 ÷ fineCellM)²⌉) kept,
   in rank order. (d) **The lay:** one A\* as (4)'s (the lifted bucket queue, integer costs, the straight heuristic,
   the ellipse at `maxCostFactor`, ties by (f, cell index)) over (2)'s cost surface under the cost law's time terms,
   with the lay factors as choice terms — a rough cell × `coverFactor`, an open cell × `openFactor` —; impassable:
   water, every cell carrying a public route or a trod save the two end cells and junction cells, every placed frame's
   extent + margin; the polyline the cell-centre path simplified at `routeToleranceM`, never leaving land; dropped,
   counted in the patch's reason and not reported: a cost > `maxCostFactor` × the straight cost, an open-ground share
   > `openShareMax`, a share of cells within `roadNearM` of a public route > `roadHugShareMax`. (e) **Fields and kind:**
   `lengthM`, `effortM`, `stations`, `vertexClass` and `roughShare` evaluated on the final polyline, order-free, under
   the host's law as (7); the kind the first `kinds` row the path satisfies (slope p95 along the polyline, the dominant
   land use by length, the length); each end's junction the route's polyline point nearest the path's end cell — a
   junction already within half a fine cell is shared (its `arms` gain the trod), else one is written (`kind: 'end'`);
   the trod's cells enter the **`trod` layer** (`Map<fine cell, Id[]>`, beside the `route` layer and never in it).
   (f) **Reasons:** the patch's record names its rough rule, its touch points, its candidates and the drops; a trod's
   reason (its pair rule, its kind row, the three largest cost contributions) is computed on demand by `whyTrod` from
   that record, as a cell's is (J-V13.49) — never stored. (g) **After birth, incremental:** a later run re-lays only a
   trod whose junction's route is re-laid or removed (a host `bypass` or `retract`, a standalone edit) — its junction
   re-joins the new lay's nearest polyline point within `rejoinM`, keeping both ids, else the trod is tombstoned and
   reported `W_TROD_UNJOINED`; a trod whose cells a public route chartered later crosses — the course byte-identical, a
   `TrodJunction` of kind `crossing` added where they meet, unless the route runs along the trod's course (≥
   `roadHugShareMax` of its cells within `roadNearM`), when the trod is tombstoned: a road born supersedes a trod,
   never the reverse; a trod whose patch a placed frame's extent + margin or a moved reach now cuts — re-laid by the
   dry run's closure, the former course kept as a lay version. A demotion keeps the road's polyline ((9)), so a
   junction on a road graded hidden stays; the map never promotes a trod (no `network` change word names one, and a
   trod has no class to edit), mints no trod where a road dies (a road the host grades hidden is the host's own edge,
   the overgrown way its ledger describes, with its own key: two records would name one thing; and a trod's law is
   cover, not history), and turns no decayed road into a trod. Every other trod stays byte-identical, and the dry run
   names the closure ((10)). (h) **Work limit and cut:** W7c ≤ Σ over candidates of their ellipses' cells + 2 × coarse
   cells; a limit reached drops the remaining candidates in rank order (`W_TROD_CUT`, F-WORK's `work_cut`).
   **A trod to the host's bodies, no road to the map:** `existingRoute`, W6b's `connectivity`, V14's siting plug-ins,
   the site coherence tests, W8b (14)'s patrols (a trod carries no cadence and has no `patrolOffer` row), W8b (16)'s
   border posts and W8b (9)'s continuity never read a trod; it enters no charter's `roads` and crosses no frame.
   **Knowledge:** a trod is unknown to every audience but the DM's own view key until the host says a settlement knows
   it — a dated `WorldEvent` of the events window whose `where` is the trod, whose `seats` name the knowing seat and
   whose `cause` is the host's how-word, with its resolved audience, retracted by the windowed replace — or the DM
   reveals it (its `secret`, V14 §2.3's three states; the host's reveal through the party's places). The map draws and
   never decides; no knowledge enters any simulator product. **Edges:** a landmass with no public land route lays no
   trod; a patch touched by one route with fewer than two spaced touch points lays none; a standalone world with no seat
   lays none.

*Output:* `WorldRoute`s (the approach roads among them), the `route` layer, the `Trod`s and `TrodJunction`s with the `trod` layer (W7 (13)); each site placement's approach is the derived `SiteApproach` read over them (V13 §2.2).
```

*Evidence:* W7's items (V13:1754–1877): (12) ends at V13:1873; the step follows the approach road's form (V13:1831–1873); the owner's rule is HR:4 and HR:29; J-V13.122 – J-V13.124.

**B-19** — line 2435 (replacement).

*Current text (as it stands now):*
```
the **simulator feed** (`canon`, and the optional `routeFacts` and
`patrolOffer`) admits integers
```

*New text:*
```
the **simulator feed** (`canon`, and the optional `routeFacts`, `patrolOffer` and
`trods`) admits integers
```

*Evidence:* the two feeds (V13:2435–2439); the trod record is the simulator feed's third optional product (J-V13.116).

**B-20** — line 2485 (replacement).

*Current text (as it stands now):*
```
effort, the crossings and the 52-week seasonal sets — never `costTotal` — and, on request, a water edge's limits
```

*New text:*
```
effort, its ordered stretches from `a` to `b` (each a maximal run of one terrain class: integer metres, integer effort-metres and the class word — read at the call from the record's `stations` and `vertexClass`, never a field of its own; the host's per-stretch receipt and its fallback for the trods, file w), the crossings and the 52-week seasonal sets — never `costTotal` — and, on request, a water edge's limits
```

*Evidence:* ask B (HR:31); the record holds `stations` and `vertexClass` since amendments m (V13:790; AMENDMENTS-2026-10-17m.md:543); J-V13.125.

**B-21** — line 2490 (replacement).

*Current text (as it stands now):*
```
distance reader (V13 §3.9 (14)). Both optional; the host reads either only behind its own
  switch, with its tier line (it needs a canon from a placed world) and its degraded arm (absent ⇒ the prior bytes).
```

*New text:*
```
distance reader (V13 §3.9 (14)). `trods(world, request: { logHead })` → the **trod record** (`TrodRecord`, V13 §2.2; W7 (13); file w): every trod in force at the log head — its id, its two junction ids, its kind word, integer length and effort-metres under the host's cost law and its ordered stretches (metres, effort, the class word) — and every junction (its id, its point, the host edge it sits on with the integer station from the edge's `a`, the trods meeting there with their stations); its envelope the canon versions it was built against, its own version and input hash (the physical layers, the cost law, `world.trod`'s rows and the lay versions of the routes in force), the kind rows' widths and the units — no polyline (geometry rides the map feed), no knowledge, no raster index; requested between advances or at an advance head and baked with its stamp, so one answer holds through an advance; a founding or a network window that re-lays a trod steps its version. It is **no canon slot** (law (1): a trod's junctions sit on the network in force) and the additive canon never touches it. All three optional; the host reads any only behind its own
  switch, with its tier line (it needs a canon from a placed world) and its degraded arm (absent ⇒ the prior bytes).
```

*Evidence:* ask A (HR:23–28) served as a product beside `routeFacts` and `patrolOffer` (V13:2484–2491); the port consumption law (V13:2429–2433); law (1) (V13:2576–2577); the birth canon precedes the genesis (V13:3887, 3897); J-V13.116.

**B-22** — line 2503 (replacement).

*Current text (as it stands now):*
```
(V13 §3.8 (12); drawn by the host's map surface only by its own choice, H31), the patrol tints,
```

*New text:*
```
(V13 §3.8 (12); drawn by the host's map surface only by its own choice, H31), the trods' polylines and junction ticks keyed by trod id, each in the audience its secret state and the host's knowledge rows admit (an unknown trod in no audience's feed; V13 §5.1; file w), the patrol tints,
```

*Evidence:* the map feed carries geometry for the host's map surfaces (V13:2501–2503); the approach road's audience clause is the precedent.

**B-23** — line 2515 (replacement).

*Current text (as it stands now):*
```
approach road to a world site, V13 §3.8 (12), is never in it on a host-bound world, riding the `mapFeed` instead);
```

*New text:*
```
approach road to a world site, V13 §3.8 (12), is never in it on a host-bound world, riding the `mapFeed` instead; a trod never, on either world: its record is `trods` above, file w);
```

*Evidence:* `routes(world)` is the host routes' list (V13:2514–2515).

**B-24** — line 2518 (replacement).

*Current text (as it stands now):*
```
`placeOf(world, where)` → the hearing card's
  words for a `WorldWhere`.
```

*New text:*
```
`placeOf(world, where)` → the hearing card's
  words for a `WorldWhere` (a `trod` place by its kind word, the two routes its junctions sit on and the distance from one; a `junction` by its route and the distance from the nearer seat; for an audience that does not know the trod only the country it crosses — the land-use word and the seat territory's seat — never the trod's line or name; file w).
```

*Evidence:* behaviour 5 (HR:19): a place the map can name — a trod, a junction, or the country it crosses; `placeOf` (V13:2518–2519).

**B-25** — line 2558 (replacement).

*Current text (as it stands now):*
```
`hostOverlay(world, view)` (movers on host edges by fraction and embattlement phases,
```

*New text:*
```
`hostOverlay(world, view)` (movers on host edges, or on trods by the trod's id, by fraction and embattlement phases,
```

*Evidence:* the host's movers are H17's presentation messages (HRQ:83, 577), not the lens window; a mover on a trod rides the same input (§1.8).

**B-26** — line 2577 (replacement).

*Current text (as it stands now):*
```
of the physical layers, the host's cost law and the member seats, and no lived host fact enters them; (2) the host
```

*New text:*
```
of the physical layers, the host's cost law and the member seats, and no lived host fact enters them — the trod record (`trods`), whose junctions sit on the network in force, is for that reason no slot but an optional product versioned on its own (V13 §3.8 (13); file w); (2) the host
```

*Evidence:* port law (1) (V13:2575–2577) as the reason the layer is no canon slot (J-V13.116).

**B-27** — line 2592 (replacement).

*Current text (as it stands now):*
```
the water-passage class of a path (V13 §3.13's `routeClass`) is never sent
as a route's class.
```

*New text:*
```
the water-passage class of a path (V13 §3.13's `routeClass`) is never sent
as a route's class; a hidden edge of the map's own geography is a **trod** (file w; never a *way*, the settlement frame's `WayClass`, nor a *path*, *track* or *trail*), its end a **junction** (on the world: a point on a route's polyline), its kinds `goat`, `drove`, `holloway` and `game`; *hidden* is the host's grade of an overt road only — a trod is never graded and a hidden road never a trod.
```

*Evidence:* law (9) one word, one meaning (V13:2584–2593); the host registers the words (HR:47; FPS:471); J-V13.114.

**B-28** — line 2929 (insertion).

*Current text (as it stands now):*
```
(reserved: siting draws nothing, its tie-break deterministic, V13 §3.7 (6); SW-03),
```

*New text:*
```
(reserved: siting draws nothing, its tie-break deterministic, V13 §3.7 (6); SW-03), `world.trod` (reserved: W7 (13) draws nothing, its tie-breaks by cell index and lineage key; file w),
```

*Evidence:* the determinism concern list (V13:2928–2931); W7c draws nothing (§1.5).

**B-29** — line 2944 (replacement).

*Current text (as it stands now):*
```
W7a, W7b ≤ Σ over edges of the search ellipse's cells; W8a ≤
```

*New text:*
```
W7a, W7b ≤ Σ over edges of the search ellipse's cells; W7c ≤ Σ over candidate trods of their ellipses' cells + 2 × coarse cells; W8a ≤
```

*Evidence:* the work limits (V13:2942–2948).

**B-30** — line 2947 (replacement).

*Current text (as it stands now):*
```
W7 drops the remaining lowest-rank edges, W8 stops
```

*New text:*
```
W7 drops the remaining lowest-rank edges (W7c the remaining candidates in rank order, `W_TROD_CUT`), W8 stops
```

*Evidence:* F-WORK's cut per stage (V13:2946–2948).

**B-31** — line 3148 (insertion).

*Current text (as it stands now):*
```
| `patrols` (a toggle) | vector | `PatrolCadence` per route segment at the revision in force at the view's `lensWeek`: tinted by cadence (weekly, monthly, seasonal), both colours striped on a debatable segment, no arrows or headings; a covert power's DM-only | the powers' colours |
```

*New text:*
```
| `patrols` (a toggle) | vector | `PatrolCadence` per route segment at the revision in force at the view's `lensWeek`: tinted by cadence (weekly, monthly, seasonal), both colours striped on a debatable segment, no arrows or headings; a covert power's DM-only | the powers' colours |
| `trods` (a toggle; the DM's view key `showTrods`, default off) | vector | `Trod`s at the network in force at the view's week by their secret state and the host's knowledge rows (file w): for the DM a trod some settlement knows (an unretracted knowledge event), a revealed or a discovered one, with its junction ticks and the knowing seats' pips at its midpoint in their allegiance colours, lengths on hover; under `showTrods` every trod, the unknown ones as a ghost; for a player only a trod the party's `places` admit or whose knowledge row the host resolved public — never an unknown one, never greyed, no label, no length (V13 §5.8 (7)) | 0.6 px dash-dot in the kind's tint (`style.world` rows `trod.goat`, `trod.drove`, `trod.holloway`, `trod.game`); the ghost 0.4 px dotted grey |
```

*Evidence:* the layers table (V13:3130–3152); ask C (HR:33); J-V13.117.

**B-32** — line 3324 (replacement).

*Current text (as it stands now):*
```
covert links, columns and patrols fail closed — omitted,
```

*New text:*
```
covert links, columns, patrols and the trods no party place admits fail closed — omitted,
```

*Evidence:* the audience filter (V13:3323–3325); V14's dmOnly: neither drawn, listed, counted, named nor exported (V14:791–793).

**B-33** — line 3385 (replacement).

*Current text (as it stands now):*
```
a carrier the host did not send; deaths or losses estimated; a quarantine line; a border, march, patrol, army or
```

*New text:*
```
a carrier the host did not send; deaths or losses estimated; a quarantine line the host did not send (a closure the host sends as a dated fact names its gate — a town gate, a border crossing or a route's intermediary settlement — and draws as stored, the trods across it unchanged: file w); a border, march, patrol, army or
```

*Evidence:* behaviour 6 (HR:20); the plague lens's refusals (V13:3384–3386); plague-R7 open (HRQ:481); the gate collision rule (V13:3317–3318).

**B-34** — line 3428 (replacement).

*Current text (as it stands now):*
```
*Refusals:* a patrol drawn lowering danger or holding a quarantine line; a cadence sent to the host as a time. *Not drawn
```

*New text:*
```
*Refusals:* a patrol drawn lowering danger or holding a quarantine line; a cadence sent to the host as a time; a cadence or a `patrolOffer` row on a trod (V13 §3.8 (13); file w). *Not drawn
```

*Evidence:* patrols option B (J-V13.120); the patrols lens's refusals (V13:3428).

**B-35** — line 3571 (insertion).

*Current text (as it stands now):*
```
route's intermediary settlements (as the patrols lens's: no verdict per settlement is sent); the town grain (a
town-map row: the settlement frame's).
```

*New text:*
```
route's intermediary settlements (as the patrols lens's: no verdict per settlement is sent); the town grain (a
town-map row: the settlement frame's).

**9. Trods** (file w: the host's hidden ways, J-V13.126; ninth, after the patrols: M-W5's step reconciling M-W2's
`trods` layer to the record). The trod's line is V13 §5.1's `trods` layer (the map's geography, under its secret
state); this lens draws the host's marks over it. *Regimes:* **known** (the host's lane for its movers lit and its
knowledge rows sent: "settlements know trods by the host's ledger"), **revealed** (no knowledge sent — a lane dark, or
a standalone world: "no settlement's knowledge is sent: trods show only as the game master reveals them"), **still**
(no route laid: "no road is laid, so no trod meets one") — the still word keys on routes, which are public, never on a
trod count. *Sources:* the events of the host's trod-knowledge kind (its `where` a trod, its `seats` the knowing seat,
its `cause` the how-word; the adapter folder's event table tags them `trods`) under `sent`; every event whose `where` is
a trod or a junction under `sent`; the host's watch on a trod (a dated event) under `sent`; the host's lane for its
movers under `lane`.

| element | reads | drawn | class | regime | audience | scrub |
|---|---|---|---|---|---|---|
| known to | the knowledge events | the knowing seat's pip at the trod's midpoint in its allegiance colour, captioned "known to ⟨seat⟩ since week n" with the host's how-word | S, placed | known | DM; a row the host resolves public draws its trod for the party with the mark | host-dated |
| watched | the host's watch on a trod | the watcher's colour along the trod, legend "watched: the host's word" | S, placed | known | DM | host-dated |
| at the junction, on the trod | events whose `where` is a trod or a junction (a sortie, a seizure, the hearing's verdict) | the `events` layer's pin, tagged with this lens | S | every | the host's resolution | host-dated |
| junction | the record's junctions | a tick on the route only where its trod draws | P | every | follows its trod | lay versions |
| kind | the record's kind word | a caption on the trod's card | P | every | follows its trod | — |

A mover on a trod is `hostOverlay`'s (a moving marker at the host's fraction along the trod's laid line, V13 §5.8 (5)),
drawn through the live-layer registry as movers on host edges are, never a lens element. *Legend:* the banner; then one
fixed sentence in every regime and audience — "Trods show only where a settlement is known to use one or the game
master has revealed one; others may exist." — true whatever the count; the gated notes "patrols ride no trod; a trod is
watched only where the host says so" (every regime), "a closure stops the road, not the trod: the host's law" (the
host's closure sent), "who takes a trod is the host's stance rule; a mover draws only where the host places it" (the
lane lit); the host's how-words and watch words through the adapter folder's tables. *Refusals:* an unknown trod drawn
for any audience (the DM's opt-in ghost is the layer's view key, not a lens mark); a count of trods — laid, known or
revealed — on any surface; a mover's course guessed, or a mover on a trod the host did not name; an ambush, sortie or
danger at a junction the host did not send (its ambush rule is topological; the map draws the junction, never the
verdict); a line of sight presented as the host's; a patrol cadence on a trod; a trod drawn carrying, slowing or
bypassing a plague, or a quarantine line the host did not send; the host's capacity band drawn from the map's width;
a decayed road drawn as a trod, or a trod as a road. *Audience:* the DM by default; a player sees revealed and
discovered trods and the host's public rows; a settlement's knowledge, a watch and a mover DM-only unless the host
resolves them public; fail-closed (V13 §5.8 (7)). Its why: `lensWhy` per mark — the host row, its how-word, its week,
its audience, and the rule; for a party a revealed trod answers "revealed by the game master, week n" and nothing of
its neighbours.
```

*Evidence:* §5.9's lenses, each a row set of §5.8's mechanism (V13:3351–3573); the ninth after the alignment lens's text; J-V13.126.

**B-36** — line 3591 (insertion).

*Current text (as it stands now):*
```
| W7a + W7b | Σ over edges of the search ellipse's cells (A\*, V13 §3.8; C13-36) | 60 ms | 200 ms | 520 ms | ≤ 8 ns × Σ ellipse cells over edges (an edge's ellipse ≈ 2.4 × the pair's straight cost² ÷ the cell area at `maxCostFactor` 6; 300 edges at the continent rung ≈ 6 × 10⁷ cells) |
```

*New text:*
```
| W7a + W7b | Σ over edges of the search ellipse's cells (A\*, V13 §3.8; C13-36) | 60 ms | 200 ms | 520 ms | ≤ 8 ns × Σ ellipse cells over edges (an edge's ellipse ≈ 2.4 × the pair's straight cost² ÷ the cell area at `maxCostFactor` 6; 300 edges at the continent rung ≈ 6 × 10⁷ cells) |
| W7c | Σ over candidate trods of their ellipses' cells + the rough pass over coarse cells | 10 ms | 25 ms | 60 ms | ≤ 8 ns × Σ ellipse cells over candidates + 30 ns × coarse cells (a 10 km trod at the province rung ≈ 3 840 cells; 2 000 ≈ 7.7 × 10⁶ cells, ≈ 61 ms at the law's constant — the row's own figure, PLAUSIBLE until SP-W7's rerun covers it; file w) |
```

*Evidence:* the budget table (V13:3586–3594); the W7 law (V13:3591); §1.11's arithmetic.

**B-37** — line 3594 (replacement).

*Current text (as it stands now):*
```
| **total** | | **730 ms** (budget 600: **over** — the province row's budget is re-declared at 900 ms, V13 §2.3's cell is data) | **2 900 ms** (budget 1 800: **over** — re-declared at 3 000 ms) | **6 700 ms** (budget 4 500: **over** — re-declared at 7 000 ms) | |
```

*New text:*
```
| **total** | | **740 ms** (budget 600: **over** — the province row's budget is re-declared at 900 ms, V13 §2.3's cell is data; file w's W7c row within it) | **2 925 ms** (budget 1 800: **over** — re-declared at 3 000 ms) | **6 760 ms** (budget 4 500: **over** — re-declared at 7 000 ms) | |
```

*Evidence:* the total row sums the rows; W7c adds 10 / 25 / 60 ms (B-36), inside the re-declared budgets.

**B-38** — line 3656 (replacement).

*Current text (as it stands now):*
```
`WORLD-17` W7 (12) for one site ≤ 20 ms, a whole landmass's approaches ≤ 0.1 × the W7a + W7b row (V13 §3.8 (12)). Each
```

*New text:*
```
`WORLD-17` W7 (12) for one site ≤ 20 ms, a whole landmass's approaches ≤ 0.1 × the W7a + W7b row (V13 §3.8 (12)); `WORLD-18` W7 (13) whole ≤ 0.15 × the W7a + W7b row per rung, one trod's re-lay ≤ 5 ms, the trod record (`trods`) ≤ 300 ms at the continent rung, the trods' memory ≤ 4 MB at the continent rung (file w). Each
```

*Evidence:* the budget register's next id after WORLD-17 (V13:3656); T-V13-59 is its test row.

**B-39** — line 3720 (insertion).

*Current text (as it stands now):*
```
every search is bit-identical across two runs | the placement fixtures |
```

*New text:*
```
every search is bit-identical across two runs | the placement fixtures |
| T-V13-59 | trods (W7 (13); file w): on B-WORLD-lite both ends of every trod are junctions on public land routes' polylines (within a fine cell); no trod crosses water, rides a public route's or another trod's cell save at a junction, or enters a placed frame's extent + margin; every trod's open-ground share ≤ `openShareMax`, and an open plain between two roads lays none; a forest patch of 40 km² touched by two roads lays at least one and at most `perPatchMax`; every kind is its first matching row; two runs are byte-identical and a permuted route order identical; a bypass of a joined route re-joins the trod within `rejoinM` keeping both ids, a removal beyond it tombstones it with `W_TROD_UNJOINED`; a route chartered across a trod adds a `crossing` junction and leaves the course byte-identical, one chartered along it tombstones it; a demotion to hidden moves nothing; a placed frame over a patch re-lays only the trods it cuts and every other trod stays byte-identical; the trod record (`trods`) is whole or refused, integer, keyless of prose and raster indices, its stretches summing to each trod's `lengthM` and `effortM`, byte-identical when requested twice at one log head, its version stepping only when a trod changed, and the additive canon leaves it untouched; a trod carries no `PatrolCadence` and appears in no `patrolOffer`, `routeFacts` or `routes(world)` row, in no border-post proposal and in no continuity join; a reload rebuilds every trod byte-identical with its secret states kept; the work limit cuts in rank order with `W_TROD_CUT`; W7c stays within `WORLD-18` | the world fixtures; a mock host |
```

*Evidence:* §7.3 after T-V13-58 (V13:3720); the next free test id is 59 (V13 carries none above 58).

**B-40** — line 3737 (replacement).

*Current text (as it stands now):*
```
and an approach road carries no `PatrolCadence` (J393) | fixtures |
```

*New text:*
```
and an approach road carries no `PatrolCadence` (J393), and a trod carries none and has no `patrolOffer` row (file w) | fixtures |
```

*Evidence:* T-V13-42 (V13:3737); option B.

**B-41** — line 3738 (replacement).

*Current text (as it stands now):*
```
its Treinf in cost units under the sent calibration | the travel-law fixture |
```

*New text:*
```
its Treinf in cost units under the sent calibration; `routeFacts`' ordered stretches per host edge sum to its `lengthM` and its land effort-metres, agree with its `stations` and `vertexClass` run by run, and are byte-identical whatever the laying order (file w) | the travel-law fixture |
```

*Evidence:* T-V13-43 (V13:3738); ask B.

**B-42** — line 3745 (replacement).

*Current text (as it stands now):*
```
never a historic front, a suppressed creed or a criminal channel | the audience fixtures |
```

*New text:*
```
never a historic front, a suppressed creed, a criminal channel or a trod the party's places do not admit (T-V13-60; file w) | the audience fixtures |
```

*Evidence:* T-V13-50 (V13:3745).

**B-43** — line 3751 (insertion).

*Current text (as it stands now):*
```
relief and credit draw no link where the host names no giver | the trade fixtures |
```

*New text:*
```
relief and credit draw no link where the host names no giver | the trade fixtures |
| T-V13-60 | the trods' reveal and leak (file w): two worlds differing only in their unknown trods give a byte-identical player picture, legend, picker, screen-reader summary, `placeOf` words for the party, `mapFeed` for the player audience and every player-audience export; the DM's default picture likewise, and only `showTrods` on differs; a trod `revealed` by `setAttr` or by the party's places draws for the party, `discovered` reads `local`; a knowledge event resolved public draws its trod for the party with the seat's mark, one DM-only does not; a retracted event removes the mark; a public event on an unknown trod draws its point with the country's words and no line; a party export never carries a trod the party's places do not admit; the hearing's `trod` and `junction` places render for the DM and read only the country for the party | the audience fixtures; a mock host |
| T-V13-61 | the trods lens (file w; M-W5): the regimes known, revealed and still from the window's regime and the routes laid, never from a count; the known-to pip from its event's week with the host's how-word; a watch only where sent; a mover on a trod at the host's fraction through `hostOverlay`, covert ones omitted; the fixed legend sentence in every regime and audience; every refusal asked as a draw returns `refuse.lens.invented`; `lensWhy` names the row | the lens fixtures |
```

*Evidence:* §7.4 after T-V13-56 (V13:3751); the leak surfaces of §1.7; the ninth lens.

**B-44** — line 3766 (insertion).

*Current text (as it stands now):*
```
| `W_SITE_NO_ROAD_ACCESS` | warning | W7 (12) (J393) | the site, the nearest route of its kind's class and its distance |
```

*New text:*
```
| `W_SITE_NO_ROAD_ACCESS` | warning | W7 (12) (J393) | the site, the nearest route of its kind's class and its distance |
| `W_TROD_UNJOINED` / `W_TROD_CUT` | warning | W7 (13) (file w) | the trod and the route its junction lost / the candidates dropped at the work limit |
```

*Evidence:* the report codes (V13:3754–3766); W7 (13) (g), (h).

**B-45** — line 3814 (replacement).

*Current text (as it stands now):*
```
the routes, seat territory, sway, occupation, debatable, fighting, patrol and event layers; standalone `setSeats` | T-V13-14, 16, 17, 38, 39, 41 – 43, 46, 57, 58; the B-WORLD statistics bars | 8 pw (J393's
```

*New text:*
```
the routes, seat territory, sway, occupation, debatable, fighting, patrol, event and trods layers; W7 (13)'s trods with their junctions, the `trod` layer, the party's secret states and the DM's reveal, the port's `trods` record, `routeFacts`' ordered stretches, the `trod` and `junction` places, `hostOverlay`'s movers on trods and the knowledge events' fold (file w); standalone `setSeats` | T-V13-14, 16, 17, 38, 39, 41 – 43, 46, 57 – 60; the B-WORLD statistics bars | 9 pw (file w's trods ≈ 1 pw — W7 (13), the record, the layer, the secret states and T-V13-59 – 60 — on the row's whole-week resolution; J393's
```

*Evidence:* M-W2 carries W7, the approaches, `routeFacts` and `mapFeed` (V13:3814); Q6 (HR:43); §1.12.

**B-46** — line 3816 (replacement).

*Current text (as it stands now):*
```
the sway (territory) and patrols (M-W2's layers reconciled to the record); trade and populations;
```

*New text:*
```
the sway (territory) and patrols (M-W2's layers reconciled to the record); the trods (M-W2's `trods` layer reconciled to the record: the knowing seats' marks, the host's watches, the junction and kind captions, the fixed legend sentence; V13 §5.9 (9); file w); trade and populations;
```

*Evidence:* M-W5's steps (V13:3816).

**B-47** — line 3816 (replacement).

*Current text (as it stands now):*
```
(V13 §5.9) | T-V13-47 – T-V13-56 | 7 pw |
```

*New text:*
```
(V13 §5.9) | T-V13-47 – T-V13-56, 61 | 7 pw (the trods step ≈ 0.25 pw, below the row's resolution; file w) |
```

*Evidence:* M-W5's gate and estimate (V13:3816).

**B-48** — line 3820 (replacement).

*Current text (as it stands now):*
```
with the estimate range 37–45 pw,
```

*New text:*
```
with the estimate range 38–46 pw (37–45 before file w's trods, ≈ 1 pw on M-W2),
```

*Evidence:* the staged row (V13:3819–3820); INDEX:39 and SUMMARY:124 carry the same figure (B-I2, B-S2).

**B-49** — line 3906 (insertion).

*Current text (as it stands now):*
```
| H31 | after M-W3, after H19 (optional; J393) | its map surfaces draw the map feed's approach roads — the map's own roads to world sites, keyless — as presentation labelled "map road", read by no step of its simulation | M-W2; H19 |
```

*New text:*
```
| H31 | after M-W3, after H19 (optional; J393) | its map surfaces draw the map feed's approach roads — the map's own roads to world sites, keyless — as presentation labelled "map road", read by no step of its simulation | M-W2; H19 |
| H32 | with M-W2 (the trod record), after H9, H12 and H17 | the trod asks (file w): (a) its knowledge of a trod per settlement sent as a dated event of the events window — the knowing seat, the trod's id, its how-word through the adapter folder's vocabulary table, the week, the resolved audience (DM-only where unresolved) — and retracted by the windowed replace when its ledger forgets; (b) every engagement on a trod or at a junction with its `where` naming the trod (its id and a fraction) or the junction; (c) its movers on trods in the presentation messages by the trod's id and a fraction, projected for the audience; (d) a watch on a trod, where it keeps one, as a dated event; (e) its reader of the trod record (`trods`) behind its own switch, with its tier line and its degraded arm, requested between advances and baked with its stamp, kept beside its frozen digest (at 2 000 trods the record is the size of its digest cap); (f) its register rows for `trod`, `junction` and the four kind words, `hidden` kept for its grade; (g) its stand-in cover graph over `routeFacts`' stretches retired when (e) lands | M-W2; H9; H12; H17 |
```

*Evidence:* the host's track ends at H31 (V13:3906); every lens step has its asks row (H24–H30); the request's own list (HR:46–47).

**B-50** — line 4028 (insertion).

*Current text (as it stands now):*
```
(item 133 (e)) (vetoable) |
```

*New text:*
```
(item 133 (e)) (vetoable) |
| J-V13.114 | **(file w.)** chose **`trod`** for the host's hidden way, and **`hidden` kept as the host's grade of an overt road only**, over `way` (the settlement frame's `WayClass` and the glyph's way mark) and over `byway`, `trace`, `track`, `trail` and `path` (each a record, a layer or a class already), because one word carries one meaning across the seam (law (9)) and a world record named `way` would meet a frame record named `Way` at every ring crossing (vetoable) |
| J-V13.115 | **(file w.)** chose **a record of its own kind, `Trod` with `TrodJunction` ends**, over a seventh `WorldRoute.class` or a `WorldRoute` of a new origin with two `join`s, because a trod has no seat, no host key, no leg, no class, no patrol and no charter road — every reader of `WorldRoute` would need an exclusion — and the approach road already shows what one junction-ended line costs each reader (vetoable) |
| J-V13.116 | **(file w.)** chose **the trod record as an optional simulator product (`trods`), versioned on its own against the canon's versions**, over a canon slot, because law (1) admits no lived network into a slot, the birth canon precedes the genesis the trods need, and the additive canon must move only the added seats' rows (vetoable) |
| J-V13.117 | **(file w.)** chose **an unknown trod undrawn in every picture, the DM's default included, the whole network behind a default-off view key**, over an always-on DM ghost (a DM's picture export would carry every trod) or no ghost (the DM could not reveal what it cannot see) (vetoable) |
| J-V13.118 | **(file w.)** chose **knowledge per settlement as the host's dated event in the events window, drawn and never decided by the map, and the party's `SecretState` as the record's only map-owned knowledge**, over a knowledge flag on the record written by the host (the map would store the host's state as its own fact) or a fourth knowledge tier (J-V14.12's reason) (vetoable) |
| J-V13.119 | **(file w.)** chose **one fixed, count-free legend sentence and no regime word, picker state, label, summary, place word or export that reads a trod count**, over a count (the leak the host names) or a legend row shown only when a trod is known (its presence would itself tell a player one exists) (vetoable) |
| J-V13.120 | **(file w.)** chose **no patrol cadence on any trod, no `patrolOffer` row, a watch drawn only as the host sends it**, over a map cadence on a known trod, because J396 keeps patrols map-only, the host has no patrol rule, and a cadence would put patrol pieces in the crop where the host watches nothing (vetoable) |
| J-V13.121 | **(file w.)** chose **`WorldWhere` kinds `trod` and `junction`, the party reading only the country it crosses where it does not know the trod**, over `point` (the hearing card could not name the place) or `road` (a trod would count as a road for every reader of roads) (vetoable) |
| J-V13.122 | **(file w.)** chose **W7c's density as terrain parameters — rough land uses and a relief threshold, one trod per `perRoughKm2` of rough country, an open-ground share cap — in a rule table the host can read**, over counting trods per province or per road, because the owner's rule is "several per rough country, none across open plain" and a cap by rough area is what that says (vetoable) |
| J-V13.123 | **(file w.)** chose **generated trods rebuilt on load and reasoned on demand, only their secret states persisted**, over storing them, because 2 000 stored trods would take nine tenths of a province's record headroom and the same density would break the continent's 24 MB (vetoable) |
| J-V13.124 | **(file w.)** chose **a road born along a trod superseding it, a decayed road never becoming a trod, and no trod born where a road dies**, over a trod minted from a dead road, because the host has no such law and asks for none, the hidden-graded road already is the overgrown way with its own key, and a trod's law is cover, not history (vetoable) |
| J-V13.125 | **(file w.)** chose **`routeFacts`' ordered stretches as a reading over `stations` and `vertexClass`**, over a new `WorldRoute` field, because the record already holds the data and a stored run list would be a second state in the digest for nothing (vetoable) |
| J-V13.126 | **(file w.)** chose **the trod's line a structural layer of M-W2 and the host's marks over it a ninth lens of M-W5**, over a lens holding the geography (read by no stage, so W7c, the crop and `placeOf` could not read it) or no lens (the knowing seat's mark, the watch and the fixed sentence belong to the one lens record and its audience filter) (vetoable) |
```

*Evidence:* §9's last row is J-V13.113 (V13:4028); each row "chose X over Y because Z".

**B-51** — line 4399 (insertion).

*Current text (as it stands now):*
```
that the door V13 §11 Q4 asks the owner to confirm names every route by which the canon enters the host's simulation
(the owner confirmed it on 2026-10-18: file r item 926).
```

*New text:*
```
that the door V13 §11 Q4 asks the owner to confirm names every route by which the canon enters the host's simulation
(the owner confirmed it on 2026-10-18: file r item 926).

**BCR-V13-41 — §9.2 (the admission function), §7.7 (the world port's paragraph) and §11.3 (the world's view keys): a
trod's secret state, the `trods` product, the `showTrods` key.** (File w; J-V13.114 – J-V13.126.) In §9.2's admission
sentence, "A place's `SecretState` (…) is read through `knownTo` and the key's `places` by the same admission function"
reads also a world trod's (V13 §3.8 (13)), its id a place's address in the party's `places`, so a party view neither
draws, lists, counts, names nor exports a trod the party's places do not admit; in §7.7's world port paragraph the
simulator feed's optional products are named — `routeFacts`, `patrolOffer` and `trods` (the trod record); in §11.3 the
world's per-viewer keys gain `showTrods` (default false: the DM's whole trod network, V13 §5.1). The base's `WayClass`
is untouched: the word moves, not the class.
```

*Evidence:* §10's last request is BCR-V13-40 (V13:4391–4400); §10.2 follows at V13:4402.

**B-52** — line 4432 (replacement).

*Current text (as it stands now):*
```
The host's own changes (V13 §8.5's H1–H31) are the host's
```

*New text:*
```
The host's own changes (V13 §8.5's H1–H32) are the host's
```

*Evidence:* Q2 names the host-row count (V13:4432).

**B-53** — line 4437 (replacement).

*Current text (as it stands now):*
```
H12–H17 and H22 with M-W2, H23–H30 with M-W5, H18–H20 after M-W3
```

*New text:*
```
H12–H17, H22 and H32 with M-W2, H23–H30 with M-W5, H18–H20 after M-W3
```

*Evidence:* Q2's recommendation schedules each host row (V13:4436–4437).

**B-54** — line 4460 (insertion).

*Current text (as it stands now):*
```
row's prerequisites (H5 on M-W1; H22 on H5, H7, H8 and H12) and lands on the owner's schedule for the host's track
(Q2).
```

*New text:*
```
row's prerequisites (H5 on M-W1; H22 on H5, H7, H8 and H12) and lands on the owner's schedule for the host's track
(Q2).

**Q5 — The quarantine closure's map side (the host's hidden-ways request, file w).** The host's quarantine or
gate-closure verb is designed only, and whether it is built is the owner's value on the host side (plague-R7, open).
The map today refuses every quarantine line (V13 §5.9's plague and patrols refusals). What remains the owner's: when
that verb is ruled, whether a closure reaches the map as a **host-stored dated fact naming its gate** (a town gate, a
border crossing or a route's intermediary settlement, never bare) through the events window, drawn as stored by the
plague lens, the trods across it drawn unchanged under the note "a closure stops the road, not the trod: the host's
law" — a capability across the boundary the host would add with the verb. *Recommendation:* yes, as a dated event with
its resolved audience, never as a patrol holding a line and never as a closure the map computes; until the verb exists
the refusal stands as narrowed by file w ("a quarantine line the host did not send").
```

*Evidence:* §11 Q1–Q4 (V13:4423–4462); Q5 is the one true owner decision this design finds (§3).


### §2.2 `docs/volumes/V14-sites.md` — 2 fragments

**B-V1** — line 2091 (replacement).

*Current text (as it stands now):*
```
   class, biome, the route or river within the rectangle, the seat territory and the polity at the point and the
```

*New text:*
```
   class, biome, the route, trod (V13 §3.8 (13); only one the crop's audience admits by its secret state, laid as a path band of its kind's width, never a patrol piece; file w) or river within the rectangle, the seat territory and the polity at the point and the
```

*Evidence:* E1's world case reads the route within the rectangle (V14:2090–2104); a trod enters the crop only for an audience its state admits.

**B-V2** — line 3177 (replacement).

*Current text (as it stands now):*
```
W8b (14)'s patrol source through the approach; border posts' `at` on the route's polyline | V14 §2.2,
```

*New text:*
```
W8b (14)'s patrol source through the approach; border posts' `at` on the route's polyline; (19) the trods (V13 §3.8 (13); file w): a `Trod`'s polyline, kind and `SecretState` read by E1's world crop and E4 for an audience its state admits, the party's `places` holding a trod's id as a place's (BCR-V14-19's key form), no patrol piece on a trod, the hideout kind's `awayFromRoutes` counting no trod | V14 §2.2,
```

*Evidence:* V14 §10.2's precise requests to V13 end at (18) (V14:3177).


### §2.3 `docs/ARCHITECTURE.md` — 3 fragments

**B-B1** — line 15744 (replacement).

*Current text (as it stands now):*
```
A place's `SecretState` (V14 §2.3: `dmOnly`, `revealed`, `discovered`; M-SITE-A; file k item 626) is read through `knownTo` and the key's `places` by the same admission function:
```

*New text:*
```
A place's `SecretState` (V14 §2.3: `dmOnly`, `revealed`, `discovered`; M-SITE-A; file k item 626) — and a world trod's (V13 §3.8 (13); file w, BCR-V13-41), its id a place's address in the party's `places` — is read through `knownTo` and the key's `places` by the same admission function:
```

*Evidence:* BCR-V13-41; the base's hidden-place rule withholds the label only (BASE:15729–15731), the trod needs the geometry withheld.

**B-B2** — line 12903 (replacement).

*Current text (as it stands now):*
```
outbound the simulator feed `canon(world, request)` (integer, versioned per slot, adopted only by the host's receipted canonize: a new campaign's birth canon, V13 §8.5's H22, or a re-canonize; file q item 916, BCR-V13-40) and the map feed
```

*New text:*
```
outbound the simulator feed `canon(world, request)` (integer, versioned per slot, adopted only by the host's receipted canonize: a new campaign's birth canon, V13 §8.5's H22, or a re-canonize; file q item 916, BCR-V13-40) with its optional products `routeFacts`, `patrolOffer` and `trods` (the trod record, V13 §3.8 (13); file w, BCR-V13-41) and the map feed
```

*Evidence:* BCR-V13-41; §7.7's world port paragraph (BASE:12903).

**B-B3** — line 4202 (replacement).

*Current text (as it stands now):*
```
`showTraces` (default false), `surfaceDate`
```

*New text:*
```
`showTraces` (default false), `showTrods` (default false: the DM's whole trod network, V13 §5.1; file w, BCR-V13-41), `surfaceDate`
```

*Evidence:* BCR-V13-41; the world's per-viewer keys (BASE:4202; BCR-V13-5).


### §2.4 `docs/HOST-REQUIREMENTS-2026-10-18.md` — 9 fragments

**B-H1** — line 625 (replacement).

*Current text (as it stands now):*
```
| It needs the per-stretch terrain classes the map does not return ("needs T2"). Context for encounters with armies on the move. Ledger row T9, PARTLY. Ledger I/O: TICK. |
```

*New text:*
```
| The per-stretch terrain classes it needs ("needs T2") are on the map's record since amendments m (`WorldRoute.vertexClass` per segment, `docs/volumes/V13-world.md` §2.2 line 790) and, by the map's answer to the host's hidden-ways request (file w), `routeFacts` returns each host edge's ordered stretches — integer metres, integer effort-metres and the class word per run — with M-W2 (V13 §3.11.6); the host's reader of them is its own. Context for encounters with armies on the move. Ledger row T9, PARTLY on the host side (the map side SUPPLIED from M-W2). Ledger I/O: TICK. |
```

*Evidence:* ENC-HP-09 (HRQ:625); ask B (HR:31); V13:790, 2484.

**B-H2** — line 606 (replacement).

*Current text (as it stands now):*
```
gives each route a line, a total cost and a reason, but no per-stretch breakdown.
```

*New text:*
```
gave each route a line, a total cost and a reason, but no per-stretch breakdown when the note was written; the record now carries a terrain class per segment and `routeFacts` returns the ordered stretches (file w).
```

*Evidence:* ENC-HS-06 (HRQ:606), the ledger's T2 row; the note read V13 at 2 988 lines (FPI:484).

**B-H3** — line 606 (replacement).

*Current text (as it stands now):*
```
| Ledger row T2, verdict MISSING (`WorldRoute` has no per-segment terrain class). Ledger I/O: ONE-SHOT at canonize. |
```

*New text:*
```
| Ledger row T2, verdict MISSING as the note read V13 at 2 988 lines; since amendments m `WorldRoute` carries `vertexClass` per segment and `byClassM` (V13 §2.2 line 790), and file w adds the ordered stretches to `routeFacts` (M-W2): the map side SUPPLIED from M-W2, the note's row stale. Ledger I/O: ONE-SHOT at canonize. |
```

*Evidence:* ENC-HS-06's verdict cell (HRQ:606).

**B-H4** — line 653 (replacement).

*Current text (as it stands now):*
```
but did not build it; the map offers no detour either. (ENC-HL-10)
```

*New text:*
```
but did not build it; the map re-lays the host's own `bypass` as a dated lay version (V13 §3.8 (9), T-V13-41 (u)) and offers no detour of its own; a trod (file w) is never a detour. (ENC-HL-10)
```

*Evidence:* ENC-HL-10 (HRQ:653) predates W7 (9)'s bypass fold (V13:1813–1815); ask D (HR:35) touches it.

**B-H5** — line 653 (replacement).

*Current text (as it stands now):*
```
| Ledger row R4: STUB (DESIGN_ROUTE_LIFECYCLE §5c); verdict MISSING. |
```

*New text:*
```
| Ledger row R4: STUB (DESIGN_ROUTE_LIFECYCLE §5c); verdict MISSING on the host side, the map's bypass re-lay standing (V13 §3.8 (9)). |
```

*Evidence:* ENC-HL-10's verdict cell (HRQ:653).

**B-H6** — line 654 (replacement).

*Current text (as it stands now):*
```
that is map geometry, and the map must not present it as host truth. |
```

*New text:*
```
that is map geometry, and the map must not present it as host truth. A trod's junction (file w) is a topological fact — which trod meets which route where — carrying nothing sight-related; the host's ambush rule reads no sight line. |
```

*Evidence:* ENC-HL-11 (HRQ:654); behaviour 4 (HR:18).

**B-H7** — line 655 (replacement).

*Current text (as it stands now):*
```
| A "hidden" road class: paths only smugglers and wanderers use, never armies. The host's road ladder ends in "hidden", designed but dark; the map's classes end at "trail". (ENC-HL-12) | Smuggler and wanderer encounters would sit on these paths. | Ledger row M4: STUB; verdict MISSING. | Ledger I/O: TICK. |
```

*New text:*
```
| A "hidden" road class: paths only smugglers and wanderers use, never armies. The host's road ladder ends in "hidden", designed but dark; the map's classes end at "trail". (ENC-HL-12) **Answered by the map (file w):** the map lays **trods** — hidden edges of its own geography, never a route class and never the host's `hidden` grade (which stays a decayed overt road, drawn DM-only) — in rough country, never across open plain, each joining two junctions on the overt network, with ordered stretches in the host's terrain classes, integer effort under the host's cost law and a kind word (`goat`, `drove`, `holloway`, `game`) with a width the host turns into its own band; served as the simulator feed's trod record (`trods`) with M-W2; who knows, rides and fights on one is the host's, sent through the events window and the presentation messages (H32). | Smuggler, wanderer and body encounters sit on trods; a trod's junction is the sortie point. | Ledger row M4: STUB on the host side; the map side DESIGNED (file w; M-W2). | Ledger I/O: TICK (the record read between advances). |
```

*Evidence:* ENC-HL-12 (HRQ:655), the row the request fills (HR:6); M4 (FPI:159, 455).

**B-H8** — line 656 (replacement).

*Current text (as it stands now):*
```
Every engagement kind needs a place the map can name, so the host's engagement registry is where the map's typed places and border segments will be read. |
```

*New text:*
```
Every engagement kind needs a place the map can name, so the host's engagement registry is where the map's typed places and border segments will be read; with file w a hearing card's where may name a trod (its id and a fraction) or a junction (`WorldWhere` kinds `trod`, `junction`; `placeOf`). |
```

*Evidence:* ENC-HL-13 (HRQ:656); behaviour 5 (HR:19).

**B-H9** — line 84 (insertion).

*Current text (as it stands now):*
```
(J386; J387; J388); the premium canonize entitlement never gates it (lines 3729–3730, 3760) |
```

*New text:*
```
(J386; J387; J388); the premium canonize entitlement never gates it (lines 3729–3730, 3760) |
| H32 | The trod asks (V13 §8.5 H32; file w): send its knowledge of a trod per settlement as a dated event of the events window (the knowing seat, the trod's id, its how-word, the week, who may see it), retracted when its ledger forgets; name a trod or a junction as an engagement's where; send its movers on trods in the presentation messages by the trod's id and a fraction; send a watch on a trod as a dated event; read the trod record (`trods`) behind its own switch, requested between advances and baked with its stamp, kept beside its frozen digest (at 2 000 trods it is the size of the digest cap); register `trod`, `junction` and the four kind words, keeping `hidden` for its grade; retire its stand-in cover graph when the record lands. Host: its bodies, its events window, its presentation layer. | The map draws a trod only where the host says a settlement knows it or the DM reveals it, and names the place of every engagement on one; the host's bodies path on the record. | M-W2; H9; H12; H17. | Export plus one read behind its switch |
```

*Evidence:* the host document's M-W2 table (HRQ:76–85); V13 §8.5's H32 (B-49).


### §2.5 `docs/volumes/INDEX.md` — 4 fragments

**B-I1** — line 222 (replacement).

*Current text (as it stands now):*
```
(V13 §8.5's H1–H31) against M-W1 – M-W3 and M-W5
```

*New text:*
```
(V13 §8.5's H1–H32) against M-W1 – M-W3 and M-W5
```

*Evidence:* INDEX's Q2 row (INDEX:222) mirrors V13 §11 Q2 (B-52).

**B-I2** — line 222 (insertion).

*Current text (as it stands now):*
```
H18–H20 and the optional H31 after M-W3
```

*New text:*
```
H18–H20 and the optional H31 after M-W3, H32 with M-W2 (the trods, file w)
```

*Evidence:* INDEX's Q2 recommendation (INDEX:222) mirrors V13 (B-53).

**B-I3** — line 39 (replacement).

*Current text (as it stands now):*
```
the sway and patrols (the owner's territory rules, V13 §3.9); the lenses over the host's simulated systems (V13 §5.8, §5.9); the map-import adapter and the ecosystem-shaped exports |
```

*New text:*
```
the sway and patrols (the owner's territory rules, V13 §3.9); the trods — the hidden ways the host's bodies travel, laid in rough country between junctions on the roads, unknown until the host says a settlement knows one (W7 (13); file w); the lenses over the host's simulated systems (V13 §5.8, §5.9); the map-import adapter and the ecosystem-shaped exports |
```

*Evidence:* INDEX's V13 row (INDEX:39) names the volume's contents.

**B-I4** — line 39 (replacement).

*Current text (as it stands now):*
```
| 37–45 as one staged row (M-W0h ≈ 4 inside it; BCR-V13-37, file o item 877) |
```

*New text:*
```
| 38–46 as one staged row (M-W0h ≈ 4 inside it, the trods ≈ 1 on M-W2; BCR-V13-37, file o item 877; file w) |
```

*Evidence:* INDEX's V13 estimate (INDEX:39) mirrors V13 §8.2 (B-48).


### §2.6 `docs/volumes/SUMMARY.md` — 2 fragments

**B-S1** — line 74 (insertion).

*Current text (as it stands now):*
```
    in once as data and written back out in the shapes its tools expect; nothing the campaign already has is lost.
```

*New text:*
```
    in once as data and written back out in the shapes its tools expect; nothing the campaign already has is lost.
    Off the roads, in rough country — woods, hills, marsh and mountain — the world also lays **trods**: the hidden
    footways brigands, smugglers and beasts travel, each joining two roads at junctions the game master can name, never
    across open plain, unknown to every town until the campaign says one has learned it, and never drawn for the players
    until then or until you reveal it (the host's hidden-ways request of 18 October).
```

*Evidence:* SUMMARY's plain-words account of the world (SUMMARY:61–74).

**B-S2** — line 124 (replacement).

*Current text (as it stands now):*
```
- **The world (volume 13):** about **37–45 person-weeks** (the water system
```

*New text:*
```
- **The world (volume 13):** about **38–46 person-weeks** (the trods about 1 of them, with the routes; the water system
```

*Evidence:* SUMMARY's estimate (SUMMARY:124) mirrors V13 §8.2 (B-48).

---

## §3 Owner questions (true owner decisions only, each with a recommendation)

**Q5 — the quarantine closure's map side** (carried into V13 §11 by B-54). The host's quarantine or gate-closure verb
is designed only, and whether it is built is the owner's value on the host side (plague-R7, HRQ:481 [STATED]); the map
refuses every quarantine line today (V13:3385, 3428 [STATED]). The owner's: when the verb is ruled, whether a closure
reaches the map as a host-stored dated fact naming its gate through the events window, drawn as stored, the trods
across it unchanged — a capability across the boundary the host adds with the verb. *Recommendation:* yes, as a dated
event with its resolved audience, never a patrol holding a line and never a closure the map computes; until then the
refusal stands as narrowed ("a quarantine line the host did not send").

**Rulings taken under the delegation, flagged for the veto rather than asked** (each a J-V13 row): the word `trod`
(J-V13.114 — the request says "we pick another word before either side mints it", HR:10; the map proposes, the host
registers, the owner may veto); the trod record as a simulator product read by the host's simulation (J-V13.116 — a
new world-scale fact flowing to the host, which the request reads the owner's 2026-10-18 "1. yes" as covering: "routes,
ground, territory, sites, and now hidden ways", HR:9; the owner's word of file r item 926 names the canon, not a product
beside it, so this reading is the design's and vetoable); the re-pricing of M-W2 by ≈ 1 pw and the staged row to 38–46
(J-V13.123's rebuild-on-load keeps the storage cost at nil; the week is W7c's and the record's). No money question is
put beyond that re-pricing; no product-order question is the map's (the bodies chain's prerequisite is the host's own
schedule, V13 §11 Q2).

## §4 What this design deliberately leaves out, and why

1. **No `kind: 'hidden'` and no seventh route class** — two meanings of one word on both sides (§0 Q0, Q3).
2. **No canon slot for the trods** — law (1), the birth sequence and the additive canon forbid it; the product gives the
   host the same versioned, baked record (§1.6).
3. **No seat (gate) end on a trod** — a gate station is frame geometry behind door 1 (V13:1829–1830, 1848); the junction
   on the road that enters the town is the nearest host-nameable point; a `seat` end can be added by one field later if
   the host's bodies need it, with no change to the product's shape.
4. **No DM-authored trods (`addTrod`) in this pass** — the request asks for the map's genesis; a DM edit kind is a §4.1
   row of its own with its tool, lifecycle row and undo (V13:569), and nothing in the six behaviours needs it; the DM's
   reveal (`setAttr` on the secret state) is the one edit admitted.
5. **No capacity band, no stance, no "never armies" on the map's side** — the host derives the band (HR:16) and decides
   the stance (HR:15); the recorded host rule says "armies may not" (FPI:159) while the request admits a small unit
   (HR:15): a host rule in motion, which the map's neutral record does not freeze.
6. **No cadence, watch or coverage of the map's own on a trod** — option B (J-V13.120); the host has no patrol rule
   (HRQ:711) and J396 keeps patrols map-only.
7. **No trod born where a road dies** — the position of §1.9 (J-V13.124); the host asked the map not to want one.
8. **No seasonal sets on a trod** — the host's slow-not-sever season is per terrain class (`TravelLaw.season.terrainFactor`,
   V13:858), which the stretches already carry; a winter is never a cut.
9. **No trod in `ecosystemJson`** — the schema has no row (V13:3209); the DM's GeoJSON and CSV carry them.
10. **No per-town knowledge in the lens *window* (H23)** — the host's preference is the events window (HR:42), and
    V13's inbound events are recorded, windowed-replace facts with a resolved audience (V13:2549–2551), which a plate is
    not; the lens reads the events (every lens does, V13:3268–3271).
11. **No correction of V13's own records-budget arithmetic** ("≤ 10⁵ records … ≈ 120 B each gzipped, inside the 2 MB",
    V13:1352–1354, which is 12 MB) — observed in §1.11 and left to the critic or a fix round: outside the request.
12. **No fragment for INDEX:14's list of applied files** — file w is applied by the apply lane, which adds its clause
    then, as files r–v were added.
13. **The four one-clause amendments to J-V13.66, 77, 92 and 93** (§1.14) are stated, not carried as fragments — each
    is a row the synthesis may fold or add; the new rows J-V13.114–126 stand on their own.
14. **No change to the host's `hostOverlay` grammar beyond the trod id** — the mover's fraction, audience projection and
    no-destination rule are unchanged (V13:2558–2559); the host's "presence rows (H23)" are H17's movers (§1.17 (4)).
15. **No line-of-sight anything on a junction** — behaviour 4 (HR:18) and ENC-HL-11 (HRQ:654) both forbid it; a post's
    viewshed stays the patrols lens's hover reading (V13:3426).
