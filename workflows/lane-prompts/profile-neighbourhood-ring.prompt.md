# NG ring capture reader
model=opus subagent_type=general-purpose

PROJECT CONTEXT. The owner wants to build an ORIGINAL procedural settlement-map generator whose output can stand next to four references: watabou's Medieval Fantasy City Generator (MFCG), Village Generator (VG), Neighbourhood (NG), and Thomas Allerton's Fantasy Town Generator (FTG). None of the current source code is available. What is available: the creators' own posts/devlogs/docs, watabou's 2017 open-source ancestor (TownGeneratorOS, Haxe, GPL-3), and recordings we made of the live generators (CPU profiles attributed to class names, exact call counts, draw-call records, screenshots). Your job in this step is EXTRACTION, not design.

Project root: /Users/cstokes/Desktop/Maps (all paths below are relative to it unless absolute). This project is COMPLETELY STANDALONE: do not read any other project on this machine.

HARD RULES
- Read every file in your slice COMPLETELY (no skimming, no sampling). Large report.md files are read in ranges until the end.
- Do NOT open or read any captured JavaScript bundle (captures/**/network/bodies/*.js) — the live code is proprietary; we work from recorded behaviour only (report.md / *.calls.json / *.cpuprofile / *.draw.json / screenshots / console traces).
- Separate what is evidenced from what you infer. Tag every technique line [STATED] / [SHOWN] (visible in a recording/image) / [INFERRED] (your reconstruction, with reasoning) / [NAMED-ONLY].
- Cite sources by file path so claims can be re-checked.
- Write your output to disk AS YOU GO (the owner may switch accounts mid-run; only files on disk survive).

YOUR SLICE (profile-neighbourhood-ring): the post-critic recording of the LIVE Neighbourhood generator's `ring` template at captures/neighbourhood/2026-09-21T07-20-25/ (URL tags=ring,medium; seed 7171 = gen-0 cold load, seed 7172 = gen-1 reload; passes profile, coverage, draw). Files: report.md (104 KB — read ALL of it in ranges), report.json (3 MB — query with python where report.md lacks a number), meta.json, profile/gen-{0,1}.cpuprofile (+ .trace.json), coverage/gen-{0,1}.calls.json (exact call counts per package.Class.method — analyse fully with python), coverage/console.jsonl, draw/gen-{0,1}.draw.json, and the gen-{0,1}.png screenshots in each pass directory (view them all with the Read tool).

Context you must read FIRST: research/findings/profile-neighbourhood.md COMPLETELY (the base extraction from the `area`/`square`/`street` captures, plus its "Critic addendum" CA-1..CA-5 which generalised the street/block identities per template: `Bisector.partition = Normal.populate + Hood.bisectArea`; `detectStraight = makeCut − (Street.new − k)` with k = 0/1/3 for area/street/square; `Block.new` vs `Street.new`; `Street.extend`; PoissonPattern k = 50 and lazy init). Then research/findings/watabou-extra-b.md — find its section on the NG `ring` template (search "ring") for the creator's STATED rule. Then research/findings/_critic.md §1.2, §2 rows C2/C3/C6/C13, and §6 item 2.

TASKS
1. Every `com.watabou.*` routine that executed in these two runs and was never executed in the other 8 NG coverage samples (`RingHood.*`, `Namer.ring`, `Settings.getInfo`, anything else): symbol, byte size, counts per run — extend the CA-1 table format with columns R1/R2 (seeds 7171/7172). Also list previously-seen routines whose counts are unusual here.
2. Identities: fill R1/R2 for every quantity in the CA-2 table and derive the ring template's k and `bisectArea`. State what the ring template lays down directly (a ring street? a central block/green/plaza?) — arithmetic is [SHOWN], the reading is [INFERRED].
3. The console trace: "Alternative cut" (BisectorEx.hx:215) and "Trying again" (BisectorEx.hx:237) counts per seed; compare with the other NG captures' console.jsonl (captures/neighbourhood/2026-09-21T05-04-54, 05-38-59, 05-40-05) and say what these retries mean for robustness (local retry, not whole-map discard?).
4. Describe both screenshots precisely (ring morphology; what is at the centre; street alignment; building/block counts; manors/greens/pins) and compare with the area/square/street screenshots described in CA-3.
5. Draw record: anything new vs §4 of the base file (colours, widths, layer order, label text = the hood name from `Namer.ring`).
6. Cost model for this template (profile totals per stage; gen-1 reload is the clean one; compare with §5 of the base file).
7. From call counts and call-tree parentage in report.md, give the falsifiable hypothesis for how `RingHood` builds its seed geometry (circle? `PolyCreate.regular`? `PolyBounds.circle`? `Offsetter`? `Hood.getCloud`?) and the test that would discriminate.
8. Confirm or refute CA-4 on these runs: `PoissonPattern` warp ÷ step = 50 exactly, and lazy initialisation.

OUTPUT: APPEND (never edit existing text) a section headed exactly `## Ring-template addendum (2026-09-21) — captures/neighbourhood/2026-09-21T07-20-25` to research/findings/profile-neighbourhood.md, in the same style as the Critic addendum (per-run tables, every claim tagged, file-path sources), including a short "what changes for a re-implementer" paragraph. Write it incrementally. When complete, run:
echo "$(date '+%Y-%m-%d %H:%M') profile-neighbourhood-ring LANDED research/findings/profile-neighbourhood.md (Ring-template addendum)" >> /Users/cstokes/Desktop/Maps/docs/lane-events.log
Then return a summary of at most 350 words: what the ring template does, the identities (k, bisectArea), new routines, retries, and any contradiction with the base file or the critic. One sentence labelling which of your conclusions are CONFIRMED (from counts/screenshots) vs PLAUSIBLE (inferred).