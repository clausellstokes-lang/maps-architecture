import re,sys
src=open(sys.argv[1]).read()
t=src
# --- provenance ids (critique / seam / round ids): removed from normative text (V06-NARR-5)
ONE=r'(?:critique-V\d+ |seam |seam-[a-z]+-r\d+ )?(?:ST|TR|TT|TU|TV|TW|TX|SCC(?:-R\dC)?|SS|SR\d|SLR\d|C6|C5|C4-110|V1C|CVR-V\d+)-\d+(?:\s?\((?:[a-z]|\d+|[a-z]′|\d[a-z]?)\))*(?:\s?[–-]\s?(?:C4-110-|C6-|C5-|ST-|TR-)?\d+)?(?:\s?\((?:[a-z]|\d+)\))*'
LIST=ONE+r'(?:(?:,\s*|\s(?:and|with)\s)'+ONE+r')*'
for _ in range(3):
    t=re.sub(r'\s*\('+LIST+r'\)','',t)
    t=re.sub(r';\s*'+LIST+r'(?=\s*[);\]])','',t)
    t=re.sub(r',\s*'+LIST+r'(?=\s*[);\]])','',t)
    t=re.sub(r'\('+LIST+r'[;,]\s*','(',t)
    t=re.sub(r'\('+LIST+r':\s*','(',t)
# --- derivation-row aliases (ID-DR)
for a,b in [('DR-V6.1','DR28'),('DR-V8.6','DR28'),('DR-V8.1','DR29'),('DR-V8.2','DR30'),('DR-V8.3','DR31'),('DR-V8.4','DR32'),('DR-V8.5','DR33'),('DR-V8.7','DR34'),('DR-V8.8','DR35'),('DR-V1.1','DR26'),('DR-SKY','DR27')]:
    t=t.replace(a,b)
# --- citation form (G-cite): Vn §x -> V0n §x ; Vn-3.7.3 -> V0n §3.7.3 ; Vn's -> V0n's
t=re.sub(r'(?<![\w\-./])V([1-9]) §',r'V0\1 §',t)
t=re.sub(r'(?<![\w\-./])V([1-9])-(\d+(?:\.\d+)+)',r'V0\1 §\2',t)
t=re.sub(r"(?<![\w\-./])V([1-9])(['’]s\b)",r"V0\1\2",t)
t=re.sub(r'(?<![\w\-./])V([1-9]) (\(|W\d)',r'V0\1 \2',t)
# volume N words -> V0N (one pointer form)
# --- retired terms
t=t.replace('Change from here','Open a copy from here')
t=re.sub(r'\bthe decline lottery\b','the strike pool',t)
t=re.sub(r'\bdecline lottery\b','strike pool',t)
t=re.sub(r'\bthe decline pool\b','the strike pool',t)
t=re.sub(r'\bdecline pool\b','strike pool',t)
t=re.sub(r'\bretired ways\b','hollow ways',t)
t=re.sub(r'\bretired way\b','hollow way',t)
t=re.sub(r'\blone neighbourhood documents?\b','standalone neighbourhood document',t)
t=re.sub(r'\bstandalone hoods\b','standalone neighbourhood documents',t)
t=re.sub(r'\bstandalone hood\b','standalone neighbourhood document',t)
open(sys.argv[2],'w').write(t)
