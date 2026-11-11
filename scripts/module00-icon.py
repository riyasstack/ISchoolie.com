"""Rasterize the authored geometric knowledge mark for Expo launcher assets."""
from pathlib import Path
from PIL import Image,ImageDraw
root=Path(__file__).resolve().parents[1]
target=root/'apps/mobile/assets/images'
def render(transparent=False):
 image=Image.new('RGBA',(2048,2048),(255,255,255,0 if transparent else 255));draw=ImageDraw.Draw(image)
 scale=27 if transparent else 30;offset=(2048-40*scale)/2
 def pts(values):return [(round(offset+x*scale),round(offset+y*scale)) for x,y in values]
 brand='#2D2B55'
 draw.polygon(pts([(7,12),(20,5),(33,12),(20,19)]),fill=brand)
 for level in [20,28]:draw.line(pts([(7,level),(20,level+7),(33,level)]),fill=brand,width=round(2.7*scale),joint='curve')
 return image.resize((1024,1024),Image.Resampling.LANCZOS)
render().convert('RGB').save(target/'ischoolie-proposed-icon.png')
render(True).save(target/'ischoolie-proposed-foreground.png')
svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><path fill="#2D2B55" d="M7 12L20 5l13 7-13 7z"/><path fill="none" stroke="#2D2B55" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round" d="M7 20l13 7 13-7M7 28l13 7 13-7"/></svg>'
(root/'apps/web/public/ischoolie-proposed-mark.svg').write_text(svg)
print('Created original provisional launcher assets; preserved starter assets.')
