# Coherence verify — the determinism part (§5, §6, §7), round 0 (seat coherence/verify-determinism-r0s)

Written by Opus (verifier seat). Scope: base `## §5 `, `## §6 `, `## §7 ` after coherence/assemble-r0, checked against the
archive, the inventory, the canon and the rewrite report. Nothing in the design files was edited.

PROGRESS (lane `coherence/verify-determinism-r0s`, 2026-09-30)
- P1 inputs extracted and pinned: done
- P2 terms, deferral wording, reference resolution, ids: done
- P3 §5–§7 compared with the archive whole (sentence alignment over 1 742 archived sentences; word diffs of every subsection; every changed or removed passage read): done
- P4 every inventory id (628) checked; the 45 canon REFERENCE items' homes read: done
- P5 routed rulings (28 conflicts, 10 elegance rulings with their equivalence lists, 4 id rulings, 11 wiring gaps, 87 open findings, 97 f items, g items 102–118 parts, 132 edges and 75 owned combinations): done
- P6 the cross-part notes of the other 17 rewrite reports that address §5–§7: done
- P7 issues, result file, LANDED: done

## 1. Inputs

| input | what |
|---|---|
| live text | `docs/ARCHITECTURE.md` l.8234–11350 (§5 8234–8546, §6 8547–9335, §7 9336–11350); byte-equal to the rewrite's three files `new/base/determinism/0*.md` except the assembler's seven G-cite hunks (checked by diff) |
| archive | `docs/archive/ARCHITECTURE-pre-coherence-2026-09-28.md` l.6794–9514, md5 `01fea21f…` = the inventory's source |
| inventory | `inventory-determinism.json` (628 items: 570 facts, 58 terms) |
| canon | `canon.json` → `units.determinism` (45 REFERENCE, 28 conflicts, 97 f items, 10 g parts, 11 wiring gaps, 10 elegance rulings, 4 id rulings, 87 open findings, 18 disagreements); `canon.md` dated rulings of 2026-09-30 for g items 114–119 |
| rewrite report | `rewrite-determinism.md` (mapping table of all 628 ids, rulings, f/g items, cross-part notes) |
| others | `edges.json` (determinism: 132 edges, 75 combinations), the 17 other `rewrite-*.md` cross-part notes, `docs/AMENDMENTS-2026-09-28f.md`, `…g.md`, the archived volumes (BCR texts), the live volumes |

## 2. Method

- **Terms:** all 35 retired-term patterns of the canon glossary run over the live §5–§7 (and the archive for the before count).
- **Deferral:** TBD / TODO / deferred / later / open / not yet / should-have / eventually … scanned; every hit read.
- **References:** the assembler's resolver (`work/assemble-r0/refs.py`) re-run over the live set; the 2 333 references in
  §5–§7 filtered and every non-`resolved` one read; DR ids, "§7.7 item n", tool and layer ids checked by script.
- **Loss and change:** a sentence alignment of the 1 742 archived sentences against the live text (and the whole live set for
  moved facts), a distinctive-token sweep (identifiers, numbers with units, codes), and word-level diffs of each
  subsection (§5.1–§7.8), every removed or replaced passage read and its new home found and read.
- **Inventory:** a per-id token check of all 628 statements (554 fully present in §5–§7; 22 moved to other homes, each
  verified at the home; 52 flagged only on the inventory's upper-case term labels) plus the REFERENCE audit below.
- **REFERENCE audit:** each of the 45 items the canon made a pointer was read at its target home. 43 hold the fact; two do
  not, because the canon's "near" match pointed to an unrelated fact (VDC0-02, VDC0-03).
- **Rulings:** E-03–E-11 and E-30 read against their equivalence lists; the 28 conflicts and 4 id rulings checked at their
  sites; the 97 f items checked by citation and by 4-word shingle coverage of each BCR's new text, every low scorer read;
  g items 102–113 parts and the 114–119 dated rulings checked.
- **Wiring:** the 11 routed gaps checked at both ends; new or remaining one-ended hooks found through the cross-part notes
  and the type declarations. `wiring.py` was not re-run: its input is the pre-coherence inventory, and every routed gap and
  every hook named below was checked by hand at both ends.
- **Edges:** the 33 UNDEFINED and 4 UNTESTED edges, the 9 inventory-observed edges, the 39 owned UNDEFINED combinations and
  the two named combinations checked for outcome, rung and test; §13.2 checked for the tests the rewrite handed to scope.
- **Doc checks:** `doc_checks.py --sections 5,6,7`: C1 5 / 0 unreviewed, C2 1 / 0, C3 268 / 0, C4 0, S1 0, S2 139 / 0,
  exit 0 — **PROVISIONAL**: the tool warns "reference corpus INCOMPLETE (missing: captures, research/patreon,
  research/devlogs, research/ftg-docs, research/external) — clean-room results are NOT authoritative".

## 3. Results by check

**Sizes (principle (9)).** Words (wc): §5 10 861 → 10 979, §6 12 636 → 13 676, §7 38 458 → 48 200; unit 61 955 → 72 855
(+17.6 %; the rewrite's own counter: 63 117 → 74 098, +17.4 %). The unit grew (file f's ~100 volume requests and the
mandated tables moved into it), so the "shrunk by more than half" nuance audit does not apply; every archived
subsection was compared with its new text anyway.

**Terms.** 0 survivors of G-lot, G-vectorrung, G-strike, G-newrandom (5, 1, 2, 2 archived hits removed); 1 new survivor of
G-standalone (VDC0-17). **Deferral wording:** 0. **Narration:** 0 ("amendments of", "appended by", "Fable review",
"should-have" and the like all removed — DIC-11, DIC-12 closed).

**References.** 2 333 in §5–§7: 2 325 resolved, 1 external (`docs/CONFIDENCE.md`), 7 ambiguous-form; of these, the two
range ends (l.8374, l.11102) are sound and four are real G-cite mis-cites (VDC0-18); one numbered-list pointer DBR-01
left (VDC0-19). DR1–DR40 unique and contiguous; no DR working name survives but V05's deliberate migration note.
ID-ITEM and ID-LAYER hold; ID-TOOL has three slips (VDC0-26).

**Inventory (628 ids).** No id is lost at its mapped home except as listed: the F-CUT bar (DETERMINISM-0029, VDC0-01),
the stamp-tile key (0148, VDC0-02), the per-level digest input (0166, VDC0-03), the shell subtree's list at §5.3 (0065,
0070, VDC0-20), and the archived F-EDIT "room unreachable" case (DETERMINISM-0051, 0325; VDC0-11). Every other moved value was found
at its ruled home: F-CUT's 36° / 2 × area / ≤ 5 % (§4.6 step 8), the castle constants (§4.8), the class floors (§4.7),
rule 4's 0.06–2.7 µs (§2.6), 15.9–17.2 ms drainage (§2.3), the 2 MB cap (§2.9), the 1 500 floor and 120 000 cap (§1.1,
§7.7 item 15), `reroll.maxAdvance` 3, `crossing.searchBandM` 120 m and the grid cells (V11 row 92), the preset values
(§7.6), U1–U3 and access rules (II.7.3), the undercity bound (II.7.5), harbour works (§4.8), the closest-option order
(§4.7 S10b, §7.7), the creation prefix (§7.4), histories-not-states (§6.2), the dossier-owned alternatives (§7.7 item 11),
§7.6's archived table enumeration (every table a V11 §3.1 row; `roster.classes` carries relations, supply edges and
designation templates with the jitter columns).

**Elegance rulings.** E-03 (fixed-key draw), E-04 (binding: all 78 `EditEvent` kinds homed, the plan events enumerated at
§7.4's row), E-05 (registry closure), E-06 (90-row concern table: every archived concern present, caps per DIC-02, retired
ids reserved), E-08, E-09, E-10 (world-point table and schema-transforms table — every archived rule present; §7.5's table
is incomplete for §2's new fields, VDC0-12), E-11 (§5.3 rows cut to check and scope: every cut detail found at its cited
home but the shell list, VDC0-20), E-30 — applied with their equivalence lists. E-07 (outcome table) keeps 25 of the
archived F-EDIT causes with their actions and maps its keys one to one onto V09's rows, but drops the unreachable-room case
(VDC0-11) and lacks the stale-base conflict (VDC0-36). No unruled duplicate mechanism found.

**Conflicts (28).** DIC-01–DIC-12, DXC-01–DXC-06, KXC-01/02/04/05, RXC-02, SCOPE-C01, SCOPE-C11, V04-ICONF-1,
V09-ICONF-2, V12-XCONF-2 — all closed as ruled (DBR-01 partly, VDC0-19).

**f items (97).** 95 applied at §5–§7 as written (cited by number; every low shingle-coverage item read against its BCR).
Two are applied nowhere: 336 (BCR-V6-18, text home §4.11; VDC0-08) and 343 (BCR-V6-9, `EpochInputs` home §4.11; VDC0-09).
J122 decisions of the rewrite are indexed (J-A113.61, J-A110.61, J-A101.78, J-DET-56).

**g items.** 102–110 (as f items) present; 111 (T2 `spring`, the oasis rows, DR40, §7.5) and 113 (DR36–DR39, the replay
record, §6.1's `0x8000 + r`, §6.2, §6.5 (9)) present; 114, 117, 118 — the parts the dated rulings route to §7.1, §7.4 and
§7.7 are absent (VDC0-04, VDC0-05, VDC0-06; the model's part of 114 too, VDC0-07); 115, 116, 119 name no determinism part.

**Wiring (11 routed).** W-DOS-01a (closed-digest rule; but the never-read list now contradicts V08 on `defenseProfile`
and `traditions`, VDC0-04, VDC0-06, and J-A73.06 on `previousGovernments`, VDC0-33), W-DOS-01b, W-DOS-02 (DR6 reads
`EpochInputs.wealthLevel`, undeclared, VDC0-09), W-DOS-09, W-EDIT-01, DWG-01–DWG-05, W-SET-01 — closed at the
determinism end. New or remaining one-ended hooks: VDC0-13 (`Invariant`), VDC0-14 (`EditScope` people), VDC0-22
(`attempts`), VDC0-23–VDC0-25 (`raised.reason`), VDC0-27 (kernel codes), VDC0-28 (`TableId`), VDC0-32 (DR14),
VDC0-36 (stale).

**Edges.** All 33 UNDEFINED and 4 UNTESTED edges and the 9 observed edges now have an outcome, rung and test (§5.1 (8)–(10),
§5.3's vacuous rows, §5.4's empty lists, §6.1's user cap, §6.3's coincident anchors, §6.4's link cases, §6.5 (9)'s
fixtures, §7.1's empty edits and drawBoundary bend, §7.2's tests, §7.3 item 10, §7.4's undo cap, §7.7 item 5's budget
rows and supersession, §7.8's disabled controls); scope carried the tests into §13.2 (l.15375, l.15451–15453, l.15502–
15505). The 39 owned combinations are the "Every kind at the edit boundary" table's (l.10442–10460). New undefined edges:
VDC0-11, VDC0-12.

**Cross-part notes addressed to §5–§7** (kernel 14–22, 24; model; pipeline; rendering; scope; V04 1–2; V05 3; V06; V07 6;
V08 3; V10; V11 2, 5): applied except those raised as VDC0-04–VDC0-06, VDC0-09, VDC0-10, VDC0-12–VDC0-14, VDC0-21,
VDC0-24/25 (the determinism note's own asks to others), VDC0-27–VDC0-33, VDC0-35. V05's `by: 'update'` ask and V06's
advance-group undo are met by §7.4's general rules and V05 §4.2 (not raised).

## 4. Issues

36 issues — 3 blocker, 12 major, 21 minor; by owner: determinism 27, pipeline 4, model 2, V07 1, V06 1, V08 1; by kind: WIRING 10, CONFLICT 8, F-MISSING 6, BROKEN-REFERENCE 4, NUANCE-LOST 3, EDGE-UNDEFINED 2, TERM 1, LOST 1, ID 1.

| id | severity | kind | owner | in short |
|---|---|---|---|---|
| VDC0-01 | blocker | NUANCE-LOST | pipeline | The F-CUT test bar 'on 10^5 random concave and holed faces the ladder ends in <= 6 kernel calls and the face c |
| VDC0-02 | blocker | NUANCE-LOST | determinism | The construction of render.stampTiles' constant entity key is lost |
| VDC0-03 | blocker | NUANCE-LOST | determinism | What a per-level geometry digest hashes is lost |
| VDC0-04 | major | F-MISSING | determinism | g item 114's determinism part (canon, dated ruling 2026-09-30 |
| VDC0-05 | major | F-MISSING | determinism | g item 117's determinism part (canon, 'File g item 117 routed' |
| VDC0-06 | major | F-MISSING | determinism | g item 118's determinism part (canon, 'File g item 118 routed' |
| VDC0-07 | major | F-MISSING | model | g item 114's model part ('§2.7 Enceinte.condition — standing · worn · patched · breached · dismantled on item  |
| VDC0-08 | major | F-MISSING | pipeline | File f item 336 (BCR-V6-18 |
| VDC0-09 | major | F-MISSING | pipeline | File f item 343 (BCR-V6-9 |
| VDC0-10 | major | CONFLICT | determinism | §7.4 *Replay semantics* ('the one read-ahead … the one statement', base l.10241-10248) says the creation prefi |
| VDC0-11 | major | EDGE-UNDEFINED | determinism | E-07's outcome table (base l.9669-9703) dropped the archived F-EDIT case (DETERMINISM-0051, 0325) 'a plan edit |
| VDC0-12 | major | EDGE-UNDEFINED | determinism | §7.5's schema-transforms table (E-10, 'the' list; base l.10557-10586) lacks rows that §2 states and cites §7.5 |
| VDC0-13 | major | WIRING | determinism | The `Invariant` type is used by `KernelTx.expect |
| VDC0-14 | major | WIRING | determinism | §10.3 (base l.13904-13905) logs the 're-derive people' action as 'a `regenerate` event of scope `people` over  |
| VDC0-15 | major | CONFLICT | V07 | V07 re-rolls the woods' trees with `rerollLayer('forest')` bound to T10 `hold` (V07 l.1907, l.2759, l.3129 and |
| VDC0-16 | minor | CONFLICT | determinism | F-WALL's detection (base l.8364) accepts an open trace or stretch end 'anchored on … §2.7's closure-arc kinds  |
| VDC0-17 | minor | TERM | determinism | The retired form 'standalone neighbourhood' (G-standalone) survives in the binding's T1 row (base l.9750) |
| VDC0-18 | minor | BROKEN-REFERENCE | determinism | Four bare section numbers inside a volume's citation list read, under G-cite, as the base's (whose §3.x and §4 |
| VDC0-19 | minor | BROKEN-REFERENCE | determinism | DBR-01 is closed only in part |
| VDC0-20 | minor | LOST | determinism | The shell subtree the invariants compare is no longer named at its normative rows |
| VDC0-21 | minor | CONFLICT | determinism | §5.4's `stages[].warnings` comment (l.8481) enumerates seven underground codes as 'the underground's …', while |
| VDC0-22 | minor | WIRING | determinism | `GenerationReport.stages[].attempts` (l.8480) names as readers 'the report panel's summary and §13.2's cost-mo |
| VDC0-23 | minor | WIRING | pipeline | The raised-way generator's stream is registered in §6.1 as `raised.reason` (l.8714; J-A110.61) but its reader, |
| VDC0-24 | minor | WIRING | model | §2.7's raised-way support rules (l.2301, l.2324) draw on 'the raised-way stream' without naming its §6.1 conce |
| VDC0-25 | minor | WIRING | V06 | V06 calls the base's registered concern 'the base's raised-way stream' (W59 l.323, l.834, l.2325, l.2362, l.26 |
| VDC0-26 | minor | ID | determinism | ID-TOOL (a bare T1–T12 is written with its word at first use in a paragraph or row) is broken at l.9725 'ride  |
| VDC0-27 | minor | WIRING | determinism | §5.2's detection cells omit causes the kernel routes to them (kernel cross-part notes 15, 17, 20) |
| VDC0-28 | minor | WIRING | determinism | `TableId` is used at base l.2496 (SliceRef), l.9440 (editTable), l.10634 (reference cells) and l.14023, and V1 |
| VDC0-29 | minor | BROKEN-REFERENCE | determinism | §7.7's `Assignment.drift` comment (l.10817) says `DriftBounds` is 'typed in V02 §2.1 (item 385)'; it is declar |
| VDC0-30 | minor | BROKEN-REFERENCE | determinism | §7.7's replay-record paragraph (l.11117-11120) places the peak, its `symbolic` mark, the coarse epochs and the |
| VDC0-31 | minor | CONFLICT | determinism | §5.1's `WorkUnit` union (l.8262) lacks `'moduleCells'`, which §4.12 (l.8175 |
| VDC0-32 | minor | WIRING | determinism | §10.2 (l.13627) reads a temple's dedication from '`deityName` when present (§7.7 DR14)', but DR14 (l.11089) na |
| VDC0-33 | minor | CONFLICT | determinism | J-A73.06 (l.20207; W-DOS-05's ruling) says '§7.7 item 1 lists `powerStructure.previousGovernments` as never re |
| VDC0-34 | minor | CONFLICT | V08 | V08's field table (l.623) still maps `powerStructure.previousGovernments[]` to `government.previous` with read |
| VDC0-35 | minor | CONFLICT | determinism | DR1's bar (l.11076) 'a coastal dossier has a coast, a riverside one a river, a port one a harbour basin' reads |
| VDC0-36 | minor | WIRING | determinism | E-07's table claims to be 'the one home of every refusal, conflict and bend cause', but lacks the stale-base c |

### VDC0-01 — blocker — NUANCE-LOST — owner: pipeline

**Claim.** The F-CUT test bar 'on 10^5 random concave and holed faces the ladder ends in <= 6 kernel calls and the face count never decreases' (archive §5.2 F-CUT, l.6894; DETERMINISM-0029, whose home RESTATEMENTS-002 rules to be §4.6 step 8 (a)) is stated nowhere in the set: live F-CUT (base l.8356) cites '§4.6 step 8 (a)'s bars on 10^5 random concave and holed faces (the kernel-call bound; the face count never decreasing; the residue band per district)', but §4.6 step 8 (a) (l.5973-5999) holds only the 36° turned frames, the 2 x upper-block-area bound and the <= 5 % residue soft bound; no other base, volume or §13 text states the six-call bound or the face-count property.

**Required change.** In §4.6 step 8 (the ladder paragraph, after the <= 5 % residue sentence) add: '*Bars (M0 b):* on 10^5 random concave and holed faces the ladder ends in <= 6 kernel calls and the face count never decreases; each district reports its residue share (soft bound <= 5 %).' so F-CUT's citation '§4.6 step 8 (a)'s bars' resolves; leave F-CUT's row as it is.

### VDC0-02 — blocker — NUANCE-LOST — owner: determinism

**Claim.** The construction of render.stampTiles' constant entity key is lost: the §6.1 registry row (base l.8703) reads 'a constant entity key with STAGE_VIEW and reroll, attempt, epoch and salt 0, as §8.10 states', but §8.10 (l.12925-12980) states only the creation indices (0-3 tiles, 4 the band) and itself defers to '§6.1's registry entry'. The archived key definition — the four 32-bit-lane finalisers (as for the seed key) over the words (stamp-tile domain, decoration class index, the reference spacing 400 cm, creation index) (archive l.7127-7129; DETERMINISM-0148, whose canon REFERENCE matched RENDERING-0350 only 'near') — appears nowhere, so the shipped tiles' seeds are unspecified.

**Required change.** In the §6.1 row `render.stampTiles` replace 'a constant entity key with STAGE_VIEW and reroll, attempt, epoch and salt 0, as §8.10 states' by 'a constant entity key — the four 32-bit-lane finalisers (as for the seed key) over the words (stamp-tile domain, decoration class index, the reference spacing 400 cm, creation index: 0-3 for the class's four tiles, 4 for their shared border band) — with STAGE_VIEW and reroll, attempt, epoch and salt 0'.

### VDC0-03 — blocker — NUANCE-LOST — owner: determinism

**Claim.** What a per-level geometry digest hashes is lost: §6.2 (base l.8812) now reads '(§3.3's per-level digests along each commit record's dirty set, ...)', but §3.3 (l.3399-3402) only says the commit re-hashes 'the per-level plat digests' and points to §6.2, and §2.2 (l.730) also points to §6.2. The archived definition — 'each arena keeps a digest per level over its level-n route — vertices, roles, face owners and kinds of level <= n, never arena slots' and 'the neighbour step's reversal restores the kerb's L2 digest exactly' (archive l.7292-7297; DETERMINISM-0166, whose canon REFERENCE matched KERNEL-0268, the unrelated held-vertex set) — is stated nowhere.

**Required change.** In §6.2's bullet 'Geometry is hashed once, by the kernel, per level' state: 'Each arena keeps a digest per level over its level-n route (§2.2) — vertices, roles, face owners and kinds of level <= n, never arena slots — updated along each commit record's dirty set (§3.3); a finer level's Steiner vertices are in that level's digest; promotions and demotions move a vertex or edge between levels' digests (the neighbour step's reversal restores the kerb's L2 digest exactly); kept finer content keeps its leaves.'

### VDC0-04 — major — F-MISSING — owner: determinism

**Claim.** g item 114's determinism part (canon, dated ruling 2026-09-30: '§7.1 and §7.4 (repairWall takes a material; lifecycle rows for worn and patched); §7.7 (a derivation row: defence readiness and wealth -> the generation-time condition at table shares)') is absent: the binding's T3 row (l.9752) and the walls edit-target row (l.9634) list `repairWall` without its material and omit `wearWall`, which V06 (l.695-696) and V09 (l.1620) carry; §7.4 has no row for `worn`/`patched`; §7.7 has no item-114 derivation row although V08 §3.16 (2), V10 and V11 (row 95) cite 'the item-114 row'; §7.7 item 1 (l.10925) still lists `defenseProfile` as never read while V08 §3.16 (2) reads `defenseProfile.readiness`.

**Required change.** Write item 114's part as new design: (1) §7.1 walls row and binding T3 row: `convert` `wearWall` (a standing run -> worn) and `repairWall { stretch?, material?: 'robust' | a V11 `walls.patchMaterials` row id }` (a breached run -> standing when robust, -> patched with a patch material; a patched run rebuilt robust), both T3 `wall`; (2) §7.4 rows for `wearWall` and `repairWall` with a material: create, read (`Enceinte.condition` run, material, last-change epoch), persist (log), regenerate (held by the run's knot profile, §2.2 rule 5), undo (inverse restoring the run's state, material and epoch), migrate (absent material reads robust); (3) §7.7 a DR row after DR40 (numbered by ID-DR): 'the enceinte's generation-time condition by run (item 114 (d))' | inputs `defence.readiness` (V08's `readiness` row), `wealth.label` (DR6) | rule: each run's condition at V11's `walls.condition` table shares for (readiness band, wealth level); with item 113's replay the replay's condition instead | chance `epoch.transform` or a named concern | bar: a vulnerable poor town shows patched and breached runs, a fortress in a rich city stands whole; (4) §7.7 item 1: '`defenseProfile` (… ) — except `defenseProfile.readiness`, read for item 114'.

### VDC0-05 — major — F-MISSING — owner: determinism

**Claim.** g item 117's determinism part (canon, 'File g item 117 routed': '§7.7 (a derivation row: the dossier's calendar week and season -> the default view season; the climate's source order: SettlementForge's climate digest, else terrain type with height, else the user's)') is absent from §7.7 (no season, festival or item-117 text in l.10725-11275); V08 §3.16 (4) (W64) and V10 cite 'the item-117 row'/'§7.7's calendar row (item 117)'.

**Required change.** Add to §7.7's derivation table a row (numbered by ID-DR after DR40): 'the default view season (item 117; a look only, never in the model or its hash)' | inputs `HostContext.week` (the campaign's `calendar.elapsedWeeks`), the `calendar` row (`sf445`), the realm block's climate word through the `climates` row, `site.terrain` with the relief | rule: under §2.9's 'follow SettlementForge' flag the view's year position is `week mod 52` (no week: the view keeps its own, midsummer by default); the biome's climate row is SettlementForge's climate word, else the `climates` row's terrain column, else the user's blueprint choice, with the height correction on the map's relief; a later climate word is reported, never re-drawn | chance none | bar: a dossier map opens on its campaign week; no season changes a digest. Cite V08 §3.16 (4) for the port side.

### VDC0-06 — major — F-MISSING — owner: determinism

**Claim.** g item 118's determinism part (canon, 'File g item 118 routed': '§7.7 (traditions off the ignore-list: its window and staging consumed through a derivation row; the ignore-list entry amended; the week from item 117's year position)') is absent: §7.7 item 1 (l.10927) still lists `traditions` among the keys the port never reads, while V08 §3.16 (5), W65 and l.636 read `traditions[]` and the custom-content traditions bucket and feed 'the carried trad: facts -> §7.7's traditions row' — a row that does not exist (V10 also cites it).

**Required change.** Remove `traditions` from §7.7 item 1's never-read list ('`traditions` is read for item 118, V08 §3.16 (5)') and add a derivation row (after DR40, ID-DR): 'festival decorations (item 118; a look only)' | inputs the carried `tradition` facts (`trad:` keys, kind by the `festivals` row, window in weeks of the sf445 year, staging keys, deity), `site.culture` | rule: a festival's decorations show while the view's week (item 117's year position) lies inside its window, placed by §8.2's decoration rows at the named or keyed place, else the kind's fallback; a window without a readable week is unscheduled (preview only); two festivals in one week both show | chance: the decoration rows' keyed placement (named concern or none) | bar: no festival changes a digest.

### VDC0-07 — major — F-MISSING — owner: model

**Claim.** g item 114's model part ('§2.7 Enceinte.condition — standing · worn · patched · breached · dismantled on item 575's knot profile; each run's material (robust or a patch row) and the epoch of its last change') is absent from §2.7: the condition paragraph (base l.2286-2290) knows standing, breached, dismantled and abandoned only, while V06 (l.812, W79, W89) and V09 already use worn and patched with a material; the determinism rows VDC0-04 asks for have no record to read.

**Required change.** §2.7: extend `Enceinte.condition`'s state set to `standing` | `worn` | `patched` | `breached` | `dismantled`, each run carrying `material: 'robust' | <walls.patchMaterials row id>` and `lastChangeEpoch`, with writers `wearWall`, `repairWall` (with material) and V06 §3.7.7's transitions, readers §8.2's wall state rows and §11 exports, absent material reading robust.

### VDC0-08 — major — F-MISSING — owner: pipeline

**Claim.** File f item 336 (BCR-V6-18: the history engine's two stage exceptions and tiers (5′)/(5″)) is applied nowhere: the canon routes it to determinism (§5.3), the determinism rewrite cross-noted it to §4.11 because its text is §4.11's, and §4.11's *Regrowth-first* paragraph (base l.7891-7905) still ends 'an epoch whose residual is ≤ 0 grows no stage and adds no face' with no exception, while V06 (l.1323) cites 'the two exceptions (file f item 336)' as applied.

**Required change.** In §4.11 *Regrowth-first* replace the last clause by BCR-V6-18's text: '… grows no stage and adds no face — the owner-staged history engine's two exceptions excepted (V06 §3.6): a stage for the overflow backlog, whose households are those its overflow ladder housed in earlier epochs, and a decrowding stage, whose households are the crowded ones it moves. That engine places its own tiers between (5) and (6): (5′) the upgrade of downgraded ways and the reopening of retired ones (V07's hollow ways, `reopenWay`) and (5″) crowding within a factor of the band row (V06 §3.8); and every placement that engine makes on a plot whose access edge is a retired way reopens that way, with any retired way on its path to the ways in use, in the same batch first (V06 §3.8.2).'

### VDC0-09 — major — F-MISSING — owner: pipeline

**Claim.** File f item 343 (BCR-V6-9: the epoch's wealth level and an advance's provenance) is not applied at its base home: §4.11's `interface EpochInputs` (base l.7619-7624) declares no `wealthLevel` and no `advance` (with V06-ICONF-3's `stoppedAt?`), yet §6.2 (l.8906-8908) records 'EpochInputs.wealthLevel … and an epoch's advance provenance' and DR6 (l.11081) reads `EpochInputs.wealthLevel` (W-DOS-02) — dangling inputs; only V06 §2.3 (l.586-589) declares them 'on EpochInputs (file f item 343)'.

**Required change.** Add to §4.11's `EpochInputs`: `wealthLevel?: number /* the intent wealth level at the epoch: a dossier's wealth.label through tables/dossier/wealth (DR6), or the trajectory's; absent: the level in force */; advance?: { group: string; index: number; of: number; stoppedAt?: number /* the group's last epoch only, when Stop ended it early */; trajectory?: Trajectory /* index 0 only */ } /* file f item 343; V06 §2.3 */`, and let V06 §2.3 cite it.

### VDC0-10 — major — CONFLICT — owner: determinism

**Claim.** §7.4 *Replay semantics* ('the one read-ahead … the one statement', base l.10241-10248) says the creation prefix is the events flagged `creation` whose `assign` events (the blueprint's and the creation dossier's) S2 reads as fixed rows before it runs; under history-first generation §4.11 (2) (l.7667-7669) and V06 §3.20.3 append the replay's `epoch` events to the creation prefix (flag `creation`, citing §7.4) and withhold the dossier's present records until the last replay epoch's dossier step — neither case is in §7.4, so §7.4 contradicts the replay on what S2 reads at the peak or founding population.

**Required change.** In §7.4 *Replay semantics* add: 'Under history-first generation (§4.11 *History-first generation* (2); V06 §3.20.3) the creation prefix also holds the replay's `epoch` events, appended by the runner after `generate` and flagged `creation` (never undo, redo or revert targets, never truncated); S2 then runs at the plan's start population without the creation dossier's `assign` events, which the last replay epoch applies at its dossier step (e) by least disruption, so the replay ends meeting the dossier's present facts exactly.'

### VDC0-11 — major — EDGE-UNDEFINED — owner: determinism

**Claim.** E-07's outcome table (base l.9669-9703) dropped the archived F-EDIT case (DETERMINISM-0051, 0325) 'a plan edit that would leave a room … unreachable' (archive l.6915 and §7.1 l.7988) and no longer names `setRoomUnit`; its plan row covers only a room below its row's minimum area and a unit without its own door. No row, no V03 §4.2 bend and no V09 key defines the outcome of a plan edit (e.g. `setOpening` kind 'none' on a room's only door, `moveWall`, `splitRoom`) that leaves a room unreachable, although E-07's equivalence list requires each case its own row.

**Required change.** Add to §7.1's outcome table: '| a plan edit (`setOpening`, `moveWall`, `splitRoom`, `mergeRooms`, `moveStairCore`) or a `setRoomUnit` leaving a room unreachable from the main entrance, or a unit without its own door (item 28 (f)) | bent | the nearest lawful form that keeps every room reached — the door kept, or moved to the nearest wall of the room whose other side reaches circulation (V03 §4.2) | `bend.room.unreachable` |', and have V03 §4.2 and V09 §4.9 carry the bend and its key.

### VDC0-12 — major — EDGE-UNDEFINED — owner: determinism

**Claim.** §7.5's schema-transforms table (E-10, 'the' list; base l.10557-10586) lacks rows that §2 states and cites §7.5 for: a way's `slopeP95` written on load by S9's rule and a stored `flowToward` dropped (§2.4 l.1052-1053), a block without `content` reading `ordinary` and a stored square type `market` reading `trading` (§2.5 l.1242-1243), a water body without `spring`/`fedBy` (§2.3 l.989); and `Document.nextGroundPart` (l.2745) has no older-document default anywhere, so migrating a pre-item-110 document is undefined for it.

**Required change.** Add rows to §7.5's table: '| a way's `slopeP95`; a stored `flowToward` | — ; dropped | written by S9's rule from the terrain along the spine | 77 |', '| a block's `content`; a square's type `market` | `ordinary`; `trading` | — | V01 |', '| a water body's `spring`; a grove's or garden's `fedBy` | none (no spring; fed by none) | — | 111 |', '| `nextGroundPart` | 1 (part 0 the ground's; an older document has no raised part) | — | 110 |'.

### VDC0-13 — major — WIRING — owner: determinism

**Claim.** The `Invariant` type is used by `KernelTx.expect: Invariant[]` (base l.3253) and `StageDecl.invariants: Invariant[] /* each with its scope, §5.3 */` (l.8146) but declared nowhere in the base or the volumes (a dangling type on two base interfaces); the kernel rewrite's cross-part note 18 (W-FLD-01) asks §5.3 to declare it and §5.1 to state that `onFail`'s reject / repair / downgrade are tiers 1 / 2 / 4.

**Required change.** Declare in §5.3: `interface Invariant { name: string; scope: 'batch'|'stage'|'save'|'load'|'ci'; class: 'hard'|'soft'; check: string /* the row's check, §5.3 */ }` (scope as GenerationReport.stages[].invariants reads it), and add to §5.1 (the tier table's note): '`KernelTx.onFail`'s `reject`, `repair` and `downgrade` are tiers 1, 2 and 4 (§3.3)'.

### VDC0-14 — major — WIRING — owner: determinism

**Claim.** §10.3 (base l.13904-13905) logs the 're-derive people' action as 'a `regenerate` event of scope `people` over the chosen households (§7.1)', but §7.1's `EditScope` (l.9373) is `{ ids } | { ring, key, level } | { kind: 'shade'; island }` with no `people` member (WG-PIPE-08; the pipeline rewrite's cross-part note), so the action has no event form and no lifecycle row.

**Required change.** Add to `EditScope`: `| { kind: 'people'; households: Id[] } /* §10.3's re-derive people: a diffed re-derivation of the chosen households' people (§7.5's diffed pattern) */`, name it in the binding (T9 `shape` or the producer row) and in §7.4's regenerate row (undo: the former people records).

### VDC0-15 — major — CONFLICT — owner: V07

**Claim.** V07 re-rolls the woods' trees with `rerollLayer('forest')` bound to T10 `hold` (V07 l.1907, l.2759, l.3129 and its T10 row l.2955), but base §6.1 registers `forest` as a non-rerollable S12 concern — the rerollable set is exactly naming, render.instances, style.jitter, style.crowns, style.compass, naming.emblem and village.track — and `rerollLayer`'s concern type is generated from that set with its schema refusing any other key, so V07's action would be refused; V07 l.3129 itself says the trees are `render.instances` draws, which the base binding homes at T12 `dress` (l.9762).

**Required change.** In V07 (l.1907, l.2759, l.3129 and the T10 row) write 're-roll the woods' trees: `rerollLayer('render.instances')` scoped to the wood (base §6.1, T12 `dress`)', and drop 'rerollLayer('forest') … bound to T10 `hold`'.

### VDC0-16 — minor — CONFLICT — owner: determinism

**Claim.** F-WALL's detection (base l.8364) accepts an open trace or stretch end 'anchored on … §2.7's closure-arc kinds (shore, cliff, gorge, marsh, sheer) and … enceinte', omitting the anchor kind `bank`, which §2.7's `Enceinte.anchors[].on` (l.2100), item 106 (a) ('each stretch's ends anchored on its barrier (the existing anchor kinds)') and the archived row ('an end not anchored on shore, bank or cliff') admit; read literally a river-loop neck stretch anchored on its banks is an F-WALL failure.

**Required change.** In F-WALL's detection write 'an open trace or stretch has an end anchored on none of §2.7's anchor kinds (`Enceinte.anchors[].on`: shore, bank, cliff, gorge, marsh, sheer, enceinte; item 106; J-VI.3)'.

### VDC0-17 — minor — TERM — owner: determinism

**Claim.** The retired form 'standalone neighbourhood' (G-standalone) survives in the binding's T1 row (base l.9750): 'a standalone neighbourhood's outline'.

**Required change.** Write 'a standalone neighbourhood document's outline'.

### VDC0-18 — minor — BROKEN-REFERENCE — owner: determinism

**Claim.** Four bare section numbers inside a volume's citation list read, under G-cite, as the base's (whose §3.x and §4.4 exist): l.8429 'the sky (V05 §3.2 (6), §3.7–§3.10, …)' (base §3.7–§3.10 are kernel sections), l.9640 'the village (V07 §4.1, §4.4)', l.11101 '(V01 §3.3, §3.5; item 384)', l.11107 'V04 §3.5.1 and §3.10'.

**Required change.** Write 'V05 §3.7–V05 §3.10', 'V07 §4.4', 'V01 §3.5' and 'V04 §3.10' at those places.

### VDC0-19 — minor — BROKEN-REFERENCE — owner: determinism

**Claim.** DBR-01 is closed only in part: F-SITING's detection cell (base l.8367) still cites '(§4.5 (5); J-A72.50)', where §4.5 holds two numbered lists and (5) of the first is the sky pseudo-districts; the where-cell was fixed to '§4.5's band range'.

**Required change.** Write '(§4.5's band range, item 72 (d‴); J-A72.50)' in F-SITING's detection cell.

### VDC0-20 — minor — LOST — owner: determinism

**Claim.** The shell subtree the invariants compare is no longer named at its normative rows: §5.3's interior-ladder row (l.8421) checks 'the shell's leaf digest' and the epoch row (l.8426) reads shells 'as the interior-ladder row reads them', but neither states the archived subtree (wings, heights, entrances, roof, basement; archive l.6941, l.6946); §2.6 (l.2081) points back to §5.3 and T28-14, and only T28-14 (l.15741) lists it.

**Required change.** In §5.3's interior-ladder row write 'the shell's leaf digest (its wings, heights, entrances, roof and basement) byte-identical …'.

### VDC0-21 — minor — CONFLICT — owner: determinism

**Claim.** §5.4's `stages[].warnings` comment (l.8481) enumerates seven underground codes as 'the underground's …', while V04's stage-warnings row (V04 l.278; its §1b.1, item 338) lists twelve (adding W_RUIN_SOURCE_REMOVED, W_RUIN_MONUMENT_SKIPPED, W_ARCH_VAULT_NO_DOOR, W_TERMINAL_CISTERN_SKIPPED, W_BURIED_FORMER_SKIPPED) — V04's cross-part note 1.

**Required change.** Replace the enumeration by a citation: 'a stage's own non-kernel warning codes — the underground's, V04 §1b.1 (item 338)'.

### VDC0-22 — minor — WIRING — owner: determinism

**Claim.** `GenerationReport.stages[].attempts` (l.8480) names as readers 'the report panel's summary and §13.2's cost-model tests', but V09 §5.7's Report panel reads no attempts count (its Details list the ladder uses, kernel warnings and timings) and §13.2 has no attempts reader; the only reader is §13.5's ladder-use row (l.16427: 'p99 <= 3 attempts').

**Required change.** Write '/* the stage's tier-3 retries (its ladderUses at attempt > 0); read by §13.5's ladder-use row */', or have V09 §5.7's Details show it and name that reader.

### VDC0-23 — minor — WIRING — owner: pipeline

**Claim.** The raised-way generator's stream is registered in §6.1 as `raised.reason` (l.8714; J-A110.61) but its reader, §4.3's raised-way generator (l.5148-5149), calls it only 'the raised-way stream', so the registry row's reader end never names its concern.

**Required change.** In §4.3 write 'one uniform per key on `raised.reason` (§6.1; epoch component 0)'.

### VDC0-24 — minor — WIRING — owner: model

**Claim.** §2.7's raised-way support rules (l.2301, l.2324) draw on 'the raised-way stream' without naming its §6.1 concern `raised.reason`.

**Required change.** Write '`raised.reason` (§6.1)' for 'the raised-way stream' at l.2301 and l.2324.

### VDC0-25 — minor — WIRING — owner: V06

**Claim.** V06 calls the base's registered concern 'the base's raised-way stream' (W59 l.323, l.834, l.2325, l.2362, l.2691, l.2717) without its id `raised.reason` (base §6.1; the determinism rewrite's cross-part note to V06).

**Required change.** Write '`raised.reason` (base §6.1)' at those places.

### VDC0-26 — minor — ID — owner: determinism

**Claim.** ID-TOOL (a bare T1–T12 is written with its word at first use in a paragraph or row) is broken at l.9725 'ride T2–T6 and T8–T10', l.10264 'T2–T5 with resampling' and l.10297 'T11' (between T9 `shape` and T5 `quarter`).

**Required change.** Write 'T2 `ground` – T6 `place` and T8 `fill` – T10 `hold`', 'T2 `ground` – T5 `quarter`' and 'T11 `name`'.

### VDC0-27 — minor — WIRING — owner: determinism

**Claim.** §5.2's detection cells omit causes the kernel routes to them (kernel cross-part notes 15, 17, 20): §3.1 routes `E_HOLE_CONTACT` and the class-floor codes to F-CUT, `E_SELF_INTERSECT` to F-OUTLINE, `E_NO_PATH` to F-RIVER (l.3100-3108); §3.8 (l.4224) routes 'an input the numeric contract refuses' to F-SKELETON; §3.10 (l.4310) routes a stored-reference `E_INVARIANT` after an edit to F-REDERIVE — none of these is named in the receiving row.

**Required change.** Add to the detection cells: F-CUT '`E_HOLE_CONTACT`; `E_BELOW_MIN_WIDTH`/`_AREA`/`_ANGLE` of the class floors'; F-CORRIDOR and F-PLOT '(`E_BELOW_MIN_WIDTH`/`_AREA`/`_ANGLE`)'; F-OUTLINE '`E_SELF_INTERSECT`'; F-RIVER '`E_NO_PATH`'; F-SKELETON 'or an input §3.8's numeric contract refuses (a corner sharper than 5°, a hole touching the outer ring or another hole)'; F-REDERIVE 'a stored reference §3.10 finds unresolved after the edit (`E_INVARIANT`)'.

### VDC0-28 — minor — WIRING — owner: determinism

**Claim.** `TableId` is used at base l.2496 (SliceRef), l.9440 (editTable), l.10634 (reference cells) and l.14023, and V11 §2.8 (l.243) says 'TableId is §7.6's (MC-11)', but §7.6 declares no `type TableId` (the model's and V11's cross-part notes).

**Required change.** Declare in §7.6: `type TableId = string;   // a registry id (V11 §3.1): dotted, stable, never reused — 'roster.classes', 'siting.families', 'dossier.kinds', 'era' … (MC-11)`.

### VDC0-29 — minor — BROKEN-REFERENCE — owner: determinism

**Claim.** §7.7's `Assignment.drift` comment (l.10817) says `DriftBounds` is 'typed in V02 §2.1 (item 385)'; it is declared at §2.6 (l.1313: 'declared here; … V02 §2.1 cites it', MC-11).

**Required change.** Write 'typed in §2.6 (MC-11)'.

### VDC0-30 — minor — BROKEN-REFERENCE — owner: determinism

**Claim.** §7.7's replay-record paragraph (l.11117-11120) places the peak, its `symbolic` mark, the coarse epochs and their events 'in V06's history record'; the persisted record is §2.7's `HistoryRecord` (l.2265: 'model data in the digest; read by … §7.7's history rows'), V06 §2.14's `ReplayPlan` being never persisted (the model's cross-part note).

**Required change.** Write '… carries the replay's record — §2.7's `HistoryRecord` (its peak with `symbolic` and evidence, its coarse epochs and the events each played, refoundings, buried systems; written by V06's replay) — which …'.

### VDC0-31 — minor — CONFLICT — owner: determinism

**Claim.** §5.1's `WorkUnit` union (l.8262) lacks `'moduleCells'`, which §4.12 (l.8175: '`WorkUnit` (§5.1) gains `'moduleCells'` for the plan stage') and V03 (l.792: `unit: 'moduleCells'`) use (item 324; the pipeline rewrite's cross-part note).

**Required change.** Add `| 'moduleCells'` to `WorkUnit` with the comment '/* the plan stage: a storey's piece area ÷ moduleCm² (V03 §3.4; item 324) */'.

### VDC0-32 — minor — WIRING — owner: determinism

**Claim.** §10.2 (l.13627) reads a temple's dedication from '`deityName` when present (§7.7 DR14)', but DR14 (l.11089) names no `religion.deityName` among its inputs (the pipeline rewrite's cross-part note).

**Required change.** Add to DR14's inputs '`religion.deityName` (the principal temple's dedication, §10.4)'.

### VDC0-33 — minor — CONFLICT — owner: determinism

**Claim.** J-A73.06 (l.20207; W-DOS-05's ruling) says '§7.7 item 1 lists `powerStructure.previousGovernments` as never read', but §7.7 item 1's never-read list (l.10918-10927) does not name it; and §4.11's dating rung (l.7710) does read `previousGovernments[].tick`.

**Required change.** Add to §7.7 item 1's never-read list '`powerStructure.previousGovernments` (beyond its entries' `tick`, which §4.11's dating rungs read; J-A73.06)'.

### VDC0-34 — minor — CONFLICT — owner: V08

**Claim.** V08's field table (l.623) still maps `powerStructure.previousGovernments[]` to `government.previous` with readers 'V06's chronicle; V10's history answer', against J-A73.06 (the field dropped, no mechanism reading it) and scope's cross-part note ('V08: drop `government.previous` from its digest and adapter').

**Required change.** Drop the row (and `government.previous` from `DossierDigest`), keeping only the entries' `tick` for §4.11's dating rung, or mark the row ignored with J-A73.06's reason.

### VDC0-35 — minor — CONFLICT — owner: determinism

**Claim.** DR1's bar (l.11076) 'a coastal dossier has a coast, a riverside one a river, a port one a harbour basin' reads as a standing bar, while the site is creation-only (V08 §2.7; W-DOS-08: a later site change is skipped with `frozen_fact_changed`), so a later coastal word would fail it; V08's cross-part note asks it be a creation bar.

**Required change.** Write 'at creation, a coastal dossier has a coast, …; a later site change is reported, never re-derived (V08 §3.5)'.

### VDC0-36 — minor — WIRING — owner: determinism

**Claim.** E-07's table claims to be 'the one home of every refusal, conflict and bend cause', but lacks the stale-base conflict §11.2 returns (`ConflictAction` kind `stale`, 'a stale base', l.14303-14306) and V09 words (`refuse.stale`); and since a value outside its range is now bent (`bend.invalid`), §11.2's `ConflictAction` kind `invalid` has no producing row.

**Required change.** Add '| a preview or apply whose base changed before commit (§11.2) | conflict | a new preview | `refuse.stale` |' and state which outcome rows return which `ConflictAction` kinds (retiring `invalid` with rendering if no row produces it).

## 5. Result

Not clean: 36 open issues (3 blocker, 12 major, 21 minor). The three blockers are nuance lost through restatement cuts whose canon REFERENCE target did not hold the fact (VDC0-01 at pipeline's §4.6 step 8; VDC0-02 and VDC0-03 through 'near' canon matches). The majors are the determinism parts of g items 114, 117 and 118 (and the model's part of 114), file f items 336 and 343 left unapplied at §4.11, the creation prefix under history-first generation, two undefined edges, two dangling types or scopes, and V07's refused re-roll. No retired term but one, no deferral wording, no narration, no broken id; doc checks exit 0 (provisional: reference corpus absent).

The structured result is `docs/validation/coherence/results/coherence_verify-determinism-r0s.json`.
