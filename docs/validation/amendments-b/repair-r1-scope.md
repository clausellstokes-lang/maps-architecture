# repair-r1-scope — lane amendments-b/repair-scope-r1 (SCOPE part: the summary, §0, §1, §13–§17, the Delegated decisions,
# the Judgment-calls index, the Staged list, Appendix A): block file per the BLOCK PROTOCOL.
# PENDING FABLE REVIEW (preamble only; never inside a block) — written by opus standing in for the Fable seat
# amendments-b/repair-scope-r1; queued in docs/FABLE-REVIEW-QUEUE.md. Text before the first "=== " line is ignored.
# Base: docs/ARCHITECTURE.md sha256 87d8969209c7deb5… and docs/ARCHITECTURE-RATIONALE.md sha256 3f39b2de60c97741…
# (assemble-r0's output). Each REPLACE body is the live subsection with asserted single-occurrence substitutions, every
# untouched line verbatim (scratchpad rs1/: lib.py, b_front.py, b_13.py, b_14_15.py, b_16_17.py, b_tail.py, b_rows.py,
# compose.py). The lane's report and kill-safe ledger: docs/validation/amendments-b/repair-scope-r1-report.md.
#
# BLOCKS (21 REPLACE, all scope-owned; no other repair file writes these sections): the summary · §0.2 · §1.1 · §1.2 ·
# §1.4 · §13.1 · §13.2 · §13.3 · §13.5 · §13.6 · §13.7 · §13.8 · §13.9 · §14 · §15.1 · §15.2 · §16 · §17.1 · Delegated
# decisions · Staged · Appendix A; J-ROWS (7: J-A15.01, J-A23.02 new; J-A16.01, J-A23.01, J-A27.01, J-A28.01, J-A28.02
# restated); RATIONALE-A (9: the same, with J-A20.01 and J-A21.01 restated in Part A only).
#
# ASSEMBLER HAND-OFF
# (1) RESTATED ROWS. The protocol only appends, so the J-ROWS and RATIONALE-A blocks carry restated rows under existing
#     ids — index J-A16.01, J-A23.01, J-A27.01, J-A28.01, J-A28.02; Part A the same and J-A20.01, J-A21.01. apply-blocks.py
#     appends them ("DUPLICATE ID inserted"); for each, move the appended row into the older row's place and delete the
#     older row (repair-r1-kernel's hand-off (1) procedure), so one row per id remains. J-A15.01 and J-A23.02 are new; they
#     may stay where they land or sit in item order among the scope rows (after J-A13.01 and J-A23.01). The audit's
#     part_a_without_j_rows lists J-A20.01 and J-A21.01: expected — their index rows stand unchanged.
# (2) VS-40, THE INDEX PARAGRAPH (not a block). The paragraph under "# Judgment calls" shares that level-1 heading with the
#     index table, the only heading above it; a REPLACE of "# Judgment calls" would delete every J-ROWS row the files
#     before this one (name order) append there. So this file carries no such REPLACE: after applying every file, replace
#     the four lines prefixed "# OLD| " below (prefix stripped; exactly one occurrence in the document) by the five lines
#     prefixed "# NEW| " — a scripted exact swap like the row swaps of (1); scratchpad rs1/postproc.py does both.
# OLD| The rows `J-A⟨item⟩.⟨n⟩` are the amendments-b pass's (items 8–31 of the second amendments file; 2026-09-26/27):
# OLD| ⟨item⟩ is the amendment ruled on, and the first digit of ⟨n⟩ names the ruling's home — 0 for the scope part (§0's
# OLD| landing table, §1, §13–§17 and the lists), otherwise the number of the section family that states the rule. Each has
# OLD| its Part A entry like every other row.
# NEW| The rows `J-A⟨item⟩.⟨n⟩` are the amendments-b pass's (items 8–31 of the second amendments file; 2026-09-26/27):
# NEW| ⟨item⟩ is the amendment ruled on, and the first digit of ⟨n⟩ names the part whose seat ruled — 0 the scope part (§0's
# NEW| landing table, §1, §13–§17 and the lists), 2 the model (§2), 3 the kernel (§3), 4 the pipeline (§4, §10, PART II and
# NEW| PART III), 5, 6 or 7 determinism (the section family that states the rule: §5, §6 or §7) and 8 rendering (§8, §9, §11
# NEW| and §12). Each has its Part A entry like every other row.
# (3) DOCUMENT CHECKS. Append the 32 reviewed rows below (each "# ALLOW " line, prefix stripped; fields TAB-separated) to
#     docs/validation/doc-checks-allow.tsv — e.g. grep '^# ALLOW ' <this file> | sed 's/^# ALLOW //' >> the TSV — then run
#     the check yourself (the corpus is still growing). Four rows are this repair's own section-pointer digits and one is
#     §1.1's rung names (C4); the other 27 sit in text these blocks carry verbatim — 23 unchanged since the
#     pre-amendments-b archive, 4 amendments-b text present at the base sha — 26 of them corpus-growth false positives
#     stitched from research/findings files, among them ones written on 2026-09-27 after the text, no file holding the run
#     whole; the 27th, '3 m from the road', is FTG's measured entrance distance, which code-ftg-client.md restates. Seven own phrases that had become hits were reworded instead.
#     With these rows, the sibling repair files' rows (kernel's and determinism's "# ALLOW" rows, the pipeline report's
#     §5) and the live TSV, doc_checks.py over this part's sections exits 0 on this file applied alone; on all six repair
#     files applied, 7 C3 runs stay unreviewed, all in repair-r1-model.md's J rows (J-A8.22, J-A28.28, J-A28.29,
#     J-A29.21, J-A29.24, J-A30.23 twice) — none from this file (see (4)).
# (4) CROSS-PART NOTES (other lanes' text; nothing here edits it).
#     * model §2.6 — its "**Bars:** §13.2's T28-13 – T28-17" should read "T28-13 – T28-18" (T28-18 is new here, VS-23);
#       its J rows above hold the 7 unreviewed C3 runs of (3), for the model lane's allow rows or rewording.
#     * rendering — §13.3 now keeps the placement goldens at the `public` tier with no places and one golden CITY at
#       `secret`, matching repair-r1-rendering.md's §9.2; T30-5 cites §11.2's knowledge rule and §9.5's legend; §14 and
#       §16 name `live.stale`, the `states` rows, the entrance-tick and arch-glyph rows and `report.changed` as §8.2,
#       §8.3 and §11.3 declare them; the Staged stage-3 row names §8.5's `storey` view key and change markers.
#     * determinism — T20-2 now cites §7.7's lapse rule (J-A20.74); the one-room `plan.roles` re-roll lives in §5.1 (6)'s
#       minimal-scope test, which §13.2 points to, so §13.2 needs no change for it.
#     * kernel — §13.1's fixtures follow J-A28.34: no attraction at a transient arena's construction, so the old
#       "`W_ATTRACTED` reported for a seed vertex 20 cm from another ring's edge" became an `E_DEGENERATE` (`seed`) refusal
#       beside the hot-pixel split (a consequence of VK-02 that VK-17 did not list).
#     * pipeline — §4.1's, §4.7 S10b's and §7.6's "the presets §13.6's side-by-sides run" now hold (§13.6 (3), J-A23.02).
# ALLOW C3	3 m from the road	a measured number: FTG's entrance rule as CONFIDENCE C9 records it (the entrance about 3 m from the road; 2.99 m measured, §13.5), in §1.4's buildings row unchanged since the pre-amendments-b archive and carried verbatim by this repair's block; code-ftg-client.md, written 2026-09-27 after the text, restates the same measurement (reviewed by repair-scope-r1)
# ALLOW C3	order 4 2 s3 4 4	corpus-growth false positive: text unchanged since the pre-amendments-b archive (docs/archive/ARCHITECTURE-pre-amendments-b-2026-09-26.md), carried verbatim by this repair's REPLACE block; its 3-grams are shared apart, among them with research/findings files written on 2026-09-27 after the text (code-impact.md, code-village.md), and no findings file holds the run whole — generic phrasing or our own numbers (reviewed by repair-scope-r1)
# ALLOW C3	sdf text the same glyph	corpus-growth false positive: text unchanged since the pre-amendments-b archive (docs/archive/ARCHITECTURE-pre-amendments-b-2026-09-26.md), carried verbatim by this repair's REPLACE block; its 3-grams are shared apart, among them with research/findings files written on 2026-09-27 after the text (code-ftg-client.md), and no findings file holds the run whole — generic phrasing or our own numbers (reviewed by repair-scope-r1)
# ALLOW C3	on the footprint s hole	corpus-growth false positive: text unchanged since the pre-amendments-b archive (docs/archive/ARCHITECTURE-pre-amendments-b-2026-09-26.md), carried verbatim by this repair's REPLACE block; its 3-grams are shared apart, among them with research/findings files written on 2026-09-27 after the text (code-impact.md), and no findings file holds the run whole — generic phrasing or our own numbers (reviewed by repair-scope-r1)
# ALLOW C3	starting at the main entrance	corpus-growth false positive: amendments-b text present at base sha 87d89692… (assemble-r0's checks exited 0 on it at 03:11), carried verbatim by this repair's REPLACE block; its 3-grams are shared apart, among them with research/findings files written on 2026-09-27 after the text (code-dwellings.md), and no findings file holds the run whole — generic phrasing (reviewed by repair-scope-r1)
# ALLOW C3	and a stair or trapdoor	corpus-growth false positive: amendments-b text present at base sha 87d89692… (assemble-r0's checks exited 0 on it at 03:11), carried verbatim by this repair's REPLACE block; its 3-grams are shared apart, among them with research/findings files written on 2026-09-27 after the text (code-dwellings.md), and no findings file holds the run whole — generic phrasing (reviewed by repair-scope-r1)
# ALLOW C3	direction and the output version the	corpus-growth false positive: text unchanged since the pre-amendments-b archive (docs/archive/ARCHITECTURE-pre-amendments-b-2026-09-26.md), carried verbatim by this repair's REPLACE block; its 3-grams are shared apart, among them with research/findings files written on 2026-09-27 after the text (code-manor.md), and no findings file holds the run whole — generic phrasing or our own numbers (reviewed by repair-scope-r1)
# ALLOW C3	squares in the captured city	corpus-growth false positive: amendments-b text present at base sha 87d89692… (assemble-r0's checks exited 0 on it at 03:11), carried verbatim by this repair's REPLACE block; its 3-grams are shared apart, among them with research/findings files written on 2026-09-27 after the text (code-manor.md), and no findings file holds the run whole — generic phrasing (reviewed by repair-scope-r1)
# ALLOW C3	holds in the capture readme	corpus-growth false positive: text unchanged since the pre-amendments-b archive (docs/archive/ARCHITECTURE-pre-amendments-b-2026-09-26.md), carried verbatim by this repair's REPLACE block; its 3-grams are shared apart, among them with research/findings files written on 2026-09-27 after the text (code-manor.md), and no findings file holds the run whole — generic phrasing or our own numbers (reviewed by repair-scope-r1)
# ALLOW C3	capture file and the seed	corpus-growth false positive: text unchanged since the pre-amendments-b archive (docs/archive/ARCHITECTURE-pre-amendments-b-2026-09-26.md), carried verbatim by this repair's REPLACE block; its 3-grams are shared apart, among them with research/findings files written on 2026-09-27 after the text (code-impact.md), and no findings file holds the run whole — generic phrasing or our own numbers (reviewed by repair-scope-r1)
# ALLOW C3	is in one of two	corpus-growth false positive: text unchanged since the pre-amendments-b archive (docs/archive/ARCHITECTURE-pre-amendments-b-2026-09-26.md), carried verbatim by this repair's REPLACE block; its 3-grams are shared apart, among them with research/findings files written on 2026-09-27 after the text (code-dwellings.md), and no findings file holds the run whole — generic phrasing or our own numbers (reviewed by repair-scope-r1)
# ALLOW C3	written in the owner s	corpus-growth false positive: text unchanged since the pre-amendments-b archive (docs/archive/ARCHITECTURE-pre-amendments-b-2026-09-26.md), carried verbatim by this repair's REPLACE block; its 3-grams are shared apart, among them with research/findings files written on 2026-09-27 after the text (_critic-code.md, code-ftg-client.md), and no findings file holds the run whole — generic phrasing or our own numbers (reviewed by repair-scope-r1)
# ALLOW C3	editor and the style dialog	corpus-growth false positive: text unchanged since the pre-amendments-b archive (docs/archive/ARCHITECTURE-pre-amendments-b-2026-09-26.md), carried verbatim by this repair's REPLACE block; its 3-grams are shared apart, among them with research/findings files written on 2026-09-27 after the text (code-ftg-client.md, code-neighbourhood.md), and no findings file holds the run whole — generic phrasing or our own numbers (reviewed by repair-scope-r1)
# ALLOW C3	4 2 s3 4 4 4 8 4	corpus-growth false positive: text unchanged since the pre-amendments-b archive (docs/archive/ARCHITECTURE-pre-amendments-b-2026-09-26.md), carried verbatim by this repair's REPLACE block; its 3-grams are shared apart, among them with research/findings files written on 2026-09-27 after the text (code-dwellings.md, code-impact.md, code-manor.md, code-mfcg.md, code-neighbourhood.md, code-village.md), and no findings file holds the run whole — generic phrasing or our own numbers (reviewed by repair-scope-r1)
# ALLOW C3	2 5 7 6 5	corpus-growth false positive: text unchanged since the pre-amendments-b archive (docs/archive/ARCHITECTURE-pre-amendments-b-2026-09-26.md), carried verbatim by this repair's REPLACE block; its 3-grams are shared apart, among them with research/findings files written on 2026-09-27 after the text (code-ftg-client.md, code-manor.md), and no findings file holds the run whole — generic phrasing or our own numbers (reviewed by repair-scope-r1)
# ALLOW C3	and the roof colour law	corpus-growth false positive: text unchanged since the pre-amendments-b archive (docs/archive/ARCHITECTURE-pre-amendments-b-2026-09-26.md), carried verbatim by this repair's REPLACE block; its 3-grams are shared apart, among them with research/findings files written on 2026-09-27 after the text (code-dwellings.md, code-impact.md, code-mfcg.md, code-neighbourhood.md), and no findings file holds the run whole — generic phrasing or our own numbers (reviewed by repair-scope-r1)
# ALLOW C3	0 5 s for a	corpus-growth false positive: text unchanged since the pre-amendments-b archive (docs/archive/ARCHITECTURE-pre-amendments-b-2026-09-26.md), carried verbatim by this repair's REPLACE block; its 3-grams are shared apart, among them with research/findings files written on 2026-09-27 after the text (code-manor.md), and no findings file holds the run whole — generic phrasing or our own numbers (reviewed by repair-scope-r1)
# ALLOW C3	row and the export s	corpus-growth false positive: text unchanged since the pre-amendments-b archive (docs/archive/ARCHITECTURE-pre-amendments-b-2026-09-26.md), carried verbatim by this repair's REPLACE block; its 3-grams are shared apart, among them with research/findings files written on 2026-09-27 after the text (code-dwellings.md), and no findings file holds the run whole — generic phrasing or our own numbers (reviewed by repair-scope-r1)
# ALLOW C3	4 6 8 2 8 3	section-pointer digits of this repair's own text (§16 M2b content, "(§4.6, §8.2, §8.3)"); the digit 3-grams occur apart in research/findings files (code-impact.md, code-mfcg.md, code-village.md among them) and no file holds the run whole; the pointers are the design's own (reviewed by repair-scope-r1)
# ALLOW C3	2 9 6 4 the	corpus-growth false positive: text unchanged since the pre-amendments-b archive (docs/archive/ARCHITECTURE-pre-amendments-b-2026-09-26.md), carried verbatim by this repair's REPLACE block; its 3-grams are shared apart, among them with research/findings files written on 2026-09-27 after the text (code-manor.md, code-neighbourhood.md), and no findings file holds the run whole — generic phrasing or our own numbers (reviewed by repair-scope-r1)
# ALLOW C3	a passage and the terrain	corpus-growth false positive: amendments-b text present at base sha 87d89692… (assemble-r0's checks exited 0 on it at 03:11), carried verbatim by this repair's REPLACE block; its 3-grams are shared apart, among them with research/findings files written on 2026-09-27 after the text (code-dwellings.md), and no findings file holds the run whole — generic phrasing (reviewed by repair-scope-r1)
# ALLOW C3	9 2 11 1 11	section-pointer digits of this repair's own text (§16 M3a content, "(§9.2, §11.1–§11.3)"); the digit 3-grams occur apart in research/findings files (code-mfcg.md, code-neighbourhood.md, code-village.md among them) and no file holds the run whole; the pointers are the design's own (reviewed by repair-scope-r1)
# ALLOW C3	hit is a run of	corpus-growth false positive: text unchanged since the pre-amendments-b archive (docs/archive/ARCHITECTURE-pre-amendments-b-2026-09-26.md), carried verbatim by this repair's REPLACE block; its 3-grams are shared apart, among them with research/findings files written on 2026-09-27 after the text (_critic-code.md), and no findings file holds the run whole — generic phrasing or our own numbers (reviewed by repair-scope-r1)
# ALLOW C3	hit is a line of the	corpus-growth false positive: text unchanged since the pre-amendments-b archive (docs/archive/ARCHITECTURE-pre-amendments-b-2026-09-26.md), carried verbatim by this repair's REPLACE block; its 3-grams are shared apart, among them with research/findings files written on 2026-09-27 after the text (_critic-code.md), and no findings file holds the run whole — generic phrasing or our own numbers (reviewed by repair-scope-r1)
# ALLOW C3	3 1 4 2 9 3	corpus-growth false positive: text unchanged since the pre-amendments-b archive (docs/archive/ARCHITECTURE-pre-amendments-b-2026-09-26.md), carried verbatim by this repair's REPLACE block; its 3-grams are shared apart, among them with research/findings files written on 2026-09-27 after the text (_critic-code.md, code-dwellings.md, code-impact.md, code-manor.md, code-mfcg.md), and no findings file holds the run whole — generic phrasing or our own numbers (reviewed by repair-scope-r1)
# ALLOW C3	and the cost of reversing	corpus-growth false positive: text unchanged since the pre-amendments-b archive (docs/archive/ARCHITECTURE-pre-amendments-b-2026-09-26.md), carried verbatim by this repair's REPLACE block; its 3-grams are shared apart, among them with research/findings files written on 2026-09-27 after the text (code-impact.md), and no findings file holds the run whole — generic phrasing or our own numbers (reviewed by repair-scope-r1)
# ALLOW C3	4 2 s3 4 4 4 8	corpus-growth false positive: text unchanged since the pre-amendments-b archive (docs/archive/ARCHITECTURE-pre-amendments-b-2026-09-26.md), carried verbatim by this repair's REPLACE block; its 3-grams are shared apart, among them with research/findings files written on 2026-09-27 after the text (code-dwellings.md, code-impact.md, code-manor.md, code-mfcg.md, code-village.md), and no findings file holds the run whole — generic phrasing or our own numbers (reviewed by repair-scope-r1)
# ALLOW C3	4 5 the gate law	corpus-growth false positive: text unchanged since the pre-amendments-b archive (docs/archive/ARCHITECTURE-pre-amendments-b-2026-09-26.md), carried verbatim by this repair's REPLACE block; its 3-grams are shared apart, among them with research/findings files written on 2026-09-27 after the text (code-impact.md), and no findings file holds the run whole — generic phrasing or our own numbers (reviewed by repair-scope-r1)
# ALLOW C3	7 6 1 4 13 2	section-pointer digits of this repair's own text (the restated J-A23.01 index row's pointers ('§7.6 | §1.4, §13.2')); the digit 3-grams occur apart in research/findings files (several among them) and no file holds the run whole; the pointers are the design's own (reviewed by repair-scope-r1)
# ALLOW C3	3 3 3 4 3 7 3 8 and	section-pointer digits of this repair's own text (the Staged stage-3 row, "§3.3, §3.4, §3.7, §3.8 and §3.10"); the digit 3-grams occur apart in research/findings files (code-ftg-client.md, code-manor.md among them) and no file holds the run whole; the pointers are the design's own (reviewed by repair-scope-r1)
# ALLOW C3	md and docs confidence md	corpus-growth false positive: text unchanged since the pre-amendments-b archive (docs/archive/ARCHITECTURE-pre-amendments-b-2026-09-26.md), carried verbatim by this repair's REPLACE block; its 3-grams are shared apart, among them with research/findings files written on 2026-09-27 after the text (_critic-code.md, code-dwellings.md, code-impact.md), and no findings file holds the run whole — generic phrasing or our own numbers (reviewed by repair-scope-r1)
# ALLOW C4	city hamlet metropolis town village	the rung names of the owner's two size ladders (amendment 4: TOWN → CITY → METROPOLIS and THORP → HAMLET → VILLAGE; §1.1, PART III (5)) in §1.1's RungProfile.rung type and its comment — the design's own ladder vocabulary, not a copied list (reviewed by repair-scope-r1)
# RECEIPTS: see docs/validation/amendments-b/repair-scope-r1-report.md §4.
=== REPLACE ## The whole design in one page (plain words) ===
## The whole design in one page (plain words)

We are building one program that draws believable medieval towns and cities at three sizes — town, city and
metropolis — with the size inside each set by the requested population (§1.1). It works the way watabou's Medieval
Fantasy City Generator (MFCG) and Thomas Allerton's Fantasy Town Generator (FTG) do, takes the better idea from each
at every step and adds our own measured improvements (§1.4). After the base, the same program opens any district as a
detailed neighbourhood close-up (stage 2, PART II). Manor-style buildings, a separate village generator (thorp →
hamlet → village), sewers and floating islands, the town's evolution over decades, calibration against historical maps
and SettlementForge inputs follow by the owner's roadmap; the base carries their hooks now, and nothing else is
postponed (*Staged by the owner's roadmap*).

**How a town is made** (§4). *Ground:* a real heightfield in metres with water that flows downhill, so rivers always
reach the sea and coasts agree with the contours. *Demand:* from the population, our own tables decide the houses,
workshops, inns, churches and institutions the town needs, and the land they take, before any street is drawn.
*Big decisions:* the markets, the castle and the large precincts are reserved; the main roads to the gates are
solved first; the first wall follows the town's edge measured along them, with a gate wherever a main road crosses it;
each later wall ring is traced before the streets it encloses grow; rivers, moats and canals are bridged where roads
cross them; a strip along every wall stays free of houses and lanes. *Streets:* main roads run between real
destinations over the terrain; inside the walls the lanes are cut by the "bent cut" that gives watabou's maps their
charm (one bend, arriving square), measured from Neighbourhood's recordings; outside the walls side streets grow along
the main roads as FTG's do. *Districts:* groups of blocks named for their market, gate, harbour or castle and merged
into named quarters at city zoom, shaped by a prosperity field — a smooth gradient, not a switch — that rises near the
centre, the markets and high dry ground and falls near tanneries, walls and damp low ground. *Plots:* every block is
divided from its street frontage into parcels; rich quarters join plots into fewer, larger ones with courts and
gardens, poor quarters split them and get alleys. *Buildings:* each plot gets a site plan — a row house with party
walls, a manor behind its yard with outbuildings, a detached house, a hovel — and every building stores its heights,
so the optional shadows and the 3-D export read real heights. *Finishing:* towers, bridges, the harbour, fields and
woods sized to the population, greenery placed by rules that read prosperity, and names and curved labels that never
cover a gate or a keep. The rules themselves are data tables that can be read, edited and later calibrated.

**What you see** (§8, §11, §12). One display list draws the town as a clean ink map (the default, in MFCG's family),
as a textured lit map like FTG's, or as a hatched close-up like Neighbourhood's — all on one drawing path — and exports
it to SVG, PNG, GeoJSON, virtual-tabletop scenes and 3-D; a large print is made in the background without holding up
the map. The first picture is always the finished map, never a rough preview: under a second for every town and city
and for a metropolis of up to about 48 000 people, about 2.3 seconds at the 120 000 cap (§12.5). Building the model
meets the improvement plan's speed bars (100 ms, 300 ms, 1 s) in 19 runs of 20 up to about 4 500, 17 700 and 58 800
people (§12.3); larger towns take longer, and both misses are declared for the owner's veto (D-18).

**Editing** (§7). Every element and every rule table can be changed, and names, functions or shapes can be assigned to
buildings and quarters. Edits are events on permanent addresses: they survive regeneration and version upgrades, undo
works for several people sharing a town and after the file is reopened, and the generator repairs around an edit
locally instead of re-rolling the town — moving a river or dragging the ground changes nothing outside the blocks the
edit names beforehand, and names follow the things they name and change only after you confirm. A saved town is
editable as soon as a quick fingerprint check passes, while a full check from its recipe runs in the background
(§2.9).

**Guarantees** (§5, §6). The same seed gives the same town on every machine; adding a new kind of decoration,
re-rolling one block or growing the town never reshuffles what already exists; a release that changes how a step works
declares the change, stage by stage. There is no whole-map retry: every step that can fail has a short, bounded
fallback ladder, and the report says for every requested feature whether it was delivered in full, simplified or left
out.

**How we know it works** (§13, §16). The riskiest part — whether grown streets and bent-cut lanes fit together within
the speed budget — is measured first, in a spike, and again on real terrain and water at the first milestone. Every
acceptance number says whether it checks that a rule was followed, compares us with a measured MFCG or FTG number, or
shows that the town is better. The owner judges side-by-sides through a written, blind protocol at matched sizes; a
milestone the owner has not rated keeps building but never claims "at parity" or "mastered". The first product
milestone is a viewable town; editing comes directly after it, because the owner ranks editability first. The effort
is about 166–220 expert person-weeks (§16).

**Clean room** (§17). The programmers work from this document and a cleaned digest of the research — never from the
references' code, word lists or palettes — and every library is permissively licensed, so the owner keeps every
licensing choice.

**The owner's later rules (amendments b, 2026-09-25 to 27), in one paragraph.** Items 8–31 of the second amendments file
refine the picture above without changing its bones; their landing rows, with the file's name, are §0.2. A town has several markets — one
principal market sited where trade meets, usually the plaza, and secondary markets and churches by size, as MFCG and FTG
have them (§4.2). Every rule's default reproduces what MFCG or
FTG does where they have the behaviour, and our extensions ride on top as table values with a weight, a chance or an
option (§7.6). A building gets several doors when its plot gives it a lane or a yard, and a cellar where its class, its
ground and its wealth say (§2.6). Some plots hide behind passages and courts — reachable yet unseen from any street — and
a place's name can be known only locally or secretly while the place itself is always drawn (§4.6, §9.2).
Assignments obey relation and supply-chain rules through one placement solver, and a building whose designation changes
mutates instead of re-rolling (§4.7). When a quarter grows rich or poor its stock persists — use and occupancy change
first, tenure and yards later, geometry only on vacancy, ruin or redevelopment — and a plot's geometry never reads
poorer than the middle band once it was built to that band or above (§4.11); its interior has no such floor: the same
shells are re-cut inside for the households that live there, from one family with small staff rooms down to single rooms
off a corridor (§2.6), which is where the poor live when every quarter is developed. Decline and regrowth, floating
islands, the sewers with their underground neighbourhoods and slow terrain change are hooks the base carries for the
staged engines (§4.11, II.6, II.7). SettlementForge's dossier is the authority: the map never edits it, a map delete of
a dossier element is a placement rejection the solver re-places, and a dossier change mutates the existing map (§7.7).
The module stays private for now, a separate program talking to its host through data alone (§11.3, §17.3, D-22).
=== REPLACE ### 0.2 Where the owner's late rules land — items 1–7 (`docs/AMENDMENTS-2026-09-25.md`) and items 8–31 (its sibling `AMENDMENTS-2026-09-25b`) ===
### 0.2 Where the owner's late rules land — items 1–7 (`docs/AMENDMENTS-2026-09-25.md`) and items 8–31 (its sibling `AMENDMENTS-2026-09-25b`)

**Items 1–7.** Every clause of every rule is checked at its landing; where a rule has several clauses its landing carries
a clause map.

| rule | landing (the mechanism) | clause map |
|---|---|---|
| 1 greenery by prosperity | §4.9 S12b rule table (reads the prosperity field and the district kind; yard planting by plot class); §15.2 O19 | §4.9 |
| 2 floating islands (a toggle, staged by the owner) | §2.7 `SkyIsland` with its own terrain and a `reason` (prosperous quarter or unique institution); II.1 rule 5 (the sky call) and II.6 (the staged layers' hooks); §4.2 (island outline); §11 (per-layer export) | II.6 |
| 3 heights for shadows | §2.6 heights and the ground datum on every building, wing, tower and roof; §8.4 the shadow pass and the display list's shadow hook | §2.6 |
| 4 size ladders | §1.1 (both ladders; the `RungProfile` table; size within a rung follows population); §12.2 (matched reference sizes and the band ends in buildings); PART III (the village ladder THORP → HAMLET → VILLAGE and its ceiling) | §1.1 |
| 5 everything editable | §7.1 (the edit targets, clause by clause, and the edit-target table), §7.2–§7.6, §2.8 (edit paths in the entity registry, whose completeness test is §13.2's) | §7.1 |
| 6 prosperity a gradient and a band | §4.5 (the field, its drivers, bands only where a table needs one, continuous interpolation, evolution moves the field), §4.7 (interpolating rules), §7.2 (brush edits) | §4.5 |
| 7 adopted defaults | D-1–D-7, each FINAL and tied to its mechanism: the ink default and `lit` on Canvas2D; era rows refined by §13.9; the named fantasy toggles; the browser-first library under §17's checker; "mastered" through §13.6's protocol plus the parity numbers; naming through §10.4's packs; the weighting ordering the build (§16) | D-1–D-7 |

**Where items 8–31 — the owner's later rules, in the second file the heading names — land.** The same discipline: every
clause is checked at its landing. Each row names the home that states the mechanism first, then the sections that
carry a pointer, a hook field or one line of rule, then the tests (§13.2's `T⟨item⟩-⟨n⟩` fixtures), the decisions and
the lists. An item whose engine the owner's roadmap stages later lands as the base's hooks (*Staged by the owner's
roadmap*). Item 32 of the same file, received after this pass's routing had closed, is the next pass's.

| rule | landing (the mechanism) | clause map |
|---|---|---|
| 8 decline and regrowth are part of evolution (hooks now) | home §4.11 — the decline table's exposure lottery over weighted drivers, the persistence order, the salvage ledger, the dwell lag, the regrowth-first siting that binds the built grow path today, and `DeclineOp`; the states and records in §2.6 to §2.8 (`Existence` gains `cleared` and `reused`; `Building.predecessor`; `Enceinte.supersededBy`; `MaterialLedger`); identity kept through decline in §6.3; every kind applied by hand and undone in §7.1 and §7.4; the state classes in §8.2; tests T8-1 to T8-7; hooks row 2 of §15.2; priced at M4 in §16; D-25; the staged evolution row | §4.11 |
| 9 size is set by population, even within each tier | SATISFIED — size within a rung follows population and every budget is a law of the building count (§1.1); parity pairs are matched by building count (§13.6 (3)); no change (J-A9.01) | §1.1 |
| 10 floating islands are a product of prosperity | home II.6 — the island rule: two supply values (the town's and the carried districts'), the supported area and altitude, the supply re-read at each epoch; the sky allocation in §4.5 S7b (5); a row of §4.9's band-row family; the island decline kinds in §4.11; the record fields `supply`, `areaHa` and `state` on `SkyIsland` (§2.7); hand edits in §7.1 and §7.4; test T10-1; D-3; the staged sewers-and-islands row | II.6 |
| 11 the underground fades like the walls | home II.6 — the tunnel ladder (in use, silted, caved in, collapsed or sealed), never demolished by the engine, reopened by growth; the `underground` persistence row and the tunnel kinds in §4.11; a tunnel's condition, read from `existence` and `Tunnel.closure` (§2.7, §2.8; J-A11.21); hand edits in §7.1 and §7.4; the styles in §8.2 and the layer in §8.4; test T11-1; D-25; the staged rows | II.6 |
| 12 underground neighbourhoods along the sewers | home II.7.3 — the owner's three rules as the invariants U1 to U3; the occupants, the cut on the underground arena, the surface constraint, access points, depth, lifecycle and order; the interfaces `UndergroundStrategy`, `AccessPoint` and `UndergroundRule` in II.7.4; the arena's levels (§2.1, then §2.2); `ContextVector.arena`, `Tunnel.navigable` and `headroomCm` in §2.5 to §2.7; `corridorUnion` over `tunnel` chains in §3.7 and the arenas' isolation in §3.4 and §3.10 (J-A12.31, J-A12.32); F-UNDER in §5.2 and the U rows in §5.3; a concern in §6.1; the layer in §8.4 and the exports in §11.1; fixtures in §13.1 and test T12-1; the registry map in §14; the staged row | II.7.3 |
| 13 floating islands only in cities and metropolises | home II.6 (2) — the rung gate, read at generation and at every epoch; the `layers.islands` column of `RungProfile` (§1.1); the village rows `none` (PART III); the sky allocation of §4.5 S7b (5); a band crossing runs the ladder (§4.11); the control disabled below CITY (§7.8); test T13-1; D-3 and D-33 | II.6 (2) |
| 14 sewers by tier | home II.7.1 — existence by tier: a TOWN law of population and wealth, always at CITY and METROPOLIS, never below TOWN; the toggle is visibility; the `drain` rule; the `layers.sewers` column of `RungProfile` (§1.1); the one-click default (§1.2); the S0 draw and `Features.sewers` (§4.2); PART III; a concern in §6.1; the control in §7.8; the layer in §8.4; test T14-1; D-3 | II.7.1 |
| 15 not every city has islands | home II.6 (1) and (4) — a model setting off by default; the count 0 to 3 drawn on `island.place` through ordered slots weighted by supply; the view toggle shows islands and never creates them; the sky allocation of §4.5 S7b (5); the draw in §6.1; the control in §7.8; the layer in §8.4; test T15-1; D-3 | II.6 |
| 16 assignments obey spatial and supply-chain rules | home §4.7 S10b — the one placement solver: HARD and SOFT relation rules, supply edges with distance and mode, joins where the use needs land, relocation of the displaced as a local recorded repair, infeasibility reported with the closest options; the relation templates and supply edges as class and roster data (§10.2) and S2's need propagation (§4.2); `PlacementCriteria` as per-assignment overrides in §7.7, with §7.3 and F-SITING in §5.2; the context vector of §2.5; the budget row of §12.4; tests T16-1 to T16-4; the corpus re-signing of §13.9 (5); the solver's package in §14; O7 (b), O10 (e) and hooks row 3 of §15.2; priced in §16; D-32 (J-A16.44) | §4.7 S10b |
| 17 uses move as the city grows and declines | home §4.11 — the epoch's use step: re-scoring against item 16's rules and the current distribution, inertia, traces of former uses, pinned assignments that stay, and `UseConversionOp`; the `Use` record with `Building.use` and `formerUses` and the use lifecycle in §2.6 to §2.8; a use's address in §6.3; `openUse`, `closeUse` and `relocateUse` by hand in §7.1 and §7.4; members move with their use unless pinned (§7.7); households follow in §10.3; the report to the host in §11.3; tests T17-1 to T17-3; D-25; the staged evolution row | §4.11 |
| 18 a plot's buildings mutate to match a new designation | home §4.7 S11 — the designation mutator: match, order and draws, land, protection, record and reversal, timing, one path; addressable parts (§2.5) and `MutationRecord` (§2.6); the epoch-spread form in §4.11; the concern `siteplan.mutate` in §6.1 and the minted parts in §6.3; every `assign` runs the solver and the mutator, undo being the inverse mutation (§7.3, §7.4 and §7.7); tests T18-1 to T18-4; the mutator's package in §14; priced in §16 | §4.7 S11 |
| 19 every designation scales with prosperity | home §4.7 S11 — the designation-template table by class and band, interpolated along the field, its shape columns reading the manifested band and its use and condition columns the field band; `ClassRules.pick` reads it and the Materials paragraph holds the material rule (FTG's default model, the optional regional shift, texture and colour only, never shape) in §2.6; the specialisation rows in §10.2; the colour roles in §8.2; the drift bounds in §7.7; the buildings row of §1.4; tests T19-1 to T19-4; priced in §16; D-2 | §4.7 S11 |
| 20 one-way data flow; the dossier is the authority | home §7.7 — dossier-backed existence, the rejection record and its lapse, positive placement, re-application, the precedence line; `rejectSite` and `placeAt` in §7.1 (a `delete` of dossier content is a rejection), with §7.2 and §7.4, the ladders of §5.2, the invariant of §5.3 and the report of §5.4; `Rejection` in the registry and `DossierRef` (§2.8), dossier events in the log (§2.9); the `dossier` and `positive` requests and the least-disruption order in §4.7 S10b, the lapse at an epoch in §4.11; the one-way door, with no message that writes the dossier, in §11.3 and §11.4; the summary; tests T20-1 to T20-5; the engine in §14; O10 (i) of §15.2; priced in §16; the staged SettlementForge row | §7.7 |
| 21 licence | SATISFIED by the owner's ruling of 2026-09-27 (private for now; J-A21.01): §17.3 and D-22 unchanged; §17.1 (1) unchanged — it already admits no TownGeneratorOS code; permissive-only dependencies (§17.4) unchanged; the separate program with its data-only bridge (§11.3) retained by choice, not by licence; §3.1's skeleton row keeps CGAL's licence ground (J-A21.31) | §17.3 |
| 22 dossier changes mutate the existing map, never re-roll it | home §7.7 — dossier events as mutations with least disruption, `DisruptionBudgetRow`, the report, vacancy on removal, continuity over path-independence; two histories may give two valid maps (§6.2); the budget's scope in §7.3 and the report in §5.4; the log in §2.9; each dossier element present from a new map's first generation (§4.2 S2), the search order in §4.7 S10b, a mid-history dossier event folded at its epoch (§4.11); the host door in §11.3 and §11.4; tests T22-1 to T22-4; the staged rows | §7.7 |
| 23 emulation-first defaults; no hard-coded universals | home §7.6 — the defaults layer is the emulation baseline: a default cell's `provenance.source` names the reference behaviour, an extension carries the `extension` marker with its chance, weight or option, an absolute reads as a default table value, and the parity presets `MFCG` and `FTG` switch every extension off; a pointer from §1.4; the provenance values of §17.1 (6); `RelationRule.extension` in §4.1 and §4.7 S10b; test T23-1; the parity presets inside §13.5's bands and on the D-5 panel's MFCG and FTG pairs (§13.6 (3), J-A23.02); priced at M1 in §16 | §7.6 |
| 24 several markets, as MFCG and FTG already do | home §4.2 — S2's market demand (N markets by size) and S3 (12)'s principal-market score by trade convergence, secondary markets never touching another and on small patches; the destinations, seeds and stalls of §4.3 to §4.5, §4.7 and §10.2; `Reservation.rank` and the nearest-market distance in §2.5; the summary; the centre row of §1.4; tests T24-1 to T24-3; the parity rows of §13.5 and the threshold of §13.7; D-16 and D-17 | §4.2 |
| 25 terrain and water can change, slowly | home §4.11 — `reclaim`, `siltReach`, `shiftCourse` and `digCanal` as the slowest layer's rows of the decline table, repaired by S1's terrain or water operator or the carve (§7.3 (a), (b); §4.11); what each changes in §2.3 and `LandUse.reclaimed` in §2.7; by hand and undoable in §7.1 and §7.4, through §7.3 (a) and (b); a concern in §6.1; test T25-1; D-25; the staged evolution row | §4.11 |
| 26 the hinterland is decided with the town, drawn after it | home §4.9 — FTG's order and its farmland modes chosen by size and landscape (`FarmModeRow`), the fuel and timber rows beside the farm table, the extent following demand, the arable reserve off by default; the demand rows (§4.2 S2, §10.2); the execution order (§4.1 and §4.4); the hinterland row of §1.4; tests T26-1 to T26-3; O14 (h) of §15.2; priced in §16 | §4.9 |
| 27 prosperity maps onto the references' wealth models | home §4.5 — the default band set: FTG's six lifestyle tiers with their shares, MFCG's ward-class shares as band targets, the shanty trigger, and `FieldBands.middle` as the band of the median household, the continuous gradient being our extension; the band-keyed rows of §10.2, §4.7 and §4.9; `FieldBands.bands` and `middle` in §2.5; the districts row of §1.4; tests T27-1 and T27-2; the descriptive rows of §13.5 | §4.5 |
| 28 floor plans and elaboration by click; (f) the interior has no floor | home §2.6 — the fourth rung, `plan`: the room programme first (from the designation, the occupants' band and the household count, never the geometry floor), the partition fitted to it one wing at a time around a stair core placed ahead of any cut, coherence with the exterior, the entrance set and basement consumed; the interior ladder's rule table by band, the dwelling unit with its own door, the re-cut as item 18's mutation within unchanged wing rings, and the shell's household capacity; `ElaborationRecord` per rung (absent, current, stale, edited) with `Document.elaborations` outside both digests and the `elaborate` view key (§2.8, §2.9); click → rung and the pre-assignment in §4.1; `RoomProgramRow`, `RoomRuleRow.scope` and the template's `households` in §4.7 S11 and §10.2, `relet` in §4.11 rung 1; the close-ups of II.4 and II.5; the transient arena and the re-cut (§3.4, with `ArenaKey` in §3.3); the `spine` reader (§3.8); the seed-tiling row (§3.10); F-PLAN (§5.2); the invariants (§5.3); the `plan.*` concerns keyed by the rung's reroll in §6.1, the pure-function rule of §6.2, the click-order identity of §6.5 (9); the seven plan events, `setRoomUnit` and the rung re-roll of `regenerate` in §7.1, with §7.3 and §7.4; the draw and the change marker (§8.2, §8.5), the cache (§8.6), the export (§11.1), the budgets (§12.7, §12.8); the summary; the stage table (§1.1); the one-click default (§1.2); fixtures in §13.1 and tests T28-1 to T28-19; the soft bands of §13.7; the plan step's package in §14; priced in §16; the staged stage-3 row | §2.6 |
| 29 entrances and basements | home §2.6 — `entrances: Entrance[]` with roles and faces under the five rules; `Basement` derived from the class rows, the terrain gate of §2.3, prosperity and size, inside and smaller than the storey above it, its storey in `Heights`; a cellar never joins a sewer as a room, a cellar stair to a tunnel being an `AccessPoint` (II.7.3); the indexed vertex role of §2.2 rule 7 and the slot of §2.5; the placement in §4.7 S11 with the entrance and cellar columns of §10.2, and when an alley presents itself in §4.6; the invariants of §5.3, the concern `siteplan.entrance` in §6.1, `setEntrance` in §7.1, with §7.3 and §7.4; the glyphs and exports in §8.2, §8.5 and §11.1; the buildings row of §1.4; tests T29-1 to T29-5; the note in §13.5; O5 (f) and O17 (j) of §15.2; priced in §16 | §2.6 |
| 30 hidden plots and clandestine places | home §4.6 — S8's hidden-share and reach rows by band and density, `exposure` derived by adjacency to a public way, the passage choice — the cut making the `passage` L3 face in §4.7 S10; a second home in §9.2 for the knowledge label policy; `Plot.exposure`, `Block.reach`, `knownTo` on plot, building and institution and `Wing.spans` in §2.4 to §2.6, `sealed` in §2.8, the viewer's knowledge key in §2.9; the nesting paragraph of §3.10 (J-A30.31) and the passage room as a fixed ring in §3.4; a secret institution's preference in §4.7 S10b, densification, clearance, `sealPassage` and `openPassage` in §4.11, none by default in PART III; F-PLOT in §5.2 and chain reachability in §5.3; the concern `cut.interior` in §6.1; the edits in §7.1 and §7.4 and the dossier fact in §7.7; the glyph, the court tone and the exports in §8.3, §8.5 and §11.1 to §11.4; the summary; tests T30-1 to T30-5; the parity row of §13.5 and the threshold of §13.7; the gazetteer in §14; O5 (a) and O18 of §15.2; priced in §16; the staged evolution row | §4.6; §9.2 |
| 31 prosperity change drives fusion and splitting — a slow, asymmetric ladder with a geometry floor | home §4.11 — Survivors: the DUE trigger with hysteresis; the three rungs (use and occupancy, tenure and yards, geometry only on vacancy, ruin or redevelopment); no occupied building removed by a band change; durations by direction and by the stock's replaceability; churn caps; `LadderOp`; and the geometry floor — `geometryFloor = min(builtBand, the settlement's middle band)`, the manifested band and value; the fusion and splitting orderings in §4.7 S10 (7) and the mutator in S11; `FieldBands.middle` and the DUE trigger in §4.5, the back courts of §4.6, the yards of §4.9, `replaceability` and `households` in §10.2, households in §10.3; the close-ups of II.1 and II.3; `Block.due`, `Plot.builtBand` and `builtProsperity` in §2.5, `households` and `condition` in §2.6, the memories told apart in §2.8; lineage through fusion and splitting in §6.1 and §6.3; `relet`, `densify`, `thin`, split and join as re-cuts and `builtBand`'s lifecycle (§7.1, §7.2, §7.4), with §7.3, §7.5 and `WealthLadderTable` in §7.6; the ladders and invariants of §5.2 and §5.3; the condition classes of §8.2; the summary; tests T31-1 to T31-12; `wealthLadder.json` in §14; O18 (g) of §15.2; priced in §16; D-25; the staged evolution row | §4.11 |
=== REPLACE ### 1.1 What is built, in what order; the two size ladders ===
### 1.1 What is built, in what order; the two size ladders

| stage | what | depth in this document |
|---|---|---|
| **STAGE 1 — the BASE** (built first) | one general town/city generator on the ladder **TOWN → CITY → METROPOLIS**, fusing MFCG-class and FTG-class generation plus O1–O19 (§15.2): the plot model, plot granularity, the prosperity field, greenery, heights, editability, permanent addresses, layers, drainage, every owner hook, and the optional content module `@plat/sim` (its own milestone, M4b) | build-ready: §2–§14, §16 |
| **STAGE 2** (built in this program at M5, after the base) | the same town composed of NG-class neighbourhood close-ups with consistent seams, shared seeds and one style system | interface depth: PART II; what the base must already carry is a base requirement (§2.5, §4.12) |
| the later stages of the owner's roadmap | stage-3 building compositions with their floor plans elaborated by click (the plan rung, §2.6), the village product, sewers with their underground neighbourhoods and floating islands (II.6, II.7), the evolution engine — decline and regrowth, use relocation, the wealth ladder, slow terrain change (§4.11) — corpus calibration, SettlementForge inputs (the mapping of its data onto the dossier contract, which the base builds, §7.7, §11.4) | hooks only — the one list is *Staged by the owner's roadmap* |

**The two ladders.** The town/city generator scales **TOWN → CITY → METROPOLIS**; the village product scales
**THORP → HAMLET → VILLAGE** (PART III). The ladders meet without a gap or an overlap: the village ceiling and the base
floor are both **1 500 inhabitants** (D-33). **Size within a rung follows population:** the request's population
chooses the rung whose band contains it — bands include their lower bound and exclude their upper one: TOWN [1 500,
10 000), CITY [10 000, 30 000), METROPOLIS [30 000, 120 000] — and every quantity below it (roster, stage budgets,
district count, frame, plots) is computed from that population, never from the rung's target; a request that names a
rung without a population takes the rung's target. All three rungs generate from M1 — a rung is a `ladder.json` row on
the one pipeline, not a separate build — so M1's goldens, B-CITY runs, determinism tests and diagnostic side-by-side
include METROPOLIS; M2b measures and tunes it (§16).

**The rung profile.** Everything the owner's rule defines per rung lives in one versioned data table, `ladder.json` in
`@plat/tables`, one `RungProfile` row per rung, calibratable like every table (§7.6) and refined by the corpus phase
(§13.9):

```ts
interface RungProfile {
  rung: 'TOWN'|'CITY'|'METROPOLIS' /* the base's rows; the village product adds 'THORP'|'HAMLET'|'VILLAGE' rows of this type (PART III (5)), their layers 'none' and 'never' */;
  populationBand: [number, number]; populationTarget: number;           // the band chooses the rung; the target is the default request
  frameAreaKm2AtTarget: number; aspect: [number, number] /* 0.5–2; square by default */;   // side scales with √(population ÷ target) (§3.2, §12.2)
  stageRows: StageRowRef;                                               // stage count, regimes and walled shares (§4.2 S2)
  budgets: BudgetRef;                                                   // model, first-map and memory budgets (§12.3, §12.5, §12.8)
  granularity: { frontageScale: number; depthScale: number; joinMaxDelta: Record<ProsperityBand, number> };   // scales the §4.7 rows
  greenery: { parkPer1000Scale: number; edgeGreenProb: number; privateGreenShift: number /* points */ };       // scales the §4.9 rows
  districtCountLaw: LawRef; gateLaw: LawRef;                            // §4.5, §4.8
  matched: { mfcgSize: number; ftgSize?: 'BIG_TOWN'|'BIG_CITY'|'METROPOLIS' };   // the side-by-side references (§13.6)
  layers: { islands: 'none'|'possible'; sewers: SewerExistenceRow };          // the sky layer's rung gate (II.6 (2), item 13) and the sewer layer's existence by tier (II.7.1, II.7.4, item 14); the village rows read 'none' and 'never' (PART III)
}
```

| rung | population band (default target) | buildings at the target | frame at the target (area; side at the default aspect 1, §3.2 (9); + 30 % margin per side) | stage rows (§4.2 S2) | granularity (frontage × / depth × / rich join max +) | greenery (parks per 1 000 × / edge green or orchard probability / private green shift) | matched references (§13.6) | layers: islands / sewers (II.6 (2), II.7.1) |
|---|---|---|---|---|---|---|---|---|
| TOWN | 1 500–10 000 (5 000) | 1 200–1 500 | 4 km² (2.0 km) | 2 stages; walled core 0.90 of buildings, ribbon 0.10 | 1.10 / 1.10 / 0 | 0.8 / 1.0 / +5 points | MFCG size 40; FTG BIG_TOWN (≈ 5 600) | none / `law` (II.7.1's defaults) |
| CITY | 10 000–30 000 (20 000) | 4 500–6 000 | 25 km² (5.0 km) | 3 stages; 0.55 / 0.33 walled, ribbon 0.12 | 1.00 / 1.00 / 0 | 1.0 / 0.6 / 0 | MFCG size 80; FTG BIG_CITY (24 500) | possible / `always` |
| METROPOLIS | 30 000–120 000 (50 000) | 12 000–15 000 | 64 km² (8.0 km) | 4 stages; 0.30 / 0.30 / 0.28 walled, ribbon 0.12 | 0.90 / 0.95 / +1 | 1.2 / 0.4 / −3 points | MFCG size 130; FTG METROPOLIS per D-31 | possible / `always` |

**The layers column** (items 13 and 14; J-A13.01). `layers.islands` is the gate II.6 (2) reads at generation and again at
every epoch: islands are possible at CITY and METROPOLIS and never at TOWN or on any village rung, and inside the gate
II.6's supply and count laws decide whether any exist. `layers.sewers` is II.7.1's existence row: a TOWN draws its sewers
at S0 by a law of its population and wealth, never certain; a CITY or METROPOLIS always has its network, its toggle
showing or hiding it; the village rows carry `never`. Both are per-rung data of `ladder.json`, where D-33 keeps every
per-rung fact.

**Budgets inside a rung.** Because size follows population, a rung's budgets are laws of its building count, never
one number per rung: model time §12.3 (with where O3 (d)'s bars hold and the declared miss above), the first map
§12.5, memory §12.8, the ratios to MFCG at matched sizes §12.9; the misses are declared for the owner's veto (D-18).

**The rung modifiers** — wider and deeper plots and more private green in a town; narrower frontages, larger joined
rich plots and more public parks in a metropolis — are PLAUSIBLE defaults with provenance "architecture 2026-09-25"
(J-S13). **Confirmation (M2b, B-CITY):** the modest band's median frontage orders TOWN > CITY > METROPOLIS and park
area per 1 000 inhabitants orders TOWN < CITY < METROPOLIS. **Pre-decided fallback:** if an ordering fails, that
modifier's distance from 1 is doubled once and re-measured; if it still fails, the modifier is set to neutral (1.0 / 0)
and the ordering is reported as not produced.

**Requests at the ends of the ladder.** A request below 1 500 inhabitants is routed by `LadderRouter.route(population)
→ { product: 'base' | 'village', rung }` to the village product (PART III); while no village product is registered the
base builds a 1 500-person TOWN and `requestedVsBuilt` reports the clamp. A request above 120 000 is clamped to 120 000
and reported. A request that names both a rung and a population outside that rung's band is an F-EDIT conflict whose
dry run offers the rung the population belongs to.
=== REPLACE ### 1.2 The one-click default, stated once ===
### 1.2 The one-click default, stated once

`generate({seed})` → a TOWN of 5 000 people whose complete city band — every block in its ground tone, every footprint
mass, street, wall, gate and quarter label — is on screen within 150 ms of the click on the reference machine
(124–145 ms across the target's building range, §1.1; §12.1); a CITY's and a METROPOLIS's default requests take
≈ 0.33–0.42 s and ≈ 0.86–1.05 s, and every size follows §12.5's laws of the building count. The first paint is the
finished picture (§8.5). Defaults: the `ink` style with MFCG's raised under-copy on and the projected shadow off; walls
on at every rung (R6); the sky layer's model setting off and the underground layer hidden — a CITY or METROPOLIS resolves
`Features.sewers` on by tier, its historical network built once the staged network stage exists and drawn only when its toggle is on (D-3, II.6 (1), II.7.1); first-level features at *auto*, drawn per seed from S0's feature-probability table and reported
(§7.8); coast or river by the site model's request defaults; curved quarter labels at city zoom and district names from
district zoom, in IM FELL Great Primer (§9.4, §17.2); scale bar and compass; buildings composed on click and, once stage 3 brings the plan rung, their plans on a second click (`elaborate: 'click'`, a per-viewer view
key, §4.1, §2.9); no questionnaire, no hidden state. Every
improvement ships behind the defaults (R8): the fast path never pays for the simulation module, projected shadows,
relief, thumbnails or the advanced panel.
=== REPLACE ### 1.4 Fusion thesis, stage by stage ===
### 1.4 Fusion thesis, stage by stage

The rule at every genuine conflict is the owner's DESIGN TIEBREAKER: the approach more faithful to how real settlements
are constrained and laid out — explicit constraints (terrain, water, defence, land use, access, growth) and precise
real-unit geometry with measurable statistics — with legibility and one-click use as a floor. **TB** marks the rows
where it decided; "no TB" where charm and evidence agree. Each criterion carries its §15.2 class: **C** conformance,
**P** parity with a measured reference number, **O** an outcome the references do not reach.

| stage | MFCG-class approach (evidence) | FTG-class approach (evidence) | PLAT adopts | discards, and why (measurable criterion) | TB? |
|---|---|---|---|---|---|
| site: terrain, water | coast = 6-octave noise per cell, `sea` an angle; river = course search with 712 rejections and 21 canal restarts in 58 attempts, whole-city restart on failure (`_critic.md` C15; CONFIDENCE B3/B8) | water first, coast "in two arms", rivers that "may bend back", no terrain ("Mountains aren't properly supported yet", CONFIDENCE C1/C2/D8) | **new (O1)**: heightfield in metres + hydrology; rivers by descent; coasts, lakes and islands from one closed-outline routine; coast and contours agree by construction; water faces enter L0 with typed shores | MFCG's mesh-edge rivers (no bed, restarts) and FTG's border-touch typing — neither has a terrain constraint. Criterion: requested water features delivered by tier with 0 tier-6 omissions (O1 a, O); non-monotonic beds 0, contours crossing water 0 (O1 b, C) | **TB** |
| units and frame | an internal unit of **4.00 m** (the SVG scale bar against the map group, three files: 3.9998 / 3.9998 / 3.9991 m); its GeoJSON export is already in metres (road width 8 in the JSON, 2 in the SVG) — `captures/mfcg/exports-sweep-2026-09-25/README.md`, redteam-mfcg MFP-8 | integer centimetres centred on (0,0), +y north (`_critic-ftg.md` F1, CONFIRMED) | FTG's convention | MFCG's internal unit (read only to measure its exports). Criterion: every parameter and export in metres (O6 a, C) | **TB** |
| centre and destinations | plaza = innermost cell; streets = BFS gate → plaza on cell edges; roads to a phantom point 1 000 units out (`os-model.md` §6 via CONFIDENCE B7) | initial-roads type at the origin, no destinations ("most of the settlements in FTG look similar", 112861635) | **MFCG's idea on FTG's substrate**: named destinations (the markets, gates, bridging points, harbour, external bearings), the plaza and castle reserved and the gate sites picked at S3 — the principal market scored by where trade meets, usually the plaza, with secondary markets by size as both references have them (§4.2, item 24), the growth centre staying the root — arterials routed between them over a cost surface in real metres | FTG's destination-less bloom. Criterion: through-roads at a destination 100 % (O4 a, C); detour ≤ 1.4 (O4 b, P) | **TB** |
| secondary streets | since 0.10.0 every non-arterial street is the district-wide twisted bisection of the merged ward polygon — a connected secondary network with mostly 3-valent nodes, cut inside a wall built first so the fabric inherits its shape (87882877; `profile-mfcg.md` §4.9 via redteam-mfcg MFP-2) | proposal-queue growth in stages, 15° per-vertex cap, half-step normal streets, prune/trim between stages (`ftg-docs-params.md` §2.2–2.5) | **by regime** (§4.4): inside the walls S5 grows only district-scale secondaries that join the arterials (separation ≈ 120–250 m) and S8's recursive bent cut cuts every lane and intramural secondary; outside the walls **FTG's staged growth** along the main roads, destination-aware, curvature-continuous, with explicit legality thresholds; the suburb regime by preset | FTG growth down to block scale inside the walls (the fabric would neither inherit the wall nor carry MFCG's signature); FTG's clamp-only wiggle (zero mass above 15°, `_critic-ftg.md` §4 row 7). Criterion: MFCG's street signature inside the walls (§13.5, P); no turn cliff and junction p5 ≥ 30° (O4 b, P) | **TB** |
| districts | grown from seeds around features with `validatePatch/validateEdge`, holes split (CONFIDENCE B9); live typing is feature-named | district = one growth lot typed from the remaining pool "and what the lot is next to"; 49 % of buildings in no ring (`_critic-ftg.md` F4/F13) | **MFCG's grower over FTG's objects**: groups of coarse skeleton faces seeded at features, grown with arterials, walls and water as barriers, **feature-named**, merged into **quarters** for city-zoom labels; the use mix from the roster's allocation and the prosperity field, with a mixed-use floor; the field's default band set reproduces FTG's lifestyle tiers and the ward-class shares of MFCG's open-source model of 2017 (§4.5, item 27) while districts stay feature-named (J-P1) | FTG's one-lot districts (containment 53 %); class-typed wards MFCG itself dropped. Criterion: containment 100 % (O11 b, C); city-zoom quarter labels at MFCG's count per matched size and block-level use mix in band (§13.5, P) | partial TB |
| block fabric (lanes) | twisted bisection of wards into blocks and alleys; restart on "bad poly" (`_critic.md` C13; ST-8) | straight inserted roads to a target area (§2.5) | **NG's bent cut** with the measured signature (§13.5) as a hole-aware kernel transaction with a bounded ladder; the district's class band as the stop law; the deep-interior choice (court, back lane, through-alley, rear plots) by band shares | FTG's straight roads (too regular); MFCG's restart. Criterion: K1/K2 within the measured spread (P); 4-way share per preset, organic 0–15 % (R3, P) | no TB — charm and evidence agree |
| blocks → plots | bisection lots + `filterInner` + `indentFronts`; lots painted as buildings | strips / centroid cuts / shrink-then-split; 441 m² in every class; no owner (`_critic-ftg.md` F17) | **new (O5/O18)**: per-frontage regions of each block, strips perpendicular to each frontage with party walls, typed residue, joins and splits from the prosperity field, alleys and back lanes where the band's deep-interior share says so | both references' cut-then-filter lots. Criterion: access edge 100 % (O5 a, C); streetwall continuity and footprint cover against MFCG's exports at the matched rung, direction declared (§13.5, P); within-district plot-area CV above its floor (§13.7, O) | **TB** — burgage plots were laid from the frontage |
| buildings | lots drawn as buildings ("the illusion of buildings"); Complex = rectangles; landmarks by `lir` | building = plot (Dense) or inset plot (Gaps); entrance on the outline ≈ 3 m from the road (C9; 2.99 m measured, §13.5) | **the owner's plot model**: a parcel with 0..n footprints and a typed yard; site plan by class (row / compound / detached / hovel / institution / tents); heights on everything; FTG's entrance rule retained as the main door's default and extended to a set — side, rear and yard doors where the plot gives an access edge or a yard — with a selective basement (§2.6, item 29); FTG's material model as the default, a material texture and colour only (§2.6, item 19); every designation scaled by its prosperity template (§4.7 S11); landmark footprint templates in the base; the stage-3 generator behind the `outline` / `compose` / `plan` interface (§2.6) | MFCG's global display switch; FTG's one-building-one-household lot. Criterion: O17 (a)–(i) | TB (owner ruling, metric tables) |
| walls, gates, castle | one ring on cell edges, built before the streets; `gates = N` exact; a tower on every non-gate vertex; castle = a cell with a 0.75 compactness repair loop (B5/B6) | wall = typed edge chain on the district ring after a stage; towers at 39 m median; no gate objects; castle fitted into its lot (C11/C12) | **FTG's staging + MFCG's gate identity and wall-first order** (§4.2 S3, §4.4 S5a, §4.8): gate sites picked and the castle and plaza reserved at S3; stage 1's enceinte traced at S3 over its solved gate routes and each later one at S5a, each from its stage's travel-cost boundary and pulled to defensible ground before that stage's streets grow; gates exactly where arterials cross, exact N by MFCG's measured gate law; towers by rule; the castle by score with the compactness gate as a shape check, repaired in place (angle equalisation, then bloat) before re-siting; several enceintes; an open waterfront by default; the wall → road lifecycle | MFCG's cell-as-castle and tower-per-vertex; FTG's ungated crossings. Criterion: O8 (a)–(h); walled share at MFCG's measured 0.87–0.92 (§13.5, P) | **TB** — defence as an explicit constraint |
| hinterland | farms as a ward type, `Cutter.grid` / `splitField`; forests "fill all available space" (the creator: "historically incorrect anyway") | main roads to the border, four farmland modes, farmsteads with driveways, hedgerows, reserves (C14–C16) | **FTG's contract + O14**: FTG's order — decided with the demand, drawn after the town — and its farmland modes chosen by size and landscape (§4.9, item 26); land use sized to population, fuel and timber beside food; field systems as presets (open-field strips, enclosed, FTG's hedgerows, the MFCG/VG sector look), farmsteads by their fields, woodland by distance and demand, a context margin | MFCG's fill-the-leftovers. Criterion: O14 (a)–(g) | TB |
| content | population ≈ 6.12 × buildings, wards are "hints" (`_critic.md` C1) | roster first from a dependency graph; every building has occupants; people lazy (B1–B6) | **FTG's guarantee, two-way**: a sequential, prefix-stable roster from our own tables → an eager allocation to districts and blocks → placement onto plots → a bounded reconcile; people derived lazily | MFCG's multiplier. Criterion: O7 (a)–(h) | TB |
| determinism | one MINSTD stream, retry continues the stream (A2) | `seed: null`, server-side (A4) | **O2**: 128-bit-keyed sub-streams (key components §6.1); integer geometry; permanent lineage-hash addresses with anchors (§6.3) | both models. Criterion: O2 (a)–(e) | — |
| rendering | ink print, casing idiom, per-ward cache, no zoom ("a big flaw") | lit web map, merged geometry, tiers | **one semantic display list with LOD and paint programs on one drawing path** (Canvas2D the reference backend of every preset); ink default, lit second, hatched for stage 2 | each renderer's coupling of geometry to its drawing path; a second render path for the lit look. Criterion: O12 (a)–(g) | — |
| editing | 8 warp kernels, per-ward reroll, no save | layout editor, regenerate area, bulk edit, "cannot be undone" | **FTG's graph editing on our plat + MFCG's warp kernels**, all as events on permanent addresses with locality, dry-run validation and undo | nothing of substance; neither persists. Criterion: O9 (a)–(f), the MFCG asks as measured scenarios (O9 f, O) | — |
| labels | curved labels on skeleton spines, halo, legend | arced serif labels, 2 m / 5 ft grid, scale bar, no compass | **MFCG's spines made hole-aware and collision-checked, quarter labels at city zoom + FTG's furniture** | none. Criterion: O13 (a)–(h) | — |
| failure policy | whole-city retry incl. wards and geometry (ST-8) | server "gives up"; no fallback in the splitter | **MFCG's tiers minus the restart tier**: typed results, bounded ladders, substitution, and a report that counts every requested feature by delivery tier | both. Criterion: tier-6 omissions of requested features 0 and p95 time on MFCG's worst configurations (O1 a, O3 b, O); hard invariant violations 0 / 1 000 (C) | — |

**Defaults emulate; extensions ride on top (item 23).** Defaults emulate MFCG and FTG, the tiebreaker choosing
between them, and extensions ride on top as table values (§7.6, the rule's home; §17.1 (6)).

Genuinely new mechanisms replace both references: the site model (O1), the plat kernel (O3), frontage-first plots and
the granularity law (O5/O18), the prosperity field (O18), the plot/site-plan model with heights (O17), the greenery rule
family (O19), the semantic display list with paint programs (O12), the document and edit log (O9), the keyed stream
design (O2) and the layer model.

**The fused layout** (the mechanism is §4.4): grown arterials with partitioned blocks *and* a partition seeded from a
grown skeleton are the same thesis at two granularities — the backbone's faces are partitioned by bent cuts, and the
cuts are promoted to ways of the same graph; inside the walls the partition does the street work MFCG's does, outside
them growth does FTG's. Rejected: (a) MFCG-first (a Voronoi cell mesh as truth, growth only outside the walls) —
streets without geometry, roads that point at nothing, no incremental growth without re-meshing; (b) FTG-first end to
end (queue growth down to lanes) — the "vaguely circular" look-alikes the creator names and the loss of the T-junction
signature R3 requires; (c) an Urban Places-style quad base mesh — geometry inherits the mesh resolution, which the
precision tiebreaker forbids, and its construction is unrecovered; (d) bent cuts as queue proposals — the recursion is
what yields the measured statistics. The MFCG creator's warning that road-first plus block subdivision "seems
problematic" (devlog 31287) is the risk the fusion gate O4 (f) guards — measured at M0 on a flat site and again at M1
on B-CITY-lite's river, coast and relief configurations with the reordered stages (§16).
=== REPLACE ### 13.1 Kernel property tests (fast-check; B-FUZZ) and the ladder coverage test ===
### 13.1 Kernel property tests (fast-check; B-FUZZ) and the ladder coverage test

Every kernel primitive is fuzzed with two input families, held to one bar — **0 crashes, 0 hangs (hard timeout), 0
invalid outputs** (no self-intersecting output, no undeclared sliver) — at the sizes of §13.8's tiers.

1. **Random inputs** (`fast-check`): concave, holed, thin, near-collinear, self-touching, snapped, duplicated-vertex,
   ≥ 300-vertex and zero-area polygons and chains.
2. **Constructive degeneracies.** Random sampling almost never lands on an exact degeneracy — a line across a 2²⁴ frame
   holds at most 2²⁴ of its 2⁴⁸ lattice points, so a random third point is collinear with probability ≤ 2⁻²⁴ — so every
   degenerate class is built on purpose from random parameters:
   * *geometry classes:* lattice points exactly on a segment, placed by gcd stepping (`p₀ + k · d / gcd(dx, dy)`);
     collinear triples and collinear overlapping edges (shared runs from 1 cm to the whole edge, same and opposite
     direction); cuts through a vertex and cuts grazing a reflex vertex (through it, and offset by 0 and ± 1 lattice
     unit); antennae (chains dangling into a face) and chains touching a boundary at one point; coincident typed chains
     — a wall on a bank, a quay on a shore, a street on a district boundary, a track on a field boundary; rectangles,
     squares and regular n-gons (n = 3 … 12) rotated by random angles and snapped; holes touching the outer ring at a
     vertex and along an edge, and holes touching each other; simultaneous skeleton events (regular polygons,
     equal-sided rectangles, symmetric notches); star rings of radius 2²³ − 2 (`area2` exact);
   * *quantisation:* half-centimetre ties before snapping and ± (2²³ − 1); values `snap` must refuse (± 2²³, NaN, ± ∞);
   * *attraction and moves:* a vertex at (20, 20) against the edge (0, 0)–(1 000, 0) moves onto (0, 0), leaving no
     sub-`minEdge` edge; a chain crossing an edge next to a vertex standing 25.0–25.7 cm from it; a stretch whose join
     point lies within `attractCm` of an edge endpoint; a `pinch` that would shorten an edge below `minEdge` and a step
     that would put two vertices on one lattice point (both halve); a `warp` with `fromLevel = 1` over a street ending
     on a shore (the junction slides along the shore and the step commits); a warp moving a kerb beside a vertex 25.3 cm
     from it — the kerb (0, 0)–(1 000, 9) past (517, 30) — commits, its re-seated vertex placed by the placement rule
     (`fixall_kernel_r3_checks.out` A); a warp re-seating two Steiner vertices whose projections lie within `minEdge` +
     1 cm of each other gives identical output after a slot renumbering (the two placement orders differ in 6.8 % of
     such pairs, `fixall_kernel_r4_checks.out` B); a warp over a locked plot and over a pinned building holds every
     corner (a neighbour's footprint corner on the locked plot's line slides); a `warp` with `fromLevel = 1` over
     finished fabric gives 0 `E_KEPT`, and over a generated and an edited water gate moves neither gate's bank vertices;
     a warp over a spine carrying a same-level T-junction, and one moving the spine's vertices around the unmoved
     junction, then the lane removed — the junction stays a shape vertex of the warped spine; a warp that re-seats a
     Steiner vertex, then `clearFiner` — the vertex dissolves and the coarser edge is restored exactly;
   * *kept content, carves and water edits* (§3.3's clear regions, §4.11's footprints): an L1 lane into a face holding
     kept L3 content of an earlier stage (`E_KEPT`); a canal across a CITY district that cuts a lane whose remainder is
     pruned and re-routes a `primary` — every face outside its footprint (the channel buffer ∪ every L1 cell its way
     rule touches) byte-identical except the seam exception at its boundary, its L0 channel attracting onto exactly its
     prepared vertices (each promoted, no other finer vertex promoted), each deck carrying `deck` beside `way` in §2.2
     rule 7's form (the kept way's own L1 edge, no L0 edge across the channel); a course-knot move and a river move
     across a street grid, with the same footprint and contact assertions (§7.3 (b)); a canal crossing a walled CITY's
     wall between two towers — no `E_KEPT`, no `E_LEVEL`, every face outside the footprint (the old run's strip-line
     stretches and the new strips' ground included) byte-identical less the seam exception, every way the new strips
     meet cut at their boundary, the water gate's `Gate.banks` on its two `gate_end` vertices; an outer moat carved at
     S5a (§4.4) — every face outside its footprint byte-identical less the seam exception, attraction onto exactly its
     prepared vertices, every indexed role unique per ordinal and no contact name left; a carve chain that touches a
     finer edge away from its prepared vertices (`E_LEVEL` inside the clear region, `E_KEPT` outside); a canal across an
     open enceinte's glacis line and a river moved through a walled town — every indexed role unique per ordinal
     (§3.10), `Gate.banks` resolving to its two `gate_end` vertices, no `anchor` contact name left; a river moved away
     from a quay-lined and a walled bank — the quay and wall edges back at L1, the L0 view land and water only, a deck
     left over land at the way's level after F-REDERIVE (before it, at the level of its `deck_end` rows, with no L0 edge
     at it), its bank vertices unpinned; a deck whose bank vertex also carries a width knot, removed by F-REDERIVE — the
     vertex ends unpinned, its knot kept; new water across a corner of the frame — the border's stretch between its two
     contact points, the corner included, unchanged and closed; a declared preparation batch placing two contact names
     on one entity, its ops permuted — identical ordinals;
   * *removals, profiles and neighbour steps:* a lane removed from a spine it ended on — the spine's chain restored
     exactly, its own shape vertices untouched (the `split` flag, §2.2 rule 3); an S8 T-junction on a spine with a
     width profile — every sampled half-width unchanged; a way split between two width knots — every sampled half-width
     within 10⁻⁹ cm of its value before — then re-joined, giving the original profile bit for bit; a stretch of a way
     removed between two junctions and a stretch of a ring removed between two anchors — the rest of each chain
     unchanged, every remaining profile sample within 10⁻⁹ cm of its value before and every other role unchanged
     (`fixall_kernel_r4_checks.out` C); a removal that leaves a way in two parts without a `rekey`, refused by role
     consistency; II.1 (3)'s neighbour step beside finished plots — a plot-line end within `attractCm` of the foot
     (promoted; every plot ring unchanged) and one farther (a kerb split; each ring equal to its prior ring with the
     vertex removed) — then the street removed again, by an undo and by a reroll, at a promoted plot-line end and at a
     promoted footprint corner: the kerb's L2 route, index and digest and the block's, the plot's and the wing rings
     equal to those before the step; two neighbour steps on one kerb edge, the first street removed by a reroll — its
     plot-line end back at L3 and the kerb's L2 route equal to the route with only the second step
     (`fixall_kernel_r5_checks.out` A); a promotion that leaves another finer vertex 1.2 cm from its new route edge
     commits with no `E_INVARIANT`, and every index query whose box meets that vertex returns it;
   * *indexes, slots and the pool:* a pool overlay writing outside its district (`E_SCOPE`); a logged `moveVertex`
     replayed after an upgrade that puts an unrelated vertex 20 cm from its position — bound to the signature-matching
     vertex or orphaned, never to the unrelated one; a slot freed and reused inside a stage — the query returns the new
     item; a slot freed in one district and reused in another, the second district's partition rebuilt before the
     first's — returned as its new item, never as its old one; after a neighbour step and its removal by a reroll with
     no partition rebuilt in between, level-2 and level-3 queries over the kerb return exactly what they return after a
     rebuild; a `drawBoundary` that moves a kept block from district A to district B, B's partitions rebuilt before
     A's — every L3 query over the block returns each plot once, before and after A's rebuild; an L3 query in a block
     before and after S11 derives L4 there (two plots sharing their lowest-leftmost vertex with an L4 vertex on their
     shared edge) returns its results in the same order (`fixall_kernel_r3_checks.out` C); a pooled district beside
     the settlement perimeter commits plot lines ending on the backland part's inner edge with 0 unresolved crossings
     at pool sizes 0 and 3, and every freeze finds every dynamic grid and tombstone set empty after its rebuild (§3.3
     pool step 1); the frozen copy sent to a pool worker holds typed arrays only — no `Map` or `Set` reachable from the
     message;
   * *straight-skeleton fixtures (M0):* squares and rectangles at every centidegree 0°–90°; regular n-gons n = 3 … 64;
     equal-width strips; rotated L, T and U shapes; near-rectangles with a notch on a long side, which take the skeleton
     path and pass the validator (a 20 × 10 m rectangle with a 3 × 2 m notch: no roof line outside); 1 000 holed
     polygons; snapped rotated squares; plus B-CITY-lite's irregular footprints and district and water faces.

**Properties** (checked after every operation): output simple; nesting by index (every face inside its parent); no edge
shorter than `minEdge` from any writer, after every insertion and every warp step, and clearance ≥ `minEdge`; Euler
characteristic after every insertion; `remove(insert(x)) ≡ id` on the topology; **`splitFace` children tile the parent
exactly at the child level (integer `area2` equality)**; `mergeFaces ∘ splitFace` restores the ring and the id;
`corridorUnion` faces disjoint and covering; `offset(−d) ∘ offset(+d)` ⊆ original and `insetRing` empties monotonically;
**every straight-skeleton output passes the §3.8 validator — a connected graph inside the face whose number of
independent cycles equals the number of holes — or is a reported downgrade**; OBB contains the hull and collinear input
returns `E_DEGENERATE`; LIR inside the face; snap rounding idempotent and terminating within its bound; the `orient2d`
sign equal to a BigInt reference on adversarial triples; Poisson minimum distance ≥ r; differential agreement with the
CI oracles (Clipper2-WASM in Node, `polygon-clipping`) on booleans and buffers, split by attraction (§3.7) — unattracted
cases with equal face counts and symmetric difference ≤ perimeter × 1 cm, attracted cases valid and within perimeter ×
√2 · `attractCm`, the harness reporting both shares per operation and drawing ≥ 10⁵ unattracted cases per operation;
roles preserved on coincident chains (a sliver between a spine and a shore keeps both); a declared batch's result
identical under any permutation of its ops (the callback-form test is §13.2's); renumbering the arena's slots gives
identical output; `clearFiner` after a refinement restores the coarser level exactly; mandatory chains never rejected
for precision; 0 stale references after every batch; every index query's answer identical before and after a rebuild of
the partitions it reads (§3.3); after every removal each edge's level is the lowest among its rows and no vertex is
coarser than every edge and role at it (§3.10's level-consistency row); save → load → save byte-identical and the loaded
arena passing every hard invariant (§3.9, §3.10); a 3 000 m relief fixture with a hill-acropolis site stores without a
clamp and D8 is defined on 100 % of the hydrology grid's land cells over frame and margin (§2.3); every routine returns
a typed result on the pathological corpus.

**Ladder coverage:** every rung of every ladder in §5.2 is reachable by a fixture, and each downgrade (medial axis, the
plain-roof downgrade, straight cut, substitution) is exercised; no roof line lies outside its footprint; 0 crashes on
the 1 000 holed polygons; a skeleton failure is never a crash and never a visual surprise.

**Fixtures added by amendments b (items 12 and 28; the kernel's rows in §3.4, in §3.7 and in §3.10).** *The underground
arena* (II.7): `corridorUnion` over a fixture of `tunnel` chains, where the kerb is the tunnel's external wall — a plot
line ending on it lands by attraction, and a tunnel junction yields wedges like a street junction. *The transient arena*
(the plan rung's, §3.4): the seed-tiling `area2` identity after random partitions of rect, L, T and curved-quad rings, a
T's two wings clipped to tile (§3.4); a side two seed rings share becoming one edge; a seed vertex within the hot pixel
of another ring's side splitting that side, and one 20 cm from it refused with `E_DEGENERATE` (detail `seed`), the
construction moving nothing; overlapping seed rings, and a fixed ring outside the seeds or across a seed ring's side,
refused with `E_DEGENERATE` (detail `overlap`); a fixed bay with a slit and a cut; `mergeFaces` across a seed edge
refused with `E_STRUCTURAL`; the `readBack` order identical after a slot renumbering. *The re-cut* (item 28 (f)): the arena opened from the same seed rings with three kept
rooms and a chimney-stack ring on a partition wall passed as `fixed` — the kept rings and the stack ring come back as the
same polygons — every input vertex unmoved and in order, any added vertex within the hot pixel of one of their
sides — including a kept vertex split 25.3–25.9 cm from a seed corner in the earlier arena (the exact insertion,
§3.4), the faces' `area2` sum equals the seed rings' sum and the
stack's wall segment survives; a second call with no kept rooms reproduces the first cut.
=== REPLACE ### 13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT ===
### 13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT

* **Invariants.** The §5.3 suite runs by scope — batch-local invariants per batch, stage-end invariants per stage,
  save / load invariants per document, CI-only invariants (§5.3's digest-maintenance oracle among them, on every
  B-CITY-lite city) in the harness — on B-CITY: 1 000 seeds × the 4 `WaterSetting`s of §13.3 × 3 rungs in the nightly
  tier, 50 seeds per rung in the PR tier (§13.8), all three rungs from M1 (§1.1). Each invariant has an id, a severity,
  a count in the report and a CI threshold: hard = 0 per 1 000 cities; soft within its band.
* **The statistics record.** The **core record** is O(n) and is emitted by every generation within 4 ms at CITY
  (§12.4): counts per entity kind and class; areas per class and band; fixed-bin histograms per district and band of
  plot area, frontage, depth, footprint area and storeys; way length per class; the junction-degree histogram; turning
  per 100 m on ways resampled at 10 m; the walled share and built extent; ladder uses per cause and rung; every
  requested feature's delivery tier (§5.1 principle 7); stage timings. The **bench metrics** — detour index over sampled
  destination pairs, Moran's I, KS distances, junction-to-junction runs, orientation coherence and wall alignment,
  figure-ground metrics on renders (§8.5), tree nearest-neighbour and pair-correlation statistics computed from §8.10's
  stamped scatter — run through `stats(doc, { level: 'bench' })` on demand or in the bench, never on the one-click path.
* **Cost-model tests.** Each stage is timed on **nine sizes — three per rung: the band's bottom, its target and its
  top** — 1 500, 5 000 and 9 900 (TOWN); 10 000, 20 000 and 29 900 (CITY); 30 000, 50 000 and 120 000 (METROPOLIS)
  inhabitants, five seeds each, nightly (the METROPOLIS sizes reported from M1, gating from M2b). A stage's log-log
  slope of time against its declared work measure (its work-limit laws, §5.1 (5), §14) must not exceed **1.15** for a
  stage declared linear and **1.25** for one declared n log n; §12.3's per-rung cost laws are fitted on the same runs.
  **Work limits follow population:** each run reports, per stage, the F-WORK hit rate (work cuts per 1 000 batches), and
  CI fails when the rate at the top of a band exceeds the rate at its bottom by more than 1 per 1 000 — §5.1 (5)'s
  pre-decided coefficient fallback then applies and the sweep re-runs. **Index work** is fitted against commits × level
  size (§3.3). The budgets these runs time, and their measurement rules, are §12's: the per-edit cost and validation
  flatness across rungs (§12.6), the memory test per rung (§12.8), the first map by size (§12.5), the pan-and-zoom run
  during an A2 300-dpi export (§12.7), the model max clause judged on re-timed outliers (§12.3), the simulation module's
  occupancy test at M4b (§12.7), all taken in §12.1's timing phase.
* **Document tests.** The entity registry's path test fails when a type is missing from any path — generation, digest,
  render, export, persistence, edit, undo, migration (O11 a); export → import → export is byte-identical over the
  canonical form (O9 a, O11 c); the **document-size test** per rung holds ≤ 320 B per building at CITY (§2.9).
* **Stage contract tests.** The same inputs and stream give the same digest on Node x86 / arm64, Chromium, Firefox and
  WebKit, with workers on and off and pool sizes 0–3, beside §6.5 (9)'s determinism tests. **Op-order determinism:** a
  declared batch's ops permuted give the same result (§13.1); a callback-form stage run twice, on a slot-renumbered
  arena and inside the pool at sizes 0–3 gives identical digests (issue order; op permutation does not apply to it,
  §3.3). S8's working block equals S9's committed block (Hausdorff 0; §3.7). The per-stop placement digests of §13.3
  are the contract test of S13b; a stop placed whole and placed one unit per step gives identical placement digests
  (§8.3, §9.2). The stamp-tile asset's hash and rebuild tests and the view-data contracts are §8.3's; the shipped stamp
  tiles pass §8.3's seam check (§8.10).
* **Stage property tests.** 10 000 coast / island / fjord / sky outlines per intent → 0 self-intersections and 0 untyped
  loops; 0 overlapping or self-intersecting plots on concave, notched and curved blocks before any fallback; attached
  and party-wall shares on curved-street blocks inside the dense band; roster `manifest(P₂) ⊇ manifest(P₁)` for P₂ > P₁
  on 1 000 seeds; the stage-3 contract (the union of composed wings equals the outline, §2.6); the `ringed` fixture (≥ 3
  closed rings, radius CV ≤ 10 %); a B-CITY sweep over `wealthLevel` ∈ {0, 0.5, 1} (population ± 5 % on ≥ 95 % of seeds,
  walled share inside its rung band, §4.2 S2); the derived-complete digest identical across district orders; opening a
  person leaves the digest, the log and the undo stack unchanged; **heights** on 100 % of buildings, wings, towers and
  wall runs, and on hilly golden seeds and after every terrain stroke 0 wings whose `baseCm` differs from the highest
  terrain sample under the wing plus the plinth, user-edited bases excepted (§2.6, §7.3 (a)); **0 `E_KEPT` on the
  one-click path** over B-CITY (a stage whose domain overlaps an earlier stage's kept content is a pipeline bug); every
  gate and weld vertex on its trace, and stage 1's trace within 40 m of its boundary except along an `on_enceinte`
  castle's shared stretch; 0 lanes crossing a wall strip and 0 L3 band faces split or cleared (NF-P5); 0 S7b claims
  meeting a wall strip; the seam exception (NF-P6) on New random of 20 districts per B-CITY-lite city; the union rule
  (composed wings = outline) on curved-street row fixtures with `quad` wings, including rear lines oblique to the
  frontage — bent party-wall chains, `corners` recorded, the ridge at the arc-length midpoints; decks on 100 % of
  way–water crossings, moats and canals included; harbour fixtures with a two-arm mole and a detached breakwater pass
  the crossing invariant as harbour works, and a `quay` way drawn across a river without a deck fails it (§5.3); the
  walled coastal harbour fixtures of §4.2 S3 (11) — the harbour outside the stage-1 region, with and without
  `moat: 'inner'`, sealed with `N = 0`, and a polycentric coastal town whose nucleus nearest the harbour has no unforced
  pick left — each with the harbour served, 0 non-gate ways reaching the trace, every way–moat crossing on a deck, roads
  leaving = the N main gates plus a harbour gate of §4.2 S3 (7) where one was placed, the harbour route at most 1.5 ×
  the plaza ↔ harbour least-cost lattice path with the wall ignored, and one main gate on the harbour side (§4.2 S3
  (4)); a river town whose growth leaves crossing sites unused — 0 site furniture and 0 site marks in the display list,
  every built bridge's span the way's own L1 edge; an epoch whose growth builds a site; a drawn bridge 15 m from a site
  builds that site, and one 30 m from every site adds a deck by one L0 shore-split batch, §5.3's crossing invariant
  holding throughout (§4.2 S1 (5)); a canal across the settlement perimeter — 0 district faces outside the perimeter,
  the land on both banks the hinterland's; `castle: 'on_enceinte'` with water in reach, with and without a city moat — 0
  trace–water crossings off a river's water gate, the outer-arc channel beside the shared stretch, the town side
  dry-ditched or plain by its row; every seam edge typed, a way-less shared reservation boundary typed `reserve` (II.5).
* **B-EDIT and the locality oracle.** §7.3 item 7 (i)–(iii) and (v), and (iv)'s byte identity of Regenerate (keep
  settings), run **once per sequence** — at its end and at one seeded random position — never per edit. Fixtures: the
  re-parenting set (`drawBoundary`, district merge and split, `outskirtToDistrict`, regenerate around a lock, the
  id-recycling case); terrain-brush sequences in both water modes, and course-knot, drawn-water and drawn-bridge
  sequences with §7.3 item 7 (v)'s assertions and its water-edit fixtures; table weight edits and row insertions; drawn
  features mixed with later attribute edits; epochs and rebases; an epoch after 20 edits and a Re-derive from S10 after
  20 edits, each at pool sizes 0 and 3 with identical digests, every freeze finding every dynamic grid and tombstone set
  empty after its rebuild (§3.3 pool step 1); undo and redo from several sessions and §6.5 (9)'s truncation, naming and
  version-pinned cases (§7.4); an undo after a reload of an unshared document undoing the pre-reload event (§7.4); New
  random on minimal scopes (§5.1 (6)); the naming-collision replay fixture (§7.3 item 7 (i)); the B-EDIT-lite identity
  fixtures (≥ 99.9 % of addresses kept under 1 cm perturbation, §6.3); §7.3 item 7 (vi)'s shared-edge identity, and
  Regenerate (keep settings) of a block holding a rich compound whose yard has a formal-garden grid and an orchard part
  with edges ending on the house wall — byte-identical to the one-click result, the wing rings after generation already
  carrying those wall vertices (§2.6); a warp over a square keeping its fountain, over a yard keeping a user-moved tree,
  and one halved by a pinned pin (§7.4); **§2.6's test** — a warp and a `moveVertex` over a built block with an L house,
  an overlapping T, a curved row of quads and a holed footprint: after each, every wing union equal to its footprint
  face (integer equality), every carried ring simple, every roof line inside its footprint, de-rectangled rects turned
  quads, a neighbouring plot re-fitted onto a shared party wall adding its corner to the wing ring along that wall, undo
  restoring every ring byte for byte and a replay reproducing them; and a building with a hand-built stored
  `Composition` — its composed wings the base wings each cut in two, a court on the footprint's hole, a tower centred on
  a corner and one inside, rooms in one wing — whose composed wings unite to the moved footprint face after each move,
  its rooms inside and its tower centres inside or on it, undo restoring it byte for byte — the stage-3 intake runs the
  same test with every fixture building's composition stored (§2.6); **load verification** — an edit within 100 ms of
  the state becoming editable on an edited CITY document, with a mismatch forced by a snapshot whose one moved footprint
  has its recorded digest recomputed to match, each choice taken in turn: the edit applies at once, and after either
  choice the session's digest equals the digest a fresh load of the saved document replays to, and that load reports no
  mismatch; the open-to-editable time against T(B); a snapshot with one moved footprint and an unchanged `model.digest`
  — its chunk hash rewritten, and not — reported as a corrupt cache and loaded by replay, never verified and never
  offered as the saved town, the session's digest after the replay equal to a fresh replay's (§2.9 steps 3–4); the same
  snapshot under a forced §6.2 (iii): "trust the saved town" and a save wait for the recomputation, the mismatch
  withdraws the keep, and the snapshot is never kept; a snapshot with one altered naming record — a corrupt cache when
  its `recordsDigest` is left as written; rewritten to match, loaded, reported by the replay as a records mismatch, the
  edits made meanwhile re-applied, then verified, and a corpus selection made afterwards renames exactly what a session
  that never saved renames; an Adjust made during load verification in an epoch-grown town, saved and reloaded, reports
  no records mismatch; a `drawBoundary` that moves surviving blocks, saved and reloaded, reports no corrupt cache;
  **naming inputs** (§6.3) — a selected user corpus and an edited naming row rename exactly the unedited names citing
  the changed slices, listed in the fate report and stored in the event, in a fresh and in a rebased document, every
  other name and naming record byte-identical, 0 duplicate ids and 0 silent re-binds; a bridge re-sited afterwards keeps
  its new name; an `editTable` of one naming grammar row renames exactly the unedited names citing it; a culture row
  with a street corpus and a district-name corpus, the street corpus replaced — every district and quarter name and
  naming record byte-identical; a frozen fixture whose naming row changed imports with its renames listed, and a New
  random made afterwards renames nothing outside its scope; a canal carved across a wall and a river move whose bank
  cuts a glacis line, each committing with 0 NF-P5 violations, and a lane drawn across a wall strip refused (§5.3); the
  20-epoch test — a TOWN with ≈ 30 % churn per epoch keeps its heap ≤ 1.3 × and its document ≤ 2 × those of a freshly
  generated town with the same live entities (M4); and **the thirteen MFCG asks of §7.4** as scripted scenarios, each
  reporting its locality share, its invariant results and its re-run cost against §12.6.
* **The faithfulness campaign (O9 c; §7.3 item 7 (iv)).** New random is judged by a campaign, not per sequence. Each
  nightly run draws **n = 800 regenerated scopes** from its B-EDIT New-random events — 400 block scopes and 400 district
  scopes, by a seeded draw; a night whose B-EDIT run holds fewer than 400 New-random events of a kind adds New random on
  seeded scopes of that kind in its B-CITY-lite towns until it has 400 — and for each generates **K = 50 from-scratch
  references** of the same scope: the same upstream state and context, rerolls 32 768 + i for i = 0 … 49, a range no user
  reroll reaches. For each of four statistics (median plot area, median frontage width, density, attached share) the
  rank r of the regenerated value among the K references counts the references below it plus a uniform draw from 0 … t
  over the t references equal to it (drawn from the campaign's own stream), so r is exactly uniform on 0 … K for a
  perfect regenerator, whatever K and however discrete the statistic. The ranks are binned into 10 bins of
  ⌊r · 10 / (K + 1)⌋ with expected counts proportional to the number of rank values each bin holds; a χ² test per
  statistic gives four p-values, and the campaign **fails when Holm's procedure rejects at family-wise 0.01** (the
  smallest p-value below 0.0025). Cost ≈ 40 800 scope generations (800 × 51), ≈ 12.5 CPU-min at §12.6's block and
  district costs (20 400 × ≈ 6.6 ms + 20 400 × ≤ 30 ms), inside the nightly budget (§13.8). **Calibration (executed,
  `docs/validation/bench/fixall_scope_r3_o9c_n800.py` → `.out`; `fixall_scope_r2_o9c_power.out`):** the four statistics
  move together, and at ρ = 0.8 a campaign of 400 scopes catches a +0.25 sd bias in only 92.2 % of nights and a 0.8 ×
  too-snug regenerator in 95.2 %, hence 800. At n = 800 a perfect regenerator fails 1.0 % of campaigns on continuous
  statistics (31 / 3 000 at ρ = 0.8, 15 / 1 500 at ρ = 0) and 1.4 % (14 / 1 000) on heavily tied, scope-varying discrete
  ones; a +0.25 sd bias and a 0.8 × too-snug regenerator are caught in 2 000 / 2 000 campaigns each at ρ = 0 and ρ =
  0.8 (95 % lower bound 99.8 %), a 0.6 × too-snug and a 1.5 × too-loose one in 500 / 500, and at ρ = 1 the bias in
  99.3 % and the snugness in 99.7 %; without the randomised tie-break a perfect regenerator fails every campaign on a
  tied statistic (`fixall_verify_scope_o9c_rank.out`). A failing statistic's histogram names the fault: a hump is too
  snug, a U too loose, a slope a bias. **A failed campaign is re-run once with the next campaign seed:** a perfect
  regenerator fails two in a row with probability ≈ 1–2 × 10⁻⁴, and a fault of the sizes above is declared on the night
  it first runs with probability ≥ 0.996 at ρ ≤ 0.8 (≥ 0.985 at ρ = 1). A second failure is a regeneration defect —
  entered in `known-defects.json`, and M3a does not exit until it is fixed (§16), because no threshold can be relaxed
  without passing a wrong regenerator.
* **Control sweeps.** §7.8's statistical monotonicity and continuity: 21 steps × 50 seeds at TOWN and CITY (nightly);
  METROPOLIS in the milestone tier. The population control's sweep also reports the F-WORK hit rate per stage, which
  must stay flat across each band as above.
* **Option-interaction matrix.** Every pair of toggles rendered and diffed; no option silently disables another (O12 c).
* **Documentation coverage.** 100 % of controls and entity kinds have a guide anchor (§14 `@plat/docs`); every in-app
  help link resolves (CI link check); the release notes list every open entry of `known-defects.json`.

* **Amendments b (items 8–31): hook tests and acceptance bars.** They are stated once, here (R9); the mechanisms they
  prove are at the homes §0.2 names, and the fixture ids the editing seats coined (`T⟨item⟩-⟨n⟩`) are kept. A bar is
  hard — 0 violations, or 100 % — unless it names a band. Each runs in the CI tier §13.8 names, from the milestone §16
  names (a stage-3 bar from stage 3's intake, *Staged by the owner's roadmap*); the bars of a staged engine run on hook fixtures, its conversions applied by hand,
  until the engine lands, when the same bars bind it. The entity registry's path test above covers every record and
  attribute §2.8's registry paragraph lists for amendments b — `Passage` and the tunnel's `navigable`, `headroomCm`
  and `closure` among them — with `Block.due` and `ElaborationRecord`, and the enumeration test the
  new event kinds (`rejectSite`, `placeAt`, `setEntrance`, `drawPassage`, `sealPassage`, `openPassage`, `relet`,
  `densify`, `thin`, the seven plan events and `setRoomUnit`, `regenerate.rung` and the `convert` kinds of
  `DeclineOp`,
  `UseConversionOp`, `LadderOp`, `TerrainWaterOp` and `HiddenOp`). No golden exists before M1 (D-24), so none of the
  new attributes needs a declared shift.
  * *Decline and regrowth (item 8; §4.11).* (T8-1) every `DeclineOp` kind applied by hand on the golden TOWN undoes to
    byte identity; (T8-2) the regrowth-first fixture — a TOWN with 12 % of its buildings vacated, derelict or cleared by
    hand, then grown by +6 % population: 0 new S5 faces, ≥ 95 % of the delta placed inside the old plan, every
    vacancy-run share within ± 0.02 of its table share; (T8-3) 20 epochs of hand-applied decline and regrowth keep the
    address of every ruin, trace and superseded ring (100 %), and no cleared building gets a tombstone unless
    demolished or succeeded; (T8-4) the exposure function is monotone in each driver's weight, and its chance share
    equals the table's; (T8-5) the salvage ledger's credits equal the yields of the robbed and the cleared, are never
    negative, and every shortfall is reported; (T8-6) a CITY dropped below 10 000 inhabitants loses its islands over
    their dwell spans — waning, settled, fallen — never in one epoch; (T8-7) after a −6 % population fall on a TOWN
    whose buildings are let out, no building with a surviving household reads `vacant`, and every `relet` down marks
    an unstored plan rung `stale` and re-cuts a stored plan inside its own event (item 28 (f)).
  * *Islands (items 10, 13, 15; II.6).* (T10-1) 200 CITY seeds with `recipe.layers.islands` on: a town supply below the
    threshold gives 0 islands, and the supported area is monotone non-decreasing in the town's supply and in the
    carried districts' supply over the band rows; (T13-1) TOWN and village requests never carry a sky allocation; a
    CITY with the setting off carries none, and its ground digest equals the realism golden; (T15-1) 500 CITY seeds at
    the target at each of `wealthLevel` 0.5 and 1 with the setting on: for each count 0–3 the number of seeds drawing
    it lies within ± 3 s.e. of its expectation under II.6 (4)'s slot law at each seed's own h(S_town) — with the
    defaults a count of 0 has probability 1 − 0.6 · h(S_town); on 1 000 seeds of a hook fixture whose town supply gives
    h(S_town) = 1 every count 0–3 is observed; and hiding the sky layer changes no model digest (J-A15.01).
  * *The underground (items 11, 12, 14; II.6, II.7).* (T11-1) tunnel conversions by hand undo exactly; no
    `EvolutionStrategy` plan on the hook fixture contains a tunnel `demolish` (a lint); a sealed tunnel persists at its
    address and reopens; (T12-1) a schema fixture of one underground neighbourhood — two navigable tunnels, a junction,
    six cells, one vault, one stair, two gratings — validates and passes every row of §5.3's U1–U3 family: each
    underground plot's frontage rows on exactly one navigable open tunnel run, no `way` chain and no `alley` face on
    the underground arena, every building's frontage side on its plot's frontage edge, ≥ 1 access per neighbourhood,
    every access point in public ground, a yard or — a `cellar_stair` only — a surface building
    II.7.3 admits (`undergroundAccess`, or a `secret` plot), every `grating` on public ground, 0 underground faces under an excluded ground face (also on
    B-CITY-lite with the `navigable` preset), and the underground stage's commit records holding 0 writes on the
    ground `PlatKey`; the underground reroll-isolation fixture leaves the ground byte-identical, and the cut-away or
    overlay draws one depth band at a time (§8.4); (T14-1) the TOWN
    existence draw's frequency over 1 000 seeds at three populations × three wealth levels lies within II.7.1's law
    ± 3 s.e. and never reaches 1; `Features.sewers` is true on 100 % of CITY and METROPOLIS seeds; a TOWN with `off`
    and a village request carry 0 tunnels; with the layer hidden a CITY's render matches, pixel for pixel, the render
    the same seed gave before the staged stages registered.
  * *Assignments (items 16–19; §4.7 S10b, S11; §4.11).* (T16-1) hard relation rows satisfied on 100 % of placed items;
    every unplaced item reported with its blocking rows and ≥ 1 closest option; soft-row satisfaction ≥ 95 % reported
    per city — O7 (b) extended: noxious trades downstream or extramural, water trades on water, the market hall at a
    tier-1 junction or gate, inns at gates; (T16-2) hard supply edges within their `maxDistanceM` on ≥ 90 % of items
    at generation, the rest reported; (T16-3) the one-solver contract — S10b's placement of a class and an `assign` of
    the same class from the same state give the same plots; (T16-4) the detour factor — block-raster distance against
    the way-graph Dijkstra within the factor's band on B-CITY at M1, the fallback a per-rung refit; (T17-1) a hand
    relocation keeps the use's address, the building persists vacant with its `formerUses`, and undo restores;
    (T17-2) a pinned assignment never moves under an epoch, and the use row of the churn cap holds; (T17-3) one seed
    with one circumstance timeline replays to a single digest of openings, closings and moves; (T18-1) a designation
    mutation keeps every kept part byte-identical (leaf digests) and leaves everything beyond the plot and its joined
    neighbour untouched (the locality oracle); (T18-2) locked parts are never subtracted; (T18-3) A → B → A by the
    inverse mutation is byte-identical when nothing else changed, and one change from one starting state yields one
    mutation record on every host; (T18-4) S11 run as a mutation from the empty design reproduces generation
    byte-identically; (T19-1) every roster class has a designation template with every band row (registry test);
    (T19-2) the size budget is monotone along prosperity (Spearman ≥ 0.9 over B-CITY) and continuous between adjacent
    samples by §7.8's rule on the template's continuous columns — two smiths a few streets apart differ by degree;
    (T19-3) a `setAttr` material change leaves the geometry subtree of the digest unchanged; (T19-4) with no epoch
    every building houses its template row's `households.built`.
  * *The dossier (items 20 and 22; §7.7).* (T20-1) a map delete of a dossier-backed element re-places it coherently from
    the same seed, every plot outside the disruption set byte-identical; (T20-2) by §7.7's lapse rule, the rejection lapses at
    the first epoch whose population target differs from the one it recorded and at a dossier event touching its block, and an undo of that event
    restores the hold; (T20-3) a blocked positive placement returns its blocking rows and ≥ 1 closest site;
    (T20-4) generator-added filler deleted, the dossier's housing re-provided elsewhere; (T20-5) the one-way
    door (item 20 (a)) — an enumeration of the bridge's message kinds (§11.3) finds no PLAT → host message that
    addresses the dossier (`doc.changed` carries map-document events only, `report.changed` the map's report), and over a
    B-EDIT sequence `report.changed` carries every rejection, placement, lapse, relocation and mutation record the
    sequence made (§5.4's entries); (T22-1) the same history from
    the same seed gives one digest; (T22-2) two histories reaching one dossier give two valid maps whose differences
    are confined to their disruption sets; (T22-3) an over-budget dossier event lands and is reported; (T22-4) a
    brand-new map from a dossier holds every dossier element from the start, and everything outside the report is
    byte-identical after any dossier event.
  * *Emulation (items 23, 24, 26, 27; §7.6 with §4.2, §4.9 and §4.5).* (T23-1) with the parity presets `MFCG` and
    `FTG` every `extension` cell reads 0 or off and B-REF's parity rows hold; with the default preset the extensions
    run at their table values; a registry test that every table cell has `provenance.source` and, where it extends a
    reference, its `extension` marker; (T24-1) under the defaults the principal market sits on the plaza for ≥ 90 % of
    inland walled B-CITY seeds and elsewhere for ≥ 50 % of port seeds (§13.7's row); (T24-2) the market count equals
    the roster's demand; (T24-3) no two market reservations share an edge or lie within `market.minSeparationM`;
    (T26-1) wood area lies within the fuel and timber rows' demand, the import share reported; (T26-2) the `fill`
    mode at TOWN and CITY on flat fertile fixtures and `perimeter` at METROPOLIS or on hilly fixtures; (T26-3) with
    `reserveArable` on, fertile land outside the boundary ≥ the reserve wherever the fixture makes it feasible;
    (T27-1) a schema test that the band set has one `middle`, that every band-keyed table resolves a row or an
    interpolation for every band, and that the parity preset's household shares equal FTG's captured distribution;
    (T27-2) the shanty fixture — an average band of poor gives a shanty kind once half the stages have run, the
    extramural share reported.
  * *Terrain and water (item 25; §4.11).* (T25-1) a hand `reclaim` and a hand `siltReach` are byte-identical outside their
    footprint, in the carve fixtures' form (§13.1), and undo exactly.
  * *The plan rung and elaboration (item 28; §2.6 beside §2.8's record, §2.9's cache and §4.1's policy) — the B-PLAN fixtures.* 24 fixture
    buildings (rectangles, L and T shapes, a court closed by a U, a quad from a curved row, a rectangle carrying a round tower, a
    manor of three wings at unequal storey counts), each in six classes and three bands with one to four storeys, the
    entrance sets of item 29 and a cellar wherever the class row gives one; from stage 3's landing, the plans of every clicked
    building of B-CITY-lite as well. Hard: (T28-1) each room the programme marks hard is present; soft rooms are
    delivered, folded into a neighbour or dropped, each with its tier in the report; (T28-2) starting at the main entrance,
    openings and stair cores lead to every room of every storey; each entrance gives onto a room; a passage can be
    entered from either of its ways; (T28-3) stairs stacked — a stair core occupies one bay through all the storeys it
    serves, and the basement is entered by that core or through a trapdoor the class row declares; (T28-4) the outer walls
    coincide with the wings: on each storey the rooms together cover exactly the extents of the wings reaching that level
    plus the span ring of each passage a wing spans, at the ground storey only — the passage room (§2.6's fourth rung) —,
    each exterior wall segment sits along the edge of such an extent or span ring, each room's ring is simple and lies
    within its wing's extent at its storey (the passage room within its span ring), and no gap or overlap remains between rooms (§3.10's seed-tiling row per storey); (T28-5) each chimney rises from a hearth's
    column, and a dormer exists only where a roofed room needs light; (T28-6) one building state, one plan, host after
    host (§6.5 (9) applied at the building band); re-rolling the layout preserves the stair core, the wings and the
    entrances bit for bit, and re-rolling the roles keeps every ring and every opening's position bit for bit; (T28-7) no edit or
    re-roll of a plan touches anything beyond its own building; (T28-8) `plan()` meets §12.7's row at its median per
    building, one plan for each click, and the cache stays within §12.8's line; (T28-19) the JSON `plan` block validates against its schema
    and round-trips, and every storey scene's portals equal the plan's openings and entrances (§11.1). Soft bands, reported: no unit room used as a
    passage (its door count within its row's cap); corridors never doubled in parallel; the share of each storey given
    to circulation, by class and band; room areas ordered as their rows' target areas; unit and service rooms no shallower in the door
    graph than the shared and circulation rooms of their storey; a loop in the door graph only when a row calls for one (§13.7's row). Elaboration: (T28-9) click order
    changes no digest — one document elaborated in two orders has identical model, records and derived-complete
    digests, and the cache holds byte-identical results per (entity, rung, input digest); (T28-10) a `stale` rung
    re-derived by mutation keeps every surviving room's address, and viewing never re-derives a `current` rung;
    (T28-11) an evicted cache re-derives to the same bytes, and a corrupt cache chunk is dropped and re-derived, never
    trusted; (T28-12) clicking a neighbourhood makes its buildings' `wings` rung `current`; clicking a building does
    the same for `plan`, after `wings` where that is still absent.
  * *The interior ladder (item 28 (f); §2.6).* (T28-13) the owner's bar — when a building's occupants' band falls two
    rows, the re-cut plan houses every dossier household with its own door off a corridor or stair hall, within
    unchanged wing rings and around an unmoved stair core; (T28-14) the shell stays byte-identical through any interior
    re-cut — its wings, entrances, heights, roof and basement — checked by the shell's leaf digest before and after the
    re-cut (§2.6's bar, §5.3's interior-ladder row), with §3.10's seed-tiling row proving the re-cut rooms tile that
    unchanged shell; (T28-15) re-uniting the households restores the earlier plan where nothing else changed (item 18 (e)'s
    inverse); (T28-16) a schema test that every band of the band set maps to an interior row, and that every row names
    its unit, shared, staff, circulation and size columns; (T28-17) the owner's concern — after a district's two-band
    fall every roster household is housed without a new plot, bounded by each shell's capacity (the housing clause — in
    the base on a hook fixture, the `relet`s applied by hand), and no F-PLAN tier drops a household unit, a unit
    falling to the next poorer form first (the F-PLAN clause, from stage 3's intake); (T28-18) a hand `relet` above §2.6's
    capacity returns F-EDIT (the `relet` clause), and a `setRoomUnit` that would leave a unit without its own door
    returns F-EDIT (the `setRoomUnit` clause, from stage 3's intake).
  * *Entrances and basements (item 29; §2.6).* (T29-1) each building has one main entrance and only one, facing its
    street or its court (100 %; O5 (f)'s doorless count stays 0); (T29-2) no side or rear entrance without an access
    edge beyond the frontage, and the caps per class hold; (T29-3) no cellar under the flood band or on the water
    table's damp ground; (T29-4) every basement inside its ground-floor footprint and smaller, with its storey in
    `Heights` and a stair or trapdoor at the core; the FTG entrance row of §13.5 stands for the main door; (T29-5) a VTT portal at every
    entrance of the set, and glTF and CityJSON basements below `baseCm` that validate (§11.1).
  * *Hidden plots (item 30; §4.6, §9.2).* (T30-1) every hidden plot is reachable by a chain of access edges — alley,
    court and passage faces — from a public way, 100 %; a sealed plot reads `sealed`, is reported, is never landlocked,
    and reopens; (T30-2) the hidden share per district lies within its band's target ± 0.03 (§13.7); (T30-3) no label
    of a local or secret place appears at the settlement band without the viewer's knowledge key, and no secret name
    enters an export made under a view state without it; (T30-4) the parity presets and the village rungs produce 0
    hidden plots, and a hidden court passes §8.5's figure-ground metrics, reading as a court behind buildings;
    (T30-5) by §11.2's knowledge rule, `query` (`gazetteer`, `hit`, `inView`) and hover on a document holding a
    `secret` institution list its row with `withheld: true` at the `public` tier and its name at `secret`, and by §9.5
    a withheld place gets no number, letter or row in the legend.
  * *Prosperity change (item 31; §4.11).* (T31-1) after a re-cut every plot keeps ≥ 1 access edge and the class
    minimums, and party walls agree on both sides; (T31-2) granularity lies within the band's target ± tolerance;
    (T31-3) the churn cap holds for each kind, in each district and each block; (T31-4) no occupied building is
    removed by a band change — a redevelopment first vacates — and a plot `join` or `split` that would remove an
    occupied building returns F-EDIT ('vacate first') unless the user confirms the demolition as a fate, while one that
    keeps the building through S11's mutator commits (§7.1); (T31-5) generation-then-mutation equals the same history replayed; (T31-6) an undo of a
    fusion or a split restores rings, records and `builtBand` exactly, and a resurrected member takes `builtBand` from
    the event; (T31-7) a direct `setAttr` of `builtBand` is refused; a brush sets `builtBand` in its scope, and with
    no epoch the static base's digest is unchanged; (T31-8) a schema test that every class has a replaceability and
    every ladder row a duration per direction and replaceability. The floor's bars: (T31-9) after any run of epochs
    with no rung-3 event on a plot, its frontage edges are unchanged and no shell of its buildings has shrunk or been
    re-cut toward a poorer band — every other change of its ring or its buildings' shells matched to a lifecycle event
    the epoch recorded: a neighbour's rung-3 event, rung 2's back court, a mutation or a conversion (§5.3's epoch row) —
    and its geometry band is at or above its floor; (T31-10) after a rung-3 event `builtBand` is the band of the new stock; (T31-11) a rich → poor →
    rich run with no rung-3 event leaves rings and shells byte-identical and returns the rung-1 and rung-2 attributes
    to the rich manifestation within the ladder's durations; (T31-12) with no epoch `builtBand` equals each plot's
    generation band and the geometry band equals the field band; a town and a metropolis each resolve their own middle
    band; every band set names its middle band.
=== REPLACE ### 13.3 Seed goldens with the declared-shift protocol (G-P11, G-R9), from M1 ===
### 13.3 Seed goldens with the declared-shift protocol (G-P11, G-R9), from M1

A golden suite of 12 seeds × {TOWN, CITY, METROPOLIS} × the four `WaterSetting`s {`none`, `coast`, `river`,
`coast+river`} stores, per stage, its **stage-isolated digest** (the stage's new code run on the previous output
version's frozen upstream outputs, §6.4), its entity counts, the core statistics record and one PNG per LOD and preset;
and, per shipped preset's label style, a **per-stop placement digest** (below). A release either matches or declares:

* a **shift record** for every stage whose isolated digest moved — the stage, the cause (a rule-table change, a fix, a
  new concern), the seeds and statistics that moved, the expected direction, and the output version the release creates;
* a **cascade record** for every end-to-end golden it re-signs, listing each downstream stage that moved and showing,
  from the isolated goldens, that each moved only through its inputs; a downstream stage whose isolated digest also
  moved needs its own shift record, so an unrelated regression cannot ride on an upstream shift.

An undeclared move fails CI; a declared statistic that moves against its declared direction fails CI until the record
states why; only declared stages are re-signed; stages untouched by a release stay byte-identical (O2 e). A same-seed
output change is never let ride silently (owner non-negotiable 10).

**The records are product files.** Everything the golden gate and the release-notes generator read lives inside
`plat/`, so §17.1 (3)'s path rule and the gate never collide:

```ts
// @plat/testkit — the golden store and its records; JSON with a schema, committed in plat/goldens/
type WaterSetting = 'none'|'coast'|'river'|'coast+river';   // the one spelling of a water setting: B-CITY, the golden store, every record
// a seed in a record is a Seed (u32, §2.9) written as its decimal string, e.g. "1221236157"; permalinks write it in base 36 (§6.4)
interface ShiftRecord {
  id: string; release: string /* generator version */; outputVersion: string | null /* the o<k> it creates; null for a view shift (S13b, render.stampTiles) */;
  stage: StageId | 'S13b' | 'render.stampTiles' /* view shifts: placement digests (S13b) and stamp-tile hashes (§8.10) */;
  cause: { kind: 'table'|'fix'|'concern'|'engine'|'feature'|'calibration'|'baselineShift'; ref: string /* table id@version, issue, concern id, CalibrationRun id, baseline id */; note: string };
  seeds: { seed: string; rung: Rung; water: WaterSetting; before: Hash128; after: Hash128 /* isolated stage digest, or the placement digest for S13b */ }[];
  statistics: { metric: string /* core-record field or §13.5 metric id */; rung: Rung; before: number; after: number; expected: 'up'|'down'|'none'|'any' }[];
  tiles?: { tile: string /* class, tile index (§8.10) */; before: Hash128; after: Hash128 }[] /* render.stampTiles shifts only; their seeds list is empty, the library being seed-independent */;
  d5SeedsChanged: string[] /* seeds of any D-5 panel (§13.6) whose render moved */; milestone: string; date: string; author: string }
interface CascadeRecord {
  id: string; outputVersion: string; upstream: string[] /* ShiftRecord ids that explain it */;
  downstream: { stage: StageId; before: Hash128; after: Hash128 /* end-to-end digests */; isolatedUnchanged: true /* otherwise the stage needs its own ShiftRecord */ }[];
  seeds: string[]; date: string }
interface MilestoneRecord {
  milestone: string; date: string; outputVersions: string[] /* created during the milestone */; shifts: string[]; cascades: string[];
  parity: string /* plat/goldens/parity/<milestone>.json — the ParityReport the exit is judged on, §13.5 */;
  d5: { status: D5Status; record: string /* plat/goldens/d5/<milestone>/record.json, §13.6 */ } | null;
  knownDefects: { opened: string[]; closed: string[] }; exitCriteria: { id: string; result: 'pass'|'fail'|'fallback-applied'; evidence: string }[] }
```

* `plat/goldens/store/o<k>/` holds, per seed and stage, the frozen upstream outputs and the digests, counts, statistics
  and placement digests; PNGs are stored content-addressed in `plat/goldens/png/` (large-file storage) and referenced by
  hash.
* `plat/goldens/shifts/o<k>.json` holds the shift and cascade records that created output version o<k>;
  `plat/goldens/shifts/view/<release>.json` holds a release's view shifts (S13b and `render.stampTiles`).
* `plat/goldens/milestones/<milestone>.json` is each milestone's exit record.
* The golden CLI refuses a record with a missing field; the release-notes generator of `@plat/docs` reads only these
  files and `plat/docs/known-defects.json`.
* `docs/validation/shifts/<milestone>.md` and `docs/validation/d5/<milestone>.md` are **research-side copies** generated
  from these files by `research/baselines/mirror_records.py` (research may read the product; the product never reads
  research); no CI job reads them, and a hand edit there changes nothing.

**Placement digests (§9.1's cross-engine promise).** For every golden town, every shipped preset's label style and
each of B-ZOOM's 27 zoom stops, S13b places the band's area and way labels at the `public` knowledge tier with no places
(§9.2) — and, for one golden CITY, also at `secret` — for all candidates and the addresses and
repeated street names of the default view's visible tiles (§9.2's scope); the placement digest hashes, per candidate in
id order, the label id, the chosen alternate (or *yielded*), the ladder rung, the size and every glyph's position and
angle as exact IEEE doubles. Equal code on equal inputs gives equal bits on every engine because placement and the
renderer code that feeds it are held to §6.5 (3)'s allowlist lint; the rest of `@plat/render` (paint programs,
backends, compositing) produces pixels, compared by visual regression (§13.4), not by bit identity. The PR tier
compares the digests on Node x86 against the store; the nightly tier compares them on all five engines with workers on
and off; a digest that differs between engines is a determinism defect and fails the nightly run. A digest that moves
while every model digest holds is a **view shift**: it needs a `ShiftRecord` with stage `S13b` and
`outputVersion: null`, bumps no output version (placement is view data, §9.1) and bumps the style version of every
shipped sheet whose placements moved, because the style version is the axis that carries pixel identity (§6.4). The
stamp-tile asset's stored hashes (§8.10) are kept with the placement digests; a release whose asset moves a stored hash
while every model digest holds is a view shift of the same kind — stage `render.stampTiles`, `outputVersion: null`,
bumping the style version of every shipped sheet that draws stamped classes; an asset that only adds a new class's
tiles moves no stored hash and needs no record.

**From M1.** The output-version stamp, the shift, cascade and milestone records and the stage-isolated golden tooling
are built at M1, not at hardening (§16). Every milestone from M1 on writes its `MilestoneRecord` — each output version
created, its shift records, the D-5 panel seeds that changed — and a milestone cannot exit with an undeclared shift.
**Preview links:** until M4's exit fixes output version 1, every permalink and document made by the app carries §6.4's
preview flag, and the app shows the preview notice — "preview: made with output version oN; a later release may draw
this seed differently and will say so"; the link carries its `o=` (§6.4). Retention of output versions
N−1 and N−2 (§6.4) is built and its replay test passes at M3a; from then on a link inside the window replays exactly
and one outside it opens with §6.4's notice.

A nightly cross-platform golden run (Node x86 / arm64, Chromium, Firefox, WebKit; workers on and off; pool sizes 0 and
3, the contract tests of §13.2 covering 0–3) is the reproducibility proof: identical model digests per stage, identical
derived-complete digests and identical placement digests on every engine; and, from M3a (the GeoJSON exporter's
milestone), the strict GeoJSON of one golden CITY seed (`coast+river`) with its trees — §8.10's integer-centimetre
instance positions with their species, crown diameters and leaf types — byte-identical on every engine, workers on and
off (§11.1).
=== REPLACE ### 13.5 Reference-parity metrics (B-REF), read from one numbers-only baseline file ===
### 13.5 Reference-parity metrics (B-REF), read from one numbers-only baseline file

The `parity` CLI in `@plat/testkit` reads **only** `baselines.json` — our own measurements of the references, numbers
only, generated research-side by scripts under `research/baselines/` from the captures and committed into
`plat/packages/testkit/baselines/` (§17.1 (4)) — and our B-CITY outputs, and reports every metric against its band. It
never opens `captures/`, `research/` or `reference/`.

```ts
interface Baseline {
  id: string; metric: string; unit: string;
  reference: 'MFCG' | 'FTG' | 'NG' | 'VG' | `corpus:${string}`;       // corpus rows arrive through §13.9
  referenceBuild: string;            // itch build, FTG server date + create-request hash, NG / VG build — required
  capture: string; script: string; date: string;                       // provenance: capture folder, research-side script, run date
  matched?: { rung: Rung; mfcgSize?: number; ftgSize?: 'BIG_TOWN' | 'BIG_CITY' | 'CITY' | 'METROPOLIS'; population?: number };
  role: 'target' | 'weakness' | 'descriptive';                        // what the reference number means for us
  values: { p10?: number; p50?: number; p90?: number; n: number; seeds: number } | { bins: number[]; histogram: number[]; n: number; seeds: number };
}
interface ParityReport {                 // written by the parity CLI per run; read by milestone exits, §13.9's CalibrationRun and the release notes
  runId: string; date: string; outputVersion: string; generatorVersion: string; baselines: Hash128 /* hash of the baselines.json it read */;
  rows: { metric: string; baselineIds: string[]; role: Baseline['role']; rung: Rung; preset?: string;
    band: { lo?: number; hi?: number; ksMax?: number; direction?: 'above'|'below'; margin?: number };
    ours: { p10?: number; p50?: number; p90?: number; ks?: number; n: number; seeds: number };
    verdict: 'pass'|'fail'|'reported' /* descriptive rows are always 'reported' */; note?: string }[];
  summary: { pass: number; fail: number; reported: number } }
```

Each milestone's parity report is stored as `plat/goldens/parity/<milestone>.json` and named in its `MilestoneRecord`
(§13.3). The CLI refuses a row without `referenceBuild`, `capture`, `script` or `date`. A new reference build never
overwrites a row: it adds a row (the id gains the build) and is a **declared baseline shift** in the milestone's shift
record, so a silently drifting reference build (VG changed geometry for the same seed between builds 19251041 and
19365073) can never move a gate unnoticed. Rows hold numbers, units and provenance only — no names, colours, grammars
or code.

**The band rule.** *Target* rows pass when ours lies in [p10 × 0.9, p90 × 1.1] of the reference's seed spread (a
single-value baseline: ± 15 %), and distributions when our KS distance to the reference is ≤ 1.25 × the reference's own
seed-to-seed KS distance at p90. *Weakness* rows are one-sided: ours must beat the reference in the declared direction
by the stated margin. *Descriptive* rows are reported beside ours and gate nothing. The bands below are this rule
applied to today's baselines; when M-1 re-measures a baseline (five seeds per matched MFCG size, FTG's new captures),
the band is recomputed by the same rule with provenance "M-1 ⟨date⟩", and a recomputation that turns a passing gate
into a failing one is declared in the shift record. Thresholds no reference can set are §13.7's. **The ⟨M-1⟩ rule:** a
reference number marked **⟨M-1⟩** is measured by M-1 (§16 lists every such measurement); if M-1 cannot measure it — the
capture lacks the feature, or the measurement is not reproducible across seeds — that cell becomes *descriptive*,
gates nothing, and enters `known-defects.json` with the reason; the parity CLI reports an ⟨M-1⟩ cell without its
baseline row as *fail*, never as *pass*.

**Matched sizes** (§12.2, §13.6): TOWN ↔ MFCG size 40 and FTG BIG_TOWN; CITY ↔ MFCG size 80 and FTG BIG_CITY;
METROPOLIS ↔ MFCG size 130 (FTG per D-31). MFCG numbers come from its plain-option size sweep (walls, citadel, plaza and
temple on; shanty town, parks, river and coast off; its JSON export is in metres, the internal unit 4.00 m). **Curves**
are measured after both sides are resampled at a 10 m arc-length step, so neither FTG's 25–40 m placement steps nor
PLAT's smoothed vertex spacing enters a number.

| metric | our measure | reference baseline and its role | band | class |
|---|---|---|---|---|
| street turning | turning per 100 m; heading change per 50 m (10 m resampling) | FTG: zero mass above 15° per step and a flat heading spectrum (`_critic-ftg.md` §4 rows 7–9) — **weakness**; FTG's median turning per 100 m after 10 m resampling, on its payloads ⟨M-1⟩ — **target for organic presets**, with this row's own band | weakness clauses: no cliff (no empty bin above 15° while the bin below it holds > 1 %) and heading entropy ≥ FTG's; target clause: organic presets' median turning per 100 m within 0.5–1.5 × FTG's — a declared exception to the band rule, because FTG's per-seed spread over at most eight payloads is too narrow to stand for its generator's variation. *Fallback:* `headingSigma` (a table value, §4.4) is set so the organic median equals FTG's and the growth-drift row re-runs; if drift then fails, `headingSigma` returns to its default, the target clause enters `known-defects.json` as not met, and the row gates on its weakness clauses | P |
| growth drift | net turn of grown streets over 600 m (organic regimes) | — (our heading model, §4.4) | p50 15–30°; > 90° on ≤ 1 % | C |
| junction arm angles and degrees | every L1 junction | NG 361 / 361 T — **target** for organic presets; FTG median 90.02°, 58 % in 80–100°, 36.4 % 4-way in its Medieval city — **weakness** for organic presets, **target** for `ringed` and `american` | median 85–95°; p5 ≥ 30°; 4-way share organic 0–15 %, `ringed` 20–45 %, `american` 40–80 % | P |
| street runs by class | junction-to-junction run lengths per class (never edge lengths) | FTG main L + 0.5, district (L + 0.5) / 2, suburb 30.00 m, lot outlines 14.70 m (roadlength100 README) — **target** for the extramural ribbon and suburb regimes, descriptive inside the walls | class medians by the band rule (extramural, suburb) | P |
| MFCG street signature | lot-orientation coherence R4 within 60 / 120 / 250 m; lot alignment with the wall by distance band; T / Y share; intramural dead ends; blocks per ha; lots per block | MFCG R4 0.84–0.97 / 0.58–0.88 / 0.32–0.68; within 40 m of the wall median deviation 3.5–4.5° and 84–92 % within 15°, 56–70 % at 40–100 m, 38–58 % at 100–200 m (redteam-mfcg MFP-2, from the exports); T / Y share, intramural dead ends, blocks per ha and lots per block from the sweep ⟨M-1⟩ — **target** inside the walls | the band rule, walled districts | P |
| blocks | L2 built-block areas per district | NG block counts per template at `medium` (vertex captures) ⟨M-1⟩ — **target** on the same face shapes; FTG block-lot median 441 m² in every class — **weakness** (no gradient) | KS by the band rule; inside the NG band on the same face shapes (O4 f) | P |
| deep block interiors | court share of deep blocks per band | NG hollow-block frequency (vertex captures) ⟨M-1⟩; MFCG inner-lot removal (sweep) ⟨M-1⟩ — **target** | the band rule per class (§4.6) | P |
| bent-cut signature | infill and lot cuts | NG: start at N(0.5, σ) of the OBB major axis with σ 0.066 (plain faces) and 0.098 (ring faces); one bend at mid-course in 380 / 519; ≥ 85° arrival in 96 %; 53 % filleted (BG-1 / BG-2 / PF-3; manager note 3) — **target** | σ within ± 0.02; corner within 0.10 of mid-course ≥ 80 %; arrivals ≥ 85° ≥ 95 % | P |
| figure-ground and streetwall (plot texture) | city-band street-edge recoverability; gross footprint cover inside the walls; streetwall continuity on dense frontages | MFCG recoverability on its matched plain sweep renders ⟨M-1⟩ — **target**; MFCG gross cover inside the walls 0.60–0.64 at sizes 40–130 — **descriptive, direction declared**: ours lower because yards exist; MFCG streetwall continuity on the same frontage classes ⟨M-1⟩ — **target** | recoverability ≥ MFCG − 0.03; cover reported (expected below 0.60); streetwall ≥ MFCG's on dense frontages | O |
| plots and footprints | L3 plot areas; L4 footprint areas and sides | FTG footprint median 103 m², p95 154 m², quad side 10.3 m, worst-corner p95 22.9° — **target** for ordinary houses; MFCG footprints (median 225–289 m² at sizes 40–250 in metres) are **lots drawn as buildings — descriptive, never a house-size anchor** | ordinary houses median 60–160 m², p95 < 400 m²; a sheared minority kept | P |
| entrance rule | L4 | FTG: on the outline, 2.99 m from the road; 53 % of buildings with a vertex ≤ 2 m from a road — **target** | 100 % on the access edge, 2–4 m | P |
| party walls and attachment | row classes | NG 39–43 % of perimeter, 95–99 % attached — **target** for dense / poor; FTG residences 0–5 %, industry 96–98 % — descriptive | attached ≥ 90 % in dense / poor; party-wall share by the band rule per class | P |
| plot-area gradient | Spearman(prosperity, plot area); Moran's I; within-district plot-area CV | FTG 441 m² in every class; NG Moran's I −0.04 … +0.03 — **weakness** | ≥ 0.8 and > 0 (both follow from the rules: C); within-district CV ≥ 0.25 (§13.7: O) | C / O |
| alleys | alley length per ha by prosperity | FTG 0 alley length at every decile — **weakness** | Spearman ≤ −0.7 | C |
| vacancy runs | share of frontage length in vacancy runs, per band | — (our rule; VG's partly ringed blocks are the motive) | within ± 0.02 of the granularity table's share per band | C |
| quays and substitution | quays reachable from the network; blocks left as substitution residue (F-CUT tier 5) | — | quays reachable 100 %; substitution residue ≤ 5 % of blocks | C |
| walled share and ribbons | buildings inside the outermost wall; extramural buildings within 100 m of an arterial | MFCG 0.87–0.92 at sizes 40–250; 71–85 % (sweep) — **target** | the band rule | P |
| MFCG anchors | district areas; wall vertex spacing; castle area and compactness; plaza area; city-zoom quarter labels | MFCG district areas 2.4–17.6 ha at size 40 and median 29 ha at size 80; wall vertex spacing p50 88 m at size 40; castle 0.5–3.2 ha (8.7 at size 130); plaza 0.32–0.58 ha; 9 / 12 / 18 districts at sizes 40 / 80 / 130 (sweep) — **target** | the band rule; castle in band on ≥ 99 % of seeds | P |
| outline anisotropy | land-sector r90 CV; road / non-road r90 ratio | FTG 0.20–0.33 and 1.26–1.65 (both CITY payloads) — **target** for organic presets | the band rule; monotone in the anisotropy row | P |
| block-level use mix | residential-only block share; per-block use-mix entropy; trade households at their workplace | MFCG's "venue mix with residents, no residential wards" — descriptive | §13.7's bands | O |
| towers and gates | S7 | FTG 39 m median spacing, 17 / 17 towers on ring vertices — **target**; FTG 6 and 2 ungated crossings — **weakness**; MFCG 5 / 8 / 12 gates at sizes 40 / 80 / 130, `gates = N` exact — **target** | spacing by the band rule; ungated crossings 0; main gates = N exact; roads leaving each walled stage = its N main gates, plus a harbour gate of §4.2 S3 (7) where one was placed | P |
| water | L0 | FTG 50 m resampling, rivers ≈ 31 m mean at CITY — **target**; MFCG `riverWidth` in metres (142 m at size 200 with river and coast) — descriptive | outline step ≤ 25 m; width band by class | P |
| tree scatter | §8.10's stamped instances, in the bench | FTG nearest-neighbour median 9.7 m, minimum 0.14 m (not Poisson) — **weakness**; MFCG / NG Bridson k = 50 with a 140-point tile — **target** for the sampler | NN p1 ≥ §13.7's canopy threshold; pair-correlation per class reported | O |
| population and buildings | totals | MFCG ≈ 6.12 persons per building (a multiplier) — **weakness**; FTG 3.4 — descriptive | requested population within ± 5 % on ≥ 95 % of seeds; the ratio reported | C |
| generation time | model p95 and time to first map per rung (§12) | MFCG app timings 57 / 131 / 156 ms at sizes 40 / 80 / 130 — descriptive, with the measured ratios and §12.9's declared trade; FTG CITY: server 2.9–3.2 s, scene 6.4–7.0 s after the click, load 2.0 s busy — **weakness**; NG hood 10–96 ms — **target** for opening a district | §12.3 / §12.5 budgets; model ≤ 2.5 × MFCG at TOWN and CITY and ≤ 5.5 × at METROPOLIS (the ratios at MFCG's matched building counts are §12.9's); first map ≥ 10 × sooner than FTG at FTG's timed CITY preset (9 500 people, 2 798 buildings: PLAT's TOWN law ≈ 0.24 s against 6.4–7.0 s), and at BIG_TOWN and BIG_CITY from M-1's captures | P |
| MFCG-worst configurations | wall-clock p95 per delivered town, ladder costs included: METROPOLIS with river, coast, walls and castle | MFCG size 80 with river and coast: 10 attempts for 3 cities, 3.7–4.0 s (IMPROVEMENTS O1); 24 restarts in 58 attempts — **weakness** | ≤ 1.0 s per delivered town | O |
| requested-feature delivery | the report's delivery tier per requested feature | MFCG: a requested river fails 7 of 10 attempts at size 80; VG: 4 of 13 highway maps discarded — **weakness** | tier-6 omissions of requested features 0; degraded (tiers 4–5) ≤ 5 % (§13.7) | O |
| ladder use | the report | — | tier ≥ 2 on ≤ 2 % of transactions per stage; p99 ≤ 3 attempts | C |
| draw style | the display list and renders against the draw records | MFCG: casing = core + 2h on 7 / 7 maps, round joins 4 062 / 4 063, 17-step order; wall, tower and road-core widths 6.2 / 12.4 / 6.5 px at size 40's scale — **target** (`ink`); NG square caps, ≈ 17.4 hatch triangles and 2.33 shadow quads per wing — **target** (`hatched`); NG roof dark / light ratios 0.787 / 0.802 / 0.834 and VG water bands 5.196 : 2.828 : 1 — **descriptive** (they are their palettes' values; the laws are tested on ours, §8.3) | `ink`: casing law on 100 % of ribbons, round joins ≥ 99.9 %, order parity as §8.3 defines it, widths ± 15 %, outline share ≤ 25 %; `hatched`: 15–20 triangles per wing, no ridge stroke, outline = footprint; the roof law on our palette within ± 0.02 and our bands W · (i / N)^1.5 within 1e-4 | P |
| labels | protected overlaps; inside-area share; curvature; holes; count | MFCG: gates and the keep covered, walls straddled — **weakness**; MFCG district counts (the anchors row) — **target** | 0 / ≥ 99 % / within §13.7's curvature limit / 0 labels crossing holes / the anchors row | O |
| between-seed variety | dispersion of the §7.7 signature vector (radial share of arterials, orthogonality index, street-density profile, block-area CV, enclosed share, outline anisotropy) over 100 seeds per rung and water setting: mean pairwise distance of vectors standardised by the rung's pooled deviations | MFCG over its plain sweep seeds at the matched size ⟨M-1⟩; FTG over every payload at the matched size ⟨M-1⟩ — **target as a floor** | ours ≥ the larger reference dispersion at the matched rung | O |

**Rows added by amendments b (items 24, 27, 29 and 30).** They join the table above under the same band rule; the
parity presets `MFCG` and `FTG` (§7.6) add one B-REF run per preset to the nightly report, on which every row above
must hold with our extensions switched off (§13.2 T23-1).

| metric | our measure | reference baseline and its role | band | class |
|---|---|---|---|---|
| markets | secondary-market frequency per matched size; market reservations sharing an edge; the market count against the roster | MFCG's secondary-plaza frequency and non-adjacency on the plain size sweep ⟨M-1⟩ — **target**; FTG's two market squares in the captured city — descriptive | frequency by the band rule; adjacent markets 0 | P |
| wealth bands | built-land share per band group; households per lifestyle tier under the parity preset | FTG's six-tier lifestyle distribution (its captures ⟨M-1⟩) — **descriptive**; MFCG's ward-class shares, taken from the ward deck of its open-source model of 2017 (§4.5's receipt; the live MFCG types no ward by class, §1.4) — a note with no `baselines.json` row (the default band set reproduces both, §4.5; the parity preset equals them by construction, T27-1) | reported | P |
| entrances and basements | the main entrance's edge and distance (the entrance row above stands); side, rear and yard doors per class; the basement share by class and storeys | MFCG and FTG give one entrance to each building — the **target** above for the main door; Dwellings' one entrance, its absent back door and its basement share have no `baselines.json` row and are a descriptive note only, never a gate | the entrance row's band; the rest reported | P |
| hidden plots | the hidden and rear-plot share per band | MFCG and FTG give every building a street — 0 hidden share — **target for the parity presets**; the default preset's share is §13.7's threshold | parity presets 0; default within its target ± 0.03 | C |
=== REPLACE ### 13.6 The owner's side-by-side protocol (D-5) ===
### 13.6 The owner's side-by-side protocol (D-5)

"Mastered" means the owner's eye on side-by-sides against MFCG and FTG at town, city and metropolis, plus the measured
parity numbers (D-5). This protocol makes the eye a recorded, repeatable judgement that cannot be steered by choosing
flattering seeds, and it never lets a milestone claim the eye's verdict without the eye.

1. **When.** At M1 (diagnostic: the base is not yet complete, so the result is recorded and does not gate; the panel
   covers all three rungs, because METROPOLIS generates from M1), at M2b (gates "the base at parity"), at M4 (gates
   "mastered") and at M5 against NG (gates stage 2, and replaces S2's blind preference test with n ≥ 20 raters, which
   the program has no pool for).
2. **Seeds fixed before rendering.** Every pair's seeds come from a formula and are committed before any render; no
   seed is replaced after it is rendered, and every list is reproducible from its formula. **`H32(s)`** is the first
   32-bit output word (h1) of MurmurHash3's x86 128-bit variant — the published public-domain algorithm §6.2's H128
   already implements — run over the UTF-8 bytes of `s` with seed 0; its implementation passes the algorithm's published
   verification value (SMHasher's procedure gives 0xB3ECE62A). The result is a u32, so it is a `Seed` (§2.9), written in
   records as its decimal string. The product CLI (`plat d5 seeds ⟨milestone⟩`) writes the milestone's pair list — one
   `D5Pair` per pair, (9) — to `plat/goldens/d5/⟨milestone⟩/seeds.json`, committed before any render. Besides the
   formulas below it reads only the two numbers-only files the research-side panel script commits beside it —
   `ftg-captures.json` (M1, M2b, M4) and `ng-counts.json` (M5) — and never `captures/` (§17.1 (3), (4)). ⟨milestone⟩ is
   the id its `MilestoneRecord` carries (`M1`, `M2b`, `M4`, `M5`), ⟨rung⟩ the `Rung` (`TOWN`, `CITY`, `METROPOLIS`),
   ⟨water⟩ the `WaterSetting` (§13.3), ⟨i⟩ and ⟨k⟩ decimal integers.
   * **Against MFCG** (M1, M2b, M4). Five pairs per rung and per water setting (`none`; `coast+river`), ten per rung.
     PLAT's seed is `H32("d5/⟨milestone⟩/⟨rung⟩/⟨water⟩/⟨i⟩")`, i = 0 … 4; check vectors: `H32("d5/M1/TOWN/none/0")` =
     1221236157 and `H32("d5/M1/TOWN/coast+river/4")` = 3998735106 (`docs/validation/bench/fixall_scope_r3_h32.out`).
     MFCG's seed comes from the same formula with the prefix `d5-mfcg/`, reduced as 1 + (H32 mod 2 147 483 646) into
     1 … 2³¹ − 2, the state range of MFCG's Park–Miller stream (`research/findings/profile-mfcg.md`), by the
     research-side panel script (check vector: `d5-mfcg/M1/TOWN/none/0` → 1965791931); MFCG draws `none` with its plain
     options and `coast+river` with its river and coast on.
   * **Against FTG** (M1, M2b, M4; TOWN and CITY, METROPOLIS per D-31). FTG cannot be seeded — its server draws its own
     seed — so a milestone has **one pair per FTG capture** at the rung's matched size (BIG_TOWN for TOWN, BIG_CITY for
     CITY), each capture used once, in capture order: three pairs per rung. M-1 takes each size's three captures with
     FTG's water options nearest to `none` (one capture) and to `coast+river` (two), and records each capture's id — its
     folder name under `captures/ftg/` — its `WaterSetting` and its **recorded population**, the number of residents its
     decoded payload holds, in the capture README (§16). At each of these milestones the research-side panel script
     writes `plat/goldens/d5/⟨milestone⟩/ftg-captures.json` — one `FtgCapture` per capture, in capture order, ids and
     numbers only, (9) — and commits it like `baselines.json` (§17.1 (4)) before `plat d5 seeds` runs. The pair's PLAT
     side is generated at the capture's recorded population and its `WaterSetting`, both read from that file, with seed
     `H32("d5-ftg/⟨milestone⟩/⟨rung⟩/⟨capture id⟩")`, so every milestone pairs the same captures, at the same
     populations, with PLAT seeds of its own. **Pre-decided fallback:** a capture whose payload yields no resident count
     takes its size's nominal target (BIG_TOWN 5 600, BIG_CITY 24 500), marked `populationSource: 'nominal'` and reported
     with the panel; a population outside the rung's band (§1.1) is clamped into the band and the clamp reported. The
     capture file and the seed list are committed before any PLAT render.
   * **Against NG** (M5). NG can be seeded — its MINSTD stream (`docs/CONFIDENCE.md` NG A2) — so the panel has five pairs
     per NG template, for all four templates PLAT registers as fabrics — `area`, `street`, `square` and `ring` (II.2) —
     twenty pairs. NG's seed is `H32("d5-ng/M5/⟨template⟩/⟨i⟩")`, i = 0 … 4, reduced as 1 + (H32 mod 2 147 483 646)
     into MINSTD's state range 1 … 2³¹ − 2 (check vectors: `d5-ng/M5/area/0` → 1819777585, `d5-ng/M5/ring/4` →
     951122398; `docs/validation/bench/fixall_scope_r4_h32.out`), generated at NG's `medium` size — the size of NG's
     vertex captures and of §13.5's NG baselines — by the research-side panel script, which also counts each hood's
     buildings; the counts reach the product as numbers only, in `plat/goldens/d5/M5/ng-counts.json`, committed like
     `baselines.json` (§17.1 (4)). PLAT's side of pair (template, i) is one district of a PLAT town opened at
     neighbourhood LOD with the template's fabric: **for `area`, the district's own `bent-cut` fabric (the base's, II.2)
     opened as a `refine` close-up — no `setAttr`, its building count the city-LOD count (II.1, II.4); for `street`,
     `square` and `ring`, `setAttr(district.fabric, template)`, a `replace` close-up** (II.4), in the template's default
     form — for `square`, `SquareFabric`'s `void` mode, NG's own square (II.2). The district is found by a committed
     search: town k (k = 0, 1, …, 31) is generated with seed `H32("d5/M5/⟨template⟩/⟨i⟩/⟨k⟩")` (check vector:
     `H32("d5/M5/area/0/0")` = 3881605733), water `none` and population ⌊min(50 000 × 1.25^⌊k / 4⌋, 120 000)⌋ — four
     towns at each METROPOLIS size from the target up (50 000, 62 500, 78 125, 97 656) and the rest at the cap, because a
     district's mean building count grows with the town's size under §4.5's count law; in each town the district whose
     city-LOD building count is nearest the NG hood's (ties to the smaller address id) is opened with the template, and
     the first whose opened building count lies within ± 20 % of the NG hood's is the pair's. k, the district's address
     and both counts are committed with the seeds. *Measurement (M5):* the search's k and each pair's count ratio are
     reported with the panel. **Pre-decided fallback:** a pair with no district within ± 20 % after k = 31 takes, of the
     32 opened districts, the one nearest in count, and is marked `sizeMismatch` in the record; the ratio is printed on
     the sealed key and reported beside the verdict, and the pair is rated like any other.
3. **Matched pairs.** Each MFCG and FTG pair shows PLAT and one reference at the same rung, the same ground scale
   (metres per pixel) and the same frame. Against MFCG, PLAT's population is set so that its building count matches
   MFCG's at the matched size (sizes 40 / 80 / 130; §12.2's rate); against FTG, PLAT is generated at the capture's
   recorded population and water setting from `ftg-captures.json` ((2); METROPOLIS per D-31). Against NG, each side
   fills the same frame with its hood or district: NG's view rescales its hood to the frame (`docs/CONFIDENCE.md` NG
   C8), so the two sides' size is matched by the building count of (2), not by metres per pixel. PLAT draws `ink`
   against MFCG's default style, `lit` against FTG's default from M2b (`ink` at M1) and `hatched` against NG's (M5).
   Against FTG, the pair of each rung's first capture shows the extramural suburb at FTG's overview framing, both sides
   framed alike; the other two pairs use the matched frame. PLAT's side of an MFCG pair runs the `MFCG` parity
   preset and of an FTG pair the `FTG` parity preset (§7.6) — the panel judges the emulation the default builds on,
   its extensions off; an NG pair (M5) runs the default preset, NG having no parity preset; the threshold panel's
   strips (8) run the default preset (J-A23.02).
4. **Blind order.** Generator-identifying furniture is removed from both sides (titles, legends, compasses, interface
   chrome) and the blind pairs are rendered without labels; labels are judged in a separate, non-blind pass. Left or
   right is a seeded coin per pair and the pair order is shuffled; the key is sealed — only its hash is committed — and
   opened after the answers.
5. **The rubric** — three questions per pair, each answered *left*, *right* or *same*, with an optional one-line note:
   (1) *Legibility:* which lets you read the town — its streets, walls and quarters — more easily at this size?
   (2) *Realism:* which looks more like a real medieval town? (3) *Charm:* which would you rather use for a game or a
   story?
6. **Pass rule.** For each reference and each question, PLAT is judged better or the same on at least two thirds
   (⌈2n / 3⌉ of n) of that reference's pairs, counted per group — against MFCG over the milestone's MFCG pairs (20 of 30
   when all three rungs are rated), against FTG per rung (2 of 3 per rung and question), against NG over its twenty
   pairs (14 of 20) — and in no rung (MFCG) or template (NG) is PLAT judged worse on every pair of that rung or
   template. A gating milestone whose rated run fails a question does not exit until a re-run passes or the owner
   accepts the failure in the record; the failing question and the owner's notes enter `known-defects.json`.
7. **The rater, and one rule for an unrated panel.** The owner is the declared rater; no seat rates on the owner's
   behalf. If the owner has not rated within seven days of the panel being ready, the build continues on the milestone's
   measured numbers and the milestone's D-5 status is recorded **provisional — not rated** in its `D5Record` and its
   `MilestoneRecord` (§13.3). A provisional status never claims what the panel gates: M2b's "the base at parity", M4's
   "mastered" and M5's stage-2 gate are claimed only by a rated pass or by an owner acceptance recorded in the
   `D5Record`. The same panel — the same seeds, re-rendered under the current output version — is offered again at
   every later milestone and, after M5, with every release, until it is rated; a later rated pass turns the status into
   *passed* with its date, and a later rated failure follows (6). The release notes state every provisional status
   (§14 `@plat/docs`); §16 applies this rule at each gating exit.
8. **The threshold panel and the `house` pick.** At the same sitting the owner sees the strips of §13.7 (renders of one
   seed at a threshold's number and one step either side) and picks one or answers *same*; the pick becomes the
   threshold with provenance "owner-eye ⟨milestone⟩". From M4 on, the sitting also shows the three candidate `house`
   sheets drafted at M3b (D-1) on the milestone's seeds. **Pre-decided outcome if no `house` pick is recorded by M4's
   exit:** candidate 1 — the first sheet in the M3b draft order — ships as `house`, selectable and never the default;
   `ink` stays the default; the pick is offered again at every later sitting, and a later pick replaces `house`'s sheet
   as a style-version change (pixels only; no model digest moves).
9. **Record and clean room.** The panel is assembled research-side (`research/d5/`) from PNG exports that the product's
   CLI writes and from the reference images in `captures/`; the product repository never reads the captures (§17.1).
   The machine-readable record lives in the product, committed by the seat that ran the sitting, like `baselines.json`
   (§17.1 (4)) — numbers, hashes and answers only, no reference image or reference data:

   ```ts
   type D5Status = 'diagnostic' /* M1 */ | 'passed' | 'failed' | 'accepted' /* a failure or an unrated panel accepted by the owner in writing */ | 'provisional-not-rated';
   type D5Pair =                           // one per pair, in seeds.json and the record, in the order (2) lists them
     | { reference: 'MFCG'; rung: Rung; water: Extract<WaterSetting, 'none'|'coast+river'>; i: number; platSeed: string; refSeed: string /* 1 … 2³¹ − 2 */ }
     | { reference: 'FTG'; rung: Extract<Rung, 'TOWN'|'CITY'>; capture: string /* its folder name under captures/ftg/ */; water: WaterSetting;
         population: number /* PLAT's requested population: its FtgCapture's, from ftg-captures.json (2), (3) */; populationSource: 'recorded'|'nominal';
         platSeed: string; suburbFrame: boolean /* the rung's first capture, (3) */ }
     | { reference: 'NG'; template: 'area'|'street'|'square'|'ring' /* NG's names; PLAT's side: area = the district's own bent-cut fabric as a refine close-up, the others setAttr(district.fabric, template) as a replace close-up, (2) */;
         i: number; refSeed: string /* 1 … 2³¹ − 2 */; k: number /* the town of (2)'s search */;
         platSeed: string; population: number; district: string /* address id */; buildings: { ref: number; plat: number }; sizeMismatch: boolean };
   type FtgCapture = { capture: string; rung: Extract<Rung, 'TOWN'|'CITY'>; water: WaterSetting;   // plat/goldens/d5/<milestone>/ftg-captures.json: FtgCapture[], capture order (2)
     population: number /* the residents its decoded payload holds, or the size's nominal target */; populationSource: 'recorded'|'nominal' };   // research-side, numbers and ids only
   interface D5Record {                    // plat/goldens/d5/<milestone>/record.json
     milestone: string; status: D5Status; date: string; offeredAgainAt: string[] /* later milestones and releases */;
     pairs: D5Pair[] /* every seed a Seed as its decimal string */;
     platImages: Hash128[] /* PNG hashes of PLAT's side, in pair order */; key: { commitment: Hash128; revealed?: string };
     answers: { pair: number /* index into pairs */; question: 'legibility'|'realism'|'charm'; answer: 'left'|'right'|'same'; note?: string }[];
     verdicts: { reference: 'MFCG'|'FTG'|'NG'; question: 'legibility'|'realism'|'charm'; group: 'all' | Rung /* FTG: per rung, (6) */;
       betterOrSame: number; pairs: number; needed: number /* ⌈2n / 3⌉ */; worseOnEveryPairInARungOrTemplate: boolean; pass: boolean }[];
     thresholdPicks: { letter: string; picked: number | 'same' }[]; houseSheet?: string; acceptance?: { by: 'owner'; text: string; date: string } }
   ```

   The research-side `docs/validation/d5/⟨milestone⟩.md` — the human-readable record with the reference images'
   hashes — is generated from this file (§13.3); no CI job reads it.
=== REPLACE ### 13.7 Thresholds without a reference source (IMP-6, DEF-1; D-30) ===
### 13.7 Thresholds without a reference source (IMP-6, DEF-1; D-30)

Every threshold is in one of two classes and there is no third. **Reference-settable** bands are §13.5's, set by its band
rule from `baselines.json`. **Thresholds no reference can set** — the properties the references lack, which is where the
base claims to improve — are listed here: each has a number now (provenance "architecture 2026-09-25"), is confirmed at
the first milestone at which its mechanism runs, and has a pre-decided fallback. The corpus phase may later re-sign any
of them as a declared shift (§13.9).

**J-T, the calibration rule every table row and threshold cites.** Every value has a number now and a provenance
(§17.1 (6)); a reference-settable value is set from `baselines.json` by §13.5's band rule; any value may later be
re-signed only by a declared shift — an M-1 re-measurement, an owner pick on the panel of §13.6 (8), a calibration run
(§13.9); and no acceptance run treats an unset value as passed — a table with an empty cell fails to load. §4.7's
granularity table, §4.9's greenery table and this section cite it as "J-T".

**Fallbacks that move a threshold.** A fallback may change a *mechanism* (a table value, a weight, a radius) and
re-measure against the same threshold. A fallback that instead moves the *threshold* to a measured value makes the
letter pass by construction, so it is marked **not achieved**: the letter and the measured value are entered in
`known-defects.json`, reported in the parity report and the release notes, and never cited as evidence that an
improvement was achieved (§15.2's O class). The rows below say which fallbacks do this. An owner pick on the threshold
panel (§13.6 (8)) is not a fallback: it is the owner setting the number, with provenance "owner-eye ⟨milestone⟩".

| letter | threshold (number now) | confirmed at | pre-decided fallback if the confirmation fails |
|---|---|---|---|
| O18 (i) smooth field | p99 of \|∇P\| ≤ 0.5 per 100 m of the normalised prosperity field, outside hard seams | M2b: B-CITY measurement, and a §13.6 strip at σ = 45 / 60 / 90 m | σ rises one step (60 → 75 m) and the measurement repeats; an owner pick of σ sets σ, and the threshold is re-signed at that σ's measured p99 with provenance "owner-eye" |
| O18 (j) plot-size variety | within-district plot-area CV ≥ 0.25 for districts with ≥ 30 plots | M2b | the granularity rows' frontage CV rises from 0.25 to 0.35 and the measurement repeats; if still failing, the floor becomes the measured p10 — **not achieved** |
| O18 (h), O7 (f), S3 soft seams | across soft seams: Δ median frontage ≤ 25 %, Δ median plot area ≤ 35 %, Δ median storeys ≤ 1 | M2b | the fields' seam smoothing radius doubles and the measurement repeats; if still failing, the band becomes the measured p95 + 5 points — **not achieved** |
| O19 (d) canopy | tree nearest-neighbour p1 ≥ 0.5 × the class's mean crown diameter (orchard, avenue, garden); ≥ 0.3 × for woods | M2b (bench, §8.10's stamps) | the class's stamp spacing range (a table value, §4.9) is raised until its lower end meets the threshold — the scaled tiles' minimum distance is the entity's own spacing (§8.10), so the shipped asset does not change |
| O19 (g) city-zoom greenery | every green face ≥ 0.3 ha drawn at the city band with a short side ≥ 2 px; the green / ground and green / paper pairs at or above §8.2's contrast floors; no option coupling drops the layer | M2b, for `ink` and `lit` — the milestone that builds S12's greenery rules | the `green` role steps one value step from `ground` (a style row) and the check repeats |
| O12 (a) legibility floors | minimum drawn feature ≥ 2 px; area-label cap height ≥ 7 px (§9.4) | M1: B-ZOOM and a §13.6 strip at 6 / 7 / 8 px | the owner's pick; with no pick, 7 px stands |
| O13 (a) label curvature | a label's spine turns ≤ 45° over any window of the label's length (§9.3) | M1 | the spine's smoothing step doubles; a label still over the limit takes its next alternate (§9.2: its next spine, then §9.4's ladder) |
| O13 (c) name–feature consistency | a name that references a feature type has that feature within 250 m | M1 | the grammar's feature guard — which admits a feature-referencing name only when the feature lies within the guard radius — shrinks its radius from 250 m to 200 m, and the measurement repeats against 250 m |
| O7 (b) water-dependent trades | within 100 m of water | M2b | the placement score's water term weight doubles |
| O14 (b) farmsteads | every farmstead within 300 m of one of its own fields and within 1 500 m of all of them | M2b | the hinterland unit's S10 re-sites a violating farmstead to its fields' area-weighted centroid (§4.9) |
| O14 (c) wood edges | edge straightness (chord ÷ path length over 200 m windows) median ≤ 0.90; canopy fraction monotone in the wildness control | M3b | the edge-noise amplitude rises by half and the measurement repeats |
| O14 (e) built / map area | settlement-perimeter area ÷ frame area (without margin) within 0.06–0.25 at every rung and population | M1 | the frame side per rung is rescaled in `ladder.json` so the median ratio is 0.12 (a declared shift) |
| block-level use mix | residential-only blocks ≤ 60 % of blocks in core districts; per-block use-mix entropy p50 ≥ 0.5 bits; ≥ 70 % of trade households live at their workplace | M2b | the live-in default share of craft and shop rows rises one step (§10.2) |
| requested features | degraded delivery (tiers 4–5) on ≤ 5 % of requested features | M1 | the F-* ladder whose degraded rung fires most gets 5 instead of 3 tier-3 attempts and the measurement repeats; if still over, the band becomes the measured rate + 2 points and the top three causes enter `known-defects.json` — **not achieved** |
| O16 (c) scripted tasks | one UI action where a reference needs a detour; recovery = one undo; every app response ≤ 1 s | M1 (link, SVG, coast side, variants), M2a (undo), M3b (the rest) | a task over its action count gets a toolbar shortcut and repeats |
| O2 (c) carry-over | edited entities kept or carried ≥ 95 % for local actions and re-derivation from S7 on, ≥ 80 % from S4–S6, ≥ 60 % from S1–S3 | M3a (B-EDIT) | §6.3's doubled anchor radii with the IoU test; then an edited building or plot left without a successor re-imposes its last geometry as a drawn constraint |
| S4 (d) square area (stage 2) | typed squares (market, church forecourt, well square, bridgehead, crossroads) inside a district: 0.03–0.15 ha per 1 000 of its inhabitants, over districts of ≥ 1 000 inhabitants | M5 | the square-sizing rows (m² per inhabitant served, per square type) are scaled so the median is 0.08 ha per 1 000, a declared shift, and the measurement repeats |

Realism against real towns is measured by the corpus phase (§13.9), which the owner's roadmap stages after the
standalone generators; until then the base's realism evidence is the D-5 realism question and the P rows of §13.5, and
§15.2 says so.

**Rows added by amendments b.** Three thresholds no reference can set join the table above under J-T:

| letter | threshold (number now) | confirmed at | pre-decided fallback if the confirmation fails |
|---|---|---|---|
| item 24 principal-market siting | on the plaza in ≥ 90 % of inland walled B-CITY seeds and off it in ≥ 50 % of port seeds (§13.2 T24-1) | M2b | the trade-convergence weights of `market.siting` (§4.2 S3 (12)) are re-tuned once and the measurement repeats; if still failing, the two shares become the measured p10 — **not achieved** |
| item 30 hidden share | per district within its band's target ± 0.03 (§13.2 T30-2) | M2b | the reach weights of §4.6's hidden-share row are re-tuned once and the measurement repeats; if still failing, the tolerance becomes the measured p90 deviation — **not achieved** |
| item 28 plan soft bands | circulation share per storey within ± 0.05 of its programme row's `circulation` (num ÷ den); room areas ordered as their rows' target areas (Spearman ≥ 0.8 per building); rooms of scope `unit` and `service` lie no nearer the main entrance in the door graph than the `shared` and `circulation` rooms of their storey in ≥ 90 % of buildings (provenance "architecture 2026-09-27"; §13.2's soft bands); the Dwellings synthesis's medians a research-side note, never a `baselines.json` row (§13.5) | the plan rung's intake (stage 3) | the layout pattern's circulation value (a `RoomProgramRow` cell) steps once toward the band's centre and the measurement repeats; a band still missed is reported and gates nothing (a soft band) |
=== REPLACE ### 13.8 CI tiers and compute budgets (SCL-18; D-34) ===
### 13.8 CI tiers and compute budgets (SCL-18; D-34)

The full verification rig costs ≈ 10–20 CPU-hours (12 000 B-CITY generations ≈ 1.6 CPU-h before the suite; 10⁵ oracle
regenerations ≈ 8 CPU-h; 10⁶ fuzz inputs × ≈ 20 primitives ≈ 0.3–5.5 CPU-h), so it cannot gate a single change. It runs
in three tiers, each with a wall-clock budget on a stated runner (a 16-core x86-64 Linux machine; timings normalised by
§12.1's calibration score):

| tier | runs | budget | contents |
|---|---|---|---|
| **PR** | every change | ≤ 15 min on 8 cores | lint (the determinism allowlist, units, dependency direction, the repository path rule), type check, unit and contract tests; B-FUZZ with 10⁴ random inputs per primitive plus the whole constructive-degeneracy set; B-CITY-lite 50 seeds per rung × 4 water settings; B-EDIT 10³ sequences with the oracle once per sequence; stage-isolated goldens and the per-stop placement digests on Node x86 (§13.3); every shipped style sheet through §8.2's slot resolution at every band and the render keys across two B-CITY-lite seeds per rung (§8.3); the stamp-tile asset's loaded hashes and its seam check (§8.3, §8.10); the licence, notices and deny-list scans; the app's scripted and accessibility tasks on Chromium |
| **nightly** | every night | ≤ 4 h on 16 cores | B-CITY 1 000 seeds × 4 water settings × 3 rungs with the invariant suite and the screen of §12.3's model max clause on every generation; B-FUZZ 10⁶ per primitive; B-EDIT 10⁴ sequences; **the O9 (c) faithfulness campaign** (n = 800 scopes × K = 50, ≈ 12.5 CPU-min, §13.2); the five-engine golden run with one PNG per LOD and preset, the placement digests, the stamp-tile asset rebuilt on the five engines and its loaded hashes in both workers, the sliced-raster and sliced-placement census rows (§8.3), and from M3a the five-engine GeoJSON with trees (§13.3); visual regression and B-ZOOM; control sweeps at TOWN and CITY; the option matrix; the B-REF parity report; and, last and alone on the runner, **§12.1's timing phase** (≤ 20 min: the cost-model sweeps with the F-WORK flatness check, the first-map runs, the in-Chrome re-measure of the model budgets and the re-timing of the max clause's flagged generations) |
| **milestone** | every milestone exit, and weekly | ≤ 12 h on 16 cores | B-EDIT 10⁵ sequences; METROPOLIS control sweeps; the 20-epoch test; the parity report at five seeds per matched size; the D-5 renders, including every earlier panel still *provisional — not rated* (§13.6 (7)); §12.3's pool comparison in the timing phase at every rung the milestone confirms; memory and document-size tests at every rung |

A tier whose normalised wall-clock exceeds its budget by more than 10 % fails with *over budget*; the answer is to split
the job or make it faster, never to raise the cap — a budget changes only by a recorded decision. **Measurement (M0):**
the harness times each tier on the runner. **Pre-decided fallback:** if the PR tier exceeds 15 min, B-CITY-lite drops to
25 seeds per rung and the random fuzz to 5 × 10³ inputs per primitive (the constructive set is never cut), and the
nightly tier absorbs the difference.

**Amendments b in the tiers.** The hook tests of §13.2 (T8, T10, T11, T13, T14, T15, T25, T31) run in the PR tier on the
golden TOWN and CITY fixtures — T10-1's and T15-1's CITY seed sweeps and T14-1's S0 draws nightly — and nightly on
B-CITY-lite; the assignment, dossier and emulation tests (T16–T24, T26, T27, T29,
T30) join B-CITY-lite in the PR tier and B-CITY nightly, and the parity presets add one B-REF run per preset to the
nightly report; the B-PLAN fixtures run in the PR tier — T28-9, T28-11, T28-12's `wings` clause, T28-16, T28-17's
housing clause and T28-18's `relet` clause from M3a, the rest of T28 from stage 3's intake — and the underground
schema fixture (T12-1) from M4; the milestone tier's 20-epoch test carries the wealth ladder and the decline table. The budgets above
do not change: the PR tier's added work is measured at M0 with the tiers, and the paragraph above's fallback applies to
it like any other over-run.
=== REPLACE ### 13.9 The corpus-calibration interface (staged by the owner; DEF-9) ===
### 13.9 The corpus-calibration interface (staged by the owner; DEF-9)

The owner's roadmap puts calibration against the historical map corpus after the standalone generators (the base,
neighbourhoods, buildings, the village) are built; the corpus lies outside this folder and is not read by this program
(the standalone ruling). The base carries the interface now, so the corpus phase needs one adapter and no other code:

```ts
interface CorpusAdapter { id: string; version: string; maps(): AsyncIterable<CorpusMap> }     // written in the owner's staged phase
interface CorpusMap { id: string; source: string /* archive, sheet, date */; era: string; region: string; populationEstimate?: number;
  features: FeatureCollection /* GeoJSON in metres: ways, blocks, plots, buildings, walls, water, greens, with their kinds */ }
interface CalibrationRun {
  id: string; corpus: { adapter: string; version: string; maps: string[] };
  metrics: string[];                                      // §13.5 metric ids, computed on corpus maps by the same parity code
  changes: { table: string; rowKey: string; column: string; from: unknown; to: unknown; evidence: string[] /* baseline ids */ }[];
  before: ParityReport; after: ParityReport /* §13.5 */; shifts: ShiftRecord[] /* one per moved stage, §13.3; cause.kind 'calibration' */;
}
```

1. The parity code computes every §13.5 metric on the adapter's maps research-side and writes `baselines.json` rows with
   `reference: 'corpus:⟨map id⟩'`, role *target* and `referenceBuild` = the corpus version.
2. A `CalibrationRun` changes table cells only; every cell is `{value, unit, provenance, calibratable}` (§7.6), and each
   changed cell's provenance becomes `{ source: 'corpus', evidence, date }`.
3. The run ships as a table-version bump inside an output-version bump with a shift record for every moved stage
   (§13.3, §6.4), stored in `plat/goldens/shifts/o<k>.json` with the run's id as their cause, so every existing document
   keeps replaying under its own output version.
4. The first tables it re-signs are the era and region presets (D-2), the rung profiles (§1.1), the granularity,
   site-plan and greenery rows (§4.7, §4.9) and the forms' signatures (§7.7); the §13.7 thresholds whose provenance is
   "architecture" or "owner-eye" are re-signed where the corpus measures them.

5. Amendments b's tables join the first re-signing (items 16 (d), 19 (d), 24, 26, 27, 28, 30 and 31): the relation templates
   and supply edges (§10.2), the designation templates with the compatibility table (§4.7 S11), the room programmes and
   the interior ladder's rows (§2.6 together with §10.2), the hidden-share and reach rows (§4.6), the market-siting weights (§4.2),
   the farmland modes and the wood rows (§4.9), the band set (§4.5) and the wealth ladder's durations with the
   replaceability column (§4.11, §10.2) — every cell `{value, unit, provenance, calibratable}`, as (2) requires.
=== REPLACE ## §14 Package and module layout, key interfaces, dependency rules, extension points ===
## §14 Package and module layout, key interfaces, dependency rules, extension points

*In plain words.* The code is split into small packages with one-way dependencies: the geometry kernel knows nothing
about towns; the town model knows nothing about drawing; the drawing code knows nothing about how the town was made;
the app sits on top of a headless library. New looks, new layout templates, new export formats, new building
generators and new rule tables plug into named registries without touching the pipeline. All of it lives in one
repository, `plat/`, that never reads the research material (§17).

```
@plat/kernel   lattice, predicates, one arena per layer with the five levels as views (§2.2), role and owner tables, resolution of stored
               references, batched transactions, kernel invariants, arrangement booleans / buffers / bands (§3.7), the straight skeleton and
               its validator (§3.8), obb / hull / lir, delaunay (delaunator), poisson (the stamped ranked tiles' construction from a constant
               stream key, run at build time by `plat/tools/stamptiles/` and in a worker only as the fallback rebuild, §8.10), curves, index
               (flatbush / rbush / grid), noise, dmath (our fdlibm 5.3 port), rng (xoshiro + 128-bit keys; `rng.stream`, the one structured
               stream mixer of §6.1), concern registry, the transient arenas of the plan rung (`transientArena`, `readBack`, `release`, §3.4)
@plat/model    schema (zod), addresses and lineage (§6.3), layers, entity registry (CI path-coverage test), lifecycle, provenance, document,
               serialisation (.plat, CBOR twin), migrations, the Merkle model digest, the core statistics record, the control registry; the
               label records `LabelEntity` and `QuarterNode` (§9.1); the shared view vocabulary `LodBand`, `Role`, `ZoomStop` and the
               label-row tables `LabelTable`, `StringTable`, `GeomTable` with §9.2's `LabelRows` view (§8.1); the records amendments b
               add — `Use`, `Passage`, `Entrance`, `Basement`, `MaterialLedger`, `ElaborationRecord` and the plan records
               (§2.5–§2.8), `Rejection` (§7.7), `DossierRef` (§7.1) and `AccessPoint` (II.7.4)
@plat/tables   rule tables, presets, style sheets, rung profiles (`ladder.json`, §1.1), the work-limit coefficients (`workLimits.json`,
               §5.1 (5)), the wealth ladder (`wealthLadder.json`, §4.11), the room programmes and the interior ladder (`roomProgram.json`:
               `RoomProgramRow` and the `interiorLadder` table of `InteriorLadderRow`s, §2.6, §10.2), the roster tables with the basement
               gate (`RosterTables`, `basementGate`, §10.2), the disruption budget rows (`DisruptionBudgetRow`, §7.7), the band set
               (`prosperity.bands`, §4.5), the parity presets `MFCG` and `FTG` (§7.6), setting packs (§10.4)
               and the default keymap as versioned JSON with provenance; loaders; the override layer
@plat/site     S1 terrain, hydrology, coast / lake / island outline routine, rivers by descent, islands, bank classes, water faces
@plat/content  S2 sequential roster, demand and its propagation through the supply edges, government and religion rows, S7b / S10a
               allocation, households and people derivation, the relation-store schema, the economy and personality schema stubs
               (D-32), naming engine + grammar   [S10b placement moved to @plat/plots with the solver, item 16]
@plat/layout   S3 siting, reservations and gate sites, S4 backbone, S5 growth and regimes, S6 grower / typing / fields / the quarter merge tree,
               S7 fortification and water furniture, S7b claims, S8 infill (BentCutFabric), S9 corridors, S12a hinterland siting, the
               hinterland unit, S12b greenery; the StrategyRegistry and the ordering of registered StageDecls, the staged network and
               underground registrations included (II.7.2, II.7.4)
@plat/plots    S10 granularity law, per-frontage regions, joins / splits / alleys and passages, boundary treatments, the incremental re-cut
               with fixed neighbours (§4.7 S10 (7), §4.11); S11 site plans, packer, heights, footprint templates, the entrance set and the
               basement decision (§2.6); the one placement solver with its relation and supply scoring (§4.7 S10b) and the designation
               mutator (§4.7 S11); the BuildingGenerator interface (`outline` / `compose` / `plan`) + OutlineBuildingGenerator and the
               default implementation of `BuildingGenerator.plan` (§2.6)
@plat/hood     stage 2: RingFabric / SquareFabric / StreetFabric, the neighbourhood LOD workflow   [built after the base; the interface lives in @plat/layout]
@plat/labels   S13a names (every node of the quarter tree), candidates and spines; S13b view placement over the parameters the renderer
               passes in (`ObstacleSource`, `RoleIndex`, below) — it never imports render; the font-metrics reader; collision; furniture
               incl. the ruler and the emblem generator; the knowledge filter over the label rows' `knownTo` (§9.2)
@plat/render   S14 columnar display-list builder, paint programs, style sheets, LOD, the tile pyramid and the tile worker (which runs S13b
               by calling `@plat/labels`), backends (Canvas2D, SVG, print tiles; the WebGL2 tile compositor as a fallback), shadow pass,
               decoration stamps over the bundled stamp-tile asset (§8.10), live layers (`live.stale` among them) and the `states`
               rows' programs (§8.2), the tile worker's queue of resumable raster jobs (§8.9)
@plat/edit     edit events — the plan events and rung re-rolls, the dossier events with rejections and positive placements, the
               wealth-ladder and passage kinds among them (§7.1 and §7.7) — dry-run validation, undo and redo records, scoped regeneration,
               rebase, the dependency audit, event migrations, warp kernels
@plat/export   geojson, svg, png / tiles (streaming), vtt (Foundry-class scene JSON, dd2vtt), gltf / obj, cityjson, csv, permalinks
@plat/sim      optional, M4b: the relation store materialised, postings, occupancy and schedules, calendar, factions, events, economy,
               personality and the stat-block pack (D-32) — over @plat/content ids
@plat/api      the handle-based facade (§11.2), the generation worker host, the derivation pool, the host bridge with its `report.changed`
               event (§11.3) and DocResolver (§11.5), the elaboration cache (`Document.elaborations`, held in the generation worker, §2.9), the headless CLI
@plat/app      the reference UI (below)
@plat/docs     the user guide: generated reference pages from the control, entity and table registries plus written pages;
               `known-defects.json`; release notes generated from `plat/goldens/shifts/` and the milestone records (§13.3), the D-5
               statuses (§13.6) and the known defects
@plat/testkit  B-FUZZ generators (random and constructive), invariant runners, cost-model tests, the bench statistics and the `parity` CLI
               (reads `baselines/baselines.json` only), golden tooling with shift, cascade and milestone records and placement digests over
               `plat/goldens/` (§13.3) and the one `WaterSetting` type every record uses, the O9 (c) faithfulness campaign (§13.2), the boolean
               and buffer oracles (Clipper2-WASM in Node, polygon-clipping; §3.7), the clean-room scanner (§17.1 (5)), the D-5 seed list by
               `H32` and the export command (`plat d5 seeds`, PNGs for §13.6), which read only the committed `ftg-captures.json` and
               `ng-counts.json` (§13.6 (2))
```

Each stage's declared inputs and outputs are its `StageDecl` registration (§4.1–§4.12); the record types a registration
names are declared at their homes (§2.5–§2.7, §3.4, §4.8, §10.4, II.1, II.6).

**Dependency rules (enforced by lint):** `kernel ← model ← tables ← {site, content} ← layout ← plots ← labels ← render
← edit ← export ← api ← app`; **labels ← render**: the tile worker in `render` runs S13b from `labels`, and the drawn
symbol extents and the display-list index that S13b reads reach it only as the parameters `ObstacleSource` and
`RoleIndex` — interfaces `labels` declares and `render` implements — so `labels` never imports `render`, and the types
both use (`LodBand`, `Role`, `ZoomStop`, `LabelEntity`, the label-row tables and `LabelRows`) come from `model`; `docs`
reads the registries of `model` and `tables` only; `hood` depends on `layout` / `plots` only through their interfaces;
`sim` depends on `content` and `model` only; `render` never imports `layout`; nothing depends on `app`; no package
imports a backend it does not need; every adopted runtime library is imported in exactly one adapter file of the one
package that uses it. Model packages, `@plat/labels` and the renderer code that feeds S13b obey §6.5 (3)'s allowlist
lint, which also scans the vendored dependency sources (§6.5 (4)). No import, fixture or script path may resolve
outside `plat/` (§17.1 (3)).

```ts
// @plat/layout — stages and strategies (StageDecl, NetworkStrategy and EnceinteStrategy are §4.12's)
interface Stage<I, O> extends StageDecl {   // StageDecl (§4.12): id, I/O, stream keys, invariants, ladder, workLimits, budgetMs, batch, lineageUnit, lazy, txForm
  version: string; inputsOf(model: Model, scope: Scope): I; run(input: I, ctx: StageContext): KernelResult<O> }
type ConcernId = number & { readonly __brand: 'ConcernId' };   // u16 from the concern registry (§6.1), generated as typed constants — never a string
interface StreamOpts { reroll: number /* the derivation unit's reroll (§6.1) */; attempt: number /* ladder retry, ≤ the concern's registered cap: 3 for geometric ladders, 8 for naming (§6.1, §9.6) */;
  epoch: number; salt: number /* the concern's current salt from the recipe and the log's rerollLayer events; 0 for geometry concerns */ }
interface StageContext { doc: Document; plats: Record<string /* PlatKey */, Plat>;
  stream(concern: ConcernId, entity: Handle /* its entity key is cached in the arena beside its lineage hash (§6.1); TOWN_ROOT for town-level draws (§6.1) */, opts: StreamOpts): Stream;
  streamOpts(concern: ConcernId, entity: Handle, attempt?: number): StreamOpts /* the defaults: reroll from the entity's derivation unit, epoch from this context, salt from the document */;
  tables: TableView; rung: RungProfile /* §1.1 */; report: ReportSink; scope?: Scope; epoch: number }
type Scope = { kind: 'all' } | { kind: 'entities'; ids: Id[] } | { kind: 'region'; ring: Polygon; key: PlatKey; level: Level } | { kind: 'epoch'; epoch: number };   // no raw face ids at the API
interface StrategyRegistry { terrain: Map<string, TerrainStrategy>; coast: Map<string, CoastStrategy>; river: Map<string, RiverStrategy>; manifest: Map<string, ManifestStrategy>;
  network: Map<string, NetworkStrategy>; enceinte: Map<string, EnceinteStrategy>; fabric: Map<string, FabricStrategy>; plots: Map<string, PlotStrategy>;
  sitePlan: Map<string, SitePlanStrategy>; building: Map<string, BuildingGenerator>; evolution: Map<string, EvolutionStrategy>; sky: Map<string, SkyStrategy>; sewer: Map<string, SewerStrategy>;
  underground: Map<string, UndergroundStrategy> /* II.7.4: registered after the network stage by declared I/O, its outputs under.blocks, under.plots, under.buildings and under.access placed before the display list by §4.1's order */ }
interface FabricStrategy  { partition(district: District, seam: SeamContract, ctx: DistrictContext, sc: StageContext, k: Kernel): KernelResult<{ blocks: Block[]; ways: Way[] }> }
interface PlotStrategy    { subdivide(block: Block, ctx: BlockContext, claims: Claim[], sc: StageContext, k: Kernel): KernelResult<{ plots: Plot[]; alleys: Way[]; residue: Residue[] }> }
interface SitePlanStrategy{ plan(plot: Plot, ctx: ContextVector, tables: TableView, rng: Stream, k: Kernel): KernelResult<SitePlan> }
interface GranularityLaw  { bands(ctx: ContextVector, rung: RungProfile): { frontageM: [number, number]; depthM: [number, number]; areaM2: [number, number]; joinMax: number; vacancyRunShare: number } }   // the deep-interior choice is S8's (§4.6); the rows are keyed by §4.5's band set (item 27) and read at the plot's manifested band (§4.11)
// @plat/kernel — the façade the stages see, and the one stream mixer every reader uses
interface Kernel { plat(key: PlatKey): Plat; view(key: ArenaKey, level: Level): LevelView /* a transient arena has level 0 only */; resolve(ref: GeomRef, key: ArenaKey): Resolved; geom: GeomOps; index: SpatialIndex;
  // transientArena(owner, seed, fixed, workLimit), readBack(key) and release(key) are §3.4's — the plan rung's transient arenas; ArenaKey = PlatKey | TransientKey (§3.4);
  // a transient arena is read through `readBack` and `view`, never as a `Plat` (§3.4)
  tx<T>(tx: KernelTx, fn?: (overlay: Overlay) => KernelResult<T>): KernelResult<T>   // exactly one form: tx.ops (declared) or fn (callback), §3.3
}   // KernelTx (§3.3) carries `stage` and `rederivesFrom`; the services resolveVertexAt, signature and sampleProfile are §3.4's
interface Rng { stream(entityKey: Hash128, stage: number /* u16 stage id; STAGE_VIEW = 0xffff for paint programs and furniture */, concern: ConcernId, opts: StreamOpts): Stream }
// StageContext.stream is rng.stream with the calling stage's id and the entity's cached key; paint programs and furniture call rng.stream with STAGE_VIEW.
// No string reaches the mixer; the textual form of a key (§6.1) is rendered for reports only, and a lint rejects a stream call whose concern is not a ConcernId.
// @plat/content — a host's own roster or people; registered only after §11.4's double-run check, its outputs recorded in the document
interface ContentProvider { id: string; version: string; roster(pop: number, character: CharacterVector, tables: TableView, rng: Stream): Roster;
  site(roster: Roster, plots: Plot[], ctx: SitingContext, rng: Stream): SitingResult; people(household: Id, rng: Stream): Person[] }
// @plat/plots — the stage-3 hook: BuildingGenerator { outline(…); compose(…, lod); plan(…, prior?) } is §2.6's; PlacementSolver and DesignationMutator are §4.7's, RelationRule and SupplyEdge §10.2's
// @plat/labels — S13b's inputs from the renderer, declared here and implemented by @plat/render (labels never imports render)
interface ObstacleSource { protectedExtents(stop: ZoomStop, box: Box): { box: Box; entity: Handle; kind: 'gate'|'castle'|'plaza'|'bridge'|'wall' }[] /* drawn symbol extents at the stop, §9.2 */;
  coverage(stop: ZoomStop, box: Box): { labels: number; protected: number; buildings: number; ways: number; water: number } /* mark cover, for furniture placement, §9.5 */ }
interface RoleIndex { roleAt(p: Point, band: LodBand): Role /* the area mark under a point: halos, §9.4 */; snap(p: Point, radiusPx: number, stop: ZoomStop): Point | null /* the measure tool, §9.5 */ }
// both are implemented by @plat/render over a display list: in the tile worker for S13b, furniture placement and the ruler (the main thread reaches coverage and snap
// through §8.9's queries), in the generation worker over an SVG export's transient list, and in the tile worker over a raster export's (§11.1); every implementation is under §6.5 (3)'s lint
// @plat/labels — LabelPlacer and PlacementJob, which take §9.2's LabelRows view: §9.2
// @plat/model — LabelEntity, QuarterNode: §9.1; LodBand, Role, ZoomStop, LabelTable, StringTable, GeomTable: §8.1, §8.2, §8.8; LabelRows: §9.2
// @plat/render — DisplayList, MarkTable, DisplayDelta, DisplayListBuilder: §8.1; StyleSheet, Symbolisation, OrderSlot, LiveLayerProvider: §8.2; LayerSpec: §8.4;
//                backends, threads, TileAddress, TileRasterOpts, TileBackend, RasterJob, VectorBackend: §8.9
// @plat/edit
interface EditEngine { apply(doc: Document, e: EditEvent): ApplyResult /* Ok | Conflict(actions) | Confirm(token, fates, renames) — an event carrying fates and renames commits only when a fresh dry run computes the same fates and renames (§11.2) */;
  undo(doc: Document, session: string, of?: number): ApplyResult /* appends an undo event for the session, §7.4; `of` only for the owner role */;
  redo(doc: Document, session: string): ApplyResult /* appends a redo event */;
  replay(base: Base, log: EditEvent[], opts?: { toSeq?: number; mode: 'interactive'|'replay' }): Model; migrate(doc: Document, to: string): { doc: Document; diff: Diff };
  rebase(doc: Document, reason: RebaseReason, at?: number /* default: the log head; h₀ — the decoded snapshot's model.seq — when the saved town is kept after
    edits made during load verification (§2.9 step 4, §7.1): the only two states the engine holds materialised */): ApplyResult /* as apply, undo and
    redo report: 'ok' when the rebase event is appended at the head; any other `at` returns { status: 'conflict', actions: [{ kind: 'invalid', message:
    'E_REBASE_AT: at must be the log head or h₀' }] }, appends nothing and rebases nothing, on every host alike (§7.1, §11.2) */ }
// the event kinds amendments b add — rejectSite, placeAt, setEntrance, drawPassage, sealPassage, openPassage, relet, densify, thin, the seven plan events and setRoomUnit, regenerate.rung and §4.11's convert kinds — are §7.1's, each with its inverse, its fates and its migration (§7.4, §7.5)
// @plat/api — PlatApi and DocHandle: §11.2; BridgeTransport and BridgeMessage: §11.3; DocResolver: §11.5
// @plat/export
interface Exporter<Opts> { id: string; write(doc: Document, list: DisplayList | null, opts: Opts): Promise<Uint8Array | string> }
  /* runs in the generation worker (§11.1): list = the transient export list for SVG and for raster formats (a raster format transfers it to the tile worker with its
     raster-export request, §8.9, §11.1); null for model formats (GeoJSON, glTF / OBJ, CityJSON, CSV, the document forms) */
// @plat/testkit — Baseline, ParityReport: §13.5; ShiftRecord, CascadeRecord, MilestoneRecord, WaterSetting: §13.3; D5Record, D5Pair, FtgCapture, H32: §13.6; CorpusAdapter, CalibrationRun: §13.9
```

**`@plat/app`, the reference UI.** One click; the basic panel (≤ 12 controls, §7.8) and the advanced panel; the report
panel; the editing tools (draw, move, warp, brushes, the four actions, lock, assign; a dossier element placed here or its site
rejected, a passage sealed or opened, plots fused or split, the plan tools at the building band — §7.1 and §7.7); the tables
editor and the style dialog; the ruler (§9.5); the gazetteer and the "features in view" list, both withholding the names and
purposes of local and secret places the viewer's knowledge key does not hold (§9.2, §11.2); context help; the family-tree
view (module).

* **Input scheme** — MFCG's idiom kept and stated, held in `keymap.json` (data, editable, versioned like every table).
  Pointer: *click* selects and opens the context panel; *double-click* zooms to the entity's band (a district fills the
  view — MFCG's district view); *shift+click* is New random on the entity's scope, keeping its kind (MFCG's ward reroll);
  *ctrl / cmd+click* resets the entity to generated (one logged event that applies the inverses of the entity's own
  edits); *alt+click* toggles its lock; right-click or long-press opens the context actions (§7.4); dragging a selected
  vertex is `moveVertex`; wheel or pinch zooms; dragging empty map pans. Keys while the map has focus: **A** alleys at
  the city band, **B** buildings shown / hidden, **D** grid, **N** hairline mode, **L** labels, **T** trees, **M** ruler,
  **W** warp tool (then **1–8** choose the kernel), **G** gazetteer, **F** features in view, **R** New random on the
  selection, **Esc** cancel, **ctrl / cmd+Z** undo, **ctrl / cmd+shift+Z** redo, **+ / −** zoom, **0** fit, **?** the
  keymap overlay. Bindings are active only while the map region has focus; an embedding host can switch global bindings
  off; every bound action is also on a menu or a button.
* **Accessibility** — the app's chrome (panels, dialogs, menus, toolbars, the report, the gazetteer, the tables editor)
  meets WCAG 2.2 level AA. Landmarks: header (title and seed), navigation (panels), main (the map region,
  `role="application"` with an accessible name and a live description of the view — rung, band, the district under the
  pointer or the focused entity), complementary (report, gazetteer). Every control's accessible name and description
  come from the control registry (its label and documentation anchor); every icon button has a text label. Every action
  is reachable by keyboard in a focus order that follows the layout, with visible focus and no keyboard trap; the map
  region takes arrow-key panning and **+ / −** zoom. **The non-visual route to the map** is the gazetteer (list and
  search over districts, quarters, streets, buildings, institutions and pinned people through `query`) and the "features
  in view" list (the entities whose marks are visible, grouped by kind, ordered by distance from the view centre, each
  announcing its name, kind and district); selecting in either list selects on the map and the reverse. UI text
  contrast ≥ 4.5 : 1 and UI components ≥ 3 : 1 (the map follows §8.2's contrast matrix); the reduced-motion preference
  turns off animated zoom; the UI scales 100–200 % without loss. Tests: §13.4.
* **Context help and the guide** — every control and panel carries a help link to its anchor in `@plat/docs` (§7.8's
  documentation anchor), opened in a side panel. The guide's reference pages are generated from the control registry
  (label, range, unit, output metric, consuming stage, locality class), the entity registry and the table schemas
  (columns, units, provenance); written pages cover getting started, each panel, each edit action, each export and the
  tables editor. Release notes are generated per release from the shift records (§13.3) and `known-defects.json` (id,
  symptom, affected rungs and presets, workaround, since, fixed-in). Tests: §13.2.
* **Family-tree view** (module tier, M4b) — reads `query(h, { kind: 'relations', person, up: n, down: m })` over the
  relation store (§10.3): generations in rows by birth epoch, partners side by side and children below; branches beyond
  two generations elided into a count that expands on click; re-root on any person; opening a person never pins it
  (§10.3); keyboard-operable as a tree grid.

**Extension points:** every `Map` in `StrategyRegistry` (stage 2 registers the three template fabrics; a village product
registers a tracker `NetworkStrategy`, a palisade `EnceinteStrategy`, a density `StageDecl` and a "houses along ways"
`FabricStrategy`; the owner-staged layers register `SkyStrategy`, `SewerStrategy` and `UndergroundStrategy`; the evolution engine an
`EvolutionStrategy`); `BuildingGenerator` (stage 3) and the default implementation of its `plan` step (§2.6); `StageDecl` registration by declared inputs and outputs; the
`PaintProgram`, `StyleSheet` and `LiveLayerProvider` registries; `Exporter`s; rule tables, presets, rung profiles,
setting packs and keymaps (data); `EditEvent` kinds with migrations; `LayerSpec`s; `ContentProvider` (host rosters, after
the double-run check); `BridgeTransport` and `DocResolver`; the `PlacementSolver` and the `DesignationMutator` (§4.7 S10b, S11); `CorpusAdapter` (§13.9).
=== REPLACE ### 15.1 Parity matrix — every capability row of `docs/confidence/*.md` (rows per `judge-parity.md` §2), plus the audit rows the matrix lacked ===
### 15.1 Parity matrix — every capability row of `docs/confidence/*.md` (rows per `judge-parity.md` §2), plus the audit rows the matrix lacked

Tags: **BASE** (delivered by stage 1), **STAGE-2** (delivered by the neighbourhood stage through an interface the base
carries), **VILLAGE-LATER** (the separate product staged by the owner; checked as not precluded, hooks in PART III),
**module** (the optional `@plat/sim`, milestone M4b), **hook**. "Beyond" marks rows where the base deliberately exceeds
the reference's recorded weakness. Rows whose id starts `a:` come from the coverage audits' rows, so the matrix is no
coarser than the findings.

**MFCG (40 rows) — all BASE**

| id | capability | where | tag |
|---|---|---|---|
| A1 | parameter surface / blueprint / URL | §4.2 S0, §6.4 permalinks, §7.7 intent (MFCG's flags kept as intent toggles and the features strip, §7.8) | BASE |
| A2 | RNG stream, seed chain, save/restore | §6.1 keyed sub-streams (beyond: no global stream) | BASE |
| A3 | pipeline structure and failure policy | §4.1, §5 (beyond: no whole-city restart; every requested feature counted by delivery tier) | BASE |
| B1 | patch mesh (spiral seeds → Delaunator → Voronoi/DCEL) | replaced by the plat and backbone faces (§2.2, §4.3); Delaunator kept for site sampling; the "denser, regular centre" look carried by the stage regimes | BASE |
| B2 | junction optimisation | §3.6 attraction + §4.3 junction merge (8 m), Y → T | BASE |
| B3 | coast / water field / `sea` | §4.2 S1 closed-outline coast at the request's bearing | BASE |
| B4 | `buildDomains` (land components) | §4.2 S1 flood fill of L0 | BASE |
| B5 | curtain wall, gates, towers, watergate | §4.2 S3 gate sites; §4.4 trace before the stage's growth; §4.8 gates at arterials with exact N by the measured gate law, water gates, towers by rule | BASE |
| B6 | citadel / castle (repair loop, placement, keep) | §4.2 S3 castle reservation by score (inside / on-enceinte / outside); §4.8 keep by `lir`, bailey, and the 0.75 compactness gate kept as a shape check, repaired in place in MFCG's order, then re-sited, then a keep without a bailey — never a restart (F-CASTLE) | BASE |
| B7 | streets and roads (`Topology`, `aStar`, `tidyUpRoads`) | §4.3 routed arterials, destinations = gates / markets / bridges / harbour | BASE |
| B8 | rivers / canals (regular, delta, bridges, mouth) | §4.2 S1 rivers by descent, distributaries (a delta), estuary as a width rule, islands; §4.8 bridges, canals as an intent flag | BASE |
| B9 | districts (seeded region growing, types, holes) | §4.5 grower over coarse faces, `check4holes`, feature-named kinds, quarters | BASE |
| B10 | ward → blocks (alleys by twisted bisection) | §4.6 bent-cut infill of each district polygon: the intramural secondary network and its lanes as spines | BASE |
| B11 | block → lots (twisted bisection, OBB, `indentFronts`) | §4.7 S10 per-frontage plots + front jitter (construction replaced by ruling O5; statistics matched, §13.5) | BASE |
| B12 | outskirts density falloff | §4.4 ribbon regime with the distance-to-gate kernel; §4.5 density field | BASE |
| B13 | shanty town / ribbon sprawl | §4.5 the shanty kind by FTG's trigger — the roster's average band `poor` or `squalid`, after the first half of the stages — its extramural placement a soft relation row (J-A27.43), the S0 `shanty` toggle forcing it on; §4.4 ribbon regime; the suburb regime on the shanty toggle | BASE |
| B14 | plaza, temple, churches, gate plazas | §4.2 S3 plaza reservation sized per rung and the principal market's trade-convergence site (S3 (12)); secondary markets as S7b claims, never touching another (§4.5 S7b (3)); §4.7 S9 `square` faces; §4.8 gate plazas and church forecourts (G-R1); institutions via claims | BASE |
| B15 | landmark / solid buildings, keep plan | §4.7 S11 institution site plans; §2.6 landmark footprint templates and OutlineBuildingGenerator; `lir` keep; solid-ink landmarks in `ink` | BASE (+ stage-3 hook) |
| B16 | greens / parks | §4.9 greenery rule table | BASE |
| B17 | farms and fields | §4.9 hinterland presets incl. the furrow style | BASE |
| B18 | harbour, docks, piers | §4.8 water furniture (basin, moles, quays, piers) | BASE |
| B19 | trees and forests | §4.9 forests as faces; §8.10 stamped ranked tiles (Poisson k = 50, shipped with the product) | BASE |
| B20 | elevation field (`Apply elevation`) | §4.2 S1 real heightfield feeding S4 / S5 costs (beyond) | BASE |
| C1 | display modes (Lots / Complex / Block / Hidden) | §8.5 LOD bands + the plot model: the Lots look = footprint masses over the `ground` role at the city band; Hidden = a layer toggle; cadastral layer optional (beyond: no global switch) | BASE |
| C2 | roofs Plain / Hip / Gable, Raised, Solids | §3.8 straight skeleton with the plain-roof downgrade; §8.2 `roof` program; §2.6 roof spec + heights; Raised = `ink`'s offset under-copy, on by default (§1.2) | BASE |
| C3 | lot post-processing (`Offset`) | §4.7 S11 front-line jitter parameter | BASE |
| D1 | naming (Tracery + Markov, feature-conditioned) | §10.4 own engine and grammar | BASE |
| D2 | district labels (curved / straight / legend / hidden) | §9 hole-aware spines, quarter labels at city zoom, OBB-arc / straight / legend fallbacks (beyond: protected features) | BASE |
| D3 | map furniture (title, legend, scale bar, grid, compass, emblem, pins) | §9.5 (emblem slot with import and a minimal own generator; compass reroll) | BASE |
| E1 | colour system (schemes, roles, tints, weathering) | §8.2 roles, the contrast matrix, per-entity tints, thematic overrides | BASE |
| E2 | stroke discipline, layer order, caching | §8.2–§8.3 (casing idiom, round joins, order parity, world-aligned tiles) | BASE |
| E3 | alleys layer | §4.6 lanes / alleys are ways; §8.5 access-critical lanes drawn at the city band, the rest by LOD | BASE |
| E4 | district view, framing, no-zoom, thin lines | §8.8 continuous zoom on 2^¼ stops + the district band (beyond "no zoom"); framing §9.5; hairline mode (key **N**, §14) | BASE |
| F1 | warp tools (8) | §3.4 `warp` + §7.1 `warp` event with dry-run and whole-step validation | BASE |
| F2 | rerolls, renames, landmarks | §7.1 the named actions, `setAttr`, `assign` (beyond: persisted, undoable) | BASE |
| F3 | UI / hotkeys / size bands | `@plat/app` input scheme in `keymap.json` (§14); the measure tool (§9.5); the size ladder as data (§1.1) | BASE |
| G1 | export PNG / SVG / JSON | §11 (beyond: round-trip import, layered SVG) | BASE |
| G2 | integrations (FMG, Armoria, PS, Procgen Mansion) | §11 API, host bridge and static exports serve any host; the emblem is our own generator (§9.5); no third-party service is called (standalone) | BASE (hook) |
| H1 | population and scale model | §10.2 population as input; §2.1 metres (beyond the multiplier) | BASE |
| H2 | performance envelope | §12 (matched sizes 40 / 80 / 130; §12.9's declared trade) | BASE |

**FTG (46 rows + 9 audit rows) — BASE unless noted**

| id | capability | where | tag |
|---|---|---|---|
| A1 | parameter surface, presets, save/load | §4.2 S0, §7.6 presets as data, §2.9 document | BASE |
| A2 | two-phase pipeline, staging, failure policy | §4.1 (programme before layout, two-way), §5 | BASE |
| A3 | coordinate system, units, wire format | §2.1 integer cm centred; §2.9 binary blocks / CBOR twin | BASE |
| A4 | determinism, seeding, regeneration of old settlements | §6, §6.4 retention, §7.5 migrate (beyond: FTG has none) | BASE |
| A5 | server/client split, persistence, lazy person generation | §11.2 handle API and workers; §2.9 document; §10.3 lazy people | BASE |
| a:A24 | app accessibility; list and search views reaching buildings and people without the map | §14 `@plat/app` accessibility contract, the gazetteer and "features in view" lists; §13.4 tests | BASE |
| a:A25 | user guide, context-aware documentation links, release notes naming defects | §14 `@plat/docs` and context help; §7.8 anchors; §13.2 coverage and link checks | BASE |
| B1 | size ladder, population and area budget | §1.1 ladder and rung profiles; §4.2 S2 stage quotas; §12.2 | BASE |
| B2 | dependency-graph building selection | §10.2 sequential roster (own tables) | BASE |
| B3 | residents, job postings, backfill, matching | §10.3 households (base); postings and re-matching in the module | BASE + module |
| B4 | people model | §10.3 derived people with ancestry rows (own tables) | BASE + module (data depth) |
| B5 | government, religion, factions, military | §2.7 Faction / Institution entities with seats; §10.2 government and religion rows (base); meetings, roles and goals in the module | BASE + module |
| B6 | relations, friend groups, rivalries, events | the relation store — schema in the base (§10.1), materialised by `@plat/sim` | module |
| a:B10 | economy: resource chains, items and services with prices, stock per building, global price edits | D-32: `@plat/sim` over the base schema stub (§10.3); roster rows' provides / uses edges (§10.2) | module |
| a:C03 | personality, education gated by class, stat block with profession modifiers | D-32: `@plat/sim`, derived from the person key; the stat block a named game-system pack, off by default | module |
| a:C11 | family-tree view (layered generations, elided expansion, re-root) | §14 `@plat/app` family-tree view over the relation store | module |
| C1 | coast generation, islands, ponds | §4.2 S1 closed-outline routine, bank classes (also sky islands) | BASE |
| C2 | rivers, branches, bridges, classification, direction | §4.2 S1 hydrology, tributaries, distributaries, river islands, crossing sites; §4.8 bridges | BASE |
| C3 | manually drawn water | §7.1 `drawWater` | BASE |
| C4 | road-graph substrate (PSLG, incremental faces, edge types) | §2.2 the plat (beyond: attraction policy, levels as views of one arena, role sets on edges) | BASE |
| C5 | road growth (proposal queue, cap, lengths, stages, initial roads) | §4.4 S5 outside the walls (mean-reverting curvature walk, destination-biased, explicit legality; per-preset growth rules for `american` / `ringed`); travel-cost stage boundaries with the anisotropy row (FTG's spoke priority) | BASE |
| C6 | district lots: creation, merge floor, type selection, order | §4.5 grower and typing, merge floor; S7b allocation | BASE |
| C7 | district internal pipeline (landmarks → divide → plots → buildings), placement modes, modifiers | §4.7 claims first → S8 → S10 → S11; Dense / Gaps / Individually placed ≈ row / detached / compound; the tents arrangement row (§4.7 S11) and the building-scale multiplier (§2.5) | BASE |
| C8 | lot → plot subdivision geometry | §4.7 S10 per-frontage regions (replaces recursive random cuts by ruling O5) | BASE |
| C9 | building footprints, landmark templates, entrances | §4.7 S11; entrance rule kept; non-rectangular landmark footprint templates in the base (§2.6) | BASE |
| C10 | suburb stage | §4.4 suburb regime (offshoots, cul-de-sacs, small lots from the outset, density Bernoulli) by preset or the shanty toggle | BASE |
| C11 | walls and towers | §4.8 | BASE |
| C12 | castle district | §4.2 S3 castle reservation + §4.8 | BASE |
| C13 | harbours and waterfront districts | §4.8 water furniture; §4.5 docks | BASE |
| C14 | outer settlement: farmland, farmsteads, outside buildings | §4.9 S12a count-driven outside land, farmsteads, outside buildings on their resources (§10.2 `outside` rows) | BASE |
| C15 | forests, tree areas, trees, hedgerows | §4.9; §8.2 hedgerow instances in `lit` | BASE |
| a:I11 | tree species | §2.7 `Greenery.species` from the climate table; §4.9 inner and outer shares for woods | BASE |
| C16 | landscape decorations, reserve, climate presets | ponds carved at S3 (§4.2 S3 (10)); the rest of the decoration table is S12a's sites, built by the hinterland unit (§4.9); `reserve` land use; climate as a circumstance + style preset | BASE (should-have) |
| a:I05 | feathered field edges | §8.2 `feather` program (vector bands), on in `lit` | BASE |
| C17 | perimeter expand + round; decoration system | §4.5 S6's settlement perimeter, offset and rounded; §4.7 furniture pins (per-block weighted rows, per-district singletons) and plot boundary treatments (§2.5) | BASE |
| a:J05 | market stalls | §4.7 furniture pins: stalls on each market square's edge band, by its rank, and round its market hall | BASE |
| C18 | district and building naming, erosion | §10.4 (contraction as an EVO event) | BASE |
| D1 | renderer architecture | §8.1 columnar display list + tile backends (batched; picking through hit-test slices) | BASE |
| D2 | palette and feature treatment | §8.2 `lit` preset on Canvas2D with our procedural texture set | BASE |
| D3 | roofs (straight skeleton) | §3.8, §8.2 (roofs cached per entity revision, not per render) | BASE |
| D4 | water rendering and coast decoration | §8.2 bands, depth ramp, foam, bank classes | BASE |
| D5 | day/night, weather, seasons, window lights | §8.4 sun vector + shadow hook; `night` preset with the `lights` role; lights from the module | BASE (hook) + module |
| D6 | post-process effects | §8.2 post operations per tile | BASE (should-have) |
| D7 | labels, scale bar, grid, units, legend, thematic layers | §9; thematic layers = style overrides keyed by attributes (§8.2) | BASE |
| a:L08 | ruler (distance measuring) | §9.5 measure tool | BASE |
| D8 | 3-D view, street view, height maps | §11 glTF and CityJSON exports; heights in the model; no 3-D default view (R13 restraint) | BASE (export) |
| E1 | layout editor | §7.1 draw / move / warp events with split-on-cross and dry-run validation | BASE |
| E2 | regenerate area, bulk edit, constrained re-roll | §7.1 the named actions with scope; `setAttr` batches; faithful regeneration (beyond: undoable) | BASE |
| E3 | entity editing, dictionaries, pins, notes, layers | §7.1 `setAttr`, data dictionaries by id (§10.3), annotation layer (§9.5), view notes (§11.3), `LayerSpec` | BASE |
| F1 | schedules, behaviours, sub-locations | §10.3 module; sub-locations with capacities (§2.6) | module |
| F2 | clock, calendar, external time sync | §10.3 module; the time view state and the module's command over the bridge (§11.3) | module |
| G1 | export | §11 (beyond: districts in GeoJSON; per-layer VTT; CityJSON) | BASE |
| G2 | integrations (Foundry, Roll20, public links) | §11 VTT exports (Foundry-class, dd2vtt) + the host bridge over any transport; no hosted service — the host is the store (§11.5) | BASE |
| H1 | data scale | §12.8 memory; lazy people | BASE |
| H2 | performance envelope | §12 (beyond: client-side, no server round trip; the first-map and model laws with their declared misses, §12.3, §12.5, D-18) | BASE |

**NG (31 rows) — STAGE-2 unless the base already delivers it**

| id | capability | where | tag |
|---|---|---|---|
| A1 | tags, `Settings`, URL state | PART II request (fabric id, params, character); §6.4 permalinks | STAGE-2 (request shape in BASE) |
| A2 | RNG engine, one stream, successor seed | §6.1 per-district sub-seed (beyond) | BASE |
| A3 | pipeline structure and failure policy | §4.1, §5 (NG's local retries are the F-CUT ladder) | BASE |
| B1 | hood outline (`createShape`) | the district's typed boundary (II.1); standalone and sky outlines from §4.2 S1 (2)'s closed-outline routine with an outline template (II.1 rule (5)) | STAGE-2 |
| B2 | templates area / street / square | `FabricStrategy` registrations selected per district (II.2) | STAGE-2 |
| B3 | street network by bent recursive bisection | §4.6 (the base's infill primitive; NG signature as regression) | BASE |
| B4 | hole-aware bisection of annuli (`BisectorEx`) | §4.6 slit routing — the primitive `RingFabric` needs | BASE (primitive), STAGE-2 (ring) |
| B5 | street finishing: extend, fillet, width, corridor | §4.6; §4.7 S9 corridors | BASE |
| B6 | block content dispatch (Normal / Manor / Empty / Green) | §4.6 the deep-interior choice by band shares; §4.7 S10 residue typing; §4.9 greens; the weighted, area- and spacing-conditioned choice as a stage-2 table (II.3) | BASE + STAGE-2 |
| B7 | square-template plaza | `SquareFabric`; §4.7 `square` faces | STAGE-2 |
| B8 | ring-template seed geometry | `RingFabric` (II.2) | STAGE-2 |
| C1 | lots, setback, validation (perimeter filter) | §4.7 S10 (construction, 0 discards) | BASE |
| C2 | buildings, wings, compound plans, roof kinds, landmarks | §2.6 wings in the base + stage-3 hook; roof kinds in the base | BASE (+ stage 3) |
| C3 | manor compounds (walls, hall, grove) | §4.7 S11 set-back compound site plan with boundary treatments + §4.9 grove rule | BASE |
| C4 | greens, groves, shared Poisson field | §4.9 greenery rules; §8.10 stamped tiles | BASE |
| C5 | trees (crown construction, colour, shading, depth sort) | §8.2 lobed crowns, depth sort in `hatched`; §8.10 crown library | BASE symbol, STAGE-2 tier |
| C6 | pins: wells, fountains, large trees | §2.7 `Pin` kinds; §4.7 furniture pins in yards and squares; close-up density by the stage-2 table (II.3) | BASE (pins), STAGE-2 (close-up density) |
| C7 | uneven streetwall | §4.7 S11 front-line jitter | BASE |
| C8 | size tags, scale, character knobs | §2.5 character vector; metric scale (beyond) | BASE |
| D1 | naming | §10.4 | BASE |
| D2 | title layout (corner choice) | §9.5 emptiest-corner rule | BASE |
| E1 | palette / style schema, presets, multi-colour | §8.2 (`hatched` / `graphic` presets; multi-colour roles) | BASE |
| E2 | canvas, layer order, stroke discipline, depth-sorted trees | §8.2–§8.3 | BASE |
| E3 | roads rendering (Plain + five modes) | §8.2 programs in `hatched` (the road programs II.4 adds) | STAGE-2 tier |
| E4 | roof rendering: fake gables, colour law, hatching | §8.2 `roof` + `hatch(taper)`; §8.6 | STAGE-2 tier (programs in BASE) |
| E5 | shadows (prism quads, tree shadows) | §8.4 shadow pass from stored heights | BASE hook, STAGE-2 tier |
| E6 | unrecorded style features (night lights, presets) | §8.2 presets as data | STAGE-2 tier |
| F1 | toggles, hotkeys, presets, tags dialog, rotation, renaming | `@plat/app` (keymap, §14); rotation = view (§7.1); `setAttr` rename persists | BASE (app) |
| G1 | export PNG / SVG / JSON, permalinks | §11 | BASE |
| G2 | integrations (Procgen Mansion hand-off) | the stage-3 `BuildingGenerator` takes the plot and entrance directly (beyond the rasterised hand-off) | hook |
| H1 | performance envelope | §12 (opening a district and per-district regeneration: §15.2 S5, S6 and §16 M5) | STAGE-2 |

**VG (44 rows) — VILLAGE-LATER: not-precluded checks, hooks in PART III**

| rows | capability group | not precluded because |
|---|---|---|
| G1, G20 | tags, descriptive tags | the intent layer and presets are data (§7.7); tags derivable from the statistics record |
| G2 | seed / RNG / retry | §6 streams; §5 no seed swap |
| G3–G5 | river course before terrain, height field, water extraction | S1 shares level-set water and a carved field; VG's course-first, terrain-independent spline is a `RiverStrategy` the village registers, which S1's carve step serves (PART III) |
| G6, G7 | density map, heart | the density field is the same field type (§4.5); a village registers a density `StageDecl` ahead of its network (§4.12) and seeds one heart (§4.2 S3) |
| G8, G9 | tracker roads, bridges | a village registers a tracker-steered `NetworkStrategy` that receives the traced enceintes (§4.12); bridges §4.8 |
| G10, G11 | square + centrepieces, wharf / piers | `square` faces + pins; `quay` / `pier` ways |
| G12–G16 | buildings + population, fields, orchards, forest, palisade | detached / farmstead site plans (§4.7); hinterland presets and orchards (§4.9); forests; the palisade built before the roads by the village's `EnceinteStrategy` (PART III) |
| G17–G19 | naming, legend / POIs, population class | §10.4, §9.5 annotation layer, §10.2; the ladder's village rows (PART III) |
| R1–R17 | rendering (palette, layers, relief, hillshade, spotlight, water bands, roads, buildings, trees, shadows, fields, outlining, palisade, lights, nameplate, grid, numbering) | style sheets + programs (§8.2: bands, contour and hachure marks, outline mix, vignette, `lights`); the relief tier (hillshade, contours, hachures) is an optional base program, off by default; VG's grass-tuft and spotlight looks stay with the village product |
| E1–E6, D1 | export, JSON, permalinks, editing, integrations, performance, scale | §11, §7, §12, §2.1 (metres everywhere; VG's 0.7 m / unit ambiguity removed) |

All 44 rows are not precluded; the base pays for none of them beyond what it needs itself (the relief tier is a base
should-have in its own right, O12 extras). Caution from the parity judge: the five-level plat is the least
village-shaped model — a village with houses along ways leaves L2 / L3 nearly empty — admissible, since a village is one
district and nothing assumes walls or a market (PART III).
=== REPLACE ### 15.2 Improvement matrix — every must-have / should-have / hook / stage-2 item of `docs/IMPROVEMENTS.md` §5 ===
### 15.2 Improvement matrix — every must-have / should-have / hook / stage-2 item of `docs/IMPROVEMENTS.md` §5

Every acceptance letter carries its class: **[C] conformance** — it holds by construction once the rule is built, so it
proves the implementation follows the design and is never cited as evidence that an improvement was achieved; **[P]
parity** — compared with a measured reference number in `baselines.json` by §13.5's band rule; **[O] outcome** — it can
show that the result is better than the references, for a user or for realism. Thresholds without a reference source
have their numbers in §13.7. Every letter is stated here in full, stage-2 letters included — or, where another section
owns the letter's number, by a pointer to it: implementers read this matrix, never `docs/IMPROVEMENTS.md`, which is cited
for traceability only (§17.1 (1)).

**The first-weighted improvements (D-7) and the evidence their own rules cannot fake.**
* *Plot texture* (O5, O17, O18): §13.5's figure-ground and streetwall rows against MFCG's exports at the matched rung,
  with the intended direction of each difference declared; the plots, party-wall and MFCG street-signature rows; the
  within-district plot-area CV floor [P / O].
* *Editability* (O9, O16-core, O2 c): the thirteen MFCG asks as measured scenarios; locality outside the scope;
  faithfulness against from-scratch generations; carry-over rates of edited entities [O].
* *Legibility and charm*: the §13.6 protocol's legibility and charm questions; street-edge recoverability [O / P].
* *Realism*: the §13.6 protocol's realism question and the P rows of §13.5 — realism against real towns is the corpus
  phase's measurement (§13.7, §13.9), and this matrix makes no realism claim beyond those two.

| id | tier | mechanism in this design | acceptance (class of each letter) |
|---|---|---|---|
| O2 deterministic recipe | must | §6.1 keyed streams with the concern registry; §6.3 addresses and lineage; seeded decoration; epoch components | (a) identical model digest on two machines and three browsers, 100 % [O — FTG has no seed; VG drifts between builds]; (b) the scope of stability as §6.3 states it — grammar, decoration and block-reroll perturbations change 0 other entities [C]; (c) per parameter class: entities outside the stage-k closure byte-identical 100 %, the seam exception of §4.6 / II.4 excepted — computed by the oracle from the batches' commit records and checked (§7.3) [C]; edited entities kept or carried at §13.7's O2 (c) rates, measured at M3a with its fallback [O]; (d) addresses 100 % stable outside the scope on B-EDIT [C]; (e) stage-isolated goldens: only declared stages move (§13.3) [C] |
| O6 metric units, furniture, statistics | must | §2.1 cm + unit lint; §1.1 ladder; §9.5 furniture; §13.2 core statistics record | (a) 100 % of length fields carry a unit (lint) [C]; (b) ordinary-house footprint median 60–160 m², p95 < 400 m² [P — FTG 103 / 154 m²; MFCG's footprints are lots, descriptive only]; (c) scale bar and grid within 0.5 % [C]; (d) 100 % of generations emit the core statistics record with provenance, the bench metrics on demand (§13.2) [C] |
| O3 robust kernel, typed ladders, report | must | §3, §5 | (a) B-FUZZ on random inputs and constructive degeneracies: 0 crash / hang / invalid output [O — all four references crash or retry on degenerate input]; (b) hard invariant violations 0 / 1 000 cities [O]; "no restart path" is a design property, not an acceptance number (D-9); (c) B-EDIT 0 planarity violations [C]; (d) model time within §12.3's per-rung laws of the building count and its max clause, so the bars 100 ms / 300 ms / 1 s hold up to the sizes §12.3 states and are missed above them, a miss declared for the owner's veto (D-18) [P — MFCG at matched sizes, with §12.9's declared trade]; (e) identical digest across platforms [O]; (f) the seed never swapped; ladder uses ≤ 2 % of transactions, p99 ≤ 3 attempts [C]; (g) p95 per delivered town on the MFCG-worst configuration set ≤ 1.0 s against MFCG's 3.7–4.0 s (§13.5) [O] |
| O11 schema, registry, exports, API | must | §2 schema + registry with the CI path test, §11, §14 | (a) registry round-trip 100 %, no type missing from any path [C]; (b) containment 100 % [C]; (c) export → import → export identical [C]; (d) GeoJSON validates and loads in QGIS with districts [P — FTG omits districts]; (e) 0 dangling references [C]; (f) headless digest = UI digest [C]; (g) VTT grid 0 px [C]; (h) layered SVG separable and opening in Inkscape within 120 s at METROPOLIS [O] |
| O1 terrain and hydrology first | must | §4.2 S1 | (a) requested water features counted by delivery tier: tier-6 omissions 0, degraded ≤ 5 % (§13.7) [O — MFCG fails a requested river in 7 of 10 attempts at size 80]; (b) 0 non-monotonic beds; every river has an outfall; width never decreases downstream; every terrain cell has a defined flow path to an outfall (100 %); contours cross water 0 times [C]; (c) 10 / 10 configurations on 100 seeds each — coast, estuary, confluence, river island, lake shore, delta (distributaries), moat, island city, hill town, cliff or ravine [O]; (d) building ∩ water = 0 [O — MFCG's buildings over its river]; (e) the water stage linear in cell count, ≤ 5 ms at a 128²-cell equivalent and inside §12.4's S1 budget [P — VG 17–87 ms for one 128² village]; (f) site classifier ≥ 90 % [O]; (g) unused eligible land components 0 [C]; R11: river within the core when requested = 100 % [C] |
| O4 two-tier street network | must | §4.3, §4.4, §4.6 | (a) 100 % of through-roads reach destinations, bearings ± 10° [C]; (b) detour ≤ 1.4; junction p5 ≥ 30°; no turn cliff (10 m resampling); 4-way share per preset — organic 0–15 %, `ringed` 20–45 %, `american` 40–80 % [P]; (c) width ~ betweenness [C]; (d) slope p95 within class [C]; (e) 0 edges below `minEdge` and 0 clearance violations [C]; (f) network + infill ≤ 100 ms at CITY with block statistics in the NG bands — the fusion gate, at M0 on a flat site and at M1 on river, coast and relief configurations [P]; the MFCG street signature inside the walls (§13.5) [P]; (g) N external connections exactly, island towns counting their shore landings [C]; (h) between-seed dispersion of the signature vector ≥ the larger of MFCG's and FTG's at the matched rung, from M1 [O] |
| O5 frontage-first plots | must | §4.7 S10 | (a) access edge 100 %, and every hidden plot reachable by a chain of access edges from a public way (§13.2 T30-1) [C]; (b) 0 plots < 3 m, wedges < 0.5 % [C]; (c) side walls ± 5° ≥ 90 % [C]; (d) typed coverage 100 %, discard ≤ 0.05 [C]; (e) plot and block distributions by §13.5's band rule [P]; (f) 0 self-intersecting, duplicate or doorless buildings — exactly one main entrance per building facing its street or court, side, rear and yard doors by §2.6's rules (§13.2 T29-1, T29-2) [O — FTG's hourglasses and ≈ 10 % doorless]; (g) streetwall gap ≤ 1 m [C]; streetwall continuity on dense frontages ≥ MFCG's at the matched rung [P] |
| O18 prosperity field + granularity law | must | §4.5 field; §4.7 S10 joins / splits / alleys; §4.6 deep interiors | (a) Spearman(prosperity, plot area) ≥ 0.8 and Spearman(prosperity, plots per ha) ≤ −0.8 [C]; (b) Moran's I of plot area > 0 [C]; (c) detached, yard, attached and coverage shares monotone in prosperity [C]; (d) alley length per ha ~ −prosperity (Spearman ≤ −0.7), 0 alleys below the class minimum, the dead-end share in band [C]; the court share of deep blocks within band per class [P]; the hidden-plot share per district within its band's target ± 0.03 (§13.7, T30-2) [C]; (e) access 100 % [C]; (f) institutions placed 100 %, never gives up [C]; (g) provenance, and the perturbation test ≥ 95 % outside; under a band change the wealth ladder's bars of §13.2 (T31-1 – T31-12) — no occupied building removed, a plot's geometry at or above its floor, granularity within the band's target after a re-cut [C]; (h) soft-seam jumps within §13.7's bands [O]; (i) a smooth field — §13.7's gradient threshold — whose edits replay [C]; (j) within-district plot-area CV ≥ 0.25 (§13.7) [O — FTG's 441 m² in every class]; (k) gap-width modes [C] |
| O17 plot model, site plans, heights | must | §2.5–§2.6, §4.7 S11, §8.4 | (a) coverage within the table [C]; (b) multi-footprint plots > 0 for institutions, manors, inns and farms [C]; (c) party-wall share by band, attached ≥ 90 % in dense bands [P — NG 39–43 %, 95–99 %]; (d) streetwall continuity ≥ MFCG's Lots mode, walled or fenced frontage counted [P]; (e) yards owned 100 % [C]; (f) footprints fit 100 % [C]; (g) heights on 100 %, shadow ∝ height r ≥ 0.99 [C]; (h) ≤ 5 µs per plot median for site plans (§12.4) [C]; (i) footprint hash identical across LOD [C]; (j) entrances and basements by §2.6's rules — no cellar under the flood band, every basement inside and smaller than its ground floor (§13.2 T29-3, T29-4) [C] |
| O7 content-first land use | must | §4.2 S2, §4.5 S7b, §4.7 S10b, §10.2 | (a) every building has a function and an occupancy (100 %); requested population ± 5 % on ≥ 95 % of seeds [O — MFCG's multiplier]; every person a home (100 %) [C]; every person a work or role (100 %) — a module letter, measured at M4b [C]; (b) hard relation rows satisfied 100 % and soft-row satisfaction ≥ 95 % reported per city — noxious trades downstream or extramural, water trades within 100 m of water, the market hall at a tier-1 junction or gate, inns at gates (§13.2 T16-1) [C]; (c) Moran's I (wealth) > 0 and monotone in the requested gradient [C]; (d) 0 constraint violations; per-capita ratio error against the tables reported; no occupation above its per-capita maximum [O — FTG's "20 adventurers" per 100 people]; (e) reconciliation ≤ 3 rounds [C]; (f) seam discontinuity within §13.7's bands [O]; (g) lazy people stable 100 %; opening a person writes nothing [C]; (h) gazetteer 100 % [C]; block-level use mix within §13.7's bands [O] |
| O19 greenery by prosperity | must | §4.9 rule table | §4.9's acceptance (a)–(g); classes: (a) [C — NG's 23–58 % at identical tags is the weakness]; (b) [C]; (c) [O — MFCG and NG green is leftover space]; (d) at §13.7's canopy threshold [O — FTG minimum 0.14 m]; (e) [P — VG P1; the frame budget is §12.7's]; (f) [C]; (g) at §13.7's city-zoom check [O] |
| O8 fortification network | must | §4.2 S3, §4.4, §4.8, §4.11 | (a) gates at 100 % of arterial crossings, count exact [C]; (b) 0 buildings in the setback band on both faces [C]; (c) tower spacing in band, 0 sawtooth [P — FTG 39 m]; (d) defensible-ground share; castle ≥ p80 among candidates [C]; castle area and compactness in MFCG's band [P]; (e) walled share in MFCG's band (§13.5) [P]; outer curtain on request [C]; (f) 4 / 4 circuit configurations, including two independent enceintes (polycentric nuclei, §4.2 S3) [O]; (g) wall → road keeps plot ids [C]; (h) the wall an entity in every export [C] |
| O12 display list, LOD, style as data, layers | must | §8 | (a) continuous zoom, footprint hash identical per LOD, minimum drawn feature ≥ 2 px, labels above §9.4's floors at every level, no feature pops more than once [O — MFCG has no zoom]; (b) pan and zoom ≥ 60 fps at 40 000 buildings and 200 000 trees on the reference machine and ≥ 30 fps on the low-end device; edit-to-redraw < 100 ms; roof computations per frame after warm-up = 0; ≤ 80 draw calls per tile (≤ 80 × P per view) and ≤ 4 uploads per frame during gestures, every ready tile at first paint and settle (§12.5) [P — NG 528 uploads per hood; FTG's roofs recomputed every render]; (c) screen = PNG = SVG within threshold, 0 silent couplings [C]; (d) glyph ambiguity 0, legend 100 % of the places the viewer's knowledge key admits (§9.2), every visible feature hit-testable [C]; (e) 300 dpi A2 [O]; (f) §8.2's contrast matrix on the rendered city band [C]; (g) first map by §12.5's laws of the building count, the miss above its knee declared for the owner's veto [P]; street-edge recoverability ≥ MFCG − 0.03 (§8.5) [P] |
| O9 persistent document, locks, regeneration, undo | must | §2.9, §7 | (a) save / load / save identical [C]; (b) locked preserved 100 %; outside the effective scope byte-identical (§7.3 item 7 ii) [C]; (c) faithfulness = §7.3 item 7 (iv): Regenerate (keep settings) byte-identical [C]; New random judged by §13.2's calibrated rank campaign, whose design and executed calibration are stated there [O — FTG's "too snug" regeneration]; (d) every operation undoable (enumeration test) [C]; (e) an upgrade keeps 100 % of edited entities or reports each orphan [O — FTG cannot regenerate old towns]; (f) the thirteen MFCG edit asks of §7.4 as scripted B-EDIT scenarios, each reporting its locality share, invariants and re-run cost (§13.2) [O — MFCG: "no way to save those changes"] |
| O16-core report and honest controls | must | §5.4, §7.1, §7.8 | (a) report 100 %; the requested-vs-built diff and every requested feature's delivery tier shown when non-empty [O — MFCG's 28 silent street failures]; (b) auto-resolved values reported 100 % [C]; (d) hidden couplings 0 [C]; (f) every numeric control monotone and continuous by §7.8's statistical rule [C]; (h) seed → map identity 100 % [C] |
| O13-core labels and names | must | §9, §10.4 | (a) 0 protected overlaps, 0 collisions, inside ≥ 99 %, curvature within §13.7's limit, 0 labels crossing holes [O — MFCG covers gates and the keep]; quarter labels at MFCG's count at matched sizes [P]; (c) name–feature consistency 100 % within 250 m [C]; (e) edited names persist 100 % [C] |
| O14-core hinterland and margin | must | §4.9 | (a) farmland per capita ± 20 % [C]; (b) field access 100 %; every farmstead within 300 m of one of its fields and 1 500 m of all; land-use overlaps 0; unused components 0 [C]; (d) roads leave to destinations 100 %, rivers enter and exit [C]; (e) built / map area 0.06–0.25 at every rung (§13.7) [O — FTG's fixed canvas per class]; (h) woods sized to the fuel and timber rows with the import share reported, the farmland mode by size and landscape (§13.2 T26-1, T26-2) [C] |
| O10 intent, constraints, assignment, forms | should (input schema + drift bounds: must hook) | §7.7 | (a) 10 / 10 scripted intent tasks without URL editing [O]; (b) hard targets 100 %, achieved-vs-requested reported [C]; (c) monotonicity [C]; (d) pins 100 % [C]; (e) assignments ≥ 99 % within drift, placed by the one solver under the hard relation rows, infeasibility reported with the nearest count and the closest options (§13.2 T16-1, T16-3) [C]; (f) size error p90 ≤ 10 % [C]; (g) the forms classifier ≥ 90 % over the forms catalogue, `linear-street`, `island-city` and `twin-town` included [C]; (h) edited tables versioned, default path byte-identical [C]; (i) the dossier contract — a map delete of a dossier-backed element re-placed from the same seed, a dossier change mutating the map that exists, one history one digest (§13.2 T20-1 – T20-5, T22-1 – T22-4) [O — no reference has a host contract] |
| O13 full (street names, addresses, annotation) | should | §9 | (b) ≥ 90 % of named streets labelled at neighbourhood LOD [O — no reference names its streets]; (d) 0 spelling errors [C]; (f) annotation layer [C]; (g) addresses 100 % [C] |
| O14 full (rings, presets, wildness, feasibility) | should | §4.9 | (c) wood-edge straightness median ≤ 0.90, canopy monotone in wildness (§13.7) [O — VG's "Some" ≈ "Many"]; (f) ≥ 95 % of the map land-classed [C]; (g) scatter statistics [P] |
| O16 full (thumbnails, drafts, discoverability, responsive, accessible) | should | §7.8 (S0–S4 proxy thumbnails, G-R4), `@plat/app` (§14) | (c) the scripted tasks of §13.4, each in one action where a reference needs a detour, every response ≤ 1 s (replaces "≥ 90 % of testers") [O]; (e) six thumbnails < 1 s at TOWN [P]; (g) editor usable at 768 px [C]; the accessibility contract (§14, §13.4) [C] |
| O12 extras (relief tier, tiled export, low-end tier) | should | §8.2 relief tier; §8.8 tiled export; the low tier (§12) | as O12 (b), (e); the relief tier renders at every rung and is off by default [C] |
| O7 simulation module | should | §10.1, §10.3 `@plat/sim` (M4b) | the same person on every view; `whereIs` deterministic; stored bytes per 10 k population reported; every person a work or role (100 %); the economy and personality content of D-32 derived deterministically from its keys [C] |
| O11 extras (VTT native, per-layer, binary, 3-D, GIS profile) | should | §11 | (g), (h); format validators, CityJSON's included [C] |
| O9 extras (upgrade replay with diff) | should | §7.5, §6.4 retention | the upgrade test; goldens replay under N−1 and N−2 [C] |
| O2 / O6 extras (golden suite, calibration interface) | should | §13.3, §7.6, §13.9 | the declared-shift protocol in CI from M1; every table value replaceable with provenance; the corpus interface of §13.9 present [C] |
| hooks 1–8 (§5.4) | must | 1 addresses + sub-seeds §6.3 / §6.1; 2 lifecycle + edit log + incremental pipeline + conversions — the decline ladders, the use step, the wealth ladder with its floor, the terrain-water and passage kinds §2.8 / §7 / §4.11; 3 assignment input + the one placement solver and the designation mutator + the dossier contract §7.7 / §4.7 S10b, S11; 4 context vector + rules as data §2.5 / §7.6; 5 building-generator interface (`outline` / `compose` / `plan`) + heights + the entrance set and basement + shadow hook §2.6 / §8.4; 6 layers + drainage + any-boundary neighbourhood + island outlines + the island rule, the sewer tier rows and the underground arena's hooks §2.1 / §2.3 / PART II / II.6 / II.7 / §4.2; 7 editable versioned tables + preference layer + the emulation marker and parity presets §7.6; 8 circumstances timeline + stored editable field + the built band and geometry floor §7.7 / §4.5 / §4.11 | every hook field declared in the schema of every entity type and populated when used (registry test, 100 %) [C]; zero cost when unused — with every hook unused, the one-click model time and document size equal a build with the hook fields removed within 2 % (a CI comparison) [C] |
| S1 boundary and seam contract | STAGE-2 (must in base) | §2.5 `SeamContract` from M1, §4.12, PART II | 100 % of districts carry a complete contract; portals 100 %; misalignment 0; Hausdorff 0 for shared entities [C]; at M1 the check is schema completeness only (the field is flat until M2b, so its samples are constants) [C] |
| S3 seam-continuous fields | STAGE-2 (must in base) | §4.5 fields with `hard` flags per seam edge | Δ frontage, area and storeys within §13.7's bands on soft seams [O — NG's hoods cannot share a street] |
| S2 context features inside the neighbourhood | STAGE-2 | II.1 (the request's context), II.3 (context features as constraints), §4.8 water furniture, §4.4 intervallum | (a) a context coverage matrix — district context (waterfront, wall-side, slope, bridgehead, gate approach, sky) × generated feature — with no empty cell: every waterfront district has a quay or bank path, every wall-side district an intervallum or a rear-plot rule [C]; (b) 0 buildings in water; bridges within ± 10° of the channel normal [C]; (c) 0 fragments cut at the close-up frame — the surroundings continue at lower LOD to the frame [C]; (d) S2's blind preference test, run as §13.6's protocol against NG at M5 with the owner as the declared rater [O] |
| S4 composable context templates, functional squares, landmark-centred neighbourhoods | STAGE-2 | II.2 template fabrics, II.3 dispatch table, §4.7 claims, §2.6 footprint templates | (a) every base district kind has ≥ 1 template [C]; (b) the templates' morphologies are separable by generated statistics — a nearest-centroid classifier over §7.7's signature vector, computed per district, assigns ≥ 90 % of template districts to their template [C]; (c) ≥ 90 % of squares on a tier-1 junction or in front of a landmark [C]; (d) typed-square area per 1 000 inhabitants within §13.7's band [C]; (e) a requested landmark delivered ≥ 99 % [C]; (f) rule satisfaction ≥ 95 % [C] |
| S5 NG-class close-up render tier | STAGE-2 | II.4, §8.2 `hatched`, §8.6, §8.4 shadow pass | (a) opening one district at neighbourhood LOD ≤ NG's 10–96 ms at comparable building counts [P]; (b) generation ≤ NG's 64–75 µs and rendering ≤ ≈ 85 µs per building [P]; (c) draw operations per frame and uploads within §12.5's budgets, against NG's 528 uploads per hood and 55–80 % hatch share of operations [P]; (d) the `hatched` style regression — per-wing operation mix and the roof colour law (§8.3) [P]; (e) shadow length ∝ stored height, r ≥ 0.99 [C]; (f) footprint hash identical to the city LOD [C]; (g) city-zoom legibility unchanged with the tier on (B-ZOOM) [C] |
| S6 stage-2 workflow | STAGE-2 | II.4 workflow, §7.1 named actions, §6.1 per-district streams | (a) five variants of one template in five actions, where NG needs a tags dialog or a URL detour [O]; (b) the default path one action with p95 ≤ 0.5 s for a medium neighbourhood [P — NG]; (c) rerolling one district or block leaves 100 % of entities outside it identical in address and geometry, the seam exception of II.4 excepted [C]; (d) addresses, names and footprints preserved across levels, 100 % [C]; (e) 0 hand-offs to another tool [C] |
=== REPLACE ## §16 Build plan — calibration and spikes first, then a viewable town, then editing, then parity, then stage 2 ===
## §16 Build plan — calibration and spikes first, then a viewable town, then editing, then parity, then stage 2

*In plain words.* Before building anything we measure what we still need from the recordings and take a few small new
ones (FTG towns at two sizes, MFCG towns at five seeds per size), then build the riskiest pieces first as short spikes
with pass/fail numbers: the geometry kernel, the bent cut, the fused street layout with its speed gate, and the
determinism machinery. The first real milestone (M1) is a town the owner can look at next to MFCG and FTG. Because the
owner ranks editability first, editing comes next (M2a), before the second look and the rest of parity (M2b). Then full
editing and the API (M3a), the exports and the should-have extras (M3b), hardening (M4), the simulation module (M4b) and
stage 2 (M5). Effort is stated honestly as a range with its basis: about 166–220 expert person-weeks (J-A16.01). The subjects the
owner's roadmap puts later are listed in *Staged by the owner's roadmap*; nothing else is out of scope.

Person-weeks are expert estimates (PLAUSIBLE) for two implementers plus a verifier seat — about 83–110 calendar weeks
at that staffing; staffing per the owner (architecture and rulings on Fable seats; build, verify and measure on Opus
seats). Every milestone ends on executed evidence, never on intention, and every exit writes its `MilestoneRecord`
with the milestone's declared shifts and fails on an undeclared one (§13.3). **The owner's panel at every gating exit:**
M2b ("the base at parity"), M4 ("mastered") and M5 (the stage-2 gate) claim their D-5 verdict only by a rated pass of
§13.6's protocol or by the owner's acceptance recorded in the `D5Record`; an unrated panel follows §13.6 (7) — the build
continues, the milestone's status is *provisional — not rated*, the claim is not made and the panel is offered again.

| milestone | content | exit criteria (executed, not asserted) | est. |
|---|---|---|---|
| **M-1 — calibration and the clean-room inputs** | `docs/CONFIDENCE.md` §6 **#5** FTG face recovery (block sizes inside rings, dividing-road position vs OBB, plot depth and frontage, FTG's plot share of land) and **#10** NG adjacent-footprint pairing; **#2** the NG size sweep; the NG baselines of `docs/IMPROVEMENTS.md` §7.2 (detour index, 4-way share, cycles per km², plot minimum-width distribution, streetwall gap per 100 m); NG's hollow-block frequency and MFCG's inner-lot removal; **the MFCG sweep at five seeds per matched size** (40 / 80 / 130, plain options, plus a river-and-coast variant) with lot-orientation coherence, wall alignment, walled and ribbon shares, district areas, gates, towers, castle and plaza, and every ⟨M-1⟩ number of §13.5 — streetwall continuity on dense frontages, lots per block, T / Y share, intramural dead ends, blocks per ha, inner-lot removal and street-edge recoverability on its plain renders (the metric of §8.5, implemented research-side and cross-checked against the product's implementation on M1's golden renders within 0.01); **FTG captures at BIG_TOWN and BIG_CITY**, three of each — one with FTG's water options nearest to `none` and two nearest to `coast+river`, each capture's id (its folder name), `WaterSetting` and recorded population (the residents its decoded payload holds) recorded in its README for §13.6 (2)'s pairs — over six days on the free daily allowance, decoded with the existing tools; outline anisotropy and turning per 100 m after 10 m resampling on every FTG payload; NG block counts per template at `medium` from the vertex captures; the variety dispersions of MFCG and FTG; **`baselines.json`** generated research-side with `referenceBuild` on every row and committed into `plat/`; **the sanitised implementer digest**, written by one seat and checked by another; the hashed content deny-list; `CLEAN-ROOM.md`'s seat ledger (§17.1) | every §13.5 baseline row present with its provenance — or, for an ⟨M-1⟩ number M-1 could not measure, the row made descriptive and entered in `known-defects.json` by §13.5's ⟨M-1⟩ rule — and every band computed by the band rule; a `docs/calibration/` record per experiment; FTG's six captures decoded, each with its resident count or §13.6 (2)'s nominal fallback, marked; the digest checker's report shows 0 code excerpts, 0 reference word lists, palettes or tables and 0 deny-list hits | 2–3 pw |
| **M0 — kernel, bent cut, fusion, determinism and site spikes** (risk retirement) | (a) `@plat/kernel`: lattice, predicates, one arena per layer with the levels as views, role and owner tables and reference resolution, attraction and contact semantics, batched transactions with stage-end index partitions, booleans / buffers / bands on the arrangement with the CI oracles, OBB / LIR, snap rounding, the straight skeleton with its validator and exact OBB roofs; (b) the **bent-cut transaction** with the hole slit, calibrated on NG's vertex captures after NG's signature is re-measured on curved, round-joined, triangular, C-shaped and holed faces; (c) the **fused-layout spike**: S4 routing + S5 growth + S8 infill on a flat synthetic site at CITY face counts; (d) the **determinism spike**: structured stream keys, lineage-hash minting, the Merkle digest, `dmath`, the time-dilation shim, the allowlist lint with its vendored scan; (e) the **site-and-fields spike**: S1 + S4 + S6 with §12.4's mechanisms; (f) the CI tiers timed on the runner (§13.8) | (a) B-FUZZ 0 crashes / hangs / invalid outputs on 10⁶ random inputs per primitive and on the whole constructive set (§13.1); insert + snap + attract + re-walk ≤ 8 µs per proposal, or §3.7's miss rule applied before M1; S11's geometry share ≤ 3 µs per plot median; §3.7's bars (i)–(ii) and §3.8's bar, with their pre-decided fallbacks applied before M1 if a bar fails; op-order determinism (§13.2); (b) start position σ within ± 0.02 of 0.066 (plain faces) and 0.098 (ring faces), corner within 0.10 of mid-course on ≥ 80 %, arrival ≥ 85° on ≥ 95 %, block-area and cut-length KS by the band rule — on curved, round-joined, triangular, C-shaped and holed faces; (c) **the fusion gate**: S4 + S5 + S8 ≤ 100 ms at CITY, block-area and junction-degree distributions inside the NG bands on the same district shapes and the MFCG street-signature rows of §13.5, no turn cliff, 0 whole-map restarts on 1 000 seeds — if it fails, §4.4's fallback applies before M1; (d) digests identical on Node x86 / arm64, Chromium, Firefox and WebKit, workers on and off, 100 seeds; every stream key distinct; ≤ 0.1 µs per structured key; digest maintenance ≤ 5 % of stage time and a full recompute ≤ 150 ms at CITY; (e) S1 + S4 + S6 ≤ 50 ms at CITY, or §12.4's coarsening fallback applied and re-measured; (f) each CI tier inside its budget, or §13.8's fallback applied | 9–12 pw |
| **M1 — a viewable MFCG/FTG-class town** (the first product milestone) | S0–S11 with row / detached / hovel site plans and heights (compounds in M2b), at all three rungs (§1.1: METROPOLIS is in the goldens, B-CITY, the determinism tests and the diagnostic panel; M2b measures and tunes it); S3 reservations and gate sites; S5 with each trace before its stage's growth; S7 walls / gates / towers / castle; the eager allocation; S13a names with the quarter merge tree (quarter labels at the city band, district names at the district band); the `ink` preset at the city and district bands on the Canvas2D tile pyramid (its close-up and building bands at M2b); SVG / PNG export; **the `.plat` writer and reader for generated towns** (§2.9, §3.9) — the manifest, the content-addressed chunks with §3.9's geometry layout, gzip compression and an empty log — which the document-size test and the *preview* documents need and M2a's log builds on: a saved town of the running output version opens by decoding its snapshot and comparing its recomputed root with `model.digest` (M0's full recomputation), a differing root loading as a corrupt cache by regeneration from the recipe (§2.9 steps 3 and 5); **a document whose `outputVersion` is not the running one is never root-checked: it opens as §2.9 step 2's frozen view — each chunk checked by its content hash, the state decoded for view and export only, labelled "made with oK; not verified by this version" — with the offer to open its recipe under the running version and §6.4's preview notice; the `frozenImport` rebase arrives with M3a's rebases**; the records digest joins the snapshot at M2a, whose reader opens an M1 document of the running output version, which lacks it, by the same regeneration (§2.9 step 5); permalinks marked *preview* (§13.3); the report panel with delivery tiers; the B-CITY harness in the PR and nightly tiers; **the output-version stamp, the shift, cascade and milestone records in `plat/goldens/`, and the stage-isolated golden tooling with the per-stop placement digests (§13.3)**; `SeamContract` on every district; the derivation pool; the milestone-1 gate list of `docs/IMPROVEMENTS.md` §5.1 (O2, O6, O3, O11 schema + PNG / SVG, O1, O4, O5, O18 with a flat field, O17 basic, O8 basic, O12 ink, O16-core). **Named work items:** the M1 content, authored fresh — roster rows for the M1 classes, households, the naming grammar and word lists, the era table, the `ink` palette (≈ 3–4 pw of the estimate); the app shell — one click, basic panel, report, gazetteer and "features in view", the keymap, the accessibility contract, context-help skeleton (≈ 2–3 pw); **amendments b at M1:** the transient arena's open, read-back and release (§3.4), `RungProfile.layers` with `Features.sewers` resolved at S0 (§1.1, II.7.1), the emulation marker on every default cell and the parity presets `MFCG` / `FTG` (§7.6) (≈ 1 pw) | the **D-5 protocol's first run** (diagnostic, §13.6) with its threshold panel; on B-CITY-lite (200 seeds × 4 water settings): 0 tier-6 omissions of requested features and degraded ≤ 5 %, plots with access 100 %, population ± 5 %; **the fusion gate re-run on B-CITY-lite's river, coast and relief configurations with the reordered stages** — pre-decided fallbacks: on time, §4.4's class-boundary move (growth stops at district-scale secondaries everywhere; lanes infill-only), then the CITY model budget re-declared at the measured p95 as a D-18 amendment for the owner's veto; on statistics, the infill band table gains a slope class (face mean slope < 5 %, 5–15 %, > 15 %) calibrated on NG's faces, and the gate re-runs; model within §12.3 at TOWN and CITY with the pool measurement (§12.3's rule for which configuration is primary at each size — its p95 within the pooled law + 10 % at the band's bottom, target and top, below a single worker's on the same generations, digests identical for pool sizes 0–3 on 200 seeds — with that rule's pre-decided outcomes); the label-composition measurement (§8.9); the figure-ground metrics against MFCG's M-1 recoverability, contrast matrix, `ink` symbolisation census, label floors and counts and hairline fidelity (§8.3, §8.5, §9.4); B-ZOOM's role continuity across `ink`'s city → district switch; placement digests identical on Node x86 and in the nightly five-engine run; the walled share and extramural ribbon share in MFCG's band (§13.5); the between-seed dispersion against MFCG's and FTG's; the B-EDIT-lite identity fixtures (≥ 99.9 %); the document-size test (≤ 320 B per building at CITY) and the generated-town round trip — save → load → save byte-identical over the canonical form on B-CITY-lite's towns (§2.9); **a document saved by a test build labelled with an earlier output version opens as a frozen view with no mismatch message**; the control-continuity sweep; the parity report by the band rule; every district carries a complete `SeamContract`; the scripted tasks of §13.4 that M1 supports, keyboard-only included; the first-map, settle and re-raster runs at TOWN and CITY band bottom / default / top (§12.5); the model max clause at TOWN and CITY, judged on confirmed outliers (§12.3); the furniture and snap query round trip (§8.9); the sliced-raster census rows (§8.3); the pan-and-zoom run during an A2 export (§8.9, §12.7); the stamp-tile asset load (§8.10, §12.7); the stamp tiles' seam check (§8.3); the sliced-placement census row, and the export's placement stepped in class 4 during the pan-and-zoom export run (§8.3, §8.9); the pin-pass B-ZOOM fixture (§9.2); the harbour pick's measurement on B-CITY walled coastal seeds — p99 of harbour route ÷ the least-cost path with the wall ignored ≤ 1.5, and if it fails the detour guard becomes the default (§4.2 S3 (4), (7)); the SVG export's transient-list peak (§12.8); memory within §12.8's lines at TOWN and CITY on generated towns at pool sizes 0 and 3 (the load-verification case is M2a's); the font-feature test (§9.2); the SVG and PNG export budgets (§12.7); of amendments b's bars (§13.2): T13-1, T14-1 but its hidden-render clause (that clause at the network stage's intake), T16-4, T23-1's registry test | 36–47 pw |
| **M2a — the editing core** (D-7: before the second preset) | the log and the one replay fold over M1's document format; locks and pins; scoped faithful regeneration; the named actions (Regenerate keep settings, Adjust with the fate report, New random, Same kind new seed); undo / redo as logged events with per-session stacks, the independence check and unshared truncation (§7.4); per-document sessions (§7.4); load verification over M1's reader — the load's recomputation of the decoded state's own digest and of its records digest before its first edit, then edits applied at once during load verification with both mismatch choices (§2.9 steps 3–4); **with the keep, §6.4's link rule that the base is the recipe, with its message — a link is emitted only for a town that rule and §6.4's log rules allow, and a rebased town, a kept saved town included, is offered as its `.plat` file**; replay with S13a per event (§7.3); dry-run validation with conflicts returned as actions; `setAttr`, `delete`, `merge`, `split`, `join`; the app's selection, context panel, lock and the keymap's pointer idioms; B-EDIT at 10³ (PR) and 10⁴ (nightly) with the oracle once per sequence | O9 (a), (b), (d); the oracle's (i)–(iii) green on 10⁴ sequences; a CITY district undo ≤ 30 ms; per-edit validation and fixed-scope edit cost flat within ± 20 % from TOWN to CITY (METROPOLIS joins at M2b, which measures it); "recover from a mistaken regenerate" in one undo; the verification reference mix within §12.6's V + 10 %; open-to-editable within T(B) at TOWN and CITY, and the corrupt-cache fixture — a snapshot with one moved footprint and an unchanged `model.digest` reported and loaded by replay, never verified (§2.9 step 3); the records-mismatch fixture and the §6.2 (iii) keep-and-save gating fixture (§13.2); **a `keptSnapshot`-rebased town's link refused, its `.plat` file offered (§6.4)**; on the reference 300-edit CITY document, an edit made 100 ms after the state becomes editable applies within its §12.6 cost + 10 ms with pool size ≥ 1 (§2.9 step 3); memory at CITY while that document is load-verified, with a district regeneration and a Re-derive from S3 applied during it, within §12.8's line at pool sizes 0 and 3 — or §12.8's fallbacks applied; the rebased-document size test — a CITY document rebased by keeping the saved town, after 20 edits, ≤ 1.25 × the unrebased document, or §2.9's block-group fallback applied | 9–12 pw |
| **M2b — the base at parity** | the prosperity field with drivers and the brush; the full granularity law with the rung modifiers (§1.1) — joins, splits, alleys, back lanes, the deep-interior shares; S10b placement from the roster; compound site plans with the packer; roofs; S12 hinterland presets, greenery rules, outskirts and the suburb regime; harbour, bridges, canals; O13-core street names; O14-core; the bench statistics; **`lit` on Canvas2D at all four bands** with our procedural texture set (≈ 1 pw); **`ink`'s neighbourhood close-up and building band** with the roofs (§8.2); the relief tier; METROPOLIS measured and tuned, with the single-thread METROPOLIS measurement (§4.1), the compositor measurement (§8.9) and the projected-shadow budget measurement (§8.4). **Named work item:** the rest of the base content — the remaining roster classes, institutions, government and religion rows, the greenery and hinterland tables, the `lit` palette (≈ 4–6 pw); **amendments b at M2b:** the designation templates with specialisation and the one placement solver at generation with its relation rules and supply edges (§4.7 S10b, S11), the default band set with the shanty rule and its median-household band (§4.5), the entrance set and the basement decision (§2.6) with the entrance-tick rows (§8.2, §8.3), exposure, the hidden-share rows and passages with the arch-glyph rows (§4.6, §8.2, §8.3), the `states` rows (§8.2), N markets with the principal-market score (§4.2), FTG's hinterland order and modes with the fuel and wood rows (§4.9) (≈ 3–4 pw) | every must-have letter run on B-CITY (1 000 seeds) against its §13.5 or §13.7 band — no letter without a number; every §13.7 threshold due at M2b confirmed or its fallback applied, O19 (g) city-zoom greenery for `ink` and `lit` among them; per-edit validation and fixed-scope edit cost flat within ± 20 % from TOWN to METROPOLIS; B-ZOOM role continuity across every band switch of `ink` and `lit`; O17 / O18 / O19 runs; roster placed 100 %; site plans ≤ 5 µs per plot median; 300 dpi export; ≥ 60 fps at 40 k buildings; METROPOLIS first-map runs at 30 000 / 50 000 / 120 000 people (§12.5); the pool rule, the model max clause and the export-time peak at METROPOLIS (§12.3, §12.8); the query round trip at METROPOLIS (§8.9); open-to-editable within T(B) and memory within §12.8's line at METROPOLIS (§2.9 step 3, §12.8); the moving-sun step budget (§8.4); the light passes and the crown bake of a `path` sun in `lit`, with §8.3's light-step row (§8.4, §12.7); the `lit` export beside a moving `path` sun (§12.7); the METROPOLIS SVG budget (§12.7); the rung-profile orderings of §1.1; **the D-5 protocol passes** against MFCG (`ink`) and FTG (`lit`) at TOWN and CITY (METROPOLIS per D-31), or the owner's acceptance is recorded — unrated: *provisional — not rated*, and "the base at parity" is not claimed; of amendments b's bars (§13.2): T16-1, T16-2, T19-1 – T19-4, T23-1's parity clauses, T24-1 – T24-3, T26-1 – T26-3, T27-1, T27-2, T29-1 – T29-4, T30-1, T30-2, T30-4, and §13.7's item-24 and item-30 thresholds confirmed or their fallbacks applied; S10b's scoring measured on B-CITY-lite and, if its pooled p50 exceeds 48 ms, restated with §12.3's p50 column (§12.4, J-A16.81) | 36–46 pw |
| **M3a — full editing, migration and the API** | warp kernels with whole-step validation; drawn constraints and the "rebuild around my drawings" rebase; assignments and the placement solver; rule-table overrides, the preference layer and the tables editor; migration and upgrade as undoable events with their diff; rebase; **retention of output versions N−1 and N−2** (§6.4); the dependency audit with the locality oracle at full scale; B-EDIT 10⁵ in the milestone tier; the handle-based embedding API (§11.2); the host bridge and `DocResolver` (§11.3, §11.5); S1's water and terrain operators with re-sited crossings and exact re-basing (§7.3), the water operator in §4.11's order with course-knot edits (§7.3 (b)); point-anchored records under a warp (§7.4); the carve edit with §4.11's way rule and the kernel's clear regions (§3.3); the `packs` block and the pack and host-content link refusals (§2.9, §6.4); the naming-input re-draws on table, pack and upgrade edits (§6.3 case (4)) with their renames stored in the events and carried by `confirm`, the dormant naming record of a protected name and field slices; the version-pinned checks of a rebased base across an upgrade and of a frozen view; packs held by a saved redo stack and packs a new version stops shipping; GeoJSON; the app's drawing, warp, brush, assignment and tables-editor tools; **amendments b at M3a:** assignments through the solver after generation, the designation mutator with its record and inverse, `Use` with hand relocation (§4.7, §4.11), the dossier contract — dossier-backed existence, rejection, positive placement, the disruption budget and report (§7.7) — the wealth-ladder edit kinds `relet`, `densify`, `thin` and fusion and splitting as least-disruption re-cuts (§7.1) with the shell's household capacity `relet` reads and the interior ladder's rows (§2.6), sealing and opening a passage and the terrain-water conversions applied by hand; the plan rung's base hooks — its records, its `elaborate` view key, its `plan.*` concerns, its events and rung re-rolls, the elaboration cache (§2.6 beside §2.8's record, §2.9's cache, §6.1's streams and §7.1's events); the knowledge filter, key and reader with the exports' withholding (§9.2, §11.1–§11.3), `report.changed` (§11.3) and `live.stale` (§8.2) (≈ 7–8 pw) | O9 (c) faithfulness — Regenerate (keep settings) byte-identical, and §13.2's rank campaign for New random passing in the nightly tier (a failed campaign is re-run once with the next seed; a second failure is a regeneration defect, fixed before exit) — (e) and (f), the thirteen MFCG asks as scripted scenarios; §7.3 item 7 (v)'s coarse-edit assertions on B-EDIT's terrain and water sequences; the carve fixtures of §13.1–§13.2 (§3.3's clear regions), or §3.3's pre-decided fallback applied before exit; B-EDIT 0 planarity violations and 0 lost faces over 10⁵ sequences; O2 (c)'s carry-over rates, or §13.7's fallback; goldens replay under N−1 and N−2, each retained version ≤ 150 KB gzipped; the bridge convergence test (a host and three headless clients, 1 000 interleaved random events — undo and redo from every client and one owner undo through a chain among them, and one forced load mismatch settled by an owner's keep of the saved town while two editors edit on the replayed town — one digest, 0 lost accepted events; §11.3, §2.9 step 4); the naming-input fixtures of §13.2, in a fresh and in a rebased document (§6.3 case (4)); a link to a town with a non-shipped pack or host content is refused and its `.plat` file replays without them; a kept-and-rebased CITY document upgraded across a field-driver change opens editable and replays to the session's digest, and a frozen o(N−3) fixture shows no mismatch message; a document using a pack the new version stops shipping reopens after `from` leaves the window; GeoJSON loads in QGIS with districts; the GeoJSON with trees byte-identical on the five engines (§13.3); the warp cost measurement — a 150 m brush over a CITY core on B-CITY-lite seeds, Apply within §12.6's budget with §2.6's wing carry and check counted, or §12.6's pre-decided fallback (one check after the final step, F-REDERIVE for a failure) applied before exit; of amendments b's bars (§13.2): T16-3, T17-1 – T17-3, T18-1 – T18-4, T20-1 – T20-5, T22-1 – T22-4, T25-1, T28-9, T28-11, T28-12's `wings` clause, T28-16, T28-17's housing clause, T28-18's `relet` clause, T30-3, T30-5, T31-1, T31-4 – T31-7 | 23–28 pw |
| **M3b — exports, forms and the should-have tiers** | VTT (Foundry-class scene JSON and dd2vtt, one scene per layer); glTF / OBJ; CityJSON; the CBOR twin with its decoder; S0–S4 proxy thumbnails; O10 intent expansion and the forms catalogue with its classifier; O13 full (path labels, addresses, the annotation layer and legend sheet); O14 full (rings, presets, wildness, feasibility); O16 full (drafts, discoverable export, the responsive editor); O12 extras (the low tier); the `@plat/docs` guide and generated release notes; three candidate `house` style sheets (D-1); the ink-family variants `parchment`, `bw-print` and `night` at all four bands (the `night` sheet's occupancy-driven window lights arrive with the module at M4b); random styles with the bounded repair (§8.2) | VTT import with no manual steps; every format validator green; scripted intent tasks 10 / 10; the forms classifier ≥ 90 %; six thumbnails < 1 s at TOWN; every scripted task of §13.4; monotonicity sweeps green at every rung; documentation coverage 100 %; B-ZOOM role continuity across every band switch of the ink-family variants; the random-style shipped-palette fallback ≤ 2 % of 10 000 draws per family (§8.2); the anchored CityJSON file validated with PLAT's extension, or the sidecar fallback taken and reported (§11.1); of amendments b's bars (§13.2): T29-5 | 16–21 pw |
| **M4 — hardening and the incremental path** | the performance tiers and the low-end tier measured on the named device (§12.1); the table-provenance audit, every default cell's `ref:` source and every extension's `extension` marker included (§7.6, §17.1 (6); item 23); **the one incremental path: add a growth stage to an existing town** (surviving entities byte-identical, new entities on epoch components, wall → ring road as `retypeEdges`; §4.11, D-25); output version 1 fixed, ending the *preview* label; release notes naming known defects; **the D-5 protocol's "mastered" run**, with the owner's pick among the three `house` sheets (§13.6 (8)); **amendments b at M4:** the staged engines' hooks — the decline table, the salvage ledger and the dwell lag, the regrowth-first siting order on the grow path, the tunnel and island conversion kinds, S7b (5)'s island count draw and sky allocations under II.6's supply law, the terrain-water kinds, the due mark and the wealth ladder table, the floor's attributes with their migration, the lapse of a rejection at an epoch — with their hook tests (§4.11, II.6 and II.7, with the migration of §7.5) (≈ 2–3 pw) | nightly cross-platform goldens green for two weeks; the epoch test (0 re-rolled survivors); a document with interleaved edits and two epochs replays to the session digest; the conversion test; the 20-epoch heap and document budgets (§13.2); METROPOLIS first map within §12.5's law at 30 000, 50 000 and 120 000 people; "mastered" claimed only when the D-5 protocol passes, rated, at all three rungs (METROPOLIS per D-31) or the owner's acceptance is recorded — unrated: M4 closes with "mastered" *provisional — not rated* and the panel offered again at M4b, M5 and every release; every table value replaceable with provenance; of amendments b's bars (§13.2): T8-1 – T8-7, T10-1, T11-1, T12-1, T15-1, T31-2, T31-3, T31-8 – T31-12 | 13–19 pw |
| **M4b — the content module `@plat/sim`** (after the relation store's schema, which is in the base from M1) | the relation store materialised (family units, relations, memberships); postings and re-matching; occupancy and schedules as a query; the calendar; factions with roles, goals and reconciliation; religions' meetings; events as templates; the economy and personality content of D-32 with its authored tables; the family-tree view | O7's module letters (§15.2); one hour for 50 000 people ≤ 50 ms (§12.7); a scoped regeneration changes 0 relations outside its scope; the family-tree view keyboard-operable and pins nothing | 8–14 pw |
| **M5 — stage 2: neighbourhood composition** | `@plat/hood`: `RingFabric`, `SquareFabric`, `StreetFabric`; the block-content dispatch table and pins; the `hatched` family at all four bands (§8.2); the close-up workflow on any district and on an arbitrary boundary (sky context); the "same kind, new seed" per-district workflow with locks | every district of every B-CITY city opens as an NG-class close-up; portals connected 100 %; shared-edge geometry byte-equal across adjacent neighbourhoods (Hausdorff 0); per-district regeneration ≤ 30 ms and open ≤ NG's 10–96 ms at comparable counts; footprint hash identical to city LOD; every stage-2 letter of §15.2 (S1–S6) run against its number, S4 (d)'s §13.7 band confirmed or its fallback applied; B-ZOOM role continuity across every band switch of `hatched`; the stage-2 gate claimed only when **the D-5 protocol against NG** (twenty pairs over the four templates, §13.6 (2)) passes, rated, or the owner's acceptance is recorded — unrated: M5 closes *provisional — not rated* and the panel is offered with every release until it is rated | 14–18 pw |

**Effort, with its basis (D-20).** Re-derived line by line (PLAUSIBLE; each line a range with its basis):

| line | pw | basis |
|---|---|---|
| parity floors after sharing: (MFCG 46 + FTG map subset 52) × 0.65–0.75 | 64–74 | `docs/CONFIDENCE.md` §1; sharing the kernel, the display list and the document removes 25–35 % of the two floors, not 50 % |
| O1 terrain and hydrology beyond the references' water | 4–6 | priority-flood, D8, rivers by descent, coast–terrain coupling, islands, distributaries, bank classes |
| O9 document and edit system (events with inverses and undo records, dry run, locks, scoped regeneration, the named actions, rebase, migration with diff, retention, the locality oracle, B-EDIT) | 11–15 | neither reference has it; amendments b: the `Use` record and hand relocation, the plan rung's base hooks, the wealth-ladder edit kinds and the regrowth-first order of the grow path (+2) |
| O12 renderer beyond the floors (columnar display list, paint programs, tile pyramid and tile worker, label composition, SVG, print bands, `lit` on Canvas2D, the relief tier) | 4–6 | one drawing path; no second backend; amendments b: the `states` rows, the entrance-tick and arch-glyph rows and `live.stale` (absorbed) |
| O11 exports and interop beyond PNG / SVG / GeoJSON (VTT × 2 per layer, glTF / OBJ, CityJSON, CBOR, CSV, the handle API, the host bridge and resolver) | 6–8 | §11; amendments b: the knowledge key and filter with the reader's and every export's withholding, `report.changed` (+1) |
| O17 + O18 + O19 (plot model, site plans, packer, heights; the field and the granularity law; greenery rules) | 10–15 | new in both references; amendments b: the designation templates and the compatibility table, the band set, the entrance set and basements, exposure, the hidden shares and passages, and O14-core's farmland modes, fuel and timber rows and arable reserve (+3–4) |
| O10 (intent expansion over ≈ 200 parameters, the forms catalogue, assignments, the placement solver) | 8–11 | forms tuned by eye and the D-5 panel; amendments b: the one placement solver with its relation and supply data, the designation mutator, the dossier contract (+4–5) |
| should-have "full" tiers (O13, O14, O16, O12 extras) | 4–6 | §15.2 should rows |
| original content under the clean room (≈ 60–100 roster classes, institutions, households, government and religion rows, naming grammar and corpora, era tables, presets, the symbol set, the procedural textures) | 9–13 | ≈ 40–50 % of CONFIDENCE's 25 pw FTG content line (§3.4's re-pricing), plus presets and symbols; amendments b: the parity presets and the marker on every default cell, the relation templates', room programmes' and interior ladder's rows (+1) |
| `@plat/sim` (relations, postings, schedules, calendar, factions, events, economy and personality) | 8–14 | inside FTG's 125 − 52 = 73 pw non-map scope; the relation schema already in the base |
| the reference app's UI (panels, drawing and snapping tools, four field brushes, the tables editor, the style dialog, the advanced panel over ≈ 200 documented parameters, accessibility, context help, keymap) | 7–10 | no reference line covers it |
| the verification rig (five benches in three CI tiers, stage-isolated goldens with shift and cascade records, the five-engine nightly run, visual regression, the option matrix, control and cost-model sweeps, `baselines.json`, the clean-room scanner, the D-5 tooling) | 8–11 | §13; amendments b: the hook, B-PLAN and underground fixtures and the parity-preset run (+1) |
| mechanisms the lines above do not price (booleans and bands on the arrangement, the derivation pool and its merge, the eager allocation and reservations, per-frontage regions and wings, the label placement engine; the six components below) | 9–13 | 5–7 for the first group; 3–4 (≈ 14–22 working days) for the six components itemised below; amendments b: the transient arena and the M4 hooks (+1–2) |
| **base subtotal (M-1 – M4b)** | **152–202** | |
| stage 2 (M5) | 14–18 | |
| **total** | **166–220** | equal to the milestone sum above (J-A16.01) |

**The six new components** priced by the last line's 3–4 pw (≈ 14–22 working days; PLAUSIBLE): the per-name naming
records and the renames an edit confirms (§2.8, §6.3, §7.1; M1 writes the records, M3a stores the renames), ≈ 3–4
days; `carryWings`, the carry of a stored composition and the wing check decided by pairing (§2.6; M1 in generation,
M3a under warps), ≈ 4–6; crossing sites as a `Bridge` in state `site` and their handling in S1's water operator (§2.7,
§7.3 (b); M1 and M3a), ≈ 2–3; resumable raster jobs, S13b as a resumable placement job and the tile worker's four-class
queue (§8.9, §9.2; M1), ≈ 3–5; the records digest (§6.2; M2a), ≈ 1–2; the shipped stamp-tile asset, with its shared
seam band, and its build tool `plat/tools/stamptiles/` (§8.10; M1), ≈ 1–2 days. The other mechanisms of the same kind
are refinements a line already prices, absorbed by that line (PLAUSIBLE): the load's digest recomputation, its
corrupt-cache path, the version-pinned root checks and the keep-and-save gating (the O9 line's load verification); the
pack held by a saved redo, the pack copy at an upgrade and the link refusal for a kept town (the O9 line's retention and
migration); demotion, `StretchRef`, tombstones per partition, the water-gate hold and the deck strip (the parity floors'
kernel share and the arrangement work); the forced harbour pick and the detour guard (the parity floors' gates and
harbour); the pin pass (the label placement engine); and the integer-centimetre tree positions with their lint, the
PNG row-filter rule and the quantised light steps with their light pass (the O12 renderer and O11 export lines). The
milestone rows carry the six components where they are built — M1 + 2 / + 3 pw, M3a + 1 / + 1, M2a unchanged — so they
sum to the total. **A pass that adds build work prices it here:** it names each new mechanism with the line that
absorbs it, or widens a line by an itemised amount and keeps the milestone rows equal to the total. **Amendments b (2026-09-25 to 27)
are priced that way (J-A16.01):** +13–16 pw itemised in the lines above — O10 +4–5, O17 + O18 + O19 with O14-core +3–4, O9 +2, O11
+1, the content line +1, the rig +1, the unpriced line +1–2, the `states`, entrance-tick and arch-glyph rows and
`live.stale` absorbed by the O12 line — carried by the milestone rows M1 +1 / +1, M2b +3 / +4, M3a +7 / +8 and
M4 +2 / +3, so the rows still sum to the total; the staged engines themselves — evolution,
the sewer and underground stages, the plan rung, SettlementForge's mapping — are not priced, by the roadmap.

The cuts that would shrink the total are recorded for the owner's veto, not applied (J-S6, D-20): the module M4b
(8–14 pw); VTT, glTF / OBJ, CityJSON and the CBOR twin (≈ 3–5 pw); all but three forms (≈ 2–3 pw); the should-have
"full" tiers (4–6 pw) — together a base of ≈ 135–174 pw and a total of ≈ 149–192 pw.

The riskiest items, in order: the fusion timing and statistics on real terrain (M0 c, M1); the bent-cut engine on
concave and holed faces (M0 b); the kernel's own booleans and bands (M0 a; §3.7's pre-decided fallback); the straight
skeleton's robustness (M0 a); the content authoring cost (M1, M2b, M4b — CONFIDENCE §3.4's re-pricing is the warning);
the thin CITY budget headroom (§12); the D-5 protocol's dependence on the owner's time (§13.6 (7) answers it: an
unrated panel never stops the build and never lets a gate be claimed).

**Staged by the owner:** the subjects the owner's roadmap places after the base — stage 2 at M5 above, the others staged
by the owner — each with concrete hooks, are the one list in *Staged by the owner's roadmap*; nothing else is out of
scope — CityJSON is built (§11.1), the host-input contract is decided (§11.4), sharing needs no hosted service (§11.5),
setting packs have their format (§10.4), there is no WASM kernel (§3.7), and the relief tier is a base program (§8.2); amendments b's staged engines — the evolution engine's trigger and durations, the
sewer and underground stages, the plan rung and SettlementForge's dossier mapping — are on that list, their hooks priced above.
=== REPLACE ### 17.1 The clean-room chain (IMP-1; D-29) ===
### 17.1 The clean-room chain (IMP-1; D-29)

1. **Who reads what.** *Research seats* (readers, measurers, the digest writer) may read the findings, `captures/`,
   `research/` and — under the standing ruling — `reference/`. *Implementer seats* (anyone writing code, tables, style
   sheets, content, assets or tests in `plat/`) read only `docs/ARCHITECTURE.md`, the implementer digest in
   `plat/docs/digest/`, the `plat/` repository, published algorithm papers and the public documentation of adopted
   libraries; they never open `research/`, `captures/`, `reference/`, the findings, the critics, `docs/confidence/`,
   `docs/improvements/`, `docs/CONFIDENCE.md`, `docs/IMPROVEMENTS.md` or the red-team files. The citations in this
   document are for traceability; an implementer follows them only into the digest. No code from TownGeneratorOS
   (GPL-3), the FTG Foundry module or any captured bundle is read for implementation, ported or paraphrased (J-A21.01).
2. **The implementer digest.** A digest seat writes `plat/docs/digest/` from the research: behaviours, measured numbers
   (each with its `baselines.json` id or finding reference) and the creators' stated ideas — no code excerpts, no
   reference word lists, grammars, palettes, tables or identifiers. A separate checker seat, which reads only the digest,
   runs the content scan of (5) on it and files a report with it; every change to the digest repeats the check. This
   document is held to the same rule. The hashed scan of (5) needs the deny-list that M-1 builds, so until then **every
   seat that writes this document — a fix-all integration seat, an amendment pass's apply and repair lanes, any
   finishing or repair seat — runs, before its change lands,** the scripted document checks of
   `docs/validation/bench/doc_checks.py`, from the project root:
   `python3 docs/validation/bench/doc_checks.py --sections "⟨every section heading key the change touched⟩"` — the
   content checks (iii) and (vi) over the sections the change touched, the others over the whole document (J-S32):
   (i) *identifiers* — a whole-word, case-sensitive search for the backticked identifiers of
   `research/findings/ftg-payload-visual.md` §7.2 and one further time-setting message name — 36 names, which the script
   reads from the finding or holds research-side, so none is copied into this document;
   (ii) *colours* — every six-digit colour value of the document (`#rrggbb` or `0xrrggbb`) looked up, case-insensitive
   and hex-delimited, in `research/` (its text files, JSON included), `captures/**/README*.md`, `captures/**/*.json`,
   `docs/confidence/`, `docs/improvements/`, `docs/CONFIDENCE.md` and `docs/IMPROVEMENTS.md`;
   (iii) *token 3-grams* — the lower-cased word tokens of the changed sections against every 3-gram of
   `research/findings/*.md` and of the string keys and values of every JSON file under `research/` and `captures/` —
   FTG's content database and every capture body included — taken in document order with purely numeric tokens dropped;
   a hit is a run of three or more consecutive shared 3-grams (five or more tokens in a row that also stand together in
   a finding or a capture) — the size at which a copied list, table row, grammar line or palette shows, while a single
   shared 3-gram ("per 100 m") is ordinary phrasing;
   (iv) *tables* — outside fenced code (a fence may be indented, as inside a list item) every line that starts with `|`
   ends with `|`, no other line sits between two table lines (a table row split over several lines renders as broken
   rows), and every row has its header's number of cells, counting only unescaped pipes (GitHub-flavoured Markdown splits
   a cell at every unescaped `|`, inside a code span too, and drops the cells beyond the header's count, so inside a table
   a pipe in code is written `\|`, which the renderer shows as `|`);
   (v) *pointers* — every `§n` and `§n.m` pointer resolves to a heading of this document;
   (vi) *lists, in any order* (J-S35) — a 3-gram needs the list's order, so a list pasted alphabetised shares none with
   its source: every JSON file under `research/` and `captures/` except the profiler's recordings (call censuses,
   coverage, idle, trace, draw and path records, run reports, metadata, session and index files — code identifiers and
   events, which (i) and (iii) cover) is read for its lists — a dict's keys, an array of strings, one field's string
   values across three or more records — and a hit is a line of the changed sections holding five or more distinct
   whole words of four or more letters that are members of one such list, reported as those words, sorted.
   Each hit is corrected before the change lands or reviewed: a reviewed hit is entered in
   `docs/validation/doc-checks-allow.tsv` with its check, its exact text and a written reason (a capture-citation file
   name, a measured number, a creator's sentence under 15 words quoted for traceability, ordinary phrasing, generic
   vocabulary in our own selection and order, a pointer into another document). The script exits non-zero while any hit
   is unreviewed, the change does not land until it exits zero, and the seat records its counts in its output file (a
   fix-all pass in its integration log, an amendment pass in its assemble and repair reports under
   `docs/validation/⟨pass⟩/` — amendments b's in `docs/validation/amendments-b/assemble-r⟨n⟩.md`). From M-1 the hashed scan of (5) — whose list sets do (vi)'s work on salted digests — also
   runs over this document and replaces (i)–(iii) and (vi); (iv) and (v) stay. The checks' executed calibration is
   recorded in `docs/validation/bench/fixall_scope_r4_cleanroom.out` and `fixall_scope_r5_checks.out` (history:
   `docs/ARCHITECTURE-RATIONALE.md`).
3. **The repository boundary.** The product is its own repository, `plat/`, at the root of this folder, outside
   `research/`, `captures/` and `reference/`. A PR-tier CI rule fails any import specifier, fixture path, script path or
   build input that resolves outside `plat/` (symbolic links resolved). The product's CI never reads the research trees.
4. **Reference numbers only through committed numbers-only files.** Research-side scripts (`research/baselines/`)
   measure the captures and write numbers with provenance (§13.5's `Baseline` rows); the file, `baselines.json`, is
   committed into `plat/packages/testkit/baselines/`, and the parity CLI reads only it. The D-5 panel is assembled
   research-side from the product's PNG exports and the capture images (§13.6); its inputs to the product are three files
   committed the same way into `plat/goldens/d5/⟨milestone⟩/`: `ftg-captures.json` (capture ids, rungs, water settings,
   resident counts) and `ng-counts.json` (NG hoods' building counts), numbers only, which `plat d5 seeds` reads and
   nothing else, and the sitting's `record.json` — numbers, hashes and the owner's answers, no reference image or
   reference data (§13.6 (9)) — which the milestone record and the release notes read.
5. **The content scan.** Research-side, `research/baselines/make_denylist.py` builds the deny-list from the creative
   data the findings and captures record — the references' naming-grammar rule names and terminal words, Markov and
   corpus sample words, palette colour values, FTG's building-type, profession, item and service identifiers and names,
   FTG's Foundry-module message and field names, and texture and image file hashes. The list holds only salted SHA-256
   digests: of single normalised tokens (lower-cased, diacritics stripped) that are not in the spell-check word list
   §9.6 already needs, of token 3-grams in list order (so a copied table is caught even when every word in it is
   ordinary), of exact six-digit colour values, of file bytes, and — for every list the findings and captures record (a
   dict's keys, an array of strings, one field's values across records) — the set of salted digests of its members'
   words of four or more letters, so a list copied in another order is still found (J-S36). `@plat/testkit`'s clean-room
   scanner digests the same way every token of `@plat/tables`, assets, source string literals and comments and the
   digest, in the PR tier, and flags as a list hit any line, or any column of a table, that holds five or more distinct
   words of one list's set; a hit fails the build unless an allow entry with a written reason is reviewed and added — an
   authored roster that shares ordinary building or trade names with a reference list is such an entry, and the review
   decides whether the selection was copied. At every milestone the checker seat also runs a research-side palette
   audit: a shipped palette with three or more colours within ΔE2000 2 of one reference palette fails and is redesigned.
   Every file in `plat/assets` names the script that generated it or its third-party licence (fonts); a file with
   neither fails the build.
6. **Honest provenance.** Every table cell's provenance names where its number came from: `own`, `ref:⟨reference⟩
   ⟨behaviour⟩` (a measured or stated behaviour of a reference, admissible as a calibration anchor — for example the
   castle's 0.75 compactness gate (MFCG), 40 m bridge spacing and 39 m tower spacing (FTG), NG's lane-width law, Poisson
   k = 50), `owner`, `owner-eye ⟨milestone⟩`, `architecture ⟨date⟩`, `corpus` or `host`. Under item 23 a default cell's `ref:` source is read beside §7.6's
   `extension` marker — for example `ref:FTG lifestyle distribution`, `ref:FTG shanty rule`, `ref:FTG farmland modes`,
   `ref:MFCG gate law`. A number that describes a
   behaviour is a fact; a list, grammar, palette or table is creative content and is never reused.
7. **The record.** `plat/docs/CLEAN-ROOM.md` holds the rule, the seat ledger (which seat read which research file, from
   the lane logs), the digest checker's reports and the deny-list's generation record (date, sources, counts — never the
   tokens).
8. **Sources of algorithms.** Published: Shewchuk predicates; snap rounding (Hobby; Guibas–Marimont; Hershberger);
   arrangement booleans by winding number; Bridson Poisson-disc; Felkel–Obdržálek and Aichholzer straight skeletons;
   Chaikin; Visvalingam–Whyatt; Parish–Müller growth; Lloyd relaxation; marching squares; priority-flood;
   Garbrecht–Martz flat resolution; fBm, with ridged multifractal noise and domain warping (Musgrave, in Ebert et al.,
   *Texturing and Modeling*, 3rd ed. 2003; §3.1); the xoshiro128\*\* generator (Blackman–Vigna, public domain; §6.1) with
   Irwin–Hall sums for its normal draws; MurmurHash3's x86 128-bit hash and its 32-bit finaliser (Appleby, public
   domain; H128 in §6.2, `RH32` in §8.1, `H32` in §13.6), checked against the SMHasher verification values; Krüger's
   transverse Mercator series in Karney's formulation, to fourth order in the third flattening (Krüger 1912; Karney
   2011; §11.1); the van der Corput radical inverse and Morton (Z-order) bit interleaving for §8.10's progressive grid
   ranks; Ulichney's void-and-cluster ranking (1993; §8.10); the monotone-chain hull (Andrew) and rotating calipers
   (Toussaint) for the OBB (§3.1); centripetal Catmull–Rom splines and pinned-vertex Laplacian smoothing (§3.1, §4.2,
   §9.3); Dijkstra's and A\* shortest paths (§3.1, §4.2, §4.3); Brandes' betweenness (§4.3); Kruskal's spanning tree
   (§9.3); Lambert shading (§8.2's hillshade); CIELAB and the CIEDE2000 colour difference (Sharma–Wu–Dalal; §8.2); D8
   steepest-descent flow directions and flow accumulation (O'Callaghan and Mark 1984; §2.3, §4.2 S1); the exact
   Euclidean distance transform in linear time (Felzenszwalb and Huttenlocher 2012; §4.5, §12.4); the three-pass
   box-filter approximation of a Gaussian (Wells 1986; §4.5, §12.4); the Merkle hash tree (Merkle 1987; §6.2, D-28);
   context-free grammar expansion in the style of Tracery (Compton, Kybartas and Mateas 2015) and character n-gram Markov
   chains (Shannon 1948) for §10.4's naming engine — ideas only, with our own grammar and corpora; power diagrams
   (Aurenhammer 1987) with area targets (Aurenhammer, Hoffmann and Aronov 1998) for the hinterland lots of §4.9; Kahn's
   topological sort (1962) with the stage id as tie-break for the stage order (§4.1, §4.12); SHA-256 (FIPS 180-4) for
   (5)'s salted digests. For the tests: Pearson's χ² test with Holm's step-down procedure (§13.2), Spearman's rank
   correlation, Moran's I, Kolmogorov–Smirnov distances and SSIM (Wang et al.; §13.4, §13.5); the pair-correlation
   function of a point pattern (Stoyan and Stoyan 1994; §4.9, §13.2, §13.5); Shannon's entropy (1948) for the heading
   and use-mix entropies (§13.5, §13.7); the Jaccard index (intersection over union; §6.3, §7.5); and the Hausdorff
   distance (§3.7, §13.2, II.5). The list is checked against the text by a scripted scan of 119 method names
   (`docs/validation/bench/fixall_scope_r4_methods.out`). An implementer reads each in its published form; the seat
   ledger of (7) records which. The creators' *stated* ideas: twisted bisection, the casing idiom, skeleton labels, the
   proposal queue, dependency ratios, lazy people, integer centimetres — with constants calibrated on our own
   measurements.
9. **Protocol names.** The host bridge's vocabulary is our own (§11.3): the concurrency token is `logHead` (§2.9),
   carried as `baseLogHead` and `currentLogHead`; time is the view key `time`, set by `view.set`, and the simulation
   module advances it with its own command `sim.advance { hours }` (§10.3, §11.3). Schema-level ideas — an event /
   command split, an optimistic-concurrency token — are admissible as ideas; the FTG module's message, command and field
   names are not reused, are in the deny-list, and occur nowhere in this document (check (i) of (2)).
=== REPLACE # Delegated decisions (the owner deferred all judgment; each is final unless vetoed) ===
# Delegated decisions (the owner deferred all judgment; each is final unless vetoed)

Each decision is final unless the owner vetoes it. One paragraph each: the choice (its mechanism lives in the section
named), the alternative rejected and the cost of reversing it later; the plain-words rationale of each is in
`docs/ARCHITECTURE-RATIONALE.md`. D-1–D-7 are the owner's adopted defaults (amendment 7), each tied to its mechanism.
Decisions marked *owner veto* touch a subject the owner keeps (a purchase, the licence, new capability): the program has
taken the most option-preserving default and flags it.

**D-1 — the look.** The default look is clean ink (MFCG family) with IM FELL Great Primer as the label face (§17.2); the
second preset is FTG-like `lit`, on Canvas2D like every preset; a hatched preset serves the close-up (§8.2). The house
style is our own third preset `house`, drafted as three candidate style sheets at M3b and chosen by the owner on the
§13.6 panel at M4, `ink` staying the default unless the owner picks otherwise; with no pick by M4's exit, §13.6 (8)
applies. Rejected: `lit` as the default; a WebGL2 reference backend for `lit`. Reverse: low (a style file).

**D-2 — era and region.** The centre of gravity is high-to-late medieval Western Europe (12th–15th c.), as presets the
corpus phase re-signs through §13.9; walled shares and stage rows per rung are MFCG-calibrated (§1.1, §4.2 S2), and FTG's
lower walled share is reachable as a preset; the regional material shift (§2.6's `regionalShift` rows, off by
default, texture and colour only) is one of its region presets (item 19). Rejected: a hard-coded culture; a 0.35–0.5 walled share (MFCG's shanty
case). Reverse: low (table rows).

**D-3 — realism in the base.** Fantasy exists only as named toggles, each off by default: floating islands and their
conjured rivers — a model setting `recipe.layers.islands`, off by default, that exists only at CITY and METROPOLIS and
only where prosperity supplies it, the sky layer's view toggle showing islands and never creating them (II.6, items 10,
13 and 15; J-A10.01); the `navigable` sewer preset (II.7.2) — the historical sewer network is realism, present by tier
and hidden until its toggle (II.7.1, item 14); the game-system stat pack (D-32); the `night` preset's lights. Rejected:
fantasy defaults. Reverse: low.

**D-4 — the product shape.** A browser-first embeddable TypeScript library with an app on top; permissive dependencies
only (§17.4's checker over the production closure); one generation worker, a derivation pool and a tile worker behind a
handle-based API (§1.7, §11.2). Rejected: a Rust / WASM core from day one; server-side generation. Reverse: medium after
M1 for the core language — a measured hot loop may get a byte-identical WebAssembly accelerator (§3.7), there is no
WASM kernel; low for the worker model.

**D-5 — "mastered".** The owner's eye on side-by-sides against MFCG and FTG at town, city and metropolis, run through the
written blind protocol of §13.6, plus the parity numbers of §13.5; an unrated panel lets the build continue with the
milestone's D-5 status *provisional — not rated*, and "at parity", "mastered" and the stage-2 gate are claimed only by a
rated pass or the owner's recorded acceptance (§13.6 (7)). Rejected: numbers only; an eye with no protocol. Reverse:
none.

**D-6 — naming.** Original English-fantasy naming; setting packs in §10.4's format, the base shipping one pack; further
packs are data. Rejected: reuse of reference corpora. Reverse: low.

**D-7 — weighting.** Realism, editability and plot texture first; speed and export next; novelty last — and the
weighting orders the build: the editing core (M2a) before the second preset and the rest of parity (M2b) (§16).
Rejected: speed first; editing after the lit look. Reverse: none.

**D-8 — 3-D export.** glTF 2.0 (OBJ secondary) and CityJSON 2.0 (§11.1). Rejected: CityJSON left for later. Reverse: low (an
exporter).

**D-9 — no restart path.** "No restart path" is a design property; the acceptance numbers are requested-feature delivery
by ladder tier and p95 time per delivered town on MFCG's worst configurations, with their bars in §13.5. Rejected: "0
whole-map restarts" as the number; a p99-bounded restart tier. Reverse: low (criteria).

**D-10 — simulation depth.** The base holds the roster, the context vector, allocation and placement, households and
lazy people, and the relation store's schema from M1; schedules, calendar, factions' meetings, events, economy and
personality are the optional `@plat/sim` module at its own milestone, M4b (§10.1). Rejected: schedules and the calendar
in the first release; the module inside M4. Reverse: low.

**D-11 — scatter.** Poisson-disc k = 50, all candidates evaluated, builds the per-class ranked tiles once, when the
product is built; per-instance placement is the stamp (§8.10); a measurement (NN p1, pair-correlation) may relax k.
Rejected: k = 30; per-entity Bridson sampling. Reverse: trivial (a table value).

**D-12 — coordinates.** Integer centimetres centred on (0, 0), +y north, under §3.2 (1)'s range invariant. Rejected:
millimetres; doubles. Reverse: high after M1.

**D-13 — the plat.** Five refinement levels as views of one arena per layer (level-tagged edges, per-level face
records), a separate arena per layer and per sky island, unions for multi-face entities (§2.2). Rejected: one flat
subdivision; five separate per-level DCELs (nesting cannot hold on the lattice). Reverse: high after M1.

**D-14 — geometry engine.** Booleans, buffers and bands on the kernel's own arrangement — one engine on every host, with
the oracles and the one pre-decided fallback of §3.7; the straight skeleton built in-house under §3.8's contract and
validator, its downgrades the default paths. Rejected: CGAL (GPL); a JS skeleton port; a runtime pure-JS boolean
fallback (a second engine, different digests). Reverse: low (adapters).

**D-15 — streams.** xoshiro128\*\* streams keyed from §6.1's structured components, the lineage separate from the
address id, concern ids append-only; Enter makes a new document with the successor seed of §6.1. Rejected: one global
stream; a counter-based RNG. Reverse: high after M1.

**D-16 — the fused layout.** Routed arterials between named destinations; reservations and gate sites at S3 and each
enceinte traced before its stage's growth; inside the walls district-scale secondaries plus NG's bent-cut infill with
the measured construction, outside them FTG-shaped growth with explicit legality and stage regimes; districts grown over
the coarse skeleton, feature-named and grouped into quarters; frontage-first plots with the granularity law (§1.4, §4).
Rejected: the four rejected shapes of §1.4; FTG growth down to block scale inside the walls. Reverse: high (the layout
core) — hence M0 and M1's fusion gate.

**D-17 — the enceinte.** Gate sites picked and castle and plaza reserved at S3; stage 1's enceinte traced at S3 from the
travel-cost boundary over its solved gate routes, each later enceinte at S5a from its stage's boundary, both pulled to
defensible ground before that stage's streets grow; gates exactly at arterial crossings with exact N by the measured
gate law; gate plazas; the castle by score with the inside / on-enceinte / outside option; an open waterfront by
default (§4.2 S3, §4.4, §4.8). Rejected: a wall on cell edges; tower-per-vertex; walls traced after growth. Reverse:
low.

**D-18 — budgets as laws** (*owner veto on the misses above the knees*). Model and first-map budgets are per-rung laws of
the building count (§12.3, §12.5), read over every size of a rung, with the derivation pool primary wherever §12.3's rule
keeps it and the single worker as the pre-decided fallback elsewhere; the max clause is judged on outliers confirmed by
solo re-timing (§12.3); the one-click path stays complete at every size; the per-building cost against MFCG is a
declared trade (§12.9). The owner may veto the two declared misses: O3 (d)'s model bars above the sizes §12.3 states,
and O12 (g)'s first-map bar above the knee §12.5 states. Rejected: workers assumed without a merge protocol; matching
MFCG's per-building cost by dropping plot detail; a preview or a coarser one-click path above the knee. Reverse: low
(numbers); ≈ 1 pw for a district-by-district city band above the knee; medium (architecture) if M0 or M1 miss.

**D-19 — defaults and calibration anchors**, all data that costs nothing to change: the codename PLAT and `@plat/*`; the
terrain resolution per rung (§2.3); frame areas, aspect and margin (§1.1, §3.2 (9)); the minimum edge, the attraction
distance, the minimum plot width and angle (§3.2 (2)); the district band from the count law (§4.5); the gate law (§4.2
S3); stage counts and walled shares per rung (§1.1, §4.2 S2); shadows off by default with a fixed sun (§8.4); heights
always populated (§2.6); tower spacing and every band as calibratable table rows (§7.6). Reverse: trivial (data).

**D-20 — effort.** ≈ 166–220 expert person-weeks — the base 152–202 (the content module included) plus stage 2 14–18,
re-derived line by line in §16 (amendments b's +13–16 pw itemised there, J-A16.01); the cuts that
would reduce it to ≈ 149–192 are recorded for the owner's veto, not applied (§16). Rejected: 100–130 pw; cutting scope to
hold it. Reverse: none (an estimate).

**D-21 — the document.** A base (the recipe, or a rebased state) and the ordered log, with a digest-verified snapshot
cache; one replay fold; a rebase when a saved state is kept; output versions N−1 and N−2 retained in the browser and
every version in the CLI; an upgrade is an undoable event (§2.9, §6.4, §7.4, §7.5). Rejected: events only; "the last N
minor versions stay replayable" with no mechanism. Reverse: low.

**D-22 — our own licence** (*owner veto*). Proprietary, all rights reserved to the owner, until the owner chooses
(§17.3); no dependency may constrain the choice. Rejected: leaving it undecided; an open licence by default. Reverse:
low (a licence file) until code is published.

**D-23 — deterministic maths.** Transcendentals through `dmath`, our TypeScript port of the fdlibm 5.3 routines with
Sun's notice, under §6.5 (3)'s allowlist lint, which also scans vendored dependencies (§6.5 (4)). Rejected: in-house
polynomial approximations; trusting the engine's `Math.*`; the `@stdlib` packages. Reverse: low (one adapter and one lint
rule).

**D-24 — goldens.** Stage-isolated goldens (new stage code on frozen upstream outputs), built at M1; end-to-end goldens
re-signed only with a cascade record; every milestone files its declared shifts; a same-seed output change is never let
ride silently (§13.3). Rejected: one whole-model hash per seed; goldens at M4. Reverse: trivial (test tooling).

**D-25 — the evolution hook.** Exactly one built and tested incremental path in the base — add a growth stage to an
existing town, with wall → ring road as a typed conversion — plus the epoch key component and the transformation-event
vocabulary — the decline ladders of buildings, walls and tunnels with the salvage ledger and the regrowth-first siting
(item 8), the island kinds (items 10, 13), use relocation and the designation mutation (items 17, 18), the wealth ladder
with the built band, the geometry floor and the manifested band (item 31), the interior ladder, the dwelling unit and the canonical prior
(item 28 (f)), rejection and positive placement (item 20), fusion and splitting as edit kinds, the terrain-water kinds
(item 25) and the sealing and reopening of passages (item 30) — every kind usable by hand in the base and undoable; the
evolution engine, which schedules them from circumstances, is staged by the owner with its interfaces concrete (§4.11,
II.6, II.7).
Rejected: no incremental path; the full engine now. Reverse: low.

**D-26 — identity.** Opaque lineage-hash addresses with survival and succession (§6.3). Rejected: hierarchical
creation-order ids; a per-kind counter. Reverse: high after M1.

**D-27 — work limits.** Work limits, never wall clock, bound every output-affecting budget (§5.1). Rejected: wall-clock
watchdogs. Reverse: low.

**D-28 — the model digest.** A Merkle root over the eager model's content only, maintained at batch commit (§6.2).
Rejected: hashing the canonical serialisation per batch. Reverse: high after M1.

**D-29 — the clean-room chain** (§17.1): implementers read only this document and a checked implementer digest; the
product in its own repository `plat/` with a path rule; reference numbers only through the committed files of §17.1 (4);
a hashed content deny-list scan in CI and a palette audit per milestone; reference-derived constants labelled by
origin; a seat ledger in `CLEAN-ROOM.md`. Rejected: findings and captures as implementer inputs; path-only CI rules.
Reverse: low (process) — in place before M0's code.

**D-30 — thresholds.** Every threshold has a number now: reference-settable bands by §13.5's band rule from
`baselines.json`; the thresholds no reference can set in §13.7, each with a provisional number, the first milestone that
confirms it and a pre-decided fallback; no placeholder can gate or pass. Rejected: placeholders set by the corpus phase.
Reverse: trivial (data).

**D-31 — matched references** (*owner veto*). TOWN = MFCG size 40 and FTG BIG_TOWN (≈ 5 600); CITY = MFCG size 80 and
FTG BIG_CITY (24 500); METROPOLIS = MFCG size 130. FTG's premium METROPOLIS is not purchased: the METROPOLIS side-by-side
uses MFCG 130, with FTG's published metropolis pictures as an unscored reference card; a one-month premium FTG
subscription for one measured capture is the owner's option. Rejected: a CITY-only FTG comparison; a purchase by the
program. Reverse: low (one capture day if the owner buys).

**D-32 — economy, personality and stats** (*owner veto: new capability rather than repair*). Economy (resource chains,
items and services with prices, stock per building, global price edits), personality (trait sentences, motivation,
mannerism, hobbies), education gated by class and a stat block with profession modifiers are `@plat/sim` content
(M4b), derived from their keys with our own authored tables; their schema stubs are in the base (§10.3); the stat block
is a named game-system pack, off by default (D-3); the family-tree view is in the app (§14). Rejected: leaving them
unrecorded; putting them on the one-click path. Reverse: low (module content; dropping it removes ≈ 2–4 pw from M4b).
Amendments b split it (J-A16.44): the resource and supply edges placement reads and S2's need propagation are base data
(§10.2, §4.7 S10b); prices, stock and trade stay module content.

**D-33 — the two ladders.** They meet at 1 500 inhabitants; size within a rung follows population; per-rung rows live in
`ladder.json` — the `layers` rows of items 13 and 14 among them (J-A13.01); requests below and above the ladder are routed or
clamped as §1.1 states. Rejected: an undefined
boundary; a 2 000 floor leaving a gap below the base. Reverse: trivial (data).

**D-34 — CI tiers.** Three tiers with wall-clock budgets (PR ≤ 15 min, nightly ≤ 4 h, milestone ≤ 12 h) on a stated
runner; the oracle once per sequence; an over-budget job is split, never re-capped (§13.8). Rejected: one full run per
change. Reverse: trivial.

**D-35 — build order.** M-1 → M0 → M1 viewable town → M2a editing core → M2b parity (the second preset; METROPOLIS,
which generates from M1, measured and tuned) → M3a full editing, migration and API → M3b exports, forms and should-have
tiers → M4 hardening and the incremental path → M4b the content module → M5 stage 2; nothing leaves the program (§16).
Rejected: the lit look before editing; moving exports, forms or the module out of the program. Reverse: low (a plan).
=== REPLACE # Staged by the owner's roadmap (this document defers nothing) ===
# Staged by the owner's roadmap (this document defers nothing)

The owner ruled on 2026-09-25: "I would prefer if there is no defer and everything is fixed as soon as possible." This
document defers nothing: every former deferral — the numeric targets, the boolean library, the skeleton, the dd2vtt
profile, CityJSON, SDF text, setting packs, host inputs, a sync service, a WASM kernel, the owner's licence and the
worker pools — is a decision in the body, with its confirming measurement and pre-decided fallback where only an
experiment can confirm it (the entry-by-entry record is `docs/ARCHITECTURE-VALIDATION.md`). This is the one list of
subjects the owner's roadmap places after the base: stage 2 is built in this program at M5 (§16); the others are staged
by the owner. For each, the base carries concrete hooks now, in the sections named; they are staged by the owner, not
deferred (documented, not bugs to re-find).

| subject (the owner's roadmap stage) | the hooks the base carries now | where |
|---|---|---|
| stage 2 — neighbourhood composition (built in this program at M5, after the base) | `SeamContract` on every district from M1; one shared `Seam` record per boundary run with its `baseLane` portals and the seam exception to locality; every seam edge typed, a way-less reservation boundary two districts share as `reserve`; II.1 (3)'s neighbour step, one `corridor_split` edge in a finished neighbour's strip, reversed exactly by demotion whatever edit removes the street (§2.2 rule 3); the `FabricStrategy` slot; the neighbourhood band; the `hatched` programs | PART II, §3.7, §4.6, §4.12, §7.3 |
| stage 3 — manor-style building compositions (after stage 2) | `BuildingGenerator.outline` / `compose` with a cost contract (the base outline inside S11's geometry share; a stage-3 `outline()` admitted at ≤ 10 µs with a declared re-budget); wings (`BaseWing.kind` `rect` / `quad` / `polygon`, a `quad` wing's recorded `corners`, `BuildingInput.fixedWings`), `carryWings`, which keeps every stored wing, and a stored composition's rings and tower centres, on its footprint through every move — the union test a stage-3 `compose()` must pass, run at the stage-3 intake on stored compositions — and heights in the base; the stage-3 intake measurement; item 28's hooks for the plan rung: `'plan'` in `Composition.lod` and `BuildingGenerator.plan`, the plan records with the room's household unit, the interior ladder's rows read at the occupants' band (item 28 (f)), `ElaborationRecord` per rung with the `elaborate` view key and the cache, the `plan.*` concerns keyed by the rung's reroll, the seven plan events, `setRoomUnit` and the rung re-roll of `regenerate`, the transient arena, F-PLAN, §8.5's change markers and storey view, §11.1's plan block and storey scenes, §12.7's row, §12.8's cache line and §13.2's B-PLAN bars that run from stage 3's intake (T28-1 – T28-8, T28-10, T28-12's `plan` clause, T28-13 – T28-15, T28-17's F-PLAN clause, T28-18's `setRoomUnit` clause, T28-19); the entrance set and basement the plan consumes (item 29); the passage room (item 30) | §2.6 beside §2.8's record and §2.9's cache; the kernel's §3.3, §3.4, §3.7, §3.8 and §3.10; the policy §4.1; the streams §6.1; the events of §7.1; the draw of §8.5 and §8.6, the export of §11.1, the budgets of §12.7 and §12.8; the bars of §13.2 |
| the village product (after the town / city) | stages ordered by declared I/O; `EnceinteStrategy` and the enceinte input of every network strategy; tracker-network and houses-along-ways registrations; a village as one district; the ladder rows and the 1 500 boundary; the not-precluded checks of §15.1's VILLAGE-LATER rows; the village rung rows carrying `layers.islands = none`, `layers.sewers = never` and a 0 hidden share (items 13, 14, 30) | PART III, §1.1, §1.6, §4.12, §15.1, D-33 |
| sewers and floating islands (toggles, after the city is mastered) | one arena per layer and per sky island; `LayerSpec`; drainage queryable per cell over frame and margin; `SkyIsland` and `Tunnel` records (the tunnel's invert as a knot profile); the sky pseudo-districts' allocations created by S7b before any island exists; `SkyStrategy`, `IslandRule` and `SewerStrategy` registrations; the sky close-up call; shadows onto the ground layer; the island rule — the rung gate `RungProfile.layers.islands`, the model setting, the count law and the two-supply size law — with `SkyIsland.supply`, `areaHa` and `state` (items 10, 13, 15); the tunnel lifecycle (item 11); the sewer tier rows — `RungProfile.layers.sewers`, `Features.sewers` with S0's draw (item 14) — the underground `LayerSpec` hidden by default with §8.4's depth-band view key and §8.2's `states` rows, the class table's `drain`, `underground` and `undergroundAccess` columns, `Tunnel.navigable` and `headroomCm`, the tunnel's condition read from `existence` and `closure` (J-A11.21), the tunnel profile table, `AccessPoint`, `ContextVector.arena`, `UndergroundRule`'s depth scale, vacancy share and arrangement restriction, the `UndergroundStrategy` slot, the U1–U3 invariants, F-UNDER and §13.2's fixture (item 12) | II.6 and II.7; the ladder §1.1; the records of §2.1 (the arena), §2.3 (drainage) and §2.7 (tunnels and access); the kernel's arena isolation (§3.4, §3.10) and tunnel kerb (§3.7); the stages §4.2 then §4.5; the ladders of §5.2 and the invariants of §5.3; the layer §8.4 and the `states` rows of §8.2; the registry §14 |
| the evolution engine (much later) | epoch events and key components; `EpochInputs`, `EvolutionStrategy`; the `ConversionOp` kinds, decline included; the one built growth path, whose epochs use the crossing sites generation left unused; the decline table with its exposure lottery, the persistence order, the salvage ledger and the dwell lag, and the regrowth-first siting, which binds the built path now (item 8); the tunnel and island decline kinds (items 10, 11); the use step with `UseConversionOp` and pinned assignments (item 17); the epoch-spread mutation (item 18 (c)); the terrain-water kinds (item 25); the wealth ladder — the due mark, the ladder table's durations, churn caps and orderings, the replaceability column, `builtBand` and the floor applied at epochs (item 31); the densification, clearance, sealing and reopening of hidden plots (item 30); the lapse of a rejection and the folding of a dossier event at an epoch (items 20, 22 (e)); `relet` and the interior re-cut (item 28 (f)) | §4.11 and §1.5, D-25; the layers II.6 and II.7; the plot record §2.5; the dossier §7.7; the tables §10.2 |
| calibration against the historical corpus (after the standalone generators) | `CorpusAdapter`; corpus rows in `baselines.json`; `CalibrationRun` as table-version bumps with declared shifts; provenance on every table cell; the tables amendments b adds, listed at §13.9 (5) | §13.9, §7.6 |
| SettlementForge inputs (after the generators are mastered) | the host-input contract and the host bridge; the dossier contract (items 20, 22): dossier-backed existence, the rejection record and its lapse, positive placement, re-application and the disruption report — a data-only, one-way door, the module a separate program at arm's length (§11.3, J-A21.81; the licence §17.3, D-22); `knownTo` as a dossier fact (item 30); the mapping of SettlementForge's own data onto these doors is the staged part | §11.4, §11.3, §7.7 |
=== REPLACE # Appendix A — reading record, and CONFIRMED versus PLAUSIBLE ===
# Appendix A — reading record, and CONFIRMED versus PLAUSIBLE

**Reading record.** The design seats read the three proposals and the three judge reports in full, and
`docs/IMPROVEMENTS.md` and `docs/CONFIDENCE.md` by outline plus the sections their records name; no seat read a
reference source or a captured bundle (by ruling), and every findings fact in this document is cited through a file
that read it in full. The seats' reading records, line by line, are in `docs/ARCHITECTURE-RATIONALE.md` (Part C).

**A.3 CONFIRMED versus PLAUSIBLE, in one sentence.** Every reference number quoted as a calibration target or a
baseline (FTG's zig-zag centimetres, 10.3 m quads, 39 m towers, 83 cul-de-sacs; NG's corner at 0.5 ± 0.1, ≥ 85° arrival,
95–99 % attached; MFCG's casing law, 24 restarts in 58 attempts, ≈ 6.12 persons per building; the timing bars) is
CONFIRMED by the lane that measured or read it and is cited to that lane through the proposals and judges; the
engineering judge's arithmetic checks (birthday bound, `orient2d` bounds, per-plot rates, index rebuild cost) are
CONFIRMED there; every mechanism, constant, budget, band, effort figure, milestone and decision in this document is
**PLAUSIBLE** — reasoning from that evidence — until M-1 and M0 execute it and the B-CITY / B-EDIT / B-FUZZ / B-REF /
B-ZOOM harnesses measure it.

**Amendments b (2026-09-25 to 27).** The pass that folded items 8–31 of the second amendments file into this document
(its landing rows are §0.2; its route sits in `docs/validation/amendments-b/`) read the owner's words, the route and the
Dwellings review — the four findings files and the Fable synthesis in `research/findings/` — as findings only; no seat of
it opened a reference source or a captured bundle. Its rulings are the `J-A` rows of the index. Every mechanism, default
number, bar and effort figure it added is **PLAUSIBLE** until the milestone named beside it in §16 executes it; the
Dwellings numbers it cites — research-side notes, never `baselines.json` rows (§13.5) — are CONFIRMED by the measuring lanes and by the critic that checked them.
=== J-ROWS ===
| J-A15.01 | T15-1 tests the island count against each seed's expected counts under II.6 (4)'s slot law at its own town supply, and each count's reachability on a hook fixture at full supply, over requiring every count 0–3 on the default sweep | §13.2 |
| J-A16.01 | amendments b's build work priced: +13–16 pw itemised over seven lines of §16 — O14-core's farmland work on the must line O17 + O18 + O19, the knowledge key and filter on the O11 line, the `states` and glyph rows absorbed by O12 — and carried by M1, M2b, M3a and M4; the total 166–220; the staged engines unpriced by the roadmap | §16, D-20 |
| J-A23.01 | the parity presets as item 23's proof (T23-1); §17.1 (6)'s provenance values `ref:…` read beside §7.6's `extension` marker; §1.4 points to the principle's home, §7.6 | §1.4, §13.2, §17.1 |
| J-A23.02 | the D-5 MFCG and FTG pairs render PLAT under the matching parity preset, NG pairs and the threshold strips under the default | §13.6 |
| J-A27.01 | FTG's lifestyle distribution a descriptive §13.5 row; MFCG's ward-class shares — the 2017 open-source model's ward deck, the live MFCG typing no ward by class — a note with no baseline row; the band set's schema test and the shanty fixture as T27 | §13.5, §13.2 |
| J-A28.01 | the eight plan bars with the plan block's schema bar, the four elaboration tests and the six interior-ladder bars as one B-PLAN group in §13.2, the shell bar citing §2.6's leaf-digest bar and §3.10's seed-tiling row for the tiling; those whose mechanism the base builds run from M3a, the rest from stage 3's intake; the plan's soft bands a §13.7 row that gates nothing | §13.2, §13.7, §16 |
| J-A28.02 | the one-page summary amended by an appended paragraph, its superseded figures folded in place by the repair round (R11): the markets, the shell's floor and the interior's freedom, the dossier, the licence | the summary |
=== RATIONALE-A ===
| J-A15.01 | Chose to test item 15's count law (T15-1) by comparing, on 500 CITY seeds at each of `wealthLevel` 0.5 and 1, the number of seeds drawing each count 0–3 with its expectation under II.6 (4)'s slot law at each seed's own town supply h(S_town), within ± 3 standard errors, and to prove every count reachable on 1 000 seeds of a hook fixture whose supply gives h(S_town) = 1, over the first text's "every count 0–3 observed" on the sweep and over the verifier's alternative of observing every count among 100 seeds whose supply reaches 0.5, because the supply gate makes high counts rare wherever a town's mean value sits near its own prosperous cut (the verifier's reading, PLAUSIBLE): at h = 0.5 a count of 3 has probability ≈ 0.013 under the default chances 0.6, 0.5 and 0.35, so 100 such seeds miss it in about one run in four and the bar would fail a correct law, while the expectation test fails only a wrong law and the full-supply fixture (a count of 3 ≈ 0.105 per seed) sees every count (§13.2; item 15; repair round 1, VS-32). |
| J-A16.01 | Chose to price amendments b's build work by widening seven lines of §16's effort table by itemised amounts — O10 +4–5 pw (the one placement solver with its relation and supply data, the designation mutator, the dossier contract), O17 + O18 + O19 with O14-core +3–4 (designation templates and the compatibility table, the band set, the entrance set and basements, exposure, hidden shares and passages, and O14-core's farmland modes, fuel and timber rows and arable reserve), O9 +2 (the `Use` record and hand relocation, the plan rung's base hooks, the wealth-ladder edit kinds and the regrowth-first order of the grow path), O11 +1 (the knowledge key and filter with the reader's and every export's withholding, `report.changed`), the content line +1 (the parity presets and the marker, the new tables' rows), the verification rig +1 (the hook, B-PLAN and underground fixtures, the parity-preset run) and the unpriced-mechanisms line +1–2 (the transient arena and the M4 hooks) — +13–16 pw in all, the `states`, entrance-tick and arch-glyph rows and `live.stale` absorbed by the O12 line, carried by the milestone rows M1 +1 / +1, M2b +3 / +4, M3a +7 / +8 and M4 +2 / +3, so the rows still sum to the total of 166–220 (153–204 before amendments b), over absorbing the work silently or re-estimating the whole plan, because §16's own rule is "a pass that adds build work prices it here", and J-S43 set the precedent; the staged engines themselves are not priced, by the roadmap. Repair round 1 (2026-09-27) moved O14-core's farmland work from the should-have line, which the cuts paragraph offers for the owner's veto, to the must line O17 + O18 + O19, because it serves a must letter (O14-core (h)) and item 26's emulation default (VS-06); and it priced the rendering part's knowledge work on the O11 line rather than naming it absorbed, because it spans the reader, every export and the bridge as well as the app's lists (VS-22); the cuts then leave ≈ 135–174 pw for the base and ≈ 149–192 in total (§16, D-20). |
| J-A20.01 | Chose to state the dossier contract's tests — T20-1 – T20-5 and T22-1 – T22-4, T20-5 the one-way door of item 20 (a), proved by an enumeration of the bridge's message kinds and by `report.changed` carrying every record a B-EDIT sequence made (added by repair round 1, VS-04) — in §13.2, to name the contract's hooks in the staged SettlementForge row and to give O10 a letter for it, over leaving them in the determinism seat's notes, because R9 makes §13 the one home of every test and the owner's authority rule ("the map does not edit the dossier") deserves an acceptance letter a milestone can fail (§13.2, §15.2, *Staged by the owner's roadmap*). |
| J-A21.01 | Chose to keep the licence private — §17.3 and D-22 byte for byte, J-S10 standing — and to record that the owner's GPL-3 intent of 2026-09-25 was withdrawn on 2026-09-27 ("then lets stay private for now", after the inspired-versus-derived distinction), over folding the GPL-3 consequences the amendment had drafted into §17, because the owner's later word is the authority and the proprietary default is the option-preserving one (an open licence can be granted later by one act and never withdrawn). Consequences: TownGeneratorOS stays an idea source only, its 2026-09-25 permission to consult and adapt code withdrawn, which §17.1 (1) already states, so no sentence was added there (the owner's instruction); dependencies stay permissive-only (§17.4), so no library ever constrains the choice; the module stays a separate program talking to SettlementForge through a data-only bridge (§11.3), retained by choice because it keeps every later option open, not because a licence requires it; the design records that the work is inspired, not derived — methods, measured behaviour and published descriptions re-implemented independently, provable by the clean-room chain, the document checks and the notices file. The kernel seat's J-A21.31, re-stated under this ruling, keeps CGAL's licence ground (§17.4's permissive-only closure) beside its stack and one-engine grounds; its first premise, that the module would be GPL-3, is withdrawn with that intent, and D-14's and §17.4's GPL exclusions stand unchanged. |
| J-A23.01 | Chose the parity presets `MFCG` and `FTG` as the proof of item 23 — T23-1: with a parity preset every `extension` cell reads 0 or off and B-REF's rows hold; with the default preset the extensions run — and §17.1 (6)'s provenance values `ref:⟨reference⟩ ⟨behaviour⟩` beside §7.6's `extension` marker as the way a reader tells an emulated default from our own tendency, with §1.4 and §17.1 (6) pointing to the principle's home, §7.6, in one sentence each, over a marker only in §17.1 or a principle stated in every stage section, because the determinism seat's cell schema (J-A23.71) already carries the marker and a principle stated more than once would be a duplicate — repair round 1 cut §1.4's paragraph and §17.1 (6)'s restatement to those pointers (VD-35b, VS-38) (§1.4, §7.6, §13.2, §17.1). |
| J-A23.02 | Chose to render PLAT's side of the D-5 panel's MFCG pairs under the `MFCG` parity preset and of its FTG pairs under the `FTG` parity preset (§7.6), and the NG pairs of M5 and the threshold panel's strips under the default preset, over rendering every pair under the default preset, because three homes (§4.1, §4.7 S10b, §7.6) already state that the side-by-sides run the parity presets, because item 23 makes the emulation the base the default builds on — "the base at parity" and "mastered" are claims about that base — and because the default preset's extensions are proved by T23-1 and shown to the owner in the threshold strips; NG has no parity preset, so its pairs run the default. Reversing it is one sentence of §13.6 (3) and the three homes' pointers (§13.6; item 23; repair round 1, VS-01). |
| J-A27.01 | Chose to carry FTG's lifestyle distribution as a descriptive §13.5 row and MFCG's ward-class shares as a note with no baseline row — the shares are the 2017 open-source model's ward-deck composition (§4.5's receipt), because the live MFCG types no ward by class (§1.4) and a `baselines.json` row needs a capture and a build — and to prove the default band set by a schema test and the shanty fixture (T27-1, T27-2), over a target row, because the default band set reproduces those distributions by construction and the parity preset equals them by definition — a target that passes by construction proves nothing (J-S1's classes), while the schema test catches a band set without a middle band or a table without a row for a band (§13.5, §13.2; the note's form by repair round 1, VS-16). |
| J-A28.01 | Chose to state the plan rung's bars as one B-PLAN group in §13.2 — the eight hard bars and soft bands of the Fable synthesis with the plan block's schema bar (T28-19), the four elaboration tests and the six bars of item 28 (f) (T28-13 – T28-18) — with the shell bar (T28-14) checked by the shell's leaf digest (§2.6's bar, §5.3's interior-ladder row) and §3.10's seed-tiling row proving only the tiling; the bars whose mechanism the base builds — the click-order and cache tests T28-9 and T28-11, T28-12's `wings` clause, the interior ladder's schema test T28-16, T28-17's housing clause and T28-18's `relet` clause — run from M3a and the rest from stage 3's intake; and the plan's soft bands form a §13.7 row that gates nothing; over scattering the bars through §2.6, §5.2 and §12.7 or running every B-PLAN bar from stage 3's intake, because R9 makes §13 the one home of every acceptance bar, the synthesis's numbers (5 ms, 20 ms, 4 KB, 8 MB) are budgets of §12.7 and §12.8 that the bars cite, and a bar whose mechanism the base builds must run when the base builds it — the owner's own concern, every household housed without a new plot, would otherwise first run at stage 3 (§13.2, §13.7, §16; the milestone split, T28-18 and T28-19 by repair round 1: VS-03, VS-20, VS-23, VK-18). |
| J-A28.02 | Chose to amend the one-page summary by one appended paragraph that adds the owner's later rules in plain words (the markets, the shell's floor and the interior's freedom, the dossier as authority, the private licence), over rewriting the summary around them, because the pass's guard forbade its editors a REPLACE of the title block and the summary while another pass might rewrite the banner beneath the title; the superseded phrases the paragraph first named — "the market square", the effort figure (J-A16.01) — were folded in place by repair round 1 under canon R11 (the summary carries only canonical figures), the banner above the summary's heading untouched (the summary; VS-08). |
=== END ===
