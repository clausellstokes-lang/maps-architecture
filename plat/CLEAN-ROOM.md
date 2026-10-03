# CLEAN-ROOM.md — the clean-room rule and the seat ledger of `plat/`

This file is the record §17.1 (7) asks for: the rule, the seat ledger, the implementer digest checker's reports and the
deny-list's generation record. It lives at `plat/CLEAN-ROOM.md`, where the build's standing instruction tells every seat
to sign it (the design's text names `plat/docs/CLEAN-ROOM.md`; the choice and its reason are row C-0002 of
`docs/build/choices.md`). Every seat that writes or checks anything in `plat/` appends one ledger row **before** its work
lands. Rows are append-only: a correction is a new row that names the row it corrects.

## 1 The rule (binding; §17.1 (1)–(8), stated in our own words)

1. **Two kinds of seat.** A *research seat* (reader, measurer, digest writer, baseline maker) may read the research
   trees. An *implementer-side seat* — anyone who writes or checks code, tables, style sheets, content, assets, tests,
   build specs or tooling in `plat/` — may read only:
   * `docs/ARCHITECTURE.md`, `docs/volumes/INDEX.md` and the design volume or volumes its milestone builds (M0 builds
     none);
   * the implementer digest in `plat/docs/digest/` (empty until M-1 delivers it);
   * the `plat/` tree itself;
   * published algorithm papers and textbooks, and the public documentation (and, for the vendored scan of §6.5 (4),
     the published source) of the libraries `plat/` adopts.
2. **Never opened, listed, grepped or searched by an implementer-side seat** — not even to look up a citation:
   `research/`, `captures/`, `reference/`, `partitioned/`, `profiler/`, `docs/confidence/`, `docs/improvements/`,
   `docs/CONFIDENCE.md`, `docs/IMPROVEMENTS.md`, `docs/fable-review/`, `docs/retrovalidation/`, `docs/validation/`
   (the review records), `docs/design/`, and every findings, critic or red-team file wherever it lies. A citation in
   the design that points into them is there for traceability only; the seat does not follow it. A design paragraph
   that says "starting from" a research script (for example §12.4's site-and-fields spike) is built from the design's
   own statement of the mechanism instead.
3. **No other settlement generator's code** — no TownGeneratorOS (GPL-3), no FTG module, no captured bundle, no
   other generator — is read, ported or paraphrased. Published algorithms are implemented from their published form,
   and the ledger row names which (§17.1 (8)).
4. **The repository boundary (§17.1 (3)).** No import specifier, fixture path, script path or build input in `plat/`
   may resolve outside `plat/` (symbolic links resolved); the lint of `tools/lint/` enforces it in the PR tier.
5. **Reference numbers only through committed numbers-only files (§17.1 (4)).** Reference measurements reach `plat/`
   only as `packages/testkit/baselines/baselines.json` rows and the other numbers-only files §17.1 (4) names, each
   committed with its crossing record after `plat baselines check`; nothing in `plat/` reads a capture.
6. **Creative content is never reused (§17.1 (5)–(6)).** No reference word list, grammar, palette, building table,
   texture or asset; every table cell carries an honest provenance (`own`, `ref:⟨reference⟩ ⟨behaviour⟩` with the
   `(code)` form and P-id where the design gives one, `owner`, `architecture ⟨date⟩`, …); every file under `plat/assets`
   names the script that made it or its licence. From M1 the content scanner of `@plat/testkit` runs over `plat/` with
   the hashed deny-list M-1 builds.
7. **Permissive dependencies only (§17.4).** Every runtime library is pinned exactly, vendored in `plat/vendor/`,
   scanned by the determinism allowlist and credited in `THIRD-PARTY-NOTICES.txt`.
8. **Honest records.** A seat that reads something outside rule 1 by accident stops, records it here with what it
   saw, and uses none of it; the checker of its work decides whether the work must be redone by another seat.

## 2 Seat ledger

| # | seat (lane key / model) | date | role | what it read (files, sections; papers and library docs) | notes |
|---|---|---|---|---|---|
| L-0001 | build/m0-spec (Opus) | 2026-10-03 | implementer-side: the M0 build spec (no code) | `docs/ARCHITECTURE.md`: lines 1–520 (the one-page summary, §0, §1 with §1.7's stack table), §2.1–§2.2, §2.8's head (Identity, Lifecycle, records), §3 whole (§3.1–§3.11), §4.1, §4.2 S1 (1)–(3), §4.3's lattice, routes and smoothing, §4.4 S5a's head, S5b–S5d, the regimes table and the fusion gate, §4.5's perimeter and grower, §4.6 whole, §5.1, §6 whole (§6.1–§6.5), §12.1–§12.4 and §12.10, §13's head, §13.1, §13.2's head and its bent-cut tests, §13.5, §13.8, §13.9, §14 whole, §16 whole, §17 whole; `docs/volumes/INDEX.md` §2–§5 (the M0 and V-M0 lines); `plat/docs/build/open-design-findings.md`; the npm registry's public metadata (versions, licences, dependencies) of the adopted libraries and the tooling; the published tarballs of `robust-predicates` 3.0.3, `flatbush` 4.6.2, `flatqueue` 3.1.0, `delaunator` 5.1.0, `d3-delaunay` 6.0.4 and `simplex-noise` 4.0.3, scanned by script for their `Math` members only (the §6.5 (4) probe; no other reading) | Incidental read, recorded under rule 8: the last five lines of `docs/lane-events.log`, read once to learn the CHECKPOINT line format before appending to it; they summarise other lanes' validation work; nothing from them is used. No citation into the research side was followed (§12.4's "redteam-scale §7's scripts" among them). Egress probes only (no content): the Playwright browser CDN, `www.netlib.org` and `prng.di.unimi.it` are refused by this container's egress policy; `registry.npmjs.org` and `raw.githubusercontent.com` answer. |

| L-0002 | build/m0-spec (Fable, on the owner's Mac — §12.1's reference machine) | 2026-10-03 | implementer-side: continued the M0 build spec (no code); wrote `docs/build/M0.md`, `docs/build/M0-work.json`, choices rows C-0025 – C-0049 | `docs/ARCHITECTURE.md`: the heading map (a grep of the file for its headings), §16 whole, §1 whole (§1.1–§1.7), §2.1–§2.4 and §2.5's head (`District` … `Plot`), §2.7's head (`Enceinte`, `Gate`, `Tower`, `Castle`, `Bridge`, `RaisedWayRecord`'s head), §2.8 whole, §3 whole (§3.1–§3.11), §4.1 whole, §4.2 S0–S3 whole, §4.3 whole, §4.4 whole, §4.5 whole, §4.6 whole, §4.7's class-floor and granularity rows, §4.8's head (the trace, strips, gates, towers), §4.12 and §4.13 whole, §5 whole (§5.1–§5.4), §6 whole, §12 whole, §13's head, §13.1 whole, §13.2's head (invariants, statistics, cost-model, document, contract and property tests, B-EDGE) and its bent-cut tests (T34-1 – T41-1), §13.3 whole, §13.5 whole, §13.6 (2)'s `H32` definition, §13.7 whole, §13.8 whole, §14 whole, §17 whole; a grep of the file for every "M0" mention and for `H32`, `RH32`, `Seed`, class floors and the §2.7 record names; `docs/volumes/INDEX.md` whole; `plat/CLEAN-ROOM.md`, `plat/docs/build/choices.md`, `plat/docs/build/open-design-findings.md`; the npm registry's public metadata (`latest` versions and licences of pnpm, typescript, vitest, fast-check, esbuild, eslint, typescript-eslint, robust-predicates, flatbush, delaunator, simplex-noise, clipper2-wasm, polygon-clipping, tsx, playwright-core) and `playwright-core`'s published `browsers.json` for releases 1.52.0 – 1.64.0 (unpkg) | Machine facts probed (receipts in the lane log): `sysctl` 8 cores (4P + 4E), 16 GB; macOS 14.7.8; Node 24.12.0 arm64 and its x86_64 slice under Rosetta 2 (`process.arch` `x64`, same V8); Apple clang 16; corepack 0.34.5; no `pnpm` on PATH; Playwright cache chromium 1223 / 1243, firefox 1522, webkit 2251; AC power; 2.6 GB free. **Egress probes (HEAD only, no content):** `registry.npmjs.org`, `nodejs.org`, `www.netlib.org/fdlibm/` and `prng.di.unimi.it` answered 200; the Playwright CDN answered (a redirect), unused since the cache holds the builds — this supersedes L-0001's egress note. Incidental reads under rule 8: `docs/lane-events.log` was grepped for this lane's own key only (its CHECKPOINT lines) and appended to; the root `.gitignore` was read for its patterns (it names research directories, no content). No research file, capture, finding or reference bundle was opened, listed or searched; no citation into them was followed. No code from any other generator was read. |

## 2a What L-0002 changes in L-0001's note

L-0001's egress clause ("refused by this container's egress policy") described the cloud container; on this machine every named host answers (above). Rows are append-only, so L-0001 stands as history and L-0002 carries the current fact.

## 3 The implementer digest checker's reports

None yet. The digest (`plat/docs/digest/`) is M-1's (§16, §17.1 (2)); each digest change lands here with its checker
seat's report (0 code excerpts, 0 reference word lists, palettes or tables, 0 deny-list hits).

## 4 The deny-list's generation record

None yet. M-1 builds the hashed deny-list research-side (§17.1 (5)); its record (date, sources, counts — never the
tokens) is entered here when it crosses into `plat/`.

## 5 Published algorithm sources read by implementer seats (§17.1 (8); choices C-0029)

One row per published file a seat reads or compiles: the algorithm, the URL read, the file's SHA-256, the date, the
seat, and what was made from it (a port, known-answer vectors). Reference generators never appear here (rule 3).

| # | algorithm (its published form) | URL | SHA-256 | date | seat | made from it |
|---|---|---|---|---|---|---|
| (none yet — M0-d-03 enters fdlibm 5.3's files, M0-d-01 xoshiro128\*\*'s, M0-d-02 MurmurHash3's verification procedure) | | | | | | |
