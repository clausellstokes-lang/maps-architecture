# fixall_verify_scope_r4_checks.py — receipts of the round-4 scope verification (lane fixall/verify-scope-r4, 2026-09-26; stdlib only; run from the project root)
# PENDING FABLE REVIEW — Opus-produced (fixall/verify-scope-r4), not yet checked by a Fable seat; queued in docs/FABLE-REVIEW-QUEUE.md.
# A  VS3-5: the §17.1 (2) calibration re-computed by the verifier's own code on the committed slice (its fixture banner, line 2, dropped as the banner says)
# B  VS3-4: paste test of doc_checks.py C4 — 40 alphabetised five-member lines from each list of FTG's content database that C4 indexes;
#    the test document is written to a temporary directory OUTSIDE the project and deleted; only counts are printed (clean room)
# C  table rows whose unescaped-pipe cell count differs from their header (outside fenced code, indented fences included) — the check S1 does not make
import re, glob, json, random, subprocess, tempfile, os, collections
tok = lambda s: re.findall(r'[a-z0-9_]+', s.lower())
sh = set()
for f in glob.glob('research/findings/*.md'):
    t = tok(open(f, encoding='utf-8', errors='replace').read()); sh.update(zip(t, t[1:], t[2:]))
L = open('docs/validation/bench/fixall_scope_r4_calib_pre_r3_s13_s17.txt', encoding='utf-8').read().split('\n')
L = [L[0]] + L[2:]
t = tok('\n'.join(L)); g = list(zip(t, t[1:], t[2:]))
runs = []; run = []
for k, x in enumerate(g + [None]):
    if x is not None and x in sh: run.append(k)
    else:
        if len(run) >= 3: runs.append(' '.join(t[run[0]:run[-1] + 3]))
        run = []
print('A 3-grams %d, shared %d, runs of >= 3 shared 3-grams %d (%d distinct)' % (len(g), sum(1 for x in g if x in sh), len(runs), len(set(runs))))
# B
d = json.load(open('research/ftg-capture/presets.json'))
member = re.compile(r"[A-Za-z][A-Za-z '\-]{2,40}")
cands = {}
def add(name, seq):
    m = sorted({s for s in seq if isinstance(s, str) and member.fullmatch(s)})
    if len(m) >= 10: cands[name] = m
for key in ('buildings', 'knownProfessions'):
    recs = d[key]
    if recs and all(isinstance(r, str) for r in recs): add(key, recs)
    else:
        for k in dict.fromkeys(k for r in recs if isinstance(r, dict) for k in r):
            add(key + '.' + k, [r.get(k) for r in recs if isinstance(r, dict)])
rnd = random.Random(20260926); lines = []; tags = []
for n, m in cands.items():
    for _ in range(40): lines.append('- ' + ', '.join(sorted(rnd.sample(m, 5)))); tags.append(n)
with tempfile.TemporaryDirectory() as td:
    p = os.path.join(td, 'paste.md'); open(p, 'w').write('# T\n\n### 99.1 Test\n\n' + '\n'.join(lines) + '\n')
    r = subprocess.run(['python3', 'docs/validation/bench/doc_checks.py', '--doc', p, '--sections', '99.1', '--allow', '/dev/null', '--heads', 'docs/ARCHITECTURE.md'], capture_output=True, text=True)
hit = set(int(x) for x in re.findall(r'C4.*?l\. (\d+)', r.stdout))
caught = collections.Counter(tags[i] for i in range(len(tags)) if (5 + i) in hit)
for j, n in enumerate(cands): print('B list %d (%s): %d members, pasted alphabetised five-member lines caught by C4 %d / 40' % (j + 1, 'building types' if n.startswith('buildings') else 'professions', len(cands[n]), caught[n]))
# C
A = open('docs/ARCHITECTURE.md', encoding='utf-8').read().split('\n')
fence = False; hdr = None; bad = []
for i, l in enumerate(A):
    if l.lstrip().startswith('```'): fence = not fence; hdr = None; continue
    if fence: continue
    s = l.strip()
    if s.startswith('|'):
        cells = len(re.split(r'(?<!\\)\|', s)) - 2
        if hdr is None: hdr = cells; continue
        if cells != hdr: bad.append((i + 1, cells, hdr, s.split('|')[1].strip()))
    else: hdr = None
print('C table rows whose cell count differs from the header: %d' % len(bad))
for b in bad: print('C   l. %d: %d cells against %d (row %s)' % b)
