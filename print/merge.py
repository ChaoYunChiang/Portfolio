"""Joins the part PDFs of each project into one file, with each page's own colour behind it.
Usage: python3 -I print/merge.py spring-breeze
Reads print/out/parts/<name>-1.pdf, <name>-2.pdf, ... (and the matching .bg.pdf) and writes print/out/<name>.pdf"""
import glob,os,re,sys
from pypdf import PdfReader,PdfWriter
base=os.path.join(os.path.dirname(os.path.abspath(__file__)),'out')
for name in sys.argv[1:]:
    parts=sorted([f for f in glob.glob(os.path.join(base,'parts',name+'-*.pdf')) if not f.endswith('.bg.pdf')],key=lambda f:int(re.search(r'-(\d+)\.pdf$',f).group(1)))
    w=PdfWriter()
    for f in parts:
        bgfile=f[:-4]+'.bg.pdf'
        for pg in PdfReader(f).pages:
            if os.path.exists(bgfile):
                under=PdfReader(bgfile).pages[0]
                under.merge_page(pg)
                w.add_page(under)
            else:
                w.add_page(pg)
    w.write(os.path.join(base,name+'.pdf'))
    print(name,len(w.pages),'pages')
