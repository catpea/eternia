import path from "path";
import { writeFile, readFile } from "fs/promises";

import yaml from "js-yaml";

import { exists, expired, missing } from "../helpers.js";
import toHtml from "./to-html.js";
import toMarkdown from "./to-markdown.js";
import toSimpleMarkdown from "./to-simple-markdown.js";
import toPrint from "./to-print.js";
import toBootstrap from "./to-bootstrap.js";

export default main;

async function main({record, project, home, dist}){

  const contentLocation = path.join(home, 'content.yaml');
  if(!(await exists(contentLocation))) return;

  const mdLocation = path.join(home, 'cache', 'markdown.md');
  const htmlLocation = path.join(home, 'cache', 'html.html');
  const printLocation = path.join(home, 'cache', 'print.html');
  const bootstrapLocation = path.join(home, 'cache', 'bootstrap.html');

  const smdLocation = path.join('/home/meow/Universe/Development/db/dist/simple-md', record.guid+'.md');
  const smd = toSimpleMarkdown(yaml.load((await readFile(contentLocation)).toString()));
  await writeFile(smdLocation, smd);

  if( await expired(contentLocation, [htmlLocation, bootstrapLocation], {tolerateMissingSources:true}) ){
    const content = yaml.load((await readFile(contentLocation)).toString());
    const html = toHtml(content);
    const md = toMarkdown(content);
    const print = toPrint(content);
    const bootstrap = toBootstrap(content);
    record.md = md;
    record.html = html;
    record.print = print;
    record.bootstrap = bootstrap;
    await writeFile(mdLocation, md);
    await writeFile(htmlLocation, html);
    await writeFile(printLocation, print);
    await writeFile(bootstrapLocation, bootstrap);
  }else{
    const md = (await readFile(mdLocation)).toString();
    const html = (await readFile(htmlLocation)).toString();
    const bootstrap = (await readFile(bootstrapLocation)).toString();
    const print = (await readFile(printLocation)).toString();
    record.md = md;
    record.html = html;
    record.bootstrap = bootstrap;
    record.print = print;
  }


}
