# design-B — sites, roads and autocorrect: the pipeline-first design (lane `sites-roads/design-B`, J393)

- **Lane:** `sites-roads/design-B` (fable; J393) — a designer under the owner's staffing rule J390 (Fable designs,
  judges and critiques; Opus reads and verifies). This file is a DRAFT design for amendments file t; it applies nothing.
- **Started:** 2026-10-18 05:24 UTC. Written as it goes.
- **The owner's words (J393, 2026-10-18, verbatim):** "make sure that sites have road access where appropriate, they
  are integrated into road infrastructure and that depending on the catalogue, where appropriate, their geography in the
  world map autocorrects to meet the coherence expectation."
- **Angle:** PIPELINE-FIRST — every rule placed in a stage or operator that exists (V13 W6, W7 (1)–(11), W8b (14)–(16),
  P1–P5, §3.11.4's charter roads, §3.14's cascade; V14 G1, G3, G5 (e)–(f), G8, E1 (4)), naming what each reads and
  writes; standalone and host-bound; edit events, undo, locality, locks, the stamp, the DM's verbs; determinism and
  identity; the host track under door 1.
- **Inputs read whole:** the five reader records (`read-v14.md` md5 `6d127498…`, `read-v13.md` `64637654…`,
  `read-base.md` `33635e21…`, `read-research.md` `d97b4fcc…`, `read-checks.md` `28609ac2…`; all 980 + 1 013 + 880 + 562
  + 1 268 lines) and the lane README (`eabd68cd…`); then the primary texts below, from byte-identical snapshots taken
  at 05:25 UTC (`scratchpad/sites-roads/snap-B/`, md5s in `md5-at-read.txt`).
- **Cite form:** `V14:<line>` = `docs/volumes/V14-sites.md` line at md5 `a1c6d7c2bf08595776b1f913765cf1cb` (3 208
  lines); `V13:<line>` = `docs/volumes/V13-world.md` at md5 `c8759307398388249547f71e1912feca` (4 452 lines);
  `base:<line>` = `docs/ARCHITECTURE.md` at md5 `b03ba26e4eedfa446d517280cd83e67f` (24 462 lines); `INDEX:<line>` at
  `39b0c51960df130cb068744dd2eb3ee6` (259); `SUMMARY:<line>` at `9d1422839ab63a3ec3bf6d13e3ea8265` (214); `brief:<line>`
  = `docs/OWNER-BRIEF-WORLD-SITES-HYDROLOGY-DRAFT-2026-10-16.md` at `fc2520709752ef77f397ba7d6a89c169` (212). These are
  the md5s the readers read (unchanged at 05:25 UTC); J392 edits the live files, so the apply step re-verifies every
  fragment of §2 against the files as they then stand.
- **Standing rules obeyed:** read whole; no deferrals; the owner's words never re-judged; a reference, not a contract;
  one word, one meaning; determinism (no random or jitter term; ties by cell index then lexicographic id); J86's door 1
  closed (the host's simulator never reads a settlement frame's geometry; the world canon outside door 1, file r item
  926); file j items 131–141 (134 (a) the admissibility table, 134 (c) sites as destinations, 135 (a)–(e) scale
  coherence, 137 (c) locks hold geometry and anomalies are reported with the DM's choice never silently moved, 140 the
  M0 gate); V13 §1.3's settlement-first correction (the bare coherent minimum; the nearest lawful placement offered;
  anomalies reported; the DM's explicit verbs); V14 §3.4 (a) "A host-placed site (its record's position) is never
  re-sited" stands.

## 0 The owner's words, clause by clause — this designer's reading

The owner's words are the authority and are not re-judged; what follows is this seat's reading of each clause, where
it agrees with the lane README's reading, where it differs, and which readings must be the owner's (those are in §3).

| # | the owner's clause (verbatim) | this seat's reading | agrees with the README? |
|---|---|---|---|
| 0.1 | "make sure that sites" | **World sites** — V14's cards (`WorldSite`, the 21 kinds of V14 §2.5), the owner's item 132 "Persistent location" (forts, towers, ruins, temples, dungeons …). Never the base's S1 site or a bridge's crossing site (one word, one meaning; SW-34). Every attachment is covered, each where it stands: a `free` site in the world, an `inFrame` or `ground` site in a settlement's frame, a `surface` site on a plot, an `attached` site behind an anchor (whose "access" is its access record, not a road — V14 §2.3). | yes |
| 0.2 | "have road access where appropriate" | A **per-kind access row**: whether the site is joined to the road network at all, by a way of what class, from what reach, and what the join is (a spur to the nearest route; standing on the route; standing off every route). "Where appropriate" is read as **by kind, from the table**: a toll house stands on a road, a fort has a road, a mine a track, a hermitage a path, a hideout keeps off the roads, a cave has none — and by attachment: an `attached` site reads no access row, a `surface` site has its plot's access edge (base §4.7), an `inFrame` site is joined by the settlement's own ways. Editable like every rule table (item 134 (a)'s form). | yes (the README says "a per-kind access class") |
| 0.3 | "they are integrated into road infrastructure" | The join is **part of the one road network, not a decoration**: on a standalone world the spur is a `WorldRoute` laid by W7 and a `routed` site is a W7 seat; on a host-bound world a `routed` site is a position along the host's edge (W7 (11)) and a spur a map-tier route that is never a leg; the site's frame charter carries the spur as a road row so the site's own tracks meet it at the frame edge and its gate faces it; the encounter crop reads it as a way band; patrols count a garrisoned site on or at a route as a source; the travel law gives a spur time stations for the map's walking-time annotation; the lenses draw it in its class. Nothing of this reaches the host's simulation but through the existing offers (`routeFacts`, `patrolOffer`, the map feed's site offers). | yes |
| 0.4 | "depending on the catalogue" | **The kind rows** (`tables/sites/kinds`, V14 §2.5): the access row and the correction policy are **columns of the kind row**, so the rule depends on the catalogue by construction. The word "catalogue" is used nowhere in the volumes for the kind rows (read-v14 §"catalogue": V09 §4.9's message catalogue, §7.7's forms catalogue, V11's symbol catalogue). This seat reads the owner's "catalogue" as the list of site kinds the DM picks from (the kind rows, the dialog's kind list) and **not** V09's message-key catalogue — no geography could depend on message keys. The admissibility table (`tables/sites/admissibility`, keyed by context and kind) is read as the catalogue's other half: it decides which kinds exist where; the kind row decides how each joins. Flagged as the one reading that must be the owner's (§3 OQ-1), with no design consequence under the alternative. | yes |
| 0.5 | "where appropriate" (the second) | **Not every kind autocorrects, and not every correction is a move.** Per kind the correction policy is `snap` (the point moves at the drop, within the kind's reach, the bend named), `offer` (the point stays; the anomaly is reported with the nearest lawful placement offered — the DM's `takeOffer` moves it), or `report` (reported, no offer: the kind may stand unserved — a wizard's tower without a path). Three cases never move by the map: a host-placed site (V14 §3.4 (a), kept); a DM-placed devotion site (J384 (10): DM-placed only, `report`); a site under a settlement's frame (`inFrame`: the settlement's ground is one owner's — the site's join is the settlement's ways, never a world move). | yes |
| 0.6 | "their geography in the world map autocorrects" | **The site's placement (its point and bearing) is what autocorrects**, in the world document's `Placement`, by V13's own placement operators: at the drop's dry run the asked point is measured against the kind's expectation and, where the policy is `snap`, moved to the nearest coherent point within the kind's reach (a toll house onto the road's nearest station, a bridge fort onto the crossing), the ghost showing the corrected point and the DM accepting it (declared means held, V14 §4.1); beyond the reach, or under `offer`, the nearest lawful placement is offered as it is for a settlement. After acceptance nothing moves the site silently: a later change of the world (a route re-laid, a road the host demotes to hidden) raises a `PlacementAnomaly` with the DM's choice (item 137 (c)). This is **not** the settlement-first rule: a settlement never moves (the world bends to it); a site may move within its reach because a site is a point the world defines by its roads, and the owner's new words say so. The README reads the same ("the site analogue of V13 §3.11's placement coherence … made catalogue-dependent"). | yes |
| 0.7 | "to meet the coherence expectation" | **The expectation is the kind's, and it is a coherence term** of the placement's `CoherenceCost`: one new term `access`, computed for a site subject only, whose raw cost is 0 when the kind's access row is met at the point (on the route, a route within reach, off every route), and whose weight makes a missed expectation unlawful as a coast error is for a port (C13-26's precedent). Scored once at the placement edit and stored, never re-scored silently; the live reading after a world change is the anomaly. The purpose weights' `hard` terms (V14 §2.5) stay the siting expectation for a drop with no point; the access row is the expectation for a drop with a point, where today "a point drop takes the point as given" (read-v14 fact 116). | yes |

**Where this seat's reading differs from the README.** Nowhere in substance. Two sharpenings the README leaves open:
(a) the README names only `routed` and `attraction` as the existing per-kind road data; this design keeps both with
their landed meanings and adds the access row beside them (`routed` stays "a W7 seat"; it does not become the access
class — one word, one meaning); (b) the README's "autocorrects" is read as **the site moves, bounded, at the drop, and
is offered later** — not the world moving a road to a mis-dropped site, which on a host-bound world is barred
(J-RR.17: nothing moves a bound route silently) and on a standalone world would be the opposite of the owner's "their
geography … autocorrects".

**Readings that must be the owner's** (each in §3 with a recommendation): OQ-1 "the catalogue" = the kind rows; OQ-2
whether a DM-dropped site may be moved by the map at the drop (`snap`) or only ever offered; OQ-3 whether a `routed`
site on a host-bound world bends the host's edge through it (the landed W7 (11) text) or only joins it by a spur.

