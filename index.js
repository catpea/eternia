#!/usr/bin/env -S node

import path from 'path';
import invariant from 'invariant';
import { Command } from 'commander/esm.mjs';
import { readFile } from "fs/promises";

import initialization from './src/initialization.js';
import builder from './src/builder.js';
import creator from './src/creator.js';

const program = new Command();
program.version('1.0.0');

program
  .command('build <name>')
  .description('Performs a one off build of your site into ./dist')
  .action(name=>{build({name})});

program
  .command('create <project> [template]')
  .option('-n, --name <name>', 'Name of item to create')
  .description('Creates a new record with default settings.')
  .action((project, template, options)=>{create({project, template, options})});

program.parse(process.argv);

async function build({name}){
  const projects = (await initialization.createDependencyStack({name, projects: (await import(`${process.cwd()}/configuration.mjs`)).default}))
  const progress = await initialization.progress();
  progress.emit('setup', {type:'Project', name: 'overall', size:projects.length});
  for(const project of projects){
    progress.emit('update', {name: 'overall', action:'increment', label: project.name});
    await builder({project, progress});
  }
  progress.emit('stop');
}

async function create({project, template, options}){
  const name = options.name;
  const configuration = (await import(`${process.cwd()}/configuration.mjs`)).default;
  const selected = configuration.project.filter(o=>o.name==project)[0]
  invariant(selected.name, 'selected.name is empty, project name is not in configuration file.');
  const index = JSON.parse((await readFile(path.join(selected.name, 'index.json'))).toString());
  project = Object.assign({}, configuration.common, selected, index);
  template = template?project.templates[template]:Object.entries(project.templates)[0][1];
  invariant(template, 'Unable to select template, please specify a valid template.')
  const payload = (await import(`${process.cwd()}/${template}/index.js`)).default;
  const destination = path.join(process.cwd(), project.name)
  payload({destination, name});

  //creator({project, template});
}
