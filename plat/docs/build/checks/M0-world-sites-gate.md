# Check — the M0 close gate's world, sites and hydrology rows (lane `check/M0-world-sites-gate`, 2026-10-17)

Lane `check/M0-world-sites-gate` ran on Fable 5.1 in Claude Code, in a Claude Code cloud container: Linux x64,
Intel Xeon @ 2.80GHz, 4 CPUs, 16 GiB (`tools/machine_profile.py --id`:
`linux:Intel(R) Xeon(R) Processor @ 2.80GHz:4cpu:16gib`). The container's own Node is 22.22.0, which the workspace's
`engines` field refuses; the seat fetched the README's Node 24.12.0 (the official linux-x64 tarball, its SHA-256
checked against `SHASUMS256.txt`) into the session scratchpad and ran every workspace command through it. Nothing
under `plat/` was timed.

This seat is an implementer-side checker under `plat/CLEAN-ROOM.md` §1 (ledger row L-0558). It verified every row of
`plat/docs/build/M0-world-sites-gate.md` against the code and wrote six test files under
`packages/kernel/test/gate/`; it changed no file under any `src/`.

**Spec read (whole):** `plat/docs/build/M0-world-sites-gate.md`. **Design read (named sections only):**
`docs/ARCHITECTURE.md` §3.4 *Transient arenas* (lines 4951–4995), §2.6 *Heights and the ground datum* (1703–1730)
and its water-table paragraph (1908–1918), §2.9 *View state* (4150–4165, 4250–4258), §8.2's symbolisation head
(13578–13592), §8.4's head (14407–14460); the heading map and greps of §2.6–§2.7 for stair / shaft / ramp / trapdoor.

**Commands run (from `plat/`, Node 24.12.0 on PATH):**

```
corepack pnpm install --frozen-lockfile --engine-strict=false     # the README's frozen install; the flag only because the
                                                                 # first attempt under Node 22 was refused by `engines`
corepack pnpm test --project kernel packages/kernel/test/gate/   # 5 files, 20 tests, all pass (2.6 s)
./node_modules/.bin/eslint packages/kernel/test/gate/            # exit 0
corepack pnpm build                                              # see "Gates" below
corepack pnpm lint                                               # see "Gates" below
```

**Verdict in one line:** the gate holds with these rows carried to M1: K10 (persisted versions), K12 (the commit
journal's stage, scope and reads), M1 (the address namespace), M2 (the carve delta), M4 (the water-table accessor);
K11's fix is a documentation row (fixed-in-M0); every other row is CONFIRMED or PLAUSIBLE (holds on reading, nothing
forecloses, the record or accessor is M1's by design). Verdicts, failures and additions are in the sections below,
one per row, and in the closing table.

---

## Kernel rows

### K1 — `Layer` codes append-only; no path assumes a ground root — **PLAUSIBLE** (tested in part)

**Evidence.** The kernel keeps no layer registry. The vocabulary lives in four places, each closed:
`src/types/ids.ts:14` (`type Layer = 'underground' | 'ground' | 'sky'`), `src/io/format.ts:24–36` (`LAYERS =
['ground', 'underground', 'sky']`, `layerCodeOf` = the index, `layerOfCode` = null outside 0 … 2 — the block header's
code), `src/rng/layer.ts:8–19` (`layerCode`: a switch, ground 0, underground 1, sky 2, a refusal otherwise — the
entity key's and the level digest's code, `digest/levelDigest.ts:772`) and `src/arena/plat.ts:243–246` (`isPlatKey`
names the three). A grep of `kernel/src` for `'ground'` finds one other site: `src/arr/winding.ts:52`, the scratch
overlay's key, "never persisted, digested or keyed into a document" (its comment) — no kernel path reads 'ground' as
a root. The model's `GROUND` (`model/src/identity/lineage.ts:126`) is the town root's arena by design (§6.1), and
`model/src/identity/address.ts:54–68` writes ground addresses bare — recorded under M1, not a kernel assumption.

Append-only holds by construction: both codes are positions (an index, a switch with no gaps), so a fourth layer is
code 3 on both sides and no existing code moves; the header carries the code in one byte at a fixed offset
(`io/encode.ts:377`), and the digest hashes it as one u32 lane. **The gap:** the spec's verification — "append a
fourth value in a test registry; every golden byte-identical" — cannot be written against this code, because there is
no registry to append to and the type is a closed union; a fourth value is a four-site source edit (the four files
above) plus the model's `arenaPrefix` / `parseAddress` (`address.ts:58–66, 95–116`).

**Test** (`test/gate/layers.test.ts`, 5 cases, pass): the two code functions agree on all three layers (0, 1, 2);
code 3 is unassigned on both sides (`layerOfCode(3)` null, `layerCodeOf` and `layerCode` refuse a fourth name,
`isPlatKey` false); one content encoded under the three layers gives three routes chunks of equal length that differ
in exactly one byte, byte 7 (magic 4 + format 1 + kind 1 + role-registry version 1); the level digest reads the code
(three distinct digest sets); a document whose only arena is `underground/0` or `sky/0` encodes, loads under its key
with the maintained digests, digests equal, re-encodes byte for byte, and runs a kernel with no ground arena present
(`resolve`, `view`).

**Classification.** Not a failure — nothing forecloses. **Smallest addition (fixed-in-M0, no exported-API change):**
one frozen `LAYERS` list owned by `types`/`arena`, read by `io/format.ts`, `rng/layer.ts` and `plat.ts:isPlatKey`, so
an append is one row and the test above becomes the spec's append test. Widening the `Layer` union itself is the
exported-type change of the milestone that designs the world layer (M1 or later), to be taken with a choices row.

### K2 — `PlatKey.part` round-trips with independent frames; parts not dense from 0 — **CONFIRMED**

**Evidence.** `createPlat(key, frame, …)` takes the frame per arena (`src/arena/plat.ts:259–295`); the routes chunk
writes the key's layer and part then the frame (`io/encode.ts:377–383`), the decoder reads them back
(`io/decode.ts:98–108`) and refuses a chunk of another key (`decode.ts:274`, "a chunk of another arena");
`isPlatKey` admits any part in 0 … 2³¹ − 1 (`plat.ts:245`); the façade maps keys by `layer/part`
(`facade/kernel.ts:84–105`, `arena/resolve.ts:58–60`); the entity key mixes the part as a u32 (`rng/mixer.ts:132–136`).
No code indexes arenas by part number; `STUB_TABLE` lists multi-part keys as a hook, nothing refused
(`facade/notBuilt.ts:71`).

**Test** (`test/gate/parts.test.ts`, "K2", 3 cases, pass): `ground/0`, `ground/7` and `underground/3`, each over its
own `frameOf` frame (16 ha at 1, 25 ha at 1.25, 9 ha at 0.8): each encodes to ≥ 2 chunks, loads under its own key with
its frame, prints equal and re-encodes byte for byte; the same chunks under either other key are a corrupt cache
("another arena"); the three blocks differ; and against a kernel over all three, every persistent form — `FaceRef`,
`ChainRef`, `EdgeSetRef`, `VertexRef` — and the batch-local `StretchRef` resolves on its part (stamped with that
key, non-empty) and empty on each other part (stamped with that key: the key chooses the arena, the reference embeds
none).

### K3 — `Frame` purely local; no digest hashes an absolute position — **CONFIRMED**

**Evidence.** `Frame` is `{ widthCm, heightCm, aspect, marginShare }` (`src/num/frame.ts:9–16`); `frameOf` centres
it on (0, 0) (`frame.ts:19–21`, "centred on (0, 0) with +y north"); the arena is the frame plus its margin, the range
bound `|x|, |y| < 2²³` (`num/lattice.ts:12–13`). The level digest writes `TAG_LEVEL`, the layer code, the part, the
level and the per-level tree roots (`digest/levelDigest.ts:772–774`); the trees hash lattice coordinates (frame-local
integers), kinds, owners, levels, ordinals and role names (`:252–261`, `:357–361`) — no origin, no offset, no position
outside the frame. The block likewise (`io/encode.ts:396–406`: coordinates as deltas in (y, x) order). The model
digest's `plats` node hashes (layer code, part, five level digests) per arena (`model/src/digest/model.ts:121–128`).

### K4 — Every reference form resolves against a separately supplied `PlatKey`; none embeds one — **CONFIRMED**

**Evidence.** `src/types/refs.ts:16–31`: `FaceRef { owner, level }`, `ChainRef { role, entity }`, `EdgeSetRef` and
`VertexRef { role, entity, ordinal? }`, `StretchRef` — "None carries an arena slot" (its header, rule 5);
`test/types/types.test.ts:47–60` pins the exact key sets. `resolve(p, ref, key)` takes the arena and the key beside
the reference (`src/arena/resolve.ts:202–221`), the façade's `resolve(ref, key)` maps the key to its arena
(`facade/kernel.ts:173–180`); the gate's parts test resolves each form against three keys (K2). **Note for M1:** the
`entity` / `owner` strings are address ids, and the model's address form prefixes an id with its arena off the ground
layer (`model/src/identity/address.ts:1–11, 54–68`); the kernel never parses it (handles are interned strings,
`arena/handles.ts`), so the kernel property holds; the textual coupling is M1's (see M1).

### K5 — Role registry append-only without changing a digest; `LINEAR_PARTS` extensible per transaction — **CONFIRMED**

**Evidence.** `src/arena/roles.json` ("append-only … a new role is a new row at the end with the next id and the new
version in `since`"); `parseRoleRegistry` holds ids dense in row order, names unique, ranks a permutation of
0 … n − 1, `since ≤ version` (`src/arena/registry.ts:50–76`). What a digest reads of a role is its row's `name`,
`kind` and `rank` (`digest/levelDigest.ts:282, 357, 365, 379`), what the block reads is its `id` and the registry
`version` (`io/encode.ts:366, 376`; the decoder accepts a chunk written under an older or equal version,
`decode.ts:97`). So an append that keeps every existing row keeps every existing document's digest and block.
`LINEAR_PARTS` (`src/tx/tx.ts:412–414`) is read through `t.env.chainParts` first (`tx.ts:422`; `TxEnv.chainParts`,
`tx/types.ts:193`), and the batch-local suite reads the same hook (`invariants/batch.ts:575`).

**Test** (`test/gate/roles.test.ts`, 4 cases, pass): the committed document parses to `ROLE_REGISTRY`; the document
plus one row appended at id n, rank n, `since` version + 1 parses with every existing row deep-equal (id, name, kind,
rank, structural, indexed, knot, since) and the appended row last; a removed row is refused (`dense`), a row dated
past the version is refused (`since`); a shifting insertion parses (the loader holds density only) but moves every
later row — so, as for the concern and stage registries (`test/rng/registry.test.ts`, C-0020), the append-only rule is
a snapshot rule: **recommended addition (fixed-in-M0, a test only): a `roles.snapshot.json` beside the registry,
held as registry.test.ts holds the other two.** `LINEAR_PARTS`: a `way` entity laid in two parts is refused under the
default ("lies in 2 parts, more than the 1 it declares") and commits with `chainParts` returning 2, or null.

**Limit.** The committed registry cannot be swapped at run time (API.md §1), so the goldens are pinned on the rows the
digest reads, not by re-digesting under the appended registry.

### K6 — Concern and stage registries append-only; a new (stage, concern) stream independent — **CONFIRMED**

**Evidence.** `src/registry/index.ts:82–94` (`checkFile`: ids dense in file order, names unique), the generated
constants (`registry/ids.ts`) held equal to the registries by `test/rng/registry.test.ts:295–307`, and that test's
snapshot section (`:133–158`) refuses a renumbered, renamed or removed row against `registry.snapshot.json`. The
stream key is one bijective finaliser round over the entity key and the packed words
`(stage ≪ 16 | concern, reroll ≪ 16 | salt, epoch, attempt)` (`src/rng/mixer.ts:141–158, 167–185`); the guard
refuses an unregistered stage or concern (`packInto`, `registry/index.ts:142–144`, `attemptCap`).

**Test** (`test/gate/registries.test.ts`, 3 cases, pass): a concern and a stage appended to copies render every
existing constant at its id and the new ones at `CONCERN_COUNT` / `STAGE_COUNT`; a removed row is refused by the
generator (`dense`) while a shifting insertion moves the constants (the snapshot test's job); `STAGE_VIEW` stays
0xffff above the table; for one entity key every registered (stage, concern) gives a distinct stream key (25 stages ×
91 unretired concerns), the hand-packed words of the next unregistered pair give a key distinct from them all, and
`packComponents` refuses that pair today.

### K7 — A rank function can order stages from two registries without ambiguity — **PLAUSIBLE**

**Evidence.** `TxEnv.rankOf?: (stage: StageId) => number` (`src/tx/types.ts:188–189`), read at every open
(`tx/tx.ts:71–73, 109–110`; default: the stage id, the base's stages registered in §4.1's order). Any injective map
from two registries' ids to integers serves, with **one constraint the row must know:** the rank is persisted as a
u8 — the face column `LevelFaces.stage: Uint8Array` (`arena/plat.ts:88–89`), checked `0 … 255` at `tx.ts:73`, written
one byte per face in the block (`io/encode.ts:444`; `test/io/format.test.ts:38–49` pins the byte) — and the stored
rank is read back as kept-content order on load without any version of the rank table in the block (see K10). No
test pins two registries; the rank table itself is M0-x-04's. **Smallest addition (M1, with the rank table):** the
rank table versioned, its version in the document manifest (K10).

### K8 — Encode → decode digest-equal on parts ≥ 1; `compactSlots` deterministic — **CONFIRMED**

**Evidence.** `decodeArena(chunks, key, { digests: true })` attaches the maintained digests to the loaded arena
(`io/decode.ts:417`; `test/io/digests.test.ts` on ground/0); `compactSlots` is "a renaming only" rebuilt in one
canonical order (`io/compact.ts:1–11`), the index and digests re-attached (`:178–182`).

**Test** (`test/gate/parts.test.ts`, "K8", 2 cases, pass — the reattach golden on `ground/7` and
`underground/3`): loaded with digests, `hasLevelDigests` true, the maintained digests equal the original's recomputed
ones on every level with one build; a further L2 batch on the loaded part through `updateLevelDigests` keeps maintained
= recomputed with no rebuild and moves the digests; `compactSlots` twice on one arena and once on the compaction give
the same key, frame, print, bytes, digests and dense tables, with identical vertex and half-edge columns between the
two compactions.

### K9 — The transient-arena contract admits a view-id owner — **CONFIRMED** (type-level; nothing built)

**Evidence.** `TransientKeyShape { transient: true; owner: Id; n: number }` (`src/tx/types.ts:24–28`),
`TransientKey` likewise (`facade/types.ts:28`); `Id = string` (`types/ids.ts:5`). No kernel code reads `owner`: a
transaction on a transient key is refused whole (`tx/tx.ts:83`, `notBuilt('M6-P')`), the façade's three functions are
stubs (`facade/kernel.ts:256–258`). §3.4 (ARCHITECTURE.md 4957) declares `owner: Id /* the entity whose derivation
opened it */` — a comment on the string, no narrower type. A `view:<hash>` string satisfies the shape; **no type change
is needed**, and whether a view id is an `Id` in the design's sense is M6-P's reading, not a kernel foreclosure.

### K10 — Every persisted block names every version it depends on — **FAIL, carried-to-M1**

**What fails.** The chunk header names `FORMAT_VERSION` (= `ARENA_BLOCK_FORMAT`) and `ROLE_REGISTRY_VERSION` only
(`src/io/encode.ts:373–378`; `format.ts:17`). Two dependencies are unnamed: (a) the face row's stage rank
(`encode.ts:444`) depends on the stage registry and M0-x-04's rank table (K7), whose version
(`STAGE_REGISTRY.version`, `registry/stages.json`) no block carries; (b) `ENGINE_VERSION`
(`facade/engine.ts:8`, "raised by one on every change that moves an integer output of the booleans, buffers or
bands") is persisted nowhere — the arena holds the engine's outputs. The concern registry's version is not needed by
a block (streams are not persisted). The level digest (`levelDigest.ts`) names no version by design (a content hash).

**Classification.** Carried-to-M1: the `.plat` document around the block — "its manifest, content-addressed store,
gzip, the root check" — is M1's (`io/index.ts:1–3`; §4b), and the manifest is where the design places the version
axes (§6.4). Naming them in the chunk header instead would be a block-format change (FORMAT_VERSION → 2) that moves
every golden, so it is not the smallest addition. **Smallest addition:** the M1 manifest names `ENGINE_VERSION`
(`ENGINE_ID`), `ARENA_BLOCK_FORMAT`, `ROLE_REGISTRY_VERSION`, `STAGE_REGISTRY.version` with the rank table's version,
and `CONCERN_REGISTRY.version`; the decoder's `≤ ROLE_REGISTRY_VERSION` rule (`decode.ts:97`) extends to the stage
registry's version at the manifest.

### K11 — No kernel algorithm branches on a domain role beyond the documented defaults — **FAIL (documentation), fixed-in-M0**

**What the grep finds** (`grep -rn -o -E "'(way|kerb|…)'" kernel/src --include='*.ts'`, every role-name literal,
`roles.json` excluded): the five documented defaults — `plot_line` (`faces/common.ts:437`, a cut's rows when none
given), `claim` (`faces/claim.ts:140`), `corridor_split` (`arr/bandUnion.ts:625, 700`), `kerb`
(`arr/corridorUnion.ts:43`; `bandUnion.ts:507, 757–760` with `band`), `invisible` (`arr/winding.ts:55`, scratch only)
— and **four more the row does not list:** `anchor` (`insert/splitThrough.ts:116, 139`: the contact name's ordinal is
allocated for this role alone, §3.3 rule 2; `invariants/batch.ts:503`, the prepared-contacts row), `deck_end`,
`gate_end` and `raised_foot` (`warp/held.ts:204–205`: §3.6's held set (2)–(4) — crossing ends and raised feet are
held); and `band` as the second value of `bandUnion`'s `edgeRole` parameter domain (`bandUnion.ts:507, 757, 760`,
a caller's choice, not a branch on a row). `frame.ts:28`'s `'margin'` is a refusal detail, not a role.
`facade/kernel.ts:218–219`'s `'kerb'` is a service name. `API.md` §1's reuse table (line 48) lists the same five as the
row and omits the four.

**Classification.** Each of the four is a design-specified behaviour (§3.3 rule 2's contact names; §3.6's held set),
so the code is right and the documented list is short. **Fixed-in-M0, no code change:** a choices row and an
`API.md` §1 row naming `anchor` (ordinal allocation, §3.3 rule 2), `deck_end` / `gate_end` / `raised_foot` (the held
set, §3.6 (2)–(4)) as the kernel's defaults, beside the five. The alternative — injecting them through `TxEnv`
(`heldRoles`, `contactRole`) — is an exported-API change and belongs to M1 if the world regime needs other names.

### K12 — The commit journal records the stage, the concern and the inputs read — **FAIL, carried-to-M1**

**What fails.** `CommitRecord` (`src/tx/types.ts:99–122`) carries `version`, `key`, `level`, the dirty faces, edge and
Steiner counts, `work`, `moved`, `promoted`, `demoted`, `unflagged`, `owners`, `roles`, `warnings` — **no `stage`, no
batch scope, no concern, no list of what the batch read.** The stage and scope exist on the spec (`KernelTx.stage`,
`.batch`, `.rederivesFrom`, `types.ts:46–50`) and reach the open transaction (`tx/state.ts:52–57` `spec`,
`stageRank`), but the record is assembled as `{ ...provisional, version }` without them (`tx/tx.ts:629`). The concern
never reaches a transaction (the RNG is a separate door, `facade/kernel.ts:353`; the model keys streams), so the
kernel cannot record it. The references a batch resolved are not journaled: `resolve` is a read with no log
(`arena/resolve.ts:202`), and the façade's `within` brackets only writers and services (`kernel.ts:124–133`).

**Classification.** Carried-to-M1: `CommitRecord` is an exported type (`tx/index.ts`, API.md Appendix B), and the
reason record is the model's (M8). **Smallest addition:** at `tx.ts:629` copy `stage: spec.stage` and `batch:
spec.batch` into the record (two fields on the exported type); journal the `GeomRef`s the façade's `resolve` and
`view` serve while a transaction frame is open (`kernel.ts:97` `frames`) as `reads: GeomRef[]` on the record; the
concern and the reason record itself stay the model's, keyed by the record's `(key, version, stage, batch)`.

### K13 — No digest, reference form, invariant or operation reads an elevation; frame and lattice 2-D — **CONFIRMED**

**Evidence.** `LatticePoint = { x, y }` (`types/units.ts:21`), `Frame` four plan fields (`num/frame.ts:9–16`),
`LatticeSpec` five scalars (`num/lattice.ts:4–14`), the vertex table `x, y, out, level, flags` (`arena/plat.ts:52–61`),
`VertexSig`, the ref forms and `ChainProfile` carry no position (`types/refs.ts`). A grep of `kernel/src` for z-like
names finds local variables only (`dmath/pow.ts`, `dmath/trig.ts`, `dmath/atan.ts`: fdlibm's `z`;
`skeleton/engine.ts:419`: a loop variable; `arr/bandUnion.ts:348`: a point parameter) and the skeleton's "height" in
comments — the sweep parameter of the straight skeleton (`skeleton/coalesce.ts:17, 64`), a plan construction, not an
elevation. One member matches `depth…`: `geom/lir.ts:31` `depthCm`, "its extent across `axis`" — a plan length.

**Test** (`test/gate/no-elevation.test.ts`, 3 cases, pass): a grep lint over every `.ts` and `.json` of `kernel/src`
(comments and strings blanked) for a member or key declared `z`, `zCm`, `elev…`, `elevation…`, `altitude…`, `datum…`,
`storey…`, `floorCm`, `baseCm`, `topCm`, `surfaceCm`, `depth…` at the start of a line, with the one allowlist entry
(`geom/lir.ts` `depthCm`) that must be hit exactly; the type side pins `LatticePoint` to x and y, `Frame` to its four
fields, `LatticeSpec` to its five, `PlatKey` to layer and part, and the four ref forms to their keys; the vertex table's
columns by name.

---

## Model rows

### M1 — The address form has, or can take by append, a document or world namespace — **FAIL by design, carried-to-M1**

**Evidence.** `model/src/identity/address.ts`: an address is `[prefix]kind:token` where the prefix names the arena
only — `''` on the ground layer (its part unstated: `address.ts:10`, `mint.ts:149`), `under/`, `under<n>/`,
`sky<n>/` (`:54–68`); the grammar `ADDRESS` (`:95`) admits exactly that prefix and refuses anything else
(`parseAddress`, `:101–117`). The token is the lineage hash's base-32 form (`:24–40`), and the lineage key's ten
lanes are (layer, part, unit flag, unit₀, unit₁, stage, epoch, index, reroll, dup) (`lineage.ts:8–9, 57–88`) — no
document or world lane. So two documents generated from one seed mint identical lineage hashes and identical
addresses: a world of sites cannot tell `way:…` of one document from the same of another by its address. The
`Identity.dossier` field (`types/identity.ts:42–43`) is the one cross-document binding and is refused by the leaf
until the M1 dossier port (`digest/leaf.ts:90–92`).

**Classification.** Carried-to-M1 (a model change by design; the spec says an M1 item). **Smallest addition:** an
optional leading document segment in the address grammar — a prefix the regex admits before the arena prefix,
e.g. `<doc>:` with a base-32 document token — written by `addressOf` / `userAddressOf` when a document id is passed
and read by `parseAddress` as `document: string | null`; and, so the lineage hash itself differs across documents,
either a `doc` lane appended to the lineage key (`LINEAGE_LANES` 10 → 11, every existing key writing 0, which moves
no hash only if the lane is appended and the hash is re-derived — a declared shift, §6.4) or the seed key salted by
the document id (`seedKey`, `rng/mixer.ts:118–121`; no address of an existing document moves). The ground part's
absence from the address (`mint.ts:149`) is a second thing an anchor across documents must not rely on (M7).

### M2 — The carve keeps its delta or the pre-carve heightfield recoverable; water surfaces separable — **FAIL in part, carried-to-M1**

**Evidence.** `site/src/hydro/carve.ts`: `planCarve` is pure and returns the bed per centreline cell (`CarvePlan.cells`,
`bedCm`, `:20–68`); `carveCourse` writes the raster in place through the range check (`:119–130`, `out.write`) and
returns `{ plan, carvedCells }` — `carvedCells` is a **count** (`:72–75`): the centreline cells' pre-carve heights are
not kept (the plan holds the bed, not the height before), and the channel cells (`:91–118`) are neither listed nor
their before-values kept. The terrain record holds one raster (`model/src/records/site.ts:60`), no pre-carve copy
(`terrain/heightfield.ts` writes it once). So the delta is **not recoverable** from the result or the record. Water
surfaces **are separable:** the river's descent surface is its own array (`hydro/surface.ts:38–49`
`RiverSurface.levelCm`, never written into the raster), the hydrology's filled surface likewise
(`hydro/field.ts:139` `filledCm`), and a water body's `depthCm` / `widthProfile` sit on the record
(`records/site.ts:115–116`), not in `heightCm`.

**Classification.** Carried-to-M1 (a site change the spec records as M1's). **Smallest addition:**
`CarveResult.before: { cell: number; heightCm: number }[]` (every cell written, centreline and channel, with its
height before the write — one push beside each `out.write`), so the pre-carve field is `heightCm` with `before`
applied; the water surface stays as it is.

### M3 — The terrain datum is read through one accessor — **PLAUSIBLE** (no reader exists yet)

**Evidence.** `Terrain.datumCm` is declared at `model/src/records/site.ts:58` ("the elevation that height 0
represents"), written once by `terrain/heightfield.ts:46–58` from `datumOf(request)` (`:75–93`, `baseElevationM`),
read there for `seaLevelCm` (`:67–68`), and read by **no other code** in `plat/` (a grep of every package for
`datumCm`: its declaration, the schema order `schema/order.ts:34`, the two writes, and the comment in
`terrain/types.ts:76`; `districts.ts:106, 229`'s `platformSteps[].datumCm` is the platform datum, another thing). The
accessor §2.6 names — `deriveBase(entity, sampler)` and `levelledGroundCm(doc, key, p)` (ARCHITECTURE.md 1711–1721)
— is S11's and M2b's. The sampler reads heights above the datum (`terrain/sampler.ts`), never the datum.
**Nothing forecloses; smallest addition (M1, with S11's first reader):** one `datumOf(terrain)` accessor in
`site/terrain` (or a `datumCm` on the `TerrainSampler`) that `deriveBase` and every later reader go through.

### M4 — The water table is read through one function — **PLAUSIBLE** (not built; the stand-in is inline), carried-to-M1

**Evidence.** No water-table function exists. `terrain/params.ts:18–22` (`LOW_BAND_M`: "the water table standing at
the lowest land until M1's water table is read", C-0165 (1)) and `terrain/resources.ts:16` read the stand-in inline
(low ground within 2 m of the lowest land). The design's `waterTableAt(doc, p, when?)` (§2.6, line 1910; V13 §3.12.3)
and its readers — the basement gate, the crypts (§2.6 1912–1918) — are M2b's and later. **Smallest addition (M1):**
`waterTableCm(terrain, water, p)` in `site/terrain` with the stand-in as its body, `resources.ts` reading through it,
so the readers §2.6 names bind to one function from their first line.

### M5 — S1's terrain and water parameters are one input record with one entry point — **PLAUSIBLE**

**Evidence.** The authored parameters are one record: the blueprint's `site` — `SiteRequest { relief, primitives?,
baseElevationM?, wind? }` (`terrain/types.ts:71–80`) read by `TerrainBlueprint.site` (`:86–89`) and
`RiverBlueprint.site.river?: RiverRequest` (`hydro/types.ts:16–34`). The table parameters come through three readers
of one table (`terrainParams`, `hydroParams`, `waterParams`: `terrain/params.ts:52`, `hydro/params.ts:68`,
`water/params.ts:46`, all `terrain.json`). The entry points are three, sequenced by the runner: `baseTerrain.terrain
(bp, ctx, k)` (`terrain/strategy.ts:54–60`), `runRivers(bp, terrain, water, ctx, opts)` (`hydro/strategy.ts:377`) and
`runS1(input, ctx, opts)` / `s1Stage` (`water/stage.ts:92, 237`), each a §4.12 strategy or stage of its own by design
(`TerrainStrategy`, `RiverStrategy`, the S1 `Stage`). Nothing forecloses one entry: the S1 stage record
(`S1Input`) already carries the terrain and the water. **Smallest addition (M1, M0-x-04's registration):** one
`S1Params` record (`site` + the three table parameter sets) and one `s1(params, ctx)` that calls the three in order.

### M6 — A placement record (origin, bearing) per arena set, without touching any arena digest — **CONFIRMED (kernel) / PLAUSIBLE (model)**

**Evidence.** The arena digest is a function of layer code, part, level and lattice content only
(`digest/levelDigest.ts:772`, K3); the block likewise (K2). A record outside the arena — an origin and a bearing for
a set of arenas — touches no arena digest by construction. On the model side the model digest's `plats` node hashes
(layer code, part, five digests) per arena (`model/src/digest/model.ts:121–128`) and the eleven layer nodes
(`digest/leaf.ts:15–27`: `site … plats`, no `world`); the record kinds are a closed table (`schema/kinds.ts:23–61`,
`RecordOf`, `M0_KINDS`) whose registry "with its path-completeness test, is M1's" (`kinds.ts:3`). So the placement
record is a new kind under a new or existing layer node, reservable at M1, and it moves no arena digest; it moves
the model root (every new kind does).

### M7 — An anchor record (address, document reference, knowledge flag) can be reserved — **PLAUSIBLE**, M1's

**Evidence.** The model has no document reference type; addresses are strings (M1). `Identity.dossier?: DossierRef {
element, version? }` (`types/identity.ts:7, 42–43`) is the one binding to something outside the document, and the
leaf refuses it until the M1 dossier port (`digest/leaf.ts:90–92`). The knowledge tiers exist as a vocabulary
(`Plot.knownTo: 'public' | 'local' | 'secret'`, `records/districts.ts:207`; §2.9's `knowledge` view key). An anchor
record is reservable on the same path as M6 (a new kind at M1); its `address` field cannot rely on the address alone
across documents until M1 adds the namespace, and a ground address does not state its part (`mint.ts:149`).
**Smallest addition (M1):** a kind `anchor { address: Id; document: DocRef; knowledge: 'public' | 'local' |
'secret' }` under the `identity` layer, `DocRef` declared with the dossier port.

### M8 — A reason record can be reserved per generated fact — **CONFIRMED** (model side)

**Evidence.** `DerivationRecord` (`model/src/types/vocabulary.ts:62–83`: `ctx`, `fields`, `band`, `allocationRow`,
`epoch`, `params`, `slices`, `placements`) is "persisted with plots, blocks and buildings; outside the model digest,
inside the records digest" (`Plot.derivedFrom`, `records/districts.ts:221–222`; `DIGEST_EXCLUDED`,
`schema/order.ts:16–23`), and `NamingRecord` (`vocabulary.ts:85–90`) takes the same path. A reason record per
generated fact is one more records-digest field or kind on that path. **Its kernel half is K12's:** a reason that
names the kernel transaction's stage and reads needs the commit record's `stage`, `batch` and `reads`.

### M9 — Every drawable record declares a base and a top, or a surface, or is listed flat with a reason — the gap list — **PLAUSIBLE**, the list below is the finding

Read against §8.4 (ARCHITECTURE.md 14407–14460: layers draw by `elevationCm`, "every underground entity's
`elevationCm` is its depth below the datum", shadows height-derived) the M0 record kinds (`schema/kinds.ts`) stand as:

| kind (file) | base | top / surface | standing |
|---|---|---|---|
| `terrain` (`records/site.ts:48–77`) | `datumCm` | `heightCm` raster (a surface) | declared |
| `waterBody` (`site.ts:88–132`) | — | `depthCm` per course vertex; no surface level | **gap:** the water level (`WaterSurface`, V13) is M1+'s — a body's drawn level is the terrain at its shore until then |
| `way`, `junction` (`records/network.ts`) | — | — | flat on the terrain surface, by design; `Way.raised?: RaisedWayRecord` (staged M3a, `schema/staged.ts`) carries the raised case |
| `district`, `seam`, `reservation`, `frontage` | — | — | flat: areas and lines on the ground; not drawn with a height |
| `block`, `plot` (`districts.ts:104–106, 227–229`) | `platformCm?`, `platformSteps[].datumCm` (item 110 (a)) | — | base declared where levelled; top not a thing |
| `PlotBound` (`districts.ts:122–133`) | the ground (implicit) | `heightCm` | base implicit — **gap:** a bound's base is the datum of its plot, unstated |
| `yardPart` | — | — | flat |
| `enceinte` (`records/walls.ts:8–20`) | — (`deriveBase`, M2b) | `heightCm` **staged to M1** (`staged.ts:42`) | **gap at M0:** neither base nor top |
| `gate` (`walls.ts:23–36`) | — | — | **gap:** no elevation; S7's (M1) |
| `bridge` (`walls.ts:39–55`) | the water (implicit) | `deckCm?` (set by S7 when built) | **gap:** a `site` bridge has no deck height |
| `allocation`, `fieldBands` | — | — | not drawable |

Nothing forecloses: each gap is a field whose stage is M1 or later (S7's `heightCm` and `deckCm`, M2b's
`deriveBase`, V13's water surface), and the datum accessor of M3 is the base every "implicit" row would read.
**Smallest addition:** none at M0; at M1, with S7, `Enceinte.heightCm` and `Bridge.deckCm` un-staged and a `baseCm`
beside them (through M3's accessor), and `WaterBody.levelCm` with the water surface.

### M10 — Every vertical-link record carries an elevation at both ends — **PLAUSIBLE** (no such record exists)

**Evidence.** A grep of `model/src` and `site/src` for `stair`, `shaft`, `ramp`, `trapdoor`, `access` (as a record)
finds none: the records of §2.6–§2.7 that link storeys — `StairCore { levels: [number, number]; kind: … | 'ladder' |
'trapdoor' }` (ARCHITECTURE.md 1458–1459, storey indices, not elevations), `Opening.kind 'trapdoor'` (1455),
`Basement.access` (1482), the `AccessPoint` and `UndergroundLink` of II.7 — are M2b's, V03's and V04's. Nothing in
M0 forecloses them. **Smallest addition (when each lands):** `{ fromCm: Cm; toCm: Cm }` on the record, both ends in
terrain centimetres through M3's accessor, beside the storey indices the design declares.

### M11 — Projection and vertical exaggeration are view state outside the document hash; the style store admits a projection family — **PLAUSIBLE**

**Evidence.** No projection or exaggeration state exists in `model/src`, `site/src`, `layout/src` or
`tables/data` (a grep for `projection`, `exaggerat`, `viewState`: two unrelated geometric comments). The model digest
hashes records, identity and arenas only (`digest/model.ts:1–9`, `leaf.ts`); §2.9 places view state outside the
canonical document ("never in a digest, the hash, the tile key or an export", 4254–4256) and §8.2 says "exaggeration
never enters the model" (13584). The style store (`StyleSheet`, §8.2) is not built at M0 — `tables/data/` holds the
generation tables only — so its schema cannot refuse a projection family yet. Nothing forecloses; **smallest
addition (M1+, with §8.2's style sheet):** a `projection` field on the style sheet's schema and the two view keys
(`projection`, `exaggeration`) in §2.9's list.

---

## Closing table

| row | verdict | failure class | smallest addition |
|---|---|---|---|
| K1 | PLAUSIBLE (codes pinned by test; no registry to append to) | — (fixed-in-M0 consolidation recommended) | one `LAYERS` list read by format.ts, rng/layer.ts and `isPlatKey` |
| K2 | CONFIRMED (test) | — | — |
| K3 | CONFIRMED | — | — |
| K4 | CONFIRMED (test, K2) | — | the address prefix coupling is M1's (see M1) |
| K5 | CONFIRMED (test) | — | a `roles.snapshot.json` held like the other two registries (a test) |
| K6 | CONFIRMED (test) | — | — |
| K7 | PLAUSIBLE | — | the rank table versioned, its version in the M1 manifest (u8 ranks) |
| K8 | CONFIRMED (test) | — | — |
| K9 | CONFIRMED (type-level) | — | no type change |
| K10 | **FAIL** | carried-to-M1 | the M1 manifest names `ENGINE_VERSION`, the block format, the three registries' versions and the rank table's |
| K11 | **FAIL** (the documented list is short) | fixed-in-M0 (a choices row + API.md §1 row, no code) | name `anchor`, `deck_end`, `gate_end`, `raised_foot` (and `band`) as defaults with their design clauses |
| K12 | **FAIL** | carried-to-M1 | `CommitRecord.stage`, `.batch` (copied at `tx.ts:629`), `reads: GeomRef[]` journaled by the façade's open frame |
| K13 | CONFIRMED (lint test) | — | — |
| M1 | **FAIL** (by design, M1's) | carried-to-M1 | a document segment in the address grammar; a document lane in the lineage key or a document-salted seed key |
| M2 | **FAIL** in part (the delta) | carried-to-M1 | `CarveResult.before: { cell, heightCm }[]` |
| M3 | PLAUSIBLE (no reader yet) | — | one `datumOf(terrain)` accessor at S11's first reader |
| M4 | PLAUSIBLE (not built; stand-in inline) | carried-to-M1 | `waterTableCm(terrain, water, p)` with the stand-in body |
| M5 | PLAUSIBLE (one record, three entries) | — | one `S1Params` and one `s1()` at M0-x-04's registration |
| M6 | CONFIRMED (kernel) / PLAUSIBLE (model) | — | a record kind at M1 |
| M7 | PLAUSIBLE | — | an `anchor` kind with `DocRef` at the dossier port |
| M8 | CONFIRMED (model) | — | the kernel half is K12's |
| M9 | PLAUSIBLE (the gap list above) | — | S7's `heightCm` / `deckCm` un-staged with a base; the water level with V13 |
| M10 | PLAUSIBLE (no record exists) | — | `{ fromCm, toCm }` on each vertical link when it lands |
| M11 | PLAUSIBLE (nothing exists; design places it outside the hash) | — | a `projection` field on the style sheet's schema |

## The tests written (`packages/kernel/test/gate/`, run with `corepack pnpm test --project kernel packages/kernel/test/gate/`)

| file | rows | cases | result |
|---|---|---|---|
| `support.ts` | — | the dressed arena under any key (outer ring, L1 way, L2 lane, an L1 owner, a junction row), digests, byte compare | — |
| `layers.test.ts` | K1 | 5 | pass |
| `parts.test.ts` | K2, K8 | 5 | pass |
| `roles.test.ts` | K5 | 4 | pass |
| `registries.test.ts` | K6 | 3 | pass |
| `no-elevation.test.ts` | K13 | 3 | pass |

20 tests, 20 pass (vitest 5.0.3, Node 24.12.0, 2.6 s). Three first drafts failed on the seat's own mistakes
(a fixture whose entity ids differed in length per layer; a shifting insertion that the registry loaders rightly accept
as id-dense — the append-only rule is the snapshot's), each corrected in the test; no source was touched. ESLint on the
folder: exit 0.

## Gates

* `corepack pnpm build` (tsc -b over every project, the kernel test project with the gate folder included, then the
  bundles): exit 0.
* `corepack pnpm lint` (ESLint with the determinism rules, then the 9 whole-tree checks — vendor-scan,
  repository-path, inline-directives, model-coverage, no-bare-pnpm, licences, kernel-boundary, bench-boundary): exit 0.

## Incidental observations (not rows)

1. The three layer-code sites (K1) and `isPlatKey` would each need the same edit for a fourth layer; the model adds
   `arenaPrefix` / `parseAddress`. A consolidation is a hardening-round item, not a gate failure.
2. `API.md` §1's reuse table (line 48) lists the five default role names and omits `anchor`, `deck_end`, `gate_end`,
   `raised_foot` (K11); `API.md` §10 says "`CommitRecord` contents … are never persisted" — consistent with K12's
   fields being added freely at M1.
3. The role registry's append-only rule has no snapshot test of its own (the concern and stage registries have one);
   K5's test recommends it.

**M0 close: the gate holds with these rows carried to M1: K10, K12, M1, M2, M4 (K11 is a documentation row fixable in
M0; K7, M3, M5, M6, M7, M9, M10, M11 are recorded as M1's by design, nothing foreclosed).**

## Checker's ledger row

L-0558 in `plat/CLEAN-ROOM.md` §2.
