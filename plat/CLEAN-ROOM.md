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

## 3 The implementer digest checker's reports

None yet. The digest (`plat/docs/digest/`) is M-1's (§16, §17.1 (2)); each digest change lands here with its checker
seat's report (0 code excerpts, 0 reference word lists, palettes or tables, 0 deny-list hits).

## 4 The deny-list's generation record

None yet. M-1 builds the hashed deny-list research-side (§17.1 (5)); its record (date, sources, counts — never the
tokens) is entered here when it crosses into `plat/`.
