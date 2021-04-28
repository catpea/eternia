import { readFile } from "fs/promises";

export default main;

async function main({record, project, home}){
  return {} // TODO: JSON.parse((await readFile(path.join(home, 'cache', 'record.json'))).toString());
}
