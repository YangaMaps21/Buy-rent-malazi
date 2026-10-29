import json
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
G=json.load(open('glyphs.json'))
names='B U Y R E N T M A L A2 Z I'.split()
T={n:g for n,g in zip(names,G)}
CAP=112; BASE=622; GAP=9
def fontglyph(path,ch):
    f=TTFont(path); gs=f.getGlyphSet(); cmap=f.getBestCmap(); gn=cmap[ord(ch)]
    cap=getattr(f['OS/2'],'sCapHeight',0) or 0
    if not cap:
        from fontTools.pens.boundsPen import BoundsPen
        bp=BoundsPen(gs); gs[cmap[ord('H')]].draw(bp); cap=bp.bounds[3]
    s=CAP/cap
    from fontTools.pens.boundsPen import BoundsPen
    bp=BoundsPen(gs); gs[gn].draw(bp); x0,y0,x1,y1=bp.bounds
    return s,gn,gs,(x0,x1)
def word(letters,fontpath,x=0):
    out=[];cx=x
    for ch in letters:
        key={'A':'A','M':'M','N':'N','T':'T','I':'I','B':'B','Z':'Z','L':'L','E':'E','R':'R','U':'U','Y':'Y'}.get(ch)
        if key and key in T:
            g=T[key]; dx=cx-g['x']
            out.append(f'<path transform="translate({dx} 0)" d="{g["d"]}"/>'); cx+=g['w']+GAP
        else:
            s,gn,gs,(x0,x1)=fontglyph(fontpath,ch)
            pen=SVGPathPen(gs); tp=TransformPen(pen,(s,0,0,-s,cx-x0*s,BASE)); gs[gn].draw(tp)
            out.append(f'<path d="{pen.getCommands()}"/>'); cx+=(x1-x0)*s+GAP
    return ''.join(out),cx-x-GAP
if __name__=='__main__':
    fonts=['/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf','/usr/share/fonts/truetype/liberation/LiberationSerif-Bold.ttf','/usr/share/texmf/fonts/opentype/public/tex-gyre/texgyrepagella-regular.otf','/usr/share/texmf/fonts/opentype/public/tex-gyre/texgyreschola-regular.otf','/usr/share/fonts/truetype/baskerville/GFSBaskerville.otf','/usr/share/fonts/truetype/crosextra/Caladea-Regular.ttf','/usr/share/fonts/truetype/google-fonts/Lora-Variable.ttf','/usr/share/texmf/fonts/opentype/public/tex-gyre/texgyrebonum-regular.otf']
    rows=[]
    for i,fp in enumerate(fonts):
        try: w,wd=word('ACCOMMODATION',fp)
        except KeyError: continue
        rows.append(f'<g transform="translate(0 {i*150-480})" fill="#13213a">{w}<text x="{wd+30}" y="600" font-size="40" fill="red">{i} {fp.split("/")[-1]}</text></g>')
    svg=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="-20 0 2400 {len(fonts)*150+40}" width="1600"><rect width="100%" height="100%" x="-20" fill="#fff"/>{"".join(rows)}</svg>'
    open('sheet.svg','w').write(svg)
