import path from "path";

import Ajv from "ajv";

import { access, readFile } from "fs/promises";
import { content } from "../helpers.js";

export default main;

const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

async function main({ record, project, home, dist, schema }) {
  if (!schema) schema = {
      title: "Record",
      description: "Data Record",
      type: "object",

      properties: {
        html: {
          description: "Simple HTML version of content to display",
          type: "string",
        },
        bootstrap: {
          description: "Bootstrap HTML version of content to display",
          type: "string",
        },
        print: {
          description: "Printer friendly HTML version of content to display",
          type: "string",
        },
        text: {
          description: "Plain text version of content to display",
          type: "string",
        },
      },
      required: ["html", "bootstrap", "print", "text"],
  };

  const validate = ajv.compile(schema);
  const valid = validate(record);
  if (!valid) {
    console.log(validate.errors);
    throw new Error(`Invalid record schema in ${record.name}.`);
  }

}
