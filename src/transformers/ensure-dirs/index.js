import path from "path";

import { mkdir } from "fs/promises";

export default main;

// git likes to delete data such as directories, this will create them, sigh
async function main({record, project, home}){
  const cacheLocation = path.join(home, 'cache');
  const filesLocation = path.join(home, 'files');
  await mkdir(cacheLocation, { recursive: true });
  await mkdir(filesLocation, { recursive: true });

}
