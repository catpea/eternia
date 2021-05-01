import path from "path";
import { writeFile, readFile } from "fs/promises";

import marked from "marked";
import pretty from "pretty";

import { exists, expired } from "../helpers.js";
import getLinks from "./get-links.js";

export default main;

async function main({record, project, home, dist}){

  if(record.links) return;

  const htmlLocation = path.join(home, 'cache', 'html.html');
  const linksLocation = path.join(home, 'cache', 'links.json');

  if( await expired(linksLocation, [htmlLocation]) ){
    const html = await readFile(htmlLocation);
    const links = getLinks(html);
    record.links = links;
    await writeFile(linksLocation, JSON.stringify(links, null, '  '));
  }else{
    const links = JSON.parse( (await readFile(linksLocation)) );
    record.links = links;
  }

}
