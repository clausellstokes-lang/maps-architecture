# judge-3 — the three sites-roads designs judged (J393)

> Designed on Opus 5.5 under the owner's staffing word of 2026-10-18 (J394); Fable critique closes the run (lane sites-roads/critic)

- **Lane:** `sites-roads/judge-3` (opus; J394, Fable-critiqued). Judge 3 of three independent judges; the other judges'
  records were not read. Nothing is applied by this seat.
- **Started:** 2026-10-18 09:39 UTC. Written as it goes.
- **Inputs (md5 at the read, `md5sum`):** README `eabd68cd`; design-A.md `9d495fba` (1 776 lines) + design-A.fragments.json
  `cfe477ae`; design-B.md `a47697d1` (1 036 lines); design-C.md `cc051133` (1 479 lines) + design-C.fragments.json
  `a0c3c4a8`; read-v14 `6d127498`, read-v13 `64637654`, read-base `33635e21`, read-research `d97b4fcc`, read-checks
  `28609ac2`.
- **Targets as they stand now (09:40Z):** V13 `d0de9ad8` (4 465 lines), V14 `70d8aa1b` (3 213), base `1f871a01` (24 462),
  INDEX `42881796`, SUMMARY `9d142283`, file s `3b83b3af`.

## 0. Working notes (written as read; superseded by §1–§4 below)

- 09:41 — design-A read whole (1 776 lines). Fragment check by script over all 96 (`judge-3/bin/verify.py` in the
  scratchpad): each current text exactly once in the live target at the line named, every file's fragments applied
  in order to copies with 0 misses and each new text once after. Notes: catalogue-first; five kind-row columns;
  `routed` retired; sites no longer W7 seats on a standalone world (A-36, A-48 rewrite V13 §3.8 (1)); approach road
  `WorldRoute` origin `approach`; `siteKind` term; bend for four kinds; `Placement.approach`; anomalies
  `siteIncoherent`, `noRoadAccess`; H31 optional; M12; one OQ. Internal slip: H31's timing reads "with M-W2, after H19"
  in §1.4 (m) but "after M-W3, after H19" in A-76 and "H18–H20 and the optional H31 after M-W3" in A-88. LANDED line
  says V14 31 fragments; the table has 32 (A-1..A-32).
- 09:43 — design-B read whole (1 036 lines); all 93 fragments exact once at their lines, in-order apply clean (B-92
  targets the repository `README.md`, md5 `2a4b54c8`). Pipeline-first; keeps `routed` (a W7 seat) beside a
  `roadAccess` row {join, class, reachM, correction snap|offer|report}; byway `WorldRoute` origin `byway`; host-bound
  `routed` site a station of a host edge within 500 m / 1.1 (a dated lay version); weight 3, raw 2/1 (6 > 4 unlawful;
  3 lawful) — arithmetic sound; only two `snap` kinds; the expectation is road relation only (no ore, crossing-as-
  geography only for bridge fort); OQ-1, OQ-2. Extra scope: `placeFrame` `{ site }` (B-31), T-V13-12's count (B-37),
  §3.11.1's "six terms" count (B-20); §0–§1 cites at the pre-J392 md5s (stated in its cite form).
- 09:43 — design-C read whole (1 479 lines); all 56 fragments exact once, apply clean. Coherence-first; `roadAccess`
  six values + `expect` + `autocorrect` move|bring|hold + `autocorrectM`; site trail (origin `siteTrail`, excluded from
  `existingRoute`/`connectivity`/patrols/siting terms); via re-lay of a host route through a `served` site within
  1 000 m; the site terminal (J-V13.114); entrance way G5 (f). **Defect:** weights siteAccess 4 / siteExpect 4 with raw
  1 give total 4 = `lawfulMax` 4, which is LAWFUL under V13's `lawful = total ≤ lawfulMax` (V13:748, :2102), so a
  single unmet access or expectation never makes a placement unlawful and the `move` autocorrect never fires (its own
  T-V13-57 toll-house clause contradicts its law); C-11's text claims the opposite. **Defect:** C-52 rewrites file s's
  INDEX state line "the Fable retrovalidation's corrections" to "…autocorrects" (a rename leak). C-31 keeps "approach
  way" after renaming it "entrance way".
