# `packages/testkit/baselines/` — the numbers-only crossing files

This folder holds the reference numbers that cross into `plat/` (§17.1 (4)), each committed by M-1's research-side
lane and countersigned by an implementer-side checker seat that reads only the file (C-0071, C-0092, C-0120). At M0 it
holds this README and `crossings.json`; three files arrive here:

| file | what it holds | read by |
|---|---|---|
| `baselines.json` | §13.5's `Baseline` rows: our measurements of the references, numbers and provenance only (a JSON array of rows, or an object whose `rows` member is that array) | the parity CLI, `corepack pnpm parity -- --ours <file>` (M0-k-05) — it reads this file and our side's file only, and stops (exit 2, no report) on a missing file, an unreadable row, a file of no row, an our side of no entry or no seed, or a run whose every row reads `missingBaseline` or `notApplicable` (§13.5, §13.8 *Edges*; C-0068, C-0186) |
| `ng-faces.json` | NG's recorded hood outlines and faces in schema `plat.ng-faces/1` (C-0043, C-0086; attachment B of `docs/build/checks/M0-handoff-M1.md`) | `loadNgFaces` (M0-k-05), for M0-b-05b and M0-c-07b |
| `denylist.json` | the clean-room deny-list, salted digests only, format `plat.denylist/1` at `normalisationVersion` 1 (C-0101; attachment C) | the content scanner, `corepack pnpm scan` (M0-k-06, M0-k-07) |

`crossings.json` is a JSON array of `CrossingRecord`s, `[]` until the first crossing, append-only:
`{ file, sha256, rows, date, checks, checkerSeat, statement }` — `file` the path relative to `plat/`, `sha256` the
file's lower-case SHA-256, `rows` its rows (`baselines.json`), faces (`ng-faces.json`) or digests (`denylist.json`),
`checks` the ids the check ran, `checkerSeat` the countersigner's `CLEAN-ROOM.md` ledger row id (C-0092 (3), C-0120).

**How a file crosses** (C-0120): only while a build or AFTER-M-1 wave is open, and only after M0-k-05 has landed. The
research seat places the file here; the countersigning checker seat signs its `CLEAN-ROOM.md` §2 row, runs

    corepack pnpm baselines:check -- packages/testkit/baselines/<file> [--previous <file>]

(`--previous` names the version an earlier record names, for C4's append-only rows), reads the report — C1 – C7 for
`baselines.json` and `ng-faces.json`, C1 and C3 for `denylist.json`, C8 – C10 named as not run at M0 — appends the
record the report proposes with its date, ledger row id and statement, and runs the check again: it passes only when
every check passes and the record names the file's sha256. A missing or stale record fails the check. A row is never
edited or deleted: a new reference build or metric version adds a row that `supersedes` the old one (§13.5 *Edges*).

Nothing here is ever written by a test: the tests of `@plat/testkit` and the bench build their synthetic files in
memory or write them under the OS temporary folder, and the bench tests' committed fixtures lie under
`bench/test/parity/fixtures/` and `bench/test/baselines-check/fixtures/`.
