# V04 repair r1 — edits, part d: V04 §7 (tests), §8 (build plan), §9 (decisions), §10, §12, §13. Each (ids, old, new, count).
EDITS = []
def S(ids, old, new, count=1):
    EDITS.append((ids, old, new, count))

# ---- §7 intro: the hook bars by number and the take-over (VAP-02); T-V4-52's StatBarSpecs (VAP-25)
S('VAP-02',
"§13's families; every bar runs on generated output from U1 (V04 §8) and keeps the base's hook tests T11-1, T12-1, T14-1\n"
"and T63–T66 green on the same output; a bar that re-runs a base hook bar names the clause it takes over. **Parity:** no",
"§13's families; every bar runs on generated output from U1 (V04 §8) and keeps the base's hook tests T11-1, T12-1, T14-1,\n"
"T63-4, T64-1 – T64-3, T65-1 – T65-8, T66-1 – T66-4 and T66-6 green on the same output; a bar that re-runs a base hook bar\n"
"names the clause it takes over — §13.2's underground take-over row (T63-4, T109-1 – T109-6, T113-4, T113-5) by T-V4-34\n"
"(f), T-V4-43 – T-V4-58, T-V4-76 and T-V4-77, each naming its bar and clause. **Parity:** no")
S('VAP-25',
"The item-109 statistical bars (T-V4-43, T-V4-44,\n"
"T-V4-45, T-V4-49, T-V4-51, T-V4-54, T-V4-55, T-V4-58) are `StatBarSpec`s of V12 §3.6b's bar map at its levels",
"The item-109 statistical bars (T-V4-43, T-V4-44,\n"
"T-V4-45, T-V4-49, T-V4-51, T-V4-52 — the bar map's item 109 (k) (5)–(6) rows, the stagnant fill's `exactMonotone` and the\n"
"growth cap's `exactBound` —, T-V4-54, T-V4-55, T-V4-58) are `StatBarSpec`s of V12 §3.6b's bar map at its levels")

# ---- T-V4-2: the fallbacks per bank (VEW-01)
S('VEW-01',
"a moat or field outfall only where none was admitted;",
"a moat or field outfall only where none was admitted on its bank;")

# ---- T-V4-32: (b) the comfort level (VV34-02)
S('VV34-02',
"| T-V4-32 | performance | V04 §6's p95 bars on B-CITY-lite (PR tier) and at METROPOLIS (nightly) | PR, nightly |",
"| T-V4-32 | performance | (a) V04 §6's p95 bars on B-CITY-lite (PR tier) and at METROPOLIS (nightly); (b) the comfort level (g item 119; T119-2, T119-3 and T119-5's clauses on this layer, beside V12's T-V12-50): with V12 §3.15.9's wait timer (§12.10's R12-31), five seeds per wait kind at every rung's top and at the metropolis cap in both presets, a generate with its tail, a Re-derive from S7b, a migration's `upgrade` tail and every per-band export each complete within 10 000 ms p95 from the click to the complete result, every wait over one second naming its running stage within 1 000 ms and no frame of it an empty screen; the band step and switch, the `underView` switch, the tools' live previews, hover, inspect, undo and redo no slower than V04 §6's rows and the previous release (R12-34); the participants and `BuriedFormer.lay` timed inside V06's advance and replay waits (V06 §6) | PR, nightly |")

# ---- T-V4-34 (f): T63-4 on generated output (VAP-02)
S('VAP-02',
"a relocation re-derives the pieces at the new building under the same binding key | nightly |",
"a relocation re-derives the pieces at the new building under the same binding key; (f) (takes T63-4 on generated output) over 1 000 seeds of the underground hook fixture and B-DOSSIER's clandestine fixtures, a concealed institution's `underground` mode is never chosen without an underground allocation (II.7.3), and the parity presets place no concealment | nightly |")

# ---- T-V4-35: its pin is T-V4-47's (VAP-19)
S('VAP-19',
"no ruin and no cavern at any rung (g item 109 (i)'s no-op pin)",
"no ruin and no cavern at any rung (item 109 (i)'s pin is T-V4-47)")

# ---- T-V4-43 – T-V4-58: the T109 clauses each takes (VAP-02); T-V4-47's registration (VAP-19)
S('VAP-02', "| T-V4-43 | presence (V12's `presence` rule) |", "| T-V4-43 | presence (V12's `presence` rule; takes T109-3's presence clause) |")
S('VAP-02', "| T-V4-44 | structure (V12's `twoSample`) |", "| T-V4-44 | structure (V12's `twoSample`; takes T109-2's structure clause) |")
S('VAP-02', "| T-V4-45 | distinctness (V12's `paired`) |", "| T-V4-45 | distinctness (V12's `paired`; takes T109-2's distinctness clause) |")
S('VAP-02', "| T-V4-46 | dossier |", "| T-V4-46 | dossier (takes T109-2's dossier clause) |")
S('VAP-19',
"| T-V4-47 | no-op pin (g item 109 (i)) | with the ruin chance 0 and the relief, boost and fissure rows at the base's values, the output is byte-identical to the base's | PR |",
"| T-V4-47 | no-op pin (g item 109 (i); takes T109-6) | a `NoOpPin` registration of the underground goldens on V12 §3.7.8's engine (`item109.underground`): with the ruin chance 0 and the relief, boost and fissure rows at the base's values, the output is byte-identical to the base's | PR |")
S('VAP-02', "| T-V4-48 | access |", "| T-V4-48 | access (takes T109-3's dwelling and cause clause) |")
S('VAP-02', "| T-V4-49 | access (V12's `trend`) |", "| T-V4-49 | access (V12's `trend`; takes T109-3's access clause) |")
S('VAP-02', "| T-V4-50 | catacombs (500 seeds per rung) |", "| T-V4-50 | catacombs (500 seeds per rung; takes T109-4, and T109-5's sources clause) |")
S('VAP-02', "| T-V4-51 | ratchet (V12's `exactMonotone`) |", "| T-V4-51 | ratchet (V12's `exactMonotone`; takes T109-5's ratchet clause) |")
S('VAP-02 VAP-25', "| T-V4-52 | ratchet |", "| T-V4-52 | ratchet (V12's `exactBound` and `exactMonotone`; takes T109-5's cap and stagnation clauses) |")
S('VAP-02', "| T-V4-53 | overlap |", "| T-V4-53 | overlap (takes T109-3's breach clause) |")
S('VAP-02', "| T-V4-54 | depth keeps secrets (V12's `floor` on `voidSealedDeep`) |", "| T-V4-54 | depth keeps secrets (V12's `floor` on `voidSealedDeep`; takes T109-3's depth clause) |")
S('VAP-02', "| T-V4-55 | caverns (V12's `trend`, `higherWith`) |", "| T-V4-55 | caverns (V12's `trend`, `higherWith`; takes T109-1's relief and mining clause) |")
S('VAP-02', "| T-V4-56 | caverns |", "| T-V4-56 | caverns (takes T109-1's breach clause) |")
S('VAP-02', "| T-V4-57 | ruins |", "| T-V4-57 | ruins (takes T109-2's link clause) |")
S('VAP-02', "| T-V4-58 | ruins (V12's `rate` on `ruinChosen`) |", "| T-V4-58 | ruins (V12's `rate` on `ruinChosen`; takes T109-2's ranked-share clause) |")

# ---- T-V4-76: (a) at `siting`; (g) the `afterGrowth` case (VAT0-02)
S('VAT0-02',
"their households returned displaced (cause `void`) and re-housed that epoch;",
"their households returned displaced (cause `void`) and re-housed at that epoch's `siting`;")
S('VAT0-02',
"(f) the reading, its memory and the vacancies are byte-identical on the five engines | PR, nightly |",
"(f) the reading, its memory and the vacancies are byte-identical on the five engines; (g) a `Foundations.apply` collapse in `under.extend` and a host closure `under.access` reads, each ending a lived cluster's last open path after `siting`: the cluster `lost` in that participant's commit, its households re-housed inside the participant by §4.7's overflow pass and counted `households.undergroundVacated`, none in the ledger and none left for `close` (V06's T-V6-52) | PR, nightly |")

# ---- T-V4-77: the burial age's home (VV34-06), the run's chain (VAT0-19), the pin's registration (VAP-19)
S('VV34-06',
"(a) former elements exist only where the replay's former fabric is older than its burial threshold (V11's cell and factors), none younger;",
"(a) former elements exist only where the replay's former fabric is older than its factored burial age (V11 §3.25.2), none younger;")
S('VAT0-19', "each wall band on its former enceinte's chain,", "each wall band on its former enceinte run's chain,")
S('VAP-19',
"and with the replay off 0 former elements and the output byte-identical (the no-op pin);",
"and with the replay off 0 former elements and the output byte-identical (`item113.history`, the underground goldens registered on V12 §3.7.8's engine);")

# ---- T-V4-78 (a): the excavation keys (VV34-03)
S('VV34-03',
"the `underground` section's rows equal V10 §3.9a's, every word a catalogue key,",
"the `underground` section's rows equal V10 §3.9a's, every word a catalogue key — the excavation state by `info.under.sealed`, `info.under.lost` and `info.under.lostUndated`, the accessible state by V10 §3.9a's chain row —,")

# ---- T-V4-80: (j) water × the sewer (VEW-01), (k) a catacomb into a sewer (VV34-16); T-V4-81 Find on Below (G120-V04)
S('VEW-01 VV34-16 G120-V04',
"(h) UC15–UC16, (i) UC18 — gives the row's outcome; UC13 and UC17 are T-V4-75's, T-V4-17's, T-V4-48's and T-V4-76's | nightly, PR (fixtures) |\n",
"(h) UC15–UC16, (i) UC18, (j) UC19, (k) UC20 — gives the row's outcome: (j) on river-town fixtures whose kept outfalls lie on one bank (a town astride a river, a walled core in a wet moat, an island quarter), 0 sewer edges, knots, gratings, drain runs or passages over a water face, each bank's plots connected only to runs on their bank, a bank with no admitted outfall draining to its moat, to its field outfall or, with no dry boundary, by gutter and pit reported unsewered, and a two-point `drawTunnel` across the river bent at the first point's bank, the bend named; (k) on a CITY fixture whose catacomb frontier grows over epochs toward a sewer run at a shared depth, at TOWN, CITY and METROPOLIS, one `breach` link per meeting element pair in the growth's commit, cause `overlap` naming the catacomb system and the epoch, its kind from `LinkRule.kinds`, no element moved or changing system, the run's knots, profile and `serves` byte-identical, no node refused `system` by the run, a run passed at another depth linked only by U-ACCESS (b)'s or the overlap shaft's chance, and save, load, undo and redo of each such epoch byte-identical; UC13 and UC17 are T-V4-75's, T-V4-17's, T-V4-48's and T-V4-76's | nightly, PR (fixtures) |\n"
"| T-V4-81 | Find on Below (g item 120 (f), (h), (k)) | on the underground hook fixture and a METROPOLIS fixture holding sewer-front dwellings, an undercity with its tavern, fence and guild seat, an F4 concealed use, a ruin, a catacomb complex, an unexcavated cavern and a `lost` cluster: (a) each chip's Below matches equal §11.2's gazetteer match listing rows on underground parts at the view's key; (b) with Below shown at band b, every match with an element in b glows on exactly those elements and every other match — Below in another band, on Ground or on Sky — is one ghost pin at its plan anchor, the band ladder's counts equal the matches per band, and **Go there** sets `depthBand` to the match's shallowest band; with Ground shown, every Below match is a ghost pin and V09's Below count equals them; (c) an undercity district chip lifts exactly its blocks, walkways and plaza, a ground quarter chip exactly the elements of band b inside its outline; (d) at `public`, 0 suggestions, counts, glows, pins or ghost pins for any element of the unexcavated cluster, any secret access, link or `dug` gallery, or the concealed use's true kind (T-V9-66's canary placed Below); at `secret` with `showUnexcavated` off the unexcavated match is a ghost pin, with it on it glows; the `lost` cluster's match glows for every key admitting it; (e) the document hash, every record of this volume, the excavation reading and `ExcavationRecord` identical with Find on and off, and Clear restoring the band's tiles byte-identical; (f) the chips held across a band step, an `underView` change, a layer switch, an underground commit, an epoch and an undo — a match the commit makes glowing at that commit, one it removes gone; (g) a per-band PNG and SVG export draw Find as shown with the chips in the legend, a VTT scene none unless asked; (h) at the metropolis cap with Below shown, the glow within 100 ms of the click and `underFindPlaces` ≤ 2 ms p95 | PR (fixtures), nightly |\n")

# ---- §7: the owner's panel, one spec (VAP-32)
S('VAP-32',
"**The owner's panel** (§13.6 without a reference; V12 §3.9.1's `PanelSpec` V4-U5, SOLO): at U5 the owner rates, blind to\n"
"which is which, ten CITY and five METROPOLIS underground bands (historical and navigable, each mode, a ruin among them) for\n"
"legibility and plausibility, beside one render in the reference family's hatched style; an unrated panel follows §13.6 (7)\n"
"— the build continues, the milestone is *provisional — not rated*.",
"**The owner's panel** (§13.6 without a reference; V12 §3.9.1's `PanelSpec` V4-U5, its spec stated here once and cited by\n"
"V12): at U5 the owner rates, blind to which is which, SOLO 30 — ten CITY and five METROPOLIS underground bands, each seed\n"
"in the historical and the navigable mode, shuffled, a ruin among the frames, each frame holding the cathedral's crypt (or\n"
"the largest church's) and the largest catacomb complex — on `legibility` and `realism`, with one render in the reference\n"
"family's hatched style beside the set (the side-by-side of the parity paragraph above); an unrated panel follows §13.6\n"
"(7) — the build continues, the milestone is *provisional — not rated*.")

# ---- §8: U1's and U5's exits (VEW-01, VV34-16, G120-V04, VV34-02); the register's U1 row (VAL-05); the span-rule row (VV34-14)
S('VEW-01',
"T-V4-79's (a)–(f) and (y) clauses for what U1 lands; **the default presets'",
"T-V4-79's (a)–(f) and (y) clauses for what U1 lands; T-V4-80 (j); **the default presets'")
S('G120-V04 VV34-02',
"glTF and CityJSON of the underground; performance at METROPOLIS; the owner's panel |",
"glTF and CityJSON of the underground; performance at METROPOLIS with item 119's comfort-level runs (T-V4-32 (b)); Find on Below (`underFindPlaces`, item 120; at the later of U5 and the step that lands V09's Find panel); both absorbed in the range (J-V4.126, J-V4.127); the owner's panel |")
S('VV34-16 G120-V04',
"T-V4-79's remaining clauses, T-V4-80 (g)–(i);",
"T-V4-79's remaining clauses, T-V4-80 (g)–(i) and (k), T-V4-81;")
S('VAL-05',
"| U3b | `under.openings`, `under.dig` (58a) — U-ACCESS reads them | `coverM` and `planReachM` by V12's lines for them; V11's cells by V12's `under.openings` and `under.dig` lines (`sealedFloor` by its own) |",
"| U3b | `under.openings`, `under.dig` (58a) — U-ACCESS reads them; and the base cell `accessForecastMin` of `under.rule` (57; II.7.4's `UndergroundRule`), whose reader, P7, lands here | `coverM` and `planReachM` by V12's lines for them; V11's cells by V12's `under.openings` and `under.dig` lines (`sealedFloor` by its own); `accessForecastMin`, owner `base`, by V12 §3.11's \"V04's other item-109 cells\" line |")
S('VAL-05',
"| U1 | `under.layout` (58), every column — U-FORECAST's `forecastSafety` (item 551) reads it | the default line; `voidDwellings`, `accessForecastMin`, `links.overlapShaftM` and `links.overlapShaftChance` by V12 §3.11's \"V04's other item-109 cells\" line, which is the default line's entry itself (one entry each) |",
"| U1 | `under.layout` (58), every column — S14's access symbols (its `openings` rows, N11's gratings) read it; and the base cell `forecastSafety` of `under.rule` (57; II.7.4's `UndergroundRule`, item 551), whose reader U-FORECAST lands here | `under.layout`: the default line; `voidDwellings`, `links.overlapShaftM` and `links.overlapShaftChance` by V12 §3.11's \"V04's other item-109 cells\" line, which is the default line's entry itself (one entry each); `forecastSafety`, owner `base`, by the default line |")
S('VV34-14',
"the cells `raisedWays.structure.span.*` (row 80, V11 §3.24.2's name map; their values in §2.7, item 244)",
"the cells `raisedWays.structure.span.*` (row 80; the rule at §2.7, item 244; their values in V11 §3.24.2)")

# ---- §9: J-V4.7 and J-V4.125 amended; J-V4.118, J-V4.122, J-V4.124 cite their homes; J-V4.126 – J-V4.129
S('VEW-01',
"| J-V4.7 | chose outfalls from S1's drainage outlets,",
"| J-V4.7 | *Amended by J-V4.129.* Chose outfalls from S1's drainage outlets,")
S('VV34-14',
"(the cells `raisedWays.structure.span.*`, their values in §2.7)",
"(the cells `raisedWays.structure.span.*`; the rule at §2.7, item 244; their values in V11 §3.24.2)")
S('VV34-06',
"× the site's burial-speed factor from V11's `history.burialYears`,",
"× the burial-speed factor `burialYears ÷ T`, `T` the fabric's factored burial age (V11 §3.25.2),")
S('VEW-01 VV34-16',
"a locked vault held against every generator with E_LOCKED; every system clipped at its margin ring —",
"a locked vault held against every generator with E_LOCKED; every system clipped at its margin ring; a sewer never crossing water, each bank draining on its own (J-V4.129); a catacomb meeting a sewer at a shared depth opened into it by one typed opening per meeting element pair, its course never bent and never a merge —")
S('VAT0-02',
"| J-V4.125 | chose V06 §6.2's per-epoch sums",
"| J-V4.125 | *Amended by J-V4.128.* Chose V06 §6.2's per-epoch sums")
S('VV34-02 G120-V04 VAT0-02 VEW-01',
"over budgets of this volume's own or a separate channel, because V06's century bound reads these rows and its ledger re-houses by cause in the same epoch |\n",
"over budgets of this volume's own or a separate channel, because V06's century bound reads these rows and its ledger re-houses by cause in the same epoch |\n"
"| J-V4.126 | chose, for g item 119's part in this volume (J130), to keep §12's underground rows and every row of V04 §6 as the targets and to read the ten-second comfort level for each one-time wait the layer adds to — a generate, regenerate, Re-derive or SettlementForge open with its tail, a migration's upgrade tail, every per-band export — with §12.1's progress named per tail stage (each a `StageDecl` posting §11.2's `Progress`), the interactive rows (the band step and switch, the `underView` switch, the tools' live previews, hover, inspect, undo, redo) unchanged, the epoch participants and `BuriedFormer.lay` counted inside V06's advance and replay waits as V06 §6 reads the level for them, and no quality spend, over a ceiling of this volume's own or per-stage seconds, because the tail's targets (≤ 343 ms p95 at METROPOLIS, navigable) already sit far inside ten seconds, a slower step is admitted only for a recorded measured gain (R12-33), and the owner keeps moment-to-moment feedback fast (item 119 (d)); absorbed in U5's range |\n"
"| J-V4.127 | chose, for g item 120's part Below (J133), one derived reading, `underFindPlaces`, giving each matched underground entity's part, depth bands, glow shapes and plan anchor, with the drawn band the one that glows — a match Below in another band a ghost pin carrying its band, **Go there** setting `depthBand` —, an area chip lifting the underground under its plan outline, and an unexcavated match at `secret` glowing only while its cluster is drawn, over glowing every band at once, a match rule of this volume's own or areas stopping at the ground, because one band is drawn at a time (§8.4) and a glow beneath it would read as the drawn band's, the owner's \"even if you're going through different layers\" is kept by the ghost pins and the band counts, an area is a plan region whose underside a user asks after (\"what lies under the old quarter\"), the matches must be §11.2's one listing so every count agrees, and a glow on a cluster not drawn would show the sealed void the view key hides; absorbed in U5's range |\n"
"| J-V4.128 | chose to route a lost void's households by when the void is lost — at the `decline` step (`under.fade`) to V06's ledger as displaced, cause `void`, re-housed at `siting`; in an `afterGrowth` participant's commit (`under.extend`'s foundation or arch-vault collapse, `under.access`, `under.undercity`) re-housed inside that participant by §4.7's overflow pass, counted `households.undergroundVacated` — over one ledger route for both, because the `afterGrowth` participants run after `siting`, so a ledger entry made there would reach only `close`'s last rung, while V06 re-houses every other underground vacancy of those participants inside them (V06 §3.18.1 (4), (6)) |\n"
"| J-V4.129 | chose that no sewer lies over water — a `Bridge`'s deck span whatever its way's class, the `bridge`, `pier`, `ford` and `aqueduct` classes and every spine stretch over a water face left out of the `SewerGraph`, N8's connections and drain runs and N9's passages kept on their bank — with the graph's water-divided components as banks, N2's moat and field fallbacks taken per bank, the outfall cap keeping each bank's largest root and a bank with no dry boundary draining by gutter and pit, reported, and a drawn run that would cross bent at the bank (item 101 R2), over routing one bank's flow across a bridge to the other bank's outfall, because a sewer is cut-and-cover, never mined (`NetworkRule`'s cover rows), so a main under a flowing river or a wet moat is a silent wrong result, while a medieval town discharged each bank into the water at its own edge or into its own ditch; a town no water divides is one bank |\n")

# ---- §10: the bars' range (G120-V04)
S('G120-V04', "| BCR-V4-15 | the bars T-V4-1 – T-V4-80 | item 484 |", "| BCR-V4-15 | the bars T-V4-1 – T-V4-81 | item 484 |")

# ---- §12: what was read; the base cells' home (VAL-05); three plausible readings (VEW-01, VV34-02, G120-V04)
S('VV34-02 G120-V04',
"  request of V04 §10 is an f item that text carries; file g's items 102–113 are read whole in\n"
"  `docs/AMENDMENTS-2026-09-28g.md`, item 113's underground parts written here.",
"  request of V04 §10 is an f item that text carries; file g's items 102–120 are read whole in\n"
"  `docs/AMENDMENTS-2026-09-28g.md`, the underground parts of items 113, 119 and 120 written here.")
S('VAT0-19 VV34-03 VV34-06 VV34-02',
"  V06 §3.18, V06 §3.19, V06 §6.2; V07 §3.12, V07 §3.16; V08 §2.6a, V08 §3.6; V09 §4.17; V10 §3.9, V10 §3.9a; V11 §3.23, V11 §3.24; V12 §3.6b, V12 §3.7.8,",
"  V06 §3.18, V06 §3.19, V06 §3.20.5, V06 §6.2; V07 §3.12, V07 §3.16; V08 §2.6a, V08 §3.6; V09 §4.9, V09 §4.17; V10 §3.9, V10 §3.9a; V11 §3.23, V11 §3.24, V11 §3.25.2, V11 §3.25.8; V12 §2.13, V12 §3.6b, V12 §3.7.8,")
S('VAL-05',
"  `ceilingClearCm` and `moundShare`, the `archDoor` row, the buried former settlement's `former*` parameters, `forecastSafety`,\n"
"  `crowdCap`, `voidDwellings`, `accessForecastMin`, `freeboardCm`, `hallDryCm`, the opening sizes, and V11's rows this\n"
"  volume reads. The historical anchors (the culverted brooks of London, the fourteenth-century vaulted sewer of Paris, the\n"
"  quarries and ossuaries under Paris, the great catacombs under cemeteries outside the walls, the rise of a Roman street\n"
"  under a medieval town) are orders of magnitude, not measurements.",
"  `ceilingClearCm` and `moundShare`, the `archDoor` row, the buried former settlement's `former*` parameters, `crowdCap`,\n"
"  `voidDwellings`, II.7.4's `forecastSafety` and `accessForecastMin`, `freeboardCm`, `hallDryCm`, the opening sizes, and\n"
"  V11's rows this volume reads. The historical anchors (the culverted brooks of London, the fourteenth-century vaulted\n"
"  sewer of Paris, the quarries and ossuaries under Paris, the great catacombs under cemeteries outside the walls, the rise\n"
"  of a Roman street under a medieval town) are orders of magnitude, not measurements.")
S('VEW-01 VV34-02 G120-V04',
"* That the dungeon-map figure-ground, the ruin program and the plan lines after the light are legible enough (the owner's\n"
"  panel decides).",
"* That the dungeon-map figure-ground, the ruin program and the plan lines after the light are legible enough (the owner's\n"
"  panel decides).\n"
"* That each bank of a water-divided town finds an admitted outfall on its own bank often enough that the per-bank rule\n"
"  leaves little area unsewered (T-V4-80 (j) bars the rule, not the share); that the underground's one-time waits stay far\n"
"  inside the comfort level at the metropolis cap (T-V4-32 (b) measures them); that a ghost pin carrying its band is what\n"
"  the owner's \"across layers\" asks of Find Below (J-V4.127, vetoable).")

# ---- §13: the sibling units' parts (VAT0-02, VAL-05, VAL-08, VAL-09, VAP-19, VAP-25, VAP-32, VV34-03, VV34-06, G120-V04)
S('VAT0-02 VV34-02',
"| V06 | the four participants' calls (V04 §3.10), their scopes and `opts`; the replay calling `BuriedFormer.lay` at a burial epoch while `@plat/under` is registered, clearing the former fabric's surface records in that batch and writing `HistoryRecord.buried`; its ledger re-housing a lost void's households (cause `void`) |",
"| V06 | the four participants' calls (V04 §3.10), their scopes and `opts`; the replay calling `BuriedFormer.lay` at a burial epoch while `@plat/under` is registered, clearing the former fabric's surface records in that batch and writing `HistoryRecord.buried`; the households of a void lost at the `decline` step re-housed through its ledger (cause `void`), and those of one lost in an `afterGrowth` participant's commit re-housed inside that participant by §4.7's overflow pass, counted `households.undergroundVacated` (V04 §3.5.7 (g) (5)); item 119's comfort level for advance time and the replay, the participants' time inside them |")
S('VAL-09 VAL-08',
"| V07 | the maintenance mode and the village rows (item 565); V07 §1 (5) and V07 §3.16 (1) citing the span rule's `country` reason (§2.7; J-C4) |",
"| V07 | the maintenance mode and the village rows (item 565); the span rule's `country` reason (§2.7; J-C4) cited by V07 §1 (5) and V07 §3.16 (1); V07 §3.16 (1)'s village subset as V04 §3.1 names it, the catacomb step for a dossier record's charnel vault included; `UnderOpeningRow` in V07 §1b (W46) and V07 §3.16 (3) (iii) |")
S('VV34-03 G120-V04',
"| V09 | the `showUnexcavated` and active-layer controls; the lost void's panel line; the catalogue keys `info.under.*`, `info.catacomb.*` of V04 §4.5, `info.under.excavation.lost` and `info.under.none` among them |",
"| V09 | the `showUnexcavated` and active-layer controls; the lost void's panel line; the catalogue keys `info.under.*`, `info.catacomb.*` of V04 §4.5 — `info.under.sealed`, `info.under.lost`, `info.under.lostUndated` and `info.under.none` among them; the Find panel and its `live.find` provider calling `underFindPlaces` (V04 §5.1) |")
S('VV34-06 VAL-08 VV34-02',
"| V11 | the underground's content rows (V11 §3.23), the stepped-shrine heights row, the span cells, the `ruin` naming slice, `history.burialYears` with its factors (read by V04 §3.5.5 (b)) |",
"| V11 | the underground's content rows (V11 §3.23), the stepped-shrine heights row, the span cells, the `ruin` naming slice, `history.burialYears` with its factors and the factored burial age `T` (V11 §3.25.2, read by V04 §3.5.5 (b)); registry row 58a and V11 §3.23.7 naming `UnderOpeningRow`; the `perf.qualitySpend` rows (V11 §3.25.8) |")
S('VAP-19 VAP-25 VAP-32 VAL-05',
"| V12 | the bar specs of V04 §7's item-109 bars (V12 §3.6b), the no-op pin engine (V12 §3.7.8), the V4-U5 panel spec, the register lines of V04 §8 |",
"| V12 | the bar specs of V04 §7's item-109 bars, T-V4-52's two rows among them (V12 §3.6b); the no-op pin engine (V12 §3.7.8) with the underground goldens on `item109.underground` and `item113.history` (V12 §2.13); the V4-U5 row citing V04 §7's panel spec, its extras the hatched-style render (V12 §3.9.1); the register lines of V04 §8, `accessForecastMin` named as `under.rule`'s cell; T-V12-50's timer over the underground's waits |\n"
"| the base | II.7.4's `UndergroundRule` writing `accessForecastMin`'s default (0.5) beside `forecastSafety`'s; II.7.6's `AccessPassStrategy` reading `openings: UnderOpeningRow[]`; §13.2's underground take-over row and *The underground layer built* line running to T-V4-81 |")
