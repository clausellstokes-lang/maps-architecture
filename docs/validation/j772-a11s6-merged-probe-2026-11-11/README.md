# J772 — N-s6-1's face read on the merged tree, 2026-11-11

M0-a-11 S6 gave the skeleton's `spine` and `regions` readers the design's 1° corner bound. One face was known
to fail the validator under that bound: relief-3000 seed 7, district #56 (4.64°), recorded by the item's round
S3 on the 2026-10-14 tree (`planarity arc 42 crosses arc 46`). Neither the round's build nor its closing check
could read it: on their trees that seed derived no district faces. J761 (1) left the reading to the session,
on the merged tree.

Run on the merged tree (55042d29, the round's landing), from `plat/`, with the closing check's committed probe:

    corepack pnpm exec tsx --conditions=plat-source docs/build/checks/M0-a-11-s6-evidence/measure-band.mjs \
      <out.json> relief relief-3000 default 7

| file | what |
|---|---|
| relief3000-7.json | the probe's output |
| relief3000-7.log | its console line and time (2 min 33 s) |

Result: the seed derives 129 district faces and 1 water face, no bug. Seven district faces have their
sharpest corner in [1°, 5°) — #10 3.43°, #13 4.48°, #15 1.31°, #23 3.57°, #30 3.50° and two more, from 1.31° to
4.48° — and all seven validate for `spine` and for `regions` (`roof` refuses the seven, as before). One face
is refused `notSimple` for every use (the class N-s6c-7 routes upstream). No face of the seed has a 4.64°
corner: October's district #56 is not derived on today's tree, so its rejection cannot be read or pinned.

## The other seeds N-s6-4 named (the same probe, the same tree)

The round's notes (N-s6-4) listed seeds that derived no district face on the round's tree. On the merged tree
every one of them derives districts:

| file | seeds | district faces | with a corner in [1°, 5°) | of those, validated for spine and regions | other |
|---|---|---|---|---|---|
| relief60.json / .log | relief-60 default 1, 11 – 16 | 94, 94, 80, 95, 79, 97, 66 | 23 | 23 | spine validates 612 of 612 faces |
| relief3000.json / .log | relief-3000 default 4, 6, 9, 10, 12, 13 | 104, 102, 124, 93, 114, 86 | 30 | 30 | 12 faces `notSimple` for every use; 2 below 1° refused |

With seed 7 above: 60 band faces on these fourteen derivations, all 60 validated; 13 `notSimple` district faces,
all on relief-3000 (fix queue Q180 (c)).

