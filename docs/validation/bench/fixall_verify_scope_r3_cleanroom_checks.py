# fixall_verify_scope_r3_cleanroom_checks.py (lane fixall/verify-scope-r3, 2026-09-25; stdlib only; run from the project root)
# PENDING FABLE REVIEW — Opus-produced (fixall/verify-scope-r3), not yet checked by a Fable seat; queued in docs/FABLE-REVIEW-QUEUE.md.
# Measurements behind VS3-4 and VS3-5 of docs/validation/fix-all/r3-verify-scope.md. Prints counts only — never corpus content.
#  A. how much of FTG's content database (research/ftg-capture/presets.json) the pre-M-1 3-gram check of ARCHITECTURE §17.1 (2) (iii) can see
#  B. cost and yield of adding the string keys and values of every JSON file under research/ and captures/ to (iii), and captures/**/*.json to (ii)
#  C. §17.1 (2)'s calibration ("1 196 of 26 236 token 3-grams ... 27 runs") re-run with the committed doc_checks.py rule on a given text
import glob, json, re, sys, time
tok = lambda s: re.findall(r'[a-z0-9_]+', s.lower())
def walk(x, out):
    if isinstance(x, str): out.append(x)
    elif isinstance(x, dict):
        for k, v in x.items(): out.append(k); walk(v, out)
    elif isinstance(x, list):
        for v in x: walk(v, out)
fg = set(); ftext = []
for f in glob.glob('research/findings/*.md'):
    s = open(f, encoding='utf-8', errors='replace').read(); ftext.append(s.lower())
    t = tok(s); fg.update(zip(t, t[1:], t[2:]))
alltext = ' '.join(ftext)
# A
out = []; walk(json.load(open('research/ftg-capture/presets.json', encoding='utf-8')), out)
t = tok(' '.join(out)); g = list(zip(t, t[1:], t[2:]))
names = {s for s in out if re.fullmatch(r"[A-Za-z][A-Za-z '\-]{3,40}", s)}
print(f"A presets.json: {len(g)} token 3-grams, {sum(1 for x in g if x in fg)} shared with research/findings ({sum(1 for x in g if x in fg)/len(g):.3f}); "
      f"{len(names)} distinct name-like strings, {sum(1 for s in names if s.lower() not in alltext)} absent from every findings file")
# B
t0 = time.time(); jg = set(); n = 0
for f in glob.glob('captures/**/*.json', recursive=True) + glob.glob('research/**/*.json', recursive=True):
    o = []; walk(json.load(open(f, encoding='utf-8', errors='replace')), o); n += 1
    for s in o:
        if len(s) >= 200: continue
        w = [x for x in tok(s) if not x.isdigit()]
        jg.update(zip(w, w[1:], w[2:]))
doc = open('docs/ARCHITECTURE.md', encoding='utf-8').read()
t = tok(doc); g = list(zip(t, t[1:], t[2:]))
def runs(S):
    r, run = [], []
    for k, x in enumerate(g + [None]):
        if x is not None and x in S: run.append(k)
        else:
            if len(run) >= 3: r.append(' '.join(t[run[0]:run[-1] + 3]))
            run = []
    return r
rj = runs(jg); rf = set(runs(fg))
cols = set(m.lower() for m in re.findall(r'(?:#|0x)([0-9a-fA-F]{6})(?![0-9a-fA-F])', doc))
hexrx = re.compile(rb'(?<![0-9a-fA-F])([0-9a-fA-F]{6})(?![0-9a-fA-F])'); ch = set()
for f in glob.glob('captures/**/*.json', recursive=True):
    for m in hexrx.finditer(open(f, 'rb').read()):
        v = m.group(1).decode().lower()
        if v in cols: ch.add(v)
print(f"B {n} JSON files, {len(jg)} distinct string 3-grams, {time.time()-t0:.0f} s; whole ARCHITECTURE.md: {len(rj)} runs >= 3 against them, "
      f"{len([x for x in rj if x not in rf])} not already runs against the findings; {len(ch)} of the document's {len(cols)} colour values in captures JSON")
# C
for path in sys.argv[1:]:
    L = open(path, encoding='utf-8').read().split('\n')
    i = next(k for k, l in enumerate(L) if l.startswith('## §13 ')); j = next(k for k, l in enumerate(L) if l.startswith('# PART II'))
    t = tok('\n'.join(L[i:j])); g = list(zip(t, t[1:], t[2:]))
    lens, run = [], 0
    for x in g + [None]:
        if x is not None and x in fg: run += 1
        else:
            if run: lens.append(run)
            run = 0
    print(f"C {path.split('/')[-1]} §13–§17: {len(g)} token 3-grams, {sum(1 for x in g if x in fg)} shared, runs of >= 3 shared 3-grams (>= 5 tokens): {sum(1 for r in lens if r >= 3)}")
