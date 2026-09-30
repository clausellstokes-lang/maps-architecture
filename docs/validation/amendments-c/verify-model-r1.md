# Verify MODEL part (§2) after amendments-c repair round 1 (assemble-r1)

> PENDING FABLE REVIEW — Opus-produced (amendments-c/verify-model-r1).

PROGRESS
- READ: verify-model-r0.md (own earlier report), repair-model-r1-report.md, assemble-r1.md, the five sibling repair-r1 reports' cross-part notes, §2 now vs the pre-repair archive (vm1/s2-r1.diff, 23 hunks) — done
- RE-CHECK repaired §2.1, §2.2, §2.5, §2.6, §2.7, §2.8 (§2.7 and §2.8 read whole; §2.1 whole; the changed runs of §2.2, §2.5, §2.6 read with their paragraphs) and the 12 distinct model issues — done (§1)
- RE-CHECK the 16 V-MC0 issues owned by other parts at their homes (§5.3, §6.2, §6.3, §7.1, §7.4, §7.5, §7.7, §4.2, §4.5, §4.7, §4.11, II.7.6, §13.2, §13.5) — done (§1)
- CHECKS single-source / stale / cross-part / deferral / refs / new-problem / doc_checks — done (§2)
- ISSUES table — done (§3; 11 issues, all minor)
- queue row, LANDED — done

Design read: `docs/ARCHITECTURE.md` sha256 `024c57dabc6b93c8…` (17 050 lines), §2 = l. 469–2448; rationale
`33b21ca8cdc15789…`; pre-repair archive `docs/archive/ARCHITECTURE-pre-amendments-c-repair-r1-2026-09-28.md`
(`7f4c0e25…`). Both design files unchanged by this seat (hashes re-checked after every command that ran a tool on them).
Scratch: `scratchpad/vm1/`.

## Outcome

Repair round 1 fixed all 28 issues of `verify-model-r0.md`: the 12 distinct model defects in §2 and the 16 that other
parts owned at their homes, each verified at its line. Every item routed to the model part is PRESENT; item 20 (h), PARTIAL
in round 0 (V-MC0-01), is now PRESENT. No held part is written in §2. Gates (b) and (c) hold on the repaired text. There is
no new deferral wording. `doc_checks --sections "2"` exits 0 (C1 5/0, C2 0/0, C3 326/0, C4 3/0, S1 0, S2 0). The resolver
finds the same 2 broken references (the two baseline external citations), and all 99 J ids §2 cites resolve in both the
index and Part A. The new rows J-A20.24, J-A63.22, J-A67.22 and the restated J-A68.21 and J-A79.23 stand once each.

Round 1 leaves 11 minor issues and no major one. By owner: model 6, pipeline 2, determinism 2, rendering 1. Five come from
cross-part notes to or about §2 that no seat folded (the determinism and pipeline repair seats' notes on
`concealmentSource` and `LightSource.host`, scope's and determinism's note on "§2.8's marker"). Three are new tensions
that round 1's sibling repairs created with §2's text (the stage count now at S2, the frame growth keeping the raster
cell, the widened light hosts). The rest are wording left stale by rule 1's amended entrance side.

## 1. Items and round-0 issues

**Items routed to the model part (re-checked where round 1 touched them).**

| item | role | state | evidence after round 1 (quoted) |
|---|---|---|---|
| 50 | home | PRESENT | §2.6 rule 1 unchanged; the parity sentence now "since neither the FTG client of the 25 September 2026 capture nor MFCG 12710731 models a door, the latter by inference (what each carries is §13.5's entrance rows; J-A50.01, J-A50.21)" — build names kept (gate (b)), the detail at its §13.5 home (V-MC0-15 fixed); the closing line "facing its street, its court or passage, or its footpath (rule 1)". Defect: V-MC1-06 (rule 4). |
| 59 | home | PRESENT | unchanged from round 0 (`PathShapeRow`, P21); timing not in §2 (seat R's). |
| 60 | home | PRESENT | unchanged (D2, D3 baselines). |
| 79 | home | PRESENT | "sets `secret` — `PowerStanding.secret` in the base (§7.7 item 2), `Faction.secret` when the module materialises it (§10.1; J-A79.23)" in both places (V-MC0-13 fixed). |
| 88 | home | PRESENT | records unchanged; §4.2 and §4.5 now state the readers (V-MC0-17 fixed at home). Defect: V-MC1-05 (§2.7 still says "S0's stage count"; the rule is S2's). |
| 20 (h) | ref | PRESENT (was PARTIAL) | §2.8: "`dossier` when three things hold — the entity carries a **dossier ref** (`Identity.dossier`; on an `Assignment` its own `Assignment.dossier`, §7.7; on a `District`, for its `name` and `identity`, the ref of the dossier-backed `neighbourhood` assignment that targets it …; J-A20.24)"; dossier paths "an `Assignment`'s `state`, `name`, `knownTo`, `concealment` and `front`"; `factTier`'s comment reads the same. §7.7's `Assignment` carries each of those fields; §7.1's refusals agree. Defect elsewhere: V-MC1-09. |
| 63 | ref | PRESENT | `concealmentSource?: 'assignment'\|'class'\|'edit'` "absent while the dossier sets it" (J-A63.22); registry "written with `concealment`; no edit kind of its own" = §7.1's uses row. Defects: V-MC1-01, V-MC1-02. |
| 65 | ref | PRESENT | "the sewer network's part (part 0 of the underground layer)" in `Tunnel.centreline` and the staged-layers paragraph (V-MC0-16 fixed); `Identity.key`'s link exception (V-MC0-27 fixed, = §3.4's l. 3050–3054). Defect: V-MC1-11. |
| 66 | ref | PRESENT | §2.1 "once those stages exist (§7.3 item 9 (d), II.7.4; item 66)"; §2.7 "a `dug` system included … run once the layer's stages exist" = §7.3 item 9 (d)'s new staging sentence (V-MC0-02 fixed); ladder (3) admits `damp` and `flood` plots (V-MC0-11 fixed) = §5.3's basement row. |
| 67 | ref | PRESENT | `Works.before` "carried with the target's plot face … by §7.4's mean-value rule, never re-seated or orphaned … (J-A67.22)"; rule 5 lists "a Works' kept rings and lines"; §7.4 now lists them (V-MC0-03, V-MC0-04 fixed). |
| 68 | ref | PRESENT | `flicker?: true` "never drawn or stored" (V-MC0-07 fixed); `colour` "the colour the light pass lights with (§8.4 (c))" = §8.4 (c), §8.2's `light`/`lights` roles; `LightRule` has `sizeCm`, `colour`, `flicker` (V-MC0-06 fixed). Defects: V-MC1-03, V-MC1-04. |
| 70 | ref | PRESENT | `entranceOn` "faces … a cluster structure's the `footpath` that reaches these edges" (V-MC0-10 fixed). Defects: V-MC1-06/07/08. |
| 81 (via VKC-09) | — | — | `frame: Frame /* … replaced only by the frame growth of an epoch's upward rung crossing (§3.2 (9), §4.11; J-A81.41) */` = §3.2 (9) "`Plat.frame` takes the new frame as this batch commits" (V-MC0-26 fixed). Defect: V-MC1-10 (§2.3). |
| 44, 64, 72, 74–77, 80, 82, 85, 87, 101 | ref | PRESENT | unchanged by round 1; round-0 verdicts stand (`verify-model-r0.md` §1). |

**Round-0 issues.** All 28 FIXED, each read at its line in the installed design:
V-MC0-01 (§2.8 fact tiers, dossier paths, `Identity.dossier`), -02 (§2.1, §2.7 = §7.3 item 9 (d)), -03 (§2.2 rule 5, §2.7),
-04 (§7.4 "Seven kinds of record", l. 8678), -05 (§5.3 entrance row), -06 (§4.7 `LightRule`), -07 (§2.7 flicker, J-A68.21),
-08 (§4.7 (4)), -09 (§13.5 row, T29-1, O5 (f)), -10 (§2.5, §2.6), -11 (§2.6 (3)), -12 (§5.3 basement row), -13 (§2.7,
J-A79.23), -14 (§2.7, §2.8, J-A63.22), -15 (§2.6), -16 (§2.7), -17 (§4.2 S2 l. 4049, §4.5), -18 (§4.2 S0 toggle, S1),
-19 (§7.5 l. 8835–8839), -20 (§6.2 l. 7382, §7.1 districts row), -21 (§6.2 l. 7278, §6.3 anchor row l. 7538), -22
(§7.7 item 9), -23 (§7.7 `interface Intent`), -24 (§7.1 terrain row), -25 (§4.11 *Works* (1)), -26 (§2.2), -27 (§2.8
`Identity.key`), -28 (II.7.6 `RaiseGrade.system`).

**Held parts (gate (a)).** None written in §2: item 59's timing, item 60's support clause, item 68 (g) and its support
notes are absent (grep: no "cast shadow", "VG 1.6.9", "shading and occlusion", "widths up to 16" in §2). Item 50's MFCG
clause stays labelled "by inference", as Fable's completion gate allowed.

## 2. Checks

* **Single source.** The round-1 text adds no second statement: the entrance-side rule is stated in §2.6 rule 1 and
  summarised with pointers in §2.5, §5.3, §13.2 T29-1 and §13.5; the Works carry is §7.4's rule, §2.7 and J-A67.22
  referencing it; the tier ref is stated once in §2.8. No duplicate issue.
* **Stale.** §2 has no hit for the retired phrasings ("underground arena", `readonly frame`, "flicker phase",
  `concealmentSource … 'dossier'`, "tier marker", "stored marker") nor for the listed stale classes. Remaining stale
  wording owed to §2's rules: V-MC1-06 (§2.6 rule 4), V-MC1-07 (§7.1), V-MC1-08 (§4.7 S11), V-MC1-09 ("§2.8's marker" in
  §9.2, §11.1, §11.2, J-A20.82). "The underground arena" survives only outside §2 (other parts' round-0 ids VKC-06,
  VPR0-34; not re-filed).
* **Cross-part.** Every pointer the repaired §2 text adds resolves to text that states it: §3.2 (9) (frame growth),
  §7.4 (Works, light and access points), §7.3 item 9 (d) (staging), §8.4 (c), (f) and §8.2's roles (light colour, flicker),
  §7.7 (Assignment fields, item 16), §13.5 (entrance rows), §10.1 (`Faction.secret`). Cross-part notes addressed to §2 in
  round 1: the kernel's (frame, `lattice`) and rendering's (§2.9 no change) are satisfied; determinism's (the
  `concealmentSource` override clause) and pipeline's (`LightSource.host`'s new hosts) are not folded (V-MC1-01, V-MC1-03).
* **Deferral wording.** None new; "once those stages exist" is roadmap staging (item 66, the Staged table).
* **References.** Resolver 2 broken = baseline (`os-geometry.md` §2.1.4; RFC 7946 §3.1.6); 99 J ids cited in §2, 0 missing
  from the index, 0 from Part A; C1 (reference identifiers) 5 hits, 0 unreviewed.
* **New problems.** V-MC1-05 (stage count moved to S2 by the pipeline repair), V-MC1-10 (raster cell kept by the kernel's
  frame growth), V-MC1-03/04 (light hosts widened by the pipeline repair), V-MC1-01 (the dossier set and withdraw paths of
  the repaired `concealmentSource`).
* **Considered, not filed.** `District.identity.source 'dossier'` has J-A63.22's shape, but it records which derivation
  route of §4.5 (4) took the row (and drives "a dossier-declared identity wins") and is rewritten at the character step
  that re-matches claims, so it is a route label, not a tier copy. `Assignment.memberState` is a map draw over a dossier
  state (J-A80.72), so it is rightly absent from the dossier paths.

## 3. Issues

| id | sev | kind | owner | item | claim | required change |
|---|---|---|---|---|---|---|
| V-MC1-01 | minor | conflict | model | 63, 20 (h) | §2.7 `Use.concealmentSource` (l. 1814) still ends "a dossier value outranks a map override (§7.7 item 7; J-A63.22)", the override clause J-A20.77 superseded: §7.7 item 7 and §7.1 now refuse a map `setAttr` of a dossier-set value (determinism repair's cross-part note, not folded). The comment also leaves two lifecycle paths of the repaired field unstated: a dossier event that sets the mode on a use whose mode had a map-side source, and one that withdraws the dossier's mode (leaving a mode with neither a dossier value nor a map-side origin); and it names no reader. | Replace "; absent while the dossier sets it: whether the mode is a dossier fact is factTier's (§2.8), and a dossier value outranks a map override (§7.7 item 7; J-A63.22)" with "; absent while the dossier sets it — a dossier event that sets the mode clears it, and one that withdraws the dossier's mode re-resolves it by §4.7's *Concealed institutions* (1) from the map-side sources (the assignment's value, else the class table on the institution's `siting` draw, else `none`) as that event's least-disruption mutation (§7.7 item 13), writing their source; whether the mode is a dossier fact is factTier's (§2.8), and a mode the dossier set is dossier-owned, so a map `setAttr` of it is refused (§7.7 items 7, 11; J-A20.77, J-A63.22); read by §11.2's `why` on the use's `concealment` under the caller's key". Add the withdraw clause to J-A63.22's index row and Part A entry. |
| V-MC1-02 | minor | conflict | pipeline | 63 | §4.7 *Concealed institutions* (1) (l. 5496–5498): "The resolved mode and its source are stored on the concealed use; a map edit sets it by `setAttr` (§7.1) and a dossier value outranks a map override as it does for `knownTo` (§7.7 item 7)". §2.7 stores no source for a dossier mode (J-A63.22), and a dossier-set value is refused, not overridden (J-A20.77). | Replace with "The resolved mode is stored on the concealed use, with its map-side source (`Use.concealmentSource`, §2.7) when the dossier gave none; a map edit sets a mode the dossier did not set by `setAttr` (§7.1), and one the dossier set is dossier-owned, a map `setAttr` of it refused (§7.7 items 7, 11; J-A20.77, J-A63.22)". |
| V-MC1-03 | minor | missing | model | 68 | §2.7 `LightSource.host` (l. 1858) lists "the building, way, square, gate, bridge, pin, gallery or chamber it belongs to", while §4.7's `LightRule.host` (widened in round 1) also places lights on a tunnel run's junctions, an access point's foot, a castle's ward and a wayside shrine, and `placeLight`'s host defaults to "the entity under the point" (§7.1). Pipeline repair's cross-part note asked for this. | Change the comment to "the building, way, square, gate, bridge, castle, pin, decoration (a wayside shrine), tunnel, gallery, chamber or access point it belongs to — for a hand-placed light, the entity `placeLight` names or finds under its point (§7.1); its arena is its Identity.key's". |
| V-MC1-04 | minor | missing | determinism | 68 | §7.4 *Warp and what stands on the ground* (l. 8678 ff.) gives `LightSource.point`'s host face for a building, a way or bridge, a square, a gate, a pin, a gallery and a chamber only; a light on a tunnel junction, an access point's foot, a castle ward, a shrine decoration or a hand-placed light on another entity has no host face, so the mean-value carry and the re-seat test are undefined for it. | In the `LightSource.point` host list, after "a chamber's floor", add "a tunnel's half-corridor strip at its junction, the face of the underground element an access point's `access_point` vertex lies on (a tunnel's strip, a gallery's band, a chamber's floor), a castle's ward or bailey face, a decoration's face (or the L3 face containing its point), and for a hand-placed light on any other entity the face that entity is or stands on (§7.1's `placeLight`)". |
| V-MC1-05 | minor | conflict | model | 88 | Round 1 put the staged history's reader in §4.2 **S2** ("the stage count becomes K′ = min(K, max(1, ⌈ageYears ÷ yearsPerStage⌉))", l. 4049; J-A88.42 "§4.2 S2") and its scars' only reader in II.7.6's buried old town. §2.7 still says `HistoryHint` is "an S0 input for the growth-stage count and the generation-time scars (§4.2)" (l. 1865) and lists "S0's stage count" among the readers (l. 1923). | l. 1865: "… // Recipe.history (§2.9): a recipe input read by S2's growth-stage count (§4.2 S2) and, for a `fire` or `flood` scar, by II.7.6's buried old town (J-A88.42)". l. 1923: "S0's stage count" → "S2's stage count (§4.2 S2)". |
| V-MC1-06 | minor | stale | model | 50, 70 | §2.6 rule 4 (l. 1504): "the main entrance moves only along its street-facing side". Rule 1 puts it on the footprint side facing the frontage access edge, which for a hidden plot faces its passage or court and for a cluster structure its footpath. | Replace with "the main entrance moves only along the footprint side rule 1 puts it on". |
| V-MC1-07 | minor | stale | determinism | 50, 70 | §7.1's `setEntrance` comment (l. 7857: "the main entrance may be moved along its street-facing side, never removed") and l. 7973 ("which may only move along its street-facing side") repeat V-MC1-06's stale side. | l. 7857: "… may be moved along the footprint side §2.6 rule 1 puts it on, never removed". l. 7973: "… which may only move along the footprint side §2.6 rule 1 puts it on". |
| V-MC1-08 | minor | stale | pipeline | 50, 70 | §4.7 S11 *Entrances* (l. 5383): "the main entrance on the access edge where §2.6's rule 1 places it" — rule 1 places it on the footprint side facing that edge, off the edge where the front recedes or the building is set back (the wording round 0 fixed in §5.3 and §13.5). | Replace with "the main entrance on the footprint side facing the plot's frontage access edge, where §2.6's rule 1 places it". |
| V-MC1-09 | minor | stale | rendering | 20 (h) | "§2.8's marker" names a stored marker §2.8 does not have; §2.8 derives the tier at read by `factTier`, never stored (J-A20.23). It stands in §9.2 (l. 11047), §11.1 (l. 11767, 11777, 11798), §11.2 (l. 11981), J-A20.82's index row (l. 16921) and its Part A entry (rationale l. 700). Scope's and determinism's round-1 notes flagged it; assemble-r1 §9 lists it as unfolded. | Replace each "§2.8's marker" with "§2.8's `factTier`" (l. 11777: "every event whose entities §2.8's `factTier` reads `declared`"), in the five design places and in J-A20.82's row and Part A entry. |
| V-MC1-10 | minor | new-problem | model | 81 (b) (kernel's frame growth), 65 | §2.3 says the terrain raster has "a resolution set per size class (TOWN 5 m, CITY 8 m, METROPOLIS 10 m …)" (l. 879) and `HydroGrid.cellCm` "TOWN 1 600, CITY 2 500, METROPOLIS 3 200" (l. 866). Round 1's §3.2 (9) grows a frame at an epoch's rung crossing by extending "each raster of §2.3 … by whole cells on each side …, keeping its `cellCm`", so a TOWN grown to CITY keeps 5 m and 16 m cells and contradicts §2.3's per-rung reading; the re-grid is only §3.2 (9)'s pre-decided fallback. | l. 879: "a resolution set at creation by the size class (TOWN 5 m, CITY 8 m, METROPOLIS 10 m …) and kept when an epoch grows the frame, the rasters extending by whole cells on their own grids (§3.2 (9); J-A81.31) — the re-grid is that rule's pre-decided fallback". `HydroGrid.cellCm`'s comment: "… (table values at creation; kept through frame growth, §3.2 (9))". |
| V-MC1-11 | minor | broken-reference | model | 65 | §2.8's registry gives `Terrain.geology` "(S1's; a terrain edit)" (l. 2125) and §2.3's comment "written by S1 (§4.2)" (l. 865), but the edit kind is `setAttr` on `geology` (§7.1's terrain row, V-MC0-24's fix), which the path-completeness test (§13.2) matches by name. | l. 2125: "`Terrain.geology` (S1's; `setAttr` an override, §7.1's terrain row)". l. 865: "written by S1 (§4.2) with the resources, or overridden by `setAttr` (§7.1)". |

## 4. CONFIRMED versus PLAUSIBLE

CONFIRMED by executed runs in this seat: the hashes; the §2 extract and its diff against the pre-repair archive; each
round-0 fix and each issue's quoted text, read at its line; `doc_checks --sections "2"` exit 0 with its counts; the
resolver (2 broken, baseline); the J-id resolution of §2 (99 ids, 0 missing). PLAUSIBLE, resting on reasoning only: that
each remaining issue would mislead a builder or break the named rule (for example the undefined warp carry of a tunnel
light, or the stale concealment source after a dossier withdrawal), and every proposed wording.
