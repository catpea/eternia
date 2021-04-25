#!/usr/bin/env -S node

import { Command } from 'commander/esm.mjs';

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

  const configuration = 'test-configuration.mjs'
  const projects = (await import(`${process.cwd()}/${configuration}`)).default;
  const project = Object.assign({}, projects.common, projects.project.filter(i=>i.name == name)[0]);

  await compile({project});

}
