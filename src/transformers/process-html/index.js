import { writeFile } from "fs/promises";

export default main;

async function main({record, project, home, dist}){

  const contentLocation = path.join(home, 'content.html');
  const content = (await readFile(contentLocation)).toString();

  const htmlLocation = path.join(home, 'cache', 'html.html');
  await writeFile(htmlLocation, content);






}
