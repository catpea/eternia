export default main;

async function main({record, project, home}){
  return JSON.parse((await readFile(path.join(home, 'cache', 'record.json'))).toString());
}
