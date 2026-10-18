# fixall_scope_r4_cleanroom.py (lane fixall/draft-scope-r4, 2026-09-26; stdlib only; own code; run from the project root)
# PENDING FABLE REVIEW — written by opus standing in for the Fable seat fixall/draft-scope-r4 (2026-09-25); queued in docs/FABLE-REVIEW-QUEUE.md.
# Receipts behind VS3-4 and VS3-5 (docs/validation/fix-all/r4-scope.md). Prints counts only — never corpus content.
#  A. VS3-5: §17.1 (2)'s calibration re-run with the committed C3 rule (findings corpus, runs of >= 3 shared 3-grams) on the
#     committed slice fixall_scope_r4_calib_pre_r3_s13_s17.txt (lines 6657-7826 of the pre-round-3 text, md5
#     ca2e20669f557e6e6de113c069811fe0, i.e. §13-§17 as they stood after round 2), per section and over thresholds 1-7;
#     and on today's §13-§17.
#  B. VS3-4: what the JSON corpus adds to C3 over the whole current document, and C4's hits there.
#  C. VS3-4: a paste test — names of FTG's content database (research/ftg-capture/presets.json) written as one list line,
#     alphabetised and in the database's order, 5 and 10 names: caught by C3 on the findings alone, by C3 with the JSON
#     corpus, by C4.
#  D. VS3-4: how many of the document's colour values occur in captures/**/*.json.
import glob, json, random, re, sys, time
from collections import defaultdict
tok = lambda s: re.findall(r'[a-z0-9_]+', s.lower())
def runs(text, S, k=3):
    t = tok(text); g = list(zip(t, t[1:], t[2:])); r, run = [], []
    for i, x in enumerate(g + [None]):
        if x is not None and x in S: run.append(i)
        else:
            if len(run) >= k: r.append(' '.join(t[run[0]:run[-1] + 3]))
            run = []
    return r
F = set()
for f in glob.glob('research/findings/*.md'):
    t = tok(open(f, encoding='utf-8', errors='replace').read()); F.update(zip(t, t[1:], t[2:]))
# ---- A
def calib(label, text):
    t = tok(text); g = list(zip(t, t[1:], t[2:]))
    print(f'A {label}: {len(g)} token 3-grams, {sum(1 for x in g if x in F)} shared with research/findings; '
          f'runs of >= 3 shared 3-grams (>= 5 tokens): {len(runs(text, F))} ({len(set(runs(text, F)))} distinct)')
    parts = re.split(r'(?m)^(?=## §1[3-7] )', text)
    print('A   per section: ' + ', '.join(f'{p.split(chr(10))[0][3:7].strip()} {len(runs(p, F))}' for p in parts if p.startswith('## §')))
    print('A   runs by threshold k (runs of >= k shared 3-grams), k = 1..7: ' + ', '.join(f'{k}: {len(runs(text, F, k))}' for k in range(1, 8)))
pre = '\n'.join(l for l in open('docs/validation/bench/fixall_scope_r4_calib_pre_r3_s13_s17.txt', encoding='utf-8').read().split('\n') if not (l.startswith('> PENDING FABLE REVIEW') and '(Fixture:' in l))   # the fixture's own banner line is not part of the measured text
calib('pre-round-3 §13-§17 (committed slice)', pre)
L = open('docs/ARCHITECTURE.md', encoding='utf-8').read().split('\n')
i = next(k for k, l in enumerate(L) if l.startswith('## §13 ')); j = next(k for k, l in enumerate(L) if l.startswith('# PART II'))
calib('current docs/ARCHITECTURE.md §13-§17', '\n'.join(L[i:j]))
# ---- the JSON corpora, built as docs/validation/bench/doc_checks.py builds them
PROFILER = re.compile(r'(\.calls[^/]*\.json|\.coverage\.json|\.idle\.json|\.trace\.json|\.draw\.json|\.paths\.json|/report\.json|/meta\.json|/session\.json|/index\.json)$')
member = re.compile(r"[A-Za-z][A-Za-z '\-]{2,40}")
t0 = time.time(); J = set(); lists = set(); ordered = []
files = sorted(set(glob.glob('research/**/*.json', recursive=True) + glob.glob('captures/**/*.json', recursive=True)))
sys.setrecursionlimit(100000)
for f in files:
    d = json.load(open(f, encoding='utf-8', errors='replace')); stream = []
    want = not PROFILER.search(f); keep = f == 'research/ftg-capture/presets.json'
    def add(seq):
        nm = [s for s in seq if isinstance(s, str) and member.fullmatch(s)]
        m = frozenset(s.lower() for s in nm)
        if len(m) >= 3:
            lists.add(m)
            if keep: ordered.append(list(dict.fromkeys(nm)))
    def recs(vals):
        if not vals: return
        if all(isinstance(v, str) for v in vals): add(vals); return
        r = [v for v in vals if isinstance(v, dict)]
        if len(r) >= 3:
            for k in dict.fromkeys(k for x in r for k in x):
                seq = []
                for x in r:
                    v = x.get(k)
                    if isinstance(v, str): seq.append(v)
                    elif isinstance(v, list): seq.extend(e for e in v if isinstance(e, str))
                add(seq)
    def walk(x):
        if isinstance(x, str): stream.extend(t for t in tok(x) if not t.isdigit())
        elif isinstance(x, dict):
            for k, v in x.items(): stream.extend(t for t in tok(k) if not t.isdigit()); walk(v)
            if want: add(list(x.keys())); recs(list(x.values()))
        elif isinstance(x, list):
            for v in x: walk(v)
            if want: recs(x)
    walk(d); J.update(zip(stream, stream[1:], stream[2:]))
print(f'B JSON files {len(files)} ({sum(1 for f in files if not PROFILER.search(f))} read for C4 lists), {len(J)} distinct document-order 3-grams, {len(lists)} distinct lists, {time.time() - t0:.0f} s')
index = defaultdict(list)
for li, m in enumerate(lists):
    for w in m:
        if re.fullmatch(r'[a-z]{4,}', w): index[w].append(li)
def c4(line):
    per = defaultdict(set)
    for w in set(re.findall(r'[a-z]+', line.lower())):
        for li in index.get(w, ()): per[li].add(w)
    return max((len(v) for v in per.values()), default=0) >= 5
doc = '\n'.join(L)
rF = runs(doc, F); rFJ = runs(doc, F | J)
print(f'B whole current document: C3 runs {len(rF)} on the findings alone, {len(rFJ)} with the JSON corpus; '
      f'{len(set(rFJ) - set(rF))} distinct run texts new with the JSON corpus; C4 lines flagged {sum(1 for l in L if c4(l))}')
# ---- C
random.seed(20260926); res = defaultdict(int); n = 0
for c in ordered:
    names = [x for x in c if re.fullmatch(r'[A-Za-z]{4,}', x)]
    if len(names) < 10: continue
    n += 1
    for k in (5, 10):
        for order in ('alphabetised', 'database order'):
            pick = sorted(random.sample(names, k)) if order == 'alphabetised' else names[:k]
            line = '* ' + ', '.join(pick)
            res[(k, order, 'C3 findings')] += bool(runs(line, F)); res[(k, order, 'C3 +JSON')] += bool(runs(line, F | J)); res[(k, order, 'C4')] += c4(line)
for k in (5, 10):
    for order in ('alphabetised', 'database order'):
        print(f'C paste test, {n} presets.json lists, {k} names {order}: caught by C3 on the findings {res[(k, order, "C3 findings")]}, '
              f'by C3 with the JSON corpus {res[(k, order, "C3 +JSON")]}, by C4 {res[(k, order, "C4")]}')
# ---- D
cols = set(m.lower() for m in re.findall(r'(?:#|0x)([0-9a-fA-F]{6})(?![0-9a-fA-F])', doc)); ch = set()
hexrx = re.compile(rb'(?<![0-9a-fA-F])([0-9a-fA-F]{6})(?![0-9a-fA-F])')
for f in glob.glob('captures/**/*.json', recursive=True):
    for m in hexrx.finditer(open(f, 'rb').read()):
        v = m.group(1).decode().lower()
        if v in cols: ch.add(v)
print(f'D {len(ch)} of the document\'s {len(cols)} colour values occur in captures/**/*.json')
