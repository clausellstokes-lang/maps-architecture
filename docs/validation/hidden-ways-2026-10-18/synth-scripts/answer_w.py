#!/usr/bin/env python3
"""hidden-ways/answer (2026-10-19): writes the owner's decision J421 (2026-10-19 07:12Z, "i follow your
recommendations", answering V13 §11 Q5) into the two deliverables, in fix_w2.py's form: draft-w.md and
draft-w.fragments.json edited in place together (item 966 (c)'s New text gains one sentence, identically in the md
blockquote and the JSON record's new; its id, line, md5 and old untouched; its Evidence line gains a note; the draft's
status line says the application is decided), and docs/HOST-REPLY-HIDDEN-WAYS-2026-10-18.md (§9.1 the owner's answer,
§3.8 and the header and closing status). Every substitution must find its text exactly once. Run with python3 -I;
then check_json.py and verify_w3.py re-check the machine copy against the live targets."""
import hashlib, json, sys
ROOT = '/home/user/maps-architecture'
DIR = f'{ROOT}/docs/validation/hidden-ways-2026-10-18'
REPLY = f'{ROOT}/docs/HOST-REPLY-HIDDEN-WAYS-2026-10-18.md'
def md5b(b): return hashlib.md5(b).hexdigest()
EXPECT = {f'{DIR}/draft-w.md': '3576d8305067ce913739301e2142e8ac',
          f'{DIR}/draft-w.fragments.json': 'a9a34c0a26f15510e51109fd24b99849',
          REPLY: 'fa7ee8563d6e3352da16207b3912e223'}
for k, v in EXPECT.items():
    if md5b(open(k, 'rb').read()) != v: sys.exit(f'input {k} is not the pre-answer copy')
JS = open(f'{DIR}/draft-w.fragments.json', encoding='utf-8').read()
F = json.loads(JS)
MD = open(f'{DIR}/draft-w.md', encoding='utf-8').read()
RP = open(REPLY, encoding='utf-8').read()
BY = {f['id']: f for f in F}
problems = []
def bq(s): return '\n'.join(('> ' + l) if l else '>' for l in s.split('\n'))
def once(txt, o, n, tag):
    c = txt.count(o)
    if c != 1: problems.append(f'[{tag}] {o[:70]!r} occurs {c}x'); return txt
    return txt.replace(o, n, 1)

# ---------------------------------------------------------------- (2) item 966 (c): the answered sentence
fr = BY['966 (c)']; keep = (fr['id'], fr['file'], fr['line'], fr['md5'], fr['old'])
TAIL = "re-canonize after its genesis mount (J388's pattern), said in H32."
ANS = ("re-canonize after its genesis mount (J388's pattern), said in H32. **Answered 2026-10-19 (J421):** the owner\n"
       "followed the session's recommendations — the price accepted (M-W2 10 pw, the staged row 39–47) and M-W2 named; the\n"
       "host's stand-in from `routeFacts`' stretches meanwhile; the trod record a product of the simulator feed.")
s0 = fr['new']
if not s0.endswith(TAIL) or s0.count(TAIL) != 1: problems.append('966 (c): new does not end with the expected line')
s1 = s0[:-len(TAIL)] + ANS
key = '*New text:*\n' + bq(s0) + '\n*Evidence:* '
c = MD.count(key)
if c != 1: problems.append(f'md 966 (c): New block occurs {c}x')
else:
    i = MD.index(key) + len(key); j = MD.index('\n', i)
    ev = MD[i:j] + (" Answered by the owner (J421, 2026-10-19 07:12Z, verbatim: \"i follow your recommendations\"); the"
                    " answered sentence appended by hidden-ways/answer (2026-10-19; `answer.md`, `synth-scripts/answer_w.py`);"
                    " the Current text, line and md5 unchanged.")
    MD = MD[:MD.index(key)] + '*New text:*\n' + bq(s1) + '\n*Evidence:* ' + ev + MD[j:]
    fr['new'] = s1
if (fr['id'], fr['file'], fr['line'], fr['md5'], fr['old']) != keep: problems.append('966 (c): a kept field changed')

# ---------------------------------------------------------------- (3) the draft's status line
MD = once(MD, "**PENDING APPLICATION** (draft; applied after the owner's look).",
  "**APPLIED ON 2026-10-19 ON THE OWNER'S DECISION** (J421, 2026-10-19 07:12Z, verbatim: \"i follow your"
  " recommendations\" — the answer to V13 §11 Q5, item 966 (c): the price accepted and M-W2 named; the host's stand-in"
  " from `routeFacts`' stretches meanwhile; the trod record a product of the simulator feed). The application is the"
  " apply lane's (J422), which writes `docs/AMENDMENTS-2026-10-18w.md` from this draft and its machine copy with its own"
  " APPLIED line; the answer itself was written into item 966 (c)'s new text and the reply's §9.1 by hidden-ways/answer"
  " (`answer.md`, by `synth-scripts/answer_w.py`, re-checked by `synth-scripts/check_json.py` and"
  " `synth-scripts/verify_w3.py`).", 'draft status')

# ---------------------------------------------------------------- (1) the reply
RP = once(RP, "(items 955–975, 114 fragments; the machine copy `draft-w.fragments.json`) — **pending the owner's look**; nothing is\n"
              "applied, and every line below that says \"will\" means \"once file w is applied\".",
  "(items 955–975, 114 fragments; the machine copy `draft-w.fragments.json`) — **decided by the owner on 2026-10-19**\n"
  "(J421, §9.1: \"i follow your recommendations\") and **applied today** as `docs/AMENDMENTS-2026-10-18w.md`; every line\n"
  "below that says \"will\" means \"once file w is applied\".", 'reply header')
RP = once(RP, "it) and puts that reading to the owner as part of Q5 (§9), vetoable.",
  "it) and put that reading to the owner as part of Q5 (§9), who confirmed it on 2026-10-19 (J421, §9.1).", 'reply §3.8')
RP = once(RP, "### 9.1 The one owner decision (V13 §11 Q5, item 966 (c); every other ruling is the session's, vetoable)",
  "### 9.1 The one owner decision (V13 §11 Q5, item 966 (c); answered 2026-10-19, J421; every other ruling is the session's, vetoable)", 'reply §9.1 head')
RP = once(RP, "slot, it needs the host's automatic receipted re-canonize after the genesis mount (J388's pattern), which H32 would then\nsay.\n",
  "slot, it needs the host's automatic receipted re-canonize after the genesis mount (J388's pattern), which H32 would then\nsay.\n\n"
  "**The owner's answer (2026-10-19, J421).** Asked Q5, the owner answered on 2026-10-19 at 07:12Z, verbatim: \"i follow\n"
  "your recommendations\". So: (1) **the price is accepted and M-W2 is named** — M-W2 is re-declared 8 → 10 pw (the trods\n"
  "≈ 1, the junction ends and the fork rule ≈ 1), the staged row 39–47, and it is the milestone that carries the trods,\n"
  "their record, their reveal and the junction ends; (2) **the stand-in meanwhile** — your bodies chain may build its\n"
  "stand-in cover graph from `routeFacts`' stretches and retire it when the trod record lands; (3) **the product reading\n"
  "is confirmed** — the trod record reaches you as the simulator feed's third optional product, beside `routeFacts` and\n"
  "`patrolOffer`, not as a canon slot, so H32 asks no re-canonize. You may now list **M-W2** as the bodies chain's\n"
  "prerequisite (with your own H9, H12, H17 and H32; §9.2). The answer is written into V13 §11 Q5 by item 966 (c), and\n"
  "file w is applied as `docs/AMENDMENTS-2026-10-18w.md`.\n", 'reply §9.1 answer')
RP = once(RP, "the design is draft w, pending the owner's look;\nnothing applied; no git run.",
  "the design is draft w; the owner decided Q5 on\n2026-10-19 (J421, §9.1: \"i follow your recommendations\"), the answer written into §9.1 and item 966 (c) the same day\n"
  "by hidden-ways/answer, and file w is applied today as `docs/AMENDMENTS-2026-10-18w.md`; no git run.", 'reply closing status')

if problems:
    print('FAIL'); [print(' -', p) for p in problems]; sys.exit(1)
out = json.dumps(F, ensure_ascii=False, indent=1)
# keep the machine copy's own serialisation: re-encode only if the original round-trips
if json.dumps(json.loads(JS), ensure_ascii=False, indent=1) != JS.rstrip('\n'):
    for ind in (None, 2):
        if json.dumps(json.loads(JS), ensure_ascii=False, indent=ind) == JS.rstrip('\n'): out = json.dumps(F, ensure_ascii=False, indent=ind); break
    else: sys.exit('cannot reproduce the JSON serialisation')
if JS.endswith('\n'): out += '\n'
open(f'{DIR}/draft-w.fragments.json', 'w', encoding='utf-8').write(out)
open(f'{DIR}/draft-w.md', 'w', encoding='utf-8').write(MD)
open(REPLY, 'w', encoding='utf-8').write(RP)
for p in (f'{DIR}/draft-w.md', f'{DIR}/draft-w.fragments.json', REPLY):
    b = open(p, 'rb').read(); print(p.split('/')[-1], md5b(b), b.count(b'\n'), 'lines')
