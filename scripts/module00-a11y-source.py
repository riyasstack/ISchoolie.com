"""Static HTML checks only; this does not run a browser or certify accessibility."""
from html.parser import HTMLParser
from pathlib import Path
import json
root=Path(__file__).resolve().parents[1]
class Audit(HTMLParser):
 def __init__(self):super().__init__();self.label_depth=0;self.button_depth=0;self.anchor_depth=0;self.labels=set();self.ids=[];self.controls=[];self.issues=[];self.mains=0;self.headings=0
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag=='button':
   if self.button_depth:self.issues.append('Nested button markup')
   self.button_depth+=1
  if tag=='a':
   if self.anchor_depth:self.issues.append('Nested anchor markup')
   self.anchor_depth+=1
  if tag=='label':
   self.label_depth+=1
   if a.get('for'):self.labels.add(a['for'])
  if a.get('id'):self.ids.append(a['id'])
  if tag=='main':self.mains+=1
  if tag=='h1':self.headings+=1
  if tag in ['input','select','textarea'] and a.get('type') not in ['hidden','submit','button','reset']:
   self.controls.append((tag,a,self.label_depth>0))
  if tag=='img' and 'alt' not in a:self.issues.append('Image lacks alt attribute')
 def handle_endtag(self,tag):
  if tag=='button':self.button_depth=max(0,self.button_depth-1)
  if tag=='a':self.anchor_depth=max(0,self.anchor_depth-1)
  if tag=='label':self.label_depth=max(0,self.label_depth-1)
 def finish(self):
  for tag,a,inside_label in self.controls:
   if not (inside_label or a.get('aria-label') or a.get('aria-labelledby') or a.get('id') in self.labels):self.issues.append(f'Unlabeled {tag}: {a.get("id",a.get("name","unnamed"))}')
  duplicates={i for i in self.ids if self.ids.count(i)>1}
  if duplicates:self.issues.append('Duplicate IDs: '+', '.join(sorted(duplicates)))
  if self.mains!=1:self.issues.append(f'Expected one main landmark; found {self.mains}')
  if self.headings!=1:self.issues.append(f'Expected one page heading; found {self.headings}')
  return self.issues
ids={s['id'] for s in json.loads((root/'packages/contracts/frontend-screens.json').read_text(encoding='utf-8'))}
files=[p for p in (root/'apps/web/.next/server/app/preview').glob('*.html') if p.stem in ids]+list((root/'apps/web/.next/server/app/design-lab/workflows').glob('W*.html'))
assert len(files)==220,f'Expected explicit preview build with 220 artifacts, got {len(files)}'
results=[]
for path in files:
 audit=Audit();audit.feed(path.read_text(encoding='utf-8'));issues=audit.finish()
 if issues:results.append({'file':str(path.relative_to(root)), 'issues':issues})
report={'kind':'static-html-label-id-landmark-check','artifacts':len(files),'passed':not results,'issues':results,'limits':'No browser hydration, computed contrast, focus, keyboard, screen-reader, viewport, or native accessibility checks.'}
(root/'docs/module-00/a11y-source-results.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
print(json.dumps({**report,'issues':results[:3],'affectedArtifacts':len(results)},indent=2))
raise SystemExit(bool(results))
