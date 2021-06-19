import path from 'path';

import { access, readFile } from 'fs/promises';

import { content } from "../helpers.js";

export default main;

async function main({record, project, home, dist}){

  const contentFile = path.join(home, await content(home));
  await access(contentFile);

  const configurationFile = path.join(home, 'configuration.json');
  await access(configurationFile);

  const filesDirectory = path.join(home, 'files');
  await access(filesDirectory);

  const cacheDirectory = path.join(home, 'cache');
  await access(cacheDirectory);

  // File Specific Tests
  const configuration = JSON.parse((await readFile( configurationFile )).toString());

  // while image is always required, in case of westland warrior there will be no image when adding a new chapter
  // only after download and make thumbnails runs will there be an image, so the image test must come after download
  // the following test is performed in src/transformers/verify-presence-of-images/index.js
  // const imageFile = path.join(home, 'files', configuration.image);
  // await access(imageFile);

  // audio is optional
  if(configuration.audio){
    const audioFile = path.join(home, 'files', configuration.audio);
    await access(audioFile);
  }

  // files should contain all files reported by cache/content.html
  // all the local assets should exist in filesDirectory
  // yt thumbnails also exist in files directory



}
