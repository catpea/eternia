import yaml from "js-yaml";
import { writeFile } from "fs/promises";

import { exists } from "../helpers.js";

import toHtml from "./to-html.js";
import toBootstrap from "./to-bootstrap.js";

export default main;

async function main({record, project, home, dist}){

  const contentLocation = path.join(home, 'content.yaml');
  if(!(await exists(contentLocation))) return;

  const content = yaml.load(content);

  const html = toHtml(content);
  const bootstrap = toBootstrap(content);

  record.html = html;
  record.bootstrap = bootstrap;

  // write to cache...

  const htmlLocation = path.join(home, 'cache', 'html.html');
  await writeFile(htmlLocation, html);

  const bootstrapLocation = path.join(home, 'cache', 'bootstrap.html');
  await writeFile(bootstrapLocation, bootstrap);

}
