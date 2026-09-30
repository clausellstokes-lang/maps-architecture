import sys; sys.path.insert(0,'scripts')
from ed import Ed
e=Ed('parts/13-s4.md')
e.R("""against `doc` (the scratch while a draft exists); every event one of the kinds its tool's row of §7.1's toolkit table
lists (T101-1, T101-2);""","""against `doc` (the scratch while a draft exists); every event a kind §7.1's binding table gives the tool as its home
(T101-1, T101-2);""")
e.R("""created stepped building's tiers — `CreatedRef` kinds `use`, `way` and `building` (J-V10.45, J-V10.76). Item 110's
forms are declared only when the user's words ask for them (V10 §3.3 rule 16); their event shapes are item 362's, one
text with V09 (XV-V9-10), cited and never restated.""","""created stepped building's tiers — `CreatedRef` kinds `use`, `way` and `building` (J-V10.45, J-V10.76). Item 110's
forms, an oasis and a terrace declaration are declared only when the user's words ask for them (V10 §3.3 rule 16); item
110's event shapes are item 362's, one text with V09 §4.20.""")
e.R("""`castle`, `harbour`, `temple` → `toggles`; `era`, `biome`, `magic` → `circumstances`; `seed` → `seed` (V10 §3.7) |""",
"""`castle`, `harbour`, `temple` → `toggles`; `era`, `biome`, `magic` → `circumstances`; `oasis` → the site request's `oasis` (§4.2 S0; P(oasis) is 0 off an arid climate row, so `on` elsewhere is the dry run's bend); `history` → `history` as V09 §4.22 (2)'s `HistoryHint` (item 113), `null` absent; `seed` → `seed` (V10 §3.7) |""")
e.R("""`seed: 'new'` is the `Same kind, new seed` action (a new document, §7.1) offered as a `ClerkAction`, never an event; `advance` is V06 §4.1's request, run on the scratch, its epochs the proposal's events and its three shapes the variations |""",
"""`seed: 'new'` is the `Same kind, new seed` action (a new document, §7.1) offered as a `ClerkAction`, never an event; `oasis` → `adjust('oasis', value)` and `history` → `adjust('history', h)` (V09 §4.21 (2), §4.22 (2); each a Re-derive from S0 shown with its fates); `advance` is V06 §4.1's request, run on the scratch, its epochs the proposal's events and its three shapes the variations |""")
e.R("""| | `islet` | `drawWater { kind: the water's kind at the point (its entity card), add: [], subtract: [the ring of radius √(sizeM2 ÷ π) around `at`, `encoders.ringSides` sides] }` — land raised in the water (the base's land brush); `sizeM2` default 2 000 m² (our own, calibrate-later) |""",
"""| | `islet` | `drawWater { kind: the water's kind at the point (its entity card), add: [], subtract: [the ring of radius √(sizeM2 ÷ π) around `at`, `encoders.ringSides` sides] }` — land raised in the water (the base's land brush); `sizeM2` default `encoders.islet.sizeM2` |""")
e.R("""| | `lake` | `drawWater { kind: 'lake', add: [], from: { points: [p], levelCm: ground(p) + depthM × 100 } }`, `ground(p)` the `EntityCard.groundCm` of the point |""",
"""| | `lake` | `drawWater { kind: 'lake', add: [], from: { points: [p], levelCm: ground(p) + depthM × 100, spring } }`, `ground(p)` the `EntityCard.groundCm` of the point; `spring: true` only when the input sets it — an oasis, S1 building its spring-fed water, grove and gardens (§4.2 S1; item 111 (a)); on a sky island's key the dry run bends it to a plain pond (`bend.oasis.sky`, V09 §4.21 (6)) |""")
e.R("""| T5 `quarter` | — | `quarter { boundary: [], from: { points: seed ? [seed] : corners ?? lasso, sizeM2? }, kind, name, band, district, expansion }` (`sizeM2` only in a size variation, item 348); `district` may be a `CreatedRef` to a quarter the draft made |""",
"""| T5 `quarter` | — | `quarter { boundary: [], from: { points: seed ? [seed] : corners ?? lasso, sizeM2? }, kind, name, band, district, fabric, terrace, expansion }` (`sizeM2` only in a size variation, item 348; `fabric` and `terrace` items 349 and 350, absent unless the input sets them); `district` may be a `CreatedRef` to a quarter the draft made |""")
e.R("""rule (item 101: the roster is the dossier's): naming no element, it is refused `dossier-owned` with the unplaced elements offered, and the clerk's `dossier` refusal (V10 §3.16) adds the same place on the first candidate with no `hardFails` of `query({ kind: 'sites', cls, near: the locus target's EntityCard.anchor, district: the target's id when the locus is `in` a quarter, k: 3 }, { admitAs: the session's effective key in V10 §2.3's form })` — V09 §4.5's query, one text for canvas and clerk (XV-V9-19 (b));""",
"""rule (item 101: the roster is the dossier's): naming no element, it is refused `dossier-owned` with the unplaced elements offered, and the clerk's `dossier` refusal (V10 §3.16) adds the same place on the first candidate with no `hardFails` of `query({ kind: 'sites', cls, near: the locus target's EntityCard.anchor, district: the target's id when the locus is `in` a quarter, k: 3 }, { admitAs: the session's effective key in V10 §2.3's form })` — V09 §4.5's query, one text for canvas and clerk;""")
e.R("""With a dossier connected the line obeys §7.1's roster rule (item 101: the roster is the dossier's):""",
"""With a dossier connected the line obeys §7.1's dry-run outcome table's roster row (item 101: the roster is the dossier's):""")
e.R("""| | `class` | a specialisation id (`stepped_temple`, `terraced_palace`, `tiered_tower`) goes in the designation as its class, by the mechanism V11 settles for a specialisation; every other class id as written |""",
"""| | `class` | a specialisation id (`stepped_temple`, `terraced_palace`, `tiered_tower`) is placed as the first carrier class V11 §3.24.3 lists for it, then set on the use by `setAttr { id: { created: { item: <this item>, event: 0, kind: 'use', nth: 0 } }, path: 'specialisation', value }` — a set specialisation is exempt from the chance and the cap, so it stands in any town of any culture (V11 §3.24.3); every other class id as written |""")
e.R("""| | `element` | `placeAt { plot: '' or the plot, from?, element }` — positions a dossier element or an assignment member (item 20 (g)); with `where.locus`, the one-line roster of the row above with the line's `element` (§7.1's roster rule) |""",
"""| | `element` | `placeAt { plot: '' or the plot, from?, element }` — positions a dossier element or an assignment member (item 20 (g)); with `where.locus`, the one-line roster of the row above with the line's `element` |""")
e.R("""| T8 `fill` | `arrangement`, `class` | `fill { scope, arrangement, cls }` — `scope` `{ ids: [ref] }`, or for `around` `{ ring: the 32-gon of the radius, key, level: 1 }` |""",
"""| T8 `fill` | `arrangement`, `class` | `fill { scope, arrangement, cls }` — `scope` `{ ids: [ref] }`, or for `around` `{ ring: the regular polygon of `encoders.scopeRingSides` sides and the radius, key, level: 1 }` |""")
e.R("""| | `green` | `drawGreen { polygon: the 24-gon of the radius around the anchor, kind }` |""",
"""| | `green` | `drawGreen { polygon: the regular polygon of `encoders.ringSides` sides and the radius around the anchor, kind }` |""")
e.R("""— the point V09's **Split here** writes for a click (V09 §4.5's T9 row after SR-27) — and `join` → `merge { ids: [target, ...join] }`, as **Join these** writes it (§7.1's ways row; J-SS1.6);""",
"""— the point V09's **Split here** writes for a click (V09 §4.5's T9 row) — and `join` → `merge { ids: [target, ...join] }`, as **Join these** writes it (§7.1's ways row);""")
e.R("""| | `link` | `editTable { table: 'siting.linkEdits', ops: [ pin: an upsert of row `<target address>/<good>` with `{ bindTo: provider }`; avoid: an upsert adding `provider` to the row's `avoid` list; cut: an upsert with `{ cut: true }`; release: a delete of the row ] }` (V11 §4.2; V09 XV-V9-2) |""",
"""| | `link` | `editTable { table: 'siting.linkEdits', ops: [ pin: an upsert of row `<target address>/<good>` with `{ bindTo: provider }`; avoid: an upsert adding `provider` to the row's `avoid` list; cut: an upsert with `{ cut: true }`; release: a delete of the row ] }` (V11 §4.2's cells: `bindTo` keeps a supplier, `avoid` cuts one and the next nearest serves, `cut` stops the good at that use) |""")
e.R("""| | `merge` | `editTable { table: 'siting.declared', ops: [an upsert of row `use:<the works use's address>` with `{ split: false }`] }`, or with `allOfKind` the kind's key (`uid:<localUid>`, `cat:<catalogId>` or `cls:<class>`, V11 §4.2 and V09 XV-V9-1) — "Let the rules decide" is the row's delete |""",
"""| | `merge` | `editTable { table: 'siting.declared', ops: [an upsert of row `use:<the works use's address>` with `{ split: false }`] }`, or with `allOfKind` the kind's key (`uid:<localUid>`, `cat:<catalogId>` or `cls:<class>`, V11 §4.2) — "Let the rules decide" is the row's delete |""")
e.R("""| | `siting` | `editTable { table: 'siting.declared', ops: [an upsert of the target's kind key with the given `place`, `quarter`, `pin` and `profile` cells and `weights` as the kind row's `familyWeights` cell (V11 §4.2; V09 §2.6; CVR-V10-16, met)] }` — never a dossier write (item 20); a cell the dossier owns is refused `dossier-owned` by the dry run |""",
"""| | `siting` | `editTable { table: 'siting.declared', ops: [an upsert of the target's kind key (`uid:`, `cat:` or `cls:`) with the given `place`, `quarter` and `profile` cells and `weights` as its `familyWeights` cell; a `pin` an upsert of the target use's `use:` row with its `pin` cell] }` — each cell on a key form V11 §4.2 admits it on (V09 §2.6); never a dossier write (item 20); a cell the dossier owns is refused `dossier-owned` by the dry run |""")
e.R("""| | `newNames` | V09's **New names** in its three scopes (V09 §4.5's T11 row after SR-29):""","""| | `newNames` | V09's **New names** in its three scopes (V09 §4.5's T11 row):""")
e.R("""read with `admitAs` the session's effective key (V10 §2.3; V10 §6.1's row) — the scope V09 §4.5's T11 row writes (J-SS1.8; J-V10.95); `town` → `rerollLayer { concern: 'naming', salt: MapBrief.salts.naming + 1 }` with no `ids` (J-V10.96). `ids` in address order in both scoped forms; a scoped re-roll's per-entity `salts` are the dry run's (§6.3 case (3));""",
"""read with `admitAs` the session's effective key (V10 §2.3; V10 §6.1's row) — the scope V09 §4.5's T11 row writes (J-V10.95); `town` → `rerollLayer { concern: 'naming', salt: MapBrief.salts.naming + 1 }` with no `ids` (J-V10.96). `ids` in address order in both scoped forms; an ids-scoped `rerollLayer`'s per-entity `salts` are the dry run's (§6.3 case (3));""")
e.R("""the bytes of V09's **New compass**, **New emblem** and **New trees** (J-V10.96); for `decoration`, `rerollLayer { concern: 'style.jitter', salt: MapBrief.salts['style.jitter'] + 1 }` then `rerollLayer { concern: 'style.crowns', salt: MapBrief.salts['style.crowns'] + 1 }`, in §6.1's registry order, one item and so one group on acceptance (V10 §4.2) — the bytes of V09's **New decoration** (J-SS2.9; J-V10.99);""",
"""the bytes of V09's **New compass**, **New emblem** and **New trees** (J-V10.96); for `decoration`, one `rerollLayer { concern, salt: MapBrief.salts[concern] + 1 }` per concern of the group V09 §4.5's T12 row states for **New decoration**, in §6.1's registry order, one item and so one group on acceptance (V10 §4.2) — its bytes (J-V10.99);""")
e.R("""**Reached only through the `events` escape hatch.** For each tool, the kinds its registry row lists (T101-1) that no
form above emits""","""**Reached only through the `events` escape hatch.** For each tool, the kinds §7.1's binding table gives it (T101-1's
registry) that no form above emits""")
e.R("""   untouched empty-state town, the view moves to the new document (`ClerkMount.openNewDocument`) and the old handle
   closes — nothing is lost, the old town being its seed and still in the recent documents (R15); otherwise the new
   document opens beside the current one (V09) and nothing of the current one changes.""","""   untouched empty-state town (V09 §3.2 (3): its log holds only a creation prefix that declares nothing), the view moves
   to the new document (`ClerkMount.openNewDocument`) and the old town is dropped as V09 §3.2 (3) drops it on **Surprise
   me** — nothing is written for it to the local store or Recent — while the harness keeps its blueprint (seed and
   recipe) with the accepted proposal (`Proposal.accepted.replaced`, V10 §2.5) for the session, so the card's **Undo**
   regenerates it byte-identically (the same seed and recipe give the same town, §6) as the empty state again (V10 §4.3).
   The new document, whose prefix declares (`proposedBy: 'clerk'`), is a saved town at acceptance — its `LocalDocRecord`
   created then (V09 §3.8), never an empty state. Otherwise the new document opens beside the current one (V09 §4.11)
   and nothing of the current one changes. Test: T-V10-49 (EI-V10-EDGE-1).""")
e.R("""to the history panel, where the group is undone like any other (§7.4). Undoing a creation acceptance closes the new
document and returns to the previous one, which stays in the recent documents.""","""to the history panel, where the group is undone like any other (§7.4). The card's **Undo** of a creation acceptance
closes the new document (a saved town, it stays in Recent) and returns to the previous one — a saved town from Recent,
or the replaced empty-state town regenerated from `accepted.replaced` (V10 §4.2 (3)); when the drawer's session closes
the kept blueprint goes with it, and the card with its **Undo**.""")
e.R("""its card reads `clerk.applied`, "Applied", with its **Undo** button (`clerk.alt.history.undo`) — "Applied — Undo" on the""",
"""its card reads `clerk.applied`, "Applied", with its **Undo** button (V09 §4.9's `button.undo`) — "Applied — Undo" on the""")
e.R("""Each event's locality is its kind's (§7.3); the clerk adds none and widens none. The encoder never emits an unscoped
re-roll in edit mode (R5, §7.3 item 10) — a town-wide `rerollLayer` of names, compass, emblem, trees or decoration is scoped
by its layer (§7.1's New random: a rerollable layer is a scope);""","""Each event's locality is its kind's (§7.3); the clerk adds none and widens none. The encoder never emits a whole-town
New random in edit mode (R5, §7.3 item 10) — a town-wide `rerollLayer` of names, compass, emblem, trees or decoration is
scoped by its layer (§7.1's New random: a rerollable layer is a scope);""")
e.R("""the card; a proposal's declared entities are held after acceptance (R13) and every later re-roll keeps them; an accepted
removal of generated content holds through every regeneration, scoped re-roll and epoch by the fold's suppression (item
110 (b); V06 §2.13),""","""the card; a proposal's declared entities are held after acceptance (R13) and every later New random keeps them; an
accepted removal of generated content holds through every regeneration, New random and epoch by the fold's suppression
(item 260; V06 §2.13),""")
e.save()
