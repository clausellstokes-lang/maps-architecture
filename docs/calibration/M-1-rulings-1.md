# M-1 rulings, round 1 — the ⟨M-1⟩ rulings, band exceptions and definition calls owed after wave 1

Lane `m1/rulings-1`, 2026-10-03 (16:27–17:40 EDT), the Fable ruling seat J161 names, on the owner's Mac. A research-side
record (`plat/CLEAN-ROOM.md` rule 2: implementer seats do not read it). It holds numbers, metric ids, file paths and our own
words: no reference word list, grammar, palette value or identifier beyond FTG's two size names and the four NG template
names the design already uses as our fabric keys (§13.6 (2)). Nothing here was written into `plat/`, no third-party site was
touched, no benchmark was run and no git command ran.

**What this record is.** Every ruling below was decided under the owner's delegation (J122: all product decisions but the
Fable review) and is **vetoable**: each has an id (R-nn), the question, the ruling, its reason and the record that measured
the fact it rests on. Two rulings widen or restate the clean-room firewall's text (R-14, R-17) and are flagged for the
owner's eye in section 4. The plan revision that applies them is `docs/calibration/M-1-plan.md` (its section 12 is the
changelog) and `M-1-work.json`; the design corrections the measurements require are section 2, for a design seat to apply
with `doc_checks.py` (this seat edited no design file); the owner-gated steps are section 4. The proposed ledger id for the
set is **J162**; the session enters the `docs/PROGRESS.md` row (this seat does not edit that shared file).

**Inputs read whole (CONFIRMED):** `M-1-plan.md`, `M-1-work.json`, `results/plan-check.json` (PC-01 … PC-21),
`results/wave1-verify.json`, E01, E02, E03, E04, E05, E07, E10, E11, E16 (their open-questions and rulings-owed sections),
`plat/docs/build/M0.md` §1 (b), (c), (f) and the AFTER-M-1 wave rows, `M0-work.json`'s `afterM1Needs` and `waveRule`,
choices C-0043, C-0071, C-0072, C-0075, C-0086, C-0092, C-0094, C-0101, C-0116, C-0117, C-0120, C-0121, `ARCHITECTURE.md`
§13.5 whole, §13.6 (2), §16's M-1 row, §17.1 (1)–(5), §4.6 step 5 and the deep-interior and reach-weight paragraphs
(l. 7306–7307, 7384–7392, 7414–7426), V12 §2.1–§2.4, §3.2–§3.5, §7.1's T-V12-1 / -6 / -28 / -30 / -32, §8, the J159 and
J161 rows, `research/baselines/metrics.m-1.json`'s eight `open` entries and `m1Uncovered`, `plan.json`'s FTG slots and
`mfcgExport`, `plat/CLEAN-ROOM.md` §4's table (read-only).

## 1 The rulings (R-01 … R-32; each decided, recorded vetoably)

### Scale, samples and settings

**R-01 — NG's scale (PC-03). Adopt 0.35 m per model unit as a DECLARED scale.** Every NG number that needs metres —
`street.detour`'s 100 m pair minimum, `street.cyclesPerKm2`, `plot.minWidth`'s bins, `fg.streetwallGap100`'s 2 m and 100 m,
`junction.angles`' 2 m merge and 10 m arm, `block.area`'s bins, and `ng-faces.json`'s integer-centimetre rings and cm²
areas — is converted at 0.35 m per model unit (model unit = canvas px ÷ the map's paint scale, E11 §2). *Form:* the
`MeasureInput` header gains a third `scale` value, `declared`, with `unitM` required (design correction DC-01; V12 §3.5.6's
`notApplicable` then applies to `relative` only); every row built on it carries `scale: 'metric'` and the note "declared
0.35 m per model unit (own)"; the input stays truthful (no scale was measured). `block.area` in declared metres, on the
catalogue's log bins, is **the target row M0-b-05b reads**; `block.areaRel` crosses beside it as a descriptive companion with
the edges ruled here: 24 log-spaced bins over 0.5–500 median footprint areas plus underflow and overflow (the catalogue's
rule applied to the relative range). `perKm2` and `per100m` join `MetricUnit` (DC-02). *Reason:* the design itself infers
the value (§4.6 step 5, `cut.flattenM` 0.7 m = two model units); E11's plausibility check holds — the median footprint
short side is 20.3–20.8 model units, 7.1–7.3 m declared, an ordinary town-house frontage, and `ng-faces.json` cannot exist
without a metre conversion (C-0086 asks for centimetres). The alternative, relative twins for four metrics, would leave
M0's cm file undeliverable. *Measured by:* E11 §2, E10 §3. *Vetoable:* yes (a declared constant enters every NG band; its
provenance is `own`, re-examined at M5 against the NG panel's counts).

**R-02 — FTG's two CITY payloads (PC-04 (a)). A RECORDED family, one usable slot.** `plan.json` gains the recorded family
`capture/FTG/CITY` (precedent: Fantasy Manor's 41 "as recorded", V12 §3.2.1; §13.5's `FtgSize` already names `CITY` as
"its timed preset"): slot 0 = `2026-09-21T05-23-58` (usable), slot 1 = `2026-09-25T10-13-51`, recorded in `sample.failed`
with reason `setting` (R-04). CITY rows are `estimator: single`, n = 1, and serve §13.5's cells that cite CITY numbers —
`time.model` (CITY, weakness) and descriptive companions; the twin checks of E05 §2 stay tied to both payloads as fixtures.
The six BIG_TOWN / BIG_CITY slots remain the matched-size families. *Reason:* C7 forbids a row from unregistered captures;
registering the recorded pair keeps the CITY time cell measurable without pretending the payloads were planned.
*Measured by:* E05 §1, §4.

**R-03 — NG rows (PC-04 (b)). The formula route; no recorded-sample ruling for NG.** Every NG row — the `cut.*` trace
rows included — is built on W-04's 20 `medium` plan seeds (five per template, `capture/NG/<template>/medium`, indices
[0, 5)); the `small` and `large` seeds carry D3. The 2026-09-25 captures (seeds 7171 / 7172) are twin fixtures only. Where a
formula value departs from §13.5's recorded number beyond the row's floor, the design number is corrected as a declared
shift and the formula row stands. The plan's §3 sentence ("W-07 and W-09's fixture pass give M0 (c) the MFCG rows") is
corrected: fixtures check the tool; rows come from plan seeds. *Reason:* V12 §3.2.1's point is that seeds are fixed before
anything is seen; a recorded sample is justified only where no formula sample can exist (FTG, Fantasy Manor). W-04 landed
(E04), so NG has one. V12 §3.2.2's sentence "the bent-cut signature's reference values are the recorded measurements"
is corrected to read the formula sample (DC-20's companion line). *Measured by:* E04 §3, E10 §7 (3), E11 outcome.

**R-04 — The 2026-09-25 FTG payload (PC-05). A declared non-default setting, never pooled.** Its second-stage road step
was 100 m against the default 60 m (`research/ftg-capture/roadlength100/README.md`). It stays the street-runs law's
evidence and a twin fixture; it enters no CITY row (R-02's `failed: setting`); E05's per-payload values are labelled
"non-default setting" wherever both appear. *Measured by:* E05 §1, §4 (the street class's turning halves under it).

**R-05 — The pairing reading. Reading B.** `bldg.pairing` = the share of footprints that have exactly one neighbour which
both shares ≥ 50 % of one of the footprint's edges and has an area within ± 25 % of the footprint's (E11's B: 0.40–0.46 on
the fixtures); reading A (0.09–0.13) and the mutual-pair share are reported beside it. *Reason:* the relative clause
qualifies "neighbour", so "exactly one" counts neighbours meeting the whole description; and CONFIDENCE §6 #10 asks whether
NG pairs similar footprints, which A (row ends) does not measure. DC-03 rewords the catalogue sentence. *Measured by:* E11 §4.

**R-06 — The 4-way share: the merged value is the row.** `junction.share4` for NG is the catalogue's one definition —
nodes within 2 m (declared) merged — because ours is measured identically (J-V12.5); the raw count (0 degree-4 nodes in
every map) goes in the row's note, and §13.5's "361 / 361 T" stays as the raw cut-tree identity with the clarification
"0–5 % 4-way under the 2 m merge" (DC-04). *Reason:* a reference row is only comparable under the definition ours uses;
the merge distance is a stated constant, not a tuning knob. *Measured by:* E11 §4 (0–0.053).

**R-07 — The street-gap definition.** E11 §2's operational definition is adopted for `fg.streetwallGap100`: the frontage
is each built block's centreline outline; rays cast inward every 5 % of the median footprint short side are *walled* when
they meet a footprint within 1.0 × that side; a gap is a run of unwalled rays longer than 2 m (declared); the row counts
gaps per 100 m (declared) and reports gap length per 100 m beside it. **Dense frontages** (shared with `fg.streetwall`):
for a reference, every frontage inside the enclosure (MFCG) or every built block's frontage (NG, uniformly attached ≥ 0.98);
for ours, the frontages of blocks in the `dense` and `poor` bands. DC-05 writes both into the catalogue. *Reason:* the
1.0-side band is flat under ± 25 % (E11: count moves ≤ 0.12) and lies between the front row's set-back and its back edge;
"dense" must be a class the measurement does not itself decide. *Measured by:* E11 §2, §4.

**R-08 — Edge blocks and the built outline.** `block.countTemplate` counts bounded faces (NG draws no hood outline, so
36 % of footprints lie in no face, E11); the row's note records that share; ours at M5 counts the blocks that do not touch
the opened district's outline, so the two sides count interiors alike (DC-06). The **built outline** for
`street.cyclesPerKm2`, and the **hood outline** `ng-faces.json` carries for M0-c-07b, is the convex hull of every drawn road
and footprint vertex, declared (`outlineKind: 1`). *Reason:* NG has no drawn boundary; a hull is reproducible and already
E11's rule; a tighter outline is a later amendment, not a guess now. *Measured by:* E11 §2, §4 ("Courts").

**R-09 — W-10's rare face shapes.** The target rows M0 reads are the pooled, ring, plain and per-template subsets (C-0086
asks for per-template `spreadKS`); the five face-class rows are descriptive companions. After W-10b re-measures on W-04's 20
`medium` seeds (about 2.5 × the faces), a class with fewer than 10 bounded bent cuts stays descriptive with a known-defects
entry — the σ fit's own n ≥ 10 rule (E10 §3). Before that run `bentcut_parent_face.py`'s template-street recognition
(`TEMPLATE_W`, two widths of seeds 7171 / 7172) is generalised in the W-10 tool, with the 2026-09-25 numbers as its red test.
*Measured by:* E10 §5–§7 (holed 3, triangular 9, C-shaped 16).

**R-10 — The signature vector (W-05, shared with W-09; PC-17).** E05 §6's proposal (W05-D14) is the M-1 definition of
§7.7's vector, eight components: radial share of arterial chords within 30° of radial; orthogonality |Σ ℓ e^{4iθ}| ÷ Σ ℓ;
way km per km² in three annuli of R (R = the 90th percentile of building-centroid distance from the header centre);
cluster-block area CV (V12 §3.4.1's blocks); enclosed share (0 where no enclosure); `outline.r90cv`. `variety.dispersion`
is one value per matched rung with `seeds` = n (no per-seed estimator), gating as a floor — ours ≥ the larger reference
dispersion; its `absFloor` is 0.1 z (W05-D18). The **pooled deviations** are, per component, the standard deviation over the
union of MFCG's usable plain seeds at the matched size and FTG's slots at that rung (13 vectors at TOWN and at CITY; MFCG
alone at METROPOLIS). DC-07 writes the definition into the catalogue. *Reason:* no volume defines the components (E05,
grep CONFIRMED); a dispersion is one statistic over the set, so V12 §3.5.1's estimators do not apply. *Measured by:* E05 §6.

### Reference numbers the measurements move

**R-11 — W-05's five changed FTG numbers, and its rows 7–9 criteria.** Each shift is CONFIRMED (E05 §8) and becomes a
design correction: trees 9.7 → 10.6 m (DC-08); ungated crossings 6 and 2 → 3 and 1 arterial, 4 and 1 by any class
(DC-09); the water step 50 m holds on one payload only (DC-10); outline anisotropy 0.365 / 0.333 and 1.160 / 1.214 under
V12's 36-sector definition (DC-11), the band recomputed at W-05b from the BIG_TOWN / BIG_CITY rows; the cliff wording
(DC-12); the 4-way share among ways 0.28 / 0.30 (DC-13). W-05's four pre-registered criteria for "agree with rows 7–9" are
**accepted** as the row's checker: (i) is the substantive test on the payload rows 7–9 describe, (ii)–(iv) are existence and
sanity clauses, and the five shifts are declared — the verifier's PLAUSIBLE weakness is answered by this acceptance, not by
a stricter test the design never stated. `wall.towerSpacing`'s 39 → 38.65 m and `time.model`'s PUT → GET definition are
notes inside the bands (DC-27, DC-28).

**R-12 — W-07's F1–F4 and D24.** *F1:* T-V12-6's wall-alignment clause is restricted to the four dry cities; the coastal
city's alignment through the shore split (89.2 / 56.7 / 41.0 %) is a new descriptive number, and T-V12-32's sentence "keep
T-V12-6's values" excludes alignment (DC-14) — item 106 says a closure is never wall, and the coastal city is the
descriptive stress variant. *F2:* §13.5's ribbon cell "71–85 % (sweep)" is the size-40 gate fixtures'; the cell is replaced
by W-07b's per-size rows (interim one-seed values 0.85 / 0.58 / 0.49 at 40 / 80 / 130; DC-15), a declared shift at CITY and
METROPOLIS. *F3:* the anchors cell's "median 29 ha at size 80" is the river-and-coast city's; plain size 80 gives 19.0 ha
(DC-16). *F4:* `bldg.wallAlign` splits into `bldg.wallAlign.median` (deg, floor 1°) and `bldg.wallAlign.share15` (share,
floor 0.02), each a vector over the three bands (DC-17); D28's draw members `draw.casingLaw`, `draw.roundJoins`,
`draw.roundCaps`, `draw.widthPx`, `draw.wallsAfterBuildings` are registered, `draw.order` has no numeric member (DC-18).
*D24:* **markets are a TARGET row with reference value 0** — every export holds one square and every recorded generation
builds one market geometry (E07 §6), so `market.secondary` = 0 and `market.adjacent` = 0 is a measured fact, not a missing
feature; under the `MFCG` preset ours holds no secondary market (T23-1's extensions-off), so the band [0, 0.5) (the count
floor) is met by construction, and the plan's pre-decided descriptive status (§8 item 3) is withdrawn (DC-19).

**R-13 — W-03's replacement-seed rule (J161).** No hand-chosen substitute. If the one approved retry of
`capture/MFCG/130/plain/8` freezes again, the family's declared count extends **by formula** to n = 11 (index 10 =
seedOf(`capture/MFCG/130/plain`, [10]), 1 load, 2 downloads inside J161's three), index 8 stays in `sample.failed`
(`no-export`, attempts 2), `sample.indices` is [0, 11) with 10 usable and the estimator stays `type7`. The rule
generalises: a family whose usable count falls below its declared n extends by the next formula index until n usable, each
extension a logged load under an approval. Seed 0's cold re-export (1 load) completes the row's third check. E03 §6, the
sweep README and `W-03.json`'s "4 of 10 size-40 seeds exceed 1 500" is corrected to 2 of 10 (wave1-verify). *Reason:*
V12 §3.2.1 — "a disappointing seed cannot be dropped" — is honoured because the extension is formula-fixed before it is seen
and the failed index stays recorded (C7, T-V12-30). *Measured by:* E03 §4–§5, wave1-verify W-03.

### The files M0 asked for

**R-14 — `ng-faces.json` (PC-01) CROSSES, as a numbers-only file — a firewall restatement, flagged for the owner.**
V12 §3.3's "geometry never crosses" and §17.1 (4)'s list are corrected (DC-20): what never crosses is a reference's
rendered image, any named, labelled or styled geometry, and any geometry beyond the declared face-record file; integer
coordinates measured from a seeded generator's drawn output are numbers like a block area, carry no code, table, palette or
word, and pass the scanner (C10) like every crossing file. The file's schema (plan §7b): `schema: 'plat.ng-faces/1'`,
`referenceBuild`, `scaleDeclared: { mPerModelUnit: 0.35 }`, `outlineKind: 1`, `hoods[]` (id, template, seed label,
capture, outline ring in integer cm) and `faces[]` (id, hood, template, class flags, outer ring and holes in integer cm,
block areas in integer cm², and per recorded cut its length in cm, corner position along its course in thousandths, arrival
in centidegrees, fillet flag, bend count), each row's `capture` the folder and every id an integer — produced by W-10b and
W-11b from W-04's 20 `medium` seeds in the registered frame (E11's layer registration), crossed at W-20 with its own
`CrossingRecord` after M0-k-05 has landed (C-0120). *Reason:* §13.8's PR clause and §16 M0 (b)'s "the check of the adopted
corner-first rule" need identical shapes, which no statistic replaces; C-0043 / C-0086 are the build side's landed choice;
J156 makes the design a reference during the build. *Vetoable:* **yes, prominently** — it widens what crosses the clean-room
firewall (section 4 (6)). *Measured by:* E10 §1 (the research-side form exists, 168 faces), E11 (registration).

**R-15 — The cut-length metric (PC-02).** `cut.length` is registered (DC-21): input `trace`, scale m (declared for NG),
distribution on the catalogue's run-length default (5 m bins to 400 m plus overflow), `perSeed: sample`, the fillet-free
course between the snapped ends; its row is M0's "bent-cut: cut lengths per face (NG 1.2.2, vertex captures) ⟨M-1⟩" with
`spreadKS.p90` over the per-template subsets, from W-10b; W-10's checker already reproduces σ 0.066 / 0.098 (E10 §2), so
PC-02 (3) is closed. *Measured by:* E10 §5 (cut length p10 · p50 · p90 121 · 173 · 281 model units).

**R-16 — Loads and approvals (PC-06).** W-03's method is one load per seed (35 = J159's count; the JSON by the URL key, the
SVG by the app's own export window, E03 §3 (1)); the plan text and `plan.json`'s `mfcgExport.perSeed` are corrected.
J161's three loads cover the re-export, the retry and R-13's extension. S-V12-1's 20-seed fallback (+ 30 loads, + 60
downloads) and any timing loads (R-21) are new owner steps in plan §5. The MFCG and NG build-id fetches were inside J159's
"Yes, both" to plan §5's items 2 and 3, which name them (CONFIRMED by the J159 row's wording).

**R-17 — `denylist.json` (PC-07): delivered in M0's format at `normalisationVersion: 1`, exactly as C-0101 states.**
Path `plat/packages/testkit/baselines/denylist.json`; classes `tokens`, `trigrams`, `colours`, `files`, `lists` (per
recorded list its member words of four or more letters), `spell` (the spell-check exclusion set's digests), `salt` (32
bytes as 64 hex); normalisation NFKD, combining marks stripped, lower-cased, tokens the maximal runs of letters and digits
(an underscore splits — the research twin's `[a-z0-9_]` is changed to match), 3-grams over consecutive tokens, colours as
six lower-case hexadecimal digits, file bytes raw. **The byte-level item encoding C-0101 leaves open is fixed here**, for the
session to carry to M0-k-06 before wave 13: a 3-gram item is its three tokens joined by one U+0020; a list-word item is the
word; a token, colour and spell item is itself; a file item is its bytes; each digest is the lower-case hex of
SHA-256(salt ‖ item) **truncated to its first 16 hex digits** (64 bits — collisions negligible at a million entries, E16 §8;
the full digest would quadruple an 8.7 MB list). The spell list is web2 plus the 179-word supplement (E16 §2). The
research-side list `denylist.v1.json.gz` keeps its `id` (case-kept) and `phr` classes for the design-set scan, which §17.1
(2) (i) needs case-sensitive; a `normalisationVersion: 2` adding them is a hand-off to the build side, never a block.
`cross_check.py` gains the file kind (C1 schema, C4 reading only hex-delimited six-digit runs so 16-hex digests never trip
it, C10 over the header's strings); the generation record is a `CLEAN-ROOM.md` §4 G-row (date, opaque source labels,
counts). *Reason:* the scanner is built now (M0-k-06, wave 13) and a mismatch stops the scan; the one channel for the
format is the session (C-0071). *Measured by:* E16 §1–§4.

**R-18 — Both crossing forms (PC-08).** W-20 writes V12 §2.3's in-file `crossings` array inside `baselines.json` and, for
each crossed file (`baselines.json`, `denylist.json`, `ng-faces.json`, each digest file), C-0092's record `{ file, sha256,
rows, date, checks, checkerSeat, statement }` appended by the countersigning checker seat to
`plat/packages/testkit/baselines/crossings.json` (an array M0-k-05 creates as `[]`, C-0120).

**R-19 — The deep-interior default shares (PC-09).** W-12 fits them from E11 and E09: NG's pooled `block.courtShare` on
the formula seeds (type 7 median over the 20 `medium` hoods; the fixtures give 0.43, 115 of 268 deep built blocks)
calibrates the **`modest`** band's `court` cell — NG's `medium` hood is the design's default-fabric comparator (§13.6 (2)'s
`area` pair), `modest` is the design's central band and its default 0.45 sits nearest the measurement; the other bands'
court cells move by the same ratio (measured ÷ 0.45), capped at 1; each band's `back_lane`, `through_alley` and
`rear_plots` are renormalised in their design proportions; MFCG's inner-plot removal (W-09's cluster blocks with an unbuilt
interior component) calibrates the `MFCG` preset's court cell and is reported beside. Provenance "M-1 ⟨date⟩"; channel per
R-20. *Reason:* one measured share per reference cannot fit four cells per band; the ratio rule moves what the data moved
and holds the rest with their reasons. *Measured by:* E11 §4.

**R-20 — The digest entries (PC-10).** W-17's outputs name, for the AFTER-M-1 items: (1) how NG's σ was measured — the
recorded frame, f as the snapped start's fraction of the parent's E1 OBB major axis, the maximum-likelihood fit with
contamination, rotated retries on our side only (E10 §3); (2) the re-fitted depth rows and regime floors (E12); (3) R4's
definition — longest-edge axis, e^{4iθ}, 1 500 sampled buildings, area centroids (E07; C-0018); (4) the hollow-block
frequency's definition (E11 §2, courts); (5) the junction census, T versus crossroads (E11 §4); (6) the deep-interior
shares (R-19); (7) the derived-graph twin derivation (R-22); (8) the declared NG scale (R-01); (9) the recorded CITY family
and the non-default setting (R-02, R-04). The depth rows and shares reach M0-b-05a and M0-c-07a **through the digest entry**;
the design amendment is the record of the same numbers (plan §7's last row says so).

**R-21 — Time rows (PC-11).** FTG's `time.model` is the server interval PUT sent → layout GET sent (W05-D12), a server-side
quantity to which this machine's contention adds at most the request's send and receipt latency: it is **admissible** with
the note "server time; no host ratio applies", at BIG_TOWN and BIG_CITY (slots) and CITY (R-02, single), role weakness;
FTG's scene and load times (client-side, contended) feed no row and §13.5's recorded 6.4–7.0 s stands as text. MFCG's
`gen ms` and NG's hood times from the 2026-10-03 runs are CONTENDED (M0's seats shared the machine) and feed no row: the
MFCG and NG `time.*` rows cross **descriptive** in C-0116's form (`values.n` 0, `sample.failed` reason `contended`) unless
**W-21** — an idle-window re-measure after M0-t-01's reference score exists, 3 MFCG loads (one per plain size) and 12 NG loads
(three per template at `medium`), owner-gated — is approved and run; §13.5's recorded 57 / 131 / 156 ms and 10–96 ms stand
as text meanwhile. *Reason:* V12 §3.4.2 divides `time.*` by §12.1's ratio, which needs M0-t-01's score (C-0075).

**R-22 — The derived street graph's twin (PC-12).** `sgd.*`, `blockc.*`, `fg.streetwall` and MFCG's `block.courtShare`
keep `metricVersion` 1.0.0: the raster medial axis at 0.5 m with 8 m spur pruning and 2 m node merge is an implementation of
§3.4.1's definition (the skeleton of the cluster blocks' complement), declared, not a definition change; T-V12-3 at M1
decides whether it lies within tolerance, else the product's value supersedes (J-V12.1). The digest entry (R-20 (7)) states
the derivation so M0-c-07a derives ours the same way (like with like, J-V12.5). W-14 reports the sensitivity of `sgd.*` to
the raster step (0.5 against 0.25 m) and the spur threshold (8 ± 2 m) on the five fixtures as the bias proxy; plan §9
records the consequence for M0-c-07a.

**R-23 — The uncovered §13.5 cells (PC-13; `m1Uncovered`).** Each gets a row or a stated no-row: MFCG `bldg.area`
(descriptive), `water.step` and `water.riverWidth` (descriptive, the stress family), `pop.perBuilding` (weakness: from
the export's population figure where it carries one, else the coded six-per-lot law as the note), `wall.ungated`,
`wall.barrierShare` (descriptive, stress family) and `gate.count` at the stress setting (the waterfront law, descriptive) →
**W-07b**; MFCG `label.*` → no row (a qualitative weakness; ours gates on §13.7's own bar); MFCG `time.worst` → no time row
(R-21), the attempt counts per stress seed recorded in E07 as a descriptive note (no catalogue id); FTG `alley.gradient` →
no row (a model metric; FTG's alley length is 0 by its class set, E05); FTG's two market squares → no row (no id; a note in
E06); NG `draw.*` for `hatched` (square caps, hatch triangles and shadow quads per wing) and the roof luma ratios
(descriptive) → **W-22**, a draw-record census on W-04's recordings (numbers only; no colour value crosses); NG `label.*`
→ no row (NG draws none); NG `plot.cvDistrict` (weakness: the hood's footprint-area CV) → **W-11b**; NG `plot.spearman`
→ no row (NG has no prosperity); `time.firstMap` and `time.worst` for all three → R-21; `block.areaRel` → R-01.

**R-24 — Checkers (PC-14, PC-15, PC-16).** W-07's checker is T-V12-6 in full (E07 §2 already runs its clauses; W-07b prints
the five fixture covers 0.657 / 0.582 / 0.621 / 0.583 / 0.569 explicitly). W-11's twin reproduces the old script under its
own definitions and declares the V12 shifts (done, E11 §3, §5 — DC-24, DC-25 carry them). W-02's checklist carries J159's
consent and stop rules and the water-key check (done, E02 §3); days 2–6 pin the request-diff's size-dependent class to the
eleven named leaves (the verifier's weakness), and day 2 decides whether they follow the size (E02 finding 1).

**R-25 — Dependencies and the known-defects channel (PC-18).** W-09 depends on W-03 and W-07b; W-15 on W-02 (six slots or
the recorded shortfall) and W-04; each crossing seat appends its own `CLEAN-ROOM.md` ledger row at its landing (C-0120), so
W-19 becomes the exit check run after W-20. `plat/docs/known-defects.json` is M1's (M0-x-03 defers it): M-1's ⟨M-1⟩ cells it
cannot measure cross as **descriptive rows in `baselines.json`** in C-0116's form, and E19 holds the entries for M1's file.

**R-26 — W1's exit tests (PC-19).** W-15's and W-20's checkers gain T-V12-1's fixtures on the twin (each refusal case),
T-V12-28 (the scanner over every crossed file; no `MeasureInput` under `plat/`) and T-V12-30 (a failed index passes C7, an
unlisted gap is refused, degenerate geometry cleaned with `dropped` counted, an empty capture a failed index).

**R-27 — Reference terms in the plan (PC-20).** The plan's §2.1, §2.2 and D24 are reworded in our own terms (the shanty-town
and parks flags, FTG's default presets, the export's square feature); the literal keys stay in `plan.json` and the capture
checklist, research-side.

**R-28 — D3 and W-04 (PC-21).** `M-1-work.json`'s D3 is aligned with the plan (no row of its own; E04, E11, E12); W-04 is
wave 1 in both files (landed 15:26).

### The rest

**R-29 — W-16's routed hits.** The Building field name that repeats a Foundry-module field name is **renamed** by a design
seat (§17.1 (9) is explicit; "ordinary compound" is not open); the study-map names in six design examples are **reworded**
(the map's README bars them); V12 l. 1534's coincidence takes an allow row after the rewording. Lane
`design/cleanroom-fix-1` (running since 16:27, J161) applies them; W-16b reruns the self-test after.

**R-30 — `doc_checks.py`'s corpus (E01 §6, E02 §7, E16 §5 (1); decided by J161).** `research/baselines/`, `research/sf/`
and the M-1 capture lanes' own record files (the programme READMEs, `capture-facts.json`, `export-check.json`, `stats.json`,
`loads.jsonl`, `build-check.json`, `index.json` of the 2026-10-03 folders) leave the C2–C4 corpus. **Already applied** in the working tree
by the clean-room lane when this seat ran its self-check (17:10; `OWN_TREES`, `OWN_RECORD`, `M1_FIRST_CAPTURE_DAY` in
`doc_checks.py`, recordings kept; 44 own outputs left out, CONFIRMED by the summary line). **W-23** is therefore the receipt
only: the before / after counts on `ARCHITECTURE.md` and V12, filed with that lane's landing or in E16 §9.

**R-31 — §4.5's two M-1 clauses.** "The base weights are fitted at M-1 on B-CITY" reads "at M1" (DC-22; B-CITY needs the
product); `plotShare` per regime is M1's on B-CITY, M-1 bounding FTG's from above (D1), as the text says.

**R-32 — When the crossings can land.** Every numbers-only crossing (`baselines.json`, `ng-faces.json`, `denylist.json`)
waits for M0-k-05 to have LANDED (M0 wave 11; `corepack pnpm baselines:check` is its), and the digest for M0-k-06 (wave 13;
its content check), by C-0120 — never while T, T-fix or T2 is open. W-20 carries both as dependencies; M-1's exit may
therefore trail M0's wave 13, and the plan says so rather than hiding it in a date.

## 2 Design corrections the measurements require (for a design seat; this seat edited no design file)

Each: section · the old number or sentence · the new one · the record that measured it. Apply with
`doc_checks.py --sections`; the shift record names each moved cell (plan §5 item 8: reported, not asked, unless a signed
golden flips — none is signed).

| id | section | old | new | measured by |
|---|---|---|---|---|
| DC-01 | V12 §2.2 `MeasureInput.header.scale`; §3.5.6 | `'metric' \| 'relative'`; a scale-needing metric on a relative input is `notApplicable` | `'metric' \| 'relative' \| 'declared'` with `unitM` required for `declared` and the row's note naming the declaration; `notApplicable` for `relative` only | E11 §2, E10 §3 (R-01) |
| DC-02 | V12 §2.1 `MetricUnit` | no unit for cycles per km² or a count per 100 m | add `perKm2`, `per100m` | E01 §5, E11 §6 |
| DC-03 | V12 §3.4.2 `bldg.pairing` | "sharing ≥ 50 % of one edge with exactly one neighbour whose area lies within ± 25 %" | "that have exactly one neighbour which both shares ≥ 50 % of one of the footprint's edges and has an area within ± 25 % of theirs" | E11 §4 (R-05) |
| DC-04 | §13.5 junction row, NG cell | "NG 361 / 361 T" | "NG 361 / 361 T (raw: 0 degree-4 nodes); 0–5 % 4-way under the catalogue's 2 m merge at the declared scale" | E11 §4 (R-06) |
| DC-05 | V12 §3.4.2 `fg.streetwallGap100`, `fg.streetwall` | "along dense frontages (as `fg.streetwall`), gaps longer than 2 m per 100 m" | the ray rule (every 5 % of the median short side; walled within 1.0 × that side), gap length reported beside the count; dense frontages = every intramural frontage (MFCG), every built block's frontage (NG), ours the `dense` and `poor` bands' | E11 §2 (R-07) |
| DC-06 | V12 §3.4.2 `block.countTemplate` | "built blocks per hood per template at `medium`" | "bounded built blocks (faces closed by ways) per hood; ours: blocks not touching the opened district's outline" | E11 §4 (R-08) |
| DC-07 | V12 §3.4.2 `variety.dispersion`; §13.5 variety row | components named, undefined; "estimator" implied | the eight-component definition, `absFloor` 0.1 z, one value per rung with `seeds` = n, pooled deviations over MFCG's usable seeds ∪ FTG's slots at the rung | E05 §6 (R-10) |
| DC-08 | §13.5 tree scatter, FTG | "nearest-neighbour median 9.7 m" | "10.6 m (10.59 / 10.57 m; the earlier script dropped 320 of 4 125 trees), minimum 0.14 m" | E05 §8 (1) |
| DC-09 | §13.5 towers and gates, FTG | "6 and 2 ungated crossings" | "3 and 1 arterial crossings at no gate (4 and 1 by any way class; the earlier count included the wall chain's ends)" | E05 §8 (2) |
| DC-10 | §13.5 water, FTG | "50 m resampling, rivers ≈ 31 m" | "50 m on the 2026-09-21 payload (rivers 31 m); the 2026-09-25 payload's coast at 15 m and basin 13 m steps (pooled 15.7 m), rivers 48 m" | E05 §8 (3) |
| DC-11 | §13.5 outline anisotropy, FTG | "0.20–0.33 and 1.26–1.65 (both CITY payloads)" | "0.365 / 0.333 and 1.160 / 1.214 under V12's 36-sector definition (the earlier 16 land sectors); band recomputed from the BIG_TOWN / BIG_CITY rows (M-1 ⟨date⟩)" | E05 §8 (4) |
| DC-12 | §13.5 street turning, FTG weakness | "zero mass above 15° per step" | "≤ 1 % of 10 m steps above 15°; no raw way vertex above 15° on the 2026-09-21 payload, one at 16° on the 2026-09-25 payload" | E05 §8 (5) |
| DC-13 | §13.5 junction row, FTG | "36.4 % 4-way in its Medieval city" | "4-way share 0.28 / 0.30 among ways (36.4 % over every edge type, the earlier count)" | E05 §4 |
| DC-14 | V12 T-V12-32; T-V12-6 | "the five MFCG exports measured through the shore split keep T-V12-6's values" | "… keep T-V12-6's walled share, gates and towers; the coastal city's wall alignment through the split is 89.2 / 56.7 / 41.0 % (descriptive)"; T-V12-6's alignment clause: the four dry cities | E07 F1 |
| DC-15 | §13.5 walled share and ribbons, MFCG | "71–85 % (sweep)" | per-size rows from the ten-seed sweep (W-07b; interim one-seed 0.85 / 0.58 / 0.49 at 40 / 80 / 130); "71–85 %" was the size-40 gate fixtures' | E07 F2 |
| DC-16 | §13.5 MFCG anchors | "2.4–17.6 ha at size 40 and median 29 ha at size 80" | "2.4–17.6 ha on the size-40 gate fixtures (the plain size-40 city 2.4–21.5); median 19.0 ha at plain size 80 (29.3 ha is the river-and-coast city's)" | E07 F3 |
| DC-17 | V12 §3.4.2 `bldg.wallAlign` | one vector mixing degrees and shares | `bldg.wallAlign.median` (deg, floor 1°) and `bldg.wallAlign.share15` (share, floor 0.02), vectors over the three bands | E07 F4 |
| DC-18 | V12 §3.4.2 `draw.*` | members unnamed | MFCG `draw.casingLaw`, `draw.roundJoins`, `draw.roundCaps`, `draw.widthPx`, `draw.wallsAfterBuildings`; NG `draw.capSquare`, `draw.hatchPerWing`, `draw.shadowQuadsPerWing`, `draw.roofLumaRatio` (descriptive); `draw.order` no numeric member | E07 §7; W-22 |
| DC-19 | §13.5 markets, MFCG; plan §8 (3) | "secondary-plaza frequency and non-adjacency on the plain size sweep ⟨M-1⟩ — target" (pre-decided descriptive) | "0 secondary markets and 0 adjacent pairs in every export and recorded generation (M-1) — target, reference 0" | E07 §6 (R-12) |
| DC-20 | V12 §3.3 last paragraph; §17.1 (4); V12 §3.2.2 NG line | "images, geometry, names, colours … never cross"; the crossing list without `ng-faces.json`; "reference values are the recorded measurements … `trace` rows" | geometry beyond the declared face-record file never crosses; `ng-faces.json` (plan §7b's schema) in the list, checked by C1–C10 and countersigned; NG's trace rows from the formula seeds | E10 §7, E11 (R-03, R-14) |
| DC-21 | V12 §3.4.2 | no cut-length metric | `cut.length` (trace, m declared, distribution, 5 m bins to 400 m + overflow, `perSeed: sample`); row "bent-cut: cut lengths per face (NG 1.2.2, vertex captures) ⟨M-1⟩" | E10 §5 (R-15) |
| DC-22 | §4.5 l. 7425 | "the base weights are fitted at M-1 on B-CITY" | "at M1 on B-CITY" | plan §8 (7) (R-31) |
| DC-23 | §4.6 step 5 (`cut.flattenM` note) | "0.35 per unit in the GeoJSON schema MFCG 12710731 writes in metres" | "0.35 m per NG model unit, a declared scale (`own`): NG exports no metric; at 0.35 its median footprint short side reads 7.1–7.3 m (E11)" | E11 §2 (R-01) |
| DC-24 | §13.5 party walls, NG | "39–43 % of perimeter, 95–99 % attached" | "per-footprint median 0.42–0.46 within 1 % of the short side, attached 0.98–1.00 (V12's definition; 39–43 % and 95–99 % under the earlier script's)" | E11 §5 |
| DC-25 | §13.5 plot-area gradient, NG | "Moran's I −0.04 … +0.03" | "−0.18 … +0.05 on shared-edge adjacency (−0.04 … +0.03 with 8 nearest centroids, the earlier rule)" | E11 §5 |
| DC-26 | §13.5 bent-cut signature | "σ 0.098 (ring faces)" | "0.098 (0.100 with the three annulus first cuts and the three C-shaped cuts after them)" — a note; the band holds | E10 §6 (1) |
| DC-27 | §13.5 generation time, FTG | "server 2.9–3.2 s" | "server 2.9–3.2 s (PUT → OPTIONS); 3.7–4.3 s PUT → layout GET, the M-1 row's definition" | E05 §4 (R-21) |
| DC-28 | §13.5 towers and gates, FTG | "39 m median spacing" | "38.65 / 35.59 m (type 7; 39.3 was the probe's upper middle value)" — a note | E05 §4 |
| DC-29 | V12 §3.2.1 table | MFCG "one URL load per export"; FTG row without the recorded CITY pair | one load per seed (JSON by key, SVG by the app's export window); FTG gains the recorded family `capture/FTG/CITY` | E03 §3 (1); R-02 |
| DC-30 | V12 §3.2.1 (`fm-captures.json`, `dw-captures.json`, `vg-seeds.json` "written by `plan.py`") | at M-1 | "by `plan.py` at each panel's milestone (M1, M5, M6c, V-M4)" | E01 §4 |

## 3 Wave 2 and wave 3 (the order, checkers and crossing seats are plan §4; summarised)

**Wave 2 (now → 2026-10-08, FTG day 6; ≤ 3 research seats beside M0's four):** W-02 days 2–6 (the cron) · W-03b (J161's
loads; R-13; E03 corrections) · W-23 (the corpus exclusion list) · W-10b and W-11b on W-04's 44 recordings (the NG rows,
`cut.length`, the `ng-faces.json` candidate) · W-22 (NG draw census) · W-05b per slot (FTG per-size rows, the CITY recorded
family, the vectors) · W-07b (MFCG rows on the sweep, R-23's additions, T-V12-6 in full) · W-09 (cluster blocks, derived
graph, court share, MFCG vectors) · W-06 (FTG faces) · W-08 (renders) · W-13 and W-14 (the spikes) · the design seat's
corrections DC-01 … DC-30. No crossing seat runs in wave 2 (R-32).

**Wave 3 (after FTG day 6 and M0-k-05; the digest after M0-k-06):** W-12 (depth rows, deep-interior shares; Fable ruling
over an Opus fit) · W-15 (rows, bands, the candidate; the registry additions; the flip list) · W-16b (the deny-list rebuilt
at the exit in M0's format; the self-test after `design/cleanroom-fix-1`) · W-17 (digest, Fable) and W-18 (its check, Opus)
· W-20 (the crossing: baseline seat places `baselines.json`, `ng-faces.json`, `denylist.json`; the checker seat countersigns
both forms; E19's known-defects list for M1) · W-19 (the ledger as the exit check) · W-21 (timing; owner-gated; optional) ·
the session's commit on the owner's word.

## 4 Owner-gated, named plainly

1. **FTG days 2–6** — approved (J159); the session's cron launches each; day 2 no earlier than 13:30 EDT 2026-10-04.
2. **Three MFCG loads** — approved (J161): seed 0's cold re-export; the retry of `130/plain/8`; if it freezes, R-13's
   formula extension to index 10 (1 load, 2 downloads). Any further MFCG or NG load is a new approval.
3. **S-V12-1's fallback** — + 30 MFCG loads and + 60 downloads (one load per seed) if W-13 triggers it; not approved yet.
4. **W-21 timing** — 3 MFCG and 12 NG loads in an idle window after M0-t-01's reference score; not approved; without it the
   MFCG and NG time rows cross descriptive (R-21).
5. **The crossing's commit** — the session commits `baselines.json`, `ng-faces.json`, `denylist.json`, the digest and the
   `CLEAN-ROOM.md` rows on the owner's word, re-confirmed in the chat of the day (approvals do not travel).
6. **R-14's firewall restatement** — `ng-faces.json` carries NG's recorded face rings (integer cm, numbers only) into
   `plat/`; decided under delegation because M0's landed choices C-0043 / C-0086 need it and §13.8's PR clause asks for it,
   and **flagged here for veto** because it widens what crosses the clean-room firewall.
7. **The design corrections** (section 2) — reported, not asked (plan §5 item 8; J-A34.01); none moves a signed golden.
8. **Disk** — 12 GiB free at 16:40; no seat deletes or moves data.

## 5 CONFIRMED versus PLAUSIBLE

**CONFIRMED (read or executed):** every number quoted from E01–E16 and wave1-verify; the design texts each ruling cites
(§13.5's rows and the ⟨M-1⟩ rule, §17.1 (4)–(5), V12 §2.1–§2.4, §3.2–§3.5, §8.3's spikes, T-V12-1 / -6 / -28 / -30 / -32);
M0's AFTER-M-1 needs (M0.md §1 (b), (c), (f); `afterM1Needs`); C-0120's crossing window; J159's and J161's wording; the
eight `open` registry entries and the 19 `m1Uncovered` pairs; the §4.6 default shares and the 0.35 inference's sentence.
**PLAUSIBLE (reasoning):** that 0.35 m per model unit is the right declared scale (its plausibility check is one number);
that FTG's server interval is unaffected by client contention beyond latency; that the 16-hex truncation suits M0-k-06's
loader (the session carries the format; a refusal would surface at wave 13's tests); that `modest` is the band NG's hoods
stand for; that the hull is an acceptable district shape for M0-c-07b's statistics (a tighter outline is a later amendment).

`df -h /`: 12 GiB free at the start and the end of this lane. Outputs: this record, the revised plan and work file,
`results/rulings-1.json`; nothing else was written.
