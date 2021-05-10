import debugContext from 'debug';
const debug = debugContext('resize-cover-images');

import path from "path";
import { statSync } from "fs";

import util from 'util';
import child_process from 'child_process';
const execFile = util.promisify(child_process.execFile);

import invariant from "invariant";
import yaml from "js-yaml";

import { writeFile, readFile } from "fs/promises";
import { exists, expired, ydbImages, coverImages } from "../helpers.js";

export default main;

async function main({record, project, home}){

  const filesDirectory = path.join(home, "files");
  const cacheDirectory = path.join(home, "cache");

  for(const image of coverImages){
    invariant(record.image, 'record.image must never be empty')

    const destinationFile = path.join(cacheDirectory, `${image.id}-${record.image}`);
    const sourceFile = path.join(filesDirectory, record.image);

    if(await expired(destinationFile, [sourceFile])){
      debug(`${destinationFile} expired, ${sourceFile} is newer.`)
      const commandArguments = image.arguments
      .map(i=>i==='SOURCE'?sourceFile:i)
      .map(i=>i==='DESTINATION'?destinationFile:i);
      debug(`Resizing ${record.id} cover image to ${image.id} size`)
      const { stdout } = await execFile(image.command, commandArguments);
      if(stdout.trim()) debug(stdout);
    }

  }

}
