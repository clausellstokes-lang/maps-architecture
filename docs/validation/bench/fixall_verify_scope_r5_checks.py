# PENDING FABLE REVIEW — Opus-produced (fixall/verify-scope-r5, 2026-09-26); queued in docs/FABLE-REVIEW-QUEUE.md.
# Receipts of docs/validation/fix-all/r5-verify-scope.md. Stdlib only; run from the project root:
#   python3 docs/validation/bench/fixall_verify_scope_r5_checks.py > docs/validation/bench/fixall_verify_scope_r5_checks.out
# Prints counts, sums and ids only — no reference content.
#   A  §16 arithmetic: milestone estimates, effort-table lines, subtotal, total, cuts, calendar weeks, D-20, J-15 / J-S6,
#      and the six new components' working days (VS4-6)
#   B  table cell counts over the whole document, fences recognised when indented (VS4-1's rule, own code)
#   C  the D-5 NG template names against the FabricStrategyId values the document declares (VS5-2)
#   D  what §16's M1 and M2a rows say about a document of another output version (VS5-1)
import re, hashlib
P = 'docs/ARCHITECTURE.md'
raw = open(P, 'rb').read()
doc = raw.decode('utf-8'); L = doc.split('\n')
print('doc', P, 'lines', len(L) - (1 if L[-1] == '' else 0), 'md5', hashlib.md5(raw).hexdigest())
def rng(s): a, b = s.split('–'); return int(a), int(b)
# ---------- A
s16 = next(i for i, l in enumerate(L) if l.startswith('## §16 '))
e16 = next(i for i in range(s16 + 1, len(L)) if L[i].startswith('## §17 '))
ms = []
for l in L[s16:e16]:
    m = re.match(r'^\| \*\*(M[-0-9a-z]+) — .*\| (\d+–\d+) pw \|$', l)
    if m: ms.append((m.group(1), rng(m.group(2))))
print('A milestones', len(ms), ' '.join(f'{k} {a}-{b}' for k, (a, b) in ms))
lo = sum(a for _, (a, b) in ms); hi = sum(b for _, (a, b) in ms); print('A milestone sum', lo, hi)
lines = []; sub = tot = st2 = None
t0 = next(i for i in range(s16, e16) if L[i].startswith('| line | pw | basis |'))
for l in L[t0 + 2:e16]:
    if not l.startswith('|'): break
    c = [x.strip() for x in l.strip('|').split('|')]
    v = c[1].strip('*')
    if 'base subtotal' in c[0]: sub = rng(v)
    elif c[0].startswith('**total'): tot = rng(v)
    elif c[0].startswith('stage 2'): st2 = rng(v)
    else: lines.append(rng(v))
llo = sum(a for a, b in lines); lhi = sum(b for a, b in lines)
print('A effort lines', len(lines), 'sum', llo, lhi, 'stated subtotal', sub, 'stage 2', st2, 'stated total', tot)
print('A subtotal+stage2', llo + st2[0], lhi + st2[1], 'milestones == total', (lo, hi) == tot, 'lines == subtotal', (llo, lhi) == sub)
cuts = [(8, 14), (3, 5), (2, 3), (4, 6)]
clo = sum(a for a, b in cuts); chi = sum(b for a, b in cuts)
print('A cuts', clo, chi, 'base after cuts', sub[0] - clo, sub[1] - chi, 'total after cuts', tot[0] - clo, tot[1] - chi)
print('A calendar weeks (total / 2)', tot[0] / 2, tot[1] / 2)
days = [(3, 4), (4, 6), (2, 3), (3, 5), (1, 2), (1, 2)]
print('A six components, working days', sum(a for a, b in days), sum(b for a, b in days), '= pw', sum(a for a, b in days) / 5, sum(b for a, b in days) / 5)
for pat in ('about 153–204 expert person-weeks', 'about 77–102 calendar weeks', 'a base of ≈ 122–158 pw and a total of ≈ 136–176 pw',
            '**Effort ≈ 153–204 expert person-weeks: the base 139–186', 'reduce it to ≈ 136–176', '153–204 once the fix-all', 'now 153–204 with'):
    print('A phrase', repr(pat[:48]), re.sub(r'\s+', ' ', doc).count(pat))
# ---------- B
fence = False; hdr = None; bad = []; rows = 0
for i, l in enumerate(L):
    if l.lstrip().startswith('```'): fence = not fence; hdr = None; continue
    if fence: continue
    s = l.strip()
    if s.startswith('|'):
        rows += 1
        n = len(re.split(r'(?<!\\)\|', s)) - 2
        if hdr is None: hdr = n
        elif n != hdr: bad.append((i + 1, n, hdr))
    else: hdr = None
print('B table lines', rows, 'rows whose cell count differs from the header', len(bad), bad[:5])
# ---------- C
ids = set()
for l in L:
    m = re.search(r"strategy: FabricStrategyId;.*//\s*(.*)$", l)
    if m: ids |= set(re.findall(r"'([a-z-]+)'", m.group(1)))
m = re.search(r"reference: 'NG'; template: ([^;]+);", doc)
tpl = set(re.findall(r"'([a-z-]+)'", m.group(1)))
print('C FabricStrategyId values (II.1)', sorted(ids), '| D5Pair NG templates', sorted(tpl), '| templates that are no FabricStrategyId', sorted(tpl - ids))
print('C "setAttr(district.fabric, template)" occurrences', doc.count('setAttr(district.fabric, template)'))
# ---------- D
for key in ('**M1 — a viewable', '**M2a — the editing core**'):
    row = next(l for l in L[s16:e16] if key in l)
    print('D', key.strip('*')[:12], "mentions of 'outputVersion' / 'output version' / 'frozen view':",
          row.count('outputVersion'), row.count('output version'), row.count('frozen view'))
m3a = next(l for l in L[s16:e16] if '**M3a — full editing' in l)
print('D M3a mentions of frozen view', m3a.count('frozen view'), '| retention of output versions', m3a.count('retention of output versions'))
