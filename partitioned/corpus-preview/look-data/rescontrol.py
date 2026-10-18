import os,sys,json,csv,importlib.util
SP=os.path.dirname(os.path.abspath(__file__))
s=importlib.util.spec_from_file_location('mc',os.path.join(SP,'measure_comp_lib.py')); M=importlib.util.module_from_spec(s); s.loader.exec_module(M)
H=set(open(os.path.join(SP,'holdout.txt')).read().split())
rows={r['id']:r for r in csv.DictReader(open('/Users/cstokes/Desktop/settlement-engine/map-corpus/docs/laneHFM1-corpus-measured.csv'))}
ids=['hf50','hf30','hf3','hf26','hf369','hf165','hf389','hf34','hf62','hf327']
assert not [i for i in ids if i in H]
out=[]
for i in ids:
    st=rows[i]['stem']; src='/Users/cstokes/Desktop/settlement-engine/map-corpus/plates/'+st+'.png'
    p=M.prep(src,resize_w=1500,tag='rc_'+i)
    m=M.measure(p,i)
    out.append(dict(id=i,native=dict(ink_L=rows[i]['ink_L'],paper_L=rows[i]['paper_L'],chroma=rows[i]['chroma'],grain=rows[i]['paper_grain_sigma'],wash=rows[i]['wash_within_sigma'],iqr=rows[i]['fill_tone_iqr'],ratio=rows[i]['stroke_ratio_p90_p25']),
       at1500=dict(ink_L=m['ink_L'],paper_L=m['paper_L'],chroma=m['chroma'],grain=m['grain'],wash=m['wash'],iqr=m['iqr'],ratio=m['ratio'])))
    os.remove(p)
json.dump(out,open(os.path.join(SP,'rescontrol.json'),'w'),indent=1)
for o in out: print(o['id'],'native',o['native'],'\n      @1500',o['at1500'])
