"""Apply an explicit recorded user acceptance without rewriting QA evidence."""
from pathlib import Path
import json
root=Path(__file__).resolve().parents[1];docs=root/'docs/module-00'
record=docs/'module-acceptance.json'
if record.exists():
 acceptance=json.loads(record.read_text(encoding='utf-8'))
 if acceptance['status']=='complete':
  progress_path=docs/'progress.json'
  progress=json.loads(progress_path.read_text(encoding='utf-8'))
  progress['status']='Complete — accepted by user'
  progress['module_acceptance']=acceptance
  progress['module_01_status']='Not started; not authorized'
  progress_path.write_text(json.dumps(progress,indent=2)+'\n',encoding='utf-8')
  for name in ['PROGRESS-LEDGER.md','MODULE-00-COMPLETION.md']:
   path=docs/name;text=path.read_text(encoding='utf-8')
   if name=='PROGRESS-LEDGER.md':
    start=text.index('Updated ');end=text.index('\n\n',start)
    text=text[:start]+'Updated 11 November 2026. **Complete — accepted by the user. Module 01 has not started and is not authorized.**'+text[end:]
    text=text.replace('## Exact next work, Module 00 only','## Optional follow-up QA for the accepted module')
   else:
    start=text.index('## 1. Module 00 status');end=text.index('## 2.',start)
    text=text[:start]+'## 1. Module 00 status\n\n**Complete — accepted by the user on 11 November 2026.** Module 01 has not started and is not authorized. Existing QA evidence and browser/device limitations are retained; acceptance does not assert those unrun checks were performed.\n\n'+text[end:]
   marker='## User acceptance'
   text=text.split(marker)[0].rstrip()
   text+='\n\n'+marker+'\n\nThe user confirmed “module 000 is done” on 11 November 2026. Module 00 is closed by that decision. Earlier pending-acceptance statements and per-screen QA counts describe the implementation history, not the current module status. No additional QA execution is implied. Module 01 requires a separate instruction.\n'
   path.write_text(text,encoding='utf-8')
  print('Recorded Module 00 complete by user acceptance; Module 01 remains unstarted.')
