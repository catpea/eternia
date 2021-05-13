import path from "path";
import { writeFile, readFile } from "fs/promises";

import marked from "marked";
import pretty from "pretty";

import { exists, expired, missing } from "../helpers.js";

export default main;

async function main({record, project, home, dist}){

  const contentLocation = path.join(home, 'content.html');
  if(!(await exists(contentLocation))) return;
  const htmlLocation = path.join(home, 'cache', 'html.html');

  if(await expired(contentLocation, [htmlLocation], {tolerateMissingSources:true}) ){
    const html = marked((await readFile(contentLocation)).toString());
    record.html = html;
    await writeFile(htmlLocation, html);
  }else{
    const html = (await readFile(htmlLocation)).toString();
    record.html = html;
  }



}
