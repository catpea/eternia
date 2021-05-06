import path from "path";
import { writeFile, readFile } from "fs/promises";

import marked from "marked";
import pretty from "pretty";

import { exists, expired } from "../helpers.js";
import toPrint from "./to-print.js";

export default main;

async function main({record, project, home, dist}){

  if(record.print) return;

  const htmlLocation = path.join(home, 'cache', 'html.html');
  const printLocation = path.join(home, 'cache', 'print.html');

  if( await expired(printLocation, [htmlLocation]) ){
    const html = (await readFile(htmlLocation)).toString();;
    const print = toPrint(html, record);
    record.print = print;
    await writeFile(printLocation, print);
  }else{
    const print = (await readFile(printLocation)).toString();
    record.print = print;
  }


}
