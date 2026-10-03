#!/usr/bin/env python3
"""dryrun.py (coherence/repair-scope-r2) — applies this seat's block file on COPIES of the live files with
docs/validation/amendments-b/apply-blocks.py (unchanged), alone and combined with the landed round-2 base files, routes the
INDEX block as Assemble's route.py does (the FILE line dropped), simulates the two scripted hand-offs the file asks of
Assemble (the RATIONALE-A swaps of restated rows; R25's quoted sentence) and checks ids. Never writes a live file."""
import hashlib, json, os, re, shutil, subprocess, sys
ROOT = '/home/user/maps-architecture'
W = os.path.join(ROOT, 'docs/validation/coherence/work/repair-scope-r2')
SCR = '/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/coherence/rscope2/dry'
AB = os.path.join(ROOT, 'docs/validation/amendments-b/apply-blocks.py')
REPAIR = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, 'docs/validation/coherence/repair-r2-scope.md')
RESTATED = ['J-DET-11', 'J-A20.71', 'J-A113.61', 'J-A114.01', 'J-A568.01', 'J-A76.41']
R25_OLD = ("> *Chose the lock above the assignment because the owner's hook asks for precedence over the generator's own class "
           "rules, not over the user's locks; a host that must override a lock sends an unlock first, and the log records it.*")
R25_NEW = ("> *Chose the lock above the assignment because the owner's hook asks for precedence over the generator's own class "
           "rules, not over the user's locks; a host's map event that must override a lock sends an unlock first, which the log "
           "records; a dossier event is never refused by a lock — it supersedes the lock on what it changes, the lock reported "
           "orphaned (§7.7's precedence; items 20, 22).*")


def sha(p): return hashlib.sha256(open(p, 'rb').read()).hexdigest()


def split(path):
    """(base part, INDEX part) of a repair file, as route.py routes it: text before the first block header dropped,
    every block to the document its nearest FILE line above names."""
    lines = open(path, encoding='utf-8').read().split('\n')
    tgt, seen, out = 'docs/ARCHITECTURE.md', False, {}
    for l in lines:
        m = re.match(r'^=== FILE (\S+) ===\s*$', l)
        if m:
            tgt = m.group(1); seen = True; continue
        if l.startswith('=== '):
            seen = True
        if seen:
            out.setdefault(tgt, []).append(l)
    return {k: '\n'.join(v) + '\n' for k, v in out.items()}


def run(doc, rat, outdoc, outrat, log, files):
    r = subprocess.run(['python3', AB, '--doc', doc, '--rationale', rat, '--out-doc', outdoc, '--out-rationale', outrat,
                        '--log', log] + files, capture_output=True, text=True)
    if r.returncode:
        sys.exit(r.stderr[-2000:])
    L = json.load(open(log))
    bad = [x for x in L['audit']['blocks'] if not x['state'].startswith(('OK', 'CARRIED', 'SUPERSEDED'))]
    c = L['checks']
    return dict(found=c['blocks_total'], applied=c['blocks_applied'], skipped=c['blocks_skipped'], audit_not_ok=len(bad),
                headings=[c['headings_before'], c['headings_after']], fences_balanced=c['fences_balanced'],
                title_unchanged=c['title_block_unchanged'], sha=c['output_doc_sha256'][:16],
                notes=[n['note'][:160] for n in L['notes']], skipped_detail=[(s['block'][:80], s['reason']) for s in L['skipped']])


def part_a_ids(rat):
    t = open(rat, encoding='utf-8').read()
    a = t[t.index('## Part A'):t.index('## Part B')]
    return [m.group(1) for m in re.finditer(r'^\| (J-[^ |]+) \|', a, re.M)], t


def index_ids(doc):
    t = open(doc, encoding='utf-8').read()
    s = t[t.index('# Judgment calls'):t.index('# Staged by the owner')]
    return [m.group(1) for m in re.finditer(r'^\| (J-[^ |]+) \|', s, re.M)]


def swap(rat_path):
    """Assemble's scripted hand-off: each restated Part A row (appended by RATIONALE-A) takes its older row's place."""
    t = open(rat_path, encoding='utf-8').read()
    lines = t.split('\n')
    for rid in RESTATED:
        idx = [i for i, l in enumerate(lines) if l.startswith(f'| {rid} |')]
        assert len(idx) == 2, (rid, idx)
        lines[idx[0]] = lines[idx[1]]; del lines[idx[1]]
    t = '\n'.join(lines)
    assert t.count(R25_OLD) == 1
    t = t.replace(R25_OLD, R25_NEW)
    open(rat_path, 'w', encoding='utf-8').write(t)


if __name__ == '__main__':
    shutil.rmtree(SCR, ignore_errors=True); os.makedirs(SCR)
    for f in ('docs/ARCHITECTURE.md', 'docs/ARCHITECTURE-RATIONALE.md', 'docs/volumes/INDEX.md'):
        os.makedirs(os.path.dirname(f'{SCR}/before/{f}'), exist_ok=True); shutil.copy(f'{ROOT}/{f}', f'{SCR}/before/{f}')
    parts = split(REPAIR)
    for k, v in parts.items():
        os.makedirs(f'{SCR}/split/{os.path.basename(k)}', exist_ok=True)
        open(f'{SCR}/split/{os.path.basename(k)}/repair-r2-scope.md', 'w', encoding='utf-8').write(v)
    B, R, I = (f'{SCR}/before/docs/ARCHITECTURE.md', f'{SCR}/before/docs/ARCHITECTURE-RATIONALE.md', f'{SCR}/before/docs/volumes/INDEX.md')
    res = {}
    res['alone'] = run(B, R, f'{SCR}/alone.md', f'{SCR}/alone-R.md', f'{SCR}/alone.json', [f'{SCR}/split/ARCHITECTURE.md/repair-r2-scope.md'])
    res['index'] = run(I, R, f'{SCR}/INDEX.new.md', f'{SCR}/throwaway-R.md', f'{SCR}/index.json', [f'{SCR}/split/INDEX.md/repair-r2-scope.md'])
    res['index']['rationale_unchanged'] = sha(f'{SCR}/throwaway-R.md') == sha(R)
    # combined with the landed round-2 base files (their own blocks routed to the base: they hold no FILE line)
    sib = [os.path.join(ROOT, 'docs/validation/coherence', f'repair-r2-{u}.md') for u in ('determinism', 'kernel', 'model', 'pipeline', 'rendering')]
    sibsplit = []
    for p in sib:
        pp = split(p)
        assert list(pp) == ['docs/ARCHITECTURE.md'], (p, list(pp))
        q = f'{SCR}/split/ARCHITECTURE.md/{os.path.basename(p)}'; open(q, 'w', encoding='utf-8').write(pp['docs/ARCHITECTURE.md']); sibsplit.append(q)
    res['combined'] = run(B, R, f'{SCR}/combined.md', f'{SCR}/combined-R.md', f'{SCR}/combined.json', sibsplit + [f'{SCR}/split/ARCHITECTURE.md/repair-r2-scope.md'])
    # my sections identical alone and combined?
    import importlib.util
    sp = importlib.util.spec_from_file_location('ab', AB); ab = importlib.util.module_from_spec(sp); sp.loader.exec_module(ab)
    def sec(p, h):
        L = open(p, encoding='utf-8').read().split('\n'); hs, _ = ab.headings(L)
        k = [i for i, x in enumerate(hs) if x[2] == h]; s, e = ab.section_range(L, hs, k[0]); return '\n'.join(L[s:e])
    heads = [l[len('=== REPLACE '):-4] for l in parts['docs/ARCHITECTURE.md'].split('\n') if l.startswith('=== REPLACE ')]
    # the §0.2 heading is retitled by the block: look the new one up
    newheads = []
    for h in heads:
        if h.startswith('### 0.2 '):
            h = [l for l in parts['docs/ARCHITECTURE.md'].split('\n') if l.startswith('### 0.2 ')][0]
        newheads.append(h)
    res['sections_equal_alone_vs_combined'] = all(sec(f'{SCR}/alone.md', h) == sec(f'{SCR}/combined.md', h) for h in newheads)
    # the scripted hand-offs and the id census
    for tag in ('alone', 'combined'):
        rp = f'{SCR}/{tag}-R.md'; shutil.copy(rp, f'{SCR}/{tag}-R.swapped.md'); swap(f'{SCR}/{tag}-R.swapped.md')
        pa, _ = part_a_ids(f'{SCR}/{tag}-R.swapped.md'); ix = index_ids(f'{SCR}/{tag}.md')
        res[tag]['partA_rows'] = len(pa); res[tag]['index_rows'] = len(ix)
        res[tag]['partA_dupes'] = sorted({x for x in pa if pa.count(x) > 1}); res[tag]['index_dupes'] = sorted({x for x in ix if ix.count(x) > 1})
        res[tag]['index_minus_partA'] = sorted(set(ix) - set(pa)); res[tag]['partA_minus_index'] = sorted(set(pa) - set(ix))
        res[tag]['rationale_sha_after_swap'] = sha(f'{SCR}/{tag}-R.swapped.md')[:16]
    res['alone']['doc_sha'] = sha(f'{SCR}/alone.md'); res['index']['doc_sha'] = sha(f'{SCR}/INDEX.new.md')
    json.dump(res, open(os.path.join(W, 'dryrun.json'), 'w'), indent=1, ensure_ascii=False)
    print(json.dumps(res, indent=1, ensure_ascii=False))
