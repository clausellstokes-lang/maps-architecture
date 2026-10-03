# Verify — design volumes V05 (the sky layer) and V06 (evolution), coherence pass round 0

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/verify-vol-V05-V06-r0; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-vol-V05-V06-r0`; started 2026-10-03 in the cloud continuation; no earlier output on disk)
- P1 inputs gathered (canon routing for V05/V06, edges, cross-part notes from every rewrite report): done (scratch vv56/)
- P2 mechanical checks (ids, references, terms, deferral, mapping table, per-item tokens): done (findings in WORKING NOTES)
- P3 V05 archive → new review, section by section: in progress (resumed 04:45 after a cut)
- P4 V06 archive → new review, section by section: pending
- P5 cross-unit agreement, cohesion, wiring, edges: pending
- P6 report, results JSON, LANDED: pending

Scratch: `/tmp/claude-0/-home-user-maps-architecture/ce371545-83c4-5807-9f2a-da73abd8485d/scratchpad/coherence/vv56/`.

## 1. Outcome

(pending)

## WORKING NOTES (interim; folded into the issue list at the close)

* V05-REF-1 (minor, BROKEN-REFERENCE/TERM): V05's *Citations* paragraph (l. 7–8) keeps its own list rule ("a list or range
  after a volume prefix stays in that volume (`V06 §2.1, §3.2` is two sections of volume 6)") and the text carries 132
  bare list continuations after a `Vnn §` prefix (e.g. l. 116 "V05 §3.11, §3.12", l. 2896–2899 the §12 list), while canon
  S7 rules "'Vnn §x.y' everywhere, self-references included" and V06's head states the opposite rule ("the prefix written
  on every section of a list"); the same string "V06 §2.1, §3.2" reads two ways in two volumes, and 45 of the continuations
  also name an existing base section.
* V05-ROW-1 (minor, BROKEN-REFERENCE): V05 cites rows that no longer exist in their volumes — "(V06 X10)" (§3.19 (7),
  l. 1474) and "V06 (X10)" (§10, BCR-V5-23's row), "V06 (IN-V06-3)" (§10, BCR-V5-28's row): V06's X1–X49 table and its
  IN notes left the volume; "X-V12-4" (§7 parity paragraph), "X-V12-11" (§7 intro), "X-V12-16" (§8), "X-V12-17" (§8):
  V12's X rows left V12. "V02 §3.15.2 and X20" (§13) cites V02's row bare (ID-WX: `V02 X20`).
* V06-TERM-1 (minor, TERM): G-dwell routed V06's one hit; V06 §3.5.1 (2) still names the candidate dwellings `D_b`
  (l. 1122), the retired symbol (`D` is item 102's daylight share).
* V05-IN-1 (minor, COHESION/NARRATION): V05's *Integration notes* keeps the five rows IN-V05-1 … IN-V05-5; the canon's
  closure for V05:IN-V05-1 … -5 is "fold the note into the body at its home, then drop the note (S9, ID-WX)" — V06 did
  (one pointer paragraph, no ids).
* V05-G114 (major, F-MISSING; owner rule): file g item 114 (filed 2026-10-03 02:35 UTC, J126) names V05 ("islands and
  accesses: removed slots not counted as filled") and withdraws the held removal (item 260's suppression "the islands' and
  sky accesses' removed slots counted as filled, V05 §2.1"); V05 still states it — §2.1 `removed` / `removedAccesses`,
  `removedSlots(doc)`, §2.6's two rows, §3.2 (6) "A count never releases a hold", §3.10 (1), §3.15 (5), §4.2's delete,
  §4.5's held-slot line, J-V5.62, E-02 cited at §2.1 — and gives no switch row for floating islands and their sky
  accesses (item 114 (a)), no "for now" lapse (114 (c)), no preview words (114 (d)), no bars (114 (e)).
* V06-G114 (major, F-MISSING; owner rule): item 114 names V06 ("§2.13's ledger and §3.19 without the suppressed set");
  V06 §2.13 keeps `LifecycleEvent.detail.suppress` and the suppressed set, §3.19.3 the hold "never rebuilt until undone"
  and its dry-run lines, E-02 (kept apart) and J-V6 rows built on item 260's lift rule.
* V05-LOCK-1 (major, CONFLICT): V05 §3.15 (1b) *Against a lock* (l. 1232) and J-V5.82 (new) rest on "the dossier
  outranks a lock (§7.7; item 20 (h))", but §7.7's one precedence order reads "lock > dossier existence > assignment > …"
  (base l. 10870) and states no rule for a dossier change against a lock (verify-edges-life EL-01, blocker, determinism).
