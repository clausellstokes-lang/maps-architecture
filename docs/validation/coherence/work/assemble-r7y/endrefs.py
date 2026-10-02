#!/usr/bin/env python3
"""endrefs.py (coherence/assemble-r7y, P4, new) — ROUND-7 NOTES (9) (b): the cross-unit anchors this round's blocks cite
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
# this round's anchors: the named things adjudication-r7y's Part H FIX, END and CLASS lines (and the seats' sweeps) cite across units
A = [
 # base §2.7 (model) — cited by pipeline, determinism, scope, V05, V06, V07, V09
 ("§2.7 way-and-channel table, row (b) (its gates cell, M8 / X1)", 'base', r'^### 2\.7 ', r"\| \*\*\(b\)\*\* [^\n]*never where these laws bar a gate \(law 1, read with its terms, chiefly \(5\)[^\n]*admit its gate \(law 1, read with its terms, chiefly \(5\); law 2 \(a\), law 3", r"way-and-channel table's row \(b\)"),
 ("§2.7 way-and-channel table, row (d) (its gates cell, M5)", 'base', r'^### 2\.7 ', r"\| \*\*\(d\)\*\* [^\n]*one S5b spawns among them \(law 2 \(b\); §4\.4 S5a \*Trace\* \(2\)\)[^\n]*F-WALL's raised-way rung \(law 2 \(c\); §5\.2\)", r"row \(d\)"),
 ("§2.7 way-and-channel table, row (e)", 'base', r'^### 2\.7 ', r"\| \*\*\(e\)\*\* ", r"way-and-channel table's row \(e\)"),
 ("§2.7 crossing table, row W2", 'base', r'^### 2\.7 ', r"\| \*\*W2\*\* ", r"row W2\b"),
 ("§2.7 crossing table, W12·C8 (names T-V5-14)", 'base', r'^### 2\.7 ', r"\| \*\*W12\*\* [^\n]*a locked run kept and the spans and supports over it `ruined`[^\n]*T-V5-14", r"W12·C8"),
 ("§2.7 crossing table, row W13", 'base', r'^### 2\.7 ', r"\| \*\*W13\*\* ", r"row W13\b"),
 ("§2.7 crossing table, row W14 and its event cell (M7)", 'base', r'^### 2\.7 ', r"\| \*\*W14\*\* [^\n]*\(E: a village epoch; law 2, in its order\)", r"row W14\b"),
 ("§2.7 crossing table, W1·C1's test naming T110-4 (c) (its shape-locked ring) (M4)", 'base', r'^### 2\.7 ', r"T-V7-48 \(V\), T110-4 \(c\) \(its shape-locked ring\)", r"T110-4 \(c\) \(its shape-locked ring\)"),
 ("the bent-group sentence, items (ii) and (iv)", 'base', r'^### 2\.7 ', r"\*\*The bent-group[\s\S]*?\(ii\)[\s\S]*?\(iv\) a gate", r"bent-group sentence \((?:ii|iv)\)"),
 ("the bent-group sentence's strip (M1: law 1, read with its terms; chiefly … (4) … (9) … (10))", 'base', r'^### 2\.7 ', r"where these laws bar the line itself \(law 1, read with its terms; chiefly each place from which its band or wall strips would lie over a raised way's ends \(4\)", r"the bent-group sentence"),
 ("the fixed-place sentence", 'base', r'^### 2\.7 ', r"fixed-place sentence|\*\*Fixed places", r"the fixed-place sentence"),
 ("the lock sentence (M2: else the soft things moved)", 'base', r'^### 2\.7 ', r"the newer bending itself, else the soft things moved \(a carried way re-routed, law 2 \*Carried way\*\), else giving way \(law 1 \(10\); law 2, in its order\)\.", r"the lock sentence"),
 ("***beneath***", 'base', r'^### 2\.7 ', r"\*\*\*beneath\*\*\*", r"\*beneath\*"),
 ("***down before the wall***", 'base', r'^### 2\.7 ', r"\*\*\*down before the wall\*\*\*", r"\*down before the wall\*"),
 ("*No gate and no tower in the under-deck strip* (M6: a contraction's trace step)", 'base', r'^### 2\.7 ', r"at generation, in an epoch circuit and in a contraction, an epoch's or a hand `contractWall`'s \(§4\.11: S5a's trace step\)", r"No gate and no tower"),
 ("law 2 *Entry*", 'base', r'^### 2\.7 ', r"\*Entry\*", r"law 2 \*Entry\*"),
 ("law 2 *Carried way*", 'base', r'^### 2\.7 ', r"\*Carried way\*", r"law 2 \*Carried way\*|\*Carried way\*"),
 ("law 2 *Newer*", 'base', r'^### 2\.7 ', r"\*Newer\*", r"law 2 \*Newer\*"),
 ("these laws' *ends* / **the ends**", 'base', r'^### 2\.7 ', r"\*\*the ends\*\*", r"laws' \*ends\*"),
 ("§2.7's laws' *Order*", 'base', r'^### 2\.7 ', r"\*Order\*|\*\*Order\*\*", r"laws' \*Order\*"),
 # base §4 (pipeline) — cited by model, determinism, scope, V06, V07
 ("§4.1's S5 row: the L1 re-lays of law 2 (b) (P7)", 'base', r'^### 4\.1 ', r"S3's trace with its gate vertices, a carried way §4\.2 S3 \(7\) re-routes by §2\.7's laws, law 2 \(b\), re-laid in it", r"§4\.1's S5 row"),
 ("§4.1 *Declarations read ahead* (P9: only one §7.1's dry-run outcomes refuse)", 'base', r'^### 4\.1 ', r"only one §7\.1's dry-run outcomes refuse is refused \(§7\.1; a meeting of a wall-like structure and a raised way", r"\*Declarations read ahead\*"),
 ("§4.2 S3 (6): the cross wall against a standing raised way (P2)", 'base', r'^### 4\.2 ', r"The cross wall, its line dated by this step \(§2\.7's laws' \*Order\*\), meets each raised way standing before the stage", r"§4\.2 S3 \(6\)"),
 ("§4.2 S3 (7): a merged pair's inter-nucleus route re-solved (P1)", 'base', r'^### 4\.2 ', r"or, for a merged pair's inter-nucleus route, whose crossing of the cross wall's line \(\(6\)\) — lies on a raised stretch", r"S3 \(7\)"),
 ("§4.3 *Where it may not go* (P3: a merged pair's cross wall)", 'base', r'^### 4\.3 ', r"at S3 \(7\) the stage-1 boundary and a merged pair's cross wall — from S3 \(9\) on, their trace — and at S5b", r"\*Where it may not go\*"),
 ("§4.3 *Routes* (P3, P8: the cross wall's reader; a carried way's moat)", 'base', r'^### 4\.3 ', r"it crosses the cross wall, where one is laid \(§4\.2 S3 \(6\)\), at its gate on ground part 0 \(§4\.2 S3 \(7\)\)\.[\s\S]*|a solved route or a carried way standing before the stage — the city moat just outside each gate, §4\.2 S3 \(10\) —", r"§4\.3 \*Routes\*"),
 ("§4.4 S5a *Trace* (2) (the pull and the pin rule)", 'base', r'^### 4\.4 ', r"\*Trace \(GEO-18, FTG-8\)\.\*", r"S5a \*Trace\* \(2\)"),
 ("§4.4 S5a *Trace* (2)'s step (b)", 'base', r'^### 4\.4 ', r"\(b\) else its arterial re-routed as law 2 \(b\) moves a ground way", r"\*Trace\* \(2\)'s step \(b\)"),
 ("the pull's search band (§4.4 S5a)", 'base', r'^### 4\.4 ', r"search band", r"search band"),
 ("§4.4 S5a *Trace* (3): no move to a shape the laws do not admit (P11)", 'base', r'^### 4\.4 ', r"would take a shape §2\.7's laws do not admit \(law 1, read with its terms; law 2 \(a\)\)", r"S5a \*Trace\* \(3\)"),
 ("§4.4 S5a *Outer moats* (P8: the arterial or carried way re-routed)", 'base', r'^### 4\.4 ', r"\(the arterial or carried way is re-routed between the gate and its next pinned node beyond the channel", r"\*Outer moats\*"),
 ("§4.4 S5d's kept arc (P6)", 'base', r'^### 4\.4 ', r"not re-traced: the arc kept as it stood and its shortfall moved to the next stage's quota", r"S5d"),
 ("§4.8 *The harbour mouth* (its chain, P14 in F6)", 'base', r'^### 4\.8 ', r"\(`W_RAISED_MEETING`; law 1, read with its terms, chiefly \(5\), \(6\); law 2; its worked example the fixed-place sentence\)", r"\*The harbour mouth\*"),
 ("§4.11's trace step for `contractWall` (S5a's)", 'base', r'^### 4\.11 ', r"contractWall", r"§4\.11: S5a's trace step|S5a's trace step, §4\.11"),
 # base §5–§7 (determinism)
 ("F-WALL's raised-way rung and its top-up exception (D1)", 'base', r'^### 5\.2 ', r"\| F-WALL[^\n]*but on a top-up's arc, which §4\.4 S5d keeps as it stood —, takes its own rung alone", r"F-WALL's raised-way rung"),
 ("F-BUDGET-STAGE's kept arc (D2)", 'base', r'^### 5\.2 ', r"\| F-BUDGET-STAGE[^\n]*an arc §2\.7's laws give no lawful shape against a standing raised way kept as it stood, its shortfall moved on, §4\.4 S5d\)", r"F-BUDGET-STAGE"),
 ("F-REDERIVE and its raised-way rung (D4, D5)", 'base', r'^### 5\.2 ', r"\| F-REDERIVE[^\n]*its water gate with no point within the run that §2\.7's laws admit \(law 1, read with its terms; chiefly \(6\)\)", r"F-REDERIVE"),
 ("`W_RAISED_MEETING` (§5.4's warnings: a merged pair's cross wall, D3)", 'base', r'^### 5\.4 ', r"a harbour-mouth chain not laid, §4\.8; a merged pair's cross wall not laid, §4\.2 S3 \(6\);", r"W_RAISED_MEETING"),
 ("§7.1's dry-run outcomes (the outcome table)", 'base', r'^### 7\.1 ', r"dry-run", r"§7\.1's dry-run outcome"),
 ("§7.1 *Raised ways, aqueducts and retaining walls* (D6: law 2, in its order)", 'base', r'^### 7\.1 ', r"a gate §2\.7's laws bar there \(law 1, read with its terms; chiefly \(5\), \(10\): a shape-locked wall's among them\) resolved by those laws, law 2, in its order: \(a\)", r"\*Raised ways, aqueducts and retaining walls\*"),
 ("`refuse.raised.meeting` (§7.1; D9)", 'base', r'^### 7\.1 ', r"^\| a meeting of a wall-like structure and a raised way[^\n]*a fixed place with no point in reach that §2\.7's laws admit[^\n]*\| `refuse\.raised\.meeting` \|", r"refuse\.raised\.meeting"),
 ("`bend.wall.raisedCrossing` (§7.1 row; D8)", 'base', r'^### 7\.1 ', r"^\| a hand `drawWall`[^\n]*whose claim §2\.7's laws bar there \(law 1, read with its terms; chiefly \(6\)\)[^\n]*\| `bend\.wall\.raisedCrossing` \|", r"bend\.wall\.raisedCrossing"),
 ("`bend.raised.underSpan` (§7.1 row; D10)", 'base', r'^### 7\.1 ', r"^\| a ground `drawWay`[^\n]*\(§2\.7's laws, law 1, read with its terms, chiefly \(1\), \(5\), \(8\); its worked example the way-and-channel table's row \(b\)\)[^\n]*\| `bend\.raised\.underSpan`, `bend\.raised\.around` \|", r"bend\.raised\.underSpan"),
 ("§7.3 (b) 3 (D5: law 2, in its order)", 'base', r'^### 7\.3 ', r"the raised way met by §2\.7's laws, law 2, in its order — a run with no lawful shape taking F-REDERIVE's raised-way rung \(§5\.2\) —", r"§7\.3 \(b\) 3"),
 ("§7.7's DR2 row (D7: the chain left out for a raised way)", 'base', r'^### 7\.7 ', r"save one §2\.7's laws leave out for a raised way, reported \(law 2 \(c\): `W_RAISED_MEETING` at generation, `walls\.waited` at an epoch\)", r"DR2"),
 ("§8.2's slot 19a (the draw order's one home)", 'base', r'^### 8\.2 ', r"^\| 19a \|", r"slot 19a"),
 # base §13 (scope)
 ("T110-4 (c)'s third run: the ring both meet shape-locked (S1)", 'base', r'^### 13\.2 ', r"and, on a third, the ring both meet shape-locked before an aqueduct stroke and a raised road are drawn across it by hand and an aqueduct is founded across it at an epoch", r"T110-4 \(c\)"),
 ("T110-4 (a)'s T-V6-48 variant (a declared shore viaduct's fixed-place zone holding a head)", 'base', r'^### 13\.2 ', r"T-V6-48 \(with a declared viaduct along its harbour's shore whose fixed-place zone holds a head of its harbour mouth", r"T110-4 \(a\)"),
 ("T110-2 (2)'s twin-town CITY runs (S2 (1))", 'base', r'^### 13\.2 ', r"a twin-town CITY whose two nuclei S3 \(6\) merges under one enceinte across a ravine", r"T110-2 \(2\)"),
 ("T110-2 (6)'s perpendicular moat deck, sixth, seventh and top-up runs (S2 (2), (3))", 'base', r'^### 13\.2 ', r"perpendicular to the channel — the way re-routed between its gate and its next pinned node[\s\S]*?on a sixth whose skeleton seats a building in the arch vault[\s\S]*?that arc not re-traced, kept as it stood", r"T110-2 \(6\)"),
 ("T110-2 (3)'s walled port with a declared shore viaduct (S4 (1)) and ramp, castle runs (S5)", 'base', r'^### 13\.2 ', r"a walled port whose skeleton declares a viaduct along its harbour's shore, a head of its harbour mouth in that viaduct's fixed-place zone[\s\S]*?the second castle's town-side gate fixed on its next side whose gate §2\.7's laws admit \(law 1 \(5\), \(6\)\)|the second castle's town-side gate fixed on its next side whose gate §2\.7's laws admit \(law 1 \(5\), \(6\)\)[\s\S]*?a walled port whose skeleton declares a viaduct along its harbour's shore", r"T110-2 \(3\)"),
 ("T110-2 (1)'s along-the-band stroke and under-deck tower (S4 (2), (3))", 'base', r'^### 13\.2 ', r"that tower standing there \(§2\.7's laws, law 1 \(5\), read with its terms\)[\s\S]*?runs along within them — its course bent to the nearest course §2\.7's laws admit", r"T110-2 \(1\)"),
 ("§13.8's T110 row: hand rows W4, W5, W6, W8 and W10 (S3)", 'base', r'^### 13\.8 ', r"\(4\)'s hand rows W4, W5, W6, W8 and W10 \(M4; V06's E3, which builds `absorbWall`\)", r"§13\.8's T110 row"),
 ("the c15 fixture (T110-2 (1))", 'base', r'^### 13\.2 ', r"c15 town with a moated ring", r"c15"),
 ("`wealthLevel` (§4.2's blueprint / the intent)", 'base', None, r"`wealthLevel`", r"wealthLevel"),
 ("`structure.span.deckDepthCm`", None, None, r"span\.deckDepthCm", r"structure\.span\.deckDepthCm"),
 ("`structure.stripMarginM`", None, None, r"stripMarginM", r"structure\.stripMarginM"),
 # V05
 ("T-V5-14 and its locked-run sentence (V5-1)", 'V05', r'^## 7 ', r"With the run beneath locked instead, the run is kept as content the ruin laps around, no member, and the span and the supports over it are `ruined` all the same \(§2\.7's laws, law 2 \*Entry\*; its worked example the crossing table's W12·C8\)\.", r"T-V5-14"),
 # V06
 ("`walls.waited` (V06 §2.10's report)", 'V06', r'^### 2\.10 ', r"^  walls: \{[^}]*\bwaited: number", r"walls\.waited"),
 ("`absorbWall` (V06 §2.8's EvolveOp)", 'V06', r'^### 2\.8 ', r"absorbWall", r"absorbWall"),
 ("V06's E3 cell (## 8: fortification and raised ways)", 'V06', None, r"^\| E3 — fortification and raised ways", r"V06's E3|E3"),
 ("H-AQUA (V06 ## 7's fixture)", 'V06', r'^## 7 ', r"\*\*H-AQUA\*\*", r"H-AQUA"),
 ("T-V6-47 (V6-1 (2)'s far-ramp clause; V6-2's F5 pointer)", 'V06', r'^## 7 ', r"\| T-V6-47 \|[^\n]*no gate, postern or tower where §2\.7's laws, law 1 \(5\), bar one,[^\n]*on an H-AQUA variant whose METROPOLIS circuit's boundary falls on its viaduct's far ramp[^\n]*0 gates, posterns or towers where §2\.7's laws, law 1 \(5\), bar one;", r"T-V6-47"),
 ("T-V6-48 (V6-1 (1)'s T110-4 (a) variant chain)", 'V06', r'^## 7 ', r"\| T-V6-48 \|[^\n]*on T110-4 \(a\)'s variant, whose declared viaduct's fixed-place zone holds a head of the mouth", r"T-V6-48"),
 ("V06 §3.7.6 (3), the harbour-mouth chain (V6-3)", 'V06', r'^### 3\.7 ', r"its gate and towers stand only where §2\.7's laws admit them \(law 1, read with its terms; chiefly \(5\), \(6\)\)", r"V06 §3\.7\.6 \(3\)"),
 ("V06 §3.19 (2), (5) (V6-4, V6-5)", 'V06', r'^### 3\.19 ', r"chiefly \(4\), \(6\); law 2 \(a\): a raised way's ends where its own law picks them\)[\s\S]*law 1, read with its terms, chiefly \(4\)–\(6\); its worked example the fixed-place sentence", r"V06 §3\.19 \((?:2|5)\)"),
 # V07
 ("V07 §3.5a (4) (VS3's palisade; V7-4) and (1)'s refusal (V7-2)", 'V07', r'^### 3\.5a ', r"a raised stroke is refused only where §7\.1's dry-run outcomes refuse a declaration[\s\S]*and its anchors only where §2\.7's laws admit them \(law 1, read with its terms; chiefly \(4\)–\(6\); law 2;", r"V07 §3\.5a \(4\)"),
 ("V07 §3.11 the palisade's REPLACEMENT (V7-1: law 2, in its order)", 'V07', r'^### 3\.11 ', r"the run laid again in its new section, resolved by §2\.7's laws, law 2, in its order — \(a\)", r"V07 §3\.11"),
 ("F-V-RAISED (V07 §3.13; the sweep site)", 'V07', r'^### 3\.13 ', r"F-V-RAISED[^\n]*a fixed place with no point in reach that §2\.7's laws admit", r"F-V-RAISED"),
 ("V07 ## 4's lead (V7-2 (2))", 'V07', r'^## 4 ', r"no village tool refuses a declaration but where §7\.1's dry-run outcomes refuse one", r"V07 ## 4"),
 ("T-V7-48 and its T3 palisade stroke refused (V7-2 (4))", 'V07', r'^## 7 ', r"\| T-V7-48 \|[^\n]*a T3 `wall` palisade stroke across the declared aqueduct refused `refuse\.raised\.meeting`", r"T-V7-48"),
 ("V07 `raised.deck` citing §8.2's slot 19a (V7-3)", 'V07', r'^### 5\.1 ', r"as §8\.2's slot 19a, this order's one home, places it \(item 110 \(b\)\)", r"raised\.deck"),
 # V09
 ("`bend.wall.raisedCrossing` (V09 §4.9 row) and its gate line form (V9-1)", 'V09', r'^### 4\.9 ', r"\| `bend\.wall\.raisedCrossing`[^\n]*\"The gate for \{road\} stands \{m\} m along it, where a gate can stand; the wall passes through it\.\"", r"bend\.wall\.raisedCrossing"),
 ("`bend.raised.wall` (V09 §4.9 row) and its keep-clear form", 'V09', r'^### 4\.9 ', r"\| `bend\.raised\.wall` \|[^\n]*keeps clear of \{wall\}, \{m\} m off your line", r"bend\.raised\.wall\b"),
 ("`bend.raised.underSpan` (V09 §4.9 row; V9-4)", 'V09', r'^### 4\.9 ', r"\| `bend\.raised\.underSpan`[^\n]*law 1, read with its terms, chiefly \(1\), \(5\), \(8\)", r"bend\.raised\.underSpan"),
 ("V09 §4.20.2 (4) (V9-2, V9-4)", 'V09', r'^#### 4\.20\.2 ', r"resolved by those laws, law 2, in its order — the crossing moved, else the way re-routed through the nearest gate of that wall, else refused", r"V09 §4\.20\.2"),
 ("T-V9-52 (V9-3: the first point the laws admit; the strip left on its entry side)", 'V09', r'^### 7\.1 ', r"\| T-V9-52 \|[^\n]*on the side its grip came from, to the first point at which §2\.7's laws admit its footprint[^\n]*leaves the strip on the side it entered from", r"T-V9-52"),
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
