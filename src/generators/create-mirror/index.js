import debugContext from 'debug';
const debug = debugContext('create-mirror');

import path from "path";

import handlebars from "handlebars";
import handlebarsHelpers from "handlebars-helpers";
var helpers = handlebarsHelpers({
  handlebars: handlebars,
});

import marked from "marked";
import pretty from "pretty";

import { writeFile, readFile } from "fs/promises";

export default main;

// to be ran after changes to record object are made
async function main({ so, project, dist }){
  // const recordLocation = path.join(home, 'cache', 'record.json');

  debug(`Creating LTS mirror...`)
  const htmlTemplate = `
  <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 3.2 Final//EN">
  <html>
    <head>
      <title>Index of /{{title}}</title>
      <!-- Single page mirrors are important, places like the web archive don't spider links, they just save a single page so a single large HTML file is very useful. -->
    </head>
    <style>

    .section {
      margin-bottom: 5rem;
    }

    /* Extra small devices (phones, 600px and down) */
    @media only screen and (max-width: 600px) {
      img {
        width: 100%;
        height: auto;
      }
    }

    /* Small devices (portrait tablets and large phones, 600px and up) */
    @media only screen and (min-width: 600px) {

      img {
        width: 50%;
        height: auto;
      }

    }

    /* Medium devices (landscape tablets, 768px and up) */
    @media only screen and (min-width: 768px) {...}

    /* Large devices (laptops/desktops, 992px and up) */
    @media only screen and (min-width: 992px) {
      img {
        width: 33%;
        height: auto;
      }
    }

    /* Extra large devices (large laptops and desktops, 1200px and up) */
    @media only screen and (min-width: 1200px) {...}

    </style>
    <body>
      <h1>{{title}}: {{subtitle}}</h1>
      <h1>{{description}}</h1>
      <p>This is a portable mirror of <a href="https://catpea.com">{{title}}</a> designed to withstand the test of time.</p>
      <p>Please visit the main site or the outlying repositories for more content. {{#each links}}<a href="{{this}}">{{@key}}</a>, {{/each}} <a href="https://catpea.com">catpea.com</a></p>

      <h2>Table Of Contents</h2>
      <hr>
      <ol>
        {{#each data}}
          <li><a href="#{{id}}">{{title}}</a></li>
        {{/each}}
      </ol>

      {{#each data}}
        <div style="margin-top: 20rem; page-break-before: always;">
          <a name="{{id}}"></a>
          <h2>{{title}}</h2>
          ${so.audioVersion?'<a href="audio/{{audio}}">Listen To Audio Version</a>':''}
          <hr>
          <img src="image/lg-{{image}}">
          {{{html}}}
        </div>
      {{/each}}

    </body>
  </html>
  `.trim();

  const template = handlebars.compile(htmlTemplate);
  const html = pretty(template(so), {ocd: true});
  const mirrorLocation = path.join(dist, "index.html");
  await writeFile(mirrorLocation, html);
  debug(`Mirror created at: ${mirrorLocation}`)

}
