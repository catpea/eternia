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

async function main({ so, project, dist }){
  const dest = path.join(dist, 'image');
  await mkdir(dest, { recursive: true });
  for(const record of so.data){
    const home = path.resolve(path.join(project.name, record.name))
    const images = await allImages({record, home});
    for(const image of images){
      const sourceFile = path.join(image.dir, image.name);
      const destinationFile = path.join(dest, image.name);
      if(await expired(destinationFile, [sourceFile])) await copyFile(sourceFile, destinationFile);
    }
  }
}
