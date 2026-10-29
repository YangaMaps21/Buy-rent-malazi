import json,sys
sys.path.insert(0,'.')
from words import word, T, G
SCH='/usr/share/texmf/fonts/opentype/public/tex-gyre/texgyreschola-regular.otf'
gold=open('gold.d').read()
def gp(i): return f'<path d="{G[i]["d"]}"/>'
buy=''.join(gp(i) for i in range(0,3)); rent=''.join(gp(i) for i in range(3,7)); mal=''.join(gp(i) for i in range(7,13))
X0=1089
acc,accw=word('ACCOMMODATION',SCH,X0)
bnb,bnbw=word('BNB',SCH,X0)
print('acc width',accw,'bnb',bnbw)
GRAD='<linearGradient id="{id}" gradientUnits="userSpaceOnUse" x1="451" y1="464" x2="1332" y2="221"><stop offset="0" stop-color="#8f6a2a"/><stop offset=".38" stop-color="#c9a15a"/><stop offset=".55" stop-color="#f6d48e"/><stop offset=".72" stop-color="#c39650"/><stop offset="1" stop-color="#8a6322"/></linearGradient>'
def svg(text, gid, cls, glow='#e2b45c'):
    return (f'<svg class="brm-logo {cls}" xmlns="http://www.w3.org/2000/svg" viewBox="109 207 1558 459" role="img" aria-label="Buy | Rent | Malazi">'
     f'<defs>{GRAD.format(id=gid)}<filter id="{gid}g" x="-20%" y="-60%" width="140%" height="220%"><feGaussianBlur stdDeviation="14"/></filter><clipPath id="{gid}c"><rect x="1070" y="498" width="1500" height="140"/></clipPath></defs>'
     f'<path fill="url(#{gid})" d="{gold}"/>'
     f'<g fill="{text}"><g class="pop-buy"><g class="glow glow-buy" fill="{glow}" filter="url(#{gid}g)">{buy}</g>{buy}</g><g class="pop-rent"><g class="glow glow-rent" fill="{glow}" filter="url(#{gid}g)">{rent}</g>{rent}</g>'
     f'<g class="pop-mal"><g class="glow glow-mal" fill="{glow}" filter="url(#{gid}g)">{mal}</g><g clip-path="url(#{gid}c)"><g class="w-mal">{mal}</g><g class="w-acc">{acc}</g><g class="w-bnb">{bnb}</g></g></g></g></svg>')
D=14
def p(t): return f'{t/D*100:.2f}%'
R=140
def pop(cls,glow,cx,t0,dur=1.2,peak=0.45):
    a=f'translate({cx}px,566px) scale(1) translate(-{cx}px,-566px)'
    b=f'translate({cx}px,566px) scale(1.065) translate(-{cx}px,-566px)'
    e='cubic-bezier(.45,0,.25,1)'
    return (f'@keyframes brm-{cls}{{0%,{p(t0)},{p(t0+dur)},100%{{transform:{a}}}{p(t0+dur*peak)}{{transform:{b}}}}}'
            f'.brm-logo .{cls}{{animation:brm-{cls} {D}s {e} infinite}}'
            f'@keyframes brm-{glow}{{0%,{p(t0)},{p(t0+dur)},100%{{opacity:0}}{p(t0+dur*peak)}{{opacity:.75}}}}'
            f'.brm-logo .{glow}{{opacity:0;animation:brm-{glow} {D}s {e} infinite}}')
css=('.brm-logo{overflow:visible;display:block}'
 '.brm-logo .w-mal,.brm-logo .w-acc,.brm-logo .w-bnb{animation-duration:%ss;animation-iteration-count:infinite;animation-timing-function:cubic-bezier(.76,0,.24,1)}' % D +
 f'.brm-logo .w-mal{{animation-name:brm-mal}}.brm-logo .w-acc{{animation-name:brm-acc;opacity:0}}.brm-logo .w-bnb{{animation-name:brm-bnb;opacity:0}}'
 f'@keyframes brm-mal{{0%,{p(2)}{{transform:none;opacity:1}}{p(2.8)}{{transform:translateY(-{R}px);opacity:0}}{p(2.82)},{p(7.6)}{{transform:translateY({R}px);opacity:0}}{p(8.4)},100%{{transform:none;opacity:1}}}}'
 f'@keyframes brm-acc{{0%,{p(2)}{{transform:translateY({R}px);opacity:0}}{p(2.8)},{p(4.8)}{{transform:none;opacity:1}}{p(5.6)}{{transform:translateY(-{R}px);opacity:0}}{p(5.62)},100%{{transform:translateY({R}px);opacity:0}}}}'
 f'@keyframes brm-bnb{{0%,{p(4.8)}{{transform:translateY({R}px);opacity:0}}{p(5.6)},{p(7.6)}{{transform:none;opacity:1}}{p(8.4)}{{transform:translateY(-{R}px);opacity:0}}{p(8.42)},100%{{transform:translateY({R}px);opacity:0}}}}'
 + pop('pop-buy','glow-buy',281,9.6)+pop('pop-rent','glow-rent',765,10.05)+pop('pop-mal','glow-mal',1371,10.5) +
 '@media(prefers-reduced-motion:reduce){.brm-logo *{animation:none!important}.brm-logo .w-acc,.brm-logo .w-bnb{opacity:0}}')
json.dump(dict(header=svg('#13213a','brmh','brm-logo-header'),footer=svg('#ffffff','brmf2','brm-logo-footer'),css=css),open('anim.json','w'))
# standalone test page
open('anim-test.html','w').write(f'<style>{css}.brm-logo{{height:100%;width:auto}}</style><body style="margin:0;padding:30px 120px 30px 30px"><div style="height:120px">{svg("#13213a","a","x")}</div><div style="background:#08213e;padding:20px;margin-top:20px"><div style="height:80px">{svg("#fff","b","y")}</div></div></body>')
