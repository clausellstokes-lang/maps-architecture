# rewrite-V10 — routing state (kill-safe; the files on disk are the truth)

Source: docs/volumes/V10-clerk.md (4047 lines, 83 260 words by wc; canon counts 84 658). Parts: work/rewrite-V10/parts/NN-*.md.
Output: docs/validation/coherence/new/volumes/V10-clerk.md. Report: docs/validation/coherence/rewrite-V10.md.
Scratch (regenerable): $SCRATCH/coherence/{canon-V10.md, conflicts-V10.md, edges-V10.md, handoffs-V10.md, inv-V10.json, ids-wiring.md, elegance-cohesion.md}

## Canon unit V10 (canon.md lines 5129-5227)
- band after: 50 795 – 63 494 words; narration ranges ~13 054 words; 31 restatements → references; 23 BCR blocks → pointers
- HISTORY OUT: V10-0779, V10-0780
- REFERENCE (31): V10-0121 §7.1; -0140 §14; -0144 V09 §4.8; -0163 V09 §9; -0169 V11 §9; -0200..-0204 §11.2; -0205 §2.13;
  -0214 V01 (find); -0300 V09 §2.9; -0339 §4.7; -0340 §4.5; -0341 V04 §2.6; -0342 V04 §2.2; -0343 V04 §9; -0344 V04 §3.5.7;
  -0345 V04 §1b.1; -0346 V04 (find); -0347 V04 §9; -0348 V04 §2.2; -0349 V04 §3.5.1; -0350 V04 (find); -0351..-0353 V03 §9;
  -0354 V03 §3.7.2; -0355 V03 §9; -0410 V08 §5.4
- §10 → pointer table BCR-V10-n → item: 1→468, 2→311, 3→270, 4→297, 5→469, 6→470, 7→473, 8→518, 9→538, 10→531, 11→487,
  12→348, 13→471, 14→519, 15→271, 16→365, 17→366, 18→367, 19→481, 20→368, 21→290, 22→572, 23→571
  (inventory bcr_to_file_f adds: BCR-V10-3 also 269; -20 also 570; -5 also 459; -1 also 460, 463, 467, 583; -6 also 461, 463, 572)
- terms: G-cite (288 hits), G-DR (2; DR-V… → DR26–DR35), G-newrandom (4; 'scoped re-roll' / 'Try again' in prose / 'Rebuild … as generated' → New random), G-suppress (1; 'kept removed' → suppression), G-clerkhandle (14; ClerkHarness → ClerkHandle), G-offline (error.clerkOffline → refuse.clerk.offline), G-floorvault
- conflicts (18): DIC-06 (ID-TOOL), DIC-07 (ID-LAYER), DXC-04 (binding at §7.1; V10 §3.5's encoders cite §7.1), MC-11 (Segment declared §2.1 base — V10's Segment is a different thing? check), SCOPE-C07 (J121/J122: SF assistant via host seam = config C; built-in clerk M3c), SCOPE-C16 (@plat/clerk item 518; @plat/cli W-PKG-01), V09-XAGREE-1 (linkEdits {bindTo?, avoid?, cut?} at V11 §4.2; V10 §4.1 writes declared cells only), V09-XAGREE-3 (V02 §1b bend ids; V10 words bends through V09's rows), V10-XAGREE-1 (drop 'avoid' condition, cite V11 §4.2), V10-XAGREE-2 (drop family shim; V01 names sun/nuisance; CVR-V10-6 met), V10-XAGREE-3 (size words: lexicon names V09 §4.5 T1 quantile, no number), V10-XAGREE-4 (wet-ground crypt: V03 §3.7.4: always-class → raised-choir crypt; else no crypt, ledger slabs; V10 §3.9a words both), V10-J121-1/2/3, CANON-C02 (lone-hood bend row), CANON-C03 (§11 answered), CANON-C04 (no open fix item)
- f items cite as base text: 238 246 260 270 271 290 297 311 339 348 362 365 366 367 368 460 461 463 464 465 466 468 469 470 471 473 481 487 516 518 519 531 538 568 570 571 572 582 583
- g: 111 (why rows for water pull and oasis) and 113 (the story told; symbolic peak words) — NEW DESIGN at build depth (V10-MISSING-1/2)
- wiring: W-IF-01 (V04 providers in owed table), W-IF-02 (V07 provider), W-IF-03 (V01's three providers in owed table), W-IF-05 (RuleAnswer gains register entry; register.json input), W-PKG-01 (@plat/cli or plat clerk in @plat/api's CLI), W-EDIT-01 (closed by DXC-04/E-04), W-FLD-12 (Segment.promptTokens reader), V05-WGAP-2b (island bend lines in bend category), V06-WGAP-1b (lone-hood bend line), V10-WGAP-1 (islet sizeM2, ring sides into clerk.content.encoders)
- elegance: E-04 (binding at §7.1), E-07 (dry-run outcome table at §7.1), E-17 (admission at §9.2), E-24 (one superseded/amended mark), E-28 (PlanReport.notes for shrineOneRoom, solidMonument, stackCarried), E-32 (refuse.clerk.offline one row), E-33 (ClerkHandle only)
- ids: ID-BCR, ID-TOOL, ID-LAYER, ID-WX, ID-DUPDEF
- Q1–Q5 answered (J121/J122); Q5 staging into §7.3
- disagreements: WhyPull (V01), SettlementForge (V08, V09, scope: SCOPE-C07), EditEvent (V09, determinism: DXC-04), T-V9-15 (V09-XAGREE-3), BCR-V10-20 (DXC-04)
- Fix list items V10-0748..0767, V10-0781; hand-offs 21 (scratch handoffs-V10.md)
- edges: 51 UNDEFINED, 14 UNTESTED; 8 combinations (C-steep/moat/square/frame/sewer/access/vault/custom × clerk) → new §3.23 edge table + T-V10 bars
- open findings 39 (canon-V10.md)

## Decisions taken by this editor (recorded in the report)
(none yet)

## Mechanical pass (done; re-runnable)
convert.py → converted.md (G-cite, list continuations, ClerkHarness, error.clerkOffline, narration ids in parentheses, file f/g item → item, BCR → applied item in the body); log convert-log.txt.
Source parts: src/NN-*.md (split of converted.md). New parts: parts/NN-*.md (written by hand from src).

## Parts plan (status on disk is the truth)
00-head · 01-s0 · 02-s1 · 03-s1b · 04-s2a (2, 2.1–2.5) · 05-s2b (2.6) · 06-s2c (2.7–2.11) · 07-s2d (2.12) · 08-s2e (2.13)
· 09-s2f (2.14–2.15) · 10-s3a (3, 3.1–3.2) · 11-s3b (3.3) · 12-s3c (3.4–3.5) · 13-s3d (3.6–3.8) · 14-s3e (3.9)
· 15-s3f (3.9a + new 3.9b water and history, items 111/113) · 16-s3g (3.10–3.11) · 17-s3h (3.12–3.13) · 18-s3i (3.14–3.16)
· 19-s3j (3.17) · 20-s3k (3.18–3.22) · 21-s3l (new 3.23 edges and combinations) · 22-s4 · 23-s5 · 24-s6 · 25-s7 · 26-s8
· 27-s9 · 28-s10 · 29-s11-13 (+ Integration notes)
