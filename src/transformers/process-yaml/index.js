import path from "path";
import { writeFile, readFile } from "fs/promises";

import yaml from "js-yaml";

import { exists, expired } from "../helpers.js";
import toHtml from "./to-html.js";
import toBootstrap from "./to-bootstrap.js";

export default main;

async function main({record, project, home, dist}){

  const contentLocation = path.join(home, 'content.yaml');
  if(!(await exists(contentLocation))) return;

  const htmlLocation = path.join(home, 'cache', 'html.html');
  const bootstrapLocation = path.join(home, 'cache', 'bootstrap.html');

  if( await expired(contentLocation, [htmlLocation, bootstrapLocation]) ){
    const content = yaml.load(await readFile(contentLocation));
    const html = toHtml(content);
    const bootstrap = toBootstrap(content);
    record.html = html;
    record.bootstrap = bootstrap;
    await writeFile(htmlLocation, html);
    await writeFile(bootstrapLocation, bootstrap);
  }else{
    const html = await readFile(htmlLocation);
    const bootstrap = await readFile(bootstrapLocation);
    record.html = html;
    record.bootstrap = bootstrap;
  }


}
