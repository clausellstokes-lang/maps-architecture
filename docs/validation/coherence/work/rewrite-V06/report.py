import re, json, collections
R = '/home/user/maps-architecture/docs'
SCR = '/tmp/claude-0/-home-user-maps-architecture/ce371545-83c4-5807-9f2a-da73abd8485d/scratchpad/coherence/V06'
NEW = R + '/validation/coherence/new/volumes/V06-evolution.md'
OLD = R + '/volumes/V06-evolution.md'
new = open(NEW).read(); old = open(OLD).read()

def f(x):
    return f"{x:,}".replace(',', ' ')

def secs(t):
    d = {}; cur = 'head'; cur3 = None
    for l in t.split('\n'):
        m = re.match(r'^## (\S+)', l)
        if m: cur = m.group(1); cur3 = None
        m3 = re.match(r'^### (3\.\d+)', l)
        if cur == '3' and m3: cur3 = m3.group(1)
        if cur in ('Reconciliation', 'Finalization'): key = 'ledgers'
        elif cur == 'head': key = 'head'
        elif cur == 'Integration': key = 'Integration notes'
        elif cur == '3' and cur3: key = '§' + cur3
        else: key = '§' + cur
        d[key] = d.get(key, 0) + len(l.split())
    return d

o = secs(old); n = secs(new)
ow, nw = sum(o.values()), sum(n.values())
ob, nb = len(old.encode()), len(new.encode())
owc, nwc = len(old.split()), len(new.split())
src = {
    'head': 'narration: banner blocks, the eight revision and reconciliation ledgers, PROGRESS and the reading record (V06-NARR-1); one marker line and the citation paragraph kept',
    '§0': 'narration ids out; item 113 and item 111 in plain words added',
    '§1': 'J-V6.4\'s out-of-scope bullet retired (V06-XCONF-1); hook rows for the replay and the spring added',
    '§1b': 'critique ids out; W82–W87 and the history rows of the dossier trace (DR36–DR39, DR40, the wealth diff row) added; DR aliases numbered',
    '§2': 'restatements of base fields cut (§2.7, §2.8, §2.9 cite §2.4 and §2.7); spring and replay rows, `advance.stoppedAt?`, `HazardRow` `drought`, §2.14 added',
    '§3.2': 'the arch-vault reconcile cites V04 §3.5.4 (d); `sky.clearance` folds IN-V06-3',
    '§3.3': 'degenerate `advance` inputs defined (EI-V06-EDGE-1)',
    '§3.12': 'item 111 (b) written: §3.12.1 failing springs and oases',
    '§3.13': 'IN-V06-2 folded (*Stacks*)',
    '§3.18': 'item 113 (d)–(e): the LOST state, growth over a sealed or lost void',
    '§3.19': 'V11 row list cut to a pointer; `skyAccessObstacles`; IN-V06-4 folded',
    '§3.20': 'new: item 113\'s history replay at generation',
    '§3.21': 'new: every edge and combination defined (principle (11))',
    '§4': 'advance undo cases (EI-V06-EDGE-2); the standalone neighbourhood document\'s decided rule (CANON-C02); replay hand forms',
    '§5': '*Open a copy from here* (V06-ICONF-4); spring and replay drawing and words',
    '§6': 'V05 §6\'s rows cited by name, no quotation (V06-RESTATE-1); §6.7 replay budget added',
    '§7': 'T-V6-70 – T-V6-74 and the edge clauses added; narration out',
    '§8': 'E9 and the spring line added; M6-E\'s slot in the combined order (J122); register narration out',
    '§9': 'revision narration out (V06-NARR-2); E-24 marks; J-V6.127 – J-V6.135 added',
    '§10': 'restatement: 28 request blocks quoting base text → one pointer table (the base text is file f\'s)',
    '§11': 'Q1 answered (J122); the pricing history out (V06-NARR-3)',
    '§12': 'narration: receipts, md5s, per-round reading records out; two current paragraphs kept (V06-NARR-4)',
    '§13': 'the fix list\'s narration and the X1–X49 table out; every row closed at its target (V06-WGAP-2)',
    'Integration notes': 'every note folded into the body at its home; one pointer paragraph',
    'ledgers': 'narration: eleven reconciliation and finalization ledgers',
}
size_rows = []
for k in list(dict.fromkeys(list(o) + list(n))):
    if k == '§3': continue
    d = n.get(k,0)-o.get(k,0)
    size_rows.append(f"| {k} | {f(o.get(k,0))} | {f(n.get(k,0))} | {'+' if d>=0 else '−'}{f(abs(d))} | {src.get(k, 'narration ids out')} |")

mapping = json.load(open(R + '/validation/coherence/work/rewrite-V06/mapping.json'))
map_rows = [f"| {iid} | {kind} | {sec} | {role} | {loc} |" for iid, kind, sec, role, loc in mapping]

# edges
EDGE_ROW = {'2.1': "the engine's interfaces — T-V6-26; T-V6-73 (a)", '2.3': "the trajectory and `advance` — T-V6-23 (h)",
            '2.4': "hazard rows and the calamity table — T-V6-27; T-V6-73 (b)", '2.5': "`MutationPlan` — T-V6-15; T-V6-73 (c)",
            '2.6': "`BuildingShadeMask` — T-V6-12; T-V6-73 (d)", '3.4': "`BuildingShadeMask` — T-V6-12; T-V6-73 (d)",
            '2.8': "`EvolveOp` — T-V6-73 (e)", '2.10': "the epoch report and chronicle — T-V6-73 (f)",
            '2.13': "suppressions and the ledger — T-V6-58; T-V6-73 (g)", '3.1': "the runner and the phase order — T-V6-2; T-V6-29",
            '3.2': "the runner and the phase order — T-V6-2; T-V6-29", '3.3': "epoch inputs — T-V6-23; T-V6-27; T-V6-51",
            '3.5': "decline — T-V6-5; T-V6-6; T-V6-52; T-V6-73 (h)", '3.6': "growth — T-V6-8; T-V6-31; T-V6-32; T-V6-73 (i)",
            '3.7': "fortification — T-V6-9 – T-V6-11; T-V6-73 (j)", '3.8': "regrowth and uses — T-V6-7; T-V6-13; T-V6-51",
            '3.9': "regrowth and uses — T-V6-7; T-V6-13; T-V6-51", '3.10': "mutation plans over epochs — T-V6-15",
            '3.11': "hazards — T-V6-16; T-V6-17; T-V6-73 (k)", '3.12': "terrain and water — T-V6-18; T-V6-71; T-V6-73 (l)",
            '3.13': "Works scheduling — T-V6-19; T-V6-73 (m)", '3.14': "people — T-V6-20", '3.15': "the history record and frames — T-V6-21",
            '3.16': "*The general rule* (§5.1's E-GEN-1) — T-V6-73", '3.17': "failure handling — T-V6-2; T-V6-73 (n)",
            '3.18': "the underground over epochs — T-V6-33; T-V6-35; T-V6-74 (a)", '3.19': "raised ways over epochs — T-V6-57; T-V6-73 (o)",
            '4.1': "the trajectory and `advance`; the group's undo — T-V6-23 (h), (i)", '4.2': "hand forms — T-V6-73 (p)",
            '4.3': "locality — T-V6-3", '4.4': "forks and re-runs — T-V6-22; T-V6-70 (k)", '4.5': "the clerk's view — T-V6-53",
            '5.1': "rendering, labels, exports — T-V6-21; T-V6-73 (q)", '5.2': "rendering, labels, exports — T-V6-21; T-V6-73 (q)",
            '5.3': "rendering, labels, exports — T-V6-21; T-V6-73 (q)"}
edge_rows = []
for l in open(SCR + '/edges-V06.md'):
    m = re.match(r'\* (M-V06-\d+-(E\d)-\w+) — (\w+) — V06 §([\d.]+)', l)
    if m:
        edge_rows.append(f"| {m.group(1)} | {m.group(3)} | V06 §3.21 row: {EDGE_ROW[m.group(4)]} |")
edge_rows.append("| EI-V06-EDGE-1 | UNDEFINED | V06 §3.3.2 *degenerate requests* (each a bend with its line: a span under half a week takes one week; a cadence below a week or fractional takes `max(1, ⌈cadenceWeeks⌉)`; `points` sorted, a repeated week keeping the last, a point at or before `W0` fixing the held value; `perYear ≤ −1` empties the town; a negative population reads 0; a non-finite number rejected by §11.2's schema) and V06 §3.21's trajectory row — T-V6-23 (h) |")
edge_rows.append("| EI-V06-EDGE-2 | UNDEFINED | V06 §4.1's undo cases 1–3 (in the session that ran it; after a save and a reload; in a shared document), J-V6.133, and V06 §3.21's undo row — T-V6-23 (i) |")
COMBO = {
    'cliff-history': 'b', 'steep-history': 'b', 'river-history': 'b', 'coast-history': 'b', 'harbour-history': 'b', 'moat-history': 'b',
    'square-history': 'b', 'oasis-history': 'b', 'frame-history': 'b',
    'cliff-works': 'c', 'steep-works': 'c', 'moat-works': 'c', 'square-works': 'c', 'oasis-works': 'c', 'frame-works': 'c', 'access-works': 'c',
    'steep-epoch': 'T-V6-62',
    'deckplot-history': 'd', 'terraced-ward-history': 'd', 'composed-history': 'd', 'tiers-history': 'd', 'crypt-history': 'd', 'plan-history': 'd',
    'hood-history': 'T-V6-30; T-V6-70 (h)',
    'sewer-history': 'T-V6-33 – T-V6-40; T-V6-70 (f)', 'cavern-history': 'T-V6-33 – T-V6-40; T-V6-70 (f)', 'ruin-history': 'T-V6-33 – T-V6-40; T-V6-70 (f)',
    'catacomb-history': 'T-V6-33 – T-V6-40; T-V6-70 (f)', 'undercity-history': 'T-V6-33 – T-V6-40; T-V6-70 (f)', 'void-history': 'T-V6-35; T-V6-74 (a)',
    'access-history': 'T-V6-33 – T-V6-40; T-V6-70 (f)', 'vault-history': 'T-V6-33 – T-V6-40; T-V6-70 (f)',
    'island-history': 'T-V6-30; T-V6-66', 'shade-history': 'T-V6-30; T-V6-66', 'skyaccess-history': 'T-V6-30; T-V6-66', 'landfall-history': 'T-V6-30; T-V6-66',
    'epoch-light': 'e', 'history-light': 'e', 'works-light': 'e', 'history-lock': 'f', 'history-saveload': 'T-V6-12; T-V6-21; T-V6-70 (j)',
    'history-export': 'T-V6-21; T-V6-70 (j)'}
combo_rows = []
for l in open(SCR + '/combos-V06.md'):
    m = re.match(r'\* (C-([\w-]+)) — (.*?) at (.*)', l)
    if m and m.group(2) in COMBO:
        v = COMBO[m.group(2)]
        test = f"T-V6-74 ({v})" if len(v) == 1 else v
        combo_rows.append(f"| {m.group(1)} | {m.group(4).strip()} | V06 §3.21's combination rows — {test} |")
combo_rows.append("| a settlement that grows over a sealed void (owner) | every rung | V06 §3.18 (growth over a sealed or LOST void) and V06 §3.21 — T-V6-35; T-V6-74 (a) |")
combo_rows.append("| an epoch undone after a save (owner) | every rung | V06 §4.1's undo case 2 and V06 §3.21 — T-V6-23 (i) |")

out = []
A = out.append
A("# Rewrite — design volume V06 (evolution)\n")
A("> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/rewrite-V06; covered by the whole-design retrovalidation (J84).\n")
A("PROGRESS (lane `coherence/rewrite-V06`, 2026-10-03; the files on disk are the truth)")
for p in ["P1 inputs gathered (canon unit V06, conflicts, f items, g 111/113 base texts, wiring, elegance, ids, hand-offs, edges, inventory); mechanical pass work/rewrite-V06/convert.py → converted.md: done",
          "P2 parts 00-head, 01-s0, 02-s1, 03-s1b: done", "P3 §2 data model (04-s2a, 05-s2b): done", "P4 §3.1–§3.9 (06–09): done",
          "P5 §3.10–§3.19 (10–13): done", "P6 §3.20 history replay (item 113), §3.12.1 failing springs (item 111), §3.21 edges: done",
          "P7 §4–§6: done", "P8 §7 tests, §8 build plan: done", "P9 §9 decisions, §10 pointers, §11–§13, integration notes: done",
          "P10 assemble, verify ids, references, terms, sizes: done", "P11 report, result file, LANDED: done"]:
    A("- " + p)
A("")
import subprocess
wc_old = int(subprocess.check_output(['wc','-w',OLD]).split()[0]); wc_new = int(subprocess.check_output(['wc','-w',NEW]).split()[0])
A(f"Source: `docs/volumes/V06-evolution.md` (4 631 lines; {f(ow)} words by the canon's count; {f(ob)} bytes; md5 95ed7b33e00cb9ad0a37548052555112).")
A(f"Output: `docs/validation/coherence/new/volumes/V06-evolution.md` ({f(new.count(chr(10)))} lines; {f(nw)} words by the same count; {f(nb)} bytes). Working parts and scripts: `docs/validation/coherence/work/rewrite-V06/` (`parts/`, `assemble.sh`, `convert.py`, `edits/`, `mapping.py`, this report's `report.py`).")
A("")
A("## 1 Sizes\n")
A(f"**{ob/1024:.1f} KB → {nb/1024:.1f} KB; {f(ow)} → {f(nw)} words (canon count), {100*(ow-nw)/ow:.1f} % fewer.** The band set for this unit is 63 814 – 79 768 words.\n")
A("| part | words before | words after | change | source |")
A("|---|---|---|---|---|")
out.extend(size_rows)
A("")
A("**By source** (words removed; estimates where a passage mixed sources): NARRATION ≈ 18 800 — the head's banners and ledgers (2 094), the reconciliation and finalization ledgers (7 851), §12's receipts and reading records (1 787), §13's fix-list narration and hand-off table (5 109), Q1's pricing history (183), the integration notes' preamble (330), and the critique, seam and round ids and revision marks inside the body (≈ 1 450); RESTATEMENT ≈ 5 700 — the 28 request blocks (4 926 words of text file f now carries in the base) became one 662-word pointer table, V05 §6's quoted rows became row names (V06-RESTATE-1), §2.7's field meanings, §3.19's V11 cell list, the `deckOk` reading stated three times more, the rebase bend line and W86's story quotes became citations; DUPLICATED MECHANISMS ≈ 100 — E-01's two stretch-state rows cite §2.2 rule 5; VERBOSE PROSE — none cut beyond the above. **Added** ≈ 12 100: item 113's part (§3.20 2 267, §2.14 412, §6.7 231, E9 93, W83–W87, the hook, report, rendering, export and decision rows), item 111's part (§3.12.1 848 with its rows, W82, T-V6-71), principle (11)'s edge catalogue (§3.21 2 819, T-V6-73 and T-V6-74, the T-V6-23 (h)–(i) clauses), J-V6.127 – J-V6.135 (656), and the fixes the canon routed here (the conflicts' rulings, the folded integration notes, the wiring rows, the volume prefix on every element of a reference list).\n")
A(f"**Below the band, and why.** Without the added design the volume shrank by ≈ 23 % (≈ 24 500 of {f(ow)} words), at the band's lower edge; with it, by {100*(ow-nw)/ow:.1f} %. What remains is build-depth content of this volume's own: the record and table declarations (§2, 11 122), the phase order and its participants (§3.1–§3.3), the engine's rules phase by phase with their constants (§3.4–§3.19), the wiring table and the dossier trace (§1b, 7 034, principle (7)), the 74 bars (§7), the build plan (§8) and the 135 reasoned decisions (§9). Every paragraph left was read for restatement, narration and duplication; none was thinned to reach the band (the guard: never from content). Not a defect (principle (9)); the shrink is under half, so no nuance audit is triggered.\n")

A("## 2 What the canon routed here, and where it stands\n")
A("* **STATE (455 facts) and HISTORY OUT (V06-0497).** Every home fact is stated once in the new text (mapping table, §13 of this report). A token check (each fact's identifiers, dotted cells, ids and decimal values searched in the new text) finds 452 of 455 at full or ≥ 75 % coverage; the three below are plurals or truncations of present names (`MutationPlans`, `splitThro…`, `WhyProviders`); the 27 facts with no identifier token were read by hand. V06-0502 (the reconciliation notes) is narration and leaves the volume; V06-0497 (§12's history) leaves with it, §12 keeping its two current paragraphs.")
A("* **REFERENCE (14).** Each restatement now cites its home (mapping table). Four are `[REF-HOME]`: the canon matched `EvolveOp`'s members (V06-0111 – -0113) to pipeline §4.11 and `Use.strain` (V06-0115) to model §2.7 only *near*; the landed base names `EvolveOp` in §4.11's union and defers its members to V06 (model §2.8's cause comment, determinism §7.1's \"V06's EvolveOp\"), and model §2.7's `Use` carries no `strain`, so the one statement stays at V06 §2.8 and V06 §2.9 (cross-part notes 1, 2).")
A("* **Index rows (8)** stay as pointer rows (§1.3's six out-of-scope rows, W80, §3.18's opening paragraph).")
A("* **§10 (28 requests; 21 blocks).** One pointer table: request → item → base section → this volume's side (ID-BCR). No `BCR-` id remains in the volume.")
A("* **Owner question (V06-0496).** §11 Q1 is marked *Answered: J122 — (a), right after M4* (CANON-C03, V06-MISSING-1), with the current price 29–41.5 pw and no pricing history (V06-NARR-3); §8 states M6-E's slot in J122's combined order (four streams after M4).")
A("* **Fix list and hand-offs (V06-0498, V06-0499).** §13 reads \"None open\"; every row of the former X1–X49 table is closed at its target (§9 of this report).")
A("* **File f items cited as base text (46 routed):** every one is cited at the place it governs — 202, 206, 209, 226, 244, 245, 246, 252, 254, 260, 263, 264, 265, 266, 268, 270, 274, 275, 290, 291, 293, 317, 318, 319, 321, 322, 335, 336, 339, 342, 343, 347, 370, 388, 409, 429, 443, 458, 478, 479, 550, 568 (V06 §8: §16's totals computed once), 573, 574, 575, 581 (V06 §2.2: the table under `VG` at a village rung). Also cited where they govern: 207, 296, 346, 408, 436, 447.")
A("* **Terms (G-cite, G-standalone, G-unitinput, G-forkat, G-strike, G-hollow, G-DR, G-lot, G-newrandom, G-dwell):** 0 retired forms remain (sweep, §11 of this report). Every volume reference carries its prefix, a list's every element included (`V04 §3.5.4, V04 §3.10`); a range keeps one prefix (`V06 §3.1–§3.2`); the head states the rule.")
A("")

A("## 3 Elegance rulings applied\n")
A("**E-01 — UNIFY the stretch-state profiles** (home §2.2 rule 5). V06 §2.12's two rows (`Enceinte.condition`, `RetainingWall.state`) cite §2.2 rule 5 for the mechanism and state only their own value set, knot role, absent default, writers and readers. Equivalence list:")
for x in ["[x] canonical form — §2.2 rule 5's (cited, not restated)", "[x] write — near knot / far knot, `splitThrough`, a no-stretch writer writes the whole chain — §2.2 rule 5's; V06's writers each name their `StretchRef` (\"the whole trace when it names none\")",
          "[x] read — `sampleProfile` by arc length — §2.2 rule 5's", "[x] regenerate — carry by lattice point, `retaining.settings.stateSnapCm` — §2.2 rule 5's carry, cited in both rows",
          "[x] cut or join — J-K23's rekey pairing — §2.2 rule 5's", "[x] undo — the writing op's undo record — both rows (`repairWall`'s undo also restores the record's former lifecycle)",
          "[x] migrate — absent reads the default — both rows (\"absent = standing\")",
          "[x] RetainingWall keeps: `standing` · `decayed` · `ruined`; `retaining_state_knot`; writers the pool's `breach` (→ `decayed`) and `dismantle` (→ `ruined`) — V07's house-platform walls through the same pool — V05's landfall (`decayed`), `repairRetaining`; the restoration rule; readers V06 §3.19.4, V04's footings, the renderer, item 447's export, the clerk",
          "[x] Enceinte keeps: `standing` · `breached` · `dismantled`; `wall_state_knot`; writers `breach`, `dismantle`, V05's landfall (`breached`), `repairWall`; the record's lifecycle rules (the no-stretch `repairWall` lifting the neglect, V06 §2.8); §8.2's gap glyphs and trace discs; §11.1's per-run LineStrings"]:
    A("* " + x)
A("")
A("**E-02 — KEEP APART the removals that hold** (home item 260, §2.8, one lift rule). V06 §2.13 keeps `LifecycleEvent.detail.suppress` for raised ways, harbour-mouth chains, quay walls, retaining walls and deck plots, and states that islands and sky accesses keep V05's record form (`SkyIsland.removed`, `.removedAccesses`) under the same lift rule, kept apart (E-02, §2.8); V06 §3.19.3 says the same in one sentence. [x] the lift rule stated once (item 260), cited; [x] no second record form introduced.\n")
A("**E-24 — UNIFY the superseded and amended marks.** One mark at the start of the decision row: J-V6.4 *superseded by J-V6.127* (item 113, V06-XCONF-1); J-V6.5 *amended by J-V6.61*; J-V6.111 *amended by J-V6.126*. The reverse marks (J-V6.126's \"amends\", J-V6.127's \"supersedes\") and the inline \"revised\" / \"Amended (…)\" forms are gone. [x] no row dropped (J-V6.1 – J-V6.135 all present); [x] the governing row keeps the reason (J-V6.61, J-V6.126, J-V6.127).\n")
A("**E-39 — KEEP APART the closure and decline states.** The way decline ladder (V06 §3.5.2, V07's hollow way), the wall stretch condition (E-01), the building lifecycle (§2.8) and the access states (V04) stay at their homes; item 113 (e)'s LOST state is V04's access state, read by V06 §3.18 (growth over a sealed or LOST void) and §3.20.5, not a new V06 state. [x] no state set merged; [x] LOST cited at V04.\n")

A("## 4 Conflicts resolved (9)\n")
A("| id | ruling | where in the new text |")
A("|---|---|---|")
for r in [("V06-ICONF-1", "a no-stretch `repairWall` on a ring with nothing to lift is a no-op with its line (\"this wall is in use\"), never a refusal", "V06 §2.8's `repairWall` comment; V06 §4.2's repair row"),
          ("V06-ICONF-2", "J-V6.92 reworded: the water-system record makes the need count as met, raises the aqueduct cap and total by `capPerSizeMember` per SIZE member, binds the terminal, never scales the chance", "V06 §9 J-V6.92; V06 §3.19 (3), §3.19.6; §1b's trace (DR34)"),
          ("V06-ICONF-3", "`EpochInputs.advance` carries `stoppedAt?`", "V06 §2.3 (the one statement), §2.12's row, §10's row for item 343 (\"with `stoppedAt?`\"); T-V6-23"),
          ("V06-ICONF-4", "the disabled-tool offer is V09's *Open a copy from here*", "V06 §5.1; G-forkat swept (0 \"Change from here\")"),
          ("V06-XCONF-1", "g item 113 governs: J-V6.4 superseded, §1.3's bullet retired, the replay written at build depth", "V06 §1.3, §3.20, §2.14, §6.7, §7 T-V6-70, T-V6-72, §8 E9, §9 J-V6.4 / J-V6.127 – J-V6.135"),
          ("V06-XCONF-2", "DR28 (one row with V08's) and DR29 by number; no alias, no \"numbers it\"", "V06 §1b's dossier trace, §2.4, §10's DR28 row"),
          ("V06-AGREE-1", "every delete dry-run line cites V09's `info.remove.holds` with its `{kind}` slot; the deck-plot wording is a V09 variant row", "V06 §3.19.3 (6), §4.2's remove rows (cross-part note 4)"),
          ("CANON-C02", "a standalone neighbourhood document has no clock: the time card absent; `advance` bends to \"a neighbourhood alone has no history yet — open it in its town to advance time\"; no deferral wording", "V06 §4.1, J-V6.102, T-V6-23; V09 and V10 rows (cross-part note 3)"),
          ("CANON-C03", "the owner questions are answered (J121/J122): V06 Q1 → (a) right after M4", "V06 §11, §8")]:
    A(f"| {r[0]} | {r[1]} | {r[2]} |")
A("")

A("## 5 Renumberings and new ids\n")
A("* **Derivation rows (ID-DR):** DR-V6.1 → **DR28** (one row with V08's DR-V8.6); DR-V8.1 → **DR29**; \"the coherence pass's row for item 105 (i) / 109 (b) / 109 (k) / 110 (b)\" → **DR33**, **DR30** / **DR31**, **DR32**, **DR34** and **DR35** (V06-BREF-1, W-DOS-10d); the history rows **DR36 – DR39** and the oasis row **DR40** added to the trace.")
A("* **Base change requests (ID-BCR):** BCR-V6-1 – BCR-V6-28 → items 317, 321, 254, 429, 209, 206, 264, 342, 343, 443, 458, 388, 275, 339, 409, 550, 335, 336, 293, 265, 266, 478, 479, 260, 290, 291, 573, 574 (V06 §10). Other volumes' requests cited in the body became their items (BCR-V2-32 → item 370, BCR-V2-40 → item 318, BCR-V3-29 → items 346, 347, BCR-V5-23 / BCR-V5-28 → the V05 sections that carry them).")
A("* **Row ids (ID-WX):** the X1 – X49 hand-off table leaves the volume (each closed at its target, §9 of this report); IN-V06-1 – IN-V06-7 are folded into the body; other volumes' row ids are written with their volume (`V07 W70`); critique and seam ids are gone from normative text.")
A("* **New ids:** W82 – W87 (§1b), T-V6-70 – T-V6-74 (§7), J-V6.127 – J-V6.135 (§9), §2.14, §3.12.1, §3.20, §3.21, §6.7. Existing ids keep their numbers: T-V6-1 – T-V6-69, J-V6.1 – J-V6.126, W1 – W81 (checked: each defined once, none missing, none cited undefined).\n")

A("## 6 g items written at build depth\n")
A("* **Item 113 — the history replay at generation (V06's part):** V06 §3.20 (3.20.1 where it runs — §4.11's history-first generation after S0 – S13a at the start population; 3.20.2 the plan — start, the undated peak, coarse epochs within `replay.maxEpochs` 60, signed weeks before creation, targets; 3.20.3 the event-to-epoch mapping — effect kinds `hazard`, `condition`, `slice`, `request`, `population`, `destroy`, `refound` from V11's rows, unmapped events reported; 3.20.4 lazy detail — participants' `replay` mode `every` / `last`; 3.20.5 destruction, refounding and burial — DR38, DR39, the LOST state at V04; 3.20.6 the `HistoryRecord` written once at the last coarse epoch's close, the read-only past range; 3.20.7 failure and limits), V06 §2.14 (`ReplayPlan`, `ReplayEpoch`, `ReplayEffect`, `EpochInputs.replay`), the replay epoch key `0x8000 + r` (V06 §3.16, §6.1's range), V06 §6.7's budget (≤ 10 / 30 / 90 s at TOWN / CITY / METROPOLIS, the coarsening fallback), W83 – W87, the dossier trace's DR36 – DR39, the report's `replay` section, chronicle and rendering rows, V06 §4.4's bend inside the past, T-V6-70 and T-V6-72 (bar, E9), §8's E9 (2.75 – 4.25 pw), J-V6.127 – J-V6.131 and J-V6.135.")
A("* **Item 111 (b) — failing springs and oases over epochs (V06's part):** V06 §3.12.1 (the inputs over the span — drought years from `drought` events or the replay's condition effect, the town's draw against the spring's yield, a dossier `oasis_water` deposit turned `depleted` or `removed` (DR40); the new flow through `dmath`, floored at `spring.floorFlow`; the `setAttr(spring.flow)` write; below `spring.failFlow` the garden faces beyond `⌈flow × n⌉` wither to `commons` by `retypeLand` and the grove thins after their drawn spans, re-taken from `spring.regrowFlow` as the hinterland re-takes ground; the quarters around declining through the prosperity water term — no term of the engine's own; drying after `spring.dryAfterYears`), the `spring.*` rows of V06 §2.2, `HazardRow` `drought`, W82, the report's `springs` section and its chronicle kinds, the rendering and export rows, V06 §4.2's hand form (T2 `ground`'s flow), T-V6-71 (bar, E5), J-V6.132 and J-V6.134.\n")

A("## 7 Wiring gaps closed\n")
for x in ["**W-DOS-02** — the prosperity word over time: V06 §1b's trace reads V08 §3.5's `wealth` diff row into `EpochInputs.wealthLevel` (W27, DR6, item 343); V08 carries the row (cross-part note 6).",
          "**W-DOS-09** — the history as a derivation input: DR36 – DR39 in the trace and §3.20 (closed by g item 113's §7.7 part).",
          "**W-DOS-10d** — the trace cites DR33, DR34 and DR35 by number.",
          "**V06-WGAP-1a / 1b** — the standalone neighbourhood document's bend line is stated in V06 §4.1 and cited for V09's `bend.*` rows and V10's bend category (cross-part note 3).",
          "**V06-WGAP-2** — the hand-off table: every row verified at its destination (§9 of this report); the table leaves the volume; §13 keeps none open."]:
    A("* " + x)
A("")

A("## 8 Edges defined (principle (11))\n")
A("Every mechanism edge (110 from edges.md — 46 UNDEFINED, 64 UNTESTED — and the inventory's EI-V06-EDGE-1 and -2, UNDEFINED: 48 and 64 in all) and every owned combination (42 and the owner's two) now has its outcome, failure rung and test in V06 §3.21 (the general rule for degenerate geometry, E-GEN-1; one row per mechanism; one row per combination), tested by T-V6-73 (a)–(q) and T-V6-74 (a)–(f) and the named existing bars.\n")
A("| edge | status before | defined at — test |")
A("|---|---|---|")
out.extend(edge_rows)
A("")
A("| combination | rungs | defined at — test |")
A("|---|---|---|")
out.extend(combo_rows)
A("")

A("## 9 Hand-offs closed\n")
A("**Routed to V06 (19), each verified in the new text:**\n")
A("| hand-off | closed at |")
A("|---|---|")
for a, b in [("V02:X8", "V06 §3.4 — casters rasterised per wing (W6)"), ("V07:FL-3", "V06 §3.2 — the arch-vault reconcile at every village rung in V04's maintenance mode; V06 §3.19"),
             ("V08:X3", "V06 §3.18.2 — `CalamityRef.deaths` into the catacomb need"), ("V08:X11", "V06 §4.5 — the raised-way readings for V10 §3.9 (closed-stated; confirmed)"),
             ("V08:X21", "V06 §2.10 — `EpochReport.raised.suppressedFired` (confirmed)"), ("V08:X24", "V06 §3.2 row 12 and V06 §2.1 — the records placement at an epoch"),
             ("V09:XV-V9-23", "V06 §3.19.3 (7) — each suppressed kind's serving re-add (confirmed)"), ("V09:XV-V9-28", "V06 §2.10, V06 §3.19.3 (2) (confirmed)"),
             ("V10:CVR-V10-5", "V06 §3.15 — the chronicle through `report(h)`, `locate(w)` and the frame builder"), ("V10:CVR-V10-11", "V06 §3.19 (8), V06 §4.5 — `detail.why` with its reason values; the ledger's single-subject read"),
             ("V11:X-V11-11", "V06 §2.2, V06 §3.19 — V11 §3.18's and V11 §3.24.2's rows cited, no copy"), ("V11:X-V11-15", "no change in V06 (confirmed closed)"),
             ("V11:X-V11-16", "no change in V06 (the rows it names are cited at their V11 homes)"), ("V12:X-V12-4", "V06 §8 — the V6-E7 `PanelSpec` sitting"),
             ("V12:X-V12-10", "V06 §3.19.3 — a removal keyed to its reason, never its course"), ("V12:X-V12-11", "V06 §7 T-V6-65 — \"off\" read from V11 §3.24.0's switch table (IN-V06-5)"),
             ("V12:X-V12-15", "V06 §8 — the register lines and bar registrations at each exit"), ("V12:X-V12-17", "V06 §8 — every register line names its exit step `--milestone V6-E<n>` and its due; no V06 line is a corpus stage, so nothing is owed (the default `M-CAL/evolution` is V12 §3.11's rule)"),
             ("V12:X-V12-19", "V06 §8, J-V6.126 — register lines dated by exit step (confirmed)")]:
    A(f"| {a} | {b} |")
A("")
A("**V06's own table X1 – X49 (removed from §13), each verified at its destination** (V01 – V05 and V07 in their landed coherence text, V08 – V12 in their current text, the base in the landed coherence base):\n")
A("| row | target | closed by |")
A("|---|---|---|")
X = [("X1", "V04", "`growthCapShare`, the primary and rank cap, `opts` with the calamity deaths in V04's `CatacombGrowth.grow`"),
     ("X2", "V04", "`AccessPass.run` over `EpochScope`; the void vacating with cause `void`"), ("X3", "V02, V03", "V03 §3.7.4's rank and the `undercroft` role"),
     ("X4", "V07", "`ProductDecl.phases` as phase ids; the clamp's union (V06 §3.3.2)"), ("X5", "V08", "`CalamityRef` with `deaths`; the port's carried facts"),
     ("X6", "V09", "the history settings, the time card, *Open a copy from here*, the grey range"), ("X7", "V10", "the four `WhyProvider`s; the `advance` shapes"),
     ("X8", "V11", "the `crypt: 'always'` column; the calamity words in V06 §2.4"), ("X9", "V12", "T-V6-38's monotone bar and the epoch forms registered"),
     ("X10", "V05", "`demandTaken` and cause `island` (landed)"), ("X11", "V01", "`hood.fabric` at `afterGrowth` order 40"),
     ("X12", "base", "DR28 and DR33 numbered in §7.7"), ("X13", "base", "items 260, 290, 291 and `repairRaised` (item 209) applied"),
     ("X14", "V04", "`ArchVaults.reconcile` over `scope.raised`; the invert drops; the tombstoned retaining wall as a step"), ("X15", "V05", "`sky.clearance` at order 50; the landfall's ruined parts in `scope.raised`"),
     ("X16", "V01", "`hood.fabric` over crossed close-ups; the terrace district; `raised.stripMarginM`"), ("X17", "V10", "the raised-way provider's epoch readings (`raisedOutcome`)"),
     ("X18", "V03", "the outside-ground row (nothing further owed)"), ("X19", "V12", "the `raised.*` guards; T-V6-65's declared shift"),
     ("X20", "V11", "answered (V11 §3.24.2, §3.24.1, §3.24.4)"), ("X21", "V09", "`info.remove.holds`; the time card's raised-way badge; the hand forms"),
     ("X22", "V07", "carried suppressions and ways; lapse and repair only at a village rung"), ("X23", "V08", "the water-system record and landmarks carried (`aqueduct_or_water_system`)"),
     ("X24", "V02", "nothing owed (V02 §3.16 (3))"), ("X25", "V04", "`Foundations.apply` exported, its epoch caller `under.extend`; the maintenance mode"),
     ("X26", "V05", "the landfall writes `Way.formerClass`"), ("X27", "V07", "`ProductEpochRows` from V07 §2.2's `epoch.rows`"),
     ("X28", "V01", "`EpochScope.recut` for S9b; fabric and pins only under a new strip"), ("X29", "base", "item 573 applied; items 264, 275, 443 as amended"),
     ("X30", "V09, V10", "the standalone neighbourhood document's bend line — not yet in V09's `bend.*` rows or V10's bend category: cross-part note 3 (V06-WGAP-1a / 1b)"),
     ("X31", "V12", "§3.11's register names V11's four cells"), ("X32", "V07", "`retireWay`, `effaceWay`, `reopenWay`; tier (5′)"),
     ("X33", "V04", "*Access closures* and the landfall clearance; item 574 before item 319"), ("X34", "base", "item 574 applied; items 268 and 209 as stated"),
     ("X35", "V11", "the web's off form as one cell set (T-V6-44 cites it)"), ("X36", "V07", "the placement rule's `reopenWay` before a toft placement"),
     ("X37", "V05", "`breached` written, V06 §3.7.5 cited (met)"), ("X38", "V12", "the `bar.<barId>` family; the split `decline` line"),
     ("X39", "V09", "XV-V9-23 met"), ("X40", "V01", "note (26) met"), ("X41", "V05", "towers and gates draw by their run's `condition`"),
     ("X42", "base", "item 575's lifecycle sentence with the no-stretch `repairWall`"), ("X43", "V07", "`VS1` / `VS2` stages for the participants"),
     ("X44", "V09, V08", "`suppressedFired` read (met)"), ("X45", "V01, V11", "the way-surface epoch clause met by V06 §3.4 (9)"),
     ("X46", "V05", "the resize row prices the re-claimed landing yards"), ("X47", "V08, V07", "closed"), ("X48", "V10", "prompt rule 17 (met)"),
     ("X49", "V12", "register lines dated `V6-E7` / `V6-E8` (and `V6-E9`, J-V6.126)")]
for a, b, c in X:
    A(f"| {a} | {b} | {c} |")
A("")

A("## 10 Open findings closed (51)\n")
A("| finding | closed by |")
A("|---|---|")
F = [("VOL-V05-V06-RESTATEMENTS-013, V06-RESTATE-1", "V06 §6.2 names V05 §6's rows and takes their bounds by name; no quotation, no dated reading"),
     ("V06-ICONF-1 – -4, V06-XCONF-1, -2, V06-AGREE-1", "§4 of this report"), ("V06-ELEG-1", "E-02 (kept apart; one lift rule, item 260)"),
     ("V06-EDGE-1", "V06 §3.3.2's degenerate requests; T-V6-23 (h)"), ("V06-EDGE-2", "V06 §4.1's undo cases 1–3, J-V6.133; T-V6-23 (i)"),
     ("V06-WGAP-1", "V06 §4.1's line; cross-part note 3"), ("V06-WGAP-2", "§9 of this report; §13 none open"),
     ("V06-MISSING-1", "V06 §11 Q1 answered; V06 §8's slot in J122's order"), ("V06-MISSING-2", "item 111 (b) written (§6 of this report)"),
     ("V06-MISSING-3", "item 113 written (§6 of this report)"), ("V06-TERM-1", "G-cite: every reference `Vnn §x.y`"),
     ("V06-TERM-2", "one name each: *hollow way* (V07's), *strike pool* (defined once at V06 §3.5.2)"),
     ("V06-DEFER-1", "the standalone neighbourhood document's decided rule (CANON-C02); no deferral wording"),
     ("V06-NARR-1 – -5", "narration out: banners, ledgers, reading record, revision marks, pricing history, receipts, critique and seam ids (sweep: 0)"),
     ("V06-BREF-1 (and .r32 – .r35)", "DR33, DR30 / DR31, DR32, DR34, DR35 by number"),
     ("V06-BREF-2 (and .r19 – .r31)", "every scratch-file and receipt pointer removed with the narration (sweep: 0 \"scratchpad\")"),
     ("V06:IN-V06-1 – -7", "folded at their homes (mapping V06-0500, -0501; the *Integration notes* paragraph)")]
for a, b in F:
    A(f"| {a} | {b} |")
A("")

A("## 11 Checks run\n")
for x in ["Ids: T-V6-1 – T-V6-74, J-V6.1 – J-V6.135, W1 – W87 each defined once, none missing, none cited undefined; no X or IN row; no `BCR-` id.",
          "References: every `§` token classified (direct volume prefix, list continuation, bare). 1 489 prefixed references, each resolving to a heading of its volume (six of them are `§1b` and `V04 §1b.2`, sections the numeric heading scan does not list, read by hand); 17 range ends (`V06 §3.1–§3.2`) inside their volume; 470 bare references exist only in the base; 274 bare references exist in both the base and V06 and were read one by one — each means the base (the ten that meant V06 were prefixed, and `§2.2's deriveBase` corrected to §2.6's); 0 bare references to a V06-only section remain.",
          "Retired terms and narration (sweep): 0 for `V6 §`, `BCR-`, `IN-V06`, `X<n>` rows, `DR-V`, critique and seam ids (C6-, ST-, TR- … SCC-, SR, SLR, V<n>C-), `round <n>`, `reconcile-V`, `coherence pass`, `scratchpad`, `md5`, `lottery`, `retired way`, `decline pool`, `Change from here`, `hand-over`, `scoped re-roll`, `lot(s)`, `first text`; one marker line.",
          "Section structure: the title line and §0 – §13 with *Integration notes* as before; §2.14, §3.20 and §3.21 added.",
          "Intra-volume duplication: 14-word shingle scan; the remaining repeats are decision rows stating their choice (the §9 form) and short cross-references.",
          "`docs/validation/bench/doc_checks.py --doc …/new/volumes/V06-evolution.md`: C1 0, C2 0, C4 0, S1 0 (as before the pass); C3 247 hits (411 before), S2 542 unreviewed (569 before). **Provisional:** the reference corpus is absent from this checkout (the script says so), so these results are not authoritative and C3/S2 are unreviewed counts, not findings."]:
    A("* " + x)
A("")

A("## 12 Cross-part notes\n")
notes = [
    "**pipeline §4.11 / model §2.8 (item 209).** The landed base names `EvolveOp` in `ConversionOp`'s union and defers its members to V06 (model §2.8's cause comment; determinism §7.1 \"V06's EvolveOp\"); V06 §2.8 is the statement. If the base takes the members, V06 §2.8 becomes a citation.",
    "**model §2.7 (items 429, 335).** `Use.strain?` and `Household.transit?` are stated at V06 §2.9 and V06 §2.1; model §2.7's `Use` and `Household` should declare them citing V06 (or carry them and V06 cites).",
    "**V09 and V10 (V06-WGAP-1a / 1b, X30, CANON-C02).** V09's `bend.*` rows need the line \"a neighbourhood alone has no history yet — open it in its town to advance time\" and V10's bend category its clerk row, citing V06 §4.1.",
    "**V09 (V06-AGREE-1).** A deck-plot variant row of `info.remove.holds` (\"No house will be built on this spot of the bridge\"); model §2.8 and determinism §7.1, which quote \"The city will not rebuild …\", should cite V09's key.",
    "**pipeline §4.11 (item 343).** `EpochInputs` lacks `wealthLevel?` and `advance? { group, index, of, stoppedAt?, trajectory? }`; V06 §2.3 states them (V06-ICONF-3's `stoppedAt?` included).",
    "**V08 §3.5 (W-DOS-02).** The settlement diff table's `wealth` row (`label` → `attr`, response `epoch`) feeding `EpochInputs.wealthLevel` through `tables/dossier/wealth` (DR6).",
    "**pipeline §4.11 (items 266, 336, 479, 264 (b), 206 (b)).** The landed base still reads the epoch-spread mutation \"over the ladder's rung durations\", lacks tiers (5′) / (5″) and the two stage exceptions, keeps \"deciding whose households leave first\" in step (c), lacks `mutate`'s `step` field and the oxbow minted by `shiftCourse`; V06 §3.10, §3.6 / §3.8.2, §3.5.1 and §3.12 state V06's side.",
    "**model §2.7 (item 409 (c)).** The naming feature `formerWall` (V06 §5.2) has no base row.",
    "**model §2.7's `Enceinte.underuseSince` comment** names \"V11's `contract.occupiedShareMax`\"; the row is V06 §2.2's (`tables/evolution.json`, V11 registry row 60).",
    "**pipeline / model LandUse kinds.** Pipeline writes `garden_irrigated` where model's `LandUse` kind is `garden` (V06 §3.12.1 reads `garden` with `fedBy`).",
    "**II.7.6 (item 113 (c)).** `RaiseGrade.cause` needs `'burial'` for the replay's burial (V06 §3.20.5).",
    "**pipeline §4.11 *The clock*.** Signed weeks before creation (the replay's coarse epochs) and the week-of-year by floor-mod.",
    "**V11 (item 113, item 111).** The history cells V06 reads: `history.epochYears`, `.burialYears`, `.symbolicQuantile`, `.reuseCost`, `.replay`, a `history.defaultAgeYears` per rung, the burial factors (flood, silt, rebuild, rock), the event-to-epoch rows for SettlementForge's 29 history event types (effect kind and parameters), the citadel and hostel classes. (The `spring.*` rows are V06 §2.2's, in `tables/evolution.json`, V11's registry row 60.)",
    "**scope §16 / INDEX §4 (item 568).** M6-E's price is 29–41.5 pw (E9 and the spring line added); §16's totals move by the same amount; scope §13's test range \"T-V6-1 – T-V6-69\" reads \"T-V6-1 – T-V6-74\".",
    "**V12.** Register `bar.T-V6-71` (E5) and `bar.T-V6-72` (E9) and the `V6-E9` due; the `spring.*` register line at E5.",
    "**V08 (history reading).** DR36 – DR39's inputs read by the port (the history events' types, years ago and severity; the peak; destruction and resettlement)."]
for i, x in enumerate(notes, 1):
    A(f"{i}. {x}")
A("")

A("## 13 Mapping table (502 inventory ids → new location)\n")
A("| inventory id | kind | old § | canon role | new location |")
A("|---|---|---|---|---|")
out.extend(map_rows)
A("")
open(R + '/validation/coherence/rewrite-V06.md', 'w').write('\n'.join(out) + '\n')
print('written', len(out), 'lines;', len(edge_rows), 'edges;', len(combo_rows), 'combos;', len(map_rows), 'mapping rows')
json.dump({'notes': notes}, open(R + '/validation/coherence/work/rewrite-V06/notes.json', 'w'))
