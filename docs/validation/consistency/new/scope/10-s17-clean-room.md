## §17 Clean-room and legal posture; third-party licences

*In plain words.* We never copy or port the references' code (the 2017 open-source ancestor is GPL and the live builds
are proprietary); we re-implement published ideas and the behaviour we measured. Their name lists, palettes, building
tables and textures are their creative content and are never reused; ours are written fresh. The people who write the
product read only this document and a cleaned digest of the research, never the research itself; the product lives in
its own folder that cannot reach the research folders; reference numbers reach the tests through numbers-only files;
and a scanner stops the build if a reference word list, palette or table turns up. Every library has a permissive
licence, is pinned and is credited in a generated notices file, so the owner can choose any licence for our own code.

### 17.1 The clean-room chain (IMP-1; D-29)

1. **Who reads what.** *Research seats* (readers, measurers, the digest writer) may read the findings, `captures/`,
   `research/` and — under the standing ruling — `reference/`. *Implementer seats* (anyone writing code, tables, style
   sheets, content, assets or tests in `plat/`) read only `docs/ARCHITECTURE.md`, the implementer digest in
   `plat/docs/digest/`, the `plat/` repository, published algorithm papers and the public documentation of adopted
   libraries; they never open `research/`, `captures/`, `reference/`, the findings, the critics, `docs/confidence/`,
   `docs/improvements/`, `docs/CONFIDENCE.md`, `docs/IMPROVEMENTS.md` or the red-team files. The citations in this
   document are for traceability; an implementer follows them only into the digest. No code from TownGeneratorOS
   (GPL-3), the FTG Foundry module or any captured bundle is read for implementation, ported or paraphrased.
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
   fix-all pass in its integration log, an amendment pass in `docs/validation/amendments-applied.md` and
   `amendments-repair.md`). From M-1 the hashed scan of (5) — whose list sets do (vi)'s work on salted digests — also
   runs over this document and replaces (i)–(iii) and (vi); (iv) and (v) stay. The checks' executed calibration is
   recorded in `docs/validation/bench/fixall_scope_r4_cleanroom.out` and `fixall_scope_r5_checks.out` (history:
   `docs/ARCHITECTURE-RATIONALE.md`).
3. **The repository boundary.** The product is its own repository, `plat/`, at the root of this folder, outside
   `research/`, `captures/` and `reference/`. A PR-tier CI rule fails any import specifier, fixture path, script path or
   build input that resolves outside `plat/` (symbolic links resolved). The product's CI never reads the research trees.
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
   audit: a shipped palette with three or more colours within ΔE2000 2 of one reference palette fails and is redesigned.
   Every file in `plat/assets` names the script that generated it or its third-party licence (fonts); a file with
   neither fails the build.
6. **Honest provenance.** Every table cell's provenance names where its number came from: `own`, `ref:⟨reference⟩
   ⟨behaviour⟩` (a measured or stated behaviour of a reference, admissible as a calibration anchor — for example the
   castle's 0.75 compactness gate (MFCG), 40 m bridge spacing and 39 m tower spacing (FTG), NG's lane-width law, Poisson
   k = 50), `owner`, `owner-eye ⟨milestone⟩`, `architecture ⟨date⟩`, `corpus` or `host`. A number that describes a
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
   measurements.
9. **Protocol names.** The host bridge's vocabulary is our own (§11.3): the concurrency token is `logHead` (§2.9),
   carried as `baseLogHead` and `currentLogHead`; time is the view key `time`, set by `view.set`, and the simulation
   module advances it with its own command `sim.advance { hours }` (§10.3, §11.3). Schema-level ideas — an event /
   command split, an optimistic-concurrency token — are admissible as ideas; the FTG module's message, command and field
   names are not reused, are in the deny-list, and occur nowhere in this document (check (i) of (2)).

### 17.2 Fonts (IMP-15)

Fonts are third-party assets under the SIL Open Font License and sit outside the clean-room rule: they are neither the
references' code nor their creative data. The default label face is IM FELL Great Primer (OFL) — the face of MFCG's
labels and part of the ink look the owner adopted (D-1); clean-room distance applies to the references' code and
content, not to a public OFL font (J-S15). EB Garamond and Cinzel ship as alternatives. Fonts ship unmodified; CI reads
each face's name table and refuses to subset a face that declares a Reserved Font Name; the OFL text ships in the
notices file. Label metrics are read from the bundled files (§9.2). The bundled faces are TrueType-flavoured (`glyf`),
whose outlines SVG's default text writes (§11.1); when the default face lacks `smcp`, the family's OFL small-caps cut is
bundled unmodified beside it (§9.2); an SVG export may embed a face unmodified as a data URI (§11.1). CI checks all
three (§9.2).

### 17.3 Our own licence (D-22; DEF-14)

Until the owner chooses, the `plat/` repository is **proprietary: "Copyright © the owner. All rights reserved."** in its
`LICENSE` file, with no open-source licence — the most option-preserving default, since the owner can later publish
under any licence by one act while an open licence once granted cannot be withdrawn (J-S10); flagged for the owner's
veto. What keeps every choice open: permissive-only dependencies checked over the production closure (§17.4); nothing
copyleft linked or bundled; the notices file; the clean-room chain (§17.1); every file written by the program's seats
for the owner, and no outside contribution without the owner's written assent.

### 17.4 Dependencies (IMP-14)

* **Checker.** The allowlist — MIT, ISC, BSD-2 / 3, Apache-2.0, BSL-1.0, CC0, Unlicense, OFL (fonts) and Sun's fdlibm
  notice — runs in the PR tier over the **transitive production closure** of every shipped bundle (library, embed, app,
  CLI). Dev-only dependencies are listed exceptions, each with its reason: `@resvg/resvg-js` (MPL-2.0), Playwright and
  its downloaded browsers (MPL / LGPL components), axe-core (MPL-2.0), the oracles, the validators and the spell-check
  dictionary; Inkscape and QGIS are GPL programs that CI runs as external tools and never links.
* **Notices.** CI generates `THIRD-PARTY-NOTICES.txt` from the production closure (name, version, licence text,
  copyright lines) plus the fonts' OFL text and the fdlibm notice; every bundle ships it, and the minifier keeps `/*! */`
  banners.
* **Pins.** Exact versions in every `package.json` with the lockfile committed; no prerelease in the production closure;
  an upgrade is a reviewed change that re-runs the checker, §6.5 (4)'s allowlist scan of the vendored sources and the
  goldens. Every adopted runtime library is vendored at its pinned version into `plat/vendor/` and scanned by the
  determinism allowlist, with an audit record kept in `@plat/kernel` (§6.5 (4)).

| dependency | licence | use | status |
|---|---|---|---|
| `robust-predicates` 3.0.3 | Unlicense | `incircle`; the adversarial `orient2d` reference in tests | adopt, pinned |
| booleans, buffers and bands on the arrangement | ours | §3.7 | built |
| straight skeleton with its validator | ours | roofs, label spines (§3.8) | built |
| `dmath` | our TypeScript port of the fdlibm 5.3 routines the model needs (netlib's sources), carrying Sun's notice — no `@stdlib` closure | deterministic transcendentals | built |
| Clipper2 (`clipper2-wasm` 0.4.0) | BSL-1.0 | CI oracle for booleans and buffers (§3.7) | dev (shipped only in §3.7's pre-decided fallback) |
| `polygon-clipping` 0.15.7 | MIT | CI oracle | dev |
| `delaunator`, `d3-delaunay` | ISC | site sampling, medial axes | adopt |
| `earcut` | ISC | triangulation (fields, glTF and CityJSON meshes) | adopt |
| `flatbush`, `rbush` | ISC, MIT | spatial indices | adopt |
| `simplex-noise` | MIT | noise base (our seeding, fBm, warp) | adopt; determinism checked by the vendored scan |
| `d3-contour` | ISC | marching squares for render-tile contours | adopt |
| `cbor-x` | MIT | the compact twin | adopt |
| `zod` | MIT | schemas | adopt |
| `@napi-rs/canvas` 1.0.9 | MIT | the Node CLI's PNG export | adopt (optional, CLI only) |
| `fast-check`, `vitest`, Playwright, `pixelmatch`, `ssim.js`, Vite, `esbuild`, `tsx`, pnpm, TypeScript | MIT / MIT / Apache-2.0 / ISC / MIT / MIT / MIT / MIT / MIT / Apache-2.0 | tests and build | dev |
| axe-core | MPL-2.0 | accessibility tests (§13.4) | dev, never shipped |
| `@resvg/resvg-js` | MPL-2.0 (file-level copyleft) | headless SVG rendering in CI | dev, never shipped |
| OFL fonts: IM FELL Great Primer (default), EB Garamond, Cinzel | SIL OFL 1.1 | label and title faces | style assets, unmodified (§17.2) |

Nothing GPL, AGPL or LGPL is linked or bundled; CGAL is excluded (its straight skeleton is GPL). Boost.Geometry is
BSL-1.0 with no GPL parts; it is not used.
