# Hand-off from M-1 to M0's implementer side: attachments A to C of rows N-20 to N-25

Carried by the session on 2026-10-03 (the channel of C-0071) from M-1's research side, where a research seat drafted it
and checked it with the clean-room checker; the session reviewed it before carrying. It holds our metric ids, units,
field names, numbers we defined and our own words only — no reference word, name, colour value, identifier or measured
reference number. Rows N-20 to N-25 are in `M0-spec-notes.md`; M0-k-05 (wave 11) and M0-k-06 (wave 13) read them with
these attachments, and their checkers check against them. Source label of the registry: `research:baselines/metrics.m-1.json`
(version 1.0.0, regenerated 2026-10-03 22:04), opaque to this side.

## Attachment A (N-20, N-24, N-25): the metric rows the AFTER-M-1 items read

Every id below is at `metricVersion` `1.0.0`. The measure column restates, in our own words, what M-1 measured on the
reference under that version.

| metric id | §13.5 row | reference: role | unit; output form | M-1's measure at 1.0.0 | read by |
|---|---|---|---|---|---|
| `junction.angles` | junction arm angles and degrees | NG: target (the role §13.5 gives NG's junction numbers) | `deg`; vector, fields `median` and `p5` | nodes of degree three or more, after merging nodes within 2 m; each arm's direction taken 10 m along it; the angles between angularly consecutive arms; per seed, their median and 5th percentile | M0-c-07a, M0-c-07b |
| `junction.share4` | junction arm angles and degrees | NG: target | `share`; scalar | degree-4 nodes ÷ nodes of degree three or more, after the same 2 m merge | M0-c-07a, M0-c-07b |
| `bldg.r4.60` | MFCG street signature | MFCG: target | `ratio`; scalar | each building's axis is its longest ring edge's direction, and z = e^(4iθ); for up to 1 500 buildings sampled by the metric's own stream, R4 is the modulus of the mean z over the buildings whose centroids lie within 60 m of the sampled building's centroid; a sample counts only with five or more such buildings; per seed, the median | M0-c-07a (a block-axis proxy, reported; C-0018) |
| `bldg.r4.120` | MFCG street signature | MFCG: target | `ratio`; scalar | as `bldg.r4.60`, within 120 m | M0-c-07a (proxy, reported) |
| `bldg.r4.250` | MFCG street signature | MFCG: target | `ratio`; scalar | as `bldg.r4.60`, within 250 m | M0-c-07a (proxy, reported) |
| `bldg.wallAlign.median` | MFCG street signature | MFCG: target | `deg`; vector, fields `b0_40`, `b40_100` and `b100_200` | buildings inside the outermost curtain wall, in bands 0–40, 40–100 and 100–200 m from it: each building axis's angle to the nearest curtain segment, folded into [0°, 45°]; per band, the median | M0-c-07a (proxy, reported) |
| `bldg.wallAlign.share15` | MFCG street signature | MFCG: target | `share`; vector, the same three fields | the same angle and bands; per band, the share at or below 15° | M0-c-07a (proxy, reported) |
| `sgd.tShare` | MFCG street signature | MFCG: target, or descriptive when its seed-to-seed coefficient of variation exceeds 0.3 | `share`; scalar | on the derived street graph, degree-3 nodes with two arms within 20° of straight ÷ degree-3 nodes | M0-c-07a (gates) |
| `sgd.deadEnds` | MFCG street signature | MFCG: as `sgd.tShare` | `perKm`; scalar | degree-1 nodes of the derived street graph per km of the graph's length | M0-c-07a (gates) |
| `blockc.perHa` | MFCG street signature | MFCG: as `sgd.tShare` | `perHa`; scalar | cluster blocks inside the outermost curtain wall per walled hectare | M0-c-07a (gates) |
| `blockc.lotsPer` | MFCG street signature | MFCG: as `sgd.tShare` | `count`; scalar | footprints per cluster block; per seed, the median | M1 (C-0072); no M0 verdict |
| `block.area` | blocks | NG: target | `m2`; distribution, 24 log-spaced bins over 50–50 000 m² with an underflow and an overflow bin | built blocks' areas per district, in metres at the declared scale of §17.1 (4); the whole-sample row carries `spreadKS.p90` over the per-template subsets | M0-b-05b, M0-c-07b |
| `block.areaRel` | blocks | NG: descriptive | `ratio`; distribution, 24 log-spaced bins over 0.5–500 with an underflow and an overflow bin | the same block areas ÷ the median footprint area; the scale-free companion of `block.area` | none (it crosses beside `block.area`) |
| `block.countTemplate` | blocks | NG: target | `count`; scalar, one row per template | bounded built blocks (faces closed by ways) per hood and template at `medium`; land in no closed face is counted in the row's note; on our side, the opened district's blocks that do not touch its outline | M0-b-05b, M0-c-07b |
| `block.courtShare` | deep block interiors | NG: target; MFCG: target | `share`; scalar | a block is deep when its largest inscribed circle's radius exceeds 1.5 × the median footprint's short side; the measure is the share of deep blocks that hold an unbuilt interior part touching no block edge, of at least 0.5 × the median footprint area, where the interior is the block less its footprints dilated by 5 % of that short side; on our side, §13.5's court share over blocks of depth class `deep` | M0-c-07a |
| `cut.sigma` | bent-cut signature | NG: target (its five face-class rows descriptive) | `ratio`; scalar | the spread of the snapped start's place along the parent's oriented-box major axis, measured in the recorded frame that §4.6 names (the digest's entry gives the frame and the fit) | M0-b-05a, M0-b-05b |
| `cut.cornerMid` | bent-cut signature | NG: target (face-class rows descriptive) | `share`; scalar | the corner clause of §13.5's bent-cut row, as a share of the recorded one-bend cuts | M0-b-05a (reported beside ours), M0-b-05b |
| `cut.arrival85` | bent-cut signature | NG: target (face-class rows descriptive) | `share`; scalar | the arrival clause of §13.5's bent-cut row, as a share of the recorded cuts | M0-b-05a (reported beside ours), M0-b-05b |
| `cut.fillet` | bent-cut signature | NG: target (face-class rows descriptive) | `share`; scalar | the share of recorded corners that are filleted | M0-b-05a, M0-b-05b |
| `cut.length` | bent-cut signature (cut lengths per face) | NG: target | `m`; distribution, 5 m bins from 0 to 400 m with an overflow bin | per cut, the length of its fillet-free course between the snapped ends; the whole-sample row carries `spreadKS.p90` over the per-template subsets | M0-b-05b |

Notes on the table:

* The role is the row's `role` field. "Descriptive when its seed-to-seed coefficient of variation exceeds 0.3" is M-1's
  rule, decided before measurement. A descriptive row reads `reported` (C-0116).
* Rows of the same two junction ids from a third reference also cross, their roles varying by preset. No AFTER-M-1
  item reads them, and N-25's selection by `reference` keeps them apart.
* The digest's entries give the longer form of five measures: R4, the court-share interior test, the junction census,
  σ's recorded frame and the derived street graph.
* A vector metric's field names are part of the id contract (N-25): one row per field.

## Attachment B (N-21): `ng-faces.json`, schema `plat.ng-faces/1`

```
// plat/packages/testkit/baselines/ng-faces.json: numbers only; every id an integer; exactly these members
{ schema: 'plat.ng-faces/1',
  referenceBuild: string,                    // the reference build; one value on the top, every hood and every face
  metricsVersion: string,                    // the registry version the records were measured under
  scaleDeclared: { mPerModelUnit: number },  // the declared metres per model unit of §17.1 (4); the one non-integer
  outlineKind: 1,                            // 1 = a hood's outline is the convex hull of its drawn road and footprint vertices
  hoods: [{ id: int, referenceBuild: string, template: 'area' | 'street' | 'square' | 'ring',
            seedLabel: string, capture: string,
            outlineCm: [[x, y], ...] }],
  faces: [{ id: int, referenceBuild: string, hood: int, template: string,
            classes: { holed: 0 | 1, cShaped: 0 | 1, triangular: 0 | 1, curved: 0 | 1, roundJoined: 0 | 1 },
            ringCm: [[x, y], ...], holesCm: [[[x, y], ...], ...],
            blockAreasCm2: [int, ...],
            cuts: [{ lengthCm: int, cornerT: int, arrivalCdeg: int, fillet: 0 | 1, bends: int }] }] }
```

* **Ids and links.** Hood ids and face ids are integers, each unique within its array. A face's `hood` names a hood id,
  and a face's `template` equals its hood's.
* **Rings** (`outlineCm`, `ringCm` and each ring of `holesCm`) are arrays of `[x, y]` pairs in integer centimetres, in one
  frame for the whole file. Each is closed (its last vertex equals its first) and simple. An outline or outer ring has
  positive shoelace area (the halved sum over its edges of x_i · y_(i+1) − x_(i+1) · y_i); a hole has negative area.
  `holesCm` may be empty.
* **`blockAreasCm2`** is non-empty and holds positive integers: the areas, in cm², of the bounded leaf blocks that the
  face's recorded cuts created.
* **Per cut.** `lengthCm` > 0 is the fillet-free course between the snapped ends, as in `cut.length`. `bends` ≥ 0 counts
  the course's bends. `cornerT` is the corner's place along the course in thousandths (0 to 1000), and −1 whenever `bends`
  is not 1. `arrivalCdeg` is the arrival angle in centidegrees (0 to 9000). `fillet` is 1 only on a one-bend cut whose
  corner was filleted, else 0.
* **Flags** (the five class flags, `fillet`) are the integers 0 and 1, never booleans. A face may carry several class
  flags at once.

The strings, for M0's C1 (and none of them may hold a colour, N-22):

| field | where | pattern or value |
|---|---|---|
| `schema` | top | the constant `plat.ng-faces/1` |
| `metricsVersion` | top | `^\d+\.\d+\.\d+$` |
| `referenceBuild` | top, every hood, every face | `^[A-Za-z0-9._:+-]{1,64}$`, one value throughout |
| `template` | every hood and face | one of `area`, `street`, `square`, `ring` |
| `seedLabel` | every hood | `^[A-Za-z0-9.:/@+_-]{1,120}$` |
| `capture` | every hood | a capture folder stamp `^\d{4}-\d{2}-\d{2}T[\d-]{8}$`, or a `research:` label `^research:[a-z0-9_./-]{1,160}$` |
| any other string | anywhere | refused, naming the field |

## Attachment C (N-22, N-23): `denylist.json`, format `plat.denylist/1` at `normalisationVersion: 1`

```
// plat/packages/testkit/baselines/denylist.json: salted, truncated digests only
{ schema: 'plat.denylist/1', normalisationVersion: 1, digestHexDigits: 16,
  date: string,          // ISO 8601 date-time of the build
  corpusCut: string,     // ISO 8601 date-time of the corpus cut
  salt: string,          // 64 lower-case hex digits, encoding 32 bytes
  counts: { <class>: int, ... },
  tokens: [digest, ...], trigrams: [digest, ...], colours: [digest, ...], files: [digest, ...],
  lists: [{ id: int, words: [digest, ...] }, ...],
  spell: [digest, ...] }  // every digest array sorted ascending, no repeat
```

* **Normalisation 1** (C-0101, pinned here to code-point classes). Apply NFKD, then remove every code point of Unicode
  general category M, then apply Unicode default lower-casing. A token is a maximal run of code points of general
  categories L and N; anything else, the underscore included, separates tokens.
* **Items.** A token item is the token. A 3-gram item is three consecutive tokens joined by one U+0020. A colour item is
  six lower-case hex digits, without `#` or `0x`. A file item is the file's bytes as stored. A list-word item is the word
  (members of four or more letters, per recorded list). A spell item is a word of the spell-check exclusion set.
* **Digest.** Take SHA-256 over the salt's 32 bytes (the decoded hex, not its text) followed by the item's bytes (UTF-8
  for a text item, raw bytes for a file). The digest is the first `digestHexDigits` lower-case hex digits of that hash.

Known-answer digests, with a test salt of the 32 bytes 00, 01, …, 1f in order (never the list's own salt). Each was
computed and cross-checked by three independent implementations on 2026-10-03:

| item | kind | digest |
|---|---|---|
| `abc` | token (a file whose bytes are `abc` digests the same) | `42fd4a8c529fdb40` |
| `alpha beta gamma` | 3-gram | `997eba001a17c8d3` |
| `zebrum` | token | `3ed08da5d2df31e8` |
| `abc`, with the salt fed as its 64-character text | the wrong construction; a test checks that it never equals row one's digest | `c053f380bd02c003` |

Normalisation cases (invented strings):

| input | tokens |
|---|---|
| `Zébrum_Plox` | `zebrum`, `plox` |
| `ABC123def` | `abc123def` |
| `x-ray 2x` | `x`, `ray`, `2x` |
| the ligature U+FB01 followed by `le` | `file` |
| `ALPHA`, two spaces, `Beta`, a tab, `gamma` | `alpha`, `beta`, `gamma`; its one 3-gram item is `alpha beta gamma` |
