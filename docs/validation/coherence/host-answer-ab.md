# Amendments ab (the host's answer adopted, J400) — the application record

> Provenance: written by Opus 5.5 under the J375 addendum (docs/PROGRESS.md J400); PENDING FABLE REVIEW.

The seat amendments/host-answer-apply applied `docs/AMENDMENTS-2026-10-24ab.md` on 2026-10-24 as a coherence pass does, third of the three, after files z and aa, once the manager released the three files (the review `docs/volumes/critique/host-answer-z-aa-ab.md`, 0 blockers, 8 majors, 17 minors, answered): every fragment in file order, each quoted current text found by exact match exactly once in its target at its turn and replaced by the new text verbatim (a ⏎ in a quote is a line break, the continuation's indentation kept). The dry run (`experience-pass/apply-host/apply_host.py dry` in the session's scratchpad, outside the repository; seat ab's `experience-pass/ab/dryrun_ab.py` parser, itself the `review/dryrun_vwx.py` and `z-revise/dryrun_zr.py` lineage, with the heading per item of `apply/apply_vwx.py`) applied files z, aa and ab end to end over copies of the eight targets (V13, V09, the base, V15, V14, INDEX, SUMMARY, the owner brief) and reported "file z: 41 items (1257-1297), 41 change items, 109 fragments, 0 failures", "file aa: 5 items (1301-1305), 5 change items, 5 fragments, 0 failures", "file ab: 52 items (1307-1358), 52 change items, 147 fragments, 0 failures" and "DRY: OK"; its copies were identical byte for byte to those of the manager's own dry run with `dryrun_ab.py` (`cmp`). The same application was then made to the real targets (`apply_host.py real`), and the results were identical byte for byte to the dry run's copies (`cmp`). `python3 tools/bundle_architecture.py` was run after all three files and `--check` reports the bundle up to date.

**Result.** All 52 change items (1307–1358) applied, all 147 fragments matched exactly once at their turn and every new text exactly once after its own replacement; no item not applied. The owner-rule item 1306 (the owner's words and the rulings, ahead of the change items) carries no current text and is not a change item. After all three files every new text of this file occurs exactly once in its target. Line numbers are those on disk after all three files (z, aa, ab) are applied.

## Per item

| item | ruling | target | heading (file ab) | applied | line(s) the new text now occupies |
|---|---|---|---|---|---|
| 1307 | J400 (2), (6), (7), (9), (14), (18), (21); J399 (R1); the review's HA-04 | `docs/volumes/V13-world.md` | Volume 13 — §1b Wiring table (the sway's consumers, `PolityFacts`, `PastFacts`, `WorldPort`, `setSwayLock`) | applied (7 fragments) | (a) 592; (b) 601; (c) 601–602; (d) 657; (e) 657; (f) 704; (g) 657 |
| 1308 | J400 (4), (5), (10) | `docs/volumes/V13-world.md` | Volume 13 — §2.2 New records (`AdvanceWindow`'s key; `HostRegime.deitySeated`; `LensFacts.courts` held) | applied (3 fragments) | (a) 1033; (b) 1085; (c) 1093 |
| 1309 | J400 (2), (6), (14) | `docs/volumes/V13-world.md` | Volume 13 — §2.2 New records (`PolityFacts`: the walk in, the host's name out; the past references on links, relations and terms) | applied (3 fragments) | (a) 1039; (b) 1048; (c) 1050 |
| 1310 | J400 (14), (21) | `docs/volumes/V13-world.md` | Volume 13 — §2.2 New records (the realm's past: `PastRef`, `PastFact`, `PastFacts`, before `TimeDeltaReceipt`) | applied (1 fragment) | 1064–1067 |
| 1311 | J400 (18), (21); the review's HA-11 | `docs/volumes/V13-world.md` | Volume 13 — §2.6 The lifecycle of every state field (`PatrolCadence`'s readers; `PastFacts`) and §2.4 Derived transients (`CampaignTimeline.past`) | applied (3 fragments) | (a) 1689; (b) 1709–1710; (c) 1607 |
| 1312 | J400 (8) | `docs/volumes/V13-world.md` | Volume 13 — §2.7 The version table (every world-generation output version served for life to a host composition) | applied (1 fragment) | 1720 |
| 1313 | J400 (7) | `docs/volumes/V13-world.md` | Volume 13 — §3.8 W7 Routes ((8) genesis at world birth: the roads presentation only until the host's mount lands) | applied (1 fragment) | 2740 |
| 1314 | J400 (6), (13), (17); the review's HA-03, HA-16 | `docs/volumes/V13-world.md` | Volume 13 — §3.9 W8 Polity ((9) the host's membership walk; (10) the four strength quantities; (11) the raid's word and its raider) | applied (4 fragments) | (a) 2901; (b) 2938–2942; (c) 2958; (d) 2961 |
| 1315 | J400 (12), (18) | `docs/volumes/V13-world.md` | Volume 13 — §3.9 W8 Polity ((13) no host reader of the sway; (14) patrols closed in the host; (16) the gate keeper without a soak) | applied (3 fragments) | (a) 3014; (b) 3034–3042; (c) 3054–3057 |
| 1316 | J400 (2) | `docs/volumes/V13-world.md` | Volume 13 — §3.9 W8 Polity ((17) names: the DM's christening, else the descriptive label) | applied (1 fragment) | 3059–3061 |
| 1317 | J400 (7), (12), (18) | `docs/volumes/V13-world.md` | Volume 13 — §3.11.6 The port (the consumption law; the birth canon as the host takes it; the two feeds; the patrol offer retired; no host reader of the map feed) | applied (6 fragments) | (a) 3477; (b) 3486; (c) 3488; (d) 3539–3542; (e) 3556–3557; (f) 3561 |
| 1318 | J400 (5), (7), (21); the review's HA-12 | `docs/volumes/V13-world.md` | Volume 13 — §3.11.6 The port (recorded inputs: the window key; `pastWindow`; `canonized` revoked) | applied (3 fragments) | (a) 3608–3609; (b) 3645–3654; (c) 3657–3665 |
| 1319 | J400 (9) (the wording), (10) | `docs/volumes/V13-world.md` | Volume 13 — §3.11.6 The port (presentation inputs: a court's believed facts held) | applied (2 fragments) | (a) 3705; (b) 3695–3696 |
| 1320 | J400 (9) (the wording), (12), (18), (20), (21); the review's HA-13, HA-24 | `docs/volumes/V13-world.md` | Volume 13 — §3.11.6 The port's laws ((3) without the patrol offer; (9) host patrol and patrol cadence, the realm's past and an earlier campaign; (10) no host reader until the host admits one; (11) the past never on the world clock; (12) a port value inside a host roll is frozen) | applied (5 fragments) | (a) 3749; (b) 3775; (c) 3777–3784; (d) 3784; (e) 3747 |
| 1321 | J400 (18) | `docs/volumes/V13-world.md` | Volume 13 — §4.1 The edit events (`setSwayLock`'s note: no patrol offer) | applied (1 fragment) | 4229 |
| 1322 | J400 (2), (12), (14) | `docs/volumes/V13-world.md` | Volume 13 — §5.1 The world map: layers (the `routes` hover without a soak; the `sway` legend's label and the past's pacts) | applied (3 fragments) | (a) 4451; (b) 4453; (c) 4453 |
| 1323 | J400 (18), (21) | `docs/volumes/V13-world.md` | Volume 13 — §5.1 The world map: layers (the `patrols` row's legend and the host's patrols; the `events` row's realm's past) | applied (3 fragments) | (a) 4455; (b) 4456; (c) 4473 |
| 1324 | J400 (21); the review's HA-08, HA-11 | `docs/volumes/V13-world.md` | Volume 13 — §5.2 Zoom stops and opening a settlement (the campaign history view's realm's past) | applied (1 fragment) | 4517 |
| 1325 | J400 (12), (18), (21); the review's HA-08 (b) | `docs/volumes/V13-world.md` | Volume 13 — §5.8 The lens mechanism ((4) (d) the owner-ruled derivations reach no host reader; (8) the scrub's realm's past; (7) the observer's seat) | applied (3 fragments) | (a) 4671; (b) 4769–4778; (c) 4708 |
| 1326 | J400 (2), (10), (18) | `docs/volumes/V13-world.md` | Volume 13 — §5.9 The lenses ((2) Sway: the label; the court viewpoint held) | applied (3 fragments) | (a) 4877–4879; (b) 4880; (c) 4886 |
| 1327 | J400 (4), (16), (18); the review's HA-19, HA-24 | `docs/volumes/V13-world.md` | Volume 13 — §5.9 The lenses ((3) Patrols closed in the host; (5) Populations: the crisis served twice confirmed; (6) Religion: the deity an offer) | applied (5 fragments) | (a) 4915–4921; (b) 4928–4929; (c) 4931; (d) 4989; (e) 5009–5012 |
| 1328 | J400 (2), (4), (10), (12), (17), (18), (21); J399 (R1); the review's HA-04, HA-19 | `docs/volumes/V13-world.md` | Volume 13 — §7 Tests (the rows the answer revises: T-V13-42, T-V13-77, T-V13-80, T-V13-83, T-V13-84, T-V13-100, T-V13-103; T-V13-7 of §7.3) | applied (9 fragments) | (a) 5332; (b) 5360; (c) 5363; (d) 5363; (e) 5366; (f) 5367; (g) 5374; (h) 5377; (i) 5303 |
| 1329 | J400 (2), (4)–(8), (12), (14), (18), (20), (21); the review's HA-03, HA-05, HA-08, HA-12, HA-19, HA-25 | `docs/volumes/V13-world.md` | Volume 13 — §7.4 Tests (T-V13-129 – T-V13-139 after T-V13-127) | applied (1 fragment) | 5401–5412 |
| 1330 | J400 (8), (21) | `docs/volumes/V13-world.md` | Volume 13 — §7.5 The report codes (the two refusals) | applied (1 fragment) | 5456 |
| 1331 | J400 (18), (21) | `docs/volumes/V13-world.md` | Volume 13 — §8.2 Milestones (M-W2 without the patrol offer; M-W5 with the realm's past) | applied (2 fragments) | (a) 5485; (b) 5487 |
| 1332 | J400 (22) | `docs/volumes/V13-world.md` | Volume 13 — §8.5 The host's parallel track (the preamble: accepted by the host, not scheduled) | applied (1 fragment) | 5540 |
| 1333 | J400 (5), (6), (7), (11), (12), (14), (18), (19); the review's HA-03, HA-25 | `docs/volumes/V13-world.md` | Volume 13 — §8.5 The host's parallel track (H9, H12, H13, H16: the windows on their units; the genesis mount; the walk and the past references; no reader of the map feed and no patrol coverage) | applied (4 fragments) | (a) 5573; (b) 5576; (c) 5577; (d) 5580 |
| 1334 | J400 (5), (7), (16), (17), (18) | `docs/volumes/V13-world.md` | Volume 13 — §8.5 The host's parallel track (H22, H23, H24, H25: the spatial canon; the lens rows through the projection; the plague and population units; the raid's word and patrols closed) | applied (7 fragments) | (a) 5586; (b) 5587; (c) 5587; (d) 5588; (e) 5588; (f) 5589; (g) 5589 |
| 1335 | J400 (8), (16), (19) | `docs/volumes/V13-world.md` | Volume 13 — §8.5 The host's parallel track (H31, H32, H33, H34: the version promise; H32 accepted; the sea lanes; the readings and the stamps) | applied (5 fragments) | (a) 5595; (b) 5596; (c) 5597; (d) 5598; (e) 5598 |
| 1336 | J400 (1), (2), (3), (4), (5), (7); the review's HA-18 | `docs/volumes/V13-world.md` | Volume 13 — §8.5 The host's parallel track (H36 rewritten in place; H37 and H38 gain the host's units and its grace rule) | applied (4 fragments) | (a) 5600; (b) 5601; (c) 5602; (d) 5602 |
| 1337 | J400 (10), (11), (12), (13), (14), (15) | `docs/volumes/V13-world.md` | Volume 13 — §8.5 The host's parallel track (H40–H46: the court half held; the docket units; no reader; the register's row; the past pact; net force's slot) | applied (8 fragments) | (a) 5604; (b) 5604; (c) 5605; (d) 5606; (e) 5607; (f) 5608; (g) 5609; (h) 5610 |
| 1338 | J400 (14), (21) | `docs/volumes/V13-world.md` | Volume 13 — §8.5 The host's parallel track (H48 after H47: the realm's past) | applied (1 fragment) | 5611–5612 |
| 1339 | J400 (2), (12), (18) | `docs/volumes/V13-world.md` | Volume 13 — §9 Decisions (the rows the host's answer supersedes, each kept as the record of its choice with a note) | applied (5 fragments) | (a) 5687; (b) 5717; (c) 5768; (d) 5769; (e) 5782 |
| 1340 | J400 (1), (2), (4)–(8), (10), (12), (14), (17), (18), (20), (21); the review's HA-05, HA-12 | `docs/volumes/V13-world.md` | Volume 13 — §9 Decisions (J-V13.201 – J-V13.214 after J-V13.199) | applied (1 fragment) | 5808–5822 |
| 1341 | J400 (7), (8), (18), (21); the review's HA-05, HA-12, HA-23 | `docs/volumes/V13-world.md` | Volume 13 — §10 Base change requests (BCR-V13-58, BCR-V13-59 after BCR-V13-57) | applied (1 fragment) | 6356–6377 |
| 1342 | J400 (1)–(8), (10)–(22) | `docs/volumes/V13-world.md` | Volume 13 — §11 Owner questions (the experience pass's ruled paragraph corrected; who keeps a gate; the host's answer adopted) | applied (4 fragments) | (a) 6503; (b) 6505–6507; (c) 6473–6476; (d) 6554–6577 |
| 1343 | J400 (10), (21); the review's HA-07, HA-08 (a) | `docs/volumes/V15-atlas.md` | Volume 15 — §3.6 A6 — The relational view ((6) a court's map held by the host; an old map's figures from the realm's past), with §0 In plain words and §3.11's worked example (step 7) | applied (4 fragments) | (a) 1391; (b) 1398; (c) 164; (d) 1588 |
| 1344 | J400 (10), (21); the review's HA-08 (a) | `docs/volumes/V15-atlas.md` | Volume 15 — §7.4 Tests (T-V15-38 after T-V15-37) | applied (1 fragment) | 2060–2061 |
| 1345 | J400 (10), (21) | `docs/volumes/V15-atlas.md` | Volume 15 — §9 Decisions (J-V15.52 after J-V15.51) | applied (1 fragment) | 2219–2220 |
| 1346 | J400 (18) | `docs/volumes/V14-sites.md` | Volume 14 — §3.13 E4 — The transient layer (the crop's patrol is the map's cadence; a host patrol beside it) | applied (2 fragments) | (a) 2119–2123; (b) 2124–2125 |
| 1347 | J400 (18) | `docs/volumes/V14-sites.md` | Volume 14 — §7 Tests (T-V14-37 after T-V14-36) | applied (1 fragment) | 2910–2911 |
| 1348 | J400 (18) | `docs/volumes/V14-sites.md` | Volume 14 — §9 Decisions (J-V14.60 after J-V14.59) | applied (1 fragment) | 3061–3062 |
| 1349 | J400 (10), (14), (18), (21); the review's HA-07 (c) | `docs/volumes/V09-application.md` | Volume 9 — §4.22 The world dialog ((11): the realm's past, the patrols' legend, a past pact) | applied (2 fragments) | (a) 3981–3990; (b) 3991 |
| 1350 | J400 (10), (21); the review's HA-07 (c) | `docs/volumes/V09-application.md` | Volume 9 — §7.1 The bars (T-V9-99 after T-V9-98) | applied (2 fragments) | (a) 4717–4718; (b) 4715 |
| 1351 | J400 (21) | `docs/volumes/V09-application.md` | Volume 9 — §9 Decisions (J-V9.170 after J-V9.168) | applied (1 fragment) | 5159–5160 |
| 1352 | J400 (8); BCR-V13-58 (item 1341); V13 §2.7 (item 1312); the review's HA-05, HA-23 | `docs/ARCHITECTURE.md` | The base — §6.4 Permalinks, version axes, retention and goldens (*Retention of old output versions*: a host composition; the version archive) and §7.1's outcome table (`refuse.world.outputVersion`) | applied (2 fragments) | (a) 10903; (b) 11456 |
| 1353 | J400 (22); BCR-V13-58, BCR-V13-59 (item 1341) | `docs/volumes/INDEX.md` | INDEX — §1 (the counts: the host's answer) | applied (1 fragment) | 50 |
| 1354 | J400 (22); the owner-facing record; the review's HA-14 | `docs/volumes/INDEX.md` | INDEX — §6 Owner questions with recommendations (the preamble: the host's answer) | applied (2 fragments) | (a) 202; (b) 202 |
| 1355 | J400 (22) | `docs/volumes/INDEX.md` | INDEX — §6 (the V13 Q2 row: H1–H48, accepted by the host) | applied (1 fragment) | 232 |
| 1356 | J400 (2), (4), (10), (18), (22); the owner-facing record; the review's HA-06 (b) | `docs/volumes/SUMMARY.md` | SUMMARY — "Decisions that are yours" (the experience bullet corrected) | applied (4 fragments) | (a) 251–252; (b) 254; (c) 258–260; (d) 256–257 |
| 1357 | J400 (1)–(8), (9) (the campaigns bullet), (10)–(22); the owner-facing record; the review's HA-20 | `docs/volumes/SUMMARY.md` | SUMMARY — "Decisions that are yours" (SettlementForge's answer: a new bullet) | applied (1 fragment) | 268–283 |
| 1358 | J400 (7), (12), (21), (22); the review's HA-06 (a), HA-14 | `docs/OWNER-BRIEF-WORLD-SITES-HYDROLOGY-DRAFT-2026-10-16.md` | The brief — §9 Order and timing (the host's track row: accepted, not scheduled; H48), with §6 Part C's settled rulings (who keeps a gate; the canon at the first advance) | applied (5 fragments) | (a) 203; (b) 203; (c) 203; (d) 110–111; (e) 104–106 |

## The targets before and after

Before: the target as it stood before file ab; after: as file ab left it — the target as it now stands on disk.

| target | md5 before | lines before | md5 after | lines after | md5 on disk now | lines now |
|---|---|---|---|---|---|---|
| `docs/volumes/V13-world.md` | `20cdb0810f0382259f88b3d7d54b85f0` | 6602 | `b54b50e59830bda0bde81238bbe720de` | 6721 | `b54b50e59830bda0bde81238bbe720de` | 6721 |
| `docs/volumes/V09-application.md` | `7c11bd14dffef3c4b057a93b612fcda1` | 5304 | `2dbbdcf37da61be4b8a1526d8b44d0e2` | 5314 | `2dbbdcf37da61be4b8a1526d8b44d0e2` | 5314 |
| `docs/ARCHITECTURE.md` | `0eebb1f9736bda9432bab89e5b9d21a8` | 24517 | `d4441f31d5a3c8655db261314bf19fa4` | 24517 | `d4441f31d5a3c8655db261314bf19fa4` | 24517 |
| `docs/volumes/V15-atlas.md` | `a35e0135e0e0da5fe9c3af84995abd85` | 2512 | `5f0cc2a6e2f7f260cadeea30ec6a9d86` | 2514 | `5f0cc2a6e2f7f260cadeea30ec6a9d86` | 2514 |
| `docs/volumes/V14-sites.md` | `f764ca987c67897355c2328781db0a97` | 3264 | `3e86ff41423de69f67f34dea20865ccf` | 3268 | `3e86ff41423de69f67f34dea20865ccf` | 3268 |
| `docs/volumes/INDEX.md` | `afba3c29f4f009b4ced58f3d504181cc` | 274 | `87626775894c6b9f0676cc7101850dfa` | 274 | `87626775894c6b9f0676cc7101850dfa` | 274 |
| `docs/volumes/SUMMARY.md` | `3ad7a21f0479e42baf606c58cfb7dae3` | 280 | `4308951265a63d4209bc5f232288fbd0` | 295 | `4308951265a63d4209bc5f232288fbd0` | 295 |
| `docs/OWNER-BRIEF-WORLD-SITES-HYDROLOGY-DRAFT-2026-10-16.md` | `7093ae89e3783e5dc36386faac397982` | 211 | `44f4a5b908bc95a1ab1bbb9cc573765b` | 211 | `44f4a5b908bc95a1ab1bbb9cc573765b` | 211 |

## The ids minted

As the file's head lists them ("**Ids minted:**" in `docs/AMENDMENTS-2026-10-24ab.md`): items 1306–1358. Each numbered id the head names (the ends of each range) now stands in the targets:

| id | occurrences after all three files |
|---|---|
| H48 | `V13-world.md` 6, `INDEX.md` 2, `SUMMARY.md` 1, `OWNER-BRIEF-WORLD-SITES-HYDROLOGY-DRAFT-2026-10-16.md` 2 |
| J-V13.201 | `V13-world.md` 2 |
| J-V13.214 | `V13-world.md` 3 |
| T-V13-129 | `V13-world.md` 3 |
| T-V13-139 | `V13-world.md` 3 |
| BCR-V13-58 | `V13-world.md` 6, `ARCHITECTURE.md` 2, `INDEX.md` 1 |
| BCR-V13-59 | `V13-world.md` 2, `INDEX.md` 1 |
| J-V15.52 | `V15-atlas.md` 1 |
| T-V15-38 | `V15-atlas.md` 1 |
| J-V14.60 | `V14-sites.md` 1 |
| T-V14-37 | `V14-sites.md` 1 |
| J-V9.170 | `V09-application.md` 1 |
| T-V9-99 | `V09-application.md` 1 |

The first free ids the head names, counted in the eight targets after all three files: J-V13.215 0; T-V13-140 0; BCR-V13-60 0; WORLD-25 0; J-V15.53 0; T-V15-39 0; BCR-V15-20 0; J-V9.171 0; T-V9-100 0; J-V14.61 0; T-V14-38 0. The named fields, readers, types and refusals the head lists are those the items' new texts carry, applied verbatim above.

## The lint

The clean-room lint (`apply_host.py`: the preamble's token list (`SettlementForge`, `settlement-engine`, `.js`, `FPQ`, `DESIGN_`, `WY`, `EC`, `GR`, `RD`, `WC`, `ES`, `HB`, `PG`, `POP`, `TR`, `Herald`, `Chronicler`, `realistic_regional`, `dramatic_campaign`, `infoMode`, `beliefMap`, `K3`, `SP-9`, `hopDelay`, `worldPlan`, `composer`), seat ab's additions for the host's answer (its `dryrun_ab.py`) (`PL3`, `PT`, `PA16`, `OD-FC`, `polityOf`, `whereaboutsOf`, `presentAt`, `lastHeard`, `pastCauseOf`, `realmPast`, `factRef`, `yearsBefore`, `heraldIntegrity`, `MAP_FEED_READERS`, `NAME_POLITY`, `M8`, `pg-1`, `pop-1`, `C0`, `C3`, `C13`, `C16`) and `pastRef`) re-run by this seat over all 133 new texts of this file bound for the volumes and the base (14 further new texts are bound for INDEX, SUMMARY and the owner brief, owner-facing and outside the lint's scope), as applied: **clean-room: no hit.**
