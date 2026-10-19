# Items 960-966: V13 §3.11.6, §5, §6, §7, §8, §9, §11
V13 = 'docs/volumes/V13-world.md'
F = []
def frag(item, letter, file, line, old, new, locator, evidence):
    F.append(dict(item=item, letter=letter, file=file, line=line, old=old, new=new, locator=locator, evidence=evidence))

# ---------------------------------------------------------------- 960 the port
frag(960,'a',V13,2435,('B','B-19'), r"""the **simulator feed** (`canon`, and the optional `routeFacts`, `patrolOffer` and
`trods`) admits integers""",
 "Volume 13 — §3.11.6 the two feeds (edit)",
 "the two feeds (V13:2435–2439); the trod record is the simulator feed's third optional product (J-V13.116). From: B-19 unchanged.")

frag(960,'b',V13,2485,('B','B-20'), r"""effort, its ordered stretches from `a` to `b` (each a maximal run of one terrain class: integer metres, integer effort-metres and the class word — read at the call from the record's `stations` and `vertexClass`, never a field of its own; the host's per-stretch receipt and its fallback for the trods, file w), the crossings and the 52-week seasonal sets — never `costTotal` — and, on request, a water edge's limits""",
 "Volume 13 — §3.11.6 the simulator feed (`routeFacts`) (edit)",
 "ask B (`docs/host-requests/2026-10-18-hidden-ways.md:31`); the record holds `stations` and `vertexClass` since amendments m (V13:790; `docs/AMENDMENTS-2026-10-17m.md:543`); J-V13.125. From: B-20 unchanged.")

frag(960,'c',V13,2490,('B','B-21'), r"""distance reader (V13 §3.9 (14)). `trods(world, request: { logHead })` → the **trod record** (`TrodRecord`, V13 §2.2; W7 (13); file w): every trod in force at the log head — its id, its two junction ids, its kind word, integer length and effort-metres under the host's cost law and its ordered stretches (metres, effort, the class word) — and every junction (its id, its point, the host edge it sits on with the integer station from the edge's `a`, the trods meeting there with their stations, and the host key of the settlement whose frame's margin ring it lies within `gateBandM` of, where one does); its envelope the canon versions it was built against, its own version and input hash (the physical layers, the cost law, `world.trod`'s rows and the lay versions of the routes in force), the kind rows' widths and the units — no polyline (geometry rides the map feed), no knowledge, no raster index; requested between advances or at an advance head and baked with its stamp, so one answer holds through an advance; a founding or a network window that re-lays a trod steps its version. It is **no canon slot** (law (1): a trod's junctions sit on the network in force; the birth canon is adopted before the genesis the trods join, and a later canonize is the DM's premium act) and the additive canon never touches it. All three optional; the host reads any only behind its own
  switch, with its tier line (it needs a canon from a placed world) and its degraded arm (absent ⇒ the prior bytes).""",
 "Volume 13 — §3.11.6 the simulator feed (the trod record as its third optional product) (edit)",
 "ask A (`docs/host-requests/2026-10-18-hidden-ways.md:23–28`) served as a product beside `routeFacts` and `patrolOffer` (V13:2484–2491); the port consumption law (V13:2429–2433); law (1) (V13:2576–2577); the birth canon precedes the genesis (V13:3887, 3897) and a re-canonize is the DM's premium act (V13:2478–2481) — judges 1–3's decisive check; J-V13.116. From: B-21, the junction's `nearSeat` key and the birth-sequence reason added.")

frag(960,'d',V13,2503,('B','B-22'), r"""(V13 §3.8 (12); drawn by the host's map surface only by its own choice, H31), the trods' polylines and junction ticks keyed by trod id, each in the audience its secret state admits (a player audience only a revealed or discovered trod, the DM audience every trod with its state; V13 §5.1; file w), the patrol tints,""",
 "Volume 13 — §3.11.6 the map feed (`mapFeed`) (edit)",
 "the map feed carries geometry for the host's map surfaces (V13:2501–2503); the approach road's audience clause is the precedent. From: B-22, the host's knowledge rows removed from the admission (one admission function: the secret state).")

frag(960,'e',V13,2515,('B','B-23'), r"""approach road to a world site, V13 §3.8 (12), is never in it on a host-bound world, riding the `mapFeed` instead; a trod never, on either world: its record is `trods` above, file w);""",
 "Volume 13 — §3.11.6 the map feed (`routes(world)`) (edit)",
 "`routes(world)` is the host routes' list (V13:2514–2515). From: B-23 unchanged.")

frag(960,'f',V13,2518,('B','B-24'), r"""`placeOf(world, where)` → the hearing card's
  words for a `WorldWhere` (a `trod` place by its kind word, the two routes its junctions sit on and the distance from one; a `junction` by its route and the distance from the nearer seat, or "at its town gate" where it carries `nearSeat`; for an audience that does not know the trod only the country it crosses — the land-use word and the seat territory's seat — never the trod's line or name; file w).""",
 "Volume 13 — §3.11.6 the map feed (`placeOf`) (edit)",
 "behaviour 5 (`docs/host-requests/2026-10-18-hidden-ways.md:19`): a place the map can name — a trod, a junction, or the country it crosses; `placeOf` (V13:2518–2519); the party clause (A 955 (ai); judge-2 graft 13). From: B-24, the town-gate reading added.")

frag(960,'g',V13,2558,('B','B-25'), r"""`hostOverlay(world, view)` (movers on host edges, or on trods by the trod's id, by fraction and embattlement phases,""",
 "Volume 13 — §3.11.6 presentation inputs (`hostOverlay`) (edit)",
 "the host's movers are its presentation messages (`docs/HOST-REQUIREMENTS-2026-10-18.md:83, 577`), not the lens window (:102); a mover on a trod rides the same input. From: B-25 unchanged.")

frag(960,'h',V13,2577,('B','B-26'), r"""of the physical layers, the host's cost law and the member seats, and no lived host fact enters them — the trod record (`trods`), whose junctions sit on the network in force, is for that reason no slot but an optional product versioned on its own (V13 §3.8 (13); file w); (2) the host""",
 "Volume 13 — §3.11.6 the port's laws (1) (edit)",
 "port law (1) (V13:2575–2577) stands as written; the clause says why the layer is no canon slot (J-V13.116). From: B-26 unchanged.")

# ---------------------------------------------------------------- 961 the layer and the reveal
frag(961,'a',V13,3148,('B','B-31'), r"""| `patrols` (a toggle) | vector | `PatrolCadence` per route segment at the revision in force at the view's `lensWeek`: tinted by cadence (weekly, monthly, seasonal), both colours striped on a debatable segment, no arrows or headings; a covert power's DM-only | the powers' colours |
| `trods` (a toggle, default off; file w) | vector | `Trod`s at the network in force at the view's week by their secret state (V13 §5.8 (7)'s admission over the party's `places`): with the layer on the DM sees every trod with V14 §5.1's state cue at its midpoint (a dashed ring with the eye-slash glyph while `dmOnly`, an open ring `revealed`, a filled ring `discovered`), its junctions as ticks on the joined route and its kind and length on hover; a player only a `revealed` or `discovered` trod — an unknown trod absent from the picture, the labels, the hover, the screen-reader summary and every player export, never greyed, no label, no length; default off so a picture export carries the network only on purpose; the legend one fixed sentence in every audience, whatever the count: "Trods show only where a settlement is known to use one or the game master has revealed one; others may exist." — no legend row, picker state, label, summary or export reads the count (T-V13-60); the knowing settlement's mark is the `events` layer's pin | 0.6 px dash-dot in the kind's tint (`style.world` rows `trod.goat`, `trod.drove`, `trod.broad`); the ring cues V14 §5.1's |""",
 "Volume 13 — §5.1 the layer table (insertion after the `patrols` row)",
 "the layers table (V13:3130–3152); ask C (`docs/host-requests/2026-10-18-hidden-ways.md:33`); the toggle in place of a base view key (C §1.5; judge-2 graft 7); the one admission function (judge-3 E-B3); V14's cues (V14:2583–2588). From: B-31, re-written for the toggle and the single admission path.")

frag(961,'b',V13,3149,('LINE',3149), r"""| `events` (with a "this advance" filter) | pins | `WorldEvent`s by kind at their place up to the view's `lensWeek`, a glyph's lifecycle mark at once (razed, besieged, occupied), DM-only docket pins; a pending sway trigger as a planting line until it takes effect or lapses (V13 §3.9 (13)); an event whose `where` is a trod or a junction (file w) — a settlement's knowledge of a trod, a watch on one, a sortie, a hearing's verdict — pinned at its `at` only for an audience the trod draws for, captioned with the seat, the host's cause word and the week; for an audience that does not know the trod at the seat territory's seat with the country's words (`placeOf`), never at the trod, its midpoint or its junction | the notice style |""",
 "Volume 13 — §5.1 the layer table (the `events` row) (edit)",
 "the `events` layer draws `WorldEvent`s at their place (V13:3149); the knowing town's mark as its pin (C §1.5; judges 2 and 3); the unknown-trod placement (judge-3 S2). From: new.")

frag(961,'c',V13,3209,('A','955 (av)'), r"""routes (LineString with class or grade), trods (LineString, kind `trod`, with its kind word and its junctions' ids — under the export's admission: a party export carries none its places do not admit; file w), springs (Point), traces (kind `trace`)""",
 "Volume 13 — §5.4 Exports (`ecosystemGeoJson`) (edit)",
 "the GeoJSON export's rows (V13:3209); every export is an admission reader (T-V13-50, V13:3745). From: A 955 (av), the form word replaced by the kind word.")

frag(961,'d',V13,3211,('A','955 (aw)'), r"""sways (id, seat, allegiance, status, revision), routes, trods and junctions (under the export's admission), settlements""",
 "Volume 13 — §5.4 Exports (`worldCsv`) (edit)",
 "the CSV export's kinds (V13:3211). From: A 955 (aw) unchanged.")

frag(961,'e',V13,3324,('B','B-32'), r"""covert links, columns, patrols and the trods no party place admits fail closed — omitted,""",
 "Volume 13 — §5.8 (7) The audience filter (edit)",
 "the audience filter (V13:3323–3325); V14's dmOnly: neither drawn, listed, counted, named nor exported (V14:791–793). From: B-32 unchanged.")

frag(961,'f',V13,3389,('C','F35'), r"""nothing there until H24 closes that gap); a closure for quarantine — the host has no such verb (its plague-R7, an owner question on its side): when one exists and arrives as a host-stored dated fact naming which gate (a town gate or a border crossing, never bare, V13 §5.8 (6)), a closure element may be added then; a trod (V13 §3.8 (13); file w) draws unchanged across it, is never drawn as its bypass and never carries the plague.""",
 "Volume 13 — §5.9 the plague lens's not-drawn list (edit); the refusal at V13:3385 stands verbatim",
 "behaviour 6 (`docs/host-requests/2026-10-18-hidden-ways.md:20`); the refusals V13:3385, 3428 kept (judges 1–3 against B-33's narrowing); plague-R7 open (`docs/HOST-REQUIREMENTS-2026-10-18.md:481`; research/sf/plague-system.md:556, 798–799). From: C F35 unchanged.")

frag(961,'g',V13,3428,('B','B-34'), r"""*Refusals:* a patrol drawn lowering danger or holding a quarantine line; a cadence sent to the host as a time; a cadence or a `patrolOffer` row on a trod (V13 §3.8 (13); file w). *Not drawn""",
 "Volume 13 — §5.9 the patrols lens's refusals (edit)",
 "patrols option B (J-V13.120); the patrols lens's refusals (V13:3428). From: B-34 unchanged (C F36 the same).")

frag(961,'h',V13,4040,('C','F43'), r"""gated on H17's presentation messages and the lens window (never a border's or a march's danger), and, once the host's hidden-ways facts arrive (file w; H32), the trods' marks — a watch the host keeps on a trod, a mover on one by its overlay, an engagement at a junction — as rows of this lens, the trod's line and its reveal never a lens mark (V13 §5.1's `trods` layer) and the knowing settlement's mark meanwhile the `events` layer's pin; **calamity** — strike""",
 "Volume 13 — §9 Deferred decisions, D-V13.8 the danger lens (edit)",
 "D-V13.8 (V13:4038–4043); no ninth lens in this pass (C §1.5, J-V13.126; judges 2 and 3): the bodies are the cause of an embattled region (`docs/host-requests/2026-10-18-hidden-ways.md:4`). From: C F43, the `events` pin named.")

# ---------------------------------------------------------------- 962 budgets
frag(962,'a',V13,3591,('A','955 (bb)'), r"""| W7a + W7b | Σ over edges of the search ellipse's cells (A\* , V13 §3.8; C13-36) | 60 ms | 200 ms | 520 ms | ≤ 8 ns × Σ ellipse cells over edges (an edge's ellipse ≈ 2.4 × the pair's straight cost² ÷ the cell area at `maxCostFactor` 6; 300 edges at the continent rung ≈ 6 × 10⁷ cells) |
| W7c | fine cells (the rough pass) + Σ over candidate trods of the search ellipse's cells (W7 (13); file w) | 25 ms | 50 ms | 100 ms | ≤ 10 ns × fine cells + 8 ns × Σ ellipse cells over candidates (a trod's ellipse ≈ 2.4 × its pair's straight cost² ÷ the cell area at `world.trod`'s `maxCostFactor` 3 — a quarter of a route's at 6: a 10 km trod at the province rung ≈ 960 cells; 2 000 trods ≈ 2 × 10⁶ cells ≈ 16 ms; PLAUSIBLE until SP-W7's rerun covers it) |""",
 "Volume 13 — §6 the one-click path (insertion after the W7a + W7b row)",
 "the budget table (V13:3586–3594) and the W7 law (V13:3591); the ellipse arithmetic (f·√(f²−1): 8.5 at 3 against 35.5 at 6; judge-3 §1 (7)); B's 10 / 25 / 60 row contradicted its own 61 ms note (judges 1–3). From: A 955 (bb), the per-trod cells and the 16 ms figure said.")

frag(962,'b',V13,3594,('A','955 (bc)'), r"""| **total** | | **755 ms** (budget 600: **over** — the province row's budget is re-declared at 900 ms, V13 §2.3's cell is data; 730 before W7c, file w) | **2 950 ms** (budget 1 800: **over** — re-declared at 3 000 ms; 2 900 before W7c) | **6 800 ms** (budget 4 500: **over** — re-declared at 7 000 ms; 6 700 before W7c) | |""",
 "Volume 13 — §6 the one-click path (the total row) (edit)",
 "the total row sums the rows (V13:3594); W7c adds 25 / 50 / 100 ms, inside the re-declared 900 / 3 000 / 7 000 (V13:3596–3597). From: A 955 (bc), 'item 955' shortened to 'file w'.")

frag(962,'c',V13,3656,('B','B-38'), r"""`WORLD-17` W7 (12) for one site ≤ 20 ms, a whole landmass's approaches ≤ 0.1 × the W7a + W7b row (V13 §3.8 (12)); `WORLD-18` W7 (13) whole inside its §6 row per rung (25 / 50 / 100 ms), one trod's re-lay ≤ 5 ms, the trod record (`trods`) ≤ 300 ms at the continent rung, the trods' memory ≤ 4 MB at the continent rung, nothing of a trod in the file but its secret states (file w). Each""",
 "Volume 13 — §6 The budget register (edit)",
 "the register's next id after WORLD-17 (V13:3656); T-V13-59 is its test row. From: B-38, the time cap tied to the §6 row (A's figures) in place of 0.15 × the W7 row.")

# ---------------------------------------------------------------- 963 tests and report codes
frag(963,'a',V13,3720,('B','B-39'), r"""every search is bit-identical across two runs | the placement fixtures |
| T-V13-59 | trods (W7 (13); file w): on B-WORLD-lite both ends of every trod are junctions on public land routes' polylines (within a fine cell); no trod crosses water, rides a public route's or another trod's cell save at a junction, or enters a placed frame's extent + margin; every trod's open-ground share ≤ `openShareMax`, an open plain between two roads lays none and reports nothing, and a forest patch of 40 km² touched by two roads lays at least one and at most `perPatchMax`, a patch that lays fewer than it asked reporting `W_TROD_SPARSE` once with its count; every kind is its first matching row; a junction within `gateBandM` of a placed frame's margin ring carries `nearSeat` and none lies inside the frame; two runs are byte-identical, a permuted route order identical, and the lay over one patch byte-identical whether the other patches are laid or not; a bypass of a joined route re-joins the trod within `rejoinM` keeping both ids (the trod's by its seed cell, the junction's by the anchor), a removal beyond it tombstones it with `W_TROD_UNJOINED`; a route chartered across a trod adds a `crossing` junction and leaves the course byte-identical, one chartered along it tombstones it; a demotion to hidden moves nothing; a placed frame over a patch re-lays only the trods it cuts and every other trod stays byte-identical; the trod record (`trods`) is whole or refused, integer, keyless of prose and raster indices, its envelope carrying the kind rows' widths, its stretches summing to each trod's `lengthM` and `effortM`, byte-identical when requested twice at one log head, its version stepping only when a trod changed, and the additive canon leaves it untouched; a trod carries no `PatrolCadence` and appears in no `patrolOffer`, `routeFacts` or `routes(world)` row, in no border-post proposal and in no continuity join; a reload rebuilds every trod byte-identical by replaying the lay versions, its secret states re-attached by key; the work limit cuts in rank order with `W_TROD_CUT`; W7c stays within `WORLD-18` | the world fixtures; a mock host |""",
 "Volume 13 — §7.3 (insertion after T-V13-58)",
 "§7.3 after T-V13-58 (V13:3720); the next free test id is 59 [OBSERVED]; the patch-isolation clause (C (g); judges 2 and 3), `W_TROD_SPARSE` (A/C), the anchor. From: B-39 with those clauses.")

frag(963,'b',V13,3737,('B','B-40'), r"""and an approach road carries no `PatrolCadence` (J393), and a trod carries none and has no `patrolOffer` row (file w) | fixtures |""",
 "Volume 13 — §7.4 T-V13-42 (edit)",
 "T-V13-42 (V13:3737); option B. From: B-40 unchanged.")

frag(963,'c',V13,3738,('B','B-41'), r"""its Treinf in cost units under the sent calibration; `routeFacts`' ordered stretches per host edge sum to its `lengthM` and its land effort-metres, agree with its `stations` and `vertexClass` run by run, and are byte-identical whatever the laying order (file w) | the travel-law fixture |""",
 "Volume 13 — §7.4 T-V13-43 (edit)",
 "T-V13-43 (V13:3738); ask B. From: B-41 unchanged.")

frag(963,'d',V13,3745,('B','B-42'), r"""never a historic front, a suppressed creed, a criminal channel or a trod the party's places do not admit (T-V13-60; file w) | the audience fixtures |""",
 "Volume 13 — §7.4 T-V13-50 (edit)",
 "T-V13-50 (V13:3745). From: B-42 unchanged.")

frag(963,'e',V13,3751,('B','B-43'), r"""relief and credit draw no link where the host names no giver | the trade fixtures |
| T-V13-60 | the trods' reveal and leak (file w): two worlds differing only in their unknown trods give a byte-identical player picture, legend, picker, screen-reader summary, `placeOf` words for the party, `mapFeed` for the player audience and every player-audience export, with the `trods` layer on and off alike; the DM's picture with the layer off likewise, and only the layer on differs; a trod `revealed` by `setAttr` or by the host's reveal through the party's places draws for the party with the open-ring cue, `discovered` reads `local`; a knowledge event resolved public draws the knowing seat's pin at the trod for the DM and, for a party that does not know the trod, at the seat with the country's words and no line, changing no secret state — one resolved DM-only draws for the DM alone, and a retracted event removes the pin; an engagement on an unknown trod or at its junction draws for the party at the seat territory's seat with the country's words, never at the trod or the junction; a party export never carries a trod the party's places do not admit; the hearing's `trod` and `junction` places render for the DM (a `nearSeat` junction "at its town gate") and read only the country for the party; V14's E1 crop lays a revealed trod's band and nothing for an unrevealed one in a party crop; the legend sentence is one string at 0, 1 and 1 000 trods | the audience fixtures; a mock host |""",
 "Volume 13 — §7.4 (insertion after T-V13-56)",
 "§7.4 after T-V13-56 (V13:3751); the leak surfaces (B §1.7); the single admission path (judge-3 E-B3); the toggle and crop cases (C's T-V13-60). From: B-43, the public-row second path removed, T-V13-61 dropped (no ninth lens).")

frag(963,'f',V13,3766,('B','B-44'), r"""| `W_SITE_NO_ROAD_ACCESS` | warning | W7 (12) (J393) | the site, the nearest route of its kind's class and its distance |
| `W_TROD_SPARSE` / `W_TROD_UNJOINED` / `W_TROD_CUT` | warning | W7 (13) (file w) | the patch, the trods asked and laid / the trod and the route its junction lost / the candidates dropped at the work limit |""",
 "Volume 13 — §7.5 The report codes (insertion after `W_SITE_NO_ROAD_ACCESS`)",
 "the report codes (V13:3754–3766); W7 (13) (d), (g), (h). From: B-44 with `W_TROD_SPARSE` (A 955 (bh); C F39).")

# ---------------------------------------------------------------- 964 milestones and the host's track
frag(964,'a',V13,3814,('B','B-45'), r"""the routes, seat territory, sway, occupation, debatable, fighting, patrol, event and trods layers; W7 (13)'s trods with their junctions, the `trods` raster layer, the party's secret states and the DM's reveal, the port's `trods` record, `routeFacts`' ordered stretches, the `trod` and `junction` places, `hostOverlay`'s movers on trods and the knowledge events' fold (file w); standalone `setSeats` | T-V13-14, 16, 17, 38, 39, 41 – 43, 46, 57 – 60; the B-WORLD statistics bars | 9 pw (file w's trods ≈ 1 pw — W7 (13), the record, the layer, the secret states and T-V13-59 – 60 — on the row's whole-week resolution; J393's""",
 "Volume 13 — §8.2 Milestones (M-W2, the contents, gate and estimate) (edit)",
 "M-W2 carries W7, the approaches, `routeFacts` and `mapFeed` (V13:3814); Q6 (`docs/host-requests/2026-10-18-hidden-ways.md:43`); the milestone verdict of judges 1–3. From: B-45, 'trods layer' kept as the view layer, nothing of a lens.")

frag(964,'b',V13,3820,('B','B-48'), r"""with the estimate range 38–46 pw (37–45 before file w's trods, ≈ 1 pw on M-W2),""",
 "Volume 13 — §8.2 the staged row (edit)",
 "the staged row (V13:3819–3820: each mechanism widens a named §16 line, BCR-V13-19); INDEX:39 and SUMMARY:124 carry the same figure (969 (c), (j)). From: B-48 unchanged.")

frag(964,'c',V13,3906,('B','B-49'), r"""| H31 | after M-W3, after H19 (optional; J393) | its map surfaces draw the map feed's approach roads — the map's own roads to world sites, keyless — as presentation labelled "map road", read by no step of its simulation | M-W2; H19 |
| H32 | with M-W2 (the trod record), after H9, H12 and H17 — the row's number, never the kernel's `H32` hash | the trod asks (file w): (a) its knowledge of a trod per settlement sent as a dated event of the events window — the knowing seat, the trod's id, its how-word through the adapter folder's vocabulary table, the week, the resolved audience (DM-only where unresolved) — and retracted by the windowed replace when its ledger forgets; (b) every engagement on a trod or at a junction with its `where` naming the trod (its id and a fraction) or the junction; (c) its movers on trods by the trod's id and a fraction — in the presentation messages, projected for the audience, or, where it keeps the week's presence as a ledger, as rows of the lens window: its choice, said once; (d) a watch on a trod, where it keeps one, as a dated event; (e) its reader of the trod record (`trods`) behind its own switch, with its tier line and its degraded arm, requested between advances and baked with its stamp, kept beside its frozen digest (at 2 000 trods the record is the size of its digest cap); (f) its register rows for `trod`, `junction` and the kind words `goat`, `drove`, `broad`, `hidden` kept for its grade and `way` minted on neither side; (g) its stand-in cover graph over `routeFacts`' stretches retired when (e) lands; (h) its reveal of a trod to the party through the party's places, as a site's | M-W2; H9; H12; H17 |""",
 "Volume 13 — §8.5 The host's parallel track (insertion after H31)",
 "the host's track ends at H31 (V13:3906); every lens step has its asks row; the request's own list (`docs/host-requests/2026-10-18-hidden-ways.md:46–47`); the `H32(` hash homonym (V13:1384, 3664; A 955 (bl); judges 2 and 3: keep H32 and say so); both presence channels offered (judge-3 S1). From: B-49 with the note, the two channels, the three kind words and (h).")

# ---------------------------------------------------------------- 965 decisions
frag(965,'a',V13,4028,('B','B-50'), r"""(item 133 (e)) (vetoable) |
| J-V13.114 | **(file w.)** chose **`trod`** for the host's hidden way, its end a **`junction`** and its width hint a **`kind`** of `goat`, `drove` or `broad`, with **`hidden` kept as the host's grade of an overt road only**, over `way` (the settlement frame's `WayClass` and the glyph's way mark: a world record named `way` would meet a frame record named `Way` at every ring crossing), `byway` (a minor public road, and the sites-roads lane's rejected name), `trace`, `track`, `trail` and `path` (each a record, a layer or a class already), `gauge` for the field (the host's own realm-gauge word), `form` (V13's "site form"), and `narrow`, `game`, `foot`, `cart` or `holloway` for the values (V14's `widthClass` value, the game master, V13's travel modes, an overt road's form), because one word carries one meaning across the seam (law (9)) and the host registers the words with its own homonym check (vetoable) |
| J-V13.115 | **(file w.)** chose **a record of its own kind, `Trod` with `TrodJunction` ends**, over a seventh `WorldRoute.class` or a `WorldRoute` of a new origin with two `join`s, because a trod has no seat, no host key, no leg, no class, no patrol and no charter road — every reader of `WorldRoute` would need an exclusion — and the approach road already shows what one junction-ended line costs each reader (vetoable) |
| J-V13.116 | **(file w.)** chose **the trod record as an optional simulator product (`trods`), versioned on its own against the canon's versions**, over a canon slot, because law (1) admits no lived network into a slot, the birth canon is adopted as the campaign is created and the genesis the trods join is laid over it, a later canonize is the DM's premium act, and the additive canon must move only the added seats' rows — so a slot would reach a born-canonized campaign's bodies only at a premium re-canonize, where the product reaches them between advances on every tier; the owner's answer to §11 Q4 named the canon, so this reading of the door is put to the owner in Q5 (vetoable) |
| J-V13.117 | **(file w.)** chose **the `trods` layer a toggle, default off — on, the DM sees every trod with V14 §2.3's cue and a player only a revealed or discovered one; off, nothing**, over a default-off base view key for the whole network (a base change, and a DM that cannot reveal what the picture hides) or an always-on layer (a picture export would carry the network by accident), because a DM sees DM-only things with a cue, as V14 draws a DM-only site, and "the view as drawn" is exported only on purpose (vetoable) |
| J-V13.118 | **(file w.)** chose **knowledge per settlement as the host's dated event in the events window, drawn and never decided by the map, and the party's `SecretState` as the record's only map-owned knowledge, changed only by the DM's `setAttr` or the host's reveal through the party's places**, over a knowledge flag on the record written by the host (the map would store the host's state as its own fact), a fourth knowledge tier (J-V14.12's reason), a public knowledge row drawing the trod's line for the party (a second admission path: the picture, `mapFeed`, the exports and `placeOf` would disagree, T-V13-50) or the event as a writer of the secret state (two writers on one attribute, which V14's states do not have), because the request keeps a town's knowledge apart from the party's view and V14's reveal rides the party key (vetoable) |
| J-V13.119 | **(file w.)** chose **one fixed, count-free legend sentence and no regime word, picker state, label, summary, place word or export that reads a trod count**, over a count (the leak the host names) or a legend row shown only when a trod is known (its presence would itself tell a player one exists) (vetoable) |
| J-V13.120 | **(file w.)** chose **no patrol cadence on any trod, no `patrolOffer` row, a watch drawn only as the host sends it**, over a map cadence on a known trod, because J396 keeps patrols map-only, the host has no patrol rule, and a cadence would put patrol pieces in the crop where the host watches nothing (vetoable) |
| J-V13.121 | **(file w.)** chose **`WorldWhere` kinds `trod` and `junction`, the party reading only the country it crosses where it does not know the trod, and an event on an unknown trod pinned for such an audience at the seat territory's seat**, over `point` (the hearing card could not name the place), `road` (a trod would count as a road for every reader of roads) or a pin at the trod's midpoint or junction for every audience (a point of hidden geometry, the junction being the ambush point itself) (vetoable) |
| J-V13.122 | **(file w.)** chose **W7c's density as terrain parameters — rough land uses and a relief threshold, one trod asked per `perRoughKm2` of rough country, an open-ground share cap, a sparse patch reported — in a rule table the host can read**, over counting trods per province or per road, because the owner's rule is "several per rough country, none across open plain" and a cap by rough area is what that says, and over a silent short-fall, because "several" must be auditable from the report (vetoable) |
| J-V13.123 | **(file w.)** chose **generated trods rebuilt on load by W7 (13) replayed over the routes' lay versions, reasoned on demand, only their secret states persisted, and a trod's identity its seed cell with §2.5's anchor**, over storing them (2 000 stored trods would take nine tenths of a province's record headroom and the same density would break the continent's 24 MB) or an identity by its junctions' keys (a bypass would re-key the trod the host's knowledge rows name) (vetoable) |
| J-V13.124 | **(file w.)** chose **a road born along a trod superseding it, a road chartered across it adding a `crossing` junction, a decayed road never becoming a trod, and no trod born where a road dies**, over a trod minted from a dead road, because the host has no such law and asks for none, the hidden-graded road already is the overgrown way with its own key, and a trod's law is cover, not history (vetoable) |
| J-V13.125 | **(file w.)** chose **`routeFacts`' ordered stretches as a reading over `stations` and `vertexClass`**, over a new `WorldRoute` field, because the record already holds the data and a stored run list would be a second state in the digest for nothing (vetoable) |
| J-V13.126 | **(file w.)** chose **no ninth lens in this pass — the trod's line a structural layer, the knowing settlement's mark the `events` layer's pin, a watch a dated event's pin, a mover `hostOverlay`'s marker, and the bodies' marks over the trods rows of D-V13.8's danger lens when the host sends them**, over a trods lens now (it would hold no fact the reveal needs, the host's marks need no regime, and J384 (8)'s ruled order of eight stays), because a lens may hold no geography and the host's bodies are the cause of the embattlement the danger lens draws (vetoable) |
| J-V13.127 | **(file w.)** chose **"at its town gate" as a route junction within `gateBandM` of a placed frame's margin ring, carrying `nearSeat`**, over a seat end (W7 (11): nothing but a host route ends at a settlement, and the approach road never enters a frame) or a gate-station end (frame geometry behind door 1), because the junction on the road that enters the town is the nearest host-nameable point and no frame geometry leaves the world with it (vetoable) |
| J-V13.128 | **(file w.)** chose **the quarantine refusals kept verbatim and a trod drawn unchanged across any closure, the closure's carrier left to the host's own ruling**, over narrowing the refusal now or marking which trods bypass a closure, because the host has no closure verb, the map draws no effect the host does not apply, and which way a body takes past a closure is the host's law (vetoable) |""",
 "Volume 13 — §9 Decisions (insertion after J-V13.113)",
 "§9's last row is J-V13.113 (V13:4028); each row 'chose X over Y because Z'; the rows carry the judges' verdicts (§1 of synthesis.md). From: B-50 (J-V13.114–126) re-written to the synthesis's rulings, J-V13.127 (C's junction ruling) and J-V13.128 (A's quarantine ruling) added.")

# ---------------------------------------------------------------- 966 owner questions
frag(966,'a',V13,4432,('B','B-52'), r"""The host's own changes (V13 §8.5's H1–H32) are the host's""",
 "Volume 13 — §11 Q2 (edit)",
 "Q2 names the host-row count (V13:4432). From: B-52 unchanged.")

frag(966,'b',V13,4437,('B','B-53'), r"""H12–H17, H22 and H32 with M-W2, H23–H30 with M-W5, H18–H20 after M-W3""",
 "Volume 13 — §11 Q2 (the recommendation) (edit)",
 "Q2's recommendation schedules each host row (V13:4436–4437). From: B-53 unchanged.")

frag(966,'c',V13,4460,('B','B-54'), r"""row's prerequisites (H5 on M-W1; H22 on H5, H7, H8 and H12) and lands on the owner's schedule for the host's track
(Q2).

**Q5 — The hidden ways' price, their place in the host's bodies chain, and the trod record's door (file w).** The
owner's rule of 2026-10-18 asked for the brigands' hidden roads; the host's request of that date asks the map for the
layer, the reveal and the ordered ground classes, and will name the map's milestone as a prerequisite of its bodies
chain. The design puts the trods, their record, their reveal and `routeFacts`' stretches in M-W2 (≈ 1 pw more: 8 → 9
pw; the staged row 37–45 → 38–46) and gives the host one new row, H32; the host's marks over the trods wait as rows of
D-V13.8's danger lens. The trod record reaches the host as the simulator feed's third optional product beside
`routeFacts` and `patrolOffer` (J-V13.116), read by its simulation between advances under the port consumption law, and
not as a canon slot, because the birth canon is adopted before the genesis the trods join and a later canonize is the
DM's premium act; the owner's answer to Q4 named the canon, so this reading of the door is the session's. What is the
owner's: the money; whether the bodies chain waits on M-W2 (after M-SF and M-W1) or the host builds its stand-in cover
graph first from `routeFacts`' stretches and retires it when the record lands; and whether the product reading stands.
*Recommendation:* accept the price and name M-W2; let the host build its stand-in from the stretches meanwhile, since
they land with the same milestone's `routeFacts` and change no simulated byte until the host reads them; confirm the
product reading — if the owner holds to the letter of a canon slot, the slot needs the host's automatic receipted
re-canonize after its genesis mount (J388's pattern), said in H32.""",
 "Volume 13 — §11 Owner questions (insertion after Q4's answer)",
 "§11 Q1–Q4 (V13:4423–4462); the one true owner decision (A's Q5, judges 1 and 3) with the product reading flagged (judge-1's verdict; B §3); B's quarantine question is plague-R7's (`docs/HOST-REQUIREMENTS-2026-10-18.md:481`) and C's slot question moot under the product. From: A 955 (bp), re-written; the old text is B-54's.")
