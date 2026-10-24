# Amendments w (the experience pass, J397: politics, the cover, the physical world, the surface, the base and volume 9) — the application record

> Provenance: written by Opus 5.5 under the Fable manager (docs/PROGRESS.md J392's model ruling); checked by the Fable manager at close.

The seat amendments/experience-apply applied `docs/AMENDMENTS-2026-10-24w.md` on 2026-10-24 as a coherence pass does, second of the three, after file v and on the targets as file v left them: every fragment in file
order, each quoted current text found by exact match exactly once in its target at its turn and replaced by the new text verbatim
(a ⏎ in a quote is a line break, the continuation's indentation kept). The dry run (`experience-pass/apply/apply_vwx.py dry` in the
session's scratchpad, outside the repository; the review seat's `review/dryrun_vwx.py` parser, itself the seats' `dryrun_v.py` /
`dryrun_w.py` / `dryrun_x.py` lineage of `world-growth/revise/dryrun_revise.py`) applied files v, w and x end to end over copies of
the five targets and reported "file v: 36 items (1084-1119), 64 fragments, 0 failures", "file w: 59 items (1141-1199), 114
fragments, 0 failures", "file x: 40 items (1201-1240), 91 fragments, 0 failures" and "DRY: OK". The same application was then made
to the real targets (`apply_vwx.py real`), and the results were identical byte for byte to the copies (`cmp`).
`python3 tools/bundle_architecture.py` was run after all three files and `--check` reports the bundle up to date.

**Result.** All 59 change items (1141–1199) applied, all 114 fragments matched exactly once at their turn; no item not applied. File w carries no owner-rule item (item 1083 of file v is the pass's). After all three files every new text occurs exactly once in its target. Line numbers are those on disk after all three files (v, w, x) are applied.

## Per item

| item | ruling | target | heading (file w) | applied | line(s) the new text now occupies |
|---|---|---|---|---|---|
| 1141 | J397 (M17), (M20), (M37), (M40) | `docs/volumes/V13-world.md` | Volume 13 — §1b.1 Records, fields and tables (the `PolityFacts`, `LensFacts`, `TimeDeltaReceipt` and `Disturbance` rows) | applied (4 fragments) | (a) 573; (b) 576; (c) 581; (d) 597 |
| 1142 | J397 (M1), (M7), (M11) | `docs/volumes/V13-world.md` | Volume 13 — §1b.2 Stage outputs and interfaces (the `WorldPort`, `foldLensWindow` and `foldCover` rows) | applied (3 fragments) | (a) 626; (b) 640; (c) 644 |
| 1143 | J397 (M14) | `docs/volumes/V13-world.md` | Volume 13 — §2.2 New records (`WorldRaster.swayStatus`: the scorched status) | applied (1 fragment) | 836 |
| 1144 | J397 (M5) | `docs/volumes/V13-world.md` | Volume 13 — §2.2 New records (`TravelLaw.calibration`: the basis word) | applied (1 fragment) | 996 |
| 1145 | J397 (M13), (M17), (M19), (M20) | `docs/volumes/V13-world.md` | Volume 13 — §2.2 New records (`PolityFacts.claims`: three kinds; `PolitySeat.military`: the net band; `PolityRelation.terms`: the live treaty terms; `MarchHold.segment`: the fought-over wild) | applied (4 fragments) | (a) 1000; (b) 1008; (c) 1014–1015; (d) 1020 |
| 1146 | J397 (M30), (M33) | `docs/volumes/V13-world.md` | Volume 13 — §2.2 New records (`Conflict`: the realm-scale group and the far-field diff; `preview.hostEffect`'s five words; `Decision.kind`'s draft note) | applied (5 fragments) | (a) 1090; (b) 1093; (c) 1095; (d) 1095; (e) 1097 |
| 1147 | J397 (M26), (M37) | `docs/volumes/V13-world.md` | Volume 13 — §2.2 New records (`Disturbance.kind`: an open row; `CoverPlate.demand`: the per-seat demand counts) | applied (2 fragments) | (a) 1110; (b) 1113 |
| 1148 | J397 (M25), (M26), (M37) | `docs/volumes/V13-world.md` | Volume 13 — §2.3 New rule tables (`CoverRule`: the demand banded by tier, the open recovery rows, the withdrawal rule) | applied (3 fragments) | (a) 1263; (b) 1265; (c) 1266–1267 |
| 1149 | J397 (M4), (M31) | `docs/volumes/V13-world.md` | Volume 13 — §2.3 New rule tables (`PresetRule`: the host's knob adapter and Random all's scenario rule) | applied (1 fragment) | 1275–1277 |
| 1150 | J397 (M14), (M17) | `docs/volumes/V13-world.md` | Volume 13 — §2.3 New rule tables (`PolityRule`'s table: the razed dwell reuses `march.halfLifeWeeks`; the tie-break's net band) | applied (2 fragments) | (a) 1418; (b) 1414 |
| 1151 | J397 (M25), (M26), (M37) | `docs/volumes/V13-world.md` | Volume 13 — §2.3 New rule tables (`CoverRule`'s table: the band ceilings, the open recovery rows with the example rows, the withdrawal rule) | applied (3 fragments) | (a) 1521–1522; (b) 1526; (c) 1527–1528 |
| 1152 | J397 (M4), (M31) | `docs/volumes/V13-world.md` | Volume 13 — §2.3 New rule tables (`PresetRule`'s table: the scenario option's default by rung; the `hostKnobs` and `randomAll` rows) | applied (2 fragments) | (a) 1548; (b) 1550–1552 |
| 1153 | J397 (M9), (M14), (M39) | `docs/volumes/V13-world.md` | Volume 13 — §2.4 Derived transients (`WorldFacts.polity.status`: scorched; the `CourtViewpoint` row file v asks for; the `CampaignTimeline` reading) | applied (2 fragments) | (a) 1564; (b) 1565–1567 |
| 1154 | J397 (M4), (M31) | `docs/volumes/V13-world.md` | Volume 13 — §3.1 W0 Blueprint ((1) The request: the host's regime; the scenario's default by rung) | applied (2 fragments) | (a) 1880–1882; (b) 1886–1893 |
| 1155 | J397 (M4), (M31) | `docs/volumes/V13-world.md` | Volume 13 — §3.1 W0 Blueprint ((3) The template draw: the `island` and `atoll` templates; the host's kinds; the scenario draw's default) | applied (3 fragments) | (a) 1901–1904; (b) 1910–1915; (c) 1920–1922 |
| 1156 | J397 (M4) | `docs/volumes/V13-world.md` | Volume 13 — §3.1 W0 Blueprint ((5) The requirements and the planned sites: the instant world is world-first) | applied (1 fragment) | 1952–1963 |
| 1157 | J397 (M3) | `docs/volumes/V13-world.md` | Volume 13 — §3.1 W0 Blueprint ((7) The preview is the coarse run; the report: the include run's felt sentence) | applied (1 fragment) | 2005–2007 |
| 1158 | J397 (M37) | `docs/volumes/V13-world.md` | Volume 13 — §3.6 W5 Biomes and resources ((3) Resource sites: open rows and the example fantasy rows) | applied (2 fragments) | (a) 2434; (b) 2439–2444 |
| 1159 | J397 (M1), (M25), (M26), (M37) | `docs/volumes/V13-world.md` | Volume 13 — §3.6 W5 Biomes and resources ((5) Land cover: the birth fold; the demand banded by tier; withdrawn fields dating themselves; the recovery rows open) | applied (4 fragments) | (a) 2456–2459; (b) 2466–2471; (c) 2479–2491; (d) 2492–2496 |
| 1160 | J397 (M13) | `docs/volumes/V13-world.md` | Volume 13 — §3.9 W8 Polity ((8) Neighbours: a live non-aggression term reads neutral, a live mutual-defence term respect; drawn as sworn) | applied (1 fragment) | 2795–2802 |
| 1161 | J397 (M17) | `docs/volumes/V13-world.md` | Volume 13 — §3.9 W8 Polity ((10) Military enforcement: a member's force net of the blocks it sent) | applied (1 fragment) | 2846 |
| 1162 | J397 (M15), (M19) | `docs/volumes/V13-world.md` | Volume 13 — §3.9 W8 Polity ((11) Fights over the debatable land: the fought-over wild; a withdrawal or a stand-off; `relieved` split from `lifted`) | applied (2 fragments) | (a) 2856–2867; (b) 2869–2873 |
| 1163 | J397 (M14), (M20), (M21) | `docs/volumes/V13-world.md` | Volume 13 — §3.9 W8 Polity ((12) Events: the two "contested"s; razed cells scorched for a dwell; claims of three kinds) | applied (3 fragments) | (a) 2881–2885; (b) 2888–2893; (c) 2901–2907 |
| 1164 | J397 (M18) | `docs/volumes/V13-world.md` | Volume 13 — §3.9 W8 Polity ((16) Border posts: the gate keeper) | applied (1 fragment) | 2959–2964 |
| 1165 | J397 (M16), (M22) | `docs/volumes/V13-world.md` | Volume 13 — §3.9 W8 Polity ((17) Names, provinces, reasons: the host's allegiance name (file v's ask); `whyCell` names the band change) | applied (2 fragments) | (a) 2965–2967; (b) 2970–2975 |
| 1166 | J397 (M2) | `docs/volumes/V13-world.md` | Volume 13 — §3.8 W7 Routes ((8) Genesis at world birth: over the seats as they stand) and §3.9 W8 Polity (*Edges*: a seat bound before its campaign's first window; file v's ask) | applied (2 fragments) | (a) 2650–2653; (b) 2980–2983 |
| 1167 | J397 (M4), (M38) | `docs/volumes/V13-world.md` | Volume 13 — §3.11.4 P4 — the charter (the charter as a member's site; the buried past as the frame's own request) | applied (1 fragment) | 3162–3177 |
| 1168 | J397 (M30), (M33) | `docs/volumes/V13-world.md` | Volume 13 — §3.11.5 P5 ((1) The conflict list: a draft re-derives; the preview's effect word; the list at realm scale) | applied (2 fragments) | (a) 3307–3309; (b) 3311–3325 |
| 1169 | J397 (M32) | `docs/volumes/V13-world.md` | Volume 13 — §3.11.5 P5 ((3) World-wins: the scoped water carry) | applied (1 fragment) | 3344–3358 |
| 1170 | J397 (M19) | `docs/volumes/V13-world.md` | Volume 13 — §3.11.6 The port (the map feed: `borderSegment`'s fallback, the fought-over wild) | applied (1 fragment) | 3471–3475 |
| 1171 | J397 (M32) | `docs/volumes/V13-world.md` | Volume 13 — §3.14.2 The cascade order (step 6: the three offers) | applied (1 fragment) | 3845 |
| 1172 | J397 (M4), (M30), (M32), (M33), (M37), (M40) | `docs/volumes/V13-world.md` | Volume 13 — §4.1 The edit events (`carrySurface`; `decide.forAll`; `disturb`'s open kind; `dossierUpdated.hostEffect`; the three new refusals; `W_TRAVEL_BAND_CROSSED` folded) | applied (6 fragments) | (a) 4064–4065; (b) 4080; (c) 4082; (d) 4086; (e) 4108–4111; (f) 4112–4118 |
| 1173 | J397 (M35), (M36) | `docs/volumes/V13-world.md` | Volume 13 — §4.2 The authoring tools (T2: the lake verb; the recovery preview on the campaign-time control; T10: the two time controls) | applied (3 fragments) | (a) 4142; (b) 4142; (c) 4145 |
| 1174 | J397 (M32), (M39) | `docs/volumes/V13-world.md` | Volume 13 — §4.4 Undo (the carried surface's undo pair; one history, two logs) | applied (2 fragments) | (a) 4191–4194; (b) 4199–4205 |
| 1175 | J397 (M36), (M40) | `docs/volumes/V13-world.md` | Volume 13 — §4.5 The counterfactual fork (the band crossings as one line of the diff; the weather's name) | applied (1 fragment) | 4225–4231 |
| 1176 | J397 (M5), (M13), (M14), (M16), (M18), (M19), (M20), (M21), (M22), (M26) | `docs/volumes/V13-world.md` | Volume 13 — §5.1 The world map (the `landCover`, `routes`, `sway` and `occupation, debatable, fighting` rows) | applied (4 fragments) | (a) 4280; (b) 4285; (c) 4287; (d) 4288 |
| 1177 | J397 (M34), (M39) | `docs/volumes/V13-world.md` | Volume 13 — §5.2 Zoom stops, the glyph levels and opening a settlement (the placement card's words are V09's; the campaign history view) | applied (1 fragment) | 4339–4345 |
| 1178 | J397 (M9), (M38), (M39) | `docs/volumes/V13-world.md` | Volume 13 — §6 Performance budgets (the register: `WORLD-21` the requested strata; `WORLD-22` the campaign history view) | applied (1 fragment) | 4991–4998 |
| 1179 | J397 (M4), (M5), (M13), (M21), (M25), (M26), (M30), (M40) | `docs/volumes/V13-world.md` | Volume 13 — §7 Tests and acceptance bars (the fixtures; T-V13-72's lint over open rows; T-V13-96 – T-V13-118 after T-V13-86) | applied (3 fragments) | (a) 5017–5022; (b) 5124; (c) 5138–5161 |
| 1180 | J397 (M4), (M32), (M37), (M40) | `docs/volumes/V13-world.md` | Volume 13 — §7.5 The report codes (`W_TRAVEL_BAND_CROSSED` at the commit; the three new refusals) | applied (2 fragments) | (a) 5183; (b) 5204 |
| 1181 | J397 (M26) | `docs/volumes/V13-world.md` | Volume 13 — §8.4 Risks and spikes (SP-W11: the withdrawal dating's scan) | applied (1 fragment) | 5282–5283 |
| 1182 | J397 (M3), (M29) | `docs/volumes/V13-world.md` | Volume 13 — §8.5 H24 (revised in place: the arrived caption's counterpart; the crisis served once; the depopulation events; the felt line) | applied (2 fragments) | (a) 5336; (b) 5336 |
| 1183 | J397 (M3), (M4) | `docs/volumes/V13-world.md` | Volume 13 — §8.5 H31 (revised in place: the instant world world-first; the felt line) | applied (2 fragments) | (a) 5343; (b) 5343 |
| 1184 | J397 (M3), (M33) | `docs/volumes/V13-world.md` | Volume 13 — §8.5 H32 (revised in place: the draft's dossier update re-derives with facts pinned; the effect word sent; the felt line) | applied (3 fragments) | (a) 5344; (b) 5344; (c) 5344 |
| 1185 | J397 (M13), (M17), (M20) | `docs/volumes/V13-world.md` | Volume 13 — §8.5 H45, H46 (after H44: dated pairwise facts in the claims lane and the live treaty terms; net force bands) | applied (1 fragment) | 5356–5358 |
| 1186 | J397 (M4), (M5), (M13), (M21), (M25), (M26), (M30), (M40) | `docs/volumes/V13-world.md` | Volume 13 — §9 Decisions (J-V13.166 – J-V13.189, after J-V13.153) | applied (1 fragment) | 5520–5544 |
| 1187 | experience read 04 §4 Q5 (raised in a section this file owns | `docs/volumes/V13-world.md` | Volume 13 — §9 Deferred decisions (D-V13.16 after D-V13.12) | applied (1 fragment) | 5575–5579 |
| 1188 | J397 (M32), (M37), (M38) | `docs/volumes/V13-world.md` | Volume 13 — §10 Base change requests (BCR-V13-53 – BCR-V13-55, after BCR-V13-47) | applied (1 fragment) | 6020–6049 |
| 1189 | J397 (M4), (M5), (M13), (M21), (M25), (M26), (M30), (M40) | `docs/volumes/V13-world.md` | Volume 13 — §11 Owner questions (a new ruling: politics, the cover, the physical world and the surface — the experience pass) | applied (1 fragment) | 6178–6196 |
| 1190 | J397 (M4), (M14), (M25), (M26), (M31), (M37), (M38), (M39) | `docs/volumes/V13-world.md` | Volume 13 — §12 CONFIRMED versus PLAUSIBLE (the experience pass's PLAUSIBLE cells) | applied (1 fragment) | 6228–6233 |
| 1191 | J397 (M4), (M31) | `docs/volumes/V09-application.md` | Volume 9 — §4.22 The world dialog ((1) Generated first: the host's tone chip read-only; (4) Random all at the continent rung) | applied (2 fragments) | (a) 3843–3848; (b) 3871–3875 |
| 1192 | J397 (M30), (M32), (M33) | `docs/volumes/V09-application.md` | Volume 9 — §4.22 The world dialog ((6) The conflict list: the kinds' words and the host's effect sentence; the realm-scale row; the water carry's three offers) | applied (2 fragments) | (a) 3889–3896; (b) 3898–3907 |
| 1193 | J397 (M36), (M40) | `docs/volumes/V09-application.md` | Volume 9 — §4.22 The world dialog ((8) The DM's physics toolbar: "Weather (geological years)"; the band crossings in the summary; the campaign-time control) | applied (1 fragment) | 3933–3939 |
| 1194 | J397 (M34), (M35), (M39) | `docs/volumes/V09-application.md` | Volume 9 — §4.22 The world dialog (a new (11): the placement card's words, the lake verb's three meanings, the campaign history, the lens picker's keys) | applied (1 fragment) | 3951–3974 |
| 1195 | J397 (M4), (M30), (M31), (M32), (M33), (M34), (M36), (M39) | `docs/volumes/V09-application.md` | Volume 9 — §7.1 The bars (T-V9-91 – T-V9-96, after T-V9-82) | applied (1 fragment) | 4649–4655 |
| 1196 | J397 (M4), (M30), (M31), (M32), (M33), (M34), (M35), (M36), (M39) | `docs/volumes/V09-application.md` | Volume 9 — §9 Decisions (J-V9.156 – J-V9.164, after J-V9.149) | applied (1 fragment) | 5083–5092 |
| 1197 | J397 (M38) | `docs/ARCHITECTURE.md` | The base — §2.9 (`HistoryHint`: the strata request) | applied (2 fragments) | (a) 2476–2477; (b) 2478 |
| 1198 | J397 (M38) | `docs/ARCHITECTURE.md` | The base — §4.2 S2 Programme (a known history: the age strata by the request as well as by age) | applied (1 fragment) | 6138–6142 |
| 1199 | J397 (M38) | `docs/ARCHITECTURE.md` | The base — II.7.6 Catacombs, caverns and quarries (at generation from age: whether and how large, by the request) | applied (2 fragments) | (a) 23181–23182; (b) 23188–23189 |

## The targets before and after

Before: the target as it stood before file w (after file v); after: as file w left it, which is the target as it now stands on disk (file x does not touch it).

| target | md5 before | lines before | md5 after | lines after |
|---|---|---|---|---|
| `docs/volumes/V13-world.md` | `b1662afad7e505dfd65e4b8671479c90` | 6076 | `d3428e798a11b4c0f9fbda2c0f8bbb1b` | 6340 |
| `docs/volumes/V09-application.md` | `39303070dbea7cf45a03880bc59620d7` | 5183 | `2310825954c261930b113ecb1961a3de` | 5246 |
| `docs/ARCHITECTURE.md` | `c3ce2487b9a38d49f75c28f2853c0c81` | 24512 | `68349aaa30d65762ff87f3f919f12dd7` | 24515 |

## The ids minted

As the file's head lists them ("**Ids minted:**" in `docs/AMENDMENTS-2026-10-24w.md`): items 1141–1199. Each numbered id the head names now stands in the targets:

| id | occurrences after all three files |
|---|---|
| J-V13.166 | `V13-world.md` 2 |
| J-V13.189 | `V13-world.md` 2 |
| T-V13-96 | `V13-world.md` 4 |
| T-V13-118 | `V13-world.md` 3 |
| BCR-V13-53 | `V13-world.md` 4, `ARCHITECTURE.md` 4 |
| BCR-V13-55 | `V13-world.md` 6 |
| H45 | `V13-world.md` 7 |
| H46 | `V13-world.md` 8 |
| H24 | `V13-world.md` 13, `V09-application.md` 1 |
| H31 | `V13-world.md` 19, `V09-application.md` 2, `V15-atlas.md` 4 |
| H32 | `V13-world.md` 17, `V09-application.md` 5, `ARCHITECTURE.md` 47 |
| D-V13.16 | `V13-world.md` 1 |
| WORLD-21 | `V13-world.md` 3 |
| WORLD-22 | `V13-world.md` 4 |
| WORLD-23 | `V13-world.md` 3 |
| SP-W11 | `V13-world.md` 5, `V15-atlas.md` 1 |
| J-V9.156 | `V09-application.md` 1 |
| J-V9.164 | `V09-application.md` 1 |
| T-V9-91 | `V09-application.md` 2 |
| T-V9-96 | `V09-application.md` 1 |

The ids the head leaves free (J-V13.190, J-V13.195, T-V13-119, T-V13-120, BCR-V13-56, BCR-V13-60, D-V13.17, D-V13.20, J-V9.165, J-V9.170, T-V9-97, T-V9-100, WORLD-24, SP-W12, J-V13.154, J-V13.165, T-V13-87, T-V13-95, BCR-V13-48, BCR-V13-52, D-V13.13, D-V13.15) occur nowhere in the five targets. The named fields, readers, types and refusals the head lists are those the items' new texts carry, applied verbatim above.

## The lint

The clean-room lint (`apply_vwx.py`, the preamble's token list: `SettlementForge`, `settlement-engine`, `.js`, `FPQ`, `DESIGN_`, `WY`, `EC`, `GR`, `RD`, `WC`, `ES`, `HB`, `PG`, `POP`, `TR`, `Herald`, `Chronicler`, `realistic_regional`, `dramatic_campaign`, `infoMode`, `beliefMap`, `K3`, `SP-9`, `hopDelay`, `worldPlan`, `composer`) re-run by this seat over all 114 new texts of this file as applied: **clean-room: no hit.**
