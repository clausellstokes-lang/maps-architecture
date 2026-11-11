# Amendments ab — the kernel-internal vertex role `shape` enters M0 (RQ2), with the copy's restore generation (R10), the commit record's re-parented faces (Q95) and the rings between two ops of a batch (Q78)

> **BINDING ON THE MERGED RQ2 ROUND AS WRITTEN HERE; NOT YET APPLIED TO THE BASE.** Written by the managing session (session_01FE9mEtLt7vrTK6rqujyvUK) on its rulings recorded in `docs/PROGRESS.md` as J757, J776 and J777 — each vetoable by the owner — after an adversarial review of the round's spec (`docs/validation/rq2-spec-2026-11-11/review/review.md`). The round M0-a-02 S4 → M0-a-06 S10 → M0-a-05 S15 builds these items; its seats and its closing checks read them as the design text. The base (`docs/ARCHITECTURE.md`) and its bundle are edited at the amendments' next apply pass.

Numbered from **997** (file aa ended at 996); items 997–1006.

**What this file is.** The design sentences of one kernel round, each with the place in the base it goes to. Ruling RQ2 (J358; `plat/docs/build/checks/rulings-hardening-1.md` §2) asked the session for the sentence of item 997; the others follow from what the round builds. Nothing here changes a stage, a table or a public API: `shape` is kernel-internal, and no stage, record or caller writes or names it.

**The design as it stands.** §2.2 rule 3: a vertex created on an existing edge carries the `split` flag, and dissolution removes a flagged vertex of degree 2 with no vertex role, no pin and identical rows on its two edges — restoring the edge it split. "A chain's own shape vertices never carry it." One class is both: a chain's OWN point that lands on ANOTHER chain's run which the chain then shares on both sides (a wall along a river bank; §3.11's collinear overlap). It keeps the flag — its dissolution would restore the other chain's edge — and carries nothing that holds it, so a third chain attached there and removed, or the other chain's own removal, dissolves a point of a chain that still lives. The session's probe counts ten such vertices in five CITY derivations today (nine on one city's wall along its river); every one is unguarded.

## The items

**997.** **The `shape` row** (the base §2.2 rule 3, *The `split` flag*, after "A chain's own shape vertices never carry it."):

> A vertex that is both — a chain's own point landed on another chain's run it shares on both sides (§3.11's collinear overlap) — keeps the flag and carries a vertex row `(shape, entity)` naming the chain's entity: the row holds the vertex while the chain passes through it (the dissolution rule's "no vertex role"), and when the chain is removed the row goes with it and the flag restores the other chain's edge exactly. `insertChain` writes the row at the chain's commit, on each of the chain's own landed points that carries the flag and through which the chain passes once — its entity's rows on exactly two of the vertex's incident edges, another entity's rows on both of them — whatever the vertex's degree (a chain of several entities writes one row for each that meets this). A batch strips the row when the entity's rows are left on fewer than two of the vertex's edges, or when the vertex has lost its flag; when the vertex is left with exactly two edges and no other entity's row on either, the row is stripped and the flag cleared with it — the vertex is then the chain's own shape vertex, as if the chain had been inserted alone; otherwise the row stays (another chain still along a side, or meeting the vertex). The guard is stated for a chain inserted onto another chain's run and removed whole or by a stretch through the point.

**998.** **The pin rule** (the base §2.2 rule 3, demotion (b) *flags*: "A vertex from which the batch strips its last vertex role row other than knot rows loses its kernel `pinned` flag, since a pin guards the feature its role names …") — "other than knot rows" becomes:

> other than knot rows and `shape` rows

A `shape` row names no feature: it neither keeps a pin alive nor drops one.

**999.** **The registry** (the base §2.2 rule 7). (i) In the table's vertex row, after `deck_order_knot`'s parenthesis:

> ; and the kernel-internal `shape` (`('shape', entity, 0)`: a chain's own point on another chain's run it passes through once, rule 3; written by `insertChain` alone and kept or stripped by every batch — no stage, record or caller writes or names it; not indexed; registry version 2)

(ii) After "… never by an interned handle, whose value depends on the order in which a session interned it.":

> The registry is append-only: a later version appends rows at the next id and the next rank, so a later row reads after every earlier one.

**1000.** **The doors** (the base §3.4 *The doors*, after "`removeEdges` on a `VertexRef` the door for stripping one (…)"):

> ; the kernel-internal `shape` row (§2.2 rule 3) has no caller's door — `insertChain` writes it at a chain's commit, and it is stripped only by the re-levelling of `removeEdges` (by `ChainRef` or `StretchRef`), `clearFiner` and `retypeEdges` (`remove`, `rekey`) and by the commit of a batch that clears a split flag where it stands

**1001.** **Stretches** (the base §3.4 *Stretches (J-K31)*, after "… before the stretch's rows and its interior knot rows leave"):

> (a `shape` row of the chain at the stretch's vertices is then kept or stripped by §2.2 rule 3)

**1002.** **A copy of an arena** (the base §3.4 *Arenas, keys and services*, after "valid until that arena's next commit (§2.2 rule 5)"):

> ; a copy of an arena — compacted on save or loaded (§3.9) — is another arena state, on which no slot or stamp read on the original is current (the copy takes a fresh, process-local restore generation compared by equality only; nothing is stored in the block)

**1003.** **The commit record's faces** (the base §3.3 *The commit record*, after "of the display list's dirty set (`faces`, `owners`; §8.1)"):

> — `faces` lists every record a batch created, changed or removed at each level ≥ its own, a record re-parented by the re-walk (§3.6 step 5) or by the re-levelling of `removeEdges`, `retypeEdges` and `clearFiner` among the changed

**1004.** **Between two ops of a batch** (the base §3.3 *The commit record*, after its last sentence "… and its per-batch twin, cannot arise."):

> Between two ops of a batch each level's live face records own disjoint rings: `insertChain`, `removeEdges`, `retypeEdges`' `rekey`, `clearFiner` and `setOwner` each return — committed op or refused — with no ring claimed by two live records, so `faceNeighbours` called between them reads one record per region.

**1005.** **The registry version of a stored chunk** (the base §3.9, after "An arena that holds only its outer ring writes its level-≤ 1 chunk alone and loads to that one face."):

> Each chunk names the role registry version it was written under; a load reads a chunk of that version or an earlier one (rows are append-only, §2.2 rule 7) — the byte format's reading, not a promise that an older cache's content is current — and refuses a later one as a corrupt cache.

**1006.** **What these items do not settle, and when they are applied.** Not settled, each a fix-queue row: a chain removed in TWO steps along a shared run — a stretch that ENDS at such a point, or a rekey cut there, clears the point's flag under rule 3 (b)'s whole-row-set comparison, so the point stays on the other chain once the rest is removed (Q181: a ruling on rule 3 (b) is owed; it predates this file); the reverse order (the chain first, another along it later) and three coincident chains with the base removed first (the same canonical-form class); a row whose role is newer than its chunk's registry version, and whether a cache written under an older registry version may be used at all (Q182: the second is M1's loader's); the kernel validator's own reading of the row and `splitThrough`'s `row` option (Q184). Applied: to the base with the amendments' next apply pass, with its critic and its anchor check; the round's landing does not wait for it — the three closing checks judge the code against these items.
