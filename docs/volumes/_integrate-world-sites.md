# Integration of design volumes V13 and V14 into the design program (chief architect's seat)

> PENDING FABLE REVIEW — written by the session's integration seat volumes/_integrate-world-sites under the owner's delegation (J339); covered by the whole-design retrovalidation (J84).

Lane `volumes/_integrate-world-sites`, 2026-10-17. Inputs: `docs/volumes/V13-world.md` and `docs/volumes/V14-sites.md` as
landed by their critique, revision and reconciliation round 0 (`volumes/reconcile-V13-r0` LANDED 01:05,
`volumes/reconcile-V14-r0` LANDED 01:11), `docs/volumes/critique/seam-world-sites-r0.md` (SW-01 – SW-37),
`docs/AMENDMENTS-2026-10-16j.md` (items 131–141 and its BCR-j forecast table), `docs/volumes/INDEX.md`,
`docs/volumes/SUMMARY.md`, and the form of the earlier integration (`docs/volumes/_integrate.md`;
`docs/AMENDMENTS-2026-09-28f.md`). Outputs: this file, `docs/AMENDMENTS-2026-10-16k.md` (the base change requests,
items from 600), dated "Integration notes (2026-10-17)" sections in both volumes, INDEX.md and SUMMARY.md rows,
README.md rows, the regenerated bundle, a HANDOFF section and a PROGRESS row. Every in-place edit was made by an
exact-match script that asserted its match count (`scratchpad/v13v14/integrate/edits.py`); backups of every file
before this lane's edits are in `scratchpad/v13v14/integrate/pre-integrate/`.

PROGRESS
- §1 Seam round 1 (confirming): SW-01 – SW-37, R-V14-1 – 12, V14 §10.2's V13 row (1)–(17) — table, residuals fixed or listed: done (36 resolved, 12 wording residuals fixed, 1 mechanism issue open: R1-1)
- §2 Base change requests → file k (items from 600; BCR-j rows mapped; CONFLICT items; quote verification): done (48 items 600–647, 0 CONFLICT, 56 quotes verified)
- §3 Clean-room scan of V13 and V14: done (2 slips in V13 fixed; V14 0)
- §4 INDEX.md rows and census: done
- §5 SUMMARY.md sections: done
- §6 Integration notes appended to V13 and V14: done (IN-V13-1 – 6; IN-V14-1 – 7)
- §7 README.md rows: done
- §8 The bundle (line counts): pending
- §9 HANDOFF section, PROGRESS row, lane-events: pending
- §10 CONFIRMED versus PLAUSIBLE: pending

## 1 Seam round 1 (confirming): SW-01 – SW-37, V13 §10.2's R-V14-1 – 12, V14 §10.2's V13 row (1)–(17)

**Method.** Both volumes were read whole as landed by their reconciliation round 0 (V13 2 959 lines, md5 4b23e80d…;
V14 3 133 lines, md5 70b75100…), then every seam finding's required change was held against the text on both sides
(the rulings recorded as J-V13.51–62 and J-V14.49–55), and every cross-volume request was grepped by its names in the
volume it addresses and read in context. A finding is **resolved** when both volumes now say one thing; a **residual**
is either a *wording* slip (a stale name, a missing or wrong cross-citation — fixed here in place, each edit an
exact-match replacement with its count asserted, listed in the volume's Integration notes) or a *mechanism*
disagreement (not designed here; listed for reconciliation round 1 with both texts and a recommendation).

### 1.1 The seam findings

| id | state | V13 § | V14 § | what was checked; the residual and its disposition |
|---|---|---|---|---|
| SW-01 | resolved (one wording residual, fixed) | §2.2, §2.3, §3.7 (1), (6), §1b.2, R-V14-3 | §1.2, §1b.1, §1b.2, §1b.6, §2.2, §2.5, §3.4 (a), J-V14.43, §10.2 (1) | V13 owns `SuitabilityTerm`, `SuitabilityContext` (with `territories`, `wetStage`), `terms.register`, `score` and eight generic terms; V14 defines its seventeen plug-ins once and names the term `destination` with `reach.siteKm`. Residual: V14 wrote the registration call as "V13's `register(term)`" (nine places) where V13 §2.2 declares `terms.register(term)` — renamed in V14; T-V14-8 still said the card's columns reach "V13's `site` term" — now `destination` |
| SW-02 | resolved | §5.7, R-V14-7, J-V13.52 | §2.5 `Lod25Row` world stops, §5.4, §5.6 (10), §8, J-V14.34, J-V14.49, §10.2 (10) | R1–R4 own the 2.5D view of every document; V13 §5.7 supplies drawables with `ZDecl` rows. One stale cross-cite in V13 §1.2's V14 row ("2.5D is V14's (V13 §5.6)") — now §5.7 |
| SW-03 | resolved (two wording residuals, fixed) | §2.2 `score` comment, §3.7, §3.7 (6), BCR-V13-8, R-V14-3, J-V13.53 | §2.5, §3.1 G3 row, §3.4 (a), J-V14.43 | No random or jitter term; one deterministic tie-break (V13 §3.7 (6)). Residuals in V14: §3.15 Determinism still listed "G3's controlled random term (`site`, the card, `siting`)" and T-V14-8 "two runs with different `siting` draws differ only among tied candidates" — both reworded to no draw |
| SW-04 / R-V14-5 | **residual — mechanism (open, R1-1)** | §2.8 (markers, zones rows), §3.15 (3) | §3.2 *Import candidates*, §2.5 `importKinds`, T-V14-5, J-V14.50, §10.2 (13) | See §1.4 R1-1: V13 says the import's markers become `SitingProposal`s with `demand: 'import'` handed to G1 as candidates and the zones `zone` annotation records; V14 says V13's adapter raises one `dropSite` per marker, making declared candidate cards in the world document. Two producers of one record kind |
| SW-05 / R-V14-9 | resolved | §1b.2, §3.11.4 *The transient form*, §6 `WORLD-9`, R-V14-9, J-V13.54 | §1b.2, §3.10 (4), §6 crop-frame row, §10.2 (2) | `charterFor(world, TransientPlacement)` writes nothing; V14's E1 (4) calls it with the click as `originCm`; 20 · 26 ms inside the first frame |
| SW-06 / R-V14-10 | resolved (one missing cross-cite, fixed) | §2.2 `WaterSurface.kind 'site'`, §3.12.6, §3.13.1, §4.1 `setSurface`, R-V14-10, J-V13.55 | §3.7, §4.3 `floodSite`/`drainSite`, §4.6 water row, §10.2 (7) | Residual: V14 §3.7 did not say G6 hands a level's units as `WaterUnit`s with `passages` from the unit graph and the links (R-V14-10) — one clause added |
| SW-07 | resolved (one missing cross-cite, fixed) | §2.2 `WorldEvent`, §1b.1, §2.4, §2.5, §2.6, §3.11.6 `events`, §4.1 `addEvent`, BCR-V13-11, J-V13.56 | §1b.5, §1b.6, §2.5 `recentEventWeeks`, §3.10 (4), §3.13 (b) | Residual: V14 cited "V13's world document's event index" without naming `WorldEvent` or `worldFactsAt(…, sinceWeek)` — named in §1b.5 and §3.10 (4) |
| SW-08 / R-V14-8 | resolved (one wording residual, fixed) | §2.2 `Glyph`, `GlyphMark.kind 'glyph'`, §3.10 (4), §5.1 settlements row, R-V14-8, J-V13.57 | §1b.6, §3.9 (d), J-V14.51, §10.2 (6) | Residual: V14 §3.9 (d) called the level-0 mark "one `dot` mark with `class` the kind" where V13 §3.10 (4) and §5.1 make it a `glyph` mark whose `class` is the kind's icon id — V14 reworded |
| SW-09 | resolved | §2.2 `culture` comment, §2.6, §3.9 (2), §1b.1, J-V13.58 | §1b.6, §10.2 (5) | culture from the host's seats or the recipe, never V14's |
| SW-10 / R-V14-12 | resolved | §3.11 (the `placed` outcome row), §3.11's edges, §1b.2 `world.placed`, J-V13.59 | §1b.2 `SiteAdopt`, §3.9 (e), §4.5, J-V14.52, §10.2 (14) | V13 calls nothing of V14; the application raises `adoptSite` on `world.placed` |
| SW-11 / R-V14-11 | resolved (one wording residual, fixed) | §2.7, §3.11, R-V14-11, J-V13.60 | §2.2 `placementRef`, §3.1, §3.4 (a), §4.2, T-V14-31, J-V14.53, §10.2 (8) | Residual: V14 §3.9 (e) (3) still wrote "`placement` the settlement's" after adoption — now `placementRef` the settlement's `worldRef` (the site's `Placement` folded into the settlement's, V13 §2.6) |
| SW-12 | resolved | §2.1 | §2.4 `EncounterAddress`, §3.12 (5), §4.2 `dropSite.at` | integer `WorldPointCm` everywhere; no `xM` or metre point remains (grepped) |
| SW-13 | resolved | BCR-V13-5, BCR-V13-7, J-V13.61 | BCR-V14-3, J-V14.54, §10.2 (11) | one merged union text per line, carried by V13's requests and cited by V14's (file k items 608, 611) |
| SW-14 | resolved (two wording residuals, fixed) | §8.1, §8.2 M-W0h row, BCR-V13-19, BCR-V13-21, J-V13.62 | §1.4, §1b.6, §3.7, §8 | Residual in V13: §8.2's closing paragraph still said the frame-side water state "is ≈ 4 pw inside M-W1 and is built first" and §8.3's heading "Order inside M-W1" while its steps 1–4 are M-W0h's; the M-W1 row repeated M-W0h's contents — the paragraph, the heading and the row now name M-W0h |
| SW-15 | resolved by this lane | — | — | INDEX.md rows (§4 below) |
| SW-16 | resolved | §2.1, §3.8 (3), T-V13-39 | — | integer metres into `delaunay`, inside §3.2 (1)'s range |
| SW-17 | resolved | §3.14.2 step 5, T-V13-21b (11), (12) | §3.10 *The memo*, §2.4 `waterStamp` | the names resolved |
| SW-18 | resolved | §5.1 last paragraph | §5.3 water parenthesis, §10.2 (4) | V13 names E3's two reads; the rendering rule is V14 §5.3's |
| SW-19 | resolved | §3.11 (a site subject), §4.3 rows, R-V14-11 | §3.4 (a) | `worldWins` on a site is V14's re-materialization |
| SW-20 / R-V14-1, R-V14-2 | resolved (three stale names, fixed) | §1.4, §2.4 `WorldFacts.sites`, §3.8 (1), §3.10 (2), R-V14-1, R-V14-2 | §2.2, §2.5 | Residual: V13 §1b.1's `Placement` row and §1b.2's transform row still fed "V14's `SiteAnchor` for a free-standing site" — a free site has a `Placement` and a `placementRef`, not an anchor (SW-20 (b)) — reworded |
| SW-21 | resolved (V13's citations aligned, fixed) | §2.5, §1b.1 namespace row, BCR-V13-6, R-V14-2, Integration notes | §2.8 | Residual: V13 named "a `SiteAnchor`" as the cross-document reference written whole; after SW-21 the anchor's own references are bare and the cross-document form is the access record's `SiteReach` — V13's five mentions reworded to `SiteReach` (the request's substance unchanged: the segment resolves it) |
| SW-22 | resolved | §5.7, BCR-V13-28 (`z: ZDecl` column) | §5.4 world row, T-V14-16, §10.2 (10) | V13's rows carry `z`; V14's lint reads them |
| SW-23 | resolved (two wording residuals, fixed) | §1.1 H-STATE row, §1.2, §1b.1, BCR-V13-3's heading | §1b.6, §3.3 | Residual: V13 §2.2's frame-side paragraph still said "the base's water-table rule (§2.4)" and BCR-V13-27 "(§2.4's closing reference to §5.3's row)" — the sentence stands in the base's §2.6 (verified at the base's l. 1957); both now say §2.6 *Basements* |
| SW-24 | resolved | BCR-V13-5 (view keys) | — | |
| SW-25 | resolved | §2.7 `surfaceSetDigest`, §1b.2 | §2.4 | |
| SW-26 | resolved | §4.1 `setSurface` | §4.6 water row, §4.3 | |
| SW-27 | resolved (one missing cross-cite, fixed) | §4.1 `date?` on `setField`/`rerouteReach`, §3.14.1 | §3.4 (b) | Residual: V14 §3.4 (b) dated the pre-edit "at the construction layer's year" without naming the field — `setField.date` (V13 §4.1) now cited |
| SW-28 | resolved | — | §1.4, §4.3, §12 | |
| SW-29 | resolved | BCR-V13-15, BCR-V13-19 (merged texts) | BCR-V14-20, BCR-V14-22 | file k items 633, 635 |
| SW-30 | resolved | BCR-V13-22 (merged sentence), §3.12.5, §3.13.4 | §2.5 lifecycle rows (the waterlogged row), §3.8, §10.2 (17) | file k item 641 |
| SW-31 | resolved (one wording residual, fixed) | BCR-V13-21 (the II.6 condition) | §2.9 access row | Residual: V14 §2.9's access row still read "a submerged entrance reads `flooded`" — now "an entrance whose unit's class is `wading` or worse" |
| SW-32 | resolved | §6 `WORLD-9`, `WORLD-10` | §6 G3 row, crop-frame row, §10.2 (2), (15) | |
| SW-33 | resolved | §7.5 *Bars carried as rows* | §7 bar map, T-V14-32, §11 Q1 | one owner row per bar on both sides, the halves cited |
| SW-34 | resolved | §1.3 (M5's sentence: no `SiteInput`) | §1 naming paragraph | the spine (a scratch file) is not this lane's to amend |
| SW-35 | resolved | — | §8 total row, §11 Q3 | 25.75–36.25 pw; the parts re-summed by this lane: 0.75–1 + 2.5–3.25 + 1–1.5 + 2–3 + 5–7 + 2.5–3.5 + 3.5–5 + 0.75–1 + 2.5–3.5 + 2–3 + 1.5–2 + 1–1.5 + 0.75–1 = 25.75–36.25 |
| SW-36 | resolved | — | §3.9 (a), T-V14-13, §10.2's V03 row | the `secret` stair core a V03 request (file k item 639) |
| SW-37 | resolved | — | §1.4, §8, J-V14.34, J-V14.38 | V13's milestones cited by M-W ids; no bare "W1"/"W6" milestone citation remains (grepped) |

### 1.2 V13 §10.2's requests to V14 (R-V14-1 – R-V14-12)

| request | state | V14 § | note |
|---|---|---|---|
| R-V14-1 | honoured | §2.2 `attraction`, `routed`; §2.5's columns; §3.4 (d) | V13 reads them through the resolver (its side) |
| R-V14-2 | honoured | §2.8 | V13's wording aligned (SW-21) |
| R-V14-3 | honoured | §2.5, §3.4 (a) | after the two SW-03 rewordings |
| R-V14-4 | honoured | §3.7 (stores results; re-run on the cascade), §3.12 (7) | |
| R-V14-5 | **open** | §3.2 | the mechanism residual R1-1 (§1.4) |
| R-V14-6 | honoured | §2.7, §4.9 | |
| R-V14-7 | honoured | §5.6 (10), §2.5 `Lod25Row` world stops | |
| R-V14-8 | honoured | §3.9 (d) | after the `glyph`-mark rewording |
| R-V14-9 | honoured | §3.10 (4), §6 | |
| R-V14-10 | honoured | §3.7 | after the `WaterUnit` clause |
| R-V14-11 | honoured | §3.4 (a), §1b.3, §4.7, T-V14-31 | |
| R-V14-12 | honoured | §3.9 (e), §4.5, J-V14.52 | |

### 1.3 V14 §10.2's V13 row, requests (1)–(17)

| request | state | V13 § |
|---|---|---|
| (1) the plug-in interface, context fields, `destination`, no jitter | honoured | §2.2, §3.7 |
| (2) the transient `charterFor`, `WORLD-9` | honoured | §3.11.4, §6 |
| (3) the memo and `waterStamp` names | honoured | §3.14.2 step 5, T-V13-21b |
| (4) §5.1's sentence | honoured | §5.1 |
| (5) W8's culture | honoured | §3.9 (2) |
| (6) the generalized glyph, the `world.glyph` path | honoured | §2.2 `Glyph`, §3.10 (4) |
| (7) the `site` `WaterSurface`, the walk, `setSurface` | honoured | §2.2, §3.12.6, §3.13.1, §4.1 |
| (8) `setPlacement` with a site subject; `placementRef`; `worldWins` as re-materialization | honoured | §2.7, §3.11, §4.3 |
| (9) `ReasonRecord`; the event index | honoured | §2.2, §4.7; `WorldEvent` |
| (10) `ZDecl` rows for V13's drawables | honoured | §5.7, BCR-V13-28 |
| (11) the `products` union with `'site'` | honoured | BCR-V13-7, BCR-V13-5 |
| (12) M-W0h | honoured | §8.1, §8.2 |
| (13) the import's markers and zones | **open** | §2.8, §3.15 (3) — R1-1 |
| (14) the `placed` outcome, no call into V14 | honoured | §3.11, §1b.2 |
| (15) `WORLD-10` | honoured | §6 |
| (16) the merged §16 and §13.2 texts; the bar owners | honoured | BCR-V13-15, BCR-V13-19, §7.5 |
| (17) the merged V06 §3.23 (2) sentence | honoured | BCR-V13-22 |

### 1.4 Open issues for reconciliation round 1 (mechanism disagreements, not designed here)

**R1-1 — the import's markers: who makes the record, and which record (SW-04, R-V14-5, V14 §10.2 (13)).**
*V13 §2.8's markers row:* "POI records like `SitingProposal` with `demand: 'import'`, handed to V14's G1 as site
candidates (V13 §10.2's request)"; *V13 §3.15 (3):* "the markers become POI candidates for V14's G1, the zones
annotation records"; *V13 §2.8's zones row:* "a `zone` record (cells, kind, name) the view draws and V14's G1 may read;
no stage reads one". *V14 §3.2 (Import candidates):* "each marker of the import's `markers` block whose word matches a
row of `kinds.json`'s `importKinds` column … becomes a candidate card at the marker's world point … The import's
candidates enter the world document as declared cards through one `dropSite` per marker in the import's order (V13's
adapter raises them; this volume never reads the import file)"; *V14 §10.2 (13):* "the import adapter (V13 §3.15 (3))
raises one `dropSite` per marker with the marker's word and world point and passes the zones as `info.site.zone`
annotations". The two texts agree on the inputs (the marker's word and point, the zones as annotations) and disagree on
the producer and the record: V13 writes a transient-looking `SitingProposal` per marker and leaves the card to the DM;
V14 has V13's adapter write a declared `WorldSite` card per marker (an event in the world document's log, which moves
its digest and is undone like any drop). *Recommendation (vetoable):* V13's reading — the adapter writes
`SitingProposal`s with `demand: 'import'` (the import's provenance on each), V14's site dialog lists them in a
**From the import** tab as candidate `dropSite`s at the proposal's `at` in the covering context, the DM's acceptance is
the `dropSite` (item 133 (h): dropping an icon creates a card — the DM's act), and T-V14-5's import clause asserts the
proposals' kinds by `importKinds` and the DM-accepted cards' byte-identical re-derivation; V14 §3.2's sentence "(V13's
adapter raises them …)" and §10.2 (13) then read so. Reason: the seam's own required change said "nothing is dropped
until the DM accepts one", and V13 §2.8's rule that no import fact is trusted as an input (J-V13.48) extends to a card.
*Owner of the change:* V14 (§3.2, T-V14-5, J-V14.50, §10.2 (13)); V13 unchanged.

**Counts.** 37 seam findings: 36 resolved (12 of them after a wording residual fixed here in place — 16 edits in V13,
12 in V14, listed in §1.5), 1 open as a mechanism disagreement (R1-1). Requests: R-V14-1 – 12 → 11 honoured, 1 open
(R-V14-5 = R1-1); V14 §10.2's V13 row (1)–(17) → 16 honoured, 1 open ((13) = R1-1). Residuals: **wording 12 (fixed),
mechanism 1 (open)**.

### 1.5 The in-place edits of this round (each an exact-match replacement, count asserted)

| volume | where | former text (abridged) | now |
|---|---|---|---|
| V13 | §2.2 frame's side | "The base's water-table rule (§2.4)" | "(§2.6 *Basements*; SW-23)" |
| V13 | BCR-V13-27 | "(§2.4's closing reference to §5.3's row)" | "(§2.6 *Basements*' closing reference …)" |
| V13 | §1.2 V14 row | "2.5D is V14's (V13 §5.6)" | "V14's R1–R4 over V13 §5.7's drawables (SW-02)" |
| V13 | §1b.1 `Placement` row; §1b.2 transforms row | "V14's `SiteAnchor` for a free-standing site" | "V14's free-standing site (its card's `placementRef`)" |
| V13 | §1b.1 namespace row; §2.5; BCR-V13-6; R-V14-2; Integration notes | "a `SiteAnchor`" as the cross-document reference | "`SiteReach`" (the anchor's own references bare, SW-21) |
| V13 | §8.2 closing paragraph; §8.3 heading; the M-W1 row | "≈ 4 pw inside M-W1 and is built first"; "Order inside M-W1"; the frame-side list repeated | M-W0h named; the M-W1 row reads the water state "as M-W0h landed them" |
| V13 | §2.8 rural-population row | `cells.pop?` | `ruralPopPerCell?` (clean-room, §3) |
| V13 | §5.4 `ecosystemJson` row; T-V13-32 | `adapters/fmg/<version>/schema.json`; `adapters/fmg/*/schema.json` | the generic `adapters/<ecosystem>/<version>/schema.json`; "the adapter folder's `schema.json`" (clean-room, §3) |
| V14 | §3.15 | "G3's controlled random term (`site`, the card, `siting`)" | "G3 nothing (no random or jitter term …; SW-03)" |
| V14 | T-V14-8 | "V13's `site` term"; "two runs with different `siting` draws differ only among tied candidates" | "`destination` term"; "two runs are bit-identical" |
| V14 | §3.9 (d) | "one `dot` mark with `class` the kind" | "one `glyph` mark whose `class` is the kind's icon id (V13 §3.10 (4))" |
| V14 | §3.9 (e) (3) | "`placement` the settlement's" | "`placementRef` now the settlement's `worldRef` (… V13 §2.6)" |
| V14 | §2.9 access row | "a submerged entrance reads `flooded`" | "an entrance whose unit's class is `wading` or worse reads `flooded`; SW-31" |
| V14 | nine places (§1.2, §1b.1, §1b.2 ×2, §1b.6, §2.5, §3.4 (a), J-V14.43, §10.2 (1)) | "`register(term)`" | "`terms.register(term)`" (V13 §2.2's name) |
| V14 | §3.4 (b) | the pre-edit's date unnamed | "(`setField.date`, V13 §4.1; SW-27)" |
| V14 | §3.7 | G6's call without the unit form | "the unit handed as a `WaterUnit` (V13 §3.13.1; R-V14-10) whose `passages` are …" |
| V14 | §1b.5; §3.10 (4) | "V13's world document's event index" unnamed | `WorldEvent`, `worldFactsAt(world, wCm, sinceWeek)` (V13 §2.2, §2.4; SW-07) |
| V14 | §8 SE4 row | "with the new `ChamberKind`s" (against C14-27 and BCR-V14-11: no new value) | "with §2.7's existing `ChamberKind`s read on `site` parts (C14-27; BCR-V14-11)" |

## 2 Base change requests → file k (`docs/AMENDMENTS-2026-10-16k.md`, items 600–647)

**Output:** 48 items — 38 base items under 38 base sections in the design's section order (600–637) and 10
cross-volume items addressed to V02, V03, V04, V06, V07, V08, V09, V10, V11 and V12 (638–647) — carrying all 54
requests (BCR-V13-1 – 29, BCR-V14-1 – 25), NOT applied: the coherence pass applies them after files f, g and j.
File k states at its head that it supersedes file j's forecast BCR table and maps every BCR-j row to its items (a
row the volumes do not request — the identity statement, field locks, the fork, per-stage seeding — is named with the
volume section that carries the mechanism instead).

**Merges (one text per shared line, as the reconciliation ruled):** item 608 carries BCR-V13-5's merged
`Recipe.product` union with `'site'` and item 611 BCR-V13-7's merged `StrategyRegistry.products` union (SW-13;
V14's BCR-V14-3 cites them); item 633 the merged §13.2 take-over text (BCR-V13-15 + BCR-V14-22) and item 635 the
merged §16 sentence and rows (BCR-V13-19 + BCR-V14-20; SW-29); item 641 the merged V06 §3.23 (2) sentence
(BCR-V13-22 with V14's `SiteDamageRow.ratePerYear`; SW-30). Other consolidations: 603 (the `Terrain` fields, M2–M4),
606 (§2.7's three requests), 607 (§2.8: the reason record, `ZDecl`, the world's and the site's rows), 608 (§2.9: five
requests), 615 (§6.1: three), 617 (§7.1: three), 621 (§7.7: two), 623 (§8.2: three), 628 (§11.1: three), 634 (§14:
two), 640, 643, 644, 646 (the cross-volume merges).

**Deduplication and conflicts.** The only overlapping requests were the four shared lines above, each already ruled
to one text by the reconciliation; no true duplicate remained; **0 CONFLICT items**. The one open mechanism
disagreement (R1-1, §1.4) touches no base text and is recorded in file k's preamble for the pass.

**Gate rows (item 140):** K1 → 601; K5 → 602; K6 → 611, 615; K9 → 609; M1 → 616; M2, M3, M4 → 603, 605; M5 → 608,
610; M6 → 607, 608; M7 → 606; M8 → 607; M9 → 607, 622; M10 → 606, 636; M11 → 608, 625. No request touches K2, K3, K4,
K8, K11, K13; K7, K10 and K12 are held (file k's census names how).

**Labels.** Every item carries BASE or STAGED: BASE at M1's API pass for the gate's reservations (the schema fields,
union values, roles and ids that item 140 records as M1 items, each absent or inert before its producer); STAGED
with the volume's milestone otherwise (M-W0h, M-W0 – M-W4; M-ENC, M-SITE-A, M-SITE-F, M-25D).

**Quote verification (CONFIRMED).** Every "current text" quote of file k was searched as a fragment in
`docs/ARCHITECTURE.md` or the named volume (scripts in this lane's scratch: `frags.txt`, `k-quotes-check.txt`):
all 56 fragments found; four differ only in markup or wrapping, noted inline in the items — item 600's table row
(quoted with backticks in V13, a bare row in the base), item 604's `kind: 'castle'|'plaza'` (backticks), item 634's
package line (the base's column spacing), item 646's V11 key list (the keys exist, listed in V11's own order);
item 616's §6.3 sentence begins "The" on a new line in the base. **None is missing.**

## 3 Clean-room scan of V13 and V14

**Method.** (1) Every backticked code-shaped identifier of the reference readings this subject rests on —
`research/fmg/FMG-survey.md`, its ten notes and `research/sites/survey.md` (667 tokens after splitting dotted paths)
— matched whole-word against every line of both volumes, each hit marked as a base name or new (script
`scratchpad/v13v14/integrate/cleanroom_ws.py`, output `cleanroom-hits.txt`); (2) a product-name and
tool-name grep — the reference generator's name and its author's, its burg/pack/repack vocabulary, and the surveyed
dungeon tools' names — over both volumes; (3) the earlier integration's allow list (`_integrate.md` §4, §8.3) applied.

| volume | token | where | reference of the same role? | disposition |
|---|---|---|---|---|
| V13 | `cells.pop` | §2.8's rural-population row (l. 960) | **yes** — the export's per-cell rural population field of the same role (`fmg-data-model-and-io.md`) in the adapter's *neutral* record, which the volume says is "the module's own vocabulary" | **renamed `ruralPopPerCell`** in place (1 line) |
| V13 | `adapters/fmg/<version>/schema.json`, `adapters/fmg/*/schema.json` | §5.4's `ecosystemJson` row (l. 2225), T-V13-32 (l. 2362) | the adapter folder's own name — allowed by J-V13.46 and C13-50 in §3.15, but §2.8 and §3.15 themselves write the folder generically (`adapters/<ecosystem>/<version>/`) and the one named place for the ecosystem's vocabulary is the schema file reference of §3.15 | **reworded to the generic path** in place (2 lines), so the product name appears only in research citations |
| V13 | `research/fmg/…` file names; `FMG-survey.md §"Burgs and states"` | citations "as evidence" (§2.3, §3.2–§3.9, §12) | no — file and section names of our own research, cited as evidence by §17.1's rule | allowed |
| V13 | `schemaVersion` | §2.7 | no — the base's own field | allowed |
| V14 | `maxDepth` | §2.5 grammar caps, §3.5 (11 lines) | no — the reference's is a coastline midpoint-displacement recursion depth; ours is a grammar's expansion depth cap | allowed, reviewed once |
| V14 | `MFCG`, `FTG` | §3.14 SE6, §12 | no — the base's parity preset names | allowed (the base's) |
| V14 | "Foundry", "Universal VTT", "the Foundry Scene Levels importer" | §5.3, T-V14-11, §8, J-V14.47, Q4 | the export targets the owner named (item 136 (b): "Universal VTT and Foundry-class scenes") and the convention the survey records as evidence; no mechanism is copied — the field set is the published contract the base's §11.1 profile already emits | allowed |
| V14 | `BuildingClass`, `PlacementSolver`, `corridorUnion`, … | many | base names | allowed (the base's) |
| both | the dungeon tools' names (nine grepped) | — | — | **0 hits** |

**Result.** Two clean-room slips in V13 reworded in place (3 lines; both in V13's Integration notes); no identifier
of the reference generator or of any surveyed tool is used as a mechanism; the one place the ecosystem's field names
are admitted stays V13 §3.15's schema file (a data file under §14's lint). V14: 0 slips. Re-grepped after the edits:
the product name appears in V13 only inside `research/fmg/…` citations.
