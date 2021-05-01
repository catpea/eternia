import path from "path";

import { writeFile, readFile } from "fs/promises";

export default main;

// to be ran after changes to record object are made
async function main({record, project, home}){
  const recordLocation = path.join(home, 'cache', 'record.json');
  await writeFile(recordLocation, JSON.stringify(record, null, "  "));
  return record;
}
