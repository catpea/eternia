import path from "path";
import { writeFile, readFile } from "fs/promises";

import yaml from "js-yaml";

import { exists, expired, missing } from "../helpers.js";
import toHtml from "./to-html.js";
import toPrint from "./to-print.js";
import toBootstrap from "./to-bootstrap.js";

export default main;

async function main({record, project, home, dist}){

  const contentLocation = path.join(home, 'content.yaml');
  if(!(await exists(contentLocation))) return;

  const htmlLocation = path.join(home, 'cache', 'html.html');
  const printLocation = path.join(home, 'cache', 'print.html');
  const bootstrapLocation = path.join(home, 'cache', 'bootstrap.html');

  if( await expired(contentLocation, [htmlLocation, bootstrapLocation], {tolerateMissingSources:true}) ){
    const content = yaml.load((await readFile(contentLocation)).toString());
    const html = toHtml(content);
    const print = toPrint(content);
    const bootstrap = toBootstrap(content);
    record.html = html;
    record.print = print;
    record.bootstrap = bootstrap;
    await writeFile(htmlLocation, html);
    await writeFile(printLocation, print);
    await writeFile(bootstrapLocation, bootstrap);
  }else{
    const html = (await readFile(htmlLocation)).toString();
    const bootstrap = (await readFile(bootstrapLocation)).toString();
    const print = (await readFile(printLocation)).toString();
    record.html = html;
    record.bootstrap = bootstrap;
    record.print = print;
  }


}
