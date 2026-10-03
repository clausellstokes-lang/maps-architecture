# edits_a — V03 §0, §1, §1b, §2.2, §2.4, §2.5. Each E(heading, old, new, count, tag); tag = the issue or ruling served.
H0 = '## 0 In plain words'
H1 = '## 1 Scope, the base hooks consumed, and what is out of scope'
H1B = '## 1b Wiring table'
H22 = "### 2.2 Identity of the plan's parts"
H24 = '### 2.4 The rule tables and the default rows'
H25 = '### 2.5 Lifecycle of every new state field'


def add(E, A):
    # ---------------- §0 — plain words for items 122 (d) and 123 ----------------
    E(H0,
      "switching storeys and editing stay as quick as before.",
      "switching storeys and editing stay as quick as before.\n"
      "\n"
      "**Ruins and disasters.** A house left empty keeps the plan it had while people lived there: it is never drawn anew,\n"
      "it ages. First the dust gathers, the furniture breaks and the doors come off their hinges; then floors rot through,\n"
      "partition walls fall and the roof opens over the rooms, which are marked unsafe; at last the outer walls break and the\n"
      "upper floors are gone, leaving only the ground floor to walk on, while the cellar and a church's crypt hold out\n"
      "longest. The same wall or floor always gives way first and stays broken where it fell, so scrubbing through the years\n"
      "shows one plan aging, and a house repaired shows its patches. While a fire, a flood or an earthquake the settlement is\n"
      "living through leaves a quarter in ruins, its houses show the same damage for those weeks only — a look that ends with\n"
      "the disaster, the rebuilding or the real ruin taking over. The panel says what has gone (\"roof fallen in over the\n"
      "hall; the upper floor is gone\"), and battle-map exports follow the damage: a fallen wall no longer blocks sight, and\n"
      "rubble and holes are in the picture, never walls.",
      1, 'G123-V03, G122-V03 §0')

    # ---------------- §1 ----------------
    E(H1,
      "(item 120; V03 §5.5); budgets with the plan's share",
      "(item 120; V03 §5.5); the damage layer — a decayed, ruined or restored building's plan amended, never redrawn, and a\n"
      "disaster's look in it (items 123, 122 (d); V03 §3.11, V03 §5.6); budgets with the plan's share",
      1, 'G123-V03, G122-V03 scope')
    E(H1,
      "| the view key `find` (§2.9), the veil, outline and halo rows (§8.2), Find in picture exports (§11.1), the gazetteer's "
      "matches under knowledge admission (§11.2), the overlay's budget (§12.5) — item 120 | the rooms a match uses at the "
      "interior band (V03 §5.5), T-V3-38 |",
      "| the view key `find` (§2.9), the veil, outline and halo rows (§8.2), Find in picture exports (§11.1), the gazetteer's "
      "matches under knowledge admission (§11.2), the overlay's budget (§12.5) — item 120 | the rooms a match uses at the "
      "interior band (V03 §5.5), T-V3-38 |\n"
      "| §2.6 step 7's damage layer (the plan built, never redrawn), §6.3's `plan.damage` thresholds, §8.6's damaged plan, "
      "§11.1's battle maps following the damage (item 123); `Existence` and the decline ladder's roofless "
      "`RoofSpec.kind 'none'` (§2.6, §2.7, §2.8) | the plan in force (V03 §3.11); the layer's elements, kinds and states "
      "(V03 §5.6); the drawing per state (V03 §5.1); the exports (V03 §5.2, V03 §5.3); the panel's lines and the `plan` "
      "section's rows (V03 §4.5, V03 §4.6); T-V3-39 |\n"
      "| §2.7's `ConditionOverlay` with its reader rule, §2.9's `crises` and `week`, §7.7's DR44, §10.2's crisis tables with "
      "the `disaster` row's `lookLevel` (item 122) | a disaster's look in the plan (V03 §5.6 (4)), T-V3-40 |",
      1, 'G123-V03, G122-V03 hooks')
    E(H1,
      "Volume 10: `WhyProvider`, `WhySectionProvider`\n"
      "and `WhyAnswer` (V10 §2.13, V10 §3.9, V10 §3.9a; BCR-V10-3).",
      "Volume 10: `WhyProvider` and `WhySectionProvider`\n"
      "(V10 §2.13), and §11.2's `WhyAnswer` (its sections V10 §3.9, V10 §3.9a; BCR-V10-3).",
      1, 'VAH-r1-14 per R2-10')
    E(H1,
      "the scene archetypes and the custom-content resolver (V11 §3.13). File g:",
      "the scene archetypes and the custom-content resolver (V11 §3.13). For items 122 (d) and 123 (V03 §5.6): volume 2's\n"
      "`exteriorDamage` and `ExteriorDamage` (V02 §2.4) with V02 §5.7's level rule, the look's units and its hand-over\n"
      "(V02 §5.7 (1), (6)); volume 4's `belowKind` and the damage below ground (V04 §5.6); volume 6's `decayLevel` and\n"
      "`decayPeak` (V06 §3.23), `crisisLookYields` (V06 §3.22) and the frames' history images (V06 §3.15.2, V06 §3.15.5);\n"
      "volume 9's damage lines, `info.damage.*` and `info.crisis.ruinedFor` (V09 §4.21.13, V09 §4.9); volume 10's damage\n"
      "rows and look read (V10 §3.9a, V10 §3.9b (8)); volume 11's `DamageElementKind` (V11 §2.8d) with its\n"
      "`damage.elements` and `damage.materials` (V11 §3.25.10).\n"
      "File g:",
      1, 'G123-V03, G122-V03 volumes read')
    E(H1,
      "item 119 (the plan's one-time waits; J130) and item 120 (Find at the interior band; J133).",
      "item 119 (the plan's one-time waits; J130), item 120 (Find at the interior band; J133), item 122 (d) (a disaster's\n"
      "look in its buildings' plans; J135) and item 123 (a ruined building's plan amended, never redrawn; J136), with item\n"
      "114's patch material (§8.6).",
      1, 'G123-V03, G122-V03 file g')
    E(H1,
      "this volume gives the rooms a match uses at the interior band (V03 §5.5).\n"
      "Elevation drawings:",
      "this volume gives the rooms a match uses at the interior band (V03 §5.5).\n"
      "The decay level, its peak, the look's hand-over and the frames (volume 6), the damage ranges and rates (volume 11), the\n"
      "damaged forms (§8.6), the damage below ground (volume 4), the exterior's damage and the look's level rule (volume 2),\n"
      "the look's districts (volumes 1 and 7), the damage lines' words (volume 9) and the explanations (volume 10) — this\n"
      "volume gives the plan in force, its elements, their states and their drawing (V03 §3.11, V03 §5.6).\n"
      "Elevation drawings:",
      1, 'G123-V03, G122-V03 out of scope')

    # ---------------- §1b ----------------
    E(H1B,
      "| a room's `lit` (its role's unless an edited attribute) | `RoomRoleRow.lit`, the edited `Room.lit` | the draw's "
      "lights, VTT and Foundry lights |",
      "| a room's `lit` (its role's unless an edited attribute; none while its building is `abandoned`, `decayed` or "
      "`ruined`, V03 §5.6 (6)) | `RoomRoleRow.lit`, the edited `Room.lit`, the building's `Existence` | the draw's lights, "
      "VTT and Foundry lights |",
      1, 'G123-V03 lights')
    E(H1B,
      "| V09's `live.find` overlay with §8.2's veil, outline and halo rows; the storey switcher's and the plan panel's marks "
      "(V03 §4.5); the SVG `plan.find` group (V03 §5.2); T-V3-38 |",
      "| V09's `live.find` overlay with §8.2's veil, outline and halo rows; the storey switcher's and the plan panel's marks "
      "(V03 §4.5); the SVG `plan.find` group (V03 §5.2); T-V3-38 |\n"
      "| the plan in force of a building in a decay run (V03 §3.11) | the stored plan; else the building's and its plot's "
      "records in the week before its run began (V06 §3.23 (1)'s run start; read from V06 §3.15.2's history images, else "
      "the frame `locate` gives); for a building first met so, its as-built plan | the plan rung (V03 §3.1) and its "
      "recorded inputs through the run (no stale mark, §2.8); the draw, every export and query; T-V3-39 |\n"
      "| the damage layer — `planDamage(doc, b, plan, view, opts)`: each element's kind and state, the drawn and the own "
      "level (V03 §5.6) | the drawn plan's parts (V03 §2.2); §6.3's `plan.damage` with V11 §3.25.10's ranges; V04 §5.6's "
      "`belowKind`; V06's `decayLevel` and `decayPeak`; each wing's `RoofSpec.kind`; the look over the building by "
      "V02 §5.7 (1)'s rule (§2.7's `ConditionOverlay`, §2.9's `week` and `crises`, §7.7's DR44, §10.2's `lookLevel`, "
      "V01's `disasterDistricts`, V07's ends, V06's `crisisLookYields`); the view's knowledge key (V03 §5.4) | V03 §5.1's "
      "draw; V03 §5.2's `plan.damage` group; V03 §5.3's scenes and JSON `damage`; the panel's damage lines (V03 §4.5; "
      "V09 §4.21.13); the `plan` section's damage rows (V03 §4.6; V10 §3.9a); V02 §5.7's element reading (its roof bays "
      "and outer wall runs); T-V3-39, T-V3-40 |",
      1, 'G123-V03, G122-V03 derived pieces')
    E(H1B,
      "| `findRooms(plan, b, target)` (V03 §5.5) | this volume's pure reading in `@plat/buildings`, landing with Find "
      "(V03 §8) | V09's `live.find` overlay, V03 §4.5's switcher and panel, V03 §5.2's SVG exporter |",
      "| `findRooms(plan, b, target)` (V03 §5.5) | this volume's pure reading in `@plat/buildings`, landing with Find "
      "(V03 §8) | V09's `live.find` overlay, V03 §4.5's switcher and panel, V03 §5.2's SVG exporter |\n"
      "| `planDamage(doc, b, plan, view, opts)` (V03 §5.6) | this volume's pure reading in `@plat/buildings`, landing at P4 "
      "(V03 §8) | V03 §5.1's draw, V03 §5.2's and V03 §5.3's exporters, the panel (V03 §4.5), the `plan` section "
      "provider (V03 §4.6), V02 §5.7's element reading |",
      1, 'G123-V03 interface')
    E(H1B,
      "never persisted: each is re-derived at read from the wings, the openings and the raised ways.",
      "never persisted: each is re-derived at read from the wings, the openings and the raised ways. Item 123's damage\n"
      "adds no part and no entity: each element is drawn and exported in its state (V03 §5.6) and persists as the plan it\n"
      "belongs to.",
      1, 'G123-V03 entity kinds')
    E(H1B,
      "the view key `find` (§2.9;\n"
      "item 120), read and never written by V03 §5.5.",
      "the view key `find` (§2.9;\n"
      "item 120), read and never written by V03 §5.5; the view keys `week` and `crises` (§2.9; items 67, 122), read and\n"
      "never written by V03 §5.6.",
      1, 'G122-V03 view state')
    E(H1B,
      "No dossier fact names\n"
      "  a retaining wall, a raised way's span or a deck: they reach the plan as map facts only.",
      "No dossier fact names\n"
      "  a retaining wall, a raised way's span or a deck: they reach the plan as map facts only;\n"
      "* **a calamity or a condition** (item 122) → §2.7's `ConditionOverlay`, mapped to a look by §7.7's DR44 → a\n"
      "  disaster's look over its districts → the plan's look damage (V03 §5.6 (4)), a look only; what it leaves reaches the\n"
      "  plan only through the epoch path (V06 §3.22 (1)) — an existence change into a decay run (V03 §3.11), drawn at its\n"
      "  decay level (V06 §3.23).",
      1, 'G122-V03 dossier end to end')

    # ---------------- §2.2 — the damage elements' ids ----------------
    E(H22,
      "of the room order (V03 §5.1).",
      "of the room order (V03 §5.1).\n"
      "\n"
      "**Damage elements** (item 123; V03 §5.6 (1)): each wall, opening with a leaf, window, stair core and furniture item\n"
      "above, and a room's floor area, the roof bay over it and a choir flight by the room's address, keyed with its kind —\n"
      "the key of its one threshold (§6.3's `plan.damage`); damage mints no id, and an element a re-cut keeps keeps its id\n"
      "and so its threshold.",
      1, 'G123-V03 ids')

    # ---------------- §2.4 — the vacant programme: a standing building's only ----------------
    E(H24,
      "**The vacant programme** (A1, a building with no `use` and no household, item 17): the class row at the plot's\n"
      "`builtBand` with the as-built unit form's rooms (the ladder row at `builtBand`), and the crypt where `Basement.crypt`\n"
      "exists (A2 (9)), every room scope `service`, no `unit`, no furniture, labelled by role; `PlanReport.programmeSource.vacant`\n"
      "set. A ruined or decayed building draws this plan as\n"
      "V03 §5.1 states.",
      "**The vacant programme** (A1, a standing building — its existence `generated`, `built`, `altered` or `converted` —\n"
      "with no `use` and no household, item 17): the class row at the plot's\n"
      "`builtBand` with the as-built unit form's rooms (the ladder row at `builtBand`), and the crypt where `Basement.crypt`\n"
      "exists (A2 (9)), every room scope `service`, no `unit`, no furniture, labelled by role; `PlanReport.programmeSource.vacant`\n"
      "set. A building `abandoned`, `decayed` or `ruined` never takes it: it keeps the plan in force (V03 §3.11's *Decay\n"
      "re-cuts no plan*) under the damage layer (V03 §5.6).",
      1, 'G123-V03 (R2-38 (1)) vacant programme')

    # ---------------- §2.5 — lifecycle rows ----------------
    E(H25,
      "| the rooms a Find match uses (V03 §5.5) | derived per call from the drawn plan and the view key `find` (§2.9) | "
      "never (view state, outside the document, its hash and the log) | re-read at every commit, regenerate, undo, advance "
      "of time and season change and with the plan's re-derivation (item 120 (f)) | its inputs' undo; the view key is not "
      "undone (§2.9) | none |",
      "| the rooms a Find match uses (V03 §5.5) | derived per call from the drawn plan and the view key `find` (§2.9) | "
      "never (view state, outside the document, its hash and the log) | re-read at every commit, regenerate, undo, advance "
      "of time and season change and with the plan's re-derivation (item 120 (f)) | its inputs' undo; the view key is not "
      "undone (§2.9) | none |\n"
      "| the plan in force of a building in a decay run (V03 §3.11) | derived when the plan is drawn: the stored plan as "
      "stored; an unstored one re-derived from its canonical prior at the occupant inputs of the week before its run began, "
      "memoised per lineage for the run; for a building first met so, its as-built plan | never (a stored plan persists "
      "as any stored plan; the inputs are read from the history) | a regenerate re-derives the same plan from the same "
      "inputs, its draws keyed as any re-cut's (§6.1) | an undone epoch's events gone, the run's start (or no run) as the "
      "log then gives it; undoing the restoring event resumes the run and its reading | none: no field; a document from "
      "before V03's item-123 step reads it at once |\n"
      "| the damage layer — `planDamage` (V03 §5.6) | derived per call from the drawn plan, §6.3's thresholds, V06's "
      "`decayLevel` and `decayPeak` at the drawn week, the wings' roof kinds and the look over the building (V02 §5.7 (1)) "
      "| never: a view at a week, outside every digest, the cache chunk and `PlanReport` | re-read with the plan and the "
      "level; a regeneration from the same seed keeps every threshold (§6.3) | its inputs' undo; the view keys `week` and "
      "`crises` are not undone (§2.9) | none |",
      1, 'G123-V03, G122-V03 lifecycle')
