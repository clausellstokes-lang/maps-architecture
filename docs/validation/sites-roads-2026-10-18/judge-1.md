# Judge 1 — sites, roads and autocorrect (J393): the three designs scored

> Designed on Opus 5.5 under the owner's staffing word of 2026-10-18 (J394); Fable critique closes the run (lane sites-roads/critic)

Lane `sites-roads/judge-1` (opus; J394, Fable-critiqued). Judge 1 of three; the other judges' records were not read.
Started 2026-10-18 09:39Z. Nothing applied; this record scores `design-A.md`, `design-B.md`, `design-C.md` and names
the winner and the grafts the synthesis must take.

## 0. Inputs, read whole, and the targets' hashes now

| file | lines | md5 (at 09:39Z, re-taken 09:45Z: unchanged) | read |
|---|---|---|---|
| `docs/validation/sites-roads-2026-10-18/README.md` | 29 | `eabd68cd` | whole |
| `read-v14.md` / `read-v13.md` / `read-base.md` / `read-research.md` / `read-checks.md` | 980 / 1 013 / 880 / 562 / 1 268 | `6d127498` / `64637654` / `33635e21` / `d97b4fcc` / `28609ac2` | whole each |
| `design-A.md` (+ `design-A.fragments.json`, 96 fragments) | 1 776 | `9d495fba` (JSON `cfe477ae`) | whole |
| `design-B.md` (fragments inline, 93) | 1 036 | `a47697d1` | whole |
| `design-C.md` (+ `design-C.fragments.json`, 56 fragments) | 1 479 | `cc051133` (JSON `a0c3c4a8`) | whole |
| targets | — | V13 `d0de9ad8`, V14 `70d8aa1b`, base `1f871a01`, INDEX `42881796`, SUMMARY `9d142283`, brief `fc252070`, README `2a4b54c8`, gate spec `b6c5be2a` | the passages checked below |

Every design quotes the targets at exactly these md5s (file s, items 927–939, had landed before each finished), so no
design's fragments are stale. (`design-A.partial-fable.md`, the Fable partial A kept whole, was not judged: design-A.md
states which of its parts it keeps and why.)

## 1. Verification run

**All fragments, by script** (`/tmp/claude-0/-home-user-maps-architecture/4291a60d-8240-5d49-a54e-2b2a213d093f/scratchpad/sites-roads/judge-1/check.py`,
output `check-out.json` there; B's inline fragments parsed from its `*Current text:* \`…\`` lines, ⏎ read as a line
break): every current text of A (96), B (93) and C (56) occurs **exactly once** in its target as it stands now, at the
line the design names; applied in order to copies, 0 errors, each new text present once after. No fragment quotes a
pre-change text.

**The `grep -F -c` spot checks** (first line of the current text; `grep-samples.txt` in the same folder), nine per
design, every one `1`: A-2 (V14:362), A-8 (V14:907, 15 lines), A-16 (V14:2138), A-36 (V13:750), A-48 (V13:1714),
A-57 (V13:2115), A-64 (V13:2886), A-81 (base:8678), A-91 (SUMMARY:84); B-6 (V13:748), B-12 (V13:1157), B-17
(V13:1786), B-23 (V13:2156, 5 lines), B-46 (V14:362), B-56 (V14:1404), B-63 (V14:1942), B-85 (base:9718), B-90
(SUMMARY:84); C-5 (V13:748), C-11 (V13:1157), C-15 (V13:1776), C-16 (V13:1786), C-18 (V13:2115), C-35 (V14:921), C-41
(V14:1945), C-52 (INDEX:14), C-55 (SUMMARY:85).

**Claims checked against the texts** (V13 at `d0de9ad8`, V14 at `70d8aa1b`, base at `1f871a01`):

| design | claim | text now | holds? |
|---|---|---|---|
| all | `lawful = total ≤ lawfulMax`, `lawfulMax` 4 | V13:748 (`lawful: boolean /* total ≤ … */`), V13:1158 (4), V13:2102 | yes — it decides C's arithmetic (below) |
| A | W7 (9) "mirrored, never computed" | V13:1766; V13:1767 "only `chartered` lays new geometry" | yes |
| A | W7 (11) "a position along a route, never an end … changes a route's geometry and effort" | V13:1782–1784 | yes (A amends it; B and C build on it) |
| A | a rank-0 seat's edge to a capital is classed by the higher seat (a highway to a mine) | V13:1748 "the first `primaryShare` of land edges by the higher seat's rank are `highway`" | yes |
| A | no `trail` row in `gradeShift` | V13:1123 "highway +1, road 0, track −1 (hidden: none)" | yes |
| A | fine cells 250 / 500 / 1 000 m | V13:997–999 | yes |
| A | a canonized row "is never moved — the world bends locally around it" | V13:2408–2410 | yes |
| A, C | a destination added re-derives S3's gates | base:11703 "a gate-count change (a destination added or removed) re-derives from the stage that picks those gates: S3" | yes — it refutes B's `inFrame` destination |
| A | "the gatehouse astride the road" | V14:1572 | yes |
| B | J-RR.21 "a `WorldRoute` only for a host-named edge" is the water candidates' ruling | `research/sf/fp-realm-review.md:560` | yes (B cites the note's md5 `0a9e5dcf…`; it is `04ddbd0c` now, the line unmoved) |
| B | T-V13-12 "four fixtures, one per anomaly kind" against eight kinds | V13:3577, V13:801 | yes |
| B | V14 G8 (e)'s preselected "move the site" | V14:1906 | yes |
| B | §4.3 *Result* "Through-roads continue to the context margin" | base:6506 | yes |
| B | an `inFrame` road-class site's gate as an S4 destination re-routes "only the arterials whose destination moved" | base:11703's last cell (above) | **no** |
| C | W7 ends a leg at a fine cell's centre | V13:1713 "a placed frame's origin mapped to its fine cell" | yes |
| C | the cascade's step 6 marks charters, never placements | V13:2664 | yes |
| C | V14's drop row reads `routed` "at their next run"; `requestCharter` runs "P4 only" | V14:2377; V13:2919 | yes |
| C | `NetworkChange.via`, `rerouteReach.via` | V13:846, V13:2845 | yes |
| C | *spur* names a terrain feature (V13:1455, 3935) and a polygon spur (base:5469) | V13:1455, 3919, 3935; base:5469 | yes |
| C | "one wholly unmet access or expectation alone reaches `lawfulMax` 4 and is unlawful" (weights 4, raw 1) | 4 ≤ 4 is lawful by V13:2102 | **no** |
| C | the border posts' kinds agree with its rows | V13:2000 "a watchpost on open ground", against C's watchpost `expect overlook ≥ 0.25`, `move` 500 m | **no** |
| B, C | the gate spec's heading counts the model rows | gate spec:31 "## Model rows (M1–M11)" | A updates it (A-95); B-93 and C-56 add M12 and leave it stale |

## 2. Scores (0–10 each; total the sum, of 50)

| design | completeness | base_coherence | minimality | owner_rules | fragment_exactness | total |
|---|---|---|---|---|---|---|
| **A** (catalogue-first) | 9 | 8 | 6 | 9 | 10 | **42** |
| B (pipeline-first) | 8 | 6 | 6 | 7 | 8 | **35** |
| C (coherence-first) | 8 | 5 | 8 | 7 | 8 | **36** |

### Design A — winner

**Strengths (what it gets right that the others miss).**
- **No route is bent to a site, on either world** (J-A.1; A-50 amends W7 (11), A-72 T-V13-43): a site lies *along* a
  route that meets its frame, or the map's own approach road joins it. This is the one reading that keeps W7 (9)
  "mirrored, never computed" (V13:1766–1767), W7 (10) "lays only edges a host change names" and J-RR.17 "nothing moves
  a bound route silently" literally true, and it is the bare coherent minimum on a host-bound world (V13 §1.3's
  correction). B's station and C's via re-lay compute new geometry for host routes from map-tier cards.
- **The arithmetic is right:** the expectation proper is a row of cost 5 > `lawfulMax` 4, a preference 1 or 3 (A-8,
  A-42, A-57) — C13-26's precedent applied correctly; T-V13-58 checks a fort at cost 4 (3 + 1) is lawful.
- **Every one of the 21 kinds** carries five calibratable columns with units and a reason (A-8), and exactly four kinds
  bend (tollhouse, bridge fort, mine, hideout), the rest report — the only design whose bending set is argued kind by
  kind (J-A.15), with **groups of alternatives** (`command`, `post`, `rest`) so a watchpost may watch a road or a height —
  which lets V13 §3.9 (16)'s border-post watchpost "on open ground" stand (C breaks this).
- **The bend is preselected within `bendM`, offers within `originSearchM` none preselected, never a bend later**
  (J-A.6) — with the DM's `takeOffer` as the second choice on the site anomalies (A-58, A-65; J-A.13) — the one design
  whose anomaly choices can actually cure an incoherent site (C offers `worldWins`, which does not move it).
- **`inFrame` road access by the hinterland's own faces** (`driveway` / `path`, BCR-V14-26, A-15, A-29, A-81, A-83),
  avoiding base:11703's S3 re-derivation; the base's own access forms reused.
- **One word, one meaning done most rigorously:** *bend*, *approach road*, *along*, *coherence rows*, with the
  collisions it avoided cited (A's continuation note (2): *snap*, *spur*, *station*, bare *expectation*).
- **Fragment hygiene:** 96 fragments, a JSON copy, in-order application to copies, the gate heading updated (A-95), the
  one owner question landed where the volumes keep owner questions (A-32 V14 §11 Q5, A-89 INDEX, A-90/A-92/A-93
  SUMMARY counts).

**Weaknesses (with the cite).**
- **Retiring `routed` is not the smallest change** (J-A.2; A-2, A-5, A-6, A-8, A-22, A-26, A-28, A-30, A-38, A-48, A-78,
  A-82): it removes sites from W7's seats on a standalone world (A-48 at V13:1714), amends J-V14.43 and BCR-V14-13, and
  needs a migration row (A-9). It is defensible (W7 (11) already makes a site no end on a host-bound world, and two
  fields would overlap), but B and C show the owner's words can be met with `routed` kept.
- **`Placement.approach` is a derived reading persisted on an input record** (A-34, A-45: "with its placement …
  rewritten only by W7 (12)", "never an undo target"), so every W7 run moves the world's placement rows; a derived
  block or a reading (as the anomalies are, V13:801) would keep the input clean.
- **`WorldRoute.b` overloaded** to hold a route id for an approach road (A-36) where the field is "seat ids" — B and C
  do the same; the synthesis should name the junction in a field of its own (C's `join`, B's `byway`).
- **The approach road is read by roads' price readers:** A lays later approach roads "with the `existingRoute`
  discount against every route already laid (earlier approach roads among them)" (§1.4 (d) 2) and gives it a patrol
  cadence of its own (`gradeShift.trail`, A-41, A-54), and V14's `routeNear`/`solitude`/`concealment` plug-ins read it
  for every other site — C's exclusion (C-16, C-36) is cleaner.
- **Knowledge layers missed:** an approach road to a DM-secret site (a secret temple, `preferred`) is drawn by the
  `routes` layer for the players (A-67) — item 133 (e)'s secrets leak; C caught it (C-16, C-19).
- **A promise without its fragment:** §1.4 (l) says "F-PLACE (V13:2787) gains two detections", but no fragment edits
  V13 §3.16's row (the JSON has no V13 line 2787 entry); likewise the world-first sentence at V13:2078 ("P1 is **not**
  run … runs P4 only") stays unqualified beside A-56's preamble exception, `requestCharter` gains no `accept` for a kept
  unlawful site, V13 §1.3 and V14 §1.3 do not quote the owner's new words, and V13 §1b.1–§1b.2's wiring rows do not
  name the new products.
- **Small internal slips:** H31's timing "with M-W2, after H19" (§1.4 (m)) against A-76/A-88 "after M-W3"; the test
  `onShore` is used by no shipped row; the manor's `inReach` row can never run (a manor is never `free`, A-8's own note).
- **The clerk** is named only through `why placement` (A-45); no reason-record rule for a bend, an offer or an
  approach road (C §1.9a has one).

### Design B

**Strengths.** The pipeline table (§1.3) places every rule in an existing stage with its reads and writes, standalone
and host-bound side by side (§1.4); it quotes the owner's new words in V13 §1.3 (B-2) and V14 §1.3 (B-45), where the
volumes quote every owner rule they obey — the only design to do so; it declares the `placeFrame` site form V14 §3.4 (a)
and R-V14-11 already use (B-31); it fixes T-V13-12's stale count (B-37, V13:3577 "four fixtures" against eight kinds);
it carries the bookkeeping notes (B-1, B-44, B-86) and an F-PLACE row (B-30); the byway is no patrol segment and a
garrisoned site reached by it is a source (B-18); keeping `routed` is the smaller change.

**Weaknesses.**
- **The `inFrame` road-class destination contradicts the base** (B-63, B-80, B-85): a `worldSite` `Destination` added
  at an `inFrame` drop is "a gate-count change (a destination added or removed)" that "re-derives from the stage that
  picks those gates: S3" (base:11703), so T-V14-34 (c)'s locality bar cannot hold; A and C cite the same row and avoid it.
- **The station re-lays a host edge through a map-tier site's cell** (B-17 (b), B-11: 500 m, 1.1 detour), computing
  geometry for a bound route that W7 (9) says is "mirrored, never computed", pushing a `timeDelta` and a `routeFacts`
  effort change toward the host's simulation for a card the host never made; the cell-centre vertex can also shift a
  road by up to half a 250–1 000 m cell (V13:997–999).
- **Words:** *station* is reused for a site's role on a route and for the snap target ("the nearest station"), where
  V13's `stations` are a route's cumulative effort-metres (V13:754) and the charter row's `atCm` (V13:726); *snap*
  survives as a policy value beside `bend.site.roadAccess`; the `dossier` term (DR1/DR29 facts, V13:2100) is stretched
  to ∞ "against any origin but the host's" for a host-placed site (B-21), where `hostLocked` already refuses origin
  edits (V13:746).
- **Scope beyond the owner's words:** a settlement-first site placement with P2–P3 over a blend band (§1.6) — the world
  blending to a site — and the README row (B-92).
- **OQ-2 re-asks what the owner's own word "autocorrects" settles** (whether the map may move the dropped point); A and
  C decide it from the word, as the standing rule (the owner's words never re-judged) asks.
- **Fragment form:** current and new texts are single-backtick inline code wrapping texts that themselves contain
  backticks (B-3 onward), no machine copy, and no in-order residue check recorded (my run passes it); the gate heading
  is left at "M1–M11" (B-93).

### Design C

**Strengths.** The most economical design (56 fragments): it keeps `routed` with a validation rule (`refuse.table.invalid`),
reuses V14's own seventeen plug-ins for the expectation (`expect: { terms; min }`) instead of a second registry, and
adds two cost terms. It alone **excludes a site's own path from the readers that price roads** — `existingRoute`,
`connectivity`, the patrols, the simulator feed and V14's `routeNear` (C-16, C-36), so a hermitage's path never zeroes
its `solitude` (V14:987). It alone **gives the site's road its site's knowledge** (`knownTo`: a DM-secret site's trail
DM-only, C-16, C-19; item 133 (e)). It alone writes **the clerk's reason records** for every fact it makes (§1.9a; bar
10). Its derived-at-read anomalies are argued against the cascade's own text (V13:2664; J-V13.113), and its M12 names the
real dependency of a frame-side way — M0-c-03's deferred two-point road (C-56).

**Weaknesses.**
- **The autocorrect never fires on a single unmet term:** `weights.siteAccess` 4 and `siteExpect` 4 with a raw cost of 1
  give a total of 4, and `lawful = total ≤ lawfulMax` with `lawfulMax` 4 (V13:2102, V13:1158) — so a toll house off its
  road, a bridge fort off its crossing or a watchpost below its height is **lawful** and is placed as asked, never bent;
  C-11's own sentence ("one wholly unmet access or expectation alone reaches `lawfulMax` and is unlawful, as any coast
  error is, C13-26") is false (C13-26 works because 2 × 3 = 6 > 4), and T-V13-57's bend clauses would fail.
- **The via re-lay bends a host road through every `served` site within 1 km** (fort, mine, manor, guildhall, temple;
  C-16, a window of 2 × `autocorrectM`), with `accept` the default (C-22) — the same computed host geometry as B's
  station, wider.
- **The watchpost moves off V13's border post:** V13 §3.9 (16) proposes "a watchpost on open ground" at a road's border
  crossing (V13:2000); C's watchpost is `move` 500 m to `overlook ≥ 0.25` (C-35), so an accepted post would be moved
  off its crossing; C §4's "their kinds' rows … agree with it" is not true of the watchpost.
- **The anomaly choices cannot cure the anomaly:** `keep` or `worldWins` (C-18; §1.8), where `worldWins` on a site
  re-materializes its arenas and moves nothing; `takeOffer` is not offered.
- **Two content errors in its own new text:** C-52 rewrites file s's description in INDEX:14 from "the Fable
  retrovalidation's corrections" to "…'s autocorrects" (the *correction* → *autocorrect* rename leaking into an
  unrelated phrase); C-31 still says "(e) lays the approach way" though C renamed it the entrance way. The gate heading
  is left at "M1–M11" (C-56).

## 3. The winner and the grafts

**Winner: design A** (42 of 50). It is the only design whose autocorrect is arithmetically live, whose host-bound
integration moves no host route, whose `inFrame` access stays inside base:11703, and whose fragments are complete in
form; its weaknesses are additions and tidy-ups the runners-up already supply, not a change of mechanism.

**Grafts the synthesis must take into A:**

1. **From C — site's road excluded from the price readers** (C-16's sentence, C-36): an approach road (at least of class
   `trail`) is no road to `existingRoute`, W6b's `connectivity` and V14's `routeNear` (hence `solitude`,
   `concealment`, `roadControl`); decide with it whether A's `gradeShift.trail` patrol cadence on approach roads
   (A-41, A-54 second half) stays — C's "nothing patrols a path to a hermitage" is the smaller rule; keep A's
   "a garrisoned fort joined by its approach is a source" (J-A.11).
2. **From C — knowledge:** an approach road's `knownTo` is its site card's; a DM-secret site's road is DM-only and absent
   from a player picture and from the map feed's player audience (C-16, C-19, T-V13-58's clause).
3. **From C — the clerk's reason records** (§1.9a's table): a site's cost by term, a bend, an offer, an approach road,
   the way to the gate and an anomaly each write the one `ReasonRecord` with its catalogue sentence; T-V13-10's chain
   reads them.
4. **From C — M0 model row for the two-point road** (C-56's text): A's G5 (f) way "from its ring station to the nearest
   entrance `GateSite` … routed by S4's router as `drawWay` routes a pair" (A-14) depends on M0-c-03's deferred
   two-point road; add C's row beside A's M12 (as M13) and keep A-95's heading count in step.
5. **From C — `requestCharter.accept?: ('unlawful')[]`** (C-21), so a site's kept unlawful drop is in the event as
   `placeFrame`'s and `setPlacement`'s are; and **the world-first sentence qualified** at V13:2078 (C-17 or B-19's form).
6. **From B or C — an F-PLACE row for a site subject** at V13 §3.16 (B-30's form or C-20's, re-worded to A's bend /
   offers / `noRoadAccess` ladder of §1.4 (l)); A states it and ships no fragment.
7. **From B — the owner's words quoted in V13 §1.3 and V14 §1.3** (B-2, B-45), with A's mechanisms named.
8. **From B and C — the wiring rows:** V13 §1b.1's `PlacementAnomaly` and `WorldRoute` rows and §1b.2's `coherence`
   row name the site form, the approach road and the two anomalies (B-3, B-4, B-5; C-2, C-3, C-4).
9. **From B — the `placeFrame` site form** declared in V13 §4.1 (B-31's `frame: Uuid | { site: Id }`) — without B's
   P2–P3 blend for a site: A's site form has none.
10. **From B — T-V13-12's count re-declared** (B-37's form, with A's two kinds on T-V13-58's fixture) and **drift row 13's
    assertion** that an approach road whose route is removed re-joins the nearest route or reads `noRoadAccess`
    (B-29's form).
11. **From B and C — the bookkeeping:** V13's and V14's revision notes and INDEX's state line (B-1, B-44, B-86; C-1,
    C-31, C-52 with C-52's "corrections" kept as it stands and C-31's word fixed), numbered after file s (940).
12. **Into A itself (no runner-up text needed):** a field for the junction in place of overloading `WorldRoute.b`
    (C's `join` or B's `byway` field); `Placement.approach` moved to a derived reading (or its persistence argued);
    H31's timing made one; the unused `onShore` and the manor's dead `inReach` row dropped or justified.

**Not to graft:** B's station re-lay and C's via re-lay (both compute host-route geometry for map-tier cards); B's
`inFrame` S4 destination (base:11703); C's weights 4 / raw 1 (lawful at the bound); C's watchpost `move`; B's OQ-2.

## 4. Owner questions and readings

All three put one reading to the owner — "the catalogue" = V14 §2.5's kind rows — and recommend yes; this judge agrees
and adds no reading of its own. C's OQ-2 ("their geography": the site's position or the world's around it) is a fair
second reading; A answers it in design (four kinds move, the world lays roads, no route bends) and the synthesis may put
C's question beside OQ-A1 with A's answer as the recommendation. B's OQ-2 is settled by the owner's own "autocorrects"
and should not be asked.

## 5. Record

- No file outside `docs/validation/sites-roads-2026-10-18/` and the lane scratchpad was written; no git command was run;
  the host repository was not touched.
- Scratch: `/tmp/claude-0/-home-user-maps-architecture/4291a60d-8240-5d49-a54e-2b2a213d093f/scratchpad/sites-roads/judge-1/`
  (`check.py`, `check-out.json`, `grep-samples.txt`, `notes.md`).
