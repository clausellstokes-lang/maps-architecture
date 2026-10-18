# Read — the checks, critiques and coherence records a site-road-autocorrect design must satisfy (lane `sites-roads/read-checks`, 2026-10-18, J393)

**Lane.** `sites-roads/read-checks` (Opus, high; a reader under J390: it records what the texts say and judges nothing).
**Started.** 2026-10-18 05:12 UTC. **Status.** IN PROGRESS (written as it goes).

**The owner's words (J393, verbatim):** "make sure that sites have road access where appropriate, they are integrated
into road infrastructure and that depending on the catalogue, where appropriate, their geography in the world map
autocorrects to meet the coherence expectation."

**Files read whole (line count, md5 at the moment read).** Every cite below is `file:line` against that md5.

| file | lines | md5 |
|---|---|---|
| docs/validation/sites-roads-2026-10-18/README.md | 29 | (orientation only) |
| plat/docs/build/M0-world-sites-gate.md (the gate spec; K1–K13, M1–M11) | 45 | b6c5be2a5d89fbd19035a3c606194fb9 |
| plat/docs/build/checks/M0-world-sites-gate.md (the gate's check) | 476 | 1e29aadca96f2cfcb96cdbe82c0181ef |

(the table grows as files are read; see the end of the header for the rest)

## Facts, in the order found

### A. The M0 world-sites gate (spec and check)

A1. The gate's purpose and its limit: it "asks M0 to prove that the kernel and the model do not foreclose the world,
site, encounter and hydrology work designed after M0. **No row adds a feature.**" A K row is resolved before M0 commits
or carried to M1's API pass; an M row is recorded now and is M1's to change; "Where a row can be a test, the test joins
M0's exit suite." (plat/docs/build/M0-world-sites-gate.md:4–8)

A2. "No row is closed by changing the design to match the code without a row of `plat/docs/build/choices.md`."
(plat/docs/build/M0-world-sites-gate.md:10–11)

A3. The gate has exactly 13 K rows and 11 M rows; no row names a road, a route, a seat, a site kind, travel, patrols,
or the world's placement law (V13 §3.11). Its world-facing rows are K1 (layer codes), K2 (parts), K3 (frame local),
K4 (refs carry no key), K13 (no elevation), M1 (address namespace), M6 (placement record), M7 (anchor record), M8
(reason record). (plat/docs/build/M0-world-sites-gate.md:13–45)

A4. K3: "`Frame` is purely local (origin and extents); no digest hashes an absolute position outside the frame" —
CONFIRMED: the level digest hashes layer code, part, level and frame-local lattice content, "no origin, no offset, no
position outside the frame". A world position of a settlement or site is therefore outside every arena digest today.
(plat/docs/build/M0-world-sites-gate.md:19; plat/docs/build/checks/M0-world-sites-gate.md:90–98)

A5. M6: "A placement record (origin, bearing) can be reserved per arena set without touching any arena digest" —
CONFIRMED (kernel) / PLAUSIBLE (model): "the placement record is a new kind under a new or existing layer node,
reservable at M1, and it moves no arena digest; it moves the model root (every new kind does)." The model digest's
eleven layer nodes are `site … plats`, "no `world`"; the record-kind registry "is M1's". (spec:40;
check:332–341, 431)

A6. M1: FAIL by design, carried-to-M1: an address is `[prefix]kind:token` with an arena prefix only; the lineage key's
ten lanes have "no document or world lane. So two documents generated from one seed mint identical lineage hashes and
identical addresses: a world of sites cannot tell `way:…` of one document from the same of another by its address."
Smallest addition: an optional leading document segment in the grammar, and either a `doc` lane appended to the
lineage key (10 → 11, "a declared shift, §6.4") or the seed key salted by the document id ("no address of an existing
document moves"). The ground part's absence from the address (`mint.ts:149`) "is a second thing an anchor across
documents must not rely on (M7)". (check:259–278, 426)

A7. M7: an anchor record `{ address, document: DocRef, knowledge }` is reservable at M1 under the `identity` layer;
"its `address` field cannot rely on the address alone across documents until M1 adds the namespace". PLAUSIBLE.
(check:343–352, 432)

A8. M8 / K12: a reason record per generated fact is reservable (CONFIRMED, model side) on the `DerivationRecord` path
("outside the model digest, inside the records digest"); "Its kernel half is K12's": `CommitRecord` carries no
`stage`, `batch`, concern or reads — FAIL, carried-to-M1, smallest addition `stage`, `batch` copied at `tx.ts:629`
and `reads: GeomRef[]`. (check:221–236, 354–361, 424, 433)

A9. M9's gap list: `way`, `junction` are "flat on the terrain surface, by design; `Way.raised?: RaisedWayRecord`
(staged M3a) carries the raised case"; `bridge` has "no deck height" at M0 (`deckCm?` set by S7, M1). (check:368–385)

A10. K1: the `Layer` union is closed (`'underground' | 'ground' | 'sky'`); "Widening the `Layer` union itself is the
exported-type change of the milestone that designs the world layer (M1 or later), to be taken with a choices row."
(check:40–70)

A11. K2 / K4: parts are independent frames, not dense from 0; every reference form resolves against a separately
supplied `PlatKey`, none embeds one (CONFIRMED, tested). (check:72–109)

A12. K13: "No digest, reference form, invariant or kernel operation reads or assumes an elevation; `Frame` and the
lattice are two-dimensional only" — CONFIRMED by a lint test. (spec:29; check:238–253)

A13. K10 (FAIL, carried-to-M1): the M1 manifest is to name `ENGINE_VERSION`, the block format, the role, stage (with
the rank table) and concern registry versions. (check:183–199)

A14. The check's design reading was "named sections only" of ARCHITECTURE.md (§3.4, §2.6, §2.9, §8.2, §8.4); it read
no V13 or V14 text. Its verdict: "the gate holds with these rows carried to M1: K10, K12, M1, M2, M4 (K11 is a
documentation row fixable in M0; K7, M3, M5, M6, M7, M9, M10, M11 are recorded as M1's by design, nothing
foreclosed)." Signed L-0558. (check:14–17, 30–34, 471–476)

A15. The gate has no T- rows (the "T-" rows the brief names are not in either gate file; see section H for where they
were looked for). (spec:1–45; check:1–476)

