import path from "path";

import Ajv from "ajv";

import { access, readFile } from "fs/promises";
import { content } from "../helpers.js";

export default main;

const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

async function main({ so, project, dist, schema }) {

  if (!schema) schema = {

      title: "Server Object",
      description: "Complete Server Object with all text content.",
      type: "object",

      properties: {
        format: { description: "Format field, containg a version number (ex. v4)", type: "string", },
        name: { description: "Name slug (ex. my-website)", type: "string", },
        title: { description: "Website title", type: "string", },
        subtitle: { description: "Subtitle text for the website", type: "string", },
        description: { description: "Description of project", type: "string", },
        icon: { description: "Bootstrap icon name (ex. link-45deg)", type: "string", },
        order: { description: "Default order of data story or latest", type: "string", },

        links: { description: "Links array field with name, icon, href", type: "array", },
        network: { description: "Network array field with name, icon, href", type: "array", },
        data: { description: "Data array field", type: "array", },

      },
      required: ['format', 'name', 'title', 'subtitle', 'description', 'icon', 'order',    'links', 'network', 'data'],
  };





  const validate = ajv.compile(schema);
  const valid = validate(so);
  if (!valid) {
    console.log(validate.errors);
    throw new Error(`Invalid record schema.`);
  }

}
