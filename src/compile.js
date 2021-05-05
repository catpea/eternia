import debugContext from 'debug';
const debug = debugContext('compile');

import path from 'path';
import { mkdir, writeFile } from "fs/promises";

import transformers from './transformers/index.js';
import generators from './generators/index.js';

export default compile;

async function compile({project, progress}){

  debug(`#### Project Name: ${project.name} ###`);


  const data = [];
  const dist = path.resolve(path.join('dist', project.name));

  const transformation = await transformers();
  const generation = await generators();

  progress.emit('setup', {type:'Post Processor', name: 'posts', size:project.data.length});

  progress.emit('setup', {type:'Record Transformator', name: 'transformation', size:project.transformers.length, label:'idle'});
  progress.emit('setup', {type:'Content Generator', name: 'generation', size:project.generators.length, label:'idle'});
  progress.emit('setup', {type:'Copy Images', name: 'copy-images', size: 9999, label:'idle'});
  progress.emit('setup', {type:'Copy Audio', name: 'copy-audio', size: 9999, label:'idle'});
  progress.emit('setup', {type:'Website Generator', name: 'website', size:9999, label:'idle'});

  // Apply Transformations To Each Record
    for(const name of project.data){
      const record = {name};
      data.push(record);
      progress.emit('update', {name: 'posts', action:'increment', label: record.name});

      progress.emit('setup', {type:'Record Transformator', name: 'transformation', size:project.transformers.length});

      for(const transformer of project.transformers){
        progress.emit('update', {name: 'transformation', action:'increment', label: transformer.name});
        if(!transformation[transformer.name]) throw new Error(`Transformer not found: ${transformer.name}`);
        debug(`Executing Transformer: ${transformer.name}`);
        const options = Object.assign({}, transformer.options, { record, project, dist, home: path.resolve(path.join(project.name, name)), progress });
        const response = await transformation[transformer.name](options);
        if(response) Object.assign( record, response );
      } // for each transformer


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
    progress.emit('update', {name: 'generation', action:'increment', label: generator.name});
    if(!generation[generator.name]) throw new Error(`Generator not found: ${generator.name}`);
    debug(`Executing Generator: ${generator.name}`);
    const options = Object.assign({}, generator.options, { so, project, dist, progress});
    const response = await generation[generator.name](options);
  }

}
