#!/usr/bin/env python3
"""endrefs.py (coherence/assemble-r7w, P4, new) — ROUND-7 NOTES (9) (b): the cross-unit anchors this round's blocks cite
(Part H's FIX and END lines putting one fix's two ends in two units' files), each checked defined at its home in the
installed set and its citations counted (untouched -> installed). The section resolver reads section numbers; this
script reads the named things inside them (a slot row, a sentence item, a catalogue key, a constant, a term).
Usage: endrefs.py UNTOUCHED_ROOT FINAL_ROOT. Writes endrefs.json beside it."""
import glob, json, os, re, sys
W = os.path.dirname(os.path.abspath(__file__))
def load(R):
    t = {'base': open(f'{R}/docs/ARCHITECTURE.md', encoding='utf-8').read()}
    for p in sorted(glob.glob(f'{R}/docs/volumes/V*.md')) + [f'{R}/docs/volumes/INDEX.md']:
        t[os.path.basename(p)[:3] if 'INDEX' not in p else 'INDEX'] = open(p, encoding='utf-8').read()
    return t
def section(text, head_rx):
    L = text.split('\n'); fence = False; hs = []
    for i, l in enumerate(L):
        if l.lstrip().startswith(('```', '~~~')): fence = not fence; continue
        if not fence:
            m = re.match(r'^(#{1,6})\s', l)
            if m: hs.append((i, len(m.group(1)), l))
    k = [j for j, h in enumerate(hs) if re.match(head_rx, h[2])]
    if len(k) != 1: return None
    s, lv = hs[k[0]][0], hs[k[0]][1]
    e = next((i for i, l2, _ in hs[k[0] + 1:] if l2 <= lv), len(L))
    return '\n'.join(L[s:e])
J = lambda s: re.sub(r'\s+', ' ', s)
# (name, home unit, home heading regex, definition regex inside the home, citation regex over the set)
A = [
 ("§8.2's slot 19a (layer-order row)", 'base', r'^### 8\.2 ', r'^\| 19a \| raised decks', r"slot 19a"),
 ("V01 §5.1.3's row 19a", 'V01', r'^#### 5\.1\.3 ', r'^\| 19a \| raised decks', r"slot 19a"),
 ("§4.4 S5a *Trace* (2)", 'base', r'^### 4\.4 ', r"\*Trace\*[^\n]*?\(2\)|\(2\)[^\n]{0,80}impassable", r"S5a \*Trace\* \(2\)"),
 ("V04 §3.5.4 (d) (1) (the lay rule: an inset rectangle below `minEdge` is no chamber)", 'V04', r'^### 3\.5 ', r"^\*\*3\.5\.4 Vaults[\s\S]*inset rectangle below `minEdge` on a side is no chamber", r"V04 §3\.5\.4 \(d\)(?: \(1\))?"),
 ("V06 §3.7.5 (the ring repair)", 'V06', r'^#{3,5} 3\.7\b', r"3\.7\.5", r"V06 §3\.7\.5"),
 ("V06 §3.19 (2)", 'V06', r'^### 3\.19 ', r"^\s*\(?2\)?[ .]|\n\(2\) |\* \*\*\(2\)|^ *2\. ", r"V06 §3\.19 \(2\)"),
 ("§7.4 *Independence*", 'base', r'^### 7\.4 ', r"\*Independence\*", r"§7\.4 \*Independence\*"),
 ("`refuse.undo.dependent` (§7.1's outcome table)", 'base', r'^### 7\.1 ', r"`refuse\.undo\.dependent`", r"refuse\.undo\.dependent"),
 ("`refuse.raised.meeting` (§7.1)", 'base', r'^### 7\.1 ', r"`refuse\.raised\.meeting`", r"refuse\.raised\.meeting"),
 ("`bend.wall.raisedCrossing` (§7.1 row)", 'base', r'^### 7\.1 ', r"\| `bend\.wall\.raisedCrossing`", r"bend\.wall\.raisedCrossing"),
 ("`bend.wall.raisedCrossing` (V09 §4.9 row)", 'V09', r'^### 4\.9 ', r"\| `bend\.wall\.raisedCrossing`", r"bend\.wall\.raisedCrossing"),
 ("`bend.wall.aqueductArch` (V09 §4.9 row)", 'V09', r'^### 4\.9 ', r"\| `bend\.wall\.aqueductArch`", r"bend\.wall\.aqueductArch"),
 ("`bend.raised.underSpan` (V09 §4.9 row)", 'V09', r'^### 4\.9 ', r"\| `bend\.raised\.underSpan`", r"bend\.raised\.underSpan"),
 ("`W_RAISED_MEETING` (§5.4's warnings)", 'base', r'^### 5\.4 ', r"W_RAISED_MEETING", r"W_RAISED_MEETING"),
 ("F-CASTLE (§5.2 row)", 'base', r'^### 5\.2 ', r"\| F-CASTLE", r"F-CASTLE"),
 ("F-WALL (§5.2 row)", 'base', r'^### 5\.2 ', r"\| F-WALL", r"F-WALL\b"),
 ("F-REDERIVE (§5.2 row)", 'base', r'^### 5\.2 ', r"\| F-REDERIVE", r"F-REDERIVE"),
 ("F-V-RAISED (V07 §3.13 row)", 'V07', r'^### 3\.13 ', r"F-V-RAISED", r"F-V-RAISED"),
 ("`raisedWays.structure.span.deckDepthCm`", None, None, r"raisedWays\.structure\.span\.deckDepthCm", r"deckDepthCm"),
 ("**the edge** (*beneath*)", 'base', r'^### 2\.7 ', r"\*\*the edge\*\*", r"\*the edge\*"),
 ("the fixed-place sentence", 'base', r'^### 2\.7 ', r"fixed-place sentence|\*\*Fixed places", r"the fixed-place sentence"),
 ("the bent-group sentence", 'base', r'^### 2\.7 ', r"bent-group sentence|\*\*The bent group", r"the bent-group sentence"),
 ("`walls.waited` (V06 §2.10's report: walls { … waited })", 'V06', r'^### 2\.10 ', r"^  walls: \{[^}]*\bwaited: number", r"walls\.waited"),
 ("`raised.waited` (V06 §2.10's report: raised { … waited })", 'V06', r'^### 2\.10 ', r"^  raised: \{[^}]*\bwaited: number", r"raised\.waited"),
 ("T-V6-73", 'V06', r'^## 7 ', r"\| T-V6-73 \|", r"T-V6-73"),
 ("T-V6-48", 'V06', r'^## 7 ', r"\| T-V6-48 \|", r"T-V6-48"),
 ("T-V6-47", 'V06', r'^## 7 ', r"\| T-V6-47 \|", r"T-V6-47"),
 ("T-V6-11", 'V06', r'^## 7 ', r"\| T-V6-11 \|", r"T-V6-11\b"),
 ("T-V10-41 (c14 span)", 'V10', r'^### 7\.1 ', r"\| T-V10-41 \|", r"T-V10-41"),
 ("T110-2 (§13.2)", 'base', r'^### 13\.2 ', r"\(T110-2\)|T110-2\b", r"T110-2\b"),
 ("T110-4 (§13.2)", 'base', r'^### 13\.2 ', r"T110-4\b", r"T110-4\b"),
 ("§4.2 S3 (10)", 'base', r'^### 4\.2 ', r"\(10\)", r"S3 \(10\)"),
 ("§4.2 S3 (8)'s filter", 'base', r'^### 4\.2 ', r"\(8\)", r"S3 \(8\)"),
 ("`undo(h, of)`", 'base', None, r"undo\(h, of\)", r"undo\(h, of\)"),
 ("§2.7's support step (6)", 'base', r'^### 2\.7 ', r"\(6\) \*\*|\n\s*\(6\) ", r"support step \(6\)"),
]
def run(R):
    T = load(R); out = []
    for name, unit, hrx, drx, crx in A:
        if unit is None:
            hits = [u for u, t in T.items() if re.search(drx, t)]
            ok = bool(hits); home = ', '.join(hits)
        else:
            sec = section(T[unit], hrx) if hrx else T[unit]
            ok = sec is not None and re.search(drx, sec, re.M) is not None; home = unit
        cites = {u: len(re.findall(crx, J(t))) for u, t in T.items()}
        out.append(dict(anchor=name, home=home, defined=ok, citations={u: n for u, n in cites.items() if n}, total=sum(cites.values())))
    return out
u, f = run(sys.argv[1]), run(sys.argv[2])
res = []
for a, b in zip(u, f):
    res.append(dict(anchor=b['anchor'], home=b['home'], defined_untouched=a['defined'], defined_installed=b['defined'],
                    citations_untouched=a['total'], citations_installed=b['total'], by_unit_installed=b['citations']))
    print(f"{'OK ' if b['defined'] else 'BAD'} {b['anchor'][:60]:<60} home {b['home']:<5} defined {a['defined']}->{b['defined']} cites {a['total']}->{b['total']} {b['citations']}")
json.dump(res, open(f'{W}/endrefs.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('undefined at home (installed):', sum(1 for r in res if not r['defined_installed']))
