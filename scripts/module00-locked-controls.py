"""Focused check after disabling ordinary state choices in restricted/expired examples."""
from html.parser import HTMLParser
from pathlib import Path
import json,re
root=Path(__file__).resolve().parents[1]
contracts=json.loads((root/'docs/module-00/screen-state-contracts.json').read_text(encoding='utf-8'))
class Options(HTMLParser):
 def __init__(self):super().__init__();self.options=[];self.current=None;self.text=''
 def handle_starttag(self,tag,attrs):
  if tag=='option':self.current=dict(attrs);self.text=''
 def handle_data(self,data):
  if self.current is not None:self.text+=data
 def handle_endtag(self,tag):
  if tag=='option' and self.current is not None:self.options.append((self.text,self.current));self.current=None
issues=[];checked=0
for contract in contracts:
 for state in ('Restricted','Expired'):
  if state not in contract['states']:continue
  path=root/'apps/web/.next/server/app/design-lab/states'/contract['id']/(state+'.html')
  html=path.read_text(encoding='utf-8')
  marker='data-state-contract="'+contract['id']+'"'
  select=re.search(r'<select\b[^>]*>.*?</select>',html[html.index(marker):],flags=re.S)
  audit=Options();audit.feed(select.group(0))
  if len(audit.options)!=len(contract['states']) or any(('disabled' in attrs)!=(name!=state) for name,attrs in audit.options):issues.append(contract['id']+'/'+state)
  checked+=1
report={'kind':'locked-state-choice-markup','checkedArtifacts':checked,'passed':not issues,'issues':issues,'limits':'Static control attributes only; no keyboard or browser interaction test.'}
(root/'docs/module-00/locked-controls-results.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
print(json.dumps(report,indent=2));raise SystemExit(bool(issues))
