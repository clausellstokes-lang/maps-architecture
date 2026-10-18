# Digest entry 9 — FTG's recorded CITY family and the non-default setting

Implementer digest, entry (9) of nine. Written research-side at M-1 (2026-10-04) for every reader of FTG's `CITY`
rows (§13.5's generation-time row and the descriptive companions at that size); our own words, numbers and
`baselines.json` row ids only. Provenance label: `research:M-1/E05` (sections 1 and 4; sections 9.6 and 9.11), the rulings of
`research:M-1/rulings-1` (R-02, R-04) and `research:M-1/rulings-2` (R-33, R-34), rows by `research:M-1/E15`.

## 1 FTG's sizes and the rungs

FTG's size presets, their nominal populations and our rungs: BIG_TOWN 5 600 → TOWN, CITY 9 500 → TOWN, BIG_CITY
24 500 → CITY, METROPOLIS 49 500 → METROPOLIS (the premium size, bought for one month). The matched-size families
carry the bands: BIG_TOWN and BIG_CITY with ten captures each (p10 / p90 by the type-7 estimator), METROPOLIS with four
(the min–max estimator). `CITY` is FTG's timed preset: it serves §13.5's generation-time row and descriptive
companions, and carries no band. FTG's TOWN preset (3 625 people, two captures) has no row at all: the design's
`FtgSize` has no TOWN member, and a widening would be a design amendment nobody has asked for.

## 2 The recorded CITY family (`capture/FTG/CITY`)

Two CITY towns existed before the capture programme, both made with coast and rivers on. They were registered as a
**recorded** family rather than planned slots, so that the CITY cell stays measurable without pretending the captures
were planned (the precedent is a reference whose seeds cannot be set by formula). The programme then added two planned
CITY slots. The family's members, in order:

| label | capture | usable | reason |
|---|---|---|---|
| `capture/FTG/CITY/coast+river/0` | 2026-09-21, default settings | yes | the base; its values equal the earlier fixture numbers |
| `capture/FTG/CITY/coast+river/1` | the 2026-09-25 town; its second road stage at 100 m per segment | **no** (`failed`, reason `setting`) | a declared non-default setting; never pooled (section 3) |
| `capture/FTG/CITY/none/0` | programme slot 24 | yes | planned, no water |
| `capture/FTG/CITY/coast+river/2` | programme slot 25 | yes | planned, coast and rivers |

Three usable captures, so every CITY row uses the min–max estimator at n = 3 and lists all four members in its sample
(the failed one with its reason), as the row form requires. `matched` is rung TOWN, size CITY, population 9 500
(nominal: no payload carries a resident count, so `populationSource` is nominal everywhere on FTG). The FTG pin is one
programme build, `ftg:m1+07526ccf921b`, the hash over the per-capture builds of the 27 captures the rows read.

| row id | role | value | note |
|---|---|---|---|
| `ftg/CITY/time.model/all` | weakness | 4 267 [2 767, 5 245] ms | the server interval from the create request's send to the layout fetch's send; a server-side quantity, no host ratio applies |
| `ftg/CITY/street.turn100/all` | descriptive | 8.021 [7.484, 8.622]° per 100 m | the organic presets' turning; the band rows are BIG_TOWN's and BIG_CITY's |
| `ftg/CITY/junction.angles/all/median` | descriptive | 90.53° [90.15, 92.19] | — |
| every other `ftg/CITY/…` row | descriptive | — | companions of the matched-size rows |

For comparison the matched sizes: `ftg/BIG_TOWN/time.model/all` 2 131 [1 928, 2 809] ms (n 10),
`ftg/BIG_CITY/time.model/all` 6 230 [5 944, 7 100] ms (n 10), `ftg/METROPOLIS/time.model/all` 12 996 [10 296, 15 223]
ms (n 4). §13.5's recorded server time (between 2.9 and 3.2 seconds) is the interval to the layout's preflight on the two CITY towns; the
row's interval ends at the layout fetch, 3.7 s and 4.3 s on those towns, and the design cell carries both readings.

## 3 The non-default setting, kept out of every pool

The second CITY town was made with the second road stage's segment length at 100 m against the default 60 m (every
other request value equal to the first town's). It is the evidence behind the street-runs law — the per-class run
lengths follow the request's segment lengths — and a twin fixture for the measuring tool, and it enters no row. On
that town the street class's turning halves (20.9° to 11.7° per 100 m; all classes pooled, 8.0° to 8.5°), the rivers are
wider (48.5 m where the base has 31.3 m) and the coastline carries a finer vertex step (a pooled 15.7 m against 50 m), so
pooling it would mix two settings in one cell. Wherever both towns' values appear in M-1's records the second is labelled non-default.

## 4 What the sample's form means for a reader of FTG rows

* An FTG row lists every plan slot of its size in order; a slot that gives no value is in `failed` with its reason:
  `water-none` (a no-water slot in a water row), `no-wall` (one BIG_TOWN slot without a wall), `setting` (above). A reader
  that checks "no silent gap" compares the members outside `failed` with the row's seed count when the row has a value
  (`values.n` above 0); a row with `values.n` 0 lists every member in `failed`, and its `values.seeds` is the member
  count, so that comparison does not apply to it.
* Non-water rows pool both water settings per size (four `none` and six `coast+river` slots at BIG_TOWN and BIG_CITY);
  the water rows (`water.step`, and `water.channelWidth` for river widths) read the `coast+river` slots only.
* Two draws of one setting differ although their requests are equal apart from client-random ids (the server draws its
  own seed; PLAUSIBLE), so a cell's captures are independent draws under one setting.
* The FTG rows' ids follow `ftg/<size>/<metric>/<subset>[/<field>]`, with `all` the subset on every FTG row.

## 5 The creator's stated idea, in our words

FTG's public guide states the road segment length as the length of one road segment, the piece a user edits, with
stage defaults of 50 m for the main roads, 60 m for the second stage and 30 m for the suburbs, and it ladders
population against map width non-linearly (90 people on a 1.5 km map up to 49 500 on a 6 km map). The
recorded runs reproduce those laws (main runs 50.5 m; second-stage runs 30.25 m at the 60 m default and 50.25 m at
100 m; suburb runs 30.00 m), and that is why the 100 m town counts as a setting, not a draw.

## 6 Status

CONFIRMED by execution research-side: every number above; the second town's absence from every sample, vector and
per-slot entry (0 hits on its id and request hash); the per-size values and estimators. PLAUSIBLE: the server-seed cause
of differing draws; that the listed population in the account's settlement list (recorded beside the nominal value,
never used) is the generated resident count.
