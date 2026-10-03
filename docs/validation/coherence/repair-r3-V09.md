# Repair round 3 — V09 (the application) — lane coherence/repair-V09-r3

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-V09-r3; covered by the whole-design retrovalidation (J84).

PROGRESS (lane coherence/repair-V09-r3, 2026-10-01)
- P0 brief read whole; adjudication-r3's table of contents, R3-01 – R3-04, R3-06, R3-08, R3-13, R3-16, R3-21, R3-23,
  R3-24, R3-26 (and R3-05, R3-07, R3-12, R3-22, R3-25, R3-27 for context) and Part H · V09 read whole: done
- P1 the 22 issues read whole with their verifiers' entries (verify-agree-fabric/-host/-proof/-tools-r2t,
  verify-determinism-r2t, verify-edges-life-r2t, verify-model-r2t, verify-vol-V03-V04/-V07-V08/-V09-V10/-V11-V12-r2t)
  and the END lines' sources (VCS-r2-03, VAT-r2-04, VAT-r2-05, VAH-r2-07, VRC2T-01); every V09 unit concerned read whole;
  the homes cited checked in the live base and volumes (§6.3, §7.1's outcome row, II.7.6, §2.6's basement gate, §12.1,
  DR43, V01 §3.16 and §5.4 (6), V03 §4.6, V06 §3.23, V07 §4.5, V08 §3.16 (3), V10 §3.9a / §3.9b (8) / C10, V11 §2.8d,
  §3.21.1, §3.25.4, §3.25.9, §3.25.11, V12 §3.15.10 – §3.15.16 and X-V12-20): done
- P2 substitutions and blocks built (scratch generator rV09r3/build.py, subs_10 … subs_17, part s42113): done
- P3 checks (dry run of apply-blocks.py on a copy, ids, references, review-id scan, doc_checks): done
- P4 report, result JSON, LANDED: done

## Summary

* **Blocks:** 18 `REPLACE` blocks on `docs/volumes/V09-application.md` (no retitle, no insert). **Ruling requests: 0.**
* **Live files** (assemble-r2's outputs): `docs/volumes/V09-application.md` sha256 23398a30e392…; every REPLACE body is the
  live unit with count-asserted substitutions (112, each applied exactly its asserted number of times), §4.21.13 written
  whole, and the numbered items a substitution changed re-wrapped to the volume's width (a check shows the token sequence
  identical with and without the re-wrap); every untouched line is verbatim.
* **Binding rulings applied:** R3-01, R3-02, R3-03 (no grade changes a fix), R3-04, R3-06 (END), R3-08 (b), (c) (END),
  R3-13 (END), R3-16 (a)–(e), R3-21 (a), (b), R3-23 (b), (c), R3-24, R3-26; R3-07 read for agreement (below).

## Issues → where fixed (22 routed ids: 19 FIXED, 3 MERGED; none INVALID)

| id | disposition | where |
|---|---|---|
| VAF-R2T-05 | FIX | §1b's dossier-facts row "a building specified as grand": the required cell, word for word. The same class at its readers: §4.21.5 (2) cites "V08 §3.16 (3)'s "specified"", and T-V9-75's "a dossier-named hall" reads "a dossier-bound manor record (V08 §3.16 (3)'s "specified")" (a `town_hall` record specifies nothing) |
| VAF-R2T-07 | FIX | §4.20.6 (1): "its kind (viaduct, raised road, aqueduct; §2.7's `RaisedKind`)" |
| VAH-r2-04 | MERGED into VAT-r2-02 | closed by VAT-r2-02's fix |
| VAH-r2-08 | FIX | §4.21.13 (1) gains the knowledge rule as required (every line at `effectiveKey()`; the room-naming lines and the `crypt` line not drawn on a withheld building; the head, `storeyGone`, `outerWall`, `door`, `window`, `stair` and `cellar` kept; no unadmitted room named); §3.16 row 92's edge "a ruined building the key withholds" with that outcome; T-V9-86's View-as clause; §2.12's damage-lines row reads at `effectiveKey()` and re-derives at `onEffectiveKey`; §1b's row reads at `effectiveKey()` |
| VAP-r2-06 | FIX per R3-26 | T-V9-72's head "(…; item 112; takes T112-1's thematic-view clause and T112-2)"; §7's lead names "T112-1's thematic-view clause and T112-2 by T-V9-72" before the screens of items 114–126 |
| VAP-r2-07 | FIX | §7's lead adds the X-V12-20 sentence as required; T-V9-22, T-V9-85 and T-V9-87's heads add "with V12 §3.15.16's / §3.15.12's / §3.15.14's fixtures on this harness" |
| VAT-r2-02 | FIX per R3-04 (closes VAH-r2-04) | §4.21.13 (1) reads "by §6.3 *Plan damage*'s comparison — an element shows damaged while the building's decay level is above 0 and at least its threshold t (a level of 0 damages nothing, so a never-decayed building draws its plan unchanged)" — R3-04's sentence verbatim, which governs over the issue's shorter wording; §1b's row, §2.12's row and §4.9's `info.damage.<kind>` codes cell cite "§6.3 *Plan damage*'s comparison"; row 92 and T-V9-86 add the never-decayed case with a kind's range starting at 0 |
| VAT-r2-06 | FIX per R3-02 | every review id on the 52 listed lines removed, R3-02's home written where it was the only source: §1b (l. 321, 329, 370, 378), §2.12 (l. 1000), §3.8 (l. 1298), §3.16 rows 91, 93, §4.3 (l. 1725), §4.9 (l. 2174, 2186, 2191), §4.18 (l. 2854), §4.19 (l. 2877), §4.21 (l. 3340 – 3663, every one), §7's lead and T-V9-22, -76, -77, -83 – -87's cells, §8.1 (l. 4531, 4539, 4541). A scan finds no `R2-nn`, `R3-nn` or verifier id outside §9's decision rows and §10's request rows, which keep theirs as records |
| VDC2-05 | MERGED into VV910-r2-01 | closed by VV910-r2-01's fix |
| VDC2-17 | FIX | §4.9 gains `bend.under.basement`, `refuse.under.basement` and `refuse.under.route` (VDC2-16's three keys), each in V09's words with its codes cell naming §7.1's `addUndergroundAccess` outcome row and II.7.6's step, each `refuse.*` row ending with `button.showWhy`; §4.17 (after *The bends' alternatives*) gains *A building's own way down*, the `addUndergroundAccess` flow that cites them |
| VEL2-r2-03 | FIX ("(§11.2; R2-42)" written "(§11.2)") | §4.21.9 (2)'s Stop clause: standalone only — in host mode a creation from a dossier shows the strip with no **Stop**, its replay coarsened to the comfort level, every editor's creation identical (T-V8-3); (5) adds the edge; T-V9-79 adds the clause on V08's host harness (milestone M-SF added). V06 §3.20.4's *Cancel* is V06's END |
| VM-R2T-09 | FIX per R3-02 | §4.21.3 (1): " (VM-R1T-14; R2-23)" deleted |
| VV34-r2-13 | FIX per R3-16 (c) (closes VV910-r2-05) | §4.21.13 (3) is VV910-r2-05's text: the plan panel shows the look's lines under `info.crisis.ruinedFor`; the why card's `plan` section keeps the provider's rows at the building's own level, the look named by the `facts` row; §1b's and §2.12's damage-lines rows feed the look's `lookLevel` to the plan panel only; §5.8's `plan` section "at the building's own level"; row 92; T-V9-86's last clauses as VV910-r2-05 and VV34-r2-13 state |
| VV34-r2-14 | FIX | §4.9's `info.damage.<kind>` row: one per line kind V03 §4.6 maps the kinds to, with `storeyGone` and `unsafe`; `floor` "Floors rotten or fallen through in {rooms}"; T-V9-15: every `DamageElementKind` of V11 §2.8d reaches an `info.damage.<kind>` row by V03 §4.6's mapping |
| VV78-r2-08 | FIX per R3-16 (e) | §4.21.12 (4) and §5.8: at THORP, HAMLET and VILLAGE a `VillageField`'s and a `VillageEnd`'s row is the village `WhyProvider`'s answer row (V07 §4.5), shown once, the card adding none |
| VV910-r2-01 | FIX, amended per R3-23 (b) (closes VDC2-05) | §4.21.14 (4): the commonest kind live at that moment (V11 §3.25.11's rule; a kind live while its band holds `yearWeek` and, under `light: 'time'`, its hours hold the view's hour, §6.1); with none live it starts none and the button is disabled with `settings.weather.noneNow` ("No weather comes here at this time of year or day."), never a silent no-op; the dust-haze clause deleted; §4.9's `settings.weather.<word>` row adds `noneNow`; row 93 (heat shimmer in an arid row's dry weeks; the button disabled with its line where none is live); T-V9-87 likewise. R3-23 (c) at the same unit: (3) reads the columns at `yearWeek`, never `week`; (1) enables the button while a kind is live. The issue's key `noneThisWeek` is not written (R3-23 (b): `noneNow`) |
| VV910-r2-02 | FIX per R3-21 (b) | §4.21.7 (2): a host's `view.set { week }` sets §2.9's `week` (item 67's drawn week) as a user's scrub does and never writes the year position or the follow switch; row 94's outcome; T-V9-77's clause; J-V9.148 drops the host clause (and the reason that served only it) |
| VV910-r2-04 | FIX, amended per R3-16 (b) | §4.21.12 (4): a disaster look's units are its `districts` in §11.2's `looks` reader (V01's `disasterDistricts` at the view's key, evaluated in the generation worker; at the village rungs V07's units), never a call to V01 on the main thread; (5) **Show** frames a `disaster` look by the union of its units' `FindArea` shapes (V01 §5.4 (6)); §1b's crisis-lines row names the input; T-V9-85 frames a previewed disaster look so |
| VV910-r2-05 | MERGED into VV34-r2-13 | closed by VV34-r2-13's fix (its text is §4.21.13 (3) and T-V9-86's last clause) |
| VV910-r2-08 | FIX per R3-16 (d) | §4.21.12 (5): **Ask the assistant** — the card's line on V10's `drawer` entry (`ClerkHandle.send(text, 'drawer')`, no attachment), the clerk reading the look by `read_map { kind: 'look' }` (V10 §3.9b (8); prompt rule 21) |
| VV910-r2-09 | FIX per R3-24 | §4.21.10 (7): rebuilt at each change of §2.9's `week`, per chip by the gazetteer's listing at `effectiveKey()` and the drawn week (the query's `week`); (8) states the frame restriction in the issue's words; (3) lists at the drawn week; row 87's edge; T-V9-83 (e)'s scrub clause; §2.12's index row and §1b's rows 311–312 |
| VV1112-r2-14 | FIX | `crisis.look.<kind>` deleted from §4.9; each look is worded by its `crisis.looks` row's `label` (V11 §3.25.9) — §4.21.12 (2), (4)'s `{look}`, `info.crisis.<line>`'s codes cell, §5.15's row, §1b's row; T-V9-15's `crisis.look` clause dropped |

## END lines written (Part H · V09)

| END | where |
|---|---|
| VCS-r2-03 (scope) | §4.12's fallback: "`AppPrefs.touch.editFabric` defaults to false for coarse pointers … — a default only, switchable back on and never removed (item 126 (e))"; T-V9-22: "… completes its canvas script with touch events, with `AppPrefs.touch.editFabric` on (T126-1)" |
| VAT-r2-04 (rendering; R3-21 (a)) | §4.2: "(§7.8's layer controls: `LayerSpec.visible`, written by `setLayer`, §8.4)"; §3.16 row 21: "(by `setLayer`, §8.4)" |
| VAT-r2-05 (rendering; R3-16 (a)) | §4.21.8 (1) (the festivals from `LooksAnswer.festivals`), §4.21.12 (3)–(7) (the one evaluation is §11.2's `looks` reader; the why lines, card, knowledge and Find rows read it) and §2.12's crisis-card row; §1b's festival-list and crisis-lines rows for the wiring |
| VAH-r2-07 (V10; R3-13) | T-V9-85: "under a player view a none-row condition carried beside the three looks (an infiltrated stressor) is named in no line, card or count at public, and only at secret (DR44)"; §3.16 row 90's edge and §4.21.12 (6) name DR44's tier to agree |
| VRC2T-01 (rendering) | §4.21.10 (5): chip k's glyph from §8.2's nine glyphs by (k − 1) mod 9 |
| R3-06 and R3-08 (c) (adjudicator) | §4.9: `head.restored` "In use again{, years}" in place of `head.reused`; §4.21.13 (1)'s head sentence as given; row 92 and T-V9-86 follow (a generated or replayed ruin's run and years, the existence state alone before M6-E, `head.restored`) |

## Agreement fixes made at the same units (the root cause, so the finding cannot recur)

* §4.21.13 (1): "The plan is the one the building was built with (V03)" read against R3-07 (the plan last lived in;
  V03 §3.11 *Decay re-cuts no plan*) — it now cites that home. (2) names restoration as R3-08 (a) reads it (a `reoccupy`
  back into use, or a repair) and the per-element peak of R3-08 (b) (an element gained after the damage left is drawn as
  built).
* §3.16 row 92's old "a building with no abandonment epoch … read at V11's default age, the years clause dropped"
  contradicted R3-06 (c) and the END line's years clause; it now gives a generated or replayed ruin its run and years
  (V06 §3.23 (1), (4)) and keeps the existence-state reading before V06's level lands.
* Canon ids `V09-ICONF-4` (§4.21.2, §5.4), `SCOPE-C07` (§1.3) and `SCOPE-C15` (§11) are coherence-canon ruling ids, not
  the review-round and verifier ids R3-02 rules on; the base holds the same class (`SCOPE-C01`, the `COV-*` ids). Left
  as they are; noted for round 4.

## HAND-OFFS (R3-01 (3): ends no line names, for round 4's verifiers; none is open wording in V09)

* **V10** (VV1112-r2-14's other readers): V10 §1.2's V09 row (l. 201, "`crisis.look.<kind>`, `info.crisis.*`"), T-V10-29
  ("every … `crisis.look.<kind>` key V10 §3.9a and V10 §3.9b (8) render") and CVR-V10-22 name the deleted key family; they
  read each look's words from its `crisis.looks` row's `label` (V11 §3.25.9) in its place.
* **V07** §4.5's example "For now: Disaster, the mill-end fire, weeks 30–34" uses the deleted row's word; the `disaster`
  row's `label` is "Ruined quarters" (V11 §3.25.9).
* **rendering** (this round's VAT-r2-05 and VRC2T-07): V09 cites §11.2's `{ kind: 'looks'; view }` reader and
  `LooksAnswer` (its `festivals` and `crises[]` with `condition`, `sinceWeek`, `untilWeek`, `forces`, `districts`,
  `massed`) and the gazetteer query's `week?`, as R3-16 (a) and R3-24 rule them.
* **determinism** (VDC2-16): §7.1's `addUndergroundAccess` row's key cell names the three keys V09 §4.9 now carries.
* **V06** (VEL2-r2-03's (2)): V06 §3.20.4's *Cancel* says a host creation offers no cancel, citing V09 §4.21.9.
* **V03** (R3-08 (c)): V03 §4.6's head reads `head.restored`, as V09 §4.9 now words it.

## Words (principle (9)'s report)

`docs/volumes/V09-application.md`: 122 001 words before, 123 687 after (+1 686, +1.4 %). Removed: narration — 59 of the
63 review-id citations (the four left are §9 and §10 records), their clause letters with them, a design home written in
place where one was the only source; restatement — the `crisis.look.<kind>` row (76 words), a second home of V11's
labels. Added: the defect fixes' design text — the knowledge rule of the damage lines, the three underground catalogue
rows and their flow paragraph, the host-mode Stop rule, the volume-12 harness sentence, Find at a drawn week, Start a
shower now with no live kind, the `looks` reader's wiring, the edges and bar clauses. A repair round over defects, so
the unit grows; its shrink stays the rewrite's.

## Checks

* **Dry run.** `apply-blocks.py` on a copy of the live V09 (this file's blocks, the FILE line removed, as route.py
  splits them): 18 of 18 applied, 0 skipped, 0 malformed; audit 0 not OK; headings 110 → 110, none retitled; fences
  balanced; the title block unchanged; the output byte-identical to the generator's applied text.
* **Ids.** T-V9-1 – T-V9-87 each defined once, every T-V9 and J-V9 id cited defined; §3.16's rows unchanged in number;
  every "V09 §n" pointer resolves to a heading or a bold sub-item.
* **Scans.** No `R2-nn`, `R3-nn` or verifier id outside §9 and §10; no `crisis.look`, `dust haze`, `head.reused`,
  "at or above its threshold" or "view state only)" left.
* **doc_checks** (WARNING printed: reference corpus INCOMPLETE — captures, research/patreon, research/devlogs,
  research/ftg-docs and research/external missing — so the clean-room results are NOT authoritative; provisional), on the
  volume with the base's headings for S2: before → after C1 1 → 1 (0 unreviewed), C2 1 → 1 (0), C3 282 → 290 hits
  (263 → 270 unreviewed: runs of common words such as "at the building's own", "made in the generation worker"; no
  identifier, palette or list), C4 0 → 0, S1 0 → 0, S2 426 → 443 (92 → 92 unreviewed: volume-prefixed pointers).

=== FILE docs/volumes/V09-application.md ===

=== REPLACE ## 1b Wiring table ===
## 1b Wiring table

Every piece this volume adds, what feeds it, what it feeds and the base hook it plugs into; base records are cited, not
restated, and a cell names a mechanism by its home section. A piece with no consumer or no producer would be a defect
(owner, 2026-09-28: "every piece of engineering is to be wired to something else"); T-V9-12 and T-V9-15 check the two
registries mechanically.

| piece (V09 §) | producer (fed by) | consumers (feeds) | base hook |
|---|---|---|---|
| `ShellConfig`, `ShellMode`, `HostSlots` (2.2) | the boot (3.1) from media queries and the entry; V08's `embed.html` fills `HostSlots` — its `clerkMode` from the host's `clerk.config` (file f item 473), its `hostName`, its `historyLines` from `host.state` listed at the key the shell passes (`list(effectiveKey())`, 2.2, 2.10), and its `newDocuments` (V08 §3.1 step 7 (b), (c)); rebuilt on every `clerk.config` | every screen; the rail's availability; the export tab's formats; the Assistant button and the clerk slot's kind (`built-in`, or `host` for the card-only drawer); "Set by {host}" (`host.locked`) and a host card's AI mark; the history panel's group "The party" (4.10); the host-mode rule of every action that makes a new document (3.9) | §14 `@plat/app`; file f item 507 (the embed entry) |
| `toolkit.json` rows (2.3) | our table versions | the rail and options strip (4.2), the mapper (3.3), the gestures of §7.1's binding (4.3), the context menu (4.4), `@plat/docs`' tool pages, T-V9-12 | §14 `@plat/tables`; file f item 516 |
| `messages/en.json` rows (2.9, 4.9) | our table versions; V08's `host.*` rows; volume 10's key families and volume 6's `info.copy.condensed`, their `en` texts loaded from their homes (V09 §4.9's sources paragraph) | every bend line, refusal card, toast, hint, fates word, error and panel sentence of this volume; every `says` of a why section, every critique, clerk refusal and notice line the drawer draws, the clerk's button words and the withheld kind words; `@plat/docs`' messages page, one anchor per row (`messages#<key>`, the page a row's **Show me why** opens, V09 §5.15); T-V9-15, T-V10-29 | §14 `@plat/tables`; §5.2 F-EDIT; §7.1's outcome table; file f item 516 |
| a row's `buttons` (`MsgButton` lists; 2.9, 4.9) and the `button.*` rows | our table versions, in `en.json` only; the engine's `MsgRef` arguments they read (file f item 463); the dry run's `ConflictAction`s, `PreviewResult.alternatives` and the dossier's unplaced elements, for `commit`'s sources | the canvas's refusal and bend cards, toasts, the fates sheet and panels (V09 §3.3, V09 §5.3); V09 §4.9's event forms, application commands and V09 §4.5's mode ids; volume 10's cards through V10 §3.5 step 3; T-V9-13, T-V9-15, T-V9-27, T-V10-4 | §5.2 F-EDIT; §11.2; T101-3 |
| `info.copy.condensed` (3.9, 4.9) | V06 §3.15.5's line; the new document's `forkedFrom.seq` above the seq asked (V06 §4.4) | the new document's opening toast after a copy or re-run below a rebase point (V09 §3.9, V09 §4.11); T-V9-15, T-V9-27 | §2.9 `Base`; V06 §3.15.5 |
| the keymap's added rows (4.13) | `keymap.json` | the input layer; the keymap overlay | §14's input scheme; file f item 516 |
| `Draft` and the draft mirror (2.4) | pointer, key, paste and card events | the mapper; the overlay's raw stroke; the recovery offer (3.1) | §9.5 authoring surfaces |
| the mapper (3.3, 4.5) | a settled `Draft` | `preview` and `edit` calls | §7.1's events and toolkit |
| `PreviewState` (2.4) | `preview`'s `PreviewResult` | the ghost (`live.ghost`), the badge, the bend line, the refusal card, the fates shown before Accept | §11.2 `preview`; §8.2 `live.ghost` |
| `VariationSet` (2.4, 3.6) | `preview` with `variations: 3` for a derived fill, or one `preview` per clerk variation (file f item 461); `thumbnail` per preview | the tray; the committed group of V09 §3.6 | §7.3 item 10 |
| feature snap by role (3.4) | the tile worker's `RoleIndex.snap` with a role filter (file f item 517) | the draft's points; the snap highlight; the ruler (4.19) | §9.5; §8.9's snap query |
| wall arcs in the preview (3.4) | `drawWall`'s dry run (file f item 462) | the wall ghost's barrier arcs, the anchor towers, the badge's walled and barrier metres, the enclosed districts' tint | item 106 (a)–(g); §7.1's `drawWall` points form |
| placement alternatives (4.5 T6 `place`) | the top three `SiteCandidate`s of the `sites` query (file f items 463, 468) | T6's faint alternative sites; the refusal and bend cards' "put it here" | §4.7 S10b's closest sites |
| `sizeM2` on a quarter's points form (4.5 T5 `quarter`) | the badge's plus / minus and the size chips | S6's grower's target in `quarter`'s dry run (file f item 348) | §7.1 `PointsForm` |
| `Selection`, `HandleSet`, `CountBadge` (2.5) | clicks, lists, lassos; the selected geometry by V09 §3.5's rules; `PreviewResult.counts` | the context panel, the handles' drags (3.5), `live.selection` | §8.2 `live.selection`; §9.5 |
| the context panel and context menu generator (4.4) | §2.8's entity registry (edit kinds, attribute paths with their labels and help anchors, `factTier`), the entity schemas and §7.8's control registry | panel controls and menu entries → `setAttr`, `setAttrMany`, `editTable`, the kinds §7.1's binding homes; a use's **Find all {kind}s** → the Find panel's kind chip (4.21.10) | §2.8, §7.8; file f item 269 |
| map-side siting, link and split declarations (2.6) | `editTable` row operations on V11's document-only tables `siting.declared` and `siting.linkEdits` from the Shape tab, the per-kind panel, the link view and a clerk's accepted proposal | V11's resolver and S10b's score, the link binding, the split placement (V11 §4.2–V11 §4.4); the `why` and `links` answers | file f item 380; items 104 (a) (1), 105 (h), (j) |
| a wall stretch's grade override (4.7) | `setAttr(enceinte, 'profile/<arc>/grade')` | S7's operator as a fixed input | §4.8; item 106 (c); file f item 360 |
| `WhyCardModel` (2.7) | §11.2's `WhyAnswer` from `query({ kind: 'why' })` (file f item 468; each kind's `WhyProvider`, file f item 270, and each `WhySectionProvider`'s rows, V10 §3.9) with row ids resolved to sentences by V11 §4.5 | the why card (5.8), the source chips (4.7), the drawer's why turn (4.11), the underground panels (4.17) and item 110's panels and why lines (4.20.6) — `sections` drawn by all of them | §11.2's oracle |
| `LinkRow` (2.7) | the `links` query, read from the generation worker's link cache (3.15), bound by S10a/S10b's binding function | `live.links`, the Link card, the GeoJSON `supplyLink` features | §11.2; item 105 (a), (j); file f item 460 |
| a record's members (4.7) | `EntityCard.members` (`query entity`, file f item 468) and `WhyAnswer.members` | the record panel, the gazetteer's counts | §11.2; item 108 |
| `live.shade` provider (5.4) | `ModelView.fieldDriver('daylight')`; V05's held strips (`sky.island.shadeStrip`, `shadePending`) | the Shade view's tiles, its legend and readout; picture exports while it is on | §8.2 live layers; item 102 (f); file f item 411 |
| `live.links` provider (5.4) | the `links` query | the Supply links view (overlay) | §8.2 live layers; file f item 411 |
| `live.voids` provider (5.4) | V01's `districtsAbove` (V01 §3.16) | the Voids view | §8.2 live layers; file f item 411 |
| the Find panel and the view key `find` (4.21.10) | the panel's list, type-ahead and chip grid; **Find all {kind}s** in a use's context menu (4.4); V10's `find` action (4.11; V10 §2.6) | `live.find`; the results list; picture exports and the export dialog's Find line (5.10; §11.1); V10's `read_map { kind: 'find' }` and `FindView` (V10 §3.9b (7)); T-V9-83 | §2.9's `find` and `FindChip`; §9.5; item 120 |
| the Find panel's list and suggestions (4.21.10 (3)–(4)) | §11.2's gazetteer — its class counts and its match listing by class, area and layer — at `effectiveKey()` and the view's drawn week (its `week`, §2.9's `week`); V11 §2.3's labels, synonyms and `findGroup` through V09 §4.16 (3)'s matcher; V08 §3.16 (6)'s dossier entries; V01 §5.4's `findAreas(key)`; at the village rungs V07 §5.5's ends and field groups; the standing crisis looks (§11.2's `looks` reader, 4.21.12 (7)) | the list's sections, the empty box's grid, the suggestions with their counts, the chips they add; T-V9-83 | §11.2; item 120 (b)–(c) |
| `live.find` and its index (4.21.10 (6)–(8)) | per chip, §11.2's match listing at `effectiveKey()` and the view's drawn week (V09 §4.21.10 (7)–(8)); V04 §5.1's `underFindPlaces(doc, ids)` for the ids on underground parts; V05 §5.6 for the matches on Sky; V01 §5.4's `findAreas` for an area's shapes; V03 §5.5's `findRooms(plan, b, target)` for each matched building whose plan draws at the interior band | §8.2's Find rows — the veil, halo, outline, pins, count bubbles and ghost pins; the per-layer counts and **Go there**; the storey switcher's marks and "{n} found" and the plan panel's room-list marks (V03 §5.5); the results list; T-V9-83 | §8.2 live layers; §12.5's overlay budget; item 120 (e)–(f) |
| Show gaps (4.21.10 (10)) | the `gaps` flag over the kind chips; V01 §5.4 (3)'s `gapUnits(chip, key)`, counted by V11 §2.3's `CoverageSpec`, an island's units by V05 §5.6 (4), a village's by V07 §5.5 | the dashed gap outlines labelled "none here" on every layer — the Coverage view's one successor (item 120 (i)); T-V9-83 | §2.9's `find`; §8.2; item 120 (i) |
| `showCircuit` on the wall layer (5.4) | the wall layer's toggle, by `setLayer` (file f item 413) | S14 draws the barrier arcs after commit, in the town and village products (V07 §5) | §8.4 `LayerSpec`; item 106 (g) |
| view keys `thematic`, `workingLayer`, `restore/<id>` (2.1, 2.8) | the view bar; the history panel | the live providers; the tools' layer; the restore flow | §2.9 view state; file f item 277 |
| the Show menu's **SettlementForge's chains** entry (5.4) | the gazetteer's `customChain` rows as V08 §5.2's row lists them, read at the view's effective key after each load and each commit | `thematic: 'supplyChains'` → V08 §5.2's thematic row: its lines, legend and GeoJSON | §2.9 view state; §8.2 thematic rows; file f items 277, 410 |
| **New trees** (3.7, 4.5 T12 `dress`) | the Dress panel's button | `rerollLayer { concern: 'render.instances' }` → S14's instance layouts; the history line "New trees" (4.10); volume 10's `DressInput.restyle`, which reads V09 §4.5's T12 row | §6.1's rerollable concerns; §7.1 `rerollLayer` |
| **New decoration** (3.7, 4.5 T12 `dress`) | the Dress panel's button | the group V09 §4.5's T12 row states (J-V9.115) → the render-time hashes of `style.jitter` and `style.crowns` (§6.1; display only); the history line "New decoration" (4.10); volume 10's `restyle` value `'decoration'`, which reads V09 §4.5's T12 row | §6.1's rerollable concerns; §7.1 `rerollLayer`; §7.4 |
| view key `showUnexcavated` (4.17.1) | the Below group's "Show hidden caves and ruins", offered only at tier `secret` | S14's unexcavated style (V04 §5.2), which draws unexcavated and lost clusters; a picture export at `secret` | §2.9, §11.3, §11.1; file f item 278 |
| `ViewOpts.viewAs` (4.8) | the View as menu (a tier); a host's players' view, set by the embed's bridge handler as the party's key form (V08 §3.14 (5)) | §9.2's admission for this view's drawing and labels; `effectiveKey()` (2.10) — the `admitAs` of every band-less read (2.7), the key the shell lists the host's lines with (2.2), the clerk's session key and the export dialog's default knowledge (file f item 453) | §9.2's admission function; §11.2 view options; file f items 464, 572 |
| the base's own view keys placed on screen (4.19) | the Map, Below and Light groups, the Notes panel, the Dress panel, a viewer's style card | `rotation`, `plotsOnly`, `elaborate`, `handLantern`, `weather` (its `snow` offered only where snow can lie, §8.2's snow rule), favourites, notes, public notes, view pins, `stylePreset`, the grid, legend and emblem settings — their readers are the base's | §2.9 view state; §9.5 |
| the ruler (4.19) | key M and the view bar's button | a length or area readout; "Save as annotation" (a view pin) | §9.5 measure tool |
| the system chip and "New ruin / cavern / catacomb" (4.17.2) | the town's `UndergroundSystem` records by name and kind; item 109's admissibility by rung | `drawTunnel { system }`, `drawChamber { system }`, `drawChamber { system: { newKind } }` | §7.1; file f item 361 |
| "How people get down here" (4.17.3) | `AccessPoint.cause`, `UndergroundLink.cause` (V04 §2.2) and the excavation reading's connection graph (V04 §3.5.7) | the access, cavern and ruin panels; "Show the way in"; the access symbol by cause; the access edits | II.7.4; V04 §3.5.7 |
| a lost void's line (4.17.1, 4.21.3) | V04's excavation reading `lost` and its `ExcavationRecord` (V04 §2.2, V04 §3.5.7) | the void's panel line, the Below legend's "Once known" entry, "Show hidden caves and ruins" at tier `secret`; T-V9-73 | II.7.4; item 113 (e) |
| the dwelling closure (4.17.4) | a dwelling or undercity declaration on an `unexcavated` cluster; for **Use another building**, the dry run's `PreviewResult.alternatives` (file f item 372) | the access closure's pieces with the dwelling, dug by V04 §3.8's U-DIG; the bend card's **Use another building** re-preview; the clerk's `propose` for the alternative (V10 §3.16) | §7.3 item 9 |
| the catacomb, crypt and cemetery panels (4.17.5) | `CatacombComplex` (V04 §2.2), `Basement.crypt` (V03 §3.7.4), the crypt join's `AccessPoint` (cause `crypt`), the burial face and V01's opening place | the panels, the extent chart, the bends' words, the fates of an author's delete | II.7.6; V04 §3.5.1 |
| the People panel, the family tree, "Where is", the clock (4.18) | `query people`, `relations`, `whereIs`; the `time` key and `sim.advance` | the panels; the map's highlight of home and work; Find's **Where is someone?** (4.21.10 (3)) | §11.2; §10.3; §14's family-tree view |
| **Re-derive people** (4.3 T10 `hold`, 4.18) | the households chosen in the People panel, or a household's card | `regenerate` of scope `people` (§7.4's regenerate row; §10.3's re-derive people), advancing each `Household.tableVersion` (§2.7), previewed with its fates, one undo step; the history line (4.10); T-V9-12 | §7.4; §10.3 |
| `HistoryRow` (2.8) | the log (and the journal's times) | the history panel, the context panel's History tab, a generic host's viewer filter (`HostSlots.historyFilter`, §11.3) | §7.4 status; §2.9 log |
| `HistoryRow.lines`, `.dossierGroup` and the dossier groups (2.8, 4.10) | the log's `dossierFacts` events — their `changes` count, the `absorbed` week, their `notes` (V08 §3.6 step 4) — and the port's `host:port` events after each; `report(h)`'s `changes` (§5.4); `query({ kind: 'entity', dossierKey })` and `query({ kind: 'entity', id })` at `effectiveKey()` (file f item 583); V06's `EpochReport.raised.suppressedFired` for the epoch rows' lines | the history panel's absorb and creation groups: heads, note lines, report-entry lines, Show (V08 §4.6's absorb group); T-V9-69 | §7.4; §5.4; §11.2; V08 §4.6 |
| the report panel's recipe line (5.7) | §5.4's `GenerationReport.recipe` (the seed, the rung and the preset) | the report's recipe line under its head, `info.recipe.line` with `info.recipe.preset` when a preset is named; T-V9-15 | §5.4 |
| the report panel's dossier section (5.7) | `report(h)`'s `GenerationReport.dossier` and `.dossierNotes` (file f item 390); the note keys by file f item 583; the entries' addresses named by `entity` reads at `effectiveKey()` | the placement list (`report.dossier.<state>`) and the standing-note lines under `host.group.standing`; T-V9-69 | §5.4; V08 §4.6 |
| the report panel's "What its past left" (5.7, 4.21.3) | §2.7's `HistoryRecord` (the peak, its evidence and `symbolic`, the refoundings, the buried systems) and V06's replay record (V06 §2.14) | the report panel's history lines with Show; the symbolic chip on a fact whose provenance carries `symbolic` (§2.8); T-V9-73 | §2.7, §2.8; §4.11; item 113 |
| restore flow and re-run (3.9) | a row or a restore point | `undo(h, of)` groups; `forkAt`, `rerunFrom` (V06 §4.4); in host mode the new document written by `export(h, 'plat')` to the user's device and released, or the controls hidden (`HostSlots.newDocuments`) | §7.4; file f item 458 |
| `JournalEntry`, `LocalDocRecord` (2.11, 3.8) | every API call that changes the log, in two phases; compaction's `export(h, 'plat')` | recovery at open; the recent list; Recently deleted; the file `DocResolver`; `LocalDocRecord.appVersion` read at open (3.1) | §2.9's writer; §11.5 |
| `AppPrefs` (2.11) | first run, the settings screen, hint completion | the shell; a new document's recipe (the `generation` block); V06's history store and frame cache (the device settings V09 §5.12 states, which V06 §2.2 reads) | §7.6's `userGlobal` layer; V06 §2.2 |
| `ClerkSlot`, `ClerkMount`, `ClerkHandle` (2.10) | volume 10's harness (`@plat/clerk`) implementing `ClerkHandle` over V10 §2.6's view model, in host mode for both slot kinds; `ClerkMount.host` filled by the embed's bridge handler (V08 §3.1; file f item 473); `ClerkMount.effectiveKey` from the view key and View as (file f item 464); `ClerkMount.rebuildEvents`, the shell's one implementation of V09 §4.20.3 (4); `ClerkHandle.send`'s `attach.newMap` from the drawer's Start a new map from this | the drawer (4.11); the settings' Assistant section over `ClerkSettings` and the defect list (V10 §2.2, V10 §2.8); V10's `HostProxyBackend` and its session key (V10 §2.3); V10's **Put it back** (V10 §4.3) from `rebuildEvents`; V10 §3.1 (4)'s creation mode from `attach.newMap` | §11.2's clerk API; §14's clerk; file f item 473; V08 §3.1 |
| the skeleton import dialog (3.12) | `GenerationReport.prefix` (file f item 470 (d)); `CritiqueEngine.run` (V10 §3.10); a skeleton's `history` block (V06 §5.3) | the dialog's outcomes, the findings with Show and Fix (a `propose` fix run through the shell's own pipeline), "Check with the assistant" (V10's `critique` route) | §4.1, §5.4, §11.1 |
| the creation preview (4.11) | a creation proposal's scratch document (V10 §3.11 (3); file f item 469), in the empty state or after the drawer's Start a new map from this (standalone only) | the read-only view under its banner; acceptance opens the new document (V09 §3.2 (3)'s rule for the untouched empty-state town) | §11.2 |
| massing handles and the family strip (3.5) | V02 §4.5's contract; one `setMassing` dry run per feasible family | `reshapeRange`, `moveTower`, `setComposition`, `setMassing` | V02 §4.1, V02 §4.5 |
| the export dialog (5.10) | the user's options; its default knowledge, the view's effective key (2.10) | `export(h, fmt, opts)` with `knowledge` lowered only (file f item 453) and the VTT details (file f item 454); V06's `chronicle.csv`, `uses-history.csv` and animated history; V10's transcript | §11.1 |
| the share sheet (5.11) | `export(h, 'permalink')`, §6.4's refusal conditions | the clipboard; the file download | §6.4, §11.5 |
| the three load outcomes (3.14 (a)–(c)) | `open`'s load (§2.9 *Load* steps 2–3; §6.4's retention window) | V09 §3.14 (a)–(c)'s screens and their actions; the history rows (4.10); T-V9-67 | §2.9 *Load*, §6.4, §7.4's rebase row, §7.5 |
| the locus wording (4.16 (6)) | a `Locus` (a roster line's, an `assign`'s) and its target's name from the `gazetteer` query at the view's effective key (2.7) | `refuse.roster.dossier`'s `{locus}` (4.9), the history template "Asked for {name} {locus}" (4.10), volume 10's `dossier` row (V10 §3.16); T-V9-13 | §7.1's `Locus`; §11.2 `gazetteer` |
| `F5Record`, `UxSittingRecord` (7.3, 7.4) | the first-five-minutes sessions; the owner's sitting | `MilestoneRecord.ux` of M2a, M3a, M3b and M3c — M3c's clerk session (file f item 490; §13.4) | §13.3, §13.4, §13.6's protocol shape |
| `TrialRecord` (7.6) | the game-master trial's sessions and its report (item 112 (b)) | volume 12's calibration record and the fix list; §16's release gate (T112-2); T-V9-72 | §13.2 (T112-2); §16's release gate |
| the canvas script (3.12, 7.2) | the known-city fixture's gesture list, each gesture with its view scale and centre | the app harness; T101-6's agreement bar | §13.2's elegance bars; §13.4 harness |
| item 110's events (4.20; file f item 362): `drawWall` of kind `retaining` with `highSide`, `drawWay` with `raised` and the `aqueduct` class, the `terrace` sugar, `setAttr` of `spans/<n>/use` | T3 `wall`'s Retaining wall mode, T2 `ground`'s Terrace mode, T4 `road`'s Raised toggle and Aqueduct chip, T9 `shape`'s span chips; volume 10's encoders; a skeleton's prefix | the fold (the base's `RetainingWall`, raised parts and span use); the journal (3.8); the history templates (4.10); T-V9-12's walker | §7.1 (file f item 362) |
| a crossing's form and a raised way's deck paths (4.20.6; file f item 364) | the panel's Stair · Ramp chip, the Deck height and Arch spacing steppers | the fold (file f item 244's held `clearanceCm` and `spanSpacingCm`, read by its support step and the course solver); the history row by its path label (file f item 269) | §7.1's ways row; §2.7 |
| a removal of generated content and its suppression (4.20.3) | the Delete key, the context menu and T10 `hold` (a plain `delete`); the fold writes file f item 260's `detail.suppress` | V06's ledger and every generator (V06 §2.13); `info.remove.holds`; the history row's "Build it again" and `ClerkMount.rebuildEvents` (one function, V09 §4.20.3 (4)); the skeleton (file f item 455) | §7.1, §2.8; file f item 260 |
| the preview's effects (4.20.7; file f item 465) | the engine's dry run, filled from the owning volumes' rows (V02's deck buildings, V03's stored plans, V04's arch vaults, the base's routes, junctions and water) | the badge's "and {n} other changes", the fates sheet's "What else changes", the live region, the clerk's card, T1 `intend`'s whole-town ghost | §11.2 |
| the hit stack and `Selection.kind 'part'` (4.20.8; file f item 466) | the tile worker's hit-test slices; for a sky hit, the point un-displaced by the island's offset (V05 §4.2; V09 §3.4) | click-again cycling, "Select below", the span and crossing panels, T11 `name` on a raised way, the touch menu, volume 10's `entity { at }` | §11.2's `hit` |
| handle kinds `rampEnd`, `terraceLevel`, `tierStep`, `tierCentre`, `tierRadius`, `shrineInset` (2.5, 3.5) | V09 §3.5 from the selection | the mapper: `moveVertex`, `terrace`, `setMassing { op: 'tiers' }` | §9.5 |
| the Raised toggle and the Aqueduct chip (2.4, 4.20.2) | T4 `road`'s options strip; PageUp and PageDown while drawing | the mapper's `raised` and `class`; the badge (memory only, reset on tool entry) | §7.1 |
| T9 `shape`'s tier controls (4.20.5) | a selected `stepped` building at the building band | `setMassing { op: 'tiers' }`, `setAttr` of a tier's heights, shape, skirt and solid (V02 §4.6) | V02 §4.6 |
| "Keep them as yours" (4.20.3) | T1 `intend`'s whole-town ghost when a Re-derive drops generated raised ways | declared `drawWay { raised: true }` events in the Re-derive's group | §7.1 |
| "Raised ways the town builds by itself" (4.14) | the advanced panel's Streets group | `editTable` on volume 11's `raisedWays` chances, read by every raised-way generator (V06 §2.13); the dry run's "Remove them too" | §7.6 |
| the item-110 exports and the deck scene (5.10; file f item 447) | the exporters | the export dialog's rows; T-V9-61 | §11.1 |
| removals in the skeleton (3.12; file f item 455) | Export skeleton | the import dialog's *kept removed* and *nothing to remove* rows; T-V9-62 | §11.1 |
| the second known-city fixture's canvas script (7.2) | the test tree, written from its brief | T-V9-56, T-V9-3's measurement, volume 12's golden (V12 §3.14) | §13.2, §16 (item 110 (e)) |
| the tables editor's cell inspector (4.14) | V12's register entries (`CalibrationEntry`, V12 §2.6) through `dist/evidence.json` | each cell's status, reference, due milestone and evidence lines; the presets dialog's historical packs | §7.6; V12 §2.6 |
| T2 `ground`'s spring flag (4.21.1) | T2 `ground`'s **Lake** mode, its **Spring-fed (oasis)** toggle | `drawWater` whose points form carries `spring` (§7.1's `PointsForm`; item 111) → S1's oasis with its grove and gardens (§4.2 S1); the badge's grove and garden lines; the history template "Made an oasis at {place}"; T-V9-71 | §7.1; §4.2 S1; item 111 (a) |
| view key `cvdVariant` (4.21.2) | the view bar's **Colour vision** chip; Settings' Accessibility section, its machine default `AppPrefs.cvdDefault` | the tile key and the sheet's checked variant (§8.2); the legend's swatches (§9.5); picture exports while it is set; T-V9-72 | §8.2; §2.9; item 112 (a) |
| the second cues of this volume's thematic views (5.4) | V09 §5.4's view rows (a cue per colour-coded meaning) | the live providers' marks and the legend; the style check (T112-1) | §8.2's second cues; item 112 (a) |
| the history option on T1 `intend`'s sheet (4.21.3) | T1 `intend`'s **History** chip (standalone, or a host with no dossier history) | `adjust` of §4.2 S0's history option (`Recipe.history`) → the replay (§4.11; V06 §3.20); the whole-town ghost with its fates; T-V9-73 | §4.2 S0; §4.11; item 113 (a) |
| the wall repair's material (4.21.4) | T3 `wall`'s **Repair** mode, its **Material** chip (robust, or a patch row of V11's `walls.patchMaterials` by the wall's kind and culture) | `convert repairWall` with its material (§7.1; item 114 (f)); the history template; the wall's panel line; T-V9-74 | §7.1; §2.7 `Enceinte.condition`; item 114 |
| the wall states in the legend (4.21.4, 5.4) | §8.2's state rows for `standing`, `worn`, `patched`, `breached`, `dismantled` | the legend panel's wall lines and each state's second cue; T-V9-74 | §8.2; §9.5; item 114 (e) |
| the grandeur note (4.21.5) | the dry run of a hand placement or reshape above the rung's grandeur ceiling (item 115 (c)): honoured, its line `info.grand.beyondTier` | the preview card and the badge's line, the building's why card fact; V10's explanation (V10 §3.9); T-V9-75 | §7.1's outcome table; §4.7 S10b; item 115 |
| the zoom-out stop (4.21.6) | §8.8's per-map zoom-out limit (the stop where `bounds` fits the viewport's short side, plus one; stop 0 where none fits), over the bounds of town and camps while a crisis look stands (§2.9's *The crisis framing*) | the view bar's zoom control and its tooltip (`info.zoom.limit`, `.limitCamps`, `.coarsest`), the wheel and pinch, **Fit the town**, the opening view, the export dialog's frame; T-V9-76 | §8.8; §9.5; §2.9; items 116, 122 (i) |
| the season control (4.21.7) | the view bar's **Season** control: a week slider, the four season chips and **Follow SettlementForge** | §2.9's year position and follow flag → §8.2's season rows; the export dialog's season line; V10's explanation; T-V9-77 | §2.9; §7.7's DR42; §8.2; items 117, 125 |
| the progress view (4.21.9) | the worker host's stage messages (§11.2's worker boundary (`onProgress`); §12's progress rule) and each one-time wait's own steps (epochs, export tiles, replayed calls; the events a Go back to here undoes, from `edit`'s `onProgress`, §11.2's `'undo'`; an open's verification replay, `'verify'`); the cadence chosen where a run coarsened (`EpochReport.advance.cadenceWeeks`, `ReplayPlan.epochYears`; V06 §6.8) | the progress strip and its line (`progress.*`, naming the cadence), the view status's `progress.verify` line, the first map's stages filling in under it; **Stop** through `cancelAdvance` and `generate`'s and `export`'s `signal`; T-V9-79 | §12 (item 119, (a2)); §11.2 |
| the edge suite's outcomes (3.16) | each mechanism's own inputs at their limits | the `edge.*` rows, the refusals and bends named there; T-V9-80 | §5.1's ladder |
| the festival list (4.21.8) | §11.2's `looks` reader (`LooksAnswer.festivals`: §7.7's DR43, the dossier's festivals and their weeks) or, standalone, the generic festivals by culture and season | §2.9's festival display (follow · off · preview a festival) → §8.2's decoration rows; the export's festival name; T-V9-78 | §2.9; §7.7; §8.2; item 118 |
| `AppPrefs.resolution` and the view-status chip (4.21.11) | Settings › Display › **Resolution** (5.12); §8.8's Auto loop's level in force and its reason | §8.8's resolution ladder and tile DPR at boot and on each change; the chip and its tooltip; `info.resolution.fallback`; T-V9-84 | §8.8; §8.4 (g); J-R22; item 121 |
| the view key `crises` — Show crises and the crisis preview (4.21.12 (1)–(2)) | the Show menu's switch and **Preview a crisis** (the look kinds of §10.2's crisis look table) | §8.2's look rows; the legend's crisis entries (§9.5); the crisis framing (4.21.6); the picture exports' line (5.10); T-V9-85 | §2.9's `crises`; item 122 (e) |
| the crisis why lines, card and forces' numbers (4.21.12 (4)–(5)) | §11.2's `looks` reader (`LooksAnswer.crises`: the standing `ConditionOverlay`s by §7.7's DR44, admitted at the view's effective key, each look's forces' and groups' sizes as V08 carries them from the dossier, item 122 (h), and a disaster look's units in `districts` — V01's `disasterDistricts` at the view's key, evaluated in the generation worker, V01 §3.16); each condition's name read through §11.2 at `effectiveKey()`; each look row's `label` (V11 §3.25.9) | the crisis card, the legend's crisis entries, the why card's `facts` row (5.8), Find's `crises` section (4.21.10 (3)); volume 10's explanations (the same keys); T-V9-85 | §7.7's DR44; §10.2; §8.8's ring; item 122 (f), (h)–(i) |
| the damage lines (4.21.13) | V03's damage layer (§2.6 step 7; §6.3's `plan.damage`) at V06's `decayLevel(doc, lineage, week)` by §6.3 *Plan damage*'s comparison, read at `effectiveKey()`; for the plan panel only, a disaster look's `lookLevel` (§10.2) over the look's `districts` (§11.2's `looks` reader) | the plan panel's lines; the why card's `plan` section at the building's own level only (`info.damage.*`; V03 §4.6); volume 10's explanation (the same keys); T-V9-86 | §2.6 step 7; item 123 (e) |
| `AppPrefs.weatherEffects` and **Start a shower now** (4.21.14) | the advanced panel's device group (4.14); its default by §8.8's tier and reduced motion | §8.4's per-frame weather layer at §8.8's place; the session's weather timeline (§6.1's `view.weather`) and its next spell; T-V9-87 | §2.9's *Weather effects*; §6.1; §8.4; item 124 (g) |

**The dossier facts this volume shows** (it writes none; each is read through the port's digest and §7.7's rows):

| fact shown | dossier field (`DossierDigest`, §14) | the rule that carries it to the map | where it appears (V09 §) |
|---|---|---|---|
| the title's tier word | `settlement.tierWord` | §7.7 item 15 | top bar and the `title` label (5.1) |
| a locked population | `settlement.population` | §7.7 item 15; host mode's `lockedControls` (V08 §5.1) | T1 `intend`'s size card, the basic panel (4.5) |
| a dossier-owned name or kind | `institutions[].name`, `.kindLabel`, `.kind` | §7.7 item 11 (the refusal) | the panel's locked fields, `refuse.dossierOwned` (4.4, 4.9) |
| a place's knowledge | `institutions[].knownTo` | §7.7 item 7 | "Who knows this place" chips, locked (4.3) |
| a collective range | `institutions[].count` | DR9, item 108 (b) | the record panel's "between 5 and 10" (4.7) |
| why an element is as it is | the change envelope from `receipts` | §7.7 item 13 (`DossierChange`) | the why card's "Since week …" (5.8); history rows (4.10) |
| how the map read the record (the port's notes) | the digest fields each `PortNote` kind names (V08 §4.6's table) | V08 §3.6 (4) (`dossierFacts.notes`, `DossierBinding.notes`) | the history's note lines under an absorb or creation head (4.10) and the report panel's standing notes (5.7) |
| a custom kind's profile sources | `institutions[].category`, `.tags`, `.custom` | item 104 (a) (2)–(7) | the profile chips (4.7, 5.8) |
| the tier of every field | the registry's dossier paths | §2.8's `factTier` over §7.7 item 12's binding | every tier chip (4.4) |
| an ancient ruin | `site.deposits` of kind `ancient_ruins`; an institution of scene archetype `ruined-landmark` | DR19, DR24 | a ruin's why card: "SettlementForge's record names ruins here" (4.17.3, 5.8) |
| a magical node, ley lines, a magical history | `site.deposits` of kind `magical_node`; the "Magical ley lines" income rows; `history.events` of type `magical` | DR19; `HistoryHint` | a ruin's why card (the source in words) |
| mining | `site.deposits` of the mining kinds | DR19 | a cavern's why card ("Mining here makes caves likelier") |
| the cathedral | `Cathedral (10,000+ only)`, `Great cathedral` | DR9 | every cathedral's "Below" line: its crypt, always, the largest (4.17.5) |
| how many catacombs | the church records (`Parish church` and its ranges, `Monastery or friary`) and item 108's collective members | DR9, DR10; V04 §3.5.1 (3) | the catacomb panel's count sentence (4.17.5) |
| the burial faces | `Parish burial grounds`, `Burial ground`, `Burial grounds and charnel house`, `Graveyard`, the `Cemetery network` grounds | DR9, DR10, item 108; V04 §3.5.1 (1) | the cemetery's "Catacombs below" line; the catacomb's "Under {burial face}" (4.17.5) |
| a crypt record | an institution matching the subterranean row `crypt` | DR17 (file f item 386) | its church's "Below" line (4.17.5) |
| a forced system or undercity | the `tables/dossier/subterranean` rows; `CircumstanceSlice.undercity` | DR17 (file f item 386) | the system's why card ("SettlementForge's record puts it here"); an access of cause `dossier` (4.17.3) |
| an aqueduct's reason (the water system) | the records bound to `conduit_house` (`Aqueduct or water system`, `Advanced water infrastructure`) and the demand records | DR34 (V08 §2.6b (1)) | a raised way's why card: a `facts` row of tier `dossier` under "The town raised it: it needed water" (4.20.6) |
| an elevated road's reason (high ground) | the dossier-bound institutions of class significance ≥ 20 and the custom `landmark` records at their reservations | DR35 (V08 §2.6b (2)) | the same card's `ref` rows, withheld names read by kind (4.20.6) |
| a toll bridge on a dry site | the dossier's toll bridge | file f item 399 | the bridge's why card; nothing else in V09 |
| that nothing of item 110 is dossier-bound | — | V08 §2.6b (5) | every raised way, retaining wall and deck plot is removable by the plain delete (4.20.3) |
| an oasis | `site.deposits` of kind `oasis_water` on an arid site | DR40 (item 111 (a)) | the water body's why card: "SettlementForge's record puts water here" (4.21.1, 5.8); T2 `ground`'s spring toggle locked on it |
| the town's past | `peakTier`, the high-water population, `tierHistory`, `populationHistory`, `calamityHistory`, the history's events, the lifecycle's destruction and resettlement | DR36–DR39 (item 113) | T1 `intend`'s History chip reads "From SettlementForge's record" and is locked; the report panel's "What its past left"; the symbolic chip (4.21.3) |
| a wall's condition at generation | the settlement's `readiness` label and its wealth | §7.7's DR41 (item 114 (d)) | the wall's why line (4.21.4) |
| a building specified as grand | a dossier-bound record of a class in `grandeur.ceiling`'s `settings.grandClasses` (V11 §3.25.4), or a dossier government whose `villageSeat` names the manor house, seigneurial or crown (V11 §3.21.1) — V08 §3.16 (3)'s "specified", item 115 (c) | §4.7 S10b's ceiling, lifted for it | the building's why fact "Named in SettlementForge's record" (4.21.5) |
| the week | the dossier's latest stamped tick — the greatest of its conditions' `triggeredAt`, its calamities' and its history's ticks (item 125 (b)) | §7.7's DR42 | the Season control's week while **Follow SettlementForge** is on; with no stamped tick, the control's own week (4.21.7) |
| the festivals | `traditions[]` and the custom-content traditions (their windows and staging) | §7.7's DR43 (item 118) | the festival list with its weeks (4.21.8) |
| the crisis looks | the dossier's stressors and active conditions (§2.7's `ConditionOverlay`s), their names, and the forces' and groups' sizes where given (item 122 (h)) | §7.7's DR44 | the crisis card and its numbers, the why lines, the legend's crisis entries, Find's crises (4.21.12) |
| Find's dossier entries | the dossier's named entries, its names first (V08 §3.16 (6)) | §7.7 item 12's binding keys | Find's `dossier` section and its dossier chips, re-evaluated by key and anchor (4.21.10) |
=== END ===

=== REPLACE ### 2.12 Lifecycle of every new state field ===
### 2.12 Lifecycle of every new state field

| state | create | read | persist | regenerate / re-derive | undo | migrate |
|---|---|---|---|---|---|---|
| `Draft` | pointer-down or a card pick with a tool active (V09 §3.3) | the mapper, the overlay, the badge | memory; mirrored as `DraftMirror` | a committed event underneath (another client, an epoch) re-previews it at its next settle | n/a (not in the log); Esc or cancel drops it | n/a |
| `DraftMirror` | every settle of a live draft | the open flow (V09 §3.1) | IndexedDB `drafts` | — | deleted on commit or cancel | a mirror whose `appVersion` schema differs is discarded with the note "Your unfinished drawing was from an older version and could not be restored." |
| `PreviewState`, `VariationSet` | each settle (V09 §3.3), each "Show three more" | the ghost, tray and badge | memory | a stale result (older `gen`, or `logHead` moved) is dropped and re-requested | n/a | n/a |
| `Selection`, `HandleSet`, `CountBadge` | a click, a list pick, a lasso; derived from the selected geometry; from the preview | the context panel, the overlay | memory | recomputed when the selected entity's record changes (a `doc.changed` naming it) | the selection survives undo when its ids still exist, else it clears | n/a |
| `HistoryRow` | derived from the log | the history panel, the context panel's History tab, `HostSlots.historyFilter` (V09 §1b) | never | recomputed per log change | — | the templates are keyed by event kind, one for every kind of the base and volumes 1–8, and for item 110's variants by their discriminating field (`drawWall.retaining`, `drawWay.raised`, `drawWay.aqueduct`, `terrace`, `setAttr.spans/use`, `setMassing.tiers`; V09 §4.10; T-V9-15's walker); a kind from a newer version renders "A change made with a newer version of the editor"; `lines` and `dossierGroup` are derived with the row (V09 §4.10) and never stored |
| `RestorePoint` (`restore/<id>`) | the Restore-point button; the auto rules of 2.8 | the history panel | the document's view section (shared) | unaffected (a log position) | deleting a point writes the key to `null`; a restore is itself undoable (V09 §3.9) | a point whose `seq` exceeds the log (a truncated log, §7.4) is shown "at the latest state" and re-pointed on the next save |
| view keys `thematic`, `workingLayer` (per viewer) | the view bar | the live providers, the tools | the document's view section; never over a bridge | — | not logged (view state); the previous value is one click away | an unknown value reads as the default (`none`, `ground`); an older `thematic: 'coverage'` reads `none` with `find` `{ chips: [], gaps: true }` (§2.9; item 120 (i)) |
| view key `underlay` (per viewer) | the dress panel's underlay picker | the compositor (§9.5) | view section (hash, opacity, frame); the image in `assets` | — | not logged | an absent asset shows "The tracing image is not on this computer" with a re-pick button |
| `siting.declared`, `siting.linkEdits` rows (map-side, declared; V11's tables) | `editTable` from the per-kind panel, the Shape tab, the link view, "Keep together", a clerk's accepted proposal | V11's resolver, S10b, the link binding, the split placement; the `why` and `links` answers | the log (events) | held by every re-derivation; a key that no longer resolves is orphaned and reported (V11 §4.4) | the inverse row operation | V11 §4.4 (row migration by keyed row operations, §7.6) |
| `ToolRow`, `MsgRow` (with its `buttons`) | our table versions | the shell, `@plat/docs`; the rows' `buttons` also volume 10's cards (V10 §3.5 step 3) | `@plat/tables` | — | — | additive rows; a removed key is refused by the loader while referenced — a `button.*` row while a row's `buttons` name it, a mode while a `tool` button names it |
| `AppPrefs` | first run (defaults), the settings screen, hint completion | the shell at boot and on change | IndexedDB `prefs` | — | the settings screen's "Reset" restores defaults; each change is one step back in that screen | `schema` bumped with a converter; an unknown field is dropped with a note in the about screen |
| `LocalDocRecord`, `JournalEntry` | the first commit of a new document; every commit (journal); compaction (V09 §3.8) | open, recent towns, crash recovery | IndexedDB `docs`, `journal` | compaction folds the journal into a new snapshot | the log's own undo; Delete moves the town to "Recently deleted" for 30 days (`deletedAt`) with Restore; it is removed only by "Delete now" there or by the storage ladder after asking (V09 §3.14) | a snapshot of an older output version opens by §2.9's steps (frozen view or replay) |
| `UnderlayAsset` | dropping or picking an image | the compositor | IndexedDB `assets` | — | removing the underlay keeps the asset until no document's view key names it (swept at boot) | — |
| `ClerkMount.host`, `ClerkMount.effectiveKey` (2.10) | the shell's mount of the clerk slot: `effectiveKey` from the view key and View as; in host mode `host` from the embed's bridge handler (V08 §3.1) | V10's harness (its session key, `HostProxyBackend`, the host proposal intake) | memory only; the transport's token never leaves memory (file f item 473) | a new `clerk.config` replaces the body (`onConfig`); a change of either key input fires `onEffectiveKey` | n/a (not in the log) | n/a |
| a host's proposal card in the card-only drawer (4.11) | a host's `preview { proposal }` through `ClerkMount.host.proposals` (V10 §3.17) | the drawer | memory; Accept commits its events as one group with `proposedBy: 'clerk'` (V10 §4.2) | re-previewed on a moved head, stale by V10 §3.11's rule; a newer host proposal or a built-in turn supersedes it (answered `dropped`) | the accepted group is one undo step; Drop leaves nothing | n/a |
| a clerk session's transcript | V10's harness (V10 §2.7) | the drawer; the export "Assistant conversation (JSON)" (V09 §5.10) | V10's: memory, or its device store only while keep history is on (V10 §3.15) | — | accepted proposals are ordinary log events with their undo | V10's |
| view key `showUnexcavated` (per viewer) | the Below group's toggle, at tier `secret` only (V09 §4.17.1) | S14's unexcavated style; a picture export at `secret` | the view section; never over a bridge to another client | — | not logged; toggled back | absent: `false`; a client below `secret` reads it as `false` whatever its value |
| `ViewOpts.viewAs` | the View as menu (V09 §4.8); a host's players' view through the embed's bridge handler (a key form) | §9.2's filter for this view; `effectiveKey()` — the `admitAs` of every band-less read (V09 §2.7), the clerk's session key, the export dialog's default knowledge | memory only (session-transient) | `onEffectiveKey` fires on every change; cached band-less answers are re-asked | the menu's previous value; a host's form is cleared only by the host (its toggle) | — |
| `WhyCardModel` | built from a `WhyAnswer` (V09 §2.7) | the why card, the chips, the drawer, the underground panels, item 110's panels (its `sections`) | never | rebuilt at every open and on `doc.changed` naming the subject | — | — |
| `Selection.stack`, `Selection.part` (4.20.8) | a click or a tap (file f item 466's answer) | the panel, T11 `name`, the context menu's "Select below" | memory | cleared when the part's or an entry's id disappears (`doc.changed`) | kept across undo when the ids survive, else cleared | n/a |
| the effects list (`PreviewResult.effects`, 4.20.7) | each preview and each `confirm` | the badge, the fates sheet's "What else changes", the live region, the clerk's card | never | dropped with a stale preview and re-requested | n/a | n/a |
| T4 `road`'s Raised toggle and Aqueduct chip (4.20.2) | T4's options strip, PageUp and PageDown while drawing | the mapper, the badge | memory only; never `AppPrefs`, never logged | — | reset to off each time T4 is picked (J-V9.73) | n/a |
| "Keep them as yours" (4.20.3) | T1 `intend`'s whole-town ghost card | the Re-derive's group | as declared `drawWay` events in the log | held (declared) | one undo with the Re-derive | — |
| a suppressing removal, as the app shows it (4.20.3) | a Delete of generated content of file f item 260's kinds — a raised way, harbour-mouth chain, quay wall, retaining wall or deck plot (V06's `detail.suppress`), an island or sky access (V05's removed slots) | `info.remove.holds`, the history row, `ClerkMount.rebuildEvents`, the skeleton's export (file f item 455) | the log (the base's and V06's) | holds through Regenerate, New random, reloads and epochs (V06 §2.13) | undo lifts it; "Build it again" (and the clerk's Put it back, the same events) re-declares | an older document has none |
| `HostSlots.historyLines`' lines (2.2, 4.10) | a host change reaching this session — for SettlementForge a `party` value differing from the last one received, a new `partyPicturesAt` (V08 §3.1 step 7 (c)) | the history panel's group "The party" | never by the shell: the host's handler holds them in the session's memory, and a reload starts with none (the record keeps no reveal history beyond `party.prev`, V08 §4.6) | re-listed, with `list(effectiveKey())`, on each `onChange` and each `onEffectiveKey` (V09 §2.2) | none: not events, no Undo this — the host's own "Hide again" / "Reveal again" (V08 §4.2) | n/a |
| a copy saved in host mode (3.9) | an action that makes a new document, under `newDocuments: 'download'` | the user, opening the file in the standalone app (§2.9's load) | the user's device only (a `.plat` download); nothing in the frame, the host or a local store | — | n/a: the frame's document is untouched | the `.plat` reads by §2.9's steps |
| `attach.newMap` (2.10) | the drawer menu's Start a new map from this (standalone) | V10 §3.1 (4) | memory, for one message | — | Esc or the item again clears it before sending | n/a |
| view key `cvdVariant` (per viewer; 4.21.2) | the **Colour vision** chip (the view bar's Map group; Settings' Accessibility section) | the tile key and the sheet's checked variant (§8.2), the legend (§9.5), picture exports | the view section; never over a bridge | — | not logged; the chip's previous value | absent or unknown: `AppPrefs.cvdDefault`; a sheet without that variant draws its palette with its cues (§8.2) |
| §2.9's year position and its follow flag (per viewer; 4.21.7) | the **Season** control; with the flag on, §7.7's DR42 sets the week — the dossier's latest stamped tick (item 125 (b)) — at open and at each absorb | §8.2's season rows, the export's season line, V10's explanation | the view section; never over a bridge; the model and its hash untouched in every week (item 117 (a)) | a new absorb moves the week only while the flag is on | not logged; the control's previous value | absent: the flag on with a dossier, midsummer standalone (item 117 (c)) |
| §2.9's festival display (per viewer; 4.21.8) | the festival list: follow · off · preview one festival | §8.2's decoration rows, the export's festival name | the view section; never over a bridge; model and hash untouched (item 118 (a)) | a festival no longer listed after an absorb falls back to follow | not logged | absent: follow |
| the History chip's choice (4.21.3) | T1 `intend`'s sheet | the `adjust` of the recipe's history option (§4.2 S0) | the log (a canonical `adjust`, the base's lifecycle row) | a Re-derive from S0 (whole town) | one undo with its Re-derive | the recipe's migration (§7.5) |
| the Colour vision, Season and festival controls' own state | the view bar | the three keys above | none of their own: each control shows its key | — | — | — |
| T2 `ground`'s **Spring-fed** toggle, T3 `wall`'s **Material** chip (4.21.1, 4.21.4) | the options strip | the mapper | memory, per tool for the session, as every option (V09 §4.2) | — | not logged; the event they shape is | n/a |
| the grandeur line (4.21.5) | derived from the draft's events and the ceiling table, per preview; the why card's `facts` row | the badge, the preview card, the why card | never | recomputed with each preview | — | — |
| the zoom-out stop and the crisis framing (4.21.6, 4.21.12 (8)) | derived from §8.8's limit for the map's `bounds` — the bounds of town and camps while a crisis look stands (§2.9's *The crisis framing*) — and the viewport; stop 0 where none fits | the zoom controls and their tooltip, Fit the town, the opening view, the export frame | never | re-read at each `doc.changed` that moves `bounds`, at each resize, and when a look starts or ends (a week change, an absorb, the `crises` key); a view coarser than a narrowed limit settles to it about its own centre, as at a resize | — | — |
| the progress view (4.21.9) | a one-time wait past `progress.showAfterMs` | the progress strip; the view status's `progress.verify` line | memory, for the wait | — | — | — |
| view key `find` (per viewer; 4.21.10) | the Find panel (its list, suggestions, chips, Clear, Show gaps); a use's **Find all {kind}s**; V10's `find` action | `live.find` and §8.2's Find rows, the results list, picture exports, V10's `FindView` | the view section; never over a bridge (§11.3) | re-evaluated at every commit, regenerate, undo, redo, advance, load and migration; a chip whose target goes stays at count 0, dark, and lights when a match returns | not logged (view state): Clear empties it, closing the panel removes it | absent: Find off; an older `thematic: 'coverage'` opens as `{ chips: [], gaps: true }`; a chip of unknown shape is dropped |
| Find's index and suggestions (4.21.10 (4), (7)) | derived: per chip, the gazetteer's match listing at `effectiveKey()` and the view's drawn week (§2.9's `week`; the head's when absent) with each match's places by layer, band and room | `live.find`, the panel's counts and results, the suggestions | never (generation-worker memory) | rebuilt once per commit, regenerate, undo, redo, advance, load and migration, at each change of §2.9's `week` and at each `onEffectiveKey` | — | — |
| view key `crises` (per viewer; 4.21.12) | the Show menu's **Show crises** and **Preview a crisis** | §8.2's look rows, the legend's crisis entries, the crisis card, Find's `crises` section, the crisis framing, picture exports | the view section; never over a bridge | the looks standing re-read at each week change and each absorb | not logged; the switch's previous value | absent: `{ mode: 'follow' }`; a `preview` whose `look` names no row reads `follow` (§2.9) |
| the crisis card and the why lines (4.21.12 (4)–(5)) | read from §11.2's `looks` reader (`LooksAnswer.crises`: the standing overlays by §7.7's DR44, admitted at the view's effective key) | the card, the legend, the why card's `facts` row, Find's list | never | rebuilt at each week change, absorb and `onEffectiveKey` | — | — |
| `AppPrefs.resolution` (4.21.11) | Settings › Display › **Resolution** | the shell at boot and on change → §8.8's ladder | IndexedDB `prefs` (device state; never a document, its hash or the log) | — | Settings' Reset restores `auto` | absent or unknown: `auto` |
| the view-status chip (4.21.11 (3)) | derived from §8.8's loop: the level in force and its reason | the chip and its tooltip; `info.resolution.fallback` while a manual level cannot hold | never | recomputed at each level change, each settle and each device-pixel-ratio change | — | — |
| the damage lines (4.21.13) | derived from V03's damage layer at V06's `decayLevel` for the drawn week by §6.3 *Plan damage*'s comparison, at `effectiveKey()`; for the plan panel only, a disaster look's `lookLevel` | the plan panel; the why card's `plan` section, at the building's own level only | never | recomputed at each `doc.changed` naming the building, each week change and each `onEffectiveKey` | — | — |
| `AppPrefs.weatherEffects` (4.21.14) | the advanced panel's **Weather effects** | the shell → §8.4's weather layer | IndexedDB `prefs` (device state; never a document, a view key or a bridge message) | — | Settings' Reset clears it to the default | absent: the default by tier and reduced motion (V09 §4.21.14 (2)) |
| the spell in force (4.21.14) | the session's weather timeline (§6.1's `view.weather`, seeded per session); **Start a shower now** as the next spell | §8.4's weather layer | session memory only (§2.9's *Weather effects*): never saved, never a view key, never in a digest, the tile key or an export | — | — | n/a |
=== END ===

=== REPLACE ### 3.8 Autosave, compaction and crash recovery (R15) ===
### 3.8 Autosave, compaction and crash recovery (R15)

1. **Journal, in two phases** (J-V9.45). Every API call that changes the log — `edit` (a fates-sheet `confirm` among them,
   journalled in its resubmission form: the events with their fates and renames filled, §11.2 *Confirming fates*),
   `regenerate`, `adjust`, `undo`, `redo`, `advance` (V06 §4.1's whole group of epochs, one entry) and `setView` of a
   shared restore-point key — is appended to IndexedDB store `journal` as a `JournalEntry` (V09 §2.11) **before** the call
   is sent, in phase `pending` with the `logHead` before it, and rewritten in phase `done` with `logHeadAfter` and its
   `seqs` when the result is `ok` — for an `advance` that **Stop** ended, also `stoppedAfter`, the epochs it folded; a
   `conflict` or a cancelled confirmation deletes the pending entry. The pending write is issued in the same task as the
   call (the structured clone ≤ 2 ms, V09 §6.5); the next gesture never waits for either write; a write failure takes
   V09 §3.14's storage ladder.
2. **Compaction.** When the journal holds 50 `done` entries past the snapshot, or 60 s pass without a commit after at
   least one entry, or the page is hidden (`visibilitychange`), or an `advance` has just been written `done`, the app asks
   `export(h, 'plat')` (§2.9's writer; model included) in the generation worker and replaces `LocalDocRecord.snapshot`,
   then deletes the journal entries up to `snapshotSeq`. It **runs only when idle** (V09 §6.5): no draft, preview, export
   or `advance` pending and the pointer still for at least 2 s — or at once on `visibilitychange` hidden and after an
   `advance`'s `done` write, so a group of epochs never waits for idle; a compaction due while an `advance` runs waits for
   that write, so a snapshot never holds part of a group. A gesture started while a compaction runs shows the working
   ring on its badge until the preview arrives. The snapshot drops every `null` view key whose Lamport stamp is older than the
   snapshot (deleted restore points). Compaction runs under the role's knowledge key, whatever "View as" shows (V09 §4.8).
   Constants: 50 entries, 60 s, 2 s (our own; calibrate-later by the M2a autosave measurement, V09 §6).
3. **Recovery.** Opening a town reads its snapshot through `open` and re-issues the journal's calls past `snapshotSeq`
   in order. The engine is deterministic (§6), so each `done` call must reproduce its recorded `logHeadAfter`; a
   trailing `pending` call — the tab was killed between sending it and recording its result, possibly after the worker
   had committed it — is re-issued from its `logHeadBefore` and its result accepted and recorded. An `advance` is
   re-issued with its request from its `logHeadBefore`: a `done` one must reproduce its `logHeadAfter`, as every `done`
   call must, and one that **Stop** ended is re-issued with its epoch count —
   `advance(h, req, { stopAfter: stoppedAfter, onProgress })` (§11.2's `stopAfter`) — the job folding at most that many
   epochs and writing `stoppedAt` on the last, as Stop does (V06 §2.3, V06 §4.1), so it reproduces its `logHeadAfter`
   with no timed cancel; a trailing `pending` one (the tab killed mid-group, the epochs it had folded lost with the
   worker) is re-issued whole. The first mismatch stops recovery there, keeps the unreplayed calls in the record's
   quarantine (downloadable as a JSON file from the history panel), and says "Recovered your town up to {time}. {n}
   later changes could not be replayed." Nothing is discarded silently. A clean recovery says nothing.
4. **Times.** `JournalEntry.time` gives the history panel its times for the seqs each call appended (`seqs`); events that
   reached the document elsewhere show no time (J-V9.6).
5. **Leaving.** Closing the tab with a journal write pending triggers the browser's "leave site?" prompt only while a
   write is actually outstanding (typically < 50 ms); otherwise leaving is silent, because everything is already saved.
6. **Host mode.** With `ShellMode = 'host'` the local store is off: every commit reaches the host through the bridge, and
   the host is the store (§11.3; V08 §3.7); only the draft mirror stays local, keyed by the host's document id.
=== END ===

=== REPLACE ### 3.16 Edges — every mechanism at its limits (principle (11)) ===
### 3.16 Edges — every mechanism at its limits (principle (11))

Each row states the outcome, the failure rung (§5.1's ladder: check, repair locally, retry that piece, simpler shape,
substitute, leave out and report — never a whole-map retry, and in the application never a lost edit) and the test;
T-V9-80 is the edge suite, one scripted fixture per clause named by its row number. Three rules hold everywhere and the
rows name only what they add:
* **Degenerate geometry (E4).** The application draws no model geometry: every gesture reaches the model through the
  dry run. The settle (V09 §3.3 step 3) merges coincident points and drops zero-length segments by §7.1's
  authoring-boundary rule; a draft left with fewer points than its form needs (a line of one point, a lasso of two, a
  zero-area box) sends no preview — the draft stays open and the readout says what is missing (`edge.morePoints`); any
  other degenerate shape (self-touching, collinear, a sliver) reaches the dry run, whose kernel refusal (`E_DEGENERATE`,
  `E_BELOW_MIN_EDGE`, `E_SELF_INTERSECT` …) returns as its bend or its F-EDIT row (V09 §4.9) — never a crash, a hang or a
  blank (repair locally; T-V9-80 (1), T-V9-14); an edit the dry run resolves to nothing (§7.1's *Empty edits*) commits
  nothing, its readout naming why (`edge.nothingToApply.<form>`; T-V9-80 (1)).
* **Every rung (E6).** Every screen and tool works from THORP to the METROPOLIS cap; the only rung gates are those the
  base and the volumes rule — the Sky layer at CITY and METROPOLIS with islands, **New catacomb** at TOWN and above, the
  size chips' bands, the village rungs' modes (V07 §4.1), the History chip's rungs above the town's own — each shown
  disabled with its reason, never hidden without one (check; T-V9-80 (2) runs every screen's script at THORP, VILLAGE, TOWN,
  CITY and the cap).
* **Save, load, undo, redo, regenerate, migrate (E8).** A logged edit's lifecycle is §7.4's; every state this volume adds
  has its V09 §2.12 row; a view key survives save and load and is never undone (T-V9-45); session state is dropped on
  reload, the draft mirror excepted (V09 §2.4).

**(a) Data, state and flows (V09 §2, V09 §3)**

| # | mechanism | the edge | outcome | rung | test |
|---|---|---|---|---|---|
| 3 | `toolkit.json` (V09 §2.3) | a missing, duplicated or unknown row, mode or param; a `values.table` naming no table; a key binding id absent from `keymap.json` | the loader refuses the package at build (CI), never at run time; a shipped row whose table has no rows shows its param disabled with `edge.nothingToChoose` | check | T-V9-12; T-V9-80 (3) |
| 4 | `Selection`, `HandleSet`, `CountBadge` (V09 §2.5) | a selected id tombstoned by another client or an epoch; an empty `PreviewResult.counts`; a `stack` whose entries vanish | the selection drops the id (cleared when none remain) at the `doc.changed` naming it; the badge shows "0 plots · 0 households · 0 buildings"; the stack re-asks at the next click | repair locally | T-V9-80 (4) |
| 5 | the map-side declarations (V09 §2.6) | a row whose key no longer resolves; an empty `familyWeights`; a cell V11 §4.2 does not declare for its key form | orphaned and listed in the history panel's orphans (V11 §4.4); absent weights read 1; the screen cannot write it (T-V9-25), an imported one is dropped by V11's loader with its note | leave out and report | T-V9-25; T-V9-80 (5) |
| 6 | `WhyCardModel` (V09 §2.7) | an answer with no `cause`, no pulls, no drivers, no sections; a `WhyAnswer` for a tombstoned subject | `decidedBy` "The rules made it"; the bars and sections omitted, never an empty heading; a tombstoned subject closes the card with `edge.removed` | substitute | T-V9-65; T-V9-80 (6) |
| 7 | `HistoryRow`, restore points (V09 §2.8) | an event kind with no template; a restore point past the log head; 20 auto points reached; 200 named points reached | a build failure (T-V9-15), never a code on screen; the point reads "at the latest state" and is re-pointed on save; the oldest auto point is dropped; a 201st named point asks `edge.replaceOldest` | check | T-V9-15; T-V9-80 (7) |
| 8 | the clerk slot (V09 §2.10) | no clerk configured; a `clerk.config` with no transport; `onEffectiveKey` firing mid-turn | no Assistant button, and nothing of the drawer runs; mode `off` until a valid config; the turn ends and V10 §3.12 (6) clears it (`clerk.view.cleared`) | check | T-V9-27; T-V9-40; T-V9-80 (8) |
| 9 | the local store (V09 §2.11) | IndexedDB refused; the quota full; a record from a newer version; a record with no snapshot | memory-only with `error.storageNone`; the storage ladder with `error.storageFull`; read-only with `error.newerApp`; the record listed with `edge.unreadable` and Download of its journal | substitute | T-V9-17; T-V9-80 (9) |
| 10 | boot and open (V09 §3.1) | a permalink at every rung; a file that fails the fingerprint; a file of each output version; a crash between the worker's commit and the journal's `done` | every rung opens by the same route; `error.openRefused`; V09 §3.14 (a)–(c); recovery replays to the last committed head | retry that piece | T-V9-67; T-V9-17; T-V9-80 (10) |
| 11 | the empty state (V09 §3.2) | a site on which the one-click default is infeasible; a THORP or METROPOLIS request from T1 `intend` | S1's ladder bends the site (§4.2 S1), and the report says so; the proxies keep §7.8's budget at each rung, the METROPOLIS proxies after the first map | simpler shape | T-V9-1; T-V9-80 (11) |
| 12 | snapping (V09 §3.4) | no candidate within the radius; exactly one; two at equal distance; a snap answer later than a frame | the unsnapped point; that candidate; the higher row of the mode's priority list, then the lower address; the unsnapped point until it lands | substitute | T-V9-8; T-V9-80 (12) |
| 13 | handles (V09 §3.5) | a shape with fewer vertices than `k`; a zero-length edge; a ring whose salient vertices crowd | every vertex a handle; the edge merged at the settle; the spacing rule drops the less salient, ties by lattice order | repair locally | T-V9-10; T-V9-80 (13) |
| 14 | variations (V09 §3.6) | a source whose three rerolls give fewer than three distinct digests; a scope with nothing to vary | the distinct ones shown with `edge.fewVersions`; the tray does not open and the draft previews once | leave out and report | T-V9-7; T-V9-80 (14) |
| 15 | New random on a scope (V09 §3.7) | a scope holding nothing rerollable (every thing locked or declared); one thing; a scope crossing a dossier-owned element; every rung; each layer toggle; undo after a save | the control disabled with `edge.allKept`; that thing alone; the element kept, the rest re-rolled; the same at every rung; a hidden layer's things re-rolled all the same (hiding is view state); one undo step, kept across save (§7.4) | check | T-V9-6; T-V9-7; T-V9-80 (15) |
| 16 | autosave and recovery (V09 §3.8) | no entry since the snapshot; one entry; a journal whose first entry mismatches; a 100-epoch advance killed after its last epoch and before compaction, one killed mid-group, and one stopped at epoch 40 and killed before compaction | nothing to replay; one call replayed; recovery stops at the mismatch with `error.recoveryPartial` and the unreplayed calls downloadable; the advance re-issued from its `logHeadBefore` to its `logHeadAfter`, the mid-group one (still `pending`) re-issued whole, the stopped one stopped again after its 40th epoch — each reopening at the journalled head, no epoch lost and no recovery line shown | retry that piece | T-V9-17; T-V9-80 (16) |
| 17 | undo, restore, copies (V09 §3.9) | nothing to undo; one event; a creation or dossier target; "Go back" of a few hundred edits at METROPOLIS; below a rebase point | the arrows disabled; that event; skipped by §7.4's target rule with its line; the progress view past 1 s; `info.copy.condensed` | check | T-V9-16; T-V9-27; T-V9-80 (17) |
| 18 | the skeleton (V09 §3.12) | an empty skeleton; a single declaration; a skeleton naming a class, table row or pack this build lacks; a skeleton from a newer version | a new town with no declarations; one row in the dialog; that declaration listed *refused* with its reason, the rest applied; opened by §2.9's steps with its notice | leave out and report | T-V9-62; T-V9-80 (18) |
| 19 | the failure ladders (V09 §3.14) | a worker death at every rung; a degenerate result in any flow | the same ladder at every rung; the E4 rule above | retry that piece | T-V9-80 (19) |
| 20 | the link cache (V09 §3.15) | a town with no consumer or no provider; a good with no provider | an empty cache and a Supply links view reading `edge.noLinks`; the consumer's `WhyAnswer` lists the unserved good (item 105 (a)) | leave out and report | T-V9-24; T-V9-80 (20) |

**(b) Editing (V09 §4)**

| # | mechanism | the edge | outcome | rung | test |
|---|---|---|---|---|---|
| 21 | the rail and working layer (V09 §4.2) | no tool offered on the layer; one; Sky at a rung without islands; Below with no network; a layer toggled off while it is the working layer | the modes shown disabled with their reasons; the one mode active; the Sky and Below switches disabled with their reasons; switching the working layer turns its visibility on (by `setLayer`, §8.4) | check | T-V9-22; T-V9-80 (21) |
| 22 | the binding table (V09 §4.3) | a (kind, target class or path) pair with two home tools; a pair with none | a CI failure of T-V9-12, never a run-time choice | check | T-V9-12 |
| 23 | the context panel (V09 §4.4) | an entity kind with no editable path; one path; a dossier-owned field; an entity tombstoned while open | the About tab only; one control; disabled with "Set by SettlementForge"; the panel closes at `doc.changed` with `edge.removed` | check | T-V9-80 (23) |
| 24 | the twelve tools (V09 §4.5) | a points form's degenerate draft; T1 `intend` at the rung's ends | the E4 rule above; the size chips of that band only | check | T-V9-80 (1) |
| 25 | multi-selection (V09 §4.6) | nothing selected; one thing; things of kinds that cannot move; a move of zero offset; undo after save | the menu's multi items hidden; the single panel; left in place and named in the badge; no event sent; one group undone | check | T-V9-80 (25) |
| 26 | the file-g edits (V09 §4.7) | a kind with no member; one member; `familyWeights` at every family's Ignore; a link with no other provider for **Use another supplier**; a wall stretch of zero length; a dossier-ranged record; every rung; undo of a group after save | the per-kind panel still writes the row, applied when a member arrives; one row pinned; every soft term off, hard needs kept (item 103 (c)); the handle offers nothing and the card says `edge.noSupplier`; the E4 rule; the count control absent (dossier-owned); the same rows at every rung; one undo step | check | T-V9-24; T-V9-25; T-V9-80 (26) |
| 27 | View as (V09 §4.8) | View as with nothing withheld at the chosen tier; a host form naming no places | the view unchanged but the banner; the form's tier alone | substitute | T-V9-66; T-V9-80 (27) |
| 28 | the catalogue (V09 §4.9) | a slot with no argument; an `{ id }` argument tombstoned | filled from the entry the button carries, else rendered as its kind word; the kind word | substitute | T-V9-13; T-V9-15 |
| 29 | the history panel (V09 §4.10) | 10 000 rows; a row whose targets are all tombstoned; every rung | virtualised within V09 §6.3; **Show** hidden, the text kept; the same at every rung | leave out and report | T-V9-80 (29) |
| 30 | the drawer (V09 §4.11) | no turn yet; one proposal; the cap reached; a proposal whose events are degenerate; a `ProposalView` with no variations; every rung; apply-then-undo off and on; a reload mid-turn | the suggested prompts; one card; `clerk.cap.reached` and the box disabled; the dry run's bend or refusal on the card; the card drawn with Drop only; the same at every rung; V10 §4.4's cases; the turn lost, the transcript kept by V10 §2.7's rule | check | T-V9-27; T-V9-80 (30) |
| 31 | touch (V09 §4.12) | a two-finger tap with no drawing tool; a long press that moves past 8 px | a zoom-to-band as a double-click; a drag, never the menu | check | T-V9-22 |
| 32 | the keyboard (V09 §4.13) | a binding at every rung; a rebinding that collides; a keymap override after an upgrade that removed its target row | the same bindings; the later rebinding refused with `edge.keyTaken`; the override dropped with a note in About | check | T-V9-80 (32) |
| 33 | the advanced panel, tables, presets (V09 §4.14) | no override; one table with one row; an override whose base row changed; the parity presets; an override after undo and after a table release | "as the rules say" everywhere; that row; the orphans list with Keep mine / Take new (§7.6); each preset's values shown with their layer; the base's lifecycle (§7.6) | check | T-V9-80 (33) |
| 34 | the roster reader (V09 §4.16) | an empty line; a line of only punctuation; a locus naming nothing | skipped; skipped; the card asks "Where is {X}?" | leave out and report | T-V9-13; T-V9-70 |
| 35 | the underground screens (V09 §4.17) | a degenerate gallery or chamber | V04's ladders (V04 §5.2's F-UNDER and F-VOID rows) with their bends | V04's | T-V9-35 |
| 36 | people (V09 §4.18) | a town of one person; no people | the tree of one card; the People panel absent (J-V9.48) | check | T-V9-46 |
| 37 | item 110's tools (V09 §4.20) | no raised way, retaining wall or deck in the town; exactly one; a zero-length stroke | the Raised-ways row reads `edge.noneStanding`; that one's panel; the E4 rule | check | T-V9-51; T-V9-80 (37) |
| 38 | retaining walls and terraces (V09 §4.20.1) | a chain of one point; a closed chain of zero area; a terrace stroke of zero length | the E4 rule; a closed chain with no area sends nothing and says `edge.drawRound`; no stroke, no event | check | T-V9-54; T-V9-80 (38) |
| 39 | raised ways (V09 §4.20.2) | a course of one station (`A = B`); a stroke whose ends are both on one vertex; an aqueduct with no source and no terminal in reach; undo, regenerate and an epoch after a raised way | no way sent, the readout `edge.samePoint`; the same; `bend.aqueduct.uphill`; the base's and V06's lifecycles (a declared way held) | check | T-V9-52; T-V9-80 (39) |
| 40 | a raised course across a sky access (J-VI.4 (f)) | `skyAccessObstacles` offers no re-route | the course ends at its last ground vertex before the column or rope line, `bend.raised.skyAccess` | simpler shape | T-V9-52 |
| 41 | removals (V09 §4.20.3) | a removal of a thing whose record is degenerate; every rung | the plain `delete`; the suppression by reason key at every rung that generates the kind (none below CITY for raised ways) | check | T-V9-53; T-V9-80 (41) |
| 42 | decks (V09 §4.20.4) | a deck with zero plots; a stamp on a deck edge | `edge.noDeckPlots`; the nearest free deck plot, bent | repair locally | T-V9-55 |
| 43 | tiers (V09 §4.20.5) | a stack of one tier; the tier cap; a zero step | the stepper at 1 with the stairs chip disabled (`edge.oneTier`); `bend.tiers.count`; `bend.tiers.step` | repair locally | T-V9-59 |
| 44 | the new records' panels (V09 §4.20.6) | a span of zero length; a crossing whose way was removed; undo of a span edit after save | the span's panel absent (V04 §3.5.4's span rule makes none); the crossing panel closes at `doc.changed`; one undo step, kept across save | check | T-V9-80 (44) |
| 45 | the effects list (V09 §4.20.7) | no effect; more than the cap; a confirm after an undo | no line and no section; `effectsMore`; the list re-read with the fresh `confirm` | leave out and report | T-V9-60 |
| 46 | the hit stack (V09 §4.20.8) | nothing under the point; a point on a mark's edge | the selection cleared; the hit radius's nearest mark | check | T-V9-58 |
| 47 | item 110 on Sky (V09 §4.20.9) | an island with no rim strip; one island; a degenerate rim stroke | V05's records decide (the move is to 1 m inside the `setback` line where one exists, else the stroke kept); the island menu's one entry preselected; the E4 rule | V05's | T-V9-80 (47) |

**(c) Screens (V09 §5)**

| # | mechanism | the edge | outcome | rung | test |
|---|---|---|---|---|---|
| 48 | the frame (V09 §5.1) | a viewport below 600 × 480; every rung | the medium layout at its minimum, the page scrolling; the same frame at every rung | simpler shape | T-V9-22; T-V9-80 (48) |
| 49 | the empty state's card (V09 §5.2) | a first map that fails | the card stays with **Surprise me** and **Open a town…**; the report names the failure rung | substitute | T-V9-1 |
| 50 | the overlays (V09 §5.3) | no preview yet; a ghost of zero area | the raw stroke only; the badge's counts, no ghost | check | T-V9-80 (50) |
| 51 | the thematic views (V09 §5.4) | nothing to draw for the view; one value; a stored value the town cannot draw (`supplyChains` with none listed); a view on every rung; each view on and off; save and reload | the legend reads `edge.nothingToShow`; the legend's one entry; read as None; the same views at every rung (Voids hidden where its source is absent; Find's Show gaps, row 88); no model digest changes; `thematic` restored per viewer | check | T-V9-23; T-V9-68; T-V9-80 (51) |
| 52 | the fates sheet (V09 §5.5) | a `confirm` with no fates and no renames; one fate; every rung | the action commits without the sheet (V09 §3.3); one row; the same at every rung, paged beyond 1 000 | check | T-V9-80 (52) |
| 53 | the other panels (V09 §5.7) | an empty report; one entry; a degenerate entry address; a report with no dossier; every rung; each style; a panel after undo | `edge.allMade`; one line; the entry drawn with no **Show**; the dossier sections omitted; the same at every rung; the Dress cards of the shipped styles; re-read at `doc.changed` | leave out and report | T-V9-69; T-V9-80 (53) |
| 54 | the why card (V09 §5.8) | an answer with nothing to show; one bar; a subject of zero area; a withheld subject | "The rules made it" and no bars; one bar at full length; the card anchored at the subject's point; its kind and nothing else | substitute | T-V9-65; T-V9-80 (54) |
| 55 | onboarding (V09 §5.9) | no hint left; one; the guided town after its step's target was deleted; `hintsDone` after a reset | no callout; that one; the step skipped with `edge.stepGone`; hints shown again | substitute | T-V9-80 (55) |
| 56 | the export dialog (V09 §5.10) | a scope with nothing in it; one building; a frame of zero area; every rung; each preset | the tab says `edge.nothingToExport` and Export is disabled; a one-building scene; the E4 rule (no frame is sent); the same tabs at every rung; the preset's knowledge and look | check | T-V9-19; T-V9-80 (56) |
| 57 | settings (V09 §5.12) | no local town; one; a stored value out of range; each toggle | Storage lists none; one row; clamped into range with a note in About; each written and restored by Reset | substitute | T-V9-80 (57) |
| 58 | open and recent (V09 §5.13) | a recent entry at every rung; a recent entry whose record was purged; reopening after a migration | the same list; the entry dropped with `edge.townGone`; opened by §2.9's steps | leave out and report | T-V9-80 (58) |
| 59 | labels in the app (V09 §5.14) | a rename at every rung; an empty name | the same inline editor; refused by the editor (`edge.nameLetter`) and never sent | check | T-V9-80 (59) |
| 60 | every new thing (V09 §5.15) | a thing with no export form; each layer off in an export; a degenerate thing | its row names "never"; the layer omitted from that export; the E4 rule | check | T-V9-19; T-V9-80 (60) |

**(d) Where two units' features meet** (the canon's combinations this volume owns)

| # | combination | outcome | rung | test |
|---|---|---|---|---|
| 61 | steep ground × the tools (T2 `ground` – T6 `place` on a slope beyond S1's steep row) | the dry run's own ladders (a road's switchbacks, a wall's barrier, a building's platform); the tool shows the bend line, never a refusal | simpler shape | T-V9-80 (61) |
| 62 | steep ground × the working layers | Below's systems follow V04's depth rule on steep ground; Sky unaffected; the layer switch unchanged | — | T-V9-80 (62) |
| 63 | a moat × the tools (T3 `wall` over a moat, T4 `road` across it, T6 `place` on its bank) | a wall follows the moat's inner edge; a road crosses by a draw or fixed bridge (§7.1's drawn-bridge rule, `bend.road.bridge`); T6's stamp takes the nearest dry plot, bent | repair locally | T-V9-80 (63) |
| 64 | a bridge × the working layers | a bridge is Ground's; its deck plots Ground's; a sewer under it Below's, reached through the hit stack's order | — | T-V9-58 |
| 65 | an oasis × the tools | T2 `ground`'s toggle (V09 §4.21.1); T3 `wall` and T4 `road` treat the oasis as water; T5 `quarter` and T8 `fill` over its grove and gardens bend as over any green | repair locally | T-V9-71 |
| 66 | an oasis × the working layers | the oasis is Ground's; on Sky the toggle is hidden (V05's water) | — | T-V9-71 |
| 67 | the frame × the tools (a gesture past `bounds`) | points beyond the frame are clamped to it at the settle, the readout saying `edge.frameEnd`; a quarter's lasso is clipped | repair locally | T-V9-80 (67) |
| 68 | the frame × the working layers | Below and Sky share the frame's `bounds`; the zoom-out limit is the ground's bounds for every layer (item 116) | — | T-V9-76 |
| 69 | a close-up neighbourhood × the working layers | the close-up is Ground's; Below and Sky show the town's layers as they stand, the close-up's edits Ground-only (V01 §4.5) | — | T-V9-80 (69) |
| 70 | a terraced ward × the tools | T2 `ground`'s Terrace on a terraced ward re-levels within the ward's steps (V01's terraced fabric keeps its step rule); T3 `wall`'s Retaining wall snaps to the ward's step lines; a quarter T5 `quarter` paints over it keeps its terraces | repair locally | T-V9-54; T-V9-80 (70) |
| 71 | a terraced ward × the working layers | Ground's; Below under a terrace follows V04's depth from the levelled ground | — | T-V9-80 (71) |
| 72 | a composed building × the working layers | Ground's at the building band; its basement and crypt reached on Below's band and in the plan panel | — | T-V9-80 (72) |
| 73 | a crypt × the tools (T6 `place`'s chamber inside a church; T9 `shape`'s plan events on it) | V09 §4.17.5 (a) and (e)'s bends | repair locally | T-V9-35 |
| 74 | a crypt × the working layers | the crypt is a basement, drawn on Below's band with its church's plan, never listed as a system (J111) | — | T-V9-35 |
| 75 | a plan × the working layers | a stored plan's storeys switch with the storey switcher on Ground; its basement on Below's band | — | T-V9-80 (75) |
| 76 | an island's shade × the tools | a tool acting in a shaded cell reads the field as it stands; **Update shade now** after an island moves; the shade view's pending line until then | — | T-V9-43 |
| 77 | an island's shade × the working layers | the shade is Ground's view (`live.shade`); switching to Sky keeps it drawn dimmed | — | T-V9-43 |
| 78 | a sky access × the working layers | its foot on Ground, its top on Sky; each end selected on its layer, the hit stack joining them | — | T-V9-80 (78) |
| 79 | a landfall × the tools | a stroke over a landfall's covered set bends as over rubble ground (V05 §3.16); T10 `hold`'s re-roll leaves the landfall held | repair locally | T-V9-80 (79) |
| 80 | a landfall × the working layers | the fallen island's remains are Ground's; its landing yards Sky's while it floated | — | T-V9-80 (80) |
| 81 | a town's history × the tools | while the timeline thumb is off "now" the tools are disabled with V06's band, each offering **Open a copy from here** at the frame's seq (`info.past.viewing`, V09 §5.6); a tool edit after an epoch acts on the present; "Re-run from here" keeps later hand edits listed | check | T-V9-41; T-V9-80 (81) |
| 82 | a town's history × the working layers | every layer is drawn at the thumb's week; Below's `lost` voids follow the replay (V09 §4.17.1) | — | T-V9-73 |
| 83 | a dossier × the tools | a dossier-owned field is locked (`refuse.dossierOwned`); a dossier element's delete is **Not here**; a T6 `place` or T7 `roster` line naming no element takes `refuse.roster.dossier`; an absorb under a pending ghost re-previews it | check | T-V9-13; T-V9-69 |
| 84 | custom content × the tools | a custom kind stamps and sites by its profile (item 104); its chain's links pin, move and cut as any link | — | T-V9-24; T-V9-68 |
| 85 | custom content × the working layers | custom institutions are Ground's; a custom underground kind is Below's by its registry row | — | T-V9-80 (85) |

**(e) Items 120–126's screens (V09 §4.21.7, V09 §4.21.10 – V09 §4.21.14)**

| # | mechanism | the edge | outcome | rung | test |
|---|---|---|---|---|---|
| 86 | Find's list and type-ahead (V09 §4.21.10 (3)–(4)) | a section with nothing (no named place, no people module); a word matching nothing; a one-letter word; a typo in a word of four letters or fewer; a word naming a kind the key withholds; a whole word several present kinds carry; every rung | the section omitted; `find.noMatch`; prefix suggestions only; no typo forgiven there (prefix and whole word only); never suggested, listed or counted (item 120 (h)); each kind and one "All {word}s" chip; the same panel at every rung, the village rungs' ends and field groups under `areas` | check | T-V9-83 |
| 87 | Find's chips (V09 §4.21.10 (1), (5), (7), (8), (11)) | no chip; a chip with no match; a chip whose last match goes at a commit, an advance or an undo; a scrub to a week before a matched building was built, and after a closed use's end; a dossier chip whose entry an absorb re-keys; a chip the new key withholds at `onEffectiveKey`; more than eight chips; sixteen chips at the METROPOLIS cap; save and reload; a migrated document | Find off with the panel open (no veil); count 0, dark (`find.none`); the same, lit again when a match returns; for that week the match neither drawn, pinned, counted nor listed, a chip with none there at count 0 (`find.none`), the chips unchanged and the head's matches back at the head (§11.2's gazetteer `week`); followed by key and anchor (V08 §3.16 (6) (e)); `find.withheld`, nothing drawn; colours repeating, each chip's glyph and dash telling them apart; the union drawn within §12.5's overlay budget, the index rebuilt once per commit; the chips restored from the view section; the chips kept, re-evaluated on the migrated document | check | T-V9-83 |
| 88 | `live.find` across bands and layers (V09 §4.21.10 (6), (8), (10), (13)) | every match on another layer; a match on a hidden sky layer; the city band with a thousand matches; the interior band with a matched building whose plan does not draw; Show gaps with no kind chip; Show gaps where a layer has no units; Find over each Show view; a picture export and a battle map with chips on | ghost pins only, each layer's count with **Go there**; its ghost pin at its drawn position, **Go there** showing the layer; count bubbles merged within one layer and, on Sky, one island; the building's glow and pin, no room marks; the switch disabled with `find.gapsNeedKind`; no gap drawn there; drawn over the view; drawn with the chips in the legend; left off unless **Draw Find** is on | simpler shape | T-V9-83 |
| 89 | the resolution setting and its chip (V09 §4.21.11) | a level above the screen; a level the device cannot hold; a device-pixel-ratio change during a gesture; Auto at its lowest step; a screen beyond 4K; an unknown stored value; a fresh install | greyed with `settings.resolution.screen`; the nearest level that fits, with `info.resolution.fallback`, never a refusal or a crash (T121-4); re-evaluated at once, the level applied at the next settle (T121-7); tiles below CSS density with labels and chrome at the device pixel ratio, the chip naming the level; the 4K-equivalent tile DPR scaled up (item 121 (b)); read as `auto`; `auto` (T121-1) | substitute | T-V9-84 |
| 90 | Show crises and the preview (V09 §4.21.12 (1)–(7)) | no condition and no preview; several crises at once; a crisis ending while shown; a condition with no `untilWeek`; a condition the dossier names not; a `none`-row condition carried beside the looks at a key below `secret` (DR44's tier); a preview on a dossier map; a carried preview whose look left the table; every rung | nothing drawn, byte-identical to the base (T122-7, `item122.crises`); each drawn, the outskirts shared by §10.2's priority under its density cap, each with its line on the card and in Find; drawn no more from its `untilWeek`, its card closing and its Find row going; drawn while the overlay stands, with `info.crisis.lineOpen`; `info.crisis.lineUnnamed`; never drawn, listed, named or counted; the previewed look alone while it shows; read as `follow`; the same controls at every rung, the village rungs' looks V07's | check | T-V9-85 |
| 91 | the crisis framing and the forces (V09 §4.21.12 (5), (8)) | a crisis starting and ending while the view is moved; a force larger than the frame and its margin hold; two crises whose camps widen the bounds; camps wider than the window at stop 0 | the limit, the opening view and Fit move, the view is never re-framed, a view coarser than the restored limit settling to it about its own centre (§2.9); the rest drawn as §8.8's massed marks on the ring, the card giving the full number with `info.crisis.massed`; the bounds the union of town and every camp; stop 0 with `info.zoom.coarsest` (§8.8's limit) | simpler shape | T-V9-76; T-V9-85 |
| 92 | the damage lines (V09 §4.21.13) | a building never decayed, an element kind's range starting at 0 among its kinds; a fully ruined building; a building generated abandoned, decayed or ruined, or one item 113's replay abandons or ruins; any building before V06's level lands (M6-E); a restored building, re-cut or extended after its repair; more than three rooms in a line; a crypt under a ruined church; a building in a district a disaster look ruins; a ruined building the key withholds | no line (`item123.damage`; §6.3 *Plan damage*: a level of 0 damages nothing); the ground floor's lines, each upper storey's `storeyGone`; its run's lines and years — begun V11's default age before the week it is first met so, or at the replay epoch's week, and aging from then (V06 §3.23 (1), (4)); the existence state alone at V11's default age, the years clause dropped; the lines leaving in reverse threshold order under `info.damage.head.restored`, with `info.damage.patched`, an element the plan gained after its damage left drawn as built (V06 §3.23 (3)); three rooms and `info.damage.more`; its own threshold's `crypt` line, or none; the look's lines under `info.crisis.ruinedFor` in the plan panel, the why card's `plan` section keeping the own level's rows, nothing stored; the lines naming rooms (`roofBay`, `floor`, `partition`, `furniture`, `unsafe`) and the `crypt` line not drawn, the head line, `storeyGone`, `outerWall`, `door`, `window`, `stair` and `cellar` kept, no room the key does not admit named | check | T-V9-86 |
| 93 | weather effects (V09 §4.21.14) | reduced motion; the low tier; the switch during a gesture; Start a shower now in an arid row's dry weeks, in a winter that does not freeze, at a moment with no live kind (V11 §3.25.11), with the effects off; a `snow` cover carried onto an arid row; an export while a spell shows | off by default, a user's on honoured (T124-5); off by default; applied at once, no tile touched and the gesture unbroken; the commonest live kind (heat shimmer in an arid row's dry weeks); rain, never snow; the button disabled with `settings.weather.noneNow`, nothing started; the button disabled; drawn `clear` (§8.2's snow rule); the export without the effects (item 124 (h)) | check | T-V9-87 |
| 94 | the week's fallback (V09 §4.21.7; item 125) | a dossier with no stamped tick; a tick far in the past; a host's `view.set { week }` against a moved control; an absorb bringing the first tick, the switch on and off | the control's own week (19 by default) with `view.season.noWeek`; its year position by DR42; the drawn week moves, the Season control and its switch staying as the viewer left them (§11.3); the week moved with the switch on, unchanged with it off | check | T-V9-77 |

The named combinations of the owner's list that reach the application — a settlement growing over a sealed void
(V09 §4.17.4's closure, T-V9-38), a dossier removing what an edit pinned (the pin orphaned and listed, V09 §4.10's orphans), an
epoch undone after a save (V09 §3.9, T-V9-16) — are closed at those rows.
=== END ===

=== REPLACE ### 4.2 The tool rail, the five layers and the working layer ===
### 4.2 The tool rail, the five layers and the working layer

**The rail.** A vertical column on the left (both layouts, V09 §4.12). It holds the
five layers as labelled groups — "Kind of place" (L0 INTENT), "Ground & bones" (L1 GROUND AND BONES), "What's in it"
(L2 PROGRAMME), "Fabric" (L3 FABRIC), "Finish" (L4 FINISH) — each tool a 44 × 44 px button with its icon, its name under it at UI scale 1, and its number badge (T1 `intend` – T12 `dress`, which is
also its key, V09 §4.13). **Progressive depth (R9).** On first run only the four `firstScreen` tools show: T1 `intend`, T5 `quarter`
`quarter`, T6 `place`, T12 `dress`, each layer group collapsed to a "More…" chevron. A layer group expands when the user
opens its chevron, when a hint or the guided town points into it, or when the user first uses one of its tools; the
expansion is remembered (`AppPrefs.railExpanded`). T9 `shape` and T10 `hold` are `contextual`: they appear in the rail (and
as the first two tabs of the context panel) from the first selection on, and stay. A user can pin any tool to the top of
the rail (`railPins`). The rail never scrolls on a wide layout (12 tools × 52 px + 5 headers ≤ 760 px at UI scale 1;
beyond that the groups collapse to their chevrons automatically).

**Tool options.** Picking a tool opens its options strip along the top of the map (not a dialog): the mode chips
(V09 §4.5's modes) and the parameters marked `basic`; "More" reveals the rest (R4). Options are remembered per tool for the
session.

**No layer bookkeeping (R6).** Nothing in the application orders, stacks or groups what is drawn: draw order is §8.2's
semantic order, a new thing lands where its kind belongs, and the working layer below chooses only which model layer
(ground, a sky island, the underground) the tools act on.

**The working layer** (view key `workingLayer`, per viewer; V09 §2.4): a three-way switch in the view bar — **Ground**,
**Sky** (enabled at CITY and METROPOLIS when the town has islands, II.6; a menu of the islands by name sets `key`), **Below**
(enabled when the town has an underground network, II.7, or a cavern or ruin — at any rung, item 109 (j) (1)). Switching
layer also sets the layer's visibility on (§7.8's layer controls: `LayerSpec.visible`, written by `setLayer`, §8.4) and dims the other layers to 35 %
opacity. Every tool mode declares the layers it acts on (`ToolModeRow.layers`). On **Sky** every row of V05 §4.1 takes
its sky form, with the island's `key` (V09 §4.20.9): T1 `intend` the islands setting and count; T2 `ground` the island's terrain, water and
rim, and a **Terrace** whose edge lays an island retaining wall; T3 `wall` **Draw wall** as V05 §3.21's barrier-closure enceinte
walling only the landing yards, and **Retaining wall** as an island `RetainingWall`, bent inward past the rim walk on or
along the rim (`bend.retaining.rim`; J-VI.4 (g)); T4 `road` a sky access only (V05 §4.2; Raised and Aqueduct hidden); T5 `quarter` a floating quarter; T6 `place` an
institution onto the island; T8 `fill` the brushes; T9 `shape` the island's altitude, area, position, occlusion, underside and field,
and an access's kind, role, state, knowledge and foot; T10 `hold` the island's locks, New random and **Update shade now**; T11 `name`
the island's name and label; T12 `dress` the sky layer's visibility and occlusion. On **Below**, T4 draws a tunnel, a gallery or
a link and T6 places a chamber or an access, each into the system the **system chip** names (V09 §4.17.2). A mode that
does not act on the working layer is shown disabled with its reason ("Tunnels are dug below the ground" for T4's Tunnel
on Sky). **A raised part** (item 110 (b): a ground arena part from 1) stays on the **Ground** working layer — no fourth
switch — and what lies under its deck is reached through the hit stack (V09 §4.20.8; J-V9.68).

**The Below group** appears in the view bar while Below is the working layer or the underground is visible: the **depth
band** — a ladder of the non-empty bands by depth range ("−2.5 to −5 m") with the kinds present, stepped by PageUp and
PageDown (file f item 413); the view key `depthBand` is its one store — the **view** chips *Cut-away* · *Over the streets* ·
*Below alone* (`LayerSpec.underView`: `cutaway`, `overlay`, `solo`; a `setLayer`, V04 §5.1), the **hand lantern** toggle
(the view key `handLantern`, §2.9), and, only for a view whose knowledge tier is `secret`, **Show hidden caves and ruins**
(the view key `showUnexcavated`, V09 §4.17.1). The **Sky group** holds the island menu and **Update shade now** for a
selected island (V05's `regenerate { kind: 'shade', island }`, T10 `hold`'s). The Map and Light groups are V09 §4.19's.
=== END ===

=== REPLACE ### 4.3 The tool binding table — every edit kind and where a user reaches it ===
### 4.3 The tool binding table — every edit kind and where a user reaches it

The binding is §7.1's (E-04): one home tool per (event kind, target class or path), every `EditEvent` kind of the base
and the volumes included, and the kinds no user produces directly marked with their producer. This table gives each row
its screen — the mode that emits it (generated from `toolkit.json`'s `emits`, V09 §2.3), the gesture, and the context-panel
control or pointer idiom that also reaches it; T-V9-12 checks both tables, pair by pair, against the `EditEvent` union and
the entity registry (§2.8) on every build.

| event kind (target) | the mode (§7.1's home tool) | the gesture | also from | source |
|---|---|---|---|---|
| `adjust` (intent, recipe, layers, islands, sewer family, ruins, a standalone neighbourhood document's outline; the recipe's history option, item 113) | T1 `intend` (cards and sliders; the **History** chip, V09 §4.21.3) | a card or slider change; after a declaration a Re-derive previews as a whole-town ghost and commits on Accept (V09 §3.3); across the CITY line its effects list the generated raised ways that go or come, with **Keep them as yours** (V09 §4.20.3 (7)) | the basic and advanced panels (§7.8) | §7.1, §7.8; V01 §4.2; V04 §4.1; V05 §4.2 |
| `setField(terrain)`, `warp`, `drawWater` (a lake's points form with `spring`, item 111), `moveCourseKnot`; `moveVertex` on a shore or coast | T2 `ground` (raise, lower, cliff, flatten; warp kernels; lake, with its **Spring-fed (oasis)** toggle, V09 §4.21.1; river by source and mouth; **river or canal drawn** as a line with a width handle; coast and harbour; water paint; on a selected coast its chain handles) | brush strokes; a warp session with Apply / Discard (§7.1); points forms; a drawn line → `drawWater { kind: 'river' \| 'canal', add: [], line, widthCm }`; knot drags; a coast's chain-point drags by V09 §3.5's open-chain rule (a lake keeps its level handle alone, J-V9.47) | river, lake and coast handles (V09 §3.5) | §7.1; V05 §4.2 (sky key); FTG's drawn river |
| `setAttr` on `geology`, a bank class, a site feature | T2 `ground` (on the selected ground or water) | chips | the context panel | §7.1's terrain and water rows |
| `convert` `reclaim`, `siltReach`, `shiftCourse`, `digCanal`, `retypeLand`; `setAttr` on `WaterBody.spring.flow` | T2 `ground` (the "Change over time" menu of a water, marsh or hinterland face; the land-use chip; a spring's flow slider) | a context action with a ghost; V06 §4.2's forms | the context panel | §4.11, §7.1; V06 §4.2 |
| `drawWall`, `placeGate`; `moveVertex` on an enceinte's trace — its chain points, a stretch's anchor vertex and a gate's crossing | T3 `wall` (draw, gate; on a selected enceinte its trace's handles; on Sky with the island's `key`, V05 §3.21) | two or more points or a line; a gate stamp on the trace; the trace's chain-point drags, a stretch end's drag along the trace, a gate's grip sliding it (V09 §3.5) | wall handles | §7.1; items 106 (c), (g) |
| `drawWall` of kind `retaining` with `highSide` (file f item 362 (a)); `moveVertex` on its chain; `setAttr` on a retaining wall (material, towers, high side) | T3 `wall` (**Retaining wall**; on Sky with the island's `key`) | two or more points or a line with the High side chip (V09 §4.20.1) | the retaining wall's panel and chain handles | item 110 (a) |
| `terrace` (sugar, file f item 362 (c)) | T2 `ground` (**Terrace**; on Sky with the island's `key`) | a brush with a level readout, then the level handle; Accept (V09 §4.20.1) | "Change the terrace's level" on a terrace-made wall | item 110 (a) |
| `setAttr` on the castle (`site`, `baileyArea`) | T3 `wall` (on the selected castle: its keep grip and its bailey handle) | drags, previewed | the castle's context panel ("Move the castle", "Castle grounds" stepper) | §7.4's MFCG asks |
| `convert` `wallToWay`, `gateToJunction`, `neglect`, `breach`, `dismantle`, `contractWall`, `absorbWall`, `repairWall` (with its material, item 114), `wearWall`, `repairRetaining`; `setAttr` on `Enceinte.pathway` | T3 `wall` ("Change over time" on an enceinte or gate; a run's grip: **Repair** with the **Material** chip, **Wear**, V09 §4.21.4; a neglected ring's **Back in use**; a retaining wall's decayed stretch: **Repair**) | a context action with a ghost; V06 §4.2's forms | the context panel | §4.11; V06 §4.2 |
| `drawWay` (every class; `bridge` over water; V07's walk mode); `moveVertex` on a way's chain | T4 `road` (class chips: main, street, lane, alley, track, path, quay, pier, bridge, ford; on a selected way its chain handles) | two points or a line; a chain point's drag (V09 §3.5) | way handles | §7.1; V07 §4.2 |
| `drawWay` with `raised` and the `aqueduct` class (file f item 362 (b)); `moveVertex` on a raised way's chain | T4 `road` (the **Raised** toggle; the **Aqueduct** chip; V09 §4.20.2; on a selected raised way its handles) | two points or a line, its ends on ground vertices; a `rampEnd` drag onto a ground vertex, an interior point's drag on its raised part (V09 §3.5) | a raised way's handles (`rampEnd`, interior points); **Build it again** in the history (V09 §4.20.3); **Keep them as yours** on T1 `intend`'s ghost | item 110 (b) |
| `setAttr` of a span's `use` (`spans/<n>/use`), of a crossing's `form` (`crossings/<wall>/form`), of a raised way's `clearanceCm` and `spanSpacingCm` (file f item 362 (d), file f item 364) | T9 `shape` (its `setAttr`, on a selected raised way, its span or a crossing, reached through the hit stack; J-V9.104) | chips; steppers; each previewed (V09 §4.20.6) | the span's, crossing's and raised way's panels | item 110 (a), (b); V04 §3.5.4 (the arch vault) |
| `setAttr` on a way (class, width, name) and a bridge's kind; `convert` `downgradeWay`, `upgradeWay`, `repairRaised` | T9 `shape` (its `setAttr`, on a selected way; J-V9.104; the class chip's `path` ↔ its former class; **Repair** on a raised way, **Rebuild the deck** on a bridge or pier) | class chips; a width stepper; a context action with a ghost | the context panel | §7.1's ways row; V06 §4.2 |
| `split` of a way at a point, `merge` of two ways | T9 `shape` (on a selected way: **Split here**, one click on it; with two ways selected: **Join these**; J-V9.104) | a click; a context action | the context panel; the context menu | §7.1; §7.4's MFCG asks ("add vertices") |
| `drawTunnel` (a sewer run, or a gallery with `system`), `addLink` (working layer Below); `moveVertex` on a tunnel's chain | T4 `road` (tunnel, link), the gallery's system from the **system chip** (V09 §4.17.2); on a selected run its chain handles | two points or a line on the underground layer; the run's chain-point drags on Below (V09 §3.5) | the run's handles | V04 §4.1; item 109 (h) |
| `placeSkyAccess` (working layer Sky, or a stroke from the ground to a rim) | T4 `road` (sky access) | a stroke ground → rim | the island's context panel | V05 §4.2 |
| `quarter` (sugar), `drawBoundary` | T5 `quarter` (kind card, then seed / corners / lasso / brush / click-inside) | points forms (§7.1) | boundary handles (a partial ring, V09 §3.5) | §7.1; V05 (`sky`) |
| `setAttr` on a district (kind, identity, `DistrictIntent`, band), `merge` and `split` of districts | T5 `quarter` (on a selected quarter: its kind card, band chip, "Merge with…", "Split along…") | chips; a two-point split line | the context panel | §7.1's districts row; item 72 |
| `declareEnd` (village rungs) | T5 `quarter` (at a village rung the card reads "End") | one point, a building or a pin | — | V07 §4.2 |
| `placeAt`, `assign`, `build`, `drawFootprint` | T6 `place` (a class stamp; a typed locus; draw a footprint; on a deck plot, and at a mole's or a long bridge's landmark slot, V09 §4.20.4) | drop, type, draw | the context panel's "Make this a…" | §7.1; item 110 (d) |
| `setAttr` on a market's `rank`, a use's `concealment` and `front`, an institution's `powers` | T6 `place` (on the selected place: "Main market", "Hidden behind…") | chips | the context panel | §7.1; items 24, 63 |
| `rejectSite` (a dossier element's "delete", and its lift), `placeAt { lift: true }`, `unassign` | T6 `place` (on a dossier-backed thing, **Not here**; on a rejected site, **Allow here again** → `rejectSite { op: 'lift' }`; on a pinned plot, **Free this plot** → `placeAt { lift: true }`; on an assigned thing, **Remove the assignment** → `unassign`) | context actions; Delete on the selection | the Delete key; the refusal card | §7.7; the owner's "it is not permanent" |
| `drawChamber` (into a system, or `{ newKind }` creating a ruin, cavern or catacomb, file f item 361), `placeAccess` (over a sealed void it is the user's excavation), `addUndergroundAccess` | T6 `place` (on Below: chamber, access, with the system chip; on a building: "Add a way down") | one point and a size; a context action | the building's context panel; the access closure of a dwelling declaration (V09 §4.17.4) | V04 §4.1; §7.3 item 9; item 109 (h), (j) |
| `setAttr` on an access point (`kind`, `role`, `state`, `knownTo`, `ground.at`), `moveVertex` on its `access_point` vertex, `delete` | T9 `shape` on the selected access ("Brick it up", "Lock it", "Open it", "Who knows this way down", the opening's drag, the underground end's drag); T6 `place` for a new one | chips; drags; the Delete key | the access's panel (V09 §4.17.3) | §7.1's underground row; V04 §4.2 |
| `setAttr` on a catacomb's `fill`; `delete` of catacomb galleries | T9 `shape` on the catacomb (the fill stepper; Delete on selected galleries) | a stepper; the Delete key | the catacomb panel (V09 §4.17.5) | V04 §4.2, V04 §4.3 (J-V4.56) |
| `instance` on a hood pin — add, move, remove, restyle | T6 `place` (the **Furniture** stamp; on a selected pin) | add: a drop of V01's furniture stamp; move: V09 §4.6's drag; remove: Delete; restyle: its kind chips (`InstanceStyle.pinKind`, §8.10) | the pin's context panel | V01 §4.2; §7.1 (item 349) |
| `convert` `relet` | T6 `place` (the building's "Households") | a number stepper | the plan panel | V03 §4.1 |
| `convert` `openUse`, `closeUse`, `relocateUse`, `mutate`; `swapUse` | T6 `place` ("Open a business here", "Close", "Move it", "Swap with…") | a context action; drag a use's badge onto another building | the context panel | §4.11, §7.1 |
| `roster` (sugar) | T7 `roster`; its one-line form also T6 `place` (a place by a locus: a drop on a quarter, road or gate, or a typed locus; file f item 570) | paste or type a list; cards; for T6, one drop or one typed locus | — | §7.1; file f item 570 |
| `fill`, `setField` (density, greenery, prosperity), `drawGreen`; `setAttrMany` of land use; `instance` on trees and §8.10's other decoration instances — add, move, remove, restyle | T8 `fill` (density, mix, greenery, prosperity brushes; square; park; **Land use** lasso — arable, pasture, orchard, wood → `setAttrMany` of the land-use faces under it; **Trees** brush — plant, thin, restyle → one group of `instance` events on the decoration marks under it, trees and §8.10's other instances (a scatter class's, a run's boats) alike, each added as its mark's own class, a `drawGreen` first where no green hosts new trees) | brushes; drops; a lasso; an instance's move by V09 §4.6's drag | a selected instance's context panel (its restyle chips; Delete) | §7.1; §7.4's MFCG asks ("farms in chosen areas"); FTG's tree brush |
| `setAttr(fabric)` + `regenerate`, `setAttr(fabricParams.*)`, `setAttr(terrace)` + `regenerate` | T8 `fill` (layout card on a district, with its **Terraces** chip — V01's `terrace`: auto · on · off) | a card pick with variations; the chip, one undo group | the close-up panel | V01 §4.1, V01 §4.2 |
| `split`, `join`, `merge`, `moveFootprint`, `setEntrance`, `paint`, `setAttr` (class, heights, roof, basement, tenure, reach, front jitter, surface, a square's type, a block's content, a way's class, width and name, the item-110 `setAttr` paths …) | T9 `shape` | corner and door drags; storey steppers; roof and wall paint; chips | the context panel's Shape tab | §7.1; V01 §4.1 |
| `setMassing`, `setComposition` (`room` among its ops), `reshapeRange`, `moveTower` (with `shape`), `addTower` | T9 `shape` (at the building band: range, tower and room handles, storey and dormer steppers, roof, the porch and the secondary porch, hood, tower-shape and room chips, the family strip; on a `stepped` building the tier controls — `setMassing { op: 'tiers' }` and a tier's `setAttr` of heights, shape, skirt and solid, V09 §4.20.5) | handles, steppers, chips (V09 §3.5) | the building tab | V02 §4.1, V02 §4.4, V02 §4.5, V02 §4.6 |
| plan events (`setRoomRole`, `moveWall`, `splitRoom`, `mergeRooms`, `setOpening`, `setWindow`, `moveStairCore`, `setRoomUnit`), `setHearth`, `instance` on furniture | T9 `shape` (at the building band, the plan) | wall and door drags; role chips | the plan panel (V03 §4.5) | §7.1; V03 §4.1 |
| `drawPassage`, `convert` `sealPassage`, `openPassage`, `densify`, `thin`, `subdivide`, `amalgamate`, `plotToGarden` | T9 `shape` (on a plot or block) | a two-point passage; context actions | the context panel | §7.1, §4.11 |
| `convert` `demolish`, `abandon`, `decay`, `ruin`, `robStone`, `clear`, `rebuild`, `build`, `burn`; `setAttr` on a `MutationPlan` step and on `Use.strain` | T9 `shape` ("Change over time" on a building; the plan's steps; the use's "clear its trouble"); the history panel's hazard tray for a fire, a flood, a collapse or a dry year (V06 §4.2) | context actions with ghosts; the hazard's dry run with three variations | the context panel | §4.11; V06 §4.2 |
| `convert` tunnel kinds (`silt`, `caveIn`, `seal`, `reopen`, `flood`), `raiseGrade`, `clearUndercity`; island kinds (`resizeIsland`, `waneIsland`, `settleIsland`, `fallIsland`, `refloatIsland`, `raiseIsland`); `setAttr` on a ruin's `monument/count` | T9 `shape` (on the tunnel, system, neighbourhood, island or ruin; a ruin's monument stepper) | context actions; the island's rim handles under **Resize** (V09 §3.5); a stepper | the context panel | V04 §4.1, V04 §4.2; V05 §4.2 |
| `startWorks`, `cancelWorks`, `setAttr` on a Works | T9 `shape` ("Build it over time" on any build, convert, join, split or delete) | a toggle on the action with a duration | the Works' context panel | §4.11, item 67 |
| `editTable` on `siting.declared` and `siting.linkEdits` (V09 §2.6) | T9 `shape` (a place's "What it cares about", its per-kind panel "All {kind}s in this town", "Keep together on one plot"); the link view (V09 §4.7) | chips and sliders; link drags; context actions | the context panel; the tables editor | items 104 (a) (1), 105 (h), (j); V11 §4.2 |
| `lock`, `unlock`, `pin`, `unpin`, `revert`, `regenerate` (keep, New random, a rung, a tunnel run or a system, an island's `shade`, a household's people — the scope `people`, §10.3); `rerollLayer('village.track')` | T10 `hold` | the lock and pin icons; **Re-derive people** on the households chosen in V09 §4.18's People panel or on a household's line of the person's card — previewed with its fates, one undo step (§10.3; §7.4's regenerate row); **Try again** (New random) with its scope chips — at a village rung also the roads and the fields (V07 §4.1), a village's woods re-rolling with T12 `dress`'s **New trees** (`rerollLayer('render.instances')`, town-wide, §6.1); the re-roll brush (V09 §3.7); ctrl / cmd+click (revert); "Update shade now" on an island | alt+click (lock), shift+click (New random), R | §7.1, §14; V04 §1b.3; V05 §4.2; V07 §4.1 |
| `setAttr(name)`, `setAttr(displayText)`, `moveLabel`, `hideLabel`, `group`, `rerollLayer(naming)` | T11 `name` | click a label to type; drag it; select quarters and "Name as region"; "New names" with a scope | F2 on the selection | §7.1, §9.1 |
| `setAttr(knownTo)` on a plot, building or institution | T11 `name` ("Who knows this place": everyone, locals, secret) | chips | the context panel | §7.1; item 30 |
| `setAttr` on an island (area, altitude, state, occlusion, underside) and on a sky access; `moveVertex` on an island's key | T9 `shape` (on the island; on Sky, a vertex of the island's own arena — the rim handles under **Reshape the rim**, V09 §3.5) | handles and steppers; a rim vertex's drag | the island's context panel and its rim chip | V05 §4.2 |
| `setStyle`, `setLayer`, `paintGround`, `placeLight`; the leader-line switch (a style row, §9.4); `rerollLayer` of `style.compass`, `naming.emblem`, `render.instances` (**New trees**, V09 §3.7; J-V9.101) and `style.jitter` with `style.crowns` (**New decoration**, one group; J-V9.115) | T12 `dress` | style cards; toggles; **New trees**, **New decoration**, **New emblem** and **New compass** (buttons in the Dress panel, V09 §4.19; each a `rerollLayer` at the concern's current salt + 1 — New decoration two, as one group — V09 §4.5's T12 row); a quarter's **Colour** swatch (a thematic `setStyle` row keyed by that district); the wall layer's **Show the whole circuit** and the underground's view chips (`setLayer`); a ground-texture brush; drop a light; the furniture tray | the view bar (layers, the Below group) | §7.1, §9.4, §9.5; §7.4's MFCG asks ("set district colours"); V01 (pinGate, vignette); V04 (lights below, `underView`) |
| `setAttr` on a light (kind, height, colour, intensity, radius, point), `delete` of a light | T12 `dress` (the selected light) | chips; a drag re-hosts its point | the context panel | §7.1's lights row |
| `closeup` | produced by the first edit inside a close-up (PART II) | — | — | §7.1; V01 |
| `setAttrMany` | the multi-selection's context panel (V09 §4.6) | a field changed with several selected | the gazetteer's people list (bulk) | §7.1 |
| `delete` | T10 `hold` (J-V9.74; file f item 368): the Delete key or **Delete** in the context menu, on any thing but an access point and catacomb galleries (T9 `shape`) and a light (T12 `dress`), as §7.1's binding keys it — a dossier-backed thing takes `rejectSite`, an island V05's `convert removeIsland` (V05 §4.2) | previewed; committed at once only when its dry run lists nothing beyond the thing itself, else Accept (V09 §4.20.3) | every tool's context menu; the clerk (volume 10's `hold` op `remove`) | §7.1; item 110 (b); file f item 260 |
| `editTable`, `editPreset` | the tables editor and the presets dialog (V09 §5.7); the advanced panel's "Raised ways the town builds by itself" (V09 §4.14) | a cell edit; a row insert or delete; a two-way chip | — | §7.6 |
| `epoch` | produced by V06's `advance` (T1 `intend`'s time card, the timeline bar) and the port's cadence | "Advance 10 years" | — | V06 §4.1 |
| `undo`, `redo` | the top bar; ctrl / cmd+Z, shift+Z; "Go back to here" (a group) | — | the history panel | §7.4 |
| `upgrade`, `rebase` | the upgrade offer inside the retention window (§7.5's diff; standalone `info.upgrade.offer`'s **See what changes**, in host mode V08 §4.2's **Update the map engine**; V09 §3.14 (a)); the load-mismatch choice; the frozen view's **Edit it with this version** (`rebase` with reason `frozenImport`; V09 §3.14 (b)); "Rebuild around my drawings" (§7.2) in the file menu, kept in host mode (V09 §2.2's `fileMenu: false`) | — | — | §7.5, §2.9, §7.2 |
| `dossierFacts`, `dossierRecord` | none: host-only (V08 §4.1); refused from any user | — | — | V08 |
| `advance` (V06's trajectory) | V06's time card (T1 `intend`'s sheet) and the timeline bar; on a dossier-bound document refused, the card showing `refuse.dossierClock` (V09 §5.6) | a shape chip and "Advance" | the clerk's proposal | V06 §2.3, V06 §4.1 |

The base's **view keys** with no event — `rotation`, `plotsOnly`, `elaborate`, `handLantern`, `season`, `weather`,
favourites, notes, public notes, view pins, `stylePreset`, the grid, legend and emblem settings, `showUnexcavated` — are
written by `setView` from the controls of V09 §4.2 and V09 §4.19; they are not logged and have no undo beyond the control's
previous value (§2.9).
=== END ===

=== REPLACE ### 4.9 The words — the message catalogue's rows (English, our own) ===
### 4.9 The words — the message catalogue's rows (English, our own)

Every line a user reads for a bend, a refusal, a fate, an error, a share condition or a hint is a row of
`messages/en.json` (V09 §2.9). The rules for writing one: one sentence, at most 25 words; say what happened and what to do;
name the thing by its name, never by an id; never "error", "invalid", "conflict" or a code in the text; offer the action as
a button when there is one; the bend tone is gentle ("follows", "kept"), never apologetic. **Bend before refusing**
(R2; J-V9.44): where the dry run can name the nearest lawful alternative, the engine bends to it and the row is a `bend`
with that alternative pre-selected and the other one click away; the only refusals left are a dossier fact, a lock or an
assignment, a dependent later change, the viewer role, a staged layer and the rung — availability gates, not bends of a
lawful declaration (J-VI.4) —, an input with no lawful form to bend to (a table edit's dangling reference, type error or
required row, V11 §4.1; a host provider's output past §2.9's cap; an edit of a device-only table, V10 §2.10; an `epoch`
past §6.1's epoch cap), and the conflicts and caps §7.1's table names, each offering its one resolution or none (content
an earlier stage made, new water reaching a reservation, a stale base, a household capacity or a Works conflict, a style
or knowledge table the loader would refuse, an upgrade's size cap, a bug abort); every other
cause of a dry run, the island, aqueduct and rim cases and V02's
massing cases among them, is a bend row. **One row per outcome** (E-07): every key §7.1's dry-run outcome table names has
its row here, worded for the cause, detection and outcome of each outcome row that names it (one key may word several
outcome rows); and every `bend.*` and `refuse.*` row here names its producer in its codes column — an outcome row of
§7.1 (a bend a volume's dry run makes under its last row, *every other infeasible declaration*, naming that volume's
section), or, for a gate outside that table, §11.1's export rule (`refuse.exportTier`), §11.2's `advance` on a
dossier-bound document (`refuse.dossierClock`, V06 §2.3), the shell's layer gate (`refuse.layer`, V09 §4.2), V09 §3.9 (`refuse.restore.dossier`) or V10 §3.16 (`refuse.clerk.*`). T-V9-15 checks both
directions. A row's text is the user's words; the design's name for the same concept is the glossary's (`refuse.kept`'s
"Rebuild from {stage}" is §7.1's Re-derive; the re-roll control's "Try again" is New random, and no other control is so
worded — an export's retry is **Retry**, a proposal card's `retry` **Ask again**).
**Every** refusal row carries at least one button, at the least **Show me why** (the why card of the blocking thing, or the help page of the
limit — the target chosen by V10 §3.5 step 3's *The why target*, one rule for this button and the clerk's `why` action,
cited, not restated; J-V9.120) — and the rule is data: every `refuse.*` row's `buttons` end with
`button.showWhy` (T-V9-15). **The button column** is each row's `buttons` list (V09 §2.9's `MsgButton`), in
order and separated by " · ": each button its `button.*` key, then its class and the data the class needs — `commit(…)`
with its source (a `ConflictAction` kind; `alternatives` with its list form `each`; `unplaced`; or `event:<form>`, a row of
*The event forms* below), `why` (with `page` where the row names one), `show(…)` with its `arg`, `tool(<tool>/<mode>)`
with `subject: <argument>` where it acts on the row's thing, `drop`, `app(…)` with its command and argument — and a `when`
in brackets (`[owner]`, `[names]`). A name in backticks after `show`, `subject` or `app` is the `MsgRef` argument it reads
(V09 §2.9's *Arguments a button reads*). The words are *The `button.*` rows* after the table. The shipped rows:

| key | text (placeholders in braces) | buttons — the row's `MsgButton` list (V09 §2.9) | engine codes it renders |
|---|---|---|---|
| `bend.wall.ridge` | "The wall follows the ridge, {m} m off your line." | — | `PreviewResult.bent` (S5a's trace) |
| `bend.wall.reach` | "The wall reaches the {barrier}; the ground between becomes gardens." | — | item 106 (b) |
| `bend.wall.waterfront` | "Kept the harbour open with {n} sea gates." | — | item 106 (d) |
| `bend.wall.open` | "Open ground needs a wall; kept a light wall here." | — | item 106 (c) (V09 §4.7) |
| `bend.road.route` | "The road goes round the {obstacle}; it is {m} m longer than a straight line." | — | S4's router (§4.3) |
| `bend.road.bridge` | "The road crosses the {water} on a new bridge." | — | §7.1's drawn-bridge rule |
| `bend.quarter.snap` | "The quarter's edge follows the streets; it never cuts through a block." | — | §7.1's quarter snap |
| `bend.quarter.size` | "A {kind} quarter here holds at most {n} plots; it stops at {edge}." | — | the kind's size band |
| `bend.place.site` | "{name} fits best {m} m away: {reason}." | `button.putHereAnyway` commit(`event:exactSite`) | S10b's site choice |
| `bend.lake.level` | "The water fills the hollow to {level} m; above that it would spill." | — | S1's basin fill |
| `bend.river.course` | "The river runs downhill, so it reaches {mouth} this way." | — | S1's water operator |
| `bend.harbour.size` | "The shore allows a basin of {size} m² here." | — | §4.8's harbour rules |
| `bend.roster.line` | "{name} went {where} instead: {reason}." | `button.show` show(`name`) | the roster's solve |
| `bend.fill.band` | "This quarter's wealth sets its building sizes; used the nearest mix it allows." | — | the band's rows (§4.7) |
| `refuse.dossierOwned` | "SettlementForge sets this. Change it there, or show a different name on this map." | `button.otherName` tool(`name`/`rename`, subject: `thing`) [names] · `button.showWhy` why | F-EDIT `dossier-owned` |
| `refuse.dossierRemove` | "SettlementForge keeps {thing} in this town. You can move it, or mark this spot as not for it." | `button.moveIt` show(`thing`) — selected with its handles; dragging moves it (V09 §4.6) · `button.notHere` commit(`event:notHere`) · `button.showWhy` why | F-EDIT (§7.7 item 2's list); `rejectSite`, `placeAt` offered |
| `refuse.roster.dossier` | "SettlementForge's record decides this town's places. Place one of them here, or put {thing} on a plot {locus}." — slots: `{thing}` the line's name, or the class's display label when the name is `''`; `{locus}` the line's locus worded by V09 §4.16 (6) ("near the North Gate"), or for a line with none the settlement's name after `in`'s connective ("in Oakford") (J-V9.100) | `button.placeElement` commit(`unplaced`) — V09 §4.16 (5)'s picker · `button.putAt` commit(`event:firstFreeSite`) (not drawn when no `sites` candidate is free of hard fails) · `button.showWhy` why | F-EDIT `dossier-owned` on a `roster` line naming no element — T6 `place`'s one line, any line of T7 `roster`'s list, or the clerk's (§7.1's roster rule; V09 §4.5's T6 and T7) |
| `refuse.locked` | "{thing} is locked. Unlock it to change it, or choose one of the marked places." | `button.unlock` commit(`unlock`) · `button.chooseMarked` commit(`alternatives`, each `button.putAt`) — the closest acceptable declarations that leave the locked thing untouched (item 101 R2; item 20 (g)) · `button.showWhy` why | `E_LOCKED`; `ConflictAction` `unlock`; `PreviewResult.alternatives` |
| `refuse.assigned` | "{thing} is assigned. Remove the assignment to change it." | `button.unassign` commit(`unassign`) · `button.showWhy` why | `ConflictAction` `unassign` |
| `refuse.assignment.noSite` | "No plot here suits {thing} as it is assigned. The closest places are marked." — the marked places are the refusal's `moveTo` actions | `button.putAt` commit(`moveTo`) — the same declaration at the first `moveTo` target, previewed: an `assign` with its assignment's `target` that plot, a `rejectSite` grouped with `placeAt { plot, element }` (J-V9.111) · `button.showWhy` why | F-EDIT (§5.2 as file f item 582 amends it): an assignment, or the re-placement a `rejectSite` causes (§7.7), that no plot satisfies inside the hard rows |
| `bend.place.noSite` | "{thing} needs {reason}; it went to {site}, the closest place that has it." | `button.chooseMarked` commit(`alternatives`, each `button.putAt`) | the dry run's bend (file f item 582; no plot here in the hard rows); `PreviewResult.alternatives` for the other acceptable sites (file f item 463; file f item 582's alternatives) |
| `bend.place.overBudget` | "Putting {thing} there would move {n} other places; it went to {site}, which moves {k}." | `button.overBudget` commit(`event:exactSite`) · `button.chooseMarked` commit(`alternatives`, each `button.putAt`) | the dry run's bend (file f item 582; the disruption budget) |
| `bend.vacate` | "This pulls down {building}; its {n} households move to {where}." | `button.keepBuilding` drop (withdraws the edit) | the dry run's bend (file f item 582; item 31's demolition as a fate, item 17's relocation) |
| `bend.room.minArea` | "The {room} stays at {m2} m², the smallest a {role} can be." | `button.roleInstead` commit(`event:roomRole`) · `button.showWhy` why | F-EDIT (plan minimum), bent to the smallest lawful split (V03 §4) |
| `bend.room.noDoor` | "Moved the wall so every household keeps its own door." | `button.showWhy` why | F-EDIT (item 28 (f)), bent to the nearest wall position that keeps each unit's door |
| `bend.room.unreachable` | "Kept a door so every room can still be reached from the entrance." | `button.showWhy` why | F-EDIT (item 28 (f); V03 §3.2 A6), bent to the nearest lawful form that keeps every room reached — the door kept, or moved to the nearest wall whose other side reaches circulation (V03 §4.2) |
| `bend.capacity` | "This building holds at most {max} households; set to {max}." | `button.showWhy` why (J-V9.123) | F-EDIT (`relet` above capacity), clamped |
| `bend.passage` | "A passage needs two storeys above it; it goes under the two-storey part of {building}." | `button.showWhy` why | F-EDIT (`Passage.headroomCm`), moved to the nearest lawful run |
| `refuse.capacity.household` | "{n} households in {district} have nowhere left to live there; move them first." | `button.show` show(`district`) · `button.showWhy` why | §7.1's capacity row: a capacity re-homing that cannot place a household filling no dossier's population (§2.6's capacity rule), the capacities that refuse it named; item 17's relocation first |
| `refuse.works.access` | "These works would cut off {plot} or leave its people without a home; move them first." | `button.show` show(`plot`) · `button.showWhy` why | §7.1's Works row (§5.3; item 67): a plot left without access or a building's occupants unhoused, the plots and households named; item 17's relocation first |
| `refuse.warp` | "That push would move {thing} off its ground. Unlock it, push more gently, or choose one of the marked places." | `button.unlock` commit(`unlock`) · `button.chooseMarked` commit(`alternatives`, each `button.putAt`) · `button.showWhy` why | F-EDIT (warp carrying a held record); `PreviewResult.alternatives` |
| `refuse.water` | "The new water would reach {thing}, which is kept. Unlock it, move the water, or choose one of the marked places." | `button.unlock` commit(`unlock`) · `button.chooseMarked` commit(`alternatives`, each `button.putAt`) · `button.showWhy` why | §7.1's lock row: new water with its bank setback meeting a locked or pinned way, wall or finer entity (§7.3 (b) 3); `ConflictAction` `unlock`; `PreviewResult.alternatives` |
| `refuse.water.reservation` | "The new water would reach ground kept for {thing}. Rebuild from {stage} to make room?" — `{stage}` S3's word | `button.rebuildFrom` commit(`event:rederive`) · `button.showWhy` why | §7.1's reservation row: new water reaching a reservation (§7.3 (b) 3), its one resolution the Re-derive from S3 |
| `bend.warp.halved` | "The push went half as far here, so nothing it moves breaks." | — | §7.1's warp-step row: a step that would break an invariant, halved (§3.6) |
| `bend.carve` | "The river takes the deepest course the ground allows, {m} m at most." | `button.showWhy` why | F-EDIT (`carveMaxCm`), bent to the deepest lawful course |
| `refuse.kept` | "That would cut through {thing} made earlier. Rebuild from {stage} instead?" | `button.rebuildFrom` commit(`event:rederive`) · `button.showWhy` why | `E_KEPT`, `E_LEVEL` (§7.1's one resolution) |
| `bend.invalid` | "{field} can't be {value}; set to {nearest}, the nearest it allows." | `button.showWhy` why | §7.1's value-range row: a table cell or an edited path outside its declared range, clamped to the nearest lawful value (`PreviewResult.bent`) |
| `bend.frame.held` | "The town's edge stays out far enough to keep the {n} things you made, locked or pinned." | `button.showWhy` why | §7.1's frame row: a Re-derive whose frame law would leave locked, pinned or declared things or drawn constraints outside, given the smallest frame that encloses them (§3.2 (9); §7.4's frame row) |
| `refuse.stale` | "The town changed while you were working. Here is the new preview." | `button.newPreview` show(`preview`) · `button.showWhy` why | `ConflictAction` `stale`; `doc.rejected { stale }` |
| `refuse.staged` | "{layer} isn't part of this version yet." | `button.showWhy` why(page `staged/{layerId}`, the staged layer's guide page) | F-EDIT naming a staged layer (§7.3 item 9 (d)) |
| `refuse.islandsRung` | "Floating islands exist only in cities and metropolises." | `button.cityUp` commit(`event:cityUp`) · `button.showWhy` why | §7.8's disabled control |
| `refuse.undo.creation` | "This is where the town began, so it stays{; instead}." — `{; instead}` "; remove the assignment instead" for a blueprint assignment, "; you can move {thing} or mark this spot as not for it" for a dossier element the creation placed | `button.unassign` commit(`event:unassignCreation`) · `button.moveIt` show(`thing`) [dossier] · `button.notHere` commit(`event:notHere`) · `button.showWhy` why | §7.1's creation-undo row (E-07: `unassign` for a blueprint assignment; `rejectSite` and `placeAt` for a dossier element) |
| `refuse.undo.dossier` | "Changes from SettlementForge can't be undone here{; move}." — `{; move}` "; you can move {thing} or mark this spot as not for it", `{thing}` the first dossier element the event placed or re-designated; `{name}` the thing a dossier rename renamed | `button.moveIt` show(`thing`) · `button.notHere` commit(`event:notHere`) · `button.otherNameHere` tool(`name`/`rename`, subject: `name`) [names] · `button.showWhy` why | §7.1's port-session row (E-07: `rejectSite` and `placeAt` for each dossier element the event placed or re-designated, as `refuse.dossierRemove` offers them; a dossier `unassign` leaves none) |
| `refuse.undo.dependent` | "Later changes by {authors} depend on this. Undo those first." | `button.showThem` show(`dependents`) · `button.showWhy` why | F-EDIT (independence, §7.4) |
| `refuse.restore.dossier` | "The town can go back only to {time}; SettlementForge changed it after that." | `button.goBackTo` app(`goBack`) · `button.openCopy` app(`openCopy`) · `button.showWhy` why | V09 §3.9 |
| `refuse.viewer` | "You're viewing this town. Ask its owner to make changes." | `button.showWhy` why | `preview` refused `role`; `doc.rejected { role }` |
| `refuse.exportTier` | "This file holds every secret of the town; only its owner can make it." | `button.pictureInstead` app(`exportPicture`) · `button.showWhy` why | `E_KNOWLEDGE_TIER` |
| `refuse.layer` | "{tool} works on the {layer}. Switch to it first." | `button.switch` app(`switchLayer`, `layer`) · `button.showWhy` why | V09 §4.2 |
| `refuse.dossierClock` | "SettlementForge keeps this town's time; make a what-if copy to run it ahead." | `button.whatIf` app(`openCopy`, `seq` — the head: a detached `forkAt`, V06 §4.4; in host mode by `HostSlots.newDocuments`) · `button.showWhy` why | §11.2's `advance` refused on a dossier-bound document (V06 §2.3; J-V6.2); the time card's **Advance** there (V09 §5.6) |
| `refuse.table.rung` | "Below a city the town raises no ways by itself; draw this one yourself with Raised on." | `button.drawRaised` tool(`road`/`way`) — T4 `road`'s options strip with its **Raised** toggle on (V09 §4.20.2) · `button.showWhy` why | §7.1's table-edit row: an `editTable` setting a `raisedWays` row below CITY, item 110 (b)'s rung gate (V11 §4.1, V11 §4.4) |
| `refuse.table.invalid` | "{cell} can't be {value}; it takes {expected}." — `{expected}` the cell's schema as the tables editor words it: a unit and range, an enumeration's values, or a row of the table its `ref` names (V09 §4.14) | `button.showWhy` why | §7.1's table-edit row: a dangling `ref` or a type error in an `editTable` (V11 §4.1) |
| `refuse.table.required` | "{row} is what {readers} fall back to, so it stays; edit its cells instead." — `{readers}` the reading stages or tables V11 §4.1 names | `button.showWhy` why | §7.1's table-edit row for a row readers fall back to (V11 §4.1: a `defaultRow`, an `allowFallback` target, a totality rule's only cover, the last row of a table not `mayEmpty`), the row marked in the tables editor (V09 §4.14) |
| `refuse.table.knowledge` | "With these rows someone who knows more would see less; a place everyone knows shows at every scale." | `button.showWhy` why | §7.1's knowledge-admission row: `ConflictAction` `invalid` on an `editTable` of `knowledge.admit` (§9.2), the offending rows marked in the tables editor |
| `refuse.style.order` | "This style leaves {n} pairs of layers without an order; set them in the style dialog." | `button.showWhy` why | §7.1's style row: `ConflictAction` `invalid` on a `setStyle` leaving an unresolved or ambiguous layer-order pair (§8.2; J-R39), the pairs listed in the style dialog; nothing applied |
| `refuse.host.cap` | "{host}'s content would make this town {size}, more than a town can hold; it was not added." | `button.showWhy` why | §7.1's host-cap row: a host provider's output past §2.9's cap on pack data and host content |
| `refuse.upgrade.packCap` | "Updating would make this town's copy of {pack} too large to keep, so the town stays as it was made." | `button.notNow` drop — keeps the old model (§7.5) · `button.showWhy` why | §7.1's upgrade row: an upgrade's copy of a pack that stops shipping would pass §2.9's cap (§7.5), "keep the old model" its one resolution |
| `refuse.bug` | "That change hit a fault in the map engine, so nothing changed; the report keeps the details." | `button.showWhy` why | §7.1's bug-abort row: nothing commits; the cause `bug` with its stream key in the report (§5.1 (8), §5.4) |
| `refuse.epoch.cap` | "This town's history has reached the most steps a town can hold, so it runs no further." | `button.showWhy` why | §7.1's epoch-cap row: an `epoch` past §6.1's epoch component (2³¹ − 1); nothing commits |
| `share.pack` | "This town uses the setting pack {pack}, which isn't built in. Share the file instead." | `button.downloadFile` app(`download`) | §6.4 condition (pack) |
| `share.corpus` | "This town uses your own name list {list}. Share the file instead." | `button.downloadFile` app(`download`) | §6.4 condition (user corpus) |
| `share.host` | "This town uses content from {host}. Share the file instead." | `button.downloadFile` app(`download`) | §6.4 condition (host content) |
| `share.kept` | "This town was kept from a saved copy, so a link can't rebuild it. Share the file instead." | `button.downloadFile` app(`download`) | §6.4 condition (rebased base) |
| `share.long` | "Too many changes for a link. Share the file instead." | `button.downloadFile` app(`download`) | §6.4 condition (2 000 characters) |
| `fate.kept` | "stays as you made it" | — | `EditFate` `kept` |
| `fate.carried` | "moves with its new surroundings" | — | `carried` |
| `fate.orphaned` | "loses what it was attached to; it stays in the history and can be re-attached" | `button.reattach` app(`reattach`) | `orphaned` |
| `fate.discarded` | "your change is removed" | — | `discarded` |
| `error.workerRestarted` | "The map engine restarted. Nothing was lost." | — | V09 §3.14 |
| `error.workerDead` | "The map engine could not restart. Your town is saved; download it or reload the page." | `button.download` app(`download`) · `button.reload` app(`reload`) | V09 §3.14 |
| `error.engine` | "This browser can't run the map engine: {reason}." | — | `E_ENGINE_UNAVAILABLE` |
| `error.previewSlow` | "Big change: the preview will show when you let go." | — | V09 §3.14 |
| `error.storageFull` | "Your computer is out of space for saved towns. Download this town to keep it." | `button.download` app(`download`) | quota |
| `error.storageNone` | "This browser won't let the editor keep your town. Download it to keep your work." | `button.download` app(`download`) | IndexedDB refused |
| `error.exportFailed` | "The export stopped: {reason}. Nothing was saved. Retry?" | `button.retry` app(`retry`) | an exporter's error |
| `error.openRefused` | "This file can't be opened: {reason}." | — | `open` / `generate` errors |
| `info.upgrade.offer` | "Made with {version}; it opens as it was made, and updating it to {current} adds what's new." | `button.seeChanges` app(`seeUpgrade`) · `button.notNow` drop | §2.9 step 3, §7.5 (V09 §3.14 (a); standalone only) |
| `error.frozen` | "Made with {version}, shown read-only and not checked by this version; edit it with this version, or replay it exactly with the command below." | `button.editWithVersion` app(`editWithVersion`) [owner] · `button.copyCommand` app(`copyCommand`) | §2.9 step 2 (V09 §3.14 (b)) |
| `error.frozen.damaged` | "Part of this saved copy is damaged, so it can't be edited here; replay it exactly with the command below." | `button.copyCommand` app(`copyCommand`) · `button.showWhy` why | §2.9 step 2's damage: a chunk missing its content hash, or the records root differing at the rebase |
| `error.frozen.pack` | "This town needs the setting pack {pack}, which can't be added here; replay it exactly with the command below." | `button.copyCommand` app(`copyCommand`) · `button.showWhy` why | §2.9 step 2's missing pack; §7.5's 2 MB cap at the `frozenImport` rebase |
| `error.frozen.noModel` | "Made with {version}, and this file keeps only its recipe and changes; open them with this version, or replay it exactly with the command below." | `button.openRecipe` app(`openRecipe`) · `button.copyCommand` app(`copyCommand`) | §2.9 step 2's document without `model` (V09 §3.14 (c)) |
| `error.mismatch` | "This saved town differs from what its recipe rebuilds ({n} differences). Keep the saved town, or use the rebuilt one?" | `button.keepSaved` app(`keepSaved`) · `button.useRebuilt` app(`useRebuilt`) | §2.9 step 4 |
| `error.recoveryPartial` | "Recovered your town up to {time}. {n} later changes could not be replayed." | `button.downloadThem` app(`downloadUnreplayed`) | V09 §3.8 |
| `error.newerApp` | "This town was saved by a newer version of the editor; it opens read-only here." | `button.reload` app(`reload`) · `button.download` app(`download`) | a `LocalDocRecord.appVersion` above the running one (V09 §2.11, V09 §3.14) |
| `error.linkVersion` | "Made with {old}, shown with {new}; small differences are expected." | — | §6.4 |
| `success.applied` | "{change}." | `button.undo` app(`undo`) | every commit |
| `success.saved` | "Saved {file} ({size})." | — (J-V9.123) | V09 §3.10 |
| `success.restored` | "Went back to {name}." | `button.undoGoingBack` app(`undoGoingBack`) | V09 §3.9 |
| `bend.under.accessDug` | "Dug a way down from {building} so people can live there." | `button.useAnotherBuilding` commit(`alternatives`, each `button.digDownFrom`) — on the canvas the stepping button, while the dry run's `alternatives` holds a building not yet tried (V09 §4.17.4); the list form, one per building where a card shows every alternative at once (V10 §3.16), `{building}` read at the card's reader's key — the canvas at the role's key, J-V9.86; the clerk at its session key (J-V9.118) · `button.showWayIn` show(`created:access`) | V09 §4.17.4 (file f item 372) |
| `bend.under.accessOpening` | "Opened a way down at {place} so people can live there." | `button.showWayIn` show(`created:access`) · `button.showWhy` why (steps 2 and 3 run only when no building qualifies, so no building is offered) | V09 §4.17.4 |
| `bend.under.noAccess` | "Nobody can reach this cave yet, so the homes stand above it." | `button.addWayDown` tool(`place`/`access`) — T6 `place`'s Below access mode on a chosen spot · `button.showWhy` why | V09 §4.17.4 (4): the dry run's bend onto ground part 0 (item 101 R2) |
| `bend.under.basement` | "No full cellar fits under {building}, so it gets {form}." — `{form}` the basement form laid: "a half cellar" · "a walk-out cellar" · "a hatch to a crawl space" | `button.showWhy` why | §7.1's `addUndergroundAccess` outcome row: the nearest lawful basement form by §2.6's requested-mode ladder (II.7.6 step 1; V09 §4.17.4) |
| `refuse.under.basement` | "No way down fits under {building}: {gate}." — `{gate}` the terrain gate that ruled out the last form (§2.6), in words: "it stands over water" · "the ground is damp" · "the ground floods" · "the water lies too high" | `button.showWhy` why | §7.1's `addUndergroundAccess` outcome row: no basement form the terrain admits (§2.6's requested-mode ladder; II.7.6 step 1; V09 §4.17.4) |
| `refuse.under.route` | "No passage can be dug down from {building}: {reason}." — `{reason}` "it would run longer than {m} m" (the route's bound) · "{blocker} is in the way" (the building, cellar or dug passage that encloses it) · "the water lies too high on the way" (the water table) | `button.showWhy` why | §7.1's `addUndergroundAccess` outcome row: the connector past its route's bound or with no route (`E_NO_PATH`; II.7.6 step 3; V09 §4.17.4) |
| `bend.catacomb.church` | "Churches keep crypts; catacombs lie under cemeteries. This is {church}'s crypt." | `button.startCatacomb` commit(`event:catacombUnder`) · `button.showCrypt` show(`crypt`) | V09 §4.17.5 (a) |
| `bend.catacomb.join` | "{town} may have {count} catacombs; this joins the Catacombs of {name}." | `button.showWhy` why | V09 §4.17.5 (b) |
| `bend.catacomb.charnel` | "{town} may have {count} catacombs; {ground} keeps a charnel vault instead." | `button.joinCatacombs` commit(`event:joinCatacomb`) | V09 §4.17.5 (b) |
| `bend.catacomb.belowTown` | "Catacombs come with towns; {ground} keeps a charnel vault." | `button.showWhy` why | V09 §4.17.5 (c) |
| `bend.catacomb.noGround` | "Catacombs lie under cemeteries; this is a vault." | `button.startItUnder` commit(`event:catacombUnder`) | V09 §4.17.5 (d) |
| `bend.crypt.cathedral` | "A cathedral always keeps its crypt, the largest in {town}; kept at its smallest, {m2} m²." — `{m2}` from the bend's kept ring (V03 §3.7.4 (1)) | `button.cryptSmallest` commit(`event:cryptSmallest`) | V03 §3.7.4's crypt-edit dry run (V09 §4.17.5 (e)) |
| `bend.crypt.largest` | "The cathedral keeps the largest crypt; this one stops at {share} of the cathedral's." | `button.cryptEnlarge` commit(`event:cryptEnlarge`) | V03 §3.7.4's crypt-edit dry run: the rank cap `crypt.rankShare` × the principal's area (V09 §4.17.5 (e)) |
| `bend.ruin.axis` | "The old walls run on the ruin's own lines; your room turned {deg}° to follow them." | — | V04 §4.1's ruin chamber |
| `info.catacomb.stagnant` | V10 §3.9a's stagnation line (its text, single source) | `button.showWhy` why | `CatacombComplex.blockedBy` non-empty |
| `info.catacomb.stopped` | V10 §3.9a's `stopped` state line | `button.showCemetery` show(`source`) | `blockedBy` holds `sourceClosed` |
| `info.catacomb.overCount` | V10 §3.9a's `overCount` count line | `button.showWhy` why | `CatacombComplex.overCount` |
| `info.catacomb.blocked.<cause>` | this volume's words, one per `blockedBy` value — V09 §4.17.5's "Over time" lines (`reach`, `wet`, `system`, `foundation`, `wallStrip`, `depth`; `rank` is V10 §3.9a's rank line) | — | `CatacombComplex.blockedBy` |
| `fate.catacomb.removed` | "The catacomb gives up {m2} m²; it will not dig here again." | `button.undo` app(`undo`) | a `delete` of catacomb galleries (J-V4.56) |
| `fate.access.lastWay` | "This was the last way into {place}; {n} households there leave." | `button.keepWayOpen` drop (withdraws the edit) | a `bricked`, `delete` or `seal` of a cluster's last access (V04 §4.3) |
| `info.under.deep` | V10 §3.9a's sealed-deep-void line | — | a sealed void's `underground` section (item 109 (j) (5)) |
| `info.under.sealed` | V10 §3.9a's unexcavated line | `button.addWayDown` tool(`place`/`access`) | an `unexcavated` cluster (V04 §3.5.7 (g)) |
| `info.under.cause.<rule>` | this volume's words, one per `AccessCause.rule` — V09 §4.17.3's table | — | an access point's `underground` row |
| `why.section.<kind>` | a why section's title, one per section V10 §3.9 registers: `underground` "Below ground" · `crypt` "The crypt" · `raised` "Raised ways" · `massing` "Its shape" · `plan` "Inside" · `fabric` "The streets around it" · `island` "Shade from above" · `move` "Over time" | — | `WhyCardModel.sections[].title` (V09 §2.7) |
| `clerk.key.unchecked` | "Saved. The key will be checked when you are back online." | — | `setKey` returning `unchecked` (V09 §4.11) |
| `clerk.host.mark` | "{host}'s assistant (AI)" | — | a host proposal's card (V09 §4.11) |
| `clerk.defect.<kind>` | `previewMismatch` "The assistant's preview and the map's differed." · `badRequest` "The AI service turned down a request." · `placeholder` "A step of a proposal no longer matched the map." · `creationDigest` "A new town came out differently from its preview." | — | V10 §2.8's `DefectRecord.kind` (V09 §5.12) |
| `clerk.defects.none` | "No problems recorded." | — | an empty defect store (V09 §5.12) |
| `clerk.key.missing` | "The assistant needs your own key for the AI service." | `button.enterKey` app(`enterKey`) · `button.notNow` drop | the drawer's first opening, only where the deployment's configuration enables the built-in clerk with a user's key — standalone, or a host that asks for one (V09 §4.11; J121) |
| `clerk.cap.warn` | "The assistant has used {share} of this month's limit of {usd}." | `button.changeLimit` app(`openSettings`) | V10 §3.18 |
| `clerk.cap.reached` | "The assistant has reached this month's limit of {usd}." | `button.changeLimit` app(`openSettings`) | the meter's foot line only (V09 §4.11; V10 §3.18); the drawer's refusal card at the cap is `refuse.clerk.budget` (V10 §3.16) |
| `info.viewAs` | "Viewing as: {tier}." | `button.showEverything` app(`viewAsOff`) | V09 §4.8 |
| `info.viewAs.host` | "Turn off “See what the players see” to choose another view." | — | V09 §4.8 (the View as menu while a host's players' view is set) |
| `info.copy.saved` | "Saved a copy to your computer as {file}; it does not follow {host}." | — | V09 §3.9's host-mode rule under `newDocuments: 'download'` |
| `info.copy.rerunEdits` | "{n} later hand edits were not carried; they stay in this map." | — | the same, after a re-run (V09 §3.9) |
| `info.copy.condensed` | V06 §3.15.5's line, "history before year N was condensed; the copy starts at year N" (its text, single source, loaded from volume 6 as V09 §4.9's explanation paragraph loads volume 10's families; `{year}` for N) | — | `forkAt` or `rerunFrom` bent to the earliest seq before a rebase point (V06 §3.15.5, V06 §4.4; J-V6.98): the copy's `forkedFrom.seq` above the seq asked (V09 §3.9's *Before a rebase point*) |
| `clerk.newMap.line` | "Describe the new town — this one stays as it is" | — | the drawer's Start a new map from this (V09 §4.11) |
| `history.group.party` | "The party" | — | the history panel's host group (V09 §4.10) |
| `history.dossierFacts.creation` | "Made from SettlementForge's record" | — | the history panel's creation head (V09 §4.10) |
| `report.moved.<kind>` | one per `ReportEntry.kind` (§5.4): `place` "{element} now stands on {site}." · `reject` "{site} is marked as not for {element}; it stands elsewhere." · `lapse` "The mark keeping {element} off {site} has lapsed." · `open` "{use} opened on {to}." · `close` "{use} closed on {from}." · `relocate` "{use} moved from {from} to {to}." · `mutate` "{plot} was rebuilt for this change." · `disruption` "This change moved a few places nearby." · `disruption.over` "This change moved more places than its limit." · `rename` "{from} is now called {to}." · `works.start` "Work began on {works}." · `works.cancel` "Work on {works} stopped." · `works.finish` "Work on {works} is finished." | `button.show` show(`entry`) — the entry's element, use, plot or works | `ReportEntry.kind`, `disruption.overBudget`, `works.op` — the report panel's "What moved" and the history's report-entry lines (V09 §5.7, V09 §4.10; J-V9.109) |
| `report.dossier.<state>` | one per `GenerationReport.dossier` state (§5.4): `placed` "{element} stands on {site}." · `rejectedSite` "{site} is marked as not for {element}." · `blocked` "{element} can't stand on {site}; the closest places that suit it are marked." | `button.show` show(`entry`) — the element; for `blocked`, its `closest` sites marked | `GenerationReport.dossier[].state` — the report panel's placement state (V09 §5.7; J-V9.109) |
| `success.deleted` | "Moved {town} to Recently deleted. It stays there for 30 days." | `button.undo` app(`restoreTown`) · `button.show` app(`showDeleted`) | V09 §5.12 |
| `bend.retaining.moved` | "The wall follows the step in the ground, {m} m off your line." | `button.keepMyLine` commit(`event:retainingFlat`) | V09 §4.20.1 (3) (a) |
| `bend.retaining.flat` | "The ground is flat here, so a terrace {h} m high goes on the {side}, with this wall on its edge." | `button.otherSide` commit(`event:retainingOtherSide`) | V09 §4.20.1 (3) (b) |
| `info.crossing.stair` · `info.crossing.ramp` | "{way} climbs the terrace by a stair." · "{way} climbs the terrace by a ramp." | `button.showWhy` why | the dry run's crossing form (item 110 (a)) |
| `bend.crossing.steep` | "Too steep for a ramp on a {class}; the stair stays." | `button.longerRamp` commit(`event:rampLonger`) | file f item 364 |
| `bend.raised.clearance` | "The deck stays {m} m above {way} so carts can pass under." | — | file f item 364 (the clearance bent up) |
| `bend.raised.end` | "A raised way comes down to the ground; its end moved {m} m to {place}." | — | V09 §4.20.2 (2) |
| `bend.raised.wall` | "The raised road comes down before the {wall} and passes through its gate." | `button.showWhy` why | file f item 363 |
| `bend.wall.aqueductArch` | "The wall lets the aqueduct through by an arch." | — | file f item 363 |
| `bend.aqueduct.source` | "Water runs downhill, so the aqueduct starts at {source}, {m} m higher." | `button.showWhy` why | V09 §4.20.2 (5) |
| `bend.aqueduct.terminal` | "Added a fountain where the aqueduct ends, on {place}." | — | V09 §4.20.2 (5) |
| `bend.aqueduct.uphill` | "No spring or river lies high enough within {km} km to feed {terminal}, so it has a well instead." | `button.showWhy` why | the dry run's bend to a well pin at the terminal (J-VI.4 (h); V09 §4.20.2 (5)) |
| `bend.raised.island` | "A road cannot reach a floating island; a hoist, rope line, stair or bridge of light can." | `button.roadToFoot` commit(`event:roadToFoot`) · `button.showWhy` why | the dry run's bend to `placeSkyAccess` (J-VI.4 (d); V05 §4.2; V09 §4.20.2 (6)) |
| `bend.aqueduct.island` | "An island's water is its own; the aqueduct ends here." | `button.showWhy` why | the dry run's bend to the last ground vertex outside the island (J-VI.4 (d); V05 §4.2) |
| `bend.raised.onIsland` | "An island carries no raised way; its bridges cross its river on their own decks." | `button.showWhy` why | the dry run's bend: `raised` dropped, the way on the island's ground (J-VI.4 (e); V05 §3.22 (3)) |
| `bend.aqueduct.onIsland` | "An island's water is its own; a fountain stands where the aqueduct would end." | `button.showWhy` why | the dry run's bend to a fountain pin at the stroke's end (J-VI.4 (e); V05 §4.2) |
| `bend.retaining.rim` | "The rim walk stays level; the wall stands inside it." | `button.showWhy` why | the dry run's bend inward past the rim walk (J-VI.4 (g); V05 §3.22 (4); V09 §4.20.9) |
| `bend.deck.full` | "The {deck} has no free plot there; placed it on {plot}." | `button.showWhy` why | V09 §4.20.4 (1) |
| `bend.deck.class` | "A {class} can't stand on a {deck}; placed it at the {deck}'s landward end." | `button.showWhy` why | volume 11's `deckOk` (V09 §4.20.4 (2)) |
| `bend.deck.floors` | "A {deck} carries at most {n} storeys." | — | V02 §4.6 (5) |
| `bend.deck.single` | "A {deck} carries small, light buildings; this one stays a single range." | `button.showWhy` why | V02 §4.6 (5): a `family: 'stepped'` op on a deck building |
| `bend.deck.basement` | "No cellar can go over the water; it went to {building}, the nearest on the ground." | `button.show` show(`building`) | V03 §4.2 |
| `bend.tiers.stepped` | "Made {building} a stepped building first." | — | V02 §4.6 (1): a `tiers` op on a building not stepped |
| `bend.tiers.count` | "Only {n} tiers fit on this base; made {n}." | — | V02 §4.6 (1) |
| `bend.tiers.step` | "A step that wide leaves no second tier; used {m} m, the widest that fits." | — | V02 §4.6 (1) |
| `bend.tiers.axial` | "This stack takes its stairs straight up the front." | `button.stairsInside` commit(`event:stairsInternal`) · `button.showWhy` why | V02 §4.6 (1): `flights` on a round or octagonal stack; `internal` over a solid tier 0 with a storeyed tier above |
| `bend.tiers.none` | "No stairs reach these tiers: the stack is sealed." | `button.stairsFront` commit(`event:stairsAxial`) · `button.stairsFaces` commit(`event:stairsFlights`) | V02 §4.6 (1), (4): `internal` where every tier is solid; a stair removed over a solid tier 0 |
| `bend.tiers.internal` | "The tiers are reached by stairs inside." | `button.stairsFront` commit(`event:stairsAxial`) | V02 §4.6 (1), (4): `none` over a storeyed tier 0; a stair removed over a storeyed tier 0 |
| `bend.tiers.form` | "Those stairs need {m} m in front of the building; kept the {form}." | `button.showWhy` why | V02 §4.6 (1) |
| `bend.tiers.top` | "The shrine no longer fits; the top is flat." | — | V02 §4.6 (1) |
| `bend.tier.height` | "The stair up this tier needs room on the terrace below." | — | V02 §4.6 (2) |
| `bend.stack.base` | "Raised the tier below instead, by {m} m." | — | V02 §4.6 (2): a `baseCm` on a wing standing on a tier |
| `bend.stack.roof` | "A {tier} here takes a {roof} roof." | — | V02 §4.6 (1), (3) |
| `bend.stack.groundWing` | "The new {wing} stands on the ground beside the lowest tier." | `button.changeShape` tool(`shape`/`massing`, subject: `building`) | V02 §4.6 (4) |
| `bend.building.remove` | "Removed the building with its last wing." | — | V02 §4.2, V02 §4.6 (4) |
| `bend.row.plotLine` | "Moved the plot line with the wall; {neighbour}'s plot changes too." | `button.show` show(`neighbour`) | V02 §4.2 |
| `bend.wing.grow` | "Grew the wing to the smallest it can be, {m} m wide." | — | V02 §4.2 step 2 |
| `bend.family.nearest` | "{building} can't take that shape here; made it the nearest that fits." | `button.showWhy` why | V02 §4.2 |
| `bend.room.passage` | "With no gate range here, the gate hall is a passage through {wing}." | — | V02 §4.3 |
| `bend.room.host` | "A {room} needs a larger wing; it went to {wing}." | — | V02 §4.3 |
| `info.remove.holds` | "The town won't {rebuild \| raise} this {kind}; undo brings it back." | `button.undo` app(`undo`) | V06 §2.13's suppression; V05's removed slots (V09 §4.20.3); every delete dry-run line of V06 §3.19.3 (6) and V06 §4.2 (V06-AGREE-1) |
| `info.remove.holds.deck` | "No house will be built on this spot of the {deck}; undo brings it back." | `button.undo` app(`undo`) | the same, for a deck plot (V06 §3.19.3 (6)) |
| `info.raised.count` | "{n} raised ways in {town}; the rules build up to {cap} by themselves." | — | V06's ledger (V09 §4.20.2 (8)) |
| `info.raised.walk` | "A walked way follows the ground." | — | V07's walk mode (V09 §4.20.2 (10)) |
| `disabled.onlyBelow` | "Tunnels are dug below the ground." | `button.switch` app(`switchLayer`, `layer` — the Below layer) | V09 §4.2 |
| `effect.added` | "The city raises a {kind}: {reason}." (and "{thing} is added" for other kinds) | `button.show` show(`targets`) | file f item 465 `added` |
| `effect.route.detour` | "{route} now goes round by {way}, {m} m longer." | `button.show` show(`targets`) | `rerouted` |
| `effect.way.joined` | "{way} now meets {way2} at a crossing." | `button.show` show(`targets`) | `joined` |
| `effect.water.lost` | "{terminal} loses its water." | `button.show` show(`targets`) | `lost` |
| `effect.vault.removed` | "The arch vault under {way} goes, with what is in it." | `button.show` show(`targets`) | `removed` (V04 §3.5.4's arch vault) |
| `effect.plan.lost` | "{building}'s drawn plan goes with it." | `button.show` show(`targets`) | `removed` (V03 §3.11's stored plan) |
| `effect.deck.ruined` | "{n} buildings on the {deck} fall with it." | `button.show` show(`targets`) | `removed` (item 110 (d)) |
| `effect.households.displaced` | "{n} households move to make room for {thing}." | `button.show` show(`targets`) | `displaced` |
| `effect.walls.rebuilt` | "{n} retaining walls are laid again along the new edge." | `button.show` show(`targets`) | `rebuilt` |
| `effect.stairs.relaid` | "The stairs of {building} are laid again." | `button.show` show(`targets`) | `rebuilt` (V02 §4.6 (2)) |
| `effect.raised.goes` | "{name}, a {kind}, goes: a town builds none by itself." | `button.keepAsYours` commit(`event:keepRaised`) | `removed` on a Re-derive to TOWN (V09 §4.20.3 (7)) |
| `effect.moved` | "{thing} moves {m} m." | `button.show` show(`targets`) | `moved` |
| `effect.more` | "and {n} other changes" | `button.show` app(`showEffects`) | `effectsMore` |
| `offer.raised.standing` | "The {n} raised ways standing stay; remove them too?" | `button.removeToo` commit(`event:removeStanding`) | V09 §4.14 |
| `import.removed` | "The rules would have built {kind} here; kept removed." | `button.show` show(`slot`) | file f item 455 |
| `import.nothingToRemove` | "{kind} was removed in the original; the rules did not build it here." | — | file f item 455 |
| `bend.raised.skyAccess` | "This would cut {island}'s {access}; the raised way ends here." | `button.showWhy` why | the dry run's bend to the last ground vertex before a sky access's column or rope line where `skyAccessObstacles` offers no re-route (J-VI.4 (f); V09 §4.20.2 (6)) |
| `bend.island.keepRoom` | V05 §4.2's line, "{island} keeps room for its {institution}; shrunk to {area} ha" (its text, single source, loaded from volume 5) | `button.showWhy` why | V05 §4.2: a hand resize below the island's floor |
| `bend.island.rimStop` | V05 §4.2's line, "{island} keeps room for its {institution}; the rim stops here" (its text, single source, loaded from volume 5) | `button.showWhy` why | V05 §4.2: a rim reshape bent back to the furthest lawful position |
| `bend.island.handMax` | V05's line, "An island takes at most {n} ways up by hand; moved {access} here" (its text, single source, loaded from volume 5) | `button.deleteOneFirst` show(`access`) — the hand-placed access the bend moves, selected for its Delete (V09 §4.6) · `button.showWhy` why | a `placeSkyAccess` past `accessCount.handMax`, bent into a move of the island's nearest hand-placed access (V05 §3.23, V05 §4.2; J-V5.82) |
| `bend.island.belowCity` | V05's line, "Floating islands need a city; this quarter is laid on the ground" (its text, single source, loaded from volume 5) | `button.cityUp` commit(`event:cityUp`) · `button.showWhy` why | a `quarter` with `sky` below CITY from the API or the clerk, bent to the plain quarter (V05 §3.23's events row) |
| `bend.island.join` | V05's line, "At most three islands float here; this quarter joins {island}" (its text, single source, loaded from volume 5) | `button.showWhy` why | a fourth forced slot, bent to join the nearest open island as a district on it (V05 §3.2 (3); J-VI.4 (a)) |
| `bend.island.lastAccess` | V05's line, "An island keeps one way up; moved to {site}" (its text, single source, loaded from volume 5) | `button.placeOtherAccess` tool(`road`/`skyAccess`) · `button.showWhy` why | a `delete` of an island's last access, bent into a move to the next admissible site (V05 §4.2; J-VI.4 (c)) |
| `bend.island.footMoved` | "The way up lands clear of {pier}." — this volume's words (V05 names the bend, not its line) | `button.showWhy` why | an access foot blocked by a standing raised part, moved to the nearest admissible foot, naming the deck or raised-way pier in the way (V05 §4.2; J-VI.4 (b)) |
| `bend.island.accessKind` | "A {asked} won't work here, so this way up is a {kind}; {kinds} would fit." — this volume's words, naming the kinds that fit (V05 §4.2) | `button.showWhy` why | an access kind the `magic` circumstance or the row's limits do not admit, bent to the nearest admitted kind (V05 §4.2; J-VI.4 (b)) |
| `bend.hood.noClock` | V06 §4.1's line, "a neighbourhood alone has no history yet — open it in its town to advance time" (its text, single source, loaded from volume 6) | `button.showWhy` why | `advance` on a standalone neighbourhood document, bent to none (V06 §4.1; CANON-C02) |
| `bend.wall.newStretch` | "Its stone is gone, so a new stretch is built here." | `button.showWhy` why | a hand `repairWall` on a `dismantled` run or `repairRetaining` on a ruined stretch, bent to a `drawWall` on its line (V06 §2.8; J-VI.4) |
| `bend.raised.newSpan` | "That span is gone, so it is rebuilt as a new span." | `button.showWhy` why | a hand `repairRaised` on a dismantled span or a cleared support (V06 §2.8; J-VI.4) |
| `info.wall.inUse` | "This wall is in use; nothing changes." | — | a no-stretch `repairWall` with no neglect to lift (V06 §2.8) |
| `info.wall.patchOnlyGap` | "Only a gap is patched; this stretch can be rebuilt in {material}." | — | the **Material** chip's patch rows on a `worn` or `patched` run (V09 §4.21.4) |
| `info.wall.run` | "{state} since {year}{, material}." — `{state}` the run's condition word (`legend.wall.<state>`), `{, material}` ", patched with {material}" on a `patched` run | — | a wall run's panel line (V09 §4.21.4) |
| `legend.wall.<state>` | `standing` "Wall" · `worn` "Weathered wall" · `patched` "Patched with {material}" · `breached` "Breach" · `dismantled` "Wall taken down" | — | §8.2's wall state rows, the legend panel (V09 §4.21.4; item 114 (e)) |
| `wall.material.robust` | "In {material}" — the wall's own material word, the enceinte kind's `label` cell | — | the **Material** chip's first choice (V09 §4.21.4) |
| `info.oasis.badge` | "An oasis: {grove} ha of grove and {gardens} ha of gardens." | — | T2 `ground`'s Lake ghost with **Spring-fed** on (V09 §4.21.1) |
| `info.oasis.dossier` | "SettlementForge's record puts water here." | `button.showWhy` why | a water body carrying the dossier's `oasis_water` (DR40; V09 §4.21.1) |
| `info.grand.beyondTier` | "{building} is grander than a {tier} usually has; kept as you made it." | — | a hand design above the rung's grandeur ceiling (item 115 (c); V09 §4.21.5) |
| `info.grand.dossier` | "SettlementForge's record names {building}, so it keeps its full design." | — | a dossier-specified grand building (item 115 (c); V09 §4.21.5) |
| `info.history.symbolic` | "size not recorded" | — | the chip on a fact whose provenance carries `symbolic` (§2.8; item 113 (f); V09 §2.7) |
| `info.history.fromRecord` | "From SettlementForge's record" | — | T1 `intend`'s locked **History** chip with a dossier history (V09 §4.21.3) |
| `info.history.cancelled` | "No town was made." | `button.generateWithoutHistory` app(`generateWithoutHistory`) | a history-first generation stopped during its replay (V06 §3.20.4; V09 §4.21.9) |
| `info.past.viewing` | V06 §5.1's band, "Year {year} — viewing the past" (its text, single source, loaded from volume 6) | `button.openCopy` app(`openCopy`, `seq` — the frame's on screen; in host mode by `HostSlots.newDocuments`) | the timeline thumb off "now": the band, and each disabled tool pressed (V06 §5.1; V09 §5.6) |
| `info.recipe.preset` | "Made from the preset {preset}." | — | `Recipe.presetId` (§2.9), the advanced panel's head (V09 §4.14); the report panel's recipe line after `info.recipe.line`, from `GenerationReport.recipe` (V09 §5.7) |
| `info.recipe.line` | "Made from seed {seed} at {rung}." | — | `GenerationReport.recipe` (§5.4): the report panel's recipe line (V09 §5.7) |
| `report.history.<line>` | `peak` "Once a {tier} of about {n} people, in {year}." · `symbolicPeak` "Once a {tier}; its size is not recorded." · `destroyed` "Destroyed in {year}; refounded in {year2}." · `oldWalls` "Walls beyond today's houses: the {tier}'s old line." · `oldStreets` "Old street lines under {district}." · `buried` "Buried under {place}: {kind}." · `oversize` "{building} is larger than today's {tier} needs." | `button.show` show(`entry`) | §2.7's `HistoryRecord` and V06's replay record (V06 §2.14): the report panel's "What its past left" (V09 §5.7, V09 §4.21.3) |
| `info.under.lost` | "Once known; its way in closed in {year}." | — | a void whose excavation reading is `lost` (V04 §3.5.7; item 113 (e)), shown at tier `secret` only (V09 §4.17.1) |
| `info.under.lostUndated` | "Once known; its way in has closed." | — | the same, when no closing is dated (V09 §4.17.1) |
| `legend.under.lost` | "Once known" | — | the Below legend's entry for a `lost` void (V09 §4.17.1) |
| `view.cvd.<variant>` | `none` "Usual colours" · `protan` "Red-weak" · `deutan` "Green-weak" · `tritan` "Blue-weak" · `line` "Colours: {variant}" | — | the **Colour vision** chip (V09 §4.21.2; §8.2's `CvdVariant`) |
| `export.vtt.walls` | "Patches count as walls, breaches as openings." | — | the export dialog's VTT tab (V09 §4.21.4; item 114 (f)) |
| `info.zoom.limit` | "This is the whole town." | — | the zoom-out control at the map's zoom-out limit where the bounds fit (V09 §4.21.6; §8.8) |
| `info.zoom.limitCamps` | "This is the whole town and its camps." | — | the same, at the limit widened while a crisis look stands (item 122 (i); V09 §4.21.12 (8)) |
| `info.zoom.coarsest` | "This is as far out as the map zooms; the town is wider than this window." | — | the same at stop 0, where no stop fits the bounds (§8.8's limit; V09 §4.21.6) |
| `view.season.<name>` | `spring` "Spring" · `summer` "Summer" · `autumn` "Autumn" · `winter` "Winter" · `week` "Week {w}" · `follow` "Follow SettlementForge" · `noWeek` "SettlementForge's record has no date yet; the map shows week {w}." · `line` "{season}, week {w}" | — | the **Season** control and the export's season line (V09 §4.21.7) |
| `view.festival.<name>` | `title` "Festivals" · `row` "{festival}, weeks {a}–{b}" · `on` "Decorate when a festival is on" · `off` "No decorations" · `preview` "Preview" · `spring` "Spring feast" · `midsummer` "Midsummer" · `harvest` "Harvest home" · `midwinter` "Midwinter" · `line` "Dressed for {festival}" | — | the festival list, its switch, the standalone generic festivals and the export's festival line (V09 §4.21.8) |
| `find.<word>` | the Find panel's words (V09 §4.21.10): `title` "Find" · `box` "What are you looking for?" · `count` "{name} · {n}" · `more` "{n} more" · `allWord` "All {word}s" · `none` "none now" · `noMatch` "Nothing in this town matches “{text}”." · `withheld` "not in this view" · `moreBelow` "{n} more Below" · `onSky` "{n} on Sky" · `onGround` "{n} on the ground" · `goThere` "Go there" · `goTo` "Go to" · `next` "Next" · `previous` "Previous" · `clear` "Clear" · `gaps` "Show gaps" · `gapsNeedKind` "Pick a kind of place to see where there is none." · `noneHere` "none here" · `people` "Where is someone?" · `foundRooms` "{n} found" · `crisisRow` "{look}: {condition}" · `exportLine` "Find: {chips}" · `exportBattle` "Draw Find" · `findAll` "Find all {kind}s" · `section.dossier` "From SettlementForge's record" · `section.kinds` "Kinds of place" · `section.areas` "Districts and quarters" · `section.places` "Named places" · `section.crises` "Crises now" · `section.people` "People" | — | the Find panel, its chip strip, the context menu's item and the export dialog's lines (V09 §4.21.10) |
| `find.group.<key>` | one per V11 §2.3's `FindGroup`: `crafts` "Crafts" · `trade` "Trade" · `faith` "Faith" · `rule` "Rule and law" · `defence` "Defence" · `learning` "Learning" · `health` "Health and care" · `lodging` "Lodging" · `other` "The rest" | — | the empty box's grid headings (V09 §4.21.10 (3); item 120 (b)) |
| `settings.display` · `settings.resolution.<level>` | `settings.display` "Display"; `title` "Resolution" · `auto` "Auto" · `4k` "4K" · `1440p` "1440p" · `1080p` "1080p (HD)" · `720p` "720p" · `screen` "Your screen is {level}." | — | Settings' Display section (V09 §5.12, V09 §4.21.11; item 121 (a)) |
| `view.status.<part>` | `auto` "Auto · {level}" · `manual` "{level}" · `why.screen` "Your screen is {level}." · `why.memory` "This device's graphics memory holds {level}." · `why.frames` "Lowered to keep the map smooth." · `why.ceiling` "{level} is the live view's ceiling." · `tier` "Graphics tier: {tier}; map tiles at {dpr}×." | — | the view-status chip and its tooltip (V09 §4.21.11; §8.8's view status, J-R22) |
| `info.resolution.fallback` | "{level} needs more graphics memory than this device has; showing {shown}." | — | a manual level the device cannot hold: §8.8's nearest level that fits (item 121 (f); V09 §4.21.11 (4)) |
| `view.crises.<word>` | `show` "Show crises" · `preview` "Preview a crisis" · `list` "Crises now" · `line` "During: {looks}" | — | the Show menu's switch, preview and list; the export dialog's line (V09 §4.21.12) |
| `crisis.who.<kind>` · `crisis.groups.<kind>` | the forces' words, for the kinds the dossier sizes (item 122 (h)): `who` — `siege` "besiegers" · `blockade` "besiegers" · `occupation` "soldiers" · `refugeeCamp` "people"; `groups` — `siege` "armies" · `blockade` "armies" · `occupation` "garrisons" · `refugeeCamp` "groups" | — | `info.crisis.forces` (V09 §4.21.12 (5)) |
| `info.crisis.<line>` | `line` "{look}: {condition}, weeks {a}–{b}" · `lineOpen` "{look}: {condition}, since week {a}" · `lineUnnamed` "{look}, weeks {a}–{b}" · `preview` "{look} — a preview" · `ruinedFor` "For now: {look}, {condition}, weeks {a}–{b}" · `forces` "about {n} {who}{, groups}" — `{who}` the look's `crisis.who.<kind>` word, `{, groups}` ", {k} {groups}" where the dossier gives several forces or groups, `{groups}` its `crisis.groups.<kind>` word · `massed` "The rest are drawn as massed camps at the edge of the map." | — | the standing looks of §11.2's `looks` reader with the condition's entity read, `{look}` each look row's `label` (V11 §3.25.9) (V09 §4.21.12 (4), (5)); volume 10's explanation renders the same keys |
| `info.damage.<kind>` | one per line kind V03 §4.6 maps the damaged element kinds to (`upperFloor` and `groundFloor` → `floor`; `cellarWall`, `cellarVault` → `cellar`; `cryptWall`, `cryptVault`, `cryptTomb` → `crypt`; each other kind its own key), with `storeyGone` and `unsafe`, in this order: `roofBay` "Roof fallen in over {rooms}" · `floor` "Floors rotten or fallen through in {rooms}" · `storeyGone` "The {storey} is gone" · `outerWall` "Outer walls broken in {n} places" · `partition` "Partition walls down in {rooms}" · `door` "{n} doors off their hinges" · `window` "{n} windows broken" · `stair` "The stair to the {storey} has fallen" · `furniture` "Furniture broken in {rooms}" · `unsafe` "Unsafe to enter: {rooms}" · `cellar` "The cellar has partly fallen in" · `crypt` "The crypt has partly fallen in"; the head, one per state — `head.abandoned` "Abandoned{, years}" · `head.decayed` "Decayed{, years}" · `head.ruined` "In ruins{, years}" · `head.restored` "In use again{, years}", `{, years}` ", {years} years since it was left"; and `more` "and {n} more" · `patched` "Patched with {material} where it was broken" | — | V03's damage layer at V06's `decayLevel` by §6.3 *Plan damage*'s comparison: the plan panel's and the why card's lines (V09 §4.21.13); volume 10's explanation renders the same keys |
| `settings.device` · `settings.weather.<word>` | `settings.device` "On this device"; `effects` "Weather effects" · `shower` "Start a shower now" · `noneNow` "No weather comes here at this time of year or day." | — | the advanced panel's device group, its switch and its button, and the button's reason while no kind is live (V09 §4.14, V09 §4.21.14) |
| `people.rederive` | "Re-derive people" | — | the People panel's and a household's control (V09 §4.18; §10.3) |
| `island.rim.<mode>` | `resize` "Resize" · `reshape` "Reshape the rim" | — | the island panel's rim chip (V09 §3.5) |
| `progress.stage.<group>` | `ground` "Shaping the ground and the water" · `plan` "Working out what the town needs" · `streets` "Laying out the streets" · `walls` "Raising the walls" · `quarters` "Dividing the quarters" · `plots` "Cutting the plots" · `places` "Finding a place for everything" · `buildings` "Shaping the buildings" · `land` "Fields, gardens and trees" · `names` "Naming streets and places" · `drawing` "Drawing the map" · `people` "Settling the people" · `below` "Digging the underground" | — | the progress view's stage line (V09 §4.21.9; item 119 (c)) |
| `progress.<wait>` | `epoch` "Year {year} of {years}{, steps}" · `history` "Replaying the town's past: {year}{, steps}" · `dossier` "Reading SettlementForge's record{, catchUp}{, steps}" · `export` "Writing the {format}: {percent} %" · `migrate` "Updating this town to this version" · `undo` "Going back: {n} of {total} changes" · `verify` "Checking this town against its recipe: {n} of {total}" — `{, steps}` ", in {n}-year steps" where the run coarsened (V06 §6.8: `EpochReport.advance.cadenceWeeks` against `.requestedWeeks`; `ReplayPlan.epochYears`), `{, catchUp}` ", year {year} of {years}" while an absorb's catch-up folds epochs | — | the progress view's line for a one-time wait that is not a stage run (§11.2's `Progress.wait`), and for Go back to here (from a history row or a restore point; `undo`, from `edit`'s `onProgress`); `verify` the view status's quiet line for an open's verification replay (V09 §4.21.9, V09 §3.9; §12.1, §11.2) |
| `edge.<case>` | `morePoints` "Add another point." · `drawRound` "Draw round an area." · `samePoint` "The ends are the same point." · `frameEnd` "The town ends here." · `nothingToChoose` "Nothing to choose here." · `removed` "That was removed." · `allKept` "Everything here is kept." · `fewVersions` "Only {n} different versions here." · `noLinks` "No supply links in view." · `noSupplier` "No other supplier of {good}." · `keyTaken` "Already used by {action}." · `noneStanding` "None standing." · `noDeckPlots` "No plots on this {deck}." · `oneTier` "One tier has no stairs." · `nothingToShow` "Nothing to show here." · `allMade` "Everything you asked for was made." · `stepGone` "This step's thing is gone." · `nothingToExport` "Nothing to export here." · `townGone` "That town is no longer on this computer." · `unreadable` "This town could not be read." · `nameLetter` "A name needs a letter." · `replaceOldest` "Replace the oldest named point?" · `nothingToApply.<form>`, one per empty form of §7.1's *Empty edits*: `noStrokes` "Nothing to change: the warp has no strokes." · `shortStroke` "Nothing to change: the stroke is too short." · `noArea` "Nothing to change: the shape has no area." · `noMatch` "Nothing to change: nothing matches." · `noLines` "Nothing to change: the list has no lines." · `noQuarters` "Nothing to change: no quarters are chosen." · `noFace` "Nothing to change: nothing lies in that area." · `noAlternative` "Nothing to change: nothing here has another version." · `groundLocked` "Nothing to change: the ground there is locked." | — | V09 §3.16's outcomes, one row per case named there; an empty dry run's reason (§7.1's *Empty edits*), carried as `PreviewResult.empty` (§11.2) |
| `parse.<word>` | V09 §4.16's connectives, a locale's own words: `rel.in` "in" · `rel.on` "on" · `rel.at` "at" · `rel.near` "near · by · beside · next to" (the first word is the one written, V09 §4.16 (6)) · `side` "the {side} side of" · `dir.N` "north" · `dir.E` "east" · `dir.S` "south" · `dir.W` "west" · `kind.gate` "gate" · `kind.square` "square" · `kind.market` "market" · `kind.harbour` "harbour" · `kind.bridge` "bridge" | — | V09 §4.16's reader and its wording (4), (6) |
| `why.driver.<driver>` | one per term of §4.5's field that `FieldDrivers.terms` names: a driver-table row's display label (its `label` cell, file f item 516), and this volume's words for the rest — `water` "Water close by in dry country" (item 111 (b)) · `character` "The kind of quarter it is" · `brush` "Your painting" · `epoch` "The years since" · `chance` "Chance" (`daylight` reads "In shade {p} % of the day", V09 §2.7) | — | `WhyCardModel.bars` from drivers (V09 §2.7) |

**The `button.*` rows** (one per wording, shared by every row that offers it; tone `info`; J-V9.121):
`button.putHereAnyway` "Put it here anyway" · `button.show` "Show" · `button.otherName` "Show a different name" ·
`button.otherNameHere` "Show a different name on this map" · `button.moveIt` "Move it" · `button.notHere` "Not here" ·
`button.placeElement` "Place {element} here" · `button.putAt` "Put it at {site}" · `button.unlock` "Unlock" ·
`button.unassign` "Remove the assignment" · `button.showWhy` "Show me why" · `button.chooseMarked` "Choose another of the
marked places" · `button.overBudget` "Put it there anyway ({n} moves)" · `button.keepBuilding` "Keep {building}" ·
`button.roleInstead` "Make it a {role2} instead" · `button.rebuildFrom` "Rebuild from {stage}" · `button.newPreview` "Show
the new preview" · `button.cityUp` "Make this town a city" · `button.showThem` "Show them" · `button.goBackTo` "Go back to
{time}" · `button.openCopy` "Open a copy from here" · `button.pictureInstead` "Save a picture instead" ·
`button.switch` "Switch" · `button.downloadFile` "Download file" ·
`button.reattach` "Re-attach" · `button.download` "Download" · `button.reload` "Reload" · `button.retry` "Retry" ·
`button.seeChanges` "See what changes" · `button.notNow` "Not now" · `button.editWithVersion` "Edit it with this version" ·
`button.copyCommand` "Copy the command" · `button.openRecipe` "Open its recipe with this version" · `button.keepSaved`
"Keep saved" · `button.useRebuilt` "Use rebuilt" · `button.downloadThem` "Download them" · `button.undo` "Undo" ·
`button.undoGoingBack` "Undo going back" · `button.useAnotherBuilding` "Use another building" · `button.digDownFrom` "Dig
down from {building} instead" · `button.showWayIn` "Show the way in" · `button.addWayDown` "Add a way down" ·
`button.startCatacomb` "Start a catacomb under {ground}" · `button.showCrypt` "Show the crypt" · `button.joinCatacombs`
"Join it to the Catacombs of {name}" · `button.startItUnder` "Start it under {ground}" · `button.cryptSmallest` "Make it as
small as allowed ({m2} m²)" · `button.cryptEnlarge` "Enlarge the cathedral's crypt too" · `button.showCemetery` "Show the
cemetery" · `button.keepWayOpen` "Keep a way open" · `button.enterKey` "Enter a key" · `button.changeLimit` "Change the
limit" · `button.showEverything` "Show everything" · `button.keepMyLine` "Keep my line" · `button.otherSide` "Use the other
side" · `button.longerRamp` "Make the ramp longer" · `button.roadToFoot` "Draw a road to its foot" · `button.stairsFront`
"Stairs along the front" · `button.stairsFaces` "Stairs up the faces" · `button.stairsInside` "Put the stairs inside" ·
`button.changeShape` "Change the building's shape" · `button.keepAsYours` "Keep it as yours" · `button.removeToo` "Remove
them too" · `button.whatIf` "Make a what-if copy and advance it" · `button.drawRaised` "Draw the raised way" ·
`button.generateWithoutHistory` "Generate without its history" ·
`button.deleteOneFirst` "Delete one first" · `button.placeOtherAccess` "Place a different access". A `ConflictAction`'s `msg` (file f item 463) is keyed as the button that carries it: `unlock` → `button.unlock`,
`unassign` → `button.unassign`, `moveTo` → `button.putAt` (`{site}` its target's name). A slot a row's text does not fill
is filled from the entry the button carries (V09 §2.9's *Words*).

**The event forms** (`MsgButton.event`; a `commit` from `event` carries exactly these events, the canvas building them from
the draft and the row's `MsgRef`, and volume 10's `propose` the same bytes, T101-3; J-V9.121):

| form | the events it commits | its rule |
|---|---|---|
| `exactSite` | the draft re-mapped at the plot the user asked for, with "this plot only" (V10 §4.1's `where.plot`), its disruption taken as the preview lists it | file f item 582's exact site; V09 §4.5's T6 `place` |
| `notHere` | `rejectSite` of the dossier-backed thing's site (T6 `place`'s **Not here**) | V09 §4.3's T6 row; §7.2 |
| `firstFreeSite` | `placeAt { plot, designation }` on the first `SiteCandidate` with no `hardFails` of V09 §4.5's T6 `place` `sites` query for the line's locus — nothing when none of the three is free | V09 §4.5's T6 row; V10 §4.1 |
| `rederive` | the declaration with a Re-derive from `{stage}` — §7.1's one resolution of `E_KEPT` and `E_LEVEL` — previewed as V09 §3.3's whole-town ghost | §7.1; V09 §3.3 |
| `cityUp` | `adjust` of T1 `intend`'s size to small city (T1's size chips) | V09 §4.5's T1 row; §7.8 |
| `unassignCreation` | `unassign` of the assignment the creation event made | §7.4's target rule; V09 §3.9 |
| `roomRole` | the draft re-mapped with the room's role `{role2}` (the smallest lawful split) | V03 §4 |
| `stairsAxial` · `stairsFlights` · `stairsInternal` | `tiers { stairs: 'axial' }`, `{ stairs: 'flights' }`, `{ stairs: 'internal' }` on the row's `building` (the stair chip) — `stairsInternal` nothing where tier 0 has no storeys | V09 §4.20.5 (1); V02 §4.6 |
| `retainingFlat` | the drawn line's flat-ground form, a `terrace` whose edge carries the wall | V09 §4.20.1 (3) (b) |
| `retainingOtherSide` | the same form with the terrace on the other side of the line | V09 §4.20.1 (3) (b) |
| `rampLonger` | the crossing's ramp lengthened along the way to its class's grade — nothing where the way's run does not allow it | file f item 364 |
| `roadToFoot` | the same sky access plus a ground `drawWay` of the stroke's class from its first point to the access's foot, one group | V09 §4.20.2 (6) |
| `catacombUnder` | the drawn chamber moved to the centroid of `{ground}`'s burial face (nearest by distance, ties by address), where V09 §4.17.5's ladder places it | V09 §4.17.5 (a), (d) |
| `joinCatacomb` | a `drawTunnel` from the charnel vault to the nearest element of the Catacombs of `{name}` | V09 §4.17.5 (b) |
| `cryptSmallest` | the cathedral's crypt kept at its smallest lawful size, `{m2}` m² — the bent result, accepted in words | V09 §4.17.5 (e) |
| `cryptEnlarge` | the two-event group enlarging the cathedral's crypt, then this crypt | V09 §4.17.5 (e) |
| `keepRaised` | one declared `drawWay { raised: true, class, widthCm, points }` along `{name}`'s course, in the Re-derive's group (the **Keep them as yours** checkbox for that way) | V09 §4.20.3 (7) |
| `removeStanding` | each standing generated raised way removed as V09 §4.20.3 (2), in one group | V09 §4.14; V09 §4.20.3 (6) |

**The application commands** (`MsgButton.command`; `app` buttons run them and never edit by themselves; none sits on a
row a dry run answers, T-V9-15):

| command | what it runs | where |
|---|---|---|
| `download` | the document's `.plat` to the device (ctrl / cmd+S's command) | V09 §4.13; V09 §3.14 |
| `reload` | reloads the page | V09 §3.14 |
| `retry` | the failed export again with its options | V09 §3.10 |
| `seeUpgrade` | the upgrade's diff (§2.9 step 3, §7.5) | V09 §3.14 (a) |
| `editWithVersion` | the `frozenImport` rebase | V09 §3.14 (b) |
| `copyCommand` | the replay command to the clipboard | V09 §3.14 (b) |
| `openRecipe` | the recipe and its log opened with this version | V09 §3.14 (c) |
| `keepSaved` · `useRebuilt` | §2.9 step 4's choice | V09 §3.14 |
| `downloadUnreplayed` | the changes recovery could not replay, as a file | V09 §3.8 |
| `undo` | `undo(h)` of the group the line names | V09 §3.9 |
| `undoGoingBack` | the matching redo group of a Go back to here | V09 §3.9 |
| `restoreTown` · `showDeleted` | Recently deleted's **Restore** of that town; the list | V09 §5.12 |
| `goBack` · `openCopy` | **Go back to here** at `{time}`'s seq; **Open a copy from here** at the row's `seq` — `{time}`'s, the frame's on the past view (`info.past.viewing`), or the head for `refuse.dossierClock`'s what-if copy, detached | V09 §3.9, V09 §5.6 |
| `exportPicture` | the export dialog on its Picture tab (PNG) | V09 §5.10 |
| `share` | the share sheet | V09 §5.11 |
| `switchLayer` | the working layer set to the row's `layer` | V09 §4.2 |
| `reattach` | the orphan's re-attach pick | V09 §4.10 |
| `enterKey` | the key card | V09 §4.11 |
| `openSettings` | Settings' Assistant section | V09 §5.12 |
| `viewAsOff` | View as cleared | V09 §4.8 |
| `showEffects` | the fates sheet's **What else changes**, paged | V09 §5.5 |
| `generateWithoutHistory` | a new town from the stopped request with its history replay off (`history.replay` false, the parity presets' setting; V06 §3.20.4) | V09 §4.21.9 |

The tool hints are §14's table's texts, keyed `hint.<tool>`; this volume adds `hint.variations` ("Three versions: pick one,
or ask for three more."), `hint.restore` ("Every change is saved. Step back to any point here."), `hint.links` ("Lines
show who buys from whom. Click one to change it."), `hint.shade` ("Darker streets spend more of the day in shade.") and
`hint.clerk` ("Ask for a walled harbour town with a temple quarter."), `hint.oasis` ("In dry country a lake can be
spring-fed: an oasis, with its grove and gardens.", the first time T2 `ground`'s Lake mode is picked on an arid site), `hint.raised` ("A raised way crosses what is
below without meeting it; its ends come down by stairs or ramps.", the first time Raised is turned on) and `hint.below`
("Click again to pick what's underneath.", the first time a click lands on a stack of more than one mark) and `hint.find`
("Type what you're looking for; pick as many as you like.", the first time the Find panel opens), each recorded in
`AppPrefs.hintsDone`. Every `host.*` key volume 8 names is a row of the same file, its text volume 8's (V08 §3.9's
held reasons, V08 §4.2's controls and undo words, V08 §4.6's port notes and history lines — `HostSlots.historyLines`'
texts, V09 §4.10 — V08 §5.1's strips and banner rows, `host.locked`, and the draft mirror's discard notice).

**The explanation and assistant keys — one text each (J-V9.79).** The same file carries the key
families volume 10 renders, so the drawer, the why card and the panels draw one sentence per key. Their `en` texts are
written once, in the section named — volume 10's, volume 7's for the village lines, or volume 3's for the plan panel's
warnings — and loaded into
`messages/en.json` from there; this volume does not restate them:

| family | one key per | its `en` text is written in |
|---|---|---|
| `critique.K1` – `critique.K18` | critique row | V10 §3.10's template column |
| `refuse.clerk.<category>` (with `refuse.clerk.key.<keyState>` for the `key` row's three sentences and `refuse.clerk.dossier.count` for the `dossier` row's count sentence) and `refuse.clerk.opsDevice` | one key per `RefusalCategory` value whose V10 §3.16 row words the refusal itself — every value but `lock`, `rule` and `role`, whose cards render the engine's `refuse.*` row for the code — `refuse.viewer` for `role` | V10 §3.16's table; V10 §2.10 |
| `clerk.notice` | — | V10 §3.20's data notice |
| `clerk.alt.*` | each key V10 §5.4's list of the drawer's keys names (*The keys of the drawer's words*): each alternative of a V10 §3.16 row (`clerk.alt.<category>.<n>`, `<n>` its position in its row), the help route's tool button, the history buttons, a critique finding's fix, a Find block's buttons (`clerk.alt.find.show`, `.remove`, `.clear`; V10 §3.9b (7)) and the stale card's **Ask again** (`clerk.alt.stale.retry`) — so every `ClerkAction` `label` that is not a `button.*` row's words has its key | V10 §3.16's alternatives column; for the other keys, the V10 sections V10 §5.4's list cites |
| `clerk.view.cleared` | — | V10 §3.12 (6)'s line when the view's key changes |
| `clerk.applied` | — | V10 §4.4's applied card line |
| `info.raised.<outcome>` | each of the `raised` section's ten outcomes (`built`, `declared`, `carried`, `belowCity`, `reasonNotMet`, `noCourse`, `chance`, `cap`, `suppressed`, `waited`) | V10 §3.9's outcome table (this volume's `info.raised.count` and `.walk` above are its own badge lines, not outcomes) |
| `info.under.*` | each `underground` row of V10 §3.9a — the ruin rows, `LinkCause`, the excavation reading, the dwellings line, `deep`, `sealed` | V10 §3.9a — except `info.under.cause.<rule>` (V09 §4.17.3) and `info.under.lost` (V09 §4.17.1; item 113 (e)), whose words are this volume's, because V10 §3.9a names the causes and the `lost` reading without words |
| `info.catacomb.*` | each value of `CatacombComplex.source.kind`, the rank and count lines, each state, and each burial-face outcome of `catacombOutcome` (`holds`, `countReached`, `wet`, `age`, `island`, `belowTown`, `chance`) | V10 §3.9a — except `info.catacomb.blocked.<cause>`, whose words are this volume's (V09 §4.17.5), for the same reason |
| `info.crypt.*` | the `crypt` section's rows: presence, area and form (full, half, raised-choir, the rim vault), rank, the crypt join, no crypt (dry and wet ground) | V10 §3.9a's `crypt` table |
| `info.plan.*` | each `plan` section row of V10 §3.9a — the eleven item-110 room causes and the three `PlanReport.notes` ids, keyed as V03 §4.6 states (`info.plan.cause.<cause>` for the causes, `info.plan.note.<id>` for the notes) | V10 §3.9a's `plan` table |
| `info.village.*` | each row of V07 §4.5's list | V07 §4.5 |
| `report.plan.<code>` | each `PlanReport.warnings` code of V03 §2.3's union: `W_TIER_UNREACHED`, `W_STOREY_RUN`, `W_ENTRANCE_NO_STOREY`, `W_STACK_ACCESS`, `W_DECK_ACCESS`, `W_GRADE_FACE_TUNNEL`, `W_CHURCH_CATACOMB_HEAD` | V03 §4.5's plan-warning lines |
| `kind.<registry kind>` | each kind of `clerk.content.withheldWords` | V10 §2.10's `content.withheldWords` row |

A shipped locale carries every key of every family (T-V9-15, T-V10-29). V09 §4.17 and V09 §4.20.6 name the row each place
shows by its key; its words are the owning volume's.
=== END ===

=== REPLACE ### 4.12 Touch, pen and window sizes — decided ===
### 4.12 Touch, pen and window sizes — decided

The evidence is thin (`research/ux/tool-survey.md` §6: MFCG's maker says it is not designed for small touchscreens; FTG's
editor is large-screen only; watabou's other tools open the context menu on a long press). The decision (J-V9.9), with
§13.4's first-five-minutes sessions confirming it:

* **Layout classes** (V09 §2.2; item 126 (a2), J140): **wide** (≥ 1024 CSS px wide) and **medium** (narrower) — every
  tool on both, with a pointer, a pen or touch. The map is offered on tablets and desktops only: no phone layout, screen,
  notice or catalogue row exists, and no tool is greyed for its screen. A window below the medium class's minimum,
  600 × 480 CSS px, keeps the medium layout at that size and the page scrolls; nothing is hidden, re-laid or
  re-generated, and the document, the view and the selection are the same bytes before and after a resize over the
  threshold (T-V9-22).
* **Gestures under a coarse pointer** — tap = click; long press (500 ms, no movement beyond 8 px) = the context menu
  (right-click); two-finger drag = pan; pinch = zoom; one-finger drag on empty map = pan when no drawing tool is active,
  and draws when one is; **free placement** (Alt) = a second finger held anywhere while the first draws; double-tap = zoom
  to the thing's band (double-click); the pointer idioms that need a modifier (shift+click New random, ctrl / cmd+click
  reset, alt+click lock) are the context panel's buttons. Hit targets and handles are at least 44 × 44 CSS px, the snap
  radius 22 px (V09 §3.4). Tooltips appear on a long press on a control.
* **The hit stack by touch** (V09 §4.20.8). A tap on the selected thing where the stack holds more selects the next one
  down, as a click does, and the long-press menu lists **Select below: {name}**.
* **Pen** is a fine pointer; pressure is not read (a brush's strength is its slider's, so a replayed stroke never depends on
  a device), and the barrel button is right-click.
* **The fallback** (§13.4): if tablet participants fail where pointer users pass, `AppPrefs.touch.editFabric` defaults to
  false for coarse pointers, hiding the L3 FABRIC and L4 FINISH layers' geometry edits (T8 `fill`'s and T9 `shape`'s drags) on touch — a
  default only, switchable back on and never removed (item 126 (e)) — and the guide says so.
* **The cursor sun** (§8.4): with no pointer hovering, the sun is the sheet's fixed sun (§1.2); on touch, a one-finger drag
  with the Light chip held in the view bar moves the sun (a view input, never logged).
=== END ===

=== REPLACE ### 4.17 The underground in the editor — item 109's screens (J111) ===
### 4.17 The underground in the editor — item 109's screens (J111)

The records and their rules are V04's (V04 §2.2, V04 §3.5.0a, V04 §3.5.1, V04 §3.5.7) and the crypt V03's `Basement.crypt`
(V03 §3.7.4); this section is what a user sees and does with them. **The panels' explanatory lines are the why rows**: a void's excavation reading, its ways in and its dwellings line, a ruin's rows, a catacomb's source, rank, count,
entrance and state, a burial face's outcome, and a crypt's presence, form, rank and join are the matching rows of the
`underground` and `crypt` sections of the subject's `WhyAnswer` (V10 §3.9a), drawn through `WhyCardModel.sections`
(V09 §2.7) with their catalogue keys (V09 §4.9's explanation paragraph) — so a panel, the why card and the clerk say one
sentence. Each place below is named by its row's key; the words of `info.under.*`, `info.catacomb.*` and `info.crypt.*` are
V10 §3.9a's, except the rows this volume words (`info.under.cause.<rule>`, `info.under.lost`,
`info.catacomb.blocked.<cause>`; V09 §4.9).

**4.17.1 Hidden caves and ruins — the game master's view (item 109 (j) (2)).** A cavern or ruin exists whole whether or
not anyone can reach it; a cluster whose excavation reading is `unexcavated` (V04 §3.5.7 (g)) is known to nobody in town.
The Below group's **Show hidden caves and ruins** writes the per-viewer view key `showUnexcavated` (file f item 278; V04's name
for it; J-V9.38). It is offered — present and settable — only to a view whose knowledge key is tier `secret` and whose
View as shows everything; to any lower key it is absent, and a stored value reads as `false`. With it on, S14 draws every
element of an unexcavated cluster in V04 §5.2's unexcavated style, and the legend adds "Not yet found by anyone in town". Below `secret` no sealed void is drawn,
labelled, listed in the gazetteer or "features in view", answered by `why` (an unknown address) or exported (V04 §5.2's
knowledge rule; file f item 278 for §11.1). At `secret`, a picture export draws sealed voids only when its view's toggle is on;
GeoJSON and glTF carry them only at `secret` (GeoJSON with `excavation: 'unexcavated'`), and a VTT scene never (V04 §5.5).
**A lost void** (item 113 (e)): a cluster whose excavation reading is `lost` — once reached (V04 §2.2's `ExcavationRecord`),
its every open link since closed (V04 §3.5.7) — is shown at tier `secret` exactly as an unexcavated one (the same toggle,
style and knowledge rule; GeoJSON's `excavation: 'lost'`), its panel's line `info.under.lost` ("Once known; its way in closed
in {year}", `{year}` the newest closing among the links and accesses of its last path, read from their lifecycle blocks,
§2.8; `info.under.lostUndated` when none is dated) and the legend's entry `legend.under.lost` ("Once known"); below
`secret` it is as a sealed void. Its dwellings empty by V04's vacancy rules; a way in reopened by an edit or an epoch makes
it `accessible` again and the line goes (T-V9-73).

**4.17.2 Drawing into a system — the system chip; new ruins, caverns and catacombs (item 109 (g), (h)).** On the Below
layer, T4 `road`'s Tunnel and T6 `place`'s Chamber show a **system chip** in the options strip: the town's underground systems by name
and kind ("Old Town — buried town", "the Catacombs of St Aelred's — catacomb", "Sewers", "the Deep Caves — cavern",
"Ruins of Ashkar — ruin" …), only those the view's key admits, defaulting to the system under the draft's first point,
else the one last used. Under them it lists the new systems item 109 admits at the town's rung: **New ruin** and **New
cavern** at every rung (item 109 (j) (1)), **New catacomb** at TOWN and above (item 109 (k)). A crypt is never a system and
is never listed (J111). The mapper emits `drawTunnel { system }` or `drawChamber { system }`; a "New …" pick emits
`drawChamber { system: { newKind }, … }`, a closure (§7.3 item 9) that creates the `UndergroundSystem` with its first
chamber (file f item 361): a ruin with its `RuinRecord` of source `declared`, its plan's axis from the drawn chamber (V04 §4.7);
a cavern of the site's geology; a catacomb by the bend ladder of 4.17.5. A ruin chamber is laid on the ruin's axis
(`bend.ruin.axis` names the turn) and drawn in V04 §5.2's `ruin` program, and the legend adds "Ruins of an older town" whenever a ruin
element is drawn. Re-making a run or a system is T10 `hold`'s "this run" or "this system" (V09 §3.7).

**4.17.3 How people get down here (item 109 (j) (3), (3b)).** The panels of an access point, a cavern or ruin cluster, a
catacomb and an undercity neighbourhood have a section **How people get down here**: one line per way in, from the
`AccessPoint.cause` (V04 §2.2's `AccessCause`) of the access, or of the link it reaches through, worded by the catalogue
row `info.under.cause.<rule>` — the `underground` section's access row, whose words are this table's (V09 §4.9); the
access's symbol on the map is V04 §5.2 (7)'s, by `cause.rule`:

| `cause.rule` | the line | symbol |
|---|---|---|
| `dig` | "{building} dug a way down when it was built." (with an `event`: "… when it was rebuilt in {year}") | a stepped arrow |
| `opening` | by kind: "A sinkhole opens here." · "A cave mouth opens here." · "A collapsed shaft leads down here." · "The ruins' old entrance opens here." · "A skylight opens into the cave here." | a ragged ring |
| `overlap` | "The {system} broke into it in {year}." ("… when it was dug" at generation) | a broken wall |
| `mineBreach` | "The miners of {working} broke into it." | a broken wall |
| `lifeline` | "The people below dug this way out to {place}." | a stair |
| `edit` | "You opened this way down." | its kind's, with the declared pin |
| `dossier` | "SettlementForge's record puts a way in here." | its kind's |
| `crypt` | "Reached from {church}'s crypt." (J111) | an arched door |
| `system` | a catacomb's: "The stair down from {cemetery}." (at V01 §3.5.12's opening place, in its chapel where one stands); another system's: "The {system}'s own way in." | a stair |
| `neighbourhood` | "A street stair down to the {neighbourhood}." | a stair |
| `basement` | "{building}'s cellar opens into it." | a stepped arrow |
| `legacy` | "From an older version of the town." | its kind's |

A void reached only through other systems reads "Reached through the {system} from {access}": the path is the
excavation reading's connection graph from the nearest surface access (V04 §3.5.7 (g)), which the reader returns on the
cluster as the fact `under/wayIn` (a list of links and accesses). **Show the way in** highlights every step of
that path (`live.selection`) and lists the steps with their bands in the panel, switching the drawn band as the user steps
through them. A sealed void reads its unexcavated row (`info.under.sealed`) with **Add a way down**; its section adds
the sealed-deep row (`info.under.deep`) when its top lies deeper than `DigRule.maxM` (V11's cell; V04 §3.5.7) below every footprint over it (item
109 (j) (5)).

**Editing a way down** (T9 `shape` and T6 `place`; V09 §4.3's rows): **Brick it up** → `setAttr(access, 'state', 'bricked')`; **Lock it** and
**Open it** → `state` `locked` or `open`; **Who knows this way down** → the `knownTo` chips; dragging its opening →
`setAttr(access, 'ground.at', p)`, re-hosted by `pointLocate` (outside II.7.3's admitted ground the refusal card carries
"Show me why"); dragging its underground end → `moveVertex` on its `access_point` vertex; Delete → `delete`. A change that
closes a cluster's last way in previews the dwellings that empty (`fate.access.lastWay`, V04 §4.3) before Accept.

**4.17.4 Dwellings only after a way in (item 109 (j) (4), with R2).** A declaration that would put dwellings in an
`unexcavated` cluster — a quarter or boundary T5 `quarter` draws on a void part, a T6 `place` `placeAt` of a dwelling class on a void plot, a
clerk's proposal of either — is expanded as a closure that also makes the way in (file f item 372; J-V9.40):
1. a dug access from the ground building standing nearest above the cluster (plan distance from the cluster's nearest
   element to its footprint, ties by address) whose dig floor lies within `DigRule.maxM` of that element's top —
   a `cellar_stair` or `shaft` by V04 §3.5.7 (d)'s kinds, source `dig`, cause `edit` — with `bend.under.accessDug`;
2. else a public opening at the nearest candidate of V04 §3.5.7 (e)'s kinds, its chance waived because it is declared,
   cause `edit`, with `bend.under.accessOpening`;
3. else a public opening of kind `collapsed_shaft` at the point of public ground (V04 §1.2) over the cluster nearest, in
   plan, to its shallowest element, cause `edit` (file f item 372's note; J-VI.4), with `bend.under.accessOpening`;
4. else — no public ground lies over the cluster, and every footprint over it stands beyond `DigRule.maxM` of it — the dry
   run bends the declaration onto ground part 0 over the same footprint, so the homes stand above the void (a quarter or
   boundary takes the same outline on part 0; a dwelling `placeAt` the part-0 plot over its point), named by
   `bend.under.noAccess` ("Nobody can reach this cave yet, so the homes stand above it.") with the alternatives **Add a way
   down** (T6 `place` on a chosen spot) and **Show me why** (item 101 R2; J-V9.102).
The way in and the dwellings are one group and one undo step, so no dwelling stands in a sealed void after any
declaration (T-V9-38).

**The bends' alternatives** (J-V9.112). With step 1's bend the dry run lists in `PreviewResult.alternatives` the
further buildings step 1's rule qualifies, in its order (plan distance, then address), at most three (file f item 372).
**Use another building** is shown while one of them has not been tried: it re-previews the group `[addUndergroundAccess {
building: that building }, the declaration]` — the access first and with no `target`, so file f item 372's grouped-access rule
takes the cluster's element nearest that building's footprint (step 1's element), and the declaration's closure then
finds the cluster reachable and adds no access of its own — and the card keeps `bend.under.accessDug` with `{building}`
that building, drawn by the application from the alternative it chose; each press steps to the next building, and the
button goes when none is left. Accept commits the group as one undo step. The clerk's `propose` for the alternative
carries the same events (V10 §3.16), one per listed building, each labelled by the row's list form "Dig down from
{building} instead" (V09 §4.9), since that card shows every alternative at once (J-V9.118). Steps 2 and 3 run only when no building qualifies, so `bend.under.accessOpening`
offers no building: its buttons are **Show the way in** and **Show me why**.

**A building's own way down** (`addUndergroundAccess`: a building's **Add a way down**, T6 `place`, V09 §4.3; the
group **Use another building** previews). Its dry run takes §7.1's `addUndergroundAccess` outcome row (II.7.6 steps 1
and 3): ground that rules out a full cellar bends to the nearest lawful basement form — a half cellar, a walk-out, a
hatch to a crawl space — named by `bend.under.basement`; ground that admits none is refused with
`refuse.under.basement`, naming the gate; a connector past its route's bound, or with no route (the basement ring
enclosed by other footprints, basement rings or dug passages, or the water table above every floor between it and the
target), is refused with `refuse.under.route`, naming the bound, the blocking building or the water table, and the
basement is not laid. Each refusal card carries **Show me why** (V09 §4.9).

**4.17.5 Catacombs, crypts and cemeteries (item 109 (k) (1)–(6); J111: "switch it then, cathedral also gets crypts but
cemetaries get catacombs").**
* **The catacomb's panel** — an `UndergroundSystem` of kind `catacomb` and its `CatacombComplex` (V04 §2.2):
  * its name, V04 §5.4's label;
  * its burial face with **Show**, and its source, rank and count — the `info.catacomb.*` rows of its `underground` section
    (the source by `CatacombComplex.source.kind`, the count by V04 §3.5.1 (3), a collective record's members counted once;
    with `overCount`, `info.catacomb.overCount`);
  * its entrance — the `system` cause's line of 4.17.3, at V01 §3.5.12's opening place — with **Show**, and every other way
    in by 4.17.3.
* **Its "Over time" tab**: the extent (`extentFloorM2`, m²) with a line chart of it per epoch (from V06's history frames)
  whose values never fall (T-V9-34); this epoch's growth against its cap ("grew {a} m² of at most {cap} m²", from
  `lastGrowth.addedM2` and V04's cap); the **state**, read from `blockedBy` — **growing** when it is empty, **stopped** when
  it holds `sourceClosed` (`info.catacomb.stopped`), **stagnant** otherwise, with each other cause in words
  (`info.catacomb.blocked.<cause>`, this volume's words): `reach` "It
  has reached as far as its diggers go", `wet` "The ground beyond is too wet", `system` "Another tunnel is in the way",
  `foundation` "Deep foundations are in the way", `wallStrip` "The town wall's footing is in the way", `depth` "The rock
  lies too deep", `rank` "It may not outgrow the Catacombs of {largest}"; and the ossuaries' **fill** as a bar, captioned
  `info.catacomb.stagnant` while stagnant, with a stepper (`setAttr` of `fill`; lowering it is allowed and undoable, and
  the next stagnation raises it again, V04 §3.5.1 (7)). The underground view draws the ossuaries denser as `fill` rises
  (V04 §5.2's ossuary program); the application only passes the layer.
* **The crypt on a church's panel.** Every church-class building's panel has a **Below** line from its `Basement.crypt`
  (V03 §3.7.4): the `crypt` section's rows (`info.crypt.*`) — its presence, area and form, the cathedral's "the largest"
  always present (V02 §3.14.5's no-refusal ladder), and on wet ground V03 §3.7.4's rule (an always-crypt class takes the
  raised-choir crypt; any other church none, with ledger slabs in the chancel floor); **Show** opens the plan at the
  basement storey. Where the crypt join exists (an `AccessPoint` of
  cause `crypt`), the line adds "Opens into the Catacombs of {name}" with **Show the way in**. A church without a crypt
  reads the `crypt` section's no-crypt row, with **Add a crypt** where its class's crypt column admits one (`setAttr` of the basement's crypt, V03).
  A crypt is never listed as an underground system.
* **The cemetery's panel** — a churchyard part, a `cemetery`-class use, a Cemetery network ground, a monastery's burial
  yard: its catacomb's name with **Show** and its entrance, or the burial face's outcome from V04's candidate pass, read
  from the face's `why` (path `catacomb`) as its `info.catacomb.*` row (`holds`, `countReached`, `wet`, `age`, `island`,
  `belowTown`, `chance`).
* **Bends, none refused** (R2; J-V9.39). The dry run of `drawChamber { system: { newKind: 'catacomb' } }` runs file f item 361's
  ladder; this volume words the result:
  (a) the chamber's centroid lies inside a church-class building's footprint → `setAttr(building,
      'basement/crypt/ring', <the drawn ring clipped to the building's crypt region>)` and no chamber is laid; on a
      building without a basement, volume 3's crypt ladder makes a crypt-only basement (full, then half, then raised;
      V03 §4.2), and the ghost names the form ("a half-sunk crypt under {church}"); undo is one step:
      `bend.catacomb.church`, offering "Start a catacomb under {its churchyard, or the nearest burial face}";
  (b) on a burial face with the count reached → within V04's `accessReachM` of an element of an existing complex it joins
      that complex (`bend.catacomb.join`); otherwise it becomes a charnel vault — one `ossuary` chamber of the `dug` system
      under that face, capped at `charnelMaxM2` (`bend.catacomb.charnel`, offering "Join it to the Catacombs of {name}", a
      `drawTunnel` from the chamber to that complex's nearest element);
  (c) below TOWN → the charnel vault (`bend.catacomb.belowTown`);
  (d) on no burial face, or on a worked-out quarry below CITY → the chamber stays as drawn, in the `dug` system
      (`bend.catacomb.noGround`, offering "Start it under {nearest burial face}", which moves it to that face's centroid;
      nearest by distance from the chamber's centroid, ties by address). A worked-out quarry at CITY or METROPOLIS within
      V04's `ossuaryReachM` is a lawful source, and the chamber commits as a quarry ossuary.
  (e) Crypt edits (V03's plan events and `setAttr` of the basement): removing the cathedral's crypt — `setRoomRole` away
      from crypt, the basement set to none, a `mergeRooms` that dissolves it — is bent to keep it at its smallest lawful
      size (`bend.crypt.cathedral`); enlarging another church's crypt bends to the rank cap, `crypt.rankShare` × the
      cathedral's area (`bend.crypt.largest`, offering "Enlarge the cathedral's crypt too", a two-event group); another
      church's crypt may be removed freely, and when it carried the crypt join its fates list "The way from {church}'s crypt
      into the catacombs closes." V03 §3.7.4 states these dry runs; this volume words them.
* **The author's removal** (item 109 (k) (4); V04's J-V4.56). Deleting catacomb galleries stays allowed — everything is
  editable: the badge and the fates sheet say `fate.catacomb.removed`, the extent floor drops by the deleted area and the
  deleted nodes are tombstoned, so growth never digs them again; undo restores both. A seal keeps the extent: "Sealed
  galleries stay part of the catacomb."

**4.17.6 Arch vaults at street level (item 110 (b); V04 §3.5.4).** An arch vault stands at grade in a raised
way's `vault` span but belongs to the vaults system. On **Ground** it is reached through its span in the hit stack — the
deck, the span, the vault, the street (V09 §4.20.8). On **Below**, the vaults system's panel lists arch vaults under their
own heading, "At street level, under {way}", each with **Show**, which pans to the span; the depth-band filter never
hides them. Their doors are drawn with the Ground layer's entrances. The why card's first line is V09 §2.7's arch-vault
`decidedBy`. Opening its span or removing its way lists the vault, its building and
any drawn plan among the effects (V09 §4.20.7).
=== END ===

=== REPLACE ### 4.18 People, the family tree and the clock (§10.3's module, M4b) ===
### 4.18 People, the family tree and the clock (§10.3's module, M4b)

Offered only when the relation store holds people (the module tier, §10.3); absent otherwise (J-V9.48).
* **The People panel** (the gazetteer's People chip, or "People" in the top bar's panel menu) opens in the context panel's
  place: filters for type, race, gender, profession, workplace (a pick on the map), age (a two-thumb range), household (a
  pick on the map) and district (chips), sent as `query({ kind: 'people', … })` and paged; each row gives name, age,
  profession, household, district and a tier chip, a withheld person reading "someone the viewer doesn't know" (§9.2).
  Selecting a row outlines the person's home and workplace on the map and opens the person's card.
* **Re-derive people** (`people.rederive`; owner and editor roles) — on the panel's toolbar for the households of the rows
  chosen (a row's household; all the households the filter lists when no row is chosen), and on the household line of a
  person's card for that one household: `regenerate` of scope `people` for those households (§7.4's regenerate row;
  §10.3's re-derive people), previewed with its fates — the people it re-derives and each household's `tableVersion`
  advanced (§2.7) — and committed on Accept as one undo step, its history line "Re-derived the people of {n} households"
  (V09 §4.10).
* **The person's card**: name, age, household, profession, workplace, the module's content rows, **Family tree**, and
  **Where is {name} at…** — an hour slider (default the `time` key's hour) and a day chip send `query({ kind: 'whereIs',
  person, day, hour })`, and the answer draws a pin on its building with "At {hour} on {day}: {place}".
* **The family tree** (§14's view) opens in the context panel's place widened to 560 px:
  `query({ kind: 'relations', person, up: 2, down: 2 })`; generations in rows by birth epoch, partners side by side and
  children below; a branch beyond two generations elided into "+{n}", which expands on click; **Re-root here** on any
  person; opening a person never pins it (§10.3); a keyboard tree grid (arrows between people, Enter opens the card, +
  expands, − collapses).
* **The clock**, beside the Light group: the `time` key's day and hour, **Next hour** (`sim.advance { hours: 1 }`, hidden
  without `@plat/sim`), and "Day and night follow the hour" (`light: 'time'`). It never moves the map (§11.3).
=== END ===

=== REPLACE ### 4.19 The base's view keys, notes, pins and the ruler on screen ===
### 4.19 The base's view keys, notes, pins and the ruler on screen

The base declares these view keys and furniture options and names the application as their writer (§2.9, §9.5); each is
view state, not logged and outside every digest, and the per-viewer ones never cross a bridge (§11.3).

| control | where | writes | default |
|---|---|---|---|
| **Rotate the map** — a dial and "North up" | the view bar's Map group | `rotation` (degrees; the compass follows, §9.5) | 0 |
| **Plots only** | Map group | `plotsOnly` | off |
| **Detail: when clicked · when in view** | Map group | `elaborate` | when clicked |
| **Hand lantern** | Below group (V09 §4.2) | `handLantern` | off |
| **Season** (V09 §4.21.7's control, with the festival list of V09 §4.21.8), **Weather** (where §8 draws them) | the Light group | §2.9's year position and its follow flag (item 117); `weather` | V09 §4.21.7's; `weather` the recipe's, `snow` on by default in a cold or severe climate's snow weeks, the user's to switch (item 117 (g)); `snow` offered only on a climate row where snow can lie — never on an `arid` row or one whose winter does not freeze, where a carried `snow` reads `clear` (§8.2's snow rule) |
| **Day or night**, sun mode, sun height, hour | Light group | `light`, `sunMode`, `sunHeight` | §2.9's |
| **Favourite** — a star on every panel's header | panels; the Notes panel lists them | favourites | none |
| **Notes** — a private note on any thing's About tab; public notes (owner and editor) | the Notes panel and each panel's About tab | notes, public notes | none |
| **Pins** — "Add a pin", then a click; each with a label, a note and one of six colours | the Notes panel | view pins | none |
| **My look** — a viewer's style card | the Dress panel's style cards, for the viewer role | `stylePreset` (a viewer never writes `setStyle`, §11.3 N-15) | none |
| **Grid** — kind (squares, hexes), cell size, skip water | the Dress panel | the grid settings | off |
| **Legend** — auto · everything · off, a border, a corner | the Dress panel | the legend settings | auto |
| **Emblem** — generated, **New emblem** (`rerollLayer { concern: 'naming.emblem', salt: the concern's current salt + 1 }`, logged, one undo step; V09 §4.5's T12 `dress` row), or an SVG of the user's, cleaned by §9.5's sanitiser | the Dress panel | the emblem settings | generated |
| **Compass** — on or off; drag it to place it; the wheel over it turns it; **New compass** (`rerollLayer { concern: 'style.compass', salt: the concern's current salt + 1 }`, logged, one undo step; §9.5) | the Dress panel and the map | the compass settings | §9.5's |
| **The ruler** — click points for a length (m and ft); **Area** for a polygon (m², ha, acres); feature snap by file f item 517 (`{ p }`); Esc ends; **Save as annotation** writes a view pin labelled with the measure | key M; a view-bar button | view data; a view pin | — |
=== END ===

=== REPLACE #### 4.20.6 The new records' panels, handles, spans, crossings and why lines ===
#### 4.20.6 The new records' panels, handles, spans, crossings and why lines

1. **Panel rows** (registry labels and help anchors, file f item 269):
   * a **retaining wall** — its step "{a}–{b} m", its material, towers or buttresses, its high side (chips), and "Made by
     the rules on levelled ground" or "Yours";
   * a **raised way** — its kind (viaduct, raised road, aqueduct; §2.7's `RaisedKind`),
     its reason as the `raised` section's row of its `WhyAnswer` (`info.raised.<outcome>`, V10 §3.9; the same `MsgRef` the
     why card and the clerk draw), with its values (the reason's words volume 11's `raisedWays` `says` rows, V11 §3.24.2),
     its deck height, its arches with their use, its
     supports, the vaults beneath (volume 4), an aqueduct's source and terminal, and for a way carried down its `carried`
     row (`info.raised.carried`, from V07's `RaisedRead.origin`);
   * a **deck** (its host way's panel) — its kind, host, plots, storey cap and footprint band;
   * a **stepped building** — V02's why facts (V09 §4.20.5 (5));
   * a **span** — its use and reason, its vault's building when walled up;
   * a **crossing** — the way, the wall, its form and the step it climbs.
2. **A span** (selected through the hit stack) shows T9 `shape`'s **Open arch · Walled up as a vault** chips → `setAttr(way,
   'spans/<n>/use', 'open' | 'vault')` (file f item 362 (d)), previewed; the effects list the vault's building and any drawn plan
   in it. A span whose recorded reason keeps it open (a part-0 way, water or a flood cell beneath, too tall,
   too low or too steep; V04 §3.5.4's span rule) shows "Walled up as a vault" disabled with that reason in words ("A street
   passes under this arch") — no event is sent. The edit is held (a user edit), and the why card then reads "… by you".
3. **`decidedBy`** (V09 §2.7's rows): for a raised way its own `raised` section row (`info.raised.built`, `.carried` or
   `.declared`), not drawn twice (J-V9.82); V09 §2.7's lines for a levelled retaining wall and an arch vault. The rest of the card's item-110 lines are the `raised`, `underground`, `massing`, `plan`, `island` and `move`
   sections' rows (V09 §2.7's `sections`).
   A raised way whose reason read a dossier record adds the record as a `facts` row of tier `dossier` (DR34) or as `ref`
   rows, a withheld one named by kind (DR35).
4. **Handles** (V09 §3.5's rows): `rampEnd` on a raised way's two ends (drag → `moveVertex` resolved only onto a ground
   vertex, the snap of V09 §4.20.2 (2)); its interior points (`moveVertex` on its raised part's lattice point); a retaining
   wall's chain (V09 §4.20.1 (5)); the terrace level (`terraceLevel`); the tier step (`tierStep`), a round or octagonal tier 0's centre and radius
   (`tierCentre`, `tierRadius`) and the shrine's inset (`shrineInset`) (V09 §4.20.5 (1)).
5. **The context menu** of a raised way: Why here?; Select below (V09 §4.20.8); Lock, Pin; Reset to generated (when edited);
   the Over time submenu (the base's conversions of a way); and Delete with V09 §4.20.3's card.
6. **A crossing's form and the deck's measures** (file f item 364). A selected crossing shows T9 `shape`'s **Stair · Ramp** chip →
   `setAttr(way, 'crossings/<retaining wall id>/form', 'stair' | 'ramp')`; a ramp too steep for the way's class bends into
   a longer ramp along the way where its run allows, else back to a stair (`bend.crossing.steep`). A selected raised way
   shows T9's **Deck height** (`clearanceCm`, the least soffit height over the ways it crosses; a value below volume 11's
   `raisedWays.structure.clearanceCm` for a crossed way's class bends up to it, `bend.raised.clearance`) and **Arch
   spacing** (`spanSpacingCm`, within the material's `pierSpacingM` band) steppers. Each is previewed, and once edited is
   held.
7. The bars are T-V9-51 and T-V9-60 (the effects), with T-V9-12 reading the new paths.
=== END ===

=== REPLACE ### 4.21 Items 111–126 on screen ===
### 4.21 Items 111–126 on screen

Each owner item's rules are the base's and their volumes' (V09 §1.3); this section is the application's part of each,
as the canon routes it — its controls, words, panels, lifecycle and bar. Every word is a V09 §4.9 row, every gesture runs
V09 §3.3's pipeline, and every view setting is view state that never changes the model or its hash.

**4.21.1 The oasis — T2 `ground`'s spring flag (item 111).**
1. **The control.** T2 `ground`'s **Lake** mode gains the toggle **Spring-fed (oasis)** (a `ToolParamRow` of kind `toggle`,
   `basic`, default off; `toolkit.json`, V09 §2.3), offered on every site on Ground — an oasis the user draws may stand on
   any site, since item 111 (d)'s "only on arid sites" binds generation and not a drawing — and hidden on Sky (an island's
   water is V05's; item 111 does not apply there). `hint.oasis` shows the first time the Lake mode is picked on an arid
   site (the biome's climate row, §4.2 S0).
2. **The mapper.** With the toggle on, the lake's points-and-level form maps to `drawWater { kind: 'lake', add: [], from: {
   points: [p], levelCm, spring: true } }`, the flag inside the points form (§7.1's `PointsForm.spring`; §7.1's T2 `ground` row;
   item 111 (a)); the dry run fills the basin (S1's basin fill,
   `bend.lake.level` where the level spills) and lays the oasis's grove and irrigated gardens (§4.2 S1; §2.3's
   `WaterBody.spring`). Commit on Accept, since the grove and gardens re-flow plots.
3. **The ghost and badge.** The ghost draws the water, the grove and the gardens (§8.2's rows); the badge's extra line is
   `info.oasis.badge` ("An oasis: {grove} ha of grove and {gardens} ha of gardens"), the areas read from the preview's
   created land-use faces (`PreviewResult.created`, their `entity` answers), and the usual counts.
4. **After commit.** The oasis is a declared water body (held, §7.2): its level handle as any lake's (V09 §3.5); its flow
   slider ("The spring fails" · "The spring runs again") is V06 §4.2's hand form (`setAttr` on `WaterBody.spring.flow`);
   Delete removes the water, the grove and the gardens as one previewed group (V09 §4.20.3 (1)). The history row reads "Made
   an oasis at {place}" (V09 §4.10). The why card's bars carry the water term as `why.driver.water` (V09 §4.9; item 111
   (b)), whose explanation rows are volume 10's.
5. **From the dossier.** An oasis a dossier's `oasis_water` deposit makes (DR40) is dossier-owned: its panel shows
   **Spring-fed** on and locked ("Set by SettlementForge"), its why card's `facts` row reads `info.oasis.dossier`
   ("SettlementForge's record puts water here"), a Delete takes `refuse.dossierRemove` (§7.7 item 2), and the level handle
   stays (a map-side value the dossier does not set).
6. **Edges.** The toggle on a lake whose point lies in no hollow bends the level as any lake (`bend.lake.level`); a spring
   on an island never arises (hidden); undo removes the oasis, its grove and its gardens in one step; a save, a reload, a
   Regenerate and an epoch keep it (declared). The bar is T-V9-71.

**4.21.2 Colour vision and the second cues (item 112 (a)); the trial (item 112 (b)).**
1. **The setting.** The view bar's Map group and Settings' Accessibility section (V09 §5.12) carry **Colour vision**: "Usual
   colours" · "Red-weak" · "Green-weak" · "Blue-weak" (`view.cvd.<variant>`), writing the per-viewer view key `cvdVariant`
   (`'none'` · `'protan'` · `'deutan'` · `'tritan'`, §8.2's `CvdVariant`). §8.2 joins it to the tile key and lays the sheet's
   checked variant; the legend (§9.5) draws the variant's swatches; picture exports made while it is set draw it, and the
   export dialog's Picture tab shows the line "Colours: {variant}" with a chip to switch it for that export. It is not
   logged, never crosses a bridge and is never in a digest (V09 §2.12); Settings writes the machine default
   `AppPrefs.cvdDefault`, which a view reads while its town holds no value.
2. **The second cues.** Every colour-coded meaning of this volume's thematic views carries a second cue — a pattern, a
   line style, a label or a shape — stated once in V09 §5.4's cue column, one channel per cue (V09-ICONF-4's rule); the
   style families' cues are §8.2's. The chrome's own status colours always pair with an icon and words (V09 §5.1).
3. **The trial** (item 112 (b)) is V09 §7.6's protocol.
4. **Edges.** A sheet without a checked variant for the chosen deficiency draws its palette with its second cues (§8.2);
   an unknown stored value reads `'none'`. The bar is T-V9-72.

**4.21.3 A town with a past — the history option, what the past left, a lost void (item 113).**
1. **The History chip.** T1 `intend`'s sheet gains **History**: "None" · "Once a {tier}" — a picker of the rungs above
   the town's own (item 113 (a), "once a city, now a village") — with, behind More, an **Age** stepper (years, default
   `history.defaultAgeYears` = 300, our own, calibratable; confirmed by T-V9-73's fixture replaying within item 119's
   ten-second comfort level in total, item 119 (a2)). A pick maps to
   `adjust('history', { peak: { tier: rung, symbolic: false, evidence: [] }, ageYears, scars: [] })` — §2.7's standalone
   form of `HistoryHint` — the blueprint's `history` (§4.2 S0), and "None" to `adjust('history', undefined)`. In the
   empty state it is part of the new town's recipe; after a declaration it is a Re-derive from S0 (§7.1), previewed as
   the whole-town ghost with its fates (V09 §3.3), the replay's wait shown by the progress view (4.21.9). With a dossier
   history (DR36–DR39) the chip reads `info.history.fromRecord` ("From SettlementForge's record") and is locked; the
   replay is the port's.
2. **What its past left.** The report panel (V09 §5.7) gains the section "What its past left", one line per
   `report.history.<line>` row read from §2.7's `HistoryRecord` and V06's replay record (V06 §2.14) — the peak (or the
   symbolic peak), each destruction and refounding, the old walls and streets, each buried system, an oversized building —
   each with **Show** on its targets. A fact whose provenance carries `symbolic` shows the chip `info.history.symbolic`
   ("size not recorded") beside its tier chip (V09 §2.7); the story is volume 10's.
3. **A lost void** (item 113 (e)) is V09 §4.17.1's (`info.under.lost`; the Below legend's "Once known").
4. **Edges.** "Once a {tier}" is not offered at the town's own rung or below; at METROPOLIS the picker is empty and the
   chip reads "None" only; a standalone neighbourhood document has no History chip (it has no clock, V06 §4.1); undo of the
   Re-derive restores the former recipe and model; a skeleton carries the blueprint's `history` (§11.1). The bar is
   T-V9-73.

**4.21.4 Walls: the repair's material, and the wall states in the legend (item 114).**
1. **The Repair mode.** T3 `wall` on a selected run (its grip) offers **Repair** with the **Material** chip — first "In
   {material}" (`wall.material.robust`, the wall's own material, the default), then one chip per row of V11's
   `walls.patchMaterials` for the enceinte's kind and culture, each worded by its row's `label` cell ("Patch with timber",
   "Patch with wattle", "Patch with an earth bank" …) — and **Wear**; on a neglected ring (no run selected), **Back in
   use**. The mapper sends `convert { op: 'repairWall', enceinte, stretch, material }`, `convert { op: 'wearWall',
   enceinte, stretch }` or `convert { op: 'repairWall', enceinte }` (V06 §2.8's shapes; §7.1's T3 row). Commit on release;
   Accept when the dry run lists fates or effects. The chip's choice is a session option of the tool (V09 §2.12).
2. **What each run takes.** On a `breached` run a patch row makes it `patched`, robust `standing`; on a `worn` or
   `patched` run only robust is offered (the patch rows shown disabled with `info.wall.patchOnlyGap`); on a `dismantled`
   run the dry run bends to a new stretch on its line (`bend.wall.newStretch`; V06 §2.8); a `standing` run offers **Wear**
   only. "Back in use" with no neglect to lift is a no-op with `info.wall.inUse`.
3. **The panel and the legend.** A selected run's panel line is `info.wall.run` ("{state} since {year}, patched with
   {material}"), read from its condition and material (§2.7's `Enceinte.condition`) and the epoch of its last change; the
   ring's why card carries the generation-time line from §7.7's DR41 (readiness and wealth; item 114 (d)) and
   volume 10's story of each run. The legend (§9.5) lists each wall state present in the view — `legend.wall.<state>`,
   each drawn with §8.2's state row and its second cue (a break with rubble, a patch's own line style, the worn ticks at
   the district band and finer, a dismantled run's trace discs) — so no state is told by colour alone (item 112).
4. **Exports** carry each run's condition and material (§11.1); the export dialog's VTT tab says "Patches count as walls,
   breaches as openings" (item 114 (f)).
5. **Edges.** A run with no material recorded reads robust; a ring of one run takes the same controls; the Material chip
   on a palisade lists the palisade's patch rows (V07); undo restores the former condition, material and last-change epoch
   (V06 §2.8). The bar is T-V9-74.

**4.21.5 A hand edit beyond the grandeur ceiling — honoured and explained (item 115 (c)).**
1. **Honoured.** A T6 `place` placement or a T9 `shape` reshape that gives a dwelling a design above its rung's ceiling (§4.7 S10b's
   ceiling; §10.2's table, V11's rows) — an `H` or `U` plan, a court, a tower or a turret at THORP or HAMLET, a second manor
   or a grand arrangement on another dwelling at VILLAGE — is committed as asked: the ceiling is a default, never a refusal
   (item 101 R2), and an epoch never reshapes it down (V06 §3.8.5 (4)).
2. **Explained.** The shell reads the rung's ceiling row (the same table, by the document's rung) against the draft's
   events — the class a `placeAt` or `build` designates, the family or feature a `setMassing` or `setComposition` sets —
   and, when the design lies above it, adds `info.grand.beyondTier` ("{building} is grander than a {tier} usually has;
   kept as you made it") to the badge and the preview card; the building's why card carries the same line as a `facts`
   row (tier `declared`), and volume 10's explanation says it (V10 §3.9). A building the dossier specifies
   (V08 §3.16 (3)'s "specified"; item 115 (c)) reads `info.grand.dossier` instead, tier `dossier`.
3. **Edges.** At TOWN and above the ceiling admits every design and no line shows; a reshape back under the ceiling drops
   the line; the same edit from the clerk carries the same line on its card (V10). The bar is T-V9-75.

**4.21.6 The view stops at the zoom-out limit (item 116).**
1. **The limit** is §8.8's per-map zoom-out limit — the stop at which the map's whole `bounds` fits the viewport's short
   side, plus one stop of margin (item 116 (a)), or stop 0 where no stop fits — over the bounds of town and camps while
   a crisis look stands (V09 §4.21.12 (8); item 122 (i)). The wheel, a pinch, the − key and the view bar's zoom-out
   button settle no further out than it; at the limit the button is disabled with its tooltip — `info.zoom.limit` ("This
   is the whole town.") where the bounds fit, `info.zoom.limitCamps` ("This is the whole town and its camps.") where the
   bounds of town and camps fit, `info.zoom.coarsest` ("This is as far out as the map zooms; the town is wider than this
   window.") at stop 0 where they do not — and a further wheel or pinch settles back to it without a bounce.
2. **Fit the town** (the view bar's frame button) frames the limit less its margin — for a village, V07 §5.2's township
   view; the town and its camps while a crisis look stands — and the first view is §9.5's framing, unchanged (item 116 (e)),
   taking in the camps while a look stands (§2.9's *The crisis framing*). The export dialog's "whole town" frame is the same
   bounds (item 116 (c)).
3. **Growth.** An epoch or a hand edit that grows `bounds` moves the limit with it at the next `doc.changed`; a view
   zoomed out at the old limit stays where it is until the user zooms.
4. **Edges.** A viewport resize re-reads the limit; a map whose bounds fit at the pyramid's outermost stop keeps that
   stop as its limit, and one whose bounds fit at no stop takes stop 0 (§8.8); a crisis starting or ending moves only
   the limit, the opening view and Fit, never a view the user has moved (V09 §4.21.12 (8)). The bar is T-V9-76.

**4.21.7 The season control, "Follow SettlementForge" and the week's fallback (items 117, 125).**
1. **The control.** The view bar's Light group carries **Season**: a week slider (0–51, spring first, SettlementForge's
   grid; "Week {w}"), the four chips **Spring** · **Summer** · **Autumn** · **Winter**, each the middle week of its
   thirteen (6, 19, 32, 45), and, when the document has a dossier, the switch **Follow SettlementForge**
   (`view.season.<name>`). It writes §2.9's year position and follow flag (per viewer, never over a bridge, never in a
   digest; V09 §2.12). The slider and chips re-skin by §8.2's season rows within §12.5's re-skin budget; the map, its model
   and its hash are untouched in every week (item 117 (a)).
2. **Following.** With the switch on, the week is §7.7's DR42's — the dossier's own latest stamped tick, the greatest of
   its conditions' `triggeredAt`, its calamities' and its history's ticks (item 125 (b)) — read at open and at each
   absorb, its year position by DR42; moving the slider or a chip turns the switch off, and turning it on again takes
   the dossier's week. While the dossier carries no stamped tick, the control's own week holds — midsummer, week 19, by
   default — and the line `view.season.noWeek` says it is the map's choice, not SettlementForge's; the first absorb that
   brings a tick moves the week while the switch is on. Standalone, the control opens at midsummer (week 19) and has no
   switch (item 117 (c)). A host's `view.set { week }` (§11.3) is a command, never an input (item 125 (c)): it
   sets §2.9's `week` key — item 67's drawn week, which the Works and the crisis looks are read against — as a user's
   timeline scrub does, and never writes the year position or the follow switch, per-viewer keys no host message sets
   (§2.9, §11.3).
3. **Weather and light.** `snow` weather defaults on in a cold or severe climate's snow weeks and stays the user's to
   switch where snow can lie — never offered on an `arid` row or one whose winter does not freeze
   (V09 §4.21.14 (5); §8.2's snow rule); the view sun's default height follows the week (item 117 (g)) — both view state
   only.
4. **Exports and words.** Image and print exports draw the week shown and name it (`view.season.line`, "{season}, week
   {w}"); the export dialog shows the line and a chip to pick another week for that export; a battle-map export records
   it (§11.1). The clerk's explanation of a seasonal look is volume 10's.
5. **Edges.** A dossier with no stamped tick holds the control's own week (19 by default) with the switch on and
   `view.season.noWeek`; a tick far in the past reads its year position by DR42; an unknown stored week is clamped into
   0–51; the same document shows identical hashes in all 52 weeks, and the same dossier opens on the same week with and
   without a host context (item 125 (e)); V09 §3.16's row 94. The bar is T-V9-77.

**4.21.8 The festival list and its switch (item 118).**
1. **The list.** Under the Season control, **Festivals** (`view.festival.title`) lists each festival of §11.2's `looks`
   reader (`LooksAnswer.festivals`: §7.7's DR43's list from the dossier) — "{festival}, weeks {a}–{b}"
   (`view.festival.row`), in window order — each with **Preview**; standalone, the list holds the generic festivals
   chosen by the culture and the season (item 118 (b): "Spring feast", "Midsummer", "Harvest home", "Midwinter"). Above
   it the switch: "Decorate when a festival is on" · "No decorations".
2. **What it writes.** §2.9's festival display (per viewer): `follow` (the switch on: a festival's decorations show while
   the view's week lies in its window), `off`, or a festival id (**Preview**: that festival shown whatever the week, until
   the switch is touched or another is previewed). §8.2's decoration rows draw it; the map, the model and its hash are
   untouched (item 118 (a)).
3. **Exports and words.** Image and print exports draw the decorations shown and name the festival
   (`view.festival.line`, "Dressed for {festival}"); battle-map exports draw them in the image only (§11.1). The clerk's
   words are volume 10's.
4. **Edges.** A previewed festival no longer listed after an absorb falls back to `follow` (V09 §2.12); two festivals
   whose windows overlap both show, in window order; with no traditions and no preview nothing is drawn (item 118 (h)'s
   no-op pin). The bar is T-V9-78.

**4.21.9 The progress view — a one-time wait (item 119 (c)).**
1. **When.** Every one-time wait a user sits through — a generate, a Regenerate or Re-derive, an open (from a file, a
   permalink or SettlementForge), an absorb, an export and a migration — runs within §12's ten-second comfort
   level, §12's laws staying the targets (item 119 (a)); an advance of time, a history-first generation and a dossier
   catch-up each complete within it in total, coarsened to fit by V06 §6.8 (item 119 (a2); J132). An open's wait ends at
   the editable complete map: its load-verification replay runs after it, off the path (§12.1; §2.9 step 3), shown only
   as the view status's quiet line `progress.verify` while it runs past `progress.showAfterMs`, never as the strip. A
   wait that passes `progress.showAfterMs` (1 000 ms, our own; item 119 (c)'s "about one second") shows the progress
   view, and a shorter one shows nothing; **Go back to here** (from a history row or a restore point, V09 §3.9) past it
   shows the progress view the same way, counting the events undone from `edit`'s `onProgress` (§11.2's `'undo'`;
   `progress.undo`).
2. **What it shows.** A strip over the map's top — never a modal and never an empty screen: on an existing town the town
   stays drawn under it (dimmed while a whole-town result is pending), and on a first map the stages' outputs fill in as
   they land, drawn in the ghost style under the strip, never shown as the finished map until it is complete (§8.5). The
   strip names the running stage by `progress.stage.<group>` — the running `StageDecl`'s own group by the table below, a
   volume's main-phase stage taking the group of the base stage before it in the registry's order, a tail stage `below`
   — or, for a wait that is not a stage run, its `progress.<wait>` row (an epoch "Year {year} of {years}", the replay
   "Replaying the town's past: {year}", an absorb, an export with its percentage, a migration), naming the cadence
   chosen where the run coarsened (", in {n}-year steps": V06 §6.8's cadence, `EpochReport.advance.cadenceWeeks` against
   `.requestedWeeks`, and `ReplayPlan.epochYears`; a coarsened catch-up too), with a bar over the wait's known steps
   (stages, epochs, export tiles) and **Stop** where the wait can stop: V06's advance (`cancelAdvance`, V06 §4.1);
   item 113's history replay at generation, through `generate`'s `signal` (§11.2) — standalone only: in host mode a
   creation from a dossier (V08 §3.3) shows the strip with no **Stop**, its replay coarsened to fit the comfort level
   (V06 §3.20.4, V06 §6.8), so every editor's creation stays identical (T-V8-3) — where a stopped history-first
   generation leaves no document and shows `info.history.cancelled` with **Generate without its history** (V06 §3.20.4)
   — a stopped Re-derive's replay commits nothing; and an export, through `export`'s `signal` (§11.2).
3. **The stage groups:** `ground` S0–S1 · `plan` S2–S3 · `streets` S4, S5a–S5d, S8–S9 · `walls` S7 · `quarters` S6, S7b ·
   `plots` S10a, S10 · `places` S10b · `buildings` S11 · `land` S12a–S12c · `names` S13a · `drawing` S14 and the tiles of the
   first map · `people` S15 (the simulation module, §4.10, when it is on) · `below` every `phase: 'tail'` stage (V04's
   underground layer, run after the first map, §4.1). Stage progress reaches the shell from the generation worker as each
   stage starts (the worker host's messages, §11.2's worker boundary (`onProgress`); §12's progress rule), never polled.
4. **Interaction stays fast.** Pan, zoom, hover, the season and festival switches and every panel stay live during the
   wait, at their own budgets (V09 §6; item 119 (d)); a gesture's preview is never delayed by the progress view.
5. **Edges.** A wait that ends inside `progress.showAfterMs` never flashes the strip; a wait that fails shows the
   failure rung's line in its place (V09 §3.14); a stage that reports no progress keeps its name with an indeterminate
   bar; a history-first creation from SettlementForge (host mode) shows the strip with no **Stop** ((2)). The bar is
   T-V9-79.

**4.21.10 Find — a filter view with a halo-like glow, across every band and layer (item 120).**
1. **A view, never a change** (item 120 (a)). The Find panel edits §2.9's per-viewer view key `find` —
   `{ chips: FindChip[]; gaps: boolean }` (§2.9's `FindChip`): a **kind chip** (one class, or several for a word chip
   such as "All smiths"), an **address chip** (a place, an area — a `FindArea.id`, V01 §5.4 — a person or an
   institution) or a **dossier chip** (a dossier entry's binding key and anchor, V08 §3.16 (6) (e)), in selection order;
   absent is Find off. It sends no event, preview or undo step and never touches the model, the document, its hash or
   the log; it holds through zoom, pan, band, layer, season, advance and every commit, undo, redo, regenerate, load and
   migration, is saved with the other view keys in the document's `view` section (§2.9; item 120 (a)'s "saved … like the
   other view keys") and never crosses a bridge — a host message never sets a chip (§11.3). Only **Clear**
   (`find.clear`: the chips emptied, Show gaps off) or closing the panel (the key removed) ends it. A chip's colour and
   second cue follow its index and are never stored (item 112).
2. **Where it opens.** **Find** (`find.title`) in the view bar; **Find all {kind}s** in a selected use's context menu
   (its kind chip added; V09 §4.4); the clerk's `find` action (12); a saved view holding the key, at open. Wide: a 320
   px panel docked at the map region's left edge beside the rail, beside the context panel, never in its place, so a
   selection or the drawer leaves it open. Medium: a sheet over the map's left edge that folds to its **chip strip** —
   the chips with their counts and **Clear** in one row under the options strip — whenever the context sheet or the
   drawer opens, and on its fold button; folding never ends the filter (J-V9.138).
3. **The list — what the town holds** (item 120 (b)). With the box empty, the panel lists what this document holds at
   the view's effective key (`effectiveKey()`, V09 §2.10) and drawn week (§2.9's `week`; (8)) by §11.2's gazetteer — its
   class counts and its match listing by class, area and layer — in these sections (`find.section.<part>`): (i)
   `dossier` — V08 §3.16 (6)'s entries, the dossier's names first in the dossier's own order, each "{name} · {n}"
   (`find.count`) with its kind; (ii) `kinds` — the institution kinds present as a grid under V11's nine `findGroup`
   headings (`find.group.<key>`: crafts, trade, faith, rule, defence, learning, health, lodging and `other`, the item's
   "the rest"; V11 §2.3), each its `label` and count ("Blacksmith · 4"), a kind present only on another layer counted
   there; (iii) `areas` — V01 §5.4's `findAreas(key)`, each by its word (district, neighbourhood, quarter, region); at
   the village rungs V07 §5.5's ends and field groups; (iv) `places` — the named places the gazetteer lists (squares,
   gates, temples, bridges, harbours); (v) `crises` — the crisis looks standing (V09 §4.21.12 (7)); (vi) `people` —
   **Where is someone?** (`find.people`), opening V09 §4.18's "Where is", shown when the module holds people. Nothing
   the town lacks is offered; a section with nothing is omitted.
4. **Type-ahead** (item 120 (c)). As the user types, the box (`find.box`, "What are you looking for?") suggests: classes
   by V09 §4.16 (3)'s word matcher over V11 §2.3's `label` and `synonyms` — exact, then a plural ending removed, then
   one-letter typos forgiven in words of five letters or more — case-folded and with prefix matching on, over the
   classes present only (J-V9.139); the dossier's names by V08 §3.16 (6) (c)'s rules (names, never lexicon words); area
   and place names as the gazetteer gives them, by prefix and whole word. Suggestions are grouped by kind with their
   counts, at most eight per group and then "{n} more" (`find.more`); ↑ and ↓ move, Enter adds the highlighted one as a
   chip, Esc empties the box. A whole word two or more present classes carry (V11 §2.3's *A shared word names a set*)
   offers each class and one word chip, "All {word}s" (`find.allWord`), a kind chip holding all their classes. A word
   matching nothing reads `find.noMatch`.
5. **The chip grid** (item 120 (d)). Each pick is a chip: its words, its count, its colour swatch and its glyph. A list
   row or a suggestion adds one; a chip's ×, or a click on its list row again, removes it; any number at once, drawn as
   their union. Colours come from the thematic palette in chip order and repeat past eight; the second cue is one glyph
   on its pins — chip k's from §8.2's nine glyphs by (k − 1) mod 9, so two chips sharing a colour past eight differ in
   glyph — and one dash pattern on its halo's outline per chip index (item 112; §8.2's Find rows). A chip whose target
   leaves the town stays at count 0, dark (`find.none`, "none now"), until removed; a dossier chip follows its record by
   key and anchor (V08 §3.16 (6) (e)).
6. **The look — `live.find`** (item 120 (e)). A new `overlay` live-layer provider, `live.find`, drawn by §8.2's Find
   rows: while any chip is on, the rest of the map lies under the veil (the style's paper at α 0.55); each match is
   drawn above it with its chip's halo — a soft glow fading over ≈ 8 px inside a 2 px outline — and its label above the
   veil; an area chip lifts the whole area (`findAreas`' shapes) and glows along its boundary; at the city band a match
   under ≈ 6 px also carries a pin with its chip's glyph, and pins nearer than ≈ 24 px merge into a count bubble ("12")
   that zooms in when clicked — merged only within one layer and, on Sky, one island (V05 §5.6 (2)). The provider draws
   over whichever Show view is on and never re-renders a base tile.
7. **The index** (item 120 (f), (j)). Rebuilt once per commit, regenerate, undo, redo, advance, load and migration, at
   each change of §2.9's `week` (a timeline scrub, a host's `view.set { week }`) and at each `onEffectiveKey`, in the
   generation worker: per chip its matches by §11.2's gazetteer match listing at `effectiveKey()` and the view's drawn
   week (the query's `week`, absent at the head; (8)) (a kind chip's classes; an address's entity; a dossier chip's
   key's rows); their places on Below by V04 §5.1's `underFindPlaces(doc, ids)` (each part, depth band, glow shape and
   plan anchor) and on Sky by V05 §5.6; an area's shapes by V01's `findAreas`; and, at the interior band, the rooms a
   matched building's institution uses by V03 §5.5's `findRooms(plan, b, target)` for each matched building whose plan
   draws. A new smithy glows at its commit and a closed one goes dark; a season change re-draws the same matches.
8. **Across bands and layers** (item 120 (f)). Matches on the layer shown glow; matches on another layer show as faint
   ghost pins where they are drawn — an island's at its drawn position, a hidden sky layer's included (V05 §5.6 (3)) —
   and the panel counts them per layer: `find.moreBelow` ("{n} more Below"), `find.onSky` ("{n} on Sky"),
   `find.onGround` ("{n} on the ground"), each with **Go there** (`find.goThere`): Below sets the working layer to Below
   and `depthBand` to the match's band (V04 §5.1); Sky sets it to Sky, the island menu's `key` to the match's island and
   a hidden sky layer visible (V05 §5.6 (3)); each then flies to the band that shows the match. At the interior band the
   rooms a matched institution uses glow on the storey shown, with the storey switcher's marks and "{n} found"
   (`find.foundRooms`) and the plan panel's room list marking them (V03 §5.5). At a drawn week whose frame is not the
   head (V06 §3.15.2), each chip's matches — its glow, pins, ghost pins, gaps, counts and results — are §11.2's listing
   restricted to the entities that frame holds: a match the frame lacks is neither drawn, pinned, counted nor listed, a
   chip with none there reads count 0 for that week (`find.none`), and the chips themselves are unchanged.
9. **The results** (item 120 (g)). Under the chips, the matches (name, kind, district, layer), the shown layer's first,
   then by address, paged: **Go to** (`find.goTo`) flies to the band that shows the match and selects it; **Next** and
   **Previous** (`find.next`, `find.previous`) step through the list, each flying as Go to does; the list is a listbox
   whose ↓ and ↑ are Next and Previous and whose Enter is Go to (V09 §4.15). Each chip shows its count.
10. **Show gaps — Coverage folded in** (item 120 (i); J-V9.140). The panel's switch **Show gaps** (`find.gaps`) writes
   `gaps`: for each kind chip, V01 §5.4 (3)'s `gapUnits(chip, key)` — the districts or catchments holding none, counted
   by V11 §2.3's `CoverageSpec`, on every layer, an island's units by V05 §5.6 (4) and a village's by V07 §5.5 — each
   gap outlined dashed and labelled "none here" (`find.noneHere`), while a unit holding a match lies lifted from the
   veil with its matches. Show gaps keeps every behaviour item 120 (i) folds into it: a class's units by its
   `CoverageSpec`, gaps dashed and labelled, knowledge-filtered, drawn over any Show view. Address and dossier chips
   draw no gaps; with no kind chip the switch is disabled with `find.gapsNeedKind`. An older view's
   `thematic: 'coverage'` opens as Show gaps on with no chip (§2.9; V09 §2.12).
11. **What the viewer may know** (item 120 (h)). Every list row, suggestion, count, glow, pin, ghost pin, gap and result
   comes from reads at `effectiveKey()` (V09 §2.7; §11.2's admission): a thing the key withholds is never suggested,
   counted, drawn or hinted at, and a concealed use answers as its front's class or not at all. On `onEffectiveKey` the
   panel re-reads; a chip whose target the new key withholds reads `find.withheld` ("not in this view") with no count
   and draws nothing.
12. **The clerk** (V10 §2.6, V10 §3.9b (7)). The application runs V10's `find` action (V09 §4.11): `set` replaces the
   chips, `add` and `remove` change them, `clear` empties them and turns Show gaps off, and `gaps` sets the switch — the
   panel opening on them; a view action, never an edit. V10's `read_map { kind: 'find' }` reads the same key and index.
13. **Exports** (item 120 (i)). A picture export made while chips are on draws Find as shown — the veil, the halos, the
   pins and the gaps — with the chips in the legend (§11.1); the export dialog's Picture tab shows `find.exportLine`
   ("Find: {chips}") with a chip to leave Find out of that export; a battle-map export leaves it off unless the Tabletop
   tab's **Draw Find** (`find.exportBattle`, off by default) is on.
14. **Speed** (item 120 (j)). Suggestions within ≈ 50 ms of a key and a chip's glow within ≈ 100 ms of the click at the
   METROPOLIS cap (§12.5's overlay budget; V09 §6.4's Find row); the index rebuilt once per commit; no base re-render.
15. **Lifecycle, edges and bar.** V09 §2.12's `find` row; V09 §3.16's rows 86–88; T-V9-83. Find lands at M5 (V09 §8.1's
   AP11; §16's milestone rows), beside V01's area and gap services.

**4.21.11 Resolution — Settings › Display and the view-status chip (item 121).**
1. **The setting** (item 121 (a)). Settings' **Display** section (V09 §5.12) carries **Resolution**: **Auto** (the
   default) · **4K** · **1440p** · **1080p (HD)** · **720p** (`settings.resolution.<level>`), held as
   `AppPrefs.resolution` — device state, never in the document, its hash or the log, so a map opened on another machine
   takes that machine's setting (V09 §2.11, V09 §2.12). A level above the screen's own resolution (its height in device
   pixels) is greyed with `settings.resolution.screen` ("Your screen is {level}"). Choosing a level turns Auto off;
   choosing **Auto** turns it on.
2. **What it drives** (item 121 (a), (d)–(e)). The shell hands the setting to §8.8's resolution ladder and its Auto loop
   at boot and on every change: a manual level sets the tile DPR by §8.8's rule, and Auto chooses by §8.8's loop and
   gives up what §8.4 (g) orders. A change takes effect at the view's next settle, never during a pan, zoom or drag
   (§8.8's settle rule); a change of the device pixel ratio — the window moved to another monitor, read by `matchMedia`
   on the resolution media feature — re-evaluates at once (T121-7). Labels, text, the chrome and every overlay — Find's
   halo, the handles, the ghost — stay at the device's full pixel ratio at every level (item 121 (e)).
3. **The view-status chip** (item 121 (a); J-R22). At the view bar's right end, beside the scale bar, the chip names the
   level in force: "Auto · {level}" (`view.status.auto`) or "{level}" for a manual one (`view.status.manual`). Its
   tooltip says why — `view.status.why.<reason>`: `screen` ("your screen is {level}"), `memory` ("this device's graphics
   memory holds {level}"), `frames` ("lowered to keep the map smooth"), `ceiling` ("{level} is the live view's ceiling")
   — and §8.8's view status, the graphics tier and the tile density ("Graphics tier: {tier}; map tiles at {dpr}×",
   `view.status.tier`). A click on the chip opens Settings at Display. The chip reads §8.8's loop's level in force and
   its reason; it holds nothing of its own.
4. **A level the device cannot hold** (item 121 (f)). The view draws the nearest level that fits and says so once as a
   toast and on the chip's tooltip while it holds — `info.resolution.fallback` ("{level} needs more graphics memory than
   this device has; showing {shown}.") — never a refusal and never a crash (T121-4).
5. **Untouched.** Exports are byte-identical whatever the setting (item 121 (g); §8.7's any DPI), and nothing of the
   document changes.
6. **Lifecycle, edges and bar.** V09 §2.12's `AppPrefs.resolution` and chip rows; V09 §3.16's row 89; T-V9-84. It lands
   at M4 with the performance tiers (V09 §8.1's AP11; §16's milestone rows).

**4.21.12 Crisis looks — Show crises, the preview, the why lines and the framing (item 122, with (h)–(i)).**
1. **The switch** (item 122 (e)). The Show menu's **Show crises** (`view.crises.show`), on by default, writes §2.9's
   per-viewer view key `crises` — `{ mode: 'follow' }` on, `{ mode: 'off' }` off. It is a switch beside the thematic
   views, not one of them: the looks draw over whichever view is on, and under Find's veil as the rest of the map does.
   It never touches the model, the document, its hash or the log and never crosses a bridge (§11.3).
2. **The preview** (item 122 (e), as item 118 (b)'s **Preview**). The Show menu's **Preview a crisis**
   (`view.crises.preview`) lists the look kinds of §10.2's crisis look table (`CrisisLookRow.kind`, each worded by its
   row's `label`, V11 §3.25.9); a pick writes `{ mode: 'preview', look }`, drawn at the table's `previewSeverity`
   whatever the week, until the switch is touched or another look is previewed (§2.9). It is the only way to see a look
   on a map without a dossier; on a dossier map it is offered the same way, the dossier's standing looks giving way to
   the previewed one while it shows and returning when the switch is touched. A carried `preview` whose `look` names no
   row reads `follow` (§2.9; V09 §2.12).
3. **When a look stands.** A condition's look stands while §2.9's `week` lies in its [`sinceWeek`, `untilWeek`) — from
   `sinceWeek` on while the overlay stands when it has no `untilWeek` — by §7.7's DR44 (its map row, its look row, its
   scale by severity and tier or by the dossier's headcounts, item 122 (h)), drawn by §8.2's look rows, several at once
   by §10.2's priority under its density cap. The year position (`yearWeek`) dresses the season and is never compared
   with a condition's weeks. The looks standing reach this volume through §11.2's `looks` reader (`LooksAnswer.crises`)
   — the one evaluation `live.crises` draws and §9.5's legend lists, made in the generation worker and admitted at the
   view's effective key — which this section's controls read.
4. **The why lines** (item 122 (f)). A standing look reads `info.crisis.line` ("{look}: {condition}, weeks {a}–{b}" —
   "Refugee camp: the Northmarch migration, weeks 12–20"): `{look}` its look row's `label` (V11 §3.25.9), `{condition}`
   the condition's name as V08 carries it from the dossier, read by the look's `condition` (the overlay's binding
   key, §2.7's `ConditionOverlay.key`) through §11.2 at `effectiveKey()`, its weeks the look's `sinceWeek`–`untilWeek`;
   `info.crisis.lineOpen` ("{look}: {condition}, since week {a}") with no `untilWeek`; `info.crisis.lineUnnamed`
   ("{look}, weeks {a}–{b}") for a condition the dossier names not; `info.crisis.preview` ("{look} — a preview") for a
   preview. The lines show on the crisis card (5), in the legend's crisis entries, and as a `facts` row on the why card
   of a building in a district a disaster look ruins — one of the look's `districts` in §11.2's `looks` reader (V01's
   `disasterDistricts` at the view's key, evaluated in the generation worker, V01 §3.16; at the village rungs V07's
   units), never a call to V01 on the main thread — or of a field a famine leaves bare (`info.crisis.ruinedFor`, "For
   now: {look}, {condition}, weeks {a}–{b}"; V09 §5.8) — at THORP, HAMLET and VILLAGE a `VillageField`'s and a
   `VillageEnd`'s row is the village `WhyProvider`'s answer row (V07 §4.5), shown once, the card adding none of its own.
   Volume 10's explanation renders the same keys (one key, one sentence, J-V9.79).
5. **The crisis card** — a non-modal card like the why card (V09 §5.8), opened from a crisis entry of the legend, of
   Find's list (V09 §4.21.10 (3)) or of the Show menu's **Crises now** list (`view.crises.list`): the why line; the
   forces' numbers where the dossier gives them (item 122 (h)–(i)) — `info.crisis.forces` ("about {n} {who}{, groups}":
   "about 24 000 besiegers, three armies"), from the look's `forces` (`LooksAnswer.crises[]`: the force and group sizes
   V08 reads from the dossier where present, item 122 (h)), summed over the condition's forces; where a force is too
   large for the frame and its margin (the look's `massed`), `info.crisis.massed` ("The rest are drawn as massed camps
   at the edge of the map."; §8.8's ring); **Show**, framing the look's place — its camps, or for a `disaster` look the
   union of its units' `FindArea` shapes (V01 §5.4 (6)) — as **Fit the town** frames the town; and **Ask the assistant**
   — the card's line as the question on V10's `drawer` entry (`ClerkHandle.send(text, 'drawer')`, no attachment), the
   clerk reading the look by `read_map { kind: 'look' }` (V10 §3.9b (8); prompt rule 21) — hidden without an enabled
   clerk.
6. **Knowledge** (item 122 (e)). A condition the view's effective key withholds is never drawn, listed, named or counted
   (DR44's admission and tier): the card, the why lines, the legend's entries and Find's list all read §11.2's `looks`
   reader at the view's effective key, and re-read at `onEffectiveKey` (View as, V09 §4.8).
7. **Find lists the looks** (item 122 (f)). Each standing look of `LooksAnswer.crises` is a row of Find's `crises`
   section, "{look}: {condition}" (`find.crisisRow`); a click opens its crisis card, and its **Go to** frames it as the
   card's **Show** does. A look is no chip: `find`'s chips name classes, addresses and dossier entries (§2.9's
   `FindChip`).
8. **Framing and the limit** (item 122 (i); §2.9's *The crisis framing*; §8.8's limit). While a look stands drawn — the
   switch on, or a preview — the opening view and **Fit the town** take in the town and its camps, and item 116's
   zoom-out limit widens to the bounds of town and camps together, k_min 0 where no stop fits them
   (`info.zoom.coarsest`); at a limit that holds the camps the zoom control's tooltip reads `info.zoom.limitCamps`
   ("This is the whole town and its camps."). When none stands, all three return to item 116's (V09 §4.21.6), a view
   coarser than the restored limit settling to it about its own centre as at a resize (§8.8). A view the user has moved
   is never re-framed: only the opening view, Fit and the limit change. A condition the viewer's key withholds widens
   nothing.
9. **Exports** (item 122 (f)). Picture exports draw the looks shown and name them (`view.crises.line`, "During:
   {looks}"), the export dialog's Picture tab showing the line (V09 §5.10); battle-map exports draw them in the image
   only, never as walls or obstacles (§11.1).
10. **Lifecycle, edges and bar.** V09 §2.12's `crises` and framing rows; V09 §3.16's rows 90–91; T-V9-85. Show crises
   and the preview land at M3b with the base parts they read (§16's milestone rows), the dossier's looks and their
   numbers with V08's reading at M-SF, the disaster look's districts with V01's W10 at M5.

**4.21.13 A ruined building's plan — its damage lines (item 123).**
1. **One plan, damaged** (item 123 (a); §6.3 *Plan damage*; V06 §3.23). The plan is the one the building was last lived
   in (V03 §3.11 *Decay re-cuts no plan*); what changes with decay is item 123's damage layer over it. The plan panel
   (its contents V03 §4.5's) and the why card's `plan` section (`why.section.plan`, "Inside") of an `abandoned`,
   `decayed` or `ruined` building, or of one restored with patches, show its **damage lines**: V03's damage layer read
   at V06's `decayLevel(doc, lineage, week)` by §6.3 *Plan damage*'s comparison — an element shows damaged while the
   building's decay level is above 0 and at least its threshold t (a level of 0 damages nothing, so a never-decayed
   building draws its plan unchanged) — one line per damaged line kind present, by its `info.damage.<kind>` row in that
   row's order (V09 §4.9): the roof over a room (`roofBay`), floor areas (`floor`, and `storeyGone` once every floor
   area of a storey has fallen — "the upper floor is gone"), outer wall runs (`outerWall`), partitions, doors, windows,
   stairs, furniture, the rooms unsafe to enter (`unsafe`: a room any of whose floor areas or roof bays over it shows
   damaged) and, below ground, the cellar and the crypt (by the building above's level, an underground building by its
   own; V04) — the rooms named in plan order, three at most and then `info.damage.more`. The panel's head line is
   `info.damage.head.<state>` by the building's `Existence` (`abandoned`, `decayed`, `ruined`, or `restored` for one
   restored with patches), its `{, years}` clause the whole years of its decay run at the drawn week (V06 §3.23 (1),
   (4)), dropped before V06's level lands (the existence state alone). Every line reads at `effectiveKey()` (V09 §2.10).
   On a building the key withholds, the lines that name rooms — `roofBay`, `floor`, `partition`, `furniture`, `unsafe` —
   and the `crypt` line are not drawn (purpose withheld; §11.2's withheld rule; V10 §3.9a). The head line, `storeyGone`,
   `outerWall`, `door`, `window`, `stair` and `cellar` stay — a ruin is seen by everyone — and a room the key does not
   admit is never named (V03 §5.4).
2. **Restored** (item 123 (b)). As restoration — a `reoccupy` back into use, or a repair (V06 §3.23 (3)) — lowers the
   level, the damage leaves in reverse threshold order and its lines with it; a repaired element drawn in patch material
   adds `info.damage.patched` (item 114's patchwork), and an element the plan gained after its damage left is drawn as
   built (V06 §3.23 (3)'s per-element peak).
3. **A crisis look's damage** (item 122 (d); §10.2's `lookLevel`). In a district a disaster look ruins, the plan panel
   (V03 §4.5) shows the building's lines at the look's `lookLevel` by severity, or at its own level where that is
   higher, under the head `info.crisis.ruinedFor` — a look: nothing stored, ids and digests unchanged; the why card's
   `plan` section keeps the `plan` provider's rows at the building's own level (V03 §4.6), the look named by the card's
   `facts` row `info.crisis.ruinedFor` (V09 §4.21.12 (4)), as volume 10 tells it (V10 §3.9a; V10 §3.23 C10).
4. **One sentence everywhere.** The lines are this volume's words (`info.damage.*`, V09 §4.9); volume 10's explanation
   of a ruined building renders the same keys from the same reading (item 123 (e); J-V9.79). A building never decayed
   shows no line (item 123 (f)); a higher level's lines are a superset of a lower's (monotone, V06 §3.23).
5. **Lifecycle, edges and bar.** Derived per read, never stored (V09 §2.12); V09 §3.16's row 92; T-V9-86. The lines land
   with V03's plan step that draws a decayed or ruined plan (V03 §8), the levels from V06's at M6-E and, before it, from
   the existence state alone at V11's default age (§16's milestone rows; V06 §3.23).

**4.21.14 Weather effects — the advanced panel's switch and Start a shower now (item 124).**
1. **The switch** (item 124 (g)). The advanced panel's device group **On this device** (`settings.device`; V09 §4.14)
   carries **Weather effects** on · off (`settings.weather.effects`), held as `AppPrefs.weatherEffects` — device state,
   never in the document, its hash, the log or a tile key (V09 §2.11, V09 §2.12) — with **Start a shower now**
   (`settings.weather.shower`) beside it, enabled while the effects are on and a weather kind is live ((4)).
2. **The defaults** (item 124 (g), less its phone clause: item 126 (a2)). With no value stored the switch reads on where
   the tier has headroom — §8.8's mid, high and ultra tiers — and off on the low tier and wherever the system asks to
   reduce motion (`AppPrefs.reducedMotion` `'on'`, or `'system'` with the system's `prefers-reduced-motion` set;
   V09 §5.12) (T124-5; J-V9.144). A user's choice holds over the default; Reset restores it.
3. **What it drives** (item 124 (a)–(f)). The switch gates §8.4's per-frame weather layer, placed by §8.8 above the
   tiles and below the labels, the chrome and every overlay; its spells come from the session's weather timeline
   — §6.1's view-only `view.weather` stream, seeded per session — over V11's weather columns for the climate row at the
   view's year position (§2.9's `yearWeek`, never `week`); the spell in force is session-transient view state (§2.9's
   *Weather effects*). It never changes a tile, the model, the document or its hash, and under item 121 (e) Auto gives
   it up first (§8.8).
4. **Start a shower now** (item 124 (g); V11 §3.25.11). It starts at once, as the timeline's next spell, the commonest
   kind live at that moment — V11 §3.25.11's rule over the climate row's weather cells, a kind live while its band
   holds §2.9's `yearWeek` and, under `light: 'time'`, its hours hold the view's hour (§6.1 *The weather stream*); at a
   moment with no live kind it starts none, and the button is disabled with `settings.weather.noneNow` ("No weather
   comes here at this time of year or day."), never a silent no-op (§7.8). It never starts snow on an `arid` row or on a
   row whose winter does not freeze (V11's compile rules hold the columns to it, and the button checks it again). The
   press is recorded in session state, so the timeline replays from its seed, its clock and the presses (T124-9).
5. **The cover control** (§8.2's snow rule). The Light group's **Weather** (V09 §4.19) offers `snow` only on a climate
   row where snow can lie — never on an `arid` row or one whose winter does not freeze — and a carried `snow` (an older
   view, a pin, a changed climate) reads `clear` there (§8.2).
6. **Exports** never draw the animated effects; the season's cover still applies (item 124 (h)).
7. **Lifecycle, edges and bar.** V09 §2.12's `AppPrefs.weatherEffects` and spell rows; V09 §3.16's row 93; T-V9-87. It
   lands at M3b with item 117's season looks it reads (§16's milestone rows).
=== END ===

=== REPLACE ### 5.8 The "Why here?" card ===
### 5.8 The "Why here?" card

A `WhyCardModel` (V09 §2.7, projected from §11.2's `WhyAnswer`) renders as: the subject's name with its tier chip; the
`decidedBy` line; the **bars** — each a plain sentence with a horizontal bar whose length is its share against the
largest in the answer and whose side (left a push away, right a pull toward) is its sign, the target named and clickable
(**Show**), then "and {more} smaller reasons"; for a district, block or plot the **drivers** of its wealth as bars — the
shade among them, "In shade {p} % of the day" (item 102 (f)), and the water term in dry country (`why.driver.water`,
item 111); for a wall the **closure** lines ("The cliff closes the
circuit from north-east to south-east", item 106 (g)); the **links** as "Buys {good} from {provider} ({m} m, near
enough)" and "Sells {good} to {consumer}", with the orientation in words and a split pair's other half; a record's
**members**; the **profile chips** with their sources (V09 §4.7); the **alternatives** as "Other sites it considered", each
drawn on the map as a faint numbered outline while the card is open; the **facts** with their tier chips and derivation
rows; the **dossier line** "Since week {w}: {reason}"; "Today the rules would put it elsewhere; it stays." when
`drifted`; among the facts, the grandeur line (V09 §4.21.5), an oasis's dossier line (V09 §4.21.1), the symbolic chip
(V09 §4.21.3) and, for a building in a district a disaster look ruins or a field a famine leaves bare,
`info.crisis.ruinedFor` (V09 §4.21.12 (4)) — at THORP, HAMLET and VILLAGE a `VillageField`'s and a `VillageEnd`'s row
is the village `WhyProvider`'s answer row (V07 §4.5), shown once, the card adding none of its own; then the **sections** (V09 §2.7), each under its title (`why.section.<kind>`) with its rows as plain
sentences, their values in the user's units, tier chips and Show on a row's target — for an underground element its
depth, excavation reading and ways down (the `underground` rows, V09 §4.17.3's lines among them, with `info.under.deep` for
a deep sealed void); for a building drawn damaged, the `plan` section ("Inside") opening with its damage lines at the building's own level
(`info.damage.*`, V09 §4.21.13 (1), (3)); and for item 110's records (V09 §4.20.6) — a raised way's `raised` rows (its outcome in volume 10's
words with its values, the first as the `decidedBy` line), a dossier record that fed it as a `facts` row of tier
`dossier`; a retaining wall's and an arch vault's `decidedBy` lines (V09 §2.7; V09 §4.17.6). A withheld target reads "somewhere the viewer doesn't know" (§11.2). **Ask the
assistant** at the card's foot (hidden without an enabled clerk) sends the card's question with its `WhyAnswer` on V10's
`why` entry (V09 §4.11). The card is a non-modal panel; it answers within V09 §6.3's budget.
=== END ===

=== REPLACE ### 5.15 Every new thing: drawn, labelled, exported, persisted ===
### 5.15 Every new thing: drawn, labelled, exported, persisted

| thing (V09 §) | drawn | labelled | exported | persisted |
|---|---|---|---|---|
| `siting.declared`, `siting.linkEdits` rows (2.6; V11's tables) | through their effects: the link view's pin dots and crossed stubs; nothing else of their own | in the why card's chips ("yours"), the per-kind panel and the Links tab | as the document's override layer in the `.plat` and the skeleton (V11 §4.2); GeoJSON carries `plat:links` (the use's declared link rows) on the use's building features | the log (`editTable` events) |
| link rows (2.7; derived) | `live.links` (5.4) | the legend by good; the Link card | GeoJSON: with "include supply links", one LineString per link in view scope, `kind: 'supplyLink'`, `good`, `consumer`, `provider`, `satisfaction`, `declared` | never (recomputed, item 105 (a)) |
| the shade raster (2.7; derived) | `live.shade` (5.4) | the legend; the readout | a picture export while Shade is on draws it (a base live layer in the tile key, §11.1's live layers named in the export's layer set) | never (the field's driver, recomputed on load) |
| a record's members (4.7; `EntityCard.members`) | outlines while a record is selected | the panel's list | the members are ordinary buildings in every export | the model (their buildings) |
| restore points (2.8) | chips in the history panel | their names | inside the `.plat`'s view section only | the document's view section |
| `showUnexcavated` (4.17.1) | V04's unexcavated style while on, at `secret` | the legend's "Not yet found by anyone in town" | a picture at `secret` with it on; never below `secret` | the view section, per viewer |
| the ways down's causes (4.17.3) | the access symbol by cause; "Show the way in" as `live.selection` | the panel's lines | GeoJSON's `cause` on every access and link (V04 §5.5) | the model (V04's records) |
| the catacomb, crypt and cemetery panels (4.17.5) | the extent chart; the ossuary fill by V04's program | the panels' sentences | GeoJSON's complex feature (V04 §5.5) | the model (V04's and V03's records) |
| `live.voids` (5.4) | overlay outlines | the legend | a picture while the view is on | never (derived) |
| the Show menu's **SettlementForge's chains** (5.4) | V08 §5.2's `supplyChains` thematic row while `thematic` is `supplyChains` | the legend and the gazetteer by V08 §5.2's row | GeoJSON: V08 §5.2's `supplyChain` LineStrings, under its knowledge rule; a picture while the view is on | never, but the per-viewer view key `thematic` (the records are V08's, in the model) |
| `LayerSpec.showCircuit` (5.4) | barrier arcs dashed with anchor ticks | — | pictures draw it while on | the style's layer spec (`setLayer`, logged) |
| the People panel, the family tree, where-is pins (4.18) | panels; home and work outlines; a pin | the panels' rows | the people CSV (§11.1) | never (queries) |
| notes, pins, favourites (4.19) | pins as markers with their colour; notes in panels | a pin's label | public notes and pins inside the `.plat`'s view section; never in pictures unless "Show pins" is on in the Picture tab | the view section |
| Recently deleted (2.11) | the Storage section and the file menu's list | the town's title | "Restore", then any export | IndexedDB, 30 days |
| drafts, previews, variations (2.4) | the ghost, tray, badge | the badge | never | never (the draft mirror only, locally) |
| the message catalogue, `toolkit.json` (2.3, 2.9) | the chrome | — | `@plat/docs` generates the tools' and messages' guide pages from them — the messages page with one anchor per row, `messages#<key>` (the `page` a `why` carries for a row: V10 §3.5 step 3's default target), and one page per staged layer §7.3 item 9 (d)'s F-EDIT can name, `staged/<layerId>` (what the layer is and the milestone that ships it, from the base's staged table; `refuse.staged`'s `page`) | `@plat/tables` |
| preferences and the local store (2.11) | the settings screen | — | "Download all my towns" | IndexedDB |
| item 110's ghosts, handles and badges (4.20) | the ghost's marks of 5.3; the `rampEnd`, `terraceLevel` and `tierStep` handles | the badge's lines | never | never (session) |
| the effects list (4.20.7) | the badge's count; the fates sheet's "What else changes"; the clerk's card | the `effect.*` rows | never | never (per preview) |
| the hit stack and part selection (4.20.8) | the selection outline of the entry chosen | the context menu's "Select below: {name}" | never | never (session) |
| retaining walls, raised ways, spans, arch vaults, deck plots and tiers (the base's and volumes 2 and 4's records, as V09 §4.20 edits them) | §8 (the base's drawing: the low-side ticks and shadow, the raised part above ground part 0 with its shadow) | §9 (a raised way is labelled like any way; T11 `name`) | GeoJSON, SVG, PNG, VTT (a deck scene per raised way), glTF and CityJSON by file f item 447 | the model; their edits in the log |
| a removal's suppression (4.20.3) | nothing (the thing is gone); the history row's dashed former outline while hovered | the history row and `info.remove.holds` | the skeleton's removals (file f item 455) | the log (file f item 260's `detail.suppress`) |
| the second fixture's canvas script (7.2) | — | — | the test tree | the test tree |
| an oasis (4.21.1; §2.3's `WaterBody.spring`) | §8.2's water, grove and garden rows | §9.1's water label | every format as a water body with its grove and gardens (§11.1) | the model; its event in the log |
| `cvdVariant` (4.21.2) | the sheet's checked variant | the legend's swatches | a picture made while it is set | the view section, per viewer |
| the history lines and the symbolic chip (4.21.3) | the report panel; the chip | the `report.history.*` rows | the report's JSON in the full export | never (derived from §2.7's `HistoryRecord`) |
| a lost void's line (4.17.1) | V04's unexcavated style, at `secret` | `info.under.lost`, the legend's "Once known" | GeoJSON's `excavation: 'lost'` at `secret` (V04 §5.5) | never (V04's reading, derived) |
| the wall states and a run's material (4.21.4) | §8.2's state rows | the legend's `legend.wall.<state>`; the run's panel line | every format with condition and material (§11.1) | the model (§2.7's `Enceinte.condition`); repairs in the log |
| the grandeur line (4.21.5) | the badge line | `info.grand.*` | never | never (derived per preview and per why answer) |
| the zoom-out stop (4.21.6) | the zoom control's disabled state | `info.zoom.limit`, `.limitCamps`, `.coarsest` | the export's whole-town frame | never (§8.8's limit, derived from `bounds` — or the bounds of town and camps while a crisis look stands) |
| the season and the festival display (4.21.7, 4.21.8) | §8.2's season and decoration rows | `view.season.line`, `view.festival.line` | pictures draw and name them; battle maps record the season | the view section, per viewer |
| the progress strip (4.21.9) | the strip | `progress.*` | never | never (session) |
| Find and its key `find` (4.21.10) | `live.find` by §8.2's Find rows: the veil, halos, outlines, pins, count bubbles, ghost pins and gap outlines | the chips' words and counts; `find.noneHere`; the legend's chips | a picture made while chips are on, with the chips in the legend; a battle map only with **Draw Find** (item 120 (i)) | the view section, per viewer; the index never |
| the view-status chip (4.21.11) | the chip | `view.status.*` | never | never (derived); the setting `AppPrefs.resolution` on the device |
| the crisis looks and the key `crises` (4.21.12) | §8.2's look rows; §8.8's massed marks on the ring | the legend's crisis entries, each look row's `label` (V11 §3.25.9), `info.crisis.*` | pictures draw and name them (`view.crises.line`); battle maps in the image only, never as walls (§11.1) | the view section, per viewer; the looks never (DR44, derived) |
| the damage lines (4.21.13) | V03's damaged plan (§8.6) | `info.damage.*` | the plan's exports draw the damage (V03; §11.1) | never (derived) |
| weather effects (4.21.14) | §8.4's per-frame weather layer | — | never (item 124 (h)) | `AppPrefs.weatherEffects` on the device; the spell never |
=== END ===

=== REPLACE ## 7 Tests and acceptance bars ===
## 7 Tests and acceptance bars

Every bar runs in the app harness of §13.4 (Playwright on the reference machine of §12.1; Chromium, Firefox and WebKit
where the bar says "three engines") unless it names another bench. "Canvas script" is V09 §3.12's gesture list. Bars
T-V9-3, -4 and -29 to -31 are milestone exit criteria (V09 §8); the rest run on every pull request. They take over
§13.2's T101-1 – T101-9 on the canvas (§13.2's take-over row for the application): T101-1 and T101-2 by T-V9-12, T101-3
by T-V9-12, T-V9-13 and T-V9-71, T101-4 by T-V9-82, T101-5 by T-V9-13, T101-6 by T-V9-31 and T-V9-56, T101-7 by
T-V9-81, T101-8 by T-V9-6 and T101-9 by T-V9-5 — T112-1's thematic-view clause and T112-2 by T-V9-72, and the screens of items 114–126: T114-6 by T-V9-74,
T115-3 by T-V9-75, T116-1 by T-V9-76, T117-6 by T-V9-77, T118-2 by T-V9-78, T119-3 by T-V9-79, T120-2 – T120-5 by
T-V9-83, T121-1, T121-4 and T121-7 by T-V9-84, T122-2 by T-V9-85, T124-5 by T-V9-87 and T126-1 – T126-3 by T-V9-22
(§13.2's take-over table). The app harness also runs volume 12's fixtures on its bars (X-V12-20): V12 §3.15.11's device
fixtures with T121-5's captures (T-V9-84), V12 §3.15.12's crisis-preview sessions (T-V9-85), V12 §3.15.14's weather
fixtures' sessions, the view time stepped by the harness's clock (T-V9-87), and V12 §3.15.16's touch scripts and resize
script at 600 × 480 (T-V9-22).

### 7.1 The bars

| id | what it checks | pass | milestone |
|---|---|---|---|
| T-V9-1 | the empty state (V09 §3.2): first run shows a finished town with the overlay line and three buttons, no form; the first declaration ends the empty state; from M3b, the proxies after idle | the first map within §12.5's law + 100 ms; Enter before any declaration replaces the town, after one makes a new document (two documents in the recent list); from M3b the six proxies within §7.8's budget | M1 (shell), M2a; M3b (proxies) |
| T-V9-2 | R1 — no dialog before a first ghost | for every tool mode's canvas script — T1 `intend` after a declaration among them — no element with `role="dialog"` or `alertdialog` opens between pointer-down and the first `live.ghost` delivery; T1's fates sheet opens only after Accept | M2a, M3a |
| T-V9-3 | the latency budget (V09 §6.1) | stop-to-ghost p95 per tool within its row + 10 % at TOWN, CITY and METROPOLIS band tops — the item-110 rows on their scripts at CITY and METROPOLIS — or the pre-decided fallback applied and reported | M2a (T9 `shape`, T10 `hold`), M3a (T2 `ground` – T8 `fill` and item 110's rows), M3b (T11 `name`, T12 `dress`) |
| T-V9-4 | L-trace and L-snap | ≤ 1 frame and ≤ 2 frames p95 over a 2 s scripted drag per tool; main thread ≤ 4 ms per frame | M2a, M3a |
| T-V9-5 | the count badge is true (takes T101-9 on the canvas) | the badge equals `PreviewResult.counts`; after Accept, the committed model's plots, households and buildings of the declared thing equal the badge exactly — a quarter, a fill and a roster among the declarations | M2a; the quarter, fill and roster at M3a |
| T-V9-6 | declared means held, as the user sees it (takes T101-8) | declare a quarter and a tavern, then Try again on a block inside the quarter (its fates list naming each declared thing held), **New trees** (T12 `dress`; `rerollLayer` of `render.instances`, town-wide) and **New decoration** (T12; `style.jitter` then `style.crowns`, one group, one undo step): every declared entity keeps its leaf digest, and New decoration changes no model digest; the tray shows the declared-things line; Try again's chip row offers no layer chip | M2a; the New trees and New decoration steps at M3b (with T12, AP4) |
| T-V9-7 | variations | for each source (fill, a density, greenery and prosperity brush, a quarter's fabric, a scoped New random): three thumbnails of distinct content digests; Accept commits V09 §3.6's group for that source; a replay of the log gives the accepted variation's model digest; "Show three more" gives three new distinct ones | M2a (New random), M3a (the rest) |
| T-V9-8 | snapping | on fixtures, a T3 `wall` end within 8 px of a cliff edge, a T4 `road` end near a junction and a T5 `quarter` corner near a street centre-line resolve to the snap target's point in the stored event; with Alt held they do not; the role label shows | M3a |
| T-V9-9 | the wall ghost and natural barriers (item 106 (g)) | on item 106 (h)'s river-loop and cliff-backed fixtures, the ghost's barrier arcs' total length equals the committed enceinte's barrier-closure length within 1 m, the badge's walled length the committed wall's within 1 m, and every anchor tower ghost becomes a committed tower | M3a |
| T-V9-10 | handles | every closed derived shape shows 4–8 handles by default and 8–16 with More (k by V09 §3.5's rules); each handle kind's drag emits V09 §3.5's event; a boundary handle drag's `drawBoundary` polygon differs from the resolved ring only between the moved handle's neighbours, and it changes only the plots along that run (the locality oracle, §7.3 item 7 (ii)); a lake shows no rim handle | M3a |
| T-V9-11 | the canvas is deterministic | one canvas script, each gesture replayed at its recorded view scale and centre, on the three engines, at 1 440 × 900 and 1 024 × 768, at DPR 1 and 2, yields one model digest | M3a |
| T-V9-12 | the tool binding is complete | a walker over the `EditEvent` union (the base and the volumes as revised) and §2.8's registry reads `toolkit.json`'s modes' `emits`, the `HandleSet` kinds' emits (V09 §3.5), the context panel's and the context menu's generated controls: every kind is emitted by one of them or is on V09 §4.3's host-only / API-only list; every (kind, target) pair of §7.1's binding has its V09 §4.3 row and its gesture emits it — `moveVertex` on a shore or coast (T2 `ground`), on an enceinte's trace with a stretch's anchor vertex and a gate's crossing (T3 `wall`), on a way's, a raised way's and a tunnel's chain (T4 `road`) and on an island's key (T9 `shape`, **Reshape the rim**), `instance` on a hood pin (T6 `place`) and on trees and §8.10's other decoration instances (T8 `fill`) with add, move, remove and restyle, and `regenerate` of scope `people` (T10 `hold`, **Re-derive people**) among them — item 110's forms read by their discriminating fields (`drawWall.kind: 'retaining'`, `drawWay.raised`, `class: 'aqueduct'`, the `terrace` sugar, `setMassing { op: 'tiers' }`, the `spans/<n>/use`, `crossings/<wall>/form`, `clearanceCm` and `spanSpacingCm` paths); every entity kind's editable path has a control; a new kind without either fails CI; and each mode's `emits` lies within its tool's entry of T101-1's registry — §7.1's toolkit row as the requests amend it (T6 `place`'s one-line `roster` by file f item 570) plus the kinds a volume registers under that tool — so T101-2 holds on the canvas side as T-V10-1 holds it on the clerk's; and a T6 drop at a point emits `placeAt { plot: '', from: { points: [p] }, designation }`, byte-equal to V10 §4.1's `where.at` encoding of that point, while "this plot only" emits the plot under it (T101-3); a way's **Split here** and **Join these** are T9 `shape`'s (V09 §4.3), emitting `split { id, cut: [p] }` at the nearest centre-line point and `merge { ids }`, byte-equal with V10 §4.1's T9 way forms; T11 `name`'s **New names** in its three scopes and T12 `dress`'s **New emblem**, **New compass**, **New trees** and **New decoration** write V09 §4.5's bytes — the scoped forms `salt: 0` with `ids` in address order, the town-wide ones the concern's `DisplayList.salts` value + 1, New decoration's two as one group in registry order — which T-V10-4 compares with the clerk's encoders; and every rerollable concern of §6.1's registry (`naming`, `render.instances`, `style.jitter`, `style.crowns`, `style.compass`, `naming.emblem`) is written by a control, a concern no control writes failing CI | M2a on |
| T-V9-13 | refusals and bends are actionable (takes T101-5's refusal clause) | every refusal of a declaration by a dossier fact or a lock — `refuse.dossierOwned`, `refuse.dossierRemove`, `refuse.roster.dossier`, `refuse.locked`, `refuse.warp`, `refuse.water` — carries its reason and at least one closest alternative, as T101-5 states (a marked declaration of the dry run's `alternatives`, an unplaced dossier element, or the map-side alternative its row names); each F-EDIT reason, `ConflictAction` kind and bend of a fixture list — the bends of J-VI.4 among them, listed as bends (V02 §1b's massing set, `bend.raised.*`, `bend.aqueduct.*`, `bend.retaining.rim`, `bend.island.*`, `bend.hood.noClock`, `bend.wall.newStretch`, `bend.raised.newSpan`) — renders its catalogue row; every refusal row carries at least one button and every bend its pre-selected alternative where the row names one; each button yields a preview that is `ok` or a new bend; on a dossier-bound fixture a T6 `place` locus drop naming no element renders `refuse.roster.dossier` with the element picker and **Put it at {site}**, the picker's pick previews the line with its `element`, and Put it at {site} previews `ok` on the first candidate of V09 §4.5's `sites` query — the plot the clerk's `dossier` alternative names for the same locus; when none of the three candidates is free of hard fails, the card shows the element picker without **Put it at {site}**; on a T7 `roster` list on the same fixture, a line committed naming no element renders `refuse.roster.dossier` on its card with the picker and **Put it at {site}** by the same query (`near` and `district` from the line's locus, both omitted for a line with none), its plot equal to the clerk's `dossier` alternative for the same line (J-V10.93); the card's `{thing}` is the line's name, or the class's display label when the name is `''`, and its `{locus}` V09 §4.16 (6)'s wording (`in` and the settlement's name for a line with none), which (4) parses back to the same `Locus` for every named locus target of the fixture; for each word declaration of V09 §4.15 — T5 `quarter`'s seed, T4 `road`'s two points, T3 `wall`'s two ends — the point written is the named target's `EntityCard.anchor`, equal to volume 10's resolution of `{ at: target }` for the same words (V10 §3.6 rule 1), and the canvas's events are byte-equal to the clerk's encoding of the same words (T101-3); an `assign`, and a `rejectSite` whose re-placement no plot satisfies inside the hard rows, render `refuse.assignment.noSite` with the `moveTo` places marked, and **Put it at {site}** previews `ok` or a new bend on the first `moveTo` target; every `show` `arg`, `subject` and `page` template of a fixture row finds its argument in the dry run's `MsgRef` — the arguments the text does not show among them (`thing`, `building`, `crypt`, `layer`, `layerId`) — and every `commit` button of a fixture row, from each source and each event form it names, previews `ok` or a new bend with exactly the events V09 §4.9's forms state | M2a, M3a |
| T-V9-14 | no dead ends | 1 000 random gestures (a random tool mode, random points in the frame) on B-CITY-lite seeds: 0 end with neither a ghost nor a refusal card; 0 uncaught errors | M3a |
| T-V9-15 | the words | every code the engine can emit (the enums of §5.2, §11.2, §6.4's conditions, V08's port notes, V04's causes and `blockedBy`, V03 §2.3's `PlanReport.warnings` codes by their `report.plan.<code>` rows) has a catalogue row; a delete of `era`'s default row `c14` from the tables editor shows `refuse.table.required` (V11 §4.1); every V11 §2.3 `FindGroup` has its `find.group.<key>` row, every `DamageElementKind` of V11 §2.8d reaches an `info.damage.<kind>` row by V03 §4.6's mapping and every `AppPrefs.resolution` value its `settings.resolution.<level>` row; every event kind of the base and the volumes has a history template, and each item-110 variant one by its discriminating field (V09 §4.10), `history.dossierFacts.creation` among them; every `ReportEntry.kind` (with `disruption`'s two forms and `works`'s three ops) has its `report.moved.<kind>` row and every `GenerationReport.dossier` state its `report.dossier.<state>` row, and F-EDIT's kept assignment case its `refuse.assignment.noSite` row; every key §7.1's dry-run outcome table names has its row, and every `bend.*` and `refuse.*` row names a producer that exists — an outcome row of §7.1 naming its key (a volume's bend under its last row, by the volume section the row cites), or a gate V09 §4.9's lead lists (E-07); every term `FieldDrivers.terms` can name has its `why.driver.<driver>` row, every registered `StageDecl` resolves to a `progress.stage.<group>` row (V09 §4.21.9; a tail stage to `below`, S15 to `people`) and every wait of V09 §4.21.9 (1), Go back to here among them, to its `progress.<wait>` row, and every `Enceinte.condition` value has its `legend.wall.<state>` row; every row ≤ 25 words, Flesch–Kincaid grade ≤ 8 by our own script, and free of "error", "invalid", "conflict", `E_…` patterns and ids; the same readability step runs over the rendered V10 refusal and critique templates and V11's `says` and `reason` sentences, and a failure is reported to that volume's table; every key of V09 §4.9's explanation families — `critique.K1`–`K18`, `refuse.clerk.*` (one per `RefusalCategory` value but `lock`, `rule` and `role`, the `key` row's three verdicts and `refuse.clerk.dossier.count` among them), `clerk.notice`, `clerk.alt.*` (one per alternative of V10 §3.16's rows and per harness button V10 §2.6's `label` comment names), `clerk.view.cleared`, `clerk.applied`, `info.raised.<outcome>` for the ten outcomes, `info.under.*` with `info.under.cause.<rule>` per `AccessCause.rule`, `info.catacomb.*` per `source.kind`, state, burial-face outcome and `blockedBy` value, `info.crypt.*`, `kind.<registry kind>` per withheld kind — and `why.section.<kind>` per registered section has a row in every shipped locale (the walker T-V10-29 shares); `clerk.alt.*` has one row per key V10 §5.4's list of the drawer's keys names (`clerk.alt.stale.retry` among them); `info.copy.condensed` has its row, its text V06 §3.15.5's line; **the buttons**: every row that offers a button carries its `buttons` list in `en.json` and no locale file carries `buttons`, `tone` or `codes`; every button's `key` is a `button.*` row, and every `button.*` row is named by some row's list; every `commit` names a source (a `ConflictAction` kind, `alternatives` with an `each` row, `unplaced`, or `event` with a form of V09 §4.9's event forms), every `tool` button a `ToolId` and a `ToolModeRow.id` of that tool in `toolkit.json`, every `app` button an `AppCommand` of V09 §4.9's list; every `refuse.*` row of V09 §4.9's table ends with `button.showWhy`; no `bend.*` row and no `refuse.*` row whose codes a dry run answers carries an `app` button; and each `ConflictAction` kind a `commit` carries has its `msg.key` equal to that button's `key` | M1 on |
| T-V9-16 | history and restore | a 300-edit scripted session: "Go back to here" at 5 random points gives the model digest of a replay of the log prefix to that point; "Undo going back" restores the head's digest; "Open a copy from here" gives a document whose digest equals the prefix's | M2a (go back), M6-E (copy, with V06's E6) |
| T-V9-17 | autosave and crash recovery | 50 trials of a 200-edit session killed at a random commit, each after the worker's commit and before the journal's `done` write: the reopened town's digest equals the last committed head in 50 of 50; 10 trials killed between a fates-sheet `confirm` and its `done` write recover the confirmed action; a corrupted journal entry stops recovery before it with `error.recoveryPartial`; a 100-epoch advance killed after its last epoch and before compaction, one killed mid-group and one stopped at epoch 40 and killed before compaction each reopen at the journalled head — the first and the third at their `logHeadAfter` (the third re-issued with `stopAfter: 40`), the second with the advance re-issued whole — and an advance stopped after its first epoch and killed before compaction reopens at its `logHeadAfter` (`stopAfter: 1`); no epoch lost and no recovery line shown | M2a; the advance clauses at M6-E (with V06's advance) |
| T-V9-18 | the draft mirror | a crash mid-quarter reopens with the offer; accepting restores the draft's points and params exactly | M3a |
| T-V9-19 | exports | every tab's every format writes a file on B-CITY-lite TOWN and CITY; the estimate within ± 30 % of the actual size; the model digest and log unchanged by any export; a `public` picture holds no withheld name in its text, `aria-label`s or metadata; the VTT file carries open windows, alpha-first colours, the grid first in the Foundry scene and, when asked, the `{cols}x{rows}` picture | M3b |
| T-V9-20 | share | each of §6.4's refusal conditions shows its `share.*` row and offers the file; an allowed town's link rebuilds the session's digest | M3a |
| T-V9-21 | accessibility | axe-core: 0 serious or critical on every screen, panel, sheet, drawer and overlay state; the four first-five-minutes tasks and §13.4's scripted tasks completed keyboard-only; each preview announced once per settle; no focus trap — Tab past the last handle reaches the context panel, shift+Tab before the first returns to the map, Esc drops handle focus; 200 % UI scale with no loss of content | M1 (shell), M2a, M3a, M3b |
| T-V9-22 | touch and window sizes (takes T126-1's tablet half, T126-2 and T126-3, with V12 §3.15.16's fixtures on this harness) | on a coarse-pointer medium emulation every tool of V09 §4.12's list completes its canvas script with touch events, with `AppPrefs.touch.editFabric` on (T126-1); a long press opens the context menu; a second finger places freely; a window of 599 × 479 CSS px keeps the medium layout at 600 × 480 and the page scrolls, and the document, the view and the selection are byte-identical across a resize over the threshold (T126-2); a build-time scan finds no layout class but `wide` and `medium`, no tool greyed for its screen and no phone row in the catalogue (`refuse.phone` absent; T126-3) | M2a (T126-2, T126-3); M3a (every tool's touch script) |
| T-V9-23 | the shade view | on item 102 (g)'s island fixture ≥ 90 % of the island strip's cells draw in the two darkest steps; toggling the view changes no model digest; the legend lists only the steps drawn | M3b |
| T-V9-24 | links and link edits | a fixture with one bakery and two mills: Keep → a `siting.linkEdits` row `{ bindTo }` and the `links` query binds the kept mill; Cut → `{ avoid }` and the other mill serves; Stop buying → `{ cut: true }` and no link; Reset deletes the row and the nearest serves; each undo exact; the why card's links list the link; at `public` a concealed use's links are absent | M3a |
| T-V9-25 | siting overrides | the tannery kind's `nuisance` set to Ignore in its per-kind panel: a `siting.declared` row with `familyWeights.nuisance = 0` under the kind's key; the next placement's why card shows no nuisance bar; placed tanneries stay and are listed with the score they would gain (V11 §4.3); "Show better sites" lists ≤ 3; a relocation accepted and undone restores the digest | M3a |
| T-V9-26 | records | on B-DOSSIER-lite's fixtures, selecting a COUNT or GUILD record outlines exactly its `EntityCard.members` and the panel's count equals the model's | M3a |
| T-V9-27 | the clerk drawer | with a scripted test clerk (a `ClerkHandle` that emits fixed `TurnView`s): no proposal commits without Accept, or without apply-then-undo switched on; an accepted proposal carries `proposedBy: 'clerk'` and author `user`; every `ReplyBlock` kind renders and every `ClerkAction` kind runs its action; each turn shows its cost and the month's tally; the first opening shows the label, the notice and the key in that order; "Undo the assistant's last change" undoes exactly that group; a viewer sees no proposal; `AppPrefs` holds no clerk field; New topic closes the live segment (the next turn opens a new one); the key card shows each `setKey` verdict (`ok` closes it, `invalid`, `noCredit` and `noAccess` their sentence, `unchecked` its note); the settings list the defect records with Save as file and Clear; each `ClerkAction` kind is dispatched by V10 §2.6's table — the seven the application runs by the shell, `propose`, `undo` and `rebuild` through `run`; a `why` opens the card or page the canvas's **Show me why** opens for that row; every `action` button shows its `label`, a labelled `select` its label and an unlabelled one its ids' chips; a stale card shows `refuse.stale` with **Ask again**, a host's stale card without it; an applied card shows `clerk.applied`, a key change `clerk.view.cleared`, and a viewer's declaration `refuse.viewer`; a proposal card's effect lines carry **Show** only (V09 §4.11), and on a `source: 'host'` card the bends carry no actions and the card offers Accept, Drop and Why only (V10 §2.6); for every bend and refusal row of T-V9-13's fixture the drawer's card and the canvas's card carry the same buttons in the same order, both read from the row's `buttons` (`commit` → `propose` with the canvas's bytes, `why` → `why` opening the same card or page, `show` → `select` of the same ids, `tool` → `useTool` with the same `mode` and, for `subject`, the same ids, `drop` → **Drop**), with no `app` button on either; a `useTool` with a `mode` opens that tool in that mode on the mode's working layer with its `ids` selected (**Add a way down** opens T6 `place`'s `access` mode on Below); and a `fork` block, and a `rerun` block, whose seq lies below a rebased document's `base.seq` make a copy whose `forkedFrom.seq` is the earliest seq, its opening toast ending with `info.copy.condensed` (saved, in host mode, with `info.copy.saved` first) | M3a (scripted), M3c (V10's harness) |
| T-V9-28 | host mode is the same shell | `embed.html` with V08's `HostSlots` renders every screen of the standalone app except V08 §5.1's list (a DOM-structure diff against an allowlist); the allowlist also names the history panel's group "The party" — drawn from `HostSlots.historyLines` at the head of the All and SettlementForge filters only, newest first, **Show** only on a line with targets, no **Undo this** — and re-listed with the new key on a View as change: a spy on `list` sees every call carry `effectiveKey()`, and a line revealing one `local` and one `public` place draws, under "What anyone knows", naming the `public` place alone with **Show** on it alone, and both again when View as is cleared, each state read once the provider's `onChange` has fired for the new key (V08's per-key cache, J-V8.109), the same on "See what the players see" set and cleared — and the host rule for new documents: with `newDocuments: 'download'` each of Open a copy from here and Re-run from here (on a row, a chronicle row and a restore point), the drawer's `fork` and `rerun` and Enter's Same kind, new seed saves one `.plat` to the device whose model digest equals the standalone app's for the same action, leaves the frame's document and log head unchanged, writes no local store or recent entry and toasts `info.copy.saved`; with `'off'` none of those controls is in the DOM; **Start a new map from this** is absent in both; the file menu holds exactly Export skeleton, Rebuild around my drawings, Settings and About, Settings has no Storage section, and ctrl / cmd+O and ctrl / cmd+S do nothing (V09 §2.2's `fileMenu: false`) | M-SF (with V08's SF6; AP5b) |
| T-V9-29 | the first-five-minutes test (V09 §7.3) | §13.4's pass rule at both M3a sessions and at M3c's clerk session (T-V10-26); the M2a pipeline session recorded | M2a (pipeline), M3a (mid and exit), M3c (the clerk session) |
| T-V9-30 | the owner's UX sitting (V09 §7.4) | its pass rule, or its unrated rule applied | M2a (diagnostic), M3a, M3b |
| T-V9-31 | the known-city fixture authored through the canvas (V09 §7.2) | its bars (a)–(e), with item 110's rows on (its bridge fortress with its deck plots; the raised ways the city rules add listed in its report) | M3a |
| T-V9-32 | help coverage | every tool, mode, parameter and panel control has its `@plat/docs` anchor; every tool's guide page is generated from `toolkit.json`; every catalogue row whose **Show me why** resolves to a page by V10 §3.5 step 3's target rule — every `bend.*`, `info.*` and `error.*` row that offers it, and every `refuse.*` row with no admitted address argument — has its anchor `messages#<key>`, and every staged layer §7.3 item 9 (d)'s F-EDIT can name has its page `staged/<layerId>` | M3b |
| T-V9-33 | hidden caves and ruins (item 109 (j) (2)) | on a fixture with a sealed cavern and a sealed ruin: at `public` and `local` no sealed element is drawn, labelled, listed, answered by `why` (an unknown address) or present in any export, and the toggle is absent; at `secret` with the toggle on every element V04 records `unexcavated` draws in the unexcavated style, and with it off none does; "View as: what anyone knows" hides the toggle | M6-U (with V04's U3b) |
| T-V9-34 | the catacomb panels (item 109 (k)) | on B-CITY and a METROPOLIS fixture every catacomb panel's extent, state words, fill, rank, count sentence and source equal V04's `CatacombComplex` and V04's count; across a scripted 10-epoch sequence the extent chart never falls; every church's Below line equals its `Basement.crypt`, and every cathedral shows a crypt, the largest | M6-U |
| T-V9-35 | the catacomb bends (item 109 (k), R2) | each of the bends (a)–(d) and both crypt bends (e) of V09 §4.17.5 fires on a scripted gesture, shows its row with its offer and commits the stated events; a chamber drawn inside a church without a basement yields a crypt-only basement with the drawn ring, and its undo restores the document byte for byte; none is refused; no system chip entry and no panel ever presents a catacomb sourced at a church building | M6-U |
| T-V9-36 | ruins drawn and drawable (item 109 (g), (h)) | a chamber drawn with the system chip on a ruin commits `drawChamber { system: <the ruin> }` and draws in the ruin program; "New ruin" commits the closure creating the system; the legend shows "Ruins of an older town"; T10 `hold`'s "this system" re-makes only that system | M6-U |
| T-V9-37 | ways down and their causes (item 109 (j) (3), (3b)) | on fixtures holding one access of each `cause.rule`, each panel line equals its catalogue row for that cause and its symbol differs by cause; "Show the way in" highlights exactly the connection graph's path; every access edit of V09 §4.3 commits its event and undoes exactly | M6-U |
| T-V9-38 | dwellings only after a way in (item 109 (j) (4)) | 0 dwellings in an `unexcavated` cluster after every declaration of a 200-gesture script; every dwelling declaration on a sealed void either commits with its access in one group (dug, else an opening, else a shaft from the public ground over it) or is bent above ground by `bend.under.noAccess`, with its alternatives; on a fixture with three buildings qualifying by step 1, the dug-access bend lists the other two in `PreviewResult.alternatives`, **Use another building** re-previews `[addUndergroundAccess { building }, the declaration]` from each in step 1's order with the access reaching the cluster and no second access, and is not shown after the last; an opening's bend offers no building | M6-U |
| T-V9-39 | View as is a filter | with "View as: what anyone knows" on, compaction, ctrl / cmd+S and "Download all my towns" succeed, no withheld name reaches the DOM, a picture export defaults to `public`, and the `knowledge` key is unchanged | M3a |
| T-V9-40 | the assistant's screens (V10) | with V10's harness on cassettes: the import dialog lists every prefix outcome and every critique finding with Show and Fix, and "Check with the assistant" starts the `critique` route; "Ask the assistant" on a why card starts the `why` route with the answer attached; a creation proposal shows its scratch read-only under the banner, and Accept opens the new document beside the current one — from the untouched empty-state town it replaces that town, and Recent towns gains no entry for it (J-V9.127); the transcript exports as V10's JSON; a host `clerk.config` of `off` or `host` shows no Assistant button and no message box (a host's proposal then opens the card-only drawer, T-V9-64); **How do I …?** in the drawer's menu and in Help sends on the `help` entry and its answer's `useTool` button makes that tool active, and **Ask the assistant to place these** under T7 `roster`'s box sends the pasted text on the `roster` entry, neither shown with no clerk configured or with the clerk off; with **no clerk configured** (`ShellConfig.clerk` null) the import dialog still lists every finding, its **Fix** on a `propose` fix previews the events as a ghost with Accept and commits them as one group with no `proposedBy`, a `useTool` fix makes the tool active, and `ClerkHandle.run` is never called — the same with a clerk mounted; **Start a new map from this** in the drawer's menu (standalone) sends the next message with `attach.newMap: true`, its proposal previews as a creation proposal under the banner, and Accept opens the new document beside the current one, which stays unchanged; in host mode that item is absent, no turn enters creation mode, and the drawer's `fork` and `rerun` buttons follow `newDocuments` as T-V9-28 states; in host mode with `clerkMode: 'builtin'`, a scripted `key` refusal and a scripted `budget` refusal each show the card's `openSettings` button, which opens Settings at its Assistant section with the fields the host forces locked under `host.locked` ("Set by SettlementForge") | M3c (the host clauses on T-V9-64's scripted host page); M-SF (the host clauses again on V08's embed, AP5b) |
| T-V9-41 | V06's screens | "Re-run from here" gives V06's `rerunFrom` document and leaves the current one unchanged; `chronicle.csv` and `uses-history.csv` equal V06's writers' output; the animated history stays ≤ 100 MB by stride doubling; a skeleton with a `history` block reports it at import | M6-E (with V06's E6) |
| T-V9-42 | V02's handles | on a composed building each handle kind (range end and width, tower centre and radius, room extent) emits V02's event and each stepper and chip its event; the family strip shows one thumbnail per feasible family within V09 §6.1's row, and a tap commits `setMassing` | M6c (with V02) |
| T-V9-43 | shade strips and the circuit | the Shade view draws V05's strip and pending rows for every island with their legend entries; "Update shade now" clears the pending line; with "Show the whole circuit" on, every barrier arc of item 106 (h)'s fixtures draws after commit in the town and the village products | M3b; the staged layers' milestones |
| T-V9-44 | base edits reached (MFCG's asks, FTG) | a scripted count: each of §7.4's thirteen MFCG asks and FTG's drawn river, tree brush and land-use painting is reached in ≤ 3 actions from the rail or a panel, commits its event (castle `site` and `baileyArea`, `setAttrMany` of land use, way `split` and `merge`, a district-keyed thematic `setStyle`, an `instance` group, `rejectSite` lift, `placeAt` lift, `unassign`, `drawWater { kind, add: [], line, widthCm }`) and undoes exactly | M3a |
| T-V9-45 | view keys, notes, pins and the ruler | each control of V09 §4.19 writes its key, which survives save and reload and never enters a digest; the per-viewer keys never cross a bridge; §13.4's "measure a street with the ruler" passes; "Save as annotation" writes a pin | M3b |
| T-V9-46 | people and the family tree | the People panel's filters equal the `people` query's rows; the family tree matches §14's layout rules (generations in rows, elision beyond two, re-root) and is keyboard-operable; opening a person pins nothing; "Where is" draws the `whereIs` answer | M4b |
| T-V9-47 | METROPOLIS costs | the link cache's full bind ≤ 120 ms and a scoped re-bind ≤ 5 ms; a compaction never starts while a draft is pending; the shade sampler within its law or its fallback applied; T1 `intend`'s and T12 `dress`'s METROPOLIS rows of V09 §6.1 | M2a (compaction, AP2), M3a (links, AP3, where the link view is built), M3b (shade, AP4) |
| T-V9-48 | a clerk's alternatives | each variation of a scripted proposal is previewed by its own call and thumbnailed from that preview; the tray shows V10's labels; one ghost at a time | M3a (scripted) |
| T-V9-49 | nothing is lost by deleting | a deleted town is in Recently deleted with its snapshot and journal for 30 days, Restore reopens it at its last head, and the storage ladder never purges it without asking | M2a |
| T-V9-50 | the context menu | right-click, a long press, Shift+F10 and the Menu key open the same menu on every entity kind, generated from the registry, each item producing the panel control's event | M2a |
| T-V9-51 | item 110's tools (V09 §4.20.1–V09 §4.20.6) | each gesture — Retaining wall (both high sides, open and closed), Terrace and its level handle, Raised, Aqueduct, a deck stamp, a landmark slot, a span's use, a crossing's form, the deck height and arch spacing, the per-tier storey stepper — previews, commits file f item 362's or file f item 364's events in one group, and undoes byte for byte | M3a (tier count, step, stairs and top: T-V9-59) |
| T-V9-52 | raised ways on the canvas | 0 junctions between a raised part and every way it crosses; no crossed way split; both ends on ground vertices, an end released elsewhere bent to one; a raised road meeting a town wall comes down before it and passes its gate; an aqueduct passes a wall by an arch, never a gate; an aqueduct from a lower source is bent to the nearest higher source, else to a well at the terminal (J-VI.4 (h)); a raised stroke to an island's rim commits 0 ways and one sky access, and an aqueduct stroke to a rim ends at its last ground vertex outside the island (J-VI.4 (d)); a raised stroke across a hoist's column or rope line with no re-route ends at its last ground vertex before it, with `bend.raised.skyAccess` (J-VI.4 (f)) | M3a (the island case with the sky's milestone) |
| T-V9-53 | a suppression holds | a generated raised way removed on the canvas stays removed after Regenerate, a scoped New random over every district it crossed, a reload through crash recovery and ten epochs with V06's pass; "Undo this" brings it back with its ids; its card and row show `info.remove.holds`; the same holds for every kind file f item 260 suppresses on the fixture — a harbour-mouth chain, a quay wall, a generated retaining wall, a generated deck plot and a floating island; with a later edit making Undo this dependent, each removal row's **Build it again** and `ClerkMount.rebuildEvents(seq)` for the same group return byte-equal event lists (canonical CBOR), those of V09 §4.20.3 (4)'s row for the kind, and committing them re-creates the thing as declared | M3a; the epochs M6-E (with V06's E6); the island with volume 5's sky milestone |
| T-V9-54 | retaining walls and terraces | every way crossing one is a stair or a ramp in the ghost and in the committed model, the bend line naming the dry run's form; a wall drawn on flat ground bends by V09 §4.20.1 (3) (a) or (b), and 0 retaining walls stand on flat ground after any script; a terrace is one group and one undo step; a level-handle change leaves no wall of the old step | M3a |
| T-V9-55 | decks | a stamp on a deck lies inside its deck plot and within the budget's band; a refused class bends to the landward end; storeys above `maxFloors` bend; a tower or fort stamp on a mole's head, mid-mole or the mid-span of a bridge at least V11's `deck.landmarks/bridgeMid/minSpanM` long lands on the slot; a removed deck's buildings are listed among the effects; T4 `road`'s pier, quay and bridge ghosts show their deck plots | M3a |
| T-V9-56 | the second known-city fixture (V09 §7.2) | its bars (a)–(e) and its emulation variant | M3a |
| T-V9-57 | the no-op pin on the canvas | with V11 §3.24.0's item-110 switches off, fixture 1's canvas script yields the model digest it yielded before item 110 — a `NoOpPin` registration of the known-city canvas scripts (V09 §7.2) as a suite of V12 §2.13's `item110.raised`, `.terrace`, `.deck` and `.stepped` pins on V12 §3.7.8's engine, owner V09, written by the M3a seat; with only the raised-way rows on, every TOWN-rung canvas script is byte-identical | M3a |
| T-V9-58 | the hit stack (V09 §4.20.8) | on a viaduct over a street with a walled-up span: successive clicks select the deck, the span, the arch vault and the street, then the deck again; the context menu lists the others; a tap cycles the same; T11 `name`'s second click names the street; `hint.below` shows once; each answer ≤ 1 ms | M3a |
| T-V9-59 | tier controls (V09 §4.20.5) | on a stepped temple each control emits V02's event (the count, `insetCm` by the step handle snapped to 10 cm, the stairs, the top, the stair width, a tier's heights); each of V02 §1b's bends shows its V09 §4.9 row, the bent result pre-selected, with its alternative (J-VI.4 (i)), and each alternative's preview is `ok` or a bend; the shape, skirt and solid chips and the centre, radius and shrine-inset handles emit V02 §4.6 (1)'s `tiers` fields; undo exact | M6c (with V02) |
| T-V9-60 | effects (V09 §4.20.7) | on scripted fixtures — a viaduct's removal (`rerouted`, `removed` vaults with a drawn plan), an aqueduct's removal (`lost`), a deck's removal (`removed`), a terrace (`rebuilt`, `displaced`), a Re-derive to CITY (`added`) — every effect kind appears in the preview's `effects`, in the fates sheet's "What else changes" and on the clerk's card; the live region reads the first three; the list caps at §11.2's cap with `effectsMore`; the clerk's card draws each effect line with Show only | M3a |
| T-V9-61 | item 110 in the exports (file f item 447) | on the second fixture every retaining wall, raised way, span, arch vault and deck plot appears in each format as file f item 447 (a)–(d) state; the ground scene has 0 portals where a raised way crosses a street; each deck scene's grid aligns at 0 px per cell (O11 (g)); the 3-D file holds one deck mesh per raised way and one wall mesh per retaining wall | M3b |
| T-V9-62 | removals in the skeleton (file f item 455) | on the second fixture, one generated raised way removed, the skeleton exported and opened with the same seed: the way stays removed and the digest equals the document's; under another seed the import dialog shows *kept removed* or *nothing to remove*, never an error | M3a |
| T-V9-63 | Keep them as yours (V09 §4.20.3 (7)) | a CITY fixture with two generated raised ways re-derived at TOWN lists both among the effects; with the box checked both stand as declared ways and one undo restores the city; unchecked, none stands | M3a |
| T-V9-64 | the card-only drawer and the host channel | in host mode — at M3c on the application harness's scripted host page, a test-only page that loads the shell in host mode and fills `ClerkMount.host` and `HostSlots` over §11.3's bridge as a host would (the harness side T-V10-20 drives), and at M-SF on V08's `embed.html` with its host harness: before any `clerk.config` (mode `off`) and under `host` no Assistant button shows; a `preview { events, view: true, proposal }` opens the drawer with that card alone — the AI mark naming `hostName`, no message box, menu, settings or meter, no Ask again; Accept commits one group with `proposedBy: 'clerk'` and the host receives `clerk.proposal { status: 'accepted', seqs }`; Drop answers `dropped`; a newer proposal replaces the card and answers the older one `dropped`; a moved head answers `stale`; a viewer's `preview` is refused; the harness reads the transport only through `ClerkMount.host.config()`, a refresh arrives through `onConfig` after `needsToken()`, a transport off the allowlist is answered by `refused('origin')`; no token appears in any store, log or report | M3c (with V10's C5, on the scripted host page); M-SF (on V08's embed, AP5b) |
| T-V9-65 | why sections | on fixtures holding a catacomb under a churchyard, a cathedral with its crypt, a sealed deep cavern, a generated viaduct, a stepped temple and a building with a drawn plan: each why card draws every section of its `WhyAnswer` after the facts, in the providers' order, titled by `why.section.<kind>`, each row's `says` rendered, values in the chosen units, targets clickable; a withheld row reads the unknown-place line; the catacomb's panel, the church's crypt line, the void's sealed line and the raised way's panel reason render the same `MsgRef` as the card (compared row by row); a raised way's `decidedBy` row is not drawn twice | M3a (scripted rows); M6-U, M6c (live providers) |
| T-V9-66 | View as reaches every read | on T-V10-6's canary fixture (`local`, `secret`, concealed and unexcavated places named with unique canary strings): with View as "What anyone knows", no canary appears in the why card (a withheld target reads the unknown-place line), the source chips, the gazetteer, "features in view", the Link card, the record panel, the People panel, "Where is" or T6 `place`'s alternative sites, and a spy on the facade finds every band-less `query` the shell sends carrying `admitAs: 'public'`; with a host-set key form `{ tier: 'public', places: [one secret place] }` that place's name shows in each and no other canary does, the menu reads "What the players know" with its other entries disabled, the View as banner is not drawn and the export dialog defaults to the form; clearing View as re-asks every open answer at the role's key without a reload (`onEffectiveKey`); the knowledge key and the document formats are unchanged throughout; the fates sheet of an edit made meanwhile lists every fate at the role's key (J-V9.86) | M3a (tiers, and the form set by the test harness through `setViewOpts`); M-SF (the form through V08's embed, SF6; AP5b) |
| T-V9-67 | the three load outcomes (V09 §3.14 (a)–(c)) | with test builds labelled o(N), o(N−1) and o(N−3) (§6.4's fixture labels): **(a)** a document saved at N−1 opens editable under its own version, an edit commits there, the standalone app shows `info.upgrade.offer`, **See what changes** shows §7.5's diff in the fates sheet and **Do it** commits one `upgrade` (the output version then N), **Not now** commits nothing; **(b)** a document at N−3 with `model` opens as the frozen view under `error.frozen` with the CLI command, no other edit accepted (view and export only, §2.9 step 2) and **Edit it with this version** the one edit control, which returns `confirm` with the renames in the fates sheet and on **Do it** commits one `rebase` with reason `frozenImport`, after which an edit commits under N; the same document with one chunk's bytes altered shows `error.frozen.damaged` and no Edit control; one naming a pack the build lacks shows `error.frozen.pack` after the attempt with nothing committed; **(c)** a document at N−3 without `model` shows `error.frozen.noModel`, and **Open its recipe with this version** opens a new document under `error.linkVersion` whose model digest equals the same recipe and log opened as a link, the town on screen unchanged; **host mode** (the embed, owner frame): the N−1 document shows no upgrade strip and no upgrade control but V08 §4.2's header **Update the map engine**, the banner slot draws no frozen-view notice, (b)'s **Edit it with this version** commits its `rebase` through `doc.changed` followed by `doc.snapshot`, (c)'s button saves one `.plat` to the device with `newDocuments: 'download'` and is absent with `'off'`; an editor's frame shows `error.frozen` without the Edit control | M3a (the standalone clauses); M-SF (the host clauses, on V08's embed with SF6; AP5b) |
| T-V9-68 | SettlementForge's chains in the Show menu | on `town-cc-1` or its test-side variant with one active custom chain (T-V8-25's variants), and on a variant whose every chain is inactive: the Show menu lists **SettlementForge's chains** on the first and not on the second; choosing it writes the per-viewer key `thematic: 'supplyChains'` and draws V08 §5.2's lines with the chain's label in the legend; under a key that withholds one of the chain's nodes the entry is absent; switching the view on and off changes no model digest and adds no log entry; a GeoJSON export while it is on carries V08's `supplyChain` LineString | M-SF (with V08's SF4 and SF6; AP5b) |
| T-V9-69 | the dossier groups and the standing notes | on `town-1`'s digest pairs through V08's embed (T-V8-14's pairs, an undated one among them): each committed absorb is one group headed `host.group.absorb` with `{n}` its ledger event's `changes` count and `{week}` its `absorbed` entry's week (`host.group.absorbUndated` on the undated pair); under it its dossier events in log order, each followed by one line per report entry of its `seq`, then one line per stored note of the ledger event with **Show** exactly where the note's `keys` bind an element (highlighting those addresses), then its epoch rows; the creation's prefix is headed "Made from SettlementForge's record" with its notes; on the variant whose absorb carries an epoch in which a removed raised way's reason fires again (V06's fixture for W60), that epoch row carries one `info.raised.suppressed` line with **Show** on the removed way's former outline; under View as "What anyone knows" a note line whose key binds a `local` or `secret` element is not drawn and returns when View as is cleared, and a report-entry line whose element is `secret` is drawn naming it by its `kind.<registry kind>` word with no **Show** on it — in the group and in the report panel's "What moved" alike — and names it again when View as is cleared; the group is listed under All and SettlementForge and absent under Mine and Assistant; the report panel lists `GenerationReport.dossier` by its `report.dossier.<state>` rows, then the standing notes under `host.group.standing`, one line per `GenerationReport.dossierNotes` entry; all of it the same in a second editor's frame and after a reload | M-SF (with V08's SF4 and SF6; AP5b) |
| T-V9-70 | the roster reader's namespaces (J-V9.125) | T7 `roster`'s pasted lines and T6 `place`'s typed words, read by V09 §4.16 (3): on a TOWN fixture "a smithy", "an inn" and "a church" resolve to `smithy`, `inn` and `church`, never to a `v.` class; on a VILLAGE fixture they resolve to `v.smithy`, `v.inn` and `v.parish_church`; "a chandler" at VILLAGE resolves to `v.shop`; a town-and-city class that plays itself at VILLAGE ("a pawnshop") resolves to itself; T6's stamp palette lists exactly the same set at each rung | M3a (the village rungs' clauses with V07's V-M2 rows) |
| T-V9-71 | the oasis (V09 §4.21.1; item 111) | on an arid and a temperate fixture: T2 `ground`'s Lake with **Spring-fed** on previews the water, the grove and the gardens with `info.oasis.badge`, commits `drawWater { kind: 'lake', add: [], from: { points: [p], levelCm, spring: true } }` byte-equal to V10's encoding of the same request (T101-3), and undoes the three in one step; the history row reads "Made an oasis at {place}"; the toggle is absent on Sky; a dossier `oasis_water` oasis shows the toggle locked, `info.oasis.dossier` on its why card and `refuse.dossierRemove` on Delete; a save, a reload, a Regenerate and an epoch keep a drawn oasis | M3a (M6-sky for the Sky clause) |
| T-V9-72 | colour vision, the second cues and the trial (V09 §4.21.2, V09 §7.6; item 112; takes T112-1's thematic-view clause and T112-2) | each **Colour vision** choice writes `cvdVariant` and the tiles and legend draw the sheet's checked variant; the key never crosses a bridge, never enters a digest and adds no log entry; `AppPrefs.cvdDefault` applies to a town with no value; every thematic view of V09 §5.4 at each variant passes T112-1's style check and each colour-coded meaning of V09 §5.4's cue column draws its second cue; a picture exported under a variant draws it and says so; the chrome's marks keep their words (axe-core's colour step and a greyscale capture of every screen); the trial's `TrialRecord` validates against its schema and its pass rule is computed as V09 §7.6 states | M3b (the view); the release gate (the trial, T112-2) |
| T-V9-73 | a town with a past (V09 §4.21.3, V09 §4.17.1; item 113) | T1 `intend`'s **History** "Once a city" on a VILLAGE fixture commits one `adjust` of the blueprint's `history` as a Re-derive from S0 with its whole-town ghost; the same recipe and history replay byte-identically on the three engines; the report panel's "What its past left" lists one line per `HistoryRecord` entry with Show; a symbolic peak's facts carry the "size not recorded" chip; a dossier history locks the chip with `info.history.fromRecord`; a void whose last open link is bricked reads `info.under.lost` at `secret` only, drawn in the unexcavated style, and loses the line when a way in reopens; the replay's wait shows the progress view and ends within item 119's comfort level as V06's part of the item applies it | M6-E (with V06's replay; the lost-void clauses with V04's U-ACCESS) |
| T-V9-74 | the wall's repair and states (V09 §4.21.4; item 114; takes T114-6's legend clause on the canvas) | on a fixture with a breached, a worn, a patched and a dismantled run: Repair with a patch row makes the breached run `patched` with that material, robust makes it `standing`; the worn and patched runs offer robust only; the dismantled run bends with `bend.wall.newStretch`; Wear on a standing run makes it `worn`; "Back in use" on a ring with nothing to lift shows `info.wall.inUse`; each commits V06 §2.8's event and undoes exactly; the run's panel line and the legend's `legend.wall.<state>` entries equal the model; every state stays distinguishable in a greyscale capture at the bands §8.2 states; the VTT tab shows `export.vtt.walls` | M2b (the legend); M3a (Repair with a material, Wear); M6-E (Back in use, the epoch lines) |
| T-V9-75 | a hand design beyond the grandeur ceiling (V09 §4.21.5; item 115; takes T115-3's hand form) | on THORP, HAMLET and VILLAGE fixtures: a T9 `shape` `U` plan, a court and a tower on a dwelling and a second manor by T6 `place` each commit as asked with `info.grand.beyondTier` on the badge, the card and the why card; the same edits at TOWN show no line; a dossier-bound manor record (V08 §3.16 (3)'s "specified") reads `info.grand.dossier`; a reshape back under the ceiling drops the line; the clerk's card for the same edit carries the line | M6 (with V02's ceiling rows; the VILLAGE clauses with V07's village rungs) |
| T-V9-76 | the zoom-out limit (V09 §4.21.6; items 116, 122 (i); takes T116-1's view-control clause) | at every rung from THORP to the cap: the wheel, pinch, − key and zoom button settle at §8.8's limit and never beyond; the button is disabled there with `info.zoom.limit`; Fit the town frames the bounds (a village at V07 §5.2's township view); the first view is unchanged; a hand edit growing the bounds moves the limit; the export's whole-town frame equals the bounds; at the METROPOLIS cap in windows of 1 280 × 720 and 600 × 480 CSS px the limit is stop 0 with `info.zoom.coarsest`; while a crisis look stands the opening view contains every camp, Fit frames the town and its camps and the limit is theirs with `info.zoom.limitCamps`, and when the crisis ends the limit is restored, a coarser view settling to it about its own centre and a moved view never re-framed (item 122 (i)) | the milestone §16's row for item 116 names; the crisis clauses at M3b (§16) |
| T-V9-77 | the season control and the week's fallback (V09 §4.21.7; items 117, 125; takes T117-6's season-control clause) | a dossier fixture opens on its latest stamped tick's week with **Follow SettlementForge** on; a slider move turns it off and turning it on restores the dossier's week; a standalone town opens at week 19 with no switch; the four chips set weeks 6, 19, 32, 45; the document's model digest is identical in all 52 weeks and no week change adds a log entry; a picture names its week; `snow` defaults on in a cold climate's snow weeks, and on an arid row the Weather control offers no `snow` and a carried `snow` draws `clear` (§8.2's snow rule); a dossier with no stamped tick opens on week 19 with the switch on and `view.season.noWeek`, and an absorb bringing a tick moves the week; the same dossier with and without a host context opens on the same week (item 125 (e)); a host's `view.set { week }` moves the drawn week and leaves the Season control and its switch unchanged (item 125 (c); §11.3); the re-skin stays within §12.5's budget | the milestone §16's row for item 117 names; the item-125 clauses at M-SF (§16) |
| T-V9-78 | the festival list (V09 §4.21.8; item 118; takes T118-2's festival-list clause) | a dossier with two festivals lists both with their weeks; with the switch on, decorations show exactly in their windows' weeks; **Preview** shows one out of its window until the switch is touched; "No decorations" draws none; a previewed festival removed by an absorb falls back to `follow`; standalone, the four generic festivals are listed; the model digest is identical with decorations on and off; a picture names the festival | the milestone §16's row for item 118 names (V08's `traditions` read at M-SF) |
| T-V9-79 | the progress view (V09 §4.21.9; item 119; takes T119-3) | for a generate, a Re-derive, an open from a file, an absorb, a 100-year advance, a history replay, a CITY PNG export and a migration at METROPOLIS's cap: a wait under 1 s shows no strip; a longer one shows it within one frame of 1 s, never an empty map region, naming each stage group in order and the wait's own line; a Go back to here of a few hundred edits at METROPOLIS shows the strip past 1 s with its `progress.undo` count; a stopped history-first generation shows `info.history.cancelled`, whose **Generate without its history** makes the town with `history.replay` false; pan and zoom keep §12.5's frame budget throughout; every one-time wait completes within §12's ten-second comfort level on the reference machine — a 100-year advance and a history-first generation in total (item 119 (a2)) — and where V06 §6.8 coarsened a run the line names the cadence chosen (", in {n}-year steps"), a coarsened catch-up's `progress.dossier` line too; an open's verification replay runs after the editable map, shown only as `progress.verify`; a stopped CITY PNG export and a stopped history-first generation end through their `signal` (§11.2); in host mode, on V08's host harness (the embed), a history-first creation from a dossier shows the strip with no **Stop**, its replay coarsened to fit the comfort level, and every editor's frame creates the identical document (T-V8-3); every registered `StageDecl` resolves to a group row, a tail stage to `below` | M3b (the strip); M6-E (the advance and the replay); M-SF (the host clause, on V08's embed) |
| T-V9-80 | the edge suite (V09 §3.16) | one scripted fixture per clause of V09 §3.16's table: each edge meets its stated outcome at its stated rung, with no uncaught error, no hang, no lost data and no whole-map retry | M3a, and at each later milestone for its rows |
| T-V9-81 | points in, shape out on the canvas (takes T101-7) | through the canvas script on §13.2's ridge fixture: T3 `wall`'s Draw wall from two points follows the ridge and closes when its ends meet; T5 `quarter`'s seed quarter never crosses a block and its boundary lies on street centre-lines, water, walls or ridges; T2 `ground`'s Lake at one point and a level has a shoreline equal to the terrain's contour at that level — each event the points form of V09 §4.5's mapper, byte-equal to the tool API's for the same points (T101-3) | M3a |
| T-V9-83 | Find (V09 §4.21.10; item 120; takes T120-2 – T120-5's interface clauses, with V12 §3.15.10's fixtures on this harness) | on the METROPOLIS-cap fixture, a dossier fixture and T-V9-66's canary fixture: (a) the panel lists what the gazetteer holds at the key — each kind's count equal to §11.2's class count, the dossier's names first, the empty box's grid under V11's nine groups — and nothing the town lacks; (b) "forge" and "smithy" suggest Blacksmith, "smith" offers each smith kind and "All smiths", "blacksmth" finds Blacksmith, a typo in a word of four letters is not forgiven, suggestions come grouped with counts, and ↑ ↓ Enter add a chip; (c) each chip's matches equal §11.2's match listing at the key (T120-2); (d) under a player view no canary appears in a suggestion, count, glow, pin or ghost pin (T120-3), and a chip the new key withholds reads `find.withheld`; (e) the chips survive every band and layer change and every commit, advance, undo, redo, regenerate, load and migration, a chip whose last match goes staying at count 0, dark, and lighting when a match returns (T120-4); at a scrubbed week before a matched building was built, and after a closed use's end, the match is neither drawn, pinned, counted nor listed, a chip with none there reads count 0 for that week with the chips unchanged, and the head's matches return at the head (§11.2's gazetteer `week`); (f) at the city band every match has a pin or a count bubble and every chip its glyph and dash, sixteen chips told apart in a greyscale capture (T120-5); (g) matches on Below and Sky show as ghost pins with "{n} more Below" and "{n} on Sky", **Go there** setting the working layer and `depthBand` or the island `key` (a hidden sky layer shown), and at the interior band `findRooms`' rooms glow with "{n} found"; (h) Show gaps draws V01's `gapUnits` dashed with "none here" and is disabled without a kind chip, and an older `thematic: 'coverage'` opens as Show gaps; (i) the document's hash, every digest and the log are unchanged by Find, and every chip off gives the tiles of Find off; (j) V10's `find` action's `set`, `add`, `remove`, `clear` and `gaps` set the panel as clicks do, and a host message sets no chip; (k) a picture export draws Find with the chips in the legend, a battle map leaves it off unless **Draw Find**; (l) at the cap with sixteen chips, suggestions ≈ 50 ms after a key and a glow ≈ 100 ms after a click (V09 §6.4; V12's T-V12-52 reports T120-6) | M5 (§16) |
| T-V9-84 | the resolution setting (V09 §4.21.11; item 121; takes T121-1, T121-4 and T121-7; T121-5's captures taken on this harness for V12) | a fresh install reads **Auto** (T121-1); each manual level draws at §8.8's tile DPR, or, on a device fixture whose memory cannot hold it, the nearest level that fits with `info.resolution.fallback`, never a refusal or a crash (T121-4); a level above the screen is greyed with "Your screen is {level}."; the chip reads "Auto · {level}" with its reason, or the manual level; a device-pixel-ratio change re-evaluates within one frame and the level changes only at the next settle (T121-7); labels, chrome and overlays at the device pixel ratio at every level; the document, its hash and an export byte-identical across every setting | M4 (§16) |
| T-V9-85 | crisis looks on screen (V09 §4.21.12; item 122 with (h)–(i); takes T122-2's interface clause, with V12 §3.15.12's fixtures on this harness) | standalone, **Preview a crisis** lists every look kind of §10.2's table and draws the picked one at `previewSeverity` in every week until the switch is touched, a previewed `disaster` look's **Show** framing the union of its units' `FindArea` shapes (V01 §5.4 (6)); on a dossier fixture with a siege of two armies, a refugee wave and a plague: each look shows exactly in its condition's weeks (T122-2); the why lines read "{look}: {condition}, weeks {a}–{b}"; the crisis card gives "about {n} besiegers, two armies" from the dossier's sizes and, for a force beyond the frame and its margin, `info.crisis.massed`; Find's `crises` section lists the three looks; under a player view a none-row condition carried beside the three looks (an infiltrated stressor) is named in no line, card or count at public, and only at secret (DR44); **Show crises** off draws none; the document's hash and every digest are identical with the switch on and off and in every week; a picture names the looks and a battle map draws them in the image only; while a look stands the opening view contains every camp and the limit is the bounds of town and camps (with T-V9-76) | M3b (the switch and the preview); M-SF (the dossier's looks and their numbers) (§16) |
| T-V9-86 | a ruined building's damage lines (V09 §4.21.13; item 123) | on V03's damage fixtures — an `abandoned`, a `decayed` and a `ruined` building, a restored one with patches, a never-decayed one and a ruined church with its crypt: the plan panel and the why card's `plan` section show one line per damaged line kind present at the building's level by §6.3 *Plan damage*'s comparison, in `info.damage.*`'s order, three rooms and then "and {n} more"; a never-decayed building shows none, with a kind's range edited to start at 0 as well; a higher level's lines are a superset of a lower's; a restored building's lines leave in reverse threshold order under `info.damage.head.restored`, with `info.damage.patched`; a building in a district a disaster look ruins shows the look's lines under `info.crisis.ruinedFor` in the plan panel, the why card's `plan` section the own level's rows only, its ids and digests unchanged; under View as on a ruined building the key withholds, the lines naming rooms (`roofBay`, `floor`, `partition`, `furniture`, `unsafe`) and the `crypt` line are not drawn while the head line, `storeyGone`, `outerWall`, `door`, `window`, `stair` and `cellar` are, and no room the key does not admit is named; volume 10's explanation of each fixture building renders the same `info.damage.*` rows at the building's own level, and for the building in the disaster's district names the look by `info.crisis.*` (V10 §3.23 C10) | the later of V03's damaged-plan step and M3b; the decay levels at M6-E (§16) |
| T-V9-87 | weather effects (V09 §4.21.14; item 124; takes T124-5, with V12 §3.15.14's fixtures on this harness) | on a fresh device fixture the switch reads on at the mid, high and ultra tiers and off on the low tier and under reduced motion (T124-5); a user's choice holds over the default and Reset restores it; **Start a shower now** starts a spell of the commonest kind live at that moment for the climate row — heat shimmer in an arid row's dry weeks, rain and never snow where winter does not freeze — and at a moment with no live kind the button is disabled with `settings.weather.noneNow` and starts none (V11 §3.25.11; T-V11-48); the timeline replays from its session seed, clock and presses; the Light group's **Weather** offers no `snow` on an arid row and a carried `snow` draws `clear`; the document's hash and every tile are unchanged by the switch, a spell and the button; a picture export draws no effect | M3b (§16) |
| T-V9-82 | a canvas-declared subset round trip (takes T101-4 on the canvas) | the documents of the known-city canvas scripts (V09 §7.2) and the declared subset of a scripted B-CITY-lite session, each exported by Export skeleton (V09 §3.12) and re-imported under its seed, reproduce the document's model digest — an author's removals kept (file f item 455) | M3a |

### 7.2 The known-city fixture, authored through the canvas

J78 and item 101 (e) make an ORIGINAL skeleton with the structure of the owner's reference city the acceptance fixture of
the toolkit, authored three ways that must agree (§13.2's T101 bars). This volume owns the "by hand" way. The fixture's
structure (our own names, nothing traced; `research/reference-maps/baldurs-gate/README.md` is study-only): a walled upper
town with a citadel on a bluff; a walled lower port sloping to a harbour with piers; unwalled outer sprawl along three
roads; a hill inside the extent; cliffs with a cliffside cemetery; a satellite quarter across the river; a fortress on a
bridge (with its deck plots, item 110 (d); V09 §4.20.4 (7)); two enceintes with nine gates; three region labels (upper, lower, outer);
about fourteen declared quarters (a temple quarter, a manor quarter, a harbour quarter, an enclave, a graveyard …); about
sixty named places with landmark leader lines; the two looks, ink and quarter-tinted. Its inputs live in
`plat/tests/fixtures/known-city/K1/` and its goldens under `plat/goldens/known/K1/` (J-V12.58).

**The canvas script** is written once from the fixture's written brief as gestures (T1 `intend`: the `citadel-and-port` form, CITY,
coast; T2 `ground`: the bluff, the hill and the cliffs by strokes, the river by source and mouth, the harbour by shore point and
size; T3 `wall`: two walls by points, nine gates; T4 `road`: the three roads, the bridge, the piers; T5 `quarter`: the quarters by seeds and
corners with their kinds and names; T7 `roster`: the sixty places as one pasted roster; T6 `place`: the ten landmarks that need an exact
plot by stamp, the fortress among them on the bridge's mid-span slot (V09 §4.20.4 (7)); T11 `name`: three region groups and the leader-line switch; T12 `dress`: the tint). Bars:

* (a) as T101-6 states it: the script's final model digest equals the skeleton file's, and the clerk's path — at M3a a
  scripted transcript of tool-API calls, from M3c V10's cassette — meets the fixture's structure list (J78 (e); J-V9.50);
* (b) it plays within 10 minutes on the reference machine, every gesture's stop-to-ghost within V09 §6.1's budgets;
* (c) every gesture's preview is `ok` or bent — 0 refusals — and the script needs ≤ 250 gestures;
* (d) both looks pass B-ZOOM's legibility floors (§13.4);
* (e) **the dedicated-user bar**: a person of the program who has not seen the script rebuilds the fixture by hand from its
  written brief in ≤ 90 minutes, and the fixture's structural checklist holds on the result (two enceintes, nine gates,
  three regions, every named place present and in its region, the bridge fortress, the cemetery on the cliff, the
  satellite across the river) — the owner's "a dedicated user can build it" measured.

**The emulation variant**: the same brief declared only through the L2 PROGRAMME layer (intent, bones, programme; no
fabric) — the checklist holds and the rules fill the rest.

**Fixture 1 with item 110's rows on.** Its brief keeps its bridge fortress, now on a deck with plots; at CITY the rules may
raise a way the site calls for, which the fixture's report lists with its reason; bars (a)–(e) and the checklist are re-run
and unchanged in kind. **The behaviour shift, recorded once** (item 110): with the raised-way rows on, a
CITY or METROPOLIS canvas script's digest may change, because the rules now raise ways there by themselves; with the
terrace, raised-way and deck-plot rows off, every canvas script is byte-identical to its pre-item-110 digest (T-V9-57). No
golden is re-recorded without naming this cause.

**The second fixture (item 110 (e); J114)** — beside the first, at M3a, authored both ways (the skeleton file, and by hand
through the canvas) with the same bars. This volume names no reference map, city or ward: the brief, the canvas script
and the skeleton are the program's own, under our own names, and live in the test tree at
`plat/tests/fixtures/known-city/K2/` (`brief.md`, `canvas.json`, `skeleton.plat`; J-V12.58), never under
`research/reference-maps/`.
* **The brief** (its structure is item 110 (e)'s; the names are ours): a port city on a headland with the sea on three
  sides; a landward curtain with towers, anchored on the sea at both ends, and a gate plaza; an enclosed harbour behind a
  mole, with a tower at mid-mole and a fort at the mole's head; a causeway from the mole to a rocky islet with a
  lighthouse; a second, open anchorage of jetties with small buildings on them; three or more terraced wards bounded by
  inner walls, with retaining walls along their terraces; ring streets round two precincts; a straight raised road
  crossing the streets below; a ravine of stepped housing; a stepped temple; an arena; six named wards with curved labels
  (Gate Ward, Upper Terrace, Middle Terrace, Lower Terrace, Ravine Ward, Harbour Ward).
* **The canvas script** (V09 §3.12's form): T1 `intend` (a coastal site, CITY); T2 `ground` (the hills, the ravine, the islet by water paint,
  the harbour basin by shore point and size; the terraces by Terrace strokes, V09 §4.20.1); T3 `wall` (the landward wall as an open
  chain anchored on the shore at both ends, item 106's barrier closure; the inner walls; the retaining walls by the
  Retaining wall mode); T4 `road` (the mole and the jetties as `pier` lines, the causeway, the ring streets, the raised road with
  Raised on); T5 `quarter` (the six wards by seeds and corners, the ravine quarter with volume 1's stepped fabric); T6 `place` (the mid-mole
  tower and the mouth fort on the mole's landmark slots, the lighthouse, the stepped temple by its class stamp — volume
  11's specialisation, V02 X17 — the arena, the precincts; the deck buildings are left to the rules); T11 `name` (the six
  labels); T12 `dress` (the tint). At M3a no tier control is needed (V09 §4.20.5 (2)).
* **Bars**, as the first fixture's: (a) as T101-6 — the script's final model digest equals the skeleton file's, and the
  clerk's path meets the structure list; (b) it plays within 10 minutes, every gesture within V09 §6.1's budgets; (c) every
  preview `ok` or bent, 0 refusals, ≤ 250 gestures; (d) both looks pass B-ZOOM's legibility floors; (e) a person of the
  program who has not seen the script rebuilds it by hand from the brief in ≤ 90 minutes, and V12 §3.14's K2 structure
  list holds, its thresholds V12's: the landward wall's two sea anchors and its gate plaza; the mole with its mid-mole tower
  and its mouth fort; the causeway and the lighthouse; the jetties outside the basin with deck buildings (K2-4: at least
  eight jetties, deck buildings on at least four); at least three terraced wards with inner walls and at least
  ten retaining walls, every way crossing one a stair or a ramp; ring streets round two precincts; the raised road crossing
  at least two ways with no junction; the ravine quarter; the stepped temple with at least four tiers; the arena; six
  named wards. **The emulation variant:** the brief declared only through the L2 PROGRAMME layer; the checklist holds and
  the rules fill the rest.
* The second fixture's own golden and model bars are volume 12's (V02 X25; its goldens under `plat/goldens/known/K2/`,
  its record `fixture.json` there, which V10's evaluation group A reads); this volume's bar is T-V9-56, with T-V9-61 and
  T-V9-62 run on it.

### 7.3 The first-five-minutes protocol, operationally

§13.4 states the test, its pass rule and its fallbacks; this is how it is run.
1. **When and what build.** The four tasks need T5 `quarter`'s and T6 `place`'s events, which §16 builds at M3a (drawn boundaries,
   post-build assignments, positive placement and the solver), so the four-task sessions run inside M3a — the first on its
   midpoint build, once those events have landed, the second at its exit — and the M2a exit holds a **pipeline session**
   instead: three to five participants, recorded and not gating, on the tasks the M2a build can express — a New random on a scope
   that keeps a locked thing (T10 `hold`), a shape task ("make this house one storey taller, then split this plot", T9 `shape`), going back
   in the history, and adding a compass — its findings feeding AP3 (file f item 494; J-V9.15). The dress task's style change has
   `ink` and `lit` to choose from at M3a (`lit` ships at M2b). **At M3c's exit** a clerk session (§13.4): five participants
   on the same terms, the built-in clerk connected, each asking it for "a walled harbour town with a temple quarter" and
   making one follow-up change (T-V10-26), timed and recorded as below; its result is an exit criterion of M3c's
   `MilestoneRecord`, written to `plat/goldens/ux/M3c/f5.json`.
2. **Participants.** Five SettlementForge users per round (within §13.4's five to eight), recruited from its existing
   community, thanked by credit and early access, no payments (J122), each: runs tabletop games, has used a map tool
   casually, does not program for a living, has never seen the editor, and was not in an earlier session. Two per session
   work on a tablet (§13.4's touch question). The build they use is on SettlementForge's staging host (J121; V09 §11 Q1).
3. **Setup.** A generated TOWN at a seed from `H32("f5/<milestone>/<participant>")` (§13.6's `H32`), the empty state
   dismissed, no clerk but in M3c's clerk session; the reference laptop with a mouse, or a 10–11 inch tablet.
4. **Tasks**, read from cards, in this order, with no help: *quarter* — "Make a temple quarter called {name} next to the
   market."; *place* — "Put a tavern called {name} near the {gate}."; *dress* — "Make the map look like {style} and add a
   compass."; *re-roll* — "You don't like the houses in this block" (the observer points) "— get a different version, but
   keep your quarter and tavern." Five minutes from the first touch for all four.
5. **Observation.** One observer per participant records per task: completed, seconds, the step where stuck, notes; then
   asks two questions: "Did anything change that you expected to stay, or stay that you expected to change?" (§13.4's
   declared-means-held question) and, where a clerk was on, "Did the assistant feel slow?". No video is kept; any screen
   recording is deleted once the notes are written.
6. **Record** `plat/goldens/ux/<milestone>/f5.json`, named in the milestone's `MilestoneRecord.ux` (file f item 490):

```ts
interface F5Record { milestone: string; build: string; date: string;
  participants: { id: string /* P1 … P8, no names */; device: 'laptop'|'tablet';
    tasks: { task: 'quarter'|'place'|'dress'|'reroll'|'clerk' /* 'clerk': M3c's session, T-V10-26 */; completed: boolean; seconds?: number; stuckAt?: string; notes?: string }[];
    surprisedByHeld?: boolean; clerk?: { used: boolean; slow?: boolean } }[];
  verdict: { perTask: Partial<Record<'quarter'|'place'|'dress'|'reroll'|'clerk', { passed: number; failed: number }>> /* the tasks the session ran */;
    pass: boolean /* §13.4: all, or all but one, complete every task the session ran — the four, or at M3c the clerk task */ };
  fallbacksApplied: ('firstScreen'|'hint'|'touchFabric'|'clerkApplyThenUndo'|'keepChangeToggle')[] }
```

7. **Consequences.** §13.4's fallbacks, applied through `toolkit.json` (first-screen placement, hint text) and `AppPrefs`'
   defaults (`touch.editFabric`, `reroll.keepChangeToggle`) and `ClerkSettings.applyMode`'s default (V10 §4.4), each a shipped-data change with a note in the
   release notes; a task two or more participants fail is re-run with new participants before the milestone exits.

### 7.4 The owner's UX sitting — §13.6's shape applied to the editor

The owner is the casual user this product is for (a non-programmer who delegates the technical judgement), so the owner's
own use is a gate as the owner's eye is for the maps (§13.6):
1. **When.** M2a (diagnostic, recorded, not gating), M3a (gates "the editor is ready for casual users"), M3b (the exports and
   the dress panel).
2. **Fixed before the sitting.** The tasks and the seeds (`H32("ux/<milestone>/<i>")`), committed before the build is shown.
   The tasks: the four of V09 §7.3; "Export this town for your tabletop"; "Find out why the tannery is where it is"; "Undo a
   mistake, then go back to how the town was ten minutes ago".
3. **Rubric**, per task: (1) "Could you do it without help?" — yes · with a hint · no; (2) "Did it do what you expected?" —
   yes · partly · no; (3) "Would you use this for your game?" — yes · maybe · no; an optional one-line note.
4. **Pass.** Every task "yes" or "with a hint" on (1), and at least two thirds of the tasks "yes" on (2) and on (3).
5. **Unrated.** If the owner has not sat within seven days of the build being ready, the milestone's editor status is
   recorded "provisional — not rated", the build continues, no "ready for casual users" claim is made, and the sitting is
   offered again at the next milestone (§13.6 (7)'s rule).
6. **Record** `plat/goldens/ux/<milestone>/owner.json`: `UxSittingRecord { milestone; date; status: 'diagnostic'|'passed'|
   'failed'|'accepted'|'provisional-not-rated'; seeds: string[]; answers: { task: string; q: 1|2|3; answer: string; note?:
   string }[]; acceptance?: { by: 'owner'; text: string; date: string } }`, named in the milestone's `MilestoneRecord.ux`
(§13.3; file f item 490).

### 7.5 Parity with the references' own editing

Every capability the reference generators' editors have is reached, and the action counts are compared on §13.4's scripted
tasks (O16 (c)); sources: `research/ux/tool-survey.md` Part I D.

| the reference's capability | reference actions | PLAT | PLAT actions | verdict |
|---|---|---|---|---|
| a new town (MFCG Enter; FTG's create form) | 1; a form | Enter in the empty state; afterwards Same kind, new seed (a new document) | 1 | parity; the current town is never lost (improvement) |
| re-roll one ward (MFCG ctrl-click) | 1 | shift+click (a scoped New random), with three variations | 1 (+1 to pick) | parity; candidates added (improvement) |
| warp brushes (MFCG's eight) | mode + stroke + Enter | T2 `ground`'s warp session, eight kernels, Apply | same | parity |
| rename a label (MFCG click) | 1 + typing | click + typing (T11 `name`) | same | parity |
| move a label (impossible in MFCG) | — | drag (T11 `name`) | 1 | improvement |
| district colours (impossible in MFCG) | — | T12 `dress`'s tint and the style dialog | 2 | improvement |
| keep edits across sessions (impossible in MFCG) | — | autosave | 0 | improvement |
| roads as click-chains that snap and split (FTG) | n + 1 | T4 `road` two points or a line, with snap | 2 | parity |
| place a building (FTG two clicks) | 2 | T6 `place` stamp drop, Accept | 2 | parity |
| swap two buildings' details (FTG) | 3 | drag a use's badge onto another building (`swapUse`) | 1 drag | parity |
| paint roofs (FTG brush) | brush | T9 `shape` paint | brush | parity |
| regenerate an area with presets (FTG) | select + preset + accept | T10 `hold` Try again with scope chips and variations | 2 | parity; three candidates (improvement) |
| confirm the consequences (FTG's confirm-actions list) | 1 | the badge's fate counts and the fates sheet | 1 | parity |
| "This action cannot be undone" (FTG's regenerate) | — | never: every action undoes (R11) | — | improvement |
| bulk edit (FTG) | select + form | multi-select + `setAttrMany` | same | parity |
| the thirteen MFCG asks of §7.4 | — | each reachable from the rail or a panel in ≤ 3 actions (V09 §4.3), verified by T-V9-44's scripted action count | ≤ 3 | improvement (MFCG has none) |
| rotate the map (MFCG's warp menu) | 1 | the Map group's dial or "North up" | 1 | parity |
| a river drawn with a width; trees by brush; pins with a label, a note and a colour (FTG) | a draw; a brush; a click and a form | T2 `ground`'s river or canal line with its width handle; T8 `fill`'s Trees brush; the Notes panel's pins | same | parity |
| people search and a clock (FTG) | a form; a button | the People panel; the clock's Next hour (module tier) | same | parity |
| a city as tabletop crops plus an overview (E4 (4)) | — | the scene split with a numbered overview PNG | 0 extra | parity |
| a road raised while drawing (the surveyed road tools' Page Up/Down, `research/ux/tool-survey.md` Part II, B2-S5) | a key | T4 `road`'s Raised toggle, or PageUp and PageDown while drawing (V09 §4.20.2) | 1 | parity |
| a multi-level tabletop scene (Part II, E-S33, E-S34) | — | a raised way's deck scene, a level with its elevation band (file f item 447 (c)) | 0 extra | parity |
| retaining walls, raised ways, stepped buildings and deck plots in the reference generators | none | T3 `wall`, T2 `ground`, T4 `road`, T9 `shape` and T6 `place` (item 110; V09 §4.20) | — | improvement |

### 7.6 The game-master trial before the public release (item 112 (b))

§13.2's T112-2 makes the trial a release gate (§16); this is how it is run.
1. **Who and how many.** Ten to twenty SettlementForge game masters, recruited through SettlementForge's existing
   community, each running the map on their own settlements, thanked by credit and early access, no payments (item 112 (b);
   J122). A participant of a first-five-minutes session (V09 §7.3) may take part.
2. **What they use.** The release candidate on SettlementForge's staging host (J121; V09 §11 Q1), inside SettlementForge
   (host mode) — the map module over their own campaigns, the dossier absorbed as their play moves on.
3. **The sessions.** At least two sessions of play each, over at least two weeks of the campaign clock; nothing scripted.
   After each session the participant answers the trial form (four questions: what they used, what surprised them, what
   failed them, would they use it next session) and may attach pictures; the in-app defect records (V09 §5.12) are
   exported with their consent.
4. **The record** `plat/goldens/ux/release/trial.json`, named in the release gate's record (§16):

```ts
interface TrialRecord { build: string; from: string; to: string /* ISO dates */;
  participants: { id: string /* G1 … G20, no names */; tier: string /* the settlement's rung */;
    sessions: { date: string; players: number; minutes: number; used: string[] /* screens and tools, by id */ }[];
    findings: { severity: 'blocker'|'major'|'minor'; area: string; text: string; fixed?: string /* the change that fixed it */ }[] }[];
  report: { path: string /* the written report */; date: string };
  verdict: { participants: number; everyTwoSessions: boolean; openBlockers: number; pass: boolean } }
```

5. **Pass** (T112-2): at least ten participants, each with at least two sessions; the report written; every blocker fixed
   (re-checked by its reporter where they can) and every major fixed or ruled by the owner; the findings entered in volume
   12's calibration record and the fix list (V12). A failed trial holds the public release and runs a second round on the
   fixed build.
=== END ===

=== REPLACE ### 8.1 Where it slots into §16 ===
### 8.1 Where it slots into §16

The application is built along the base's milestones, never ahead of the engine it drives: each step below ships inside the
milestone named, on that milestone's API, and exits on its bars. Estimates are expert person-weeks (PLAUSIBLE), for the
application's code, data rows and its own test tooling; the engine work they call is the base's and the other volumes'.

| step | milestone | content | exit (V09 §7) | pw |
|---|---|---|---|---|
| **AP1 — the shell** | M1 | the frame (top bar, rail with the tools that exist, map region, context panel, view bar); the chrome tokens, the icon sprite and the two themes; the empty state's card (the proxies' strip waits for M3b); the report, gazetteer and "features in view" panels in plain words; the basic panel; the keymap; the accessibility contract; context help's skeleton; the message catalogue's first rows and its coverage test; open and download of generated towns | T-V9-1 (shell), T-V9-15, T-V9-21 (shell) | 2.5–3.5 |
| **AP2 — the editing core as screens** | M2a | selection and the generated context panel; T9 `shape` and T10 `hold`; the preview pipeline — ghost, badge, handles for T9, the variations tray with thumbnails (file f item 461), the refusal card, the bend line, the fates sheet; undo and redo; the history panel with restore points and "Go back to here"; autosave, compaction, crash recovery and the draft mirror; the M2a pipeline session of the first-five-minutes test (V09 §7.3; file f item 494); the owner's diagnostic sitting; the two layout classes with the medium layout's 600 × 480 minimum (item 126; §16) | T-V9-2 to -7, -12, -13, -16 (go back), -17, -22 (T126-2, T126-3), -29 (the pipeline session, recorded), -30 (diagnostic), -47 (compaction) | 2.5–3.5 |
| **AP3 — the full toolkit on the canvas** | M3a | T2 `ground` – T8 `fill` in full (points forms, snapping by role file f item 517, wall arcs file f item 462, placement alternatives file f item 463, the quarter's size file f item 348); handles on every shape; T7 `roster`'s paste and cards; multi-selection and move; the working layer; the advanced panel, tables editor and presets; the siting rows, the link view and link edits, split merge-back, wall stretch grades, record members, the why card (V11's tables by `editTable`, file f items 460 and 360, §11.2's `WhyAnswer` through `WhyCardModel`, its `sections` drawn by the card's row renderer within this estimate); the clerk drawer (with volume 10's clerk, or the scripted test clerk until it lands); touch (the narrow class never built, item 126); the share sheet; open and recent; the three load outcomes (V09 §3.14 (a)–(c): the upgrade offer, the frozen view's Edit it with this version, a model-less file's recipe), standalone (host mode at AP5b); the known-city canvas script; the two four-task sessions (midpoint and exit); the owner's gating sitting; **the revision's base edits** (the castle's keep and bailey, land use, the tree brush, way split and join, district colour, the lifts, the drawn river), the context menu, View as as a filter, Recently deleted, the re-roll brush and the held-thing marks; **item 110 on the canvas** (V09 §4.20: Retaining wall, Terrace, Raised and Aqueduct, removal and Build it again, decks and landmark slots, the per-tier steppers, spans and crossings, the effects list, the hit stack, Keep them as yours, the Raised-ways row, the skeleton's removals, the export dialog's item-110 rows) and the second known-city canvas script | T-V9-3, -4, -8 to -11, -14, -18, -20, -22, -24 to -27, -29, -30, -31, -39, -44, -47 (links), -48, -50, -51 to -58, -60, -62, -63, -65, -66 (tiers, the harness form), -67 (the standalone clauses), -81, -82 | 7–10.5 |
| **AP4 — finish, export and shade** | M3b | the export dialog's five tabs with estimates and the tabletop details (file f item 454); T11 `name` in full (inline editor, region groups, leader-line switch); T12 `dress` in full (furniture tray, underlay, lights, ground texture, the style dialog, **New trees**, **New decoration**, **New emblem** and **New compass**); the shade view (file f item 411, once item 102's driver is in the field); the Try-another strip (with §7.8's proxies); the guided first town; settings complete; the installable offline app; help coverage; the owner's sitting on exports and dress; **the revision's view keys** (the Map and Light groups, notes, pins, favourites, the grid, legend and emblem controls, the ruler), the voids view, the whole-circuit option, the tabletop overview | T-V9-3 (T11, T12), -6 (New trees, New decoration), -19, -21, -23, -30, -32, -43, -45, -47 (shade), -61 | 3–4.25 |
| **AP5 — time** | M6-E (staged; with V06's E6) | "Open a copy from here" on V06's `forkAt` and "Re-run from here" on `rerunFrom`; the Chronicle tab joined to V06's timeline bar; `chronicle.csv`, `uses-history.csv`, the animated history and the history block at import | T-V9-16 (copy), T-V9-17 (the advance clauses), T-V9-41, T-V9-53 (the epochs) | 0.5–0.75 |
| **AP5b — host mode** | M-SF (with V08's SF4 and SF6; V08 §8.1) | the host shell verified on V08's `embed.html` with V08's `HostSlots` — the file menu under `fileMenu: false`, the host rule for new documents (`newDocuments`) and the history panel's host group (`historyLines`), the three load outcomes in host mode (V09 §3.14 (a)–(c)), View as's host-set key form; the assistant's host clauses re-run on the embed; the Show menu's **SettlementForge's chains** (V09 §5.4); the history panel's dossier groups and the report panel's standing notes (V09 §4.10, V09 §5.7) | T-V9-28, T-V9-40 (the host clauses, on the embed), T-V9-64 (on the embed), T-V9-66 (the embed clause), T-V9-67 (the host clauses), T-V9-68, T-V9-69 | 0.25–0.5 |
| **AP6 — Below and item 109** | M6-U (staged; with V04's U3, U3b and U4) | the Below group (band ladder, view chips, lantern, the hidden-voids toggle at `secret`); the system chip and New ruin / cavern / catacomb; the ruin legend; "How people get down here" with every cause, "Show the way in" and the access edits; the dwelling closure's words; the catacomb, crypt and cemetery panels, the extent chart and the bends | T-V9-33 to -38 | 1–1.5 |
| **AP7 — Sky** | M6-sky (staged; with V05's P4) | the Sky group and island menu; the island handles (the rim's **Resize** and **Reshape the rim**, altitude); "Update shade now"; the shade strips and their legend | T-V9-43 (strips) | 0.5–1 |
| **AP8 — the built-in assistant's screens** | M3c (staged; with V10's C2–C5 — C5 for the host channel and the card-only drawer) | the three first-open cards (label, notice, key); every `ReplyBlock` and `ClerkAction`; the meter and the caps; the settings' Assistant section over `ClerkSettings`; the creation preview and its acceptance; the import dialog's critique and "Check with the assistant"; "Ask the assistant"; the transcript export; the card-only drawer for a host's proposal and the host channel `ClerkMount.host`, verified on the application harness's scripted host page (T-V9-64); New topic, the key verdict and the defect list; Start a new map from this (`attach.newMap`); the clerk session of the first-five-minutes test (V09 §7.3 (1); T-V10-26) | T-V9-27 (harness), T-V9-29 (the clerk session), T-V9-40 (the host clauses on the scripted host page), T-V9-64 (on the scripted host page) | 1–1.25 |
| **AP9 — people and the family tree** | M4b (with `@plat/sim`) | the People panel, the person card with "Where is", the family tree, the clock, **Re-derive people** (§10.3; §7.4's regenerate row) | T-V9-46 | 0.75–1.25 |
| **AP10 — building-band controls** | M6c (staged; with V02) | V02's handles and family strip (V09 §3.5) and the tier controls (V09 §4.20.5: the tier stepper, the step handle, the stair and top chips, the stair width) | T-V9-42, T-V9-59 | 0.25–0.5 |
| **AP11 — items 111–126 on screen** (V09 §4.21) | across milestones, each part with its engine | the oasis toggle at M3a (with AP3); Colour vision, the cue column and the progress view at M3b (with AP4); the History chip, "What its past left" and the lost-void line at M6-E (with V06's replay and V04's U-ACCESS); the wall states in the legend (V09 §4.21.4 (3)) at M2b with §8.2's state rows, the Repair mode's **Material** chip and **Wear** at M3a (with AP3 and §16's M3a T3 `wall` repair), **Back in use**, the last-change epoch on the panel line and the ring's story at M6-E (with V06 §3.7.3 – V06 §3.7.7); the grandeur line at M6 (with V02's ceiling rows); the zoom-out stop, the season control and the festival list at the milestones §16's rows for items 116–118 name, the week's fallback at M-SF (item 125); **Find** at M5 (item 120; §16) — the panel, type-ahead, chip grid, results, `live.find` and Show gaps, with V01's W10–W11 and Coverage folded in; Settings › Display › Resolution and the view-status chip at M4 (item 121); Show crises, the crisis preview and the weather effects' switch at M3b (items 122, 124), the dossier's crisis looks and their numbers at M-SF with V08's reading, the framing with them; the damage lines with V03's damaged-plan step, the decay levels at M6-E (item 123; §16); the game-master trial before the public release (V09 §7.6) | T-V9-71 – T-V9-79, T-V9-83 – T-V9-87 | 4.5–6.25 |
| **total** | | | | **23.75–34.75** (base line 16.0–23.5, AP5b inside it, J-V9.103; staged AP5–AP8 and AP10 3.25–5.0; AP11 4.5–6.25 with the owner items it serves) |

**Against the base's pricing.** §16's effort table prices the reference app's UI with item 101's addition; this volume's
design adds to that line, itemised: autosave,
compaction, crash recovery and the draft mirror +0.75–1.25; restore points and "Go back" +0.25–0.5; the message catalogue in
plain words with its coverage test +0.5; the file-g interface (the siting rows, the link view and edits, split merge-back,
wall grades, record members, the shade view, the why card) +1.5–2; the export dialog's estimates and tabletop details
+0.5; the touch layer and the two layout classes +0.75–1 (item 126 drops the narrow class's 0.25–0.5); the guided first town +0.25; the owner's sittings and the
known-city canvas bars +0.25–0.5 — **+4.75–6.5 pw** — and the base-side additions (the base edits, the view keys,
notes, pins and ruler, the context menu, View as, Recently deleted, people and the family tree) **+1.5–2.25 pw**, and
item 110 on the canvas (V09 §4.20, the effects list, the hit stack, the item-110 dialog rows, the skeleton's removals
and the second fixture's script) **+1.25–2.25 pw**, carried by file f item 530 as a widening of that line to
16.25–24.0, and narrowed by item 126 to **16.0–23.5**. The staged screens — time's (AP5 0.5–0.75: the copy, the re-run, the Chronicle tab and V06's exports),
the staged layers' (AP6 1–1.5, AP7 0.5–1), the staged clerk's (AP8 1–1.25) and the stage-3 building band's (AP10
0.25–0.5); 3.25–5 pw — are built with their staged milestones — V06's E6 at M6-E, V04's M6-U, V05's P4, V10's M3c and
V02's M6c — and priced in §16's row for the application's staged screens, outside the base total and outside those
volumes' totals (V04 §8, V05 §8, V10 §8 and V02 §8 name the step each lands with).
AP11 is priced with the owner items it serves (items 111–126), each part inside the milestone of its engine: items
111–119's parts 2–2.75, Find 1.25–1.75, the resolution setting and chip 0.25–0.5, the crisis looks' screens 0.5–0.75,
the damage lines 0.25 and the weather switch 0.25.
=== END ===

=== REPLACE ## 9 Decisions (each vetoable) ===
## 9 Decisions (each vetoable)

| id | decision |
|---|---|
| J-V9.1 | chose one shell with host slots (`ShellMode`, `HostSlots`) over a separate host application, because V08's differences are a short list and a fix to the shell then reaches both the standalone editor and SettlementForge's Map tab |
| J-V9.2 | **Superseded by J-V9.36**: the map-side declarations are volume 11's document-only tables written by `editTable`, not attributes of `Use` |
| J-V9.3 | chose to accept a pending ghost implicitly when the user starts another gesture or picks another tool, over requiring an explicit Accept, because R1 forbids a dialog-first flow and the survey's strongest pattern is the result appearing with the gesture; Esc, Cancel and undo keep it cheap to refuse |
| J-V9.4 | chose commit-on-release for things the gesture itself draws (strokes, drags, locks) and Accept for things the user chooses among (a quarter's size, a place's site, a roster, a fill's variation, a clerk's proposal), because the chosen ones carry a count or candidates to judge first (R3, R14) while a stroke's ghost is the thing itself |
| J-V9.5 | chose a journal of the API calls, replayed with a `logHead` check after each, over journalling log events, because unshared truncation (§7.4) and confirmed fates change the log's own shape, while the engine's determinism makes replaying the calls exact and self-checking |
| J-V9.6 | chose to keep wall-clock times in the local journal, not in the document, because `EditBase` has no time field and adding one would change every document digest for a display detail; events made elsewhere show no time |
| J-V9.7 | chose restore points as shared view keys, one key per point, over a canonical list, because they are bookmarks on log positions that must never move the model digest, and one key per point merges concurrent additions under last-writer-wins |
| J-V9.8 | chose to confirm a dry run's renames as one set over per-rename choices, because keeping one old name is a different event (a name lock) that would change the dry run's own result; a user renames afterwards |
| J-V9.9 | chose two layout classes — wide and medium, every tool on both (tablets and desktops) — with a window below 600 × 480 CSS px keeping the medium layout at that size and the page scrolling, over a separate small-window screen, because the owner offers no map on a phone (item 126 (a2), J140: "we will simply not have the option of viewing the map in the phone in the first place"), handles and snapping need 44 px targets with the map around them, and a scrolled page loses and re-generates nothing; §13.4's sessions decide tablet editing with a pre-decided fallback |
| J-V9.10 | chose to keep the clerk's conversation in memory only — kept as the accepted declarations in the log, or as the user's own copy — over saving it in the document, because the accepted proposals already carry their provenance and a chat may hold what the user did not mean to keep; when the user switches on volume 10's "Keep history", V10 §2.7's device store keeps it, never the document (**amended by J-V9.34**) |
| J-V9.11 | chose an installable, offline-capable web app with no telemetry and no network use except the clerk and a host's publishing resolver, because the base has no hosted service (§11.5), the towns are the user's, and the audience expects its tools to work at the table without a connection |
| J-V9.12 | chose our own icon sprite for the twelve tools and the app-specific marks and one permissively licensed icon set, through one adapter file, for generic glyphs, over drawing every glyph or taking every icon from a library, because the tools' icons carry the product's identity while generic glyphs gain from familiarity (§17.4's licence rule holds) |
| J-V9.13 | chose "what anyone knows" as the Share sheet's default picture tier, while the export dialog defaults to the view's tier, because sharing is where a secret leaks by accident and a game master's everyday view is `secret` |
| J-V9.14 | chose a three-way chip for the walls control (none · one ring · two rings) over the slider item 101 (g) drew, because the control is discrete (§7.8's registry) and the survey's mapping amends it (`research/ux/tool-survey.md` §5 T1 `intend`); file f item 515 corrects the base's wording |
| J-V9.15 | chose to run the four-task first-five-minutes sessions inside M3a (its midpoint build and its exit), with a smaller, non-gating pipeline session at the M2a exit on what M2a can express (a re-roll keeping a locked thing, a shape task, going back, a compass), over pulling M3a's engine pieces for T5 `quarter` and T6 `place` (drawn boundaries, post-build assignments, positive placement, the solver) into M2a, because the four tasks need those events and moving them would reorder the base's milestones; the survey's "cheapest point" is kept by the M2a session (file f item 494) |
| J-V9.16 | chose the system UI font stack for the chrome over bundling a UI face, because it costs no bytes, reads natively on every device and leaves the bundled faces (§17.2) for the map alone |
| J-V9.17 | chose handles at the most salient corners (turning angle × shorter adjacent edge, spaced along the ring) over evenly spaced or all vertices, because users grab a shape at its corners and 4–8 handles keep an edit a drag rather than a redraw (item 101 (i) rule 3) |
| J-V9.18 | chose `sizeM2` on the quarter's points form to carry the badge's plus and minus over a separate size event, because the event already has a points form and the grower reads a target size — one parameter on an existing tool |
| J-V9.19 | chose to show a link or siting edit as a changed binding with an offer to "Show better sites" over moving buildings at once, because a move is a relocation with its own fates, which the author sees before it happens (R3); the declaration holds for every later placement |
| J-V9.20 | chose curved provider-to-consumer arcs for the link view over lines routed along the streets, because hundreds of routed lines overlap on the same streets and hide the pattern; V08's view of one custom chain routes along ways and stays its own view |
| J-V9.21 | chose six stepped shade veils drawn under the buildings' fills over a continuous ramp or a veil on top, because steps read as a legend and under-drawing keeps buildings and labels legible (the legibility floor) |
| J-V9.22 | chose not to offer copy and paste of buildings, because a copied building is not a declaration the rules can derive and the survey records the request only for free-form builders; T6 `place`'s stamp is "the same kind here" |
| J-V9.23 | chose to commit a roster card accepted alone as a `roster` with that one line and re-preview the rest, over committing a subset of one solve, because §7.1 solves a roster in one dry run and a committed subset must be its own solve |
| J-V9.24 | chose existing events for the app's compound gestures — a use badge dragged onto another building is `swapUse`, "Go back to here" is a group of `undo`s — over new kinds, because §7.1 and §7.4 already carry their undo and replay; a gate slides by `moveVertex` on its crossing (**amended by J-V9.47**) |
| J-V9.25 | **Superseded by J-V9.33**: the oracle's answer is volume 10's `WhyAnswer` (file f item 468), and this volume keeps only its app-side projection `WhyCardModel` |
| J-V9.26 | chose an owner's UX sitting on §13.6's protocol shape as a gate at M3a, because the owner is the casual user the product is for and the maps' "mastered" already rests on the owner's eye |
| J-V9.27 | chose a dedicated-user bar — a person rebuilding the known city by hand in ≤ 90 minutes — besides the scripted canvas, because the owner's words were "a dedicated user can build it", which a script cannot measure |
| J-V9.28 | chose to request persistent storage and to state eviction plainly (S-A2) over promising local permanence, because WebKit may clear script-written storage for sites not installed; an honest note beats a silent loss |
| J-V9.29 | chose pages of three variations with "Show three more" over a user-set count, because R5 names three and a fixed small number bounds the preview's cost |
| J-V9.30 | chose live-layer providers (`live.shade`, `live.links`) over thematic override rows for the two new views, because their values are a derived raster and derived bindings, not entity attributes a style row can key on |
| J-V9.31 | chose `MsgRef` (a key and arguments) for the engine's bend and conflict lines over English strings, because the catalogue then owns every word of the application's own a user reads, a locale is a file, and the coverage test can check them — the application's own words (**amended by J-V9.55**) |
| J-V9.32 | chose to state "this changes where the rules would put it; it stays here until you move it" under the siting rows over re-siting automatically, because an automatic move of a declared or dossier place would break declared-means-held (§7.2) and item 20's dossier authority |
| J-V9.33 | chose to render volume 10's `WhyAnswer` through one app-side projection, `WhyCardModel`, stated as a table (V09 §2.7), over keeping a second answer type in the base, because two shapes of one oracle cannot both be applied and volume 10 owns the oracle; the projection also carries item 102 (f)'s drivers and item 106 (g)'s closure, which only volume 10's shape holds |
| J-V9.34 | chose volume 10's drawer view model and harness — the harness commits, only on the drawer's Accept or the user's apply-then-undo setting — over a shell that commits on Accept through a facade without `edit`, because volume 10's acceptance re-previews and checks the card the user saw before committing, and one committer is simpler to prove; the colliding type names are renamed (`ClerkMount`, `ClerkHandle`) and `ClerkSettings` is the one settings store |
| J-V9.35 | chose to show, at the drawer's first opening, the AI label, then the data notice, then the key entry, each skippable back to "Not now", over one combined card, because consent must come before any key is typed and each card answers one question a casual user has |
| J-V9.36 | chose volume 11's two document-only tables, edited by `editTable`, as the one store of the siting, link and split declarations, with a per-kind panel keyed `uid:`, `cat:` or `cls:` and no per-use siting weights (a single place is moved or pinned instead), and a `use:` key only for keeping one institution's works and shop together, over per-use attributes on `Use`, because the solver, the clerk and the canvas must read one store and item 104 (a) (1) keys the author's declaration by kind |
| J-V9.37 | chose three link-edit cells — `bindTo` to keep or move a supplier, `avoid` to cut one supplier, `cut` alone to stop buying the good — over overloading `cut` with a provider, because each of the link view's four buttons then writes one unambiguous row |
| J-V9.38 | chose V04's name `showUnexcavated` for the hidden-voids toggle and made it a per-viewer view key, never a logged layer field, offered only to a `secret` view, over the name `underSealed` and over a `LayerSpec` field, because a game master's toggle must never enter the log another client reads and one name must serve both volumes |
| J-V9.39 | chose to state the catacomb bend ladder once, in file f item 361 as the dry run of `drawChamber { system: { newKind: 'catacomb' } }`, and to word it here, because the ladder is the dry run's and R2 requires a bend for each misplaced catacomb; none of the four catacomb bends or two crypt bends refuses |
| J-V9.40 | chose to expand a dwelling declaration on a sealed void into a closure that makes the way in by V09 §4.17.4's four-step ladder — a way dug down from the nearest building within `DigRule.maxM`, else the nearest public opening, else a `collapsed_shaft` from the public ground over the cluster, else the declaration bent onto ground part 0 — over refusing it, because §7.3 item 9's closure exists for exactly this and R2 allows a refusal only against a fact or a lock (**amended by J-V9.102**) |
| J-V9.41 | chose one preview contract for variations — volume 10's `{ event, result }[]` with a page, a `previewId` and a `thumbnail` tied to its preview — and one committed group per source, with a clerk's alternatives previewed each by its own call, over two contracts, because §7.3 item 10's variations and a clerk's alternatives are different things that must replay exactly |
| J-V9.42 | chose to merge four requests with volume 10's — `sizeM2` clamped into the band from the median, one `MsgRef` mechanism rendered per caller, the top three `SiteCandidate`s as placement alternatives, and a record's members from `EntityCard.members` — and to withdraw this volume's `members` query, because each fact must have one owner |
| J-V9.43 | chose to preview a T1 `intend` change after a declaration as a whole-town ghost with Accept, and to open the fates sheet only after Accept and only when fates move, over opening the sheet first, because R1 forbids a dialog before a picture and §12.5's model law makes the ghost affordable with a working ring |
| J-V9.44 | chose to turn every refusal that is neither a dossier fact, a lock, a dependency, a role, a staged layer, the rung nor the screen into a bend with its alternative pre-selected, and to give every remaining refusal at least one button, over the first draft's fifteen refusals, because R2 and T101-5 require the closest alternative; a rule of a building's structure or of nature is a bend too (J-VI.4) |
| J-V9.45 | chose a two-phase journal — pending before the call, done with its result — with a fates-sheet confirmation journalled in its resubmission form, over writing each entry after `ok`, because a kill between the worker's commit and the write would lose a commit and break the chain of heads |
| J-V9.46 | chose to make "View as" a display filter (`ViewOpts.viewAs`) separate from the view's knowledge key, over lowering the key, because a lowered key refuses the document formats and would stop autosave, ctrl / cmd+S and downloads while the owner looks through a player's eyes |
| J-V9.47 | chose that a boundary drag replaces only the run between the moved handle's neighbours, that a lake offers only its level handle (its shore is its basin filled to that level), that every gate slides by `moveVertex` on its crossing, that an island's rim resizes it by `resizeIsland`, and More handles = clamp(round(perimeter ÷ 75 m), 8, 16), over whole-ring lassos and rim handles that fight the basin rule, because a handle drag must stay local (item 101 (i)) and never contradict a derivation rule (**amended by J-V9.146**) |
| J-V9.48 | chose to design the People panel, the person card with "Where is", the family tree and the clock here at M4b, over an out-of-scope row, because §14 places the family-tree view in `@plat/app` and no other volume owns these screens |
| J-V9.49 | chose a link cache bound once per `logHead` and re-bound incrementally, compaction only when idle, and a stated cost law for the shade sampler with a coarser-cell fallback, because METROPOLIS's tens of thousands of consumers and 8 MB documents would otherwise stall the view and the previews |
| J-V9.50 | chose to record each canvas-script gesture's view scale and centre and to replay it at that view, and to restate the known-city bar (a) as T101-6 states it, because the snap resolves in screen pixels and a transcript made from words resolves to different points than a hand |
| J-V9.51 | chose a "Recently deleted" list kept 30 days, purged earlier only after asking, over a 10 s undo, because R11 and R15 promise that nothing is lost by one click |
| J-V9.52 | chose to generate the context menu from the registry and `toolkit.json`, in a fixed order, over a hand-written menu per kind, because the panel and the menu must offer the same actions and a new kind must reach both without code |
| J-V9.53 | chose to draw, over this volume's six-step shade veil, V05's revised strip rows as V05 states them — a solid line at the three-of-nine area and a dashed pending line — over three nested strip areas, because V05's revision moved the veil to this volume and kept the strips as outlines; the veil's steps carry "some, much, most of the day" |
| J-V9.54 | chose "Show the whole circuit" as a `LayerSpec` option of the wall layer, drawn by S14 in both products, over a view key, because it is a choice about how the style draws walls, exported in pictures, and V07's palisade relies on it |
| J-V9.55 | chose to scope the catalogue to the application's own words and to run T-V9-15's readability step over volume 10's and volume 11's rendered sentences, reporting failures to those volumes, over copying their sentences into this catalogue, because each sentence must have one owner; the file also carries volume 10's key families, their texts volume 10's (**amended by J-V9.79**) |
| J-V9.56 | chose seven size chips at population quantiles of the rungs' bands, read from the rung table, each showing its number, over three unnumbered chips, because the owner rules that population sets size within a tier |
| J-V9.57 | chose to place the base's view keys, notes, pins, favourites, the grid, legend, emblem and compass controls and the ruler in named groups of the view bar and in a Notes and a Dress panel, over leaving them to a later volume, because the application is their only writer and the parity tasks need them |
| J-V9.58 | chose to design item 110's tools in this volume itself (V09 §4.20) over leaving them to the architect's attachment notes, because an implementer holding the base and this volume must build them without guessing |
| J-V9.59 | chose to widen `drawWall` with a `retaining` kind and `drawWay` with `raised` and the `aqueduct` class, and to add a `terrace` sugar, over new event kinds per record, because file g and volumes 6 and 10 already speak of T3 `wall`'s retaining kind and T4 `road`'s raised flag, one tool mode maps to one event family, and the fold resolves the record by kind; the terrace is sugar because its walls lie where the levelling puts them |
| J-V9.60 | chose to bend a retaining wall drawn on flat ground onto the nearest step, else into a terrace with the wall on its edge, over refusing it, because R2 allows a refusal only against a fact or a lock, and item 110 (f) wants no retaining wall on flat ground |
| J-V9.61 | chose to bring a raised road or viaduct down before a town wall, through its ground way's gate, over carrying it over the wall, because a raised deck over a curtain would be an unguarded way in; the aqueduct's arch is item 110 (b)'s own rule |
| J-V9.62 | chose a basic Raised toggle and an Aqueduct class chip on T4 `road`, with PageUp and PageDown while drawing, over a separate raised-way mode, because item 110 (b) names "T4 `road` with `raised`, or the aqueduct class" and the surveyed road tools raise a road with those keys |
| J-V9.63 | chose a previewed Delete that needs Accept whenever the removal changes anything beyond the thing itself, over a Delete that commits at once, because R1 and R3 require the consequences to be seen first and a raised way's removal reaches routes, streets, vaults and water |
| J-V9.64 | chose one typed effects list on the preview and the confirmation, with a `holds` line for a suppressing removal, over reading consequences off the ghost's geometry, because the words must reach the fates sheet, a screen reader and the clerk, and each volume owns its own consequence; the kind `added` joins the other seven so a Re-derive can name what it builds |
| J-V9.65 | chose click-again cycling through a hit stack, with the context menu's "Select below", over a modifier-click, because alt-, shift- and ctrl-clicks are already lock, New random and reset (§14), and the stack serves raised decks, arches, crossings and tiers alike |
| J-V9.66 | chose to show a deck's budget as its storey cap and footprint band, never as a count of plots, and to bend a class the deck refuses to its landward end, because the budget is volume 11's footprint and storey row and R2 bends before it refuses |
| J-V9.67 | **Superseded by J-VI.4** (item 101 R2): a rule of a building's structure or of nature is a bend, never a refusal (V09 §4.9) |
| J-V9.68 | chose to keep a raised part on the Ground working layer, reached through the hit stack, over a fourth working-layer switch, because a raised part is a ground arena part (item 110 (b)) whose ends join ground vertices (§7.1) |
| J-V9.69 | chose one deck scene per raised way — a level of a multi-level scene — over drawing decks only into the ground scene's picture, because a fight on a viaduct needs the deck's parapets as walls at the deck's height, and the surveyed tabletop tool stores levels by elevation band |
| J-V9.70 | chose to carry an author's removals of generated content in the skeleton, a suppressing one by its reason key, over carrying declarations only, because a removal is the author's act, the owner ruled that it holds, and the base's skeleton round trip would otherwise fail |
| J-V9.71 | chose to allow a closed retaining chain as a platform over forbidding `closed`, because a temple or citadel platform is retained on every side, and item 110 (a)'s "never an enclosure" means not an `Enceinte` (no gate, no circuit), which the fold enforces |
| J-V9.72 | chose an unchecked "Keep them as yours" when a Re-derive to TOWN drops a city's generated raised ways, over keeping them silently or dropping them silently, because a town builds none by its own rule while the user may want the city's, and the choice costs one click |
| J-V9.73 | chose a Raised toggle that resets each time T4 `road` is picked, and is never remembered, over a remembered one, because a remembered toggle turns the next ordinary street into a viaduct |
| J-V9.74 | chose T10 `hold` as `delete`'s home tool — the Delete key and the context menu being its gestures — over leaving `delete` without a tool, because volume 10's file f item 368 puts it there for the clerk, T-V9-12 and T101-1 need one home tool per kind, and the removal of generated content is a held edit of T10's class |
| J-V9.75 | chose a well pin as the bent result of an aqueduct with no higher source (J-VI.4 (h)), over a cistern, because a cistern is a chamber of the underground vaults system (II.7.6) that the ground tools do not draw, while a well is a ground pin the dry run places at the terminal |
| J-V9.76 | **Superseded by J-VI.4 (g)**: the rim case is the dry run's bend (V09 §4.20.9), its inward move the geometry, so the clerk and a skeleton get it too |
| J-V9.77 | chose to read a removed thing's former shape from the base's tombstone (`Tombstone.last`, file f item 467) over a journal sidecar kept by the app, because a delete made by the clerk, a host or another session must also offer Show and Build it again, and the tombstone already holds the last record |
| J-V9.78 | chose to expand the `terrace` sugar into volume 10's flatten mode (file f item 366 with its `levelCm`) over a second levelling stroke, because the base must carry one flatten mechanism and the clerk's terrace must replay as the canvas's |
| J-V9.79 | chose to carry volume 10's key families in the one catalogue file with their `en` texts loaded from volume 10's sections, and to write here only the two sub-families volume 10 names without words (`info.under.cause.<rule>`, `info.catacomb.blocked.<cause>`), over copying volume 10's sentences into V09 §4.9 (two owners of one sentence) or leaving the keys out of the file (T-V10-29 and T-V9-15 fail and a raw key reaches the user); the `info.under.*` family points at volume 10's texts |
| J-V9.80 | chose a card-only mode of the one drawer, reached through a clerk slot of kind `host` that is always set in host mode, over a separate host-card component or the full drawer under configuration C, because V10 §3.17 routes a host's proposal through the same `turns` stream and card as a built-in one — a second component would draw the same card twice — and the full drawer would put a second assistant beside the host's, against "one assistant per product" |
| J-V9.81 | chose to hand the harness the bridge through `ClerkMount.host`, filled by the embed's bridge handler, over giving the harness the bridge transport or widening `HostSlots.clerkMode` into the whole configuration, because the bridge handler is the embed's one owner of the transport (V08 §3.1), the shell needs only the mode, and the proxy token must stay out of shell state |
| J-V9.82 | chose to draw `WhyAnswer.sections` as titled blocks after the facts, to withdraw `WhyCardModel.under`, and to take a raised way's `decidedBy` from its own `raised` row, over keeping `under` and this volume's own raised-way cause lines beside the sections, because each explanation must reach the screen from one row and two renderings of one outcome drift apart |
| J-V9.83 | chose a BCR adding a one-line `roster` to T6 `place`'s row of §7.1's binding (file f item 570) over moving a place by a locus to T7 `roster` or having the canvas emit `assign` with an app-minted id, because a locus drop is a T6 gesture, the sugar mints the assignment id from the event's `seq` (§6.3) so neither surface writes one, and the rows must list what each tool emits for T101-2 and T-V10-1 |
| J-V9.84 | chose to make the canvas's T6 `place` drop-on-a-plot mapper V10 §4.1's `where.at` and `where.plot` rows by citation — `designation { cls, use }`, the name a `setAttr` on the created use in the same group — over the canvas's former `{ cls, name }`, because the base's `Designation` has no name field and T101-3 needs the two surfaces to emit the same bytes |
| J-V9.85 | chose to let `ViewOpts.viewAs` hold a key form `{ tier, places }` beside a tier, set by a host's players' view through `setViewOpts`, with `effectiveKey()` returning the form when its tier is the lower and the places both lists hold otherwise, over a tier-only View as with V08 writing the party key into the view state, because the party's learned places cannot be a tier, and a view-state write refuses the frame's document formats and risks its saves (J-V9.46); while a host's form is set the menu's other entries are disabled and the host's strip stands for the banner, over two competing banners and a menu that could contradict the host's switch; at equal or higher form tiers the value errs toward hiding, never showing (J-A30.82) |
| J-V9.86 | chose to pass the effective key as `admitAs` on every band-less read the application makes for a view and to default the export knowledge to it, over lowering each panel's answers in the shell, because only the facade knows every withheld fact and one parameter covers every kind, present and future (file f item 572); and to keep the application's own dry runs — ghost, badge, fates sheet, refusal and bend cards, effects — at the role's key, over filtering them, because they are the user's consent to a change and a filtered dry run drops concealed uses from its fates (file f item 470 (b)); file f item 572's "reads and dry runs" is read as the clerk's |
| J-V9.87 | chose to write a point-dropped `placeAt` as `plot: ''` with the point form, the dry run deriving the plot, over the shell's own hit query filling `plot`, because the canvas and the clerk must emit the same bytes (T101-3, T-V10-4) and the dry run is the one place that knows the nearest lawful plot (file f item 367) |
| J-V9.88 | chose, on a dossier-bound map, a refusal card for T6 `place`'s locus drop with the element picker and **Put it at {site}** — the first candidate with no hard fails of a `sites` query narrowed by the locus (`near` its target's anchor, `district` for `in`) — over reusing `refuse.dossierOwned` or bending silently to a site, because the dossier owns the roster (item 101), R2 needs a one-click lawful alternative, and one query keeps the canvas's and the clerk's offer identical |
| J-V9.89 | chose to give V10's `help` and `roster` entries their controls — **How do I …?** in the drawer's menu and in Help, **Ask the assistant to place these** under T7 `roster`'s box, each shown only with a clerk configured and on — and to draw the help answer's `useTool` as a button, over leaving the entries reachable only by typing in the drawer or running the tool unasked, because a declared entry without a caller is a dangling wire and no assistant action runs without the user's click (J-V9.34) |
| J-V9.90 | chose to have the skeleton import dialog run a finding's `propose` fix itself through the shell's pipeline, committed as the user's declaration with no `proposedBy`, clerk or none, over routing it to the harness, because the check must work without the model (V10 §3.21, T-V10-2), the critique engine is model-free, and `proposedBy: 'clerk'` would claim a model proposed what a rule row did; this is V10 §2.6's dispatch table's one exception |
| J-V9.91 | chose a `HostSlots.historyLines` list filled by the host and drawn as its own group "The party", over folding host lines into `HistoryRow` or a separate host panel, because `HistoryRow` is derived from the log alone (V09 §2.8) and a reveal is no log event, and one group at the head of the list keeps the log's rows, filters and undo untouched |
| J-V9.92 | chose, for every action that makes a new document in host mode, `HostSlots.newDocuments` — `'download'` writing the new `.plat` to the user's device and releasing it, `'off'` hiding the controls — and no creation mode in host mode, over hiding the actions outright or a host-side store operation for copies, because the owner's "everything editable" keeps a past state reachable, `.plat` is the user's format in host mode (V08 §5.4 (2)), the frame holds one live document (V08 §3.1 step 6) and a host-side copy would be a new capability across the SettlementForge boundary; Enter's Same kind, new seed and `refuse.restore.dossier`'s button are included because they too make a new document, and the toast is one sentence to keep V09 §4.9's rule |
| J-V9.93 | chose to give "Start a new map from this" a drawer-menu item and `attach.newMap` on `send`, standalone only, over deleting volume 10's clause and the "beside" path, because both volumes built that path and "everything editable" favours starting a new town without losing the current one, while in host mode the frame's document is the host's |
| J-V9.94 | chose `ClerkMount.rebuildEvents`, one implementation in the application that the history row and the harness both call, reading the tombstones with `admitAs` at the view's effective key, over the harness rebuilding the events from the tombstone itself or reading at the role's key, because V09 §4.20.3 (4) is the one source of those events and two implementations drift, `@plat/clerk` may not import `@plat/app` (V10 §2.1), and a thing the view's key withholds must not be rebuilt from that view (J-A30.82) |
| J-V9.95 | chose to give Build it again one row per kind file f item 260 suppresses — each the removed thing's own tool's declaration filled from its last record, file f item 467 widened to the fields the rows read — and a deck plot's re-add by `drawFootprint` at its slot, which V06 §3.19.3 (7) serves by its key, over keeping the raised-way-only form, because the base widened the suppressed kinds (J-VI.14) and a removal with no way back after a dependent edit breaks the owner's "add or remove"; `drawFootprint` because the base has no event that makes a bare plot and S11 fits a plot around a declared footprint (§7.1) |
| J-V9.96 | chose to split V09 §3.14's older-document row into §2.9's three outcomes — (a) inside the retention window the document edits under its own version and the owner is offered the upgrade by a standalone strip, in host mode by V08 §4.2's header control alone; (b) outside it with `model` the frozen view, whose one owner control **Edit it with this version** is the `frozenImport` rebase through `edit` and `confirm`; (c) without `model` **Open its recipe with this version**, a new document made from the file's recipe and log as §6.4 opens a link, under V09 §3.9's host rule in host mode — over one row offering an upgrade and "Open its recipe" for every older document, because the base separates the three (§2.9 steps 2–3, §7.5), a version outside the window can be neither upgraded nor replayed in the browser, the frozen view's one edit had no control, one event keeps one control in host mode (J-V8.94), and opening the recipe with its log keeps the user's changes by the path the base already gives a link, with §6.4's notice |
| J-V9.97 | chose to draw a frozen view's notice as the shell's own `error.frozen` strip in both modes, carrying its one control, over V08's banner slot drawing it in host mode, because that control commits an event of the document (the `frozenImport` rebase), which only the shell's pipeline issues, a slot-drawn notice beside it would show two notices or a control with no event path, and one shell in both modes is T-V9-28's premise; the banner slot keeps the players'-view strip and the held notice |
| J-V9.98 | chose to define `fileMenu: false` as keeping Export skeleton, Rebuild around my drawings, Settings and About and dropping New town, Open…, Save a copy and Recently deleted (their keys inert, Settings without its Storage section), over hiding the whole menu or a separate settings control in host mode, because the kept entries are an export, an edit (§7.2's rebase has no other control) and preferences the frame needs (`openSettings`, the `host.locked` fields), the dropped ones serve the local store host mode lacks (V09 §3.8 (6)), and one menu in both modes keeps T-V9-28's allowlist short |
| J-V9.99 | chose to give T7 `roster`'s list cards volume 10's `dossier` alternative — the element picker and **Put it at {site}** from T6 `place`'s `sites` query, `near` and `district` from the line's locus and omitted for a line with none — over the list's picker alone, because one engine refusal renders one card on canvas and clerk, J-V10.93 is a recorded decision grounded in R2's one-click lawful alternative, and T6 already carries the button |
| J-V9.100 | chose to word a locus as the exact reverse of V09 §4.16 (4) — the `rel`'s connective, "the {side} side of" for a side, the target's gazetteer name at the view's effective key — extending (4) to read the side form after any connective, and to write `refuse.roster.dossier` as "…on a plot {locus}" with the connective inside the slot and "in {settlement}" for a line with none, over "near {locus}" with a bare target name, because "near" would lose a locus's `in`, `on` or `at`, the round trip lets T-V9-13 test the wording mechanically, and a bare settlement name after "on a plot" is no sentence; the slots meet V10 §3.16's rule |
| J-V9.101 | chose **New trees** as T12 `dress`'s `rerollLayer { concern: 'render.instances' }`, town-wide and committed at once, over keeping the layer chips on T10 `hold`'s Try again or adding `rerollLayer` to T10's row, because §7.1's T10 row homes only the village track's re-roll (V10's J-V10.84 built on it), T12 already homes the display re-rolls (`style.compass`, `naming.emblem`) and V10's `DressInput.restyle` reaches any concern V09 §4.3's T12 row names with no change in V10; and `render.instances` over `style.crowns`, because the trees' positions, spacing and rotation are drawn from `render.instances` (§4.9, §8.10) while `style.crowns` is a sheet's crown library, a style's look — the concern also re-draws hedgerows and render-time field strips, display only, which is the base's own "trees" layer (§7.3 item 10) |
| J-V9.102 | chose the dwelling closure's ladder dug access → public opening → `collapsed_shaft` from the public ground over the cluster (file f item 372's note) → the bend onto ground part 0, over the bend as the third step, because file f item 372 keeps the user's homes below wherever any ground over the void is public, while the bend above ground — which item 101 R2 requires in place of the former refusal — is the floor only where no ground over the cluster is public and nothing over it can dig down |
| J-V9.103 | chose to split AP5 into AP5 (time, M6-E) and AP5b (host mode, M-SF), and to run T-V9-64 and T-V9-40's host clauses at M3c on the application harness's scripted host page and again at M-SF on V08's embed, over holding AP8's exit until M-SF or building part of the embed early, because V08 builds `embed.html`, `HostSlots` and its host harness in SF0, SF1 and SF6 at M-SF (J-V8.39; V08 §8.1), V10 tests its host seam at C5 on §11.3's bridge alone (T-V10-20), and the split keeps AP5b's estimate (0.25–0.5) inside the base line, since the host shell is priced with the shell, while AP5 lands with V06's E6 — `forkAt`, `rerunFrom`, the timeline bar and the history panel (V06 §8) — never ahead of the engine it drives, on the staged-screens line |
| J-V9.104 | chose to home the raised way's four context controls and a way's own `setAttr` (class, width, name, a bridge's kind) under T9 `shape`, over leaving them under T4 `road`, because §7.1's T9 row owns `setAttr`, V09 §4.1 sends a panel edit to the tool that owns its kind, and volume 10 encodes every `setAttr` under T9's `set` and `span` — one home tool per kind on both surfaces and in the history's attribution; T4 keeps `drawWay`; the way's own row moves with the four because it is the same kind under the same rule; and a way's `split` and `merge` — **Split here** and **Join these** — are T9's too, so every kind a selected way's controls emit is T9's |
| J-V9.105 | chose to reach V08's `supplyChains` view through the Show menu as one more `thematic` value, offered only while the gazetteer lists an active chain at the view's key, over a host-chrome toggle or an entry always listed, because thematic views are switched only by the Show menu (V09 §5.4), a standalone copy of a dossier-bound document keeps its records and so its view, and an entry that could draw nothing would be a dead control |
| J-V9.106 | chose to carry J-VI.4 (d), (e), (g) and (h) into V09 §4.20.2 (6) and the island rows, adding `bend.aqueduct.onIsland`, and to keep J-V9.76's inward-move geometry (every rim-strip point along the radial to 1 m inside the `setback` line) as the dry run's rule asked of volume 5, over leaving the island rows as refusals with offers and the distance unstated, because T-V9-52's text and J-VI.4 decide the island bends, one key per bent result keeps each line true (an aqueduct cut short at the rim is not one turned into a fountain), and V05 §3.22 (4) says "inward past the rim walk" without a distance an implementer could build |
| J-V9.107 | chose to form a dossier group from a `dossierFacts` event and the port's `host:port` events that follow it, up to the next ledger event or another session's event, with `HistoryRow.dossierGroup` derived from it, over reading `EditEvent.group` as the seam issue's text had it, because V08 §3.6 step 6 gives the port's events no `group` (C8-15; J-V8.59) and commits an absorb, or a creation's prefix, in one run, so the session and the next ledger event bound the group exactly; and chose the creation head for a ledger event that is the log's first, since a creation's prefix opens with one (V08 §3.6 step 4) |
| J-V9.108 | chose to resolve a note's binding keys by a new `entity` input `dossierKey` (file f item 583) over having V08 store addresses in `PortNote.keys` or the panel scanning every entity's `EntityCard.dossierKey`, because the notes are stored by binding key for byte identity across editors (V08 §2.4), one band-less read per key keeps admission under `admitAs` like every other read the application makes (V09 §2.7), and a scan would cost a query per entity |
| J-V9.109 | chose to word the report's "What moved" entries and its placement states as catalogue families (`report.moved.<kind>`, `report.dossier.<state>`) over words composed in the panel, because the history's dossier lines now render the same entries and T-V9-15's rule is that no engine code reaches a user without a row; the words are our own, one sentence each |
| J-V9.110 | chose to read **New names — this quarter**'s gazetteer with `admitAs` = `effectiveKey()` over the role's key, because V09 §2.7's band-less read rule (J-V9.86) already sends every `gazetteer` read with the view's effective key, volume 10 reads the same scope with the session's effective key (J-V10.95) so the two surfaces write the same bytes, and a name View as withholds would otherwise be re-drawn out of the user's sight; with View as off the two keys are one. The scope is the quarter and every row not marked withheld whose district it is, `ids` in address order |
| J-V9.111 | chose `refuse.assignment.noSite`'s **Put it at {site}** as the same declaration at the refusal's first `moveTo` target — an `assign` with its assignment's `target` that plot, a `rejectSite` grouped with `placeAt { plot, element }` — over one `placeAt` for both, because a refused new assignment has no element yet for a `placeAt` to pin, while a `rejectSite`'s element exists and keeps its rejection; the marked places are the refusal's `moveTo` actions, the channel the base's F-EDIT already fills |
| J-V9.112 | chose **Use another building** as a re-preview of the declaration grouped after an explicit `addUndergroundAccess` from the next qualifying building, the buildings listed by the dry run in `PreviewResult.alternatives` and the access's target defaulted by file f item 372's grouped-access rule, over an exclusion field on the declaration or the application naming the target element, because only the dry run knows which buildings qualify and which element each measures from, the events stay the base's, and the clerk's `propose` carries the same bytes (V10 §3.16); and removed "Dig from a building instead" from the opening's bend, because steps 2 and 3 run only when no building qualifies |
| J-V9.113 | chose to draw V08 §4.6 item 3's `info.raised.suppressed` line from a per-epoch list on V06's `EpochReport.raised` (`suppressedFired`) over a `why` read per removed way, because the epoch report is already the panel's read for an epoch (V06 W19), `raisedOutcome` answers one subject at a time (file f item 290) and would query every removed way at every epoch, and the report's `suppressedHeld` count names no removal to Show |
| J-V9.114 | chose a key argument on `HostSlots.historyLines.list` — the shell calling `list(effectiveKey())` each time it draws the group and re-listing on each `onChange` and each `onEffectiveKey` — over handing `effectiveKey` and `onEffectiveKey` to the embed's bridge handler or letting the handler compute its own key, because V09 §2.10 makes the shell's computation the only one and hands it only to the clerk slot, the shell already re-draws its panels on `onEffectiveKey` (V09 §2.7), the View as menu is the shell's and the handler would never see it change, and a provider that is given its key keeps no View-as state of its own |
| J-V9.115 | chose one **New decoration** control writing `style.jitter` then `style.crowns` as one group, over two controls or folding `style.crowns` into **New trees**, because the base's own word for the pair is "decoration" (§7.4's `rerollLayer` row), J-V9.101 fixed New trees' bytes to `render.instances` alone (which volume 10's `restyle` encodes), and one plain button suits the owner's reader; the group's history is one row, and volume 10's `restyle` takes the same group as one value, `'decoration'` (V10 §4.1's T12 `dress` row; J-V10.99); found beside it, the `rerollLayer` template gains "New emblem" and "New compass", which the two buttons wrote with no words of their own |
| J-V9.116 | chose to render the `{ id }` arguments of the report-entry lines and of the report panel's two lists by band-less `entity` reads at `effectiveKey()`, a withheld address shown as its `kind.<registry kind>` word and left out of the line's targets, over the role's key or dropping the line as a withheld note line is dropped, because V09 §2.7 makes every band-less read speak for its view, a report entry says that something changed (which the viewer may know) while its name is the secret, and the kind word is how the gazetteer and the why card already show a withheld place; V09 §2.9's `MsgRef` comment now separates the engine-built messages (the caller's key, the role's for the application's own dry runs, J-V9.86) from the lines a panel builds (the view's key) |
| J-V9.117 | chose to read the dwelling closure's way in and the epoch's fired suppressions at their homes — V04 §3.8's closure and V06 §2.10's `EpochReport.raised.suppressedFired`, filled by V06 §3.19.3 (2) — cited and never restated, because each owner states its mechanism once |
| J-V9.118 | chose to give `bend.under.accessDug`'s alternative a catalogue list form, "Dig down from {building} instead", beside the canvas's stepping **Use another building**, over volume 10 joining that button's text with a building's name, because a card that shows every alternative at once needs one label per building, a joined label is a line no catalogue row holds (V09 §4.9's one-source rule; a locale could not reorder it), and `{building}` is read at the reader's key as every other slot is (the canvas's dry runs at the role's key, J-V9.86; the clerk at its session key) |
| J-V9.119 | chose to cite the raised-way reading as `RaisedOutcome`'s reason key (`key`, V06 §2.13's `RaisedReasonKey`) with its `declared` outcome and V10's `raised[].reason`, over a `RaisedOutcome.reason`, because V10 §2.13's type names no field `reason` and a citation must name a field its target holds; and to carry the drawer's companions to three places — V09 §2.10's viewer sentence and V09 §4.11's *Knowledge and roles* (`refuse.viewer`, `clerk.view.cleared`) and the card-only drawer's stale card (no **Ask again**, since V10 §2.6's host card offers no `retry`) — because every key V09 §4.9's table loads needs a place the drawer draws it (the one-source rule; the wiring standard) |
| J-V9.120 | chose to cite V10 §3.5 step 3's *The why target* for the canvas's **Show me why** (V09 §4.9's opening rule) over keeping this volume's looser wording beside it or moving the rule here, because volume 10 wrote it once for both readers with each one's key (the canvas's the role's key, J-V9.86; the clerk's its session key), the canvas and the clerk must open one card or page for one row (T101-3), and a second statement could drift (the one-source rule); the canvas's build (AP3) implements the rule from that text |
| J-V9.121 | chose the typed button list (`MsgRow.buttons?: MsgButton[]`, the words in a shared `button.*` family, V09 §4.9's button column written as the list, every `refuse.*` row ending with `button.showWhy`) and to add five things its interface lacked, each because a row needed it to be data rather than prose: a sixth class `app` for the buttons of application-only rows (downloads, reloads, the frozen and mismatch choices, restores, shares, the key and cap lines, View as) — commands that are neither a map commit, a why, a selection, a tool nor a withdrawal — never on a row a dry run answers, so the clerk's five-way mapping stays whole; `event` naming one of 21 event forms written once in V09 §4.9, so "the one event the row names" is data both cards build byte for byte; `each`, the list form J-V9.118 already gave the dug-access alternative, extended to **Choose another of the marked places**; `when` for the `[owner]` and `[names]` conditions the prose carried; and `command` naming one of 24 application commands. Also chose to key a `ConflictAction`'s `msg` (file f item 463) as the button that carries it, over a second wording beside the row's, so file f item 463's field keeps its consumer and the clerk's "a dry-run action's own message" label equals the canvas's words; **Move it** as a `show` (the canvas moves a selection by dragging, V09 §4.6); and locale files that carry `text` only, so a translation cannot change what a button does |
| J-V9.122 | chose volume 6's bend over V09 §3.9's disabled control: below a rebase point every copy and re-run — the history and chronicle rows, the restore points and the drawer's `fork` and `rerun` — takes the earliest seq with V06 §3.15.5's line as `info.copy.condensed`, loaded from volume 6 like volume 10's families, and the app detects the bend from the new document's `forkedFrom.seq` exceeding the seq asked rather than from a new return field, because V06 §4.4 already records that header and a second channel would restate it (J-V6.98; the one-source rule) |
| J-V9.123 | chose to withdraw two buttons found unwired rather than invent a source for each: `bend.capacity`'s "Show larger buildings nearby" (no query or preview field names buildings with room — file f item 463's `alternatives` are a placement's plots — so the row offers **Show me why**, whose why card shows the building's capacity) and `success.saved`'s "Show" (a page cannot reveal a saved file on the user's device); and, beside them, to give `refuse.stale` **Show me why** and put `refuse.undo.dossier`'s **Show me why** last, as the rule made data requires, and to read `bend.place.noSite`'s other sites as `PreviewResult.alternatives`, as file f item 582 bends them, not as `moveTo` actions |
| J-V9.124 | chose to name tool modes by a rule — each mode's name in its row in lower camel case, T9 `shape`'s contextual modes by what is selected — with the ids the buttons open written out (T6 `place`'s `access`, T9's `tiers` and `massing`, T11 `name`'s `rename`), over a separate id table, because `toolkit.json`'s rows already carry the names; and to state the why page's id forms, `messages#<key>` for a row and `staged/<layerId>` for a staged layer (generated by `@plat/docs` from the base's staged table), because V10 §3.5 step 3's target rule and `refuse.staged`'s `page` need an address both cards open and T-V9-32 can walk |
| J-V9.125 | chose to scope the roster reader and T6 `place`'s stamp palette to the classes the document's rung admits — the town-and-city, sky and generic rows at a base rung; the `v.` rows, the self-playing town-and-city rows and the generic rows at a village rung, a row with a `villageForm` answering through its `v.` row — with ties by `commonness` inside that set and a `v.` row first at a village rung, over one match across both namespaces with a tie on `commonness`, because volume 11 makes a label unique only within its namespace (45 words shared by script), the two `commonness` cells mean different shares (TOWN over about 180 rows, VILLAGE over 25), and a village class declared on a town map is a wrong declaration the user never asked for. |
| J-V9.126 | chose an English-only argument form `{a slot}` for the indefinite article, its rule written once in V09 §2.9, with each locale writing its own grammar in its `text`, over an article in every template or a per-locale article table, because the article depends on the slot's first sound and only English's rule is ours to state; V08's templates carry no article |
| J-V9.127 | chose to drop the untouched empty-state town when a creation proposal replaces it — no local record, no Recent entry — over writing it to Recent as a recipe-only record, because it holds no declaration of the user's (V09 §3.2) and one rule for every way the empty state is replaced (Enter, Surprise me, a proxy, T1 `intend`, the clerk) is simpler than two; V10 §4.2 (3) reads the same (a cross-part note) |
| J-V9.128 | chose to put **Colour vision** in the view bar's Map group and in Settings' Accessibility section, the view key per viewer and a machine default `AppPrefs.cvdDefault` for towns that hold none, over a per-town setting only or a machine setting only, because a person's colour vision belongs to the person across towns while a shared town's viewers differ, and item 112 (a) asks for a view setting |
| J-V9.129 | chose to word a hand design above the grandeur ceiling from the shell's own read of the ceiling table against the draft's events, with the building's why card carrying the same line, over a new dry-run field, because the ceiling is a table the application can read as it reads a deck's budget, the edit is honoured and nothing is bent, and a base field would restate what the table and the events already say |
| J-V9.130 | chose a week slider with the four season chips at their middle weeks and a **Follow SettlementForge** switch that any manual pick turns off, over a four-way season chip, because item 117 (b) makes the season a week of the year and a pick against the campaign's week must not silently snap back at the next absorb |
| J-V9.131 | chose to name the progress view's stages by thirteen groups, a volume's main-phase stage taking the group of the base stage before it in the registry's order and every tail stage `below`, over one row per stage id, because a user reads "laying out the streets", not a stage id, and every registered stage then has words without a volume writing any; the strip names what is running and never a finished map before it is (§8.5) |
| J-V9.132 | chose the History chip's standalone form as a peak rung and an age, over offering destruction and refounding by hand, because item 113 names the standalone option "once a city, now a village" and a destruction is the dossier's or the replay's event, not a blueprint choice; `history.defaultAgeYears` (300) is our own and calibratable |
| J-V9.133 | chose to offer T2 `ground`'s **Spring-fed (oasis)** toggle on every ground site and hide it on Sky, over offering it on arid sites only, because item 111 (d)'s "oases only on arid sites" binds generation — "unless drawn or supplied" — and an island's water is V05's |
| J-V9.134 | chose to offer only robust repair on a `worn` or `patched` run and the patch rows on a `breached` run, over every material on every run, because V06 §2.8's `repairWall` turns a breach into a patch and a worn or patched run robust into standing, and a patch over a wall that still stands is not a transition the ladder has |
| J-V9.135 | chose to state every mechanism's limits in one table, V09 §3.16, with one scripted suite, T-V9-80, over scattering them through the sections, because an edge is checked by the same harness whatever its mechanism and one table shows a missing one at a glance; each row names its home section |
| J-V9.136 | chose V02 §1b's bend ids as the one set of the massing bends — retiring this volume's `bend.tiers.flights`, `bend.stack.internalSolid`, `.removeStair`, `.addWing`, `.deck` and `.notStepped`, the event form `giveTiers` and the buttons `button.giveTiers`, `button.changeStairs` and `button.plotsOnLand` — over keeping two sets, because the producer of a bend owns its id and a key no producer emits is a row no user can see (V09-XAGREE-3) |
| J-V9.137 | chose to journal `advance` as one entry — its request, and the count of epochs where Stop ended it — re-issued at recovery from its `logHeadBefore`, with a compaction at once after its `done` write, over journalling its `epoch` events or leaving it to the idle compaction, because the epochs are the deterministic result of the request at its head (§6), no API call appends `epoch` events but the request itself (V06 §2.3), and the at-once compaction leaves only a kill inside that compaction to the re-issue, so a century of history is never lost silently (V09 §3.8) (**amended by J-V9.149**) |
| J-V9.138 | chose to dock Find as a 320 px panel at the map region's left edge on the wide layout, beside the context panel, and on medium as a sheet that folds to a one-row chip strip whenever the context sheet or the drawer opens, over Find in the context panel's place, because item 120 (a) keeps the filter on while the user selects, inspects and edits, and a fold never ends it |
| J-V9.139 | chose type-ahead over the classes present only (V09 §4.16 (3)'s matcher with prefix matching on), at most eight suggestions a group, over suggesting every lexicon word, because item 120 (b) offers nothing the town lacks and a kind the town lacks would be a chip dark from its first moment |
| J-V9.140 | chose to fold the Coverage view into Find's **Show gaps** — every Coverage behaviour kept (a class's units by its `CoverageSpec`, gaps dashed and labelled, knowledge-filtered, drawn over any view) and a stored `thematic: 'coverage'` opened as Show gaps with no chip — over keeping both, because item 120 (i) makes them one mechanism "so the two never coexist" |
| J-V9.141 | chose the view-status chip at the view bar's right end, its tooltip giving the level's reason in one of four words (the screen, the memory, the frame rate, the ceiling) with the tier and the tile density, a click opening Settings › Display, over a line in the report, because item 121 (a) asks the view status to say why Auto chose a level and J-R22's view status already lives in the view bar |
| J-V9.142 | chose **Show crises** as a switch beside the thematic views, not one of them, with **Preview a crisis** offered on every map and a non-modal crisis card, over a thematic view of crises, because a look covers the whole map and must coexist with Wealth or Find (item 122 (e)), item 118 (b)'s festival preview — the pattern item 122 names — is offered on every map, and the forces' numbers need a place beside the why line (item 122 (i)) |
| J-V9.143 | chose one damage line per damaged element kind, in a fixed order (the roof, the floors and a storey gone, the walls, the openings, the stairs, the furniture, the unsafe rooms, below ground the cellar and the crypt), naming three rooms at most, over one line per element, because item 123 (e)'s example ("roof fallen in over the hall; the upper floor is gone") reads by kind and a ruined building has hundreds of elements |
| J-V9.144 | chose Weather effects on by default on §8.8's mid, high and ultra tiers and off on the low tier and under reduced motion — no phone default, since no map is offered on a phone (item 126 (a2); R2-41) — with Start a shower now enabled only while the effects are on, over one default for every device, because item 124 (g) ties the default to the tier's headroom and the system's request to reduce motion |
| J-V9.145 | chose to give the undo refusals E-07's own actions — **Move it** and **Not here** for a dossier element the event placed or re-designated, the rename button only for a dossier rename, **Remove the assignment** for a blueprint assignment — through an optional clause (`{; name}`) and a `dossier` button condition in `MsgButton`, over a row per case, because one row per refusal key keeps the catalogue's one key per outcome and the clerk's cards read the same buttons (V10 §3.5 step 3; VAH-r1-04) |
| J-V9.146 | chose to give an island's rim handles two modes on the island panel's rim chip — **Resize** (the default, `resizeIsland`, J-V9.47) and **Reshape the rim** (`moveVertex` on the rim vertex in the island's arena, with V05 §4.2's `bend.island.rimStop`) — over one of the two, because V05 §4.2 offers a uniform resize and a local reshape as distinct edits and §7.1 homes T9 `shape`'s `moveVertex` on an island's key, which no other gesture reaches (VAT-08) |
| J-V9.147 | chose to offer **Re-derive people** on the People panel for the households its rows name and on a person's card for that one household, previewed with its fates, over a control in the advanced panel, because §10.3's re-derive people acts on households and the People panel is where they are chosen (R2-22; VAH-r1-03) |
| J-V9.148 | chose, on a dossier with no stamped tick, to keep the season control's own week (midsummer by default) with the follow switch on and a line saying the week is the map's, the first tick an absorb brings moving it, over refusing to follow or snapping to week 0, because item 125 (a)–(c) makes the dossier the only data input and the season control its fallback |
| J-V9.149 | chose to re-issue an advance that Stop ended with `advance`'s `stopAfter` (its journalled count; §11.2, R2-42) over a timed `cancelAdvance` on the job's progress, because no progress message reports the first epoch running and a cancel crossing threads may land after the next epoch starts, so only a count reproduces the journalled `logHeadAfter` (VV910-r1-02) |
=== END ===
