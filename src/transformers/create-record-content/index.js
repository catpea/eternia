import path from "path";
import { exists } from "../helpers.js";

export default main;


async function main({record, project, home}){

  const htmlLocation = path.join(home, 'cache', 'html.html');
  const html = (await readFile(htmlLocation)).toString();

  const bootstrapLocation = path.join(home, 'cache', 'bootstrap.html');
  const bootstrap = (await readFile(bootstrapLocation)).toString();

  const printlLocation = path.join(home, 'cache', 'print.html');
  const print = (await readFile(printLocation)).toString();

  const textlLocation = path.join(home, 'cache', 'text.txt');
  const text = (await readFile(textLocation)).toString();

  const recordLocation = path.join(home, 'cache', 'record.json');
  record.html = html;
  record.bootstrap = bootstrap;
  record.print = print;
  record.text = text;

  return record;
}
