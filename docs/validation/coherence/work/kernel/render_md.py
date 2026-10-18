import json
ROOT='/Users/cstokes/Desktop/Maps'
d=json.load(open(f'{ROOT}/docs/validation/coherence/inventory-kernel.json'))
c=d['counts']
def esc(s): return str(s).replace('|','\\|').replace('\n',' ')
L=[]
L.append('# Inventory — base part §3 geometry kernel (coherence/inventory-kernel)\n')
L.append('PROGRESS')
L.append(f"- source: {d['source']['file']} lines {d['source']['lines']} (md5 {d['source']['md5'][:8]}), {d['source']['words']} words, {d['source']['kb']} KB — read whole, every subsection 3.1-3.10")
L.append('- working store: docs/validation/coherence/work/kernel/ (items.jsonl, batches/, findings.py, keymap.json, build.py, render_md.py); this file and inventory-kernel.json are generated from it')
for k in ['3.0 intro + 3.1 build-versus-adopt + KernelResult','3.2 numeric policy','3.3 transaction protocol','3.4 kernel operations','3.5 failure classes','3.6 insertion, contact and move semantics','3.7 one geometry engine','3.8 straight skeleton','3.9 geometry in the document','3.10 kernel invariants','terms','cross-reference resolution (script)','wiring enrichment (grep of every identifier-like key over the base outside §3 and the twelve volumes)','internal and cross-part conflicts','generate .json and .md']:
    L.append(f'- [x] {k}')
L.append('\n## Outcome\n')
L.append(f"{c['facts']} normative items plus {c['terms']} defined terms = {c['items']} inventory ids (KERNEL-0001 … KERNEL-{c['items']:04d}). ")
L.append(f"{c['items']} inventory items (KERNEL-0001 … KERNEL-{c['items']:04d}); by kind: " + ', '.join(f'{k} {v}' for k,v in sorted(c['by_kind'].items(),key=lambda x:-x[1])) + '.')
L.append(f"{c['terms']} defined terms (with every name the text uses and naming hazards); {c['restatements_cross_part']} cross-part restatements (a fact another unit owns stated here with its value) plus {c['internal_duplications']} duplications inside §3; {c['internal_conflicts']} internal conflicts or ambiguities; {c['cross_part_conflicts']} cross-part conflicts; {c['broken_references']} references that do not resolve cleanly (0 unresolved at section level); {c['wiring_gaps']} wiring gaps.")
L.append("\nOwnership: every item's subject is owned by the kernel unless its `owner` names another base part (model §2, pipeline §4/§10/PART II/III, determinism §5-§7, rendering §8/§9/§11/§12, scope §0/§1/§13-§17) or a volume. The volumes' subjects that §3 serves: buildings (V02: roofs, footprints, OBB/LIR), interiors (V03: transient arenas, readBack, re-cut), underground (V04: parts, galleries, chambers, tunnels, links), sky (V05: island arenas, shadow footprint), neighbourhoods (V01: neighbour step, corridor_split), evolution (V06: frame growth, EVO conversions). §3 cites no volume directly.")
L.append('\nWiring convention: `reads` = what the item depends on or is produced by; `used by` = what reads, calls, renders, exports or tests it. In-unit ends are inventory ids; outside ends are section and name. `outside mentions` (JSON only) lists every base section outside §3 and every volume whose text names the item\'s identifier-like keys — found by script, for the wiring graph.')
L.append('\n## Findings for the canon\n')
L.append('Evidence: KWG-01, KWG-02, KWG-03, KWG-05, KWG-06 and KXC-02 are CONFIRMED by grep over the whole base and the twelve volumes (the named field, code or constant has no other occurrence); KXC-01, KXC-03, KXC-04 and KXC-05 are CONFIRMED by reading both texts (lines cited in the JSON); the KIC items are readings of §3 (PLAUSIBLE until the canon rules); nothing here is a ruling.\n')
L.append('### Cross-part conflicts\n')
L.append('| id | sev | items | other unit | claim | ruling hint |'); L.append('|---|---|---|---|---|---|')
for x in d['cross_part_conflicts']: L.append(f"| {x['id']} | {x['severity']} | {', '.join(x['items'])} | {esc(x['other'])} | {esc(x['claim'])} | {esc(x['ruling_hint'])} |")
L.append('\n### Internal conflicts and ambiguities\n')
L.append('| id | sev | items | where | claim | required |'); L.append('|---|---|---|---|---|---|')
for x in d['internal_conflicts']: L.append(f"| {x['id']} | {x['severity']} | {', '.join(x['items'])} | {esc('; '.join(x['where']))} | {esc(x['claim'])} | {esc(x['required'])} |")
L.append('\n### Wiring gaps\n')
L.append('| id | sev | kind | items | claim | missing link |'); L.append('|---|---|---|---|---|---|')
for x in d['wiring_gaps']: L.append(f"| {x['id']} | {x['severity']} | {x['kind']} | {', '.join(x['items'])} | {esc(x['claim'])} | {esc(x['link'])} |")
L.append('\n### References that do not resolve cleanly\n')
L.append('| id | reference | at | status |'); L.append('|---|---|---|---|')
for x in d['broken_references']: L.append(f"| {x['id']} | {esc(x['ref'])} | {esc(x['at'])} | {esc(x['status'])} |")
L.append(f"\nReference census: {esc(d['reference_census']['method'])}. Distinct references by kind: " + ', '.join(f'{k} {v}' for k,v in d['reference_census']['distinct_by_kind'].items()) + '.')
L.append('\n### Restatements (fact owned elsewhere, stated in §3 with its value)\n')
L.append('| item | canonical home | fact |'); L.append('|---|---|---|')
for x in d['restatements']: L.append(f"| {x['item']} | {esc(x['canonical_home'])} | {esc(x['fact'])} |")
L.append('\nDuplications inside §3: ' + '; '.join(d['internal_duplications']) + '.')
L.append('\n### Elegance candidates (for the canon to rule; not findings)\n')
for x in d['elegance_candidates']: L.append(f"- {x['id']}: {x['what']}")
L.append('\n### Edges observed without a stated outcome (input to the edge catalogue)\n')
for x in d['edges_observed']: L.append(f'- {x}')
L.append('\n## Defined terms\n')
L.append('| id | concept | names used | naming hazard |'); L.append('|---|---|---|---|')
for it in d['items']:
    if it['kind']=='term':
        L.append(f"| {it['id']} | {esc(it['statement'])} | {esc(', '.join(it.get('names',it.get('keys',[]))))} | {esc(it.get('naming_hazard') or '')} |")
L.append('\n## Inventory\n')
L.append('| id | kind | § | statement | stated at | owner | reads / produced by | used by |'); L.append('|---|---|---|---|---|---|---|---|')
for it in d['items']:
    if it['kind']=='term': continue
    extra=''
    if it.get('restates'): extra=f" [restates: {it['restates']}]"
    L.append(f"| {it['id']} | {it['kind']} | {it['sub']} | {esc(it['statement'])}{esc(extra)} | {esc('; '.join(it['where']))} | {esc(it['owner'])} | {esc('; '.join(it['reads']))} | {esc('; '.join(it['used_by']))} |")
open(f'{ROOT}/docs/validation/coherence/inventory-kernel.md','w').write('\n'.join(L)+'\n')
print(len(L))
