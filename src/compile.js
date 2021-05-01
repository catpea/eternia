import path from 'path';
import { mkdir, writeFile } from "fs/promises";
import middleware from './transformers/index.js';

export default compile;

async function compile({project}){

  console.log();
  console.log(`Project Name: ${project.name}`);
  const result = [];
  const dist = path.resolve(path.join('dist', project.name));
  const before = []; // system use
  const after = []; // system use
  const operations = before.concat(project.transformers).concat(after)
  const transformers = await middleware();

  for(const name of project.data){
    const record = {name};
    result.push(record);
    for(const transformer of operations){
      if(transformers[transformer.name]){
        console.log(`Executing Transformer: ${transformer.name}`);
        const options = Object.assign({}, transformer.options, { record, project, dist, home: path.resolve(path.join(project.name, name)), });
        const response = await transformers[transformer.name](options);
        if(response) Object.assign( record, response );
      }else{
        throw new Error(`Transformer not found: ${transformer.name}`);
      }
    }
  }

  // Save Server Object
  const fileLocation = path.join(dist, project.name, project.name + '.json');
  await mkdir(path.dirname(fileLocation), { recursive: true });
  await writeFile(fileLocation, JSON.stringify(result, null, ' '));
}
