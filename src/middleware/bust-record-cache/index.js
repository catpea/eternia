export default main;

import { expired, content } from "../helpers.js";
import { unlink } from "fs/promises";

async function main({record, project, home}){


  const location = path.join(home, 'cache', 'record.json');

  const sources = [
    path.join(home, 'files', 'content.html'),
    path.join(home, 'configuration.json'),
    path.join(home, content(home)),
  ];

  if(await expired(location, sources)){
    console.log(`Record expired, record cache will be busted, unlink(${location})`);
    //await unlink(location);
  }



  return record;
}
