import sys
sys.path.insert(0,'/Users/cstokes/Desktop/Maps/docs/validation/coherence/work/kernel')
from add import add
I=[]
def it(id,kind,sub,st,where,owner,reads=(),used=(),keys=(),**kw):
    d=dict(id=id,kind=kind,sub=sub,statement=st,where=list(where),owner=owner,reads=list(reads),used_by=list(used),keys=list(keys));d.update(kw);I.append(d)
