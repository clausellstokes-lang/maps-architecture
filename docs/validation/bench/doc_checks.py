# usage: python3 doc_checks.py [--doc docs/ARCHITECTURE.md] [--sections "13.2,13.3,16,Judgment calls"] [--allow docs/validation/doc-checks-allow.tsv]
# PENDING FABLE REVIEW — written by opus standing in for the Fable seat fixall/draft-scope-r3 (2026-09-25); revised by opus stand-in (fixall/draft-scope-r4, 2026-09-26: VS3-4, C4; fixall/draft-scope-r5, 2026-09-26: VS4-1, S1's cell count; design/cleanroom-fix-1, 2026-10-03: the corpus rule); queued in docs/FABLE-REVIEW-QUEUE.md.
#        (lanes fixall/draft-scope-r3, -r4 and -r5; stdlib only; run from the project root)
# The scripted document checks of ARCHITECTURE §17.1 (2). Every seat that writes docs/ARCHITECTURE.md — a fix-all
# integration seat, an amendment pass's apply and repair lanes, any finishing or repair seat — runs them before its change
# lands (VS2-8); from M-1 the hashed deny-list scan of §17.1 (5), which carries the same list check on salted digests,
# replaces the content checks C1–C4 over this document, and S1 and S2 stay:
#   C1 identifiers  whole-word, case-sensitive grep of the document for the backticked identifiers of
#                   research/findings/ftg-payload-visual.md §7.2 plus one time-setting message name (FTG-22)
#   C2 colours      every six-digit colour value of the document (#rrggbb or 0xrrggbb) looked up, case-insensitively and
#                   hex-boundary-delimited, in research/ (text files, JSON included), captures/**/README*.md,
#                   captures/**/*.json (VS3-4), docs/confidence/, docs/improvements/, docs/CONFIDENCE.md, docs/IMPROVEMENTS.md
#   C3 3-grams      token 3-grams (lower-cased [a-z0-9_] runs) of the checked sections that also occur in the corpus: every
#                   3-gram of research/findings/*.md, plus (VS3-4) every 3-gram of the string keys and values of every JSON
#                   file under research/ and captures/, taken in document order with purely numeric tokens dropped; a hit
#                   is a maximal run of >= 3 consecutive shared 3-grams (>= 5 shared tokens in a row), reported with its
#                   text for review
#   C4 lists        (VS3-4) a copied list in any order: every JSON file under research/ and captures/ except the
#                   profiler's recordings (call censuses, coverage, idle, trace, draw and path records, run reports,
#                   metadata, session and index files — code identifiers and events, covered by C1 and C3) is read for
#                   its lists: a dict's keys, an array of strings, and one field's string values across >= 3 records;
#                   a hit is a line of the checked sections holding >= 5 distinct whole words (>= 4 letters) that are
#                   members of one such list, reported as those words, sorted
#   corpus          (2026-10-03) reference material only: C2-C4 leave our own outputs out (research/sf/, research/baselines/
#                   and M-1's capture records inside captures/; the rule is stated where the corpus is read); an M-1
#                   folder's stats.json, our script's table of the reference's exports, is read for its STRING VALUES
#                   only (the generated names it transcribes), never its keys (our own field names) -- R-38, 2026-10-03
#   S1 tables       outside fenced code (a fence may be indented, as inside a list item), every line that starts with '|'
#                   also ends with '|', no non-table line sits between two table lines, and (VS4-1) every row has its
#                   header's number of cells, counting only unescaped pipes: GitHub-flavoured Markdown splits a cell at
#                   every unescaped '|', inside a code span too, and drops the cells beyond the header's count, so a bare
#                   pipe in code silently truncates the row (write '\|')
#   S2 pointers     every §n / §n.m pointer resolves to a heading of the document
# A hit is *reviewed* when the allow file holds its check id and exact text with a written reason; the exit status is 1
# when any hit is unreviewed. Prints counts and hits only — never corpus content beyond the matched run or words.
import argparse, glob, json, os, re, sys
from collections import defaultdict
ap = argparse.ArgumentParser()
ap.add_argument('--doc', default='docs/ARCHITECTURE.md')
ap.add_argument('--sections', default='', help='comma list of heading keys (e.g. 13.2, 16, "Judgment calls"); empty = whole document for C3 and C4')
ap.add_argument('--allow', default='docs/validation/doc-checks-allow.tsv')
ap.add_argument('--heads', default='', help='document whose headings resolve S2 pointers (default: --doc itself)')
a = ap.parse_args()
doc = open(a.doc, encoding='utf-8').read()
lines = doc.split('\n')
allow = set()
if os.path.exists(a.allow):
    for ln in open(a.allow, encoding='utf-8'):
        if ln.strip() and not ln.startswith('#'):
            parts = ln.rstrip('\n').split('\t')
            if len(parts) >= 3 and parts[2].strip():
                allow.add((parts[0], parts[1]))
hits = []   # (check, text, where)
def hit(check, text, where): hits.append((check, text, where))
# ---------- C1 identifiers
src = open('research/findings/ftg-payload-visual.md', encoding='utf-8').read().split('\n')
start = next(i for i, l in enumerate(src) if l.startswith('### 7.2'))
end = next(i for i in range(start + 1, len(src)) if src[i].startswith('### ') or src[i].startswith('## '))
idents = sorted(set(re.findall(r'`([A-Za-z_][A-Za-z0-9_.]*)`', '\n'.join(src[start:end]))) | {'SET_TIME'})
for ident in idents:
    rx = re.compile(r'(?<![A-Za-z0-9_])' + re.escape(ident) + r'(?![A-Za-z0-9_])')
    for i, l in enumerate(lines):
        if rx.search(l): hit('C1', ident, f'l. {i + 1}')
# ---------- C2 colours
cols = set(m.lower() for m in re.findall(r'(?:#|0x)([0-9a-fA-F]{6})(?![0-9a-fA-F])', doc))
# The corpus is reference material only (rule of 2026-10-03, lane design/cleanroom-fix-1, as asked by
# docs/calibration/E01-capture-plan.md §7, E02-ftg-captures.md §7 and E16-denylist.md §§5 and 7): what the reference
# programs and their authors made, never our own outputs, which otherwise come back as phantom hits on our own words.
# Left out: research/sf/ (SettlementForge, the owner's own program, not a reference: §17.1 (3), (6)); research/baselines/
# (M-1's own research-side outputs, which cross into plat/ by §17.1 (4)); and the record files M-1's capture lanes write
# inside captures/: in a capture folder dated on or after M-1's first capture day, the READMEs and the facts, stats,
# plan, check, index and probe files our seats wrote beside the recordings. The recordings stay in (session/, draw/,
# steps/ and every network body, the reference programs' exports and request bodies, the recorder's meta files), and so
# do the capture records made before M-1, which the reviewed rows of the allow file were read against.
# One record is read for its values only (R-38, lane m1/rulings-2, 2026-10-03, settling the clean-room verifier's P1):
# an M-1 folder's stats.json is our script's table over the reference's exports, so its string values transcribe what
# the reference generated (city names the exports also hold, in files this checker never opens) while its keys are our
# own field names (phantom C3 runs and C4 lists on our own words, the reason R-30 cut our records). C3 and C4 therefore
# read its string values in document order and its per-field value lists, and never its keys.
OWN_TREES = ('research/sf/', 'research/baselines/')
M1_FIRST_CAPTURE_DAY = '2026-10-03'
OWN_RECORD = re.compile(r'(?:^|/)(?:README[^/]*\.md|capture-facts\.json|plan[^/]*\.json|[^/]*-check\.json|index\.json)$|/probe/')
VALUES_ONLY = re.compile(r'(?:^|/)stats\.json$')
RECORDING = re.compile(r'/(?:session|draw|steps|coverage|profile|network)/')
own_left_out = set()
own_values_only = set()
def m1_capture_record(p):
    """True when p lies in a capture folder dated on or after M-1's first capture day, outside its recordings."""
    day = re.search(r'\d{4}-\d{2}-\d{2}', p) if p.startswith('captures/') else None   # a capture folder's name carries its day
    return bool(day and day.group(0) >= M1_FIRST_CAPTURE_DAY and not RECORDING.search(p))
def reference(f):
    """True for reference material; our own outputs (above) are counted and left out."""
    p = f.replace(os.sep, '/')
    own = p.startswith(OWN_TREES) or bool(m1_capture_record(p) and OWN_RECORD.search(p))
    if own: own_left_out.add(p)
    return not own
def values_only(f):
    """True for an M-1 folder's stats.json: its string values are corpus, its keys are not (R-38)."""
    p = f.replace(os.sep, '/')
    v = bool(m1_capture_record(p) and VALUES_ONLY.search(p))
    if v: own_values_only.add(p)
    return v
corpus_files = [f for f in glob.glob('research/**/*', recursive=True)
                if os.path.isfile(f) and f.rsplit('.', 1)[-1].lower() in ('md', 'txt', 'json', 'js', 'ts', 'tsv', 'csv', 'html', 'htm', 'svg', 'css', 'log', 'hx', 'xml', 'yaml', 'yml')
                and reference(f)]
corpus_files += [f for f in glob.glob('captures/**/README*.md', recursive=True) if reference(f)]
# Guard (2026-09-29): the reference corpus lives partly in folders kept off GitHub (captures/, research/patreon/, devlogs/,
# ftg-docs/, external/). Without them the C2-C4 checks see a smaller corpus and can report a FALSE clean.
_missing = [d for d in ('captures', 'research/patreon', 'research/devlogs', 'research/ftg-docs', 'research/external') if not os.path.isdir(d)]
if _missing:
    _w = 'WARNING: reference corpus INCOMPLETE (missing: ' + ', '.join(_missing) + ') - clean-room results are NOT authoritative; re-run on the machine that holds the corpus before any freeze'
    print(_w); print(_w, file=sys.stderr)

corpus_files += [f for f in glob.glob('captures/**/*.json', recursive=True) if reference(f)]   # VS3-4
corpus_files += glob.glob('docs/confidence/**/*', recursive=True) + glob.glob('docs/improvements/**/*', recursive=True)
corpus_files += ['docs/CONFIDENCE.md', 'docs/IMPROVEMENTS.md']
corpus_files = list(dict.fromkeys(corpus_files))
found = {}
hexrx = re.compile(rb'(?<![0-9a-fA-F])([0-9a-fA-F]{6})(?![0-9a-fA-F])')
for f in corpus_files:
    if not os.path.isfile(f) or not cols: continue
    try: data = open(f, 'rb').read()
    except OSError: continue
    for m in hexrx.finditer(data):
        v = m.group(1).decode().lower()
        if v in cols and v not in found: found[v] = f
for v in sorted(found): hit('C2', '#' + v, found[v])
# ---------- section selection for C3 and C4
def section_ranges(keys):
    heads = [(i, l) for i, l in enumerate(lines) if l.startswith('#')]
    out = []
    for key in keys:
        key = key.strip()
        if not key: continue
        for n, (i, l) in enumerate(heads):
            title = l.lstrip('#').strip()
            m = (title.startswith(key + ' ') or title.startswith('§' + key + ' ') or title == key or (not key[0].isdigit() and title.startswith(key)))
            if m:
                depth = len(l) - len(l.lstrip('#'))
                j = next((h for h, hl in heads[n + 1:] if len(hl) - len(hl.lstrip('#')) <= depth), len(lines))
                out.append((i, j)); break
        else:
            print(f'WARN section not found: {key}', file=sys.stderr)
    return out
ranges = section_ranges(a.sections.split(',')) if a.sections else [(0, len(lines))]
tok = lambda s: re.findall(r'[a-z0-9_]+', s.lower())
# ---------- the JSON corpus (VS3-4): one pass builds C3's document-order 3-grams and C4's lists
PROFILER = re.compile(r'(\.calls[^/]*\.json|\.coverage\.json|\.idle\.json|\.trace\.json|\.draw\.json|\.paths\.json|/report\.json|/meta\.json|/session\.json|/index\.json)$')
member = re.compile(r"[A-Za-z][A-Za-z '\-]{2,40}")
json_files = sorted(f for f in set(glob.glob('research/**/*.json', recursive=True) + glob.glob('captures/**/*.json', recursive=True))
                    if reference(f))   # reference material only (the corpus rule above)
shared = set()          # C3 corpus: findings + JSON document-order 3-grams
lists = set()           # C4 corpus: frozensets of lower-cased member strings
def add_list(seq):
    m = frozenset(s.lower() for s in seq if isinstance(s, str) and member.fullmatch(s))
    if len(m) >= 3: lists.add(m)
def records(vals):
    if not vals: return
    if all(isinstance(v, str) for v in vals): add_list(vals); return
    recs = [v for v in vals if isinstance(v, dict)]
    if len(recs) >= 3:
        for k in dict.fromkeys(k for r in recs for k in r):
            seq = []
            for r in recs:
                v = r.get(k)
                if isinstance(v, str): seq.append(v)
                elif isinstance(v, list): seq.extend(e for e in v if isinstance(e, str))
            add_list(seq)
for f in json_files:
    try: d = json.load(open(f, encoding='utf-8', errors='replace'))
    except (OSError, ValueError): print(f'WARN unreadable JSON: {f}', file=sys.stderr); continue
    stream = []; want_lists = not PROFILER.search(f); want_keys = not values_only(f)   # R-38: a values-only record's keys are ours
    stack = [d]
    def walk(x):
        if isinstance(x, str): stream.extend(t for t in tok(x) if not t.isdigit())
        elif isinstance(x, dict):
            for k, v in x.items():
                if want_keys: stream.extend(t for t in tok(k) if not t.isdigit())
                walk(v)
            if want_lists:
                if want_keys: add_list(list(x.keys()))
                records(list(x.values()))
        elif isinstance(x, list):
            for v in x: walk(v)
            if want_lists: records(x)
    sys.setrecursionlimit(100000); walk(d)
    shared.update(zip(stream, stream[1:], stream[2:]))
for f in glob.glob('research/findings/*.md'):
    t = tok(open(f, encoding='utf-8', errors='replace').read())
    shared.update(zip(t, t[1:], t[2:]))
# ---------- C3 3-gram runs
for (i0, i1) in ranges:
    t = tok('\n'.join(lines[i0:i1]))
    g = list(zip(t, t[1:], t[2:]))
    run = []
    for k, gg in enumerate(g + [None]):
        if gg is not None and gg in shared: run.append(k)
        else:
            if len(run) >= 3: hit('C3', ' '.join(t[run[0]:run[-1] + 3]), f'section from l. {i0 + 1}')
            run = []
# ---------- C4 lists in any order
index = defaultdict(list)
for li, m in enumerate(lists):
    for w in m:
        if re.fullmatch(r'[a-z]{4,}', w): index[w].append(li)
for (i0, i1) in ranges:
    for i in range(i0, i1):
        per = defaultdict(set)
        for w in set(re.findall(r'[a-z]+', lines[i].lower())):
            for li in index.get(w, ()): per[li].add(w)
        # tie-break (manager, 2026-09-26): among equally long matches report the lexicographically smallest word set, so a
        # reviewed line cannot resurface under another PYTHONHASHSEED (consistency/assemble-r0 §4)
        top = max((len(v) for v in per.values()), default=0)
        best = min((v for v in per.values() if len(v) == top), key=lambda v: ' '.join(sorted(v)), default=set())
        if len(best) >= 5: hit('C4', ' '.join(sorted(best)), f'l. {i + 1}')
# ---------- S1 tables, S2 pointers
fence = False; hdr = None   # hdr: the cell count of the current table's header row (VS4-1)
for i, l in enumerate(lines):
    if l.lstrip().startswith('```'): fence = not fence; hdr = None; continue
    if fence: continue
    s = l.rstrip()
    if s.startswith('|') and not s.endswith('|'): hit('S1', s[:60], f'l. {i + 1}')
    if s and not s.startswith('|') and i > 0 and i + 1 < len(lines) and lines[i - 1].rstrip().startswith('|') and lines[i + 1].rstrip().startswith('|'):
        hit('S1', s[:60], f'l. {i + 1}')
    if s.startswith('|'):
        cells = len(re.split(r'(?<!\\)\|', s)) - 2   # unescaped pipes only; a leading and a trailing pipe bound the row
        if hdr is None: hdr = cells
        elif cells != hdr: hit('S1', f'{cells} cells against {hdr}: ' + s[:60], f'l. {i + 1}')
    else: hdr = None
headnums = set()
for l in (open(a.heads, encoding='utf-8').read().split('\n') if a.heads else lines):
    m = re.match(r'#+\s+(?:§)?((?:\d+|[IVX]+)(?:\.\d+)*)\b', l)
    if m: headnums.add(m.group(1))
for i, l in enumerate(lines):
    for m in re.finditer(r'§((?:\d+|[IVX]+)(?:\.\d+)?)(?![\d.]*\d)', l):
        n = m.group(1)
        if n not in headnums: hit('S2', '§' + n, f'l. {i + 1}')
# ---------- report
un = [h for h in hits if (h[0], h[1]) not in allow]
by = {}
for h in hits: by.setdefault(h[0], [0, 0])[0] += 1
for h in un: by[h[0]][1] += 1
print(f'doc={a.doc} sections={a.sections or "all"} identifiers={len(idents)} colours={len(cols)} colour_files={len(corpus_files)} '
      f'json_files={len(json_files)} c3_corpus_3grams={len(shared)} c4_lists={len(lists)} own_outputs_left_out={len(own_left_out)} '
      f'own_values_only={len(own_values_only)}')
for c in ('C1', 'C2', 'C3', 'C4', 'S1', 'S2'):
    t, u = by.get(c, [0, 0]); print(f'{c}: {t} hits, {u} unreviewed')
for h in un: print('UNREVIEWED', h[0], '|', h[1], '|', h[2])
sys.exit(1 if un else 0)
