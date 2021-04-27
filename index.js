#!/usr/bin/env -S node

import { Command } from 'commander/esm.mjs';
import path from "path";
import { readFile } from "fs/promises";
import compile from './src/compile.js';

const program = new Command();
program.version('1.0.0');
program.command('build <name>')
.description('Build website.')
.action((name) => {
  main({name});
});
program.parse(process.argv);

async function main({name}){

  const configuration = 'eternia.mjs'
  const projects = (await import(`${process.cwd()}/${configuration}`)).default;
  async function buildlist({name, projects, list}){
    if(!list) list = [];
    const selected = projects.project.filter(i=>i.name == name)[0];
    const index = JSON.parse((await readFile(path.join(selected.name, 'index.json'))).toString());
    const project = Object.assign({}, projects.common, selected, index);
    for(const name of project?.dependencies.filter(i=>i)) await buildlist({name, projects, list});
    list.push(project);
    return list;
  }
  for(const project of (await buildlist({name, projects}))){
    await compile({project});
  }

}
