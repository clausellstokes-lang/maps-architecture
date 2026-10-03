# edits_a — round 2's routed issues other than the owner item, and the receiving ends R2-26 (d) and R2-35 name
# (coherence/repair-V01-r2). Each edit: (tag, old, new, count); `old` must occur exactly `count` times in the text as it
# stands when the edit is applied. Tags name the issue ids each edit closes.


def between(text, start, end, include_end=False):
    s = text.index(start)
    e = text.index(end, s + len(start))
    if include_end:
        e += len(end)
    return text[s:e]


def build(text):
    E = []

    # VV12-r1-04: §0's retired term.
    E.append(('VV12-r1-04 §0',
        "longer waits stage 2 adds once — generating a town, laying a new layout, making a standalone neighbourhood — finish within\n"
        "ten seconds and show their progress as they go (V01 §6).",
        "longer waits stage 2 adds once — generating a town, laying a new layout, making a standalone neighbourhood document —\n"
        "finish within ten seconds and show their progress as they go (V01 §6).", 1))

    # VAH-r1-12 (R2-10): the hook row splits; §11.2 holds WhyAnswer and WhyPull, V10 §2.13 keeps WhyProvider.
    E.append(('VAH-r1-12 §1.2 hook row',
        "| V10 §2.13 | `WhyProvider`, `WhyAnswer` (`drifted`, `members`, `closure`), `WhyPull` with V11's families | V01's providers (V01 §4.5) |\n",
        "| §11.2 | `WhyAnswer` (`drifted`, `members`, `closure`), `WhyPull` with V11's families | V01's providers (V01 §4.5) |\n"
        "| V10 §2.13 | `WhyProvider` | V01's providers (V01 §4.5) |\n", 1))
    # VAH-r1-12 (R2-10: every citation of a moved type reads §11.2's): §4.5's four sites.
    E.append(('VAH-r1-12 §4.5 WhyPull.family',
        "families (`WhyPull.family`, V10 §2.13).\n",
        "families (`WhyPull.family`, §11.2).\n", 1))
    E.append(('VAH-r1-12 §4.5 drifted',
        "a recomputed pick that differs otherwise sets volume 10's\n  `evaluated.drifted` with its cause",
        "a recomputed pick that differs otherwise sets §11.2's\n  `WhyAnswer.evaluated.drifted` with its cause", 1))
    E.append(('VAH-r1-12 §4.5 members',
        "* **ladder records** — volume 10's `members` answer for a QUARTER, GUILD, COUNT or SIZE record:",
        "* **ladder records** — §11.2's `WhyAnswer.members` for a QUARTER, GUILD, COUNT or SIZE record:", 1))
    E.append(('VAH-r1-12 §4.5 closure',
        "* **an unwalled side** — volume 10's `closure` answer for a barrier run",
        "* **an unwalled side** — §11.2's `WhyAnswer.closure` for a barrier run", 1))

    # VM-R1T-04: §2.1's FabricStrategyId gloss follows §2.5.
    E.append(('VM-R1T-04 §2.1',
        "`FabricStrategyId` (a `hood.templates` row key), `BlockKind`, `SquareType`, `SeamRun` and `TypedBoundary` are declared in\n"
        "§2.5 (item 505); `OutlineTemplateId` is §4.2 S1 (2)'s row key, its standalone rows added by item 285 (V01 §3.10.2).\n",
        "`FabricStrategyId` (a registered fabric: `bent-cut`, a `hood.templates` row key or V07's `village-ways`), `BlockKind`,\n"
        "`SquareType`, `SeamRun` and `TypedBoundary` are declared in §2.5 (item 505); `OutlineTemplateId` is §4.2 S1 (2)'s row\n"
        "key, its standalone rows added by item 285 (V01 §3.10.2).\n", 1))

    # VAF-R0S-15 = VPC-R1-11 (R2-13; VAF-R0S-15's text): §2.2 cites §10.2's SquareQuotaRow, the two comment lines kept.
    E.append(('VAF-R0S-15/VPC-R1-11 §2.2',
        "interface SquareQuotaRow { band: string; haPer1000: number /* typed-square target per 1 000 inhabitants of the district */; kind: Partial<Record<DistrictKind, number>> /* factor */ }\n",
        "// SquareQuotaRow is §10.2's (the base table `squares.quota`, read by S7b (3) from M2b and by S9b); this volume authors its default rows (V01 §3.5.2; V11 registry row 91)\n", 1))

    # VAF-R0S-04 (R2-13): RaisedKind (§2.7) at both §2.3 fields.
    E.append(('VAF-R0S-04 §2.3 DistrictContext.raised',
        "  raised: { way: Id; kind: 'viaduct'|'elevated'|'aqueduct'; reason: 'drop'|'link'|'water'|'declared'; stripM2: number }[]\n",
        "  raised: { way: Id; kind: RaisedKind /* §2.7 */; reason: 'drop'|'link'|'water'|'declared'; stripM2: number }[]\n", 1))
    E.append(('VAF-R0S-04 §2.3 WayNamingContext.raised',
        "  raised?: 'viaduct'|'elevated'|'aqueduct' /* a raised way's kind, for naming.way's guard (V01 §3.7.2) */ }\n",
        "  raised?: RaisedKind /* §2.7: a raised way's kind, for naming.way's guard (V01 §3.7.2) */ }\n", 1))

    # VV1112-r1-05 (R2-10): LadderStep (V11 §2.6) at the district view.
    E.append(('VV1112-r1-05 §2.3 records.step',
        "  records: { record: Id; step: 'COUNT'|'QUARTER'|'GUILD'|'SIZE'|'REPLACEMENT'; membersHere: number; membersTotal: number }[]",
        "  records: { record: Id; step: LadderStep /* V11 §2.6 */; membersHere: number; membersTotal: number }[]", 1))

    # VAF-R1T-05 (R2-13): §2.4 cites II.1's types with their presence rules and the derived mode; the restatement goes.
    old = between(text, "`NeighbourhoodRequest`, `NeighbourhoodResult` and `SeamReport` are II.1's (item 539): the request's `seam`, `context`,\n",
                  "**Implementers and callers.**")
    assert old.count('\n') == 10, old.count('\n')
    E.append(('VAF-R1T-05 §2.4', old,
        "`NeighbourhoodRequest`, `NeighbourhoodResult` and `SeamReport` are II.1's (item 539), with their fields' presence rules\n"
        "and the derived mode (J-V1.3); this volume's unit runner, close-ups and SKY-F hand-over fill them (V01 §3.8–V01 §3.11).\n\n", 1))
    E.append(('VAF-R1T-05 §2.4 callers (the services of V01 §3.16)',
        "providers and the reader's `query` for the close-up panel and the clerk (V01 §4.5); the three services of V01 §3.16 by\n"
        "S10a / S10b's coverage term and volumes 4, 9, 10 and 11.",
        "providers and the reader's `query` for the close-up panel and the clerk (V01 §4.5); the services of V01 §3.16 by the\n"
        "callers each names there.", 1))

    # VM-R1T-03 (R2-13): §2.6 cites §2.9's HoodRecipe; the closing note on the layers kept.
    old = between(text, "### 2.6 The standalone neighbourhood document's recipe\n\n```ts\ninterface HoodRecipe {",
                  "### 2.7 Lifecycle of every state field")
    assert old.endswith("through the inputs its S0 writes.\n```\n\n"), old[-120:]
    E.append(('VM-R1T-03 §2.6', old,
        "### 2.6 The standalone neighbourhood document's recipe\n\n"
        "`HoodRecipe` (`Recipe.hood`, item 272) is §2.9's; its rules are V01 §3.10.1's. The layers a standalone neighbourhood\n"
        "document may hold are fixed by V01 §3.10.1 (7) through the inputs its S0 writes.\n\n", 1))
    # The pointers that named V01 §2.6 as HoodRecipe's home follow it to §2.9 (and hood.kinds to its declaration, §2.2).
    E.append(('VM-R1T-03 §1.2 §2.9 row',
        "the close-up's record and cache (V01 §2.5, V01 §3.8); `HoodRecipe` (V01 §2.6) |",
        "the close-up's record and cache (V01 §2.5, V01 §3.8); `HoodRecipe`'s rules (V01 §3.10.1) |", 1))
    E.append(('VM-R1T-03 §1b HoodRecipe row',
        "| `HoodRecipe` (V01 §2.6) | T1 `intend` with `product: 'hood'`, a skeleton file, the API |",
        "| `HoodRecipe` (§2.9; its rules V01 §3.10.1) | T1 `intend` with `product: 'hood'`, a skeleton file, the API |", 1))
    E.append(('VM-R1T-03 §1b HoodRecipe.edges.slope row',
        "| `HoodRecipe.edges.slope` (V01 §2.6) |",
        "| `HoodRecipe.edges.slope` (§2.9; V01 §3.10.1 step 2) |", 1))
    E.append(('VM-R1T-03 §1b hood.kinds row',
        "| `HoodKindRow` table `hood.kinds` (V01 §2.6) |",
        "| `HoodKindRow` table `hood.kinds` (V01 §2.2) |", 1))

    # R2-26 (d), receiving end: the under-deck strip's one margin cell is raisedWays.structure.stripMarginM (V11 §3.24.2).
    E.append(('R2-26 (d) §3.14 values cited',
        "`stair`), `terrace` (`slopeMin`, `stepMinCm`, `enabled`), the relief rows' `terracedEdges`, `raisedWays.structure`\n"
        "(`clearanceCm`, the material rows), `aqueduct.terminal`;",
        "`stair`), `terrace` (`slopeMin`, `stepMinCm`, `enabled`), the relief rows' `terracedEdges`, `raisedWays.structure`\n"
        "(`clearanceCm`, `stripMarginM`, the material rows), `aqueduct.terminal`;", 1))
    E.append(('R2-26 (d) §3.14 column row',
        "| `raised.stripMarginM`, `raised.clearWidthM`; `raised.squareDeg` | V01 §3.17.3 (strip margin; arch clear width + 1 m; ± 30° of square) | 1 m, 1 m; 30° | number · `m`; `cdeg` | [0, 3] each; [10°, 45°] | yes | — | — | `own` |",
        "| `raised.clearWidthM`; `raised.squareDeg` | V01 §3.17.3 (arch clear width + 1 m; ± 30° of square) | 1 m; 30° | number · `m`; `cdeg` | [0, 3]; [10°, 45°] | yes | — | — | `own` |", 1))
    E.append(('R2-26 (d) §3.17.3 (2)',
        "2. **The under-deck strip.** The part's ground projection — its piers and spans over the deck's width plus\n"
        "   `raised.stripMarginM` each side — is a **hole** in the faces it crosses, as an S7b claim is (V01 §3.4.1): where it\n"
        "   crosses a face from boundary to boundary it cuts it; no plot, block interior, seed or hood pin lies in it; the base's\n",
        "2. **The under-deck strip.** The part's ground projection — its piers and spans over the deck's width plus\n"
        "   `raisedWays.structure.stripMarginM` (V11 §3.24.2) each side, §4.6 S8's one strip — is a **hole** in the faces it\n"
        "   crosses, as an S7b claim is (V01 §3.4.1): where it crosses a face from boundary to boundary it cuts it; no plot, block\n"
        "   interior, seed or hood pin lies in it; the base's\n", 1))
    E.append(('R2-26 (d) §12 PLAUSIBLE',
        "`.maxLevels`, `.profileNoticeCm`, the series spacing), the raised-way constants (`raised.stripMarginM`,\n"
        "`.clearWidthM`, `.squareDeg`),",
        "`.maxLevels`, `.profileNoticeCm`, the series spacing), the raised-way constants (`raised.clearWidthM`,\n"
        "`.squareDeg`),", 1))

    # VAP-r1-07 (R2-08): T-V1-29's clause names the base bars it takes.
    E.append(('VAP-r1-07 T-V1-29',
        "**item 119's one-time waits** (V01 §6; J-V1.103):",
        "**item 119's one-time waits** (V01 §6; J-V1.103; takes T119-2 and T119-3's stage-2 clauses):", 1))

    # VV12-r1-03 (R2-34): catchmentOf reads V11 §2.3's CoverageSpec, cited; V01 keeps only its own readings.
    old = between(text, "* **`catchmentOf(plot, unit, per?)`** — the plots in a plot's catchment for item 103 (f)'s coverage (V11's\n",
                  "* **`districtsAbove(part, element)`**")
    assert old.count('\n') == 14, old.count('\n')
    E.append(('VV12-r1-03 §3.16 catchmentOf', old,
        "* **`catchmentOf(plot, unit, per?)`** — the plots in a plot's coverage unit for item 103 (f) (V11's `CoverageSpec.unit`\n"
        "  and `per`): each unit is read at the plot exactly as V11 §2.3's `CoverageSpec` defines it — `walk` and `households`\n"
        "  its discs on the 16 m raster, `parish` the plot's cell of its parish partition, `district` the plot's district,\n"
        "  `settlement` the town — cited, never restated, so the solver, Show gaps and V12 §3.6's `servedShare` count served one\n"
        "  way; the plot is always in its own catchment. This volume adds only its own readings: **`neighbourhood` is read as\n"
        "  `district`**, the district a close-up opens (J-V1.35); **on an underground arena** `walk` and `households` measure\n"
        "  the disc's radius by volume 4's `underDistance` (V04 §3.6a (1)) in place of the straight distance, and each undercity\n"
        "  neighbourhood and the underground pseudo-district (the sewer-front neighbourhoods and F6's void dwellings) is its own\n"
        "  `district` unit (V04 §3.6a (5)); **on a sky arena** the island is one `walk` unit (V05 §3.5 (3): the route to the\n"
        "  ground passes every walking radius), its districts its `district` units; **a district with no residential plot\n"
        "  holds no unit** — V11 §2.3's skipped term (no household there to serve), so no gap is drawn in it (V01 §5.4 (3)).\n"
        "  Callers: S10a / S10b's coverage term (V11's `cov/<class>` rows, the base solver), volume 10's explanations,\n"
        "  `gapUnits` (Find's Show gaps, V01 §5.4, into which item 120 (i) folds volume 9's Coverage view).\n", 1))
    # Its dependents: §2.3's signature comment and parts table, §1b's row, §3.18's services row, §5.4 (3), §6, T-V1-42, T-V1-59 (b), J-V1.102.
    E.append(('VV12-r1-03 §2.3 signature',
        "//   catchmentOf(plot: Id, unit: CoverageSpec['unit'] | 'neighbourhood', per?: number): Id[] /* the plots in the plot's catchment */\n",
        "//   catchmentOf(plot: Id, unit: CoverageSpec['unit'] | 'neighbourhood', per?: number): Id[] /* the plots of the plot's unit as V11 §2.3 defines it (V01 §3.16) */\n", 1))
    E.append(('VV12-r1-03 §2.3 parts table',
        "| `SeamReport.portalsConnected`'s walk (V01 §3.11 (6)); `catchmentOf('walk')` (V01 §3.16) | yes | yes, as one edge between its two end vertices | no |\n",
        "| `SeamReport.portalsConnected`'s walk (V01 §3.11 (6)) | yes | yes, as one edge between its two end vertices | no |\n", 1))
    E.append(('VV12-r1-03 §1b row',
        "| `catchmentOf`, `districtsAbove`, `fabricSignature` (V01 §3.16) | committed districts, plots, ways; volume 4's void footprints and `underDistance`;",
        "| `catchmentOf`, `districtsAbove`, `fabricSignature` (V01 §3.16) | committed districts, plots, ways; V11 §2.3's coverage units (its discs on the 16 m raster, its parish partition); volume 4's void footprints and `underDistance`;", 1))
    E.append(('VV12-r1-03 §3.18 services row',
        "| services (V01 §3.16) | an element under no district; a region with no built block or part-0 way; `plotLandM2` 0; a plot with nothing within `per` | the empty list; `null` measures; 1; every plot it reaches, and itself | — | T-V1-42, T-V1-46 |",
        "| services (V01 §3.16) | an element under no district; a region with no built block or part-0 way; `plotLandM2` 0; a plot whose unit holds no other plot; a district with no residential plot | the empty list; `null` measures; 1; the plot alone; no unit (V11 §2.3's skipped term) | — | T-V1-42, T-V1-46 |", 1))

    old = between(text, "The units are `catchmentOf`'s (V01 §3.16) — never a second definition — each a `GapUnit` holding no member:\n",
                  "* **Per-plot units.**")
    E.append(('VV12-r1-03 §5.4 (3) partition units', old,
        "The units are `catchmentOf`'s (V01 §3.16), which reads V11 §2.3's — never a second definition — each a `GapUnit`\n"
        "holding no member:\n"
        "* **Partition units.** `district` — every district the key admits but the hinterland (a member in the\n"
        "  hinterland counts toward none), a gap when no member's plot lies in it, its area the district's faces united.\n"
        "  `parish` — the cells of V11 §2.3's parish partition (`catchmentOf('parish')`; before any church, the district),\n"
        "  built from the church members the key admits, so no cell outlines a church the key withholds (its plots fall to the\n"
        "  cell of the nearest admitted church, item 120 (h)); a gap when the cell holds no member, its id the church member's\n"
        "  (the district's before any church), its area the union of its plots' faces; a church class read on `parish` stands\n"
        "  in every cell it makes, so it has no gap.\n"
        "  `settlement` — one unit, the town, a gap only when the key admits no member on any layer, its id `TOWN_ROOT`, its area\n"
        "  each layer's districts united (one `GapUnit` per layer that holds a district).\n", 1))
    old = between(text, "**Evaluation.** A partition unit takes one pass over the members' plots. A per-plot unit takes one multi-source walk from\n",
                  "**(4) Over time and edits**")
    assert old.count('\n') == 9, old.count('\n')
    E.append(('VV12-r1-03 §5.4 (3) Evaluation', old,
        "**Evaluation.** A partition unit takes one pass over the members' plots. A per-plot unit takes one pass per member\n"
        "over V11 §2.3's 16 m raster: a member serves every residential plot whose disc holds it, and the disc is symmetric, so\n"
        "each member marks the cells within the radius about its plot — `per` for `walk`; for `households` the radius V11 §2.3\n"
        "derives for each district, one pass per radius in use — and a residential plot is served when the marks of its own\n"
        "district's radius reach its cell, which is V11 §2.3's count plot by plot. On Below the marks spread from the members by\n"
        "`underDistance` (V04 §3.6a (1)); on Sky a member anywhere on the island serves every plot on it. T-V1-59 (b) holds the\n"
        "unserved plots to V12 §3.6's `servedShare` count, plot by plot.\n\n", 1))

    E.append(('VV12-r1-03 §6 services line',
        "| ≤ 1 ms per call at CITY, memoised per commit; `catchmentOf('walk')` ≤ 2 ms at METROPOLIS | inside the callers' lines (S10b's coverage term, volume 4's stage, the reader) | M5 | the way-graph distances cached per district per commit |",
        "| ≤ 1 ms per call at CITY, memoised per commit; `catchmentOf` on a disc unit (`walk`, `households`) ≤ 2 ms at METROPOLIS (the plots under its disc's cells of V11 §2.3's 16 m raster, by a plot index per cell) | inside the callers' lines (S10b's coverage term, volume 4's stage, the reader) | M5 | the plot index per raster cell built once per commit and shared by every call |", 1))
    E.append(('VV12-r1-03 §6 Show gaps line',
        "`walk` ≤ 25 ms at METROPOLIS (one multi-source walk bounded at `per`); `households` ≤ 25 ms at METROPOLIS once its radii are memoised, the radii of one `per` value ≤ 1 s at METROPOLIS at their first use in a commit, on the worker — never delaying a chip's glow (item 120 (j)), its gaps drawn when ready | §12.5's overlay budget, beside item 120 (j)'s glow | M5, B-CITY (METROPOLIS) on V09's app harness | the radii computed for the plots of the districts in view first and the rest on idle |",
        "`walk` and `households` ≤ 25 ms at METROPOLIS (one pass per member and per radius in use over the 16 m raster's cells within the radius, V01 §5.4 (3)), on the worker — never delaying a chip's glow (item 120 (j)), its gaps drawn when ready | §12.5's overlay budget, beside item 120 (j)'s glow | M5, B-CITY (METROPOLIS) on V09's app harness | the members nearest the view marked first and the rest on idle |", 1))

    old = between(text, "| T-V1-42 | catchment and siting (item 103): ", "| T-V1-43 |")
    assert old.count('\n') == 1
    E.append(('VV12-r1-03 T-V1-42', old,
        "| T-V1-42 | catchment and siting (item 103): a class with a coverage row reaches the same served-district share whether S10b or `catchmentOf` counts it (one partition, J-V1.35); **one count of served**: over 200 B-CITY-lite seeds per rung, under the host's key, for every coverage unit (`walk`, `households`, `parish`, `district`) the plots `gapUnits` reads as unserved equal, plot by plot, those V12 §3.6's `servedShare` counts unserved, and `catchmentOf` at each plot equals V11 §2.3's unit at that plot; 0 manor or green blocks within an emitter row's radius when its weight is 1; 0 S9b typings on a block S10a (i) filled; on the underground and sky fixtures, `catchmentOf` on an undercity plot measures its disc by `underDistance` and counts its neighbourhood as its own `district` unit, on an island plot a walk row counts the island as one unit, equal to V05 §3.5 (3)'s count, and a district with no residential plot holds no unit | B-CITY, B-CITY-lite, fixtures (V04's, V05's) | C | — |\n", 1))

    # T-V1-59: VV12-r1-03 (b); R2-35 / R2-08 (the head names T120-2 and T120-4's town clauses); VAF-R1T-07 per R2-32 (M5, Find's milestone).
    E.append(('R2-35 T-V1-59 head',
        "| T-V1-59 | Find over the town (item 120 (k)'s town clauses; V01 §5.4): on B-CITY-lite",
        "| T-V1-59 | Find over the town (item 120 (k)'s town clauses; V01 §5.4; takes T120-2 and T120-4's town clauses): on B-CITY-lite", 1))
    E.append(('R2-35 T-V1-59 (a)',
        "— (a) **areas**: `findAreas` lists every district of each layer but the hinterland pseudo-district, each once",
        "— (a) **areas** (T120-2's town clause): `findAreas` lists every district of each layer but the hinterland pseudo-district, each once", 1))
    E.append(('R2-35 T-V1-59 (a) listing',
        "under a player view an area the key withholds is never listed, counted, lifted or pinned;",
        "each area chip's matches equal §11.2's gazetteer match listing by area at the view's effective key; under a player view an area the key withholds is never listed, counted, lifted or pinned;", 1))
    E.append(('VV12-r1-03 T-V1-59 (b)',
        "(b) **gaps**: for each coverage unit, and a class with no coverage row, `gapUnits` equals the brute-force reading over 200 seeds per rung — every partition unit, or every residential plot, whose `catchmentOf` holds no admitted member, plot by plot (the multi-source walk's served set equal to the per-plot `catchmentOf` evaluation);",
        "(b) **gaps**: for each coverage unit (`walk`, `households`, `parish`, `district`), and a class with no coverage row, over 200 seeds per rung, `gapUnits`' unserved plots equal, plot by plot, those V12 §3.6's `servedShare` counts unserved under the host's key, and V01 §5.4 (3)'s one-pass evaluation equals the brute-force reading of each plot's `catchmentOf` with the members the key admits;", 1))
    E.append(('R2-35 T-V1-59 (c)',
        "(c) **over time**: an edit removing",
        "(c) **over time** (T120-4's town clause): an edit removing", 1))
    E.append(('VAF-R1T-07 T-V1-59 milestone (R2-32)',
        "From M5 on the services; on V09's app harness from V09's Find |",
        "From M5, Find's milestone (§16's M5 row), on the services and on V09's app harness with V09's Find panel |", 1))
    E.append(('VAF-R1T-07 §8.2 W11 (R2-32)',
        "T-V1-59 Find's, on V09's app harness from V09's Find;",
        "T-V1-59 Find's, at M5 (Find's milestone) on V09's app harness with V09's Find panel;", 1))

    # J-V1.102's reason follows (VV12-r1-03's third dependent).
    E.append(('VV12-r1-03 J-V1.102',
        "and to read **Show gaps' units through `catchmentOf`** (V01 §3.16), the one catchment reading the siting solver and the absorbed Coverage view read —",
        "and to read **Show gaps' units through `catchmentOf`** (V01 §3.16), which reads V11 §2.3's `CoverageSpec` — the one count of served the siting solver, V12 §3.6's `servedShare` and the absorbed Coverage view read —", 1))
    E.append(('VV12-r1-03 J-V1.102 reason',
        "over a second, view-only unit definition, because one reading makes the gaps the panel draws the units the solver and the bars count;",
        "over a second, view-only unit definition or a way-graph walk of this volume's own, because one reading makes the gaps the panel draws the units the solver and the bars count, plot by plot (T-V1-42, T-V1-59 (b));", 1))
    E.append(('VV12-r1-03 §12 PLAUSIBLE Find lines',
        "Find's two lines (the area list's unions, the gap walks and the `households` radii at the METROPOLIS cap)",
        "Find's two lines (the area list's unions and the gaps' raster passes at the METROPOLIS cap)", 1))

    return E
