# vendor/ — the third-party code that runs inside PLAT

Every runtime library PLAT ships is copied here at one exact version, so the bytes we scan are the bytes that run
(§17.4, §6.5 (4); choices C-0010, C-0011, C-0040, C-0052, C-0055).

## What is here

| folder | licence | why it is here |
|---|---|---|
| `robust-predicates@3.0.3/` | Unlicense | `incircle`, and the adversarial `orient2d` reference in tests (kernel adapter `src/adapters/robust-predicates.ts`) |
| `flatbush@4.6.2/` | ISC | the static spatial index (kernel adapter `src/adapters/flatbush.ts`) |
| `flatqueue@3.1.0/` | ISC | **flatbush's own dependency** (its nearest-neighbour search); no PLAT code imports it — our Dijkstra / A\* heap is our own (C-0040, C-0052) |
| `delaunator@5.1.0/` | ISC | Delaunay triangulation for the sampled medial axis (kernel adapter `src/adapters/delaunator.ts`) |
| `simplex-noise@4.0.3/` | MIT | the noise base, always called with our seeded source (kernel adapter `src/adapters/simplex-noise.ts`; noise is the kernel's, §14, C-0065 — `@plat/site` and `@plat/layout` read it through `@plat/kernel`) |
| `patches/` | — | our edits to the libraries above, as exact find-and-replace specs with expected counts |
| `vendor.lock.json` | — | per library: the registry tarball's integrity, the package.json edits, the patch spec and its hash, and the sha256 of every vendored file (the pre-patch hash of each changed file too) |

Later items add two folders of published C sources that are **ported**, never run: `fdlibm-5.3/` (M0-d-03; Sun's
notice goes in `fdlibm-5.3/NOTICE.txt`, which `tools/notices/generate.mjs` copies into `THIRD-PARTY-NOTICES.txt` in
place of the placeholder — M0-d-03 regenerates that file with `corepack pnpm notices`, C-0095) and `xoshiro/`
(M0-d-01). Their URLs and SHA-256 are entered in `CLEAN-ROOM.md` §5. They are not `<name>@<version>` folders, so
`vendor:verify` does not lock them.

## How a library is vendored

1. Fetch the registry tarball into a scratch folder: `npm pack <name>@<version>`, and compare its integrity with the
   registry's `dist.integrity` (`npm view <name>@<version> dist.integrity`).
2. Run `node tools/vendor/import.mjs <tarball>...` from `plat/`. It unpacks the tarball into `vendor/<name>@<version>/`,
   strips `scripts` and `devDependencies` from its `package.json`, rewrites a dependency on another vendored library to
   `workspace:<version>` (so no second, unscanned copy is fetched from the registry), applies
   `patches/<name>@<version>.json` and records everything in `vendor.lock.json`.
3. Run `corepack pnpm vendor:verify` and the determinism lint's vendored scan.

Each folder is a pnpm workspace member; PLAT's packages depend on it as `"<name>": "workspace:<version>"`, and only the
one adapter file named above imports it.

## The two patches (C-0011)

* `delaunator@5.1.0`: `EPSILON = Math.pow(2, -52)` becomes the literal `2.220446049250313e-16` (bit-identical), in
  `index.js`, `delaunator.js` and `delaunator.min.js`.
* `simplex-noise@4.0.3`: the `random = Math.random` defaults of `createNoise2D/3D/4D` are removed (a call without our
  seeded source throws), and the declarations make `random` required, in the ESM and CommonJS builds and the source.

## Checking

`corepack pnpm vendor:verify` fails, naming the file, when any vendored byte differs from the lock, a file is missing or
extra, a patch is not applied, or a folder has no lock entry. It runs in the PR tier.
