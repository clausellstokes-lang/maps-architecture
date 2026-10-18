# hidden-ways / read-request — the host's request read whole, the term census, what the programme already holds

**Seat:** reader hidden-ways/read-request (Opus/high), workflow hidden-ways-design (J407), 2026-10-18.
**Input read whole:** `docs/host-requests/2026-10-18-hidden-ways.md` (47 lines, md5 `251c96a9…`; byte-identical to the
owner's upload, checked with `diff` [OBSERVED]).
**Tags:** [STATED] the cited text says it; [OBSERVED] checked in the repository by this seat (grep, counts, diff);
[INFERRED] this seat's reading. Host facts are cited only from `research/sf/*.md` and
`docs/HOST-REQUIREMENTS-2026-10-18.md`; no host code is read or copied. Line numbers are as the files stand at
2026-10-18 ~22:40.
**What this file is not:** it decides nothing. Section 5 lists what the designers must decide.

---

## 1. The request restated as a checklist

### 1.0 Why, and the owner's rule
- [ ] The host is designing THE BODIES — three kinds of engine-born groups that move on the land: **gangs** (criminal
  bands), **conclaves** (small religious congregations; "cult" in the faith ladder's sense, never a verdict) and
  **beasts** — to become the *cause* of an embattled region instead of today's abstract pressure (request:4) [STATED].
- [ ] The owner's rule, verbatim (2026-10-18), as the request quotes it (request:4) [STATED]:
  > "these are all brigands, they don't travel the overt roads... roads are used for military, caravans, and groups of
  > people because they ease travel and logistics. These are public enemies to most and as such should have a
  > different means of traveling, maybe hidden roads that connect between roads, and multiple of them."
- [ ] Fills **ENC-HL-12** from the host's side (request:6). The request's quotation of ENC-HL-12 matches
  `docs/HOST-REQUIREMENTS-2026-10-18.md:655` word for word ("A 'hidden' road class: paths only smugglers and wanderers
  use, never armies … Ledger row M4: STUB; verdict MISSING") [OBSERVED]. Leans on **ENC-HP-09** (per-stretch terrain
  classes, "needs T2", HOST-REQUIREMENTS:625) and touches **ENC-HL-10** (detours, :653) and **ENC-HL-11** (line of
  sight, :654) (request:6) [STATED].

### 1.1 The binding rules the request restates (request:8–12)
- [ ] Door 1 stands (no settlement-frame geometry to the host); the WORLD canon is outside door 1, so world-scale
  facts — "routes, ground, territory, sites, and now hidden ways" — may reach the simulation (request:9) [STATED].
- [ ] One word, one meaning: the host will use `hidden` for the class and **`way`** for an edge of that class in prose
  ("the smugglers' way", "the old drover's way"); "trail" stays the map's route class; "If you already use 'way' for
  something, say so and we pick another word before either side mints it" (request:10) [STATED].
- [ ] The map never recomputes a host fact; the host never invents geography. Hidden ways = GEOGRAPHY (the map's);
  who knows them, who rides them, what happens on them = SIMULATION (the host's), sent through the events window
  (**H9**) and the week's presence rows (**H23**). **H16** stays the map's inbound door; the host does not consume it
  (request:11) [STATED].
- [ ] Two-layer shape, as for the world-site record (ENC-HL-01..04 / M-SITE): the map's canon is the record of truth
  when it exists; until then the host DERIVES a stand-in from what the port gives and replaces it when the layer lands
  (request:12) [STATED].

### 1.2 The six host behaviours (request:14–20)
1. [ ] **Bodies by stance, not by kind.** A body the land's holder tolerates walks the overt road; a body the holder
   hunts takes the hidden ways. A small military unit may take one to cross unseen — slowly, with attrition,
   size-capped. Caravans never do; a smuggler's run does (the existing smuggling gauntlet moves onto them)
   (request:15) [STATED].
2. [ ] **Capacity band.** A way carries a SIZE BAND — "a body of thirty, never a column of five hundred" — the
   intentional line between a road and a way. The host needs the band *derivable* from the map's record (ground class
   and width/kind) or a band the map records; the map is not asked to simulate it (request:16) [STATED].
3. [ ] **Knowledge per town is belief.** A way is KNOWN or UNKNOWN to each settlement; the host decides (a patrol
   catches a body on it, an operative maps it, the DM reveals it to the party). Patrol coverage on an unknown way is
   zero; a known way can be watched. The map DRAWS a way only when the host says some town knows it, or when the DM
   reveals it; the party's view must never leak an unknown way. Precedents named: the host's snapshot hard-deny hides
   its spatial ledgers; the map's own site reveal list, **M-SITE-A** (request:17) [STATED].
4. [ ] **Ambush points are junctions.** Where a way meets an overt route is where a gang sorties and returns; known
   junctions are the patrols' choke points. The host's ambush rule is TOPOLOGICAL (which way meets which road where),
   never line of sight: ENC-HL-11 is not needed, and VTT sight lines must not be presented as host truth here
   (request:18) [STATED].
5. [ ] **Every engagement on a way is a hearing** in the host's hearing week (ENC-HL-13): its WHERE must be a place the
   map can name — a way, a junction, or the country it crosses (request:19) [STATED].
6. [ ] **A way crosses the quarantine line.** A gate closed for quarantine stops the ROAD, not the way; the host will
   write that as a law; "Your lens can draw it when lit" (request:20) [STATED].

### 1.3 The four asks
**A. A hidden-ways layer in the world canon**, versioned like the digest, one record per way (request:23–29) [STATED].
Every field A lists:
- [ ] A1 `id`;
- [ ] A2 `kind: 'hidden'`;
- [ ] A3 two ENDPOINTS as **junction nodes on the overt route network** — a point on a route stretch, or a
  settlement's gate, or another way's junction; ways must start and end OFF a settlement, "which today's routes may
  not" (request:24);
- [ ] A4 the ordered CELLS or stretches it passes, each with its **GROUND CLASS** (the map's biome/relief/water words;
  the host maps them to its eight stretch classes water, desert, grassland, forest, wetland, tundra, glacier,
  mountain) (request:25);
- [ ] A5 a **STEP COST or length** in the map's cost units; the host prices it on its own cost law, slower than a road;
  a winter closure is never a cut (the slow-not-sever law) (request:26);
- [ ] A6 a **WIDTH/KIND hint** the host turns into a capacity band ("goat path · drover's way · old road · game
  trail") — the map's words; the host registers them (request:27);
- [ ] A7 the **JUNCTION records** (which route, where along it) as typed places the hearing card can name
  (request:28);
- [ ] A8 versioned like the digest (request:23);
- [ ] A9 **density rule the owner set**: several per rough country (forest, hills, mountain, marsh), none across open
  plain; if the generator has a better terrain rule, use it and give the parameters; "genesis is sacred" applies to
  the map's own genesis (request:29).

**B. Per-stretch ground classes on the OVERT routes** ("needs T2", ENC-HP-09) — the host's FALLBACK: if A is later
than the bodies work, the host derives a stand-in cover graph from ground classes between route junctions
(forest/hills/mountain/wetland = cover) and retires it when A lands; without T2 the bodies wait on A (request:31)
[STATED].

**C. The reveal and the legend** (request:33) [STATED]:
- [ ] C1 an unknown way is undrawn;
- [ ] C2 a known way draws in the way's own style with the knowing town's mark;
- [ ] C3 a way the DM reveals draws for the party's view;
- [ ] C4 the legend says hidden ways exist and are known per town (true), never how many there are (a leak);
- [ ] C5 the host sends `way_known(settlementId, wayId, how, tick)` through the events window when it lights; until
  then the layer is map-only, "like patrols".

**D. Route lifecycle (ENC-HP-13) and detours (ENC-HL-10)** (request:35) [STATED]:
- [ ] D1 a way is never promoted to a road by the map on its own;
- [ ] D2 a road that decays to "overgrown" in the host's ledger does not become a way;
- [ ] D3 if the map wants a way born where a road dies, say so — the host has no such law "and would rather not mint
  one".

### 1.4 The seven questions, verbatim (request:38–44) [STATED]
1. "Can a route endpoint be a non-settlement junction in your network today? If not, what milestone adds it?"
2. "Does the world port already carry per-stretch ground classes for routes (T2), or is that new work? (B depends on
   it.)"
3. "Which of your route classes, if any, already means "not for armies or caravans" — is `trail` that, or is `hidden`
   a seventh class?"
4. "Can your record express a width/kind hint per way, or should the host derive capacity from ground class alone?"
5. "Who owns "known per town": you (a flag on the way record, set by the host's event) or us (a host ledger you read
   through the window)? The host's preference: ours, sent through H9, so the map draws and never decides."
6. "Which milestone would carry A (the layer) and C (the reveal/legend)? The host will list it as a prerequisite of the
   bodies chain, as it did M-SITE for the sites."
7. "Does anything in your world-record size budget (a continent at ≤24 MB gzipped) change if a province carries, say,
   200–2,000 ways?"

### 1.5 What the host records on its side now (request:46–47) [STATED]
- [ ] a fold inbox row (ENC-HL-12 answered from the host; ENC-HP-09's T2 as the fallback's dependency);
- [ ] a prerequisite line on the bodies chain naming the map's milestone once named;
- [ ] the two tokens `hidden` and `way` registered **pending the map's answer to the word question**.

### 1.6 What the request does not name [OBSERVED]
- The word "refus…" does not occur in the request (grep, 0 hits). The zero-refusals rule is the owner's J264
  (`docs/PROGRESS.md:323`, "get it down to zero refusals"), not the request's.
- The no-invented-fact rule appears in the request only as "the host never invents geography" / "the map never
  recomputes a host fact" (request:11); the programme's own form is HOST-REQUIREMENTS:505 ("No invented effects. A
  patrol is never drawn lowering danger or holding a quarantine line …").

---

## 2. THE TERM CENSUS

Method: `grep -oiw` counts over `docs/volumes/V13-world.md` (4 611 lines), `docs/volumes/V14-sites.md` (3 340) and
`docs/ARCHITECTURE.md` (24 467); every count is a whole-word, case-insensitive token count [OBSERVED]; the meaning
column is read from the cited lines. Prose verbs ("finds its way", "both ways") are counted in the raw total but are
not term uses.

### 2.1 "way" as a TERM — every term use found

**The base (ARCHITECTURE.md; 1 166 lines contain "way"/"ways")** — "way" is the base's name for the settlement
frame's street skeleton (§2.4 *Ways (the skeleton) and typed edges*, ARCHITECTURE.md:1090) [OBSERVED]:
- `type WayClass = 'through'|'primary'|'secondary'|'lane'|'alley'|'cul_de_sac'|'track'|'path'|'quay'|'pier'|'bridge'|'ford'`
  plus `'aqueduct'` (ARCHITECTURE.md:1093–1094) [STATED].
- `interface Way { id; class: WayClass; spine: ChainRef /* ('way', id) */; width; surface; name?; from: NodeRef; to:
  NodeRef /* gate, plaza, bridge, harbour, junction, external bearing */; provisional; bridge?; raised?:
  RaisedWayRecord; slopeP95; corridor?: FaceRef; formerClass?: WayClass; lifecycle }` (ARCHITECTURE.md:1095–1103)
  [STATED]; `interface Junction { …; arms: Id[] /* ways */; kind: 'T'|'X'|'Y'|'end'|'gate'|'bridgehead'|'square' }`
  (:1104) [STATED].
- the operations `downgradeWay` / `upgradeWay` (:1102; 7 and 6 hits) and the draw command `drawWay` (:11097; 25 hits)
  [OBSERVED]; `RaisedWayRecord` (:699; 23 hits) [OBSERVED].
- `Frontage.way`, `class: WayClass` (:1204); `roadClass: WayClass` (:1242); a light-row `wayClass?: WayClass /* 'way'
  rows */` (:8253); `roads: { …; class: WayClass }[] // part-0 ways only` (:17293); seam edge `type: 'way'|…`,
  `wayClass?` (:22083) [STATED].
- **"raised way"** — 265 hits, the item-110 deck way (first :253, :568, :582) [OBSERVED].
- **"way corridor"** — 11 hits, the L2 corridor band of a way (:2362 `trail?: FaceRef /* the L3 path face to the
  nearest way corridor */`, :2917, :7705, :8664, :8680–8681, :19451, :19768, :19789, :19855, :19858) [OBSERVED].
- **"quay way"** — 3 hits (:1496, :6044, :9502) [OBSERVED].
- **"way segments"** — 2 hits (:16857, :23139 "under way segments on slopes steeper than `vaultSlope`") [OBSERVED].
- **"way graph"** — 4 hits (:7823, :13927, :13970 …) [OBSERVED].
- **"way bands"** — no base term use; the one hit is "walkway bands" (:688) [OBSERVED].

**V13 (43 lines contain "way"/"ways")** — term uses [OBSERVED]:
- `GlyphMark.kind: 'glyph'|'dot'|'ring'|'outline'|'water'|'wall'|'way'|'ward'` (V13:803) [STATED];
- the glyph level-3 row "`way` (arterials)" (V13:1189) and "level 3: … `way` (every `through` and `primary` way as a
  polyline, `class` the way class)" (V13:2131); the glyph stale rule's "a `through`/`primary` way" (V13:2140) [STATED];
- "its ways at the edge" (V13:2294) and "S1's ways-at-the-edge" (V13:2352) — the frame's ways at the charter ring
  [STATED];
- "streets are `street` units tested by `routeClass` over their **way segments**" (V13:2748) [STATED];
- "`routeClass` over its ways (V14's E3 (7))" (V13:3177–3178) [STATED];
- `FrameCharter.roads[].class: WayClass /* a world class mapped to §2.4's: highway → through, road → primary, track →
  track, trail → path … */` (V13:762) [STATED] — the bridge between the world's route classes and the base's WayClass.
- Non-term (prose) uses: V13:170, 178, 181, 183, 186, 226, 300–301, 1404, 1651, 1959, 1973, 2234 ("the way from a
  charter road to the gate" — prose, but naming a base Way the site frame lays), 2261, 2311, 2417, 2427, 2741, 2863,
  3081, 3845, 3930, 4437, 4444, 4518 [OBSERVED].

**V14 (45 lines contain "way"/"ways")** — term uses [OBSERVED]:
- **"way bands"**: "the roads as way bands" (V14:424), "(iii) the charter's `roads` as way bands" (V14:2100) [STATED];
- **"way corridor"**: V14:2052 ("to the nearest way corridor by an L3 `driveway` face"), V14:3171 (BCR-V14-26 quoting
  the base) [STATED];
- **"quay way"**: V14:1043 [STATED]; **"raised way"**: V14:2169 ("per-raised-way"), V14:2309 (SC3), V14:2704 [STATED];
- "a way vertex turning ≥ 30°" (V14:1038); "within 15 m of a way or route" (V14:1054) [STATED];
- **J393's site way**: "the way to the gate (J393): … one way of its `WayClass` from its ring station to the nearest
  entrance unit's point" (V14:1799–1800), "reports the way `unserved`" (V14:1806), T-V14-35 "its ground lays one way
  from that road's ring station" (V14:2979) [STATED];
- a site's ground `Way` "the base's" (V14:475); "its ways" (V14:2018); "`routeClass` over the crop's ways" (V14:820,
  2180); "along the way" (V14:2204); "a way's corridor" (V14:2468); the 2.5D rows "way, corridor, kerb band" (V14:2696),
  "a way's band draped" (V14:2771–2772); the budget's "2 ways", "≤ 3 ways" (V14:2858, 2862) [STATED].

**Verdict on "way": TAKEN** — the base's settlement-frame record (`Way`, `WayClass`, ARCHITECTURE.md:1093–1103), its
glyph mark `'way'` in the world volume (V13:803), and V14's J393 "way to the gate" (V14:1799–1800), which already puts
a base `Way` in the very place (a site frame by a world road) where a "hidden way" would be met [OBSERVED]. A world
record named `way` would be a second meaning for the word in all three documents [INFERRED].

### 2.2 The census table

| word | V13 (count; meaning) | V14 (count; meaning) | base (count; meaning) | verdict |
|---|---|---|---|---|
| **way** / ways | 43 lines; the glyph mark `'way'` (803), level-3 ways (1189, 2131, 2140), ways at the edge (2294, 2352), way segments (2748), the crop's ways (3178); `class: WayClass` in the charter (762) | 45 lines; way bands (424, 2100), way corridor (2052, 3171), quay way (1043), raised way (2169, 2309, 2704), J393's way to the gate (1799–1806, 2979) | 1 166 lines; `WayClass`, `Way`, `Junction.arms` (1093–1104), raised way 265, way corridor 11, quay way 3, way segments 2, way graph 4, `drawWay` 25, `downgradeWay`/`upgradeWay` | **TAKEN** |
| **trail** / trails | 11 + 3; a **WorldRoute class** `'trail'` (788), standalone rank rule (1134, 1792), class order highway > road > track > trail (1840), a watchpost at a trail's crossing (2090), the style "trail 0.5 px dotted" (3144); mapped to base `path` (762) | 20 + 0; the site kinds' minimum road class `trail` (969–985), the class order (994), BCR-V14-26 quoting the base row "a row with `trail`" (3171) | 3 + 4; the hinterland's **trails** (S10's outputs: 668, 5664, 5807, 7612), the reservation field `trail?: FaceRef` (2362), the decoration row's `trail: yes / no` (8677, 8680) | **TAKEN** (route class; and a base hinterland feature) |
| **track** / tracks | 21 + 0; WorldRoute class `'track'` (788, 1792), patrol `gradeShift` "track −1" (1163); a second sense: "the host's track" = V13 §8.5's H1–H30 list (45, 267, 3815) | 21 + 3; the kind rows' class `track` (968–985); hinterland "fields and tracks" (167, 268, 1535) | 27 + 4; `WayClass` `'track'` (1093); "drops a covered way to track" (1102) | **TAKEN** (two senses in V13) |
| **path** / paths | 74 + 9; the cost search "path search" (223), `routeClass(path, …)` (536), "the D8 path" (734), a fact's field `path?` (821) | 57 + 10; the L3 `path` face (82), kind rows "a path where a road is near" (969, 984) | 431 + 89; `WayClass` `'path'` (1093), the L3 `path` face (2362, 8680) and generic senses | **TAKEN** |
| **trace** / traces | 51 + 17; the edit **trace** records `TerrainTrace`/`SurfaceTrace` (199, 228, 515), `showTraces` view key (525), "a reach trace" (1069) | 18 + 4; the edit trace and derivation traces | 435 + 45; the wall **trace** (634, 1743, 2271), the derivation trace (217, 465) | **TAKEN** |
| **lane** / lanes | 79 + 25; workflow lanes (5, 18), the host's population lane (81), **water lane** (3144 "a hidden water lane a quiet-quay mark", 1815–1817), the station "own lane" (790), the host's lit lanes (HOST-REQ:508) | 7 + 0 | 129 + 57; `WayClass` `'lane'` (1093), plot `exposure: …'lane'…` (1208), workflow lanes (5, 7) | **TAKEN** (three senses) |
| **pass** / passes | 66 + 25; algorithm passes (948, 1117, 1721), a mountain **pass** (1796 "the pass is 400 m lower", 2090 "a fort at a pass") | 22 + 8; the coherence test `atPass` (905, 968, 997) | 385 + 165; algorithm/render passes (8518, 13331, 14823) | **TAKEN** (and terrain) |
| **cut** / cuts | 23 + 0; the carve cut (1069, 1599), "cut at every confluence" (1603) | 40 + 7; cutaway, cut-away bands (2787) | 568 + 127; the "bent cut" (49, 204; 56 hits), S7 "cuts off" (2271) | **TAKEN**; the request itself uses "cut" for severing ("a winter closure is never a cut", request:26) |
| **ride** / rides | 5 + 2; verb only ("later roads ride earlier ones" 1786; "ride the DM's map feed" 2511) | 2 + 3; verb only (2310, 269) | 9 + 8; verb | **AMBIGUOUS** (the programme's verb "X rides Y"; the request's "who rides them", request:11) |
| **run** / runs | 102 + 103 | 80 + 52 | 1 142 + 547 | **TAKEN** (pipeline runs, "a run of", seam runs); the request's "a smuggler's run" (request:15) is a host activity, not a geography word |
| **covert** | 12; the audience word: "a covert power's patrols are DM-only" (2082), "covert links … covert patrols omitted" (3158, 3324, 3408, 3423) | 0 | 4 | **TAKEN** (audience sense) |
| **smugglers' …** | 0 | 0 | 4; "a smugglers' store" (8173, 16417, 16421), "a smugglers' passage" (15779 — an underground place) | **AMBIGUOUS** as a kind word (base uses it for clandestine institutions and an underground passage); free only as prose |
| **byway** / byways | 0 | 0 | 0 | **FREE in all three** [OBSERVED]; caveat: `docs/validation/sites-roads-2026-10-18/design-B.md:25–144` used `byway` (a `WorldRoute` of origin `byway`) for what landed as the **approach road** (V13:786, J-V13.110 at V13:4025); judges cite it (judge-1.md:108, 131, 221; judge-2.md:24, 151, 171; judge-3.md:27, 173); no landed text carries it (`grep` over PROGRESS.md and AMENDMENTS-*.md: 0) [OBSERVED] |
| **trod** / trods | 0 | 0 | 0 | **FREE**; 0 hits in the whole repository outside this lane's own log line (`grep -rIliw`, docs, research, plat, tools) [OBSERVED] |
| **drove** / droveway | 0 | 0 | 0 | **FREE in all three**; "drove" appears elsewhere only as the past tense of "drive" (e.g. plat/docs/build/checks/*.md, research/fmg/notes) [OBSERVED]; the request offers "drover's way" as a **width/kind hint** (request:27), so it is better kept for a kind value than for the class [INFERRED] |
| **holloway** | 0 | 0 | 0 | **FREE** [OBSERVED]; meaning (a sunken lane) is a physical form of an overt road, so it misleads as the class word [INFERRED] |
| hidden (the class word) | 39; the host's grade word (788), the charter's `roads[].hidden?: boolean /* a road the host grades hidden: no public road, drawn DM-only */` (764), plus the honesty sense "never hidden" (406, 1171, 2249, 3287) | 15; `entrances.side: …'hidden'` and `hidden: boolean` (628), `hiddenEntrance` (618) | 160; enum value in plot `exposure` (1208, 8259), `concealment` (2378, 2384, 8168, 12648), close-up road draw mode `roads.mode: …'hidden'` = not drawn (13416) | **TAKEN as a value** in five enums and as the host's grade on an overt host route; see §3 |

### 2.3 What the census leaves (for the designers; nothing proposed here as decided)
- FREE in V13, V14 and the base: **byway**, **trod**, **drove/droveway**, **holloway** (and coinages) [OBSERVED].
- TAKEN or ambiguous: way, trail, track, path, trace, lane, pass, cut, run, covert; ride and smugglers' … ambiguous
  [OBSERVED].
- The reader's note [INFERRED]: **trod** is the only candidate with zero hits anywhere in the repository and an
  English sense (a narrow footpath worn by feet and beasts, northern English) that fits "a body of thirty, never a
  column"; **byway** is free in the landed texts but carries a residue in the sites-roads validation records as the
  rejected name for the approach road, and its English sense ("a little-used side road") is overt rather than hidden.

---

## 3. What the programme already recorded on hidden roads

### 3.1 V13 (every "hidden" use that concerns roads) [OBSERVED: grep -niw "hidden" V13-world.md, 39 hits]
| line | text (quoted) | reading |
|---|---|---|
| V13:601 | "`WorldRoute` \| by class or the host's grade (a hidden host road a DM-only ghost)" | the draw rule [STATED] |
| V13:764 | `hidden?: boolean /* a road the host grades hidden: no public road, drawn DM-only */` on `FrameCharter.roads[]` | a charter flag [STATED] |
| V13:788 | `class: 'highway'\|'road'\|'track'\|'trail'\|'sea'\|'river' /* … bound: mapped from the host's grade */; grade?: string /* bound: the host's grade word, hidden among them */` | the world's six classes; `hidden` is a host **grade** of a bound host route, not a seventh class [STATED] |
| V13:1163 | `patrol.cadenceWeeks` / … / `gradeShift` … "highway +1, road 0, track −1 (hidden: none)" | no patrol on a hidden-graded road [STATED] |
| V13:1813–1820 | W7 (9) the lived network: "a demotion keeps the polyline; a revival restores the hidden one; a `bypass` (the host's detour round a seat it avoids …) re-lays the route round that radius … a hidden land road is a DM-only ghost and a hidden water lane a quiet-quay mark; … a hidden road counts as no public road" | a host route graded hidden is drawn DM-only and is no public road; the map already folds the host's detour as `bypass` [STATED] |
| V13:1839 | W7 (12) approaches: "(a) **along** — where a public land route of any class (the network at the week, a hidden road no public road …" | siting ignores hidden roads [STATED] |
| V13:1979 | sway continuity: "a road the host does not grade hidden joins its seat to that sway within Treinf" | a hidden road carries no continuity [STATED] |
| V13:2065 | patrols (T3): "a road the host grades hidden: none" | [STATED] |
| V13:2280–2281 | P4 charter `roads`: "a hidden host road marked `hidden`" | [STATED] |
| V13:2421 | "a road the host demotes to hidden under a toll house raises `siteIncoherent` at the next window" | `hidden` is reached by **demotion** of an overt host route [STATED] |
| V13:3144 | the `routes` layer style: "a hidden host road a DM-only ghost, a hidden water lane a quiet-quay mark"; "trail 0.5 px dotted" | [STATED] |
| V13:3737 | T-V13-42: "a hidden road has none" (patrols) | [STATED] |
| V13:3992 | J-V13.77: "host facts carrying the host's resolved audience (DM-only withheld with its geometry; hidden never sent …)" | "hidden" here = the host's audience hidden, a different sense [STATED] |
| V13:3522, 4010, 407 | "hidden cult sites" — DM-placed world sites tagged with a deity, DM-only by default (J384 (10)) | a site precedent for a DM-only-by-default secret [STATED] |

Other V13 facts the asks touch:
- **Route ends (Q1).** `WorldRoute { a; b /* its two ends: seat ids … an approach road's `a` its site's placement and
  `b` the public route it joins */; join?: { route: Id; atCm: WorldPointCm } /* an approach road only: its junction —
  the joined route's polyline point it ends at */ }` (V13:786) [STATED]; W7 (11) "**Legs end at settlements.** On a
  host-bound world every host route ends at two host settlements; a site, a proposal or a junction is a position along
  a route, never an end of a host route (the map's own approach road, (12), ends at it)" (V13:1827–1828) [STATED]. So
  a junction end exists today **only** for the map's own approach road, keyless and in no canon slot, `routeFacts`
  row, `patrolOffer` row or `routes(world)` host list (V13:1871–1873) [STATED].
- **Per-stretch ground (Q2, ask B).** The record already holds `vertexClass: Uint8Array /* per segment: the host's
  terrain class through the adapter folder's table */` and `byClassM: Record<string, number>` (V13:790–791), evaluated
  on the final polyline (V13:1801–1802) [STATED]; but the simulator feed `routeFacts` sends "the per-class effort"
  (V13:2484), not the ordered per-segment classes [STATED]; the research note's T2 row predates or ignores the field:
  "`WorldRoute` carries polyline, `costTotal`, `landmass`, `reason` — no terrain-class breakdown per segment — MISSING"
  (`research/sf/fp-physical-integration.md:394`) [STATED]. The gap is the **port**, not the record [INFERRED].
- **Canon vocabulary.** `WorldCanon.envelope.versions.vocabulary: { terrainClass; climateBand }`, `travel.crossings:
  TravelEdge[]` with `classA`/`classB`, and site ground `terrainClass` + integer `stepCost` (V13:846–849) [STATED] — the
  canon already ships ground classes through the adapter's class table and integer step costs.
- **Knowledge.** "Every world entity above carries `knownTo` … (`'public'|'local'|'secret'`) … Host facts carry the
  host's resolved audience … a fact the host hides is never sent; a host fact arriving with no resolved audience is
  stored DM-only" (V13:957–963) [STATED].
- **Lens refusals.** "*Refusals:* a patrol drawn lowering danger or holding a quarantine line" (V13:3428); "an effect
  the host does not apply (a patrol lowering danger, a border stopping a plague …)" (V13:3309) [STATED].
- **Size budget (Q7).** "a `continent` world ≤ 24 MB gzipped (9.2 M cells × ≈ 2.2 B gross across the rasters, plus ≤ 2
  MB of records), a `realm` ≤ 11 MB, a `province` ≤ 3 MB" (V13:1359–1360) [STATED]; the document on disk ≤ `docMb`
  (V13:3610–3611) [STATED].
- **Door 1 / Q4 (file r).** "The world canon is outside J86's door 1, and door 1 itself — the settlement frame's
  geometry — stays closed" (V13:4458–4459; answered 2026-10-18, file r item 926, V13:4455) [STATED].
- **Host track rows.** H9 the events window (V13:3884), H16 the optional gate-keeper/patrol door (V13:3891), H23 the
  lens window (V13:3898), H25 "patrol coverage's host meaning NOT asked" (V13:3900) [STATED]; H31 the host's surfaces may draw the approach roads keyless as "map road", read by no step of its simulation (V13:3906) [STATED] — the nearest precedent for a map-only road layer the host may draw.

### 3.2 The host's `hidden` as the research notes record it
- The host's genesis edges carry "`grade: highway|road|track|hidden`" (`research/sf/fp-physical-integration.md:98`)
  [STATED]; its lifecycle keeps a "grade ladder down to `hidden`, never absence" (ibid. :99) [STATED]; M4 "Hidden paths
  usable by wanderers and smugglers (armies may not) … grade penalty on the `hidden` rung … STUB" (ibid. :159), "M4 a
  `hidden` route class — the world's classes end at `trail`; the host's `hidden` rung has no world counterpart —
  MISSING" (ibid. :455) [STATED].
- [INFERRED] In the host's own ladder `hidden` is the lowest **grade of an overt edge** (a route decays down to it),
  and V13 already reads it that way (V13:788, 2421). The request now proposes `hidden` as the **class of a new layer**
  of non-route records and also says a road decaying to "overgrown" does not become a way (request:35). Whether the
  host's lowest rung and the new layer's class are one thing is not said by the request.
- Quarantine: "Quarantine lines | none: no verb, no stance input" (`research/sf/lens-implications.md:196`); "quarantine
  or gate closure (no verb exists)" (`research/sf/plague-system.md:77`) [STATED] — the request's behaviour 6 is a law
  the host "will write" (request:20), not one it has.

### 3.3 docs/PROGRESS.md J393–J399 and file u
- The word "hidden" occurs **0 times** in the rows J393–J399 (`docs/PROGRESS.md:451–458`) [OBSERVED].
- J393 (PROGRESS.md:451) is the owner's word on sites and roads (§4 below); its design landed in V13 as the approach
  road and the hidden-road clauses at V13:1839, 2090, 2421 [OBSERVED].
- J396 (PROGRESS.md:455): the patrols decision, Option B — "patrols map-only for now, the legend honest, the door open"
  — the owner: "then do as you recommend" [STATED]; file u item 949 (`docs/AMENDMENTS-2026-10-18u.md:50–56`): "**B** —
  patrols stay map-only for now, the legend honest, the door open" [STATED]; applied to H25 (u:83; V13:3900) [STATED].
  The request's C5 "until then the layer is map-only, like patrols" (request:33) leans on exactly this precedent
  [INFERRED].

---

## 4. The owner's words that bind this design

1. **The request's owner rule (2026-10-18)** — quoted in §1.0 (request:4) [STATED]: brigands do not travel the overt
   roads; roads serve military, caravans and groups; public enemies need "a different means of traveling, maybe hidden
   roads that connect between roads, and multiple of them". [INFERRED] Three load-bearing phrases: "connect between
   roads" (junction ends on routes, A3), "multiple of them" (density, A9), "public enemies" (stance, behaviour 1).
2. **J393 (PROGRESS.md:451)**, verbatim: "make sure that sites have road access where appropriate, they are
   integrated into road infrastructure and that depending on the catalogue, where appropriate, their geography in the
   world map autocorrects to meet the coherence expectation." [STATED] Its design: the approach road (a `WorldRoute` of
   origin `approach` with its junction in `join`, J-V13.110, V13:4025; V13:786) — the programme's one junction-ended
   line today.
3. **J396 (PROGRESS.md:455; file u:50–56)**: "then do as you recommend" = Option B, patrols map-only for now, the
   legend honest, the door open [STATED].
4. **The territory rules (J377–J378)**, verbatim [STATED]:
   - T1 (PROGRESS.md:436): "also your thoughts on territory borders which FMG does have some inclusion on inclusive and
     expanded with our new emergent persistent encounter map work where it is occupied by a settlement power or
     military, and vassals and the likes?"
   - T2 (PROGRESS.md:436): "and territory has an upper limit per individual settlement that expands bounded but
     exponential to the size, tier, prosperity, relative distance and dynamics of neighbors and contnious chain of
     vassals." (the session's reading includes "unclaimed land stays wild")
   - T3 (PROGRESS.md:437): "and of course military strenght to enforce. where two hostile neighbors fight regarding
     the march. still having the cieling that you described but where contested, this also becomes part of the tie
     breakeralso there should be patrols" — the session's reading: patrols "derived by address and week from military
     enforcement, neighbour hostility and route class … offered to the host … which the simulation may consume only by
     the host's own choice".
5. **Door 1 and the world canon** — the owner's "1. yes" (2026-10-18, file r item 926; V13:4455–4459) [STATED].
6. **Zero refusals** — J264 (PROGRESS.md:323): "And wherever possible, get it down to zero refusals." (a refusal of a
   lawful input is a defect) [STATED]. Not named in the request (§1.6).
7. **No invented facts / effects** — the request's "the map never recomputes a host fact; the host never invents
   geography" (request:11) [STATED]; HOST-REQUIREMENTS:505 "No invented effects" [STATED]; J139's dossier rule (only
   read from the dossier; the map supplements what is not given; PROGRESS.md:198) [STATED].
8. **"Genesis is sacred"** applied by the request to the map's own genesis (request:29) [STATED]; the host's Law 2
   "GENESIS IS SACRED" (`research/sf/fp-physical-integration.md:98`) [STATED].
9. **J404 (PROGRESS.md:463)**: "Decisions and judgment to you." — the delegation under which this workflow rules,
   vetoable [STATED].

---

## 5. What the designers must decide (open points)

1. **The word for the edge.** "way" is TAKEN (§2.1). Choose a FREE word (candidates: trod, byway, drove/droveway,
   holloway, or a coinage) and say why; keep "drover's way" and its siblings as kind values, not the class.
2. **The class word `hidden`.** V13 already reads `hidden` as the host's grade of an overt host route, drawn DM-only
   (V13:764, 788, 1815, 2421); the base uses `'hidden'` as an enum value in five places (ARCHITECTURE.md:1208, 2378,
   2384, 8259, 13416 — the last meaning "not drawn"); V14:628. Decide whether the new layer's `kind` is `hidden`
   (the same object as the host's lowest rung?) or a distinct value, and how a host route graded `hidden` and a record
   of the new layer differ.
3. **Q1 junction ends.** Host routes end at settlements (V13:1827–1828); only the map's approach road ends at a
   junction (`join`, V13:786). Decide whether the new record reuses `join`'s form `{route, atCm}` for both ends, and
   what "a settlement's gate" and "another way's junction" are as typed places on a world (gates are frame geometry
   behind door 1).
4. **Q2/B.** The record holds `vertexClass` per segment (V13:790); `routeFacts` sends per-class effort only
   (V13:2484). Decide whether B is a `routeFacts` extension (an ordered per-stretch class list) and on which milestone
   (M-W2 carries W7, V13:3814), and correct the research note's MISSING verdict (fp-physical-integration.md:394) by an
   Evidence line.
5. **Q3.** `trail` is the lowest world class (V13:788, 1792); nothing in V13 says a trail forbids armies or caravans
   (no such sentence found) [OBSERVED absence]. Decide: a seventh `WorldRoute.class`, or a separate record outside
   `WorldRoute` (no host key, no leg, no seat end).
6. **Q4 width/kind.** Decide the kind vocabulary (the request's four, request:27) as a §2.3 rule table with cells
   {value, unit, provenance, calibration} and whether a size band is recorded or only derivable.
7. **Q5 knowledge.** The host's preference is its own ledger through H9 (request:42). V13's `knownTo` (V13:957) is
   per entity and three-valued, not per town. Decide whether a per-town known set enters the lens window (H23) or the
   events window (H9) as host facts, and the legend rule "never how many" (C4) as a lens refusal.
8. **Q6 milestones.** A (the layer: generation after W7, plausibly M-W2 with the routes) and C (reveal/legend: M-W5's
   lens steps, or the M-SITE-A analogue) — name them and their H-rows (V13 §8.5 already runs to H31, J393's approach roads drawn as "map road", V13:3906 [OBSERVED]; a new row numbers from H32).
9. **Q7 budget.** The province rung is ≤ 3 MB and the continent's record share ≤ 2 MB (V13:1359–1360); size 200–2 000
   records per province (ordered cells + classes) and say whether the 2 MB record share holds at continent scale.
10. **The generation rule (A9).** The owner's density ("several per rough country, none across open plain") as a W-step
    over the cost law and biome/relief classes; its parameters as a rule table; determinism and order-freedom tests
    (T-V13-n).
11. **D: lifecycle.** Decide D3 — the request asks the map not to mint a "way born where a road dies"; V13's lived
    network already folds demotion to `hidden` (V13:1813, 2421). State that a demoted host route is not a record of
    the new layer, or the reverse.
12. **Detours (ENC-HL-10).** HOST-REQUIREMENTS:653 says "the map offers no detour either", but V13 W7 (9) folds the
    host's `bypass` as a dated re-lay (V13:1813–1815). Decide whether the reply corrects that row.
13. **Quarantine (behaviour 6).** V13:3428 refuses "a patrol drawn … holding a quarantine line"; the host has no
    quarantine verb (lens-implications.md:196). Decide the lens rule for "the way crosses the line" — drawn only when
    the host's law is lit, never invented.
14. **Line of sight.** Behaviour 4 asks that VTT sight lines not be presented as host truth; HOST-REQUIREMENTS:654
    already says so. Decide whether junction records carry anything sight-related (the request says no).
15. **Clean-room.** Every text that enters V13/V14/the base names host facts only by port field names and the
    adapter's vocabulary tables; `way_known(settlementId, wayId, how, tick)` is the host's proposed event shape
    (request:33) — decide its port-side name under the word chosen in point 1.
