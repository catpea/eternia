import middleware from './middleware/index.js';

export default compile;

async function compile({project}){
  const system = await middleware();


  console.log(project);
  console.log(system);

}
