#!/usr/bin/env python3
"""volrec.py (coherence/assemble-r7y, P3b, new) — each volume output (apply.py's, scratch out/) compared with what its
repair seat's header records for its dry run: sha256 where recorded, else bytes, lines, the live lines its diff touches,
and words (whitespace and wc). Writes volrec.json beside it. Never writes a live file."""
import difflib, hashlib, json, os, subprocess
ROOT = '/home/user/maps-architecture'
W = os.path.join(ROOT, 'docs/validation/coherence/work/assemble-r7y')
SCR = '/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/coherence/asm7y'
def changed(a, b):
    s = set(); ins = []
    for tag, i1, i2, j1, j2 in difflib.SequenceMatcher(None, a, b, autojunk=False).get_opcodes():
        if tag in ('replace', 'delete'): s.update(range(i1 + 1, i2 + 1))
        elif tag == 'insert': ins.append(i1)
    return sorted(s), ins
rec = {
 'V05-sky': dict(text="1 found, 1 applied, 0 skipped, audit not-OK 0; headings 62 → 62; fences balanced (14 → 14); 3 096 → 3 098 lines, "
                      "404 696 → 404 941 bytes (sha256 4517619dfe10fe5c…); the rationale file untouched; `diff` of live and output shows "
                      "the one line (live l. 2579) become three",
                 sha_prefix='4517619dfe10fe5c', bytes=404941, lines=3098, touched={2579}),
 'V06-evolution': dict(text="After the blocks: sha256 72fe7007503922403f6e2b7185016ed4deb532fb42e3098cdd123c1c3e1a10b6, 710 864 bytes, 4 667 "
                            "lines; 3 applied, audit not OK 0, headings 65 → 65, fences balanced (28 → 28); V06 116 276 → 116 393 words "
                            "(whitespace-split); §3.7 3 776 → 3 779, §3.19 6 668 → 6 676, ## 7 15 087 → 15 193",
                       sha256='72fe7007503922403f6e2b7185016ed4deb532fb42e3098cdd123c1c3e1a10b6', bytes=710864, lines=4667,
                       words=(116276, 116393),
                       sections={'### 3.7 ': (3776, 3779), '### 3.19 ': (6668, 6676), '## 7 ': (15087, 15193)}),
 'V07-village': dict(text="7 blocks found, 7 applied, 0 skipped; audit not-OK 0; headings 58 → 58; fences balanced (18 → 18); 622 038 → 622 965 "
                          "bytes, 4 124 → 4 132 lines (output sha256 a93d1f64212153ee…); the diff touches exactly live lines 1577–1578, "
                          "1616–1621, 2312–2320, 2769, 3026, 3257–3265, 3709 and 4122–4124; V07 101 097 → 101 249 words (wc -w)",
                     sha_prefix='a93d1f64212153ee', bytes=622965, lines=4132,
                     ranges=[(1577, 1578), (1616, 1621), (2312, 2320), (2769, 2769), (3026, 3026), (3257, 3265), (3709, 3709), (4122, 4124)],
                     wc_words=(101097, 101249)),
 'V09-application': dict(text="3 found, 3 applied, 0 skipped, audit OK (not OK 0); headings 110 → 110; fences balanced (24 → 24); title block "
                              "unchanged; lines 5,045 → 5,049; §4.9 13,268 → 13,342; §4.20.2 1,340 → 1,443; §7.1 11,622 → 11,683; the volume "
                              "126,345 → 126,579 words (wc)",
                         lines=5049, sections={'### 4.9 ': (13268, 13342), '#### 4.20.2 ': (1340, 1443), '### 7.1 ': (11622, 11683)},
                         vol_words=(126345, 126579)),
}
out = {}
for key, r in rec.items():
    f = f'docs/volumes/{key}.md'
    a = open(f'{SCR}/before/{f}', encoding='utf-8').read(); b = open(f'{SCR}/out/{f}', encoding='utf-8').read()
    bb = open(f'{SCR}/out/{f}', 'rb').read()
    al, bl = a.split('\n'), b.split('\n')
    ch, ins = changed(al, bl)
    wc = lambda p: int(subprocess.check_output(['wc', '-w', p], text=True, env=dict(os.environ, LC_ALL='POSIX')).split()[0])  # the seats' wc -w (POSIX locale)
    got = dict(bytes=len(bb), lines=b.count('\n'), sha256=hashlib.sha256(bb).hexdigest(), touched=ch, inserts_after=ins,
               words=[len(a.split()), len(b.split())], wc_words=[wc(f'{SCR}/before/{f}'), wc(f'{SCR}/out/{f}')])
    ok = True
    if 'sha256' in r: ok &= got['sha256'] == r['sha256']
    if 'sha_prefix' in r: ok &= got['sha256'].startswith(r['sha_prefix'])
    if 'words' in r: ok &= tuple(got['words']) == r['words']
    if 'ranges' in r:
        inr = lambda n: any(a <= n <= b for a, b in r['ranges'])
        got['all_touched_in_ranges'] = all(inr(n) for n in ch) and all(inr(i) or inr(i + 1) for i in ins)
        got['each_range_touched'] = all(any(a <= n <= b for n in ch) for a, b in r['ranges'])
        ok &= got['all_touched_in_ranges'] and got['each_range_touched']
    if 'bytes' in r: ok &= got['bytes'] == r['bytes']
    if 'lines' in r: ok &= got['lines'] == r['lines']
    if 'touched' in r: ok &= set(ch) == r['touched']
    if 'inserts_at_or_after' in r: ok &= len(ins) == 1 and ins[0] >= r['inserts_at_or_after']
    if 'wc_words' in r: got['wc_words_recorded'] = r['wc_words']; got['wc_words_equal_recorded'] = tuple(got['wc_words']) == r['wc_words']; ok &= got['wc_words_equal_recorded']
    if 'sections' in r:
        import re
        def secw(L, name):
            hs = [(i, len(m.group(1)), l) for i, l in enumerate(L) for m in [re.match(r'^(#{1,6})\s', l)] if m]
            k = [j for j, (i, lv, l) in enumerate(hs) if l.startswith(name)][0]; s0, lv = hs[k][0], hs[k][1]
            e = next((i for i, l2, _ in hs[k + 1:] if l2 <= lv), len(L)); return len(' '.join(L[s0:e]).split())
        got['sections'] = {n: (secw(al, n), secw(bl, n)) for n in r['sections']}
        ok &= got['sections'] == r['sections']
    out[key] = dict(recorded=r['text'], got=got, equals_recorded=bool(ok))
    if 'vol_words' in r: got['vol_words_recorded'] = r['vol_words']; ok &= tuple(got['wc_words']) == r['vol_words']
    print(f"{key:<20} bytes {got['bytes']} lines {got['lines']} sha {got['sha256'][:16]} touched {ch} ins {ins} words {got['words']} wc {got['wc_words']} -> equals_recorded {ok}")
json.dump(out, open(f'{W}/volrec.json', 'w'), indent=1)
