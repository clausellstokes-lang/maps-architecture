# Read — the checks, critiques and coherence records a site-road-autocorrect design must satisfy (lane `sites-roads/read-checks`, 2026-10-18, J393)

**Lane.** `sites-roads/read-checks` (Opus, high; a reader under J390: it records what the texts say and judges nothing).
**Started.** 2026-10-18 05:12 UTC. **Status.** IN PROGRESS (written as it goes).

**The owner's words (J393, verbatim):** "make sure that sites have road access where appropriate, they are integrated
into road infrastructure and that depending on the catalogue, where appropriate, their geography in the world map
autocorrects to meet the coherence expectation."

**Files read whole (line count, md5 at the moment read).** Every cite below is `file:line` against that md5.

| file | lines | md5 |
|---|---|---|
| docs/validation/sites-roads-2026-10-18/README.md | 29 | (orientation only) |
| plat/docs/build/M0-world-sites-gate.md (the gate spec; K1–K13, M1–M11) | 45 | b6c5be2a5d89fbd19035a3c606194fb9 |
| plat/docs/build/checks/M0-world-sites-gate.md (the gate's check) | 476 | 1e29aadca96f2cfcb96cdbe82c0181ef |

(the table grows as files are read; see the end of the header for the rest)

## Facts, in the order found

### A. The M0 world-sites gate (spec and check)

A1. The gate's purpose and its limit: it "asks M0 to prove that the kernel and the model do not foreclose the world,
site, encounter and hydrology work designed after M0. **No row adds a feature.**" A K row is resolved before M0 commits
or carried to M1's API pass; an M row is recorded now and is M1's to change; "Where a row can be a test, the test joins
M0's exit suite." (plat/docs/build/M0-world-sites-gate.md:4–8)

A2. "No row is closed by changing the design to match the code without a row of `plat/docs/build/choices.md`."
(plat/docs/build/M0-world-sites-gate.md:10–11)

A3. The gate has exactly 13 K rows and 11 M rows; no row names a road, a route, a seat, a site kind, travel, patrols,
or the world's placement law (V13 §3.11). Its world-facing rows are K1 (layer codes), K2 (parts), K3 (frame local),
K4 (refs carry no key), K13 (no elevation), M1 (address namespace), M6 (placement record), M7 (anchor record), M8
(reason record). (plat/docs/build/M0-world-sites-gate.md:13–45)

A4. K3: "`Frame` is purely local (origin and extents); no digest hashes an absolute position outside the frame" —
CONFIRMED: the level digest hashes layer code, part, level and frame-local lattice content, "no origin, no offset, no
position outside the frame". A world position of a settlement or site is therefore outside every arena digest today.
(plat/docs/build/M0-world-sites-gate.md:19; plat/docs/build/checks/M0-world-sites-gate.md:90–98)

A5. M6: "A placement record (origin, bearing) can be reserved per arena set without touching any arena digest" —
CONFIRMED (kernel) / PLAUSIBLE (model): "the placement record is a new kind under a new or existing layer node,
reservable at M1, and it moves no arena digest; it moves the model root (every new kind does)." The model digest's
eleven layer nodes are `site … plats`, "no `world`"; the record-kind registry "is M1's". (spec:40;
check:332–341, 431)

A6. M1: FAIL by design, carried-to-M1: an address is `[prefix]kind:token` with an arena prefix only; the lineage key's
ten lanes have "no document or world lane. So two documents generated from one seed mint identical lineage hashes and
identical addresses: a world of sites cannot tell `way:…` of one document from the same of another by its address."
Smallest addition: an optional leading document segment in the grammar, and either a `doc` lane appended to the
lineage key (10 → 11, "a declared shift, §6.4") or the seed key salted by the document id ("no address of an existing
document moves"). The ground part's absence from the address (`mint.ts:149`) "is a second thing an anchor across
documents must not rely on (M7)". (check:259–278, 426)

A7. M7: an anchor record `{ address, document: DocRef, knowledge }` is reservable at M1 under the `identity` layer;
"its `address` field cannot rely on the address alone across documents until M1 adds the namespace". PLAUSIBLE.
(check:343–352, 432)

A8. M8 / K12: a reason record per generated fact is reservable (CONFIRMED, model side) on the `DerivationRecord` path
("outside the model digest, inside the records digest"); "Its kernel half is K12's": `CommitRecord` carries no
`stage`, `batch`, concern or reads — FAIL, carried-to-M1, smallest addition `stage`, `batch` copied at `tx.ts:629`
and `reads: GeomRef[]`. (check:221–236, 354–361, 424, 433)

A9. M9's gap list: `way`, `junction` are "flat on the terrain surface, by design; `Way.raised?: RaisedWayRecord`
(staged M3a) carries the raised case"; `bridge` has "no deck height" at M0 (`deckCm?` set by S7, M1). (check:368–385)

A10. K1: the `Layer` union is closed (`'underground' | 'ground' | 'sky'`); "Widening the `Layer` union itself is the
exported-type change of the milestone that designs the world layer (M1 or later), to be taken with a choices row."
(check:40–70)

A11. K2 / K4: parts are independent frames, not dense from 0; every reference form resolves against a separately
supplied `PlatKey`, none embeds one (CONFIRMED, tested). (check:72–109)

A12. K13: "No digest, reference form, invariant or kernel operation reads or assumes an elevation; `Frame` and the
lattice are two-dimensional only" — CONFIRMED by a lint test. (spec:29; check:238–253)

A13. K10 (FAIL, carried-to-M1): the M1 manifest is to name `ENGINE_VERSION`, the block format, the role, stage (with
the rank table) and concern registry versions. (check:183–199)

A14. The check's design reading was "named sections only" of ARCHITECTURE.md (§3.4, §2.6, §2.9, §8.2, §8.4); it read
no V13 or V14 text. Its verdict: "the gate holds with these rows carried to M1: K10, K12, M1, M2, M4 (K11 is a
documentation row fixable in M0; K7, M3, M5, M6, M7, M9, M10, M11 are recorded as M1's by design, nothing
foreclosed)." Signed L-0558. (check:14–17, 30–34, 471–476)

A15. The gate has no T- rows (the "T-" rows the brief names are not in either gate file; see section H for where they
were looked for). (spec:1–45; check:1–476)

### B. The V13 critique (docs/volumes/critique/V13.md, 953 lines, md5 66e13f1cca877af83370cebbd01b8735)

Line numbers inside quotes ("l. nnn") are the volume's at the critique's time, not today's; the critique's own lines are
the cites.

B1. C13-01 (blocker, FIXED): a placement must change no frame model digest — `Terrain.datumCm` and `Terrain.wind` stay
what S1 wrote; `datumOf`, `windOf`, `sunAt` are derived through `worldRef` at call time; "§3.0's list of what P1–P5
write in the frame shrinks to `Document.worldRef`"; T-V13-2 asserts the frame's model digest byte-equal before and after
every placement edit, only the records digest differs; a latitude difference is a `PlacementAnomaly` kind `sunDiffers`.
(docs/volumes/critique/V13.md:58–78, 879)

B2. C13-02 (blocker, FIXED): item 138 (c)'s "eighteen stale-data paths" are the survey's model-drift rows, among them
"burg relocation not re-routing roads" and "route removal not re-routing journeys"; "Twelve of the eighteen are not
water paths at all (roads after a seat moves, … routes after a route is removed …)"; the fix makes §3.14.3 a table
(drift row → equivalent edit, e.g. "a `setPlacement` of a seat", "a `delete` of a route", "a `setSeats`" → the
cascade "W7's re-cost") and T-V13-21 one test per row. (V13.md:80–102, 880)

B3. C13-03 (blocker, FIXED): a settlement-first placement must not write a charter S1 reads on the frame's next
regenerate: `Recipe.charter` holds only a `source: 'world'` charter; a settlement-first charter lives in the world's
`Placement.charter` alone, read through `worldRef` as a derived reading; T-V13-13: on a settlement-first placed frame
Regenerate (keep settings) is byte-identical to before placement. (V13.md:104–119, 881)

B4. C13-04 (blocker, FIXED): the world-first flow gained `requestCharter { world; subject: { kind: 'frame'; pending } |
{ kind: 'site'; site }; originCm; bearingCdeg; frame }` — a site is a placement subject; in world-first mode P1 is not
run and `CoherenceCost` is `{ total: 0, terms: [], lawful: true }` with `detail: 'world-first'`; `bindPlacement`.
(V13.md:121–139, 882)

B5. C13-05 (blocker, FIXED by building): item 135 (c) "resolution is added deterministically from the coarse fact,
position and seed, so neighbouring frames agree at a shared edge unseen" — S1's lattice position-keyed on the world seed
(`H(worldSeed, opIx, worldX, worldY)`), margins may overlap (extents never). (V13.md:141–158, 883, 945)

B6. C13-08 (blocker, FIXED, decided): on a dossier-bound frame every DR1 and DR29 fact (`site.terrain`, `site.access`,
water deposits, latitude) is "a hard constraint on the placement" — the coherence cost gains a `dossier` term (weight ∞),
`nearestLawful` searches under it, the charter refuses (`refuse.charter.dossier`) naming the fact and the nearest lawful
origin; the charter "fills only `map`-tier inputs". The proposed owner question (who yields) was ruled INVALID: item 20
(h) decides it; recorded J-V13.50, vetoable. (V13.md:200–216, 886, 944)

B7. C13-19 (major, FIXED): V14's `SitePurposeWeightRow` weights seventeen terms including `roadControl`, `routeNear`,
`oneApproach`, `solitude`, `settlementNear`/`Far`, with `hard` terms whose zero refuses a candidate and "the one
controlled random term V13's score admits drawn on `site`"; "V13's score admits no random term (tie-breaks only)". The
required change declares `SuitabilityTerm`, `SuitabilityContext` (rasters, distance fields, reaches, **routes**,
placements, sites), formulas own (`roadControl` = 1 − distToRoute ÷ 2 km), `score(cell, weights, hard?, jitter?: {
stream; amplitude })` "with the jitter drawn on `world.siting` keyed by the caller's key", `site` renamed `destination`.
Disposition FIXED; R-V14-3 "G3 calls `score(cell, ctx, weights, hard, jitter)` … the one jitter term named by V14".
(V13.md:323–340, 897, 949–950) — a reader's note, not a ruling: this jitter term stands against the brief's
determinism rule as quoted for J393 ("no random or jitter term"); see the gap list.

B8. C13-22 (major, FIXED): host demand proposals are transient (never persisted) or a `propose` event; a port call is
no log event. (V13.md:362–369, 900)

B9. C13-25 (major, FIXED): the owner's correction (3) admits only two ways to change the settlement — `mirrorFrame`
(warned) and `worldWins`; "unlock and re-derive" became the scoped `worldWins { placement; ids }`, "so the owner's two
verbs stay the only two". (V13.md:391–396, 903)

B10. C13-26 (major, FIXED): `coastSide` raw costs 0 / 2 / 3 so any coast error is unlawful at weight 3; T-V13-23
asserts no placement with a coast-side error is ever `lawful`. (V13.md:398–402, 904) — the precedent: a lawful
threshold must make every wrong-side error unlawful.

B11. C13-27 (major, FIXED): P1–P5 are §7.3 local operators of the placement edits under one stage id `WORLD_PLACE`, not
stages `generate` runs. (V13.md:404–411, 905)

B12. C13-33 (major, FIXED): W6 and W7 read each other (W6's stage 2 after W7 ran over stage-1 candidates "W7 treats
them as seats"); split into W6a, W7a, W6b, W7b. (V13.md:464–469, 911)

B13. C13-36 (major, FIXED): W7 "one Dijkstra run … from its lower seat to its higher over the cost surface" per
Urquhart edge is unbounded; fix A\* with the straight-line cost at `landBase` as heuristic, "deterministic with the
(cost × 1 000, cell index) tie rule", or a cost ellipse bounded by `maxCostFactor`; SP-W7. (V13.md:493–502, 914)

B14. C13-37 (major, FIXED): `nearestLawful` as a two-tier search — coarse pass 36 bearings and the two decisive terms
(`coastSide`, `riverCrossing`) over 100 stations, the three best pairs take all six terms at 1° and 400 stations.
(V13.md:504–510, 915)

B15. C13-30 (major, FIXED by BCR-V13-28): the world's kinds — among them `WorldRoute`, `SitingProposal`, `Placement` —
need §2.8 registry rows and §6.3 anchor rows; lineage units `seat` and `placement`. (V13.md:433–441, 908)

B16. C13-31 (major, FIXED): every calibratable constant has a table home in §2.3, including `routeToleranceM`,
`maxCostFactor` (§3.8), `siteReachKm`, `coastSearchM`, `riverMatchM`; "V12 §3.11's lint refuses a provisional number
outside the register". (V13.md:443–453, 909)

B17. C13-32 (major, FIXED): the `route` layer per cell (`routes: Map<number, Id[]>`) and the `landmass` index (read by
W7 and W8) must be declared with §2.6 rows (persist, regenerate, migrate). (V13.md:455–462, 910)

B18. C13-44 (minor, FIXED): W7 used primitives attributed to the kernel ("the kernel's Douglas–Peucker" for routes;
"the kernel's bucket queue"); fixed as `@plat/world`'s own (Visvalingam for routes) "so no kernel change is needed".
(V13.md:569–576, 922)

B19. C13-51 (minor, FIXED): the survey's KEEP sea-route rules (a mandatory trunk to the main landmass, the gap fix at a
cost ratio, cabotage) and the two-ports rule added to W6 (3) and W7 (3) as own constants in `world.routes`; "no
randomness in comparators" lint added to T-V13-1. (V13.md:626–635, 929)

B20. C13-53 (minor, FIXED): `W_ROUTE_NO_PATH` and `W_POLITY_SEAT_MOVED` must be named at their emitting sentences;
refusals are `refuse.*` outcome keys (e.g. `refuse.place.fit`), `ReportCode` untouched. (V13.md:643–650, 931)

B21. C13-55 (minor, FIXED): a placement is always `happened` (verb ignored); its `oldGround` trace covers extent +
margin + band. (V13.md:658–663, 933)

B22. C13-58 (minor, FIXED): the cascade's step 5 must include "every site document whose anchor or placement lies in
the dirty set: V14's G6 and the site's lifecycle". (V13.md:677–681, 936)

B23. Owner-rule fidelity rows a site-road rule touches: item 134 (c) "a site enters the siting score as a destination"
— held; item 135 (b) the charter's rows include "roads" — "every row present"; the settlement-first correction (1) "the
world autocorrects to the bare coherent minimum (blend band, local drainage re-run, coherence cost reported, nearest
lawful placement offered)" — held; correction (3) "resolved by the bearing first, the world's blend second, and the
settlement never unless the DM explicitly chooses mirror (warned) or the world-wins verb". (V13.md:705, 707, 727, 729)

B24. Determinism audit: "every world draw is on a registered concern with a stated key (… `world.siting` by cell pair
…), every queue is keyed on (cost × 1 000 rounded, cell index), every raster pass is row-major, every transcendental
goes through `dmath`". (V13.md:811–814)

B25. The seam with V14 is "otherwise clean"; what V14 needs and V13 did not give: C13-19, C13-20 and "C13-04's charter
for a free-standing site frame (V14 §3.4 (c) asks for 'V13's frame limits' … add `frame.maxCm` per rung to
`WorldSizeRow`)". (V13.md:785–788)

B26. Cross-volume requests to V14 from Revision 1: "R-V14-1 `WorldSite` positions with `attraction` and `routed`";
R-V14-2 the `SiteAnchor` resolved by the namespace segment; R-V14-3 (above); R-V14-6 every V14 stage writes the one
`ReasonRecord`; R-V14-8 a site's glyph marks through `glyphOf`/`world.glyph`. (V13.md:948–953)

B27. Disposition counts: 55 FIXED, 3 INVALID, 2 FIX-LIST (C13-56, C13-60 (f)). (V13.md:873–875, 934, 938)

### C. The V14 critique (docs/volumes/critique/V14.md, 908 lines, md5 3e1978b9b682798151fbe630d6a20f8f)

C1. C14-01 (blocker, FIXED): one ground has one owner — a `free` site is never admitted inside a settlement's frame;
inside a frame a kind with a ground policy takes the attachment `inFrame` ("adoption at the drop": its envelope a
`Reservation` of kind `worldSite` on the hinterland faces, G5 (e) on the host's ground part 0, the host's S12a fields
re-derived locally round the reservation); `hinterlandFar`'s `free` admitted only where the click lies outside every
settlement frame (then `country`); J-V14.41. (docs/volumes/critique/V14.md:58–86, 849) — the attachment set an access
class per kind must cover: `attached`, `inFrame`, `surface`, `free`, `ground` (attached-on-ground, C14-09).

C2. C14-04 (blocker, FIXED): the seventeen purpose-weight terms are V14's own `SuitabilityTerm` plug-ins registered with
V13's `SuitabilityScore`; "`routeNear`, `roadControl` from the `route` layer's distance (and a crossing count)";
"`solitude` the product of `settlementFar` and `routeNear`'s inverse"; "Strike the random term; the `siting` draw becomes
the tie-break among equal candidates"; "Replace the pull-class table with two kind-row columns, `attraction: number`
(0–1, own) and `routed: boolean`, carried on the card (`WorldSite.attraction`, `.routed`) and read by V13's `site` term
and W7; the reach is V13's `siteReachKm`, not `edge.farM`"; BCR-V14-13's `Destination` kept "only for S4 after adoption
(the fort's gate as a frame-scale destination)". J-V14.43. (V14.md:129–155, 852)

C3. C14-04's finding text: V13 §3.8 (1) seats "V14's world sites flagged `routed` (V14 G1)"; V14 had "no `routed`
flag (its route rule is 'when its pull class is `market` or `protection`')". (V14.md:139–141) — the provenance of the
`routed` column the J393 README names.

C4. C14-08 (blocker, FIXED): the world-map crop materializes a **crop frame** — "V13's charter at a transient placement
at the clicked point … with a 100 m frame and no settlement), S1's terrain and water under it, **the charter's `roads` as
way bands of their class**, S12a's land use … on an owner-less transient arena keyed by the address, never persisted";
routed to V13 as `charterFor(world, placement)` "for a non-settlement transient placement that records no `Placement`".
J-V14.44. (V14.md:221–235, 833, 856)

C5. C14-15 (major, FIXED): moving a free-standing site is V13's `setPlacement`/`placeFrame`/`unplaceFrame` with a site
subject (no event in the site document): "every arena of the site byte-identical; its charter marked stale (V13's stamp
rule), `worldWins` the DM's explicit re-derive from S1 with carry-over; the hinterland decoration, the world glyph
(C14-53) and **V13's W6/W7 re-run**; the card's `context` re-read (`country` ↔ `hinterlandFar` ↔ adoption by C14-01's
rule when the new placement lies inside a frame)"; T-V14-25 gains "a moved site's per-part digests unchanged".
(V14.md:323–333, 839, 863)

C6. C14-16 (major, FIXED): adoption at a host-founded settlement enters the site's enclosure, buildings, plots, **ways**
and terrain pre-edit as §7.2 **drawn constraints**, locked and pinned, keyed by the site's tokens; the envelope is the
`worldSite` reservation; the settlement's S1 runs under the settlement's charter. (V14.md:335–349, 864)

C7. C14-11 (major, FIXED): an attached site document's `Frame` is the host's frame (same centre); "K3 holds: the frame
is local, no absolute position in any digest"; the card records `frameDigest`; "A free-standing site's frame is G3
(c)'s." (V14.md:265–274, 859)

C8. C14-12 (major, FIXED): the clock of a site: attached, `inFrame` or adopted reads its host's week; "a free-standing
site placed in a world reads the world document's campaign week"; standalone its own. (V14.md:276–286, 860)

C9. C14-03 (blocker, FIXED by (b)): every G2–G8 product on a card is **derived**, rebuilt on open; "only `dropSite`,
`setSiteRequest`, the conversions and `moveAnchor` move the host's digest"; T-V14-31 "opening and closing every B-SITE
card changes no host digest, log or arena"; J-V14.42. (V14.md:109–127, 851)

C10. C14-22 (major, FIXED): every id that names an entity of another document is written whole with that document's
namespace (`<ns>:site2/unit:k`); adoption rewrites the segment. (V14.md:406–416, 870)

C11. C14-48 (minor, FIXED): G1's rules: `country` = "beyond `farM` **inside** a frame"; "strike 'or outside the frame …'".
(V14.md:601–604, 896) — the context words a per-kind access rule reads (`world`, `country`, `hinterlandNear`,
`hinterlandFar`, `urbanSurface`, `urbanBelow`, `urbanInside`, `urbanSky`).

C12. C14-53 (minor, FIXED): a free-standing site's world glyph is a `SettlementGlyph`-shaped record by W9's hook (level 0
the kind's glyph as a dot, level 2 the envelope's outline and enclosure); routed to V13. (V14.md:625–629, 837, 901)

C13. C14-21 (major, FIXED): E3 reads `routeClass` over the crop's ways; the VTT export writes `plat.difficultTerrain`.
(V14.md:393–404, 869)

C14. C14-09 (major, FIXED): `camp`, `battlefield`, `graveyard` admitted in every ground context with the attachment
`attached`-on-ground (`ground`): "the anchor on a ground face …, no site document unless the request later asks for
levels or buildings (then C14-01's `inFrame`)". (V14.md:239–252, 857)

C15. Owner-rule rows a site-road rule touches: 132 (e) "a place clicked such as on the road or wilderness from the world
map … terrain, biome, recent battle" — "the context is read; the crop's ground has no materializer (C14-08)"; 134 (a)
"filter out of the selection what is possible in urban vs country"; the edge by distance from the enclosure; 134 (c)
"prime locations for a new settlement … a thorpe … in front of or surrounding an abandoned or occupied fort" — "the terms
and the attraction do not meet V13 (C14-04); the merge has no mechanism (C14-16)"; 135 (a)–(e) — "a `free` site in a
frame breaks (a) (C14-01); the world crop breaks (c) (C14-08)". (V14.md:664, 676, 678, 680)

C16. Determinism: "every draw is on a registered concern (`site` by BCR-V14-14, … `siting`, …), each keyed by the
card's lineage …; every loop runs in address order; the site pipeline is serial; the view keys never enter a digest";
"G3's 'controlled random term V13's score admits' is V14's own draw (C14-04)". (V14.md:757–765)

C17. Routed to V13 (§6): C14-04 (plug-in inputs; `site` term reads `WorldSite.attraction`, W7 reads `WorldSite.routed`
from the card — V13 §1b.2, §3.7 (1), §3.8 (1)); C14-08 (`charterFor`); C14-15 shared (`setPlacement` with a `site`
subject leaves the site's arenas byte-identical, charter stale). (V14.md:830–839)

C18. Disposition: 58 FIXED, 0 INVALID, 0 FIX-LIST; V13-routed findings "designed on V14's side as if granted, with the
precise request in V14 §10.2's V13 row". (V14.md:841–845, 908)

### D. The seam check V13 ↔ V14, round 0 (docs/volumes/critique/seam-world-sites-r0.md, 699 lines, md5 8eceb066ad1f02de4e2b5fe16d85f230)

The file holds findings and required changes; it carries no disposition table of its own (its §3 is "disposition by
owning unit", i.e. who owns each finding). (seam-world-sites-r0.md:677–699)

D1. Census row 4: "`WorldSite.attraction`, `.routed` read by W6 and W7" — producer V14 §2.2, §2.5's columns, §3.4 (d);
consumer V13 §3.7 (1), §3.8 (1) ("flagged `routed` (V14 G1)"), R-V14-1 (`WorldSite { at; attraction; routed }`) —
"wired; SW-20". (seam-world-sites-r0.md:49)

D2. Census row 13: "`setPlacement` / `placeFrame` / `unplaceFrame` with a `site` subject; `worldWins` on a site" —
"compatible; the site rows missing: SW-19". Row 18: "`charter.sites` as drawn constraints; adoption's trigger" — SW-10.
Row 36: "W7's Urquhart graph through the kernel's `delaunay` over world cm" — SW-16. (seam:58, 63, 81)

D3. SW-01 (blocker): the seventeen siting terms defined twice; required change: "V14 owns the seventeen plug-ins" —
V13's registry holds V13's eight; V14 registers through `terms.register(term: SuitabilityTerm)`; `SuitabilityContext`
gains `territories` and `wetStage(reach)`; "The term is `site` everywhere" (the reach cell `reach.siteKm`), "the word
*destination* stays prose for item 134 (c)". (seam:94–130) — one word, one meaning: the world-site pull term is `site`.

D4. SW-03 (major): "The score has no random term for a site (derive before invent, item 132 (g))": V13 §3.7, BCR-V13-8's
`world.siting` row and R-V14-3 drop the V14 jitter clause ("the `jitter?` argument stays for the host's `proposals`, or is
removed"); V14: "equal candidates are tie-broken by V14's one draw on `site` keyed by (the card, `siting`), outside the
score; W6's own tie-break (V13 §3.7 (6)) is W6's". (seam:155–173)

D5. SW-05 (major): the pure `charterFor(world, pl: Placement | TransientPlacement)` with `TransientPlacement { originCm;
bearingCdeg: 0; mirrored: false; frame }` "writes no record, no event, no blend, no glyph and no reason record (a view
read, as `worldFactsAt` is)"; ≤ 10 ms (`WORLD-9`); R-V14-9. (seam:193–209)

D6. SW-07 (major): item 132 (e)'s "recent battle" has no producer; V13 gains `WorldEvent { id; kind; at: WorldPointCm;
radiusM; week; source: 'host'|'user'; detail?; reason }` written by a `WorldPort` `events(...)` call or an `addEvent` edit;
`worldFactsAt(world, wCm, sinceWeek?)`. (seam:231–249)

D7. SW-08 (major): a free site's world glyph is made by the site document's own commit hook (`glyphOf` in
`@plat/sites`), posted as `world.glyph`; V13 places it; `SettlementGlyph` gains `subject: 'frame'|'site'`. (seam:251–268)

D8. SW-10 (major): adoption's trigger is V14's own: a `beforeS0` hook on `generate` when `Recipe.charter.sites` is
non-empty; "a `bindPlacement` or `setPlacement` whose new extent covers a free site's placement … posts `world.placed {
placement }`, which `@plat/sites` answers with `adoptSite`"; V13 §3.11's edges gain "two placements whose extents overlap
where one subject is a `site`: admitted, `world.placed` posted (V14 adopts)" in place of the refusal. (seam:283–302)

D9. SW-11 (major): `WorldSite.placement` becomes a reference `{ world: Uuid; placement: Id }` in the derived block;
"every reader … reads the `Placement` through the world document"; T-V14-25 gains "the site document's model digest
byte-equal across V13's `setPlacement` (T-V13-2's bar on a site subject)". (seam:304–320)

D10. SW-12 (major): the world point is `WorldPointCm` (integer world cm, V13 §2.1, J-V13.2) everywhere; "A double in
metres keyed into an `EncounterAddress` also breaks T-V14-1's byte-identity across engines". (seam:322–334)

D11. SW-16 (major): W7's `delaunay` over world cm lies outside the kernel's range invariant |x|, |y| < 2²³ cm (§3.2 (1));
fix: "the seats' positions are handed to the kernel's `delaunay` in **integer metres** (`originCm ÷ 100`, rounded …); no
world cm reaches a kernel predicate"; T-V13-39 gains a lint on the call; "No kernel request follows." (seam:396–411) — a
road-integration rule that hands sites to W7's triangulation inherits this.

D12. SW-19 (minor): V13 §3.11's opening gains "A `Placement` whose subject is a site (V14 §3.4 (a)) takes the site
document as the frame through every edit below"; §4.3 gains "`setPlacement` (origin) of a world-first placement | P4
(the charter re-emitted, marked stale on the frame) → P5 → W9 → W7–W8 over the landmass"; "on a site subject the
re-derivation is V14's G5 (f) re-materialization under the new charter with §6.3's carry-over"; R-V14-11.
(seam:437–452)

D13. SW-20 (minor): R-V14-1 reads "every `Placement` with a `site` subject gives the site's `at` (`originCm`); its card's
`attraction` and `routed` are read through `@plat/api`'s resolver from the site document (V14 §2.2), cached per
(placement, the card's digest)"; "(d) V13 §3.8 (1): 'V14's world sites flagged `routed` (V14 G1)' — the flag is the kind
row's column copied at the drop (V14 §3.4 (d)), not G1's" → "flagged `routed` on the card (V14 §2.5's kind row)"; a
`SiteAnchor` exists only for an attached site; a free-standing site has a `Placement`. (seam:454–467)

D14. SW-32 (minor): "a caller's score pass (V14's G3, the host's `proposals`) ≤ W6a's law over the disc asked (≤ 230 ms
over a continent, ≤ 30 ms over a 100 km disc; `WORLD-10`)". (seam:600–610)

D15. SW-33 (minor): bar 1 ("A fourth `Layer`, a new role, concern and stage appended; every existing digest
byte-identical") gets T-V14-32 in V14 §7; split bars 7, 8, 10, 12 each get one owner row. (seam:612–626)

D16. SW-34 (minor): the naming hazard — "The base's word is never redefined. The owner's things are **world sites** in
prose and `WorldSite*` in records"; the bare `site` names V14's things only as a `Layer` value, a `Recipe.product`, the
`site` concern, an `AccessPoint.source`, an `AccessCause.rule` and the address prefix `site<n>/`. (seam:628–645) — binding
on any new word a site-road rule coins.

D17. Question (9), item 140's gate: "**no request lies beyond K1–K13 and M1–M11**; one *use* of the kernel does (SW-16 …),
fixed without a kernel row". (seam:689)

D18. Counts: 37 findings (1 blocker, 15 major, 21 minor). (seam:698–699)

### E. The V13/V14 integration record (docs/volumes/_integrate-world-sites.md, 260 lines, md5 8f380cf94a35fd5f12943e3d9b08ba13)

E1. SW-01 resolved: "V13 owns `SuitabilityTerm`, `SuitabilityContext` (with `territories`, `wetStage`), `terms.register`,
`score` and eight generic terms; V14 defines its seventeen plug-ins once and **names the term `destination`** with
`reach.siteKm`"; T-V14-8 "now `destination`". (docs/volumes/_integrate-world-sites.md:42, 160) — a reader's note: the
seam's required change said "The term is `site` everywhere" (seam:125); the landed word is `destination`. Which word
stands today is for read-v13/read-v14 to record; a site-road rule must use the one word the volumes now use.

E2. SW-03 resolved: "No random or jitter term; one deterministic tie-break (V13 §3.7 (6))"; V14 §3.15 "G3 nothing (no
random or jitter term …; SW-03)"; T-V14-8 "two runs are bit-identical". (_integrate:44, 159–160) — supersedes B7's
jitter clause.

E3. SW-10 resolved: "V13 calls nothing of V14; the application raises `adoptSite` on `world.placed`" (J-V13.59,
J-V14.52). (_integrate:51)

E4. SW-11 resolved: the card's `placementRef`; after adoption "`placementRef` now the settlement's `worldRef` (the site's
`Placement` folded into the settlement's, V13 §2.6)". (_integrate:52, 162)

E5. SW-12 resolved: "integer `WorldPointCm` everywhere; no `xM` or metre point remains (grepped)". (_integrate:53)

E6. SW-16 resolved: "integer metres into `delaunay`, inside §3.2 (1)'s range" (V13 §2.1, §3.8 (3), T-V13-39).
(_integrate:57)

E7. SW-19 resolved: "`worldWins` on a site is V14's re-materialization" (V13 §3.11 a site subject, §4.3 rows,
R-V14-11; V14 §3.4 (a)). (_integrate:60)

E8. SW-20 resolved: V13 reads `attraction`/`routed` "through the resolver (its side)"; "a free site has a `Placement` and
a `placementRef`, not an anchor". R-V14-1 honoured: V14 §2.2 `attraction`, `routed`; §2.5's columns; §3.4 (d).
(_integrate:61, 84)

E9. The one open mechanism issue R1-1 (SW-04, R-V14-5, V14 §10.2 (13)): the import's markers — V13 writes
`SitingProposal`s with `demand: 'import'` handed to G1; V14 has V13's adapter raise one declared `dropSite` per marker.
Recommendation (vetoable): V13's reading — "nothing is dropped until the DM accepts one", "V13 §2.8's rule that no
import fact is trusted as an input (J-V13.48) extends to a card". Owner of the change: V14. (_integrate:119–140) — an
imported site candidate's road access is downstream of this open item.

E10. Gate rows (item 140) mapped to file k: "K1 → 601; K5 → 602; K6 → 611, 615; K9 → 609; M1 → 616; M2, M3, M4 → 603,
605; M5 → 608, 610; M6 → 607, 608; M7 → 606; M8 → 607; M9 → 607, 622; M10 → 606, 636; M11 → 608, 625. No request touches
K2, K3, K4, K8, K11, K13; K7, K10 and K12 are held". (_integrate:192–194)

E11. File k (items 600–647) carries all 54 requests (BCR-V13-1 – 29, BCR-V14-1 – 25), "NOT applied: the coherence pass
applies them after files f, g and j"; labels BASE (M1's API pass for the gate's reservations) or STAGED (M-W0h,
M-W0 – M-W4; M-ENC, M-SITE-A, M-SITE-F, M-25D). (_integrate:172–198)

E12. Clean-room: no identifier of the reference generator or of any surveyed tool used as a mechanism; the reference's
burg/pack/repack vocabulary grepped out. (_integrate:207–231) — binding on words a site-road rule coins.

### F. The application of file k to the base and volumes (docs/validation/coherence/world-sites-k.md, 127 lines, md5 9500e2f16348210b588c9bddda48463e)

F1. Item 604: `Reservation.kind` gains `'worldSite'` (claimed first as the castle's; the pre-edit as drawn constraints;
the `inFrame` drop by §7.3's reservation operator; V14 §2.5, §3.9 (e) (1), (g); C14-16) with `site?: Id`.
(docs/validation/coherence/world-sites-k.md:23) — the frame-side footprint a site-road rule's in-frame access meets.

F2. Item 611: `Destination.kind` admits `'worldSite'` "for S4 after adoption only (C14-04)"; the merged products union
`'base' | 'village' | 'world' | 'site'`, "the world product's W0–W9 with `txForm: 'records'`, P1–P5 as §7.3 operators,
the `site` product by `@plat/sites`, never by population". (world-sites-k.md:38) — the one base hook by which S4's
streets reach a site (after adoption only).

F3. Item 615: concern rows `world.recipe`, `world.climate`, `world.resources`, "the reserved ids `world.siting` /
`world.polity` / `place.search`", `site`; stage ids `W0` … `W9` (with `W6a`, `W6b`, `W7a`, `W7b`), `WORLD_PLACE`,
`WORLD_CASCADE`, `G1` … `G8`, `E1` … `E4`, `R1` … `R4`, "no `P1` … `P5`"; the town-level draws sentence (terrain noise on
a standalone frame; the position-keyed lattice on a placed frame). (world-sites-k.md:43) — a new placement or road step
appends ids; the K6 append-only rule binds it.

F4. Item 616: the namespace segment text in §6.3 and six anchor rows after `portal`: "reach, territory, placement, water
surface, **world route**, the card and anchor with V14 §2.8's lineage parents". (world-sites-k.md:44) — a world route
has a §6.3 anchor row (identity across re-derivation).

F5. Item 617: `EditBase.author` gains `'world'`; `verb?: 'happened'|'alwaysSo'`; the world's, site's and `raiseLower`
edit kinds enter §7.1 "by citation (V13 §4.1, V14 §4.2, §4.6)"; outcome keys as `refuse.*` / `bend.*`; `ConflictAction`
gains four kinds with `offer?`. (world-sites-k.md:45, 125 (a))

F6. Item 618: §7.3's effective-scope table gains BCR-V13-10's two rows "(the cascade's; the placement's)"; "V14 §4.7's
rows read them and add none". (world-sites-k.md:46)

F7. Item 619: §7.4's *Sessions* bullet names "the second reserved session `world:place` beside `host:port`".
(world-sites-k.md:47)

F8. Item 621: BCR-V13-11's world-port paragraph "(the seven methods, bar 9, `clock`, the M-W1 / M-W2 split)" in §7.7.
Item 643: V08 §2.2's world port messages "host → PLAT `world.seats`, `world.costLaw`, `world.events`, the view command
`world.clock`; PLAT → host `world.derivedFacts`, `world.charter`, `world.proposals`, `world.routes`".
(world-sites-k.md:49, 96) — on a host-bound world the host supplies seats and the cost law; PLAT returns routes.

F9. Item 632: the budget register gains `WORLD-1` … `WORLD-10` and `R12-V14-1` … `R12-V14-6`. (world-sites-k.md:69) — a
new placement step's cost has a register home.

F10. Item 642: V07 §3.2 gains "A world site under the village" (the `worldSite` reservation read as a castle's; "the
thorp over a fort, V14 §3.9 (f)"). (world-sites-k.md:95)

F11. Item 612: §5.2's staged classes gain `F-WORLD, F-GW, F-PLACE† [V13 §3.16]` and `F-SITE† [V14 §3.14]`.
(world-sites-k.md:41) — the failure-class homes a site-road refusal would join.

F12. Closing: 48 of 48 applied; "Open issue carried, not decided: R1-1 (the import's markers) … item 621's `WorldPort`
was applied as written (the adapter writes no event into the world document)". (world-sites-k.md:117, 127)

### G. The VTT and Q4 coherence records

**docs/validation/coherence/vtt-l.md (59 lines, md5 0d45ae01e2745e4ff282032c09d63edd).**

G1. File l (items 648–658) touches only §11.1's `.dd2vtt` profile and V14 §1b.4, §5.3, T-V14-11, §12: no road, route,
placement or site-siting text. The one way-related item: 652, "*Per raised way*": "a deck as one more `Level`
(`elevation.bottom` the mean deck elevation, …)". (docs/validation/coherence/vtt-l.md:26–41, 32) — nothing here a
site-road rule must satisfy beyond the crop export it already reads.

**docs/validation/coherence/q4-r.md (95 lines, md5 56ac0ea3f9c683e0a5d92b2b49ad07b4).**

G2. File r item 926 (the owner's "1. yes" to V13 §11 Q4): "the canon outside door 1, door 1 itself closed, H5 lit on
M-W1 alone, H22's birth canon no longer gated by Q4 with its own prerequisites (H5, H7, H8, H12) and the host's schedule
(Q2) still applying, the answer the owner's own word under base §11.4 and not a session ruling". (q4-r.md:18–22)

G3. Base §11.4 as checked: "door 1 'stays closed … opens only on the owner's explicit word'"; "the fifth door's canon
'outside J86's door 1 by the owner's word of 2026-10-18 (V13 §11 Q4; file r item 926), door 1 itself staying closed …,
so the host may light its builder over the canon (V13 §8.5's H5)'". (q4-r.md:66) — the world canon (routes, placements,
site positions included) may reach the host's simulation; a settlement frame's geometry may not.

G4. V13 §5.8 (2), §5.9: "the uncanonized regimes gate on the host's canon marker, no sentence waits on Q4". (q4-r.md:55)

G5. Verdict PASS, 20 of 20 fragments in place. (q4-r.md:10, 35)

### H. The retrovalidation records (docs/validation/retrovalidation-2026-10-18/)

The grep (`\bsites?\b|\broutes?\b|\broads?\b|placement|patrol`, case-insensitive) matches every one of the 49 files in
the folder; md5s of all 49 at read time are in the scratchpad (`sites-roads/retro-md5.txt`). STATUS.md's hits are lane
names only (`sites-roads/session`, the records list) and carry no fact (STATUS.md:1–34, read whole).

**H.1 rulings.md (106 lines, md5 below in the header table).**

H1. J378.5 UPHELD: "Patrols are derived per address and week from enforcement, neighbour hostility and **route class**,
drawn as a layer, read by encounters, offered to the host as coverage **per route segment** and consumed only by the
host's choice" — "chose a derived cadence on a fixed phase per (segment, power) over a roll or a host body because the
host has no patrol producer today … and a cadence sent as a time would be a sixth distance price (J-RR.54; V13 §3.9
(14), J-V13.66)"; enforcement input restored as `forceShift` (J-V13.97). (docs/validation/retrovalidation-2026-10-18/
rulings.md:54) — patrols key on route segments; a site joined to a route by a new segment acquires a patrol cadence.

H2. J379.2 UPHELD: "One LENS mechanism (a derived layer with legend, audience filter and time scrub) shared by territory,
patrols, religion and later culture, trade and danger" (V13 §5.8, J-V13.87). (rulings.md:56)

H3. J377(b).6 UPHELD: "Unclaimed land stays wild; occupied forts are claim points; armies contest but do not own" — "a
held point is a garrisoned site" (V13 §3.9 (10)–(11), J-RR.52). (rulings.md:48) — a fort site's role in the sway is a
claim point.

H4. J377(b).7 UPHELD: "Borders move only on dated events with hysteresis … gates must never come from a political
partition (RR-52, RR-45; V13 §3.9 (13), J-V13.65)"; the host's record "is never re-derived on load or per tick
(`campaignWorldPulseSlice.js:370`)". (rulings.md:49)

H5. J384(6) UPHELD: "A native world is canonized at birth for new campaigns (a host-change item; **the route network at
birth per OD-FC-18**); existing campaigns untouched" — "every canon-gated lane (columns, the plague front, routed supply)
… keys on the marker"; H22, J-V13.100. (rulings.md:65)

H6. J384(10) UPHELD: "Holy places and hidden cult sites enter only as DM-placed map sites tagged with a deity, DM-only by
default, offered to the host for adoption …; never generated" — "the host holds no faith geometry (temples have no
coordinates …)"; V14 §2.2's `devotion`, J-V13.95, R-V14-13. (rulings.md:69) — a catalogue row whose sites are DM-placed
only (holy, hidden cult) is a case the "where appropriate" reading must place.

H7. J384(11) AMENDED: steadings are "CLAIM POINTS inside the parent's allegiance — never seats and never chain members".
(rulings.md:70) — the host's satellite is not a W7 seat.

H8. J384(12) UPHELD: "Columns the host overlay hides (port and teleport) are shown in the native lens" — the host overlay
"skips any pair with a port or circle endpoint and re-derives the path (`src/components/map/TravelersLayer.jsx:93-101`)".
(rulings.md:71)

H9. J385.g5 UPHELD: "Who keeps a gate under the sway: the host's intermediary settlement keeps it until the sway has
passed its soak; the crossing holder is then offered as a per-gate policy"; "gates drive tolls, interception and
contraband every tick (a same-seed shift of simulated bytes)". (rulings.md:73)

H10. J385.g15 UPHELD: J-RR.14's deferral of the 2026-08-05 directive "normalization dies for scaled worlds" — bounded
"until H2 lands", visible in V13 §12; "every host mover band was measured on the 2–8 march-week spectrum
(`sovereigntyReach.js:39,81`)". (rulings.md:74) — any travel-time law a site road joins inherits this deferral.

H11. J382(b) AMENDED: water carriage only where "its frozen record carries a versioned lane slot with at least one lane,
never its fleet switch"; the register word "lodgement" (not "foothold"). Correction C1 owed to V13 §2.2 `waterLanes`.
(rulings.md:58, 88–91) — one word, one meaning precedent.

H12. J378.4 AMENDED: the overlay word is `fighting`, "never 'embattled', the host's landed word for one settlement
state". (rulings.md:53)

H13. J388.Q4 / file r: "base §11.4 opens door 1 'only on the owner's explicit word' — the one decision the delegation
cannot reach". (rulings.md:80)

H14. Verdict: 42 judged, 37 UPHELD, 5 AMENDED, 0 OVERTURNED; one design fragment owed (C1). (rulings.md:32–37)

**H.2 realm.md (194 lines) — the validator of research/sf/fp-realm-review.md (the J-RR rulings).** Every row below is
UPHELD unless marked; each is a ruling under the J375 delegation, vetoable.

H15. J-RR.6: "the host's settlement id on every row; route identity (pair, mode)" — "the host's edge id is
`route.<a>.<b>.<mode>` (`routeNetworkLedger.js:241`)". (docs/validation/retrovalidation-2026-10-18/realm.md:95) — on a
host-bound world a route's identity is the host's (pair, mode); a site is not a host settlement id.

H16. J-RR.11, J-RR.12: "effort, never weeks; the host's travel law as data" ("weeks emitted would be a second clock and a
sixth distance price; the host has one distance reader"); "the host's cost-law values in the map's schema, split from
the lay rules" (J-V13.72, J-V13.73). (realm.md:100–101)

H17. J-RR.15: "time stations along every route and leg; `pointAtTime` by the dispatch season". (realm.md:104)

H18. **J-RR.16: "the host owns the genesis network's topology and grades, the world its geometry"** — "the host's
access-graded genesis is sacred (OD-FC-18); W7 as genesis would substitute a rank law; H12/H22 lay it at birth —
J-V13.79". (realm.md:105) — on a host-bound world W7 does not choose which roads exist; a site road that adds topology
is a host fact or an offer.

H19. **J-RR.17: "nothing moves a bound route silently; the host's move-lock (moves only)"** — "`updatePlacement` refuses
once `canonizedAt` is set while add and remove stay ungated". (realm.md:106) — an autocorrect that moves a bound route
or a canonized placement is barred.

H20. **J-RR.18: "the lived network mirrored as host facts; hidden roads no public road"** (J-V13.79). (realm.md:107)

H21. **J-RR.19: "the route record keyed to the host; grade edits refused; the DM charters through the host's command"**
— "the identity ruling admits no map-to-host command flow; `routeFacts` without `costTotal`". (realm.md:108) — a new road
to a site on a host-bound world is chartered through the host's command, not written by the map.

H22. J-RR.20, J-RR.21: "the world supplies the geography half of the port rule only" (W6's one-per-landmass rule
contradicts the host's, J-V13.74); "latent water candidates in the water slot; a **`WorldRoute` only for a host-named
edge**". (realm.md:109–110)

H23. **J-RR.25: "roads meet the world at the gates on every placed frame"** — "routing to the centre breaks MF's
continuity and wall laws; readings, never annotations". (realm.md:114) — the frame side of road integration.

H24. **J-RR.29: "a grown town keeps meeting its charter; site adoption automatic only on a world stamp"** — "adopting
without consent breaks C13-25's two verbs and byte identity". (realm.md:118)

H25. J-RR.13: "no world edit reaches the simulation by itself; `timeDelta` against the canonized baseline" — "a port
version is an offer the host adopts". (realm.md:102) — a site-road autocorrect on a host-bound world is an offer.

H26. J-RR.44: "sight, air and teleport as readers and marks, never invented edges". (realm.md:133)

H27. J-RR.37: "edits on a host-bound world follow the host's decree law" ("a lived history, once lived, forever",
J-V13.80). (realm.md:126)

H28. J-RR.54 AMENDED: "patrols derived, never random; a cadence of 1, 4, 13 weeks or none on a fixed phase; offered as
an extent, never a time" + "moved one rung by the force band of the source the round trip is measured from
(`forceShift`, J-V13.97)"; correction 12's text: "moved one rung by neighbour hostility, the host's route grade and the
force band …". (realm.md:143, 167)

H29. J-RR.53 AMENDED: gates stay the host's live reads; the per-crossing holder enters the host's per-gate pipeline only
after the sway's soak (J385). (realm.md:142)

H30. J-RR.14 UPHELD: native worlds canonize on the normalized arm until H2; not extended without the owner's word.
(realm.md:103)

H31. §6 Q-RR-2 (V13 §11 Q2, the host's schedule and the launch classification) and Q-RR-3 (V13 §11 Q1, the elective
rebase) remain the owner's, open. (realm.md:148–149)

H32. Verdict: 57 J-RR rulings, 49 UPHELD, 8 AMENDED, 0 OVERTURNED; 25 research corrections; no design fragment.
(realm.md:48–53, 188)

**H.3 realm-verify.md (74 lines).**

H33. Load-bearing host facts that held at 81f1cd96: "The move-lock: `updatePlacement` refuses once `canonizedAt` is set,
while `removePlacementLocal` and `addPlacement` are ungated"; "The interdiction treats hidden roads as unwatched"; "The
genesis mount has no caller"; "The one gate, `activeSpatialDigest`, called by 31 modules"; "The 2–8 march-week
spectrum, with `MAX_REINFORCEMENT_WEEKS` 5"; "`kmScale` is never written". (docs/validation/retrovalidation-2026-10-18/
realm-verify.md:31–49)

H34. RV-3: the host's route id rule "edgeIds deterministic (`route.<a>.<b>.<mode>` codepoint-ordered)" at
`docs/DESIGN_ROUTE_LIFECYCLE.md:86`, built at `src/domain/worldPulse/routeNetworkLedger.js:241` "(and
`src/domain/roads/userRouteIdentity.js:59`)"; the `RouteEdge` shape is "(a, b, mode, grade, charter)" at `:71-82`.
(realm-verify.md:57) — a deterministic tie-break precedent (codepoint order) and the host's user-route identity module.

**H.4 lenses.md (247 lines).**

H35. RL-3 UPHELD: "one substrate (path cost, hopWeeks, distanceWeight, chooseRoute); only caravans and steading sites
touch the host's territory" (TRADE §5.2, §8.3; POP §8.2). (docs/validation/retrovalidation-2026-10-18/lenses.md:154)

H36. RL-31 UPHELD: "one travel-time read, one area grammar, one event store, one snapshot service, one audience
projector, one register" (V13 §5.8 (1), (6)–(8)). RL-28 UPHELD: "host vocabulary as data; one word one meaning".
(lenses.md:179, 182) — a site road read by the travel law must go through the one travel-time read.

H37. L14 ACCEPTED: V13 H16 reads "patrol coverage re-priced through its one distance reader, read by outcome rolls only"
— "no security term"; C17: ask 8 as a refinement of H16's patrol coverage. RL-11 UPHELD: the "never" rows rest on host
absences "(no diffusion, **no patrol term**, no border read, …)". (lenses.md:88, 162, 215) — the host has no patrol
producer; patrols are the map's derived offer (H1).

H38. RL-12 UPHELD: "a contested march is no road hazard" (V13 §5.9 (2)'s refusals). (lenses.md:163)

H39. RL-2 UPHELD: "the canon marker is the one switch that gives any of them geography". RL-1 UPHELD: "every fact is
settlement- or pair-grain, none a field over land". (lenses.md:152–153)

H40. Verdict PASS-WITH-CORRECTIONS; 40 fragments (38 research, 1 design: V13 §5.8 (7) "public chips", 1 record).
(lenses.md:21–33, 240)

**H.5 lenses-verify.md (105 lines).**

H41. L14: V13 §8.5 H16 as it stands: "patrol coverage re-priced through its one distance reader, read by outcome rolls
only, any route choice reading it through its belief"; H16 "names no embattlement or security term". (docs/validation/
retrovalidation-2026-10-18/lenses-verify.md:42)

H42. L15: TRADE §2.3: a caravan (`supplyShipments`) keeps "institution, destination, input good, source, arrival tick,
starving …— **no path, no departure tick**". (lenses-verify.md:43) — the host keeps no road path per movement.

**H.6 trade.md (132 lines).**

H43. RL-4 UPHELD: "patrols have one weak host slot (the security relief); offer J378's patrol coverage as a candidate
producer for route_wardenship / route_predation or as a security input, **keyed to the host's gates, not to road
polylines**"; "J-V13.66 made patrols derived per route segment and power and 'offered to the host as an extent and its
basis, never as a time, and never imposed'"; consequence: "the host-requirements document J391 (6) commissioned should
carry the gate-keyed segment and the two designed slots". (docs/validation/retrovalidation-2026-10-18/trade.md:62) — a
reader's note: route segment (V13) and gate (host) are the two keys a patrol on a site road must reconcile.

H44. RL-2 UPHELD: "gates are per settlement, so a realm-coloured territory lens must still label gate settlements";
"interception, contraband and tolls are decided at the intermediary". RL-3 UPHELD: "contested marches have no trade
analogue"; "route danger is embattlement at settlements (`sp/embattlement.js:84-98`)". (trade.md:60–61)

H45. RL-5 UPHELD: "travel time from seats must be the host's week (median hop = 1 week, 1..52, the frozen overlay)";
"J391 (1) keeps per-settlement travel effort in the world canon". (trade.md:63) — the travel law's unit is per
settlement (seat); a site is not a host settlement.

H46. Host gates re-read: "ONE_REGEN carries `roadsEnabled` (`wp/simulationRules.js:742-752`)"; a born campaign runs "no
relief, no M6a, no Roads missions" (C30). (trade.md:9, 116)

H47. The host's food-import table by route class: "importCapacity, road 0.20, river 0.28, crossroads 0.42, port 0.58"
(`gen/foodGenerator.js:182-189`), no mountain_pass or coastal row; coverage rates "port 0.70 down to the mountain pass's
0.14". (trade.md:88–89, 120) — the host's per-settlement route class vocabulary (road, river, crossroads, port,
mountain_pass, coastal).

H48. RL-1: two partitions W8a (the unbudgeted nearest-seat partition the host's crossings ride) and W8b (the sway);
"budgets and cost vectors are retired" (J-V13.63). (trade.md:59, 112)

H49. Verdict PASS-WITH-CORRECTIONS; 38 research fragments; "No design text needs a change". (trade.md:83, 128)

**H.7 trade-verify.md (55 lines).**

H50. Held at 81f1cd96 (selected): "route danger and banditry formulas"; "the DM cut route reaching no caravan code; the
user-route charter's neutral neighbour link; the Roads trade mission gates and refusal ceiling". (docs/validation/
retrovalidation-2026-10-18/trade-verify.md:55) — the host has a user-route charter (a DM-made route) whose effect is a
neutral neighbour link, and a DM route cut that no caravan reads.

H51. TV-21: the frozen digest holds "`settlementIds, cellCount, landCellCount, skippedSettlements, costField, territory,
tiers, distanceMatrix, gates, routeReceipts, reserved{airField, seaLanes, seasonalOverlay, teleportEdges}` plus optional
`biomes, climate, lakes, captureReceipt, kmScale`"; no calibration field. (trade-verify.md:43) — the host's digest is
settlement-keyed; it has no site rows.

**H.8 amendments.md (85 lines at read; Status "IN PROGRESS (started 2026-10-18 04:59Z)" — a live record of the J392
workflow, read at md5 below; the apply step must re-read it).**

H52. AV-1 ACCEPTED (kind design): V13 :953 (`RouteCostLaw`, file m item 695): the host "prices per biome (13 rows)";
`TERRAIN_CLASSES` and `SEASON_TERRAIN_COST` key receipts by class only; "the knee is `elevMult = 1 + (h − 60) / 15`
(:385), a ramp, and the river term an add of 0.3 (:386). So 'the host's per-terrain-class factor' and 'the host's
elevation knee: a step above it costs × the factor' describe no law the host runs: the fields are the shape of its law 2
(H6 …), which J-V13.73 chose over porting the first law." (docs/validation/retrovalidation-2026-10-18/amendments.md:56)
— the route cost law a site road would be costed by is being corrected under J392 while this lane reads.

H53. AV-3 ACCEPTED: `src/domain/certification/subsystemRowsWaves.js:356-366` carries "the five event words and 'a road
being walked, patrolled or garrisoned is not a CHANGE'"; `routeNetworkLedger.js:64-181` holds "the grades, flavours,
accrual and bypass". (amendments.md:58) — on the host a road's use is not a change event; road grades and accrual are
the host's ledger.

H54. AV-8 ACCEPTED: 32 `src` modules import `activeSpatialDigest`, among them "`CharterRoadCard`, `briefs/roadScene`,
… `region/neutralNeighbourEdges`, … `store/userRouteCharter`". (amendments.md:63) — the host's user-route charter path.

H55. AV-10: `MAX_REINFORCEMENT_WEEKS` 5 "WAS MEASURED, NOT CHOSEN" inside the 2–8 hop-week spectrum. (amendments.md:65)

H56. The sections "The amendments judged as design", "Rulings table", "Corrections", "Verdict" read "(filled as judged)"
/ "(pending)" at read time. (amendments.md:67–85)

**H.9 amendments-verify.md (225 lines).**

H57. The applied targets' md5 "after r = now": V13 `c8759307` 4 452 lines, V14 `a1c6d7c2`, the brief `fc252070` 212,
the base `b03ba26e` 24 462, INDEX `39b0c519` 259, SUMMARY `9d142283` 214 (at the verifier's time, before J392's
corrections). (docs/validation/retrovalidation-2026-10-18/amendments-verify.md:36–44) — the baseline the J392 apply
moves; a site-road fragment's current text must be re-read after J392 lands.

H58. realm-m critic gap 2, closed by file n and present today: "the sites slot's class and step cost, H5's
satellite-ground reader"; gap 3 "H16's limits and flood exposure"; gap 7 "`bypass` (§2.2, §3.8 (9), J-V13.99)".
(amendments-verify.md:210) — V13 already carries a "sites slot" with a class and a step cost (read-v13's to quote).

H59. Host citations that held (selected): "the cheapest-crossing gates and their class receipts; the port rule
GEOGRAPHY ∧ INSTITUTIONS and `port: navigable && waterAccess`; the scale datum no caller supplies …; the genesis with no
caller; the field battle's place persisted as a settlement id; … the canonize premium-gated, refused mid-advance,
rebuilding the whole record and carrying only its scale". (amendments-verify.md:189–201)

H60. AV-1 (IMPRECISE, a V13 design comment): the exact old → new for V13's `RouteCostLaw` `classFactor` /
`elevationKneeFactor` comments (law 2's shape, H6; the first law's ramp knee not ported, J-V13.73). (amendments-verify.md:178)

**H.10 alignment.md (213 lines).**

H61. The host's route choice (CR-8, AV-3): "route choice over the frozen digest's cached candidates, effective cost =
seasonal base cost + tolerance × 1.5 × median hop cost × Σ embattlement (+ tolls), with the season; tolerance = 0.2 +
0.8 × lawfulness for refugees (a lawful mover weighs danger most)" (`sp/embattlement.js:304-330`, `:347-357`,
`:407-423`). (docs/validation/retrovalidation-2026-10-18/alignment.md:172) — danger on a route is embattlement at
settlements, chosen among cached candidates.

H62. R-16 UPHELD / "The inverted road-traveller danger weight (§10 item 28) — HOLDS: `roadsKernel.js:1010` passes
`riskToleranceOf(c.npc)` (bold 0.9, timid 0.35, `roads/state.js:334-343`) straight into `chooseRoute`, where
`scoreRoute` multiplies danger by it; `:1018` uses the same number as the refusal ceiling" — a host defect. (alignment.md:
99–101, 149)

H63. R-7 UPHELD (a legend fact, not an input): "a patrol layer may cite the host's gate character and escort quality as
the enforcing power's character, judged at the worst gate"; items 131–141 "touch this note only where §9.1 item 5 lets
a patrol legend cite the host's gate character … consistent with item 132 (e) … and with J378.5 (patrols derived from
enforcement, hostility and route class …)". (alignment.md:122–126, 140)

H64. Verdict PASS-WITH-CORRECTIONS; 30 research fragments; "No `design` fragment is owed". (alignment.md:196, 203)

**H.11 alignment-verify.md (94 lines).**

H65. AV-15: `research/sf/fp-physical-integration.md` §2.5 "Routes and their lifecycle" (lines 93-106) "holds route rows
R1-R8"; "the frozen-versus-live law, 'danger is relative to the mover' and the carrier route preferences are restated at
`:273`, in §5" citing PHASE55:1197-1201, :834-848, :1380-1389. (docs/validation/retrovalidation-2026-10-18/
alignment-verify.md:64) — the host's route lifecycle rows a road-integration design reads live in FP-PHYS §2.5 (outside
this lane's list; read-research's).

**H.12 faith.md (338 lines).**

H66. R9 UPHELD (since ruled by J384 (10)): "no faith geometry; … positioned sites need the owner's ruling and a host
adoption" — "temples have no coordinates and cults no location"; C50: "holy places and hidden cult sites enter only as
DM-placed world sites tagged with a deity, DM-only by default, offered to the host; never generated"; C53: "the catchment
drawn only as the set the host sends (V13 §5.9 (6), T-V13-54 …)". (docs/validation/retrovalidation-2026-10-18/faith.md:
229, 317, 320)

H67. R10 UPHELD: "no movers — missionize is a trust nudge, WF-2 unbuilt, encounters would be invention"; J379.1 as
amended "no pilgrims, missionaries or inquisitors as movers until the host runs them"; F24: "pilgrims are NEVER a migration
(they return …)" (COUPLINGS:856, :1816). (faith.md:98, 230) — a pilgrim road to a holy site carries no host mover today.

H68. R7 AMENDED: "carriers are not routes"; faith pressure travels along the host's relationship links, not roads.
(faith.md:227) — faith gives a site road no traffic.

H69. Items 131–141 touch faith "only through 132 (h) (a persistent site is an institution-like host record whose
consequences reach the map as dossier events) and 133 (e) (DM secrets are the knowledge layers)". (faith.md:202–205)

H70. Verdict PASS-WITH-CORRECTIONS; 67 fragments, 1 design (V13 §5.9 (6) pressure row, C45), 1 record (rulings.md
J379.1, C47). (faith.md:322–333)

**H.13 faith-verify.md (89 lines).** Its "site" hits are code locations, not world sites. One host fact: F11, "the
`holySite` resource … sets a pilgrimage marker" (`src/data/resourceData.js:409`, `pilgrimage: !0`, carried at
`resourceGenerator.js:386`) — a settlement-grain resource, not a positioned site. (docs/validation/
retrovalidation-2026-10-18/faith-verify.md:36)

**H.14 fp.md (173 lines).**

H71. FA-01 / R-FP-3 AMENDED: "leg granularity sets how many mid-route positions a journey has at which a located
engagement (an interception, a chance meeting) can arise — not the number of hearings, which the registry's climax kinds
fix"; war M (:66–70): "mid-route positions are real places"; `armies_meet` and `siege` are STANDING at a place.
(docs/validation/retrovalidation-2026-10-18/fp.md:61, 79, 123) — a road leg that passes a site creates a mid-route
place where a located engagement can arise.

H72. FA-02 / C14: "Terrain is nowhere in FP's law, but it is under every FP clock": the frozen digest's cost law
(`BIOME_COST` × the elevation knee, a river term, the terrain classes and the seasonal terrain overlay — `spatialCost.js`),
"which every FP mover reads through `hopWeeks`". FA-08: `landCostRaw` = `base × elevMult + riverBias`, riverBias 0.3 on a
river cell (`spatialCost.js:386`). (fp.md:62, 68, 122)

H73. R-FP-13 UPHELD: "how the three fabric laws bind a settlement map generator, and what they do not bind … '(realm-scale
terrain; MF §14.3; the REALM-COHERENCE LAW at DESIGN_SETTLEMENT_MAP.md:356–358)' is right and is the gap V13's charter
closes". (fp.md:89) — a host law (REALM-COHERENCE) the coherence expectation of J393 may name (read-research's to quote).

H74. Checked and sound: "§2.3's reading of 'genesis is sacred' (RL laws 1–2) and its [INFERRED] consequence for a map
generator (matches the owner's one-way flow, item 132 (h), and V13's `dossier` term at weight ∞)"; "T7/T8's 'the charter
is the boundary record' matches item 135 (b)". (fp.md:71)

H75. P2: "roamer physics J4 unbuilt [STATED DESIGN_ROUTE_LIFECYCLE.md:128-130 (the quotation), 225-227 (hidden-path
access)]". (fp.md:128) — the host's route lifecycle document holds hidden paths and an unbuilt roamer physics.

H76. R-FP-9: V13 §3.11.6 as applied: "the map builds the seat territory and crossings into the canon's travel slot; the
host keeps its all-pairs costs, tiers and candidate routes over it — the first reading, narrowed to geometry". (fp.md:85)
— on a host-bound world the map supplies geometry; candidate routes are the host's.

H77. Verdict PASS-WITH-CORRECTIONS; "No design-kind correction"; "Nothing in either note propagated into a design text".
(fp.md:161–165)

**H.15 fp-verify.md (80 lines).**

H78. FV-06: `DESIGN_ROUTE_LIFECYCLE.md:225–227` carries "wanderers and smugglers may use hidden paths at a grade penalty,
armies may NOT (J-D9 d)"; the "overgrown road" quotation is §5b, lines 128–130. (docs/validation/
retrovalidation-2026-10-18/fp-verify.md:27) — the host's route access by mover class (a precedent for an access class
per traveller; this lane records it only).

H79. FV-20: J-D3 (CREATE_ROUTE) "the engine paths via the spatial travel-cost raster" is `DESIGN_REALM_DIRECTIVES.md:
1630–1634`. (fp-verify.md:39) — the host already paths a DM-created route over its own cost raster.

H80. FV-34 spot re-reads that held: "routeNetworkGenesis.js:20–105 (user pairs, Urquhart, grade ladder, law version 1,
unmounted)"; "autoplacement.js:92–94 (100/30/4)" — FV-14: "fit (weight 100), k=3 reach (30), tie hash (4)". (fp-verify.md:
53, 59) — the host's genesis network is an Urquhart graph over user pairs with a grade ladder (unmounted); the host's
autoplacement scores fit with a tie hash.

H81. FV-21: "the sea keeps no track — a decayed water route's memory is the QUIET QUAY (the shell port)" (J-D11(c),
`DESIGN_REALM_DIRECTIVES.md:1753–1755`). (fp-verify.md:40)

H82. The verifier read `DESIGN_ROUTE_LIFECYCLE.md` whole (300 lines) and the fold whole (708). (fp-verify.md:15, 79)

**H.16 plague.md (105 lines) and plague-verify.md (45 lines).**

H83. R7 UPHELD: "Patrols have no plague job; the one plague term in route danger is believed danger in DC, LR, FS on
mapped worlds"; "J378's patrols are the session's reading (military enforcement, neighbour hostility, route class); the
owner said only 'also there should be patrols'"; consequence: the host-requirements document should carry pg-4's
quarantine verb "as the owner value PG names, not as a patrol fact". (docs/validation/retrovalidation-2026-10-18/
plague.md:57) — the owner's patrol word is "also there should be patrols"; its derivation is the session's.

H84. F2 (amended): the embattlement scalar "is read not only by the roads' known view but by the movers' route re-score
and banditry (`embattlement.js:12-13,41-53`; `pulseKernel.js:2360-2361` 'Routing/trade read the SCALAR')". (plague.md:24;
plague-verify.md:18) — host route danger is a per-settlement scalar.

H85. Item 132 (e) "(the world-map encounter case reads 'recent events') is served, not contradicted, by a plague lens".
(plague.md:44)

H86. V13's plague lens rows "assert only that a border, march, patrol or army does not stop or slow plague". (plague-
verify.md:44)

**H.17 population.md (157 lines).**

H87. "None of the items 130–141 touches population; item 134 (sites seed settlements) is a map-side rule the note's host
facts do not contradict (the host founds no first-class settlement by pressure, §5.4, and the design's siting is the
map's)". (docs/validation/retrovalidation-2026-10-18/population.md:20) — siting new settlements near sites is the map's.

H88. R-6 UPHELD: "Patrols could lower road danger only if the host chooses to consume a patrol fact; road deaths read the
embattlement ledger alone" (`sp/migration.js:151-153`, `:219-226`); "J378.5 … offers patrol coverage to the host
'consumed only by the host's choice', and names embattlement's security relief as the one slot"; "§9.1 #6's patrol reading
is an input to the owner's J391 (6) host-requirements document". (population.md:81, 149)

H89. R-11 UPHELD: "must not inherit the overlay's shortcuts" (`map/TravelersLayer.jsx:93-108`). R-4 UPHELD (refined by
J384 (11)): steadings "should not extend the border or seed a territory until graduated"; they "sit inside the parent's
exclusive partition, never join the digest and never graduate". C-17: the steading founding "samples the frozen territory
partition, cost field and gate terrain" to pick a site cell inside the parent's partition. (population.md:79, 86, 130) —
the host's own placement of a satellite reads its cost field and gate terrain (a host precedent for siting by cost).

H90. A host road-scene brief exists: `src/domain/briefs/roadScene.js:158-163` (cited in C-19e). (population.md:136)

**H.18 population-verify.md (49 lines).** Road facts only in passing: M4 migration "kills at the origin and on the road
on canonized realms" (`sp/migration.js:151-153`, `:219-226`), "the 0.59 uncapped winter road share", and the note's
declared gap "M4 route danger over sea hops". (docs/validation/retrovalidation-2026-10-18/population-verify.md:40, 49) —
nothing a site-road rule must satisfy beyond H88.

**H.19 prosperity.md (178 lines).**

H91. The host's generation route class for prosperity: `econ/prosperity.js:183-192`: "crossroads/port 3; disconnected
thorp or hamlet 0; disconnected village or larger 2 with teleportation and magic, else 1; connected 2" (road/river 2).
(docs/validation/retrovalidation-2026-10-18/prosperity.md:24) — a settlement's road connectivity is a host input at
generation (a configured class, H95).

H92. The host's roads kernel writes the prosperity band: the four `PROSPERITY_TIERS[` writers are `wp/upswingKernel.js:917`,
`wp/generosityUpdates.js:137`, `wp/traditionsKernel.js:405`, `rd/state.js:495`; ransoms "(roads)": a captor gains a rung
(`wp/roadsKernel.js:827-836`). (prosperity.md:27, 51, 125) — host road missions (captures, ransoms) exist and move
prosperity; the map does not run them.

H93. §9.1 item 6 UPHELD: "J-RR.54 derives patrols from host coverage, the garrison round trip, hostility and route grade —
no prosperity". (prosperity.md:65)

H94. §9.3 item 14 UPHELD: "one word, one meaning: never legend health, the toll lift or economic_capacity as prosperity";
V13 §5.8 (6) vocabulary. (prosperity.md:73)

H95. §9.1 item 8 UPHELD: "generation wealth is a configuration fact; show the class, lint mismatches, never override" —
"`econ/prosperity.js:183-192` reads the configured class only; the dormant `mapSlice.burgToConfig` (:871-888) has no src
caller". (prosperity.md:67) — a precedent: a settlement's configured route class is linted against the map, never
overridden by it.

H96. The owner's host-requirements document exists: `docs/HOST-REQUIREMENTS-2026-10-18.md` (934 lines; "the repository
copy of the Claude doc J391 (6) names"), with a Claude-doc mirror; HR-1 … HR-4 are record corrections to it. (prosperity.md:
53, 163–166) — outside this lane's list; a site-road rule's host asks would join it (the session's to place).

**H.20 prosperity-verify.md (96 lines).** F4: "`wp/roadsKernel.js:827-836` … only a term-end release pays both steps; a
party ransom pays the captor step only; … `rd/state.js:403`: term = 13 + round(26 × importance)" — host road-mission
ransoms; F16: migration origin tolerance "τ = 0.15 + 0.4 prosperity + 0.25 connectivity + 0.2 granary" (`sp/migration.js:
78-81`). (docs/validation/retrovalidation-2026-10-18/prosperity-verify.md:41, 53) — connectivity is a host term of migrant
tolerance; nothing here binds a site-road rule beyond H91–H95.

**H.21 scripts.md (72 lines).** S3: the owner's territory rules are "(T1), (T2) and (T3)" — (T3) carries "military
strength … patrols"; F13: the owner's review ask quoted at `workflows/36-realm-review.js:40` is recorded nowhere else (a
record gap J392 carries). (docs/validation/retrovalidation-2026-10-18/scripts.md:25, 40) — nothing on sites or roads.

**H.22 scripts-verify.md (43 lines).**

H97. Host facts that held at 81f1cd96: "modes foot/cart/river/coastal/sea (`modeSpeeds.js:54-62`)"; "SEA_COST_PER_DIST 12
vs land ~90..1560, capacity 10, winter 2.5 (`seaLanes.js:96,102,119`)"; "≥2 eligible ports (PHASE55 §4j, line 732)";
"`realmReach` has no consumer (`distanceRead.js:783` only)"; "route laws 1, 2, 5, 6 as summarised
(ROUTE_LIFECYCLE:24-47)". (docs/validation/retrovalidation-2026-10-18/scripts-verify.md:35) — the host's travel modes and
its route lifecycle laws a road integration on a host-bound world meets.

