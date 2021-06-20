import debugContext from 'debug';
const debug = debugContext('rewrite-paths');

import { writeFile, readFile } from 'fs/promises';
import path from 'path';

import cheerio from 'cheerio';
import glob from 'tiny-glob';

export default main;

async function patch({file, prefix}){
  const html = (await readFile(file)).toString();
  const $ = cheerio.load(html);

  const targets = {
    a: 'href',
    link: 'href',
    img: 'src',
    script: 'src',
  };

  for(const [selector, attribute] of Object.entries(targets)){
    $(selector).each(function (i, elem) {
      const location = $(this).attr(attribute);
      const rewrite = location?.startsWith('/');
      if(rewrite) $(this).attr(attribute, path.join(prefix, location));
    });
  }

  const result = await $.html();
  await writeFile(file, result);
}

async function main({prefix, pattern, cwd}){
  const files = await glob(pattern, {cwd, absolute:true});
  for (const file of files) {
    await patch({file, prefix})
  }
}
