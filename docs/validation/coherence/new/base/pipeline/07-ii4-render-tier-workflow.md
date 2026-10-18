## II.4 The render tier, the workflow and the close-up's persistence status (stage-2 features S5, S6)

**Render tier (stage-2 feature S5).** The `hatched` preset at neighbourhood LOD is §8.2's and §8.6's (hatching from the
ridge, two-tone roofs over the stored wings, prism shadows from stored heights, chimneys, wells, lobed trees ordered as NG
1.2.2 orders them — large-tree pins under the buildings, block trees above them (item 58 (d); §8.2's layer note)); at this
tier it adds the cobbles / tiles / outlined / dashed road programs and the hood title in the emptiest corner (§9.5; V01
§5.1, §5.2.1), with instanced hatching and a ceiling of ≈ 25 canvas ops per wing.

**Persistence status (LC-18; J-P23).** A `refine` close-up is **derived data**: a pure function of the district's committed
base state, sub-seed, strategy and params, identical whether computed eagerly or lazily, held outside the base hash and never
stored — so the town is the same before and after anyone opens a district. The first hood-pin edit or params change inside
a close-up is preceded by a logged `closeup` event (its params `CloseupParams`, V01 §2.5; §7.1), from which point the
close-up enters the digest under `closeups` (§2.9) and replays exactly; every other close-up entity is a base entity edited
as one. Editing a close-up element (moving a well, removing a tree, restyling a pin) records an **instance-override event**
on the element's host entity and ordinal (§7.1), which persists, undoes and replays after regeneration, re-matched by
position; when the base re-derives the district, the close-up re-derives with those overrides carried over and orphans
reported. Close-up lanes, plots and houses are base entities (the base's S8–S11 already produce the finest model fabric), so
renaming a lane or locking a house is an ordinary base edit. A `replace` close-up (a template fabric) is **a model edit**:
`setAttr(district.fabric, template)` plus a scoped regeneration of the district — logged, hashed, the same for every viewer,
and visible at city LOD because city-LOD footprints read the same model at every zoom.

**Workflow (stage-2 feature S6).** Open any district at neighbourhood LOD from the city view (or any outline, V01 §3.8.9); a
layout card is T8 `fabric`'s parameter and a block's content T9's (V01 §4); "Same kind, new seed" per district with locks —
New random on the district, one of §7.1's named actions scoped to it. **Per-district reroll isolation (R8):** rerolling
district D leaves every other district byte-identical except the **seam exception** — D's bounding ways' chains and
`Corridor` records and their `surface` attribute and naming record, the strips, wedges and neighbour steps (II.1 (3)) at the
vertices D's batches insert or remove on those spines, the neighbouring rings through those vertices (each the same polygon
point for point with them removed) and the `Seam` records D is party to — stated in full in §7.3 item 1; the locality oracle
computes this set from the batches' commit records and checks everything else byte for byte (§7.3), and II.5's
reroll-isolation tests check it. Export of one district as its own SVG / PNG / VTT scene.

**Elaboration by click at stage 2 (item 28).** Opening a district follows §4.1's trigger policy: in the viewer's `click` mode
the click derives the close-up and raises the `wings` rung of its buildings to `current` (§2.8's elaboration record); in
`view` mode the visible tiles derive within §12's budgets; either way the model is the same, and the persistence status
above is unchanged. Staleness, the change marker and the click's re-derivation are §4.1's policy over §2.6's rule (§7.3): a
stale close-up re-derives as a pure function of its district's committed state (§6.2) and a stale rung from its canonical
prior, never from the cache and never by a re-roll.
