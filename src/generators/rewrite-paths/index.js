import debugContext from 'debug';
const debug = debugContext('create-something');

import path from 'path';
import { writeFile, readFile } from 'fs/promises';

import application from './application.js';

export default main;

async function main({ so, project, dist }){

  const cwd = path.join(dist, 'wwwroot');
  const pattern = '**/*.{html}';
  const subdir = project.subdir;
  await application({ subdir, pattern, cwd });

}
