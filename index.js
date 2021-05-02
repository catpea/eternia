#!/usr/bin/env -S node

import { Command } from 'commander/esm.mjs';
import compile from './src/compile.js';
import initialize from './src/initialize.js';

const program = new Command();
program.version('1.0.0').command('build <name>').description('Create a new build.').action(name=>{main({name})});
program.parse(process.argv);

async function main({name}){
  const projects = (await initialize.createDependencyStack({name, projects: (await import(`${process.cwd()}/configuration.mjs`)).default}))
  const progress = await initialize.progress();
  progress.emit('setup', {type:'Project', name: 'overall', size:projects.length});
  for(const project of projects){
    progress.emit('update', {name: 'overall', action:'increment', label: project.name});
    await compile({project, progress});
  }
  progress.emit('stop');
}
