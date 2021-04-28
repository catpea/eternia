import debugContext from 'debug';
const debug = debugContext('compiler-helpers');

import invariant from 'invariant';
import path from "path";
import { existsSync, statSync } from "fs";
import { readFile, readdir, access } from "fs/promises";

export {
  expired,
  content,

};

async function expired(compiled, sources) {
  if (!(await access(compiled))) return true; // yes it is outdated, it does not even exit
  const sourceFile = sources.map(file=>({file, date: new Date(statSync(file).mtime)})).sort((a, b) => b.date - a.date).shift().file;
  const destinationStats = statSync(compiled);
  const sourceStats = statSync(sourceFile);
  const destinationDate = new Date(destinationStats.mtime);
  const sourceDate = new Date(sourceStats.mtime);
  if (sourceDate > destinationDate) return true; // the destination is outdated, because source file is newer.
}

async function content(directory) {
  let candidates = [];
  let response = undefined;
  const files = await readdir(directory);
  for await (const file of files) {
    if (file.startsWith("content.")) candidates.push(file);
  }
  response = candidates.pop();
  invariant(response, 'Unable to guess content file, content file may not be present.');
  return response;
}
