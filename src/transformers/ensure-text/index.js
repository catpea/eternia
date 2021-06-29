import path from "path";
import { writeFile, readFile } from "fs/promises";

import marked from "marked";
import pretty from "pretty";

import { exists, expired } from "../helpers.js";
import toText from "./to-text.js";

export default main;

async function main({record, project, home, dist}){

  if(record.text) return;

  const htmlLocation = path.join(home, 'cache', 'print.html'); //NOTE: don't use print.html as link references will pop up in odd places, stick to the simple.html.
  const textLocation = path.join(home, 'cache', 'text.txt');

  if( await expired(textLocation, [htmlLocation]) ){
    const html = (await readFile(htmlLocation)).toString();
    const text = toText(html, record);
    record.text = text;
    await writeFile(textLocation, text);
  }else{
    const text = (await readFile(textLocation)).toString();
    record.text = text;
  }


}
