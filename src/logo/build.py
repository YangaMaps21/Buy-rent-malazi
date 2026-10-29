g=open('gold.d').read(); n=open('navy.d').read(); r=open('roof.d').read()
grad='''<linearGradient id="{id}" gradientUnits="userSpaceOnUse" x1="451" y1="464" x2="1332" y2="221"><stop offset="0" stop-color="#8f6a2a"/><stop offset=".38" stop-color="#c9a15a"/><stop offset=".55" stop-color="#f6d48e"/><stop offset=".72" stop-color="#c39650"/><stop offset="1" stop-color="#8a6322"/></linearGradient>'''
def full(text='#13213a', gid='brmg', pad=14):
    vb=f'{123-pad} {221-pad} {1653-123+2*pad} {652-221+2*pad}'
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" role="img" aria-label="Buy | Rent | Malazi"><defs>{grad.format(id=gid)}</defs><path fill="{text}" d="{n}"/><path fill="url(#{gid})" d="{g}"/></svg>'
def mark(gid='brmm', fill=None, pad=12):
    vb=f'{451-pad} {221-pad} {1332-451+2*pad} {464-221+2*pad}'
    f=fill or f'url(#{gid})'
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}" aria-hidden="true"><defs>{grad.format(id=gid)}</defs><path fill="{f}" d="{r}"/></svg>'
open('logo.svg','w').write(full())
open('logo-white.svg','w').write(full(text='#ffffff',gid='brmw'))
open('mark.svg','w').write(mark())
# square favicon: mark centered on navy rounded square
vb_w=1332-451; 
fav=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#0d294d"/><g transform="translate(3 24) scale({58/vb_w}) translate(-451 -221)"><defs>{grad.format(id="brmf")}</defs><path fill="url(#brmf)" d="{r}"/></g></svg>'
open('favicon.svg','w').write(fav)
