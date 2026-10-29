import cv2, numpy as np
im=cv2.imread('/mnt/user-data/attachments/bc125e3f-7945-5676-96fd-a6e5a140db6d/1d681972-image.png')
hsv=cv2.cvtColor(im,cv2.COLOR_BGR2HSV)
H,S,V=[hsv[...,i].astype(int) for i in range(3)]
gray=cv2.cvtColor(im,cv2.COLOR_BGR2GRAY)
gold=((S>60)&(H>8)&(H<35)&(V>80)).astype(np.uint8)*255
navy=((gray<120)&~(gold>0)).astype(np.uint8)*255
k=np.ones((3,3),np.uint8)
gold=cv2.morphologyEx(gold,cv2.MORPH_OPEN,k); navy=cv2.morphologyEx(navy,cv2.MORPH_OPEN,k)
def paths(mask,eps):
    # upscale-smooth for nicer curves
    m=cv2.GaussianBlur(mask,(5,5),0); _,m=cv2.threshold(m,127,255,0)
    cs,hier=cv2.findContours(m,cv2.RETR_CCOMP,cv2.CHAIN_APPROX_NONE)
    d=[]
    for c in cs:
        if cv2.contourArea(c)<30: continue
        a=cv2.approxPolyDP(c,eps,True).reshape(-1,2)
        d.append('M'+' '.join(f'{x} {y}' for x,y in a)+'Z')
    return ''.join(d)
g=paths(gold,1.2); n=paths(navy,0.45)
ys,xs=np.where((gold>0)|(navy>0)); print('bbox',xs.min(),ys.min(),xs.max(),ys.max())
gy,gx=np.where(gold>0); print('gold bbox',gx.min(),gy.min(),gx.max(),gy.max())
# roof-only bbox (gold above text)
r=gold.copy(); r[480:]=0; ry,rx=np.where(r>0); print('roof bbox',rx.min(),ry.min(),rx.max(),ry.max())
open('gold.d','w').write(g); open('navy.d','w').write(n)
# roof-only gold path
open('roof.d','w').write(paths(r,1.2))
print(len(g),len(n))
