import middleware from './middleware/index.js';

export default compile;

async function compile({project}){
  const system = await middleware();


  console.log(project.name);
  
  // console.log(project.dependencies);
  // console.log(project);
  // console.log(system);

}
