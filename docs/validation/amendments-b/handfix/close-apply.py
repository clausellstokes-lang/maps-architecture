#!/usr/bin/env python3
"""close-apply.py — the hand fix's closing substitutions (lane handfix-b/close, 2026-09-27, the Fable seat).

Applies, as DATA rows, the 14 issues left open after the six round-2 verifications (VHM2-01 … 04, VKH2-01, VPH2-01 … 02,
VDH2-01 … 02, VR2H-01 … 02, VSR2-01 … 03): 24 sub-changes, each an exact single-occurrence substitution on
docs/ARCHITECTURE.md or docs/ARCHITECTURE-RATIONALE.md. Two reconciliations of the closing seat: VHM2-02 and VKH2-01 (1)
share one §2.6 anchor and are applied as ONE sentence (VHM2-02's filter, VKH2-01's attribution clause); VPH2-01 is
VHM2-01 word for word and is applied once.

The engine is handfix.py's (this folder; the lane handfix-b/apply's): every single space of a quoted old string also
matches ONE soft line break with its indentation (never a blank line), the anchor is counted once on the original files
and once again on the evolving text before it is applied, each new text is counted once in the result, and both files
are written once, guarded by their input hashes. Stdlib only; run from the project root.

usage: python3 close-apply.py --check
       python3 close-apply.py --out-doc A --out-rationale B --log L      dry run into new files
       python3 close-apply.py --write --log L                            apply and write both design files once
"""
import argparse, hashlib, importlib.util, json, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location('handfix', os.path.join(HERE, 'handfix.py'))
H = importlib.util.module_from_spec(spec); spec.loader.exec_module(H)   # flex, locate, apply_one, heading_at, sha, line_of

DOC, RAT = 'docs/ARCHITECTURE.md', 'docs/ARCHITECTURE-RATIONALE.md'
EXPECT_DOC = '357c02f28cbf16826d577713261f34d3d1f378ce33929637714b978d24ff24d7'
EXPECT_RAT = '9575f26c1df137ab77e1038d7cf4c2eaa1b0e7af4fdf1db94e8d5742f8a27eda'

R = []


def row(id_, owner, sub, file, kind, anchor, text, scope=None):
    R.append(dict(id=id_, owner=owner, sub=sub, file=file, kind=kind, anchor=anchor, text=text, scope=scope, from_report=True))


# ------------------------------------------------------------- VHM2-01 (= VPH2-01) — model: BuildingSlot.unhoused registered
row('VHM2-01 (= VPH2-01)', 'model', '(1) §7.1 buildings row', 'doc', 'replace',
    r"""§2.6) and each slot's `frontage` (§2.5's `BuildingSlot`: from the designation template, re-derived by S11's mutator)""",
    r"""§2.6), each slot's `frontage` (§2.5's `BuildingSlot`: from the designation template, re-derived by S11's mutator) and each slot's `unhoused` (§2.5's `BuildingSlot`: written by every run of §4.7's generation fill, cleared by the designation mutator)""")
row('VHM2-01 (= VPH2-01)', 'model', '(2) §2.8 registry paragraph', 'doc', 'replace',
    r"""sub-records and its base wings' `spans` (§2.6), the plot's `builtBand`""",
    r"""sub-records and its base wings' `spans` (§2.6), a site-plan slot's `unhoused` (§2.5), the plot's `builtBand`""")

# ------------------------------------------------------------- VHM2-02 + VKH2-01 (1) — model: one reconciled sentence, §2.6 stage-3 contract
row('VHM2-02 + VKH2-01 (1)', 'model', '§2.6 stage-3 contract (one sentence: VHM2-02\'s filter, VKH2-01\'s attribution)', 'doc', 'replace',
    r"""step 3 filters its candidates to those that stay out of every composer's room or stand in one so.""",
    r"""step 3 filters its candidates to those that stay out of every composer's room or stand in one so, and that leave each composer's room, less every bay and stack it holds, in one piece the transient arena accepts beside them (§3.4: `minEdge`, clearance, simplicity); a refusal naming a vertex that a bay or stack gives the room belongs to that bay or stack (F-PLAN tier 2, §5.2), so a refused composer's room stays the composer's bug.""")

# ------------------------------------------------------------- VHM2-03 — model: Building.dwelling's clearing events
row('VHM2-03', 'model', '§2.6 Building.dwelling', 'doc', 'replace',
    r"""cleared by the event that moves that household out of the building (§10.3's relocation: a use's move, §4.7's overflow pass, the capacity re-homing below)""",
    r"""cleared by every event that takes that household out of the building — its relocation (§10.3: a use's move, a `relet`, §4.7's overflow pass, the capacity re-homing below) or its leaving at an epoch (the epoch's step (c), §4.11)""")

# ------------------------------------------------------------- VHM2-04 — kernel: the fixed-ring lists outside §2.6
row('VHM2-04', 'kernel', '(1) §3.4 transientArena fixed comment', 'doc', 'replace',
    r"""a composer's room (a hall, a tower's round room: §2.6's `Composition.rooms`)""",
    r"""a composer's room (a hall, a tower's round room: §2.6's `Composition.rooms`) less any stair bay or chimney stack standing in it (§2.6's stage-3 contract)""")
row('VHM2-04', 'kernel', '(2) §3.4 re-cut paragraph', 'doc', 'replace',
    r"""the passage room, the composer's rooms and the rooms the ladder keeps)""",
    r"""the passage room, the composer's rooms, each less a bay or stack it holds, and the rooms the ladder keeps)""")
row('VHM2-04', 'kernel', '(3) J-A28.33 index row', 'doc', 'replace',
    r"""the passage room, the composer's rooms and the kept rooms)""",
    r"""the passage room, the composer's rooms, each less a bay or stack it holds, and the kept rooms)""",
    scope='| J-A28.33 |')
row('VHM2-04', 'kernel', '(4) J-A28.33 Part A (restated in place)', 'rat', 'replace',
    r"""the passage room, the composer's rooms and the rooms the interior ladder keeps)""",
    r"""the passage room, the composer's rooms, each less a bay or stack it holds, and the rooms the interior ladder keeps)""",
    scope='| J-A28.33 |')

# ------------------------------------------------------------- VKH2-01 (2) — model: J-A28.26 Part A records the filter ruling
row('VKH2-01 (2)', 'model', 'J-A28.26 Part A (restated in place)', 'rat', 'replace',
    r"""(handfix-b verify-model-r1 VHM1-03, widened by repair-model-r2 to the stack and the hall's stair). |""",
    r"""(handfix-b verify-model-r1 VHM1-03, widened by repair-model-r2 to the stack and the hall's stair). Step 3 admits a bay or stack inside a composer's room only at a candidate whose room remainder passes the kernel's tests of an input ring, and a refusal at a vertex it adds is its own, over letting the arena refuse the room, because the room less a bay depends on where the planner put the bay, which F-PLAN's tier 2 re-places, while tier 2 aborts on a refused composer's room as the composer's bug (handfix-b verify-kernel-r2 VKH2-01 with verify-model-r2 VHM2-02; closing). |""",
    scope='| J-A28.26 |')

# ------------------------------------------------------------- VPH2-02 — scope: T19-4's bar for the unhoused typing
row('VPH2-02', 'scope', '(1) §13.2 T19-4', 'doc', 'replace',
    r"""every building S11 builds for a slot without `houses` (§10.2) houses none,""",
    r"""every building S11 builds for a slot without `houses` (§10.2; `BuildingSlot.unhoused`, §2.5) houses none,""")
row('VPH2-02', 'scope', '(2) §13.2 T19-4', 'doc', 'replace',
    r"""is housed or reported unplaced by F-SITING (§4.7, J-A28.46); on a dossier fixture""",
    r"""is housed or reported unplaced by F-SITING (§4.7, J-A28.46); on a fixture whose district holds a live-in workshop and no household of its band or drift, the workshop's plot keeps its use and its main slot, which S11 builds without `houses` — `BuildingSlot.unhoused` set (§2.5), capacity 0 (§2.6), housing none, `Building.dwelling` absent — the typing reported (§4.7); on a dossier fixture""")

# ------------------------------------------------------------- VDH2-01 — determinism: the undo of every capacity re-homing, at the record's home
row('VDH2-01', 'determinism', '§7.4 Application bullet', 'doc', 'replace',
    r"""An edit whose capacity re-homing re-provides a dossier household's housing (§4.7) keeps in its undo record, whatever its row's undo, the plots the re-provision touched (§7.3 item 1)""",
    r"""An edit whose capacity re-homing moves households (§2.6) keeps in its undo record, whatever its row's undo, the former records of the buildings it moves them out of and into and, where it re-provides a dossier household's housing (§4.7), the plots the re-provision touched (§7.3 item 1)""")

# ------------------------------------------------------------- VDH2-02 — scope: T18-1's locality; T28-18's designation path
row('VDH2-02', 'scope', '(1) §13.2 T18-1', 'doc', 'replace',
    r"""leaves everything beyond the plot and its joined neighbour untouched (the locality oracle)""",
    r"""leaves everything outside its event's effective scope untouched (§7.3 item 1: the plot, its joined neighbour, each displaced use's new site and the buildings and plots its capacity re-homing touches; the locality oracle)""")
row('VDH2-02', 'scope', '(2) §13.2 T28-18', 'doc', 'replace',
    r"""and the stroke's undo returns every household to its former building byte-identically (§7.4's setField row);""",
    r"""and the stroke's undo returns every household to its former building byte-identically (§7.4's setField row); a `setAttr` of the tenement's plot use to a class that leaves it no residential slot (capacity 0, §2.6) re-homes every household it houses the same way, and its undo returns the tenement's design and every household to its former building byte-identically (§4.7 S11 rule 5; §7.4's Application);""")

# ------------------------------------------------------------- VR2H-01 — rendering: the chain bound at capacity 0
row('VR2H-01', 'rendering', '(1) §12.7 plan row', 'doc', 'replace',
    r"""plus the building's capacity less one (§2.6)""",
    r"""plus the building's capacity less one (none for a building of capacity 0, which houses no household; §2.6)""")
row('VR2H-01', 'rendering', '(2) J-A28.83 index row', 'doc', 'replace',
    r"""its steps at most the band set's rows less one plus the capacity less one)""",
    r"""its steps at most the band set's rows less one plus the capacity less one, none at capacity 0)""",
    scope='| J-A28.83 |')
row('VR2H-01', 'rendering', '(3) J-A28.83 Part A (restated in place)', 'rat', 'replace',
    r"""plus the building's capacity less one, §2.6's canonical chain)""",
    r"""plus the building's capacity less one, none for a building of capacity 0, which houses no household, §2.6's canonical chain)""",
    scope='| J-A28.83 |')

# ------------------------------------------------------------- VR2H-02 — rendering: the census row for an uncovered passage
row('VR2H-02', 'rendering', '§8.3 draw-style census, new row after the passages row', 'doc', 'insert_line',
    r"""| passages (item 30; §8.5 (2)): B-CITY-lite seeds whose hidden share is > 0, every passage with a `frontBuilding` |""",
    r"""| passages left uncovered (item 30; §8.2's row; §2.6's `BaseWing.spans`): B-CITY-lite seeds whose hidden share is > 0, every front building over a passage cleared by hand (`clear`), then each clear undone | ink | while a passage has no `frontBuilding`, no span mark over it in any band's mark table and no arch glyph at any band, its floor in `road` at the district band; after the undos every tile pixel-identical to the render before the clears |""")

# ------------------------------------------------------------- VSR2-01 — scope: the stair-turret fixture
row('VSR2-01', 'scope', '§13.2 B-PLAN fixture list', 'doc', 'replace',
    r"""a T of two overlapping wings whose second wing holds a round tower that also overlaps the first,""",
    r"""a T of two overlapping wings whose second wing holds a round tower that also overlaps the first, a rectangle carrying a stair turret (a round tower whose spiral core's bay fills its round room),""")

# ------------------------------------------------------------- VSR2-02 — determinism: the §5.3 dwelling row after the capacity row
row('VSR2-02', 'determinism', '§5.3 new row after the capacity row', 'doc', 'replace',
    r"""| the capacity function recomputed on the touched buildings against `Building.households` |""",
    "| the capacity function recomputed on the touched buildings against `Building.households` |\n"
    r"""| a live-in dwelling stays among its building's households: a building's `Building.dwelling`, where present, names one of its `Building.households` and is present only while its use is a live-in class's (§2.6's `Building.dwelling`, §10.2's `liveIn`; J-A28.29), after every committed change | stage-end (S11 per district after the overflow pass; each `epoch` event; every edit, at its dry run) | the touched buildings' `dwelling` against their `households` and their use's `liveIn` |""")

# ------------------------------------------------------------- VSR2-03 — scope: §0.2 rows 20 and 28
row('VSR2-03', 'scope', '(1) §0.2 row 20', 'doc', 'replace',
    r"""the `dossier` and `positive` requests and the least-disruption order in §4.7 S10b,""",
    r"""the `dossier` and `positive` requests and the least-disruption order in §4.7 S10b, a dossier household's housing re-provided in its district when no building there can hold it (§4.7, J-A20.72),""")
row('VSR2-03', 'scope', '(2) §0.2 row 20', 'doc', 'replace',
    r"""tests T20-1 to T20-6;""",
    r"""tests T20-1 to T20-6, T19-4's dossier clause and T28-18's dossier fixtures;""")
row('VSR2-03', 'scope', '(3) §0.2 row 28', 'doc', 'replace',
    r"""`RoomProgramRow`, `RoomRuleRow.scope` and the template's `households` in §4.7 S11 and §10.2,""",
    r"""`RoomProgramRow`, `RoomRuleRow.scope`, the template's `households` and a structure's `houses` flag in §4.7 S11 and §10.2,""")
row('VSR2-03', 'scope', '(4) §0.2 row 28', 'doc', 'replace',
    r"""the occupants' band memory `Plot.fieldBand` in §2.5 (J-A28.29),""",
    r"""the occupants' band memory `Plot.fieldBand` (J-A28.29) and the fill's typing record `BuildingSlot.unhoused`, both in §2.5,""")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--check', action='store_true')
    ap.add_argument('--write', action='store_true')
    ap.add_argument('--out-doc'); ap.add_argument('--out-rationale'); ap.add_argument('--log')
    a = ap.parse_args()
    src = {'doc': open(DOC, encoding='utf-8').read(), 'rat': open(RAT, encoding='utf-8').read()}
    log = dict(input={f: dict(path=DOC if f == 'doc' else RAT, sha256=H.sha(t), bytes=len(t.encode()), lines=t.count('\n'))
                      for f, t in src.items()}, rows=[], problems=[])
    if log['input']['doc']['sha256'] != EXPECT_DOC or log['input']['rat']['sha256'] != EXPECT_RAT:
        log['problems'].append('the input hashes are not the ones this lane judged (assemble-r2 install)')

    # (1) pre-check on the ORIGINAL files: every anchor once (in its scope, and once in the file); every new text absent
    pre_ok = not log['problems']
    for i, r in enumerate(R):
        r['i'] = i + 1
        n, pos = H.locate(src[r['file']], r)
        glob_n = len(H.flex(r['anchor']).findall(src[r['file']])) if r['kind'] == 'replace' else \
            len(re.findall(r'(?m)^' + re.escape(r['anchor']), src[r['file']]))
        r['pre_count'], r['pre_global'] = n, glob_n
        r['pre_soft'] = bool(pos) and '\n' in pos[0][2] and r['kind'] == 'replace'
        newn = len(H.flex(r['text']).findall(src[r['file']]))
        r['pre_new'] = newn
        if n != 1 or glob_n != 1 or newn != 0:
            pre_ok = False
            log['problems'].append(f"row {r['i']} ({r['id']} {r['sub']}): anchor {n} in scope / {glob_n} in file, new text {newn} before")
        else:
            r['heading'], r['top'] = H.heading_at(src[r['file']], pos[0][0])
            r['pre_line'] = H.line_of(src[r['file']], pos[0][0]) + 1
    log['pre_check_ok'] = pre_ok
    for r in R:
        print(f"pre {r['i']:>2} {r['id']:<22} {r['sub'][:52]:<52} {r['file']} {r['kind']:<11} anchor={r['pre_count']}/{r['pre_global']} new={r['pre_new']} l.{r.get('pre_line', '-')}{'  soft-break' if r['pre_soft'] else ''}")
    for p in log['problems']:
        print('PROBLEM', p)
    if a.check:
        print('pre-check', 'OK' if pre_ok else 'FAILED'); return
    if not pre_ok:
        sys.exit('STOP — pre-check failed; nothing applied')

    # (2) apply in order on the evolving text, each anchor re-counted
    cur = dict(src)
    for r in R:
        rec = dict(i=r['i'], id=r['id'], owner=r['owner'], sub=r['sub'], file=r['file'], kind=r['kind'], scope=r['scope'],
                   heading=r.get('heading', ''), top=r.get('top', ''), pre_line=r.get('pre_line'))
        n, pos = H.locate(cur[r['file']], r)
        rec['apply_count'] = n
        if n != 1:
            rec['state'] = 'SKIPPED'; rec['note'] = f'anchor found {n} times on the text as it stands'
            log['rows'].append(rec); continue
        rec['at_line'] = H.line_of(cur[r['file']], pos[0][0]) + 1
        cur[r['file']], note = H.apply_one(cur[r['file']], r, pos[0])
        if note: rec['note'] = note
        rec['state'] = 'applied'
        log['rows'].append(rec)

    # (3) each applied text once in the result
    for rec, r in zip(log['rows'], R):
        if rec['state'] == 'applied':
            rec['post_count'] = len(H.flex(r['text']).findall(cur[r['file']]))
            if rec['post_count'] != 1:
                log['problems'].append(f"row {r['i']} ({r['id']} {r['sub']}): applied text found {rec['post_count']} times in the result")
    applied = [x for x in log['rows'] if x['state'] == 'applied']
    skipped = [x for x in log['rows'] if x['state'] == 'SKIPPED']
    log['output'] = {f: dict(sha256=H.sha(t), bytes=len(t.encode()), lines=t.count('\n')) for f, t in cur.items()}
    log['summary'] = dict(rows=len(R), applied=len(applied), skipped=len(skipped),
                          issues=sorted({r['id'] for r in R}), issues_skipped=sorted({x['id'] for x in skipped}))
    for x in log['rows']:
        print(f"{x['state']:<8} {x['i']:>2} {x['id']:<22} {x['sub'][:52]:<52} l.{x.get('at_line', '-')}"
              f"{'' if 'post_count' not in x else ' post=' + str(x['post_count'])}{'  ' + x['note'] if x.get('note') else ''}")
    for p in log['problems']:
        print('PROBLEM', p)
    print('summary', json.dumps(log['summary']))
    for f in ('doc', 'rat'):
        print(f"{f}: {log['input'][f]['bytes']} -> {log['output'][f]['bytes']} bytes, {log['input'][f]['lines']} -> "
              f"{log['output'][f]['lines']} lines, sha256 {log['output'][f]['sha256']}")

    # (4) write once, guarded
    if a.write:
        if log['problems']:
            sys.exit('STOP — problems recorded; nothing written')
        if H.sha(open(DOC, encoding='utf-8').read()) != log['input']['doc']['sha256'] or \
                H.sha(open(RAT, encoding='utf-8').read()) != log['input']['rat']['sha256']:
            sys.exit('STOP — a design file changed while this run computed; nothing written')
        open(DOC, 'w', encoding='utf-8').write(cur['doc'])
        open(RAT, 'w', encoding='utf-8').write(cur['rat'])
        log['written'] = [DOC, RAT]
        print('written', DOC, RAT)
    else:
        if a.out_doc: open(a.out_doc, 'w', encoding='utf-8').write(cur['doc'])
        if a.out_rationale: open(a.out_rationale, 'w', encoding='utf-8').write(cur['rat'])
    if a.log:
        json.dump(log, open(a.log, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)


if __name__ == '__main__':
    main()
