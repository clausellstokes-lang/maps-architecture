import sys,glob; sys.path.insert(0,'scripts')
reps=[
 ("(item 464 with SR-06's key form; V08 §3.14 (5))","(item 464, in item 572's key form; V08 §3.14 (5))"),
 ("item 464 admits as SR-06 amends it:","item 464 admits in item 572's key form:"),
 ("would re-create the knowledge-key mechanism SR-05 removes","would re-create a knowledge-key mechanism V09 does not keep (J-V9.46)"),
 ("the party key in SR-06's key form","the party key in item 572's key form"),
 ("where SR-25's wording says \"the export's tier\"","rather than the export's tier alone"),
 ("(J-V9.85; V08 §13 X15)","(J-V9.85)"),
 ("(research V52, V56)","(`research/sf/mapping-verify.md` V52, V56)"),
 ("its realm map (research C-1)","its realm map (`research/sf/dossier-seam.md` C-1)"),
 ("the dossier's size (research C-6)","the dossier's size (`research/sf/dossier-seam.md` C-6)"),
 ("definition id (no `fallbackClass`: the class is item 104 (a)'s resolution at fold, item 425, J-VI.20) and,","definition id (its class is item 104 (a)'s resolution at fold, V11 §3.13; item 425, J-VI.20) and,"),
]
for p in glob.glob('parts/*.md'):
    t=open(p).read(); o=t
    for a,b in reps: t=t.replace(a,b)
    if t!=o: open(p,'w').write(t); print('edited',p)
