import debugContext from 'debug';
const debug = debugContext('create-webnsite');

import path from "path";
import { writeFile, readFile } from "fs/promises";

import handlebars from "handlebars";
import handlebarsHelpers from "handlebars-helpers";
var helpers = handlebarsHelpers({
  handlebars: handlebars,
});

import marked from "marked";
import pretty from "pretty";
import portfinder from 'portfinder';

import server from "./server/index.mjs";
import crawler from "./creepycrawler/module.mjs";

export default main;

async function main({ so, project, dist }){

  await createWebsite(project, path.join(dist, 'wwwroot'))

}

function pause(ms){
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve();
    },ms);
  });
}

async function createWebsite(configuration, destination) {
  debug(`Creating Website`);
  const port = await portfinder.getPortPromise({ port: 3000, stopPort: 7468 });
  const address = `http://127.0.0.1:${port}/`;
  server.on('start', async function(server){
    debug(`server running at: ${address}`);
    await pause(10*1000);
    await crawler({ address, destination });
    server.close();
    debug('Server closed (stopped)');
    debug(`Website was scraped into: ${configuration.destination}`);
  });
  await server.start({port, configuration});
}
