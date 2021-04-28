import middle from './middleware/index.js';
import path from 'path';

export default compile;

async function compile({project}){

  const middlewareDatabase = await middle();
  const middlewareBefore = [
    { name: 'verifyIntegrity', options: {}, },
    { name: 'bustRecordCache', options: {}, },
    { name: 'createRecordText', options: {}, },
    { name: 'createRecordHtml', options: {}, },
    { name: 'createRecord', options: {}, },
    { name: 'loadRecord', options: {} }
  ];
  const middlewareAfter = [
    {name: 'saveServerObject', options: {}}
  ];
  const middleware = middlewareBefore.concat(project.middleware).concat(middlewareAfter)

  //console.log(middlewareDatabase);

  const result = [];

  for(const name of project.data){
    const record = {name};
    result.push(record);
    for(const transformer of middleware){
      if(middlewareDatabase[transformer.name]){
        Object.assign( record, await middlewareDatabase[transformer.name]({record, project, home: path.resolve(path.join(project.name,name))}) );
      }else{
        console.log(`Transformer not found: ${transformer.name}`);
      }
    }
  }

  //console.log(result);

}
