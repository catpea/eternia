import debugContext from 'debug';
const debug = debugContext('create-something');

import path from "path";
import { access, mkdir, readFile, copyFile } from "fs/promises";

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

  const list = [];
  for(const record of so.data){
    if(record.audio){
      const source = path.resolve(path.join(project.name, record.name, 'files', record.audio));
      await access(source);
      const destinationDir = path.join(dist, 'wwwroot', 'audio');
      await mkdir(destinationDir, { recursive: true });
      const destination = path.join(destinationDir, record.audio);
      list.push({source, destination})
    }
  }

  progress.emit('setup', {type:'Copy Web Audio', name: 'copy-audio', size: list.length, label:'idle'});
  for(const {destination, source} of list){
    progress.emit('update', {name: 'copy-audio', action:'increment', label: source});
    if(await expired(destination, [source])) await copyFile(source, destination);
  }




}
