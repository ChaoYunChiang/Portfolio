"""Builds the two combined portfolio PDFs from the per-project PDFs.
Run capture.js and merge.py first. Usage: python3 -I print/compile.py
Writes print/out/portfolio-hci.pdf and print/out/portfolio-creative.pdf, with a cover and bookmarks."""
import os
from pypdf import PdfReader,PdfWriter
base=os.path.join(os.path.dirname(os.path.abspath(__file__)),'out')
TITLE={
 'order-vendor-link':'Vendor Registration Link for an Order Management System',
 'byacre':'byACRE Taiwan E-commerce Website',
 'vr-locomotion':'Beyond Cybersickness',
 'reusable-cup':'Reusable Cup Market Research',
 'spring-breeze':'Longing for the Spring Breeze',
 'meimei':'Meimei, a Pet Game for an E-commerce Platform',
 'taipei-brewery':'Exploring Cultural Heritage through VR',
 'video-work':'Video work',
}
ORDER={
 'hci':['order-vendor-link','byacre','vr-locomotion','reusable-cup','spring-breeze','meimei','taipei-brewery','video-work'],
 'creative':['spring-breeze','taipei-brewery','meimei','video-work','order-vendor-link','byacre','reusable-cup','vr-locomotion'],
}
for ver,names in ORDER.items():
    w=PdfWriter()
    for pg in PdfReader(os.path.join(base,f'cover-{ver}.pdf')).pages: w.add_page(pg)
    w.add_outline_item('Contents',0)
    for n in names:
        r=PdfReader(os.path.join(base,n+'.pdf'))
        first=len(w.pages)
        for pg in r.pages: w.add_page(pg)
        w.add_outline_item(TITLE[n],first)
    w.add_metadata({'/Title':'Portfolio, Chao-Yun Chiang'})
    out=os.path.join(base,f'portfolio-{ver}.pdf')
    w.write(out)
    print(ver,len(w.pages),'pages,',round(os.path.getsize(out)/1e6,1),'MB')
