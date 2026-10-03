import re, json
INV = '/tmp/claude-0/-home-user-maps-architecture/ce371545-83c4-5807-9f2a-da73abd8485d/scratchpad/coherence/V06/inv-V06.tsv'
NEW = '/home/user/maps-architecture/docs/validation/coherence/new/volumes/V06-evolution.md'
t = open(NEW).read()
rows = [l.rstrip('\n').split('\t') for l in open(INV)]

BCR_ITEM = {1: 317, 2: 321, 3: 254, 4: 429, 5: 209, 6: 206, 7: 264, 8: 342, 9: 343, 10: 443, 11: 458, 12: 388, 13: 275,
            14: 339, 15: 409, 16: 550, 17: 335, 18: 336, 19: 293, 20: 265, 21: 266, 22: 478, 23: 479, 24: 260, 25: 290,
            26: 291, 27: 573, 28: 574}
REF = {
    'V06-0099': 'V06 §2.2 — cites V11 §3.18 (the four cells named, no values)',
    'V06-0100': "V06 §2.2 — cites V09 §9's *History* settings",
    'V06-0110': "V06 §2.7 — cites §2.7's `Enceinte` for the fields; keeps only their rules (fate drawn once, keep, eligibleWeek, edit source, the occupied-share row)",
    'V06-0111': "V06 §2.8 [REF-HOME] — `EvolveOp` stated here: the landed base names it in §4.11's union and defers its members to V06 (model §2.8's cause comment; determinism §7.1 \"V06's EvolveOp\"); cross-part note 1",
    'V06-0112': "V06 §2.8 [REF-HOME] — `repairWall` as one `EvolveOp` member (no-op with its line on a ring with nothing to lift, V06-ICONF-1); cross-part note 1",
    'V06-0113': "V06 §2.8 [REF-HOME] — `retypeLand` as one `EvolveOp` member; cross-part note 1",
    'V06-0114': "V06 §2.8 — cites §2.4's `Way.formerClass` (item 209)",
    'V06-0115': "V06 §2.9 [REF-HOME] — `Use.strain` stated here (the landed base §2.7 `Use` lacks it); cross-part note 2",
    'V06-0129': "V06 §2.12 — the crypt row cites V03 §3.7.2's lifecycle row",
    'V06-0150': "V06 §3.2 — the arch-vault reconcile cites V04 §3.5.4 (d) for what it lays, collapses and deletes; keeps only its place in the order",
    'V06-0279': "V06 §3.19 — *The rows the pass reads* cites V11 §3.24.2 (names only, no values)",
    'V06-0307': "V06 §4.5 — cites V10 §3.9's raised-way provider; keeps what this volume records for it",
    'V06-0345': "V06 §8 — *Exits and the calibration register* cites V12 §3.11 and its lint",
    'V06-0346': "V06 §8 — bar registrations cite V12 §2.1's `BenchBarDef`",
}
INDEX = {
    'V06-0012': "V06 §1.3 (pointer row: V05 §3.15)", 'V06-0013': "V06 §1.3 (pointer row: V04 §3.10, V04 §2.3, V04 §3.5)",
    'V06-0014': "V06 §1.3 (pointer row: V03 §3.7.4, V02's crypt ladder)", 'V06-0015': "V06 §1.3 (pointer row: items 105–108's base side, V11's rows, V07 §3.12)",
    'V06-0016': "V06 §1.3 (pointer row: the port's carriage, V08)", 'V06-0017': "V06 §1.3 (pointer row: item 110's base half, V04, V02, V01)",
    'V06-0065': "V06 §1b W80 (pointer row: V12's `BenchBarDef`)", 'V06-0253': "V06 §3.18 (pointer paragraph: V04 §2.2–§2.3, V04 §3.5, V04 §3.8, V04 §3.10)",
}

def first(pat, s):
    m = re.search(pat, s)
    return m.group(0) if m else None

out = []
for r in rows:
    iid, kind, sec, role = r[0], r[1], r[2], r[3]
    st = r[-1]
    if role == 'home':
        if sec == 'IN':
            if iid == 'V06-0500':
                loc = "folded: IN-V06-1 → V06 §3.10.1 (the `crypt: 'always'` column); IN-V06-2 → V06 §3.13 (4) *Stacks* and V06 §3.19 (7); IN-V06-3 → V06 §3.2's participant table (`reclearIsland`), V06 §3.19 (2), (5) (ground-arena candidates, `skyAccessObstacles`)"
            else:
                loc = "folded: IN-V06-4 → V06 §3.19.4 (5); IN-V06-5 → V06 §7 T-V6-65; IN-V06-6 → V06 §5.1 (*Open a copy from here*); IN-V06-7 → V06 §2.13"
        elif sec == 'RC':
            loc = "out of the volume (narration): the reconciliation ledgers are lane history; their decisions stand in the body; this report and the inventory record them"
        elif sec == '9':
            j = first(r'J-V6\.\d+', st)
            loc = f"V06 §9 {j}" if j else "V06 §9"
            if j == 'J-V6.4':
                loc += " (*superseded by J-V6.127*, E-24)"
            elif j in ('J-V6.5', 'J-V6.111'):
                loc += " (*amended by* mark, E-24)"
            elif j == 'J-V6.92':
                loc += " (reworded to the ruled form, V06-ICONF-2)"
            elif j == 'J-V6.102':
                loc += " (decided rule, CANON-C02)"
        elif sec == '7':
            ts = re.findall(r'T-V6-\d+', st)
            loc = "V06 §7 " + (', '.join(dict.fromkeys(ts)) if ts else '(families and fixtures)')
        elif sec == '1b':
            w = first(r'\bW\d+\b', st)
            if w:
                loc = f"V06 §1b {w}"
            elif 'trace' in st.lower() or 'dossier' in st.lower() or 'DR' in st:
                loc = "V06 §1b *The dossier trace*"
            else:
                loc = "V06 §1b"
        elif sec == '0':
            loc = "V06 §0"
        else:
            loc = f"V06 §{sec}"
    elif role == 'reference':
        loc = REF[iid]
    elif role == 'index-row':
        loc = INDEX[iid]
    elif role == 'bcr-pointer':
        ns = [int(x) for x in re.findall(r'BCR-V6-(\d+)', st)]
        ns = list(dict.fromkeys(ns))
        loc = "V06 §10 pointer row" + ('s' if len(ns) > 1 else '') + ': ' + '; '.join(f"BCR-V6-{n} → item {BCR_ITEM[n]}" for n in ns)
    elif role == 'answer-J121-J122':
        loc = "V06 §11 Q1 — *Answered: J122 — (a), right after M4*; price 29–41.5 pw; the pricing history out (V06-NARR-3)"
    elif role == 'history-out':
        loc = "V06 §12 — the two current paragraphs (CONFIRMED, PLAUSIBLE); the receipts, md5s and per-round reading records out (V06-NARR-4)"
    elif role == 'handoff':
        if iid == 'V06-0498':
            loc = "V06 §13 — *None open*; the measurement items are §12's PLAUSIBLE paragraph (E0, E7, E9)"
        else:
            loc = "V06 §13 — *None open*; X1–X49 each closed at its target (this report, *Hand-offs closed*)"
    else:
        loc = f"V06 §{sec}"
    out.append((iid, kind, sec, role, loc))
json.dump(out, open('/home/user/maps-architecture/docs/validation/coherence/work/rewrite-V06/mapping.json', 'w'), indent=0)
print(len(out))
import collections
print(collections.Counter(o[3] for o in out))
