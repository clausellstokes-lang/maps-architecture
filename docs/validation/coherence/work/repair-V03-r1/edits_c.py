# edits_c — V03 §6, §7, §8, §9, §12, §13.
H6 = '## 6 Performance budgets'
H7 = '## 7 Tests and acceptance bars'
H8 = '## 8 Build plan'
H9 = '## 9 Decisions (each vetoable)'
H12 = '## 12 CONFIRMED versus PLAUSIBLE'
H13 = '## 13 Fix list'

P6_WAITS = """

**One-time waits** (item 119, the plan's part; J-V3.133). The rows above and §12.7's plan row (R12-23) stay the
**targets** — as fast as possible, every path pressed toward them (§12.1; item 119 (a)). The plan rung's share of each
one-time wait lies inside §12.1's **comfort level** on its reference machine, at every rung up to the metropolis cap
(T-V3-37):
* **generate, regenerate and Re-derive** — PE's eager facts (`Entrance.storey`, `basementDoor(b)`, `stackAccessDoor(b,
  a)`) and the crypt rank pass run inside S11's stage budget (the rows above), so the generation the base times holds
  them; the plan rung itself runs on no generation (§4.1's lazy policy);
* **a dossier change applied, and every event that moves a stored plan's inputs** (a `relet`, a designation mutation, a
  table edit, a retaining wall or a levelling beside the building, the rank's re-cut of the other crypts) — each stored
  plan it reaches is re-cut inside that event (§7.3; V03 §4.3) at §12.7's chain budget, counted in the event's wait; an
  unstored plan is only marked stale;
* **an epoch** — its stored plans' re-cuts and the crypt rank inside its ops (V03 §3.7.4 (3)) count in the epoch's work,
  timed as volume 6's part of item 119 times an advance of time and the history replay (V06 §6);
* **a plan export** — a picture or scene export of one building (V03 §5.2, V03 §5.3) derives its plan as the `plan`
  query does (§12.7's chain budget), then draws or writes it (the per-storey rows above; the raster at §12.7's PNG
  budget); the whole-document JSON, CityJSON and glTF `interiors` carry the stored plans and the cached ones and derive
  none (§11.1; J-A28.86), so their plan part is serialisation inside the export's own budget;
* **a migration on load** — V03 §2.5's migrate cells, `BaseWing.partName` matched per template-family building and
  `Basement.crypt` re-derived per `always` and `basement` building with a basement (the rank pass once), inside the
  load's migration step; a cached chunk is non-canonical and is re-derived at its next click (§2.9).

A wait past the comfort level fails its bar (§12.1) and the plan's part takes the pre-decided fallbacks above (the module
doubled for the class, the steps' memoised chunks kept); at run time the wait completes and is reported, never answered
by a coarser plan (§12.7). A plan step runs slower than its target only for a measured gain recorded as its
`perf.qualitySpend` row (V11 §3.25.8; §4.1's quality budget) and still inside the comfort level (item 119 (b)); none
ships. A wait past about one second shows progress — the stage by name and the map filling in — through V09 §4.21.9's
progress view (§12.1's progress rule; item 119 (c)). **Interaction stays fast** (item 119 (d)): the click and its plan (a
stale chain derived in idle frames, the progress tick until it lands), the storey switch, `elaborate: 'view'` within
§12.5's frame budget, Find's room reading and a plan edit's preview (§12.6) keep the rows above and §12's, none relaxed.
The low tier aims at the same comfort level, a size it cannot reach declared per device (item 119 (e))."""

T37 = ("| T-V3-37 | the plan's one-time waits (item 119 (f)'s plan clauses; V03 §6), on §12.1's reference machine, five seeds per "
       "wait at every rung's top and at the metropolis cap, each timed from the click to the complete result: (a) a dossier "
       "change applied on a CITY document of B-EDIT's dossier fixtures (§13.2) given a stored plan on every building of its largest "
       "district, whose re-homing relets each of them by one household, so that every stored plan is re-cut inside the "
       "event; (b) every plan export of the tallest B-PLAN fixture (the terraced palace's eight storeys) — the SVG storey and "
       "all-storeys sheets, the PNG sheet at the export dialog's largest offered size, the `.dd2vtt` and Foundry scenes per "
       "storey — and the whole-document JSON, CityJSON and glTF `interiors` with the elaboration cache at its §12.8 cap; (c) "
       "a load migrating a document written before M6-U (every `always` and `basement` building's crypt re-derived) and one "
       "without `BaseWing.partName` — each within the comfort level (§12.1; T119-2); every such wait past one second shows "
       "V09 §4.21.9's progress within a second of the click, never an empty screen (T119-3); every plan step slower than its "
       "V03 §6 or §12.7 target has its `perf.qualitySpend` row with its recorded gain, none at shipping (T119-4); the click "
       "and a stale chain's derivation, the storey switch, `elaborate: 'view'`'s frame share, Find's room reading and a plan "
       "edit's preview hold their V03 §6 and §12 rows, none relaxed against the previous release (T119-5; V12 §3.15.9 (5)); "
       "an epoch's re-cuts are timed by volume 6's part of item 119 | §12.1's timing phase with V12 §3.15.9's wait timer "
       "(`wait.dossierChange`, `wait.export`, `wait.migrate`), nightly; clause (b) from P5, the rest from P6 |\n")

T38 = ("| T-V3-38 | Find at the interior band (item 120 (k)'s plan clauses; V03 §5.5), on B-PLAN's fixtures and B-CITY-lite's "
       "clicked buildings with chip sets of one to twelve chips: (a) the model digest, every stored plan, cache chunk and "
       "`PlanReport` and the saved bytes are identical with Find on and off, and Clear leaves every plan tile byte-identical; "
       "(b) `findRooms` returns exactly V03 §5.5 (1)'s set — a `smithy` chip on the smithy with a separate dwelling glows its "
       "work building's programme rooms and no room of the dwelling, whose outline alone carries the halo; the split brewer "
       "pair glows the brewhouse in the works and the taproom in the shop; a `church` chip on the cruciform church glows its "
       "programme's rooms and its crypt; a person's chip glows their unit's rooms; a custom service glows its sub-location's "
       "rooms; no `circulation` room glows for a use or a household; (c) at `public` a front's concealed use is offered as no "
       "chip and no concealed room glows, a merged room glowing only as its public reading, and at `secret` its A2 (6) rooms "
       "glow; (d) on a storey without the match's rooms the building's outline glows and the switcher marks exactly the "
       "storeys that hold them, each with its chip's glyph and its accessible name's count, and a building whose plan does "
       "not draw glows whole; (e) after a `relet`, a `setRoomRole`, a re-cut, an undo, a regenerate and a load the glowing "
       "set equals a fresh reading, and a chip set survives every storey switch and every stop of the building band; (f) an "
       "SVG storey sheet with Find on carries `plan.find` and the chips in its legend, with Find off equals the Find-less "
       "export byte for byte, and a `.dd2vtt` scene carries no Find unless asked, then in its image only; (g) at the "
       "METROPOLIS cap under `view.planCap` a chip's glow over the drawn plans lands within item 120 (j)'s 100 ms (V03 §6's "
       "Find row) | B-PLAN, B-CITY-lite and volume 9's app harness; at Find's landing (V03 §8) |\n")

J133 = ("| J-V3.133 | Chose to read item 119 at the plan rung (V03 §6) as V03 §6's rows and §12.7's plan row kept as the "
        "targets and the plan's share of each one-time wait — PE's eager facts inside S11's generation, the stored plans' "
        "re-cuts inside a dossier change or any event that moves their inputs, an epoch's re-cuts (timed by volume 6's part of "
        "the item), the plan exports and the plan's migration on load — inside §12.1's comfort level, with the click, a stale "
        "chain's derivation, the storey switch, `elaborate: 'view'`, Find's room reading and a plan edit's preview kept as "
        "interaction budgets, over timing a plan's elaboration on a click as a one-time wait, because a click on a building is "
        "click-to-inspect (item 119 (d)), the plan rung runs on no generation (§4.1), and the cache and the idle-frame chain "
        "keep it off the user's path, while the waits a user sits through once are the events and exports that carry plans. |\n")

J134 = ("| J-V3.134 | Chose to make Find's interior-band glow (item 120 (f)) the rooms a match uses in the plan as drawn — a "
        "use's programme rooms (origins `programme`, `sleepIn`, `subLocation` and `crypt`; on a shell housing no household its "
        "`declared`, `access` and `composer` rooms too), a sub-location's rooms, a household's unit, or every room for a match "
        "that is the building — one union outline per chip from the plan's wall records, the building's outline glowing and "
        "the switcher marking the storeys where the shown storey holds none, over glowing the whole footprint at every stop or "
        "every room of a matched building, because the owner's rule asks that \"the rooms an institution uses glow\", a "
        "smith's house and an inn's family rooms are its households' and not the institution's, and a match must never be "
        "lost (item 120 (e)); Find reads the drawn plan and never derives one, so a chip costs no derivation and no tile "
        "(item 120 (j)). |\n")

J135 = ("| J-V3.135 | Chose to key the class rows on §2.6's `BuildingClass` alone — `hall`, `keep`, `tower` and `mill` moved, "
        "cell for cell, to named rows in the same columns, reached only by name from the family, slot, class-id and "
        "specialisation rows, and `temple` dropped from the church row's key — over re-keying the four rows to classes "
        "(`castle`, `tower_house`, `watermill`) or folding them into the family table, because a template family is never a "
        "class (§2.6's `BuildingClass`; VAF-R0S-16), no building's class names them, several families, slots and classes take "
        "each whole, the family table lacks their `shared` column, and their poorest-band `circulation` stays a capacity cell "
        "on PE's register line; no building resolves differently — a great temple reaches its `cathedral` family row at "
        "A1 (3) as before, so the church row's `temple` key served no building. |\n")


def add(E, A):
    # ---------------- §6 ----------------
    E(H6,
      "| the cache (§12.8) | §12.8's line per storey, furniture included; ≈ 0.8 MB for a capped view (`view.planCap` × 3 storeys) | 40 items × 16 B + rooms, walls, openings as §12.8 states |\n",
      "| the cache (§12.8) | §12.8's line per storey, furniture included; ≈ 0.8 MB for a capped view (`view.planCap` × 3 storeys) | 40 items × 16 B + rooms, walls, openings as §12.8 states |\n"
      "| Find's room reading (V03 §5.5; item 120 (j)) | ≤ 0.02 ms per drawn plan; ≤ 2 ms per chip change over a capped view | O(rooms + walls) per plan (≤ 60 rooms) over the stored or cached plan, the union's outline read from its wall records with no boolean, for ≤ `view.planCap` plans and the clicked ones; an overlay reading, no plan redrawn; inside §12.5's glow of about 100 ms; measured at Find's landing (V03 §8) on the B-CITY METROPOLIS seeds |\n",
      1, 'G120-V03')
    E(H6,
      "A run-time miss is reported, never answered by a coarser plan\n(§12.7).",
      "A run-time miss is reported, never answered by a coarser plan\n(§12.7)." + P6_WAITS,
      1, 'VV34-01')

    # ---------------- §7 ----------------
    E(H7,
      "every role named is in the role table and every role row carries every column;",
      "every role named is in the role table and every role row carries every column; every class row's key is a "
      "`BuildingClass` id (`roster.classes`) and every named row is reached by name from a family, slot, class-id or "
      "specialisation row;",
      1, 'hand-off model VAF-R0S-16')
    E(H7,
      "removing a dossier-bound crypt is refused; each undoes byte-identically | B-EDIT plan sequences, 10³ per PR |",
      "removing a dossier-bound crypt is refused; each undoes byte-identically; (vi) the reach bend (V03 §4.2): a "
      "`setOpening` closing a room's only door, a `moveWall` and a `splitRoom` that would cut a room off and a "
      "`setRoomUnit` leaving a room unreached each bend by `bend.room.unreachable` to the nearest lawful form, every room "
      "still reached (T28-2), and undo byte-identically | B-EDIT plan sequences, 10³ per PR |",
      1, 'hand-off determinism VDC0-11')
    E(H7,
      "each row carrying one catalogue key per value (`info.crypt.*`, `info.plan.cause.*`)",
      "each row carrying one catalogue key per value (`info.crypt.*`, `info.plan.cause.*`, `info.plan.note.*`)",
      1, 'hand-off V10 VV34-07')
    E(H7,
      "a rich manor whose occupants fall to the poor band has no `hall` or `solar` room and houses its units in the main range;",
      "a rich manor whose occupants fall to the poor band has no `hall` or `solar` room and houses at least three units — "
      "the `poor` row's least households per shell (§2.6's interior ladder) — in its main range;",
      1, 'VAF-R0S-12')
    E(H7,
      "| T-V3-34 | item 110's no-op pin (item 110 (f)): with no stacked",
      "| T-V3-34 | item 110's no-op pin (item 110 (f)), its first clause the `item110.*` `NoOpPin` over B-PLAN's and "
      "B-CITY-lite's plans, registered on V12 §3.7.8's engine by the P1 seat under the pins V12 §2.13 lists it (its off form "
      "V11 §3.24.0's, `exposureAllStoreys` false among it): with no stacked",
      1, 'hand-off V11 VAP-21, V12')
    E(H7,
      "(m) an absent, one-storey, empty and stale plan each show V03 §4.5's state, and a building smaller than the frame stop fills is framed inside `view.frameStops`;",
      "(m) an absent, one-storey, empty and stale plan each show V03 §4.5's state, and a building smaller than the frame stop fills is framed inside `view.frameStops`; a plan reporting each `PlanReport.warnings` code shows one panel line per entry under its `report.plan.<code>` key, every code of V03 §2.3's union having its line;",
      1, 'VV34-09')
    E(H7,
      "the edge fixtures of B-PLAN, B-CITY-lite at every rung, B-EDIT sequences |\n",
      "the edge fixtures of B-PLAN, B-CITY-lite at every rung, B-EDIT sequences |\n" + T37 + T38,
      1, 'VV34-01, G120-V03')

    # ---------------- §8 ----------------
    E(H8,
      "| **total** | | | **18.5–25.25** | |\n",
      "| **total** | | | **18.5–25.25** | |\n"
      "\n"
      "**Items 119 and 120** (J-V3.133, J-V3.134). T-V3-37 times the plan's share of the one-time waits at P5's exit (its\n"
      "exports' clause) and P6's (the rest) on V12 §3.15.9's wait timer, inside those milestones' prices. The plan's part of\n"
      "Find (V03 §5.5) — `findRooms`, the switcher's and the panel's marks and the SVG `plan.find` group — lands with the later\n"
      "of P5 and the milestone that lands Find (V09 §8), inside P4's and P5's prices (one pure reading over the plan's wall\n"
      "records, two marks and one SVG group), its exit T-V3-38.\n",
      1, 'VV34-01, G120-V03')

    E(H8,
      "item 110 (a)'s `RetainingWall`s and levelling with volume 1's `stepProfile` and `levelledGroundCm`",
      "item 110 (a)'s `RetainingWall`s and levelling with §2.7's `stepProfile(wall)` (file f item 245) and `levelledGroundCm`",
      1, 'VAF-R0S-28')

    # ---------------- §9 ----------------
    E(H9,
      "whose culture and era build in tiers (V11 §3.6.2), not as class ids, so A1's rule (1)",
      "whose culture builds in tiers (V11 §3.24.3), not as class ids, so A1's rule (1)",
      1, 'VAF-R0S-18')
    E(H9,
      "while the rest of P3 reads P1's plan alone. |\n",
      "while the rest of P3 reads P1's plan alone. |\n" + J133 + J134 + J135,
      1, 'VV34-01, G120-V03, hand-off model VAF-R0S-16')

    # ---------------- §12 ----------------
    E(H12,
      "that the `half` rung's bound keeps the principal intact (T-V3-23 (b), (i) at M6-U). The historical readings",
      "that the `half` rung's bound keeps the principal intact (T-V3-23 (b), (i) at M6-U); that the plan's share of each\n"
      "one-time wait stays inside item 119's comfort level — a district of stored plans re-cut in one dossier change, the\n"
      "largest plan export, a migration at the metropolis cap — until T-V3-37 runs; that `findRooms`'s set reads as where an\n"
      "institution is at the interior band, and its cost, until T-V3-38 and P4's visual bars run. The historical readings",
      1, 'VV34-01, G120-V03')

    # ---------------- §13 ----------------
    E(H13,
      "closed at V11 §2.3, V11 §2.8, V11 §3.5, V11 §3.6.2 — nothing owed",
      "closed at V11 §2.3, V11 §2.8, V11 §3.5, V11 §3.24.3 — nothing owed",
      1, 'VAF-R0S-18')
    E(H13,
      "the deck cause's one name is this volume's `deckNoCellar`, which V10's rows follow |\n",
      "the deck cause's one name is this volume's `deckNoCellar`, which V10's rows follow |\n"
      "| V09 | the family `report.plan.<code>` in V09 §4.9's family table — one key per `PlanReport.warnings` code, its `en` text V03 §4.5's; Find's `live.find` drawing V03 §5.5's rooms at the interior band, with the switcher's and the panel's marks (item 120) | the other end: V09 §4.9's family table; V09's Find panel and `live.find` |\n",
      1, 'VV34-09, G120-V03')
    E(H13,
      "rows added to a column take a rows-added cells row | V03 §2.4's register lines |\n",
      "rows added to a column take a rows-added cells row | V03 §2.4's register lines |\n"
      "| V02 (X30) | T-V3-25 carries the poor manor's three-units clause | T-V3-25 |\n"
      "| model (VAF-R0S-03) | `AccessHead` declared at §2.6 and cited here | V03 §2.1, V03 §1b, V03 §3.7.2 (1) |\n"
      "| model (VAF-R0S-16) | the class rows keyed on §2.6's `BuildingClass` alone | V03 §2.4's class and named rows (J-V3.135); T-V3-1 |\n"
      "| pipeline (VAF-R0S-20) | §4.5's discrete-cell rule cited | V03 §2.4, V03 §3.2 |\n"
      "| determinism (VDC0-11) | the plan edits' reach bend `bend.room.unreachable` | V03 §4.2; T-V3-11 (vi) |\n"
      "| V10 (VV34-07) | the notes keyed `info.plan.note.<id>` | V03 §4.6, V03 §2.3; T-V3-12 |\n"
      "| V11 (VAP-21), V12 | `exposureAllStoreys`'s preset entries false; T-V3-34's first clause the `item110.*` `NoOpPin` on V12 §3.7.8's engine | V03 §2.4; T-V3-34 |\n",
      1, 'hand-offs closed')
