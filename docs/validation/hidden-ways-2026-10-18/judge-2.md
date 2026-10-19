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
