import path from "path";
import { readdir } from "fs/promises";

import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

import camelCase from "lodash/camelCase.js";

export default async function main(){
  const generators = {};
  const plugins = (await readdir(path.join(__dirname), { withFileTypes: true }))
    .filter(dirent => dirent.isDirectory())
    .filter(dirent => !dirent.name.startsWith('_'))
    .map(dirent => ({name: camelCase(dirent.name), path: path.join(__dirname, dirent.name, 'index.js')}))
    for(let plugin of plugins){
      generators[plugin.name] = (await import(plugin.path)).default;
    }
  return generators;
}
