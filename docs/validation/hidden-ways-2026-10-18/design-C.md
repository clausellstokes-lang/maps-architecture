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
689 [OBSERVED]; the reply corrects ENC-HP-09 (fragment F-HR-5).

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
H17 and the lens window; its row gains the trods (fragment F45). The geography and the reveal need no lens, and §5.8's
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

**Decisions J-V13.114 – J-V13.124** (the rows in full in fragment F44): the word; a record of its own; junction ends and
the town gate; the terrain-born deterministic lay with identity by seed cell and rebuild on load; the canon's trods slot
with law (1)'s clause; knowledge the host's through H9 with V14's three states for the party; no cadence on any trod;
never promoted, never born where a road dies; no ninth lens; the quarantine refusals kept; `routeFacts.runs`.

**BCRs: none.** The base's `WayClass` and `Way` are untouched (the word moves, not the class); the `trods` layer is one
more row of V13 §5.1 under the world view's layer list (BCR-V13-13's), its toggle the `patrols` toggle's mechanism; the
admission function reads a trod's `secret` through `knownTo` and the party's places as the base already reads a site's
(BASE:15744, BCR-V14-21 applied) [STATED].

