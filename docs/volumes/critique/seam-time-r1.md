# Seam check, round 1 — evolution (V06) against every stage it changes (V01, V02, V03, V04, V05, V07, the base, file f)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/seam-time-r1; covered by the whole-design retrovalidation (J84).

Lane `volumes/seam-time-r1`, 2026-09-29. Reconciliation round 1 of the time seam: (A) re-check every issue of round 0
(`docs/volumes/critique/seam-time-r0.md`, ST-01..ST-59) against the reconciled volumes — each must now be fixed; (B) sweep
the whole seam again, since the repairs elsewhere can break it.

PROGRESS
- §1 Method, inputs and scope: done
- §2 Round-0 re-check (ST-01..ST-59: FIXED / PARTLY / NOT FIXED / REGRESSED): done
- §3 New issues from the sweep (TR-01..TR-25): done
- §4 Summary counts and CONFIRMED versus PLAUSIBLE: done

## 1 Method, inputs and scope

**Inputs (as read on 2026-09-29, 04:15–04:34).** `docs/volumes/V06-evolution.md` (3 728 lines, md5 dd1409c6… — the
reconcile-V06-r1 landing plus four exact-string edits by reconcile-V11-r1, SS-13), V01 (3 571, 8b8a40eb…), V02 (4 184,
c459dd4d…), V03 (2 953, a7b65077…), V04 (3 372, 78e40951…), V05 (3 303, 25b0b541…), V07 (3 305, 4b7155ac…),
`docs/volumes/_integrate.md` (365, 1487de32…), `docs/AMENDMENTS-2026-09-28f.md` (1 076, 40e2f8d6…), the base
`docs/ARCHITECTURE.md` (md5 01fea21f…, unchanged since round 0), and round 0 (`critique/seam-time-r0.md`, 834 lines).

**How the seam was read.** Round 0 read every seam file whole at its 02:19–02:29 state. This round read, whole:
(1) **every line that changed since round 0**, from the diffs of each seam file against the reconcile lanes' own
pre-edit backups (V01–V05 at 03:15–03:18, V06 and V07 at 03:33 before the base-change lane's volume halves, `_integrate`
at 03:34, file f at 03:18) — so every repair, and every sentence a repair could have broken, was read in full; and
(2) **the seam's sections in their current enclosing text**: V06 §2.1, §2.4, §2.12–§2.13, §3.1–§3.6, §3.8, §3.18,
§3.19, §5.3, §13's hand-off table and both reconciliation notes, the Integration notes, W73–W78, T-V6-66–69 and
BCR-V6-7, -10, -16, -18, -26, -27; V04 §1b.2's function rows, §3.4 F6, §3.5.1 (5)–(10), §3.5.5, §3.5.7 (a) and *With a
scope*, §3.10–§3.12 and BCR-6; V05 §3.15 and §3.16 (4)–(8); V07 §2.1, §2.2's `epoch` block and row, §3.12 whole,
§3.16 (4)–(5), BCR-V7-18 and BCR-V7-32; V01 V1-3.3.6, V1-3.5.11 and V1-3.17.2–3.17.7; V03's crypt-rank rows (2.1, 3.7.4,
the §1b and lifecycle rows); V02 §3.17 (b)'s rows, J-V2.89 and X23; file f items 202, 209, 244–246, 260, 264, 268, 275,
317, 319, 322, 409, 443 and 447 with its closing notes; `_integrate` J-VI.2, J-VI.5, J-VI.14, J-VI.16 and H3; the base
§4.11 step (6), II.7.3 (c), §2.8's decline hooks and §3.4's stretch and knot-profile rules. Outside the brief's list, a
sentence was opened only where a seam row names it: V08 §2.6a (4) and §3.6 (3) (the calamity deaths), V10's clerk digest
(the raised way's `source`), V11 §3.5.1 (the `church-family` tag) and the workflow's `_finalize` brief (who writes the
file-f item routed to it).

**Method.** (A) Every round-0 issue was traced to the sentence its required change names, on **each** side of the seam
— the owner's fix and the counterpart sentence the owner's lanes handed to a sibling — and graded **FIXED** (both sides
now say one thing), **PARTLY** (the owner fixed its side, a counterpart sentence still disagrees; the residual is a new
issue of §3 naming its owner) or **NOT FIXED**. (B) The sweep then asked of every piece of state the repairs added or
moved — the fold's product and rung, `ProductEpochRows`, the hollow-way ops, `repairRetaining` and the restoration,
the landfall candidate and `Way.formerClass`, the new suppression kinds, the deck's condition, `Foundations.apply`, the
relocation into void dwellings, `EpochScope.workings` and `.recut`, `CalamityRef.deaths`, the crowding hook's new gate —
the brief's three questions: its epoch behaviour, its transition stage (step and participant) and its undo, and whether
a producer and a consumer exist on both sides. Line numbers (`l. n`) are the files' as read today.

**Scope limit, stated so it is not mistaken for coverage.** Text unchanged since round 0 was judged by round 0's whole
read; this round re-read it only inside the sections listed above. No finding below rests on a sampled line: each was
re-read in its enclosing subsection on both sides before it was written.

## 2 Round-0 re-check (ST-01 – ST-59)

**Result: 44 FIXED, 15 PARTLY, 0 NOT FIXED, 0 REGRESSED.** Every owner applied its own side; the fifteen PARTLY rows are
counterpart sentences in a sibling that the owner's required change named (or that the owner's lane handed off) and that
no lane applied — mostly because the sibling's lane landed before the owner's (V04 03:39 and V05 03:34 before V06 03:57)
or the hand-off went to a volume whose lane had already closed. Each residual is a §3 issue (TR-nn) with its owner.

| id | sev. (r0) | owner (r0) | status | evidence now | residual |
|---|---|---|---|---|---|
| ST-01 | blocker | V06 | PARTLY | V06 fixed throughout (`EpochContext.product`/`.rung` l. 489–490, §3.1 (3)–(4), §3.2 row 1, §3.3.2, §3.18.2 (1), §3.19 (C), W37, T-V6-51, J-V6.97); V07 §2.1 l. 427 and BCR-V7-18 (l. 2996) still choose the phases by "the rung at the epoch's target" | TR-01 |
| ST-02 | blocker | BASE-F | FIXED | file f item 317 reads "the product the epoch's fold gives (item 322 …)", *Note* applied after 322; item 322 *Needed by* V06, V07, V08 and applied before 317 | — |
| ST-03 | blocker | V04 | FIXED | V4 §3.5.1 (5) (the primary a reading; `CatacombGrowth.grow(doc, epoch, opts?: { capM2; primary })`), §1b.2 l. 374, §2.2 `rank` comment, T-V4-52's overtaking fixture, J-V4.95; V6 §3.18.2 (3a) agrees | — |
| ST-04 | major | V05 | FIXED | V5 §3.2 (6) "A count never releases a hold", §2.1 `releasedBy`, §2.6 row, §3.15 (5), J-V5.62 | — |
| ST-05 | major | BASE-F | FIXED | file f item 260: islands and accesses in volume 5's record form, never `detail.suppress`; one lift rule; the union widened | `_integrate` J-VI.14 still reads the old form — TR-24 |
| ST-06 | major | BASE-F | FIXED | file f items 244 and 447 (source derived, `generated`·`declared`; no `carried`, no `foundedRung`); `_integrate` J-VI.2 and V01 IN-V01-4 follow | V10's clerk digest keeps `'carried'` — TR-25 |
| ST-07 | minor | V07 (+ V06 wording) | PARTLY | V07 `RaisedRead.spans.state` `'standing'\|'ruined'\|'cleared'`, `origin` derived (l. 946–951); V06 still writes "breached span/way" (l. 395, 708, 930, 2294, 2423, 2475, 2478) and §3.19.1 (3)'s "every span standing, abandoned or breached" (l. 2418) | TR-15 |
| ST-08 | major | V02 | FIXED | V2 §3.17 (b) (l. 2356–2360), `raised.clearCm` withdrawn (§1b l. 265, §12 l. 1884), X23, J-V2.89 | `_integrate` J-VI.5's V06 consequence and H3 still carry the withdrawn rule — TR-24 |
| ST-09 | minor | V06 | FIXED | IN-V06-2 edited (every building in the supports and strip, cause `clearance`) | — |
| ST-10 | major | V06 | FIXED | V6 §3.19.4 (6) Restoration, `repairRetaining` (§2.8, BCR-V6-5), W77, T-V6-62, J-V6.101; V05 §3.16 (4) and V07 §3.12 cite it | — |
| ST-11 | minor | V07 | FIXED | V07 §3.12 cites V6 §3.19.4 (3) for the decay and (6) for the repair | — |
| ST-12 | minor | V05 | FIXED | V5 §3.16 (4) "steps to `decayed` … until an epoch's restoration re-derives it (V06 §3.19.4 (6))", J-V5.64, T-V5-14 | — |
| ST-13 | major | V06 | PARTLY | V6 §3.5.2's `landfall` kind, W76, T-V6-66, J-V6.99 written; but V05 never writes the `formerClass` the clearance restores (X26 reached V05 after its lane closed), the kind clears only ways, walls, plots and reservations while V05's decoration also holds land uses, raised spans and piers, and no op returns the accesses V04 bricks under the rubble | TR-04, TR-05, TR-06 |
| ST-14 | major | V05 | FIXED | V5 §3.16 (4)–(5): deck plots tombstoned with the deck, never decoration members; T-V5-14 | — |
| ST-15 | major | V06 | FIXED | `suppress.kind` gains `retaining` and `deckPlot` (V6 §2.13, BCR-V6-24, §3.19.3 (7), §3.19.4 (1), §3.19.5 (1), §3.8.2 (5)); file f item 260 follows | — |
| ST-16 | major | V04 | FIXED | V4 §3.12's exception list (source, openings, overlap shafts, crypt join — no epoch component); §3.5.1 (3), §3.5.7 (a), (e) say so | — |
| ST-17 | major | V04 | FIXED | V4 BCR-6's new text (its own lottery after the fabric pool), §1b.2 l. 379, §3.10 *Its own lottery*; file f item 319 *Needed by* V04, V06 | — |
| ST-18 | major | V06 | FIXED | V6 §3.2's `under.extend`/`under.access` rows and the feature paragraph; §3.18.2 (5) lists `rung`; T-V6-51 | V04's maintenance-mode list omits the foundation rule V06 now runs at a village rung — folded into TR-07 |
| ST-19 | major | V06 | PARTLY | V6 §3.18.1 (4) *Whose households*, §3.6 (1), W73, T-V6-52, J-V6.100 written; V04 §3.10 still seats an epoch's F6 dwellings "through the epoch's S7b (6) void part" (l. 2027–2028), and the crowding hook's new void gate has no base change request | TR-08, TR-09 |
| ST-20 | major | V06 (with V04) | PARTLY | V6 §3.18.1 (6), §3.2's `under.extend` row, X25, T-V6-67, J-V6.104 call `Foundations.apply(doc, scope, cause)`; V04 exports no such function (§1b.2 has only `foundationObstacles(doc)`, l. 346, 370) and its `under.extend` order (§3.10 l. 1962–1965) has no foundations act | TR-07 |
| ST-21 | major | V04 | PARTLY | V4 §3.5.1 (8) holds the full list "stated here once, volume 6 citing it"; V6 §3.18.2 (5) (l. 2227–2230) still restates a shorter list (no `ruined` use, no removed churchyard part) | TR-13 |
| ST-22 | major | V04 | PARTLY | V4 §2.6's row and §3.11's `W_RUIN_SOURCE_REMOVED` row fixed; V6 §3.18.1 (1) still states only a later source's arrival (V04's hand-off asked it to add the removal) | TR-17 |
| ST-23 | major | V04 | FIXED | `QuarryWorkings.extend(doc, scope, epoch)` and `workedOut(working, scope?)` in V4 §1b.2 and §3.5.3, callers V06's `under.extend` and candidate list | V06 never names either function — folded into TR-18 |
| ST-24 | major | V04 | FIXED | V4 §3.5.1 (3) counts island churches once (T-V4-50); V6 §3.18.2 (1) cites it | — |
| ST-25 | major | BASE-F | FIXED | file f item 209 absorbs BCR-V7-22 (one `retypeLand` with `crop?`, `rotation?`); V07 renamed (l. 3240), V06 §2.8 follows | — |
| ST-26 | major | V06 | PARTLY | V6 `ProductDeclEpoch.rows` typed `ProductEpochRows` (l. 460–467), §3.5.2 *The product's rows*, §3.5.3 (1), `EpochContext.productRows`, W75, J-V6.103; V07's `village.json` `epoch` block (l. 469–470, table row l. 532) delivers neither that shape nor class-id keys | TR-02 |
| ST-27 | major | V07 | FIXED (V07's side) | V07 §3.12, BCR-V7-32 (a)–(b), J-V7.98: the per-year rate, the land-class list at village rungs, `retireWay`/`effaceWay`/`reopenWay`, decks by V6 §3.19.5 | V06 issues only `retireWay`: no efface, no reopen, and not V07's disuse test — TR-03 |
| ST-28 | major | V06 | PARTLY | V6 §3.2's participant table (`village.density`, `afterField`, 20), §2.1, W3, T-V6-26 both directions; V07 §2.1 states neither participant's step and order (only a comment, l. 415) | TR-21 |
| ST-29 | major | V06 | PARTLY | V6 §3.18.1 (2c), `EpochScope.workings`, W74, T-V6-68; V04's `AccessPass.run` with a scope (V4 §3.5.7 *With a scope*) never reads `scope.workings`, and its mine breach joins cavern galleries from quarry-part workings only | TR-12 |
| ST-30 | major | V06 | PARTLY | BCR-V6-27 written (V6 §10, l. 3500–3509), `CalamityRef` typed (§2.4); file f has no item for it (its close note, l. 1038, leaves it to the finalize pass) | TR-23 |
| ST-31 | major | V06 | PARTLY | `CalamityRef.deaths` (V6 §2.4), §3.18.2 (3) passes the deaths "to `CatacombGrowth.grow` (V04 §3.10 names the input)", T-V6-69; V04's `grow` signature and §3.10 bullet take no deaths | TR-10 |
| ST-32 | major | V06 | FIXED | V6 §5.3 exports item 447's properties plus `plat:why`; BCR-V6-15 (b); file f item 409's note | — |
| ST-33 | minor | BASE-F | FIXED | file f item 447: span `state`, the way's `underuseSince`, derived `source` | — |
| ST-34 | major | V06 (with V04) | PARTLY | V6 §3.19.4 (1) tombstones the walls in the `raiseGrade` batch, X14, J-V6.106; V4 §3.5.5's buried-town builder (l. 1632–1640) has no floor-step rule | TR-11 |
| ST-35 | major | V06 | FIXED | bends in §2.3, §2.8, §3.7.5, §3.15.5, §4.2, §4.4 (l. 2723), T-V6-11, T-V6-22, J-V6.98 | W55 (l. 387) still says "the refusals of `forkAt` and `rerunFrom`" — folded into TR-15 |
| ST-36 | major | V06 | FIXED | BCR-V6-10: the death week, `Person.key.bornWeek` | — |
| ST-37 | major | V06 | FIXED | BCR-V6-7 (a) "one per arena"; BCR-V6-13 follows | — |
| ST-38 | major | V06 | FIXED | V6 §3.19.5 (3) "a strike `ruin`s it"; BCR-V6-26's deck member | — |
| ST-39 | major | V03 | FIXED | V03 3.7.4 (3), 2.1's comment, the capped-bays rows (l. 281, 886), T-V3-23 (h), J-V3.107 | — |
| ST-40 | major | V06 | FIXED | V6 §3.19 (2)–(3) cite V11 §3.24.2's rows and its "chance, stated once"; the defaults table withdrawn; X20 answered | — |
| ST-41 | major | V06 | FIXED | V6 §4.1's lone-neighbourhood gate, §5.3's skeleton clause, T-V6-23, J-V6.102, §13's recorded staging; V01 J-V1.36 agrees | — |
| ST-42 | minor | V06 | FIXED | `RaisedWayLedger.kinds.declared` comment (l. 845) | — |
| ST-43 | minor | V06 | FIXED | §2.12's `detail.why` row (l. 809) | — |
| ST-44 | minor | V06 | FIXED | V6 §3.18.2 (3) cites V11 §3.23.8; X1 | — |
| ST-45 | major | V06 | FIXED | V6 §3.11.3 (l. 1794–1798): V04's reach and admission, else `W_VOID_UNDER_WATER`; T-V6-17 | — |
| ST-46 | minor | V06 | FIXED | V6 §3.4 (4) reads the sampler's cap; `shade.maxDistM` gone (§2.2 l. 561) | — |
| ST-47 | minor | V06 | FIXED | V6 §6.5 (l. 2935–2936) | — |
| ST-48 | minor | V05 | FIXED | V5 §3.16 (4) (l. 1441–1442) | — |
| ST-49 | major | V05 | PARTLY | V5 `shadeBasis?` optional (l. 400), §3.15's shade paragraph, J-V5.72, T-V5-21 (h); V05 relies on "volume 6's building mask on its lattice likewise starts at the next field phase", which V6 §3.4 (8) (b) does not state | TR-16 |
| ST-50 | major | V04 | FIXED | V4 §1b.2's caller rows and §3.10's intro name V06's participants, steps and orders | `Foundations.apply` missing — TR-07 |
| ST-51 | minor | V06 | FIXED | V6 §3.8.2 tier (5), §3.19.5 (1) cite V11 §3.24.4; X20 answered | — |
| ST-52 | minor | V06 | FIXED | V6 §1.2's participants row (l. 273) | — |
| ST-53 | major | V01 | FIXED | V1-3.17.4's epoch clause, V1-3.3.6 (3), V1-3.17.7 (3), J-V1.79, T-V1-39 | the commit's own plot removal is left implicit — folded into TR-20 |
| ST-54 | minor | V06 | PARTLY | V6 §3.2's `hood.fabric` row and `EpochScope.recut`; V1-3.3.6 (2) still finds the re-cut blocks in the document and names no `recut` input | TR-20 |
| ST-55 | minor | V06 | FIXED | V6 §3.18.2 (1) cites V04 §3.5.1 (3) and V11's `count` row | — |
| ST-56 | major | V06 | FIXED | BCR-V6-26's deck member, §2.12's row, §3.19.5 (3), W78; file f item 246 | — |
| ST-57 | minor | V07 | FIXED | V07 §3.12's hand-off down (islands continue V05's steps) | — |
| ST-58 | minor | V07 | FIXED | V07 §3.12 hand-off up (6) (V6 §3.18.2 (1), V11 §3.23.8's rows) | the same critique citation survives at l. 243 and in FL-2 — folded into TR-21 |
| ST-59 | minor | V06 | FIXED | IN-V06-7 | — |

## 3 New issues from the sweep (TR-01 – TR-25)

Severity as round 0: **blocker** (the seam cannot be built as written, or an owner rule fails on it), **major** (a
contradiction or an unwired piece a builder would hit), **minor** (wording, a restatement, a stale pointer). Each names
one owner (V01–V12, or BASE-F for file f or the integration ledger) and the exact change. Residuals of round-0 issues say
so; the rest are new. No blocker was found: every repair of round 0's three blockers holds on both sides except for the
wording residual TR-01.

### 3.1 Majors

**TR-01 — V07 still chooses the epoch's phases by the target's rung.** major · contradiction · **V07** (residual of
ST-01/ST-02).
V07 §2.1's last paragraph (l. 427) — "at an epoch the rung at the epoch's target chooses the phases (§3.12)" — and
BCR-V7-18's mechanism (l. 2996) — "the runner takes the phase registered in `ProductDecl.phases` by the product that owns
the rung at the epoch's target" — contradict V07's own hand-off band two paragraphs earlier, V6 §3.1 (3)–(4) and file f
items 317 and 322: a 1 440-person town (the fold: TOWN) would run the village's `siting` and `growth`.
*Required change (V07):* l. 427 reads "at an epoch the product and rung of the fold above (the hand-off band; BCR-V7-26)
choose the phases (§3.12)"; BCR-V7-18's mechanism reads "…by the product the epoch's fold gives (BCR-V7-26; file f item
322), else the engine's", with the note that file f item 317 absorbs it into BCR-V6-1.

**TR-02 — The village's epoch rows do not have the shape the engine reads, and key classes that no longer exist.** major
· record · **V07** (residual of ST-26).
V6 §2.1 (l. 460–467) types the rows a product's `ProductDeclEpoch.rows` names as `ProductEpochRows { persistence?:
Record<class id, number>; street?: { classes: WayClass[]; op: 'downgradeWay'|'retireWay' }; hinterland?: { slack; order:
'farmstead'|'perimeterPoorest'; cap: 'rungPerSpan'|'greatFieldPerEpoch' } }`, read by §3.5.2 and §3.5.3. V07 §2.2's
`VillageRungRow.epoch` (l. 469–470; the row at l. 532) is `{ encroachShareMax; newNucleusShare; persistence: { church;
manor }; arableSlack }`: no `street` cell (the classes and the retirement op V07 §3.12 says the rows carry), no
hinterland `order` or `cap`, the slack under another name, and `persistence` keyed `church` and `manor`, which since
J-V7.95's namespace are not class ids (`v.parish_church`, `v.chapel`, `v.manor_house`) — nor do they reach the base-class
churches and manor a town handed down still stands on, whose outliving the village is the rule's point. A builder
resolving the rows finds no cell the engine reads, and the village's decline runs the town's rules.
*Required change (V07):* `VillageRungRow.epoch` gains `rows: ProductEpochRows` (V6 §2.1's type, cited not restated):
`persistence` keyed by class id — every class V11 §3.5.1 tags `church-family` (`cathedral`, `great_temple`, `church`,
`chapel`, `monastery`, `generic-worship`, `generic-monastic`, `v.parish_church`, `v.chapel`) × 0.3, and `v.manor_house`,
`manor`, `tower_house` × 0.5; `street: { classes: [through, primary, secondary, lane, alley, cul_de_sac, track, path],
op: 'retireWay' }` with TR-03's `again: 'effaceWay'` and `reopen: 'reopenWay'`; `hinterland: { slack: 0.2, order:
'perimeterPoorest', cap: 'greatFieldPerEpoch' }` — replacing `persistence { church; manor }` and `arableSlack`
(`encroachShareMax` and `newNucleusShare` stay: V07's own siting reads them); `ProductDecl.rows` (l. 417) names this
cell; the table row (l. 532) and §3.12's `epoch.persistence.church`, `.manor` and `epoch.arableSlack` citations follow.

**TR-03 — The hollow-way ladder has one issuer for three ops, and retirement skips V07's safety test.** major · unwired ·
**V06** (residual of ST-26/ST-27).
V07 §3.12 and BCR-V7-32 (a)–(b) (J-V7.98) define the ladder: a disused land-class way is retired (`retireWay` →
`abandoned`, a hollow way that no router reads), a hollow way struck again is effaced (`effaceWay` → `decayed`), and
regrowth reopens it before laying a new track (`reopenWay` → `built`) — "issued through the product's epoch rows (volume
6's `ProductDeclEpoch.rows`)"; its disuse test also excludes "an entry, approach or landing, so no route beyond the frame
is ever cut". V06 is the only issuer of epoch ops, and: (a) `street.op` is one op (l. 463) and §3.5.2 (l. 1158–1162)
issues only it, so a hollow way struck again is re-issued `retireWay` or is never a candidate — `effaceWay` has no
issuer; (b) tier (5′) (§3.8.2) issues only `upgradeWay` for a downgraded lane — `reopenWay` has no issuer on the base
product's path, so the hollow ways of a village that grew into a town stay retired for ever, and V07's own siting
(8v) points to "V6 §3.8's tier order" for it; (c) the street candidate's test (§3.5.2: fronting plots empty for
`streets.abandonAfterYears`, not a live plot's only access edge) sufficed for `downgradeWay`, which keeps the line in the
network, but `retireWay` removes the way from every router — a retired `through` way carrying the village's entry cuts
the route to the frame.
*Required change (V06):* §2.1's `street` becomes `{ classes: WayClass[]; op: 'downgradeWay'|'retireWay'; again?:
'effaceWay' /* the op a way already in op's result takes when struck again */; reopen?: 'reopenWay' /* regrowth's op
for a way in op's or again's result */ }`; §3.5.2's *The product's rows*: with `op: 'retireWay'` the candidate also
excludes a way carrying an entry, approach or landing (V07 §3.12) and any way whose retirement would leave a gate, a
frame exit or an occupied plot without a path (§5.3's network invariant, filtered before the draw, J-V6.7), and an
`abandoned` hollow way whose dwell band has run since its retirement (keyed with the retirement epoch, V6 §3.16) is a
candidate for `again`; §3.8.2 tier (5′) reads "before tier (5) cuts a plot on a face that a `downgradeWay`d lane or a
retired hollow way bounds, `upgradeWay` or the rows' `reopen` restores it", at every rung (V07's siting override calls
the same tier); BCR-V6-18's "(5′) the upgrade of downgraded ways" adds "and the reopening of retired ones"; T-V6-51 adds
a desertion-and-rise fixture (a hollow way struck twice is `decayed`; the rise reopens it before any new lane; no entry
way is ever retired).

**TR-04 — The landfall never writes the former class its clearance restores.** major · unwired · **V05** (residual of
ST-13).
V5 §3.16 (4) drops every covered way's routing class to `track` "until the first epoch whose clearance (… volume 6's
landfall candidate, V06 §3.5.2) reaches it restores its class" but records no former class. V6 §3.5.2 restores `class`
"to its `formerClass` (which the landfall wrote, BCR-V6-5; cleared by the pair)" and, with none, keeps `track` for ever
(`landfallClassUnknown`); V6 X26 asked V05 for the write after V05's lane had closed. As built, every covered primary
stays a track, V05's own sentence fails and T-V6-66 cannot pass.
*Required change (V05):* §3.16 (4) reads "…its routing class drops to `track`, the class it had written to `Way.formerClass`
(BCR-V6-5) in the `fallIsland` batch — a way that already carries a `formerClass` (a downgraded lane) keeps it — until
volume 6's landfall clearance restores the class from it (V6 §3.5.2), or a hand `setAttr` does"; §1b's landfall row,
§4.2's `fallIsland` fates, §3.16 (8)'s undo (the event's undo restores `class` and the prior `formerClass`) and T-V5-14
follow.

**TR-05 — The landfall's decoration keeps members the clearance never takes, so it never goes.** major · unwired ·
**V06** (new).
V5 §3.16 (5): the `fallen_island` decoration's `members` are "the covered plots, land uses, reservations and ways, and
the covered raised spans, raised-way piers and retaining walls", and §8.2's `fallen` row draws rubble over the members'
faces. V6 §3.5.2's `landfall` kind strikes ways, retaining walls, plots and reservations and "the decoration is
tombstoned … in the batch that removes its last member"; the covered `LandUse` (turned `quarry`, stepped to `commons`
later by the same paragraph) is never removed from `members`, and the raised span and support members are repaired by
`repairRaised` or cleared by `dismantle` (§3.19.2), ops that do not touch the decoration. So a landfall that covered a
field or an arch leaves its decoration for ever, the rubble drawn over land that has become commons, and T-V6-66's
"tombstoned with its last member" fails.
*Required change (V06):* §3.5.2's landfall paragraph adds "a **land-use** member leaves the decoration in the batch whose
`retypeLand` steps its `quarry` face to `commons`; a **raised span or support** member leaves it in the batch of the op
that repairs it (`repairRaised`, §3.19.2 (5)) or clears it (`dismantle`, §3.19.2 (3)); a member tombstoned by any other op
leaves it in that op's batch — each by the same `setAttr` of `members`"; W76, the report's `landfall` counts and T-V6-66
(a fixture that covers a field and an arch) follow.

**TR-06 — Accesses bricked under a landfall are never reopened.** major · unwired · **V06** (new).
V4 §3.10 *Access closures* (SL-30): an access whose ground host a landfall covers becomes `bricked` (cause
`convert:fallIsland`) "until an epoch's clearance restores that host, when it returns to `open` (`locked` where its
`knownTo` is `secret`)", an access's state changing "only with its host, at the epoch or edit that changes the host". The
clearance is V6 §3.5.2's landfall kind, whose ops (a way's class-and-surface pair, a member's release) name no access,
and `under.access` (`AccessPass.run` with a scope, V4 §3.5.7) re-evaluates digs, links and openings, never closures. No
op returns the access: the catacomb stair or grating under a cleared square stays shut, and a lived void whose only
access it was stays `unexcavated`.
*Required change (V06):* the landfall clearance's batch includes, for every `AccessPoint` bricked with cause
`convert:fallIsland` whose ground host is the struck member, the `setAttr` of its state back to `open` (`locked` where
`knownTo` is `secret`), cause `rule:landfall`, by V4 §3.10's closure rule; the member's face enters `scope.surfaceChanged`,
so `under.access` re-derives the excavation reading in the same epoch; W76 and T-V6-66 (an access under the rubble
reopens with its host) follow.

**TR-07 — `Foundations.apply` is called by V06 and exported by nobody.** major · unwired · **V04** (residual of ST-20;
also ST-18's maintenance mode).
V6 §3.2 (l. 949), §3.18.1 (6), §1.2 (l. 273), X25, T-V6-67 and J-V6.104 make `under.extend`'s first act "V04's
`Foundations.apply(doc, scope, cause)` (V4 §1b.2, its epoch caller this participant)". V04 exports only the derived
`foundationObstacles(doc)` (§1b.2 l. 346, 370) and applies its foundation rule "at every derivation" (V4 §3.5.0, §3.5.1
(6)) — at an epoch no V04 stage derives; §3.10's `under.extend` order (l. 1962–1965) begins with the arch-vault
reconcile; and the maintenance-mode sentence (l. 2008–2009, and §3.1's statement of the mode) makes "U-FADE, the
arch-vault reconcile and the undercity's re-read the only changes an inherited system sees", though V06 runs the
foundations at a village rung too.
*Required change (V04):* §1b.2 adds "`Foundations.apply(doc, scope: EpochScope, cause)` | U-SYS | volume 6's
`under.extend` (`afterGrowth` 10), its first act: V4 §3.5.0's rule over the new footprints and basement rings of
`scope.built` and `.basementGrown`, the supports of `scope.raised`'s parts and the footings of `scope.levelled` — a gallery
stretch within reach split out `collapsed`, a chamber covered by at least `collapseShare` `collapsed`, a pillar otherwise;
cause `foundation`, `event` the epoch's seq; returns the collapsed elements and the void dwellings vacated (their
households for the caller's re-homing, V6 §3.18.1 (4))"; §3.10's intro order reads "`Foundations.apply`, then the
arch-vault reconcile, then `SewerStrategy.derive` … "; the maintenance-mode sentence adds "and the foundation rule (a new
footing collapses what it meets at every rung)"; a T-V4 bar gains T-V6-67's epoch-equals-regeneration clause.

**TR-08 — V04 still fills an epoch's void dwellings through S7b.** major · contradiction · **V04** (residual of ST-19).
V4 §3.10 *Access at an epoch* (l. 2027–2028): "a cluster that became `accessible` may take F6's dwellings through the
epoch's S7b (6) void part"; the next bullet: "The crowding hook … sends its households through S7b (6) at the epoch;
U-FRONT places them on the lived runs first, then on reopened ones"; §1b.2's `UndercityEpoch.reread` row: "then F6 over
the clusters `under.access` made accessible". At an epoch S7b does not run over standing districts: V6 §3.18.1 (4) fills
F6's new dwellings by **relocating** the district's poorest-band ground households up to `voidDwellings.share` (never new
households; T-V6-52), and V6 §3.6 (1)'s crowding hook seats on lived runs, reopened runs, then accessible void clusters.
A builder of V04's side allocates new households (ground + underground + sky then exceeds the target) or none.
*Required change (V04):* the bullet reads "a cluster that became `accessible` takes F6's dwellings (V4 §3.4 F6's cut and
arrangements), filled by volume 6's relocation of the district's poorest-band ground households (V6 §3.18.1 (4)) —
never an S7b (6) allocation at an epoch"; the crowding-hook bullet ends "…then on reopened ones, then in accessible void
clusters (F6; V6 §3.6 (1))"; §1b.2's `UndercityEpoch.reread` row names the relocation.

**TR-09 — The crowding hook's new void gate changes a base sentence without a request.** major · bcr · **V06** (new,
from ST-19's repair).
V6 §3.6 (1) and §3.18.1 (4) (ST-19) let the crowding hook seat households in accessible cavern and ruin clusters "at any
rung of the base product, whether or not the town has sewers". The base gates the hook itself: §4.11 *Regrowth-first*
step (6) "(6) new faces of a new stage — where `Features.sewers` is on, the underground crowding hook first sends
`crowdingShare` of the residual's poorest-band households underground (II.7.3 (c), II.7.4, §4.5 S7b (6))" (l. 6552), with
II.7.3 (c) to match. No request in V06 §10 changes it (BCR-V6-16 and BCR-V6-18 touch other sentences), and V04's BCR-6
quotes the same sentence as current and appends to it.
*Required change (V06):* a new BCR-V6-28 on that step — new: "(6) new faces of a new stage — the underground crowding hook
first sends `crowdingShare` of the residual's poorest-band households underground where there is room: on lived and
reopened sewer runs where `Features.sewers` is on, and in accessible cavern and ruin clusters at any rung (II.7.3 (c),
II.7.4, §4.5 S7b (6); item 109 (j) (4))" — and the matching clause in II.7.3 (c); *Needed by:* V04, V06; applied before
file f item 319 (V04's BCR-6 appends to the same step); a J-V6 row records the choice.

**TR-10 — The calamity deaths reach no reader.** major · unwired · **V04** (residual of ST-31).
V6 §3.18.2 (3) adds each `CalamityRef.deaths` of the span to the cemeteries' burials by `burialShare` and "passes this
cap, the primary (3a) and the calamity deaths to `CatacombGrowth.grow` (V04 §3.10 names the input)"; V08 §2.6a (4), §3.6
(3) and X3 route the deaths to "V04's burial growth"; T-V6-69 tests them. V04's signature is `grow(doc, epoch, opts?: {
capM2; primary })` (§1b.2 l. 374, §3.5.1 (5), §3.10) and its need adds only "a plague epoch's burials ×
`plagueNeedFactor`".
*Required change (V04):* `opts` gains `deaths?: number` (the span's calamity deaths, V6 §2.4's `CalamityRef.deaths`
summed over the epoch's events; absent 0); §3.5.1 (2)'s need `A` adds each face's `burialShare` × `deaths` — to the need,
never to the cap; §1b.2, §3.5.1 (5)'s signature, §3.10's bullet and T-V4-52 follow; §1b.1's inputs row cites V08 §3.6
through volume 6.

**TR-11 — The buried town's floor ignores the terrace walls V06 buries.** major · unwired · **V04** (residual of ST-34).
V6 §3.19.4 (1) tombstones every generated retaining wall inside a `raiseGrade` region (cause `convert:raiseGrade`) and
states that "V04's buried-system builder reads a tombstoned wall inside the region as a step in the buried floor, the
storey chambers on its high side taking its high-side datum (V4 §3.5.5)" (X14). V4 §3.5.5 (l. 1632–1640) floors every
chamber at `scarBaseCm + scarGainCm × severity` below the present grade and reads no wall, so a terraced quarter buries
flat and the terraces V06 promises the buried town keeps are lost.
*Required change (V04):* §3.5.5 adds "A `RetainingWall` tombstoned by the same `raiseGrade` batch inside the region (V6
§3.19.4 (1)) is a step in the buried floor: the galleries and `storey` chambers on its high side take floors raised by its
step (`stepProfile` of the tombstone's last state) at their nearest point, a `stair` link where a gallery crosses its
line"; §1b.2's builder row names the tombstones as input; a T-V4 bar adds a terraced-region fixture.

**TR-12 — The village mine breach has no implementer.** major · unwired · **V04** (residual of ST-29).
V6 §3.2 (`under.access`: "V04's `AccessPass.run` over the epoch's scope: … mine breaches (the village workings of
`scope.workings` included)") and §3.18.1 (2c) rely on V04's pass for V07 §3.16 (4)'s rule: at a village rung a mining use's
outside-plot working — no underground element, reaching `mine.workingDepthM` — gives an `AccessPoint` at the working,
cause `mineBreach`, no link, when a cavern **or ruin** element lies within 40 m at a depth it reaches. V4 §3.5.7 (a)'s
mine breach joins only a quarry-part working to a cavern gallery (a heading gallery and a link); *With a scope* reads
`scope.elements`, `.built`, `.basementGrown` and `.surfaceChanged`, never `scope.workings`; §1b.1's `EpochScope` row lists
no `workings`; and V07 names no stage or function for the breach at generation either.
*Required change (V04):* §3.5.7 (a) adds *The village working*: at a village rung each mining use's outside-plot working
(V07 §3.16 (4)) — at generation every one, with a scope those in `scope.workings` — is tested against cavern and ruin
elements within `breachM` at a depth at most its `mine.workingDepthM` row; a hit is an `AccessPoint` at the working,
cause `{ rule: 'mineBreach', system: <the void>, event }`, no link, idempotent by (the working's lineage, the element);
*With a scope* adds "(a)'s village-working test over `scope.workings`"; §1b.1's `EpochScope` row adds `workings`. (V07
§3.16 (4) then cites V4 §3.5.7 (a) in its next round.)

**TR-13 — V06 restates the closed burial face, with a shorter list.** major · restatement · **V06** (residual of ST-21).
V6 §3.18.2 (5) (l. 2227–2230): "a cemetery closes when its use closes, its face is retyped to another land use, the
dossier removes its record, or — a churchyard — its church's use closes or leaves the plot; a church-family use arriving
on that plot reopens the same churchyard". V4 §3.5.1 (8) states the list "here once, volume 6 citing it" and adds a
`ruined` cemetery use and a removed churchyard part; V04's 03:39 hand-off asked V06 to cite it. An adapter built from
V06's text leaves a complex growing under a ruined cemetery that V04 freezes.
*Required change (V06):* the sentence reads "A complex whose burial face V4 §3.5.1 (8) closes is frozen (`blockedBy`
`sourceClosed`: no growth, no change of `fill`) and resumes when V4 §3.5.1 (8) reopens the face"; the epoch statements
(the freeze, the resumption by least disruption, `catacombResumed`, a new cemetery founding only where (1)'s count
allows) stay.

**TR-14 — A retaining wall's condition is per stretch everywhere but in its record.** major · record · **BASE-F** (new).
File f item 245 gives `RetainingWall` one `state?: 'decayed'|'ruined'`, and item 447 exports one `state` per retaining
LineString. Every rule over time acts per stretch: BCR-V6-26's member `{ op: 'breach'|'dismantle'; retaining: Id;
stretch?: StretchRef }` (20 m stretches, V6 §3.19.4 (3)); V6 §2.12's row "model data on the `RetainingWall` record (per
stretch)"; §3.19.4 (6) restores a decayed stretch and lays a new stretch beside a ruined one; V5 §3.16 (4) decays a wall
"over its covered length"; V07 §3.12's house-platform walls decay by stretch. A `StretchRef` is batch-local and never
stored (base §3.4), so no field holds which stretch is decayed: a builder must either decay the whole wall or invent a
store.
*Required change (file f item 245, read with BCR-V6-26):* `state` is a **knot profile** along the wall's chain (base §3.4's
chain attributes as knot profiles, J-K10; knot role `retaining.state`, values `standing` · `decayed` · `ruined`, absent =
standing throughout); `breach`, `dismantle`, `repairRetaining` and V05's landfall write knots at their `StretchRef`'s
ends (placed by `splitThrough`); item 447's retaining clause exports one LineString per run of equal state (`state` absent
when standing); V6 §2.12's row cites the profile.

### 3.2 Minors

**TR-15 — V06's wording residuals.** minor · term · **V06** (residuals of ST-07, ST-35, ST-01).
(a) "a breached span" / "a breached raised way" (W63 l. 395, §2.8's `repairRaised` comment l. 708, §3.2 row 10a l. 930,
§3.19 (B) l. 2294, §3.19.1 (3) l. 2423, §3.19.2 (5) l. 2475, 2478) names an op, not item 244's state; §3.19.1 (3)
(l. 2418) still reads "every span standing, abandoned or breached, none dismantled". (b) W55 (l. 387): "the refusals of
`forkAt` and `rerunFrom`". (c) §3.2 row 1 (l. 920): "the rung read at the target"; row 10a (l. 930): "at a CITY or
METROPOLIS target only".
*Required change (V06):* (a) "a ruined span", "a raised way with a ruined span"; §3.19.1 (3): "every span standing or
ruined, none cleared, and every support standing or ruined (the way itself in use or `abandoned`)"; (b) "their bends to
the earliest seq (J-V6.98)"; (c) "the rung the fold gives (V6 §3.1 (3)), read before the dials" and "at a CITY or
METROPOLIS rung (the fold's) only".

**TR-16 — V05 relies on a V06 sentence about new islands' masks that V06 does not write.** minor · unwired · **V06**
(residual of ST-49).
V5 §3.15's shade paragraph: "volume 6's building mask on its lattice likewise starts at the next field phase"; V6 §3.4 (8)
(b) runs the mask on "each island arena's own 32 m lattice" and says nothing of an island raised after the field phase.
*Required change (V06):* §3.4 (8) (b) adds "An island raised at this epoch (`sky.islands`, after the field phase) or
declared since the last field phase has no mask on its lattice until the next field phase; absent reads as zero building
shade (V5 §2.1's optional `shadeBasis`, J-V5.72)".

**TR-17 — A ruin's lost source is not an epoch case in V06.** minor · unwired · **V06** (residual of ST-22).
V4 §2.6 and §3.11 keep a ruin whose dossier source is removed (`source.ref` cleared, `W_RUIN_SOURCE_REMOVED`); V6
§3.18.1 (1) states only a later source's arrival, though V04's hand-off asked for the removal.
*Required change (V06):* §3.18.1 (1) adds "A dossier removal of a ruin's source, at the `dossier` phase, clears
`RuinRecord.source.ref` and keeps the system, fading by `under.fade` (V4 §2.6); no epoch removes a ruin".

**TR-18 — V06 does not name four of the V04 functions that name V06 as their caller, and lists `under.extend`'s acts
out of order.** minor · unwired · **V06** (residual of ST-23, ST-50).
V4 §1b.2 names V06's participants as the callers of `SewerStrategy.derive` (the first sewers epoch), `ArchVaults.reconcile`,
`QuarryWorkings.extend` and `workedOut`; V6 §1.2 (l. 273) and §3.2's `under.extend` row name none of them ("U-NET laid
whole", "the quarry and mine workings of the epoch's new extraction uses", "V04's arch-vault source … the reconcile"),
§3.18.2 (1)'s "worked-out quarry working" cites no reader, and the row lists the acts in an order (foundations, U-NET,
catacombs, crypt joins, workings, arch vaults, invert drops) that differs from V4 §3.10's and from V6's own reconcile
paragraph ("before the sewer's extension").
*Required change (V06):* §1.2 and the row name the four functions and state one order: `Foundations.apply` (TR-07),
`ArchVaults.reconcile(doc, scope.raised, epoch)`, `SewerStrategy.derive` at the first sewers epoch else `.extend` with its
wall drops, `CatacombGrowth.grow` with `opts` (its crypt joins inside), `QuarryWorkings.extend`; §3.18.2 (1) cites
`workedOut` (V4 §3.5.3); §3.18.1 (2c) notes that `QuarryWorkings.extend` already breaches its own new workings in its
commit, so (2c) is idempotent over them.

**TR-19 — `Way.formerClass`'s lifecycle row omits the landfall.** minor · record · **V06** (new, with TR-04).
V6 §2.12's row (create: `downgradeWay`; read: `upgradeWay`, tier (5′), exports) and BCR-V6-7 (a)'s "`Way.formerClass`
(engine only)" omit V05's landfall write (TR-04; X26) and the landfall clearance's reset (§3.5.2).
*Required change (V06):* the row's create cell adds "V05's `fallIsland` (a covered way dropped to `track`)", its read
cell "the landfall clearance (V6 §3.5.2)", its undo "the writing event's undo"; BCR-V6-7 (a) reads "`Way.formerClass` (the
engine and the `fallIsland` convert; never a hand `setAttr` target)".

**TR-20 — `hood.fabric`'s inputs, and the commit's own plot removal under a new strip.** minor · unwired · **V01**
(residual of ST-54; ST-53's wording).
(a) V1-3.3.6 (2) finds "every block the epoch's ladder (step 11) re-cut or redeveloped" in the document and its inputs
sentence names "the epoch's new faces and due blocks"; V6 §2.1, W74 and X28 make `EpochScope.recut` the participant's
input. (b) V1-3.17.4's epoch clause says "this volume re-cuts nothing and re-homes nobody", while V6 §3.19 (8) commits the
new part "through the hand operator's event — T4 `road` with `raised`", whose add path the same subsection describes as
removing the strip's plots and re-homing their households; which of the two removes the plots at an epoch is left to
inference.
*Required change (V01):* (a) V1-3.3.6 (2) reads "every block in `EpochScope.recut` (V6 §2.1)", and the inputs sentence
names `scope.recut` and `scope.raised`; (b) the epoch clause adds "the commit's operator removes the strip's plots as for
an edit (V6 §3.19 (7)–(8)), finding the buildings already cleared and the households already in the engine's ledger, so
its re-homing moves nobody".

**TR-21 — V07's participant steps, and a critique id in its dependency line.** minor · unwired · **V07** (residuals of
ST-28 and ST-58).
(a) V07 §2.1's `participants` comment (l. 415) and §3.12 place `village.plan` "at `afterField`" and give
`village.density` no step or order; V6 §3.2 holds both rows (orders 10 and 20). (b) l. 243 ("C4-49 (3)'s counted church
classes gain `v.parish_church`") and FL-2 (l. 3233, "critique C4-49 (3)'s counted classes gain `parish_church`") cite a
critique id the implementer does not hold (§17.1), the second with the pre-namespace id.
*Required change (V07):* (a) cite V6 §3.2's rows: "`village.plan` at `afterField`, order 10; `village.density` at
`afterField`, order 20, while a superseded `VillagePlan` exists"; (b) "V04 §3.5.1 (3)'s counted classes include
`v.parish_church` (V11 §3.23.8)".

**TR-22 — V05 reads the island's rung at the target, not the fold's.** minor · contradiction · **V05** (new, from ST-01).
V5 §3.15 step 1 (l. 1332): "The rung row at the epoch's population target (§4.11 *The rung at an epoch*)"; the epoch's
rung is now the fold's (`EpochContext.rung`, V6 §2.1; file f item 322), which differs from the target's inside the
hand-off band.
*Required change (V05):* "The rung row of the epoch's rung — the fold's (`ctx.rung`, V6 §3.1 (3); §4.11 *The rung at an
epoch* as file f item 322 amends it)".

**TR-23 — File f: the calamity item, two *Needed by* cells and one milestone.** minor · bcr · **BASE-F** (residual of
ST-30; new).
(a) No item carries BCR-V6-27 (file f's close note, l. 1038, leaves it to the finalize pass, and V6 X29 hands it
there). (b) Item 268 (BCR-V7-32) reads *Needed by:* V07, though V06's decline and regrowth issue `retireWay`,
`effaceWay` and `reopenWay` (TR-03). (c) Item 209 stages its ops at M6-E, but `repairRetaining` is the only restoration
of a stretch that V05's landfall (M6-sky) can decay, as `repairRaised` — which item 209 makes BASE at M3a — is of a span.
(d) TR-09's BCR-V6-28 needs an item.
*Required change (file f):* (a) a new item "BCR-V6-27 (V06 §10) — an epoch event that carries a calamity
(`EpochInputs.events` with `week?`, `params?`, `calamity?: CalamityRef` with `deaths`). *Needed by:* V04, V06, V08.
**STAGED (M6-E)**"; (b) item 268 *Needed by:* V06, V07; (c) item 209's note adds "`repairRetaining` lands with the
earlier of M6-sky and M6-E"; (d) a new item for BCR-V6-28, applied before item 319.

**TR-24 — The integration ledger still states two withdrawn rules.** minor · restatement · **BASE-F** (the ledger whose
J-VI.2 the base-change lane edited in round 1; residuals of ST-08 and ST-05).
`_integrate.md` J-VI.5's consequence ("V06 … displaces a building under a new raised way's strip taller than its
underside less `raised.clearCm` (X23)") and H3's same clause carry the rule ST-08 withdrew (V02 X23 and IN-V06-2 now clear
every building); J-VI.14 still lists "an island's slot and an access ordinal (V05's `removedSlots`, `removedAccesses`)"
among the suppressions, which ST-05 returned to volume 5's record form.
*Required change (`_integrate.md`):* J-VI.5 and H3 read "…clears every building meeting a new raised way's supports or
strip by V6 §3.19 (7), households displaced with cause `clearance` (ST-08)"; J-VI.14 reads "…a quay wall, a retaining
wall and a deck plot (BCR-V6-24; file f item 260); islands and sky accesses hold by volume 5's record form
(`SkyIsland.removed`, `.removedAccesses`) under the same lift rule (ST-05)", each with a dated note.

**TR-25 — The clerk's digest keeps the `carried` source.** minor · term · **V10** (residual of ST-06; outside this
seam's reading list, opened because file f item 244 names V10 among its readers).
V10's digest (l. 936) types `raised.source: 'generated'|'declared'|'carried'`; file f items 244 and 447 derive the source
as `generated` · `declared` only, "carried down from year N" being a reading of the lifecycle and the epochs' rungs (V6
§4.5), which V10 already keeps as its `carried` outcome (§3.9's table).
*Required change (V10):* `source: 'generated'|'declared'` (item 244's derived value), with `carriedSince?: number` (the
week the rung first fell below CITY with the way standing, derived) where the digest needs it; the `info.raised.carried`
outcome is unchanged.

## 4 Summary counts and CONFIRMED versus PLAUSIBLE

**Round 0 re-checked:** 59 issues — **44 FIXED, 15 PARTLY, 0 NOT FIXED, 0 REGRESSED.** All three round-0 blockers hold
(ST-01's V06 side, ST-02's file-f order, ST-03's primary); the PARTLY rows are counterpart sentences that no lane applied.

**New from the sweep:** 25 issues — **0 blockers, 14 majors, 11 minors** (19 residuals of round-0 issues' other side, 6
new: TR-05, TR-06, TR-09, TR-14, TR-19, TR-22). By kind: 13 unwired, 3 contradictions, 3 records, 2 restatements, 2
base-change-request gaps, 2 terms.

| owner | major | minor | total | issues |
|---|---|---|---|---|
| V06 | 5 | 5 | 10 | TR-03, 05, 06, 09, 13 (major); 15, 16, 17, 18, 19 (minor) |
| V04 | 5 | 0 | 5 | TR-07, 08, 10, 11, 12 |
| V07 | 2 | 1 | 3 | TR-01, 02; 21 |
| V05 | 1 | 1 | 2 | TR-04; 22 |
| BASE-F | 1 | 2 | 3 | TR-14 (item 245); 23 (items 209, 268, BCR-V6-27, BCR-V6-28); 24 (`_integrate` J-VI.5, J-VI.14, H3) |
| V01 | 0 | 1 | 1 | TR-20 |
| V10 | 0 | 1 | 1 | TR-25 |

**Why the residuals clustered.** Round 1's lanes ran in parallel and each applied its own issues; V04 (landed 03:39) and V05
(03:34) closed before V06 (03:57) wrote the hand-offs X25–X27 that asked them for `Foundations.apply`, the calamity deaths,
the buried wall's floor step and the landfall's `formerClass`, and V06 closed without applying V04's own hand-offs back
(ST-21, ST-22). A round-2 lane per owner, taking these rows, closes the seam; no row needs another volume to move first
except TR-02 with TR-03 (V07's rows name the ops V06's `street` type gains) and TR-04 with TR-19 (the landfall's write and
its lifecycle row) — each pair is stated so either side can land first.

**What must move together.** TR-03 with TR-02 and TR-23 (b) (the hollow-way ladder: V06's type and issuer, V07's rows,
file f's *Needed by*). TR-04 with TR-19, TR-05 and TR-06 (the landfall's clearance: the write, the lifecycle, the
decoration's end, the accesses). TR-07 with TR-18 (the function V06 calls and the order it calls it in). TR-08 with TR-09
and TR-23 (d) (void dwellings at an epoch and the crowding hook's base sentence). TR-10 with TR-23 (a) (the deaths' input
and the calamity item). TR-14 alone changes a record shape (file f item 245 and its export in item 447).

**What the seam now holds** (the census rows of round 0 marked OK and every row repaired): the fold's product and rung
read by every V06 step; the catacomb primary, cap, ratchet, count and keys on both sides; the underground's own lottery;
the maintenance mode at village rungs (V04, V06, V07); the one suppression rule in two record forms (V05, V06, file f);
the raised-way source derived and the span condition exported; one clearing under a new strip on every path (V01, V02,
V06); the crypt rank that never shortens a basement (V03, V06); the retaining-wall restoration (V05, V06, V07); decks as
their host's existence (V01, V02, V05, V06, file f); the flood's underground reach; one reach law for shade; the
hood-document gate; the death-week succession; one mask per arena.

**CONFIRMED versus PLAUSIBLE.** Every status in §2 and every issue in §3 is **CONFIRMED** as a textual fact: each side's
sentence was read in its enclosing subsection in the files as they stood at 04:15–04:34 on 2026-09-29 (md5s in §1), and
is cited by section and line. The **consequences** named — a covered primary left a track for ever (TR-04), a decoration
that never ends (TR-05), a void shut under a cleared square (TR-06), new households breaking the population identity
(TR-08), a terraced quarter buried flat (TR-11), a retired entry way cutting the route to the frame (TR-03) — are
**PLAUSIBLE**: reasoned from the texts, with no implementation or fixture executed (none exists at this stage). Each
required change is the seam's recommendation, vetoable by the owning volume's next revision or by the whole-design
retrovalidation (J84).
