# critic-2 — the Fable second look at draft t (sites, road access and the catalogue-driven autocorrect; J393)

Lane `sites-roads/critic-2` (fable; J393) — the completeness critic's second look, limited to whether round 1's
twelve gaps (C-1 – C-12, `critic.md`) were closed as specified by the fix round (`fix.md`) and whether anything left
open should have been fixed. Started 2026-10-18 10:38 UTC; written as it went (CHECKPOINT lines 10:38, 10:39, 10:40,
10:45 in `docs/lane-events.log`). Nothing applied; no git command run; the host repository untouched; nothing written
outside this folder and the lane scratchpad (`sites-roads/critic2/`: `check2.py`, the after-copies `after/`).

**Verdict: PASS-WITH-CORRECTIONS.** All twelve of round 1's gaps are closed exactly as the critic wrote them (§2):
every one of the eighteen in-place edits and the eleven new fragments 948 (a)–(k) carries the critic's text, and the
fix lane's two carried instances (945 (f), 946 (t)) are the same phrase for the same defect. Six things the second
look finds left open, one of them a hole in the knowledge rule round 1 passed (**S-1**, medium: the map's own road
to a DM-only site reaches a player's encounter crop as a way band, a surface the draft's "absent from every player
picture" does not name), the other five low (two test fixtures, a comment, a plug-in's reading on a standalone
world, a locality row's clause, the index's census of the gate's rows). Each is written out below as a fragment an
Opus seat can apply without judgement.

## 0. Inputs read whole, at the md5s read (`md5sum`, 10:38–10:49 UTC)

| file | lines | md5 |
|---|---|---|
| `docs/validation/sites-roads-2026-10-18/draft-t.md` (after the fix round) | 1 610 | `2642fddb013956e33a2071356cc8a733` |
| `draft-t.fragments.json` (138 fragments) | — | `66d102471989116cb52253a1c33f403f` |
| `critic.md` / `fix.md` / `verify.md` | 339 / 78 / 46 | `5392816a…` / `08a28785…` / — |
| `design-A.md` / `design-B.md` / `design-C.md` | 1 776 / 1 036 / 1 479 | read whole (`9d495fba…` / `a47697d1…` / `cc051133…` as the critic recorded them) |
| `judge-1.md` / `judge-2.md` / `judge-3.md` | 240 / 277 / 272 | read whole |
| `read-v14.md` / `read-v13.md` / `read-base.md` / `read-research.md` / `read-checks.md` | 980 / 1 013 / 880 / 562 / 1 268 | read whole |
| `README.md` (this folder), `STATUS.md` | 29 / 18 | read whole |
| the targets as they stand now | V13 4 465, V14 3 213, base 24 462, INDEX 259, SUMMARY 214, brief 212, README 31, gate 45 | V13 `d0de9ad8dadfeccc89ac86f2ea4d62f4`, V14 `70d8aa1b3c14e7cab6a135adbd3caa00`, base `1f871a01961de8a4994125d7bb1993be`, INDEX `4288179616d26f75b3d717deb23ed0ce`, SUMMARY `9d1422839ab63a3ec3bf6d13e3ea8265`, brief `fc2520709752ef77f397ba7d6a89c169`, README `2a4b54c89e47cc40bf0a7b3ffd619f07`, gate `b6c5be2a5d89fbd19035a3c606194fb9` — unchanged since the critic and the fix round |

The target passages were read **live and in context** at those md5s (not from the readers' stale cites): V13 §1.1
(:196–200), §1.3 (:336–342), §2.2 (:745–755, :768–778, :798–803), §2.5 (:1217–1221, :1233–1236), §2.6 (:1255–1266),
§3.8 whole as it stands (:1711–1792) and whole as it will read with every fragment applied (the after-copy), §3.9
(14) and (16) (:1976–1982, :1997–2003), §3.11's preamble and §3.11.1 (:2068–2092, :2108–2118) with the applied site
paragraph, P1–P5's output (:2470–2474), §3.16 (:2785–2789), §4.1 (:2844–2850, :2884–2890), §4.3 whole (:2916–2930),
§5.1 (:3012–3014), §6 (:3521–3525), §7 (:3575–3590, :3599–3604, :3626–3631), §10.2 (:4259–4262, :4271–4275); V14 §0
(:177–181), §1.3 (:296–299), §1b (:360–363, :462–464, :476–482), §2.2 (:543–546, :557–560), §2.5 (:870–875,
:898–925, :985–990), §2.9 (:1177–1180), §3.1 (:1205–1220), §3.4 (:1402–1421, :1435–1449), §3.6 (e)–(f)
(:1672–1700), §3.9 (g) (:1935–1946), E1 (4) (:1986–1992), E3 (5) (:2046–2056), E4 (b) (:2095–2105), §3.14
(:2136–2140, :2178–2182), §3.15 (:2208–2212), §4.2 (:2264–2268), §4.7 (:2375–2382), §4.8 (:2407–2410), §4.9
(:2422–2430), §6 (:2761–2765), §7 (:2836–2840, :2861–2865), §8 (:2893–2897), §9 (:2995–2999, :3008–3012), §10
(:3033–3037, :3045–3055), §11 (:3073–3076), §12 (:3110–3135); the base's head (:1–12), §4.9 (:8674–8682), §4.12
(:9716–9720), §7.3 (:11707–11711); INDEX (:12–16, :38–49, :184–188, :220–229); SUMMARY (:13–21, :207–214); the brief
(:76–83); README (:13–18); the gate (:28–45).

## 1. What was checked by script (the lane scratchpad `sites-roads/critic2/check2.py`, independent of the fix lane's)

- **All 138 fragments, not a sample:** each current text occurs **exactly once** in its live target at the line the
  draft names; every recorded md5 equals the target's; no two fragments of one target overlap; applied in the draft's
  order to copies of the eight targets, each current text is found once at its turn and each new text once after; no
  new text is already in its target; no duplicate id. 0 problems. The after-copies are in `sites-roads/critic2/after/`.
- **The draft equals the machine copy:** every one of the 138 headings in `draft-t.md` carries the same current text,
  new text, line and md5 as its JSON record (⏎ and `> >` decoded), and the 138 headings run in the JSON's order.
- **Every inserted or replaced table row is well-formed** (a cell count per row against its table's header, over the
  after-copies): the kind table's twenty-one rows six cells, V13 §1.1's engine row four, §2.6's lifecycle rows seven,
  the gate's and the brief's rows three, INDEX's and V14 §9/§10's rows their headers'. The script's four flags are its
  own false positives (941 (j)'s two tables share one walk-back, so each header was compared with the other's; 943 (o)'s
  `|` is a TypeScript union, not a table).

## 2. Round 1's twelve gaps — closed as specified?

Each of the critic's texts (`critic.md` §3) was compared with the draft's text where it landed. "Closed" means the
applied text is the critic's, word for word, at the place the critic named.

| gap | severity | where it landed | closed as specified? |
|---|---|---|---|
| C-1 W7 lays *exactly* / *only* the host's edges, three places | medium | 948 (a) V13:199, 948 (b) V13:1763, 948 (c) V13:1258 | **yes** — the three new texts are the critic's; read with 942 (a), (l) and (n) in the after-copy, W7 (8), (10), §1.1 and §2.6 now say one thing (an approach road beside the host's edges on either world, never one of them) |
| C-2 W7 (11) "never an end" against the approach road's end | medium | 942 (m) restated on V13:1783–1784 | **yes** — the current text widened by "never an end, " and the critic's new text taken whole; its *From:* names the restatement; in the after-copy (11) reads "never an end of a host route (the map's own approach road, (12), ends at it)" |
| C-3 the bridge fort's row against V13 §3.9 (16) | high | 941 (j)'s row; 948 (d) V13:2000 | **yes** — the row is `along · track`, `atCrossing 5 m · 5 [track]`, the critic's why; (16) proposes a bridge fort "at a river crossing of a route of class track or better (at a trail's crossing a watchpost; J393)" |
| C-4 `along` requires class ≥ `minClass` | medium | 942 (n) (a); 941 (i)'s comment; 946 (d)'s T-V13-57 | **yes** — (a) reads any public land route; the `approach.role` and `minClass?` comments are the critic's; T-V13-57 gains "a fort whose frame a trail crosses lies along the trail and gets no approach road;" |
| C-5 the way to a gate a kind may lack | medium | 945 (g); 946 (p); 946 (x), 947 (p); 945 (h), (j), 946 (u); carried to 945 (f), 946 (t) | **yes** — G5 (f) ends at the nearest entrance unit's point (the enclosure's `GateSite` where the policy has one), on ground part 0; the mine fixture and the reason clause in T-V14-35; M13 in the gate and the brief; the `inFrame` face's end in all three; the two carried instances are the same phrase for the same defect (nothing invented) |
| C-6 settlement frames in the A\* path | medium | 942 (n) (b) | **yes** — every cell inside a placed settlement frame's extent + margin impassable, the critic's words |
| C-7 an `inFrame` hideout | low | 946 (p) | **yes** — "an `inFrame` battlefield none" (a battlefield is `inFrame`-admitted, V14:845; its road access `none`) |
| C-8 "the full six terms" | low | 948 (e) V13:2111 | **yes**; J-V13.37's dated "six" (V13:3814) left, as the critic said |
| C-9 `SuitabilityContext.routes` | low | 948 (f) V13:771 | **yes** (taken, as offered); it overlaps no fragment (941 (b) is :772) |
| C-10 V14 §12's CONFIRMED line and PLAUSIBLE list | low | 948 (g) V14:3113, 948 (h) V14:3131–3132 | **yes** |
| C-11 the request census and the base's head | low | 948 (i) INDEX:48, 948 (j) base:5 | **yes** — the base's note is in file l's form (a blockquote under the title after a blank line; the draft's `> >` is the blockquote prefix, as its "How to read" says) |
| C-12 SUMMARY:213's count | low | 948 (k) | **yes** — twenty-six: K1–K13 and M1–M13 |

The fix round's three choices (`fix.md`) are right: item 948 as an item of its own (the critic offered either); the
record's item range 940–948 in 947 (a), (b), (c) and (r); "the way to the gate" kept as the step's name while G5 (f)
defines where it ends (one word, one meaning holds: the step is named, its end is defined); the owner's plain words
"a bridge fort onto the road's river crossing" kept (a track is a road in the owner's phrase; the kind row carries the
class). No gap was "taken" short, and none was widened beyond the critic's text.

## 3. The ten asks on the second look

| ask | finding |
|---|---|
| (1) every clause for every kind row, both worlds | holds; one standalone-world reading sharpened (S-4: `inReach` counts a placement's origin, so on a standalone world whose seats are proposals a graveyard's row never holds) |
| (2) §3.8's host-bound rules reconciled | holds after C-1/C-2: (8), (10), (11), §1.1, §2.6 and §1b.1 read one rule; the re-canonize untouched; nothing moves a bound route |
| (3) §3.11 extended; the DM's verbs and undo whole; the host-placed rule | holds; one locality row over-states what an `unplaceFrame` runs (S-5) |
| (4) the frame charter, the crop, patrols, the travel law, the lenses, the clerk | **one hole (S-1):** the crop. V14 E1 (4) (iii) lays "the charter's `roads` as way bands" from `charterFor`, which reads every route crossing the ring; the only audience sentence near it is E4 (b)'s "a player crop reads the player picture", which governs the polity items. 942 (n) says the DM-only site's road is "absent from every player picture and from the player audience of the DM's `mapFeed`" and T-V13-57 tests those two surfaces only; a player's crop at a point beside a hidden temple's track lays the track as a band (and E3's scenes and the VTT export carry it). Item 133 (e)'s secret leaks through the one surface the owner's own words name for encounters ("a place clicked such as on the road"). |
| (5) determinism, identity, lifecycle, units, performance, the failure ladder | hold; a bridge fort's crossing-point candidate is never a skipped water cell (a route's polyline stays on land cells, T-V13-15; a water leg's cells are water cells, V13:1722–1723), so the bend's filter is right as written — the test should say so (S-2) |
| (6) tests, decisions, BCRs, the M0 rows, INDEX, SUMMARY, the brief, README | hold; two of the four bending kinds have no bend fixture in T-V13-58 (S-2); INDEX's census of the gate's model rows stops at M11 while the gate gains M12–M13 (S-6) |
| (7) one word one meaning; door 1; no simulator design; no hour; no random | hold; one comment narrows `minClass` to approach roads while W7 (12) (c)'s report reads it for an `along` kind too (S-3) |
| (8) every current text once; every insertion well-formed | holds (§1) |
| (9) owner questions | Q5 the one true owner decision, with its recommendation and both consequences; agreed. No reading of the owner's words is re-judged by the draft or by this record |
| (10) anything else a Fable architect would want | §5's observations, none a correction here |

## 4. The corrections (each a fragment, written out; the apply lane re-verifies every current text at apply)

Severity as the critic's: **medium** = a landed rule contradicted or a mechanism under-stated so a test cannot be read
from the text; **low** = a fixture, a comment, a count. "Fragment n" is draft t's; a line is the live target's at §0's
md5s. New fragments are numbered 949 (a)–(b), to be appended as item **949. The Fable second look's corrections** (then
the record's item range in 947 (a), (b), (c) and (r) reads 940–949 — four one-token edits, as the fix round made for 948)
— or folded into the items they correct, the apply lane's choice; the texts are the same either way. Every needle below
was counted in the draft's fragment new texts and in the live targets (`grep -c -F`, `str.count`): each **1**.

### S-1 — **medium** — the map's own road to a DM-only site reaches a player's encounter crop as a way band; the knowledge rule and its tests name the player picture and the map feed only

*Where:* V14 §3.10 E1 (4) (iii) (V14:1991), which no draft fragment touches; 942 (n)'s knowledge sentence; 942 (h)'s
veil cell; 946 (d)'s T-V13-57; 946 (p)'s T-V14-35. *What:* `charterFor` lists every route crossing the crop frame's
ring (P4 (6)); E1 (4) (iii) lays them all as `fixed` faces; a player crop (V14 E4 (b): "a player crop reads the player
picture") reads the player picture for the polity's items and nothing is said of the bands; the approach road's
`knownTo` is its card's (942 (n)), so the band of a DM-only site's track would draw for the players, and E3's scenes
and the VTT export carry the crop's faces. *Fix:* one V14 fragment on E1 (4) (iii), and the three draft texts that
claim or test the secrecy name the third surface.

**949 (a).** Volume 14 — §3.10 E1 (4) (replacement). Target: `docs/volumes/V14-sites.md`, line 1991.
*Current text:*
>    of their class (`corridorUnion` over the route's polyline at its class width), (iv) S12a's land use over the frame
*New text:*
>    of their class (`corridorUnion` over the route's polyline at its class width; a route in the audience the crop is read for, as E4 (b)'s player crop reads the player picture — the map's own approach road to a DM-only world site, V13 §3.8 (12), is laid for the DM's crop and absent from a player's, and so from E3's scenes and the VTT export made from it; J393), (iv) S12a's land use over the frame
*Reason:* the crop is the third surface a DM-only site's road must not reach (item 133 (e)); E3's scenes and the VTT
export derive from the crop's faces, so the omission at (iii) covers them.

**942 (n), one sentence changed.** In fragment 942 (n)'s new text replace
> absent from every player picture and from the player audience of the DM's `mapFeed`
with
> absent from every player picture, from a player crop's way bands and the scenes exported from it (V14 E1 (4) (iii), E3) and from the player audience of the DM's `mapFeed`

**942 (h), the veil cell.** In fragment 942 (h)'s new text replace
> **veil:** its `knownTo` its site card's — a DM-only site's road DM-only
with
> **veil:** its `knownTo` its site card's — a DM-only site's road DM-only, absent from a player picture and from a player crop's way bands

**946 (d), T-V13-57.** In fragment 946 (d)'s T-V13-57 row replace
> the road to a DM-only site is absent from a player picture and from the player audience of the map feed
with
> the road to a DM-only site is absent from a player picture, from the player audience of the map feed and from a player crop's way bands (V14 E1 (4) (iii))

**946 (p), T-V14-35.** In fragment 946 (p)'s T-V14-35 row, after
> a crop at a tollhouse reads the profile `road` with the road's band inside its frame;
insert
> a player crop beside a DM-only temple's approach road lays no band for it while the DM's crop does, and the VTT scene exported from the player crop carries none;

### S-2 — **low** — T-V13-58 bends two of the four bending kinds only; the bridge fort's and the mine's bends have no fixture

*Where:* 946 (d)'s T-V13-58 (a tollhouse onto its road; a hideout off it). *What:* 941 (j)'s bending set is four kinds
(J-V14.63); "every new behaviour has a test" (the row's own reason) wants each bend on a fixture; the bridge fort's
target is a point on a route's polyline over a reach, which the candidate filter ("skipping a water cell") must admit —
it does, since a land route's polyline stays on land cells (T-V13-15) and only a water leg runs over water cells (V13
§3.8 (2)); the test should say so once, or a builder will read the filter against the bend. *Fix:*

**946 (d), T-V13-58.** In fragment 946 (d)'s T-V13-58 row, after
> a hideout dropped 150 m from a road is bent beyond 300 m;
insert
> a bridge fort dropped 300 m from a track's river crossing is bent onto the crossing point on the route's polyline (`atCrossing`: a land route's polyline lies on land cells, T-V13-15, so the candidate is no skipped water cell) and a mine dropped 500 m from a W5 ore resource site onto its `at` (`onOre`);

### S-3 — **low** — 941 (i)'s `minClass?` comment narrows the cell to approach roads, but W7 (12) (c) and `W_SITE_NO_ROAD_ACCESS` read it for an `along` kind too

*Where:* 941 (i) (V14 §2.5's `SiteKindRow.approach`); 942 (n) (c) ("the nearest public route of its class"); 942 (t)
("the nearest route of its kind's class"). *What:* after C-4 the tollhouse's and the bridge fort's `minClass` cells
(`road`, `track`) are read only by the report that names the nearest route of that class when no route meets the frame;
the comment says "the least class an approach road joins" and nothing else, so the two `along` rows' cells read as
dead. *Fix:*

**941 (i), one comment changed.** In fragment 941 (i)'s new text replace
> minClass?: 'highway'|'road'|'track'|'trail' /* the least class an approach road joins */
with
> minClass?: 'highway'|'road'|'track'|'trail' /* the least class an approach road joins; for an `along` kind the class whose nearest route `W_SITE_NO_ROAD_ACCESS` names (V13 §3.8 (12) (c), §7.5) */

### S-4 — **low** — `inReach` reads "a settlement placement's origin", which no standalone world has until a frame is placed

*Where:* 941 (j)'s plug-in sentence (the graveyard's `inReach 20 000 m · 1`). *What:* on a standalone world the seats
are W6's proposals until a frame is placed (V13 §3.7's output; W7 (1)), and on a host-bound world a bound seat's
position is the host's; the row's meaning ("the dead lie near the living") is the seats', so the preference reads
cost 1 on every standalone graveyard before the first frame is placed. *Fix:*

**941 (j), one clause changed.** In fragment 941 (j)'s new text replace
> `inReach` — a settlement placement's origin within `tolM` (a reading, no target)
with
> `inReach` — a W7 seat (V13 §3.8 (1): a placement's origin, a host seat's position, a final proposal's cell) within `tolM` (a reading, no target)

### S-5 — **low** — §4.3's site row runs "P1's site form → W7 (12) → P4 → P5 → W9" for an `unplaceFrame` too

*Where:* 943 (s) (V13 §4.3). *What:* the row names `unplaceFrame` among its edits; an unplacement measures nothing and
emits no charter — W7 (12) says "`unplaceFrame` tombstoning it" and the existing `unplaceFrame` row (V13:2914)
tombstones "the placement, charter and glyph"; a tester reading the site row alone would expect a dry run. *Fix:*

**943 (s), one cell changed.** In fragment 943 (s)'s new text replace
> → P4 (the site's charter, its roads among it) → P5 → W9 (the site's glyph) |
with
> → P4 (the site's charter, its roads among it) → P5 → W9 (the site's glyph); an `unplaceFrame`: no P1, no P4 — the approach road tombstoned with the placement, the charter and the glyph (V13 §3.8 (12)) |

### S-6 — **low** — INDEX's census of the gate's model rows stops at M11; file t adds M12–M13 to the gate (946 (w)–(x)) and to the brief (947 (p)), and SUMMARY's count (948 (k)) now says twenty-six

*Where:* INDEX:46 ("the gate's rows K1, K5, K6, K9 and M1–M11 reserved BASE at M1's API pass"), file k's census, which
no draft fragment touches (947 (c)–(k) and 948 (i) are lines 14, 40, 48, 71, 72, 186, 222, 228). *Fix:*

**949 (b).** The index — §1 The product map (replacement). Target: `docs/volumes/INDEX.md`, line 46.
*Current text:*
> M1–M11 reserved BASE at M1's API pass, the mechanisms STAGED with their milestones); 0 uncarried, 0 duplicated, no
*New text:*
> M1–M11 reserved BASE at M1's API pass, the mechanisms STAGED with their milestones; the gate's M12–M13 are file t's two "do not foreclose" rows, item 946, with no file-k item); 0 uncarried, 0 duplicated, no
*Reason:* the census names every gate row and how it was carried; the two new rows are file t's, not file k's.

## 5. Observed and left (no correction here; each older than J393, a design choice the J- rows record, or outside file t's reach)

1. **`role` under two enumerations.** `SiteKindRow.approach.role` is `'along'|'any'|'none'` (a policy) and
   `SiteApproach.role` is `'along'|'road'|'none'` (a reading); the records differ and `along`/`none` mean the same in
   both, but a reader meets `any` and `road` as the same field's values. A rename would ripple through 941 (i), (j),
   942 (n), (u), 946 (d) and the clause table; not a change for a second look to make. The coherence pass may rename
   the row's field `policy`.
2. **An `inFrame` tollhouse or bridge fort** (admitted in `hinterlandFar`, V14:846) takes a `driveway` face and no
   coherence term or bend (941 (j)'s "an `inFrame` site `roadAccess` alone"; J-V14.60, J-V14.61). The owner's "their
   geography in the world map" names the world placement, which an `inFrame` site has none of; a session decision,
   vetoable, recorded. A tollhouse in a hinterland reads oddly but is the DM's drop.
3. **W7 (5)'s "an edge both of whose seats are rank 0 is `track`"** had sites as its rank-0 seats; with 942 (j) a
   placement's frame tier is the only rank 0 left. Pre-existing and harmless (the critic's observation 2).
4. **The base's §4.9 sentence (945 (j)) uses V14's words** "the entrance unit's point" inside the base, cited to V14
   §3.9 (g). The base reads V14's term through the cite; the coherence pass may prefer "the reservation's entrance".
5. **`FrameCharter.roads[].forced` on a site frame** ("a forced gate pick of S3 (4)") reads nothing: no S3 runs on a
   site document (V14 §3.1), and G5 (f)'s way is the site frame's road-to-entrance rule. Not a contradiction; a
   comment the coherence pass may add.
6. **`WORLD-17`'s fallback** when W7's work limit is reached (V13 §3.17: "W7 drops the remaining lowest-rank edges"):
   an approach road's A\* is bounded by `maxRoadM`'s ellipse, so the budget is structural; no pre-decided fallback is
   stated for (12). Within SP-W7's row; observed.
7. **The critic's five observations** (V14 §3.4 (c) vs §2.2's `ground` comment; the base's §7.3 placement row and §6.3
   anchor; J-V13.37's dated "six"; `knownTo` and `mapFeed`) stand as the critic left them.

## 6. Readings of the owner's words — where this seat differs

Nowhere that must be the owner's. The draft's clause table (item 940) and the critic's sharpening (C-4: "road access
where appropriate" is met by any public land route that reaches a site) are the reading this seat holds. S-1 is not a
reading but the owner's rule of item 133 (e) applied to the surface item 132 (e) names ("a place clicked such as on
the road"). Q5 (the catalogue = the kind rows, recommended yes) is the one owner question; the six "considered and not
put" are rightly the session's.

## 7. Verification of this record

- Every needle of §4 was counted: in the live targets V14:1991 and INDEX:46 (each **1**, by `grep -c -F`); in the
  draft's fragment new texts 941 (i), 941 (j), 942 (h), 942 (n), 943 (s), 946 (d) (×2), 946 (p) (each **1**, by
  `str.count` over `draft-t.fragments.json`). 949 (a) overlaps no fragment (no draft fragment targets V14 §3.10);
  949 (b) overlaps none (INDEX's fragments are lines 14, 40, 48, 71, 72, 186, 222, 228).
- The 138 fragments' script run, the draft-equals-JSON check and the wrapped-row check are reproducible from
  `sites-roads/critic2/check2.py` against the targets at §0's md5s.
- Landed 2026-10-18 (fable; J393).
