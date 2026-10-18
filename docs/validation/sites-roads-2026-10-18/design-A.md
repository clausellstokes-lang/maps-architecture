# design-A — sites, road access, road integration and the catalogue-dependent autocorrect: the catalogue-first design (J393)

- **Lane:** `sites-roads/design-A` (fable; J393). A designer under the owner's staffing rule J390: this seat reads,
  designs, judges and critiques; nothing here is applied. Every text change is a fragment of §2 for the synthesis
  (draft t, numbered after file s); the apply step after J392 re-verifies every fragment's current text.
- **Started:** 2026-10-18 05:24 UTC. Written as it goes.
- **Angle:** CATALOGUE-FIRST — start from V14 §2.5's kind rows; give every kind its road access class, its role in the
  road infrastructure, its coherence expectation on the world map and its correction, as calibratable columns and rule
  tables with shipped values; then the mechanism that reads them.
- **Inputs read whole:** the README (29 lines, md5 `eabd68cd5eec8bb1a35539c4a08e1bfd`); the five reader records
  `read-v14.md` (980 lines, md5 `6d127498c88c67d4d314d8f8b967f764`), `read-v13.md` (1,013, `6463765400374407b5260d7b607c67ca`),
  `read-base.md` (880, `33635e2143d5c4b7e2d8aeacec5bc37e`), `read-research.md` (562, `d97b4fcc56f23f94898d634c57e2267c`),
  `read-checks.md` (1,268, `28609ac256bf0aaa569d6c77f93619cf`); then the primary texts named in §1.0 below, each quoted
  with its line and the file's md5 at the moment read.
- **Primary targets at the moment this lane began (05:25 UTC, `md5sum`):** `docs/volumes/V13-world.md`
  `c8759307398388249547f71e1912feca` (4,452 lines); `docs/volumes/V14-sites.md` `a1c6d7c2bf08595776b1f913765cf1cb`
  (3,208); `docs/ARCHITECTURE.md` `b03ba26e4eedfa446d517280cd83e67f` (24,462); `docs/volumes/INDEX.md`
  `39b0c51960df130cb068744dd2eb3ee6` (259); `docs/volumes/SUMMARY.md` `9d1422839ab63a3ec3bf6d13e3ea8265` (214);
  `docs/OWNER-BRIEF-WORLD-SITES-HYDROLOGY-DRAFT-2026-10-16.md` `fc2520709752ef77f397ba7d6a89c169` (212). These equal
  the readers' md5s: J392 had not yet touched a target when this lane read. Every cite `V13:n`, `V14:n`, `base:n`
  below is against these md5s unless a later md5 is stated at the cite.
- **Cite form.** `V14:902` = `docs/volumes/V14-sites.md` line 902 at md5 `a1c6d7c2…`; `V13:1700` likewise at
  `c8759307…`; `base:8677` = `docs/ARCHITECTURE.md` at `b03ba26e…`; `rv14 §n` = a fact of `read-v14.md`, etc.

---

## 0. The owner's words, clause by clause

**The owner's words (2026-10-18 ~05:05Z, verbatim; journal row J393):** "make sure that sites have road access where
appropriate, they are integrated into road infrastructure and that depending on the catalogue, where appropriate, their
geography in the world map autocorrects to meet the coherence expectation."

The owner's words are the authority and are not re-judged; what follows is this seat's reading, stated so it can be
vetoed, with the places where it could differ from the session's README reading and where a reading must be the owner's.

| clause | this seat's reading | where it could differ / must be the owner's |
|---|---|---|
| "sites" | the owner's persistent locations — V14's **world sites** (the cards: fort, tower, temple … tollhouse), free-standing on the world, `inFrame` in a settlement's hinterland, `surface` on a plot, `attached` behind an anchor, `ground` as a marker-like card. The base's word *site* (S1's ground, a bridge's crossing site) keeps its meaning (V13:117–119; SW-34). | none: the session's reading is the same. |
| "have road access where appropriate" | every site kind says whether a road must reach it, may reach it, does not, or must not: a per-kind **road access** class (`required` / `preferred` / `none` / `avoided`) — the owner's "where appropriate" is the column's value, not a judgement made at each drop. *Road access* (the two words together) means: a way of the route network reaches the site's entrance; it is never the bare word *access*, which already names the `AccessPoint` of an attached site (V14 §2.3), the water access class of a site's entrances (V14:808; V13:2597) and the dossier's access word (base §7.7 DR1). | none on the reading; the class names and the shipped values are this seat's (vetoable). |
| "they are integrated into road infrastructure" | the road that reaches a site is part of the one route network, not a decoration: the site is a **station** on a route (the route passes its gate) or the end of a **spur** (a way of its row's class from the route to its gate), its cells enter the route layer, so the frame charter's `roads`, the site frame's own ways, the encounter crop's road band, the patrol cadence, the travel law's stations, the lenses and the exports all read the same road. On a host-bound world the host owns the network's topology and grades and a site is "a position along a route, never an end" (V13:1769–1771; J-RR.16): integration there is the station on a host route, or a map-tier spur that is no host edge. | the README reads this as W7's seats and legs; this seat reads it as *station or spur, never a seat*, for the reasons of J-A.1 (§1.3). Whether a map-tier spur to a site is admissible on a host-bound world is put to the owner (OQ-A3). |
| "depending on the catalogue" | **the catalogue is V14 §2.5's site kind rows** (`tables/sites/kinds`, one row per `WorldSiteKind`): the per-kind table every drop reads. V14 never calls the kind rows "the catalogue" (rv14 §233: its ten uses are V09 §4.9's message-key catalogue, the §7.7 forms catalogue and V11's symbol catalogue), so the word is read by what the sentence needs: a per-kind source of "where appropriate". The message-key catalogue and the symbol catalogue carry nothing a site's geography could depend on. | **must be the owner's (OQ-A1):** the session reads "catalogue" as the kind rows; if the owner meant another list, this design's columns move to it unchanged in substance. |
| "where appropriate" (second) | per kind again: some kinds autocorrect (a tollhouse onto the road, a bridge fort to the crossing, a mine onto ore), some only report (a ruin, a battlefield: the world records what is there), and a host-placed site never moves (V14:1411–1412, kept). The column is `correction`. | none on the reading; which kinds snap and which report is this seat's table (vetoable). |
| "their geography in the world map" | the site's **placement** on the world — its origin (and bearing) — and what the world holds at that origin: the route, the crossing, the pass, the overlook, the ore, the shore, the border. Not the site's own arenas (its levels and ground), which no placement edit changes (bar 3; T-V13-2 on a site subject). | none. |
| "autocorrects" | the site analogue of the owner's settlement-first correction (1) (V13:319–327): the world does the bare coherent minimum by itself and reports it. For a site this seat reads it as a **snap**: a site dropped at a point that misses its kind's expectation is moved, within its row's tolerance, to the nearest point that meets it — shown as the dry run's ghost, named as a bend (`bend.site.snap`), the DM able to keep the asked point; beyond the tolerance nothing moves: the asked placement is kept, flagged unlawful or costed, the nearest lawful placement offered, the anomaly reported with the DM's choices (V13 §3.11.1's `nearestLawful`, §3.11.5 (4)'s choices, §4.1's `keep` / `takeOffer` / `cancel`). The road's half of the correction is the world's: the route bends to the gate station or the spur is laid, never silently, never on a host route's topology. | **must be the owner's (OQ-A2):** whether a DM's point-dropped site may be moved by the snap at all (this seat's reading: yes, within the row's tolerance, preselected and named, the DM's `keep` holding the point), or whether the DM's point stands and only the world bends (the settlement-first spirit). The owner's words say *their* geography autocorrects, which is why this seat reads the snap. |
| "to meet the coherence expectation" | every kind row states its **expectation** — what the world must hold at the site for the site to make sense: on a route, at a river crossing of a route, on a pass, on an overlook, on ore, on a cliff, by water, on a shore, at a territory border, away from routes, inside a settlement's reach, or none — as a deterministic test over V13's rasters, the route layer and the sway, with a tolerance in metres. "Coherence" is V13's word for the placement law (`CoherenceCost`, `lawful`, `nearestLawful`, `PlacementAnomaly`): the expectation becomes one more term of that law for a site subject, so one mechanism judges, searches, offers and reports for settlements and sites alike. | none on the reading; the expectation kinds and their tests are this seat's (vetoable). |

**Readings that must be the owner's (collected; §3 carries each with its recommendation and consequences):** OQ-A1 the
catalogue = the kind rows; OQ-A2 the snap may move a DM's point-dropped site within the row's tolerance; OQ-A3 a map-tier
spur to a site on a host-bound world. The standing rule "a host-placed site (its record's position) is never re-sited"
(V14:1411–1412) is kept, not re-opened.

**What this seat does not read into the words:** no hour, no traffic, no economy (the owner's "not built" list, item 138
(d)); no new random term (a snap is a search with a deterministic tie-break); nothing of the simulator (a site road is a
map fact the host never reads, HS20; what reaches the host rides the existing offers).

---

## 1. The design

*(written as it goes; §1.0 the primary texts read, §1.1 the per-kind table, §1.2 the rule tables, §1.3 the mechanism …)*

---

## 2. The fragments table

*(to be written after §1)*

---

## 3. Owner questions

*(to be written)*

---

## 4. Left unchanged, and why

*(to be written)*
