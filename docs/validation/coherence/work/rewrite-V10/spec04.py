R = [
("""so the placeholder forms are few: `placeAt`'s name, a created raised way's name or span use, and a
created stepped building's tiers — `CreatedRef` kinds `use`, `way` and `building` (J-V10.45, J-V10.76).""",
"""so the placeholder forms are few: `placeAt`'s name and specialisation, a created raised way's name or span use, and a
created stepped building's tiers — `CreatedRef` kinds `use`, `way` and `building` (J-V10.45, J-V10.76)."""),
("""`castle`, `harbour`, `temple` → `toggles`; `era`, `biome`, `magic` → `circumstances`; `seed` → `seed` (V10 §3.7) |""",
"""`castle`, `harbour`, `temple` → `toggles`; `era`, `biome`, `magic` → `circumstances`; `history` → the blueprint's `history` (§4.2 S0's `HistoryHint`), `{ peak: { rung: onceA }, ageYears: ageYears ?? V09's `history.defaultAgeYears`, scars: [] }`, `'none'` → absent, as V09 §4.21.3 (1)'s **History** chip writes it (item 113 (a)); `seed` → `seed` (V10 §3.7) |"""),
("""`advance` is V06 §4.1's request, run on the scratch, its epochs the proposal's events and its three shapes the variations |""",
"""`advance` is V06 §4.1's request, run on the scratch, its epochs the proposal's events and its three shapes the variations; `history` → `adjust('history', …)` with the creation row's value (`'none'` → `undefined`), a Re-derive from S0 whose fates the card shows, byte for byte V09's chip after a declaration |"""),
("""| | `lake` | `drawWater { kind: 'lake', add: [], from: { points: [p], levelCm: ground(p) + depthM × 100 } }`, `ground(p)` the `EntityCard.groundCm` of the point |""",
"""| | `lake` | `drawWater { kind: 'lake', add: [], from: { points: [p], levelCm: ground(p) + depthM × 100 } }`, `ground(p)` the `EntityCard.groundCm` of the point; with `spring` the event carries `spring: true` — an oasis with its grove and gardens (§7.1's T2 row; item 111 (a)), byte for byte V09 §4.21.1 (2)'s **Spring-fed (oasis)** mapper |"""),
("""subtract: [the ring of radius √(sizeM2 ÷ π) around `at`, `encoders.ringSides` sides] }` — land raised in the water (the base's land brush); `sizeM2` default 2 000 m² (our own, calibrate-later) |""",
"""subtract: [the ring of radius √(sizeM2 ÷ π) around `at`, `encoders.ringSides` sides] }` — land raised in the water (the base's land brush); `sizeM2` default `encoders.islet.sizeM2` (V10 §2.10) |"""),
("""| | `gate` | `placeGate { enceinte, at, expansion: sugar.json's current version }` |""",
"""| | `gate` | `placeGate { enceinte, at, expansion: sugar.json's current version }` |
| | `repair`, `wear` (item 114) | V06 §2.8's shapes, as V09 §4.21.4's **Repair**, **Wear** and **Back in use** write them: `repair` with `run` → `convert { op: 'repairWall', enceinte, stretch, material: material ?? 'robust' }`, `stretch` the run of `Enceinte.condition` holding the point nearest `run` (the stretch between its two knots, as the canvas's grip selects it); a patch `material` on a run that is not `breached` is written `'robust'`, the item's result carrying `info.wall.patchOnlyGap` (V10 §3.9b (3)); `repair` without `run` → `convert { op: 'repairWall', enceinte }` (a neglect lifted); `wear` → `convert { op: 'wearWall', enceinte, stretch }` |"""),
("""| | `class` | a specialisation id (`stepped_temple`, `terraced_palace`, `tiered_tower`) goes in the designation as its class, by the mechanism V11 settles for a specialisation (CVR-V10-12); every other class id as written |""",
"""| | `class` | a specialisation id (`stepped_temple`, `terraced_palace`, `tiered_tower`) places its first carrier class in the document's class table in V11 §3.24.3's carrier order (`stepped_temple`: `great_temple`, `cathedral`, `church`; `terraced_palace`: `palace`; `tiered_tower`: `tower_house`, `mage_tower`, `watchtower`), then `setAttr { id: <the use's CreatedRef>, path: 'specialisation', value }` — the user-set specialisation V11 §3.24.3 exempts from the chance and the cap; every other class id as written |"""),
("""`scope` `{ ids: [ref] }`, or for `around` `{ ring: the 32-gon of the radius, key, level: 1 }` |""",
"""`scope` `{ ids: [ref] }`, or for `around` `{ ring: the regular `encoders.scopeRingSides`-gon of the radius, key, level: 1 }` |"""),
("""| | `green` | `drawGreen { polygon: the 24-gon of the radius around the anchor, kind }` |""",
"""| | `green` | `drawGreen { polygon: the regular `encoders.ringSides`-gon of the radius around the anchor, kind }` |"""),
("""(V09 §4.5's T9 row after SR-27; CVR-V10-18 (b))""", """(V09 §4.5's T9 row; CVR-V10-18 (b))"""),
("""release: a delete of the row ] }` (V11 §4.2; V09 XV-V9-2) |""",
"""release: a delete of the row ] }` (V11 §4.2's cells) |"""),
("""(`uid:<localUid>`, `cat:<catalogId>` or `cls:<class>`, V11 §4.2 and V09 XV-V9-1)""",
"""(`uid:<localUid>`, `cat:<catalogId>` or `cls:<class>`, V11 §4.2)"""),
("""| | `siting` | `editTable { table: 'siting.declared', ops: [an upsert of the target's kind key with the given `place`, `quarter`, `pin` and `profile` cells and `weights` as the kind row's `familyWeights` cell (V11 §4.2; V09 §2.6; CVR-V10-16, met)] }` — never a dossier write (item 20); a cell the dossier owns is refused `dossier-owned` by the dry run |""",
"""| | `siting` | `editTable { table: 'siting.declared', ops: [an upsert of the target's kind key with the given `place`, `quarter` and `profile` cells and `weights` as the kind row's `familyWeights` cell, and — `pin` being a `use:` row's cell only — an upsert of the target use's `use:<address>` row with `pin`] }` (V11 §4.2's key forms and cells; V09 §2.6), writing no cell its key form does not declare — never a dossier write (item 20); a cell the dossier owns is refused `dossier-owned` by the dry run |"""),
("""(V09 §4.5's T11 row after SR-29)""", """(V09 §4.5's T11 row)"""),
("""for `decoration`, `rerollLayer { concern: 'style.jitter', salt: MapBrief.salts['style.jitter'] + 1 }` then `rerollLayer { concern: 'style.crowns', salt: MapBrief.salts['style.crowns'] + 1 }`, in §6.1's registry order, one item and so one group on acceptance (V10 §4.2) — the bytes of V09's **New decoration** (J-V10.99);""",
"""for `decoration`, the group V09 §4.5's T12 row states for **New decoration** (J-V9.115), each concern's salt from `MapBrief.salts` + 1 — one item and so one group on acceptance (V10 §4.2; J-V10.99);"""),
# 4.2 (3): the empty-state edge, as V09 rules it (J-V9.127; V10-EDGE-1)
("""If the user's current document is the
   untouched empty-state town, the view moves to the new document (`ClerkMount.openNewDocument`) and the old handle
   closes — nothing is lost, the old town being its seed and still in the recent documents (R15); otherwise the new
   document opens beside the current one (V09) and nothing of the current one changes.""",
"""If the user's current document is the
   untouched empty-state town, the view moves to the new document and the untouched town is dropped — no local record and
   no Recent entry, since it holds no declaration of the user's (V09 §3.2 (3), J-V9.127); otherwise the new document opens
   beside the current one (`ClerkMount.openNewDocument`: a new tab of the app and a Recent entry, V09 §4.11) and nothing of
   the current one changes."""),
("""Undoing a creation acceptance closes the new
document and returns to the previous one, which stays in the recent documents.""",
"""Undoing a creation acceptance closes the new
document and returns to the one beside which it opened, unchanged — or, where it replaced the untouched empty-state town,
to the empty state (V09 §3.2)."""),
("""its card reads `clerk.applied`, "Applied", with its **Undo** button (`clerk.alt.history.undo`) — "Applied — Undo" on the""",
"""its card reads `clerk.applied`, "Applied", with its **Undo** button (V09 §4.9's `button.undo`) — "Applied — Undo" on the"""),
]
