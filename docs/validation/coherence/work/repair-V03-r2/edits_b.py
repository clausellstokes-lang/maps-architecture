# edits_b — V03 §3.2, §3.11, §3.13, §4.3, §4.4, §4.5, §4.6.
H32 = '### 3.2 A — the programme'
H311 = '### 3.11 Re-cuts — the chain steps, the kept-room test and the kept openings'
H313 = '### 3.13 Edges at their limits (principle (11))'
H43 = '### 4.3 Locality, stored plans, carries, New random and undo'
H44 = '### 4.4 What is not an edit'
H45 = "### 4.5 The click, the storey switcher and the plan panel — the viewer's experience"
H46 = '### 4.6 The clerk\'s view — plan queries and "why?"'


def add(E, A):
    # ---------------- §3.2 A1 — who takes the vacant programme ----------------
    E(H32,
      "A building with no `use` and no household takes **the\n"
      "vacant programme** (V03 §2.4).",
      "A standing building with no `use` and no household takes **the\n"
      "vacant programme** (V03 §2.4); a building in a decay run resolves at the inputs V03 §3.11's *Decay re-cuts no plan*\n"
      "reads, and one first met `abandoned`, `decayed` or `ruined` at its designation template's key and its `builtBand`\n"
      "(rules (1)–(4)).",
      1, 'G123-V03 (R2-38 (1)) A1')

    # ---------------- §3.11 — decay re-cuts no plan ----------------
    E(H311,
      "Each step of the chain is one such derivation with its draws keyed by the step's target (§6.1).",
      "Each step of the chain is one such derivation with its draws keyed by the step's target (§6.1).\n"
      "\n"
      "**Decay re-cuts no plan** (item 123 (a); §2.6 step 7; J-V3.137). A building whose existence is `abandoned`, `decayed`\n"
      "or `ruined` — in a decay run (V06 §3.23 (1)) — keeps the plan in force when its run began: the existence change, and\n"
      "the use and households leaving with it, neither re-cut that plan nor mark it stale, and the vacant programme\n"
      "(V03 §2.4) never reaches it.\n"
      "* **(a) A stored plan stands.**\n"
      "* **(b) An unstored plan** is re-derived, when drawn, from its canonical prior (§2.6: the as-built plan at the\n"
      "  building's built band and era, carried along the canonical chain) at the occupant inputs it held in the week before\n"
      "  its run began — its use, assignment, sub-locations, concealed use and households housed, and the occupants' band and\n"
      "  value (§2.8's plan-rung inputs) — read from the building's and its plot's records as they stood that week\n"
      "  (V06 §3.15.2: their history images, else the frame `locate` gives) and memoised per lineage for the run, so its\n"
      "  recorded inputs do not move and it stays `current` through the run: the plan the building was last lived in, which\n"
      "  for a building never re-let is its as-built plan. Its other inputs — its wings, accesses, crypt and outside ground, a build\n"
      "  Works' stage (a `decay` or `repair` Works is none, §2.6 step 7) and the slices — are read as any building's, so an\n"
      "  author's edit of them re-cuts the stored plan (V03 §4.3) or stales the unstored one as on any building, a kept\n"
      "  element keeping its id and so its threshold (§6.3), an element the re-cut mints drawing by its own.\n"
      "* **(c) First met so.** A building first met `abandoned`, `decayed` or `ruined` — generated so, or first reached so by\n"
      "  item 113's history replay — and one whose week before the run the history no longer reaches (a rebase condensed it,\n"
      "  V06 §3.15.5) gets its **as-built plan**: A1 at its designation template's key and its `builtBand` (rules (1)–(4)),\n"
      "  the template's `households.built` clamped into [1, capacity] at the as-built form, then its damage.\n"
      "\n"
      "In every case every room, wall, opening and id is the one the building last stood with, and its damage is V03 §5.6's\n"
      "layer. **The run's end ends the freeze**: the event that restores the building (a `reoccupy`, a repair; V06 §3.23 (3))\n"
      "reads its inputs as any standing building's, so occupants other than those that left re-cut a stored plan inside that\n"
      "event and stale an unstored one (§7.3), the kept elements keeping their thresholds while the damage leaves\n"
      "(V06 §3.23 (3)); a rebuild or a successor on the trace is a new plan (§6.3), and a trace (`cleared`, `reused`) or a\n"
      "demolished building has no plan to draw (V06 §3.23 (3)).",
      1, 'G123-V03 (R2-38 (1)) no re-cut on decay')

    # ---------------- §3.13 — edge rows ----------------
    E(H313,
      "| re-cuts (V03 §3.11) | a prior room's seed piece degenerate or gone; a kept opening's wall gone | V03 §3.11 | "
      "leave out and report | T-V3-9, T-V3-36 (i) |",
      "| re-cuts (V03 §3.11) | a prior room's seed piece degenerate or gone; a kept opening's wall gone | V03 §3.11 | "
      "leave out and report | T-V3-9, T-V3-36 (i) |\n"
      "| decay (V03 §3.11's *Decay re-cuts no plan*) | a building entering a decay run with a stored, an unstored and an "
      "absent plan; one re-let before it was left; one generated ruined or first met so in item 113's replay; a run whose "
      "week before a rebase condensed; an author's edit during the run; a restoration by the same and by other occupants; "
      "a rebuild, a successor, a trace | a stored plan stands, an unstored or absent one is the plan last lived in, from "
      "the frozen inputs, `current` through the run; the re-let plan, never the vacant programme or the as-built plan; "
      "the as-built plan; the as-built plan; the edit re-cuts or stales as on any building, kept elements keeping their "
      "thresholds; the restoring event re-cuts or stales as any event does; a new plan; a new plan; no plan | "
      "substitute (the as-built plan) | T-V3-39 (a) |",
      1, 'G123-V03 edges (decay)')
    E(H313,
      "| none (no failure) | T-V3-38 |",
      "| none (no failure) | T-V3-38 |\n"
      "| the damage layer (V03 §5.6) | level 0 and level 1; a level between two thresholds; a restoration to 0 with and "
      "without its Works; a run beginning while a restoration runs; a wing whose roof kind is `none`; a party wall; an "
      "empty plan and a one-room plan; a storey every floor area of which is damaged; a plan absent, cached, `stale` or "
      "stored; a concealed room at a public key; a deck building fallen with its deck; a storey below 0 and an underground "
      "building; a kind or material with no V11 row; every building before V06's level lands; every rung THORP → "
      "METROPOLIS; every toggle and preset, the parity presets included; save, load, undo, redo, regenerate, migrate | "
      "nothing damaged at 0, so the plan draws and exports byte-identically; every element damaged at 1, the ground storey "
      "and the storeys below 0 walkable, a ruined church's crypt rooms and ways kept (V04 §5.6); the elements whose "
      "thresholds the level reaches; V06 §3.23 (3)'s level and peak, the damage leaving in reverse threshold order, the "
      "patches kept (the larger level in an overlapping run); every roof bay of that wing damaged in the run, patched "
      "after its restoration; never broken; the outline with its heads, nothing to damage, and that room's elements; the "
      "switcher keeps it, described by `storeyGone`; the damage drawn only where a plan draws (a click or `view` derives "
      "it), a stale plan's cached elements under §8.5's marker; V03 §5.4's merge (V03 §5.6 (5)); V03 §5.1's deck fall; "
      "V04 §5.6's kinds and level; V11's default row (V06 §3.23 (4)); V11's default age; rung-independent per building; "
      "the same under every toggle and preset — a look of the model's state (with no Works, a restoration is at once, "
      "V06 §3.23 (3)); re-read at the drawn week, never stored | none (no failure); substitute (V11's default row and "
      "age) | T-V3-39 |\n"
      "| a disaster's look in the plan (V03 §5.6 (4)) | no condition and no preview; a condition ending, or the view's week "
      "leaving its weeks, in the session; a building under the look and its own decay; the hand-over "
      "(`crisisLookYields`); a condition the key withholds; Show crises off; a preview with no dossier; THORP, HAMLET and "
      "VILLAGE; a building whose plan does not draw; save, load, undo, redo, regenerate | nothing drawn, every plan tile "
      "byte-identical; the building at its own level from that week; the higher level on every element, the look leaving "
      "no patch; its own state and Works from the hand-over's week; nothing drawn; nothing drawn; the previewed look at "
      "`previewSeverity`; V07's ends as the units; the look on its exterior only (V02 §5.7); a view, re-read, nothing "
      "saved | none (no failure) | T-V3-40 |",
      1, 'G123-V03, G122-V03 edges (layer, look)')

    # ---------------- §4.3 — stored plans ----------------
    E(H43,
      "an edited part that no longer fits the new shell (its wing's clipped seed changed) is orphaned\n"
      "and reported (§7.4's plan-event row).",
      "an edited part that no longer fits the new shell (its wing's clipped seed changed) is orphaned\n"
      "and reported (§7.4's plan-event row). An existence change into `abandoned`, `decayed` or `ruined`, and the occupants\n"
      "leaving with it, re-cut no plan, stored or unstored (V03 §3.11's *Decay re-cuts no plan*).",
      1, 'G123-V03 (R2-38 (1)) stored plans')

    # ---------------- §4.4 — not an edit ----------------
    E(H44,
      "setting Find's chips (the view key `find`, V03 §5.5) and a clerk's plan or why query log nothing",
      "setting Find's chips (the view key `find`, V03 §5.5), moving the drawn week (§2.9's `week`) and setting Show\n"
      "crises or its preview (the view key `crises`) — which redraw a plan's damage (V03 §5.6) — and a clerk's plan or why\n"
      "query log nothing",
      1, 'G122-V03, G123-V03 not an edit')

    # ---------------- §4.5 — the switcher and the panel ----------------
    E(H45,
      "With Find on (item 120), every storey holding a room a match uses\n"
      "  carries its chip's glyph (V03 §5.5).",
      "With Find on (item 120), every storey holding a room a match uses\n"
      "  carries its chip's glyph (V03 §5.5). A storey every floor area of which is damaged (V03 §5.6) keeps its option, its\n"
      "  accessible description the `info.damage.storeyGone` line (V09 §4.9).",
      1, 'G123-V03 switcher')
    E(H45,
      "a church reaches the catacomb only through its crypt\". **Room numbers** (J-V3.59):",
      "a church reaches the catacomb only through its crypt\". **The damage** (item 123 (e); V03 §5.6 (7)): for a\n"
      "  building `abandoned`, `decayed` or `ruined`, one restored with patches and one under a disaster's look, volume 9's\n"
      "  damage lines (V09 §4.21.13 — the head `info.damage.head.<state>`, one line per damaged kind present in\n"
      "  `info.damage.*`'s order, three rooms and then `info.damage.more`, `info.damage.patched`; under a look the look's\n"
      "  lines under `info.crisis.ruinedFor`), read from `PlanDamage` at the drawn level and listed after the ways down; a\n"
      "  building in a decay run lists its units by form, naming no household (V03 §5.6 (6)). **Room numbers** (J-V3.59):",
      1, 'G123-V03, G122-V03 panel lines')

    # ---------------- §4.6 — the plan section's damage rows ----------------
    E(H46,
      "\"why can't I reach the top tier?\") answers from the ladder row",
      "\"why can't I reach the top tier?\", \"why is the upper floor gone?\") answers from the ladder row",
      1, 'G123-V03 why path')
    E(H46,
      "`PlanReport.warnings` and `PlanReport.notes`.",
      "`PlanReport.warnings`, `PlanReport.notes` and the damage rows below.",
      1, 'G123-V03 why path')
    E(H46,
      "The crypt rows are `purpose: true` (a crypt names a church),\n"
      "  so a withheld building's answer keeps none (V10 §3.9a).",
      "The crypt rows are `purpose: true` (a crypt names a church),\n"
      "  so a withheld building's answer keeps none (V10 §3.9a).\n"
      "* **`plan`'s damage rows** (item 123; V10 §3.9a's table; J-V3.136), on a building whose own level is above 0 or with\n"
      "  a repaired element, read from `PlanDamage` at the own level (V03 §5.6 (2) (d)): `info.damage.head.<state>` — its\n"
      "  `Existence`, `reused` for a standing building restored with patches — with the own level to 0.01; one\n"
      "  `info.damage.<kind>` row per kind present among `ownDamaged`, in V09 §4.9's order — `floor` for `upperFloor` and\n"
      "  `groundFloor`, `storeyGone` per storey every `upperFloor` area of which is damaged, `unsafe` per room §8.6 marks\n"
      "  unsafe, `cellar` for `cellarWall` and `cellarVault`, `crypt` for `cryptWall`, `cryptVault` and `cryptTomb`, each\n"
      "  other kind its own key — its value the count, `row` the V11 range row of its first element's kind, `ref` that\n"
      "  element; and `info.damage.patched` with the count of `repaired`. They pass V03 §5.4's merge at the session's key; on\n"
      "  a building the key withholds the rows that name rooms (`roofBay`, `floor`, `partition`, `furniture`, `unsafe`) are\n"
      "  `purpose: true`, as the crypt rows are, while the state, the level and the other rows' counts stay. A disaster's\n"
      "  look is no row: the clerk tells it from the look read (V10 §3.9b (8)), and the panel shows it (V03 §4.5).",
      1, 'G123-V03 (CVR-V10-21) plan section rows')
