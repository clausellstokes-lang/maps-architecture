# Head, §1, §1b, §2 — repair-V07-r1
def apply(d):
    # --- head: the citation sentence (VV78-16) and the owner-item range (VV78-02; item 120 filed since) ---
    d.sub("""states is cited, never restated; every new fact is stated once, here. **Citations:** a bare `§n` or `II.n` is the base's;
`Vnn §n` is a design volume's section, this one included (`V07 §3.2`); a list after a volume prefix stays in that volume
(`V06 §2.1, V06 §3.5.2` is two sections of V06); `item n` is an amendment item — items 1–118 the owner's, items 200 and""",
          """states is cited, never restated; every new fact is stated once, here. **Citations:** a bare `§n` or `II.n` is always the
base's; every design volume's section carries its prefix, `Vnn §n` — this one's included (`V07 §3.2`) and every item of a
list (`V06 §2.1, V06 §3.5.2`); `item n` is an amendment item — items 1–120 the owner's, items 200 and""", tag='VV78-16 head; VV78-02 head')

    # --- §1 in scope: items 119 and 120 join the list (VV78-02, G120) ---
    d.sub("""strips, commons, green and ponds through the year, autumn's fall covers included, V07 §5.1); item 118 (the festival decorations
of the village rungs, V07 §5.1).""",
          """strips, commons, green and ponds through the year, autumn's fall covers included, V07 §5.1); item 118 (the festival decorations
of the village rungs, V07 §5.1); item 119 (the village's one-time waits inside the comfort level, V07 §6); item 120 (Find at
the village rungs: the ends, fields and places as targets and the ends as Show gaps' units, V07 §5.5).""", tag='VV78-02/G120 §1 scope')

    # --- §1 out of scope: floating islands (VAL-16) ---
    d.sub("""**Out of scope, and why.** Floating islands (none reaches a village rung: §4.11 fells an island when the CITY band is
left, and TOWN holds none); the sewer network, catacombs, quarries, vaults, the buried town and the undercity at village
rungs""",
          """**Out of scope, and why.** Floating islands are V05's: no new island arises at a village rung (`layers.islands`
`none`), and an island a fallen city leaves wanes, settles and falls over its dwells at whatever rung (V05 §3.15 (6); V07
§3.12), the village phases reading none; the sewer network, catacombs, quarries, vaults, the buried town and the
undercity at village rungs""", tag='VAL-16')
    d.sub("""§3.19's founding, at CITY and METROPOLIS only (item 110 (b) as revised) — and""",
          """§3.19's founding, at CITY and METROPOLIS only (item 110 (b)) — and""", tag='VV78-20 (§1)')

    # --- §1b: W57, W58 readers (VV78-14) ---
    d.sub("""V04's foundation reach (V04 §3.5.0); the levelled ground |""",
          """V04's foundation reach (V04 §3.5.0); the ground datum (§2.6's `deriveBase`) |""", tag='VV78-14 W57')
    d.sub("""parts (W61); the levelled ground (§4.7); V07 §3.12's regrowth repair""",
          """parts (W61); the ground datum (§2.6's `deriveBase`); V07 §3.12's regrowth repair""", tag='VV78-14 W58')
    # W59: the key's type is §4.1's (VAL-12/VAL-13)
    d.sub("""| W59 | the `raised` data key and a raised way on a village map (V07 §2.7, V07 §3.5a) |""",
          """| W59 | the `raised` data key (§4.1's `RaisedRead`) and a raised way on a village map (V07 §2.7, V07 §3.5a) |""", tag='VAL-13 W59')
    # W78 (VPC-06)
    d.sub("""| §4.2 S10b's rung ceiling; §10.2 |""", """| §4.7 S10b's rung ceiling; §10.2 |""", tag='VPC-06 W78')
    # W77: patch rows' home (VV78-05)
    d.sub("""T3 `wall`'s `repairWall` with its material; V11's patch rows by kind and culture |""",
          """T3 `wall`'s `repairWall` with its material; `walls.patchMaterials`' rows by kind and culture (V11 §3.25.3) |""", tag='VV78-05 W77')
    # W82, W83 (VV78-02, G120)
    w81 = d.t[d.t.index('| W81 |'):]
    w81 = w81[:w81.index('\n')]
    d.sub(w81 + '\n', w81 + '\n' + W82 + '\n' + W83 + '\n', tag='VV78-02 W82; G120 W83')
    d.sub("""item-117 row → W80; `traditions[]` (their windows and staging) → §7.7's item-118 row → W81.""",
          """item-117 row → W80; `traditions[]` (their windows and staging) → §7.7's item-118 row → W81; the institution names → V08's
Find list entries (item 120) → W83.""", tag='G120 trace')

    # --- §2.1: ProductDecl extends V06 §2.1's ProductDeclEpoch (VAT0-18) ---
    d.sub(PD_OLD, PD_NEW, tag='VAT0-18 §2.1')

    # --- §2.2a: the deck comment (VV78-19) ---
    d.sub("""parapetM: M };           // V07 §3.10a (item 110 (d)); the least deck-plot depth is V11 §3.24.4's
""", """parapetM: M };           // V07 §3.10a (item 110 (d)); the least deck-plot depth is V11 §3.24.4's `minPlotDepthM` by deck kind (no village cell)
""", tag='VV78-19')

    # --- §2.4: the territory measures cited (VAL-11) ---
    d.sub(DIST_OLD, DIST_NEW, tag='VAL-11')
    # --- §2.4: PresenceWhen declared (VV78-06) ---
    d.sub("""* `threat` — a key of `PortValues.threats` holds (V08's `threats` row; V07 §3.11 DR2).

**Forced seats**""", """* `threat` — a key of `PortValues.threats` holds (V08's `threats` row; V07 §3.11 DR2).

```ts
interface PresenceWhen {   // a presence entry's condition (item 576 (a); §10.2's `presence`): every member stated must hold; the readings are the list above
  gov?: string[] /* GovernmentRow kinds */; with?: string; without?: string /* a class the roster holds, or lacks, drawn before this one */;
  site?: 'flowing'|'millSeat'|'water'; noSite?: 'flowing'|'millSeat'|'water';
  resource?: { key: 'ore'|'stone'|'timber'|'fish'|'clay'|'fertile'; min: number }; road?: string[] /* the drawn road topology (V07 §3.1 step 3) */;
  defenceMin?: number /* `defence ≥ v`: Intent.defence */; threat?: boolean /* a key of PortValues.threats holds */ }
```

**Forced seats**""", tag='VV78-06')
    # the crypt paragraph's revision narration (principle (5), with VV78-20)
    d.sub("""**Crypts and burial faces at village rungs** (item 109 (k) (2) as revised ~20:05, J111: "cathedral also gets crypts but""",
          """**Crypts and burial faces at village rungs** (item 109 (k) (2); J111: "cathedral also gets crypts but""", tag='VV78-20 (crypt para)')

    # --- §2.6 rows: the pins' author (VAT0-14) and the ground datum (VV78-14) ---
    d.sub("""the base's pin records (author `engine`, cause `rule:village.pins`)""",
          """the base's pin records (author `epoch`, cause `rule:village.pins`)""", tag='VAT0-14 §2.6')
    d.sub("""exports, the clerk, V04's foundation reach, the levelled ground, V07 §3.12 |""",
          """exports, the clerk, the ground datum (§2.6's `deriveBase`), V04's foundation reach, V07 §3.12 |""", tag='VV78-14 §2.6 wall')
    d.sub("""| S11 | the levelled ground (§4.7), render, T-V7-9""",
          """| S11 | the ground datum (§2.6's `deriveBase`), render, T-V7-9""", tag='VV78-14 §2.6 platform')

    # --- §2.7: RaisedRead is §4.1's (VAL-12 landed; VAL-13) ---
    d.sub(RR_OLD, RR_NEW, tag='VAL-13 §2.7')


W82 = """| W82 | the village's one-time waits (item 119; V07 §6) | V07 §6's target laws and measured figures; §12.1's reference machine; V11's `perf.qualitySpend` rows (none shipped for a village stage) | the comfort-level bar T-V7-67; V09 §4.21.9's progress view past one second; the VILLAGE row's declared target miss and the fallback's re-declared bar (V07 §6) | §12's comfort level, measured-gain and progress rules (item 119); §4.1's quality budget | — |"""
W83 = """| W83 | Find at the village rungs (item 120; V07 §5.5) — the list's village entries, the area targets (the ends, the village, the field groups), the named places, Show gaps' units (the ends) | §11.2's gazetteer at the view's effective key over the committed records; V11's lexicon (labels, synonyms, groups) with V07 §2.4's `v.` words; W24's ends, W21's fields, V07 §5.3's label rows; the view key `find` (§2.9) | V09's Find panel and its `live.find` overlay; §8.2's veil, halo, outline, pin and bubble rows; picture exports (V07 §5.4; §11.1); the clerk's "show me" (V10); T-V7-68 | §2.9's view key `find`; §11.2 (item 120) | the institution names (V08's list entries) |"""

PD_OLD = """```ts
interface ProductDecl {   // @plat/layout's registry entry for a product; the base registers 'base', @plat/village 'village'
  id: 'base' | 'village'; rungs: Rung[] /* the ladder.json rows it builds (Rung: §1.1) */; stages: StageDecl[] /* by declared I/O, §4.12 */;
  strategies: { network?: string; enceinte?: string; fabric?: string; river?: string; placement?: string; fieldSystems?: string[] };
  phases?: Partial<Record<'siting'|'growth', string>> /* the epoch phases this product's rungs replace (V07 §3.12; item 317) */;
  participants?: string[] /* EpochParticipants it registers at V06 §3.2's rows, each run at every epoch and gating itself by its scope
    (V06 §2.1): 'village.plan' (afterField, order 10, stage 'VS1', at a village rung); 'village.density' (afterField, order 20,
    stage 'VS2', while a superseded VillagePlan exists, under any product, so a re-derived old core runs the village fabric;
    J-V7.67); 'village.pins' (afterGrowth, order 60, stage 'VS8', at a village rung; J-V7.126); their draws key by those stages
    (§6.1) and their table reads are VS1's, VS2's and VS8's (V11 §3.1 row 61; J-V7.122) */;
  rows?: TableId /* the product's epoch rows, typed V06 §2.1's ProductEpochRows — for 'village', village.json's `epoch.rows` cell
    (V07 §2.2) — read by V06's decline and hinterland steps at this product's epochs (V06 §3.5.2, V06 §3.5.3) */;
  records?: string /* an EpochPlacement id (V06 §2.1), called by item 202's records hook — for 'village', 'village.records',
    stage 'S10b', whose placements, removals and keys are V07 §3.12 *Records at a village epoch* (J-V7.125, J-V7.129, J-V7.130) */;
  extraInputs?: Record<string /* a reused base stage's id */, string[] /* data keys added to its declared inputs */>
    /* the village adds `districts` to S7's inputs, so VS5 precedes S7, and `reservations.fair` to S12a's (V07 §3.0, §3.6 (4b)) */;
  tables: TableId[] /* TableId: §7.6; the product's own tables: village.json (V07 §2.2) */; version: string }
```"""
PD_NEW = """```ts
interface ProductDecl extends ProductDeclEpoch /* V06 §2.1's members phases?, participants?, rows?, records?, landed with item 202;
    the village's values are V07 §3.12's *The village's registration* */ {   // @plat/layout's registry entry for a product; the base registers 'base', @plat/village 'village'
  id: 'base' | 'village'; rungs: Rung[] /* the ladder.json rows it builds (Rung: §1.1) */; stages: StageDecl[] /* by declared I/O, §4.12 */;
  strategies: { network?: string; enceinte?: string; fabric?: string; river?: string; placement?: string; fieldSystems?: string[] };
  extraInputs?: Record<string /* a reused base stage's id */, string[] /* data keys added to its declared inputs */>
    /* the village adds `districts` to S7's inputs, so VS5 precedes S7, and `reservations.fair` to S12a's (V07 §3.0, V07 §3.6 (4b)) */;
  tables: TableId[] /* TableId: §7.6; the product's own tables: village.json (V07 §2.2) */; version: string }
```"""

DIST_OLD = """§3.5.2's default reading rules apply. At village rungs (item 576 (b)) `nearCentre` reads `dist.centre` measured to
`VillagePlan.heart`; `nearGate` reads `dist.gate` measured to the palisade's gates, else to the points where a `through`
way or a neighbour road crosses VS5's perimeter; `nearMarket` reads `dist.market` measured to the reservation that
carries the principal market rank (the open space, or the flanking square where there is none; V07 §3.6 (4)), else to the
first nucleus's open space, else to `VillagePlan.heart` — the secondary fair field (V07 §3.6 (4b)) never counted, since
it trades on fair days only; `nearHarbour` and a `harbour` need read `dist.harbour` measured to the wharf's `quay` way (V07
§3.10) where one is laid, else absent, and a class row's "at a port" reads "a wharf is laid" — a row with no such form,
finding no harbour, takes the base's closest option, reported, as at a base rung without one (J-V7.111)."""
DIST_NEW = """§3.5.2's default reading rules apply. At village rungs `nearCentre`, `nearGate`, `nearMarket` and `nearHarbour` (and a
`harbour` need) read `dist.centre`, `.gate`, `.market` and `.harbour` as §2.5 measures them at territory rungs (item 576
(b)); a class row's "at a port" reads "a wharf is laid" — a row with no such form, finding no harbour, takes the base's
closest option, reported, as at a base rung without one (J-V7.111)."""

RR_OLD = """// `raised` — the ground arena's parts from 1 read as one data key (item 110 (b); item 290); at village rungs produced by the kernel's
// declaration layer from the log and the standing records (V07 §3.0), never by a village stage; read by VS3–VS6, S10, S12a, the hinterland unit, VS8
interface RaisedRead { way: Id /* the raised way */; kind: 'viaduct'|'elevated'|'aqueduct'; origin: 'declared'|'generated' /* derived at read, never
  stored (item 244): declared when the way's lifecycle cause is an edit or a skeleton file, else generated — at village rungs one carried
  down from a CITY epoch */;
  reason?: string /* a generated way's reason key address (V06 §3.19), read by the clerk */; deck: PolygonCm /* the deck's plan footprint: the under-deck strip */;
  supports: PolygonCm[] /* footprints on ground part 0 (item 110 (b)'s piers) */; feet: [PointCm, PointCm] /* where its ramps or stairs meet part 0 */;
  spans: { from: number; to: number; state: 'standing'|'ruined'|'cleared' }[] /* between consecutive supports; item 244's span `state`,
    absent read as 'standing': 'ruined' by V06 §3.19.2's breach, 'cleared' by its dismantle */;
  channel?: { unbroken: boolean; delivery: PointCm[] /* the fountain or basin pins and a cistern terminus it feeds */ } /* an aqueduct only */ }
"""
RR_NEW = """// `raised` — the ground arena's parts from 1 read as one data key (item 110 (b); item 290), its value one `RaisedRead` per raised way: §4.1's
// type, a view derived on read from the way's `RaisedWayRecord` (§2.7) — its supports and spans by their keys with their `state`, its
// `origin` (at village rungs a generated one is carried down from a CITY epoch) and `reason` (read by the clerk); at village rungs produced by
// the kernel's declaration layer from the log and the standing records (V07 §3.0), never by a village stage; read by VS3–VS6, S10, S12a,
// the hinterland unit, VS8 — a support whose `state` is absent or `ruined` as standing ground, a `cleared` one as none (V07 §3.5a)
"""
