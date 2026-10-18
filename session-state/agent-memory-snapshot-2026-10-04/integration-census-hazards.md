---
name: integration-census-hazards
description: What the volumes/_integrate continuation (2026-09-29) found after four seam rounds — note leaks, late BCRs, orphan table cells, misnamed dossier fields
metadata:
  type: project
---
Found 2026-09-29 by the volumes/_integrate continuation (after seam rounds r0–r3 and reconcile r1–r4 of workflows/17-volumes.js; details docs/volumes/_integrate.md §8):

1. **Integration notes re-leak clean-room names.** Notes recording a rename (IN-V01-1, IN-V07-1, IN-V09-1) named the retired reference identifier; the whole-token scan (tools/integrate/cleanroom2.py) misses compounds (a J row's `set<RetiredName>`). Scan notes too, and add a substring pass (reference camel identifiers >= 7 chars inside our tokens).
2. **Parallel reconcile lanes leave requests uncarried.** reconcile-BASE-F-rN can land before a volume lane of the same round writes a new BCR (BCR-V11-31 → item 581). After the last round, re-run the request census: every bold `**BCR-…` head in the twelve `## 10` cited by file f, and nothing cited that no `## 10` defines.
3. **A record field with many readers can have no producer.** The raised-way record's `supports` was read by seven volumes and laid by none; V11's pier cells had no reader; V09 edited two fields the record lacked (J-VI.27, file f item 244's support step). Check producers of shared record fields, not only readers.
4. **Wiring traces misname dossier fields** (V07 `nearbyResources[]`, V11 `site.terrainType`) even inside a seam pair; census backticked dossier paths against V08 and the base's `DossierDigest`.
5. Seams never read together: V06×V08/V09/V10, V11×V01/V03/V04/V05/V09/V10, V08×V01–V06/V12, V09/V10×V01–V07/V11/V12, V12×V01/V03–V05/V07–V10 — census those pairs.

**Why:** four whole-read seam rounds still missed these; name/field/producer censuses are cheap and reach every pair.
**How to apply:** at any integration or finalize pass, run these censuses (tools/integrate/seccite.py and identcite.py; the dossier, request and substring censuses as _integrate.md §8.2–§8.3 describe them) before declaring coherence. See [[clean-room-input-hazard]], [[wired-architecture-directive]], [[item-101-r2-no-structural-refusals]].
