"""Render the sticker's vector SVG primitives to a print-size PDF."""
from pathlib import Path
import re
import shutil
import xml.etree.ElementTree as ET
from reportlab.pdfgen import canvas
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
source = ROOT / 'public/downloads/donmama-table-sticker-90x120mm.svg'
output = ROOT / 'output/pdf/donmama-table-sticker-90x120mm.pdf'
output.parent.mkdir(parents=True, exist_ok=True)
pdfmetrics.registerFont(TTFont('GowunBatang', str(ROOT / 'public/fonts/GowunBatang-Regular.ttf')))
root = ET.parse(source).getroot()
ns = '{http://www.w3.org/2000/svg}'
c = canvas.Canvas(str(output), pagesize=(90*mm, 120*mm), pageCompression=1)
c.setTitle('돈마마 테이블 스티커 - 90 x 120 mm')
c.setAuthor('돈마마')
c.scale(90*mm/900, 120*mm/1200)
for el in root.findall(ns+'rect'):
    x,y,w,h = (float(el.get(a,'0')) for a in ('x','y','width','height'))
    fill, stroke=el.get('fill'),el.get('stroke')
    if fill and fill!='none': c.setFillColor(HexColor(fill))
    if stroke: c.setStrokeColor(HexColor(stroke)); c.setLineWidth(float(el.get('stroke-width','1')))
    c.roundRect(x,1200-y-h,w,h,float(el.get('rx','0')),fill=int(bool(fill and fill!='none')),stroke=int(bool(stroke)))
group = root.find(ns+'g')
for el in group:
    if el.tag==ns+'text':
        text=el.text or ''
        font='GowunBatang' if el.get('class')=='serif' else 'Helvetica'
        size=float(el.get('font-size','16')); spacing=float(el.get('letter-spacing','0'))
        x=float(el.get('x')); y=1200-float(el.get('y'))
        width=pdfmetrics.stringWidth(text,font,size)+spacing*(len(text)-1)
        t=c.beginText(x-width/2,y); t.setFont(font,size); t.setCharSpace(spacing)
        t.setFillColor(HexColor(el.get('fill',group.get('fill')))); t.textOut(text); c.drawText(t)
    elif el.tag==ns+'path':
        match=re.fullmatch(r'M([\d.]+) ([\d.]+)H([\d.]+)',el.get('d',''))
        if not match: raise ValueError('Unexpected decorative path')
        x,y,end=map(float,match.groups()); c.setStrokeColor(HexColor(el.get('stroke')))
        c.setLineWidth(float(el.get('stroke-width','1'))); c.line(x,1200-y,end,1200-y)
    elif el.tag==ns+'svg':
        x,y,w,h=(float(el.get(a)) for a in ('x','y','width','height'))
        size=float(el.get('viewBox').split()[2]); scale=w/size
        c.setFillColor(HexColor('#ffffff'));c.rect(x,1200-y-h,w,h,fill=1,stroke=0)
        c.setFillColor(HexColor('#171c17'))
        for col,row in re.findall(r'M(\d+) (\d+)h1v1h-1z',el.find(ns+'path').get('d')):
            c.rect(x+int(col)*scale,1200-y-(int(row)+1)*scale,scale,scale,fill=1,stroke=0)
c.showPage();c.save()
reader=PdfReader(output)
assert len(reader.pages)==1
assert abs(float(reader.pages[0].mediabox.width)-90*mm)<0.01
assert abs(float(reader.pages[0].mediabox.height)-120*mm)<0.01
text=reader.pages[0].extract_text()
for expected in ['돈마마','영수증 리뷰 참여 시','대패삼겹 또는 우삼겹 반 인분 서비스']:
    assert expected in text,expected
shutil.copy2(output,ROOT/'public/downloads'/output.name)
print('Exported and verified one-page vector PDF, 90 x 120 mm, embedded Korean font.')
