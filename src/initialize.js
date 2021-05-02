
import path from "path";
import EventEmitter from "events";
import { readFile } from "fs/promises";

import _colors from "colors";
import invariant from "invariant";
import cliProgress from 'cli-progress';

export default {
  progress,
  createDependencyStack,
};


async function progress(){

  // const configuration = {
  //   overall: null,
  //   current: null;
  // }
  //
  function formatValue(v, options, type){
      // no autopadding ? passthrough
      if (options.autopadding !== true){
          return v;
      }

      // padding
      function autopadding(value, length){
          return (options.autopaddingChar + value).slice(-length);
      }
      //console.log(type);
      switch (type){
          case 'percentage':
              return autopadding(v, 3);
          case 'total':
              return autopadding(v, 4);
          case 'value':
              return autopadding(v, 4);

          default:
              return v;
      }
  }

  class ProgressReporter extends EventEmitter {}

  const progressReporter = new ProgressReporter();
  const memory = new Object();
  const multibar = new cliProgress.MultiBar({
      clearOnComplete: false,
      hideCursor: true,
      autopadding: true,
      formatValue: formatValue,
  }, {
    format: _colors.yellow(' {bar}') + ' {percentage}% | {value}/{total} | {type}: {label}',
    barCompleteChar: '\u25A0',
    barIncompleteChar: ' '
  });

  progressReporter.on('setup', ({name, size, label, type}) => {
    if(memory[name]){
      memory[name].update(0, {label, type});
      memory[name].setTotal(size);
    }else{
      memory[name] = multibar.create(size, 0);
      memory[name].update(0, {label, type});
    }
  });

  progressReporter.on('update', ({name, action, value, label, type}) => {
    if(action === 'increment'){
      memory[name].increment({label});
    }else{
      memory[name].update(value, {label});
    }

  });

  progressReporter.on('stop', () => {
    multibar.stop();
  });






  return progressReporter;
}

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

  for(const name of project.dependencies.filter(i=>i)){
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
