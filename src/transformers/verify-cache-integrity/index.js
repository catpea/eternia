import path from 'path';

import { access, readFile } from 'fs/promises';

import { content } from "../helpers.js";

export default main;

async function main({record, project, home, dist}){

  const cache = path.join(home, 'cache');

  const recordFile = path.join(cache, 'record.json');
  await access(recordFile);

  const contentFile = path.join(cache, 'html.html');
  await access(contentFile);

  const bootstrapFile = path.join(cache, 'bootstrap.html');
  await access(bootstrapFile);

  const printFile = path.join(cache, 'print.html');
  await access(printFile);

  const textFile = path.join(cache, 'text.txt');
  await access(textFile);

  const imagesFile = path.join(cache, 'images.json');
  await access(imagesFile);

  const linksFile = path.join(cache, 'links.json');
  await access(linksFile);

}
