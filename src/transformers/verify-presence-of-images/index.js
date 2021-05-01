import debugContext from 'debug';
const debug = debugContext('create-cover-from-thumbnails');

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
  const contentFile = path.join(home, 'content.yaml');
  const isYamlDatabase = (await exists(contentFile));
  const imagesLocation = path.join(home, 'cache', 'images.json');

  const db = {
    coverImage: [],
    coverImageSizeVariations:[],
    youtubeThumbnails:[],
    localImages:[],
  }

  db.coverImage.push(path.join(filesDirectory,record.image));

  for(const image of coverImages){
    db.coverImageSizeVariations.push(path.join(cacheDirectory,`${image.id}-${record.image}`));
  }

  if(isYamlDatabase){
    const database = yaml.load((await readFile(contentFile)).toString())
    db.youtubeThumbnails = db.youtubeThumbnails.concat( database.filter(o=>o.type === 'youtube').map(i=>path.join(filesDirectory,`yid-${i.id}.jpg`)) );
  }

  db.localImages = db.localImages.concat( JSON.parse((await readFile(imagesLocation))).filter(i=>!i.url.startsWith('yid-')).map(i=>path.join(filesDirectory,i.url)) );

  for(const [name, list] of Object.entries(db)){
    for(const file of list){
      if(!(await exists(file))){
        throw new Error(`Image file(s) are missing in ${name} or ${record.id}`)
      }
    }
  }


}
