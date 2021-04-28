import invariant from "invariant";
import path from "path";
import { readFile } from "fs/promises";

export default {
  createDependencyStack,
};

async function createDependencyStack({name, projects, list, exists, circular}){
  if(!list) list = [];
  if(!exists) exists = {};
  if(!circular) circular = {};

  invariant(name, 'Name cannot be empty');

  const selected = projects.project.filter(i=>i.name == name)[0];
  invariant(selected.name, 'selected.name is empty, project name is not in configuration file.');
  const index = JSON.parse((await readFile(path.join(selected.name, 'index.json'))).toString());
  const project = Object.assign({}, projects.common, selected, index);
  const parent = name;

  for(const name of project?.dependencies.filter(i=>i)){
    if(!circular[name]){
      circular[name] = true;
      await createDependencyStack({name, projects, list, exists, circular});
    }else{
    }
  }
  if(!exists[project.name]) list.push(project);
  exists[project.name] = true;
  return list;
}
