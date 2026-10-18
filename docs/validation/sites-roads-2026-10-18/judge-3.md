# judge-3 — the three sites-roads designs judged (J393)

> Designed on Opus 5.5 under the owner's staffing word of 2026-10-18 (J394); Fable critique closes the run (lane sites-roads/critic)

- **Lane:** `sites-roads/judge-3` (opus; J394, Fable-critiqued). Judge 3 of three independent judges; the other judges'
  records were not read. Nothing is applied by this seat.
- **Started:** 2026-10-18 09:39 UTC. Written as it goes.
- **Inputs (md5 at the read, `md5sum`):** README `eabd68cd`; design-A.md `9d495fba` (1 776 lines) + design-A.fragments.json
  `cfe477ae`; design-B.md `a47697d1` (1 036 lines); design-C.md `cc051133` (1 479 lines) + design-C.fragments.json
  `a0c3c4a8`; read-v14 `6d127498`, read-v13 `64637654`, read-base `33635e21`, read-research `d97b4fcc`, read-checks
  `28609ac2`.
- **Targets as they stand now (09:40Z):** V13 `d0de9ad8` (4 465 lines), V14 `70d8aa1b` (3 213), base `1f871a01` (24 462),
  INDEX `42881796`, SUMMARY `9d142283`, file s `3b83b3af`.

## 0. Working notes (written as read; superseded by §1–§4 below)

- 09:41 — design-A read whole (1 776 lines). Fragment check by script over all 96 (`judge-3/bin/verify.py` in the
  scratchpad): each current text exactly once in the live target at the line named, every file's fragments applied
  in order to copies with 0 misses and each new text once after. Notes: catalogue-first; five kind-row columns;
  `routed` retired; sites no longer W7 seats on a standalone world (A-36, A-48 rewrite V13 §3.8 (1)); approach road
  `WorldRoute` origin `approach`; `siteKind` term; bend for four kinds; `Placement.approach`; anomalies
  `siteIncoherent`, `noRoadAccess`; H31 optional; M12; one OQ. Internal slip: H31's timing reads "with M-W2, after H19"
  in §1.4 (m) but "after M-W3, after H19" in A-76 and "H18–H20 and the optional H31 after M-W3" in A-88. LANDED line
  says V14 31 fragments; the table has 32 (A-1..A-32).
- 09:43 — design-B read whole (1 036 lines); all 93 fragments exact once at their lines, in-order apply clean (B-92
  targets the repository `README.md`, md5 `2a4b54c8`). Pipeline-first; keeps `routed` (a W7 seat) beside a
  `roadAccess` row {join, class, reachM, correction snap|offer|report}; byway `WorldRoute` origin `byway`; host-bound
  `routed` site a station of a host edge within 500 m / 1.1 (a dated lay version); weight 3, raw 2/1 (6 > 4 unlawful;
  3 lawful) — arithmetic sound; only two `snap` kinds; the expectation is road relation only (no ore, crossing-as-
  geography only for bridge fort); OQ-1, OQ-2. Extra scope: `placeFrame` `{ site }` (B-31), T-V13-12's count (B-37),
  §3.11.1's "six terms" count (B-20); §0–§1 cites at the pre-J392 md5s (stated in its cite form).
- 09:43 — design-C read whole (1 479 lines); all 56 fragments exact once, apply clean. Coherence-first; `roadAccess`
  six values + `expect` + `autocorrect` move|bring|hold + `autocorrectM`; site trail (origin `siteTrail`, excluded from
  `existingRoute`/`connectivity`/patrols/siting terms); via re-lay of a host route through a `served` site within
  1 000 m; the site terminal (J-V13.114); entrance way G5 (f). **Defect:** weights siteAccess 4 / siteExpect 4 with raw
  1 give total 4 = `lawfulMax` 4, which is LAWFUL under V13's `lawful = total ≤ lawfulMax` (V13:748, :2102), so a
  single unmet access or expectation never makes a placement unlawful and the `move` autocorrect never fires (its own
  T-V13-57 toll-house clause contradicts its law); C-11's text claims the opposite. **Defect:** C-52 rewrites file s's
  INDEX state line "the Fable retrovalidation's corrections" to "…autocorrects" (a rename leak). C-31 keeps "approach
  way" after renaming it "entrance way".
- 09:44 — read-v14 (980), read-v13 (1 013), read-base (880), read-research (562), read-checks (1 268) read whole.

---

## 1. The owner's words — this judge's reading, where it differs

The owner's words (J393) are not re-judged. The README's reading is taken as the frame; this judge differs in three
places, each of which bears on the scores:

1. **"to meet the coherence expectation" is broader than road relation.** V13's *coherence* is the placement law's
   geographic fit (`CoherenceCost`: coast, river, relief …). Read with "their geography in the world map", the
   expectation is the kind's geographic fit — a mine on its ore, a bridge fort on a road's river crossing, a toll house
   on its road, a hideout off the roads — of which road relation is one part. Designs A and C read it so; design B reads
   it as road relation only (B §0.7: "one new term … whose raw cost is 0 when the kind's access row is met"), so B's mine
   dropped off its lode is never corrected at a point drop.
2. **"autocorrects" is decided by the owner's word**, in the form the base already gives an infeasible declaration
   (item 101 R2: bent to the nearest lawful one and named in one line), with the DM's `keep` one click away and the
   settlement-first correction's "nearest lawful placement offered" beyond the radius. A and C decide it so (A's J-A.6,
   C's J-V13.109); B puts it to the owner as OQ-2. B's question is answered with a recommendation, so it is no deferral,
   but it asks the owner what his own word already says.
3. **Whether the world may re-lay a host route through a site** is a session decision, vetoable, not an owner question:
   V13 §3.8 (10) already admits a *this happened* re-lay as a dated lay version the host may adopt, and (11) already says a
   dropped site "changes a route's geometry and effort" (V13:1783) while giving no mechanism (read-v13's gap). B (a
   station within 500 m and 1.1 × effort) and C (a via re-lay within 1 000 m) supply the mechanism; A removes the
   sentence and bends no route ("a bound route's geometry is the host's lived network"). All three are inside the
   delegation; A's is the most conservative toward the host and is preferred here.

**The one reading that must be the owner's:** "the catalogue" (all three put it as OQ-1, recommending V14 §2.5's kind
rows). Agreed.

## 2. Fragment checks (fragment_exactness)

Every fragment of every design was checked by script (`judge-3/bin/verify.py` in the lane scratchpad; outputs
`verify-A.txt`, `verify-B.txt`, `verify-C.txt`), not only six: the current text's count in the live target (V13
`d0de9ad8`, V14 `70d8aa1b`, base `1f871a01`, INDEX `42881796`, SUMMARY `9d142283`, brief `fc252070`, gate `b6c5be2a`,
repository README `2a4b54c8`), the line it starts at, then every file's fragments applied in order to a copy (each
current text once at its turn, each new text once after). A second script (`bin/rows.py`) compared every inserted table
row's cell count with its table's.

| design | fragments | current text exactly once at the named line | in-order apply | inserted rows well-formed | sampled `grep -F -c` (first line) = 1 |
|---|---|---|---|---|---|
| A | 96 (V14 32, V13 48, base 3, INDEX 6, SUMMARY 4, brief 1, gate 2) | 96 / 96 | 0 misses | yes (every mismatch is a new table after a blank line) | A-1 (V14:179), A-8 (V14:907), A-13 (V14:1444), A-36 (V13:750), A-48 (V13:1714), A-57 (V13:2115), A-81 (base:8678), A-96 (gate:45) |
| B | 93 (V13 43, V14 40, base 2, INDEX 4, SUMMARY 1, brief 1, README 1, gate 1) | 93 / 93 | 0 misses | yes | B-17 (V13:1786), B-21 (V13:2100), B-22 (V13:2115), B-63 (V14:1942), B-85 (base:9718), B-92 (README:16) |
| C | 56 (V13 30, V14 20, base 1, INDEX 3, SUMMARY 1, gate 1) | 56 / 56 | 0 misses | yes (C-14, C-20, C-28 rows match their 8-, 6-, 5-cell tables) | C-5 (V13:748), C-11 (V13:1157), C-16 (V13:1786), C-18 (V13:2115), C-35 (V14:921), C-39 (V14:1461), C-52 (INDEX:14), C-56 (gate:45) |

Content defects found in the new texts (not in the matching):
- **C-52** rewrites file s's own words on INDEX:14: "the Fable retrovalidation's corrections to volumes 13 and 14" becomes
  "the Fable retrovalidation's **autocorrects** to volumes 13 and 14" — a rename leak into a landed record.
- **C-31** (V14's revision note) says "(e) lays the **approach way** from the station" after C's continuation note (1)
  renamed it the *entrance way*.
- **A**'s LANDED line counts V14 31 fragments; its table and JSON carry 32 (A-1 … A-32). The record is right; the log line
  is off by one.
- **B**'s fragments are written as single-backtick inline spans wrapping texts that themselves hold backticks; they parse
  (the span runs to the line's last backtick) but the synthesis should carry them in A's or C's fenced/JSON form.

## 3. Claims checked against the texts as they stand now (base_coherence)

| design | claim | the text now | verdict |
|---|---|---|---|
| A | "mirrored, never computed" (V13:1766) | V13:1766 "9. **The lived network, mirrored, never computed.**" | true |
| A | host-placed site never re-sited (V14:1416–1417) | V14:1416–1417 | true |
| A | `setPlacement` admits `accept: ['unlawful']` (V13:2849) | V13:2849 | true |
| A | a destination added re-derives S3 (base:11703) | base:11703 "a gate-count change (a destination added or removed) re-derives from the stage that picks those gates: S3" | true |
| A | the outside plot's `driveway` face (base:8662), the decoration's `path` face (base:8678) | base:8662, base:8678 | true |
| A | an edge is classed by its higher seat's rank, so a site seated by a capital draws a highway (V13:1748) | V13:1748 "the first `classes.primaryShare` of land edges by the higher seat's rank are `highway`" | true |
| A | "the gatehouse astride the road" (V14:1572); `cliffFace` at slope ≥ 30 % (V14:1358); the `country` row excludes manor (V14:852); fine cells 250/500/1 000 m (V13:997–999) | each at the line named | true |
| B | V13 §3.11.1 says "six terms" and lists seven (B-20) | V13:2090 "whose six terms are" over seven rows | true |
| B | T-V13-12 "four fixtures, one per anomaly kind" against eight kinds | V13:3577 | true |
| B | W7 (11) already says a dropped site changes a route's geometry (V13:1783); T-V13-43's "detour only" (V13:3602) | both | true |
| B | J-RR.21 "a `WorldRoute` only for a host-named edge" (`research/sf/fp-realm-review.md:560`) | line 560 | true |
| B | V14 G8 (e) preselects "move the site" | V14:1906 | true |
| B | an `inFrame` road-class site's gate as a new S4 `worldSite` destination re-routes "only the arterials whose destination moved" (B-63, B-80, T-V14-34 (c)) | base:11703: a destination **added** is a gate-count change that re-derives S3 for stage 1 | **false** — the drop re-derives S3 and breaks bar 6's locality that T-V14-34 (c) asserts; A (J-A.8) and C (J-V14.59) avoid it for exactly this reason |
| B | the weights: `roadAccess` 3, raw 2 unlawful (6 > 4), raw 1 lawful (3 ≤ 4) | V13:748 `lawful = total ≤ lawfulMax`; V13:1158 `lawfulMax` 4 | sound |
| C | `spur` names a terrain spur and a polygon spur (V13:1455, V13:3935, base:5469) | each holds the word | true |
| C | *detour* is the host's bypass (V13:1768; J-V13.99 at V13:3876) | both | true |
| C | `toleranceM` is a glyph tolerance (V13:982); `routeToleranceM` (V13:1095) | both | true |
| C | `requestCharter` runs P4 only (V13:2919); the drop row reads `routed` "at their next run" (V14:2377) | both | true |
| C | `moveTown` lives on `W_EDIT_DOSSIER` only (V13:2886) | V13:2886 | true |
| C | `solitude — settlementFar × (1 − routeNear)` at V14:987 | the formula is at V14:990 (V14:987 is `routeNear`) | cite off by three lines |
| C | "siteAccess 4 · siteExpect 4: one wholly unmet access or expectation alone reaches `lawfulMax` and is unlawful, as any coast error is" (C-11; §1.3) | V13:748 and C's own C-18: `lawful = total ≤ lawfulMax`; 1 × 4 = 4 ≤ 4 | **false** — a single unmet row is LAWFUL, so the `move` autocorrect never fires on one failing term and C's own T-V13-57 ("a toll house 1 km beside a road lands within `site.onWithinM` of it") contradicts its law; coast errors are unlawful because raw 2 × 3 = 6 > 4 (V13:2094, C13-26), the precedent C cites |
| C | border posts' kinds "agree" with V13 §3.9 (16) (C §4) | V13 §3.9 (16): "a watchpost on open ground" | **false once the weight is fixed**: C's watchpost expects `overlook` ≥ 0.25 with `move` 500 m, so an accepted open-ground border post would be moved off its crossing (A's `post` group, overlook *or* on the road, admits it) |

## 4. Scores

0–10 each; total the sum (50).

| design | completeness | base_coherence | minimality | owner_rules | fragment_exactness | total |
|---|---|---|---|---|---|---|
| A (catalogue-first) | 9 | 8 | 6 | 9 | 9.5 | **41.5** |
| B (pipeline-first) | 7.5 | 6.5 | 7 | 7.5 | 9 | 37.5 |
| C (coherence-first) | 8.5 | 4.5 | 7.5 | 6.5 | 7.5 | 34.5 |

### A — strengths
- The only design that answers every clause for **every one of the 21 kinds** on four separate axes: road access, the
  role on the network, a geographic coherence expectation, and a correction with its radius. Its rows' arithmetic is
  right against `lawfulMax` 4 (cost 5 is unlawful and cost 1/3 is a preference: a fort with no height scores 4,
  lawful). Its preference/expectation split means a camp off a road raises no anomaly pin.
- **No route is bent to a site** (J-A.1). That settles read-v13's gap (W7 (11) asserts a geometry change with no
  mechanism) in the direction W7 (9)–(10) and J-RR.17 lean, and no host route, `timeDelta` or `routeFacts` row moves for
  a map-tier card. It also catches a real landed defect the others miss: a rank-0 site seated beside a capital pulls an
  edge classed by the higher seat (V13:1748).
- **One word, one meaning** is the most careful of the three: *bend* (V14's own `bend.site.*` family), *approach road*
  (the base's phrase, base:13986), *along* (V13's "a position along a route"). It shows how *snap*, *spur*, *station* and
  the bare *expectation* collide with existing words.
- The `inFrame` access uses the hinterland's own `driveway`/`path` faces (base:8662, :8678) and never a new S4
  destination, so the base's gate-count rule (base:11703) holds.
- Tests in each volume's own form (T-V13-57/58, T-V14-34/35, three extended rows). Lifecycle and identity rows for every
  new field. `gradeShift.trail` fills a real table gap (no `trail` row at V13:1123). Performance rows are given with the
  work counted.

### A — weaknesses
- **The least minimal.** It retires `routed` and unseats sites from W7 (1) (A-36, A-38, A-48, A-78, A-82, A-84/85 and
  J-V14.43's dated note). That reverses landed session rules (SW-20; J-V14.37/43) the owner never asked to touch, and it
  needs the most fragments of the three (96), the eleven test plug-ins and a second registry.
- **H31's timing is inconsistent.** §1.4 (m) says "with M-W2, after H19"; A-76 says "after M-W3, after H19" with the
  dependencies "M-W2; H19"; A-88 says "H18–H20 and the optional H31 after M-W3".
- **The frame side leans on a road between two given points** (G5 (f)'s new step: one way from a ring station to a gate by
  S4's router). M0 defers that ("two-point roads" in M0-c-03's `defers`, read-checks I3). A's M12 covers only the
  `inFrame` face origin; B's and C's M12 cover the gap A leaves.
- **Bookkeeping left to the synthesis:** the revision notes under the titles, INDEX's state line, the README row, and
  the owner-rule rows in V13 §1.3 and V14 §1.3.
- **The world-first sentence at V13:2078** ("P1 is **not** run, there is no frame to measure") is left beside A-56's
  site-form clause at V13:2070; B-19 and C-17 amend 2078. The existing `requestCharter` locality row (V13:2919) still
  says "no P1".
- **No knowledge rule for an approach road:** nothing says a DM-secret site's road is DM-only. C states it.

### B — strengths
- **The most faithful to the landed pipeline.** `routed` keeps its meaning as a W7 seat; W7 (11)'s sentence gets the
  mechanism it lacked (the station, as (10)'s dated lay version, bounded at 500 m and 1.1 ×), so the landed text stands.
- It catches two real gaps in V13 the others leave: "six terms" over seven rows (B-20), and T-V13-12's count. It also
  supplies the read-v13 gap of a `placeFrame` site form (B-31), at the cost of minimality.
- **Complete bookkeeping:** revision notes for V13 and V14, owner-rule rows in V13 §1.3 and V14 §1.3, INDEX's state line,
  the README row. B-34's host-bound locality row: a re-laid host edge carries its byways.
- **M12 pins a frame-end at a ring point** (BCR-V13-30 read for a site frame). That is the model row a charter road at a
  site's ring needs.

### B — weaknesses
- **The expectation is road relation only.** A mine off its lode, a fort off its height, a watchpost off its rise: none
  is measured or corrected at a point drop. "Their geography … coherence expectation" is half-answered. Only two kinds
  autocorrect (toll house, bridge fort).
- **The `inFrame` road-class join contradicts the base.** A new `worldSite` destination at the drop is a gate-count
  change that re-derives S3 (base:11703), so T-V14-34 (c)'s locality bar is false (B-63, B-71, B-80, B-84, B-85).
- **`station`** names a site lying on a host edge, beside V13's time `stations` and the charter row's station (V13:726,
  :754). That is one word with two meanings.
- **Two fields carry the road rule** (`routed` and `roadAccess`). Their precedence ("read only where seating or the
  station fails") is an extra rule the reader must hold.
- OQ-2 asks the owner what his word "autocorrects" says. §0 and §1 cite the pre-J392 md5s. That is stated, but the line
  cites are stale.

### C — strengths
- **The most economical** (56 fragments). It is the only design with a **reason-record table for the clerk** (§1.9a: the
  cost, the bend, the offer, the trail, the via re-lay, the entrance way, the anomaly, each with its sentence).
- **Site trails are kept out of the readers that price roads** (`existingRoute`, `connectivity`, patrols, the simulator
  feed, V14's siting terms; C-36 on `routeNear`), so a hermitage's own path never lowers its solitude.
- **A road's knowledge follows its site** (`knownTo` the card's), so a DM-secret site's trail is absent from a player
  picture.
- **The site terminal (J-V13.114):** a leg ends at the site's origin, not the fine-cell centre, so it crosses a 120 m site
  frame's ring.
- **`requestCharter` gains `accept: ['unlawful']`** (C-21), so the DM's `keep` is recorded on the event that replays it.
- Its M12 is the precise model row: S4's two-point road (M0-c-03's deferral) and a way's end at the frame ring.
- `editTable` validation keeps the kind columns consistent with `routed`.

### C — weaknesses
- **Its central law is arithmetically broken.** At weights 4 and 4, one unmet access or expectation totals 4, and 4 ≤
  `lawfulMax` 4 is lawful (V13:748; C-18 itself). No single-row miss is unlawful, so the `move` kinds never bend, and its
  tests contradict its law (§3).
- **The watchpost conflicts with V13 §3.9 (16)'s "a watchpost on open ground".** Its `move` to a height is masked only by
  the weight defect.
- **C-52 corrupts file s's INDEX wording**; C-31 keeps "approach way".
- **The via re-lay bends host roads by up to 1 km** (a 2 × `autocorrectM` window) for map-tier cards. That is lawful under
  (10), but it is a large silent-by-default host-geometry change (`accept` is the default on `W_ROUTE_VIA_SITE`).
- The hideout, mine and hermitage are `hold`, so the owner's autocorrect reaches only three kinds. OQ-2 again asks the
  owner what his word says. One cite is off (V14:987 for `solitude`).

## 5. The winner and the grafts

**Winner: design A.** It is complete, coherent with V13's lawful bound and the base's gate-count rule, and careful with
words. Its cost is minimality, which the synthesis can weigh. The grafts below are the specific pieces of B and C the
synthesis must take:

1. **The `requestCharter` accept clause** (C-21, V13:2846): `accept?: ('unlawful')[]` on a site subject, so A's `keep` at
   a drop is an event field that replays.
2. **The world-first sentence** (B-19 or C-17, V13:2078): "P1 is **not** run for a frame … (for a site subject … P1's site
   form runs first)", so V13:2078 agrees with A-56 at V13:2070. Also C-23's clause on the V13:2919 `requestCharter`
   locality row, in A-66's terms.
3. **The count of P1's terms** (B-20, V13:2090): the text says six over seven rows. With A's `siteKind` it must state the
   true count (seven frame terms, the site form's two).
4. **The two-point-road model row** (C-56's M12 text, or B-93's frame-end pin; numbered M13 beside A's M12): S4's router
   admits a way between two given points (a frame-ring station and a gate) and a way's end at the ring carries its
   bearing. A's G5 (f) step needs it, and M0 defers it (M0-c-03 `defers`).
5. **The clerk's reason records** (C §1.9a): one row each for a site's cost, the bend, the offer, the approach road (W7
   (6)'s form: ends, class rule, cost, three contributions), the frame way to the gate and each anomaly, written by the
   fold that made it. Recast in A's words (bend, approach road, along).
6. **Knowledge** (C-16's `knownTo` clause): an approach road takes its site card's `knownTo`, so a DM-only site's road is
   DM-only and absent from a player picture; it enters A's (d) 5 and T-V13-57.
7. **The bookkeeping fragments in B's forms:**
   - the revision notes (B-1 at V13:116, B-44 at V14:74, wording as A's);
   - the owner-rule rows quoting J393 verbatim in V13 §1.3 (B-2, V13:340) and V14 §1.3 (B-45, V14:298);
   - INDEX's state line (B-86, or C-52 without its "autocorrects" corruption);
   - the repository README's owner-rules row (B-92).
8. **The host-bound locality row** (B-34, V13:2927): `bindSeat` … `genesis`, `network` → "then W7 (12) over the approaches
   those edges carry", so A's after-each-window re-lay has its §4.3 row.
9. **Drift row 13** (B-29, V13:2693), recast: an approach road that joined a removed route re-joins the nearest route of
   its class or its site reads `noRoadAccess`, so T-V13-21's row asserts A's (d) 4.
10. **Table validation** (C §1.3's `editTable` rule, recast for A): `correction: 'bend'` is refused unless a row costs more
    than `lawfulMax`, and `bendM` is 0 under `report` (`refuse.table.invalid`).

Not grafted, and why:
- **B's station and C's via re-lay:** A's no-bent-route rule is preferred (§1 (3)).
- **B's `inFrame` S4 destination:** it contradicts base:11703.
- **C's weights:** they are broken.
- **B-31's `placeFrame { site }` and B-37's T-V13-12 count:** both are real gaps but not J393's. The synthesis may carry
  them as observations.
- **B's OQ-2 and C's OQ-2:** the owner's word decides them.

**The synthesis must also settle A's own slip:** H31's milestone ("with M-W2" or "after M-W3"). Recommended: with M-W2,
after H19, since the approach roads are M-W2's (A-74).

## 6. Questions for the owner

One: OQ-1, "the catalogue" = V14 §2.5's kind rows (recommended yes), as all three designs put it. The others put to the
owner (B's and C's OQ-2) are decided by his word "autocorrects" and are not owner questions. Whether a host route may be
re-laid through a site is a session decision under the delegation, vetoable (A's J-A.1 recommended).

## 7. Verification of this record

- Inputs read whole: the README, the three designs and the five reader records (md5s in the header, unchanged at
  09:46Z). The targets were re-hashed at 09:46Z: V13 `d0de9ad8`, V14 `70d8aa1b`, base `1f871a01`, unchanged since the
  designers' final checks.
- The other judges' records were not read. No file outside this folder and the lane scratchpad
  (`sites-roads/judge-3/`) was written. No git command was run. The host repository was not touched.
- Landed 2026-10-18 (opus; J394, Fable-critiqued).
