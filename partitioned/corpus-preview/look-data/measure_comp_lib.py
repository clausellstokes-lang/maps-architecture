import sys, os, json, glob, importlib.util
from PIL import Image
SP=os.path.dirname(os.path.abspath(__file__))
def load(n,p):
    s=importlib.util.spec_from_file_location(n,p); m=importlib.util.module_from_spec(s); s.loader.exec_module(m); return m
PAL=load('pal',os.path.join(SP,'HFM1_palette_copy.py'))
AES=load('aes',os.path.join(SP,'MFS1_aesthetic_copy.py'))
TMP=os.path.join(SP,'tmpimg'); os.makedirs(TMP,exist_ok=True)
def chroma(path):
    im=Image.open(path).convert('RGB'); ow,oh=im.size; h=int(round(oh*640.0/ow))
    s=im.resize((640,h),Image.BILINEAR); ix,iy=int(640*.03),int(h*.03); s=s.crop((ix,iy,640-ix,h-iy))
    px=list(s.getdata()); return round(sum(max(p)-min(p) for p in px)/len(px),1)
def prep(src,crop=None,resize_w=None,tag=''):
    im=Image.open(src).convert('RGB')
    if crop: im=im.crop(crop)
    if resize_w:
        h=int(round(im.size[1]*resize_w/im.size[0])); im=im.resize((resize_w,h),Image.LANCZOS)
    out=os.path.join(TMP,tag+'.png'); im.save(out); return out
def measure(path,label):
    p=PAL.run(path); a=AES.measure(path)
    ph=p['paper_hex_2pct']; r,g,b=int(ph[1:3],16),int(ph[3:5],16),int(ph[5:7],16)
    ih=p['ink_hex_05pct']; ir,ig,ib=int(ih[1:3],16),int(ih[3:5],16),int(ih[5:7],16)
    return {'label':label,'px':a['px'],'ink_L':p['ink_L_05pct'],'ink_hex':ih,'ink_warm':ir-ib,'paper_L':p['paper_L_2pct'],'paper_hex':ph,'paper_warm':r-b,
            'L1_99':p['L_range_1_99'],'chroma':chroma(path),'grain':a['paper_grain_sigma_median'],'grain_n':a['paper_grain_n'],
            'wash':a['wash_within_sigma_median'],'wash_n':a['wash_n'],'iqr':a['fill_tone_iqr_L'],
            'stroke':a.get('stroke_px_norm5056'),'ratio':a.get('lineweight_ratio_p90_over_p25')}
