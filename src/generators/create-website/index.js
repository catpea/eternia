import debugContext from 'debug';
const debug = debugContext('create-website');

import path from "path";
import { writeFile, readFile } from "fs/promises";

import handlebars from "handlebars";
import handlebarsHelpers from "handlebars-helpers";
var helpers = handlebarsHelpers({
  handlebars: handlebars,
});

import marked from "marked";
import pretty from "pretty";
import getPort from 'get-port';

import Server from "./server/index.mjs";
import crawler from "./creepycrawler/module.mjs";

export default main;

async function main({ so, project, dist, progress }){

  await createWebsite(project, path.join(dist, 'wwwroot'), progress)

}

function pause(ms){
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve();
    },ms);
  });
}

async function createWebsite(configuration, destination, progress) {
  debug(`Creating Website`);

  return new Promise(async function(resolve, reject){



  const port = await getPort();
  const address = `http://localhost:${port}/`;
  const server = new Server();
  server.on('start', async function(server){
    debug(`server running at: ${address}`);
    await pause(1*1000);
    await crawler({ address, destination, progress });
    debug(`Website was scraped into: ${destination}`);
    server.close();
    debug('Server closed (stopped)');
    resolve();
  });
  debug(`Starting server at ${address}`)
  await server.start({port, configuration});

  })// promise

}
