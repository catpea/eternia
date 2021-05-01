import path from 'path';

import Ajv from "ajv"

import { access, readFile } from 'fs/promises';
import { content } from "../helpers.js";

export default main;

const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}

async function main({record, project, home, dist,  schema}){

  const validate = ajv.compile(schema)
  const valid = validate(record)
  if (!valid){
    console.log(validate.errors)
    throw new Error(`Invalid record schema.`)
  }


}
