#!/usr/bin/env python3
"""endrefs.py (coherence/assemble-r7x, P4, new) — ROUND-7 NOTES (9) (b): the cross-unit anchors this round's blocks cite
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
# (name, home unit, home heading regex, definition regex inside the home (raw, else read joined), citation regex over the set)
# this round's anchors: the named things adjudication-r7x's Part H FIX, END and CLASS lines cite across units
A = [
 ("§4.4 S5a *Trace* (2) (the pull and the pin rule)", 'base', r'^### 4\.4 ', r"\*Trace\*", r"S5a \*Trace\* \(2\)"),
 ("the pull's search band (§4.4 S5a)", 'base', r'^### 4\.4 ', r"search band", r"pull's search band"),
 ("§4.4 S5a *Outer moats*", 'base', r'^### 4\.4 ', r"\*Outer moats\.\*", r"\*Outer moats\*"),
 ("§4.3 *Where it may not go*", 'base', r'^### 4\.3 ', r"\*\*Where it may not go\.\*\*", r"\*Where it may not go\*"),
 ("§4.8 *The harbour mouth* (its chain: at the nearest lawful heads, else not laid)", 'base', r'^### 4\.8 ', r"\*\*The harbour mouth \(item 106 \(e\)\)\.\*\*[\s\S]*?a chain between them — at the nearest heads or shore points along the entrance whose gate and towers §2\.7's laws admit, else not laid, reported", r"\*The harbour mouth\*"),
 ("`W_RAISED_MEETING` (§5.4's warnings)", 'base', r'^### 5\.4 ', r"W_RAISED_MEETING", r"W_RAISED_MEETING"),
 ("§4.2 S3 (7) (the gate re-solve, `T = t_1`)", 'base', r'^### 4\.2 ', r"T = t_1", r"S3 \(7\)"),
 ("§4.2 S3 (9) (a)'s unwalled stage", 'base', r'^### 4\.2 ', r"\(9\)", r"S3 \(9\) \(a\)"),
 ("V06 §3.7.4 (2)'s cost field", 'V06', r'^### 3\.7 ', r"\*\*3\.7\.4 [\s\S]*?cost field", r"V06 §3\.7\.4 \(2\)"),
 ("V06 §3.7.1 (a new circuit; its F-WALL sentence)", 'V06', r'^### 3\.7 ', r"^\*\*3\.7\.1 ", r"V06 §3\.7\.1"),
 ("V06 §3.7.6 (5)", 'V06', r'^### 3\.7 ', r"\*\*3\.7\.6 [\s\S]*?\(5\)", r"V06 §3\.7\.6 \(5\)"),
 ("V06 §3.17 (3)", 'V06', r'^### 3\.17 ', r"\(3\)", r"V06 §3\.17 \(3\)"),
 ("V06 §3.19 (5)", 'V06', r'^### 3\.19 ', r"\(5\)", r"V06 §3\.19 \(5\)"),
 ("V06 §3.1, V06 §3.2, V06 §3.7.5 (T110-2 (1), T-V6-73)", 'V06', r'^### 3\.7 ', r"3\.7\.5", r"V06 §3\.1, V06 §3\.2, V06 §3\.7\.5"),
 ("*Where the line crosses* (*beneath*)", 'base', r'^### 2\.7 ', r"\*Where the line crosses\*", r"\*Where the line crosses\*"),
 ("**Line and band** (*beneath*)", 'base', r'^### 2\.7 ', r"\*\*Line and band\*\*", r"\*Line and band\*"),
 ("the term **the ends** (§2.7's laws' terms)", 'base', r'^### 2\.7 ', r"\*\*the ends\*\*", r"laws' \*ends\*"),
 ("***over the band***", 'base', r'^### 2\.7 ', r"\*\*\*over the band\*\*\*", r"\*over the band\*"),
 ("***beneath***", 'base', r'^### 2\.7 ', r"\*\*\*beneath\*\*\*", r"\*beneath\*"),
 ("§2.7 *At the frame*", 'base', r'^### 2\.7 ', r"\*At the frame\*", r"\*At the frame\*"),
 ("the fixed-place sentence", 'base', r'^### 2\.7 ', r"fixed-place sentence|\*\*Fixed places", r"the fixed-place sentence"),
 ("the bent-group sentence and its item (i)", 'base', r'^### 2\.7 ', r"bent-group sentence|\*\*The bent group", r"the bent-group sentence"),
 ("law 3's sentence (END-L3): \"… leaves it on the side it entered from\"", 'base', r'^### 2\.7 ',
  r"A line's part inside a strip that crosses no deck line there leaves it on the side it entered from\.", r"leaves it on the side it entered from"),
 ("F-WALL (§5.2 row) and its raised-way rung", 'base', r'^### 5\.2 ', r"\| F-WALL", r"F-WALL's raised-way rung"),
 ("F-ROUTE (§5.2 row)", 'base', r'^### 5\.2 ', r"\| F-ROUTE", r"F-ROUTE"),
 ("F-REDERIVE (§5.2 row)", 'base', r'^### 5\.2 ', r"\| F-REDERIVE", r"F-REDERIVE"),
 ("F-V-RAISED (V07 §3.13 row)", 'V07', r'^### 3\.13 ', r"F-V-RAISED", r"F-V-RAISED"),
 ("`walls.waited` (V06 §2.10's report: walls { … waited })", 'V06', r'^### 2\.10 ', r"^  walls: \{[^}]*\bwaited: number", r"walls\.waited"),
 ("`raised.waited` (V06 §2.10's report: raised { … waited })", 'V06', r'^### 2\.10 ', r"^  raised: \{[^}]*\bwaited: number", r"raised\.waited"),
 ("§7.1 *Raised ways, aqueducts and retaining walls*", 'base', r'^### 7\.1 ', r"\*\*Raised ways, aqueducts and retaining walls \(item 110", r"\*Raised ways, aqueducts and retaining walls\*"),
 ("`bend.wall.raisedCrossing` (§7.1 row)", 'base', r'^### 7\.1 ', r"\| `bend\.wall\.raisedCrossing`|`bend\.wall\.raisedCrossing`", r"bend\.wall\.raisedCrossing"),
 ("`bend.wall.raisedCrossing` (V09 §4.9 row)", 'V09', r'^### 4\.9 ', r"\| `bend\.wall\.raisedCrossing`", r"bend\.wall\.raisedCrossing"),
 ("`bend.raised.wall` (V09 §4.9 row) and its keep-clear form", 'V09', r'^### 4\.9 ', r"\| `bend\.raised\.wall` \|[^\n]*keeps clear of \{wall\}, \{m\} m off your line", r"bend\.raised\.wall\b"),
 ("`bend.wall.aqueductArch` (V09 §4.9 row)", 'V09', r'^### 4\.9 ', r"\| `bend\.wall\.aqueductArch`", r"bend\.wall\.aqueductArch"),
 ("`bend.raised.underSpan` (V09 §4.9 row)", 'V09', r'^### 4\.9 ', r"\| `bend\.raised\.underSpan`", r"bend\.raised\.underSpan"),
 ("`refuse.raised.meeting` (§7.1)", 'base', r'^### 7\.1 ', r"`refuse\.raised\.meeting`", r"refuse\.raised\.meeting"),
 ("§7.3 (b) 3", 'base', r'^### 7\.3 ', r"\(b\)", r"§7\.3 \(b\) 3"),
 ("§7.3's S7 operator row", 'base', r'^### 7\.3 ', r"^\| S7 ", r"§7\.3's S7 operator"),
 ("`setAttr(castle, site)` (§7.4's edit table)", 'base', r'^### 7\.4 ', r"`setAttr\(castle, site\)`", r"setAttr\(castle, '?site'?"),
 ("`wall.barrierReachM`", 'base', None, r"`wall\.barrierReachM`", r"wall\.barrierReachM"),
 ("`convert` `gateToJunction` (§4.11's ConversionOp)", 'base', r'^### 4\.11 ', r"op: 'gateToJunction'", r"gateToJunction"),
 ("`absorbWall` (V06 §2.8's EvolveOp)", 'V06', r'^### 2\.8 ', r"absorbWall", r"absorbWall"),
 ("§8.11's T-ER-12", 'base', r'^### 8\.11 ', r"^\| T-ER-12 \|", r"T-ER-12"),
 ("T110-2 (§13.2)", 'base', r'^### 13\.2 ', r"T110-2\b", r"T110-2\b"),
 ("T110-2 (4)'s hand `convert` `gateToJunction` (W6) and `absorbWall` (W8) runs", 'base', r'^### 13\.2 ', r"gateToJunction[\s\S]{0,400}absorbWall|absorbWall[\s\S]{0,400}gateToJunction", r"T110-2 \(4\) \(H\)"),
 ("T-V7-48 (V07 ## 7) and its decay clause beneath the declared viaduct", 'V07', r'^## 7 ', r"\| T-V7-48 \|[^\n]*beneath the declared viaduct", r"T-V7-48"),
 ("V07 §3.5a (3) (VS4's tracker; `raised.supportClearM`)", 'V07', r'^### 3\.5a ', r"\*\*\(3\) VS4", r"V07 §3\.5a \(3\)"),
 ("T-V6-73", 'V06', r'^## 7 ', r"\| T-V6-73 \|", r"T-V6-73"),
 ("T-V6-47", 'V06', r'^## 7 ', r"\| T-V6-47 \|", r"T-V6-47"),
 ("T-V4-63", 'V04', r'^## 7 ', r"\| T-V4-63 \|", r"T-V4-63"),
 ("T-V9-52", 'V09', r'^### 7\.1 ', r"\| T-V9-52 \|", r"T-V9-52"),
 ("V09 §4.20.6 (2)", 'V09', r'^#### 4\.20\.6 ', r"\(2\)", r"V09 §4\.20\.6 \(2\)"),
 ("EVO_FORT (a registered epoch-phase id, V11 §3.1 row 60)", 'V11', r'^### 3\.1 ', r"EVO_FORT", r"EVO_FORT"),
 ("J-V11.109", 'V11', None, r"\| J-V11\.109 \|", r"J-V11\.109"),
 ("`structure.stripMarginM`", None, None, r"stripMarginM", r"structure\.stripMarginM"),
 ("`structure.span.deckDepthCm`", None, None, r"span\.deckDepthCm", r"structure\.span\.deckDepthCm"),
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
            ok = sec is not None and (re.search(drx, sec, re.M) is not None or re.search(drx, J(sec)) is not None); home = unit
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
