import debugContext from 'debug';
const debug = debugContext('compiler-helpers');

import invariant from 'invariant';
import path from "path";
import { existsSync, statSync } from "fs";
import { readFile, readdir, access } from "fs/promises";

export {
  expired,
  content,
  exists,

  ydbImages,
  coverImages
};

const coverImages = [
  {id: 'bl', command:'convert', arguments:['-define', 'jpeg:size=160x160', 'SOURCE', '-thumbnail', '100x100^', '-gravity', 'center', '-extent', '100x100', '-gaussian-blur', '0x3', '-quality', 90, 'DESTINATION']},
  {id: 'ss', command:'convert', arguments:['-define', 'jpeg:size=160x160', 'SOURCE', '-thumbnail', '100x100^', '-gravity', 'center', '-extent', '100x100', '-quality', '90', 'DESTINATION']},
  {id: 'xs', command:'convert', arguments:['-define', 'jpeg:size=320x200', 'SOURCE', '-thumbnail', '200x200^', '-gravity', 'center', '-extent', '200x200', '-quality', '90', 'DESTINATION']},
  {id: 'sm', command:'convert', arguments:['-define', 'jpeg:size=640x480', 'SOURCE', '-thumbnail', '300x300^', '-gravity', 'center', '-extent', '300x300', '-quality', '90', 'DESTINATION']},
  {id: 'md', command:'convert', arguments:['-define', 'jpeg:size=800x600', 'SOURCE', '-thumbnail', '500x500^', '-gravity', 'center', '-extent', '500x500', '-quality', '90', 'DESTINATION']},
  {id: 'lg', command:'convert', arguments:['-define', 'jpeg:size=1024x768', 'SOURCE', '-thumbnail', '600x600^', '-gravity', 'center', '-extent', '600x600', '-quality', '90', 'DESTINATION']},
  {id: 'xl', command:'convert', arguments:['-define', 'jpeg:size=1920x1080', 'SOURCE', '-thumbnail', '1024x768^', '-gravity', 'center', '-extent', '1024x768', '-quality', '90', 'DESTINATION']},
]

async function expired(compiled, sources) {
  if (!(await exists(compiled))) return true; // yes it is outdated, it does not even exist
  for(const source of sources){
    if (!(await exists(source))) return true;
  }
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

async function exists(location) {
  let response = true;
  try{await access(location)}catch(e){response = false}
  return response;
}

async function ydbImages(database) {
  //note: the url(s) here are just the name of files, not the full path.
  const images = [];
  for (let section of database) {
    if(section.type == 'youtube'){
      images.push(`yid-${section.id}.jpg`);
    } else if(section.type == 'image'){
      images.push(`${section.url}`);
    } else if(section.type == 'business'){
      images.push(`${section.url}`);
    }
  } // for each section
  return images;
}
