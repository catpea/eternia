import debugContext from 'debug';
const debug = debugContext('create-something');

import path from "path";
import { mkdir, readFile, copyFile } from "fs/promises";

import handlebars from "handlebars";
import handlebarsHelpers from "handlebars-helpers";
var helpers = handlebarsHelpers({
  handlebars: handlebars,
});

import marked from "marked";
import pretty from "pretty";

import { exists, expired, allImages } from "../helpers.js";


export default main;

async function main({ so, project, dist, progress }){

  const dest = path.join(dist, 'image');
  await mkdir(dest, { recursive: true });

  const list = [];
  for(const record of so.data){
    const home = path.resolve(path.join(project.name, record.name));
    const images = await allImages({record, home});
    for(const image of images){
      const source = path.join(image.dir, image.name);
      const destination = path.join(dest, image.name);
      list.push({source, destination})
    }
  }

  progress.emit('setup', {type:'Image Copy', name: 'copy-images', size: list.length, label:'idle'});
  for(const {destination, source} of list){
    progress.emit('update', {name: 'copy-images', action:'increment', label: source});
    if(await expired(destination, [source])) await copyFile(source, destination);
  }

}
