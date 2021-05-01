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

async function main({record, project, home}){

  // if(!record.image) return; // sometimes things don't have a cover

  const filesDirectory = path.join(home, "files");
  const cacheDirectory = path.join(home, "cache");

  const yamlContentFile = path.join(home, "content.yaml");
  const database = yaml.load(await readFile(yamlContentFile));

  const destinationFile = path.join(filesDirectory, record.image);
  const sourceFiles = (await ydbImages(database)).map(i=>path.join(filesDirectory,i));

  // if(sourceFiles.length === 0) return;

  // const latestFile = sourceFiles.map(file=>({file, date: new Date(statSync(file).mtime)})).sort((a, b) => b.date - a.date).shift().file;

    if(await expired(destinationFile, [latestFile,yamlContentFile])){
    const command = 'echo';
    const commandArguments = ['Hello','SOMETHING','World!']
    .map(i=>i==='SOMETHING'?`FOO`:i)
    .map(i=>i==='SOMETHING-ELSE'?`BAR`:i)
    // commandArguments.splice(commandArguments.indexOf('SOURCES'), 1, ...sourceFiles);
    const { stdout } = await execFile(command, commandArguments);
    if(stdout.trim()) debug(stdout);
   }

}
