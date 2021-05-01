import path from "path";
import { readdir } from "fs/promises";

import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

import camelCase from "lodash/camelCase.js";

export default async function main(){
  const transformers = {};
  const plugins = (await readdir(path.join(__dirname), { withFileTypes: true }))
    .filter(o => o.isDirectory())
    .map(dirent => ({name: camelCase(dirent.name), path: path.join(__dirname, dirent.name, 'index.js')}))
    for(let plugin of plugins){
      transformers[plugin.name] = (await import(plugin.path)).default;
    }
  return transformers;
}
