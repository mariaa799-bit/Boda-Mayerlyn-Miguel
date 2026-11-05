import fs from 'node:fs';
import path from 'node:path';
import Wedding from './wedding';
export default function Page(){const invitation=fs.readFileSync(path.join(process.cwd(),'app/invitation.html'),'utf8');return <Wedding invitation={invitation}/>}
