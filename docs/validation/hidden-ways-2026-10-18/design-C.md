# THE HIDDEN WAYS — design C (lifecycle-and-coherence-first), 2026-10-18

**Seat:** designer hidden-ways/design-C (Fable/xhigh), workflow hidden-ways-design (J407), under J404's delegation
("Decisions and judgment to you", `docs/PROGRESS.md:463`); every ruling here is vetoable. **Angle:** start from the route
lifecycle (W7 (9)–(12), the host's grades, demotion, revival, bypass, the DM-only ghost; ENC-HP-13, ENC-HL-10), the
one-word-one-meaning rule, the world-site record's reveal precedent (V14 §1b.5, §2.3), V13 §2.5's identity rules, §2.7's
size budget and §8.2's milestone order — and design so that **no existing route, site, lens or canon text changes its
meaning**: every seam is shown as a fragment in §2.

**Read whole before designing:** the request `docs/host-requests/2026-10-18-hidden-ways.md` (47 lines, md5 `251c96a9…`;
cited HR:n); the five reader records of this lane (`read-request.md`, `read-v13-routes.md`, `read-v13-lenses.md`,
`read-v14-base.md`, `read-host.md`); `docs/volumes/V13-world.md` (md5 `e68af748638dd3c8474d21b37005c7ac`, 4 611 lines;
cited V13:n) at §1b, §2.2, §2.3, §2.5–§2.7, §3.0, §3.8, §3.9 (9), (14), (16), §3.11.6, §3.14.3, §3.16, §3.17, §5.1,
§5.4, §5.6, §5.8, §5.9, §6, §7.3, §7.5, §8.2, §8.5, §9, §10, §11; `docs/volumes/V14-sites.md` (md5
`f5dd37a7e9b739da7f29095d47a17a87`; V14:n) at §1b.5, §2.3, §2.5, §3.4 E1 (4), §5.1, §8, §10.2; `docs/ARCHITECTURE.md`
(md5 `eac3a6a5ee2c58534185318949ebd8ba`; BASE:n) §2.4; `docs/HOST-REQUIREMENTS-2026-10-18.md` (md5
`7db37cc1a4e03fc8db665c1be9d55211`; HRQ:n) at its H lists and ENC rows; `docs/AMENDMENTS-2026-10-18t.md` for the item
form; the host's facts only from `research/sf/*.md` (FPI = `fp-physical-integration.md`) and HRQ. **Tags:** [STATED] the
cited text says it; [OBSERVED] checked in the repository by this seat (grep, counts, line positions); [INFERRED] this
seat's reasoning or ruling. **Clean room:** every text bound for V13, V14, HRQ, INDEX or SUMMARY (§2) names host facts
by the port's field names and the adapter folder's tables; host document names, ruling ids and research citations stay in
the Evidence lines. No host code was read or copied.

---

## §0 The answers

**The word.** The host's `way` collides: it is the settlement frame's skeleton record, `type WayClass = 'through'|…|'ford'`
and `interface Way` (BASE:1093–1103) [STATED], the glyph's mark kind `'way'` (V13:803) [STATED], the charter's `class:
WayClass` that turns every world route crossing a frame's ring into a frame `Way` (V13:762, V13:2277) [STATED], and V14's
"way bands", "way corridor", "quay way", "raised way" and J393's "the way to the gate" (V14:424, 2052, 1043, 2309,
1799–1806) [STATED]. The host's `hidden` collides too: V13 already reads it as **the host's grade on an overt host route**
— `grade?: string /* … hidden among them */` (V13:788), "a demotion keeps the polyline; a revival restores the hidden one
… a hidden land road is a DM-only ghost … a hidden road counts as no public road" (V13:1813–1820), "a road the host grades
hidden: none" for patrols (V13:2065, V13:1163) [STATED] — and the host's own ledger ties the rung to decay ("grade ladder
down to `hidden`, never absence", FPI:99; "the overgrown road", FPI:159) [STATED]. **The free word this design mints is
`trod`** (plural *trods*): 0 whole-word hits in V13, V14, the base, the host document, the research notes and the whole
repository outside this lane's own records [OBSERVED: `grep -oiw`]; a dialect English noun for a narrow path worn by
feet and beasts, which is exactly the thing (a body of thirty, never a column); one syllable, so `WorldTrod`, `TrodEnd`,
`TrodLayRule`, `world.trods`, `trodKnown`, `W_TROD_SPARSE` read cleanly. Rejected [INFERRED]: *byway* (0 hits in the
volumes, but its plain sense is a minor public road, and it was the sites-roads lane's rejected name for the overt
approach road, `docs/validation/sites-roads-2026-10-18/design-B.md:25–144`); *trace* (`TerrainTrace`, `SurfaceTrace`,
`SwayTrace`, V13:832–833, 883); *holloway* (a sunken lane: a physical form of an overt road); *droveway* (kept as one of
the trod's breadth words). **The class word is no word at all**: a trod is its own record (§1.1), so it needs no `kind:
'hidden'`; the host keeps `hidden` as its ladder's last word on an overt edge, registers `trod` for the map's edge, and
neither side mints `way`. The breadth hint is the field `gauge` with the four values `game`, `foot`, `cart`, `drove`
(`gauge`: 0 hits in all three documents [OBSERVED]).

**Q1 — Can a route end at a non-settlement junction today?** A host route cannot: "every host route ends at two host
settlements; a site, a proposal or a junction is a position along a route, never an end of a host route (the map's own
approach road, (12), ends at it)" (V13:1827–1828) [STATED]. The map's own approach road ends at one junction, its `join:
{ route; atCm }` (V13:786, V13:1850) [STATED], keyless, in no canon slot, `routeFacts` row, `patrolOffer` row or
`routes(world)` host list (V13:1871–1873) [STATED]. No record has two junction ends [INFERRED from V13:786]. This design
does not widen `WorldRoute`: it adds a record of its own, `WorldTrod`, whose two ends are junctions on public routes or on
earlier trods (§1.1), so W7 (11) keeps its meaning word for word. **Milestone: M-W2** (W7's network and its port products
are M-W2's, V13:3814 [STATED]).

**Q2 — Does the port already carry per-stretch ground classes (T2)?** The record does: `WorldRoute.vertexClass:
Uint8Array /* per segment: the host's terrain class through the adapter folder's table */` with per-vertex `stations`
and `byClassM` (V13:790–791), evaluated on the final polyline (V13:1800–1802) [STATED]; they came in with amendment item
689 (`docs/AMENDMENTS-2026-10-17m.md:543`) [OBSERVED]. The simulator feed does not: `routeFacts` sends "the per-class
effort" as totals (V13:2484–2485) [STATED], and the ordered `vertexClass` rides only `routes(world)`, the map feed, "never
read by a step of its simulation" (V13:2437–2439) [STATED]. So B is **a port addition, not new generator work**:
`routeFacts` gains `runs: { fromStation; toStation; lengthM; terrainClass }[]` per host edge, in M-W2 (§1.4, fragment
F24). The host's ledger row T2 (FPI:394, "no terrain-class breakdown per segment — MISSING") and HRQ:606/625 predate item
689 [OBSERVED]; the reply corrects ENC-HP-09 (fragment FH4).

**Q3 — Which class already means "not for armies or caravans"?** None. `trail` is a rank rule, not an access rule: "every
seat still unjoined after the passes gets a `trail` to its nearest routed cell" (V13:1792–1793), a public route an
approach may lie along ("highway > road > track > trail", V13:1839–1840), a watchpost's crossing (V13:2090), mapped into a
frame as `path` (V13:762) [STATED]; on a host-bound world "no trails to host seats" (V13:1806) [STATED]. `hidden` is not a
seventh class but the host's grade on an overt route (above). No sentence in V13 says any class forbids armies
[OBSERVED absence]. A trod is **neither a seventh class nor a grade**: it is a record outside `WorldRoute`, so no reader
of routes reads it unless its row says so (§1.1 (i)); who may travel it is the host's stance rule (HR:15), which the map
never recomputes.

**Q4 — A width/kind hint per way?** Yes, recorded: `WorldTrod.gauge: 'game'|'foot'|'cart'|'drove'` with its integer
`widthCm` from the `world.trods` gauge rule (§1.2), derived from the trod's ground and slope, never a capacity. No land
route has a width field today; the only width-like facts are a water edge's limits (V13:2485–2487) [STATED]. The host
derives its capacity band from the gauge, the width and the ordered runs' classes (HR:16); the map records no band
(J-V13.116).

**Q5 — Who owns "known per town"?** The host, as it prefers (HR:42). V13's rule already decides it: `knownTo` is
three-valued and "this volume adds no fourth tier" (V13:957–960); "Host facts carry the host's resolved audience … a
fact the host hides is never sent" (V13:960–963); "truth only — no believed fact enters or leaves the canon" (V13:2578–
2579) [STATED]. So a town's knowledge is a dated `WorldEvent` of the host's knowledge kind through H9 (its `where` the
trod, its `seats` the knowing seat, its `cause` the host's how-word, its resolved audience), a windowed replace whose
retraction is forgetting (V13:2530–2535) [STATED]; the map draws it as the `events` layer's pin on the trod in the knowing
seat's colour and never decides it. The party's reveal reuses V14 §2.3's `SecretState` whole (`dmOnly` · `revealed` ·
`discovered`, V14:763–766 [STATED]): a knowledge event the host resolves public or local is the host's reveal (V14:764:
"the DM or the host added the anchor to the party's places"); the DM's reveal is one `setAttr`. The legend carries one
fixed sentence and no count (§1.5).

**Q6 — Which milestone carries A and C?** **M-W2**, both. A needs W7's laid network, the `routes` layer, `routeFacts`,
`mapFeed`, `placeOf` and the `events` layer, all M-W2's (V13:3814) [STATED]; C is the `trods` layer's audience rule and
the trod's `secret` state, not a lens, so it needs no M-W5 machinery; the knowing town's mark is the `events` layer's
(M-W2). The bodies' lens marks (watch, presence, engagements as lens elements) belong to D-V13.8's deferred **danger
lens** (V13:4038–4040: "the host's embattlement per settlement … its route danger per mover", gated on H17) [STATED] —
the request's bodies are "the *cause* of an embattled region" (HR:4) [STATED] — and are not a prerequisite of the
bodies chain. The host's prerequisite line names **M-W2**; its asks are **H32** (§1.9). The party-reveal cue and the
shared `party` key are V14's (SE3, M-SITE-A, V14:3008) [STATED]: until they land a trod is `dmOnly` only, nothing lost.
M-W2's row is re-declared at 9 pw (§1.8).

**Q7 — Does 200–2 000 ways per province change the size budget?** Not the document's: trods are **never stored**; W7
(13) rebuilds them on load from the persisted rasters and routes, deterministically, the pattern §2.7 already names for
the recomputable rasters ("dropped from the file and rebuilt on load inside V13 §6's load budget", V13:1361–1362)
[STATED], so the `province` ≤ 3 MB, `realm` ≤ 11 MB and `continent` ≤ 24 MB rows (V13:1359–1360) [STATED] gain only the
DM's trod edits and the host's trod events (well under 1 KB per hundred) [INFERRED]. Had they been stored, 2 000 trods
at ≈ 350 B would take ≈ 0.7 MB of the province's ≈ 0.75 MB record headroom and the same density over a continent (144 ×
a province's area) would break the 24 MB (`read-v13-routes.md` §8) [OBSERVED arithmetic]. What does grow is the canon
message: the trods slot at ≈ 150–200 B per trod gzipped is ≈ 35 KB at 200 and ≈ 0.35 MB at 2 000 per province
[INFERRED]; the owner's density at `world.trods`' defaults gives ≈ 150–400 per province (64 000 km² × ≈ 35 % cover ÷
150 km² per trod, plus the per-patch extras) [INFERRED], and 2 000 is reached only by the DM lowering `km2PerTrod`. The
host's own frozen digest cap (400 000 bytes, HRQ:840 [STATED]) is then the binding limit at 2 000, which is the host's to
re-declare. Time: W7 (13) ≤ 0.5 × the W7a + W7b row at every rung (`WORLD-18`, §1.7).

---

## §1 The design

### 1.1 The records (V13 §2.2)

**A trod is a record of its own, not a `WorldRoute` origin** (J-V13.115). Every reader of roads — the `routes` layer,
the charters' `roads`, `roadsAt`, `existingRoute`, W6b's `connectivity`, the siting plug-ins, the coherence tests, W8b's
continuity, patrols and border posts, the exports, V14's crop — reads `WorldRoute`; the approach road, one more
`WorldRoute`, needed six exclusion clauses to keep out of pricing and siting (V13:1864–1868, J-V13.113 at V13:4028)
[STATED]. A record of its own needs none: no existing sentence about routes changes meaning, and a trod is read only
where a sentence names it.

```ts
interface WorldTrod {                        // file w: a hidden way — the map's own geography between two junctions on the overt network; never a WorldRoute (V13 §3.8 (13))
  id: Id; a: TrodEnd; b: TrodEnd /* its two ends: each a junction on a public route or on an earlier trod — never a seat, never inside a placed frame's extent + margin */;
  origin: 'genesis'|'user' /* W7 (13)'s lay; `user` reserved for a DM-drawn trod (not in this pass) */; layVersion: number /* bumped by every re-join or re-lay */;
  polyline: WorldPointCm[]; stations: Int32Array /* per vertex: cumulative land effort-metres under the cost law's time terms, as a WorldRoute's */;
  vertexClass: Uint8Array /* per segment: the host's terrain class through the adapter folder's class table */;
  gauge: 'game'|'foot'|'cart'|'drove' /* the breadth hint by world.trods' gauge rule: a beasts' trace, one abreast, a cart's bed, beasts driven abreast — the host derives its capacity band from it and the ground, the map records no band */;
  widthCm: Cm /* the gauge row's breadth, an integer */; landEffortM: number; lengthM: number; byClassM: Record<string, number>;
  seedCell: number /* W7 (13)'s seed: the trod's identity (V13 §2.5) */; landmass: number;
  name?: NameRef /* the DM's, by setAttr; W9 names no trod */;
  secret: SecretState /* V14 §2.3's record whole: dmOnly (the lay's default) · revealed (the DM's setAttr, or a knowledge event the host resolves public or local) · discovered (a host event that the party travelled it); the party's places carry a revealed trod as they carry a site */;
  costTotal: number /* presentation only, as a route's */; reason: Id }
type TrodEnd = { kind: 'route'; route: Id; hostKey?: string /* the joined route's host edge key when bound */; station: number /* the route's station at the junction vertex: integer effort-metres from the route's `a` */; atCm: WorldPointCm /* the joined route's polyline point */; nearSeat?: string /* the host key of the placed settlement whose margin ring lies within world.trods' gateBandM: "at its town gate" to placeOf */ }
            | { kind: 'trod'; trod: Id; vertex: number; atCm: WorldPointCm /* a junction on an earlier trod's polyline (W7 (13)'s order) */ };
```

**Endpoints (ask A3).** The host's three endpoint kinds reduce to two: a point on a route stretch (`kind: 'route'`) and
another trod's junction (`kind: 'trod'`). "A settlement's gate" is a `route` junction within `gateBandM` of the
settlement frame's margin ring, carrying `nearSeat`: W7 (11) already makes a gate station the frame's terminal and lets
nothing but a host route end at a settlement (V13:1829–1830) [STATED], and the approach road "never enters a settlement's
frame, so no settlement's charter changes" (V13:1848) [STATED]; a trod obeys the same bar, so door 1 is untouched (no
frame geometry leaves the world: the junction is a point on the public route the host already holds) [INFERRED].

**Junction records (ask A7)** are the two `TrodEnd`s; they need no record of their own. `WorldWhere` gains `kind: 'trod'`
(`trod`, `fraction?`) and `kind: 'junction'` (`trod`, `end: 'a'|'b'`), rendered by `placeOf` as "on the ⟨gauge word⟩ trod
⟨name⟩ between the ⟨route a⟩ road and the ⟨route b⟩ road" and "where the ⟨…⟩ trod meets the ⟨route⟩ road, ⟨n⟩ km from
⟨seat⟩ (at its town gate)"; the host's hearing card names it by these kinds (HR:19, 28). Nothing sight-related is
carried: a junction is topological (HR:18), and the VTT sight lines are a crop's own occluders (BASE:17020–17031)
[STATED].

**Per-stretch ground on the overt routes (ask B)** stays where it is — `WorldRoute.vertexClass` and `stations`
(V13:790) — and enters the simulator feed as `routeFacts.runs` (§1.4). No field is added to `WorldRoute`; no transient
is derived: the runs are a read of two arrays the record already holds (J-V13.124).

**Raster.** `WorldRaster` gains `trods: Map<fine cell, Id[]>` beside `routes` (V13:712): the trod ids crossing a cell,
sparse, read by W7 (13)'s own search (earlier trods as terminals), by `worldFactsAt` and by V14's E1 — never by the
charter (which reads `routes` at the ring, V13:1793) or by `existingRoute`.

**Events.** `WorldEvent.at` is placed at fold when `where` names a trod (its midpoint vertex) or a junction (its point), as
`borderSegment` places a pair (V13:835); `WorldEvent.cause` carries a knowledge event's how-word as it carries a patron
fall's (V13:837) — one field, one meaning: the host's cause word through the vocabulary table.

**Knowledge paragraph.** A trod's `knownTo` follows its `secret` state exactly as a site anchor's does (V14:764–766):
`secret` while `dmOnly` (absent from every party key's `places`), `secret` and in the party's places when `revealed`,
`local` when `discovered`. The three states are V14's, reused whole (J-V14.12's reason stands: no fourth tier, the
admission function unchanged, V14:3082 [STATED]).

### 1.2 The rule table (V13 §2.3) — `world.trods`

```ts
interface TrodLayRule {                                                                                      // world.trods — the map's own (W7 (13)); never the host's, never a time; every cell {value, unit, provenance, calibratable}
  cover: { landUse: string[]; slopePct: number; aboveKnee: boolean; minCells: number };
  density: { km2PerTrod: number; maxPerPatch: number; seedSpacingM: number };
  lay: { coverFactor: number; openFactor: number; openRunMaxM: number; routeMarginM: number; junctionSpacingM: number; lengthM: { min: number; max: number }; maxCostFactor: number; gateBandM: number };
  gauge: { gameSlopePct: number; footSlopePct: number; cartSlopePct: number; widthCm: Record<'game'|'foot'|'cart'|'drove', Cm> } }
```

| `TrodLayRule` (`world.trods`; own, PLAUSIBLE, registered in V12 as UNMEASURED until `WORLD-18` measures it) | default | anchor |
|---|---|---|
| `cover.landUse` / `cover.slopePct` / `cover.aboveKnee` / `cover.minCells` | forest, wetland, alpine / 10 % / true / 64 | the owner's "rough country (forest, hills, mountain, marsh)" (HR:29): forest and marsh are `landUse` words, hills the slope term (the host cannot see hills, FPI:15), mountain `alpine` or the host law's `elevationKneeM` |
| `density.km2PerTrod` / `maxPerPatch` / `seedSpacingM` | 150 km² / 5 / 4 000 m | "several per rough country … multiple of them" (HR:4, 29): a 300 km² wood gets three trods, a 2 000 km² range five |
| `lay.coverFactor` / `openFactor` / `openRunMaxM` | 0.5 / 4 / 1 500 m | "none across open plain": a trod prefers cover four-to-one against the open and never runs more than 1.5 km in it |
| `lay.routeMarginM` / `junctionSpacingM` | 500 m / 2 000 m | a trod runs beside no road; two junctions on one road lie two km apart, so a trod is a connection, not a verge |
| `lay.lengthM.min` / `max` / `maxCostFactor` | 1 500 m / 40 000 m / 8 | shorter is a shortcut, longer is a road; trods wind more than roads (`world.routeLay`'s 6) |
| `lay.gateBandM` | 1 000 m | a junction within this of a placed frame's margin ring reads "at the town gate" (`nearSeat`) |
| `gauge.gameSlopePct` / `footSlopePct` / `cartSlopePct` | 20 % / 10 % / 6 % | the steepest segment decides: ≥ 20 % a beasts' trace (`game`), ≥ 10 % one abreast (`foot`), every segment < 6 % and no wetland a cart's bed (`cart`), else beasts driven abreast (`drove`) |
| `gauge.widthCm` game / foot / cart / drove | 60 / 100 / 250 / 600 cm | the host's four kind hints (HR:27: game trail · goat path · old road · drover's way) in the map's words; the host turns breadth and ground into its band |

### 1.3 The generation step — W7 (13) *Trods* (V13 §3.8; stage-table row `W7c`)

Run **after (12)** on both worlds (after the genesis lay and after each `network` window on a host-bound world), each
cover patch on its own, no trod reading another patch's; deterministic and draw-free (`world.trods` a reserved concern,
V13 §3.17).

(a) **Cover.** A fine land cell is *cover* when its `landUse` is one of `cover.landUse`, its slope over its eight
neighbours is ≥ `cover.slopePct`, or, under a host law carrying `elevationKneeM`, it lies above the knee; every other
land cell is *open*; water and every placed frame's extent + margin are neither. A *patch* is a 4-connected cover
component of ≥ `cover.minCells` cells; patches are ranked by cell count, ties by the lowest cell index. The owner's
"none across open plain" is this rule: a patch is never open ground, and a trod leaves cover for at most `openRunMaxM`.

(b) **Seeds.** A patch gets n = min(`maxPerPatch`, 1 + ⌊area km² ÷ `km2PerTrod`⌋) seeds: its cells in descending
distance from the patch boundary (an integer chamfer transform inside the patch), each next seed ≥ `seedSpacingM` from
every earlier one, ties by the lower cell index.

(c) **The trod cost surface** is W7 (2)'s step cost under the cost law's time terms, × `coverFactor` on a step into a
cover cell, × `openFactor` into an open cell or into a cell within `routeMarginM` of a public route's cell; a water cell,
a cell inside a placed frame's extent + margin and a cell carrying a public route are impassable — the last except as a
terminal.

(d) **The two ends.** One Dijkstra (the lifted bucket queue, integer keys, cell-index ties) from the seed over (c) to its
first *terminal* — a cell carrying a public land route of any class (the network at the week; a hidden-graded host road no
public road, as (12)(a); never a water leg, never an approach road) or a cell of an earlier trod of the same patch — then
on to a second terminal on a different route, on the same route at ≥ `junctionSpacingM` of station from the first, or on
an earlier trod. A trod whose second terminal lies beyond `maxCostFactor` × the first's cost, or whose length falls
outside `lengthM`, is dropped — one `W_TROD_SPARSE` per patch, naming the trods asked and laid.

(e) **The polyline** is the first path reversed, the seed, the second path, simplified at `routeToleranceM`, never
crossing water; each `route` end's junction is the joined route's polyline point nearest the path's last cell with its
station (as (12)(b)); a `trod` end is the earlier trod's nearest polyline point. **No route is written**: a joined route's
polyline, stations, effort and lay version stay byte-identical (as (12)(a)). The trod's cells enter the `trods` layer and
never the `routes` layer.

(f) **Fields** as (7); `gauge` by the gauge rule over the trod's segments; `nearSeat` where a junction lies within
`gateBandM` of a placed settlement frame's margin ring; `secret.state` `dmOnly` with cause `generation`; the reason in
(6)'s form (its ends, its patch and seed, its gauge rule, the three largest cost contributions).

(g) **Order and determinism.** Patches in rank order, seeds in their order; a trod reads only earlier trods of its own
patch; no draw; two runs byte-identical; the lay over one patch is byte-identical whether the others are laid or not.

(h) **Lifecycle.** A trod's identity is its seed cell (§2.5 row); it is **re-joined**, same id, `layVersion` bumped,
when its joined route is removed, re-laid (a `bypass`, W7 (9)) or graded hidden by a `network` window, or when a W1 or
W5 edit's dirty set touches its patch (the cascade's row 13 gains it) — one end's search re-run from the seed, as an
approach road re-joins (V13:1860–1861); it is **tombstoned** when its seed cell enters a placed frame's extent + margin
or its patch falls below `cover.minCells`. A trod is never promoted to a route, never demoted, never graded; no host
`network` change word touches it (the eight of V13:886 stand), and **no trod is born where a road dies** (§1.6).
Genesis is sacred: no host edge and no lay version of a route is moved by a trod.

(i) **Readers.** A trod is read by the `trods` layer, `worldFactsAt` (the trod at a point), V14's E1 (the trod within
the crop rectangle, as a band of its `widthCm` at the crop's audience), `placeOf`, the DM's exports and the canon's trods
slot — and by nothing that reads roads: never `existingRoute`, W6b's `connectivity`, the charters' `roads`, `roadsAt`,
V14's siting plug-ins, the site coherence tests (a hideout's `awayFromRoutes` counts no trod), W8b (9)'s continuity,
(14)'s patrols, (16)'s border posts or a frame. W7 (11) stands unchanged.

(j) **Audience.** The DM's `trods` layer (a toggle, default off) draws every trod; a party picture draws a trod only
when its state is `revealed` or `discovered`; an unknown trod is absent — never greyed — from every party surface, its
count included (§1.5).

*Output:* the `WorldTrod`s and the `trods` layer. *Edges:* a world with no cover patch lays none; a patch with no public
route within `maxCostFactor` of its seed lays none (reported); a trod never crosses a water cell, never enters a frame.

### 1.4 The port (V13 §3.11.6)

**The canon's trods slot.** `WorldCanon.trods: { id; a: CanonTrodEnd; b: CanonTrodEnd; runs: { fromStation; toStation;
lengthM; terrainClass }[]; lengthM; effortM; gauge; widthCm }[]` with `CanonTrodEnd = { edge: string /* the host edge
key */; station: number; atCm } | { trod: Id; atCm }`, versioned by `versions.trods: Hash128` — its input hash the
physical layers, the cost law, the member seats and the laid network at the canon's log head (the host's genesis and its
own `network` changes mirrored; never a political, overlay or belief input). Integers with units, closed vocabularies,
host keys and `WorldPointCm`s only, as the simulator feed admits (V13:2435–2437) [STATED]. Port law (1) is amended by one
clause (fragment F27; J-V13.118): the trods slot reads the laid network because a trod's junction *is* a station on a
host edge; the slot is rebuilt byte-identically for the same request (V13:1325) and is byte-identical across every sway
revision. **The additive canon** (J388) carries the trods slot byte-identical: an added seat lays no trod and moves none;
a trod whose seed the new frame's margin covers is tombstoned at the next premium re-canonize, `W_HOST_CANON_BEHIND`
until then (fragment F23).

**`routeFacts.runs`** (ask B): per host edge the ordered `{ fromStation; toStation; lengthM; terrainClass }[]` read off
`stations` and `vertexClass` (V13:790), summing per class to the per-class effort already sent; optional behind the
host's switch as the rest of `routeFacts` (V13:2490–2491). The host's stand-in cover graph reads it until the trods slot
lands (HR:31).

**The map feed.** `mapFeed` carries the trods keyless, each in the audience its `secret` state admits, as it carries the
approach roads (V13:2503) [STATED]; `hostOverlay` admits a mover on a trod by its id and fraction (H17's grammar,
V13:2558) — the host's presence of a body on a trod, a presentation input, never logged.

**The hearing's places.** `placeOf` renders the two new `WorldWhere` kinds (§1.1). The host names a trod or a junction by
the id its own copy of the slot carries and sends it back in an event's `where`; H16 is not needed for it (HR:11).

### 1.5 The picture, the reveal and the legend (V13 §5.1; no lens row)

A new structural layer **`trods` (a toggle, default off)** beside `routes` and `patrols` (V13:3144, 3148): every
`WorldTrod` at the lay in force at the view's week, drawn 0.6 px dash-dot in the `secret` colour role with V14's
second cue at its midpoint (a dashed ring with the eye-slash glyph while `dmOnly`, an open ring `revealed`, a filled ring
`discovered`, V14:2583–2588 [STATED]); its junctions as ticks on the joined route only where the trod draws; lengths
labelled in km only where it draws; the DM's own name where given. **Audience** (J-V13.77's rule, V13:3323–3331
[STATED]): the DM sees every trod with the layer on and none with it off (so a DM picture export never carries the
network by accident — V13:3212's "the view as drawn"); a player sees only `revealed` and `discovered` trods — an
unknown trod is absent from the picture, the labels, the hover, the screen-reader summary, the player-audience `mapFeed`
and every player export, never greyed (V13:3158, 3324) [STATED].

**The knowing town's mark** is the `events` layer's: a knowledge event (the host's kind through the adapter folder's event
table, `trodKnown` here) draws as a pin at the trod's midpoint in the knowing seat's allegiance colour, captioned with the
seat, the how-word (`cause`) and the week, in the audience the host resolved and only where the trod itself draws for
that audience. **The host's reveal:** a knowledge event resolved `public` or `local` sets the trod `revealed` with cause
the event — V14's own definition ("the DM or the host added the anchor to the party's places", V14:764) — and its
retraction lowers the state unless the DM's reveal stands; resolved `dmOnly` it marks the DM's view only. **The DM's
reveal** is one `setAttr` on `secret.state` (as V14:795). An engagement at a junction (`where.kind: 'junction'`) draws
at the junction's point — a point on a public road — for the audience the host resolved, and never the trod's line.

**The legend** of the `trods` layer is one fixed sentence in every audience, drawn whether the layer holds 0, 1 or 1 000
trods: *"Trods show only where a town is known to use one or the game master has revealed one; others may exist."* —
true whatever the count (HR:33's "never how many"); no legend row, picker state, label, summary or export reads the
count (T-V13-60). The `patrols` lens's refusals gain "a cadence or a `patrolOffer` row on a trod" (fragment F36); the
collision rows gain *trod* and *hidden* (fragment F33).

**No ninth lens in this pass** (J-V13.122): the bodies' marks over the trods — who watches one, which band is on one,
what happened there — are the host's embattlement system's, D-V13.8's deferred **danger lens** (V13:4038–4040), gated on
H17 and the lens window; its row gains the trods (fragment F43). The geography and the reveal need no lens, and §5.8's
bar — "nothing of a lens is read by a stage, a sway revision, an encounter or the clerk" (V13:3259–3260) [STATED] —
forbids the trod itself to be a lens element.

### 1.6 The lifecycle law (ask D) and the quarantine's map side

**Never promoted by the map; a decayed road never becomes a trod; no trod is born where a road dies** (J-V13.121). The
host's `hidden` is the grade of an overt `WorldRoute` that "keeps the polyline" and may be revived (V13:1813) [STATED];
a trod born on it would hold one geometry under two identities, and a revival would then run a road along a trod. A dead
road joins two settlements — the wrong topology for "hidden roads that connect between roads" (HR:4). And the host has no
such law "and would rather not mint one" (HR:35). So this design's position on HR:35's offer is **no**: the eight change
words of `network` (V13:886) stay as they are, a host route demoted to `hidden` stays a DM-only ghost `WorldRoute`
(V13:1815–1820), and W7 (13) reads the network only to find terminals. The reverse holds too: a trod is never a
`WorldRoute`, never chartered into a frame, never a patrol segment.

**Detours (ENC-HL-10).** V13 W7 (9) already folds the host's `bypass` as a dated re-lay under the same host key
(V13:1813–1815; T-V13-41 (u)) [STATED]; HRQ:653's "the map offers no detour either" predates it [OBSERVED]. A bypass
re-joins the trods whose junctions sat on the re-laid stretch (§1.3 (h)); the map mints no detour of its own.

**Quarantine (behaviour 6).** The refusals stand: "a quarantine line" on the plague lens (V13:3385) and "a patrol drawn
… holding a quarantine line" on the patrols lens (V13:3428) [STATED]; the host has no closure verb (plague-R7 is an open
owner question on the host's side, HRQ:481; `research/sf/plague-system.md:556, 798–799`) [STATED]. When the host's law
exists and its closure arrives as a host-stored dated fact naming *which* gate (a town gate or a border crossing, never
bare, V13:3317–3318), the plague lens may gain a closure element then — a later item; a trod draws **unchanged** across
it, the map never marks a trod as a closure's bypass and never draws one carrying a plague (J-V13.123; fragment F35).

### 1.7 Size, time, determinism (V13 §2.7, §3.17, §6)

Storage: none (§0 Q7); the trods are rebuilt on load by W7 (13) inside V13 §6's load budget, outside the model digest
(the DM's trod edits and the host's trod events are records); their reasons are rebuilt with them. Work limit: W7 (13)
≤ Σ over seeds of the two searches' discs' cells, each disc bounded by `maxCostFactor` × the first terminal's cost; a
limit reached is F-WORK's `work_cut`, dropping the remaining lowest-rank patches. Budget `WORLD-18`: W7 (13) ≤ 0.5 ×
the W7a + W7b row at every rung (≤ 30 / 100 / 260 ms at province / realm / continent; PLAUSIBLE until SP-W7 extended
measures it) — at the reader's arithmetic a 10 km trod at the province's 250 m cell is ≈ 3 800 cells ≈ 31 µs, 2 000
trods ≈ 61 ms (`read-v13-routes.md` §8) [OBSERVED arithmetic]. Determinism: `world.trods` is a reserved id with no
stream (siting's pattern, V13:2928–2929); every tie by cell index; T-V13-59 asserts two runs byte-identical and the lay
order-free across patches.

### 1.8 The milestone and the estimate (V13 §8.2)

**M-W2** carries W7 (13), `WorldTrod`, `TrodEnd`, `world.trods`, the `trods` raster and layer with the three states and
the fixed legend, the canon's trods slot, `routeFacts.runs`, the two `WorldWhere` kinds, `hostOverlay` on a trod and the
knowledge event kind; ≈ 0.75 pw (W7 (13) 0.25; the record, layer, states and legend 0.25; the slot, runs and places
0.25), so the row is re-declared at **9 pw** (8 + 0.75 at whole-week resolution); the volume's §16 range 37–45 absorbs it.
The host's bodies chain names M-W2. The danger lens's trod rows are M-W5's later step (D-V13.8), no prerequisite.

### 1.9 The host's row — H32 (V13 §8.5)

| # | when | the host changes | waits on |
|---|---|---|---|
| H32 | with M-W2 (after H12) | the trod asks: its builder reads the canon's trods slot — each trod's two junctions as host edge keys with integer stations, its ordered runs with their terrain classes, its gauge and width — and retires the cover graph it derives from `routeFacts.runs` until then; its knowledge event kind in the events window (H9): the knowing seat, the trod's id, its how-word, the week, the resolved audience, retracted by the windowed replace; every engagement at a trod or a junction with its `where` naming it; a body on a trod in its presentation overlay (H17) by the trod's id and fraction; a watch it keeps on a trod as a dated event (H9), never a map cadence; its register: `trod` and the four gauge words registered as the map's, `hidden` kept as its ladder's last word on an overt edge, `way` minted on neither side | M-W2; H5; H9; H12; H17 |

### 1.10 Tests (V13 §7.3), report codes (§7.5), decisions (§9), BCRs (§10)

**T-V13-59 — trods (W7 (13)).** On B-WORLD-lite: two runs byte-identical, and the lay over one patch byte-identical with
the other patches dropped; the density fixture (one 300 km² wood, one 2 000 km² range, one open plain between two roads)
lays three trods in the wood, five in the range and none across the plain, no open run over `openRunMaxM`; every end a
junction on a public route or an earlier trod — never a seat, a water cell, a cell inside a placed frame's extent +
margin, an approach road or a hidden-graded host road; every joined route byte-identical (polyline, stations, effort,
lay version); no trod earns an `existingRoute` discount, enters a W6b `connectivity` term, a charter's `roads`, a
`roadsAt` row, a siting term, a coherence test, a `PatrolCadence`, a `patrolOffer` row, a border-post proposal or a
continuity read; the canon's trods slot carries integer stations, runs, gauge and width, is byte-identical across every
sway revision and a permuted input, moves its version only with its inputs, and is byte-identical in the additive canon;
`routeFacts.runs` is ordered and sums per class to the per-class effort; a route removed, re-laid by a mock host's
`bypass` or graded hidden under a trod re-joins it with its id kept and `layVersion` bumped; the set rebuilt on load is
byte-identical to the generated set; W7 (13) inside `WORLD-18`.

**T-V13-60 — the reveal.** Two worlds differing only in unrevealed trods give byte-identical party pictures, legends,
picker rows, hovers, screen-reader summaries, player-audience `mapFeed`s and every player export; a `dmOnly` trod is in
no party picture, count, label, crop or export; the DM's `trods` layer draws every trod with the layer on and none off;
a trod revealed by `setAttr` draws for the party with the open-ring cue; a knowledge event resolved public sets it
`revealed` (cause the event) and draws the knowing seat's mark at the trod, resolved `dmOnly` it marks the DM's view
only, and its retraction lowers the state unless the DM's reveal stands; the legend sentence is one string at 0, 1 and
1 000 trods; an engagement at a junction on an unrevealed trod draws at the junction's point for its audience and never
the line; V14's E1 crop lays a revealed trod's band and nothing for an unrevealed one in a party crop.

**Report code:** `W_TROD_SPARSE` (W7 (13); the patch, the trods asked and laid).

**Decisions J-V13.114 – J-V13.124** (the rows in full in fragment F42): the word; a record of its own; junction ends and
the town gate; the terrain-born deterministic lay with identity by seed cell and rebuild on load; the canon's trods slot
with law (1)'s clause; knowledge the host's through H9 with V14's three states for the party; no cadence on any trod;
never promoted, never born where a road dies; no ninth lens; the quarantine refusals kept; `routeFacts.runs`.

**BCRs: none.** The base's `WayClass` and `Way` are untouched (the word moves, not the class); the `trods` layer is one
more row of V13 §5.1 under the world view's layer list (BCR-V13-13's), its toggle the `patrols` toggle's mechanism; the
admission function reads a trod's `secret` through `knownTo` and the party's places as the base already reads a site's
(BASE:15744, BCR-V14-21 applied) [STATED].

## §2 The fragments

**66 fragments** over five targets, applied in this order (no two of one target overlap, so any order gives the same result): `docs/volumes/V13-world.md` 49; `docs/volumes/V14-sites.md` 5; `docs/HOST-REQUIREMENTS-2026-10-18.md` 8; `docs/volumes/INDEX.md` 3; `docs/volumes/SUMMARY.md` 1. The base (`docs/ARCHITECTURE.md`) needs no change (§1.10). Every current text is quoted once, verbatim, as the target stands at the md5 named (a line break inside a quote written ⏎); every new text is in full; an insertion quotes the line it follows and repeats it as its new text's first line. The machine copy is `design-C.fragments.json` (the same fragments, texts unescaped, in this order, records `{id, file, line, md5, old, new, reason}`). Checked by script (`frags.py` in the lane scratchpad): every current text occurs exactly once in its target, applied in order to copies each is found once at its turn and each new text once after. The item numbering is the synthesis's (file w from 955); fragments cite "file w" where the volumes' convention wants the file named.

**F1** — `docs/volumes/V13-world.md`:493 (md5 `e68af748638dd3c8474d21b37005c7ac`; insertion after the line quoted). §1b.1's wiring table gains the trod's row after the route's: a record of its own, read by no reader of roads.

*Current text (as it stands now):*
> V14's E1 (the world-map case reads the route at the point) | V13 §2.2 |

*New text* (in full; the quoted line repeated as its first line):
> V14's E1 (the world-map case reads the route at the point) | V13 §2.2 |
> | `WorldTrod` (a hidden way: the map's own geography between two junctions on the overt network — its two `TrodEnd`s on public routes or earlier trods, polyline, time stations, per-segment terrain class, gauge and width, seed cell, `secret` state; never a `WorldRoute`, never a host edge; file w) | W7 (13) on both worlds, after the genesis lay and each `network` window on a host-bound one, from the cover patches of `landUse` and slope (V13 §3.8 (13)); rebuilt on load, never stored | the `trods` layer, `worldFactsAt`, V14's E1 (the trod within the crop rectangle at the crop's audience), `placeOf`, the DM's exports, the canon's trods slot and the DM's `mapFeed` (keyless, in the audience its `secret` state admits) — never a reader of roads (V13 §3.8 (13) (i)) | V13 §2.2 |

*Evidence:* HR:23–29 (ask A); V13:493 (the WorldRoute row's form); V13:1864–1868 (the approach road's six exclusions, the reason for a record of its own); V13:1827–1828 (W7 (11) unchanged).

**F2** — `docs/volumes/V13-world.md`:579 (md5 `e68af748638dd3c8474d21b37005c7ac`; edit). §1b.3's setAttr row admits the DM's three trod edits: its name, its reveal, its gauge.

*Current text (as it stands now):*
> a `WorldRoute` (`class`, standalone only; a host route's grade is the host's), a `Placement` (`bearingCdeg`, `originCm`)

*New text* (in full):
> a `WorldRoute` (`class`, standalone only; a host route's grade is the host's), a `WorldTrod` (`name`, `secret.state` — the DM's reveal, as V14 §2.3's `setAttr` on an anchor's state —, `gauge`; file w), a `Placement` (`bearingCdeg`, `originCm`)

*Evidence:* HR:33 (C3, the DM reveals); V14:795 (the DM toggles the state by one setAttr); V13:579.

**F3** — `docs/volumes/V13-world.md`:601 (md5 `e68af748638dd3c8474d21b37005c7ac`; insertion after the line quoted). §1b.4's entity table gains the trod: drawn, labelled, exported, persisted.

*Current text (as it stands now):*
> | `WorldRoute` | by class or the host's grade (a hidden host road a DM-only ghost) | none (a route takes its ends' names) | GeoJSON LineString, the ecosystem-shaped JSON's routes, CSV | entities block |

*New text* (in full; the quoted line repeated as its first line):
> | `WorldRoute` | by class or the host's grade (a hidden host road a DM-only ghost) | none (a route takes its ends' names) | GeoJSON LineString, the ecosystem-shaped JSON's routes, CSV | entities block |
> | `WorldTrod` | the `trods` layer (a toggle, default off): 0.6 px dash-dot in the `secret` colour role with V14 §5.1's state cue at its midpoint; a party picture only a `revealed` or `discovered` trod (file w) | the DM's name only, where given | GeoJSON LineString with `gauge` and `widthCm` (a DM export; a party export only the party's trods), CSV | never stored: rebuilt on load by W7 (13); the DM's edits and the host's events are records |

*Evidence:* V13:601 (the WorldRoute row's form); V14:2583–2588 (the three cues); V13:3745 (T-V13-50: a player export holds the player picture).

**F4** — `docs/volumes/V13-world.md`:712 (md5 `e68af748638dd3c8474d21b37005c7ac`; insertion after the line quoted). The raster gains a sparse `trods` layer beside `routes`, so no reader of the `routes` layer meets a trod.

*Current text (as it stands now):*
>   routes: Map<number /* fine cell */, Id[]> /* the route ids crossing a cell (W7); sparse */;

*New text* (in full; the quoted line repeated as its first line):
>   routes: Map<number /* fine cell */, Id[]> /* the route ids crossing a cell (W7); sparse */;
>   trods: Map<number /* fine cell */, Id[]> /* the trod ids crossing a cell (W7 (13)); sparse; read by W7 (13)'s own search, `worldFactsAt` and V14's E1 — never by the charter or `existingRoute`, which read `routes` (file w) */;

*Evidence:* V13:712 (the routes layer); V13:1793 (the charter reads the route layer at the ring); V13:1763 (existingRoute reads public routes).

**F5** — `docs/volumes/V13-world.md`:793 (md5 `e68af748638dd3c8474d21b37005c7ac`; insertion after the line quoted). The trod record and its end record, after `WorldRoute`: its two ends junctions, its stations and per-segment classes a route's, its gauge the breadth hint, its secret V14's three states.

*Current text (as it stands now):*
>   costTotal: number /* the undiscounted cost along the laid course: the clerk's "why this road", presentation only, never a time and never sent to the host's simulation */; landmass: number; reason: Id }

*New text* (in full; the quoted line repeated as its first line):
>   costTotal: number /* the undiscounted cost along the laid course: the clerk's "why this road", presentation only, never a time and never sent to the host's simulation */; landmass: number; reason: Id }
> interface WorldTrod {                        // file w: a hidden way — the map's own geography between two junctions on the overt network; never a WorldRoute (V13 §3.8 (13))
>   id: Id; a: TrodEnd; b: TrodEnd /* its two ends: each a junction on a public route or on an earlier trod — never a seat, never inside a placed frame's extent + margin */;
>   origin: 'genesis'|'user' /* W7 (13)'s lay; `user` reserved for a DM-drawn trod (not in this pass) */; layVersion: number /* bumped by every re-join or re-lay */;
>   polyline: WorldPointCm[]; stations: Int32Array /* per vertex: cumulative land effort-metres under the cost law's time terms, as a WorldRoute's */; vertexClass: Uint8Array /* per segment: the host's terrain class through the adapter folder's class table */;
>   gauge: 'game'|'foot'|'cart'|'drove' /* the breadth hint by world.trods' gauge rule — a beasts' trace, one abreast, a cart's bed, beasts driven abreast: the host derives its capacity band from it and the ground; the map records no band */; widthCm: Cm /* the gauge row's breadth, an integer */;
>   landEffortM: number; lengthM: number; byClassM: Record<string, number>; seedCell: number /* W7 (13)'s seed: the trod's identity (V13 §2.5) */; landmass: number;
>   name?: NameRef /* the DM's, by setAttr; W9 names no trod */;
>   secret: SecretState /* V14 §2.3's record whole: dmOnly (the lay's default) · revealed (the DM's setAttr, or a knowledge event the host resolves public or local) · discovered (a host event that the party travelled it); the party's places carry a revealed trod as they carry a site */;
>   costTotal: number /* presentation only, as a route's: never a time, never sent */; reason: Id }
> type TrodEnd = { kind: 'route'; route: Id; hostKey?: string /* the joined route's host edge key when bound */; station: number /* the route's station at the junction vertex: integer effort-metres from the route's `a` */; atCm: WorldPointCm /* the joined route's polyline point */; nearSeat?: string /* the host key of the placed settlement whose margin ring lies within world.trods' gateBandM: "at its town gate" to placeOf */ }
>             | { kind: 'trod'; trod: Id; vertex: number; atCm: WorldPointCm /* a junction on an earlier trod's polyline (W7 (13)'s order) */ };

*Evidence:* HR:23–28 (A1–A7); V13:786–793 (the WorldRoute record's fields reused); V14:763–766 (SecretState); V13:1848 (never inside a frame).

**F6** — `docs/volumes/V13-world.md`:835 (md5 `e68af748638dd3c8474d21b37005c7ac`; edit). A host event at a trod or a junction is placed at fold, as a pair event is.

*Current text (as it stands now):*
> at?: WorldPointCm /* absent exactly when `pair` is given and no point: placed by `borderSegment` at its week, the placement recorded in its reason */;

*New text* (in full):
> at?: WorldPointCm /* absent exactly when `pair` is given and no point: placed by `borderSegment` at its week, the placement recorded in its reason — or when `where` names a trod or a junction (file w): placed at the trod's midpoint vertex or the junction's point at fold, likewise recorded */;

*Evidence:* V13:835; HR:19 (every engagement on a way is a hearing with a place); HR:33 (the knowledge event).

**F7** — `docs/volumes/V13-world.md`:837 (md5 `e68af748638dd3c8474d21b37005c7ac`; edit). One field, one meaning: the host's cause word carries the knowledge event's how-word (the host's `how`).

*Current text (as it stands now):*
> cause?: string /* the host's cause word — a patron fall's — by the adapter folder's vocabulary table, when sent */;

*New text* (in full):
> cause?: string /* the host's cause word — a patron fall's; a trod-knowledge event's how-word (file w) — by the adapter folder's vocabulary table, when sent */;

*Evidence:* V13:837; HR:33 (`way_known(settlementId, wayId, how, tick)`).

**F8** — `docs/volumes/V13-world.md`:846 (md5 `e68af748638dd3c8474d21b37005c7ac`; edit). The canon's version vector gains the trods slot, versioned like the digest (per slot, its own input hash).

*Current text (as it stands now):*
> water: Hash128; sites: Hash128 };

*New text* (in full):
> water: Hash128; sites: Hash128; trods: Hash128 /* the trods slot's input hash (file w): the physical layers, the cost law, the member seats and the laid network at the log head */ };

*Evidence:* HR:23 (versioned like the digest); V13:846; V13:1322–1326 (per-slot versions).

**F9** — `docs/volumes/V13-world.md`:848 (md5 `e68af748638dd3c8474d21b37005c7ac`; edit). The trods slot: integers with units, closed vocabularies, host keys and world points only — what the simulator feed admits.

*Current text (as it stands now):*
> /* frozen candidate ground inside the seat's orbit */ }[] }

*New text* (in full):
> /* frozen candidate ground inside the seat's orbit */ }[];
>   trods: { id: string; a: CanonTrodEnd; b: CanonTrodEnd; runs: { fromStation: number; toStation: number; lengthM: number; terrainClass: string /* the adapter folder's class table */ }[] /* ordered: the trod's stretches */; lengthM: number; effortM: number /* integer land effort-metres under the cost law's time terms */; gauge: 'game'|'foot'|'cart'|'drove'; widthCm: number }[] /* the trods slot (file w; V13 §3.8 (13)): every WorldTrod of the laid network at the log head; byte-identical across every sway revision and in the additive canon */ }
> type CanonTrodEnd = { edge: string /* the joined route's host edge key */; station: number /* integer effort-metres from the edge's `a` */; atCm: WorldPointCm } | { trod: string; atCm: WorldPointCm };

*Evidence:* HR:23–28 (A: the layer in the canon); V13:848 (the sites slot's form); V13:2435–2437 (the simulator feed's admissions).

**F10** — `docs/volumes/V13-world.md`:887 (md5 `e68af748638dd3c8474d21b37005c7ac`; edit). Two typed places the hearing card can name: a trod and a junction.

*Current text (as it stands now):*
> interface WorldWhere { kind: 'settlement'|'wall'|'road'|'border'|'supplyLine'|'region'|'point'|'offStage'; seat?: string; edge?: string; mode?: 'land'|'water'; fraction?: { num: number; den: number }; pair?: [string, string]; at?: WorldPointCm }   // resolved at fold, kept as a dated fact

*New text* (in full):
> interface WorldWhere { kind: 'settlement'|'wall'|'road'|'border'|'supplyLine'|'region'|'point'|'offStage'|'trod'|'junction' /* trod: on a trod, by its id and a fraction along it; junction: one of a trod's two ends, `end` naming it (file w) */; seat?: string; edge?: string; mode?: 'land'|'water'; fraction?: { num: number; den: number }; pair?: [string, string]; at?: WorldPointCm; trod?: Id; end?: 'a'|'b' }   // resolved at fold, kept as a dated fact

*Evidence:* HR:19, 28; V13:887; V13:2518–2519 (placeOf renders a WorldWhere).

**F11** — `docs/volumes/V13-world.md`:960 (md5 `e68af748638dd3c8474d21b37005c7ac`; edit). The knowledge paragraph names the trod's rule: V14's three states, no fourth tier.

*Current text (as it stands now):*
> this volume adds no fourth tier.

*New text* (in full):
> this volume adds no fourth tier. A trod's `knownTo` follows its `secret` state exactly as a site anchor's does (V14 §2.3; file w): `secret` while `dmOnly` and absent from every party key's `places`, `secret` and in the party's places when `revealed` (the DM's `setAttr`, or a knowledge event the host resolves public or local), `local` when `discovered`.

*Evidence:* V13:957–960; V14:764–766; V14:3082 (J-V14.12); HR:17, 33.

**F12** — `docs/volumes/V13-world.md`:1010 (md5 `e68af748638dd3c8474d21b37005c7ac`; insertion after the line quoted). The trod lay rule's schema, after the route lay rule's.

*Current text (as it stands now):*
>   sea: { trunk: boolean /* every well-ported landmass gets one sea trunk to the largest landmass */; gapFixRatio: number /* a port pair whose sea cost ≤ ratio × its land cost gets the sea leg too */ }; exitRunM: number /* a placed frame's road run through the margin to its gate station */ }   // world.routeLay — the map's own network formation (W7); never the host's, never a time

*New text* (in full; the quoted line repeated as its first line):
>   sea: { trunk: boolean /* every well-ported landmass gets one sea trunk to the largest landmass */; gapFixRatio: number /* a port pair whose sea cost ≤ ratio × its land cost gets the sea leg too */ }; exitRunM: number /* a placed frame's road run through the margin to its gate station */ }   // world.routeLay — the map's own network formation (W7); never the host's, never a time
> interface TrodLayRule {                                                                                      // world.trods — the map's own (W7 (13); file w); never the host's, never a time; every cell {value, unit, provenance, calibratable}
>   cover: { landUse: string[]; slopePct: number; aboveKnee: boolean; minCells: number } /* what is rough country */; density: { km2PerTrod: number; maxPerPatch: number; seedSpacingM: number } /* how many per patch */;
>   lay: { coverFactor: number; openFactor: number; openRunMaxM: number; routeMarginM: number; junctionSpacingM: number; lengthM: { min: number; max: number }; maxCostFactor: number; gateBandM: number } /* how a trod runs */;
>   gauge: { gameSlopePct: number; footSlopePct: number; cartSlopePct: number; widthCm: Record<'game'|'foot'|'cart'|'drove', Cm> } /* the breadth hint from the ground */ }

*Evidence:* HR:29 (the density rule; "tell us the parameters"); V13:1009–1010 (RouteLayRule's form).

**F13** — `docs/volumes/V13-world.md`:1137 (md5 `e68af748638dd3c8474d21b37005c7ac`; insertion after the line quoted). The trod lay rule's default rows, after the route lay table.

*Current text (as it stands now):*
> | `exitRunM` | 400 (a placed frame's road runs through the margin this far to its gate station) |

*New text* (in full; the quoted line repeated as its first line):
> | `exitRunM` | 400 (a placed frame's road runs through the margin this far to its gate station) |
>
> | `TrodLayRule` (`world.trods`; own, PLAUSIBLE, registered in V12 as UNMEASURED until `WORLD-18` measures it; file w) | default | anchor |
> |---|---|---|
> | `cover.landUse` / `cover.slopePct` / `cover.aboveKnee` / `cover.minCells` | forest, wetland, alpine / 10 % / true / 64 | the owner's rough country — forest and marsh are `landUse` words, hills the slope term, mountain `alpine` or a step above the host law's `elevationKneeM` |
> | `density.km2PerTrod` / `maxPerPatch` / `seedSpacingM` | 150 km² / 5 / 4 000 m | several per rough country, multiple of them: a 300 km² wood gets three trods, a 2 000 km² range five |
> | `lay.coverFactor` / `openFactor` / `openRunMaxM` | 0.5 / 4 / 1 500 m | none across open plain: a trod prefers cover four-to-one against the open and never runs more than 1.5 km in it |
> | `lay.routeMarginM` / `junctionSpacingM` | 500 m / 2 000 m | a trod runs beside no road; two junctions on one road lie two km apart, so a trod is a connection, not a verge |
> | `lay.lengthM.min` / `max` / `maxCostFactor` | 1 500 m / 40 000 m / 8 | shorter is a shortcut, longer is a road; trods wind more than roads (`world.routeLay`'s 6) |
> | `lay.gateBandM` | 1 000 m | a junction within this of a placed frame's margin ring reads "at the town gate" (`TrodEnd.nearSeat`) |
> | `gauge.gameSlopePct` / `footSlopePct` / `cartSlopePct` | 20 % / 10 % / 6 % | the steepest segment decides: ≥ 20 % a beasts' trace (`game`), ≥ 10 % one abreast (`foot`), every segment < 6 % and no wetland a cart's bed (`cart`), else beasts driven abreast (`drove`) |
> | `gauge.widthCm` game / foot / cart / drove | 60 / 100 / 250 / 600 cm | the host's four kind hints in the map's words (a game trail, a goat path, an old road, a drover's way); the host turns breadth and ground into its capacity band |

*Evidence:* HR:4 ("multiple of them"), HR:16 (the band derivable), HR:27 (the four kind hints), HR:29 (the density rule); FPI:15 (hills unknowable to the host); V13:1131–1137 (the routeLay table's form).

**F14** — `docs/volumes/V13-world.md`:1260 (md5 `e68af748638dd3c8474d21b37005c7ac`; insertion after the line quoted). §2.5's identity row: a trod is keyed by its seed cell, which no route change moves.

*Current text (as it stands now):*
> | an approach road (a `WorldRoute` of origin `approach`, V13 §3.8 (12)) | the world root | (`route`, the site placement's lineage, `approach`) — so a re-lay keeps its id and a moved site keeps its road's address |

*New text* (in full; the quoted line repeated as its first line):
> | an approach road (a `WorldRoute` of origin `approach`, V13 §3.8 (12)) | the world root | (`route`, the site placement's lineage, `approach`) — so a re-lay keeps its id and a moved site keeps its road's address |
> | a trod (`WorldTrod`, V13 §3.8 (13); file w) | the world root | (`trod`, the landmass, its seed cell's index) — so a re-join after a joined route's removal, re-lay or demotion keeps its id, and the DM's name and reveal keep their address across a rebuild on load |

*Evidence:* V13:1259–1260 (the route and approach-road keys); V13:1813–1815 (a bypass re-lays the route); V13:1860–1861 (an approach road re-joins).

**F15** — `docs/volumes/V13-world.md`:1306 (md5 `e68af748638dd3c8474d21b37005c7ac`; insertion after the line quoted). §2.6's lifecycle row for the trod: written by W7 (13), read by nothing that reads roads, never stored, re-joined or tombstoned by the rules of (13) (h).

*Current text (as it stands now):*
> **veil:** its `knownTo` its site card's — a DM-only site's road DM-only |

*New text* (in full; the quoted line repeated as its first line):
> **veil:** its `knownTo` its site card's — a DM-only site's road DM-only |
> | a trod (`WorldTrod`; file w) | W7 (13) over the cover patches, after W7b and (12) and after each `network` window | the `trods` layer, `worldFactsAt`, V14's E1, `placeOf`, the DM's exports, the canon's trods slot, the DM's `mapFeed` keyless — never `existingRoute`, W6b's `connectivity`, the charters, `roadsAt`, V14's siting plug-ins, the site coherence tests, the patrols, the border posts or the continuity, and never `routeFacts`, `patrolOffer` or `routes(world)` | NEVER stored: rebuilt on load by W7 (13) from the persisted rasters and routes, outside the model digest; the DM's `setAttr`s on it and the host's trod events are records keyed by its id | re-joined (same id, `layVersion` bumped) when its joined route is removed, re-laid or graded hidden, or a W1 or W5 edit's dirty set touches its patch; tombstoned when its seed cell enters a placed frame's extent + margin or its patch falls below `cover.minCells`; never promoted, demoted or graded | the DM's `setAttr` with its edit; a host event never a user's undo target | absent: W7 (13) at load; **veil:** its `secret` state — `dmOnly` absent from every party surface, never greyed |

*Evidence:* V13:1306 (the approach road's row, the model); V13:1300 (absent: re-derived on load); HR:35 (D: never promoted; a decayed road never a way).

**F16** — `docs/volumes/V13-world.md`:1335 (md5 `e68af748638dd3c8474d21b37005c7ac`; edit). The model digest hashes no trod: a derived product of the rasters and routes it already hashes.

*Current text (as it stands now):*
> traces as leaves in schema order; the glyphs are a `derived` cache outside it (C13-21)

*New text* (in full):
> traces as leaves in schema order; the trods are outside it (rebuilt on load by W7 (13), never stored; file w), the glyphs are a `derived` cache outside it (C13-21)

*Evidence:* V13:1332–1335; V13:1361–1362 (the rebuild-on-load pattern).

**F17** — `docs/volumes/V13-world.md`:1362 (md5 `e68af748638dd3c8474d21b37005c7ac`; edit). Q7's answer in the budget paragraph: the trods are not stored, so the size rows do not move.

*Current text (as it stands now):*
> `watershed`, the distance fields) are dropped from the file and rebuilt on load inside V13 §6's load budget.

*New text* (in full):
> `watershed`, the distance fields) are dropped from the file and rebuilt on load inside V13 §6's load budget. The trods (W7 (13); file w) take that fallback from the start: never in the file, rebuilt on load deterministically from the persisted rasters and routes inside the same budget (`WORLD-18`), only the DM's trod edits and the host's trod events stored — so 200 or 2 000 trods a province add nothing to the rows above.

*Evidence:* HR:44 (Q7); V13:1359–1362; read-v13-routes.md §8 (2 000 stored trods ≈ 0.7 MB at the province, a continent over budget).

**F18** — `docs/volumes/V13-world.md`:1445 (md5 `e68af748638dd3c8474d21b37005c7ac`; insertion after the line quoted). The stage table's W7c row, after W7b.

*Current text (as it stands now):*
> | W7b Routes | `W7b` | the final seats (proposals, placements, host seats), the site placements with road access and their cards' kind rows (W7 (12); J393), the surfaces, `dem`, `biome`, the reaches, the cost law | `WorldRoute`s (the approach roads among them), the `routes` layer | none | the world root | F-WORLD (no path) | " |

*New text* (in full; the quoted line repeated as its first line):
> | W7b Routes | `W7b` | the final seats (proposals, placements, host seats), the site placements with road access and their cards' kind rows (W7 (12); J393), the surfaces, `dem`, `biome`, the reaches, the cost law | `WorldRoute`s (the approach roads among them), the `routes` layer | none | the world root | F-WORLD (no path) | " |
> | W7c Trods | `W7c` | the laid network (W7b's routes; (12)'s approach roads and hidden-graded host roads excluded as terminals), `landUse`, `dem`, the placements' extents, the cost law, `world.trods` (W7 (13); file w) | `WorldTrod`s, the `trods` layer | none (`world.trods` reserved: the lay draw-free, its tie-breaks by cell index) | the world root | F-WORLD (trod) | " |

*Evidence:* V13:1445 (the W7b row's form); V13:244 (the world product registers W0–W9).

**F19** — `docs/volumes/V13-world.md`:1873 (md5 `e68af748638dd3c8474d21b37005c7ac`; insertion after the line quoted). W7's thirteenth item: the trods' lay, their lifecycle, their readers and their audience.

*Current text (as it stands now):*
> the DM's `mapFeed` keyless (V13 §3.11.6; J-V13.110).

*New text* (in full; the quoted line repeated as its first line):
> the DM's `mapFeed` keyless (V13 §3.11.6; J-V13.110).
> 13. **Trods (the host's hidden ways; file w).** Run **after (12)** on both worlds — after the genesis lay and after
>    each `network` window on a host-bound world —, each cover patch on its own, no trod reading another patch's,
>    deterministic and draw-free (`world.trods` a reserved concern, V13 §3.17), under `world.trods` (V13 §2.3).
>    (a) **Cover.** A fine land cell is *cover* when its `landUse` is one of `cover.landUse`, its slope over its eight
>    neighbours is ≥ `cover.slopePct`, or, under a host law carrying `elevationKneeM`, it lies above the knee; every
>    other land cell is *open*; water and every placed frame's extent + margin are neither. A *patch* is a 4-connected
>    cover component of ≥ `cover.minCells` cells; patches are ranked by cell count, ties by the lowest cell index. The
>    owner's "none across open plain" is this rule: a patch is never open ground, and a trod leaves cover for at most
>    `openRunMaxM`. (b) **Seeds.** A patch gets n = min(`maxPerPatch`, 1 + ⌊area km² ÷ `km2PerTrod`⌋) seeds: its cells in
>    descending distance from the patch boundary (an integer chamfer transform inside the patch), each next seed ≥
>    `seedSpacingM` from every earlier one, ties by the lower cell index. (c) **The trod cost surface** is (2)'s step cost
>    under the cost law's time terms, × `coverFactor` on a step into a cover cell, × `openFactor` into an open cell or into
>    a cell within `routeMarginM` of a public route's cell; a water cell, a cell inside a placed frame's extent + margin
>    and a cell carrying a public route are impassable — the last except as a terminal. (d) **The two ends.** One Dijkstra
>    (the lifted bucket queue, integer keys, cell-index ties) from the seed over (c) to its first *terminal* — a cell
>    carrying a public land route of any class (the network at the week; a hidden-graded host road no public road, as
>    (12)(a); never a water leg, never an approach road) or a cell of an earlier trod of the same patch — then on to a
>    second terminal on a different route, on the same route at ≥ `junctionSpacingM` of station from the first, or on an
>    earlier trod. A seed whose second terminal lies beyond `maxCostFactor` × the first's cost, or whose trod falls outside
>    `lengthM`, lays none — one `W_TROD_SPARSE` per patch, naming the trods asked and laid. (e) **The polyline** is the first
>    path reversed, the seed, the second path, simplified at `routeToleranceM`, never crossing water; each `route` end's
>    junction is the joined route's polyline point nearest the path's last cell with its station (as (12)(b)); a `trod`
>    end is the earlier trod's nearest polyline point. **No route is written**: a joined route's polyline, stations, effort
>    and lay version stay byte-identical (as (12)(a)). The trod's cells enter the `trods` layer and never the `routes`
>    layer. (f) **Fields** as (7); `gauge` by the gauge rule over the trod's segments; `nearSeat` where a junction lies
>    within `gateBandM` of a placed settlement frame's margin ring; `secret.state` `dmOnly` with cause `generation`; the
>    reason in (6)'s form (its ends, its patch and seed, its gauge rule, the three largest cost contributions).
>    (g) **Order.** Patches in rank order, seeds in their order; a trod reads only earlier trods of its own patch; two runs
>    byte-identical; the lay over one patch byte-identical whether the others are laid or not. (h) **Lifecycle.** A trod's
>    identity is its seed cell (V13 §2.5); it is **re-joined**, same id, `layVersion` bumped, when its joined route is
>    removed, re-laid (a `bypass`, (9)) or graded hidden by a `network` window, or when a W1 or W5 edit's dirty set touches
>    its patch (V13 §3.14.3 row 13) — one end's search re-run from the seed, as an approach road re-joins; it is
>    **tombstoned** when its seed cell enters a placed frame's extent + margin or its patch falls below `cover.minCells`.
>    A trod is never promoted to a route, never demoted, never graded; no `network` change word touches it (the eight of
>    V13 §2.2 stand); **no trod is born where a road dies** — a host route demoted to hidden stays a DM-only ghost
>    `WorldRoute` that a revival restores ((9)), and a dead road joins two settlements, the wrong topology for a way between
>    roads. Genesis is sacred: no host edge and no lay version of a route is moved by a trod. (i) **Readers.** A trod is
>    read by the `trods` layer, `worldFactsAt` (the trod at a point), V14's E1 (the trod within the crop rectangle, as a
>    band of its `widthCm` at the crop's audience), `placeOf`, the DM's exports and the canon's trods slot — and by nothing
>    that reads roads: never (2)'s `existingRoute`, W6b's `connectivity`, the charters' `roads`, `roadsAt`, V14's siting
>    plug-ins, the site coherence tests (a hideout's `awayFromRoutes` counts no trod), W8b (9)'s continuity, (14)'s patrols,
>    (16)'s border posts or a frame. (11) stands unchanged: a junction is a position along a route, and a trod is no route.
>    (j) **Audience.** The DM's `trods` layer (a toggle, default off) draws every trod; a party picture draws a trod only
>    when its `secret` state is `revealed` or `discovered`; an unknown trod is absent — never greyed — from every party
>    surface, its count included (V13 §5.1). On a host-bound world the trods reach the host in the canon's trods slot
>    (V13 §3.11.6) and the DM's `mapFeed` keyless; a trod carries no host key and is in no `routeFacts`, `patrolOffer` or
>    `routes(world)` row.

*Evidence:* HR:4 (the owner's rule), HR:23–29 (A), HR:35 (D); V13:1835–1873 (W7 (12)'s form and its exclusions); V13:1813–1820 (W7 (9)); V13:2928–2929 (a reserved concern).

**F20** — `docs/volumes/V13-world.md`:1875 (md5 `e68af748638dd3c8474d21b37005c7ac`; edit). W7's output line names the trods.

*Current text (as it stands now):*
> *Output:* `WorldRoute`s (the approach roads among them) and the `route` layer; each site placement's approach is the derived `SiteApproach` read over them (V13 §2.2).

*New text* (in full):
> *Output:* `WorldRoute`s (the approach roads among them) and the `route` layer, the `WorldTrod`s and the `trods` layer ((13); file w); each site placement's approach is the derived `SiteApproach` read over them (V13 §2.2).

*Evidence:* V13:1875.

**F21** — `docs/volumes/V13-world.md`:2069 (md5 `e68af748638dd3c8474d21b37005c7ac`; edit). W8b (14): no cadence on any trod — coverage zero on an unknown way holds by construction, and J396 (patrols map-only) stays whole.

*Current text (as it stands now):*
> itself no patrol segment, V13 §3.8 (12)), moved one

*New text* (in full):
> itself no patrol segment, V13 §3.8 (12), and a trod is none either: no cadence, no `patrolOffer` row, a watch on it only as the host sends one, V13 §3.8 (13); file w), moved one

*Evidence:* HR:17 (coverage zero on an unknown way); V13:2063–2069; V13:1163 (gradeShift); PROGRESS.md:455 (J396); V13:4026 (J-V13.111).

**F22** — `docs/volumes/V13-world.md`:2449 (md5 `e68af748638dd3c8474d21b37005c7ac`; edit). The canon bullet names the fourth slot.

*Current text (as it stands now):*
> joins the travel slot). The envelope carries the world header

*New text* (in full):
> joins the travel slot); the **trods slot** — every trod of the laid network at the log head (W7 (13); file w): its two junctions as host edge keys with integer stations (or an earlier trod's id), its ordered runs with their terrain classes and lengths, its integer effort, its gauge and width, the slot's input hash covering the laid network beside the physical layers, the cost law and the member seats, byte-identical across every sway revision. The envelope carries the world header

*Evidence:* HR:23–28; V13:2442–2449.

**F23** — `docs/volumes/V13-world.md`:2463 (md5 `e68af748638dd3c8474d21b37005c7ac`; edit). The additive canon leaves the trods slot byte-identical.

*Current text (as it stands now):*
> spanning tree and K nearest) — every other row as that canon has it, its causes the additions alone

*New text* (in full):
> spanning tree and K nearest; the trods slot byte-identical — an added seat lays no trod and moves none, and a trod whose seed its frame's margin covers is tombstoned only at the premium re-canonize, `W_HOST_CANON_BEHIND` until then; file w) — every other row as that canon has it, its causes the additions alone

*Evidence:* V13:2459–2463 (J388); V13:3814 (H22).

**F24** — `docs/volumes/V13-world.md`:2485 (md5 `e68af748638dd3c8474d21b37005c7ac`; edit). Ask B: the ordered per-stretch classes enter the simulator feed as `routeFacts.runs`, a port read of two fields the record holds.

*Current text (as it stands now):*
>   effort, the crossings and the 52-week seasonal sets — never `costTotal` — and, on request, a water edge's limits (the shallowest navigable depth

*New text* (in full):
>   effort, the ordered **runs** — `{ fromStation; toStation; lengthM; terrainClass }[]`, the edge's stretches read off its `stations` and `vertexClass` (V13 §2.2), summing per class to the per-class effort (file w: the host's fallback for its hidden ways reads them until the trods slot lands, H32) —, the crossings and the 52-week seasonal sets — never `costTotal` — and, on request, a water edge's limits (the shallowest navigable depth

*Evidence:* HR:31, 39 (B; Q2); V13:790–791 (vertexClass, stations: item 689); V13:2484–2485; FPI:394 and HRQ:606, 625 (the stale T2 verdict).

**F25** — `docs/volumes/V13-world.md`:2503 (md5 `e68af748638dd3c8474d21b37005c7ac`; edit). The map feed carries the trods as it carries the approach roads: keyless, by audience.

*Current text (as it stands now):*
> approach roads to world sites keyless, each in the audience its site card's knowledge admits (V13 §3.8 (12); drawn by the host's map surface only by its own choice, H31), the patrol tints,

*New text* (in full):
> approach roads to world sites keyless, each in the audience its site card's knowledge admits (V13 §3.8 (12); drawn by the host's map surface only by its own choice, H31), the trods keyless, each in the audience its `secret` state admits (V13 §3.8 (13); file w), the patrol tints,

*Evidence:* V13:2503; HR:17 (the party's view must never leak an unknown way).

**F26** — `docs/volumes/V13-world.md`:2558 (md5 `e68af748638dd3c8474d21b37005c7ac`; edit). A body on a trod rides the host's presentation overlay (H17's), never a record.

*Current text (as it stands now):*
> `hostOverlay(world, view)` (movers on host edges by fraction and embattlement phases, projected by the host

*New text* (in full):
> `hostOverlay(world, view)` (movers on host edges by fraction, or on a trod by its id and a fraction along it (file w; H32), and embattlement phases, projected by the host

*Evidence:* HR:11 (presence rows); HRQ:83, 577 (H17 carries movers); V13:2558.

**F27** — `docs/volumes/V13-world.md`:2577 (md5 `e68af748638dd3c8474d21b37005c7ac`; edit). Port law (1) gains the one clause the trods slot needs; every other slot is as before.

*Current text (as it stands now):*
> of the physical layers, the host's cost law and the member seats, and no lived host fact enters them; (2) the host

*New text* (in full):
> of the physical layers, the host's cost law and the member seats — the trods slot alone reading the laid network at the log head too, the host's genesis and its own `network` changes mirrored, because a trod's junction is a station on a host edge (file w) —, and no political, overlay, belief or other lived host fact enters them; (2) the host

*Evidence:* V13:2575–2577; HR:24 (junctions on the overt network).

**F28** — `docs/volumes/V13-world.md`:2592 (md5 `e68af748638dd3c8474d21b37005c7ac`; edit). Law (9): the three new words with their one meaning each.

*Current text (as it stands now):*
> the water-passage class of a path (V13 §3.13's `routeClass`) is never sent⏎as a route's class.

*New text* (in full):
> the water-passage class of a path (V13 §3.13's `routeClass`) is never sent
> as a route's class; a hidden way is a **trod** (`WorldTrod`, never *way*, the settlement frame's `Way`, and never *hidden*, the host's grade on an overt route), its ends **junctions**, its breadth a **gauge** (file w).

*Evidence:* HR:10 (the word question); BASE:1093–1103; V13:788, 1815–1820; FPI:99.

**F29** — `docs/volumes/V13-world.md`:2822 (md5 `e68af748638dd3c8474d21b37005c7ac`; edit). Drift row 13 gains the trods' re-join.

*Current text (as it stands now):*
> | 13 | removing or editing a route does not re-route journeys or trade | `setAttr(class)` on a `WorldRoute`, or a seat removed by `setSeats` | W7b over the landmass (the discount changes), the charter's `roads` of every placement the route crossed, W6b's `connectivity` term, W7 (12)'s approach roads that joined the route (J393) | the charters' `roads` and the proposals' `connectivity` terms change; no route touches a removed seat; every approach road that joined a removed route, or one re-classed below its kind's `minClass`, re-joins the nearest qualifying public route or its site's approach reads none (`noRoadAccess` where its road access is `required`) |

*New text* (in full):
> | 13 | removing or editing a route does not re-route journeys or trade | `setAttr(class)` on a `WorldRoute`, or a seat removed by `setSeats` | W7b over the landmass (the discount changes), the charter's `roads` of every placement the route crossed, W6b's `connectivity` term, W7 (12)'s approach roads that joined the route (J393), W7 (13)'s trods whose junction sat on it (file w) | the charters' `roads` and the proposals' `connectivity` terms change; no route touches a removed seat; every approach road that joined a removed route, or one re-classed below its kind's `minClass`, re-joins the nearest qualifying public route or its site's approach reads none (`noRoadAccess` where its road access is `required`); every trod whose junction sat on a removed, re-laid or hidden-graded route re-joins from its seed, its id kept |

*Evidence:* V13:2822; V13:1860–1861.

**F30a** — `docs/volumes/V13-world.md`:2914 (md5 `e68af748638dd3c8474d21b37005c7ac`; edit). F-WORLD's detection gains the trod rung.

*Current text (as it stands now):*
> **no path:** W7's Dijkstra reaches no end or exceeds `maxCostFactor`;

*New text* (in full):
> **no path:** W7's Dijkstra reaches no end or exceeds `maxCostFactor`; **trod:** W7 (13) finds a seed no second junction within `world.trods`' `maxCostFactor` × its first, or a trod outside `lengthM` (file w);

*Evidence:* V13:2914; W7 (13) (d).

**F30b** — `docs/volumes/V13-world.md`:2914 (md5 `e68af748638dd3c8474d21b37005c7ac`; edit). F-WORLD's ladder for the trod rung.

*Current text (as it stands now):*
> no path: the pair unjoined, reported;

*New text* (in full):
> no path: the pair unjoined, reported; trod: the seed lays none, reported once per cover patch (`W_TROD_SPARSE`);

*Evidence:* V13:2914.

**F31** — `docs/volumes/V13-world.md`:2929 (md5 `e68af748638dd3c8474d21b37005c7ac`; edit). §3.17: the trods' concern is a reserved id, no stream.

*Current text (as it stands now):*
> (reserved: siting draws nothing, its tie-break deterministic, V13 §3.7 (6); SW-03),

*New text* (in full):
> (reserved: siting draws nothing, its tie-break deterministic, V13 §3.7 (6); SW-03), `world.trods` (reserved: W7 (13) draws nothing, its patches, seeds and searches tied by cell index; file w),

*Evidence:* V13:2928–2929.

**F32** — `docs/volumes/V13-world.md`:2944 (md5 `e68af748638dd3c8474d21b37005c7ac`; edit). §3.17's work limit for W7c.

*Current text (as it stands now):*
> W7a, W7b ≤ Σ over edges of the search ellipse's cells; W8a ≤

*New text* (in full):
> W7a, W7b ≤ Σ over edges of the search ellipse's cells; W7c ≤ Σ over seeds of its two searches' discs' cells, each disc bounded by `world.trods`' `maxCostFactor` × the first terminal's cost (a cut drops the remaining lowest-rank patches; file w); W8a ≤

*Evidence:* V13:2944–2948.

**F33** — `docs/volumes/V13-world.md`:3318 (md5 `e68af748638dd3c8474d21b37005c7ac`; edit). §5.8 (6)'s collision rows gain trod and hidden.

*Current text (as it stands now):*
> written a border crossing, a route's intermediary settlement or a town gate, never bare; *toll* names which of its

*New text* (in full):
> written a border crossing, a route's intermediary settlement or a town gate, never bare; *trod* is the map's hidden way and *hidden* the host's grade on an overt route, never each other and never *way* (file w); *toll* names which of its

*Evidence:* V13:3316–3318; V13:1174 (the collision list does not carry hidden).

**F34** — `docs/volumes/V13-world.md`:3144 (md5 `e68af748638dd3c8474d21b37005c7ac`; insertion after the line quoted). §5.1's `trods` layer: the line, the three states, the audience, the fixed legend, the knowing town's mark.

*Current text (as it stands now):*
> sea 1 px dashed blue, river (navigable) a darker water line |

*New text* (in full; the quoted line repeated as its first line):
> sea 1 px dashed blue, river (navigable) a darker water line |
> | `trods` (a toggle, default off; file w) | vector | every `WorldTrod` at the lay in force at the view's week, with V14 §5.1's state cue at its midpoint (a dashed ring with the eye-slash glyph while `dmOnly`, an open ring `revealed`, a filled ring `discovered`), its junctions as ticks on the joined route and its length in km only where it draws, the DM's name where given; the DM sees every trod with the layer on and none with it off (so a picture export carries the network only on purpose); a player only a `revealed` or `discovered` trod — an unknown trod absent from the picture, the labels, the hover, the screen-reader summary and every player export, never greyed; the legend one fixed sentence in every audience, whatever the count: "Trods show only where a town is known to use one or the game master has revealed one; others may exist." — no legend row, picker state, label, summary or export reads the count (T-V13-60); a knowledge event the host sends (its kind through the adapter folder's event table) draws as the `events` layer's pin on the trod in the knowing seat's allegiance colour, captioned with the seat, its how-word and its week, only where the trod draws for that audience — a knowledge event resolved public or local being the host's reveal (V14 §2.3), its retraction the lowering unless the DM's reveal stands; an engagement at a junction draws at the junction's point for its audience, never the line | 0.6 px dash-dot in the `secret` colour role; the ring cues V14 §5.1's |

*Evidence:* HR:33 (C1–C5); V13:3144, 3148 (the routes and patrols rows); V13:3323–3331 (the audience filter); V14:2583–2588; V14:764.

**F35** — `docs/volumes/V13-world.md`:3389 (md5 `e68af748638dd3c8474d21b37005c7ac`; edit). The plague lens's not-drawn list states the quarantine's map side; the refusals stand.

*Current text (as it stands now):*
> nothing there until H24 closes that gap).

*New text* (in full):
> nothing there until H24 closes that gap); a closure for quarantine — the host has no such verb (its plague-R7, an owner question on its side): when one exists and arrives as a host-stored dated fact naming which gate (a town gate or a border crossing, never bare, V13 §5.8 (6)), a closure element may be added then; a trod (V13 §3.8 (13); file w) draws unchanged across it, is never drawn as its bypass and never carries the plague.

*Evidence:* HR:20 (behaviour 6); V13:3385, 3428; HRQ:481; research/sf/plague-system.md:556, 798–799; research/sf/lens-implications.md:196.

**F36** — `docs/volumes/V13-world.md`:3428 (md5 `e68af748638dd3c8474d21b37005c7ac`; edit). The patrols lens refuses a cadence on a trod.

*Current text (as it stands now):*
> *Refusals:* a patrol drawn lowering danger or holding a quarantine line; a cadence sent to the host as a time. *Not drawn

*New text* (in full):
> *Refusals:* a patrol drawn lowering danger or holding a quarantine line; a cadence sent to the host as a time; a cadence or a `patrolOffer` row on a trod (V13 §3.8 (13); file w). *Not drawn

*Evidence:* V13:3428; HR:17.

**F37** — `docs/volumes/V13-world.md`:3656 (md5 `e68af748638dd3c8474d21b37005c7ac`; edit). §6's budget register gains WORLD-18.

*Current text (as it stands now):*
> `WORLD-17` W7 (12) for one site ≤ 20 ms, a whole landmass's approaches ≤ 0.1 × the W7a + W7b row (V13 §3.8 (12)). Each⏎has its T-V13 row in §7.

*New text* (in full):
> `WORLD-17` W7 (12) for one site ≤ 20 ms, a whole landmass's approaches ≤ 0.1 × the W7a + W7b row (V13 §3.8 (12));
> `WORLD-18` W7 (13) ≤ 0.5 × the W7a + W7b row at every rung (≤ 30 / 100 / 260 ms at province / realm / continent; PLAUSIBLE until SP-W7 extended measures it; file w), on load as at generation. Each
> has its T-V13 row in §7.

*Evidence:* V13:3591 (the W7 row), 3656–3657; read-v13-routes.md §8 (2 000 trods ≈ 61 ms at the province).

**F38** — `docs/volumes/V13-world.md`:3720 (md5 `e68af748638dd3c8474d21b37005c7ac`; insertion after the line quoted). §7.3's two new tests after T-V13-58.

*Current text (as it stands now):*
> every search is bit-identical across two runs | the placement fixtures |

*New text* (in full; the quoted line repeated as its first line):
> every search is bit-identical across two runs | the placement fixtures |
> | T-V13-59 | trods (W7 (13); file w): on B-WORLD-lite two runs byte-identical, and the lay over one patch byte-identical with the other patches dropped; the density fixture (one 300 km² wood, one 2 000 km² range, one open plain between two roads) lays three trods in the wood, five in the range and none across the plain, no open run over `openRunMaxM`; every end a junction on a public route or an earlier trod — never a seat, a water cell, a cell inside a placed frame's extent + margin, an approach road or a hidden-graded host road; every joined route byte-identical (polyline, stations, effort, lay version); no trod earns an `existingRoute` discount, enters a W6b `connectivity` term, a charter's `roads`, a `roadsAt` row, a siting term, a coherence test, a `PatrolCadence`, a `patrolOffer` row, a border-post proposal or a continuity read; the canon's trods slot carries integer stations, runs, gauge and width, is byte-identical across every sway revision and a permuted input, moves its version only with its inputs and is byte-identical in the additive canon; `routeFacts.runs` is ordered and sums per class to the per-class effort; a route removed, re-laid by a mock host's `bypass` or graded hidden under a trod re-joins it with its id kept and `layVersion` bumped; the set rebuilt on load is byte-identical to the generated set; W7 (13) inside `WORLD-18` | the world fixtures; a mock host |
> | T-V13-60 | the trods' reveal (file w): two worlds differing only in unrevealed trods give byte-identical party pictures, legends, picker rows, hovers, screen-reader summaries, player-audience `mapFeed`s and every player export; a `dmOnly` trod is in no party picture, count, label, crop or export; the DM's `trods` layer draws every trod with the layer on and none with it off; a trod revealed by `setAttr` draws for the party with the open-ring cue; a knowledge event resolved public sets it `revealed` (cause the event) and draws the knowing seat's mark at the trod, resolved `dmOnly` it marks the DM's view only, and its retraction lowers the state unless the DM's reveal stands; the legend sentence is one string at 0, 1 and 1 000 trods; an engagement at a junction on an unrevealed trod draws at the junction's point for its audience and never the line; V14's E1 crop lays a revealed trod's band and nothing for an unrevealed one in a party crop | the audience fixtures; V14's crop fixtures |

*Evidence:* V13:3720 (T-V13-58 the last); V13:3745 (T-V13-50's form); HR:17, 33.

**F39** — `docs/volumes/V13-world.md`:3766 (md5 `e68af748638dd3c8474d21b37005c7ac`; insertion after the line quoted). §7.5's report code for the trod rung.

*Current text (as it stands now):*
> | `W_SITE_NO_ROAD_ACCESS` | warning | W7 (12) (J393) | the site, the nearest route of its kind's class and its distance |

*New text* (in full; the quoted line repeated as its first line):
> | `W_SITE_NO_ROAD_ACCESS` | warning | W7 (12) (J393) | the site, the nearest route of its kind's class and its distance |
> | `W_TROD_SPARSE` | warning | W7 (13) (file w) | the cover patch, the trods asked and laid |

*Evidence:* V13:3766.

**F40a** — `docs/volumes/V13-world.md`:3814 (md5 `e68af748638dd3c8474d21b37005c7ac`; edit). M-W2 carries A and C.

*Current text (as it stands now):*
> (12)'s approaches to world sites and P1's site form with its bend (J393);

*New text* (in full):
> (12)'s approaches to world sites and P1's site form with its bend (J393); W7 (13)'s trods with `WorldTrod`, `world.trods`, the `trods` raster and layer with its three states and its fixed legend (file w);

*Evidence:* HR:43 (Q6); V13:3814.

**F40b** — `docs/volumes/V13-world.md`:3814 (md5 `e68af748638dd3c8474d21b37005c7ac`; edit). M-W2's port list gains the runs, the slot and the two place kinds.

*Current text (as it stands now):*
> the port's `routes`, `routeFacts`, `mapFeed`, `patrolOffer`, `pathGeometry`, `borderSegment`, `placeOf`,

*New text* (in full):
> the port's `routes`, `routeFacts` (its `runs`, file w), `mapFeed`, `patrolOffer`, `pathGeometry`, `borderSegment`, `placeOf` (the trod and junction kinds), the canon's trods slot,

*Evidence:* V13:3814.

**F40c** — `docs/volumes/V13-world.md`:3814 (md5 `e68af748638dd3c8474d21b37005c7ac`; edit). M-W2's estimate re-declared at 9 pw.

*Current text (as it stands now):*
> so the row holds, PLAUSIBLE until the M-W0 spikes re-price it) |

*New text* (in full):
> so the row holds, PLAUSIBLE until the M-W0 spikes re-price it; file w's trods ≈ 0.75 pw — W7 (13) 0.25, the record, layer, states and legend 0.25, the slot, runs and places 0.25 — so the row is re-declared at 9 pw, inside §16's 37–45) |

*Evidence:* V13:3814; V13:3818–3819 (§16's 37–45 range).

**F41** — `docs/volumes/V13-world.md`:3906 (md5 `e68af748638dd3c8474d21b37005c7ac`; insertion after the line quoted). §8.5's H32, the host's half of the hidden ways.

*Current text (as it stands now):*
> | H31 | after M-W3, after H19 (optional; J393) | its map surfaces draw the map feed's approach roads — the map's own roads to world sites, keyless — as presentation labelled "map road", read by no step of its simulation | M-W2; H19 |

*New text* (in full; the quoted line repeated as its first line):
> | H31 | after M-W3, after H19 (optional; J393) | its map surfaces draw the map feed's approach roads — the map's own roads to world sites, keyless — as presentation labelled "map road", read by no step of its simulation | M-W2; H19 |
> | H32 | with M-W2 (after H12) | the trod asks (the host's hidden-ways request of 2026-10-18; file w): its builder reads the canon's trods slot — each trod's two junctions as host edge keys with integer stations (or an earlier trod's id), its ordered runs with their terrain classes and lengths, its integer effort, its gauge and width — and retires the cover graph it derives from `routeFacts.runs` until then; its knowledge event kind in the events window (H9): the knowing seat, the trod's id, its how-word (`cause`), the week, the resolved audience, retracted by the windowed replace; every engagement at a trod or a junction with its `where` naming it (the `trod` and `junction` kinds); a body on a trod in its presentation overlay (H17) by the trod's id and fraction; a watch it keeps on a trod as a dated event (H9), never a map cadence; its register: `trod` and the four gauge words registered as the map's, `hidden` kept as its ladder's last word on an overt edge, `way` minted on neither side | M-W2; H5; H9; H12; H17 |

*Evidence:* HR:46–47 (what the host records); V13:3884 (H9), 3891 (H16), 3893 (H17), 3898 (H23), 3906 (H31 the last).

**F42** — `docs/volumes/V13-world.md`:4028 (md5 `e68af748638dd3c8474d21b37005c7ac`; insertion after the line quoted). §9's eleven decision rows for the hidden ways.

*Current text (as it stands now):*
> (item 133 (e)) (vetoable) |

*New text* (in full; the quoted line repeated as its first line):
> (item 133 (e)) (vetoable) |
> | J-V13.114 | **(file w; J407.)** chose **`trod`** for the host's hidden way over *way* (the settlement frame's `Way` and `WayClass`, the glyph's mark, V14's way bands and J393's way to the gate), *trace* (the trace records), *byway* (a minor public road in plain English, and the sites-roads lane's rejected name for the approach road), *holloway* (a sunken lane: an overt road's form) and *hidden* (the host's grade on an overt route, V13 §3.8 (9)), because the word must be free in the base, both volumes and the host's register, and `trod` — a path worn by feet and beasts — is free everywhere and names the thing; the breadth hint is a **gauge** (`game`, `foot`, `cart`, `drove`), the host's four kind hints in the map's words (vetoable) |
> | J-V13.115 | **(file w.)** chose **a record of its own, `WorldTrod`, with no class and no grade**, over a seventh `WorldRoute.class`, a `WorldRoute` origin or a `kind: 'hidden'`, because every reader of roads reads `WorldRoute` and the approach road, one more `WorldRoute`, needed six exclusions to stay out of pricing and siting (J-V13.113); a record of its own is read only where a sentence names it, so W7 (11), the charters, siting, the patrols and the continuity keep their meaning word for word (vetoable) |
> | J-V13.116 | **(file w.)** chose **two junction ends, each on a public route or an earlier trod, never a seat and never inside a placed frame's extent + margin**, the host's "settlement's gate" a junction within `gateBandM` of the frame's margin ring carrying `nearSeat`, over a seat end or a gate-station end, because W7 (11) lets nothing but a host route end at a settlement, the approach road never enters a frame (W7 (12)), and door 1 stays untouched when the only point that leaves is one on a public route the host already holds; **no capacity band is recorded** — the host derives it from the gauge, the width and the ground, as it asked (vetoable) |
> | J-V13.117 | **(file w.)** chose **a terrain-born, deterministic, draw-free lay** (cover patches of `landUse`, slope and the host law's knee; seeds by distance from the patch boundary; two searches to the nearest public-route terminals; identity by seed cell; re-join on a joined route's removal, re-lay or demotion; tombstone when a frame covers the seed) and **no storage** (rebuilt on load, as §2.7's recomputable rasters), over a density per province, a draw, identity by junction cells (a bypass would mint a new trod and orphan the host's knowledge rows) or stored polylines (2 000 a province ≈ 0.7 MB at the province's edge and a continent over its 24 MB), because the owner's rule is a terrain rule and a trod's address must survive the host's lived changes (vetoable) |
> | J-V13.118 | **(file w.)** chose **the trods as the canon's fourth slot** — versioned by its own input hash, byte-identical across every sway revision and in the additive canon — with port law (1) widened by the one clause that the slot reads the laid network at the log head, over an optional simulator product or the map feed alone, because the host asked for the layer in the canon "versioned like the digest", a trod's junction is a station on a host edge the host must be able to name, and the world canon is outside door 1 by the owner's word (V13 §11 Q4) (vetoable) |
> | J-V13.119 | **(file w.)** chose **knowledge per town as the host's** — a dated knowledge event through the events window with its resolved audience, drawn by the `events` layer as the knowing seat's pin on the trod and never decided by the map — and **the party's reveal as V14's three states on the trod** (`dmOnly` · `revealed` · `discovered`, the admission function and the party key unchanged; a knowledge event resolved public or local the host's reveal, the DM's one `setAttr`), over a per-town flag on the record (the map storing a host belief as its own fact), a fourth knowledge tier or a map rule for who knows (an invented fact), because V13 adds no fourth tier, no believed fact enters or leaves the canon, and the host prefers to send and never be asked (vetoable) |
> | J-V13.120 | **(file w.)** chose **no patrol cadence and no `patrolOffer` row on any trod**, a watch drawn only as the host sends one, over a map cadence on a known trod for the knowing power, because the host decides who watches a way it knows, a map cadence would put patrol pieces in the crop where the host sets none, and J396 keeps patrols map-only — so coverage zero on an unknown way holds by construction (vetoable) |
> | J-V13.121 | **(file w.)** chose **a trod never promoted, never demoted and never born where a road dies**, the host's `hidden` grade left as the grade of an overt route and the eight `network` change words unchanged, over a trod minted from a demoted road, because a demoted route keeps its polyline and a revival restores it (one geometry under two identities), a dead road joins two settlements (the wrong topology for a way between roads), and the host has no such law and would rather not mint one (vetoable) |
> | J-V13.122 | **(file w.)** chose **no ninth lens in this pass** — the trod's line and its reveal in the `trods` layer, the knowing town's mark the `events` layer's pin, and the bodies' marks over the trods (a watch, a band's presence, an engagement) rows of D-V13.8's deferred danger lens once the host sends them — over a lens of its own now, because a lens may hold no geography (§5.8: nothing of a lens is read by a stage, an encounter or the clerk), the host's bodies are the cause of its embattlement, which the danger lens draws, and the reveal needs no lens machinery (vetoable) |
> | J-V13.123 | **(file w.)** chose **the quarantine refusals kept** (no quarantine line, no patrol holding one) until the host's closure verb exists and arrives as a host-stored dated fact naming which gate, a closure element then a later item, **a trod drawn unchanged across a closure** and never as its bypass, over drawing a closure now or marking which trods cross it, because the host has no such verb (its own open question), the map draws no effect the host does not apply, and which way a body takes past a closure is the host's law (vetoable) |
> | J-V13.124 | **(file w.)** chose **`routeFacts.runs`** — the ordered stretches of a host edge with their terrain classes and lengths, read off the `stations` and `vertexClass` the record already holds — as the host's per-stretch ground (its fallback for the hidden ways and its army pace), over a new generator product or a per-stretch field on the canon's travel slot, because the record half of T2 landed with item 689 and only the simulator feed lacked it, and `routeFacts` is already the optional, switch-gated carrier of a route's effort facts (vetoable) |

*Evidence:* V13:4028 (J-V13.113 the last); each row's reasons cite the lines named in design-C.md §0–§1.

**F43** — `docs/volumes/V13-world.md`:4040 (md5 `e68af748638dd3c8474d21b37005c7ac`; edit). D-V13.8's danger lens is where the bodies' marks over the trods will live.

*Current text (as it stands now):*
> gated on H17's presentation messages and the lens window (never a border's or a march's danger); **calamity** — strike

*New text* (in full):
> gated on H17's presentation messages and the lens window (never a border's or a march's danger), and, once the host's hidden-ways facts arrive (file w; H32), the trods' marks — a watch the host keeps on a trod, a band on one by its overlay, an engagement at a junction — as rows of this lens, the trod's line and its reveal never a lens mark (V13 §5.1's `trods` layer); **calamity** — strike

*Evidence:* V13:4038–4040; HR:4 (the bodies the cause of an embattled region).

**F44** — `docs/volumes/V13-world.md`:4432 (md5 `e68af748638dd3c8474d21b37005c7ac`; edit). Q2 counts H32.

*Current text (as it stands now):*
> (V13 §8.5's H1–H31)

*New text* (in full):
> (V13 §8.5's H1–H32)

*Evidence:* V13:4432; V13:3906.

**F45** — `docs/volumes/V13-world.md`:4437 (md5 `e68af748638dd3c8474d21b37005c7ac`; edit). Q2's recommended schedule places H32 with M-W2.

*Current text (as it stands now):*
> H12–H17 and H22 with M-W2, H23–H30 with M-W5,

*New text* (in full):
> H12–H17, H22 and H32 with M-W2, H23–H30 with M-W5,

*Evidence:* V13:4437.

**F46** — `docs/volumes/V13-world.md`:4461 (md5 `e68af748638dd3c8474d21b37005c7ac`; edit). §11's Q5: the one true owner question — a capability across the boundary.

*Current text (as it stands now):*
> (Q2).⏎⏎**Ruled — who keeps a gate under the sway**

*New text* (in full):
> (Q2).
>
> **Q5 — The trods slot under the door-1 answer.** The hidden ways (file w) send the host one more class of world-scale
> geography — the trods, each with its junctions on the host's edges, its ground runs, its effort, gauge and width — in a
> fourth slot of the world canon (V13 §3.11.6), beside the travel, water and sites slots the owner's answer to Q4 covered
> ("world-scale facts … may flow to the host while a town's own geometry never does", 2026-10-18, file r item 926). A trod
> never enters a settlement frame, so no frame geometry travels with it. The session reads the trods as inside that answer;
> the owner may say otherwise. *Recommendation:* confirm; the slot is built with M-W2 either way, and if the owner withholds
> it the trods stay the map's own, drawn and revealed as designed, and the host's bodies keep their stand-in cover graph
> over `routeFacts.runs` (vetoable).
>
> **Ruled — who keeps a gate under the sway**

*Evidence:* V13:4455–4459 (Q4's answer); HR:9 (the request's reading of the owner's answer).

**FV1** — `docs/volumes/V14-sites.md`:766 (md5 `f5dd37a7e9b739da7f29095d47a17a87`; edit). V14's SecretState comment names its second reader.

*Current text (as it stands now):*
> function (§9.2) reads knownTo and the key's `places` as for any place; the state adds the second cue (V14 §5.1) and the clerk's words only.

*New text* (in full):
> function (§9.2) reads knownTo and the key's `places` as for any place; the state adds the second cue (V14 §5.1) and the clerk's words only. V13's trods — the map's hidden ways — carry this record whole (`WorldTrod.secret`, V13 §2.2; file w): the same states, cue, admission and party key.

*Evidence:* V14:763–766; V13 §2.2 (F5).

**FV2** — `docs/volumes/V14-sites.md`:994 (md5 `f5dd37a7e9b739da7f29095d47a17a87`; edit). The route-borne coherence tests count no trod: a hideout beside a trod is a hideout.

*Current text (as it stands now):*
> (highway > road > track > trail; never a water leg, never an approach road — the map's own road to a world site is no road to siting, V13 §3.8 (12)); a target is the nearest

*New text* (in full):
> (highway > road > track > trail; never a water leg, never an approach road — the map's own road to a world site is no road to siting, V13 §3.8 (12) —, never a trod — the map's hidden way is no road to anything that reads roads, V13 §3.8 (13); file w); a target is the nearest

*Evidence:* V14:993–994; V14:977 (the hideout row).

**FV3** — `docs/volumes/V14-sites.md`:2091 (md5 `f5dd37a7e9b739da7f29095d47a17a87`; edit). E1's world case reads a trod at the point, by audience.

*Current text (as it stands now):*
>    class, biome, the route or river within the rectangle, the seat territory and the polity at the point and the

*New text* (in full):
>    class, biome, the route, trod or river within the rectangle (a trod only in an audience its `secret` state admits, V13 §2.2; file w), the seat territory and the polity at the point and the

*Evidence:* V14:2091; HR:6 (smuggler and wanderer encounters sit on these paths, ENC-HL-12).

**FV4** — `docs/volumes/V14-sites.md`:2100 (md5 `f5dd37a7e9b739da7f29095d47a17a87`; edit). The crop frame lays a trod as a band of its gauge's width.

*Current text (as it stands now):*
> (iii) the charter's `roads` as way bands⏎   of their class (`corridorUnion` over the route's polyline at its class width),

*New text* (in full):
> (iii) the charter's `roads` as way bands
>    of their class (`corridorUnion` over the route's polyline at its class width) and a trod the crop's audience admits as a band of its `widthCm` over its polyline (V13 §2.2 `WorldTrod`; file w),

*Evidence:* V14:2100–2101.

**FV5** — `docs/volumes/V14-sites.md`:3177 (md5 `f5dd37a7e9b739da7f29095d47a17a87`; edit). V14 §10.2's request list to V13 names the trod record it reads.

*Current text (as it stands now):*
> W8b (14)'s patrol source through the approach; border posts' `at` on the route's polyline |

*New text* (in full):
> W8b (14)'s patrol source through the approach; border posts' `at` on the route's polyline; (19, file w) the `WorldTrod` record — the map's hidden way between two junctions, its `secret` V14 §2.3's `SecretState` whole and the party's places — read by E1's world crop as a band of its `widthCm` at the crop's audience and by every route-borne test as no route |

*Evidence:* V14:3177.

**FH1** — `docs/HOST-REQUIREMENTS-2026-10-18.md`:83 (md5 `7db37cc1a4e03fc8db665c1be9d55211`; edit). H17 carries a body on a trod.

*Current text (as it stands now):*
> optionally an audience's known political events. Host: its presentation layer. V13 §8.5 H17 (line 3755).

*New text* (in full):
> optionally an audience's known political events; a body on a trod (the map's hidden way, file w) by the trod's id and fraction in the same overlay (H32). Host: its presentation layer. V13 §8.5 H17 (line 3755).

*Evidence:* HRQ:83; V13:2558 (F26).

**FH2** — `docs/HOST-REQUIREMENTS-2026-10-18.md`:84 (md5 `7db37cc1a4e03fc8db665c1be9d55211`; insertion after the line quoted). The M-W2 table gains H32.

*Current text (as it stands now):*
> the premium canonize entitlement never gates it (lines 3729–3730, 3760) |

*New text* (in full; the quoted line repeated as its first line):
> the premium canonize entitlement never gates it (lines 3729–3730, 3760) |
> | H32 | The hidden ways (the host's request of 2026-10-18, answered map-side by file w). Read the world canon's new **trods slot**: one record per trod — the map's hidden way between two junctions on the overt network — with its two junctions as host edge keys and whole-number stations (or an earlier trod's id), its ordered ground runs with their terrain classes and lengths, its effort, its gauge word and width; retire the stand-in cover graph derived from `routeFacts.runs` when it lands. Send a town's knowledge of a trod as an events-window row (H9): the knowing seat, the trod id, the how-word, the week, who may see it; a retraction is forgetting. Name a trod or a junction as an engagement's place (`WorldWhere` kinds `trod` and `junction`). Put a body on a trod in the presentation overlay (H17) by the trod's id and fraction. Send a watch on a trod as a dated event, never a map cadence. Register `trod` and the four gauge words (`game`, `foot`, `cart`, `drove`) as the map's; keep `hidden` as the host's own grade on an overt edge; mint `way` on neither side. Host: its frozen-record builder, its events window, its engagement registry, its presentation layer, its register. V13 §8.5 H32 (file w). | The host's bodies travel the trods the map lays; without H32 they keep the stand-in cover graph and the map's trods stay a DM picture. | M-W2; H5; H9; H12; H17. | Required for the bodies chain (file w) |

*Evidence:* HRQ:84 (the H22 row, the last of the M-W2 table); HR:46–47.

**FH3** — `docs/HOST-REQUIREMENTS-2026-10-18.md`:577 (md5 `7db37cc1a4e03fc8db665c1be9d55211`; insertion after the line quoted). The summary table gains H32.

*Current text (as it stands now):*
> | H17 | Presentation messages: movers and embattlement phases projected for the audience. | With M-W2; waits on H4 | V13 §8.5 (line 3755) |

*New text* (in full; the quoted line repeated as its first line):
> | H17 | Presentation messages: movers and embattlement phases projected for the audience. | With M-W2; waits on H4 | V13 §8.5 (line 3755) |
> | H32 | The trod asks: read the canon's trods slot and retire the stand-in cover graph; send a town's knowledge of a trod as an events-window row; name a trod or a junction as an engagement's place; a body on a trod in the presentation overlay; a watch as a dated event; register `trod` and the gauge words, keep `hidden` for the host's grade, mint `way` on neither side. | With M-W2; waits on H5, H9, H12, H17 | V13 §8.5 (H32; file w) |

*Evidence:* HRQ:577 (the H17 row); HRQ:566–579 (the table).

**FH4** — `docs/HOST-REQUIREMENTS-2026-10-18.md`:625 (md5 `7db37cc1a4e03fc8db665c1be9d55211`; edit). ENC-HP-09 corrected: T2's record half exists, its feed half lands with M-W2.

*Current text (as it stands now):*
> It needs the per-stretch terrain classes the map does not return ("needs T2").

*New text* (in full):
> It needs the per-stretch terrain classes the map does not return ("needs T2"). [Dated bracket, 2026-10-18, file w: the record already holds them — `WorldRoute.vertexClass` per segment with per-vertex `stations` (V13 §2.2; amendment item 689) — and the simulator feed gains them as `routeFacts.runs`, the ordered stretches with their classes and lengths, with M-W2 (V13 §3.11.6); ledger row T2's MISSING and ENC-HS-06's "no per-stretch breakdown" predate item 689. The host's hidden-ways fallback (its stand-in cover graph) stands on `routeFacts.runs` until the trods slot lands (H32).]

*Evidence:* HRQ:625; V13:790–791; docs/AMENDMENTS-2026-10-17m.md:543; FPI:394, 401; HR:31, 39.

**FH5** — `docs/HOST-REQUIREMENTS-2026-10-18.md`:653 (md5 `7db37cc1a4e03fc8db665c1be9d55211`; edit). ENC-HL-10 touched as the request touches it: the bypass fold exists; no detour of the map's own.

*Current text (as it stands now):*
> but did not build it; the map offers no detour either. (ENC-HL-10)

*New text* (in full):
> but did not build it; the map offers no detour either. (ENC-HL-10) [Dated bracket, 2026-10-18, file w: the map now mirrors the host's bypass as a dated re-lay under the same host key (V13 §3.8 (9); T-V13-41 (u)) and re-joins the trods whose junctions sat on the re-laid stretch; it mints no detour of its own, and no trod is born where a road dies (V13 §3.8 (13) (h)).]

*Evidence:* HRQ:653; V13:1813–1815; V13:3736 (T-V13-41 (u)); HR:35.

**FH6** — `docs/HOST-REQUIREMENTS-2026-10-18.md`:654 (md5 `7db37cc1a4e03fc8db665c1be9d55211`; edit). ENC-HL-11 touched as the request touches it.

*Current text (as it stands now):*
> that is map geometry, and the map must not present it as host truth. | Ledger row L1

*New text* (in full):
> that is map geometry, and the map must not present it as host truth. A trod's junction (file w) is topological — which trod meets which road at which station — and carries nothing sight-related. | Ledger row L1

*Evidence:* HRQ:654; HR:18.

**FH7** — `docs/HOST-REQUIREMENTS-2026-10-18.md`:655 (md5 `7db37cc1a4e03fc8db665c1be9d55211`; edit). ENC-HL-12 filled.

*Current text (as it stands now):*
> | Smuggler and wanderer encounters would sit on these paths. | Ledger row M4: STUB; verdict MISSING. | Ledger I/O: TICK. |

*New text* (in full):
> | Smuggler and wanderer encounters would sit on these paths. [Answered 2026-10-18, file w: the map's half is the **trod** (`WorldTrod`, V13 §2.2; W7 (13)) — the map's own hidden way between two junctions on the overt network, laid through rough country and never across open plain, never a route class and never the host's `hidden` grade (which stays a decayed overt road's, V13 §3.8 (9)); sent in the canon's trods slot with its junctions as host edge keys and stations, its ordered ground runs, its gauge and width; drawn for the players only when the host says a town knows it or the game master reveals it (V13 §5.1 `trods`). `way` is minted on neither side: it is the settlement frame's `Way`.] | Ledger row M4: STUB; verdict MISSING → DESIGNED map-side (file w); the host's half H32. | Ledger I/O: ONE-SHOT at canonize (the slot); TICK (its knowledge events, H9). |

*Evidence:* HRQ:655; HR:6; FPI:159, 455.

**FH8** — `docs/HOST-REQUIREMENTS-2026-10-18.md`:656 (md5 `7db37cc1a4e03fc8db665c1be9d55211`; edit). ENC-HL-13 touched as the request touches it.

*Current text (as it stands now):*
> so the host's engagement registry is where the map's typed places and border segments will be read. |

*New text* (in full):
> so the host's engagement registry is where the map's typed places and border segments will be read. A trod and a junction are typed places too (`WorldWhere` kinds `trod` and `junction`, V13 §2.2; file w), so an engagement on a hidden way has a place the map can name. |

*Evidence:* HRQ:656; HR:19.

**FI1** — `docs/volumes/INDEX.md`:14 (md5 `10a72c97f86a88533292971629c56539`; edit). The index's applied-files sentence gains file w (the apply lane fills the item range).

*Current text (as it stands now):*
> and file v (`docs/AMENDMENTS-2026-10-18v.md`, item 954: the owner's answer to V14 §11 Q5 carried into the volumes, J398, 2026-10-18), applied by the lane its status line names.

*New text* (in full):
> and file v (`docs/AMENDMENTS-2026-10-18v.md`, item 954: the owner's answer to V14 §11 Q5 carried into the volumes, J398, 2026-10-18), applied by the lane its status line names, and file w (`docs/AMENDMENTS-2026-10-18w.md`, items from 955: the host's hidden ways answered — the trods, 2026-10-18; J407), applied by the lane its status line names.

*Evidence:* INDEX:14.

**FI2** — `docs/volumes/INDEX.md`:39 (md5 `10a72c97f86a88533292971629c56539`; edit). V13's index row names the trods.

*Current text (as it stands now):*
> the sway and patrols (the owner's territory rules, V13 §3.9); the lenses over the host's simulated systems (V13 §5.8, §5.9); the map-import adapter and the ecosystem-shaped exports |

*New text* (in full):
> the sway and patrols (the owner's territory rules, V13 §3.9); the trods — the hidden ways between the roads, laid through rough country, sent in the canon and shown to the players only when known or revealed (V13 §3.8 (13); file w); the lenses over the host's simulated systems (V13 §5.8, §5.9); the map-import adapter and the ecosystem-shaped exports |

*Evidence:* INDEX:39.

**FI3** — `docs/volumes/INDEX.md`:222 (md5 `10a72c97f86a88533292971629c56539`; edit). The index's Q2 row counts H32.

*Current text (as it stands now):*
> | V13 | Q2 — the host's schedule (V13 §8.5's H1–H31) against M-W1 – M-W3 and M-W5, and whether the realm map's replacement is part of the map module's post-launch disposition | class it with the post-launch disposition; H1–H3 before the host's launch, H4–H11 with M-W1, H12–H17 and H22 with M-W2, H23–H30 with M-W5, H18–H20 and the optional H31 after M-W3; the standalone world ships either way (recommended; vetoable) |

*New text* (in full):
> | V13 | Q2 — the host's schedule (V13 §8.5's H1–H32) against M-W1 – M-W3 and M-W5, and whether the realm map's replacement is part of the map module's post-launch disposition | class it with the post-launch disposition; H1–H3 before the host's launch, H4–H11 with M-W1, H12–H17, H22 and H32 with M-W2, H23–H30 with M-W5, H18–H20 and the optional H31 after M-W3; the standalone world ships either way (recommended; vetoable) |

*Evidence:* INDEX:222; V13:4432, 4437.

**FS1** — `docs/volumes/SUMMARY.md`:165 (md5 `1c0ada295f24b9e22909ce86eaec2cd8`; edit). The owner's plain-language account gains one sentence on the hidden ways.

*Current text (as it stands now):*
> built, a fallback for the water model on a small crop frame, and one more M0 gate check (K14: moving a site's arena⏎into a town's document keeps every name).

*New text* (in full):
> built, a fallback for the water model on a small crop frame, and one more M0 gate check (K14: moving a site's arena
> into a town's document keeps every name). Later that day your host side asked for hidden ways — the paths brigands use
> between the roads; the answer (file w) adds them to the world as *trods*: the map lays them through rough country and
> never across open plain, shows none to the players until a town is known to use one or the game master reveals it,
> and sends your host their ground, length and junctions in the same frozen record the sites use; the word "way" stays
> the town's street.

*Evidence:* SUMMARY:163–166; HR:4, 29, 33.

---

## §3 Owner questions

Only one true owner decision stands in this design; everything else is ruled under J404's delegation and vetoable.

**Q5 (new, V13 §11; fragment F46) — the trods slot under the door-1 answer.** The design sends the host one more class
of world-scale geography — the trods with their junctions on the host's edges, ground runs, effort, gauge and width — as
a fourth slot of the world canon. The owner's "1. yes" of 2026-10-18 (file r item 926; V13:4455–4459) covered "world-scale
facts … while a town's own geometry never does" [STATED], and the request itself reads it so ("and now hidden ways",
HR:9) [STATED]; a trod never enters a settlement frame (§1.3 (c)), so no frame geometry travels with it. *Recommendation:*
confirm; the slot is built with M-W2 either way, and if withheld the trods stay the map's own (drawn and revealed as
designed) while the host's bodies keep their stand-in cover graph over `routeFacts.runs` (vetoable).

**Not owner questions, and why.** The word (`trod`) is settled here under the delegation — it is a map term, vetoable
like every J row (J-V13.114). M-W2's re-declaration at 9 pw stays inside §16's 37–45 range (V13:3818–3819) [STATED], so
no money moves. The product order is unchanged: A and C ride M-W2, where the owner's schedule question (V13 §11 Q2)
already places the host's M-W2 rows. Whether a small military unit may take a trod (HR:15 against M4's "armies may not",
FPI:159) is the host's stance rule, not a map capability — the map records no size band and prices no body.

## §4 What this design deliberately leaves out, and why

1. **A ninth lens.** The trod's line is geography, which §5.8 forbids a lens to hold ("nothing of a lens is read by a
   stage, a sway revision, an encounter or the clerk", V13:3259–3260) [STATED]; the reveal needs no regime, plate or
   scrub; and the bodies' marks over the trods are the host's embattlement system's, which D-V13.8's danger lens
   already reserves (V13:4038–4040) [STATED] — its row gains them (F43). The lenses reader's ninth-lens proposal
   (`read-v13-lenses.md` §3) is the alternative the judge may prefer; this design's J-V13.122 states the reason against
   it now.
2. **A DM-drawn trod.** The record reserves `origin: 'user'`; no `addTrod` edit is designed. The request asks for the
   map's genesis, not an authoring tool; a later item adds it under T9 `shape` with a course hint, as `WorldRoute`'s
   `user` origin exists.
3. **A per-town knowledge flag on the record, or a fourth knowledge tier.** The host prefers to send (HR:42); V13 adds
   no fourth tier (V13:960) and admits no belief into the canon (V13:2578–2579) [STATED]; J-V14.12's reason applies
   verbatim (V14:3082) [STATED].
4. **A capacity or size band.** The host asked for it derivable or recorded (HR:16); derivable is chosen (J-V13.116):
   a band is the host's law over the gauge, the width and the ground, and the map records no number it does not derive.
5. **A seat end or a gate-station end.** Door 1 (the frame's geometry) stays closed; W7 (11) lets nothing but a host
   route end at a settlement [STATED]; the junction within `gateBandM` of the margin ring, carrying `nearSeat`, gives the
   host "at its town gate" without a frame point (J-V13.116).
6. **A base change.** None: `WayClass` and `Way` are untouched; the `trods` layer is one more §5.1 row under the world
   view's layer list; the admission function reads a trod's `secret` as it reads a site's (BASE:15744) [STATED].
7. **Names from W9.** A trod takes no generated name; the DM's `setAttr` names it, and the host's prose ("the smugglers'
   way") is the host's own and never a map token.
8. **The quarantine closure element.** Waits on the host's verb (plague-R7, HRQ:481) [STATED]; the refusals stand and
   the plague lens's not-drawn list says what will be admissible then (F35; J-V13.123).
9. **Edits to the research notes and to ENC-HS-06.** `research/sf/*.md` records the host's facts as retrovalidated at
   J392; the stale T2 and R4 verdicts (FPI:394, 421) are corrected by Evidence lines and by the HOST-REQUIREMENTS
   brackets the request's own rows carry (FH4, FH5); ENC-HS-06 (HRQ:606) is named stale inside ENC-HP-09's
   bracket rather than edited, since the brief touches only the rows the request names.
10. **Text changes to W8b (16) border posts, (9) continuity, V14's hideout row, `draw.markersPerView`, the
    screen-reader summary.** None is needed: each reads routes or counts marks, and a trod is not a route and no mark;
    T-V13-59 and T-V13-60 assert that none reads a trod (the lifecycle-first bar: no existing sentence changes meaning).
11. **A trod watch on `PolityFacts.roadWatch`.** A watch on a trod is a dated host event at the trod (H9), not a
    polity-window row keyed by a host edge (V13:866) [STATED]; nothing is added to `PolityFacts`.
12. **Water trods.** Land only in this pass (`WorldTrod` has no `mode`); a smugglers' creek is a later item if the host's
    water lanes ask for it.
13. **Trods joining approach roads or sites.** An approach road is "no road to its pricing and siting" (V13:1864)
    [STATED], so a trod never ends on it; a hideout beside a trod is the DM's placement, and the hideout's
    `awayFromRoutes` counts no trod (FV2).
14. **The host's own numbers.** The host's digest cap (HRQ:840), its band for "a body of thirty", its stance rule and
    its register check (FPS:471) are the host's; the reply names the sizes (§0 Q7) and leaves the caps to it.

**Said to the host in the reply, not designed** (the host reader's corrections, `read-host.md` §5): B is largely in hand
since item 689 (Q2); detours and lived grades are mirrored through `network` (ENC-HL-10, ENC-HP-13); a body's presence
rides H17's overlay, not H23's lens window (HRQ:83, 102) [STATED]; H16 is the host's optional reads of the map's
offers, not the map's inbound door, so trod ids reach the host by the canon's slot (HRQ:576) [STATED]; no source records
a "spatialLedgers hard-deny" or a "smuggling gauntlet" (`read-host.md` F25, F18) [OBSERVED]; the recorded M4 says
"armies may not" (FPI:159) [STATED]; HOST-REQUIREMENTS' V13 line numbers for H9/H16/H23 have drifted (now V13:3884,
3891, 3898) [OBSERVED]; and §2.7's "≤ 10⁵ records … ≈ 120 B each … inside the 2 MB" (V13:1352–1354) does not add up
(12 MB) [OBSERVED arithmetic] — a housekeeping item for the synthesis, outside this request.

---

*Status:* written 2026-10-18 by hidden-ways/design-C; the fragments checked by script against the targets at the md5s
named (66 fragments: V13 49, V14 5, HOST-REQUIREMENTS 8, INDEX 3, SUMMARY 1; the base 0); nothing applied; no git run.
