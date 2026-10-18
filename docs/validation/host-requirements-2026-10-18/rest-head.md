# Before scheduling the host work: order, risks, open questions, rulings, and the fork audit

Extract for the host-requirements document, from the "everything else" source family. Written 2026-10-18.
Facts come only from the files cited. Each row gives the plain statement first and the exact pointer after it.

## Read this first

- **The owner answered V13 Q4 "yes" on 2026-10-18.** World-level facts (travel difficulty between settlements, water access, which sites exist) may reach the host; a town's own geometry still may not. That unblocks two host items: the host's builder over the world canon (H5) and the freezing of every new campaign's world facts at its creation (H22). See DV-00.
- **The owner's other questions on V13 and V14 are not closed.** The owner deferred them to the session on 2026-10-16. Each stands as the session's recommendation and the owner can still overrule it. See OQ-01 to OQ-07.
- **The host's order of work**, if the owner accepts V13 Q2's recommendation:
  1. H1–H3 now, before the host launches.
  2. H4–H11 with the first world milestone.
  3. H12–H17 and H22 with the second.
  4. H23–H30 with the lenses: plague first, then territory and patrols.
  5. H18–H20 after the third milestone.

  See SQ-01 to SQ-06.
- **Patrols and the world-to-encounter link** appear in this source family only in these items:
  - the patrol random-source row (SQ-08);
  - W2's "sway with patrols" (SQ-03, SQ-10);
  - the lens order that puts territory and patrols second (SQ-05, DV-08);
  - the host's own strength comparator and fight verdicts (DV-03, DV-05);
  - world-map encounters waiting on M-W1 (SQ-12);
  - the host record for world sites (OQ-05, RK-06);
  - DM-placed holy sites offered to the host (DV-10).

  The full patrol and encounter requirements are in other source families (V13 §8.5's host items and the body of the realm review), which this extract did not read.

## Plain-words glossary

- **Host**: SettlementForge, the app the maps module lives in.
- **Fork**: the host's modified copy of the Fantasy Map Generator (FMG), an open-source map generator embedded in a frame on the page.
- **Canon**: the frozen record of world facts the host's simulation reads.
- **Digest**: the host's integer summary of that record: territories, gates and travel distances.
- **Canonize**: the act of freezing it.
- **Port**: the one-way channel that carries world facts from the map to the host.
- **H1–H30**: the numbered host change items listed in V13 §8.5.
- **M-W1, M-W2, M-W3, M-W5**: the world milestones (terrain, water and siting; routes, territory, sway and patrols; labels, exports and the adapter; the lenses).
- **Lens**: a dated map overlay, such as plague spread or patrols.
- **Sway**: the political reach projected over the land.
- **Seat**: a settlement that holds territory.
- **Spike**: a timed test that retires a risk early.
- **Fallback**: the answer decided in advance if the spike fails.
- **p95**: the 95th-percentile run.
- **J-row / J384 etc.**: a numbered decision in docs/PROGRESS.md.
- **BCR**: a change request against the base design.
- **Door 1**: the base rule that the host's simulator never reads a settlement map's own geometry without the owner's word.
- **VTT**: virtual tabletop (Foundry and similar).
- **DM**: the game master.

## Notes on the sources (what changed under this read, and inconsistencies to fix)

1. **Line numbers shifted after this task was set.** docs/volumes/V13-world.md, docs/volumes/INDEX.md and docs/OWNER-BRIEF-WORLD-SITES-HYDROLOGY-DRAFT-2026-10-16.md were rewritten at 00:24 UTC on 2026-10-18, recording the owner's Q4 answer. Every citation here uses the current lines; each changed section was re-read whole after the rewrite. The shifts:
   - V13 §8.4 is now lines 3687–3702, §11 is 4262–4327 and §12 is 4327–4390.
   - The brief's §9 is now lines 195–208.
   - INDEX §6 is still at lines 181–230.
2. **Stale wording, now superseded by the owner's answer.** research/sf/fp-realm-review.md §6 Q-RR-1 (line 679) and the J384 row (docs/PROGRESS.md line 443) still describe Q4 as awaiting the owner.
3. **The realm review's schedule is out of date.** research/sf/fp-realm-review.md §6 Q-RR-2 (line 685) gives the host schedule without H22 and H23–H30. V13 §11 Q2 (line 4273) is the current form.
4. **H22's prerequisites differ between sources.** The brief's §9 (line 206) lists H5, H7 and H12. V13 §11 Q4's answer (line 4296) lists H5, H7, H8 and H12. The host should plan to the longer list.
5. **Old map files: which versions the adapter reads is unclear.** The brief's W3 row (line 205) says the adapter reads 1.114 and 1.152. V13 §12's parity row (line 4387) says it reads 1.152 and later, with older files only through the fork's open-and-resave. The host's fork and stored snapshots are 1.114.2 (audit §2.1). Settle this before H20 retires the fork; see RK-07.
6. **Which file is the audit.** In research/fmg/, the file that audits the host's FMG integration is research/fmg/notes/sf-host-fmg-integration-audit.md. It audits settlement-engine at commit 00b648c, dated 2026-10-02, and the audit itself is dated 2026-10-16. It was read whole (296 lines).
