# hidden-ways / read-v14-base — reader record (2026-10-18)

Seat: reader hidden-ways/read-v14-base (Opus/high), workflow hidden-ways-design (J407). Reads V14
(`docs/volumes/V14-sites.md`) and the base (`docs/ARCHITECTURE.md`), with the V13 lines V14 itself leans on, for the
precedent the host request `docs/host-requests/2026-10-18-hidden-ways.md` (HR below) leans on. Tags: [STATED] the
text says it; [OBSERVED] checked in the repository (a grep, a count, a line position); [INFERRED] my reading, for the
designers to accept or refuse. The host's facts are cited only from `docs/HOST-REQUIREMENTS-2026-10-18.md` (HQ below)
and `research/sf/*.md`. Nothing here is implementer text; host names stay in these evidence lines. No git was run.

## 1 The precedent HR leans on: the world-site record's two layers

HR:12 states the shape it wants mirrored: "The same two-layer shape as the world-site record (ENC-HL-01..04 /
M-SITE): the map's canon is the record of truth when it exists; until it does, the host DERIVES a stand-in from what
the port already gives and replaces it the day your layer lands." [STATED]

What V14 actually writes for sites:

* V14:481–483 — "A world site is an institution-like host record whose location is not inside a settlement (item 132
  (h)). The port carries it as V08's staged records carry a deposit or a condition, by a new row of V08's dossier row
  sets (V14 §10.2's cross-volume request to V08); until that lands a site has no host-owned facts and every field is
  the map's own." [STATED]
* V14:581 — the card carries `host?: WorldSiteHost; // the host-owned facts (item 132 (h)); factTier 'dossier' on
  each path; absent standalone`. [STATED]
* V14:591–592 — `interface WorldSiteHost { element … owner?; faction?; status?; version?; holder?; garrisonCount?;
  garrisonBand? }`. [STATED]
* V14:494–497 — "Every other value a site holds is the map's own derivation (item 20 (h)); a gap in the host's record
  is filled by the rules, never by a question to the host. … a removed record leaves the card as `map`-tier (the site
  stays, its host fields cleared and reported), never torn down (item 11; J-V14.25)." [STATED]
* V14:3197 (Q2) — "until it lands every site is map-tier and nothing of the map is lost". [STATED]
* HQ:644–647 (ENC-HL-01..04) restate this from the host's side: "Until it lands every site is the map's own and nothing
  is lost" (HQ:644). [STATED]

**The two layers, precisely.** In the site precedent the *card* (`WorldSite`) is the map's, always present; the
*host layer* (`WorldSiteHost`, fact tier `dossier`, plus the party-knowledge events) is an optional overlay the host
fills; when the host's half is late, the map's half stands alone. [STATED, V14:481–497, 581]

**What HR's sentence inverts.** HR:12 runs the fallback the other way: the *map's* half is late and the *host* derives a
stand-in. Nothing in V14's site design describes a host-derived stand-in of a site; the site precedent's fallback is
"the map stands alone", not "the host stands alone". [INFERRED from V14:481–497 and HR:12] The mirror that holds
exactly is the split of OWNERSHIP, not the direction of the fallback:

| site precedent (V14) | hidden-ways mirror (proposal) |
|---|---|
| the card `WorldSite` — the map's geography, always present (V14:561–588) | the hidden-route record — the map's geography, in the world canon (HR:23) |
| `WorldSiteHost` — host-owned facts overlaid, tier `dossier` (V14:581, 591) | the per-town knowledge — the host's belief, sent through the events window (HR:33, HR:42) |
| `SecretState` / `SiteKnowledge.players` — the party's view, by the host's reveal or the DM (V14:763–766, 783) | the party's reveal of a hidden route — the same three states (below) |
| until the host record lands: every site map-tier, nothing lost (V14:483, 3197) | until the map's layer lands: the host's own stand-in, the host's affair (HR:12, HR:31) — no map text is needed for it beyond T2 (HR:31) |

[INFERRED] The reply can say plainly: the ownership split mirrors the site record exactly; the fallback direction is
the host's own, and the map writes nothing for the host's stand-in (it only owes T2, which is a V13 question).

## 2 The three reveal states (the reveal precedent)

* V14:211–212 (plain words) — "A site is a game master's secret until they say otherwise: **DM only**, **revealed** to
  the players, or **discovered** by them — three states on the knowledge the map already keeps, drawn with a second cue
  beside colour". [STATED]
* V14:763–766 — `interface SecretState { state: 'dmOnly'|'revealed'|'discovered'; since: { seq: number; week: number };
  cause: LifecycleEvent['cause'] }` "dmOnly: knownTo 'secret' and the anchor absent from every party key's `places`;
  revealed: the DM or the host added the anchor to the party's `places` (V08 §3.14's reveal), knownTo 'secret' still;
  discovered: the party reached it (a host event, or the DM's mark), knownTo 'local'." [STATED]
* V14:791–793 — "a `dmOnly` anchor is a `secret` place not in the party's `places`, so a party view neither draws,
  lists, counts, names nor exports it". [STATED]
* V14:795–796 — "The DM toggles the state by one `setAttr` on `anchor/secret/state` (V14 §4.2); a lowering
  (`discovered` → `dmOnly`) is admitted and recorded with its cause". [STATED]
* V14:797–802 and V14:1193 — the shared view key `party: { tier: 'public'|'local'; places: Id[] }`: "the document's
  own party key when no host is bound and a mirror of `MapRecord.party` when one is (V08's reveal writes both)". [STATED]
* V14:3082 (J-V14.12) — "chose the three secret states on the anchor as `SecretState` with `knownTo` derived from them
  and the party's `places` carrying `revealed`, the admission function unchanged, and the icon's ring as the second cue,
  over a fourth knowledge tier or a new admission column". [STATED]
* Base:15744 (BCR-V14-21 applied) — "A place's `SecretState` (V14 §2.3: `dmOnly`, `revealed`, `discovered`; M-SITE-A;
  file k item 626) is read through `knownTo` and the key's `places` by the same admission function". [STATED; the
  sentence is present in the base, OBSERVED]
* V14:2583–2588 — the cue: "`dmOnly` — a dashed ring … in the `secret` colour role with a small eye-slash glyph …;
  `revealed` — an open ring in the `local` role; `discovered` — a filled ring in the `public` role … The legend (§9.5)
  lists each state's cue while one is drawn ("DM only · revealed to the party · discovered by the party")". [STATED]
* V14:3008 (SE3) — M-SITE-A carries "the icon in its context with the three cues … V08's reveal path for `revealed`";
  its exit T-V14-12 (b), (c) (V14:2956). [STATED]

**How a hidden route's reveal can mirror it.** [INFERRED] HR asks for (HR:33): undrawn while unknown; drawn "with the
knowing town's mark" when some town knows it; drawn for the party when the DM reveals it. The site precedent has ONE
audience axis (the party: dmOnly / revealed / discovered) and no per-town axis. A per-town "known" is a host belief
(HR:17, HR:42), which V14 has no precedent for at sites; the closest map precedent is V13's audience filter and belief
view (V13:3745 T-V13-50; V13:4007 J-V13.92 "covert things omitted, never greyed"), which another reader owns. So the
mirror is: the party axis = the three `SecretState` states unchanged (same words, same admission, same `party` key);
the per-town axis = a host fact read through the window (the host's preference, HR:42), drawn as a DM-view mark only —
never a fourth knowledge tier (J-V14.12's reason applies verbatim).

## 3 Is there a "hidden"/"secret" drawing rule to reuse?

| rule | where | what it does | reusable for hidden routes? |
|---|---|---|---|
| base knowledge filter | Base:15729–15731 | "a hidden or clandestine place is always on the map — its faces, masses, walls and doors draw at every band like any other — and what the map withholds is its name and its purpose" [STATED] | **No** [INFERRED]: it withholds the label, not the geometry; HR:17 and HR:33 need the geometry withheld (an unknown route undrawn) |
| `SecretState` `dmOnly` | V14:764, 791–793 | "neither draws, lists, counts, names nor exports it" [STATED] | **Yes**, as the party axis [INFERRED] |
| V13's hidden host road | V13:1815–1816 (W7 (9)); V13:601; V13:3144 | "a hidden land road is a DM-only ghost and a hidden water lane a quiet-quay mark" [STATED] | the drawing exists, but for a different object (below §4.3) [INFERRED] |
| V13's covert omission | V13:3158, 3324, 4007 | "covert links, columns and patrols fail closed — omitted, [never greyed]" [STATED] | **Yes**, as the fail-closed default (unknown ⇒ omitted) [INFERRED] |
| V13 approach road's veil | V13:1306 | "**veil:** its `knownTo` its site card's — a DM-only site's road DM-only" [STATED] | **Yes**: the one existing world-route record whose knowledge follows another record's secret state [INFERRED] |
| base VTT secret door | Base:17073 | "a concealed door, written only for a key that admits its use (item 63), the same with **`door: 2`** (secret …)" [STATED] | frame-scale only; not a world rule [INFERRED] |
| V14 secret entrance | V14:605 (`hiddenEntrance`), V14:2956 | the entrance unit's edge is a secret edge [STATED] | site-scale only [INFERRED] |
| the legend's count-free rule | V14:2587 "lists each state's cue while one is drawn"; Base:15739–15741 (the legend is an admission reader) | the legend lists only admitted rows [STATED] | **Yes**: HR:33's "never how many there are" follows because the legend is itself an admission reader (Base:15739–15741) [INFERRED] |

The base's §9.5 legend reads the admission function (Base:15739–15741, "the legend (§9.5)" among its readers) and
"a theme's legend key lists only" admitted rows (Base:14143). [STATED] So a party legend line "hidden routes exist; known
per town" is a fixed catalogue line, and nothing counted reaches it. [INFERRED]

## 4 The term census

### 4.1 "way" is the settlement frame's term [OBSERVED, STATED]

* Base:1090 — heading "### 2.4 Ways (the skeleton) and typed edges". Base:1093–1094 — `type WayClass =
  'through'|'primary'|'secondary'|'lane'|'alley'|'cul_de_sac'|'track'|'path'|'quay'|'pier'|'bridge'|'ford' |'aqueduct'`
  (the task's list plus `aqueduct`, item 110 (b)). [STATED; OBSERVED that `aqueduct` is the thirteenth class]
* Base:1095–1104 — `interface Way { id; class: WayClass; spine: ChainRef …; width; surface; name?; from: NodeRef; to:
  NodeRef /* gate, plaza, bridge, harbour, junction, external bearing … */; … raised?: RaisedWayRecord; slopeP95;
  corridor?: FaceRef; formerClass?: WayClass /* written by downgradeWay and by volume 5's landfall when it drops a covered
  way to track; cleared by upgradeWay … or a setAttr of class (§4.11) */; lifecycle }`. [STATED]
* Base:634 — `ChainRef … a way's spine, a wall trace, a tunnel, an island's rim`. [STATED]
* Base:15734–15735 — the label rows: "ways, districts, quarters, regions …, water bodies, woods, gates, the title and
  annotations are `public`". [STATED] — a second collision: a world route called a "way" would inherit, by the word, a
  label rule that says ways are public. [INFERRED]
* V13:762 — the charter's road rows: `class: WayClass /* a world class mapped to §2.4's: highway → through, road →
  primary, track → track, trail → path; capped … */`. V13:2277 — "every world route crossing the ring, with the class
  mapped to §2.4's `WayClass`". [STATED] So a world route that crosses a frame's ring BECOMES a `Way` inside the frame;
  a world-scale record named "way" would meet a frame-side record named `Way` at every ring crossing. [INFERRED]
* V14:1799–1801 (G5 (f)) — "**the way to the gate** (J393): for each charter road …, one way of its `WayClass` from its
  ring station to the nearest entrance unit's point". [STATED]
* V14 frame-side compounds (grep, OBSERVED): "way bands" V14:245, 424, 2100, 2766, 2787; "quay way" V14:1043; "way
  corridor" V14:2052, 2979; "raised way" V14:2309, 2704. V14:2100–2101 (E1's world crop) — "the charter's `roads` as way
  bands of their class (`corridorUnion` over the route's polyline at its class width)". [STATED]
* Counts (grep -oiw, OBSERVED): base `WayClass` 10, "way" 1 371, "ways" 201; V13 `WayClass` 2, "way" 35; V14 `WayClass`
  1, "way" 40. (Counts include the ordinary English "way"; the typed uses above are the binding ones.)

Verdict: HR:10's proposed prose word "way" for an edge of the hidden class collides with the base's `Way` / `WayClass`
and with V14's and V13's frame-side compounds. [STATED + OBSERVED]

### 4.2 Candidate free words (grep -oiw over Base, V13, V14; then over docs/, research/, plat/) [OBSERVED]

| word | Base | V13 | V14 | elsewhere | note |
|---|---|---|---|---|---|
| trace | 435 | 51 | 18 | — | taken: a wall trace (Base:634), S7's trace (V14:636, 2048), the sway's traces (V13:1301) |
| byway | 0 | 0 | 0 | `docs/validation/sites-roads-2026-10-18/design-B.md:25–131` (a site's approach road "of origin `byway`", a design not adopted: V13 uses origin `approach`, V13:493, 789) | free in the volumes; but its English sense is a quiet side road, not a concealed one, and it was once proposed for the overt approach road [INFERRED] |
| trod | 0 | 0 | 0 | none in docs/, research/, plat/ | free everywhere; a regional English word for a path worn by feet [INFERRED] |
| byroad, holloway, drove, drover, smuggler, sneak, "back road", "goat path" | 0 | 0 | 0 | — | free; "holloway" names a sunken lane (a physical form, too narrow); "drove" one width kind [INFERRED] |
| covert | 4 | 12 | 0 | — | taken as an adjective: covert impairments (Base:12960, 12964), covert links and patrols (V13:875, 3158) |
| run | 1 142 | 102 | 80 | — | taken (wall runs, sewer runs, `sewerRun` V14:1032) |
| hidden | 160 | 39 | 15 | — | see 4.3 |

### 4.3 "hidden" is ALSO taken at world scale [STATED, INFERRED]

HR:10 keeps `hidden` "for the class (its own ladder's last word)". In V13 that word already names the host's GRADE of an
overt route: V13:1813–1816 "a demotion keeps the polyline; a revival restores the hidden one; … a hidden land road is a
DM-only ghost"; V13:1819–1820 "a hidden road counts as no public road"; V13:1839 "(the network at the week, a hidden road
no public road …)"; V13:3737 "a hidden road has none" (no patrol); V13:3736 (f) "the host grading that road hidden makes
it an exclave again"; V14:993 "a hidden road no public road". [STATED] The host's own research row: "grade ladder down to
`hidden`, never absence" (`research/sf/fp-physical-integration.md:99`, R3). [STATED]

So "hidden" today = a lived grade of an overt `WorldRoute` (a decayed road). HR's `kind: 'hidden'` = a separate
geographic edge that was never a road (HR:35: "a road that decays to 'overgrown' … does not become a way"). Two
meanings of one word. [INFERRED] The reply should raise this with the "way" collision: either the new layer takes a
kind word other than `hidden`, or the grade is renamed; the map cannot carry both meanings.

## 5 What a "junction" is, and what a non-settlement route node would touch

### 5.1 In the base: a frame-side vertex record [STATED]

Base:1105–1106 — `interface Junction { id; vertex: VertexRef /* ('junction', id) */; arms: Id[] /* ways; on an
underground part the tunnels or galleries meeting there (V04) */; kind: 'T'|'X'|'Y'|'end'|'gate'|'bridgehead'|'square';
… }`. It lives on a settlement (or site) frame's arena; a `Way`'s `from`/`to` may be a junction (Base:1097). [STATED]

### 5.2 In V14: frame-side only [OBSERVED]

Every V14 "junction" is frame or site scale: the crop centre `'junction'` and include `'junctionArms'` (V14:1031),
`street.corner` "a junction within 12 m" (V14:1037), `sewer.junction` (V14:1047), a gallery's junction order (V14:1238),
E3's "the nearest junction vertex" (V14:2148–2151). V14 has no world-scale junction record of its own. [OBSERVED, grep
"junction" V14]

### 5.3 At world scale (V13, which V14 cites): a position along a route, never an end [STATED]

* V13:1827–1829 (W7 (11)) — "On a host-bound world every host route ends at two host settlements; a site, a proposal or
  a junction is a position along a route, never an end of a host route (the map's own approach road, (12), ends at it)".
* V13:786–789 — `interface WorldRoute { id; a: Id; b: Id /* its two ends: seat ids …; an approach road's (origin
  'approach') `a` its site's placement and `b` the public route it joins */; join?: { route: Id; atCm: WorldPointCm } /*
  an approach road only: its junction — the joined route's polyline point it ends at */; … origin: 'genesis'|'chartered'|
  'standalone'|'import'|'user'|'approach' …`.
* V13:1849–1850 (W7 (12) (b)) — the approach road ends "at the **junction** (the joined route's polyline point nearest
  the path's last cell)".
* V14:3177 item (18) asks V13 for exactly this: "an approach road of origin `approach` with its junction in
  `WorldRoute.join`, each laid on its own, no road to siting, pricing or the patrols, its `knownTo` its card's". [STATED]

So HR's Q1 ("Can a route endpoint be a non-settlement junction in your network today?") has a partial yes in the
design: the approach road already ends OFF a settlement — one end a site placement, the other a junction on a public
route — but it is the map's own road, "never a host edge" (V13:789), never in the canon or `routes(world)`'s host list
(V13:1306). A route with BOTH ends at junctions (or one at another hidden route's junction, HR:24) has no form today.
[STATED for the approach road; INFERRED for the gap]

### 5.4 What a non-settlement route node would touch [INFERRED, each from the cited text]

1. **The record**: `WorldRoute.a`/`b` are "seat ids" except for the approach road (V13:786); a hidden route needs ends
   that are junctions (route + position), a site, or another hidden route's junction; `join` holds one junction only
   (V13:787). Either a second record kind or `a`/`b` widened to a junction form.
2. **Identity (V13 §2.5)**: a `WorldRoute`'s creation key is "(`route`, the two seats' lineages sorted, the mode)"
   (V13:1259); the approach road's "(`route`, the site placement's lineage, `approach`)" (V13:1260). A junction-ended
   route has neither seats nor a site; its key must come from its junctions, and a junction's key from the joined
   route's lineage plus a position — which moves when the joined route is re-laid ("a dated re-lay keeps the former
   course as a version", V13:789; W7 (9)'s `bypass` re-lay, V13:1813–1815). The junction's identity must survive a
   re-lay of the road it sits on. [INFERRED]
3. **The port**: the canon and `routes(world)` carry host edges (Base:12903 — `canon(world, request)`, `routes`,
   `pathGeometry`, `borderSegment`, `placeOf`); the approach road is excluded from them (V13:1306 "never the canon,
   `routeFacts`, `patrolOffer` or `routes(world)`'s host list"). A hidden-route layer in the canon (HR:23) is a new slot
   of `canon` and a new typed place for `placeOf` (HR:28 "typed places the hearing card can name"). [INFERRED]
4. **Charters**: a hidden route crossing a frame's ring would enter the charter's `roads` only through V13:762's class
   map, which has no row for it (highway/road/track/trail only); whether it enters the frame at all, and as which
   `WayClass`, is a decision. Door 1 is unaffected either way — the charter is map-internal (Base:17720–17728). [INFERRED]
5. **V14's readers**: E1's world case reads "the route or river within the rectangle" and lays "the charter's `roads` as
   way bands of their class" (V14:2090–2101); site coherence and siting read "public routes only" and "a hidden road no
   public road" (V14:993; V13:807); the hideout row is `roadAccess` `avoided`, coherence `awayFromRoutes 300 m · 5`
   (V14:977). Each must say whether a hidden route counts. [STATED readers; INFERRED decision]
6. **Exports**: V13:601 — `WorldRoute` exports as "GeoJSON LineString, the ecosystem-shaped JSON's routes, CSV"; every
   such export is an admission reader at the export's key (Base:15739–15741), so a DM-only route stays out of a party
   export only if it carries a `knownTo`/secret state the admission reads. [STATED + INFERRED]

## 6 What the VTT export writes for sight lines (so the reply can say they are not host truth)

* Base:17020–17031 (§11.1, Universal VTT) — "`line_of_sight` — polylines in grid units from building footprint edges
  (minus door openings and the outer-wall runs the building's own decay level breaks …), enceinte faces along every
  `standing`, `worn` and `patched` run …, yard walls and hedges from boundary treatments (fences and railings do not
  block sight), cliffs, retaining walls whose derived step … is at least `vtt.retainingMinCm` (150 cm …), and a raised
  part's supports' footprints …; `objects_line_of_sight` empty, save an encounter crop's transient items' sight-blocking
  shapes (V14 §5.3)". [STATED]
* V14:2647–2652 (§5.3) — the crop's ground scene "with `line_of_sight` from the footprints, walls, cliffs and retaining
  walls in the rectangle and the transient items' sight-blocking shapes as closed polylines in **both**
  `objects_line_of_sight` … and `line_of_sight`". [STATED]
* V14:2101–2104 (E1's world crop) — the crop frame's fixed faces exist "so `line_of_sight` (cliffs, the river's banks as
  water faces), the road band, the water face and the VTT scene exist; never persisted, released with the encounter".
  [STATED]
* Base:17729–17732 — the export bundle: "opaque byte blobs for SettlementForge's export bundle, which SettlementForge
  packages unread … No call returns a structured format — the bundle call returns opaque blobs only — so door 1 stays
  closed". [STATED]
* HQ:654 (ENC-HL-11) — "that is map geometry, and the map must not present it as host truth"; the host's research row
  `research/sf/fp-physical-integration.md:137` (L1 ABSENT) — the host's only `line_of_sight` is its interior export's,
  "not a terrain viewshed". [STATED]

Plain statement for the reply [INFERRED from the above]: the map's sight lines are a VTT scene's occluders cut from a
frame's own walls, cliffs, hedges and the crop's transient items, within one crop or document scope; they are not a
terrain viewshed, they exist only inside a rendered scene, and they reach the host only as an opaque file it packages
unread. A hidden route's junction is a topological fact (HR:18); nothing in the sight-line export bears on it.

## 7 The route lifecycle and detours HR touches (D)

* ENC-HP-13 (HQ:629): "No way was found for the host to write its lived road grades back"; research R3
  (`research/sf/fp-physical-integration.md:99`, 420): "grade ladder down to `hidden`, never absence". [STATED]
* ENC-HL-10 (HQ:653): detours "verdict MISSING"; research R4 (`fp-physical-integration.md:100`): the host's own design
  says bypass waypoints "are geometry, never new graph nodes; the frozen digest is untouched". [STATED]
* V13 nonetheless already designs a bypass: V13:1813–1815 (W7 (9)) "a `bypass` (the host's detour round a seat it
  avoids: the avoided seat and its radius) re-lays the route round that radius under the cost law as a dated lay
  version under the same host key, the former lay kept and the hysteresis the host's"; tested at T-V13-41 (u)
  (V13:3736). [STATED] HQ:653's "the map offers no detour either" is therefore stale against V13 as it stands. [INFERRED;
  the V13 reader should confirm]
* The frame-side way lifecycle (Base:1102–1103): `formerClass` "written by downgradeWay and by volume 5's landfall …;
  cleared by upgradeWay". [STATED] It is a settlement-frame mechanism; nothing in it reads a world route. [INFERRED]
* For D: in V13 a host demotion "keeps the polyline" and "a revival restores the hidden one" (V13:1813) — the overt route
  stays the same record through every grade. A hidden-route layer that is separate geography never receives a demoted
  road, which matches HR:35's wish ("a road that decays … does not become a way"). [STATED + INFERRED]

## 8 Milestones

V14's milestones are frame and site scale: M-ENC (crop), M-SITE-A (attached sites, the secrets), M-SITE-F (free sites,
after V13's M-W1), M-25D (V14:2991–3001). [STATED] None lays or carries a world route; V14's route needs are requests to
V13 (V14:3177 item (18)). [STATED] The reveal precedent ships at SE3 (M-SITE-A, V14:3008) and its bar is T-V14-12 (b), (c)
(V14:2956). [STATED] [INFERRED] A hidden-route layer is world canon (V13's), so its milestone is V13's (the route
milestone M-W2 family, Base:12903 "M-W2 for the rest"); its reveal can reuse SE3's `SecretState` machinery only once
M-SITE-A has landed it, or V13 must carry the three states itself.

## 9 Stale citations noticed (for the synthesis) [OBSERVED]

* HQ:644, 645, 647 cite "`docs/volumes/V14-sites.md` §1b.5 (lines 455, 461 … 464)" and "§2.3 (lines 736–739, 756–757)";
  in V14 as it stands §1b.5 is V14:479–497 and `SecretState` / `SiteKnowledge` V14:763–785.
* HQ:654 cites "V14 §5.3 (line 2535)"; the `line_of_sight` sentence stands at V14:2647–2652.
* HQ:644, 647 cite "§10.2 (line 3059)", "§11 Q2 (line 3073)"; they stand at V14:3173–3187 and V14:3197.

## 10 Open points for the designers

1. The word for an edge: "way" collides (§4.1); "trace" is taken; "byway" and "trod" are free in the volumes and the
   base (OBSERVED); "byway" carries an overt sense and a prior unadopted proposal (design-B). Choose one.
2. The kind word: `hidden` already names the host's grade of an overt route in V13 (§4.3). Choose a different kind word,
   or ask the host to rename the grade.
3. The fallback direction: the site precedent's fallback is map-alone, HR's is host-alone (§1). Say so; the map owes the
   host's stand-in only T2 (V13's).
4. The per-town axis has no V14 precedent: decide that it is a host fact through the window (HR:42's preference), drawn
   DM-view only, and that the party axis is `SecretState` unchanged (J-V14.12's reason).
5. Default state: a hidden route starts `dmOnly`/omitted (V13's fail-closed, V13:3324; V14:615–616 "every card starts
   unrevealed"); the base's label-only filter (Base:15729) must not be the rule.
6. Junction form and identity: a junction-ended route needs a creation key that survives a re-lay of the joined route
   (§5.4 (2)); decide whether the approach road's `join` generalizes or a new record kind is minted.
7. Frame crossing: does a hidden route that crosses a settlement or site frame's ring enter the charter's `roads`, and as
   which `WayClass` (V13:762 has no row) — or stop at the ring (the approach road never enters a settlement frame,
   V13:1848)?
8. Readers: E1's world crop, site coherence (`awayFromRoutes`), siting and patrols each need a sentence on whether a
   hidden route counts (§5.4 (5)); the hideout row (V14:977) is the natural endpoint the host's list (HR:24) omits.
9. Milestone: V13's (route family) for A; C reuses SE3's machinery — name the dependency on M-SITE-A or duplicate it in V13.

Status: LANDED.
