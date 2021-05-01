import path from "path";
import { writeFile, readFile } from "fs/promises";

import marked from "marked";
import pretty from "pretty";

import { exists, expired } from "../helpers.js";
import getImages from "./get-images.js";

export default main;

async function main({record, project, home, dist}){

  if(record.images) return;

  const htmlLocation = path.join(home, 'cache', 'html.html');
  const imagesLocation = path.join(home, 'cache', 'images.json');

  if( await expired(imagesLocation, [htmlLocation]) ){
    const html = await readFile(htmlLocation);
    const images = getImages(html);
    record.images = images;
    await writeFile(imagesLocation, JSON.stringify(images, null, '  '));
  }else{
    const images = JSON.parse( (await readFile(imagesLocation)) );
    record.images = images;
  }


}
