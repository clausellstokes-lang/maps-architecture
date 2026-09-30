# rewrite-V12 routing notes (working file; resume from here)

Source: docs/volumes/V12-calibration.md md5 0cada4c8472afcff2ab3181cf5a99dc9, 3 566 lines, 75 054 words (wc) / 76 414 (canon count).
Goal band after (canon): 45 848 – 57 310 words. Parts: work/rewrite-V12/parts/NN-*.md, assembled in name order.
src/V12-work.md + transform.py: an earlier mechanical pass (G-cite, G-DR, ID-JT, ID-BCR, BREF). Its BREF rule wrongly
prefixed other volumes' bare sections (V11 (§3.23.1) → V11 (V12 §3.23.1)); the parts are written by hand from the source,
citations fixed while writing, so src/ is reference only.

## Canon unit V12 (canon.md l.5406-5470)
- STATE 384; REFERENCE V12-0007 (§13.5), V12-0008 (§17.1) → the hooks table as pointers.
- §10 → pointer table: BCR-V12-1 → 496; -2 → 497; -3 → 503; -4 → 504; -5 → 381; -6 → 500; -7 → 491; -8 → 535; -9 → 533;
  -10 → 521; -11 → 569; -12 → 501; -13 → 488; -14 → 502; -15 → 447; -16 → 489; -17 → 447; -18 → 536; -19 → 492; -20 → 493;
  -21 → 537; -22 → 382.
- Terms: G-lot (lots.r4.* → bldg.r4.*, lots.wallAlign → bldg.wallAlign; NG lots → plots), G-cite, G-DR (DR-V8.2→DR30, .3→DR31,
  .4→DR32, .5→DR33, .7→DR34, .8→DR35), G-M6U, G-JT (J-T → JT); G-suppress (suppression), G-bend (IN-V12-3).
- Conflicts: SCOPE-C14 (no premium FTG, J122), V12-ICONF-1 (§3.7.6 raised bump: met need, cap step, cistern terminal,
  V11 §3.24.7 (3)), V12-ICONF-2 (§13 sentence out), V12-XCONF-1 (J122 sittings: M1 look check, M2b, M4, M5, batched,
  ~1 h; staged panels join the next gating sitting when landed, else provisional — not rated; §0, §3.9.1, §6, §8.3 r6,
  Q-V12-2), V12-XCONF-2 (pinning hash at §7.6, whole provenance excluded), V12-XCONF-3 (stages S5a–S5d, S12a–S12c; no
  'S12'), V12-XCONF-4 (servedShare district = every district; ≥ 30 households only T-V11-18's reading → minHouseholds),
  V12-XCONF-5 (BCR-V12-4 cites J122's per-frame rule), CANON-C03 (§11 a decisions table), CANON-C04 (no open item).
- f items cited as base: 229 291 376 377 381 382 447 456 488 489 491 492 493 495-504 521 522 529 533 535-537 568 569 575 584.
- g: 111 (bars: register lines + NoOpPin), 112 (trial record; style check's register line), 113 (bars; replay budget;
  register lines; NoOpPin), 114 (register lines, bars), 115 (bars), 116 (bars), 117 (bars), 118 (bars), 119 (bars and how
  each is measured). New base bar ids exist for 111 (T111-1..5), 112 (T112-1..2), 113 (T113-1..7); 114–119 have none yet
  (scope's repair round) → cited by clause ("item 114 (g)").
- Wiring: W-IF-04 (V09's cell inspector ← register entry), W-IF-05 (V10's RuleAnswer ← register entry; V10 §1b.1 input).
- Elegance: E-20 (NoOpPin for every owner item's pin), E-24 (one mark on decisions), E-35 (§2.11 one table with
  consumers; §1b cites), E-37 (MetricUnit subset of §2.1's Unit), E-38 (haPerHead leaves the register; farm rows stay).
- Ids: ID-BCR (BCR-V1-n, BCR-V4-n), ID-JT, ID-WX (IN ids out of the body; Integration notes as a map).
- Owner Qs: Q-V12-1 J122 no; Q-V12-2 J122 sittings; Q-V12-3 J122 only where the owner's sitting passes.
- Hand-offs to close: V02:X33, V06:X9, X19, X31, X38, X49, V11:X-V12-1, X-V11-12, X-V11-14 (c), X-V11-16 (b), X-V11-17 (f).
- Disagreements: T-V6-62 (V11-XCONF-1: V12 §3.11 home of stateSnapCm's entry), T-V11-18 (V12-XCONF-4).
- Edges: 40 UNDEFINED + 11 UNTESTED (scratch edges-V12.md); 17 combos feature × presets → new V12 §3.16.
- Findings (34): RESTATEMENTS-011/-012 (off values and minima cited from V11), RESTATE-1/-2, ICONF/XCONF above, ELEG-1,
  MISSING-1..7, TERM-1 (the M4 panel's M4-110 group), TERM-2, NARR-1..5, BREF-1/-2, HANDOFF-1, SCC-109 X-V12-18 clause,
  IN-V12-1..4 folded.

## Plan of parts
00 head + §0 · 01 §1 · 02 §1b · 03 §2–§2.4 · 04 §2.5–§2.9 · 05 §2.10–§2.13 (+ trial record) · 06 §3.1–§3.3 · 07 §3.4 ·
08 §3.5–§3.6 · 09 §3.6b · 10 §3.7 · 11 §3.8–§3.9 · 12 §3.10 · 13 §3.11 · 14 §3.12–§3.14 · 15 §3.15 (items 111–119) ·
16 §3.16 (edges and combinations) · 17 §4 · 18 §5 · 19 §6 · 20 §7 · 21 §8 · 22 §9 · 23 §10 · 24 §11–§13 + Integration notes.

## New ids
- Tests T-V12-42 … ; decisions J-V12.84 … ; spec ids T111d.*, T114g.*, T117i.*, T118h.* (V12's own spec ids, as T110b.*).
