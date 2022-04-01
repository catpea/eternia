import debugContext from 'debug';
const debug = debugContext('create-something');

import path from "path";
import { access, mkdir, readFile, writeFile } from "fs/promises";

import handlebars from "handlebars";
import handlebarsHelpers from "handlebars-helpers";
var helpers = handlebarsHelpers({
  handlebars: handlebars,
});

import marked from "marked";
import pretty from "pretty";

import { exists, expired, allImages } from "../helpers.js";

// create-narration-list createNarrationList
export default main;

async function main({ so, project, dist, progress }){

  const list = [];

  for(const record of so.data){
    if(record.audio){
      const source = path.join(project.name, record.name, 'files', record.audio);
      await access(source);
      list.push(`file '${source}'`)
    }
  }

  const audiolistLocation = path.join(dist, "audiolist.txt");
  await writeFile(audiolistLocation, list.concat('\n'));
  debug(`Audio list created at: ${audiolistLocation}`)




}
