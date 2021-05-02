import debugContext from 'debug';
const debug = debugContext('create-cover-from-thumbnails');

import path from "path";
import { statSync } from "fs";

import util from 'util';
import child_process from 'child_process';
const execFile = util.promisify(child_process.execFile);

import yaml from "js-yaml";

import { writeFile, readFile } from "fs/promises";
import { exists, expired, ydbImages } from "../helpers.js";

export default main;

// to be ran after changes to record object are made
async function main({record, project, home}){

  if(!record.image) return; // sometimes things don't have a cover

  const filesDirectory = path.join(home, "files");
  const cacheDirectory = path.join(home, "cache");

  const yamlContentFile = path.join(home, "content.yaml");

  if(!(await exists(yamlContentFile))) return;

  const database = yaml.load(await readFile(yamlContentFile));

  const destinationFile = path.join(filesDirectory, record.image);
  const sourceFiles = (await ydbImages(database)).map(i=>path.join(filesDirectory,i));

  if(sourceFiles.length === 0) return;

  const latestFile = sourceFiles.map(file=>({file, date: new Date(statSync(file).mtime)})).sort((a, b) => b.date - a.date).shift().file;

    if(await expired(destinationFile, [latestFile,yamlContentFile])){

    debug(`rebuilding cover image for: ${record.id}`);

    let tile = 3;
    if(sourceFiles > 17) tile = 3;
    if(sourceFiles > 25) tile = 4;
    if(sourceFiles > 35) tile = 5;
    if(sourceFiles > 45) tile = 7;
    if(sourceFiles < 9) tile = 2;
    if(sourceFiles < 5) tile = 2;
    if(sourceFiles < 4) tile = 1;

    const command = 'montage';
    const commandArguments = [
      '-background',
      '#212529',
      'SOURCES',
      '-geometry',
      '320x230',
      '-tile',
      `TILE`,
      'DESTINATION'
     ]
    .map(i=>i==='TILE'?`${tile}x`:i)
    //.map(i=>i==='SOURCES'?sourceFiles.join(" "):i)
    .map(i=>i==='DESTINATION'?destinationFile:i);

    commandArguments.splice(commandArguments.indexOf('SOURCES'), 1, ...sourceFiles);
    const { stdout } = await execFile(command, commandArguments);
    if(stdout.trim()) debug(stdout);

   }

}
