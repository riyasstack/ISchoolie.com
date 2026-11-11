"""Generated HTML checks for every applicable state; no browser is launched."""
from html.parser import HTMLParser
from pathlib import Path
from collections import Counter
import json,re
root=Path(__file__).resolve().parents[1]
contracts=json.loads((root/'docs/module-00/screen-state-contracts.json').read_text(encoding='utf-8'))
base=root/'apps/web/.next/server/app/design-lab/states'
void={'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}
class Audit(HTMLParser):
 def __init__(self):
  super().__init__();self.stack=[];self.headings=[];self.heading=None;self.text='';self.ids=[];self.labels=set();self.controls=[];self.mains=0;self.boundaries=[];self.tasks=0;self.issues=[];self.button_depth=0;self.anchor_depth=0
 def handle_starttag(self,tag,attrs):
  a=dict(attrs);parent=self.stack[-1] if self.stack else ('',False,False)
  # Next streams real page content in hidden S: containers, then moves it.
  # Suppress only the explicit task boundary for this source assertion.
  blocked=parent[1] or ('state-task-content' in a.get('class','').split() and 'hidden' in a)
  labeled=parent[2] or tag=='label'
  if a.get('id'):self.ids.append(a['id'])
  if tag=='label' and a.get('for'):self.labels.add(a['for'])
  if tag in ('input','select','textarea') and a.get('type') not in ('hidden','submit','button','reset'):self.controls.append((a,labeled))
  if tag=='main' and not blocked:self.mains+=1
  if 'data-state-contract' in a:self.boundaries.append((a['data-state-contract'],a.get('data-state-view')))
  if 'state-task-content' in a.get('class','').split():self.tasks+=1
  if tag=='button':
   if self.button_depth:self.issues.append('Nested button')
   self.button_depth+=1
  if tag=='a':
   if self.anchor_depth:self.issues.append('Nested anchor')
   self.anchor_depth+=1
  if tag in ('h1','h2') and not blocked:self.heading=tag;self.text=''
  if tag not in void:self.stack.append((tag,blocked,labeled))
 def handle_data(self,data):
  if self.heading:self.text+=data
 def handle_endtag(self,tag):
  if tag==self.heading:self.headings.append((tag,' '.join(self.text.split())));self.heading=None
  if tag=='button':self.button_depth=max(0,self.button_depth-1)
  if tag=='a':self.anchor_depth=max(0,self.anchor_depth-1)
  for index in range(len(self.stack)-1,-1,-1):
   if self.stack[index][0]==tag:self.stack=self.stack[:index];break
 def finish(self,contract,state,copy):
  if self.mains!=1:self.issues.append('Expected one main')
  if sum(tag=='h1' for tag,_ in self.headings)!=1:self.issues.append('Expected one visible task/page heading')
  if self.boundaries!=[(contract['id'],state)]:self.issues.append('State boundary or selected state mismatch')
  if state!='Ready' and not any(title==copy['heading'] for _,title in self.headings):self.issues.append('Missing task-specific recovery heading')
  if self.tasks!=(0 if copy['draft']=='clear' else 1):self.issues.append('Task retention/clearing markup mismatch')
  if any(count>1 for count in Counter(self.ids).values()):self.issues.append('Duplicate IDs')
  for a,labeled in self.controls:
   if not(labeled or a.get('aria-label') or a.get('aria-labelledby') or a.get('id') in self.labels):self.issues.append('Unlabeled control')
  return self.issues
results=[];checked=0
for contract in contracts:
 for state,copy in contract['states'].items():
  path=base/contract['id']/(state+'.html')
  if not path.exists():
   results.append({'id':contract['id'],'state':state,'issues':['Missing build artifact']});continue
  html=re.sub(r'<script\b[^>]*>.*?</script>','',path.read_text(encoding='utf-8'),flags=re.S|re.I)
  audit=Audit();audit.feed(html);issues=audit.finish(contract,state,copy);checked+=1
  if checked%200==0:print('Checked '+str(checked)+' generated state artifacts',flush=True)
  if issues:results.append({'id':contract['id'],'state':state,'issues':issues})
expected=sum(len(c['states']) for c in contracts)
report={'kind':'generated-html-state-coverage','screens':len(contracts),'expectedArtifacts':expected,'checkedArtifacts':checked,'passed':not results,'issues':results,'limits':'Server-generated markup only; no browser hydration, interaction, viewport, screen-reader or native runtime acceptance.'}
(root/'docs/module-00/state-artifact-results.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
print(json.dumps({**report,'issues':results[:8],'affectedArtifacts':len(results)},indent=2))
raise SystemExit(bool(results))
