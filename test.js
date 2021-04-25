#!/usr/bin/env -S node

import { Command } from 'commander/esm.mjs';

import compiler from './src/compiler.js';

const program = new Command();
program.version('1.0.0');
program.command('build <name>')
.description('Build website.')
.action((name) => {
  main({name});
});
program.parse(process.argv);

async function main({name}){

  const filename = 'test-configuration.mjs'
  const configuration = (await import(`${process.cwd()}/${filename}`)).default;
  const profile = Object.assign({}, configuration.common, configuration.project.filter(i=>i.name == name)[0]);
  const index = [] // await compiler.indexParse(profile);
  await compiler({index, profile});

}
