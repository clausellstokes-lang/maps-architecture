# Render coherence/adjudicate-rR's brief (R >= 4): the workflow's adjudicate template + ROUND-R NOTES from a notes file.
# Usage: python3 mkadjR.py R "<history json list>" <notes-file>
import json, glob, os, subprocess, shutil, sys
SP = os.path.dirname(os.path.abspath(__file__))
ROOT = '/home/user/maps-architecture'
R = int(sys.argv[1]); HIST = json.loads(sys.argv[2]); NOTES = open(sys.argv[3]).read().strip()
W = f'{ROOT}/docs/validation/coherence/work/round{R}-work'
os.makedirs(W, exist_ok=True); os.makedirs(f'{SP}/rr{R}', exist_ok=True)
for f in glob.glob(f'{SP}/repair-in-r{R}/*.json'): shutil.copy(f, W)
work = []
for f in sorted(glob.glob(f'{W}/*.json')):
    for i in json.load(open(f)):
        work.append({'id': i['id'], 'owner': i['owner'], 'severity': i.get('severity'), 'kind': i.get('kind'), 'reported_by': i.get('reported_by','')[:60]})
args = {'round': R, 'history': HIST, 'work': work}
json.dump(args, open(f'{SP}/rr{R}/adj-args.json', 'w'))
subprocess.run(['node', f'{SP}/prompts.mjs', 'adjudicate', f'{SP}/rr{R}/adj-args.json', f'{SP}/rr{R}/adjudicate-r{R}.raw.txt'], check=True)
raw = open(f'{SP}/rr{R}/adjudicate-r{R}.raw.txt').read().rstrip('\n') + '\n\n' + NOTES
open(f'{SP}/rr{R}/adjudicate-r{R}.full.txt', 'w').write(raw)
subprocess.run(['python3', f'{SP}/finalize.py', f'coherence/adjudicate-r{R}', f'{SP}/rr{R}/adjudicate-r{R}.full.txt'], check=True)
print('work', len(work))
