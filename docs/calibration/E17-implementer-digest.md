# E17 — the implementer digest: the nine entries of R-20, drafted as the crossing candidate (W-17)

Lane `m1/W-17-draft`, 2026-10-04 (from 08:00 EDT; the landing time is in `docs/lane-events.log`), the digest seat of plan
`M-1-plan.md` section 2's row W-17 (seat tier Fable), on the owner's Mac beside M0's build seats. A research-side record
(`plat/CLEAN-ROOM.md` rule 2: implementer seats do not read it). It holds numbers, metric ids, file paths and our own
words. Nothing was written into `plat/` (the digest is a **candidate** under `docs/digest-candidate/`; it crosses into
`plat/docs/digest/` at W-20, after M0-k-06 has landed, through W-18's check), no captured program bundle was opened, no
website was touched, no benchmark ran, and no git command changed state. W-18 appends its check to this record.

## Outcome

**The digest candidate exists: ten crossing files (an index and the nine entries of R-20) and this seat's reading log,
under `docs/digest-candidate/`; every check of the row's checker column passes on each file (CONFIRMED, executed;
section 4).** The research twin of the content scanner, run with **no allow file** against both deny-lists — M0's exit
list (`denylist.json`, the list M0-k-07 will read) and the research list (`denylist.v1.json.gz`, with the `id` and `phr`
classes M0's format cannot hold) — reports **0 hits in every class** on the ten crossing files (exit 0 on both), and
`doc_checks.py --doc … --heads docs/ARCHITECTURE.md` on each file gives 0 hits on C1, C2, C3, C4, S1 and S2 (exit 0).
No file names a research path, a finding, a reference identifier, a word list, a palette or a table: records are
cited by opaque `research:` labels, rows by their `baselines.json` ids, the design by its section numbers.

The nine entries, each written for the AFTER-M-1 run item that needs it (plan section 2 W-17; `M0-work.json`
`afterM1Needs`; R-20):

| entry | file | source records | for |
|---|---|---|---|
| (1) how NG's σ was measured — the recorded frame, f along the parent's bounding rectangle, the contaminated fit, the rotated retries on our side only | `01-ng-sigma-frame.md` | E10 §3, §9.3–9.7; E15 §4, §8, D11–D12 | M0-b-05a, M0-b-05b |
| (2) the re-fitted depth rows, the dense-core floor, `cut.flattenM` and the relative term | `02-depth-rows-refit.md` | E12 §11–§14 (the ruled text of section 14 restated) | M0-b-05a, M0-b-05b |
| (3) R4's definition confirmed (C-0018) with the nine rows and the wall-alignment companions | `03-r4-definition.md` | E07 §2, §3, §9.5, §9.8; E15 §4, §8 | M0-c-07a |
| (4) the hollow-block frequency's definition on NG's faces and MFCG's cluster blocks; the like-for-like deep population | `04-hollow-block-definition.md` | E11 §2, §4, §10.3; E09 §2, §7; E12 §11 (O-12), §13 (D-1), §15 (R5) | M0-c-07a |
| (5) the junction census, T against crossroads | `05-junction-census.md` | E11 §2, §4, §10.3; E05 §4; E15 §4, §8 | M0-c-07a |
| (6) the deep-interior shares and the `MFCG` preset row | `06-deep-interior-shares.md` | E12 §14 (the ruled text restated), §12 | M0-c-07a |
| (7) the derived street graph's twin derivation, its five parameters, the rows, the sensitivity proxy | `07-derived-graph-twin.md` | E09 §2, §6, §7; E14 §5–§7; E08 §3; E15 §4 | M0-c-07a |
| (8) the declared NG scale and the registered frame | `08-ng-declared-scale.md` | R-01; E11 §2, §10.2–10.7; E10 §3, §9.6; E15 §4 | every NG metre row; `ng-faces.json` |
| (9) the recorded CITY family and the non-default setting | `09-ftg-city-family.md` | R-02, R-04, R-33, R-34; E05 §1, §4, §9.6; E15 §2, §4, D1, D3, D14 | every FTG `CITY` row |

The depth rows and the shares reach M0-b-05a and M0-c-07a **through entries (2) and (6)**, as R-20 orders; the design
amendment that records the same cells is the design seat's (E12 §13), not this lane's.

## 1 What was written

| file | bytes | sha256 (first 16) | crosses |
|---|---|---|---|
| `docs/digest-candidate/INDEX.md` | 3 340 | `293ee71d734f8fe5` | yes (the digest's index; the scaffold's `README.md` in `plat/docs/digest/` stays) |
| `docs/digest-candidate/01-ng-sigma-frame.md` | 7 886 | `7583e7f5b9470311` | yes |
| `docs/digest-candidate/02-depth-rows-refit.md` | 8 390 | `8d97212fd68f1dd6` | yes |
| `docs/digest-candidate/03-r4-definition.md` | 4 933 | `383381c9675e80fb` | yes |
| `docs/digest-candidate/04-hollow-block-definition.md` | 5 434 | `b9cc26d567cfa768` | yes |
| `docs/digest-candidate/05-junction-census.md` | 5 026 | `b46d7218722a8d1f` | yes |
| `docs/digest-candidate/06-deep-interior-shares.md` | 5 538 | `8064b73e6d9c3bd3` | yes |
| `docs/digest-candidate/07-derived-graph-twin.md` | 8 988 | `98481b1f29527fa3` | yes |
| `docs/digest-candidate/08-ng-declared-scale.md` | 5 845 | `7031687c2cf5e599` | yes |
| `docs/digest-candidate/09-ftg-city-family.md` | 6 667 | `8219a11cf68d7c3e` | yes |
| `docs/digest-candidate/READING-LOG.md` | 5 511 | `d00ba76bf91d4b73` | **no** — this seat's logged reading list (plan section 7's "logs every file read"); it names research paths and stays research-side |

The bytes and hashes are those of the files after round 3 (lane `m1/round3-apply`, section 9): the draft's byte column
was wrong for every file and its hashes for entries (1) and (6) predated the draft's last edits (the wave-3 verifier,
`results/wave3-verify-ab.json`), and round 3 changed entries (1), (4), (6) and (9). W-18 reads the files, not this
table. No new
tool was built: the row names none (the digest is prose), and the checker column's instruments already exist —
`docs/validation/bench/doc_checks.py` (the scripted document checks of §17.1 (2)) and the scanner's research twin
`research/baselines/make_denylist.py scan` (W-16b's lists).

## 2 How the entries were built

Each entry has the same shape: why the entry exists (the clause of §13.5 or §16 it serves), the definition or frame in
our words, the numbers as `baselines.json` rows (id, p50 [p10, p90], n, band, note), the design cells it touches by
section, the creator's stated idea in our words where the findings hold one, the P-ids the design adopted for the
mechanism behind the measurement, and a CONFIRMED / PLAUSIBLE line. The sources per entry are the Outcome table's;
the full reading list is `READING-LOG.md`.

* **Entries (2) and (6)** restate E12 section 14's ruled texts in the digest's form (the same numbers, the same
  readings; the share table written with the share names beside each number).
* **Entries (1), (3), (4), (5), (7), (8)** state the measuring definitions of E10, E07, E11, E09, E14 and E08 in our
  words, with every parameter a like-for-like implementation needs (E14 §7's five parameters for the derived graph; the
  snapping, the cut tree and the fit grids for σ; the merge, the arm length and the two kinds of T for the census; the
  inscribed-radius, dilation and component rules for the court share).
* **Entry (9)** states the family's members in order with their reasons, the row form an FTG reader meets (every slot
  listed, `failed` with reasons), the pin and the nominal population.
* **The creators' stated ideas** come from the findings on NG's and MFCG's public posts and FTG's public guide
  (`READING-LOG.md` names the files and lines); each is paraphrased, never quoted, and names no post, title or person.
* **The P-ids** (P1–P7) come from `code-impact.md` section (d), carried as ids and behaviours only; no class name or
  reading reference entered any file.

## 3 The rules kept

1. **Our words, numbers, metric ids and section references only.** The design pointers used are §2.5, §4.4, §4.6,
   §4.7, §7.6, §13.5, §13.6, §16 and §17.1 of `docs/ARCHITECTURE.md`; every one resolves to a heading (S2, section 4).
   No V12 pointer: M0's implementers read no volume (C-0092), so every definition is restated rather than cited.
2. **No research path.** Records are named `research:M-1/E10` and the like, an opaque label (plan section 7; V12 §3.3
   C2's rule for row provenance applied to prose). A search of the ten crossing files for `research/`, `captures/`,
   `/Users/`, `profiler/`, the word "findings" and the three reference programs' author or engine names finds nothing.
3. **No code, identifier, word list, palette, grammar or table.** The reference builds appear only as the rows'
   `referenceBuild` strings the design itself quotes (`itch:11441280`, `itch:12710731`, the FTG programme pin); the four
   NG template names and the FTG size names are the design's own keys (rulings-1 header, rulings-2 header).
4. **The digit rule.** Where a run of numbers in the first draft matched a number-only 3-gram of the deny-list's corpus
   (the N-26 class: histogram counts and share rows), the run was broken by words or units rather than by changing a
   number (the share tables carry the share's name beside each value; a few lists became clauses). No number was
   altered.
5. **Every 3-gram hit removed, not reviewed.** The first scan of the nine entries gave 91 TRI hits (81 unreviewed under
   the two allow files; the same 91 as `doc_checks.py`'s C3 on their concatenation), every one an ordinary phrase or
   digit run shared with a capture README or a finding; five rewording rounds (91 → 27 → 12 → 4 → 2 → 0) removed them
   all, so the files pass with **no allow row at all** and nothing is left for W-18 to review.

## 4 Receipts (the row's checker column, executed by this seat; CONFIRMED)

The row's checker column on the ten crossing files: `doc_checks.py --doc <file> --heads docs/ARCHITECTURE.md` (C1–C4,
S1, S2; hits / unreviewed) and the scanner's research twin with **no allow file**
(`make_denylist.py scan <files> --list m0 --allow` and the same with `--list research`; every class). The draft's own
runs (five of the ten per-file checks, and the scans before entries (1) and (6) were last edited) left this section a
placeholder; the wave-3 verifier ran all ten checks and both scans on the draft's final bytes, and round 3 re-ran both
on the four entries it changed (section 9). Each row below names the run that holds for the file's current bytes.

| file | sha256 (first 16) | `doc_checks.py` (C1–C4, S1, S2) | scan, M0 list | scan, research list | run |
|---|---|---|---|---|---|
| `INDEX.md` | `293ee71d734f8fe5` | none in any class, exit 0 | 0 hits in every class, exit 0 | 0 hits in every class, exit 0 | `m1/wave3-verify-ab`, 2026-10-04 09:36–10:28 (the draft's final bytes, unchanged since) |
| `01-ng-sigma-frame.md` | `7583e7f5b9470311` | none in any class, exit 0 | 0 hits in every class, exit 0 | 0 hits in every class, exit 0 | `m1/round3-apply`, 2026-10-04 (151 s) |
| `02-depth-rows-refit.md` | `8d97212fd68f1dd6` | none in any class, exit 0 | 0 hits in every class, exit 0 | 0 hits in every class, exit 0 | `m1/wave3-verify-ab`, 2026-10-04 09:36–10:28 (the draft's final bytes, unchanged since) |
| `03-r4-definition.md` | `383381c9675e80fb` | none in any class, exit 0 | 0 hits in every class, exit 0 | 0 hits in every class, exit 0 | `m1/wave3-verify-ab`, 2026-10-04 09:36–10:28 (the draft's final bytes, unchanged since) |
| `04-hollow-block-definition.md` | `b9cc26d567cfa768` | none in any class, exit 0 | 0 hits in every class, exit 0 | 0 hits in every class, exit 0 | `m1/round3-apply`, 2026-10-04 (149 s) |
| `05-junction-census.md` | `b46d7218722a8d1f` | none in any class, exit 0 | 0 hits in every class, exit 0 | 0 hits in every class, exit 0 | `m1/wave3-verify-ab`, 2026-10-04 09:36–10:28 (the draft's final bytes, unchanged since) |
| `06-deep-interior-shares.md` | `8064b73e6d9c3bd3` | none in any class, exit 0 | 0 hits in every class, exit 0 | 0 hits in every class, exit 0 | `m1/round3-apply`, 2026-10-04 (149 s) |
| `07-derived-graph-twin.md` | `98481b1f29527fa3` | none in any class, exit 0 | 0 hits in every class, exit 0 | 0 hits in every class, exit 0 | `m1/wave3-verify-ab`, 2026-10-04 09:36–10:28 (the draft's final bytes, unchanged since) |
| `08-ng-declared-scale.md` | `7031687c2cf5e599` | none in any class, exit 0 | 0 hits in every class, exit 0 | 0 hits in every class, exit 0 | `m1/wave3-verify-ab`, 2026-10-04 09:36–10:28 (the draft's final bytes, unchanged since) |
| `09-ftg-city-family.md` | `8219a11cf68d7c3e` | none in any class, exit 0 | 0 hits in every class, exit 0 | 0 hits in every class, exit 0 | `m1/round3-apply`, 2026-10-04 (164 s) |

**0 code excerpts, 0 reference word lists, palettes or tables, 0 deny-list hits** on the ten files (CONFIRMED). The
planted-leak test and the implementer-side run of M0's own scanner are W-18's (section 6).

## 5 Calls made under the delegation (J122; each vetoable; none changes a design cell or a ruling)

| id | decision | why; the alternative |
|---|---|---|
| D1 | ten crossing files — an `INDEX.md` and one file per R-20 entry, named by number and subject — rather than one digest file | C-0120 (1) attributes each crossing file by its own record and CLEAN-ROOM §3 reports per file; an entry can be re-crossed alone when a later wave moves one cell. Alternative: one file, one record, every change re-crossing everything |
| D2 | `INDEX.md`, not `README.md`, for the index | `plat/docs/digest/README.md` is the scaffold's and is the one file of the folder that is not a crossing file (C-0120 (1)); the index must cross |
| D3 | records cited as `research:M-1/E10`-style labels; rows by id; the design by section | plan section 7's "no research path but an opaque label"; a row id is the one name an implementer can resolve (`baselines.json`); V12 is not in an M0 implementer's reading set |
| D4 | the creators' ideas paraphrased, never quoted | §17.1 (2) allows "a creator's sentence under 15 words quoted for traceability" as a reviewed hit; a paraphrase needs no review and names no post. Alternative: short quotes with allow rows, which W-18 would have to carry |
| D5 | entries (4) and (6) tell M0-c-07a to read the court share over the reference's deep population (inscribed radius > 1.5 × the median short side) until E12's D-1 amendment lands | E12 §15 R5: the design's own test admits 3 of NG's 597 deep blocks at the ruled depth, so the keep-test would judge an empty set; the digest is the channel R-20 names for M0-c-07a. Alternative: say nothing and let the parity run report an empty population. **History since round 3:** the amendment applied D-1 as thickness > 0.6 × the band's plot depth (J-1), which reproduces the reference's population at `modest`; entries (4) and (6) now state the applied test and the interim reading is gone (section 9) |
| D6 | entry (7) carries the `fg.recoverability` and `fg.streetwall` rows beside the D11 rows | they read the same derived graph and cluster blocks (E08 §3), and an implementer deriving one should derive all alike. Alternative: a tenth entry, which R-20 does not name |
| D7 | entry (8) carries the registered-frame paragraph (NG's two canvases and their offset) | every footprint-to-road NG row and the face-record file rest on it (E11); R-20 (1) asks for "the recorded frame". Alternative: leave it to `ng-faces.json`'s hand-off, which names the frame but not the step |
| D8 | the scanner run with no allow file; 0 total hits the bar | CLEAN-ROOM §3's report form is "0 deny-list hits"; a reviewed hit is a hit the next checker must re-read. Alternative: allow rows for ordinary phrasing (the design set's practice), which the digest's size does not need |
| D9 | the digit rule applied by rewording, never by changing a value | R-46's rule that crossing numbers stay comparable; a number-only 3-gram hit is N-26's class and says nothing about content |
| D10 | this record's name `E17-implementer-digest.md`; W-18 appends its check section here | plan section 1 D18 and section 2 give W-17 and W-18 one record, E17 |

## 6 Hand-offs

* **W-18 (the digest check, Opus verify, Fable read).** The ten crossing files; the receipts of section 4 to re-execute
  (`make_denylist.py scan docs/digest-candidate/0*.md docs/digest-candidate/INDEX.md --list m0 --allow --show`, the same
  with `--list research`, and `doc_checks.py --doc <file> --heads docs/ARCHITECTURE.md` per file); the seeded planted-leak
  test on a scratch copy (the row's checker); the report's three counts for `plat/CLEAN-ROOM.md` §3, entered at W-20.
  `READING-LOG.md` is not read by W-18's implementer-side seat (it names research paths; W-19 reads it at the exit).
* **W-20 (the crossing).** The ten files are placed under `plat/docs/digest/` beside the scaffold's README, each with
  its crossing record in `crossings.json` (R-18; C-0120), only after M0-k-06 has LANDED and while a build or AFTER-M-1
  wave is open (R-32). Nothing of this lane touched `plat/`.
* **The session (C-0071's channel).** Entries (2) and (6) are the channel R-20 names for M0-b-05a's and M0-c-07a's
  cells; the design amendment (E12 §13: C-1 … C-9, D-1 … D-3) records the same numbers. If a veto reaches E12's O-2 or
  O-6, entries (2) and (6) are re-drafted with the vetoed values and re-checked (every number in them is E12 §12's).
* **The design seat.** No new correction from this lane. The entries restate corrections already routed: E12 §13's
  D-1 … D-3 (entries 4 and 6), E10 §9.4's DC-26 successor (entry 1: σ plain 0.084, one bend 0.657, corner 0.883),
  E09 F1's granularity anchor (entry 7), E15 §8's recomputed bands (entries 3, 5, 7). Since round 3 entries (1), (4)
  and (6) state them as applied by design/m1-corrections-2 (section 9).
* **W-19 (the exit check).** `READING-LOG.md` is this seat's reading list for the seat ledger.

## 7 CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed or read):** every number in the ten files, read from E05, E07, E09, E10, E11, E12, E14, E15 and
the candidate `baselines.json` (each row id cited was looked up in the candidate and its value, role and note compared;
the FTG slot facts in `plan.json`); the receipts of section 4; the absence of path strings; the pointer resolution.
**PLAUSIBLE (reasoning):** that W-18's implementer-side run of M0's own scanner (M0-k-06, built after this lane) reads
the files as the research twin does (E16 §9.7's hand-offs — the 3-gram hit as a run, the literal colour rule — are
the session's to carry); that the paraphrases of the creators' ideas are what their posts meant (each is read from a
finding's own paraphrase of a post, not from the post); the PLAUSIBLE lines inside each entry, which are the measuring
records' own.

**Deliberately not done (documented, not a bug to re-find).** No file under `plat/` written (W-20's); no design file
edited (the design seat's amendment); no `baselines.json` row touched (W-15's); no allow row added to either allow
file (none is needed); E06's market-square note, E08's figure-ground rows beyond their definitions and E13's bootstrap
are outside R-20's nine entries and were not digested (E06 §8 and E08 §3 were read; they are summarised in
`READING-LOG.md`).

## 8 Disk and housekeeping

`df -h /Users/cstokes`: 11 GiB free at the start and the end; `memory_pressure` 72 % free. One scan or check process at
a time at nice 10. The scratch files (the five scan passes, the per-file check outputs, the receipts script and its
JSON) live in the session scratchpad `m1w3/`; the digest candidate is 66 KB in all.

## 9 Round 3 (lane `m1/round3-apply`, 2026-10-04): four entries restated on the applied design

The research apply seat of rulings round 3 (`M-1-rulings-3.md`; plan notes section 7 (c); the wave-3 verifier's W-17
points) changed four crossing files, no other file of the folder (`diff` against copies made before any edit):

* **(6) `06-deep-interior-shares.md`.** Section 3 calls both §7.6 changes applied — the `MFCG` entry 0.813 / 0 / 0 / 0.187
  in every band, and the step that resolves a cell under `NG` to its default when that default is NG's own rule or was
  calibrated on NG's output, with the amendment's extension to `cut.bendMode` and `cut.flattenM` (J-2), not routed.
  Section 4 states the applied deep test, local thickness > 0.6 × the band's plot depth (J-1): 21.6 m at the re-fitted
  `modest` depth, the reference's own threshold, admitting 593 of NG's 597 deep blocks and no other (court share 0.465
  against 0.462; the wave-3 verifier's count), the replaced test's 98 and 3 as history. Section 5 names J-1 and J-2 as
  vetoable calls with their veto's effect.
* **(4) `04-hollow-block-definition.md`.** Section 3 states the same applied test and drops "until the amendment lands";
  the census behind the factor stays; item 1's inscribed-radius test stays the reference row's definition.
* **(1) `01-ng-sigma-frame.md`.** The paragraph against the design's figures states σ 0.084 (plain faces) and 0.094
  (ring faces) as applied in the bent-cut signature of §13.5, §16's M0 clause (b) and §4.6's position step, with the fixture
  figures as history (F6, DC-38).
* **(9) `09-ftg-city-family.md`.** The "no silent gap" sentence carries the exception R-53 rules (a row with `values.n` 0
  lists every member in `failed`, and its `values.seeds` is the member count); the row of river widths is named by its
  id `water.channelWidth`.

Each touched file was scanned with no allow file against both lists and checked by `doc_checks.py` (section 4); five
phrases of the first wording formed 3-gram runs on both lists and were reworded, so no allow row was added. Entry (2)
quotes no σ and needed no change; the index's row for entry (6) still describes it.
