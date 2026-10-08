# M0 cross-item fix queue — the one routing surface (N-53 (7), J243)

Every defect one item reports against ANOTHER item (or "for the session", "for X's fix round", "the session routes")
gets a row HERE the moment it is seen — never only a sentence in a choices or notes row (that is how C-0177 (10) sat
unrouted for four days). The session works this queue top-down as seats free; a row leaves only with a commit hash or a
ruling id. M0 is the bedrock (J238): nothing here is waived; the M0 hardening phase (J237) drains whatever is left.

Status: **OPEN** (not started) · **RULING** (a ruling seat is deciding) · **ROUND** (a fix round is running) ·
**DONE <hash>** · **HARDENING** (parked for the M0 hardening phase with a reason).

## Fix-now class (fail-safety, persisted output, contracts — N-45 (a)/(c))

| # | defect | reported in | target | status |
|---|---|---|---|---|
| Q1 | splitThrough writes into a stale half-edge table when a split doubles it (20 crashes) | C-0177 (10), M0-a-05 N-6, M0-x-06 B4 | M0-a-04 | ROUND (N-53 (1), build/M0-a-04-fix-s1) |
| Q2 | splitChain splices a far kerb corner at width steps (S9 commits a block fragment) | C-0270 (18) | M0-a-09 | ROUND (N-52 (2); closing check) |
| Q3 | exact zero-width spurs refused as sharpCorner (corpus bar) | C-0270 | M0-a-11 | DONE b8e03416 (N-52 (3), rounds S1+S2) |
| Q4 | deep-spine slit lane kept while the block is recorded court (PLAUSIBLE) | N-52 (4) | M0-b-03 | ROUND (N-52 (4), build/M0-b-03-fix-s2) |
| Q5 | S5a wall trace crosses the river on 6 wall edges 10-13 m deep with no water gate and commits (seed 9) — silently wrong | M0-e-06 check §5 #3, C-0271 (11); integration-g12 N-2 | M0-c-02 (+ M0-e-06 receipt) | DONE (M0-c-02 part, 1836e6f0); M0-e-06 receipt OPEN (N-54 (4); brief rendered 2026-10-08 ~11:20, session-fix/prompts-e06s1.json; launches as a seat frees) |
| Q6 | a committed setback line lies outside the frame (wall × frame, seed 496296019) | M0-x-06 check, C-0278 (5) | M0-c-02 | DONE (same commit as Q5) |
| Q7 | a crossing site with a deck end outside the frame can still be spanned by S4 (21 seeds) | M0-x-06 check, C-0278 (5) | M0-c-01 | ROUND (N-54 (2), build/M0-c-01-fix-s1) |
| Q8 | bridge:41's way runs over water off its span (CONFIRMED geometry) | M0-e-06 check §5 #4, e-06 notes row 7 | M0-c-04 (not M0-c-03) | ROUND (N-54 (3), build/M0-c-04-fix-s1) |
| Q9 | remove(insert(x)) after W_STRETCH_SHARED leaves the coarser run split — encoded chunks differ (N-46 (6)(e) vs §2.2 rule 3 (b)); ruling asked "now" 2026-10-06, never given | C-0219 (4), a-06 notes N-11 | session ruling → M0-a-05/M0-a-06 | RULING (seat B launched 2026-10-08 ~11:05, lane session/ruling-lifecycle, J247) |
| Q10 | insertChain leaves a dissolvable vertex where a chain folds back over its own edge (case 5317/20 000), counted under foldedBase | C-0223 (5), M0-a-06-s2 | same ruling as Q9 | RULING (seat B launched 2026-10-08 ~11:05, lane session/ruling-lifecycle, J247) |
| Q11 | removing every live chain leaves a content print ≠ the bare frame (seeds 25-27, 30, 32, 36), never investigated | M0-a-14-s1 | same ruling as Q9 | RULING (seat B launched 2026-10-08 ~11:05, lane session/ruling-lifecycle, J247) |
| Q12 | N-49 follow-on half done: lifecycle.test.ts still tolerates 'n13' (6 cases in s6-lifecycle.json) — masks the restore promise | C-0235, M0-a-14-s1 | M0-a-05 | RULING (seat B launched 2026-10-08 ~11:05, lane session/ruling-lifecycle, J247) |
| Q13 | a stale overlay writes outside a transaction with the version not bumped | M0-a-16 notes 1 | M0-a-06 | RULING (seat B launched 2026-10-08 ~11:05, lane session/ruling-lifecycle, J247) |
| Q14 | refused-residue: planted geometry stays committed with no record; a bug abort leaves earlier batches committed | M0-x-06 notes rows 1-2 | stage owners / M0-a-06 | RULING (seat B launched 2026-10-08 ~11:05, lane session/ruling-lifecycle, J247) |
| Q15 | the hard stage-end row seam-portals is declared but never evaluated (the report shows pass) | M0-b-03 notes N-9 | M0-b-03 (portalInvariant and runS8 are both in its owns: infill/portals.ts, infill/stage.ts — the queue's first guess M0-x-04 / M0-c-06 was wrong; routing S8's batch and draws through the runner stays M0-x-04's) | OPEN (round s3 on M0-b-03 after s2 lands; the session renders it) |
| Q16 | warp.halvings floor test-pinned yet marked calibratable (persisted table metadata M1 reads) | M0-f-03a N2 | M0-f-03b / tables | OPEN |
| Q17 | splitThrough fix retires M0-a-05's reservePair; tiny-table guard; tx throw-rollback pin; bridgeGaps re-read | N-53 (2)-(5) | M0-a-05, M0-a-02, M0-a-06, M0-a-08 | OPEN — briefs rendered 2026-10-08 ~11:20 (session-fix/prompts-a05s7, a02s1, a06s4, a08s3.json); a-02/a-06/a-08 launch as seats free, a-05 after Q1 commits |
| Q20 | S1 water batch refused without retry on self-touching plants (~3 % of EP-01 seeds) and SMALL_RIVER refused unplanted on some seeds (676291635, 1595424233) — fail-safe typed refusals | M0-x-06 fix1 result, C-0278 (2) | M0-e-03 | OPEN (bedrock: judge fix vs carry in hardening) |
| Q21 | S6 refuses a degenerate boundary before its batch (< 1 %) | M0-x-06 fix1 result | M0-e-04 | OPEN (hardening triage) |
| Q22 | S5a coincident plant refused (~0.5 %) | M0-x-06 fix1 result | M0-c-04 | OPEN (hardening triage) |
| Q23 | CLEAN-ROOM ledger rows appended at the file's end (under §5's table) are invisible to landed's appends (L-0335, L-0337, L-0346, L-0348 seen) | several seats | tools/landed + session | OPEN |
| Q18 | S8 ≈ 100 ms per cut vs 12 µs (kerb read rebuilds a scratch arena per face) | KI-12 | M0-a-09 / M0-b-03 | HARDENING (perf; before M0-t-01) |
| Q19 | S8 ≡ S9 exact-0 share (commit attraction within 73.5 cm) | KI-13, N-52 (1) | M0-a-09 | HARDENING |

## Lower severity (record-keeping, hygiene, tests) — drained in the M0 hardening phase

| # | item | reported in | target |
|---|---|---|---|
| L1 | an `exempt` parameter would make placeAcross one call | C-0209 | M0-a-04 |
| L2 | the per-batch arena image's O(arena) memory cost, unmeasured | C-0185 (1) | M0-a-06 (measure at M1) |
| L3 | TransientKey/ArenaKey not re-exported from @plat/model | C-0220 (11) | M0-m-01 |
| L4 | QuarterNode declared in layout, not @plat/model | C-0245 (14) | M0-m-01 |
| L5 | the twin's skeleton timing row stale; C-0026's downgrade switch described as built but not built | M0-a-12 N-1, N-2 | spec lane (M0-work.json) |
| L6 | C-0147 missing from M0-d-05a's and M0-x-02's choices in M0-work.json | M0-d-01 N8/N16, M0-d-05a N-2 | spec lane |
| L7 | stray plat/undefined.cur (599 B, 2026-10-05) — find the writer, then remove | a-09 notes, d-08 N-9, s-01 N-10 | session — DONE 2026-10-08 ~11:10 (J247): no writer exists in the tree or in history (`git log -S` over plat finds only the three notes rows; the only `.cur` writers ever are none — the JSON is one arr-booleans fuzz case, `{"i":199,"c":{"op":"difference","fill":"nonzero",…}}`, written 2026-10-05 00:09 by an uncommitted probe of an M0-a-08-era seat under a name built from an undefined variable); every copy in the mirrors is a `cp -a` copy (same mtime and md5); the file was removed from plat/ (a copy kept at ~/maps-scratch/undefined.cur.removed-2026-10-08) |
| L8 | split faces take the split face's stage rank, not the batch's — judge | integration-g9 N-3 | M0-a-05 / M0-a-06 |
| L9 | one bugs list uses three key vocabularies | integration-g11 N-4 | session |
| L10 | agreement tests call fc.assert unseeded (N-43 counts vary run to run) | M0-a-06-s3 | M0-a-06 / M0-k-01 |

Source: the routing audit of 2026-10-08 ~04:10 (a read-only Opus census of choices.md and every checks/*.md; ~30
cross-item reports were already ROUTED and are not listed). Every checks/M0-*-notes.md row not listed here is drained
by the hardening phase as J237 states.
