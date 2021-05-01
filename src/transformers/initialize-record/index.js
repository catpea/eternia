import path from "path";

import { writeFile, readFile } from "fs/promises";

export default main;

async function main({record, project, home}){
  const configurationLocation = path.join(home, 'configuration.json');
  return JSON.parse(( await readFile(configurationLocation) ).toString());
}
