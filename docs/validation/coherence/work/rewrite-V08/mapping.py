#!/usr/bin/env python3
"""MAPPING TABLE for coherence/rewrite-V08: every inventory id of V08 (and each defined term) -> where it now lives.

Reads the canon unit (unit.json), the inventory lines (inv.txt) and the rewritten volume; checks that every
placement's section heading exists in the new text; writes mapping.md beside this file.
"""
import json, re, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..', '..', '..', '..'))
NEW = os.path.join(ROOT, 'docs/validation/coherence/new/volumes/V08-settlementforge.md')
unit = json.load(open(os.path.join(HERE, 'unit.json')))
inv = []
for ln in open(os.path.join(HERE, 'inv.txt')):
    parts = ln.rstrip('\n').split(' | ', 3)
    if len(parts) == 4:
        inv.append(parts)
new_text = open(NEW).read()
heads = set(re.findall(r'^#{2,4}\s+(\d+(?:\.\d+)*[a-z]?)\b', new_text, re.M))
heads |= {'Integration notes'} if '## Integration notes' in new_text else set()

role = {}
for i in unit['state']:
    role[i] = 'home'
for r in unit['reference']:
    role[r['id']] = f"reference ({r['home_unit']} {r['home_sec'] or ''})".replace(' )', ')')
for b in unit['bcr_pointer']:
    role[b['id']] = 'BCR pointer'
for q in unit['owner_questions']:
    role[q] = 'owner questions'

W = {  # the §1b rows the old unnumbered wiring rows became (V08-TERM-1)
    'V08-0011': 'W1', 'V08-0012': 'W5, W13, W14', 'V08-0013': 'W20', 'V08-0014': 'W30', 'V08-0015': 'W75',
    'V08-0016': 'W79', 'V08-0017': 'W81', 'V08-0018': 'W49', 'V08-0019': 'W48', 'V08-0020': 'W53',
    'V08-0021': 'W17', 'V08-0022': 'W82', 'V08-0023': 'W25',
}
J = {'V08-0145': (1, 10), 'V08-0146': (11, 20), 'V08-0147': (21, 30), 'V08-0148': (31, 40), 'V08-0149': (41, 50),
     'V08-0150': (51, 60), 'V08-0151': (61, 70), 'V08-0152': (71, 80), 'V08-0153': (81, 90), 'V08-0154': (91, 100),
     'V08-0155': (101, 110), 'V08-0156': (111, 115)}
OVR = {
    'V08-0001': ('head', "the head's *How to read this volume* paragraph (citation forms; DR numbers by §7.7; requests as V08 §10's pointer rows; tools, bars and wiring ids)"),
    'V08-0006': ('0', "V08 §0 (the module's origin, backups and plans read from SettlementForge, J121; small settlements drawn by the village product, J122; XCONF-2, XCONF-3)"),
    'V08-0009': ('1', "V08 §1 *Base hooks consumed* (cited: §7.7 layer 2, items 1–16, DR1–DR25, the key law)"),
    'V08-0010': ('1', "V08 §1 *Out of scope* (Q5 decided under J122; XCONF-4)"),
    'V08-0024': ('1b', "V08 §1b's dossier-trace paragraph, pointing to V08 §2.4's field table (W22; W-DOS-01b)"),
    'V08-0026': ('2.1', "V08 §2.1 `MapRecord` (`backups` to `MapHostConfig.backupDepth`, J121; XCONF-2)"),
    'V08-0028': ('2.1', "V08 §2.1 status semantics (backups by `backupDepth`; XCONF-2)"),
    'V08-0029': ('2.2', "V08 §2.2 — the vocabulary cited at §11.3 (item 472); the message TYPES stay here, where item 472's applied text homes them"),
    'V08-0030': ('2.2', "V08 §2.2 — the base messages' extensions cited at §11.3 (items 472, 459); `AudienceWord` the type of §14's table"),
    'V08-0031': ('2.2', "V08 §2.2 host client (`MapHostConfig` gains `backupDepth`, `quotaBytes`, `locale`, J121; `exportScenes`, J122)"),
    'V08-0033': ('2.3', "V08 §2.3 — `DossierBinding`'s port fields cited at §7.7 item 12 (item 390); the carried shape, keys, `factHash` and row life kept"),
    'V08-0034': ('2.3', "V08 §2.3 `CarriedFact` (gains `wealth`, `site`, `history`, `tradition`, `readiness`)"),
    'V08-0037': ('2.4', "V08 §2.4 `AdapterManifest` (item 508; `keyList` = the field table's read rows)"),
    'V08-0038': ('2.4', "V08 §2.4 — `E_OTHER_SETTLEMENT`, the note kinds and `PortNote`'s `msg`/`keys` cited at §14 (item 508); each note's identity and class kept"),
    'V08-0039': ('2.4', "V08 §2.4 key sets, now THE ADAPTER'S FIELD TABLE (W-DOS-01b)"),
    'V08-0041': ('2.5', "V08 §2.5 — the digest additions typed here; §14 names them and cites these types (item 509)"),
    'V08-0042': ('2.5', "V08 §2.5 — the `dossierRecord` event cited at §7.1 (item 358); the records at §2.7"),
    'V08-0043': ('2.5', "V08 §2.5 `PortValues` (item 389; gains `readiness`, item 114)"),
    'V08-0054': ('2.6', "V08 §2.6 `relations` row; the `era` row states the culture-only derivation V11 §3.19.2 cites (XCONF-9)"),
    'V08-0057': ('2.6a', "V08 §2.6a (item 109 at the port)"),
    'V08-0059': ('2.6a', "V08 §2.6a — DR30–DR32 by number, their rows §7.7's (item 398; ID-DR)"),
    'V08-0061': ('2.6a', "V08 §2.6a closures, steps and deaths (DR32)"),
    'V08-0062': ('2.6b', "V08 §2.6b (item 110 at the port)"),
    'V08-0063': ('2.6b', "V08 §2.6b (1) — DR34's inputs (item 398)"),
    'V08-0064': ('2.6b', "V08 §2.6b (2) — DR35's inputs; the threshold V11 §3.24.2's `elevated.landmarkMinSignificance` (X-V11-15)"),
    'V08-0065': ('2.6b', "V08 §2.6b (3) — the toll-bridge rule's one home with its rung column (E-31; item 399)"),
    'V08-0066': ('2.6b', "V08 §2.6b (4) (culture's reach; the era row V08 §2.6)"),
    'V08-0072': ('2.8', "V08 §2.8 — `DossierInstitution.custom` typed here (item 511; §14 cites)"),
    'V08-0073': ('2.8', "V08 §2.8 — carried-fact additions (item 390); the records at §2.7 (item 256)"),
    'V08-0074': ('2.8', "V08 §2.8 — the keys, the key law §7.7 item 12's (item 256)"),
    'V08-0075': ('3.1', "V08 §3.1 (1)–(2) (`connect-src`: none under C, follows SettlementForge, J121/J122; XCONF-1)"),
    'V08-0077': ('3.1', "V08 §3.1 step 7 (the bridge to the shell; XV-V9-17, -20, -21, -24, -29)"),
    'V08-0086': ('3.5', "V08 §3.5 — DR29 by number, its row §7.7's (item 391)"),
    'V08-0087': ('3.5.1', "V08 §3.5.1 (1) — the name grammar (the base's T9 extended, item 509)"),
    'V08-0092': ('3.5.1', "V08 §3.5.1 (f) — one sentence: V11 §3.12 agrees with the pinned ladder file; release row R2 checks it (NARR-3)"),
    'V08-0096': ('3.6', "V08 §3.6 (7)"),
    'V08-0097': ('3.7', "V08 §3.7 (persistence; the quota's trim order, J121)"),
    'V08-0098': ('3.7', "V08 §3.7 (thumbnails; backups to `backupDepth`; the draft mirror on SettlementForge's origin, J121; XCONF-2)"),
    'V08-0101': ('3.9', "V08 §3.9 B1–B9 (B7's copy without 'coming later'; XCONF-3)"),
    'V08-0102': ('3.9', "V08 §3.9 B10–B21 (B21 the quota row, J121)"),
    'V08-0103': ('3.10', "V08 §3.10 (J122's order registers the village product before M-SF; XCONF-3)"),
    'V08-0111': ('3.14', "V08 §3.14 (3), (6) (Q5 decided under J122; XCONF-4)"),
    'V08-0116': ('4.4', "V08 §4.4 (1)–(2) (SettlementForge's assistant through the host seam, configuration C, J121/J122; SCOPE-C07)"),
    'V08-0117': ('4.4', "V08 §4.4 (3)–(6) (the built-in clerk at M3c where the deployment enables it; XCONF-1)"),
    'V08-0118': ('4.6', "V08 §4.6 (catalogue keys with args; SR6-04's frame words keyed)"),
    'V08-0120': ('4.6', "V08 §4.6 notes table (gains `frozen_fact_changed`, `history_gap`)"),
    'V08-0121': ('5.1', "V08 §5.1 (the frame words keyed as `host.control.*`, `host.dialog.*`, `host.frame.title` rows; SR6-04)"),
    'V08-0126': ('5.4', "V08 §5.4 (2) (J122's export-bundle route as opaque blobs; door 1 closed; XCONF-5)"),
    'V08-0127': ('5.5', "V08 §5.5 (the frame's language SettlementForge's, J121; English the catalogue's source language; XCONF-6)"),
    'V08-0128': ('6', "V08 §6 (storage row by `backupDepth`, J121)"),
    'V08-0141': ('8.1', "V08 §8.1 (Q4 decided under J122; the combined order cited at §16; XCONF-7)"),
    'V08-0142': ('8.2', "V08 §8.2 (total 18–24.5 pw with items 111, 113–118, the edges and J121/J122 priced; no estimate history, NARR-4)"),
    'V08-0144': ('8.4', "V08 §8.4 (risk 5 reads `backupDepth`, J121)"),
    'V08-0157': ('10', "V08 §10 pointer table (BCR-V8-1 → item 472 → §11.3, and the rows after it)"),
    'V08-0158': ('10', "V08 §10 pointer table (BCR-V8-4 → item 508 → §14)"),
    'V08-0159': ('10', "V08 §10 pointer table (BCR-V8-9 → item 202, withdrawn for the one registration → §1.1, §4.12, PART III)"),
    'V08-0160': ('10', "V08 §10 pointer table (BCR-V8-15 → item 410 → §8.2, §8.3, §11.1, §11.2)"),
    'V08-0161': ('10', "V08 §10 pointer table (BCR-V8-21 → item 394 → §7.7)"),
    'V08-0162': ('10', "V08 §10 pointer table (BCR-V8-28 → item 244 → §2.7)"),
    'V08-0163': ('11', "V08 §11 — the five decisions (Q1, Q2 follow SettlementForge, J121; Q3–Q5, J122), each carried into its section (XCONF-8)"),
    'V08-0164': ('12', "V08 §12 — one CONFIRMED list and one PLAUSIBLE list with the bar that settles each (NARR-6; SR6-05 (b))"),
    'V08-0165': ('Integration notes', "V08 *Integration notes* — IN-V08-1 – IN-V08-4 folded at their homes (DR28–DR35 by number; J-VI.14/J-VI.15; J-VI.9; J-VI.20)"),
}
TERMS = [
    ('Map tab', 'V08-0002', '0', 'V08 §0; §3.1 (1)'),
    ('MapRecord', 'V08-0026', '2.1', 'V08 §2.1'),
    ('SnapshotBlock', 'V08-0027', '2.1', 'V08 §2.1'),
    ('PartyKnowledge', 'V08-0027', '2.1', 'V08 §2.1'),
    ('PartyPictureSet (party pictures)', 'V08-0110', '3.14', 'V08 §3.14 (the field in V08 §2.1)'),
    ('MapStore, MapHostConfig', 'V08-0031', '2.2', 'V08 §2.2'),
    ('MapHost, MapSession', 'V08-0032', '2.2', 'V08 §2.2'),
    ('@plat/bridge-client (host client)', 'V08-0011', '2.2', 'V08 §2.2; W2'),
    ('port leader', 'V08-0012', '3.3', 'V08 §3.3'),
    ('refresh queue', 'V08-0012', '3.4', 'V08 §3.4'),
    ('lease', 'V08-0019', '3.4', 'V08 §2.1 (`MapRecord.refreshing`), §3.4'),
    ('row sets (tables/dossier/)', 'V08-0014', '2.6', 'V08 §2.6'),
    ('digest steps', 'V08-0081', '3.5', 'V08 §3.5'),
    ('diff table', 'V08-0084', '3.5', 'V08 §3.5'),
    ('AudienceWord', 'V08-0030', '2.2', 'V08 §2.2 (the left column of §14\'s audience table)'),
    ('host mode', 'V08-0016', '5.1', 'V08 §5.1; W80'),
    ('custom content (CustomLibraryEntry, CustomChainDigest)', 'V08-0072', '2.8', 'V08 §2.8'),
    ('CustomChainRecord, CustomServiceRecord', 'V08-0073', '2.8', 'V08 §2.8 (field rules; the records §2.7, item 256)'),
    ('AdapterManifest, AdapterRegistry', 'V08-0037', '2.4', 'V08 §2.4'),
    ('quarantined (binding state)', 'V08-0033', '2.3', '§7.7 item 12 (item 390); V08 §2.3 cites it'),
    ('held reason', 'V08-0023', '3.9', 'V08 §2.1 (`MapRecord.held`), §3.9'),
    ('standing notes', 'V08-0119', '4.6', 'V08 §4.6'),
    ("players' view (party group, player tab)", 'V08-0111', '3.14', 'V08 §3.14'),
    ('failure rows B1-B20', 'V08-0101', '3.9', 'V08 §3.9 (B1–B21: B21 the quota row, J121)'),
    ('SF0-SF7 and VH (build stages)', 'V08-0142', '8.2', 'V08 §8.2'),
]

rows = []
bad = []
for iid, kind, sec, text in inv:
    if iid in OVR:
        s, where = OVR[iid]
    elif iid in W:
        s, where = '1b', f"V08 §1b {W[iid]} (numbered row; history divider dropped)"
    elif iid in J:
        a, b = J[iid]
        s, where = '9', f"V08 §9 J-V8.{a} – J-V8.{b} (final choices, revision history out, E-24 marks; NARR-5)"
    else:
        s = re.sub(r'\s*\(.*$', '', sec).strip()
        where = f"V08 §{s}"
    if s not in heads and s not in ('head',):
        bad.append((iid, s))
    rows.append((iid, sec, kind, role.get(iid, '?'), where))

out = []
out.append('| inventory id | old section | kind | canon role | now lives |')
out.append('|---|---|---|---|---|')
for r in rows:
    out.append('| ' + ' | '.join(r) + ' |')
for term, at, s, where in TERMS:
    if s not in heads:
        bad.append((term, s))
    out.append(f'| term: {term} | {at} | term | glossary | {where} |')
open(os.path.join(HERE, 'mapping.md'), 'w').write('\n'.join(out) + '\n')
counts = {}
for r in rows:
    counts[r[3].split(' ')[0]] = counts.get(r[3].split(' ')[0], 0) + 1
print('facts', len(rows), 'terms', len(TERMS), 'roles', counts, 'unresolved placements', bad)
