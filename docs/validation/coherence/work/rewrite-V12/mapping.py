#!/usr/bin/env python3
"""rewrite-V12: every inventory id of the volume -> where it now lives. Reads the volume inventory
(docs/validation/coherence/inventory-vol-V11-V12.json) and the canon's roles (canon.json by_inventory_id), and
writes mapping.md beside this script; prints the counts."""
import json, os, re, collections
ROOT = '/home/user/maps-architecture'
HERE = os.path.dirname(os.path.abspath(__file__))
inv = json.load(open(os.path.join(ROOT, 'docs/validation/coherence/inventory-vol-V11-V12.json')))
canon = json.load(open(os.path.join(ROOT, 'docs/validation/coherence/canon.json')))
roles = canon['by_inventory_id']
NEW = open(os.path.join(ROOT, 'docs/validation/coherence/new/volumes/V12-calibration.md')).read()
secs = set(re.findall(r'^#+ (\d+(?:\.\d+)*[a-z]?)\b', NEW, re.M)) | set(re.findall(r'\*\*(\d+\.\d+(?:\.\d+)*[a-z]?) ', NEW))

BCR = {'1': '496', '2': '497', '3': '503', '4': '504', '5': '381', '6': '500', '7': '491', '8': '535', '9': '533',
       '10': '521', '11': '569', '12': '501', '13': '488', '14': '502', '15': '447', '16': '489', '17': '447',
       '18': '536', '19': '492', '20': '493', '21': '537', '22': '382'}
# §1b rows (V12-0012 .. V12-0057 are rows 1 .. 46): a record's row moved to §2.11 (E-35); an engine's stays in §1b
ROW1B = {
 1: 'V12 §2.11 (`MetricDef` and `dist/metrics.json`, E-35)', 2: 'V12 §2.11 (`MeasureInput`, E-35)',
 3: 'V12 §1b (`plat measure`)', 4: 'V12 §1b (`plat baselines aggregate`)', 5: 'V12 §2.11 (`BaselinesFile` header, E-35)',
 6: 'V12 §2.11 (`Baseline` row, item 496; E-35)', 7: 'V12 §1b (the crossing check)', 8: 'V12 §1b (the seed families)',
 9: 'V12 §1b (the capture plan)', 10: 'V12 §2.11 (`ParityReport`, item 497; E-35)', 11: 'V12 §1b (the parity dashboard)',
 12: 'V12 §1b (the correlation harness) and V12 §2.11 (`NullModelSpec`, E-35)', 13: 'V12 §2.11 (`CalibrationRun`, E-35)',
 14: 'V12 §2.11 (`CalibrationEntry`, E-35; its consumers V09 §4.14 and V10 §2.13 through `dist/evidence.json`, W-IF-04, W-IF-05)',
 15: 'V12 §2.11 (evidence ids, stamps, `dist/evidence.json`, E-35)', 16: 'V12 §1b (the panel engine) and V12 §2.11 (`PanelSpec`, E-35)',
 17: 'V12 §1b (the sitting page)', 18: 'V12 §1b (the drift watch)', 19: 'V12 §1b (the corpus adapter)',
 20: 'V12 §2.11 (`SampleFrame`, E-35)', 21: 'V12 §2.11 (`ReconciliationRecord`, E-35)', 22: 'V12 §2.11 (the historical pack, E-35)',
 23: 'V12 §1b (the tendency harness) and V12 §2.11 (`StatBarSpec`, E-35)', 24: 'V12 §1b (the seed families row: `sweep/…`)',
 25: 'V12 §1b (the enclosure profile)', 26: 'V12 §1b (the underground profile)',
 27: 'V12 §2.11 (`CalibrationEntry`\'s producers, E-35)', 28: 'V12 §2.11 (`ownerRule` stamps, E-35)',
 29: 'V12 §2.11 (`ReconciliationRecord`\'s consumers: `ownerExcluded` rows as owner questions, E-35)', 30: 'V12 §2.11 (`FramesFile`, E-35)',
 31: 'V12 §1b (the model metrics row)', 32: 'V12 §1b (the tendency harness with the step-script runner)', 33: 'V12 §1b (the guards)',
 34: 'V12 §1b (the structure engine) and V12 §2.11 (`KnownCityFixture`, E-35)', 35: 'V12 §2.11 (`NoOpPin`, E-35)',
 36: 'V12 §1b (V11 §3.24.0\'s switch table — each owner item\'s off form, E-20)', 37: 'V12 §1b (the switch-on bumps)',
 38: 'V12 §1b (the profile\'s item-110 kinds)', 39: 'V12 §1b (the model metrics row)', 40: 'V12 §1b (the model metrics row)',
 41: 'V12 §1b (the metric families)', 42: 'V12 §2.11 (`BenchBarDef`, E-35)', 43: 'V12 §1b (the four raised-way bars)',
 44: 'V12 §1b (the M4 panel\'s M4-110 group)', 45: 'V12 §2.11 (`history.jsonl`, E-35)', 46: 'V12 §2.11 (`known-defects.json` entries, E-35)'}
SPECIAL = {
 'V12-0001': 'the head\'s *How to read this volume* (the base read with files f and g applied; citations, ids, the clean room)',
 'V12-0005': 'V12 §0 (*How it feels to the owner* and loop 4: J122\'s four gating sittings, V12-XCONF-1)',
 'V12-0007': 'reference → §13.5, §13.6, §13.7, §13.9, §13.3 (V12 §1\'s hooks table: pointers only)',
 'V12-0008': 'reference → §17.1 (1)–(8), §7.6, §6.4, §11.1, §14 (V12 §1\'s hooks table: pointers only)',
 'V12-0058': 'V12 §1b (*The dossier*)', 'V12-0059': 'V12 §1b (the dossier table; DR30–DR35 for the DR-V8 names, G-DR; the water-system row worded to the met need, V12-ICONF-1)',
 'V12-0400': 'V12 §11 (every question answered: Q-V12-1, Q-V12-2, Q-V12-3 — J122)',
 'V12-0401': 'V12 §12 (the current CONFIRMED and PLAUSIBLE lists; the round histories left to the validation records)',
 'V12-0402': 'V12 §13 (none open); its variations folded at their homes (J-V12.55, J-V12.43, J-V12.56, J-V12.42); the water-system "factor" sentence removed with the narration (V12-ICONF-2)',
 'V12-0403': 'the Integration notes\' map: IN-V12-1 → V12 §3.11; IN-V12-2 → V12 §10.2 (X-V12-9); IN-V12-3 → V12 §3.6b; IN-V12-4 → V12 §2.2, V12 §10.1',
}
HAND = {'V12-0394': 'X-V12-1 – X-V12-5', 'V12-0395': 'X-V12-6 – X-V12-10', 'V12-0396': 'X-V12-11 – X-V12-14',
        'V12-0397': 'X-V12-15, X-V12-16', 'V12-0398': 'X-V12-17', 'V12-0399': 'X-V12-18, X-V12-19'}

rows = []; cnt = collections.Counter(); unmapped = []
for it in inv['items']:
    iid = it['id']
    if not iid.startswith('V12-'): continue
    sec = it['sec']; keys = it.get('keys') or []
    role = (roles.get(iid) or {}).get('role', 'home')
    if iid in SPECIAL:
        where = SPECIAL[iid]
    elif sec == '1b' and 12 <= int(iid[4:]) <= 57:
        where = ROW1B[int(iid[4:]) - 11]
    elif role == 'bcr-pointer' or (sec == '10' and iid not in HAND):
        ids = []
        for k in keys:
            for n in re.findall(r'\d+', k.replace('BCR-V12-', '')): ids.append(n)
        first = re.search(r'BCR-V12-(\d+)', ' '.join(keys))
        if keys and keys[0] == 'BCR-V12-18..22': ids = ['18', '19', '20', '21', '22']
        ptr = '; '.join(f'BCR-V12-{n} → file f item {BCR.get(n, "?")}' for n in ids)
        where = f'V12 §10.1 pointer table ({ptr})'
    elif role == 'handoff' or iid in HAND:
        where = f'V12 §10.2 ({HAND.get(iid, "")} — each closed at its destination)'
    elif sec == '9':
        where = f'V12 §9 ({", ".join(keys)} — its current form, E-24 mark where amended)'
    elif sec == '7.1':
        where = f'V12 §7.1 ({", ".join(keys)})'
    elif sec in ('0', '1', '1b', '2', '6', '8.1', '8.2', '8.3', '7.2', '11', '12', '13') or sec in secs:
        where = f'V12 §{sec}'
    else:
        where = None
    if where is None:
        unmapped.append(iid); where = '—'
    cnt[role] += 1
    rows.append((iid, it['kind'], sec, role, where))

with open(os.path.join(HERE, 'mapping.md'), 'w') as o:
    o.write('| inventory id | kind | source § | role | where it now lives |\n|---|---|---|---|---|\n')
    for r in rows: o.write('| ' + ' | '.join(r) + ' |\n')
print(len(rows), dict(cnt), 'unmapped', unmapped)
