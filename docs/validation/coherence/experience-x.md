# Amendments x (the experience pass, J397: the atlas and the sites (V15, V14)) — the application record

> Provenance: written by Opus 5.5 under the Fable manager (docs/PROGRESS.md J392's model ruling); checked by the Fable manager at close.

The seat amendments/experience-apply applied `docs/AMENDMENTS-2026-10-24x.md` on 2026-10-24 as a coherence pass does, third of the three, after files v and w (neither touches V15 or V14): every fragment in file
order, each quoted current text found by exact match exactly once in its target at its turn and replaced by the new text verbatim
(a ⏎ in a quote is a line break, the continuation's indentation kept). The dry run (`experience-pass/apply/apply_vwx.py dry` in the
session's scratchpad, outside the repository; the review seat's `review/dryrun_vwx.py` parser, itself the seats' `dryrun_v.py` /
`dryrun_w.py` / `dryrun_x.py` lineage of `world-growth/revise/dryrun_revise.py`) applied files v, w and x end to end over copies of
the five targets and reported "file v: 36 items (1084-1119), 64 fragments, 0 failures", "file w: 59 items (1141-1199), 114
fragments, 0 failures", "file x: 40 items (1201-1240), 91 fragments, 0 failures" and "DRY: OK". The same application was then made
to the real targets (`apply_vwx.py real`), and the results were identical byte for byte to the copies (`cmp`).
`python3 tools/bundle_architecture.py` was run after all three files and `--check` reports the bundle up to date.

**Result.** All 40 change items (1201–1240) applied, all 91 fragments matched exactly once at their turn; no item not applied. File x carries no owner-rule item; M49 needs no change item (the file's head). After all three files every new text occurs exactly once in its target. Line numbers are those on disk after all three files (v, w, x) are applied.

## Per item

| item | ruling | target | heading (file x) | applied | line(s) the new text now occupies |
|---|---|---|---|---|---|
| 1201 | J397 (M9), (M42), (M43), (M44), (M45), (M46), (M47), (M48) | `docs/volumes/V15-atlas.md` | Volume 15 — the revision notes under the title (the line for file x, in the style of E-1's) | applied (1 fragment) | 51–61 |
| 1202 | J397 (M9), (M43), (M44), (M46) | `docs/volumes/V15-atlas.md` | Volume 15 — §0 In plain words (somebody's map; the player's atlas; what the atlas never does) | applied (3 fragments) | (a) 161–164; (b) 148–149; (c) 170–171 |
| 1203 | J397 (M9), (M42), (M43), (M46), (M50) | `docs/volumes/V15-atlas.md` | Volume 15 — §1b.1 Records, fields and tables and §1b.5 Host facts (the new pieces wired) | applied (6 fragments) | (a) 321; (b) 323–324; (c) 326; (d) 336; (e) 420–421; (f) 430–431 |
| 1204 | J397 (M9), (M50) | `docs/volumes/V15-atlas.md` | Volume 15 — §2.2 New records (the court viewpoint: `Viewpoint.audience`, `court`, the `court` knowledge source; `MemberImagery.audience`) | applied (3 fragments) | (a) 534–535; (b) 540; (c) 570 |
| 1205 | J397 (M9), (M42) | `docs/volumes/V15-atlas.md` | Volume 15 — §2.2 New records (the atlas relation: `AtlasRelation`; `EmbellishmentKind`; the knowledge paragraph) | applied (3 fragments) | (a) 519–528; (b) 551; (c) 581–584 |
| 1206 | J397 (M43) | `docs/volumes/V15-atlas.md` | Volume 15 — §2.2 New records (`Member.calendarLabel`; `AtlasStyleState.dateCartouches`) | applied (2 fragments) | (a) 505–506; (b) 547 |
| 1207 | J397 (M45), (M46) | `docs/volumes/V15-atlas.md` | Volume 15 — §2.2 New records (`Viewpoint.asOfWeek` as "an old map"; `Viewpoint.asWas`; `Viewpoint.inWorld`) | applied (1 fragment) | 541–543 |
| 1208 | J397 (M42) | `docs/volumes/V15-atlas.md` | Volume 15 — §2.3 The described relations (an atlas relation is not a described relation) | applied (1 fragment) | 612–621 |
| 1209 | J397 (M42) | `docs/volumes/V15-atlas.md` | Volume 15 — §2.4 New rule tables (`EmbellishRule.atlasRelations`; `FigureRow.trait`) and §2.5 (the mappa mundi's figures) | applied (3 fragments) | (a) 671–672; (b) 677; (c) 697 |
| 1210 | J397 (M9), (M42), (M43), (M46) | `docs/volumes/V15-atlas.md` | Volume 15 — §2.9 Identity (the atlas relation's creation key) and §2.10 The lifecycle (the atlas relation; `calendarLabel`; the court and as-was fields) | applied (4 fragments) | (a) 762–763; (b) 786–787; (c) 783; (d) 789 |
| 1211 | J397 (M44) | `docs/volumes/V15-atlas.md` | Volume 15 — §2.11 The version table, the digests and the storage of the atlas (the shared atlas: the public audience only) | applied (1 fragment) | 830–840 |
| 1212 | J397 (M9), (M42), (M46) | `docs/volumes/V15-atlas.md` | Volume 15 — §3.6 A6 — The relational view ((4) the known region: the `court` source; the atlas relations' widenings; an old map) | applied (1 fragment) | 1283–1295 |
| 1213 | J397 (M42) | `docs/volumes/V15-atlas.md` | Volume 15 — §3.6 A6 — The relational view ((5) the figure rules read the atlas relations; the rule that binds every figure) | applied (6 fragments) | (a) 1308; (b) 1309; (c) 1311; (d) 1312; (e) 1316–1317; (f) 1329–1334 |
| 1214 | J397 (M9), (M46), (M50) | `docs/volumes/V15-atlas.md` | Volume 15 — §3.6 A6 — The relational view ((6) Viewpoints: the court's map; an old map and the as-was copy) | applied (1 fragment) | 1338–1360 |
| 1215 | J397 (M9), (M45) | `docs/volumes/V15-atlas.md` | Volume 15 — §3.6 A6 — The relational view ((8) the legend's honesty: the court's line; where the note lives) | applied (1 fragment) | 1371–1385 |
| 1216 | J397 (M47) | `docs/volumes/V15-atlas.md` | Volume 15 — §3.7 A7 — Drill-down (the party's reach across a seam) | applied (1 fragment) | 1404–1422 |
| 1217 | J397 (M9), (M42), (M43), (M44), (M45) | `docs/volumes/V15-atlas.md` | Volume 15 — §3.11 A worked example (step 4's cartouche; step 7 authors the relations it needs; step 8's public file) | applied (3 fragments) | (a) 1502–1504; (b) 1517–1544; (c) 1545–1550 |
| 1218 | J397 (M9), (M42), (M43), (M46), (M47) | `docs/volumes/V15-atlas.md` | Volume 15 — §4.1 The edit events (`setAtlasRelation`; `markPartyReach`; `setAttr`'s targets; the outcome rows) | applied (5 fragments) | (a) 1569–1570; (b) 1579–1580; (c) 1586–1590; (d) 1597–1600; (e) 1605–1607 |
| 1219 | J397 (M9), (M42), (M43), (M46), (M47) | `docs/volumes/V15-atlas.md` | Volume 15 — §4.2 The authoring tools (T7's second tab; T9's court, calendar label and reach) and §4.3 Locality (the two new edits) | applied (4 fragments) | (a) 1619; (b) 1620; (c) 1634–1635; (d) 1641–1642 |
| 1220 | J397 (M42), (M43), (M47) | `docs/volumes/V15-atlas.md` | Volume 15 — §4.7 Microcosms ((1) the reads across members restated; (2) a player's cartouche) | applied (2 fragments) | (a) 1694–1704; (b) 1706–1711 |
| 1221 | J397 (M9), (M42), (M44), (M45), (M47) | `docs/volumes/V15-atlas.md` | Volume 15 — §4.8 The clerk's view and the catalogue (the atlas relation, the court viewpoint and the view answered; the new keys) | applied (2 fragments) | (a) 1732–1739; (b) 1744–1748 |
| 1222 | J397 (M9), (M42), (M43), (M46) | `docs/volumes/V15-atlas.md` | Volume 15 — §5.1 The atlas page (the relations box's second tab; the member card's calendar label; the Viewpoints tab) | applied (3 fragments) | (a) 1771–1773; (b) 1769–1771; (c) 1783–1785 |
| 1223 | J397 (M42), (M43), (M45) | `docs/volumes/V15-atlas.md` | Volume 15 — §5.2 The atlas view: layers and styles (the cartouches, the legend's note, the relations layer) | applied (3 fragments) | (a) 1800; (b) 1801; (c) 1804 |
| 1224 | J397 (M9), (M42), (M43), (M48) | `docs/volumes/V15-atlas.md` | Volume 15 — §5.4 Player views (what admission withholds; no date reaches a player; a court viewpoint opened to the party; the style for every account) | applied (2 fragments) | (a) 1833–1835; (b) 1836–1853 |
| 1225 | J397 (M44), (M45) | `docs/volumes/V15-atlas.md` | Volume 15 — §5.5 Exports and sharing (the in-world artefact switch; the shared file as the public audience; the sheet's line; the gallery copy) | applied (4 fragments) | (a) 1859; (b) 1863; (c) 1874–1879; (d) 1885–1888 |
| 1226 | J397 (M9), (M42), (M46), (M50) | `docs/volumes/V15-atlas.md` | Volume 15 — §7.2 The relational view (T-V15-27 – T-V15-29, after T-V15-25) | applied (1 fragment) | 1959–1962 |
| 1227 | J397 (M44), (M47) | `docs/volumes/V15-atlas.md` | Volume 15 — §7.3 Saves, arrangement, seams, continuation, drill-down (T-V15-30, T-V15-31, after T-V15-22) | applied (1 fragment) | 1979–1981 |
| 1228 | J397 (M43), (M45), (M48) | `docs/volumes/V15-atlas.md` | Volume 15 — §7.4 Editing, view, exports, budgets, platform (T-V15-32 – T-V15-34, after T-V15-24) | applied (1 fragment) | 1993–1996 |
| 1229 | J397 (M9), (M42), (M46), (M47) | `docs/volumes/V15-atlas.md` | Volume 15 — §7.5 The report codes (`W_ATLAS_COURT_UNSENT`; the new refusal keys) | applied (2 fragments) | (a) 2008–2009; (b) 2010 |
| 1230 | J397 (M9), (M42), (M43), (M44), (M45), (M46), (M47), (M48) | `docs/volumes/V15-atlas.md` | Volume 15 — §8 Build plan (SA1's and SA4's content and exits; the dependencies on the host's believed rows) | applied (5 fragments) | (a) 2040; (b) 2040; (c) 2043; (d) 2043; (e) 2052–2057 |
| 1231 | J397 (M9), (M42), (M43), (M44), (M45), (M46), (M47), (M48) | `docs/volumes/V15-atlas.md` | Volume 15 — §9 Decisions (J-V15.41 – J-V15.48, after J-V15.40) | applied (1 fragment) | 2139–2147 |
| 1232 | J397 (M9), (M42), (M43), (M44), (M45), (M46), (M47) | `docs/volumes/V15-atlas.md` | Volume 15 — §10.1 Requests to the base (BCR-V15-16 – BCR-V15-18, after BCR-V15-15) | applied (1 fragment) | 2175–2178 |
| 1233 | J397 (M9), (M42), (M43), (M45), (M47), (M48), (M50) | `docs/volumes/V15-atlas.md` | Volume 15 — §10.3 Requests to the other volumes (RQ-V15-12 – RQ-V15-15, after RQ-V15-11) | applied (1 fragment) | 2200–2204 |
| 1234 | J397 (M9), (M42), (M43), (M44), (M48) | `docs/volumes/V15-atlas.md` | Volume 15 — §12 CONFIRMED versus PLAUSIBLE (the experience pass's additions) | applied (1 fragment) | 2354–2362 |
| 1235 | J397 (M41) | `docs/volumes/V14-sites.md` | Volume 14 — §1.4 Out of scope, with the reason (the boundary: stocking is the DM's and the host's; the numbered key is the map's) | applied (1 fragment) | 326–332 |
| 1236 | J397 (M47) | `docs/volumes/V14-sites.md` | Volume 14 — §2.3 The anchor, the access record and the knowledge layers (the party key seeded across a seam) | applied (1 fragment) | 775–782 |
| 1237 | J397 (M41) | `docs/volumes/V14-sites.md` | Volume 14 — §2.4 Derived transients (`SiteKey`, `SiteKeyRow`; the totality sentence) | applied (2 fragments) | (a) 824–836; (b) 843 |
| 1238 | J397 (M41) | `docs/volumes/V14-sites.md` | Volume 14 — §5.2 The site document's view (the numbers and the Key tab) and §5.3 (a site's exports carry the key) | applied (2 fragments) | (a) 2518–2526; (b) 2593–2603 |
| 1239 | J397 (M41), (M47) | `docs/volumes/V14-sites.md` | Volume 14 — §7 Tests and acceptance bars (T-V14-34, T-V14-35, after T-V14-33) and §9 Decisions (J-V14.57, J-V14.58, after J-V14.56) | applied (2 fragments) | (a) 2897–2899; (b) 3046–3048 |
| 1240 | J397 (M41), (M47) | `docs/volumes/V14-sites.md` | Volume 14 — §10.1 Requests to the base (BCR-V14-26, after BCR-V14-25) and §10.2 Cross-volume requests (the V09 row; a V15 row) | applied (3 fragments) | (a) 3085–3086; (b) 3099; (c) 3102–3103 |

## The targets before and after

Before: the target as it stood before file x (after file w); after: as file x left it, which is the target as it now stands on disk.

| target | md5 before | lines before | md5 after | lines after |
|---|---|---|---|---|
| `docs/volumes/V15-atlas.md` | `a4bfc7a02c7da53d80883c72032536e3` | 2218 | `78104624e1881fc0118bf33e931754cd` | 2438 |
| `docs/volumes/V14-sites.md` | `a1c6d7c2bf08595776b1f913765cf1cb` | 3208 | `a68ea45fb6284bd04c6aba13f437a5f1` | 3253 |

## The ids minted

As the file's head lists them ("**Ids minted:**" in `docs/AMENDMENTS-2026-10-24x.md`): items 1201–1240. Each numbered id the head names now stands in the targets:

| id | occurrences after all three files |
|---|---|
| J-V15.41 | `V15-atlas.md` 5 |
| J-V15.48 | `V15-atlas.md` 4 |
| T-V15-27 | `V15-atlas.md` 4 |
| T-V15-34 | `V15-atlas.md` 4 |
| BCR-V15-16 | `V15-atlas.md` 2 |
| BCR-V15-18 | `V15-atlas.md` 2 |
| RQ-V15-12 | `V15-atlas.md` 4 |
| RQ-V15-15 | `V15-atlas.md` 4, `V14-sites.md` 2 |
| J-V14.57 | `V14-sites.md` 3 |
| J-V14.58 | `V14-sites.md` 2 |
| T-V14-34 | `V14-sites.md` 3 |
| T-V14-35 | `V14-sites.md` 2 |
| BCR-V14-26 | `V14-sites.md` 2 |

The ids the head leaves free (J-V15.49, T-V15-35, BCR-V15-19, RQ-V15-16, J-V14.59, T-V14-36, BCR-V14-27) occur nowhere in the five targets. The named fields, readers, types and refusals the head lists are those the items' new texts carry, applied verbatim above.

## The lint

The clean-room lint (`apply_vwx.py`, the preamble's token list: `SettlementForge`, `settlement-engine`, `.js`, `FPQ`, `DESIGN_`, `WY`, `EC`, `GR`, `RD`, `WC`, `ES`, `HB`, `PG`, `POP`, `TR`, `Herald`, `Chronicler`, `realistic_regional`, `dramatic_campaign`, `infoMode`, `beliefMap`, `K3`, `SP-9`, `hopDelay`, `worldPlan`, `composer`) re-run by this seat over all 91 new texts of this file as applied: **clean-room: no hit.**
