import path from 'path';
import { mkdir, writeFile } from "fs/promises";
import transformers from './transformers/index.js';
import generators from './generators/index.js';

export default compile;

async function compile({project}){

  console.log(`\n\n\n\n\n\n\n\n\n################################## Project Name: ${project.name} ##################################`);

  const data = [];
  const dist = path.resolve(path.join('dist', project.name));

  const transformation = await transformers();
  const generation = await generators();

  // Apply Transformations To Each Record
  for(const name of project.data){
    const record = {name};
    data.push(record);

    for(const transformer of project.transformers){
      //console.log(transformer);
      if(transformation[transformer.name]){
        console.log(`Executing Transformer: ${transformer.name}`);
        const options = Object.assign({}, transformer.options, { record, project, dist, home: path.resolve(path.join(project.name, name)) });
        const response = await transformation[transformer.name](options);
        if(response) Object.assign( record, response );
      }else{
        throw new Error(`Transformer not found: ${transformer.name}`);
      }
    }
  }

  // Create Server Object
  const requiredFields = ['name', 'title', 'description', 'subtitle', 'icon', 'format', 'order', 'network', 'links'];
  const so = Object.fromEntries(Object.keys(project).filter((i) => requiredFields.includes(i)).map((i) => [i, project[i]]));
  so.data = data;

  // Save Server Object
  const fileLocation = path.join(dist, project.name + '.json');
  await mkdir(path.dirname(fileLocation), { recursive: true });
  await writeFile(fileLocation, JSON.stringify(so, null, ' '));

  // Run Generators Over The Whole
  for(const generator of project.generators){
    if(generation[generator.name]){
      console.log(`Executing Generator: ${generator.name}`);
      const options = Object.assign({}, generator.options, { so, project, dist, });
      const response = await generation[generator.name](options);
    }else{
      throw new Error(`Generator not found: ${generator.name}`);
    }
  }

}
