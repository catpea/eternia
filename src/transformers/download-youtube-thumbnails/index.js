import debugContext from 'debug';
const debug = debugContext('download-youtube-thumbnails');

import path from "path";
import { writeFile, readFile, readdir, mkdir } from "fs/promises";
import { utimesSync, existsSync } from "fs";
import {createWriteStream, unlinkSync} from 'fs';
import {pipeline} from 'stream';
import {promisify} from 'util';
//import {execa} from 'execa';
import { spawn } from 'child_process';

import fetch from 'node-fetch';
import yaml from 'js-yaml';

import { exists, expired } from "../helpers.js";

const streamPipeline = promisify(pipeline);

export default main;

async function main({record, project, home}){
  const filesDirectory = path.join(home, "files");
  const cacheDirectory = path.join(home, "cache");
  const contentFile = path.join(home, 'content.yaml');

  if(!(await exists(contentFile))) return;

  const database = yaml.load((await readFile(contentFile)).toString())

  const databaseIds = database.filter(o=>o.type === 'youtube');
  const databaseFiles = databaseIds.map(s=>`yid-${s.id}.jpg`)

  // Cleanup Here
  const currentFiles = (await readdir(filesDirectory, { withFileTypes: true }))
  .filter(o => o.isFile())
  .map(o => o.name)
  .filter(s => s.startsWith('yid-'))
  .filter(s => s.endsWith('.jpg'))
  .filter(s=>databaseFiles.indexOf(s) === -1)
  .map(s=>path.join(filesDirectory, s))
  .map(s=>unlinkSync(s))

  for(let video of databaseIds){
    const downloadUrl = `https://img.youtube.com/vi/${video.id}/0.jpg`;
    const destinationFile = path.join(filesDirectory, `yid-${video.id}.jpg`);
    if(!existsSync(destinationFile)){

      const FALLBACK = false;

      if(!FALLBACK){
        debug('Downloading Thumbnail',destinationFile)
        const response = await fetch(downloadUrl);
        if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
        await streamPipeline(response.body, createWriteStream(destinationFile));
      }else{
        try {
          await mkdir(filesDirectory, { recursive: true });
          const ls = spawn('curl', [downloadUrl, '--output', destinationFile]);
        } catch (error) {
      	  console.log(error);
        }
      } // FALLBACK
    } // if-x
  } // for
}
