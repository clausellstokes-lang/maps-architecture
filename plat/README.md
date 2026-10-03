# PLAT

PLAT is an original generator of settlement maps — villages, towns and cities drawn from a seed and a few choices, and
later edited by hand or by an assistant. Its design is `docs/ARCHITECTURE.md` (one folder up) and the design volumes
listed in `docs/volumes/INDEX.md`. This folder, `plat/`, is the product's code. It is being built milestone by milestone;
**right now it is at M0**, the "risk retirement" milestone: the geometry kernel, the determinism machinery and four
spikes that prove the hardest parts work and are fast enough (§16). The plan for M0 is `docs/build/M0.md`; every choice
the builders make where the design leaves a case open is one row of `docs/build/choices.md`.

## What is in here

| folder | what it is |
|---|---|
| `packages/kernel` | `@plat/kernel` — geometry in integer centimetres: exact predicates, the arena of faces and edges, transactions, booleans and buffers, the straight skeleton, deterministic maths (`dmath`), seeded noise, the random-number streams, the hash functions and the geometry digests |
| `packages/model` | `@plat/model` — the town's records, identities and the model digest |
| `packages/tables` | `@plat/tables` — the rule tables (JSON, every number with its unit and where it came from) and their loader |
| `packages/site` | `@plat/site` — the land: terrain, rivers, water |
| `packages/layout` | `@plat/layout` — the town's layout: gates and main roads, growth, districts, fields, the block cutting |
| `packages/testkit` | `@plat/testkit` — test tools: random and hand-made test shapes, reference checkers, measurements, the clean-room content scanner; never shipped, and its third-party tools (the two reference checkers, fast-check, Playwright) are development-only dependencies |
| `bench` | `@plat/bench` — timing and calibration, the test tiers, and the spike harnesses; run, never imported |
| `vendor` | the five third-party libraries PLAT ships, copied in at exact versions with our two small patches (see `vendor/README.md`) |
| `tools` | build helpers: the lint plugin (`tools/lint`), vendor checks, the notices generator, test setup |
| `scripts` | the build, lint and bench entry points behind the commands below |
| `docs/build` | the M0 plan, the choices log, checker reports; `docs/digest` will hold the research digest (M-1's) |

Each package's `src/index.ts` re-exports one folder per piece of M0 work; each folder starts empty and is filled by the
work item that owns it (`docs/build/M0-work.json` says which).

## Building and testing on the reference Mac

This Mac (MacBook Air M1, macOS 14, Node 24.12) is the design's reference machine. pnpm is **not** installed globally:
the workspace pins it (`"packageManager": "pnpm@10.34.6"`) and every command goes through Node's built-in `corepack`,
which fetches that exact pnpm once.

```sh
cd plat
PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 corepack pnpm install --frozen-lockfile   # or: corepack pnpm install:frozen
corepack pnpm build          # type check everything (tsc -b), then one bundle per package in packages/*/dist/
corepack pnpm test           # every test, one vitest project per package plus the tools
corepack pnpm lint           # ESLint with the determinism rules (they land with work item M0-d-07), then the whole-tree checks
corepack pnpm vendor:verify  # the vendored libraries still match vendor/vendor.lock.json, byte for byte
corepack pnpm notices        # regenerate THIRD-PARTY-NOTICES.txt and run the licence check
```

* `corepack pnpm test --project kernel` runs one package's tests.
* Property tests run `PLAT_FUZZ_RUNS` cases each (10 000 when unset — the pull-request size; the nightly tier sets
  1 000 000). `PLAT_FUZZ_SEED` fixes the random seed to replay a failure.
* `corepack pnpm bench -- <harness>` runs a bench harness (`calibrate`, `fusion`, `site`, …); `bench:calibrate`,
  `bench:timing-phase` and `tier:pr | tier:nightly | tier:milestone` are shortcuts. A harness not built yet exits 2
  with `not built: <work item>`. Bench output goes to the folder named by `PLAT_BENCH_OUT` — on this Mac, the session's
  scratchpad `build/` folder, never inside `plat/` — and no harness reads its inputs from there (inputs live inside
  `plat/` or are passed in memory).
* `corepack pnpm browsers:check` launches the three cached Playwright browsers once (no download).
* Timings count only when taken in the timing phase with nothing else running on the machine; any other timing is
  marked *contended* and never decides anything (`docs/build/choices.md` C-0025, C-0047).

Every command starts with `corepack pnpm`, and `npm install` is never run here: one package manager, one lockfile,
one store.

## The clean-room rule

PLAT is written without looking at any other map generator's code or data. People and agents who write or check
anything in `plat/` read only the design (`docs/ARCHITECTURE.md`, `docs/volumes/INDEX.md`, the volumes their milestone
builds), this folder, the research digest in `docs/digest/` once it exists, published papers and the public
documentation of the libraries we adopt. They never open the research folders (`research/`, `captures/`, `reference/`
and the review records listed in `CLEAN-ROOM.md`). Reference measurements reach the tests only as numbers-only files
committed into `packages/testkit/baselines/`. Nothing in `plat/` may import, read or build from a path outside `plat/`.
Every seat signs the ledger in `CLEAN-ROOM.md` with what it read. The full rule is `CLEAN-ROOM.md` §1 and the design's
§17.

## Licence

Proprietary — see `LICENSE`. Third-party code PLAT ships is listed with its licence in `THIRD-PARTY-NOTICES.txt`.
