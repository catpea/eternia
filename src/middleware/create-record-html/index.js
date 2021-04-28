import path from "path";
import { access } from "fs/promises";

export default main;

//import { ... } from "../helpers.js";

async function main({record, project, home}){

  const recordLocation = path.join(home, 'cache', 'record.json');

  if(await access(recordLocation)){
    console.log(`record is not OK, record will be rebuilt!`);
  }

  return record;
}
