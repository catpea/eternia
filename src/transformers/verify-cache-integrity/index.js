import path from 'path';

import { access, readFile } from 'fs/promises';

import { content } from "../helpers.js";

export default main;

async function main({record, project, home, dist}){

  const cache = path.join(home, 'cache');

  const recordFile = path.join(cache, 'record.json');
  await access(recordFile);

  const contentFile = path.join(cache, 'content.html');
  await access(contentFile);

}
