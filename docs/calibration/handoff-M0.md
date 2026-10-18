# Hand-off to M0's implementer side: rows N-20 to N-25 and attachments A to C

Lane `m1/handoff-m0` (research side, M-1 wave 2), 2026-10-03. A draft for the session, which carries it to M0's build
records before M0's wave 11 (M0-k-05) and wave 13 (M0-k-06). Rows N-20 to N-23 answer M-1's four cross-side hand-offs
(ruling R-46, section 7 of M-1's plan, revision 3). Rows N-24 and N-25 were found while drafting N-20 and belong with it.

**This text crosses the clean-room line.** It holds our metric ids, units, field names, numbers we defined and our own
words only. It holds no reference word, name, colour value, identifier or measured reference number, and no path into the
research trees (the one source label below is opaque). A seat bound by `plat/CLEAN-ROOM.md` rule 1 needs nothing else to
act on it.

**How the session carries it.** Append the six rows to the notes table of `plat/docs/build/checks/M0-spec-notes.md`, and
attachments A, B and C below that table under one heading that names the rows. The ids continue after that file's last row
as of writing (N-19). If another row takes one first, renumber by the append rule of `M0-work.json`'s legend (C-0104).
Sources: M-1's plan (section 7 and its two schema sections); M-1's metric registry, version 1.0.0, regenerated on
2026-10-03 at 22:04 (`research:baselines/metrics.m-1.json`); and the field set of M-1's face-record candidate.

## Rows

| id | item | observation | suggested handling |
|---|---|---|---|
| N-20 | M0-k-05 | *(session hand-off from M-1, 2026-10-03; before wave 11)* M-1's `baselines.json` rows name their metric by M-1's ids. None of the 20 ids that the AFTER-M-1 items read appears where M0's seats read: an exact search of `docs/ARCHITECTURE.md`, `M0-work.json`, `plat/docs/` and `plat/packages/` finds 0 of 20. The parity CLI pairs a row with a metric by id. A registry with ids of its own would therefore read every M0-gated ⟨M-1⟩ cell as "⟨M-1⟩ row missing" (fail, C-0116). Attachment A gives each id with its §13.5 row, its reference and role, its unit and output form, its `metricVersion`, and what M-1 measured under that version. The file will also hold rows for metrics M0 does not register: 81 metric ids carry M-1 rows, from three references. | `METRICS` takes attachment A's ids exactly (a case-sensitive match), with its units and `metricVersion` `1.0.0`. Where M0's measure can only be a proxy of attachment A's (the block-axis R4 and wall alignment of C-0018), the row is compared and reported, never gated, and the report names the proxy. A row whose metric `METRICS` does not register is listed in the report as unread. It changes no verdict and never stops the CLI. Tests: a snapshot of attachment A's ids, units and versions; a hand-built row with an unregistered metric is listed and leaves the summary's counts unchanged. |
| N-21 | M0-k-05 (`loadNgFaces`, `baselines:check`) | *(session hand-off from M-1, 2026-10-03; before wave 11)* M0 knows `ng-faces.json` only through C-0086's description. Its field names, units and conventions are M-1's, and attachment B gives them whole. `referenceBuild` sits on the top record, on every hood record and on every face record, with one value throughout, so C-0101's refusal of a face without it never fires on M-1's file. Every number is an integer except one, the header's declared scale. The only free strings are a hood's `seedLabel` and `capture`. Every other string is a constant or the template enumeration. The file has no in-file crossing member: its crossing record is its `crossings.json` entry (C-0092). | `loadNgFaces` and the check read the file as attachment B states: the seven top-level members and no other, hoods and faces with exactly their listed fields, rings closed and simple with the stated orientation, every number an integer except `scaleDeclared.mPerModelUnit`, and the cut fields within their ranges. Anything else is refused, naming the record and the field. M0's C1 (strings by pattern) checks each string by attachment B's pattern for its field and refuses any other string. Tests: a synthetic file in attachment B's form loads. Each of these is refused, naming the record and the field: a face without `referenceBuild`, a hood without it, a decimal coordinate, an unknown member, and a `seedLabel` outside its pattern. |
| N-22 | M0-k-05 (`baselines:check`), M0-k-07 | *(session hand-off from M-1, 2026-10-03; before wave 11)* The check that M0-k-07 needs has two gaps. (1) `baselines:check` is specified over `baselines.json` and `ng-faces.json` only, yet M0-k-07 starts only after `denylist.json` has passed it. (2) "No colour value" (M0's C3), read as "no six-hex-digit run anywhere in the file", refuses all three files M-1 crosses. Every 16-hex digest and the 64-hex salt of `denylist.json` holds such runs. `ng-faces.json`'s integer cm and cm² values reach nine digits. The registry's log-spaced bin edges are written to six decimals, and a distribution row's `bins` can repeat them. A colour is a string, and a JSON number never holds one. | Add a `denylist.json` file kind to `baselines:check`. Its C1 uses attachment C's patterns: the constant schema, ISO 8601 `date` and `corpusCut`, a 64-hex `salt`, every digest exactly `digestHexDigits` lower-case hex digits, and each digest array sorted with no repeat. Its C3 follows the reading below. The other checks have nothing to read in this kind; C4 does not apply, because a new list replaces the file whole with its own record and M0-k-07 re-runs on it. The `crossings.json` record check applies as for every kind. For every kind, C3 reads a colour only inside a JSON string value, as a run of exactly six hex digits bounded by non-hex characters or the string's ends (a `#` or `0x` before it allowed), and never inside a number. The list holds about a million digests (tens of megabytes). Tests: a string holding a six-hex run fails C3, while a 16-hex digest, a 64-hex salt, a nine-digit integer and a six-decimal number each pass; a synthetic deny-list passes the new kind, and one with an unsorted array or a 15-digit digest fails C1 naming the field. |
| N-23 | M0-k-06, M0-k-07 | *(session hand-off from M-1, 2026-10-03; before wave 13)* C-0101 states version 1's digest as SHA-256(salt ‖ item). M-1's list truncates every digest to its first 16 hex digits and says so in a header field, `digestHexDigits: 16` (attachment C). A scanner that compared full digests would pass the version check and match nothing: zero hits, a silent pass. Two byte-level points also decide whether any digest matches: the salt enters as its 32 bytes, not as its 64-character text, and a text item enters as its UTF-8 bytes. | The scanner reads `digestHexDigits` and truncates its own digests to that many lower-case hex digits. When the field is absent or holds any value other than 16, the scan stops with exit 2, naming the field and its value, as it stops on a version mismatch. Its tests add attachment C's known-answer digests and the salt-as-text negative case. Before the list crosses, M-1 runs a planted-hit control. The deny-list seat runs it, because it is research-side and so the only seat that may know a listed token. It copies `plat/` to a scratch folder outside the project, puts the candidate list in the copy's baselines folder and one listed token in one string literal of the copy, and runs the copy's `corepack pnpm scan`. It expects exit 1 with one hit at that file and line (the report names no token), then deletes the copy. The scan must therefore resolve `plat/` and the list relative to the copy it runs in, never by an absolute path. M0-k-06's checker confirms this with one scan in a scratch copy. |
| N-24 | M0-k-05 (`baselines:check`'s C1, `METRICS`) | *(found while drafting N-20, 2026-10-03)* Ten of attachment A's twenty ids carry an upper-case letter (for example `sgd.tShare`, `block.countTemplate` and `bldg.wallAlign.share15`), and so do 38 of the 81 metrics with M-1 rows. Volume 12's string pattern for a row's `id`, `metric` and `supersedes` admits lower case only, so a C1 built to it refuses those rows. The session also asks the design and M-1's research-side twin of the check to widen the pattern. | M0's C1 admits `^[A-Za-z0-9.:/@+_-]{1,120}$` for `metric`, `id` and `supersedes`, and ids match case-sensitively. Test: a row whose `metric` is `block.countTemplate` passes C1 and pairs with its `METRICS` entry, while `block.counttemplate` pairs with none. |
| N-25 | M0-k-05 (the parity CLI); M0-b-05a, M0-b-05b, M0-c-07a, M0-c-07b | *(found while drafting N-20, 2026-10-03)* One metric can have several rows that differ by subset and, for a vector metric, by field. `cut.sigma` has whole-sample, plain-face, ring-face, per-template and per-face-class rows; `block.countTemplate` has one row per template; `junction.angles` has two fields, and each wall-alignment metric has three (attachment A). §13.5's `Baseline` has no member for either key, so the CLI cannot tell σ on plain faces from σ on ring faces. | M-1 writes both keys as the last segments of the row `id`: `…/<subset>` for a scalar or distribution metric, and `…/<subset>/<field>` for a vector metric. The subset is `all` (the row's whole sample), `plain` or `ring` (the bent-cut face kinds), `template-` plus a template name, or `class-` plus a face-class flag name (attachment B). The field is one of attachment A's field names. The segments before them are M-1's to fill. The CLI never parses them; it selects a row by `metric`, `reference`, `matched` and the trailing segments only. Tests: hand-built rows for σ on plain and ring faces, one per-template count and both junction-angle fields are each selected exactly once; a row whose trailing segment names no known subset or field is reported, naming the row, and not read. |

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
