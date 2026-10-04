# Digest entry 1 — how NG's bent-cut signature was measured (the recorded frame)

Implementer digest, entry (1) of nine. Written research-side at M-1 (2026-10-04) for the AFTER-M-1 run item M0-b-05a
and for M0-b-05b; it carries our own words, numbers and `baselines.json` row ids only. Provenance label:
`research:M-1/E10` (sections 3 and 9) with the rows formed by `research:M-1/E15`.

## 1 Why this entry exists

The bent-cut signature row of §13.5 and the M0 (b) clause of §16 judge our S8 cuts against NG's σ "in the recorded frame, the
rotated retries included". A σ is only comparable when both sides measure the same quantity in the same frame. This
entry states that frame so M0-b-05a measures our cuts in the same frame.

## 2 The frame, in our words

1. **The road graph.** Every drawn street centreline of a recorded hood is a road. A street end that stops short of a
   road it was heading for (within three times its own half-width) is snapped onto the centreline it was heading
   for; the landing point is then a vertex shared with that road. A half-edge walk finds the faces. Every face touching the
   hood's undrawn boundary merges into a single open face, because NG draws no hood outline.
2. **The cut tree.** Taking the streets away one by one, latest-drawn first, the two faces a street
   separated join into that street's parent face, and the street is its cut. A road that still exists at that
   moment and has the parent on both sides is a slit — a ring band's first cut turns the band into a C-shaped face
   whose boundary follows that cut on both of its sides — and the C is rebuilt that way. A cut whose parent touches the hood edge
   has no parent polygon and carries only the face-free measures (arrival, fillet, bends, length).
3. **The position f.** For a cut with a rebuilt parent, f locates the cut's snapped start along the parent's minimum-area
   bounding rectangle's long axis (the parent read as drawn, fillet arcs as chords), as a fraction
   of that axis. For a parent that has a hole, the rectangle is taken around the outer cycle.
4. **σ (`cut.sigma`).** The maximum-likelihood fit of f to a normal distribution centred on one half, plus a uniform
   contamination term: σ on a grid from 0.020 to 0.248 in steps of 0.002 and the contamination share ε on an
   eleven-step grid. A set with fewer than ten cuts is not fitted; its f values are listed instead.
5. **Rotated retries.** A drawn record does not show NG's own retries, so "rotated retries included" applies to our
   side only: a cut our planner retried in the turned frame (§4.6 step 7, P7) enters the sample like any other cut.
6. **The three shares beside σ.** `cut.cornerMid`: extend a one-bend cut's two straight legs until they meet; t is
   the meeting point's position between the snapped ends (the start-to-meeting distance over the two leg distances
   summed); the gate is |t − ½| ≤ one tenth, counted on one-bend cuts with a rebuilt parent.
   `cut.arrival85`: each junction end's acute angle to the road it meets; the share at or above 85°, over every
   non-template street. `cut.fillet`: the share of one-bend cuts whose bend is drawn as a run of several vertices (an
   arc), over every one-bend non-template street.
7. **Which cut set a row reads.** σ and `cut.cornerMid` need the rebuilt parent and are measured on the bounded set.
   `cut.arrival85` and `cut.fillet` were quoted by the design over every street and every one-bend cut, so the rows
   carry the all-cuts values; the bounded values stand in the rows' notes for the comparison on identical shapes
   (M0-b-05b). σ's reference value is the simple-parent fit (parents without a hole or a slit); the fit over every
   rebuilt parent is in the row's note.
8. **Template roads.** The street and square templates lay roads before any cut (one main street; three plaza roads).
   Those are not cuts and enter no cut row. Neither the area nor the ring template lays any (a ring road counts as template by
   shape).
9. **Units.** Model units (a canvas pixel over the map's paint scale), relative units (per median footprint short
   side) and declared metres at 0.35 m per model unit (entry 8). σ, t and the shares are scale-free.

## 3 The numbers (rows of `baselines.json`; the formula seeds, 20 `medium` hoods, five per template)

| row id | value | n (cuts / seeds) | band | note |
|---|---|---|---|---|
| `ng/medium/cut.sigma/all` | 0.090 | 369 / 20 | fixed, ± 0.02 | simple parents; the fit over every rebuilt parent 0.088 |
| `ng/medium/cut.sigma/plain` | 0.084 | 134 / 15 | 0.064–0.104 | area, street and square hoods |
| `ng/medium/cut.sigma/ring` | 0.094 | 235 / 5 | 0.074–0.114 | ring hoods |
| `ng/medium/cut.cornerMid/all` | 0.8828 | 211 of 239 / 20 | ≥ 0.80 | one-bend cuts with a rebuilt parent |
| `ng/medium/cut.arrival85/all` | 0.9737 | 1 712 of 1 763 / 20 | ≥ 0.95 | every non-template street |
| `ng/medium/cut.fillet/all` | 0.5376 | 393 of 731 / 20 | 0.4876–0.5876 | every one-bend non-template street |

Each σ row holds one pooled fit (p10 = p50 = p90, estimator `single`). Per seed, σ is fitted only where a hood holds
ten or more bounded cuts: area 0.062–0.082 over four hoods, ring 0.062–0.108 over five. The ring hoods' corner share lies
between 0.81 and 1.00; the arrival share has a type-7 p10–p90 of 0.904–1.000 over the 20 hoods and the fillet share
0.486–0.686.

**Against the design's quoted figures.** §13.5 quotes σ 0.066 (plain) and 0.098 (ring), one bend on roughly 73 % of
streets, the corner near mid-course on roughly 82 %, all read from two recorded fixture hoods per template. The
formula seeds give plain 0.084 (+ 0.018, inside the 0.02 floor), ring 0.094 (− 0.004), one bend on 0.657 of streets
(739 of 1 125) and the corner near the middle on 0.883. The rows carry the formula values; the design's cell is
corrected by amendment to the same numbers.

**Shape of NG's faces (for M0-b-04's synthetic set and M0-b-05b).** On the fixtures 140 of 168 rebuilt parents have a
side that bends more than 10° (ring roads, or long fillet arcs of crossing streets met part-way by a later cut), 78 have
a rounded corner and only 11 are straight-sided with sharp corners; so the plain-face σ is mostly a curved-face σ. The
five face classes (holed, C-shaped, triangular, curved, round-joined) are descriptive rows by subset
(`ng/medium/cut.fillet/class-cShaped` and the like). On faces that wrap around (C-shaped) the corner's place along the
course loosens — 11 of 14 bent cuts near the middle on the formula seeds, with 40 % of the σ fit's mass in the uniform
term — the case §4.6 step 3 settles for our side by taking the segment containing the nearest point.

## 4 What the design adopts here

P2 (the cut position as a centroid fraction mixed with a bell), P6 (a fillet's odds set by the turn angle and the leg length) and P7
(the retry in a turned frame) are the mechanisms behind the measured signature; the signature itself is the keep-test,
not a mechanism. The creator of NG stated the purpose of the bent cut as junctions that look grown rather than drawn,
and a partition whose recursion the eye cannot trace; the signature numbers are what that purpose produced.

## 5 Status

CONFIRMED by execution research-side: every number above, the fixture reproduction of the earlier figures through the
same rebuild, determinism over two runs, and planted-fault red tests. PLAUSIBLE: that the three kept bends below 0.7 m
on filleted corners are reading noise (entry 2); that the C-shaped loosening reflects wrapping faces rather than small
counts.
