import cv2, numpy as np, json
im=cv2.imread('orig.png'); hsv=cv2.cvtColor(im,cv2.COLOR_BGR2HSV)
H,S,V=[hsv[...,i].astype(int) for i in range(3)]
gray=cv2.cvtColor(im,cv2.COLOR_BGR2GRAY)
gold=((S>60)&(H>8)&(H<35)&(V>80))
navy=((gray<120)&~gold).astype(np.uint8)*255
navy=cv2.morphologyEx(navy,cv2.MORPH_OPEN,np.ones((3,3),np.uint8))
m=cv2.GaussianBlur(navy,(5,5),0); _,m=cv2.threshold(m,127,255,0)
cs,h=cv2.findContours(m,cv2.RETR_CCOMP,cv2.CHAIN_APPROX_NONE); h=h[0]
glyphs=[]
for i,c in enumerate(cs):
    if h[i][3]!=-1 or cv2.contourArea(c)<200: continue
    parts=[c]; j=h[i][2]
    while j!=-1:
        if cv2.contourArea(cs[j])>=20: parts.append(cs[j])
        j=h[j][0]
    x,y,w,hh=cv2.boundingRect(c)
    d=''.join('M'+' '.join(f'{a} {b}' for a,b in cv2.approxPolyDP(p,0.45,True).reshape(-1,2))+'Z' for p in parts)
    glyphs.append(dict(x=x,y=y,w=w,h=hh,d=d))
glyphs.sort(key=lambda g:g['x'])
for g in glyphs: print(g['x'],g['y'],g['w'],g['h'])
json.dump(glyphs,open('glyphs.json','w'))
