import { writeFile } from "fs/promises";

export default main;

async function main({record, project, home, dist}){

  const contentLocation = path.join(home, 'cache', 'content.html');
  const content = (await readFile(contentLocation)).toString();

  throw new Error('transform plain html to bootstrap here')

  const bootstrapLocation = path.join(home, 'cache', 'bootstrap.html');
  await writeFile(bootstrapLocation, content);

}
