#!/usr/bin/env -S node

import { Command } from 'commander/esm.mjs';
import compile from './src/compile.js';
import initialize from './src/initialize.js';

const program = new Command();
program.version('1.0.0').command('build <name>').description('Create a new build.').action(name=>{main({name})});
program.parse(process.argv);

async function main({name}){
  for(const project of (await initialize.createDependencyStack({name, projects: (await import(`${process.cwd()}/configuration.mjs`)).default}))) await compile({project});
}
