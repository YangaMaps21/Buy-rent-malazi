import re,base64,sys
p=sys.argv[1]; s=open(p).read()
L=sys.argv[2] if len(sys.argv)>2 else '/home/claude/logo/'
def uri(f): return 'data:image/svg+xml;base64,'+base64.b64encode(open(L+f,'rb').read()).decode()
mark_white=open(L+'mark.svg').read().replace('url(#brmm)','#ffffff')
uri_mw='data:image/svg+xml;base64,'+base64.b64encode(mark_white.encode()).decode()
n0=len(s)
# 1 header logo
s,c1=re.subn(r'(<a href="#top" class="brand"[^>]*><img )src="data:image/svg\+xml;base64,[A-Za-z0-9+/=]+"',lambda m:m.group(1)+f'src="{uri("logo.svg")}"',s,1)
# 2 footer logo
s,c2=re.subn(r'(<img class="footer-logo" )src="data:image/svg\+xml;base64,[A-Za-z0-9+/=]+"',lambda m:m.group(1)+f'src="{uri("logo-white.svg")}"',s,1)
# 3 favicon
s=s.replace('<title>',f'<link rel="icon" type="image/svg+xml" href="{uri("favicon.svg")}"><title>',1)
# CSS
css=('.brand img{height:58px;width:auto;max-width:100%;display:block}'
 '.footer-logo{max-width:none;height:74px;width:auto;opacity:1}'
 f'.brm-mark{{display:inline-block;width:46px;aspect-ratio:905/267;background:url("{uri("mark.svg")}") center/contain no-repeat;vertical-align:middle}}'
 f'.brm-mark.light{{background-image:url("{uri_mw}")}}'
 '.eyebrow .brm-mark{width:40px;margin:-4px 10px 0 0}'
 '.value-icon .brm-mark{width:44px;margin-top:4px}'
 '.cta-inner .brm-mark{display:block;width:74px;margin:0 0 14px}'
 '.empty-state .brm-mark{display:block;width:64px;margin:0 auto 12px;opacity:.85}'
 '@media(max-width:1100px){.brand img{height:52px;width:auto}}'
 '@media(max-width:850px){.brand img{height:50px;width:auto}}'
 '@media(max-width:560px){.brand img{height:44px;width:auto}.footer-logo{height:62px}}')
s=s.replace('</style>',css+'</style>',1)
# remove old invert filter on footer logo
s=s.replace('.footer-logo{max-width:256px;filter:brightness(0) invert(1);opacity:.95}','',1)
# 4,5 eyebrows
s=s.replace('<p class="eyebrow">Welcome to Buy Rent Malazi','<p class="eyebrow"><span class="brm-mark" aria-hidden="true"></span>Welcome to Buy Rent Malazi',1)
s=s.replace('<p class="eyebrow">Test this feature','<p class="eyebrow"><span class="brm-mark" aria-hidden="true"></span>Test this feature',1)
# 6 value icon house glyph
s=s.replace('<div class="value-icon">⌂</div>','<div class="value-icon"><span class="brm-mark" aria-hidden="true"></span></div>',1)
# 7 CTA
s=s.replace('cta-inner"><h2>','cta-inner"><span class="brm-mark light" aria-hidden="true"></span><h2>',1)
# 8 empty state
s=s.replace('<div class="empty-state" id="empty-message">','<div class="empty-state" id="empty-message"><span class="brm-mark" aria-hidden="true"></span>',1)
open(p,'w').write(s); print('header',c1,'footer',c2,'size',n0,'->',len(s))
