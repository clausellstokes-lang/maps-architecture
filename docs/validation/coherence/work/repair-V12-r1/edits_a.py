# Edits A: §0, §1, §1b, §2.7b, §2.8, §2.13
import os
S = os.path.dirname(os.path.abspath(__file__))
L = open(os.path.join(S, 'V12.orig.md'), encoding='utf-8').read().split('\n')


def add(E, RETITLE):
    # ---------------------------------------------------------------- §0 (G120-V12)
    h = '## 0 In plain words'
    E(h, """seasons (item 117)
and festival decorations (item 118) each get their bars here;""",
      """seasons (item 117),
festival decorations (item 118) and Find, the view that makes what a user looks for glow on the map (item 120), each get
their bars here;""", tag='G120 §0')
    E(h, """and a season or a
festival never changes the map itself — both proved by byte-for-byte pins.""",
      """and a season, a
festival or a Find view never changes the map itself — both proved by byte-for-byte pins.""", tag='G120 §0')

    # ---------------------------------------------------------------- §1
    h = '## 1 Scope, the base hooks consumed, and what is out of scope'
    E(h, 'the harness parts of items 111–119 (V12 §3.15)', 'the harness parts of items 111–120 (V12 §3.15)', tag='G120')
    E(h, """| §8.2's style check and variants (item 112); §2.9's view state (items 117, 118); §8.8's zoom-out limit (item 116) | item 112's register line; the view-invariance pins; item 116's bars (V12 §3.15) |""",
      """| §8.2's style check and variants (item 112); §2.9's view state (items 117, 118, 120); §8.8's zoom-out limit (item 116); §11.2's gazetteer under knowledge admission and §12.5's overlay budget (item 120) | item 112's register line; the view-invariance pins; item 116's bars; item 120's match, knowledge, persistence, pin and cue statistics and its interaction timings (V12 §3.15) |""", tag='G120')
    E(h, """among them every fixture bar of items 105–118
that is a plain conformance check""", """among them every fixture bar of items 105–118
and 120 that is a plain conformance check""", tag='G120')

    # ---------------------------------------------------------------- §1b
    h = '## 1b Wiring table'
    E(h, "`ruin.survival`, `shade.gap` and the item-111–119 metrics (3.4.2, 3.15)",
      "`ruin.survival`, `shade.gap` and the item-111–120 metrics (3.4.2, 3.15)", tag='G120')
    E(h, "`Enceinte.condition`, the view state and its renders |",
      "`Enceinte.condition`, the view state and its renders, Find's matches (V09's `live.find` over §11.2's gazetteer) |", tag='G120')
    E(h, """| the wait timer and the budget-register check of item 119 (3.15.9) | §12.1's timing phase on B-CITY's browser runs; §12.10's rows | the `wait.*` report rows; T-V12-50; the release's budget section | §12.1, §12.10 |""",
      """| the wait timer and the budget-register check of item 119 (3.15.9) | §12.1's timing phase on B-CITY's browser runs; V11 §3.25.8's `perf.qualitySpend` rows (registry row 106) with §12.10's rows | the `wait.*` report rows; each `perf.qualitySpend` row's verdict; T-V12-50; the release's budget section | §12.1, §12.10 |
| item 120's measurements (3.15.10): `item120.find`, the `find.*` statistics and the Find timings | the Find view key (§2.9) set by the fixtures' chip sets; §11.2's gazetteer at the view's key; V09's `live.find` overlay on V09's app harness, its key and click timer | the pin's off-state sets; the nightly statistics' C rows; the timing phase's interaction rows (3.15.9 (5)); T-V12-52 | §2.9, §11.2, §12.5 |""", tag='VV1112-06; G120')
    E(h, """| the calendar week and season; `traditions` | §7.7's season and festival rows (items 117 (c), 118) | a campaign dossier opening on its own week; a festival fixture's window | fixture records; the view-invariance pins read them as view inputs only |""",
      """| the calendar week and season; `traditions` | §7.7's season and festival rows (items 117 (c), 118) | a campaign dossier opening on its own week; a festival fixture's window | fixture records; the view-invariance pins read them as view inputs only |
| the institutions' names and kinds | DR9, DR24 | item 120 (b)'s list entries on the Find fixtures (the dossier's names first; V12 §3.15.10) | a fixture record of the manifest; read as view inputs only, never a calibration target |""", tag='G120')

    # ---------------------------------------------------------------- §2.7b
    h = '### 2.7b Share, sweep, paired and two-sample bars'
    E(h, """  | { kind: 'voidSealedDeep' }                            // item 109 (j) (5): per DEEP VOID — a connected component of a cavern or ruin system's parts of positive area whose
                                                          // tops lie deeper than DigRule.reachM below every footprint over them — sealed when no access reaches it""",
      """  | { kind: 'voidSealedDeep' }                            // item 109 (j) (5): per deep void (V12 §3.4.2's `void.*` row defines it) — sealed when no access reaches it""",
      tag='VV1112-13')
    E(h, """type Step = 'epoch' | 'regenerate' | { rederive: StageId } | { newRandom: 'system' } | 'upgradeReplay' | { dossierEvent: string } | 'extendGrowth'""",
      """type Step = 'epoch' | 'regenerate' | { rederive: StageId } | { newRandom: 'system' } | 'upgradeReplay' | { dossierEvent: string } | 'extendGrowth'
  | { week: number }                                      // item 117: the view's year position 0 – 51, set as the season control sets it — a look: the model, its digest and the save untouched""",
      tag='VAP-30 (T117i specs typed)')
    E(h, """  | 'patchesOldestFirst'      // item 114 (c): recovery replaces a wall's patched runs in the order of their epochs of last change""",
      """  | 'patchesOldestFirst'      // item 114 (c): recovery replaces a wall's patched runs in the order of their epochs of last change
  | 'noIceSnow'               // item 117 (i): no ice and no snow drawn at any step (`season.iceSnow` 0)
  | 'iceOrder'                // item 117 (i): every still water's first frozen step at or before every flowing water's, and no ice drawn on a mill race's or a weir's polygon (`season.iceOrder`)
  | 'seasonStyles'            // item 117 (i): T112-1's style check (`bar.T112-1`) passes at every step""",
      tag='VAP-30 (T117i specs typed)')

    # ---------------------------------------------------------------- §2.8
    h = '### 2.8 Panels and sittings'
    E(h, """  extras: ('house' | 'labels' | 'ladderStreet' | 'palette')[];""",
      """  extras: ('house' | 'labels' | 'ladderStreet' | 'item110Buildings' | 'styleReference' | 'palette')[];
                        // 'item110Buildings': V02 §7.5 (3)'s five items, one `reads` answer each; 'styleReference': one
                        // reference-family image shown beside a SOLO set, never rated (V04 §7's hatched-style render)""",
      tag='VAP-31; VAP-32')
    E(h, """// §13.6's D5Pair carries five variants (item 500): FM, VG, DW, AB ('reconcile' | 'history') and SOLO""",
      """type D5PairStaged =     // §13.6's `D5Pair` union names it (file f item 500): the five staged variants, one per pair, in seeds.json and the record
  | { reference: 'FM'; i: number; refCapture: string; platSeed: string; cls: string }                                     /* V02 §7.5 */
  | { reference: 'VG'; rung: 'THORP' | 'HAMLET' | 'VILLAGE'; tags: string; i: number; refSeed: string; platSeed: string }   /* V07 §8 */
  | { reference: 'DW'; i: number; refCapture: string; platSeed: string; cls: string; band: string }                         /* V03 §8, V3-P6 */
  | { reference: 'AB'; purpose: 'reconcile' | 'history'; rung: Rung; water: WaterSetting; i: number; platSeed: string;
      a: string; b: string /* each a recipe: output version, preset, and the layer or epoch it differs by */ }              /* V12 §3.10.6; V06 §12 */
  | { reference: 'SOLO'; rung: Rung; i: number; platSeed: string; recipe: string /* output version, preset, mode */ }     /* V04 §7 */""",
      tag='VV1112-11')
    E(h, """house?: 'A' | 'B' | 'C'; ladder?: { seed: string; reads: boolean }[] }""",
      """house?: 'A' | 'B' | 'C'; ladder?: { seed: string; reads: boolean }[];
  item110?: { item: string /* V02 §7.5 (3)'s item, by its seed label */; reads: boolean }[] }""", tag='VAP-31')

    # ---------------------------------------------------------------- §2.13
    h = '### 2.13 The no-op pins (V12 §3.7.8; E-20)'
    E(h, """  view?: { key: 'season' | 'festival'; values: string[]; tiles?: true };   // view: the view-state values the model digest and the saved bytes are invariant
                                          // across; `tiles`: also the view's tiles with no festival against the pre-item tile goldens (item 118 (h))""",
      """  view?: { key: 'season' | 'festival' | 'find'; values: string[]; tiles?: true };   // view: the view-state values the model digest and the saved bytes
                                          // (the edit log included) are invariant across — weeks; festival displays; Find `off` and each fixture chip
                                          // set, with `+gaps` for Show gaps on; `tiles`: also the tiles drawn with the view off — no festival
                                          // (item 118 (h)), Find cleared after its chips were on (item 120 (k)) — against the pre-item tile goldens""",
      tag='G120')
    # the table, rewritten whole (VAP-16, VAP-17, VAP-30's ids, VV1112-14, VV1112-18, G120)
    i0 = next(i for i, l in enumerate(L) if l.startswith('| pin | bar | kind | off form'))
    i1 = next(i for i in range(i0, len(L)) if L[i].startswith('| `item118.festival`'))
    old_table = '\n'.join(L[i0:i1 + 1])
    new_table = """| pin | bar | kind | off form (read from V11 §3.24.0 where V11 states it, else from the cells the bar names — E-20) | suites (their owners register them) |
|---|---|---|---|---|
| `item102.sun` | T102-1 | offForm | the cells T102-1 names | the golden suite and hook fixtures (base); V05's island fixture (T-V5-19 (c)); H-100 (V06, T-V6-12's `w_sun` clause) |
| `item103.coverage` | T103-3 | offForm | the cells T103-3 names | the golden suite; B-CITY's 200 seeds per rung (V11, T-V11-13); V05's island fixture (T-V5-22 (b)) |
| `item105.web`, `item107.spread` | T105-4, T107-4 | offForm | V11 §3.7.4's web off form; with it, the cells T107-4 names | the golden suite; B-CITY (V11); H-100 (V06, T-V6-44); V05's island fixture (T-V5-22 (k)); V07's village goldens (T-V7-33, on `item105.web`) |
| `item106.barrier` | T106-5 | offForm | the cells T106-5 names | the golden suite; V11's T-V11-19 fixtures; V05's island fixture (T-V5-27) |
| `item109.underground` | T109-6 | offForm | the cells T109-6 names | the underground goldens (V04, T-V4-47); V07's village goldens (T-V7-38) |
| `item110.raised`, `.terrace`, `.deck`, `.stepped` | T110-7 | offForm | V11 §3.24.0's switch table, one row set per family (the stepped family's `roster.specialisations` included, which a pin leaving it on would not isolate) | the golden suite and hook fixtures, B-DOSSIER-lite (base); the neighbourhood suite (V01, T-V1-4 (e)); B-MASS (V02, T-V2-50); B-PLAN and B-CITY-lite's plans (V03, T-V3-34); the underground goldens (V04, T-V4-69); the sky goldens (V05, T-V5-15) and V05's island fixture (T-V5-27's item-110 clause, on `.terrace`); H-100, H-AQUA, H-TERRACE, H-DECK (V06, T-V6-65); V07's village goldens (T-V7-52); the known-city canvas scripts (V09, T-V9-57); the reader goldens (V10, T-V10-43); B-CITY (V11, T-V11-31); K1, K2 (V12) |
| `item111.water` | T111-5 | offForm | V11 §3.24.0's `climate` dry-cell off form (the six cells) | the golden suite; an arid and a temperate site, 200 seeds per rung (V11, T-V11-38 (b)); V05's island fixture (T-V5-33's item-111 clause); H-100 (V06, T-V6-72); V07's village goldens (T-V7-58); V08's port fixtures (T-V8-50); the reader and why goldens (V10, T-V10-45) |
| `item113.history` | T113-7 | offForm | V11 §3.24.0's `history.replay` false (§4.11) | the golden suite; the underground goldens (V04, T-V4-77 (d)); the history fixtures (V06, T-V6-71); V07's village goldens (T-V7-59) |
| `item114.condition` | T114-8 | offForm | V11 §3.24.0's `walls.condition` off form | the golden suite (base; T114-8's generation clause); H-100 and H-WALLS, the wall fixtures (V06, T-V6-73); V07's palisade goldens (T-V7-62) |
| `item115.off` | T115-4 (T-V11-41 (b)) | offForm | V11 §3.24.0's `grandeur.ceiling` `enabled` false on every row | the golden suite; V07's village goldens |
| `item115.ceiling` | T115-4 | rungScope | — (`rungs`: TOWN, CITY, METROPOLIS) | the golden suite; B-MASS (V02); H-100 over epochs at TOWN and above (V06, T-V6-74); V08's port fixtures at TOWN (T-V8-53) |
| `item117.season` | T117-1 | view | weeks 0 – 51 | the golden suite; the sky goldens (V05); V07's village goldens (T-V7-65) |
| `item118.festival` | T118-1 | view (`tiles`) | display `off`, `follow` in every week, `preview` of each listed festival | the golden suite; V07's village goldens (T-V7-66); the festival fixtures |
| `item120.find` | §13.2's item-120 bar of item 120 (k)'s hash and tiles clauses | view (`tiles`) | Find `off`; each Find fixture's chip sets, Show gaps off and on (V12 §3.15.10) | the golden suite; V07's village goldens |"""
    E(h, old_table, new_table, tag='VAP-16, VAP-17, VAP-30, VV1112-14, VV1112-18, G120')
