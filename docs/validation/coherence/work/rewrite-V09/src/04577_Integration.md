## Integration notes (volumes/_integrate, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/_integrate; covered by the whole-design retrovalidation (J84).

The integration lane (`docs/volumes/_integrate.md`) decided the following for this volume. Each note supersedes any
sentence of this volume that reads otherwise; sentences edited in place are listed. Decisions are vetoable (J-VI.n).

* **IN-V09-1 (J-VI.1, clean-room).** The handle kind is renamed `'towerResize'` (one line); its former name coincided
  with a reference export field and is not repeated here (reworded by the continuation, J-VI.23).
* **IN-V09-2 (J-VI.4; item 101 R2).** The "added refusal class" is withdrawn: J-V9.67 is marked withdrawn, §4.9's
  sentence and §4.20.5 (4) were edited in place, T-V9-13's list reads the `bend.*` keys. The rows `refuse.raised.island`,
  `refuse.aqueduct.island`, `refuse.raised.onIsland`, `refuse.aqueduct.uphill`, `refuse.retaining.rim` and
  `refuse.stack.*` are renamed `bend.*` with the same words; each renders as a bend card (the bend's line, the bent
  declaration pre-selected, the former offer as the alternative), per J-VI.4 (a)–(i). J-V9.44's list of refusals that
  remain (a dossier fact, a lock or an assignment, a dependent later change, the viewer role, a staged layer, the rung,
  the screen) is unchanged: those are availability gates, not bends of a lawful declaration.
* **IN-V09-3 (J-VI.2, J-VI.3).** The raised-way reason words are `drop`, `link`, `water` (and `declared`); the preview's
  closure-arc barrier kinds are `shore`, `cliff`, `gorge`, `marsh`, `sheer`, `enceinte` (edited in place).
* **IN-V09-4 (J-VI.5; volume 2's X21).** T9's tier controls also carry, from volume 2's second revision: the **shape**
  chip (V02's tier-0 shapes), the **skirt** and **solid** chips (a tier's skirt and its solid form), a **shrine-inset
  handle** on the top tier, the **centre and radius handles** on a round or octagonal tier 0, and the **Sealed** choice
  on the stair chip (`stairs: 'none'`, edited in place); every bend of V2 §1b (`bend.tiers.*`, `bend.stack.*`,
  `bend.deck.single`, …) has a catalogue row with its words; each control emits `setMassing { op: 'tiers' }` or
  `setAttr` as V2 §4.6 states.
* **IN-V09-5 (J-VI.17 H5; volume 2's X10).** The style panel offers the `FM` building look; the tool rows for
  `setComposition room`, the secondary porch and `moveTower { shape }` exist on T9 `shape`; the advanced panel carries
  the `fantasyShapes` control (V2 §4.4–§4.5, BCR-V2-30).
* **IN-V09-6 (J-VI.17 H23; volume 4).** T9 `shape` shows a raised way's span `use` (open or vault, a held `setAttr`) and
  a ruin monument's count (`setAttr` on `monument/count`).
* **IN-V09-7 (J-VI.17 H24; X-V12-6, X-V12-8).** The tables editor's cell inspector reads `dist/evidence.json` — the
  status in plain words ("the owner's rule" for a stamped cell) and the evidence lines; the preset dialog lists the
  adopted historical packs as "historical (<era>, <region>)", offered only to documents of that era and region. V9
  §7.2's second fixture checklist cites volume 12 §3.14's K2 list: K2-4 reads "≥ 8 jetties outside the basin, deck
  buildings on ≥ 4"; the fixture's inputs live in `plat/tests/fixtures/known-city/K2/`.
* **IN-V09-8 (J-VI.8; applied in place by reconciliation round 2, SR-15).** `deck.landmarkMinSpanM` names volume 11's cell `deck.landmarks/bridgeMid/minSpanM` (40 m); it
  is not a constant of this volume.
* **IN-V09-9 (J-VI.17).** `ClerkHandle.send`'s entries are volume 10's five (`help` added in place).
* **IN-V09-10 (J-VI.14).** The delete row's "kept removed" line for a raised way, an island, an access, a harbour chain
  or a quay wall reads the one suppression mechanism (file f).
* **IN-V09-11 (J-VI.18).** BCR-V9-31 (a)'s GeoJSON names follow file f item 447's one text for both variants: each
  support a Polygon of kind `raisedSupport` (with `key` and `state`), a retaining wall of kind `retaining` (edited in
  place), plus volume 12's `raisedKind`, `source`, `stair`/`ramp` flags and `onDeck`.
* **IN-V09-12 (J-VI.22).** AP6 and XV-V9-8 name volume 4's milestone **M6-U** (edited in place); "M6c" stays volume 2's.

