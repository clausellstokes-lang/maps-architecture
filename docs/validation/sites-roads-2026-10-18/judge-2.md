# judge-2 — the three sites-roads designs judged (J393)

> Designed on Opus 5.5 under the owner's staffing word of 2026-10-18 (J394); Fable critique closes the run (lane sites-roads/critic)

- **Lane:** `sites-roads/judge-2` (opus; J394, Fable-critiqued). Judge 2 of three; the other judges' records not read.
- **Started:** 2026-10-18 09:39 UTC.
- **Inputs (md5 at start):** design-A.md `9d495fba` (1 776 lines), design-A.fragments.json `cfe477ae`; design-B.md
  `a47697d1` (1 036 lines); design-C.md `cc051133` (1 479 lines), design-C.fragments.json `a0c3c4a8`; read-v14 `6d127498`,
  read-v13 `64637654`, read-base `33635e21`, read-research `d97b4fcc`, read-checks `28609ac2`.
- **Targets now (md5 at start):** V13 `d0de9ad8`, V14 `70d8aa1b`, ARCHITECTURE `1f871a01`, INDEX `42881796`, SUMMARY
  `9d142283`, file s `3b83b3af`.


## Working notes (written as read; superseded by the scored sections below)

- The readers read whole (read-v14 981, read-v13 1 014, read-base 881, read-research 563, read-checks 1 269 lines).
- design-A read whole (1 776 lines): catalogue-first; five kind-row columns (`roadAccess`, `approach`,
  `coherence`, `correction`, `bendM`), eleven `SiteCoherenceTest` plug-ins in a new V13 slot, `siteKind` coherence term,
  bend within `bendM` on four kinds, offers within `originSearchM`; W7 (12) approach roads (`WorldRoute` origin
  `approach`) on both worlds; `routed` retired; W7 (11)'s "changes a route's geometry and effort" rewritten to "changes
  no route's geometry"; frame side (G5 (f) way to gate; `inFrame` driveway/path, BCR-V14-26); M12; H31 optional; 96
  fragments; one owner question.
- design-B read whole (1 036 lines): pipeline-first; one `roadAccess` row (join/class/reachM/correction
  snap/offer/report); `routed` kept; byway `WorldRoute` origin `byway`; host-bound `routed` site re-lays the host edge as
  a station (dated lay version, 500 m / 1.1); `inFrame` road-class site → S4 `worldSite` destination at the drop;
  `placeFrame` with a site subject runs P2–P3 (the world blends to a site); 93 fragments; two owner questions.
- design-C read whole (1 479 lines): coherence-first; four kind-row columns (`roadAccess` six values,
  `expect` over V14's own seventeen plug-ins, `autocorrect` move/bring/hold, `autocorrectM`); two site terms
  (`siteAccess`, `siteExpect`); `routed` kept; site trails (origin `siteTrail`) excluded from every road-pricing reader;
  host-bound `served` site → via re-lay of the host route (1 000 m, window 2 × `autocorrectM`); W7 (11)'s site terminal;
  reason-record table; 56 fragments; two owner questions.
- Checks run (scripts and output in the lane scratchpad `sites-roads/judge-2/`: `check.py` → `check.json`,
  `form.py`, `grep-sample.txt`).

---

## 1. What was checked, and how

**Fragments (every one, not a sample).** A script (`sites-roads/judge-2/check.py`) loaded design-A's 96 fragments from
`design-A.fragments.json`, design-C's 56 from `design-C.fragments.json` and design-B's 93 parsed from its §2 (one-line
`*Current text:*` / `*New text:*` quotes, ⏎ read as a line break), and for each: (1) counted the current text in the
live target (V13 `d0de9ad8`, V14 `70d8aa1b`, base `1f871a01`, INDEX `42881796`, SUMMARY `9d142283`, brief `fc252070`,
README `2a4b54c8`, gate spec `b6c5be2a` — re-hashed at the end, unchanged); (2) checked the line it names; (3) applied
each design's fragments in order to copies, requiring the current text exactly once at its turn and the new text exactly
once after; (4) diffed the replaced words of every fragment to find unintended edits of kept text. `form.py` checked that
every insertion lands at a line end and that inserted table rows keep the host table's column count (the only flags were
new tables after a blank line and one code line — not defects). Eight fragments per design were also checked with
`grep -F -c` on their first line (`grep-sample.txt`: all `1`).

| design | fragments | current text once in the live file | at the line named | in-order apply (old once at its turn, new once after) | unintended change of kept text |
|---|---|---|---|---|---|
| A | 96 | 96 | 96 | 96 | none found |
| B | 93 | 93 | 93 | 93 | none found |
| C | 56 | 56 | 56 | 56 | **C-52** (below) |

**C-52's defect.** Its new text rewrites INDEX:14's kept clause "items 927–939: the Fable retrovalidation's
**corrections** to volumes 13 and 14" as "… the Fable retrovalidation's **autocorrects** to volumes 13 and 14" — the
continuation's word-change (*correction* → *autocorrect*, design-C continuation note (1)) leaked into a quoted record of
file s. The synthesis must not take C-52 as written.

**Claims against the texts (≥ six per design; each re-read now at the md5s above).**

| design | claim | text now | verdict |
|---|---|---|---|
| A | fine cells 250 / 500 / 1 000 m (V13:997–999) | `WorldSizeRow` province 250, realm 500, continent 1 000 | true |
| A | "A host-placed site … is never re-sited" (V14:1416–1417) | V14:1416–1417 | true |
| A | a new S4 destination re-derives S3's gates (base:11703) | "a gate-count change (a destination added or removed) re-derives from the stage that picks those gates: S3" | true |
| A | outside plot `driveway` (base:8662), decoration `path` (base:8678) | both lines | true |
| A | no `trail` row in `gradeShift` (V13:1123) | "highway +1, road 0, track −1 (hidden: none)" | true |
| A | the lived network "mirrored, never computed" (V13:1766) | V13:1766 | true |
| A | `snapToGrid` (V14:1038), the kernel's *Expectations* (base:4529), "approach road" in the base (base:13986) | all three | true |
| A | a canonized row "is never moved" (V13:2408–2410) | V13:2409 | true |
| B | W7 (10): a *this happened* edit re-lays as a dated lay version the host may adopt (V13:1776–1781) | V13:1777–1778 | true |
| B | V14 G8 (e) "move the site — preselected" | V14:1906 | true |
| B | J-RR.21 is the water candidates' ruling (`fp-realm-review.md:560`) | line 560 is J-RR.21, "latent water candidates … a `WorldRoute` only for a host-named edge" | true (B's md5 `0a9e5dcf` is stale: the file is `04ddbd0c` now) |
| B | "whose six terms are" over seven rows (V13:2090); T-V13-12 "four fixtures" (V13:3577); `placeFrame { frame: Uuid }` only (V13:2848) | all three | true |
| B | `tauMilDays.watchpost` (V13:975, 1118) | present | true |
| B | "S4's §7.3 row re-routing only the arterials whose destination moved" for a destination added at an `inFrame` drop (B-63, B-71, B-80, B-85) | base:11703: a **moved** destination re-routes locally, an **added** one is "a gate-count change … re-derives from … S3" | **false as applied**: the `inFrame` S4 destination re-derives S3, against bar 6 |
| C | `NetworkChange.via` (V13:846), `rerouteReach.via` (V13:2845) | both | true |
| C | *spur* at V13:1455, V13:3935, base:5469 | all three | true |
| C | cascade step 6 marks charters and writes no placement (V13:2664) | "the world marks every placement whose charter facts moved (`Placement.charter` stale) … never writes a frame" | true |
| C | `requestCharter` runs "P4 only" (V13:2919) | true | true |
| C | `moveTown` only on `W_EDIT_DOSSIER` (V13:2260, 2886) | true | true |
| C | "declared means held" (V14:2254) | true | true |
| C | `solitude — settlementFar × (1 − routeNear)` "V14:987" | it stands at V14:990 (987 is `routeNear`) | true in substance, line off by 3 |

---

## 2. The scores

Each criterion 0–10; the total is their unweighted mean.

| design | completeness | base_coherence | minimality | owner_rules | fragment_exactness | total |
|---|---|---|---|---|---|---|
| **A** (catalogue-first) | 9 | 8 | 6 | 9 | 10 | **8.4** |
| B (pipeline-first) | 8.5 | 5.5 | 5.5 | 7 | 9.5 | 7.2 |
| C (coherence-first) | 7.5 | 6.5 | 8 | 8 | 8 | 7.6 |

### Design A — strengths

- **The owner's three clauses each have a mechanism on both worlds, and nothing of the host network moves.** A site
  lies *along* a route or the map's own approach road joins it (W7 (12), A-51); no route is ever bent to a site
  (J-A.1). This is the only design that never computes a bound route's geometry, so W7 (9) ("mirrored, never
  computed", V13:1766), J-RR.17 and `timeDelta` stay untouched, and a map-tier card never changes a host leg's
  effort.
- **The broadest and most exact reading of "coherence expectation"**: eleven deterministic tests, each with a
  line-or-raster target, and per-row costs under the one `lawfulMax` (5 the expectation proper, 1 or 3 a preference,
  groups of alternatives). Only rows that make a placement unlawful move a site, so exactly four kinds bend (tollhouse,
  bridge fort, mine onto its ore, hideout off the road). A camp off a road raises no pin.
- **Locality:** a site is never a seat, so no drop re-runs W7a/W7b over the landmass. The approach is incremental, its
  closure named (W7 (10)). B and C both declare W7 over the landmass at every routed drop.
- **The frame side is right against the base.** The `inFrame` site uses the hinterland's own faces (`driveway` for
  `required`, `path` for `preferred`; base:8662, 8678) and explicitly avoids an S4 destination (base:11703). G5 (f)'s
  way from the charter road to the gate, and two gates for a tollhouse, carry the road through item 135 (a).
- **The owner-question discipline:** one true owner question (the catalogue), and the partial's "may the world move a
  dropped point" withdrawn because the owner's own word "autocorrects" decides it.
- **Patrols:** `gradeShift.trail` closes read-v13's gap (no `trail` row), and the patrol source is "along the segment"
  read through the approach.
- **Fragments:** 96 of 96 exact and applying in order; the JSON is beside the record.

### Design A — weaknesses

- **It rewrites landed session text instead of implementing it.** A-50 changes W7 (11)'s "dropping or removing a site
  changes a route's geometry and effort" to "changes no route's geometry", and A-72 rewrites T-V13-43's clause. The
  J-V13.107 row records it (vetoable), but this is the largest semantic change to a ruled text in any of the three.
- **Not minimal.** It adds a second V13 registry (`SiteCoherenceTest`, eleven new plug-ins), several of which restate V14's
  existing plug-ins (`onOverlook` over `overlook`, `onOre` over `ore`). C reaches the same with `expect` over the
  seventeen. It retires `routed`, which needs a migration row and changes J-V14.43's ruled seat. The fragment count is
  96.
- **The secrecy of a site's road is missing.** An approach road to a DM-secret fort or temple has no `knownTo`, so the
  road would draw for players. Only C states that the trail takes its card's knowledge.
- **The owner's words are not quoted in V13 §1.3 / V14 §1.3**, where each volume lists every owner rule it obeys. A puts
  them only in V14 §2.5's paragraph (A-8) and the plain words (A-1). B-2 and B-45 do this.
- **A depends on M0's deferred two-point road without a gate row for it.** G5 (f) routes the way "as `drawWay` routes a
  pair", and read-checks I3 records "two-point roads" as deferred at M0. A's M12 covers the `inFrame` face only.
- **The bend and offer candidates have no stated filter** against water cells or points inside a placed frame's
  extent. C states one.
- The bookkeeping fragments (revision notes, the INDEX state line) are left to the synthesis.

### Design B — strengths

- **It implements W7 (11) and T-V13-43 as landed.** A site does change a host route's geometry, as a dated lay version
  within 500 m and a 1.1 detour (J-V13.108), and B reads J-RR.21 correctly as the water candidates' ruling.
- **Every rule is placed in an existing stage, with its reads and writes.** The table at §1.3 and the standalone/host-bound
  table at §1.4 are the clearest map of the pipeline.
- **It closes the reader-found gaps the others leave:** `placeFrame`'s missing site form (B-31), V13 §3.11.1's
  "six terms" over seven rows (B-20), T-V13-12's "four fixtures" against eight kinds (B-37), and §3.14.3 drift row 13 for
  a removed route (B-29).
- **It quotes the owner's words** in V13 §1.3 and V14 §1.3 (B-2, B-45) and writes the bookkeeping fragments (B-1, B-44,
  B-86, B-92).
- **The patrol source arithmetic is concrete:** the round trip from the junction plus the byway's effort twice.
- **The SE9 edges are stated:** no route within reach, and a world with no route at all (B-66).

### Design B — weaknesses

- **The `inFrame` road-class site becomes an S4 `worldSite` destination at the drop** (B-63, B-71, B-80, B-84, B-85,
  BCR-V14-26). Base §7.3's S4 row (base:11703) makes an added destination "a gate-count change" that re-derives S3, which
  breaks bar 6 (a town regenerated locally around a site). B's text claims only "the arterials whose destination moved"
  re-route; that misreads the row.
- **The host-edge station re-lays the host's road "through the site's cell".** That computes a bound route's geometry,
  against W7 (9) ("only `chartered` lays new geometry"), and on a 250–1 000 m grid a cell-centre vertex shifts the road
  by up to half a cell (A's note (1), C's note (3)). The station also changes `routeFacts` effort and `timeDelta` for a
  map-tier card.
- **`placeFrame` with a site subject runs P2–P3**, so the world blends to a site (B-31, §1.6). That contradicts V14
  §3.4 (c), where a site's ground is materialized under its charter, and it is the opposite of A's and C's "the world
  never blends to a site".
- **The coherence expectation is read as road access only.** A mine dropped off its ore, or a bridge fort's crossing
  moved away, is not the row's business.
- **OQ-2 asks the owner whether his own word "autocorrects" lets the map move the point.** That puts the owner's words up
  for re-judging. A shows the word decides it.
- **Two fields overlap:** `routed` (a seat) is kept beside `roadAccess.join` (`byway`/`onRoute`), and "where seating or the
  station fails" a `routed` card falls back to its row. *Station* is used both as V13's time-station point and as "a
  site laid as a station of a host edge". *Snap* collides with `snapToGrid`.
- The partial's stale md5 for `fp-realm-review.md` is kept. Its verification claims "each current text once, each new
  text zero times", not the in-order residue check (it passes when run here).

### Design C — strengths

- **The most minimal mechanism for the expectation:** `expect` reuses V14's seventeen existing plug-ins with a `min`
  (no new registry). `routed` is kept and validated against `roadAccess` (`refuse.table.invalid`). It has 56 fragments.
- **A site trail is no road to the road-pricing readers.** `existingRoute`, `connectivity`, the patrols, the simulator
  feed and V14's siting terms ignore it (C-14, C-16, C-36), so a hermitage's own path never zeroes its solitude.
- **A site trail's `knownTo` is its card's,** so a DM-secret site's road is absent from a player picture (C-16, T-V13-58).
  This is the one design that handles secrecy.
- **The clerk's reason-record table (§1.9a):** each fact, what its record names, and the clerk's sentence. This is bar 10
  for every new fact.
- **`requestCharter` gains `accept?: ('unlawful')[]` for a site subject (C-21),** so the DM's `keep` of an unlawful
  world-first origin is in the event, as it is on `setPlacement`.
- **M12 names the real M0 foreclosure risk:** M0-c-03's deferred two-point road, plus `Way.to`'s external bearing (C-56).
- **The derived anomalies have a fixture per cause** (T-V13-60). Offer candidates skip water cells and placed frames'
  extents.
- **Words:** *spur*, *detour*, *toleranceM* and *correction* were each found taken and replaced.

### Design C — weaknesses

- **C-52 corrupts kept record text**: file s's "corrections" becomes "autocorrects".
- **The host-bound `served` site re-lays the host route through its origin** in a window of 2 × `autocorrectM`
  (2 km). That is a larger bend of a bound route than B's 500 m and has the same W7 (9) objection. Beyond 1 km a fort
  or mine on a host-bound world gets **no road at all** (unlawful, `bring` never moves, offers only), so "road access
  where appropriate" is incomplete on a host-bound world for the very kinds that most need a road.
- **On a standalone world a `served` site is a W7 seat,** so every routed drop re-runs W7 over the landmass (declared,
  non-local). A rank-0 seat beside a capital pulls an edge classed by the higher seat (A's J-A.1 (b)).
- **The `inFrame` link is a `path` face for every road-access value,** even for a fort, which loses the class nuance of
  A's `driveway`.
- **The lenses get no new text.** The patrols lens and the sway lens are treated only implicitly.
- **The via window's "2 ×" is a bare multiplier** with no table cell. `siteSearchM` 5 000 m replaces `originSearchM` for
  sites, a second offer reach with a new name.
- The OQ-2 reading (who yields: the site or the world's geography) is a fair flag, but it asks the owner a question the
  per-kind design already answers with a recommendation.

---

## 3. The winner and the grafts

**Winner: A.** It is the only design that answers all three clauses on both worlds without bending a host road or
re-running W7 over the landmass at a drop. Its coherence expectation is the broadest and the most exactly costed, its
frame side agrees with the base's locality rule, it puts one true question to the owner, and every one of its 96
fragments is exact. B's `inFrame` destination and C-52 are defects the synthesis would have to remove. A's weaknesses
are omissions the runners-up fill.

**Grafts the synthesis must take (into A's frame, renumbered; each adapted to A's words):**

1. **C-16 / T-V13-58's secrecy clause:** an approach road's `knownTo` is its site card's, so a DM-secret site's road is
   DM-only and absent from a player picture. This goes in A's W7 (12) text (A-51), its lifecycle row (A-46) and
   T-V13-57.
2. **C-36's rule on V14's `routeNear`, adapted:** a site's own approach road never lowers its own `solitude`,
   `concealment` or `roadControl` reading, extending A's "ignores the site's own approach road" from the coherence tests
   to the siting plug-ins. A states the choice for other sites' readings (an approach road is a road to them).
3. **C §1.9a's reason-record table:** the clerk's sentence for the bend, the offer, the approach road, the way to the
   gate and each anomaly, in V13 §3.11.1's site paragraph (A-57) and V14 §4.9.
4. **C-21:** `requestCharter` gains `accept?: ('unlawful')[]` for a site subject, so a kept unlawful world-first origin is
   in the event.
5. **C-56's M0 row:** S4's router admits a way between two given points, plus the way's external bearing at the ring
   (M0-c-03's deferred two-point road). Carry it beside A's M12 (as M13, or merged), because A's G5 (f) way to the gate
   depends on it.
6. **C's candidate filter:** the bend's and the offers' candidates skip water cells and points inside a placed frame's
   extent. This goes into A-57's `nearestLawful` site form.
7. **C's T-V13-60:** one fixture per cause of a derived site anomaly (a reach moved, a road hidden, a road chartered past
   a hideout, ore thinned), each moving nothing with the digests byte-equal. Add it to A's T-V13-58.
8. **B-2 and B-45:** the owner's J393 words verbatim in V13 §1.3 and V14 §1.3, with A's mechanisms named.
9. **B-1, B-44, B-86, B-92:** the bookkeeping fragments (V13 and V14 revision notes, the INDEX state line, the README
   owner-rules row) in file s's form, numbered from 940. C-1/C-31 are equivalent; **not C-52**, whose text corrupts file
   s's record.
10. **B-20 and B-37:** V13 §3.11.1's term count stated truly (seven frame terms plus `siteKind`), and T-V13-12's fixture
    count made one per anomaly kind (ten with A's `siteIncoherent` and `noRoadAccess`).
11. **B-29:** §3.14.3 drift row 13 gains the approach roads that joined a removed or re-classed route (each re-lays or its
    site reads `noRoadAccess`), with the assertion.
12. **B-66:** V14 SE9's edges. No route within `maxRoadM` gives approach `none` (and `noRoadAccess` where `required`). A
    world with no route at all gives every `required` kind `noRoadAccess` and every `bend` kind on a road kept with no
    offer.
13. **B-31, the declaration only:** `placeFrame`'s `frame: Uuid | { site: Id }`, with A's site form (no P2–P3, the world
    never blends to a site), closing read-v13's gap.
14. **B §1.12's patrol arithmetic** as the exact reading of A's "the round trip measured … over its approach": from the
    junction plus the approach road's effort twice, for a site whose approach road joins the segment.
15. **B-78 / B-87's estimate honesty:** price SE6 and M-W2 for the new work, or state why the rows hold, rather than
    A-75's bare "estimate unchanged".

**Not to take:** B's `inFrame` S4 destination (B-63, B-71, B-80, B-84, B-85; base:11703); B's host-edge station and C's
via re-lay (both compute a bound route's geometry); B's P2–P3 for a site; C-52 as written; B's OQ-2.

**Readings the owner must give (from all three):** only "the catalogue" (A's OQ-A1 = B's OQ-1 = C's OQ-1), recommended
yes — the site kind rows. I differ from C on one reading and flag it rather than ask it. C's OQ-2 (whether "their
geography" means the site's position or the world's geography round it) is answered by A's per-kind table: four kinds
move, the world lays roads for the rest, and terrain is never invented. Item 135 (a) forbids the world to invent an
overlook or a lode, so the world's half can only be roads. That leaves nothing for the owner to decide, and it stands
as a vetoable session decision.

---

## Verification of this record

- All three designs and the five readers were read whole (line counts and md5s in the header). The fragment scripts and
  their outputs are in `/tmp/claude-0/-home-user-maps-architecture/4291a60d-8240-5d49-a54e-2b2a213d093f/scratchpad/sites-roads/judge-2/`.
- The targets were re-hashed after the checks, all unchanged: V13 `d0de9ad8`, V14 `70d8aa1b`, base `1f871a01`, INDEX
  `42881796`, SUMMARY `9d142283`, brief `fc252070`, README `2a4b54c8`, gate `b6c5be2a`.
- The other judges' records were not read. No file outside this folder and the lane scratchpad was edited, no git command
  was run, and the host repository was not touched.
