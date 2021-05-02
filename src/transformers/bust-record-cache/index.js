import invariant from 'invariant';
import path from 'path';
import { expired, content } from '../helpers.js';
import { access, unlink } from 'fs/promises';
import { exists } from "../helpers.js";
export default main;

async function main({record, project, home}){

  // noop

  // invariant(home, 'Record home directory cannot be empty.')
  //
  // const location = path.join(home, 'cache', 'record.json');
  //
  // const sources = [
  //   //path.join(home, 'cache', 'html.html'),
  //   path.join(home, 'configuration.json'),
  //   path.join(home, await content(home)),
  // ];
  //
  // invariant(location, 'Location cannot be empty.')
  //
  // if(await expired(location, sources)){
  //
  //   console.log(`Record expired, record cache will be busted, unlink(${location})`);
  //   if (await exists(location)){
  //     await unlink(location);
  //   }
  //
  // }
  //


  return record;
}
