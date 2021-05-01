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

async function main({ so, project, dist }){

  // WARNING: links are wild, it could be svg, jpg, mp3 or even zip! so a _local_ link contains its own wwwroot folder
  for(const record of so.data){
    if(record.audio){
      const sourceFile = path.resolve(path.join(project.name, record.name, 'files', record.audio));
      await access(sourceFile);
      const destinationDir = path.join(dist, 'audio');
      await mkdir(destinationDir, { recursive: true });
      const destinationFile = path.join(destinationDir, name);
      if(await expired(destinationFile, [sourceFile])) await copyFile(sourceFile, destinationFile);
    }
  }



}
