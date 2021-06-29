#!/usr/bin/env node

import toText from "./to-text.js";

const html = `<!doctype html>
<html lang="en">
  <head>
  </head>
  <body>
  <div class="section">
    <p>one,<br>two</p>
  </div>
  </body>
</html>`;

const text = toText(html);

console.log(text);
