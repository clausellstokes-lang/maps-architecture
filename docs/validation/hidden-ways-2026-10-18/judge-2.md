# THE HIDDEN WAYS — judge 2 of 3 (hidden-ways/judge-2, Fable/xhigh)

Started 2026-10-19 01:28. Independent judgement of design-A.md, design-B.md, design-C.md in this folder against the nine criteria of the seat. The other judges' records were not read.

## 0. Method

- Each design read whole from disk; the request (docs/host-requests/2026-10-18-hidden-ways.md), the five reader notes (read-*.md), the host notes (research/sf/*.md, docs/HOST-REQUIREMENTS-2026-10-18.md) and the volumes consulted by line.
- Tags: [STATED] the text says it; [OBSERVED] checked in the repository; [INFERRED] my reading.
- Fragment spot-checks: five current texts per design searched exactly in the target file at the stated line (grep -nF, then line match).

(record written as the judging proceeds; sections below fill in order)

## 1. Reading notes — design A (read whole, 1054 lines) [OBSERVED]

- Word: trod; end: junction; width hint: form (narrow/drove/broad with nominal widthM 1/3/5). "hidden" refused as the layer's class, kept as the host's grade (design-A.md:28–48).
- Record: `Trod` of its own kind + `TrodJunction` with `on` = route (lay version + fraction {num,den}) | seat (margin ring) | trod (vertex) (design-A.md:145–165, 955 (f)). Secret state = V14 SecretState on the trod, `knownTo` secret at birth.
- Canon: a FOURTH SLOT `trods` with its own hash; port law (1) widened by one clause (routes' laid courses in force, geometry alone) (955 (ak), design-A.md:217–230); junctions on the lay in force, re-joined at the adopting canonize; additive canon re-derives only touched trods (955 (ag)).
- B: `routeFacts` ordered ground runs as a derived transient (956 (a)).
- W7 (13) "W7c Trods" with the rule table `world.trods` (cover, roughSlopePct 8, minRoughKm2 25, perKm2 per rung, minPerCountry 2 / maxPerCountry 12, openFactor 4, maxCostFactor 3, coverShare 0.7, openRunMaxM 1500, spacingM 500, forms, formRule); failure rung `W_TROD_SPARSE`; work limit; budget row 25/50/100 ms; totals 755/2950/6800 (design-A.md:199–215, 955 (aa)–(at), (bb)–(bd)).
- Reveal: structural `trods` layer under the admission; DM sees EVERY trod by default with V14's second cue (NO default-off view key, J-V13.121); ninth lens `trods` (known to / watched / on the trod / at the junction / width hint), count-free legend, refusals (design-A.md:232–257, 955 (au), (ba)).
- Knowledge: H9 WorldEvent (kind through event table, `where: trod`, `seats`, `cause` = how-word); watches on `roadWatch` by trod key (H13); movers via `hostOverlay` (H17), H23 corrected (design-A.md:259–274).
- Lifecycle: never promoted; demoted road stays a WorldRoute; no trod born where a road dies (J-V13.123); detours: HR:653 corrected (957 (d)).
- Quarantine: refusals stand; gated note; carrier left to plague-R7 (design-A.md:290–298).
- Budget: ≈300 B/trod at province, 200 → 0.06 MB, 2000 → 0.6 MB vs 0.75 MB headroom; WORLD-18 caps trods at 0.5 MB at continent; rebuild-on-load fallback (design-A.md:123–138, 955 (x)–(z), (bd)).
- Milestones: M-W2 9 pw (A + B + reveal), M-W5 lens ≈0.5 pw inside row; H32; T-V13-59/60; J-V13.114–124; no BCR; Q5 owner question (price + product order).
- Four contradicted host premises stated back (design-A.md:330–335).
- Things to verify: (i) fraction-of-land-effort junction form claimed as "WorldWhere's own form" (V13:887 has `fraction?` — check its unit); (ii) the H32 homonym (kernel's `H32(` hash) noted by the designer itself; (iii) `cover` keyed on `BiomeRow['landUse']` — check that type exists; (iv) `seasonal?: WorldRoute['seasonal']` — check WorldRoute has `seasonal`; (v) `secret: SecretState` referenced in V13 — V14's type, cross-volume reference; (vi) the "trods ≤ 0.5 MB" vs province 0.6 MB at 2000 — the cap is stated at the continent rung only; province figure 0.6 is under 0.75 but over 0.5 — consistent only because the cap is per continent (check wording 955 (y): "the trods ≤ 0.5 MB of them" sits inside the continent sentence — fine).

## 2. Reading notes — design B (read whole, 1869 lines) [OBSERVED]

- Word: trod; ends: junctions; kinds `goat|drove|holloway|game` with integer widthM (1 / 3 / 2.5 / 1) in `world.trod.kinds` (design-B.md:90–97, 210–230).
- Record: `Trod { a; b (TrodJunction ids); kind; polyline; stations; vertexClass; lengthM; effortM; roughShare; layVersion; secret: SecretState; reason }`; `TrodJunction { at; route { id; hostKey?; stationM }; arms[]; kind: 'end'|'crossing' }`. NO seat end in this pass (design-B.md:173–178, §4 (3)). No seasonal sets on a trod (§4 (8)) — relies on `TravelLaw.season.terrainFactor` per class (V13:858).
- Canon: NOT a slot — `trods(world, {logHead})` → `TrodRecord`, the simulator feed's THIRD OPTIONAL PRODUCT, versioned on its own against the canon versions; law (1) kept verbatim (reason: lived network in force; birth canon precedes genesis; additive canon moves only added seats' rows) (design-B.md:285–317, J-V13.116). No polyline in the record (geometry rides the map feed).
- B: `routeFacts.stretches` as a reading over stations/vertexClass (design-B.md:196–208).
- W7 (13) "W7c Trods": rough by majority landUse or local relief ≥ 120 m over 2 km; patches ≥ 4 km²; touch points per route thinned per junctionSpacingM 3000; Urquhart graph candidates; perRoughKm2 32; A* with coverFactor 0.5 / openFactor 4; openShareMax 0.2; roadNearM 500 / roadHugShareMax 0.3; incremental re-lay rules incl. `crossing` junction where a road is chartered across, tombstone where a road is chartered along (design-B.md:232–283). Codes `W_TROD_UNJOINED`, `W_TROD_CUT`. The step "never refuses" — note: no "sparse" report rung (an under-filled patch is silent; counts in the patch reason).
- Reveal: `trods` layer; DM default draws only KNOWN/revealed/discovered trods; `showTrods` view key default off shows all (ghost) (J-V13.117); audience filter clause; BCR-V13-41 for the base's admission sentence, §7.7 port paragraph and the view key (design-B.md:319–338, 529–535).
- Ninth lens `trods` placed AFTER PATROLS in the order (B-6, B-9: `'patrols'|'trods'|'trade'…`, order value 2) — note: inserting in the middle of the closed union changes the existing union's order text ("J384 (8)'s order") — check vs A/C which put it last.
- Knowledge: H9 WorldEvent, `cause` how-word; movers H17; watch "as a dated event" (NOT via roadWatch); H23 corrected; H16 direction corrected.
- Lifecycle: never promoted; decayed road not a trod; no trod born where a road dies; NEW: a road chartered along a trod tombstones it (J-V13.124).
- Quarantine: refusal NARROWED now to "a quarantine line the host did not send" (B-33) — before the host's verb exists; carrier chosen as H9 event (not roadWatch, since a town gate is not an edge). Q5 owner question on the closure.
- Budget: never stored; rebuilt on load; ≤40 KB at rest for 2000; ≈350 B in memory; host-side record ≈410 KB ≈ the host's digest cap (HRQ:840); WORLD-18 as time/memory caps (≤0.15 × W7 row; record ≤300 ms; memory ≤4 MB); W7c row 10/25/60 ms; totals 740/2925/6760 (design-B.md:439–462, B-36–B-38).
- Milestones: M-W2 9 pw; M-W5 lens ≈0.25 pw; staged row 37–45 → 38–46 (B-48, B-I4, B-S2); H32; T-V13-59/60/61; J-V13.114–126; BCR-V13-41; 13 corrections to the host's rows (§1.17).
- Things to verify: (i) B-6's LensId order (trods inserted after patrols — does `world.lens` order text at V13:1170 say "J384 (8)" fixed order of eight? inserting among them may contradict "J384 (8)'s eight"); (ii) B-15 line 1334 digest leaves; (iii) B-36's W7c row 10 ms at province vs its own 61 ms arithmetic ("2 000 ≈ 7.7 × 10⁶ cells ≈ 61 ms") — the row's figure 10 ms is BELOW its own arithmetic (61 ms) — an inconsistency; (iv) "the trod record at 2 000 trods ≈ 410 KB uncompressed — the size of the host's digest cap of 400 000 bytes" — check HRQ:840; (v) `whyTrod, V13 §4.7` — check §4.7 exists; (vi) 'majority landUse over the coarse grid' — the rough pass is on the coarse grid while routes/A* are on the fine grid; fine; (vii) the density scaling "(fineCellM ÷ 250)²" in TrodRule vs "(250 ÷ fineCellM)²" in the W7 (13) (c) text — the two formulas are reciprocals; check which is right: at coarser rungs (fineCellM 1000) fewer trods per km² is intended ("one per 512 km² at 1000 m" per §1.11 → perRoughKm2 scaled ×16 = 32 × (1000/250)² = 512 ✓ so perRoughKm2 scales by (fineCellM ÷ 250)²; the candidate count = patch km² ÷ (perRoughKm2 × (fineCellM/250)²) = patch km² ÷ perRoughKm2 × (250/fineCellM)² ✓ — both consistent).

## 3. Reading notes — design C (read whole, 1260 lines) [OBSERVED]

- Word: trod; ends: junctions (`TrodEnd`, no junction record of its own); breadth: `gauge` game/foot/cart/drove with `widthCm` 60/100/250/600 (design-C.md:28–47, 77–81, 130–144).
- Record `WorldTrod { a; b: TrodEnd; origin 'genesis'|'user'; layVersion; polyline; stations; vertexClass; gauge; widthCm; landEffortM; lengthM; byClassM; seedCell; landmass; name?; secret: SecretState; costTotal; reason }`; `TrodEnd` = route (route, hostKey?, station, atCm, nearSeat?) | trod (trod, vertex, atCm). Identity by SEED CELL (survives a re-lay of the joined route). "Settlement's gate" = a route junction within gateBandM carrying nearSeat (design-C.md:146–151).
- Canon: FOURTH SLOT with law (1) widened by one clause (F27); additive canon carries the slot byte-identical, tombstone at the premium re-canonize (F23). Slot carries `a/b` as CanonTrodEnd {edge, station, atCm} (design-C.md:262–272).
- B: `routeFacts.runs {fromStation; toStation; lengthM; terrainClass}` (F24).
- W7 (13): cover by landUse/slope ≥ 10 %/above the host law's knee; 4-connected patches ≥ 64 cells; n = min(5, 1 + ⌊km² ÷ 150⌋) seeds by chamfer distance from the boundary; one Dijkstra from the seed to the first terminal then to a second; drops → `W_TROD_SPARSE` per patch; lengthM 1.5–40 km; maxCostFactor 8 (design-C.md:198–258).
- Reveal: structural `trods` layer, a toggle DEFAULT OFF; the DM sees every trod with the layer on and none with it off; party only revealed/discovered; the knowing town's mark is the EVENTS layer's pin (no lens); a knowledge event resolved public/local SETS the trod `revealed` (the host's reveal via the party's places); the legend's fixed sentence belongs to the layer (design-C.md:286–317). NO NINTH LENS (J-V13.122): bodies' marks deferred to D-V13.8's danger lens (F43).
- Knowledge: H9 event; `WorldEvent.at` placed at fold for a trod/junction `where` (F6); movers H17; a watch is an H9 dated event (no roadWatch); H16 not needed.
- Lifecycle: never promoted; decayed road not a trod; no trod born where a road dies; re-join on removal/re-lay/demotion (also on demotion to hidden: "or graded hidden by a network window" — note: A and B keep the junction on a demoted road; C re-joins it because a hidden-graded road is "no public road" as a terminal) (design-C.md:239–245, 321–328).
- Quarantine: refusals kept verbatim; the plague lens's NOT-DRAWN list gains a sentence (F35); closure element a later item.
- Budget: never stored; the canon message grows (≈150–200 B/trod gzipped: 35 KB at 200, 0.35 MB at 2000); the defaults give ≈150–400 per province; host digest cap binding at 2000; WORLD-18 ≤ 0.5 × W7 row (30/100/260 ms) (design-C.md:104–115, 341–351). No change to the W7 budget table's total row (no fragment at V13:3591/3594).
- Milestones: M-W2 re-declared 9 pw (+0.75), "inside §16's 37–45" (staged row NOT changed); H32; T-V13-59/60; J-V13.114–124; no BCR; Q5 = the trods slot under the door-1 yes.
- Hearing places: `WorldWhere` `trod` (trod + fraction) and `junction` (trod + end 'a'|'b') (F10).
- Things to verify: (i) `Cm`, `NameRef`, `worldFactsAt` exist in V13; (ii) V13:4038–4040 is the danger lens; (iii) V13:3818–3819 the §16 range and whether M-W2's +1 should move the staged row (A also leaves it; B moves it to 38–46); (iv) F6/F7/F10/F28/F37/F46 old texts with ⏎ (line-break) quotes — check the JSON old texts match across line breaks; (v) `gauge` 0 hits; (vi) the party's `places` holding a trod id requires the base's admission function to read a trod's SecretState — C says no BCR because BASE:15744 is generic ("A place's SecretState ... is read through knownTo and the key's places by the same admission function") — but a trod is not "a place" in the base's sense; B files BCR-V13-41 for exactly this; A says the same as C (no BCR). Judge: is a BCR needed? The base sentence names "A place's SecretState (V14 §2.3 ...)" — a world trod is a V13 entity, not a V14 place; strictly the base's sentence would need the one clause B adds. Verify BASE:15744 wording.

## 4. Verification results (what was checked, [OBSERVED] unless tagged)

### 4.1 Targets and fragments
- Target md5s at 2026-10-19 01:33: V13 `e68af748…` (4 611 lines), V14 `f5dd37a7…` (3 340), base `eac3a6a5…` (24 467), HOST-REQUIREMENTS `7db37cc1…` (935), INDEX `10a72c97…`, SUMMARY `1c0ada29…` — every design's stated md5s match.
- Every fragment of all three machine copies was checked by script (scratchpad `judge2/check.py`): each `old` text occurs exactly once in its target, at the stated line, and applies in order to a copy with each new text landing once. Result: design-A 82/82, design-B 74/74, design-C 66/66 — no failure in any set (see §10 for the five named per design).

### 4.2 The readers' citations the answers rest on (V13 lines re-read)
- V13:786–793 `WorldRoute` (`join?` an approach road only; `vertexClass`, `stations`, `byClassM`, `seasonal?.snowWeeks`) [STATED]; V13:1827–1828 legs end at settlements [STATED]; V13:2484–2485 `routeFacts` per-class effort, V13:2437–2439 the map feed never read by the simulation [STATED] → Q1 and Q2 as all three answer them.
- V13:788 the six classes with `grade … hidden among them`; V13:1813–1820 the hidden ghost; V13:1163 `(hidden: none)`; FPI:99/159 the host's decay rung → Q3 as all three answer it.
- V13:957–963 no fourth tier; V13:2578–2579 law (3); V13:834–839 `WorldEvent` → Q5 as all three answer it.
- V13:3814/3816 M-W2 8 pw / M-W5 7 pw; V13:3819–3820 "M-W0 – M-W5 is priced as one staged-milestone row in §16 with the estimate range 37–45 pw, **each mechanism widening a named §16 line** (BCR-V13-19)" → the staged row should move when M-W2 moves (only B moves it).
- V13:1359–1362 the budget and the rebuild-on-load fallback; V13:1352–1354 the 10⁵ × 120 B ≠ 2 MB conflict (all three notice it) → Q7.
- V13:3906 H31 last; V13:4028 J-V13.113 last; V13:3720 T-V13-58 last; V13:4391 BCR-V13-40 last; V13:4455–4461 Q4 answered — every design numbers from the right next id.
- V13:1384, 3140, 3146, 3664: `H32(` is the kernel's 32-bit hash — the H32 homonym A flags is real; B and C do not mention it.
- V13:996 `BiomeRow.landUse` union exists (A's `Record<BiomeRow['landUse'], 0|1>` is well-typed); V13:962 already cites V14 §2.3's `SecretState`, so a V13 record carrying it has precedent; V13:3108 "§4.7 The clerk's view" exists (B's `whyTrod, V13 §4.7`); `worldFactsAt` (12 hits), `NameRef` (7), `Cm` (41) exist (C's readers and types).
- **Birth sequence (bears on slot vs product):** V13:3897 H22 "the first canon adopted as the campaign is created … and its genesis network laid at birth (H12)"; V13:3887 H12 "genesis at world birth over the canon"; V13:2454–2463 the additive canon "differs from that canon only in the added seats' own rows …"; V13:2471 everything else "stays `W_HOST_CANON_BEHIND` until a later canon adopts it"; V13:2479–2483 a re-canonize outside a founding is "the DM's explicit premium act" [STATED]. So on a born-canonized campaign the routes postdate the birth canon, and a trods SLOT (A, C) is empty at birth and is not refreshed by the additive canon (A re-derives only the trods a new seat's edges touch; C keeps the slot byte-identical) — the first delivery of any trod to the host would be the DM's premium re-canonize. B's reason (ii) for a product is correct and A and C do not answer it [INFERRED from the lines above].
- V13:857 (not 858): `season: { … terrainFactor: Record<string, number[]> /* per host terrain class, per quarter */ }` — B's fact is right, its line is off by one.
- V13:835 `at?: WorldPointCm /* absent exactly when pair is given and no point … */` — an event whose `where` is a trod with no `at` breaks this invariant unless placed at fold; only C (F6) says so.
- V13:3819–3820 and V13:3594 (totals 730 / 2 900 / 6 700): A re-adds 755 / 2 950 / 6 800 (consistent with its 25 / 50 / 100 row); B re-adds 740 / 2 925 / 6 760 from a 10 / 25 / 60 row whose own cell says "2 000 ≈ 7.7 × 10⁶ cells, ≈ 61 ms" (and its default ≈ 800 trods ≈ 24 ms) — the row figure contradicts its arithmetic; C adds no row and leaves the totals, though it registers `WORLD-18` (≤ 30 / 100 / 260 ms).

### 4.3 Host facts (research/sf and HOST-REQUIREMENTS lines re-read)
- FPI:159 M4 "armies may not"; POP:420 "hidden hops refused"; TRD:565–568 one roll at the worst gate, TRD:179 "no path"; FTH:435–436 `pantheon` the only allowlisted ledger; HRQ:711 no host patrol rule; HRQ:840 the digest cap 400 000 bytes; HRQ:83/577 H17 movers, HRQ:102 H23 the lens window, HRQ:576 H16 the host's optional reads; HRQ:481 plague-R7 open; PLG:556, 798–799 no quarantine verb; LNS:196 "never"; FPI:98/99 the grade ladder; FPI:394/401 the stale T2/T9 rows; FPI:484 the note read V13 at 2 988 lines — every host fact the three designs use is [STATED] at the line cited (B's 13 corrections and A's/C's four contradicted premises all check out).

### 4.4 Term census (whole-word, case-insensitive; V13 / V14 / base / HRQ / research)
- `trod` 0/0/0/0/0; `goat`, `drove`, `holloway`, `byway` 0 everywhere; `narrow`, `broad` 0 in V13.
- `gauge` 0/0/0/0/2 (research prose "realm gauge") — free in the three documents as C says.
- `form` 58 in V13 — among them the TERM "site form" (V13:129, 132, 369, 540, 2162–2183, 3814 "P1's site form with its bend") — A's field `Trod.form` gives a V13 term a second meaning.
- `foot` 17 in V13 — among them closed-vocabulary VALUES: `TravelLaw.baseMode: 'foot'` (V13:854), `bandEdges.read: 'foot'|'army'` (V13:857), `kmPerWeek` foot / cart (V13:1141); `cart` likewise — C's gauge values `foot` and `cart` collide with V13's travel-mode tokens.
- `game` 4 in V13, prose only ("game master") — B's and C's value `game` is a code-font token, a soft collision at most.
- `kind` is the volume's generic discriminator name (`WorldWhere.kind`, `WorldEvent.kind`, `roadWatch.kind`, 155 hits) — B's field name is the convention, not a new meaning.
- `junction`: V13 already uses it on the world for the approach road's end (V13:1850) — all three reuse that one meaning.

## 5. Scores (0–5 each; one line of reason per design)

| criterion | A | B | C |
|---|---|---|---|
| (1) host fidelity — facts [STATED]/[OBSERVED]; six behaviours served | **4** — every fact at its line, six behaviours served; a trod watch put on the polity window's road-watch row (a carrier the host does not keep for trods) | **5** — the host-first table maps each behaviour to the smallest piece; 13 corrections to the host's rows, each at its line; the birth sequence read right | **4** — every fact at its line, six behaviours served; a public knowledge event made the host's reveal (V14:764 / HRQ:601 route the host's reveal through the party key) |
| (2) map-architecture consistency | **3** — law (1) widened; the trods slot unreachable at birth and through the additive canon (§4.2); `roadWatch.edge` made optional (an existing record's meaning changed); a split at a crossing re-keys a trod | **4** — law (1) kept whole by a product beside `routeFacts` with the right reasons; conventions followed throughout; minus the ninth lens inserted mid-order (re-states J384 (8)'s order) and the plague refusal narrowed before plague-R7 | **4** — "no existing sentence changes meaning" largely kept; F6 keeps V13:835's `at` invariant (A and B would break it); seed-cell identity; minus the same slot hole as A and D-V13.8 edited |
| (3) the reveal is leak-proof | **4** — admission over `knownTo` + places, `mapFeed` by audience, `placeOf` names the country, exports under admission, count-free legend and regime, T-V13-60's non-interference; minus "a public row draws the trod's line for the party" beside the party's places | **4** — the same guards, the strictest DM default, the events-layer rule for an unknown trod, T-V13-60; the same public-row second path | **3** — picture, export, count, crop and `mapFeed` guarded and tested; but `placeOf` (V13:2518, no audience) is given no party rule, so a party-facing caption could name a trod |
| (4) one word, one meaning | **4** — `trod` free, `hidden` kept as the grade, `way` answered; values `narrow`/`drove`/`broad` free; minus the field `form` (V13's "site form") | **5** — `trod`; `kind` the generic discriminator; `goat`/`drove`/`holloway` free, `game` prose-only; `way` and `hidden` added to the collision rows | **4** — `trod` and `gauge` free; minus values `foot` and `cart`, already V13 travel-mode tokens (V13:854, 857, 1141) |
| (5) minimality (ENC-HL-12 + ENC-HP-09 and no more) | **3** — a ninth lens, a stored record with a size cap, snow weeks, `roadWatch` widened, three collision rows, 82 fragments | **3** — a ninth lens, three base changes, a view key, the staged row, 74 fragments; no seat end, no seasonal (right) | **4** — no lens, no BCR, no view key, 66 fragments; extras: a DM `name`, `setAttr` on `gauge`, `origin 'user'` reserved |
| (6) determinism and identity | **3** — reserved concern, sorted ties, order-free; identity by rounded junction keys with a 50 % overlap anchor; a crossing splits and re-keys; the host's copy stale until a premium re-canonize | **4** — Urquhart candidates, cell-index ties, incremental (g) with `crossing` junctions keeping a trod whole, a version the host picks up between advances; identity by junction cell kept by rule on re-join | **4** — seed-cell identity (the strongest), patch-local lay ("byte-identical whether the others are laid or not"); minus no rule for a route chartered across a trod after birth, and the slot hole |
| (7) budget arithmetic | **4** — internally consistent (960 cells per 10 km trod at factor 3; 25 / 50 / 100 ms; totals re-added); minus storing: 2 000 trods ≈ 0.6 MB of a 0.75 MB province headroom shared with every other record, the cap stated for the continent only | **3** — the memory, time and host-digest figures right; but the W7c row's 10 ms contradicts its own 61 ms / 24 ms arithmetic in the same cell | **3** — never stored (right), WORLD-18 as a cap; but no W7c row and the §6 totals left at 730 / 2 900 / 6 700 |
| (8) the seven answers vs the readers' citations | **4** — all seven right; Q7 "yes at 2 000" is a cost of its own storing | **5** — all seven right, Q2/Q6/Q7 the most complete, the birth sequence named | **4** — all seven right; Q6 the cleanest single-milestone answer; Q4's words collide (see (4)) |
| (9) fragments exact (five spot-checked, all checked) | **5** — 82/82 | **5** — 74/74 | **5** — 66/66 |
| **total** | **34** | **38** | **35** |

## 6. Ranking

**B, then C, then A.** B's host-first reading gets the one structural point the other two miss — on a born-canonized campaign a trods slot cannot reach the host (the genesis is laid over the birth canon; the additive canon carries only the added seats' rows; the next canonize is the DM's premium act), so the layer must be a product the host requests between advances — and its junction model (`arms`, `crossing`), its incremental lifecycle and its corrections list are the most complete. C beats A narrowly: it changes fewer existing meanings, keys a trod by its seed cell, catches the `WorldEvent.at` invariant and needs no lens, no BCR and no view key; it loses on the `placeOf` gap, the `foot`/`cart` tokens, the missing crossing rule and the §6 table. A is the fullest specification and the best-tested, but stores what need not be stored, widens law (1) without solving the delivery, re-keys a trod at a crossing and changes `roadWatch`.

## 7. GRAFTS (the best idea of each runner-up, carried into B)

From **C**:
1. **Identity by seed cell** — creation key (`trod`, the landmass, the seed cell's index) (C F14) in place of B's (`trod`, its two junctions' keys sorted) with junctions keyed by (route lineage, fine cell): a bypass or re-lay then never changes the key, and B's "re-joins keeping the id" becomes a consequence instead of a rule.
2. **`WorldEvent.at` placed at fold when `where` names a trod or a junction** (C F6: "placed at the trod's midpoint vertex or the junction's point at fold, likewise recorded") — V13:835's "absent exactly when `pair` is given" invariant would otherwise break for B's knowledge and hearing events.
3. **`nearSeat` on a route junction within `gateBandM` of a placed frame's margin ring** (C's `TrodEnd.nearSeat`, `lay.gateBandM` 1 000 m): answers the request's "a settlement's gate" end (A3) without a seat end or any frame point, keeping B's one-graph rule (every end a host edge key + station).
4. **The knowing town's mark as the `events` layer's pin, the ninth lens deferred** (C §1.5, F34, F43): the knowledge event is a `WorldEvent`, which V13:3149's `events` layer already draws at its place; the request's C needs only the reveal, the mark and the count-free sentence. Drop B's `LensId` widening and mid-order insertion (B-6, B-9, B-35, B-46, B-47, T-V13-61); keep the fixed legend sentence on the `trods` layer (C F34) and record the bodies' marks as rows of D-V13.8's danger lens (C F43) — a later row set, no prerequisite of the bodies chain.
5. **The patch-local determinism invariant** ("the lay over one patch is byte-identical whether the others are laid or not", C (g)) as a T-V13-59 clause — it is what makes B's incremental (g) and any founding's re-lay provably local.
6. **V14:994's route-borne tests say "never a trod"** (C FV2) — B's B-V2 lists `awayFromRoutes` counting no trod in V14 §10.2 but edits no test text; C edits the sentence the tests read.
7. **The layer toggle default off, on = every trod with its cue** (C §1.5) in place of B's `showTrods` view key: the same export hygiene (V13:3212 "the view as drawn") with no base view key (B-B3 falls away) and the DM seeing DM-only things as V14:764/2583 draw a DM-only site.

From **A**:
8. **`W_TROD_SPARSE`** (A 955 (ao)–(ap), (bh)) — a country that lays fewer than `minPerCountry` is reported once with its count, "never a trod across open plain to make the count"; B's step "never refuses" and reports nothing, so the owner's "several per rough country" cannot be audited from the report.
9. **The W7c budget row 25 / 50 / 100 ms and the totals 755 / 2 950 / 6 800** (A 955 (bb)–(bc)) with A's ellipse arithmetic (≈ 960 cells per 10 km trod at its own factor) — corrects B's 10 / 25 / 60 (see §8 B.1).
10. **The owner's rule quoted in V13 §1.3's "owner rules obeyed" list** (A 955 (a)), as file t did for J393 — the volume's convention for an owner's verbatim rule; B's B-1 paragraph at V13:140 can stand beside it.
11. **The H32 homonym stated in the row** (A 955 (bl): "the row's number, never the kernel's `H32` hash") — keep H32 (the host track's sequence outranks; the hash is always `H32(` in code font) and say so.
12. **The lens placed last, outside J384 (8)'s eight** (A 955 (m), (r)) — if the synthesis keeps a ninth lens after all, A's placement is the one that leaves the owner's ruled order of the eight untouched.
13. **`WorldWhere.trod` with `fraction` in `WorldWhere`'s own `{num, den}` form** for the hearing card (A 955 (l); B has it too) — kept; and A's `placeOf` sentence (955 (ai)) is the model for the party rule C lacks.

## 8. Errors found (with the correction)

**Design A**
- A.1 `Trod.form` — "form" is a V13 term ("P1's site form", V13:3814 and 7 more lines). Correction: `kind` (B) with B's four values, which map one-to-one onto the host's four registered hints.
- A.2 Storing trods (≈ 300 B each; 0.6 MB at 2 000 against a 0.75 MB province headroom shared with every other record) buys nothing: W7c is deterministic and the secret states are edits either way. Correction: never store (B/C; V13:1361–1362's pattern); `WORLD-18` a time and memory cap, not a 0.5 MB record cap.
- A.3 The fourth slot is empty at birth and the additive canon leaves untouched trods as the adopted canon had them (none): the first delivery is the DM's premium re-canonize (V13:3887, 3897, 2454–2483). Correction: B's product; or, if a slot is kept, extend J388's unasked receipted re-canonize to "the first point between advances after the genesis lay (H12)" as a stated new host behaviour in H32.
- A.4 955 (k) makes `roadWatch.edge` optional — an existing record's meaning changes for every reader of it. Correction: a watch on a trod is a dated H9 event (B/C); `PolityFacts` untouched.
- A.5 "a route laid across a trod splits it at the crossing into two trods ending at a new junction" re-keys the trod the host knows. Correction: B's `crossing` junction (the course byte-identical, a junction of kind `crossing` added).
- A.6 "a row the host resolves public draws the mark — and with it the trod's line — for the party" admits a line by a host row, beside the party's `places` (J-V14.12: one admission function). Correction: the mark draws only where the trod draws for that audience; the host's reveal rides the party key (A's own H32 says so).
- A.7 M-W2 8 → 9 pw without widening the staged row (V13:3819–3820: each mechanism widens a named §16 line; INDEX:39, SUMMARY:124 carry 37–45). Correction: 38–46 (B-48, B-I4, B-S2).

**Design B**
- B.1 B-36's W7c row 10 / 25 / 60 ms contradicts the cell's own "2 000 ≈ 7.7 × 10⁶ cells, ≈ 61 ms" and the default ≈ 800 trods ≈ 24 ms at the province. Correction: 25 / 50 / 100 ms (A's row and arithmetic), totals 755 / 2 950 / 6 800 (B-37), or C's cap ≤ 0.5 × the W7 row.
- B.2 `TravelLaw.season.terrainFactor` cited at V13:858; it stands at V13:857.
- B.3 B-33 narrows the plague lens's refusal now ("a quarantine line the host did not send …") and pre-decides how a closure draws, while B's own Q5 asks the owner about exactly that (plague-R7 open). Correction: keep V13:3385 verbatim; carry A's gated note or C's not-drawn sentence (F35) and leave the closure element to the ruling.
- B.4 B-6/B-9 insert `trods` between `patrols` and `trade` in `LensId` and the lens order, re-stating J384 (8)'s ruled order of the eight. Correction: no lens now (graft 4), else last (A).
- B.5 J-V13.117 hides unknown trods from the DM's default picture, against V14's `dmOnly` precedent (the DM sees a DM-only site with a dashed ring, V14:764, 2583). Correction: C's layer toggle (default off; on = every trod with its cue).
- B.6 A patch that lays fewer than asked is silent (counted in the patch reason only). Correction: `W_TROD_SPARSE` (A/C).
- B.7 "a knowledge event resolved public draws its trod for the party with the seat's mark" — the same second admission path as A.6; same correction.
- B.8 The request's A3 "a settlement's gate" is deferred (§4 (3)). Correction: C's `nearSeat` within `gateBandM`.

**Design C**
- C.1 `gauge` values `foot` and `cart` are already closed-vocabulary tokens (`TravelLaw.baseMode: 'foot'`, `bandEdges.read: 'foot'|'army'`, V13:854/857; `kmPerWeek` foot / cart, V13:1141). Correction: B's `goat`|`drove`|`holloway`|`game`.
- C.2 The slot delivery hole (as A.3): F23 keeps the slot byte-identical in the additive canon, so a born-canonized campaign's host copy holds no trod until the DM's premium re-canonize. Same correction.
- C.3 `placeOf` is given no party rule (V13:2518 takes no audience; C §1.1's words name the trod and its routes). Correction: A's 955 (ai) / B's B-24 clause ("for an audience that does not know the trod only the country it crosses").
- C.4 No rule for a public route chartered across a trod after birth (the cost surface bars route cells only at lay time). Correction: B's `crossing` junction and "a road born along a trod supersedes it".
- C.5 No W7c row in §6's one-click table; the totals row (V13:3594) stays 730 / 2 900 / 6 700 though `WORLD-18` is registered. Correction: A's row and totals.
- C.6 The staged row not widened (as A.7).
- C.7 "a knowledge event the host resolves public or local is the host's reveal" makes an event's audience the reveal; V14:764 and HRQ:601 route the host's reveal through the party key (V08 §3.14). Correction: the pin draws where the trod draws; the reveal rides the party key.
- C.8 F2 lets the DM `setAttr` a trod's `gauge` — the hint the host derives capacity from; not asked. Correction: `name` and `secret.state` only.

**Shared housekeeping (all three notice, none corrects; for the synthesis's fix list):** V13:1352–1354's "≤ 10⁵ records … ≈ 120 B each gzipped, inside the 2 MB" (12 MB); HOST-REQUIREMENTS' H list ends at H30 (H31 missing; A notes it); the stale V13 line numbers in HRQ:68, 82, 102.

## 9. Verdict

**The word.** `trod` — unanimous and verified free (0 whole-word hits in V13, V14, the base, the host document and the research notes); its end a `junction` (V13's one world-scale meaning already, V13:1850); `hidden` stays the host's grade of a demoted overt road (V13:788, 1813–1820; FPI:99) and is never the new layer's class; `way` is the settlement frame's (`Way`/`WayClass`, base:1093–1104; V13:762, 803; V14's way bands and J393's way to the gate) and is minted on neither side — the request's collision question is answered the same way by all three, and the reply should say so in those words. The width hint: B's `kind: 'goat'|'drove'|'holloway'|'game'` with an integer `widthM` per row (the host's four registered hints in the map's free words); not `form` (a V13 term) and not `foot`/`cart` (V13 travel modes).

**The milestone.** **M-W2, re-declared at 9 pw**, carries ask A whole (W7 (13) "W7c Trods", `Trod`/`TrodJunction`, the `trod` layer, the trod record as the simulator feed's third optional product — not a canon slot —, the two `WorldWhere` kinds, the knowledge event kind through H9, movers through H17, the party's `SecretState`, the structural `trods` layer with its count-free sentence) and ask B (`routeFacts`' ordered stretches as a reading over `stations` and `vertexClass`); the host's bodies chain names M-W2 and its own row H32 (waits on M-W2, H5, H9, H12, H17). The request's C is met inside M-W2 by the layer's admission and the `events` layer's pin for the knowing town; a ninth lens is not a prerequisite and should wait as a later row set (D-V13.8's danger lens, where the bodies' marks belong). The staged row moves 37–45 → 38–46 (V13 §8.2, INDEX:39, SUMMARY:124) per BCR-V13-19's rule. H32 keeps its number with the hash homonym noted. The quarantine refusals stay verbatim until plague-R7; the lifecycle law is unanimous (never promoted by the map; a demoted road stays a `WorldRoute`; no trod born where a road dies; a road chartered along a trod supersedes it).

## 10. Fragment spot-check (five named per design; exact search at the stated line in the target at its md5)

| design | id | target:line | result |
|---|---|---|---|
| A | 955 (f) | V13:793 (`costTotal: number /* the undiscounted cost …`) | found once at 793 ✓ |
| A | 955 (k) | V13:866 (`roadWatch: { edge: string; …`) | found once at 866 ✓ |
| A | 955 (ab) | V13:1873 (`the DM's \`mapFeed\` keyless (V13 §3.11.6; J-V13.110).`) | found once at 1873 ✓ |
| A | 955 (bl) | V13:3906 (the H31 row) | found once at 3906 ✓ |
| A | 957 (d) | HRQ:653 (`but did not build it; the map offers no detour either. (ENC-…`) | found once at 653 ✓ |
| B | B-4 | V13:841 (`— read by the charter's \`roads\`, W8b (14)'s patrol source, …`) | found once at 841 ✓ |
| B | B-18 | V13:1875 (W7's *Output* line) | found once at 1875 ✓ |
| B | B-21 | V13:2490–2491 (two-line old text) | found once at 2490 ✓ |
| B | B-H9 | HRQ:84 (the H22 row's tail) | found once at 84 ✓ |
| B | B-I4 | INDEX:39 (`| 37–45 as one staged row …`) | found once at 39 ✓ |
| C | F5 | V13:793 (as A's 955 (f)) | found once at 793 ✓ |
| C | F10 | V13:887 (`interface WorldWhere { kind: …`) | found once at 887 ✓ |
| C | F28 | V13:2592–2593 (two-line old text, ⏎ in the quote) | found once at 2592 ✓ |
| C | F36 | V13:3428 (the patrols lens's refusals) | found once at 3428 ✓ |
| C | FH3 | HRQ:577 (the H17 row) | found once at 577 ✓ |

All 222 fragments pass the same test (§4.1); two designs' fragments overlap at the same lines (e.g. V13:793, 1873, 3906, 4028), so the synthesis must merge, not concatenate.

**Status:** LANDED 2026-10-19 01:42; judged independently; the other judges' records were not read.
