import path from "path";
import { writeFile, readFile } from "fs/promises";

import marked from "marked";
import pretty from "pretty";

import { exists, expired } from "../helpers.js";
import toBootstrap from "./to-bootstrap.js";

export default main;

async function main({record, project, home, dist}){

  if(record.bootstrap) return;

  const htmlLocation = path.join(home, 'cache', 'html.html');
  const bootstrapLocation = path.join(home, 'cache', 'bootstrap.html');

  if( await expired(bootstrapLocation, [htmlLocation]) ){
    const html = await readFile(htmlLocation);
    const bootstrap = toBootstrap(html);
    record.bootstrap = bootstrap;
    await writeFile(bootstrapLocation, bootstrap);
  }else{
    const bootstrap = await readFile(bootstrapLocation);
    record.bootstrap = bootstrap;
  }


}
