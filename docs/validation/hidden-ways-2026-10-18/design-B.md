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

