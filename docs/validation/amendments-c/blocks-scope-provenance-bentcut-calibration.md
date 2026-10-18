Blocks of seat S1 `scope-provenance-bentcut-calibration` (amendments c + d + e, bundled pass; opus stand-in for the Fable seat).
Text before the first block header is ignored by the assembler. Planned blocks (for the other seats' double-REPLACE guard):
PLANNED REPLACE (S1 owns, route §C.2 / §C.9.3): ### 17.1 The clean-room chain (IMP-1; D-29)
PLANNED REPLACE: ### 13.5 Reference-parity metrics (B-REF), read from one numbers-only baseline file
PLANNED REPLACE: ### 13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT  (S2 APPENDs its owner-rule / port / toolkit group after it — exception 2)
PLANNED REPLACE: ### 1.3 The thesis in one paragraph
PLANNED REPLACE: ### 1.4 Fusion thesis, stage by stage
PLANNED REPLACE: ### 0.3 Evidence discipline
PLANNED REPLACE: ### 0.2 Where the owner's late rules land — items 1–7 ... (heading kept byte-identical)
PLANNED REPLACE: ## §16 Build plan — calibration and spikes first, then a viewable town, then editing, then parity, then stage 2
PLANNED REPLACE: # Delegated decisions (the owner deferred all judgment; each is final unless vetoed)
PLANNED REPLACE: # Appendix A — reading record, and CONFIRMED versus PLAUSIBLE
PLANNED APPEND TO SECTION: ## The whole design in one page (plain words)
PLANNED: J-ROWS, RATIONALE-A
Note for S2: S1's §13.2 REPLACE carries a new bullet "Amendments c (items 33–62): the code-reading items' bars" (T41, T43, T44, T45, T46, T47, T50, T57 bars);
S2's APPEND group carries the owner rules (20 (h), 63–72), the port (73–88) and item 101 only.

=== REPLACE ### 17.1 The clean-room chain (IMP-1; D-29) ===
### 17.1 The clean-room chain (IMP-1; D-29)

1. **Who reads what.** *Research seats* (readers, measurers, the digest writer) may read the findings, `captures/`,
   `research/` and — under the standing ruling — `reference/`. *Implementer seats* (anyone writing code, tables, style
   sheets, content, assets or tests in `plat/`) read only `docs/ARCHITECTURE.md`, the implementer digest in
   `plat/docs/digest/`, the `plat/` repository, published algorithm papers and the public documentation of adopted
   libraries; they never open `research/`, `captures/`, `reference/`, the findings, the critics, `docs/confidence/`,
   `docs/improvements/`, `docs/CONFIDENCE.md`, `docs/IMPROVEMENTS.md` or the red-team files. The citations in this
   document are for traceability; an implementer follows them only into the digest. No code from TownGeneratorOS
   (GPL-3), the FTG Foundry module or any captured bundle is read for implementation, ported or paraphrased (J-A21.01).
   **Reading the captured references to understand them (the owner's directive of 2026-09-27).** Since that date
   research reader seats have also read the captured bundles of MFCG 12710731, VG 1.6.9 (itch 19365073), NG 1.2.2
   (itch 11441280), Fantasy Manor 1.0.0 (build 890), Dwellings (itch 17195045) and the FTG client of the 2026-09-25
   capture — to understand their logic, never to reuse it: no code, constant table, grammar, palette, word list or asset
   was copied. What they wrote (`research/findings/code-*.md`, the critic `_critic-code.md` and `research/findings/code-impact.md`, which traces every adopted idea to its source) are research files behind the same firewall as every other finding, never an
   implementer's input; the checks of (2) and the scan of (5) stay in the build gate unchanged; and a mechanism the
   readings show to differ from an earlier inference of this document reaches it only as our own re-derivation,
   carrying (6)'s `(code)` provenance (the amendments of 2026-09-27, items 33–61; J-A32.01). The design seats of that pass read those files — never a bundle (Appendix A).
2. **The implementer digest.** A digest seat writes `plat/docs/digest/` from the research: behaviours, measured numbers
   (each with its `baselines.json` id or finding reference) and the creators' stated ideas — no code excerpts, no
   reference word lists, grammars, palettes, tables or identifiers. A separate checker seat, which reads only the digest,
   runs the content scan of (5) on it and files a report with it; every change to the digest repeats the check. This
   document is held to the same rule. The hashed scan of (5) needs the deny-list that M-1 builds, so until then **every
   seat that writes this document — a fix-all integration seat, an amendment pass's apply and repair lanes, any
   finishing or repair seat — runs, before its change lands,** the scripted document checks of
   `docs/validation/bench/doc_checks.py`, from the project root:
   `python3 docs/validation/bench/doc_checks.py --sections "⟨every section heading key the change touched⟩"` — the
   content checks (iii) and (vi) over the sections the change touched, the others over the whole document (J-S32):
   (i) *identifiers* — a whole-word, case-sensitive search for the backticked identifiers of
   `research/findings/ftg-payload-visual.md` §7.2 and one further time-setting message name — 36 names, which the script
   reads from the finding or holds research-side, so none is copied into this document;
   (ii) *colours* — every six-digit colour value of the document (`#rrggbb` or `0xrrggbb`) looked up, case-insensitive
   and hex-delimited, in `research/` (its text files, JSON included), `captures/**/README*.md`, `captures/**/*.json`,
   `docs/confidence/`, `docs/improvements/`, `docs/CONFIDENCE.md` and `docs/IMPROVEMENTS.md`;
   (iii) *token 3-grams* — the lower-cased word tokens of the changed sections against every 3-gram of
   `research/findings/*.md` and of the string keys and values of every JSON file under `research/` and `captures/` —
   FTG's content database and every capture body included — taken in document order with purely numeric tokens dropped;
   a hit is a run of three or more consecutive shared 3-grams (five or more tokens in a row that also stand together in
   a finding or a capture) — the size at which a copied list, table row, grammar line or palette shows, while a single
   shared 3-gram ("per 100 m") is ordinary phrasing;
   (iv) *tables* — outside fenced code (a fence may be indented, as inside a list item) every line that starts with `|`
   ends with `|`, no other line sits between two table lines (a table row split over several lines renders as broken
   rows), and every row has its header's number of cells, counting only unescaped pipes (GitHub-flavoured Markdown splits
   a cell at every unescaped `|`, inside a code span too, and drops the cells beyond the header's count, so inside a table
   a pipe in code is written `\|`, which the renderer shows as `|`);
   (v) *pointers* — every `§n` and `§n.m` pointer resolves to a heading of this document;
   (vi) *lists, in any order* (J-S35) — a 3-gram needs the list's order, so a list pasted alphabetised shares none with
   its source: every JSON file under `research/` and `captures/` except the profiler's recordings (call censuses,
   coverage, idle, trace, draw and path records, run reports, metadata, session and index files — code identifiers and
   events, which (i) and (iii) cover) is read for its lists — a dict's keys, an array of strings, one field's string
   values across three or more records — and a hit is a line of the changed sections holding five or more distinct
   whole words of four or more letters that are members of one such list, reported as those words, sorted.
   Each hit is corrected before the change lands or reviewed: a reviewed hit is entered in
   `docs/validation/doc-checks-allow.tsv` with its check, its exact text and a written reason (a capture-citation file
   name, a measured number, a creator's sentence under 15 words quoted for traceability, ordinary phrasing, generic
   vocabulary in our own selection and order, a pointer into another document). The script exits non-zero while any hit
   is unreviewed, the change does not land until it exits zero, and the seat records its counts in its output file (a
   fix-all pass in its integration log, an amendment pass in its assemble and repair reports under
   `docs/validation/⟨pass⟩/` — amendments b's in `docs/validation/amendments-b/assemble-r⟨n⟩.md`). From M-1 the hashed scan of (5) — whose list sets do (vi)'s work on salted digests — also
   runs over this document and replaces (i)–(iii) and (vi); (iv) and (v) stay. The checks' executed calibration is
   recorded in `docs/validation/bench/fixall_scope_r4_cleanroom.out` and `fixall_scope_r5_checks.out` (history:
   `docs/ARCHITECTURE-RATIONALE.md`).
3. **The repository boundary.** The product is its own repository, `plat/`, at the root of this folder, outside
   `research/`, `captures/` and `reference/`. A PR-tier CI rule fails any import specifier, fixture path, script path or
   build input that resolves outside `plat/` (symbolic links resolved). The product's CI never reads the research trees.
   The frozen dossier fixtures and their manifest (`plat/tests/fixtures/dossier/`, §13.2; item 84) lie inside `plat/` like
   every other fixture, and none is ever placed under `research/` or `captures/`. SettlementForge is the owner's own
   program, not a reference: its dossier field names are quoted in this document (§7.7, §14), and its dossiers enter
   `plat/` only as those fixtures.
4. **Reference numbers only through committed numbers-only files.** Research-side scripts (`research/baselines/`)
   measure the captures and write numbers with provenance (§13.5's `Baseline` rows); the file, `baselines.json`, is
   committed into `plat/packages/testkit/baselines/`, and the parity CLI reads only it. The D-5 panel is assembled
   research-side from the product's PNG exports and the capture images (§13.6); its inputs to the product are three files
   committed the same way into `plat/goldens/d5/⟨milestone⟩/`: `ftg-captures.json` (capture ids, rungs, water settings,
   resident counts) and `ng-counts.json` (NG hoods' building counts), numbers only, which `plat d5 seeds` reads and
   nothing else, and the sitting's `record.json` — numbers, hashes and the owner's answers, no reference image or
   reference data (§13.6 (9)) — which the milestone record and the release notes read.
5. **The content scan.** Research-side, `research/baselines/make_denylist.py` builds the deny-list from the creative
   data the findings and captures record — the references' naming-grammar rule names and terminal words, Markov and
   corpus sample words, palette colour values, FTG's building-type, profession, item and service identifiers and names,
   FTG's Foundry-module message and field names, and texture and image file hashes. The list holds only salted SHA-256
   digests: of single normalised tokens (lower-cased, diacritics stripped) that are not in the spell-check word list
   §9.6 already needs, of token 3-grams in list order (so a copied table is caught even when every word in it is
   ordinary), of exact six-digit colour values, of file bytes, and — for every list the findings and captures record (a
   dict's keys, an array of strings, one field's values across records) — the set of salted digests of its members'
   words of four or more letters, so a list copied in another order is still found (J-S36). `@plat/testkit`'s clean-room
   scanner digests the same way every token of `@plat/tables`, assets, source string literals and comments and the
   digest, in the PR tier, and flags as a list hit any line, or any column of a table, that holds five or more distinct
   words of one list's set; a hit fails the build unless an allow entry with a written reason is reviewed and added — an
   authored roster that shares ordinary building or trade names with a reference list is such an entry, and the review
   decides whether the selection was copied. At every milestone the checker seat also runs a research-side palette
   audit: a shipped palette with three or more colours within ΔE2000 2 of one reference palette fails and is redesigned —
   reference palettes only: the corpus palette bands the owner released on 2026-09-27 (item 69) are targets our own
   values must land in (§8.2), never a palette to compare against or copy.
   Every file in `plat/assets` names the script that generated it or its third-party licence (fonts); a file with
   neither fails the build.
6. **Honest provenance.** Every table cell's provenance names where its number came from: `own`, `ref:⟨reference⟩
   ⟨behaviour⟩` (a measured or stated behaviour of a reference, admissible as a calibration anchor — for example the
   castle's 0.75 compactness gate (MFCG), 40 m bridge spacing and 39 m tower spacing (FTG), NG's lane-width law, Poisson
   k = 50), `owner`, `owner-eye ⟨milestone⟩`, `architecture ⟨date⟩`, `corpus` or `host`. Under item 23 a default cell's `ref:` source is read beside §7.6's
   `extension` marker — for example `ref:FTG lifestyle distribution`, `ref:FTG shanty rule`, `ref:FTG farmland modes`,
   `ref:MFCG gate law`. **A behaviour read in a reference's compiled code** (the directive of (1)) carries the same form
   with its build and the suffix `(code)`, followed by its trace key — `ref:NG 1.2.2 per-face stop threshold (code)`, P1. The trace key `P⟨n⟩` (`D⟨n⟩` for a descriptive baseline) names a row of the reader-tier provenance table
   `research/findings/code-impact.md` §(d), which names the build and the reference's own class; this document, the digest and `plat/` carry the behaviour with its P-id, never the class, method or file (J-A62.01). **The owner-opened
   corpus exception:** the palette bands the owner released from the historical corpus on 2026-09-27 are the one corpus
   content this document holds before the calibration stage (§13.9); a role value tuned to them carries `corpus` with the
   evidence "owner-opened corpus palette exception, 2026-09-27 (item 69)" (§8.2; J-A69.05). A number that describes a
   behaviour is a fact; a list, grammar, palette or table is creative content and is never reused.
7. **The record.** `plat/docs/CLEAN-ROOM.md` holds the rule, the seat ledger (which seat read which research file, from
   the lane logs), the digest checker's reports and the deny-list's generation record (date, sources, counts — never the
   tokens).
8. **Sources of algorithms.** Published: Shewchuk predicates; snap rounding (Hobby; Guibas–Marimont; Hershberger);
   arrangement booleans by winding number; Bridson Poisson-disc; Felkel–Obdržálek and Aichholzer straight skeletons;
   Chaikin; Visvalingam–Whyatt; Parish–Müller growth; Lloyd relaxation; marching squares; priority-flood;
   Garbrecht–Martz flat resolution; fBm, with ridged multifractal noise and domain warping (Musgrave, in Ebert et al.,
   *Texturing and Modeling*, 3rd ed. 2003; §3.1); the xoshiro128\*\* generator (Blackman–Vigna, public domain; §6.1) with
   Irwin–Hall sums for its normal draws; MurmurHash3's x86 128-bit hash and its 32-bit finaliser (Appleby, public
   domain; H128 in §6.2, `RH32` in §8.1, `H32` in §13.6), checked against the SMHasher verification values; Krüger's
   transverse Mercator series in Karney's formulation, to fourth order in the third flattening (Krüger 1912; Karney
   2011; §11.1); the van der Corput radical inverse and Morton (Z-order) bit interleaving for §8.10's progressive grid
   ranks; Ulichney's void-and-cluster ranking (1993; §8.10); the monotone-chain hull (Andrew) and rotating calipers
   (Toussaint) for the OBB (§3.1); centripetal Catmull–Rom splines and pinned-vertex Laplacian smoothing (§3.1, §4.2,
   §9.3); Dijkstra's and A\* shortest paths (§3.1, §4.2, §4.3); Brandes' betweenness (§4.3); Kruskal's spanning tree
   (§9.3); Lambert shading (§8.2's hillshade); CIELAB and the CIEDE2000 colour difference (Sharma–Wu–Dalal; §8.2); D8
   steepest-descent flow directions and flow accumulation (O'Callaghan and Mark 1984; §2.3, §4.2 S1); the exact
   Euclidean distance transform in linear time (Felzenszwalb and Huttenlocher 2012; §4.5, §12.4); the three-pass
   box-filter approximation of a Gaussian (Wells 1986; §4.5, §12.4); the Merkle hash tree (Merkle 1987; §6.2, D-28);
   context-free grammar expansion in the style of Tracery (Compton, Kybartas and Mateas 2015) and character n-gram Markov
   chains (Shannon 1948) for §10.4's naming engine — ideas only, with our own grammar and corpora; power diagrams
   (Aurenhammer 1987) with area targets (Aurenhammer, Hoffmann and Aronov 1998) for the hinterland lots of §4.9; Kahn's
   topological sort (1962) with the stage id as tie-break for the stage order (§4.1, §4.12); SHA-256 (FIPS 180-4) for
   (5)'s salted digests. For the tests: Pearson's χ² test with Holm's step-down procedure (§13.2), Spearman's rank
   correlation, Moran's I, Kolmogorov–Smirnov distances and SSIM (Wang et al.; §13.4, §13.5); the pair-correlation
   function of a point pattern (Stoyan and Stoyan 1994; §4.9, §13.2, §13.5); Shannon's entropy (1948) for the heading
   and use-mix entropies (§13.5, §13.7); the Jaccard index (intersection over union; §6.3, §7.5); and the Hausdorff
   distance (§3.7, §13.2, II.5). The list is checked against the text by a scripted scan of 119 method names
   (`docs/validation/bench/fixall_scope_r4_methods.out`). An implementer reads each in its published form; the seat
   ledger of (7) records which. The creators' *stated* ideas: twisted bisection, the casing idiom, skeleton labels, the
   proposal queue, dependency ratios, lazy people, integer centimetres — with constants calibrated on our own
   measurements. Since 2026-09-27 also the mechanisms read in the references' compiled code and restated as this document's own rules (the amendments of 2026-09-27, items 33–61, each with its P-id in (6)'s `(code)` form); the readers' restatement
   scripts are research-side test instruments, never committed to `plat/` and never given to an implementer seat (J-A62.01).
9. **Protocol names.** The host bridge's vocabulary is our own (§11.3): the concurrency token is `logHead` (§2.9),
   carried as `baseLogHead` and `currentLogHead`; time is the view key `time`, set by `view.set`, and the simulation
   module advances it with its own command `sim.advance { hours }` (§10.3, §11.3). Schema-level ideas — an event /
   command split, an optimistic-concurrency token — are admissible as ideas; the FTG module's message, command and field
   names are not reused, are in the deny-list, and occur nowhere in this document (check (i) of (2)).

=== REPLACE ### 13.5 Reference-parity metrics (B-REF), read from one numbers-only baseline file ===
### 13.5 Reference-parity metrics (B-REF), read from one numbers-only baseline file

The `parity` CLI in `@plat/testkit` reads **only** `baselines.json` — our own measurements of the references, numbers
only, generated research-side by scripts under `research/baselines/` from the captures and committed into
`plat/packages/testkit/baselines/` (§17.1 (4)) — and our B-CITY outputs, and reports every metric against its band. It
never opens `captures/`, `research/` or `reference/`.

```ts
interface Baseline {
  id: string; metric: string; unit: string;
  reference: 'MFCG' | 'FTG' | 'NG' | 'VG' | `corpus:${string}`;       // corpus rows arrive through §13.9
  referenceBuild: string;            // itch build, FTG server date + create-request hash, NG / VG build — required
  capture: string; script: string; date: string;                       // provenance: capture folder, research-side script, run date
  matched?: { rung: Rung; mfcgSize?: number; ftgSize?: 'BIG_TOWN' | 'BIG_CITY' | 'CITY' | 'METROPOLIS'; population?: number };
  role: 'target' | 'weakness' | 'descriptive';                        // what the reference number means for us
  values: { p10?: number; p50?: number; p90?: number; n: number; seeds: number } | { bins: number[]; histogram: number[]; n: number; seeds: number };
}
interface ParityReport {                 // written by the parity CLI per run; read by milestone exits, §13.9's CalibrationRun and the release notes
  runId: string; date: string; outputVersion: string; generatorVersion: string; baselines: Hash128 /* hash of the baselines.json it read */;
  rows: { metric: string; baselineIds: string[]; role: Baseline['role']; rung: Rung; preset?: string;
    band: { lo?: number; hi?: number; ksMax?: number; direction?: 'above'|'below'; margin?: number };
    ours: { p10?: number; p50?: number; p90?: number; ks?: number; n: number; seeds: number };
    verdict: 'pass'|'fail'|'reported' /* descriptive rows are always 'reported' */; note?: string }[];
  summary: { pass: number; fail: number; reported: number } }
```

Each milestone's parity report is stored as `plat/goldens/parity/<milestone>.json` and named in its `MilestoneRecord`
(§13.3). The CLI refuses a row without `referenceBuild`, `capture`, `script` or `date`. A new reference build never
overwrites a row: it adds a row (the id gains the build) and is a **declared baseline shift** in the milestone's shift
record, so a silently drifting reference build (VG changed geometry for the same seed between build 19251041 and
build 19365073 = VG 1.6.9) can never move a gate unnoticed. Rows hold numbers, units and provenance only — no names, colours, grammars
or code.

**The band rule.** *Target* rows pass when ours lies in [p10 × 0.9, p90 × 1.1] of the reference's seed spread (a
single-value baseline: ± 15 %), and distributions when our KS distance to the reference is ≤ 1.25 × the reference's own
seed-to-seed KS distance at p90. *Weakness* rows are one-sided: ours must beat the reference in the declared direction
by the stated margin. *Descriptive* rows are reported beside ours and gate nothing. The bands below are this rule
applied to today's baselines; when M-1 re-measures a baseline (five seeds per matched MFCG size, FTG's new captures),
the band is recomputed by the same rule with provenance "M-1 ⟨date⟩", and a recomputation that turns a passing gate
into a failing one is declared in the shift record. Thresholds no reference can set are §13.7's. **The ⟨M-1⟩ rule:** a
reference number marked **⟨M-1⟩** is measured by M-1 (§16 lists every such measurement); if M-1 cannot measure it — the
capture lacks the feature, or the measurement is not reproducible across seeds — that cell becomes *descriptive*,
gates nothing, and enters `known-defects.json` with the reason; the parity CLI reports an ⟨M-1⟩ cell without its
baseline row as *fail*, never as *pass*.

**Matched sizes** (§12.2, §13.6): TOWN ↔ MFCG size 40 and FTG BIG_TOWN; CITY ↔ MFCG size 80 and FTG BIG_CITY;
METROPOLIS ↔ MFCG size 130 (FTG per D-31). MFCG numbers come from its plain-option size sweep (walls, citadel, plaza and
temple on; shanty town, parks, river and coast off; its JSON export is in metres, the internal unit 4.00 m). **Curves**
are measured after both sides are resampled at a 10 m arc-length step, so neither FTG's 25–40 m placement steps nor
PLAT's smoothed vertex spacing enters a number.

| metric | our measure | reference baseline and its role | band | class |
|---|---|---|---|---|
| street turning | turning per 100 m; heading change per 50 m (10 m resampling) | FTG: zero mass above 15° per step and a flat heading spectrum (`_critic-ftg.md` §4 rows 7–9) — **weakness**; FTG's median turning per 100 m after 10 m resampling, on its payloads ⟨M-1⟩ — **target for organic presets**, with this row's own band | weakness clauses: no cliff (no empty bin above 15° while the bin below it holds > 1 %) and heading entropy ≥ FTG's; target clause: organic presets' median turning per 100 m within 0.5–1.5 × FTG's — a declared exception to the band rule, because FTG's per-seed spread over at most eight payloads is too narrow to stand for its generator's variation. *Fallback:* `headingSigma` (a table value, §4.4) is set so the organic median equals FTG's and the growth-drift row re-runs; if drift then fails, `headingSigma` returns to its default, the target clause enters `known-defects.json` as not met, and the row gates on its weakness clauses | P |
| growth drift | net turn of grown streets over 600 m (organic regimes) | — (our heading model, §4.4) | p50 15–30°; > 90° on ≤ 1 % | C |
| junction arm angles and degrees | every L1 junction | NG 361 / 361 T — **target** for organic presets; FTG median 90.02°, 58 % in 80–100°, 36.4 % 4-way in its Medieval city — **weakness** for organic presets, **target** for `ringed` and `american` | median 85–95°; p5 ≥ 30°; 4-way share organic 0–15 %, `ringed` 20–45 %, `american` 40–80 % | P |
| street runs by class | junction-to-junction run lengths per class (never edge lengths) | FTG main L + 0.5, district (L + 0.5) / 2, suburb 30.00 m, lot outlines 14.70 m (roadlength100 README) — **target** for the extramural ribbon and suburb regimes, descriptive inside the walls | class medians by the band rule (extramural, suburb) | P |
| MFCG street signature | lot-orientation coherence R4 within 60 / 120 / 250 m; lot alignment with the wall by distance band; T / Y share; intramural dead ends; blocks per ha; lots per block | MFCG R4 0.84–0.97 / 0.58–0.88 / 0.32–0.68; within 40 m of the wall median deviation 3.5–4.5° and 84–92 % within 15°, 56–70 % at 40–100 m, 38–58 % at 100–200 m (redteam-mfcg MFP-2, from the exports); T / Y share, intramural dead ends, blocks per ha and lots per block from the sweep ⟨M-1⟩ — **target** inside the walls | the band rule, walled districts | P |
| blocks | L2 built-block areas per district | NG block counts per template at `medium` (vertex captures) ⟨M-1⟩ — **target** on the same face shapes | KS by the band rule; inside the NG band on the same face shapes (O4 f); §4.6 step 1's plot-depth rows and regime floors are re-fitted at M-1 under its per-face stop threshold before this band is signed (item 34; J-A34.01) | P |
| deep block interiors | court share of deep blocks per band | NG hollow-block frequency (vertex captures) ⟨M-1⟩; MFCG inner-lot removal (sweep) ⟨M-1⟩ — **target** | the band rule per class (§4.6) | P |
| bent-cut signature | infill and lot cuts | measured outputs of NG 1.2.2's mechanism (reproduced by §4.6's restated law): start at N(0.5, σ) of the OBB major axis with σ 0.066 (plain faces) and 0.098 (ring faces); one bend at mid-course in 380 / 519; ≥ 85° arrival in 96 %; 53 % filleted (BG-1 / BG-2 / PF-3; manager note 3) — **target**, measured the same way on ours (the recorded frame, the rotated retries included) | σ within ± 0.02; corner within 0.10 of mid-course ≥ 80 %; arrivals ≥ 85° ≥ 95 %; fillet share within ± 0.05 of the share NG shows on identical face shapes (§4.6 step 6's rule predicts 209.9 of NG's 378 recorded corners where 200 were filleted; J-A41.01) | P |
| figure-ground and streetwall (plot texture) | city-band street-edge recoverability; gross footprint cover inside the walls; streetwall continuity on dense frontages | MFCG recoverability on its matched plain sweep renders ⟨M-1⟩ — **target**; MFCG gross cover inside the walls 0.60–0.64 at sizes 40–130 — **descriptive, direction declared**: ours lower because yards exist; MFCG streetwall continuity on the same frontage classes ⟨M-1⟩ — **target** | recoverability ≥ MFCG − 0.03; cover reported (expected below 0.60); streetwall ≥ MFCG's on dense frontages | O |
| plots and footprints | L3 plot areas; L4 footprint areas and sides | FTG footprint median 103 m², p95 154 m², quad side 10.3 m, worst-corner p95 22.9° — **target** for ordinary houses; MFCG footprints (median 225–289 m² at sizes 40–250 in metres) are **lots drawn as buildings — descriptive, never a house-size anchor** | ordinary houses median 60–160 m², p95 < 400 m²; a sheared minority kept | P |
| entrance rule | L4: the main entrance's edge | — the owner's rule (item 29, §2.6); FTG's measured 2.99 m is the night-light anchor of the FTG client of the 2026-09-25 capture, which receives no door, and is withdrawn from this table (item 50; J-A50.01) | 100 % on the access edge | C |
| party walls and attachment | row classes | NG 39–43 % of perimeter, 95–99 % attached — **target** for dense / poor; FTG residences 0–5 %, industry 96–98 % — descriptive | attached ≥ 90 % in dense / poor; party-wall share by the band rule per class | P |
| plot-area gradient | Spearman(prosperity, plot area); Moran's I; within-district plot-area CV | NG Moran's I −0.04 … +0.03 — **weakness** (FTG sends no lot or plot, so it has no plot evidence; item 49) | ≥ 0.8 and > 0 (both follow from the rules: C); within-district CV ≥ 0.25 (§13.7: O) | C / O |
| alleys | alley length per ha by prosperity | FTG 0 alley length at every decile — **weakness** | Spearman ≤ −0.7 | C |
| vacancy runs | share of frontage length in vacancy runs, per band | — (our rule; VG's partly ringed blocks are the motive) | within ± 0.02 of the granularity table's share per band | C |
| quays and substitution | quays reachable from the network; blocks left as substitution residue (F-CUT tier 5) | — | quays reachable 100 %; substitution residue ≤ 5 % of blocks | C |
| walled share and ribbons | buildings inside the outermost wall; extramural buildings within 100 m of an arterial | MFCG 0.87–0.92 at sizes 40–250; 71–85 % (sweep) — **target** | the band rule | P |
| MFCG anchors | district areas; wall vertex spacing; castle area and compactness; plaza area; city-zoom quarter labels | MFCG district areas 2.4–17.6 ha at size 40 and median 29 ha at size 80; wall vertex spacing p50 88 m at size 40; castle 0.5–3.2 ha (8.7 at size 130); plaza 0.32–0.58 ha; 9 / 12 / 18 districts at sizes 40 / 80 / 130 (sweep) — **target** | the band rule; castle in band on ≥ 99 % of seeds | P |
| outline anisotropy | land-sector r90 CV; road / non-road r90 ratio | FTG 0.20–0.33 and 1.26–1.65 (both CITY payloads) — **target** for organic presets | the band rule; monotone in the anisotropy row | P |
| block-level use mix | residential-only block share; per-block use-mix entropy; trade households at their workplace | MFCG's "venue mix with residents, no residential wards" — descriptive | §13.7's bands | O |
| towers and gates | S7 | FTG 39 m median spacing, 17 / 17 towers on ring vertices — **target**; FTG 6 and 2 ungated crossings — **weakness**; MFCG 5 / 8 / 12 gates at sizes 40 / 80 / 130, `gates = N` exact — **target**; with a waterfront on the stage-1 boundary our law's reduction gives 4 / 7 / 10 / 14 where the land law gives 5 / 8 / 12 / 18 — its metric restatement of MFCG 12710731's coded law, which counts mesh cells and was recorded at 3 / 4 / 5 / 7 gates at sizes 26 / 39 / 51 / 80 with a coast (P11) — descriptive | spacing by the band rule; ungated crossings 0; main gates = N exact, N by §4.2 S3 (4)'s law with its waterfront reduction; roads leaving each walled stage = its N main gates, plus a harbour gate of §4.2 S3 (7) where one was placed | P |
| water | L0 | FTG 50 m resampling, rivers ≈ 31 m mean at CITY — **target**; MFCG `riverWidth` in metres (142 m at size 200 with river and coast) — descriptive | outline step ≤ 25 m; width band by class | P |
| tree scatter | §8.10's stamped instances, in the bench | FTG nearest-neighbour median 9.7 m, minimum 0.14 m (not Poisson) — **weakness**; MFCG / NG: Bridson sampling with k = 50, its candidates drawn from the thin ring between r and 1.1 r, the tile wrapping at its edges (MFCG 12710731, NG 1.2.2; P14) — **target** for the sampler | NN p1 ≥ §13.7's canopy threshold; pair-correlation per class reported | O |
| population and buildings | totals | MFCG 12710731: six persons for each lot, the total rounded up at its second significant digit (a multiplier; its "buildings" are its lots; D1 of `code-impact.md` §(d)) — **weakness**; FTG 3.4 — descriptive | requested population within ± 5 % on ≥ 95 % of seeds; the ratio reported | C |
| generation time | model p95 and time to first map per rung (§12) | MFCG app timings 57 / 131 / 156 ms at sizes 40 / 80 / 130 — descriptive, with the measured ratios and §12.9's declared trade; FTG CITY: server 2.9–3.2 s, scene 6.4–7.0 s after the click, load 2.0 s busy — **weakness**; NG hood 10–96 ms — **target** for opening a district | §12.3 / §12.5 budgets; model ≤ 2.5 × MFCG at TOWN and CITY and ≤ 5.5 × at METROPOLIS (the ratios at MFCG's matched building counts are §12.9's); first map ≥ 10 × sooner than FTG at FTG's timed CITY preset (9 500 people, 2 798 buildings: PLAT's TOWN law ≈ 0.24 s against 6.4–7.0 s), and at BIG_TOWN and BIG_CITY from M-1's captures | P |
| MFCG-worst configurations | wall-clock p95 per delivered town, ladder costs included: METROPOLIS with river, coast, walls and castle | MFCG size 80 with river and coast: 10 attempts for 3 cities, 3.7–4.0 s (IMPROVEMENTS O1); 24 restarts in 58 attempts — **weakness** | ≤ 1.0 s per delivered town | O |
| requested-feature delivery | the report's delivery tier per requested feature | MFCG: a requested river fails 7 of 10 attempts at size 80; VG: 4 of 13 highway maps discarded — **weakness** | tier-6 omissions of requested features 0; degraded (tiers 4–5) ≤ 5 % (§13.7) | O |
| ladder use | the report | — | tier ≥ 2 on ≤ 2 % of transactions per stage; p99 ≤ 3 attempts | C |
| draw style | the display list and renders against the draw records | MFCG: casing = core + 2h on 7 / 7 maps, round joins 4 062 / 4 063, 17-step order; wall, tower and road-core widths 6.2 / 12.4 / 6.5 px at size 40's scale — **target** (`ink`); NG square caps, ≈ 17.4 hatch triangles and 2.33 shadow quads per wing — **target** (`hatched`); NG roof dark / light ratios 0.787 / 0.802 / 0.834 and VG water bands 5.196 : 2.828 : 1 — **descriptive** (they are their palettes' values; the laws are tested on ours, §8.3) | `ink`: casing law on 100 % of ribbons, round joins ≥ 99.9 %, order parity as §8.3 defines it, widths ± 15 %, outline share ≤ 25 %; `hatched`: 15–20 triangles per wing, no ridge stroke (the count includes the two filled tapers NG 1.2.2 lays along each wing's ridge, read in its code — §8.3's `hatched` census row), outline = footprint; the roof law on our palette within ± 0.02 and our bands W · (i / N)^1.5 within 1e-4 | P |
| labels | protected overlaps; inside-area share; curvature; holes; count | MFCG: gates and the keep covered, walls straddled — **weakness**; MFCG district counts (the anchors row) — **target** | 0 / ≥ 99 % / within §13.7's curvature limit / 0 labels crossing holes / the anchors row | O |
| between-seed variety | dispersion of the §7.7 signature vector (radial share of arterials, orthogonality index, street-density profile, block-area CV, enclosed share, outline anisotropy) over 100 seeds per rung and water setting: mean pairwise distance of vectors standardised by the rung's pooled deviations | MFCG over its plain sweep seeds at the matched size ⟨M-1⟩; FTG over every payload at the matched size ⟨M-1⟩ — **target as a floor** | ours ≥ the larger reference dispersion at the matched rung | O |

**Rows added by amendments b (items 24, 27, 29 and 30).** They join the table above under the same band rule; the
parity presets `MFCG` and `FTG` (§7.6) add one B-REF run per preset to the nightly report, on which every row above
must hold with our extensions switched off (§13.2 T23-1).

| metric | our measure | reference baseline and its role | band | class |
|---|---|---|---|---|
| markets | secondary-market frequency per matched size; market reservations sharing an edge; the market count against the roster | MFCG's secondary-plaza frequency and non-adjacency on the plain size sweep ⟨M-1⟩ — **target**; FTG's two market squares in the captured city — descriptive | frequency by the band rule; adjacent markets 0 | P |
| wealth bands | built-land share per band group; households per lifestyle tier under the parity preset | FTG's six-tier lifestyle distribution (its captures ⟨M-1⟩) — **descriptive**; MFCG's ward-class shares, taken from the ward deck of its open-source model of 2017 (§4.5's receipt; the live MFCG types no ward by class, §1.4) — a note with no `baselines.json` row (the default band set reproduces both, §4.5; the parity preset equals them by construction, T27-1) | reported | P |
| entrances and basements | the main entrance's edge (the entrance row above stands); side, rear and yard doors per class; the basement share by class and storeys | neither MFCG nor FTG models a door — the FTG client of the 2026-09-25 capture receives none, and MFCG 12710731's model, read in full, carries no door record (an inference from that reading) — so the main door follows the owner's rule, the entrance row above being class C; Dwellings (itch 17195045): one entrance, no back door, its basement rule — a chance of n/(n + 1), n being how many storeys stand above ground (D2 of `code-impact.md` §(d)) — and its loop rule, which keeps at random half of the doors that no room needs for access (D3), have no `baselines.json` row and are descriptive notes only, never a gate | the entrance row's band; the rest reported | C |
| hidden plots | the hidden and rear-plot share per band | MFCG and FTG give every building a street — 0 hidden share — **target for the parity presets**; the default preset's share is §13.7's threshold | parity presets 0; default within its target ± 0.03 | C |

**Rows changed and added by amendments c (2026-09-27; items 41, 46, 48–50, 53, 58, 60, 61, 68, 71).** The reading of the
references' compiled code (§17.1 (1)) left the measured numbers standing and changed what some of them mean. NG 1.2.2's
bent-cut statistics are outputs of its mechanism, which §4.6 now restates, so they stay targets when ours is measured the
same way, and the fillet share joins them (J-A41.01); the FTG figures read from its ground-cover patches (the "441 m² in
every class" of the blocks and plot-area rows, `_critic-ftg.md` R10) are withdrawn, our own bars standing as C rules
(item 49); FTG's "entrance" distance is its client's night-light anchor, so the main door's row follows the owner's rule, class C (item 50); MFCG's population figure counts six persons for each lot (item 48). Under the parity presets every row above
still holds with the extensions off (T23-1) — item 71's class mix inside a band is such an extension (§4.7 S10b), so
under `MFCG` and `FTG` the residential class stays the references' step. The one row item 68 adds describes how each
preset lights the map; the references' lighting has no `baselines.json` row, so it is reported and gates nothing, and
its bars are §13.2's T68 and §13.4's.

| metric | our measure | reference baseline and its role | band | class |
|---|---|---|---|---|
| lighting under the presets | the light pass's configuration per preset (§8.4): the lights, the sun and moon, the casters, the night view | the FTG client of the 2026-09-25 capture: an ambient light plus a directional one, the sun moving on an hour path and at night a dim moon on that path, cast shadows only in fair weather or snowfall, from extruded footprints, and window lights at a per-building anchor (`code-ftg-client.md`, its sections 2.2 and 2.5.5–2.5.6) — the `FTG` preset's day and night light and lit windows; NG 1.2.2: per-wing prism shadows with tree and pin shadows, multiplied at an alpha, and at night an ambience wash with a per-building glow by chance (`code-neighbourhood.md`, its section 2.11) — the `hatched` preset's prism pass; the `MFCG` preset draws the raised under-copy (K06; item 54, P15) and casts no shadow, stated as our preset's behaviour — **descriptive** | reported | P |

=== REPLACE ### 1.3 The thesis in one paragraph ===
### 1.3 The thesis in one paragraph

Every weakness the four creators admit in their own words is a geometry weakness on plain vertex arrays: collapsed or
intersecting edges "can easily break it completely" and "Browser not responding" (MFCG 87882877), the null `rect`
crash, hourglass footprints the heuristics "do not detect" and two intersections at one world position that "breaks
things" (FTG 133016301, 153121107), a 2017 cut routine that silently returns its input on ≠ 2 crossings, NG 1.2.2's
silent rotated-frame retries and its hole-aware bisector's two logged loops (a balance retry, up to 20 in random frames,
then accepted; a restart when no far edge exists), VG's boolean "thorns" (relayed through `docs/IMPROVEMENTS.md` O3 and
`proposal-kernel.md` §1.2). NG 1.2.2's 42 % of lot leaves without a frontage, once read as a silent discard, are its
courts, left by construction rather than by error (item 42; its code read, §17.1 (1)). The remedy is one robust planar subdivision — a
snapped, integer-lattice, exactly-predicated, indexed half-edge subdivision with typed faces, refined in five nested
levels — at the centre, with every stage a transaction on it that commits a valid subdivision or is rejected with a
typed reason, and districts, blocks, plots, buildings, walls, water, labels, exports, edits and epochs derived from it.
On that substrate the layout fuses the two references as the owner asked: FTG's staged, destination-driven growth for
the streets, NG 1.2.2's bent-cut infill for the lanes (MFCG 12710731 and VG 1.6.9 cut straight first; §4.6 step 5),
MFCG 12710731's grower for the districts, FTG's roster for the content,
MFCG's one-click ink look for the picture, and our own site model, plot model, prosperity field, greenery rules,
display list, document and stream design where neither reference has an answer.

=== REPLACE ### 1.4 Fusion thesis, stage by stage ===
### 1.4 Fusion thesis, stage by stage

The rule at every genuine conflict is the owner's DESIGN TIEBREAKER: the approach more faithful to how real settlements
are constrained and laid out — explicit constraints (terrain, water, defence, land use, access, growth) and precise
real-unit geometry with measurable statistics — with legibility and one-click use as a floor. **TB** marks the rows
where it decided; "no TB" where charm and evidence agree. Each criterion carries its §15.2 class: **C** conformance,
**P** parity with a measured reference number, **O** an outcome the references do not reach.

| stage | MFCG-class approach (evidence) | FTG-class approach (evidence) | PLAT adopts | discards, and why (measurable criterion) | TB? |
|---|---|---|---|---|---|
| site: terrain, water | coast = 6-octave noise per cell, the sea's side an angle; river = course search with 712 rejections and 21 canal restarts in 58 attempts, whole-city restart on failure (`_critic.md` C15; CONFIDENCE B3/B8) | water first, coast "in two arms", rivers that "may bend back", no terrain ("Mountains aren't properly supported yet", CONFIDENCE C1/C2/D8) | **new (O1)**: heightfield in metres + hydrology; rivers by descent; coasts, lakes and islands from one closed-outline routine; coast and contours agree by construction; water faces enter L0 with typed shores | MFCG's mesh-edge rivers (no bed, restarts) and FTG's border-touch typing — neither has a terrain constraint. Criterion: requested water features delivered by tier with 0 tier-6 omissions (O1 a, O); non-monotonic beds 0, contours crossing water 0 (O1 b, C) | **TB** |
| units and frame | an internal unit of **4.00 m** (the SVG scale bar against the map group, three files: 3.9998 / 3.9998 / 3.9991 m); its GeoJSON export is already in metres (road width 8 in the JSON, 2 in the SVG) — `captures/mfcg/exports-sweep-2026-09-25/README.md`, redteam-mfcg MFP-8 | integer centimetres centred on (0,0), +y north (`_critic-ftg.md` F1, CONFIRMED) | FTG's convention | MFCG's internal unit (read only to measure its exports). Criterion: every parameter and export in metres (O6 a, C) | **TB** |
| centre and destinations | plaza = innermost cell; streets = BFS gate → plaza on cell edges; roads to a phantom point 1 000 units out (`os-model.md` §6 via CONFIDENCE B7) | initial-roads type at the origin, no destinations ("most of the settlements in FTG look similar", 112861635) | **MFCG's idea on FTG's substrate**: named destinations (the markets, gates, bridging points, harbour, external bearings), the plaza and castle reserved and the gate sites picked at S3 — the principal market scored by where trade meets, usually the plaza, with secondary markets by size as both references have them (§4.2, item 24), the growth centre staying the root — arterials routed between them over a cost surface in real metres | FTG's destination-less bloom. Criterion: through-roads at a destination 100 % (O4 a, C); detour ≤ 1.4 (O4 b, P) | **TB** |
| secondary streets | since 0.10.0 every non-arterial street is the district-wide twisted bisection of the merged ward polygon — a connected secondary network with mostly 3-valent nodes, cut inside a wall built first so the fabric inherits its shape (87882877; `profile-mfcg.md` §4.9 via redteam-mfcg MFP-2) | proposal-queue growth in stages, 15° per-vertex cap, half-step normal streets, prune/trim between stages (`ftg-docs-params.md` §2.2–2.5) | **by regime** (§4.4): inside the walls S5 grows only district-scale secondaries that join the arterials (separation ≈ 120–250 m) and S8's recursive bent cut cuts every lane and intramural secondary; outside the walls **FTG's staged growth** along the main roads, destination-aware, curvature-continuous, with explicit legality thresholds; the suburb regime by preset | FTG growth down to block scale inside the walls (the fabric would neither inherit the wall nor carry MFCG's signature); FTG's clamp-only wiggle (zero mass above 15°, `_critic-ftg.md` §4 row 7). Criterion: MFCG's street signature inside the walls (§13.5, P); no turn cliff and junction p5 ≥ 30° (O4 b, P) | **TB** |
| districts | MFCG 12710731: grown round-robin from seeds around features, each seed kind at its own growth rate — gate, castle and bridgehead seeds slow, riverbank seeds at half pace (P13) — under its patch and edge tests, holes split (CONFIDENCE B9); live typing is feature-named | district = one growth lot typed from the remaining pool "and what the lot is next to"; 49 % of buildings in no ring (`_critic-ftg.md` F4, row 16) | **MFCG's grower over FTG's objects**: groups of coarse skeleton faces seeded at features, grown with MFCG 12710731's per-kind growth rates and with arterials, walls and water as barriers (§4.5, item 47), **feature-named**, merged into **quarters** for city-zoom labels; the use mix from the roster's allocation and the prosperity field, with a mixed-use floor; the field's default band set reproduces FTG's lifestyle tiers and the ward-class shares of MFCG's open-source model of 2017 (§4.5, item 27); districts are typed feature-named before placement (J-P1, the emulation baseline), and each district's identity — religious, craftsmen's, merchants' … — emerges after placement from its lots, powers, trade and economy and names and describes it (§4.5, item 72; J-P1 refined) | FTG's one-lot districts; class-typed wards MFCG itself dropped. Criterion: containment 100 % (O11 b, C); city-zoom quarter labels at MFCG's count per matched size and block-level use mix in band (§13.5, P) | partial TB |
| block fabric (lanes) | twisted bisection of wards into blocks and alleys, straight first where it can (MFCG 12710731; §4.6 step 5); restart on "bad poly" (`_critic.md` C13; ST-8) | straight inserted roads to a target area (§2.5) | **NG 1.2.2's bent cut, its mechanism restated, with the measured signature** (§4.6, §13.5) as a hole-aware kernel transaction with a bounded ladder; the district's class band as the stop law; the deep-interior choice (court, back lane, through-alley, rear plots) by band shares | FTG's straight roads (too regular); MFCG's restart. Criterion: K1/K2 within the measured spread (P); 4-way share per preset, organic 0–15 % (R3, P) | no TB — charm and evidence agree |
| blocks → plots | bisection lots, inner-lot removal and front recession (MFCG 12710731's area-scaled recession, P9); lots painted as buildings | strips / centroid cuts / shrink-then-split, run server-side on road-graph faces; no lot or plot is sent to the client (`_critic-ftg.md` F17; the client reading) | **new (O5/O18)**: per-frontage regions of each block, strips perpendicular to each frontage with party walls, typed residue, joins and splits from the prosperity field, alleys and back lanes where the band's deep-interior share says so | both references' cut-then-filter lots. Criterion: access edge 100 % (O5 a, C); streetwall continuity and footprint cover against MFCG's exports at the matched rung, direction declared (§13.5, P); within-district plot-area CV above its floor (§13.7, O) | **TB** — burgage plots were laid from the frontage |
| buildings | lots drawn as buildings ("the illusion of buildings"); Complex = rectangles; landmarks by `lir` | building = plot (Dense) or inset plot (Gaps); a light anchor on the side toward the road, no door sent (the FTG client of the 2026-09-25 capture) | **the owner's plot model**: a parcel with 0..n footprints and a typed yard; site plan by class (row / compound / detached / hovel / institution / tents); heights on everything; the owner's main-door rule (item 29) as the default, extended to a set — side, rear and yard doors where the plot gives an access edge or a yard — with a selective basement (§2.6, item 29); FTG's material model as the default, a material texture and colour only (§2.6, item 19); every designation scaled by its prosperity template (§4.7 S11); landmark footprint templates in the base; the stage-3 generator behind the `outline` / `compose` / `plan` interface (§2.6) | MFCG's global display switch; FTG's one-building-one-household lot. Criterion: O17 (a)–(j) | TB (owner ruling, metric tables) |
| walls, gates, castle | one ring on cell edges, built before the streets; `gates = N` exact; a tower on every non-gate vertex; castle = a cell with a 0.75 compactness repair loop (B5/B6) | wall = typed edge chain on the district ring after a stage; towers at 39 m median; no gate objects; castle fitted into its lot (C11/C12) | **FTG's staging + MFCG's gate identity and wall-first order** (§4.2 S3, §4.4 S5a, §4.8): gate sites picked and the castle and plaza reserved at S3; stage 1's enceinte traced at S3 over its solved gate routes and each later one at S5a, each from its stage's travel-cost boundary and pulled to defensible ground before that stage's streets grow; gates exactly where arterials cross, exact N by MFCG's measured gate law with its waterfront reduction (item 46); towers by rule; the castle by score with the compactness gate as a shape check, repaired in place in MFCG 12710731's order — a thinness bloat, then equalisation toward its fitted regular polygon (P10; item 45) — before re-siting; several enceintes; an open waterfront by default; the wall → road lifecycle | MFCG's cell-as-castle and tower-per-vertex; FTG's ungated crossings. Criterion: O8 (a)–(h); walled share at MFCG's measured 0.87–0.92 (§13.5, P) | **TB** — defence as an explicit constraint |
| hinterland | farms as a ward type, split by grid and field cuts (MFCG 12710731: a lobed farm belt split into 0.6–1.3 ha fields, P18); forests "fill all available space" (the creator: "historically incorrect anyway") | main roads to the border, four farmland modes, farmsteads with driveways, hedgerows, reserves (C14–C16) | **FTG's contract + O14**: FTG's order — decided with the demand, drawn after the town — and its farmland modes chosen by size and landscape (§4.9, item 26); land use sized to population, fuel and timber beside food; field systems as presets (open-field strips, enclosed, FTG's hedgerows, VG 1.6.9's and MFCG 12710731's sector looks, §4.9, item 57), farmsteads by their fields, woodland by distance and demand, a context margin | MFCG's fill-the-leftovers. Criterion: O14 (a)–(h) | TB |
| content | population six persons for each lot, the total rounded up at its second significant digit (MFCG 12710731; D1), wards are "hints" (`_critic.md` C1) | roster first from a dependency graph; every building has occupants; people lazy (B1–B6) | **FTG's guarantee, two-way**: a sequential, prefix-stable roster from our own tables → an eager allocation to districts and blocks → placement onto plots → a bounded reconcile; people derived lazily | MFCG's multiplier. Criterion: O7 (a)–(h) | TB |
| determinism | MFCG 12710731: one MINSTD stream with a save/restore slot and per-cell seeds for ward geometry; retrying continues that stream (A2) | `seed: null`, server-side (A4) | **O2**: 128-bit-keyed sub-streams (key components §6.1); integer geometry; permanent lineage-hash addresses with anchors (§6.3) | both models. Criterion: O2 (a)–(e) | — |
| rendering | ink print, casing idiom, per-ward cache, no zoom ("a big flaw") | lit web map, merged geometry, tiers | **one semantic display list with LOD and paint programs on one drawing path** (Canvas2D the reference backend of every preset); ink default, lit second, hatched for stage 2 | each renderer's coupling of geometry to its drawing path; a second render path for the lit look. Criterion: O12 (a)–(g) | — |
| editing | 8 warp kernels, per-ward reroll, no save | layout editor, regenerate area, bulk edit, "cannot be undone" | **FTG's graph editing on our plat + MFCG's warp kernels**, all as events on permanent addresses with locality, dry-run validation and undo; authoring as declare-then-derive — twelve tools in five layers, one vocabulary on three surfaces (the canvas, a clerk's tool API, a skeleton file), where a describe-to-map clerk returns an editable skeleton, never a picture (§7.1, §14; item 101) | nothing of substance; neither persists. Criterion: O9 (a)–(f), the MFCG asks as measured scenarios (O9 f, O); the toolkit's elegance bars (§13.2) | — |
| labels | curved labels on skeleton spines, halo, legend | arced serif labels, 2 m / 5 ft grid, scale bar, no compass | **MFCG's spines made hole-aware and collision-checked, quarter labels at city zoom + FTG's furniture** | none. Criterion: O13 (a)–(h) | — |
| failure policy | MFCG 12710731: a whole-city retry of all nine stages (ST-8) | server "gives up"; no fallback in the splitter | **MFCG's tiers minus the restart tier**: typed results, bounded ladders, substitution, and a report that counts every requested feature by delivery tier | both. Criterion: tier-6 omissions of requested features 0 and p95 time on MFCG's worst configurations (O1 a, O3 b, O); hard invariant violations 0 / 1 000 (C) | — |

**Defaults emulate; extensions ride on top (item 23).** Defaults emulate MFCG and FTG, the tiebreaker choosing
between them, and extensions ride on top as table values (§7.6, the rule's home; §17.1 (6)).

Genuinely new mechanisms replace both references: the site model (O1), the plat kernel (O3), frontage-first plots and
the granularity law (O5/O18), the prosperity field (O18), the plot/site-plan model with heights (O17), the greenery rule
family (O19), the semantic display list with paint programs (O12), the document and edit log (O9), the keyed stream
design (O2) and the layer model.

**The fused layout** (the mechanism is §4.4): grown arterials with partitioned blocks *and* a partition seeded from a
grown skeleton are the same thesis at two granularities — the backbone's faces are partitioned by bent cuts, and the
cuts are promoted to ways of the same graph; inside the walls the partition does the street work MFCG's does, outside
them growth does FTG's. Rejected: (a) MFCG-first (a Voronoi cell mesh as truth, growth only outside the walls) —
streets without geometry, roads that point at nothing, no incremental growth without re-meshing; (b) FTG-first end to
end (queue growth down to lanes) — the "vaguely circular" look-alikes the creator names and the loss of the T-junction
signature R3 requires; (c) an Urban Places-style quad base mesh — geometry inherits the mesh resolution, which the
precision tiebreaker forbids, and its construction is unrecovered; (d) bent cuts as queue proposals — the recursion is
what yields the measured statistics. The MFCG creator's warning that road-first plus block subdivision "seems
problematic" (devlog 31287) is the risk the fusion gate O4 (f) guards — measured at M0 on a flat site and again at M1
on B-CITY-lite's river, coast and relief configurations with the reordered stages (§16).

=== REPLACE ### 0.3 Evidence discipline ===
### 0.3 Evidence discipline

CONFIRMED = an executed measurement or a quotation verified at source by the lane cited. PLAUSIBLE = reasoning from
that evidence. Reference numbers used as calibration targets (FTG's 10.3 m quad side, NG's corner at 0.5 ± 0.1, MFCG's
casing law, FTG's 39 m tower spacing …) are CONFIRMED in the cited findings; this document's mechanisms, constants and
budgets are PLAUSIBLE until the M-1 and M0 spikes of §16 measure them (Appendix A). Where the evidence leaves a
reference's mechanism unknown — FTG's district scoring, which runs on its server and was never read — this design says
so and invents its own, calibrated to the measured outputs (`docs/CONFIDENCE.md` §5). Since 2026-09-27 the mechanisms
the references' compiled code shows are read facts, not inferences (§17.1 (1)): the bend placement of MFCG 12710731's
and NG 1.2.2's bisectors (`_critic.md` C13 had inferred it) and NG 1.2.2's stop test among them (§4.6). Each such fact
carries the grade of the reading that states it — CONFIRMED by its reader on the captured bundle, checked independently by the critic or run against the captures where the reading says so — and a part a reader only inferred entered this document
after Fable's retrovalidation released it, labelled as an inference (the evidence gate of the 2026-09-27 amendments;
J-A32.01).

---

=== REPLACE ### 13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT ===
### 13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT

* **Invariants.** The §5.3 suite runs by scope — batch-local invariants per batch, stage-end invariants per stage,
  save / load invariants per document, CI-only invariants (§5.3's digest-maintenance oracle among them, on every
  B-CITY-lite city) in the harness — on B-CITY: 1 000 seeds × the 4 `WaterSetting`s of §13.3 × 3 rungs in the nightly
  tier, 50 seeds per rung in the PR tier (§13.8), all three rungs from M1 (§1.1). Each invariant has an id, a severity,
  a count in the report and a CI threshold: hard = 0 per 1 000 cities; soft within its band.
* **The statistics record.** The **core record** is O(n) and is emitted by every generation within 4 ms at CITY
  (§12.4): counts per entity kind and class; areas per class and band; fixed-bin histograms per district and band of
  plot area, frontage, depth, footprint area and storeys; way length per class; the junction-degree histogram; turning
  per 100 m on ways resampled at 10 m; the walled share and built extent; ladder uses per cause and rung; every
  requested feature's delivery tier (§5.1 principle 7); stage timings. The **bench metrics** — detour index over sampled
  destination pairs, Moran's I, KS distances, junction-to-junction runs, orientation coherence and wall alignment,
  figure-ground metrics on renders (§8.5), tree nearest-neighbour and pair-correlation statistics computed from §8.10's
  stamped scatter — run through `stats(doc, { level: 'bench' })` on demand or in the bench, never on the one-click path.
* **Cost-model tests.** Each stage is timed on **nine sizes — three per rung: the band's bottom, its target and its
  top** — 1 500, 5 000 and 9 900 (TOWN); 10 000, 20 000 and 29 900 (CITY); 30 000, 50 000 and 120 000 (METROPOLIS)
  inhabitants, five seeds each, nightly (the METROPOLIS sizes reported from M1, gating from M2b). A stage's log-log
  slope of time against its declared work measure (its work-limit laws, §5.1 (5), §14) must not exceed **1.15** for a
  stage declared linear and **1.25** for one declared n log n; §12.3's per-rung cost laws are fitted on the same runs.
  **Work limits follow population:** each run reports, per stage, the F-WORK hit rate (work cuts per 1 000 batches), and
  CI fails when the rate at the top of a band exceeds the rate at its bottom by more than 1 per 1 000 — §5.1 (5)'s
  pre-decided coefficient fallback then applies and the sweep re-runs. **Index work** is fitted against commits × level
  size (§3.3). The budgets these runs time, and their measurement rules, are §12's: the per-edit cost and validation
  flatness across rungs (§12.6), the memory test per rung (§12.8), the first map by size (§12.5), the pan-and-zoom run
  during an A2 300-dpi export (§12.7), the model max clause judged on re-timed outliers (§12.3), the simulation module's
  occupancy test at M4b (§12.7), all taken in §12.1's timing phase.
* **Document tests.** The entity registry's path test fails when a type is missing from any path — generation, digest,
  render, export, persistence, edit, undo, migration (O11 a); export → import → export is byte-identical over the
  canonical form (O9 a, O11 c); the **document-size test** per rung holds ≤ 320 B per building at CITY (§2.9).
* **Stage contract tests.** The same inputs and stream give the same digest on Node x86 / arm64, Chromium, Firefox and
  WebKit, with workers on and off and pool sizes 0–3, beside §6.5 (9)'s determinism tests. **Op-order determinism:** a
  declared batch's ops permuted give the same result (§13.1); a callback-form stage run twice, on a slot-renumbered
  arena and inside the pool at sizes 0–3 gives identical digests (issue order; op permutation does not apply to it,
  §3.3). S8's working block equals S9's committed block (Hausdorff 0; §3.7). The stored `market.siting` cell `portRef` equals the median port demand fraction recomputed by running S0–S2 alone on every B-CITY harbour seed, from M1, where the scripted pass first sets it (§4.2 S3 (12); J-A24.43); a differing value fails. The per-stop placement digests of §13.3
  are the contract test of S13b; a stop placed whole and placed one unit per step gives identical placement digests
  (§8.3, §9.2). The stamp-tile asset's hash and rebuild tests and the view-data contracts are §8.3's; the shipped stamp
  tiles pass §8.3's seam check (§8.10).
* **Stage property tests.** 10 000 coast / island / fjord / sky outlines per intent → 0 self-intersections and 0 untyped
  loops; 0 overlapping or self-intersecting plots on concave, notched and curved blocks before any fallback; attached
  and party-wall shares on curved-street blocks inside the dense band; roster `manifest(P₂) ⊇ manifest(P₁)` for P₂ > P₁
  on 1 000 seeds; the stage-3 contract (the union of composed wings equals the outline, §2.6); the `ringed` fixture (≥ 3
  closed rings, radius CV ≤ 10 %); a B-CITY sweep over `wealthLevel` ∈ {0, 0.5, 1} (population ± 5 % on ≥ 95 % of seeds,
  walled share inside its rung band, §4.2 S2); the derived-complete digest identical across district orders; opening a
  person leaves the digest, the log and the undo stack unchanged; **heights** on 100 % of buildings, wings, towers and
  wall runs, and on hilly golden seeds and after every terrain stroke 0 wings whose `baseCm` differs from the highest
  terrain sample under the wing plus the plinth, user-edited bases excepted (§2.6, §7.3 (a)); **0 `E_KEPT` on the
  one-click path** over B-CITY (a stage whose domain overlaps an earlier stage's kept content is a pipeline bug); every
  gate and weld vertex on its trace, and stage 1's trace within 40 m of its boundary except along an `on_enceinte`
  castle's shared stretch; 0 lanes crossing a wall strip and 0 L3 band faces split or cleared (NF-P5); 0 S7b claims
  meeting a wall strip; the seam exception (NF-P6) on New random of 20 districts per B-CITY-lite city; the union rule
  (composed wings = outline) on curved-street row fixtures with `quad` wings, including rear lines oblique to the
  frontage — bent party-wall chains, `corners` recorded, the ridge at the arc-length midpoints; decks on 100 % of
  way–water crossings, moats and canals included; harbour fixtures with a two-arm mole and a detached breakwater pass
  the crossing invariant as harbour works, and a `quay` way drawn across a river without a deck fails it (§5.3); the
  walled coastal harbour fixtures of §4.2 S3 (11) — the harbour outside the stage-1 region, with and without
  `moat: 'inner'`, sealed with `N = 0`, and a polycentric coastal town whose nucleus nearest the harbour has no unforced
  pick left — each with the harbour served, 0 non-gate ways reaching the trace, every way–moat crossing on a deck, roads
  leaving = the N main gates plus a harbour gate of §4.2 S3 (7) where one was placed, the harbour route at most 1.5 ×
  the plaza ↔ harbour least-cost lattice path with the wall ignored, and one main gate on the harbour side (§4.2 S3
  (4)); a river town whose growth leaves crossing sites unused — 0 site furniture and 0 site marks in the display list,
  every built bridge's span the way's own L1 edge; an epoch whose growth builds a site; a drawn bridge 15 m from a site
  builds that site, and one 30 m from every site adds a deck by one L0 shore-split batch, §5.3's crossing invariant
  holding throughout (§4.2 S1 (5)); a canal across the settlement perimeter — 0 district faces outside the perimeter,
  the land on both banks the hinterland's; `castle: 'on_enceinte'` with water in reach, with and without a city moat — 0
  trace–water crossings off a river's water gate, the outer-arc channel beside the shared stretch, the town side
  dry-ditched or plain by its row; every seam edge typed, a way-less shared reservation boundary typed `reserve` (II.5).
* **B-EDIT and the locality oracle.** §7.3 item 7 (i)–(iii) and (v), and (iv)'s byte identity of Regenerate (keep
  settings), run **once per sequence** — at its end and at one seeded random position — never per edit. Fixtures: the
  re-parenting set (`drawBoundary`, district merge and split, `outskirtToDistrict`, regenerate around a lock, the
  id-recycling case); terrain-brush sequences in both water modes, and course-knot, drawn-water and drawn-bridge
  sequences with §7.3 item 7 (v)'s assertions and its water-edit fixtures; table weight edits and row insertions; drawn
  features mixed with later attribute edits; epochs and rebases; an epoch after 20 edits and a Re-derive from S10 after
  20 edits, each at pool sizes 0 and 3 with identical digests, every freeze finding every dynamic grid and tombstone set
  empty after its rebuild (§3.3 pool step 1); undo and redo from several sessions and §6.5 (9)'s truncation, naming and
  version-pinned cases (§7.4); an undo after a reload of an unshared document undoing the pre-reload event (§7.4); New
  random on minimal scopes (§5.1 (6)); the naming-collision replay fixture (§7.3 item 7 (i)); the B-EDIT-lite identity
  fixtures (≥ 99.9 % of addresses kept under 1 cm perturbation, §6.3); §7.3 item 7 (vi)'s shared-edge identity, and
  Regenerate (keep settings) of a block holding a rich compound whose yard has a formal-garden grid and an orchard part
  with edges ending on the house wall — byte-identical to the one-click result, the wing rings after generation already
  carrying those wall vertices (§2.6); a warp over a square keeping its fountain, over a yard keeping a user-moved tree,
  and one halved by a pinned pin (§7.4); **§2.6's test** — a warp and a `moveVertex` over a built block with an L house,
  an overlapping T, a curved row of quads and a holed footprint: after each, every wing union equal to its footprint
  face (integer equality), every carried ring simple, every roof line inside its footprint, de-rectangled rects turned
  quads, a neighbouring plot re-fitted onto a shared party wall adding its corner to the wing ring along that wall, undo
  restoring every ring byte for byte and a replay reproducing them; and a building with a hand-built stored
  `Composition` — its composed wings the base wings each cut in two, a court on the footprint's hole, a tower centred on
  a corner and one inside, rooms in one wing — whose composed wings unite to the moved footprint face after each move,
  its rooms inside, its tower centres inside or on it and its wings reaching every storey the base wings reach with at least their area at each (the storey rule of §2.6's stage-3 contract), undo restoring it byte for byte — the stage-3 intake runs the
  same test with every fixture building's composition stored (§2.6); **load verification** — an edit within 100 ms of
  the state becoming editable on an edited CITY document, with a mismatch forced by a snapshot whose one moved footprint
  has its recorded digest recomputed to match, each choice taken in turn: the edit applies at once, and after either
  choice the session's digest equals the digest a fresh load of the saved document replays to, and that load reports no
  mismatch; the open-to-editable time against T(B); a snapshot with one moved footprint and an unchanged `model.digest`
  — its chunk hash rewritten, and not — reported as a corrupt cache and loaded by replay, never verified and never
  offered as the saved town, the session's digest after the replay equal to a fresh replay's (§2.9 steps 3–4); the same
  snapshot under a forced §6.2 (iii): "trust the saved town" and a save wait for the recomputation, the mismatch
  withdraws the keep, and the snapshot is never kept; a snapshot with one altered naming record — a corrupt cache when
  its `recordsDigest` is left as written; rewritten to match, loaded, reported by the replay as a records mismatch, the
  edits made meanwhile re-applied, then verified, and a corpus selection made afterwards renames exactly what a session
  that never saved renames; an Adjust made during load verification in an epoch-grown town, saved and reloaded, reports
  no records mismatch; a `drawBoundary` that moves surviving blocks, saved and reloaded, reports no corrupt cache;
  **naming inputs** (§6.3) — a selected user corpus and an edited naming row rename exactly the unedited names citing
  the changed slices, listed in the fate report and stored in the event, in a fresh and in a rebased document, every
  other name and naming record byte-identical, 0 duplicate ids and 0 silent re-binds; a bridge re-sited afterwards keeps
  its new name; an `editTable` of one naming grammar row renames exactly the unedited names citing it; a culture row
  with a street corpus and a district-name corpus, the street corpus replaced — every district and quarter name and
  naming record byte-identical; a frozen fixture whose naming row changed imports with its renames listed, and a New
  random made afterwards renames nothing outside its scope; a canal carved across a wall and a river move whose bank
  cuts a glacis line, each committing with 0 NF-P5 violations, and a lane drawn across a wall strip refused (§5.3); the
  20-epoch test — a TOWN with ≈ 30 % churn per epoch keeps its heap ≤ 1.3 × and its document ≤ 2 × those of a freshly
  generated town with the same live entities (M4); and **the thirteen MFCG asks of §7.4** as scripted scenarios, each
  reporting its locality share, its invariant results and its re-run cost against §12.6.
* **The faithfulness campaign (O9 c; §7.3 item 7 (iv)).** New random is judged by a campaign, not per sequence. Each
  nightly run draws **n = 800 regenerated scopes** from its B-EDIT New-random events — 400 block scopes and 400 district
  scopes, by a seeded draw; a night whose B-EDIT run holds fewer than 400 New-random events of a kind adds New random on
  seeded scopes of that kind in its B-CITY-lite towns until it has 400 — and for each generates **K = 50 from-scratch
  references** of the same scope: the same upstream state and context, rerolls 32 768 + i for i = 0 … 49, a range no user
  reroll reaches. For each of four statistics (median plot area, median frontage width, density, attached share) the
  rank r of the regenerated value among the K references counts the references below it plus a uniform draw from 0 … t
  over the t references equal to it (drawn from the campaign's own stream), so r is exactly uniform on 0 … K for a
  perfect regenerator, whatever K and however discrete the statistic. The ranks are binned into 10 bins of
  ⌊r · 10 / (K + 1)⌋ with expected counts proportional to the number of rank values each bin holds; a χ² test per
  statistic gives four p-values, and the campaign **fails when Holm's procedure rejects at family-wise 0.01** (the
  smallest p-value below 0.0025). Cost ≈ 40 800 scope generations (800 × 51), ≈ 12.5 CPU-min at §12.6's block and
  district costs (20 400 × ≈ 6.6 ms + 20 400 × ≤ 30 ms), inside the nightly budget (§13.8). **Calibration (executed,
  `docs/validation/bench/fixall_scope_r3_o9c_n800.py` → `.out`; `fixall_scope_r2_o9c_power.out`):** the four statistics
  move together, and at ρ = 0.8 a campaign of 400 scopes catches a +0.25 sd bias in only 92.2 % of nights and a 0.8 ×
  too-snug regenerator in 95.2 %, hence 800. At n = 800 a perfect regenerator fails 1.0 % of campaigns on continuous
  statistics (31 / 3 000 at ρ = 0.8, 15 / 1 500 at ρ = 0) and 1.4 % (14 / 1 000) on heavily tied, scope-varying discrete
  ones; a +0.25 sd bias and a 0.8 × too-snug regenerator are caught in 2 000 / 2 000 campaigns each at ρ = 0 and ρ =
  0.8 (95 % lower bound 99.8 %), a 0.6 × too-snug and a 1.5 × too-loose one in 500 / 500, and at ρ = 1 the bias in
  99.3 % and the snugness in 99.7 %; without the randomised tie-break a perfect regenerator fails every campaign on a
  tied statistic (`fixall_verify_scope_o9c_rank.out`). A failing statistic's histogram names the fault: a hump is too
  snug, a U too loose, a slope a bias. **A failed campaign is re-run once with the next campaign seed:** a perfect
  regenerator fails two in a row with probability ≈ 1–2 × 10⁻⁴, and a fault of the sizes above is declared on the night
  it first runs with probability ≥ 0.996 at ρ ≤ 0.8 (≥ 0.985 at ρ = 1). A second failure is a regeneration defect —
  entered in `known-defects.json`, and M3a does not exit until it is fixed (§16), because no threshold can be relaxed
  without passing a wrong regenerator.
* **Control sweeps.** §7.8's statistical monotonicity and continuity: 21 steps × 50 seeds at TOWN and CITY (nightly);
  METROPOLIS in the milestone tier. The population control's sweep also reports the F-WORK hit rate per stage, which
  must stay flat across each band as above.
* **Option-interaction matrix.** Every pair of toggles rendered and diffed; no option silently disables another (O12 c).
* **Documentation coverage.** 100 % of controls and entity kinds have a guide anchor (§14 `@plat/docs`); every in-app
  help link resolves (CI link check); the release notes list every open entry of `known-defects.json`.

* **Amendments b (items 8–31): hook tests and acceptance bars.** They are stated once, here (R9); the mechanisms they
  prove are at the homes §0.2 names, and the fixture ids the editing seats coined (`T⟨item⟩-⟨n⟩`) are kept. A bar is
  hard — 0 violations, or 100 % — unless it names a band. Each runs in the CI tier §13.8 names, from the milestone §16
  names (a stage-3 bar from stage 3's intake, *Staged by the owner's roadmap*); the bars of a staged engine run on hook fixtures, its conversions applied by hand,
  until the engine lands, when the same bars bind it. The entity registry's path test above covers every record and
  attribute §2.8's registry paragraph lists for amendments b — `Passage` and the tunnel's `navigable`, `headroomCm`
  and `closure` among them — with `Block.due` and `ElaborationRecord`, and the enumeration test the
  new event kinds (`rejectSite`, `placeAt`, `setEntrance`, `drawPassage`, `drawTunnel`, `placeAccess`, `sealPassage`, `openPassage`, `relet`,
  `densify`, `thin`, the seven plan events and `setRoomUnit`, `regenerate.rung` and the `convert` kinds of
  `DeclineOp`,
  `UseConversionOp`, `LadderOp`, `TerrainWaterOp` and `HiddenOp`). No golden exists before M1 (D-24), so none of the
  new attributes needs a declared shift.
  * *Decline and regrowth (item 8; §4.11).* (T8-1) every `DeclineOp` kind applied by hand on the golden TOWN undoes to
    byte identity; (T8-2) the regrowth-first fixture — a TOWN with 12 % of its buildings vacated, derelict or cleared by
    hand, then grown by +6 % population: 0 new S5 faces, ≥ 95 % of the delta placed inside the old plan, every
    vacancy-run share within ± 0.02 of its table share; (T8-3) 20 epochs of hand-applied decline and regrowth keep the
    address of every ruin, trace and superseded ring (100 %), and no cleared building gets a tombstone unless
    demolished or succeeded, and a front building made a footprint trace or demolished leaves its passage with no `frontBuilding` and no base wing spanning it, the undo restoring both (§2.6's `BaseWing.spans`); (T8-4) the exposure function is monotone in each driver's weight, and its chance share
    equals the table's; (T8-5) the salvage ledger's credits equal the yields of the robbed and the cleared, are never
    negative, and every shortfall is reported; (T8-6) a CITY dropped below 10 000 inhabitants loses its islands over
    their dwell spans — waning, settled, fallen — never in one epoch; (T8-7) after a −6 % population fall on a TOWN
    whose buildings are let out, no building with a surviving household reads `vacant`, and every `relet` down marks
    an unstored plan rung `stale` and re-cuts a stored plan inside its own event (item 28 (f)).
  * *Islands (items 10, 13, 15; II.6).* (T10-1) 200 CITY seeds with `recipe.layers.islands` on: a town supply below the
    threshold gives 0 islands, and the supported area is monotone non-decreasing in the town's supply and in the
    carried districts' supply over the band rows; (T13-1) TOWN and village requests never carry a sky allocation; a
    CITY with the setting off carries none, and its ground digest equals the realism golden; (T15-1) 500 CITY seeds at
    the target at each of `wealthLevel` 0.5 and 1 with the setting on: for each count 0–3 the number of seeds drawing
    it lies within ± 3 s.e. of its expectation under II.6 (4)'s slot law at each seed's own h(S_town) — with the
    defaults a count of 0 has probability 1 − 0.6 · h(S_town); on 1 000 seeds of a hook fixture whose town supply gives
    h(S_town) = 1 every count 0–3 is observed; and hiding the sky layer changes no model digest (J-A15.01).
  * *The underground (items 11, 12, 14; II.6, II.7).* (T11-1) tunnel conversions by hand undo exactly; a `caveIn` given a stretch splits the tunnel at the stretch's widened ends (II.6, §6.3; J-A11.43) — the first-vertex part keeping the address, every part continuing the lineage, the chambers and access points re-pointed, and each underground block's `Frontage` that spans an end split there (each part beyond an end a new record with its kerb edges' rows, one spanning both ends of an interior stretch split in three, each part keyed by §6.3's rule for a split `Frontage` and re-pointed to the part it fronts) — closes only the plots fronting the stretch, leaves U1 holding on every plot, and its undo restores the one tunnel record and each split `Frontage`'s one record; no
    `EvolutionStrategy` plan on the hook fixture contains a tunnel `demolish` (a lint); a sealed tunnel persists at its
    address and reopens; (T12-1) a schema fixture of one underground neighbourhood — two navigable tunnels, a junction,
    six cells, one vault, one stair, two gratings — validates and passes every row of §5.3's U1–U3 family: each
    underground plot's frontage rows on exactly one navigable open tunnel run, no `way` chain and no `alley` face on
    the underground arena, every building's frontage side on its plot's frontage edge, ≥ 1 access per neighbourhood,
    every access point in public ground, a yard or a building's basement — a `cellar_stair`, `ladder`, `hatch` or
    `door` only from the basement of a building II.7.3 admits (its neighbourhood rule's class row or a `secret` plot, or
    its *Basement accesses*, item 64) or that an access edit gave one (§7.3 item 9) —, every `grating` on public ground, 0 underground faces under an excluded ground face (also on
    B-CITY-lite with the `navigable` preset), and the underground stage's commit records holding 0 writes on the
    ground `PlatKey`; the underground reroll-isolation fixture leaves the ground byte-identical, and the cut-away or
    overlay draws one depth band at a time (§8.4); (T14-1) the TOWN
    existence draw's frequency over 1 000 seeds at three populations × three wealth levels lies within II.7.1's law
    ± 3 s.e. and never reaches 1; `Features.sewers` is true on 100 % of CITY and METROPOLIS seeds; a TOWN with `off`
    and a village request carry 0 tunnels; with the layer hidden a CITY's render matches, pixel for pixel, the render
    the same seed gave before the staged stages registered.
  * *Assignments (items 16–19; §4.7 S10b, S11; §4.11).* (T16-1) hard relation rows satisfied on 100 % of placed items;
    every unplaced item reported with its blocking rows and ≥ 1 closest option; soft-row satisfaction ≥ 95 % reported
    per city — O7 (b) extended: noxious trades downstream or extramural, water trades on water, the market hall at a
    tier-1 junction or gate, inns at gates; (T16-2) hard supply edges within their `maxDistanceM` on ≥ 90 % of items
    at generation, the rest reported; (T16-3) the one-solver contract — S10b's placement of a class and an `assign` of
    the same class from the same state give the same plots; (T16-4) the detour factor — block-raster distance against
    the way-graph Dijkstra within the factor's band on B-CITY at M1, the fallback a per-rung refit; (T17-1) a hand
    relocation keeps the use's address, the building persists vacant with its `formerUses`, and undo restores;
    (T17-2) a pinned assignment never moves under an epoch, and the use row of the churn cap holds; (T17-3) one seed
    with one circumstance timeline replays to a single digest of openings, closings and moves; (T18-1) a designation
    mutation keeps every kept part byte-identical (leaf digests) and leaves everything outside its event's effective scope untouched (§7.3 item 1: the plot, its joined neighbour, each displaced use's new site and the buildings and plots its capacity re-homing touches; the locality oracle); (T18-2) locked parts are never subtracted; (T18-3) A → B → A by the
    inverse mutation is byte-identical when nothing else changed, and one change from one starting state yields one
    mutation record on every host; (T18-4) S11 run as a mutation from the empty design reproduces generation
    byte-identically; (T19-1) every roster class has a designation template with every band row (registry test);
    (T19-2) the size budget is monotone along prosperity (Spearman ≥ 0.9 over B-CITY) and continuous between adjacent
    samples by §7.8's rule on the template's continuous columns — two smiths a few streets apart differ by degree;
    (T19-3) a `setAttr` material change leaves the geometry subtree of the digest unchanged; (T19-4) with no epoch
    every residential building houses at least one household and at most its capacity (§2.6's function) — the households S10b placed in its slot (one to its template row's `households.built`) clamped into [1, capacity], but for the moves §4.7's overflow pass reports — every building S11 builds for a slot without `houses` (§10.2; `BuildingSlot.unhoused`, §2.5) houses none, no plot's site plan holds a `required` structure below its least `count`, and every household S2 demanded (§4.2) is housed or reported unplaced by F-SITING (§4.7, J-A28.46); on a fixture whose district holds a live-in workshop and no household of its band or drift, the workshop's plot keeps its use and its main slot, which S11 builds without `houses` — `BuildingSlot.unhoused` set (§2.5), capacity 0 (§2.6), housing none, `Building.dwelling` absent — the typing reported (§4.7); on a dossier fixture whose squalid district's shells hold fewer households than their template rows, every household that fills the dossier's population is housed — those no building has room for in a residential slot the `dossier` request re-provides in their district —, no building exceeds its capacity, and each re-provided slot is reported (§7.7 item 2; the dossier clause, from M3a).
  * *The dossier (items 20 and 22; §7.7).* (T20-1) a map delete of a dossier-backed element re-places it coherently from
    the same seed, every plot outside the disruption set byte-identical; (T20-2) by §7.7's lapse rule, the rejection lapses at
    a dossier event touching its block (the dossier-event clause) and at the first epoch whose population target has moved
    from the one it recorded by more than the roster tolerance (± 5 %, §4.11; item 76), a drift inside it lapsing nothing
    (the epoch clause, from M4), and an undo of a lapsing epoch that carried no dossier event restores the hold, while an `undo` naming a lapsing dossier event returns F-EDIT (§7.4); (T20-3) a blocked positive placement returns its blocking rows and ≥ 1 closest site;
    (T20-4) generator-added filler deleted, the dossier's housing re-provided elsewhere; (T20-5) the one-way
    door (item 20 (a)) — an enumeration of the bridge's message kinds (§11.3) finds no PLAT → host message that
    addresses the dossier (`doc.changed` carries map-document events only, `report.changed` the map's report), and over a
    B-EDIT sequence `report.changed` carries every rejection, placement, lapse, relocation and mutation record the
    sequence made (§5.4's entries); (T20-6) by §7.7 item 2, a map `unassign` of a dossier-backed element, a map `setAttr` of its use or class, a hand `convert` `closeUse` of its use or `mutate` of its plot to another designation, and a plot `join` or `split` whose fate would demolish the building that houses it each return F-EDIT with `rejectSite` and `placeAt` offered and change nothing, while a `relocateUse` of it commits, and a `revert` of it skips every later dossier event (`EditBase.dossier` set) that placed or re-designated it, its dossier content unchanged (§7.4; item 20 (c)) (the refusal clause); on a B-CITY dossier fixture whose dossier-backed use stands in a declining quarter, a hand `convert` `vacate` or `demolish` of the building that houses it returns F-EDIT, and in every epoch whose use step, redevelopment, population fall or conversion reaches the use or its building the use is never closed and its building is emptied or removed only after the use has moved — a pinned use keeping its building (§4.11's *Dossier content across epochs*) — with §5.3's dossier row holding after every epoch, and an `undo` naming an epoch that carried a dossier event in `EpochInputs.dossier` returns F-EDIT and changes nothing (§7.4) (the epoch clause, from M4; J-A17.01); (T22-1) the same history from
    the same seed gives one digest; (T22-2) two histories reaching one dossier give two valid maps whose differences
    are confined to their disruption sets; (T22-3) an over-budget dossier event lands and is reported; (T22-4) a
    brand-new map from a dossier holds every dossier element from the start, and everything outside the report is
    byte-identical after any dossier event.
  * *Emulation (items 23, 24, 26, 27; §7.6 with §4.2, §4.9 and §4.5).* (T23-1) with the parity presets `MFCG` and
    `FTG` every `extension` cell reads 0 or off and B-REF's parity rows hold; with the default preset the extensions
    run at their table values; a registry test that every table cell has `provenance.source` and, where it extends a
    reference, its `extension` marker; (T24-1) under the defaults the principal market sits on the plaza for ≥ 90 % of
    inland walled B-CITY seeds and elsewhere for ≥ 50 % of port seeds (§13.7's row); (T24-2) the market count equals
    the roster's demand; (T24-3) no two market reservations share an edge or lie within `market.minSeparationM`;
    (T26-1) wood area lies within the fuel and timber rows' demand, the import share reported; (T26-2) the `fill`
    mode at TOWN and CITY on flat fertile fixtures and `perimeter` at METROPOLIS or on hilly fixtures; under `perimeter`
    and `rivers` no farmstead plot exists and every farm household is allocated to a town district; on an arid river
    fixture at TOWN on flat fertile land the mode is `rivers` and every field lies within `riverBandM` of a bank but
    those of the band's reported shortfall, laid beyond it as `perimeter` lays them, and on an arid fixture without a
    river the mode reads as `perimeter`; (T26-3) with
    `reserveArable` on, fertile land outside the boundary ≥ the reserve wherever the fixture makes it feasible;
    (T27-1) a schema test that the band set has one `middle`, that every band-keyed table resolves a row or an
    interpolation for every band, and that the parity preset's household shares equal FTG's captured distribution;
    (T27-2) the shanty fixture — an average band of poor gives a shanty kind once half the stages have run, the
    extramural share reported.
  * *Terrain and water (item 25; §4.11).* (T25-1) a hand `reclaim` and a hand `siltReach` are byte-identical outside their
    footprint, in the carve fixtures' form (§13.1), and undo exactly.
  * *The plan rung and elaboration (item 28; §2.6 beside §2.8's record, §2.9's cache and §4.1's policy) — the B-PLAN fixtures.* 24 fixture
    buildings (rectangles, L and T shapes, a court closed by a U, a quad from a curved row, a rectangle carrying a round tower, a rectangle holding a round tower wholly inside it, a rectangle carrying two round towers whose rings overlap, a T of two overlapping wings whose second wing holds a round tower that also overlaps the first, a rectangle carrying a stair turret (a round tower whose spiral core's bay fills its round room), a
    manor of three wings at unequal storey counts), each in six classes and three bands with one to four storeys, the
    entrance sets of item 29 and a cellar wherever the class row gives one; from stage 3's landing, the plans of every clicked
    building of B-CITY-lite as well. Hard: (T28-1) each room the programme marks hard is present; soft rooms are
    delivered, folded into a neighbour or dropped, each with its tier in the report; (T28-2) starting at the main entrance — and, for a basement whose `Basement.access` is `external`, at its outside door where step 3 opens one (§2.6 step 3) —
    openings and stair cores lead to every room of every storey; each entrance gives onto a room; a passage can be
    entered from either of its ways; (T28-3) stairs stacked — a stair core occupies one bay through all the storeys it
    serves, and the basement is entered by that core, through a trapdoor — the one `Basement.access` names, or the `trapdoor` core the plan reports where no bay of the core fits the basement ring or, for a walk-out, where no side of the ring is long enough for its door (§2.6's fallback, step 3; J-A29.25) — or, for any other walk-out (`Basement.access` `'external'`), by its outside stair; (T28-4) the outer walls
    coincide with the wings: on each storey the rooms together cover exactly the extents of the wings reaching that level
    plus the span ring of each passage a wing spans, at the ground storey only — the passage room (§2.6's fourth rung) —,
    each exterior wall segment sits along the edge of such an extent or span ring, each room's ring is simple and lies
    within its wing's extent at its storey (the passage room within its span ring), each composed tower's round room at each storey the tower reaches — with any spiral core's bay (`StairCore.tower`) or chimney stack standing in it, or that bay alone where it fills the room (a stair turret) — covers exactly the tower's ring there less those of the earlier towers in the clip order that the tower overlaps (§2.6's stage-3 contract), and no gap or overlap remains between rooms (§3.10's seed-tiling row per storey); (T28-5) each chimney rises from a hearth's
    column, and a dormer exists only where a roofed room needs light; (T28-6) one building state, one plan, host after
    host (§6.5 (9) applied at the building band); re-rolling the layout preserves the stair core, the wings and the
    entrances bit for bit, and re-rolling the roles keeps every ring and every opening's position bit for bit; (T28-7) no edit or
    re-roll of a plan touches anything beyond its own building; (T28-8) `plan()` meets §12.7's row at its median per
    building, one plan for each click, and the cache stays within §12.8's line; (T28-19) the JSON `plan` block validates against its schema
    and round-trips, and every storey scene's portals equal the plan's openings and entrances (§11.1). Soft bands, reported: no unit room used as a
    passage (its door count within its row's cap); corridors never doubled in parallel; the share of each storey given
    to circulation, by class and band; room areas ordered as their rows' target areas; unit and service rooms no shallower in the door
    graph than the shared and circulation rooms of their storey; a loop in the door graph only when a row calls for one (§13.7's row). Elaboration: (T28-9) click order
    changes no digest — one document elaborated in two orders has identical model, records and derived-complete
    digests, and the cache holds byte-identical results per (entity, rung, input digest); (T28-10) a `stale` rung
    re-derived by mutation keeps every surviving room's address, and viewing never re-derives a `current` rung;
    (T28-11) an evicted cache re-derives to the same bytes, and a corrupt cache chunk is dropped and re-derived, never
    trusted; (T28-12) clicking a neighbourhood makes its buildings' `wings` rung `current`; clicking a building does
    the same for `plan`, after `wings` where that is still absent.
  * *The interior ladder (item 28 (f); §2.6).* (T28-13) the owner's bar — when a building's occupants' band falls two
    rows, the re-cut plan houses every household of the building (`Building.households`, §2.6) with its own door off a
    corridor or stair hall, within unchanged wing rings and around an unmoved stair core; (T28-14) the shell stays
    byte-identical through any interior re-cut — its wings, entrances, heights, roof and basement — checked by the
    shell's leaf digest before and after the re-cut, a stored plan's rings read with the `composition`-role vertices its
    re-cut adds removed (§2.6's bar, §5.3's interior-ladder row), with §3.10's seed-tiling row proving the re-cut rooms
    tile that unchanged shell; (T28-15) re-uniting the households restores the earlier plan where nothing else changed — exactly for an unstored plan (§2.6's canonical chain); for a stored plan, every household's unit with its own door, the shell read without the `composition`-role vertices (§2.6, J-P48 (1)), and the subdividing event's undo restoring the plan byte for byte (§7.4) (item 18 (e)'s
    inverse); (T28-16) a schema test that every band of the band set maps to an interior row, and that every row names
    its unit, shared, staff, circulation and size columns; (T28-17) the owner's concern — after a district's two-band
    fall every roster household is housed without a new plot, bounded by each shell's capacity (the housing clause — in
    the base on a hook fixture, the `relet`s applied by hand), and no F-PLAN tier drops a household unit, a unit
    falling to the next poorer form first (the F-PLAN clause, from stage 3's intake); (T28-18) a hand `relet` above §2.6's
    capacity returns F-EDIT (the `relet` clause), and a `setRoomUnit` that would leave a unit without its own door
    returns F-EDIT (the `setRoomUnit` clause, from stage 3's intake); on a B-EDIT fixture a `setAttr` of a tenement's heights, a `moveVertex` that shrinks its footprint, a moved face of a passage it spans and a §7.6 edit of its template's `households.max` each lower its capacity below its households, and each edit's dry run lists the households past the capacity (the last in address order, a locked or pinned one passed over) with their `relocate` moves and holds that building and the receiving buildings in its effective scope; after commit no building houses more households than its capacity (§5.3); the undo of each returns every household to its former building byte-identically; a prosperity-brush stroke that lowers the tenement's plot `builtBand`, bringing its capacity below its households, re-homes its excess the same way, and the stroke's undo returns every household to its former building byte-identically (§7.4's setField row); a `setAttr` of the tenement's plot use to a class that leaves it no residential slot (capacity 0, §2.6) re-homes every household it houses the same way, and its undo returns the tenement's design and every household to its former building byte-identically (§4.7 S11 rule 5; §7.4's Application); and an edit whose excess cannot be re-homed — its locked and pinned households alone above the new capacity, or a household that fills no dossier's population that no residential building of the district has room for — returns F-EDIT; on B-EDIT dossier fixtures whose district has no residential room for the excess and whose tenement holds no locked or pinned household — one whose re-provision moves a use, one whose re-provision joins two plots — each of these edits, the brush stroke among them, commits, the households past the capacity that fill the dossier's population housed in the residential slots the `dossier` request re-provides inside the district (§4.7), its dry run listing each such slot with the use its re-provision displaces or the plots it joins (§7.3 item 4) and holding the plots that request touches — each site with its joined neighbour or the displaced use's new site — in its effective scope (§7.3 item 1), and its undo restoring those plots and every household byte-identically (§7.4; §2.6's capacity rule; the re-homing clause).
  * *Entrances and basements (item 29; §2.6).* (T29-1) each building has one main entrance and only one, facing its
    street or its court (100 %; O5 (f)'s doorless count stays 0); (T29-2) no side or rear entrance without an access
    edge beyond the frontage, and the caps per class hold; (T29-3) no cellar under the flood band or on the water
    table's damp ground; (T29-4) every basement inside its ground-floor footprint and smaller, with its storey in
    `Heights` and its access by one of the three ways §2.6 gives it — the stair core, a trapdoor or, for a walk-out, an outside stair; the entrance row of §13.5, class C — the owner's rule (item 50) — stands for the main door; (T29-5) a VTT portal at every
    entrance of the set, and glTF and CityJSON basements below `baseCm` that validate (§11.1).
  * *Hidden plots (item 30; §4.6, §9.2).* (T30-1) every hidden plot is reachable by a chain of access edges — alley,
    court and passage faces — from a public way, 100 %; a sealed plot reads `sealed`, is reported, is never landlocked,
    and reopens; (T30-2) the hidden share per district lies within its target ± 0.03 — §4.6's band rows interpolated at the district's area-weighted mean prosperity value and scaled by its rung and density factors (§13.7); (T30-3) no label
    of a local or secret place appears at the settlement band without the viewer's knowledge key, and no secret name
    enters an export made under a view state without it; (T30-4) the parity presets and the village rungs produce 0
    hidden plots, and a hidden court passes §8.5's figure-ground metrics, reading as a court behind buildings; every passage with a `frontBuilding` has its `headroomCm` written and equal to §2.5's rule, after a heights edit of a spanning wing too, each base wing spanning it has at least two floors and an eave above that headroom, and a heights edit that would leave a spanning wing below two floors returns F-EDIT;
    (T30-5) by §11.2's knowledge rule, on a document holding a `secret` institution, `query` of every kind (`gazetteer`,
    `people`, `whereIs`, `relations`, `hit`, `inView`) and hover list its row with `withheld: true` at the `public` tier
    — a view-bound kind (`hit`, `inView`, hover) at every band coarser than the building band, the one band §9.2's table
    admits it at; a person working there naming it by its address only; the band-less kinds and a GeoJSON export
    withholding it as at the city band — and its name at `secret`; `export` of `.plat` and of a permalink under a
    `public` key fails with `E_KNOWLEDGE_TIER` and succeeds under `secret`; a bridged `export.request` for `.plat` from a client whose key is `public` is answered by `export.refused` carrying `E_KNOWLEDGE_TIER`, and never by `export.ready`; and by §9.5 a withheld place gets no number,
    letter or row in the legend.
  * *Prosperity change (item 31; §4.11).* (T31-1) after a re-cut every plot keeps ≥ 1 access edge and the class
    minimums, and party walls agree on both sides; (T31-2) granularity lies within the band's target ± tolerance;
    (T31-3) the churn cap holds for each kind, in each district and each block; (T31-4) no occupied building is
    removed by a band change — a redevelopment first vacates — and a plot `join` or `split` that would remove an
    occupied building returns F-EDIT ('vacate first') unless the user confirms the demolition as a fate, while one that
    keeps the building through S11's mutator commits (§7.1); (T31-5) generation-then-mutation equals the same history replayed; (T31-6) an undo of a
    fusion or a split restores rings, records and `builtBand` exactly, and a resurrected member takes `builtBand` from
    the event; (T31-7) a direct `setAttr` of `builtBand` is refused; a brush sets `builtBand` in its scope, and with
    no epoch the static base's digest is unchanged; (T31-8) a schema test that every class has a replaceability and
    every ladder row a duration per direction and replaceability. The floor's bars: (T31-9) across any run of epochs, no
    rung-1 or rung-2 event changes a plot's frontage edge or shrinks or re-cuts a shell of its buildings toward a poorer
    band — every change of its ring or its buildings' shells (read, as §5.3's epoch row reads them, without the `composition`-role vertices a stored plan's re-cut adds, §2.6, J-P48 (1)) matched to a lifecycle event the epoch recorded (§5.3's
    epoch row: a rung-3 event, rung 1's yard buildings, rung 2's back court, a designation or renovation mutation, a
    conversion — `wallToWay` and `contractWall` among them — or the growth step's regrowth builds, `demolish` and
    corridor re-cuts) — and its geometry band is at or above its floor; (T31-10) after a rung-3 event that builds, `builtBand` is the band of the new stock, and after an `amalgamate` that builds nothing it is the `builtBand` of the member whose frontage anchor the joined plot keeps (§4.11, J-A31.44); (T31-11) a rich → poor →
    rich run with no rung-3 event leaves rings and shells byte-identical, a stored plan's shell read without the `composition`-role vertices its re-cuts add (§2.6, J-P48 (1)), and returns the rung-1 and rung-2 attributes
    to the rich manifestation within the ladder's durations; (T31-12) with no epoch `builtBand` equals each plot's
    generation band and the geometry band equals the field band; a town and a metropolis each resolve their own middle
    band; every band set names its middle band.

* **Amendments c (items 33–62): the bars of the code-reading items.** Stated once, here (R9); each mechanism is at the
  home §0.2's amendments-c table names, and each bar runs in the tier §13.8 names from the milestone §16 names. The
  mechanisms restated from the references' code change no golden (none exists before M1, D-24), and the reference
  numbers they reproduce stay §13.5's rows (J-A41.01, J-A41.02).
  * *The bent cut (items 34–41; §4.6).* (T34-1) every block S8 commits has an OBB minor extent below the `τ` drawn for
    its face and every face it cut one at or above it, replayed from the `cut.stop` draws; over 10 000 faces the mean of
    `g` lies within 7/30 ± 3 s.e.; (T36-1) the start A draws nothing — a face planned with a different `cut.t` stream
    keeps its A — and lies on the run most nearly parallel to the working major axis (ties: the earlier run); (T37-1)
    every kept corner K lies at least `o` from both ends of its first leg, or at `λ / 2` when `λ < 2o`; every second leg
    meets its far run square within the lattice tolerance; under `flatten` no kept corner's triangle A–K–foot is lower
    than `max(cut.flattenM, 0.02 × |A–foot|)`; under the `MFCG` preset every cut whose first leg meets its run within
    `asin(√0.99)` of perpendicular, and passes step 8's checks, is straight; no cut bends twice; (T38-1) fillets on lane and street
    cuts only, never on a lot cut; each arc touching both legs tangentially and curving the shorter leg from end to end, its chords no shorter
    than `w_min` or the lattice minimum edge; the filleted share on NG's recorded face shapes within §13.5's fillet bar;
    (T39-1) rung (a) plans at most three frames per face, each turned 36° from the last, and never restarts anything
    above the face; a face every frame fails reaches rung (b), reported; (T40-1) inside one district lane widths are
    non-decreasing in the lane's length, inside the class's width band, and never narrower than a lower class; (T41-1) a
    registry test — `cut.stop` registered with its reader, `cut.side` and `cut.farSideAlt` reserved ids that no reader
    draws (§6.1); and §13.5's bent-cut signature row, its fillet share included, on NG's recorded shapes at M0 (b).
  * *Plots (items 43, 44; §4.7 S11).* (T43-1) every plot's `frontJitterCm` is 0 or in [`jitter.minM`, min(√(plot
    area)/3, `jitter.maxM`)] at its interpolated columns, and over the plots whose depth does not bind, the share of
    receded main slots per band row lies within ± 0.05 of the law's expectation — the mean over those plots of max(0,
    1 − `jitter.minM` ÷ cap), cap = min(√(plot area)/3, `jitter.maxM`); (T43-2) on bent and curved frontages every row
    footprint's front chain lies at `h` from its frontage along the normal (within the 0.71 cm hot pixel) and every party
    wall is its plot side line; (T43-3) no recession lies in (0, `attractCm` + 1 cm), and an `editTable` or `editPreset`
    setting `jitter.minM` below that bound is refused naming it (F-EDIT); (T43-4) under the `MFCG` preset the recessions
    follow 4.8 m and 2 m, and the institution, tents and cluster rows draw none under every preset; (T43-5) a designation
    mutation that keeps the main slot keeps its `frontJitterCm`, and Regenerate (keep settings) reproduces every front;
    (T44-1) under the default preset every prosperous or rich set-back compound carries a `wall` PlotBound with a gate on
    each access edge, and under the parity presets none carries a wall.
  * *Walls, gates and districts (items 45–47; §4.8, §4.2 S3 (4), §4.4, §4.5).* (T45-1) a thin castle claim — its nearest
    boundary vertex within `castle.minInnerM` of its centroid — is bloated before any equalise pass; a repaired claim
    reaches compactness ≥ 0.75 with an `on_enceinte` claim's weld vertices and, once fixed, its gate side's ends unmoved;
    a claim the repair cannot bring to the gate goes to re-site with a report and never restarts anything; (T46-1) on
    walled B-CITY seeds whose pick contour follows a sea or lake shore over at least a `gate.waterfrontShare` share of it, the main gates equal §4.2 S3 (4)'s reduced `N₁` exactly unless N was requested, and every trace is smoothed by
    exactly `wall.smoothPasses` passes with its gates, welds and shore vertices unmoved; (T47-1) districts seeded at a
    gate, the castle or a bridgehead have a median area below the town's median district area on ≥ 90 % of B-CITY seeds,
    and a scoped regroup (§7.3's S6 row) replays the same turns by seed lineage (J-A47.01).
  * *The hinterland (item 57; §4.9).* (T57-1) under the sector-look preset in `demand` mode no field cell is more distant from the settlement's edge than a non-field cell of the preset's admissible land (the outward order); under `fill`
    the field land equals the mode's; the farmstead count equals the farm table's under both sector variants.
  * *Drawing and labels (items 54, 55; §8.2, §9.3).* (T54-1) under `ink` every footprint's raised under-copy is swept by
    the sheet's base offset times its class's ratio — house 1, landmark 2, farm building 0.6 —, on 100 % of footprints;
    (T55-1) the horizontal spine is the first candidate of every area label whose tree has ≤ 64 leaves, and the candidates depend on the model alone — identical under every view rotation and zoom, as §6.2 requires of hashed label
    candidates.

=== REPLACE ## §16 Build plan — calibration and spikes first, then a viewable town, then editing, then parity, then stage 2 ===
## §16 Build plan — calibration and spikes first, then a viewable town, then editing, then parity, then stage 2

*In plain words.* Before building anything we measure what we still need from the recordings and take a few small new
ones (FTG towns at two sizes, MFCG towns at five seeds per size), then build the riskiest pieces first as short spikes
with pass/fail numbers: the geometry kernel, the bent cut, the fused street layout with its speed gate, and the
determinism machinery. The first real milestone (M1) is a town the owner can look at next to MFCG and FTG. Because the
owner ranks editability first, editing comes next (M2a), before the second look and the rest of parity (M2b). Then full
editing and the API (M3a), the exports and the should-have extras (M3b), hardening (M4), the simulation module (M4b) and
stage 2 (M5). Effort is stated honestly as a range with its basis: about 185.5–248.5 expert person-weeks (J-A16.01; the
2026-09-27/28 amendments' share J-A63.05, J-A73.05, J-A101.05). The subjects the
owner's roadmap puts later are listed in *Staged by the owner's roadmap*; nothing else is out of scope.

Person-weeks are expert estimates (PLAUSIBLE) for two implementers plus a verifier seat — about 93–124 calendar weeks
at that staffing; staffing per the owner (architecture and rulings on Fable seats; build, verify and measure on Opus
seats). Every milestone ends on executed evidence, never on intention, and every exit writes its `MilestoneRecord`
with the milestone's declared shifts and fails on an undeclared one (§13.3). **The owner's panel at every gating exit:**
M2b ("the base at parity"), M4 ("mastered") and M5 (the stage-2 gate) claim their D-5 verdict only by a rated pass of
§13.6's protocol or by the owner's acceptance recorded in the `D5Record`; an unrated panel follows §13.6 (7) — the build
continues, the milestone's status is *provisional — not rated*, the claim is not made and the panel is offered again.

| milestone | content | exit criteria (executed, not asserted) | est. |
|---|---|---|---|
| **M-1 — calibration and the clean-room inputs** | `docs/CONFIDENCE.md` §6 **#5** FTG face recovery (block sizes inside rings, dividing-road position vs OBB, plot depth and frontage, FTG's plot share of land) and **#10** NG adjacent-footprint pairing; **#2** the NG size sweep; the NG baselines of `docs/IMPROVEMENTS.md` §7.2 (detour index, 4-way share, cycles per km², plot minimum-width distribution, streetwall gap per 100 m); NG's hollow-block frequency and MFCG's inner-lot removal; **the MFCG sweep at five seeds per matched size** (40 / 80 / 130, plain options, plus a river-and-coast variant) with lot-orientation coherence, wall alignment, walled and ribbon shares, district areas, gates, towers, castle and plaza, and every ⟨M-1⟩ number of §13.5 — streetwall continuity on dense frontages, lots per block, T / Y share, intramural dead ends, blocks per ha, inner-lot removal and street-edge recoverability on its plain renders (the metric of §8.5, implemented research-side and cross-checked against the product's implementation on M1's golden renders within 0.01); **FTG captures at BIG_TOWN and BIG_CITY**, three of each — one with FTG's water options nearest to `none` and two nearest to `coast+river`, each capture's id (its folder name), `WaterSetting` and recorded population (the residents its decoded payload holds) recorded in its README for §13.6 (2)'s pairs — over six days on the free daily allowance, decoded with the existing tools; outline anisotropy and turning per 100 m after 10 m resampling on every FTG payload; NG block counts per template at `medium` from the vertex captures; the variety dispersions of MFCG and FTG; **`baselines.json`** generated research-side with `referenceBuild` on every row and committed into `plat/`; **the sanitised implementer digest**, written by one seat and checked by another; the hashed content deny-list; `CLEAN-ROOM.md`'s seat ledger (§17.1); the plot-depth rows and the regimes' block-depth minimums behind §4.6 step 1's per-face stop threshold re-fitted under that reading on NG's vertex captures and the MFCG sweep before any block band is signed (item 34; J-A34.01) | every §13.5 baseline row present with its provenance — or, for an ⟨M-1⟩ number M-1 could not measure, the row made descriptive and entered in `known-defects.json` by §13.5's ⟨M-1⟩ rule — and every band computed by the band rule; a `docs/calibration/` record per experiment; FTG's six captures decoded, each with its resident count or §13.6 (2)'s nominal fallback, marked; the digest checker's report shows 0 code excerpts, 0 reference word lists, palettes or tables and 0 deny-list hits; the re-fitted depth rows recorded with provenance "M-1 ⟨date⟩" | 2–3 pw |
| **M0 — kernel, bent cut, fusion, determinism and site spikes** (risk retirement) | (a) `@plat/kernel`: lattice, predicates, one arena per layer with the levels as views, role and owner tables and reference resolution, attraction and contact semantics, batched transactions with stage-end index partitions, booleans / buffers / bands on the arrangement with the CI oracles, OBB / LIR, snap rounding, the straight skeleton with its validator and exact OBB roofs; (b) the **bent-cut transaction** with the hole slit — §4.6's restatement of NG 1.2.2's mechanism (items 34–40) — calibrated on NG's vertex captures after NG's signature is re-measured on curved, round-joined, triangular, C-shaped and holed faces: its comparison with NG's distributions on the same faces is the check of the adopted corner-first rule (the far-side fallback no longer exists), and `cut.flattenM` is calibrated there (J-A37.01); (c) the **fused-layout spike**: S4 routing + S5 growth + S8 infill on a flat synthetic site at CITY face counts; (d) the **determinism spike**: structured stream keys, lineage-hash minting, the Merkle digest, `dmath`, the time-dilation shim, the allowlist lint with its vendored scan; (e) the **site-and-fields spike**: S1 + S4 + S6 with §12.4's mechanisms; (f) the CI tiers timed on the runner (§13.8) | (a) B-FUZZ 0 crashes / hangs / invalid outputs on 10⁶ random inputs per primitive and on the whole constructive set (§13.1); insert + snap + attract + re-walk ≤ 8 µs per proposal, or §3.7's miss rule applied before M1; S11's geometry share ≤ 3 µs per plot median; §3.7's bars (i)–(ii) and §3.8's bar, with their pre-decided fallbacks applied before M1 if a bar fails; op-order determinism (§13.2); (b) σ — a measured output of step 2's position law, read in the frame NG's was measured in — within ± 0.02 of 0.066 (plain faces) and 0.098 (ring faces), corner within 0.10 of mid-course on ≥ 80 %, arrival ≥ 85° on ≥ 95 %, the fillet share within ± 0.05 of NG's (§13.5), block-area and cut-length KS by the band rule, and §13.2's T34-1 – T41-1 — on curved, round-joined, triangular, C-shaped and holed faces; (c) **the fusion gate**: S4 + S5 + S8 ≤ 100 ms at CITY, block-area and junction-degree distributions inside the NG bands on the same district shapes and the MFCG street-signature rows of §13.5, no turn cliff, 0 whole-map restarts on 1 000 seeds — if it fails, §4.4's fallback applies before M1; (d) digests identical on Node x86 / arm64, Chromium, Firefox and WebKit, workers on and off, 100 seeds; every stream key distinct; ≤ 0.1 µs per structured key; digest maintenance ≤ 5 % of stage time and a full recompute ≤ 150 ms at CITY; (e) S1 + S4 + S6 ≤ 50 ms at CITY, or §12.4's coarsening fallback applied and re-measured; (f) each CI tier inside its budget, or §13.8's fallback applied | 9–12 pw |
| **M1 — a viewable MFCG/FTG-class town** (the first product milestone) | S0–S11 with row / detached / hovel site plans and heights (compounds in M2b), at all three rungs (§1.1: METROPOLIS is in the goldens, B-CITY, the determinism tests and the diagnostic panel; M2b measures and tunes it); S3 reservations and gate sites; S5 with each trace before its stage's growth; S7 walls / gates / towers / castle; the eager allocation; S13a names with the quarter merge tree (quarter labels at the city band, district names at the district band); the `ink` preset at the city and district bands on the Canvas2D tile pyramid (its close-up and building bands at M2b); SVG / PNG export; **the `.plat` writer and reader for generated towns** (§2.9, §3.9) — the manifest, the content-addressed chunks with §3.9's geometry layout, gzip compression and an empty log — which the document-size test and the *preview* documents need and M2a's log builds on: a saved town of the running output version opens by decoding its snapshot and comparing its recomputed root with `model.digest` (M0's full recomputation), a differing root loading as a corrupt cache by regeneration from the recipe (§2.9 steps 3 and 5); **a document whose `outputVersion` is not the running one is never root-checked: it opens as §2.9 step 2's frozen view — each chunk checked by its content hash, the state decoded for view and export only, labelled "made with oK; not verified by this version" — with the offer to open its recipe under the running version and §6.4's preview notice; the `frozenImport` rebase arrives with M3a's rebases**; the records digest joins the snapshot at M2a, whose reader opens an M1 document of the running output version, which lacks it, by the same regeneration (§2.9 step 5); permalinks marked *preview* (§13.3); the report panel with delivery tiers; the B-CITY harness in the PR and nightly tiers; **the output-version stamp, the shift, cascade and milestone records in `plat/goldens/`, and the stage-isolated golden tooling with the per-stop placement digests (§13.3)**; `SeamContract` on every district; the derivation pool; the milestone-1 gate list of `docs/IMPROVEMENTS.md` §5.1 (O2, O6, O3, O11 schema + PNG / SVG, O1, O4, O5, O18 with a flat field, O17 basic, O8 basic, O12 ink, O16-core). **Named work items:** the M1 content, authored fresh — roster rows for the M1 classes, households, the naming grammar and word lists, the era table, the `ink` palette (≈ 3–4 pw of the estimate); the app shell — one click, basic panel, report, gazetteer and "features in view", the keymap, the accessibility contract, context-help skeleton (≈ 2–3 pw); **amendments b at M1:** the transient arena's open, read-back and release (§3.4), `RungProfile.layers` with `Features.sewers` resolved at S0 (§1.1, II.7.1), the emulation marker on every default cell and the parity presets `MFCG` / `FTG` (§7.6) (≈ 1 pw); **amendments c, d and e at M1:** the tier marker, the derivation table as an index and its totality bar (item 20 (h), §7.7); the `ink` palette on the owner-opened corpus targets with its measurement code (item 69, §8.2); `@plat/port` in the tests only — the `DossierDigest`, one SettlementForge adapter for the line `fp/integration-2026-09-23` and the creation half, the binding table's shape and key law, the `tables/dossier/*` rows, the typed circumstance slices, `Institution.powers` and `Assignment.state` as schema, the one-way seed and the inert-export bar, the ignore-list, the refusal below 1 500 — with the frozen dossier fixtures and B-DOSSIER-lite (items 73–86, §14, §7.7) (≈ 2.5–3 pw) | the **D-5 protocol's first run** (diagnostic, §13.6) with its threshold panel; on B-CITY-lite (200 seeds × 4 water settings): 0 tier-6 omissions of requested features and degraded ≤ 5 %, plots with access 100 %, population ± 5 %; **the fusion gate re-run on B-CITY-lite's river, coast and relief configurations with the reordered stages** — pre-decided fallbacks: on time, §4.4's class-boundary move (growth stops at district-scale secondaries everywhere; lanes infill-only), then the CITY model budget re-declared at the measured p95 as a D-18 amendment for the owner's veto; on statistics, the infill band table gains a slope class (face mean slope < 5 %, 5–15 %, > 15 %) calibrated on NG's faces, and the gate re-runs; model within §12.3 at TOWN and CITY with the pool measurement (§12.3's rule for which configuration is primary at each size — its p95 within the pooled law + 10 % at the band's bottom, target and top, below a single worker's on the same generations, digests identical for pool sizes 0–3 on 200 seeds — with that rule's pre-decided outcomes); the label-composition measurement (§8.9); the figure-ground metrics against MFCG's M-1 recoverability, contrast matrix, `ink` symbolisation census, label floors and counts and hairline fidelity (§8.3, §8.5, §9.4); B-ZOOM's role continuity across `ink`'s city → district switch; placement digests identical on Node x86 and in the nightly five-engine run; the walled share and extramural ribbon share in MFCG's band (§13.5); the between-seed dispersion against MFCG's and FTG's; the B-EDIT-lite identity fixtures (≥ 99.9 %); the document-size test (≤ 320 B per building at CITY) and the generated-town round trip — save → load → save byte-identical over the canonical form on B-CITY-lite's towns (§2.9); **a document saved by a test build labelled with an earlier output version opens as a frozen view with no mismatch message**; the control-continuity sweep; the parity report by the band rule; every district carries a complete `SeamContract`; the scripted tasks of §13.4 that M1 supports, keyboard-only included; the first-map, settle and re-raster runs at TOWN and CITY band bottom / default / top (§12.5); the model max clause at TOWN and CITY, judged on confirmed outliers (§12.3); the furniture and snap query round trip (§8.9); the sliced-raster census rows (§8.3); the pan-and-zoom run during an A2 export (§8.9, §12.7); the stamp-tile asset load (§8.10, §12.7); the stamp tiles' seam check (§8.3); the sliced-placement census row, and the export's placement stepped in class 4 during the pan-and-zoom export run (§8.3, §8.9); the pin-pass B-ZOOM fixture (§9.2); the harbour pick's measurement on B-CITY walled coastal seeds — p99 of harbour route ÷ the least-cost path with the wall ignored ≤ 1.5, and if it fails the detour guard becomes the default (§4.2 S3 (4), (7)); the SVG export's transient-list peak (§12.8); memory within §12.8's lines at TOWN and CITY on generated towns at pool sizes 0 and 3 (the load-verification case is M2a's); the font-feature test (§9.2); the SVG and PNG export budgets (§12.7); of amendments b's bars (§13.2): T13-1, T14-1 but its hidden-render clause (that clause at the network stage's intake), T16-4, T23-1's registry test; of amendments c, d and e's bars (§13.2): T43-1 – T43-5, T45-1, T46-1, T47-1, T54-1, T55-1, B-DOSSIER-lite green (T73-1 – T73-10) with item 20 (h)'s creation and totality bars on the fixtures, and the `ink` palette inside its corpus targets on the measurement render (§13.4, item 69) | 38.5–50 pw |
| **M2a — the editing core** (D-7: before the second preset) | the log and the one replay fold over M1's document format; locks and pins; scoped faithful regeneration; the named actions (Regenerate keep settings, Adjust with the fate report, New random, Same kind new seed); undo / redo as logged events with per-session stacks, the independence check and unshared truncation (§7.4); per-document sessions (§7.4); load verification over M1's reader — the load's recomputation of the decoded state's own digest and of its records digest before its first edit, then edits applied at once during load verification with both mismatch choices (§2.9 steps 3–4); **with the keep, §6.4's link rule that the base is the recipe, with its message — a link is emitted only for a town that rule and §6.4's log rules allow, and a rebased town, a kept saved town included, is offered as its `.plat` file**; replay with S13a per event (§7.3); dry-run validation with conflicts returned as actions; `setAttr`, `delete`, `merge`, `split`, `join`; the app's selection, context panel, lock and the keymap's pointer idioms; B-EDIT at 10³ (PR) and 10⁴ (nightly) with the oracle once per sequence; **amendment e at M2a:** item 101's T9 `shape` and T10 `hold` on the canvas with the dry-run report's ghost, count badge and variations (≈ 1–1.5 pw) | O9 (a), (b), (d); the oracle's (i)–(iii) green on 10⁴ sequences; a CITY district undo ≤ 30 ms; per-edit validation and fixed-scope edit cost flat within ± 20 % from TOWN to CITY (METROPOLIS joins at M2b, which measures it); "recover from a mistaken regenerate" in one undo; the verification reference mix within §12.6's V + 10 %; open-to-editable within T(B) at TOWN and CITY, and the corrupt-cache fixture — a snapshot with one moved footprint and an unchanged `model.digest` reported and loaded by replay, never verified (§2.9 step 3); the records-mismatch fixture and the §6.2 (iii) keep-and-save gating fixture (§13.2); **a `keptSnapshot`-rebased town's link refused, its `.plat` file offered (§6.4)**; on the reference 300-edit CITY document, an edit made 100 ms after the state becomes editable applies within its §12.6 cost + 10 ms with pool size ≥ 1 (§2.9 step 3); memory at CITY while that document is load-verified, with a district regeneration and a Re-derive from S3 applied during it, within §12.8's line at pool sizes 0 and 3 — or §12.8's fallbacks applied; the rebased-document size test — a CITY document rebased by keeping the saved town, after 20 edits, ≤ 1.25 × the unrebased document, or §2.9's block-group fallback applied; the first session of item 101's first-five-minutes test (§13.4) | 10–13.5 pw |
| **M2b — the base at parity** | the prosperity field with drivers and the brush; the full granularity law with the rung modifiers (§1.1) — joins, splits, alleys, back lanes, the deep-interior shares; S10b placement from the roster; compound site plans with the packer; roofs; S12 hinterland presets, greenery rules, outskirts and the suburb regime; harbour, bridges, canals; O13-core street names; O14-core; the bench statistics; **`lit` on Canvas2D at all four bands** with our procedural texture set (≈ 1 pw); **`ink`'s neighbourhood close-up and building band** with the roofs (§8.2); the relief tier; METROPOLIS measured and tuned, with the single-thread METROPOLIS measurement (§4.1), the compositor measurement (§8.9) and the projected-shadow budget measurement (§8.4). **Named work item:** the rest of the base content — the remaining roster classes, institutions, government and religion rows, the greenery and hinterland tables, the `lit` palette (≈ 4–6 pw); **amendments b at M2b:** the designation templates with specialisation and the one placement solver at generation with its relation rules and supply edges (§4.7 S10b, S11), the generation fill (§4.7; J-A28.46) within §2.6's one household capacity, with the programme rows' `circulation` share and the `room` form's least area it reads at the poorest band (§10.2), the default band set with the shanty rule and its median-household band (§4.5), the entrance set and the basement decision (§2.6) with the entrance-tick rows (§8.2, §8.3), exposure, the hidden-share rows and passages with the arch-glyph rows (§4.6, §8.2, §8.3), the `states` rows (§8.2), N markets with the principal-market score (§4.2), FTG's hinterland order and modes with the fuel and wood rows (§4.9) (≈ 3–4 pw); **amendments c, d and e at M2b:** a clandestine institution's front and hidden modes in the one solver, with the cover rows (item 63, §4.7); the day lighting model — the cursor sun, height-aware gradient shadows, the CPU reference light pass, its GPU accelerator and the fallback ladder — with `lit` (item 68, §8.4); informal clusters with derived tenure (item 70); the class mix inside a band (item 71); the district character, identities, the three dials and the band range with S12c, the step after S11 (item 72, §4.5); the dossier vocabulary's class rows beside the remaining base content (the port) (≈ 6–9.5 pw) | every must-have letter run on B-CITY (1 000 seeds) against its §13.5 or §13.7 band — no letter without a number; every §13.7 threshold due at M2b confirmed or its fallback applied, O19 (g) city-zoom greenery for `ink` and `lit` among them; per-edit validation and fixed-scope edit cost flat within ± 20 % from TOWN to METROPOLIS; B-ZOOM role continuity across every band switch of `ink` and `lit`; O17 / O18 / O19 runs; roster placed 100 %; site plans ≤ 5 µs per plot median; 300 dpi export; ≥ 60 fps at 40 k buildings; METROPOLIS first-map runs at 30 000 / 50 000 / 120 000 people (§12.5); the pool rule, the model max clause and the export-time peak at METROPOLIS (§12.3, §12.8); the query round trip at METROPOLIS (§8.9); open-to-editable within T(B) and memory within §12.8's line at METROPOLIS (§2.9 step 3, §12.8); the moving-sun step budget (§8.4); the light passes and the crown bake of a `path` sun in `lit`, with §8.3's light-step row (§8.4, §12.7); the `lit` export beside a moving `path` sun (§12.7); the METROPOLIS SVG budget (§12.7); the rung-profile orderings of §1.1; **the D-5 protocol passes** against MFCG (`ink`) and FTG (`lit`) at TOWN and CITY (METROPOLIS per D-31), or the owner's acceptance is recorded — unrated: *provisional — not rated*, and "the base at parity" is not claimed; of amendments b's bars (§13.2): T16-1, T16-2, T19-1 – T19-3, T19-4 but its dossier clause, T23-1's parity clauses, T24-1 – T24-3, T26-1 – T26-3, T27-1, T27-2, T29-1 – T29-4, T30-1, T30-2, T30-4, and §13.7's item-24 and item-30 thresholds confirmed or their fallbacks applied; S10b's scoring measured on B-CITY-lite and, if its pooled p50 exceeds 48 ms, restated with §12.3's p50 column (§12.4, J-A16.81); of amendments c, d and e's bars (§13.2): T44-1, T57-1 and the owner-rule bars of items 63 (placement and the public views), 68 (the day model, the GPU pass within §13.4's tolerance of the CPU reference), 70, 71 and 72 (at generation) | 42–55.5 pw |
| **M3a — full editing, migration and the API** | warp kernels with whole-step validation; drawn constraints and the "rebuild around my drawings" rebase; assignments and the placement solver; rule-table overrides, the preference layer and the tables editor; migration and upgrade as undoable events with their diff; rebase; **retention of output versions N−1 and N−2** (§6.4); the dependency audit with the locality oracle at full scale; B-EDIT 10⁵ in the milestone tier; the handle-based embedding API (§11.2); the host bridge and `DocResolver` (§11.3, §11.5); S1's water and terrain operators with re-sited crossings and exact re-basing (§7.3), the water operator in §4.11's order with course-knot edits (§7.3 (b)); point-anchored records under a warp (§7.4); the carve edit with §4.11's way rule and the kernel's clear regions (§3.3); the `packs` block and the pack and host-content link refusals (§2.9, §6.4); the naming-input re-draws on table, pack and upgrade edits (§6.3 case (4)) with their renames stored in the events and carried by `confirm`, the dormant naming record of a protected name and field slices; the version-pinned checks of a rebased base across an upgrade and of a frozen view; packs held by a saved redo stack and packs a new version stops shipping; GeoJSON; the app's drawing, warp, brush, assignment and tables-editor tools; **amendments b at M3a:** assignments through the solver after generation, the designation mutator with its record and inverse, `Use` with hand relocation (§4.7, §4.11), the dossier contract — dossier-backed existence, rejection, positive placement, the disruption budget and report (§7.7) — the wealth-ladder edit kinds `relet`, `densify`, `thin` and fusion and splitting as least-disruption re-cuts (§7.1), `relet` reading the household capacity M2b builds, every edit that lowers a capacity re-homing its excess by §4.7's overflow pass inside the edit (§2.6), and a dossier household's housing re-provided in its district (§4.7), and the interior ladder's rows (§2.6), sealing and opening a passage and the terrain-water conversions applied by hand; the plan rung's base hooks — its records, its `elaborate` view key, its `plan.*` concerns, its events and rung re-rolls, the elaboration cache (§2.6 beside §2.8's record, §2.9's cache, §6.1's streams and §7.1's events); the knowledge filter, key and reader with the exports' withholding (§9.2, §11.1–§11.3), `report.changed` (§11.3) and `live.stale` (§8.2) (≈ 7–8 pw); **amendments c, d and e at M3a:** a concealed use's parts filtered and withheld (item 63); the closure rule with the access edit and the basement's requested-mode ladder (item 66, §7.3); the "dossier-owned" refusal and item 20 (h)'s coherence rows; the port's absorb half — the diff against carried facts, `DossierChange`, the dating rungs, the receipt tables, re-binding on receipts, the epoch cadence, a host undo's convergence, `Assignment.state`'s behaviour, named-feature targets and the `notice` pin, bridge correlation (items 74–87); item 101's T2–T8 with the sugar events and the points forms, the skeleton file, the underlay and the clerk's tool API (≈ 5–8 pw) | O9 (c) faithfulness — Regenerate (keep settings) byte-identical, and §13.2's rank campaign for New random passing in the nightly tier (a failed campaign is re-run once with the next seed; a second failure is a regeneration defect, fixed before exit) — (e) and (f), the thirteen MFCG asks as scripted scenarios; §7.3 item 7 (v)'s coarse-edit assertions on B-EDIT's terrain and water sequences; the carve fixtures of §13.1–§13.2 (§3.3's clear regions), or §3.3's pre-decided fallback applied before exit; B-EDIT 0 planarity violations and 0 lost faces over 10⁵ sequences; O2 (c)'s carry-over rates, or §13.7's fallback; goldens replay under N−1 and N−2, each retained version ≤ 150 KB gzipped; the bridge convergence test (a host and three headless clients, 1 000 interleaved random events — undo and redo from every client and one owner undo through a chain among them, and one forced load mismatch settled by an owner's keep of the saved town while two editors edit on the replayed town — one digest, 0 lost accepted events; §11.3, §2.9 step 4); the naming-input fixtures of §13.2, in a fresh and in a rebased document (§6.3 case (4)); a link to a town with a non-shipped pack or host content is refused and its `.plat` file replays without them; a kept-and-rebased CITY document upgraded across a field-driver change opens editable and replays to the session's digest, and a frozen o(N−3) fixture shows no mismatch message; a document using a pack the new version stops shipping reopens after `from` leaves the window; GeoJSON loads in QGIS with districts; the GeoJSON with trees byte-identical on the five engines (§13.3); the warp cost measurement — a 150 m brush over a CITY core on B-CITY-lite seeds, Apply within §12.6's budget with §2.6's wing carry and check counted, or §12.6's pre-decided fallback (one check after the final step, F-REDERIVE for a failure) applied before exit; of amendments b's bars (§13.2): T16-3, T17-1, T18-1 – T18-4, T20-1, T20-2's dossier-event clause, T20-3 – T20-5, T20-6's refusal clause, T19-4's dossier clause, T22-1 – T22-4, T25-1, T28-9, T28-11, T28-12's `wings` clause, T28-16, T28-17's housing clause, T28-18's `relet` and re-homing clauses, T30-3, T30-5, T31-1, T31-4 – T31-7; of amendments c, d and e's bars (§13.2): T75-1 – T75-5 on the absorb pairs, the owner-rule bars of items 20 (h) (the refusal and the coherence), 63 (the knowledge filter) and 66, item 101's elegance bars (J78's fixture authored three ways) and the second session of its first-five-minutes test (§13.4) | 28–36 pw |
| **M3b — exports, forms and the should-have tiers** | VTT (Foundry-class scene JSON and dd2vtt, one scene per layer); glTF / OBJ; CityJSON; the CBOR twin with its decoder; S0–S4 proxy thumbnails; O10 intent expansion and the forms catalogue with its classifier; O13 full (path labels, addresses, the annotation layer and legend sheet); O14 full (rings, presets, wildness, feasibility); O16 full (drafts, discoverable export, the responsive editor); O12 extras (the low tier); the `@plat/docs` guide and generated release notes; three candidate `house` style sheets (D-1); the ink-family variants `parchment`, `bw-print` and `night` at all four bands (the `night` sheet's occupancy-driven window lights arrive with the module at M4b); random styles with the bounded repair (§8.2); **amendments c and e at M3b:** the night view in every family, the placed lights by their rule table and the exports' lights (item 68); item 101's T11 leader-line switch and region groups and T12's furniture, with every export's declared, derived and clerk-proposed provenance (≈ 2–2.5 pw) | VTT import with no manual steps; every format validator green; scripted intent tasks 10 / 10; the forms classifier ≥ 90 %; six thumbnails < 1 s at TOWN; every scripted task of §13.4; monotonicity sweeps green at every rung; documentation coverage 100 %; B-ZOOM role continuity across every band switch of the ink-family variants; the random-style shipped-palette fallback ≤ 2 % of 10 000 draws per family (§8.2); the anchored CityJSON file validated with PLAT's extension, or the sidecar fallback taken and reported (§11.1); of amendments b's bars (§13.2): T29-5; item 68's night bars (every street class × band at its target minimum brightness, hidden plots unlit) and its exports' lights | 18–23.5 pw |
| **M4 — hardening and the incremental path** | the performance tiers and the low-end tier measured on the named device (§12.1); the table-provenance audit, every default cell's `ref:` source and every extension's `extension` marker included (§7.6, §17.1 (6); item 23); **the one incremental path: add a growth stage to an existing town** (surviving entities byte-identical, new entities on epoch components, wall → ring road as `retypeEdges`; §4.11, D-25); output version 1 fixed, ending the *preview* label; release notes naming known defects; **the D-5 protocol's "mastered" run**, with the owner's pick among the three `house` sheets (§13.6 (8)); **amendments b at M4:** the staged engines' hooks — the decline table, the salvage ledger and the dwell lag, the regrowth-first siting order on the grow path, the tunnel and island conversion kinds with the underground tools `drawTunnel` and `placeAccess` (§7.1), S7b (5)'s island count draw and sky allocations under II.6's supply law, the terrain-water kinds, the due mark and the wealth ladder table, the floor's attributes with their migration, the lapse of a rejection at an epoch and the relocation of a dossier-backed use inside an epoch (§4.11's *Dossier content across epochs*, J-A20.43) — with their hook tests (§4.11, II.6 and II.7, with the migration of §7.5) (≈ 2–3 pw); **amendments c and d at M4:** the underground layer's hooks — basement accesses with their state and knowledge, the systems' records and parts, their links, the undercity's rung bound and `raiseGrade` (items 64, 65) —, the Works record, `WorksTable`, the week and the stage drawing rows applied by hand (item 67), the character's recomputation, renames past the hysteresis and the pressure at an epoch (item 72), the lapse past the roster tolerance and the rung read at each epoch (items 76, 81) (≈ 3–4 pw) | nightly cross-platform goldens green for two weeks; the epoch test (0 re-rolled survivors); a document with interleaved edits and two epochs replays to the session digest; the conversion test; the 20-epoch heap and document budgets (§13.2); METROPOLIS first map within §12.5's law at 30 000, 50 000 and 120 000 people; "mastered" claimed only when the D-5 protocol passes, rated, at all three rungs (METROPOLIS per D-31) or the owner's acceptance is recorded — unrated: M4 closes with "mastered" *provisional — not rated* and the panel offered again at M4b, M5 and every release; every table value replaceable with provenance; of amendments b's bars (§13.2): T8-1 – T8-7, T10-1, T11-1, T12-1, T15-1, T17-2, T17-3, T20-2's epoch clause, T20-6's epoch clause, T31-2, T31-3, T31-8 – T31-12; of amendments c and d's bars: the hook fixtures of items 64, 65 and 67 and 72's epoch clauses, T20-2's tolerance clause and item 81's frame growth | 16–23 pw |
| **M4b — the content module `@plat/sim`** (after the relation store's schema, which is in the base from M1) | the relation store materialised (family units, relations, memberships); postings and re-matching; occupancy and schedules as a query; the calendar; factions with roles, goals and reconciliation; religions' meetings; events as templates; the economy and personality content of D-32 with its authored tables; the family-tree view | O7's module letters (§15.2); one hour for 50 000 people ≤ 50 ms (§12.7); a scoped regeneration changes 0 relations outside its scope; the family-tree view keyboard-operable and pins nothing | 8–14 pw |
| **M5 — stage 2: neighbourhood composition** | `@plat/hood`: `RingFabric`, `SquareFabric`, `StreetFabric`; the block-content dispatch table and pins; the `hatched` family at all four bands (§8.2); the close-up workflow on any district and on an arbitrary boundary (sky context); the "same kind, new seed" per-district workflow with locks | every district of every B-CITY city opens as an NG-class close-up; portals connected 100 %; shared-edge geometry byte-equal across adjacent neighbourhoods (Hausdorff 0); per-district regeneration ≤ 30 ms and open ≤ NG's 10–96 ms at comparable counts; footprint hash identical to city LOD; every stage-2 letter of §15.2 (S1–S6) run against its number, S4 (d)'s §13.7 band confirmed or its fallback applied; B-ZOOM role continuity across every band switch of `hatched`; the stage-2 gate claimed only when **the D-5 protocol against NG** (twenty pairs over the four templates, §13.6 (2)) passes, rated, or the owner's acceptance is recorded — unrated: M5 closes *provisional — not rated* and the panel is offered with every release until it is rated | 14–18 pw |

**Effort, with its basis (D-20).** Re-derived line by line (PLAUSIBLE; each line a range with its basis):

| line | pw | basis |
|---|---|---|
| parity floors after sharing: (MFCG 46 + FTG map subset 52) × 0.65–0.75 | 64–74 | `docs/CONFIDENCE.md` §1; sharing the kernel, the display list and the document removes 25–35 % of the two floors, not 50 % |
| O1 terrain and hydrology beyond the references' water | 4–6 | priority-flood, D8, rivers by descent, coast–terrain coupling, islands, distributaries, bank classes |
| O9 document and edit system (events with inverses and undo records, dry run, locks, scoped regeneration, the named actions, rebase, migration with diff, retention, the locality oracle, B-EDIT) | 12–16.5 | neither reference has it; amendments b: the `Use` record and hand relocation, the plan rung's base hooks, the wealth-ladder edit kinds and the regrowth-first order of the grow path (+2); amendments c–e: the closure rule and the access edit (item 66, +0.5), the sugar events, the points forms and declared-means-held (item 101, +0.5–1) |
| O12 renderer beyond the floors (columnar display list, paint programs, tile pyramid and tile worker, label composition, SVG, print bands, `lit` on Canvas2D, the relief tier) | 7–10.5 | one drawing path; no second backend; amendments b: the `states` rows, the entrance-tick and arch-glyph rows and `live.stale` (absorbed); amendments c–e: item 68's lighting model — the day model with the cursor sun, the CPU reference light pass, its GPU accelerator and the fallback ladder (+2–3), the night view in every family (+0.5–1) —, item 101's leader-line switch and region groups (+0.5); items 54's class ratios and 55's horizontal spine absorbed |
| O11 exports and interop beyond PNG / SVG / GeoJSON (VTT × 2 per layer, glTF / OBJ, CityJSON, CBOR, CSV, the handle API, the host bridge and resolver) | 9–12 | §11; amendments b: the knowledge key and filter with the reader's and every export's withholding, `report.changed` (+1); amendments c–e: the host-input contract made concrete by the dossier port (+1 at M1, +0.5–1 at M3a), the skeleton file and the clerk's tool API (item 101, +0.5–1), the exports' lights (item 68, +0.5), a concealed use's parts withheld (item 63, +0.5) |
| O17 + O18 + O19 (plot model, site plans, packer, heights; the field and the granularity law; greenery rules) | 13–20 | new in both references; amendments b: the designation templates and the compatibility table, the band set, the entrance set and basements, exposure, the hidden shares and passages, and O14-core's farmland modes, fuel and timber rows and arable reserve (+3–4); amendments c–e: informal clusters (item 70, +1–1.5), the class mix inside a band (item 71, +0.5–1), the district character, identities, dials and band range (item 72, +1.5–2.5); the plot, wall and field rules read in code (items 42–47, 57) absorbed |
| O10 (intent expansion over ≈ 200 parameters, the forms catalogue, assignments, the placement solver) | 10–14.5 | forms tuned by eye and the D-5 panel; amendments b: the one placement solver with its relation and supply data, the designation mutator, the dossier contract (+4–5); amendments c–e: fronts and concealment in the solver with the cover rows (item 63, +0.5–1), the tier marker, the derivation index and the refusals (item 20 (h), +0.5–1), the port's absorb half on the dossier contract (+1–1.5) |
| should-have "full" tiers (O13, O14, O16, O12 extras) | 4–6 | §15.2 should rows |
| original content under the clean room (≈ 60–100 roster classes, institutions, households, government and religion rows, naming grammar and corpora, era tables, presets, the symbol set, the procedural textures) | 10.5–14.5 | ≈ 40–50 % of CONFIDENCE's 25 pw FTG content line (§3.4's re-pricing), plus presets and symbols; amendments b: the parity presets and the marker on every default cell, the relation templates', room programmes' and interior ladder's rows (+1); amendments c–e: the `ink` palette on the owner-opened targets (item 69, +0.5), the light rows (item 68, +0.5), the dossier vocabulary's class rows (the port, +0.5) |
| `@plat/sim` (relations, postings, schedules, calendar, factions, events, economy and personality) | 8–14 | inside FTG's 125 − 52 = 73 pw non-map scope; the relation schema already in the base |
| the reference app's UI (panels, drawing and snapping tools, four field brushes, the tables editor, the style dialog, the advanced panel over ≈ 200 documented parameters, accessibility, context help, keymap) | 8.5–12.5 | no reference line covers it; amendment e: the twelve tools with the ghost, the count badge, the variations and first-use hints, the handles and the underlay (item 101, +1.5–2.5) |
| the verification rig (five benches in three CI tiers, stage-isolated goldens with shift and cascade records, the five-engine nightly run, visual regression, the option matrix, control and cost-model sweeps, `baselines.json`, the clean-room scanner, the D-5 tooling) | 9.5–13 | §13; amendments b: the hook, B-PLAN and underground fixtures and the parity-preset run (+1); amendments c–e: the dossier fixtures and B-DOSSIER-lite (+0.5–1 at M1), the absorb pairs (+0.5 at M3a), the toolkit's elegance fixtures and first-five-minutes sessions (item 101, +0.5); the bars of items 33–62 absorbed |
| mechanisms the lines above do not price (booleans and bands on the arrangement, the derivation pool and its merge, the eager allocation and reservations, per-frontage regions and wings, the label placement engine; the six components below) | 12–17 | 5–7 for the first group; 3–4 (≈ 14–22 working days) for the six components itemised below; amendments b: the transient arena and the M4 hooks (+1–2); amendments c–d: the underground's hooks (items 64, 65, +1–1.5), the Works record with its table, week and drawing rows (item 67, +1–1.5), the character at an epoch (item 72, +0.5), the lapse threshold and the rung at an epoch (items 76, 81, +0.5) |
| **base subtotal (M-1 – M4b)** | **171.5–230.5** | |
| stage 2 (M5) | 14–18 | |
| **total** | **185.5–248.5** | equal to the milestone sum above (J-A16.01; J-A63.05, J-A73.05, J-A101.05) |

**The six new components** priced by the last line's 3–4 pw (≈ 14–22 working days; PLAUSIBLE): the per-name naming
records and the renames an edit confirms (§2.8, §6.3, §7.1; M1 writes the records, M3a stores the renames), ≈ 3–4
days; `carryWings`, the carry of a stored composition and the wing check decided by pairing (§2.6; M1 in generation,
M3a under warps), ≈ 4–6; crossing sites as a `Bridge` in state `site` and their handling in S1's water operator (§2.7,
§7.3 (b); M1 and M3a), ≈ 2–3; resumable raster jobs, S13b as a resumable placement job and the tile worker's four-class
queue (§8.9, §9.2; M1), ≈ 3–5; the records digest (§6.2; M2a), ≈ 1–2; the shipped stamp-tile asset, with its shared
seam band, and its build tool `plat/tools/stamptiles/` (§8.10; M1), ≈ 1–2 days. The other mechanisms of the same kind
are refinements a line already prices, absorbed by that line (PLAUSIBLE): the load's digest recomputation, its
corrupt-cache path, the version-pinned root checks and the keep-and-save gating (the O9 line's load verification); the
pack held by a saved redo, the pack copy at an upgrade and the link refusal for a kept town (the O9 line's retention and
migration); demotion, `StretchRef`, tombstones per partition, the water-gate hold and the deck strip (the parity floors'
kernel share and the arrangement work); the forced harbour pick and the detour guard (the parity floors' gates and
harbour); the pin pass (the label placement engine); and the integer-centimetre tree positions with their lint, the
PNG row-filter rule and the quantised light steps with their light pass (the O12 renderer and O11 export lines). The
milestone rows carry the six components where they are built — M1 + 2 / + 3 pw, M3a + 1 / + 1, M2a unchanged — so they
sum to the total. **A pass that adds build work prices it here:** it names each new mechanism with the line that
absorbs it, or widens a line by an itemised amount and keeps the milestone rows equal to the total. **Amendments b (2026-09-25 to 27)
are priced that way (J-A16.01):** +13–16 pw itemised in the lines above — O10 +4–5, O17 + O18 + O19 with O14-core +3–4, O9 +2, O11
+1, the content line +1, the rig +1, the unpriced line +1–2, the `states`, entrance-tick and arch-glyph rows and
`live.stale` absorbed by the O12 line — carried by the milestone rows M1 +1 / +1, M2b +3 / +4, M3a +7 / +8 and
M4 +2 / +3, so the rows still sum to the total; the staged engines themselves — evolution,
the sewer and underground stages, the plan rung, SettlementForge's mapping — are not priced, by the roadmap.
**Amendments c, d and e (2026-09-27 to 28) are priced the same way** — +19.5–28.5 pw itemised in the lines above:
the owner's rules of items 63–72 and 20 (h) +11.5–17 (item 68's lighting model 3.5–5 of it; J-A63.05), the dossier port
of items 73–88 +4.5–6 (its plan's line-by-line estimate; J-A73.05) and the authoring toolkit of item 101 +3.5–5.5
(J-A101.05) — carried by the milestone rows M1 +2.5 / +3, M2a +1 / +1.5, M2b +6 / +9.5, M3a +5 / +8, M3b +2 / +2.5 and
M4 +3 / +4, so the rows still sum to the total. The code-reading items 33–62 restate mechanisms the lines already price
— each one a rule, a row of a table or a test within a stage the design already has — and add nothing. Their staged parts — the
underground systems' engines, the evolution engine that schedules Works, the port's host wiring and the realm block's
supply, the behaviour of item 88's staged records, the built-in clerk and plots on a bridge deck — are not priced, by
the roadmap.

The cuts that would shrink the total are recorded for the owner's veto, not applied (J-S6, D-20): the module M4b
(8–14 pw); VTT, glTF / OBJ, CityJSON and the CBOR twin (≈ 3–5 pw); all but three forms (≈ 2–3 pw); the should-have
"full" tiers (4–6 pw) — together a base of ≈ 154.5–202.5 pw and a total of ≈ 168.5–220.5 pw.

The riskiest items, in order: the fusion timing and statistics on real terrain (M0 c, M1); the bent-cut engine on
concave and holed faces (M0 b); the kernel's own booleans and bands (M0 a; §3.7's pre-decided fallback); the straight
skeleton's robustness (M0 a); the content authoring cost (M1, M2b, M4b — CONFIDENCE §3.4's re-pricing is the warning);
the thin CITY budget headroom (§12); the lighting pass's frame budget under a moving cursor sun (M2b; §8.4's fallback
ladder answers it); the D-5 protocol's dependence on the owner's time (§13.6 (7) answers it: an unrated panel never
stops the build and never lets a gate be claimed).

**Staged by the owner:** the subjects the owner's roadmap places after the base — stage 2 at M5 above, the others staged
by the owner — each with concrete hooks, are the one list in *Staged by the owner's roadmap*; nothing else is out of
scope — CityJSON is built (§11.1), the host-input contract is decided (§11.4), sharing needs no hosted service (§11.5),
setting packs have their format (§10.4), there is no WASM kernel (§3.7), and the relief tier is a base program (§8.2); amendments b's staged engines — the evolution engine's trigger and durations, the
sewer and underground stages, the plan rung and SettlementForge's dossier mapping — are on that list, their hooks priced above;
so are the staged parts of amendments c, d and e named in the pricing paragraph above.

=== REPLACE # Delegated decisions (the owner deferred all judgment; each is final unless vetoed) ===
# Delegated decisions (the owner deferred all judgment; each is final unless vetoed)

Each decision is final unless the owner vetoes it. One paragraph each: the choice (its mechanism lives in the section
named), the alternative rejected and the cost of reversing it later; the plain-words rationale of each is in
`docs/ARCHITECTURE-RATIONALE.md`. D-1–D-7 are the owner's adopted defaults (amendment 7), each tied to its mechanism.
Decisions marked *owner veto* touch a subject the owner keeps (a purchase, the licence, new capability): the program has
taken the most option-preserving default and flags it.

**D-1 — the look.** The default look is clean ink (MFCG family) with IM FELL Great Primer as the label face (§17.2); the
second preset is FTG-like `lit`, on Canvas2D like every preset; a hatched preset serves the close-up (§8.2). The house
style is our own third preset `house`, drafted as three candidate style sheets at M3b and chosen by the owner on the
§13.6 panel at M4, `ink` staying the default unless the owner picks otherwise; with no pick by M4's exit, §13.6 (8)
applies. The look's values follow the corpus palette bands the owner released on 2026-09-27 — a warmer paper, a
brown-black ink and a little more colour, every shipped family inside its targets (§8.2, §13.4; item 69; J-A69.05); the
look stays clean ink in MFCG's family. Rejected: `lit` as the default; a WebGL2 reference backend for `lit` — the
lighting of item 68 leaves that rejection standing: its CPU light pass is the reference and the GPU only accelerates it
under a moving cursor, drawing no mark (§8.4, §8.9; J-A68.05). Reverse: low (a style file).

**D-2 — era and region.** The centre of gravity is high-to-late medieval Western Europe (12th–15th c.), as presets the
corpus phase re-signs through §13.9; walled shares and stage rows per rung are MFCG-calibrated (§1.1, §4.2 S2), and FTG's
lower walled share is reachable as a preset; the regional material shift (§2.6's `regionalShift` rows, off by
default, texture and colour only) is one of its region presets (item 19). Rejected: a hard-coded culture; a 0.35–0.5 walled share (MFCG's shanty
case). Reverse: low (table rows).

**D-3 — realism in the base.** Fantasy exists only as named toggles, each off by default: floating islands and their
conjured rivers — a model setting `recipe.layers.islands`, off by default, that exists only at CITY and METROPOLIS and
only where prosperity supplies it, the sky layer's view toggle showing islands and never creating them (II.6, items 10,
13 and 15; J-A10.01); the `navigable` sewer preset (II.7.2) — the historical sewer network is realism, present by tier
and hidden until its toggle (II.7.1, item 14); the game-system stat pack (D-32); magical lights, which exist only under
the S0 circumstance `magic` (`none` by default, item 68) — torches, lanterns and braziers are realism, and the night view
is a view choice, never a toggle of the model (§8.4; J-A68.05). The underground's other systems are realism by rule —
catacombs, caverns, quarries, vaults and a buried old town, hidden with the underground layer — and the undercity exists
by rule as a modest warren under the sewer's `historical` preset and at the owner's full microcosm, one to three
neighbourhoods by rung, only under the `navigable` preset (II.7.5, II.7.6; item 65; J-A65.43). Rejected: fantasy
defaults. Reverse: low.

**D-4 — the product shape.** A browser-first embeddable TypeScript library with an app on top; permissive dependencies
only (§17.4's checker over the production closure); one generation worker, a derivation pool and a tile worker behind a
handle-based API (§1.7, §11.2). Rejected: a Rust / WASM core from day one; server-side generation. Reverse: medium after
M1 for the core language — a measured hot loop may get a byte-identical WebAssembly accelerator (§3.7), there is no
WASM kernel; low for the worker model.

**D-5 — "mastered".** The owner's eye on side-by-sides against MFCG and FTG at town, city and metropolis, run through the
written blind protocol of §13.6, plus the parity numbers of §13.5; an unrated panel lets the build continue with the
milestone's D-5 status *provisional — not rated*, and "at parity", "mastered" and the stage-2 gate are claimed only by a
rated pass or the owner's recorded acceptance (§13.6 (7)). Rejected: numbers only; an eye with no protocol. Reverse:
none.

**D-6 — naming.** Original English-fantasy naming; setting packs in §10.4's format, the base shipping one pack; further
packs are data. Rejected: reuse of reference corpora. Reverse: low.

**D-7 — weighting.** Realism, editability and plot texture first; speed and export next; novelty last — and the
weighting orders the build: the editing core (M2a) before the second preset and the rest of parity (M2b) (§16).
Rejected: speed first; editing after the lit look. Reverse: none.

**D-8 — 3-D export.** glTF 2.0 (OBJ secondary) and CityJSON 2.0 (§11.1). Rejected: CityJSON left for later. Reverse: low (an
exporter).

**D-9 — no restart path.** "No restart path" is a design property; the acceptance numbers are requested-feature delivery
by ladder tier and p95 time per delivered town on MFCG's worst configurations, with their bars in §13.5. Rejected: "0
whole-map restarts" as the number; a p99-bounded restart tier. Reverse: low (criteria).

**D-10 — simulation depth.** The base holds the roster, the context vector, allocation and placement, households and
lazy people, and the relation store's schema from M1; schedules, calendar, factions' meetings, events, economy and
personality are the optional `@plat/sim` module at its own milestone, M4b (§10.1). The base's three dials read the
dossier's — or, standalone, the recipe's — sector shares and power standings as field drivers (§4.5, §7.7; items 72,
78, 79) and never model an economy (J-A72.05). Rejected: schedules and the calendar in the first release; the module
inside M4. Reverse: low.

**D-11 — scatter.** Poisson-disc k = 50, all candidates evaluated, drawn from the thin ring between r₀ and 1.1 r₀, the tile wrapping at its edges — the references' sampler as read in their code (P14; `poisson.annulus`, Bridson's [r₀, 2 r₀] the alternative value) —, builds the per-class ranked tiles once, when the
product is built; per-instance placement is the stamp (§8.10); a measurement (NN p1, pair-correlation) may relax k.
Rejected: k = 30; per-entity Bridson sampling. Reverse: trivial (a table value).

**D-12 — coordinates.** Integer centimetres centred on (0, 0), +y north, under §3.2 (1)'s range invariant. Rejected:
millimetres; doubles. Reverse: high after M1.

**D-13 — the plat.** Five refinement levels as views of one arena per layer (level-tagged edges, per-level face
records), a separate arena per layer and per sky island, unions for multi-face entities (§2.2). Rejected: one flat
subdivision; five separate per-level DCELs (nesting cannot hold on the lattice). Reverse: high after M1.

**D-14 — geometry engine.** Booleans, buffers and bands on the kernel's own arrangement — one engine on every host, with
the oracles and the one pre-decided fallback of §3.7; the straight skeleton built in-house under §3.8's contract and
validator, its downgrades the default paths. Rejected: CGAL (GPL); a JS skeleton port; a runtime pure-JS boolean
fallback (a second engine, different digests). Reverse: low (adapters).

**D-15 — streams.** xoshiro128\*\* streams keyed from §6.1's structured components, the lineage separate from the
address id, concern ids append-only; Enter makes a new document with the successor seed of §6.1. Rejected: one global
stream; a counter-based RNG. Reverse: high after M1.

**D-16 — the fused layout.** Routed arterials between named destinations; reservations and gate sites at S3 and each
enceinte traced before its stage's growth; inside the walls district-scale secondaries plus NG 1.2.2's bent-cut infill,
its mechanism restated in our metric terms (J-A33.01), outside them FTG-shaped growth with explicit legality and stage
regimes; districts grown over the coarse skeleton at MFCG 12710731's per-kind growth rates, typed feature-named before
placement and, after it, named and described by the identity their lots, powers, trade and economy give them (item 72;
J-A72.05), and grouped into quarters; frontage-first plots with the granularity law (§1.4, §4).
Rejected: the four rejected shapes of §1.4; FTG growth down to block scale inside the walls. Reverse: high (the layout
core) — hence M0 and M1's fusion gate.

**D-17 — the enceinte.** Gate sites picked and castle and plaza reserved at S3; stage 1's enceinte traced at S3 from the
travel-cost boundary over its solved gate routes, each later enceinte at S5a from its stage's boundary, both pulled to
defensible ground before that stage's streets grow; gates exactly at arterial crossings with exact N by the measured
gate law with its waterfront reduction (item 46); gate plazas; the castle by score with the inside / on-enceinte / outside option; an open waterfront by
default (§4.2 S3, §4.4, §4.8). Rejected: a wall on cell edges; tower-per-vertex; walls traced after growth. Reverse:
low.

**D-18 — budgets as laws** (*owner veto on the misses above the knees*). Model and first-map budgets are per-rung laws of
the building count (§12.3, §12.5), read over every size of a rung, with the derivation pool primary wherever §12.3's rule
keeps it and the single worker as the pre-decided fallback elsewhere; the max clause is judged on outliers confirmed by
solo re-timing (§12.3); the one-click path stays complete at every size; the per-building cost against MFCG is a
declared trade (§12.9). The owner may veto the two declared misses: O3 (d)'s model bars above the sizes §12.3 states,
and O12 (g)'s first-map bar above the knee §12.5 states. Rejected: workers assumed without a merge protocol; matching
MFCG's per-building cost by dropping plot detail; a preview or a coarser one-click path above the knee. Reverse: low
(numbers); ≈ 1 pw for a district-by-district city band above the knee; medium (architecture) if M0 or M1 miss.

**D-19 — defaults and calibration anchors**, all data that costs nothing to change: the codename PLAT and `@plat/*`; the
terrain resolution per rung (§2.3); frame areas, aspect and margin (§1.1, §3.2 (9)); the minimum edge, the attraction
distance, the minimum plot width and angle (§3.2 (2)); the district band from the count law (§4.5); the gate law with
its waterfront reduction (§4.2 S3); stage counts and walled shares per rung (§1.1, §4.2 S2); the day view by default with
the cursor as its sun — the owner's rule (item 68) — and a fixed sun where there is no pointer, which families cast
shadows by default being §8.4's ruling (J-A68.81), put to the owner (§0.2's item-68 row; J-A68.05); heights always populated (§2.6);
tower spacing and every band as calibratable table rows (§7.6). Reverse: trivial (data).

**D-20 — effort.** ≈ 185.5–248.5 expert person-weeks — the base 171.5–230.5 (the content module included) plus stage 2
14–18, re-derived line by line in §16 (amendments b's +13–16 pw itemised there, J-A16.01; amendments c, d and e's
+19.5–28.5 pw, J-A63.05, J-A73.05, J-A101.05); the cuts that would reduce it to ≈ 168.5–220.5 are recorded for the
owner's veto, not applied (§16). Rejected: 100–130 pw; cutting scope to
hold it. Reverse: none (an estimate).

**D-21 — the document.** A base (the recipe, or a rebased state) and the ordered log, with a digest-verified snapshot
cache; one replay fold; a rebase when a saved state is kept; output versions N−1 and N−2 retained in the browser and
every version in the CLI; an upgrade is an undoable event (§2.9, §6.4, §7.4, §7.5). Rejected: events only; "the last N
minor versions stay replayable" with no mechanism. Reverse: low.

**D-22 — our own licence** (*owner veto*). Proprietary, all rights reserved to the owner, until the owner chooses
(§17.3); no dependency may constrain the choice. Rejected: leaving it undecided; an open licence by default. Reverse:
low (a licence file) until code is published.

**D-23 — deterministic maths.** Transcendentals through `dmath`, our TypeScript port of the fdlibm 5.3 routines with
Sun's notice, under §6.5 (3)'s allowlist lint, which also scans vendored dependencies (§6.5 (4)). Rejected: in-house
polynomial approximations; trusting the engine's `Math.*`; the `@stdlib` packages. Reverse: low (one adapter and one lint
rule).

**D-24 — goldens.** Stage-isolated goldens (new stage code on frozen upstream outputs), built at M1; end-to-end goldens
re-signed only with a cascade record; every milestone files its declared shifts; a same-seed output change is never let
ride silently (§13.3). Rejected: one whole-model hash per seed; goldens at M4. Reverse: trivial (test tooling).

**D-25 — the evolution hook.** Exactly one built and tested incremental path in the base — add a growth stage to an
existing town, with wall → ring road as a typed conversion — plus the epoch key component and the transformation-event
vocabulary — the decline ladders of buildings, walls and tunnels with the salvage ledger and the regrowth-first siting
(item 8), the island kinds (items 10, 13), use relocation and the designation mutation (items 17, 18), the wealth ladder
with the built band, the geometry floor and the manifested band (item 31), the interior ladder, the dwelling unit and the canonical prior
(item 28 (f)), rejection and positive placement (item 20), fusion and splitting as edit kinds, the terrain-water kinds
(item 25) and the sealing and reopening of passages (item 30) — every kind usable by hand in the base and undoable;
since the amendments of 2026-09-27 also the `Works` record that shows a change on the ground mid-way over its weeks, with
its `WorksTable`, its stage derived at any week and its drawing rows (item 67; §4.11; J-A67.41), and the access edit
whose closure rule generates the pieces it needs (item 66; §7.3 item 9; J-A66.71); the evolution engine, which
schedules them from circumstances on the weekly clock, is staged by the owner with its interfaces concrete (§4.11,
II.6, II.7).
Rejected: no incremental path; the full engine now. Reverse: low.

**D-26 — identity.** Opaque lineage-hash addresses with survival and succession (§6.3). Rejected: hierarchical
creation-order ids; a per-kind counter. Reverse: high after M1.

**D-27 — work limits.** Work limits, never wall clock, bound every output-affecting budget (§5.1). Rejected: wall-clock
watchdogs. Reverse: low.

**D-28 — the model digest.** A Merkle root over the eager model's content only, maintained at batch commit (§6.2).
Rejected: hashing the canonical serialisation per batch. Reverse: high after M1.

**D-29 — the clean-room chain** (§17.1): implementers read only this document and a checked implementer digest —
research seats may, since 2026-09-27, also read the captured bundles to understand them, the implementers' inputs
unchanged (§17.1 (1); J-A32.01); the
product in its own repository `plat/` with a path rule; reference numbers only through the committed files of §17.1 (4);
a hashed content deny-list scan in CI and a palette audit per milestone; reference-derived constants labelled by
origin; a seat ledger in `CLEAN-ROOM.md`. Rejected: findings and captures as implementer inputs; path-only CI rules.
Reverse: low (process) — in place before M0's code.

**D-30 — thresholds.** Every threshold has a number now: reference-settable bands by §13.5's band rule from
`baselines.json`; the thresholds no reference can set in §13.7, each with a provisional number, the first milestone that
confirms it and a pre-decided fallback; no placeholder can gate or pass. Rejected: placeholders set by the corpus phase.
Reverse: trivial (data).

**D-31 — matched references** (*owner veto*). TOWN = MFCG size 40 and FTG BIG_TOWN (≈ 5 600); CITY = MFCG size 80 and
FTG BIG_CITY (24 500); METROPOLIS = MFCG size 130. FTG's premium METROPOLIS is not purchased: the METROPOLIS side-by-side
uses MFCG 130, with FTG's published metropolis pictures as an unscored reference card; a one-month premium FTG
subscription for one measured capture is the owner's option. Rejected: a CITY-only FTG comparison; a purchase by the
program. Reverse: low (one capture day if the owner buys).

**D-32 — economy, personality and stats** (*owner veto: new capability rather than repair*). Economy (resource chains,
items and services with prices, stock per building, global price edits), personality (trait sentences, motivation,
mannerism, hobbies), education gated by class and a stat block with profession modifiers are `@plat/sim` content
(M4b), derived from their keys with our own authored tables; their schema stubs are in the base (§10.3); the stat block
is a named game-system pack, off by default (D-3); the family-tree view is in the app (§14). Rejected: leaving them
unrecorded; putting them on the one-click path. Reverse: low (module content; dropping it removes ≈ 2–4 pw from M4b).
Amendments b split it (J-A16.44): the resource and supply edges placement reads and S2's need propagation are base data
(§10.2, §4.7 S10b); prices, stock and trade stay module content. Items 72, 77 and 78 keep the split: the dossier's or
the recipe's sector shares and trade partners are read as they are — by the economy dial and by the gates' and ways'
trade weights (§4.3, §4.5) — and never priced, stocked or exchanged (J-A72.05).

**D-33 — the two ladders.** They meet at 1 500 inhabitants; size within a rung follows population; per-rung rows live in
`ladder.json` — the `layers` rows of items 13 and 14 among them (J-A13.01); requests below and above the ladder are routed or
clamped as §1.1 states — a dossier below 1 500 people is refused by the port, naming the village product (§7.7;
item 81, J-A81.71). Rejected: an undefined
boundary; a 2 000 floor leaving a gap below the base. Reverse: trivial (data).

**D-34 — CI tiers.** Three tiers with wall-clock budgets (PR ≤ 15 min, nightly ≤ 4 h, milestone ≤ 12 h) on a stated
runner; the oracle once per sequence; an over-budget job is split, never re-capped (§13.8). Rejected: one full run per
change. Reverse: trivial.

**D-35 — build order.** M-1 → M0 → M1 viewable town → M2a editing core → M2b parity (the second preset; METROPOLIS,
which generates from M1, measured and tuned) → M3a full editing, migration and API → M3b exports, forms and should-have
tiers → M4 hardening and the incremental path → M4b the content module → M5 stage 2; nothing leaves the program (§16).
Rejected: the lit look before editing; moving exports, forms or the module out of the program. Reverse: low (a plan).

=== REPLACE # Appendix A — reading record, and CONFIRMED versus PLAUSIBLE ===
# Appendix A — reading record, and CONFIRMED versus PLAUSIBLE

**Reading record.** The design seats read the three proposals and the three judge reports in full, and
`docs/IMPROVEMENTS.md` and `docs/CONFIDENCE.md` by outline plus the sections their records name; no design seat read a
reference source or a captured bundle (by ruling), and every findings fact in this document is cited through a file
that read it in full. Since 2026-09-27 research reader lanes have also read the captured bundles to understand them
(§17.1 (1)); the design seats still read only what those lanes wrote. The seats' reading records, line by line, are in `docs/ARCHITECTURE-RATIONALE.md` (Part C).

**A.3 CONFIRMED versus PLAUSIBLE, in one sentence.** Every reference number quoted as a calibration target or a
baseline (FTG's zig-zag centimetres, 10.3 m quads, 39 m towers, 83 cul-de-sacs; NG's corner at 0.5 ± 0.1, ≥ 85° arrival,
95–99 % attached; MFCG's casing law, 24 restarts in 58 attempts, six persons for each lot, the total rounded up at its second significant digit; the timing bars) is
CONFIRMED by the lane that measured or read it and is cited to that lane through the proposals and judges; the
engineering judge's arithmetic checks (birthday bound, `orient2d` bounds, per-plot rates, index rebuild cost) are
CONFIRMED there; every mechanism, constant, budget, band, effort figure, milestone and decision in this document is
**PLAUSIBLE** — reasoning from that evidence — until M-1 and M0 execute it and the B-CITY / B-EDIT / B-FUZZ / B-REF /
B-ZOOM harnesses measure it.

**Amendments b (2026-09-25 to 27).** The pass that folded items 8–31 of the second amendments file into this document
(its landing rows are §0.2; its route sits in `docs/validation/amendments-b/`) read the owner's words, the route and the
Dwellings review — the four findings files and the Fable synthesis in `research/findings/` — as findings only; no seat of
it opened a reference source or a captured bundle. Its rulings are the `J-A` rows of the index. Every mechanism, default
number, bar and effort figure it added is **PLAUSIBLE** until the milestone named beside it in §16 executes it; the
Dwellings numbers it cites — research-side notes, never `baselines.json` rows (§13.5) — are CONFIRMED by the measuring lanes and by the critic that checked them.

**Amendments c, d and e (2026-09-27 to 28).** The pass that folded the code-reading items 33–62, the owner's rules of
items 63–72 and 20 (h), the dossier port of items 73–88 and the authoring toolkit of item 101 into this document (their
landing rows are §0.2's; the route and the seats' reports sit in `docs/validation/amendments-c/`) read the readers' findings, their critic `_critic-code.md` and `code-impact.md`, the dossier survey's plan and
verification (`research/sf/`), the tool survey (`research/ux/tool-survey.md`) and the owner's words; no seat of it
opened a captured bundle, `partitioned/` or SettlementForge's code — item 69's palette numbers came from the owner's
item. Every reference fact it restates was CONFIRMED on the captured bundle by its reader (checked independently by the critic, or run against the captures, where the reading says so); the parts a reader only inferred waited for Fable's
retrovalidation and entered only as it released them, labelled as inferences — `cut.flattenM`'s metre reading (§4.6),
NG 1.2.2's hood span (II.2) and the restated Fantasy Manor model's timing (§12.7) — while the proposed deletion of FTG's share of buildings outside every district ring (49 %) was rejected and the figure kept, cited to its real source (§1.4). The SettlementForge facts of
items 73–88 are CONFIRMED by the survey's verification; their shapes, thresholds and table rows are the program's
proposals. Items 63–72, 20 (h) and 101 are owner rules: the owner's words are the authority and every mechanism the
program designed from them is its vetoable interpretation. Every mechanism, default, bar and price the pass added is
**PLAUSIBLE** until the milestone §16 names executes it.

=== REPLACE ### 0.2 Where the owner's late rules land — items 1–7 (`docs/AMENDMENTS-2026-09-25.md`) and items 8–31 (its sibling `AMENDMENTS-2026-09-25b`) ===
### 0.2 Where the owner's late rules land — items 1–7 (`docs/AMENDMENTS-2026-09-25.md`) and items 8–31 (its sibling `AMENDMENTS-2026-09-25b`)

**Items 1–7.** Every clause of every rule is checked at its landing; where a rule has several clauses its landing carries
a clause map.

| rule | landing (the mechanism) | clause map |
|---|---|---|
| 1 greenery by prosperity | §4.9 S12b rule table (reads the prosperity field and the district kind; yard planting by plot class); §15.2 O19 | §4.9 |
| 2 floating islands (a toggle, staged by the owner) | §2.7 `SkyIsland` with its own terrain and a `reason` (prosperous quarter or unique institution); II.1 rule 5 (the sky call) and II.6 (the staged layers' hooks); §4.2 (island outline); §11 (per-layer export) | II.6 |
| 3 heights for shadows | §2.6 heights and the ground datum on every building, wing, tower and roof; §8.4 the shadow pass and the display list's shadow hook | §2.6 |
| 4 size ladders | §1.1 (both ladders; the `RungProfile` table; size within a rung follows population); §12.2 (matched reference sizes and the band ends in buildings); PART III (the village ladder THORP → HAMLET → VILLAGE and its ceiling) | §1.1 |
| 5 everything editable | §7.1 (the edit targets, clause by clause, and the edit-target table), §7.2–§7.6, §2.8 (edit paths in the entity registry, whose completeness test is §13.2's) | §7.1 |
| 6 prosperity a gradient and a band | §4.5 (the field, its drivers, bands only where a table needs one, continuous interpolation, evolution moves the field), §4.7 (interpolating rules), §7.2 (brush edits) | §4.5 |
| 7 adopted defaults | D-1–D-7, each FINAL and tied to its mechanism: the ink default and `lit` on Canvas2D; era rows refined by §13.9; the named fantasy toggles; the browser-first library under §17's checker; "mastered" through §13.6's protocol plus the parity numbers; naming through §10.4's packs; the weighting ordering the build (§16) | D-1–D-7 |

**Where items 8–31 — the owner's later rules, in the second file the heading names — land.** The same discipline: every
clause is checked at its landing. Each row names the home that states the mechanism first, then the sections that
carry a pointer, a hook field or one line of rule, then the tests (§13.2's `T⟨item⟩-⟨n⟩` fixtures), the decisions and
the lists. An item whose engine the owner's roadmap stages later lands as the base's hooks (*Staged by the owner's
roadmap*). Item 32 of the same file, received after that pass's routing had closed, landed with amendments c (below).

| rule | landing (the mechanism) | clause map |
|---|---|---|
| 8 decline and regrowth are part of evolution (hooks now) | home §4.11 — the decline table's exposure lottery over weighted drivers, the persistence order, the salvage ledger, the dwell lag, the regrowth-first siting that binds the built grow path today, and `DeclineOp`; the states and records in §2.6 to §2.8 (`Existence` gains `cleared` and `reused`; `Building.predecessor`; `Enceinte.supersededBy`; `MaterialLedger`); identity kept through decline in §6.3; every kind applied by hand and undone in §7.1 and §7.4; the state classes in §8.2; tests T8-1 to T8-7; hooks row 2 of §15.2; priced at M4 in §16; D-25; the staged evolution row | §4.11 |
| 9 size is set by population, even within each tier | SATISFIED — size within a rung follows population and every budget is a law of the building count (§1.1); parity pairs are matched by building count (§13.6 (3)); no change (J-A9.01) | §1.1 |
| 10 floating islands are a product of prosperity | home II.6 — the island rule: two supply values (the town's and the carried districts'), the supported area and altitude, the supply re-read at each epoch; the sky allocation in §4.5 S7b (5); a row of §4.9's band-row family; the island decline kinds in §4.11; the record fields `supply`, `areaHa` and `state` on `SkyIsland` (§2.7); hand edits in §7.1 and §7.4; test T10-1; D-3; the staged sewers-and-islands row | II.6 |
| 11 the underground fades like the walls | home II.6 — the tunnel ladder (in use, silted, caved in, collapsed or sealed), never demolished by the engine, reopened by growth; the `underground` persistence row and the tunnel kinds in §4.11; a tunnel's condition, read from `existence` and `Tunnel.closure` (§2.7, §2.8; J-A11.21); hand edits in §7.1 and §7.4; the styles in §8.2 and the layer in §8.4; test T11-1; D-25; the staged rows | II.6 |
| 12 underground neighbourhoods along the sewers | home II.7.3 — the owner's three rules as the invariants U1 to U3; the occupants, the cut on the underground arena, the surface constraint, access points, depth, lifecycle and order; the interfaces `UndergroundStrategy`, `AccessPoint` and `UndergroundRule` in II.7.4; `drawTunnel` and `placeAccess` by hand in §7.1 and §7.4 (J-A12.71); the arena's levels (§2.1, then §2.2); `ContextVector.arena`, `Tunnel.navigable` and `headroomCm` in §2.5 to §2.7; `corridorUnion` over `tunnel` chains in §3.7 and the arenas' isolation in §3.4 and §3.10 (J-A12.31, J-A12.32); F-UNDER in §5.2 and the U rows in §5.3; a concern in §6.1; the layer in §8.4 and the exports in §11.1; fixtures in §13.1 and test T12-1; the registry map in §14; the staged row | II.7.3 |
| 13 floating islands only in cities and metropolises | home II.6 (2) — the rung gate, read at generation and at every epoch; the `layers.islands` column of `RungProfile` (§1.1); the village rows `none` (PART III); the sky allocation of §4.5 S7b (5); a band crossing runs the ladder (§4.11); the control disabled below CITY (§7.8); test T13-1; D-3 and D-33 | II.6 (2) |
| 14 sewers by tier | home II.7.1 — existence by tier: a TOWN law of population and wealth, always at CITY and METROPOLIS, never below TOWN; the toggle is visibility; the `drain` rule; the `layers.sewers` column of `RungProfile` (§1.1); the one-click default (§1.2); the S0 draw and `Features.sewers` (§4.2); PART III; a concern in §6.1; the control in §7.8; the layer in §8.4; test T14-1; D-3 | II.7.1 |
| 15 not every city has islands | home II.6 (1) and (4) — a model setting off by default; the count 0 to 3 drawn on `island.place` through ordered slots weighted by supply; the view toggle shows islands and never creates them; the sky allocation of §4.5 S7b (5); the draw in §6.1; the control in §7.8; the layer in §8.4; test T15-1; D-3 | II.6 |
| 16 assignments obey spatial and supply-chain rules | home §4.7 S10b — the one placement solver: HARD and SOFT relation rules, supply edges with distance and mode, joins where the use needs land, relocation of the displaced as a local recorded repair, infeasibility reported with the closest options; the relation templates and supply edges as class and roster data (§10.2) and S2's need propagation (§4.2); `PlacementCriteria` as per-assignment overrides in §7.7, with §7.3 and F-SITING in §5.2; the context vector of §2.5; the budget row of §12.4; tests T16-1 to T16-4; the corpus re-signing of §13.9 (5); the solver's package in §14; O7 (b), O10 (e) and hooks row 3 of §15.2; priced in §16; D-32 (J-A16.44) | §4.7 S10b |
| 17 uses move as the city grows and declines | home §4.11 — the epoch's use step: re-scoring against item 16's rules and the current distribution, inertia, traces of former uses, pinned assignments that stay, and `UseConversionOp`; the `Use` record with `Building.use` and `formerUses` and the use lifecycle in §2.6 to §2.8; a use's address in §6.3; `openUse`, `closeUse` and `relocateUse` by hand in §7.1 and §7.4; members move with their use unless pinned (§7.7); households follow in §10.3; the report to the host in §11.3; tests T17-1 to T17-3; D-25; the staged evolution row | §4.11 |
| 18 a plot's buildings mutate to match a new designation | home §4.7 S11 — the designation mutator: match, order and draws, land, protection, record and reversal, timing, one path; addressable parts (§2.5) and `MutationRecord` (§2.6); the epoch-spread form in §4.11; the concern `siteplan.mutate` in §6.1 and the minted parts in §6.3; every `assign` runs the solver and the mutator, undo being the inverse mutation (§7.3, §7.4 and §7.7); tests T18-1 to T18-4; the mutator's package in §14; priced in §16 | §4.7 S11 |
| 19 every designation scales with prosperity | home §4.7 S11 — the designation-template table by class and band, interpolated along the field, its shape columns reading the manifested band and its use and condition columns the field band; `ClassRules.pick` reads it and the Materials paragraph holds the material rule (FTG's default model, the optional regional shift, texture and colour only, never shape) in §2.6; the specialisation rows in §10.2; the colour roles in §8.2; the drift bounds in §7.7; the buildings row of §1.4; tests T19-1 to T19-4; priced in §16; D-2 | §4.7 S11 |
| 20 one-way data flow; the dossier is the authority | home §7.7 — dossier-backed existence, the rejection record and its lapse, positive placement, re-application, the precedence line; `rejectSite` and `placeAt` in §7.1 (a `delete` of dossier content is a rejection), with §7.2 and §7.4, the ladders of §5.2, the invariant of §5.3 and the report of §5.4; `Rejection` in the registry and `Identity.dossier`, a `DossierRef` (§7.1) carried by the entity the element is (§2.8, J-A20.22), dossier events in the log (§2.9); the `dossier` and `positive` requests and the least-disruption order in §4.7 S10b, a dossier household's housing re-provided in its district when no building there can hold it (§4.7, J-A20.72), the lapse at an epoch and *Dossier content across epochs* (J-A20.75, J-A20.43) in §4.11; the one-way door, with no message that writes the dossier, in §11.3 and §11.4; the summary; tests T20-1 to T20-6, T19-4's dossier clause and T28-18's dossier fixtures; the engine in §14; O10 (i) of §15.2; priced in §16; the staged SettlementForge row; **(h), the owner's refinement (2026-09-27):** §7.7 items 9–11 — two tiers of fact, the dossier's immutable and the map's derived; derive before invent, through the derivation table's index with each row's chance entry and its totality bar; the coherence rows and the "dossier-owned" refusal (J-A20.76 – J-A20.79) — the tier marker on records and fields (§2.8) read by §7's edits, §9.2's reader, §11's exports and the clerk, and the households that fill the dossier's population named so wherever they are named; its bars in §13.2; **the port and its seam (items 73–88):** `@plat/port` and its interface (§14), the binding key law and `Document.dossier` (§7.7 item 12, §2.9), the change envelope and its receipts (item 13), a listed element's state (item 14), the rung and the refusal below 1 500 (item 15), naming claims (item 16), the typed slices (item 2), what the port never reads (item 1), the clock and the epoch cadence (§4.11), the staged records (§2.7), the frozen fixtures and B-DOSSIER-lite (§13.2); priced at M1, M2b, M3a and M4 (J-A73.05) | §7.7 |
| 21 licence | SATISFIED by the owner's ruling of 2026-09-27 (private for now; J-A21.01): §17.3 and D-22 unchanged; §17.1 (1) unchanged — it already admits no TownGeneratorOS code; permissive-only dependencies (§17.4) unchanged; the separate program with its data-only bridge (§11.3) retained by choice, not by licence; §3.1's skeleton row keeps CGAL's licence ground (J-A21.31) | §17.3 |
| 22 dossier changes mutate the existing map, never re-roll it | home §7.7 — dossier events as mutations with least disruption, `DisruptionBudgetRow`, the report, vacancy on removal, continuity over path-independence; two histories may give two valid maps (§6.2); the budget's scope in §7.3 and the report in §5.4; the log in §2.9; each dossier element present from a new map's first generation (§4.2 S2), the search order in §4.7 S10b, a mid-history dossier event folded at its epoch (§4.11); the host door in §11.3 and §11.4; tests T22-1 to T22-4; the staged rows | §7.7 |
| 23 emulation-first defaults; no hard-coded universals | home §7.6 — the defaults layer is the emulation baseline: a default cell's `provenance.source` names the reference behaviour, an extension carries the `extension` marker with its chance, weight or option, an absolute reads as a default table value, and the parity presets `MFCG` and `FTG` switch every extension off; a pointer from §1.4; the provenance values of §17.1 (6); `RelationRule.extension` in §4.1 and §4.7 S10b; test T23-1; the parity presets inside §13.5's bands and on the D-5 panel's MFCG and FTG pairs (§13.6 (3), J-A23.02); priced at M1 in §16 | §7.6 |
| 24 several markets, as MFCG and FTG already do | home §4.2 — S2's market demand (N markets by size) and S3 (12)'s principal-market score by trade convergence, secondary markets never touching another and on small patches; the destinations, seeds and stalls of §4.3 to §4.5, §4.7 and §10.2; `Reservation.rank` and the nearest-market distance in §2.5; a market's `rank` edited by `setAttr` in §7.1 (J-A24.71); the summary; the centre row of §1.4; tests T24-1 to T24-3; the parity rows of §13.5 and the threshold of §13.7; D-16 and D-17 | §4.2 |
| 25 terrain and water can change, slowly | home §4.11 — `reclaim`, `siltReach`, `shiftCourse` and `digCanal` as the slowest layer's rows of the decline table, repaired by S1's terrain or water operator or the carve (§7.3 (a), (b); §4.11); what each changes in §2.3 and `LandUse.reclaimed` in §2.7; by hand and undoable in §7.1 and §7.4, through §7.3 (a) and (b); a concern in §6.1; test T25-1; D-25; the staged evolution row | §4.11 |
| 26 the hinterland is decided with the town, drawn after it | home §4.9 — FTG's order and its farmland modes chosen by size and landscape (`FarmModeRow`), the fuel and timber rows beside the farm table, the extent following demand, the arable reserve off by default; the demand rows (§4.2 S2, §10.2); the execution order (§4.1 and §4.4); the hinterland row of §1.4; tests T26-1 to T26-3; O14 (h) of §15.2; priced in §16 | §4.9 |
| 27 prosperity maps onto the references' wealth models | home §4.5 — the default band set: FTG's six lifestyle tiers with their shares, MFCG's ward-class shares as band targets, the shanty trigger, and `FieldBands.middle` as the band of the median household, the continuous gradient being our extension; the band-keyed rows of §10.2, §4.7 and §4.9; `FieldBands.bands` and `middle` in §2.5; the districts row of §1.4; tests T27-1 and T27-2; the descriptive rows of §13.5 | §4.5 |
| 28 floor plans and elaboration by click; (f) the interior has no floor | home §2.6 — the fourth rung, `plan`: the room programme first (from the designation, the occupants' band and the household count, never the geometry floor), the partition fitted to it one wing at a time around a stair core placed ahead of any cut, coherence with the exterior, the entrance set and basement consumed; the interior ladder's rule table by band, the dwelling unit with its own door, the re-cut as item 18's mutation within unchanged wing rings, and the shell's household capacity; `ElaborationRecord` per rung (absent, current, stale, edited) with `Document.elaborations` outside both digests and the `elaborate` view key (§2.8, §2.9); click → rung and the pre-assignment in §4.1; `RoomProgramRow`, `RoomRuleRow.scope`, the template's `households` and a structure's `houses` flag in §4.7 S11 and §10.2, the generation fill — households per slot at S10b, `Building.households` clamped to the capacity at S11 and the overflow re-placed inside the district — in §4.7 (J-A28.46), the occupants' band memory `Plot.fieldBand` (J-A28.29) and the fill's typing record `BuildingSlot.unhoused`, both in §2.5, `relet` in §4.11 rung 1; the close-ups of II.4 and II.5; the transient arena and the re-cut (§3.4, with `ArenaKey` in §3.3); the `spine` reader (§3.8); the seed-tiling row (§3.10); F-PLAN (§5.2); the invariants (§5.3); the `plan.*` concerns keyed by the rung's reroll in §6.1, the pure-function rule of §6.2, the click-order identity of §6.5 (9); the seven plan events, `setRoomUnit` and the rung re-roll of `regenerate` in §7.1, with §7.3 and §7.4; the draw and the change marker (§8.2, §8.5), the cache (§8.6), the export (§11.1), the budgets (§12.7, §12.8); the summary; the stage table (§1.1); the one-click default (§1.2); fixtures in §13.1 and tests T28-1 to T28-19; the soft bands of §13.7; the plan step's package in §14; priced in §16; the staged stage-3 row | §2.6 |
| 29 entrances and basements | home §2.6 — `entrances: Entrance[]` with roles and faces under the five rules; `Basement` derived from the class rows, the terrain gate of §2.3, prosperity and size, inside and smaller than the storey above it, its storey in `Heights`; a cellar never joins a sewer as a room, a cellar stair to a tunnel being an `AccessPoint` (II.7.3); the indexed vertex role of §2.2 rule 7 and the slot of §2.5; the placement in §4.7 S11 with the entrance and cellar columns of §10.2, and when an alley presents itself in §4.6; the invariants of §5.3, the concern `siteplan.entrance` in §6.1, `setEntrance` in §7.1, with §7.3 and §7.4; the glyphs and exports in §8.2, §8.5 and §11.1; the buildings row of §1.4; tests T29-1 to T29-5; the note in §13.5; O5 (f) and O17 (j) of §15.2; priced in §16 | §2.6 |
| 30 hidden plots and clandestine places | home §4.6 — S8's hidden-share and reach rows by band and density, `exposure` derived by adjacency to a public way, the passage choice — the cut making the `passage` L3 face in §4.7 S10; a second home in §9.2 for the knowledge label policy; `Plot.exposure`, `Block.reach`, `knownTo` on plot, building and institution and `BaseWing.spans`, which a composed wing inherits (J-A30.23), in §2.4 to §2.6, `sealed` in §2.8, the viewer's knowledge key in §2.9; the nesting paragraph of §3.10 (J-A30.31) and the passage room as a fixed ring in §3.4; a secret institution's preference in §4.7 S10b, densification, clearance, `sealPassage` and `openPassage` in §4.11, none by default in PART III; F-PLOT in §5.2 and chain reachability in §5.3; the concern `cut.interior` in §6.1; the edits in §7.1 and §7.4 and the dossier fact in §7.7; the glyph, the court tone and the exports in §8.3, §8.5 and §11.1 to §11.4; the summary; tests T30-1 to T30-5; the parity row of §13.5 and the threshold of §13.7; the gazetteer in §14; O5 (a) and O18 of §15.2; priced in §16; the staged evolution row | §4.6; §9.2 |
| 31 prosperity change drives fusion and splitting — a slow, asymmetric ladder with a geometry floor | home §4.11 — Survivors: the DUE trigger with hysteresis; the three rungs (use and occupancy, tenure and yards, geometry only on vacancy, ruin or redevelopment); no occupied building removed by a band change; durations by direction and by the stock's replaceability; churn caps; `LadderOp`; and the geometry floor — `geometryFloor = min(builtBand, the settlement's middle band)`, the manifested band and value; the fusion and splitting orderings in §4.7 S10 (7) and the mutator in S11; `FieldBands.middle` and the DUE trigger in §4.5, the back courts of §4.6, the yards of §4.9, `replaceability` and `households` in §10.2, households in §10.3; the close-ups of II.1 and II.3; `Block.due`, `Plot.builtBand` and `builtProsperity` in §2.5, `households` and `condition` in §2.6, the memories told apart in §2.8; lineage through fusion and splitting in §6.1 and §6.3; `relet`, `densify`, `thin`, split and join as re-cuts and `builtBand`'s lifecycle (§7.1, §7.2, §7.4), with §7.3, §7.5 and `WealthLadderTable` in §7.6; the ladders and invariants of §5.2 and §5.3; the condition classes of §8.2; the summary; tests T31-1 to T31-12; `wealthLadder.json` in §14; O18 (g) of §15.2; priced in §16; D-25; the staged evolution row | §4.11 |

**Where the amendments of 2026-09-27 and 28 land — items 32–72 (`docs/AMENDMENTS-2026-09-27c.md`; item 32 quoted
there from `AMENDMENTS-2026-09-25b`), items 73–88 (`AMENDMENTS-2026-09-27d`) and item 101 (`AMENDMENTS-2026-09-27e`).**
The same discipline. Items 33–62 come from reading the references' compiled code (§17.1 (1)): each adopts a mechanism
re-derived in our own terms, keeps ours with its reason, or calibrates a default to a read fact with its `(code)`
provenance (§17.1 (6)); a part a reader only inferred entered only as Fable's evidence gate released it, labelled as an
inference, and the gate's one rejection (item 49's deletion) is honoured. Items 63–72 and 101 are the owner's rules and
20 (h) the owner's refinement of item 20 — the owner's words the authority, their mechanisms the program's vetoable
interpretation. Items 73–88, the dossier port and its seam, extend 20 (h) under the owner's rulings of 2026-09-28 (the
first SettlementForge line, door 1 closed, a dossier below 1 500 people refused, a resettled site one map, the
placeholder direction phrase, SettlementForge's own district names never matched); their landing is item 20's row above.

| rule | landing (the mechanism) | clause map |
|---|---|---|
| 32 the compiled code was read to understand it | home §17.1 (1) — research reader seats read the captured bundles for understanding only, nothing copied, their findings behind the implementer firewall, the checks of (2) and the scan of (5) unchanged, a divergent mechanism entering only as our re-derivation (J-A32.01); §0.3's evidence sentence; D-29; Appendix A's reading record; the summary | §17.1 (1) |
| 33 the bent cut's citations; the slope term ours | home §4.6's recipe (NG 1.2.2's plain bisector as read in its code, restated in metres, the profile's statistics staying §13.5's targets) and step 1's slope term (provenance `own`, an `extension`; J-A33.41, J-A33.42); §1.3's and §1.4's rows by build; §0.3; D-16 (J-A33.01) | §4.6 |
| 34 the stop test: a per-face threshold on the extent | home §4.6 step 1 — `τ = e_lo · (e_hi / e_lo)^g` drawn per face on `cut.stop`, the block-depth range stated once (J-A34.41, J-A34.42); the concern in §6.1 (J-A41.61); the depth rows re-fitted at M-1 (§16, §13.5's blocks row; J-A34.01); T34-1 | §4.6 step 1 |
| 35 where the cut falls: between the face's mass and a bell draw | home §4.6 step 2 with its holed law (J-A35.41); II.2's slit | §4.6 step 2 |
| 36 a deterministic start | home §4.6 step 3 (J-A36.41); `cut.side` retired in §6.1; T36-1 | §4.6 step 3 |
| 37 the corner first, the far side from it, straight or bent | home §4.6 steps 4–5 — `cut.bendMode` `flatten` in the base and `straightFirst` under the `MFCG` preset, `cut.flattenM` 0.7 m as an inference Fable released (J-A37.41, which supersedes J-P16; J-A37.42); §7.6's per-preset values (J-A37.71); `cut.farSideAlt` retired; M0 (b) the check of the adopted rule (§16; J-A37.01); T37-1 | §4.6 steps 4–5 |
| 38 the fillet by deflection and leg | home §4.6 step 6 (J-A38.41); §13.5's fillet bar; T38-1 | §4.6 step 6 |
| 39 rung (a): a turned frame | home §4.6 step 8 (J-A39.41); F-CUT's ladder cell (§5.2); the citations of §3.5 and §1.3; T39-1 | §4.6 step 8 |
| 40 the lane width: a saturating power law | home §4.6 step 9 (J-A40.41); II.2's template widths; T40-1 | §4.6 step 9 |
| 41 the streams and the parity rows | home §13.5's bent-cut row — NG 1.2.2's numbers as measured outputs, with the fillet-share bar (J-A41.01); §6.1's registry (J-A41.61); §13.2's group of the code-reading items' bars (J-A41.02); M0 (b) in §16 | §13.5 |
| 42 NG's frontage-less lot leaves are its courts | home §4.7 S10 (10) (J-A42.41); §4.6's deep-interior note; F-PLOT's baseline (§5.2); §1.3 | §4.7 S10 (10) |
| 43 the front line: an area-scaled, floored recession | home §4.7 S11 (J-A43.41, J-A43.42); §7.6's per-preset values (J-A43.71); T43-1 – T43-5; §15.1's MFCG row | §4.7 S11 |
| 44 the compound enclosure is ours | home §4.7 S11's set-back compound row — provenance `own`, an `extension` (J-A44.41); §2.5's PlotBound; §7.6 (J-A44.71); II.3; T44-1; §15.1's NG row | §4.7 S11 |
| 45 the castle repair: a thinness bloat, then the fitted regular polygon | home §4.8's Compactness (J-A45.41, J-A45.42); `regularFit` in §3.4 (J-A45.31); F-CASTLE's ladder (§5.2) and §7.1's Equalize; §1.4's walls row; T45-1 | §4.8 |
| 46 the gate law's waterfront reduction; three smoothing passes | home §4.2 S3 (4) (J-A46.41, J-A46.42) and §4.4's trace (J-A46.43); §13.5's towers-and-gates row; D-17, D-19; T46-1 | §4.2 S3 (4) |
| 47 district growth rates by seed kind | home §4.5's Grower (J-A47.41, J-A47.42); `district.seed`'s turns (§6.1); §1.4's districts row; D-16; T47-1 (J-A47.01) | §4.5 |
| 48 MFCG's population is six people for every lot | home §13.5's population row (J-A48.01); §1.4's content row; Appendix A | §13.5 |
| 49 FTG's "lots" were ground-cover patches | home §13.5's blocks and plot-area rows, their 441 m² figures withdrawn; §1.4's rows — the share of buildings outside every district ring (49 %) kept, cited to its real source, "containment 53 %" withdrawn, by Fable's evidence gate (J-A49.01) | §13.5 |
| 50 FTG's "entrance" is its night-light anchor | home §2.6's Entrances — the main door by the owner's rule (provenance `owner`); the entrance default of §4.7 S11 and §10.2; §13.5's entrance rows, class C, and T29-4 (J-A50.01); §1.4's buildings row | §2.6 |
| 51 the retry and stream citations | home §5.1 (1) (J-A51.51); §1.4's determinism and failure-policy rows; §15.1's VG row | §5.1 (1) |
| 52 session-history independence | home §6.5 (9)'s test (J-A52.61); §13.3's pointer | §6.5 (9) |
| 53 the Poisson annulus; the contour and search notes | home §8.10's Sampling; §3.1's rows (J-A53.31); §13.5's tree-scatter row; D-11 | §8.10 |
| 54 the raised under-copy by class | home §8.2's class ratios and `raised(offset, classRatio)`; §8.4's K06; T54-1; §15.1's MFCG row | §8.2 |
| 55 the horizontal spine | home §9.3's Area labels; T55-1 | §9.3 |
| 56 the MFCG naming row | home §15.1's MFCG D1; §6.1's deck helper | §15.1 |
| 57 the sector look's two sources; fields claimed outward | home §4.9 (J-A57.41 – J-A57.43); §1.4's hinterland row; T57-1 | §4.9 |
| 58 stage 2: ring courses, greens, pins, NG's render notes | home II.2's RingFabric and II.3 (J-A58.41 – J-A58.43); §8.2's layer note and §8.3's census; §13.5's draw-style row; §15.1's NG row | II.2 |
| 59 the stage-3 hook: Fantasy Manor's layout families | home §2.6's stage-3 hook — the path-shape rows and what ours adds; §12.7's restated timing; the staged stage-3 row | §2.6 |
| 60 the plan rung's Dwellings baselines | home §2.6's Basements note and plan step 5; §13.5's entrances-and-basements row; §15.1's NG row | §2.6 |
| 61 PART III: VG 1.6.9's observations | home PART III item 2 (J-A61.41); §13.5's build stamp | PART III |
| 62 the `(code)` provenance form | home §17.1 (6) and (8) (J-A62.01); §7.6's provenance grammar | §17.1 (6) |
| 63 clandestine institutions: a front and a hidden function | home §4.7's *Concealed institutions* — `concealment` resolved dossier → assignment → the class's weights → `none`, the front and its concealed use one solver item, the front driving the mutator (J-A63.41 – J-A63.44); the concealment fields of uses, rooms and doors (§2.6, §2.7); the cover rows (§10.2); the knowledge filter for concealed parts (§9.2, §11.1, §11.2); a dossier fact (§7.7); II.7.3's underground mode; the T63 bars (§13.2); the staged rows | §4.7 |
| 64 basement access to the sewer grid and its dwellings | home II.7.3's *Basement accesses* — a gate and a lottery by class × band × age × the concealed multiplier (J-A64.41 – J-A64.43); `AccessPoint`'s state and knowledge (II.7.4); §10.2's access rows; §2.6's Basements; T12-1's corrected clause and the T64 bars (§13.2); the staged sewers row | II.7.3 |
| 65 the underground as a family of systems; the undercity | home II.7.5 (the undercity) and II.7.6 (the systems, their parts and links) (J-A65.41 – J-A65.48); the arena parts (§3.4; J-A65.31, J-A65.32); the undercity bound in `RungProfile.layers` (§1.1); the systems' edits (§7.1; J-A65.71); D-3; the T65 bars (§13.2); the staged rows | II.7.5, II.7.6 |
| 66 an access edit generates everything it needs | home §7.3 item 9, the closure rule (J-A66.71); its generators in II.7.6 (J-A66.41); `addUndergroundAccess` (§7.1); D-25; the T66 bars (§13.2) | §7.3 item 9 |
| 67 transitions: buildings and plots mid-change on a weekly clock | home §4.11's *Works* — the `Works` record and `WorksTable`, its stage derived at any week, no Works at generation (J-A67.41 – J-A67.49); `startWorks` and `cancelWorks` (§7.1; J-A67.71); the `works` concern (§6.1; J-A67.61); the stage drawing rows (§8.2, §8.5); D-25; the T67 bars (§13.2); the staged evolution row | §4.11 |
| 68 light: day and night, the cursor sun, point lights, gradient shadows that respect height | home §8.4 — the lighting model, the cursor sun, the light pass with its CPU reference, its GPU accelerator and its fallback ladder; `LightSource` (§2.7); placement by `LightRule` (§4.7; J-A68.41); `pin.light` (§6.1; J-A68.61) and the CPU pass inside the lint (§6.5; J-A68.62); `placeLight` and the view controls (§7.1, §7.8; J-A68.71, J-A68.72); D-1, D-3, D-19 (J-A68.05); the T68 bars and §13.4's tolerance; §13.5's preset row; priced at M2b and M3b. **Put to the owner:** the day view with the cursor as its sun is the default in every family, and §8.4 casts the moving shadows in every shipped family — the `ink` map's gently, in shades of its own ink — and none under the `MFCG` preset (J-A68.81); the owner confirms that, or keeps MFCG's raised look on the default `ink` map with the shadows one switch away | §8.4 |
| 69 adopt the corpus's measured colour targets | home §8.2's palette targets from the owner-opened corpus bands; §13.4's bar; §7.6's corpus sentence and §13.9; §17.1 (5) and (6) (J-A69.05); D-1; priced at M1 | §8.2 |
| 70 informal clusters: many shacks or tents on one unowned lot, each with its own door | home §4.7 S11's *Informal clusters* — derived tenure, the `cluster` arrangement, paths first, a door per structure on a path (J-A70.41 – J-A70.48); the shelter and cluster rows (§10.2); the tenure and yard fields (§2.5); one label per cluster (§9.1); the T70 bars (§13.2); the staged rows | §4.7 S11 |
| 71 mixed classes inside a band | home §4.7 S10b's *Class mix inside a band* (J-A71.41 – J-A71.44); the class-mix rows (§10.2); S2's land estimate (§4.2); the T71 bars (§13.2); the parity presets' step (§13.5) | §4.7 S10b |
| 72 what defines a neighbourhood, and names it | home §4.5's *Neighbourhood character …* — the character vector, identities after placement, the three dials, the band range, the pressure, significance and dispersal (J-A72.40 – J-A72.49); the district's character, identity, range and pressure (§2.5); the dials' inputs (§7.7); renames at an epoch (§6.3, §10.4; J-A72.44, J-A72.62); §1.4's districts row; D-10, D-16, D-32 (J-A72.05); the T72 bars (§13.2); the staged rows | §4.5 |
| 101 the authoring toolkit — declare, then derive | home §7.1's *The authoring toolkit* — twelve tools in five layers, each an existing event or sugar over one, the points forms, declared means held (J-A101.71 – J-A101.77); the skeleton file as a creation prefix and the `citadel-and-port` form (§7.7); the read-ahead (§4.1; J-A101.41); the region groups, the leader-line switch and the underlay (§9.1, §9.4, §9.5); the clerk's tool API (§11.2) and the skeleton export (§11.1); the three surfaces and the interaction contract (§14); the elegance bars (§13.2) and the first-five-minutes test (§13.4); §1.4's editing row; priced at M2a, M3a and M3b (J-A101.05); the staged built-in clerk and plots on a bridge deck | §7.1 |

=== APPEND TO SECTION ## The whole design in one page (plain words) ===

**What the owner added, and what reading the references' programs taught us (amendments c, d and e, 2026-09-27 and 28), in one paragraph.** Their
landing rows are §0.2's. On the owner's word we read the references' programs to understand how they work — never
copying them — and put what we learned into our own rules: the bent cut that shapes the lanes is now Neighbourhood's own
recipe restated in metres, its recordings the test it must pass (which corrects "measured from Neighbourhood's
recordings" above), and several reference numbers were corrected or withdrawn (§17.1, §13.5). Some institutions hide:
a thieves' guild can work behind a tavern or a funeral parlour, and the map shows only the front (§4.7). Some cellars
open onto the sewers; below cities the underground can also hold catacombs, caves, old quarries, vaults and a buried
old town, and at most one to three neighbourhoods of an undercity for the city's shadier people; adding a way down
builds everything it needs (II.7, §7.3). Buildings can be shown half-built, half-demolished or falling into ruin, week
by week (§4.11). The map has day and night: by day the mouse pointer is the sun and every shadow falls by the real
heights, so a tall tower shades a low house and never the other way round; by night torches and lanterns light the
streets, and magical lights only where magic is switched on (§8.4). As designed, the default ink map shows those moving
shadows too, gently and in shades of its own ink, and only the setting that imitates MFCG draws none; the owner is asked
to confirm that, or to keep MFCG's raised look on the default map with the shadows one switch away. The default ink map
takes the warmer paper and brown-black ink measured on the owner's own map collection (§8.2). The poorest ground can
hold clusters of shacks or tents, each with its own door on a footpath (§4.7), and a neighbourhood mixes a few classes
of house, the richer its end of the scale the more large houses (§4.7). Each neighbourhood earns its character and
its name from what stands in it — a few churches outweigh many lodging houses — and its prosperity sets the floor and
the ceiling of every building in it; a thriving institution's surplus is kept as pressure that lifts its neighbourhood
over the years until the neighbourhood itself moves up, the program's reading of the owner's "until the neighborhood
itself upgrades", put to the owner to confirm (§4.5). SettlementForge's dossier is the map's only fixed truth, and
whatever it does not say the map works out by its own rules (§7.7); a separate adapter reads SettlementForge's file and
hands the map only what it needs, so no other part of the program ever learns SettlementForge's field names, and a dossier
for fewer than 1 500 people is left to the later village product (§14, §7.7). Anyone — a person with the tools, an AI
clerk, or a hand-written file — builds or copies a city using one set of twelve tools: you place a few points and the
shape is worked out for you, with handles to adjust it afterwards (§7.1, §14). With these the effort is about
185.5–248.5 expert person-weeks, which replaces the figure given above (§16).

=== J-ROWS ===
| J-A32.01 | the owner's code-reading directive stated once, in §17.1 (1): research reader seats read the captured bundles to understand them, nothing copied, their findings behind the implementer firewall, the checks of (2) and the scan of (5) unchanged, and a mechanism that differs from an earlier inference entering only as our re-derivation with `(code)` provenance; §0.3, D-29 and Appendix A point to it | §17.1, §0.3, D-29, Appendix A |
| J-A32.02 | amendments c, d and e land in one §0.2 table in the form of items 8–31's (item 20's row carrying (h) and the port) and in one plain-words paragraph appended to the summary, which names the summary's two superseded phrases, to be folded where they stand | §0.2, the summary |
| J-A33.01 | the bent cut named by build wherever the scope part cites it — NG 1.2.2's mechanism restated in metres, MFCG 12710731 and VG 1.6.9 cutting straight first — in D-16, §1.3 and §1.4's block-fabric row | D-16, §1.3, §1.4 |
| J-A34.01 | the plot-depth rows and regime floors behind §4.6 step 1 re-fitted at M-1 under the per-face stop threshold before any block band is signed | §16, §13.5 |
| J-A37.01 | M0 (b)'s comparison with NG's distributions is the check of the adopted corner-first rule, `cut.flattenM` calibrated there; no far-side fallback is measured | §16 |
| J-A41.01 | NG 1.2.2's bent-cut numbers kept as §13.5's targets, read as outputs of its mechanism and measured on ours the same way, with a fillet-share bar (± 0.05 of the share NG shows on identical face shapes); no golden shift, none existing before M1 | §13.5, §16 |
| J-A41.02 | the code-reading items' bars stated as one §13.2 group (T34-1 – T41-1, T43-1 – T44-1, T45-1 – T47-1, T54-1, T55-1, T57-1); the owner rules', the port's and the toolkit's bars stay the group that follows it | §13.2 |
| J-A47.01 | the growth-rate bar — districts seeded at a gate, the castle or a bridgehead below the town's median district area on ≥ 90 % of B-CITY seeds — a conformance bar in §13.2 (T47-1), not a §13.5 row | §13.2 |
| J-A48.01 | MFCG's population described as six persons for each lot, the total rounded up at its second significant digit, its "buildings" being its lots; the roster-first population kept | §13.5, §1.4, Appendix A |
| J-A49.01 | FTG's ground-cover "lot" figures withdrawn from §13.5 and §1.4, our plot bars standing as C rules; the share of buildings outside every district ring (49 %) kept, cited to `_critic-ftg.md` F4 alone, and "containment 53 %" withdrawn, as Fable's evidence gate ruled | §13.5, §1.4 |
| J-A50.01 | §13.5's entrance row made class C with the bar "100 % on the access edge", the owner's rule of item 29, and FTG's 2.99 m withdrawn as its night-light anchor; supersedes J-A29.01's clause keeping §13.5's FTG entrance row as the main entrance's target; MFCG's lack of a door written as an inference | §13.5, §13.2 |
| J-A62.01 | a behaviour read in a reference's compiled code carries `ref:⟨reference and build⟩ ⟨behaviour⟩ (code)` with its P-id (a D-id for a descriptive baseline) as the trace key into `code-impact.md` §(d); the reference's class never in this document, the digest or `plat/`; restatement scripts research-side only | §17.1 (6), (8) |
| J-A63.05 | the owner rules of items 63–72 and 20 (h) priced at +11.5–17 pw, item by item, over five lines of §16 and carried by M1, M2b, M3a, M3b and M4; item 68's lighting model priced whole in the base; their staged engines unpriced | §16, D-20 |
| J-A68.05 | item 68's scope clauses: D-1's rejection of a second drawing path stands, the GPU only accelerating the light pass; D-3 restated — magical lights under the `magic` circumstance, fire lights realism, night a view choice; D-19 names the day view with the cursor sun as the default and leaves each family's cast-shadow default to §8.4, put to the owner | D-1, D-3, D-19, §0.2 |
| J-A69.05 | the owner-opened corpus palette bands cited by provenance `corpus` with the evidence "owner-opened corpus palette exception, 2026-09-27 (item 69)", the palette audit kept to reference palettes; D-1's values follow the targets, the look unchanged | §17.1, D-1 |
| J-A72.05 | D-16, D-10, D-32 and §1.4's districts row re-worded for item 72: districts typed feature-named before placement and named by their identity after it; the dials read shares, standings and partners and never model an economy | D-10, D-16, D-32, §1.4 |
| J-A73.05 | the dossier port priced by its plan's line-by-line estimate, +4.5–6 pw (M1 +1.5 / +2, M2b +0.5, M3a +2 / +3, M4 +0.5) over the O11, O10, content, rig and unpriced lines; its host wiring unpriced | §16 |
| J-A101.05 | the authoring toolkit priced at +3.5–5.5 pw — M2a T9–T10 with the preview; M3a T2–T8, the sugar events, the points forms, the skeleton file, the underlay and the clerk's tool API; M3b T11–T12 — over the O9, O11, O12, app and rig lines; §1.4's editing row names it; the built-in clerk and bridge-deck plots unpriced (staged) | §16, §1.4 |
=== RATIONALE-A ===
| J-A32.01 | Chose to state the owner's directive of 2026-09-27 (read the captured references to understand their logic, never copy them) as one paragraph of §17.1 (1) — research reader seats read the captured bundles of MFCG 12710731, VG 1.6.9, NG 1.2.2, Fantasy Manor 1.0.0 (build 890), Dwellings (itch 17195045) and the FTG client of the 2026-09-25 capture for understanding only; nothing copied; their findings, critic and provenance table research files behind the implementer firewall; the checks of (2) and the scan of (5) unchanged; a mechanism that differs from an earlier inference entering this document only as our own re-derivation with (6)'s `(code)` provenance — with §0.3's evidence sentence, D-29's clause and Appendix A's reading record pointing to it, over a new clean-room subsection or a sentence in every section a code reading touched, because the directive changes who may read what on the research side only, which is exactly (1)'s subject, while the implementers' inputs (D-29, J-S8) stay as they were; the owner's words stay quoted only in `docs/AMENDMENTS-2026-09-25b.md` (§17.1, §0.3, D-29, Appendix A). |
| J-A32.02 | Chose to land amendments c, d and e in one new §0.2 table in the form of items 8–31's rows (rule, landing, clause map; one row per item 32–72 and 101), with item 20's existing row carrying (h) and the dossier port (items 73–88) because both refine item 20, and to add one plain-words paragraph after the summary's last one — which names the summary's two phrases it supersedes, the bent cut "measured from Neighbourhood's recordings" and the effort figure, for folding in place by the repair round under canon R11 — over rewriting the summary, because the pass's guard forbids its editors a REPLACE of the title block and the summary (J-A28.02's precedent), and over one row per d item, because items 73–88 are one mechanism (the port and its seam) whose home rows §7.7 items 12–16 and §14 already give (§0.2, the summary). |
| J-A33.01 | Chose to name the bent cut by build in every scope place that cites it — D-16 and §1.4's block-fabric row "NG 1.2.2's bent cut, its mechanism restated", §1.3 "NG 1.2.2's bent-cut infill (MFCG 12710731 and VG 1.6.9 cut straight first)" — over the former "NG's bent cut with the measured construction" and "MFCG/NG's bent-cut infill", because the evidence gate requires every "the reference does X" sentence to name its build and the code shows two versions of the bisector (MFCG 12710731 and VG 1.6.9 prefer an unbent line where one fits; NG 1.2.2 always bends, then flattens a shallow bend), while §4.6 now restates NG 1.2.2's mechanism rather than a measured construction (D-16, §1.3, §1.4). |
| J-A34.01 | Chose to re-fit the plot-depth rows and regime floors behind §4.6 step 1's stop test at M-1, under the per-face threshold's reading, before any block band is signed, over keeping the rows calibrated for the former single threshold, because the rows now bound a range from which each face draws its own threshold (skewed toward the shallow end) rather than a single cut-off, so the same numbers would give smaller blocks; D-19's rows change meaning, and no row has been signed yet (§16, §13.5). |
| J-A37.01 | Chose to make M0 (b)'s comparison with NG's distributions on the same faces the check of the adopted corner-first rule and the place where `cut.flattenM` is calibrated, over measuring the far-side fallback the design had, because NG's measured statistics come from the corner-first rule and leaves no fallback to measure (J-A37.41), while the flatten height is the one new value the recipe's step 5 adds (§16). |
| J-A41.01 | Chose to keep NG 1.2.2's measured bent-cut statistics as §13.5's targets, prefixed as measured outputs of its mechanism and measured on ours in the same frame, and to add a fillet-share bar (± 0.05 of the share NG shows on identical face shapes; the restated rule expects 209.9 fillets among NG's 378 recorded corners, against 200 observed), over withdrawing the numbers because the generative law changed, because a statistic of a mechanism stays a valid target when both sides are measured the same way and only the draws that produce it changed; no golden exists before M1 (D-24), so no shift is declared (§13.5, §16). |
| J-A41.02 | Chose to state the bars of the code-reading items as one group in §13.2 — T34-1 – T41-1 for the bent cut, T43-1 – T44-1 for the plots (seat B's texts), T45-1 – T47-1 for walls, gates and districts, T54-1 and T55-1 for drawing and labels, T57-1 for the hinterland — over leaving them to the owner-rule group that follows, because §13.2 is one subsection with one REPLACE owner and the owner-rule, port and toolkit bars arrive as their own appended group; each group then states each bar once (R9) (§13.2). |
| J-A47.01 | Chose to state item 47's growth-rate bar — districts seeded at a gate, the castle or a bridgehead have a median area below the town's median district area on ≥ 90 % of B-CITY seeds — as a conformance bar in §13.2 (T47-1), over a §13.5 row, because it compares our districts with our own town's median, which no `baselines.json` row measures; §13.5's MFCG anchors row keeps the district areas the rates must stay inside (§13.2). |
| J-A48.01 | Chose to describe MFCG's population as six persons for each lot, the total rounded up at its second significant digit (its "buildings" are its lots; trace key D1) in §13.5, §1.4 and Appendix A, over the fitted "≈ 6.12 persons per building", because the code states the rule the fit approximated, and to keep our roster-first population (O7), with the multiplier recorded as a weakness row (§13.5, §1.4, Appendix A). |
| J-A49.01 | Chose to withdraw every FTG figure read from its payload's ground-cover patches — the "441 m² in every class" of §13.5's blocks and plot-area rows and of §1.4's blocks-to-plots row, and "containment 53 %" in §1.4's districts row — our own plot bars standing as C rules, and to keep the share of buildings outside every district ring (49 %), cited to `_critic-ftg.md` F4 (row 16) alone, over deleting it as the item proposed, because Fable's evidence gate found that figure a count of buildings against the decoded district rings (1 426 of 2 798 inside), not a lawn-patch figure, and REJECTED its deletion (critic R10 binds the rest) (§13.5, §1.4). |
| J-A50.01 | Chose to make §13.5's entrance row class C — "100 % on the access edge", the owner's rule of item 29 — and to withdraw FTG's measured 2.99 m, which the FTG client of the 2026-09-25 capture uses as its night-light anchor (no door is sent), and to write "neither MFCG nor FTG models a door" in the entrances-and-basements row with MFCG 12710731's side stated as an inference from its full read, over keeping a P-class target of 2–4 m, because a light anchor is no evidence for a door; this supersedes J-A29.01's clause keeping "§13.5's FTG entrance row as the main entrance's target", and T29-4 now reads the C row (§13.5, §13.2). |
| J-A62.01 | Chose the provenance form `ref:⟨reference and build⟩ ⟨behaviour⟩ (code)` followed by its trace key — a P-id, or a D-id for a descriptive baseline, rows of the reader-tier table `research/findings/code-impact.md` §(d), which names the reference's class — for every behaviour read in compiled code, and to add to (8) the code-read mechanisms with their restatement scripts kept research-side, over citing the reading's section or the class in the design, because the class is a reference identifier the clean room keeps out of this document, the digest and `plat/` (gate (c)), while the P-id keeps every such default traceable to its build and reading (critic R5, R9) (§17.1 (6), (8)). |
| J-A63.05 | Chose to price the owner rules of items 63–72 and 20 (h) item by item — 63 +1–1.5, 64 and 65 +1–1.5, 66 +0.5, 67 +1–1.5, 68 +3.5–5, 69 +0.5, 70 +1–1.5, 71 +0.5–1, 72 +2–3, 20 (h) +0.5–1, together +11.5–17 pw — by widening the O9, O10, O11, O12, O17-O19, content and unpriced lines of §16 and carrying each at the milestone that builds it (M1, M2b, M3a, M3b, M4), over one lump or over leaving the hooks unpriced, because §16's rule is that a pass adding build work prices it with the line that absorbs it, the milestone rows kept equal to the total; item 68's lighting model is priced whole in the base because the owner's staged list does not name lighting (NO-DEFER), while the underground's engines, the evolution engine that schedules Works and the epoch behaviours stay unpriced, by the roadmap; all figures are expert estimates, PLAUSIBLE (§16, D-20). |
| J-A68.05 | Chose, for item 68's scope clauses, to keep D-1's rejection of a WebGL2 reference backend (the CPU light pass is the reference and the GPU only its accelerator under a moving cursor, drawing no mark), to restate D-3's "the `night` preset's lights" as magical lights under the S0 circumstance `magic` (`none` by default) with torches, lanterns and braziers as realism and night as a view choice, and to write in D-19 the owner's own default — the day view with the cursor as its sun, a fixed sun where there is no pointer — leaving which families cast shadows by default to §8.4's ruling and putting that question to the owner in plain words (§0.2's row, the summary), over deciding the ink map's shadows in a scope paragraph, because the default look (J10, D-1, emulation-first) and the owner's cursor-shadow words meet there and §8.4 owns the lighting model (D-1, D-3, D-19, §0.2). |
| J-A69.05 | Chose to cite the owner-opened corpus palette bands by the existing provenance value `corpus` with the evidence "owner-opened corpus palette exception, 2026-09-27 (item 69)", to keep §17.1 (5)'s palette audit to reference palettes only (the bands are targets our own values must land in, never a palette to compare or copy), and to write in D-1 that the look's values follow the targets while the look stays clean ink in MFCG's family, over a new provenance value or a D-1 rewrite, because the owner released exactly these bands, and everything else of the walled-off corpus stays with the staged calibration (§17.1, D-1). |
| J-A72.05 | Chose to re-word D-16, D-10, D-32 and §1.4's districts row for item 72 — districts typed feature-named before placement (J-P1, the emulation baseline) and named and described after it by the identity their lots, powers, trade and economy give them; the three dials reading sector shares, power standings and trade partners as field drivers and never modelling an economy, the J-A16.44 split kept — over leaving "feature-named" as the whole rule, because item 72 refines J-P1 (identities are function names, never social classes) and a delegated decision must not contradict its mechanism (D-10, D-16, D-32, §1.4). |
| J-A73.05 | Chose to price the dossier port by its plan's line-by-line estimate (`research/sf/PLAN.md`, its section 5): +4.5–6 pw — M1 +1.5 / +2 (the host-input contract +1 on O11, the fixtures and B-DOSSIER-lite +0.5–1 on the rig), M2b +0.5 (content), M3a +2 / +3 (the absorb half +1–1.5 on O10, +0.5–1 on O11, the absorb pairs +0.5 on the rig), M4 +0.5 (the lapse threshold and the rung at an epoch, on the unpriced line) — over a separate port line, because each piece extends a mechanism a line already prices, and the host wiring, the realm block's supply and item 88's behaviour stay unpriced as the SettlementForge stage's (§16). |
| J-A101.05 | Chose to price the authoring toolkit at +3.5–5.5 pw — M2a +1–1.5 (T9–T10 on the canvas with the dry run's ghost, count badge and variations on the app line, the first session of the first-five-minutes test on the rig), M3a +2–3.5 (the sugar events and points forms on O9, the skeleton file and the clerk's tool API on O11, T2–T8, the handles and the underlay on the app line), M3b +0.5 (T11's leader switch and region groups on O12) — and to name it in §1.4's editing row as the differentiator the tool survey found (a describe-to-map clerk that returns an editable skeleton, never a picture), over a separate toolkit line, because nearly every declaration is an existing event and the new work is packaging, the file, the API and the interaction contract; the built-in clerk and plots on a bridge deck are staged by the item and unpriced (§16, §1.4). |
=== END ===
