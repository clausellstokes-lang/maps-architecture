#!/usr/bin/env python3
"""apply.py (coherence/assemble-r6, P3a) — runs docs/validation/amendments-b/apply-blocks.py, unchanged, once per target
document over the split block files route.py wrote (split/<key>/repair-r6-*.md, name order), on the UNTOUCHED copies
(snapshot.py's), writing the outputs to the scratch folder (out/<path>) and each run's JSON log and printout here
(logs/<key>.json, logs/<key>.out). The base runs with the rationale; every volume and INDEX with the rationale as a
throwaway input whose output must equal it (no RATIONALE-A or J-ROWS block routes to them). Never writes a live file."""
import glob, hashlib, json, os, subprocess, sys
ROOT = '/home/user/maps-architecture'
W = os.path.join(ROOT, 'docs/validation/coherence/work/assemble-r6')
SCR = '/tmp/claude-0/-home-user-maps-architecture/2a2e45f9-f4fe-5c84-8b42-c0a1cc897c8e/scratchpad/coherence/asm6'
BEFORE, OUT = f'{SCR}/before', f'{SCR}/out'
AB = os.path.join(ROOT, 'docs/validation/amendments-b/apply-blocks.py')
inv = json.load(open(f'{W}/blocks.json', encoding='utf-8'))
os.makedirs(f'{W}/logs', exist_ok=True)
RAT = 'docs/ARCHITECTURE-RATIONALE.md'
summary = {}
for target, t in sorted(inv['targets'].items(), key=lambda kv: (kv[0] != 'docs/ARCHITECTURE.md', kv[0])):
    key = os.path.basename(t['split_dir'])
    files = [os.path.join(ROOT, t['split_dir'], f) for f in t['files']]
    out_doc = f'{OUT}/{target}'; os.makedirs(os.path.dirname(out_doc), exist_ok=True)
    out_rat = f'{OUT}/{RAT}' if key == 'base' else f'{SCR}/throwaway/{key}-rationale.md'
    os.makedirs(os.path.dirname(out_rat), exist_ok=True)
    cmd = ['python3', AB, '--doc', f'{BEFORE}/{target}', '--rationale', f'{BEFORE}/{RAT}', '--out-doc', out_doc,
           '--out-rationale', out_rat, '--log', f'{W}/logs/{key}.json'] + files
    r = subprocess.run(cmd, capture_output=True, text=True)
    open(f'{W}/logs/{key}.out', 'w', encoding='utf-8').write(r.stdout + ('\n--- stderr\n' + r.stderr if r.stderr else ''))
    if r.returncode:
        sys.exit(f'STOP — apply-blocks failed on {target}: {r.stderr[-500:]}')
    log = json.load(open(f'{W}/logs/{key}.json', encoding='utf-8'))
    c = log['checks']
    bad = [x for x in log['audit']['blocks'] if not x['state'].startswith(('OK', 'CARRIED', 'SUPERSEDED'))]
    rat_same = (open(out_rat, 'rb').read() == open(f'{BEFORE}/{RAT}', 'rb').read())
    summary[key] = dict(target=target, found=c['blocks_total'], applied=c['blocks_applied'], skipped=c['blocks_skipped'],
                        skipped_detail=[(s['block'], s['reason']) for s in log['skipped']], audit_not_ok=len(bad),
                        headings=[c['headings_before'], c['headings_after']], fences_balanced=c['fences_balanced'],
                        fence_lines=[c['fence_lines_before'], c['fence_lines_after']], title_block_unchanged=c['title_block_unchanged'],
                        bytes=[c['doc_bytes_before'], c['doc_bytes_after']], sha256_out=c['output_doc_sha256'],
                        rationale_unchanged=rat_same, rationale_sha256_out=c['output_rationale_sha256'],
                        notes=[n['note'] + (': ' + str(n.get('items'))[:200] if n.get('items') else '') for n in log['notes']])
    s = summary[key]
    print(f"{key:<22} found {s['found']:>3} applied {s['applied']:>3} skipped {s['skipped']} audit-not-OK {s['audit_not_ok']} "
          f"headings {s['headings'][0]}->{s['headings'][1]} fences {s['fence_lines'][0]}->{s['fence_lines'][1]} bal {s['fences_balanced']} "
          f"title-unchanged {s['title_block_unchanged']} bytes {s['bytes'][0]}->{s['bytes'][1]} rat-unchanged {s['rationale_unchanged']} sha {s['sha256_out'][:16]}")
    for b, why in s['skipped_detail']:
        print('    SKIPPED', b[:110], '—', why)
    for n in s['notes']:
        print('    NOTE', n[:230])
json.dump(summary, open(f'{W}/apply.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
